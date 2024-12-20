<template>
  <div class="q-gutter-y-md">
    <div class="row q-gutter-md">
      <div>
        <SelectaSearch @update-search="updateSearchTerm" />
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
    <SelectaCard :filter="filter" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import SelectaSearch from "./SearchEngine.vue";
import SelectaAddStocks from "../selecta/components/SelectaAddStocks.vue";
// import SelectaReportCreate from "../selecta/components/SelectaReportCreate.vue";
import SelectaCard from "../selecta/components/SelectaCard.vue";
import SelectaViewAddedstocks from "../selecta/components/SelectaViewAddedStocks.vue";

// Search term state
const filter = ref("");

// Update search term
const updateSearchTerm = (searchValue) => {
  filter.value = searchValue;
};
</script>
