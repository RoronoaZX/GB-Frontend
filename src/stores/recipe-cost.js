import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useRecipeCostStore = defineStore("recipe-cost", () => {
  const recipeCost = ref(null);
  const recipeCosts = ref([]);

  const fetchRecipeCosts = async (branchId, page, rowsPerPage, search) => {
    console.log("Fetching recipe costs in store...");
    console.log("branchId in recipe cost", branchId);
    console.log("page in recipe cost", page);
    console.log("rowsPerPage in recipe cost", rowsPerPage);
    console.log("search in recipe cost", search);

    try {
      const response = await api.get(`/api/fetch-recipe-costs/${branchId}`, {
        params: {
          page,
          per_page: rowsPerPage,
          search,
        },
      });

      console.log("recipeCosts", response.data);

      recipeCosts.value = response.data;
    } catch (error) {
      console.log("Error fetching recipe costs:", error);
    }
  };

  return {
    recipeCost,
    recipeCosts,
    fetchRecipeCosts,
  };
});
