<template>
  <div class="q-gutter-y-md">
    <div class="row justify-between">
      <div>
        <!-- <SoftdrinksSearch /> -->
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
import SoftdrinksReportCreate from "../softdrinks/components/SoftdrinksReportCreate.vue";
import SoftdrinksSearch from "../softdrinks/components/SoftdrinksSearch.vue";
</script>
