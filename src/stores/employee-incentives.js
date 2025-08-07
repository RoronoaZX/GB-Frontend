import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useEmployeeIncentivesStore = defineStore(
  "employee-incentives",
  () => {
    const employeeIncentive = ref(null);
    const employeeIncentives = ref([]);

    const fetchEmployeeIncentives = async (from, to, employee_id) => {
      try {
        const response = await api.get(
          `/api/fetch-employee-incentives-per-cut-off/${from}/${to}/${employee_id}`
        );
        console.log("✅ Response:", response.data);
        employeeIncentives.value = response.data;
      } catch (error) {
        console.error("❌ API error:", error);
      }
    };

    return {
      employeeIncentive,
      employeeIncentives,
      fetchEmployeeIncentives,
    };
  }
);
