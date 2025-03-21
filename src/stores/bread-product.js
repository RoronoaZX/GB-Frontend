import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useBreadProductStore = defineStore("bread", () => {
  const bread = ref(null);
  const breads = ref([]);

  const fetchBranchBread = async (branchesId, category) => {
    console.log("branch IDsss", branchesId);
    console.log("categoryss", category);

    try {
      const response = await api.get(`/api/fetch-bread-products`, {
        params: {
          branches_id: branchesId,
          category: category,
        },
      });
      console.log("bread responsesss", response.data);
      breads.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const sendBreadToBranch = async (data) => {
    console.log("data in the store", data);
    try {
      const response = await api.post("/api/sending-bread-to-branch", data);
      breads.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    bread,
    breads,
    fetchBranchBread,
    sendBreadToBranch,
  };
});
