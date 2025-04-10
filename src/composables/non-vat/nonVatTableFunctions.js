// src/composables/useNonVatReports.js
import { ref } from "vue";
import { useBirReportsStore } from "src/stores/bir-reports";
import { date as quasarDate } from "quasar";

export function nonVatTableFunctions() {
  const birReportsStore = useBirReportsStore();
  const branchData = ref([]);
  const startDate = ref("");
  const endDate = ref("");

  const fetchBranchData = async (branchId) => {
    try {
      const response = await birReportsStore.fetchBranchData(branchId);
      branchData.value = response;
    } catch (error) {
      console.error("Error fetching branch data:", error);
    }
  };

  const getBirReportMonthly = (formattedDate) => {
    const year = formattedDate.slice(0, 4);
    const month = formattedDate.slice(5, 7);
    const start = `${year}-${month}-01`;
    const lastDay = new Date(year, parseInt(month), 0).getDate();
    const end = `${year}-${month}-${lastDay.toString().padStart(2, "0")}`;
    return { startDate: start, endDate: end };
  };

  const initializeDateRange = () => {
    const formatted = quasarDate.formatDate(new Date(), "YYYY-MM-DD");
    const { startDate: start, endDate: end } = getBirReportMonthly(formatted);
    startDate.value = start;
    endDate.value = end;
  };

  const formatDateToCustomString = (dateString) => {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return " - - - ";
    const options = { month: "short", day: "2-digit", year: "numeric" };
    const formatted = d.toLocaleDateString("en-US", options).replace(",", "");
    const [month, day, year] = formatted.split(" ");
    return `${month}. ${day}, ${year}`;
  };

  const fetchNonVatBirReports = async (branchId) => {
    try {
      await birReportsStore.fetchNonVatBirReports(
        branchId,
        startDate.value,
        endDate.value
      );
    } catch (error) {
      console.error("Error fetching BIR reports:", error);
    }
  };

  const formatDate = (dateString) => {
    return quasarDate.formatDate(dateString, "MMMM D, YYYY");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PHP",
    }).format(price);
  };

  const onPrev = (branchId) => {
    const prev = new Date(startDate.value);
    prev.setDate(prev.getDate() - 15);
    const { startDate: start, endDate: end } = getBirReportMonthly(
      quasarDate.formatDate(prev, "YYYY-MM-DD")
    );
    startDate.value = start;
    endDate.value = end;
    if (branchId) fetchNonVatBirReports(branchId);
  };

  const onCurrent = (branchId) => {
    initializeDateRange();
    if (branchId) fetchNonVatBirReports(branchId);
  };

  const onNext = (branchId) => {
    const next = new Date(endDate.value);
    next.setDate(next.getDate() + 1);
    const { startDate: start, endDate: end } = getBirReportMonthly(
      quasarDate.formatDate(next, "YYYY-MM-DD")
    );
    startDate.value = start;
    endDate.value = end;
    if (branchId) fetchNonVatBirReports(branchId);
  };

  return {
    branchData,
    startDate,
    endDate,
    fetchBranchData,
    initializeDateRange,
    getBirReportMonthly,
    formatDateToCustomString,
    fetchNonVatBirReports,
    formatDate,
    formatPrice,
    onPrev,
    onCurrent,
    onNext,
  };
}
