import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { computed, ref } from "vue";

// export const useEmployeeChargesStore = defineStore("employee-charges", () => {
//   const employeeCharge = ref(null);
//   const employeeCharges = ref([]);

//   const fetchEmployeeCharges = async (data) => {
//     console.log("fetch employee charges in store data from datessss", data);
//     // {from}/{to}/{employee_id}'
//     const response = await api.get(
//       `/api/employee-charges/${data.fromDate}/${data.toDate}/${data.employeeID}`
//     );
//     employeeCharges.value = response.data;
//     console.log("employeeCharges", employeeCharges.value);
//   };

//   return {
//     employeeCharge,
//     employeeCharges,
//     fetchEmployeeCharges,
//   };
// });

export const useEmployeeChargesStore = defineStore("employee-charges", () => {
  const employeeCharge = ref(null);
  const employeeCharges = ref([]);

  const totalCharges = computed(() => {
    return employeeCharges.value.reduce((sum, charge) => {
      return sum + (parseFloat(charge.chrages_amount) || 0);
    }, 0);
  });

  const fetchEmployeeCharges = async (data) => {
    try {
      console.log("Fetching charges for: ", data);
      const response = await api.get(
        `/api/employee-charges/${data.fromDate}/${data.toDate}/${data.employeeID}`
      );
      employeeCharges.value = response.data || [];
      console.log("Charges loaded: ", employeeCharges.value);
    } catch (error) {
      console.error("Error fetching employee charges: ", error);
      employeeCharges.value = [];
    }
  };

  const updateChargeAmount = (index, newAmount) => {
    const num = parseFloat(newAmount);
    if (employeeCharges.value[index] != null && !isNaN(num)) {
      employeeCharges.value[index].charges_amount = num;
      employeeCharges.value = [...employeeCharges.value];
    }
  };

  const setCharges = (charges) => {
    employeeCharges.value = charges || [];
  };

  const clearCharges = () => {
    employeeCharges.value = [];
    employeeCharge.value = null;
  };

  return {
    employeeCharge,
    employeeCharges,

    totalCharges,

    fetchEmployeeCharges,
    updateChargeAmount,
    setCharges,
    clearCharges,
  };
});
