import { defineStore } from "pinia";
import { Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useHolidaysStore = defineStore("holidays", () => {
  const holiday = ref([]);
  const holidays = ref(null);

  // const fetchHolidays = async (year, month) => {
  //   try {
  //     const response = await api.get(`/api/holiday`, params: {
  //       year: year,
  //       month: month
  //     });
  //     console.log("holidays response:", response.data);
  //     holidays.value = response.data;
  //   } catch (error) {
  //     console.log("holidays error:", response.data);
  //   }
  // };

  const fetchHolidays = async ({ year, month }) => {
    try {
      const response = await api.get(`/api/holiday`, {
        params: { year, month },
      });
      holidays.value = response.data;
    } catch (error) {
      console.error("Error fetching holidays:", error);
      holidays.value = [];
    }
  };

  const createHoliday = async (newData) => {
    try {
      const response = await api.post("/api/holiday", newData);

      Notify.create({
        type: "positive",
        message: `${newData.name || "Holiday"} created successfully.`,
        position: "top",
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        message: error.response.data.message,
      });
    }
  };

  const updateHoliday = async (id, updatedData, originalData) => {
    try {
      const response = await api.put(`/api/holiday/${id}`, updatedData);

      const nameChanged = originalData.name !== response.data.name;
      const dateChanged = originalData.date !== response.data.date;

      let message = "";

      if (nameChanged) {
        message += `Holiday name changed from "${
          originalData.name || "N/A"
        }" to "${response.data.name || "N/A"}".`;
      }

      if (dateChanged) {
        message += dateChanged && message ? " " : "";
        message += `Holiday date changed from "${
          originalData.date || "N/A"
        }" to "${response.data.date || "N/A"}".`;
      }

      if (!message) {
        message = `${updatedData.name || "Holiday"} updated successfully.`;
      }

      Notify.create({
        type: "positive",
        message,
        timeout: 2000,
        position: "top",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update holiday!";

      Notify.create({
        type: "negative",
        message: errorMessage,
        timeout: 2000,
        position: "top",
      });
    }
  };

  const deleteHoliday = async (id) => {
    console.log("holiday delete id", id);
    try {
      await api.delete(`/api/holiday/${id}`);
    } catch (error) {
      console.log("Delete Holiday Error: ", error);
    }
  };

  return {
    holiday,
    holidays,
    createHoliday,
    fetchHolidays,
    updateHoliday,
    deleteHoliday,
  };
});
