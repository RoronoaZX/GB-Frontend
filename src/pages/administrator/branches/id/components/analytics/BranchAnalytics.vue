<template>
  <div class="q-gutter-md animate-fade">
    <!-- Key Performance Indicators -->
    <div class="row q-col-gutter-lg">
      <div v-for="card in kpiCards" :key="card.title" class="col-12 col-sm-6 col-md-3">
        <q-card class="kpi-card elegant-card" flat>
          <q-card-section class="q-pa-lg">
            <div class="row items-center no-wrap">
              <div :class="['card-icon-wrapper', card.colorClass]">
                <q-icon :name="card.icon" size="32px" />
              </div>
              <div class="card-info q-ml-md" style="min-width: 0; flex: 1">
                <div class="text-caption text-uppercase text-weight-bold text-grey-5 tracking-wide ellipsis">
                  {{ card.title }}
                </div>
                <div 
                  class="text-weight-bolder text-dark q-mt-xs ds-number"
                  :style="{ fontSize: getFontSize(card.value, card.prefix) }"
                >
                  {{ card.prefix }}{{ card.value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 }) }}
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Performance Charts -->
    <div class="row q-col-gutter-lg q-mt-md">
      <!-- Sales Trend -->
      <div class="col-12 col-md-8">
        <q-card class="chart-card elegant-card" flat bordered>
          <q-card-section class="row items-center justify-between">
            <div>
              <div class="text-h6 text-weight-bolder text-grey-8">Sales Performance</div>
              <div class="text-caption text-grey-5">Net revenue trend over the selected period.</div>
            </div>
            <q-btn-group outline rounded dense>
              <q-btn
                v-for="range in ['7D', '1M', '3M', '1Y']"
                :key="range"
                :color="dashboardStore.timeRange === range ? 'primary' : 'grey-7'"
                :flat="dashboardStore.timeRange !== range"
                :label="range"
                @click="dashboardStore.setTimeRange(range)"
              />
            </q-btn-group>
          </q-card-section>
          <q-card-section>
            <div class="chart-container">
              <canvas ref="salesChartCanvas"></canvas>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Inventory Movement -->
      <div class="col-12 col-md-4">
        <q-card class="chart-card elegant-card" flat bordered>
          <q-card-section>
            <div class="text-h6 text-weight-bolder text-grey-8">Inventory Movement</div>
            <div class="text-caption text-grey-5">Incoming vs Outgoing stock flow.</div>
          </q-card-section>
          <q-card-section>
            <div class="chart-container donut-container">
              <canvas ref="inventoryChartCanvas"></canvas>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Branch Health & Recent Activity -->
    <div class="row q-col-gutter-lg q-mt-md">
      <div class="col-12">
        <q-card class="elegant-card" flat bordered>
          <q-card-section class="row items-center justify-between">
            <div class="text-h6 text-weight-bolder text-grey-8">Branch Activity Feed</div>
            <q-btn flat color="primary" label="View All History" icon-right="chevron_right" />
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-none">
            <q-list separator>
              <q-item v-for="activity in branchActivities" :key="activity.id" class="q-py-md">
                <q-item-section avatar>
                  <q-avatar :color="getActivityColor(activity.action)" text-color="white" :icon="getActivityIcon(activity.action)" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold">{{ activity.action }}</q-item-label>
                  <q-item-label caption>{{ activity.details }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <div class="text-caption text-grey-6">{{ formatDate(activity.time) }}</div>
                </q-item-section>
              </q-item>
              <q-item v-if="branchActivities.length === 0" class="text-center q-pa-xl text-grey-6">
                <q-item-section>
                  No recent activity recorded for this branch.
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import { useDashboardStore } from "src/stores/dashboard";
import { useRoute } from "vue-router";
import { Chart, registerables } from "chart.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
Chart.register(...registerables);

const route = useRoute();
const dashboardStore = useDashboardStore();
const branchId = computed(() => route.params.branch_id);

const salesChartCanvas = ref(null);
const inventoryChartCanvas = ref(null);
let salesChartInstance = null;
let inventoryChartInstance = null;

const kpiCards = computed(() => [
  {
    title: "Gross Sales",
    value: dashboardStore.stats.totalGrossSalesData.reduce((a, b) => a + b, 0),
    prefix: "₱",
    icon: "payments",
    colorClass: "bg-blue-1 text-blue",
  },
  {
    title: "Net Revenue",
    value: dashboardStore.stats.totalSalesData.reduce((a, b) => a + b, 0),
    prefix: "₱",
    icon: "trending_up",
    colorClass: "bg-emerald-1 text-emerald",
  },
  {
    title: "Active Staff",
    value: dashboardStore.stats.totalEmployees || 0,
    prefix: "",
    icon: "group",
    colorClass: "bg-purple-1 text-purple",
  },
  {
    title: "Low Stock Items",
    value: dashboardStore.stats.lowStockItems || 0,
    prefix: "",
    icon: "inventory_2",
    colorClass: "bg-rose-1 text-rose",
  },
]);

const getFontSize = (value, prefix) => {
  const str = (prefix || '') + value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  const len = str.length;
  if (len > 18) return "0.9rem";
  if (len > 15) return "1.1rem";
  if (len > 12) return "1.3rem";
  if (len > 10) return "1.6rem";
  return "2.125rem"; // Default text-h4
};

const branchActivities = computed(() => dashboardStore.stats.recentActivity);

const renderSalesChart = () => {
  if (!salesChartCanvas.value) return;
  if (salesChartInstance) salesChartInstance.destroy();

  const ctx = salesChartCanvas.value.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "rgba(59, 130, 246, 0.4)");
  gradient.addColorStop(1, "rgba(59, 130, 246, 0)");

  salesChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: dashboardStore.chartLabels,
      datasets: [
        {
          label: "Sales",
          data: dashboardStore.stats.totalSalesData,
          borderColor: "#3b82f6",
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.05)" } },
        x: { grid: { display: false } },
      },
    },
  });
};

const renderInventoryChart = () => {
  if (!inventoryChartCanvas.value) return;
  if (inventoryChartInstance) inventoryChartInstance.destroy();

  const totalIn = dashboardStore.inventoryInData.reduce((a, b) => a + b, 0);
  const totalOut = dashboardStore.inventoryOutData.reduce((a, b) => a + b, 0);

  const ctx = inventoryChartCanvas.value.getContext("2d");
  inventoryChartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Stock In", "Stock Out"],
      datasets: [
        {
          data: [totalIn || 50, totalOut || 30], // Mock fallback
          backgroundColor: ["#10b981", "#f43f5e"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      plugins: {
        legend: { position: "bottom", labels: { padding: 20, usePointStyle: true } },
      },
    },
  });
};

const getActivityIcon = (action) => {
  if (action.includes("Establish")) return "store";
  if (action.includes("Register")) return "person_add";
  return "history";
};

const getActivityColor = (action) => {
  if (action.includes("Establish")) return "blue";
  if (action.includes("Register")) return "emerald";
  return "grey-7";
};

const formatDate = (date) => dayjs(date).fromNow();

onMounted(async () => {
  await dashboardStore.setBranch(branchId.value);
  renderSalesChart();
  renderInventoryChart();
});

watch([() => dashboardStore.stats.totalSalesData, () => dashboardStore.chartLabels], () => {
  renderSalesChart();
  renderInventoryChart();
}, { deep: true });

onUnmounted(() => {
  if (salesChartInstance) salesChartInstance.destroy();
  if (inventoryChartInstance) inventoryChartInstance.destroy();
});
</script>

<style lang="scss" scoped>
.elegant-card {
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08);
  }
}

.kpi-card {
  .card-icon-wrapper {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &.bg-blue-1 { background: #eff6ff; color: #3b82f6; }
    &.bg-emerald-1 { background: #ecfdf5; color: #10b981; }
    &.bg-purple-1 { background: #f5f3ff; color: #8b5cf6; }
    &.bg-rose-1 { background: #fff1f2; color: #f43f5e; }
  }
}

.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}

.donut-container {
  height: 320px;
}

.animate-fade {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.ds-number {
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tracking-wide {
  letter-spacing: 0.5px;
}
</style>
