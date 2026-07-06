<template>
  <TotalEmployeeSalaryBenefits />
  <div class="row q-col-gutter-lg q-mt-xs q-mb-lg">
    <div class="col-12 col-md-6">
      <BranchEmployeeCard />
    </div>
    <div class="col-12 col-md-6">
      <WarehouseEmployeCard />
    </div>
    <div class="col-12 col-md-6">
      <UpcomingHolidaysCard />
    </div>
    <div class="col-12 col-md-6">
      <RecentLeaveRequestsCard />
    </div>
  </div>
</template>

<script setup>
import TotalEmployeeSalaryBenefits from "./section/TotalEmployeeSalaryBenefits.vue";
import BranchEmployeeCard from "./section/BranchEmployeeCard.vue";
import WarehouseEmployeCard from "./section/WarehouseEmployeCard.vue";
import UpcomingHolidaysCard from "./section/UpcomingHolidaysCard.vue";
import RecentLeaveRequestsCard from "./section/RecentLeaveRequestsCard.vue";
</script>
