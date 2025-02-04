import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";

export const useBakerReportsStore = defineStore("bakerReportsStore", {
  state: () => ({
    recipes: {},
    reportToView: [],
    reports: [],
    rawmaterials: [],
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

    async fetchBakerReport(userId) {
      const response = await api.get(`/api/branch/${userId}/bakerReport`);
      this.reportToView = response.data;
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

    async createReports() {
      try {
        console.log("data to send:", this.reports);

        Loading.show();
        const response = await api.post("api/initial-baker-report", {
          reports: this.reports,
        });
        Notify.create({
          type: "positive",
          message: "Report successfully send",
          timeout: 1000,
        });
        console.log("Reports to be saved:", this.reports);
        this.reports = [];
      } catch (error) {
        console.error("Error saving report:", error);
        Notify.create({
          type: "negative",
          message: "Error sending report",
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
});
