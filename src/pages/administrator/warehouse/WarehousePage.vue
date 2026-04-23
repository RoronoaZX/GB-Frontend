<template>
  <q-page class="q-pa-lg bg-grey-2">
    <div class="q-mb-xl">
      <div class="row items-center justify-between q-mb-md">
        <div>
          <div class="text-h4 text-weight-bolder text-grey-9">Warehouse Hub</div>
          <div class="text-subtitle1 text-grey-6">Manage and monitor your distribution centers</div>
        </div>
        <WarehouseCreateComponent />
      </div>

      <!-- Quick Stats Metrics -->
      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-12 col-sm-4">
          <q-card flat class="stat-card total-warehouses shadow-1">
            <q-card-section class="row items-center no-wrap">
              <q-avatar icon="inventory_2" color="blue-1" text-color="blue-7" size="lg" />
              <div class="q-ml-md">
                <div class="text-h5 text-weight-bold">{{ warehouseCount }}</div>
                <div class="text-caption text-grey-7">Total Warehouses</div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-4">
          <q-card flat class="stat-card open-warehouses shadow-1">
            <q-card-section class="row items-center no-wrap">
              <q-avatar icon="check_circle" color="green-1" text-color="green-7" size="lg" />
              <div class="q-ml-md">
                <div class="text-h5 text-weight-bold">{{ openCount }}</div>
                <div class="text-caption text-grey-7">Active Centers</div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-4">
          <q-card flat class="stat-card closed-warehouses shadow-1">
            <q-card-section class="row items-center no-wrap">
              <q-avatar icon="block" color="red-1" text-color="red-7" size="lg" />
              <div class="q-ml-md">
                <div class="text-h5 text-weight-bold">{{ closedCount }}</div>
                <div class="text-caption text-grey-7">Closed / Maintenance</div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-card class="elegant-container shadow-2" flat bordered>
        <q-card-section>
          <WarehouseTableComponent />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script setup>
import { computed } from "vue";
import { useWarehousesStore } from "src/stores/warehouse";
import WarehouseTableComponent from "./components/WarehouseTableComponent.vue";
import WarehouseCreateComponent from "./components/WarehouseCreateComponent.vue";

const warehouseStore = useWarehousesStore();

const warehouses = computed(() => warehouseStore.warehouses);
const warehouseCount = computed(() => warehouses.value.length);
const openCount = computed(
  () =>
    warehouses.value.filter((w) => w.status?.toLowerCase() === "open").length
);
const closedCount = computed(
  () =>
    warehouses.value.filter((w) => w.status?.toLowerCase() === "closed").length
);
</script>

<style lang="scss" scoped>
.elegant-container {
  background: #ffffff;
  border-radius: 16px;
  border: none;
}

.stat-card {
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
  }
}

.bg-grey-2 {
  background-color: #f4f7f6 !important;
}
</style>
