import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useCakeMakerReportStore = defineStore("cakeMakerReport", () => {
  const cakeMakerReport = ref(null);
  const cakeMakerReports = ref([]);
  const user = ref({});
  const pendingReports = ref([]);
  const onDisplayProducts = ref([]);

  const setUser = (newUser) => {
    user.value = newUser;
  };

  const clearData = () => {
    cakeMakerReport.value = {};
    cakeMakerReports.value = [];
  };

  // const searchBranchRawMaterials = async (searchKeyword, branchId) => {
  //   console.log("branchId", branchId);
  //   console.log("searchKeyword", searchKeyword);

  //   const response = await api.post(`/api`, {
  //     keyword: searchKeyword,
  //     branch_id: branchId,
  //   });
  // };

  const fetchCakeReport = async (userId) => {
    const response = await api.get(`/api/branch/${userId}/cake-report`);
    console.log("response", response.data);
    cakeMakerReports.value = response.data;
  };

  const fetchCakePendingReport = async (branchId) => {
    try {
      const response = await api.get(
        `/api/branch/${branchId}/cakePendingReport`
      );
      console.log("response", response.data);
      pendingReports.value = response.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchOnDisplayProducts = async (branchId) => {
    console.log("sdasdf", branchId);
    const response = await api.get(
      `/api/branch/${branchId}/getCakeOnDisplayProduct`
    );
    onDisplayProducts.value = response.data;
    // console.log("reposne", onDisplayProducts.value);
  };

  const createReports = async (data) => {
    console.log("cake maker reports", data);
    Loading.show();
    try {
      const response = await api.post("/api/cake-report", data);

      Notify.create({
        type: "positive",
        message: "Report save successfully!",
      });
    } catch (error) {
      console.log("error", error);
      Notify.create({
        type: "negative",
        message: "Error saving report",
      });
    } finally {
      Loading.hide();
    }
  };

  const confirmReports = async (id) => {
    console.log("id to be edit", id);
    const response = await api.post(`/api/branch/${id}/cakeConfirmedReport`);
    if (response.status === 200) {
      const index = pendingReports.value.findIndex(
        (report) => report.id === id
      );
      if (index !== -1) {
        pendingReports.value.splice(index, 1);
      }
    }
    return response.data;
  };

  const declineReport = async (id) => {
    try {
      const response = await api.post(`/api/decline-cake-maker-report/${id}`, {
        remark,
      });
      if (response.status === 200) {
        const index = pendingReports.value.findIndex(
          (report) => report.id === id
        );

        if (index !== -1) {
          pendingReports.value.splice(index, 1);
        }
      }
      return response.data;
    } catch (error) {
      console.error("Error declining report:", error);
    }
  };

  return {
    user,
    cakeMakerReport,
    cakeMakerReports,
    pendingReports,
    onDisplayProducts,
    setUser,
    clearData,
    createReports,
    fetchCakeReport,
    fetchCakePendingReport,
    fetchOnDisplayProducts,
    confirmReports,
    declineReport,
    // searchBranchRawMaterials,
  };
});
