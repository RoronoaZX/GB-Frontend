<template>
  <div
    v-if="denominationReports !== 'No report' && denominationReports.length > 0"
  >
    <q-card flat dense class="box">
      <q-card-section class="text-h6 text-weight-regular">
        Denomination
      </q-card-section>
      <q-card-section>
        <div class="row text-weight-regular text-subtitle1">
          <div class="col-6">
            <div>1000 Bills: {{ denominationReports[0].oneThousandBills }}</div>
            <div>500 Bills: {{ denominationReports[0].fiveHundredBills }}</div>
            <div>200 Bills: {{ denominationReports[0].twoHundredBills }}</div>
            <div>100 Bills: {{ denominationReports[0].oneHundredBills }}</div>
            <div>50 Bills: {{ denominationReports[0].fiftyBills }}</div>
            <div>20 Bills: {{ denominationReports[0].twentyBills }}</div>
          </div>
          <div class="col-6">
            <div>20 coins: {{ denominationReports[0].twentyCoins }}</div>
            <div>10 coins: {{ denominationReports[0].tenCoins }}</div>
            <div>5 coins: {{ denominationReports[0].fiveCoins }}</div>
            <div>1 coins: {{ denominationReports[0].oneCoins }}</div>
            <div>25 cents: {{ denominationReports[0].twentyFiveCents }}</div>
          </div>
        </div>
      </q-card-section>

      <!-- {{ denominationReports }} -->
    </q-card>
    <div class="row justify-end q-mt-md">
      <div class="text-h6">
        Denomination Total: {{ formatPrice(overallTotal) }}
      </div>
    </div>
  </div>
  <div align="center" v-else>
    <p>No Denomination reports available.</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["denominationReports"]);
console.log("denominationReports", props.denominationReports);

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};
// Compute overall total
const overallTotal = computed(() => {
  const report = props.denominationReports[0];
  if (!report) return 0;

  const total =
    (report.oneThousandBills || 0) * 1000 +
    (report.fiveHundredBills || 0) * 500 +
    (report.twoHundredBills || 0) * 200 +
    (report.oneHundredBills || 0) * 100 +
    (report.fiftyBills || 0) * 50 +
    (report.twentyBills || 0) * 20 +
    (report.twentyCoins || 0) * 20 +
    (report.tenCoins || 0) * 10 +
    (report.fiveCoins || 0) * 5 +
    (report.oneCoins || 0) * 1 +
    (report.twentyFiveCents || 0) * 0.25;

  return total;
});
</script>

<style lang="scss" scoped>
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
