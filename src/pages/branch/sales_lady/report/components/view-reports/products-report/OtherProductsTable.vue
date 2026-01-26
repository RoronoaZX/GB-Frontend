<template>
  <div class="text-h6" align="center">Other Product List</div>
  <div v-if="confirmedOtherProductsReports.length > 0">
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

        <!-- <q-item-section side>
          <q-item-label class="text-overline text-center"
            >Total Sales</q-item-label
          >
        </q-item-section> -->
      </q-item>
      <!-- <div v-if="breadReports !== 'No report' && breadReports.length > 0"> -->
      <q-item
        v-for="(product, index) in confirmedOtherProductsReports"
        :key="index"
        class="text-center"
      >
        <q-item-section>
          <q-item-label class="text-caption">
            {{ capitalizeFirstLetter(product?.other_products?.name || "N/A") }}
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
        <!-- <q-item-section>
          <q-item-label class="text-caption text-center">
            {{ totalSales(product) }}
          </q-item-label>
        </q-item-section> -->
      </q-item>
      <!-- <div class="row justify-end q-mx-md">
        <div class="text-subtitle1">Total Sales: {{ overallTotal || "0" }}</div>
      </div> -->
      <!-- </div> -->
    </q-list>
  </div>
  <!-- If breadReports is "No report", display the message instead of the table -->
  <div align="center" v-else>
    <p>No Other Products reports available.</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatPrice } = typographyFormat();

const props = defineProps(["otherProductsReport"]);

console.log("otherProductsReport Data:", props.otherProductsReport);

const confirmedOtherProductsReports = computed(() => {
  if (!Array.isArray(props.otherProductsReport)) return [];

  return props.otherProductsReport.filter(
    (otherProducts) =>
      otherProducts?.status === "confirmed" ||
      otherProducts?.status === "declined"
  );
});

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
const ovevrallTotal = computed(() => {
  const total = confirmedOtherProductsReports.value.reduce((sum, product) => {
    const sales = productSoldTotal(product) * product?.price;

    return !isNaN(sales) ? sum + sales : sum;
  }, 0);

  return formatPrice(total);
});
</script>
