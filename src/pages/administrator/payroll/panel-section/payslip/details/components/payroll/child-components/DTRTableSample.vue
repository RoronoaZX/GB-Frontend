<template>
  <!-- {{ calculateAdditionalHolidayPays }} -->
  <q-card flat bordered class="q-mb-md employee-holiday-pay-card">
    <q-card-section class="text-center q-pb-md">
      <div class="text-h5 text-primary text-weight-bold">
        Employee Holiday Pay
      </div>
    </q-card-section>

    <q-list class="holiday-pay-list">
      <q-item class="header-row bg-primary-1 text-weight-bold text-blue-grey-8">
        <q-item-section class="col-3">Date</q-item-section>
        <q-item-section class="col-6 text-center">Percentage</q-item-section>
        <q-item-section class="col-3 text-right"
          >Daily Additional Pay</q-item-section
        >
      </q-item>

      <template
        v-if="
          calculateAdditionalHolidayPays &&
          calculateAdditionalHolidayPays.length > 0
        "
      >
        <q-item
          v-for="(pay, index) in calculateAdditionalHolidayPays"
          :key="pay.id"
          class="data-row"
          :class="{
            'bg-white': index % 2 === 0,
            'bg-blue-grey-0': index % 2 !== 0,
          }"
        >
          <q-item-section
            class="col-3 text-blue-7 text-weight-medium date-link"
          >
            {{ pay.date }}
          </q-item-section>
          <q-item-section
            class="col-6 text-center text-weight-medium"
            :class="{
              'text-green-7':
                pay.holidayRateText === '+100%' ||
                pay.holidayRateText === '+100% (OT)',
              'text-amber-7':
                pay.holidayRateText === '+30%' ||
                pay.holidayRateText === '+30% (OT)',
            }"
          >
            {{ pay.holidayRateText }}
          </q-item-section>
          <q-item-section class="col-3 text-right text-grey-8">
            {{ pay.additionalPay }}
          </q-item-section>
        </q-item>

        <q-item
          class="total-row bg-blue-grey-1 text-weight-bold text-blue-grey-9"
        >
          <q-item-section
            class="text-h6 text-weight-bold text-grey-8 col-9 text-right"
            >Total :</q-item-section
          >
          <q-item-section class="col-3 text-right text-h6 text-green-8">
            {{ formatCurrency(totalAdditionalHolidayPays || 0) }}
            <!-- ₱ {{ totalAdditionalHolidayPays }} -->
          </q-item-section>
        </q-item>
      </template>
      <template v-else>
        <q-item>
          <q-item-section class="text-center text-grey-6 q-py-md">
            No holiday pay records found.
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-card>
  <div class="text-h6 text-center q-mb-sm text-grey-8">Daily Time Records</div>
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

    <template v-slot:body="rowProps">
      <q-tr
        :props="rowProps"
        :class="getHolidayRowClass(rowProps.row.time_in)"
        class="modern-dtr-table-row"
      >
        <q-td
          v-for="col in rowProps.cols"
          :key="col.name"
          :props="rowProps"
          class="modern-dtr-table-cell"
        >
          <template v-if="col.name === 'number_of_days'">
            <span class="text-body2 text-grey-8">{{
              rowProps.rowIndex + 1
            }}</span>
          </template>
          <template v-else-if="col.name === 'time_in'">
            <span
              class="text-body2"
              :class="getHolidayTimeInClass(rowProps.row.time_in)"
            >
              {{ col.field(rowProps.row) }}
            </span>
          </template>
          <template v-else>
            <span class="text-body2 text-grey-8">
              {{
                typeof col.field === "function"
                  ? col.field(rowProps.row)
                  : rowProps.row[col.field]
              }}
            </span>
          </template>
        </q-td>
      </q-tr>
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
        <q-td class="text-center text-weight-bold text-warning"></q-td>
        <q-td class="text-center text-weight-bold text-warning">
          {{ totalEmployeeAllowances }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { date } from "quasar";

const props = defineProps(["dtrRows", "employeeData", "dtrHolidays"]);
console.log("dtrHolidays", props.dtrHolidays);
console.log("dtrRows", props.dtrRows);

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

const totalEmployeeAllowances = computed(() => {
  const total = (props.dtrRows || []).reduce((acc, row) => {
    const allowance = parseFloat(row.employee_allowance || 0);
    return acc + allowance;
  }, 0);

  return `₱${total.toFixed(2)}`;
});
// --- NEW HOLIDAY LOGIC ---
const isHoliday = (dateString) => {
  if (!dateString || !props.dtrHolidays || props.dtrHolidays.length === 0) {
    return null; // Not a holiday or no holidays provided
  }

  // Normalize the date string to YYYY-MM-DD for comparison
  const dtrDate = date.formatDate(dateString, "YYYY-MM-DD");

  const holiday = props.dtrHolidays.find((h) => {
    // Ensure the holiday.date is also normalized to YYYY-MM-DD
    // If your dtrHolidays already has 'date' in YYYY-MM-DD, this step is redundant but safe.
    const holidayDate = date.formatDate(h.date, "YYYY-MM-DD");
    return holidayDate === dtrDate;
  });

  return holiday ? holiday.type : null; // Return the type if it's a holiday, otherwise null
};

// Function to get the class for the entire row
const getHolidayRowClass = (timeIn) => {
  const holidayType = isHoliday(timeIn);
  if (holidayType === "Regular Holiday") {
    return "holiday-regular-row";
  } else if (holidayType === "Special (Non-Working) Holiday") {
    return "holiday-special-row";
  }
  return "";
};

// Optional: Function to get a class for the time_in text itself (e.g., make it bold or different color)
const getHolidayTimeInClass = (timeIn) => {
  const holidayType = isHoliday(timeIn);
  if (holidayType) {
    return "text-weight-bold text-blue-8"; // Example: make date bold and a darker blue
  }
  return "text-grey-8"; // Default color
};

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

// NEW: Calculate additional holiday pays (REGULAR + OVERTIME)
const calculateAdditionalHolidayPays = computed(() => {
  const results = [];

  if (!props.dtrRows || props.dtrRows.length === 0) return results;

  const dailyRate = internalEmployeeData.value?.employment_type?.salary || 0;
  const hourlyRate = dailyRate / 8;

  props.dtrRows.forEach((row, index) => {
    const holidayType = isHoliday(row.time_in);
    if (!holidayType) return;

    const formattedDate = date.formatDate(row.time_in, "MMM. DD, YYYY");

    // --- Regular Holiday Hours Pay ---
    if (row.time_in && row.time_out) {
      const { totalWorkingMinutes } = calculateRowTimes(row);
      if (totalWorkingMinutes > 0) {
        const workedHours = totalWorkingMinutes / 60;
        let additionalPay = 0;
        let holidayRateText = "";
        let id = `${formattedDate}-regular-${index}`; // Unique ID

        if (holidayType === "Regular Holiday") {
          // DOLE mandates 200% for the first 8 hours, so 100% additional (already included in basic daily wage)
          // The "additional" pay is the 100% premium.
          holidayRateText = "+100%";
          additionalPay = workedHours * hourlyRate;
        } else if (holidayType === "Special (Non-Working) Holiday") {
          // DOLE mandates 130% for regular hours, so 30% additional
          holidayRateText = "+30%";
          additionalPay = workedHours * hourlyRate * 0.3;
        }

        results.push({
          id,
          date: formattedDate,
          holidayType,
          holidayRateText,
          workedHours: workedHours.toFixed(2),
          additionalPay: additionalPay.toFixed(2),
          type: "regular", // Indicate this is for regular hours
        });
      }
    }

    // --- Holiday Overtime Pay ---
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
          let id = `${formattedDate}-overtime-${index}`; // Unique ID for overtime

          if (holidayType === "Regular Holiday") {
            // DOLE mandates 260% for overtime on a regular holiday.
            // This means an additional 160% on top of the 100% basic holiday pay already covered by regular hours.
            // Or, simply put: (hourlyRate * 2.0 (for holiday base)) + (hourlyRate * 0.6 (for OT premium on holiday))
            // The additional pay for OT is (regular OT rate for regular day (1.25) + Holiday premium)
            // Simpler: 260% of basic hourly rate. So additional is 160% of hourlyRate.
            holidayRateText = "+100% (OT)"; // Representing the additional premium for OT on a Regular Holiday
            additionalPay = overtimeHours * hourlyRate; // 260% - 100% (already paid) = 160% additional for OT.
          } else if (holidayType === "Special (Non-Working) Holiday") {
            // DOLE mandates 169% for overtime on a special non-working holiday.
            // This means an additional 69% on top of the 100% basic pay.
            // Or, simply put: (hourlyRate * 1.3 (for holiday base)) + (hourlyRate * 0.39 (for OT premium on holiday))
            // The additional pay for OT is (regular OT rate for regular day (1.25) + Holiday premium)
            // Simpler: 169% of basic hourly rate. So additional is 69% of hourlyRate.
            holidayRateText = "+30% (OT)"; // Representing the additional premium for OT on a Special Holiday
            additionalPay = overtimeHours * hourlyRate * 0.3; // 169% - 100% (already paid) = 69% additional for OT.
          }

          results.push({
            id,
            date: formattedDate,
            holidayType,
            holidayRateText,
            workedHours: overtimeHours.toFixed(2), // Renamed for clarity in this context
            additionalPay: additionalPay.toFixed(2),
            type: "overtime", // Indicate this is for overtime hours
          });
        }
      }
    }
  });

  return results;
});

// NEW: Calculate additional holiday pays for OVERTIME HOURS
// const calculateHolidayOvertimePays = computed(() => {
//   const results = [];

//   if (!props.dtrRows || props.dtrRows.length === 0) return results;

//   const dailyRate = internalEmployeeData.value?.employment_type?.salary || 0;
//   const hourlyRate = dailyRate / 8;

//   props.dtrRows.forEach((row) => {
//     const holidayType = isHoliday(row.time_in);
//     console.log("holidayType", holidayType);
//     if (!holidayType) return;

//     if (
//       row.ot_status === "approved" &&
//       row.overtime_start &&
//       row.overtime_end
//     ) {
//       const otIn = new Date(row.overtime_start);
//       console.log("otIn", otIn);
//       const otOut = new Date(row.overtime_end);
//       console.log("otOut", otOut);

//       if (isNaN(otIn.getTime()) || isNaN(otOut.getTime()) || otOut <= otIn)
//         return;

//       const overtimeMinutes = Math.floor((otOut - otIn) / (1000 * 60));
//       console.log("overtimeMinutes", overtimeMinutes);
//       const overtimeHours = overtimeMinutes / 60;
//       console.log("overtimeHours", overtimeHours);

//       let additionalPay = 0;
//       let holidayRate = 0;
//       let holidayRateText = "";

//       if (holidayType === "Regular Holiday") {
//         // DOLE mandates 200% for the first 8 hrs, 260% for overtime
//         holidayRate = 2.0; // +100%
//         holidayRateText = "+100%";
//         additionalPay = overtimeHours * hourlyRate;
//       } else if (holidayType === "Special (Non-Working) Holiday") {
//         // 130% for regular hours, 169% for overtime
//         holidayRate = 0.3; // +30%
//         holidayRateText = "+30%";
//         additionalPay = overtimeHours * hourlyRate * 0.3; // +30%
//       }

//       results.push({
//         date: date.formatDate(row.time_in, "MMM. DD, YYYY"),
//         holidayType,
//         holidayRateText,
//         overtimeHours: overtimeHours.toFixed(2),
//         additionalPay: additionalPay.toFixed(2),
//       });
//     }
//   });

//   return results;
// });

// console.log("calculateHolidayOvertimePays", calculateHolidayOvertimePays.value);

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

  // Calculate ND for regular (scheduled) work period:
  const regularWorkStart = Math.max(actualIn.getTime(), scheduledIn.getTime());
  const regularWorkEnd = Math.min(actualOut.getTime(), scheduledOut.getTime());

  if (regularWorkEnd > regularWorkStart) {
    // nightDifferentialMinutes += calculateNightDifferentialMinutes(
    //   new Date(regularWorkStart),
    //   new Date(regularWorkEnd)
    // );
    const ndStart = new Date(regularWorkStart);
    const ndEnd = new Date(regularWorkEnd);

    let rawNDMinutes = calculateNightDifferentialMinutes(ndStart, ndEnd);

    // Subtract any break time that overlaps with the ND period
    const ndBreakMinutes = (() => {
      let total = 0;

      const breakPeriods = [
        { start: row.lunch_break_start, end: row.lunch_break_end },
        { start: row.break_start, end: row.break_end },
      ];

      for (const period of breakPeriods) {
        if (period.start && period.end) {
          const bStart = new Date(period.start);
          const bEnd = new Date(period.end);

          if (bStart < bEnd) {
            const overlapStart = Math.max(bStart.getTime(), ndStart.getTime());
            const overlapEnd = Math.min(bEnd.getTime(), ndEnd.getTime());

            if (overlapEnd > overlapStart) {
              total += Math.floor((overlapEnd - overlapStart) / (1000 * 60));
            }
          }
        }
      }
      return total;
    })();
    nightDifferentialMinutes += Math.max(0, rawNDMinutes - ndBreakMinutes);
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

const totalAdditionalHolidayPays = computed(() => {
  const total = calculateAdditionalHolidayPays.value
    .reduce((acc, item) => acc + parseFloat(item.additionalPay), 0)
    .toFixed(2);

  return total;
});

// --- NEW: Event Emission Logic (MOVED UP) ---
const emit = defineEmits(["dtr-summary-calculated"]); // Define the custom event

const emitCalculatedSummary = () => {
  if (calculateGrandTotals.value) {
    emit("dtr-summary-calculated", {
      // Formatted Totals
      totalWorkingHoursFormatted: totalWorkingHoursFormatted.value,
      totalUndertimeFormatted: totalUndertimeFormatted.value,
      totalOvertimeFormatted: totalOvertimeFormatted.value,
      totalBreakFormatted: totalBreakFormatted.value,
      totalNightDiffFormatted: totalNightDifferentialFormatted.value,

      // Raw totals
      totalPresentDays: calculateGrandTotals.value.totalPresentDays,
      totalLateDays: calculateGrandTotals.value.totalLateDays,
      totalAbsentDays: calculateGrandTotals.value.totalAbsentDays,
      totalDaysInPeriod: calculateGrandTotals.value.totalDaysInPeriod,

      // 🎯 Add holiday pays here
      calculateAdditionalHolidayPays: calculateAdditionalHolidayPays.value,
      totalAdditionalHolidayPays: totalAdditionalHolidayPays.value,

      //allowances
      employeeAllowances: totalEmployeeAllowances.value,
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
  {
    name: "allowance",
    required: true,
    label: "Allowance",
    align: "center",
    field: (row) => {
      return formatCurrency(row.employee_allowance);
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

  // --- NEW HOLIDAY ROW STYLES ---
  .holiday-regular-row {
    background-color: #e8f5e9; /* Very light green for regular holidays */
    // You can also change text color for better contrast
    .modern-dtr-table-cell {
      color: #2e7d32; // Darker green text for cells in this row
    }
  }

  .holiday-special-row {
    background-color: #fff3e0; /* Very light orange/yellow for special holidays */
    // You can also change text color for better contrast
    .modern-dtr-table-cell {
      color: #ef6c00; // Darker orange text for cells in this row
    }
  }

  // Optional: Specific hover effects for holiday rows if desired
  .q-tr.holiday-regular-row:hover {
    background-color: #c8e6c9 !important; // Slightly darker green on hover
  }
  .q-tr.holiday-special-row:hover {
    background-color: #ffe0b2 !important; // Slightly darker orange on hover
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

.q-hoverable:hover {
  background-color: var(--q-primary-lighter, #e3f2fd) !important;
  cursor: pointer;
}

.employee-holiday-pay-card {
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  background-color: #f8fafc; /* Lighter background for the card */
  overflow: hidden; // Ensures rounded corners are respected
}

.text-h5 {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  color: $blue-grey-9; // Darker primary color for the title
}

.text-h6 {
  font-size: 1.15rem;
}

.text-grey-8 {
  color: #555;
  font-weight: 500;
}

.holiday-pay-list {
  padding-bottom: 0; // Remove default bottom padding if any

  .header-row {
    background-color: $blue-grey-2; /* Softer header background */
    border-radius: 8px; /* Rounded corners for the header */
    margin: 0 16px 10px; /* Adjust margin to create spacing around the header */
    padding: 15px 20px; /* More padding for header items */
    font-size: 14px;

    .q-item-section {
      &:first-child {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }
      &:last-child {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }
    }
  }

  .data-row {
    background-color: white; /* Default background for rows */
    border-radius: 8px; /* Rounded corners for data rows */
    margin: 0 16px 10px; /* Spacing between rows */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); /* Subtle shadow for each row */
    transition: all 0.2s ease-in-out;
    padding: 18px 20px; /* More padding for data items */

    &:hover {
      transform: translateY(-2px); /* Slight lift on hover */
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Enhanced shadow on hover */
    }

    .q-item-section {
      font-size: 16px;
      // Specific styling for text in data rows
    }

    .date-link {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .total-row {
    margin: 10px 16px 0; /* Align total row similarly */
    padding: 25px 20px; /* Generous padding for the total row */
    background-color: $blue-grey-1; /* Slightly different background for emphasis */
    border-top: 1px solid $blue-grey-2; /* Subtle separator line */
    border-radius: 8px; /* Rounded corners for the total row */
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.03); // Subtle top shadow for total
  }
}
</style>
