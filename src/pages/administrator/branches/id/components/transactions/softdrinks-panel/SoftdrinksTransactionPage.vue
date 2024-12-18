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
        name="pendingReports"
        icon="event_available"
        label="Pending Reports"
      />
      <q-tab
        class="text-white"
        name="confirmReports"
        icon="calendar_month"
        label="Confirm Reports"
      />
      <q-tab
        class="text-white"
        name="declineReports"
        icon="calendar_month"
        label="Decline Reports"
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
      <q-card>
        <h1>Declined Cards</h1>
      </q-card>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
import { ref } from "vue";
import TransactionPendingCard from "./pending-reports/TransactionPendingCard.vue";
import TransactionConfirmedCard from "./confirm-reports/TransactionConfirmedCard.vue";

const tab = ref("pendingReports");
</script>

<style lang="scss" scoped>
.gradient-btn {
  background: linear-gradient(45deg, #103432, #2575fc);
  border: none;
}
</style>
