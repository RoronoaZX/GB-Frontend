<template>
  <div class="q-gutter-y-md">
    <div class="row justify-between">
      <div>
        <SelectaSearch />
      </div>
      <div>
        <SelectaAddStocks />
      </div>
    </div>
  </div>
  <div>
    <SelectaCard />
  </div>
</template>
<script setup>
import SelectaSearch from "../selecta/components/SelectaSearch.vue";
import SelectaAddStocks from "../selecta/components/SelectaAddStocks.vue";
// import SelectaReportCreate from "../selecta/components/SelectaReportCreate.vue";
import SelectaCard from "../selecta/components/SelectaCard.vue";
</script>
