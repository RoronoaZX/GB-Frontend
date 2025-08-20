<template>
  <q-page class="q-pa-md">
    <q-card-section>
      <AddIncentives @created="refreshTable" />
    </q-card-section>

    <q-card-section>
      <IncentivesTable ref="incentivesTable" />
    </q-card-section>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import AddIncentives from "./AddIncentives.vue";
import IncentivesTable from "./IncentivesTable.vue";

const incentivesTable = ref(null);

//method to trigger table refresh
const refreshTable = () => {
  incentivesTable.value?.fetchIncentivesData();
};
</script>

<style lang="scss" scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 2rem;
  border-radius: 8px;
}
</style>
