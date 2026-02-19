<template>
  <div class="product-table-container">
    <!-- Header Section -->
    <div class="header-section">
      <div class="row items-center justify-between q-px-md q-py-sm">
        <div class="search-wrapper col-12 col-md-6">
          <q-input
            v-model="filter"
            outlined
            placeholder="Search products..."
            debounce="500"
            dense
            class="search-input"
            bg-color="white"
          >
            <template v-slot:prepend>
              <q-icon name="search" size="16px" class="text-grey-5" />
            </template>
            <template v-slot:append>
              <q-icon
                v-if="filter"
                name="close"
                @click="filter = ''"
                class="cursor-pointer text-grey-5"
                size="16px"
              />
            </template>
          </q-input>
        </div>
        <div class="col-auto">
          <ProductCreate />
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <q-spinner :thickness="3" size="40px" color="primary" />
      <span class="text-grey-7 q-mt-sm">Loading products...</span>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredRows.length === 0" class="empty-state">
      <div class="empty-illustration">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="60" cy="60" r="60" fill="#F5F5F5" />
          <path
            d="M38 45L60 30L82 45V75L60 90L38 75V45Z"
            stroke="#CCCCCC"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M60 45V60"
            stroke="#CCCCCC"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M48 52L60 60"
            stroke="#CCCCCC"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M72 52L60 60"
            stroke="#CCCCCC"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <h4 class="text-h6 text-weight-regular text-grey-8 q-mt-md">
        No products found
      </h4>
      <p class="text-grey-6 q-mb-md">
        Try adjusting your search or add a new product
      </p>
      <q-btn
        v-if="filter"
        flat
        color="primary"
        label="Clear search"
        @click="filter = ''"
        size="sm"
        no-caps
      />
    </div>

    <!-- Product Grid -->
    <div v-else class="product-grid">
      <q-pull-to-refresh @refresh="handleRefresh">
        <div class="row q-col-gutter-sm q-col-gutter-md-md">
          <div
            v-for="product in filteredRows"
            :key="product.id"
            class="col-12 col-sm-6 col-lg-4"
          >
            <q-intersection once transition="fade" class="product-intersection">
              <q-card class="product-card" flat bordered>
                <!-- Card Header with Category Badge -->
                <q-card-section class="q-pb-none">
                  <div class="row items-start justify-between no-wrap">
                    <div class="col">
                      <div class="text-overline text-grey-6">
                        {{ product.category || "Uncategorized" }}
                      </div>
                      <h3
                        class="text-h6 text-weight-medium q-mt-xs q-mb-none text-dark ellipsis-2"
                      >
                        {{
                          product.product?.name
                            ? capitalizeFirstLetter(product.product.name)
                            : "Untitled Product"
                        }}
                      </h3>
                    </div>
                    <div class="col-auto">
                      <q-btn
                        flat
                        round
                        dense
                        icon="more_vert"
                        size="sm"
                        class="text-grey-6"
                      >
                        <q-menu anchor="bottom end" self="top end" auto-close>
                          <q-list dense style="min-width: 160px">
                            <q-item clickable v-close-popup>
                              <q-item-section avatar>
                                <q-icon name="history" size="18px" />
                              </q-item-section>
                              <q-item-section>View History</q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup>
                              <q-item-section avatar>
                                <q-icon name="content_copy" size="18px" />
                              </q-item-section>
                              <q-item-section>Duplicate</q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item
                              clickable
                              v-close-popup
                              class="text-negative"
                            >
                              <q-item-section avatar>
                                <q-icon name="delete" size="18px" />
                              </q-item-section>
                              <q-item-section>
                                <ProductDelete :delete="{ row: product }" />
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>
                      </q-btn>
                    </div>
                  </div>
                </q-card-section>

                <!-- Metrics Grid -->
                <q-card-section class="q-pt-md">
                  <div class="metrics-grid">
                    <!-- Price Metric -->
                    <div class="metric-item" @click="openPriceEdit(product)">
                      <span class="metric-label">Price</span>
                      <div class="metric-value-group">
                        <span class="metric-value">{{
                          formatPrice(product.price)
                        }}</span>
                        <q-icon
                          name="edit"
                          size="14px"
                          class="metric-edit-icon"
                        />
                      </div>
                      <q-popup-edit
                        v-model="product.price"
                        @update:model-value="
                          (val) => updatedPrice(product, val)
                        "
                        auto-save
                        buttons
                        label-set="Save"
                        label-cancel="Cancel"
                        v-slot="scope"
                      >
                        <q-input
                          v-model="scope.value"
                          type="number"
                          dense
                          autofocus
                          prefix="₱"
                          @keyup.enter="scope.set"
                        />
                      </q-popup-edit>
                    </div>

                    <!-- Beginnings Metric -->
                    <div
                      class="metric-item"
                      @click="openBeginningsEdit(product)"
                    >
                      <span class="metric-label">Beginnings</span>
                      <div class="metric-value-group">
                        <span class="metric-value">{{
                          product.beginnings || 0
                        }}</span>
                        <span class="metric-unit">pcs</span>
                        <q-icon
                          name="edit"
                          size="14px"
                          class="metric-edit-icon"
                        />
                      </div>
                      <q-popup-edit
                        v-model="product.beginnings"
                        @update:model-value="
                          (val) => updatedBeginnings(product, val)
                        "
                        auto-save
                        buttons
                        label-set="Save"
                        label-cancel="Cancel"
                        v-slot="scope"
                      >
                        <q-input
                          v-model="scope.value"
                          type="number"
                          dense
                          autofocus
                          suffix="pcs"
                          @keyup.enter="scope.set"
                        />
                      </q-popup-edit>
                    </div>

                    <!-- New Production Metric -->
                    <div
                      class="metric-item"
                      @click="openProductionEdit(product)"
                    >
                      <span class="metric-label">New Production</span>
                      <div class="metric-value-group">
                        <span class="metric-value">{{
                          product.new_production || 0
                        }}</span>
                        <span class="metric-unit">pcs</span>
                        <q-icon
                          name="edit"
                          size="14px"
                          class="metric-edit-icon"
                        />
                      </div>
                      <q-popup-edit
                        v-model="product.new_production"
                        @update:model-value="
                          (val) => updateNewProduction(product, val)
                        "
                        auto-save
                        buttons
                        label-set="Save"
                        label-cancel="Cancel"
                        v-slot="scope"
                      >
                        <q-input
                          v-model="scope.value"
                          type="number"
                          dense
                          autofocus
                          suffix="pcs"
                          @keyup.enter="scope.set"
                        />
                      </q-popup-edit>
                    </div>

                    <!-- Total Quantity Metric -->
                    <div class="metric-item" @click="openQuantityEdit(product)">
                      <span class="metric-label">Total</span>
                      <div class="metric-value-group">
                        <span class="metric-value">{{
                          product.total_quantity || 0
                        }}</span>
                        <span class="metric-unit">pcs</span>
                        <q-icon
                          name="edit"
                          size="14px"
                          class="metric-edit-icon"
                        />
                      </div>
                      <q-popup-edit
                        v-model="product.total_quantity"
                        @update:model-value="
                          (val) => updatedTotalQuantity(product, val)
                        "
                        auto-save
                        buttons
                        label-set="Save"
                        label-cancel="Cancel"
                        v-slot="scope"
                      >
                        <q-input
                          v-model="scope.value"
                          type="number"
                          dense
                          autofocus
                          suffix="pcs"
                          @keyup.enter="scope.set"
                        />
                      </q-popup-edit>
                    </div>
                  </div>
                </q-card-section>

                <!-- Stock Status Indicator -->
                <q-card-section class="q-pt-none">
                  <div class="stock-indicator">
                    <div
                      class="stock-bar"
                      :style="{ width: getStockPercentage(product) + '%' }"
                      :class="getStockStatusClass(product)"
                    ></div>
                  </div>
                  <div class="row items-center justify-between q-mt-xs">
                    <span class="text-caption text-grey-6">Stock level</span>
                    <span
                      class="text-caption text-weight-medium"
                      :class="getStockStatusClass(product)"
                    >
                      {{ getStockStatus(product) }}
                    </span>
                  </div>
                </q-card-section>

                <!-- Quick Actions -->
                <q-separator />
                <q-card-actions class="q-pa-sm">
                  <q-btn
                    flat
                    dense
                    no-caps
                    color="primary"
                    label="Adjust Stock"
                    size="sm"
                    class="full-width"
                  />
                </q-card-actions>
              </q-card>
            </q-intersection>
          </div>
        </div>
      </q-pull-to-refresh>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
// import ProductCreate from "./ProductCreate.vue";
// import ProductDelete from "./ProductDelete.vue";
import { api } from "src/boot/axios";
import { useBranchProductsStore } from "src/stores/branch-product";
import { useUsersStore } from "src/stores/user";
import { Notify } from "quasar";
import { useRoute } from "vue-router";
import { typographyFormat } from "src/composables/typography/typography-format";
import { badgeColor } from "src/composables/badge-color/badge-color";

const { capitalizeFirstLetter, formatPrice } = typographyFormat();
const { getProductBadgeCategoryColor } = badgeColor();

const route = useRoute();
const userStore = useUsersStore();
const userData = computed(() => userStore.userData);
const userId = userData.value?.data?.id || "0";
const branchId = route.params.branch_id;
const branchProductStore = useBranchProductsStore();

const filter = ref("");
const loading = ref(true);
const branchProducts = ref([]);

// Edit state management
const openPriceEdit = (product) => {
  // Trigger popup edit programmatically if needed
};

const openBeginningsEdit = (product) => {
  // Trigger popup edit programmatically if needed
};

const openProductionEdit = (product) => {
  // Trigger popup edit programmatically if needed
};

const openQuantityEdit = (product) => {
  // Trigger popup edit programmatically if needed
};

// Add computed stock status functions
const getStockPercentage = (product) => {
  const total = product.total_quantity || 0;
  const max = 100; // You can adjust this based on your business logic
  return Math.min((total / max) * 100, 100);
};

const getStockStatus = (product) => {
  const total = product.total_quantity || 0;
  if (total === 0) return "Out of Stock";
  if (total < 20) return "Low Stock";
  if (total < 50) return "Moderate";
  return "In Stock";
};

const getStockStatusClass = (product) => {
  const total = product.total_quantity || 0;
  if (total === 0) return "text-negative";
  if (total < 20) return "text-warning";
  if (total < 50) return "text-info";
  return "text-positive";
};

const branchProductRows = computed(() => branchProductStore.branchProducts);

const filteredRows = computed(() => {
  if (!filter.value) {
    return branchProductRows.value;
  }
  return branchProductRows.value.filter((row) => {
    const productName = row.product?.name?.toLowerCase() || "";
    const category = row.category?.toLowerCase() || "";
    const searchTerm = filter.value.toLowerCase();
    return productName.includes(searchTerm) || category.includes(searchTerm);
  });
});

onMounted(async () => {
  if (branchId) {
    await reloadTableData(branchId);
  }
});

const reloadTableData = async (branchId) => {
  try {
    loading.value = true;
    await branchProductStore.fetchBranchProducts(branchId);
  } catch (error) {
    console.log("Error fetching branch product:", error);
    Notify.create({
      type: "negative",
      message: "Failed to load products",
      position: "top",
    });
  } finally {
    loading.value = false;
  }
};

const handleRefresh = async (done) => {
  await reloadTableData(branchId);
  done();
};
</script>

<style scoped>
.product-table-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  background: #f8fafc;
  min-height: 100vh;
}

/* Header Styles */
.header-section {
  background: white;
  border-radius: 16px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.search-wrapper {
  max-width: 400px;
}

.search-input :deep(.q-field__control) {
  border-radius: 30px;
  height: 44px;
}

.search-input :deep(.q-field__native) {
  font-size: 14px;
}

/* Loading State */
.loading-state {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 24px;
  padding: 48px;
}

/* Empty State */
.empty-state {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 24px;
  padding: 48px;
  text-align: center;
}

.empty-illustration svg {
  opacity: 0.8;
}

/* Product Grid */
.product-grid {
  background: transparent;
}

.product-intersection {
  height: 100%;
}

/* Product Card */
.product-card {
  border-radius: 20px;
  background: white;
  transition: all 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-color: rgba(0, 0, 0, 0.05) !important;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.1) !important;
}

.ellipsis-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  min-height: 2.8em;
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  background: #f8fafc;
  border-radius: 16px;
  padding: 16px;
}

.metric-item {
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.metric-item:hover .metric-edit-icon {
  opacity: 1;
}

.metric-label {
  display: block;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: #94a3b8;
  margin-bottom: 4px;
}

.metric-value-group {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.metric-value {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
}

.metric-unit {
  font-size: 11px;
  color: #94a3b8;
  font-weight: 500;
}

.metric-edit-icon {
  opacity: 0;
  transition: opacity 0.2s ease;
  color: #94a3b8;
  margin-left: 4px;
}

/* Stock Indicator */
.stock-indicator {
  height: 4px;
  background: #e9eef2;
  border-radius: 100px;
  overflow: hidden;
}

.stock-bar {
  height: 100%;
  border-radius: 100px;
  transition: width 0.3s ease;
}

.stock-bar.text-positive {
  background: #10b981;
}

.stock-bar.text-warning {
  background: #f59e0b;
}

.stock-bar.text-info {
  background: #3b82f6;
}

.stock-bar.text-negative {
  background: #ef4444;
}

/* Responsive Adjustments */
@media (max-width: 599px) {
  .product-table-container {
    padding: 12px;
  }

  .header-section {
    border-radius: 12px;
  }

  .search-wrapper {
    max-width: 100%;
  }

  .metrics-grid {
    gap: 12px;
    padding: 12px;
  }

  .product-card {
    border-radius: 16px;
  }
}

@media (min-width: 600px) and (max-width: 1023px) {
  .metrics-grid {
    gap: 16px;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .product-table-container {
    background: #0f172a;
  }

  .header-section,
  .loading-state,
  .empty-state,
  .product-card {
    background: #1e293b;
    border-color: #334155 !important;
  }

  .metrics-grid {
    background: #0f172a;
  }

  .metric-value {
    color: #f1f5f9;
  }

  .metric-label,
  .metric-unit,
  .metric-edit-icon {
    color: #94a3b8;
  }

  .stock-indicator {
    background: #334155;
  }

  .search-input :deep(.q-field__control) {
    background: #1e293b;
    color: #f1f5f9;
  }

  .text-dark {
    color: #f1f5f9 !important;
  }
}

/* Pull to refresh styling */
:deep(.q-pull-to-refresh__message) {
  background: transparent;
  margin-bottom: 8px;
}
</style>
