<template>
  <div v-if="creditsReports !== 'No report' && creditsReports.length > 0">
    <!-- Check if creditsReports is "No report" or an empty array -->
    <q-table
      flat
      bordered
      title="Credits"
      :rows="creditsReports"
      :columns="creditProductsColumn"
      row-key="id"
      :loading="creditsReports.length === 0"
      no-data-label="No bread reports available"
      dense
    >
      <template v-slot:body-cell-productName="props">
        <q-td :props="props">
          <span>{{
            `${capitalizeFirstLetter(
              props.row?.product?.name || "Not applicable"
            )}`
          }}</span>
        </q-td>
      </template>

      <template v-slot:body-cell-total_amount="props">
        <q-td :props="props">
          <span>{{ `${formatAmount(props.row.total_amount)}` }}</span>
        </q-td>
      </template>
      <template v-slot:body-cell-view="props">
        <q-td :props="props">
          <ViewCreditsReport
            :creditsReportList="props.row?.credit_products || []"
          />
        </q-td>
      </template>

      <!-- Add a footer row for the overall total sales -->
      <template v-slot:footer>
        <q-tr>
          <q-td colspan="6" class="text-right">Overall Total Sales:</q-td>
          <q-td>{{ formatPrice(overallTotal || 0) }}</q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="row justify-end q-mt-md">
      <div class="text-h6">
        Credits Total: {{ formatPrice(overallTotal || "0") }}
      </div>
    </div>
  </div>
  <!-- If creditsReports is "No report", display the message instead of the table -->
  <div align="center" v-else>
    <p>No Credits reports available.</p>
  </div>
</template>

<script setup>
import ViewCreditsReport from "./ViewCreditsReport.vue";
const props = defineProps(["creditsReports"]);

console.log("creditsReports Data:", props.creditsReports);

const formatPrice = (price) => {
  if (price == null || isNaN(price)) {
    return "No data"; // Return "No data" if the price is null, undefined, or not a number
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Check if creditsReports is an array before using reduce
const overallTotal = Array.isArray(props.creditsReports)
  ? props.creditsReports.reduce((total, report) => {
      const sales = parseFloat(report.total_amount); // Ensure sales is treated as a number
      if (!isNaN(sales)) {
        return total + sales; // Add sales to total if it's a valid number
      }
      return total; // Skip invalid sales values
    }, 0)
  : 0; // Default to 0 if creditsReports is not an array

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`.trim();
};

const formatAmount = (total_amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(total_amount);
};

const creditProductsColumn = [
  {
    name: "name",
    label: "Employee Name",
    field: (row) => formatFullname(row.credit_user_id),
    align: "center",
  },

  {
    name: "total_amount",
    label: "Total Amount",
    field: "total_amount",
    align: "center",
  },
  {
    name: "view",
    label: "View Credits",
    field: "view",
    align: "center",
  },
];
</script>
