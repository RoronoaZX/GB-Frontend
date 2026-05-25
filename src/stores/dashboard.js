import { defineStore } from "pinia";
import { Loading, Notify, QSpinnerGears } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

// export const useDashboardStore = defineStore("dashboard", {
//   state: () => ({
//     stats: {
//       totalBranches: 0,
//       branchesList: [],
//       totalEmployees: 0,
//       lowStockItems: 0,
//       totalSalesData: [],
//       branchSalesDistribution: [],
//       recentActivity: [],
//       // NEW METRICS
//       totalSuppliers: 0,
//       totalBakerReports: 0,
//       totalGrossRevenue: 0,
//       totalExpenses: 0,
//       totalNetProfit: 0,
//       totalCashOnHand: 0,
//     },
//     },
//     rawSales: [],
//     // New Inventory Activity States
//     inventoryBalances: [],
//     rawInventoryIn: [],
//     rawInventoryOut: [],
//     inventoryLabels: [],
//     inventoryInData: [],
//     inventoryOutData: [],

//     timeRange: "7D", // '7D', '1M', '3M', '1Y'
//     chartLabels: [],
//     selectedBranch: "global", // 'global' or branchId
//     loading: false,
//     error: null,
//   }),
//   actions: {
//     setTimeRange(range) {
//       this.timeRange = range;
//       this.processTimeRangeData();
//       this.processInventoryTimeRangeData();
//     },
//     setBranch(branchId) {
//       this.selectedBranch = branchId;
//       this.fetchDashboardMetrics();
//     },
//     processTimeRangeData() {
//       // Dynamic Aggregation Engine
//       if (this.rawSales.length === 0) {
//         this.stats.totalSalesData = [0, 0, 0, 0, 0, 0, 0];
//         this.chartLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//         return;
//       }

//       const salesMap = {};
//       const now = new Date();

//       this.rawSales.forEach((s) => {
//         const grossStr = String(
//           s.products_total_sales || s.total_sales || "0"
//         ).replace(/[^0-9.-]+/g, "");
//         const expensesStr = String(s.expenses_total || "0").replace(
//           /[^0-9.-]+/g,
//           ""
//         );

//         const grossSales = Number(grossStr);
//         const expenses = Number(expensesStr);
//         let netProfit = grossSales - expenses;

//         const dateObj = new Date(s.created_at);
//         let key = "";

//         if (this.timeRange === "7D" || this.timeRange === "1M") {
//           // Group by specific day (YYYY-MM-DD)
//           key = dateObj.toISOString().split("T")[0];
//         } else {
//           // Group by Month (YYYY-MM)
//           key = dateObj.toISOString().substring(0, 7);
//         }

//         salesMap[key] = (salesMap[key] || 0) + netProfit;
//       });

//       // Sort chronological keys
//       const sortedKeys = Object.keys(salesMap).sort();
//       let slicedKeys = [];

//       if (this.timeRange === "7D") {
//         slicedKeys = sortedKeys.slice(-7);
//         this.chartLabels = slicedKeys.map((d) =>
//           new Date(d).toLocaleDateString("en-US", { weekday: "short" })
//         );
//       } else if (this.timeRange === "1M") {
//         slicedKeys = sortedKeys.slice(-30);
//         this.chartLabels = slicedKeys.map((d) =>
//           new Date(d).getDate().toString()
//         );
//       } else if (this.timeRange === "3M") {
//         slicedKeys = sortedKeys.slice(-3); // last 3 months
//         this.chartLabels = slicedKeys.map((d) =>
//           new Date(d + "-01").toLocaleDateString("en-US", { month: "short" })
//         );
//       } else if (this.timeRange === "1Y") {
//         slicedKeys = sortedKeys.slice(-12); // last 12 months
//         this.chartLabels = slicedKeys.map((d) =>
//           new Date(d + "-01").toLocaleDateString("en-US", { month: "short" })
//         );
//       }

//       this.stats.totalSalesData = slicedKeys.map((k) => salesMap[k]);

//       if (this.stats.totalSalesData.length === 0) {
//         this.stats.totalSalesData = [0, 0, 0, 0, 0, 0, 0];
//         this.chartLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//       }
//     },
//     processInventoryTimeRangeData() {
//       // Very similar robust grouping engine for Inventory IN and OUT movements
//       const inMap = {};
//       const outMap = {};

//       const processArray = (arr, mapRef) => {
//         arr.forEach((item) => {
//           let key = "";
//           const dateObj = new Date(item.date);
//           if (this.timeRange === "7D" || this.timeRange === "1M") {
//             key = dateObj.toISOString().split("T")[0];
//           } else {
//             key = dateObj.toISOString().substring(0, 7);
//           }
//           mapRef[key] = (mapRef[key] || 0) + Number(item.total_qty || 0);
//         });
//       };

//       processArray(this.rawInventoryIn, inMap);
//       processArray(this.rawInventoryOut, outMap);

//       // Merge keys to ensure chart lines map to correct labels symmetrically
//       const allKeys = Array.from(
//         new Set([...Object.keys(inMap), ...Object.keys(outMap)])
//       ).sort();
//       let slicedKeys = [];

//       if (this.timeRange === "7D") {
//         slicedKeys = allKeys.slice(-7);
//         this.inventoryLabels = slicedKeys.map((d) =>
//           new Date(d).toLocaleDateString("en-US", { weekday: "short" })
//         );
//       } else if (this.timeRange === "1M") {
//         slicedKeys = allKeys.slice(-30);
//         this.inventoryLabels = slicedKeys.map((d) =>
//           new Date(d).getDate().toString()
//         );
//       } else if (this.timeRange === "3M") {
//         slicedKeys = allKeys.slice(-3); // last 3 months
//         this.inventoryLabels = slicedKeys.map((d) =>
//           new Date(d + "-01").toLocaleDateString("en-US", { month: "short" })
//         );
//       } else if (this.timeRange === "1Y") {
//         slicedKeys = allKeys.slice(-12); // last 12 months
//         this.inventoryLabels = slicedKeys.map((d) =>
//           new Date(d + "-01").toLocaleDateString("en-US", { month: "short" })
//         );
//       }

//       this.inventoryInData = slicedKeys.map((k) => inMap[k] || 0);
//       this.inventoryOutData = slicedKeys.map((k) => outMap[k] || 0);

//       // Edge case if absolutely no data exists
//       if (slicedKeys.length === 0) {
//         this.inventoryLabels = [
//           "Mon",
//           "Tue",
//           "Wed",
//           "Thu",
//           "Fri",
//           "Sat",
//           "Sun",
//         ];
//         this.inventoryInData = [0, 0, 0, 0, 0, 0, 0];
//         this.inventoryOutData = [0, 0, 0, 0, 0, 0, 0];
//       }
//     },
//     async fetchDashboardMetrics() {
//       this.loading = true;
//       this.error = null;
//       try {
//         const routeSuffix =
//           this.selectedBranch !== "global"
//             ? `?branch_id=${this.selectedBranch}`
//             : "";
//         const concatSuffix =
//           this.selectedBranch !== "global"
//             ? `&branch_id=${this.selectedBranch}`
//             : "";

//         // Robust Parallel fetching to drastically reduce load time
//         const [
//           branchesRes,
//           employeesRes,
//           rawMaterialsRes,
//           salesRes,
//           recipesRes,
//           suppliersRes,
//           bakerReportsRes,
//           inventoryMetricsRes, // NEW Call
//         ] = await Promise.all([
//           api.get("/api/branches").catch(() => ({ data: [] })),
//           api.get("/api/employee").catch(() => ({ data: [] })),
//           api.get("/api/raw-materials").catch(() => ({ data: [] })),
//           api
//             .get(`/api/sales-report?dashboard=true${concatSuffix}`)
//             .catch(() => ({ data: [] })),
//           api.get("/api/recipes").catch(() => ({ data: [] })),
//           api.get("/api/fetch-supplier-records").catch(() => ({ data: [] })),
//           api
//             .get(`/api/initial-baker-report?dashboard=true${concatSuffix}`)
//             .catch(() => ({ data: [] })),
//           api
//             .get(`/api/dashboard/inventory-metrics${routeSuffix}`)
//             .catch(() => ({
//               data: { currentBalances: [], inMovements: [], outMovements: [] },
//             })),
//         ]);

//         const branches = Array.isArray(branchesRes.data)
//           ? branchesRes.data
//           : branchesRes.data?.data || [];
//         let employees = Array.isArray(employeesRes.data)
//           ? employeesRes.data
//           : employeesRes.data?.data || [];
//         let rawMaterials = Array.isArray(rawMaterialsRes.data)
//           ? rawMaterialsRes.data
//           : rawMaterialsRes.data?.data || [];

//         const sales = Array.isArray(salesRes.data)
//           ? salesRes.data
//           : salesRes.data?.data || [];
//         const recipes = Array.isArray(recipesRes.data)
//           ? recipesRes.data
//           : recipesRes.data?.data || [];
//         const suppliers = Array.isArray(suppliersRes.data)
//           ? suppliersRes.data
//           : suppliersRes.data?.data || [];
//         const bakerReports = Array.isArray(bakerReportsRes.data)
//           ? bakerReportsRes.data
//           : bakerReportsRes.data?.data || [];

//         // Perform client-side filtering for APIs that don't robustly support branch_id yet
//         if (this.selectedBranch !== "global") {
//           const bId = Number(this.selectedBranch);
//           employees = employees.filter(
//             (emp) =>
//               emp.branchEmployee?.branch_id === bId ||
//               emp.designation?.id === bId
//           );
//           rawMaterials = rawMaterials.filter((rm) => rm.branch_id === bId);
//         }

//         // Compute metrics accurately from LIVE arrays
//         this.stats.totalBranches = branches.length;
//         this.stats.branchesList = branches;
//         this.stats.totalRecipes = recipes.length;
//         this.stats.totalSuppliers = suppliers.length;
//         this.stats.totalBakerReports = bakerReports.length;

//         // Count active/valid employees
//         this.stats.totalEmployees = employees.filter(
//           (emp) => emp.status?.toLowerCase() !== "inactive"
//         ).length;

//         // Calculate Low Stocks (Checking 'quantity' or 'available_stock' below 50)
//         this.stats.lowStockItems = rawMaterials.filter((rm) => {
//           const qty = Number(rm.available_stock ?? rm.quantity ?? 0);
//           return qty < 50;
//         }).length;

//         // Map recent LIVE activities using latest registered employees & newly added branches
//         const recentStaff = employees.map((emp) => ({
//           id: `emp-${emp.id}`,
//           action: `New Access Registered`,
//           details: `${emp.firstname} ${emp.lastname} was added to the system.`,
//           time: emp.created_at,
//           timestamp: new Date(emp.created_at).getTime(),
//         }));

//         const recentBranches = branches.map((b) => ({
//           id: `br-${b.id}`,
//           action: `New Branch Established`,
//           details: `Branch location ${b.name} was registered.`,
//           time: b.created_at,
//           timestamp: new Date(b.created_at).getTime(),
//         }));

//         this.stats.recentActivity = [...recentStaff, ...recentBranches]
//           .sort((a, b) => b.timestamp - a.timestamp)
//           .slice(0, 5);

//         // Store raw sales for instantaneous dynamic aggregation without refetching from server
//         this.rawSales = sales;
//         this.processTimeRangeData();

//         // Feed Inventory Analytics Maps
//         const invData = inventoryMetricsRes.data || {};
//         this.rawInventoryIn = invData.inMovements || [];
//         this.rawInventoryOut = invData.outMovements || [];
//         this.inventoryBalances = invData.currentBalances || [];

//         this.processInventoryTimeRangeData();

//         // Branch Distribution mapped from actual live branches
//         this.stats.branchSalesDistribution =
//           branches.length > 0
//             ? branches.slice(0, 5).map((b) => ({
//                 name: b.name,
//                 sales: Math.floor(Math.random() * 50000) + 10000, // Using mock sales until backend grouping API is confirmed
//               }))
//             : [
//                 { name: "Main HQ", sales: 45000 },
//                 { name: "Branch A", sales: 30000 },
//               ];
//       } catch (error) {
//         console.error("Dashboard fetching failed:", error);
//         this.error = "Failed to load dashboard metrics.";
//       } finally {
//         this.loading = false;
//       }
//     },
//   },
// });

export const useDashboardStore = defineStore("dashboard", () => {
  // =========================
  // STATE
  // =========================
  const stats = ref({
    totalBranches: 0,
    branchesList: [],
    totalEmployees: 0,
    lowStockItems: 0,
    totalSalesData: [],
    totalGrossSalesData: [],
    totalExpensesData: [],
    branchSalesDistribution: [],
    recentActivity: [],
    totalSuppliers: 0,
    totalBakerReports: 0,
  });

  const predictiveStocking = ref([]);
  const recipeCostMetrics = ref({
    averageCost: 0,
    topRecipes: [],
    recentChanges: [],
  });

  const profitMargins = ref([]);

  const rawSales = ref([]);

  const inventoryBalances = ref([]);
  const rawInventoryIn = ref([]);
  const rawInventoryOut = ref([]);

  const inventoryLabels = ref([]);
  const inventoryInData = ref([]);
  const inventoryOutData = ref([]);

  const rmTransactions = ref([]);
  const rmTransactionsPagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 5,
    total: 0,
  });

  const timeRange = ref("7D");
  const chartLabels = ref([]);
  const selectedBranch = ref("global");

  const loading = ref(false);
  const error = ref(null);

  // =========================
  // ACTIONS
  // =========================

  const setTimeRange = (range) => {
    timeRange.value = range;
    processTimeRangeData();
    processInventoryTimeRangeData();
  };

  const setBranch = (branchId) => {
    selectedBranch.value = branchId;
    fetchDashboardMetrics();
  };

  // =========================
  // SALES PROCESSING
  // =========================
  const processTimeRangeData = () => {
    if (rawSales.value.length === 0) {
      stats.value.totalSalesData = [0, 0, 0, 0, 0, 0, 0];
      stats.value.totalGrossSalesData = [0, 0, 0, 0, 0, 0, 0];
      stats.value.totalExpensesData = [0, 0, 0, 0, 0, 0, 0];
      chartLabels.value = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      return;
    }

    const salesMap = {};

    rawSales.value.forEach((s) => {
      const gross = Number(
        String(s.products_total_sales || s.total_sales || 0).replace(
          /[^0-9.-]+/g,
          ""
        )
      );
      const expenses = Number(
        String(s.expenses_total || 0).replace(/[^0-9.-]+/g, "")
      );
      const net = gross - expenses;

      const dateObj = new Date(s.created_at);
      let key = "";

      if (timeRange.value === "7D" || timeRange.value === "1M") {
        key = dateObj.toISOString().split("T")[0];
      } else {
        key = dateObj.toISOString().substring(0, 7);
      }

      if (!salesMap[key]) {
        salesMap[key] = { net: 0, gross: 0, expenses: 0 };
      }
      salesMap[key].net += net;
      salesMap[key].gross += gross;
      salesMap[key].expenses += expenses;
    });

    const sortedKeys = Object.keys(salesMap).sort();
    let slicedKeys = [];

    if (timeRange.value === "7D") {
      slicedKeys = sortedKeys.slice(-7);
      chartLabels.value = slicedKeys.map((d) =>
        new Date(d).toLocaleDateString("en-US", { weekday: "short" })
      );
    } else if (timeRange.value === "1M") {
      slicedKeys = sortedKeys.slice(-30);
      chartLabels.value = slicedKeys.map((d) =>
        new Date(d).getDate().toString()
      );
    } else if (timeRange.value === "3M") {
      slicedKeys = sortedKeys.slice(-3);
      chartLabels.value = slicedKeys.map((d) =>
        new Date(d + "-01").toLocaleDateString("en-US", { month: "short" })
      );
    } else if (timeRange.value === "1Y") {
      slicedKeys = sortedKeys.slice(-12);
      chartLabels.value = slicedKeys.map((d) =>
        new Date(d + "-01").toLocaleDateString("en-US", { month: "short" })
      );
    }

    stats.value.totalSalesData = slicedKeys.map((k) => salesMap[k]?.net || 0);
    stats.value.totalGrossSalesData = slicedKeys.map((k) => salesMap[k]?.gross || 0);
    stats.value.totalExpensesData = slicedKeys.map((k) => salesMap[k]?.expenses || 0);

    // Update branch distribution whenever time range data is processed
    updateBranchDistribution();
  };

  const updateBranchDistribution = () => {
    const branches = stats.value.branchesList || [];
    const sales = rawSales.value || [];

    if (branches.length === 0) {
      stats.value.branchSalesDistribution = [];
      return;
    }

    const branchMap = {};
    // Initialize with all available branches
    branches.forEach((b) => {
      branchMap[b.id] = 0;
    });

    const now = new Date();
    let cutoffDate = new Date(0); // Default to all time
    if (timeRange.value === "7D") cutoffDate = new Date(new Date().setDate(now.getDate() - 7));
    else if (timeRange.value === "1M") cutoffDate = new Date(new Date().setMonth(now.getMonth() - 1));
    else if (timeRange.value === "3M") cutoffDate = new Date(new Date().setMonth(now.getMonth() - 3));
    else if (timeRange.value === "1Y") cutoffDate = new Date(new Date().setFullYear(now.getFullYear() - 1));

    sales.forEach((s) => {
      const dateObj = new Date(s.created_at);
      if (dateObj >= cutoffDate) {
        const gross = Number(String(s.products_total_sales || 0).replace(/[^0-9.-]+/g, ""));
        const expenses = Number(String(s.expenses_total || 0).replace(/[^0-9.-]+/g, ""));
        const net = gross - expenses;
        if (branchMap[s.branch_id] !== undefined) {
          branchMap[s.branch_id] += net;
        }
      }
    });

    let distribution = Object.keys(branchMap).map((bId) => {
      const branch = branches.find((b) => b.id == bId);
      return {
        id: bId,
        name: branch ? branch.name : `Branch ${bId}`,
        sales: branchMap[bId],
      };
    });

    // Filtering logic based on selection
    if (selectedBranch.value !== "global") {
      if (String(selectedBranch.value).startsWith("warehouse-")) {
        stats.value.branchSalesDistribution = [];
      } else {
        // Show only the selected branch
        stats.value.branchSalesDistribution = distribution.filter(
          (d) => String(d.id) === String(selectedBranch.value)
        );
      }
    } else {
      // Global View: Top 5 by sales
      stats.value.branchSalesDistribution = distribution
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5);
    }
  };

  // =========================
  // INVENTORY PROCESSING
  // =========================
  const processInventoryTimeRangeData = () => {
    const inMap = {};
    const outMap = {};

    const processArray = (arr, mapRef) => {
      arr.forEach((item) => {
        const dateObj = new Date(item.date);
        let key = "";

        if (timeRange.value === "7D" || timeRange.value === "1M") {
          key = dateObj.toISOString().split("T")[0];
        } else {
          key = dateObj.toISOString().substring(0, 7);
        }

        mapRef[key] = (mapRef[key] || 0) + Number(item.total_qty || 0);
      });
    };

    processArray(rawInventoryIn.value, inMap);
    processArray(rawInventoryOut.value, outMap);

    const allKeys = [
      ...new Set([...Object.keys(inMap), ...Object.keys(outMap)]),
    ].sort();

    let slicedKeys = [];

    if (timeRange.value === "7D") {
      slicedKeys = allKeys.slice(-7);
      inventoryLabels.value = slicedKeys.map((d) =>
        new Date(d).toLocaleDateString("en-US", { weekday: "short" })
      );
    }

    inventoryInData.value = slicedKeys.map((k) => inMap[k] || 0);
    inventoryOutData.value = slicedKeys.map((k) => outMap[k] || 0);
  };

  const fetchRMTransactions = async (page = 1, perPage = 5) => {
    try {
      const res = await api.get(
        `/api/raw-materials-delivery?search=confirmed&page=${page}&per_page=${perPage}`
      );
      const data = res.data?.data || [];
      const pagination = res.data?.pagination || {};

      /* console.log("--- RM TRANSACTIONS LIST (API PAGINATED) ---", {
        processedList: data.flatMap((delivery) =>
          (delivery.items || []).map((item) => ({
            id: `${delivery.id}-${item.id}`,
            name: item.raw_material?.name || "Ingredient",
            action: "Delivery IN",
            details: `${item.quantity} ${item.unit_type} from ${delivery.from_name}`,
            type: "IN",
            time: delivery.created_at,
          }))
        ),
        pagination: {
          currentPage: pagination.current_page,
          totalPages: pagination.last_page,
          totalItems: pagination.total,
          perPage: pagination.per_page,
        },
        rawApiResponse: res.data,
      }); */

      rmTransactions.value = data.flatMap((delivery) =>
        (delivery.items || []).map((item) => ({
          id: `${delivery.id}-${item.id}`,
          name: item.raw_material?.name || "Ingredient",
          action: "Delivery IN",
          details: `${item.quantity} ${item.unit_type} from ${delivery.from_name}`,
          type: "IN",
          time: delivery.created_at,
        }))
      );

      rmTransactionsPagination.value = {
        current_page: pagination.current_page || 1,
        last_page: pagination.last_page || 1,
        per_page: pagination.per_page || perPage,
        total: pagination.total || 0,
      };
    } catch (err) {
      console.error("Failed to fetch RM transactions:", err);
    }
  };

  // =========================
  // FETCH DATA
  // =========================
  const fetchDashboardMetrics = async () => {
    loading.value = true;
    error.value = null;

    try {
      let suffix = "";
      if (selectedBranch.value !== "global") {
        if (String(selectedBranch.value).startsWith("warehouse-")) {
          const wId = selectedBranch.value.split("-")[1];
          suffix = `?warehouse_id=${wId}`;
        } else {
          suffix = `?branch_id=${selectedBranch.value}`;
        }
      }

      // Parallel fetching of optimized dashboard endpoints
      const [
        summaryRes,
        branchesRes,
        warehousesRes,
        salesRes,
        inventoryMetricsRes,
      ] = await Promise.all([
        api.get(`/api/dashboard/summary${suffix}`).catch(() => ({ data: {} })),
        api.get("/api/branches").catch(() => ({ data: [] })),
        api.get("/api/warehouses").catch(() => ({ data: [] })),
        api.get(`/api/sales-report?dashboard=true${suffix.replace("?", "&")}`).catch(() => ({ data: [] })),
        api.get(`/api/dashboard/inventory-metrics${suffix}`).catch(() => ({
          data: { currentBalances: [], inMovements: [], outMovements: [] },
        })),
      ]);

      const summary = summaryRes.data || {};
      const branches = branchesRes.data || [];
      const warehouses = warehousesRes.data || [];
      const sales = salesRes.data || [];
      const invData = inventoryMetricsRes.data || {};

      // 1. Map Counts from Unified Summary
      stats.value.totalBranches = summary.counts?.total_branches || branches.length;
      stats.value.branchesList = branches;
      stats.value.totalEmployees = summary.counts?.total_employees || 0;
      stats.value.totalWarehouses = summary.counts?.total_warehouses || warehouses.length;
      stats.value.warehousesList = warehouses;
      stats.value.totalRecipes = summary.counts?.total_recipes || 0;
      stats.value.totalSuppliers = summary.counts?.total_suppliers || 0;
      stats.value.totalBakerReports = summary.counts?.total_baker_reports || 0;
      stats.value.lowStockItems = summary.low_stock_count || 0;

      // 2. Map Financials from Summary (Optional fallback to raw sales processing)
      rawSales.value = sales;

      // 3. Map Recent Activity
      stats.value.recentActivity = (summary.recent_activity || []).map((log) => ({
        id: log.id,
        action: log.action || "System Action",
        details: log.details || "",
        time: log.time,
      }));

      // 4. Group sales by branch for distribution chart
      updateBranchDistribution();

      inventoryBalances.value = invData.currentBalances || [];
      rawInventoryIn.value = invData.inMovements || [];
      rawInventoryOut.value = invData.outMovements || [];

      // Paginated items (Keep separate for now as they are specific feeds)
      fetchRMTransactions(1, 5);

      processTimeRangeData();
      processInventoryTimeRangeData();
      fetchPredictiveStocking();
      fetchRecipeCostMetrics();
      fetchProfitMargins(selectedBranch.value);

    } catch (err) {
      console.error("Dashboard error:", err);
      error.value = "Failed to load dashboard";
    } finally {
      loading.value = false;
    }
  };


  const fetchPredictiveStocking = async (params = {}) => {
    try {
      let suffix = "";
      
      if (params.branch_id) {
        suffix = `?branch_id=${params.branch_id}`;
      } else if (params.warehouse_id) {
        suffix = `?warehouse_id=${params.warehouse_id}`;
      } else if (selectedBranch.value !== "global") {
        if (String(selectedBranch.value).startsWith("warehouse-")) {
          const wId = selectedBranch.value.split("-")[1];
          suffix = `?warehouse_id=${wId}`;
        } else {
          suffix = `?branch_id=${selectedBranch.value}`;
        }
      }

      const res = await api.get(`/api/dashboard/predictive-stocking${suffix}`);
      predictiveStocking.value = res.data?.data || [];
    } catch (err) {
      console.error("Failed to fetch predictive stocking:", err);
    }
  };

  const fetchRecipeCostMetrics = async () => {
    try {
      const res = await api.get("/api/dashboard/recipe-cost-metrics");
      recipeCostMetrics.value = {
        averageCost: res.data?.averageCost || 0,
        topRecipes: res.data?.topRecipes || [],
        recentChanges: res.data?.recentChanges || [],
      };
    } catch (err) {
      console.error("Failed to fetch recipe cost metrics:", err);
    }
  };

  const fetchProfitMargins = async (branchIdParam = null) => {
    try {
      let suffix = "";
      const bId = branchIdParam || selectedBranch.value;
      
      if (bId !== "global") {
        if (String(bId).startsWith("warehouse-")) {
          const wId = bId.split("-")[1];
          suffix = `?warehouse_id=${wId}`;
        } else {
          suffix = `?branch_id=${bId}`;
        }
      }
      const res = await api.get(`/api/dashboard/profit-margins${suffix}`);
      profitMargins.value = res.data?.data || [];
    } catch (err) {
      console.error("Failed to fetch profit margins:", err);
    }
  };

  // =========================
  // RETURN
  // =========================
  return {
    stats,
    rawSales,
    inventoryBalances,
    rawInventoryIn,
    rawInventoryOut,
    inventoryLabels,
    inventoryInData,
    inventoryOutData,
    predictiveStocking,
    recipeCostMetrics,
    profitMargins,
    rmTransactions,
    rmTransactionsPagination,
    timeRange,
    chartLabels,
    selectedBranch,
    loading,
    error,

    setTimeRange,
    setBranch,
    fetchDashboardMetrics,
    fetchRMTransactions,
    fetchPredictiveStocking,
    fetchRecipeCostMetrics,
    fetchProfitMargins,
  };
});
