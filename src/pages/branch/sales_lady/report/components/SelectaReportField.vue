<template>
  <div class="q-pa-xm">
    <div class="text-subtitle2 text-weight-light">Selecta Report</div>
    <q-field outlined dense readonly>
      <div class="q-py-sm">
        <div class="q-gutter-md">
          <div>
            <q-item v-for="(selecta, index) in selectaReports" :key="index">
              <q-item-section class="q-ma-sm text-subtitle2" side>
                {{ selecta.name }}
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Beginnigs</q-item-label>
                <q-item-label caption>
                  {{ selecta.total }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Remainnings</q-item-label>
                <q-item-label caption>
                  {{ selecta.remainings }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Sold</q-item-label>
                <q-item-label caption>
                  {{ selecta.sold }}
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
                  {{ formatCurrency(selecta.price) }}
                </q-item-label>
              </q-item-section>

              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Sales</q-item-label>
                <q-item-label caption>
                  {{ formatCurrency(selecta.sales) }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-btn
                  color="red"
                  icon="close"
                  round
                  dense
                  @click="removeSelecta(index)"
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
const selectaReports = computed(() => salesReportsStore.selectaReports);

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const removeSelecta = (index) => {
  salesReportsStore.removeSelecta(index);
};
</script>

<style lang="scss" scoped></style>
