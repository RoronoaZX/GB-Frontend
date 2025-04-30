import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useOtherProductStore = defineStore("otherProduct", () => {
  const otherProduct = ref(null);
  const otherProducts = ref([]);
  const pendingOtherReports = ref([]);
  const confirmedOtherReports = ref([]);
  const declinedOtherReports = ref([]);
  const otherProductReports = ref([]);

  const fetchBranchOtherProduct = async (branchesId, category) => {
    console.log("ID", branchesId);
    console.log("category", category);
    try {
      // Construct the query parameters dynamically based on input
      const response = await api.get(`/api/fetch-other-products`, {
        params: {
          branches_id: branchesId,
          category: category,
        },
      });
      console.log("fetch datasss", response.data);
      otherProducts.value = response.data;
    } catch (error) {
      console.error("Error fetching branch selecta products:", error);
      throw error; // Re-throw the error to handle it in the calling function if necessary
    }
  };

  const fetchOtherProductReports = async (branchId, page, rowsPerPage) => {
    try {
      const response = await api.get(`/api/other-added-stocks/${branchId}`, {
        params: {
          page,
          per_page: rowsPerPage, //pagination
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching selecta product reports:", error);
      throw error; // Propagate the error for handling in the component
    }
  };

  const fetchPendingOtherStocks = async (
    branchId,
    status,
    page,
    rowsPerPage
  ) => {
    console.log("branchId", branchId);
    console.log("category", status);

    try {
      const response = await api.get(
        `/api/other-added-stocks/${branchId}/pending-reports`,
        {
          params: {
            status: status,
            page: page,
            per_page: rowsPerPage,
          },
        }
      );
      pendingOtherReports.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchConfirmedOtherStocks = async (
    branchId,
    status,
    page,
    rowsPerPage
  ) => {
    console.log("branchId", branchId);
    console.log("category", status);

    try {
      const response = await api.get(
        `/api/other-added-stocks/${branchId}/confirmed-reports`, // Include branchId in the URL
        {
          params: {
            status: status, // Keep category in the query parameters
            page,
            rowsPerPage,
          },
        }
      );
      console.log("response", response.data);
      confirmedOtherReports.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDeclinedOtherStocks = async (
    branchId,
    status,
    page,
    rowsPerPage
  ) => {
    console.log("branchId", branchId);
    console.log("category", status);

    try {
      const response = await api.get(
        `/api/other-added-stocks/${branchId}/declined-reports`, // Include branchId in the URL
        {
          params: {
            status: status, // Keep category in the query parameters
            page: page,
            per_page: rowsPerPage,
          },
        }
      );
      declinedOtherReports.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createOtherStocks = async (data) => {
    console.log(data);
    try {
      const response = await api.post("/api/other-stocks-report", data);
      otherProducts.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const confirmReport = async (id) => {
    console.log("id", id);
    try {
      const response = await api.post(`/api/confirm-otherProd-report/${id}`);
      if (response.status === 200) {
        // Find the index of the report in the pendingSelectaReports array
        const index = pendingOtherReports.value.findIndex(
          (report) => report.id === id
        );

        // If the report is found, remove it
        if (index !== -1) {
          pendingOtherReports.value.splice(index, 1);
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
      const response = await api.post(
        `/api/reports/${id}/decline-otherstocks-reports`,
        {
          remark,
        }
      );
      if (response.status === 200) {
        // Find the index of the report in the pendingOtherReports array
        const index = pendingOtherReports.value.findIndex(
          (report) => report.id === id
        );

        // If the report is found, remove it
        if (index !== -1) {
          pendingOtherReports.value.splice(index, 1);
        }
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    otherProduct,
    otherProducts,
    pendingOtherReports,
    confirmedOtherReports,
    declinedOtherReports,
    otherProductReports,
    createOtherStocks,
    fetchBranchOtherProduct,
    fetchOtherProductReports,
    fetchPendingOtherStocks,
    fetchConfirmedOtherStocks,
    fetchDeclinedOtherStocks,
    confirmReport,
    declineReport,
  };
});
