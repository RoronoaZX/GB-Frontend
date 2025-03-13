<template>
  <div class="text-h6" align="center">Softdrinks List</div>
  <div v-if="softdrinksReports !== 'No report' && softdrinksReports.length > 0">
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
        <q-item-section class="text-center" align="center">
          <q-item-label class="text-overline q-ma-sm text-center"
            >Added Stocks</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline text-center"
            >Remaining</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline text-center">Out</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline text-center"
            >Product Total</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline text-center"
            >Product Sold</q-item-label
          >
        </q-item-section>

        <q-item-section side>
          <q-item-label class="text-overline text-center"
            >Total Sales</q-item-label
          >
        </q-item-section>
      </q-item>
      <!-- <div v-if="breadReports !== 'No report' && breadReports.length > 0"> -->
      <q-item
        v-for="(product, index) in softdrinksReports"
        :key="index"
        class="text-center"
      >
        <q-item-section>
          <q-item-label class="text-caption">
            {{ capitalizeFirstLetter(product?.softdrinks?.name || "N/A") }}
          </q-item-label>
        </q-item-section>
        <q-item-section class="text-center">
          <q-item-label class="text-caption text-center">
            {{ formatPrice(product?.price || "N/A") }}
            <!-- `${breads?.price} ` -->
          </q-item-label>
        </q-item-section>
        <q-item-section class="text-center">
          <q-item-label class="text-caption text-center">
            {{ product?.beginnings || 0 }}
          </q-item-label>
        </q-item-section>
        <q-item-section class="text-center">
          <q-item-label class="text-caption text-center">
            {{ product?.added_stocks || 0 }}
          </q-item-label>
        </q-item-section>
        <q-item-section class="text-caption text-center">
          <q-item-label>
            {{ product?.remaining || 0 }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption text-center">
            {{ product?.out || 0 }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption text-center">
            {{ productTotal(product) }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption text-center">
            {{ productSoldTotal(product) }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption text-center">
            {{ totalSales(product) }}
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
    <p>No Softdrinks reports available yet.</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

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

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const productTotal = (product) => {
  return product?.added_stocks + product?.beginnings;
};

const productDiff = (product) => {
  return product?.out + product?.remaining;
};

const productSoldTotal = (product) => {
  const total = productTotal(product) - productDiff(product);
  return total;
};

const totalSales = (product) => {
  const total = productSoldTotal(product) * product?.price;
  return formatPrice(total);
};

// Check if breadReports is an array before using reduce
const overallTotal = computed(() => {
  if (!Array.isArray(props.softdrinksReports)) return formatPrice(0);

  const total = props.softdrinksReports.reduce((sum, products) => {
    const sales = productSoldTotal(products) * products?.price;
    return !isNaN(sales) ? sum + sales : sum;
  }, 0);

  return formatPrice(total);
});
</script>
