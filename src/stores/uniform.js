import { defineStore } from "pinia";
import { ref } from "vue";
import { Notify } from "quasar";
import { api } from "src/boot/axios";

export const useUniformStore = defineStore("uniform", () => {
  const uniform = ref(null);
  const uniforms = ref({
    data: [],
    total: 0,
    per_page: 7,
    current_page: 1,
    last_page: 1,
  });

  const fetchUniform = async (page, rowsPerPage, search) => {
    try {
      const response = await api.get("/api/uniform", {
        params: {
          page,
          per_page: rowsPerPage,
          search,
        },
      });
      uniforms.value = response.data;
    } catch (error) {
      console.log("error fetching uniform", error);
    }
  };

  const searchUniform = async (keyword) => {
    try {
      console.log("Searching with keyword:", keyword);
      const response = await api.post(`/api/search-uniform?keyword=${keyword}`);
      console.log("UNIFORm response:", response);
      uniforms.value = response.data;
    } catch (error) {
      console.error("Error searching employee:", error);
    }
  };

  const createUniforms = async (data) => {
    try {
      const response = await api.post("/api/uniform", data);

      Notify.create({
        type: "positive",
        message: "Uniform successfully created",
        timeout: 1000,
      });

      return response.data;
    } catch (error) {
      console.log(error);

      Notify.create({
        type: "negative",
        message: errorMessage,
        timeout: 1000,
      });
    }
  };

  const updateUnifrom = (form) => {
    console.log("Updating uniform with data:", form);
    const payload = {
      employee_id: form.employee.id,
      numberOfPayments: parseInt(form.number_of_payments),
      totalAmount: parseInt(form.total_amount),
      paymentPerPayroll: parseInt(form.payments_per_payroll),
      tShirtPcs: form.t_shirt?.[0]?.pcs || null,
      tShirtPrice: form.t_shirt?.[0]?.price || null,
      tShirtsize: form.t_shirt?.[0]?.size || null,
      pantsPcs: form.pants?.[0]?.pcs || null,
      pantsPrice: form.pants?.[0]?.price || null,
      pantsSize: form.pants?.[0]?.size || null,
    };
    console.log("Payload for update:", payload);
    try {
      const response = api.put(`/api/update/uniform/${form.id}`, payload);
      // console.log("Update response:", response);
      return response.data;
    } catch (error) {
      console.error("Error updating uniform:", error);
    }
  };

  return {
    uniform,
    uniforms,
    fetchUniform,
    createUniforms,
    searchUniform,
    updateUnifrom,
  };
});
