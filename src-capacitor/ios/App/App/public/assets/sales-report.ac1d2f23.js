import { d as defineStore, N as Notify } from "./index.9b9dbcba.js";
import { api } from "./axios.91431b0b.js";
const useSalesReportsStore = defineStore("salesReports", {
  state: () => ({
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
    denominationReports: [],
    productsTotalAmount: 0,
    expensesTotalAmount: 0,
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
      const totalSalesAmount = this.breadTotalAmount + this.selectaTotalAmount + this.softdrinksTotalAmount - this.expensesTotalAmount;
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
    async fetchBranchProducts(branchId) {
      const response = await api.get(`/api/branches/${branchId}/products`);
      this.branchProducts = response.data;
      this.filterBreadproducts();
      this.filterSelectaproducts();
      this.filterSoftdrinksproducts();
    },
    async submitSalesReports() {
      var _a, _b;
      const payload = {
        user_id: this.user.id,
        branch_id: (_b = (_a = this.user) == null ? void 0 : _a.data) == null ? void 0 : _b.branch_employee.branch_id,
        breadReports: this.breadReports,
        selectaReports: this.selectaReports,
        softdrinksReports: this.softdrinksReports,
        expensesReports: this.expensesReports,
        denominationReports: this.denominationReports,
        denomination_total: this.denominationTotal,
        expenses_total: this.expensesTotalAmount,
        products_total_sales: this.totalSalesAmount,
        charges_amount: this.charges,
        over_total: this.overTotal
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
        this.denominationTotal = 0;
        this.expensesTotalAmount = 0;
        this.productsTotalAmount = 0;
        this.charges = 0;
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
    expensesTotalAmount: (state) => {
      return state.expensesReports.reduce(
        (total, report) => total + report.amount,
        0
      );
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZXMtcmVwb3J0LmFjMWQyZjIzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RvcmVzL3NhbGVzLXJlcG9ydC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWZpbmVTdG9yZSB9IGZyb20gXCJwaW5pYVwiO1xuaW1wb3J0IHsgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSBcInNyYy9ib290L2F4aW9zXCI7XG5cbmV4cG9ydCBjb25zdCB1c2VTYWxlc1JlcG9ydHNTdG9yZSA9IGRlZmluZVN0b3JlKFwic2FsZXNSZXBvcnRzXCIsIHtcbiAgc3RhdGU6ICgpID0+ICh7XG4gICAgYnJhbmNoUHJvZHVjdHM6IFtdLFxuICAgIGJyZWFkUHJvZHVjdHM6IFtdLFxuICAgIHNlbGVjdGFQcm9kdWN0czogW10sXG4gICAgc29mdGRyaW5rc1Byb2R1Y3RzOiBbXSxcbiAgICByZXBvcnRzOiBbXSxcbiAgICB1c2VyOiB7fSxcbiAgICBicmVhZFJlcG9ydHM6IFtdLFxuICAgIHNlbGVjdGFSZXBvcnRzOiBbXSxcbiAgICBzb2Z0ZHJpbmtzUmVwb3J0czogW10sXG4gICAgZXhwZW5zZXNSZXBvcnRzOiBbXSxcbiAgICBkZW5vbWluYXRpb25SZXBvcnRzOiBbXSxcbiAgICBwcm9kdWN0c1RvdGFsQW1vdW50OiAwLFxuICAgIGV4cGVuc2VzVG90YWxBbW91bnQ6IDAsXG4gICAgZGVub21pbmF0aW9uVG90YWw6IDAsXG4gICAgY2hhcmdlczogMCxcbiAgICBvdmVyVG90YWw6IDAsXG4gIH0pLFxuXG4gIGFjdGlvbnM6IHtcbiAgICBzZXRVc2VyKHVzZXIpIHtcbiAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4gICAgfSxcblxuICAgIHJlbW92ZUJyZWFkKGluZGV4KSB7XG4gICAgICB0aGlzLmJyZWFkUmVwb3J0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgdGhpcy51cGRhdGVQcm9kdWN0c1RvdGFsQW1vdW50KCk7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUNoYXJnZXModGhpcy5kZW5vbWluYXRpb25Ub3RhbCk7XG4gICAgfSxcbiAgICByZW1vdmVTZWxlY3RhKGluZGV4KSB7XG4gICAgICB0aGlzLnNlbGVjdGFSZXBvcnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB0aGlzLnVwZGF0ZVByb2R1Y3RzVG90YWxBbW91bnQoKTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlQ2hhcmdlcyh0aGlzLmRlbm9taW5hdGlvblRvdGFsKTtcbiAgICB9LFxuICAgIHJlbW92ZVNvZnRkcmluayhpbmRleCkge1xuICAgICAgdGhpcy5zb2Z0ZHJpbmtzUmVwb3J0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgdGhpcy51cGRhdGVQcm9kdWN0c1RvdGFsQW1vdW50KCk7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUNoYXJnZXModGhpcy5kZW5vbWluYXRpb25Ub3RhbCk7XG4gICAgfSxcbiAgICByZW1vdmVFeHBlbnNlcyhpbmRleCkge1xuICAgICAgdGhpcy5leHBlbnNlc1JlcG9ydHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHRoaXMudXBkYXRlUHJvZHVjdHNUb3RhbEFtb3VudCgpO1xuICAgICAgdGhpcy5jYWxjdWxhdGVDaGFyZ2VzKHRoaXMuZGVub21pbmF0aW9uVG90YWwpO1xuICAgIH0sXG5cbiAgICBmaWx0ZXJCcmVhZHByb2R1Y3RzKCkge1xuICAgICAgdGhpcy5icmVhZFByb2R1Y3RzID0gdGhpcy5icmFuY2hQcm9kdWN0cy5maWx0ZXIoXG4gICAgICAgIChwcm9kdWN0KSA9PiBwcm9kdWN0LmNhdGVnb3J5ID09PSBcIkJyZWFkXCJcbiAgICAgICk7XG4gICAgfSxcbiAgICBmaWx0ZXJTZWxlY3RhcHJvZHVjdHMoKSB7XG4gICAgICB0aGlzLnNlbGVjdGFQcm9kdWN0cyA9IHRoaXMuYnJhbmNoUHJvZHVjdHMuZmlsdGVyKFxuICAgICAgICAocHJvZHVjdCkgPT4gcHJvZHVjdC5jYXRlZ29yeSA9PT0gXCJTZWxlY3RhXCJcbiAgICAgICk7XG4gICAgfSxcbiAgICBmaWx0ZXJTb2Z0ZHJpbmtzcHJvZHVjdHMoKSB7XG4gICAgICB0aGlzLnNvZnRkcmlua3NQcm9kdWN0cyA9IHRoaXMuYnJhbmNoUHJvZHVjdHMuZmlsdGVyKFxuICAgICAgICAocHJvZHVjdCkgPT4gcHJvZHVjdC5jYXRlZ29yeSA9PT0gXCJTb2Z0ZHJpbmtzXCJcbiAgICAgICk7XG4gICAgfSxcblxuICAgIHVwZGF0ZUJyZWFkUmVwb3J0KHJlcG9ydCkge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmJyZWFkUmVwb3J0cy5maW5kSW5kZXgoKHIpID0+IHIubmFtZSA9PT0gcmVwb3J0Lm5hbWUpO1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLmJyZWFkUmVwb3J0cy5zcGxpY2UoaW5kZXgsIDEsIHJlcG9ydCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmJyZWFkUmVwb3J0cy5wdXNoKHJlcG9ydCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZVNlbGVjdGFSZXBvcnQocmVwb3J0KSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VsZWN0YVJlcG9ydHMuZmluZEluZGV4KFxuICAgICAgICAocikgPT4gci5uYW1lID09PSByZXBvcnQubmFtZVxuICAgICAgKTtcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RhUmVwb3J0cy5zcGxpY2UoaW5kZXgsIDEsIHJlcG9ydCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNlbGVjdGFSZXBvcnRzLnB1c2gocmVwb3J0KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlU29mdGRyaW5rc1JlcG9ydChyZXBvcnQpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zb2Z0ZHJpbmtzUmVwb3J0cy5maW5kSW5kZXgoXG4gICAgICAgIChyKSA9PiByLm5hbWUgPT09IHJlcG9ydC5uYW1lXG4gICAgICApO1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNvZnRkcmlua3NSZXBvcnRzLnNwbGljZShpbmRleCwgMSwgcmVwb3J0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc29mdGRyaW5rc1JlcG9ydHMucHVzaChyZXBvcnQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgdXBkYXRlRXhwZW5zZXNSZXBvcnQocmVwb3J0KSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuZXhwZW5zZXNSZXBvcnRzLmZpbmRJbmRleChcbiAgICAgICAgKHIpID0+IHIubmFtZSA9PT0gcmVwb3J0Lm5hbWVcbiAgICAgICk7XG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuZXhwZW5zZXNSZXBvcnRzLnNwbGljZShpbmRleCwgMSwgcmVwb3J0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZXhwZW5zZXNSZXBvcnRzLnB1c2gocmVwb3J0KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0RGVub21pbmF0aW9uRGF0YShyZXBvcnQpIHtcbiAgICAgIHRoaXMuZGVub21pbmF0aW9uUmVwb3J0cy5wdXNoKHJlcG9ydCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZURlbm9taW5hdGlvblRvdGFsKHRvdGFsKSB7XG4gICAgICB0aGlzLmRlbm9taW5hdGlvblRvdGFsID0gdG90YWw7XG4gICAgfSxcblxuICAgIGNhbGN1bGF0ZUNoYXJnZXMocmF3VG90YWxEZW5vbWluYXRpb24pIHtcbiAgICAgIGNvbnN0IHRvdGFsU2FsZXNBbW91bnQgPVxuICAgICAgICB0aGlzLmJyZWFkVG90YWxBbW91bnQgK1xuICAgICAgICB0aGlzLnNlbGVjdGFUb3RhbEFtb3VudCArXG4gICAgICAgIHRoaXMuc29mdGRyaW5rc1RvdGFsQW1vdW50IC1cbiAgICAgICAgdGhpcy5leHBlbnNlc1RvdGFsQW1vdW50O1xuICAgICAgaWYgKHJhd1RvdGFsRGVub21pbmF0aW9uIDwgdG90YWxTYWxlc0Ftb3VudCkge1xuICAgICAgICB0aGlzLmNoYXJnZXMgPSB0b3RhbFNhbGVzQW1vdW50IC0gcmF3VG90YWxEZW5vbWluYXRpb247XG4gICAgICAgIHRoaXMub3ZlclRvdGFsID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2hhcmdlcyA9IDA7XG4gICAgICAgIHRoaXMub3ZlclRvdGFsID0gcmF3VG90YWxEZW5vbWluYXRpb24gLSB0b3RhbFNhbGVzQW1vdW50O1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coXCJDaGFyZ2VzOlwiLCB0aGlzLmNoYXJnZXMpO1xuICAgICAgY29uc29sZS5sb2coXCJDaGFyZ2VzOlwiLCB0aGlzLm92ZXJUb3RhbCk7XG4gICAgfSxcbiAgICB1cGRhdGVQcm9kdWN0c1RvdGFsQW1vdW50KCkge1xuICAgICAgdGhpcy5wcm9kdWN0c1RvdGFsQW1vdW50ID1cbiAgICAgICAgdGhpcy5icmVhZFRvdGFsQW1vdW50ICtcbiAgICAgICAgdGhpcy5zZWxlY3RhVG90YWxBbW91bnQgK1xuICAgICAgICB0aGlzLnNvZnRkcmlua3NUb3RhbEFtb3VudDtcbiAgICB9LFxuXG4gICAgYXN5bmMgZmV0Y2hCcmFuY2hQcm9kdWN0cyhicmFuY2hJZCkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KGAvYXBpL2JyYW5jaGVzLyR7YnJhbmNoSWR9L3Byb2R1Y3RzYCk7XG4gICAgICB0aGlzLmJyYW5jaFByb2R1Y3RzID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIHRoaXMuZmlsdGVyQnJlYWRwcm9kdWN0cygpO1xuICAgICAgdGhpcy5maWx0ZXJTZWxlY3RhcHJvZHVjdHMoKTtcbiAgICAgIHRoaXMuZmlsdGVyU29mdGRyaW5rc3Byb2R1Y3RzKCk7XG4gICAgfSxcblxuICAgIGFzeW5jIHN1Ym1pdFNhbGVzUmVwb3J0cygpIHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgIHVzZXJfaWQ6IHRoaXMudXNlci5pZCxcbiAgICAgICAgYnJhbmNoX2lkOiB0aGlzLnVzZXI/LmRhdGE/LmJyYW5jaF9lbXBsb3llZS5icmFuY2hfaWQsXG4gICAgICAgIGJyZWFkUmVwb3J0czogdGhpcy5icmVhZFJlcG9ydHMsXG4gICAgICAgIHNlbGVjdGFSZXBvcnRzOiB0aGlzLnNlbGVjdGFSZXBvcnRzLFxuICAgICAgICBzb2Z0ZHJpbmtzUmVwb3J0czogdGhpcy5zb2Z0ZHJpbmtzUmVwb3J0cyxcbiAgICAgICAgZXhwZW5zZXNSZXBvcnRzOiB0aGlzLmV4cGVuc2VzUmVwb3J0cyxcbiAgICAgICAgZGVub21pbmF0aW9uUmVwb3J0czogdGhpcy5kZW5vbWluYXRpb25SZXBvcnRzLFxuICAgICAgICBkZW5vbWluYXRpb25fdG90YWw6IHRoaXMuZGVub21pbmF0aW9uVG90YWwsXG4gICAgICAgIGV4cGVuc2VzX3RvdGFsOiB0aGlzLmV4cGVuc2VzVG90YWxBbW91bnQsXG4gICAgICAgIHByb2R1Y3RzX3RvdGFsX3NhbGVzOiB0aGlzLnRvdGFsU2FsZXNBbW91bnQsXG4gICAgICAgIGNoYXJnZXNfYW1vdW50OiB0aGlzLmNoYXJnZXMsXG4gICAgICAgIG92ZXJfdG90YWw6IHRoaXMub3ZlclRvdGFsLFxuICAgICAgfTtcbiAgICAgIGNvbnNvbGUubG9nKFwiUGF5bG9hZCBkYXRhOlwiLCBwYXlsb2FkKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc2FsZXNSZXBvcnREYXRhID0gYXdhaXQgYXBpLnBvc3QoXCIvYXBpL3NhbGVzLXJlcG9ydFwiLCBwYXlsb2FkKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJEYXRhIHN1Ym1pdHRlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcbiAgICAgICAgICBtZXNzYWdlOiBcIlJlcG9ydCBzdWJtaXR0ZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYnJlYWRSZXBvcnRzID0gW107XG4gICAgICAgIHRoaXMuc2VsZWN0YVJlcG9ydHMgPSBbXTtcbiAgICAgICAgdGhpcy5zb2Z0ZHJpbmtzUmVwb3J0cyA9IFtdO1xuICAgICAgICB0aGlzLmV4cGVuc2VzUmVwb3J0cyA9IFtdO1xuICAgICAgICB0aGlzLmRlbm9taW5hdGlvblJlcG9ydHMgPSBbXTtcbiAgICAgICAgdGhpcy5kZW5vbWluYXRpb25Ub3RhbCA9IDA7XG4gICAgICAgIHRoaXMuZXhwZW5zZXNUb3RhbEFtb3VudCA9IDA7XG4gICAgICAgIHRoaXMucHJvZHVjdHNUb3RhbEFtb3VudCA9IDA7XG4gICAgICAgIHRoaXMuY2hhcmdlcyA9IDA7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJTYWxlcyBSZXBvcnRzIERhdGFcIiwgc2FsZXNSZXBvcnREYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzdWJtaXR0aW5nIGRhdGE6XCIsIGVycm9yKTtcbiAgICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiRXJyb3Igc3VibWl0dGluZyByZXBvcnRcIixcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcblxuICBnZXR0ZXJzOiB7XG4gICAgYnJlYWRUb3RhbEFtb3VudDogKHN0YXRlKSA9PiB7XG4gICAgICByZXR1cm4gc3RhdGUuYnJlYWRSZXBvcnRzLnJlZHVjZShcbiAgICAgICAgKHRvdGFsLCByZXBvcnQpID0+IHRvdGFsICsgcmVwb3J0LnNhbGVzLFxuICAgICAgICAwXG4gICAgICApO1xuICAgIH0sXG4gICAgc2VsZWN0YVRvdGFsQW1vdW50OiAoc3RhdGUpID0+IHtcbiAgICAgIHJldHVybiBzdGF0ZS5zZWxlY3RhUmVwb3J0cy5yZWR1Y2UoXG4gICAgICAgICh0b3RhbCwgcmVwb3J0KSA9PiB0b3RhbCArIHJlcG9ydC5zYWxlcyxcbiAgICAgICAgMFxuICAgICAgKTtcbiAgICB9LFxuICAgIHNvZnRkcmlua3NUb3RhbEFtb3VudDogKHN0YXRlKSA9PiB7XG4gICAgICByZXR1cm4gc3RhdGUuc29mdGRyaW5rc1JlcG9ydHMucmVkdWNlKFxuICAgICAgICAodG90YWwsIHJlcG9ydCkgPT4gdG90YWwgKyByZXBvcnQuc2FsZXMsXG4gICAgICAgIDBcbiAgICAgICk7XG4gICAgfSxcbiAgICBleHBlbnNlc1RvdGFsQW1vdW50OiAoc3RhdGUpID0+IHtcbiAgICAgIHJldHVybiBzdGF0ZS5leHBlbnNlc1JlcG9ydHMucmVkdWNlKFxuICAgICAgICAodG90YWwsIHJlcG9ydCkgPT4gdG90YWwgKyByZXBvcnQuYW1vdW50LFxuICAgICAgICAwXG4gICAgICApO1xuICAgIH0sXG4gICAgZ2V0RGVub21pbmF0aW9uVG90YWw6IChzdGF0ZSkgPT4ge1xuICAgICAgcmV0dXJuIHN0YXRlLmRlbm9taW5hdGlvblRvdGFsO1xuICAgIH0sXG4gICAgZ2V0Q2hhcmdlczogKHN0YXRlKSA9PiB7XG4gICAgICByZXR1cm4gc3RhdGUuY2hhcmdlcztcbiAgICB9LFxuICAgIHRvdGFsU2FsZXNBbW91bnQ6IChzdGF0ZSkgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgc3RhdGUuYnJlYWRUb3RhbEFtb3VudCArXG4gICAgICAgIHN0YXRlLnNlbGVjdGFUb3RhbEFtb3VudCArXG4gICAgICAgIHN0YXRlLnNvZnRkcmlua3NUb3RhbEFtb3VudFxuICAgICAgKTtcbiAgICB9LFxuICB9LFxufSk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJWSxNQUFDLHVCQUF1QixZQUFZLGdCQUFnQjtBQUFBLEVBQzlELE9BQU8sT0FBTztBQUFBLElBQ1osZ0JBQWdCLENBQUU7QUFBQSxJQUNsQixlQUFlLENBQUU7QUFBQSxJQUNqQixpQkFBaUIsQ0FBRTtBQUFBLElBQ25CLG9CQUFvQixDQUFFO0FBQUEsSUFDdEIsU0FBUyxDQUFFO0FBQUEsSUFDWCxNQUFNLENBQUU7QUFBQSxJQUNSLGNBQWMsQ0FBRTtBQUFBLElBQ2hCLGdCQUFnQixDQUFFO0FBQUEsSUFDbEIsbUJBQW1CLENBQUU7QUFBQSxJQUNyQixpQkFBaUIsQ0FBRTtBQUFBLElBQ25CLHFCQUFxQixDQUFFO0FBQUEsSUFDdkIscUJBQXFCO0FBQUEsSUFDckIscUJBQXFCO0FBQUEsSUFDckIsbUJBQW1CO0FBQUEsSUFDbkIsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLEVBQ2Y7QUFBQSxFQUVFLFNBQVM7QUFBQSxJQUNQLFFBQVEsTUFBTTtBQUNaLFdBQUssT0FBTztBQUFBLElBQ2I7QUFBQSxJQUVELFlBQVksT0FBTztBQUNqQixXQUFLLGFBQWEsT0FBTyxPQUFPLENBQUM7QUFDakMsV0FBSywwQkFBeUI7QUFDOUIsV0FBSyxpQkFBaUIsS0FBSyxpQkFBaUI7QUFBQSxJQUM3QztBQUFBLElBQ0QsY0FBYyxPQUFPO0FBQ25CLFdBQUssZUFBZSxPQUFPLE9BQU8sQ0FBQztBQUNuQyxXQUFLLDBCQUF5QjtBQUM5QixXQUFLLGlCQUFpQixLQUFLLGlCQUFpQjtBQUFBLElBQzdDO0FBQUEsSUFDRCxnQkFBZ0IsT0FBTztBQUNyQixXQUFLLGtCQUFrQixPQUFPLE9BQU8sQ0FBQztBQUN0QyxXQUFLLDBCQUF5QjtBQUM5QixXQUFLLGlCQUFpQixLQUFLLGlCQUFpQjtBQUFBLElBQzdDO0FBQUEsSUFDRCxlQUFlLE9BQU87QUFDcEIsV0FBSyxnQkFBZ0IsT0FBTyxPQUFPLENBQUM7QUFDcEMsV0FBSywwQkFBeUI7QUFDOUIsV0FBSyxpQkFBaUIsS0FBSyxpQkFBaUI7QUFBQSxJQUM3QztBQUFBLElBRUQsc0JBQXNCO0FBQ3BCLFdBQUssZ0JBQWdCLEtBQUssZUFBZTtBQUFBLFFBQ3ZDLENBQUMsWUFBWSxRQUFRLGFBQWE7QUFBQSxNQUMxQztBQUFBLElBQ0s7QUFBQSxJQUNELHdCQUF3QjtBQUN0QixXQUFLLGtCQUFrQixLQUFLLGVBQWU7QUFBQSxRQUN6QyxDQUFDLFlBQVksUUFBUSxhQUFhO0FBQUEsTUFDMUM7QUFBQSxJQUNLO0FBQUEsSUFDRCwyQkFBMkI7QUFDekIsV0FBSyxxQkFBcUIsS0FBSyxlQUFlO0FBQUEsUUFDNUMsQ0FBQyxZQUFZLFFBQVEsYUFBYTtBQUFBLE1BQzFDO0FBQUEsSUFDSztBQUFBLElBRUQsa0JBQWtCLFFBQVE7QUFDeEIsWUFBTSxRQUFRLEtBQUssYUFBYSxVQUFVLENBQUMsTUFBTSxFQUFFLFNBQVMsT0FBTyxJQUFJO0FBQ3ZFLFVBQUksVUFBVSxJQUFJO0FBQ2hCLGFBQUssYUFBYSxPQUFPLE9BQU8sR0FBRyxNQUFNO0FBQUEsTUFDakQsT0FBYTtBQUNMLGFBQUssYUFBYSxLQUFLLE1BQU07QUFBQSxNQUM5QjtBQUFBLElBQ0Y7QUFBQSxJQUVELG9CQUFvQixRQUFRO0FBQzFCLFlBQU0sUUFBUSxLQUFLLGVBQWU7QUFBQSxRQUNoQyxDQUFDLE1BQU0sRUFBRSxTQUFTLE9BQU87QUFBQSxNQUNqQztBQUNNLFVBQUksVUFBVSxJQUFJO0FBQ2hCLGFBQUssZUFBZSxPQUFPLE9BQU8sR0FBRyxNQUFNO0FBQUEsTUFDbkQsT0FBYTtBQUNMLGFBQUssZUFBZSxLQUFLLE1BQU07QUFBQSxNQUNoQztBQUFBLElBQ0Y7QUFBQSxJQUVELHVCQUF1QixRQUFRO0FBQzdCLFlBQU0sUUFBUSxLQUFLLGtCQUFrQjtBQUFBLFFBQ25DLENBQUMsTUFBTSxFQUFFLFNBQVMsT0FBTztBQUFBLE1BQ2pDO0FBQ00sVUFBSSxVQUFVLElBQUk7QUFDaEIsYUFBSyxrQkFBa0IsT0FBTyxPQUFPLEdBQUcsTUFBTTtBQUFBLE1BQ3RELE9BQWE7QUFDTCxhQUFLLGtCQUFrQixLQUFLLE1BQU07QUFBQSxNQUNuQztBQUFBLElBQ0Y7QUFBQSxJQUNELHFCQUFxQixRQUFRO0FBQzNCLFlBQU0sUUFBUSxLQUFLLGdCQUFnQjtBQUFBLFFBQ2pDLENBQUMsTUFBTSxFQUFFLFNBQVMsT0FBTztBQUFBLE1BQ2pDO0FBQ00sVUFBSSxVQUFVLElBQUk7QUFDaEIsYUFBSyxnQkFBZ0IsT0FBTyxPQUFPLEdBQUcsTUFBTTtBQUFBLE1BQ3BELE9BQWE7QUFDTCxhQUFLLGdCQUFnQixLQUFLLE1BQU07QUFBQSxNQUNqQztBQUFBLElBQ0Y7QUFBQSxJQUVELG9CQUFvQixRQUFRO0FBQzFCLFdBQUssb0JBQW9CLEtBQUssTUFBTTtBQUFBLElBQ3JDO0FBQUEsSUFFRCx3QkFBd0IsT0FBTztBQUM3QixXQUFLLG9CQUFvQjtBQUFBLElBQzFCO0FBQUEsSUFFRCxpQkFBaUIsc0JBQXNCO0FBQ3JDLFlBQU0sbUJBQ0osS0FBSyxtQkFDTCxLQUFLLHFCQUNMLEtBQUssd0JBQ0wsS0FBSztBQUNQLFVBQUksdUJBQXVCLGtCQUFrQjtBQUMzQyxhQUFLLFVBQVUsbUJBQW1CO0FBQ2xDLGFBQUssWUFBWTtBQUFBLE1BQ3pCLE9BQWE7QUFDTCxhQUFLLFVBQVU7QUFDZixhQUFLLFlBQVksdUJBQXVCO0FBQUEsTUFDekM7QUFDRCxjQUFRLElBQUksWUFBWSxLQUFLLE9BQU87QUFDcEMsY0FBUSxJQUFJLFlBQVksS0FBSyxTQUFTO0FBQUEsSUFDdkM7QUFBQSxJQUNELDRCQUE0QjtBQUMxQixXQUFLLHNCQUNILEtBQUssbUJBQ0wsS0FBSyxxQkFDTCxLQUFLO0FBQUEsSUFDUjtBQUFBLElBRUQsTUFBTSxvQkFBb0IsVUFBVTtBQUNsQyxZQUFNLFdBQVcsTUFBTSxJQUFJLElBQUksaUJBQWlCLG1CQUFtQjtBQUNuRSxXQUFLLGlCQUFpQixTQUFTO0FBQy9CLFdBQUssb0JBQW1CO0FBQ3hCLFdBQUssc0JBQXFCO0FBQzFCLFdBQUsseUJBQXdCO0FBQUEsSUFDOUI7QUFBQSxJQUVELE1BQU0scUJBQXFCOztBQUN6QixZQUFNLFVBQVU7QUFBQSxRQUNkLFNBQVMsS0FBSyxLQUFLO0FBQUEsUUFDbkIsWUFBVyxnQkFBSyxTQUFMLG1CQUFXLFNBQVgsbUJBQWlCLGdCQUFnQjtBQUFBLFFBQzVDLGNBQWMsS0FBSztBQUFBLFFBQ25CLGdCQUFnQixLQUFLO0FBQUEsUUFDckIsbUJBQW1CLEtBQUs7QUFBQSxRQUN4QixpQkFBaUIsS0FBSztBQUFBLFFBQ3RCLHFCQUFxQixLQUFLO0FBQUEsUUFDMUIsb0JBQW9CLEtBQUs7QUFBQSxRQUN6QixnQkFBZ0IsS0FBSztBQUFBLFFBQ3JCLHNCQUFzQixLQUFLO0FBQUEsUUFDM0IsZ0JBQWdCLEtBQUs7QUFBQSxRQUNyQixZQUFZLEtBQUs7QUFBQSxNQUN6QjtBQUNNLGNBQVEsSUFBSSxpQkFBaUIsT0FBTztBQUVwQyxVQUFJO0FBQ0YsY0FBTSxrQkFBa0IsTUFBTSxJQUFJLEtBQUsscUJBQXFCLE9BQU87QUFDbkUsZ0JBQVEsSUFBSSw2QkFBNkI7QUFDekMsZUFBTyxPQUFPO0FBQUEsVUFDWixNQUFNO0FBQUEsVUFDTixTQUFTO0FBQUEsUUFDbkIsQ0FBUztBQUVELGFBQUssZUFBZTtBQUNwQixhQUFLLGlCQUFpQjtBQUN0QixhQUFLLG9CQUFvQjtBQUN6QixhQUFLLGtCQUFrQjtBQUN2QixhQUFLLHNCQUFzQjtBQUMzQixhQUFLLG9CQUFvQjtBQUN6QixhQUFLLHNCQUFzQjtBQUMzQixhQUFLLHNCQUFzQjtBQUMzQixhQUFLLFVBQVU7QUFFZixnQkFBUSxJQUFJLHNCQUFzQixlQUFlO0FBQUEsTUFDbEQsU0FBUSxPQUFQO0FBQ0EsZ0JBQVEsTUFBTSwwQkFBMEIsS0FBSztBQUM3QyxlQUFPLE9BQU87QUFBQSxVQUNaLE1BQU07QUFBQSxVQUNOLFNBQVM7QUFBQSxRQUNuQixDQUFTO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFRCxTQUFTO0FBQUEsSUFDUCxrQkFBa0IsQ0FBQyxVQUFVO0FBQzNCLGFBQU8sTUFBTSxhQUFhO0FBQUEsUUFDeEIsQ0FBQyxPQUFPLFdBQVcsUUFBUSxPQUFPO0FBQUEsUUFDbEM7QUFBQSxNQUNSO0FBQUEsSUFDSztBQUFBLElBQ0Qsb0JBQW9CLENBQUMsVUFBVTtBQUM3QixhQUFPLE1BQU0sZUFBZTtBQUFBLFFBQzFCLENBQUMsT0FBTyxXQUFXLFFBQVEsT0FBTztBQUFBLFFBQ2xDO0FBQUEsTUFDUjtBQUFBLElBQ0s7QUFBQSxJQUNELHVCQUF1QixDQUFDLFVBQVU7QUFDaEMsYUFBTyxNQUFNLGtCQUFrQjtBQUFBLFFBQzdCLENBQUMsT0FBTyxXQUFXLFFBQVEsT0FBTztBQUFBLFFBQ2xDO0FBQUEsTUFDUjtBQUFBLElBQ0s7QUFBQSxJQUNELHFCQUFxQixDQUFDLFVBQVU7QUFDOUIsYUFBTyxNQUFNLGdCQUFnQjtBQUFBLFFBQzNCLENBQUMsT0FBTyxXQUFXLFFBQVEsT0FBTztBQUFBLFFBQ2xDO0FBQUEsTUFDUjtBQUFBLElBQ0s7QUFBQSxJQUNELHNCQUFzQixDQUFDLFVBQVU7QUFDL0IsYUFBTyxNQUFNO0FBQUEsSUFDZDtBQUFBLElBQ0QsWUFBWSxDQUFDLFVBQVU7QUFDckIsYUFBTyxNQUFNO0FBQUEsSUFDZDtBQUFBLElBQ0Qsa0JBQWtCLENBQUMsVUFBVTtBQUMzQixhQUNFLE1BQU0sbUJBQ04sTUFBTSxxQkFDTixNQUFNO0FBQUEsSUFFVDtBQUFBLEVBQ0Y7QUFDSCxDQUFDOzsifQ==
