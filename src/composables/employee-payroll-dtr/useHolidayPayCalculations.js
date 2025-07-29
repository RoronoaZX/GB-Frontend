// composables/useHolidayPayCalculations.js
import { computed } from "vue";
import { date } from "quasar";
import { useDtrCalculations } from "./useDtrCalculations"; // Import the other composable

/**
 * Formats a number as Philippine Peso currency.
 * Moved here as it's also used by this composable.
 * @param {number} value - The numeric value to format.
 * @returns {string} Formatted currency string.
 */
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

/**
 * Composable for holiday pay calculations.
 * @param {Ref<Array<Object>>} dtrRows - Reactive reference to the DTR rows.
 * @param {Ref<Object>} employeeData - Reactive reference to the employee data.
 * @param {Ref<Array<Object>>} dtrHolidays - Reactive reference to the holiday list.
 */
export function useHolidayPayCalculations(dtrRows, employeeData, dtrHolidays) {
  // We need calculateRowTimes from useDtrCalculations
  const { calculateRowTimes } = useDtrCalculations(dtrRows);

  /**
   * Checks if a given date string corresponds to a holiday and returns its type.
   * @param {string} dateString - The date string to check (e.g., from row.time_in).
   * @returns {string|null} The holiday type ('Regular Holiday', 'Special (Non-Working) Holiday'), or null if not a holiday.
   */
  const isHoliday = (dateString) => {
    if (!dateString || !dtrHolidays.value || dtrHolidays.value.length === 0) {
      return null;
    }
    const dtrDate = date.formatDate(dateString, "YYYY-MM-DD");
    const holiday = dtrHolidays.value.find((h) => {
      const holidayDate = date.formatDate(h.date, "YYYY-MM-DD");
      return holidayDate === dtrDate;
    });
    return holiday ? holiday.type : null;
  };

  /**
   * Determines the CSS class for a DTR row based on whether it's a holiday.
   * @param {string} timeIn - The time_in date string for the row.
   * @returns {string} The CSS class.
   */
  const getHolidayRowClass = (timeIn) => {
    const holidayType = isHoliday(timeIn);
    if (holidayType === "Regular Holiday") {
      return "holiday-regular-row";
    } else if (holidayType === "Special (Non-Working) Holiday") {
      return "holiday-special-row";
    }
    return "";
  };

  /**
   * Determines the CSS class for the time_in text based on whether it's a holiday.
   * @param {string} timeIn - The time_in date string for the row.
   * @returns {string} The CSS class.
   */
  const getHolidayTimeInClass = (timeIn) => {
    const holidayType = isHoliday(timeIn);
    return holidayType ? "text-weight-bold text-blue-8" : "text-grey-8";
  };

  /**
   * Helper for holiday rate display classes.
   */
  const isRegularHolidayRate = (rateText) => {
    return rateText.includes("+100%") || rateText.includes("+160%");
  };
  const isSpecialHolidayRate = (rateText) => {
    return rateText.includes("+30%") || rateText.includes("+69%");
  };

  // NEW: Calculate additional holiday pays (REGULAR + OVERTIME)
  const additionalHolidayPays = computed(() => {
    const results = [];
    if (!dtrRows.value || dtrRows.value.length === 0) return results;

    const dailyRate = employeeData.value?.employment_type?.salary || 0;
    const hourlyRate = dailyRate / 8;

    dtrRows.value.forEach((row, index) => {
      const holidayType = isHoliday(row.time_in);
      if (!holidayType) return;

      const formattedDate = date.formatDate(row.time_in, "MMM. DD, YYYY");

      // Regular Holiday Pay for Worked Hours
      if (row.time_in && row.time_out) {
        const { totalWorkingMinutes } = calculateRowTimes(row);
        if (totalWorkingMinutes > 0) {
          const workedHours = totalWorkingMinutes / 60;
          let additionalPay = 0;
          let holidayRateText = "";
          const idPrefix = `${formattedDate}-regular-${index}`; // Unique ID

          if (holidayType === "Regular Holiday") {
            // DOLE: 200% for first 8 hours. Additional pay is 100% of basic wage for 8 hours.
            additionalPay = workedHours * hourlyRate;
            holidayRateText = "+100% Regular Hours";
          } else if (holidayType === "Special (Non-Working) Holiday") {
            // DOLE: 130% of basic wage for first 8 hours. Additional pay is 30% of basic wage.
            additionalPay = workedHours * hourlyRate * 0.3;
            holidayRateText = "+30% Regular Hours";
          }

          results.push({
            id: `${idPrefix}-worked`,
            date: formattedDate,
            holidayType,
            holidayRateText,
            hours: workedHours.toFixed(2),
            additionalPay: parseFloat(additionalPay.toFixed(2)),
            type: "regular_hours",
          });
        }
      }

      // Holiday Overtime Pay (if approved)
      if (
        row.ot_status === "approved" &&
        row.overtime_start &&
        row.overtime_end
      ) {
        const otIn = new Date(row.overtime_start);
        const otOut = new Date(row.overtime_end);

        if (!isNaN(otIn.getTime()) && !isNaN(otOut.getTime()) && otOut > otIn) {
          const overtimeMinutes = Math.floor((otOut - otIn) / (1000 * 60));
          if (overtimeMinutes > 0) {
            const overtimeHours = overtimeMinutes / 60;
            let additionalPay = 0;
            let holidayRateText = "";
            const idPrefix = `${formattedDate}-overtime-${index}`; // Unique ID

            if (holidayType === "Regular Holiday") {
              // DOLE: 260% for OT on regular holiday. Additional is 160% of basic hourly rate.
              additionalPay = overtimeHours * hourlyRate * 1.6;
              holidayRateText = "+160% Overtime";
            } else if (holidayType === "Special (Non-Working) Holiday") {
              // DOLE: 169% for OT on special non-working holiday. Additional is 69% of basic hourly rate.
              additionalPay = overtimeHours * hourlyRate * 0.69;
              holidayRateText = "+69% Overtime";
            }

            results.push({
              id: `${idPrefix}-ot`,
              date: formattedDate,
              holidayType,
              holidayRateText,
              hours: overtimeHours.toFixed(2),
              additionalPay: parseFloat(additionalPay.toFixed(2)),
              type: "overtime_hours",
            });
          }
        }
      }
    });

    return results;
  });

  const totalAdditionalHolidayPay = computed(() => {
    return additionalHolidayPays.value.reduce(
      (acc, item) => acc + item.additionalPay,
      0
    );
  });

  return {
    isHoliday,
    getHolidayRowClass,
    getHolidayTimeInClass,
    isRegularHolidayRate,
    isSpecialHolidayRate,
    additionalHolidayPays,
    totalAdditionalHolidayPay,
    formatCurrency, // Expose formatCurrency as it's used in the template here
  };
}
