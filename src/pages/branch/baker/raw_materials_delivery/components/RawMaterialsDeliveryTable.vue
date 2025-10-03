<template>
  <div class="q-mb-md row items-center justify-between">
    <!-- 🔍 Search Input -->
  </div>

  <q-table
    flat
    :columns="deliveryListColumns"
    :rows="deliveryList || []"
    rorw-key="id"
    bordered
    dense
  >
    <template v-slot:body-cell-items="props">
      <q-td :props="props">
        <q-chip outlined color="primary text-white" dense>
          {{ props.row.items.length }}
        </q-chip>
      </q-td>
    </template>

    <template v-slot:body-cell-status="props">
      <q-td :props="props">
        <q-badge outlined :color="getStatusColor(props.row.status)">
          {{ capitalizeFirstLetter(props.row.status) }}
        </q-badge>
      </q-td>
    </template>

    <template v-slot:body-cell-view="props">
      <q-td :props="props">
        <div>
          <TransactionView :report="props.row" />
        </div>
      </q-td>
    </template>
  </q-table>

  <!-- 📦 Deliveries Table -->
  <!-- <q-table
      :rows="stockDelivery"
      :columns="columns"
      row-key="id"
      flat
      bordered
      :loading="loading"
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 10, 20]"
      @request="onRequest"
    >
      <template v-slot:no-data>
        <div class="text-grey text-center q-pa-md">No deliveries found</div>
      </template>
    </q-table> -->
</template>

<script setup>
import { date as quasarDate, useQuasar } from "quasar";
import { useBakerReportsStore } from "src/stores/baker-report";
import { useStockDelivery } from "src/stores/stock-delivery";
import { computed, onMounted, ref } from "vue";
import TransactionView from "./TransactionView.vue";

const bakerReportStore = useBakerReportsStore();
const userData = computed(() => bakerReportStore.user);
const branchId = userData.value?.device?.reference_id || "";
const stocksDeliveryStore = useStockDelivery();
const $q = useQuasar();

// computed properties to access store state
const deliveryList = computed(
  () => stocksDeliveryStore.deliveryStocks.data.data
);
const loading = computed(() => stocksDeliveryStore.loading);
const pagination = computed(() => {
  return (
    stocksDeliveryStore.deliveryStocks?.pagination || {
      current_page: 1,
      last_page: 1,
      per_page: 5,
    }
  );
});

const selectedDelivery = ref(null);
const searchQuery = ref("");

let searchTimeout = null;

const onSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    fetchDeliveryStocks(1);
  }, 500);
};

const fetchDeliveryStocks = async (page = 1) => {
  try {
    loading.value = true;
    await stocksDeliveryStore.fetchDeliveryStocksBranch(
      branchId,
      page,
      pagination.value.per_page,
      searchQuery.value
    );

    console.log("deliveryListsss", deliveryList.value);
    console.log("pagination", pagination.value);
  } catch (error) {
    console.log("Error fetching delivery stocks in component:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDeliveryStocks(pagination.value.current_page);
});

const deliveryListColumns = [
  {
    name: "created_at",
    label: "Date",
    align: "left",
    field: "created_at",
    format: (val) => formatDate(val),
    sortable: true,
  },
  {
    name: "from",
    label: "From",
    align: "left",
    field: "from_name",
    sortable: true,
  },
  {
    name: "items",
    label: "Items",
    field: "items",
    align: "center",
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    align: "left",
    field: "status",
  },
  {
    name: "view",
    align: "right",
    label: "View",
    field: "view",
    sortable: true,
  },
];

const formatDate = (val) => {
  return quasarDate.formatDate(val, "MMMM D, YYYY - hh:mm A");
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
const getStatusColor = (status) => {
  switch ((status || "").toLowerCase()) {
    case "pending":
      return "orange-7";
    case "in progress":
      return "blue-7";
    case "completed":
      return "green-7";
    case "cancelled":
      return "red-6";
    default:
      return "grey-6";
  }
};
</script>
