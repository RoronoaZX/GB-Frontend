import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

export const usePayslipStore = defineStore("payslips", () => {
  const payslip = ref(null);
  const payslips = ref([]);

  const createPayslip = async (data) => {
    console.log("data payslip data", data);
    try {
      const response = await api.post("/api/payslip", data);
      Notify.create({
        type: "positive",
        message: "Payslip successfully created",
        setTimeout: 1000,
      });
      return response.data;
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "Error creating payslip",
        setTimeout: 1000,
      });
      console.log("payslip error", error);
    }
  };

  return {
    payslip,
    payslips,
    createPayslip,
  };
});
