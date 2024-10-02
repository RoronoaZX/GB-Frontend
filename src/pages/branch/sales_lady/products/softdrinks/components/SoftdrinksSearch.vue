<template>
  <q-input
    v-model="searchEngine"
    rounded
    outlined
    dense
    flat
    placeholder="Search..."
    style="width: 400px; max-width: 450px; min-width: 150px"
  >
    <template v-slot:append>
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
