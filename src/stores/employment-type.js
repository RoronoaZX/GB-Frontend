import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useEmploymentTypeStore = defineStore("employmentType", () => {
  const employmentType = ref(null);

  const fetchEmploymentType = async () => {
    const response = await api.get("/api/employment-types");
    employmentType.value = response.data;

    console.log("Employementresponse", response.data);
  };

  return {
    employmentType,
    fetchEmploymentType,
  };
});
