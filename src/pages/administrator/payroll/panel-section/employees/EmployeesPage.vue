<template>
  <!-- justify-between -->
  <div class="row q-gutter-md">
    <div class="col-9">
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
