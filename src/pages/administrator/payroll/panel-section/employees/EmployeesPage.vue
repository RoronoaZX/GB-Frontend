<template>
  <div class="row justify-between">
    <div class="col-10">
      <TableSection />
    </div>
    <div class="col-2 q-gutter-y-md">
      <RegisterEmployee />
      <DesignationEmployee />
    </div>
  </div>
</template>

<script setup>
import TableSection from "./section/TableSection.vue";
import RegisterEmployee from "./section/RegisterEmployee.vue";
import DesignationEmployee from "./section/DesignationEmployee.vue";
</script>

<style lang="scss" scoped></style>
