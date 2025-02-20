import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const usePremixStore = defineStore("premix", () => {
  const premix = ref(null);
  const premixes = ref([]);
  const pendingPremixData = ref([]);
  const confirmPremixData = ref([]);
  const declinePremixData = ref([]);
  const processPremixData = ref([]);

  const fetchPendingPremix = async (warehouseId, status) => {
    console.log("warehouseId", warehouseId);
    console.log("category", status);
    try {
      const pending = await api.get(`/api/pending-premix/${warehouseId}`, {
        params: {
          status: status,
        },
      });
      console.log("pendong", pending.data);
      pendingPremixData.value = pending.data;
    } catch (error) {
      console.error("error", error);
    }
  };

  const fetchConfirmPremix = async (warehouseId) => {
    console.log("warehouseId", warehouseId);
    // console.log("status", status);

    const confirmed = await api.get(`/api/get-confirm-premix/${warehouseId}`);
    console.log("confirmed.data", confirmed.data);
    confirmPremixData.value = confirmed.data;
  };

  const confirmPremix = async (data) => {
    console.log("confirmdata", data);
    try {
      const confirm = await api.post(`/api/confirm-premix`, data);
      console.log("confirm", confirm.data);
      confirmPremixData.value = confirm.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProcessPremix = async (warehouseId) => {
    console.log("warehouseId", warehouseId);
    // console.log("status", status);

    const process = await api.get(`/api/get-process-premix/${warehouseId}`);
    console.log("process.data", process.data);
    processPremixData.value = process.data;
  };

  const processPremix = async (data) => {
    console.log("process data", data);
    try {
      const process = await api.post(`/api/process-premix`, data);
      console.log("process", process.data);
      processPremixData.value = process.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDeclinePremix = async (warehouseId) => {
    console.log("fetchDeclinePremix warehouseId", warehouseId);
    console.log("status", status);

    const decline = await api.get(`/api/get-decline-premix/${warehouseId}`);
    console.log("decline.data", decline.data);
    declinePremixData.value = decline.data;
  };

  const declinePremix = async (data) => {
    console.log("declineData", data);
    try {
      const decline = await api.post(`/api/decline-premix`, data);
      console.log("decline Reports", decline.data);
      declinePremixData.value = decline.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const searchPremix = async (searchQuery, branchId) => {
    console.log("searchQuery", searchQuery);
    console.log("branchId", branchId);
    const response = await api.get(`/api/search-premix`, {
      params: {
        keyword: searchQuery,
        branch_id: branchId,
      },
    });
    console.log("premix search", response.data);
    premixes.value = response.data;
  };

  const fetchBranchPremix = async (branchId) => {
    try {
      const response = await api.get(`/api/get-branch-premix/${branchId}`);
      premixes.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const savePremix = async (data) => {
    console.log("data from store", data);

    try {
      const response = await api.post("/api/branch-premix", data);

      premixes.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const requestPremix = async (data) => {
    console.log("Request Premix", data);
    // const response = await api.post()
  };

  return {
    premix,
    premixes,
    pendingPremixData,
    confirmPremixData,
    declinePremixData,
    processPremixData,
    savePremix,
    fetchBranchPremix,
    searchPremix,
    requestPremix,
    fetchPendingPremix,
    confirmPremix,
    fetchConfirmPremix,
    declinePremix,
    fetchDeclinePremix,
    processPremix,
    fetchProcessPremix,
  };
});
