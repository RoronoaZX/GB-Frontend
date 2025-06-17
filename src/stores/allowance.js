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
  const currentPage = ref(1);
  const rowsPerPage = ref(7);
  const search = ref("");

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
      const newEntry = response.data.data[0];

      Notify.create({
        type: "positive",
        message: "Allowance successfully created",
        timeout: 1000,
      });

      // Unshift the new data to the top of the array
      allowances.value.data.unshift(newEntry);
      allowances.value.total += 1;

      return newEntry; // return to update component table too
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

  // const fetchEmployeeAllowance = async (page, rowsPerPage, search) => {
  //   try {
  //     const response = await api.get("/api/employee-allowance", {
  //       params: {
  //         page,
  //         per_page: rowsPerPage,
  //         search,
  //       },
  //     });
  //     allowances.value = response.data;
  //   } catch (error) {
  //     console.log("error fetching allowance", error);
  //   }
  // };

  // const createEmployeeAllowance = async (data) => {
  //   try {
  //     const response = await api.post("/api/employee-allowance", data);
  //     console.log("employee response", response.data);
  //     // allowances.value.unshift(response.data);
  //     Notify.create({
  //       type: "positive",
  //       message: "Allowance successfully created",
  //       // position: "top",
  //       timeout: 1000,
  //     });

  //     fetchEmployeeAllowance(
  //       currentPage.value,
  //       rowsPerPage.value,
  //       search.value
  //     );
  //   } catch (error) {
  //     console.log(error);

  //     let errorMessage = "An error occurred. Please try again.";
  //     if (error.response && error.response.status === 409) {
  //       errorMessage = "Allowance for this employee already exists.";
  //     } else if (error.response && error.response.status === 422) {
  //       errorMessage = "Invalid data. Please check the inputs.";
  //     }

  //     Notify.create({
  //       type: "negative",
  //       message: errorMessage,
  //       // position: "top",
  //       timeout: 1000,
  //     });
  //   }
  // };

  // const createEmployeeAllowance = async (data) => {
  //   try {
  //     const response = await api.post("/api/employee-allowance", data);
  //     const newAllowance = response.data.data[0]; // Make sure this matches backend response structure

  //     Notify.create({
  //       type: "positive",
  //       message: "Allowance successfully created",
  //       timeout: 1000,
  //     });

  //     // Unshift the new record directly
  //     allowances.value.data.unshift(newAllowance);

  //     // Optional: update metadata manually if needed
  //     allowances.value.total += 1;

  //     // Or refetch if you prefer to sync with backend:
  //     // await fetchEmployeeAllowance(currentPage.value, rowsPerPage.value, search.value);
  //   } catch (error) {
  //     let errorMessage = "An error occurred. Please try again.";
  //     if (error.response?.status === 409) {
  //       errorMessage = "Allowance for this employee already exists.";
  //     } else if (error.response?.status === 422) {
  //       errorMessage = "Invalid data. Please check the inputs.";
  //     }

  //     Notify.create({
  //       type: "negative",
  //       message: errorMessage,
  //       timeout: 1000,
  //     });
  //   }
  // };

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
