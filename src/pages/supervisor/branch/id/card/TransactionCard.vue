<template>
  <div class="mobile-transactions q-pa-md">
    <!-- Search -->
    <q-input
      v-model="filter"
      outlined
      rounded
      dense
      debounce="400"
      placeholder="Search product, staff, destination..."
      bg-color="white"
      class="search-input q-mb-md"
    >
      <template v-slot:prepend>
        <q-icon name="search" color="grey-6" />
      </template>
      <template v-slot:append v-if="filter">
        <q-icon
          name="close"
          color="grey-6"
          class="cursor-pointer"
          @click="clearFilter"
        />
      </template>
    </q-input>

    <q-scroll-area ref="scrollArea" class="col" :thumb-style="thumbStyle">
      <q-pull-to-refresh @refresh="onPullRefresh" class="full-height">
        <q-infinite-scrol
          reverse
          @load="onLoadMoreOlder"
          :offset="400"
          :disable="loading || !hasOlder"
        >
          <!-- Loading spinner at top (older items) -->
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots size="32px" color="primary" />
            </div>
          </template>

          <!-- Your transaction cards - newest at bottom -->
          <div
            v-if="rows.length === 0 && !loading"
            class="flex flex-center q-pa-xl"
          >
            <!-- empty state -->
            <div class="text-center text-grey-7">
              <q-icon name="inbox" size="48px" class="q-mb-sm" />
              <div>No transactions found</div>
              <div class="text-caption text-grey-6">
                Try adjusting your search
              </div>
            </div>
          </div>

          <q-card
            v-for="item in rows"
            :key="item.id || item.created_at"
            flat
            bordered
            class="transaction-card q-mb-md"
          >
            <q-card-section class="q-pa-md">
              <div class="row items-start justify-between q-mb-sm">
                <div
                  class="text-subtitle1 text-weight-bold ellipsis"
                  style="max-width: 65%"
                >
                  {{
                    capitalizeFirstLetter(
                      item.product?.name || "Unknown Product"
                    )
                  }}
                </div>

                <q-badge
                  :color="getStatusColor(item.status)"
                  text-color="white"
                  rounded
                  class="q-px-sm text-caption"
                >
                  {{ item.status?.toUpperCase() || "UNKNOWN" }}
                </q-badge>
              </div>

              <!-- Action Badge -->
              <q-badge
                outline
                :color="getProcedureColor(item.action)"
                class="q-mb-sm"
              >
                <q-icon
                  :name="
                    item.action?.toLowerCase() === 'send' ? 'south' : 'north'
                  "
                  size="xs"
                  class="q-mr-xs"
                />
                {{ item.action?.toUpperCase() || "UNKNOWN" }}
              </q-badge>

              <!-- Grid -->
              <div class="details-grid">
                <div class="detail-item">
                  <div class="detail-label">
                    <q-icon name="schedule" size="xs" class="q-mr-xs" />
                    When
                  </div>
                  <div class="detail-value">
                    {{ formatDate(item.created_at) }} •
                    {{ formatTime(item.created_at) }}
                  </div>
                </div>

                <div class="detail-item">
                  <div class="detail-label">
                    <q-icon name="person" size="xs" class="q-mr-xs" />
                    Staff
                  </div>
                  <div class="detail-value ellipsis">
                    {{ formatFullname(item.employee) || "—" }}
                  </div>
                </div>

                <div class="detail-item">
                  <div class="detail-label">
                    <q-icon name="login" size="xs" class="q-mr-xs" />
                    From
                  </div>
                  <div class="detail-value ellipsis">
                    {{ item.from_branch?.name || "—" }}
                  </div>
                </div>

                <div class="detail-item">
                  <div class="detail-label">
                    <q-icon name="logout" size="xs" class="q-mr-xs" />
                    To
                  </div>
                  <div class="detail-value ellipsis">
                    {{ item.to_branch?.name || "—" }}
                  </div>
                </div>
              </div>
            </q-card-section>

            <q-separator spaced />

            <q-card-actions align="right" class="q-pa-sm">
              <q-btn
                flat
                dense
                color="primary"
                icon-right="chevron_right"
                label="Details"
                @click="viewDetails(item)"
              />
            </q-card-actions>
          </q-card>

          <div
            v-if="!hasOlder && rows.length > 0"
            class="text-center text-caption text-grey-6 q-my-md"
          >
            — Beginning of history —
          </div>
        </q-infinite-scrol>
      </q-pull-to-refresh>
    </q-scroll-area>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { typographyFormat } from "src/composables/typography/typography-format";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useBranchProductsStore } from "src/stores/branch-product";
import TransactionViewDetails from "../dialog/TransactionsViewDetails.vue";

const { formatDate, formatTime, formatFullname, capitalizeFirstLetter } =
  typographyFormat();
const $q = useQuasar();
const route = useRoute();
const branchId = route.params.branch_id;

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
});

const filter = ref("");
const rows = ref([]);
const loading = ref(false);
const loadingMore = ref(false);
const hasMore = ref(true);
const page = ref(1);
const rowsPerPage = ref(15);

const branchProductsStore = useBranchProductsStore();

const virtualScroll = ref(null);

const loadTransactions = async (reset = false) => {
  if (!branchId) return;

  if (reset) {
    page.value = 1;
    rows.value = [];
    hasMore.value = true;
  }

  if (loading.value || loadingMore.value || !hasMore.value) return;

  const isInitial = page.value === 1 && rows.value.length === 0;

  if (isInitial) loading.value = true;
  else loadingMore.value = true;

  try {
    await branchProductsStore.fetchSendAddedBranchProducts(
      props.category,
      branchId,
      page.value,
      rowsPerPage.value,
      filter.value.trim()
    );

    const { data, current_page, last_page } =
      branchProductsStore.branchSendAddedProd;

    if (reset) {
      rows.value = data;
    } else {
      rows.value = [...rows.value, ...data];
    }

    hasMore.value = current_page < last_page;
    page.value = current_page + 1;
  } catch (error) {
    console.error(err);
    $q.notify({
      type: "negative",
      message: "Failed to load transaction",
    });
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
};

const onVirtualScroll = ({ to }) => {
  if (to >= rows.value.length - 8 && hasMore.value && !loadingMore.value) {
    loadTransactions();
  }
};

const clearFilter = () => {
  filter.value = "";
};

watch(filter, () => {
  loadTransactions(true);
});

onMounted(() => {
  loadTransactions(true);
});

const getStatusColor = (status) => {
  const s = (status || "").toLowerCase();
  if (s.includes("pending")) return "orange-7";
  if (s.includes("confirmed") || s.includes("approved")) return "positive";
  if (s.includes("declined") || s.includes("reject")) return "negative";

  return "grey-7";
};

const getProcedureColor = (action) => {
  const a = (action || "").toLowerCase();
  if (a === "send") return "indigo-6";
  if (a === "add") return "teal-6";

  return "grey-6";
};

const viewDetails = (item) => {
  $q.dialog({
    component: TransactionViewDetails,
    componentProps: {
      productDetails: item,
      category: props.category,
      branchId: branchId,
    },
  });
};
</script>

<style lang="scss" scoped>
.mobile-transactions {
  min-height: 100vh;
  background: #f8fafc;
}

.q-scrollarea {
  .q-scrollarea__thumb {
    transition: opacity 0.3s;
  }
}

.search-input {
  :deep(.q-field__control) {
    border-radius: 12px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  }
}

.transaction-list {
  .virtual-scroll {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
  }
}

.transaction-card {
  border-radius: 16px;
  margin-bottom: 12px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.18s ease;

  &:active {
    transform: translateY(1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 8px;
  font-size: 0.9rem;

  .detail-label {
    color: #64748b;
    font-size: 0.78rem;
    display: flex;
    align-items: center;
    margin-bottom: 2px;
  }

  .detail-value {
    font-weight: 500;
    color: #1e293b;
  }
}

.empty-state {
  min-height: 60vh;
}

@media (max-width: 460px) {
  .details-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>
