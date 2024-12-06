import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useSelectaProductsStore = defineStore("selectaProduct", () => {
  const selectaProduct = ref(null);
  const selectaProducts = ref([]);
  const pendingSelectaReports = ref([]);
  const confirmedSelectaReports = ref([]);
  const declinedSelectaReports = ref([]);
  const selectaProductReports = ref([]);

  const fetchSelectaProductReports = async (branchId) => {
    try {
      const response = await api.get(`/api/selecta-added-stocks/${branchId}`);

      selectaProductReports.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPendingSelectaStocks = async (branchId, status) => {
    console.log("branchId", branchId);
    console.log("category", status);

    try {
      const response = await api.get(
        `/api/selecta-added-stocks/${branchId}/pending-reports`, // Include branchId in the URL
        {
          params: {
            status: status, // Keep category in the query parameters
          },
        }
      );
      pendingSelectaReports.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchConfirmedSelectaStocks = async (branchId, status) => {
    console.log("branchId", branchId);
    console.log("category", status);

    try {
      const response = await api.get(
        `/api/selecta-added-stocks/${branchId}/confirmed-reports`, // Include branchId in the URL
        {
          params: {
            status: status, // Keep category in the query parameters
          },
        }
      );
      confirmedSelectaReports.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDeclinedSelectaStocks = async (branchId, status) => {
    console.log("branchId", branchId);
    console.log("category", status);

    try {
      const response = await api.get(
        `/api/selecta-added-stocks/${branchId}/declined-reports`, // Include branchId in the URL
        {
          params: {
            status: status, // Keep category in the query parameters
          },
        }
      );
      declinedSelectaReports.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBranchSelectaProduct = async (branchesId, category) => {
    console.log("ID", branchesId);
    console.log("category", category);
    try {
      // Construct the query parameters dynamically based on input
      const response = await api.get(`/api/fetch-selecta-products`, {
        params: {
          branches_id: branchesId,
          category: category,
        },
      });

      selectaProducts.value = response.data;

      console.log("fetch datasss", response.data);
    } catch (error) {
      console.error("Error fetching branch selecta products:", error);
      throw error; // Re-throw the error to handle it in the calling function if necessary
    }
  };

  const searchSelectaProducts = async ({ branches_id, query, category }) => {
    console.log(branches_id);
    console.log(query);
    console.log(category);
    try {
      const response = await api.post("/api/search-selecta-products", {
        branches_id,
        query,
        category,
      });
      selectaProducts.value = response.data;
    } catch (error) {
      console.error("Error searching Selecta products:", error);
    }
  };

  const createSelectaStocks = async (data) => {
    console.log(data);
    try {
      const response = await api.post("/api/selecta-stocks-report", data);

      selectaProducts.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const confirmReport = async (id) => {
    console.log("id", id);
    try {
      const response = await api.post(`/api/confirm-selecta-report/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const declineReport = async (id, remark) => {
    console.log("id", id);
    console.log("remark", remark);
    try {
      const response = await api.post(`/api/reports/${id}/decline-reports`, {
        remark,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    selectaProduct,
    selectaProducts,
    pendingSelectaReports,
    confirmedSelectaReports,
    declinedSelectaReports,
    selectaProductReports,
    searchSelectaProducts,
    createSelectaStocks,
    fetchPendingSelectaStocks,
    fetchBranchSelectaProduct,
    confirmReport,
    fetchConfirmedSelectaStocks,
    fetchDeclinedSelectaStocks,
    fetchSelectaProductReports,
    declineReport,
  };
});
