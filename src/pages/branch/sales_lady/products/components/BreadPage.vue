<template>
  <div class="q-gutter-y-md">
    <div class="row justify-between">
      <div>
        <BreadSearch @update-search="updateSearchTerm" />
      </div>
      <!-- <div>
        <BreadReportCreate />
      </div> -->
    </div>
  </div>
  <div>
    <BreadCard :filter="filter" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import BreadCard from "../bread/components/BreadCard.vue";
// import BreadReportCreate from "../bread/components/BreadReportCreate.vue";
import BreadSearch from "./SearchEngine.vue";

// Search term state
const filter = ref("");

// Update search term
const updateSearchTerm = (searchValue) => {
  filter.value = searchValue;
};
</script>
