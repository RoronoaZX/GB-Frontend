<template>
  <q-card flat class="log-card q-pa-md q-mb-md">
    <div class="row items-stretch no-wrap">
      <!-- Column 1: Day & Clock-in -->
      <div class="col-2">
        <div class="text-weight-bold text-subtitle1">{{ log.dayLabel }}</div>
        <div class="text-grey-7">Clock-in</div>
        <div class="text-h6 text-weight-regular">{{ log.clockIn }}</div>
      </div>

      <!-- Column 2: Timeline -->
      <div class="col-8 q-px-md">
        <div class="timeline-container">
          <!-- Time Markers -->
          <div
            v-for="hour in timeMarkers"
            :key="hour"
            class="time-marker"
            :style="{ left: timeToPercentage(`${hour}:00`) + '%' }"
          >
            {{ hour }}:00
          </div>

          <!-- Activity Bars -->
          <div class="timeline-bar">
            <div
              v-for="(activity, index) in log.activities"
              :key="index"
              class="activity-block"
              :class="getActivityClass(activity)"
              :style="getActivityStyle(activity)"
            >
              <q-tooltip anchor="top middle" self="bottom middle">
                {{ activity.label }}: {{ activity.start }} - {{ activity.end }}
              </q-tooltip>
              <span class="activity-label">{{ activity.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Column 3: Clock-out & Duration -->
      <div class="col-2 row text-right justify-end">
        <!-- ========================================================== -->
        <!-- START: NEW OT STATUS CHIP                                  -->
        <!-- ========================================================== -->
        <div v-if="log.otStatus" class="col-12">
          <q-chip
            :icon="overtimeStatus.icon"
            :color="overtimeStatus.color"
            text-color="white"
            size="sm"
            class="q-mb-xs"
          >
            {{ overtimeStatus.label }}
          </q-chip>
        </div>
        <!-- ========================================================== -->
        <!-- END: NEW OT STATUS CHIP                                    -->
        <!-- ========================================================== -->
        <div v-else-if="log.isDayOff" class="col-12">
          <q-chip
            icon="check_circle"
            color="positive"
            text-color="white"
            size="sm"
            class="q-mb-xs"
          >
            Approved
          </q-chip>
        </div>
        <div class="col-6">
          <div class="text-grey-7">Clock-out</div>
          <div class="text-h6 text-weight-regular">{{ log.clockOut }}</div>
        </div>
        <div class="col-6">
          <div class="text-grey-7">Duration</div>
          <div class="text-h6 text-weight-regular">{{ log.duration }}</div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  log: {
    type: Object,
    required: true,
    default: () => ({ activities: [] }),
  },
});

console.log("DailyAttendanceLog props:", props.log);

// ==========================================================
// NEW: COMPUTED PROP FOR OT STATUS
// ==========================================================
const overtimeStatus = computed(() => {
  switch (props.log.otStatus) {
    case "approved":
      return { label: "Approved", color: "positive", icon: "check_circle" };
    case "declined":
      return { label: "Declined", color: "negative", icon: "cancel" };
    case "pending":
      return { label: "Pending", color: "orange", icon: "hourglass_empty" };
    default:
      return { label: "Unknown", color: "grey", icon: "help" };
  }
});

// --- The rest of the script remains unchanged ---
const timeMarkers = ["09", "11", "13", "15", "17", "19", "21", "23"];

const timeToPercentage = (timeString) => {
  if (!timeString) return 0;
  const [hours, minutes] = timeString.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;
  const totalDayMinutes = 24 * 60;
  return (totalMinutes / totalDayMinutes) * 100;
};

const getActivityStyle = (activity) => {
  if (!activity.start || !activity.end) {
    if (activity.type === "day_off") {
      return {
        left: timeToPercentage("09:00") + "%",
        width: timeToPercentage("17:00") - timeToPercentage("09:00") + "%",
      };
    }
    return {};
  }
  const startPercent = timeToPercentage(activity.start);
  const endPercent = timeToPercentage(activity.end);
  const widthPercent = endPercent - startPercent;
  return {
    left: `${startPercent}%`,
    width: `${widthPercent}%`,
  };
};

const getActivityClass = (activity) => {
  switch (activity.type) {
    case "working":
      return "bg-primary";
    case "break":
      return "bg-teal";
    case "overtime":
      return "bg-orange";
    case "day_off":
      return "bg-amber";
    default:
      return "bg-grey-5";
  }
};
</script>

<style lang="scss" scoped>
.log-card {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}
.timeline-container {
  position: relative;
  width: 100%;
  padding-top: 25px;
  height: 100%;
  display: flex;
  align-items: center;
}
.time-marker {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  font-size: 0.75rem;
  color: #757575;
}
.timeline-bar {
  position: relative;
  width: 100%;
  height: 30px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
.activity-block {
  position: absolute;
  top: 0;
  height: 100%;
  color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    filter: brightness(1.1);
  }
}
.activity-label {
  font-size: 0.8rem;
  padding: 0 8px;
  font-weight: 500;
}
</style>
