import { defineStore } from "pinia";
import { Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useCreditsStore = defineStore("employee-credits", () => {
  const credits = ref([]);
  const credit = ref(null);

  const fetchCreditsPerCutOff = async (from, to, employee_id) => {
    console.log("Fetching Employee per cut off Credits", from, to, employee_id);
    try {
      const response = await api.get(
        `/api/fetch-employee-credits-per-cut-off/${from}/${to}/${employee_id}`
      );
      console.log("Credits Response", response.data);
      credits.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const addingCredits = async (data) => {
    console.log("Employee Credits Data:", data);
    try {
      const response = await api.post("/api/employee-adding-credits", data);
      console.log(response.data);
      Notify.create({
        type: "positive",
        message: "Employee credits successfully created",
        setTimeout: 1000,
      });
    } catch (error) {
      console.log(error);
      Notify.create({
        type: "negative",
        message: "Error creating employee credits",
        setTimeout: 1000,
      });
    }
  };

  const savingCredits = async (data) => {
    console.log("Employee Credits Data:", data);
    try {
      const response = await api.post("/api/employee-saving-credits", data);
      console.log(response.data);
      Notify.create({
        type: "positive",
        message: "Employee credits successfully created",
        setTimeout: 1000,
      });
    } catch (error) {
      console.log(error);
      Notify.create({
        type: "negative",
        message: "Error creating employee credits",
        setTimeout: 1000,
      });
    }
  };

  return {
    credits,
    credit,
    addingCredits,
    savingCredits,
    fetchCreditsPerCutOff,
  };
});
