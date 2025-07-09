<template>
  <q-page>
    <div class="q-gutter-y-sm">
      <q-tabs
        v-model="tab"
        narrow-indicator
        no-caps
        inline-label
        dense
        align="justify"
        class="gradient-btn"
      >
        <q-route-tab
          :to="{ name: 'admin-payroll-attendance-dtr-overview' }"
          class="text-white"
          name="dtr_overview"
          icon="event_available"
          label="DTR Overview"
        />
        <q-route-tab
          :to="{ name: 'admin-payroll-attendance-summary' }"
          class="text-white"
          name="attendance_summary"
          icon="calendar_month"
          label="Attendance Summary"
        />
      </q-tabs>
    </div>
    <div>
      <router-view />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
// import AttendancceTable from "./sections/AttendanceTable.vue";
import AttendancceTable from "./sections/dtr-overview/AttendanceTable.vue";
import AttendanceSummary from "./sections/attendance-summary/AttendanceSummary.vue";
const tab = ref("dtr_overview");
</script>

<style lang="scss" scoped>
.gradient-btn {
  background: linear-gradient(45deg, #103432, #2575fc);
  border: none;
}
</style>
