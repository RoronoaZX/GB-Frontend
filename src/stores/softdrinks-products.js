import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useSoftdrinksProductStore = defineStore(
  "softdrinksProducts",
  () => {
    const softdrinksProduct = ref(null);
    const softdrinksProducts = ref([]);
    const pendingSoftdrinksReports = ref([]);
    const confirmedSoftdrinksReports = ref([]);
    const declinedSoftdrinksReports = ref([]);
    const softdrinksProductsReport = ref([]);

    const fetchSoftdrinksProductReports = async (
      branchId,
      page,
      rowsPerPage
    ) => {
      try {
        const response = await api.get(
          `/api/softdrinks-added-stocks/${branchId}`,
          {
            params: {
              page: page,
              per_page: rowsPerPage, // pagination
            },
          }
        );

        console.log("response", response.data);
        return response.data;
        // return the full response for use in the component
      } catch (error) {
        console.log("Error fetching selecta product reports:", error);
        throw error; // Propagate the error for handling in the component
      }
    };

    const fetchPendingSoftdrinksStocks = async (
      branchId,
      status,
      page,
      perPage
    ) => {
      console.log("branchId", branchId);
      console.log("category", status);

      try {
        const response = await api.get(
          `/api/softdrinks-added-stocks/${branchId}/pending-reports`, // Include branchId in the URL
          {
            params: {
              status: status, // Keep category in the query parameters
              page: page,
              per_page: perPage,
            },
          }
        );
        pendingSoftdrinksReports.value = response.data;
      } catch (error) {
        console.log(error);
      }
    };

    const fetchConfirmedSoftdrinksStocks = async (
      branchId,
      status,
      page,
      rowsPerPage
    ) => {
      console.log("branchId", branchId);
      console.log("category", status);

      try {
        const response = await api.get(
          `/api/softdrinks-added-stocks/${branchId}/confirmed-reports`, // Include branchId in the URL
          {
            params: {
              status: status, // Keep category in the query parameters
              page: page,
              per_page: rowsPerPage,
            },
          }
        );
        confirmedSoftdrinksReports.value = response.data;
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDeclinedSoftdrinksStocks = async (
      branchId,
      status,
      page,
      rowsPerPage
    ) => {
      console.log("branchId", branchId);
      console.log("category", status);

      try {
        const response = await api.get(
          `/api/softdrinks-added-stocks/${branchId}/declined-reports`, // Include branchId in the URL
          {
            params: {
              status: status, // Keep category in the query parameters
              page: page,
              per_page: rowsPerPage,
            },
          }
        );
        declinedSoftdrinksReports.value = response.data;
      } catch (error) {
        console.log(error);
      }
    };

    const fetchBranchSoftdrinksProduct = async (branchesId, category) => {
      console.log("ID", branchesId);
      console.log("category", category);
      try {
        // Construct the query parameters dynamically based on input
        const response = await api.get(`/api/fetch-softdrinks-products`, {
          params: {
            branches_id: branchesId,
            category: category,
          },
        });

        softdrinksProducts.value = response.data;

        console.log("fetch datasss", response.data);
      } catch (error) {
        console.error("Error fetching branch selecta products:", error);
        throw error; // Re-throw the error to handle it in the calling function if necessary
      }
    };

    const searchSoftdrinksProducts = async ({
      branches_id,
      query,
      category,
    }) => {
      console.log(branches_id);
      console.log(query);
      console.log(category);
      try {
        const response = await api.post("/api/search-selecta-products", {
          branches_id,
          query,
          category,
        });
        softdrinksProductsReport.value = response.data;
      } catch (error) {
        console.error("Error searching Selecta products:", error);
      }
    };

    const createSoftdrinksStocks = async (data) => {
      console.log(data);
      try {
        const response = await api.post("/api/softdrinks-stocks-report", data);
        // await fetchSelectaProductReports();
        softdrinksProductsReport.value = response.data;
      } catch (error) {
        console.log(error);
      }
    };

    const confirmReport = async (id) => {
      console.log("id", id);
      try {
        const response = await api.post(`/api/confirm-softdrinks-report/${id}`);
        if (response.status === 200) {
          // Find the index of the report in the pendingSelectaReports array
          const index = pendingSoftdrinksReports.value.findIndex(
            (report) => report.id === id
          );

          // If the report is found, remove it
          if (index !== -1) {
            pendingSoftdrinksReports.value.splice(index, 1);
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
          `/api/reports/${id}/decline-softdrinks-reports`,
          {
            remark,
          }
        );
        if (response.status === 200) {
          // Find the index of the report in the pendingSelectaReports array
          const index = pendingSoftdrinksReports.value.findIndex(
            (report) => report.id === id
          );

          // If the report is found, remove it
          if (index !== -1) {
            pendingSoftdrinksReports.value.splice(index, 1);

            // await fetchPendingSoftdrinksStocks(branchId, "pending");
          }
        }

        return response.data;
      } catch (error) {
        console.log(error);
      }
    };

    return {
      softdrinksProduct,
      softdrinksProducts,
      pendingSoftdrinksReports,
      confirmedSoftdrinksReports,
      declinedSoftdrinksReports,
      softdrinksProductsReport,
      fetchSoftdrinksProductReports,
      fetchPendingSoftdrinksStocks,
      fetchConfirmedSoftdrinksStocks,
      fetchDeclinedSoftdrinksStocks,
      fetchBranchSoftdrinksProduct,
      searchSoftdrinksProducts,
      createSoftdrinksStocks,
      confirmReport,
      declineReport,
    };
  }
);
