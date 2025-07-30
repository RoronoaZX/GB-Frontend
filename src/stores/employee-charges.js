import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useEmployeeChargesStore = defineStore("employee-charges", () => {
  const employeeCharge = ref(null);
  const employeeCharges = ref([]);

  const fetchEmployeeCharges = async (data) => {
    console.log("fetch employee charges in store data from datessss", data);
    // {from}/{to}/{employee_id}'
    const response = await api.get(
      `/api/employee-charges/${data.fromDate}/${data.toDate}/${data.employeeID}`
    );
    employeeCharges.value = response.data;
    console.log("employeeCharges", employeeCharges.value);
  };

  return {
    employeeCharge,
    employeeCharges,
    fetchEmployeeCharges,
  };
});
