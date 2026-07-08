<template>
  <div class="row q-col-gutter-md justify-between items-start payroll-page-container">
    <!-- Table Section: Full width on mobile, 9/12 width on desktop -->
    <div class="col-12 col-md-9 q-pa-sm">
      <TableSection class="premium-table-wrapper" />
    </div>

    <!-- Cards Section: Prevent height stretching -->
    <div class="col-12 col-md-3 q-gutter-y-md q-pa-sm card-side">
      <RegisterEmployee />
      <div class="row-widgets">
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
.payroll-page-container {
  padding: 8px;
}

/* Prevent right-side card section from inheriting full height of flex row */
.card-side {
  align-self: flex-start;
}

/* Layout for designation cards in a row */
.row-widgets {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.premium-table-wrapper {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.04);
}

:global(.body--dark) {
  .premium-table-wrapper {
    background: #0f172a !important;
    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.3) !important;
  }
}
</style>
