import { defineStore } from "pinia";
import { Notify } from "quasar";
import { api } from "src/boot/axios";

export const useSalesReportsStore = defineStore("salesReports", {
  state: () => ({
    salesReport: [],
    products: [],
    branchProducts: [],
    breadProducts: [],
    selectaProducts: [],
    softdrinksProducts: [],
    cakeProducts: [],
    othersProducts: [],
    reports: [],
    user: {},
    employeeInShift: [],
    breadReports: [],
    selectaReports: [],
    softdrinksReports: [],
    cakeReports: [],
    otherProductsReports: [],
    withReceiptExpensesReports: [],
    withOutReceiptExpensesReport: [],
    employeeCreditReports: [],
    denominationReports: {
      oneThousandBills: 0,
      fiveHundredBills: 0,
      twoHundredBills: 0,
      oneHundredBills: 0,
      fiftyBills: 0,
      twentyBills: 0,
      twentyCoins: 0,
      tenCoins: 0,
      fiveCoins: 0,
      oneCoins: 0,
      twentyFiveCents: 0,
    },
    productsTotalAmount: 0,
    expensesTotalAmount: 0,
    employeeCreditTotalAmount: 0,
    denominationTotal: 0,
    charges: 0,
    overTotal: 0,
    isSubmitting: false,
  }),

  actions: {
    logout() {
      this.$reset();

      // Reset this store initial state
      // this.salesReport = [];
      // this.products = [];
      // this.branchProducts = [];
      // this.breadProducts = [];
      // this.selectaProducts = [];
      // this.softdrinksProducts = [];
      // this.cakeProducts = [];
      // this.othersProducts = [];
      // this.reports = [];
      // this.employeeInShift = [];
      // this.breadReports = [];
      // this.selectaReports = [];
      // this.softdrinksReports = [];
      // this.cakeReports = [];
      // this.otherProductsReports = [];
      // this.withReceiptExpensesReports = [];
      // this.withOutReceiptExpensesReport = [];
      // this.employeeCreditReports = [];
      // this.denominationReports = [];
      // this.productsTotalAmount = 0;
      // this.expensesTotalAmount = 0;
      // this.employeeCreditTotalAmount = 0;
      // this.denominationTotal = 0;
      // this.charges = 0;
      // this.overTotal = 0;
    },
    setUser(user) {
      this.user = user;
    },

    removeBread(index) {
      this.breadReports.splice(index, 1);
      this.updateProductsTotalAmount();
      this.calculateCharges(this.denominationTotal);
    },
    removeSelecta(index) {
      this.selectaReports.splice(index, 1);
      this.updateProductsTotalAmount();
      this.calculateCharges(this.denominationTotal);
    },
    removeSoftdrink(index) {
      this.softdrinksReports.splice(index, 1);
      this.updateProductsTotalAmount();
      this.calculateCharges(this.denominationTotal);
    },
    removeCake(index) {
      this.cakeReports.splice(index, 1);
      this.updateProductsTotalAmount();
      this.calculateCharges(this.denominationTotal);
    },
    removeOtherProducts(index) {
      this.otherProductsReports.splice(index, 1);
      this.updateProductsTotalAmount();
      this.calculateCharges(this.denominationTotal);
    },
    removeEmployeeCreditReport(index) {
      this.employeeCreditReports.splice(index, 1);
      // this.updateEmployeeCreditReports();
    },
    removeWithReceiptExpenses(index) {
      this.withReceiptExpensesReports.splice(index, 1);
      this.updateProductsTotalAmount();
      this.calculateCharges(this.denominationTotal);
    },
    removeExpenses(index) {
      this.withOutReceiptExpensesReport.splice(index, 1);
      this.updateProductsTotalAmount();
      this.calculateCharges(this.denominationTotal);
    },

    filterBreadproducts() {
      this.breadProducts = this.branchProducts.filter(
        (product) => product.category === "Bread"
      );
    },
    filterSelectaproducts() {
      this.selectaProducts = this.branchProducts.filter(
        (product) => product.category === "Selecta"
      );
    },
    filterSoftdrinksproducts() {
      this.softdrinksProducts = this.branchProducts.filter(
        (product) => product.category === "Softdrinks"
      );
    },
    filterOthersproducts() {
      this.othersProducts = this.branchProducts.filter(
        (product) => product.category === "Others"
      );
    },

    updateBreadReport(report) {
      if (this.isSubmitting) return; // Prevent updates while submitting

      const index = this.breadReports.findIndex((r) => r.name === report.name);
      if (index !== -1) {
        this.breadReports.splice(index, 1, report);
      } else {
        this.breadReports.push(report);
      }
    },

    updateSelectaReport(report) {
      if (this.isSubmitting) return; // Prevent updates while submitting

      const index = this.selectaReports.findIndex(
        (r) => r.name === report.name
      );
      if (index !== -1) {
        this.selectaReports.splice(index, 1, report);
      } else {
        this.selectaReports.push(report);
      }
    },

    updateSoftdrinksReport(report) {
      if (this.isSubmitting) return; // Prevent updates while submitting

      const index = this.softdrinksReports.findIndex(
        (r) => r.name === report.name
      );
      if (index !== -1) {
        this.softdrinksReports.splice(index, 1, report);
      } else {
        this.softdrinksReports.push(report);
      }
    },
    // updateSoftdrinksReport(report) {
    //   const index = this.softdrinksReports.findIndex(
    //     (r) => r.name === report.name
    //   );
    //   if (index !== -1) {
    //     this.softdrinksReports.splice(index, 1, report);
    //   } else {
    //     this.softdrinksReports.push(report);
    //   }
    // },

    updateCakeReport(report) {
      if (this.isSubmitting) return; // Prevent updates while submitting

      const index = this.cakeReports.findIndex((r) => r.name === report.name);
      if (index !== -1) {
        this.cakeReports.splice(index, 1, report);
      } else {
        this.cakeReports.push(report);
      }
    },

    updateOtherProductsReport(report) {
      if (this.isSubmitting) return; // Prevent updates while submitting

      const index = this.otherProductsReports.findIndex(
        (r) => r.name === report.name
      );
      if (index !== -1) {
        this.otherProductsReports.splice(index, 1, report);
      } else {
        this.otherProductsReports.push(report);
      }
    },

    updateEmployeeCreditReports(report) {
      if (this.isSubmitting) return; // Prevent updates while submitting

      this.employeeCreditReports.push(report);
      this.updateExpensesTotalAmount();
      this.calculateCharges(this.denominationTotal); // Ensure charges update
    },

    updateWithReceiptExpensesReport(report) {
      console.log("report to with receipt data expense in store", report);
      this.withReceiptExpensesReports.push(report);
      this.updateExpensesTotalAmount();
    },

    updateWithOutReceiptExpensesReport(report) {
      this.withOutReceiptExpensesReport.push(report);
      this.updateExpensesTotalAmount();
      this.calculateCharges(this.denominationTotal); // Ensure charges update
      // const index = this.withOutReceiptExpensesReport.findIndex(
      //   (r) => r.name === report.name
      // );
      // if (index !== -1) {
      //   this.withOutReceiptExpensesReport.splice(index, 1, report);
      // } else {
      //   this.withOutReceiptExpensesReport.push(report);
      // }
    },

    getDenominationData(report) {
      if (this.isSubmitting) return; // Prevent updates while submitting

      this.denominationReports = {
        ...report,
      };
    },

    updateDenominationTotal(total) {
      this.denominationTotal = total;
    },

    calculateCharges(rawTotalDenomination) {
      const totalSalesAmount =
        this.breadTotalAmount +
        this.selectaTotalAmount +
        this.softdrinksTotalAmount +
        this.otherProductsTotalAmount +
        this.cakeTotalAmount -
        this.creditExpensesTotal;
      console.log("Total Sales Amount:", totalSalesAmount);
      if (rawTotalDenomination < totalSalesAmount) {
        this.charges = totalSalesAmount - rawTotalDenomination;
        this.overTotal = 0;
      } else {
        this.charges = 0;
        this.overTotal = rawTotalDenomination - totalSalesAmount;
      }
      console.log("Chargessss:", this.charges);
      console.log("Charges total:", this.overTotal);
    },

    updateProductsTotalAmount() {
      this.productsTotalAmount =
        this.breadTotalAmount +
        this.selectaTotalAmount +
        this.softdrinksTotalAmount +
        this.cakeTotalAmount +
        this.otherProductsTotalAmount;
    },
    updateExpensesTotalAmount() {
      this.expensesTotalAmount = this.expensesSumAmount;
    },

    async searchBranchProducts(productSearch, branchId) {
      console.log("productSearch", productSearch);
      console.log("branchId", branchId);

      try {
        const response = await api.post("/api/search-products", {
          keyword: productSearch,
          branch_id: branchId,
        });
        this.products = response.data;
        console.log("search Products", response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    },

    async fetchBranchProducts(branchId) {
      console.log("Branch ID", branchId);
      const response = await api.get(`/api/branches/${branchId}/products`);
      this.branchProducts = response.data;
      this.filterBreadproducts();
      this.filterSelectaproducts();
      this.filterSoftdrinksproducts();
      this.filterOthersproducts();
    },

    async fetchSalesReports(branchId, page, rowsPerPage) {
      try {
        const response = await api.get(
          `/api/branches/${branchId}/branch-sales-report`,
          {
            params: { page: page, per_page: rowsPerPage },
          }
        );
        console.log("sales report", response.data);
        this.salesReport = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async adminSubmitReports(data) {
      console.log("data.data", data);
      console.log("data.user_id", data.user_id);
      console.log("data.branch_id", data.branch_id);
      console.log("data.created_at", data.created_at);

      // Calculate creditTotalAmount outside the payload
      const creditTotalAmount = this.creditTotalAmount;

      const payload = {
        user_id: data.user_id,
        employee_in_shift: this.employeeInShift,
        branch_id: data.branch_id,
        created_at: data.created_at,
        breadReports: this.breadReports,
        selectaReports: this.selectaReports,
        softdrinksReports: this.softdrinksReports,
        otherProductsReports: this.otherProductsReports,
        cakeReports: this.cakeReports,
        withOutReceiptExpensesReport: this.withOutReceiptExpensesReport,
        denominationReports: this.denominationReports,
        creditReports: this.employeeCreditReports,
        denomination_total: this.denominationTotal,
        expenses_total: this.expensesSumAmount,
        products_total_sales: this.totalSalesAmount,
        charges_amount: this.charges,
        over_total: this.overTotal,
        credit_total: this.creditTotalAmount, // Use the calculated value here
      };

      console.log("Payload data:", payload);

      try {
        const salesReportData = await api.post(
          "/api/admin-sales-report",
          payload
        );
        Notify.create({
          type: "positive",
          message: "Report submitted successfully",
        });

        this.breadReports = [];
        this.employeeInShift = [];
        this.selectaReports = [];
        this.softdrinksReports = [];
        this.otherProductsReports = [];
        this.withOutReceiptExpensesReport = [];
        this.denominationReports = [];
        this.employeeCreditReports = [];
        this.cakeReports = [];
        this.denominationTotal = 0;
        this.expensesTotalAmount = 0;
        this.productsTotalAmount = 0;
        // this.cakeTotalAmount = 0;
        // this.creditTotalAmount = 0;
        // this.creditExpensesTotal = 0;
        this.charges = 0;
        this.overTotal = 0;

        console.log("Sales Reports Data", salesReportData);
      } catch (error) {
        console.error("Error submitting data:", error);
        Notify.create({
          type: "negative",
          message: "Error submitting report",
        });
      }
    },

    async submitSalesReports() {
      // Calculate creditTotalAmount outside the payload
      const creditTotalAmount = this.creditTotalAmount;

      const payload = {
        user_id: this.user.data.id,
        employee_in_shift: this.employeeInShift,
        branch_id: this.user?.device?.reference_id,
        breadReports: this.breadReports,
        selectaReports: this.selectaReports,
        softdrinksReports: this.softdrinksReports,
        otherProductsReports: this.otherProductsReports,
        cakeReports: this.cakeReports,
        withOutReceiptExpensesReport: this.withOutReceiptExpensesReport,
        denominationReports: this.denominationReports,
        creditReports: this.employeeCreditReports,
        denomination_total: this.denominationTotal,
        expenses_total: this.expensesSumAmount,
        products_total_sales: this.totalSalesAmount,
        charges_amount: this.charges,
        over_total: this.overTotal,
        credit_total: this.creditTotalAmount, // Use the calculated value here
      };

      console.log("Payload data:", payload);

      try {
        const salesReportData = await api.post("/api/sales-report", payload);
        console.log("Data submitted successfully");
        Notify.create({
          type: "positive",
          message: "Report submitted successfully",
        });

        this.breadReports = [];
        this.employeeInShift = [];
        this.selectaReports = [];
        this.softdrinksReports = [];
        this.otherProductsReports = [];
        this.withOutReceiptExpensesReport = [];
        this.denominationReports = [];
        this.employeeCreditReports = [];
        this.cakeReports = [];
        this.denominationTotal = 0;
        this.expensesTotalAmount = 0;
        this.productsTotalAmount = 0;
        // this.cakeTotalAmount = 0;
        // this.creditTotalAmount = 0;
        // this.creditExpensesTotal = 0;
        this.charges = 0;
        this.overTotal = 0;

        console.log("Sales Reports Data", salesReportData);
      } catch (error) {
        console.error("Error submitting data:", error);
        Notify.create({
          type: "negative",
          message: "Error submitting report",
        });
      }
    },
  },

  getters: {
    breadTotalAmount: (state) => {
      return state.breadReports.reduce(
        (total, report) => total + report.sales,
        0
      );
    },
    selectaTotalAmount: (state) => {
      return state.selectaReports.reduce(
        (total, report) => total + report.sales,
        0
      );
    },
    softdrinksTotalAmount: (state) => {
      return state.softdrinksReports.reduce(
        (total, report) => total + report.sales,
        0
      );
    },
    otherProductsTotalAmount: (state) => {
      return state.otherProductsReports.reduce(
        (total, report) => total + report.sales,
        0
      );
    },
    cakeTotalAmount: (state) => {
      return state.cakeReports
        .filter((report) => report.sales_status === "sold")
        .reduce((total, report) => total + Number(report.price), 0);
    },
    expensesSumAmount: (state) => {
      return state.withOutReceiptExpensesReport.reduce(
        (total, report) => total + report.amount,
        0
      );
    },
    creditTotalAmount: (state) => {
      return state.employeeCreditReports.reduce((total, report) => {
        return total + report.total_amount;
      }, 0);
    },

    creditExpensesTotal: (state) => {
      return state.expensesSumAmount + state.creditTotalAmount;
    },

    getDenominationTotal: (state) => {
      return state.denominationTotal;
    },
    getCharges: (state) => {
      return state.charges;
    },
    totalSalesAmount: (state) => {
      return (
        state.breadTotalAmount +
        state.selectaTotalAmount +
        state.softdrinksTotalAmount +
        state.otherProductsTotalAmount +
        state.cakeTotalAmount
      );
    },
  },
});

// import { defineStore } from "pinia";
// import { Notify } from "quasar";
// import { api } from "src/boot/axios";

// export const useSalesReportsStore = defineStore("salesReports", {
//   /* ================= STATE ================= */

//   state: () => ({
//     // products
//     products: [],
//     branchProducts: [],
//     breadProducts: [],
//     selectaProducts: [],
//     softdrinksProducts: [],
//     cakeProducts: [],
//     othersProducts: [],

//     // reports
//     breadReports: [],
//     selectaReports: [],
//     softdrinksReports: [],
//     cakeReports: [],
//     otherProductsReports: [],

//     // expenses & credits
//     withReceiptExpensesReports: [],
//     withOutReceiptExpensesReport: [],
//     employeeCreditReports: [],

//     // denomination
//     denominationReports: [],
//     denominationTotal: 0,

//     // misc
//     employeeInShift: [],
//     salesReport: [],
//     user: {},

//     // lock
//     isSubmitting: false,
//   }),

//   /* ================= ACTIONS ================= */

//   actions: {
//     /* ---------- USER ---------- */

//     setUser(user) {
//       this.user = user;
//     },

//     /* ---------- HELPERS ---------- */

//     upsert(list, report, key = "name") {
//       if (this.isSubmitting) return;

//       const index = list.findIndex(r => r[key] === report[key]);
//       index !== -1
//         ? list.splice(index, 1, report)
//         : list.push(report);
//     },

//     removeByIndex(list, index) {
//       if (this.isSubmitting) return;
//       list.splice(index, 1);
//     },

//     /* ---------- PRODUCT REPORTS ---------- */

//     updateBreadReport(report) {
//       this.upsert(this.breadReports, report);
//     },
//     updateSelectaReport(report) {
//       this.upsert(this.selectaReports, report);
//     },
//     updateSoftdrinksReport(report) {
//       this.upsert(this.softdrinksReports, report);
//     },
//     updateCakeReport(report) {
//       this.upsert(this.cakeReports, report);
//     },
//     updateOtherProductsReport(report) {
//       this.upsert(this.otherProductsReports, report);
//     },

//     removeBread(index) {
//       this.removeByIndex(this.breadReports, index);
//     },
//     removeSelecta(index) {
//       this.removeByIndex(this.selectaReports, index);
//     },
//     removeSoftdrink(index) {
//       this.removeByIndex(this.softdrinksReports, index);
//     },
//     removeCake(index) {
//       this.removeByIndex(this.cakeReports, index);
//     },
//     removeOtherProducts(index) {
//       this.removeByIndex(this.otherProductsReports, index);
//     },

//     /* ---------- EXPENSES ---------- */

//     addWithReceiptExpense(report) {
//       if (this.isSubmitting) return;
//       this.withReceiptExpensesReports.push(report);
//     },

//     addWithOutReceiptExpense(report) {
//       if (this.isSubmitting) return;
//       this.withOutReceiptExpensesReport.push(report);
//     },

//     removeWithReceiptExpense(index) {
//       this.removeByIndex(this.withReceiptExpensesReports, index);
//     },

//     removeWithOutReceiptExpense(index) {
//       this.removeByIndex(this.withOutReceiptExpensesReport, index);
//     },

//     /* ---------- CREDIT ---------- */

//     addEmployeeCredit(report) {
//       if (this.isSubmitting) return;
//       this.employeeCreditReports.push(report);
//     },

//     removeEmployeeCredit(index) {
//       this.removeByIndex(this.employeeCreditReports, index);
//     },

//     /* ---------- DENOMINATION ---------- */

//     setDenominationReports(reports) {
//       if (this.isSubmitting) return;
//       this.denominationReports = reports;
//     },

//     setDenominationTotal(total) {
//       if (this.isSubmitting) return;
//       this.denominationTotal = Number(total);
//     },

//     /* ---------- PRODUCTS FILTER ---------- */

//     filterBreadProducts() {
//       this.breadProducts = this.branchProducts.filter(
//         p => p.category === "Bread"
//       );
//     },
//     filterSelectaProducts() {
//       this.selectaProducts = this.branchProducts.filter(
//         p => p.category === "Selecta"
//       );
//     },
//     filterSoftdrinksProducts() {
//       this.softdrinksProducts = this.branchProducts.filter(
//         p => p.category === "Softdrinks"
//       );
//     },
//     filterOthersProducts() {
//       this.othersProducts = this.branchProducts.filter(
//         p => p.category === "Others"
//       );
//     },

//     /* ---------- API ---------- */

//     async searchBranchProducts(keyword, branchId) {
//       const res = await api.post("/api/search-products", {
//         keyword,
//         branch_id: branchId,
//       });
//       this.products = res.data;
//     },

//     async fetchBranchProducts(branchId) {
//       const res = await api.get(`/api/branches/${branchId}/products`);
//       this.branchProducts = res.data;

//       this.filterBreadProducts();
//       this.filterSelectaProducts();
//       this.filterSoftdrinksProducts();
//       this.filterOthersProducts();
//     },

//     async fetchSalesReports(branchId, page, rowsPerPage) {
//       const res = await api.get(
//         `/api/branches/${branchId}/branch-sales-report`,
//         { params: { page, per_page: rowsPerPage } }
//       );
//       this.salesReport = res.data;
//     },

//     /* ---------- RESET ---------- */

//     resetReportState() {
//       this.isSubmitting = true;

//       this.breadReports = [];
//       this.selectaReports = [];
//       this.softdrinksReports = [];
//       this.cakeReports = [];
//       this.otherProductsReports = [];

//       this.withReceiptExpensesReports = [];
//       this.withOutReceiptExpensesReport = [];
//       this.employeeCreditReports = [];
//       this.denominationReports = [];
//       this.employeeInShift = [];

//       this.denominationTotal = 0;

//       this.isSubmitting = false;
//     },

//     /* ---------- SUBMIT ---------- */

//     async submitSalesReports() {
//       if (this.isSubmitting) return;
//       this.isSubmitting = true;

//       const payload = {
//         user_id: this.user.data.id,
//         branch_id: this.user?.device?.reference_id,

//         breadReports: this.breadReports,
//         selectaReports: this.selectaReports,
//         softdrinksReports: this.softdrinksReports,
//         cakeReports: this.cakeReports,
//         otherProductsReports: this.otherProductsReports,

//         withReceiptExpensesReports: this.withReceiptExpensesReports,
//         withOutReceiptExpensesReport: this.withOutReceiptExpensesReport,
//         creditReports: this.employeeCreditReports,

//         denominationReports: this.denominationReports,
//         denomination_total: this.denominationTotal,

//         products_total_sales: this.productsTotalAmount,
//         expenses_total: this.expensesTotalAmount,
//         credit_total: this.creditTotalAmount,

//         charges_amount: this.chargesAmount,
//         over_total: this.overTotal,
//       };

//       try {
//         await api.post("/api/sales-report", payload);

//         Notify.create({
//           type: "positive",
//           message: "Report submitted successfully",
//         });

//         this.resetReportState();
//       } catch (e) {
//         Notify.create({
//           type: "negative",
//           message: "Error submitting report",
//         });
//       } finally {
//         this.isSubmitting = false;
//       }
//     },
//   },

//   /* ================= GETTERS ================= */

//   getters: {
//     breadTotalAmount: (s) =>
//       s.breadReports.reduce((t, r) => t + Number(r.sales || 0), 0),

//     selectaTotalAmount: (s) =>
//       s.selectaReports.reduce((t, r) => t + Number(r.sales || 0), 0),

//     softdrinksTotalAmount: (s) =>
//       s.softdrinksReports.reduce((t, r) => t + Number(r.sales || 0), 0),

//     otherProductsTotalAmount: (s) =>
//       s.otherProductsReports.reduce((t, r) => t + Number(r.sales || 0), 0),

//     cakeTotalAmount: (s) =>
//       s.cakeReports
//         .filter(r => r.sales_status === "sold")
//         .reduce((t, r) => t + Number(r.price || 0), 0),

//     productsTotalAmount() {
//       return (
//         this.breadTotalAmount +
//         this.selectaTotalAmount +
//         this.softdrinksTotalAmount +
//         this.otherProductsTotalAmount +
//         this.cakeTotalAmount
//       );
//     },

//     expensesTotalAmount: (s) =>
//       s.withOutReceiptExpensesReport.reduce(
//         (t, r) => t + Number(r.amount || 0),
//         0
//       ),

//     creditTotalAmount: (s) =>
//       s.employeeCreditReports.reduce(
//         (t, r) => t + Number(r.total_amount || 0),
//         0
//       ),

//     netSalesAmount() {
//       return (
//         this.productsTotalAmount -
//         (this.expensesTotalAmount + this.creditTotalAmount)
//       );
//     },

//     chargesAmount() {
//       return this.netSalesAmount > this.denominationTotal
//         ? this.netSalesAmount - this.denominationTotal
//         : 0;
//     },

//     overTotal() {
//       return this.denominationTotal > this.netSalesAmount
//         ? this.denominationTotal - this.netSalesAmount
//         : 0;
//     },
//   },
// });
