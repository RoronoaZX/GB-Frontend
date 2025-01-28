import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useProductionStore = defineStore("productions", () => {
  const productions = ref([]);
  const production = ref([]);

  const fetchAllProduction = async () => {
    const response = await api.get("/api/branch-production-report");
    productions.value = response.data.reports;
  };

  const fetchBranchProductions = async (branchId) => {
    try {
      const response = await api.get(
        `/api/branches/${branchId}/production-report`
      );
      productions.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateBakerReport = async (id, data) => {
    console.log("baker reports data in store", data);
    console.log("baker reports id data in store", id);
    Loading.show();
    try {
      // Make sure the URL matches your Laravel route's endpoint
      const response = await api.put(
        `api/update/branch-baker-report/${id}`,
        data
      );
      console.log(response.data); // Log the response if needed
    } catch (error) {
      console.error("Error updating baker report:", error);
    } finally {
      Loading.hide();
    }
  };

  const addBreadProduction = async (data) => {
    console.log("Bread Production Data:", data);
    Loading.show();
    try {
      const response = await api.post(
        "/api/branch-add-bread-production-report",
        data
      );
      console.log(response.data);
      Notify.create({
        message: "Bread Production Report Added Successfully",
        color: "positive",
      });
    } catch (error) {
      console.log(error);
      Notify.create({
        message: "Error adding Bread Production Report",
        color: "negative",
      });
    } finally {
      Loading.hide();
    }
  };
  const addSelectaProduction = async (data) => {
    console.log("Selecta Production Data:", data);
    Loading.show();
    try {
      const response = await api.post(
        "/api/branch-add-selecta-production-report",
        data
      );
      console.log(response.data);
      Notify.create({
        message: "Bread Production Report Added Successfully",
        color: "positive",
      });
    } catch (error) {
      console.log(error);
      Notify.create({
        message: "Error adding Bread Production Report",
        color: "negative",
      });
    } finally {
      Loading.hide();
    }
  };
  const addSoftdrinksProduction = async (data) => {
    console.log("Softdrinks Production Data:", data);
    Loading.show();
    try {
      const response = await api.post(
        "/api/branch-add-softdrinks-production-report",
        data
      );
      console.log(response.data);
      Notify.create({
        message: "Softdrinks Production Report Added Successfully",
        color: "positive",
      });
    } catch (error) {
      console.log(error);
      Notify.create({
        message: "Error adding Bread Production Report",
        color: "negative",
      });
    } finally {
      Loading.hide();
    }
  };
  const addOtherProductProduction = async (data) => {
    console.log("Softdrinks Production Data:", data);
    Loading.show();
    try {
      const response = await api.post(
        "/api/branch-add-other-production-report",
        data
      );
      console.log(response.data);
      Notify.create({
        message: "Softdrinks Production Report Added Successfully",
        color: "positive",
      });
    } catch (error) {
      console.log(error);
      Notify.create({
        message: "Error adding Bread Production Report",
        color: "negative",
      });
    } finally {
      Loading.hide();
    }
  };

  // const updateBreadPrice = async () => {

  // }

  return {
    productions,
    production,
    fetchAllProduction,
    fetchBranchProductions,
    updateBakerReport,
    addBreadProduction,
    addSelectaProduction,
    addSoftdrinksProduction,
    addOtherProductProduction,
  };
});
