<template>
  <q-page class="elegant-container" flat>
    <q-card-section class="row justify-between">
      <div class="text-h6">
        <!-- <q-icon name="fa-solid fa-layer-group" /> -->
        🛠️ Raw Materials
        <!-- <div class="q-gutter-x-sm">
          <q-badge label="Good" class="text-white" color="primary" />
          <q-badge label="Warning" class="text-white" color="warning" />
          <q-badge label="Danger" class="text-white" color="red" />
        </div> -->
        <div class="q-gutter-x-sm">
          <q-badge label="Ingredients" color="teal" />
          <q-badge label="Packaging Materials" color="brown-6" />
        </div>
      </div>
      <div align="right">
        <RawMaterialsCreate />
      </div>
    </q-card-section>
    <q-card-section>
      <!-- <div class="row justify-end q-gutter-md">
        <RawMaterialsSearchEngine />
      </div> -->
      <RawMaterialsTable />
    </q-card-section>
    <q-card-section> </q-card-section>
  </q-page>
</template>
<script setup>
import RawMaterialsSearchEngine from "./components/RawMaterialsSearchEngine.vue";
import RawMaterialsCreate from "./components/RawMaterialsCreate.vue";
import RawMaterialsTable from "./components/RawMaterialsTable.vue";
</script>

<style lang="scss" scoped>
.elegant-container {
  background: #f7f8fc;
}
</style>
