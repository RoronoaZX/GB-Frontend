<template>
  <q-btn
    class="bg-gradient text-white"
    outlined
    label="Stocks Reports"
    @click="openDialog"
  />
  <q-dialog
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <!-- @update:model-value="onDialogChange" -->
    <q-card>
      <q-card-section class="bg-gradient text-white">
        <div class="row justify-between">
          <div class="text-h6">Softdrinks Stocks Reports</div>
          <div>
            <q-btn icon="close" flat dense round v-close-popup />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          :rows="rows"
          :columns="softdrinks"
          row-key="id"
          flat
          bordered
          dense
          :pagination="pagination.page"
          @request="fetchSoftdrinksProductReport"
        >
          <template v-slot:body-cell-employee="props">
            <q-td :props="props">
              {{ formatFullname(props.row.employee) }}
            </q-td>
          </template>
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-badge :color="getBadgeCategoryColor(props.row.status)">
                {{ capitalizeFirstLetter(props.row.status) }}
              </q-badge>
            </q-td>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <SoftdrinksViewStocksReport :report="props.row" />
            </q-td>
          </template>
          <template>
            <q-pagination
              v-model="pagination.page"
              :max="maxPages"
              :max-pages="maxPages"
              @update:model-value="fetchSoftdrinksProductReport"
            >
            </q-pagination>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { date } from "quasar";
import { useSalesReportsStore } from "src/stores/sales-report";
import { useSoftdrinksProductStore } from "src/stores/softdrinks-products";
import { computed, ref, watch } from "vue";
import SoftdrinksViewStocksReport from "./SoftdrinksViewStocksReport.vue";

const softdrinksProductStore = useSoftdrinksProductStore();
const softdrinksStocksReport = computed(
  () => softdrinksProductStore.softdrinksProductsReport
);

const softdrinks_added_stocks =
  softdrinksStocksReport.value.softdrinks_added_stocks;

const salesReportsStore = useSalesReportsStore();
const userData = salesReportsStore.user;
const branches_id = userData?.employee?.branch_id || "";
const dialog = ref(false);
const rows = ref([]);

const openDialog = async () => {
  try {
    if (branches_id) {
      await fetchSoftdrinksProductReport(branches_id);
    }

    dialog.value = true;
  } catch (error) {
    console.error("Error opening dialog:", error);
  }
};

const pagination = ref({
  page: 1,
  rowsPerPage: 10, // Matches Laravel's perPage
  sortBy: "id",
  descending: false,
});

const maxPages = ref(1);
const maximizedToggle = ref(true);

const fetchSoftdrinksProductReport = async () => {
  try {
    const { page, rowsPerPage, sortBy, descending } = pagination.value;
    const stocks = await softdrinksProductStore.fetchSoftdrinksProductReports(
      branches_id, // Branch ID
      page, // Current page
      rowsPerPage, // Items per page
      sortBy, // Sorting field
      descending // Sort direction
    );
    rows.value = stocks.data;
    maxPages.value = stocks.last_page;
  } catch (error) {
    console.error("Error fetching selecta product reports:", error);
  }
};
const formatDate = (dateString) => {
  return date.formatDate(dateString, "MMM DD, YYYY");
};

const formatTimeFromDB = (dateString) => {
  const dateObj = new Date(dateString);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return dateObj.toLocaleDateString(undefined, options);
};

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`.trim();
};

const softdrinks = [
  {
    name: "date",
    align: "center",
    label: "Date",
    field: (row) => formatDate(row.created_at),
  },
  {
    name: "time",
    align: "center",
    label: "Time",
    field: (row) => formatTimeFromDB(row.created_at),
  },
  {
    name: "employee",
    align: "center",
    label: "Employee",
    field: "employee",
  },
  {
    name: "status",
    align: "center",
    label: "Status",
    field: "status",
  },
  {
    name: "action",
    align: "center",
    label: "Actions",
    field: "action",
  },
];

const getBadgeCategoryColor = (category) => {
  switch (category) {
    case "declined":
      return "red";
    case "confirmed":
      return "green";
    case "pending":
      return "orange";
    default:
      return "grey";
  }
};
const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
watch(() => pagination.value.page, fetchSoftdrinksProductReport);
watch(() => pagination.value.rowsPerPage, fetchSoftdrinksProductReport);
</script>

<style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(135deg, #2c3e50, #4ca1af);
}
</style>
