import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useProductionStore = defineStore("productions", () => {
  const productions = ref([]);
  const production = ref([]);
  const productionRows = ref([]);

  const fetchAllProduction = async () => {
    const response = await api.get("/api/branch-production-report");
    productions.value = response.data.reports;
  };

  const fetchBranchProductions = async (
    branchId,
    page,
    rowsPerPage,
    search
  ) => {
    try {
      const response = await api.get(
        `/api/branches/${branchId}/production-report`,
        {
          params: { page: page, per_page: rowsPerPage, search },
        }
      );
      console.log("production for pagination", response.data);
      productions.value = response.data;
      // productionRows.value = response.data.data;
      // return response.data;
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

  const updateBreadPrice = async (id, price, meta) => {
    console.log(
      "Updating bread price with ID:",
      id,
      "New Price:",
      price,
      "Meta:",
      meta
    );

    try {
      const response = await api.put(
        `/api/update-bread-sales-price-report/${id}`,
        {
          price: parseInt(price),
          ...meta,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating bread price:", error);
      throw error;
    }
  };

  const updateBeginnings = async (id, beginnings, meta) => {
    console.log(
      "Updating bread beginnings with ID:",
      id,
      "New Beginnings:",
      beginnings,
      "Meta:",
      meta
    );

    try {
      const response = await api.put(
        `/api/update-bread-sales-beginnings-report/${id}`,
        {
          beginnings: parseInt(beginnings),
          ...meta,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating beginnings: ", error);
      throw error;
    }
  };

  const updateNewProduction = async (id, new_production, meta) => {
    console.log(
      "Updating bread new production with ID:",
      id,
      "New Production:",
      new_production,
      "Meta:",
      meta
    );

    try {
      const response = await api.put(
        `/api/update-bread-sales-newProduction-report/${id}`,
        {
          new_production: parseInt(new_production),
          ...meta,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating new production:", error);
      throw error;
    }
  };

  const updateRemaining = async (id, remaining) => {
    console.log(
      "Updating bread remaining with ID:",
      id,
      "New Remaining:",
      remaining
    );

    try {
      const response = await api.put(
        `/api/update-bread-sales-remaining-report/${id}`,
        {
          remaining: parseInt(remaining),
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error updating remaining:", error);
    }
  };

  const updateBreadOut = async (id, bread_out, meta) => {
    console.log(
      "Updating bread out with ID: ",
      id,
      "New Bread Out:",
      bread_out,
      "Meta:",
      meta
    );

    try {
      const response = await api.put(
        `/api/update-bread-sales-breadOut-report/${id}`,
        {
          bread_out: parseInt(bread_out),
          ...meta,
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error updating bread out:", error);
      throw error;
    }
  };

  return {
    productions,
    production,
    productionRows,
    fetchAllProduction,
    fetchBranchProductions,
    updateBakerReport,
    addBreadProduction,
    addSelectaProduction,
    addSoftdrinksProduction,
    addOtherProductProduction,
    updateBreadPrice,
    updateBeginnings,
    updateNewProduction,
    updateRemaining,
    updateBreadOut,
  };
});
