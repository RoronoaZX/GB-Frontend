<template>
  <div class="spinner-wrapper" v-if="loading">
    <q-spinner-dots size="50px" color="primary" />
  </div>
  <div class="q-mt-xl" v-else>
    <div
      v-if="stockDelivery.data.length === 0"
      class="column items-center justify-center text-center q-pa-lg no-data-message"
    >
      <q-icon name="search_off" size="60px" color="grey-6" />
      <div class="text-h6 text-grey-7 q-mt-sm">
        {{
          searchQuery
            ? "No deliveries found for your search."
            : "No deliveries available."
        }}
      </div>
      <div class="text-body1 text-grey-6 q-mt-sm">
        {{ searchQuery ? "Try another search term." : "Check again later." }}
      </div>
    </div>
    <q-scroll-area v-else style="height: 450px; max-width: 1500px">
      <div class="q-gutter-md q-ma-md">
        <q-card
          v-for="(pending, index) in stockDelivery.data"
          :key="index"
          @click="handleDialog(pending, index)"
          class="pending-card elegant-card emphasized-card"
        >
          <q-card-section class="q-pa-lg enhanced-card-section">
            <div class="row items-start justify-between">
              <div class="col-8 column q-gutter-y-xs">
                <div class="text-body1 text-weight-bold text-primary-dark">
                  From: {{ capitalizeFirstLetter(pending.from_name) || "-" }}
                </div>
                <div class="text-caption text-grey-6 text-weight-meduim">
                  {{ formatTimeStamp(pending.created_at) || "-" }}
                </div>
              </div>

              <div class="col-4 column items-end q-gutter-y-xs">
                <div>
                  <q-badge
                    color="warning"
                    class="text-weight-bold q-px-md q-py-sm pending-badge"
                  >
                    PENDING
                  </q-badge>
                </div>
                <div class="text-body2 text-weight-bold text-grey-8 q-pt-sm">
                  {{ pending.items.length || "-" }} items
                </div>
              </div>
            </div>

            <q-separator class="q-my-md divider-elegant" />

            <div class="row justify-between items-end">
              <div class="column q-gutter-y-xs">
                <div class="text-caption text-grey-7">Created By:</div>
                <div class="text-body2 text-weight-semibold text-grey-9">
                  {{ formatFullname(pending.employee) || "-" }}
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup>
import { date as quasarDate, useQuasar } from "quasar";
import { useWarehousesStore } from "src/stores/warehouse";
import { useStockDelivery } from "src/stores/stock-delivery";
import { computed, onMounted, ref } from "vue";
import TransactionView from "./TransactionView.vue";
import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatFullname } = typographyFormat();

const warehouseStore = useWarehousesStore();
const userData = computed(() => warehouseStore.user);
console.log("userdata", userData.value);
const stocksDeliveryStore = useStockDelivery();
const stockDelivery = computed(() => stocksDeliveryStore.pendingStocks);

const warehouseId = userData.value.device.reference_id;
console.log("warehouseId", warehouseId);
const status = ref("pending");
const to_designation = ref("Warehouse");
const loading = ref(true);
const showNoDataMessage = ref(false);
const $q = useQuasar();

const formatTimeStamp = (val) => {
  return quasarDate.formatDate(val, "MMM DD, YYYY || hh:mm A");
};

const fetchPendingStocksDelivery = async () => {
  try {
    loading.value = true;
    await stocksDeliveryStore.fetchPendingDeliveryReports(
      warehouseId,
      status.value,
      to_designation.value
    );
    if (!stockDelivery.value.length) {
      showNoDataMessage.value = true;
    }
    console.log("stockDelivery", stockDelivery.value);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  if (warehouseId) {
    await fetchPendingStocksDelivery(warehouseId, status.value, to_designation);
  }
});

const handleDialog = (data, index) => {
  $q.dialog({
    component: TransactionView,
    componentProps: {
      report: data,
    },
  }).onOk((res) => {
    // ✅ if child returns { action: 'declined' }
    console.log("response from child:", res);
    if (res?.action === "declined" || res?.action === "confirmed") {
      const list = stocksDeliveryStore.pendingStocks?.data;
      if (Array.isArray(list)) {
        const idx = list.findIndex((item) => item.id === data.id);
        if (idx !== -1) {
          list.splice(idx, 1);
        }
      }
    }
  });
};
</script>

<style lang="scss" scoped>
$primary-dark: #2c3e50;
$accent-yellow: #eccc16;
$light-grey-bg: #f9fafb;
$border-grey: #6d6363;
$text-dark: #37474f;
$text-muted: #90a4ae;

// 🌀 Spinner Center (No change)
.spinner-wrapper {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

// 📭 No Data Message (Small changes to align text size)
.no-data-message {
  // padding: 60px 20px;

  color: $text-muted;

  .q-icon {
    color: $border-grey;
    opacity: 0.8;
  }

  .text-h6 {
    font-size: 1rem;
    color: $text-dark;
    font-weight: 600;
  }

  .text-body1 {
    font-size: 0.8rem; /* Adjusted for consistency */
    color: $text-muted;
  }
}

// 💳 Card Styling (Added Font Family, Reduced Base Size)
.elegant-card {
  border-radius: 10px;
  background: white;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  font-family: "Inter", sans-serif; /* 🚀 New Font Family */
  font-size: 0.8rem; /* ⬇️ Reduced from 0.85rem */

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 22px rgba(0, 0, 0, 0.12);
  }
}

.emphasized-card {
  border: 1px solid rgba(0, 0, 0, 0.04);
  background: linear-gradient(180deg, #ffffff, #e8e6b7);
}

.enhanced-card-section {
  padding: 14px; /* ⬇️ Reduced from 18px */
}

// 🏷️ Text Styles (Reduced Font Sizes)
.text-primary-dark {
  color: $primary-dark;
  font-size: 0.85rem; /* ⬇️ Reduced from 0.9rem  */
  font-weight: 600;
}

.text-caption {
  font-size: 0.7rem; /* ⬇️ Reduced from 0.8rem */
  color: $text-muted;
}

.text-body2 {
  font-size: 0.75rem; /* ⬇️ Reduced from 0.8rem */
  color: $text-dark;
}

// ❌ Pending Badge
.pending-badge {
  border-radius: 16px;
  font-size: 0.7rem;
  padding: 1px 8px; /* ⬇️ Reduced padding slightly */
  background-color: $accent-yellow !important;
  color: white;
  letter-spacing: 0.6px;
  box-shadow: 0 2px 5px rgba($accent-yellow, 0.4);
}

// 📝 Remarks Text
.remarks-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.7rem; /* ⬇️ Reduced from 0.75rem */
  color: $text-muted;
  max-width: 100%;
}

// ➖ Divider
.divider-elegant {
  background-color: $border-grey;
  height: 1px;
  opacity: 0.6;
  margin: 8px 0; /* ⬇️ Reduced margin */
}

// 🔢 Psagination (No change, sizes are already compact)
.elegant-pagination {
  .q-btn {
    border-radius: 6px;
    margin: 0 3px;
    min-width: 34px;
    height: 34px;
    font-size: 0.75rem;
    font-weight: 500;
    transition: all 0.15s ease-in-out;
  }

  .q-btn--active {
    background-color: var(--q-primary) !important;
    color: white !important;
    box-shadow: 0 3px 10px rgba(var(--q-primary-rgb), 0.3);
  }

  .q-btn:not(.q-btn--active) {
    color: $primary-dark;
    background-color: $light-grey-bg;
    border: 1px solid $border-grey;

    &:hover {
      background-color: white;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    }
  }
}
</style>
