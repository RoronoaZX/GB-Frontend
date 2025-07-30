import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useEmployeeStore = defineStore("employees", () => {
  const employee = ref(null);
  const employees = ref([]);
  const branchEmployees = ref([]);

  const fetchEmployee = async () => {
    const response = await api.get("/api/employee");
    employees.value = response.data;
  };

  const fetchAllEmployee = async () => {
    const response = await api.get("/api/fetchAllEmployee");
    employees.value = response.data;
  };

  const fetchEmployeeWithEmploymentType = async (page, rowsPerPage, search) => {
    const response = await api.get("/api/fetchEmployeeWithEmploymentType", {
      params: {
        page,
        per_page: rowsPerPage,
        search,
      },
    });
    employees.value = response.data;
    console.log("employees.value", employees.value);
  };

  const fetchEmployeeUserID = async (employee_id) => {
    const response = await api.get(`/api/fetchEmployeeUserID/${employee_id}`);
    employees.value = response.data;
    console.log("employees.value fetchEmployeeUserIDsssssss", employees.value);
  };

  const fetchEmployeeWithEmploymentTypeAndDesignation = async (
    page,
    rowsPerPage,
    search
  ) => {
    const response = await api.get(
      "/api/fetchEmployeeWithEmploymentTypeAndDesignation",
      {
        params: {
          page,
          per_page: rowsPerPage,
          search,
        },
      }
    );
    employees.value = response.data;
    console.log("employees.value", employees.value);
  };
  const fetchCertianEmployeeWithEmploymentTypeAndDesignation = async (id) => {
    const response = await api.get(
      `/api/fetchCertianEmployeeWithEmploymentTypeAndDesignation/${id}`
    );
    employees.value = response.data;
    console.log("employeessssss.value", employees.value);
  };
  const createEmployee = async (data) => {
    // Loading.show();
    try {
      const response = await api.post("/api/employee", data); // Ensure you await the API call
      console.log("response employee data", response.data);
      const newEmployee = {
        id: response.data.employee.id,
        birthdate: response.data.employee.birthdate,
        address: response.data.employee.address,
        sex: response.data.employee.sex,
        status: response.data.employee.status,
        phone: response.data.employee.phone,
        employment_type: response.data.employee.employment_type,
        employment_type_id: response.data.employee.employee_id,
        firstname: response.data.employee.firstname,
        middlename: response.data.employee.middlename,
        lastname: response.data.employee.lastname,
        position: response.data.employee.position,
      };

      Notify.create({
        type: "positive",
        message: "User created successfully",
        position: "top",
      });
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
      // Loading.hide();
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
      console.log("Raw API Responsessss:", response);

      // Check if response and data are valid before processing
      if (response && response.data && response.data.length > 0) {
        console.log("Search Resultsssss:", response.data); // Log the valid API response
        employees.value = response.data; // Update the employees list with the search results
      } else {
        console.log("No employees found or empty response");
        employees.value = []; // Reset the employee list if no results
      }
    } catch (error) {
      console.error("Error searching employee:", error);
    }
  };

  const searchCertainEmployee = async (keyword) => {
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
        employee.value = response.data; // Update the employees list with the search results
      } else {
        console.log("No employees found or empty response");
        employee.value = []; // Reset the employee list if no results
      }
    } catch (error) {
      console.error("Error searching employee:", error);
    }
  };
  const searchPersonInCharge = async (keyword) => {
    try {
      console.log("Searching for employee with keyword:", keyword); // Log the keyword

      // API call
      const response = await api.post(
        `/api/search-employees-person-in-charge?keyword=${keyword}`
      );

      // Log the raw response to see what is returned
      console.log("Raw API Response:", response);

      // Check if response and data are valid before processing
      if (response && response.data && response.data.length > 0) {
        console.log("Search Results:", response.data); // Log the valid API response
        employee.value = response.data; // Update the employees list with the search results
      } else {
        console.log("No employees found or empty response");
        employee.value = []; // Reset the employee list if no results
      }
    } catch (error) {
      console.error("Error searching employee:", error);
    }
  };

  const searchEmployeeWithBranchID = async (keyword, branchId) => {
    console.log("data to be send", keyword);
    console.log("data to be send", branchId);
    try {
      const response = await api.post(`/api/search-branch-employee`, {
        keyword: keyword,
        branch_id: branchId,
      });
      branchEmployees.value = response.data;

      console.log("Searh branch employee", branchEmployees.value);
    } catch (error) {
      console.error("Error searching user with ID:", error);
      Notify.create({
        type: "negative",
        message: "Failed to search user with ID",
      });
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

  const updateEmployeeFullname = async (data) => {
    console.log("updateEmployeeFullname", data);
    const id = data.id;
    try {
      const response = await api.put(
        `/api/update-employee-fullname/${id}`,
        data
      );
      console.log("====================================");
      console.log("response", response.data);
      console.log("====================================");
      const index = employees.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        // Update the specific employee's fullname data in the employees array
        employees.value[index] = {
          ...employees.value[index],
          firstname: response.data.employee.firstname,
          middlename: response.data.employee.middlename,
          lastname: response.data.employee.lastname,
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateEmployeeEmploymentType = async (data) => {
    console.log("updateEmployeeEmploymentTypestore", data);

    const id = data.employee_id;
    try {
      const response = await api.put(
        `/api/update-employee-employmentType/${id}`,
        data
      );

      console.log("====================================");
      console.log("response addresss", response.data);
      console.log("====================================");
    } catch (error) {
      console.log(error);
    }
  };
  const updateEmployeeAddress = async (data) => {
    console.log("updateEmployeeAddress", data);
    const id = data.id;
    try {
      const response = await api.put(
        `/api/update-employee-address/${id}`,
        data
      );

      console.log("====================================");
      console.log("response addresss", response.data);
      console.log("====================================");
      const index = employees.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        employees.value[index] = {
          ...employees.value[index],
          address: response.data.employee.address,
        };
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateEmployeePhone = async (data) => {
    console.log("updateEmployeePhone", data);
    const id = data.id;
    try {
      const response = await api.put(`/api/update-employee-phone/${id}`, data);

      console.log("====================================");
      console.log("response phone", response.data);
      console.log("====================================");
      const index = employees.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        employees.value[index] = {
          ...employees.value[index],
          phone: response.data.employee.phone,
        };
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateEmployeebirthdate = async (data) => {
    console.log("updateEmployeebirthdate", data);
    const id = data.id;
    try {
      const response = await api.put(
        `/api/update-employee-birthdate/${id}`,
        data
      );

      console.log("====================================");
      console.log("response birthdate", response.data);
      console.log("====================================");
      const index = employees.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        employees.value[index] = {
          ...employees.value[index],
          birthdate: response.data.employee.birthdate,
        };
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateEmployeeDesignation = async (data) => {
    console.log("Employee Designation Data in store", data);
    const id = data.id;

    try {
      const response = await api.put(
        `/api/update-employee-designation/${id}`,
        data
      );

      console.log("====================================");
      console.log("response time IN", response.data);

      Notify.create({
        message: "Time designation updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    } catch (error) {
      console.log(error);
      Notify.create({
        message: "Failed to update designation",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    }
  };

  const updateEmployeeTimeIn = async (data) => {
    console.log("updateEmployeeTimeIn in store", data);
    const id = data.designation_id;
    try {
      const response = await api.put(
        `/api/update-employee-time-in/${id}`,
        data
      );

      console.log("====================================");
      console.log("response time IN", response.data);
      // console.log("====================================");
      // const index = employees.value.findIndex((item) => item.id === id);
      // if (index !== -1) {
      //   employees.value[index] = {
      //     ...employees.value[index],
      //     birthdate: response.data.employee.birthdate,
      //   };
      // }

      Notify.create({
        message: "Time in updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    } catch (error) {
      console.log(error);
      Notify.create({
        message: "Failed to update time in",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    }
  };
  const updateEmployeeTimeOut = async (data) => {
    console.log("updateEmployeeTimeOut in store", data);
    const id = data.designation_id;
    try {
      const response = await api.put(
        `/api/update-employee-time-out/${id}`,
        data
      );
      console.log("====================================");
      console.log("response time out", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    employee,
    employees,
    branchEmployees,
    createEmployee,
    searchEmployee,
    fetchEmployee,
    searchEmployeesWithDesignation,
    fetchAllEmployee,
    fetchEmployeeUserID,
    fetchEmployeeWithEmploymentType,
    searchCertainEmployee,
    searchEmployeeWithBranchID,
    updateEmployeeFullname,
    updateEmployeeAddress,
    updateEmployeePhone,
    updateEmployeebirthdate,
    updateEmployeeDesignation,
    updateEmployeeTimeIn,
    updateEmployeeTimeOut,
    updateEmployeeEmploymentType,
    searchPersonInCharge,
    fetchEmployeeWithEmploymentTypeAndDesignation,
    fetchCertianEmployeeWithEmploymentTypeAndDesignation,
  };
});
