<template>
  <div class="q-pa-lg bg-grey-2">
    <!-- Dashboard Section -->
    <div class="row q-col-gutter-md q-mb-lg">
      <!-- Total Items -->
      <div class="col-12 col-md-4">
        <q-card flat bordered class="metric-card bg-white shadow-1 overflow-hidden">
          <div class="card-accent bg-blue-6"></div>
          <q-card-section class="row items-center no-wrap q-py-lg">
            <q-avatar icon="inventory_2" color="blue-1" text-color="blue-7" size="74px" font-size="32px" />
            <div class="q-ml-lg">
              <div class="text-h3 text-weight-bolder text-blue-9 line-height-1">{{ totalItems }}</div>
              <div class="text-subtitle2 text-grey-6 text-uppercase letter-spacing-1">Total Ingredients</div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Low Stock -->
      <div class="col-12 col-md-4">
        <q-card flat bordered class="metric-card bg-white shadow-1 overflow-hidden">
          <div class="card-accent bg-orange-6"></div>
          <q-card-section class="row items-center no-wrap q-py-lg">
            <q-avatar icon="warning_amber" color="orange-1" text-color="orange-7" size="74px" font-size="32px" />
            <div class="q-ml-lg">
              <div class="text-h3 text-weight-bolder text-orange-9 line-height-1">{{ lowStockCount }}</div>
              <div class="text-subtitle2 text-grey-6 text-uppercase letter-spacing-1">Low Stock Alerts</div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Danger/Out of Stock -->
      <div class="col-12 col-md-4">
        <q-card flat bordered class="metric-card bg-white shadow-1 overflow-hidden">
          <div class="card-accent bg-red-6"></div>
          <q-card-section class="row items-center no-wrap q-py-lg">
            <q-avatar icon="error_outline" color="red-1" text-color="red-7" size="74px" font-size="32px" />
            <div class="q-ml-lg">
              <div class="text-h3 text-weight-bolder text-red-9 line-height-1">{{ outOfStockCount }}</div>
              <div class="text-subtitle2 text-grey-6 text-uppercase letter-spacing-1">Critical Depletion</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Table Section -->
    <q-card flat bordered class="shadow-1 rounded-borders-lg bg-white">
      <q-card-section class="q-pa-md bg-grey-1 border-bottom">
        <div class="row items-center justify-between">
          <div class="row items-center q-gutter-x-sm">
            <q-icon name="analytics" color="primary" size="24px" />
            <div class="text-h6 text-weight-bolder text-grey-9">Inventory Details</div>
            <q-separator vertical inset class="q-mx-md" />
            <div class="row items-center q-gutter-x-sm">
              <div class="text-caption text-weight-bold text-grey-6 text-uppercase letter-spacing-1">Status Guide:</div>
              <q-badge rounded padding="xs md" label="Healthy" color="positive" />
              <q-badge rounded padding="xs md" label="Warning" color="warning" />
              <q-badge rounded padding="xs md" label="Danger" color="red" />
            </div>
          </div>
        </div>
      </q-card-section>
      
      <q-card-section class="q-pa-none">
        <RawMaterialsTable />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { computed } from "vue";
import RawMaterialsTable from "./components/RawMaterialsTable.vue";
import { useWarehouseRawMaterialsStore } from "src/stores/warehouse-rawMaterials";

const warehouseRawMaterialsStore = useWarehouseRawMaterialsStore();


const rawMaterials = computed(() => warehouseRawMaterialsStore.warehouseRawMaterials);

const totalItems = computed(() => rawMaterials.value.length);

const lowStockCount = computed(() => {
  return rawMaterials.value.filter(item => {
    const totalQuantity = item.total_quantity;
    const unit = item.raw_materials.unit;
    
    let stockValue;
    if (totalQuantity >= 1000) {
      stockValue = totalQuantity / 1000;
    } else {
      stockValue = totalQuantity;
    }

    return stockValue >= 3 && stockValue < 5;
  }).length;
});

const outOfStockCount = computed(() => {
  return rawMaterials.value.filter(item => {
    const totalQuantity = item.total_quantity;
    const unit = item.raw_materials.unit;
    
    if (unit === "Grams" && totalQuantity < 1000) return true;

    let stockValue;
    if (totalQuantity >= 1000) {
      stockValue = totalQuantity / 1000;
    } else {
      stockValue = totalQuantity;
    }

    return stockValue < 3;
  }).length;
});
</script>

<style lang="scss" scoped>
.metric-card {
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08) !important;
  }
}

.card-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
}

.line-height-1 {
  line-height: 1;
}

.letter-spacing-1 {
  letter-spacing: 1px;
}

.border-subtle {
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.rounded-borders-lg {
  border-radius: 16px;
}

.bg-grey-2 {
  background-color: #f4f7f6 !important;
}
</style>
