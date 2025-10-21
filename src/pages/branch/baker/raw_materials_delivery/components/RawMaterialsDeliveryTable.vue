<template>
  <div class="q-mb-md row items-center justify-between">
    <!-- 🔍 Search Input -->
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

  <q-table
    flat
    :columns="deliveryListColumns"
    :rows="deliveryList || []"
    row-key="id"
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
          <TransactionView
            :report="props.row"
            @fetchAgain="fetchDeliveryStocks(pagination.current_page)"
          />
        </div>
      </q-td>
    </template>
  </q-table>

  <div v-if="pagination.last_page > 1" class="q-pt-md flex flex-center">
    <q-pagination
      v-model="pagination.current_page"
      :max="pagination.last_page"
      :max-pages="5"
      boundary-numbers
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
import { useBakerReportsStore } from "src/stores/baker-report";
import { useStockDelivery } from "src/stores/stock-delivery";
import { computed, onMounted, ref } from "vue";
import TransactionView from "./TransactionView.vue";

const bakerReportStore = useBakerReportsStore();
const userData = computed(() => bakerReportStore.user);
console.log("userData in RawMaterialsTable:", userData.value);

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

  const firstname = row.firstname ? capitalize(row.firstname) : "Null";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "Null";
  const lastname = row.lastname ? capitalize(row.lastname) : "Null";

  return `${firstname} ${middlename} ${lastname}`;
};

const onSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    fetchDeliveryStocks(1);
  }, 500);
};

const fetchDeliveryStocks = async (page = 1) => {
  $q.loading.show();
  try {
    await stocksDeliveryStore.fetchDeliveryStocksBranch(
      branchId,
      page,
      pagination.value.per_page,
      searchQuery.value
    );

    // if deliveryList becomes empty after search/pagination, clear selected delivery
    if (!deliveryList.value.length && selectedDelivery.value) {
      selectedDelivery.value = null;
    }

    // if theres a selected delivery and its no longer in the current page, deselect it
    if (
      selectedDelivery.value &&
      !deliveryList.value.some((d) => d.id === selectedDelivery.value.id)
    ) {
      selectedDelivery.value = null;
    }

    // Automatically select the first delivery if none is selected and list is not empty
    if ((!selectedDelivery.value && deliveryList.value, length > 0)) {
      selectedDelivery.value = deliveryList.value[0];
    }

    console.log("deliveryListsss", deliveryList.value);
    console.log("pagination", pagination.value);
  } catch (error) {
    console.log("Error fetching delivery stocks in component:", error);
  } finally {
    $q.loading.hide();
  }
};

onMounted(() => {
  fetchDeliveryStocks(pagination.value.current_page);
});

const onPageChange = (page) => {
  fetchDeliveryStocks(page);
};

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
    name: "process_by",
    label: "Process By",
    align: "left",
    field: (row) => formatFullname(row?.employee || "undefined"),
    sortable: true,
  },
  {
    name: "approved_by",
    label: "Approved By",
    align: "left",
    field: (row) => {
      if (row.status === "pending") {
        return "N/A";
      } else {
        return formatFullname(row?.approved_by || "N/A");
      }
    },
    sortable: true,
  },
  {
    name: "from",
    label: "From",
    align: "left",
    field: (row) => {
      if (row.from_designation === "Supplier") {
        return "Supplier";
      }
      return capitalize(row.from_name);
    },
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
    case "confirmed":
      return "green-7";
    case "declined":
      return "red-6";
    default:
      return "grey-6";
  }
};
</script>
