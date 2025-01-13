<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="width: 870px; max-width: 80vw">
      <q-card-section style="background-color: #795548">
        <div class="row justify-between text-white">
          <div class="text-h6">Bread Report</div>
          <q-btn icon="close" flat dense round v-close-popup>
            <q-tooltip class="bg-blue-grey-6" :delay="200">Close</q-tooltip>
          </q-btn>
        </div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="q-pb-lg q-pl-sm dynamic-width"
          v-model="filter"
          outlined
          placeholder="Search"
          debounce="1000"
          flat
          dense
          rounded
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section>
        <q-table
          :filter="filter"
          :virtual-scroll-sticky-size-start="48"
          flat
          :columns="breadReportColumns"
          :rows="filteredRows"
          row-key="name"
          virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
          hide-bottom
          style="height: 350px"
          class="table-container sticky-header"
        >
          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              <span>{{
                `${capitalizeFirstLetter(props.row.bread.name)}`
              }}</span>
            </q-td>
          </template>
          <template v-slot:body-cell-price="props">
            <q-td :props="props">
              <span>{{ `${formatPrice(props.row.price)}` }}</span>
            </q-td>
          </template>
          <template v-slot:body-cell-sales="props">
            <q-td :props="props">
              <span>{{ `${formatPrice(props.row.sales)}` }}</span>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
      <q-card-section>
        <div class="row justify-end q-mt-md">
          <div class="text-h6">
            Overall Total Sales: {{ formatPrice(overallTotal || "0") }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { computed, ref } from "vue";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps(["reports"]);
const filter = ref("");
// Log to verify the structure of props.reports
console.log("Reports data structure:", props.reports);

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const breadReportColumns = [
  {
    name: "name",
    label: "Bread Name",
    field: (row) => {
      console.log("Row data:", row); // Debug each row's data
      return row.bread.name || "N/A"; // Adjust this according to your data
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
    name: "newProduction",
    label: "New Production (PCS)",
    field: "new_production",
    format: (val) => `${val}`,
  },
  {
    name: "remaining",
    label: "Remaining (PCS)",
    field: "remaining",
    format: (val) => `${val}`,
  },
  {
    name: "breadOut",
    label: "Bread Out (PCS)",
    field: "bread_out",
    format: (val) => `${val}`,
  },
  {
    name: "breadSold",
    label: "Bread Sold (PCS)",
    field: "bread_sold",
    format: (val) => `${val}`,
  },
  {
    name: "total",
    label: "Bread Total (PCS)",
    field: "total",
    field: (row) => (row.remaining || 0) + (row.new_production || 0),
  },
  {
    name: "sales",
    label: "Total Sales",
    field: "sales",
  },
];

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

// Replace this with your actual filtered rows logic
const filteredRows = computed(() => {
  if (!filter.value || !filter.value.trim()) {
    // If there's no filter, return all rows
    return props.reports || [];
  }

  const search = filter.value.trim().toLowerCase(); // Normalize the filter input
  return (props.reports || []).filter((row) => {
    // Perform filtering on relevant fields
    return (
      row.bread.name.toLowerCase().includes(search) || // Bread name
      row.price.toString().includes(search) || // Price
      row.sales.toString().includes(search) // Sales
    );
  });
});

// Calculate the overall total sales with number conversion
const overallTotal = computed(() => {
  const total = filteredRows.value.reduce((total, row) => {
    const salesAmount = parseFloat(row.sales) || 0;
    console.log(`Adding salesAmount: ${salesAmount} to total: ${total}`);
    return total + salesAmount;
  }, 0);
  console.log("Overall Total Sales computed as:", total);
  return total;
});

console.log("Overall Total Sales:", overallTotal.value);
</script>

<style scoped></style>
