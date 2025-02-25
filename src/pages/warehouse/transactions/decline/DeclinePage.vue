<template>
  <div class="spinner-wrapper" v-if="loading">
    <q-spinner-dots size="50px" color="primary" />
  </div>
  <div v-else>
    <div v-if="declinedPremixData.length === 0" class="data-error">
      <q-icon name="warning" color="warning" size="4em" />
      <div class="q-ml-sm text-h6">No data available</div>
    </div>
    <q-scroll-area v-else style="height: 450px; max-width: 1500px">
      <div class="q-gutter-md q-ma-md">
        <q-card v-for="(decline, index) in declinedPremixData" :key="index">
          <q-card-section class="q-gutter-sm">
            <div class="row justify-between">
              <div class="text-h6">
                {{ decline.name }}
              </div>
              <div class="row q-gutter-x-md">
                <div class="text-subtitle1">Declined By:</div>
                <div class="text-overline text-weight-bold">
                  {{ formatFullname(decline.history[0].employee) }}
                </div>
              </div>
            </div>
            <div class="row justify-between">
              <div class="text-subtitle1">
                {{ formatDate(decline.created_at) }}
              </div>
              <div class="text-subtitle1">
                {{ formatTime(decline.created_at) }}
              </div>
              <div class="text-subtitle1">
                {{ decline.branch_premix.branch_recipe.branch.name }} -
                {{ formatFullname(decline.employee) }}
              </div>

              <div>
                <q-badge color="red-6" outlined>
                  {{ decline.status }}
                </q-badge>
              </div>
              <div>
                <TransactionView :report="decline" />
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
import { date as quasarDate } from "quasar";
import { computed, onMounted, ref } from "vue";
import TransactionView from "./TransactionView.vue";

const warehouseStore = useWarehousesStore();
const userData = computed(() => warehouseStore.user);
const warehouseId = userData.value.device.reference_id;
console.log("warehouseId", warehouseId);
const premixStore = usePremixStore();
const declinedPremixData = computed(() => premixStore.declinePremixData);
console.log("declinedPremixData", declinedPremixData.value);
const status = ref("declined");
const loading = ref(true);
const showNoDataMessage = ref(false);

onMounted(async () => {
  if (warehouseId) {
    await fetchDeclinedPremix(warehouseId);
  }
});

const formatDate = (dateString) => {
  return quasarDate.formatDate(dateString, "MMMM D, YYYY");
};

const formatTime = (timeString) => {
  return quasarDate.formatDate(timeString, "hh:mm A");
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

const fetchDeclinedPremix = async () => {
  try {
    loading.value = true;
    await premixStore.fetchDeclinePremix(warehouseId, status.value);
    if (!declinedPremixData.value.length) {
      showNoDataMessage.value = true;
    }
  } catch (error) {
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.spinner-wrapper {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}

.data-error {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
