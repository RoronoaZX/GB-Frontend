import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const usePremixStore = defineStore("premix", () => {
  const premix = ref(null);
  const premixes = ref([]);
  const pendingPremixData = ref([]);
  const confirmPremixData = ref([]);
  const declinePremixData = ref({
    data: [],
    pagination: {
      total: 0,
      per_page: 3,
      current_page: 1,
      last_page: 1,
      from: 0,
      to: 0,
    },
  });
  const processPremixData = ref([]);
  const completedPremixData = ref([]);
  const toDeliverPremixData = ref([]);
  const toReceivePremixData = ref([]);
  const receivePremixData = ref([]);
  const branchPremix = ref([]);
  const branchEmployeePremix = ref({
    data: [],
    pagination: {
      total: 0,
      per_page: 5,
      current_page: 1,
      last_page: 1,
      from: 0,
      to: 0,
    },
  });

  const fetchRequestBranchPremix = async (
    branchId,
    page,
    rowsPerPage,
    search
  ) => {
    try {
      const response = await api.get(
        `/api/get-request-branch-premix/${branchId}`,
        {
          params: {
            page,
            per_page: rowsPerPage,
            search,
          },
        }
      );
      branchPremix.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWarehousePremix = async (warehouseId) => {
    /* console.log("warehouseId", warehouseId); */
  };

  const fetchRequestBranchEmployeePremix = async (
    branchId,
    employeeId,
    page = 1,
    per_page = 5,
    search = ""
  ) => {
    try {
      const response = await api.get(
        `/api/get-request-branch-employee-premix/${branchId}/${employeeId}`,
        {
          params: {
            page,
            per_page: per_page,
            search: search,
          },
        }
      );

      branchEmployeePremix.value.data = response.data;
      branchEmployeePremix.value.pagination = response.data.pagination;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPendingPremix = async (warehouseId, status) => {
    try {
      const pending = await api.get(`/api/pending-premix/${warehouseId}`, {
        params: {
          status: status,
        },
      });
      pendingPremixData.value = pending.data;
    } catch (error) {
      console.error("error", error);
    }
  };

  const fetchConfirmPremix = async (warehouseId) => {
    try {
      const confirmed = await api.get(`/api/get-confirm-premix/${warehouseId}`);
      confirmPremixData.value = confirmed.data;
    } catch (error) {
      console.error(error);
    }
  };

  const confirmPremix = async (data) => {
    Loading.show();
    try {
      const confirm = await api.post(`/api/confirm-premix`, data);
      if (confirm.status === 200) {
        const id = data.id;
        const index = pendingPremixData.value.findIndex(
          (report) => report.id === id
        );

        if (index !== -1) {
          pendingPremixData.value.splice(index, 1);
        }
      }
      return confirm.data;
    } catch (error) {
      console.error(error);
    } finally {
      Loading.hide();
    }
  };

  const fetchProcessPremix = async (warehouseId) => {
    try {
      const process = await api.get(`/api/get-process-premix/${warehouseId}`);
      processPremixData.value = process.data;
    } catch (error) {
      console.error(error);
    }
  };

  const processPremix = async (data) => {
    Loading.show();
    try {
      const process = await api.post(`/api/process-premix`, data);
      if (process.status === 200) {
        const id = data.id;
        const index = confirmPremixData.value.findIndex(
          (report) => report.id === id
        );

        if (index !== -1) {
          confirmPremixData.value.splice(index, 1);
        }
      }

      return process.data;
    } catch (error) {
      console.error(error);
    } finally {
      Loading.hide();
    }
  };

  const fetchCompletedPremix = async (warehouseId) => {
    try {
      const completed = await api.get(`/api/get-completed-premix/${warehouseId}`);
      completedPremixData.value = completed.data;
    } catch (error) {
      console.error(error);
    }
  };

  const completedPremix = async (data) => {
    Loading.show();
    try {
      const completed = await api.post(`/api/completed-premix`, data);
      if (completed.status === 200) {
        const id = data.id;
        const index = processPremixData.value.findIndex(
          (report) => report.id === id
        );

        if (index !== -1) {
          processPremixData.value.splice(index, 1);
        }
      }

      return completed.data;
    } catch (error) {
      console.error(error);
    } finally {
      Loading.hide();
    }
  };

  const fetchToDeliverPremix = async (warehouseId) => {
    try {
      const toDeliver = await api.get(
        `/api/get-to-deliver-premix/${warehouseId}`
      );
      toDeliverPremixData.value = toDeliver.data;
    } catch (error) {
      console.error(error);
    }
  };

  const toDeliverPremix = async (data) => {
    Loading.show();
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

      toDeliverPremixData.value = toDeliver.data;
    } catch (error) {
      console.error(error);
    } finally {
      Loading.hide();
    }
  };

  const fetchToReceivePremix = async (warehouseId) => {
    try {
      const toReceive = await api.get(
        `/api/get-to-receive-premix/${warehouseId}`
      );
      toReceivePremixData.value = toReceive.data;
    } catch (error) {
      console.error(error);
    }
  };

  const toReceivePremix = async (data) => {
    Loading.show();
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
      toReceivePremixData.value = toReceive.data;
    } catch (error) {
      console.error(error);
    } finally {
      Loading.hide();
    }
  };

  const fetchDeclinePremix = async (
    warehouseId,
    status,
    page = 3,
    per_page = 1,
    search = ""
  ) => {
    try {
      const decline = await api.get(`/api/get-decline-premix/${warehouseId}`, {
        params: {
          status: status,
          page: page,
          per_page: per_page,
          search: search,
        },
      });

      declinePremixData.value = decline.data;
    } catch (error) {
      console.error(error);
    }
  };

  const declinePremix = async (data) => {
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
      declinePremixData.value = decline.data;
    } catch (error) {
      console.error("error", error);
    }
  };

  const searchPremix = async (searchQuery, branchId) => {
    const response = await api.get(`/api/search-premix`, {
      params: {
        keyword: searchQuery,
        branch_id: branchId,
      },
    });
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
    Loading.show();
    try {
      const response = await api.post(`/api/receive-premix`, data);
      if (response.data && response.data.message === "Branch raw materials updated successfully") {
        const id = response.data.receivePremixes.request_premixes_id;
        const status = response.data.receivePremixes.status;
        const index = branchPremix.value.findIndex(
          (report) => report.id === id
        );
        if (index !== -1) {
          branchPremix.value[index].status = status;
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      Loading.hide();
    }
  };

  const fetchReceivePremix = async (warehouseId, status, page, rowsPerPage) => {
    try {
      const response = await api.get(`/api/get-receive-premix/${warehouseId}`, {
        params: {
          status,
          page,
          per_page: rowsPerPage,
        },
      });
      receivePremixData.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const savePremix = async (data) => {
    Loading.show();
    try {
      const response = await api.post("/api/branch-premix", data);
      premixes.value = response.data;
    } catch (error) {
      console.error(error);
    } finally {
      Loading.hide();
    }
  };

  const saveRequestPremix = async (data, branchId, employeeId) => {
    const page = 1;
    const per_page = 5;

    Loading.show();
    try {
      const response = await api.post("/api/request-premix", {
        requests: data,
      });
      await fetchRequestBranchEmployeePremix(branchId, employeeId, page, per_page);
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

  const saveScalerRequestPremix = async (data, warehouseId) => {
    Loading.show();
    try {
      const response = await api.post("/api/request-premix", {
        requests: data,
      });
      await fetchPendingPremix(warehouseId, "pending");
      Notify.create({
        type: "positive",
        message: "Premix request created successfully on behalf of baker",
      });
    } catch (error) {
      console.error(error);
      Notify.create({
        type: "negative",
        message: "Failed to create premix request",
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
    branchEmployeePremix,
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
    fetchRequestBranchEmployeePremix,
    fetchWarehousePremix,
    saveScalerRequestPremix,
  };
});
