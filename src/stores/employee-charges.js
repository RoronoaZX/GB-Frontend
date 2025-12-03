import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { computed, ref } from "vue";

export const useEmployeeChargesStore = defineStore("employee-charges", () => {
  const employeeCharge = ref(null);
  const employeeCharges = ref([]);

  const totalCharges = computed(() => {
    return employeeCharges.value.reduce((sum, charge) => {
      return sum + (parseFloat(charge.charges_amount) || 0);
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

  const updateChargeById = async (updatedItem) => {
    try {
      const response = await api.put(
        `/api/employee-charges/${updatedItem.id}`,
        {
          charges_amount: updatedItem.charges_amount,
        }
      );

      console.log("Update response: ", response);

      // Only update the local store if the API call was successful
      if (response.status === 200) {
        const index = employeeCharges.value.findIndex(
          (c) => c.id === updatedItem.id
        );

        if (index !== -1) {
          // Update only charges_amount, keep other porperties intact
          employeeCharges.value[index] = {
            ...employeeCharges.value[index],
            charges_amount: updatedItem.charges_amount,
          };

          // Force reactivity
          employeeCharges.value = [...employeeCharges.value];
        }
      } else {
        console.warn("Failed to update charge on serve:", response);
      }
    } catch (error) {
      console.error("Error updating charge: ", error);
    }

    // const response = await api.put(`/api/employee-charges/${updatedItem.id}`, {
    //   charges_amount: updatedItem.charges_amount,
    // });

    // const index = employeeCharges.value.findIndex(
    //   (c) => c.id === updatedItem.id
    // );

    // if (index !== -1) {
    //   // Only update charges_amount while keeping all other properties intact
    //   employeeCharges.value[index] = {
    //     ...employeeCharges.value[index],
    //     charges_amount: updatedItem.charges_amount,
    //   };

    //   // Force reactivity
    //   employeeCharges.value = [...employeeCharges.value];
    // }

    // console.log("Updated charges: ", employeeCharges.value);
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
    updateChargeById,
    setCharges,
    clearCharges,
  };
});

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
