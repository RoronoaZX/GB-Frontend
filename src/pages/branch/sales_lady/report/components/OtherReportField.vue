<template>
  <div class="q-pa-xm">
    <div class="text-subtitle2 text-weight-light">Other Products Report</div>
    <q-list dense separator class="box">
      <q-item>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Product Name</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Beginnings</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Remainings</q-item-label
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
        </q-item-section>
      </q-item>
      <q-item
        v-for="(otherProduct, index) in otherProductsReports"
        :key="index"
      >
        <q-item-section>
          <q-item-label class="text-caption" align="center">
            <span>
              {{ otherProduct.name }}
            </span>
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption" align="center">
            <span>
              {{ otherProduct.total }}
            </span>
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption" align="center">
            <span>
              {{ otherProduct.remaining }}
            </span>
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption" align="center">
            <span>
              {{ otherProduct.product_sold }}
            </span>
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption" align="center">
            <span>
              {{ formatCurrency(otherProduct.price) }}
            </span>
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption" align="center">
            <span>
              {{ formatCurrency(otherProduct.sales) }}
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
            @click="removeOtherProductsReport(index)"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <!-- <q-field outlined dense readonly>
      <div class="q-py-sm">
        <div class="q-gutter-md">
          <div>
            <q-item
              v-for="(otherProduct, index) in otherProductsReports"
              :key="index"
            >
              <q-item-section class="q-ma-sm text-subtitle2" side>
                {{ otherProduct.name }}
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Beginnings</q-item-label>
                <q-item-label caption>
                  {{ otherProduct.total }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Remainnings</q-item-label>
                <q-item-label caption>
                  {{ otherProduct.remaining }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Sold</q-item-label>
                <q-item-label caption>
                  {{ otherProduct.product_sold }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Price</q-item-label>
                <q-item-label caption>
                  {{ formatCurrency(otherProduct.price) }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Sales</q-item-label>
                <q-item-label caption>
                  {{ formatCurrency(otherProduct.sales) }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-btn
                  color="red"
                  icon="close"
                  round
                  dense
                  @click="removeOtherProductsReport(index)"
                />
              </q-item-section>
            </q-item>
          </div>
        </div>
      </div>
    </q-field> -->
  </div>
</template>

<script setup>
import { useSalesReportsStore } from "src/stores/sales-report";
import { computed } from "vue";

const salesReportsStore = useSalesReportsStore();
const otherProductsReports = computed(
  () => salesReportsStore.otherProductsReports
);

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

const removeOtherProductsReport = (index) => {
  salesReportsStore.removeOtherProducts(index);
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
