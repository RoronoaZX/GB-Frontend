<template>
  <div>
    <q-input
      outlined
      dense
      placeholder="Search delivery"
      class="q-mb-sm"
      bg-color="grey-1"
      input-class="text-grey-8"
      label-color="grey-6"
      v-model="searchQuery"
      @update:model-value="onSearch"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
  <div v-if="loading" class="spinner-wrapper">
    <q-spinner-dots size="50px" color="primary" />
  </div>

  <div v-else class="q-mt-xl">
    <!-- 🔹 When there are no results -->
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
      <div class="text-body1 text-grey-6 q-mt-xs">
        {{ searchQuery ? "Try another search term." : "Check again later." }}
      </div>
    </div>

    <!-- 🔹 When there are results -->
    <q-scroll-area v-else style="height: 450px; max-width: 1500px">
      <div class="q-gutter-md q-ma-md">
        <q-card
          v-for="(confirm, index) in stockDelivery.data"
          :key="index"
          @click="handleDialog(confirm)"
          class="confirmed-card elegant-card emphasized-card"
        >
          <q-card-section class="q-gutter-sm enhanced-card-section">
            <div class="row items-start justify-between">
              <div class="col-8 column q-gutter-y-xs">
                <div class="text-body1 text-weight-bold text-primary-dark">
                  From:
                  {{ capitalize(confirm.from_name) || "-" }}
                </div>
                <div class="text-caption text-grey-6 text-weight-medium">
                  {{ formatTimeStamp(confirm.created_at) || "-" }}
                </div>
              </div>

              <div class="col-4 column items-end q-gutter-y-xs">
                <div>
                  <q-badge
                    color="positive"
                    class="text-weight-bold q-px-md q-py-sm confirmed-badge"
                  >
                    CONFIRMED
                  </q-badge>
                </div>

                <div class="text-body2 text-weight-bold text-grey-8 q-pt-sm">
                  {{ confirm.items.length || "-" }} items
                </div>
              </div>
            </div>

            <q-separator class="q-my-md divider-elegant" />

            <div class="row justify-between items-end">
              <div class="column q-gutter-y-xs">
                <div class="text-caption text-grey-7">Confirmed By:</div>
                <div class="text-body2 text-weight-semibold text-grey-9">
                  {{ formatFullname(confirm.approved_by) || "-" }}
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-scroll-area>
  </div>
  <div v-if="pagination.last_page > 1" class="q-pt-md flex flex-center">
    <q-pagination
      v-model="pagination.current_page"
      :max="pagination.last_page"
      :max-pages="3"
      boundary-links
      direction-links
      icon-first="skip_previous"
      icon-last="skip_next"
      icon-prev="fast_rewind"
      icon-next="fast_forward"
      @click="onPageChange"
    />
  </div>
</template>

<script setup>
import { date as quasarDate, useQuasar } from "quasar";
import { useStockDelivery } from "src/stores/stock-delivery";
import { useWarehousesStore } from "src/stores/warehouse";
import { computed, onMounted, ref } from "vue";
import TransactionView from "./TransactionView.vue";

const warehouseStore = useWarehousesStore();
const userData = computed(() => warehouseStore.user);
console.log("userdata", userData.value);
const stocksDeliveryStore = useStockDelivery();
const stockDelivery = computed(() => stocksDeliveryStore.confirmStocks);

const warehouseId = userData.value.device.reference_id;
console.log("warehouseId", warehouseId);
const status = ref("confirmed");
const to_designation = ref("Warehouse");
const loading = ref(true);
const showNoDataMessage = ref(false);
const $q = useQuasar();

const selectedDelivery = ref(null);
const searchQuery = ref();

let searchTimeout = null;

const pagination = computed(() => {
  return (
    stocksDeliveryStore.confirmStocks?.pagination || {
      current_page: 1,
      last_page: 1,
      per_page: 3,
    }
  );
});

const capitalize = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`;
};

const formatTimeStamp = (val) => {
  return quasarDate.formatDate(val, "MMM DD, YYYY || hh:mm A");
};

const fetchConfirmStocksDelivery = async () => {
  try {
    loading.value = true;
    await stocksDeliveryStore.fetchConfirmedDeliveryReports(
      warehouseId,
      status.value,
      to_designation.value,
      pagination.value.current_page,
      pagination.value.per_page,
      searchQuery.value
    );
    if (!stockDelivery.value.length) {
      showNoDataMessage.value = true;
    }
    console.log("stockDeliverysss", stockDelivery.value);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  if (warehouseId) {
    await fetchConfirmStocksDelivery(
      warehouseId,
      status.value,
      to_designation.value,
      pagination.value.current_page
    );
  }
});

const onPageChange = async () => {
  fetchConfirmStocksDelivery(
    warehouseId,
    status.value,
    to_designation.value,
    pagination.value.current_page
  );
};

const onSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    fetchConfirmStocksDelivery(1);
  }, 500);
};

const handleDialog = (data) => {
  $q.dialog({
    component: TransactionView,
    componentProps: {
      report: data,
    },
  });
};
</script>

<style lang="scss" scoped>
$primary-dark: #2c3e50;
$accent-green: #21ba45;
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
  padding: 60px 20px;
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
  background: linear-gradient(180deg, #ffffff, #c1ffc7);
}

.enhanced-card-section {
  padding: 14px; /* ⬇️ Reduced from 18px */
}

// 🏷️ Text Styles (Reduced Font Sizes)
.text-primary-dark {
  color: $primary-dark;
  font-size: 0.85rem; /* ⬇️ Reduced from 0.9rem */
  font-weight: 600;
}

.text-caption {
  font-size: 0.7rem; /* ⬇️ Reduced from 0.75rem */
  color: $text-muted;
}

.text-body2 {
  font-size: 0.75rem; /* ⬇️ Reduced from 0.8rem */
  color: $text-dark;
}

// ❌ Confirmed Badge
.confirmed-badge {
  border-radius: 16px;
  font-size: 0.7rem;
  padding: 1px 8px; /* ⬇️ Reduced padding slightly */
  background-color: $accent-green !important;
  color: white;
  letter-spacing: 0.6px;
  box-shadow: 0 2px 5px rgba($accent-green, 0.4);
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
  margin: 8px 0; /* ⬇️ Reduced from 10px 0 */
}

// 🔍 Search Input (Reduced Text Size)
.search-input-elegant {
  border-radius: 8px;
  overflow: hidden;
  font-size: 0.85rem;

  .q-field__control {
    background-color: white !important;
    border: 1px solid $border-grey;
    height: 40px;
    transition: border-color 0.2s ease-in-out;

    &:focus-within {
      border-color: $primary-dark;
      box-shadow: 0 0 5px rgba($primary-dark, 0.2);
    }
  }

  .q-field__prepend,
  .q-field__append {
    padding: 0 10px;
  }

  input.q-field__native {
    font-size: 0.75rem; /* ⬇️ Reduced from 0.8rem */
    padding-left: 5px;
  }
}

// 🔢 Pagination (No change, sizes are already compact)
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

.data-error {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
