<template>
  <q-page class="elegant-container" flat>
    <q-card-section class="row justify-between">
      <div class="text-h6">
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
