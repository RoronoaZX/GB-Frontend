import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useStockDelivery = defineStore("stock-delivery", () => {
  const deliveryStock = ref(null);
  const deliveryStocks = ref([]);

  const createDeliveryStock = async (stock) => {
    console.log("stock", stock);

    try {
      const response = await api.post("/api/raw-materials-delivery", stock);
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
    }

    // raw-materials-delivery
  };

  return {
    deliveryStock,
    deliveryStocks,
    createDeliveryStock,
  };
});
