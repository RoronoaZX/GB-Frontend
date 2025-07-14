import { defineStore } from "pinia";
import { Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useHolidaysStore = defineStore("holidays", () => {
  const holiday = ref([]);
  const holidays = ref(null);

  const createHolidays = async (data) => {
    console.log("createHolidays", data);
    try {
      const response = await api.post(`/api/holiday`, data);

      Notify.create({
        type: "positive",
        message: "Successfull",
        position: "top",
      });
    } catch (error) {
      console.error(error.response.data);

      Notify.create({
        type: "negative",
        message: error.response.data.message,
      });
    }
  };

  return {
    holiday,
    holidays,
    createHolidays,
  };
});
