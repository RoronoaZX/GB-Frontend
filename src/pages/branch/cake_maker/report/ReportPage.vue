<template>
  <q-card flat>
    <q-card-section style="background-color: #ef4444">
      <div class="text-h6 text-white">
        <q-icon name="fa-solid fa-layer-group" />
        Report
      </div>
    </q-card-section>
    <q-card-section class="q-gutter-y-lg">
      <div align="right">
        <ReportCreate />
      </div>
      <div>
        <ReportTable />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import ReportCreate from "./components/ReportCreate.vue";
import ReportTable from "./components/ReportTable.vue";
</script>

<style lang="scss" scoped></style>
