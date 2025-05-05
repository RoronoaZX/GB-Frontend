import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useBreadProductStore = defineStore("bread", () => {
  const bread = ref(null);
  const breads = ref([]);
  const pendingBreads = ref([]);

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

  const fetchPendingBreadsReport = async (branchId, page, perPage) => {
    console.log("branch IDsss", branchId);
    try {
      const response = await api.get(`/api/fetch-pending-send-branch-bread`, {
        params: {
          branch_id: branchId,
          page: page,
          per_page: perPage,
        },
      });
      console.log("bread responsesss", response.data);
      pendingBreads.value = response.data;
      // return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSendBreadToBranch = async (branchId, page, perPage) => {
    console.log("branchid", branchId);
    console.log("page", page);
    console.log("rowsPerPage", perPage);
    try {
      const response = await api.get(
        `/api/fetch-send-bread-to-branch/${branchId}`,
        {
          params: {
            page,
            per_page: perPage,
          },
        }
      );
      breads.value = response.data;
      // return response.data;
    } catch (error) {
      console.log("Error fetching send product to branch", error);
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

  const recievedBread = async (data) => {
    console.log("data in the store in the bread", data);
    try {
      const response = await api.post("/api/received-branch-bread", data);
      bread.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    bread,
    breads,
    pendingBreads,
    fetchBranchBread,
    sendBreadToBranch,
    fetchSendBreadToBranch,
    recievedBread,
    fetchPendingBreadsReport,
  };
});
