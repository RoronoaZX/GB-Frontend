<template>
  <q-input
    rounded
    outlined
    dense
    debounce="300"
    v-model="searchTerm"
    placeholder="Search products..."
    class="q-mb-md"
    @update:model-value="emitSearch"
    style="width: 500px; max-width: 1500px; min-width: 100px"
  >
    <template v-slot:append>
      <q-icon name="search" />
      <!-- <q-spinner v-else /> -->
    </template>
  </q-input>
</template>

<script setup>
import { ref } from "vue";

// Local search term
const searchTerm = ref("");
const emit = defineEmits(["update-search"]);
// Emit search term to parent
const emitSearch = () => {
  emit("update-search", searchTerm.value);
};
</script>
