<template>
  <div class="row q-col-gutter-lg q-mt-md">
    <!-- Sales Trend Chart -->
    <div class="col-12 col-md-8">
      <q-card class="chart-card" flat bordered>
        <q-card-section>
          <div class="row items-center justify-between">
            <div>
              <div class="text-h6 text-weight-bolder text-grey-8">
                {{ timeRangeDescription }} Sales Analytics
              </div>
              <div class="text-caption text-grey-5">
                Visualizing net revenue trends over the selected period.
              </div>
            </div>
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

Chart.register(...registerables);

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

const renderCharts = () => {
  // 1. Sales Trend Chart
  if (trendChartCanvas.value) {
    if (trendChartInstance) trendChartInstance.destroy();

    const ctx = trendChartCanvas.value.getContext("2d");
    const activeData = props.trendData;
    const primaryColor = "#3b82f6"; // Blue for Net Sales

    // Add smooth gradient under the line
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, `${primaryColor}80`); // 50% opacity
    gradient.addColorStop(1, `${primaryColor}00`); // 0% opacity

    // Chart.js uses 'pie' or 'doughnut'
    const type = chartType.value === "pie" ? "pie" : chartType.value;

    trendChartInstance = new Chart(ctx, {
      type: type,
      data: {
        labels: props.trendLabels,
        datasets: [
          {
            label: `Net Profit (₱)`,
            data: activeData.length ? activeData : [0, 0, 0, 0, 0, 0, 0],
            borderColor: primaryColor,
            backgroundColor: chartType.value === "line" 
              ? gradient 
              : (chartType.value === 'pie' 
                  ? ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4", "#f43f5e"] 
                  : primaryColor),
            borderWidth: chartType.value === 'pie' ? 1 : 3,
            fill: chartType.value === "line",
            tension: 0.4, // smooth curves
            borderRadius: chartType.value === 'bar' ? 8 : 0,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: primaryColor,
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
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
            grid: { borderDash: [5, 5], color: "#e2e8f0" },
            ticks: {
              callback: (value) => `₱${value.toLocaleString()}`,
            },
          },
          x: {
            display: chartType.value !== 'pie',
            grid: { display: false },
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

onMounted(() => {
  renderCharts();
});

watch(
  [
    () => props.trendData,
    () => props.grossSalesData,
    () => props.expensesData,
    () => props.trendLabels,
    chartType,
  ],
  () => {
    renderCharts();
  },
  { deep: true }
);
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
