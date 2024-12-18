<template>
  <div>
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
        <q-card-section>
          <div class="row justify-between">
            <div class="text-h6">Softdrinks Added Stocks Report</div>
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
          <!-- {{ report.id }} -->
          <div>Cashier: {{ formatFullname(report.employee) }}</div>
          <div>
            Branch:
            {{ report.branch.name }}
          </div>
          <div>
            Status:
            <q-badge color="yellow" outlined> {{ report.status }} </q-badge>
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
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useSoftdrinksProductStore } from "src/stores/softdrinks-products";
import { computed, ref } from "vue";

const softdrinksProductStore = useSoftdrinksProductStore();
const remark = ref("");
const remarkDialog = ref(false);
const dialog = ref(false);
const pagination = ref({
  rowPerPage: 0,
});

const $q = useQuasar();
const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const openDialog = () => {
  dialog.value = true;
};

const openRemarkDialog = () => {
  remarkDialog.value = true;
};

const declineReport = async () => {
  if (!remark.value) {
    $q.notify({ type: "negative", message: "Remark is required" });
    return;
  }

  try {
    const declineReport = await softdrinksProductStore.declineReport(
      props.report.id,
      remark.value
    );
    console.log("Report declined:", declineReport);
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
    const confirmedReport = await softdrinksProductStore.confirmReport(
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
  return props.report.softdrinks_added_stocks || [];
});

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`;
};

const transactionsColumns = [
  {
    name: "product_name",
    label: "Product Name",
    field: (row) => row.product.name || "N/A",
    align: "left",
  },
  {
    name: "price",
    label: "Price",
    align: "center",
    field: (row) => row.price || "N/A",
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

<style lang="scss" scoped></style>
