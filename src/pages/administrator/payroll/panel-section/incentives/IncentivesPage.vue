<template>
  <q-page class="q-pa-md">
    <q-card-section>
      <AddIncentives />
    </q-card-section>

    <q-card-section>
      <IncentivesTable />
    </q-card-section>
  </q-page>
</template>

<script setup>
import AddIncentives from "./AddIncentives.vue";
import IncentivesTable from "./IncentivesTable.vue";
</script>

<style lang="scss" scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 2rem;
  border-radius: 8px;
}
</style>
