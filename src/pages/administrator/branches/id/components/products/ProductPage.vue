<template>
  <div class="q-gutter-sm">
    <!-- <div class="row q-gutter-md justify-end q-pa-sm">

      <ProductCreate />
    </div> -->
    <div>
      <ProductTable />
    </div>
  </div>
</template>

<script setup>
import ProductSearch from "./components/ProductSearch.vue";
import ProductCreate from "./components/ProductCreate.vue";
import ProductTable from "./components/ProductTable.vue";
</script>

<style lang="scss" scoped></style>
