import { defineStore } from "pinia";
import { Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useEmployeeAllowance = defineStore("employee-allowance", () => {
  const allowance = ref(null);
  const allowances = ref({
    data: [],
    total: 0,
    per_page: 7,
    current_page: 1,
    last_page: 1,
  });

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

  const fetchEmployeeAllowance = async (page, perPage, searchTerm) => {
    try {
      const response = await api.get("/api/employee-allowance", {
        params: {
          page,
          per_page: perPage,
          search: searchTerm,
        },
      });
      allowances.value = response.data;
    } catch (error) {
      console.error("Error fetching allowance", error);
    }
  };

  const createEmployeeAllowance = async (data) => {
    try {
      const response = await api.post("/api/employee-allowance", data);

      Notify.create({
        type: "positive",
        message: "Allowance successfully created",
        timeout: 1000,
      });

      return response.data; // return to update component table too
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";
      if (error.response?.status === 409) {
        errorMessage = "Allowance for this employee already exists.";
      } else if (error.response?.status === 422) {
        errorMessage = "Invalid data. Please check the inputs.";
      }

      Notify.create({
        type: "negative",
        message: errorMessage,
        timeout: 1000,
      });

      throw error;
    }
  };

  const updateAmount = async (data, val) => {
    console.log("updateAmount store", data, val);
    try {
      const response = await api.put(
        "/api/update-employee-allowance/" + data.id,
        {
          amount: val,
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    allowance,
    allowances,
    createEmployeeAllowance,
    fetchEmployeeAllowance,
    searchAllowance,
    updateAmount,
  };
});
