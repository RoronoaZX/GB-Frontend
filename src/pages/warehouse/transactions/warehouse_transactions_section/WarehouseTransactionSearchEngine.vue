<template>
  <q-input
    v-model="warehouseTransactionSearchEngine"
    rounded
    outlined
    dense
    flat
    placeholder="Search..."
    style="width: 250px; max-width: 450px; min-width: 150px"
  >
    <template v-slot:prepend>
      <div>
        <q-icon name="search" />
      </div>
    </template>
  </q-input>
</template>
<script setup>
import { ref } from "vue";

const warehouseTransactionSearchEngine = ref("");
</script>
