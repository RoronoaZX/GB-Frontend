<template>
  <q-card flat>
    <q-card-section class="text-h6"> Ingredients </q-card-section>
    <q-separator />
    <q-card-section class="q-gutter-md">
      <div align="right">
        <!-- <WarehouseIngredientsSearchEngine /> -->
        <WarehouseIngredientsCreateSupply />
      </div>
      <div>
        <WarehouseIngredientsTable />
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
// import WarehouseIngredientsSearchEngine from './warehouse_ingredient_section/WarehouseIngredientsSearchEngine.vue';
import WarehouseIngredientsCreateSupply from "./warehouse_ingredient_section/WarehouseIngredientsCreateSupply.vue";
import WarehouseIngredientsTable from "./warehouse_ingredient_section/WarehouseIngredientsTable.vue";
</script>
