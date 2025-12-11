<template>
  <div class="text-h6" align="center">Credit List</div>
  <div v-if="creditsReports !== 'No report' && creditsReports.length > 0">
    <q-list dense separator class="box">
      <q-item>
        <q-item-section class="text-center">
          <q-item-label class="text-overline">Employee Name</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline text-center"
            >Total Amount</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline text-center">Action</q-item-label>
        </q-item-section>
      </q-item>
      <!-- <div v-if="breadReports !== 'No report' && breadReports.length > 0"> -->
      <q-item
        v-for="(credits, index) in creditsReports"
        :key="index"
        class="text-center"
      >
        <q-item-section>
          <q-item-label class="text-caption">
            {{ formatFullname(credits?.credit_user_id || "N/A") }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption text-center">
            {{ formatPrice(credits?.total_amount || 0) }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption text-center">
            <ViewCreditsReport
              :creditsReportList="credits?.credit_products || []"
            />
          </q-item-label>
        </q-item-section>
      </q-item>
      <!-- <div class="row justify-end q-mx-md">
        <div class="text-subtitle1">
          Total : {{ formatPrice(overallTotal || "0") }}
        </div>
      </div> -->
      <!-- </div> -->
    </q-list>
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
