<template>
  <div class="q-pa-xm">
    <div class="text-subtitle2 text-weight-light">Bread Report</div>
    <q-field outlined dense readonly>
      <div class="q-py-sm">
        <div class="q-gutter-md">
          <div>
            <q-item v-for="(bread, index) in breadReports" :key="index">
              <q-item-section class="q-ma-sm text-subtitle2" side>
                {{ bread.name }}
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Beginnings</q-item-label>
                <q-item-label caption>
                  {{ bread.total }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Remainnings</q-item-label>
                <q-item-label caption>
                  {{ bread.remaining }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Sold</q-item-label>
                <q-item-label caption>
                  {{ bread.bread_sold }}
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
                <q-item-label>Price</q-item-label>
                <q-item-label caption>
                  {{ formatCurrency(bread.price) }}
                </q-item-label>
              </q-item-section>

              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Sales</q-item-label>
                <q-item-label caption>
                  {{ formatCurrency(bread.sales) }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-btn
                  color="red"
                  icon="close"
                  round
                  dense
                  @click="removeBread(index)"
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
const breadReports = computed(() => salesReportsStore.breadReports);

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const removeBread = (index) => {
  salesReportsStore.removeBread(index);
};
</script>

<style lang="scss" scoped></style>
