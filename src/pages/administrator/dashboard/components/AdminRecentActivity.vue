<template>
  <q-card class="activity-card q-mt-lg" flat bordered>
    <q-card-section class="row items-center justify-between">
      <div>
        <div class="text-h6 text-weight-bolder text-grey-8">Recent Activity Log</div>
        <div class="text-caption text-grey-5">Latest registered employees and system actions.</div>
      </div>
      <q-btn flat color="primary" label="View All" icon-right="arrow_forward" size="sm" />
    </q-card-section>

    <q-list separator class="q-pb-md">
      <q-item v-if="!activities || activities.length === 0">
        <q-item-section class="text-center text-grey-5 q-pa-lg">
          No recent activity to display.
        </q-item-section>
      </q-item>

      <q-item
        v-for="act in activities"
        :key="act.id"
        v-ripple
        class="activity-item q-py-md"
      >
        <q-item-section avatar>
          <q-avatar color="blue-1" text-color="primary" icon="person_add" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-bold text-dark">{{ act.action }}</q-item-label>
          <q-item-label caption lines="2">{{ act.details }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption class="time-label">{{ formatTimeAgo(act.time) }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup>
defineProps({
  activities: {
    type: Array,
    default: () => []
  }
});

const formatTimeAgo = (dateStr) => {
  if (!dateStr) return 'Just now';
  const diffMs = new Date() - new Date(dateStr);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays > 30) return 'A month ago';
  return `${diffDays} days ago`;
};
</script>

<style lang="scss" scoped>
.activity-card {
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.05);
}

.activity-item {
  transition: background 0.2s ease;
  border-radius: 12px;
  margin: 4px 8px;
  
  &:hover {
    background: #f8fafc;
  }
}

.time-label {
  font-weight: 600;
  color: #94a3b8;
}
</style>
