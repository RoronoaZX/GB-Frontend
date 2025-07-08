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
          <q-btn label="proceed" />
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
              <span>{{ regularPay }}</span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <q-separator spaced inset="item" />

      <div class="row justify-between">
        <q-item class="col-6">
          <q-item-section avatar>
            <q-icon name="timer" color="teal" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-body1 text-weight-meduim">
              Total Working Hours:
              <span class="text-teal">
                {{ overallCalculations.formattedTotalWorkingHours }}
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
                {{ overallCalculations.formattedTotalWorkingHoursCost }}
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
                {{ overallCalculations.formattedTotalOvertimeHours }}
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
                {{ overallCalculations.formattedTotalOvertimeCost }}
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
                {{ overallCalculations.formattedTotalUndertimeHours }}
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
                {{ overallCalculations.formattedTotalUndertimeCost }}
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
                {{ overallCalculations.formattedTotalHoursWithOvertime }}
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
                {{ overallCalculations.formattedOverallTotalSalary }}
              </span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </q-card>
</template>

<script setup>
import { date, useQuasar } from "quasar";
import { useEmployeeStore } from "src/stores/employee";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
  formatMinutesToHoursMinutes,
  convertHoursMinutesToMinutes,
} from "src/composables/employee-payroll-dtr/useDTRCalculations";

const props = defineProps({
  dtrRows: Array,
  employeeData: Object,
  dtrRecord: Object,
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

// Helper function to parse time string (e.g., "08:00 AM") and set it on a specific date.
const parseTimeToDate = (timeString, dateObj) => {
  if (!timeString || !dateObj) return null;

  const match = timeString.match(/(\d+):(\d+)\s*(AM|PM)?/i);
  if (!match) return null;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const ampm = match[3] ? match[3].toUpperCase() : "";

  if (ampm === "PM" && hours < 12) {
    hours += 12;
  } else if (ampm === "AM" && hours === 12) {
    hours = 0;
  }

  const newDate = new Date(dateObj);
  newDate.setHours(hours, minutes, 0, 0);
  return newDate;
};

// --- Core Calculation Logic ---
const overallCalculations = computed(() => {
  let totalWorkingMinutes = 0;
  let totalOvertimeMinutes = 0;
  let totalUndertimeMinutes = 0;

  const employee = employeesData.value;
  const rows = props.dtrRows;
  const dailySalary = parseFloat(employee?.employment_type?.salary || 0);
  const standardWorkHoursPerDay = 8;
  const hourlyRate = dailySalary / standardWorkHoursPerDay;
  const overtimeRateMultiplier = 1.0; // This can be adjusted for actual OT rates

  if (!employee?.designation || !rows?.length) {
    return {
      totalWorkingHours: 0,
      formattedTotalWorkingHours: formatMinutesToHoursMinutes(0),
      totalWorkingHoursCost: 0,
      formattedTotalWorkingHoursCost: formatCurrency(0),
      totalOvertimeHours: 0,
      formattedTotalOvertimeHours: formatMinutesToHoursMinutes(0),
      totalOvertimeCost: 0,
      formattedTotalOvertimeCost: formatCurrency(0),
      totalUndertimeHours: 0,
      formattedTotalUndertimeHours: formatMinutesToHoursMinutes(0),
      totalUndertimeCost: 0,
      formattedTotalUndertimeCost: formatCurrency(0),
      totalHoursWithOvertime: 0,
      formattedTotalHoursWithOvertime: formatMinutesToHoursMinutes(0),
      overallTotalSalary: 0,
      formattedOverallTotalSalary: formatCurrency(0),
    };
  }

  const designationTimeInStr = employee.designation.time_in;
  const designationTimeOutStr = employee.designation.time_out;

  rows.forEach((row) => {
    // --- Working Hours Calculation ---
    if (row.time_in && row.time_out) {
      const actualIn = new Date(row.time_in);
      const actualOut = new Date(row.time_out);

      if (!isNaN(actualIn.getTime()) && !isNaN(actualOut.getTime())) {
        const scheduledIn = parseTimeToDate(designationTimeInStr, actualIn);
        const scheduledOut = parseTimeToDate(designationTimeOutStr, actualOut);

        if (scheduledIn && scheduledOut) {
          const effectiveIn = actualIn > scheduledIn ? actualIn : scheduledIn;
          const effectiveOut =
            actualOut < scheduledOut ? actualOut : scheduledOut;

          if (effectiveOut > effectiveIn) {
            const totalMs = effectiveOut.getTime() - effectiveIn.getTime();
            // Subtract 1 hour for lunch break (60 minutes)
            const adjustedMs = totalMs - 60 * 60 * 1000;
            if (adjustedMs > 0) {
              totalWorkingMinutes += Math.floor(adjustedMs / (1000 * 60));
            }
          }
        }
      }
    }

    // --- Overtime Calculation ---
    if (
      row.ot_status === "approved" &&
      row.overtime_start &&
      row.overtime_end
    ) {
      const otIn = new Date(row.overtime_start);
      const otOut = new Date(row.overtime_end);

      if (!isNaN(otIn.getTime()) && !isNaN(otOut.getTime()) && otOut > otIn) {
        const otMs = otOut.getTime() - otIn.getTime();
        totalOvertimeMinutes += Math.floor(otMs / (1000 * 60));
      }
    }

    // --- Undertime/Late Calculation ---
    if (row.time_in && row.time_out) {
      const actualIn = new Date(row.time_in);
      const actualOut = new Date(row.time_out);

      if (!isNaN(actualIn.getTime()) && !isNaN(actualOut.getTime())) {
        const scheduledIn = parseTimeToDate(designationTimeInStr, actualIn);
        const scheduledOut = parseTimeToDate(designationTimeOutStr, actualOut);

        if (scheduledIn && scheduledOut) {
          const expectedMs = scheduledOut.getTime() - scheduledIn.getTime();
          // Expected working minutes minus 1 hour lunch
          const expectedWorkingMinutes = Math.floor(
            (expectedMs - 60 * 60 * 1000) / (1000 * 60)
          );

          const effectiveIn = actualIn > scheduledIn ? actualIn : scheduledIn;
          const effectiveOut =
            actualOut < scheduledOut ? actualOut : scheduledOut;

          let actualCountedMinutes = 0;
          if (effectiveOut > effectiveIn) {
            const actualMs = effectiveOut.getTime() - effectiveIn.getTime();
            // Actual counted minutes minus 1 hour lunch
            actualCountedMinutes = Math.floor(
              (actualMs - 60 * 60 * 1000) / (1000 * 60)
            );
          }

          const undertimeMins = expectedWorkingMinutes - actualCountedMinutes;
          if (undertimeMins > 0) {
            totalUndertimeMinutes += undertimeMins;
          }
        }
      }
    }
  });

  const totalRegularHours = totalWorkingMinutes / 60;
  const totalOvertimeHours = totalOvertimeMinutes / 60;
  const totalUndertimeHours = totalUndertimeMinutes / 60;

  const totalWorkingHoursCost = totalRegularHours * hourlyRate;
  const totalOvertimeCost =
    totalOvertimeHours * hourlyRate * overtimeRateMultiplier;
  const totalUndertimeCost = totalUndertimeHours * hourlyRate;
  const overallTotalSalary = totalWorkingHoursCost + totalOvertimeCost;

  return {
    totalWorkingHours: totalWorkingMinutes,
    formattedTotalWorkingHours:
      formatMinutesToHoursMinutes(totalWorkingMinutes),
    totalWorkingHoursCost: totalWorkingHoursCost,
    formattedTotalWorkingHoursCost: formatCurrency(totalWorkingHoursCost),

    totalOvertimeHours: totalOvertimeMinutes,
    formattedTotalOvertimeHours:
      formatMinutesToHoursMinutes(totalOvertimeMinutes),
    totalOvertimeCost: totalOvertimeCost,
    formattedTotalOvertimeCost: formatCurrency(totalOvertimeCost),

    totalUndertimeHours: totalUndertimeMinutes,
    formattedTotalUndertimeHours: formatMinutesToHoursMinutes(
      totalUndertimeMinutes
    ),
    totalUndertimeCost: totalUndertimeCost,
    formattedTotalUndertimeCost: formatCurrency(totalUndertimeCost),

    totalHoursWithOvertime: totalWorkingMinutes + totalOvertimeMinutes,
    formattedTotalHoursWithOvertime: formatMinutesToHoursMinutes(
      totalWorkingMinutes + totalOvertimeMinutes
    ),
    overallTotalSalary: overallTotalSalary,
    formattedOverallTotalSalary: formatCurrency(overallTotalSalary),
  };
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
<style lang="scss" scoped>
.summary-card {
  background-color: #ffffff; // White background for summary card
  border-radius: 8px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1); // More prominent shadow
  border: 1px solid #e0e0e0; // Light border
}
.q-list--dense > .q-item {
  min-height: 40px; // Slightly increase item height for better touch targets
  padding: 10px 18px; // Adjust padding
}

.q-item-label {
  font-size: 14px; // Standard text size for labels
}

.q-item-section--avatar {
  min-width: 40px; // Ensure consistent icon spacing
}

.q-icon {
  font-size: 20px; // Slightly larger icons
}

.q-separator {
  background-color: #e8e8e8; // Lighter separator color
  margin: 10px 0; // Spacing for separators
}
</style>
