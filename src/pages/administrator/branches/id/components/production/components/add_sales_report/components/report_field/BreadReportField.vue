<template>
  <div class="q-pa-xm">
    <div class="text-subtitle2 text-weight-light">Bread Report</div>
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
            >Bread Out</q-item-label
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
      <div v-for="(bread, index) in breadReports" :key="index">
        <q-item>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ capitalizeFirstLetter(bread.name) || "-" }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ bread.total }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ bread.remaining }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span> {{ bread.bread_out }} </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ bread.bread_sold }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ formatPrice(bread.price) }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ formatPrice(bread.sales) }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn
              color="red"
              icon="backspace"
              round
              dense
              flat
              @click="removeBread(index)"
            />
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
const breadReports = computed(() => salesReportsStore.breadReports);

const removeBread = (index) => {
  salesReportsStore.removeBread(index);
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
