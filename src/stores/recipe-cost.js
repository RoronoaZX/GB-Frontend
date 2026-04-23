import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useRecipeCostStore = defineStore("recipe-cost", () => {
  const recipeCost = ref(null);
  const recipeCosts = ref([]);

  const fetchRecipeCosts = async (branchId, page, rowsPerPage, search) => {
    try {
      const response = await api.get(`/api/fetch-recipe-costs/${branchId}`, {
        params: {
          page,
          per_page: rowsPerPage,
          search,
        },
      });

      recipeCosts.value = response.data;
      return response.data;
    } catch (error) {
      console.log("Error fetching recipe costs:", error);
      throw error;
    }
  };

  const fetchGlobalRecipeCosts = async (recipeId, page, rowsPerPage) => {
    try {
      const response = await api.get(`/api/fetch-global-recipe-costs/${recipeId}`, {
        params: {
          page,
          per_page: rowsPerPage,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching global recipe costs:", error);
      throw error;
    }
  };

  return {
    recipeCost,
    recipeCosts,
    fetchRecipeCosts,
    fetchGlobalRecipeCosts,
  };
});
