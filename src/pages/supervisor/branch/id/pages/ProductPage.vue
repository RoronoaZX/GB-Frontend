<template>
  <div class="row justify-between q-pt-md">
    <!-- <SearchEngine />
    <AddProduct /> -->
  </div>

  <div>
    <ProductCard :products="branchProduct" />
  </div>
</template>

<script setup>
import SearchEngine from "../search/SearchEngine.vue";
import AddProduct from "../add_button/AddProduct.vue";
import ProductCard from "../card/ProductCard.vue";

import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useBranchProductsStore } from "src/stores/branch-product";

import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatPrice } = typographyFormat();

const filter = ref("");

const route = useRoute();

const branchId = route.params.branch_id;
console.log("bransschId", branchId);

const branchProductStore = useBranchProductsStore();

const branchProduct = computed(() => branchProductStore.branchProducts);

console.log("branchProduct", branchProduct.value);

const updateSearchTerm = (searchValue) => {
  filter.value = searchValue;
};

onMounted(async () => {
  if (branchId) {
    await fetchBranchProducts(branchId);
  }
});

const fetchBranchProducts = async (branchId) => {
  try {
    const response = await branchProductStore.fetchBranchProducts(branchId);
    console.log("Branch product", branchProduct.value);
  } catch (error) {
    console.log("Error fetching branch product:", error);
  }
};
</script>

<style scoped>
.spinner-wrapper {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.data-error {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
