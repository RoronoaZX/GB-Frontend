<!-- <template>
  <q-dialog
    ref="dialogRef"
    v-model="dialog"
    @hide="onDialogHide"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section style="background-color: #c62828">
        <div class="row justify-between text-white">
          <div class="text-h6">Negative Products</div>
          <q-btn icon="close" flat dense round v-close-popup>
            <q-tooltip class="bg-blue-grey-6" :delay="200">Close</q-tooltip>
          </q-btn>
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          class="q-pb-lg q-pl-sm dynamic-width"
          v-model="filter"
          outlined
          placeholder="Search"
          debounce="1000"
          flat
          dense
          rounded
          style="width: 500px"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="row q-gutter-x-lg">
        <div v-if="(overallTotals.Bread || 0) !== 0">
          <q-chip outline square color="brown">
            Bread Sales: {{ formatPrice(overallTotals.Bread || 0) }}
          </q-chip>
        </div>

        <div v-if="(overallTotals.Selecta || 0) !== 0">
          <q-chip outline square color="red-6">
            Selecta Sales: {{ formatPrice(overallTotals.Selecta || 0) }}
          </q-chip>
        </div>

        <div v-if="(overallTotals['Soft Drinks'] || 0) !== 0">
          <q-chip outline square color="accent">
            Soft Drinks Sales:
            {{ formatPrice(overallTotals["Soft Drinks"] || 0) }}
          </q-chip>
        </div>

        <div v-if="(overallTotals['Other Products'] || 0) !== 0">
          <q-chip outline square color="blue-grey">
            Other Products Sales:
            {{ formatPrice(overallTotals["Other Products"] || 0) }}
          </q-chip>
        </div>
      </q-card-section>

      <q-card-section>
        <q-table
          :virtual-scroll-sticky-size-start="48"
          flat
          :columns="negativeProdcutsColumns"
          :rows="filteredRows"
          row-key="name"
          virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
          hide-bottom
          style="height: 470px"
        >
          <template v-slot:body-cell-type="props">
            <q-td :props="props">
              <span
                :style="{
                  color:
                    props.row.type === 'Bread'
                      ? 'brown'
                      : props.row.type === 'Selecta'
                      ? 'red'
                      : props.row.type === 'Soft Drinks'
                      ? 'purple'
                      : props.row.type === 'Other Products'
                      ? 'teal'
                      : 'grey',
                }"
              >
                {{ props.row.type }}
              </span>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template> -->

<template>
  <q-dialog
    ref="dialogRef"
    v-model="dialog"
    @hide="onDialogHide"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="negative-products-dialog">
      <!-- Enhanced Header -->
      <q-card-section class="dialog-header bg-gradient-red">
        <div class="row items-center justify-between">
          <div class="row items-center q-gutter-sm">
            <q-icon name="warning" size="24px" color="white" />
            <div class="text-h6 text-white text-weight-bold">
              Negative Inventory Alert
            </div>
          </div>
          <q-btn
            icon="close"
            flat
            dense
            round
            v-close-popup
            class="close-btn"
            size="12px"
          />
        </div>
        <div class="text-caption text-white q-mt-xs opacity-85">
          Products with negative or critical inventory levels
        </div>
      </q-card-section>

      <!-- Search Section -->
      <q-card-section class="search-section q-pb-sm q-pt-md">
        <q-input
          class="search-input"
          v-model="filter"
          outlined
          placeholder="Search products by name, type, price, or quantity..."
          debounce="300"
          dense
          rounded
          bg-color="white"
        >
          <template v-slot:prepend>
            <q-icon name="search" color="grey-6" size="18px" />
          </template>
          <template v-slot:append>
            <q-icon
              v-if="filter"
              name="clear"
              class="cursor-pointer"
              size="18px"
              @click="filter = ''"
            />
          </template>
        </q-input>
      </q-card-section>

      <!-- Summary Badges -->
      <q-card-section class="summary-section q-px-md q-py-sm">
        <div class="row q-col-gutter-xs">
          <!-- Bread Total -->
          <div v-if="(filteredTotals.Bread || 0) !== 0" class="col-auto">
            <q-badge
              class="summary-badge"
              :color="getBadgeColor('Bread')"
              text-color="white"
            >
              <div class="row items-center no-wrap q-pa-xs">
                <q-icon name="bakery_dining" size="14px" class="q-mr-xs" />
                <div>
                  <div class="text-caption text-weight-bold">BREAD</div>
                  <div class="text-subtitle2 text-weight-bold">
                    {{ formatPrice(filteredTotals.Bread || 0) }}
                  </div>
                </div>
              </div>
            </q-badge>
          </div>

          <!-- Selecta Total -->
          <div v-if="(filteredTotals.Selecta || 0) !== 0" class="col-auto">
            <q-badge
              class="summary-badge"
              :color="getBadgeColor('Selecta')"
              text-color="white"
            >
              <div class="row items-center no-wrap q-pa-xs">
                <q-icon name="icecream" size="14px" class="q-mr-xs" />
                <div>
                  <div class="text-caption text-weight-bold">SELECTA</div>
                  <div class="text-subtitle2 text-weight-bold">
                    {{ formatPrice(filteredTotals.Selecta || 0) }}
                  </div>
                </div>
              </div>
            </q-badge>
          </div>

          <!-- Soft Drinks Total -->
          <div
            v-if="(filteredTotals['Soft Drinks'] || 0) !== 0"
            class="col-auto"
          >
            <q-badge
              class="summary-badge"
              :color="getBadgeColor('Soft Drinks')"
              text-color="white"
            >
              <div class="row items-center no-wrap q-pa-xs">
                <q-icon name="local_drink" size="14px" class="q-mr-xs" />
                <div>
                  <div class="text-caption text-weight-bold">SOFT DRINKS</div>
                  <div class="text-subtitle2 text-weight-bold">
                    {{ formatPrice(filteredTotals["Soft Drinks"] || 0) }}
                  </div>
                </div>
              </div>
            </q-badge>
          </div>

          <div
            v-if="(filteredTotals['Other Products'] || 0) !== 0"
            class="col-auto"
          >
            <q-badge
              class="summary-badge"
              :color="getBadgeColor('Other Products')"
              text-color="white"
            >
              <div class="row items-center no-wrap q-pa-xs">
                <q-icon name="category" size="14px" class="q-mr-xs" />
                <div>
                  <div class="text-caption text-weight-bold">
                    OTHER PRODUCTS
                  </div>
                  <div class="text-subtitle2 text-weight-bold">
                    {{ formatPrice(filteredTotals["Other Products"] || 0) }}
                  </div>
                </div>
              </div>
            </q-badge>
          </div>
        </div>

        <!-- Results Count -->
        <div v-if="filter" class="q-mt-sm">
          <q-badge color="primary" text-color="white" class="q-pa-xs">
            {{ filteredProducts.length }} result{{
              filteredProducts.length !== 1 ? "s" : ""
            }}
          </q-badge>
        </div>
      </q-card-section>

      <!-- Products Table - Compact Version -->
      <q-card-section class="table-section q-pa-md">
        <div v-if="hasProducts">
          <!-- Compact Table using divs instead of q-table -->
          <div class="compact-table">
            <!-- Table Header -->
            <div class="table-header row items-center no-wrap">
              <div class="header-cell type-header">
                <div class="header-label">TYPE</div>
              </div>
              <div class="header-cell name-header">
                <div class="header-label">PRODUCT NAME</div>
              </div>
              <div class="header-cell price-header">
                <div class="header-label">PRICE</div>
              </div>
              <div class="header-cell inv-header">
                <!-- <div class="header-label">BEG</div> -->
                <div class="header-subtitle">Beginning</div>
              </div>
              <div class="header-cell inv-header">
                <!-- <div class="header-label">ADD / NP</div> -->
                <div class="header-subtitle">Added / New Prod</div>
              </div>
              <div class="header-cell inv-header">
                <!-- <div class="header-label">REM</div> -->
                <div class="header-subtitle">Remaining</div>
              </div>
              <div class="header-cell inv-header">
                <div class="header-label">OUT</div>
              </div>
              <div class="header-cell inv-header">
                <div class="header-label">SOLD</div>
              </div>
              <div class="header-cell sales-header">
                <div class="header-label">SALES</div>
              </div>
            </div>

            <!-- Table Rows -->
            <div
              v-for="(product, index) in filteredProducts"
              :key="index"
              class="table-row row items-center no-wrap"
              :class="getRowClass(product)"
            >
              <!-- Type Column -->
              <div class="row-cell type-cell">
                <q-badge
                  :color="getTypeColor(product.type)"
                  text-color="white"
                  class="type-badge"
                >
                  {{ getTypeAbbreviation(product.type) }}
                </q-badge>
              </div>

              <!-- Name Column - Dynamic Font Size -->
              <div class="row-cell name-cell">
                <div
                  class="product-name"
                  :style="getProductNameStyle(product.name)"
                  :title="capitalizeFirstLetter(product.name || 'N/A')"
                >
                  {{ capitalizeFirstLetter(product.name || "N/A") }}
                </div>
              </div>

              <!-- Price Column -->
              <div class="row-cell price-cell">
                <div class="price-value text-weight-bold">
                  {{ formatPrice(product.price || 0) }}
                </div>
              </div>

              <!-- Beginning Column -->
              <div class="row-cell inv-cell text-center">
                <div
                  :class="getQuantityClass('beginnings', product.beginnings)"
                >
                  {{ product.beginnings || "0" }}
                </div>
              </div>

              <!-- Added Column -->
              <div class="row-cell inv-cell text-center">
                <div :class="getQuantityClass('added', product.added)">
                  {{ product.added || product.new_production || "0" }}
                </div>
              </div>

              <!-- Remaining Column -->
              <div class="row-cell inv-cell text-center">
                <div :class="getQuantityClass('remaining', product.remaining)">
                  {{ product.remaining || "0" }}
                </div>
              </div>

              <!-- Out Column -->
              <div class="row-cell inv-cell text-center">
                <div :class="getQuantityClass('out', product.out)">
                  {{ product.out || "0" }}
                </div>
              </div>

              <!-- Sold Column -->
              <div class="row-cell inv-cell text-center">
                <div :class="getSoldClass(calculateSold(product))">
                  {{ calculateSold(product) }}
                </div>
              </div>

              <!-- Sales Column -->
              <div class="row-cell sales-cell text-right">
                <div class="sales-value text-weight-bold">
                  {{ formatPrice(calculateSales(product) || 0) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Table Footer -->
          <div class="table-footer row items-center justify-between q-mt-md">
            <div class="text-caption text-grey-7">
              Showing {{ filteredProducts.length }} product{{
                filteredProducts.length !== 1 ? "s" : ""
              }}
            </div>
            <!-- <div class="text-caption text-grey-7">
              Updated: {{ getCurrentTime() }}
            </div> -->
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state text-center q-pa-xl">
          <q-icon name="inventory_2" size="60px" color="grey-4" />
          <div class="text-subtitle1 text-weight-medium text-grey-6 q-mt-md">
            No Negative Products Found
          </div>
          <div class="text-caption text-grey-5 q-mt-xs">
            All inventory levels are within acceptable ranges
          </div>
        </div>

        <!-- No Search Results -->
        <div
          v-if="filter && filteredProducts.length === 0"
          class="no-results text-center q-pa-lg"
        >
          <q-icon name="search_off" color="grey-5" size="40px" />
          <div class="text-subtitle2 text-grey-7 q-mt-sm">
            No products found for "<span class="text-weight-bold">{{
              filter
            }}</span
            >"
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { computed, ref } from "vue";
import { typographyFormat } from "src/composables/typography/typography-format";

const { formatPrice, capitalizeFirstLetter } = typographyFormat();
const { dialogRef, onDialogHide } = useDialogPluginComponent();
const dialog = ref(false);
const maximizedToggle = ref(true);
const props = defineProps(["negativeProducts"]);
const filter = ref("");

// Computed property for filtered products
const filteredProducts = computed(() => {
  if (!props.negativeProducts || props.negativeProducts === "No report") {
    return [];
  }

  const products = props.negativeProducts;

  if (!filter.value || !filter.value.trim()) {
    return products;
  }

  const search = filter.value.trim().toLocaleLowerCase();

  return products.filter((product) => {
    return (
      (product.name && product.name.toLowerCase().includes(search)) ||
      (product.type && product.type.toLowerCase().includes(search)) ||
      (product.price && String(product.price).includes(search)) ||
      (product.sold && String(product.sold).includes(search)) ||
      (product.sales && String(product.sales).includes(search)) ||
      (product.beginnings && String(product.beginnings).includes(search)) ||
      (product.added && String(product.added).includes(search)) ||
      (product.remaining && String(product.remaining).includes(search)) ||
      (product.out && String(product.out).includes(search))
    );
  });
});

const hasProducts = computed(() => {
  return filteredProducts.value.length > 0;
});

const calculateSold = (product) => {
  const beginnings = Number(product.beginnings) || 0;
  const added = Number(product.added || product.new_production) || 0;
  const remaining = Number(product.remaining) || 0;
  const out = Number(product.out) || 0;

  const totalValue = beginnings + added;
  return totalValue - (remaining + out);
};

const calculateSales = (product) => {
  const sold = calculateSold(product);
  const price = Number(product.price) || 0;
  return sold * price;
};

const filteredTotals = computed(() => {
  const totals = {
    Bread: 0,
    Selecta: 0,
    "Soft Drinks": 0,
    "Other Products": 0,
  };

  filteredProducts.value.forEach((product) => {
    const type = product.type;
    if (!totals.hasOwnProperty(type)) return;
    totals[type] += calculateSales(product);
  });

  return totals;
});

const getBadgeColor = (type) => {
  switch (type?.toLowerCase()) {
    case "bread":
      return "brown";
    case "selecta":
      return "red";
    case "soft drinks":
      return "purple";
    case "other products":
      return "blue-grey";
    default:
      return "grey";
  }
};

const getTypeColor = (type) => {
  switch (type?.toLowerCase()) {
    case "bread":
      return "brown-7";
    case "selecta":
      return "red-7";
    case "soft drinks":
      return "purple-7";
    case "other products":
      return "blue-grey-7";
    default:
      return "grey";
  }
};

const getTypeAbbreviation = (type) => {
  switch (type?.toLowerCase()) {
    case "bread":
      return "BRD";
    case "selecta":
      return "SEL";
    case "soft drinks":
      return "SFT";
    case "other products":
      return "OTH";
    default:
      return type?.substring(0, 3).toUpperCase() || "N/A";
  }
};

// Dynamic font size calculation for product names
const getProductNameStyle = (name) => {
  if (!name) return {};

  const nameLength = name.length;
  let fontSize = "11px"; // Default

  if (nameLength > 30) {
    fontSize = "9px";
  } else if (nameLength > 20) {
    fontSize = "10px";
  } else if (nameLength > 15) {
    fontSize = "10.5px";
  } else if (nameLength <= 10) {
    fontSize = "11.5px";
  }

  return {
    fontSize: fontSize,
    lineHeight: "1.2",
  };
};

const getRowClass = (product) => {
  const sold = calculateSold(product);
  if (sold < 0) return "negative-row";
  if (sold === 0) return "zero-row";
  return "";
};

const getSoldClass = (sold) => {
  if (sold < 0) return "text-negative text-weight-bold";
  if (sold > 0) return "text-positive";
  return "text-grey";
};

const getQuantityClass = (field, value) => {
  const numValue = Number(value) || 0;
  if (field === "remaining" && numValue <= 0)
    return "text-negative text-weight-bold";
  if (field === "out" && numValue > 0) return "text-warning";
  return "";
};

const negativeProdcutsColumns = [
  {
    name: "type",
    label: "Product Type",
    field: "type",
    align: "justify",
  },
  {
    name: "name",
    label: "Product Name",
    field: (row) => row.name,
    format: (val) => capitalizeFirstLetter(val),
    align: "justify",
  },
  {
    name: "price",
    label: "Price",
    field: (row) => row.price,
    format: (val) => formatPrice(val),
    align: "justify",
  },
  {
    name: "beginnings",
    label: "Beginnings (PCS)",
    field: "beginnings",
    align: "center",
  },
  {
    name: "added",
    label: "Added / New Production (PCS)",
    field: "added",
    align: "center",
  },
  {
    name: "remaining",
    label: "Remaining (PCS)",
    field: "remaining",
    align: "center",
  },
  {
    name: "out",
    label: "Out (PCS)",
    field: "out",
    align: "center",
  },
  {
    name: "sold",
    label: "Product Sold (PCS)",
    field: "sold",
    align: "center",
  },
  {
    name: "sales",
    label: "Sales (PCS)",
    field: (row) => row.sales,
    format: (val) => formatPrice(val),
    align: "justify",
  },
];

const filteredRows = computed(() => {
  if (!filter.value || !filter.value.trim()) {
    // If there's no filter, return all rows
    return props.negativeProducts || [];
  }

  const search = filter.value.trim().toLowerCase();
  return (props.negativeProducts || []).filter((row) => {
    // Perform filtering on relevant fields
    return (
      row.name?.toLowerCase().includes(search) ||
      row.type?.toLowerCase().includes(search) ||
      String(row.price).includes(search) ||
      String(row.sales).includes(search)
    );
  });
});

const overallTotals = computed(() => {
  // Initialize totals
  const totals = {
    Bread: 0,
    Selecta: 0,
    "Soft Drinks": 0,
    "Other Products": 0,
  };

  filteredRows.value.forEach((row) => {
    const type = row.type;

    if (!totals.hasOwnProperty(type)) return; // SKIP UNKNOWN TYPES

    const beginnings = Number(row.beginnings) || 0;
    const newProduction = Number(row.new_production) || Number(row.added) || 0;
    const remaining = Number(row.remaining) || 0;
    const out = Number(row.out) || 0;
    const price = Number(row.price) || 0;

    const totalValue = beginnings + newProduction;
    const sold = totalValue - (remaining + out);
    const salesAmount = sold * price;

    // ✅  Add all sales, negative or positive
    totals[type] += salesAmount;
  });

  return totals;
});
</script>

<style scoped>
.negative-products-dialog {
  font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
}

.dialog-header {
  background: linear-gradient(135deg, #c62828 0%, #d32f2f 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px 20px;
}

.close-btn {
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.2s ease;
}

.close-btn:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.search-section {
  background-color: #f8f9fa;
  padding: 12px 20px 12px 20px;
}

.search-input {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
}

.search-input :deep(.q-field__control) {
  height: 36px;
  min-height: 36px;
}

.summary-section {
  padding: 8px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.summary-badge {
  border-radius: 6px;
  min-width: 100px;
  height: 48px;
}

.summary-badge .q-icon {
  filter: brightness(0) invert(1);
}

/* Compact Table Styles */
.compact-table {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  min-width: fit-content;
}

.table-header {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 2px solid #dee2e6;
  height: 40px;
  width: 100%;
  display: flex;
}

.header-cell {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 4px;
  border-right: 1px solid #e0e0e0;
  min-height: 40px;
  overflow: hidden;
}

.header-cell:last-child {
  border-right: none;
}

/* Specific column widths */
.type-header {
  min-width: 70px;
  max-width: 70px;
  flex: 0 0 70px;
}

.name-header {
  min-width: 180px;
  max-width: 180px;
  flex: 0 0 180px;
}

.price-header {
  min-width: 80px;
  max-width: 80px;
  flex: 0 0 80px;
}

.inv-header {
  min-width: 60px;
  max-width: 60px;
  flex: 0 0 60px;
}

.sales-header {
  min-width: 90px;
  max-width: 90px;
  flex: 0 0 90px;
}

.header-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #555;
  text-align: center;
  line-height: 1.2;
}

.header-subtitle {
  font-size: 8px;
  color: #888;
  margin-top: 1px;
  text-align: center;
  line-height: 1.1;
}

.table-row {
  height: 40px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
  width: 100%;
  display: flex;
}

.table-row:hover {
  background-color: #f8f9fa !important;
}

.table-row:last-child {
  border-bottom: none;
}

.row-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 4px;
  border-right: 1px solid #f0f0f0;
  height: 40px;
  overflow: hidden;
}

.row-cell:last-child {
  border-right: none;
}

/* Match cell widths to header widths */
.type-cell {
  min-width: 70px;
  max-width: 70px;
  flex: 0 0 70px;
}

.name-cell {
  min-width: 180px;
  max-width: 180px;
  flex: 0 0 180px;
  justify-content: flex-start !important;
  padding-left: 8px !important;
}

.price-cell {
  min-width: 80px;
  max-width: 80px;
  flex: 0 0 80px;
}

.inv-cell {
  min-width: 60px;
  max-width: 60px;
  flex: 0 0 60px;
}

.sales-cell {
  min-width: 90px;
  max-width: 90px;
  flex: 0 0 90px;
}

.type-badge {
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-align: center;
  min-width: 40px;
  display: inline-block;
}

.product-name {
  font-weight: 600;
  color: #2c3e50;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: left;
  transition: all 0.2s ease;
}

.product-name:hover {
  color: #1a252f;
}

.price-value {
  font-size: 11px;
  color: #27ae60;
}

.sales-value {
  font-size: 11px;
  color: #2980b9;
}

.negative-row {
  background-color: #ffebee !important;
  border-left: 3px solid #f44336;
}

.zero-row {
  background-color: #fff8e1 !important;
  border-left: 3px solid #ffc107;
}

.table-footer {
  padding: 8px 0;
  border-top: 1px solid #e0e0e0;
  margin-top: 8px;
}

.empty-state {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.no-results {
  border: 1px dashed #ddd;
  border-radius: 8px;
  background: #f9f9f9;
}

.text-positive {
  color: #27ae60;
}

.text-warning {
  color: #f39c12;
}

.text-negative {
  color: #e74c3c;
}

.opacity-85 {
  opacity: 0.85;
}

/* Ensure the table fits within the dialog */
:deep(.q-dialog__inner) {
  padding: 16px;
}

:deep(.q-card) {
  max-height: calc(100vh - 32px);
}

.table-section {
  overflow-x: auto;
  overflow-y: hidden;
  padding: 12px 16px;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .name-header,
  .name-cell {
    min-width: 160px;
    max-width: 160px;
    flex: 0 0 160px;
  }

  .inv-header,
  .inv-cell {
    min-width: 55px;
    max-width: 55px;
    flex: 0 0 55px;
  }
}

/* Very long name handling */
.product-name-long {
  font-size: 9px !important;
  letter-spacing: -0.2px;
}

.product-name-very-long {
  font-size: 8.5px !important;
  letter-spacing: -0.3px;
}
</style>
