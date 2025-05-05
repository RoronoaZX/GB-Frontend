<template>
  <div>
    <q-table :rows="historyRawMaterials" :columns="historyRawMaterialsColumns">
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <HistorView />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed, ref, onMounted } from "vue";
import { useWarehouseRawMaterialsStore } from "src/stores/warehouse-rawMaterials";
import { date } from "quasar";
import HistorView from "./HistoryView.vue";

const route = useRoute();
const warehouseRawMaterialsStore = useWarehouseRawMaterialsStore();
const historyRawMaterials = computed(
  () => warehouseRawMaterialsStore.historyRawMaterials
);
const warehouseID = computed(() => route.params.warehouse_id || null);
const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});

const fetchWarehouseAddedStocks = async () => {
  await warehouseRawMaterialsStore.fetchWarehouseAddedStocks(warehouseID.value);

  console.log("historyRawMaterials", historyRawMaterials.value);
};

onMounted(async () => {
  if (warehouseID.value) {
    await fetchWarehouseAddedStocks();
  }
});

const formatTimestamp = (dateTimeString) => {
  return date.formatDate(dateTimeString, "MMM DD, YYYY || hh:mm A");
};

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`.trim();
};

const historyRawMaterialsColumns = [
  {
    name: "created_at",
    label: "Date",
    align: "left",
    field: (row) => formatTimestamp(row.created_at) || "Not Available",
  },
  {
    name: "supplier_company_name",
    label: "Supplier's Company Name",
    align: "left",
    field: (row) => row.supplier_company_name || "Not Available",
  },
  {
    name: "supplier_name",
    label: "Supplier's Name",
    align: "left",
    field: (row) => row.supplier_name || "Not Available",
  },
  {
    name: "addedBy",
    label: "Added By:",
    align: "left",
    field: (row) => formatFullname(row.employee) || "Not Available",
  },
  {
    name: "action",
    label: "Action",
    align: "left",
    field: "action",
  },
];
</script>

<style lang="scss" scoped></style>
