<template>
  <q-page padding>
    <div class="elegant-container q-gutter-md">
      <div class="text-h6 row justify-between">
        <div>
          <q-btn outline flat icon="arrow_back" @click="navigateBack" />
          <q-space />
        </div>
        <div>
          <q-icon name="fa-solid fa-store" color="red-6" />
          {{ capitalizeFirstLetter(branchName) }}
        </div>
      </div>

      <div class="q-gutter-sm">
        <div class="tab-container">
          <q-tabs
            v-model="tab"
            dense
            class="bg-grey-2 text-grey-7 tabs-as-cards"
            active-color="red-6"
            indicator-color="transparent"
            align="justify"
          >
            <q-tab name="products" label="Products" />
            <q-tab name="rawMaterials" label="Raw Materials" />
            <q-tab name="recipe" label="Recipe" />
            <q-tab name="recipe-cost" label="Recipe Cost" />
            <q-tab name="premix" label="Premix" />
            <q-tab name="production" label="Production" />
            <q-tab name="transaction" label="Transactions" />
            <q-tab name="bir-report" label="BIR Report" />
          </q-tabs>
        </div>

        <q-card class="q-mt-sm">
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="products">
              <ProductPage />
            </q-tab-panel>

            <q-tab-panel name="rawMaterials">
              <RawMaterialsPage />
            </q-tab-panel>

            <q-tab-panel name="recipe">
              <RecipePage />
            </q-tab-panel>

            <q-tab-panel name="recipe-cost">
              <RecipeCostPage />
            </q-tab-panel>

            <q-tab-panel name="premix">
              <PremixPage />
            </q-tab-panel>

            <q-tab-panel name="production">
              <ProductionPage />
            </q-tab-panel>

            <q-tab-panel name="transaction">
              <TransactionPage />
            </q-tab-panel>
            <q-tab-panel name="bir-report">
              <BirReportsPage />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import ProductPage from "./components/products/ProductPage.vue";
import RawMaterialsPage from "./components/raw_materials/RawMaterialsPage.vue";
import ProductionPage from "./components/production/ProductionPage.vue";
import TransactionPage from "./components/transactions/TransactionPage.vue";
import RecipePage from "./components/recipe/RecipePage.vue";
import PremixPage from "./components/premix/PremixPage.vue";
import BirReportsPage from "./components/bir-reports/BirReportsPage.vue";
import RecipeCostPage from "./components/recipe_cost/RecipeCostPage.vue";

import { typographyFormat } from "src/composables/typography/typography-format";

import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "src/boot/axios";
import { Loading } from "quasar";

const route = useRoute();
const branchName = ref("");
const router = useRouter();

const { capitalizeFirstLetter } = typographyFormat();

const getBranchById = async (branchId) => {
  const res = await api.get(`/api/branches/${branchId}`);
  return res.data;
};

const getBranch = async () => {
  const branchId = route.params.branch_id;
  const branch = await getBranchById(branchId);
  if (branch && branch.name) {
    branchName.value = branch.name;
  } else {
    console.error("Branch data is missing 'name' property or invalid:", branch);
  }
};

onMounted(() => {
  getBranch();
});

const tab = ref("products");

const navigateBack = () => {
  Loading.show();
  router.push("/admin/branches").finally(() => {
    Loading.hide();
  });
};
</script>

<style scoped>
.q-tabs--not-scrollable .q-tabs__content,
body.mobile .q-tabs--scrollable.q-tabs--mobile-without-arrows .q-tabs__content {
  overflow: visible;
}
.tabs-as-cards {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
}

.tabs-as-cards .q-tab {
  background-color: white;
  color: #333;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  margin: 0 8px;
  padding: 10px 20px;
  transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s;
}

.tabs-as-cards .q-tab:hover {
  background-color: #f0f0f0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.tabs-as-cards .q-tab--active {
  background-color: #e0e0e0;
  color: #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
.tab-content {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
