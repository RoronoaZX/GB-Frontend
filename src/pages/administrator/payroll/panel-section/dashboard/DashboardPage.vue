<template>
  <TotalEmployeeSalaryBenefits />
  <div class="row justify-between">
    <div class="col-6 q-pr-sm">
      <BranchEmployeeCard />
    </div>
    <div class="col-6 q-pl-sm">
      <WarehouseEmployeCard />
    </div>
  </div>
</template>

<script setup>
import TotalEmployeeSalaryBenefits from "./section/TotalEmployeeSalaryBenefits.vue";
import BranchEmployeeCard from "./section/BranchEmployeeCard.vue";
import WarehouseEmployeCard from "./section/WarehouseEmployeCard.vue";
</script>
