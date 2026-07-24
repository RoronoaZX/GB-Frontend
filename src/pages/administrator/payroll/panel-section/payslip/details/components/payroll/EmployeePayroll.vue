<template>
  <q-page padding class="bg-grey-2">
    <div class="q-pa-md bg-white rounded-borders">
      <div class="row items-center q-gutter-md q-mb-lg">
        <q-input
          outlined
          dense
          v-model="search"
          placeholder="Search Payroll"
          class="col-12 col-md-3"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          unelevated
          :color="selectedPeriod !== 'all' ? 'teal' : ($q.dark.isActive ? 'grey-9' : 'grey-3')"
          :text-color="selectedPeriod !== 'all' ? 'white' : ($q.dark.isActive ? 'grey-3' : 'black')"
          :label="periodLabel"
          icon="calendar_today"
          icon-right="expand_more"
          no-caps
        >
          <q-menu style="min-width: 250px" class="q-pa-sm">
            <q-list dense>
              <q-item-label header class="text-weight-bold text-teal">Payment Period</q-item-label>
              <q-item
                v-for="opt in periodOptions"
                :key="opt.value"
                clickable
                v-close-popup="opt.value !== 'custom'"
                @click="selectedPeriod = opt.value"
                :active="selectedPeriod === opt.value"
                active-class="bg-teal-1 text-teal text-weight-bold"
              >
                <q-item-section>{{ opt.label }}</q-item-section>
              </q-item>

              <template v-if="selectedPeriod === 'custom'">
                <q-separator class="q-my-xs" />
                <div class="q-pa-xs q-gutter-y-xs">
                  <q-input outlined dense v-model="customDateStart" type="date" label="Start Date" />
                  <q-input outlined dense v-model="customDateEnd" type="date" label="End Date" />
                </div>
              </template>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn
          unelevated
          :color="selectedStatus !== 'all' ? 'teal' : ($q.dark.isActive ? 'grey-9' : 'grey-3')"
          :text-color="selectedStatus !== 'all' ? 'white' : ($q.dark.isActive ? 'grey-3' : 'black')"
          :label="statusLabel"
          icon="analytics"
          icon-right="expand_more"
          no-caps
        >
          <q-menu style="min-width: 200px" class="q-pa-sm">
            <q-list dense>
              <q-item-label header class="text-weight-bold text-teal">Payroll Status</q-item-label>
              <q-item
                v-for="opt in statusOptions"
                :key="opt.value"
                clickable
                v-close-popup
                @click="selectedStatus = opt.value"
                :active="selectedStatus === opt.value"
                active-class="bg-teal-1 text-teal text-weight-bold"
              >
                <q-item-section>{{ opt.label }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn
          unelevated
          :color="hasActiveAdvanceFilter ? 'teal' : ($q.dark.isActive ? 'grey-9' : 'grey-3')"
          :text-color="hasActiveAdvanceFilter ? 'white' : ($q.dark.isActive ? 'grey-3' : 'black')"
          label="Advance Filter"
          icon="filter_list"
          icon-right="expand_more"
          no-caps
        >
          <q-menu style="min-width: 260px" class="q-pa-md">
            <div class="text-subtitle2 text-weight-bold text-teal q-mb-sm">Advance Filters</div>
            <div class="q-gutter-y-sm">
              <div>
                <div class="text-caption text-grey-8">Number of Days Range</div>
                <div class="row q-col-gutter-xs">
                  <div class="col-6">
                    <q-input outlined dense v-model.number="minDays" type="number" placeholder="Min Days" />
                  </div>
                  <div class="col-6">
                    <q-input outlined dense v-model.number="maxDays" type="number" placeholder="Max Days" />
                  </div>
                </div>
              </div>

              <div>
                <div class="text-caption text-grey-8">Sort Cutoffs</div>
                <q-btn-toggle
                  v-model="sortOrder"
                  dense
                  spread
                  unelevated
                  toggle-color="teal"
                  :options="[
                    { label: 'Newest', value: 'desc' },
                    { label: 'Oldest', value: 'asc' }
                  ]"
                />
              </div>

              <q-separator class="q-my-sm" />

              <div class="row justify-between items-center">
                <q-btn flat label="Reset All" color="negative" dense no-caps @click="resetAllFilters" />
                <q-btn unelevated label="Apply" color="teal" dense no-caps v-close-popup />
              </div>
            </div>
          </q-menu>
        </q-btn>

        <q-btn
          v-if="isAnyFilterActive"
          flat
          dense
          round
          icon="clear"
          color="negative"
          @click="resetAllFilters"
        >
          <q-tooltip>Clear All Filters</q-tooltip>
        </q-btn>
      </div>
      <div v-if="!isLoading">
        <q-table
          v-if="filteredPayrollData.length > 0"
          :rows="filteredPayrollData"
          :columns="columns"
          row-key="id"
          flat
          separator="horizontal"
          :rows-per-page-options="[0]"
          hide-bottom
          class="payroll-table"
        >
          <template v-slot:top-right>
            <q-btn
              round
              unelevated
              color="primary"
              icon="add"
              text-color="white"
              size="sm"
            />
          </template>

          <template v-slot:header-cell="props">
            <q-th :props="props" class="text-grey-7">
              <q-icon :name="props.col.icon" size="1.2em" class="q-mr-sm" />
              {{ props.col.label }}
            </q-th>
          </template>

          <template v-slot:body-cell-payRuns="props">
            <q-td :props="props">
              {{ props.row.from }} to {{ props.row.end }}
            </q-td>
          </template>

          <template v-slot:body-cell-total_regular_hours="props">
            <q-td :props="props">
              {{ calculateTotalHoursForCutoff(props.row) }}
            </q-td>
          </template>

          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <div class="row items-center no-wrap q-gutter-x-sm">
                <q-btn
                  dense
                  label="View"
                  color="dark"
                  unelevated
                  no-caps
                  padding="xs md"
                  class="action-button"
                  @click="handleProcessEmployeeDTR(props.row)"
                />
                <q-btn
                  flat
                  round
                  dense
                  icon="more_horiz"
                  color="grey-7"
                  class="q-ml-auto"
                >
                  <q-menu>
                    <q-list dense>
                      <q-item clickable v-close-popup>
                        <q-item-section>View Details</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section class="text-negative"
                          >Delete</q-item-section
                        >
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </q-td>
          </template>
        </q-table>
        <div v-else class="text-center q-pa-xl text-grey-7">
          <q-icon name="event_busy" size="4em" />
          <div class="text-h6 q-mt-md">No Payroll Records</div>
          <p>
            There is no Payroll Cut Off data for this employee in the selected
            period
          </p>
        </div>
      </div>
      <div v-else class="text-center q-pa-xl">
        <q-spinner-dots color="primary" size="2em" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePayrollStore } from "src/stores/payroll";
import { useEmployeeStore } from "src/stores/employee";
import { useDTRStore } from "src/stores/dtr";
import { useQuasar, date } from "quasar"; // 'date' utility is crucial here
import EmployeeDTRDialog from "./EmployeeDTRDialog.vue";

const $q = useQuasar();

const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);
const employeesData = ref(null); // This will hold the specific employee's details
const dtrStore = useDTRStore();
const route = useRoute();
const employee_id = route.params.employee_id || "";
const search = ref("");
const payrollData = computed(() => dtrStore.dtrCutOffData);
const isLoading = ref(true);

// --- Filter State & Options ---
const selectedPeriod = ref("all");
const customDateStart = ref("");
const customDateEnd = ref("");

const selectedStatus = ref("all");

const minDays = ref(null);
const maxDays = ref(null);
const sortOrder = ref("desc");

const periodOptions = [
  { label: "All Periods", value: "all" },
  { label: "This Month", value: "this_month" },
  { label: "Last Month", value: "last_month" },
  { label: "This Quarter", value: "this_quarter" },
  { label: "Custom Range", value: "custom" },
];

const statusOptions = [
  { label: "All Statuses", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Pending", value: "pending" },
  { label: "Canceled", value: "canceled" },
];

const periodLabel = computed(() => {
  if (selectedPeriod.value === "all") return "Payment Period";
  const found = periodOptions.find((p) => p.value === selectedPeriod.value);
  return found ? found.label : "Payment Period";
});

const statusLabel = computed(() => {
  if (selectedStatus.value === "all") return "Payroll Status";
  const found = statusOptions.find((s) => s.value === selectedStatus.value);
  return found ? found.label : "Payroll Status";
});

const hasActiveAdvanceFilter = computed(() => {
  return minDays.value !== null || maxDays.value !== null || sortOrder.value !== "desc";
});

const isAnyFilterActive = computed(() => {
  return (
    search.value.trim() !== "" ||
    selectedPeriod.value !== "all" ||
    selectedStatus.value !== "all" ||
    hasActiveAdvanceFilter.value
  );
});

const resetAllFilters = () => {
  search.value = "";
  selectedPeriod.value = "all";
  customDateStart.value = "";
  customDateEnd.value = "";
  selectedStatus.value = "all";
  minDays.value = null;
  maxDays.value = null;
  sortOrder.value = "desc";
};

const filteredPayrollData = computed(() => {
  let list = Array.isArray(payrollData.value) ? [...payrollData.value] : [];

  // 1. Search Query Filter
  if (search.value && search.value.trim() !== "") {
    const q = search.value.toLowerCase().trim();
    list = list.filter((row) => {
      const fromStr = (row.from || "").toLowerCase();
      const endStr = (row.end || "").toLowerCase();
      const statusStr = (row.status || "").toLowerCase();
      const daysCount = String(row.records ? row.records.length : 0);
      return (
        fromStr.includes(q) ||
        endStr.includes(q) ||
        statusStr.includes(q) ||
        daysCount.includes(q)
      );
    });
  }

  // 2. Payment Period Filter
  if (selectedPeriod.value !== "all") {
    const now = new Date();
    if (selectedPeriod.value === "this_month") {
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      list = list.filter((row) => {
        const rowDate = row.from ? new Date(row.from) : null;
        return (
          rowDate &&
          !isNaN(rowDate.getTime()) &&
          rowDate.getFullYear() === currentYear &&
          rowDate.getMonth() === currentMonth
        );
      });
    } else if (selectedPeriod.value === "last_month") {
      const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const targetYear = lastMonthDate.getFullYear();
      const targetMonth = lastMonthDate.getMonth();
      list = list.filter((row) => {
        const rowDate = row.from ? new Date(row.from) : null;
        return (
          rowDate &&
          !isNaN(rowDate.getTime()) &&
          rowDate.getFullYear() === targetYear &&
          rowDate.getMonth() === targetMonth
        );
      });
    } else if (selectedPeriod.value === "this_quarter") {
      const currentQuarter = Math.floor(now.getMonth() / 3);
      const currentYear = now.getFullYear();
      list = list.filter((row) => {
        const rowDate = row.from ? new Date(row.from) : null;
        return (
          rowDate &&
          !isNaN(rowDate.getTime()) &&
          rowDate.getFullYear() === currentYear &&
          Math.floor(rowDate.getMonth() / 3) === currentQuarter
        );
      });
    } else if (selectedPeriod.value === "custom") {
      if (customDateStart.value) {
        const startDate = new Date(customDateStart.value);
        list = list.filter((row) => {
          const rowDate = row.from ? new Date(row.from) : null;
          return rowDate && !isNaN(rowDate.getTime()) && rowDate >= startDate;
        });
      }
      if (customDateEnd.value) {
        const endDate = new Date(customDateEnd.value);
        endDate.setHours(23, 59, 59, 999);
        list = list.filter((row) => {
          const rowDate = row.end ? new Date(row.end) : null;
          return rowDate && !isNaN(rowDate.getTime()) && rowDate <= endDate;
        });
      }
    }
  }

  // 3. Payroll Status Filter
  if (selectedStatus.value !== "all") {
    list = list.filter((row) => {
      const rowStatus = (row.status || "pending").toLowerCase();
      return rowStatus === selectedStatus.value.toLowerCase();
    });
  }

  // 4. Advance Filter: Days Range
  if (minDays.value !== null && !isNaN(minDays.value)) {
    list = list.filter((row) => (row.records ? row.records.length : 0) >= minDays.value);
  }
  if (maxDays.value !== null && !isNaN(maxDays.value)) {
    list = list.filter((row) => (row.records ? row.records.length : 0) <= maxDays.value);
  }

  // 5. Advance Filter: Sorting
  list.sort((a, b) => {
    const dateA = a.from ? new Date(a.from).getTime() : 0;
    const dateB = b.from ? new Date(b.from).getTime() : 0;
    return sortOrder.value === "asc" ? dateA - dateB : dateB - dateA;
  });

  return list;
});

// Function to handle opening the DTR details dialog
const handleProcessEmployeeDTR = (dtrRecords) => {
  $q.dialog({
    component: EmployeeDTRDialog, // Pass the imported component directly (Quasar v2+ approach)
    componentProps: {
      dtrRecord: dtrRecords, // Note: dtrRecords is an array of daily DTR entries
    },
  });
};

// --- Lifecycle Hook ---
onMounted(async () => {
  if (!employee_id) {
    console.error("Employee ID is missing.");
    $q.notify({
      type: "negative",
      message: "Could not load data: Employee ID not found.",
    });
    return;
  }

  try {
    await fetchEmployeeDetails();
    await fetchPayrollPerCutOff();
  } catch (error) {
    console.error("Error during initial data fetch:", error);
    $q.notify({ type: "negative", message: "Failed to load payroll data." });
  }
});

// --- Data Fetching Functions ---
const fetchEmployeeDetails = async () => {
  try {
    await employeeStore.fetchCertianEmployeeWithEmploymentTypeAndDesignation(
      employee_id
    );
    // Assuming `employees.value` now contains the single employee object directly
    employeesData.value = employees.value;
    /* console.log("Employee Designation Data Loaded:", employeesData.value); */

    // --- Critical Debugging Step: Verify the 'designation' property ---
    if (employeesData.value && employeesData.value.designation) {
      /* console.log(
        "Employee's regular designation time_in:",
        employeesData.value.designation.time_in
      ); */
      /* console.log(
        "Employee's regular designation time_out:",
        employeesData.value.designation.time_out
      ); */
    } else {
      console.error(
        "Employee designation or its time_in/time_out is missing from the fetched employee data!"
      );
      $q.notify({
        type: "negative",
        message:
          "Employee's regular work hours not found. Cannot calculate total hours.",
      });
    }
  } catch (error) {
    console.error("Error fetching employee details:", error);
    throw error;
  }
};

const fetchPayrollPerCutOff = async () => {
  isLoading.value = true;
  try {
    await dtrStore.fetchDTRPayrollPerCutOff(employee_id);
    /* console.log("payrollData (DTR cut-off data):", payrollData.value); */
  } catch (error) {
    console.error("Error fetching payroll data:", error);
    throw error;
  } finally {
    isLoading.value = false;
  }
};

// --- Table Columns Definition ---
const columns = [
  {
    name: "payRuns",
    label: "Pay Runs",
    field: (row) => `${row.from} to ${row.end}`,
    align: "center",
    sortable: true,
    icon: "description",
  },
  {
    name: "number_of_days",
    label: "Number Of Days",
    field: (row) => row.records.length,
    align: "center",
    sortable: true,
    icon: "receipt_long",
  },
  {
    name: "action",
    label: "Action",
    // Assuming 'status' is a field in your payrollData rows that dictates action
    // If you don't have a 'status' field, you can set field: null
    field: "status",
    align: "left",
    icon: "bolt",
  },
];
</script>

<style lang="scss">
.payroll-table {
  .q-table__top {
    padding-left: 0;
    padding-right: 0;
  }
  thead th {
    font-weight: 600;
    background-color: #f7f8fa !important;
  }
  tbody td {
    font-size: 0.875rem;
    color: #555;
  }
}

.status-chip {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 16px;
  font-weight: 500;
  font-size: 0.8rem;
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 8px;
  }

  &.paid {
    background-color: rgba(76, 175, 80, 0.1);
    color: #2e7d32;
    .dot {
      background-color: #4caf50;
    }
  }
  &.canceled {
    background-color: rgba(244, 67, 54, 0.1);
    color: #c62828;
    .dot {
      background-color: #f44336;
    }
  }
  &.draft {
    background-color: rgba(158, 158, 158, 0.1);
    color: #616161;
    .dot {
      background-color: #9e9e9e;
    }
  }
}

.action-button {
  border-radius: 6px;
}
</style>
