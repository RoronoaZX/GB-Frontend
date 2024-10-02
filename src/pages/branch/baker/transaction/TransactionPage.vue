<template>
  <q-card flat>
    <q-card-section style="background-color: #ef4444">
      <div class="text-h6 text-white">
        <q-icon name="manufacturing" />
        Transaction
      </div>
    </q-card-section>
    <q-card-section>
      <TransactionTable />
    </q-card-section>
  </q-card>
</template>

<script setup>
import TransactionTable from "./components/TransactionTable.vue";
</script>

<style lang="scss" scoped></style>
