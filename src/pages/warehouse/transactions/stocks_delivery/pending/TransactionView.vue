<template>
  <q-dialog ref="dialogRef" v-model="dialog" @hide="onDialogHide">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">From: {{ capitalize(report.from_name) }}</div>
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
          <span class="text-grey-7 text-caption">Items:</span>

          <template v-if="report.items && report.items.length">
            <q-list dense separator class="box">
              <q-item class="bg-grey-1 text-weight-bold">
                <q-item-section>
                  <q-item-label> Raw Materials Code </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Stocks Category</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label> Quantity </q-item-label>
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
                <q-item-section side>
                  <q-item-label>
                    {{ formatQuantity(item.quantity || "No Quantity") }}
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
      <q-card-actions class="report-actions q-ma-sm q-gutter-sm" align="right">
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
import { Notify, useDialogPluginComponent, useQuasar } from "quasar";
import { useStockDelivery } from "src/stores/stock-delivery";
import { ref } from "vue";
import ConfirmDialog from "./ConfirmDialog.vue";
import DeclinePage from "./DeclinedDialog.vue";

const stocksDeliveryStore = useStockDelivery();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["fetchAgain"]);

console.log("report", props.report);

const dialog = ref(false);
const $q = useQuasar();

const openDialog = () => {
  dialog.value = true;
};

const capitalize = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatQuantity = (val) => {
  if (val == null) return "No Quantity";
  return parseFloat(val);
};

const openConfirmDialog = () => {
  $q.dialog({
    component: ConfirmDialog,
  })
    .onOk((data) => {
      // ✅ Called when confirm button is clicked
      console.log("Remarks from child:", data);
      confirmReport(props.report);
      // Call your save function here
    })
    .onCancel(() => {
      console.log("Cancelled");
    });
};

const confirmReport = async (data) => {
  try {
    $q.loading.show();
    console.log("Confirming report", data);

    // Add total grams for each item
    const itemsWithTotals = data.items.map((item) => {
      const qty = parseFloat(item.quantity) || 0;
      const gramsPerUnit = parseFloat(item.gram) || 0;

      return {
        ...item,
        total_grams: qty * gramsPerUnit,
      };
    });

    // Compute the overall grams
    // const totalGrams = itemsWithTotals.reduce(
    //   (sum, item) => sum + item.total_grams,
    //   0
    // );

    console.log("Per Item Totals:", itemsWithTotals);

    const confirmData = {
      ...data,
      status: "confirmed",
      items: itemsWithTotals,
    };
    const response = await stocksDeliveryStore.confirmDeliveryStocks(
      confirmData
    );

    console.log("responsesss", response);

    // ✅ Check backend response for success
    if (
      response?.data ||
      response?.data?.message === "Delivery confirmed successfully."
    ) {
      Notify.create({
        type: "positive",
        message: response.data.message || "Delivery Confirmed Successfully",
      });

      // Only close if backend confirms success
      if (response?.status === 200) {
        onDialogOK({ action: "confirmed" }); // ✅ Notify parent
        dialog.value = false;
      }
    } else {
      Notify.create({
        type: "negative",
        message: response?.data?.message || "Failed to Confirm deliveryq",
      });
    }

    console.log("responssssse", response);
  } catch (error) {
    console.log(error);
    Notify.create({
      type: "negative",
      message: error?.response?.data?.message || "Failed to Confirm delivery",
    });
  } finally {
    $q.loading.hide();
  }
};

const openDeclineDialog = () => {
  $q.dialog({
    component: DeclinePage,
  })
    .onOk((data) => {
      // ✅ Called when confirm button is clicked
      console.log("Remarks from child:", data.remarks);
      declineReport(props.report.id, data.remarks);
    })
    .onCancel(() => {
      console.log("Cancelled");
    });
};

const declineReport = async (reportId, remarks) => {
  try {
    $q.loading.show();
    console.log("Declining report", reportId, "with remarks:", remarks);

    const declineData = {
      id: reportId,
      status: "declined",
      remarks: remarks,
    };

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
        message: response?.data?.message || "Delivery Declined Successfully",
      });

      // Only close if backend confirms success
      if (response?.status === 200) {
        onDialogOK({ action: "declined" }); // ✅ Emit action
        dialog.value = false;
      }
    } else {
      Notify.create({
        type: "negative",
        message: response?.data?.message || "Failed to Decline delivery",
      });
    }
    console.log("responsessssss", response);
  } catch (error) {
    console.log(error);
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
</script>

<style scoped>
.bg-grey-2 {
  background-color: #f5f7fa !important;
}

.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
