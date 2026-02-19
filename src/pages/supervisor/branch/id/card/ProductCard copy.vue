<template>
  <div class="q-mt-md">
    <q-scroll-area style="height: 700px; max-width: 1500px">
      <div
        v-if="!products || products.length === 0"
        class="text-center q-pa-md"
      >
        No data available
      </div>

      <div v-else class="row q-pa-lg q-gutter-y-lg">
        <q-intersection
          v-for="(item, index) in products"
          :key="index"
          once
          transition="scale"
          class="example-item q-gutter-sm"
        >
          <q-card class="q-ma-sm my-card">
            <img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

            <div
              class="q-pa-sm"
              :class="{
                'text-subtitle2': item.product.name.length <= 5,
                'text-caption text-weight-medium':
                  item.product.name.length > 10 &&
                  item.product.name.length <= 20,
                'text-caption': item.product.name.length > 20,
              }"
            >
              {{ capitalizeFirstLetter(item.product.name) }}
            </div>

            <q-separator />

            <q-card-section class="text-subtitle2 text-weight-regular">
              <div class="q-pa-xm row q-gutter-x-sm justify-between">
                <div>Quantity:</div>
                <div>{{ item.total_quantity }}</div>
              </div>

              <div class="q-pa-xm row q-gutter-x-sm justify-between">
                <div>Price:</div>
              </div>
            </q-card-section>
          </q-card>
        </q-intersection>
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup>
import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatPrice } = typographyFormat();

const props = defineProps({
  products: {
    type: Object,
    required: true,
  },
});

console.log("props.productss", props.products);
</script>

<style lang="scss" scoped>
.example-item {
  width: 190px;
  height: 300px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  .my-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    img {
      height: 150px;
      width: 100%;
      object-fit: cover;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    .product-name {
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      padding: 6px 8px;
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .q-card-section {
      padding: 6px 12px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
  }
}
</style>
