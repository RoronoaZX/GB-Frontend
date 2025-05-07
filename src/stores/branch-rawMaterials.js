import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { computed, ref } from "vue";
import { useRawMaterialsStore } from "./raw-material";

export const useBranchRawMaterialsStore = defineStore(
  "branchRawMaterial",
  () => {
    const branchRawMaterial = ref(null);
    const branchRawMaterials = ref([]);
    const branchId = ref([]);

    const rawMaterialsStore = useRawMaterialsStore();
    const rawMaterialsData = computed(() => rawMaterialsStore.rawMaterials);

    const fetchBranchRawMaterials = async (branchId) => {
      const response = await api.get(`/api/branch/${branchId}/rawMaterials`);
      branchRawMaterials.value = response.data;
    };

    // const searchBranchRawMaterials = async (searchKeyword, branchId) => {
    //   const response = await api.post(`/api/search-branch-rawMaterials`, {
    //     keyword: searchKeyword,
    //     branch_id: branchId,
    //   });

    //   console.log("branch raw materials", response.data);
    //   branchRawMaterials.value = response.data;
    // };

    const createBranchRawMaterials = async (data) => {
      Loading.show();
      try {
        const response = await api.post(`/api/branch-raw-materials`, data);

        if (
          response.data.message === "Branch Raw Materials saved successfully"
        ) {
          const rawMaterials = rawMaterialsData.value.find(
            (item) => item.id === data.ingredients_id
          );

          const newRawMaterials = {
            ...response.data,
            ingredients: rawMaterials
              ? rawMaterials
              : { name: "No Name", code: "Unknown" },
            total_quantity: data.total_quantity,
          };

          branchRawMaterials.value.unshift(newRawMaterials);
          Notify.create({
            type: "positive",
            message: "Branch Raw Materials saved successfully",
            position: "top",
          });
        } else if (
          response.data.message ===
          "The RawMaterials already exists in this branch."
        ) {
          Notify.create({
            type: "warning",
            message: "The Raw Materials already exists in this branch.",
            position: "top",
          });
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          type: "negative",
          message: "An error occurred while saving the branch product.",
          position: "top",
        });
      } finally {
        Loading.hide();
      }
    };

    const createMultipleBranchRawMaterials = async (materials) => {
      try {
        const response = await api.post(
          "/api/branch/raw-materials/bulk-create",
          { materials }
        );
        console.log("multipleRawMAterials", response.data);
        response.data.data.forEach((item) => {
          const exists = branchRawMaterials.value.find(
            (mat) => mat.id === item.id
          );
          if (!exists) {
            branchRawMaterials.value.unshift(item);
          }
        });
        console("branchRawMaterials.value", branchRawMaterials.value);
      } catch (error) {}
    };

    const updateBranchRawMaterials = async (id) => {
      await api.put(`/api/update-branch-products/${id}`, { price: newPrice });
      const index = branchRawMaterials.value.findIndex(
        (item) => item.id === id
      );
      if (index !== -1) {
        branchRawMaterials.value[index].price = newPrice;
      }
    };

    const deleteBranchRawMaterials = async (id) => {
      const response = await api.delete(`/api/branch-raw-materials/${id}`);
      branchRawMaterials.value = branchRawMaterials.value.filter(
        (branchRawMaterial) => branchRawMaterial.id !== id
      );
    };

    return {
      branchId,
      branchRawMaterial,
      branchRawMaterials,
      fetchBranchRawMaterials,
      // searchBranchRawMaterials,
      createBranchRawMaterials,
      updateBranchRawMaterials,
      deleteBranchRawMaterials,
      createMultipleBranchRawMaterials,
    };
  }
);
