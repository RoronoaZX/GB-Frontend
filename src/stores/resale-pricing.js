import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { Notify } from "quasar";

export const useResalePricingStore = defineStore("resalePricing", () => {
  const loading = ref(false);
  const resaleProducts = ref([]);
  const summary = ref({
    total_products: 0,
    total_units_in_stock: 0,
    total_cost_valuation: 0,
    total_retail_valuation: 0,
    total_potential_profit: 0,
    average_profit_margin_pct: 0,
  });

  const pagination = ref({
    page: 1,
    rowsPerPage: 15,
    rowsNumber: 0,
  });

  const fetchResalePricing = async (params = {}) => {
    loading.value = true;
    try {
      const response = await api.get("/api/resale-products-pricing", {
        params: {
          branch_id: params.branch_id || undefined,
          category: params.category || undefined,
          search: params.search || undefined,
          page: params.page || pagination.value.page,
          per_page: params.rowsPerPage || pagination.value.rowsPerPage,
          sort_by: params.sortBy || undefined,
          sort_order: params.descending ? "desc" : "asc",
        },
      });

      if (response.data.success) {
        resaleProducts.value = response.data.data.data;
        summary.value = response.data.summary;
        pagination.value.page = response.data.data.current_page;
        pagination.value.rowsPerPage = response.data.data.per_page;
        pagination.value.rowsNumber = response.data.data.total;
      }
    } catch (error) {
      Notify.create({
        type: "negative",
        message: error.response?.data?.message || "Failed to load resale pricing analysis",
        position: "top-right",
      });
    } finally {
      loading.value = false;
    }
  };

  const updatePricingAndStock = async (payload) => {
    try {
      const response = await api.post(
        "/api/resale-products-pricing/update-pricing-and-stock",
        payload
      );

      if (response.data.success) {
        Notify.create({
          type: "positive",
          message: response.data.message || "Pricing and stock updated successfully",
          position: "top-right",
          icon: "check_circle",
        });
        return { success: true, data: response.data.data };
      }
      return { success: false, message: response.data.message };
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Failed to update pricing and stock. Please check your credentials.";
      Notify.create({
        type: "negative",
        message: msg,
        position: "top-right",
        icon: "error",
      });
      return { success: false, message: msg };
    }
  };

  return {
    loading,
    resaleProducts,
    summary,
    pagination,
    fetchResalePricing,
    updatePricingAndStock,
  };
});
