<template>
  <div class="q-pa-xm">
    <div class="text-subtitle2 text-weight-light">Employee Credit Report</div>
    <q-field outlined dense readonly>
      <div class="q-py-sm">
        <div class="q-gutter-md">
          <div v-for="(report, index) in employeeCreditReport" :key="index">
            <q-item
              v-for="(credit, creditIndex) in report.credits"
              :key="creditIndex"
            >
              <q-item-section class="q-ma-sm text-subtitle2" side>
                {{ report.credit_user_name }}
                {{}}
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Products Name</q-item-label>
                <q-item-label caption>
                  {{ credit.productName }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Price</q-item-label>
                <q-item-label caption>
                  {{ formatCurrency(credit.price) }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Pcs</q-item-label>
                <q-item-label caption>
                  {{ credit.pieces }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Total</q-item-label>
                <q-item-label caption>
                  {{ formatCurrency(report.total_amount) }}
                </q-item-label>
              </q-item-section>
              <!-- - {{ credit.productName }} - -->
              <q-item-section side>
                <q-btn
                  color="red"
                  icon="close"
                  round
                  dense
                  @click="removeEmployeeCreditReport(index)"
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
const employeeCreditReport = computed(
  () => salesReportsStore.employeeCreditReports
);

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const removeEmployeeCreditReport = (index) => {
  salesReportsStore.removeEmployeeCreditReport(index);
};
</script>

<style lang="scss" scoped></style>
