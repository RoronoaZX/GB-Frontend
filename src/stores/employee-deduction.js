import { defineStore } from "pinia";
import { Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useEmployeeDeductions = defineStore("employee-deductions", () => {
  const deduction = ref(null);
  const deductions = ref([]);

  const createEmployeeDeduction = async (data) => {
    try {
      const response = await api.post("/api/employee-deduction", data);
      deductions.value.unshift(response.data);
      Notify.create({
        type: "positive",
        position: "top",
        message: "Employee deductions successfully created",
        setTimeout: 1000,
      });
    } catch (error) {
      console.log(error);
      Notify.create({
        type: "negative",
        position: "top",
        message: "Error creating employee deduction",
        setTimeout: 1000,
      });
    }
  };

  return {
    deduction,
    deductions,
    createEmployeeDeduction,
  };
});
