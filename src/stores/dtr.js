// stores/dtr.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

export const useDTRStore = defineStore("dtrs", () => {
  const dtr = ref(null);
  const dtrs = ref([]);
  const dtrCutOffData = ref([]);
  const branchWithWarehouses = ref([]);
  const user = ref({});

  const setUser = (newUser) => {
    console.log("Setting user in DTR store:", newUser.data);
    user.value = newUser.data;
  };

  const fetchDTR = async (page, rowsPerPage, search) => {
    try {
      const response = await api.get("/api/dtr", {
        params: { page: page, per_page: rowsPerPage, search },
      });
      if (response && response.data) {
        dtrs.value = response.data; // Assign the fetched data to the store
        return response.data; // Return the fetched data
      } else {
        console.warn("No data returned from API.");
        dtrs.value = [];
        return [];
      }
    } catch (error) {
      console.error("Error fetching DTR data:", error);
      dtrs.value = [];
      return [];
    }
  };

  const fetchDTRRange = async (data) => {
    // Send a POST request to fetch DTR data
    console.log("Fetching DTR Range with data:", data);
    const response = await api.post("/api/dtr-data", data);
    console.log("DTR Range response:", response);

    // Assuming your DTR store has a method to set the fetched data
    dtrCutOffData.value = response.data;
  };
  const fetchEmployeeDTRRange = async (data) => {
    // Send a POST request to fetch DTR data
    console.log("Fetching DTR Range with data:", data);
    const response = await api.post("/api/dtr-data", data);
    console.log("DTR Range response:", response);

    // Assuming your DTR store has a method to set the fetched data
    dtrCutOffData.value = response.data;
  };

  const searchDTR = async (keyword) => {
    try {
      console.log("Searching for DTR with keyword:", keyword);
      const response = await api.post(`/api/search-drt?keyword=${keyword}`);
      console.log("DTR response:", response);
      dtrs.value = response.data;
    } catch (error) {
      console.error("Error searching DTR:", error);
    }
  };

  const saveEmployeeDtr = async (data) => {
    console.log("Saving employee DTR with data:", data);

    try {
      const response = await api.post("/api/saveEmployeeDtr", data);

      Notify.create({
        type: "positive",
        message: "DTR Save",
      });
      return response.data;
    } catch (error) {
      console.log("Error saving employee DTR:", error);
      Notify.create({
        type: "negative",
        message: "Failed to save DTR",
      });
    }
  };

  const saveOvertime = async (data) => {
    const response = await api.post("/api/saveOvertime", data);
    dtrs.value = response.data;
    fetchDTR();
    Notify.create({
      type: "positive",
      message: "Over Time Save",
    });
  };

  const fetchDTRPayrollPerCutOff = async (id) => {
    console.log("fetchDTRPayrollPerCutOff", id);

    try {
      const response = await api.get(
        `/api/fetch-drt-payroll-per-cut-off/${id}`
      );
      dtrCutOffData.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const approveOvertime = async (data) => {
    console.log("Approving overtime with data:", data);
    try {
      const response = await api.post("/api/approveOvertime", data);
      Notify.create({
        type: "positive",
        message: "Over Time Approved",
      });
      return response.data;
    } catch (error) {
      console.error("Error approving overtime:", error);
    }
    // Return the response data for further processing if needed
  };

  const declineOvertime = async (data) => {
    const response = await api.post("/api/declineOvertime", data);

    Notify.create({
      type: "negative",
      message: "Over Time Declined",
    });
    return response.data;
  };

  const updateDtrScheduleIn = async (data) => {
    console.log("updateDtrScheduleIn in store:", data);
    const id = data.id;

    try {
      const response = await api.put(`/api/update-dtr-schedule-in/${id}`, data);

      Notify.create({
        message: "Scheduled in updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    } catch (error) {
      console.log("error", error);
      Notify.create({
        message: "Failed to update schedule in",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    }
  };

  const updateDtrSheduleOut = async (data) => {
    console.log("updateDtrSheduleOut in store", data);
    const id = data.id;

    try {
      const response = await api.put(
        `/api/update-dtr-schedule-out/${id}`,
        data
      );

      Notify.create({
        message: "Scheduled out updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    } catch (error) {
      console.log(error);
      Notify.create({
        message: "Schedules out updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    }
  };

  const getBranchWithWarehouses = async () => {
    try {
      const response = await api.get("/api/getBranchWithWarehouses");
      console.log("getBranchWithWarehouses response", response);
      branchWithWarehouses.value = response.data;
    } catch (error) {
      console.log("getBranchWithWarehouses error", error);
    }
  };

  const updateDTRWhereIN = async (data) => {
    console.log("updateDTRWhereIN in store:", data);

    try {
      const response = await api.put(`/api/updateDTRWhereIN`, data);
      Notify.create({
        message: "DTR Where IN updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    } catch (error) {
      console.log("error", error);
      Notify.create({
        message: "Failed to update DTR Where IN",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    }
  };

  const updateDTRWhereOUT = async (data) => {
    console.log("updateDTRWhereOUT in store:", data);

    try {
      const response = await api.put(`/api/updateDTRWhereOUT`, data);
      Notify.create({
        message: "DTR Where OUT updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    } catch (error) {
      console.log("error", error);
      Notify.create({
        message: "Failed to update DTR Where OUT",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    }
  };

  const updateDTRShiftStatus = async (data) => {
    console.log("updateDTRShiftStatus in store:", data);

    try {
      const response = await api.put(`/api/updateDTRShiftStatus`, data);
      Notify.create({
        message: "DTR Shift Status updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    } catch (error) {
      console.log("error", error);
      Notify.create({
        message: "Failed to update DTR Shift Status",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    }
  };

  const updateDTRDateIN = async (data) => {
    console.log("updateDTRDateIN in store:", data);

    try {
      const response = await api.put(`/api/updateDTRDateIN`, data);
      Notify.create({
        message: "DTR Date IN updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    } catch (error) {
      console.log("error", error);
      Notify.create({
        message: "Failed to update DTR Date IN",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    }
  };

  const updateDTRTimeIN = async (data) => {
    console.log("updateDTRTimeIN in store", data);

    try {
      const response = await api.put(`/api/updateDTRTimeIN`, data);
      Notify.create({
        message: "DTR Time IN updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    } catch (error) {
      console.log("error", error);
      Notify.create({
        message: "Failed to update DTR Time IN",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    }
  };

  const updateDTRDateOUT = async (data) => {
    console.log("updateDTRDateOUT in store:", data);

    try {
      const response = await api.put(`/api/updateDTROUT`, data);
      Notify.create({
        message: "DTR Date OUT updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    } catch (error) {
      console.log("error", error);
      Notify.create({
        message: "Failed to update DTR Date OUT",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    }
  };

  const updateDTRTimeOUT = async (data) => {
    console.log("updateDTRTimeOUT in store", data);

    try {
      const response = await api.put(`/api/updateDTRTimeOUT`, data);
      Notify.create({
        message: "DTR Time OUT updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    } catch (error) {
      console.log("error", error);
      Notify.create({
        message: "Failed to update DTR Time OUT",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    }
  };

  const updateDTRLunchBreakStart = async (data) => {
    console.log("updateDTRLunchBreakStart in store:", data);

    try {
      const response = await api.put(`/api/updateDTRLunchBreakStart`, data);

      Notify.create({
        message: "DTR Lunch Break Start updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    } catch (error) {
      console.log("error", error);
      Notify.create({
        message: "Failed to update DTR Lunch Break Start",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    }
  };

  const updateDTRLunchBreakEnd = async (data) => {
    console.log("updateDTRLunchBreakEnd in store:", data);

    try {
      const response = await api.put(`/api/updateDTRLunchBreakEnd`, data);

      Notify.create({
        message: "DTR Lunch Break End updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    } catch (error) {
      console.log("error", error);
      Notify.create({
        message: "Failed to update DTR Lunch Break End",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    }
  };

  const updateDTRBreakStart = async (data) => {
    console.log("updateDTRBreakStart in store:", data);

    try {
      const response = await api.put(`/api/updateDTRBreakStart`, data);

      Notify.create({
        message: "DTR Break Start updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    } catch (error) {
      console.log("error", error);
      Notify.create({
        message: "Failed to update DTR Break Start",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    }
  };

  const updatedDTRBreakEnd = async (data) => {
    console.log("updateDTRBreakEnd in store:", data);

    try {
      const response = await api.put(`/api/updateDTRBreakEnd`, data);

      Notify.create({
        message: "DTR Break End updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    } catch (error) {
      console.log("error", error);
      Notify.create({
        message: "Failed to update DTR Break End",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    }
  };

  const updatedDTROvertimeStart = async (data) => {
    console.log("updateDTROvertimeStart in store:", data);

    try {
      const response = await api.put(`/api/updatedDTROvertimeStart`, data);

      Notify.create({
        message: "DTR Overtime Start updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    } catch (error) {
      console.log("error", error);
      Notify.create({
        message: "Failed to update DTR Overtime Start",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    }
  };

  const updatedDTROvertimeEnd = async (data) => {
    console.log("updateDTROvertimeEnd in store:", data);

    try {
      const response = await api.put(`/api/updatedDTROvertimeEnd`, data);

      Notify.create({
        message: "DTR Overtime End updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    } catch (error) {
      console.log("error", error);
      Notify.create({
        message: "Failed to update DTR Overtime End",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    }
  };

  const updateDTROvertimeReasons = async (data) => {
    console.log("updateDTROvertimeReason in store:", data);

    try {
      const response = await api.put(`/api/updateDTROvertimeReasons`, data);

      Notify.create({
        message: "DTR Overtime Reason updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    } catch (error) {
      console.log("error", error);
      Notify.create({
        message: "Failed to update DTR Overtime Reason",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    }
  };

  const updateDTROvertimeDeclinedReasons = async (data) => {
    console.log("updateDTROvertimeDeclinedReason in store:", data);

    try {
      const response = await api.put(
        `/api/updatedDTROvertimeDeclineReasons`,
        data
      );

      Notify.create({
        message: "DTR Overtime Declined Reason updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateDTROTStatus = async (data) => {
    console.log("updateDTRStatus in store:", data);

    try {
      const response = await api.put(`/api/updateDTROTStatus`, data);

      Notify.create({
        message: "DTR Status updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateDTROTApprovedBy = async (data) => {
    console.log("updateDTRApprovedBy in store:", data);

    try {
      const response = await api.put(`/api/updateDTROTApprovedBy`, data);

      Notify.create({
        message: "DTR Approved By updated successfully",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    } catch (error) {
      console.log("error", error);

      Notify.create({
        message: "Failed to update DTR Approved By",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    }
  };

  return {
    dtr,
    dtrs,
    dtrCutOffData,
    branchWithWarehouses,
    user,
    setUser,
    fetchDTR,
    fetchDTRRange,
    fetchEmployeeDTRRange,
    fetchDTRPayrollPerCutOff,
    saveEmployeeDtr,
    saveOvertime,
    searchDTR,
    approveOvertime,
    declineOvertime,
    updateDtrScheduleIn,
    updateDtrSheduleOut,
    getBranchWithWarehouses,
    updateDTRWhereIN,
    updateDTRWhereOUT,
    updateDTRShiftStatus,
    updateDTRDateIN,
    updateDTRDateOUT,
    updateDTRTimeIN,
    updateDTRTimeOUT,
    updateDTRLunchBreakStart,
    updateDTRLunchBreakEnd,
    updateDTRBreakStart,
    updatedDTRBreakEnd,
    updatedDTROvertimeStart,
    updatedDTROvertimeEnd,
    updateDTROvertimeReasons,
    updateDTROvertimeDeclinedReasons,
    updateDTROTStatus,
    updateDTROTApprovedBy,
  };
});
