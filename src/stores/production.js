import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useProductionStore = defineStore("productions", () => {
  const productions = ref([]);
  const production = ref([]);

  const fetchAllProduction = async () => {
    const response = await api.get("/api/branch-production-report");
    productions.value = response.data.reports;
  };

  const fetchBranchProductions = async (branchId) => {
    try {
      const response = await api.get(
        `/api/branches/${branchId}/production-report`
      );
      productions.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateBakerReport = async (id, data) => {
    console.log("baker reports data in store", data);
    console.log("baker reports id data in store", id);
    Loading.show();
    try {
      // Make sure the URL matches your Laravel route's endpoint
      const response = await api.put(
        `api/update/branch-baker-report/${id}`,
        data
      );
      console.log(response.data); // Log the response if needed
    } catch (error) {
      console.error("Error updating baker report:", error);
    } finally {
      Loading.hide();
    }
  };

  // const updateBreadPrice = async () => {

  // }

  return {
    productions,
    production,
    fetchAllProduction,
    fetchBranchProductions,
    updateBakerReport,
  };
});
