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

  const fetchSelectaProductReports = async (branchId, page, rowsPerPage) => {
    try {
      const response = await api.get(`/api/selecta-added-stocks/${branchId}`, {
        params: {
          page,
          per_page: rowsPerPage, // pagination
        },
      });

      return response.data; // return the full response for use in the component
    } catch (error) {
      console.log("Error fetching selecta product reports:", error);
      throw error; // Propagate the error for handling in the component
    }
  };

  // const fetchSelectaProductReports = async (branchId) => {
  //   try {
  //     const response = await api.get(`/api/selecta-added-stocks/${branchId}`);

  //     selectaProductReports.value = response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
      // await fetchSelectaProductReports();
      selectaProducts.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const confirmReport = async (id) => {
    console.log("id", id);
    try {
      const response = await api.post(`/api/confirm-selecta-report/${id}`);
      if (response.status === 200) {
        // Find the index of the report in the pendingSelectaReports array
        const index = pendingSelectaReports.value.findIndex(
          (report) => report.id === id
        );

        // If the report is found, remove it
        if (index !== -1) {
          pendingSelectaReports.value.splice(index, 1);
        }
      }

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
      if (response.status === 200) {
        // Find the index of the report in the pendingSelectaReports array
        const index = pendingSelectaReports.value.findIndex(
          (report) => report.id === id
        );

        // If the report is found, remove it
        if (index !== -1) {
          pendingSelectaReports.value.splice(index, 1);
        }
      }

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
