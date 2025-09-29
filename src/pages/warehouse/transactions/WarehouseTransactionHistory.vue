<template>
  <q-card flat>
    <q-card-section class="text-h6"> Transaction History </q-card-section>
    <div class="q-gutter-y-sm">
      <q-tabs
        v-model="tab"
        :indicator-color="currentIndicatorColor"
        narrow-indicator
        no-caps
        inline-label
        dense
        align="justify"
      >
        <q-tab class="text-dark" name="premix" label="Premix" />
        <q-tab
          class="text-dark"
          name="stocks_delivery"
          label="Stocks Delivery"
        />
      </q-tabs>
    </div>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="premix">
        <PremixTab />
      </q-tab-panel>
      <q-tab-panel name="stocks_delivery">
        <StocksDeliveryPage />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
import { computed, ref } from "vue";
import PremixTab from "./premix_transaction/PremixTab.vue";
import StocksDeliveryPage from "./stocks_delivery/StocksDeliveryPage.vue";

const tab = ref("premix");

const currentIndicatorColor = computed(() => {
  switch (tab.value) {
    case "premix":
      return "warning"; // Color for pending reports
    case "stocks_delivery":
      return "green-13"; // Color for confirm reports
    default:
      return "light-green-13"; // Fallback color
  }
});
</script>
