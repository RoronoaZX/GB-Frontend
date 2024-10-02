<template>
  <div class="q-pa-xm">
    <div class="text-subtitle2 text-weight-light">Expenses Report</div>
    <q-field outlined dense readonly>
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
                  {{ formatCurrency(expenses.amount) }}
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
                </q-item-label>
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
    </q-field>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useSalesReportsStore } from "src/stores/sales-report";

const salesReportsStore = useSalesReportsStore();
const expensesReports = computed(() => salesReportsStore.expensesReports);

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
</script>

<style lang="scss" scoped></style>
