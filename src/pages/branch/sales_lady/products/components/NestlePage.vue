<template>
  <div>This is Nestle Page</div>
</template>

<script setup>
import { ref } from "vue";

const filter = ref("");

const udpateSearchTerm = (searchValue) => {
  filter.value = searchValue;
};
</script>
