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
    <q-card>
      <q-card-section class="bg-gradient text-white">
        <div class="row justify-between">
          <div class="text-h6">Other Products Stocks Reports</div>
          <div>
            <q-btn icon="close" flat dense round v-close-popup />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          :rows="rows"
          :columns="otherProductReport"
          row-key="id"
          flat
          bordered
          dense
          :pagination="pagination.page"
          @request="fetchOtherProductReports"
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
              <!--  -->
              <OtherViewStockReport :report="props.row" />
            </q-td>
          </template>
          <template>
            <q-pagination
              v-model="pagination.page"
              :max="maxPages"
              :max-pages="maxPages"
              @update:model-value="fetchOtherProductReports"
            >
            </q-pagination>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import OtherViewStockReport from "./OtherViewStockReport.vue";
import { useOtherProductStore } from "src/stores/other-product";
import { useSalesReportsStore } from "src/stores/sales-report";
import { computed, ref, watch } from "vue";
import { date } from "quasar";

const otherProductStore = useOtherProductStore();
const otherStocksReport = computed(() => otherProductStore.otherProductReports);

const salesReportStore = useSalesReportsStore();
const userData = salesReportStore.user;
const branches_id = userData?.employee?.branch_id || "";
const dialog = ref([false]);
const rows = ref([]);
const openDialog = async () => {
  try {
    if (branches_id) {
      await fetchOtherProductReports(branches_id); // Fetch data before opening dialog
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

const fetchOtherProductReports = async () => {
  try {
    const { page, rowsPerPage, sortBy, descending } = pagination.value;

    // Call the store function with the necessary parameters
    const stocks = await otherProductStore.fetchOtherProductReports(
      branches_id, // Branch ID
      page, // Current page
      rowsPerPage, // Items per page
      sortBy, // Sorting field
      descending // Sort direction
    );
    // Update the rows and maxPages based on the response
    rows.value = stocks.data; // Set the rows data
    maxPages.value = stocks.last_page; // Set the total number of pages
  } catch (error) {
    console.error("Error fetching selecta product reports:", error);
  }
};

watch(() => pagination.value.page, fetchOtherProductReports);
watch(() => pagination.value.rowsPerPage, fetchOtherProductReports);

const formatDate = (dateString) => {
  return date.formatDate(dateString, "MMMM DD, YYYY");
};

const formatTimeFromDB = (dateString) => {
  const dateObj = new Date(dateString);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return dateObj.toLocaleTimeString(undefined, options);
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

const otherProductReport = [
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
</script>

<style lang="scss" scoped>
.bg-gradient {
  // background: linear-gradient(135deg, #6a11cb, #2575fc);
  background: linear-gradient(135deg, #2c3e50, #4ca1af);
  // background: linear-gradient(135deg, #8e44ad, #3498db);
}
</style>
