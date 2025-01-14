<template>
  <div v-if="expensesReports !== 'No report' && expensesReports.length > 0">
    <q-table
      flat
      bordered
      title="Expenses"
      :rows="expensesReports"
      :columns="expensesReportColumn"
      row-key="id"
      :loading="expensesReports.length === 0"
      no-data-label="No bread reports available"
      dense
    >
    </q-table>

    <div class="row justify-end q-mt-md">
      <div class="text-h6">
        Expenses Total: {{ formatPrice(overallTotal || "0") }}
      </div>
    </div>
  </div>
  <div align="center" v-else>No Expenses report available</div>
</template>

<script setup>
const props = defineProps(["expensesReports"]);
console.log("expensesReports", props.expensesReports);

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

// Check if creditsReports is an array before using reduce
const overallTotal = Array.isArray(props.expensesReports)
  ? props.expensesReports.reduce((total, report) => {
      const sales = parseFloat(report.amount); // Ensure sales is treated as a number
      if (!isNaN(sales)) {
        return total + sales; // Add sales to total if it's a valid number
      }
      return total; // Skip invalid sales values
    }, 0)
  : 0; // Default to 0 if creditsReports is not an array

const expensesReportColumn = [
  {
    name: "name",
    label: "Expenses Name",
    field: (row) => {
      console.log("Row data:", row); // Debug each row's data
      return row.name || "N/A"; // Adjust this according to your data
    },
    align: "center",
  },
  {
    name: "description",
    label: "Description",
    field: "description",
    align: "center",
  },
  {
    name: "amount",
    label: "Amount",
    field: "amount",
    align: "center",
    format: (val) => formatPrice(val),
  },
];
</script>

<style lang="scss" scoped></style>
