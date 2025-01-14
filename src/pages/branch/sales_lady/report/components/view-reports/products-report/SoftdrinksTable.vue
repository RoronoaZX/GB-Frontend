<template>
  <div v-if="softdrinksReports !== 'No report' && softdrinksReports.length > 0">
    <q-table
      flat
      bordered
      title="Softdrinks"
      :rows="softdrinksReports"
      :columns="softdrinksReportsColumns"
      row-key="id"
      :virtual-scroll-sticky-size-start="48"
      :loading="softdrinksReports.length === 0"
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
    </q-table>
    <div class="row justify-end q-mt-md">
      <div class="text-h6">
        Softdrinks Total Sales: {{ formatPrice(overallTotal || "0") }}
      </div>
    </div>
  </div>
  <!-- If breadReports is "No report", display the message instead of the table -->
  <div align="center" v-else>
    <p>No Softdrinks reports available yet.</p>
  </div>
</template>

<script setup>
const props = defineProps(["softdrinksReports"]);

console.log("softdrinksReports Data:", props.softdrinksReports);

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
const overallTotal = Array.isArray(props.softdrinksReports)
  ? props.softdrinksReports.reduce((total, report) => {
      const sales = parseFloat(report.sales); // Ensure sales is treated as a number
      if (!isNaN(sales)) {
        return total + sales; // Add sales to total if it's a valid number
      }
      return total; // Skip invalid sales values
    }, 0)
  : 0; // Default to 0 if breadReports is not an array

const softdrinksReportsColumns = [
  {
    name: "name",
    label: "Softdrinks Name",
    align: "center",
    field: (row) => {
      console.log("Row data:", row); // Debug each row's data
      return row.softdrinks.name || "N/A"; // Adjust this according to your data
    },
  },
  {
    name: "price",
    label: "Price",
    align: "center",
    field: "price",
  },
  {
    name: "beginnings",
    label: "Beginnings (PCS)",
    align: "center",
    field: "beginnings",
    format: (val) => `${val}`,
  },
  {
    name: "remaining",
    label: "Remaining (PCS)",
    align: "center",
    field: "remaining",
    format: (val) => `${val}`,
  },
  {
    name: "out",
    label: "Softdrinks Out (PCS)",
    align: "center",
    field: "out",
    format: (val) => `${val}`,
  },
  {
    name: "sold",
    label: "Softdrinks Sold (PCS)",
    align: "center",
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
