<template>
  <q-input
    v-model="filter"
    @update:model-value="emit('update:model-value', $events)"
    @clear="emit('clear')"
    outlined
    dense
    debounce="300"
    flat
    label="Search"
    style="width: 300px"
  >
    <template v-slot:append>
      <div>
        <q-icon name="search" />
      </div>
    </template>
  </q-input>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:model-value", "clear"]);
</script>
