<template>
  <div v-if="loading" class="spinner-wrapper">
    <q-spinner-dots size="50px" color="primary" />
  </div>
  <div v-else>
    <div
      v-if="selectaData.length === 0"
      class="column items-center justify-center text-center q-pa-lg no-data-message"
    >
      <q-icon name="search_off" size="60px" color="grey-6" />
      <div class="text-h6 text-grey-7 q-mt-sm">
        {{ "No Data available." }}
      </div>
      <div class="text-body1 text-grey-6 q-mt-sm">
        {{ "Check again later." }}
      </div>
    </div>
    <q-scroll-area v-else style="height: 450px; max-width: 1500px">
      <div class="q-gutter-md q-ma-md">
        <template v-if="selectaData.length">
          <q-card
            v-for="(pending, index) in selectaData"
            :key="index"
            class="elegant-card emphasized-card"
            @click="handleDialog(pending)"
          >
            <q-card-section class="q-pa-lg enhanced-card-section">
              <div class="row items-start justify-between">
                <div class="col-8 column q-gutter-y-xs">
                  <div class="text-body1 text-weight-bold text-primary-dark">
                    {{ capitalizeFirstLetter(pending.branch.name || "-") }} -
                    {{ formatFullname(pending.employee || "-") }}
                  </div>
                  <div class="text-caption text-grey-6 text-weight-medium">
                    {{ formatTimestamp(pending.created_at || "-") }}
                  </div>
                </div>
                <div class="col-4 column items-end q-gutter-y-xs">
                  <div>
                    <q-badge
                      color="warning"
                      class="text-weight-bold q-px-md q-py-sm pending-badge text-uppercase"
                    >
                      {{ pending.status || "-" }}
                    </q-badge>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </template>
        <template v-else>
          <div class="data-error">
            <q-icon name="warning" color="warning" size="4em" />
            <div class="q-ml-sm text-h6">No data available</div>
          </div>
        </template>
      </div>
    </q-scroll-area>
  </div>
  <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-model="pagination.page"
      color="purple"
      :max="Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)"
      @update:model-value="onPageChange"
      boundary-numbers
    />
  </div>
</template>

<script setup>
import { useSelectaProductsStore } from "src/stores/selecta-product";
import TransactionView from "./TransactionView.vue";
import { useRoute } from "vue-router";
import { date as quasarDate, useQuasar } from "quasar";
import { computed, onMounted, ref } from "vue";

import { typographyFormat } from "src/composables/typography/typography-format";
import { badgeColor } from "src/composables/badge-color/badge-color";

const {
  capitalizeFirstLetter,
  formatDate,
  formatTime,
  formatFullname,
  formatTimestamp,
} = typographyFormat();

const $q = useQuasar();
const route = useRoute();
const selectaProductStore = useSelectaProductsStore();
const selectaProductsPending = computed(
  () => selectaProductStore.pendingSelectaReports
);
const selectaData = ref([]);
const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});
const loading = ref(false);

const branchId = route.params.branch_id;
const category = ref("pending");
const fetchPendingSelectaStocks = async (
  branchId,
  page = 1,
  rowsPerPage = 5
) => {
  try {
    loading.value = true;
    const stocks = await selectaProductStore.fetchPendingSelectaStocks(
      branchId,
      category.value,
      page,
      rowsPerPage
    );
    console.log("selectaProductsPending.value", selectaProductsPending.value);

    const { data, current_page, per_page, total } =
      selectaProductsPending.value;

    selectaData.value = data;
    pagination.value.page = current_page;
    pagination.value.rowsPerPage = per_page;
    pagination.value.rowsNumber = total;
  } catch (error) {
    console.error("Error fetching pending stocks:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  if (branchId) {
    await fetchPendingSelectaStocks(branchId);
  }
});

const onPageChange = (page) => {
  pagination.value.page = page;

  fetchPendingSelectaStocks(branchId, page, pagination.value.rowsPerPage);
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
$accent-yellow: #eccc16;
$light-grey-bg: #f9fafb;
$border-grey: #6d6363;
$text-dark: #37474f;
$text-muted: #90a4ae;

.spinner-wrapper {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.no-data-message {
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
    font-size: 0.8rem;
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

.text-body2 {
  font-size: 0.75rem;
  color: $text-dark;
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
  font-size: 0.7rem; /* ⬇️ Reduced from 0.8rem */
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
