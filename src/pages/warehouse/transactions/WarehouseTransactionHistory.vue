<template>
  <q-card flats>
    <q-card-section class="text-h6"> Transaction History </q-card-section>
    <q-separator />
    <q-card-section>
      <!-- <WarehouseTransactionSearchEngine /> -->
      <WarehouseTransactionTable />
    </q-card-section>
  </q-card>
</template>

<script setup>
// import WarehouseTransactionSearchEngine from './warehouse_transactions_section/WarehouseTransactionSearchEngine.vue'
import WarehouseTransactionTable from "./warehouse_transactions_section/WarehouseTransactionTable.vue";
</script>
