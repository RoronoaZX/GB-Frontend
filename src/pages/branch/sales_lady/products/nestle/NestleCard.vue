<template>
  <div>This is Nestle Page</div>
</template>

<script setup>
import { useSalesReportsStore } from "src/stores/sales-report";
import { ref } from "vue";

const salesReportStore = useSalesReportsStore();
</script>
