import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { api } from "src/boot/axios";
import { Loading, Notify } from "quasar";

export const useRecipeStore = defineStore("recipes", () => {
  const recipe = ref(null);
  const recipes = ref([]);

  const fetchRecipes = async () => {
    const response = await api.get("/api/recipes");
    recipes.value = response.data;
  };

  const createRecipe = async (data) => {
    try {
      Loading.show();
      const response = await api.post("/api/recipes", data);

      // const newRecipe = {
      //   ...response.data,
      //   bread_groups: data.bread_groups || [],
      //   ingredient_groups: data.ingredient_groups || [],
      // };
      recipes.value.unshift(response.data);
    } catch (error) {
      console.error("User Error message: ", error);
    } finally {
      Loading.hide();
    }
  };

  const deleteRecipe = async (id) => {
    Loading.show();

    try {
      const response = await api.delete(`/api/recipes/${id}`);
      recipes.value = recipes.value.filter((recipe) => recipe.id !== id);
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

  const searchRecipe = async (searchQuery) => {
    const response = await api.get(`/api/search-recipes`, {
      params: { keyword: searchQuery },
    });
    recipes.value = response.data;
    console.log("recipe:", response.data);
  };

  return {
    recipe,
    recipes,
    fetchRecipes,
    createRecipe,
    deleteRecipe,
    searchRecipe,
  };
});
