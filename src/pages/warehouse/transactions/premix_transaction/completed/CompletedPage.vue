<template>
  <div class="spinner-wrapper" v-if="loading">
    <q-spinner-dots size="50px" color="primary" />
  </div>
  <div v-else>
    <div v-if="completedPremixData.length === 0" class="data-error">
      <q-icon name="warning" color="warning" size="4em" />
      <div class="q-ml-sm text-h6">No data available</div>
    </div>
    <q-scroll-area v-else style="height: 450px; max-width: 1500px">
      <div class="q-gutter-md q-ma-md">
        <q-card
          v-for="(completed, index) in completedPremixData"
          :key="index"
          @click="handleDialog(completed)"
        >
          <q-card-section class="q-gutter-sm">
            <div class="row justify-between">
              <div class="text-h6">
                {{ completed.name }}
              </div>
              <div>
                <q-badge color="dark" outlined>
                  {{ completed.status }}
                </q-badge>
              </div>
            </div>
            <div class="row justify-between">
              <div class="text-subtitle1">
                {{ formatTimestamp(completed.created_at) }}
              </div>
              <div class="text-subtitle1">
                {{ completed.branch_premix.branch_recipe.branch.name }} -
                {{ formatFullname(completed.employee) }}
              </div>
              <div class="row q-gutter-x-md">
                <div class="text-subtitle1">Completed By:</div>
                <div class="text-overline text-weight-bold">
                  {{ formatFullname(completed.history[0].employee) }}
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
import { computed, onMounted, ref } from "vue";
import TransactionView from "./TransactionView.vue";

const warehouseStore = useWarehousesStore();
const userData = computed(() => warehouseStore.user);
const warehouseId = userData.value.device.reference_id;
console.log("warehouseId", warehouseId);
const premixStore = usePremixStore();
const completedPremixData = computed(() => premixStore.completedPremixData);
console.log("completedPremixData", completedPremixData.value);
const status = ref("completed");
const loading = ref(true);
const showNoDataMessage = ref(false);
const $q = useQuasar();

onMounted(async () => {
  if (warehouseId) {
    await fetchCompletedPremix(warehouseId);
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

const fetchCompletedPremix = async () => {
  try {
    loading.value = true;
    await premixStore.fetchCompletedPremix(warehouseId, status.value);
    if (!completedPremixData.value.length) {
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
