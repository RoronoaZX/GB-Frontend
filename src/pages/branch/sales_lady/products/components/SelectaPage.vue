<template>
  <div class="q-gutter-y-md">
    <div class="row justify-between">
      <div>
        <SelectaSearch />
      </div>
      <!-- <div>
        <SelectaReportCreate />
      </div> -->
    </div>
  </div>
  <div>
    <SelectaCard />
  </div>
</template>
<script setup>
import SelectaSearch from "../selecta/components/SelectaSearch.vue";
import SelectaReportCreate from "../selecta/components/SelectaReportCreate.vue";
import SelectaCard from "../selecta/components/SelectaCard.vue";
</script>
