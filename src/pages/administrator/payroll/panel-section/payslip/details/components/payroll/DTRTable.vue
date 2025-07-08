<template>
  <q-table
    flat
    bordered
    separator="cell"
    :rows="props.dtrRows"
    :columns="dtrColumns"
    row-key="entry"
    class="full-height-table"
    v-model:pagination="pagination"
    hide-bottom
  >
    <template v-slot:body-cell="props">
      <q-td :props="props">
        <span class="text-overline"> {{ props.value }}</span>
      </q-td>
    </template>
    <template v-slot:body-cell-number_of_days="props">
      <q-td :props="props">
        {{ props.pageIndex + 1 }}
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { format } from "quasar";
import { ref, watch } from "vue";

const props = defineProps(["dtrRows", "employeeData"]); // Changed 'employeesData' to 'employeeData' for consistency with prop name

//Local ref to hold the employee data that we can react to
const internalEmployeeData = ref(props.employeeData);

// Watch for changes in the employeeData prop
watch(
  () => props.employeeData,
  (newVal) => {
    internalEmployeeData.value = newVal;
    console.log("EmployeeData updated inDTR Table:", newVal);
  },
  {
    immediate: true,
  }
);

console.log("dtrRows in DTR Table (initial):", props.dtrRows);
// The console.log below will still show undefined initially because setup runs before the parent's async operation completes
console.log("employeeData in DTR Table (initial):", props.employeeData);

const pagination = ref({
  rowsPerPage: 0,
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

// All computed properties and methods that depend on `employeesData
// should now use  `internalEmployeeData.value`

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
        !internalEmployeeData.value ||
        !internalEmployeeData.value.designation
      ) {
        return "N/A";
      }

      const formatHM = (hours, minutes) => {
        return `${hours}h ${minutes}m`;
      };

      const actualIn = new Date(row.time_in);
      const actualOut = new Date(row.time_out);

      if (isNaN(actualIn.getTime()) || isNaN(actualOut.getTime())) {
        return "Invalid Time";
      }

      const designationTimeInStr =
        internalEmployeeData.value.designation.time_in;
      const designationTimeOutStr =
        internalEmployeeData.value.designation.time_out;

      const scheduledIn = parseTimeToDate(designationTimeInStr, actualIn);
      const scheduledOut = parseTimeToDate(designationTimeOutStr, actualOut);

      if (!scheduledIn || !scheduledOut) {
        return "Schedule Error";
      }

      const effectiveIn = actualIn > scheduledIn ? actualIn : scheduledIn;
      const effectiveOut = actualOut < scheduledOut ? actualOut : scheduledOut;

      if (effectiveOut <= effectiveIn) {
        return formatHM(0, 0);
      }
      const totalMs = effectiveOut.getTime() - effectiveIn.getTime();
      const adjustedMs = totalMs - 1000 * 60 * 60;

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
        !internalEmployeeData.value ||
        !internalEmployeeData.value.designation
      ) {
        return "N/A";
      }

      const actualIn = new Date(row.time_in);
      const actualOut = new Date(row.time_out);

      if (isNaN(actualIn.getTime()) || isNaN(actualOut.getTime())) {
        return "Invalid Time";
      }

      const designationTimeInStr =
        internalEmployeeData.value.designation.time_in;
      const designationTimeOutStr =
        internalEmployeeData.value.designation.time_out;

      const scheduledIn = parseTimeToDate(designationTimeInStr, actualIn);
      const scheduledOut = parseTimeToDate(designationTimeOutStr, actualOut);

      if (!scheduledIn || !scheduledOut) {
        return "Schedule Error";
      }

      const expectedMs = scheduledOut.getTime() - scheduledIn.getTime();
      const expectedWorkingMinutes = Math.floor(
        (expectedMs - 1000 * 60 * 60) / (1000 * 60)
      );

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

      if (undertimeMins <= 0) return "—";

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
      if (
        row.ot_status === "approved" &&
        row.overtime_start &&
        row.overtime_end
      ) {
        const otIn = new Date(row.overtime_start);
        const otOut = new Date(row.overtime_end);

        if (!isNaN(otIn.getTime()) && !isNaN(otOut.getTime()) && otOut) {
          const otMs = otOut.getTime() - otIn.getTime();
          const otMinutes = Math.floor(otMs / (1000 * 60));

          const hours = Math.floor(otMinutes / 60);
          const minutes = otMinutes % 60;
          return `${hours}h ${minutes}m`;
        }
      }
      return "—";
    },
  },
];
</script>

<style lang="scss" scoped>
.full-height-table .q-td,
.full-height-table .q-th {
  font-size: 9px !important; /* Force 9px font size */
  padding: 4px 6px !important; /* Reduce padding to make cells smaller */
  line-height: 1.2; /* Optional: tighter line spacing */
}

.full-height-table .text-overline {
  font-size: 10px !important; /* Ensure caption text also matches 9px */
}
.modern-dtr-table {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;

  .q-td,
  .q-th {
    font-size: 13px !important; /* Slightly larger for readability */
    padding: 10px 12px !important; /* Increased padding */
    line-height: 1.4;
  }

  .q-th {
    font-weight: 600;
    background-color: #f5f5f5;
    color: #555;
    text-transform: uppercase;

    .q-td {
      color: #444;
    }
  }
}
</style>
