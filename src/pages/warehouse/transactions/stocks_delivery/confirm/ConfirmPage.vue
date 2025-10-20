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
      <div class="text-caption text-grey-6 q-mt-xs">
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
        >
          <q-card-section class="q-gutter-sm">
            <div class="row justify-between text-grey-7">
              <div class="text-h6">
                <span class="">From:</span>
                {{ capitalize(confirm.from_name) || "-" }}
              </div>
              <div class="text-subtitle1 text-bold">
                Confirmed by: {{ formatFullname(confirm.employee) || "-" }}
              </div>
            </div>
            <div class="row justify-between">
              <div class="text-subtitle1">
                {{ formatTimeStamp(confirm.created_at) || "-" }}
              </div>
              <div class="text-subtitle1">
                {{ confirm.items.length || "-" }} items
              </div>
              <div>
                <q-badge color="positive">Confirm</q-badge>
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
