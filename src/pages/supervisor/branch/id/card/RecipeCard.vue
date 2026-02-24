<template>
  <!-- Use q-page for better integration with Quasar Layouts -->
  <q-page class="recipe-page-wrapper">
    <main class="main-content">
      <!-- Header Section -->
      <div class="header-section q-px-md q-pt-lg">
        <div
          class="header-content row items-center justify-between q-gutter-y-sm"
        >
          <div class="col-12 col-sm-auto">
            <h5 class="text-h5 text-weight-bold text-slate-800 q-mb-none">
              Recipe Management
            </h5>
            <p class="text-slate-500 q-mb-none">
              Manage branch recipes and targets
            </p>
          </div>
          <div class="col-12 col-sm-auto">
            <q-btn
              unelevated
              color="primary"
              label="Create New Recipe"
              icon="add"
              class="create-btn full-width-mobile"
              @click="emit('add-recipe')"
            />
          </div>
        </div>
      </div>

      <!-- Search and Filter Bar -->
      <div class="search-section q-mx-md q-my-md q-pa-sm">
        <div class="row items-center q-col-gutter-sm">
          <div class="col-12 col-md">
            <q-input
              v-model="localFilter"
              outlined
              dense
              placeholder="Search recipes..."
              class="search-input"
              bg-color="white"
            >
              <template v-slot:prepend>
                <q-icon name="search" color="grey-6" />
              </template>
            </q-input>
          </div>
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
        v-if="filteredRecipesByCategory.length > 0"
      >
        <div class="row q-col-gutter-sm">
          <div class="col-4">
            <div class="summary-card text-center">
              <div class="summary-value text-primary">
                {{ filteredRecipesByCategory.length }}
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
        </div>
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
              v-for="recipe in filteredRecipesByCategory"
              :key="recipe.id || recipe.name"
              class="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <q-card class="recipe-card" flat>
                <!-- Card Header -->
                <div class="card-header" :style="getHeaderGradient(recipe)">
                  <div class="row justify-between items-center no-wrap">
                    <div
                      class="category-chip"
                      :style="getCategoryStyle(recipe.category)"
                    >
                      {{ recipe.category || "General" }}
                    </div>
                    <div class="status-chip" :class="getStatusClass(recipe)">
                      <q-icon :name="getStatusIcon(recipe)" size="14px" />
                      <span>{{ recipe.status || "Inactive" }}</span>
                    </div>
                  </div>
                </div>

                <!-- Recipe Info -->
                <q-card-section class="recipe-body">
                  <div class="recipe-name-section no-wrap">
                    <div class="recipe-name ellipsis">
                      {{ capitalizeFirstLetter(recipe.name) }}
                      <q-tooltip>{{ recipe.name }}</q-tooltip>
                    </div>
                    <q-icon
                      v-if="recipe.is_favorite"
                      name="star"
                      color="amber"
                      size="20px"
                    />
                  </div>

                  <!-- Target Production -->
                  <div class="target-section">
                    <div class="row justify-between items-end">
                      <span class="target-label">Daily Target</span>
                      <span class="target-value text-primary">
                        {{ formatNumber(recipe.target) }} <small>pcs</small>
                      </span>
                    </div>
                    <q-linear-progress
                      :value="getTargetProgress(recipe)"
                      color="primary"
                      class="q-my-sm"
                      size="6px"
                      rounded
                    />
                    <div class="row justify-between items-center">
                      <span class="production-label">Today:</span>
                      <span class="production-value"
                        >{{ recipe.today_production || 0 }} pcs</span
                      >
                    </div>
                  </div>

                  <!-- Price Info -->
                  <div class="price-section row items-center justify-between">
                    <div class="row items-center gap-xs">
                      <q-icon name="sell" size="14px" color="orange-9" />
                      <span class="text-caption text-weight-medium"
                        >Price/Kilo</span
                      >
                    </div>
                    <span
                      class="text-subtitle2 text-orange-10 text-weight-bold"
                    >
                      ₱{{ formatNumber(recipe.price_per_kilo) }}
                    </span>
                  </div>

                  <!-- Collapsible Lists -->
                  <div class="previews-container q-gutter-y-xs">
                    <!-- Breads -->
                    <div class="preview-box">
                      <div
                        class="preview-trigger row items-center justify-between cursor-pointer"
                        @click="toggleBreadList(recipe)"
                      >
                        <div class="row items-center">
                          <q-icon
                            name="bakery_dining"
                            size="18px"
                            color="brown"
                            class="q-mr-xs"
                          />
                          <span class="text-caption text-weight-bold"
                            >Breads ({{
                              recipe.bread_groups?.length || 0
                            }})</span
                          >
                        </div>
                        <q-icon
                          :name="
                            expandedBreads[recipe.id || recipe.name]
                              ? 'expand_less'
                              : 'expand_more'
                          "
                        />
                      </div>
                      <q-slide-transition>
                        <div
                          v-if="expandedBreads[recipe.id || recipe.name]"
                          class="preview-list"
                        >
                          <div
                            v-for="(bread, i) in recipe.bread_groups"
                            :key="i"
                            class="list-item row justify-between"
                          >
                            <span class="ellipsis col-8">{{ bread.name }}</span>
                            <span class="text-weight-bold col-4 text-right"
                              >{{ bread.quantity }}pcs</span
                            >
                          </div>
                        </div>
                      </q-slide-transition>
                    </div>

                    <!-- Ingredients -->
                    <div class="preview-box">
                      <div
                        class="preview-trigger row items-center justify-between cursor-pointer"
                        @click="toggleIngredientList(recipe)"
                      >
                        <div class="row items-center">
                          <q-icon
                            name="restaurant"
                            size="18px"
                            color="purple"
                            class="q-mr-xs"
                          />
                          <span class="text-caption text-weight-bold"
                            >Ingredients ({{
                              recipe.ingredient_groups?.length || 0
                            }})</span
                          >
                        </div>
                        <q-icon
                          :name="
                            expandedIngredients[recipe.id || recipe.name]
                              ? 'expand_less'
                              : 'expand_more'
                          "
                        />
                      </div>
                      <q-slide-transition>
                        <div
                          v-if="expandedIngredients[recipe.id || recipe.name]"
                          class="preview-list"
                        >
                          <div
                            v-for="(ing, i) in recipe.ingredient_groups"
                            :key="i"
                            class="list-item row justify-between"
                          >
                            <span class="ellipsis col-7">{{ ing.name }}</span>
                            <span class="text-weight-bold col-5 text-right"
                              >{{ ing.quantity }}{{ ing.unit }}</span
                            >
                          </div>
                        </div>
                      </q-slide-transition>
                    </div>
                  </div>
                </q-card-section>

                <q-separator />

                <!-- Actions -->
                <q-card-actions align="between" class="q-px-md">
                  <q-btn
                    flat
                    no-caps
                    color="primary"
                    label="Adjust Stock"
                    icon="inventory"
                    dense
                    @click="emit('adjust-stock', recipe)"
                  />
                  <q-btn flat round dense icon="more_vert" color="grey-7">
                    <q-menu auto-close>
                      <q-list style="min-width: 150px">
                        <q-item clickable @click="openTargetEdit(recipe)">
                          <q-item-section avatar
                            ><q-icon name="edit" size="xs"
                          /></q-item-section>
                          <q-item-section>Edit Target</q-item-section>
                        </q-item>
                        <q-item clickable @click="emit('view-details', recipe)">
                          <q-item-section avatar
                            ><q-icon name="visibility" size="xs"
                          /></q-item-section>
                          <q-item-section>View Details</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </q-card-actions>
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
import { useBranchRecipeStore } from "src/stores/branch-recipe";
import { useSupervisorStore } from "src/stores/supervisor";
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// Store and route initialization
const route = useRoute();
const branchRecipeStore = useBranchRecipeStore();
const superVisorStore = useSupervisorStore();
const $q = useQuasar();

// Branch ID from route
const branchId = route.params.branch_id;

// User ID from supervisor store
const userId = computed(
  () =>
    superVisorStore.user?.data?.employee?.id ||
    superVisorStore.user?.data?.employee_id ||
    ""
);

// Props
const props = defineProps({
  filter: String,
});

// Emits
const emit = defineEmits(["add-recipe", "view-details", "adjust-stock"]);

// Local state
const loading = ref(true);
const showTargetDialog = ref(false);
const editingTarget = ref(null);
const currentRecipe = ref(null);
const expandedBreads = ref({});
const expandedIngredients = ref({});
const categoryFilter = ref("all");
const localFilter = ref(props.filter || "");

// Computed properties
const branchRecipe = computed(() => branchRecipeStore.branchRecipes || []);

const filteredRecipes = computed(() => {
  let recipes = branchRecipe.value || [];

  if (localFilter.value) {
    recipes = recipes.filter((item) =>
      item.name?.toLowerCase().includes(localFilter.value.toLowerCase())
    );
  }

  return recipes;
});

const filteredRecipesByCategory = computed(() => {
  let recipes = filteredRecipes.value;

  if (categoryFilter.value !== "all") {
    recipes = recipes.filter(
      (r) => r.category?.toLowerCase() === categoryFilter.value
    );
  }

  return recipes;
});

const activeRecipesCount = computed(() => {
  return filteredRecipesByCategory.value.filter((r) => r.status === "active")
    .length;
});

const totalBreadsCount = computed(() => {
  return filteredRecipesByCategory.value.reduce((total, recipe) => {
    return total + (recipe.bread_groups?.length || 0);
  }, 0);
});

// Helper functions
const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const formatNumber = (value) => {
  if (value === null || value === undefined) return "0";
  return value.toLocaleString();
};

const getDefaultName = (type, index) => {
  const names = {
    bread: ["Classic White", "Whole Wheat", "Sourdough", "Rye", "Multigrain"],
    ingredient: ["Flour", "Sugar", "Yeast", "Salt", "Butter", "Eggs", "Milk"],
  };
  return names[type]?.[index % names[type].length] || `${type} ${index + 1}`;
};

const getDisplayItems = (items) => {
  if (!items || items.length === 0) return [];
  return items.slice(0, 3); // Show only first 3 items
};

const getTargetProgress = (recipe) => {
  const target = recipe.target || 0;
  const production = recipe.today_production || 0;
  if (target === 0) return 0;
  return Math.min(production / target, 1);
};

const getHeaderGradient = (recipe) => {
  const gradients = {
    dough: "linear-gradient(135deg, #8B4513 0%, #A0522D 100%)",
    filling: "linear-gradient(135deg, #FF8C00 0%, #FFA500 100%)",
    default: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  };
  return {
    background: gradients[recipe.category?.toLowerCase()] || gradients.default,
  };
};

const getStatusClass = (recipe) => {
  return recipe.status?.toLowerCase() === "active"
    ? "status-active"
    : "status-inactive";
};

const getStatusIcon = (recipe) => {
  return recipe.status?.toLowerCase() === "active"
    ? "check_circle"
    : "pause_circle";
};

const getCategoryStyle = (category) => {
  const colors = {
    dough: { bg: "rgba(139, 69, 19, 0.15)", color: "#8B4513" },
    filling: { bg: "rgba(255, 140, 0, 0.15)", color: "#FF8C00" },
    default: { bg: "rgba(102, 126, 234, 0.15)", color: "#667eea" },
  };
  const style = colors[category?.toLowerCase()] || colors.default;
  return {
    backgroundColor: style.bg,
    color: style.color,
  };
};

// Event handlers
const openTargetEdit = (recipe) => {
  currentRecipe.value = recipe;
  editingTarget.value = recipe.target;
  showTargetDialog.value = true;
};

const saveTarget = async () => {
  if (currentRecipe.value) {
    try {
      // Update logic here
      $q.notify({
        type: "positive",
        message: "Target updated successfully",
        position: "top",
        timeout: 1500,
        icon: "check_circle",
      });
      await reloadData();
    } catch (error) {
      $q.notify({
        type: "negative",
        message: "Failed to update target",
        position: "top",
        timeout: 2000,
      });
    }
  }
};

const toggleBreadList = (recipe) => {
  const key = recipe.id || recipe.name;
  expandedBreads.value[key] = !expandedBreads.value[key];
};

const toggleIngredientList = (recipe) => {
  const key = recipe.id || recipe.name;
  expandedIngredients.value[key] = !expandedIngredients.value[key];
};

const duplicateRecipe = (recipe) => {
  $q.notify({
    type: "info",
    message: "Recipe duplication coming soon",
    position: "top",
  });
};

const toggleRecipeStatus = (recipe) => {
  $q.notify({
    type: "info",
    message: `Recipe ${
      recipe.status === "active" ? "deactivated" : "activated"
    }`,
    position: "top",
  });
};

// Data loading
const reloadData = async () => {
  try {
    loading.value = true;
    await branchRecipeStore.fetchBranchRecipes(branchId);
  } catch (error) {
    console.error("Error loading recipes:", error);
    $q.notify({
      type: "negative",
      message: "Failed to load recipes",
      position: "top",
      timeout: 2000,
    });
  } finally {
    loading.value = false;
  }
};

const handleRefresh = async (done) => {
  await reloadData();
  done();
};

// Lifecycle
onMounted(() => {
  reloadData();
});
</script>

<style scoped lang="scss">
.recipe-page-wrapper {
  background: #f8fafc;
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
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
</style>
