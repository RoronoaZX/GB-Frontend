<template>
  <div class="q-gutter-y-sm">
    <q-tabs
      v-model="tab"
      active-color="light-green-13"
      indicator-color="light-green-13"
      narrow-indicator
      no-caps
      inline-label
      dense
      align="justify"
      class="gradient-btn"
    >
      <q-tab class="text-white" name="bread" label="🍞Bread" />
      <q-tab class="text-white" name="selecta" label="🍦Selecta" />
      <q-tab class="text-white" name="nestle" label="❄️ Nestle" />
      <q-tab class="text-white" name="softdrinks" label="🥤Softdrinks" />
      <q-tab class="text-white" name="cake" label="🍰Cake" />
      <q-tab class="text-white" name="other" label="⭐Others" />
    </q-tabs>
  </div>
  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="bread">
      <TransactionProduct category="bread" />
    </q-tab-panel>
    <q-tab-panel name="selecta">
      <TransactionProduct category="selecta" />
    </q-tab-panel>
    <q-tab-panel name="nestle">
      <TransactionProduct category="nestle" />
    </q-tab-panel>
    <q-tab-panel name="softdrinks">
      <TransactionProduct category="softdrinks" />
    </q-tab-panel>
    <q-tab-panel name="cake">
      <q-card>
        <h1>Cake</h1>
      </q-card>
    </q-tab-panel>
    <q-tab-panel name="other">
      <TransactionProduct category="other" />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
import { ref } from "vue";
import BreadTransactionPage from "./bread-panel/BreadTransactionPage.vue";
import TransactionProduct from "./components/TransactionProduct.vue";
import SelectaTransactionPage from "./selecta-panel/SelectaTransactionPage.vue";
import NestleTransactionPage from "./nestle-panel/NestleTransactionPage.vue";
import SoftdrinksTransactionPage from "./softdrinks-panel/SoftdrinksTransactionPage.vue";
import OtherTransactionPage from "./other-panel/OtherTransactionPage.vue";

const tab = ref("bread");
</script>

<style lang="scss" scoped>
.gradient-btn {
  background: linear-gradient(45deg, #103432, #2575fc);
  border: none;
}
</style>
