<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section class="row items-center justify-between q-pb-md">
        <div class="col-auto">
          <div class="text-h6 text-weight-bold text-primary">
            Name: {{ formatFullname(employeesData || "N/A") }}
          </div>
          <div class="text-subtitle1 text-grey-7">
            From : {{ dtrRecord.from }} &bull; To: {{ dtrRecord.end }}
          </div>
        </div>
        <q-btn icon="close" flat dense round v-close-popup>
          <q-tooltip class="bg-blue-grey-6" :delay="200">Close</q-tooltip>
        </q-btn>
      </q-card-section>

      <q-card-section class="q-pt-sm">
        <div class="text-h6 q-mb-sm text-grey-8">Daily Time Records</div>
        <q-table
          flat
          bordered
          separator="cell"
          :rows="dtrRows"
          :columns="dtrColumns"
          row-key="entry"
          class="full-height-table"
          v-model:pagination="pagination"
          hide-bottom
        >
          <template v-slot:body-cell="props">
            <q-td :props="props">
              <span class="text-overline">{{ props.value }}</span>
            </q-td>
          </template>
          <template v-slot:body-cell-number_of_days="props">
            <q-td :props="props">
              {{ props.pageIndex + 1 }}
            </q-td>
          </template>
        </q-table>
      </q-card-section>

      <q-card-section class="q-pt-sm q-pb-md">
        <q-card flat bordered class="summary-card q-pa-md">
          <q-list dense>
            <div class="row justify-between">
              <q-item>
                <q-item-section avatar>
                  <q-icon name="schedule" color="indigo" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-body1 text-weight-medium">
                    Schedule:
                    <span class="text-info">{{ employeeSchedule }}</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-btn label="proceed"></q-btn>
              </q-item>
            </div>

            <q-separator spaced inset="item" />

            <q-item>
              <q-item-section avatar>
                <q-icon name="money" color="blue-grey" />
              </q-item-section>
              <q-item-section>
                <q-item-section>
                  <q-item-label class="text-body1 text-weight-meduim">
                    Rate / Day:
                    <span class="text-blue-grey">
                      {{
                        formatCurrency(
                          employeesData?.employment_type?.salary
                        ) || "₱ 0.00"
                      }}
                    </span>
                  </q-item-label>
                </q-item-section>
              </q-item-section>
            </q-item>

            <div class="row justify-between">
              <q-item class="col-6">
                <q-item-section avatar>
                  <q-icon name="event_note" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-body1 text-weight-meduim">
                    Total Number of Days:
                    <span class="text-primary">
                      {{ dtrRecord.records.length }}
                    </span>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="col-6">
                <q-item-section avatar>
                  <!-- color="accent" -->
                  <q-icon name="wallet" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-body1 text-weight-bold">
                    Expected Salary in {{ dtrRecord.records.length }} days:
                    <!-- class="text-accent" -->
                    <span class="text-primary">{{ regularPay }}</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>

            <q-separator spaced inset="item" />

            <div class="row justify-between">
              <q-item class="col-6">
                <q-item-section avatar>
                  <!-- color="positive" -->
                  <q-icon name="timer" color="teal" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-body1 text-weight-meduim">
                    Total Working Hours:
                    <span class="text-teal">
                      {{ `${overallTotalWorkingHours}` }}
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
                      {{ overallTotalWorkingHoursSalary }}
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
                    Total Overtime Hours:
                    <span class="text-orange">
                      {{ `${overallTotalOvertime}` }}
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
                      {{ overallOvertimeCost }}
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
                    Total Undertime / Late:
                    <span class="text-negative">
                      {{ `${overallTotalUndertime}` }}
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
                      {{ overallUndertimeCost }}
                    </span>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>

            <div class="row justify-between">
              <q-item class="col-6">
                <q-item-section avatar>
                  <!-- account_balance_wallet -->
                  <q-icon name="alarm_add" color="positive" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-body1 text-weight-meduim">
                    TWH + TOH:
                    <span class="text-positive">
                      {{ `${overallTotalWorkingHoursWithOT}` }}
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
                      {{ overallTotalSalary }}
                    </span>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-card>
        <q-card-section align="right"> </q-card-section>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useDialogPluginComponent, useQuasar } from "quasar";
// The useAttendanceHelpers is commented out as it's not directly used in the provided snippet logic,
// but keep it if it's used elsewhere in your actual component.
// import { useAttendanceHelpers } from "src/composables/attendance/useAttendanceHelpers";
import { computed, onMounted, ref } from "vue";
import { useEmployeeStore } from "src/stores/employee";
import { useRoute } from "vue-router"; // No need for useRouter if not navigating programmatically

const { dialogRef, onDialogHide } = useDialogPluginComponent();
const $q = useQuasar(); // Quasar instance for notifications

// const helpers = useAttendanceHelpers(); // Commented out
const props = defineProps(["dtrRecord", "employeeId"]);
console.log("dtrRecordss", props.dtrRecord);

const pagination = ref({
  rowsPerPage: 0,
});

const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);
const employeesData = ref(null); // This will hold the specific employee's details
const route = useRoute();
const employee_id = route.params.employee_id || "";
console.log("empoyee_id", employee_id);
const dtrRows = props.dtrRecord.records || [];

const maximizedToggle = ref(true);
const loadingTable = ref(true); // Added for loading state of the table

// New computed property to display employee's full name and handle missing data gracefully
const employeeDetailsComputed = computed(() => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  if (employeesData.value) {
    const firstname = employeesData.value.first_name
      ? capitalize(employeesData.value.first_name)
      : "";
    const middlename = employeesData.value.middle_name
      ? capitalize(employeesData.value.middle_name).charAt(0) + "."
      : "";
    const lastname = employeesData.value.last_name
      ? capitalize(employeesData.value.last_name)
      : "";

    return {
      fullName:
        `${firstname} ${
          middlename ? middlename + " " : ""
        }${lastname}`.trim() || "Employee Name N/A",
      designationTimeIn: employeesData.value.designation?.time_in,
      designationTimeOut: employeesData.value.designation?.time_out,
      employmentTypeSalary: employeesData.value.employment_type?.salary,
    };
  }
  return {
    fullName: "Loading Employee...",
    designationTimeIn: null,
    designationTimeOut: null,
    employmentTypeSalary: null,
  };
});

// Computed property for employee's schedule display
const employeeSchedule = computed(() => {
  const designation = employeesData.value?.designation;
  if (designation && designation.time_in && designation.time_out) {
    return `${designation.time_in} - ${designation.time_out}`;
  }
  return "N/A";
});

// --- Data Fetching Functions ---
const fetchEmployeeDetails = async () => {
  loadingTable.value = true;
  try {
    await employeeStore.fetchCertianEmployeeWithEmploymentTypeAndDesignation(
      employee_id
    );
    employeesData.value = employees.value; // Assign the fetched employee details
    console.log("Employee Designation Data Loaded:", employeesData.value);

    if (
      !(
        employeesData.value &&
        employeesData.value.designation &&
        employeesData.value.employment_type
      )
    ) {
      console.error(
        "Employee designation or employment_type is missing from the fetched employee data!"
      );
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
  } finally {
    loadingTable.value = false;
  }
};
onMounted(async () => {
  await fetchEmployeeDetails();
});

// Helper function to parse time strings (e.g., "08:00 AM") and set them on a specific date.
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

// Function to convert total minutes into "Xh Ym" format
const formatMinutesToHoursMinutes = (totalMinutes) => {
  if (totalMinutes < 0) return "0h 0m";
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

// Function to convert "Xh Ym" string to total minutes
const convertHoursMinutesToMinutes = (hmString) => {
  const match = hmString.match(/(\d+)h\s*(\d+)m/);
  if (match) {
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    return hours * 60 + minutes;
  }
  return 0;
};

// Computed property for Overall Total working Hours
const overallTotalWorkingHours = computed(() => {
  let totalMinutes = 0;

  if (!employeesData.value || !employeesData.value.designation) {
    return formatMinutesToHoursMinutes(0);
  }

  dtrRows.forEach((row) => {
    if (!row.time_in || !row.time_out) return;

    const actualIn = new Date(row.time_in);
    const actualOut = new Date(row.time_out);

    if (isNaN(actualIn.getTime()) || isNaN(actualOut.getTime())) {
      return;
    }
    const designationTimeInStr = employeesData.value.designation.time_in;
    const designationTimeOutStr = employeesData.value.designation.time_out;

    const scheduledIn = parseTimeToDate(designationTimeInStr, actualIn);
    const scheduledOut = parseTimeToDate(designationTimeOutStr, actualOut);

    if (!scheduledIn || !scheduledOut) {
      return;
    }

    const effectiveIn = actualIn > scheduledIn ? actualIn : scheduledIn;
    const effectiveOut = actualOut < scheduledOut ? actualOut : scheduledOut;

    if (effectiveOut <= effectiveIn) {
      return;
    }
    const totalMs = effectiveOut.getTime() - effectiveIn.getTime();
    const adjustedMs = totalMs - 1000 * 60 * 60;

    if (adjustedMs < 0) return;

    totalMinutes += Math.floor(adjustedMs / (1000 * 60));
  });
  return formatMinutesToHoursMinutes(totalMinutes);
});

// Computed property for Overall total undertime / late
const overallTotalUndertime = computed(() => {
  let totalUndertimeMinutes = 0;

  if (!employeesData.value || !employeesData.value.designation) {
    return formatMinutesToHoursMinutes(0);
  }

  dtrRows.forEach((row) => {
    if (!row.time_in || !row.time_out) return;
    const actualIn = new Date(row.time_in);
    const actualOut = new Date(row.time_out);

    if (isNaN(actualIn.getTime()) || isNaN(actualOut.getTime())) {
      return;
    }
    const designationTimeInStr = employeesData.value.designation.time_in;
    const designationTimeOutStr = employeesData.value.designation.time_out;

    const scheduledIn = parseTimeToDate(designationTimeInStr, actualIn);
    const scheduledOut = parseTimeToDate(designationTimeOutStr, actualOut);

    if (!scheduledIn || !scheduledOut) {
      return;
    }

    // Calculate expected working minutes based on scheduled times, minus 1 hour lunch
    const expectedMs = scheduledOut.getTime() - scheduledIn.getTime();
    const expectedWorkingMinutes = Math.floor(
      (expectedMs - 1000 * 60 * 60) / (1000 * 60)
    );

    // Determine effective time in and out based on schedule for actual worked time
    const effectiveIn = actualIn > scheduledIn ? actualIn : scheduledIn;
    const effectiveOut = actualOut < scheduledOut ? actualOut : scheduledOut;

    let actualCountedMinutes = 0;
    if (effectiveOut > effectiveIn) {
      const actualMs = effectiveOut.getTime() - effectiveIn.getTime();
      actualCountedMinutes = Math.floor(
        (actualMs - 1000 * 60 * 60) / (1000 * 60)
      );
    }

    const undertimeMins = expectedWorkingMinutes - actualCountedMinutes;

    if (undertimeMins > 0) {
      totalUndertimeMinutes += undertimeMins;
    }
  });
  return formatMinutesToHoursMinutes(totalUndertimeMinutes);
});

// New Computed Property: Overall Total Overtime
// New Computed Property: Overall Total Overtime
const overallTotalOvertime = computed(() => {
  let totalOvertimeMinutes = 0;

  dtrRows.forEach((row) => {
    // Only consider approved overtime
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
  });
  return formatMinutesToHoursMinutes(totalOvertimeMinutes);
});

// Computed Property: Overall Total Salary
const overallTotalWorkingHoursSalary = computed(() => {
  if (
    !employeesData.value ||
    !employeesData.value.employment_type ||
    !employeesData.value.employment_type.salary
  ) {
    return "₱ 0.00";
  }

  const dailySalary = parseFloat(employeesData.value.employment_type.salary);
  if (isNaN(dailySalary) || dailySalary <= 0) {
    return "₱ 0.00 (Invalid Salary)";
  }
  const standardWorkingHoursPerDay = 8; //As per requirements
  const hourlyRate = dailySalary / standardWorkingHoursPerDay;

  // Get the total working hours in minutes from the previously calculated computed property
  const totalWorkingMinutes = convertHoursMinutesToMinutes(
    overallTotalWorkingHours.value
  );
  // Get the total overtime hours in minutes
  const totalOvertimeMinutes = convertHoursMinutesToMinutes(
    overallTotalOvertime.value
  );

  // Convert total minutes to total hours (can be decimal)
  const totalRegularWorkingHours = totalWorkingMinutes / 60;
  const totalOvertimeHours = totalOvertimeMinutes / 60;

  // Assuming overtime is paid at the regular hourly rate for simplicity, adjust if different rate applies
  const calculatedSalary = totalRegularWorkingHours * hourlyRate;
  // totalRegularWorkingHours * hourlyRate + totalOvertimeHours * hourlyRate;

  // Format to Peso currency
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(calculatedSalary);
});
const overallTotalSalary = computed(() => {
  if (
    !employeesData.value ||
    !employeesData.value.employment_type ||
    !employeesData.value.employment_type.salary
  ) {
    return "₱ 0.00";
  }

  const dailySalary = parseFloat(employeesData.value.employment_type.salary);
  if (isNaN(dailySalary) || dailySalary <= 0) {
    return "₱ 0.00 (Invalid Salary)";
  }
  const standardWorkingHoursPerDay = 8; //As per requirements
  const hourlyRate = dailySalary / standardWorkingHoursPerDay;

  // Get the total working hours in minutes from the previously calculated computed property
  const totalWorkingMinutes = convertHoursMinutesToMinutes(
    overallTotalWorkingHours.value
  );
  // Get the total overtime hours in minutes
  const totalOvertimeMinutes = convertHoursMinutesToMinutes(
    overallTotalOvertime.value
  );

  // Convert total minutes to total hours (can be decimal)
  const totalRegularWorkingHours = totalWorkingMinutes / 60;
  const totalOvertimeHours = totalOvertimeMinutes / 60;

  // Assuming overtime is paid at the regular hourly rate for simplicity, adjust if different rate applies
  const calculatedSalary =
    totalRegularWorkingHours * hourlyRate + totalOvertimeHours * hourlyRate;
  // totalRegularWorkingHours * hourlyRate + totalOvertimeHours * hourlyRate;

  // Format to Peso currency
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(calculatedSalary);
});

// NEW Computed Property: Overall Overtime Cost
const overallOvertimeCost = computed(() => {
  if (
    !employeesData.value ||
    !employeesData.value.employment_type ||
    !employeesData.value.employment_type.salary
  ) {
    return "₱ 0.00";
  }

  const dailySalary = parseFloat(employeesData.value.employment_type.salary);
  if (isNaN(dailySalary) || dailySalary <= 0) {
    return "₱ 0.00 (Invalid Salary)";
  }

  const standardWorkHoursPerDay = 8; // Assuming 8 standard hours per day
  const hourlyRate = dailySalary / standardWorkHoursPerDay;

  // Get the total overtime minutes from the previously calculated computed property
  const totalOvertimeMinutes = convertHoursMinutesToMinutes(
    overallTotalOvertime.value
  );

  // Convert total overtime minutes to total overtime hours (can be decimal)
  const totalOvertimeHours = totalOvertimeMinutes / 60;

  // Since overtime is just hourly rate, the multiplier is 1.0
  const overtimeRateMultiplier = 1.0;

  // Calculate the cost of overtime
  const calculatedOvertimeCost =
    totalOvertimeHours * hourlyRate * overtimeRateMultiplier;

  // Format to Philippine Peso currency
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(calculatedOvertimeCost);
});

// NEW Computed Property: Overall Undertime Cost
const overallUndertimeCost = computed(() => {
  if (
    !employeesData.value ||
    !employeesData.value.employment_type ||
    !employeesData.value.employment_type.salary
  ) {
    return "₱ 0.00";
  }

  const dailySalary = parseFloat(employeesData.value.employment_type.salary);
  if (isNaN(dailySalary) || dailySalary <= 0) {
    return "₱ 0.00 (Invalid Salary)";
  }

  const standardWorkHoursPerDay = 8;
  const hourlyRate = dailySalary / standardWorkHoursPerDay;

  // Get the total undertime minutes
  const totalUndertimeMinutes = convertHoursMinutesToMinutes(
    overallTotalUndertime.value
  );

  // Convert total undertime minutes to total undertime hours (can be decimal)
  const totalUndertimeHours = totalUndertimeMinutes / 60;

  // Calculate the cost of undertime
  const calculatedUndertimeCost = totalUndertimeHours * hourlyRate;

  // Format to Philippine Peso currency
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(calculatedUndertimeCost);
});

const overallTotalWorkingHoursWithOT = computed(() => {
  const OTWHMinutes = convertHoursMinutesToMinutes(
    overallTotalWorkingHours.value
  );
  console.log("OTWHMinutes", OTWHMinutes);
  const OTOMinutes = convertHoursMinutesToMinutes(overallTotalOvertime.value);
  console.log("OTOMinutes", OTOMinutes);

  const totalHours = OTWHMinutes + OTOMinutes;

  console.log("totalHours", totalHours);

  return formatMinutesToHoursMinutes(totalHours);
});

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`;
};

const formatCurrency = (value) => {
  if (typeof value !== "number" && typeof value !== "string") {
    return "₱ 0.00";
  }
  const numValue = parseFloat(value);
  if (isNaN(numValue)) {
    return "₱ 0.00";
  }
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(numValue);
};

const regularPay = computed(() => {
  console.log(
    "employeesData?.value?.employment_type?.salary :",
    employeesData?.value?.employment_type?.salary
  );
  console.log("props?.dtrRecord?.records :", props?.dtrRecord?.records?.length);
  const ratePerDay = parseFloat(
    employeesData?.value?.employment_type?.salary || "0"
  );
  const totalNumberOfDays = props?.dtrRecord?.records?.length || 0;

  if (isNaN(ratePerDay) || ratePerDay <= 0 || totalNumberOfDays === 0) {
    return "₱ 0.00";
  }

  const calculateExpectedSalary = ratePerDay * totalNumberOfDays;

  return formatCurrency(calculateExpectedSalary);
});

const dtrColumns = [
  {
    name: "number_of_days",
    required: true,
    label: "Number Of Days",
    align: "center",
  },
  {
    name: "time_in",
    required: true,
    label: "Time In",
    align: "center",
    field: "time_in",
  },
  {
    name: "time_out",
    required: true,
    label: "Time Out",
    align: "center",
    field: "time_out",
  },
  {
    name: "total_working_hours",
    required: true,
    label: "Total Working Hours",
    align: "center",
    field: (row) => {
      if (
        !row.time_in ||
        !row.time_out ||
        !employeesData.value ||
        !employeesData.value.designation
      ) {
        return "N/A";
      }

      const formatHM = (hours, minutes) => {
        return `${hours}h ${minutes}m`;
      };

      // Ensure that actualIn and actualOut are valid Date objects
      const actualIn = new Date(row.time_in);
      const actualOut = new Date(row.time_out);

      if (isNaN(actualIn.getTime()) || isNaN(actualOut.getTime())) {
        return "Invalid Time";
      }

      const designationTimeInStr = employeesData.value.designation.time_in;
      const designationTimeOutStr = employeesData.value.designation.time_out;

      // Parse designation times relative to the DTR date
      const scheduledIn = parseTimeToDate(designationTimeInStr, actualIn);
      const scheduledOut = parseTimeToDate(designationTimeOutStr, actualOut);

      if (!scheduledIn || !scheduledOut) {
        return "Schedule Error"; // Should not happen if designation data is validated
      }

      // Determine effective time in and out based on schedule
      // If actual in is earlier than scheduled in, use scheduled in
      const effectiveIn = actualIn > scheduledIn ? actualIn : scheduledIn;

      // If actual out is later than scheduled out, use scheduled out
      const effectiveOut = actualOut < scheduledOut ? actualOut : scheduledOut;

      // If effectiveOut is before effectiveIn (e.g., worked only a short period or invalid data), return 0.
      if (effectiveOut <= effectiveIn) {
        return formatHM(0, 0);
      }

      // Calculate total span in milliseconds, then subtract 1 hour lunch break
      const totalMs = effectiveOut.getTime() - effectiveIn.getTime();
      const adjustedMs = totalMs - 1000 * 60 * 60; // minus 1 hour for lunch

      // Ensure adjustedMs is not negative
      if (adjustedMs < 0) return formatHM(0, 0);

      const adjustedH = Math.floor(adjustedMs / (1000 * 60 * 60));
      const adjustedM = Math.floor(
        (adjustedMs % (1000 * 60 * 60)) / (1000 * 60)
      );

      return formatHM(adjustedH, adjustedM);
    },
  },
  {
    name: "undertime_minutes",
    required: true,
    label: "Undertime / Late",
    align: "center",
    field: (row) => {
      if (
        !row.time_in ||
        !row.time_out ||
        !employeesData.value ||
        !employeesData.value.designation
      ) {
        return "N/A";
      }

      // Ensure that actualIn and actualOut are valid Date objects
      const actualIn = new Date(row.time_in);
      const actualOut = new Date(row.time_out);

      if (isNaN(actualIn.getTime()) || isNaN(actualOut.getTime())) {
        return "Invalid Time";
      }

      const designationTimeInStr = employeesData.value.designation.time_in;
      const designationTimeOutStr = employeesData.value.designation.time_out;

      // Parse designation times relative to the DTR date
      const scheduledIn = parseTimeToDate(designationTimeInStr, actualIn);
      const scheduledOut = parseTimeToDate(designationTimeOutStr, actualOut);

      if (!scheduledIn || !scheduledOut) {
        return "Schedule Error";
      }

      // Calculate expected working minutes based on scheduled times, minus 1 hour lunch
      const expectedMs = scheduledOut.getTime() - scheduledIn.getTime();
      const expectedWorkingMinutes = Math.floor(
        (expectedMs - 1000 * 60 * 60) / (1000 * 60)
      ); // minus 1 hour

      // Determine effective time in and out based on schedule for actual worked time
      const effectiveIn = actualIn > scheduledIn ? actualIn : scheduledIn;
      const effectiveOut = actualOut < scheduledOut ? actualOut : scheduledOut;

      let actualCountedMinutes = 0;
      if (effectiveOut > effectiveIn) {
        const actualMs = effectiveOut.getTime() - effectiveIn.getTime();
        actualCountedMinutes = Math.floor(
          (actualMs - 1000 * 60 * 60) / (1000 * 60)
        ); // minus 1 hour
      }

      const undertimeMins = expectedWorkingMinutes - actualCountedMinutes;

      if (undertimeMins <= 0) return "—"; // No undertime or worked extra

      const hours = Math.floor(undertimeMins / 60);
      const minutes = undertimeMins % 60;

      return `${hours}h ${minutes}m`;
    },
  },
  {
    name: "over_time",
    required: true,
    label: "Overtime",
    align: "center",
    field: (row) => {
      // Only calculate if ot_status is 'approved' and times are present
      if (
        row.ot_status === "approved" &&
        row.overtime_start &&
        row.overtime_end
      ) {
        // Changed to overtime_start and overtime_end
        console.log("________row.ot_status ", row.ot_status);
        const otIn = new Date(row.overtime_start); // Changed to overtime_start
        const otOut = new Date(row.overtime_end); // Changed to overtime_end

        if (!isNaN(otIn.getTime()) && !isNaN(otOut.getTime()) && otOut > otIn) {
          const otMs = otOut.getTime() - otIn.getTime();
          const otMinutes = Math.floor(otMs / (1000 * 60));

          const hours = Math.floor(otMinutes / 60);
          const minutes = otMinutes % 60;
          return `${hours}h ${minutes}m`;
        }
      }
      return "—"; // Display dash if not approved or invalid times
    },
  },
];
</script>

<style lang="scss" scoped>
.summary-card {
  background-color: #ffffff; // White background for summary card
  border-radius: 8px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1); // More prominent shadow
  border: 1px solid #e0e0e0; // Light border
}

.full-height-table .q-td,
.full-height-table .q-th {
  font-size: 9px !important; /* Force 9px font size */
  padding: 4px 6px !important; /* Reduce padding to make cells smaller */
  line-height: 1.2; /* Optional: tighter line spacing */
}

.full-height-table .text-overline {
  font-size: 10px !important; /* Ensure caption text also matches 9px */
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

.modern-dtr-table {
  border-radius: 8px;
  overflow: hidden; // Ensures border-radius applies to table content
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); // Subtle shadow for the table
  background-color: #ffffff; // White background for table

  .q-td,
  .q-th {
    font-size: 13px !important; /* Slightly larger for readability */
    padding: 10px 12px !important; /* Increased padding */
    line-height: 1.4;
  }

  .q-th {
    font-weight: 600; // Bolder headers
    background-color: #f5f5f5; // Light grey header background
    color: #555;
    text-transform: uppercase; // Uppercase headers for modern look
  }

  .q-td {
    color: #444; // Slightly darker text for data
  }

  // Remove the `text-overline` specific style if it's no longer used in template body-cell
  // .q-td span.text-overline {
  //   font-size: 10px !important;
  // }
}
</style>
