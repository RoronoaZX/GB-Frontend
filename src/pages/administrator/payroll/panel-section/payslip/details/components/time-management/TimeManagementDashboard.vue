<template>
  <div v-if="!isLoading">
    <!-- Header -->
    <div class="row items-center justify-between q-mb-md">
      <!-- Attendance Type Toggle -->
      <div>
        <q-btn-toggle
          v-model="attendanceType"
          no-caps
          rounded
          unelevated
          toggle-color="primary"
          color="white"
          text-color="primary"
          :options="[
            { label: 'Attendance', value: 'attendance' },
            { label: 'Time Off', value: 'time_off' },
            { label: 'Overtime', value: 'overtime' },
          ]"
        />
      </div>

      <!-- Date Range + Arrows -->
      <div class="row items-center q-gutter-x-sm">
        <div class="text-h6 text-weight-medium">
          {{ displayDateRange }}
        </div>
        <q-btn
          flat
          dense
          round
          icon="chevron_left"
          @click="goToPreviousPeriod"
        />
        <q-btn
          flat
          dense
          round
          icon="chevron_right"
          :disable="isNextPeriodDisabled"
          @click="goToNextPeriod"
        />
      </div>

      <!-- Action -->
      <!-- <div>
        <q-btn unelevated color="primary" label="Add Attendance" />
      </div> -->
      <span></span>
    </div>

    <!-- Daily Logs -->
    <div v-if="dailyLogs.length > 0" class="q-mt-md">
      <DailyAttendanceLog
        v-for="(log, index) in filteredLogs"
        :key="index"
        :log="log"
      />
    </div>
    <!-- No Data Message -->
    <div v-else class="text-center q-pa-xl text-grey-7">
      <q-icon name="event_busy" size="4em" />
      <div class="text-h6 q-mt-md">No Attendance Records</div>
      <p>
        There is no attendance data for this employee in the selected period.
      </p>
    </div>
  </div>

  <div v-else class="text-center q-pa-xl">
    <q-spinner-dots color="primary" size="2em" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { date } from "quasar";
import { useDTRStore } from "src/stores/dtr";
import DailyAttendanceLog from "./DailyAttendanceLog.vue";

const props = defineProps({
  employeeId: { type: [String, Number], required: true },
});

// State
const dtrStore = useDTRStore();
const startDate = ref("");
const endDate = ref("");
const attendanceType = ref("attendance");
const isLoading = ref(true);
const dailyLogs = ref([]);

const filteredLogs = computed(() => {
  switch (attendanceType.value) {
    case "overtime":
      return dailyLogs.value.filter((log) => log.otStatus);
    case "time_off":
      return dailyLogs.value.filter((log) => log.isDayOff);
    case "attendance":
    default:
      return dailyLogs.value;
  }
});

const transformApiData = (rawData) => {
  if (!rawData || rawData.length === 0) {
    return [];
  }

  // Helper function to get day label
  const getDayLabel = (dateInput) => {
    if (!dateInput) return "-"; // Or whatever default you prefer for null dates

    const d = new Date(dateInput);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    let label = d.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
    });

    if (date.isSameDate(d, today, "day")) label = "Today";
    if (date.isSameDate(d, yesterday, "day")) label = "Yesterday";

    return label;
  };

  return rawData.map((record) => {
    const timeIn = record.time_in ? new Date(record.time_in) : null;
    const timeOut = record.time_out ? new Date(record.time_out) : null;

    // Determine dayLabelIn and dayLabelOut
    const dayLabelIn = getDayLabel(timeIn || record.created_at); // Use timeIn or created_at for in
    const dayLabelOut = getDayLabel(timeOut || timeIn || record.created_at); // Use timeOut, or timeIn, or created_at for out

    const isDayOff = !timeIn && record.ot_status === "approved";

    const breakStart = record.break_start ? new Date(record.break_start) : null;
    const breakEnd = record.break_end ? new Date(record.break_end) : null;
    const lunchStart = record.lunch_break_start
      ? new Date(record.lunch_break_start)
      : null;
    const lunchEnd = record.lunch_break_end
      ? new Date(record.lunch_break_end)
      : null;
    const otStart = record.overtime_start
      ? new Date(record.overtime_start)
      : null;
    const otEnd = record.overtime_end ? new Date(record.overtime_end) : null;

    const activities = [];
    if (timeIn) {
      let lastEventTime = timeIn;
      const firstBreak = breakStart || lunchStart;
      if (firstBreak && firstBreak > lastEventTime) {
        activities.push({
          type: "working",
          label: "Working time",
          start: lastEventTime,
          end: firstBreak,
        });
        lastEventTime = firstBreak;
      }
      if (breakStart && breakEnd && breakEnd > lastEventTime) {
        activities.push({
          type: "break",
          label: "Break",
          start: breakStart,
          end: breakEnd,
        });
        lastEventTime = breakEnd;
      }
      if (lunchStart && lunchEnd && lunchEnd > lastEventTime) {
        activities.push({
          type: "break",
          label: "Break",
          start: lunchStart,
          end: lunchEnd,
        });
        lastEventTime = lunchEnd;
      }
      const workEndTime = otStart || timeOut;
      if (workEndTime && workEndTime > lastEventTime) {
        activities.push({
          type: "working",
          label: "Working time",
          start: lastEventTime,
          end: workEndTime,
        });
        lastEventTime = workEndTime;
      }
      if (otStart && otEnd && otEnd > lastEventTime) {
        activities.push({
          type: "overtime",
          label: "Over time",
          start: otStart,
          end: otEnd,
        });
      }
    } else if (isDayOff) {
      activities.push({
        type: "day_off",
        label: "Requested day off",
        start: null,
        end: null,
      });
    }

    const formatTime = (d) =>
      d
        ? d.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : "-";
    const formatForTimeline = (d) =>
      d
        ? d.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        : null;

    // The original dayLabel logic, now applied only to a single point in time,
    // which seems to be the day the record primarily represents.
    // It's still useful for the overall record, but you also want dayLabelIn/Out.
    const recordDate = timeIn || new Date(record.created_at || Date.now());
    let dayLabel = getDayLabel(recordDate);

    let duration = "-";
    if (timeIn && timeOut) {
      const diffMs = timeOut - timeIn;
      const diffHrs = Math.floor(diffMs / 3600000);
      const diffMins = Math.round((diffMs % 3600000) / 60000);
      duration = `${diffHrs}h ${diffMins}m`;
    }

    return {
      dayLabel: dayLabel, // Keep the original record's dayLabel
      dayLabelIn: dayLabelIn, // New: Day label for time-in
      dayLabelOut: dayLabelOut, // New: Day label for time-out
      clockIn: formatTime(timeIn),
      clockOut: formatTime(timeOut),
      duration: duration,
      otStatus: record.ot_status,
      isDayOff: isDayOff,
      activities: activities.map((act) => ({
        ...act,
        start: formatForTimeline(act.start),
        end: formatForTimeline(act.end),
      })),
    };
  });
};

// const transformApiData = (rawData) => {
//   if (!rawData || rawData.length === 0) {
//     return [];
//   }
//   return rawData.map((record) => {
//     const timeIn = record.time_in ? new Date(record.time_in) : null;

//     const isDayOff = !timeIn && record.ot_status === "approved";

//     const timeOut = record.time_out ? new Date(record.time_out) : null;
//     const breakStart = record.break_start ? new Date(record.break_start) : null;
//     const breakEnd = record.break_end ? new Date(record.break_end) : null;
//     const lunchStart = record.lunch_break_start
//       ? new Date(record.lunch_break_start)
//       : null;
//     const lunchEnd = record.lunch_break_end
//       ? new Date(record.lunch_break_end)
//       : null;
//     const otStart = record.overtime_start
//       ? new Date(record.overtime_start)
//       : null;
//     const otEnd = record.overtime_end ? new Date(record.overtime_end) : null;

//     const activities = [];
//     if (timeIn) {
//       let lastEventTime = timeIn;
//       const firstBreak = breakStart || lunchStart;
//       if (firstBreak && firstBreak > lastEventTime) {
//         activities.push({
//           type: "working",
//           label: "Working time",
//           start: lastEventTime,
//           end: firstBreak,
//         });
//         lastEventTime = firstBreak;
//       }
//       if (breakStart && breakEnd && breakEnd > lastEventTime) {
//         activities.push({
//           type: "break",
//           label: "Break",
//           start: breakStart,
//           end: breakEnd,
//         });
//         lastEventTime = breakEnd;
//       }
//       if (lunchStart && lunchEnd && lunchEnd > lastEventTime) {
//         activities.push({
//           type: "break",
//           label: "Break",
//           start: lunchStart,
//           end: lunchEnd,
//         });
//         lastEventTime = lunchEnd;
//       }
//       const workEndTime = otStart || timeOut;
//       if (workEndTime && workEndTime > lastEventTime) {
//         activities.push({
//           type: "working",
//           label: "Working time",
//           start: lastEventTime,
//           end: workEndTime,
//         });
//         lastEventTime = workEndTime;
//       }
//       if (otStart && otEnd && otEnd > lastEventTime) {
//         activities.push({
//           type: "overtime",
//           label: "Over time",
//           start: otStart,
//           end: otEnd,
//         });
//       }
//     } else if (isDayOff) {
//       activities.push({
//         type: "day_off",
//         label: "Requested day off",
//         start: null,
//         end: null,
//       });
//     }

//     const formatTime = (d) =>
//       d
//         ? d.toLocaleTimeString("en-US", {
//             hour: "2-digit",
//             minute: "2-digit",
//             hour12: true,
//           })
//         : "-";
//     const formatForTimeline = (d) =>
//       d
//         ? d.toLocaleTimeString("en-US", {
//             hour: "2-digit",
//             minute: "2-digit",
//             hour12: false,
//           })
//         : null;

//     const recordDate = timeIn || new Date(record.created_at || Date.now());
//     const today = new Date();
//     const yesterday = new Date();
//     yesterday.setDate(yesterday.getDate() - 1);
//     let dayLabel = recordDate.toLocaleDateString("en-US", {
//       weekday: "long",
//       day: "numeric",
//     });
//     if (date.isSameDate(recordDate, today, "day")) dayLabel = "Today";
//     if (date.isSameDate(recordDate, yesterday, "day")) dayLabel = "Yesterday";

//     let duration = "-";
//     if (timeIn && timeOut) {
//       const diffMs = timeOut - timeIn;
//       const diffHrs = Math.floor(diffMs / 3600000);
//       const diffMins = Math.round((diffMs % 3600000) / 60000);
//       duration = `${diffHrs}h ${diffMins}m`;
//     }

//     return {
//       dayLabel: dayLabel,
//       clockIn: formatTime(timeIn),
//       clockOut: formatTime(timeOut),
//       duration: duration,
//       otStatus: record.ot_status,
//       isDayOff: isDayOff,
//       activities: activities.map((act) => ({
//         ...act,
//         start: formatForTimeline(act.start),
//         end: formatForTimeline(act.end),
//       })),
//     };
//   });
// };

const fetchAttendanceForPeriod = async () => {
  if (!startDate.value || !endDate.value || !props.employeeId) return;
  isLoading.value = true;

  try {
    await dtrStore.fetchEmployeeDTRRange({
      employee_id: props.employeeId,
      start_date: startDate.value,
      end_date: endDate.value,
    });

    dailyLogs.value = transformApiData(dtrStore.dtrCutOffData);
  } catch (error) {
    console.error("Error fetching or transforming attendance data:", error);
    dailyLogs.value = [];
  } finally {
    isLoading.value = false;
  }
};

const formatDisplayRange = (start, end) => {
  if (!start || !end) return "Loading...";
  const startD = new Date(start);
  const endD = new Date(end);
  const optionsStart = { day: "2-digit", month: "short" };
  const optionsEnd = { day: "2-digit", month: "short", year: "numeric" };
  const startStr = startD
    .toLocaleDateString("en-US", optionsStart)
    .replace(",", "");
  const endStr = endD.toLocaleDateString("en-US", optionsEnd).replace(",", "");
  return `${startStr} - ${endStr}`;
};

const displayDateRange = computed(() =>
  formatDisplayRange(startDate.value, endDate.value)
);

const getDtrPeriod = (inputDate) => {
  const d = new Date(inputDate);
  const day = d.getDate();
  const year = d.getFullYear();
  let month = d.getMonth() + 1; // getMonth() is 0-indexed

  let startDay, endDay, startMonth, endMonth, startYear, endYear;

  if (day >= 11 && day <= 25) {
    startDay = 11;
    endDay = 25;
    startMonth = month;
    endMonth = month;
    startYear = year;
    endYear = year;
  } else if (day >= 26) {
    startDay = 26;
    endDay = 10;
    startMonth = month;
    endMonth = month + 1; // Next month for the end date
    startYear = year;
    endYear = month === 12 ? year + 1 : year; // Handle year rollover
  } else {
    // day >= 1 && day <= 10
    startDay = 26;
    endDay = 10;
    startMonth = month - 1; // Previous month for the start date
    endMonth = month;
    startYear = month === 1 ? year - 1 : year; // Handle year rollover
    endYear = year;
  }

  // Handle month rollovers for startMonth and endMonth
  if (startMonth === 0) startMonth = 12; // If month was Jan (1), prev is Dec (12)
  if (endMonth === 13) endMonth = 1; // If month was Dec (12), next is Jan (1)

  const startDateFormatted = date.formatDate(
    new Date(startYear, startMonth - 1, startDay),
    "YYYY-MM-DD"
  );
  const endDateFormatted = date.formatDate(
    new Date(endYear, endMonth - 1, endDay),
    "YYYY-MM-DD"
  );

  return { startDate: startDateFormatted, endDate: endDateFormatted };
};

const isNextPeriodDisabled = computed(() => {
  if (!startDate.value || !endDate.value) return true;

  const today = new Date();
  const { startDate: todayPeriodStart, endDate: todayPeriodEnd } =
    getDtrPeriod(today);

  // Compare the current view's end date with today's period end date
  // If the current period's end date is the same as or after today's period end date, disable.
  return new Date(endDate.value) >= new Date(todayPeriodEnd);
});

const goToPreviousPeriod = () => {
  // Get the start date of the current period
  const currentPeriodStartDate = new Date(startDate.value);

  // Calculate a date within the *previous* period.
  // A safe way is to subtract 1 day from the current period's start date.
  const dateInPreviousPeriod = date.subtractFromDate(currentPeriodStartDate, {
    days: 1,
  });

  // Get the period details for this calculated date
  const { startDate: prev, endDate: prevEnd } =
    getDtrPeriod(dateInPreviousPeriod);

  // Update only if the period has actually changed
  if (startDate.value !== prev || endDate.value !== prevEnd) {
    startDate.value = prev;
    endDate.value = prevEnd;
  }
};

const goToNextPeriod = () => {
  if (isNextPeriodDisabled.value) return;

  // Get the end date of the current period
  const currentPeriodEndDate = new Date(endDate.value);

  // Calculate a date within the *next* period.
  // A safe way is to add 1 day to the current period's end date.
  const dateInNextPeriod = date.addToDate(currentPeriodEndDate, { days: 1 });

  // Get the period details for this calculated date
  const { startDate: next, endDate: nextEnd } = getDtrPeriod(dateInNextPeriod);

  // Update only if the period has actually changed
  if (startDate.value !== next || endDate.value !== nextEnd) {
    startDate.value = next;
    endDate.value = nextEnd;
  }
};

const initializeDateRange = () => {
  const today = new Date();
  const { startDate: start, endDate: end } = getDtrPeriod(today);
  startDate.value = start;
  endDate.value = end;
};

let fetchTimeout;
watch(
  [() => startDate.value, () => props.employeeId],
  () => {
    clearTimeout(fetchTimeout);
    fetchTimeout = setTimeout(() => {
      fetchAttendanceForPeriod();
    }, 200);
  },
  { immediate: true }
);

onMounted(() => {
  initializeDateRange();
});
</script>

<!-- <script setup>
import { ref, computed, onMounted, watch } from "vue";
import { date } from "quasar";
import { useDTRStore } from "src/stores/dtr";
// Assuming DailyAttendanceLog component is in the same directory
import DailyAttendanceLog from "./DailyAttendanceLog.vue";

const props = defineProps({
  employeeId: { type: [String, Number], required: true },
});

// State
const dtrStore = useDTRStore();
const startDate = ref("");
const endDate = ref("");
const attendanceType = ref("attendance");
const isLoading = ref(true);
const dailyLogs = ref([]);

// ==========================================================
// NEW: COMPUTED PROPERTY FOR FILTERING
// ==========================================================
const filteredLogs = computed(() => {
  switch (attendanceType.value) {
    case "overtime":
      // Show only logs that have an overtime status
      return dailyLogs.value.filter((log) => log.otStatus);
    case "time_off":
      // Show only logs that are flagged as a day off
      return dailyLogs.value.filter((log) => log.isDayOff);
    case "attendance":
    default:
      // Show all logs
      return dailyLogs.value;
  }
});

// ==========================================================
// UPDATED: DATA TRANSFORMATION
// Now adds `otStatus` and `isDayOff` for filtering.
// ==========================================================
const transformApiData = (rawData) => {
  if (!rawData || rawData.length === 0) {
    return [];
  }
  return rawData.map((record) => {
    const timeIn = record.time_in ? new Date(record.time_in) : null;

    // --- Key addition for filtering ---
    const isDayOff = !timeIn && record.ot_status === "approved"; // Example logic for day off

    // (The rest of the transformation logic remains the same)
    const timeOut = record.time_out ? new Date(record.time_out) : null;
    const breakStart = record.break_start ? new Date(record.break_start) : null;
    const breakEnd = record.break_end ? new Date(record.break_end) : null;
    const lunchStart = record.lunch_break_start
      ? new Date(record.lunch_break_start)
      : null;
    const lunchEnd = record.lunch_break_end
      ? new Date(record.lunch_break_end)
      : null;
    const otStart = record.overtime_start
      ? new Date(record.overtime_start)
      : null;
    const otEnd = record.overtime_end ? new Date(record.overtime_end) : null;

    const activities = [];
    if (timeIn) {
      let lastEventTime = timeIn;
      const firstBreak = breakStart || lunchStart;
      if (firstBreak && firstBreak > lastEventTime) {
        activities.push({
          type: "working",
          label: "Working time",
          start: lastEventTime,
          end: firstBreak,
        });
        lastEventTime = firstBreak;
      }
      if (breakStart && breakEnd && breakEnd > lastEventTime) {
        activities.push({
          type: "break",
          label: "Break",
          start: breakStart,
          end: breakEnd,
        });
        lastEventTime = breakEnd;
      }
      if (lunchStart && lunchEnd && lunchEnd > lastEventTime) {
        activities.push({
          type: "break",
          label: "Break",
          start: lunchStart,
          end: lunchEnd,
        });
        lastEventTime = lunchEnd;
      }
      const workEndTime = otStart || timeOut;
      if (workEndTime && workEndTime > lastEventTime) {
        activities.push({
          type: "working",
          label: "Working time",
          start: lastEventTime,
          end: workEndTime,
        });
        lastEventTime = workEndTime;
      }
      if (otStart && otEnd && otEnd > lastEventTime) {
        activities.push({
          type: "overtime",
          label: "Over time",
          start: otStart,
          end: otEnd,
        });
      }
    } else if (isDayOff) {
      // Add a full-day activity for approved time off
      activities.push({
        type: "day_off",
        label: "Requested day off",
        start: null,
        end: null,
      });
    }

    const formatTime = (d) =>
      d
        ? d.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : "-";
    const formatForTimeline = (d) =>
      d
        ? d.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        : null;

    const recordDate = timeIn || new Date(record.created_at || Date.now()); // Fallback date
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    let dayLabel = recordDate.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
    });
    if (date.isSameDate(recordDate, today, "day")) dayLabel = "Today";
    if (date.isSameDate(recordDate, yesterday, "day")) dayLabel = "Yesterday";

    let duration = "-";
    if (timeIn && timeOut) {
      const diffMs = timeOut - timeIn;
      const diffHrs = Math.floor(diffMs / 3600000);
      const diffMins = Math.round((diffMs % 3600000) / 60000);
      duration = `${diffHrs}h ${diffMins}m`;
    }

    return {
      dayLabel: dayLabel,
      clockIn: formatTime(timeIn),
      clockOut: formatTime(timeOut),
      duration: duration,
      otStatus: record.ot_status, // Pass through the OT status
      isDayOff: isDayOff, // Pass through the day off flag
      activities: activities.map((act) => ({
        ...act,
        start: formatForTimeline(act.start),
        end: formatForTimeline(act.end),
      })),
    };
  });
};

// ==========================================================
// UPDATED FETCH FUNCTION
// ==========================================================
const fetchAttendanceForPeriod = async () => {
  if (!startDate.value || !endDate.value || !props.employeeId) return;
  isLoading.value = true;

  try {
    await dtrStore.fetchEmployeeDTRRange({
      employee_id: props.employeeId,
      start_date: startDate.value,
      end_date: endDate.value,
    });

    // Use the transformation function to process raw API data
    dailyLogs.value = transformApiData(dtrStore.dtrCutOffData);
  } catch (error) {
    console.error("Error fetching or transforming attendance data:", error);
    dailyLogs.value = [];
  } finally {
    isLoading.value = false;
  }
};

// --- Helper and Lifecycle Functions (No changes needed below) ---

const formatDisplayRange = (start, end) => {
  if (!start || !end) return "Loading...";
  const startD = new Date(start);
  const endD = new Date(end);
  const optionsStart = { day: "2-digit", month: "short" };
  const optionsEnd = { day: "2-digit", month: "short", year: "numeric" };
  const startStr = startD
    .toLocaleDateString("en-US", optionsStart)
    .replace(",", "");
  const endStr = endD.toLocaleDateString("en-US", optionsEnd).replace(",", "");
  return `${startStr} - ${endStr}`;
};

const displayDateRange = computed(() =>
  formatDisplayRange(startDate.value, endDate.value)
);

const getDtrPeriod = (formattedDate) => {
  const day = parseInt(formattedDate.slice(8, 10), 10);
  const currentMonth = parseInt(formattedDate.slice(5, 7), 10);
  const year = formattedDate.slice(0, 4);
  const prevMonth = (currentMonth - 1).toString().padStart(2, "0");
  const nextMonth = (currentMonth + 1).toString().padStart(2, "0");
  const month =
    day >= 26 ? currentMonth.toString().padStart(2, "0") : prevMonth;
  const start =
    day >= 11 && day <= 25
      ? `${year}-${currentMonth.toString().padStart(2, "0")}-11`
      : `${year}-${month}-26`;
  const end =
    day >= 11 && day <= 25
      ? `${year}-${currentMonth.toString().padStart(2, "0")}-25`
      : `${year}-${
          day >= 26 ? nextMonth : currentMonth.toString().padStart(2, "0")
        }-10`;
  return { startDate: start, endDate: end };
};

const isNextPeriodDisabled = computed(() => {
  if (!startDate.value || !endDate.value) return true;

  const today = date.formatDate(new Date(), "YYYY-MM-DD");
  const { startDate: todayStart, endDate: todayEnd } = getDtrPeriod(today);

  // If the current view is the same period that includes today → disable the right button
  return startDate.value === todayStart && endDate.value === todayEnd;
});

// const isNextPeriodDisabled = computed(() => {
//   if (!startDate.value) return true;
//   const nextStart = new Date(startDate.value);
//   nextStart.setDate(nextStart.getDate() + 15);
//   return nextStart > new Date();
// });

const goToPreviousPeriod = () => {
  const prevStart = new Date(startDate.value);
  prevStart.setDate(prevStart.getDate() - 15);
  const { startDate: prev, endDate: prevEnd } = getDtrPeriod(
    date.formatDate(prevStart, "YYYY-MM-DD")
  );
  if (startDate.value !== prev || endDate.value !== prevEnd) {
    startDate.value = prev;
    endDate.value = prevEnd;
  }
};

const goToNextPeriod = () => {
  if (isNextPeriodDisabled.value) return;

  const nextStart = new Date(startDate.value);
  nextStart.setDate(nextStart.getDate() + 15);
  const { startDate: next, endDate: nextEnd } = getDtrPeriod(
    date.formatDate(nextStart, "YYYY-MM-DD")
  );

  // ✅ Only set if it actually changed
  if (startDate.value !== next || endDate.value !== nextEnd) {
    startDate.value = next;
    endDate.value = nextEnd;
  }
};

// const goToNextPeriod = () => {
//   if (isNextPeriodDisabled.value) return;
//   const nextStart = new Date(startDate.value);
//   nextStart.setDate(nextStart.getDate() + 15);
//   const { startDate: next, endDate: nextEnd } = getDtrPeriod(
//     date.formatDate(nextStart, "YYYY-MM-DD")
//   );
//   startDate.value = next;
//   endDate.value = nextEnd;
// };

const initializeDateRange = () => {
  const today = new Date();
  const formatted = date.formatDate(today, "YYYY-MM-DD");
  const { startDate: start, endDate: end } = getDtrPeriod(formatted);
  startDate.value = start;
  endDate.value = end;
};

let fetchTimeout;
watch(
  [() => startDate.value, () => props.employeeId],
  () => {
    clearTimeout(fetchTimeout);
    fetchTimeout = setTimeout(() => {
      fetchAttendanceForPeriod();
    }, 200);
  },
  { immediate: true }
);

onMounted(() => {
  initializeDateRange();
});
</script> -->
