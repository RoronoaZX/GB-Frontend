import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useSupplierHistoryStore = defineStore("supplier-history", () => {
  const supplierHistory = ref(null);
  const supplierHistories = ref([]);

  const fetchSupplierHistory = async (page = 1, per_page = 5, search = "") => {
    console.log("store history");

    try {
      const response = await api.get("/api/fetch-supplier-records", {
        params: {
          page: page,
          per_page: per_page,
          search: search,
        },
      });
      console.log("responsess", response.data);

      supplierHistories.value = response.data;

      console.log("supplierHistoriesssss", supplierHistories.value);
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateSupplierHistoriesDateTime = async (deliveryId, newDateTime) => {
    console.log(
      "Updating date time for delivery:",
      deliveryId,
      "to new time:",
      newDateTime
    );
  };

  return {
    supplierHistory,
    supplierHistories,
    fetchSupplierHistory,
    updateSupplierHistoriesDateTime,
  };
});
