<template>
  <div class="recipe-page-wrapper">
    <main class="main-content">
      <div v-if="loading" class="loading-container">
        <div class="loading-animation">
          <q-spinner-ripple color="primary" size="60px" />
          <div class="loading-pulse"></div>
        </div>
        <p>Loading your inventory...</p>
      </div>

      <div v-else-if="bakerReports.length === 0" class="empty-state">
        <div class="empty-icon-wrapper">
          <div class="empty-icon-ring"></div>
        </div>
        <h4 class="text-h6 text-slate-900 q-mt-md">No baker reports found</h4>
        <p class="text-slate-500">
          Try a different search term or
          <span class="text-primary cursor-pointer"
            >add a new baker report</span
          >
        </p>
      </div>

      <div v-else class="recipe-grid q-px-md q-pb-xl">
        <q-pull-to-refresh @refresh="handleRefresh" color="primary">
          <div class="row q-col-gutter-md">
            <div
              v-for="bakerReport in bakerReports"
              :key="bakerReport.id"
              class="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <q-card class="recipe-card" flat>
                <div
                  class="card-header"
                  :style="getHeaderGradient(bakerReport)"
                >
                  <div class="row justify-between items-center no-wrap">
                    <div
                      class="category-chip"
                      :style="getCategoryStyle(bakerReport.recipe_category)"
                    >
                      {{ bakerReport.recipe_category || "General" }}
                    </div>

                    <div
                      class="status-chip"
                      :class="getStatusClass(bakerReport)"
                    >
                      <q-icon
                        :name="getStatusIcon(bakerReport)"
                        :color="getStatusColor(bakerReport)"
                        size="14px"
                      />
                      <span :color="getStatusColor(bakerReport)">{{
                        capitalizeFirstLetter(bakerReport.status || "Inactive")
                      }}</span>
                    </div>
                  </div>
                </div>

                <q-card-section class="recipe-body">
                  <div class="recipe-name-section no-wrap">
                    <div class="recipe-name ellipsis">
                      {{
                        capitalizeFirstLetter(
                          bakerReport.branch_recipe?.recipe?.name
                        )
                      }}
                      <q-tooltip>{{ bakerReport.name }}</q-tooltip>
                    </div>

                    <q-icon
                      v-if="bakerReport.is_favorite"
                      name="star"
                      color="amber"
                      size="20px"
                    />
                  </div>

                  <div class="target-section">
                    <span class="target-label">Expected target per kilo</span>
                    <div>
                      <span class="target-value text-primary">
                        {{ formatRecipeTarget(bakerReport.target) }}
                        <small>pcs</small>
                      </span>
                    </div>
                  </div>

                  <div class="target-section">
                    <span class="target-label">Actual target per kilo</span>
                    <div>
                      <span class="target-value text-primary">
                        {{ Math.ceil(bakerReport.target * bakerReport.kilo) }}
                        <small>pcs</small>
                      </span>
                    </div>
                  </div>

                  <div class="preview-container q-gutter-y-xs">
                    <div class="preview-box">
                      <div
                        class="preview-trigger row items-center justify-between cursor-pointer"
                        @click="toggleBreadList(bakerReport)"
                      >
                        <div class="row items-center">
                          <q-icon
                            name="bakery_dining"
                            size="18px"
                            color="brown"
                            class="q-mr-xs"
                          />
                          <span class="text-caption text-weight-bold">
                            Breads ({{
                              bakerReport.bread_production_reports?.length || 0
                            }})
                          </span>
                        </div>
                        <q-icon
                          :name="
                            expandedBreads[bakerReport.id]
                              ? 'expand_less'
                              : 'expand_more'
                          "
                        />
                      </div>

                      <q-slide-transition>
                        <div
                          v-if="expandedBreads[bakerReport.id]"
                          class="preview-list"
                        >
                          <div
                            v-for="(
                              breadReport, i
                            ) in bakerReport.bread_production_reports || []"
                            :key="i"
                            class="list-item row justify-between"
                          >
                            <span class="ellipsis col-8">
                              {{
                                capitalizeFirstLetter(
                                  breadReport?.bread?.name || ""
                                )
                              }}
                            </span>
                            <span class="item-quantity">{{
                              breadReport.bread_new_production || 1
                            }}</span>
                          </div>
                        </div>
                      </q-slide-transition>
                    </div>

                    <div class="preview-box">
                      <div
                        class="preview-trigger row items-center justify-between cursor-pointer"
                        @click="toggleIngredientList(bakerReport)"
                      >
                        <div class="row items-center">
                          <q-icon
                            name="restaurant"
                            size="18px"
                            color="purple"
                            class="q-mr-xs"
                          />
                          <span class="text-caption text-weight-bold">
                            Ingredients ({{
                              bakerReport.ingredient_bakers_reports?.length ||
                              0
                            }})
                          </span>
                        </div>
                        <q-icon
                          :name="
                            expandedIngredients[bakerReport.id]
                              ? 'exapand_less'
                              : 'expand_more'
                          "
                        />
                      </div>

                      <q-slide-transition>
                        <div
                          v-if="expandedIngredients[bakerReport.id]"
                          class="preview-list"
                        >
                          <div
                            v-for="(
                              bakerReport, i
                            ) in bakerReport.ingredient_bakers_reports || []"
                            :key="i"
                            class="list-item row justify-between"
                          >
                            <span class="ellipsis col-8">
                              {{
                                capitalizeFirstLetter(
                                  bakerReport?.ingredients?.name || ""
                                )
                              }}
                            </span>
                            <span class="item-quantity">{{
                              formatQuantity(bakerReport)
                            }}</span>
                          </div>
                        </div>
                      </q-slide-transition>
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
                            {{ getDisplayValue(bakerReport, stat) }}
                            <small v-if="stat.suffix">
                              {{ stat.suffix }}
                            </small>
                          </span>

                          <q-icon name="edit" size="16px" class="edit-icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>

                <q-card-actions class="q-px-md q-pb-md q-pt-xs">
                  <div class="row full-width items-center justify-between">
                    <div class="col">
                      <!-- <q-btn
                        flat
                        no-caps
                        size="sm"
                        color="primary"
                        label="Adjust Report"
                      /> -->
                      <span class="text-primary text-caption">
                        Adjust Report
                      </span>
                    </div>
                    <div class="col-auto">
                      <q-btn
                        flat
                        round
                        dense
                        icon="chevron_left"
                        color="grey-6"
                        size="md"
                        @click="
                          handleBakerReportEditDialog(
                            bakerReport,
                            props.salesReportId
                          )
                        "
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
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import EditBakerReports from "../edit/EditBakerReports.vue";

import { typographyFormat } from "src/composables/typography/typography-format";
import { useQuasar } from "quasar";

const { capitalizeFirstLetter, formatRecipeTarget, trimTrailingZeros } =
  typographyFormat();

const route = useRoute();

const userId = computed(() => route.params.id);

const $q = useQuasar();

const props = defineProps({
  bakerReports: Array,
  salesReportId: Number,
});

// track which report cards have their bread list expanded
const expandedBreads = ref({});
const expandedIngredients = ref({});

console.log("baker reportssss: ", props.bakerReports);

const statFields = [
  {
    field: "kilo",
    label: "Kilos",
    icon: "scale",
    color: "primary",
    type: "number",
    step: "0.01",
    prefix: "Kg/s",
    valueClass: "text-primary",
    suffix: "Kg/s",
  },
  {
    field: "over",
    label: "Over",
    icon: "balance",
    color: "primary",
    type: "number",
    step: "0.01",
    prefix: "Kg/s",
    valueClass: "text-primary",
    suffix: "Kg/s",
  },
  {
    field: "short",
    label: "Short",
    icon: "balance",
    color: "primary",
    type: "number",
    step: "0.01",
    prefix: "Kg/s",
    valueClass: "text-primary",
    suffix: "Kg/s",
  },
];

const handleBakerReportEditDialog = (bakerReports, salesReportId) => {
  $q.dialog({
    component: EditBakerReports,
    componentProps: {
      bakerReports: bakerReports,
      sales_report_id: salesReportId,
    },
  });
};

const getDisplayValue = (bakerReport, stat) => {
  let value = bakerReport[stat.field] ?? 0;

  if (stat.format) {
    return stat.format(value);
  }

  return trimTrailingZeros(value);
};

const toggleBreadList = (bakerReport) => {
  const key = bakerReport.id || bakerReport.name;
  expandedBreads.value[key] = !expandedBreads.value[key];
};

const toggleIngredientList = (bakerReport) => {
  const key = bakerReport.id || bakerReport.name;
  expandedIngredients.value[key] = !expandedIngredients.value[key];
};

const getHeaderGradient = (bakerReport) => {
  const gradients = {
    dough: "linear-gradient(135deg, #8B4513 0%, #A0522D 100%)",
    filling: "linear-gradient(135deg, #FF8C00 0%, #FFA500 100%)",
    default: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  };

  return {
    background:
      gradients[bakerReport.category?.toLowerCase()] || gradients.default,
  };
};

const formatQuantity = (ingredient) => {
  const formattedQuantity = Number(ingredient.quantity) || 0;
  const unit = (ingredient.unit || "").toLowerCase();

  // ✅ If PCS → return as is
  if (unit === "pcs" || unit === "pc") {
    return `${parseFloat(formattedQuantity.toFixed(3))} pcs`;
  }

  // ✅ If GRAMS → convert if needed, otherwise return as g
  if (unit === "gram" || unit === "grams" || unit === "g") {
    if (formattedQuantity >= 1000) {
      const kgValue = parseFloat((formattedQuantity / 1000).toFixed(3));
      return `${kgValue} kg`;
    } else {
      return `${parseFloat(formattedQuantity.toFixed(3))} g`;
    }
  }

  // ✅ Default fallback
  return `${parseFloat(formattedQuantity.toFixed(3))} ${unit}`;
};
const getStatusClass = (bakerReport) => {
  return bakerReport.status?.toLowerCase() === "confirm"
    ? "status-active"
    : "status-inactive";
};

const getStatusIcon = (bakerReport) => {
  const status = bakerReport.status?.toLowerCase();

  switch (status) {
    case "confirmed":
      return "check_circle";
    case "declined":
      return "cancel";
    case "pending":
      return "pending";
    default:
      return "help_outline";
  }
};

const getStatusColor = (bakerReport) => {
  const status = bakerReport.status?.toLowerCase();

  switch (status) {
    case "confirmed":
      return "positive";
    case "declined":
      return "negative";
    case "pending":
      return "warning";
    default:
      return "info";
  }
};

const getCategoryStyle = (category) => {
  const colors = {
    dough: { bg: "rgba(201, 171, 150, 0.921)", color: "#3e2723" },
    filling: { bg: "rgba(245, 241, 3, 0.933)", color: "#824602" },
    default: { bg: "rgba(102, 126, 234, 0.15)", color: "#667eea" },
  };

  const style = colors[category?.toLowerCase()] || colors.default;

  return {
    backgroundColor: style.bg,
    color: style.color,
  };
};
</script>

<style scoped lang="scss">
.recipe-page-wrapper {
  background: #f8fafc;
}
.item-quantity {
  font-size: 0.9rem;
  color: #7f8c8d;
  background: #f8f9fa;
  padding: 2px 8px;
  border-radius: 12px;
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
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

.text-primary {
  color: #3b82f6;
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

// Stats summary cards
.summary-card {
  background: white;
  padding: 12px 8px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  .summary-value {
    font-size: 1.2rem;
    font-weight: 800;
    line-height: 1;
  }
  .summary-label {
    font-size: 0.7rem;
    color: #64748b;
    text-transform: uppercase;
    margin-top: 4px;
  }
}

.search-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.filter-toggle {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.recipe-card {
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.2s;

  &:active {
    transform: scale(0.98);
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
.card-header {
  padding: 12px 16px 30px;
}

.category-chip,
.status-chip {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  background: white;
}

.recipe-body {
  margin-top: -20px;
  background: white;
  border-radius: 20px 20px 0 0;
  flex-grow: 1;
}

.recipe-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
}

.target-section {
  background: #f1f5f9;
  padding: 12px;
  border-radius: 12px;
  margin: 12px 0;
}

.target-label {
  font-size: 0.8rem;
  color: #64748b;
}
.target-value {
  font-size: 1.1rem;
  font-weight: 700;
}
.production-label {
  font-size: 0.75rem;
  color: #64748b;
}
.production-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: #15803d;
}

.price-section {
  background: #fff7ed;
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 12px;
}

.preview-box {
  border: 1px solid #f1f5f9;
  border-radius: 8px;
  .preview-trigger {
    padding: 8px;
  }
  .preview-list {
    padding: 0 8px 8px;
    max-height: 150px;
    overflow-y: auto;
  }
  .list-item {
    font-size: 0.8rem;
    padding: 4px 0;
    border-top: 1px solid #f1f5f9;
  }
}

// Utility
.gap-xs {
  gap: 4px;
}
.full-width-mobile {
  @media (max-width: 600px) {
    width: 100%;
  }
}

.stock-level {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.text-red {
  color: #ef4444;
}

.text-orange {
  color: #f97316;
}

.text-positive {
  color: #10b981;
}

.adjust-btn {
  border-radius: 100px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(59, 130, 146, 0.1);
  }
}
</style>
