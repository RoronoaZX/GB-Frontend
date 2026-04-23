<template>
  <div class="row q-col-gutter-lg q-mb-lg">
    <!-- Total Raw Materials -->
    <div class="col-12 col-sm-6 col-lg-3 animate-fade-in-up" style="animation-delay: 0.1s">
      <q-card class="stat-card shadow-soft" flat bordered>
        <q-card-section class="row items-center no-wrap">
          <div class="icon-box bg-teal-1 text-teal glass-effect">
            <q-icon name="inventory" size="24px" />
          </div>
          <div class="q-ml-md">
            <div class="text-caption text-grey-5 text-uppercase text-weight-bold tracking-wider">Master Items</div>
            <div class="text-h5 text-weight-bolder text-dark">{{ dashboardStore.stats.totalRecipes || 0 }}</div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Low Stock Items -->
    <div class="col-12 col-sm-6 col-lg-3 animate-fade-in-up" style="animation-delay: 0.2s">
      <q-card class="stat-card shadow-soft" flat bordered>
        <q-card-section class="row items-center no-wrap">
          <div class="icon-box bg-red-1 text-red glass-effect">
            <q-icon name="warning" size="24px" />
          </div>
          <div class="q-ml-md">
            <div class="text-caption text-grey-5 text-uppercase text-weight-bold tracking-wider">Low Stock Alerts</div>
            <div class="text-h5 text-weight-bolder text-red">{{ dashboardStore.stats.lowStockItems || 0 }}</div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Recent Deliveries (IN) -->
    <div class="col-12 col-sm-6 col-lg-3 animate-fade-in-up" style="animation-delay: 0.3s">
      <q-card class="stat-card shadow-soft" flat bordered>
        <q-card-section class="row items-center no-wrap">
          <div class="icon-box bg-blue-1 text-blue glass-effect">
            <q-icon name="local_shipping" size="24px" />
          </div>
          <div class="q-ml-md">
            <div class="text-caption text-grey-5 text-uppercase text-weight-bold tracking-wider">Network Deliveries</div>
            <div class="text-h5 text-weight-bolder text-dark">{{ totalDeliveries }}</div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Active Categories -->
    <div class="col-12 col-sm-6 col-lg-3 animate-fade-in-up" style="animation-delay: 0.4s">
      <q-card class="stat-card shadow-soft" flat bordered>
        <q-card-section class="row items-center no-wrap">
          <div class="icon-box bg-purple-1 text-purple glass-effect">
            <q-icon name="category" size="24px" />
          </div>
          <div class="q-ml-md">
            <div class="text-caption text-grey-5 text-uppercase text-weight-bold tracking-wider">Categories</div>
            <div class="text-h5 text-weight-bolder text-dark">4 Active</div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <!-- Transaction Analysis -->
  <div class="row q-col-gutter-lg q-mb-xl">
    <div class="col-12 col-md-8 animate-fade-in-up" style="animation-delay: 0.5s">
      <q-card class="chart-card shadow-soft" flat bordered>
        <q-card-section class="row items-center justify-between">
          <div>
            <div class="text-h6 text-weight-bold text-slate-800">Stock Movement Analytics</div>
            <div class="text-caption text-grey-6">Aggregated flow of materials across the entire network</div>
          </div>
          <q-btn-dropdown outline color="grey-7" :label="dashboardStore.timeRange" size="sm" class="rounded-pill">
            <q-list>
              <q-item clickable v-close-popup @click="dashboardStore.setTimeRange('7D')">
                <q-item-section>Last 7 Days</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="dashboardStore.setTimeRange('1M')">
                <q-item-section>Last 30 Days</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-card-section>
        <q-card-section style="height: 340px" class="q-pt-none">
           <canvas ref="rmMovementChart"></canvas>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-12 col-md-4 animate-fade-in-up" style="animation-delay: 0.6s">
      <q-card class="chart-card shadow-soft full-height-card" flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-bold text-slate-800">Top Transactions</div>
          <div class="text-caption text-grey-6">Latest material movements</div>
        </q-card-section>
        <q-card-section class="q-pa-none scrollable-list">
          <q-list separator>
            <q-item v-for="act in rmActivities" :key="act.id" class="q-py-md activity-item">
              <q-item-section avatar>
                <q-avatar size="40px" :color="act.type === 'IN' ? 'green-1' : 'red-1'" :text-color="act.type === 'IN' ? 'green-7' : 'red-7'" :icon="act.type === 'IN' ? 'add_shopping_cart' : 'local_fire_department'" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold text-slate-700 text-capitalize">{{ act.name }}</q-item-label>
                <q-item-label caption lines="1">{{ act.details }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                 <q-chip dense flat color="grey-2" text-color="grey-7" class="text-weight-bold" :label="formatTimeAgo(act.time)" />
              </q-item-section>
            </q-item>
            <q-item v-if="rmActivities.length === 0" class="text-center text-grey-5 q-pa-xl">
               <div class="column items-center">
                 <q-icon name="history" size="48px" color="grey-3" />
                 <div class="q-mt-sm">No recent movements</div>
               </div>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator />
        <q-card-section class="row items-center justify-center q-py-sm">
          <q-pagination
            v-model="dashboardStore.rmTransactionsPagination.current_page"
            :max="dashboardStore.rmTransactionsPagination.last_page"
            :max-pages="3"
            boundary-numbers
            direction-links
            flat
            color="grey-7"
            active-color="teal"
            size="sm"
            @update:model-value="onPageChange"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useDashboardStore } from "src/stores/dashboard";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const dashboardStore = useDashboardStore();
const rmMovementChart = ref(null);
let chartInstance = null;

const totalDeliveries = computed(() => {
  return (dashboardStore.inventoryInData || []).reduce((a, b) => a + b, 0).toLocaleString();
});

const rmActivities = computed(() => {
  return dashboardStore.rmTransactions || [];
});

const onPageChange = (page) => {
  dashboardStore.fetchRMTransactions(page, 5);
};

const formatTimeAgo = (dateStr) => {
  if (!dateStr) return "Just now";
  const diffMs = new Date() - new Date(dateStr);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
};

const renderChart = () => {
  if (!rmMovementChart.value) return;
  if (chartInstance) chartInstance.destroy();

  const ctx = rmMovementChart.value.getContext("2d");
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dashboardStore.inventoryLabels,
      datasets: [
        {
          label: 'Supply IN',
          data: dashboardStore.inventoryInData,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Consumption OUT',
          data: dashboardStore.inventoryOutData,
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
};

onMounted(async () => {
  if (dashboardStore.inventoryLabels.length === 0) {
    await dashboardStore.fetchDashboardMetrics();
  }
  renderChart();
});

watch(() => dashboardStore.inventoryLabels, () => {
  renderChart();
});
</script>

<style lang="scss" scoped>
.stat-card {
  border-radius: 16px;
  background: white;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-2px);
  }
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-card {
  border-radius: 20px;
  background: white;
}

.scrollable-list {
  height: 340px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
  }
}

.full-height-card {
  display: flex;
  flex-direction: column;
}
</style>
