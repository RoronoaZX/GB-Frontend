<template>
  <div class="q-pa-xm">
    <div class="text-subtitle2 text-weight-light">Expenses Report</div>
    <q-list dense separator class="box">
      <q-item>
        <q-item-section align="center">
          <q-item-label> Expenses Name </q-item-label>
        </q-item-section>
        <q-item-section align="center">
          <q-item-label> Description </q-item-label>
        </q-item-section>
        <q-item-section align="center">
          <q-item-label> Category </q-item-label>
        </q-item-section>
        <q-item-section align="center">
          <q-item-label> Amount </q-item-label>
        </q-item-section>
        <q-item-section align="center" side>
          <q-item-label> Action</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        separator
        v-for="(expenses, index) in expensesReports"
        :key="index"
      >
        <q-item-section align="center">
          <q-item-label>
            <span>
              {{ expenses.name }}
            </span>
          </q-item-label>
        </q-item-section>
        <q-item-section align="center">
          <q-item-label>
            <span>
              {{ expenses.description }}
            </span>
          </q-item-label>
        </q-item-section>
        <q-item-section align="center">
          <q-item-label>
            <q-badge
              outline
              :label="capitalizeFirstLetter(expenses.category)"
              :color="getCategoryColor(expenses.category)"
              text-color="white"
            />
          </q-item-label>
        </q-item-section>
        <q-item-section align="center">
          <q-item-label>
            <span>
              {{ formatCurrency(expenses.amount) }}
            </span>
          </q-item-label>
        </q-item-section>
        <q-item-section class="q-ma-sm q-gutter-sm" align="center" side>
          <q-btn
            color="red"
            icon="backspace"
            round
            dense
            flat
            @click="removeExpenses(index)"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- {{ expenses.name }} -->

    <!-- <q-field outlined dense readonly>
      <div class="q-py-sm">
        <div class="q-gutter-md">
          <div>
            <q-item v-for="(expenses, index) in expensesReports" :key="index">
              <q-item-section class="q-ma-sm text-subtitle2" side>
                {{ expenses.name }}
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Description</q-item-label>
                <q-item-label caption>
                  {{ expenses.description }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Amount</q-item-label>
                <q-item-label caption>
                  {{ formatCurrency(expenses.amount) }} -->
    <!-- <q-popup-edit
                    dense
                    buttons
                    label-set="Save"
                    label-cancel="Close"
                    v-slot="scope"
                  >
                    <q-input
                      type="number"
                      dense
                      autofocus
                      counter
                      @keyup.enter="scope.set"
                    >
                    </q-input>
                  </q-popup-edit> -->
    <!-- </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-btn
                  color="red"
                  icon="close"
                  round
                  dense
                  @click="removeExpenses(index)"
                />
              </q-item-section>
            </q-item>
          </div>
        </div>
      </div>
    </q-field> -->
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useSalesReportsStore } from "src/stores/sales-report";

const salesReportsStore = useSalesReportsStore();
const expensesReports = computed(
  () => salesReportsStore.withOutReceiptExpensesReport
);

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const removeExpenses = (index) => {
  salesReportsStore.removeExpenses(index);
};

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const getCategoryColor = (value) => {
  if (value === "normal") return "blue";
  if (value === "premium") return "purple";
  return "grey"; // default fallback
};
</script>

<style lang="scss" scoped>
.bg-backgroud {
  background: linear-gradient(to right, #4b0082, #800080, #9932cc, #d8bfd8);
}

.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
