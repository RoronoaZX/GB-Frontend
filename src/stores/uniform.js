import { defineStore } from "pinia";
import { ref } from "vue";
import { Notify } from "quasar";
import { api } from "src/boot/axios";

export const useUniformStore = defineStore("uniform", () => {
  const uniform = ref(null);
  const uniforms = ref([]);

  const fetchUniform = async () => {
    try {
      const response = await api.get("/api/uniform");
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
      uniforms.value.unshift(response.data);
      Notify.create({
        type: "positive",
        message: "Allowance successfully created",
        // position: "top",
        timeout: 1000,
      });
    } catch (error) {
      console.log(error);
      let errorMessage = "An error occurred. Please try again.";
      if (error.response && error.response.status === 409) {
        errorMessage = "Allowance for this employee already exists.";
      } else if (error.response && error.response.status === 422) {
        errorMessage = "Invalid data. Please check the inputs.";
      }

      Notify.create({
        type: "negative",
        message: errorMessage,
        // position: "top",
        timeout: 1000,
      });
    }
  };

  return {
    uniform,
    uniforms,
    fetchUniform,
    createUniforms,
    searchUniform,
  };
});
