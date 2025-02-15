<template>
  <div class="text-h6" align="center">Expenses List</div>
  <div v-if="expensesReports !== 'No report' && expensesReports.length > 0">
    <q-list dense separator class="box">
      <q-item>
        <q-item-section class="text-center">
          <q-item-label class="text-overline">Expenses Name</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline text-center"
            >Description</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline text-center">Amount</q-item-label>
        </q-item-section>
      </q-item>
      <!-- <div v-if="breadReports !== 'No report' && breadReports.length > 0"> -->
      <q-item
        v-for="(expenses, index) in expensesReports"
        :key="index"
        class="text-center"
      >
        <q-item-section>
          <q-item-label class="text-caption">
            {{ expenses?.name || "N/A" }}
          </q-item-label>
        </q-item-section>
        <q-item-section class="text-center">
          <q-item-label class="text-caption text-center">
            {{ expenses?.description || "N/A" }}
            <!-- `${breads?.price} ` -->
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption text-center">
            {{ formatPrice(expenses?.amount || 0) }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <div class="row justify-end q-mx-md">
        <div class="text-subtitle1">
          Total : {{ formatPrice(overallTotal || 0) }}
        </div>
      </div>
      <!-- </div> -->
    </q-list>
  </div>

  <div align="center" v-else>No Expenses report available</div>
</template>

<script setup>
import { computed } from "vue";

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
