import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useWarehousesStore } from "./warehouse";
import { api } from "src/boot/axios";
import { Loading, Notify } from "quasar";
import { useEmployeeStore } from "./employee";

export const useBranchesStore = defineStore("branches", () => {
  const branch = ref(null);
  const branches = ref([]);

  const employeeStore = useEmployeeStore();
  const employees = computed(() => employeeStore.employees);
  const warehousesStore = useWarehousesStore();
  const warehouses = computed(() => warehousesStore.warehouses);
  console.log("warehouses", warehouses.value);

  const fetchBranches = async () => {
    const response = await api.get("/api/branches");
    branches.value = response.data;
    console.log("response", response.data);

    // branches.value = response.data.map((branch) => {
    //   const data = { ...branch };
    //   const warehouse = warehouses.value.find(
    //     (warehouse) => warehouse.id === data.warehouse_id
    //   );

    //   data.warehouse = warehouse ? warehouse.name : "No Warehouse";

    //   const employee = employees.value.find(
    //     (employee) => employee.id === data.employee_id
    //   );
    //   data.employee = employee
    //     ? `${employee.firstname} ${employee.lastname}`
    //     : "No Employee Assigned";

    //   return data;
    // });
  };

  const fetchBranchesById = async (id) => {
    const response = await api.get(`/api/branches/${id}`);
    branch.value = response.data;
  };

  const fetchBranchWithEmployee = async () => {
    const response = await api.get(`/api/fetchBranchWithEmployee`);
    branches.value = response.data;
  };

  const createBranches = async (data) => {
    console.log("Data parameters being sent:", data);
    // Loading.show();
    try {
      const response = await api.post("/api/branches", data);
      const warehouse = warehouses.value.find(
        (item) => item.id === data.warehouse_id
      );
      const employee = employees.value.find(
        (item) => item.id === data.employee_id
      );

      const newBranch = {
        ...response.data,
        warehouse: warehouse ? warehouse.name : "No Warehouse",
        employee: employee
          ? `${employee.firstname} ${employee.lastname}`
          : "No Employee Assigned",
      };
      console.log("create branch", newBranch);
      branches.value.unshift(newBranch);
      Notify.create({
        type: "positive",
        message: "Branch created successfully",
        timeout: 1000,
        // position: "top",
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        icon: "error",
        message: "Failed to create branch",
        // position: "top",
      });
    }
  };

  const updateBranches = async (id, data) => {
    Loading.show();
    try {
      const response = await api.put(`/api/branches/${id}`, data);

      branches.value = response.data;
      fetchBranches();
      // const index = branches.value.findIndex((item) => item.id === id);
      // if (index > -1) {
      //   branches.value[index] = {
      //     ...branches.value[index],
      //     ...response.data,

      //     warehouse: warehouses.value.find(
      //       (item) => item.id === data.warehouse_id
      //     ),
      //   };
      // }

      Notify.create({
        type: "positive",
        message: "Branch updated successfully",
        // position: "top",
      });
    } catch (error) {
      console.log("updateBranches", error);
      Notify.create({
        type: "negative",
        icon: "error",
        message: "Failed to update branch",
        // position: "top",
      });
    } finally {
      Loading.hide();
    }
  };

  const deleteBranches = async (id) => {
    Loading.show();
    try {
      await api.delete(`/api/branches/${id}`);
      branches.value = branches.value.filter((branch) => branch.id !== id);
      Notify.create({
        type: "positive",
        message: "Branch successfully delete",
        // position: "top",
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        icon: "error",
        message: "Failed to delete branch",
        // position: "top",
      });
    } finally {
      Loading.hide();
    }
  };

  const fetchWarehouseName = async (warehouse_id) => {
    Loading.show();
    try {
      const response = await api.get(`/api/branches/${warehouse_id}`);
      return response.data.name;
    } catch (error) {
      return null;
    } finally {
      Loading.hide();
    }
  };

  return {
    branch,
    branches,
    fetchBranches,
    createBranches,
    updateBranches,
    deleteBranches,
    fetchWarehouseName,
    fetchBranchesById,
    fetchBranchWithEmployee,
  };
});
