import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useCakeMakerReport = defineStore("cakeMakerReport", () => {
  const cakeMakerReport = ref(null);
  const cakeMakerReports = ref([]);

  const clearData = () => {
    cakeMakerReport.value = {};
    cakeMakerReports.value = [];
  };

  const searchBranchRawMaterials = async (searchKeyword, branchId) => {
    console.log("branchId", branchId);
    console.log("searchKeyword", searchKeyword);

    const response = await api.post(`/api`, {
      keyword: searchKeyword,
      branch_id: branchId,
    });
  };

  return {
    cakeMakerReport,
    cakeMakerReports,
    clearData,
    searchBranchRawMaterials,
  };
});
