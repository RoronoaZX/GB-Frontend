<template>
  <div class="row q-col-gutter-md q-mt-md">
    <!-- Chart Section -->
    <div class="col-12 col-md-8">
      <q-card flat bordered class="rounded-borders lush-card full-height">
        <q-card-section>
          <div class="text-h6 text-grey-9 text-weight-bold">Inventory Activity (<span class="text-primary">{{ timeRangeDescription }}</span>)</div>
          <div class="text-caption text-grey-6">Track of raw materials (Volume IN vs OUT)</div>
        </q-card-section>
        
        <q-card-section class="q-pt-none" style="position: relative; height: 340px;">
          <canvas ref="inventoryChartCanvas"></canvas>
        </q-card-section>
      </q-card>
    </div>

    <!-- Stock Ledger Section -->
    <div class="col-12 col-md-4">
      <q-card flat bordered class="rounded-borders lush-card full-height">
        <q-card-section>
          <div class="text-h6 text-grey-9 text-weight-bold">Current Stock Ledger</div>
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
            <template v-slot:body-cell-total_quantity="props">
              <q-td :props="props" :class="props.row.total_quantity < 50 ? 'text-negative text-weight-bold' : 'text-weight-medium text-grey-8'">
                {{ formatNumber(props.row.total_quantity) }} <span class="text-caption text-grey-5">{{ props.row.unit }}</span>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps({
  inventoryLabels: { type: Array, required: true },
  inventoryInData: { type: Array, required: true },
  inventoryOutData: { type: Array, required: true },
  inventoryBalances: { type: Array, required: true },
  timeRangeDescription: { type: String, default: 'Weekly' }
});

const columns = [
  { name: 'name', required: true, label: 'Ingredient', align: 'left', field: 'name', sortable: true },
  { name: 'total_quantity', label: 'Balance', align: 'right', field: 'total_quantity', sortable: true }
];

function formatNumber(num) {
  return Number(num).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

const inventoryChartCanvas = ref(null);
let chartInstance = null;

const renderChart = () => {
  if (inventoryChartCanvas.value) {
    if (chartInstance) chartInstance.destroy();

    const ctx = inventoryChartCanvas.value.getContext("2d");

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: props.inventoryLabels,
        datasets: [
          {
            type: 'bar',
            label: 'Deliveries IN (Grams)',
            backgroundColor: 'rgba(74, 222, 128, 0.85)',
            borderColor: '#22c55e',
            borderWidth: 1,
            borderRadius: 4,
            data: props.inventoryInData,
          },
          {
            type: 'line',
            label: 'Usage OUT (Grams)',
            backgroundColor: 'rgba(244, 63, 94, 0.15)',
            borderColor: '#f43f5e',
            borderWidth: 3,
            pointBackgroundColor: '#f43f5e',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: true,
            data: props.inventoryOutData,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              usePointStyle: true,
              boxWidth: 8,
              font: { family: 'Inter, sans-serif', size: 12, weight: 500 }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            titleFont: { family: 'Inter, sans-serif', size: 13, weight: 600 },
            bodyFont: { family: 'Inter, sans-serif', size: 13 },
            padding: 12,
            cornerRadius: 8,
            displayColors: true,
            boxPadding: 6
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: '#f1f5f9',
              drawBorder: false,
            },
            ticks: {
              color: '#64748b',
              font: { family: 'Inter, sans-serif' }
            }
          },
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              color: '#64748b',
              font: { family: 'Inter, sans-serif' }
            }
          }
        }
      }
    });
  }
};

onMounted(() => {
  renderChart();
});

watch(() => props.inventoryLabels, () => {
  renderChart();
}, { deep: true });
</script>

<style scoped>
.rounded-borders {
  border-radius: 16px;
}
.lush-card {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(226, 232, 240, 0.8);
  background: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.lush-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
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
