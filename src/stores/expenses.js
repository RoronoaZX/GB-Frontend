import { defineStore } from "pinia";
import { Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useExpensesStore = defineStore("expenses", () => {
  const expenses = ref([]);
  const expense = ref(null);

  const addingExpense = async (data) => {
    try {
      const response = await api.post("/api/employee-adding-expense", data);
      console.log(response.data);
      Notify.create({
        type: "positive",
        message: "Employee expenses successfully created",
        setTimeout: 1000,
      });
    } catch (error) {
      console.log(error);
      Notify.create({
        type: "negative",
        message: "Error creating employee expenses",
        setTimeout: 1000,
      });
    }
  };

  return {
    expenses,
    expense,
    addingExpense,
  };
});
