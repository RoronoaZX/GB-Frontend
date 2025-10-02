import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { reactive, ref } from "vue";

export const useStockDelivery = defineStore("stock-delivery", () => {
  const deliveryStock = ref(null);

  const deliveryStocks = reactive({
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
  const pendingStocks = ref([]);
  const confirmStocks = ref([]);
  const declinedStocks = ref([]);

  const loading = false;
  const error = null;

  const fetchDeliveryStocks = async (page = 1, per_page = 5, search = "") => {
    try {
      const response = await api.get("/api/raw-materials-delivery", {
        params: {
          page: page,
          per_page: per_page,
          search: search,
        },
      });
      deliveryStocks.data = response.data;
      deliveryStocks.pagination = response.data.pagination;
      console.log("response", response.data);
      console.log("  deliveryStocks.data", deliveryStocks.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchPendingDeliveryReports = async (
    warehouseId,
    status,
    to_designation
  ) => {
    console.log("warehouseIdsss", warehouseId);
    console.log("categoryss", status);
    console.log("to_designationss", to_designation);

    try {
      const pending = await api.get(
        `/api/raw-materials-delivery-pending/${warehouseId}`,
        {
          params: {
            status: status,
            to_designation: to_designation,
          },
        }
      );
      console.log("pendingsss", pending.data);
      pendingStocks.value = pending.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchConfirmedDeliveryReports = async (
    warehouseId,
    status,
    to_designation
  ) => {
    console.log("fetchConfirmedDeliveryReportswarehouseId", warehouseId);
    console.log("fetchConfirmedDeliveryReportsstatus", status);
    console.log("fetchConfirmedDeliveryReportsto_designation", to_designation);

    try {
      const confirm = await api.get(
        `/api/raw-materials-delivery-confirmed/${warehouseId}`,
        {
          params: {
            status: status,
            to_designation: to_designation,
          },
        }
      );
      console.log("confirm", confirm.data);
      confirmStocks.value = confirm.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchDeclinedDeliveryReports = async (
    warehouseId,
    status,
    to_designation
  ) => {
    console.log("warehouseId", warehouseId);
    console.log("category", status);
    console.log("to_designation", to_designation);

    try {
      const declined = await api.get(
        `/api/raw-materials-delivery-declined/${warehouseId}`,
        {
          params: {
            status: status,
            to_designation: to_designation,
          },
        }
      );
      console.log("declined", declined.data);
      declinedStocks.value = declined.data;
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDeliveryStocks = async (data) => {
    console.log("data in store", data);

    try {
      const response = await api.post(
        `/api/raw-materials-delivery-confirmed`,
        data
      );

      console.log("response", response.data);
      Notify.create({
        type: "positive",
        message: "Stocks Delivery Confirmed Successfully",
        timeout: 3000,
      });
    } catch (error) {
      console.log("error", error);
      Notify.create({
        type: "negative",
        message: "Failed to Confirm the Stocks Delivery",
        timeout: 3000,
      });
    }
  };

  const declineDeliveryStocks = async (data) => {
    console.log("data in store", data);
    try {
      await api.post(`/api/raw-materials-delivery-declined`, data);

      Notify.create({
        type: "positive",
        message: "Stocks Delivery Declined Successfully",
        timeout: 3000,
      });
    } catch (error) {
      console.log("error", error);

      Notify.create({
        type: "negative",
        message: "Failed to Decline the Stocks Delivery",
        timeout: 3000,
      });
    }
  };

  const createDeliveryStock = async (stock) => {
    console.log("stock", stock);

    try {
      const response = await api.post("/api/raw-materials-delivery", stock);
      console.log("response", response.data);

      Notify.create({
        type: "positive",
        message: "Stocks Delivery Created Successfully",
        timeout: 3000,
      });
      return response.data;
    } catch (error) {
      console.log("error", error);

      Notify.create({
        type: "negative",
        message: "Failed to Create Stocks Delivery",
        timeout: 3000,
      });
      throw error;
    }
  };

  return {
    deliveryStock,
    deliveryStocks,
    loading,
    error,
    pendingStocks,
    confirmStocks,
    declinedStocks,
    createDeliveryStock,
    fetchDeliveryStocks,
    fetchPendingDeliveryReports,
    declineDeliveryStocks,
    confirmDeliveryStocks,
    fetchDeclinedDeliveryReports,
    fetchConfirmedDeliveryReports,
  };
});
