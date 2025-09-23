<template>
  <div>
    <q-select
      v-model="stocksCategory"
      :options="stocksCategoryOptions"
      emit-value
      map-options
      outlined
      behavior="menu"
      dense
      label="Select Category"
    />
  </div>
  <div v-if="stocksCategory === 'gallon'" class="row q-mt-md q-gutter-md">
    <q-input
      outlined
      flat
      dense
      label="Quantity"
      type="number"
      style="width: 120px"
    />
    <q-input
      outlined
      flat
      dense
      label="Price per Gallon"
      type="number"
      style="width: 150px"
    />
    <q-input
      outlined
      flat
      dense
      label="Kilo per Gallon"
      type="number"
      style="width: 130px"
    />
    <q-input outlined flat dense readonly label="Grams" style="width: 150px" />
    <q-input
      outlined
      flat
      dense
      readonly
      label="Price perGrams"
      style="width: 150px"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const stocksCategory = ref("");

const stocksCategoryOptions = [
  { label: "Sack", value: "sack" },
  { label: "Can", value: "can" },
  { label: "Bottle", value: "bottle" },
  { label: "Box", value: "box" },
  { label: "Margarine Tub", value: "margarine tub" },
  { label: "Gallon", value: "gallon" },
  { label: "Kilo", value: "kilo" },
  { label: "Gram", value: "gram" },
  { label: "Pieces", value: "pcs" },
];

const unitOptions = [
  { label: "Sack (25 kg each)", value: "sack" },
  { label: "Kilo", value: "kilo" },
  { label: "Gram", value: "gram" },
  { label: "Pieces", value: "pcs" },
];
</script>
