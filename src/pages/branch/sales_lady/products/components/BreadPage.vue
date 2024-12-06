<template>
  <div class="q-gutter-y-md">
    <div class="row justify-between">
      <div>
        <!-- <BreadSearch /> -->
      </div>
      <!-- <div>
        <BreadReportCreate />
      </div> -->
    </div>
  </div>
  <div>
    <BreadCard />
  </div>
</template>
<script setup>
import BreadCard from "../bread/components/BreadCard.vue";
import BreadReportCreate from "../bread/components/BreadReportCreate.vue";
import BreadSearch from "../bread/components/BreadSearch.vue";

// import BreadSearchEngine from "../bread/components/BreadSearch.vue";
// import BreadTable from "../bread/components/BreadTable.vue";
</script>
