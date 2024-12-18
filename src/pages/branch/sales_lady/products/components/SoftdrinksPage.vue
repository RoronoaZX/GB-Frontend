<template>
  <div class="q-gutter-y-md">
    <div class="row q-gutter-md">
      <div>
        <SoftdrinksAddStocks />
      </div>
      <div>
        <SoftdrinksViewAddedStocks />
      </div>
      <!-- <div>
        <SoftdrinksReportCreate />
      </div> -->
    </div>
  </div>
  <div>
    <SoftdrinksCard />
  </div>
</template>
<script setup>
import SoftdrinksCard from "../softdrinks/components/SoftdrinksCard.vue";
import SoftdrinksAddStocks from "../softdrinks/components/SoftdrinksAddStocks.vue";
import SoftdrinksViewAddedStocks from "../softdrinks/components/SoftdrinksViewAddedStocks.vue";
</script>
