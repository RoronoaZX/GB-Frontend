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
        <!-- {{ reports }} -->
      </q-card-section>
      <q-card-section>
        <div class="row justify-end q-mt-md">
          <div class="text-h6">
            Overall Total Denomination: {{ formatPrice(total || "0") }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { computed } from "vue";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps({
  reports: Array,
  total: Number,
});
console.log("Denomination Props", props.reports);
const denominationReports = props.reports[0];

// Log to verify the structure of props.reports
console.log("Reports data structure:", props.reports);

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

// Replace this with your actual filtered rows logic
const filteredRows = computed(() => {
  // Assuming `breads` is an array in `reports`
  console.log("Filtered rows:", props.reports || []);
  return props.reports || [];
});

console.log("Filtered Rows:", filteredRows.value);
</script>

<style scoped></style>
