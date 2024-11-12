import { d as defineStore, N as Notify } from "./index.c8e2405b.js";
import { api } from "./axios.aa1bce92.js";
const useSalesReportsStore = defineStore("salesReports", {
  state: () => ({
    salesReport: [],
    products: [],
    branchProducts: [],
    breadProducts: [],
    selectaProducts: [],
    softdrinksProducts: [],
    reports: [],
    user: {},
    breadReports: [],
    selectaReports: [],
    softdrinksReports: [],
    expensesReports: [],
    employeeCreditReports: [],
    denominationReports: [],
    productsTotalAmount: 0,
    expensesTotalAmount: 0,
    employeeCreditTotalAmount: 0,
    denominationTotal: 0,
    charges: 0,
    overTotal: 0
  }),
  actions: {
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
    removeEmployeeCreditReport(index) {
      this.employeeCreditReports.splice(index, 1);
    },
    removeExpenses(index) {
      this.expensesReports.splice(index, 1);
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
    updateBreadReport(report) {
      const index = this.breadReports.findIndex((r) => r.name === report.name);
      if (index !== -1) {
        this.breadReports.splice(index, 1, report);
      } else {
        this.breadReports.push(report);
      }
    },
    updateSelectaReport(report) {
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
      const index = this.softdrinksReports.findIndex(
        (r) => r.name === report.name
      );
      if (index !== -1) {
        this.softdrinksReports.splice(index, 1, report);
      } else {
        this.softdrinksReports.push(report);
      }
    },
    updateEmployeeCreditReports(report) {
      this.employeeCreditReports.push(report);
    },
    updateExpensesReport(report) {
      const index = this.expensesReports.findIndex(
        (r) => r.name === report.name
      );
      if (index !== -1) {
        this.expensesReports.splice(index, 1, report);
      } else {
        this.expensesReports.push(report);
      }
    },
    getDenominationData(report) {
      this.denominationReports.push(report);
    },
    updateDenominationTotal(total) {
      this.denominationTotal = total;
    },
    calculateCharges(rawTotalDenomination) {
      const totalSalesAmount = this.breadTotalAmount + this.selectaTotalAmount + this.softdrinksTotalAmount - this.creditExpensesTotal;
      if (rawTotalDenomination < totalSalesAmount) {
        this.charges = totalSalesAmount - rawTotalDenomination;
        this.overTotal = 0;
      } else {
        this.charges = 0;
        this.overTotal = rawTotalDenomination - totalSalesAmount;
      }
      console.log("Charges:", this.charges);
      console.log("Charges:", this.overTotal);
    },
    updateProductsTotalAmount() {
      this.productsTotalAmount = this.breadTotalAmount + this.selectaTotalAmount + this.softdrinksTotalAmount;
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
          branch_id: branchId
        });
        this.products = response.data;
        console.log("search Products", response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    },
    async fetchBranchProducts(branchId) {
      const response = await api.get(`/api/branches/${branchId}/products`);
      this.branchProducts = response.data;
      this.filterBreadproducts();
      this.filterSelectaproducts();
      this.filterSoftdrinksproducts();
    },
    async fetchSalesReports(branchId) {
      try {
        const response = await api.get(`/api/branch/${branchId}/salesReport`);
        console.log("sales report", response.data);
        this.salesReport = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async submitSalesReports() {
      var _a, _b, _c;
      this.creditTotalAmount;
      const payload = {
        user_id: this.user.id,
        branch_id: (_c = (_b = (_a = this.user) == null ? void 0 : _a.data) == null ? void 0 : _b.employee) == null ? void 0 : _c.branch_employee.branch_id,
        breadReports: this.breadReports,
        selectaReports: this.selectaReports,
        softdrinksReports: this.softdrinksReports,
        expensesReports: this.expensesReports,
        denominationReports: this.denominationReports,
        creditReports: this.employeeCreditReports,
        denomination_total: this.denominationTotal,
        expenses_total: this.expensesSumAmount,
        products_total_sales: this.totalSalesAmount,
        charges_amount: this.charges,
        over_total: this.overTotal,
        credit_total: this.creditTotalAmount
      };
      console.log("Payload data:", payload);
      try {
        const salesReportData = await api.post("/api/sales-report", payload);
        console.log("Data submitted successfully");
        Notify.create({
          type: "positive",
          message: "Report submitted successfully"
        });
        this.breadReports = [];
        this.selectaReports = [];
        this.softdrinksReports = [];
        this.expensesReports = [];
        this.denominationReports = [];
        this.employeeCreditReports = [];
        this.denominationTotal = 0;
        this.expensesTotalAmount = 0;
        this.productsTotalAmount = 0;
        this.charges = 0;
        this.overTotal = 0;
        console.log("Sales Reports Data", salesReportData);
      } catch (error) {
        console.error("Error submitting data:", error);
        Notify.create({
          type: "negative",
          message: "Error submitting report"
        });
      }
    }
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
    expensesSumAmount: (state) => {
      return state.expensesReports.reduce(
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
      return state.breadTotalAmount + state.selectaTotalAmount + state.softdrinksTotalAmount;
    }
  }
});
export { useSalesReportsStore as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZXMtcmVwb3J0LmM2NWJmMmIxLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RvcmVzL3NhbGVzLXJlcG9ydC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWZpbmVTdG9yZSB9IGZyb20gXCJwaW5pYVwiO1xuaW1wb3J0IHsgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSBcInNyYy9ib290L2F4aW9zXCI7XG5cbmV4cG9ydCBjb25zdCB1c2VTYWxlc1JlcG9ydHNTdG9yZSA9IGRlZmluZVN0b3JlKFwic2FsZXNSZXBvcnRzXCIsIHtcbiAgc3RhdGU6ICgpID0+ICh7XG4gICAgc2FsZXNSZXBvcnQ6IFtdLFxuICAgIHByb2R1Y3RzOiBbXSxcbiAgICBicmFuY2hQcm9kdWN0czogW10sXG4gICAgYnJlYWRQcm9kdWN0czogW10sXG4gICAgc2VsZWN0YVByb2R1Y3RzOiBbXSxcbiAgICBzb2Z0ZHJpbmtzUHJvZHVjdHM6IFtdLFxuICAgIHJlcG9ydHM6IFtdLFxuICAgIHVzZXI6IHt9LFxuICAgIGJyZWFkUmVwb3J0czogW10sXG4gICAgc2VsZWN0YVJlcG9ydHM6IFtdLFxuICAgIHNvZnRkcmlua3NSZXBvcnRzOiBbXSxcbiAgICBleHBlbnNlc1JlcG9ydHM6IFtdLFxuICAgIGVtcGxveWVlQ3JlZGl0UmVwb3J0czogW10sXG4gICAgZGVub21pbmF0aW9uUmVwb3J0czogW10sXG4gICAgcHJvZHVjdHNUb3RhbEFtb3VudDogMCxcbiAgICBleHBlbnNlc1RvdGFsQW1vdW50OiAwLFxuICAgIGVtcGxveWVlQ3JlZGl0VG90YWxBbW91bnQ6IDAsXG4gICAgZGVub21pbmF0aW9uVG90YWw6IDAsXG4gICAgY2hhcmdlczogMCxcbiAgICBvdmVyVG90YWw6IDAsXG4gIH0pLFxuXG4gIGFjdGlvbnM6IHtcbiAgICBzZXRVc2VyKHVzZXIpIHtcbiAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4gICAgfSxcblxuICAgIHJlbW92ZUJyZWFkKGluZGV4KSB7XG4gICAgICB0aGlzLmJyZWFkUmVwb3J0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgdGhpcy51cGRhdGVQcm9kdWN0c1RvdGFsQW1vdW50KCk7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUNoYXJnZXModGhpcy5kZW5vbWluYXRpb25Ub3RhbCk7XG4gICAgfSxcbiAgICByZW1vdmVTZWxlY3RhKGluZGV4KSB7XG4gICAgICB0aGlzLnNlbGVjdGFSZXBvcnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB0aGlzLnVwZGF0ZVByb2R1Y3RzVG90YWxBbW91bnQoKTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlQ2hhcmdlcyh0aGlzLmRlbm9taW5hdGlvblRvdGFsKTtcbiAgICB9LFxuICAgIHJlbW92ZVNvZnRkcmluayhpbmRleCkge1xuICAgICAgdGhpcy5zb2Z0ZHJpbmtzUmVwb3J0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgdGhpcy51cGRhdGVQcm9kdWN0c1RvdGFsQW1vdW50KCk7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUNoYXJnZXModGhpcy5kZW5vbWluYXRpb25Ub3RhbCk7XG4gICAgfSxcbiAgICByZW1vdmVFbXBsb3llZUNyZWRpdFJlcG9ydChpbmRleCkge1xuICAgICAgdGhpcy5lbXBsb3llZUNyZWRpdFJlcG9ydHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIC8vIHRoaXMudXBkYXRlRW1wbG95ZWVDcmVkaXRSZXBvcnRzKCk7XG4gICAgfSxcbiAgICByZW1vdmVFeHBlbnNlcyhpbmRleCkge1xuICAgICAgdGhpcy5leHBlbnNlc1JlcG9ydHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHRoaXMudXBkYXRlUHJvZHVjdHNUb3RhbEFtb3VudCgpO1xuICAgICAgdGhpcy5jYWxjdWxhdGVDaGFyZ2VzKHRoaXMuZGVub21pbmF0aW9uVG90YWwpO1xuICAgIH0sXG5cbiAgICBmaWx0ZXJCcmVhZHByb2R1Y3RzKCkge1xuICAgICAgdGhpcy5icmVhZFByb2R1Y3RzID0gdGhpcy5icmFuY2hQcm9kdWN0cy5maWx0ZXIoXG4gICAgICAgIChwcm9kdWN0KSA9PiBwcm9kdWN0LmNhdGVnb3J5ID09PSBcIkJyZWFkXCJcbiAgICAgICk7XG4gICAgfSxcbiAgICBmaWx0ZXJTZWxlY3RhcHJvZHVjdHMoKSB7XG4gICAgICB0aGlzLnNlbGVjdGFQcm9kdWN0cyA9IHRoaXMuYnJhbmNoUHJvZHVjdHMuZmlsdGVyKFxuICAgICAgICAocHJvZHVjdCkgPT4gcHJvZHVjdC5jYXRlZ29yeSA9PT0gXCJTZWxlY3RhXCJcbiAgICAgICk7XG4gICAgfSxcbiAgICBmaWx0ZXJTb2Z0ZHJpbmtzcHJvZHVjdHMoKSB7XG4gICAgICB0aGlzLnNvZnRkcmlua3NQcm9kdWN0cyA9IHRoaXMuYnJhbmNoUHJvZHVjdHMuZmlsdGVyKFxuICAgICAgICAocHJvZHVjdCkgPT4gcHJvZHVjdC5jYXRlZ29yeSA9PT0gXCJTb2Z0ZHJpbmtzXCJcbiAgICAgICk7XG4gICAgfSxcblxuICAgIHVwZGF0ZUJyZWFkUmVwb3J0KHJlcG9ydCkge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmJyZWFkUmVwb3J0cy5maW5kSW5kZXgoKHIpID0+IHIubmFtZSA9PT0gcmVwb3J0Lm5hbWUpO1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLmJyZWFkUmVwb3J0cy5zcGxpY2UoaW5kZXgsIDEsIHJlcG9ydCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmJyZWFkUmVwb3J0cy5wdXNoKHJlcG9ydCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZVNlbGVjdGFSZXBvcnQocmVwb3J0KSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VsZWN0YVJlcG9ydHMuZmluZEluZGV4KFxuICAgICAgICAocikgPT4gci5uYW1lID09PSByZXBvcnQubmFtZVxuICAgICAgKTtcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RhUmVwb3J0cy5zcGxpY2UoaW5kZXgsIDEsIHJlcG9ydCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNlbGVjdGFSZXBvcnRzLnB1c2gocmVwb3J0KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlU29mdGRyaW5rc1JlcG9ydChyZXBvcnQpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zb2Z0ZHJpbmtzUmVwb3J0cy5maW5kSW5kZXgoXG4gICAgICAgIChyKSA9PiByLm5hbWUgPT09IHJlcG9ydC5uYW1lXG4gICAgICApO1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNvZnRkcmlua3NSZXBvcnRzLnNwbGljZShpbmRleCwgMSwgcmVwb3J0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc29mdGRyaW5rc1JlcG9ydHMucHVzaChyZXBvcnQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgdXBkYXRlRW1wbG95ZWVDcmVkaXRSZXBvcnRzKHJlcG9ydCkge1xuICAgICAgdGhpcy5lbXBsb3llZUNyZWRpdFJlcG9ydHMucHVzaChyZXBvcnQpO1xuICAgIH0sXG4gICAgdXBkYXRlRXhwZW5zZXNSZXBvcnQocmVwb3J0KSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuZXhwZW5zZXNSZXBvcnRzLmZpbmRJbmRleChcbiAgICAgICAgKHIpID0+IHIubmFtZSA9PT0gcmVwb3J0Lm5hbWVcbiAgICAgICk7XG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuZXhwZW5zZXNSZXBvcnRzLnNwbGljZShpbmRleCwgMSwgcmVwb3J0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZXhwZW5zZXNSZXBvcnRzLnB1c2gocmVwb3J0KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0RGVub21pbmF0aW9uRGF0YShyZXBvcnQpIHtcbiAgICAgIHRoaXMuZGVub21pbmF0aW9uUmVwb3J0cy5wdXNoKHJlcG9ydCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZURlbm9taW5hdGlvblRvdGFsKHRvdGFsKSB7XG4gICAgICB0aGlzLmRlbm9taW5hdGlvblRvdGFsID0gdG90YWw7XG4gICAgfSxcblxuICAgIGNhbGN1bGF0ZUNoYXJnZXMocmF3VG90YWxEZW5vbWluYXRpb24pIHtcbiAgICAgIGNvbnN0IHRvdGFsU2FsZXNBbW91bnQgPVxuICAgICAgICB0aGlzLmJyZWFkVG90YWxBbW91bnQgK1xuICAgICAgICB0aGlzLnNlbGVjdGFUb3RhbEFtb3VudCArXG4gICAgICAgIHRoaXMuc29mdGRyaW5rc1RvdGFsQW1vdW50IC1cbiAgICAgICAgdGhpcy5jcmVkaXRFeHBlbnNlc1RvdGFsO1xuICAgICAgaWYgKHJhd1RvdGFsRGVub21pbmF0aW9uIDwgdG90YWxTYWxlc0Ftb3VudCkge1xuICAgICAgICB0aGlzLmNoYXJnZXMgPSB0b3RhbFNhbGVzQW1vdW50IC0gcmF3VG90YWxEZW5vbWluYXRpb247XG4gICAgICAgIHRoaXMub3ZlclRvdGFsID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2hhcmdlcyA9IDA7XG4gICAgICAgIHRoaXMub3ZlclRvdGFsID0gcmF3VG90YWxEZW5vbWluYXRpb24gLSB0b3RhbFNhbGVzQW1vdW50O1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coXCJDaGFyZ2VzOlwiLCB0aGlzLmNoYXJnZXMpO1xuICAgICAgY29uc29sZS5sb2coXCJDaGFyZ2VzOlwiLCB0aGlzLm92ZXJUb3RhbCk7XG4gICAgfSxcbiAgICB1cGRhdGVQcm9kdWN0c1RvdGFsQW1vdW50KCkge1xuICAgICAgdGhpcy5wcm9kdWN0c1RvdGFsQW1vdW50ID1cbiAgICAgICAgdGhpcy5icmVhZFRvdGFsQW1vdW50ICtcbiAgICAgICAgdGhpcy5zZWxlY3RhVG90YWxBbW91bnQgK1xuICAgICAgICB0aGlzLnNvZnRkcmlua3NUb3RhbEFtb3VudDtcbiAgICB9LFxuICAgIHVwZGF0ZUV4cGVuc2VzVG90YWxBbW91bnQoKSB7XG4gICAgICB0aGlzLmV4cGVuc2VzVG90YWxBbW91bnQgPSB0aGlzLmV4cGVuc2VzU3VtQW1vdW50O1xuICAgIH0sXG5cbiAgICBhc3luYyBzZWFyY2hCcmFuY2hQcm9kdWN0cyhwcm9kdWN0U2VhcmNoLCBicmFuY2hJZCkge1xuICAgICAgY29uc29sZS5sb2coXCJwcm9kdWN0U2VhcmNoXCIsIHByb2R1Y3RTZWFyY2gpO1xuICAgICAgY29uc29sZS5sb2coXCJicmFuY2hJZFwiLCBicmFuY2hJZCk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnBvc3QoXCIvYXBpL3NlYXJjaC1wcm9kdWN0c1wiLCB7XG4gICAgICAgICAga2V5d29yZDogcHJvZHVjdFNlYXJjaCxcbiAgICAgICAgICBicmFuY2hfaWQ6IGJyYW5jaElkLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wcm9kdWN0cyA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VhcmNoIFByb2R1Y3RzXCIsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHByb2R1Y3RzXCIsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgZmV0Y2hCcmFuY2hQcm9kdWN0cyhicmFuY2hJZCkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KGAvYXBpL2JyYW5jaGVzLyR7YnJhbmNoSWR9L3Byb2R1Y3RzYCk7XG4gICAgICB0aGlzLmJyYW5jaFByb2R1Y3RzID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIHRoaXMuZmlsdGVyQnJlYWRwcm9kdWN0cygpO1xuICAgICAgdGhpcy5maWx0ZXJTZWxlY3RhcHJvZHVjdHMoKTtcbiAgICAgIHRoaXMuZmlsdGVyU29mdGRyaW5rc3Byb2R1Y3RzKCk7XG4gICAgfSxcblxuICAgIGFzeW5jIGZldGNoU2FsZXNSZXBvcnRzKGJyYW5jaElkKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoYC9hcGkvYnJhbmNoLyR7YnJhbmNoSWR9L3NhbGVzUmVwb3J0YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2FsZXMgcmVwb3J0XCIsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICB0aGlzLnNhbGVzUmVwb3J0ID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYXN5bmMgc3VibWl0U2FsZXNSZXBvcnRzKCkge1xuICAgICAgLy8gQ2FsY3VsYXRlIGNyZWRpdFRvdGFsQW1vdW50IG91dHNpZGUgdGhlIHBheWxvYWRcbiAgICAgIGNvbnN0IGNyZWRpdFRvdGFsQW1vdW50ID0gdGhpcy5jcmVkaXRUb3RhbEFtb3VudDtcblxuICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgdXNlcl9pZDogdGhpcy51c2VyLmlkLFxuICAgICAgICBicmFuY2hfaWQ6IHRoaXMudXNlcj8uZGF0YT8uZW1wbG95ZWU/LmJyYW5jaF9lbXBsb3llZS5icmFuY2hfaWQsXG4gICAgICAgIGJyZWFkUmVwb3J0czogdGhpcy5icmVhZFJlcG9ydHMsXG4gICAgICAgIHNlbGVjdGFSZXBvcnRzOiB0aGlzLnNlbGVjdGFSZXBvcnRzLFxuICAgICAgICBzb2Z0ZHJpbmtzUmVwb3J0czogdGhpcy5zb2Z0ZHJpbmtzUmVwb3J0cyxcbiAgICAgICAgZXhwZW5zZXNSZXBvcnRzOiB0aGlzLmV4cGVuc2VzUmVwb3J0cyxcbiAgICAgICAgZGVub21pbmF0aW9uUmVwb3J0czogdGhpcy5kZW5vbWluYXRpb25SZXBvcnRzLFxuICAgICAgICBjcmVkaXRSZXBvcnRzOiB0aGlzLmVtcGxveWVlQ3JlZGl0UmVwb3J0cyxcbiAgICAgICAgZGVub21pbmF0aW9uX3RvdGFsOiB0aGlzLmRlbm9taW5hdGlvblRvdGFsLFxuICAgICAgICBleHBlbnNlc190b3RhbDogdGhpcy5leHBlbnNlc1N1bUFtb3VudCxcbiAgICAgICAgcHJvZHVjdHNfdG90YWxfc2FsZXM6IHRoaXMudG90YWxTYWxlc0Ftb3VudCxcbiAgICAgICAgY2hhcmdlc19hbW91bnQ6IHRoaXMuY2hhcmdlcyxcbiAgICAgICAgb3Zlcl90b3RhbDogdGhpcy5vdmVyVG90YWwsXG4gICAgICAgIGNyZWRpdF90b3RhbDogdGhpcy5jcmVkaXRUb3RhbEFtb3VudCwgLy8gVXNlIHRoZSBjYWxjdWxhdGVkIHZhbHVlIGhlcmVcbiAgICAgIH07XG5cbiAgICAgIGNvbnNvbGUubG9nKFwiUGF5bG9hZCBkYXRhOlwiLCBwYXlsb2FkKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc2FsZXNSZXBvcnREYXRhID0gYXdhaXQgYXBpLnBvc3QoXCIvYXBpL3NhbGVzLXJlcG9ydFwiLCBwYXlsb2FkKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJEYXRhIHN1Ym1pdHRlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcbiAgICAgICAgICBtZXNzYWdlOiBcIlJlcG9ydCBzdWJtaXR0ZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYnJlYWRSZXBvcnRzID0gW107XG4gICAgICAgIHRoaXMuc2VsZWN0YVJlcG9ydHMgPSBbXTtcbiAgICAgICAgdGhpcy5zb2Z0ZHJpbmtzUmVwb3J0cyA9IFtdO1xuICAgICAgICB0aGlzLmV4cGVuc2VzUmVwb3J0cyA9IFtdO1xuICAgICAgICB0aGlzLmRlbm9taW5hdGlvblJlcG9ydHMgPSBbXTtcbiAgICAgICAgdGhpcy5lbXBsb3llZUNyZWRpdFJlcG9ydHMgPSBbXTtcbiAgICAgICAgdGhpcy5kZW5vbWluYXRpb25Ub3RhbCA9IDA7XG4gICAgICAgIHRoaXMuZXhwZW5zZXNUb3RhbEFtb3VudCA9IDA7XG4gICAgICAgIHRoaXMucHJvZHVjdHNUb3RhbEFtb3VudCA9IDA7XG4gICAgICAgIC8vIHRoaXMuY3JlZGl0VG90YWxBbW91bnQgPSAwO1xuICAgICAgICAvLyB0aGlzLmNyZWRpdEV4cGVuc2VzVG90YWwgPSAwO1xuICAgICAgICB0aGlzLmNoYXJnZXMgPSAwO1xuICAgICAgICB0aGlzLm92ZXJUb3RhbCA9IDA7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJTYWxlcyBSZXBvcnRzIERhdGFcIiwgc2FsZXNSZXBvcnREYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzdWJtaXR0aW5nIGRhdGE6XCIsIGVycm9yKTtcbiAgICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiRXJyb3Igc3VibWl0dGluZyByZXBvcnRcIixcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcblxuICBnZXR0ZXJzOiB7XG4gICAgYnJlYWRUb3RhbEFtb3VudDogKHN0YXRlKSA9PiB7XG4gICAgICByZXR1cm4gc3RhdGUuYnJlYWRSZXBvcnRzLnJlZHVjZShcbiAgICAgICAgKHRvdGFsLCByZXBvcnQpID0+IHRvdGFsICsgcmVwb3J0LnNhbGVzLFxuICAgICAgICAwXG4gICAgICApO1xuICAgIH0sXG4gICAgc2VsZWN0YVRvdGFsQW1vdW50OiAoc3RhdGUpID0+IHtcbiAgICAgIHJldHVybiBzdGF0ZS5zZWxlY3RhUmVwb3J0cy5yZWR1Y2UoXG4gICAgICAgICh0b3RhbCwgcmVwb3J0KSA9PiB0b3RhbCArIHJlcG9ydC5zYWxlcyxcbiAgICAgICAgMFxuICAgICAgKTtcbiAgICB9LFxuICAgIHNvZnRkcmlua3NUb3RhbEFtb3VudDogKHN0YXRlKSA9PiB7XG4gICAgICByZXR1cm4gc3RhdGUuc29mdGRyaW5rc1JlcG9ydHMucmVkdWNlKFxuICAgICAgICAodG90YWwsIHJlcG9ydCkgPT4gdG90YWwgKyByZXBvcnQuc2FsZXMsXG4gICAgICAgIDBcbiAgICAgICk7XG4gICAgfSxcbiAgICBleHBlbnNlc1N1bUFtb3VudDogKHN0YXRlKSA9PiB7XG4gICAgICByZXR1cm4gc3RhdGUuZXhwZW5zZXNSZXBvcnRzLnJlZHVjZShcbiAgICAgICAgKHRvdGFsLCByZXBvcnQpID0+IHRvdGFsICsgcmVwb3J0LmFtb3VudCxcbiAgICAgICAgMFxuICAgICAgKTtcbiAgICB9LFxuICAgIGNyZWRpdFRvdGFsQW1vdW50OiAoc3RhdGUpID0+IHtcbiAgICAgIHJldHVybiBzdGF0ZS5lbXBsb3llZUNyZWRpdFJlcG9ydHMucmVkdWNlKCh0b3RhbCwgcmVwb3J0KSA9PiB7XG4gICAgICAgIHJldHVybiB0b3RhbCArIHJlcG9ydC50b3RhbF9hbW91bnQ7XG4gICAgICB9LCAwKTtcbiAgICB9LFxuXG4gICAgY3JlZGl0RXhwZW5zZXNUb3RhbDogKHN0YXRlKSA9PiB7XG4gICAgICByZXR1cm4gc3RhdGUuZXhwZW5zZXNTdW1BbW91bnQgKyBzdGF0ZS5jcmVkaXRUb3RhbEFtb3VudDtcbiAgICB9LFxuXG4gICAgZ2V0RGVub21pbmF0aW9uVG90YWw6IChzdGF0ZSkgPT4ge1xuICAgICAgcmV0dXJuIHN0YXRlLmRlbm9taW5hdGlvblRvdGFsO1xuICAgIH0sXG4gICAgZ2V0Q2hhcmdlczogKHN0YXRlKSA9PiB7XG4gICAgICByZXR1cm4gc3RhdGUuY2hhcmdlcztcbiAgICB9LFxuICAgIHRvdGFsU2FsZXNBbW91bnQ6IChzdGF0ZSkgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgc3RhdGUuYnJlYWRUb3RhbEFtb3VudCArXG4gICAgICAgIHN0YXRlLnNlbGVjdGFUb3RhbEFtb3VudCArXG4gICAgICAgIHN0YXRlLnNvZnRkcmlua3NUb3RhbEFtb3VudFxuICAgICAgKTtcbiAgICB9LFxuICB9LFxufSk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7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
