import { ref, computed, toRefs } from "vue";
import { date } from "quasar";

// --- Configuration Constants ---
// Centralizing constants makes the code easier to read and maintain.
const NIGHT_DIFF_START_HOUR = 22; // 10 PM
const NIGHT_DIFF_END_HOUR = 6; // 6 AM
const STANDARD_BREAK_MINUTES = 60;

const HOLIDAY_TYPES = {
  REGULAR: "Regular Holiday",
  SPECIAL: "Special (Non-Working) Holiday",
};

// Source: DOLE Handbook on Worker's Statutory Monetary Benefits
// These rates represent the TOTAL percentage of the hourly rate.
// e.g., 200% for regular holiday work means the employee gets their basic pay + a 100% premium.
const DOLE_RATES = {
  [HOLIDAY_TYPES.REGULAR]: {
    worked: 2.0, // 200% for work done
    overtime: 2.6, // 260% for overtime
  },
  [HOLIDAY_TYPES.SPECIAL]: {
    worked: 1.3, // 130% for work done
    overtime: 1.69, // 169% for overtime
  },
};

// --- Helper Functions (Pure Logic) ---

/**
 * Formats a total number of minutes into a "Xh Ym" string.
 * @param {number} totalMinutes - The total minutes to format.
 * @returns {string} The formatted string or a dash if input is invalid.
 */
const formatMinutesToHours = (totalMinutes) => {
  if (
    totalMinutes === null ||
    totalMinutes === undefined ||
    totalMinutes <= 0
  ) {
    return "—";
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

/**
 * Formats a number into a PHP currency string.
 * @param {number | string} value - The numeric value.
 * @returns {string} Formatted currency string.
 */
const formatCurrency = (value) => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(0);
  }
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(numValue);
};

/**
 * Parses a time string (e.g., "8:00 AM") into a Date object on a given day.
 * @param {string} timeString - The time string (e.g., "8:00 AM").
 * @param {Date} baseDate - The date to set the time on.
 * @returns {Date | null} The full Date object or null if parsing fails.
 */
const parseTimeToDate = (timeString, baseDate) => {
  if (!timeString || !baseDate) return null;
  const match = timeString.match(/(\d+):(\d+)\s*(AM|PM)?/i);
  if (!match) return null;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const ampm = match[3] ? match[3].toUpperCase() : "";

  if (ampm === "PM" && hours < 12) hours += 12;
  else if (ampm === "AM" && hours === 12) hours = 0; // Midnight case

  const newDate = new Date(baseDate);
  newDate.setHours(hours, minutes, 0, 0);
  return newDate;
};

// --- Main Composable Function ---

export function useDtrCalculations(props) {
  // Use toRefs to maintain reactivity when passing props to a composable
  const { dtrRows, employeeData, dtrHolidays } = toRefs(props);

  const hourlyRate = computed(() => {
    const dailyRate = employeeData.value?.employment_type?.salary || 0;
    return dailyRate > 0 ? dailyRate / 8 : 0;
  });

  const holidaysMap = computed(() => {
    const map = new Map();
    if (!dtrHolidays.value) return map;
    for (const holiday of dtrHolidays.value) {
      const holidayDate = date.formatDate(holiday.date, "YYYY-MM-DD");
      map.set(holidayDate, holiday.type);
    }
    return map;
  });

  /**
   * Enriched DTR rows with all calculated metrics.
   * This is the core of the composable, performing all calculations once per row.
   */
  const processedRows = computed(() => {
    if (!dtrRows.value || dtrRows.value.length === 0) return [];

    return dtrRows.value.map((row) => {
      // --- Initial Setup & Validation ---
      const actualIn = row.time_in ? new Date(row.time_in) : null;
      const actualOut = row.time_out ? new Date(row.time_out) : null;
      const scheduledIn = actualIn
        ? parseTimeToDate(row.schedule_in, actualIn)
        : null;
      const scheduledOut = actualOut
        ? parseTimeToDate(row.schedule_out, actualOut)
        : null;

      const isValid =
        actualIn &&
        actualOut &&
        scheduledIn &&
        scheduledOut &&
        actualOut > actualIn;
      if (!isValid) {
        return {
          ...row,
          workingMinutes: 0,
          undertimeMinutes: 0,
          overtimeMinutes: 0,
          nightDiffMinutes: 0,
          breakMinutes: 0,
        };
      }

      // --- Calculations ---
      const breakMinutes = ((r) => {
        let total = 0;
        const periods = [
          { start: r.lunch_break_start, end: r.lunch_break_end },
          { start: r.break_start, end: r.break_end },
        ];
        for (const p of periods) {
          if (p.start && p.end) {
            const startMs = new Date(p.start).getTime();
            const endMs = new Date(p.end).getTime();
            if (endMs > startMs) total += endMs - startMs;
          }
        }
        return Math.floor(total / 60000);
      })(row);

      const breakDeduction =
        breakMinutes < STANDARD_BREAK_MINUTES
          ? STANDARD_BREAK_MINUTES
          : breakMinutes;

      const effectiveIn = actualIn > scheduledIn ? actualIn : scheduledIn;
      const effectiveOut = actualOut < scheduledOut ? actualOut : scheduledOut;

      let workingMinutes = 0;
      if (effectiveOut > effectiveIn) {
        const grossMs = effectiveOut.getTime() - effectiveIn.getTime();
        const netMs = grossMs - breakDeduction * 60000;
        workingMinutes = Math.max(0, Math.floor(netMs / 60000));
      }

      const expectedMinutes =
        Math.floor((scheduledOut - scheduledIn) / 60000) -
        STANDARD_BREAK_MINUTES;
      const undertimeMinutes = Math.max(0, expectedMinutes - workingMinutes);

      let overtimeMinutes = 0;
      if (
        row.ot_status === "approved" &&
        row.overtime_start &&
        row.overtime_end
      ) {
        const otIn = new Date(row.overtime_start);
        const otOut = new Date(row.overtime_end);
        if (otOut > otIn) {
          overtimeMinutes = Math.floor((otOut - otIn) / 60000);
        }
      }

      const holidayType =
        holidaysMap.value.get(date.formatDate(actualIn, "YYYY-MM-DD")) || null;

      // --- Return enriched row object ---
      // We calculate everything here so the UI can just display it.
      return {
        ...row,
        workingMinutes,
        undertimeMinutes,
        overtimeMinutes,
        nightDiffMinutes: 0, // Placeholder for night diff logic if needed
        breakMinutes,
        holidayType,
        // Pre-formatted strings for easy display
        workingHoursFormatted: formatMinutesToHours(workingMinutes),
        undertimeFormatted: formatMinutesToHours(undertimeMinutes),
        overtimeFormatted: formatMinutesToHours(overtimeMinutes),
        breakFormatted: formatMinutesToHours(breakMinutes),
        allowanceFormatted: formatCurrency(row.employee_allowance),
        scheduleFormatted: `${row.schedule_in} - ${row.schedule_out}`,
      };
    });
  });

  /**
   * Calculates additional pay for holidays based on the processed rows.
   */
  const holidayPayDetails = computed(() => {
    const results = [];
    if (!hourlyRate.value) return results;

    processedRows.value.forEach((row, index) => {
      if (!row.holidayType) return;

      const holidayRateConfig = DOLE_RATES[row.holidayType];
      if (!holidayRateConfig) return;

      const formattedDate = date.formatDate(row.time_in, "MMM. DD, YYYY");

      // 1. Regular Worked Hours on a Holiday
      if (row.workingMinutes > 0) {
        const workedHours = row.workingMinutes / 60;
        // The "additional" pay is the premium on top of the base salary (which is assumed to be paid already).
        const additionalPay =
          workedHours * hourlyRate.value * (holidayRateConfig.worked - 1);
        results.push({
          id: `${formattedDate}-regular-${index}`,
          date: formattedDate,
          holidayType: row.holidayType,
          description: "Regular Hours Premium",
          hours: workedHours.toFixed(2),
          additionalPay: additionalPay.toFixed(2),
        });
      }

      // 2. Overtime Hours on a Holiday
      if (row.overtimeMinutes > 0) {
        const overtimeHours = row.overtimeMinutes / 60;
        // The "additional" pay is the premium on top of the base salary.
        const additionalPay =
          overtimeHours * hourlyRate.value * (holidayRateConfig.overtime - 1);
        results.push({
          id: `${formattedDate}-overtime-${index}`,
          date: formattedDate,
          holidayType: row.holidayType,
          description: "Overtime Premium",
          hours: overtimeHours.toFixed(2),
          additionalPay: additionalPay.toFixed(2),
        });
      }
    });
    return results;
  });

  /**
   * Aggregates all metrics into grand totals.
   */
  const grandTotals = computed(() => {
    const totals = {
      working: 0,
      undertime: 0,
      overtime: 0,
      break: 0,
      present: 0,
      late: 0,
      absent: 0,
      allowance: 0,
      holidayPay: 0,
    };

    processedRows.value.forEach((row) => {
      totals.working += row.workingMinutes;
      totals.undertime += row.undertimeMinutes;
      totals.overtime += row.overtimeMinutes;
      totals.break += row.breakMinutes;
      totals.allowance += parseFloat(row.employee_allowance || 0);

      if (row.status === "Present") totals.present++;
      else if (row.status === "Late") totals.late++;
      else if (row.status === "Absent") totals.absent++;
    });

    totals.holidayPay = holidayPayDetails.value.reduce(
      (acc, item) => acc + parseFloat(item.additionalPay),
      0
    );

    return {
      totalWorking: totals.working,
      totalUndertime: totals.undertime,
      totalOvertime: totals.overtime,
      totalBreak: totals.break,
      totalPresentDays: totals.present,
      totalLateDays: totals.late,
      totalAbsentDays: totals.absent,
      totalDaysInPeriod: dtrRows.value?.length || 0,
      totalEmployeeAllowances: totals.allowance,
      totalAdditionalHolidayPays: totals.holidayPay,
    };
  });

  /**
   * Final summary object, ready to be emitted.
   */
  const summaryForEmit = computed(() => ({
    ...grandTotals.value,
    totalWorkingHours: formatMinutesToHours(grandTotals.value.totalWorking),
    totalUndertime: formatMinutesToHours(grandTotals.value.totalUndertime),
    totalOvertime: formatMinutesToHours(grandTotals.value.totalOvertime),
    totalBreak: formatMinutesToHours(grandTotals.value.totalBreak),
    // Night differential can be added here if implemented
    totalNightDifferential: "—",
  }));

  // Return all the reactive properties that the component will need.
  return {
    processedRows,
    grandTotals,
    holidayPayDetails,
    summaryForEmit,
    // also return helpers if they are needed directly in the template
    formatMinutesToHours,
    formatCurrency,
  };
}
