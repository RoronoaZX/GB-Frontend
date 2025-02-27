import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { computed, ref } from "vue";
import { useRawMaterialsStore } from "./raw-material";

export const useWarehouseRawMaterialsStore = defineStore(
  "warehouseRawMaterials",
  () => {
    const warehouseRawMaterial = ref(null);
    const warehouseRawMaterials = ref([]);
    const warehouseId = ref([]);
    const branch = ref([]);
    const branchRawMaterials = ref([]);
    const branchRecipe = ref([]);
    const warehouseRawMaterialsReport = ref([]);
    const user = ref({});

    const setUser = (newUser) => {
      user.value = newUser;
    };
    const rawMaterialsStore = useRawMaterialsStore();
    const rawMaterialsData = computed(() => rawMaterialsStore.rawMaterials);

    const setReport = (report) => {
      console.log("report", report);
      warehouseRawMaterialsReport.value.push(report);
      branchRecipe.value = [];
    };

    const removeReport = (index) => {
      warehouseRawMaterialsReport.value.splice(index, 1);
    };

    const fetchWarehouseRawMaterials = async (warehouseId) => {
      console.log("warehouseId", warehouseId);
      try {
        const response = await api.get(
          `/api/warehouse/${warehouseId}/rawMaterials`
        );

        console.log("responsesss", response.data);
        warehouseRawMaterials.value = response.data;
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchBranchUnderWarehouse = async (warehouseId) => {
      try {
        const response = await api.get(`/api/warehouse/${warehouseId}/branch`);
        console.log("responsesss", response.data);
        branch.value = response.data;
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchBranchRawMaterials = async (branchId) => {
      console.log("branchIdss", branchId);
      try {
        const response = await api.get(`/api/branch/${branchId}/rawMaterials`);
        console.log("responsesss", response.data);
        branchRawMaterials.value = response.data;
      } catch (error) {
        console.log("error", error);
      }
    };

    const searchWarehouseRawMaterials = async (searchKeyWord, warehouseId) => {
      const response = await api.post(`/api/search-warehouse-rawMaterials`, {
        keyword: searchKeyWord,
        warehouse_id: warehouseId,
      });

      warehouseRawMaterials.value = response.data;
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

    const createWarehouseRawMaterials = async (data) => {
      Loading.show();
      console.log("datassss", data);
      try {
        const response = await api.post(
          `/api/warehouse-raw-materials-report`,
          data
        );

        console.log("responsedfasdfasd", response.data);

        // warehouseRawMaterials.value = response.data;
        if (
          response.data.message === "Warehouse Raw Materials saved successfully"
        ) {
          const rawMaterials = rawMaterialsData.value.find(
            (item) => item.id === data.raw_material_id
          );

          const newRawMaterials = {
            ...response.data,
            raw_materials: rawMaterials
              ? rawMaterials
              : { name: "No Name", code: "Unknown" },
            total_quantity: data.total_quantity,
          };

          console.log("newRawMaterials", newRawMaterials);

          warehouseRawMaterials.value.unshift(newRawMaterials);
          Notify.create({
            type: "positive",
            message: "Warehouse Raw Materials saved successfully",
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

    const createMultipleWarehouseRawMaterials = async (materials) => {
      try {
        const response = await api.post(
          "/api/warehouse/raw-materials/bulk-create",
          {
            materials,
          }
        );
        if (
          response.data.message === "Warehouse Raw Materials saved successfully"
        ) {
          const rawMaterials = materials.map((material) => {
            const rawMaterial = rawMaterialsData.value.find(
              (item) => item.id === material.raw_material_id
            );

            return {
              ...material,
              raw_materials: rawMaterial
                ? rawMaterial
                : { name: "No Name", code: "Unknown" },
              total_quantity: material.total_quantity,
            };
          });

          console.log("newRawMaterials", ...rawMaterials);

          warehouseRawMaterials.value.unshift(...rawMaterials);

          Notify.create({
            type: "positive",
            message: "Warehouse Raw Materials saved successfully",
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

    const saveWarehouseRawMaterialsReport = async () => {
      try {
        console.log(
          "warehouseRawMaterialsReport",
          warehouseRawMaterialsReport.value
        );

        const response = await api.post(`/api/warehouse-rawMaterials-report`, {
          reports: warehouseRawMaterialsReport.value,
        });
        console.log("Report saved successfully:", response.data);
      } catch (error) {
        if (error.response && error.response.data) {
          console.error("Error response:", error.response.data);
          // Display error messages in the UI if necessary
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    const warehouseAddSupply = async (data) => {
      console.log("data, ", data);
      try {
        const response = await api.post(
          `/api/warehouseRawMaterials-add-supply`,
          data
        );
        warehouseRawMaterials.value = response.data;
        console.log("warehouseRawMaterials save", warehouseRawMaterials);
      } catch (error) {
        console.error(error);
      }
    };

    const deleteWarehouseRawMaterials = async (id) => {
      const response = await api.delete(
        `/api/warehouse-raw-materials-report/${id}`
      );
      warehouseRawMaterials.value = warehouseRawMaterials.value.filter(
        (warehouseRawMaterial) => warehouseRawMaterial.id !== id
      );
    };

    return {
      setUser,
      setReport,
      removeReport,
      user,
      branch,
      warehouseId,
      branchRecipe,
      branchRawMaterials,
      warehouseRawMaterial,
      warehouseRawMaterials,
      warehouseRawMaterialsReport,
      createWarehouseRawMaterials,
      fetchWarehouseRawMaterials,
      deleteWarehouseRawMaterials,
      searchWarehouseRawMaterials,
      warehouseAddSupply,
      fetchBranchUnderWarehouse,
      fetchBranchRawMaterials,
      searchBranchRecipe,
      saveWarehouseRawMaterialsReport,
      createMultipleWarehouseRawMaterials,
    };
  }
);
