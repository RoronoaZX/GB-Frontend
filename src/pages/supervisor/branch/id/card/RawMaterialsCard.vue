<template>
  <div class="product-page-wrapper">
    <!-- {{ filteredRawMaterials }} -->
    <main class="main-content">
      <div v-if="loading" class="loading-container">
        <div class="loading-animation">
          <q-spinner-ripple color="primary" size="60px" />
          <div class="loading-pulsle"></div>
        </div>
        <p class="q-mt-md text-slate-400">Loading your inventory...</p>
      </div>

      <div v-else-if="filteredRawMaterials.length === 0" class="empty-state">
        <div class="empty-icon-wrapper">
          <q-icon name="inventory_2" size="64px" color="grey-4" />
          <div class="empty-icon-ring"></div>
        </div>
        <h4 class="text-h6 text-slate-800 q-mt-md">No raw materials found</h4>
        <p class="text-slate-500">
          Try a different search term or
          <span
            class="text-primary cursor-pointer"
            @click="$emit('add-raw-materials')"
            >add a new raw materials</span
          >
        </p>
      </div>

      <div v-else class="product-grid q-px-md q-pb-xl">
        <q-pull-to-refresh @refresh="handleRefresh" color="primary">
          <div class="row q-col-gutter-md">
            <div
              v-for="rawMaterials in filteredRawMaterials"
              :key="rawMaterials.id"
              class="col-12 col-sm-6 col-md-4"
            >
              <q-card class="product-card" flat>
                <div
                  class="status-banner"
                  :class="getStockStatusClass(rawMaterials)"
                >
                  <div class="status-banner-content">
                    <q-icon :name="getStockIcon(rawMaterials)" size="16px" />
                    <span>{{ getStockStatus(rawMaterials) }}</span>
                  </div>
                  <div class="stock-percentage">
                    {{ getStockPercentage(rawMaterials) }}%
                  </div>
                </div>

                <q-card-section class="q-pb-sm">
                  <div class="row justify-between items-start no-wrap">
                    <div class="col">
                      <div
                        class="category-chip"
                        :style="{
                          backgroundColor:
                            getCategoryColor(
                              rawMaterials.ingredients.category
                            ) + '20',
                          color: getCategoryColor(
                            rawMaterials.ingredients.category
                          ),
                        }"
                      >
                        {{ rawMaterials.ingredients.category || "General" }}
                      </div>
                      <div class="product-title">
                        {{
                          `${capitalizeFirstLetter(
                            rawMaterials.ingredients?.name || "-"
                          )} || ${rawMaterials.ingredients?.code || "-"}`
                        }}
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
                        'product-card': stat.field,
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
                        <span class="stat-label">
                          {{ stat.label }}
                        </span>

                        <div class="stat-value-wrapper">
                          <span class="stat-value" :class="stat.valueClass">
                            <!-- {{ stat.prefixDisplay || "" }} -->
                            {{ getDisplayValue(rawMaterials, stat) }}
                            <small>
                              {{ getUnit(rawMaterials) }}
                            </small>
                          </span>

                          <q-icon name="edit" size="16px" class="edit-icon" />
                        </div>
                      </div>

                      <q-popup-edit
                        v-model="rawMaterials[stat.field]"
                        v-slot="scope"
                        buttons
                        persistent
                        @save="(val) => updatedStocks(rawMaterials, val)"
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
                          <div class="popup-header">
                            <span>
                              {{ rawMaterials?.ingredients?.name || "-" }}</span
                            >
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
                            <template #append>
                              <span class="text-overline">{{
                                rawMaterials?.ingredients?.unit || "-"
                              }}</span>
                            </template>
                          </q-input>
                        </div>
                      </q-popup-edit>
                    </div>
                  </div>
                </q-card-section>

                <q-card-action class="q-px-md q-pb-md q-pt-xs">
                  <div class="row full-width items-center justify-between">
                    <div class="col">
                      <q-btn
                        flat
                        no-caps
                        color="primary"
                        label="Adjust Stock"
                        size="sm"
                        class="adjust-btn"
                        @click="openAdjustStock(rawMaterials)"
                      />
                    </div>
                  </div>
                </q-card-action>
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
import { useBranchRawMaterialsStore } from "src/stores/branch-rawMaterials";
import { useRoute } from "vue-router";

import { useSupervisorStore } from "src/stores/supervisor";

import { useQuasar } from "quasar";
import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatPrice } = typographyFormat();

const route = useRoute();
const branchRawMaterialsStore = useBranchRawMaterialsStore();
const $q = useQuasar();

const supervisorStore = useSupervisorStore();

const branchId = route.params.branch_id;

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

console.log("filter", filter);

const emit = defineEmits(["add-raw-material", "view-details", "adjust-stock"]);

const loading = ref(true);
const editingProduct = ref(null);

const branchRawMaterials = computed(
  () => branchRawMaterialsStore.branchRawMaterials
);

console.log("branchRawMaterials", branchRawMaterials.value);

const filteredRawMaterials = computed(
  () =>
    branchRawMaterials.value?.filter((item) =>
      item.ingredients.code.toLowerCase().includes(filter.filter.toLowerCase())
    ) || []
);

console.log("filteredRawMaterials", filteredRawMaterials.value);

const statFields = [
  {
    field: "total_quantity",
    label: "Available Stocks",
    icon: "inventory",
    color: "teal",
    type: "number",
    step: "1",
    prefix: `${filter}`,
  },
];

const updatedStocks = async (data, val) => {
  console.log("data", data);
  console.log("vssssal", val);

  const payload = {
    report_id: data.id,
    name: data?.ingredients?.name || "undefined",
    original_data: filteredRawMaterials.value?.total_quantity,
    updated_data: val,
    updated_field: "Available Stocks",
    designation: branchId,
    designation_type: "branch",
    action: "updated",
    type_of_report: "Branch Raw Materials Table",
    user_id: userId.value,
  };

  try {
    const response =
      await branchRawMaterialsStore.updateBranchRawMaterialsStocks(
        data.id,
        val,
        payload
      );

    console.log("responsesss", response);

    // ✅ Extract from backend response
    const { status, message } = response.data;

    console.log("statuss", status);
    console.log("messagess", message);

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
  } catch (error) {
    console.log("fkaskjlfhaslkdjf", error);

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

const getUnit = (rm) => {
  const category = rm.ingredients?.category;
  const code = rm.ingredients?.code;

  //🥚 Egg special case
  if (code === "00-I") return "pcs";

  if (category === "Ingredients") return "kg";
  if (category === "Packaging Materials") return "pcs";

  return "";
};

const getDisplayValue = (rm) => {
  // console.log("rm", rm);

  const value = getNormalizedQuantity(rm);

  // If kg show decimals
  if (getUnit(rm) === "kg") {
    return value.toFixed(2);
  }

  return value;
};

const getNormalizedQuantity = (rm) => {
  const quantity = rm.total_quantity ?? 0;
  const category = rm.ingredients?.category;
  const code = rm.ingredients?.code;

  // Special case: Egg (00-I) treat as pcs
  if (code === "00-I") {
    return quantity;
  }

  // If Ingredients, convert grams to kg
  if (category === "Ingredients") {
    return quantity / 1000;
  }

  // Packaging Materials, keep as is
  return quantity;
};

const getStockPercentage = (rm) => {
  const current = getNormalizedQuantity(rm);
  const max = 100;

  // console.log("DEBUG:", {
  //   name: rm.ingredients?.name,
  //   total: rm.total_quantity,
  //   max: rm.max_stock,
  // });

  if (max <= 0) return 0;

  // Now we are dividing (Kg / Kg) or (Pcs / Pcs)
  const percentage = Math.round((current / max) * 100);

  // Return capped at 100 for the progress bar UI
  return Math.min(percentage, 100);
};

const getStockStatus = (rm) => {
  const q = getStockPercentage(rm);
  if (q <= 0) return "Out of Stock";
  if (q < 20) return "Critically Low";
  if (q < 50) return "Low Stock";

  return "Healthy Stock";
};

const getStockIcon = (rm) => {
  const q = getNormalizedQuantity(rm);
  if (q <= 0) return "dangerous";
  if (q < 20) return "warning";
  if (q < 50) return "info";
  return "check_circle";
};

const getStockStatusClass = (rm) => {
  const q = getNormalizedQuantity(rm);
  if (q <= 0) return "status-out";
  if (q < 20) return "status-critical";
  if (q < 50) return "status-low";
  return "status-healthy";
};

const getCategoryColor = (category) => {
  const colors = {
    Ingredients: "teal",
    "Packaging Materials": "brown-6",
  };

  return colors[category] || "#64748b";
};

const openAdjustStock = (rm) => {
  emit("adjsut-stock", rm);
};

const viewDetails = (rm) => {
  emit("view-details", rm);
};

const reloadTableData = async () => {
  try {
    loading.value = true;
    await branchRawMaterialsStore.fetchBranchRawMaterials(
      route.params.branch_id
    );
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
  border-radius: 24px;
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
    background: linear-gradient(135deg, #fed7aa 0%, #fdba74 10%);
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

// Category chip
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
      background: #db3afe;
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
      color: #3b83f6;
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
.muny-btn {
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
