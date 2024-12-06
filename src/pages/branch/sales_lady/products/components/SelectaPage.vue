<template>
  <div class="q-gutter-y-md">
    <div class="row q-gutter-md">
      <div>
        <!-- <SelectaSearch /> -->
      </div>
      <div class="row q-gutter-md">
        <div>
          <SelectaAddStocks />
        </div>
        <div>
          <SelectaViewAddedstocks />
        </div>
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
import SelectaViewAddedstocks from "../selecta/components/SelectaViewAddedStocks.vue";
</script>
