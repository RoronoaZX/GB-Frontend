<template>
  <div class="row q-col-gutter-md q-mt-md">
    <!-- Chart Section -->
    <div class="col-12 col-md-8">
      <q-card flat bordered class="rounded-borders lush-card full-height">
        <q-card-section>
          <div class="row items-center justify-between">
            <div>
              <div class="text-h6 text-grey-9 text-weight-bold">
                Inventory Activity (<span class="text-primary">{{
                  timeRangeDescription
                }}</span
                >)
              </div>
              <div class="text-caption text-grey-6">
                Track of raw materials (volume IN vs OUT)
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

        <q-card-section
          class="q-pt-none"
          style="position: relative; height: 340px"
        >
          <canvas ref="inventoryChartCanvas"></canvas>
        </q-card-section>
      </q-card>
    </div>

    <!-- Stock Ledger Section -->
    <div class="col-12 col-md-4">
      <q-card flat bordered class="rounded-borders lush-card full-height">
        <q-card-section>
          <div class="text-h6 text-grey-9 text-weight-bold">
            Current Stock Ledger
          </div>
          <div class="text-caption text-grey-6">Real-time asset balances</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-table
            flat
            virtual-scroll
            style="height: 340px"
            :rows="inventoryBalances"
            :columns="columns"
            row-key="raw_material_id"
            :pagination="{ rowsPerPage: 0 }"
            hide-bottom
            class="custom-table"
          >
            <template v-slot:body-cell-name="props">
              <q-td :props="props">
                <div class="text-weight-bold text-dark cursor-pointer">
                  {{ props.row.name }}
                  <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 10]" class="bg-dark q-pa-none" style="border-radius: 12px; min-width: 150px">
                    <div class="q-pa-sm">
                      <div class="text-caption text-grey-4 text-uppercase text-weight-bold q-mb-xs tracking-widest">7-DAY USAGE TREND</div>
                      <div class="row items-center justify-between q-mb-sm">
                        <div class="text-h6 text-white">{{ props.row.usage_trend?.reduce((a,b)=>a+b, 0).toLocaleString() }}</div>
                        <div class="text-caption text-grey-5">{{ props.row.unit }} used</div>
                      </div>
                      <!-- Sparkline SVG -->
                      <svg width="100%" height="40" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <polyline
                          fill="none"
                          stroke="#4ade80"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          :points="generateSparklinePoints(props.row.usage_trend)"
                        />
                      </svg>
                    </div>
                  </q-tooltip>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-total_quantity="props">
              <q-td
                :props="props"
                :class="
                  props.row.total_quantity < 50
                    ? 'text-negative text-weight-bold'
                    : 'text-weight-medium text-grey-8'
                "
              >
                {{ displayQuantity(props.row).val }}
                <span class="text-caption text-grey-5">{{
                  displayQuantity(props.row).unit
                }}</span>
              </q-td>
            </template>
          </q-table>
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
  inventoryLabels: { type: Array, required: true },
  inventoryInData: { type: Array, required: true },
  inventoryOutData: { type: Array, required: true },
  inventoryBalances: { type: Array, required: true },
  timeRangeDescription: { type: String, default: "Weekly" },
});

const columns = [
  {
    name: "name",
    required: true,
    label: "Ingredient",
    align: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "total_quantity",
    label: "Balance",
    align: "right",
    field: "total_quantity",
    sortable: true,
  },
];

function formatNumber(num) {
  return Number(num).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

function displayQuantity(row) {
  const qty = Number(row.total_quantity);
  const unit = row.unit?.toLowerCase() || "";

  if ((unit === "grams" || unit === "gram" || unit === "g") && qty >= 1000) {
    return {
      val: (qty / 1000).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }),
      unit: "kg",
    };
  }

  if (
    (unit === "milliliters" || unit === "ml" || unit === "milliliter") &&
    qty >= 1000
  ) {
    return {
      val: (qty / 1000).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }),
      unit: "L",
    };
  }

  return { val: formatNumber(qty), unit: row.unit };
}

function generateSparklinePoints(trend) {
  if (!trend || trend.length === 0) return "0,40 100,40";
  
  const max = Math.max(...trend, 1); // Avoid division by zero
  const height = 40;
  const width = 100;
  
  return trend.map((val, i) => {
    const x = (i / (trend.length - 1)) * width;
    const y = height - (val / max) * height;
    return `${x},${y}`;
  }).join(" ");
}

const inventoryChartCanvas = ref(null);
let chartInstance = null;
const chartType = ref("bar");

const renderChart = () => {
  if (inventoryChartCanvas.value) {
    if (chartInstance) chartInstance.destroy();

    const ctx = inventoryChartCanvas.value.getContext("2d");
    const isPie = chartType.value === "pie";

    let chartData = {
      labels: props.inventoryLabels,
      datasets: [
        {
          label: "Deliveries IN (Grams)",
          backgroundColor: isPie ? "#22c55e" : "rgba(74, 222, 128, 0.85)",
          borderColor: "#22c55e",
          borderWidth: isPie ? 1 : (chartType.value === "line" ? 3 : 1),
          borderRadius: chartType.value === "bar" ? 4 : 0,
          data: props.inventoryInData,
          fill: chartType.value === "line",
          tension: 0.4,
        },
        {
          label: "Usage OUT (Grams)",
          backgroundColor: isPie ? "#f43f5e" : "rgba(244, 63, 94, 0.15)",
          borderColor: "#f43f5e",
          borderWidth: isPie ? 1 : 3,
          pointBackgroundColor: "#f43f5e",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: chartType.value === "line" ? 5 : 0,
          fill: chartType.value === "line",
          data: props.inventoryOutData,
          tension: 0.4,
        },
      ],
    };

    if (isPie) {
      chartData = {
        labels: ["Total Deliveries IN", "Total Usage OUT"],
        datasets: [
          {
            data: [
              props.inventoryInData.reduce((a, b) => a + b, 0),
              props.inventoryOutData.reduce((a, b) => a + b, 0),
            ],
            backgroundColor: ["#22c55e", "#f43f5e"],
            hoverOffset: 10,
          },
        ],
      };
    }

    chartInstance = new Chart(ctx, {
      type:
        chartType.value === "line"
          ? "line"
          : chartType.value === "pie"
          ? "pie"
          : "bar",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: isPie ? "point" : "index",
          intersect: isPie,
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
            align: "end",
            labels: {
              usePointStyle: true,
              boxWidth: 8,
              font: { family: "Inter, sans-serif", size: 12, weight: 500 },
            },
          },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            padding: 12,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function (context) {
                const label = context.dataset.label || context.label || "";
                const value =
                  context.parsed.y !== undefined
                    ? context.parsed.y
                    : context.parsed;
                return `${label}: ${value.toLocaleString()}g`;
              },
            },
          },
        },
        scales: {
          y: {
            display: !isPie,
            beginAtZero: true,
            grid: { color: "#f1f5f9", drawBorder: false },
            ticks: {
              color: "#64748b",
              callback: (value) => `${(value / 1000).toLocaleString()}kg`,
            },
          },
          x: {
            display: !isPie,
            grid: { display: false, drawBorder: false },
            ticks: { color: "#64748b" },
          },
        },
      },
    });
  }
};

onMounted(() => {
  renderChart();
});

watch(
  [() => props.inventoryLabels, chartType],
  () => {
    renderChart();
  },
  { deep: true }
);
</script>

<style scoped>
.rounded-borders {
  border-radius: 16px;
}
.lush-card {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(226, 232, 240, 0.8);
  background: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.lush-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08),
    0 4px 6px -4px rgba(0, 0, 0, 0.05);
}

.custom-table {
  /* Subtle styling for the table rows */
}
.custom-table :deep(.q-table th) {
  font-weight: 600;
  color: #475569;
  font-size: 13px;
  background-color: #f8fafc;
}
.custom-table :deep(.q-table tbody td) {
  font-size: 14px;
}
</style>
