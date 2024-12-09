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
    const user = ref({});

    const setUser = (newUser) => {
      user.value = newUser;
    };
    const rawMaterialsStore = useRawMaterialsStore();
    const rawMaterialsData = computed(() => rawMaterialsStore.rawMaterials);

    const fetchWarehouseRawMaterials = async (warehouseId) => {
      console.log("warehouseId", warehouseId);
      try {
        const response = await api.get(
          `/api/warehouse/${warehouseId}/rawMaterials`
        );

        console.log("response", response.data);
        warehouseRawMaterials.value = response.data;
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
      user,
      warehouseId,
      warehouseRawMaterial,
      warehouseRawMaterials,
      createWarehouseRawMaterials,
      fetchWarehouseRawMaterials,
      deleteWarehouseRawMaterials,
      searchWarehouseRawMaterials,
    };
  }
);
