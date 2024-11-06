import { defineStore } from "pinia";
import { Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useCashAdvanceStore = defineStore("cash-advance", () => {
  const cashAdvance = ref(null);
  const cashAdvances = ref([]);

  const fetchCashAdvance = async () => {
    try {
      const response = await api.get("/api/cash-advance");
      cashAdvances.value = response.data;
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  const searchCashAdvance = async (keyword) => {
    try {
      console.log("Searching for employee with keyword:", keyword);
      const response = await api.post(
        `/api/search-cash-advance?keyword=${keyword}`
      );
      console.log("CA response:", response);
      cashAdvances.value = response.data;
    } catch (error) {
      console.error("Error searching CA:", error);
    }
  };

  const createCashAdvance = async (data) => {
    try {
      const response = await api.post("/api/cash-advance", data);
      cashAdvances.value.unshift(response.data);
      Notify.create({
        type: "positive",
        // position: "top",
        message: "Cash Advance save",
        setTimeout: 1000,
      });
    } catch (error) {
      console.log("CA error", error);
      Notify.create({
        type: "negative",
        // position: "top",
        message: "Error saving Cash Advance",
      });
    }
  };

  return {
    cashAdvance,
    cashAdvances,
    createCashAdvance,
    fetchCashAdvance,
    searchCashAdvance,
  };
});
