<template>
  <q-page class="admin-dashboard-page bg-grey-1">
    <!-- Premium Header -->
    <div class="dashboard-header q-mb-lg">
      <div class="row items-center justify-between">
        <div>
          <div class="text-h4 text-weight-bolder text-dark q-mb-xs">
            Admin Dashboard
          </div>
          <div class="text-subtitle1 text-grey-6">
            System overview and business intelligence
          </div>
        </div>
        <div class="header-actions">
          <q-btn
            unelevated
            color="primary"
            icon="sync"
            label="Refresh Data"
            :loading="dashboardStore.loading"
            @click="dashboardStore.fetchDashboardMetrics()"
            class="refresh-btn"
          />
        </div>
      </div>
    </div>

    <!-- Error State -->
    <q-banner v-if="dashboardStore.error" class="bg-negative text-white q-mb-md rounded-borders">
      <template v-slot:avatar>
        <q-icon name="error" color="white" />
      </template>
      {{ dashboardStore.error }}
    </q-banner>

    <!-- Loading Skeleton Overlay (Optional, but let's keep it simple with a spinner) -->
    <div v-if="dashboardStore.loading" class="flex flex-center q-pa-xl">
      <q-spinner-dots color="primary" size="3em" />
    </div>

    <!-- Main Content -->
    <div v-else class="dashboard-content animate-fade">
      <!-- Top Cards -->
      <AdminDashboardCards :stats="dashboardStore.stats" />

      <!-- Analytics Charts -->
      <AdminChartWidgets 
        :trendData="dashboardStore.stats.totalSalesData"
        :distributionData="dashboardStore.stats.branchSalesDistribution"
      />

      <!-- Bottom Activity Feed -->
      <AdminRecentActivity :activities="dashboardStore.stats.recentActivity" />
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { useDashboardStore } from "src/stores/dashboard";
import AdminDashboardCards from "./components/AdminDashboardCards.vue";
import AdminChartWidgets from "./components/AdminChartWidgets.vue";
import AdminRecentActivity from "./components/AdminRecentActivity.vue";

const dashboardStore = useDashboardStore();

onMounted(() => {
  // Fetch high-level analytics in parallel over network
  dashboardStore.fetchDashboardMetrics();
});
</script>

<style lang="scss" scoped>
.admin-dashboard-page {
  /* Elegant soft background */
  background: #f8fafc;
  min-height: 100vh;
  
  /* Make responsive padding: smaller on mobile, larger on desktop */
  padding: 16px;
  @media (min-width: 768px) {
    padding: 32px 40px;
  }
}

.dashboard-header {
  .header-actions {
    margin-top: 16px;
    @media (min-width: 768px) {
      margin-top: 0;
    }
  }

  /* Sleek, subtle refresh button */
  .refresh-btn {
    border-radius: 8px;
    font-weight: 600;
    padding: 8px 16px;
    background: white !important;
    color: #475569 !important;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    
    &:hover {
      background: #f1f5f9 !important;
      border-color: #cbd5e1;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
  }
}

.animate-fade {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
