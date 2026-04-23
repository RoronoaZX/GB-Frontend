<template>
  <q-page class="raw-materials-page bg-grey-1">
    <div class="page-header q-mb-xl">
      <div class="row items-center justify-between">
        <div>
          <div class="text-h4 text-weight-bolder text-dark q-mb-xs">Raw Materials Panel</div>
          <div class="text-subtitle1 text-grey-6">Manage global ingredient inventory and track stock movements.</div>
        </div>
        <div class="header-actions">
           <RawMaterialsCreate />
        </div>
      </div>
    </div>

    <!-- Inventory Dashboard Section -->
    <RawMaterialsDashboard />

    <!-- Main Inventory Table -->
    <q-card flat bordered class="table-card">
      <q-card-section class="row items-center justify-between q-pb-none">
        <div class="text-h6 text-weight-bold text-grey-8">Master Item List</div>
        <div class="q-gutter-x-sm">
          <q-badge label="Ingredients" color="teal" class="q-px-md q-py-xs" />
          <q-badge label="Packaging" color="brown-6" class="q-px-md q-py-xs" />
        </div>
      </q-card-section>
      
      <q-card-section>
        <RawMaterialsTable />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import RawMaterialsCreate from "./components/RawMaterialsCreate.vue";
import RawMaterialsTable from "./components/RawMaterialsTable.vue";
import RawMaterialsDashboard from "./components/RawMaterialsDashboard.vue";
import { onMounted } from "vue";
import { useDashboardStore } from "src/stores/dashboard";

const dashboardStore = useDashboardStore();

onMounted(() => {
  // Ensure we have fresh metrics for the dashboard
  dashboardStore.fetchDashboardMetrics();
});
</script>

<style lang="scss" scoped>
.raw-materials-page {
  padding: 32px 40px;
}

.table-card {
  border-radius: 20px;
  background: white;
}

.page-header {
  /* Subtle header styling */
}
</style>
