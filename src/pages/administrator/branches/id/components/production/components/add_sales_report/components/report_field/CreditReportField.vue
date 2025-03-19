<template>
  <div class="q-pa-xm">
    <div class="text-subtitle2 text-weight-light">Employee Credit Report</div>
    <q-list dense separator class="box">
      <q-item separator>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Employee Name</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Products Name</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Price</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Pieces</q-item-label
          >
        </q-item-section>
        <q-item-section align="center">
          <q-item-label class="text-overline">Total</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>
            <span>Action</span>
          </q-item-label>
        </q-item-section>
      </q-item>
      <div v-for="(report, index) in employeeCreditReport" :key="index">
        <q-item
          v-for="(credit, creditIndex) in report.credits"
          :key="creditIndex"
        >
          <q-item-section align="center">
            <q-item-label class="text-caption">
              <span>{{ report.credit_user_name }}</span>
            </q-item-label>
          </q-item-section>
          <q-item-section align="center">
            <q-item-label class="text-caption">
              <span>
                {{ credit.productName }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section align="center">
            <q-item-label class="text-caption">
              <span>
                {{ formatCurrency(credit.price) }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section align="center">
            <q-item-label class="text-caption">
              <span>
                {{ credit.pieces }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section align="center">
            <q-item-label class="text-caption">
              <span>
                {{ formatTotalCurrency(credit.totalAmount) }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section align="center" side>
            <q-item-label>
              <span>
                <q-btn
                  color="red"
                  icon="backspace"
                  round
                  dense
                  flat
                  @click="removeEmployeeCreditReport(index)"
                />
              </span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
    <!-- <q-field outlined dense readonly>
      <div class="q-py-sm">
        <div class="q-gutter-md">
          <div v-for="(report, index) in employeeCreditReport" :key="index">
            <q-item
              v-for="(credit, creditIndex) in report.credits"
              :key="creditIndex"
            >
              <q-item-section class="q-ma-sm text-subtitle2">
                {{ report.credit_user_name }}
                {{}}
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm">
                <q-item-label>Products Name</q-item-label>
                <q-item-label caption>
                  {{ credit.productName }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm">
                <q-item-label>Price</q-item-label>
                <q-item-label caption>
                  {{ formatCurrency(credit.price) }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm">
                <q-item-label>Pcs</q-item-label>
                <q-item-label caption>
                  {{ credit.pieces }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm">
                <q-item-label>Total</q-item-label>
                <q-item-label caption>
                  {{ formatCurrency(report.total_amount) }}
                </q-item-label>
              </q-item-section>

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
    </q-field> -->
    <!-- - {{ credit.productName }} - -->
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useSalesReportsStore } from "src/stores/sales-report";

const salesReportsStore = useSalesReportsStore();
const employeeCreditReport = computed(
  () => salesReportsStore.employeeCreditReports
);

console.log("employeeCreditReportsss", employeeCreditReport);

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatTotalCurrency = (value) => {
  if (value == null || value === "") {
    return "Invalid Amount"; // Handle null or empty strings
  }
  const numericValue = parseFloat(value); // Convert string to number
  if (isNaN(numericValue)) {
    return "Invalid Amount"; // Fallback for non-numeric strings
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
};

const removeEmployeeCreditReport = (index) => {
  salesReportsStore.removeEmployeeCreditReport(index);
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
