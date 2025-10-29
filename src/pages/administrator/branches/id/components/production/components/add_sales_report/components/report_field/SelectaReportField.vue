<template>
  <div class="q-pa-xm">
    <div class="text-subtitle2 text-weight-light">Selecta Report</div>
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
            >Selecta Out</q-item-label
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
      <div v-for="(selecta, index) in selectaReports" :key="index">
        <q-item>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ capitalizeFirstLetter(selecta.name) || "-" }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ selecta.beginnings }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ selecta.remaining }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ selecta.out }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ selecta.sold }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ formatPrice(selecta.price) }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ formatPrice(selecta.sales) }}
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
                @click="removeSelecta(index)"
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
const selectaReports = computed(() => salesReportsStore.selectaReports);

const removeSelecta = (index) => {
  salesReportsStore.removeSelecta(index);
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
