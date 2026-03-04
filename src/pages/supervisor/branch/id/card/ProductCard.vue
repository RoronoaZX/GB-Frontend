<template>
  <div class="product-page-wrapper">
    <main class="main-content">
      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="loading-animation">
          <q-spinner-ripple color="primary" size="60px" />
          <div class="loading-pulse"></div>
        </div>
        <p class="q-mt-md text-slate-400">Loading your inventory...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredProducts.length === 0" class="empty-state">
        <div class="empty-icon-wrapper">
          <q-icon name="inventory_2" size="64px" color="grey-4" />
          <div class="empty-icon-ring"></div>
        </div>
        <h4 class="text-h6 text-slate-800 q-mt-md">No products found</h4>
        <p class="text-slate-500">
          Try a different search term or
          <span
            class="text-primary cursor-pointer"
            @click="$emit('add-product')"
            >add a new product</span
          >
        </p>
      </div>

      <!-- Product Grid -->
      <div v-else class="product-grid q-px-md q-pb-xl">
        <q-pull-to-refresh @refresh="handleRefresh" color="primary">
          <div class="row q-col-gutter-md">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="col-12 col-sm-6 col-md-4"
            >
              <q-card class="product-card" flat>
                <!-- Stock Status Banner -->
                <div
                  class="status-banner"
                  :class="getStockStatusClass(product)"
                >
                  <div class="status-banner-content">
                    <q-icon :name="getStockIcon(product)" size="16px" />
                    <span>{{ getStockStatus(product) }}</span>
                  </div>
                  <div class="stock-percentage">
                    {{ getStockPercentage(product) }}%
                  </div>
                </div>

                <!-- Product Header -->
                <q-card-section class="q-pb-sm">
                  <div class="row justify-between items-start no-wrap">
                    <div class="col">
                      <div
                        class="category-chip"
                        :style="{
                          backgroundColor:
                            getCategoryColor(product.category) + '20',
                          color: getCategoryColor(product.category),
                        }"
                      >
                        {{ product.category || "General" }}
                      </div>
                      <div class="product-title">
                        {{ capitalizeFirstLetter(product.product?.name) }}
                      </div>
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="q-pt-xs q-pb-sm">
                  <div class="stats-grid">
                    <div
                      v-for="stat in statFields"
                      :key="stat.field"
                      class="stat-card"
                      :class="{
                        'production-card': stat.field === 'new_production',
                      }"
                    >
                      <div class="stat-icon">
                        <q-icon
                          :name="stat.icon"
                          size="18px"
                          :color="stat.color"
                        />
                      </div>

                      <div class="stat-content">
                        <span class="stat-label">{{ stat.label }}</span>

                        <div class="stat-value-wrapper">
                          <span class="stat-value" :class="stat.valueClass">
                            {{ stat.prefixDisplay || "" }}
                            {{ getDisplayValue(product, stat) }}
                            <small v-if="stat.suffix">
                              {{ stat.suffix }}
                            </small>
                          </span>

                          <q-icon name="edit" size="16px" class="edit-icon" />
                        </div>
                      </div>

                      <q-popup-edit
                        v-model="product[stat.field]"
                        v-slot="scope"
                        buttons
                        persistent
                        @save="
                          (val) => handleGlobalUpdate(product, stat.field, val)
                        "
                      >
                        <div class="popup-edit-container">
                          <div class="popup-header">
                            <q-icon
                              :name="stat.icon"
                              size="20px"
                              color="primary"
                            />
                            <span>Edit {{ stat.label }}</span>
                          </div>

                          <q-input
                            v-model="scope.value"
                            :type="stat.type || 'number'"
                            :step="stat.step || '1'"
                            dense
                            autofucus
                            outlined
                            @keyup.enter="scope.set"
                          >
                            <template v-if="stat.prefix" #prepend>
                              <span>{{ stat.prefix }}</span>
                            </template>
                          </q-input>
                        </div>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-card-section>

                <q-card-actions class="q-px-md q-pb-md q-pt-xs">
                  <div class="row full-width items-center justify-between">
                    <div class="col">
                      <q-btn
                        flat
                        no-caps
                        color="primary"
                        label="Adjust Stock"
                        size="sm"
                        class="adjust-btn"
                        @click="openAdjustStock(product)"
                      />
                    </div>
                    <div class="col-auto">
                      <q-btn
                        flat
                        round
                        dense
                        icon="chevron_right"
                        color="grey-6"
                        size="sm"
                        @click="viewDetails(product)"
                      />
                    </div>
                  </div>
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </q-pull-to-refresh>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useBranchProductsStore } from "src/stores/branch-product";
import { useRoute } from "vue-router";
import { typographyFormat } from "src/composables/typography/typography-format";

import { useSupervisorStore } from "src/stores/supervisor";

import { useQuasar } from "quasar";

const { capitalizeFirstLetter, formatPrice } = typographyFormat();

const route = useRoute();
const branchProductStore = useBranchProductsStore();
const $q = useQuasar();

const supervisorStore = useSupervisorStore();

const userId = computed(
  () =>
    supervisorStore.user.data.employee.id ||
    supervisorStore.user.data.employee_id ||
    ""
);

console.log("userId", userId.value);

const filter = defineProps({
  filter: String,
});
const emit = defineEmits(["add-product", "view-details", "adjust-stock"]);

const loading = ref(true);
const editingProduct = ref(null);

const branchProducts = computed(() => branchProductStore.branchProducts);

const filteredProducts = computed(
  () =>
    branchProducts.value?.filter((item) =>
      item.product.name.toLowerCase().includes(filter.filter.toLowerCase())
    ) || []
);

console.log("filteredProducts", filteredProducts.value);

const statFields = [
  {
    field: "price",
    label: "Price",
    icon: "attach_money",
    color: "primary",
    type: "number",
    step: "0.01",
    prefix: "₱",
    format: (val) => formatPrice(val),
    valueClass: "text-primary",
  },
  {
    field: "total_quantity",
    label: "Total Pcs",
    icon: "inventory",
    color: "teal",
    type: "number",
    step: "1",
    suffix: "pcs",
  },
  {
    field: "beginnings",
    label: "Beginning",
    icon: "trending_up",
    color: "orange",
    type: "number",
    step: "1",
    suffix: "pcs",
  },
  {
    field: "new_production",
    label: "New Production",
    icon: "add_circle",
    color: "green",
    type: "number",
    step: "1",
    suffix: "pcs",
    prefixDisplay: "+",
  },
];

const getDisplayValue = (product, stat) => {
  let value = product[stat.field] ?? 0;

  if (stat.format) {
    return stat.format(value);
  }

  return value;
};

// Enhanced Stock Status Functions
const getStockPercentage = (p) => {
  const maxStock = p.max_stock || 100; // You might have max_stock in your data
  return Math.min(Math.round(((p.total_quantity || 0) / maxStock) * 100), 100);
};

const getStockStatus = (p) => {
  const q = p.total_quantity || 0;
  if (q <= 0) return "Out of Stock";
  if (q < 20) return "Critically Low";
  if (q < 50) return "Low Stock";
  return "Healthy Stock";
};

const getStockIcon = (p) => {
  const q = p.total_quantity || 0;
  if (q <= 0) return "dangerous";
  if (q < 20) return "warning";
  if (q < 50) return "info";
  return "check_circle";
};

const getStockStatusClass = (p) => {
  const q = p.total_quantity || 0;
  if (q <= 0) return "status-out";
  if (q < 20) return "status-critical";
  if (q < 50) return "status-low";
  return "status-healthy";
};

const getCategoryColor = (category) => {
  const colors = {
    Bread: "#795548",
    Nestle: "#1976D2",
    Selecta: "#f44336",
    Others: "#607d8b",
    Softdrinks: "#9c27b0",
  };
  return colors[category] || "#64748b";
};

const handleGlobalUpdate = async (product, field, newVal) => {
  if (!userId.value) return;

  console.log("product", product);
  console.log("field", field);
  console.log("newVal", newVal);

  const meta = {
    id: product.id,
    // branches_id: route.params.branch_id,
    // product_id: product.product_id || product.product.id,
    updated_data: newVal,
    updated_field: field,
  };

  console.log("meta", meta);

  try {
    const response = await branchProductStore.updateProductBranch(meta);

    console.log("responsesssssss", response);

    // ✅ Extract from backend response
    const { status, message } = response.data;

    console.log("status", status);
    console.log("message", message);

    const typeMap = {
      success: "positive",
      warning: "warning",
      error: "negative",
    };

    const iconMap = {
      success: "check_circle",
      warning: "warning",
      error: "error",
    };

    $q.notify({
      type: typeMap[status] || "info",
      message: message || "Action completed",
      position: "top-right",
      timeout: 1500,
      icon: iconMap[status] || "info",
    });

    console.log();
  } catch (error) {
    console.log("Error updating product:", error);

    $q.notify({
      type: "negative",
      message:
        error.response?.data?.message || "Something went wrong while updating.",
      position: "top-right",
      timeout: 2000,
      icon: "error",
    });
  }
};

const openAdjustStock = (product) => {
  emit("adjust-stock", product);
};

const viewDetails = (product) => {
  emit("view-details", product);
};

const reloadTableData = async () => {
  try {
    loading.value = true;
    await branchProductStore.fetchBranchProducts(route.params.branch_id);
  } finally {
    loading.value = false;
  }
};

onMounted(reloadTableData);

const handleRefresh = async (done) => {
  await reloadTableData();
  done();
};
</script>

<style scoped lang="scss">
.product-page-wrapper {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  min-height: 100vh;
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 0;
}

// Loading State
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;

  .loading-animation {
    position: relative;

    .loading-pulse {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: rgba(59, 130, 246, 0.1);
      animation: pulse 2s infinite;
    }
  }
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.5;
  }
  70% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0;
  }
}

// Empty State
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  text-align: center;

  .empty-icon-wrapper {
    position: relative;

    .empty-icon-ring {
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      border: 2px dashed #e2e8f0;
      border-radius: 50%;
      animation: spin 20s linear infinite;
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// Product Card
.product-card {
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.15);

    .status-banner {
      transform: scale(1.02);
    }

    .edit-icon {
      opacity: 1;
      transform: translateX(0);
    }
  }
}

// Status Banner
.status-banner {
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  .status-banner-content {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 500;
  }

  .stock-percentage {
    font-size: 12px;
    font-weight: 600;
    opacity: 0.9;
  }

  &.status-out {
    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
    color: #dc2626;
  }

  &.status-critical {
    background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);
    color: #c2410c;
  }

  &.status-low {
    background: linear-gradient(135deg, #fef9c3 0%, #fde047 100%);
    color: #854d0e;
  }

  &.status-healthy {
    background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
    color: #15803d;
  }
}

// Category Chip
.category-chip {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.3px;
  margin-bottom: 8px;
}

// Product Title
.product-title {
  font-size: 20px;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.3;
  margin-bottom: 8px;
}

// Stats Grid
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.stat-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }

  &.price-card {
    cursor: pointer;
    position: relative;
    background: #eff6ff;

    &:hover {
      background: #dbeafe;
    }
  }

  &.production-card {
    background: #f0fdf4;

    &:hover {
      background: #dcfce7;
    }
  }

  .stat-icon {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stat-content {
    flex: 1;
  }

  .stat-label {
    display: block;
    font-size: 10px;
    font-weight: 500;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    margin-bottom: 2px;
  }

  .stat-value-wrapper {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .stat-value {
    font-size: 16px;
    font-weight: 600;
    color: #0f172a;

    small {
      font-size: 10px;
      font-weight: 400;
      color: #64748b;
      margin-left: 2px;
    }

    &.text-primary {
      color: #3b82f6;
    }

    &.text-green {
      color: #15803d;
    }
  }

  .edit-icon {
    opacity: 0;
    transform: translateX(-4px);
    transition: all 0.2s ease;
    color: #64748b;
  }
}

// Popup Edit Styling
.popup-edit-container {
  padding: 16px;
  min-width: 280px;

  .popup-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e2e8f0;

    span {
      font-weight: 600;
      color: #0f172a;
      font-size: 14px;
    }
  }

  .popup-input {
    margin-bottom: 12px;

    :deep(.q-field__control) {
      border-radius: 12px;
      background: #f8fafc;
    }

    .currency-symbol {
      font-size: 14px;
      font-weight: 600;
      color: #64748b;
    }
  }

  .popup-footer {
    display: flex;
    justify-content: flex-end;

    small {
      font-size: 10px;
      color: #94a3b8;
    }
  }
}

// Menu Button
.menu-btn {
  opacity: 0.6;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.05);
  }
}

.product-menu {
  border-radius: 12px;
  overflow: hidden;

  .q-item {
    min-height: 40px;

    .q-item__section--avatar {
      min-width: 32px;
    }
  }
}

// Adjust Button
.adjust-btn {
  border-radius: 100px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(59, 130, 246, 0.1);
  }
}

// Responsive Adjustments
@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .product-card {
    border-radius: 20px;
  }
}
</style>
