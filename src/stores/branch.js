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

  const search = async (keyword) => {
    try {
      console.log("Searching for branch with keyword:", keyword);

      const response = await api.post(`/api/search-branch?keyword=${keyword}`);

      console.log("Search branch:", response);

      if (response && response.data && response.data.length > 0) {
        console.log("Search Results:", response.data);
        branch.value = response.data;
      } else {
        console.log("No employees found or empty response");
        branch.value = [];
      }
    } catch (error) {
      console.error("Error searching employee:", error);
    }
  };

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
      console.log("create branchssss", response);
      fetchBranches();
      Notify.create({
        type: "positive",
        message: "Branch created successfully",
        setTimeout: 1000,
      });
    } catch (error) {
      console.log("error", error);
      if (error.response.data.message === "The name has already been taken.") {
        Notify.create({
          type: "warning",
          icon: "warning",
          message: "The name has already been taken.",
          // position: "top",
        });
      } else if (
        error.response.data.message === "Request failed with status code 422"
      ) {
        Notify.create({
          type: "negative",
          icon: "error",
          message: "Request failed with status code 422",
          // position: "top",
        });
      }
    }
  };

  const updateBranches = async (id, data) => {
    try {
      Loading.show();
      const response = await api.put(`/api/branches/${id}`, data);

      console.log("response edit", response.data);
      const updatedBranch = response.data;

      // Find and update the branch in the local branches array
      const index = branches.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        branches.value[index] = {
          ...branches.value[index],
          ...updatedBranch,
        };
      }

      Notify.create({
        type: "positive",
        message: "Branch updated successfully",
      });
    } catch (error) {
      console.log("updateBranches", error);
      if (
        error.response?.data?.message === "The name has already been taken."
      ) {
        Notify.create({
          type: "warning",
          icon: "warning",
          message: error.response?.data?.message || "Failed to update branch",
          setTimeout: 1000,
        });
      } else {
        Notify.create({
          type: "negative",
          icon: "error",
          message: error.response?.data?.message || "Failed to update branch",
          setTimeout: 1000,
        });
      }
    } finally {
      Loading.hide();
    }
  };

  // const updateBranches = async (id, data) => {
  //   Loading.show();
  //   try {
  //     const response = await api.put(`/api/branches/${id}`, data);

  //     console.log("response.edit", response.data);
  //     // branches.value = response.data;
  //     // fetchBranches();

  //     Notify.create({
  //       type: "positive",
  //       message: "Branch updated successfully",
  //       // position: "top",
  //     });
  //   } catch (error) {
  //     console.log("updateBranches", error);
  //     Notify.create({
  //       type: "negative",
  //       icon: "error",
  //       message: "Failed to update branch",
  //       // position: "top",
  //     });
  //   } finally {
  //     Loading.hide();
  //   }
  // };

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
    search,
    fetchBranches,
    createBranches,
    updateBranches,
    deleteBranches,
    fetchWarehouseName,
    fetchBranchesById,
    fetchBranchWithEmployee,
  };
});
