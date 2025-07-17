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
        <q-td class="text-center text-weight-bold text-grey-9 total-label"
          >Total</q-td
        >
        <q-td></q-td>
        <q-td></q-td>

        <q-td class="text-center text-weight-bold text-teal-7">
          {{ totalWorkingHoursFormatted }}
        </q-td>

        <q-td class="text-center text-weight-bold text-negative">
          {{ totalUndertimeFormatted }}
        </q-td>

        <q-td class="text-center text-weight-bold text-orange-8">
          {{ totalOvertimeFormatted }}
        </q-td>

        <q-td class="text-center text-weight-bold text-warning">
          {{ totalNightDifferentialFormatted }}
        </q-td>

        <q-td class="text-center text-weight-bold text-warning">
          {{ totalBreakFormatted }}
        </q-td>
        <q-td></q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { date } from "quasar";

const props = defineProps(["dtrRows", "employeeData"]);

const internalEmployeeData = ref(props.employeeData);

const NIGHT_DIFF_START_HOUR = 22; // 10 PM
const NIGHT_DIFF_END_HOUR = 6;

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

const calculateNightDifferentialMinutes = (inTime, outTime) => {
  if (!inTime || !outTime || inTime >= outTime) {
    return 0;
  }

  let totalNightDiffMinutes = 0;

  const startShift = new Date(inTime);
  const endShift = new Date(outTime);

  let currentDay = date.startOfDate(startShift);

  while (currentDay < endShift) {
    // Define the ND window for the *current calendar day*
    let ndStartCurrentDay = new Date(currentDay);
    ndStartCurrentDay.setHours(NIGHT_DIFF_START_HOUR, 0, 0, 0);

    let ndEndCurrentDay = new Date(currentDay);
    ndEndCurrentDay.setHours(NIGHT_DIFF_END_HOUR, 0, 0, 0);

    // Adjust ndEndCurrentDay if it spans midnight
    if (ndEndCurrentDay <= ndStartCurrentDay) {
      ndEndCurrentDay = date.addToDate(ndEndCurrentDay, { days: 1 });
    }

    // Calculate intersection with the current shift segment
    const intersectionStart = Math.max(
      startShift.getTime(),
      ndStartCurrentDay.getTime()
    );
    const intersectionEnd = Math.min(
      endShift.getTime(),
      ndEndCurrentDay.getTime()
    );

    if (intersectionEnd > intersectionStart) {
      totalNightDiffMinutes += Math.floor(
        (intersectionEnd - intersectionStart) / (1000 * 60)
      );
    }

    // Move to the start of the next calendar day for the next iteration
    currentDay = date.addToDate(currentDay, { days: 1 });
  }
  // The 'while' loop closes here naturally. No extra '}' needed.

  return totalNightDiffMinutes;
};

// Helper function to calculate minutes within the night differential period
// This function needs to handle transitions across midnight.
// const calculateNightDifferentialMinutes = (inTime, outTime) => {
//   if (!inTime || !outTime || inTime >= outTime) {
//     return 0;
//   }

//   let totalNightDiffMinutes = 0;
//   const startOfDay = date.startOfDate(inTime); // Get the start of the 'in' day
//   const endOfDay = date.endOfDate(inTime); // Get the end of the 'in' day

//   // Define the night differential window for the 'current' day (could span into next)
//   let ndStart = new Date(startOfDay);
//   ndStart.setHours(NIGHT_DIFF_START_HOUR, 0, 0, 0); // 10 PM of the current day

//   let ndEnd = new Date(startOfDay);
//   ndEnd.setHours(NIGHT_DIFF_END_HOUR, 0, 0, 0); // 6 AM of the current day (which might be the *next* calendar day)

//   // If the ND end time is before the start time, it means it spans midnight
//   if (ndEnd <= ndStart) {
//     ndEnd = date.addToDate(ndEnd, { days: 1 }); // Move ND end to the next day
//   }

//   // Handle shifts that start on one day and end on the next (common for night shifts)
//   // We need to check for night diff on both the 'inTime' day and potentially the 'outTime' day.

//   // Create segments for night differential relevant to the shift
//   // A night differential period might span from Day 1 10PM to Day 2 6AM.
//   // We need to check if the shift (inTime, outTime) overlaps with this period.

//   // Let's simplify: Iterate day by day from inTime to outTime, check for ND hours.
//   // This is more robust for shifts spanning multiple midnights, though typically DTR is daily.

//   let currentCheckTime = new Date(inTime);
//   while (currentCheckTime < outTime) {
//     const nextDay = date.addToDate(date.startOfDate(currentCheckTime), {
//       days: 1,
//     });

//     // Define ND interval for the day currentCheckTime is on
//     let currentNDStart = new Date(currentCheckTime);
//     currentNDStart.setHours(NIGHT_DIFF_START_HOUR, 0, 0, 0);

//     let currentNDEnd = new Date(currentCheckTime);
//     currentNDEnd.setHours(NIGHT_DIFF_END_HOUR, 0, 0, 0);

//     if (currentNDEnd <= currentNDStart) {
//       currentNDEnd = date.addToDate(currentNDEnd, { days: 1 }); // ND spans midnight
//     }

//     // Determine the actual intersection of the shift interval and this day's ND interval
//     const intersectionStart = Math.max(
//       inTime.getTime(),
//       currentNDStart.getTime()
//     );
//     const intersectionEnd = Math.min(outTime.getTime(), currentNDEnd.getTime());

//     if (intersectionEnd > intersectionStart) {
//       totalNightDiffMinutes += Math.floor(
//         (intersectionEnd - intersectionStart) / (1000 * 60)
//       );
//     }

//     // Move to the next potential segment. If currentCheckTime is already past 6AM on its day,
//     // we jump to 10PM on the next day, otherwise we just move to the end of the ND period
//     // or the start of the next day.
//     if (
//       currentCheckTime.getHours() >= NIGHT_DIFF_END_HOUR &&
//       currentCheckTime.getHours() < NIGHT_DIFF_START_HOUR
//     ) {
//       // If current check time is within the day non-ND period, jump to next ND start (10 PM)
//       currentCheckTime = new Date(currentCheckTime); // Copy to avoid modifying original
//       currentCheckTime.setHours(NIGHT_DIFF_START_HOUR, 0, 0, 0);
//       // If 10 PM is before currentCheckTime, move to next day's 10 PM
//       if (currentCheckTime <= inTime) {
//         currentCheckTime = date.addToDate(currentCheckTime, { days: 1 });
//       }
//     } else {
//       // If we were in the ND window or after it (but before next 10PM), jump to next day's 6AM.
//       // This is a simplified jump to ensure we don't miss ND on the subsequent day.
//       currentCheckTime = nextDay; // Move to the start of the next calendar day
//       currentCheckTime.setHours(NIGHT_DIFF_END_HOUR, 0, 0, 0); // Jump to the end of the ND period (6 AM) of the *next* day.
//     }
//   }

//   return totalNightDiffMinutes;
// };

/**
 * Calculates working hours, undertime, and overtime for a single DTR row.
 * Now dynamically deducts break time based on recorded breaks.
 * @param {Object} row - The DTR row data.
 * @param {Object} designation - The employee's designation data (with time_in, time_out).
 * @returns {Object} An object containing calculated times in minutes.
 */
const calculateRowTimes = (row) => {
  let totalWorkingMinutes = 0;
  let undertimeMinutes = 0;
  let overtimeMinutes = 0;
  let nightDifferentialMinutes = 0; // NEW VARIABLE

  if (!row.time_in || !row.time_out || !row.schedule_in || !row.schedule_out) {
    return {
      totalWorkingMinutes,
      undertimeMinutes,
      overtimeMinutes,
      nightDifferentialMinutes,
    }; // Include ND here
  }

  const actualIn = new Date(row.time_in);
  const actualOut = new Date(row.time_out);

  if (isNaN(actualIn.getTime()) || isNaN(actualOut.getTime())) {
    return {
      totalWorkingMinutes,
      undertimeMinutes,
      overtimeMinutes,
      nightDifferentialMinutes,
    }; // Include ND here
  }

  const scheduledIn = parseTimeToDate(row.schedule_in, actualIn);
  const scheduledOut = parseTimeToDate(row.schedule_out, actualOut);

  if (!scheduledIn || !scheduledOut) {
    return {
      totalWorkingMinutes,
      undertimeMinutes,
      overtimeMinutes,
      nightDifferentialMinutes,
    }; // Include ND here
  }

  const recordedBreakMinutes = calculateTotalBreakMinutesPure(row);
  const breakDeduction = recordedBreakMinutes < 60 ? 60 : recordedBreakMinutes;

  // --- Working Hours Calculation ---
  // This logic is for core working hours, excluding any overtime and considering breaks.
  const effectiveIn = actualIn > scheduledIn ? actualIn : scheduledIn;
  const effectiveOut = actualOut < scheduledOut ? actualOut : scheduledOut;

  if (effectiveOut > effectiveIn) {
    const totalMs = effectiveOut.getTime() - effectiveIn.getTime();
    const adjustedMs = totalMs - breakDeduction * 60 * 1000;
    if (adjustedMs > 0) {
      totalWorkingMinutes = Math.floor(adjustedMs / (1000 * 60));
    }
  }

  // --- Night Differential Calculation (within regular and potentially overtime hours) ---
  // You need to define how ND interacts with OT.
  // Common approach: ND applies to *any* actual working hours (regular or approved OT) that fall in the window.

  // Calculate ND for regular (scheduled) work period:
  const regularWorkStart = Math.max(actualIn.getTime(), scheduledIn.getTime());
  const regularWorkEnd = Math.min(actualOut.getTime(), scheduledOut.getTime());

  if (regularWorkEnd > regularWorkStart) {
    nightDifferentialMinutes += calculateNightDifferentialMinutes(
      new Date(regularWorkStart),
      new Date(regularWorkEnd)
    );
  }

  // Calculate ND for approved Overtime period:
  if (row.ot_status === "approved" && row.overtime_start && row.overtime_end) {
    const otIn = new Date(row.overtime_start);
    const otOut = new Date(row.overtime_end);

    if (!isNaN(otIn.getTime()) && !isNaN(otOut.getTime()) && otOut > otIn) {
      const otMs = otOut.getTime() - otIn.getTime();
      overtimeMinutes = Math.floor(otMs / (1000 * 60)); // Keep this here for total overtime

      // Add ND minutes from the overtime period
      nightDifferentialMinutes += calculateNightDifferentialMinutes(
        otIn,
        otOut
      );
    }
  }

  // --- Undertime/Late Calculation --- (remains unchanged)
  const expectedMs = scheduledOut.getTime() - scheduledIn.getTime();
  const expectedGrossMinutes = Math.floor(expectedMs / (1000 * 60));
  const expectedWorkingMinutes = Math.max(0, expectedGrossMinutes - 60); // Assuming 1hr standard break

  const actualCountedMinutes = totalWorkingMinutes;
  const calculatedUndertimeMins = expectedWorkingMinutes - actualCountedMinutes;

  if (calculatedUndertimeMins > 0) {
    undertimeMinutes = calculatedUndertimeMins;
  }

  return {
    totalWorkingMinutes,
    undertimeMinutes,
    overtimeMinutes,
    nightDifferentialMinutes,
  };
};

// --- Computed Properties for Grand Totals ---
const calculateGrandTotals = computed(() => {
  let totalWorking = 0;
  let totalUndertime = 0;
  let totalOvertime = 0;
  let totalBreak = 0;
  let totalNightDifferential = 0; // NEW TOTAL
  let totalPresentDays = 0;
  let totalLateDays = 0;
  let totalAbsentDays = 0;

  if (!props.dtrRows || props.dtrRows.length === 0) {
    return {
      totalWorking,
      totalUndertime,
      totalOvertime,
      totalBreak,
      totalNightDifferential, // Include in return
      totalPresentDays,
      totalLateDays,
      totalAbsentDays,
      totalDaysInPeriod: 0,
    };
  }

  props.dtrRows.forEach((row) => {
    const {
      totalWorkingMinutes,
      undertimeMinutes,
      overtimeMinutes,
      nightDifferentialMinutes,
    } = calculateRowTimes(row); // Get ND here

    totalWorking += totalWorkingMinutes;
    totalUndertime += undertimeMinutes;
    totalOvertime += overtimeMinutes;
    totalBreak += calculateTotalBreakMinutesPure(row);
    totalNightDifferential += nightDifferentialMinutes; // Add to total

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
    totalNightDifferential, // Include in return
    totalPresentDays,
    totalLateDays,
    totalAbsentDays,
    totalDaysInPeriod: props.dtrRows.length,
  };
});

const totalNightDifferentialFormatted = computed(() => {
  const total = calculateGrandTotals.value.totalNightDifferential;
  return total > 0 ? formatMinutesToHoursMinutes(total) : "—";
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
      totalNightDiffFormatted: totalNightDifferentialFormatted.value, // <--- THIS IS THE KEY CHANGE
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
    label: "Number Of Days",
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
      const { totalWorkingMinutes } = calculateRowTimes(row);
      return formatMinutesToHoursMinutes(totalWorkingMinutes);
    },
    // field: (row) => {
    //   if (!internalEmployeeData.value?.designation) return "N/A";
    //   const { totalWorkingMinutes } = calculateRowTimes(
    //     row,
    //     internalEmployeeData.value.designation
    //   );
    //   return formatMinutesToHoursMinutes(totalWorkingMinutes);
    // },
  },
  {
    name: "undertime_minutes",
    required: true,
    label: "Undertime/Late",
    align: "center",
    field: (row) => {
      const { undertimeMinutes } = calculateRowTimes(row);
      return undertimeMinutes > 0
        ? formatMinutesToHoursMinutes(undertimeMinutes)
        : "—";
    },
    // field: (row) => {
    //   if (!internalEmployeeData.value?.designation) return "N/A";
    //   const { undertimeMinutes } = calculateRowTimes(
    //     row,
    //     internalEmployeeData.value.designation
    //   );
    //   return undertimeMinutes > 0
    //     ? formatMinutesToHoursMinutes(undertimeMinutes)
    //     : "—";
    // },
  },
  {
    name: "over_time",
    required: true,
    label: "Overtime",
    align: "center",
    field: (row) => {
      const { overtimeMinutes } = calculateRowTimes(row);
      return overtimeMinutes > 0
        ? formatMinutesToHoursMinutes(overtimeMinutes)
        : "—";
    },

    // field: (row) => {
    //   if (!internalEmployeeData.value?.designation) return "N/A";
    //   const { overtimeMinutes } = calculateRowTimes(
    //     row,
    //     internalEmployeeData.value.designation
    //   );
    //   return overtimeMinutes > 0
    //     ? formatMinutesToHoursMinutes(overtimeMinutes)
    //     : "—";
    // },
  },
  {
    name: "night_differential", // New column name
    required: true,
    label: "Night Diff.", // Label for the column
    align: "center",
    field: (row) => {
      const { nightDifferentialMinutes } = calculateRowTimes(row); // Get ND for this row
      return nightDifferentialMinutes > 0
        ? formatMinutesToHoursMinutes(nightDifferentialMinutes)
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
  {
    name: "schedule",
    required: true,
    label: "Schedule",
    align: "center",
    field: (row) => {
      if (row.schedule_in && row.schedule_out) {
        const scheduleInTime = parseTimeToDate(row.schedule_in, new Date());
        const scheduleOutTime = parseTimeToDate(row.schedule_out, new Date());

        if (scheduleInTime && scheduleOutTime) {
          const formattedIn = date.formatDate(scheduleInTime, "h:mm A");
          const formattedOut = date.formatDate(scheduleOutTime, "h:mm A");
          return `${formattedIn} - ${formattedOut}`;
        }
      }
      return "N/A";
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
