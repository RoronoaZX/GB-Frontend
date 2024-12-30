import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useBranchRecipeStore = defineStore("branchRecipe", () => {
  const branchRecipe = ref(null);
  const branchRecipes = ref([]);
  const ingredients = ref([]);

  const fetchBranchRecipes = async (branchId) => {
    const response = await api.get(`/api/branches/${branchId}/recipes`);
    branchRecipes.value = response.data;
  };

  const fetchBranchRawMaterials = async (category, branchId) => {
    console.log("fetchBranchRawMaterials", category, branchId);
    try {
      const response = await api.get(`/api/branch/${branchId}/ingredients`, {
        params: {
          category: category,
        },
      });
      console.log("ingredients", response.data);
      ingredients.value = response.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const saveBranchRecipe = async (data) => {
    console.log("saveBranchRecipeStore", data);
    Loading.show();
    try {
      const response = await api.post("/api/branch-recipe", data);

      if (response.data.message === "Branch recipe saved successfully") {
        const branchRecipe = branchRecipes.value.find(
          (item) => item.id === data.recipe_id
        );
        branchRecipes.value = response.data;
        console.log("branchRecipes", response.data);
        Notify.create({
          type: "positive",
          message: "Branch product saved successfully",
          position: "top",
        });
      } else if (
        response.data.message === "The recipe already exists in this branch."
      ) {
        Notify.create({
          type: "warning",
          message: "The product already exists in this branch.",
          position: "top",
        });
      }

      fetchBranchRecipes();
    } catch (error) {
      console.log("error", error);
    } finally {
      Loading.hide();
    }
  };

  const deleteRecipe = async (id) => {
    Loading.show();

    try {
      const response = await api.delete(`/api/branch-recipe/${id}`);
      branchRecipes.value = branchRecipes.value.filter(
        (recipe) => recipe.id !== id
      );
      Notify.create({
        type: "positive",
        icon: "warning",
        message: "Recipe succesfully deleted",
        timeout: 1000,
        // position: "top-right",
      });
    } catch (error) {
      Notify.create({
        message: `Failed to delete item: ${error.message}`,
        type: "negative",
        position: "top-right",
      });
    } finally {
      Loading.hide();
    }
  };

  const searchBranchRecipe = async (searchQuery, branchId) => {
    const response = await api.get(`/api/branch-recipe-search`, {
      params: {
        keyword: searchQuery,
        branch_id: branchId,
      },
    });
    branchRecipe.value = response.data;
    console.log("branch recipe", response.data);
  };

  return {
    branchRecipe,
    branchRecipes,
    ingredients,
    saveBranchRecipe,
    fetchBranchRecipes,
    deleteRecipe,
    searchBranchRecipe,
    fetchBranchRawMaterials,
  };
});
