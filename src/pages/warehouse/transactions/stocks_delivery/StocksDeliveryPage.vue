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
        <q-tab class="text-dark" name="pending" label="Pending" />
        <q-tab class="text-dark" name="confirmed" label="Confirmed" />
        <q-tab class="text-dark" name="declined" label="Declined" />
      </q-tabs>
    </div>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="pending">
        <PendingPage />
      </q-tab-panel>
      <q-tab-panel name="confirmed">
        <ConfirmPage />
      </q-tab-panel>
      <q-tab-panel name="declined">
        <DeclinePage />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
import { computed, ref } from "vue";
import PendingPage from "./pending/PendingPage.vue";
import ConfirmPage from "./confirm/ConfirmPage.vue";
import DeclinePage from "./decline/DeclinePage.vue";

const tab = ref("pending");

const currentIndicatorColor = computed(() => {
  switch (tab.value) {
    case "pending":
      return "warning";
    case "confirmed":
      return "green-13";
    case "declined":
      return "red-6";
    default:
      return "light-green-13";
  }
});
</script>
