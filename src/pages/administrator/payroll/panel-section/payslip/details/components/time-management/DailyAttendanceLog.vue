<template>
  <q-card flat class="log-card q-mb-sm">
    <div class="row items-center no-wrap">
      <!-- Column 1: Day & Clock-in -->
      <div class="col-2">
        <div class="text-weight-bold">{{ log.dayLabel }}</div>
        <div class="text-grey-7 text-caption">Clock-in</div>
        <div class="text-subtitle1 text-weight-regular">{{ log.clockIn }}</div>
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
      <div class="col-2 row text-right items-center justify-end">
        <div v-if="log.otStatus" class="col-12 q-mb-xs">
          <q-chip
            dense
            :icon="overtimeStatus.icon"
            :color="overtimeStatus.color"
            text-color="white"
            size="sm"
          >
            {{ overtimeStatus.label }}
          </q-chip>
        </div>
        <div class="col-6">
          <div class="text-grey-7 text-caption">Clock-out</div>
          <div class="text-subtitle1 text-weight-regular">
            {{ log.clockOut }}
          </div>
        </div>
        <div class="col-6">
          <div class="text-grey-7 text-caption">Duration</div>
          <div class="text-subtitle1 text-weight-regular">
            {{ log.duration }}
          </div>
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
  border: 1px solid #eef0f2; // Lighter border
  border-radius: 8px;
  overflow: hidden;
  // --- DENSE DESIGN CHANGE: Reduced padding ---
  padding: 12px 16px;
}

.timeline-container {
  position: relative;
  width: 100%;
  padding-top: 20px; // Reduced space for time markers
  height: 100%;
  display: flex;
  align-items: center;
}

.time-marker {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  font-size: 0.7rem; // Smaller font for time
  color: #9e9e9e; // Lighter grey
}

.timeline-bar {
  position: relative;
  width: 100%;
  height: 24px; // --- DENSE DESIGN CHANGE: Reduced timeline height ---
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
  font-size: 0.75rem; // --- DENSE DESIGN CHANGE: Smaller label font ---
  padding: 0 6px;
  font-weight: 500;
}

// --- DENSE DESIGN CHANGE: Use Quasar's text utility classes ---
.text-caption {
  font-size: 0.75rem;
  line-height: 1.2;
}

.text-subtitle1 {
  font-size: 1.1rem;
}
</style>
