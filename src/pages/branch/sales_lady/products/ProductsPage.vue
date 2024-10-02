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
        <q-tab name="softdrinks" label="Softdrinks" />
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
        <q-tab-panel name="softdrinks">
          <div>
            <SoftdrinksPage />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<script setup>
import BreadPage from "./components/BreadPage.vue";
import SelectaPage from "./components/SelectaPage.vue";
import SoftdrinksPage from "./components/SoftdrinksPage.vue";
import { ref } from "vue";

const productsTab = ref("bread");
</script>
