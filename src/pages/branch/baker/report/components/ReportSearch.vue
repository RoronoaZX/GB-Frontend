<template>
  <div>
    <q-input
      v-model="bakersReportSearchEngine"
      rounded
      outlined
      dense
      flat
      placeholder="Search..."
      style="width: 250px; max-width: 450px; min-width: 150px"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const bakersReportSearchEngine = ref("");
</script>

<style lang="scss" scoped></style>
