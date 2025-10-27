<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card style="width: 820px; max-width: 80vw">
      <!-- HEADER -->
      <q-card-section class="gradient-btn">
        <div class="row justify-between text-h6 text-dark">
          <div>✏️ Edit Delivery</div>
          <div>
            <q-btn icon="close" flat dense round v-close-popup />
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div>
          From: {{ capitalizeFirstLetter(delivery.from_name) || "N/A" }}
        </div>
        <div>
          To: {{ capitalizeFirstLetter(delivery.to_data.name) || "N/A" }}
        </div>
      </q-card-section>

      <q-card-section>
        <div class="q-mb-md">
          Raw Materials Name:
          {{ capitalizeFirstLetter(item.raw_material.name) || "N/A" }}
        </div>

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

        <div v-if="selectedCategoryConfig" class="row q-mt-md q-gutter-md">
          <div
            v-for="field in selectedCategoryConfig.fields"
            :key="field.model"
          >
            <q-input
              v-model.number="stocks[field.model]"
              :label="field.label"
              :type="field.type || 'text'"
              :readonly="field.readonly || false"
              :prefix="field.prefix || ''"
              outlined
              flat
              dense
              :style="{ width: field.width || '150px' }"
            />
          </div>
        </div>
      </q-card-section>

      <q-separator class="q-my-md" />

      <q-card-actions align="right">
        <q-btn outline v-close-popup>Cancel</q-btn>
        <q-btn @click="save">Save</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, reactive, watch } from "vue";
import { Notify, useDialogPluginComponent, useQuasar } from "quasar";
import { useStockDelivery } from "src/stores/stock-delivery";
import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter } = typographyFormat();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
const $q = useQuasar();

const stocksDeliveryStore = useStockDelivery();
const dialog = ref(false);

// props from parent (passed delivery data)
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  delivery: {
    type: Object,
    required: true,
  },
});

const stocksCategory = ref(props.item.category || "");

// ✅ Helper: round up and fix to 2 decimals
const formatToTwoDecimals = (value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return "0.00";
  return (Math.ceil(num * 100) / 100).toFixed(2);
};

const editableItem = ref({ ...props.item });

// ✅ Watch and auto-format on change
watch(editableItem, (newVal) => {
  Object.keys(newVal).forEach((key) => {
    if (
      ["gram", "kilo", "pcs", "price_per_gram", "price_per_unit"].includes(key)
    ) {
      editableItem.value[key] = newVal[key];
    }
  });
});

const stocksCategoryOptions = [
  { label: "Sack", value: "sack" },
  { label: "Can", value: "can" },
  { label: "Bottle", value: "bottle" },
  { label: "Box", value: "box" },
  { label: "Margarine Tub", value: "baro" },
  { label: "Gallon", value: "gallon" },
  { label: "Kilo", value: "kilo" },
  { label: "Gram", value: "gram" },
  { label: "Pieces", value: "pcs" },
];

const categoryConfigs = {
  sack: {
    fields: [
      { model: "quantity", label: "Sack Quantity", type: "number" },
      { model: "kilo", label: "Kilo per Sack", type: "number" },
      { model: "gram", label: "Grams", type: "number", readonly: true },
      { model: "price", label: "Price per Sack", type: "number", prefix: "₱" },
      {
        model: "pricePerGram",
        label: "Price per Gram",
        type: "number",
        readonly: true,
        prefix: "₱",
      },
    ],
  },
  can: {
    fields: [
      { model: "quantity", label: "Can Quantity", type: "number" },
      { model: "kilo", label: "Kilo per Can", type: "number" },
      { model: "gram", label: "Grams", type: "number" },
      { model: "price", label: "Price per Can", type: "number", prefix: "₱" },
      {
        model: "pricePerGram",
        label: "Price per Gram",
        type: "number",
        readonly: true,
        prefix: "₱",
      },
    ],
  },
  bottle: {
    fields: [
      { model: "quantity", label: "Bottle Quantity", type: "number" },
      { model: "kilo", label: "Kilo per Bottle", type: "number" },
      { model: "gram", label: "Grams" },
      {
        model: "price",
        label: "Price per Bottle",
        type: "number",
        prefix: "₱",
      },
      {
        model: "pricePerGram",
        label: "Price per Gram",
        readonly: true,
        prefix: "₱",
      },
    ],
  },
  box: {
    fields: [
      { model: "quantity", label: "Box Quantity", type: "number" },
      { model: "pcs", label: "Pieces per Box", type: "number" },
      { model: "kilo", label: "Kilo per Piece", type: "number" },
      { model: "gram", label: "Grams" },
      { model: "price", label: "Price per Box", type: "number", prefix: "₱" },
      {
        model: "pricePerGram",
        label: "Price per Gram",
        readonly: true,
        prefix: "₱",
      },
    ],
  },
  gallon: {
    fields: [
      { model: "quantity", label: "Gallon Quantity", type: "number" },
      { model: "kilo", label: "Kilo per Gallon", type: "number" },
      { model: "gram", label: "Grams" },
      { model: "price", label: "Price per Gallon", type: "number" },
      { model: "pricePerGram", label: "Price per Gram", readonly: true },
    ],
  },
  baro: {
    fields: [
      { model: "quantity", label: "Tub Quantity", type: "number" },
      { model: "kilo", label: "Kilo per Tub", type: "number" },
      { model: "gram", label: "Grams", readonly: true },
      { model: "price", label: "Price per Tub", type: "number" },
      { model: "pricePerGram", label: "Price per Gram", readonly: true },
    ],
  },
};

console.log("props item", props.item);
console.log("props delivery", props.delivery);

const selectedCategoryConfig = computed(() => {
  return categoryConfigs[stocksCategory.value] || null;
});

const formatNumber = (value) => {
  if (value == null || value === "") return "";
  const num = parseFloat(value);
  // Hide zeroes
  if (num === 0) return "0";
  // Remove unnecessary trailing zeroes
  return num % 1 === 0 ? num.toFixed(0) : num.toFixed(3).replace(/\.?0+$/, "");
};

const trimTrailingZeros = (value) => {
  if (value == null || isNaN(value)) return 0;
  return parseFloat(parseFloat(value).toString());
};

const stocks = reactive({
  quantity: formatNumber(props.item.quantity || 0),
  kilo: formatNumber(props.item.kilo || 0),
  gram: formatNumber(props.item.gram || 0),
  pcs: formatNumber(props.item.pcs || 0),
  price: trimTrailingZeros(props.item.price_per_unit || 0),
  pricePerGram: trimTrailingZeros(props.item.price_per_gram || 0),
});

watch(
  stocks,
  (val) => {
    // Always sync grams with kilo
    if (val.kilo && val.quantity && !isNaN(val.kilo) && !isNaN(val.quantity)) {
      val.gram = val.kilo * 1000;
    } else if (val.kilo && !isNaN(val.kilo)) {
      val.gram = val.kilo * 1000;
    }

    // Compute price per gram if we have price & gram
    if (val.price > 0 && val.gram > 0) {
      val.pricePerGram = val.price / val.gram;
    } else {
      val.pricePerGram = 0;
    }
  },
  { deep: true }
);

const save = async () => {
  // ✅ 1️⃣ Get raw edited data first (unformatted)
  const rawData = {
    quantity: stocks.quantity,
    kilo: stocks.kilo,
    gram: stocks.gram,
    pcs: stocks.pcs,
    price: stocks.price,
    price_per_gram: stocks.pricePerGram,
    category: stocksCategory.value,
    raw_material_id: props.item.raw_material.id,
    delivery_id: props.delivery.id,
  };

  console.log("🟡 Raw edited data (before cleanup):", rawData);

  // ✅ 2️⃣ Then clean/format before saving to backend
  const cleanedData = {
    to_designation: props.delivery.to_designation,
    quantity: parseFloat(stocks.quantity || 0),
    kilo: parseFloat(stocks.kilo || 0),
    gram: parseFloat(stocks.gram || 0),
    total_grams: parseFloat(stocks.gram || 0),
    pcs: parseFloat(stocks.pcs || 0),
    price_per_unit: parseFloat(stocks.price || 0),
    price_per_gram: parseFloat(stocks.pricePerGram || 0),
    category: stocksCategory.value,
    raw_material_id: props.item.raw_material.id,
    delivery_su_id: props.item.id,
    rm_delivery_id: props.delivery.id,
    item_id: props.item.id,
    unit_type: props.item.unit_type,
  };

  $q.loading.show();
  try {
    console.log("🟢 Cleaned data (ready to save):", cleanedData);
    const response = await stocksDeliveryStore.updateDeliveryStocks(
      cleanedData
    );

    console.log("Resonse data in componnet:", response);

    // if your backend sends a success flag/message, check it
    if (
      response.data &&
      response.data.message === "Delivery stock item updated successfully."
    ) {
      // ✅ close dialog only when backend confirms success
      onDialogHide();

      Notify.create({
        type: "positive",
        message:
          response?.data?.message ||
          "Delivery stock item updated successfully.",
        timeout: 3000,
      });
    } else {
      Notify.create({
        type: "negative",
        message:
          response?.data?.message || "Failed to update delivery stock item.",
        timeout: 3000,
      });
    }
  } catch (error) {
    console.log("error", error);
  } finally {
    $q.loading.hide();
  }

  // Example of next step:
  // await stockDeliveryStore.updateDeli
};
</script>
