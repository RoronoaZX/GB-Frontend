<template>
  <div class="avatar-wrapper" :class="sexClass">
    <q-avatar size="60px" class="avatar">
      <img :src="avatarUrl" />
    </q-avatar>
    <div class="status-indicator" :class="statusClass"></div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  employee: Object,
});

const sexClass = computed(() => props.employee?.sex?.toLowerCase());
const statusClass = computed(
  () => props.employee?.status?.toLowerCase() || "inactive"
);

const avatarUrl = computed(() => {
  if (!props.employee)
    return "https://ui-avatars.com/api/?name=NA&background=667eea&color=fff&size=128";
  if (props.employee?.avatar) return props.employee.avatar;
  const firstInitial = props.employee?.firstname?.[0] || "";
  const lastInitial = props.employee?.lastname?.[0] || "";
  const initials = firstInitial + lastInitial || "NA";
  return `https://ui-avatars.com/api/?name=${initials}&background=667eea&color=fff&size=128`;
});
</script>

<style scoped>
.avatar-wrapper {
  position: relative;
}
.avatar {
  border-radius: 24px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
.status-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid white;
}
.status-indicator.active {
  background: #10b981;
}
.status-indicator.on-leave {
  background: #f59e0b;
}
.status-indicator.inactive {
  background: #ef4444;
}
.status-indicator.pending-leave {
  background: #8b5cf6;
}
</style>
