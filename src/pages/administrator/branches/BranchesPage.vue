<template>
  <q-page class="elegant-container" flat>
    <q-card-section class="row justify-between">
      <div class="text-h6 text-dark">
        <!-- <q-icon name="fa-solid fa-store" /> -->
        <!-- 🏪 Branches -->
        <div class="q-gutter-x-sm">
          <q-badge outline label="Open" color="info" />
          <q-badge outline label="Open Soon" color="warning" />
          <q-badge outline label="Close" color="accent" />
        </div>
      </div>
      <div>
        <BranchesCreate />
      </div>
    </q-card-section>
    <!-- <q-card-section class="q-gutter-md">
      <div class="row justify-end q-gutter-md">
        <BranchesSearchComponent />
      </div>
    </q-card-section> -->
    <q-card-section>
      <div>
        <BranchesTable />
      </div>
    </q-card-section>
  </q-page>
</template>

<script setup>
import BranchesCreate from "./components/BranchesCreateComponent.vue";
import BranchesTable from "./components/BranchesTableComponent.vue";
</script>
<style scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 2rem;
  border-radius: 8px;
}
</style>
