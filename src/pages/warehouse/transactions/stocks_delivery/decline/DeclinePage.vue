<template>
  <div>
    <q-input
      outlined
      dense
      placeholder="Search delivery"
      class="q-mb-md search-input-elegant"
      bg-color="grey-1"
      input-class="text-grey-8"
      label-color="grey-6"
      v-model="searchQuery"
      @update:model-value="onSearch"
    >
      <template v-slot:prepend>
        <q-icon name="search" color="grey-6" />
      </template>
    </q-input>
  </div>
  <div class="spinner-wrapper" v-if="loading">
    <q-spinner-dots size="50px" color="primary" />
  </div>
  <div class="q-mt-xl" v-else>
    <div
      v-if="stockDelivery.data.length === 0"
      class="column items-center justify-center text-center q-pa-lg no-data-message"
    >
      <q-icon name="search_off" size="60px" color="grey-5" />
      <div class="text-h6 text-grey-7 q-mt-md">
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
      <div class="q-gutter-md q-pb-md">
        <q-card
          v-for="(declined, index) in stockDelivery.data"
          :key="index"
          @click="handleDialog(declined)"
          class="declined-card elegant-card emphasized-card"
        >
          <q-card-section class="q-pa-lg enhanced-card-section">
            <div class="row items-start justify-between">
              <div class="col-8 column q-gutter-y-xs">
                <div class="text-body1 text-weight-bold text-primary-dark">
                  From: {{ capitalize(declined.from_name) }}
                </div>

                <div class="text-caption text-grey-6 text-weight-medium">
                  {{ formatTimeStamp(declined.created_at) }}
                </div>
              </div>

              <div class="col-4 column items-end q-gutter-y-xs">
                <div>
                  <q-badge
                    color="negative"
                    class="text-weight-bold q-px-md q-py-sm declined-badge"
                  >
                    DECLINED
                  </q-badge>
                </div>

                <div class="text-body2 text-weight-bold text-grey-8 q-pt-sm">
                  {{ declined.items.length }} items
                </div>
              </div>
            </div>

            <q-separator class="q-my-md divider-elegant" />

            <div class="row justify-between items-end">
              <div class="column q-gutter-y-xs">
                <div class="text-caption text-grey-7">Declined By:</div>
                <div class="text-body2 text-weight-semibold text-grey-9">
                  {{ formatFullname(declined.approved_by) }}
                </div>
              </div>

              <div class="col-5 column">
                <div class="text-caption text-grey-7">Remark:</div>
                <div class="text-body2 text-grey-8 remarks-text">
                  {{ declined.remarks || "— No remark provided —" }}
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-scroll-area>
  </div>
  <div v-if="pagination.last_page > 1" class="q-pt-lg flex flex-center">
    <q-pagination
      v-model="pagination.current_page"
      :max="pagination.last_page"
      :max-pages="5"
      boundary-links
      direction-links
      icon-first="first_page"
      icon-last="last_page"
      icon-prev="chevron_left"
      icon-next="chevron_right"
      color="primary"
      active-color="white"
      active-text-color="primary"
      class="elegant-pagination"
      @update:model-value="onPageChange"
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
const stockDelivery = computed(() => stocksDeliveryStore.declinedStocks);

const warehouseId = userData.value.device.reference_id;
console.log("warehouseId", warehouseId);
const status = ref("declined");
const to_designation = ref("Warehouse");
const loading = ref(true);
const showNoDataMessage = ref(false);
const $q = useQuasar();

const searchQuery = ref();

let searchTimeout = null;

const pagination = computed(() => {
  return (
    stocksDeliveryStore.declinedStocks?.pagination || {
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

const fetchDeclinedStocks = async (page = 1) => {
  try {
    loading.value = true;

    await stocksDeliveryStore.fetchDeclinedDeliveryReports(
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
    console.log("stockDeliveryDeclinedsss", stockDelivery.value);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  if (warehouseId) {
    await fetchDeclinedStocks(
      warehouseId,
      status.value,
      to_designation.value,
      pagination.value.current_page
    );
  }
});

const onPageChange = async () => {
  fetchDeclinedStocks(
    warehouseId,
    status.value,
    to_designation.value,
    pagination.value.current_page
  );
};

const onSearch = async () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    fetchDeclinedStocks(1);
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
$accent-red: #e74c3c;
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
  background: linear-gradient(180deg, #ffffff, #ffc7c7);
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

// ❌ Declined Badge
.declined-badge {
  border-radius: 16px;
  font-size: 0.7rem;
  padding: 1px 8px; /* ⬇️ Reduced padding slightly */
  background-color: $accent-red !important;
  color: white;
  letter-spacing: 0.6px;
  box-shadow: 0 2px 5px rgba($accent-red, 0.4);
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
// .search-input-elegant {
//   border-radius: 8px;
//   overflow: hidden;
//   font-size: 0.85rem;

//   .q-field__control {
//     background-color: white !important;
//     border: 1px solid $border-grey;
//     height: 40px;
//     transition: border-color 0.2s ease-in-out;

//     &:focus-within {
//       border-color: $primary-dark;
//       box-shadow: 0 0 5px rgba($primary-dark, 0.2);
//     }
//   }

//   .q-field__prepend,
//   .q-field__append {
//     padding: 0 10px;
//   }

//   input.q-field__native {
//     font-size: 0.75rem; /* ⬇️ Reduced from 0.8rem */
//     padding-left: 5px;
//   }
// }

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
