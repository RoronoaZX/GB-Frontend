// import { defineStore } from "pinia";
// import { reactive } from "vue";

// export const useBakerReportsStore = defineStore("bakerReports", async () => {
//   const recipes = reactive({
//     name: "",
//     targetPcs: "",
//     actualTarget: "",
//     short: "",
//     over: "",
//     kilo: "",
//     breads: [],
//   });

//   const setRecipe = async (recipeData) => {
//     recipes = {
//       ...recipes,
//       ...recipeData,
//       breads: recipeData.bread || [],
//     };
//   };

//   return {
//     recipes,
//     setRecipe,
//   };
// });

import { defineStore } from "pinia";
import { Notify } from "quasar";
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
    },
    removeReport(index) {
      this.reports.splice(index, 1);
    },
    setUser(user) {
      this.user = user;
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
      this.reports = response.data;
    },

    async createReports() {
      try {
        console.log("data to send:", this.reports);
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
      }
    },

    async confirmReport(id) {
      try {
        const res = await api.post(`/api/confirm-initial-baker-report/${id}`);
        console.log("Confirming report with ID:", id);
        await this.fetchDoughReports(); // Call the method as a function
        return res.data; // Return the response data
      } catch (error) {
        console.error("Error confirming report:", error);
        throw error;
      }
    },
    async declineReport(id) {
      try {
        await api.post(`/api/decline-initial-baker-report/${id}`);
        this.fetchDoughReports;
      } catch (error) {
        console.error("Error declining report:", error);
      }
    },
  },
});
