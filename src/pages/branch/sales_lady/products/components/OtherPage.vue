<template>
  <div class="q-gutter-y-md">
    <div class="row q-gutter-md">
      <div>
        <OthersSearch @update-search="updateSearchTerm" />
      </div>
      <div class="row q-gutter-md">
        <div>
          <OtherAddStocks />
        </div>
        <div>
          <OtherViewAddedStocks />
        </div>
      </div>
    </div>
    <div>
      <OtherCard :filter="filter" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import OthersSearch from "./SearchEngine.vue";
import OtherCard from "../other/OtherCard.vue";
import OtherAddStocks from "../other/OtherAddStocks.vue";
import OtherViewAddedStocks from "../other/OtherViewAddedStocks.vue";

// Search term state
const filter = ref("");

// Update search term
const updateSearchTerm = (searchValue) => {
  filter.value = searchValue;
};
</script>

<style lang="scss" scoped></style>
