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

      <q-card-section>
        <div>
          <q-tabs
            v-model="tab"
            dense
            class="bg-grey-2 text-grey-7 tabs-as-cards"
            active-color="red-6"
            indicator-color="transparent"
            align="justify"
          >
            <q-tab
              class="text-purple"
              name="confirmSalesReports"
              label="Confirm Previous Sales Reports"
            />
            <q-tab
              class="text-orange"
              name="salesReportPanel"
              label="Sales Reports"
            />
          </q-tabs>

          <q-tab-panels
            v-model="tab"
            animated
            transition-prev="scale"
            transition-next="scale"
          >
            <q-tab-panel name="confirmSalesReports">
              <PendingPanel :data="productsReportRows" :loading="loading" />
            </q-tab-panel>

            <q-tab-panel name="salesReportPanel">
              <SalesReportPanel
                :rows="salesReportRows"
                :columns="columns"
                :loading="loading"
                :pagination="pagination"
                @request="handleRequest"
                @open-report="handleDialog"
              />
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import ReportDialog from "./ReportDialog.vue";
import { useSalesReportsStore } from "src/stores/sales-report";
import { computed, onMounted, ref } from "vue";
import { date, Notify, useQuasar } from "quasar";
import PendingPanel from "./pending-panel/PendingPanel.vue";
import SalesReportPanel from "./sales-report-panel/SalesReportPanel.vue";

import { typographyFormat } from "src/composables/typography/typography-format";

const { formatDate } = typographyFormat();

const salesReportStore = useSalesReportsStore();
const salesReport = computed(() => salesReportStore.salesReport);
console.log("sales report in page", salesReport.value);
const salesReportRows = ref([]);
const productsReportRows = computed(
  () => salesReportStore.branchPendingSalesReport
);

console.log("sales report in pagess", productsReportRows.value);
const userData = computed(() => salesReportStore.user);
console.log("user datasss", userData.value);
const branchId = userData.value?.device?.reference?.id || "";
console.log("sales branch id", branchId);

const userId = computed(() => salesReportStore.user.data.id);
console.log("salesssss report in page user ID", userId.value);
const loading = ref(true);

const dialog = ref(false);

const tab = ref("confirmSalesReports");

// Fetch the confirmation sales report
const fetchConfirmationSalesReport = async () => {
  try {
    loading.value = true;
    await salesReportStore.fetchBranchPendingSalesReport(
      userId.value,
      branchId
    );
  } catch (error) {
    console.log("Error fetching confirmation sales report", error);
  }
};

onMounted(async () => {
  console.log("Onmountedssss data", branchId);
  await fetchConfirmationSalesReport(userId.value, branchId);
});

const openDialog = () => {
  dialog.value = true;
};

const pagination = ref({
  page: 1,
  rowsPerPage: 5,
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

<style scoped>
.q-tabs--not-scrollable .q-tabs__content,
body.mobile .q-tabs--scrollable.q-tabs--mobile-without-arrows .q-tabs__content {
  overflow: visible;
}
.tabs-as-cards {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
}

.tabs-as-cards .q-tab {
  background-color: white;
  color: #333;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  margin: 0 8px;
  padding: 10px 20px;
  transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s;
}

.tabs-as-cards .q-tab:hover {
  background-color: #f0f0f0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.tabs-as-cards .q-tab--active {
  background-color: #e0e0e0;
  color: #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
.tab-content {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
