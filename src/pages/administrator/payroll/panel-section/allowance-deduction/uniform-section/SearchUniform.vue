<template>
  <q-input
    v-model="searchKeyword"
    @update:model-value="emit('update:model-value', $event)"
    @clear="emit('clear')"
    label="Search Employeess"
    outlined
    dense
    flat
    debounce="500"
    style="width: 300px"
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
