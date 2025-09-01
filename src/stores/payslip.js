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
      console.log("payslipsss error", error);

      if (error.response.data.message === "Payslip already exists") {
        Notify.create({
          type: "warning",
          message: `Duplicate payslip detected. A payslip with the same details already exists! `,
          setTimeout: 5000,
        });
      } else {
        Notify.create({
          type: "negative",
          message: `${error.response.data.message}! `,
          setTimeout: 5000,
        });
      }

      console.log("payslip error", error);

      throw error;
    }
  };

  return {
    payslip,
    payslips,
    createPayslip,
  };
});
