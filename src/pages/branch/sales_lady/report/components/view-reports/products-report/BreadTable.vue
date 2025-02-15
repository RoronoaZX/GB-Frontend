<template>
  <div class="text-h6" align="center">Bread List</div>
  <!-- Check if breadReports is "No report" or an empty array -->
  <div v-if="breadReports !== 'No report' && breadReports.length > 0">
    <q-list dense separator class="box">
      <q-item>
        <q-item-section>
          <q-item-label class="text-overline">Product Name</q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-overline text-center">Price</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline text-center"
            >Beginnings</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline q-pa-sm text-center"
            >New Prod</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline text-center"
            >Remaining</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline text-center"
            >Bread Out</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline text-center"
            >Bread Total</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline text-center"
            >Bread Sold</q-item-label
          >
        </q-item-section>

        <q-item-section side>
          <q-item-label class="text-overline text-center"
            >Total Sales</q-item-label
          >
        </q-item-section>
      </q-item>
      <!-- <div v-if="breadReports !== 'No report' && breadReports.length > 0"> -->
      <q-item v-for="(breads, index) in breadReports" :key="index">
        <q-item-section>
          <q-item-label class="text-caption">
            {{ capitalizeFirstLetter(breads?.bread?.name || "N/A") }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption text-center">
            {{ formatPrice(breads?.price || "N/A") }}
            <!-- `${breads?.price} ` -->
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption text-center">
            {{ breads?.beginnings || 0 }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption text-center">
            {{ breads?.new_production || 0 }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption text-center">
            {{ breads?.remaining || 0 }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption text-center">
            {{ breads?.bread_out || 0 }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption text-center">
            {{ breadTotal(breads) }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption text-center">
            {{ breadSoldTotal(breads) }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption text-center">
            {{ totalSales(breads) }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <div class="row justify-end q-mx-md">
        <div class="text-subtitle1">Total Sales: {{ overallTotal || "0" }}</div>
      </div>
      <!-- </div> -->
    </q-list>
  </div>

  <!-- If breadReports is "No report", display the message instead of the table -->
  <div align="center" v-else>
    <p>No Bread reports available.</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

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
const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const breadTotal = (breads) => {
  return breads?.new_production + breads?.beginnings;
};

const breadSoldTotal = (breads) => {
  const total = breadTotal(breads) - breads?.remaining;
  return total;
};

const totalSales = (breads) => {
  const total = breadSoldTotal(breads) * breads?.price;
  return formatPrice(total);
};

// Check if breadReports is an array before using reduce
const overallTotal = computed(() => {
  if (!Array.isArray(props.breadReports)) return formatPrice(0);

  const total = props.breadReports.reduce((sum, breads) => {
    const sales = breadSoldTotal(breads) * breads?.price;
    return !isNaN(sales) ? sum + sales : sum;
  }, 0);

  return formatPrice(total);
});
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
<style lang="scss" scoped>
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
