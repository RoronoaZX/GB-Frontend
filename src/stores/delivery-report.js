import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useDeliveryReceiptStore = defineStore("receipt-store", () => {
  const deliveryReceipt = ref(null);
  const deliveryReceipts = ref([]);

  const saveDeliveryReceipt = async (data) => {
    console.log("saveDeliveryReceipt", data);

    try {
      const response = await api.post("/api/delivery-receipt", data);
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error("Error saving delivery receipt:", error);
    }
  };

  return {
    deliveryReceipt,
    deliveryReceipts,
    saveDeliveryReceipt,
  };
});
