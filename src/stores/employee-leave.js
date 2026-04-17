import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useEmployeeLeaveStore = defineStore("employee-leave", () => {
  // State
  const employeeLeaveRequest = ref(null);
  const employeeLeavesRequests = ref([]);
  const currentLeaveRequest = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // Getters (computed properties)
  const getLeaveById = (id) => {
    return employeeLeavesRequests.value.find((leave) => leave.id === id);
  };

  const getPendingRequests = () => {
    return employeeLeavesRequests.value.filter(
      (leave) => leave.status === "pending"
    );
  };

  const getApprovedRequests = () => {
    return employeeLeavesRequests.value.filter(
      (leave) => leave.status === "approved"
    );
  };

  const getRejectedRequests = () => {
    return employeeLeavesRequests.value.filter(
      (leave) => leave.status === "rejected"
    );
  };

  // Actions
  const createLeaveRequest = async (data) => {
    loading.value = true;
    error.value = null;

    try {
      console.log("createLeaveRequest", data);
      const response = await api.post("/api/employee-leaves", data);

      // Add the enw request to the list
      employeeLeavesRequests.value.unshift(response.data);
      employeeLeaveRequest.value = response.data;

      return response.data;
    } catch (error) {
      error.value =
        error.response?.data?.message || "Failed to create leave request";
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const fetchLeaveRequests = async (params = {}) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get("/api/employee-leaves", { params });
      employeeLeavesRequests.value = response.data;
      return response.data;
    } catch (err) {
      error.value =
        err.response?.data?.message || "Failed to fetch leave requests";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchSingleLeaveRequest = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get(`/api/employee-leaves/${id}`);
      currentLeaveRequest.value = response.data;
      return response.data;
    } catch (err) {
      error.value =
        err.response?.data?.message || "Failed to fetch leave request";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateLeaveStatus = async (id, statusData) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.put(`/api/employee-leaves/${id}`, statusData);

      // Update the leave request in the list
      const index = employeeLeavesRequests.value.findIndex(
        (leave) => leave.id === id
      );
      if (index !== -1) {
        employeeLeavesRequests.value[index] = response.data;
      }

      if (currentLeaveRequest.value?.id === id) {
        currentLeaveRequest.value = response.data;
      }

      return response.data;
    } catch (err) {
      error.value =
        err.response?.data?.message || "Failed to update leave status";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteLeaveRequest = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      await api.delete(`/api/employee-leaves/${id}`);

      // Remove from list
      employeeLeavesRequests.value = employeeLeavesRequests.value.filter(
        (leave) => leave.id !== id
      );

      if (currentLeaveRequest.value?.id === id) {
        currentLeaveRequest.value = null;
      }

      return true;
    } catch (err) {
      error.value =
        err.response?.data?.message || "Failed to delete leave request";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const getLeaveRequestsThisYear = async (branchId) => {
    loading.value = true;
    error.value = null;

    try {
      console.log("getLeaveRequestsThisYear", branchId);
      const response = await api.get(`/api/employee-leaves/current-year`, {
        params: { branch_id: branchId },
      });

      employeeLeavesRequests.value = response.data;
      return response.data;
    } catch (err) {
      error.value =
        err.response?.data?.message ||
        "Failed to fetch this year's leave requests";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Additional utility methods
  const resetStore = () => {
    employeeLeaveRequest.value = null;
    employeeLeavesRequests.value = [];
    currentLeaveRequest.value = null;
    loading.value = false;
    error.value = null;
  };

  const employeeOnLeave = async (data) => {
    // This seems like a different endpoint, keeping as is
    console.log("employeeOnLeave", data);
    const response = await api.post("/employee-leaves", data);
    return response.data;
  };

  const leaveRequests = async (data) => {
    // updating to use fetchLeaveRequests
    console.log("leave Request", data);
    return await fetchLeaveRequests(data);
  };

  return {
    //State
    employeeLeaveRequest,
    employeeLeavesRequests,
    currentLeaveRequest,
    loading,
    error,

    // Getters
    getLeaveById,
    getPendingRequests,
    getApprovedRequests,
    getRejectedRequests,

    // Actions
    createLeaveRequest,
    fetchLeaveRequests,
    fetchSingleLeaveRequest,
    updateLeaveStatus,
    deleteLeaveRequest,
    getLeaveRequestsThisYear,
    employeeOnLeave,
    leaveRequests,
    resetStore,
  };
});
