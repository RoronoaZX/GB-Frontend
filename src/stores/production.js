import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

const ADD_ENDPOINTS = {
  bread: "branch-add-bread-production-report",
  selecta: "branch-add-selecta-production-report",
  softdrinks: "branch-add-softdrinks-production-report",
  other: "branch-add-other-production-report",
};

const UPDATE_ENDPOINTS = {
  bread: {
    price: "update-bread-sales-price-report", // fixed typo: udpate → update
    beginnings: "update-bread-sales-beginnings-report",
    new_production: "update-bread-sales-newProduction-report",
    remaining: "update-bread-sales-remaining-report",
    bread_out: "update-bread-sales-breadOut-report",
  },
  selecta: {
    price: "update-selecta-sales-price-report",
    beginnings: "update-selecta-sales-beginnings-report",
    remaining: "update-selecta-sales-remaining-report",
    out: "update-selecta-sales-selectaOut-report",
    added_stocks: "update-selecta-sales-addedstocks-report",
  },
  softdrinks: {
    price: "update-softdrinks-sales-price-report",
    beginnings: "update-softdrinks-sales-beginnings-report",
    remaining: "update-softdrinks-sales-remaining-report",
    out: "update-softdrinks-sales-out-report",
    added_stocks: "update-softdrinks-sales-addedstocks-report",
  },
  other_product: {
    price: "update-otherProducst-sales-price-report",
    beginnings: "update-otherProducst-sales-beginnings-report",
    remaining: "update-otherProducst-sales-remaining-report",
    out: "update-otherProducst-sales-out-report",
    added_stocks: "update-otherProducst-sales-addedstocks-report",
  },
};

const LABELS = {
  bread: "Bread",
};

const sendRequest = async (
  method,
  url,
  data,
  successMsg = "Success",
  errorMsg = "Failed"
) => {
  Loading.show();
  try {
    const response = await api[method](url, data);

    Notify.create({
      message: successMsg,
      color: "positive",
    });

    return response.data;
  } catch (error) {
    console.log(error);

    Notify.create({
      message: errorMsg,
      coloe: "negative",
    });
    throw error;
  } finally {
    Loading.hide();
  }
};

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

  const addProduction = async (type, data) => {
    const endpoint = ADD_ENDPOINTS[type];

    if (!endpoint) {
      throw new Error(`Invalid production type for add: ${type}`);
    }

    return await sendRequest(
      "post",
      `/api/${endpoint}`,
      data,
      `${type} production added successfully`,
      `Failed to add ${type} production`
    );
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

  const updateSalesField = async (id, value, meta = {}, type, field) => {
    const endpoint = UPDATE_ENDPOINTS[type]?.[field];

    if (!endpoint) {
      Notify.create({
        message: `Cannot update: Invalid type "${type}" or field "${field}"`,
        color: "negative",
        icon: "error",
      });

      return;
    }

    const payload = {
      [field]: parseInt(value) || value,
      ...meta,
    };

    return sendRequest(
      "put",
      `/api/${endpoint}/${id}`,
      payload,
      "Updated successfully",
      "Update failed"
    );
  };

  return {
    productions,
    production,
    productionRows,
    fetchAllProduction,
    fetchBranchProductions,
    updateBakerReport,

    addOtherProductProduction,

    addProduction,

    updateSalesField,
  };
});

// export const useProductionStore = defineStore("productions", () => {
//   const productions = ref([]);
//   const production = ref([]);
//   const productionRows = ref([]);

//   const UPDATE_ENDPOINTS = {
//     bread: {
//       price: "udpate-bread-sales-price-report",
//     }
//   }

//   const LABELS = {
//     bread: "Bread"
//   }

//   const sendRequest = async (method, url, data, successMsg, errorMsg) =>  {
//     Loading.show()
//     try {
//       const response = await api[method](url, data)

//       Notify.cre
//     } catch (error) {

//     }
//   }
//   const fetchAllProduction = async () => {
//     const response = await api.get("/api/branch-production-report");
//     productions.value = response.data.reports;
//   };

//   const fetchBranchProductions = async (
//     branchId,
//     page,
//     rowsPerPage,
//     search
//   ) => {
//     try {
//       const response = await api.get(
//         `/api/branches/${branchId}/production-report`,
//         {
//           params: { page: page, per_page: rowsPerPage, search },
//         }
//       );
//       console.log("production for pagination", response.data);
//       productions.value = response.data;
//       // productionRows.value = response.data.data;
//       // return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateBakerReport = async (id, data) => {
//     console.log("baker reports data in store", data);
//     console.log("baker reports id data in store", id);
//     Loading.show();
//     try {
//       // Make sure the URL matches your Laravel route's endpoint
//       const response = await api.put(
//         `api/update/branch-baker-report/${id}`,
//         data
//       );
//       console.log(response.data); // Log the response if needed
//     } catch (error) {
//       console.error("Error updating baker report:", error);
//     } finally {
//       Loading.hide();
//     }
//   };

//   const addBreadProduction = async (data) => {
//     console.log("Bread Production Data:", data);
//     Loading.show();
//     try {
//       const response = await api.post(
//         "/api/branch-add-bread-production-report",
//         data
//       );
//       console.log(response.data);
//       Notify.create({
//         message: "Bread Production Report Added Successfully",
//         color: "positive",
//       });
//     } catch (error) {
//       console.log(error);
//       Notify.create({
//         message: "Error adding Bread Production Report",
//         color: "negative",
//       });
//     } finally {
//       Loading.hide();
//     }
//   };
//   const addSelectaProduction = async (data) => {
//     console.log("Selecta Production Data:", data);
//     Loading.show();
//     try {
//       const response = await api.post(
//         "/api/branch-add-selecta-production-report",
//         data
//       );
//       console.log(response.data);
//       Notify.create({
//         message: "Bread Production Report Added Successfully",
//         color: "positive",
//       });
//     } catch (error) {
//       console.log(error);
//       Notify.create({
//         message: "Error adding Bread Production Report",
//         color: "negative",
//       });
//     } finally {
//       Loading.hide();
//     }
//   };
//   const addSoftdrinksProduction = async (data) => {
//     console.log("Softdrinks Production Data:", data);
//     Loading.show();
//     try {
//       const response = await api.post(
//         "/api/branch-add-softdrinks-production-report",
//         data
//       );
//       console.log(response.data);
//       Notify.create({
//         message: "Softdrinks Production Report Added Successfully",
//         color: "positive",
//       });
//     } catch (error) {
//       console.log(error);
//       Notify.create({
//         message: "Error adding Bread Production Report",
//         color: "negative",
//       });
//     } finally {
//       Loading.hide();
//     }
//   };
//   const addOtherProductProduction = async (data) => {
//     console.log("Softdrinks Production Data:", data);
//     Loading.show();
//     try {
//       const response = await api.post(
//         "/api/branch-add-other-production-report",
//         data
//       );
//       console.log(response.data);
//       Notify.create({
//         message: "Softdrinks Production Report Added Successfully",
//         color: "positive",
//       });
//     } catch (error) {
//       console.log(error);
//       Notify.create({
//         message: "Error adding Bread Production Report",
//         color: "negative",
//       });
//     } finally {
//       Loading.hide();
//     }
//   };

//   const updateField = (product, id, field, value, meta = {}) => {
//     const endpoints = UPDATE_ENDPOINTS[product]
//     const endpointKey = endpoints[field]

//     if (!endpointKey) {
//       throw new Error(`No endpoint for ${product}.${field}`)
//     }

//     const payload = { [field]: parseInt(value) || value, ...meta}

//     return request("put", `/api/${endpointKey}/${id}`, payload)
//   }

//   const updateBreadPrice = async (id, price, meta) => {
//     console.log(
//       "Updating bread price with ID:",
//       id,
//       "New Price:",
//       price,
//       "Meta:",
//       meta
//     );

//     try {
//       const response = await api.put(
//         `/api/update-bread-sales-price-report/${id}`,
//         {
//           price: parseInt(price),
//           ...meta,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error updating bread price:", error);
//       throw error;
//     }
//   };

//   const updateBreadBeginnings = async (id, beginnings, meta) => {
//     console.log(
//       "Updating bread beginnings with ID:",
//       id,
//       "New Beginnings:",
//       beginnings,
//       "Meta:",
//       meta
//     );

//     try {
//       const response = await api.put(
//         `/api/update-bread-sales-beginnings-report/${id}`,
//         {
//           beginnings: parseInt(beginnings),
//           ...meta,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error updating beginnings: ", error);
//       throw error;
//     }
//   };

//   const updateBreadNewProduction = async (id, new_production, meta) => {
//     console.log(
//       "Updating bread new production with ID:",
//       id,
//       "New Production:",
//       new_production,
//       "Meta:",
//       meta
//     );

//     try {
//       const response = await api.put(
//         `/api/update-bread-sales-newProduction-report/${id}`,
//         {
//           new_production: parseInt(new_production),
//           ...meta,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error updating new production:", error);
//       throw error;
//     }
//   };

//   const updateBreadRemaining = async (id, remaining, meta) => {
//     console.log(
//       "Updating bread remaining with ID:",
//       id,
//       "New Remaining:",
//       remaining
//     );

//     try {
//       const response = await api.put(
//         `/api/update-bread-sales-remaining-report/${id}`,
//         {
//           remaining: parseInt(remaining),
//           ...meta,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.log("Error updating remaining:", error);
//     }
//   };

//   const updateBreadOut = async (id, bread_out, meta) => {
//     console.log(
//       "Updating bread out with ID: ",
//       id,
//       "New Bread Out:",
//       bread_out,
//       "Meta:",
//       meta
//     );

//     try {
//       const response = await api.put(
//         `/api/update-bread-sales-breadOut-report/${id}`,
//         {
//           bread_out: parseInt(bread_out),
//           ...meta,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.log("Error updating bread out:", error);
//       throw error;
//     }
//   };

//   const updateSelectaPrice = async (id, price, meta) => {
//     console.log(
//       "Updating selecta price with ID:",
//       id,
//       "New Price:",
//       price,
//       "Meta:",
//       meta
//     );

//     try {
//       const response = await api.put(
//         `/api/update-selecta-sales-price-report/${id}`,
//         {
//           price: parseInt(price),
//           ...meta,
//         }
//       );

//       return response.data;
//     } catch (error) {
//       console.error("Error updating selecta price:", error);
//     }
//   };

//   const udpateSelectaBeginnings = async (id, beginnings, meta) => {
//     console.log(
//       "updating selecta beginnings with ID:",
//       id,
//       "New Beginnings:",
//       beginnings,
//       "Meta:",
//       meta
//     );

//     try {
//       const response = await api.put(
//         `/api/update-selecta-sales-beginnings-report/${id}`,
//         {
//           beginnings: parseInt(beginnings),
//           ...meta,
//         }
//       );

//       return response.data;
//     } catch (error) {
//       console.error("Error updating selecta beginnings:", error);
//     }
//   };

//   const updateSelectaRemaining = async (id, remaining, meta) => {
//     console.log(
//       "Updating selecta remaining with ID:",
//       id,
//       "New Remaining:",
//       remaining,
//       "Meta:",
//       meta
//     );

//     try {
//       const response = await api.put(
//         `/api/update-selecta-sales-remaining-report/${id}`,
//         {
//           remaining: parseInt(remaining),
//           ...meta,
//         }
//       );

//       return response.data;
//     } catch (error) {
//       console.log("Error updating selecta remaining:", error);
//     }
//   };

//   const updateSelectaOut = async (id, selecta_out, meta) => {
//     console.log(
//       "Updating selecta out with ID:",
//       id,
//       "New Selecta Out:",
//       selecta_out,
//       "Meta:",
//       meta
//     );

//     try {
//       const response = await api.put(
//         `/api/update-selecta-sales-selctaOut-report/${id}`,
//         {
//           out: parseInt(selecta_out),
//           ...meta,
//         }
//       );
//       console.log("response", response.data);

//       return response.data;
//     } catch (error) {
//       console.log("Error updating selecta out:", error);
//     }
//   };

//   const udpateSelectaAddedStocks = async (id, added_stocks, meta) => {
//     console.log(
//       "Updating selecta added stocks with ID:",
//       id,
//       "New Added Stocks:",
//       added_stocks,
//       "Meta:",
//       meta
//     );

//     try {
//       const response = await api.put(
//         `/api/update-selecta-sales-addedstocks-report/${id}`,
//         {
//           added_stocks: parseInt(added_stocks),
//         }
//       );

//       console.log("response", response.data);

//       return response.data;
//     } catch (error) {
//       console.log("Error updating selecta added stocks:", error);
//     }
//   };

//   return {
//     productions,
//     production,
//     productionRows,
//     fetchAllProduction,
//     fetchBranchProductions,
//     updateBakerReport,
//     addBreadProduction,
//     addSelectaProduction,
//     addSoftdrinksProduction,
//     addOtherProductProduction,
//     updateBreadPrice,
//     updateBreadBeginnings,
//     updateBreadNewProduction,
//     updateBreadRemaining,
//     updateBreadOut,
//     updateSelectaPrice,
//     udpateSelectaBeginnings,
//     updateSelectaRemaining,
//     updateSelectaOut,
//     udpateSelectaAddedStocks,
//   };
// });
