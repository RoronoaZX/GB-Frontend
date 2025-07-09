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
import ModifiedButton from "src/components/buttons/ModifiedButton.vue";

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

/* From Uiverse.io by S4tyendra */
// .neon-button {
//   position: relative;
//   padding: 0.75em 1.5em;
//   border-radius: 0.625em;
//   border: 2px solid #3cdcdc;
//   font-size: 0.938em;
//   text-transform: uppercase;
//   font-weight: 700;
//   letter-spacing: 0.125em;
//   background: transparent;
//   color: #07bcbc;
//   overflow: hidden;
//   cursor: pointer;
//   box-shadow: 0 0 0 0 transparent;
//   transition: all 0.3s ease-in-out;
// }

// .neon-button:hover {
//   background: rgba(0, 255, 255, 0.1);
//   box-shadow: 0 0 40px 10px rgba(0, 255, 255, 0.5);
//   color: #512929;
// }

// .neon-button::before {
//   content: "";
//   display: block;
//   width: 0px;
//   height: 86%;
//   position: absolute;
//   top: 7%;
//   left: 0%;
//   opacity: 0;
//   background: linear-gradient(90deg, transparent, #00ffff, transparent);
//   box-shadow: 0 0 50px 30px #00ffff;
//   transform: skewX(-20deg);
//   transition: all 0.5s ease-in-out;
// }

// .neon-button:hover::before {
//   animation: neon-shine 0.6s 0s linear;
// }

// @keyframes neon-shine {
//   from {
//     opacity: 0;
//     left: 0%;
//   }

//   50% {
//     opacity: 1;
//   }

//   to {
//     opacity: 0;
//     left: 100%;
//   }
// }

// .neon-button:active {
//   transform: scale(0.95);
//   box-shadow: 0 0 0 0 transparent;
//   transition: all 0.2s ease-in;
// }
/* From Uiverse.io by marcelodolza */
.btn {
  --primary: #ff5569;
  --neutral-1: #f7f8f7;
  --neutral-2: #e7e7e7;
  --radius: 14px;

  cursor: pointer;
  border-radius: var(--radius);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  border: none;
  box-shadow: 0 0.5px 0.5px 1px rgba(255, 255, 255, 0.2),
    0 10px 20px rgba(0, 0, 0, 0.2), 0 4px 5px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
  min-width: 200px;
  padding: 20px;
  height: 68px;
  font-family: "Galano Grotesque", Poppins, Montserrat, sans-serif;
  font-style: normal;
  font-size: 18px;
  font-weight: 600;
}
.btn:hover {
  transform: scale(1.02);
  box-shadow: 0 0 1px 2px rgba(255, 255, 255, 0.3),
    0 15px 30px rgba(0, 0, 0, 0.3), 0 10px 3px -3px rgba(0, 0, 0, 0.04);
}
.btn:active {
  transform: scale(1);
  box-shadow: 0 0 1px 2px rgba(255, 255, 255, 0.3),
    0 10px 3px -3px rgba(0, 0, 0, 0.2);
}
.btn:after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--radius);
  border: 2.5px solid transparent;
  background: linear-gradient(var(--neutral-1), var(--neutral-2)) padding-box,
    linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.45))
      border-box;
  z-index: 0;
  transition: all 0.4s ease;
}
.btn:hover::after {
  transform: scale(1.05, 1.1);
  box-shadow: inset 0 -1px 3px 0 rgba(255, 255, 255, 1);
}
.btn::before {
  content: "";
  inset: 7px 6px 6px 6px;
  position: absolute;
  background: linear-gradient(to top, var(--neutral-1), var(--neutral-2));
  border-radius: 30px;
  filter: blur(0.5px);
  z-index: 2;
}
.state p {
  display: flex;
  align-items: center;
  justify-content: center;
}
.state .icon {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  transform: scale(1.25);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.state .icon svg {
  overflow: visible;
}

/* Outline */
.outline {
  position: absolute;
  border-radius: inherit;
  overflow: hidden;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.4s ease;
  inset: -2px -3.5px;
}
.outline::before {
  content: "";
  position: absolute;
  inset: -100%;
  background: conic-gradient(
    from 180deg,
    transparent 60%,
    white 80%,
    transparent 100%
  );
  animation: spin 2s linear infinite;
  animation-play-state: paused;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.btn:hover .outline {
  opacity: 1;
}
.btn:hover .outline::before {
  animation-play-state: running;
}

/* Letters */
.state p span {
  display: block;
  opacity: 0;
  animation: slideDown 0.8s ease forwards calc(var(--i) * 0.03s);
}
.btn:hover p span {
  opacity: 1;
  animation: wave 0.5s ease forwards calc(var(--i) * 0.02s);
}
.btn:focus p span {
  opacity: 1;
  animation: disapear 0.6s ease forwards calc(var(--i) * 0.03s);
}
@keyframes wave {
  30% {
    opacity: 1;
    transform: translateY(4px) translateX(0) rotate(0);
  }
  50% {
    opacity: 1;
    transform: translateY(-3px) translateX(0) rotate(0);
    color: var(--primary);
  }
  100% {
    opacity: 1;
    transform: translateY(0) translateX(0) rotate(0);
  }
}
@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-20px) translateX(5px) rotate(-90deg);
    color: var(--primary);
    filter: blur(5px);
  }
  30% {
    opacity: 1;
    transform: translateY(4px) translateX(0) rotate(0);
    filter: blur(0);
  }
  50% {
    opacity: 1;
    transform: translateY(-3px) translateX(0) rotate(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0) translateX(0) rotate(0);
  }
}
@keyframes disapear {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translateX(5px) translateY(20px);
    color: var(--primary);
    filter: blur(5px);
  }
}

/* Plane */
.state--default .icon svg {
  animation: land 0.6s ease forwards;
}
.btn:hover .state--default .icon {
  transform: rotate(45deg) scale(1.25);
}
.btn:focus .state--default svg {
  animation: takeOff 0.8s linear forwards;
}
.btn:focus .state--default .icon {
  transform: rotate(0) scale(1.25);
}
@keyframes takeOff {
  0% {
    opacity: 1;
  }
  60% {
    opacity: 1;
    transform: translateX(70px) rotate(45deg) scale(2);
  }
  100% {
    opacity: 0;
    transform: translateX(160px) rotate(45deg) scale(0);
  }
}
@keyframes land {
  0% {
    transform: translateX(-60px) translateY(30px) rotate(-50deg) scale(2);
    opacity: 0;
    filter: blur(3px);
  }
  100% {
    transform: translateX(0) translateY(0) rotate(0);
    opacity: 1;
    filter: blur(0);
  }
}

/* Contrail */
.state--default .icon:before {
  content: "";
  position: absolute;
  top: 50%;
  height: 2px;
  width: 0;
  left: -5px;
  background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.5));
}
.btn:focus .state--default .icon:before {
  animation: contrail 0.8s linear forwards;
}
@keyframes contrail {
  0% {
    width: 0;
    opacity: 1;
  }
  8% {
    width: 15px;
  }
  60% {
    opacity: 0.7;
    width: 80px;
  }
  100% {
    opacity: 0;
    width: 160px;
  }
}

/* States */
.state {
  padding-left: 29px;
  z-index: 2;
  display: flex;
  position: relative;
}
.state--default span:nth-child(4) {
  margin-right: 5px;
}
.state--sent {
  display: none;
}
.state--sent svg {
  transform: scale(1.25);
  margin-right: 8px;
}
.btn:focus .state--default {
  position: absolute;
}
.btn:focus .state--sent {
  display: flex;
}
.btn:focus .state--sent span {
  opacity: 0;
  animation: slideDown 0.8s ease forwards calc(var(--i) * 0.2s);
}
.btn:focus .state--sent .icon svg {
  opacity: 0;
  animation: appear 1.2s ease forwards 0.8s;
}
@keyframes appear {
  0% {
    opacity: 0;
    transform: scale(4) rotate(-40deg);
    color: var(--primary);
    filter: blur(4px);
  }
  30% {
    opacity: 1;
    transform: scale(0.6);
    filter: blur(1px);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
    filter: blur(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
