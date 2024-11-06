import { defineStore } from "pinia";
import { Loading } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useBranchRecipeStore = defineStore("branchRecipe", () => {
  const branchRecipe = ref(null);
  const branchRecipes = ref([]);

  const fetchBranchRecipes = async (branchId) => {
    const response = await api.get(`/api/branches/${branchId}/recipes`);
    branchRecipes.value = response.data;
  };

  const saveBranchRecipe = async (data) => {
    console.log("saveBranchRecipeStore", data);
    Loading.show();
    try {
      const response = await api.post("/api/branch-recipe", data);
      branchRecipes.value = response.data;

      console.log("branchRecipes", response.data);

      // if(response.data.message === "Branch recipe saved successfully") {
      //   const branchRecipes = branchRecipes.value.find((item) => item.id === data.recipe_id)
      // }
    } catch (error) {
      console.log("error", error);
    } finally {
      Loading.hide();
    }
  };

  return {
    branchRecipe,
    branchRecipes,
    saveBranchRecipe,
    fetchBranchRecipes,
  };
});
