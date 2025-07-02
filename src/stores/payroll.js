import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const usePayrollStore = defineStore("payroll", () => {
  const payroll = ref(null);
  const payrollPerCutOff = ref([]);

  const fetchPayrollPerCutOff = async (id) => {
    console.log("employee ID in fetfching payrol:", id);
    try {
      const response = await api.get(`/api/fetch-payroll-cut-off/${id}`);
    } catch (error) {}
  };

  return {
    payroll,
    payrollPerCutOff,
    fetchPayrollPerCutOff,
  };
});
