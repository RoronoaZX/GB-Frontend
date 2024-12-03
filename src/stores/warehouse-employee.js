import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

export const useWarehouseEmployeeStore = defineStore(
  "warehouseEmployee",
  () => {
    const warehouseEmployee = ref(null);
    const warehouseEmployees = ref([]);

    const createWarehouseEmployee = async (data) => {
      try {
        const response = await api.post(`/api/warehouse-employee`, data);
        warehouseEmployees.value = response.data;
        Notify.create({
          type: "positive",
          message: "Employee created successfully",
          setTimeout: 1000,
          position: "top",
        });
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error creating employee:", error);
        Notify.create({
          type: "negative",
          message: `Failed to create employeesss`,
          setTimeout: 1000,
        });
      }
    };

    return {
      warehouseEmployee,
      warehouseEmployees,
      createWarehouseEmployee,
    };
  }
);
