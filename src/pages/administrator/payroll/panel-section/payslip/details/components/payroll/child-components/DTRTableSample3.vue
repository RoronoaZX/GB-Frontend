<template>
  <div></div>
</template>

<script setup>
// Before (Old version):
// const calculateRowTimes = (row, designation) => {
//   // ... uses designation.time_in, designation.time_out
// }

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
      // REMOVED: if (!internalEmployeeData.value?.designation) return "N/A";
      // Call calculateRowTimes with only the 'row' object
      const { totalWorkingMinutes } = calculateRowTimes(row); // <--- MODIFIED HERE
      return formatMinutesToHoursMinutes(totalWorkingMinutes);
    },
  },
  {
    name: "undertime_minutes",
    required: true,
    label: "Undertime/Late",
    align: "center",
    field: (row) => {
      // REMOVED: if (!internalEmployeeData.value?.designation) return "N/A";
      // Call calculateRowTimes with only the 'row' object
      const { undertimeMinutes } = calculateRowTimes(row); // <--- MODIFIED HERE
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
      // REMOVED: if (!internalEmployeeData.value?.designation) return "N/A";
      // Call calculateRowTimes with only the 'row' object
      const { overtimeMinutes } = calculateRowTimes(row); // <--- MODIFIED HERE
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
    name: "schedule",
    required: true,
    label: "Schedule",
    align: "center",
    field: (row) => {
      // Assuming row.schedule_in and row.schedule_out are available as date-parsable strings/Date objects
      if (row.schedule_in && row.schedule_out) {
        // You might need to parse them to Date objects first if they are just time strings
        // For simplicity, let's assume they are already full date-time strings
        // or that date.formatDate can handle time-only strings if they match its expectations.

        // If row.schedule_in and row.schedule_out are just time strings like "09:00" or "09:00 AM",
        // you might need a dummy date for parsing with Quasar's date utility.
        // However, if they are already full date-time strings (e.g., "2023-10-26T09:00:00"),
        // then date.formatDate can directly use them.

        // Let's assume for robust parsing, schedule_in/out are full date-time strings,
        // or that 'parseTimeToDate' (which you already have) can convert them to proper Date objects
        // if they are just time strings.

        // Re-using your parseTimeToDate for consistency, although date.formatDate might work directly
        // if row.schedule_in/out are valid date-time strings
        const scheduleInTime = parseTimeToDate(row.schedule_in, new Date()); // Use a dummy date for time-only parsing
        const scheduleOutTime = parseTimeToDate(row.schedule_out, new Date()); // Use a dummy date

        if (scheduleInTime && scheduleOutTime) {
          const formattedIn = date.formatDate(scheduleInTime, "h:mm A");
          const formattedOut = date.formatDate(scheduleOutTime, "h:mm A");
          return `${formattedIn} - ${formattedOut}`;
        }
      }
      return "N/A"; // Or 'No Schedule'
    },
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
]);

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
</script>

<style lang="scss" scoped></style>
