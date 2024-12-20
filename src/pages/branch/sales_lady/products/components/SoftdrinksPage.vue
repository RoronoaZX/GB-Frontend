<template>
  <div class="q-gutter-y-md">
    <div class="row q-gutter-md">
      <div>
        <SoftdrinksSearch @update-search="updateSearchTerm" />
      </div>
      <div class="row q-gutter-md">
        <div>
          <SoftdrinksAddStocks />
        </div>
        <div>
          <SoftdrinksViewAddedStocks />
        </div>
      </div>
      <!-- <div>
        <SoftdrinksReportCreate />
      </div> -->
    </div>
  </div>
  <div>
    <SoftdrinksCard :filter="filter" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import SoftdrinksSearch from "./SearchEngine.vue";
import SoftdrinksCard from "../softdrinks/components/SoftdrinksCard.vue";
import SoftdrinksAddStocks from "../softdrinks/components/SoftdrinksAddStocks.vue";
import SoftdrinksViewAddedStocks from "../softdrinks/components/SoftdrinksViewAddedStocks.vue";

// Search term state
const filter = ref("");

// Update search term
const updateSearchTerm = (searchValue) => {
  filter.value = searchValue;
};
</script>
