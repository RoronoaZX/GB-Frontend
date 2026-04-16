<template>
  <div class="quick-filters q-px-md q-mt-lg">
    <div class="filter-scroll">
      <q-btn
        v-for="btn in filters"
        :key="btn.value"
        rounded
        unelevated
        :class="['filter-pill', { 'active-pill': modelValue === btn.value }]"
        :label="btn.label"
        @click="$emit('update:modelValue', btn.value)"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: "all" },
});

defineEmits(["update:modelValue"]);

const filters = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "On Leave", value: "on leave" },
  { label: "Pending Leave", value: "pending leave" },
  { label: "Inactive", value: "inactive" },
];
</script>

<style scoped>
.filter-scroll {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 0;
  scrollbar-width: none;
}
.filter-scroll::-webkit-scrollbar {
  display: none;
}
.filter-pill {
  padding: 8px 20px !important;
  border-radius: 30px !important;
  background: white !important;
  color: #64748b !important;
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
}
.filter-pill.active-pill {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}
</style>
