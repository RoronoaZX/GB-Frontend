<template>
  <div class="spinner-wrapper" v-if="loading">
    <q-spinner-dots size="50px" color="primary" />
  </div>
  <div v-else>
    <div
      v-if="toDeliverPremixData.length === 0"
      class="column items-center text-center q-pa-lg no-data-message"
    >
      <q-icon name="search_off" size="60px" color="grey-5" />
      <div class="text-h6 text-grey-7 q-mt-md">
        {{ "No Premixes available." }}
      </div>
      <div class="text-body1 text-grey-6 q-mt-sm">
        {{ "Check again later." }}
      </div>
    </div>
    <q-scroll-area v-else style="height: 450px; max-width: 1500px">
      <div class="q-gutter-md q-ma-md">
        <q-card
          v-for="(toDeliver, index) in toDeliverPremixData"
          :key="index"
          @click="handleDialog(toDeliver)"
          class="elegant-card emphasized-card"
        >
          <q-card-section class="q-pa-lg enhanced-card-section">
            <div class="row items-start justify-between">
              <div class="col-8 column q-gutter-y-xs">
                <div class="text-body1 text-weight-bold text-primary-dark">
                  Premix: {{ capitalize(toDeliver.name) || "-" }}
                </div>
                <div class="text-caption text-grey-6 text-weight-dark">
                  {{ formatTimestamp(toDeliver.created_at) || "-" }}
                </div>
              </div>

              <div class="col-4 column items-end q-gutter-y-xs">
                <div>
                  <q-badge
                    class="text-weight-bold q-px-md q-py-sm to-deliver-badge text-uppercase"
                  >
                    {{ toDeliver.status }}
                  </q-badge>
                </div>
                <div class="text-body2 text-weight-bold text-grey-8 q-pt-sm">
                  {{ toDeliver.branch_premix.branch_recipe.branch.name || "-" }}
                </div>
              </div>
            </div>

            <q-separator class="q-my-md divider-elegant" />

            <div class="row items-end justify-between">
              <div class="column q-gutter-y-xs">
                <div class="text-caption text-grey-7">Baker:</div>
                <div class="text-body2 text-weight-semibold text-grey-9">
                  {{ formatFullname(toDeliver.employee) }}
                </div>
              </div>
              <div class="col-5 column">
                <div class="text-caption text-grey-7">To Deliver By:</div>
                <div class="text-body2 text-weight-semibold text-grey-9">
                  {{ formatFullname(toDeliver.history[0].employee) }}
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
import { useWarehousesStore } from "src/stores/warehouse";
import { usePremixStore } from "src/stores/premix";
import { date as quasarDate, useQuasar } from "quasar";
import { capitalize, computed, onMounted, ref } from "vue";
import TransactionView from "./TransactionView.vue";

const warehouseStore = useWarehousesStore();
const userData = computed(() => warehouseStore.user);
const warehouseId = userData.value.device.reference_id;
console.log("warehouseIssd", warehouseId);
const premixStore = usePremixStore();
const toDeliverPremixData = computed(() => premixStore.toDeliverPremixData);
console.log("toDeliverPremixData", toDeliverPremixData.value);
const status = ref("to deliver");
const loading = ref(true);
const showNoDataMessage = ref(false);
const $q = useQuasar();

onMounted(async () => {
  if (warehouseId) {
    await fetchToDeliverPremix(warehouseId);
  }
});

const formatDate = (dateString) => {
  return quasarDate.formatDate(dateString, "MMMM D, YYYY");
};

const formatTime = (timeString) => {
  return quasarDate.formatDate(timeString, "hh:mm A");
};

const formatTimestamp = (timeString) => {
  return quasarDate.formatDate(timeString, "MMM DD, YYYY || hh:mm A");
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

const fetchToDeliverPremix = async () => {
  try {
    loading.value = true;
    await premixStore.fetchToDeliverPremix(warehouseId, status.value);
    if (!toDeliverPremixData.value.length) {
      showNoDataMessage.value = true;
    }
  } catch (error) {
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
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
$accent-brown: #795548;
$light-grey-bg: #f9fafb;
$border-grey: #6d6363;
$text-dark: #37474f;
$text-muted: #90a4ae;

// 🌀 Spinner Center (No change)
.spinner-wrapper {
  min-height: 40vh; /* Minimum height of 50% viewport height */
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
  background: linear-gradient(180deg, #ffffff, #bda49b);
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

// ❌ Completed Badge
.to-deliver-badge {
  border-radius: 16px;
  font-size: 0.7rem;
  padding: 1px 8px; /* ⬇️ Reduced padding slightly */
  background-color: $accent-brown !important;
  color: white;
  letter-spacing: 0.6px;
  box-shadow: 0 2px 5px rgba($accent-brown, 0.4);
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

.data-error {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
