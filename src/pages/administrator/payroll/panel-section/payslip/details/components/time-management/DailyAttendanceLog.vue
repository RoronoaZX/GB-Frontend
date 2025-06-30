<template>
  <q-card flat class="log-card q-mb-sm">
    <div class="row items-center no-wrap">
      <!-- Column 1: Day & Clock-in (Flexible Width) -->
      <div class="col-auto">
        <div class="text-weight-bold">{{ log.dayLabelIn }}</div>
        <div class="text-grey-7 text-caption">Clock-in</div>
        <div class="text-subtitle1 text-weight-regular">{{ log.clockIn }}</div>
      </div>

      <!-- Column 2: Timeline (Fills remaining space) -->
      <div class="col q-px-xl">
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
              <span v-if="activity.label" class="activity-label">{{
                activity.label
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Column 3: Clock-out & Duration (Flexible Width) -->
      <div class="col-auto">
        <div class="row items-center no-wrap q-gutter-x-lg">
          <!-- Clock-out Block -->
          <div class="text-right">
            <div class="text-weight-bold">{{ log.dayLabelOut }}</div>
            <div class="text-grey-7 text-caption">Clock-out</div>
            <div class="text-subtitle1 text-weight-regular">
              {{ log.clockOut }}
            </div>
          </div>
          <!-- Duration Block -->
          <div class="text-right">
            <div class="text-grey-7 text-caption">Duration</div>
            <div class="text-subtitle1 text-weight-regular">
              {{ log.duration }}
            </div>
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
    default: () => ({
      dayLabelIn: "10 Tuesday",
      clockIn: "04:08 PM",
      dayLabelOut: "11 Wednesday",
      clockOut: "08:25 AM",
      duration: "16h 17m",
      activities: [
        {
          type: "working",
          label: "Working time",
          start: "16:08",
          end: "24:00",
        },
        {
          type: "working",
          label: "Working time",
          start: "00:00",
          end: "08:25",
        },
        {
          type: "break", // Example of another activity type
          label: "", // A small break marker with no label
          start: "03:30",
          end: "04:00",
        },
      ],
      otStatus: "approved",
    }),
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

const timeMarkers = [
  "02",
  "04",
  "06",
  "08",
  "10",
  "12",
  "14",
  "16",
  "18",
  "20",
  "22",
  "24",
  // "01",
  // "03",
  // "05",
  // "07",
  // "09",
  // "11",
  // "13",
  // "15",
  // "17",
  // "19",
  // "21",
  // "23",
];

const timeToPercentage = (timeString) => {
  if (!timeString) return 0;
  const [hours, minutes] = timeString.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;
  // This timeline represents a single 24-hour block for visualization
  const totalDayMinutes = 24 * 60;
  return (totalMinutes / totalDayMinutes) * 100;
};

const getActivityStyle = (activity) => {
  if (!activity.start || !activity.end) return {};

  const startPercent = timeToPercentage(activity.start);
  const endPercent = timeToPercentage(activity.end);
  let widthPercent = endPercent - startPercent;

  // Handle overnight shifts correctly
  if (widthPercent < 0) {
    widthPercent = 100 + widthPercent; // This logic might need adjustment based on data structure
  }

  return {
    left: `${startPercent}%`,
    width: `${widthPercent}%`,
  };
};

const getActivityClass = (activity) => {
  // Added a specific class for markers without labels
  if (!activity.label) return "activity-marker";

  switch (activity.type) {
    case "working":
      return "bg-primary";
    case "break":
      return "bg-orange-4"; // Changed to orange for visibility
    case "overtime":
      return "bg-deep-orange";
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
  border: 1px solid #eef0f2;
  border-radius: 8px;
  overflow: hidden;
  padding: 16px 24px; // Increased padding for a less cramped look
}

.timeline-container {
  position: relative;
  width: 100%;
  padding-top: 24px; // Space for time markers
  height: 100%;
  display: flex;
  align-items: center;
}

.time-marker {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  font-size: 0.75rem;
  color: #9e9e9e;
}

.timeline-bar {
  position: relative;
  width: 100%;
  height: 28px; // Slightly taller bar
  background-color: #f5f5f5;
  border-radius: 6px;
  overflow: hidden; // Ensures children conform to border-radius
}

.activity-block {
  position: absolute;
  top: 0;
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 6px; // Match parent's border-radius

  &:hover {
    filter: brightness(1.1);
    transform: scaleY(1.05); // Subtle hover effect
  }
}

// Special style for small markers (e.g., a break without a label)
.activity-marker {
  width: 2px !important; // Make it a thin vertical line
  background-color: #ff9800; // Example color for break marker
  border-radius: 0;
}

.activity-label {
  font-size: 0.75rem;
  padding: 0 8px;
  font-weight: 500;
}

.text-caption {
  font-size: 0.8rem;
  line-height: 1.2;
  color: #757575; // Slightly darker grey for better readability
}

.text-subtitle1 {
  font-size: 1.2rem; // Slightly larger for emphasis
  font-weight: 400;
}
</style>
