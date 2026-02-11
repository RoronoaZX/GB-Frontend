<template>
  <div class="q-pa-sm">
    <div class="text-subtitle2 tex-weight-light">Nestlé Report</div>
    <q-list dense separator class="box">
      <q-item>
        <q-item-section>
          <q-item-label class="text-overline" align="center">
            Product Name
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-overline" align="center">
            Beginnings
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-overline" align="center">
            Remainings
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-overline" align="center">
            Nestlé Out
          </q-item-label>
        </q-item-section>

        <!-- <q-item-section>
          <q-item-label class="text-overline" align="center">
            Sold
          </q-item-label>
        </q-item-section> -->

        <q-item-section>
          <q-item-label class="text-overline" align="center">
            Price
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-overline" align="center">
            Sales
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label> Action </q-item-label>
        </q-item-section>
      </q-item>

      <div v-for="(nestle, index) in nestleReports" :key="index">
        <q-item>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ capitalizeFirstLetter(nestle.name || "") }}
              </span>
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ nestle.beginnings }}
              </span>
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ nestle.remaining }}
              </span>
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-caption" align="center">
              {{ nestle.out }}
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ nestle.sold }}
              </span>
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ formatPrice(nestle.price) }}
              </span>
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ formatPrice(nestle.sales) }}
              </span>
            </q-item-label>
          </q-item-section>

          <q-item-section align="center">
            <q-item-label>
              <q-btn
                color="red"
                icon="backspace"
                round
                dense
                flat
                @click="removeNestle(index)"
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
const nestleReports = computed(() => salesReportsStore.nestleReports);

console.log("nestlessssReports", nestleReports.value);

const removeNestle = (index) => {
  salesReportsStore.removeNestle(index);
};
</script>

<style>
.bg-backgroud {
  background: linear-gradient(to right, #4b0082, #800080, #9932cc, #d8bfd8);
}

.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
