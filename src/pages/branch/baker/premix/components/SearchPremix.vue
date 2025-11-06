<template>
  <div class="q-mb-md row items-center justify-between">
    <!-- 🔍 Search Input -->
    <q-input
      outlined
      dense
      placeholder="Search Premix Name"
      class="q-mb-sm"
      bg-color="grey-1"
      input-class="text-grey-8"
      label-color="grey-6"
      v-model="text"
      @update:model-value="emitSearch"
    >
      <template v-slot:append>
        <q-icon name="search" color="grey-6" />
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { ref } from "vue";

const text = ref("");

const emit = defineEmits(["search"]);
const emitSearch = (value) => emit("search", value);
</script>
