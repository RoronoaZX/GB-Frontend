<template>
  <div class="q-pa-xm">
    <div class="text-subtitle2 text-weight-light">Softdrinks Report</div>
    <q-list dense separator class="box">
      <q-item>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Product Name</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Beginnigs</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Remainings</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Softdrinks Out</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center">Sold</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Price</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Sales</q-item-label
          >
        </q-item-section>
        <q-item-section side>
          <q-item-label>
            <span>Action</span>
          </q-item-label>
          <!-- blank -->
        </q-item-section>
      </q-item>
      <div v-for="(softdrinks, index) in softdrinksReports" :key="index">
        <q-item>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ capitalizeFirstLetter(softdrinks.name) || "-" }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ softdrinks.beginnings }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ softdrinks.remaining }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ softdrinks.out }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ softdrinks.sold }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ formatPrice(softdrinks.price) || "-" }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ formatPrice(softdrinks.sales) || "-" }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section align="center" side>
            <q-item-label>
              <q-btn
                color="red"
                icon="backspace"
                round
                dense
                flat
                @click="removeSoftdrink(index)"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useSalesReportsStore } from "src/stores/sales-report";

import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatPrice } = typographyFormat();

const salesReportsStore = useSalesReportsStore();
const softdrinksReports = computed(() => salesReportsStore.softdrinksReports);

const removeSoftdrink = (index) => {
  salesReportsStore.removeSoftdrink(index);
};
</script>
<style lang="scss" scoped>
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
