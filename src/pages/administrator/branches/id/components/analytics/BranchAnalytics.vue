<template>
  <div class="q-gutter-md animate-fade">
    <!-- Dataless Alert Banner -->
    <q-banner
      v-if="isDataless"
      class="bg-warning text-dark q-mb-md rounded-borders shadow-1"
      style="border-radius: 12px;"
    >
      <template v-slot:avatar>
        <q-icon name="warning" color="amber-9" size="md" />
      </template>
      <div class="text-weight-bold text-subtitle2">No Activity Recorded in Selected Timeframe</div>
      <div class="text-caption">
        This branch has not recorded any sales or production data in the selected period ({{ timeRangeLabel }}). 
        Try switching the time range to <strong>3M</strong> or <strong>1Y</strong> to view historical metrics.
      </div>
    </q-banner>

    <!-- Key Performance Indicators -->
    <div class="row q-col-gutter-lg">
      <div v-for="card in kpiCards" :key="card.title" class="col-12 col-sm-6 col-md">
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
          <q-card-section class="row items-center justify-between q-col-gutter-sm">
            <div>
              <div class="text-h6 text-weight-bolder text-grey-8">Sales Performance</div>
              <div class="text-caption text-grey-5">Financial trend lines over the selected period.</div>
            </div>
            <div class="row items-center q-gutter-md">
              <div class="row items-center q-gutter-sm text-caption text-grey-7">
                <q-checkbox v-model="showGrossSales" label="Gross" color="blue" dense />
                <q-checkbox v-model="showNetRevenue" label="Net" color="teal" dense />
                <q-checkbox v-model="showExpenses" label="Expenses" color="red" dense />
                <q-checkbox v-model="showCredits" label="Credits" color="purple" dense />
                <q-checkbox v-model="showCharges" label="Shortages" color="orange" dense />
                <q-checkbox v-model="showOverages" label="Overages" color="indigo" dense />
                <q-checkbox v-model="showWaste" label="Wastage" color="brown" dense />
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
              <q-btn
                flat
                round
                dense
                color="primary"
                icon="file_download"
                @click="exportChartData"
                class="q-ml-xs"
              >
                <q-tooltip>Export Data (CSV)</q-tooltip>
              </q-btn>
            </div>
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

    <!-- Profitability Leaderboard Widget -->
    <AdminProfitabilityLeaderboardWidget
      v-if="dashboardStore.profitMargins && dashboardStore.profitMargins.length > 0"
      :profitMargins="dashboardStore.profitMargins"
      class="q-mt-lg"
    />

    <!-- Profit Margin Analysis -->
    <AdminProfitMarginWidget
      v-if="dashboardStore.profitMargins && dashboardStore.profitMargins.length > 0"
      :profitMargins="dashboardStore.profitMargins"
      class="q-mt-lg"
    />

    <!-- Branch Health & Recent Activity -->
    <div class="row q-col-gutter-lg q-mt-lg">
      <!-- Left: Activity Feed -->
      <div class="col-12 col-md-6">
        <q-card class="elegant-card full-height" flat bordered>
          <q-card-section class="row items-center justify-between">
            <div class="text-h6 text-weight-bolder text-grey-8">Branch Activity Feed</div>
            <q-btn flat color="primary" label="View All History" icon-right="chevron_right" @click="openHistoryDialog" />
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

      <!-- Right: Cost Adjustments Feed -->
      <div class="col-12 col-md-6">
        <q-card class="elegant-card full-height" flat bordered>
          <q-card-section class="row items-center justify-between">
            <div class="text-h6 text-weight-bolder text-grey-8">Raw Material Cost Adjustments</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-none">
            <q-table
              flat
              dense
              :rows="dashboardStore.recipeCostMetrics.recentChanges"
              :columns="costColumns"
              row-key="id"
              hide-pagination
              :rows-per-page-options="[0]"
              class="audit-table"
            >
              <template v-slot:body-cell-recipe="props">
                <q-td :props="props">
                  <div class="text-weight-bold text-dark text-capitalize">
                    {{ props.row.recipe_name }}
                  </div>
                </q-td>
              </template>

              <template v-slot:body-cell-change="p">
                <q-td :props="p">
                  <div class="row items-center no-wrap">
                    <span class="text-caption text-grey-7 q-mr-xs">{{ formatField(p.row.changed_field, p.row.unit) }}:</span>
                    <span class="text-strike text-grey-6 q-mr-xs">{{ p.row.old_value }}</span>
                    <q-icon name="arrow_forward" size="12px" color="primary" class="q-mr-xs" />
                    <span class="text-weight-bold text-positive">{{ p.row.new_value }}</span>
                  </div>
                </q-td>
              </template>

              <template v-slot:body-cell-date="p">
                <q-td :props="p" class="text-grey-7 text-caption">
                  {{ formatTimestamp(p.row.date) }}
                </q-td>
              </template>
            </q-table>
            <div v-if="dashboardStore.recipeCostMetrics.recentChanges.length === 0" class="text-center q-pa-xl text-grey-5">
              <q-icon name="history_toggle_off" size="3em" />
              <div class="q-mt-sm">No recent cost changes recorded</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Activity History Dialog -->
    <BranchHistoryDialog ref="historyDialogRef" :branch-id="branchId" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import { useDashboardStore } from "src/stores/dashboard";
import { useRoute } from "vue-router";
import { Chart, registerables } from "chart.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import BranchHistoryDialog from "./components/BranchHistoryDialog.vue";
import AdminProfitMarginWidget from "src/pages/administrator/dashboard/components/AdminProfitMarginWidget.vue";
import AdminProfitabilityLeaderboardWidget from "src/pages/administrator/dashboard/components/AdminProfitabilityLeaderboardWidget.vue";

dayjs.extend(relativeTime);
Chart.register(...registerables);

const route = useRoute();
const dashboardStore = useDashboardStore();
const branchId = computed(() => route.params.branch_id);

const showGrossSales = ref(true);
const showNetRevenue = ref(true);
const showExpenses = ref(false);
const showCredits = ref(false);
const showCharges = ref(false);
const showOverages = ref(false);
const showWaste = ref(false);

watch(
  [showGrossSales, showNetRevenue, showExpenses, showCredits, showCharges, showOverages, showWaste],
  () => {
    renderSalesChart();
  }
);

const salesChartCanvas = ref(null);
const inventoryChartCanvas = ref(null);
let salesChartInstance = null;
let inventoryChartInstance = null;

const historyDialogRef = ref(null);

const openHistoryDialog = () => {
  historyDialogRef.value?.open();
};

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
    title: "Avg Production Cost",
    value: dashboardStore.recipeCostMetrics.averageCost || 0,
    prefix: "₱",
    icon: "monetization_on",
    colorClass: "bg-amber-1 text-amber-9",
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

const costColumns = [
  { name: "recipe", label: "Raw Material", align: "left", field: "recipe_name", classes: "text-weight-medium" },
  { name: "change", label: "Adjustment", align: "left" },
  { name: "user", label: "Modified By", align: "left", field: "changed_by" },
  { name: "date", label: "Date", align: "right" },
];

const formatField = (field, unit) => {
  if (field === 'price_per_gram') {
    return unit?.toLowerCase().includes('pc') ? 'Price/Pc' : 'Price/G';
  }
  return 'Qty';
};

const formatTimestamp = (date) => {
  if (!date) return "";
  return dayjs(date).format("MMM DD, YYYY h:mm A");
};

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

const isDataless = computed(() => {
  const totalNetRevenue = dashboardStore.stats.totalSalesData.reduce((a, b) => a + b, 0);
  const totalGrossSales = dashboardStore.stats.totalGrossSalesData.reduce((a, b) => a + b, 0);
  return totalNetRevenue === 0 && totalGrossSales === 0;
});

const timeRangeLabel = computed(() => {
  const map = {
    '7D': 'last 7 days',
    '1M': 'last 30 days',
    '3M': 'last 90 days',
    '1Y': 'last 365 days'
  };
  return map[dashboardStore.timeRange] || 'selected timeframe';
});

const renderSalesChart = () => {
  if (!salesChartCanvas.value) return;
  if (salesChartInstance) salesChartInstance.destroy();

  const ctx = salesChartCanvas.value.getContext("2d");
  const datasets = [];

  if (showGrossSales.value) {
    const grossGradient = ctx.createLinearGradient(0, 0, 0, 400);
    grossGradient.addColorStop(0, "rgba(59, 130, 246, 0.2)");
    grossGradient.addColorStop(1, "rgba(59, 130, 246, 0)");

    datasets.push({
      label: "Gross Sales",
      data: dashboardStore.stats.totalGrossSalesData,
      borderColor: "#3b82f6",
      backgroundColor: grossGradient,
      fill: true,
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: "#fff",
      pointBorderWidth: 2,
    });
  }

  if (showNetRevenue.value) {
    const netGradient = ctx.createLinearGradient(0, 0, 0, 400);
    netGradient.addColorStop(0, "rgba(20, 184, 166, 0.2)");
    netGradient.addColorStop(1, "rgba(20, 184, 166, 0)");

    datasets.push({
      label: "Net Revenue",
      data: dashboardStore.stats.totalSalesData,
      borderColor: "#14b8a6",
      backgroundColor: netGradient,
      fill: true,
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: "#fff",
      pointBorderWidth: 2,
    });
  }

  if (showExpenses.value) {
    const expensesGradient = ctx.createLinearGradient(0, 0, 0, 400);
    expensesGradient.addColorStop(0, "rgba(239, 68, 68, 0.2)");
    expensesGradient.addColorStop(1, "rgba(239, 68, 68, 0)");

    datasets.push({
      label: "Expenses",
      data: dashboardStore.stats.totalExpensesData,
      borderColor: "#ef4444",
      backgroundColor: expensesGradient,
      fill: true,
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: "#fff",
      pointBorderWidth: 2,
    });
  }

  if (showCredits.value) {
    const creditsGradient = ctx.createLinearGradient(0, 0, 0, 400);
    creditsGradient.addColorStop(0, "rgba(156, 39, 176, 0.2)");
    creditsGradient.addColorStop(1, "rgba(156, 39, 176, 0)");

    datasets.push({
      label: "Credits",
      data: dashboardStore.stats.totalCreditsData,
      borderColor: "#9c27b0",
      backgroundColor: creditsGradient,
      fill: true,
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: "#fff",
      pointBorderWidth: 2,
    });
  }

  if (showCharges.value) {
    const chargesGradient = ctx.createLinearGradient(0, 0, 0, 400);
    chargesGradient.addColorStop(0, "rgba(255, 152, 0, 0.2)");
    chargesGradient.addColorStop(1, "rgba(255, 152, 0, 0)");

    datasets.push({
      label: "Shortages",
      data: dashboardStore.stats.totalChargesData,
      borderColor: "#ff9800",
      backgroundColor: chargesGradient,
      fill: true,
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: "#fff",
      pointBorderWidth: 2,
    });
  }

  if (showOverages.value) {
    const overagesGradient = ctx.createLinearGradient(0, 0, 0, 400);
    overagesGradient.addColorStop(0, "rgba(63, 81, 181, 0.2)");
    overagesGradient.addColorStop(1, "rgba(63, 81, 181, 0)");

    datasets.push({
      label: "Overages",
      data: dashboardStore.stats.totalOveragesData,
      borderColor: "#3f51b5",
      backgroundColor: overagesGradient,
      fill: true,
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: "#fff",
      pointBorderWidth: 2,
    });
  }

  if (showWaste.value) {
    const wasteGradient = ctx.createLinearGradient(0, 0, 0, 400);
    wasteGradient.addColorStop(0, "rgba(121, 85, 72, 0.2)");
    wasteGradient.addColorStop(1, "rgba(121, 85, 72, 0)");

    datasets.push({
      label: "Wastage",
      data: dashboardStore.stats.totalWasteData,
      borderColor: "#795548",
      backgroundColor: wasteGradient,
      fill: true,
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: "#fff",
      pointBorderWidth: 2,
    });
  }

  salesChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: dashboardStore.chartLabels,
      datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: datasets.length > 0,
          position: "top",
          labels: {
            boxWidth: 12,
            usePointStyle: true,
            padding: 10,
          }
        }
      },
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

const exportChartData = () => {
  const headers = ["Timeline Interval", "Gross Sales", "Net Revenue", "Expenses", "Credits", "Shortages", "Overages", "Wastage"];
  const rows = dashboardStore.chartLabels.map((label, index) => [
    label,
    dashboardStore.stats.totalGrossSalesData[index] || 0,
    dashboardStore.stats.totalSalesData[index] || 0,
    dashboardStore.stats.totalExpensesData[index] || 0,
    dashboardStore.stats.totalCreditsData[index] || 0,
    dashboardStore.stats.totalChargesData[index] || 0,
    dashboardStore.stats.totalOveragesData[index] || 0,
    dashboardStore.stats.totalWasteData[index] || 0,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((e) => e.map((val) => (typeof val === "string" ? `"${val}"` : val)).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);

  const branchName = dashboardStore.stats.branchesList.find(b => b.id == branchId.value)?.name || `Branch_${branchId.value}`;
  const rangeText = dashboardStore.timeRange;
  link.setAttribute("download", `GB_Bakeshop_Sales_Data_${branchName.replace(/\s+/g, "_")}_${rangeText}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

onMounted(async () => {
  await dashboardStore.setBranch(branchId.value);
  // Verify if current view contains no data
  const hasData = dashboardStore.stats.totalSalesData.some(v => v > 0);
  if (!hasData) {
    console.log("No recent data found. Auto-expanding timeframe to 3M...");
    dashboardStore.setTimeRange('3M');
  }
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
    &.bg-amber-1 { background: #fffbeb; color: #b45309; }
  }
}

.audit-table :deep(thead tr th) {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 11px;
  color: #64748b;
  background-color: #f8fafc;
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
