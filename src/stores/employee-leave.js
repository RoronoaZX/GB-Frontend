import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useEmployeeLeaveStore = defineStore("employee-leave", () => {
  const employeeLeaveRequest = ref(null);
  const employeeLeavesRequests = ref([]);

  const createLeaveRequest = async (data) => {
    console.log("createLeaveRequest", data);
    const response = await api.post("/api/employeeOnLeave", data);
    return response.data;
  };

  const leaveRequests = async (data) => {
    console.log("leave Request", data);
  };

  const employeeOnLeave = async (data) => {
    console.log("employeeOnLeave", data);
    const response = await api.post("employee-on-leave", data);
    return response.data;
  };

  const getLeaveRequestsThisYear = async (branchId) => {
    console.log("getLeaveRequestsThisYear", branchId);
    const currentYear = new Date().getFullYear();
    const response = await api.get(`/api/leave-requests?branch_id=${branchId}&year=${currentYear}`);
    employeeLeavesRequests.value = response.data;
    return response.data;
  };

  return {
    employeeLeaveRequest,
    employeeLeavesRequests,
    createLeaveRequest,
    leaveRequests,
    employeeOnLeave,
    getLeaveRequestsThisYear,
  };
});
