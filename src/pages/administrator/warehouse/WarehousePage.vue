<template>
  <q-page>
    <q-card class="elegant-container" flat>
      <q-card-section class="row justify-between">
        <div class="text-h6 text-dark">
          <div class="q-gutter-x-sm">
            <q-badge label="Open" outline color="info" />
            <q-badge label="Closed" outline color="accent" />
          </div>
        </div>
        <div align="right">
          <WarehouseCreateComponent />
        </div>
      </q-card-section>
      <q-card-section>
        <WarehouseTableComponent />
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import WarehouseTableComponent from "./components/WarehouseTableComponent.vue";
import WarehouseCreateComponent from "./components/WarehouseCreateComponent.vue";
</script>

<style lang="scss" scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 2rem;
  border-radius: 8px;
}
</style>
