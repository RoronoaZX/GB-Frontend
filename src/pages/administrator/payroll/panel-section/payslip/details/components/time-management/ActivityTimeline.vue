<template>
  <div class="timeline-container">
    <!-- Background with hour markers -->
    <div class="timeline-background">
      <div v-for="hour in hours" :key="hour" class="hour-marker">
        <span class="hour-label">{{ hour }}</span>
      </div>
    </div>

    <!-- Activity segments -->
    <div
      v-for="(activity, index) in activities"
      :key="index"
      class="activity-segment"
      :style="getSegmentStyle(activity)"
    >
      <q-tooltip anchor="top middle" self="bottom middle">
        {{ activity.label }}: {{ activity.start }} - {{ activity.end }}
      </q-tooltip>
      <span class="activity-label">{{ activity.label }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  activities: {
    type: Array,
    required: true,
  },
  startTime: { type: String, default: "08:00" },
  endTime: { type: String, default: "24:00" },
});

const hours = computed(() => {
  const start = parseInt(props.startTime.split(":")[0]);
  const end = parseInt(props.endTime.split(":")[0]);
  const list = [];
  for (let i = start + 1; i < end; i++) {
    if (i % 2 !== 0) {
      // Show labels for odd hours to prevent clutter
      list.push(i.toString().padStart(2, "0") + ":00");
    }
  }
  return list;
});

const totalMinutes = computed(
  () => timeToMinutes(props.endTime) - timeToMinutes(props.startTime)
);

// --- Helper Functions ---
const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

const timeToPercentage = (timeStr) => {
  const activityMinutes =
    timeToMinutes(timeStr) - timeToMinutes(props.startTime);
  return (activityMinutes / totalMinutes.value) * 100;
};

const activityColors = {
  working: "bg-blue-6",
  break: "bg-teal-4",
  overtime: "bg-orange-6",
  day_off: "bg-yellow-6",
  default: "bg-grey-4",
};

const getSegmentStyle = (activity) => {
  const startPercent = timeToPercentage(activity.start);
  const endPercent = timeToPercentage(activity.end);
  const widthPercent = endPercent - startPercent;

  return {
    left: `${startPercent}%`,
    width: `${widthPercent}%`,
    backgroundColor: `var(--q-color-${
      activityColors[activity.type]?.replace("bg-", "") || "grey-4"
    })`,
  };
};
</script>

<style lang="scss" scoped>
.timeline-container {
  position: relative;
  width: 100%;
  height: 40px;
  margin: auto 0;
}

.timeline-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}

.hour-marker {
  position: relative;
  flex-grow: 1;
  height: 100%;
  border-left: 1px solid #e0e0e0;
  &:first-child {
    border-left: none;
  }
}

.hour-label {
  position: absolute;
  top: -20px;
  left: -15px;
  font-size: 0.75rem;
  color: #9e9e9e;
}

.activity-segment {
  position: absolute;
  top: 0;
  height: 100%;
  border-radius: 8px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: filter 0.2s ease;
  &:hover {
    filter: brightness(1.1);
  }
}

.activity-label {
  padding: 0 8px;
}
</style>
