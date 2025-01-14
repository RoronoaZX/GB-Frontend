<template>
  <div v-if="breadReports !== 'No report' && breadReports.length > 0">
    <!-- Check if breadReports is "No report" or an empty array -->
    <q-table
      flat
      bordered
      title="Breads"
      :rows="breadReports"
      :columns="breadReportColumns"
      row-key="id"
      :loading="breadReports.length === 0"
      no-data-label="No bread reports available"
      dense
    >
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

      <!-- Add a footer row for the overall total sales -->
      <!-- <template v-slot:footer>
        <q-tr>
          <q-td colspan="6" class="text-right">Overall Total Sales:</q-td>
          <q-td>{{ formatPrice(overallTotal || 0) }}</q-td>
        </q-tr>
      </template> -->
    </q-table>
    <div class="row justify-end q-mt-md">
      <div class="text-h6">
        Bread Total Sales: {{ formatPrice(overallTotal || "0") }}
      </div>
    </div>
  </div>
  <!-- If breadReports is "No report", display the message instead of the table -->
  <div align="center" v-else>
    <p>No Bread reports available.</p>
  </div>
</template>

<script setup>
const props = defineProps(["breadReports"]);

console.log("breadReports Data:", props.breadReports);

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

const breadReportColumns = [
  {
    name: "name",
    label: "Bread Name",
    align: "left",
    field: (row) => row.bread?.name || "N/A",
    sortable: true,
  },
  {
    name: "price",
    label: "Price",
    align: "right",
    field: "price",
    format: formatPrice,
    sortable: true,
  },
  {
    name: "beginnings",
    label: "Beginnings (PCS)",
    align: "center",
    field: (row) => row.beginnings || 0,
    sortable: true,
  },
  {
    name: "newProduction",
    label: "New Production (PCS)",
    align: "center",
    field: (row) => row.new_production || 0,
    sortable: true,
  },
  {
    name: "remaining",
    label: "Remaining (PCS)",
    align: "center",
    field: (row) => row.remaining || 0,
    sortable: true,
  },
  {
    name: "breadOut",
    label: "Bread Out (PCS)",
    align: "center",
    field: (row) => row.bread_out || 0,
    sortable: true,
  },
  {
    name: "breadSold",
    label: "Bread Sold (PCS)",
    align: "center",
    field: (row) => row.bread_sold || 0,
    sortable: true,
  },
  {
    name: "total",
    label: "Bread Total (PCS)",
    align: "center",
    field: (row) => (row.remaining || 0) + (row.new_production || 0),
    sortable: true,
  },
  {
    name: "sales",
    label: "Total Sales",
    align: "right",
    field: "sales",
    format: formatPrice,
    sortable: true,
  },
];
</script>
