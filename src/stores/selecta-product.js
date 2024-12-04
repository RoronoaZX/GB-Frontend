import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useSelectaProductsStore = defineStore("selectaProduct", () => {
  const selectaProduct = ref(null);
  const selectaProducts = ref([]);

  const fetchPendingSelectaStocks = async (branchId) => {
    try {
      const response = await api.get(
        `/api/selecta-added-stocks/${branchId}/pending-reports`
      );
      selectaProducts.value = response.data;
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

      console.log("fetch data", response.data);
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
      const response = await api.post("/api/selecta-stocks-added", data);

      selectaProducts.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    selectaProduct,
    selectaProducts,
    searchSelectaProducts,
    createSelectaStocks,
    fetchPendingSelectaStocks,
    fetchBranchSelectaProduct,
  };
});
