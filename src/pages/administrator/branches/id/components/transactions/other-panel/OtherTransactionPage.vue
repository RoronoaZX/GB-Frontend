<template>
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
      <!-- class="gradient-btn" -->
      <q-tab
        class="text-dark"
        name="pendingReports"
        label="🟡Pending Reports"
      />
      <q-tab
        class="text-dark"
        name="confirmReports"
        label="🟢Confirm Reports"
      />
      <q-tab
        class="text-dark"
        name="declineReports"
        label="🛑Decline Reports"
      />
    </q-tabs>
  </div>
  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="pendingReports">
      <TransactionPendingCard />
    </q-tab-panel>
    <q-tab-panel name="confirmReports">
      <TransactionConfirmedCard />
    </q-tab-panel>
    <q-tab-panel name="declineReports">
      <TransactionDeclinedCard />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
import { ref, computed } from "vue";
import TransactionPendingCard from "./pending-reports/TransactionPendingCard.vue";
import TransactionConfirmedCard from "./confirm-reports/TransactionConfirmedCard.vue";
import TransactionDeclinedCard from "./decline-reports/TransactionDeclinedCard.vue";

const tab = ref("pendingReports");

const currentIndicatorColor = computed(() => {
  switch (tab.value) {
    case "pendingReports":
      return "warning"; // Color for pending reports
    case "confirmReports":
      return "green-13"; // Color for confirm reports
    case "declineReports":
      return "red-6"; // Color for decline reports
    default:
      return "light-green-13"; // Fallback color
  }
});
</script>

<style lang="scss" scoped>
.gradient-btn {
  background: linear-gradient(45deg, #103432, #2575fc);
  border: none;
}
</style>
