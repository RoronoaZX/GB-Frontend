import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useCakeMakerReportStore = defineStore("cakeMakerReport", () => {
  const cakeMakerReport = ref(null);
  const cakeMakerReports = ref([]);
  const user = ref({});

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

  return {
    user,
    cakeMakerReport,
    cakeMakerReports,
    setUser,
    clearData,
    createReports,
    fetchCakeReport,
    // searchBranchRawMaterials,
  };
});
