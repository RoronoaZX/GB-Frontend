<template>
  <!-- justify-between -->
  <div class="row justify-between">
    <!-- Table Section: Full width on mobile, 8/12 width on tablet, 9/12 width on desktop -->
    <div class="col-12 col-md-9 col-lg-9 q-pa-sm">
      <TableSection />
    </div>

    <!-- Cards Section: Prevent height stretching -->
    <div class="col-12 col-md-3 col-lg-3 q-gutter-y-md q-pa-sm card-side">
      <RegisterEmployee />
      <div class="row2">
        <BranchDesignationEmployee />
        <WarehouseDesignationEmployee />
      </div>
    </div>
  </div>
</template>

<script setup>
import TableSection from "./section/TableSection.vue";
import RegisterEmployee from "./section/RegisterEmployee.vue";
import BranchDesignationEmployee from "./section/BranchDesignationEmployee.vue";
import WarehouseDesignationEmployee from "./section/WarehouseDesignationEmployee.vue";
</script>

<style lang="scss" scoped>
/* Prevent right-side card section from inheriting full height of flex row */
.card-side {
  align-self: flex-start;
}

/* Layout for designation cards in a row */
.row2 {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}
</style>
