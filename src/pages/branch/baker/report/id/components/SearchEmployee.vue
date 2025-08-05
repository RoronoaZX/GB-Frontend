<template>
  <q-input
    model-value="modelValue"
    @update:model-value="(val) => emit('update:model-value', val)"
    @clear="emit('clear')"
    label="Search Employee"
    outlined
    dense
    rounded
    debounce="500"
    placeholder="Enter employee name"
    clearable
  >
    <template v-slot:append>
      <q-icon v-if="!searchLoading" name="search" />
      <q-spinner v-else color="primary" size="sm" />
    </template>
  </q-input>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  searchLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:model-value", "clear"]);
</script>
