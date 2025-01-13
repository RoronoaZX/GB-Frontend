<template>
  <div>
    <!-- Check if creditsReports is "No report" or an empty array -->
    <q-table
      v-if="creditsReports !== 'No report' && creditsReports.length > 0"
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
      <template v-slot:body-cell-price="props">
        <q-td :props="props">
          <span>{{ `${formatPrice(props.row.price)}` }}</span>
        </q-td>
      </template>
      <template v-slot:body-cell-total_amount="props">
        <q-td :props="props">
          <span>{{ `${formatAmount(props.row.total_amount)}` }}</span>
        </q-td>
      </template>

      <!-- Add a footer row for the overall total sales -->
      <!-- <template v-slot:footer>
        <q-tr>
          <q-td colspan="6" class="text-right">Overall Total Sales:</q-td>
          <q-td>{{ formatPrice(overallTotal || 0) }}</q-td>
        </q-tr>
      </template> -->
    </q-table>

    <!-- If creditsReports is "No report", display the message instead of the table -->
    <div v-else>
      <p>No Credits reports available.</p>
    </div>
  </div>
  <div class="row justify-end q-mt-md">
    <div class="text-h6">
      Credits Total Sales: {{ formatPrice(overallTotal || "0") }}
    </div>
  </div>
  <!-- {{ creditsReports }} -->
</template>

<script setup>
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
      const sales = parseFloat(report.sales); // Ensure sales is treated as a number
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
    name: "productName",
    label: "Product Name",
    field: (row) => {
      return row.product.name || "N/A";
    },
    align: "center",
  },
  {
    name: "pieces",
    label: "Pieces",
    field: "pieces",
    align: "center",
  },
  {
    name: "price",
    label: "Price",
    field: "price",
    align: "center",
  },
  {
    name: "total_amount",
    label: "Total Amount",
    field: "total_amount",
    align: "center",
  },
];
</script>
