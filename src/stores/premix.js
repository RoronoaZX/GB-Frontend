import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const usePremixStore = defineStore("premix", () => {
  const premix = ref(null);
  const premixes = ref([]);

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
    savePremix,
    fetchBranchPremix,
    searchPremix,
    requestPremix,
  };
});
