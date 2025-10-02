<template>
  <div class="spinner-wrapper" v-if="loading">
    <q-spinner-dots size="50px" color="primary" />
  </div>
  <div v-else>
    <div v-if="stockDelivery.length === 0" class="data-error">
      <q-icon name="warning" color="warning" size="4em" />
      <div class="q-ml-sm text-h6">No data available</div>
    </div>
    <q-scroll-area v-else style="height: 450px; max-width: 1500px">
      <div class="q-gutter-md q-ma-md">
        <q-card
          v-for="(pending, index) in stockDelivery.data"
          :key="index"
          @click="handleDialog(pending)"
        >
          <q-card-section class="q-gutter-sm">
            <div class="text-h6">From: {{ capitalize(pending.from_name) }}</div>
            <div class="row justify-between">
              <div class="text-subtitle1">
                {{ formatTimeStamp(pending.created_at) }}
              </div>
              <div class="text-subtitle1">{{ pending.items.length }} items</div>
              <div>
                <q-badge color="warning" outlined> Pending </q-badge>
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

const capitalize = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

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
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.data-error {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
