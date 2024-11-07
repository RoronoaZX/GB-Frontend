<template>
  <div class="q-mt-sm q-gutter-md">
    <div>
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
    </div>
    <div class="table-container">
      <q-table
        class="sticky-header"
        :filter="filter"
        flat
        :columns="bakersReportListColumns"
        :rows="filteredRows"
        row-key="name"
        :virtual-scroll-sticky-size-start="48"
        virtual-scroll
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
        hide-bottom
        style="height: 900px; max-height: 1000px; min-height: none"
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
      <div
        v-if="loading"
        class="loading-overlay row justify-center items-center"
      >
        <q-spinner size="50px" />
      </div>
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
import { computed, onMounted, ref, watch } from "vue";
import { date as quasarDate } from "quasar";

const pagination = ref({
  rowsPerPage: 0,
});

const bakerReportStore = useBakerReportsStore();
const bakerReportRow = computed(() => bakerReportStore.reportToView);
const userData = computed(() => bakerReportStore.user);
const userId = userData.value?.data.id || "";
const filter = ref("");
const loading = ref(true);
const loadingSearchIcon = ref(false);
const showNoDataMessage = ref(false);

watch(filter, async (newFilter) => {
  loadingSearchIcon.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loadingSearchIcon.value = false;
  showNoDataMessage.value = !loading.value && filteredRows.value.length === 0;
  console.log("Filtered Rows:", filteredRows.value);
});

onMounted(async () => {
  console.log("props.branchId in onMounted:", userId);
  if (userId) {
    await reloadTableData(userId);
  }
});

const reloadTableData = async (userId) => {
  loading.value = true;
  await bakerReportStore.fetchBakerReport(userId);
  loading.value = false;
};

const filteredRows = computed(() => {
  if (!filter.value) {
    return bakerReportRow.value;
  }
  const filterText = filter.value.toLowerCase();
  return bakerReportRow.value.filter(
    (row) =>
      (row.name && row.name.toLowerCase().includes(filterText)) ||
      (row.created_at &&
        quasarDate
          .formatDate(row.created_at, "MMMM D, YYYY")
          .toLowerCase()
          .includes(filterText)) ||
      (row.recipe &&
        row.recipe.name &&
        row.recipe.name.toLowerCase().includes(filterText)) ||
      (row.recipe &&
        row.recipe.category &&
        row.recipe.category.toLowerCase().includes(filterText))
  );
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
    field: (row) => ({
      name: row.branch_recipe.recipe.name,
      category: row.branch_recipe.recipe.category,
    }),
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
