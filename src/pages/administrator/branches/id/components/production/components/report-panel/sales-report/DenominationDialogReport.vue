<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="width: 870px; max-width: 80vw">
      <q-card-section style="background-color: #03a9f4">
        <div class="row justify-between text-white">
          <div class="text-h6">Denomination Report</div>
          <q-btn icon="close" flat dense round v-close-popup>
            <q-tooltip class="bg-blue-grey-6" :delay="200">Close</q-tooltip>
          </q-btn>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row text-weight-regular text-subtitle1">
          <div class="col-6">
            <div>1000 Bills: {{ denominationReports.oneThousandBills }}</div>
            <div>500 Bills: {{ denominationReports.fiveHundredBills }}</div>
            <div>200 Bills: {{ denominationReports.twoHundredBills }}</div>
            <div>100 Bills: {{ denominationReports.oneHundredBills }}</div>
            <div>50 Bills: {{ denominationReports.fiftyBills }}</div>
            <div>20 Bills: {{ denominationReports.twentyBills }}</div>
          </div>
          <div class="col-6">
            <div>20 coins: {{ denominationReports.twentyCoins }}</div>
            <div>10 coins: {{ denominationReports.tenCoins }}</div>
            <div>5 coins: {{ denominationReports.fiveCoins }}</div>
            <div>1 coins: {{ denominationReports.oneCoins }}</div>
            <div>25 cents: {{ denominationReports.twentyFiveCents }}</div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row justify-end q-mt-md">
          <div class="text-h6">
            Overall Total Denomination: {{ formatPrice(totalDenomination) }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useDialogPluginComponent } from "quasar";
import { computed } from "vue";

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const props = defineProps({
  reports: Array,
  total: Number,
});

const denominationReports = props.reports[0] || {};

// Function to format the price in PHP currency
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

// Compute total denomination dynamically based on the count of bills and coins
const totalDenomination = computed(() => {
  const denominations = {
    oneThousandBills: 1000,
    fiveHundredBills: 500,
    twoHundredBills: 200,
    oneHundredBills: 100,
    fiftyBills: 50,
    twentyBills: 20,
    twentyCoins: 20,
    tenCoins: 10,
    fiveCoins: 5,
    oneCoins: 1,
    twentyFiveCents: 0.25, // Cent values as fractions
  };

  // Calculate total dynamically by summing the value of each denomination multiplied by its count
  return Object.keys(denominations).reduce((sum, key) => {
    return sum + (denominationReports[key] || 0) * denominations[key];
  }, 0);
});
</script>
