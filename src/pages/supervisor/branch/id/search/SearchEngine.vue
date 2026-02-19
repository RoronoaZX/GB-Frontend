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
    style="width: 380px; max-width: 1500px; min-width: 100px"
  >
    <template v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script setup>
import { ref } from "vue";

const searchTerm = ref("");
const emit = defineEmits(["update-search"]);

const emitSearch = () => {
  emit("update-search", searchTerm);
};
</script>
