<template>
  <q-page class="elegant-container" flat>
    <q-card-section class="row justify-between">
      <div class="text-h6">
        <!-- <q-icon name="description" /> -->
        📜 Recipe
        <!-- <div class="q-gutter-x-sm">
          <q-badge label="Good" class="text-white" color="primary" />
          <q-badge label="Warning" class="text-white" color="warning" />
          <q-badge label="Danger" class="text-white" color="red" />
        </div> -->
      </div>
      <div align="right">
        <RecipeCreate />
      </div>
    </q-card-section>
    <!-- <q-card-section class="q-gutter-md">
      <div class="row justify-end q-gutter-md">
        <RecipeSearch />
      </div>
    </q-card-section> -->
    <q-card-section>
      <RecipeTable />
    </q-card-section>
  </q-page>
</template>
<script setup>
import RecipeSearch from "./components/RecipeSearch.vue";
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
