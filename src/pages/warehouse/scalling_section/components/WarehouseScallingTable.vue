<template>
  <div>
    <q-input
      rounded
      outlined
      dense
      debounce="300"
      v-model="filter"
      placeholder="Search"
      style="width: 500px; max-width: 1500px; min-width: 100px"
    >
      <template v-slot:append>
        <q-icon v-if="!loadingSearchIcon" name="search" />
        <q-icon v-else :thickness="2" color="teal" size="1em" />
      </template>
    </q-input>
  </div>
  <div>
    <q-table
      :filter="filter"
      flat
      :columns="transactionHistoryColumns"
      :rows="branchUnderWarehouseRows"
      row-key="name"
    >
      <template v-slot:body-cell-rawMaterialsStatus="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <WarehouseScallingTableBreadStatus :branch="props.row" />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <WarehouseScallingTableAction :branch="props.row" />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import WarehouseScallingTableAction from "./WarehouseScallingTableAction.vue";
import WarehouseScallingTableBreadStatus from "./WarehouseScallinGTableRawMaterialsStatus.vue";
import { useWarehouseRawMaterialsStore } from "src/stores/warehouse-rawMaterials";
import { computed, onMounted, ref, watch } from "vue";

const filter = ref("");
const loadingSearchIcon = ref(false);
const warehouseRawMaterialsStore = useWarehouseRawMaterialsStore();
const userData = computed(() => warehouseRawMaterialsStore.user);
console.log("userData", userData.value);
const warehouseId = userData.value?.employee?.warehouse_id || "";
console.log("warehouseId", warehouseId);
const branchUnderWarehouseRows = computed(
  () => warehouseRawMaterialsStore.branch
);
const showNoDataMessage = ref(false);

watch(filter, () => {
  loadingSearchIcon.value = true;
  setTimeout(() => {
    loadingSearchIcon.value = false;
  });
});

onMounted(async () => {
  await reloadTableData(warehouseId);
});

const reloadTableData = async (warehouseId) => {
  const response = await warehouseRawMaterialsStore.fetchBranchUnderWarehouse(
    warehouseId
  );
  console.log("response", response);
  branchUnderWarehouseRows.value = response;
  console.log("branchUnderWarehouseRows", branchUnderWarehouseRows.value);
  if (!branchUnderWarehouseRows.value) {
    showNoDataMessage.value = true;
  }
};

const transactionHistoryColumns = [
  {
    name: "name",
    label: "Branch Name",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "rawMaterialsStatus",
    label: "Raw Materials Status",
    align: "center",
    field: "rawMaterialsStatus",
  },
  {
    name: "action",
    label: "Action",
    align: "center",
  },
];
</script>
