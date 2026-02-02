<template>
  <div class="q-gutter-y-md">
    <div class="row q-gutter-md">
      <div>
        <SelectaSearch @update-search="updateSearchTerm" />
      </div>
      <div class="row q-gutter-md">
        <div>
          <q-btn
            class="bg-gradient text-white"
            outlined
            label="Send Selecta to Branch"
            @click="handleSendProductDialog('Selecta')"
          />
        </div>
        <div>
          <q-btn
            class="add-bg-gradient text-white"
            outlined
            label="Added Selecta"
            @click="handleAddProductDialog('Selecta')"
          />
        </div>

        <!-- <div>
          <SelectaAddStocks />
        </div>
        <div>
          <SelectaViewAddedstocks />
        </div> -->
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
import SendingProductsToBranchButton from "./buttons/SendingProductsToBranchButton.vue";
import { useQuasar } from "quasar";
// import ViewAddProductsButton from "./buttons/ViewAddProductsButton.vue";
import ViewAddProductsButton from "../components/buttons/ViewAddProductsButton.vue";

// Search term state
const filter = ref("");
const $q = useQuasar();

// Update search term
const updateSearchTerm = (searchValue) => {
  filter.value = searchValue;
};

const handleSendProductDialog = (category) => {
  $q.dialog({
    component: SendingProductsToBranchButton,
    componentProps: {
      category,
    },
  });
};

const handleAddProductDialog = (category) => {
  $q.dialog({
    component: ViewAddProductsButton,
    componentProps: {
      category,
    },
  });
};
</script>

<style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(135deg, #2f7159, #097140);
}

.add-bg-gradient {
  // background: linear-gradient(135deg, #6a11cb, #2575fc);
  background: linear-gradient(135deg, #2c3e50, #4ca1af);
  // background: linear-gradient(135deg, #8e44ad, #3498db);
}
</style>
