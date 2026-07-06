<template>
  <q-page class="admin-dashboard-page bg-grey-1">
    <!-- Premium Header -->
    <div class="dashboard-header q-mb-lg">
      <div class="row items-center justify-between">
        <div>
          <div class="text-h4 text-weight-bolder text-dark q-mb-xs">
            Admin Dashboard
            <span
              v-if="dashboardStore.selectedBranch !== 'global'"
              class="text-primary text-h5 q-ml-sm"
              >-
              {{
                String(dashboardStore.selectedBranch).startsWith("warehouse-")
                  ? dashboardStore.stats.warehousesList?.find(
                      (w) => `warehouse-${w.id}` === dashboardStore.selectedBranch
                    )?.name
                  : dashboardStore.stats.branchesList.find(
                      (b) => b.id === dashboardStore.selectedBranch
                    )?.name
              }}</span
            >
          </div>
          <div class="text-subtitle1 text-grey-6">
            <span v-if="dashboardStore.selectedBranch === 'global'"
              >System overview and business intelligence</span
            >
            <span v-else>Localized branch analytics and intelligence</span>
          </div>
        </div>
        <div class="header-actions row items-center no-wrap">
          <q-select
            v-model="dashboardStore.selectedBranch"
            :options="[
              { label: 'Network Global', value: 'global' },
              {
                group: 'Branches',
                disable: true,
                label: '--- Branches ---',
              },
              ...dashboardStore.stats.branchesList.map((b) => ({
                label: b.name,
                value: b.id,
              })),
              {
                group: 'Warehouses',
                disable: true,
                label: '--- Warehouses ---',
              },
              ...(dashboardStore.stats.warehousesList || []).map((w) => ({
                label: w.name,
                value: `warehouse-${w.id}`,
              })),
            ]"
            emit-value
            map-options
            dense
            outlined
            bg-color="white"
            class="q-mr-sm"
            style="min-width: 220px; border-radius: 8px"
            @update:model-value="(val) => dashboardStore.setBranch(val)"
          />

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

          <q-btn
            unelevated
            color="primary"
            icon="sync"
            label="Refresh"
            :loading="dashboardStore.loading"
            @click="dashboardStore.fetchDashboardMetrics()"
            class="refresh-btn"
          />
        </div>
      </div>
    </div>

    <!-- Error State -->
    <q-banner
      v-if="dashboardStore.error"
      class="bg-negative text-white q-mb-md rounded-borders"
    >
      <template v-slot:avatar>
        <q-icon name="error" color="white" />
      </template>
      {{ dashboardStore.error }}
    </q-banner>

    <!-- Premium Skeletal Loading View -->
    <div v-if="dashboardStore.loading" class="q-gutter-md animate-fade">
      <!-- KPI Cards Skeletons -->
      <div class="row q-col-gutter-lg">
        <!-- 3 big cards -->
        <div class="col-12 col-sm-6 col-lg-4" v-for="n in 3" :key="'big-kpi-' + n">
          <q-card class="q-pa-lg" flat bordered style="border-radius: 24px; min-height: 106px;">
            <div class="row items-center no-wrap">
              <q-skeleton type="QAvatar" size="64px" class="rounded-borders" style="border-radius: 20px;" />
              <div class="q-ml-md" style="flex: 1">
                <q-skeleton type="text" width="60%" height="12px" />
                <q-skeleton type="text" width="80%" height="28px" class="q-mt-sm" />
              </div>
            </div>
          </q-card>
        </div>
        <!-- 4 small cards -->
        <div class="col-12 col-sm-6 col-lg-3" v-for="n in 4" :key="'small-kpi-' + n">
          <q-card class="q-pa-lg" flat bordered style="border-radius: 24px; min-height: 106px;">
            <div class="row items-center no-wrap">
              <q-skeleton type="QAvatar" size="64px" class="rounded-borders" style="border-radius: 20px;" />
              <div class="q-ml-md" style="flex: 1">
                <q-skeleton type="text" width="50%" height="12px" />
                <q-skeleton type="text" width="70%" height="24px" class="q-mt-sm" />
              </div>
            </div>
          </q-card>
        </div>
      </div>

      <!-- Charts Skeletons -->
      <div class="row q-col-gutter-lg q-mt-md">
        <!-- Sales Trend skeleton -->
        <div class="col-12 col-md-8">
          <q-card flat bordered style="border-radius: 24px;">
            <q-card-section>
              <q-skeleton type="text" width="40%" height="20px" />
              <q-skeleton type="text" width="60%" height="12px" class="q-mt-sm" />
            </q-card-section>
            <q-card-section>
              <q-skeleton type="rect" height="300px" style="border-radius: 12px;" />
            </q-card-section>
          </q-card>
        </div>
        <!-- Donut Distribution skeleton -->
        <div class="col-12 col-md-4">
          <q-card flat bordered style="border-radius: 24px;">
            <q-card-section>
              <q-skeleton type="text" width="60%" height="20px" />
              <q-skeleton type="text" width="80%" height="12px" class="q-mt-sm" />
            </q-card-section>
            <q-card-section class="flex flex-center" style="height: 320px;">
              <q-skeleton type="circle" size="220px" />
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Lower widgets skeleton -->
      <div class="row q-col-gutter-lg q-mt-md">
        <!-- Waste Tracker Skeleton -->
        <div class="col-12">
          <q-card flat bordered style="border-radius: 24px;">
            <q-card-section>
              <q-skeleton type="text" width="20%" height="24px" />
              <q-skeleton type="text" width="40%" height="12px" class="q-mt-sm" />
              <div class="row q-col-gutter-md q-mt-md">
                <div class="col-12 col-md-3" v-for="w in 4" :key="'waste-' + w">
                  <q-card flat class="bg-grey-1 q-pa-md" style="border-radius: 16px;">
                    <q-skeleton type="text" width="60%" />
                    <q-skeleton type="text" width="80%" height="24px" class="q-mt-sm" />
                  </q-card>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Recipe Cost & Profit Leaderboard Row Skeleton -->
        <div class="col-12 col-md-6 q-mt-md">
          <q-card flat bordered style="border-radius: 24px; min-height: 280px;">
            <q-card-section>
              <q-skeleton type="text" width="40%" height="24px" />
              <q-skeleton type="text" width="60%" height="12px" class="q-mt-sm" />
              <q-list class="q-mt-md">
                <q-item v-for="n in 3" :key="'recipe-' + n" class="q-px-none">
                  <q-item-section avatar><q-skeleton type="QAvatar" size="40px" style="border-radius: 8px;" /></q-item-section>
                  <q-item-section>
                    <q-skeleton type="text" width="70%" />
                    <q-skeleton type="text" width="40%" class="q-mt-xs" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-6 q-mt-md">
          <q-card flat bordered style="border-radius: 24px; min-height: 280px;">
            <q-card-section>
              <q-skeleton type="text" width="40%" height="24px" />
              <q-skeleton type="text" width="60%" height="12px" class="q-mt-sm" />
              <q-list class="q-mt-md">
                <q-item v-for="n in 3" :key="'leaderboard-' + n" class="q-px-none">
                  <q-item-section avatar><q-skeleton type="QAvatar" size="40px" style="border-radius: 8px;" /></q-item-section>
                  <q-item-section>
                    <q-skeleton type="text" width="70%" />
                    <q-skeleton type="text" width="40%" class="q-mt-xs" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <!-- Predictive Stock & Inventory Skeleton -->
        <div class="col-12 q-mt-md">
          <q-card flat bordered style="border-radius: 24px;">
            <q-card-section>
              <q-skeleton type="text" width="30%" height="24px" />
              <q-skeleton type="rect" height="150px" class="q-mt-md" style="border-radius: 12px;" />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="dashboard-content animate-fade">
      <!-- Top Cards -->
      <AdminDashboardCards :stats="dashboardStore.stats" />

      <!-- Analytics Charts -->
      <AdminChartWidgets
        ref="chartWidgetsRef"
        :trendData="dashboardStore.stats.totalSalesData"
        :grossSalesData="dashboardStore.stats.totalGrossSalesData"
        :expensesData="dashboardStore.stats.totalExpensesData"
        :creditsData="dashboardStore.stats.totalCreditsData"
        :chargesData="dashboardStore.stats.totalChargesData"
        :overagesData="dashboardStore.stats.totalOveragesData"
        :wasteData="dashboardStore.stats.totalWasteData"
        :trendLabels="dashboardStore.chartLabels"
        :timeRangeDescription="timeRangeText"
        :distributionData="dashboardStore.stats.branchSalesDistribution"
      />

      <!-- Real-Time Waste Tracker (FEAT-06) -->
      <AdminWasteTrackerWidget
        :metrics="dashboardStore.wasteMetrics"
        :loading="dashboardStore.wasteLoading"
        class="q-mt-md"
      />

      <!-- Recipe Cost Analysis -->
      <AdminRecipeCostWidget 
        v-if="dashboardStore.recipeCostMetrics"
        :metrics="dashboardStore.recipeCostMetrics" 
        @refresh="dashboardStore.fetchRecipeCostMetrics"
        class="q-mt-md" 
      />

      <!-- Profitability Leaderboard Widget -->
      <AdminProfitabilityLeaderboardWidget
        v-if="dashboardStore.profitMargins"
        :profitMargins="dashboardStore.profitMargins"
        class="q-mt-md"
      />

      <!-- Profit Margin Analysis -->
      <AdminProfitMarginWidget
        v-if="dashboardStore.profitMargins"
        :profitMargins="dashboardStore.profitMargins"
        class="q-mt-md"
      />

      <!-- Predictive Stocking Engine -->
      <AdminPredictiveStockCard :predictions="dashboardStore.predictiveStocking" />

      <!-- Inventory Metrics Widget -->
      <AdminInventoryWidget
        :inventoryLabels="dashboardStore.inventoryLabels"
        :inventoryInData="dashboardStore.inventoryInData"
        :inventoryOutData="dashboardStore.inventoryOutData"
        :inventoryBalances="dashboardStore.inventoryBalances"
        :timeRangeDescription="timeRangeText"
      />

      <!-- Bottom Activity Feed -->
      <AdminRecentActivity :activities="dashboardStore.stats.recentActivity" />
    </div>

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
              <div class="text-h6">System Analytics Report PDF</div>
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
  </q-page>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useDashboardStore } from "src/stores/dashboard";
import AdminDashboardCards from "./components/AdminDashboardCards.vue";
import AdminChartWidgets from "./components/AdminChartWidgets.vue";
import AdminWasteTrackerWidget from "./components/AdminWasteTrackerWidget.vue";
import AdminRecipeCostWidget from "./components/AdminRecipeCostWidget.vue";
import AdminProfitMarginWidget from "./components/AdminProfitMarginWidget.vue";
import AdminProfitabilityLeaderboardWidget from "./components/AdminProfitabilityLeaderboardWidget.vue";
import AdminPredictiveStockCard from "src/components/PredictiveStockCard.vue";
import AdminInventoryWidget from "./components/AdminInventoryWidget.vue";
import AdminRecentActivity from "./components/AdminRecentActivity.vue";

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.default;

const dashboardStore = useDashboardStore();
const printDialog = ref(false);
const pdfUrl = ref("");
const chartWidgetsRef = ref(null);

const timeRangeText = computed(() => {
  const map = {
    "7D": "Weekly",
    "1M": "Monthly",
    "3M": "Quarterly",
    "1Y": "Yearly",
  };
  return map[dashboardStore.timeRange] || "Weekly";
});

// Formal PDF Generation Logic
let currentDocDefinition = null;

const openPrintDialog = () => {
  // Capture chart canvases as base64 PNG images
  let trendChartImage = null;
  let donutChartImage = null;

  if (chartWidgetsRef.value) {
    const trendCanvas = chartWidgetsRef.value.trendChartCanvas;
    const donutCanvas = chartWidgetsRef.value.donutChartCanvas;

    if (trendCanvas) {
      trendChartImage = trendCanvas.toDataURL("image/png");
    }
    if (donutCanvas) {
      donutChartImage = donutCanvas.toDataURL("image/png");
    }
  }

  currentDocDefinition = generateDashboardDocDefinition({ trendChartImage, donutChartImage });
  pdfMake.createPdf(currentDocDefinition).getDataUrl((dataUrl) => {
    pdfUrl.value = dataUrl;
    printDialog.value = true;
  });
};

const triggerPhysicalPrint = () => {
  if (currentDocDefinition) {
    pdfMake.createPdf(currentDocDefinition).print();
  }
};

const triggerDownload = () => {
  if (currentDocDefinition) {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const branchLabel = dashboardStore.selectedBranch === 'global' ? 'All_Branches' : dashboardStore.selectedBranch;
    const filename = `GB_Bakeshop_Analytics_${branchLabel}_${dateStr}.pdf`;
    pdfMake.createPdf(currentDocDefinition).download(filename);
  }
};

const generateDashboardDocDefinition = ({ trendChartImage, donutChartImage } = {}) => {
  const reportDate = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  const branchName =
    dashboardStore.selectedBranch !== "global"
      ? dashboardStore.stats.branchesList.find(
          (b) => b.id === dashboardStore.selectedBranch
        )?.name || "Specific Branch"
      : "Network Global";

  let totalGross = 0;
  let totalNet = 0;
  let totalExpenses = 0;
  let totalCredits = 0;
  let totalCharges = 0;
  let totalOverages = 0;
  let totalWaste = 0;

  const formatMoney = (val) => {
    if (val === undefined || val === null) return "₱0.00";
    return `₱${Number(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

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

  // Pre-process Top/Bottom profitability categories
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

  return {
    pageSize: "A4",
    pageOrientation: "landscape",
    pageMargins: [40, 40, 40, 40],
    content: [
      // ── Page 1: Executive Summary & Financial Table ──
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                fillColor: "#0f172a",
                stack: [
                  { text: "GB BAKESHOP BUSINESS INTELLIGENCE REPORT", color: "#ffffff", fontSize: 15, bold: true, alignment: "center", margin: [0, 8, 0, 2] },
                  { text: `EXECUTIVE SUMMARY | LOCATION: ${branchName.toUpperCase()} | TIME FRAME: ${timeRangeText.value.toUpperCase()} | DATE: ${reportDate.toUpperCase()}`, color: "#38bdf8", fontSize: 8, bold: true, alignment: "center", margin: [0, 0, 0, 8] }
                ],
                border: [false, false, false, false]
              }
            ]
          ]
        },
        margin: [0, -10, 0, 20]
      },

      { text: "Key Operations Summary", style: "sectionHeader" },
      {
        columns: [
          {
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    fillColor: "#f8fafc",
                    borderColor: "#cbd5e1",
                    stack: [
                      { text: "ACTIVE LOCATIONS", fontSize: 7, color: "#64748b", bold: true },
                      { text: dashboardStore.stats.totalBranches.toString(), fontSize: 14, bold: true, color: "#0f172a", margin: [0, 2, 0, 0] }
                    ]
                  }
                ]
              ]
            },
            layout: "lightHorizontalLines"
          },
          {
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    fillColor: "#f8fafc",
                    borderColor: "#cbd5e1",
                    stack: [
                      { text: "ACTIVE WAREHOUSES", fontSize: 7, color: "#64748b", bold: true },
                      { text: (dashboardStore.stats.totalWarehouses || 0).toString(), fontSize: 14, bold: true, color: "#0f172a", margin: [0, 2, 0, 0] }
                    ]
                  }
                ]
              ]
            },
            layout: "lightHorizontalLines"
          },
          {
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    fillColor: "#f8fafc",
                    borderColor: "#cbd5e1",
                    stack: [
                      { text: "REGISTERED STAFF", fontSize: 7, color: "#64748b", bold: true },
                      { text: dashboardStore.stats.totalEmployees.toString(), fontSize: 14, bold: true, color: "#0f172a", margin: [0, 2, 0, 0] }
                    ]
                  }
                ]
              ]
            },
            layout: "lightHorizontalLines"
          },
          {
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    fillColor: "#fef2f2",
                    borderColor: "#fee2e2",
                    stack: [
                      { text: "LOW STOCK WARNINGS", fontSize: 7, color: "#ef4444", bold: true },
                      { text: dashboardStore.stats.lowStockItems.toString(), fontSize: 14, bold: true, color: "#b91c1c", margin: [0, 2, 0, 0] }
                    ]
                  }
                ]
              ]
            },
            layout: "lightHorizontalLines"
          }
        ],
        columnGap: 10,
        margin: [0, 0, 0, 10]
      },
      {
        columns: [
          {
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    fillColor: "#f8fafc",
                    borderColor: "#cbd5e1",
                    stack: [
                      { text: "ACTIVE RECIPES", fontSize: 7, color: "#64748b", bold: true },
                      { text: dashboardStore.stats.totalRecipes.toString(), fontSize: 14, bold: true, color: "#0f172a", margin: [0, 2, 0, 0] }
                    ]
                  }
                ]
              ]
            },
            layout: "lightHorizontalLines"
          },
          {
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    fillColor: "#f8fafc",
                    borderColor: "#cbd5e1",
                    stack: [
                      { text: "ACTIVE SUPPLIERS", fontSize: 7, color: "#64748b", bold: true },
                      { text: (dashboardStore.stats.totalSuppliers || 0).toString(), fontSize: 14, bold: true, color: "#0f172a", margin: [0, 2, 0, 0] }
                    ]
                  }
                ]
              ]
            },
            layout: "lightHorizontalLines"
          },
          {
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    fillColor: "#f8fafc",
                    borderColor: "#cbd5e1",
                    stack: [
                      { text: "BAKER REPORTS", fontSize: 7, color: "#64748b", bold: true },
                      { text: (dashboardStore.stats.totalBakerReports || 0).toString(), fontSize: 14, bold: true, color: "#0f172a", margin: [0, 2, 0, 0] }
                    ]
                  }
                ]
              ]
            },
            layout: "lightHorizontalLines"
          },
          {
            text: "",
            width: "*"
          }
        ],
        columnGap: 10,
        margin: [0, 0, 0, 20]
      },

      { text: "Financial Performance Breakdown", style: "sectionHeader" },
      {
        table: {
          headerRows: 1,
          widths: [55, "*", "*", "*", "*", "*", "*", "*"],
          body: salesTableBody
        },
        layout: {
          fillColor: function (rowIndex) {
            if (rowIndex === 0) return "#1e293b";
            if (rowIndex === salesTableBody.length - 1) return "#f1f5f9";
            return rowIndex % 2 === 0 ? "#f8fafc" : "#ffffff";
          },
          hLineWidth: function (i, node) {
            return i === 0 || i === 1 || i === node.table.body.length - 1 || i === node.table.body.length ? 1.5 : 0.5;
          },
          vLineWidth: () => 0,
          hLineColor: function (i, node) {
            return i === 0 || i === 1 || i === node.table.body.length - 1 || i === node.table.body.length ? "#cbd5e1" : "#e2e8f0";
          }
        },
        margin: [0, 0, 0, 10]
      },

      // ── Page 2: Visual Chart Analytics ──
      { text: "", pageBreak: "after" },

      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                fillColor: "#0f172a",
                stack: [
                  { text: "VISUAL ANALYTICS — CHART OVERVIEW", color: "#ffffff", fontSize: 15, bold: true, alignment: "center", margin: [0, 8, 0, 2] },
                  { text: `SALES PERFORMANCE TRENDS & REVENUE DISTRIBUTION | ${timeRangeText.value.toUpperCase()} | DATE: ${reportDate.toUpperCase()}`, color: "#38bdf8", fontSize: 8, bold: true, alignment: "center", margin: [0, 0, 0, 8] }
                ],
                border: [false, false, false, false]
              }
            ]
          ]
        },
        margin: [0, -10, 0, 20]
      },

      ...(trendChartImage ? [
        { text: "Sales Performance Trend", style: "sectionHeader" },
        { text: "Multi-line overlay showing Gross Sales, Net Revenue, Expenses, Credits, Shortages, Overages, and Wastage over the selected period.", fontSize: 7.5, color: "#64748b", italics: true, margin: [0, 0, 0, 4] },
        {
          image: trendChartImage,
          fit: [700, 220],
          alignment: "center",
          margin: [0, 0, 0, 8]
        }
      ] : [
        { text: "Sales Performance Trend", style: "sectionHeader" },
        { text: "Chart image could not be captured. Please ensure the chart is rendered on screen before exporting.", fontSize: 9, color: "#94a3b8", italics: true, margin: [0, 0, 0, 8] }
      ]),

      ...(donutChartImage ? [
        {
          columns: [
            {
              width: "45%",
              stack: [
                { text: "Revenue Distribution by Branch", style: "sectionHeader" },
                { text: "Proportional revenue share across the top-performing branch locations.", fontSize: 7.5, color: "#64748b", italics: true, margin: [0, 0, 0, 4] },
                {
                  image: donutChartImage,
                  fit: [200, 200],
                  alignment: "center",
                  margin: [0, 0, 0, 0]
                }
              ]
            },
            {
              width: "55%",
              stack: [
                { text: "Chart Notes", bold: true, fontSize: 10, color: "#1e293b", margin: [20, 0, 0, 6] },
                { text: "• The donut chart reflects the proportional revenue contribution of each branch for the selected timeframe.", fontSize: 8, color: "#475569", margin: [20, 0, 0, 4] },
                { text: "• Hover data and checkbox-filtered metrics are reflected in the trend chart above.", fontSize: 8, color: "#475569", margin: [20, 0, 0, 4] },
                { text: "• This report was generated from confirmed transaction data only.", fontSize: 8, color: "#475569", margin: [20, 0, 0, 4] },
                { text: `• Timeframe: ${timeRangeText.value}`, fontSize: 8, color: "#475569", margin: [20, 0, 0, 4] },
                { text: `• Generated: ${new Date().toLocaleString()}`, fontSize: 8, color: "#475569", margin: [20, 0, 0, 0] }
              ]
            }
          ],
          margin: [0, 0, 0, 10]
        }
      ] : []),

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
                  { text: `FINANCIAL SPOILAGE ANALYSIS | LOCATION: ${branchName.toUpperCase()} | TIME FRAME: ${timeRangeText.value.toUpperCase()} | DATE: ${reportDate.toUpperCase()}`, color: "#fee2e2", fontSize: 8, bold: true, alignment: "center", margin: [0, 0, 0, 8] }
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
                  { text: `RECIPE EXPENSES & PRODUCT PROFIT MARGIN RANKINGS | LOCATION: ${branchName.toUpperCase()} | DATE: ${reportDate.toUpperCase()}`, color: "#e0f2fe", fontSize: 8, bold: true, alignment: "center", margin: [0, 0, 0, 8] }
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
                  { text: `INVENTORY RUNOUT FORECASTS & DETAILED UNIT MARGINS | LOCATION: ${branchName.toUpperCase()} | DATE: ${reportDate.toUpperCase()}`, color: "#e0e7ff", fontSize: 8, bold: true, alignment: "center", margin: [0, 0, 0, 8] }
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
          { text: "Report automatically generated via Administrator Console | Confirmed Data Only", style: "footerText", alignment: "left", margin: [40, 0, 0, 0] },
          { text: `Page ${currentPage.toString()} of ${pageCount.toString()}`, style: "footerText", alignment: "right", margin: [0, 0, 40, 0] }
        ]
      };
    },
    styles: {
      sectionHeader: {
        fontSize: 10,
        bold: true,
        color: "#0f172a",
        margin: [0, 0, 0, 5]
      },
      tableHeader: {
        bold: true,
        fontSize: 7.5,
        color: "#ffffff",
        margin: [0, 2, 0, 2]
      },
      tableTotalHeader: {
        bold: true,
        fontSize: 7.5,
        color: "#0f172a",
        margin: [0, 2, 0, 2]
      },
      tableCell: {
        fontSize: 7.5,
        color: "#334155",
        margin: [0, 1.5, 0, 1.5]
      },
      tableCellAmount: {
        fontSize: 7.5,
        color: "#334155",
        alignment: "right",
        margin: [0, 1.5, 0, 1.5]
      },
      tableTotalCell: {
        bold: true,
        fontSize: 7.5,
        color: "#0f172a",
        margin: [0, 2, 0, 2]
      },
      footerText: {
        fontSize: 7,
        color: "#64748b",
        italics: true
      }
    },
    defaultStyle: {
      font: "Roboto"
    }
  };
};

onMounted(async () => {
  // Fetch high-level analytics in parallel over network
  await dashboardStore.fetchDashboardMetrics();
  // Verify if current view contains no data
  const hasData = dashboardStore.stats.totalSalesData.some(v => v > 0);
  if (!hasData) {
    dashboardStore.setTimeRange("3M");
  }
});
</script>

<style lang="scss" scoped>
.admin-dashboard-page {
  /* Elegant soft background */
  background: #f8fafc;
  min-height: 100vh;

  /* Make responsive padding: smaller on mobile, larger on desktop */
  padding: 16px;
  @media (min-width: 768px) {
    padding: 32px 40px;
  }
}

.dashboard-header {
  .header-actions {
    margin-top: 16px;
    @media (min-width: 768px) {
      margin-top: 0;
    }
  }

  /* Sleek, subtle refresh button */
  .refresh-btn {
    border-radius: 8px;
    font-weight: 600;
    padding: 8px 16px;
    background: white !important;
    color: #475569 !important;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      background: #f1f5f9 !important;
      border-color: #cbd5e1;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
  }
}

.animate-fade {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
