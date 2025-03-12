<template>
  <div>This is a table</div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed, ref, onMounted } from "vue";
import { usePremixStore } from "src/stores/premix";

const route = useRoute();
const premixStore = usePremixStore();
const warehouseID = computed(() => route.params.warehouse_id || null);

const fetchRequestBranchPremix = async () => {
  await premixStore.fetchRequestBranchPremix(warehouseID.value);
};

onMounted(async () => {
  if (warehouseID.value) {
    await fetchRequestBranchPremix();
  }
});
</script>

<style lang="scss" scoped></style>
