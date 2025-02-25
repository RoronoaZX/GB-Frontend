import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useRequestPremixStore = defineStore("request-premix", () => {
  const requestPremix = ref(null);
  const requestPremixes = ref([]);

  const saveRequestPremix = async (data) => {
    console.log("data request oremix", data);
    Loading.show();
    try {
      const response = await api.post("/api/request-premix", {
        requests: data,
      });
      console.log("response", response.data);
      Notify.create({
        type: "positive",
        message: "Request Premix successfully",
      });
    } catch (error) {
      console.error(error);
      Notify.create({
        type: "negative",
        message: "Request Premix Error",
      });
    } finally {
      Loading.hide();
    }
  };

  return {
    requestPremix,
    requestPremixes,
    saveRequestPremix,
  };
});
