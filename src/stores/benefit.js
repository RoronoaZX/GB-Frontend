import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify } from "quasar";
import { ref } from "vue";

// these should be reactive so you can track changes

export const useEmployeeBenefitStore = defineStore("benefits", () => {
  const benefit = ref(null);
  const benefits = ref({
    data: [],
    total: 0,
    per_page: 7,
    current_page: 1,
    last_page: 1,
  });
  const currentPage = ref(1);
  const rowsPerPage = ref(7);
  const search = ref("");

  const fetchEmployeeBenefit = async (page, rowsPerPage, search) => {
    try {
      const response = await api.get("/api/employee-benefit", {
        params: {
          page,
          per_page: rowsPerPage,
          search,
        },
      });
      benefits.value = response.data;
    } catch (error) {
      console.log("error fetching benefits", error);
    }
  };

  const searchBenefit = async (keyword) => {
    try {
      console.log("Searching for employee with keyword:", keyword);
      const response = await api.post(`/api/search-benefit?keyword=${keyword}`);
      console.log("Allowance response:", response.data);
      benefits.value = response.data;
    } catch (error) {
      console.error("Benefits error", error);
    }
  };

  // const createEmployeeBenefit = async (data) => {
  //   console.log("BENEFIT:", data);
  //   try {
  //     const response = await api.post("/api/employee-benefit", data);
  //     console.log("benefit response", response.data);
  //     benefits.value.unshift(response.data);

  //     Notify.create({
  //       type: "positive",
  //       // position: "top",
  //       message: "Employee deductions successfully created",
  //       setTimeout: 1000,
  //     });
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
  //       timeout: 5000,
  //     });
  //   }
  // };

  const createEmployeeBenefit = async (data) => {
    try {
      const response = await api.post("/api/employee-benefit", data);
      const newEntry = response.data.data[0];

      Notify.create({
        type: "positive",
        message: "Employee deductions successfully created",
        timeout: 1000,
      });

      benefits.value.data.unshift(newEntry);
      benefits.value.total += 1;

      return newEntry;
    } catch (error) {
      console.log(error);
      let errorMessage = "An error occurred. Please try again.";
      if (error.response?.status === 409) {
        errorMessage = "Allowance for this employee already exists.";
      } else if (error.response?.status === 422) {
        errorMessage = "Invalid data. Please check the inputs.";
      }

      Notify.create({
        type: "negative",
        message: errorMessage,
        timeout: 5000,
      });
    }
  };

  return {
    benefit,
    benefits,
    fetchEmployeeBenefit,
    createEmployeeBenefit,
    searchBenefit,
  };
});
