<template>
  <div class="leave-list-section q-px-md q-mt-md q-mb-xl">
    <div class="section-header q-mb-md">
      <div class="text-h6 text-weight-bold">Leave Requests This Year</div>
      <div class="text-caption text-grey-6">{{ currentYear }}</div>
    </div>

    <div v-if="loading" class="loading-state q-pa-xl">
      <div class="loading-animation">
        <q-spinner-ios size="48px" color="primary" />
        <div class="text-caption text-grey-6 q-mt-sm">
          Loading leave requests...
        </div>
      </div>
    </div>

    <div v-else-if="leaveRequests.length" class="leave-requests-list">
      <LeaveRequestCard
        v-for="leave in leaveRequests"
        :key="leave.id"
        :leave="leave"
      />
    </div>

    <div v-else class="empty-state-modern">
      <div class="empty-illustration">
        <q-icon name="event_note" size="80px" color="grey-3" />
      </div>
      <div class="empty-title">No leave requests found</div>
      <div class="text-caption text-grey-6">
        No leave requests for {{ currentYear }}
      </div>
    </div>
  </div>
</template>

<script setup>
import LeaveRequestCard from "./LeaveRequestCard.vue";

defineProps({
  leaveRequests: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
});

const currentYear = new Date().getFullYear();
</script>

<style scoped>
.leave-list-section .section-header {
  text-align: center;
  margin-bottom: 24px;
}
.leave-list-section .section-header .text-h6 {
  color: #1e293b;
  margin-bottom: 4px;
}
.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 30vh;
}
.loading-animation {
  text-align: center;
}
.empty-state-modern {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  padding: 32px;
  text-align: center;
}
.empty-illustration {
  position: relative;
  margin-bottom: 24px;
}
.empty-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}
</style>
