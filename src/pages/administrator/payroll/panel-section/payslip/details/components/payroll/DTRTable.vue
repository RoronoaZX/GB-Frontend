<template>
  <q-table
    flat
    bordered
    separator="cell"
    :rows="props.dtrRows"
    :columns="dtrColumns"
    row-key="entry"
    class="modern-dtr-table full-height-table"
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
import { ref, watch, computed } from "vue";
import { date } from "quasar"; // <--- Import 'date' directly from 'quasar'

const props = defineProps(["dtrRows", "employeeData"]);

// Local ref to hold the employee data that we can react to
const internalEmployeeData = ref(props.employeeData);

// Watch for changes in the employeeData prop
watch(
  () => props.employeeData,
  (newVal) => {
    internalEmployeeData.value = newVal;
    // console.log("EmployeeData updated in DTR Table:", newVal);
  },
  {
    immediate: true,
  }
);

// console.log("dtrRows in DTR Table (initial):", props.dtrRows);
// console.log("employeeData in DTR Table (initial):", props.employeeData);

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

// Helper to format minutes into "Hh Mm" string
const formatMinutesToHoursMinutes = (totalMinutes) => {
  if (totalMinutes < 0) totalMinutes = 0; // Ensure no negative display
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

/**
 * Calculates working hours, undertime, and overtime for a single DTR row.
 * @param {Object} row - The DTR row data.
 * @param {Object} designation - The employee's designation data (with time_in, time_out).
 * @returns {Object} An object containing calculated times in minutes.
 */
const calculateRowTimes = (row, designation) => {
  let totalWorkingMinutes = 0;
  let undertimeMinutes = 0;
  let overtimeMinutes = 0;

  if (!row.time_in || !row.time_out || !designation) {
    return { totalWorkingMinutes, undertimeMinutes, overtimeMinutes };
  }

  const actualIn = new Date(row.time_in);
  const actualOut = new Date(row.time_out);

  if (isNaN(actualIn.getTime()) || isNaN(actualOut.getTime())) {
    return { totalWorkingMinutes, undertimeMinutes, overtimeMinutes };
  }

  const scheduledIn = parseTimeToDate(designation.time_in, actualIn);
  const scheduledOut = parseTimeToDate(designation.time_out, actualOut);

  if (!scheduledIn || !scheduledOut) {
    return { totalWorkingMinutes, undertimeMinutes, overtimeMinutes };
  }

  // --- Working Hours Calculation ---
  const effectiveIn = actualIn > scheduledIn ? actualIn : scheduledIn;
  const effectiveOut = actualOut < scheduledOut ? actualOut : scheduledOut;

  if (effectiveOut > effectiveIn) {
    const totalMs = effectiveOut.getTime() - effectiveIn.getTime();
    // Subtract 1 hour for lunch break (60 minutes)
    const adjustedMs = totalMs - 60 * 60 * 1000;
    if (adjustedMs > 0) {
      totalWorkingMinutes = Math.floor(adjustedMs / (1000 * 60));
    }
  }

  // --- Undertime/Late Calculation ---
  const expectedMs = scheduledOut.getTime() - scheduledIn.getTime();
  const expectedWorkingMinutes = Math.floor(
    (expectedMs - 60 * 60 * 1000) / (1000 * 60) // Subtract 1hr lunch
  );

  const actualCountedMinutes = totalWorkingMinutes; // This is already calculated from effective hours
  const calculatedUndertimeMins = expectedWorkingMinutes - actualCountedMinutes;

  if (calculatedUndertimeMins > 0) {
    undertimeMinutes = calculatedUndertimeMins;
  }

  // --- Overtime Calculation ---
  if (row.ot_status === "approved" && row.overtime_start && row.overtime_end) {
    const otIn = new Date(row.overtime_start);
    const otOut = new Date(row.overtime_end);

    if (!isNaN(otIn.getTime()) && !isNaN(otOut.getTime()) && otOut > otIn) {
      const otMs = otOut.getTime() - otIn.getTime();
      overtimeMinutes = Math.floor(otMs / (1000 * 60));
    }
  }

  return { totalWorkingMinutes, undertimeMinutes, overtimeMinutes };
};

const dtrColumns = computed(() => [
  {
    name: "number_of_days",
    required: true,
    label: "Day",
    align: "center",
    field: "number_of_days", // This field is custom rendered in template
  },
  {
    name: "time_in",
    required: true,
    label: "Time In",
    align: "center",
    field: (row) =>
      row.time_in ? date.formatDate(row.time_in, "h:mm A") : "N/A", // <--- Corrected usage here
  },
  {
    name: "time_out",
    required: true,
    label: "Time Out",
    align: "center",
    field: (row) =>
      row.time_out ? date.formatDate(row.time_out, "h:mm A") : "N/A", // <--- Corrected usage here
  },
  {
    name: "total_working_hours",
    required: true,
    label: "Working Hours",
    align: "center",
    field: (row) => {
      if (!internalEmployeeData.value?.designation) return "N/A";
      const { totalWorkingMinutes } = calculateRowTimes(
        row,
        internalEmployeeData.value.designation
      );
      return formatMinutesToHoursMinutes(totalWorkingMinutes);
    },
  },
  {
    name: "undertime_minutes",
    required: true,
    label: "Undertime/Late",
    align: "center",
    field: (row) => {
      if (!internalEmployeeData.value?.designation) return "N/A";
      const { undertimeMinutes } = calculateRowTimes(
        row,
        internalEmployeeData.value.designation
      );
      return undertimeMinutes > 0
        ? formatMinutesToHoursMinutes(undertimeMinutes)
        : "—";
    },
  },
  {
    name: "over_time",
    required: true,
    label: "Overtime",
    align: "center",
    field: (row) => {
      if (!internalEmployeeData.value?.designation) return "N/A";
      const { overtimeMinutes } = calculateRowTimes(
        row,
        internalEmployeeData.value.designation
      );
      return overtimeMinutes > 0
        ? formatMinutesToHoursMinutes(overtimeMinutes)
        : "—";
    },
  },
]);
</script>

<style lang="scss" scoped>
.modern-dtr-table {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;

  .q-td,
  .q-th {
    font-size: 11px !important; /* Slightly larger for readability than 9px, but still compact */
    padding: 6px 8px !important; /* Adjusted padding for compactness */
    line-height: 1.3;
  }

  .q-th {
    font-weight: 600;
    background-color: #f5f5f5;
    color: #555;
    text-transform: uppercase;
  }

  .q-td {
    color: #444;
  }
}

.full-height-table {
  /* You can still define specific full-height related styles here if needed */
}

/* Ensure the text within cells matches the desired font size */
.full-height-table .text-overline {
  font-size: 11px !important;
}
</style>
