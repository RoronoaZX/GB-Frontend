<template>
  <div class="q-mt-lg">
    <div class="item-start q-gutter-md" align="center">
      <BreadReport :userData="props.user" />
      <SelectaReport :userData="props.user" />
      <SoftdrinksReport :userData="props.user" />
      <CakeReport />
      <OtherProductsReport :userData="props.user" />
    </div>
  </div>
</template>

<script setup>
import BreadReport from "./components/BreadReport.vue";
import CakeReport from "./components/CakeReport.vue";
import OtherProductsReport from "./components/OtherProductsReport.vue";
import SelectaReport from "./components/SelectaReport.vue";
import SoftdrinksReport from "./components/SoftdrinksReport.vue";

const props = defineProps(["user"]);
console.log("user from Add sales", props.user);
</script>

<style lang="scss" scoped>
.user-card {
  height: 100%;
  border-radius: 15px;
  background: #fff;
  color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-button {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-button:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}
</style>
