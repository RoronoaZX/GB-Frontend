import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useBirReportsStore = defineStore("bir-reports", () => {
  const birReport = ref(null);
  const birReports = ref([]);

  const fetchNonVatBirReports = async (branchId, startDate, endDate) => {
    console.log(`fetchBirReports`, branchId);
    console.log(`fetchBirReports startDate`, startDate);
    console.log(`fetchBirReports endDate`, endDate);
    try {
      const response = await api.get(
        `/api/fetch-non-vat-bir-reports/${branchId}`,
        {
          params: { startDate, endDate },
        }
      );
      console.log("birReports", response.data);
      birReports.value = response.data;
    } catch (error) {
      console.error("Error fetching BIR reports:", error);
    }
  };

  const fetchBranchData = async (branchId) => {
    console.log(`fetchBranchData`, branchId);
    try {
      const response = await api.get(
        `/api/fetch-branch-data-for-bir-report/${branchId}`
      );
      console.log("branchData", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching branch data:", error);
    }
  };

  return {
    birReport,
    birReports,
    fetchNonVatBirReports,
    fetchBranchData,
  };
});
