<template>
  <q-card flat>
    <q-separator />
    <div class="q-gutter-y-sm">
      <q-tabs
        v-model="tab"
        :indicator-color="currentIndicatorColor"
        narrow-indicator
        no-caps
        inline-label
        dense
        align="justify"
        class=""
      >
        <!-- class="gradient-btn" -->
        <q-tab
          class="text-dark"
          name="pendingReports"
          label="🟡Pending Premix"
        />
        <!-- icon="autorenew" -->
        <q-tab
          class="text-dark"
          name="confirmReports"
          label="🟢Confirm Premix"
        />
        <!-- icon="check_circle" -->
        <q-tab
          class="text-dark"
          name="declineReports"
          label="🛑Decline Premix"
        />
        <q-tab
          class="text-dark"
          name="processReports"
          label="🔵Process Premix"
        />
        <q-tab
          class="text-dark"
          name="completedReports"
          label="⚫Completed Premix"
        />
        <q-tab
          class="text-dark"
          name="toDeliverReports"
          label="🟤To Deliver Premix"
        />
        <q-tab
          class="text-dark"
          name="toReceiveReports"
          label="🟠To Receive Premix"
        />
        <q-tab class="text-dark" name="receive" label="🟢Receive Premix" />
      </q-tabs>
    </div>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="pendingReports">
        <PendingPage />
      </q-tab-panel>
      <q-tab-panel name="confirmReports">
        <ConfirmPage />
      </q-tab-panel>
      <q-tab-panel name="declineReports">
        <DeclinedPage />
      </q-tab-panel>
      <q-tab-panel name="processReports">
        <ProcessPage />
      </q-tab-panel>
      <q-tab-panel name="completedReports">
        <CompletedPage />
      </q-tab-panel>
      <q-tab-panel name="toDeliverReports">
        <ToDeliverPage />
      </q-tab-panel>
      <q-tab-panel name="toReceiveReports">
        <ToReceivePage />
      </q-tab-panel>
      <q-tab-panel name="receive">
        <ReceivedPage />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
import { computed, ref } from "vue";
import PendingPage from "./pending/PendingPage.vue";
import ConfirmPage from "./confirm/ConfirmPage.vue";
import DeclinedPage from "./decline/DeclinePage.vue";
import ProcessPage from "./process/ProcessPage.vue";
import CompletedPage from "./completed/CompletedPage.vue";
import ToDeliverPage from "./to-deliver/ToDeliverPage.vue";
import ToReceivePage from "./to-receive/ToReceivePage.vue";
import ReceivedPage from "./received/ReceivedPage.vue";

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
  background: linear-gradient(45deg, #103432, #186f6b);
  border: none;
}
</style>
