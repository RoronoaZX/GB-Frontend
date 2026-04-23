<template>
  <q-page padding>
    <q-card flat class="q-mb-md">
      <q-card-section class="text-h6"> Ingredients Overview </q-card-section>
      <q-separator />
      <q-card-section>
        <!-- Predictive Stocking Engine -->
        <PredictiveStockCard :predictions="dashboardStore.predictiveStocking" />
      </q-card-section>
    </q-card>

    <q-card flat>
      <q-card-section class="q-gutter-md">
        <div class="row items-center justify-between">
          <div class="text-h6">Inventory List</div>
          <WarehouseIngredientsCreateSupply />
        </div>
        <div>
          <WarehouseIngredientsTable />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import { onMounted, computed } from "vue";
import { useDashboardStore } from "src/stores/dashboard";
import { useWarehouseRawMaterialsStore } from "src/stores/warehouse-rawMaterials";
import PredictiveStockCard from "src/components/PredictiveStockCard.vue";
import WarehouseIngredientsCreateSupply from "./warehouse_ingredient_section/WarehouseIngredientsCreateSupply.vue";
import WarehouseIngredientsTable from "./warehouse_ingredient_section/WarehouseIngredientsTable.vue";

const dashboardStore = useDashboardStore();
const warehouseStore = useWarehouseRawMaterialsStore();

const warehouseId = computed(() => warehouseStore.user?.device?.reference_id || "");

onMounted(async () => {
  if (warehouseId.value) {
    await dashboardStore.fetchPredictiveStocking({ warehouse_id: warehouseId.value });
  }
});
</script>
