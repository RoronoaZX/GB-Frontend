import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useDialogPluginComponent } from "quasar";

export const useSalesChargesPerCutOffStore = defineStore("sale-credit", () => {
  const salesChargesPerCutOff = ref(null);
  const salesChargesPerCutOffs = ref([]);

  const fetchSalesChargesPerCutOff = async (from, to, employee_id) => {
    console.log(
      "sales charges FROM: ",
      from,
      "sales charges TO: ",
      to,
      "sales charges EMPLOYEE_ID: ",
      employee_id
    );

    try {
      const response = await api.get(
        `api/fetch-employee-charges-per-cut-off/${from}/${to}/${employee_id}`
      );

      console.log("sales chargessss", response.data);
      salesChargesPerCutOffs.value = response.data.sales_charge;
    } catch (error) {
      console.log("erroooor", error);
    }
  };

  const updateChargeById = async (updatedItem) => {
    console.log("updatedItem", updatedItem);
    try {
      const response = await api.put(
        `/api/update-employee-charges/${updatedItem.id}`,
        {
          charge_amount: updatedItem.charge_amount,
        }
      );
      console.log("Update response", response);

      // Only update the local store if the API call was successfully
      if (response.status === 200) {
        const index = salesChargesPerCutOffs.value.findIndex(
          (c) => c.id === updatedItem.id
        );

        if (index !== -1) {
          // Update only charge_amount, keep other properties intact
          salesChargesPerCutOffs.value[index] = {
            ...salesChargesPerCutOffs.value[index],
            charge_amount: updatedItem.charge_amount,
          };

          // Force reactivity
          salesChargesPerCutOffs.value = [...salesChargesPerCutOffs.value];
        }
      } else {
        console.warn("Failed to update charge on serve:", response);
      }
    } catch (error) {
      console.log("Error updating charge", error);
    }
  };

  return {
    salesChargesPerCutOff,
    salesChargesPerCutOffs,
    fetchSalesChargesPerCutOff,
    updateChargeById,
  };
});
