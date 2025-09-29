<template>
  <div class="spinner-wrapper" v-if="loading">
    <q-spinner-dots size="50px" color="primary" />
  </div>
  <div v-else>
    <div v-if="premixData.length === 0" class="data-error">
      <q-icon name="warning" color="warning" size="4em" />
      <div class="q-ml-sm text-h6">No data available</div>
    </div>
    <q-table
      :rows="premixData"
      :columns="receivedPremixColumns"
      v-model:pagination="pagination"
      :rows-per-page-options="[3, 5, 10, 0]"
      @request="handleRequest"
      flat
      bordered
      v-else
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge color="green">
            {{ capitalizeFirstLetter(props.row.status) }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <TransactionView :report="props.row" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useWarehousesStore } from "src/stores/warehouse";
import { usePremixStore } from "src/stores/premix";
import { date as quasarDate } from "quasar";
import { computed, onMounted, ref } from "vue";
import TransactionView from "./TransactionView.vue";
import { preFetch } from "quasar/wrappers";

const warehouseStore = useWarehousesStore();
const userData = computed(() => warehouseStore.user);
const warehouseId = userData.value.device.reference_id;
console.log("warehouseId", warehouseId);
const premixStore = usePremixStore();
const receivePremixData = computed(() => premixStore.receivePremixData);
console.log("receivePremixData", receivePremixData.value);

const premixData = ref([]);

const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});
const status = ref("process");
const loading = ref(true);
const showNoDataMessage = ref(false);

onMounted(async () => {
  if (warehouseId) {
    await fetchReceivePremix(warehouseId);
  }
  console.log("receivePremixData", receivePremixData.value);
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
const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
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

const fetchReceivePremix = async (warehouseId, page = 0, rowsPerPage = 5) => {
  try {
    loading.value = true;
    await premixStore.fetchReceivePremix(
      warehouseId,
      status.value,
      page,
      rowsPerPage
    );
    console.log("receivePremixDatssa", receivePremixData.value);

    const { data, current_page, per_page, total } = receivePremixData.value;

    premixData.value = data;
    console.log("premixData.value", premixData.value);
    pagination.value.page = current_page;
    pagination.value.rowsPerPage = per_page;
    pagination.value.rowsNumber = total;

    if (!receivePremixData.value.length) {
      showNoDataMessage.value = true;
    }
  } catch (error) {
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
};

const handleRequest = (props) => {
  fetchReceivePremix(
    warehouseId,
    props.pagination.page,
    props.pagination.rowsPerPage
  );
};

const receivedPremixColumns = [
  {
    name: "created_at",
    label: "Date / Time",
    align: "left",
    field: (row) => formatTimestamp(row.created_at) || "Not Available",
    sortable: true,
  },
  {
    name: "employee",
    label: "Employee",
    align: "left",
    field: (row) => formatFullname(row.employee) || "Not Available",
    sortable: true,
  },
  {
    name: "branch",
    label: "Branch Name",
    align: "left",
    field: (row) =>
      row.branch_premix.branch_recipe.branch.name || "Not Available",
    sortable: true,
  },
  {
    name: "premix_name",
    label: "Premix Name",
    align: "left",
    field: (row) => row.name || "Not Available",
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    align: "left",
    field: "status",
    sortable: true,
  },
  {
    name: "action",
    label: "Action",
    align: "left",
    field: "action",
    sortable: true,
  },
];
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
