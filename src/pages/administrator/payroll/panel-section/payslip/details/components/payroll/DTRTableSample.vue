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

    <template v-slot:bottom-row>
      <q-tr class="bg-blue-grey-1 text-weight-bold total-row">
        <q-td class="text-left">Total</q-td>
        <q-td></q-td>
        <q-td></q-td>

        <q-td class="text-center">
          <span class="text-overline">{{ totalWorkingHoursFormatted }}</span>
        </q-td>

        <q-td class="text-center">
          <span class="text-overline">{{ totalUndertimeFormatted }}</span>
        </q-td>

        <q-td class="text-center">
          <span class="text-overline">{{ totalOvertimeFormatted }}</span>
        </q-td>

        <q-td class="text-center">
          <span class="text-overline">{{ totalBreakFormatted }}</span>
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
  if (totalMinutes < 0) totalMinutes = 0;
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
      totalWorkingMinutes: calculateGrandTotals.value.totalWorking,
      totalUndertimeMinutes: calculateGrandTotals.value.totalUndertime,
      totalOvertimeMinutes: calculateGrandTotals.value.totalOvertime,
      totalBreakMinutes: calculateGrandTotals.value.totalBreak,
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

// Watch for changes in employeeData prop and update internal ref
// This watch is now solely for updating internalEmployeeData and then triggering a summary emit.
watch(
  () => props.employeeData,
  (newVal) => {
    internalEmployeeData.value = newVal;
    // The main watch above already covers emitting when internalEmployeeData changes.
    // So, no need for an extra emit here, to avoid redundant calls.
  },
  {
    immediate: true,
  }
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
        return `${formattedDate} | | ${formattedTime}`;
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
        return `${formattedDate} | | ${formattedTime}`;
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
  /* Add your table styling */
}
.total-row {
  font-weight: bold;
}
</style>
