<template>
  <q-table
    flat
    bordered
    separator="cell"
    :rows="props.dtrRows"
    :columns="dtrColumns"
    row-key="entry"
    class="modern-dtr-table"
    v-model:pagination="pagination"
    hide-bottom
  >
    <template v-slot:header="props">
      <q-tr :props="props" class="modern-dtr-table-header">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          class="text-weight-bold text-uppercase"
          :class="`text-${col.align}`"
        >
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body-cell="props">
      <q-td :props="props" class="modern-dtr-table-cell">
        <span class="text-body2 text-grey-8">{{ props.value }}</span>
      </q-td>
    </template>

    <template v-slot:body-cell-number_of_days="props">
      <q-td :props="props" class="modern-dtr-table-cell">
        <span class="text-body2 text-grey-8">{{ props.rowIndex + 1 }}</span>
      </q-td>
    </template>

    <template v-slot:bottom-row>
      <q-tr class="modern-dtr-total-row">
        <q-td class="text-left text-weight-bold text-grey-9 total-label"
          >Total</q-td
        >
        <q-td></q-td>
        <q-td></q-td>

        <q-td class="text-center text-weight-bold text-primary-8">
          {{ totalWorkingHoursFormatted }}
        </q-td>

        <q-td class="text-center text-weight-bold text-orange-8">
          {{ totalUndertimeFormatted }}
        </q-td>

        <q-td class="text-center text-weight-bold text-positive-8">
          {{ totalOvertimeFormatted }}
        </q-td>

        <q-td class="text-center text-weight-bold text-blue-grey-8">
          {{ totalBreakFormatted }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { date } from "quasar";

const props = defineProps(["dtrRows", "employeeData"]);

const internalEmployeeData = ref(props.employeeData);

// Watch for changes in employeeData prop and update internal ref
// Also trigger summary emission when employeeData changes
watch(
  () => props.employeeData,
  (newVal) => {
    internalEmployeeData.value = newVal;
    // The main watch below on both dtrRows and internalEmployeeData will handle re-emitting
    // so we don't need an extra emit here.
  },
  {
    immediate: true, // Run on component mount
  }
);

const pagination = ref({
  rowsPerPage: 0,
});

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

const formatMinutesToHoursMinutes = (totalMinutes) => {
  if (totalMinutes === null || totalMinutes === undefined || totalMinutes < 0)
    return "0h 0m";
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

// Helper to calculate the duration of a single break period
const getBreakDuration = (startTime, endTime) => {
  if (!startTime || !endTime) {
    return 0;
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
    return 0; // Invalid or zero/negative duration
  }

  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60)); // Duration in minutes
};

// Function to calculate total break time duration (lunch + other breaks)
const calculateTotalBreakMinutesPure = (row) => {
  let totalBreak = 0;
  totalBreak += getBreakDuration(row.lunch_break_start, row.lunch_break_end);
  totalBreak += getBreakDuration(row.break_start, row.break_end);
  return totalBreak;
};

/**
 * Calculates working hours, undertime, and overtime for a single DTR row.
 * Now dynamically deducts break time based on recorded breaks.
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

  // --- Determine Actual Break Deduction ---
  const recordedBreakMinutes = calculateTotalBreakMinutesPure(row);
  const breakDeduction = recordedBreakMinutes < 60 ? 60 : recordedBreakMinutes; // Dynamic deduction

  // --- Working Hours Calculation ---
  const effectiveIn = actualIn > scheduledIn ? actualIn : scheduledIn;
  const effectiveOut = actualOut < scheduledOut ? actualOut : scheduledOut;

  if (effectiveOut > effectiveIn) {
    const totalMs = effectiveOut.getTime() - effectiveIn.getTime();
    const adjustedMs = totalMs - breakDeduction * 60 * 1000; // Deduct dynamic break
    if (adjustedMs > 0) {
      totalWorkingMinutes = Math.floor(adjustedMs / (1000 * 60));
    }
  }

  // --- Undertime/Late Calculation ---
  const expectedMs = scheduledOut.getTime() - scheduledIn.getTime();
  const expectedGrossMinutes = Math.floor(expectedMs / (1000 * 60));
  const expectedWorkingMinutes = Math.max(0, expectedGrossMinutes - 60); // Always deduct at least 1 hour for expected

  const actualCountedMinutes = totalWorkingMinutes;
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

// --- Computed Properties for Grand Totals ---
const calculateGrandTotals = computed(() => {
  let totalWorking = 0;
  let totalUndertime = 0;
  let totalOvertime = 0;
  let totalBreak = 0;
  let totalPresentDays = 0;
  let totalLateDays = 0;
  let totalAbsentDays = 0;

  if (
    !props.dtrRows ||
    props.dtrRows.length === 0 ||
    !internalEmployeeData.value?.designation
  ) {
    return {
      totalWorking,
      totalUndertime,
      totalOvertime,
      totalBreak,
      totalPresentDays,
      totalLateDays,
      totalAbsentDays,
      totalDaysInPeriod: 0,
    };
  }

  props.dtrRows.forEach((row) => {
    const { totalWorkingMinutes, undertimeMinutes, overtimeMinutes } =
      calculateRowTimes(row, internalEmployeeData.value.designation);

    totalWorking += totalWorkingMinutes;
    totalUndertime += undertimeMinutes;
    totalOvertime += overtimeMinutes;
    totalBreak += calculateTotalBreakMinutesPure(row);

    if (row.status === "Present") {
      totalPresentDays++;
    } else if (row.status === "Late") {
      totalLateDays++;
    } else if (row.status === "Absent") {
      totalAbsentDays++;
    }
  });

  return {
    totalWorking,
    totalUndertime,
    totalOvertime,
    totalBreak,
    totalPresentDays,
    totalLateDays,
    totalAbsentDays,
    totalDaysInPeriod: props.dtrRows.length,
  };
});

const totalWorkingHoursFormatted = computed(() => {
  return formatMinutesToHoursMinutes(calculateGrandTotals.value.totalWorking);
});

const totalUndertimeFormatted = computed(() => {
  const total = calculateGrandTotals.value.totalUndertime;
  return total > 0 ? formatMinutesToHoursMinutes(total) : "—";
});

const totalOvertimeFormatted = computed(() => {
  const total = calculateGrandTotals.value.totalOvertime;
  return total > 0 ? formatMinutesToHoursMinutes(total) : "—";
});

const totalBreakFormatted = computed(() => {
  const total = calculateGrandTotals.value.totalBreak;
  return total > 0 ? formatMinutesToHoursMinutes(total) : "—";
});

// --- NEW: Event Emission Logic (MOVED UP) ---
const emit = defineEmits(["dtr-summary-calculated"]); // Define the custom event

const emitCalculatedSummary = () => {
  // Ensure calculateGrandTotals.value is accessible and not null/undefined
  if (calculateGrandTotals.value) {
    emit("dtr-summary-calculated", {
      // Emit the formatted strings directly
      totalWorkingHoursFormatted: totalWorkingHoursFormatted.value, // <--- THIS IS THE KEY CHANGE
      totalUndertimeFormatted: totalUndertimeFormatted.value, // <--- THIS IS THE KEY CHANGE
      totalOvertimeFormatted: totalOvertimeFormatted.value, // <--- THIS IS THE KEY CHANGE
      totalBreakFormatted: totalBreakFormatted.value, // <--- THIS IS THE KEY CHANGE
      // Keep other raw values or formatted values as needed
      totalPresentDays: calculateGrandTotals.value.totalPresentDays,
      totalLateDays: calculateGrandTotals.value.totalLateDays,
      totalAbsentDays: calculateGrandTotals.value.totalAbsentDays,
      totalDaysInPeriod: calculateGrandTotals.value.totalDaysInPeriod,
    });
  }
};

// Watch for changes in dtrRows and internalEmployeeData to re-emit summary
watch(
  () => [props.dtrRows, internalEmployeeData.value],
  () => {
    emitCalculatedSummary();
  },
  { deep: true, immediate: true } // Deep watch for array/object changes; immediate for initial run
);

// Also ensure emission happens on initial mount if data is already there
onMounted(() => {
  // The watch with immediate: true already handles initial emission if data is available.
  // This explicit onMounted check is less critical now but harmless.
  if (props.dtrRows.length > 0 || internalEmployeeData.value) {
    emitCalculatedSummary();
  }
});

const dtrColumns = computed(() => [
  {
    name: "number_of_days",
    required: true,
    label: "Day",
    align: "center",
    field: "number_of_days",
  },
  {
    name: "time_in",
    required: true,
    label: "Time In",
    align: "center",
    field: (row) => {
      if (row.time_in) {
        const formattedDate = date.formatDate(row.time_in, "MMM. DD, YYYY");
        const formattedTime = date.formatDate(row.time_in, "h:mm A");
        return `${formattedDate}\n${formattedTime}`; // Use newline for better display
      }
      return "N/A";
    },
  },
  {
    name: "time_out",
    required: true,
    label: "Time Out",
    align: "center",
    field: (row) => {
      if (row.time_out) {
        const formattedDate = date.formatDate(row.time_out, "MMM. DD, YYYY");
        const formattedTime = date.formatDate(row.time_out, "h:mm A");
        return `${formattedDate}\n${formattedTime}`; // Use newline for better display
      }
      return "N/A";
    },
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
  {
    name: "total_break",
    required: true,
    label: "Total Break",
    align: "center",
    field: (row) => {
      const totalBreakMins = calculateTotalBreakMinutesPure(row);
      return totalBreakMins > 0
        ? formatMinutesToHoursMinutes(totalBreakMins)
        : "—";
    },
  },
]);
</script>

<style lang="scss" scoped>
.modern-dtr-table {
  border-radius: 12px;
  overflow: hidden; // Ensures border-radius is respected
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); // Soft, subtle shadow

  .q-table__container {
    background-color: #fff;
  }

  // Remove default table border (Quasar's `bordered` prop handles outer border)
  .q-table__middle,
  .q-table__bottom,
  .q-table__top {
    border: none;
  }

  // Hide the "No data available" if you always want the total row
  .q-table__bottom--nodata {
    display: none;
  }

  // Make all 15 rows fit by preventing internal scrolling and shrinking cells.
  // Target the internal scrollable body of the q-table
  :deep(.q-table__middle) {
    overflow-y: visible !important; // Prevent vertical scrolling for the table body
    max-height: none !important; // Allow content to dictate height, remove any height limits
  }

  // --- Table Header Styling ---
  .modern-dtr-table-header {
    background-color: #f5f7fa; // Light background for headers
    th {
      padding: 12px 8px; // More vertical padding
      font-size: 0.9em; // Slightly smaller font size
      color: #555; // Softer header text color
      border-bottom: 2px solid #e0e0e0; // Thicker, more prominent bottom border
      &:first-child {
        border-left: none; // Remove left border for the first header
      }
      &:last-child {
        border-right: none; // Remove right border for the last header
      }
    }
  }

  // --- Table Body Cell Styling ---
  .modern-dtr-table-cell {
    padding-top: 8px !important; // More top padding
    padding-bottom: 8px !important; // More bottom padding
    font-size: 0.875em; // Standard body text size
    color: #424242; // Darker grey for content
    border-color: #eeeeee; // Lighter cell borders
    border-right: 1px solid #eeeeee; // Ensure right border is visible
    border-bottom: 1px solid #f5f5f5; // Very subtle row separation

    &:last-child {
      border-right: none; // Remove right border for the last cell in a row
    }

    span.text-body2 {
      white-space: pre-wrap; /* Allows newline characters to create line breaks */
      line-height: 1.4; /* Adjust line height for better readability with newlines */
    }
  }

  // --- Total Row Styling ---
  .modern-dtr-total-row {
    background-color: #e3f2fd; // A light, calming blue for the total row
    border-top: 2px solid #90caf9; // Distinct top border for emphasis
    td {
      padding: 14px 8px; // More padding for total row cells
      font-size: 1em; // Slightly larger font for totals
      font-weight: bold;
      color: #333; // Darker text for totals
      border-right: 1px solid #bbdefb; // Lighter border for total row cells
      border-bottom: none; // No bottom border for the last row

      &:first-child {
        border-left: none; // Remove left border for the first cell
      }
      &:last-child {
        border-right: none; // Remove right border for the last cell
      }
    }

    .total-label {
      color: #212121; // Darker specific color for "Total" label
      // Adjust border behavior for the combined cells
      border-right: none !important;
      border-left: none !important;
      position: relative; /* Needed for pseudo-elements */
      &::after {
        /* Hide the right vertical line of the "Total" label cell */
        content: none !important;
      }
    }

    // Hide vertical borders for the empty cells using their index
    td:nth-child(2),
    td:nth-child(3) {
      border-left: none !important;
      border-right: none !important;
      // Also hide Quasar's pseudo-elements that draw these specific vertical lines
      &::before,
      &::after {
        content: none !important;
        display: none !important;
        border: none !important;
      }
    }
  }

  // --- Color overrides for the total row values ---
  .text-primary-8 {
    color: #2196f3; // Deeper blue for working hours total
  }
  .text-orange-8 {
    color: #fb8c00; // Deeper orange for undertime total
  }
  .text-positive-8 {
    color: #4caf50; // Deeper green for overtime total
  }
  .text-blue-grey-8 {
    color: #607d8b; // Deeper blue-grey for break total
  }
}
</style>
