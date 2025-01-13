<template>
  <div>
    <!-- Check if breadReports is "No report" or an empty array -->
    <q-table
      v-if="
        otherProductsReport !== 'No report' && otherProductsReport.length > 0
      "
      flat
      bordered
      title="Other Products"
      :rows="otherProductsReport"
      :columns="otherProductsReportColumn"
      row-key="id"
      :virtual-scroll-sticky-size-start="48"
      :loading="otherProductsReport.length === 0"
      no-data-label="No bread reports available"
      dense
    >
      <!-- hide-header
      hide-bottom -->
      <template v-slot:body-cell-price="props">
        <q-td :props="props">
          {{ formatPrice(props.row.price) }}
        </q-td>
      </template>
      <template v-slot:body-cell-sales="props">
        <q-td :props="props">
          {{ formatPrice(props.row.sales) }}
        </q-td>
      </template>
    </q-table>

    <!-- If breadReports is "No report", display the message instead of the table -->
    <div v-else>
      <p>No Other Products reports available.</p>
    </div>
  </div>
  <div class="row justify-end q-mt-md">
    <div class="text-h6">
      Other Products Total Sales: {{ formatPrice(overallTotal || "0") }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["otherProductsReport"]);

console.log("otherProductsReport Data:", props.otherProductsReport);

const formatPrice = (price) => {
  if (price == null || isNaN(price)) {
    return "No data"; // Return "No data" if the price is null, undefined, or not a number
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

// Check if breadReports is an array before using reduce
const overallTotal = Array.isArray(props.breadReports)
  ? props.breadReports.reduce((total, report) => {
      const sales = parseFloat(report.sales); // Ensure sales is treated as a number
      if (!isNaN(sales)) {
        return total + sales; // Add sales to total if it's a valid number
      }
      return total; // Skip invalid sales values
    }, 0)
  : 0; // Default to 0 if breadReports is not an array

const otherProductsReportColumn = [
  {
    name: "name",
    label: "Product Name",
    field: (row) => {
      console.log("Row data:", row); // Debug each row's data
      return row.other_products.name || "N/A";
    },
  },
  {
    name: "price",
    label: "Price",
    field: "price",
  },
  {
    name: "beginnings",
    label: "Beginnings (PCS)",
    field: "beginnings",
    format: (val) => `${val}`,
  },
  {
    name: "remaining",
    label: "Remaining (PCS)",
    field: "remaining",
    format: (val) => `${val}`,
  },
  {
    name: "out",
    label: "Product Out (PCS)",
    field: "out",
    format: (val) => `${val}`,
  },
  {
    name: "sold",
    label: "Product Sold (PCS)",
    field: "sold",
    format: (val) => `${val}`,
  },
  {
    name: "sales",
    label: "Total Sales",
    field: "sales",
  },
];
</script>
