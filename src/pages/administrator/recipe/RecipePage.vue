<template>
  <q-page class="elegant-container" flat>
    <q-card-section class="row justify-between">
      <div class="text-h6"></div>
      <div align="right">
        <RecipeCreate />
      </div>
    </q-card-section>
    <q-card-section>
      <RecipeTable />
    </q-card-section>
  </q-page>
</template>
<script setup>
import RecipeCreate from "./components/RecipeCreate.vue";
import RecipeTable from "./components/RecipeTable.vue";
</script>

<style lang="scss" scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 2rem;
  border-radius: 8px;
}
</style>
