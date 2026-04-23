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

      <!-- Time Range Selection Controls -->
      <div class="row justify-end q-mt-md q-mb-sm">
        <q-btn-group outline rounded>
          <q-btn
            :color="dashboardStore.timeRange === '7D' ? 'primary' : 'grey-7'"
            :flat="dashboardStore.timeRange !== '7D'"
            label="7D"
            @click="dashboardStore.setTimeRange('7D')"
          />
          <q-btn
            :color="dashboardStore.timeRange === '1M' ? 'primary' : 'grey-7'"
            :flat="dashboardStore.timeRange !== '1M'"
            label="1M"
            @click="dashboardStore.setTimeRange('1M')"
          />
          <q-btn
            :color="dashboardStore.timeRange === '3M' ? 'primary' : 'grey-7'"
            :flat="dashboardStore.timeRange !== '3M'"
            label="3M"
            @click="dashboardStore.setTimeRange('3M')"
          />
          <q-btn
            :color="dashboardStore.timeRange === '1Y' ? 'primary' : 'grey-7'"
            :flat="dashboardStore.timeRange !== '1Y'"
            label="1Y"
            @click="dashboardStore.setTimeRange('1Y')"
          />
        </q-btn-group>
      </div>

      <!-- Analytics Charts -->
      <AdminChartWidgets
        :trendData="dashboardStore.stats.totalSalesData"
        :trendLabels="dashboardStore.chartLabels"
        :timeRangeDescription="timeRangeText"
        :distributionData="dashboardStore.stats.branchSalesDistribution"
      />

      <!-- Recipe Cost Analysis -->
      <AdminRecipeCostWidget 
        v-if="dashboardStore.recipeCostMetrics"
        :metrics="dashboardStore.recipeCostMetrics" 
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
                icon="print"
                class="q-mr-md"
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
import AdminRecipeCostWidget from "./components/AdminRecipeCostWidget.vue";
import AdminPredictiveStockCard from "src/components/PredictiveStockCard.vue";
import AdminInventoryWidget from "./components/AdminInventoryWidget.vue";
import AdminRecentActivity from "./components/AdminRecentActivity.vue";

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.default;

const dashboardStore = useDashboardStore();
const printDialog = ref(false);
const pdfUrl = ref("");

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
  currentDocDefinition = generateDashboardDocDefinition();
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

const generateDashboardDocDefinition = () => {
  const branchName =
    dashboardStore.selectedBranch !== "global"
      ? dashboardStore.stats.branchesList.find(
          (b) => b.id === dashboardStore.selectedBranch
        )?.name || "Specific Branch"
      : "Network Global";

  const totalRevenue = (dashboardStore.stats.totalSalesData || []).reduce(
    (a, b) => a + b,
    0
  );

  // Map Sales Data into a printable table
  const salesTableBody = [
    [
      { text: "Timeline Interval", style: "tableHeader" },
      { text: "Net Revenue (₱)", style: "tableHeader", alignment: "right" },
    ],
  ];

  dashboardStore.chartLabels.forEach((label, index) => {
    salesTableBody.push([
      label,
      {
        text: `₱${(
          dashboardStore.stats.totalSalesData[index] || 0
        ).toLocaleString()}`,
        alignment: "right",
      },
    ]);
  });

  // Calculate totals to inject at bottom
  salesTableBody.push([
    { text: "Total Selected Revenue", style: "tableHeader" },
    {
      text: `₱${totalRevenue.toLocaleString()}`,
      style: "tableHeader",
      alignment: "right",
    },
  ]);

  return {
    content: [
      { text: "GB Bakeshop Analytics", style: "superHeader" },
      {
        text: `Executive Dashboard Report | Location: ${branchName}`,
        style: "subtext",
        margin: [0, 0, 0, 20],
      },

      { text: "Top-Level System Metrics", style: "header", marginTop: 10 },
      {
        table: {
          widths: ["*", "*", "*", "*"],
          body: [
            [
              { text: "Active Locations", bold: true },
              { text: "Active Warehouses", bold: true },
              { text: "Registered Staff", bold: true },
              { text: "Low Stock Warnings", bold: true, color: "red" },
            ],
            [
              {
                text: dashboardStore.stats.totalBranches.toString(),
                fontSize: 14,
              },
              {
                text: (dashboardStore.stats.totalWarehouses || 0).toString(),
                fontSize: 14,
              },
              {
                text: dashboardStore.stats.totalEmployees.toString(),
                fontSize: 14,
              },
              {
                text: dashboardStore.stats.lowStockItems.toString(),
                fontSize: 14,
                color: "red",
              },
            ],
            [
              { text: "Active Recipes", bold: true },
              { text: "Active Suppliers", bold: true },
              { text: "Baker Reports", bold: true },
              { text: "", bold: true },
            ],
            [
              {
                text: dashboardStore.stats.totalRecipes.toString(),
                fontSize: 14,
              },
              {
                text: (dashboardStore.stats.totalSuppliers || 0).toString(),
                fontSize: 14,
              },
              {
                text: (dashboardStore.stats.totalBakerReports || 0).toString(),
                fontSize: 14,
              },
              {
                text: "",
                fontSize: 14,
              },
            ],
          ],
        },
        layout: "lightHorizontalLines",
        margin: [0, 10, 0, 20],
      },

      {
        text: `Financial Performance (${timeRangeText.value})`,
        style: "header",
        marginTop: 20,
      },
      {
        text: "Aggregated revenue scaled over the selected time bracket.",
        style: "subtext",
        margin: [0, 0, 0, 10],
      },
      {
        table: {
          headerRows: 1,
          widths: ["*", "*"],
          body: salesTableBody,
        },
        layout: {
          fillColor: function (rowIndex) {
            return rowIndex === 0 ? "#f3f4f6" : null;
          },
        },
        margin: [0, 0, 0, 30],
      },

      {
        text: "Report automatically generated via Administrator Console",
        style: "footer",
        alignment: "center",
        margin: [0, 40, 0, 0],
      },
    ],
    styles: {
      superHeader: {
        fontSize: 22,
        bold: true,
        color: "#1f2937",
      },
      header: {
        fontSize: 16,
        bold: true,
        color: "#4b5563",
        marginBottom: 5,
      },
      subtext: {
        fontSize: 10,
        color: "#6b7280",
        italics: true,
      },
      tableHeader: {
        bold: true,
        fontSize: 12,
        color: "#374151",
      },
      footer: {
        fontSize: 9,
        color: "#9ca3af",
        italics: true,
      },
    },
    defaultStyle: {
      font: "Roboto",
    },
  };
};

onMounted(() => {
  // Fetch high-level analytics in parallel over network
  dashboardStore.fetchDashboardMetrics();
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
