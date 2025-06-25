<template>
  <div class="stat-card">
    <div class="text-grey-7 text-body2">{{ title }}</div>
    <div class="text-h4 text-weight-bold q-mt-xs">{{ value }}</div>
    <div class="text-body2 q-mt-xs" :class="changeClass">
      <q-icon
        v-if="change !== 0"
        :name="change > 0 ? 'arrow_upward' : 'arrow_downward'"
        size="xs"
      />
      {{ Math.abs(change) }} vs last month
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: String,
  value: [String, Number],
  change: Number, // positive or negative number
});

const changeClass = computed(() => {
  if (props.change > 0) return "text-green-6";
  if (props.change < 0) return "text-red-6";
  return "text-grey-6";
});
</script>

<style scoped>
.stat-card {
  text-align: left;
}
</style>
