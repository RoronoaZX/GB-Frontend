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
          color="grey-3"
          text-color="black"
          label="Payment Period"
          icon="calendar_today"
          icon-right="expand_more"
          no-caps
        />
        <q-btn
          unelevated
          color="grey-3"
          text-color="black"
          label="Payroll Status"
          icon="analytics"
          icon-right="expand_more"
          no-caps
        />
        <q-btn
          unelevated
          color="grey-3"
          text-color="black"
          label="Advance Filter"
          icon="filter_list"
          icon-right="expand_more"
          no-caps
        />
      </div>
      <div v-if="!isLoading">
        <q-table
          v-if="payrollData.length > 0"
          :rows="payrollData"
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
    console.log("Employee Designation Data Loaded:", employeesData.value);

    // --- Critical Debugging Step: Verify the 'designation' property ---
    if (employeesData.value && employeesData.value.designation) {
      console.log(
        "Employee's regular designation time_in:",
        employeesData.value.designation.time_in
      );
      console.log(
        "Employee's regular designation time_out:",
        employeesData.value.designation.time_out
      );
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
    console.log("payrollData (DTR cut-off data):", payrollData.value);
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
