<template>
  <div>
    <q-tabs v-model="tab" dense align="justify">
      <!-- class="bg-grey-2 text-grey-7 tabs-as-cards"
      active-color="red-6"
      indicator-color="transparent" -->
      <q-tab name="non-VAT" label="Non-VAT" />
      <q-tab name="VAT" label="VAT" />
      <q-tab name="expenses" label="Expenses" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="non-VAT">
        <div class="q-pa-md">
          <div>
            <NonVAT />
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="VAT">
        <div class="q-pa-md">
          <VatReport />
        </div>
      </q-tab-panel>
      <q-tab-panel name="expenses">
        <div class="q-pa-md">
          <ExpensesReport />
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NonVAT from "./components/NonVatReport.vue";
import VatReport from "./components/VatReport.vue";
import ExpensesReport from "./components/ExepensesReport.vue";

const tab = ref("non-VAT");
</script>

<style lang="scss" scoped>
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
</style>
