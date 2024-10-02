<template>
  <div class="q-pa-xm">
    <div class="text-subtitle2 text-weight-light">Softdrinks Report</div>
    <q-field outlined dense readonly>
      <div class="q-py-sm">
        <div class="q-gutter-md">
          <div>
            <q-item
              v-for="(softdrinks, index) in softdrinksReports"
              :key="index"
            >
              <q-item-section class="q-ma-sm text-subtitle2" side>
                {{ softdrinks.name }}
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Beginnings</q-item-label>
                <q-item-label caption>
                  {{ softdrinks.total }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Remainnings</q-item-label>
                <q-item-label caption>
                  {{ softdrinks.remainings }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Sold</q-item-label>
                <q-item-label caption>
                  {{ softdrinks.sold }}
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
                  {{ formatCurrency(softdrinks.price) }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Sales</q-item-label>
                <q-item-label caption>
                  {{ formatCurrency(softdrinks.sales) }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-btn
                  color="red"
                  icon="close"
                  round
                  dense
                  @click="removeSoftdrink(index)"
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
const softdrinksReports = computed(() => salesReportsStore.softdrinksReports);

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const removeSoftdrink = (index) => {
  salesReportsStore.removeSoftdrink(index);
};
</script>
