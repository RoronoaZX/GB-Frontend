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
    createDeliveryStock,
    fetchDeliveryStocks,
    fetchPendingDeliveryReports,
  };
});
