<template>
  <q-page class="elegant-container" flat>
    <q-card-section class="row justify-between">
      <div class="text-h6">
        <!-- <q-icon name="fa-solid fa-cake-candles" /> -->
        🥖 Products
        <div class="q-gutter-x-sm">
          <q-badge label="Bread" class="text-white" color="brown-13" />
          <q-badge label="Selecta" class="text-white" color="red-6" />
          <q-badge label="Sofdrinks" class="text-white" color="accent" />
        </div>
      </div>
      <div>
        <ProductCreate />
      </div>
    </q-card-section>
    <!-- <q-card-section class="q-gutter-md">
      <div class="row justify-end q-gutter-md">
        <ProductSearch />

      </div>
    </q-card-section> -->
    <q-card-section>
      <div>
        <ProductTable />
      </div>
    </q-card-section>
  </q-page>
</template>

<script setup>
// import BreadPanelSection from "./products_bread/BreadPanelSection.vue";
// import SelectaPage from "./selecta/SelectaPage.vue";
import { ref } from "vue";
import ProductCreate from "./components/ProductCreate.vue";
import ProductTable from "./components/ProductTable.vue";
import ProductSearch from "./components/ProductSearch.vue";

const productsTab = ref("bread");
</script>

<style lang="scss" scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 2rem;
  border-radius: 8px;
}
</style>
