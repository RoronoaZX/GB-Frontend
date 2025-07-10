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
                  {{
                    overallCalculations.formattedTotalWorkingHoursCost || "N/A"
                  }}
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
                  {{ overallCalculations.formattedTotalOvertimeCost || "N/A" }}
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
                  {{ overallCalculations.formattedTotalUndertimeCost || "N/A" }}
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
                  {{
                    overallCalculations.formattedTotalHoursWithOvertime || "N/A"
                  }}
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
                  {{ overallCalculations.formattedOverallTotalSalary || "N/A" }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
      <div v-else class="text-grey q-mt-md">Loading summary data...</div>
    </q-list>
  </q-card>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useEmployeeStore } from "src/stores/employee";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
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
  if (props.employeeData) {
    employeesData.value = props.employeeData;
  } else {
    await fetchEmployeeDetails();
  }
});

watch(
  () => props.employeeData,
  (newVal) => {
    if (newVal) {
      employeesData.value = newVal;
    }
  },
  {
    immediate: true,
    deep: true,
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

// Helper function to convert "Xh Ym" string to total minutes
const convertHoursMinutesToMinutes = (formattedString) => {
  if (
    !formattedString ||
    typeof formattedString !== "string" ||
    formattedString === "N/A" ||
    formattedString === "—"
  ) {
    return 0;
  }
  const parts = formattedString.match(/(\d+)h\s*(\d+)m/);
  if (parts) {
    const hours = parseInt(parts[1], 10);
    const minutes = parseInt(parts[2], 10);
    return hours * 60 + minutes;
  }
  return 0;
};

// --- NEW: Overall Calculations Computed Property (re-introduced) ---
const overallCalculations = computed(() => {
  const employee = employeesData.value;
  const salary = parseFloat(employee?.employment_type?.salary || 0);

  // Default values if data is not available
  if (!employee || !salary || !props.summaryData) {
    return {
      totalWorkingHoursCost: 0,
      formattedTotalWorkingHoursCost: formatCurrency(0),
      totalOvertimeCost: 0,
      formattedTotalOvertimeCost: formatCurrency(0),
      totalUndertimeCost: 0,
      formattedTotalUndertimeCost: formatCurrency(0),
      totalHoursWithOvertime: 0,
      formattedTotalHoursWithOvertime: "0h 0m",
      overallTotalSalary: 0,
      formattedOverallTotalSalary: formatCurrency(0),
    };
  }

  // Retrieve formatted time strings from summaryData prop
  const totalWorkingHoursFormatted =
    props.summaryData.totalWorkingHoursFormatted || "0h 0m";
  const totalOvertimeFormatted =
    props.summaryData.totalOvertimeFormatted || "0h 0m";
  const totalUndertimeFormatted =
    props.summaryData.totalUndertimeFormatted || "0h 0m";

  // Convert formatted strings back to minutes for calculations
  const totalWorkingMinutes = convertHoursMinutesToMinutes(
    totalWorkingHoursFormatted
  );
  const totalOvertimeMinutes = convertHoursMinutesToMinutes(
    totalOvertimeFormatted
  );
  const totalUndertimeMinutes = convertHoursMinutesToMinutes(
    totalUndertimeFormatted
  );

  const standardWorkHoursPerDay = 8; // Assuming 8 hours per day for hourly rate calculation
  const hourlyRate = salary / standardWorkHoursPerDay;
  const overtimeRateMultiplier = 1.25; // Example: 1.25x for overtime

  // Calculate costs
  const totalWorkingHoursCost = (totalWorkingMinutes / 60) * hourlyRate;
  const totalOvertimeCost =
    (totalOvertimeMinutes / 60) * hourlyRate * overtimeRateMultiplier;
  const totalUndertimeCost = (totalUndertimeMinutes / 60) * hourlyRate; // Undertime reduces pay

  const totalHoursWithOvertimeMinutes =
    totalWorkingMinutes + totalOvertimeMinutes;
  const overallTotalSalary =
    totalWorkingHoursCost + totalOvertimeCost - totalUndertimeCost; // Adjusted for undertime deduction

  return {
    totalWorkingHoursCost: totalWorkingHoursCost,
    formattedTotalWorkingHoursCost: formatCurrency(totalWorkingHoursCost),

    totalOvertimeCost: totalOvertimeCost,
    formattedTotalOvertimeCost: formatCurrency(totalOvertimeCost),

    totalUndertimeCost: totalUndertimeCost,
    formattedTotalUndertimeCost: formatCurrency(totalUndertimeCost),

    totalHoursWithOvertime: totalHoursWithOvertimeMinutes,
    formattedTotalHoursWithOvertime: formatMinutesToHoursMinutes(
      totalHoursWithOvertimeMinutes
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

// Helper function to format minutes to "Xh Ym" string (re-added for internal use if needed, or can be removed if only using formatted strings from prop)
const formatMinutesToHoursMinutes = (totalMinutes) => {
  if (totalMinutes === null || totalMinutes === undefined || totalMinutes < 0)
    return "0h 0m";
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};
</script>

<style scoped>
.summary-card {
  min-height: 200px;
}
</style>
