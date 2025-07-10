<template>
  <q-card flat bordered class="summary-card q-pa-lg">
    <q-list dense>
      <div class="q-mb-lg text-center">
        <q-item-label class="text-h5 text-weight-bold text-grey-9">
          Checking Earning Summary
        </q-item-label>
      </div>

      <div class="row items-center q-mb-md">
        <q-item class="col-grow q-pa-none">
          <q-item-section avatar class="q-mr-sm">
            <q-icon name="schedule" color="indigo-7" size="sm" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-body1 text-weight-medium text-grey-8">
              Schedule:
              <span class="text-indigo-7 text-weight-semibold">{{
                employeeSchedule
              }}</span>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="q-pa-none">
          <ModifiedButton label="Proceed Payslip" />
        </q-item>
      </div>

      <q-separator spaced="md" class="q-my-md" />

      <q-item class="q-mb-sm q-pa-none">
        <q-item-section avatar class="q-mr-sm">
          <q-icon name="money" color="blue-grey-7" size="sm" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-body1 text-weight-medium text-grey-8">
            Rate / Day:
            <span class="text-blue-grey-7 text-weight-semibold">{{
              formatCurrency(employeesData?.employment_type?.salary)
            }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>

      <div class="row q-col-gutter-y-sm">
        <q-item class="col-12 col-md-6 q-pa-none">
          <q-item-section avatar class="q-mr-sm">
            <q-icon name="event_note" color="primary-7" size="sm" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-body1 text-weight-medium text-grey-8">
              Total Number Of Days:
              <span class="text-primary-7 text-weight-semibold">{{
                dtrRows.length
              }}</span>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="col-12 col-md-6 q-pa-none">
          <q-item-section avatar class="q-mr-sm">
            <q-icon name="wallet" color="primary-7" size="sm" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-body1 text-weight-medium text-grey-8">
              Expected Salary in {{ dtrRows.length }} days:
              <span class="text-primary-7 text-weight-semibold">{{
                regularPay
              }}</span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <q-separator spaced="md" class="q-my-md" />

      <div v-if="summaryData">
        <div class="row q-col-gutter-y-sm">
          <q-item class="col-12 col-md-6 q-pa-none">
            <q-item-section avatar class="q-mr-sm">
              <q-icon name="timer" color="teal-7" size="sm" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body1 text-weight-medium text-grey-8">
                Total Working Hours:
                <span class="text-teal-7 text-weight-semibold">
                  {{ summaryData.totalWorkingHoursFormatted || "N/A" }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12 col-md-6 q-pa-none">
            <q-item-section avatar class="q-mr-sm">
              <q-icon name="payments" color="teal-7" size="sm" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body1 text-weight-medium text-grey-8">
                Total Working Hours Cost :
                <span class="text-teal-7 text-weight-semibold">
                  {{ totalWorkingHoursCost || "N/A" }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div class="row q-col-gutter-y-sm q-mt-sm">
          <q-item class="col-12 col-md-6 q-pa-none">
            <q-item-section avatar class="q-mr-sm">
              <q-icon name="timelapse" color="orange-7" size="sm" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body1 text-weight-medium text-grey-8">
                Total Overtime Hours :
                <span class="text-orange-7 text-weight-semibold">
                  {{ summaryData.totalOvertimeFormatted || "N/A" }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12 col-md-6 q-pa-none">
            <q-item-section avatar class="q-mr-sm">
              <q-icon name="attach_money" color="orange-7" size="sm" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body1 text-weight-medium text-grey-8">
                Total Overtime Cost :
                <span class="text-orange-7 text-weight-semibold">
                  {{ totalOvertimeCost || "N/A" }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div class="row q-col-gutter-y-sm q-mt-sm">
          <q-item class="col-12 col-md-6 q-pa-none">
            <q-item-section avatar class="q-mr-sm">
              <q-icon name="trending_down" color="negative-7" size="sm" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body1 text-weight-medium text-grey-8">
                Total Undertime / Late :
                <span class="text-negative-7 text-weight-semibold">
                  {{ summaryData.totalUndertimeFormatted || "N/A" }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12 col-md-6 q-pa-none">
            <q-item-section avatar class="q-mr-sm">
              <q-icon name="money_off" color="negative-7" size="sm" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body1 text-weight-medium text-grey-8">
                Total Undertime / Late Cost :
                <span class="text-negative-7 text-weight-semibold">
                  {{ totalUndertimeCost || "N/A" }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div class="row q-col-gutter-y-sm q-mt-sm">
          <q-item class="col-12 col-md-6 q-pa-none">
            <q-item-section avatar class="q-mr-sm">
              <q-icon name="alarm_add" color="positive-7" size="sm" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body1 text-weight-medium text-grey-8">
                TWH + TOH:
                <span class="text-positive-7 text-weight-semibold">
                  {{ sumTWHTOH || "N/A" }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12 col-md-6 q-pa-none">
            <q-item-section avatar class="q-mr-sm">
              <q-icon
                name="account_balance_wallet"
                color="positive-7"
                size="sm"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body1 text-weight-medium text-grey-8">
                TWH + TOH Cost :
                <span class="text-positive-7 text-weight-semibold">
                  {{ sumTWHTOHCost || "N/A" }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <q-separator spaced="md" class="q-my-md" />

        <div class="row justify-end q-mt-md">
          <q-item class="col-auto q-pa-none">
            <q-item-section>
              <q-item-label class="text-h6 text-weight-bold text-green-9">
                Total Income:
                <span class="text-green-9">
                  {{ sumTWHTOHCost || "N/A" }}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
      <div v-else class="text-grey q-mt-md text-center">
        Loading summary data...
      </div>
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
  if (isNaN(totalHours) || totalHours < 0) return "0h 0m";
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
  // Assuming overtime is paid at 1.25x the regular hourly rate (common practice)
  // If not, simply multiply by hourlyRate.value
  return formatCurrency(hours * hourlyRate.value * 1.25);
});

const totalUndertimeCost = computed(() => {
  const hours = parseHourMinute(props.summaryData?.totalUndertimeFormatted);
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
  const totalWorkingHoursCostCalc =
    parseHourMinute(props.summaryData?.totalWorkingHoursFormatted) *
    hourlyRate.value;
  const totalOvertimeCostCalc =
    parseHourMinute(props.summaryData?.totalOvertimeFormatted) *
    hourlyRate.value *
    1.25; // Use 1.25 for overtime as above
  const totalUndertimeCostCalc =
    parseHourMinute(props.summaryData?.totalUndertimeFormatted) *
    hourlyRate.value;

  const total =
    totalWorkingHoursCostCalc + totalOvertimeCostCalc - totalUndertimeCostCalc;
  return formatCurrency(total);
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
  border-radius: 16px; /* Slightly more rounded corners */
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.08); /* More pronounced, softer shadow */
  background: linear-gradient(
    145deg,
    #ffffff,
    #f7f7f7
  ); /* Subtle gradient for depth */
  overflow: hidden; /* Ensures shadow and border-radius are contained */
}

/* Enhancing separator appearance */
.q-separator {
  background-color: #e0e0e0; /* Lighter, more subtle separator */
  height: 1px;
  border: none;
  margin: 24px 0; /* More vertical spacing for separators */
}

/* Adjusting text colors for elegance and readability */
.text-grey-9 {
  color: #333; /* Slightly softer black for primary titles */
  letter-spacing: -0.02em; /* Tighter letter spacing for a modern look */
}
.text-grey-8 {
  color: #555; /* Slightly lighter grey for labels */
  font-weight: 500; /* Medium weight for labels */
}

/* Customizing icon and value colors to be more harmonious and vibrant */
.text-indigo-7 {
  color: #5c6bc0; /* Brighter indigo */
}
.text-blue-grey-7 {
  color: #78909c; /* Softer blue-grey */
}
.text-primary-7 {
  color: #42a5f5; /* Lighter, more vibrant primary blue */
}
.text-teal-7 {
  color: #26a69a; /* Brighter teal */
}
.text-orange-7 {
  color: #ffa726; /* Brighter orange */
}
.text-negative-7 {
  color: #ef5350; /* Softer red for negative values */
}
.text-positive-7 {
  color: #66bb6a; /* Brighter green for positive values */
}
.text-green-9 {
  color: #43a047; /* Vibrant green for total income */
  font-weight: 700; /* Extra bold for total income */
}

/* Ensuring consistent font weight for values */
.text-weight-semibold {
  font-weight: 600; /* Standard semibold for emphasis */
}

/* Additional styling for a modern look */
.q-item-label {
  display: flex;
  align-items: center;
}

.q-item-section--avatar {
  min-width: 36px; /* Ensure icons have enough space */
}

.q-icon {
  opacity: 0.8; /* Slightly less intense icons */
}

/* Responsive adjustments */
@media (max-width: 767px) {
  .summary-card {
    padding: 24px; /* More padding on smaller screens */
  }
  .q-separator {
    margin: 20px 0; /* Adjust separator spacing */
  }
}
</style>
