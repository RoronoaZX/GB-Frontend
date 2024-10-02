<template>
  <q-input
    v-model="searchEngine"
    rounded
    outlined
    dense
    flat
    placeholder="Search..."
    style="width: 500px; max-width: 1500px; min-width: 100px"
  >
    <template v-slot:prepend>
      <div>
        <q-icon name="search" />
      </div>
    </template>
  </q-input>
</template>

<script setup>
import { ref } from "vue";

const searchEngine = ref("");
</script>
