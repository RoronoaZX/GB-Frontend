<template>
  <div class="spinner-wrapper" v-if="loading">
    <q-spinner-dots size="50px" color="primary" />
  </div>
  <div v-else>
    <div v-if="premix.length === 0" class="data-error">
      <q-icon name="warning" color="warning" size="4em" />
      <div class="q-ml-sm text-h6">No data available</div>
    </div>
    <q-scroll-area v-else style="height: 450px; max-width: 1500px">
      <div class="q-gutter-md q-ma-md">
        <q-card
          v-for="(pending, index) in premix"
          :key="index"
          @click="handleDialog(pending)"
        >
          <q-card-section class="q-gutter-sm">
            <div class="text-h6">
              {{ pending.name }}
            </div>
            <div class="row justify-between">
              <div class="text-subtitle1">
                {{ formatTimestamp(pending.created_at) }}
              </div>
              <div class="text-subtitle1">
                {{ pending.branch_premix.branch_recipe.branch.name }} -
                {{ formatFullname(pending.employee) }}
              </div>

              <div>
                <q-badge color="warning" outlined> Pending </q-badge>
              </div>
              <!-- <div>
                <TransactionView :report="pending" />
              </div> -->
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
console.log("userdata", userData.value);
const premixStore = usePremixStore();
const premix = computed(() => premixStore.pendingPremixData);

const warehouseId = userData.value.device.reference_id;
console.log("warehouseId", warehouseId);
const status = ref("pending");
const loading = ref(true);
const showNoDataMessage = ref(false);
const $q = useQuasar();
onMounted(async () => {
  if (warehouseId) {
    await fetchPendingPremix(warehouseId);
  }
});

const formatDate = (dateString) => {
  return quasarDate.formatDate(dateString, "MMMM D, YYYY");
};

const formatTime = (timeString) => {
  return quasarDate.formatDate(timeString, "hh:mm A");
};
const formatTimestamp = (val) => {
  return quasarDate.formatDate(val, "MMM DD, YYYY || hh:mm A");
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

const fetchPendingPremix = async () => {
  try {
    loading.value = true;
    await premixStore.fetchPendingPremix(warehouseId, status.value);
    if (!premix.value.length) {
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
