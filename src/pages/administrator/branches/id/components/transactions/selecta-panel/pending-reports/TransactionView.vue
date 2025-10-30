<template>
  <q-dialog v-model="dialog" ref="dialogRef" @hide="onDialogHide">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section :class="getHeaderClass(report.status)">
        <div class="row justify-between">
          <div class="text-h6">Selecta Added Stocks Report</div>
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
        <div>Date: {{ formatTimestamp(report.created_at || "-") }}</div>
        <div>Cashier: {{ formatFullname(report.employee) }}</div>
        <div>
          Branch:
          {{ capitalizeFirstLetter(report.branch.name || "-") }}
        </div>
        <div>
          Status:
          <q-badge color="yellow" outlined>
            {{ capitalizeFirstLetter(report.status || "-") }}
          </q-badge>
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          :rows="fiteredRows"
          :columns="transactionsColumns"
          row-key="id"
          flat
          bordered
          dense
          virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
          hide-bottom
          style="height: 350px"
          class="table-container sticky-header"
        />
      </q-card-section>
      <q-card-section class="report-actions q-gutter-sm" align="right">
        <q-btn
          color="negative"
          label="Decline"
          class="action-btn"
          @click="openRemarkDialog"
        />
        <q-btn
          color="positive"
          label="Confirm"
          class="action-btn"
          @click="confirmReport"
        />
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="remarkDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">Decline Report</div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="remark"
          placeholder="Enter your remark"
          label="Remark"
          type="textarea"
          filled
          lazy-rules
          :rules="[(val) => !!val || 'Remark is required']"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Confirm" color="negative" @click="declineReport" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useSelectaProductsStore } from "src/stores/selecta-product";
import { computed, ref } from "vue";
import { useDialogPluginComponent, useQuasar } from "quasar";

import { typographyFormat } from "src/composables/typography/typography-format";
import { badgeColor } from "src/composables/badge-color/badge-color";

const { capitalizeFirstLetter, formatFullname, formatPrice, formatTimestamp } =
  typographyFormat();
const { getHeaderClass } = badgeColor();

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const selectaProductStore = useSelectaProductsStore();
const remark = ref(""); // Reactive variable for the remark input
const remarkDialog = ref(false);
const dialog = ref(false);
const pagination = ref({
  rowsPerPage: 0,
});

const $q = useQuasar();
const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const openRemarkDialog = () => {
  remarkDialog.value = true;
};

const declineReport = async () => {
  if (!remark.value) {
    $q.notify({ type: "negative", message: "Remark is required" });
    return;
  }

  try {
    const declinedReport = await selectaProductStore.declineReport(
      props.report.id,
      remark.value
    );
    console.log("Report declined:", declinedReport);
    $q.notify({ type: "negative", message: "Report declined successfully" });
    remarkDialog.value = false;
    dialog.value = false;
    remark.value = ""; // Reset remark after successful decline
  } catch (error) {
    console.error("Error declining report:", error);
    $q.notify({ type: "negative", message: "Failed to decline report" });
  }
};

const confirmReport = async () => {
  try {
    const confirmedReport = await selectaProductStore.confirmReport(
      props.report.id
    );
    console.log("Report confirmed:", confirmedReport);
    $q.notify({ type: "positive", message: "Report confirmed successfully" });
    dialog.value = false;
  } catch (error) {
    console.error(error);
  }
};

const fiteredRows = computed(() => {
  return props.report.selecta_added_stocks || [];
});

const transactionsColumns = [
  {
    name: "product_name",
    label: "Product Name",
    field: (row) => capitalizeFirstLetter(row?.product?.name || "N/A"),
    align: "left",
  },
  {
    name: "price",
    label: "Price",
    align: "center",
    field: (row) => formatPrice(row?.price || "N/A"),
  },
  {
    name: "added_stocks",
    label: "Added Stocks",
    align: "center",
    // field: (row) => row.added_stocks || "N/A",
    field: (row) => (row.added_stocks ? `${row.added_stocks} pcs` : "N/A"),
  },
];
</script>

<style lang="scss" scoped>
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
.process-header {
  background: linear-gradient(180deg, #ffffff, #9fc1ff);
}
.completed-header {
  background: linear-gradient(180deg, #ffffff, #cbcbcb);
}
.to-deliver-header {
  background: linear-gradient(180deg, #ffffff, #bda49b);
}
.to-receive-header {
  background: linear-gradient(180deg, #ffffff, #ffd29c);
}
.receive-header {
  background: linear-gradient(180deg, #ffffff, #8ff7ed);
}
</style>
