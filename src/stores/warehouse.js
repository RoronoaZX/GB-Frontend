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
        setTimeout: 1000,
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
      console.log("Response from backend:", response.data);
      fetchWarehouses();
      // if (response.data.message === "Warehouse save successfully") {
      //   warehouses.value.unshift(response.data.warehouse);
      //   Notify.create({
      //     type: "positive",
      //     message: "Warehouse created successfully",
      //     setTimeout: 1000,
      //     // position: "top",
      //   });
      // } else if (response.data.message === "Warehouse already exist") {
      //   Notify.create({
      //     type: "warning",
      //     message: "Warehouse already exist",
      //     setTimeout: 1000,
      //     // position: "top",
      //   });
      // }
    } catch (error) {
      console.error(
        "Error creating warehouse:",
        error.response ? error.response.data : error.message
      );
      Notify.create({
        type: "negative",
        message: "Failed to create warehouse",
        setTimeout: 1000,
        // position: "top",
      });
    }
  };

  const updateWarehouses = async (id, data) => {
    Loading.show();
    try {
      const response = await api.put(`/api/warehouses/${id}`, data);
      fetchWarehouses();
      // const index = warehouses.value.findIndex((item) => item.id === id);
      // if (index !== -1) {
      //   warehouses.value[index] = response.data;
      // }
      Notify.create({
        type: "positive",
        message: "Warehouse updated successfully",
        setTimeout: 1000,
        // position: "top",
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "Failed to update warehouse",
        setTimeout: 1000,
        // position: "top",
      });
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
