<template>
  <div style="height: 300px; overflow: auto">
    ssss {{ warehouseID }}
    {{ branchReports }}
    <q-table
      flat
      :columns="warehouseTransactionListColumns"
      :rows="warehouseTransactionListRow"
      row-key="name"
    >
      <template v-slot:body-cell-status="props">
        <q-td key="name" :props="props">
          <q-badge class="text-white" :color="getBadgeColor(props.row.status)">
            {{ props.row.status }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td class="q-gutter-x-md" :props="props">
          <!-- <WarehouseIdViewComponent /> -->
          <WarehouseIdEditComponent />
          <WarehouseIdDeleteComponent />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
// import WarehouseIdViewComponent from "./WarehouseIdViewComponent.vue";
import WarehouseIdEditComponent from "./WarehouseIdEditComponent.vue";
import WarehouseIdDeleteComponent from "./WarehouseIdDeleteComponent.vue";
import { useWarehousesStore } from "src/stores/warehouse";
import { useRoute, useRouter } from "vue-router";
import { onMounted, computed, watch } from "vue";

const route = useRoute();
const router = useRouter();
const warehouseStore = useWarehousesStore();
const branchReports = computed(() => warehouseStore.warehouseBranchReports);
// const warehouseID = route.params.warehouse_id;
// const warehouseName = route.params.warehouse_name;

const warehouseID = computed(() => route.params.warehouse_id || null);
// const warehouseName = computed(
//   () => route.params.warehouse_name || "Unknown Warehouse"
// );

// const getWarehouse = async () => {
//   const warehouseId = warehouseID.value;
//   console.log("wareg=house", warehouseId);

//   await warehouseStore.fetchWarehouseByBranchID(warehouseId);
// };
// onMounted(() => {
//   getWarehouse();
// });

watch(
  warehouseID,
  async (id) => {
    if (id) {
      await warehouseStore.fetchWarehouseByBranchID(id);
    }
  },
  { immediate: true }
);

const warehouseTransactionListColumns = [
  {
    name: "name",
    label: "Transaction Name",
    align: "center",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "date",
    label: "Date / Time",
    align: "center",
    field: "date",
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    align: "center",
    field: "status",
    sortable: true,
  },
  {
    name: "action",
    label: "Action",
    align: "center",
    field: "action",
    sortable: true,
  },
];
const warehouseTransactionListRow = [
  {
    name: "Transaction 1",
    date: "4/4/24 8:00 AM",
    status: "Processing",
  },
  {
    name: "Transaction 2",
    date: "4/4/24 9:00 AM",
    status: "To Receive",
  },
  {
    name: "Transaction 3",
    date: "4/4/24 10:00 AM",
    status: "Received",
  },
  {
    name: "Transaction 4",
    date: "4/4/24 11:00 AM",
    status: "Transaction Failed",
  },
  {
    name: "Transaction 5",
    date: "4/4/24 11:00 AM",
    status: "Adding Supply",
  },
];
const getBadgeColor = (status) => {
  switch (status) {
    case "Processing":
      return "light-blue-13";
    case "To Receive":
      return "deep-orange";
    case "Transaction Failed":
      return "negative";
    case "Received":
      return "green-13";
    default:
      return "grey"; // default color if status doesn't match any case
  }
};
</script>

<style scoped></style>
