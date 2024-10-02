<template>
  <q-card flat>
    <q-card-section style="background-color: #ef4444">
      <div class="text-h6 text-white">
        <q-icon name="fa-solid fa-layer-group" />
        Bakers Report
      </div>
    </q-card-section>
    <q-card-section>
      <div>
        <BakersReportTable />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import BakersReportTable from "./components/BakersReportCard.vue";
</script>

<style lang="scss" scoped></style>
