<template>
  <!-- Use q-page for better integration with Quasar Layouts -->
  <q-page class="recipe-page-wrapper">
    <main class="main-content">
      <!-- Header Section -->
      <div v-if="loading" class="loading-container">
        <div class="loading-animation">
          <q-spinner-ripple color="primary" size="60px" />
          <div class="loading-pulse"></div>
        </div>
        <p class="q-mt-md text-slate-400">Loading your inventory...</p>
      </div>

      <div
        v-else-if="filteredPremixesByCategory.length === 0"
        class="empty-state"
      >
        <div class="empty-icon-wrapper">
          <q-icon name="inventory_2" size="64px" color="grey-4" />
          <div class="empty-icon-ring"></div>
        </div>
        <h4 class="text-h6 text-slate-800 q-mt-md">No recipes found</h4>
        <p class="text-slate-500">
          Try a different search term or
          <span class="text-primary cursor-pointer">add a new recipe</span>
        </p>
      </div>

      <!-- Search and Filter Bar -->
      <div v-else class="search-section q-mx-md q-my-md q-pa-sm">
        <div class="row items-center q-col-gutter-sm">
          <div class="col-12 col-md-auto">
            <q-btn-toggle
              v-model="categoryFilter"
              spread
              no-caps
              toggle-color="primary"
              color="white"
              text-color="primary"
              unelevated
              class="filter-toggle"
              :options="[
                { label: 'All', value: 'all' },
                { label: 'Dough', value: 'dough' },
                { label: 'Filling', value: 'filling' },
              ]"
            />
          </div>
        </div>
      </div>

      <!-- Stats Summary (Hidden on very small screens to save space) -->
      <div
        class="stats-summary q-px-md q-mb-md"
        v-if="filteredPremixesByCategory.length > 0"
      >
        <!-- <div class="row q-col-gutter-sm">
          <div class="col-4">
            <div class="summary-card text-center">
              <div class="summary-value text-primary">
                {{ filteredPremixesByCategory.length }}
              </div>
              <div class="summary-label">Total</div>
            </div>
          </div>
          <div class="col-4">
            <div class="summary-card text-center">
              <div class="summary-value text-positive">
                {{ activeRecipesCount }}
              </div>
              <div class="summary-label">Active</div>
            </div>
          </div>
          <div class="col-4">
            <div class="summary-card text-center">
              <div class="summary-value text-brown">{{ totalBreadsCount }}</div>
              <div class="summary-label">Breads</div>
            </div>
          </div>
        </div> -->
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <q-spinner-ripple color="primary" size="60px" />
        <p class="q-mt-md text-slate-400">Loading recipes...</p>
      </div>

      <!-- Recipe Grid -->
      <div v-else class="recipe-grid q-px-md q-pb-xl">
        <q-pull-to-refresh @refresh="handleRefresh" color="primary">
          <!-- Key change: Adjusted col sizes for responsiveness -->
          <div class="row q-col-gutter-md">
            <div
              v-for="premix in filteredPremixesByCategory"
              :key="premix.id || premix.name"
              class="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <q-card class="recipe-card" flat>
                <!-- Card Header -->
                <div class="card-header" :style="getHeaderGradient(premix)">
                  <div class="row justify-between items-center no-wrap">
                    <div
                      class="category-chip"
                      :style="getCategoryStyle(premix.category)"
                    >
                      {{ premix.category || "General" }}
                    </div>
                    <div class="status-chip" :class="getStatusClass(premix)">
                      <q-icon :name="getStatusIcon(premix)" size="14px" />
                      <span>{{ premix.status || "Inactive" }}</span>
                    </div>
                  </div>
                </div>

                <!-- Recipe Info -->
                <q-card-section class="recipe-body">
                  <div class="recipe-name-section no-wrap">
                    <div class="recipe-name ellipsis">
                      {{ capitalizeFirstLetter(premix.name) }}
                      <q-tooltip>{{ premix.name }}</q-tooltip>
                    </div>
                    <q-icon
                      v-if="premix.is_favorite"
                      name="star"
                      color="amber"
                      size="20px"
                    />
                  </div>

                  <!-- Target Production -->
                  <div class="target-section">
                    <div class="row justify-between items-end">
                      <span class="target-label">Total Quantity</span>
                      <span
                        class="target-value text-primary"
                        :class="getStockValueClass(premix)"
                      >
                        {{ formatStockWithUnit(premix.available_stocks) }}
                      </span>
                    </div>

                    <q-linear-progress
                      :value="getTargetProgress(premix)"
                      :color="getProgessColor(premix)"
                      class="q-my-sm"
                      rounded
                    />

                    <div class="row justify-end">
                      <span
                        class="stock-level"
                        :class="getStockLevelClass(premix)"
                      >
                        {{ getStockLevelText(premix) }}ss
                      </span>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-pull-to-refresh>
      </div>
    </main>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { typographyFormat } from "src/composables/typography/typography-format";
import { usePremixStore } from "src/stores/premix";
import { useSupervisorStore } from "src/stores/supervisor";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const { capitalizeFirstLetter } = typographyFormat();

const route = useRoute();
const branchPremixStore = usePremixStore();
const superVisorStore = useSupervisorStore();
const $q = useQuasar();

// Branch ID from route
const branchId = route.params.branch_id;

// User ID from route
const userId = computed(
  () => () =>
    superVisorStore.user?.data?.employee?.id ||
    superVisorStore.user?.data?.employee_id ||
    ""
);

// Props
const props = defineProps({
  filter: String,
});

// const emits = defineEmits(["view-details", "adjust-stock"]);

// Locate State
const loading = ref(false);
const categoryFilter = ref("all");

// Computed properties
const branchPremixes = computed(() => branchPremixStore.premixes || []);

console.log("Branch Premixes:", branchPremixes.value);

const filteredPremixes = computed(
  () =>
    branchPremixes.value?.filter((item) =>
      item.name.toLowerCase().includes(props.filter.toLowerCase())
    ) || []
);

const filteredPremixesByCategory = computed(() => {
  let premixes = filteredPremixes.value;

  if (categoryFilter.value !== "all") {
    premixes = premixes.filter(
      (p) => p.category?.toLowerCase() === categoryFilter.value
    );
  }

  return premixes;
});

console.log("Filtered Premssixes:", filteredPremixesByCategory.value);

const activePremixesCount = computed(() => {
  return filteredPremixesByCategory.value.filter((p) => p.status === "active")
    .length;
});

const formatStockWithUnit = (value) => {
  const num = Number(value);

  if (isNaN(num) || num === 0) return "0";

  // Format number (remove trailing zeros)
  const formatted = num % 1 === 0 ? num : num.toFixed(2).replace(/\.?0+$/, "");

  // Add unit logic
  if (num === 1) {
    return `${formatted} kg`;
  }

  return `${formatted} kgs`;
};

const getHeaderGradient = (premix) => {
  const gradients = {
    dough: "linear-gradient(135deg, #8B4513 0%, #A0522D 100%)",
    filling: "linear-gradient(135deg, #FF8C00 0%, #FFA500 100%)",
    default: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  };
  return {
    background: gradients[premix.category?.toLowerCase()] || gradients.default,
  };
};

const getStatusClass = (premix) => {
  return premix.status?.toLowerCase() === "active"
    ? "status-active"
    : "status-inactive";
};

const getStatusIcon = (premix) => {
  return premix.status?.toLowerCase() === "active"
    ? "check_circle"
    : "pause_circle";
};

const getStockLevelText = (premix) => {
  const target = 10;
  const production = premix.available_stocks || 0;

  if (target === 0) return "No target set";

  const percentage = (production / target) * 100;

  if (percentage < 30) return "Critical Stock";
  if (percentage < 70) return "Low Stock";

  return "Good Stock";
};

const getStockValueClass = (premix) => {
  const target = 10;
  const production = premix.available_stocks || 0;

  if (target === 0) return "text-primary";

  const percentage = (production / target) * 100;

  if (percentage < 30) return "text-red";
  if (percentage < 70) return "text-orange";
  return "text-positive";
};

const getStockLevelClass = (premix) => {
  const target = 10;
  const production = premix.available_stocks || 0;

  if (target === 0) return "text-grey";

  const percentage = (production / target) * 100;

  if (percentage < 30) return "text-red";
  if (percentage < 70) return "text-orange";

  return "text-positive";
};

const getTargetProgress = (premix) => {
  console.log("Calculating progress for premix:", premix);

  const target = 10;
  const production = premix.available_stocks || 0;
  if (target === 0) return 0;
  return Math.min(production / target, 1);
};

const getProgessColor = (premix) => {
  const target = 10;
  const production = premix.available_stocks || 0;

  if (target === 0) return "grey";

  const percentage = (production / target) * 100;

  if (percentage < 30) {
    return "red";
  } else if (percentage < 70) {
    return "orange";
  } else {
    return "positive";
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

const reloadData = async () => {
  try {
    loading.value = true;
    await branchPremixStore.fetchBranchPremix(branchId);
  } catch (error) {
    console.error("Error reloading premixes:", error);
    $q.notify({
      message: "Failed to reload premixes",
      color: "negative",
      icon: "error",
    });
  } finally {
    loading.value = false;
  }
};

const handleRefresh = async (done) => {
  await reloadData();
  done();
};
</script>

<style scoped lang="scss">
.recipe-page-wrapper {
  background: #f8fafc;
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
</style>
