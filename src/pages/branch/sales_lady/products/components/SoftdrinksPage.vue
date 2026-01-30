<template>
  <div class="q-gutter-y-md">
    <div class="row q-gutter-md">
      <div>
        <SoftdrinksSearch @update-search="updateSearchTerm" />
      </div>
      <div class="row q-gutter-md">
        <div>
          <q-btn
            class="bg-gradient text-white"
            outlined
            label="Send Softdrinks To Branch"
            @click="handleSendProductDialog('Softdrinks')"
          />
        </div>
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
import SendingProductsToBranchButton from "./buttons/SendingProductsToBranchButton.vue";
import { useQuasar } from "quasar";

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
</script>

<style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(135deg, #2f7159, #097140);
}
</style>
