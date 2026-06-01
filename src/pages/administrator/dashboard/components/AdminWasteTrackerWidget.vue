<template>
  <q-card class="waste-tracker-card flat bordered q-mb-lg" flat bordered>
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div>
          <div class="text-h6 text-weight-bolder text-grey-8 row items-center">
            <q-icon name="delete_sweep" color="negative" size="sm" class="q-mr-sm" />
            Real-Time Waste & Spoilage Tracker
          </div>
          <div class="text-caption text-grey-5">
            Quantifying the financial impact (₱) of unsold items and unrecoverable spoilage.
          </div>
        </div>
        <q-badge color="red-1" text-color="negative" class="q-py-xs q-px-sm text-weight-bold" style="border-radius: 8px;">
          FEAT-06 Active
        </q-badge>
      </div>
    </q-card-section>

    <!-- Loading state -->
    <q-card-section v-if="loading" class="flex flex-center" style="min-height: 280px;">
      <q-spinner-dots color="negative" size="3em" />
    </q-card-section>

    <!-- Empty/No Data state -->
    <q-card-section v-else-if="!hasData" class="flex flex-center text-grey-5 text-weight-bold" style="min-height: 280px;">
      <div class="text-center">
        <q-icon name="assignment_turned_in" size="xl" class="q-mb-sm text-grey-4" />
        <div>No spoilage logged during this period.</div>
      </div>
    </q-card-section>

    <!-- Main Content -->
    <q-card-section v-else class="q-pt-md">
      <div class="row q-col-gutter-lg">
        <!-- Metrics (KPIs) -->
        <div class="col-12 col-md-3 column justify-between">
          <div class="kpi-box text-center q-pa-md full-width q-mb-md">
            <div class="text-caption text-weight-bolder text-grey-5 uppercase tracking-wide">
              Total Lost Revenue
            </div>
            <div class="text-h3 text-weight-bolder text-negative q-my-xs">
              ₱{{ formatAmount(metrics.summary?.total_lost_revenue) }}
            </div>
            <q-badge color="negative" text-color="white" class="q-py-xs q-px-sm text-weight-bold" style="border-radius: 4px;">
              Financial Spoilage
            </q-badge>
          </div>

          <div class="kpi-box text-center q-pa-md full-width bg-grey-1">
            <div class="text-caption text-weight-bolder text-grey-5 uppercase tracking-wide">
              Total Units Wasted
            </div>
            <div class="text-h3 text-weight-bolder text-grey-8 q-my-xs">
              {{ metrics.summary?.total_units_lost }}
            </div>
            <div class="text-caption text-grey-5 text-weight-bold">
              Pieces Expired / Deformed
            </div>
          </div>
        </div>

        <!-- Trend Line Chart -->
        <div class="col-12 col-md-5">
          <div class="text-subtitle2 text-weight-bolder text-grey-7 q-mb-xs">Daily Spoilage Trend (₱)</div>
          <div class="chart-wrapper">
            <canvas ref="trendCanvas"></canvas>
          </div>
        </div>

        <!-- Top Wasted & Reasons -->
        <div class="col-12 col-md-4">
          <div class="text-subtitle2 text-weight-bolder text-grey-7 q-mb-xs">Top Wasted Products</div>
          <q-list separator dense class="top-wasted-list bg-grey-1 rounded-borders q-pa-xs">
            <q-item v-for="(item, index) in metrics.top_wasted_products" :key="item.name" class="q-py-sm">
              <q-item-section avatar class="min-width-auto q-pr-sm">
                <q-avatar size="24px" color="red-1" text-color="negative" class="text-weight-bold text-caption">
                  {{ index + 1 }}
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <div class="text-weight-bold text-capitalize text-grey-8">{{ item.name }}</div>
                <div class="text-caption text-grey-5">{{ item.units }} units lost</div>
              </q-item-section>
              <q-item-section side>
                <div class="text-weight-bolder text-negative">₱{{ formatAmount(item.lost_revenue) }}</div>
              </q-item-section>
            </q-item>
            <q-item v-if="!metrics.top_wasted_products?.length" class="text-center text-grey-5 q-py-md">
              No product rankings available.
            </q-item>
          </q-list>

          <div class="q-mt-sm" v-if="metrics.reason_breakdown?.length">
            <div class="text-subtitle2 text-weight-bolder text-grey-7 q-mb-xs">Reasons Breakdown</div>
            <div class="row q-gutter-xs">
              <q-badge
                v-for="r in metrics.reason_breakdown"
                :key="r.reason"
                color="red-1"
                text-color="negative"
                class="q-py-xs q-px-sm text-weight-bold"
                style="border-radius: 4px;"
              >
                <span class="text-capitalize text-grey-7 q-mr-xs">{{ r.reason }}:</span>
                ₱{{ formatAmount(r.lost_revenue) }}
              </q-badge>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const props = defineProps({
  metrics: {
    type: Object,
    default: () => null
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const trendCanvas = ref(null);
let trendChartInstance = null;

const hasData = computed(() => {
  return props.metrics && 
         props.metrics.summary && 
         props.metrics.summary.total_lost_revenue > 0;
});

const formatAmount = (val) => {
  if (val === undefined || val === null) return "0.00";
  return Number(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const renderChart = () => {
  if (!trendCanvas.value) return;
  if (trendChartInstance) trendChartInstance.destroy();

  const ctx = trendCanvas.value.getContext("2d");
  const labels = props.metrics?.trend?.labels || [];
  const dataVals = props.metrics?.trend?.data || [];

  const negativeColor = "#ef4444"; // Sleek Red/Negative theme for waste

  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, `${negativeColor}40`); // 25% opacity
  gradient.addColorStop(1, `${negativeColor}00`); // 0% opacity

  trendChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels.length ? labels : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Lost Spoilage Value (₱)",
          data: dataVals.length ? dataVals : [0, 0, 0, 0, 0, 0, 0],
          borderColor: negativeColor,
          backgroundColor: gradient,
          borderWidth: 3,
          fill: true,
          tension: 0.35,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: negativeColor,
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#1e293b",
          padding: 12,
          titleFont: { size: 13, weight: "bold" },
          bodyFont: { size: 12 },
          callbacks: {
            label: (context) => ` ₱${context.parsed.y.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { borderDash: [5, 5], color: "#e2e8f0" },
          ticks: {
            callback: (val) => `₱${Number(val).toLocaleString()}`,
            font: { size: 10 }
          }
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 10 } }
        }
      }
    }
  });
};

onMounted(() => {
  if (hasData.value) {
    renderChart();
  }
});

watch(
  [() => props.metrics, () => props.loading],
  () => {
    if (hasData.value) {
      // Small timeout to guarantee DOM update and canvas reference binding
      setTimeout(renderChart, 50);
    }
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.waste-tracker-card {
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.05);
}

.kpi-box {
  background: #fff5f5;
  border: 1px solid rgba(239, 68, 68, 0.1);
  border-radius: 16px;
  height: 47%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 110px;
}

.bg-grey-1 {
  background: #f8fafc !important;
  border: 1px solid #e2e8f0;
}

.chart-wrapper {
  position: relative;
  height: 220px;
  width: 100%;
}

.top-wasted-list {
  border: 1px solid #e2e8f0;
  max-height: 175px;
  overflow-y: auto;
}

.min-width-auto {
  min-width: unset;
}
</style>
