<template>
  <div>
    <h6>Cake Products</h6>

    {{ branchId }}
  </div>
</template>

<script setup>
const branchId = localStorage.getItem("branch_id");
console.log("Current branch ID:", branchId);
</script>

<style lang="scss" scoped></style>
