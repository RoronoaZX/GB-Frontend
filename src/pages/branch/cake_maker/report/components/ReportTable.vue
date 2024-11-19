<template>
  <div class="q-mt-sm q-gutter-md">
    <div>
      <q-input
        rounded
        outlined
        dense
        debounce="300"
        placeholder="Search"
        style="width: 500px; max-width: 1500px; min-width: 100px"
      >
        <!-- v-model="filter" -->
        <!-- <template v-slot:append>
          <q-icon v-if="!loadingSearchIcon" name="search" />
          <q-spinner v-else />
        </template> -->
      </q-input>
    </div>
    <q-table
      class="sticky-header"
      flat
      :columns="cakeReportColumns"
      :rows="cakeReportsRow"
      :virtual-scroll-sticky-size-start="48"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
    >
      <template v-slot:body-cell-branchName="props">
        <q-td :props="props">
          {{ capitalizeFirstLetter(props.row.branch.name) }}
        </q-td>
      </template>
      <template v-slot:body-cell-confirmation_status="props">
        <q-td :props="props">
          <q-badge
            outlined
            :color="getBadgeStatusColor(props.row.confirmation_status)"
          >
            {{ capitalizeFirstLetter(props.row.confirmation_status) }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-view="props">
        <q-td :props="props">
          <div>
            <ViewReportTable :report="props.row" />
          </div>
        </q-td>
      </template>
    </q-table>
    <!-- {{ cakeReportsRow }} -->
  </div>
</template>

<script setup>
import { useCakeMakerReportStore } from "src/stores/cake-maker-report";
import { computed, onMounted } from "vue";
import ViewReportTable from "./ViewReportTable.vue";
import { date as quasarDate } from "quasar";

const useCakeMakerReport = useCakeMakerReportStore();
const branchId = localStorage.getItem("branch_id");
console.log("branchId", branchId);
const cakeReportsRow = computed(() => useCakeMakerReport.cakeMakerReports);
const userData = computed(() => useCakeMakerReport.user);
const userId = userData.value?.data?.id || "";
const loading = true;
// console.log("user_id", userId);

onMounted(async () => {
  if (userId) {
    await reloadTableData(userId);
  }
});

const reloadTableData = async (userId) => {
  console.log("user_id", userId);
  try {
    const response = await useCakeMakerReport.fetchCakeReport(userId);
  } catch (error) {}
};

const formatDate = (dateString) => {
  return quasarDate.formatDate(dateString, "MMMM D, YYYY");
};

const cakeReportColumns = [
  {
    name: "date",
    label: "Date",
    align: "left",
    format: formatDate,
    field: "created_at",
  },
  {
    name: "branchName",
    label: "Branch Name",
    align: "center",
    field: (row) => row.branch.name,
  },
  {
    name: "cakeName",
    label: "Cake Name",
    align: "center",
    field: "name",
  },
  {
    name: "confirmation_status",
    label: "Status",
    align: "center",
    field: "confirmation_status",
  },
  {
    name: "view",
    label: "View",
    align: "center",
    field: "created_at",
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

<style lang="scss" scoped>
.table-container {
  position: relative;
}
</style>
