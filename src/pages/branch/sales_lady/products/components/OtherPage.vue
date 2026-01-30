<template>
  <div class="q-gutter-y-md">
    <div class="row q-gutter-md">
      <div>
        <OthersSearch @update-search="updateSearchTerm" />
      </div>
      <div class="row q-gutter-md">
        <div>
          <q-btn
            class="bg-gradient text-white"
            outlined
            label="Send Other Product to Branch"
            @click="handleSendProductDialog('Other')"
          />
        </div>
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
