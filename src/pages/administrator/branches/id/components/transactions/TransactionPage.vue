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
      <q-tab
        class="text-white"
        name="bread"
        icon="event_available"
        label="Bread"
      />
      <q-tab
        class="text-white"
        name="selecta"
        icon="event_available"
        label="Selecta"
      />
      <q-tab
        class="text-white"
        name="softdrinks"
        icon="calendar_month"
        label="Softdrinks"
      />
      <q-tab
        class="text-white"
        name="cake"
        icon="calendar_month"
        label="Cake"
      />
      <q-tab
        class="text-white"
        name="other"
        icon="calendar_month"
        label="Others"
      />
    </q-tabs>
  </div>
  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="bread">
      <q-card>
        <h1>Bread</h1>
      </q-card>
    </q-tab-panel>
    <q-tab-panel name="selecta">
      <SelectaTransactionPage />
    </q-tab-panel>
    <q-tab-panel name="softdrinks">
      <SoftdrinksTransactionPage />
    </q-tab-panel>
    <q-tab-panel name="cake">
      <q-card>
        <h1>Cake</h1>
      </q-card>
    </q-tab-panel>
    <q-tab-panel name="other">
      <OtherTransactionPage />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
import { ref } from "vue";
import SelectaTransactionPage from "./selecta-panel/SelectaTransactionPage.vue";
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
