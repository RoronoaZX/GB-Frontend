<template>
  <div class="q-gutter-sm">
    <div class="q-gutter-x-sm">
      <q-badge label="Good" class="text-white" color="positive" />
      <q-badge label="Warning" class="text-white" color="warning" />
      <q-badge label="Danger" class="text-white" color="red" />
    </div>
    <!-- <div class="row q-gutter-md justify-end q-pa-sm">
      <ProductSearch />
      <RawMaterialsCreate />
    </div> -->
    <div>
      <RawMaterialsTable />
    </div>
  </div>
</template>

<script setup>
import RawMaterialsTable from "./components/RawMaterialsTable.vue";
</script>

<style lang="scss" scoped></style>
