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
      class="column items-center justify-center text-center q-pa-lg"
    >
      <q-icon name="search_off" size="60px" color="grey-6" />
      <div class="text-h6 text-grey-7 q-mt-sm">
        {{
          searchQuery
            ? "No deliveries found for your search."
            : "No deliveries available."
        }}
      </div>
      <div>
        {{ searchQuery ? "Try another search term." : "Check again later." }}
      </div>
    </div>
    <q-scroll-area v-else style="height: 450px; max-width: 1500px">
      <div class="q-gutter-md q-ma-md">
        <q-card
          v-for="(declined, index) in stockDelivery.data"
          :key="index"
          @click="handleDialog(declined)"
        >
          <q-card-section class="q-gutter-sm">
            <div class="text-h6">
              From: {{ capitalize(declined.from_name) }}
            </div>
            <div class="row justify-between">
              <div class="text-subtitle1">
                {{ formatTimeStamp(declined.created_at) }}
              </div>
              <div class="text-subtitle1">
                {{ declined.items.length }} items
              </div>
              <div>
                <q-badge color="negative"> Declined </q-badge>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-scroll-area>
  </div>
  <div v-if="pagination.last_page > 1" class="q-pt-md flex flex-center">
    <!-- color="grey-8" -->
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
