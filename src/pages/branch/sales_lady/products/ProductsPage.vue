<template>
  <q-card flat>
    <q-card-section style="background-color: #ef4444">
      <div class="text-h6 text-white">
        <q-icon name="fa-solid fa-store" />
        Store Branches
      </div>
    </q-card-section>
    <q-card-section>
      <q-tabs
        v-model="productsTab"
        dense
        class="bg-white"
        active-color="red-6"
        indicator-color="red-6"
        align="justify"
      >
        <q-tab name="bread" label="Bread" />
        <q-tab name="selecta" label="Selecta" />
        <q-tab name="nestle" label="Nestlé" />
        <q-tab name="softdrinks" label="Softdrinks" />
        <q-tab name="cake" label="Cake /s" />
        <q-tab name="others" label="Other /s" />
      </q-tabs>
    </q-card-section>
    <q-card-section>
      <q-tab-panels v-model="productsTab" animated>
        <q-tab-panel name="bread">
          <div>
            <BreadPage />
          </div>
        </q-tab-panel>
        <q-tab-panel name="selecta">
          <div>
            <SelectaPage />
          </div>
        </q-tab-panel>
        <q-tab-panel name="nestle">
          <div>
            <NestlePage />
          </div>
        </q-tab-panel>
        <q-tab-panel name="softdrinks">
          <div>
            <SoftdrinksPage />
          </div>
        </q-tab-panel>
        <q-tab-panel name="cake">
          <CakePage />
        </q-tab-panel>
        <q-tab-panel name="others">
          <OtherPage />
        </q-tab-panel>
        <q-tab-panel> </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<script setup>
import BreadPage from "./components/BreadPage.vue";
import SelectaPage from "./components/SelectaPage.vue";
import NestlePage from "./components/NestlePage.vue";
import SoftdrinksPage from "./components/SoftdrinksPage.vue";
import CakePage from "./components/CakePage.vue";
import OtherPage from "./components/OtherPage.vue";
import { onMounted, ref } from "vue";
import { useSalesReportsStore } from "src/stores/sales-report";

const productsTab = ref("bread");

const salesReportsStore = useSalesReportsStore();

const userData = salesReportsStore.user;

const branchId =
  userData.device?.refence_id || userData.device?.reference?.id || "0";

const fetchProducts = async () => {
  await salesReportsStore.fetchBranchProducts(branchId);

  console.log(
    "sales report productsdsdsd breadProducts",
    salesReportsStore.breadProducts
  );
  console.log(
    "sales report productsdsdsd selectaProducts",
    salesReportsStore.selectaProducts
  );
  console.log(
    "sales report productsdsdsd othersProducts",
    salesReportsStore.othersProducts
  );
  console.log(
    "sales report productsdsdsd softdrinksProducts",
    salesReportsStore.softdrinksProducts
  );
};

onMounted(async () => {
  if (branchId) {
    await fetchProducts(branchId);
  }
});
</script>
