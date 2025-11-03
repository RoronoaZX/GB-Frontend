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

  const updateSalary = async (data, val) => {
    console.log("updateAmount store", data, val);
    try {
      const response = await api.put(
        "/api/update-employment-type/salary/" + data.id,
        {
          salary: val,
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    employmentType,
    fetchEmploymentType,
    updateSalary,
  };
});
