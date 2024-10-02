<template>
  <q-card flat>
    <q-card-section style="background-color: #ef4444">
      <div class="text-h6 text-white">
        <q-icon name="fa-solid fa-layer-group" />
        Raw Materials
      </div>
    </q-card-section>
    <q-card-section>
      <div class="q-gutter-x-sm">
        <q-badge label="Good" class="text-white" color="positive" />
        <q-badge label="Warning" class="text-white" color="warning" />
        <q-badge label="Danger" class="text-white" color="red" />
      </div>
    </q-card-section>
    <q-card-section>
      <div>
        <RawMaterialsTable />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import RawMaterialsTable from "./components/RawMaterialsTable.vue";
</script>

<style lang="scss" scoped></style>
