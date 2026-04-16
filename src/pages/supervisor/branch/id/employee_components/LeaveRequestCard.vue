<template>
  <q-card class="leave-request-card q-mb-sm" flat bordered>
    <q-card-section class="row items-center q-pb-none">
      <div class="col">
        <div class="text-subtitle2 text-weight-medium">{{ fullName }}</div>
        <div class="text-caption text-grey-6">
          {{ leave.employee?.position || "Staff" }}
        </div>
      </div>
      <div class="col-auto">
        <q-chip
          :color="statusColor"
          text-color="white"
          dense
          class="leave-status-chip"
        >
          {{ leave.status || "Pending" }}
        </q-chip>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="leave-details">
        <div class="detail-row">
          <q-icon name="event" size="16px" />
          <span>From: {{ formatDate(leave.start_date) }}</span>
        </div>
        <div class="detail-row">
          <q-icon name="event_available" size="16px" />
          <span>To: {{ formatDate(leave.end_date) }}</span>
        </div>
        <div class="detail-row">
          <q-icon name="schedule" size="16px" />
          <span
            >Duration: {{ leave.duration_value }}
            {{ leave.duration_type }}</span
          >
        </div>
        <div v-if="leave.reason" class="detail-row">
          <q-icon name="description" size="16px" />
          <span>Reason: {{ leave.reason }}</span>
        </div>
        <div v-if="leave.handled_by" class="detail-row">
          <q-icon name="person" size="16px" />
          <span>Handled by: {{ leave.handled_by }}</span>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed } from "vue";
import {
  formatFullname,
  formatDate,
} from "src/composables/employeeFunction/useEmployeeFunctions";

const props = defineProps({
  leave: { type: Object, required: true },
});

const fullName = computed(() => formatFullname(props.leave.employee || {}));

const getLeaveStatusColor = (status) => {
  const colors = {
    pending: "orange",
    approved: "positive",
    rejected: "negative",
    cancelled: "grey",
  };
  return colors[status?.toLowerCase()] || "orange";
};

const statusColor = computed(() => getLeaveStatusColor(props.leave.status));
</script>

<style scoped>
.leave-request-card {
  border-radius: 12px;
  transition: all 0.3s ease;
}
.leave-request-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
.leave-status-chip {
  font-weight: 500;
  text-transform: capitalize;
}
.leave-details .detail-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #64748b;
}
.leave-details .detail-row:last-child {
  margin-bottom: 0;
}
.leave-details .detail-row .q-icon {
  color: #94a3b8;
  flex-shrink: 0;
}
</style>
