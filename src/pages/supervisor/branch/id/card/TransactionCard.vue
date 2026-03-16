<template>
  <div class="mobile-transactions">
    <!-- Premium Header with Animated Gradient -->
    <div class="premium-header">
      <div class="header-content q-pa-md">
        <div class="row items-center justify-between">
          <div>
            <div class="text-h6 text-weight-bold text-white">Transactions</div>
            <div class="text-caption text-white text-opacity-80">
              Track inventory movements
            </div>
          </div>
          <q-avatar size="44px" class="header-avatar">
            <q-icon name="inventory_2" color="primary" size="24px" />
          </q-avatar>
        </div>

        <!-- Glassmorphic Search -->
        <q-input
          v-model="filter"
          outlined
          dense
          debounce="300"
          placeholder="Search transactions..."
          class="glass-search q-mt-md"
          bg-color="white"
          rounded
        >
          <template v-slot:prepend>
            <q-icon name="search" color="white" size="20px" />
          </template>
          <template v-slot:append v-if="filter">
            <q-icon
              name="close"
              class="cursor-pointer"
              color="white"
              size="20px"
              @click="filter = ''"
            />
          </template>
        </q-input>
      </div>

      <!-- Curved Bottom Edge -->
      <div class="header-curve"></div>
    </div>

    <!-- Floating Stats Cards -->
    <div class="stats-section q-px-md">
      <div class="row q-col-gutter-sm">
        <div class="col-4" v-for="stat in stats" :key="stat.label">
          <div class="stat-card-modern" :class="stat.color">
            <div class="stat-icon">
              <q-icon :name="stat.icon" size="22px" />
            </div>
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-glow"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Filters with Pill Design -->
    <div class="quick-filters q-px-md q-mt-lg">
      <div class="filter-scroll">
        <q-btn
          v-for="btn in filters"
          :key="btn.value"
          rounded
          unelevated
          :class="['filter-pill', { 'active-pill': quickFilter === btn.value }]"
          :label="btn.label"
          @click="quickFilter = btn.value"
        />
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="skeleton-section q-px-md q-mt-md">
      <div v-for="i in 3" :key="i" class="skeleton-card">
        <div class="skeleton-shine"></div>
      </div>
    </div>

    <!-- Empty State with Animation -->
    <div v-else-if="!rows.length" class="empty-state-modern">
      <div class="empty-illustration">
        <lottie-player
          src="https://assets3.lottiefiles.com/packages/lf20_p1qiuaov.json"
          background="transparent"
          speed="1"
          style="width: 200px; height: 200px"
          loop
          autoplay
        ></lottie-player>
      </div>
      <div class="empty-title">No transactions yet</div>
      <div class="empty-subtitle">
        {{
          filter
            ? "No matches found"
            : "Start by creating your first transaction"
        }}
      </div>
      <q-btn
        v-if="filter"
        flat
        color="primary"
        label="Clear filters"
        @click="filter = ''"
        class="clear-btn"
      />
    </div>

    <!-- Transaction Cards -->
    <div v-else class="transaction-list q-px-md q-mt-md q-mb-xl">
      <div
        v-for="(item, index) in filteredTransactions"
        :key="index"
        class="transaction-card-modern"
        @click="viewDetails(item)"
      >
        <!-- Card Background with Status Indicator -->
        <div class="card-bg" :class="`bg-${getStatusColor(item.status)}-soft`">
          <div class="status-indicator" :class="`status-${item.status}`"></div>
        </div>

        <div class="card-content">
          <!-- Top Row -->
          <div class="top-row">
            <div class="product-info">
              <div class="icon-wrapper" :class="getProcedureColor(item.action)">
                <q-icon
                  :name="
                    item.action?.toLowerCase() === 'send'
                      ? 'arrow_upward'
                      : 'arrow_downward'
                  "
                  size="20px"
                  color="grey"
                />
              </div>
              <div class="product-details">
                <div class="product-name">
                  {{ capitalizeFirstLetter(item.product?.name || "N/A") }}
                </div>
                <div class="product-meta">
                  <q-icon name="schedule" size="14px" />
                  {{ formatDate(item.created_at || "N/A") }}
                  {{ formatTime(item.created_at || "N/A") }}
                </div>
              </div>
            </div>

            <div class="status-chip" :class="`status-${item.status}`">
              <span class="status-dot"></span>
              {{ item.status }}
            </div>
          </div>

          <!-- Staff Info -->
          <div class="staff-info">
            <q-avatar size="24px" icon="person" class="staff-avatar">
              <!-- <img :src="getStaffAvatar(item.employee)" /> -->
            </q-avatar>
            <span class="staff-name">{{ formatFullname(item.employee) }}</span>
          </div>

          <!-- Movement Visualization -->
          <div class="movement-visual">
            <div class="location from">
              <span class="location-dot from-dot"></span>
              <span class="location-name">{{
                item.from_branch?.name || "Warehouse"
              }}</span>
            </div>

            <div class="movement-line">
              <div class="line"></div>
              <div class="movement-icon" :class="item.action">
                <q-icon
                  :name="
                    item.action === 'send' ? 'trending_flat' : 'trending_flat'
                  "
                />
              </div>
              <div class="line"></div>
            </div>

            <div class="location to">
              <span class="location-dot to-dot"></span>
              <span class="location-name">{{
                item.to_branch?.name || "Customer"
              }}</span>
            </div>
          </div>

          <!-- Bottom Row with Quantity -->
          <div class="bottom-row">
            <div class="quantity-badge">
              <q-icon name="inventory" size="16px" />
              <span>{{ item.added_product || 0 }} pcs</span>
            </div>
            <div class="time-badge">
              <q-icon name="access_time" size="14px" />
              {{ formatTime(item.created_at) }}
            </div>
          </div>
        </div>

        <!-- Touch Ripple Effect -->
        <div class="touch-ripple"></div>
      </div>

      <!-- Elegant Pagination -->
      <div v-if="totalPages > 1" class="pagination-modern">
        <div class="pagination-progress">
          <div class="progress-track">
            <div
              class="progress-fill"
              :style="{ width: `${(pagination.page / totalPages) * 100}%` }"
            ></div>
          </div>
        </div>

        <div class="pagination-controls">
          <q-btn
            flat
            round
            dense
            :disable="pagination.page === 1"
            @click="onPageChange(pagination.page - 1)"
            class="pagination-btn"
          >
            <q-icon name="chevron_left" />
          </q-btn>

          <div class="page-indicator">
            <span class="current-page">{{ pagination.page }}</span>
            <span class="separator">/</span>
            <span class="total-pages">{{ totalPages }}</span>
          </div>

          <q-btn
            flat
            round
            dense
            :disable="pagination.page === totalPages"
            @click="onPageChange(pagination.page + 1)"
            class="pagination-btn"
          >
            <q-icon name="chevron_right" />
          </q-btn>
        </div>
      </div>
    </div>

    <!-- Floating Action Button -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" class="fab-modern" @click="createTransaction">
        <q-tooltip anchor="top left" self="bottom right">
          New Transaction
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script setup>
import { useDialogPluginComponent, useQuasar } from "quasar";
import { typographyFormat } from "src/composables/typography/typography-format";
import TransactionViewdetails from "../dialog/TransactionsViewDetails.vue";
import { useBranchProductsStore } from "src/stores/branch-product";
import { useSalesReportsStore } from "src/stores/sales-report";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
});

const filter = ref("");
const quickFilter = ref("all");
const paginationLoading = ref(false);
const route = useRoute();
const { dialogRef, onDialogHide } = useDialogPluginComponent();

const { formatDate, formatTime, formatFullname, capitalizeFirstLetter } =
  typographyFormat();

const salesReportsStore = useSalesReportsStore();
const userData = computed(() => salesReportsStore.user);

const branchId = route.params.branch_id;

const $q = useQuasar();

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});

const branchProductsStore = useBranchProductsStore();
const branchProducts = computed(() => branchProductsStore.branchSendAddedProd);

const rows = ref([]);
const loading = ref(false);
const showJumpDialog = ref(false);

// Computed properties
const totalTransactions = computed(() => pagination.value.rowsNumber);
const sentCount = computed(
  () => rows.value.filter((r) => r.action?.toLowerCase() === "send").length
);
const receivedCount = computed(
  () => rows.value.filter((r) => r.action?.toLowerCase() === "add").length
);
const totalPages = computed(() =>
  Math.ceil(pagination.value.rowsNumber / pagination.value.rowsPerPage)
);
const itemsStart = computed(
  () => (pagination.value.page - 1) * pagination.value.rowsPerPage + 1
);
const itemsEnd = computed(() =>
  Math.min(
    pagination.value.page * pagination.value.rowsPerPage,
    pagination.value.rowsNumber
  )
);

// Displayed pages for pagination
const displayedPages = computed(() => {
  const delta = 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= totalPages.value; i++) {
    if (
      i === 1 ||
      i === totalPages.value ||
      (i >= pagination.value.page - delta && i <= pagination.value.page + delta)
    ) {
      range.push(i);
    }
  }

  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  });

  return rangeWithDots;
});

// Filtered transactions based on quick filter
const filteredTransactions = computed(() => {
  if (quickFilter.value === "all") return rows.value;
  return rows.value.filter(
    (r) => r.status?.toLowerCase() === quickFilter.value
  );
});

const fetchASBranchProd = async (page = 1, rowsPerPage = 10, search = "") => {
  if (!branchId) return;

  paginationLoading.value = true;
  loading.value = true;

  try {
    const response = await branchProductsStore.fetchSendAddedBranchProducts(
      props.category,
      branchId,
      page,
      rowsPerPage,
      search
    );

    const { data, current_page, per_page, total } = branchProducts.value;

    rows.value = data;
    pagination.value = {
      page: current_page,
      rowsPerPage: per_page,
      rowsNumber: total,
    };
  } catch (err) {
    console.error("Failed to load branch products:", err);
    $q.notify({
      type: "negative",
      message: "Failed to load transactions",
      position: "top",
    });
  } finally {
    paginationLoading.value = false;
    loading.value = false;
  }
};

onMounted(fetchASBranchProd);

const onPageChange = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    fetchASBranchProd(page, pagination.value.rowsPerPage, filter.value);
  }
};

const onRowsPerPageChange = (value) => {
  pagination.value.page = 1;
  fetchASBranchProd(1, value, filter.value);
};

const onVirtualScroll = ({ to, direction, ref }) => {
  // Optional: Implement infinite scroll
};

// Watch for filter changes
watch(filter, async (newVal) => {
  pagination.value.page = 1;
  await fetchASBranchProd(1, pagination.value.rowsPerPage, newVal);
});

const getStatusColor = (status) => {
  const s = (status || "").toLowerCase();
  if (s.includes("pending")) return "warning";
  if (s.includes("confirmed") || s.includes("approved")) return "positive";
  if (s.includes("declined") || s.includes("reject")) return "negative";
  return "grey-5";
};

const getProcedureColor = (value) => {
  if (!value) return "grey";
  return value.toLowerCase() === "send" ? "blue" : "green";
};

const viewDetails = (row) => {
  $q.dialog({
    component: TransactionViewdetails,
    componentProps: {
      productDetails: row,
      category: props.category,
    },
  });
};

const createTransaction = () => {
  $q.notify({
    type: "info",
    message: "Create new transaction",
    position: "top",
  });
};

const getShortName = (name) => {
  if (!name) return "—";
  if (name.length > 10) return name.substring(0, 8) + "...";
  return name;
};

const getActionIcon = (action) => {
  if (!action) return "swap_horiz";
  return action.toLowerCase() === "send" ? "east" : "west";
};

const getActionClass = (action) => {
  if (!action) return "grey";
  return action.toLowerCase() === "send" ? "send-action" : "receive-action";
};

const getStatusClass = (status) => {
  const s = (status || "").toLowerCase();
  if (s.includes("pending")) return "status-pending";
  if (s.includes("confirmed") || s.includes("approved"))
    return "status-confirmed";
  if (s.includes("declined") || s.includes("reject")) return "status-declined";
  return "status-default";
};
</script>

<style lang="scss" scoped>
.mobile-transactions {
  min-height: 100vh;
  background: linear-gradient(180deg, #f8faff 0%, #f0f3fa 100%);
}

/* Premium Header */
.premium-header {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 50%
    );
  }

  .header-content {
    position: relative;
    z-index: 2;
    padding-bottom: 40px;
  }

  .header-avatar {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.3);
  }

  .header-curve {
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 40px;
    background: #f8faff;
    border-radius: 40px 40px 0 0;
  }
}

/* Glass Search */
.glass-search {
  :deep(.q-field__control) {
    background: rgba(255, 255, 255, 0.2) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    color: white;

    &::before {
      border: none !important;
    }
  }

  :deep(.q-field__native) {
    color: white;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }
}

/* Modern Stats Cards */
.stats-section {
  position: relative;
  z-index: 10;
  margin-top: -30px;
}

.stat-card-modern {
  position: relative;
  padding: 16px 8px;
  border-radius: 24px;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:active {
    transform: scale(0.95);
  }

  .stat-icon {
    width: 40px;
    height: 40px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 8px;
    position: relative;
    z-index: 2;
  }

  .stat-value {
    font-size: 20px;
    font-weight: 700;
    color: #1e293b;
    position: relative;
    z-index: 2;
  }

  .stat-label {
    font-size: 12px;
    color: #64748b;
    position: relative;
    z-index: 2;
  }

  .stat-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(102, 126, 234, 0.1),
      transparent 70%
    );
    z-index: 1;
  }

  &.primary-stat .stat-icon {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  &.info-stat .stat-icon {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
  }

  &.success-stat .stat-icon {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
  }
}

/* Quick Filters */
.filter-scroll {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 0;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.filter-pill {
  padding: 8px 20px !important;
  border-radius: 30px !important;
  background: white !important;
  color: #64748b !important;
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;

  &.active-pill {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    color: white !important;
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
  }
}

/* Loading Skeleton */
.skeleton-card {
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 24px;
  margin-bottom: 12px;
  animation: shimmer 1.5s infinite;
  position: relative;
  overflow: hidden;

  .skeleton-shine {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transform: translateX(-100%);
    animation: shine 1.5s infinite;
  }
}

/* Modern Transaction Card */
.transaction-card-modern {
  position: relative;
  margin-bottom: 16px;
  border-radius: 28px;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:active {
    transform: scale(0.98);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
  }

  .card-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 120px;
    background: linear-gradient(135deg, #f8faff 0%, #ffffff 100%);

    .status-indicator {
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;

      &.status-pending {
        background: linear-gradient(180deg, #f59e0b, #fbbf24);
      }

      &.status-confirmed {
        background: linear-gradient(180deg, #10b981, #34d399);
      }

      &.status-completed {
        background: linear-gradient(180deg, #3b82f6, #60a5fa);
      }
    }
  }

  .card-content {
    position: relative;
    z-index: 2;
    padding: 16px;
  }

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  .product-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

    &.send-action {
      background: linear-gradient(135deg, #3b82f6, #2563eb);
    }

    &.receive-action {
      background: linear-gradient(135deg, #10b981, #059669);
    }
  }

  .product-name {
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 4px;
  }

  .product-meta {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #94a3b8;
  }

  .status-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 30px;
    font-size: 12px;
    font-weight: 600;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    &.status-pending {
      color: #f59e0b;
      .status-dot {
        background: #f59e0b;
        animation: pulse 1.5s infinite;
      }
    }

    &.status-confirmed {
      color: #10b981;
      .status-dot {
        background: #10b981;
      }
    }

    &.status-completed {
      color: #3b82f6;
      .status-dot {
        background: #3b82f6;
      }
    }
  }

  .staff-info {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    padding: 8px 12px;
    background: #f8fafc;
    border-radius: 30px;
    width: fit-content;

    .staff-name {
      font-size: 13px;
      color: #475569;
    }
  }

  .movement-visual {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    padding: 12px;
    background: #f8fafc;
    border-radius: 20px;

    .location {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;

      .location-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;

        &.from-dot {
          background: #3b82f6;
        }
        &.to-dot {
          background: #10b981;
        }
      }

      .location-name {
        font-size: 11px;
        font-weight: 500;
        color: #475569;
        max-width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .movement-line {
      display: flex;
      align-items: center;
      gap: 4px;
      flex: 1;
      max-width: 100px;

      .line {
        height: 2px;
        background: #e2e8f0;
        flex: 1;
      }

      .movement-icon {
        width: 24px;
        height: 24px;
        border-radius: 12px;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

        &.send {
          color: #3b82f6;
        }

        &.add {
          color: #10b981;
        }
      }
    }
  }

  .bottom-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
    border-top: 1px solid #edf2f7;

    .quantity-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background: linear-gradient(135deg, #f8faff, #ffffff);
      border-radius: 30px;
      font-size: 12px;
      font-weight: 600;
      color: #1e293b;
    }

    .time-badge {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      color: #94a3b8;
    }
  }

  .touch-ripple {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at var(--x, 50%) var(--y, 50%),
      rgba(102, 126, 234, 0.1),
      transparent 80%
    );
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;
  }
}

/* Modern Pagination */
.pagination-modern {
  margin: 32px 0;
  padding: 16px;
  background: white;
  border-radius: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);

  .pagination-progress {
    margin-bottom: 16px;

    .progress-track {
      height: 4px;
      background: #edf2f7;
      border-radius: 100px;
      overflow: hidden;

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #667eea, #764ba2);
        border-radius: 100px;
        transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
    }
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;

    .pagination-btn {
      width: 44px;
      height: 44px;
      border-radius: 22px;
      background: white;
      color: #667eea;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
      transition: all 0.2s ease;

      &:active:not(:disabled) {
        transform: scale(0.9);
        background: #667eea;
        color: white;
      }

      &:disabled {
        opacity: 0.3;
        box-shadow: none;
      }
    }

    .page-indicator {
      display: flex;
      align-items: baseline;
      gap: 4px;

      .current-page {
        font-size: 20px;
        font-weight: 700;
        color: #667eea;
      }

      .separator {
        font-size: 14px;
        color: #e2e8f0;
      }

      .total-pages {
        font-size: 14px;
        color: #94a3b8;
      }
    }
  }
}

/* Empty State */
.empty-state-modern {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 32px;
  text-align: center;

  .empty-illustration {
    margin-bottom: 24px;
  }

  .empty-title {
    font-size: 20px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 8px;
  }

  .empty-subtitle {
    font-size: 14px;
    color: #94a3b8;
    margin-bottom: 24px;
  }

  .clear-btn {
    border-radius: 30px;
    padding: 8px 24px;
    background: #f8faff;
  }
}

/* FAB */
.fab-modern {
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.9);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
}

/* Animations */
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@keyframes shine {
  100% {
    transform: translateX(100%);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 380px) {
  .stat-card-modern {
    padding: 12px 4px;

    .stat-value {
      font-size: 18px;
    }
    .stat-label {
      font-size: 10px;
    }
  }

  .transaction-card-modern {
    .product-name {
      font-size: 14px;
    }
    .location-name {
      max-width: 60px;
    }
  }
}
</style>
