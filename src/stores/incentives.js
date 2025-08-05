import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useIncentivesStore = defineStore("incentives", () => {
  const incentive = ref(null);
  const incentives = ref([]);

  const fetchIncentives = async () => {
    try {
      const response = await api.get("/api/incentives-bases");
      incentives.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const createIncentives = async (data) => {
    console.log("data from store", data);
    try {
      const response = await api.post("/api/incentives-bases", data);
      incentive.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    incentive,
    incentives,
    createIncentives,
    fetchIncentives,
  };
});
