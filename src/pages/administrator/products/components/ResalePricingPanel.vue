<template>
  <div class="resale-pricing-panel">
    <!-- Financial Summary KPI Cards -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat class="kpi-card shadow-1">
          <q-card-section class="row items-center no-wrap">
            <div class="kpi-icon-wrapper bg-blue-1 text-blue-9">
              <q-icon name="inventory_2" size="24px" />
            </div>
            <div class="q-ml-md">
              <div class="text-caption text-grey-7">Total Non-Bread SKUs</div>
              <div class="text-h6 text-weight-bold">
                {{ summary.total_products?.toLocaleString() || 0 }}
                <span class="text-caption text-grey-6 font-weight-normal">
                  ({{ summary.total_units_in_stock?.toLocaleString() || 0 }} units)
                </span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat class="kpi-card shadow-1">
          <q-card-section class="row items-center no-wrap">
            <div class="kpi-icon-wrapper bg-amber-1 text-amber-9">
              <q-icon name="account_balance_wallet" size="24px" />
            </div>
            <div class="q-ml-md">
              <div class="text-caption text-grey-7">Total Cost Valuation</div>
              <div class="text-h6 text-weight-bold text-amber-10">
                ₱{{ formatCurrency(summary.total_cost_valuation) }}
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat class="kpi-card shadow-1">
          <q-card-section class="row items-center no-wrap">
            <div class="kpi-icon-wrapper bg-green-1 text-green-9">
              <q-icon name="point_of_sale" size="24px" />
            </div>
            <div class="q-ml-md">
              <div class="text-caption text-grey-7">Total Retail Valuation</div>
              <div class="text-h6 text-weight-bold text-green-10">
                ₱{{ formatCurrency(summary.total_retail_valuation) }}
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat class="kpi-card shadow-1">
          <q-card-section class="row items-center no-wrap">
            <div class="kpi-icon-wrapper bg-purple-1 text-purple-9">
              <q-icon name="trending_up" size="24px" />
            </div>
            <div class="q-ml-md">
              <div class="text-caption text-grey-7">Potential Gross Profit</div>
              <div class="text-h6 text-weight-bold text-purple-9">
                ₱{{ formatCurrency(summary.total_potential_profit) }}
                <q-badge color="purple-2" text-color="purple-9" class="q-ml-xs text-bold">
                  {{ summary.average_profit_margin_pct || 0 }}%
                </q-badge>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Filter Bar -->
    <q-card flat class="filter-card q-mb-md shadow-1">
      <q-card-section class="row items-center q-col-gutter-sm">
        <!-- Branch Selector -->
        <div class="col-12 col-sm-4 col-md-3">
          <q-select
            v-model="selectedBranch"
            :options="branchOptions"
            option-label="name"
            option-value="id"
            emit-value
            map-options
            outlined
            dense
            clearable
            label="Filter by Branch"
            @update:model-value="onFilterChange"
          >
            <template v-slot:prepend>
              <q-icon name="storefront" color="primary" />
            </template>
          </q-select>
        </div>

        <!-- Category Filter Chips -->
        <div class="col-12 col-sm-8 col-md-5">
          <div class="row q-gutter-xs items-center">
            <span class="text-caption text-grey-7 q-mr-xs">Category:</span>
            <q-chip
              v-for="cat in categoryList"
              :key="cat.value"
              clickable
              :selected="selectedCategory === cat.value"
              :color="selectedCategory === cat.value ? cat.activeColor : 'grey-2'"
              :text-color="selectedCategory === cat.value ? 'white' : 'grey-9'"
              size="sm"
              @click="selectCategory(cat.value)"
            >
              {{ cat.label }}
            </q-chip>
          </div>
        </div>

        <!-- Search Input -->
        <div class="col-12 col-md-4">
          <q-input
            v-model="searchQuery"
            outlined
            dense
            placeholder="Search resale product..."
            debounce="300"
            clearable
            @update:model-value="onFilterChange"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </q-card-section>
    </q-card>

    <!-- Resale Products Table -->
    <q-card flat class="shadow-1 table-card">
      <q-table
        :rows="resaleProducts"
        :columns="columns"
        row-key="branch_product_id"
        :loading="loading"
        v-model:pagination="pagination"
        @request="onRequest"
        flat
        binary-state-sort
        no-data-label="No resale products found"
      >
        <!-- Product & Category Column -->
        <template v-slot:body-cell-product_name="props">
          <q-td :props="props">
            <div class="row items-center no-wrap">
              <q-avatar
                size="32px"
                :color="getCategoryColor(props.row.category)"
                text-color="white"
                class="q-mr-sm text-weight-bold"
              >
                {{ props.row.category?.charAt(0) || 'P' }}
              </q-avatar>
              <div>
                <div class="text-weight-bold text-capitalize">{{ props.row.product_name }}</div>
                <q-badge
                  :color="getCategoryBadgeColor(props.row.category)"
                  :text-color="getCategoryTextColor(props.row.category)"
                  size="xs"
                  class="q-mt-xs"
                >
                  {{ props.row.category }}
                </q-badge>
              </div>
            </div>
          </q-td>
        </template>

        <!-- Branch Column -->
        <template v-slot:body-cell-branch_name="props">
          <q-td :props="props">
            <div class="text-body2 text-grey-9 text-weight-medium">
              <q-icon name="place" size="14px" color="grey-6" class="q-mr-xs" />
              {{ props.row.branch_name }}
            </div>
          </q-td>
        </template>

        <!-- Original Cost (COGS) -->
        <template v-slot:body-cell-original_price="props">
          <q-td :props="props">
            <div v-if="props.row.original_price > 0" class="text-weight-bold text-grey-9">
              ₱{{ formatCurrency(props.row.original_price) }}
            </div>
            <q-badge v-else color="grey-3" text-color="grey-7" label="Not Set" />
          </q-td>
        </template>

        <!-- Selling Price -->
        <template v-slot:body-cell-selling_price="props">
          <q-td :props="props">
            <div v-if="props.row.selling_price > 0" class="text-weight-bold text-primary">
              ₱{{ formatCurrency(props.row.selling_price) }}
            </div>
            <q-badge v-else color="red-1" text-color="red-8" label="₱0.00" />
          </q-td>
        </template>

        <!-- Markup & Margin -->
        <template v-slot:body-cell-unit_markup="props">
          <q-td :props="props">
            <div v-if="props.row.original_price > 0 && props.row.selling_price > 0">
              <div class="text-weight-bold text-green-9">
                +₱{{ formatCurrency(props.row.unit_markup) }}
              </div>
              <q-badge
                :color="getMarginBadgeColor(props.row.margin_percentage)"
                class="q-mt-xs text-bold"
              >
                {{ props.row.margin_percentage }}% Margin
              </q-badge>
            </div>
            <span v-else class="text-caption text-grey-5">—</span>
          </q-td>
        </template>

        <!-- Stock on Hand -->
        <template v-slot:body-cell-current_stock="props">
          <q-td :props="props">
            <div class="row items-center no-wrap">
              <q-badge
                :color="getStockColor(props.row.current_stock)"
                class="text-bold q-px-sm q-py-xs"
              >
                {{ props.row.current_stock }} pcs
              </q-badge>
            </div>
          </q-td>
        </template>

        <!-- Valuation -->
        <template v-slot:body-cell-valuation="props">
          <q-td :props="props">
            <div class="text-caption text-grey-8">
              Cost: <span class="text-weight-bold">₱{{ formatCurrency(props.row.inventory_cost_value) }}</span>
            </div>
            <div class="text-caption text-green-9">
              Retail: <span class="text-weight-bold">₱{{ formatCurrency(props.row.inventory_retail_value) }}</span>
            </div>
          </q-td>
        </template>

        <!-- Actions: Movement Ledger & Edit Pricing/Stock -->
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" align="right">
            <div class="row items-center justify-end no-wrap q-gutter-x-xs">
              <q-btn
                color="secondary"
                flat
                dense
                icon="edit"
                label="Edit"
                class="q-px-xs"
                @click="openEditDialog(props.row)"
              >
                <q-tooltip>Edit Cost, Selling Price & Stock on Hand (Admin Auth)</q-tooltip>
              </q-btn>
              <q-btn
                color="primary"
                flat
                dense
                icon="history"
                label="Ledger"
                class="q-px-xs"
                @click="openMovementLedger(props.row)"
              >
                <q-tooltip>View Complete Stock Movement & Audit Trail</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Resale Pricing & Stock Edit Modal -->
    <ResalePricingEditDialog
      v-model="editDialogVisible"
      :item="selectedEditItem"
      @updated="handleItemUpdated"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useResalePricingStore } from "src/stores/resale-pricing";
import { useBranchesStore } from "src/stores/branch";
import ResalePricingEditDialog from "./ResalePricingEditDialog.vue";

const emit = defineEmits(["open-ledger"]);

const resaleStore = useResalePricingStore();
const branchStore = useBranchesStore();

const editDialogVisible = ref(false);
const selectedEditItem = ref(null);

const openEditDialog = (row) => {
  selectedEditItem.value = row;
  editDialogVisible.value = true;
};

const handleItemUpdated = () => {
  onFilterChange();
};

const loading = computed(() => resaleStore.loading);
const resaleProducts = computed(() => resaleStore.resaleProducts);
const summary = computed(() => resaleStore.summary);
const pagination = computed({
  get: () => resaleStore.pagination,
  set: (val) => {
    resaleStore.pagination = val;
  },
});

const selectedBranch = ref(null);
const selectedCategory = ref("All");
const searchQuery = ref("");

const branchOptions = ref([]);

const categoryList = [
  { label: "All", value: "All", activeColor: "grey-9" },
  { label: "Selecta", value: "Selecta", activeColor: "red-7" },
  { label: "Softdrinks", value: "Softdrinks", activeColor: "orange-8" },
  { label: "Nestle", value: "Nestle", activeColor: "brown-7" },
  { label: "Others", value: "Other", activeColor: "blue-grey-7" },
];

const columns = [
  { name: "product_name", label: "Product & Category", field: "product_name", align: "left", sortable: true },
  { name: "branch_name", label: "Branch", field: "branch_name", align: "left", sortable: true },
  { name: "original_price", label: "Cost (Orig. Price)", field: "original_price", align: "left", sortable: true },
  { name: "selling_price", label: "Branch Price", field: "selling_price", align: "left", sortable: true },
  { name: "unit_markup", label: "Unit Margin (₱ / %)", field: "unit_markup", align: "left", sortable: true },
  { name: "current_stock", label: "Stock on Hand", field: "current_stock", align: "left", sortable: true },
  { name: "valuation", label: "Stock Valuation", align: "left" },
  { name: "actions", label: "Audit / Movement", align: "right" },
];

const formatCurrency = (val) => {
  if (val === null || val === undefined || isNaN(val)) return "0.00";
  return Number(val).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const getCategoryColor = (cat) => {
  switch (cat?.toLowerCase()) {
    case "selecta":
      return "red-6";
    case "softdrinks":
      return "orange-7";
    case "nestle":
      return "brown-6";
    default:
      return "blue-grey-6";
  }
};

const getCategoryBadgeColor = (cat) => {
  switch (cat?.toLowerCase()) {
    case "selecta":
      return "red-1";
    case "softdrinks":
      return "orange-1";
    case "nestle":
      return "brown-1";
    default:
      return "grey-2";
  }
};

const getCategoryTextColor = (cat) => {
  switch (cat?.toLowerCase()) {
    case "selecta":
      return "red-9";
    case "softdrinks":
      return "orange-9";
    case "nestle":
      return "brown-9";
    default:
      return "grey-9";
  }
};

const getMarginBadgeColor = (marginPct) => {
  const pct = Number(marginPct);
  if (pct >= 25) return "green-7";
  if (pct >= 15) return "teal-6";
  if (pct > 0) return "amber-8";
  return "red-6";
};

const getStockColor = (stock) => {
  const s = Number(stock);
  if (s > 20) return "green-7";
  if (s > 0) return "orange-7";
  return "red-6";
};

const selectCategory = (cat) => {
  selectedCategory.value = cat;
  onFilterChange();
};

const onFilterChange = () => {
  resaleStore.fetchResalePricing({
    branch_id: selectedBranch.value,
    category: selectedCategory.value,
    search: searchQuery.value,
    page: 1,
  });
};

const onRequest = (props) => {
  const { page, rowsPerPage, sortBy, descending } = props.pagination;
  resaleStore.fetchResalePricing({
    branch_id: selectedBranch.value,
    category: selectedCategory.value,
    search: searchQuery.value,
    page,
    rowsPerPage,
    sortBy,
    descending,
  });
};

const openMovementLedger = (row) => {
  emit("open-ledger", row);
};

onMounted(async () => {
  try {
    if (branchStore.fetchBranches) {
      await branchStore.fetchBranches();
      branchOptions.value = branchStore.branches || [];
    }
  } catch (e) {
    console.error("Failed to load branches", e);
  }

  resaleStore.fetchResalePricing();
});
</script>

<style lang="scss" scoped>
.resale-pricing-panel {
  width: 100%;
}

.kpi-card {
  border-radius: 12px;
  background: #ffffff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
}

.kpi-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-card {
  border-radius: 12px;
  background: #ffffff;
}

.table-card {
  border-radius: 12px;
  background: #ffffff;
}
</style>
