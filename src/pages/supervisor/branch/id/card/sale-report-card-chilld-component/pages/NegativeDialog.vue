<template>
  <q-dialog
    ref="dialogRef"
    v-model="dialog"
    @hide="onDialogHide"
    @cancel="onDialogCancel"
    :maximized="maximizedToggle"
    transition-show="slide-left"
    transition-hide="slide-right"
    class="mobile-negative-dialog"
  >
    <q-card class="negative-products-dialog bg-grey-1 mobile-card">
      <!-- Fixed Header Section (does NOT scroll) -->
      <div class="fixed-section">
        <q-card-section class="dialog-header bg-gradient-red q-py-sm">
          <div class="row items-center justify-between">
            <div class="row items-center">
              <div class="header-icon-wrapper bg-white-20">
                <q-icon name="warning_amber" size="20px" color="white" />
              </div>

              <div class="q-ml-sm">
                <div class="text-subtitle1 text-white text-weight-bold">
                  Negative Inventory
                </div>
                <div class="text-caption text-white opacity-80">
                  Products with critical levels
                </div>
              </div>
            </div>
            <q-btn
              icon="close"
              flat
              dense
              round
              v-close-popup
              class="close-btn text-white"
              size="sm"
            />
          </div>

          <div class="row q-mt-md q-gutter-xs">
            <q-chip
              v-for="(total, type) in nonZeroTotals"
              :key="type"
              size="sm"
              :style="getBadgeStyle(type)"
              class="summary-chip"
            >
              <q-avatar :color="getBadgeColor(type)" size="18px">
                <q-icon :name="getTypeIcon(type)" size="12px" color="white" />
              </q-avatar>
              <span class="text-dark">
                {{ formatPrice(total) }}
              </span>
            </q-chip>
          </div>
        </q-card-section>

        <q-card-section class="search-section bg-white q-py-sm">
          <q-input
            v-model="filter"
            outlined
            placeholder="Search products..."
            dense
            rounded
            class="search-input"
            bg-color="white"
          >
            <template v-slot:prepend>
              <q-icon name="search" color="grey-6" size="16px" />
            </template>

            <template v-slot:append v-if="filter">
              <q-icon
                name="close"
                size="16px"
                class="cursor-pointer"
                @click="filter = ''"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-section
          v-if="filter || filteredProducts.length"
          class="q-py-xs q-px-md"
        >
          <div class="row items-center justify-between">
            <div class="text-caption text-grey-7">
              {{ filteredProducts.length }} product{{
                filteredProducts.length !== 1 ? "s" : ""
              }}
            </div>

            <q-badge
              v-if="filter"
              color="primary"
              text-color="white"
              class="q-px-sm q-py-xs"
            >
              Filtered
            </q-badge>
          </div>
        </q-card-section>
      </div>

      <div class="scrollable-area">
        <q-card-section class="q-pa-md">
          <div v-if="!hasProducts" class="empty-state text-center q-py-xl">
            <q-icon name="inventory_2" size="56px" color="grey-4" />
            <div class="text-subtitle1 text-weight-medium text-grey-6 q-mt-md">
              No Negative Products
            </div>
            <div class="text-caption text-grey-5 q-mt-xs">
              All inventory levels are normal
            </div>
          </div>

          <!-- No results -->
          <div
            v-else-if="filter && filteredProducts === 0"
            class="no-results text-center q-py-xl"
          >
            <q-icon name="search_off" size="48px" color="grey-4" />
            <div class="text-subtitle2 text-grey-7 q-mt-sm">
              No products found for "{{ filter }}"
            </div>

            <q-btn
              flat
              label="Clear Search"
              color="primary"
              size="sm"
              class="q-mt-md"
              @click="filter = ''"
            />
          </div>

          <div v-else class="product-cards">
            <div
              v-for="(product, index) in filteredProducts"
              :key="index"
              class="product-card"
              :class="getCardClass(product)"
            >
              <div class="card-header" :class="getCardHeaderClass(product)">
                <div class="row items-center justify-between">
                  <div class="row items-center">
                    <q-avatar
                      size="32px"
                      :color="getTypeColor(product.type)"
                      text-color="white"
                      class="q-mr-sm"
                    >
                      <q-icon :name="getTypeIcon(product.type)" size="16px" />
                    </q-avatar>

                    <div>
                      <div class="product-type text-caption opacity-80">
                        {{ product.type?.toUpperCase() || "PRODUCT" }}
                      </div>
                      <div class="product-name text-weight-bold">
                        {{ capitalizeFirstLetter(product.name || "N/A") }}
                      </div>
                    </div>
                  </div>

                  <q-badge
                    :color="getBadgeColor(product.type)"
                    text-color="white"
                    class="q-px-sm q-py-xs"
                  >
                    {{ formatPrice(product.price || 0) }}
                  </q-badge>
                </div>
              </div>

              <!-- Card Content - Stats Grid -->
              <div class="card-content q-pa-sm">
                <div class="row q-col-gutter-xs">
                  <div class="col-4">
                    <div class="stat-box">
                      <div class="stat-label">Beginning</div>
                      <div
                        class="stat-value"
                        :class="getStatClass('beginnings', product.beginnings)"
                      >
                        {{ product.beginnings || 0 }}
                      </div>
                    </div>
                  </div>

                  <div class="col-4">
                    <div class="stat-box">
                      <div class="stat-label">Added</div>
                      <div
                        class="stat-value"
                        :class="getStatClass('added', product.added)"
                      >
                        {{ product.added || product.new_production || 0 }}
                      </div>
                    </div>
                  </div>

                  <!-- Remaining -->
                  <div class="col-4">
                    <div class="stat-box">
                      <div class="stat-label">Remaining</div>
                      <div
                        class="stat-value"
                        :class="getStatClass('remianing', product.remaining)"
                      >
                        {{ product.remaining || 0 }}
                      </div>
                    </div>
                  </div>

                  <!-- Out -->
                  <div class="col-4">
                    <div class="stat-box">
                      <div
                        class="stat-label"
                        :class="getStatClass('out', product.out)"
                      >
                        Out
                      </div>
                      <div>{{ product.out || 0 }}</div>
                    </div>
                  </div>

                  <!-- Sold -->
                  <div class="col-4">
                    <div class="stat-box">
                      <div class="stat-label">Sold</div>
                      <div
                        class="stat-value"
                        :class="getSoldClass(calculateSold(product))"
                      >
                        {{ calculateSold(product || 0) }}
                      </div>
                    </div>
                  </div>

                  <!-- Deficit -->
                  <div class="col-4">
                    <div class="stat-box">
                      <div class="stat-label">Deficit</div>
                      <div class="stat-value text-negative text-weight-bold">
                        {{
                          formatPrice(Math.abs(calculateSales(product) || 0))
                        }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Progress Bar (Show how critical) -->
                <div class="q-mt-sm">
                  <div class="row items-center justify-between q-mb-xs">
                    <span class="text-caption text-grey-7"
                      >Inventory Level</span
                    >
                    <span
                      class="text-caption text-weight-bold"
                      :class="getSeverityClass(product)"
                    >
                      {{ getSeverityText(product) }}
                    </span>
                  </div>

                  <q-linear-progress
                    :value="calculateProgress(product)"
                    :color="getProgressColor(product)"
                    size="6px"
                    rounded
                  />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </div>

      <!-- Fixed Footer (does NOT scroll) -->
      <div class="fixed-footer">
        <q-card-section class="footer-summary bg-white q-pa-md">
          <div class="row items-center justify-between">
            <div>
              <div class="text-captio text-grey-6">TOTAL DEFICIT</div>
              <div class="text-h5 text-weight-bolder text-negativev">
                {{ formatPrice(totalDeficit) }}
              </div>
            </div>
            <div class="text-right">
              <div class="text-caption text-grey-6">Products</div>
              <div class="text-h6 text-weight-bold">
                {{ filteredProducts.length }}
              </div>
            </div>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { computed, ref } from "vue";
import { typographyFormat } from "src/composables/typography/typography-format";

const { formatPrice, capitalizeFirstLetter, onDialogCancel } =
  typographyFormat();
const { dialogRef, onDialogHide } = useDialogPluginComponent();
const dialog = ref(true);
const props = defineProps(["negativeProducts"]);

const filter = ref("");
const maximizedToggle = ref(true);

// Computed properties
const filteredProducts = computed(() => {
  if (!props.negativeProducts || props.negativeProducts === "No report") {
    return [];
  }

  const products = props.negativeProducts;

  if (!filter.value || !filter.value.trim()) {
    return products;
  }

  const search = filter.value.trim().toLowerCase();

  return products.filter((product) => {
    return (
      (product.name && product.name.toLowerCase().includes(search)) ||
      (product.type && product.type.toLowerCase().includes(search)) ||
      (product.price && String(product.price).includes(search))
    );
  });
});

const hasProducts = computed(() => {
  return filteredProducts.value.length > 0;
});

const totalDeficit = computed(() => {
  return filteredProducts.value.reduce((sum, product) => {
    return sum + Math.abs(calculateSales(product));
  }, 0);
});

const nonZeroTotals = computed(() => {
  const totals = filteredTotals.value;
  return Object.fromEntries(
    Object.entries(totals).filter(([_, value]) => Math.abs(value) > 0)
  );
});

// Helper functions
const calculateSold = (product) => {
  const beginnings = Number(product.beginnings) || 0;
  const added = Number(product.added || product.new_production) || 0;
  const remaining = Number(product.remaining) || 0;
  const out = Number(product.out) || 0;

  return beginnings + added - (remaining + out);
};

const calculateSales = (product) => {
  const sold = calculateSold(product);
  const price = Number(product.price) || 0;
  return sold * price;
};

const calculateProgress = (product) => {
  const sold = Math.abs(calculateSold(product));
  const total = Number(product.beginnings) + Number(product.added) || 1;
  return Math.min(sold / total, 1);
};

const getSeverityText = (product) => {
  const sold = calculateSold(product);
  if (sold < 0) return "CRITICAL";
  return "LOW STOCK";
};

const getSeverityClass = (product) => {
  const sold = calculateSold(product);
  if (sold < 0) return "text-negative";
  return "text-warning";
};

const getProgressColor = (product) => {
  const sold = calculateSold(product);
  if (sold < 0) return "negative";
  return "warning";
};

const filteredTotals = computed(() => {
  const totals = {
    Bread: 0,
    Selecta: 0,
    Nestle: 0,
    "Soft Drinks": 0,
    "Other Products": 0,
  };

  filteredProducts.value.forEach((product) => {
    const type = product.type;
    if (!totals.hasOwnProperty(type)) return;
    totals[type] += Math.abs(calculateSales(product));
  });

  return totals;
});

// Styling functions
const getBadgeColor = (type) => {
  switch (type?.toLowerCase()) {
    case "bread":
      return "brown-7";
    case "selecta":
      return "red-7";
    case "nestle":
      return "blue-7";
    case "soft drinks":
      return "purple-7";
    case "other products":
      return "blue-grey-7";
    default:
      return "grey-7";
  }
};

const getBadgeStyle = (type) => {
  const colors = {
    Bread: { background: "#8B6B4D", color: "white" },
    Selecta: { background: "#EF5350", color: "white" },
    Nestle: { background: "#42A5F5", color: "white" },
    "Soft Drinks": { background: "#AB47BC", color: "white" },
    "Other Products": { background: "#78909C", color: "white" },
  };
  return colors[type] || { background: "#9E9E9E", color: "white" };
};

const getTypeColor = (type) => {
  switch (type?.toLowerCase()) {
    case "bread":
      return "brown-7";
    case "selecta":
      return "red-7";
    case "nestle":
      return "blue-7";
    case "soft drinks":
      return "purple-7";
    case "other products":
      return "blue-grey-7";
    default:
      return "grey-7";
  }
};

const getTypeIcon = (type) => {
  switch (type?.toLowerCase()) {
    case "bread":
      return "bakery_dining";
    case "selecta":
      return "icecream";
    case "nestle":
      return "ac_unit";
    case "soft drinks":
      return "local_drink";
    case "other products":
      return "category";
    default:
      return "inventory";
  }
};

const getCardClass = (product) => {
  const sold = calculateSold(product);
  if (sold < 0) return "critical-card";
  return "warning-card";
};

const getCardHeaderClass = (product) => {
  const sold = calculateSold(product);
  if (sold < 0) return "bg-red-1";
  return "bg-orange-1";
};

const getStatClass = (field, value) => {
  const numValue = Number(value) || 0;
  if (field === "remaining" && numValue <= 0)
    return "text-negative text-weight-bold";
  if (field === "out" && numValue > 0) return "text-warning";
  return "";
};

const getSoldClass = (sold) => {
  if (sold < 0) return "text-negative text-weight-bold";
  if (sold > 0) return "text-positive";
  return "text-grey";
};
</script>

<style lang="scss" scoped>
.mobile-negative-dialog {
  :deep(.q-dialog__inner) {
    padding: 0;
  }
}

.mobile-card {
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-radius: 0;
  overflow: hidden; /* Prevents double scrollbars */
}

.fixed-section {
  flex-shrink: 0; /* Prevents this section from shrinking */
  background: white;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.scrollable-area {
  flex: 1 1 auto; /* Takes remaining space */
  overflow-y: auto; /* ENABLES SCROLLING */
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  background: #f5f5f5;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background: #ef5350;
    border-radius: 4px;
  }
}

.fixed-footer {
  flex-shrink: 0; /* Prevents footer from shrinking */
  z-index: 10;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.bg-gradient-red {
  background: linear-gradient(135deg, #ef5350 0%, #c62828 100%);
}

.bg-white-20 {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
}

.header-icon-wrapper {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-input {
  :deep(.q-field__control) {
    border-radius: 30px;
    height: 40px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  }
}

.summary-chip {
  background: white !important;
  font-weight: 500;
  padding: 4px 10px;

  :deep(.q-avatar) {
    font-size: 12px;
  }
}

.product-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.2s;

  &:active {
    transform: scale(0.98);
  }

  &.critical-card {
    border-left: 4px solid #ef5350;
  }

  &.warning-card {
    border-left: 4px solid #ffa726;
  }
}

.card-header {
  padding: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  .product-type {
    font-size: 10px;
    opacity: 0.7;
    letter-spacing: 0.5px;
  }

  .product-name {
    font-size: 14px;
    line-height: 1.2;
    max-width: 180px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.card-content {
  padding: 12px;
}

.stat-box {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 8px 4px;
  text-align: center;

  .stat-label {
    font-size: 9px;
    color: #9e9e9e;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }

  .stat-value {
    font-size: 14px;
    font-weight: 600;
    color: #424242;
  }
}

.empty-state,
.no-results {
  padding: 40px 20px;
  color: #bdbdbd;
}

.footer-summary {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

/* Bottom sheet positioning */
:deep(.q-dialog__inner--bottom) {
  align-items: flex-end;
}
</style>
