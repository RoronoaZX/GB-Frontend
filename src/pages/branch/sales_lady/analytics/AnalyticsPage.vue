<template>
  <q-page padding>
    <div class="text-h5 text-weight-bold q-mb-md">Branch Analytics</div>
    
    <!-- Predictive Stocking Engine -->
    <PredictiveStockCard :predictions="dashboardStore.predictiveStocking" />

    <!-- Placeholder for other analytics -->
    <q-card flat bordered class="q-mt-md bg-grey-1">
      <q-card-section class="flex flex-center q-pa-xl">
        <div class="text-center text-grey-6">
          <q-icon name="insights" size="xl" />
          <div class="text-subtitle1">Advanced Branch Metrics coming soon...</div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useDashboardStore } from "src/stores/dashboard";
import { useBakerReportsStore } from "src/stores/baker-report";
import PredictiveStockCard from "src/components/PredictiveStockCard.vue";

const dashboardStore = useDashboardStore();
const bakerReportStore = useBakerReportsStore();

const branchId = computed(() => bakerReportStore.user?.device?.reference_id || "");

onMounted(async () => {
  if (branchId.value) {
    await dashboardStore.fetchPredictiveStocking({ branch_id: branchId.value });
  }
});
</script>

<style lang="scss" scoped></style>
