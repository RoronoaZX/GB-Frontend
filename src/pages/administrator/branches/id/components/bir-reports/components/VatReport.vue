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
    <div class="row q-gutter-x-md">
      <AddVatReport />
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
      :columns="tableColumns"
      :rows="birReports"
      row-key="name"
      v-model:pagination="tablePagination"
      :rows-per-page-options="[0]"
      separator="cell"
      hide-bottom
    >
      <template v-slot:body-cell-created_at="props">
        <q-td :props="props" align="center">
          <div>
            <span>{{ formatDate(props.row.created_at) }}</span>
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Date
            </q-tooltip>
          </div>
          <q-popup-edit
            v-model="props.row.created_at"
            @update:model-value="
              (val) => {
                props.row.created_at = val; // update local data
                updateDate(props.row, val); // update backend
              }
            "
            :model-value="formatDateInput(props.row.created_at)"
            buttons
            title="Edit Date"
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              dense
              autofocus
              type="date"
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-receipt_no="props">
        <q-td :props="props" align="center">
          <div>
            <span>{{ props.row.receipt_no }}</span>
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Receipt No.
            </q-tooltip>
          </div>
          <q-popup-edit
            v-model="props.row.receipt_no"
            @update:model-value="(val) => updateReceiptNo(props.row, val)"
            buttons
            title="Edit Receipt No."
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              dense
              autofocus
              counter
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-description="props">
        <q-td :props="props" align="center">
          <div>
            <span>{{ props.row.description.toUpperCase() }}</span>
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Description
            </q-tooltip>
          </div>
          <q-popup-edit
            v-model="props.row.description"
            @update:model-value="(val) => updateDescription(props.row, val)"
            buttons
            title="Edit Description"
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              dense
              autofocus
              counter
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-address="props">
        <q-td :props="props" align="center">
          <div>
            <span>{{ props.row.address.toUpperCase() }}</span>
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Address
            </q-tooltip>
          </div>
          <q-popup-edit
            v-model="props.row.address"
            @update:model-value="(val) => updateAddress(props.row, val)"
            auto-save
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              dense
              autofocus
              counter
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-tin_no="props">
        <q-td :props="props" align="center">
          <div>
            <span>{{ props.row.tin_no }}</span>
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit TIN No.
            </q-tooltip>
          </div>
          <q-popup-edit
            v-model="props.row.tin_no"
            @update:model-value="(val) => updateTinNo(props.row, val)"
            auto-save
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              dense
              autofocus
              counter
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-amount="props">
        <q-td :props="props" align="center">
          <div>
            <span>{{ formatPrice(props.row.amount) }}</span>
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Gross
            </q-tooltip>
          </div>
          <q-popup-edit
            v-model="props.row.amount"
            @update:model-value="(val) => updateAmount(props.row, val)"
            auto-save
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              dense
              autofocus
              counter
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
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
import AddVatReport from "./AddVATReport.vue";
import {
  updateReceiptNo,
  updateDescription,
  updateAddress,
  updateTinNo,
  updateAmount,
  updateDate,
} from "src/composables/non-vat/nonVatTableAPiRequest";
import { useBirReportTableColumns } from "src/composables/non-vat/nonVatTableColumns";

const birReportsStore = useBirReportsStore();
const birReports = computed(() => birReportsStore.VatReports);
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
const { columns: tableColumns, pagination: tablePagination } =
  useBirReportTableColumns();
const formatDateInput = (val) => {
  return date.formatDate(val, "YYYY-MM-DD"); // for <input type="date">
};

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

const fetchVatBirReports = async (branchId) => {
  console.log("branchId", branchId);
  console.log("startDate", startDate.value);
  console.log("endDate", endDate.value);

  try {
    // if (branchId)
    await birReportsStore.fetchVatBirReports(
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
    fetchVatBirReports(branchId);
  }
};

// "Current" Button Action: Reset to the current 15-day period
const onCurrent = () => {
  initializeDateRange();
  if (branchId) {
    fetchVatBirReports(branchId);
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
    fetchVatBirReports(branchId);
  }
};

// Initialize the date range when the component loads
initializeDateRange();

onMounted(() => {
  initializeDateRange(); // ensure date is always the current month
  if (branchId) {
    fetchVatBirReports(branchId); // fetch the current month data
  }
});
// const branchBirReports = [
//   {
//     name: "date",
//     label: "Date",
//     align: "center",
//     field: (row) => row.created_at,
//     format: formatDate,
//   },
//   {
//     name: "receipt_no",
//     label: "Receipt No.",
//     align: "center",
//     field: (row) => row.receipt_no,
//   },
//   {
//     name: "description",
//     label: "Description",
//     align: "center",
//     field: (row) => row.description,
//     format: (val) => val.toUpperCase(),
//   },
//   {
//     name: "address",
//     label: "Address",
//     align: "center",
//     field: (row) => row.address,
//     format: (val) => val.toUpperCase(),
//   },
//   {
//     name: "tin_no",
//     label: "TIN No.",
//     align: "center",
//     field: (row) => row.tin_no,
//   },
//   {
//     name: "amount",
//     label: "Gross",
//     align: "center",
//     field: (row) => formatPrice(row.amount),
//   },
//   {
//     name: "purchase",
//     label: "Purchase",
//     align: "center",
//     field: (row) => formatPrice((row.amount / 1.12).toFixed(2)),
//   },
//   {
//     name: "input_tax",
//     label: "Input Tax",
//     align: "center",
//     field: (row) => formatPrice(((row.amount / 1.12) * 0.12).toFixed(2)),
//   },
//   // format: (val) => `$${val.toFixed(2)}`,
// ];
const getMonthAndYear = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date"; // Check if the date is valid

  // Get the month and year in the format 'Month Year'
  const options = { month: "long", year: "numeric" };
  return date.toLocaleDateString("en-US", options); // e.g., "April 2025"
};

// Usage
const monthAndYear = computed(() => getMonthAndYear(startDate.value));

const downloadExcel = () => {
  const workbook = XLSX.utils.book_new();

  // Define styles
  const boldCenterStyle = {
    font: { bold: true },
    alignment: { horizontal: "center" },
  };
  const centerAlignStyle = { alignment: { horizontal: "center" } };

  // Sheet data
  const sheetData = [
    [{ v: branchData.value[0].name, s: boldCenterStyle }], // Bold Center
    [{ v: branchData.value[0].location, s: centerAlignStyle }],
    [""], // Empty row
    [{ v: branchData.value.reportType, s: boldCenterStyle }],
    [
      {
        v: `AS FOR THE MONTH OF: ${monthAndYear.value}`,
        s: boldCenterStyle,
      },
    ],
    [""], // Empty row
    [
      { v: "DATE", s: boldCenterStyle },
      { v: "RECEIPT NO.", s: boldCenterStyle },
      { v: "DESCRIPTION", s: boldCenterStyle },
      { v: "ADDRESS", s: boldCenterStyle },
      { v: "TIN NUMBER", s: boldCenterStyle },
      { v: "GROSS", s: boldCenterStyle },
      { v: "PURCHASE", s: boldCenterStyle },
      { v: "INPUT TAX", s: boldCenterStyle },
    ],
  ];

  // Append data dynamically
  birReports.value.forEach((row) => {
    sheetData.push([
      { v: formatDate(row.created_at), s: centerAlignStyle },
      { v: row.receipt_no, s: centerAlignStyle },
      { v: row.description.toUpperCase() },
      { v: row.address.toUpperCase() },
      { v: row.tin_no, s: centerAlignStyle },
      { v: row.amount, s: centerAlignStyle },
      { v: (row.amount / 1.12).toFixed(2), s: centerAlignStyle },
      { v: ((row.amount / 1.12) * 0.12).toFixed(2), s: centerAlignStyle },
    ]);
  });

  // Create worksheet with styles
  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

  // Set column widths
  worksheet["!cols"] = [
    { wch: 12 }, // DATE
    { wch: 12 }, // RECEIPT NO.
    { wch: 30 }, // DESCRIPTION
    { wch: 35 }, // ADDRESS
    { wch: 18 }, // TIN NUMBER
    { wch: 12 }, // GROSS
    { wch: 12 }, // PURCHASE
    { wch: 12 }, // INPUT TAX
  ];

  // Apply styles
  Object.keys(worksheet).forEach((cell) => {
    if (worksheet[cell].s) {
      worksheet[cell].s = worksheet[cell].s;
    }
  });

  // Append worksheet & export
  XLSX.utils.book_append_sheet(workbook, worksheet, "VAT BIR Report");
  XLSX.writeFile(workbook, `VAT_BIR_Report_${monthAndYear.value}.xlsx`);
};
</script>

<style lang="scss" scoped>
.gradient-btn {
  background: linear-gradient(45deg, #037f60, #08c388);
  // background: linear-gradient(45deg, #103432, #2575fc);
  border: none;
}
</style>
