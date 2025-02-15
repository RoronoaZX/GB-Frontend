import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useRequestPremixStore = defineStore("request-premix", () => {
  const requestPremix = ref(null);
  const requestPremixes = ref([]);

  const saveRequestPremix = async (data) => {
    console.log("data request oremix", data);
    try {
      const response = await api.post("/api/request-premix", {
        requests: data,
      });
      console.log("response", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    requestPremix,
    requestPremixes,
    saveRequestPremix,
  };
});
