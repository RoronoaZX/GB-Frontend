<template>
  <div class="row justify-between q-ma-sm">
    <div>From: {{ formatDateToCustomString(startDate) }}</div>
    <div>To: {{ formatDateToCustomString(endDate) }}</div>
  </div>
  <div class="row justify-between q-mt-md q-mb-sm">
    <div>
      <div class="row">
        <q-btn
          padding="sm md"
          size="sm"
          dense
          flat
          label="prev"
          icon="arrow_back_ios_new"
          @click="onPrev"
        />
        <!-- @click="onPrev" -->
        <q-separator vertical />
        <q-btn padding="sm md" size="sm" dense flat @click="onCurrent">
          <!-- @click="onCurrent" -->
          CURRENT
        </q-btn>
        <q-separator vertical />
        <q-btn
          padding="sm md"
          size="sm"
          dense
          flat
          label="next"
          icon="arrow_forward_ios"
          @click="onNext"
        />
        <!-- @click="onNext" -->
      </div>
    </div>
    <div>
      <!-- <q-btn
        padding="sm md"
        size="sm"
        icon="print"
        dense
        label="PRINT"
        class="gradient-btn text-white"
        @click="generatePDF"
      /> -->
      <q-btn
        padding="sm md"
        size="sm"
        icon="download"
        dense
        label="EXCEL"
        class="gradient-btn text-white q-ml-sm"
        @click="downloadExcel"
      />
      <!-- @click="openDialog" -->
    </div>
  </div>
  <div>
    <q-table
      class="table-container sticky-header"
      :columns="branchBirReports"
      :rows="birReports"
      row-key="name"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      separator="cell"
      hide-bottom
    >
    </q-table>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useBirReportsStore } from "src/stores/bir-reports";
import { useRoute } from "vue-router";
import { date as quasarDate } from "quasar";
import { date } from "quasar";
import * as XLSX from "xlsx";

const birReportsStore = useBirReportsStore();
const birReports = computed(() => birReportsStore.expensesReport);
const route = useRoute();
const branchId = route.params.branch_id;
console.log("branchId", branchId);
const branchData = ref([]);
console.log("branchData", branchData.value);
const startDate = ref("");
const endDate = ref("");
const pagination = ref({
  rowsPerPage: 0,
});

const fetchBranchData = async (branchId) => {
  try {
    const response = await birReportsStore.fetchBranchData(branchId);
    branchData.value = response;
    console.log("branchData", branchData.value);
  } catch (error) {
    console.error("Error fetching branch data:", error);
  }
};

onMounted(() => {
  if (branchId) {
    fetchBranchData(branchId);
  }
});

// Function to initialize the current 15-day range
const initializeDateRange = () => {
  const formattedDate = date.formatDate(new Date(), "YYYY-MM-DD");
  const { startDate: newStartDate, endDate: newEndDate } =
    getBirReportMonthly(formattedDate);
  startDate.value = newStartDate;
  endDate.value = newEndDate;

  // Get the current month text for the report
  // const monthText = getMonthText(formattedDate);
  // console.log(monthText);
};

const getBirReportMonthly = (formattedDate) => {
  if (!formattedDate) {
    console.error("Invalid formatted date:", formattedDate);
    return { startDate: null, endDate: null };
  }

  const year = formattedDate.slice(0, 4);
  const month = formattedDate.slice(5, 7);

  const startDate = `${year}-${month}-01`;

  // Get last day of the month
  const lastDay = new Date(year, parseInt(month), 0).getDate(); // `0` gets the last day of the previous month
  const endDate = `${year}-${month}-${lastDay.toString().padStart(2, "0")}`;

  console.log("Start of Month:", startDate);
  console.log("End of Month:", endDate);

  return { startDate, endDate };
};

const formatDateToCustomString = (dateString) => {
  const date = new Date(dateString); // Convert the date string to a Date object
  if (isNaN(date.getTime())) return " - - - "; // Check if the date is valid

  // Get the month as a short name
  const options = { month: "short", day: "2-digit", year: "numeric" };
  const formattedDate = date
    .toLocaleDateString("en-US", options)
    .replace(",", "");

  // Replace the month with the desired format
  const [month, day, year] = formattedDate.split(" ");
  return `${month}. ${day}, ${year}`; // Reformat to the desired output
};

const formattedStart = formatDateToCustomString(startDate.value);
console.log("formattedStart", formattedStart);

const fetchExpensesReport = async (branchId) => {
  console.log("branchId", branchId);
  console.log("startDate", startDate.value);
  console.log("endDate", endDate.value);

  try {
    // if (branchId)
    await birReportsStore.fetchExpensesReport(
      branchId,
      startDate.value,
      endDate.value
    );
  } catch (error) {
    console.error("Error fetching BIR reports:", error);
  }
};

// onMounted(() => {
//   if (branchId) {
//     fetchExpensesReport(branchId);
//   }
// });

const formatDate = (dateString) => {
  return quasarDate.formatDate(dateString, "MMMM D, YYYY");
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

// "Prev" Button Action: Move to the previous 15-day range
const onPrev = () => {
  const prevDate = new Date(startDate.value);
  prevDate.setDate(prevDate.getDate() - 15); // Shift by 15 days back
  const { startDate: newStartDate, endDate: newEndDate } = getBirReportMonthly(
    date.formatDate(prevDate, "YYYY-MM-DD")
  );
  startDate.value = newStartDate;
  endDate.value = newEndDate;

  if (branchId) {
    fetchExpensesReport(branchId);
  }
};

// "Current" Button Action: Reset to the current 15-day period
const onCurrent = () => {
  initializeDateRange();
  if (branchId) {
    fetchExpensesReport(branchId);
  }
};

// "Next" Button Action: Move to the next 15-day range
const onNext = () => {
  const nextDate = new Date(endDate.value);
  nextDate.setDate(nextDate.getDate() + 1); // Shift to the start of the next period
  const { startDate: newStartDate, endDate: newEndDate } = getBirReportMonthly(
    date.formatDate(nextDate, "YYYY-MM-DD")
  );
  startDate.value = newStartDate;
  endDate.value = newEndDate;
  if (branchId) {
    fetchExpensesReport(branchId);
  }
};

// Initialize the date range when the component loads
initializeDateRange();

onMounted(() => {
  initializeDateRange(); // ensure date is always the current month
  if (branchId) {
    fetchExpensesReport(branchId); // fetch the current month data
  }
});

const branchBirReports = [
  {
    name: "date",
    label: "Date",
    align: "center",
    field: (row) => row.created_at,
    format: formatDate,
  },
  {
    name: "description",
    label: "Description",
    align: "center",
    field: (row) => row.description,
  },
  {
    name: "amount",
    label: "Gross",
    align: "center",
    field: (row) => formatPrice(row.amount),
  },
];

const getMonthAndYear = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date"; // Check if the date is valid

  // Get the month and year in the format 'Month Year'
  const options = { month: "long", year: "numeric" };
  return date.toLocaleDateString("en-US", options); // e.g., "April 2025"
};

// Usage
const monthAndYear = computed(() => getMonthAndYear(startDate.value));

// const downloadExcel = () => {
//   const workbook = XLSX.utils.book_new();

//   // Define styles
//   const boldCenterStyle = {
//     font: { bold: true },
//     alignment: { horizontal: "center" },
//   };
//   const centerAlignStyle = { alignment: { horizontal: "center" } };

//   // Sheet data
//   const sheetData = [
//     [{ v: branchData.value[0].name, s: boldCenterStyle }], // Bold Center
//     [{ v: branchData.value[0].location, s: centerAlignStyle }],
//     [""], // Empty row
//     [{ v: branchData.value.reportType, s: boldCenterStyle }],
//     [
//       {
//         v: `AS FOR THE MONTH OF: ${monthAndYear.value}`,
//         s: boldCenterStyle,
//       },
//     ],
//     [""], // Empty row
//     [
//       { v: "DATE", s: boldCenterStyle },

//       { v: "DESCRIPTION", s: boldCenterStyle },
//       { v: "GROSS", s: boldCenterStyle },
//       ,
//     ],
//   ];

//   // Append data dynamically
//   birReports.value.forEach((row) => {
//     sheetData.push([
//       { v: formatDate(row.created_at), s: centerAlignStyle },
//       { v: row.description.toUpperCase() },
//       { v: row.amount, s: centerAlignStyle },
//       // { v: row.receipt_no, s: centerAlignStyle },
//       // { v: row.address.toUpperCase() },
//       // { v: row.tin_no, s: centerAlignStyle },
//       // { v: (row.amount / 1.12).toFixed(2), s: centerAlignStyle },
//       // { v: ((row.amount / 1.12) * 0.12).toFixed(2), s: centerAlignStyle },
//     ]);
//   });

//   // Create worksheet with styles
//   const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

//   // Set column widths
//   worksheet["!cols"] = [
//     { wch: 12 }, // DATE
//     { wch: 30 }, // DESCRIPTION
//     { wch: 12 }, // GROSS
//     // { wch: 12 }, // RECEIPT NO.
//     // { wch: 35 }, // ADDRESS
//     // { wch: 18 }, // TIN NUMBER
//     // { wch: 12 }, // PURCHASE
//     // { wch: 12 }, // INPUT TAX
//   ];

//   // Apply styles
//   Object.keys(worksheet).forEach((cell) => {
//     if (worksheet[cell].s) {
//       worksheet[cell].s = worksheet[cell].s;
//     }
//   });

//   // Append worksheet & export
//   XLSX.utils.book_append_sheet(workbook, worksheet, "BIR Report");
//   XLSX.writeFile(workbook, `EXPENSES_BIR_Report_${monthAndYear.value}.xlsx`);
// };

const downloadExcel = () => {
  const workbook = XLSX.utils.book_new();

  // Define styles
  const boldCenterStyle = {
    font: { bold: true },
    alignment: { horizontal: "center", vertical: "center" },
  };
  const centerAlignStyle = {
    alignment: { horizontal: "center", vertical: "center" },
  };

  const headerStyle = {
    font: { bold: true },
    alignment: { horizontal: "center", vertical: "center" },
    border: {
      top: { style: "thin", color: { rgb: "000000" } },
      bottom: { style: "thin", color: { rgb: "000000" } },
      left: { style: "thin", color: { rgb: "000000" } },
      right: { style: "thin", color: { rgb: "000000" } },
    },
    fill: {
      fgColor: { rgb: "D9D9D9" }, // Light gray background
    },
  };

  // Sheet data
  const sheetData = [
    [{ v: branchData.value[0].name, s: boldCenterStyle }],
    [{ v: branchData.value[0].location, s: centerAlignStyle }],
    [""],
    [{ v: branchData.value.reportType, s: boldCenterStyle }],
    [{ v: `AS FOR THE MONTH OF: ${monthAndYear.value}`, s: boldCenterStyle }],
    [""],
    [
      { v: "DATE", s: headerStyle },
      { v: "DESCRIPTION", s: headerStyle },
      { v: "GROSS", s: headerStyle },
    ],
  ];

  // Append report data
  birReports.value.forEach((row) => {
    sheetData.push([
      { v: formatDate(row.created_at), s: centerAlignStyle },
      { v: row.description.toUpperCase(), s: centerAlignStyle },
      { v: row.amount, s: centerAlignStyle },
    ]);
  });

  // Create worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

  // Column widths
  worksheet["!cols"] = [{ wch: 15 }, { wch: 40 }, { wch: 15 }];

  // Merge header cells (A1:C1, A2:C2, A4:C4, A5:C5)
  worksheet["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }, // Merge A1:C1
    { s: { r: 1, c: 0 }, e: { r: 1, c: 2 } }, // Merge A2:C2
    { s: { r: 3, c: 0 }, e: { r: 3, c: 2 } }, // Merge A4:C4
    { s: { r: 4, c: 0 }, e: { r: 4, c: 2 } }, // Merge A5:C5
  ];

  // Append and download
  XLSX.utils.book_append_sheet(workbook, worksheet, "BIR Report");
  XLSX.writeFile(workbook, `EXPENSES_BIR_Report_${monthAndYear.value}.xlsx`);
};
</script>
<style lang="scss" scoped>
.gradient-btn {
  background: linear-gradient(45deg, #037f60, #08c388);
  // background: linear-gradient(45deg, #103432, #2575fc);
  border: none;
}
</style>
