<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    @ok="handleButtonClick"
    @cancel="onDialogCancel"
  >
    <q-card style="width: 870px; max-width: 80vw">
      <q-card-section style="background-color: #03a9f4">
        <div class="row justify-between text-white">
          <div class="text-h6">Expenses Report</div>
          <q-btn icon="close" flat dense round v-close-popup>
            <q-tooltip class="bg-blue-grey-6" :delay="200">Close</q-tooltip>
          </q-btn>
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          :filter="filter"
          :virtual-scroll-sticky-size-start="48"
          flat
          :columns="expensesReportColumn"
          :rows="filteredRows"
          row-key="name"
          virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
          hide-bottom
          style="height: 350px"
          class="table-container sticky-header"
        >
          <template v-slot:body-cell-amount="props">
            <q-td :props="props">
              <span>{{ `${formatPrice(props.row.amount)}` }}</span>
            </q-td>
          </template>
        </q-table>

        <!-- <div v-for="(expenses, index) in expensesReports" :key="index">
          <div>Name: {{ expenses.name }}</div>
          <div>
            Description:
            {{ expenses.description }}
          </div>
          <div>Amount: {{ expenses.amount }}</div>
        </div> -->

        <!-- {{ reports }} -->
      </q-card-section>
      <q-card-section>
        <div class="row justify-end q-mt-md">
          <div class="text-h6">
            Overall Total Expenses: {{ formatPrice(total || "0") }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { computed } from "vue";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps({
  reports: Array,
  total: Number,
});
// defineEmits("hide", "ok", "cancel");

const expensesReports = props.reports;
console.log("Expenses total", props.total);

const expensesReportColumn = [
  {
    name: "name",
    label: "Expenses Name",
    field: (row) => {
      console.log("Row data:", row); // Debug each row's data
      return row.name || "N/A"; // Adjust this according to your data
    },
    align: "center",
  },
  {
    name: "description",
    label: "Description",
    field: "description",
    align: "center",
  },
  {
    name: "amount",
    label: "Amount",
    field: "amount",
    align: "center",
  },
];

// Log to verify the structure of props.reports
console.log("Reports data structure:", props.reports);

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};
// Replace this with your actual filtered rows logic
const filteredRows = computed(() => {
  // Assuming `breads` is an array in `reports`
  console.log("Filtered rows:", props.reports || []);
  return props.reports || [];
});

console.log("Expenses:", filteredRows.value);
</script>

<style scoped></style>
