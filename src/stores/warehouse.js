import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useWarehousesStore = defineStore("warehouses", () => {
  const warehouse = ref(null);
  const warehouses = ref([]);
  const warehouseBranchReports = ref([]);
  const user = ref({});

  const setUser = (newUser) => {
    user.value = newUser;
  };

  const search = async (keyword) => {
    try {
      console.log("Searching for warehouse with keyword:", keyword);
      const response = await api.post(`/api/search-warehouse`, {
        keyword,
      });
      console.log("warehouse reposnse", response.data);
      warehouse.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWarehouseByBranchID = async (warehouseId) => {
    console.log("warehouseId", warehouseId);
    try {
      const response = await api.get(
        `/api/warehouse/${warehouseId}/warehouseBranchReports`
      );
      warehouseBranchReports.value = response.data;
      console.log("reponsess waREHOUSE ", response.data);
    } catch (error) {}
  };

  const fetchCertainWarehouse = async (warehouseId) => {
    const response = await api.get(`/api/warehouse/${warehouseId}`);
    warehouse.value = response.data;
  };
  const fetchWarehouses = async () => {
    // Loading.show();
    try {
      const response = await api.get("/api/warehouses");
      warehouses.value = response.data;
      console.log("response", response.data);
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "Failed to fetch warehouse",
        timeout: 1000,
      });
    } finally {
      // Loading.hide();
    }
  };

  const fetchWarehouseWithEmployee = async () => {
    const response = await api.get("/api/fetchWarehouseWithEmployee");
    warehouses.value = response.data;
  };

  const createWarehouses = async (data) => {
    // Loading.show();
    console.log("Data parameters being sent:", data);
    try {
      const response = await api.post("/api/warehouses", data);
      console.log("Response from backend:", response);
      fetchWarehouses();
      Notify.create({
        type: "positive",
        message: "Warehouse created successfully",
        timeout: 1000,
        // position: "top",
      });
    } catch (error) {
      console.error("Error creating warehouse:", error.response);
      if (error.response.data.message === "The name has already been taken.") {
        Notify.create({
          type: "warning",
          icon: "warning",
          message: "The name has already been taken.",
          timeout: 5000,
          // position: "top",
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
  };

  const updateWarehouses = async (id, data) => {
    console.log("datass", data);
    try {
      Loading.show();
      const response = await api.put(`/api/warehouses/${id}`, data);

      console.log("edit warehouse", response.data);
      const updatedWarehouse = response.data;

      const index = warehouses.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        warehouses.value[index] = {
          ...warehouses.value[index],
          ...updatedWarehouse,
        };
      }
      Notify.create({
        type: "positive",
        message: "Warehouse updated successfully",
        timeout: 1000,
        // position: "top",
      });
    } catch (error) {
      console.log(error);

      console.log("resposnses.error", error.response);

      if (error.response.data.message === "The name has already been taken.") {
        Notify.create({
          type: "warning",
          icon: "warning",
          message:
            error.response?.data?.message || "Failed to update warehouse",
          timeout: 5000,
          // position: "top",
        });
      } else {
        Notify.create({
          type: "negative",
          icon: "error",
          message:
            error.response?.data?.message || "Failed to update warehouse",
          timeout: 5000,
          // position: "top",
        });
      }
    } finally {
      Loading.hide();
    }
  };

  const deleteWarehouse = async (id) => {
    Loading.show();
    try {
      const response = await api.delete(`/api/warehouses/${id}`);
      warehouses.value = warehouses.value.filter((item) => item.id !== id);
      Notify.create({
        type: "positive",
        message: "Warehouse deleted successfully",
        // position: "top",
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "Failed to delete warehouse",
        // position: "top",
      });
    } finally {
      Loading.hide();
    }
  };

  return {
    user,
    warehouse,
    warehouses,
    warehouseBranchReports,
    fetchWarehouses,
    createWarehouses,
    updateWarehouses,
    deleteWarehouse,
    fetchWarehouseWithEmployee,
    fetchWarehouseByBranchID,
    fetchCertainWarehouse,
    search,
    setUser,
  };
});
