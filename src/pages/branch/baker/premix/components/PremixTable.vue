<template>
  <!-- <div>
    <q-input
      rounded
      outlined
      dense
      debounce="300"
      v-model="filter"
      placeholder="Search"
      style="width: 500px; max-width: 1500px; min-width: 100px"
    >
      <template v-slot:append>
        <q-icon v-if="!loadingSearchIcon" name="search" />
        <q-icon v-else :thickness="2" color="teal" size="1em" />
      </template>
    </q-input>
  </div> -->
  <div>
    <!-- :filter="filter" -->
    <q-table
      flat
      :columns="transactionListColumns"
      :rows="rows"
      row-key="id"
      bordered
      dense
      v-model="pagination"
      :pagination="pagination.rowsPerPage"
      :rows-per-page-options="[10]"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge outlined :color="getBadgeStatusColor(props.row.status)">
            {{ capitalizeFirstLetter(props.row.status) }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-view="props">
        <q-td :props="props">
          <div>
            <TransactionView
              :report="props.row"
              @update-history="updateReportHistory"
            />
          </div>
        </q-td>
      </template>
    </q-table>
    <!-- Pagination -->
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="pagination.page"
        color="purple"
        :max="maxPages"
        :max-pages="maxPages"
        boundary-numbers
        @update:model-value="reloadTableData(userId)"
      />
    </div>

    <!-- Loading Indicator -->
    <div v-if="loading" class="loading-overlay row justify-center items-center">
      <q-spinner size="50px" />
    </div>

    <!-- No Data Message -->
    <div
      v-if="showNoDataMessage"
      class="q-pa-md q-gutter-md row justify-center"
    >
      <q-banner class="bg-grey-1" dense> No data available </q-banner>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch, onMounted, watchEffect } from "vue";
import { useBakerReportsStore } from "src/stores/baker-report";
import { usePremixStore } from "src/stores/premix";
import { date as quasarDate } from "quasar";
import TransactionView from "./TransactionView.vue";
// import { useRequestPremixStore } from "src/stores/request-premix";

const bakerReportStore = useBakerReportsStore();
const userData = computed(() => bakerReportStore.user);
console.log("userData in RawMaterialsTable:", userData.value);
const branchId = userData.value?.device?.reference_id || "";
console.log("branchId in PremixPage:", branchId);
const premixStore = usePremixStore();
const premixDatas = computed(() => premixStore.branchEmployeePremix);
const employeeId = userData.value?.data?.employee_id || "";
console.log("employeeId in PremixPagess:", employeeId);

const filter = ref("");
const loadingSearchIcon = ref(true);
const loading = ref(true);
const showNoDataMessage = ref(false);
const rows = ref([]);

const maxPages = ref(1);
const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 10,
  sortBy: "id",
  descending: false,
});

onMounted(async () => {
  if ((branchId, employeeId)) {
    await fetchRequestBranchEmployeePremix(branchId, employeeId);
  }
  console.log("premixdatas", premixDatas.value);
});

const fetchRequestBranchEmployeePremix = async () => {
  loading.value = true;
  try {
    const { page, rowsNumber, rowsPerPage, sortBy, descending } =
      pagination.value;
    const premix = await premixStore.fetchRequestBranchEmployeePremix(
      branchId,
      employeeId,
      page,
      rowsNumber,
      rowsPerPage,
      sortBy,
      descending
    );
    rows.value = premix.data;
    maxPages.value = premix.last_page;
    pagination.value.rowsPerPage = premix.per_page || 10;
    showNoDataMessage.value = rows.value.length === 0;
  } catch (error) {
    console.error("Error fetching premix report:", error);
  }
  loading.value = false;
};

// Auto-fetch data when pagination changes
watchEffect(() => {
  if ((branchId, employeeId)) {
    fetchRequestBranchEmployeePremix();
  }
});

watch(filter, () => {
  loadingSearchIcon.value = true;
  setTimeout(() => {
    loadingSearchIcon.value = false;
  });
});
const formatDate = (dateString) => {
  return quasarDate.formatDate(dateString, "MMMM D, YYYY - hh:mm A");
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const getBadgeStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "warning";
    case "declined":
      return "red-6";
    case "confirmed":
      return "green";
    case "process":
      return "primary";
    case "completed":
      return "dark";
    case "to deliver":
      return "brown-9";
    case "to receive":
      return "amber-10";
    case "received":
      return "secondary";
    default:
      return "grey";
  }
};

const transactionListColumns = [
  {
    name: "name",
    label: "Transactions Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "date",
    align: "center",
    label: "Date",
    field: "created_at",
    format: (val) => formatDate(val),
    sortable: true,
  },
  {
    name: "status",
    align: "center",
    label: "Status",
    field: "status",
    sortable: true,
  },
  {
    name: "view",
    align: "right",
    label: "View",
    field: "view",
    sortable: true,
  },
];
</script>
<style scoped>
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1;
}
</style>
