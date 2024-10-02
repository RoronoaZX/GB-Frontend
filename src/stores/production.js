import { defineStore } from "pinia";
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
    const response = await api.get(
      `/api/branches/${branchId}/production-report`
    );
    productions.value = response.data;
  };

  return {
    productions,
    production,
    fetchAllProduction,
    fetchBranchProductions,
  };
});
