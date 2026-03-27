import { defineStore } from "pinia";
import { ref } from "vue";

export const useEmployeeLeaveStore = defineStore("employee-leave", () => {
  const employeeLeaveRequest = ref(null);
  const employeeLeavesRequests = ref([]);

  const createLeaveRequest = async (data) => {
    console.log("createLeaveRequest", data);
  };

  const leaveRequests = async (data) => {
    console.log("leave Request", data);
  };

  return {
    employeeLeaveRequest,
    employeeLeavesRequests,
    leaveRequests,
    createLeaveRequest,
  };
});
