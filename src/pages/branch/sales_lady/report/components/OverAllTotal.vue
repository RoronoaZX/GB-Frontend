<template>
  <!-- <div class="text-h5 q-mb-md">Over All Total</div> -->

  <div class="row q-gutter-x-md q-gutter-y-md item-start">
    <div>
      <div class="text-weight-light">Bread Total Amount</div>
      <div>
        <q-input
          v-model="breadTotalFormatted"
          readonly
          outlined
          dense
          style="width: 150px"
        />
      </div>
    </div>
    <div>
      <div class="text-weight-light">Selecta Total Amount</div>
      <div>
        <q-input
          v-model="selectaTotalFormatted"
          readonly
          outlined
          dense
          style="width: 150px"
        />
      </div>
    </div>
    <div>
      <div class="text-weight-light">Softdrinks Total Amount</div>
      <div>
        <q-input
          v-model="softdrinksTotalFormatted"
          readonly
          outlined
          dense
          style="width: 150px"
        />
      </div>
    </div>
    <div>
      <div class="text-weight-light">Cake Total Amount</div>
      <div>
        <q-input
          v-model="cakeTotalFormatted"
          readonly
          outlined
          dense
          style="width: 150px"
        />
      </div>
    </div>
    <div>
      <div class="text-weight-light">Other Products Total Amount</div>
      <div>
        <q-input
          v-model="otherProductTotalFormatted"
          readonly
          outlined
          dense
          style="width: 200px"
        />
      </div>
    </div>
    <div>
      <div class="text-weight-light">Expenses Total Amount</div>
      <div>
        <q-input
          v-model="expensesTotalFormatted"
          readonly
          outlined
          dense
          style="width: 150px"
        />
      </div>
    </div>
    <div>
      <div class="text-weight-light">Credits Total Amount</div>
      <div>
        <q-input
          v-model="creditsTotalFormatted"
          readonly
          outlined
          dense
          style="width: 150px"
        />
      </div>
    </div>
  </div>
  <div class="row q-my-lg justify-between">
    <div class="q-gutter-sm q-my-md">
      <div class="text-weight-light text-h6 q-mt-md">Charges Total</div>
      <div>
        <q-input
          v-model="chargesTotalFormatted"
          readonly
          outlined
          dense
          style="width: 180px"
        />
      </div>
    </div>
    <div class="q-gutter-sm q-my-md">
      <div class="text-weight-bold text-h6 q-mt-md">Total Sales</div>
      <div>
        <q-input
          v-model="denominationTotalFormatted"
          readonly
          outlined
          dense
          style="width: 180px"
        />
      </div>
    </div>
  </div>

  <div class="q-my-md" align="right">
    <q-btn
      padding="sm md"
      color="red-6"
      dense
      rounded
      label="Submit"
      @click="handleSubmit"
    >
      <q-icon class="q-mx-sm" left name="send" />
    </q-btn>
  </div>
</template>

<script setup>
import { useSalesReportsStore } from "src/stores/sales-report";
import { ref, computed } from "vue";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace("₱", "₱ ");
};

const salesReportsStore = useSalesReportsStore();

const breadTotal = computed(() => salesReportsStore.breadTotalAmount);
const selectaTotal = computed(() => salesReportsStore.selectaTotalAmount);
const softdrinksTotal = computed(() => salesReportsStore.softdrinksTotalAmount);
const cakeTotal = computed(() => salesReportsStore.cakeTotalAmount);
const otherProductsTotal = computed(
  () => salesReportsStore.otherProductsTotalAmount
);
const expensesTotal = computed(() => salesReportsStore.expensesSumAmount);
const creditsTotal = computed(() => salesReportsStore.creditTotalAmount);
const chargesTotal = computed(() => salesReportsStore.getCharges);
const denominationTotal = computed(
  () => salesReportsStore.getDenominationTotal
);

const totalSalesAmount = computed(() => {
  return (
    breadTotal.value +
    selectaTotal.value +
    softdrinksTotal.value +
    cakeTotal.value +
    otherProductsTotal.value +
    expensesTotal.value
  );
});

const breadTotalFormatted = computed(() => formatCurrency(breadTotal.value));
const selectaTotalFormatted = computed(() =>
  formatCurrency(selectaTotal.value)
);
const softdrinksTotalFormatted = computed(() =>
  formatCurrency(softdrinksTotal.value)
);
const cakeTotalFormatted = computed(() => formatCurrency(cakeTotal.value));
const otherProductTotalFormatted = computed(() =>
  formatCurrency(otherProductsTotal.value)
);
const expensesTotalFormatted = computed(() =>
  formatCurrency(expensesTotal.value)
);
const creditsTotalFormatted = computed(() =>
  formatCurrency(creditsTotal.value)
);
const totalSalesAmountFormatted = computed(() =>
  formatCurrency(totalSalesAmount.value)
);
const denominationTotalFormatted = computed(() =>
  formatCurrency(denominationTotal.value)
);
const chargesTotalFormatted = computed(() =>
  formatCurrency(chargesTotal.value)
);

const handleSubmit = async () => {
  try {
    await salesReportsStore.submitSalesReports();
  } catch (error) {
    console.error("Error submitting data:", error);
  }
};
</script>

<style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(135deg, #24241d, #b79500);
}
</style>
