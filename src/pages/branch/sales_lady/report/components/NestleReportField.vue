<template>
  <div class="q-pa-xm">
    <div class="text-subtitle2 text-weight-light">Nestlé Report</div>
    <q-list dense separator class="box">
      <q-item>
        <q-item-section>
          <q-item-label class="text-overline" align="center">
            Product Name
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-overline" align="center">
            Price
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-overline" align="center">
            Beginnings
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-overline" align="center">
            Added Stocks
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

        <q-item-section side>
          <q-item-label>
            <span>Action</span>
          </q-item-label>
        </q-item-section>
      </q-item>

      <div v-for="(nestle, index) in nestleReports" :key="index">
        <q-item>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ nestle.name }}
              </span>
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ formatCurrency(nestle.price) }}
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
                {{ nestle.added_stocks }}
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

          <q-item-section align="center" side>
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
import { useSalesReportsStore } from "src/stores/sales-report";
import { computed } from "vue";

const salesReportsStore = useSalesReportsStore();

const nestleReports = computed(() => salesReportsStore.nestleReports);

console.log("nestlessssReports", nestleReports.value);

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const removeNestle = (index) => {
  salesReportsStore.removeNestle(index);
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
