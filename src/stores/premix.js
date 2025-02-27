import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const usePremixStore = defineStore("premix", () => {
  const premix = ref(null);
  const premixes = ref([]);
  const pendingPremixData = ref([]);
  const confirmPremixData = ref([]);
  const declinePremixData = ref([]);
  const processPremixData = ref([]);
  const completedPremixData = ref([]);
  const toDeliverPremixData = ref([]);
  const toReceivePremixData = ref([]);
  const receivePremixData = ref([]);
  const branchPremix = ref([]);

  const fetchRequestBranchPremix = async (branchId) => {
    try {
      const response = await api.get(
        `/api/get-request-branch-premix/${branchId}`
      );
      branchPremix.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };

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
    // Loading.show();

    try {
      const confirmed = await api.get(`/api/get-confirm-premix/${warehouseId}`);
      console.log("confirmed.data", confirmed.data);
      // if (response.status === 200) {
      //   // Find the index of the report in the pendingSelectaReports array
      //   const index = confirmPremixData.value.findIndex(
      //     (report) => report.id === id
      //   );
      //   // If the report is found, remove it
      //   if (index !== -1) {
      //     pendingSelectaReports.value.splice(index, 1);
      //   }
      // }
      confirmPremixData.value = confirmed.data;
    } catch (error) {
      console.error(error);
    }
  };

  const confirmPremix = async (data) => {
    console.log("confirmdata", data);
    Loading.show();
    try {
      const confirm = await api.post(`/api/confirm-premix`, data);
      console.log("confirm", confirm.data);
      if (confirm.status === 200) {
        const id = data.id;
        // Find the index of the report in the pendingSelectaReports array
        const index = pendingPremixData.value.findIndex(
          (report) => report.id === id
        );

        // If the report is found, remove it
        if (index !== -1) {
          pendingPremixData.value.splice(index, 1);
        }
      }
      return confirm.data;
    } catch (error) {
      console.log(error);
    } finally {
      Loading.hide();
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
    Loading.show();
    try {
      const process = await api.post(`/api/process-premix`, data);
      console.log("process.data.premix_history.status", process.status);
      if (process.status === 200) {
        const id = data.id;
        const index = confirmPremixData.value.findIndex(
          (report) => report.id === id
        );

        console.log("index", index);

        if (index !== -1) {
          confirmPremixData.value.splice(index, 1);
        }
      }

      console.log("process", process.data);
      return process.data;
    } catch (error) {
      console.log(error);
    } finally {
      Loading.hide();
    }
  };

  const fetchCompletedPremix = async (warehouseId) => {
    console.log("warehouseId", warehouseId);
    // console.log("status", status);

    const completed = await api.get(`/api/get-completed-premix/${warehouseId}`);
    console.log("process.data", completed.data);
    completedPremixData.value = completed.data;
  };

  const completedPremix = async (data) => {
    console.log("data completed premix", data);

    try {
      const completed = await api.post(`/api/completed-premix`, data);
      if (completed.status === 200) {
        const id = data.id;
        const index = processPremixData.value.findIndex(
          (report) => report.id === id
        );

        console.log("index", index);

        if (index !== -1) {
          processPremixData.value.splice(index, 1);
        }
      }

      console.log("completed", completed.data);
      return completed.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchToDeliverPremix = async (warehouseId) => {
    console.log("warehouseId", warehouseId);
    // console.log("status", status);

    const toDeliver = await api.get(
      `/api/get-to-deliver-premix/${warehouseId}`
    );
    console.log("TO Deliver data", toDeliver.data);
    toDeliverPremixData.value = toDeliver.data;
  };

  const toDeliverPremix = async (data) => {
    console.log("data completed premix", data);

    try {
      const toDeliver = await api.post(`/api/to-deliver-premix`, data);

      if (toDeliver.status === 200) {
        const id = data.id;
        const index = completedPremixData.value.findIndex(
          (report) => report.id === id
        );

        if (index !== -1) {
          completedPremixData.value.splice(index, 1);
        }
      }

      console.log("toDeliver", toDeliver.data);
      toDeliverPremixData.value = toDeliver.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchToReceivePremix = async (warehouseId) => {
    console.log("warehouseId", warehouseId);
    // console.log("status", status);

    const toReceive = await api.get(
      `/api/get-to-receive-premix/${warehouseId}`
    );
    console.log("TO receive data", toReceive.data);
    toReceivePremixData.value = toReceive.data;
  };

  const toReceivePremix = async (data) => {
    console.log("data receive premix", data);

    try {
      const toReceive = await api.post(`/api/to-receive-premix`, data);

      if (toReceive.status === 200) {
        const id = data.id;
        const index = toDeliverPremixData.value.findIndex(
          (report) => report.id === id
        );

        if (index !== -1) {
          toDeliverPremixData.value.splice(index, 1);
        }
      }
      console.log("toReceive", toReceive.data);
      toReceivePremixData.value = toReceive.data;
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

      if (decline.status === 200) {
        const id = data.id;
        const index = pendingPremixData.value.findIndex(
          (report) => report.id === id
        );
        if (index !== -1) {
          pendingPremixData.value.splice(index, 1);
        }
      }
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

  const receivePremix = async (data) => {
    console.log("data to be received", data);
    try {
      const response = await api.post(`/api/receive-premix`, data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchReceivePremix = async (warehouseId) => {
    // console.log("data to be received", data);
    try {
      const response = await api.get(`/api/get-receive-premix/${warehouseId}`);
      // return response.data;
      receivePremixData.value = response.data;
    } catch (error) {
      console.log(error);
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

  // const requestPremix = async (data) => {
  //   console.log("Request Premix", data);
  //   const response = await api.post(`/api/branch-premix`, data);
  //   console.log("response", response.data);
  // };

  const saveRequestPremix = async (data) => {
    console.log("data request oremix", data);
    Loading.show();
    try {
      const response = await api.post("/api/request-premix", {
        requests: data,
      });
      console.log("response", response.data);
      Notify.create({
        type: "positive",
        message: "Request Premix successfully",
      });
    } catch (error) {
      console.error(error);
      Notify.create({
        type: "negative",
        message: "Request Premix Error",
      });
    } finally {
      Loading.hide();
    }
  };

  return {
    premix,
    premixes,
    pendingPremixData,
    confirmPremixData,
    declinePremixData,
    processPremixData,
    completedPremixData,
    toDeliverPremixData,
    toReceivePremixData,
    receivePremixData,
    branchPremix,
    savePremix,
    fetchBranchPremix,
    searchPremix,
    // requestPremix,
    fetchPendingPremix,
    confirmPremix,
    fetchConfirmPremix,
    declinePremix,
    fetchDeclinePremix,
    processPremix,
    fetchProcessPremix,
    completedPremix,
    fetchCompletedPremix,
    toDeliverPremix,
    fetchToDeliverPremix,
    toReceivePremix,
    fetchToReceivePremix,
    fetchRequestBranchPremix,
    receivePremix,
    fetchReceivePremix,
    saveRequestPremix,
  };
});
