<template>
  <q-card flat>
    <q-card-section>
      <div class="text-h6 row justify-between">
        <div>
          <q-btn outline flat icon="arrow_back" to="/admin/warehouse" />
          <q-space />
        </div>
        <div>
          <q-icon name="factory" />
          {{ warehouse.name }}
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6 q-ma-sm" align="center">Transaction History</div>
      <div class="row justify-between q-ma-sm">
        <!-- <WarehouseTransactionSearch /> -->
      </div>
    </q-card-section>

    <q-card-section>
      <!-- <WarehouseTransactionTable /> -->
      <WarehouseIdTableComponent />
    </q-card-section>
  </q-card>
</template>
<script setup>
import { computed, watch } from "vue";
import WarehouseIdTableComponent from "./components/WarehouseIdTableComponent.vue";
import { useRoute } from "vue-router";
import { useWarehousesStore } from "src/stores/warehouse";

const route = useRoute();
const warehouseStore = useWarehousesStore();
const warehouse = computed(() => warehouseStore.warehouse);
const warehouseId = computed(
  () => route.params.warehouse_id || "Unknown Warehouse"
);

watch(
  warehouseId,
  async (id) => {
    if (id) {
      await warehouseStore.fetchCertainWarehouse(id);
    }
  },
  {
    immediate: true,
  }
);

// const fetchWarehouse = async () => {
//   await warehouseStore.fetchCertainWarehouse(warehouseId.value);
// };
</script>
