<template>
  <div class="product-table-container">
    <!-- Header Section - Responsive -->
    <div class="row items-center justify-between q-pa-md header-section">
      <div class="col-12 col-sm-8 col-md-6">
        <q-input
          v-model="filter"
          outlined
          placeholder="Search products..."
          debounce="500"
          dense
          rounded
          class="search-input"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <!-- <div class="col-auto q-mt-sm q-mt-sm-none">
        <ProductCreate />
      </div> -->
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-center loading-wrapper">
      <q-spinner-dots size="50px" color="primary" />
    </div>

    <!-- Empty State -->
    <div
      v-else-if="filteredRows.length === 0"
      class="flex flex-center empty-wrapper"
    >
      <div class="text-center">
        <q-icon name="inbox" color="grey-5" size="4em" />
        <div class="text-grey-7 q-mt-md text-subtitle1">
          No products available
        </div>
        <q-btn
          v-if="filter"
          flat
          color="primary"
          label="Clear search"
          @click="filter = ''"
          class="q-mt-sm"
        />
      </div>
    </div>

    <!-- Mobile/Tablet Card View -->
    <div v-else class="scrollable-content">
      <q-pull-to-refresh @refresh="handleRefresh">
        <q-intersection
          v-for="product in filteredRows"
          :key="product.id"
          once
          transition="scale"
          class="intersection-item"
        >
          <q-card class="product-card q-mb-md">
            <!-- Card Header -->
            <q-card-section class="row items-center justify-between q-pb-none">
              <div>
                <div class="text-h6 text-weight-medium">
                  {{
                    product.product?.name
                      ? capitalizeFirstLetter(product.product.name)
                      : "No data available"
                  }}
                </div>
                <div class="q-mt-xs">
                  <q-badge
                    v-if="product.category"
                    :color="getProductBadgeCategoryColor(product.category)"
                    class="q-px-sm q-py-xs"
                  >
                    {{ product.category }}
                  </q-badge>
                </div>
              </div>
              <ProductDelete :delete="{ row: product }" />
            </q-card-section>

            <!-- Product Details Grid -->
            <q-card-section class="q-pt-md">
              <div class="row gutter-y-md">
                <!-- Price -->
                <div class="col-6 col-sm-3 q-pa-xs">
                  <div class="detail-label text-grey-7">Price</div>
                  <div
                    class="detail-value editable-field"
                    @click="openPriceEdit(product)"
                  >
                    {{ formatPrice(product.price) }}
                    <q-icon name="edit" size="14px" class="edit-icon" />
                    <q-popup-edit
                      v-model="product.price"
                      @update:model-value="(val) => updatedPrice(product, val)"
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
                </div>

                <!-- Beginnings -->
                <div class="col-6 col-sm-3 q-pa-xs">
                  <div class="detail-label text-grey-7">Beginnings</div>
                  <div
                    class="detail-value editable-field"
                    @click="openBeginningsEdit(product)"
                  >
                    {{ product.beginnings || 0 }} pcs
                    <q-icon name="edit" size="14px" class="edit-icon" />
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
                </div>

                <!-- New Production -->
                <div class="col-6 col-sm-3 q-pa-xs">
                  <div class="detail-label text-grey-7">New Production</div>
                  <div
                    class="detail-value editable-field"
                    @click="openProductionEdit(product)"
                  >
                    {{ product.new_production || 0 }} pcs
                    <q-icon name="edit" size="14px" class="edit-icon" />
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
                </div>

                <!-- Total Quantity -->
                <div class="col-6 col-sm-3 q-pa-xs">
                  <div class="detail-label text-grey-7">Total Quantity</div>
                  <div
                    class="detail-value editable-field"
                    @click="openQuantityEdit(product)"
                  >
                    {{ product.total_quantity || 0 }} pcs
                    <q-icon name="edit" size="14px" class="edit-icon" />
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
              </div>
            </q-card-section>

            <!-- Quick Actions -->
            <q-card-actions align="right" class="q-pt-none">
              <q-btn flat round color="primary" icon="more_vert" size="sm">
                <q-menu cover auto-close>
                  <q-list style="min-width: 150px">
                    <q-item clickable v-close-popup>
                      <q-item-section avatar>
                        <q-icon name="content_copy" />
                      </q-item-section>
                      <q-item-section>Duplicate</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section avatar>
                        <q-icon name="history" />
                      </q-item-section>
                      <q-item-section>View History</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-card-actions>
          </q-card>
        </q-intersection>
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

// Update functions remain the same as before
async function updatedPrice(data, val) {
  // ... (keep your existing implementation)
}

async function updateNewProduction(data, val) {
  // ... (keep your existing implementation)
}

async function updatedBeginnings(data, val) {
  // ... (keep your existing implementation)
}

async function updatedTotalQuantity(data, val) {
  // ... (keep your existing implementation)
}
</script>

<style scoped>
.product-table-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 8px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header-section {
  background: white;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(81, 78, 78, 0.02);
}

.search-input {
  width: 100%;
  max-width: 400px;
}

.loading-wrapper,
.empty-wrapper {
  min-height: 50vh;
  background: white;
  border-radius: 12px;
  padding: 32px;
}

.scrollable-content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 4px 0;
  max-height: calc(100vh - 180px);
}

.intersection-item {
  transition: opacity 0.3s ease-in-out;
}

.product-card {
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(67, 63, 63, 0.03);
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background: white;
}

.product-card:active {
  transform: scale(0.99);
  background: #fafafa;
}

.detail-label {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 4px;
}

.detail-value {
  font-size: 0.95rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 8px;
  background: #f5f5f5;
  cursor: pointer;
  transition: all 0.2s ease;
}

.detail-value:hover {
  background: #e0e0e0;
}

.editable-field {
  position: relative;
}

.edit-icon {
  opacity: 0;
  transition: opacity 0.2s ease;
  color: #666;
}

.editable-field:hover .edit-icon {
  opacity: 1;
}

/* Tablet Styles */
@media (min-width: 600px) {
  .product-table-container {
    padding: 16px;
  }

  .product-card {
    border-radius: 20px;
  }

  .detail-value {
    font-size: 1rem;
  }

  .detail-label {
    font-size: 0.8rem;
  }
}

/* Desktop Styles */
@media (min-width: 1024px) {
  .product-table-container {
    padding: 24px;
  }

  .header-section {
    padding: 16px 24px;
  }

  .product-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .product-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .header-section,
  .loading-wrapper,
  .empty-wrapper,
  .product-card {
    background: #1e1e1e;
    border-color: #333;
  }

  .detail-value {
    background: #2d2d2d;
    color: #fff;
  }

  .detail-label {
    color: #aaa !important;
  }

  .product-card:active {
    background: #2a2a2a;
  }
}

/* Pull to refresh indicator */
:deep(.q-pull-to-refresh__message) {
  background: transparent;
  box-shadow: none;
}

/* Smooth scrolling */
.scrollable-content::-webkit-scrollbar {
  width: 6px;
}

.scrollable-content::-webkit-scrollbar-track {
  background: transparent;
}

.scrollable-content::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 20px;
}

.scrollable-content::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}
</style>
