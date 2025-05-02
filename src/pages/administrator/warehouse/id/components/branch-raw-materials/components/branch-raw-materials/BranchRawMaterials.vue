<template>
  <q-table
    :rows="branchReport.reports"
    :columns="tableColumns"
    row-key="id"
    flat
    bordered
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
    hide-bottom
    class="q-mt-md sticky-header3"
    style="height: 450px"
  >
    <template v-slot:body-cell-total_quantity="props">
      <q-td :props="props">
        <q-badge
          square
          class="text-white cursor-pointer"
          :class="getRawMaterialBadgeColor(props.row)"
        >
          {{ formatTotalQuantity(props.row) }}
        </q-badge>
      </q-td>
    </template>
    <template v-slot:body-cell-category="props">
      <q-td key="name" :props="props">
        <q-badge
          :color="getBadgeCategoryColor(props.row.raw_material.category)"
        >
          {{ props.row.raw_material.category }}
        </q-badge>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { computed, ref } from "vue";
import { useDialogPluginComponent } from "quasar";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps({
  branchReport: Object,
  // tableColumns: Array,
  getRawMaterialBadgeColor: Function,
  getBadgeCategoryColor: Function,
  formatTotalQuantity: Function,
  capitalizeFirstLetter: Function,
});
console.log("branchReportss", props.branchReport);
const dialog = ref(false);
const maximizedToggle = ref(true);

// Table columns for the reports
const tableColumns = ref([
  // { name: "id", label: "ID", align: "left", field: "id" },
  {
    name: "raw_material",
    label: "Raw Materials Name",
    align: "left",
    field: (row) => row.raw_material?.name || "No record",
  },
  {
    name: "code",
    label: "Code",
    align: "left",
    field: (row) => row.raw_material?.code || "No record",
  },
  {
    name: "category",
    label: "Category",
    align: "left",
    field: (row) => row.raw_material?.category || "No record",
  },
  {
    name: "total_quantity",
    label: "Available Stocks",
    align: "center",
    field: "total_quantity",
  },
]);
</script>
