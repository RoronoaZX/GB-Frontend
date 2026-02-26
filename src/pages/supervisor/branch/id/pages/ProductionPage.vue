<template>
  <div>
    <!-- Desktop Table View -->
    <q-table
      v-if="$q.screen.gt.sm"
      flat
      :rows="salesReportRows"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :pagination="pagination"
      :rows-per-page-options="[3, 5, 10, 0]"
      @request="onRequest"
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
              @click="handleDialog(props.row.AM?.sales_reports, 'AM')"
              >AM</q-btn
            >
            <q-btn
              padding="xs lg"
              rounded
              dense
              size="sm"
              color="deep-orange"
              text-color="white"
              @click="handleDialog(props.row.PM?.sales_reports, 'PM')"
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

    <!-- Mobile Card View -->
    <div v-else class="mobile-card-list q-pa-sm">
      <q-pull-to-refresh @refresh="handleRefresh">
        <q-infinite-scroll
          @load="onLoadMore"
          :offset="250"
          :disable="loading || !hasMorePages"
        >
          <div
            v-for="(row, index) in salesReportRows"
            :key="row.id || index"
            class="mobile-card q-mb-md"
          >
            <q-card flat bordered class="cursor-pointer">
              <q-card-section class="q-pa-sm">
                <!-- Header with date/branch name -->
                <div class="row items-center justify-between">
                  <div class="text-weight-bold text-primary">
                    {{ formatDate(row.date) }}
                  </div>
                  <div class="text-caption text-grey">
                    {{ row.branch?.name || "N/A" }}
                  </div>
                </div>

                <!-- Additional info in expandable section -->
                <q-expansion-item
                  dense
                  dense-toggle
                  expand-icon-class="text-primary"
                  label="View Details"
                  header-class="text-primary text-caption q-pa-none"
                >
                  <q-card flat class="q-mt-sm">
                    <q-card-section class="q-pt-none q-px-sm">
                      <!-- Production Summary -->
                      <div class="row items-center justify-between q-py-xs">
                        <span class="text-caption text-grey"
                          >Total Production:</span
                        >
                        <span class="text-body2">{{
                          row.total_production || 0
                        }}</span>
                      </div>
                      <div class="row items-center justify-between q-py-xs">
                        <span class="text-caption text-grey"
                          >AM Production:</span
                        >
                        <span class="text-body2">{{
                          row.AM?.total_production || 0
                        }}</span>
                      </div>
                      <div class="row items-center justify-between q-py-xs">
                        <span class="text-caption text-grey"
                          >PM Production:</span
                        >
                        <span class="text-body2">{{
                          row.PM?.total_production || 0
                        }}</span>
                      </div>
                      <div class="row items-center justify-between q-py-xs">
                        <span class="text-caption text-grey">Status:</span>
                        <span class="text-body2">
                          <q-badge :color="getStatusColor(row.status)">
                            {{ row.status || "N/A" }}
                          </q-badge>
                        </span>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-card-section>

              <q-separator />

              <!-- Action buttons -->
              <q-card-actions align="around" class="q-pa-sm">
                <q-btn
                  unelevated
                  rounded
                  dense
                  color="light-blue-5"
                  text-color="white"
                  icon="wb_sunny"
                  label="AM"
                  class="full-width-mobile"
                  style="width: 45%"
                  :disable="!row.AM?.sales_reports"
                  @click="handleDialog(row.AM?.sales_reports, 'AM')"
                />
                <q-btn
                  unelevated
                  rounded
                  dense
                  color="deep-orange"
                  text-color="white"
                  icon="nights_stay"
                  label="PM"
                  class="full-width-mobile"
                  style="width: 45%"
                  :disable="!row.PM?.sales_reports"
                  @click="handleDialog(row.PM?.sales_reports, 'PM')"
                />
              </q-card-actions>
            </q-card>
          </div>

          <template #loading>
            <div class="row justify-center q-pa-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>

          <!-- No more data message -->
          <div
            v-if="!hasMorePages && salesReportRows.length > 0"
            class="row justify-center q-pa-md text-grey"
          >
            No more reports to load
          </div>
        </q-infinite-scroll>
      </q-pull-to-refresh>

      <!-- Empty state -->
      <div
        v-if="!loading && salesReportRows.length === 0"
        class="empty-state q-pa-xl"
      >
        <q-icon name="description" size="64px" color="grey-4" />
        <h4 class="text-h6 text-grey-8 q-mt-md">No sales reports found</h4>
        <p class="text-grey-6">Pull down to refresh or try again later</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, computed, watch, onMounted } from "vue";
// import ReportDialog from "../ReportDialog.vue";
import { useSalesReportsStore } from "src/stores/sales-report";
import { Notify } from "quasar";
import { useRoute } from "vue-router";
import { useSupervisorStore } from "src/stores/supervisor";

const props = defineProps({
  columns: Array,
  branchId: {
    type: [String, Number],
    required: true,
  },
});

const emit = defineEmits(["request", "open-report", "update:pagination"]);

const route = useRoute();
const $q = useQuasar();
const salesReportStore = useSalesReportsStore();

const supervisorStore = useSupervisorStore();

const userId = computed(
  () =>
    supervisorStore.user.data.employee.id ||
    supervisorStore.user.data.employee_id ||
    ""
);

console.log("User ID in ProductionPage:", userId.value);

// State
const loading = ref(false);
const salesReportRows = ref([]);
const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});

// Computed
const hasMorePages = computed(() => {
  const totalPages = Math.ceil(
    pagination.value.rowsNumber / pagination.value.rowsPerPage
  );
  return pagination.value.page < totalPages;
});

const salesReport = computed(() => salesReportStore.salesReport || {});

// Helper functions
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusColor = (status) => {
  const colors = {
    completed: "positive",
    pending: "warning",
    cancelled: "negative",
    draft: "grey",
  };
  return colors[status?.toLowerCase()] || "grey";
};

const getDisplayValue = (row, column) => {
  if (!column || !column.field) return "";

  if (typeof column.field === "function") {
    return column.field(row);
  }

  // Handle nested fields like 'AM.sales_reports'
  const fields = column.field.split(".");
  let value = row;
  for (const field of fields) {
    if (value && value[field] !== undefined) {
      value = value[field];
    } else {
      return "";
    }
  }

  return value || "";
};

// Data fetching
const reloadTableData = async (
  page = pagination.value.page,
  rowsPerPage = pagination.value.rowsPerPage
) => {
  if (!props.branchId) return;

  try {
    console.log(
      "Fetching sales reports for branch:",
      branchId,
      "Page:",
      page,
      "Rows per page:",
      rowsPerPage
    );
    loading.value = true;

    // Adjust page for API (if API uses 0-based indexing)
    const apiPage = page - 1; // Convert to 0-based if needed
    await salesReportStore.fetchSalesReports(branchId, apiPage, rowsPerPage);

    console.log("Fetched data:", salesReport.value);

    const { data, current_page, per_page, total } = salesReport.value;

    if (page === 1) {
      // Replace data on first page
      salesReportRows.value = data || [];
    } else {
      // Append data for subsequent pages
      salesReportRows.value = [...salesReportRows.value, ...(data || [])];
    }

    pagination.value.page = current_page || page;
    pagination.value.rowsPerPage = per_page || rowsPerPage;
    pagination.value.rowsNumber = total || 0;

    console.log("Updated rows:", salesReportRows.value);
    console.log("Pagination:", pagination.value);
  } catch (error) {
    console.error("Error loading sales reports:", error);
    Notify.create({
      type: "negative",
      message: "Failed to load sales reports. Please try again.",
      position: "top",
    });
  } finally {
    loading.value = false;
  }
};

// Event handlers
// const onRequest = (props) => {
//   const { page, rowsPerPage } = props.pagination;
//   reloadTableData(page, rowsPerPage);
// };
onMounted(async () => {
  // const { page, rowsPerPage } = props.pagination;
  reloadTableData(route.params.branch_id);
});

const handleRefresh = async (done) => {
  await reloadTableData(1, pagination.value.rowsPerPage);
  done();
};

const onLoadMore = async (index, done) => {
  if (!hasMorePages.value || loading.value) {
    done();
    return;
  }

  const nextPage = pagination.value.page + 1;
  await reloadTableData(nextPage, pagination.value.rowsPerPage);
  done();
};

const handleDialog = (report, label) => {
  if (!report) {
    Notify.create({
      type: "warning",
      message: `No ${label} reports available`,
      position: "top",
    });
    return;
  }

  // $q.dialog({
  //   component: ReportDialog,
  //   componentProps: {
  //     reports: report,
  //     reportLabel: label,
  //   },
  // });
};

// Watch for branchId changes
watch(
  () => props.branchId,
  (newBranchId) => {
    if (newBranchId) {
      salesReportRows.value = [];
      pagination.value.page = 1;
      reloadTableData();
    }
  },
  { immediate: true }
);

// Expose reload method for parent components
defineExpose({
  reloadTableData,
});
</script>

<style scoped lang="scss">
.mobile-card-list {
  min-height: 100vh;
  background: #f5f5f5;
}

.mobile-card {
  transition: transform 0.2s;

  &:active {
    transform: scale(0.99);
  }
}

.full-width-mobile {
  @media (max-width: 600px) {
    width: 100%;
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
}
</style>
