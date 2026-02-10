<template>
  <div class="text-h6" align="center">Nestlé List</div>
  <div v-if="confirmedNestleReports.length > 0">
    <q-list dense separator class="box">
      <q-item>
        <q-item-section>
          <q-item-label class="text-overline"> Product Name </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-overline text-center"> Price </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-overline text-center">
            Beginnings
          </q-item-label>
        </q-item-section>

        <q-item-section class="text-center" align="center">
          <q-item-label class="text-overline q-ma-sm text-center">
            Added Stocks
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-overline text-center">
            Remaining
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-overline text-center"> Out </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-overline text-center">
            Product Total
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-overline text-center">
            Product Sold
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        v-for="(product, index) in confirmedNestleReports"
        :key="index"
        class="text-center"
      >
        <q-item-section>
          <q-item-label>
            {{ capitalizeFirstLetter(product?.nestle?.name || "N/A") }}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{ formatPrice(product?.price || "N/A") }}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-caption text-center">
            {{ product?.beginnings || 0 }}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-caption text-center">
            {{ product?.added_stocks || 0 }}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-caption text-center">
            {{ product?.remaining || 0 }}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-caption text-center">
            {{ product?.out || 0 }}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-caption text-center">
            {{ productTotal(product) }}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-caption text-center">
            {{ productSoldTotal(product) }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>

  <div align="center" v-else>
    <p>No Nestlé reports are available, or all reports are still pending.</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatPrice } = typographyFormat();

const props = defineProps(["nestleReports"]);

console.log("nestleReports Data:", props.nestleReports);

const confirmedNestleReports = computed(() => {
  if (!Array.isArray(props.nestleReports)) return [];

  return props.nestleReports.filter(
    (nestle) => nestle?.status === "confirmed" || nestle?.status === "declined"
  );
});

const productTotal = (product) => {
  return product?.added_stocks + product?.beginnings;
};

const productDiff = (product) => {
  return product?.out + product?.remaining;
};

const productSoldTotal = (product) => {
  const total = productTotal(product) - productDiff(product);
  return total;
};
</script>

<style lang="scss" scoped>
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
