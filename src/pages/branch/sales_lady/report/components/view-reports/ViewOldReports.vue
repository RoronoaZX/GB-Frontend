<template>
  <q-btn
    outline
    class="text-white q-pa-sm"
    push
    dense
    elevated
    icon="visibility"
    label="View Reports"
    @click="openDialog"
  >
  </q-btn>
  <q-dialog
    v-model="dialog"
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section>
        <div class="row justify-between">
          <div>
            <q-btn size="md" outline rounded icon="close" dense v-close-popup />
          </div>
        </div>
      </q-card-section>
      <q-table
        flat
        :rows="salesReportRows"
        :columns="columns"
        row-key="name"
        :loading="loading"
        v-model:pagination="pagination"
        :rows-per-page-options="[3, 5, 10, 0]"
        @request="handleRequest"
      >
        <template v-slot:body-cell-reports="props">
          <q-td :props="props">
            <div class="row justify-center q-gutter-x-md">
              <q-btn
                padding="xs lg"
                rounded
                dense
                size="sm"
                color="light-blue-5"
                text-color="white"
                @click="handleDialog(props.row.AM.sales_reports, 'AM')"
                >AM</q-btn
              >
              <q-btn
                padding="xs lg"
                rounded
                dense
                size="sm"
                color="deep-orange"
                text-color="white"
                @click="handleDialog(props.row.PM.sales_reports, 'PM')"
                >PM</q-btn
              >
            </div>
          </q-td>
        </template>
        <template #loading>
          <q-inner-loading showing>
            <q-spinner-gears size="50px" color="indigo-8" />
          </q-inner-loading>
        </template>
      </q-table>

      <!-- {{ salesReport }} -->
    </q-card>
  </q-dialog>
</template>

<script setup>
import ReportDialog from "./ReportDialog.vue";
import { useSalesReportsStore } from "src/stores/sales-report";
import { computed, onMounted, ref } from "vue";
import { date, Notify, useQuasar } from "quasar";

const salesReportStore = useSalesReportsStore();
const salesReport = computed(() => salesReportStore.salesReport);
console.log("sales report in page", salesReport.value);
const salesReportRows = ref([]);
const userData = computed(() => salesReportStore.user);
console.log("user datasss", userData.value);
const branchId = userData.value?.device?.reference?.id || "";
console.log("sales branch id", branchId);
const loading = ref(true);

const dialog = ref(false);

const openDialog = () => {
  dialog.value = true;
};

const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});

onMounted(async () => {
  console.log("Onmounted data", branchId);
  if (branchId) {
    await reloadTableData(branchId);
  }
});

const reloadTableData = async (branchId, page = 0, rowsPerPage = 5) => {
  try {
    console.log("branch data", branchId);
    loading.value = true;
    await salesReportStore.fetchSalesReports(branchId, page, rowsPerPage);

    console.log("Fetched data:", salesReport.value); // Log the raw response data
    console.log("Production rows:", salesReportRows.value); // Log the computed production rows

    const { data, current_page, per_page, total } = salesReport.value;

    salesReportRows.value = data;
    console.log("salesReport.value", salesReportRows.value);
    pagination.value.page = current_page;
    pagination.value.rowsPerPage = per_page;
    pagination.value.rowsNumber = total;
  } catch (error) {
    console.error(error);
    console.error(error);
    Notify.create({
      type: "negative",
      message: "Failed to load sales reports. Please try again.",
    });
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  return date.formatDate(dateString, "MMMM DD, YYYY");
};

const handleRequest = (props) => {
  console.log("[ropss]", props);
  reloadTableData(
    branchId,
    props.pagination.page,
    props.pagination.rowsPerPage
  );
};

const columns = [
  {
    name: "reportDate",
    align: "center",
    label: "Date",
    field: "date",
    format: formatDate,
  },
  {
    name: "reports",
    align: "center",
    label: "Reports",
    field: "reports",
  },
];

const $q = useQuasar();

const handleDialog = (report, label) => {
  $q.dialog({
    component: ReportDialog,
    componentProps: {
      reports: report,
      reportLabel: label,
    },
  });
};
</script>

<style lang="scss" scoped></style>
