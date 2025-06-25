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
      <div>
        <q-btn unelevated color="primary" label="Add Attendance" />
      </div>
    </div>

    <!-- Summary Stats -->
    <q-card flat bordered>
      <q-card-section>
        <div class="row items-center justify-around">
          <template v-for="(stat, index) in summaryStats" :key="stat.title">
            <SummaryStatCard v-bind="stat" />
            <q-separator
              v-if="index < summaryStats.length - 1"
              vertical
              spaced
            />
          </template>
        </div>
      </q-card-section>
    </q-card>

    <!-- Daily Logs -->
    <div class="q-mt-md">
      <DailyAttendanceLog
        v-for="log in dailyLogs"
        :key="log.dayLabel"
        :log="log"
      />
    </div>
  </div>

  <div v-else class="text-center q-pa-xl">
    <q-spinner-dots color="primary" size="2em" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { date } from "quasar";
import SummaryStatCard from "./SummaryStatCard.vue";
import DailyAttendanceLog from "./DailyAttendanceLog.vue";

defineProps({
  employeeId: { type: [String, Number], required: true },
});

// State
const startDate = ref("");
const endDate = ref("");
const attendanceType = ref("attendance");
const isLoading = ref(true);
const summaryStats = ref([]);
const dailyLogs = ref([]);

// Format to "26 Jan - 10 Feb 2025"
const formatDisplayRange = (start, end) => {
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

// Determine current DTR period
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

// Disable next button if future period
const isNextPeriodDisabled = computed(() => {
  const today = new Date();
  const nextStart = new Date(startDate.value);
  nextStart.setDate(nextStart.getDate() + 15);
  return nextStart > today;
});

// Change Period Navigation
const goToPreviousPeriod = () => {
  const prevStart = new Date(startDate.value);
  prevStart.setDate(prevStart.getDate() - 15);
  const { startDate: prev, endDate: prevEnd } = getDtrPeriod(
    date.formatDate(prevStart, "YYYY-MM-DD")
  );
  startDate.value = prev;
  endDate.value = prevEnd;
};

const goToNextPeriod = () => {
  if (isNextPeriodDisabled.value) return;
  const nextStart = new Date(startDate.value);
  nextStart.setDate(nextStart.getDate() + 15);
  const { startDate: next, endDate: nextEnd } = getDtrPeriod(
    date.formatDate(nextStart, "YYYY-MM-DD")
  );
  startDate.value = next;
  endDate.value = nextEnd;
};

// Init
const initializeDateRange = () => {
  const today = new Date();
  const formatted = date.formatDate(today, "YYYY-MM-DD");
  const { startDate: start, endDate: end } = getDtrPeriod(formatted);
  startDate.value = start;
  endDate.value = end;
};

// Dummy Data (replace with API call if needed)
const fetchData = () => {
  summaryStats.value = [
    { title: "Day off", value: 12, change: 12 },
    { title: "Late clock-in", value: 6, change: -2 },
    { title: "Late clock-out", value: 21, change: -12 },
    { title: "No clock-out", value: 2, change: 4 },
    { title: "Off time quota", value: 1, change: 0 },
    { title: "Absent", value: 2, change: 0 },
  ];

  dailyLogs.value = [
    {
      dayLabel: "Today",
      clockIn: "09:00 AM",
      clockOut: "08:51 PM",
      duration: "10h 12m",
      statusLabel: null,
      activities: [
        {
          type: "working",
          label: "Working time",
          start: "09:00",
          end: "12:00",
        },
        { type: "break", label: "Break", start: "12:00", end: "13:00" },
        {
          type: "working",
          label: "Working time",
          start: "13:00",
          end: "18:00",
        },
        { type: "overtime", label: "Over time", start: "18:00", end: "20:51" },
      ],
    },
    {
      dayLabel: "Yesterday",
      clockIn: "-",
      clockOut: "-",
      duration: "-",
      statusLabel: "Approved",
      activities: [
        {
          type: "day_off",
          label: "Requested day off",
          start: "09:00",
          end: "17:00",
        },
      ],
    },
  ];

  isLoading.value = false;
};

onMounted(() => {
  initializeDateRange();
  fetchData();
});
</script>
