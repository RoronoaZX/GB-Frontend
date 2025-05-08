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
      console.log("response.response", response.data);
      fetchRecipes();
      Notify.create({
        type: "positive",
        message: "Recipe successfully created",
        timeout: 1000,
      });
    } catch (error) {
      console.error("User Error message: ", error);
      if (error.response.data.message === "The name has already been taken.") {
        Notify.create({
          type: "warning",
          icon: "warning",
          message: error.response.data.message || "ERROR",
          setTimeout: 5000,
        });
      } else {
        Notify.create({
          type: "negative",
          icon: "error",
          message: error.response.data.message || "ERROR",
          setTimeout: 5000,
        });
      }
    } finally {
      Loading.hide();
    }
  };

  const updateRecipeName = async (data, val) => {
    console.log("data", data);
    try {
      Loading.show();
      const response = await api.put("/api/update-name/" + data.id, {
        name: val,
      });

      const updatedRecipe = response.data;

      console.log("recipe response", response.data);

      const index = recipes.value.findIndex((item) => item.id == data.id);
      if (index !== -1) {
        recipes.value[index] = {
          ...recipes.value[index],
          ...updatedRecipe,
        };
      }
      Notify.create({
        type: "positive",
        message: "Recipe name updated successfully",
        setTimeout: 5000,
      });
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "The name has already been taken.") {
        Notify.create({
          type: "warning",
          icon: "warning",
          message: error.response.data.message || "ERROR",
          setTimeout: 5000,
        });
      } else {
        Notify.create({
          type: "negative",
          icon: "error",
          message: error.response.data.message || "ERROR",
          setTimeout: 5000,
        });
      }
    } finally {
      Loading.hide();
    }
  };

  const deleteRecipe = async (id) => {
    try {
      Loading.show();
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
    updateRecipeName,
    deleteRecipe,
    searchRecipe,
  };
});
