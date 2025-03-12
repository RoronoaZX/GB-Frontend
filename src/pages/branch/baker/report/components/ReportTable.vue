<template>
  <div class="q-mt-sm q-gutter-md">
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
          <q-spinner v-else />
        </template>
      </q-input>
    </div> -->
    <div class="table-container">
      <q-table
        :rows="rows"
        :columns="bakersReportListColumns"
        row-key="id"
        flat
        bordered
        dense
        v-model="pagination"
        :pagination="pagination"
        :rows-per-page-options="[10]"
        @request="reloadTableData(userId)"
      >
        <template v-slot:body-cell-status="props">
          <q-td key="name" :props="props">
            <q-badge outlined :color="getBadgeStatusColor(props.row.status)">
              {{ capitalizeFirstLetter(props.row.status) }}
            </q-badge>
          </q-td>
        </template>
        <template v-slot:body-cell-view="props">
          <q-td :props="props">
            <div>
              <ReportView :report="props.row" />
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
          :max-pages="5"
          boundary-numbers
          @update:model-value="reloadTableData(userId)"
        />
      </div>

      <!-- Loading Indicator -->
      <div
        v-if="loading"
        class="loading-overlay row justify-center items-center"
      >
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
  </div>
</template>

<script setup>
import { useBakerReportsStore } from "src/stores/baker-report";
import ReportView from "./ReportView.vue";
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { date as quasarDate } from "quasar";

const bakerReportStore = useBakerReportsStore();
const bakerReportRow = computed(() => bakerReportStore.reportToView);
const userData = computed(() => bakerReportStore.user);

// im using user id for fetching reports
// instead of employee id for the reason
// that the user id is the one that is being
// used in the backend and database

const userId = userData.value?.data.id || "";
const filter = ref("");
const loading = ref(true);
const loadingSearchIcon = ref(false);
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

// Fetch Data Function
const reloadTableData = async () => {
  loading.value = true;
  try {
    const { page, rowsNumber, rowsPerPage, sortBy, descending } =
      pagination.value;
    const bakerReportData = await bakerReportStore.fetchBakerReport(
      userId,
      page,
      rowsNumber,
      rowsPerPage,
      sortBy,
      descending
    );

    rows.value = bakerReportData.data;
    maxPages.value = bakerReportData.last_page;
    pagination.value.rowsPerPage = bakerReportData.per_page || 10;
    showNoDataMessage.value = rows.value.length === 0;
  } catch (error) {
    console.error("Error fetching baker report:", error);
  }
  loading.value = false;
};

// Auto-fetch data when pagination changes
watchEffect(() => {
  if (userId) {
    reloadTableData();
  }
});

const formatDate = (dateString) => {
  return quasarDate.formatDate(dateString, "MMMM D, YYYY");
};

const bakersReportListColumns = [
  {
    name: "date",
    align: "left",
    label: "Date",
    field: "created_at",
    format: formatDate,
    sortable: true,
  },
  {
    name: "name",
    label: "Reports Name",
    align: "center",
    field: (row) => {
      if (row.branch_recipe && row.branch_recipe.recipe) {
        return {
          name: row.branch_recipe.recipe.name,
          category: row.branch_recipe.recipe.category,
        };
      } else {
        return {
          name: "N/A", // Fallback value for name
          category: "N/A", // Fallback value for category
        };
      }
    },
    format: (val) => `${val.name} (${val.category})`,
    sortable: true,
  },
  {
    name: "status",
    align: "center",
    label: "Status",
    field: "status",
  },
  {
    name: "view",
    align: "right",
    label: "View",
    field: "view",
  },
];

const getBadgeStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "orange";
    case "declined":
      return "negative";
    case "confirmed":
      return "green";
    default:
      return "grey";
  }
};
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
</script>

<style scoped>
.table-container {
  position: relative;
}

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
