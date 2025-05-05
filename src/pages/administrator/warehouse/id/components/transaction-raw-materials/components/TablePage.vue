<template>
  <div></div>
  <div>
    <q-table
      flat
      :rows="historyRawMaterialsData"
      :columns="historyRawMaterialsColumns"
      row-key="id"
      bordered
      :loading="loading"
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 7, 10, 0]"
      @request="onPageRequest"
    >
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <HistorView :report="props.row" />
        </q-td>
      </template>
      <template #loading>
        <q-inner-loading showing>
          <q-spinner-gears size="50px" color="indigo-8" />
        </q-inner-loading>
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
const historyRawMaterialsData = ref([]);
const warehouseID = route.params.warehouse_id || "";
const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});

const loading = ref(true);

const fetchWarehouseAddedStocks = async (
  warehouseID,
  page = 0,
  rowsPerPage = 5
) => {
  try {
    loading.value = true;
    await warehouseRawMaterialsStore.fetchWarehouseAddedStocks(
      warehouseID,
      page,
      rowsPerPage
    );

    console.log("historyRawMaterials", historyRawMaterials.value);
    const { data, current_page, per_page, total } = historyRawMaterials.value;
    historyRawMaterialsData.value = data;
    console.log("historyRawMaterialsData.value", historyRawMaterialsData.value);
    pagination.value.page = current_page;
    pagination.value.rowsPerPage = per_page;
    pagination.value.rowsNumber = total;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  if (warehouseID) {
    await fetchWarehouseAddedStocks(warehouseID);
  }
});

const onPageRequest = (props) => {
  console.log("props", props);
  fetchWarehouseAddedStocks(
    warehouseID,
    props.pagination.page,
    props.pagination.rowsPerPage
  );
};

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

const capitalizeFirstLetter = (data) => {
  if (!data) return "";
  return data
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
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
    align: "center",
    field: (row) =>
      capitalizeFirstLetter(row.supplier_company_name) || "Not Available",
  },
  {
    name: "supplier_name",
    label: "Supplier's Name",
    align: "center",
    field: (row) => capitalizeFirstLetter(row.supplier_name) || "Not Available",
  },
  {
    name: "addedBy",
    label: "Added By:",
    align: "center",
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
