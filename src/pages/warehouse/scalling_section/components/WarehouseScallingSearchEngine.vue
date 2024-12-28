<template>
  <q-input
    v-model="searchEngine"
    rounded
    outlined
    dense
    debounce="300"
    placeholder="Search..."
    class="q-mb-md"
    @update:model-value="emitSearch"
  >
    <!-- style="width: 500px; max-width: 1500px; min-width: 100px" -->
    <template v-slot:prepend>
      <div>
        <q-icon name="search" />
      </div>
    </template>
  </q-input>
</template>

<script setup>
import { ref } from "vue";
// Local search term
const searchEngine = ref("");
const emit = defineEmits(["update-search"]);

// Emit search term to parent
const emitSearch = () => {
  console.log("Emitting search term:", searchEngine.value); // Log emitted value
  emit("update-search", searchEngine.value);
};
</script>
