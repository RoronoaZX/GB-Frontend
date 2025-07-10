<template>
  <q-card flat bordered class="summary-card q-pa-md">
    <q-list dense>
      <div class="row justify-between">
        <q-item>
          <q-item-section avatar>
            <q-icon name="schedule" color="indigo" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-body1 text-weight-meduim">
              Schedule:
              <span class="text-info">{{ employeeSchedule }}</span>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <!-- neon-button -->
          <!-- <q-btn class="btn" label="Proceed" /> -->
          <ModifiedButton />
        </q-item>
      </div>

      <q-separator spaced inset="item" />

      <q-item>
        <q-item-section avatar>
          <q-icon name="money" color="blue-grey" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-body1 text-weight-meduim">
            Rate / Day:
            <span class="text-blue-grey">{{
              formatCurrency(employeesData?.employment_type?.salary)
            }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>

      <div class="row justify-between">
        <q-item class="col-6">
          <q-item-section avatar>
            <q-icon name="event_note" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-body1 text-weight-meduim">
              Total Number Of Days:
              <span class="text-primary">{{ dtrRows.length }}</span>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="col-6">
          <q-item-section avatar>
            <q-icon name="wallet" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-body1 text-weight-bold">
              Expected Salary in {{ dtrRows.length }} days:
              <span class="text-primary">{{ regularPay }}</span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <q-separator spaced inset="item" />

      <!-- Displaying data from summaryData prop -->
      <div v-if="summaryData">
        <div class="row justify-between">
          <q-item class="col-6">
            <q-item-section avatar>
              <q-icon name="timer" color="teal" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body1 text-weight-meduim">
                Total Working Hours:
                <span class="text-teal">
                  {{ summaryData.totalWorkingHoursFormatted || "N/A" }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-6">
            <q-item-section avatar>
              <q-icon name="payments" color="teal" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body1 text-weight-bold">
                Total Working Hours Cost :
                <span class="text-teal">
                  {{ totalWorkingHoursCost || "N/A" }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div class="row justify-between">
          <q-item class="col-6">
            <q-item-section avatar>
              <q-icon name="timelapse" color="orange" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body1 text-weight-meduim">
                Total Overtime Hours :
                <span class="text-orange">
                  {{ summaryData.totalOvertimeFormatted || "N/A" }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-6">
            <q-item-section avatar>
              <q-icon name="attach_money" color="orange" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body1 text-weight-bold">
                Total Overtime Cost :
                <span class="text-orange">
                  {{ totalOvertimeCost || "N/A" }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div class="row justify-between">
          <q-item class="col-6">
            <q-item-section avatar>
              <q-icon name="trending_down" color="negative" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body1 text-weight-meduim">
                Total Undertime / Late :
                <span class="text-negative">
                  {{ summaryData.totalUndertimeFormatted || "N/A" }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-6">
            <q-item-section avatar>
              <q-icon name="money_off" color="negative" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body1 text-weight-bold">
                Total Undertime / Late Cost :
                <span class="text-negative">
                  {{ totalUndertimeCost || "N/A" }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div class="row justify-between">
          <q-item class="col-6">
            <q-item-section avatar>
              <q-icon name="alarm_add" color="positive" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body1 text-weight-meduim">
                TWH + TOH:
                <span class="text-positive">
                  {{ sumTWHTOH || "N/A" }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-6">
            <q-item-section avatar>
              <q-icon name="account_balance_wallet" color="positive" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body1 text-weight-bold">
                TWH + TOH Cost :
                <span class="text-positive">
                  {{ sumTWHTOHCost || "N/A" }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
      <div v-else class="text-grey q-mt-md">Loading summary data...</div>
    </q-list>
  </q-card>
  <!-- Removed {{ summaryData }} as it's for debugging -->
</template>

<script setup>
import { useQuasar } from "quasar";
import { useEmployeeStore } from "src/stores/employee";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
// Removed imports for useDTRCalculations as they are no longer used here
import ModifiedButton from "src/components/buttons/ModifiedButton.vue";

const props = defineProps({
  dtrRows: Array,
  employeeData: Object,
  dtrRecord: Object,
  summaryData: {
    type: Object,
    default: null, // Initialize as null or an empty object
  },
});

const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);
const route = useRoute();
const $q = useQuasar();
const employee_id = route.params.employee_id || "";
const employeesData = ref(null); // This will hold the fetched employee data

// Computed property for employee's schedule display
const employeeSchedule = computed(() => {
  const designation = employeesData.value?.designation;
  if (designation?.time_in && designation?.time_out) {
    return `${designation.time_in} - ${designation.time_out}`;
  }
  return "N/A";
});

const fetchEmployeeDetails = async () => {
  try {
    await employeeStore.fetchCertianEmployeeWithEmploymentTypeAndDesignation(
      employee_id
    );
    employeesData.value = employees.value; // Assign fetched data
    if (
      !(
        employeesData.value &&
        employeesData.value.designation &&
        employeesData.value.employment_type
      )
    ) {
      $q.notify({
        type: "negative",
        message:
          "Employee's regular work hours or salary data not found. Calculations might be inaccurate.",
      });
    }
  } catch (error) {
    console.error("Error fetching employee details:", error);
    $q.notify({
      type: "negative",
      message: "Error fetching employee details. Please try again.",
    });
  }
};

onMounted(async () => {
  // If employeeData is already provided via props, use it directly.
  // Otherwise, fetch it.
  if (props.employeeData) {
    employeesData.value = props.employeeData;
  } else {
    await fetchEmployeeDetails();
  }
});

// Watch for changes in props.employeeData in case it's loaded asynchronously
watch(
  () => props.employeeData,
  (newVal) => {
    if (newVal) {
      employeesData.value = newVal;
    }
  },
  {
    immediate: true, // Run handler immediately on component mount
    deep: true, // Watch for deep changes in the object
  }
);

// Helper function to format currency
const formatCurrency = (value) => {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue === 0) {
    return "₱ 0.00";
  }
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(numValue);
};

// --- REMOVED ALL CORE CALCULATION LOGIC FROM HERE ---
// The `overallCalculations` computed property and all related helper functions
// (parseTimeToDate, getBreakDuration, calculateTotalBreakMinutesPure, calculateRowTimes)
// have been removed. These calculations are now solely handled by DTRTable.vue.
const hourlyRate = computed(() => {
  const salary = parseFloat(employeesData.value?.employment_type?.salary || 0);
  return salary > 0 ? salary / 8 : 0; // Assuming 9 working hours per day
});

const parseHourMinute = (str) => {
  if (!str || typeof str !== "string") return 0;
  const parts = str.split("h");
  const hours = parseInt(parts[0]?.trim() || 0);
  const minutes = parseInt(parts[1]?.replace("m", "").trim() || 0);
  return hours + minutes / 60;
};

const formatHoursAndMinutes = (totalHours) => {
  if (isNaN(totalHours) || totalHours < 0) return "0h 0m"; // This line ensures "0h 0m" for invalid or negative
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);
  return `${hours}h ${minutes}m`;
};

const totalWorkingHoursCost = computed(() => {
  const hours = parseHourMinute(props.summaryData?.totalWorkingHoursFormatted);
  return formatCurrency(hours * hourlyRate.value);
});

const totalOvertimeCost = computed(() => {
  const hours = parseHourMinute(props.summaryData?.totalOvertimeFormatted);
  return formatCurrency(hours * hourlyRate.value);
});

const totalUndertimeCost = computed(() => {
  const hours = parseHourMinute(props.summaryData?.totalUndertimeFormatted);
  return formatCurrency(hours * hourlyRate.value);
});

const totalHoursWithOTCost = computed(() => {
  const hours = parseHourMinute(
    props.summaryData?.formattedTotalHoursWithOvertime
  );
  return formatCurrency(hours * hourlyRate.value);
});

const sumTWHTOH = computed(() => {
  const totalWorkingHours = parseHourMinute(
    props.summaryData?.totalWorkingHoursFormatted
  );
  const totalOverTimeHours = parseHourMinute(
    props.summaryData?.totalOvertimeFormatted
  );

  return formatHoursAndMinutes(totalWorkingHours + totalOverTimeHours);
});

const sumTWHTOHCost = computed(() => {
  const totalWorkingHours = parseHourMinute(
    props.summaryData?.totalWorkingHoursFormatted
  );
  const totalOvertimeHours = parseHourMinute(
    props.summaryData?.totalOvertimeFormatted
  );

  const sum = totalWorkingHours + totalOvertimeHours;

  return formatCurrency(sum * hourlyRate.value);
});

// Regular Pay Calculation (based on daily rate * number of days)
const regularPay = computed(() => {
  const salary = employeesData.value?.employment_type?.salary;
  const totalNumberOfDays = props?.dtrRows?.length || 0;
  const ratePerDay = parseFloat(salary || "0");

  if (isNaN(ratePerDay) || ratePerDay <= 0 || totalNumberOfDays === 0) {
    return "₱ 0.00";
  }

  const calculatedExpectedSalary = ratePerDay * totalNumberOfDays;
  return formatCurrency(calculatedExpectedSalary);
});
</script>

<style scoped>
.summary-card {
  min-height: 200px;
}
</style>
