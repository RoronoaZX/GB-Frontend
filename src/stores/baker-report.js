import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";

export const useBakerReportsStore = defineStore("bakerReportsStore", {
  state: () => ({
    recipes: {},
    reportToView: [],
    reports: [],
    rawmaterials: [],
    employeeInShift: [],
    user: {},
  }),
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    setRecipe(recipes) {
      this.recipes = recipes;
    },
    setReport(report) {
      const res = this.reports.push(report);

      // this.recipes = [];
    },
    removeReport(index) {
      this.reports.splice(index, 1);
    },
    setUser(user) {
      this.user = user;
    },
    clearData() {
      this.recipes = {};
      this.reports = [];
    },

    async fetchBranchRawMaterials(branchId) {
      const response = await api.get(`/api/branch/${branchId}/rawMaterials`);
      this.rawmaterials = response.data;
    },

    async fetchBakerReport(userId, page, rowsNumber) {
      try {
        const response = await api.get(
          `/api/branch/${userId}/bakerReport` + window.location.search,
          {
            params: {
              page,
              per_page: rowsNumber,
            },
          }
        );

        // Update the store/state with paginated response data
        // this.reportToView = response.data.data;
        return response.data; // Return the full response for use in the component
      } catch (error) {
        console.error("Error fetching baker reports:", error);
      }
    },

    async fetchAllReports() {
      const response = await api.get("/api/initial-baker-report");
      this.reportToView = response.data;
    },

    async fetchDoughReports(branchId) {
      const response = await api.get(
        `/api/branch/${branchId}/bakerDoughReport`
      );
      console.log("====================================");
      console.log("response", response.data);
      console.log("====================================");
      this.reports = response.data;
    },

    async adminAddRecipebakerReport(data) {
      console.log("data admin send RecipebakerReport adding ", data);
      try {
        const response = await api.post(
          "/api/admin-create-admin-insert-recipe-baker-report",
          {
            reports: data,
          }
        );
        Notify.create({
          type: "positive",
          message: "Report successfully send",
          timeout: 1000,
        });
      } catch (error) {
        console.log(error);
      }
    },

    async adminBakerCreateReports(data) {
      console.log("data admin send", data);
      try {
        console.log("data admin to send:", this.reports);
        const response = await api.post("/api/admin-create-baker-report", {
          reports: data,
        });
        Notify.create({
          type: "positive",
          message: "Report successfully send",
          timeout: 1000,
        });

        // console.log("Reports to be saved:", this.reports);
        this.reports = [];
      } catch (error) {
        console.log(error);
      }
    },

    async createReports() {
      console.log("data to send:", this.reports);
      console.log("employeeInShift", this.employeeInShift);
      console.log("overallkilo:", this.overallKilo);
      try {
        console.log("data to send:", this.reports);

        Loading.show();
        const response = await api.post("/api/initial-baker-report", {
          reports: this.reports,
          employee_in_shift: this.employeeInShift,
          overall_kilo: this.overallKilo,
          total_employees: this.totalEmployeesInShift,
        });
        Notify.create({
          type: "positive",
          message: "Report successfully send",
          timeout: 1000,
        });
        console.log("Reports to be saved reports:", this.reports);
        console.log(
          "Reports to be saved employeeInShift:",
          this.employeeInShift
        );
        this.reports = [];
        this.employeeInShift = [];
        this.overallKilo = 0;
        this.totalEmployeesInShift = 0;
      } catch (error) {
        console.error("Error saving report:", error);
        Notify.create({
          type: "negative",
          message: error.response.data.message || "ERROR",
          timeout: 1000,
        });
      } finally {
        Loading.hide();
      }
    },

    async confirmReport(id) {
      try {
        const res = await api.post(`/api/confirm-initial-baker-report/${id}`);
        console.log("Confirming report with ID:", id);
        if (res.status === 200) {
          const index = this.reports.findIndex((report) => report.id === id);

          if (index !== -1) {
            this.reports.splice(index, 1);
          }
        }
        return res.data; // Return the response data
      } catch (error) {
        console.error("Error confirming report:", error);
        throw error;
      }
    },
    async declineReport(id, remark) {
      try {
        const res = await api.post(`/api/decline-initial-baker-report/${id}`, {
          remark,
        });

        if (res.status === 200) {
          const index = this.reports.findIndex((report) => report.id === id);

          if (index !== -1) {
            this.reports.splice(index, 1);
          }
        }
        return res.data;
      } catch (error) {
        console.error("Error declining report:", error);
      }
    },
  },

  getters: {
    overallKilo(state) {
      return state.reports.reduce((acc, report) => {
        const kiloValue = parseFloat(report.kilo) || 0;
        return acc + kiloValue;
      }, 0);
    },

    totalEmployeesInShift(state) {
      return state.employeeInShift.length;
    },
  },
});
