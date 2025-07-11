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
        <q-td
          class="text-left text-weight-bold text-grey-9 total-label"
          colspan="4"
          >Total</q-td
        >

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

        <q-td class="text-center text-weight-bold text-deep-purple-8">
          {{ totalNightDifferentialFormatted }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { date } from "quasar";

const props = defineProps(["dtrRows", "employeeData"]);

const NIGHT_DIFF_START_HOUR = 22; // 10 PM
const NIGHT_DIFF_END_HOUR = 6; // 6 AM (next day)

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

// Helper function to calculate minutes within the night differential period for ANY given time interval.
const calculateNightDifferentialMinutes = (inTime, outTime) => {
  if (!inTime || !outTime || inTime >= outTime) {
    return 0;
  }

  let totalNightDiffMinutes = 0;

  const startInterval = new Date(inTime);
  const endInterval = new Date(outTime);

  let currentDay = date.startOfDate(startInterval);

  while (currentDay < endInterval) {
    let ndStartCurrentDay = new Date(currentDay);
    ndStartCurrentDay.setHours(NIGHT_DIFF_START_HOUR, 0, 0, 0);

    let ndEndCurrentDay = new Date(currentDay);
    ndEndCurrentDay.setHours(NIGHT_DIFF_END_HOUR, 0, 0, 0);

    if (ndEndCurrentDay <= ndStartCurrentDay) {
      ndEndCurrentDay = date.addToDate(ndEndCurrentDay, { days: 1 });
    }

    const intersectionStart = Math.max(
      startInterval.getTime(),
      ndStartCurrentDay.getTime()
    );
    const intersectionEnd = Math.min(
      endInterval.getTime(),
      ndEndCurrentDay.getTime()
    );

    if (intersectionEnd > intersectionStart) {
      totalNightDiffMinutes += Math.floor(
        (intersectionEnd - intersectionStart) / (1000 * 60)
      );
    }

    currentDay = date.addToDate(currentDay, { days: 1 });
  }

  return totalNightDiffMinutes;
};

/**
 * Calculates working hours, undertime, overtime, and night differential for a single DTR row.
 * Now dynamically deducts break time based on recorded breaks and also deducts break time
 * from night differential if breaks fall within the ND window.
 * @param {Object} row - The DTR row data.
 * @returns {Object} An object containing calculated times in minutes.
 */
const calculateRowTimes = (row) => {
  let totalWorkingMinutes = 0;
  let undertimeMinutes = 0;
  let overtimeMinutes = 0;
  let nightDifferentialMinutes = 0;

  if (!row.time_in || !row.time_out || !row.schedule_in || !row.schedule_out) {
    return {
      totalWorkingMinutes,
      undertimeMinutes,
      overtimeMinutes,
      nightDifferentialMinutes,
    };
  }

  const actualIn = new Date(row.time_in);
  const actualOut = new Date(row.time_out);

  if (isNaN(actualIn.getTime()) || isNaN(actualOut.getTime())) {
    return {
      totalWorkingMinutes,
      undertimeMinutes,
      overtimeMinutes,
      nightDifferentialMinutes,
    };
  }

  const scheduledIn = parseTimeToDate(row.schedule_in, actualIn);
  const scheduledOut = parseTimeToDate(row.schedule_out, actualOut);

  if (!scheduledIn || !scheduledOut) {
    return {
      totalWorkingMinutes,
      undertimeMinutes,
      overtimeMinutes,
      nightDifferentialMinutes,
    };
  }

  const recordedBreakMinutes = calculateTotalBreakMinutesPure(row);
  const breakDeduction = recordedBreakMinutes < 60 ? 60 : recordedBreakMinutes;

  // --- Working Hours Calculation (Net of breaks) ---
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

  // --- Night Differential Calculation (Net of breaks) ---
  // 1. Calculate gross ND for the entire actual work period (Time In to Time Out)
  let grossNightDifferentialMinutes = calculateNightDifferentialMinutes(
    actualIn,
    actualOut
  );

  // 2. Calculate ND minutes that fall during break periods
  let ndMinutesDuringBreaks = 0;

  // Deduct ND for lunch break if it exists and is valid
  if (row.lunch_break_start && row.lunch_break_end) {
    const lunchBreakStart = new Date(row.lunch_break_start);
    const lunchBreakEnd = new Date(row.lunch_break_end);
    if (
      !isNaN(lunchBreakStart.getTime()) &&
      !isNaN(lunchBreakEnd.getTime()) &&
      lunchBreakEnd > lunchBreakStart
    ) {
      ndMinutesDuringBreaks += calculateNightDifferentialMinutes(
        lunchBreakStart,
        lunchBreakEnd
      );
    }
  }

  // Deduct ND for other break if it exists and is valid
  if (row.break_start && row.break_end) {
    const otherBreakStart = new Date(row.break_start);
    const otherBreakEnd = new Date(row.break_end);
    if (
      !isNaN(otherBreakStart.getTime()) &&
      !isNaN(otherBreakEnd.getTime()) &&
      otherBreakEnd > otherBreakStart
    ) {
      ndMinutesDuringBreaks += calculateNightDifferentialMinutes(
        otherBreakStart,
        otherBreakEnd
      );
    }
  }

  // 3. Subtract break ND from gross ND to get net ND
  nightDifferentialMinutes = Math.max(
    0,
    grossNightDifferentialMinutes - ndMinutesDuringBreaks
  );

  // --- Overtime Calculation (remains largely the same, but you might want to ensure
  //     it only considers approved OT that doesn't overlap with already counted regular hours
  //     or refine if ND applies differently to OT) ---
  if (row.ot_status === "approved" && row.overtime_start && row.overtime_end) {
    const otIn = new Date(row.overtime_start);
    const otOut = new Date(row.overtime_end);

    if (!isNaN(otIn.getTime()) && !isNaN(otOut.getTime()) && otOut > otIn) {
      const otMs = otOut.getTime() - otIn.getTime();
      overtimeMinutes = Math.floor(otMs / (1000 * 60)); // Total approved overtime minutes
      // Important: If you want to calculate ND for OT, this needs careful handling
      // to avoid double-counting ND from the `grossNightDifferentialMinutes` if OT overlaps.
      // A common approach is:
      // total_nd = ND(Actual_In, Actual_Out) - ND(Break1_Start, Break1_End) - ND(Break2_Start, Break2_End)
      // This covers ND for all *net* actual work, including any OT within that period.
      // If OT ND has a *different* rate/rule, then you'd calculate it separately here.
      // For now, `nightDifferentialMinutes` is the *total* net ND.
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
  let totalNightDifferential = 0;
  let totalPresentDays = 0;
  let totalLateDays = 0;
  let totalAbsentDays = 0;

  if (!props.dtrRows || props.dtrRows.length === 0) {
    return {
      totalWorking,
      totalUndertime,
      totalOvertime,
      totalBreak,
      totalNightDifferential,
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
    } = calculateRowTimes(row);

    totalWorking += totalWorkingMinutes;
    totalUndertime += undertimeMinutes;
    totalOvertime += overtimeMinutes;
    totalBreak += calculateTotalBreakMinutesPure(row);
    totalNightDifferential += nightDifferentialMinutes;

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
    totalNightDifferential,
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

const emit = defineEmits(["dtr-summary-calculated"]);

const emitCalculatedSummary = () => {
  if (calculateGrandTotals.value) {
    emit("dtr-summary-calculated", {
      totalWorkingHoursFormatted: totalWorkingHoursFormatted.value,
      totalUndertimeFormatted: totalUndertimeFormatted.value,
      totalOvertimeFormatted: totalOvertimeFormatted.value,
      totalBreakFormatted: totalBreakFormatted.value,
      totalNightDifferentialFormatted: totalNightDifferentialFormatted.value,
      totalPresentDays: calculateGrandTotals.value.totalPresentDays,
      totalLateDays: calculateGrandTotals.value.totalLateDays,
      totalAbsentDays: calculateGrandTotals.value.totalAbsentDays,
      totalDaysInPeriod: calculateGrandTotals.value.totalDaysInPeriod,
    });
  }
};

watch(
  () => props.dtrRows,
  () => {
    emitCalculatedSummary();
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  if (props.dtrRows.length > 0) {
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
        return `${formattedDate}\n${formattedTime}`;
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
        return `${formattedDate}\n${formattedTime}`;
      }
      return "N/A";
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
  {
    name: "total_working_hours",
    required: true,
    label: "Working Hours",
    align: "center",
    field: (row) => {
      const { totalWorkingMinutes } = calculateRowTimes(row);
      return formatMinutesToHoursMinutes(totalWorkingMinutes);
    },
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
    name: "night_differential",
    required: true,
    label: "Night Diff.",
    align: "center",
    field: (row) => {
      const { nightDifferentialMinutes } = calculateRowTimes(row);
      return nightDifferentialMinutes > 0
        ? formatMinutesToHoursMinutes(nightDifferentialMinutes)
        : "—";
    },
  },
]);
</script>
