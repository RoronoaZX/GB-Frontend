import { d as defineStore, n as ref, N as Notify } from "./index.c8e2405b.js";
import { api } from "./axios.aa1bce92.js";
const useEmployeeStore = defineStore("employees", () => {
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
  const fetchEmployeeWithEmploymentType = async () => {
    const response = await api.get("/api/fetchEmployeeWithEmploymentType");
    employees.value = response.data;
  };
  const createEmployee = async (data) => {
    try {
      const response = await api.post("/api/employee", data);
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
        position: response.data.employee.position
      };
      employees.value.unshift(newEmployee);
      Notify.create({
        type: "positive",
        message: "User created successfully",
        position: "top"
      });
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      Notify.create({
        type: "negative",
        message: "Failed to create employee",
        setTimeout: 1e3
      });
    } finally {
    }
  };
  const searchEmployee = async (keyword) => {
    try {
      console.log("Searching for employee with keyword:", keyword);
      const response = await api.post(
        `/api/search-employees?keyword=${keyword}`
      );
      console.log("Raw API Responsessss:", response);
      if (response && response.data && response.data.length > 0) {
        console.log("Search Resultsssss:", response.data);
        employees.value = response.data;
      } else {
        console.log("No employees found or empty response");
        employees.value = [];
      }
    } catch (error) {
      console.error("Error searching employee:", error);
    }
  };
  const searchCertainEmployee = async (keyword) => {
    try {
      console.log("Searching for employee with keyword:", keyword);
      const response = await api.post(
        `/api/search-employees?keyword=${keyword}`
      );
      console.log("Raw API Response:", response);
      if (response && response.data && response.data.length > 0) {
        console.log("Search Results:", response.data);
        employee.value = response.data;
      } else {
        console.log("No employees found or empty response");
        employee.value = [];
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
        keyword,
        branch_id: branchId
      });
      branchEmployees.value = response.data;
      console.log("Searh branch employee", branchEmployees.value);
    } catch (error) {
      console.error("Error searching user with ID:", error);
      Notify.create({
        type: "negative",
        message: "Failed to search user with ID"
      });
    }
  };
  const searchEmployeesWithDesignation = async (keyword) => {
    try {
      console.log("Searching for employee with keyword:", keyword);
      const response = await api.post(
        `/api/searchEmployeesWithDesignation?keyword=${keyword}`
      );
      console.log("Raw API Response:", response);
      if (response && response.data && response.data.length > 0) {
        console.log("Search Results:", response.data);
        employees.value = response.data;
      } else {
        console.log("No employees found or empty response");
        employees.value = [];
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
        employees.value[index] = {
          ...employees.value[index],
          firstname: response.data.employee.firstname,
          middlename: response.data.employee.middlename,
          lastname: response.data.employee.lastname
        };
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateEmployeeEmploymentType = async (data) => {
    console.log("updateEmployeeEmploymentTypestore", data);
    const id = data.id;
    try {
      const response = await api.put(
        `/api/update-employee-employmentType/${id}`,
        data
      );
      console.log("====================================");
      console.log("response addresss", response.data);
      console.log("====================================");
      const index = employees.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        employees.value[index] = {
          ...employees.value[index],
          employment_type: response.data.employee.employment_type
        };
      }
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
          address: response.data.employee.address
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
          phone: response.data.employee.phone
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
          birthdate: response.data.employee.birthdate
        };
      }
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
    fetchEmployeeWithEmploymentType,
    searchCertainEmployee,
    searchEmployeeWithBranchID,
    updateEmployeeFullname,
    updateEmployeeAddress,
    updateEmployeePhone,
    updateEmployeebirthdate,
    updateEmployeeEmploymentType
  };
});
export { useEmployeeStore as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1wbG95ZWUuMDhlMmJjMzcuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdG9yZXMvZW1wbG95ZWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVmaW5lU3RvcmUgfSBmcm9tIFwicGluaWFcIjtcbmltcG9ydCB7IExvYWRpbmcsIE5vdGlmeSB9IGZyb20gXCJxdWFzYXJcIjtcbmltcG9ydCB7IGFwaSB9IGZyb20gXCJzcmMvYm9vdC9heGlvc1wiO1xuaW1wb3J0IHsgcmVmIH0gZnJvbSBcInZ1ZVwiO1xuXG5leHBvcnQgY29uc3QgdXNlRW1wbG95ZWVTdG9yZSA9IGRlZmluZVN0b3JlKFwiZW1wbG95ZWVzXCIsICgpID0+IHtcbiAgY29uc3QgZW1wbG95ZWUgPSByZWYobnVsbCk7XG4gIGNvbnN0IGVtcGxveWVlcyA9IHJlZihbXSk7XG4gIGNvbnN0IGJyYW5jaEVtcGxveWVlcyA9IHJlZihbXSk7XG5cbiAgY29uc3QgZmV0Y2hFbXBsb3llZSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoXCIvYXBpL2VtcGxveWVlXCIpO1xuICAgIGVtcGxveWVlcy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gIH07XG5cbiAgY29uc3QgZmV0Y2hBbGxFbXBsb3llZSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoXCIvYXBpL2ZldGNoQWxsRW1wbG95ZWVcIik7XG4gICAgZW1wbG95ZWVzLnZhbHVlID0gcmVzcG9uc2UuZGF0YTtcbiAgfTtcblxuICBjb25zdCBmZXRjaEVtcGxveWVlV2l0aEVtcGxveW1lbnRUeXBlID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChcIi9hcGkvZmV0Y2hFbXBsb3llZVdpdGhFbXBsb3ltZW50VHlwZVwiKTtcbiAgICBlbXBsb3llZXMudmFsdWUgPSByZXNwb25zZS5kYXRhO1xuICB9O1xuICBjb25zdCBjcmVhdGVFbXBsb3llZSA9IGFzeW5jIChkYXRhKSA9PiB7XG4gICAgLy8gTG9hZGluZy5zaG93KCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnBvc3QoXCIvYXBpL2VtcGxveWVlXCIsIGRhdGEpOyAvLyBFbnN1cmUgeW91IGF3YWl0IHRoZSBBUEkgY2FsbFxuICAgICAgY29uc29sZS5sb2coXCJyZXNwb25zZSBlbXBsb3llZSBkYXRhXCIsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgY29uc3QgbmV3RW1wbG95ZWUgPSB7XG4gICAgICAgIGlkOiByZXNwb25zZS5kYXRhLmVtcGxveWVlLmlkLFxuICAgICAgICBiaXJ0aGRhdGU6IHJlc3BvbnNlLmRhdGEuZW1wbG95ZWUuYmlydGhkYXRlLFxuICAgICAgICBhZGRyZXNzOiByZXNwb25zZS5kYXRhLmVtcGxveWVlLmFkZHJlc3MsXG4gICAgICAgIHNleDogcmVzcG9uc2UuZGF0YS5lbXBsb3llZS5zZXgsXG4gICAgICAgIHN0YXR1czogcmVzcG9uc2UuZGF0YS5lbXBsb3llZS5zdGF0dXMsXG4gICAgICAgIHBob25lOiByZXNwb25zZS5kYXRhLmVtcGxveWVlLnBob25lLFxuICAgICAgICBlbXBsb3ltZW50X3R5cGU6IHJlc3BvbnNlLmRhdGEuZW1wbG95ZWUuZW1wbG95bWVudF90eXBlLFxuICAgICAgICBlbXBsb3ltZW50X3R5cGVfaWQ6IHJlc3BvbnNlLmRhdGEuZW1wbG95ZWUuZW1wbG95ZWVfaWQsXG4gICAgICAgIGZpcnN0bmFtZTogcmVzcG9uc2UuZGF0YS5lbXBsb3llZS5maXJzdG5hbWUsXG4gICAgICAgIG1pZGRsZW5hbWU6IHJlc3BvbnNlLmRhdGEuZW1wbG95ZWUubWlkZGxlbmFtZSxcbiAgICAgICAgbGFzdG5hbWU6IHJlc3BvbnNlLmRhdGEuZW1wbG95ZWUubGFzdG5hbWUsXG4gICAgICAgIHBvc2l0aW9uOiByZXNwb25zZS5kYXRhLmVtcGxveWVlLnBvc2l0aW9uLFxuICAgICAgfTtcbiAgICAgIGVtcGxveWVlcy52YWx1ZS51bnNoaWZ0KG5ld0VtcGxveWVlKTtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiVXNlciBjcmVhdGVkIHN1Y2Nlc3NmdWxseVwiLFxuICAgICAgICBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICBcIkFQSSBFcnJvcjpcIixcbiAgICAgICAgZXJyb3IucmVzcG9uc2UgPyBlcnJvci5yZXNwb25zZS5kYXRhIDogZXJyb3IubWVzc2FnZVxuICAgICAgKTsgLy8gTG9nIGVycm9yXG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgICBtZXNzYWdlOiBcIkZhaWxlZCB0byBjcmVhdGUgZW1wbG95ZWVcIixcbiAgICAgICAgc2V0VGltZW91dDogMTAwMCxcbiAgICAgIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICAvLyBMb2FkaW5nLmhpZGUoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2VhcmNoRW1wbG95ZWUgPSBhc3luYyAoa2V5d29yZCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlNlYXJjaGluZyBmb3IgZW1wbG95ZWUgd2l0aCBrZXl3b3JkOlwiLCBrZXl3b3JkKTsgLy8gTG9nIHRoZSBrZXl3b3JkXG5cbiAgICAgIC8vIEFQSSBjYWxsXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KFxuICAgICAgICBgL2FwaS9zZWFyY2gtZW1wbG95ZWVzP2tleXdvcmQ9JHtrZXl3b3JkfWBcbiAgICAgICk7XG5cbiAgICAgIC8vIExvZyB0aGUgcmF3IHJlc3BvbnNlIHRvIHNlZSB3aGF0IGlzIHJldHVybmVkXG4gICAgICBjb25zb2xlLmxvZyhcIlJhdyBBUEkgUmVzcG9uc2Vzc3NzOlwiLCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENoZWNrIGlmIHJlc3BvbnNlIGFuZCBkYXRhIGFyZSB2YWxpZCBiZWZvcmUgcHJvY2Vzc2luZ1xuICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmRhdGEgJiYgcmVzcG9uc2UuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoIFJlc3VsdHNzc3NzOlwiLCByZXNwb25zZS5kYXRhKTsgLy8gTG9nIHRoZSB2YWxpZCBBUEkgcmVzcG9uc2VcbiAgICAgICAgZW1wbG95ZWVzLnZhbHVlID0gcmVzcG9uc2UuZGF0YTsgLy8gVXBkYXRlIHRoZSBlbXBsb3llZXMgbGlzdCB3aXRoIHRoZSBzZWFyY2ggcmVzdWx0c1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJObyBlbXBsb3llZXMgZm91bmQgb3IgZW1wdHkgcmVzcG9uc2VcIik7XG4gICAgICAgIGVtcGxveWVlcy52YWx1ZSA9IFtdOyAvLyBSZXNldCB0aGUgZW1wbG95ZWUgbGlzdCBpZiBubyByZXN1bHRzXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzZWFyY2hpbmcgZW1wbG95ZWU6XCIsIGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2VhcmNoQ2VydGFpbkVtcGxveWVlID0gYXN5bmMgKGtleXdvcmQpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc29sZS5sb2coXCJTZWFyY2hpbmcgZm9yIGVtcGxveWVlIHdpdGgga2V5d29yZDpcIiwga2V5d29yZCk7IC8vIExvZyB0aGUga2V5d29yZFxuXG4gICAgICAvLyBBUEkgY2FsbFxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucG9zdChcbiAgICAgICAgYC9hcGkvc2VhcmNoLWVtcGxveWVlcz9rZXl3b3JkPSR7a2V5d29yZH1gXG4gICAgICApO1xuXG4gICAgICAvLyBMb2cgdGhlIHJhdyByZXNwb25zZSB0byBzZWUgd2hhdCBpcyByZXR1cm5lZFxuICAgICAgY29uc29sZS5sb2coXCJSYXcgQVBJIFJlc3BvbnNlOlwiLCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENoZWNrIGlmIHJlc3BvbnNlIGFuZCBkYXRhIGFyZSB2YWxpZCBiZWZvcmUgcHJvY2Vzc2luZ1xuICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmRhdGEgJiYgcmVzcG9uc2UuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoIFJlc3VsdHM6XCIsIHJlc3BvbnNlLmRhdGEpOyAvLyBMb2cgdGhlIHZhbGlkIEFQSSByZXNwb25zZVxuICAgICAgICBlbXBsb3llZS52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7IC8vIFVwZGF0ZSB0aGUgZW1wbG95ZWVzIGxpc3Qgd2l0aCB0aGUgc2VhcmNoIHJlc3VsdHNcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gZW1wbG95ZWVzIGZvdW5kIG9yIGVtcHR5IHJlc3BvbnNlXCIpO1xuICAgICAgICBlbXBsb3llZS52YWx1ZSA9IFtdOyAvLyBSZXNldCB0aGUgZW1wbG95ZWUgbGlzdCBpZiBubyByZXN1bHRzXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzZWFyY2hpbmcgZW1wbG95ZWU6XCIsIGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2VhcmNoRW1wbG95ZWVXaXRoQnJhbmNoSUQgPSBhc3luYyAoa2V5d29yZCwgYnJhbmNoSWQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcImRhdGEgdG8gYmUgc2VuZFwiLCBrZXl3b3JkKTtcbiAgICBjb25zb2xlLmxvZyhcImRhdGEgdG8gYmUgc2VuZFwiLCBicmFuY2hJZCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnBvc3QoYC9hcGkvc2VhcmNoLWJyYW5jaC1lbXBsb3llZWAsIHtcbiAgICAgICAga2V5d29yZDoga2V5d29yZCxcbiAgICAgICAgYnJhbmNoX2lkOiBicmFuY2hJZCxcbiAgICAgIH0pO1xuICAgICAgYnJhbmNoRW1wbG95ZWVzLnZhbHVlID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgY29uc29sZS5sb2coXCJTZWFyaCBicmFuY2ggZW1wbG95ZWVcIiwgYnJhbmNoRW1wbG95ZWVzLnZhbHVlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNlYXJjaGluZyB1c2VyIHdpdGggSUQ6XCIsIGVycm9yKTtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHNlYXJjaCB1c2VyIHdpdGggSURcIixcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzZWFyY2hFbXBsb3llZXNXaXRoRGVzaWduYXRpb24gPSBhc3luYyAoa2V5d29yZCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlNlYXJjaGluZyBmb3IgZW1wbG95ZWUgd2l0aCBrZXl3b3JkOlwiLCBrZXl3b3JkKTsgLy8gTG9nIHRoZSBrZXl3b3JkXG5cbiAgICAgIC8vIEFQSSBjYWxsXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KFxuICAgICAgICBgL2FwaS9zZWFyY2hFbXBsb3llZXNXaXRoRGVzaWduYXRpb24/a2V5d29yZD0ke2tleXdvcmR9YFxuICAgICAgKTtcblxuICAgICAgLy8gTG9nIHRoZSByYXcgcmVzcG9uc2UgdG8gc2VlIHdoYXQgaXMgcmV0dXJuZWRcbiAgICAgIGNvbnNvbGUubG9nKFwiUmF3IEFQSSBSZXNwb25zZTpcIiwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDaGVjayBpZiByZXNwb25zZSBhbmQgZGF0YSBhcmUgdmFsaWQgYmVmb3JlIHByb2Nlc3NpbmdcbiAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5kYXRhICYmIHJlc3BvbnNlLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNlYXJjaCBSZXN1bHRzOlwiLCByZXNwb25zZS5kYXRhKTsgLy8gTG9nIHRoZSB2YWxpZCBBUEkgcmVzcG9uc2VcbiAgICAgICAgZW1wbG95ZWVzLnZhbHVlID0gcmVzcG9uc2UuZGF0YTsgLy8gVXBkYXRlIHRoZSBlbXBsb3llZXMgbGlzdCB3aXRoIHRoZSBzZWFyY2ggcmVzdWx0c1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJObyBlbXBsb3llZXMgZm91bmQgb3IgZW1wdHkgcmVzcG9uc2VcIik7XG4gICAgICAgIGVtcGxveWVlcy52YWx1ZSA9IFtdOyAvLyBSZXNldCB0aGUgZW1wbG95ZWUgbGlzdCBpZiBubyByZXN1bHRzXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzZWFyY2hpbmcgZW1wbG95ZWU6XCIsIGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlRW1wbG95ZWVGdWxsbmFtZSA9IGFzeW5jIChkYXRhKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJ1cGRhdGVFbXBsb3llZUZ1bGxuYW1lXCIsIGRhdGEpO1xuICAgIGNvbnN0IGlkID0gZGF0YS5pZDtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucHV0KFxuICAgICAgICBgL2FwaS91cGRhdGUtZW1wbG95ZWUtZnVsbG5hbWUvJHtpZH1gLFxuICAgICAgICBkYXRhXG4gICAgICApO1xuICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIik7XG4gICAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlXCIsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIik7XG4gICAgICBjb25zdCBpbmRleCA9IGVtcGxveWVlcy52YWx1ZS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IGlkKTtcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBzcGVjaWZpYyBlbXBsb3llZSdzIGZ1bGxuYW1lIGRhdGEgaW4gdGhlIGVtcGxveWVlcyBhcnJheVxuICAgICAgICBlbXBsb3llZXMudmFsdWVbaW5kZXhdID0ge1xuICAgICAgICAgIC4uLmVtcGxveWVlcy52YWx1ZVtpbmRleF0sXG4gICAgICAgICAgZmlyc3RuYW1lOiByZXNwb25zZS5kYXRhLmVtcGxveWVlLmZpcnN0bmFtZSxcbiAgICAgICAgICBtaWRkbGVuYW1lOiByZXNwb25zZS5kYXRhLmVtcGxveWVlLm1pZGRsZW5hbWUsXG4gICAgICAgICAgbGFzdG5hbWU6IHJlc3BvbnNlLmRhdGEuZW1wbG95ZWUubGFzdG5hbWUsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlRW1wbG95ZWVFbXBsb3ltZW50VHlwZSA9IGFzeW5jIChkYXRhKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJ1cGRhdGVFbXBsb3llZUVtcGxveW1lbnRUeXBlc3RvcmVcIiwgZGF0YSk7XG5cbiAgICBjb25zdCBpZCA9IGRhdGEuaWQ7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnB1dChcbiAgICAgICAgYC9hcGkvdXBkYXRlLWVtcGxveWVlLWVtcGxveW1lbnRUeXBlLyR7aWR9YCxcbiAgICAgICAgZGF0YVxuICAgICAgKTtcblxuICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIik7XG4gICAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlIGFkZHJlc3NzXCIsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIik7XG4gICAgICBjb25zdCBpbmRleCA9IGVtcGxveWVlcy52YWx1ZS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IGlkKTtcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgZW1wbG95ZWVzLnZhbHVlW2luZGV4XSA9IHtcbiAgICAgICAgICAuLi5lbXBsb3llZXMudmFsdWVbaW5kZXhdLFxuICAgICAgICAgIGVtcGxveW1lbnRfdHlwZTogcmVzcG9uc2UuZGF0YS5lbXBsb3llZS5lbXBsb3ltZW50X3R5cGUsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHVwZGF0ZUVtcGxveWVlQWRkcmVzcyA9IGFzeW5jIChkYXRhKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJ1cGRhdGVFbXBsb3llZUFkZHJlc3NcIiwgZGF0YSk7XG4gICAgY29uc3QgaWQgPSBkYXRhLmlkO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wdXQoXG4gICAgICAgIGAvYXBpL3VwZGF0ZS1lbXBsb3llZS1hZGRyZXNzLyR7aWR9YCxcbiAgICAgICAgZGF0YVxuICAgICAgKTtcblxuICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIik7XG4gICAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlIGFkZHJlc3NzXCIsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIik7XG4gICAgICBjb25zdCBpbmRleCA9IGVtcGxveWVlcy52YWx1ZS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IGlkKTtcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgZW1wbG95ZWVzLnZhbHVlW2luZGV4XSA9IHtcbiAgICAgICAgICAuLi5lbXBsb3llZXMudmFsdWVbaW5kZXhdLFxuICAgICAgICAgIGFkZHJlc3M6IHJlc3BvbnNlLmRhdGEuZW1wbG95ZWUuYWRkcmVzcyxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgdXBkYXRlRW1wbG95ZWVQaG9uZSA9IGFzeW5jIChkYXRhKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJ1cGRhdGVFbXBsb3llZVBob25lXCIsIGRhdGEpO1xuICAgIGNvbnN0IGlkID0gZGF0YS5pZDtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucHV0KGAvYXBpL3VwZGF0ZS1lbXBsb3llZS1waG9uZS8ke2lkfWAsIGRhdGEpO1xuXG4gICAgICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwicmVzcG9uc2UgcGhvbmVcIiwgcmVzcG9uc2UuZGF0YSk7XG4gICAgICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcbiAgICAgIGNvbnN0IGluZGV4ID0gZW1wbG95ZWVzLnZhbHVlLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gaWQpO1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICBlbXBsb3llZXMudmFsdWVbaW5kZXhdID0ge1xuICAgICAgICAgIC4uLmVtcGxveWVlcy52YWx1ZVtpbmRleF0sXG4gICAgICAgICAgcGhvbmU6IHJlc3BvbnNlLmRhdGEuZW1wbG95ZWUucGhvbmUsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHVwZGF0ZUVtcGxveWVlYmlydGhkYXRlID0gYXN5bmMgKGRhdGEpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcInVwZGF0ZUVtcGxveWVlYmlydGhkYXRlXCIsIGRhdGEpO1xuICAgIGNvbnN0IGlkID0gZGF0YS5pZDtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucHV0KFxuICAgICAgICBgL2FwaS91cGRhdGUtZW1wbG95ZWUtYmlydGhkYXRlLyR7aWR9YCxcbiAgICAgICAgZGF0YVxuICAgICAgKTtcblxuICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIik7XG4gICAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlIGJpcnRoZGF0ZVwiLCByZXNwb25zZS5kYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpO1xuICAgICAgY29uc3QgaW5kZXggPSBlbXBsb3llZXMudmFsdWUuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSBpZCk7XG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIGVtcGxveWVlcy52YWx1ZVtpbmRleF0gPSB7XG4gICAgICAgICAgLi4uZW1wbG95ZWVzLnZhbHVlW2luZGV4XSxcbiAgICAgICAgICBiaXJ0aGRhdGU6IHJlc3BvbnNlLmRhdGEuZW1wbG95ZWUuYmlydGhkYXRlLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZW1wbG95ZWUsXG4gICAgZW1wbG95ZWVzLFxuICAgIGJyYW5jaEVtcGxveWVlcyxcbiAgICBjcmVhdGVFbXBsb3llZSxcbiAgICBzZWFyY2hFbXBsb3llZSxcbiAgICBmZXRjaEVtcGxveWVlLFxuICAgIHNlYXJjaEVtcGxveWVlc1dpdGhEZXNpZ25hdGlvbixcbiAgICBmZXRjaEFsbEVtcGxveWVlLFxuICAgIGZldGNoRW1wbG95ZWVXaXRoRW1wbG95bWVudFR5cGUsXG4gICAgc2VhcmNoQ2VydGFpbkVtcGxveWVlLFxuICAgIHNlYXJjaEVtcGxveWVlV2l0aEJyYW5jaElELFxuICAgIHVwZGF0ZUVtcGxveWVlRnVsbG5hbWUsXG4gICAgdXBkYXRlRW1wbG95ZWVBZGRyZXNzLFxuICAgIHVwZGF0ZUVtcGxveWVlUGhvbmUsXG4gICAgdXBkYXRlRW1wbG95ZWViaXJ0aGRhdGUsXG4gICAgdXBkYXRlRW1wbG95ZWVFbXBsb3ltZW50VHlwZSxcbiAgfTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS1ksTUFBQyxtQkFBbUIsWUFBWSxhQUFhLE1BQU07QUFDN0QsUUFBTSxXQUFXLElBQUksSUFBSTtBQUN6QixRQUFNLFlBQVksSUFBSSxDQUFBLENBQUU7QUFDeEIsUUFBTSxrQkFBa0IsSUFBSSxDQUFBLENBQUU7QUFFOUIsUUFBTSxnQkFBZ0IsWUFBWTtBQUNoQyxVQUFNLFdBQVcsTUFBTSxJQUFJLElBQUksZUFBZTtBQUM5QyxjQUFVLFFBQVEsU0FBUztBQUFBLEVBQy9CO0FBRUUsUUFBTSxtQkFBbUIsWUFBWTtBQUNuQyxVQUFNLFdBQVcsTUFBTSxJQUFJLElBQUksdUJBQXVCO0FBQ3RELGNBQVUsUUFBUSxTQUFTO0FBQUEsRUFDL0I7QUFFRSxRQUFNLGtDQUFrQyxZQUFZO0FBQ2xELFVBQU0sV0FBVyxNQUFNLElBQUksSUFBSSxzQ0FBc0M7QUFDckUsY0FBVSxRQUFRLFNBQVM7QUFBQSxFQUMvQjtBQUNFLFFBQU0saUJBQWlCLE9BQU8sU0FBUztBQUVyQyxRQUFJO0FBQ0YsWUFBTSxXQUFXLE1BQU0sSUFBSSxLQUFLLGlCQUFpQixJQUFJO0FBQ3JELGNBQVEs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
