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
          :class="getRawMaterialBadgeColorForStocks(props.row)"
        >
          {{ formatTotalQuantity(props.row) }}
        </q-badge>
      </q-td>
    </template>
    <template v-slot:body-cell-category="props">
      <q-td key="name" :props="props">
        <q-badge
          :color="
            getRawMaterialBadgeCategoryColor(props.row.raw_material.category)
          "
        >
          {{ props.row.raw_material.category }}
        </q-badge>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { ref } from "vue";
import { typographyFormat } from "src/composables/typography/typography-format";
import { badgeColor } from "src/composables/badge-color/badge-color";

const { capitalizeFirstLetter } = typographyFormat();
const { getRawMaterialBadgeCategoryColor } = badgeColor();

const props = defineProps({
  branchReport: Object,
  getRawMaterialBadgeColorForStocks: Function,
  formatTotalQuantity: Function,
});
console.log("branchReportss", props.branchReport);

// Table columns for the reports
const tableColumns = ref([
  {
    name: "raw_material",
    label: "Raw Materials Name",
    align: "left",
    field: (row) =>
      capitalizeFirstLetter(row.raw_material?.name) || "No record",
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
    field: (row) =>
      capitalizeFirstLetter(row.raw_material?.category) || "No record",
  },
  {
    name: "total_quantity",
    label: "Available Stocks",
    align: "center",
    field: "total_quantity",
  },
]);
</script>
