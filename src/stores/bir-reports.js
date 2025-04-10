import { defineStore } from "pinia";
import { Loading, Notify, QSpinnerGears } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useBirReportsStore = defineStore("bir-reports", () => {
  const birReport = ref(null);
  const birReports = ref([]);
  const NonVatReports = ref([]);
  const VatReports = ref([]);
  const expensesReport = ref([]);

  const fetchNonVatBirReports = async (branchId, startDate, endDate) => {
    // console.log(`fetchBirReports`, branchId);
    // console.log(`fetchBirReports startDate`, startDate);
    // console.log(`fetchBirReports endDate`, endDate);
    try {
      const response = await api.get(
        `/api/fetch-non-vat-bir-reports/${branchId}`,
        {
          params: { startDate, endDate },
        }
      );
      console.log("birReports", response.data);
      NonVatReports.value = response.data;
    } catch (error) {
      console.error("Error fetching BIR reports:", error);
    }
  };

  const fetchVatBirReports = async (branchId, startDate, endDate) => {
    console.log(`fetchBirReports`, branchId);
    console.log(`fetchBirReports startDate`, startDate);
    console.log(`fetchBirReports endDate`, endDate);

    try {
      const response = await api.get(`/api/fetch-vat-bir-reports/${branchId}`, {
        params: { startDate, endDate },
      });
      console.log("birReports", response.data);
      VatReports.value = response.data;
    } catch (error) {
      console.error("Error fetching BIR reports:", error);
    }
  };

  const fetchExpensesReport = async (branchId, startDate, endDate) => {
    console.log(`fetchBirReports`, branchId);
    console.log(`fetchBirReports startDate`, startDate);
    console.log(`fetchBirReports endDate`, endDate);

    try {
      const response = await api.get(`/api/fetch-expenses-report/${branchId}`, {
        params: { startDate, endDate },
      });
      console.log("birReports", response.data);
      expensesReport.value = response.data;
    } catch (error) {
      console.error("Error fetching BIR reports:", error);
    }
  };

  const fetchBranchData = async (branchId) => {
    console.log(`fetchBranchData`, branchId);
    try {
      const response = await api.get(
        `/api/fetch-branch-data-for-bir-report/${branchId}`
      );
      console.log("branchData", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching branch data:", error);
    }
  };

  const updateReceiptNo = async (data, val) => {
    try {
      Loading.show({
        message: "Updating Receipt No...",
        spinner: QSpinnerGears,
      });
      const response = await api.post(
        `/api/update-receipt-no-for-bir-report/${data.id}`,
        {
          receipt_no: val,
        }
      );
      console.log("updateReceiptNo response", response.data);
      Notify.create({
        type: "positive",
        message: "Receipt No. updated successfully",
        position: "top",
      });
      return response.data;
    } catch (error) {
      console.error("Error updating Receipt No:", error);
      Notify.create({
        type: "negative",
        message: "Error updating Receipt No.",
        position: "top",
      });
    } finally {
      Loading.hide();
    }
  };

  const updateDescription = async (data, val) => {
    console.log("updateDescription", data);
    console.log("updateDescription", val);

    try {
      Loading.show({
        message: "Updating Description...",
        spinner: QSpinnerGears,
      });
      const response = await api.post(
        `/api/update-branch-description-for-bir-report/${data.id}`,
        {
          description: val,
        }
      );
      console.log("updateDescription response", response.data);
      Notify.create({
        type: "positive",
        message: "Description updated successfully",
        position: "top",
      });
      return response.data;
    } catch (error) {
      console.error("Error updating description:", error);
      Notify.create({
        type: "negative",
        message: "Error updating description.",
        position: "top",
      });
    } finally {
      Loading.hide();
    }
  };

  const updateAddress = async (data, val) => {
    console.log("updateAddress", data);
    console.log("updateAddress", val);

    try {
      Loading.show({
        message: "Updating Address...",
        spinner: QSpinnerGears,
      });
      const response = await api.post(
        `/api/update-branch-address-for-bir-report/${data.id}`,
        {
          address: val,
        }
      );
      console.log("updateAddress response", response.data);
      Notify.create({
        type: "positive",
        message: "Address updated successfully",
        position: "top",
      });
      return response.data;
    } catch (error) {
      console.error("Error updating address:", error);
      Notify.create({
        type: "negative",
        message: "Error updating address.",
        position: "top",
      });
    } finally {
      Loading.hide();
    }
  };

  const updateTinNo = async (data, val) => {
    console.log("updateTinNo", data);
    console.log("updateTinNo", val);

    try {
      Loading.show({
        message: "Updating TIN No...",
        spinner: QSpinnerGears,
      });
      const response = await api.post(
        `/api/update-branch-tin-no-for-bir-report/${data.id}`,
        {
          tin_no: val,
        }
      );
      console.log("updateTinNo response", response.data);
      Notify.create({
        type: "positive",
        message: "TIN No. updated successfully",
        position: "top",
      });
      return response.data;
    } catch (error) {
      console.error("Error updating TIN number:", error);
      Notify.create({
        type: "negative",
        message: "Error updating TIN number.",
        position: "top",
      });
    } finally {
      Loading.hide();
    }
  };

  const updateAmount = async (data, val) => {
    console.log("updateAmount", data);
    console.log("updateAmount", val);

    try {
      Loading.show({
        message: "Updating Amount...",
        spinner: QSpinnerGears,
      });
      const response = await api.post(
        `/api/update-branch-amount-for-bir-report/${data.id}`,
        {
          amount: val,
        }
      );
      console.log("updateAmount response", response.data);
      Notify.create({
        type: "positive",
        message: "Amount updated successfully",
        position: "top",
      });
      return response.data;
    } catch (error) {
      console.error("Error updating amount:", error);
      Notify.create({
        type: "negative",
        message: "Error updating amount.",
        position: "top",
      });
    } finally {
      Loading.hide();
    }
  };

  const updateDate = async (data, val) => {
    console.log("updateDate", data);
    console.log("updateDate", val);

    try {
      Loading.show({
        message: "Updating Date...",
        spinner: QSpinnerGears,
      });
      const response = await api.post(
        `/api/update-branch-date-for-bir-report/${data.id}`,
        {
          created_at: val,
        }
      );
      console.log("updateDate response", response.data);
      Notify.create({
        type: "positive",
        message: "Date updated successfully",
        position: "top",
      });
      return response.data;
    } catch (error) {
      console.error("Error updating date:", error);
      Notify.create({
        type: "negative",
        message: "Error updating date.",
        position: "top",
      });
    } finally {
      Loading.hide();
    }
  };

  return {
    birReport,
    birReports,
    NonVatReports,
    VatReports,
    expensesReport,
    fetchNonVatBirReports,
    fetchBranchData,
    fetchVatBirReports,
    fetchExpensesReport,
    updateDescription,
    updateReceiptNo,
    updateAddress,
    updateTinNo,
    updateAmount,
    updateDate,
  };
});
