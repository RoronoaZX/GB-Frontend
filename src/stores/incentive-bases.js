import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

export const useIncentivesBasesStore = defineStore("incentives-bases", () => {
  const incentiveBase = ref(null);
  const incentivesBases = ref([]);

  const fetchIncentivesBases = async () => {
    try {
      const response = await api.get("/api/incentives-bases");
      console.log("fetchIncentivesBases", response.data);
      incentivesBases.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchIncentivesPerCutOff = async (employee_id) => {
    console.log("fetchIncentivesPerCutOff", employee_id);
    try {
      const response = await api.get(
        `/api/fetch-employee-incentives-per-cut-off/${employee_id}`
      );
      console.log("Incentives Response", response.data);
      incentives.value = response.data;
    } catch (error) {
      console.log(error);
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

  const updateNumberEmployee = async (data, val) => {
    console.log("data from store", data);
    try {
      const response = await api.put(
        "/api/incentives-bases/update-number-employee/" + data.id,
        {
          number_of_employees: val,
        }
      );
      console.log("sssss", response);

      Notify.create({
        type: "positive",
        message: `${response.data.message}`,
        timeout: 1000,
      });
      return response;
    } catch (error) {
      console.error(error);

      Notify.create({
        type: "negative",
        message: `${error.response.data.error}`,
        timeout: 5000,
      });
    }
  };

  return {
    incentiveBase,
    incentivesBases,
    createIncentives,
    fetchIncentivesBases,
    updateNumberEmployee,
    fetchIncentivesPerCutOff,
  };
});
