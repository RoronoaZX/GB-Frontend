<template>
  <div class="q-gutter-md animate-fade">
    <!-- Loading Skeleton View -->
    <div v-if="dashboardStore.loading" class="q-gutter-md">
      <!-- Top Action Bar Skeleton -->
      <div class="row items-center justify-between q-pl-md q-pr-md q-mb-sm">
        <div>
          <q-skeleton type="text" width="280px" height="24px" />
        </div>
        <div>
          <q-skeleton type="rect" width="120px" height="36px" style="border-radius: 8px;" />
        </div>
      </div>

      <!-- KPI Cards Skeleton -->
      <div class="row q-col-gutter-lg q-pl-md">
        <div v-for="i in 5" :key="i" class="col-12 col-sm-6 col-md">
          <q-card class="kpi-card elegant-card" flat>
            <q-card-section class="q-pa-lg">
              <div class="row items-center no-wrap">
                <q-skeleton type="QAvatar" size="56px" class="rounded-borders" />
                <div class="q-ml-md" style="flex: 1">
                  <q-skeleton type="text" width="50%" height="12px" />
                  <q-skeleton type="text" width="80%" height="24px" class="q-mt-sm" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Performance Charts Skeleton -->
      <div class="row q-col-gutter-lg q-mt-md q-pl-md">
        <!-- Sales Trend -->
        <div class="col-12 col-md-8">
          <q-card class="chart-card elegant-card" flat bordered>
            <q-card-section class="row items-center justify-between">
              <div>
                <q-skeleton type="text" width="180px" height="20px" />
                <q-skeleton type="text" width="300px" height="12px" class="q-mt-xs" />
              </div>
              <div class="row q-gutter-sm">
                <q-skeleton type="rect" width="150px" height="24px" />
              </div>
            </q-card-section>
            <q-card-section>
              <q-skeleton type="rect" height="300px" />
            </q-card-section>
          </q-card>
        </div>

        <!-- Inventory Movement -->
        <div class="col-12 col-md-4">
          <q-card class="chart-card elegant-card" flat bordered>
            <q-card-section>
              <q-skeleton type="text" width="150px" height="20px" />
              <q-skeleton type="text" width="220px" height="12px" class="q-mt-xs" />
            </q-card-section>
            <q-card-section class="flex flex-center" style="height: 320px;">
              <q-skeleton type="circle" size="200px" />
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Widgets Skeleton -->
      <div class="row q-col-gutter-lg q-mt-md q-pl-md">
        <div class="col-12">
          <q-card class="elegant-card q-pa-md" flat bordered>
            <q-skeleton type="text" width="250px" height="20px" class="q-mb-md" />
            <q-skeleton type="rect" height="150px" />
          </q-card>
        </div>
      </div>
    </div>

    <!-- Actual Content View -->
    <div v-else class="q-gutter-md">
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

      <!-- Top Action Bar -->
      <div class="row items-center justify-between q-pl-md q-pr-md q-mb-sm">
        <div class="text-subtitle1 text-grey-6">
          Localized branch analytics and business intelligence
        </div>
        <div class="row items-center no-wrap">
          <q-btn
            unelevated
            outline
            color="primary"
            icon="print"
            label="Export PDF"
            class="q-mr-sm"
            @click="openPrintDialog"
            style="border-radius: 8px"
          />
        </div>
      </div>

      <!-- Key Performance Indicators -->
      <div class="row q-col-gutter-lg q-pl-md">
        <div v-for="card in kpiCards" :key="card.title" class="col-12 col-sm-6 col-md">
          <q-card class="kpi-card elegant-card" flat>
            <q-card-section class="q-pa-md">
              <div class="row items-center no-wrap">
                <div :class="['card-icon-wrapper', card.colorClass]">
                  <q-icon :name="card.icon" size="32px" />
                  
                </div>
                <div class="card-info q-ml-md" style="min-width: 0; flex: 1">
                  <div class="text-caption text-uppercase text-weight-bold text-grey-5 tracking-wide ellipsis">
                    {{ card.title }}
                  </div>
                  <div 
                    class="text-weight-bolder text-dark q-mt-xs ds-number ellipsis no-wrap"
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
      <div class="row q-col-gutter-lg q-mt-md q-pl-md">
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
                <q-btn
                  flat
                  round
                  dense
                  color="negative"
                  icon="picture_as_pdf"
                  @click="openPrintDialog"
                  class="q-ml-xs"
                >
                  <q-tooltip>Export PDF Report</q-tooltip>
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
      <div class="row q-col-gutter-lg q-mt-lg q-pl-md">
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
            <q-pa-none>
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
            </q-pa-none>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Activity History Dialog -->
    <BranchHistoryDialog ref="historyDialogRef" :branch-id="branchId" />

    <!-- PDF Print Dialog -->
    <q-dialog
      v-model="printDialog"
      maximized
      persistent
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <div class="q-pa-md" style="width: 100%">
        <q-card class="bg-dark column full-height">
          <q-card-section
            class="row justify-between items-center bg-primary text-white q-py-sm"
          >
            <div class="row items-center">
              <q-icon name="picture_as_pdf" size="sm" class="q-mr-sm" />
              <div class="text-h6">Branch Analytics Report - {{ branchName }}</div>
            </div>
            <div>
              <q-btn
                dense
                flat
                icon="download"
                class="q-mr-sm"
                @click="triggerDownload"
              >
                <q-tooltip>Download PDF</q-tooltip>
              </q-btn>
              <q-btn
                dense
                flat
                icon="print"
                class="q-mr-sm"
                @click="triggerPhysicalPrint"
              >
                <q-tooltip>Print Document</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip>Close</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-card-section class="col q-pa-none">
            <iframe
              :src="pdfUrl"
              width="100%"
              height="100%"
              style="border: none"
            />
          </q-card-section>
        </q-card>
      </div>
    </q-dialog>
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

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.default;

const printDialog = ref(false);
const pdfUrl = ref("");
let currentDocDefinition = null;

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
  if (len > 15) return "0.95rem";
  if (len > 12) return "1.1rem";
  if (len > 10) return "1.25rem";
  if (len > 8) return "1.4rem";
  if (len > 6) return "1.55rem";
  return "1.75rem";
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

const branchName = computed(() => {
  return dashboardStore.stats.branchesList.find(b => b.id == branchId.value)?.name || `Branch ${branchId.value}`;
});

const openPrintDialog = () => {
  let salesTrendImage = null;
  let stockMovementImage = null;

  if (salesChartCanvas.value) {
    salesTrendImage = salesChartCanvas.value.toDataURL("image/png");
  }
  if (inventoryChartCanvas.value) {
    stockMovementImage = inventoryChartCanvas.value.toDataURL("image/png");
  }

  currentDocDefinition = generateBranchDocDefinition({ salesTrendImage, stockMovementImage });
  pdfMake.createPdf(currentDocDefinition).getDataUrl((dataUrl) => {
    pdfUrl.value = dataUrl;
    printDialog.value = true;
  });
};

const triggerDownload = () => {
  if (currentDocDefinition) {
    const filename = `GB_Bakeshop_Report_${branchName.value.replace(/\s+/g, '_')}_${dayjs().format('YYYY-MM-DD')}.pdf`;
    pdfMake.createPdf(currentDocDefinition).download(filename);
  }
};

const triggerPhysicalPrint = () => {
  if (currentDocDefinition) {
    pdfMake.createPdf(currentDocDefinition).print();
  }
};

const generateBranchDocDefinition = ({ salesTrendImage, stockMovementImage } = {}) => {
  const formatMoney = (val) => {
    if (val === undefined || val === null) return "₱0.00";
    return `₱${Number(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const sortedMargins = [...(dashboardStore.profitMargins || [])].filter(
    (item) => item.production > 0 || item.total_sales_amount > 0
  );
  const topFive = [...sortedMargins].sort((a, b) => b.margin - a.margin).slice(0, 5);
  const bottomFive = [...sortedMargins].sort((a, b) => a.margin - b.margin).slice(0, 5);

  // Group profit margins by category
  const categoriesMap = {};
  (dashboardStore.profitMargins || []).forEach((m) => {
    const cat = m.category || "Uncategorized";
    if (!categoriesMap[cat]) {
      categoriesMap[cat] = [];
    }
    categoriesMap[cat].push(m);
  });

  const categorySegments = [];
  const categories = Object.keys(categoriesMap).sort();

  if (categories.length === 0) {
    categorySegments.push(
      { text: "Detailed Profit Margin Analysis Matrix", style: "sectionHeader" },
      {
        table: {
          headerRows: 1,
          widths: ["*", "10%", "10%", "12%", "12%", "15%", "11%", "10%", "10%"],
          body: [
            [
              { text: "Product Name", style: "tableHeader", alignment: "left", fillColor: "#1e293b" },
              { text: "Category", style: "tableHeader", alignment: "center", fillColor: "#1e293b" },
              { text: "Qty Produced", style: "tableHeader", alignment: "center", fillColor: "#1e293b" },
              { text: "Unit Cost", style: "tableHeader", alignment: "right", fillColor: "#1e293b" },
              { text: "Selling Price", style: "tableHeader", alignment: "right", fillColor: "#1e293b" },
              { text: "Total Cost", style: "tableHeader", alignment: "right", fillColor: "#1e293b" },
              { text: "Total Sales", style: "tableHeader", alignment: "right", fillColor: "#1e293b" },
              { text: "Margin", style: "tableHeader", alignment: "right", fillColor: "#1e293b" },
              { text: "Rating", style: "tableHeader", alignment: "center", fillColor: "#1e293b" }
            ],
            [{ text: "No profit margin calculations available.", colSpan: 9, style: "tableCell", alignment: "center" }, {}, {}, {}, {}, {}, {}, {}, {}]
          ]
        },
        layout: {
          fillColor: (rowIndex) => rowIndex === 0 ? "#1e293b" : (rowIndex % 2 === 0 ? "#f8fafc" : "#ffffff"),
          hLineWidth: (i, node) => i === 0 || i === 1 || i === node.table.body.length ? 1 : 0.5,
          vLineWidth: () => 0,
          hLineColor: () => "#e2e8f0"
        },
        margin: [0, 5, 0, 0]
      }
    );
  } else {
    categories.forEach((cat) => {
      const items = categoriesMap[cat];
      categorySegments.push(
        { 
          text: `Detailed Profit Margin Analysis Matrix - ${cat.toUpperCase()}`, 
          style: "sectionHeader", 
          pageBreak: "before",
          margin: [0, 0, 0, 5]
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "10%", "10%", "12%", "12%", "15%", "11%", "10%", "10%"],
            body: [
              [
                { text: "Product Name", style: "tableHeader", alignment: "left", fillColor: "#1e293b" },
                { text: "Category", style: "tableHeader", alignment: "center", fillColor: "#1e293b" },
                { text: "Qty Produced", style: "tableHeader", alignment: "center", fillColor: "#1e293b" },
                { text: "Unit Cost", style: "tableHeader", alignment: "right", fillColor: "#1e293b" },
                { text: "Selling Price", style: "tableHeader", alignment: "right", fillColor: "#1e293b" },
                { text: "Total Cost", style: "tableHeader", alignment: "right", fillColor: "#1e293b" },
                { text: "Total Sales", style: "tableHeader", alignment: "right", fillColor: "#1e293b" },
                { text: "Margin", style: "tableHeader", alignment: "right", fillColor: "#1e293b" },
                { text: "Rating", style: "tableHeader", alignment: "center", fillColor: "#1e293b" }
              ],
              ...items.map((m) => [
                { text: m.name, style: "tableCell", alignment: "left" },
                { text: m.category, style: "tableCell", alignment: "center" },
                { text: m.production.toString(), style: "tableCell", alignment: "center" },
                { text: formatMoney(m.unit_cost), style: "tableCellAmount" },
                { text: formatMoney(m.price), style: "tableCellAmount" },
                { text: formatMoney(m.cost), style: "tableCellAmount" },
                { text: formatMoney(m.total_sales_amount), style: "tableCellAmount" },
                { text: `${Math.round(m.margin)}%`, style: "tableCellAmount", bold: true, color: m.margin >= 40 ? "#16a34a" : (m.margin >= 20 ? "#ea580c" : "#dc2626") },
                { text: m.status.toUpperCase(), style: "tableCell", alignment: "center", bold: true, color: m.margin >= 40 ? "#16a34a" : (m.margin >= 20 ? "#ea580c" : "#dc2626") }
              ])
            ]
          },
          layout: {
            fillColor: (rowIndex) => rowIndex === 0 ? "#1e293b" : (rowIndex % 2 === 0 ? "#f8fafc" : "#ffffff"),
            hLineWidth: (i, node) => i === 0 || i === 1 || i === node.table.body.length ? 1 : 0.5,
            vLineWidth: () => 0,
            hLineColor: () => "#e2e8f0"
          },
          margin: [0, 5, 0, 15]
        }
      );
    });
  }

  const salesTableBody = [
    [
      { text: "Interval", style: "tableHeader", alignment: "left" },
      { text: "Gross (₱)", style: "tableHeader", alignment: "right" },
      { text: "Net (₱)", style: "tableHeader", alignment: "right" },
      { text: "Expenses (₱)", style: "tableHeader", alignment: "right" },
      { text: "Credits (₱)", style: "tableHeader", alignment: "right" },
      { text: "Shortage (₱)", style: "tableHeader", alignment: "right" },
      { text: "Overage (₱)", style: "tableHeader", alignment: "right" },
      { text: "Wastage (₱)", style: "tableHeader", alignment: "right" }
    ]
  ];

  let totalGross = 0;
  let totalNet = 0;
  let totalExpenses = 0;
  let totalCredits = 0;
  let totalCharges = 0;
  let totalOverages = 0;
  let totalWaste = 0;

  dashboardStore.chartLabels.forEach((label, index) => {
    const gross = dashboardStore.stats.totalGrossSalesData[index] || 0;
    const net = dashboardStore.stats.totalSalesData[index] || 0;
    const exp = dashboardStore.stats.totalExpensesData[index] || 0;
    const cred = dashboardStore.stats.totalCreditsData[index] || 0;
    const chg = dashboardStore.stats.totalChargesData[index] || 0;
    const ovr = dashboardStore.stats.totalOveragesData[index] || 0;
    const wst = dashboardStore.stats.totalWasteData[index] || 0;

    totalGross += gross;
    totalNet += net;
    totalExpenses += exp;
    totalCredits += cred;
    totalCharges += chg;
    totalOverages += ovr;
    totalWaste += wst;

    salesTableBody.push([
      { text: label, style: "tableCell", alignment: "left" },
      { text: `₱${gross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, style: "tableCellAmount" },
      { text: `₱${net.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, style: "tableCellAmount" },
      { text: `₱${exp.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, style: "tableCellAmount" },
      { text: `₱${cred.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, style: "tableCellAmount" },
      { text: `₱${chg.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, style: "tableCellAmount" },
      { text: `₱${ovr.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, style: "tableCellAmount" },
      { text: `₱${wst.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, style: "tableCellAmount" }
    ]);
  });

  salesTableBody.push([
    { text: "TOTALS", style: "tableTotalHeader", alignment: "left" },
    { text: `₱${totalGross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, style: "tableTotalCell", alignment: "right" },
    { text: `₱${totalNet.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, style: "tableTotalCell", alignment: "right" },
    { text: `₱${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, style: "tableTotalCell", alignment: "right" },
    { text: `₱${totalCredits.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, style: "tableTotalCell", alignment: "right" },
    { text: `₱${totalCharges.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, style: "tableTotalCell", alignment: "right" },
    { text: `₱${totalOverages.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, style: "tableTotalCell", alignment: "right" },
    { text: `₱${totalWaste.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, style: "tableTotalCell", alignment: "right" }
  ]);

  return {
    pageSize: "A4",
    pageOrientation: "landscape",
    pageMargins: [40, 40, 40, 40],
    content: [
      // ── Page 1: Branch Summary & Operations Table ──
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                fillColor: "#0f172a",
                stack: [
                  { text: "GB BAKESHOP BRANCH BUSINESS INTELLIGENCE REPORT", color: "#ffffff", fontSize: 15, bold: true, alignment: "center", margin: [0, 8, 0, 2] },
                  { text: `BRANCH: ${branchName.value.toUpperCase()} | TIME FRAME: ${timeRangeLabel.value.toUpperCase()}`, color: "#38bdf8", fontSize: 8, bold: true, alignment: "center", margin: [0, 0, 0, 8] }
                ],
                border: [false, false, false, false]
              }
            ]
          ]
        },
        margin: [0, -10, 0, 20]
      },
      { text: "Branch Key Performance Summary", style: "sectionHeader" },
      {
        columns: [
          {
            table: { widths: ["*"], body: [[{ fillColor: "#f8fafc", borderColor: "#cbd5e1", stack: [{ text: "GROSS SALES", fontSize: 7, color: "#64748b", bold: true }, { text: formatMoney(totalGross), fontSize: 14, bold: true, color: "#0f172a", margin: [0, 2, 0, 0] }] }]] },
            layout: "lightHorizontalLines"
          },
          {
            table: { widths: ["*"], body: [[{ fillColor: "#f8fafc", borderColor: "#cbd5e1", stack: [{ text: "NET REVENUE", fontSize: 7, color: "#64748b", bold: true }, { text: formatMoney(totalNet), fontSize: 14, bold: true, color: "#0f172a", margin: [0, 2, 0, 0] }] }]] },
            layout: "lightHorizontalLines"
          },
          {
            table: { widths: ["*"], body: [[{ fillColor: "#f8fafc", borderColor: "#cbd5e1", stack: [{ text: "AVG PRODUCTION COST", fontSize: 7, color: "#64748b", bold: true }, { text: formatMoney(dashboardStore.recipeCostMetrics.averageCost || 0), fontSize: 14, bold: true, color: "#0f172a", margin: [0, 2, 0, 0] }] }]] },
            layout: "lightHorizontalLines"
          },
          {
            table: { widths: ["*"], body: [[{ fillColor: "#fef2f2", borderColor: "#fee2e2", stack: [{ text: "LOW STOCK WARNINGS", fontSize: 7, color: "#ef4444", bold: true }, { text: (dashboardStore.stats.lowStockItems || 0).toString(), fontSize: 14, bold: true, color: "#b91c1c", margin: [0, 2, 0, 0] }] }]] },
            layout: "lightHorizontalLines"
          }
        ],
        columnGap: 10,
        margin: [0, 0, 0, 15]
      },
      { text: "Financial Performance Breakdown", style: "sectionHeader" },
      {
        table: { headerRows: 1, widths: [55, "*", "*", "*", "*", "*", "*", "*"], body: salesTableBody },
        layout: {
          fillColor: (rIndex) => rIndex === 0 ? "#1e293b" : (rIndex === salesTableBody.length - 1 ? "#f1f5f9" : (rIndex % 2 === 0 ? "#f8fafc" : "#ffffff")),
          hLineWidth: (i, node) => i === 0 || i === 1 || i === node.table.body.length - 1 || i === node.table.body.length ? 1.5 : 0.5,
          vLineWidth: () => 0,
          hLineColor: (i, node) => i === 0 || i === 1 || i === node.table.body.length - 1 || i === node.table.body.length ? "#cbd5e1" : "#e2e8f0"
        },
        margin: [0, 0, 0, 10]
      },

      // ── Page 2: Localized Charts Spread ──
      { text: "", pageBreak: "after" },
      {
        table: {
          widths: ["*"],
          body: [[{
            fillColor: "#0f172a",
            stack: [{ text: "VISUAL ANALYTICS — LOCAL TREND & MOVEMENTS", color: "#ffffff", fontSize: 13, bold: true, alignment: "center", margin: [0, 6, 0, 6] }],
            border: [false, false, false, false]
          }]]
        },
        margin: [0, -10, 0, 20]
      },
      {
        columns: [
          ...(salesTrendImage ? [{
            width: "60%",
            stack: [
              { text: "Sales Performance Trend Lines", style: "sectionHeader" },
              { image: salesTrendImage, fit: [420, 220], alignment: "center" }
            ]
          }] : []),
          ...(stockMovementImage ? [{
            width: "40%",
            stack: [
              { text: "Stock In vs Out Flow Ratio", style: "sectionHeader" },
              { image: stockMovementImage, fit: [260, 220], alignment: "center" }
            ]
          }] : [])
        ],
        columnGap: 20
      },

      // ── Page 3: Real-Time Waste & Spoilage Tracker ──
      { text: "", pageBreak: "after" },
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                fillColor: "#ef4444",
                stack: [
                  { text: "REAL-TIME WASTE & SPOILAGE TRACKER", color: "#ffffff", fontSize: 15, bold: true, alignment: "center", margin: [0, 8, 0, 2] },
                  { text: `FINANCIAL SPOILAGE ANALYSIS | LOCATION: ${branchName.value.toUpperCase()} | TIME FRAME: ${timeRangeLabel.value.toUpperCase()}`, color: "#fee2e2", fontSize: 8, bold: true, alignment: "center", margin: [0, 0, 0, 8] }
                ],
                border: [false, false, false, false]
              }
            ]
          ]
        },
        margin: [0, -10, 0, 20]
      },
      { text: "Spoilage Overview & Top Defect Rates", style: "sectionHeader" },
      {
        columns: [
          {
            width: "30%",
            stack: [
              {
                table: {
                  widths: ["*"],
                  body: [
                    [
                      {
                        fillColor: "#fef2f2",
                        borderColor: "#fee2e2",
                        stack: [
                          { text: "TOTAL LOST REVENUE", fontSize: 7, color: "#ef4444", bold: true },
                          { text: formatMoney(dashboardStore.wasteMetrics?.summary?.total_lost_revenue), fontSize: 18, bold: true, color: "#b91c1c", margin: [0, 2, 0, 0] }
                        ]
                      }
                    ],
                    [
                      {
                        fillColor: "#f8fafc",
                        borderColor: "#e2e8f0",
                        stack: [
                          { text: "TOTAL UNITS LOST", fontSize: 7, color: "#64748b", bold: true },
                          { text: `${dashboardStore.wasteMetrics?.summary?.total_units_lost || 0} PCS`, fontSize: 18, bold: true, color: "#0f172a", margin: [0, 2, 0, 0] }
                        ]
                      }
                    ]
                  ]
                },
                layout: "lightHorizontalLines"
              }
            ]
          },
          {
            width: "70%",
            stack: [
              { text: "Top Wasted Products (Quantified Loss)", style: "sectionHeader", margin: [20, 0, 0, 5] },
              {
                table: {
                  headerRows: 1,
                  widths: ["10%", "*", "25%", "25%"],
                  body: [
                    [
                      { text: "Rank", style: "tableHeader", alignment: "center", fillColor: "#b91c1c" },
                      { text: "Product Name", style: "tableHeader", alignment: "left", fillColor: "#b91c1c" },
                      { text: "Units Lost", style: "tableHeader", alignment: "right", fillColor: "#b91c1c" },
                      { text: "Lost Value", style: "tableHeader", alignment: "right", fillColor: "#b91c1c" }
                    ],
                    ...(dashboardStore.wasteMetrics?.top_wasted_products && dashboardStore.wasteMetrics.top_wasted_products.length > 0
                      ? dashboardStore.wasteMetrics.top_wasted_products.map((item, index) => [
                          { text: (index + 1).toString(), style: "tableCell", alignment: "center" },
                          { text: item.name, style: "tableCell", alignment: "left" },
                          { text: `${item.units} pcs`, style: "tableCell", alignment: "right" },
                          { text: formatMoney(item.lost_revenue), style: "tableCellAmount" }
                        ])
                      : [[{ text: "No waste records mapped.", colSpan: 4, style: "tableCell", alignment: "center" }, {}, {}, {}]]
                    )
                  ]
                },
                layout: {
                  fillColor: (rowIndex) => rowIndex === 0 ? "#b91c1c" : (rowIndex % 2 === 0 ? "#f8fafc" : "#ffffff"),
                  hLineWidth: (i, node) => i === 0 || i === 1 || i === node.table.body.length ? 1 : 0.5,
                  vLineWidth: () => 0,
                  hLineColor: () => "#e2e8f0"
                },
                margin: [20, 0, 0, 0]
              }
            ]
          }
        ],
        columnGap: 10,
        margin: [0, 0, 0, 20]
      },
      { text: "Reason Breakdown Analysis", style: "sectionHeader" },
      {
        table: {
          headerRows: 1,
          widths: ["*", "30%", "30%"],
          body: [
            [
              { text: "Reason / Category", style: "tableHeader", alignment: "left", fillColor: "#475569" },
              { text: "Frequency", style: "tableHeader", alignment: "right", fillColor: "#475569" },
              { text: "Total Lost Value", style: "tableHeader", alignment: "right", fillColor: "#475569" }
            ],
            ...(dashboardStore.wasteMetrics?.reason_breakdown && dashboardStore.wasteMetrics.reason_breakdown.length > 0
              ? dashboardStore.wasteMetrics.reason_breakdown.map((r) => [
                  { text: r.reason, style: "tableCell", alignment: "left" },
                  { text: (r.count || "-").toString(), style: "tableCell", alignment: "right" },
                  { text: formatMoney(r.lost_revenue), style: "tableCellAmount" }
                ])
              : [[{ text: "No breakdowns available.", colSpan: 3, style: "tableCell", alignment: "center" }, {}, {}]]
            )
          ]
        },
        layout: {
          fillColor: (rowIndex) => rowIndex === 0 ? "#475569" : (rowIndex % 2 === 0 ? "#f8fafc" : "#ffffff"),
          hLineWidth: (i, node) => i === 0 || i === 1 || i === node.table.body.length ? 1 : 0.5,
          vLineWidth: () => 0,
          hLineColor: () => "#e2e8f0"
        },
        margin: [0, 5, 0, 0]
      },

      // ── Page 4: Production Cost & Profitability Leaderboard ──
      { text: "", pageBreak: "after" },
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                fillColor: "#0284c7",
                stack: [
                  { text: "PRODUCTION COST & PROFITABILITY LEADERBOARD", color: "#ffffff", fontSize: 15, bold: true, alignment: "center", margin: [0, 8, 0, 2] },
                  { text: `RECIPE EXPENSES & PRODUCT PROFIT MARGIN RANKINGS | LOCATION: ${branchName.value.toUpperCase()}`, color: "#e0f2fe", fontSize: 8, bold: true, alignment: "center", margin: [0, 0, 0, 8] }
                ],
                border: [false, false, false, false]
              }
            ]
          ]
        },
        margin: [0, -10, 0, 20]
      },
      {
        columns: [
          {
            width: "35%",
            stack: [
              { text: "Recipe Runs Expense Summary", style: "sectionHeader" },
              {
                table: {
                  widths: ["*"],
                  body: [
                    [
                      {
                        fillColor: "#f0f9ff",
                        borderColor: "#bae6fd",
                        stack: [
                          { text: "AVERAGE PRODUCTION COST", fontSize: 7, color: "#0284c7", bold: true },
                          { text: formatMoney(dashboardStore.recipeCostMetrics?.averageCost || 0), fontSize: 18, bold: true, color: "#0369a1", margin: [0, 2, 0, 0] }
                        ]
                      }
                    ]
                  ]
                },
                layout: "lightHorizontalLines",
                margin: [0, 0, 0, 15]
              },
              { text: "Highest Cost Recipes", style: "sectionHeader", margin: [0, 0, 0, 5] },
              {
                table: {
                  headerRows: 1,
                  widths: ["*", "40%"],
                  body: [
                    [
                      { text: "Recipe Name", style: "tableHeader", alignment: "left", fillColor: "#0369a1" },
                      { text: "Avg Cost", style: "tableHeader", alignment: "right", fillColor: "#0369a1" }
                    ],
                    ...(dashboardStore.recipeCostMetrics?.topRecipes && dashboardStore.recipeCostMetrics.topRecipes.length > 0
                      ? dashboardStore.recipeCostMetrics.topRecipes.slice(0, 5).map((r) => [
                          { text: r.recipe_name, style: "tableCell", alignment: "left" },
                          { text: formatMoney(r.avg_cost), style: "tableCellAmount" }
                        ])
                      : [[{ text: "No recipe costs mapped.", colSpan: 2, style: "tableCell", alignment: "center" }, {}]]
                    )
                  ]
                },
                layout: {
                  fillColor: (rowIndex) => rowIndex === 0 ? "#0369a1" : (rowIndex % 2 === 0 ? "#f8fafc" : "#ffffff"),
                  hLineWidth: (i, node) => i === 0 || i === 1 || i === node.table.body.length ? 1 : 0.5,
                  vLineWidth: () => 0,
                  hLineColor: () => "#e2e8f0"
                }
              }
            ]
          },
          {
            width: "65%",
            stack: [
              { text: "Product Profitability Leaders (Top/Bottom)", style: "sectionHeader", margin: [20, 0, 0, 5] },
              {
                columns: [
                  {
                    width: "48%",
                    stack: [
                      { text: "Top 5 Most Profitable", fontSize: 8.5, bold: true, color: "#16a34a", margin: [0, 0, 0, 4] },
                      {
                        table: {
                          headerRows: 1,
                          widths: ["15%", "*", "30%"],
                          body: [
                            [
                              { text: "Rank", style: "tableHeader", alignment: "center", fillColor: "#16a34a" },
                              { text: "Product", style: "tableHeader", alignment: "left", fillColor: "#16a34a" },
                              { text: "Margin", style: "tableHeader", alignment: "right", fillColor: "#16a34a" }
                            ],
                            ...(topFive.length > 0
                              ? topFive.map((item, index) => [
                                  { text: (index + 1).toString(), style: "tableCell", alignment: "center" },
                                  { text: item.name, style: "tableCell", alignment: "left" },
                                  { text: `${Math.round(item.margin)}%`, style: "tableCellAmount", color: "#16a34a", bold: true }
                                ])
                              : [[{ text: "No data.", colSpan: 3, style: "tableCell", alignment: "center" }, {}, {}]]
                            )
                          ]
                        },
                        layout: {
                          fillColor: (rowIndex) => rowIndex === 0 ? "#16a34a" : (rowIndex % 2 === 0 ? "#f8fafc" : "#ffffff"),
                          hLineWidth: (i, node) => i === 0 || i === 1 || i === node.table.body.length ? 1 : 0.5,
                          vLineWidth: () => 0,
                          hLineColor: () => "#e2e8f0"
                        }
                      }
                    ]
                  },
                  {
                    width: "48%",
                    stack: [
                      { text: "Bottom 5 Least Profitable", fontSize: 8.5, bold: true, color: "#dc2626", margin: [0, 0, 0, 4] },
                      {
                        table: {
                          headerRows: 1,
                          widths: ["15%", "*", "30%"],
                          body: [
                            [
                              { text: "Rank", style: "tableHeader", alignment: "center", fillColor: "#dc2626" },
                              { text: "Product", style: "tableHeader", alignment: "left", fillColor: "#dc2626" },
                              { text: "Margin", style: "tableHeader", alignment: "right", fillColor: "#dc2626" }
                            ],
                            ...(bottomFive.length > 0
                              ? bottomFive.map((item, index) => [
                                  { text: (index + 1).toString(), style: "tableCell", alignment: "center" },
                                  { text: item.name, style: "tableCell", alignment: "left" },
                                  { text: `${Math.round(item.margin)}%`, style: "tableCellAmount", color: "#dc2626", bold: true }
                                ])
                              : [[{ text: "No data.", colSpan: 3, style: "tableCell", alignment: "center" }, {}, {}]]
                            )
                          ]
                        },
                        layout: {
                          fillColor: (rowIndex) => rowIndex === 0 ? "#dc2626" : (rowIndex % 2 === 0 ? "#f8fafc" : "#ffffff"),
                          hLineWidth: (i, node) => i === 0 || i === 1 || i === node.table.body.length ? 1 : 0.5,
                          vLineWidth: () => 0,
                          hLineColor: () => "#e2e8f0"
                        }
                      }
                    ],
                    margin: [10, 0, 0, 0]
                  }
                ],
                margin: [20, 0, 0, 0]
              }
            ]
          }
        ],
        columnGap: 10,
        margin: [0, 0, 0, 10]
      },

      // ── Page 5: Smart Predictions & Profit Margin Matrix ──
      { text: "", pageBreak: "after" },
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                fillColor: "#4f46e5",
                stack: [
                  { text: "INTELLIGENT PREDICTIONS & PROFIT MARGIN MATRIX", color: "#ffffff", fontSize: 15, bold: true, alignment: "center", margin: [0, 8, 0, 2] },
                  { text: `INVENTORY RUNOUT FORECASTS & DETAILED UNIT MARGINS | LOCATION: ${branchName.value.toUpperCase()}`, color: "#e0e7ff", fontSize: 8, bold: true, alignment: "center", margin: [0, 0, 0, 8] }
                ],
                border: [false, false, false, false]
              }
            ]
          ]
        },
        margin: [0, -10, 0, 20]
      },
      { text: "Smart Inventory Runout Predictions", style: "sectionHeader" },
      {
        table: {
          headerRows: 1,
          widths: ["*", "20%", "30%", "20%"],
          body: [
            [
              { text: "Raw Material / Item Name", style: "tableHeader", alignment: "left", fillColor: "#4f46e5" },
              { text: "Current Stock", style: "tableHeader", alignment: "center", fillColor: "#4f46e5" },
              { text: "Days Remaining", style: "tableHeader", alignment: "center", fillColor: "#4f46e5" },
              { text: "Status Level", style: "tableHeader", alignment: "center", fillColor: "#4f46e5" }
            ],
            ...(dashboardStore.predictiveStocking && dashboardStore.predictiveStocking.length > 0
              ? dashboardStore.predictiveStocking.map((p) => [
                  { text: p.name, style: "tableCell", alignment: "left" },
                  { text: `${p.current_stock} ${p.unit || ''}`, style: "tableCell", alignment: "center" },
                  { text: `${p.days_remaining} days`, style: "tableCell", alignment: "center" },
                  { text: p.status.toUpperCase(), style: "tableCell", alignment: "center", bold: true, color: p.status === "critical" ? "#ef4444" : "#f59e0b" }
                ])
              : [[{ text: "No stock alerts or runout predictions mapped.", colSpan: 4, style: "tableCell", alignment: "center" }, {}, {}, {}]]
            )
          ]
        },
        layout: {
          fillColor: (rowIndex) => rowIndex === 0 ? "#4f46e5" : (rowIndex % 2 === 0 ? "#f8fafc" : "#ffffff"),
          hLineWidth: (i, node) => i === 0 || i === 1 || i === node.table.body.length ? 1 : 0.5,
          vLineWidth: () => 0,
          hLineColor: () => "#e2e8f0"
        },
        margin: [0, 5, 0, 15]
      },
      ...categorySegments
    ],
    footer: function(currentPage, pageCount) {
      return {
        columns: [
          { text: `Report generated for ${branchName.value} | System Analytics`, style: "footerText", alignment: "left", margin: [40, 0, 0, 0] },
          { text: `Page ${currentPage.toString()} of ${pageCount.toString()}`, style: "footerText", alignment: "right", margin: [0, 0, 40, 0] }
        ]
      };
    },
    styles: {
      sectionHeader: { fontSize: 10, bold: true, color: "#0f172a", margin: [0, 0, 0, 5] },
      tableHeader: { bold: true, fontSize: 7.5, color: "#ffffff", margin: [0, 2, 0, 2] },
      tableCell: { fontSize: 7.5, color: "#334155", margin: [0, 1.5, 0, 1.5] },
      tableCellAmount: { fontSize: 7.5, color: "#334155", alignment: "right", margin: [0, 1.5, 0, 1.5] },
      tableTotalHeader: { bold: true, fontSize: 7.5, color: "#0f172a", margin: [0, 2, 0, 2] },
      tableTotalCell: { bold: true, fontSize: 7.5, color: "#0f172a", alignment: "right", margin: [0, 2, 0, 2] },
      footerText: { fontSize: 7, color: "#64748b", italics: true }
    },
    defaultStyle: { font: "Roboto" }
  };
};

onMounted(async () => {
  await dashboardStore.setBranch(branchId.value);
  // Verify if current view contains no data
  const hasData = dashboardStore.stats.totalSalesData.some(v => v > 0);
  if (!hasData) {
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
