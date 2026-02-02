<template>
  <div class="q-gutter-y-md">
    <div class="row justify-between">
      <div>
        <BreadSearch @update-search="updateSearchTerm" />
      </div>
      <div class="row q-gutter-md">
        <!-- <div>
          <SendBreadToOtherBranch />
        </div> -->
        <div>
          <q-btn
            class="bg-gradient text-white"
            outlined
            label="Send Bread To Branch"
            @click="handleSendProductDialog('Bread')"
          />
        </div>

        <div>
          <q-btn
            class="add-bg-gradient text-white"
            outlined
            label="Added Bread"
            @click="handleAddProductDialog('Bread')"
          />
        </div>
        <!-- <div>
          <BreadAddedView />
        </div> -->
      </div>
      <!-- <div>
        <BreadReportCreate />
      </div> -->
    </div>
  </div>
  <div>
    <BreadCard :filter="filter" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import BreadCard from "../bread/components/BreadCard.vue";
// import BreadReportCreate from "../bread/components/BreadReportCreate.vue";
import BreadSearch from "./SearchEngine.vue";
import SendBreadToOtherBranch from "../bread/components/SendBreadToOtherBranch.vue";
import BreadAddedView from "../bread/components/BreadAddedView.vue";
import SendingProductsToBranchButton from "../components/buttons/SendingProductsToBranchButton.vue";
import ViewAddProductsButton from "../components/buttons/ViewAddProductsButton.vue";
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
