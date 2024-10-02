import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useEmployeeStore = defineStore("employees", () => {
  const employee = ref(null);
  const employees = ref([]);

  const fetchEmployee = async () => {
    const response = await api.get("/api/employee");
    employees.value = response.data;
  };

  const fetchAllEmployee = async () => {
    const response = await api.get("/api/fetchAllEmployee");
    employees.value = response.data;
  };

  const fetchEmployeeWithEmploymentType = async () => {
    const response = await api.get("/api/fetchEmployeeWithEmploymentType");
    employees.value = response.data;
  };
  const createEmployee = async (data) => {
    Loading.show();
    try {
      const response = await api.post("/api/employee", data); // Ensure you await the API call
      if (response && response.data) {
        console.log("API Response:", response.data); // Log the response data
        employees.value.unshift(response.data); // Add the new employee data to the list
        Notify.create({
          type: "positive",
          message: "Employee created successfully",
          setTimeout: 1000,
          position: "top",
        });
      } else {
        console.error("Unexpected API Response:", response);
      }
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      ); // Log error
      Notify.create({
        type: "negative",
        message: "Failed to create employee",
        setTimeout: 1000,
      });
    } finally {
      Loading.hide();
    }
  };

  const searchEmployee = async (keyword) => {
    try {
      console.log("Searching for employee with keyword:", keyword); // Log the keyword

      // API call
      const response = await api.post(
        `/api/search-employees?keyword=${keyword}`
      );

      // Log the raw response to see what is returned
      console.log("Raw API Response:", response);

      // Check if response and data are valid before processing
      if (response && response.data && response.data.length > 0) {
        console.log("Search Results:", response.data); // Log the valid API response
        employees.value = response.data; // Update the employees list with the search results
      } else {
        console.log("No employees found or empty response");
        employees.value = []; // Reset the employee list if no results
      }
    } catch (error) {
      console.error("Error searching employee:", error);
    }
  };
  const searchEmployeesWithDesignation = async (keyword) => {
    try {
      console.log("Searching for employee with keyword:", keyword); // Log the keyword

      // API call
      const response = await api.post(
        `/api/searchEmployeesWithDesignation?keyword=${keyword}`
      );

      // Log the raw response to see what is returned
      console.log("Raw API Response:", response);

      // Check if response and data are valid before processing
      if (response && response.data && response.data.length > 0) {
        console.log("Search Results:", response.data); // Log the valid API response
        employees.value = response.data; // Update the employees list with the search results
      } else {
        console.log("No employees found or empty response");
        employees.value = []; // Reset the employee list if no results
      }
    } catch (error) {
      console.error("Error searching employee:", error);
    }
  };

  return {
    employee,
    employees,
    createEmployee,
    searchEmployee,
    fetchEmployee,
    searchEmployeesWithDesignation,
    fetchAllEmployee,
    fetchEmployeeWithEmploymentType,
  };
});
