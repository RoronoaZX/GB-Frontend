<template>
  <div class="row q-col-gutter-lg q-mt-md">
    <!-- Trend Line Chart -->
    <div class="col-12 col-md-8">
      <q-card class="chart-card" flat bordered>
        <q-card-section>
          <div class="text-h6 text-weight-bolder text-grey-8">{{ timeRangeDescription }} Sales Trend</div>
          <div class="text-caption text-grey-5">True Net revenue (Sales minus branch operating expenses) mapped over the selected timeline.</div>
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
          <div class="text-h6 text-weight-bolder text-grey-8">Revenue by Branch</div>
          <div class="text-caption text-grey-5">Top performing locations this month.</div>
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
import { ref, onMounted, watch } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const props = defineProps({
  trendData: {
    type: Array,
    default: () => []
  },
  trendLabels: {
    type: Array,
    default: () => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  timeRangeDescription: {
    type: String,
    default: 'Weekly'
  },
  distributionData: {
    type: Array,
    default: () => []
  }
});

const trendChartCanvas = ref(null);
const donutChartCanvas = ref(null);

let trendChartInstance = null;
let donutChartInstance = null;

const renderCharts = () => {
  // 1. Line Chart
  if (trendChartCanvas.value) {
    if (trendChartInstance) trendChartInstance.destroy();
    
    const ctx = trendChartCanvas.value.getContext("2d");
    
    // Add smooth gradient under the line
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(59, 130, 246, 0.5)");
    gradient.addColorStop(1, "rgba(59, 130, 246, 0.0)");

    trendChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: props.trendLabels,
        datasets: [
          {
            label: "Net Sales (₱)",
            data: props.trendData.length ? props.trendData : [0,0,0,0,0,0,0],
            borderColor: "#3b82f6",
            backgroundColor: gradient,
            borderWidth: 3,
            fill: true,
            tension: 0.4, // smooth curves
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#3b82f6",
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { borderDash: [5, 5], color: "#e2e8f0" }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

  // 2. Donut Chart
  if (donutChartCanvas.value) {
    if (donutChartInstance) donutChartInstance.destroy();
    
    const ctx = donutChartCanvas.value.getContext("2d");
    
    // Default to mock data if empty
    const labels = props.distributionData.length 
      ? props.distributionData.map(d => d.name)
      : ["Branch A", "Branch B", "Branch C"];
      
    const dataVals = props.distributionData.length 
      ? props.distributionData.map(d => d.sales)
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
              "#ef4444"
            ],
            borderWidth: 0,
            hoverOffset: 10
          }
        ]
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
              font: { family: "'Inter', sans-serif", weight: '500' }
            }
          }
        }
      }
    });
  }
};

onMounted(() => {
  renderCharts();
});

watch(() => props.trendData, () => {
  renderCharts();
}, { deep: true });
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
</style>
