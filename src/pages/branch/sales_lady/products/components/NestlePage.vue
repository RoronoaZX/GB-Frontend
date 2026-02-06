<template>
  <div>
    <NestleCard />
  </div>
</template>

<script setup>
import { ref } from "vue";
import NestleCard from "../nestle/NestleCard.vue";

const filter = ref("");

const udpateSearchTerm = (searchValue) => {
  filter.value = searchValue;
};
</script>
