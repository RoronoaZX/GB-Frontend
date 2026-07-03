<template>
  <div class="row q-col-gutter-lg q-mt-md">
    <!-- Sales Trend Chart -->
    <div class="col-12 col-md-8">
      <q-card class="chart-card" flat bordered>
        <q-card-section>
          <div class="row items-center justify-between q-col-gutter-sm">
            <div>
              <div class="text-h6 text-weight-bolder text-grey-8">
                {{ timeRangeDescription }} Sales Analytics
              </div>
              <div class="text-caption text-grey-5">
                Visualizing financial trend lines over the selected period.
              </div>
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
              <div class="row q-gutter-xs">
                <q-btn-toggle
                  v-model="chartType"
                  flat
                  dense
                  toggle-color="primary"
                  color="grey-6"
                  :options="[
                    { label: 'Linear', value: 'line', icon: 'show_chart' },
                    { label: 'Bar', value: 'bar', icon: 'bar_chart' },
                    { label: 'Pie', value: 'pie', icon: 'pie_chart' },
                  ]"
                />
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="chart-container">
            <canvas ref="trendChartCanvas"></canvas>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Donut Distribution Chart -->
    <div class="col-12 col-md-4">
      <q-card class="chart-card" flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-bolder text-grey-8">
            Revenue by Branch
          </div>
          <div class="text-caption text-grey-5">
            Top performing locations this month.
          </div>
        </q-card-section>
        <q-card-section>
          <div class="chart-container donut-container">
            <canvas ref="donutChartCanvas"></canvas>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { Chart, registerables } from "chart.js";
import { useDashboardStore } from "src/stores/dashboard";
import { useQuasar } from "quasar";

Chart.register(...registerables);

const dashboardStore = useDashboardStore();
const $q = useQuasar();

const props = defineProps({
  trendData: {
    type: Array,
    default: () => [],
  },
  grossSalesData: {
    type: Array,
    default: () => [],
  },
  expensesData: {
    type: Array,
    default: () => [],
  },
  creditsData: {
    type: Array,
    default: () => [],
  },
  chargesData: {
    type: Array,
    default: () => [],
  },
  overagesData: {
    type: Array,
    default: () => [],
  },
  wasteData: {
    type: Array,
    default: () => [],
  },
  trendLabels: {
    type: Array,
    default: () => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  timeRangeDescription: {
    type: String,
    default: "Weekly",
  },
  distributionData: {
    type: Array,
    default: () => [],
  },
});

const trendChartCanvas = ref(null);
const donutChartCanvas = ref(null);

let trendChartInstance = null;
let donutChartInstance = null;

const chartType = ref("line");

const showGrossSales = ref(true);
const showNetRevenue = ref(true);
const showExpenses = ref(false);
const showCredits = ref(false);
const showCharges = ref(false);
const showOverages = ref(false);
const showWaste = ref(false);

const renderCharts = () => {
  // 1. Sales Trend Chart
  if (trendChartCanvas.value) {
    if (trendChartInstance) trendChartInstance.destroy();

    const ctx = trendChartCanvas.value.getContext("2d");
    const datasets = [];

    // Chart.js type mapping
    const type = chartType.value === "pie" ? "pie" : chartType.value;

    if (chartType.value !== "pie") {
      if (showGrossSales.value) {
        const grossGradient = ctx.createLinearGradient(0, 0, 0, 400);
        grossGradient.addColorStop(0, "rgba(59, 130, 246, 0.2)");
        grossGradient.addColorStop(1, "rgba(59, 130, 246, 0)");

        datasets.push({
          label: "Gross Sales",
          data: props.grossSalesData.length ? props.grossSalesData : props.trendLabels.map(() => 0),
          borderColor: "#3b82f6",
          backgroundColor: chartType.value === 'line' ? grossGradient : "#3b82f6",
          borderWidth: 3,
          fill: chartType.value === "line",
          tension: 0.4,
          borderRadius: chartType.value === 'bar' ? 8 : 0,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#3b82f6",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        });
      }

      if (showNetRevenue.value) {
        const netGradient = ctx.createLinearGradient(0, 0, 0, 400);
        netGradient.addColorStop(0, "rgba(20, 184, 166, 0.2)");
        netGradient.addColorStop(1, "rgba(20, 184, 166, 0)");

        datasets.push({
          label: "Net Revenue",
          data: props.trendData.length ? props.trendData : props.trendLabels.map(() => 0),
          borderColor: "#14b8a6",
          backgroundColor: chartType.value === 'line' ? netGradient : "#14b8a6",
          borderWidth: 3,
          fill: chartType.value === "line",
          tension: 0.4,
          borderRadius: chartType.value === 'bar' ? 8 : 0,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#14b8a6",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        });
      }

      if (showExpenses.value) {
        const expensesGradient = ctx.createLinearGradient(0, 0, 0, 400);
        expensesGradient.addColorStop(0, "rgba(239, 68, 68, 0.2)");
        expensesGradient.addColorStop(1, "rgba(239, 68, 68, 0)");

        datasets.push({
          label: "Expenses",
          data: props.expensesData.length ? props.expensesData : props.trendLabels.map(() => 0),
          borderColor: "#ef4444",
          backgroundColor: chartType.value === 'line' ? expensesGradient : "#ef4444",
          borderWidth: 3,
          fill: chartType.value === "line",
          tension: 0.4,
          borderRadius: chartType.value === 'bar' ? 8 : 0,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#ef4444",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        });
      }

      if (showCredits.value) {
        const creditsGradient = ctx.createLinearGradient(0, 0, 0, 400);
        creditsGradient.addColorStop(0, "rgba(156, 39, 176, 0.2)");
        creditsGradient.addColorStop(1, "rgba(156, 39, 176, 0)");

        datasets.push({
          label: "Credits",
          data: props.creditsData.length ? props.creditsData : props.trendLabels.map(() => 0),
          borderColor: "#9c27b0",
          backgroundColor: chartType.value === 'line' ? creditsGradient : "#9c27b0",
          borderWidth: 3,
          fill: chartType.value === "line",
          tension: 0.4,
          borderRadius: chartType.value === 'bar' ? 8 : 0,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#9c27b0",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        });
      }

      if (showCharges.value) {
        const chargesGradient = ctx.createLinearGradient(0, 0, 0, 400);
        chargesGradient.addColorStop(0, "rgba(255, 152, 0, 0.2)");
        chargesGradient.addColorStop(1, "rgba(255, 152, 0, 0)");

        datasets.push({
          label: "Shortages",
          data: props.chargesData.length ? props.chargesData : props.trendLabels.map(() => 0),
          borderColor: "#ff9800",
          backgroundColor: chartType.value === 'line' ? chargesGradient : "#ff9800",
          borderWidth: 3,
          fill: chartType.value === "line",
          tension: 0.4,
          borderRadius: chartType.value === 'bar' ? 8 : 0,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#ff9800",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        });
      }

      if (showOverages.value) {
        const overagesGradient = ctx.createLinearGradient(0, 0, 0, 400);
        overagesGradient.addColorStop(0, "rgba(63, 81, 181, 0.2)");
        overagesGradient.addColorStop(1, "rgba(63, 81, 181, 0)");

        datasets.push({
          label: "Overages",
          data: props.overagesData.length ? props.overagesData : props.trendLabels.map(() => 0),
          borderColor: "#3f51b5",
          backgroundColor: chartType.value === 'line' ? overagesGradient : "#3f51b5",
          borderWidth: 3,
          fill: chartType.value === "line",
          tension: 0.4,
          borderRadius: chartType.value === 'bar' ? 8 : 0,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#3f51b5",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        });
      }

      if (showWaste.value) {
        const wasteGradient = ctx.createLinearGradient(0, 0, 0, 400);
        wasteGradient.addColorStop(0, "rgba(121, 85, 72, 0.2)");
        wasteGradient.addColorStop(1, "rgba(121, 85, 72, 0)");

        datasets.push({
          label: "Wastage",
          data: props.wasteData.length ? props.wasteData : props.trendLabels.map(() => 0),
          borderColor: "#795548",
          backgroundColor: chartType.value === 'line' ? wasteGradient : "#795548",
          borderWidth: 3,
          fill: chartType.value === "line",
          tension: 0.4,
          borderRadius: chartType.value === 'bar' ? 8 : 0,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#795548",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        });
      }
    } else {
      // Pie View
      datasets.push({
        label: `Net Profit (₱)`,
        data: props.trendData.length ? props.trendData : [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4", "#f43f5e"],
        borderWidth: 1,
      });
    }

    trendChartInstance = new Chart(ctx, {
      type: type,
      data: {
        labels: props.trendLabels,
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: chartType.value === 'pie' },
          tooltip: {
            backgroundColor: "#1e293b",
            padding: 12,
            titleFont: { size: 14, weight: "bold" },
            bodyFont: { size: 13 },
            displayColors: chartType.value === 'pie',
            callbacks: {
              label: function (context) {
                return ` ₱${context.parsed.y?.toLocaleString() || context.parsed.toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          y: {
            display: chartType.value !== 'pie',
            beginAtZero: true,
            grid: { 
              borderDash: [5, 5], 
              color: $q.dark.isActive ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0" 
            },
            ticks: {
              color: $q.dark.isActive ? "#cbd5e1" : "#64748b",
              callback: (value) => `₱${value.toLocaleString()}`,
            },
          },
          x: {
            display: chartType.value !== 'pie',
            grid: { display: false },
            ticks: {
              color: $q.dark.isActive ? "#cbd5e1" : "#64748b",
            }
          },
        },
      },
    });
  }

  // 2. Donut Chart
  if (donutChartCanvas.value) {
    if (donutChartInstance) donutChartInstance.destroy();

    const ctx = donutChartCanvas.value.getContext("2d");

    // Default to mock data if empty
    const labels = props.distributionData.length
      ? props.distributionData.map((d) => d.name)
      : ["Branch A", "Branch B", "Branch C"];

    const dataVals = props.distributionData.length
      ? props.distributionData.map((d) => d.sales)
      : [45000, 25000, 30000];

    donutChartInstance = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            data: dataVals,
            backgroundColor: [
              "#3b82f6",
              "#10b981",
              "#f59e0b",
              "#8b5cf6",
              "#ef4444",
            ],
            borderWidth: 0,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 20,
              usePointStyle: true,
              font: { family: "'Inter', sans-serif", weight: "500" },
            },
          },
        },
      },
    });
  }
};

const exportChartData = () => {
  const headers = ["Timeline Interval", "Gross Sales", "Net Revenue", "Expenses", "Credits", "Shortages", "Overages", "Wastage"];
  const rows = props.trendLabels.map((label, index) => [
    label,
    props.grossSalesData[index] || 0,
    props.trendData[index] || 0,
    props.expensesData[index] || 0,
    props.creditsData[index] || 0,
    props.chargesData[index] || 0,
    props.overagesData[index] || 0,
    props.wasteData[index] || 0,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((e) => e.map((val) => (typeof val === "string" ? `"${val}"` : val)).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);

  const rangeText = props.timeRangeDescription.replace(/\s+/g, "_");
  link.setAttribute("download", `GB_Bakeshop_Sales_Data_${rangeText}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

onMounted(() => {
  renderCharts();
});

watch(
  [
    () => props.trendData,
    () => props.grossSalesData,
    () => props.expensesData,
    () => props.creditsData,
    () => props.chargesData,
    () => props.overagesData,
    () => props.wasteData,
    () => props.trendLabels,
    () => props.distributionData,
    chartType,
    showGrossSales,
    showNetRevenue,
    showExpenses,
    showCredits,
    showCharges,
    showOverages,
    showWaste,
    () => $q.dark.isActive,
  ],
  () => {
    renderCharts();
  },
  { deep: true }
);

defineExpose({
  trendChartCanvas,
  donutChartCanvas,
});
</script>

<style lang="scss" scoped>
.chart-card {
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.05);
  height: 100%;
}

.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}

.donut-container {
  height: 320px; /* slightly taller to fit legend cleanly */
}

.metric-selector {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 2px 8px;
  font-weight: 600;
}
</style>
