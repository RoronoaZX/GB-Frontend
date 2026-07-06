<template>
  <q-card class="widget-card" flat bordered>
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div>
          <div class="text-h6 text-weight-bold text-dark row items-center">
            <q-icon name="factory" class="q-mr-sm text-indigo-8" size="24px" />
            Warehouse Employees
          </div>
          <div class="text-caption text-grey-6 q-mt-xs">
            Total Locations: <span class="text-weight-bold text-indigo-8">{{ warehouses.length }}</span>
          </div>
        </div>
      </div>
    </q-card-section>

    <!-- Scrollable container for cards (Vertical) -->
    <q-card-section class="col q-pt-sm q-pb-md">
      <div class="vertical-scroll-container">
        <div 
          v-for="(warehouse, index) in warehouses" 
          :key="index" 
          class="metric-list-item row items-center justify-between q-pa-sm q-mb-sm"
          @click="goToWarehouse(warehouse.id)"
        >
          <div class="row items-center col-grow">
            <div class="list-icon-wrapper bg-indigo-1 text-indigo-8 q-mr-md">
              <q-icon name="factory" size="18px" />
            </div>
            <div class="text-subtitle2 text-weight-bold text-grey-8 ellipsis" style="max-width: 220px">
              {{ warehouse.name }}
            </div>
          </div>
          <div class="row items-center q-pr-sm">
            <q-badge rounded color="indigo-1" text-color="indigo-9" class="text-weight-bold q-px-md q-py-xs">
              {{ warehouse?.warehouse_employee?.length || 0 }} staff
            </q-badge>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useWarehousesStore } from "src/stores/warehouse";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const warehouseStore = useWarehousesStore();
const warehouses = computed(() => warehouseStore.warehouses);
const router = useRouter();

onMounted(async () => {
  await fetchWarehouseData();
});

const fetchWarehouseData = async () => {
  try {
    warehouses.value = await warehouseStore.fetchWarehouseWithEmployee();
  } catch (error) {
    /* console.log("error fetching recipe: ", error); */
  }
};

const goToWarehouse = (warehouseId) => {
  router.push({ name: "WarehouseDetail", params: { warehouse_id: warehouseId }, query: { from: "payroll" } });
};
</script>

<style lang="scss" scoped>
.widget-card {
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.05);
  height: 400px;
  display: flex;
  flex-direction: column;
}

.vertical-scroll-container {
  flex-grow: 1;
  overflow-y: auto;
  padding: 4px;
  height: 290px;
  
  /* Styling custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
    &:hover {
      background: #94a3b8;
    }
  }
}

.metric-list-item {
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.6);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;

  .list-icon-wrapper {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .bg-indigo-1 {
    background: #e0e7ff;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    border-color: rgba(226, 232, 240, 1);
    background: #fafafa;
  }
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
