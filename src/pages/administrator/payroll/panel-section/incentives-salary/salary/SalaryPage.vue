<template>
  <q-page class="q-pa-md">
    <q-card flat>
      <!-- <q-card-section>
        <AddSalary />
      </q-card-section> -->
      <q-card-section>
        <SalaryTable />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import SalaryTable from "./SalaryTable.vue";
</script>
