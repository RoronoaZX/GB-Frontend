<template>
  <div class="q-gutter-y-md">
    <div class="row q-gutter-md">
      <div>
        <NestleSearch @update-search="udpateSearchTerm" />
      </div>
      <div class="row q-gutter-md">
        <div>
          <q-btn
            class="bg-gradient text-white"
            outlined
            label="Send Nestle to Branch"
            @click="handleSendProductDialog('Nestle')"
          />
        </div>
        <div>
          <q-btn
            class="add-bg-gradient text-white"
            outlined
            label="Added Nestlé"
            @click="handleAddProductDialog('Nestle')"
          />
        </div>
      </div>
    </div>
  </div>
  <div>
    <NestleCard />
  </div>
</template>

<script setup>
import { ref } from "vue";
import NestleCard from "../nestle/NestleCard.vue";
import NestleSearch from "./SearchEngine.vue";
import SendingProductsToBranchButton from "./buttons/SendingProductsToBranchButton.vue";
import { useQuasar } from "quasar";
import ViewAddProductsButton from "./buttons/ViewAddProductsButton.vue";

const filter = ref("");
const $q = useQuasar();

const udpateSearchTerm = (searchValue) => {
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
  background: linear-gradient(135deg, #2c3e50, #4ca1af);
}
</style>
