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

    <!-- Loading Skeleton Overlay (Optional, but let's keep it simple with a spinner) -->
    <div v-if="dashboardStore.loading" class="flex flex-center q-pa-xl">
      <q-spinner-dots color="primary" size="3em" />
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

  return {
    pageSize: "A4",
    pageOrientation: "landscape",
    pageMargins: [40, 40, 40, 40],
    content: [
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                fillColor: "#0f172a",
                stack: [
                  { text: "GB BAKESHOP BUSINESS INTELLIGENCE REPORT", color: "#ffffff", fontSize: 15, bold: true, alignment: "center", margin: [0, 8, 0, 2] },
                  { text: `EXECUTIVE SUMMARY | LOCATION: ${branchName.toUpperCase()} | TIME FRAME: ${timeRangeText.value.toUpperCase()}`, color: "#38bdf8", fontSize: 8, bold: true, alignment: "center", margin: [0, 0, 0, 8] }
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
                  { text: `SALES PERFORMANCE TRENDS & REVENUE DISTRIBUTION | ${timeRangeText.value.toUpperCase()}`, color: "#38bdf8", fontSize: 8, bold: true, alignment: "center", margin: [0, 0, 0, 8] }
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
      ] : [])
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
    console.log("No recent data found. Auto-expanding timeframe to 3M...");
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
