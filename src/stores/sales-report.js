import { defineStore } from "pinia";
import { Notify } from "quasar";
import { api } from "src/boot/axios";

const CONFIRMATION_ENDPOINTS = {
  bread: "confirm-bread-sales-report",
  selecta: "confirm-selecta-sales-report",
  softdrinks: "confirm-softdrinks-sales-report",
  other: "confirm-other-sales-report",
};

const DECLINE_ENDPOINTS = {
  bread: "decline-bread-sales-report",
  selecta: "decline-selecta-sales-report",
  softdrinks: "decline-softdrinks-sales-report",
  other: "decline-other-sales-report",
};

export const useSalesReportsStore = defineStore("salesReports", {
  state: () => ({
    salesReport: [],
    branchPendingSalesReport: [],
    products: [],
    branchProducts: [],
    breadProducts: [],
    selectaProducts: [],
    nestleProducts: [],
    softdrinksProducts: [],
    cakeProducts: [],
    othersProducts: [],
    reports: [],
    user: {},
    employeeInShift: [],
    breadReports: [],
    selectaReports: [],
    nestleReports: [],
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

    removeNestle(index) {
      this.nestleReports.splice(index, 1);
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
      this.updateExpensesTotalAmount();
      this.calculateCharges(this.denominationTotal);
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

    filterNestleproducts() {
      this.nestleProducts = this.branchProducts.filter(
        (product) => product.category === "Nestle"
      );

      console.log("nestleProducts", this.nestleProducts);
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
      console.log("selectaReports", this.selectaReports);
    },

    updateNestleReport(report) {
      if (this.isSubmitting) return; // Prevent updates while submitting

      const index = this.nestleReports.findIndex((r) => r.name === report.name);
      if (index !== -1) {
        this.nestleReports.splice(index, 1, report);
      } else {
        this.nestleReports.push(report);
      }

      console.log("nestleReports", this.nestleReports);
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
        this.nestleTotalAmount +
        this.softdrinksTotalAmount +
        this.otherProductsTotalAmount +
        this.cakeTotalAmount -
        this.creditExpensesTotal;
      console.log("Total Sales Amount:", totalSalesAmount);

      const adjustedTotalSales =
        totalSalesAmount +
        this.breadNegativeTotal +
        this.selectaNegativeTotal +
        this.softdrinksNegativeTotal +
        this.otherProductsNegativeTotal;

      if (rawTotalDenomination < adjustedTotalSales) {
        this.charges = adjustedTotalSales - rawTotalDenomination;
        this.overTotal = 0;
      } else {
        this.charges = 0;
        this.overTotal = rawTotalDenomination - adjustedTotalSales;
      }
      console.log("Chargessss:", this.charges);
      console.log("Charges total:", this.overTotal);
    },

    updateProductsTotalAmount() {
      this.productsTotalAmount =
        this.breadTotalAmount +
        this.selectaTotalAmount +
        this.nestleTotalAmount +
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
      console.log("branchProducts", response.data);
      this.filterBreadproducts();
      this.filterSelectaproducts();
      this.filterSoftdrinksproducts();
      this.filterOthersproducts();
      this.filterNestleproducts();
    },

    async fetchBranchPendingSalesReport(userId, branchId) {
      console.log("Branch IDsssss", branchId);
      console.log("User IDsssss", userId);
      try {
        const response = await api.get(
          `/api/branches/${branchId}/${userId}/pending-branch-sales-report`
        );
        this.branchPendingSalesReport = response.data;
        console.log("branchPendingSalesReport", response.data);
      } catch (error) {
        console.log("Error fetching pending sales report", error);
      }
    },

    async fetchSalesReports(branchId, page, rowsPerPage) {
      try {
        const response = await api.get(
          `/api/branches/${branchId}/branch-sales-report`,
          {
            params: { page: page, per_page: rowsPerPage },
          }
        );
        console.log("sales reportssss", response.data);
        this.salesReport = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async confirmProductsReport(payload) {
      console.log("Payloadssss data:", payload);

      try {
        const response = await api.post(
          "/api/confirm-product-sales-report",
          payload
        );

        console.log("ressssssss", response.data);

        this.removePendingProductItem({
          sales_report_id: response.data.sales_report_id,
          type: response.data.type,
          product_id: response.data.product_id,
        });

        this.updateNestedProductStatus(
          response.data.sales_report_id,
          response.data.type,
          response.data.product_id,
          response.data.status
        );

        console.log("salesReportsssss", this.salesReport);

        Notify.create({
          message: response.data.message || "Product Confirmed Successfully",
          color: "positive",
        });

        console.log("response.data", response.data);
      } catch (error) {
        console.log(error);
        Notify.create({
          message: error.response.data.message,
          color: "negative",
        });
      }
    },

    async declineProductsReport(payload) {
      console.log("Payload datasssss:", payload);

      try {
        const response = await api.post(
          "/api/decline-product-sales-report",
          payload
        );

        console.log("asdfafsdf", response.data);

        this.removePendingProductItem({
          sales_report_id: response.data.sales_report_id,
          type: response.data.type,
          product_id: response.data.product_id,
        });

        this.updateNestedProductStatus(
          response.data.sales_report_id,
          response.data.type,
          response.data.product_id,
          response.data.status
        );

        Notify.create({
          message: "Product Declined Successfully",
          color: "positive",
        });

        console.log("response.data", response.data);
      } catch (error) {
        console.log(error);
      }
    },

    removePendingProductItem({ sales_report_id, type, product_id }) {
      // 1️⃣ find sales report
      const report = this.branchPendingSalesReport.find(
        (r) => r.sales_report_id === sales_report_id
      );

      if (!report) return;

      // 2️⃣ map type → array key
      const typeMap = {
        bread: "bread",
        selecta: "selecta",
        nestle: "nestle",
        softdrinks: "softdrinks",
        other: "others", // ⚠️ adjust if backend sends other_products
      };

      const key = typeMap[type];
      if (!key || !Array.isArray(report[key])) return;

      // 3️⃣ splice product by id
      const index = report[key].findIndex((item) => item.id === product_id);

      if (index !== -1) {
        report[key].splice(index, 1);
      }

      // 4️⃣ cleanup if all empty
      this.cleanupEmptySalesReport(sales_report_id);
    },

    cleanupEmptySalesReport(sales_report_id) {
      const index = this.branchPendingSalesReport.findIndex(
        (r) => r.sales_report_id === sales_report_id
      );

      if (index === -1) return;

      const report = this.branchPendingSalesReport[index];

      const isEmpty =
        report.bread.length === 0 &&
        report.selecta.length === 0 &&
        report.softdrinks.length === 0 &&
        report.others.length === 0;

      if (isEmpty) {
        this.branchPendingSalesReport.splice(index, 1);
      }
    },

    // Update the sale report product status
    updateNestedProductStatus(salesReportId, type, productId, newStatus) {
      const property = {
        bread: "bread_reports",
        selecta: "selecta_reports",
        nestle: "nestle_reports",
        softdrinks: "softdrinks_reports",
        other: "other_products_reports",
      }[type];

      if (!property) return;

      // Access this.salesReport.data instead of this.salesReport
      if (!this.salesReport || !this.salesReport.data) {
        console.error("salesReport.data is undefined");
        return;
      }

      // loop through each day report in salesReport.data
      for (const day of this.salesReport.data) {
        // check both AM and PM
        for (const period of ["AM", "PM"]) {
          const reports = day[period]?.sales_reports;
          if (!reports) continue;

          // find the correct sales report
          const report = reports.find((r) => r.id === salesReportId);
          if (!report) continue;

          // find the correct product in the mapped property
          const product = report[property]?.find((p) => p.id === productId);

          if (product) {
            product.status = newStatus;
            console.log("Updated product status:", product);
            return;
          }
        }
      }

      console.warn("Product not found for update:", {
        salesReportId,
        type,
        productId,
      });
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
        nestleReports: this.nestleReports,
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
        this.nestleReports = [];
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
        nestleReports: this.nestleReports,
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

      console.log("Paylosssssad data:", payload);

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
        this.nestleReports = [];
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
    // breadTotalAmount: (state) => {
    //   return state.breadReports.reduce(
    //     (total, report) => total + report.sales,
    //     0
    //   );
    // },
    breadTotalAmount: (state) => {
      return state.breadReports.reduce((total, report) => {
        const sales = Number(report.sales || 0);

        // Only positive sales contribute to total_sales
        return sales > 0 ? total + sales : total;
      }, 0);
    },

    breadNegativeTotal: (state) => {
      return state.breadReports.reduce((total, report) => {
        const sales = Number(report.sales || 0);

        // Convert negative sales into positive charge amount
        return sales < 0 ? total + Math.abs(sales) : total;
      }, 0);
    },

    negativeBread: (state) => {
      return state.breadReports.filter(
        (report) => Number(report.sales || 0) < 0
      );
    },

    // selectaTotalAmount: (state) => {
    //   return state.selectaReports.reduce(
    //     (total, report) => total + report.sales,
    //     0
    //   );
    // },

    selectaTotalAmount: (state) => {
      return state.selectaReports.reduce((total, report) => {
        const sales = Number(report.sales || 0);

        // Only positive sales contribute to total_sales
        return sales > 0 ? total + sales : total;
      }, 0);
    },

    nestleTotalAmount: (state) => {
      return state.nestleReports.reduce((total, report) => {
        const sales = Number(report.sales || 0);

        // Only positive sales contribute to total_sales
        return sales > 0 ? total + sales : total;
      }, 0);
    },

    selectaNegativeTotal: (state) => {
      return state.selectaReports.reduce((total, report) => {
        const sales = Number(report.sales || 0);

        // Convert negative sales into positive charge amount
        return sales < 0 ? total + Math.abs(sales) : total;
      }, 0);
    },

    negativeSelecta: (state) => {
      return state.selectaReports.filter(
        (report) => Number(report.sales || 0) < 0
      );
    },

    // softdrinksTotalAmount: (state) => {
    //   return state.softdrinksReports.reduce(
    //     (total, report) => total + report.sales,
    //     0
    //   );
    // },

    softdrinksTotalAmount: (state) => {
      return state.softdrinksReports.reduce((total, report) => {
        const sales = Number(report.sales || 0);

        // Only positive sales contribute to total_sales
        return sales > 0 ? total + sales : total;
      }, 0);
    },

    softdrinksNegativeTotal: (state) => {
      return state.softdrinksReports.reduce((total, report) => {
        const sales = Number(report.sales || 0);

        // Convert negative sales into positive charge amount
        return sales < 0 ? total + Math.abs(sales) : total;
      }, 0);
    },

    negativeSoftdrinks: (state) => {
      return state.softdrinksReports.filter(
        (report) => Number(report.sales || 0) < 0
      );
    },

    // otherProductsTotalAmount: (state) => {
    //   return state.otherProductsReports.reduce(
    //     (total, report) => total + report.sales,
    //     0
    //   );
    // },

    otherProductsTotalAmount: (state) => {
      return state.otherProductsReports.reduce((total, report) => {
        const sales = Number(report.sales || 0);

        // Only positive sales contribute to total_sales
        return sales > 0 ? total + sales : total;
      }, 0);
    },

    otherProductsNegativeTotal: (state) => {
      return state.otherProductsReports.reduce((total, report) => {
        const sales = Number(report.sales || 0);

        // Convert negative sales into positive charge amount
        return sales < 0 ? total + Math.abs(sales) : total;
      }, 0);
    },

    negativeOtherProducts: (state) => {
      return state.otherProductsReports.filter(
        (report) => Number(report.sales || 0) < 0
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
        state.nestleTotalAmount +
        state.softdrinksTotalAmount +
        state.otherProductsTotalAmount +
        state.cakeTotalAmount
      );
    },
  },
});
