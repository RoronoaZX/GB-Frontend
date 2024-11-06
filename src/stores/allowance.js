import { defineStore } from "pinia";
import { Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useEmployeeAllowance = defineStore("employee-allowance", () => {
  const allowance = ref(null);
  const allowances = ref([]);

  const searchAllowance = async (keyword) => {
    try {
      console.log("Searching for employee with keyword:", keyword);
      const response = await api.post(
        `/api/search-allowance?keyword=${keyword}`
      );
      console.log("Allowance response:", response);
      allowances.value = response.data;
    } catch (error) {
      console.error("Error searching employee:", error);
    }
  };

  const fetchEmployeeAllowance = async () => {
    try {
      const response = await api.get("/api/employee-allowance");
      allowances.value = response.data;
    } catch (error) {
      console.log("error fetching allowance", error);
    }
  };

  const createEmployeeAllowance = async (data) => {
    try {
      const response = await api.post("/api/employee-allowance", data);
      console.log("employee response", response.data);
      allowances.value.unshift(response.data);
      Notify.create({
        type: "positive",
        message: "Allowance successfully created",
        // position: "top",
        timeout: 1000,
      });
    } catch (error) {
      console.log(error);

      let errorMessage = "An error occurred. Please try again.";
      if (error.response && error.response.status === 409) {
        errorMessage = "Allowance for this employee already exists.";
      } else if (error.response && error.response.status === 422) {
        errorMessage = "Invalid data. Please check the inputs.";
      }

      Notify.create({
        type: "negative",
        message: errorMessage,
        // position: "top",
        timeout: 1000,
      });
    }
  };

  return {
    allowance,
    allowances,
    createEmployeeAllowance,
    fetchEmployeeAllowance,
    searchAllowance,
  };
});
