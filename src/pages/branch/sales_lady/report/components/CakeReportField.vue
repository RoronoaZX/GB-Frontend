<template>
  <div class="q-pa-xm">
    <div class="text-subtitle2 text-weight-light">Cake Report</div>
    <q-field outlined dense readonly>
      <div class="q-py-sm">
        <div class="q-gutter-md">
          <div>
            <q-item v-for="(cake, index) in cakeReports" :key="index">
              <q-item-section class="q-ma-sm text-subtitle2" side>
                {{ capitalizeFirstLetter(cake.name) }}
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Price</q-item-label>
                <q-item-label caption>
                  {{ formatCurrency(cake.price) }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Status</q-item-label>
                <q-item-label caption>
                  <q-badge
                    outline
                    :color="getBadgeCategoryColor(cake.sales_status)"
                  >
                    {{ cake.sales_status }}
                  </q-badge>
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-btn
                  color="red"
                  icon="close"
                  round
                  dense
                  @click="removeCake(index)"
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
import { useSalesReportsStore } from "src/stores/sales-report";
import { computed } from "vue";

const salesReportsStore = useSalesReportsStore();
const cakeReports = computed(() => salesReportsStore.cakeReports);

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

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

const removeCake = (index) => {
  salesReportsStore.removeCake(index);
};

const getBadgeCategoryColor = (category) => {
  switch (category) {
    case "sold":
      return "green";
    case "pull out":
      return "orange";
    default:
      return "grey";
  }
};
</script>

<style lang="scss" scoped></style>
