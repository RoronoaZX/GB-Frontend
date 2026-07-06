<template>
  <TotalEmployeeSalaryBenefits />
  <div class="row q-col-gutter-lg q-mt-xs">
    <div class="col-12 col-md-6">
      <BranchEmployeeCard />
    </div>
    <div class="col-12 col-md-6">
      <WarehouseEmployeCard />
    </div>
  </div>
</template>

<script setup>
import TotalEmployeeSalaryBenefits from "./section/TotalEmployeeSalaryBenefits.vue";
import BranchEmployeeCard from "./section/BranchEmployeeCard.vue";
import WarehouseEmployeCard from "./section/WarehouseEmployeCard.vue";
</script>
