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
    class="q-mt-md distribution-table shadow-1"
    style="height: 450px"
  >
    <template v-slot:header="props">
      <q-tr :props="props" class="gradient-header text-white">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          class="text-weight-bold text-subtitle2"
        >
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body-cell-total_quantity="props">
      <q-td :props="props">
        <q-badge
          rounded
          padding="xs md"
          class="text-weight-bold cursor-pointer"
          :color="getRawMaterialBadgeColorName(props.row)"
        >
          {{ formatTotalQuantity(props.row) }}
        </q-badge>
      </q-td>
    </template>
    <template v-slot:body-cell-category="props">
      <q-td key="name" :props="props">
        <q-badge
          rounded
          padding="xs md"
          class="text-weight-bold"
          :color="getRawMaterialBadgeCategoryColor(props.row.raw_material.category)"
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

const getRawMaterialBadgeColorName = (row) => {
  const cls = props.getRawMaterialBadgeColorForStocks(row);
  return cls.replace("bg-", "");
};

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

<style lang="scss" scoped>
.gradient-header {
  background: linear-gradient(135deg, #155e75, #1e293b);
  color: white;
}

.distribution-table {
  border-radius: 12px;
  overflow: hidden;

  :deep(.q-table tbody tr:hover) {
    background-color: #f8fafc !important;
    transition: background-color 0.3s ease;
  }
}
</style>
