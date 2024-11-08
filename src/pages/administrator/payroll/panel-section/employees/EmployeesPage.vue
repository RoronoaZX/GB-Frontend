<template>
  <!-- justify-between -->
  <div class="row justify-between">
    <!-- Table Section: Full width on mobile, 8/12 width on tablet, 9/12 width on desktop -->
    <div class="col-12 col-md-9 col-lg-9 q-pa-sm">
      <TableSection />
    </div>

    <!-- Cards Section: Full width on mobile, 4/12 width on tablet, 3/12 width on desktop -->
    <div class="col-12 col-md-3 col-lg-3 q-gutter-y-md q-pa-sm">
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
