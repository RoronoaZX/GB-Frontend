import { defineStore } from "pinia";
import { Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useStockDelivery = defineStore("stock-delivery", () => {
  const deliveryStock = ref(null);
  const deliveryStocks = ref([]);

  const fetchDeliveryStocks = async () => {
    try {
      const response = await api.get("/api/raw-materials-delivery");
      deliveryStocks.value = response.data;
      console.log("response", response.data);
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
    createDeliveryStock,
    fetchDeliveryStocks,
  };
});
