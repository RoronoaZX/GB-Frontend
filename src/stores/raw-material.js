import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useRawMaterialsStore = defineStore("rawMaterials", () => {
  const rawMaterial = ref(null);
  const rawMaterials = ref([]);
  const ingredients = ref([]);

  const searchRawMaterials = async (searchQuery) => {
    const response = await api.get(`/api/search-rawMaterials`, {
      params: { keyword: searchQuery },
    });
    rawMaterials.value = response.data;
    console.log("Search rawe materials", response.data);
  };

  const fetchRawMaterials = async () => {
    // Loading.show();
    const response = await api.get("/api/raw-materials");
    rawMaterials.value = response.data;
    // Loading.hide();
  };

  const createRawMaterials = async (data) => {
    // Loading.show();
    console.log("Data", data);

    try {
      Loading.show();
      const response = await api.post("/api/raw-materials", data);
      console.log("RawMaterials", response.data.rawMaterials);
      rawMaterials.value.unshift(response.data.rawMaterials);
      Notify.create({
        type: "positive",
        message: "Raw Materials successfully created",
        timeout: 1000,
      });
    } catch (error) {
      console.log("error", error);

      if (
        error.response.data.message === "The code has already been taken." ||
        "The name has already been taken."
      ) {
        Notify.create({
          type: "warning",
          icon: "warning",
          message: error.response.data.message || "ERROR",
          timeout: 5000,
          // position: "top",
        });
      } else {
        Notify.create({
          type: "negative",
          icon: "error",
          message: error.response.data.message || "ERROR",
          timeout: 5000,
          // position: "top",
        });
      }
    } finally {
      Loading.hide();
    }
  };

  const updateRawMaterials = async (id, data) => {
    try {
      Loading.show();

      const response = await api.put(`/api/raw-materials/${id}`, data);
      const updatedRawMaterial = rawMaterials.value.findIndex(
        (rawMaterial) => rawMaterial.id === id
      );
      if (updatedRawMaterial !== -1) {
        rawMaterials.value[updatedRawMaterial] = response.data;
      }
      Notify.create({
        type: "positive",
        message: "Raw Materials updated successfully",
        timeout: 1000,
        // position: "top",
      });
    } catch (error) {
      console.log("erororoeo", error);
      if (
        error.response.data.message ===
        "The name has already been taken. (and 1 more error)"
      ) {
        Notify.create({
          type: "warning",
          icon: "warning",
          message: error.response.data.message || "ERROR",
          timeout: 5000,
        });
      } else {
        Notify.create({
          type: "negative",
          icon: "error",
          message: error.response.data.message || "ERROR",
          timeout: 5000,
        });
      }
    }

    Loading.hide();
  };

  const deleteRawMaterials = async (id) => {
    // Loading.show();
    const response = await api.delete(`/api/raw-materials/${id}`);
    rawMaterials.value = rawMaterials.value.filter(
      (rawMaterial) => rawMaterial.id !== id
    );
    Notify.create({
      type: "positive",
      icon: "warning",
      message: `Raw Materials successfully deleted`,
      timeout: 1000,
    });
    // Loading.hide();
  };

  const fetchIngredients = async (category) => {
    const response = await api.get("/api/ingredients", category);
    ingredients.value = response.data;
  };

  return {
    rawMaterial,
    rawMaterials,
    ingredients,
    searchRawMaterials,
    createRawMaterials,
    fetchRawMaterials,
    updateRawMaterials,
    deleteRawMaterials,
    fetchIngredients,
  };
});
