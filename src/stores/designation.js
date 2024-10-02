import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useDesignationStore = defineStore("designations", () => {
  const designation = ref(null);
  const designations = ref([]);

  const createDesignation = async (data) => {
    Loading.show();
    try {
      const response = await api.post("/api/branchEmployee", data);
      if (response && response.data) {
        designations.value.unshift(response.data);
        Notify.create({
          type: "positive",
          message: "Employee created successfully",
          setTimeout: 1000,
          position: "top",
        });
      } else {
        console.error("Unexpected API Response:", response);
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      Notify.create({
        type: "negative",
        message: `Failed to create employeesss`,
        setTimeout: 1000,
      });
    } finally {
      Loading.hide();
    }
  };
  return {
    designation,
    designations,
    createDesignation,
  };
});
