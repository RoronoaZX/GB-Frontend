<template>
  <q-btn
    color="accent"
    icon="visibility"
    size="md"
    flat
    round
    dense
    @click="openDialog"
  />

  <q-dialog v-model="dialog">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section :class="getHeaderClass(report.status)">
        <div class="row justify-between">
          <div class="text-h6">
            {{ capitalizeFirstLetter(report.from_name) || "-" }}
          </div>
          <q-btn
            class="close-btn"
            color="grey-8"
            flat
            round
            dense
            icon="close"
            @click="dialog = false"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div>
          <span>Date: {{ formatTimestamp(report.created_at) || "-" }}</span>
        </div>
        <div>
          <span>Created By: {{ formatFullname(report.employee) || "-" }}</span>
        </div>
        <div>
          <span>
            Status:
            <q-badge :color="getStatusColor(report.status)">
              {{ capitalizeFirstLetter(report.status) || "-" }}
            </q-badge>
          </span>
        </div>
        <div v-if="report.status === 'declined'">
          <span>Remarks: {{ report.remarks || "No Remarks" }}</span>
        </div>
        <div class="q-mt-md">
          <span class="text-grey-7 text-caption">Items: </span>
          <template v-if="report.items && report.items.length">
            <q-list dense separator class="box">
              <q-item class="bg-grey-1 text-weight-bold">
                <q-item-section>
                  <q-item-label> Raw Materials Code </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Stocks Category</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label> Quantity </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label> Total Amount </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-for="(item, index) in report.items" :key="index">
                <q-item-section>
                  <q-item-label>
                    {{ item.raw_material?.code || "No Code" }}
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{ item.category || "No Category" }}
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{ formatQuantity(item.quantity || "No Quantity") }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label>
                    <q-badge color="teal" label-color="white">
                      {{ formatTotalAmount(item) }}
                    </q-badge>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </template>
          <div v-else class="text-caption text-grey-6 q-mt-md">
            No items in this delivery
          </div>
        </div>
      </q-card-section>
      <q-card-actions
        v-if="report.status === 'pending'"
        class="report-actions q-ma-sm q-gutter-sm"
        align="right"
      >
        <q-btn
          color="negative"
          label="Decline"
          class="action-btn"
          @click="openDeclineDialog"
        />
        <q-btn
          color="positive"
          label="Confirm"
          class="action-btn"
          @click="openConfirmDialog"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { Notify, date as quasarDate, useQuasar } from "quasar";
import ConfirmDialog from "./ConfirmDialog.vue";
import DeclinedDialog from "./DeclinedDialog.vue";
import { useStockDelivery } from "src/stores/stock-delivery";
import { useBakerReportsStore } from "src/stores/baker-report";
import { typographyFormat } from "src/composables/typography/typography-format";
import { badgeColor } from "src/composables/badge-color/badge-color";

const { capitalizeFirstLetter, formatTimestamp, formatFullname } =
  typographyFormat();
const { getHeaderClass } = badgeColor();

const bakerReportStore = useBakerReportsStore();
const userData = computed(() => bakerReportStore.user);
/* console.log("userData in RawMaterialsTable:", userData.value); */
const employeeId = userData.value?.data?.employee_id || "";
/* console.log("employeeIdsssssssssssssss:", employeeId); */

const stocksDeliveryStore = useStockDelivery();

const loading = computed(() => stocksDeliveryStore.loading);
const declineReportMessage = computed(() => stocksDeliveryStore.declinedStocks);

const props = defineProps({ report: { type: Object, required: true } });
/* console.log("props in Transaction view:", props.report); */

const emit = defineEmits(["fetchAgain"]);

const dialog = ref(false);
const $q = useQuasar();

const openDialog = () => {
  dialog.value = true;
};

const formatQuantity = (val) => {
  if (val == null) return "No Quantity";
  return parseFloat(val);
};

const formatTotalAmount = (row) => {
  const qty = Number(row.quantity) || 0;
  const category = (row.category || "").toLowerCase();

  if (category === "pcs") {
    return `${qty} pcs`;
  }

  const gramsPerUnit = Number(row.gram) || 0;
  const pcsPerUnit = Number(row.pcs) || 0;
  
  if (gramsPerUnit > 0) {
    let totalGrams = qty * gramsPerUnit;
    if (category === "gram") {
      totalGrams = qty; 
    }
    
    if (totalGrams >= 1000) {
      const kgs = totalGrams / 1000;
      return `${Number.isInteger(kgs) ? kgs : kgs.toFixed(2)} kgs`;
    } else {
      return `${totalGrams} grams`;
    }
  } else {
    if (pcsPerUnit > 0) {
      const totalPcs = qty * pcsPerUnit;
      return `${totalPcs} pcs`;
    }
    return `0`;
  }
};

const openConfirmDialog = () => {
  $q.dialog({
    component: ConfirmDialog,
  })
    .onOk(() => {
      // ✅ Small delay to let the ConfirmDialog finish unmounting
      setTimeout(() => {
        confirmReport(props.report);
      }, 100);
    })
    .onCancel(() => {
      /* console.log("Cancelled"); */
    });
};

const openDeclineDialog = () => {
  $q.dialog({
    component: DeclinedDialog,
  })
    .onOk((data) => {
      // ✅ Called when decline button is clicked
      /* console.log("Decliene remark from child:", data); */
      // const message = declineReportMessage.value;
      declineReport(props.report.id, data);
    })
    .onCancel(() => {
      /* console.log("Cancelled"); */
    });
};

const confirmReport = async (data) => {
  /* console.log("Confirming report", data); */

  try {
    $q.loading.show();

    // Add total grams for each item
    const itemsWithTotals = data.items.map((item) => {
      const qty = parseFloat(item.quantity) || 0;
      const category = (item.category || "").toLowerCase();
      let totalGrams = 0;

      if (category === "pcs" || category === "gram") {
        totalGrams = qty;
      } else {
        const gramsPerUnit = parseFloat(item.gram) || 0;
        totalGrams = qty * gramsPerUnit;
      }

      return {
        ...item,
        total_grams: totalGrams,
      };
    });

    /* console.log("Per Item Totals:", itemsWithTotals); */

    const confirmData = {
      ...data,
      employee_id: userData.value?.data?.employee?.id || userData.value?.data?.employee_id || userData.value?.employee_id || "0",
      status: "confirmed",
      items: itemsWithTotals,
    };

    /* console.log("Confirm Datasss:", confirmData); */

    const response = await stocksDeliveryStore.confirmDeliveryStocks(
      confirmData
    );

    /* console.log("responsesssssss", response); */
    // ✅ Check backend response for success
    if (response?.data || response?.data?.message === "Delivery confirmed.") {
      Notify.create({
        type: "positive",
        message: response.data.message || "Delivery Confirmed Successfully",
      });

      // Only close if backend confirms success
      if (response?.status === 200) {
        dialog.value = false;
        emit("fetchAgain");
      }
    } else {
      Notify.create({
        type: "negative",
        message: response?.data?.message || "Failed to Confirm Delivery",
      });
    }

    /* console.log("responsesss", response); */
  } catch (error) {
    /* console.log(error); */
    Notify.create({
      type: "negative",
      message: error?.response?.data?.message || "Failed to Confirm Delivery",
    });
  } finally {
    $q.loading.hide();
  }
};

const declineReport = async (reportId, remarks) => {
  try {
    $q.loading.show();
    /* console.log("declining report", reportId, "with remarks:", remarks); */

    const declineData = {
      id: reportId,
      employee_id: employeeId || "0",
      status: "declined",
      remarks: remarks.remarks,
    };

    /* console.log("declineData", declineData); */

    const response = await stocksDeliveryStore.declineDeliveryStocks(
      declineData
    );

    // ✅ Check backend response for success
    if (
      response?.data ||
      response?.data?.message === "Delivery declined successfully."
    ) {
      Notify.create({
        type: "positive",
        message: response.data.message || "Delivery Declined Successfully",
      });

      // Only close if backend confirms success
      if (response?.status === 200) {
        dialog.value = false;
        emit("fetchAgain");
      }
    } else {
      Notify.create({
        type: "negative",
        message: response?.data?.message || "Failed to decline delivery",
      });
    }

    /* console.log("responsesssss", response); */
  } catch (error) {
    /* console.log(error); */
    Notify.create({
      type: "negative",
      message:
        error?.response?.data?.message ||
        "Failed to decline delivery. Please try again.",
    });
  } finally {
    $q.loading.hide();
  }
};

const getStatusColor = (status) => {
  switch ((status || "").toLowerCase()) {
    case "pending":
      return "orange-7";
    case "confirmed":
      return "green-7";
    case "declined":
      return "red-6";
    default:
      return "grey-6";
  }
};
</script>

<style scoped>
.bg-grey-2 {
  background-color: #f5f7fa !important;
}

.box {
  border: 1px dashed grey;
  border-radius: 10px;
}

.pending-header {
  background: linear-gradient(180deg, #ffffff, #e8e6b7);
}
.confirm-header {
  background: linear-gradient(180deg, #ffffff, #c1ffc7);
}
.decline-header {
  background: linear-gradient(180deg, #ffffff, #ffc7c7);
}
</style>
