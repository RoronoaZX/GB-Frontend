import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

export const usePayslipStore = defineStore("payslips", () => {
  const payslip = ref(null);
  const payslips = ref([]);

  // const createPayslip = async (data) => {
  //   console.log("data payslip data", data);
  //   try {
  //     const response = await api.post("/api/payslip", data);

  //     return response.data;
  //   } catch (error) {
  //     console.log("payslipsss error", error);

  //     if (error.response.data.message === "Payslip already exists") {
  //       Notify.create({
  //         type: "warning",
  //         message: `Duplicate payslip detected. A payslip with the same details already exists! `,
  //         setTimeout: 5000,
  //       });
  //     } else {
  //       Notify.create({
  //         type: "negative",
  //         message: `${error.response.data.message}! `,
  //         setTimeout: 5000,
  //       });
  //     }

  //     console.log("payslip error", error);

  //     throw error;
  //   }
  // };

  const createPayslip = async (data, { showSuccess = false } = {}) => {
    console.log("data payslip data", data);

    try {
      const response = await api.post("/api/payslip", data);
      console.log("payslip response", response.data)
      if (
        showSuccess &&
        response.data?.message === "Payslip saved successfully"
      ) {
        Notify.create({
          type: "positive",
          message: "Payslip saved successfully!",
          timeout: 3000,
        });
      }

      return response.data;
    } catch (error) {
      console.log("payslipsss error", error);

      if (error.response?.data?.message === "Payslip already exists") {
        Notify.create({
          type: "warning",
          message: `Duplicate payslip detected. A payslip with the same details already exists!`,
          timeout: 5000,
        });
      } else {
        Notify.create({
          type: "negative",
          message: `${error.response?.data?.message || "Something went wrong"
            }!`,
          timeout: 5000,
        });
      }

      throw error;
    }
  };

  // const createPayslip = async (
  //   data,
  //   { showSuccessNotification = false } = {}
  // ) => {
  //   console.log("data payslip data", data);
  //   try {
  //     const response = await api.post("/api/payslip", data);

  //     if (
  //       showSuccessNotification &&
  //       response.data?.message === "Payslip saved successfully"
  //     ) {
  //       Notify.create({
  //         type: "positive",
  //         message: `Payslip saved successfully!`,
  //         timeout: 3000,
  //       });
  //     }
  //     return response.data;
  //   } catch (error) {
  //     console.log("payslipsss error", error);

  //     if (error.response?.data?.message === "Payslip already exists") {
  //       Notify.create({
  //         type: "warning",
  //         message: `Duplicate payslip detected. A payslip with the same details already exists! `,
  //         timeout: 5000,
  //       });
  //     } else {
  //       Notify.create({
  //         type: "negative",
  //         message: `${
  //           error.response?.data?.message ||
  //           "An error occurred while saving the payslip."
  //         }! `,
  //         timeout: 5000,
  //       });
  //     }

  //     throw error;
  //   }
  // };

  const cutoffSummary = ref([]);
  const cutoffPeriods = ref([]);

  const fetchCutoffSummary = async (from, to) => {
    try {
      const response = await api.get("/api/payslip/cutoff-summary", {
        params: { from, to },
      });
      cutoffSummary.value = response.data;
      return response.data;
    } catch (error) {
      console.error("Error fetching cut-off summary:", error);
      Notify.create({
        type: "negative",
        message: "Failed to fetch cut-off summary.",
        timeout: 3000,
      });
      throw error;
    }
  };

  const fetchCutoffPeriods = async () => {
    try {
      const response = await api.get("/api/payslip/cutoff-periods");
      cutoffPeriods.value = response.data;
      return response.data;
    } catch (error) {
      console.error("Error fetching cut-off periods:", error);
      Notify.create({
        type: "negative",
        message: "Failed to fetch cut-off periods.",
        timeout: 3000,
      });
      throw error;
    }
  };

  const selectedEstablishment = ref("global");

  return {
    payslip,
    payslips,
    cutoffSummary,
    cutoffPeriods,
    selectedEstablishment,
    createPayslip,
    fetchCutoffSummary,
    fetchCutoffPeriods,
  };
});
