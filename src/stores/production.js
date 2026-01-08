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
    price: "update-bread-sales-price-report",
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

// const sendRequest = async (
//   method,
//   url,
//   data,
//   successMsg = "Success",
//   errorMsg = "Failed"
// ) => {
//   Loading.show();
//   try {
//     const payload = {
//       ...data,
//       charges_amount: chargesAmount.value,
//       over_amount: overAmount.value,
//     };

//     const response = await api[method](url, payload);

//     Notify.create({
//       message: successMsg,
//       color: "positive",
//     });

//     return response.data;
//   } catch (error) {
//     console.log(error);

//     Notify.create({
//       message: errorMsg,
//       color: "negative",
//     });
//     throw error;
//   } finally {
//     Loading.hide();
//   }
// };

export const useProductionStore = defineStore("productions", () => {
  const productions = ref([]);
  const production = ref([]);
  const productionRows = ref([]);
  const overAmount = ref(0);
  const chargesAmount = ref(0);

  const setAmounts = (over, charges) => {
    console.log("setAmountsssss", { over, charges });

    overAmount.value = over;
    chargesAmount.value = charges;

    console.log("Updated amounts:", {
      overAmount: overAmount.value,
      chargesAmount: chargesAmount.value,
    });
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
      const payload = {
        ...data,
      };

      console.log("Sending payloadsss:", payload);

      const response = await api[method](url, payload);

      Notify.create({
        message: successMsg,
        color: "positive",
      });

      return response.data;
    } catch (error) {
      console.log(error);

      Notify.create({
        message: errorMsg,
        color: "negative",
      });
      throw error;
    } finally {
      Loading.hide();
    }
  };

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
      console.log("production for paginationsssss", response.data);
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

  const addProduction = async (type, data, date, shiftLabel) => {
    const endpoint = ADD_ENDPOINTS[type];
    if (!endpoint) {
      throw new Error(`Invalid production type for add: ${type}`);
    }

    // 1️⃣ API CALL
    const response = await sendRequest(
      "post",
      `/api/${endpoint}`,
      data,
      `${type} production added successfully`,
      `Failed to add ${type} production`
    );

    const raw = response?.data ?? response;
    if (!raw) return response;

    // 2️⃣ REPORT KEY MAP
    const reportKeyMap = {
      bread: "bread_reports",
      selecta: "selecta_reports",
      softdrinks: "softdrinks_reports",
      other: "other_products_reports",
    };

    const reportKey = reportKeyMap[type];
    if (!reportKey) return response;

    // 3️⃣ EXTRACT SALES REPORT (SHIFT OWNER)
    const salesReport = raw.sales_reports ?? raw.sales_report ?? raw;

    // 4️⃣ EXTRACT PRODUCT-LEVEL ROW
    const productRow =
      salesReport?.[reportKey]?.[0] ?? raw?.[reportKey]?.[0] ?? raw;

    // 5️⃣ ENSURE ROOT STRUCTURE
    if (!productions.value?.data) {
      productions.value = { data: [] };
    }

    const rows = productions.value.data;

    // 6️⃣ FIND / CREATE DATE GROUP
    let dateGroup = rows.find((r) => r.date === date);

    if (!dateGroup) {
      dateGroup = {
        date,
        AM: {},
        PM: {},
      };
      rows.unshift(dateGroup);
    }

    // 7️⃣ FIND / CREATE SHIFT GROUP
    if (!dateGroup[shiftLabel]) {
      dateGroup[shiftLabel] = {
        bread_reports: [],
        selecta_reports: [],
        softdrinks_reports: [],
        other_products_reports: [],
        sales_reports: [],
      };
    }

    const shiftGroup = dateGroup[shiftLabel];

    // 8️⃣ FIND / CREATE SALES REPORT (ONE PER SHIFT)
    let shiftSalesReport = shiftGroup.sales_reports[0];

    if (!shiftSalesReport) {
      shiftSalesReport = {
        id: salesReport.id ?? raw.sales_report_id,
        bread_reports: [],
        selecta_reports: [],
        softdrinks_reports: [],
        other_products_reports: [],
        created_at: salesReport.created_at,
        charges_amount: salesReport.charges_amount,
        over_total: salesReport.over_total,
        products_total_sales: salesReport.products_total_sales,
        user: salesReport.user,
        branch: salesReport.branch,
      };

      shiftGroup.sales_reports.push(shiftSalesReport);
    }

    // 9️⃣ ENSURE ARRAYS EXIST (🔥 CRITICAL FIX)
    if (!Array.isArray(shiftSalesReport[reportKey])) {
      shiftSalesReport[reportKey] = [];
    }

    if (!Array.isArray(shiftGroup[reportKey])) {
      shiftGroup[reportKey] = [];
    }

    // 🔟 INSERT PRODUCT ROW
    shiftSalesReport[reportKey].push(productRow);
    shiftGroup[reportKey].unshift(productRow);

    console.log("✅ Production inserted correctly", {
      date,
      shift: shiftLabel,
      reportKey,
      productRow,
    });

    console.log("Updated productions:", productions.value);

    return response;
  }; // Correct logic  but for bread only

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

  const updateSalesField = async (
    id,
    value,
    meta = {},
    type,
    field,
    over = null,
    charges = null
  ) => {
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
      over_amount: over !== null ? over : overAmount.value,
      charges_amount: charges !== null ? charges : chargesAmount.value,
    };

    console.log("Payload datasssssssss:", payload);

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
    overAmount,
    chargesAmount,
    fetchAllProduction,
    fetchBranchProductions,
    updateBakerReport,

    addOtherProductProduction,

    addProduction,

    updateSalesField,

    setAmounts,
  };
});

// note you need to add a logic here that
// can calculate,
// recalcute the entire sales data to be
// save in the DB and also to change the
// employee charges.
// if the sales report fetch make it
