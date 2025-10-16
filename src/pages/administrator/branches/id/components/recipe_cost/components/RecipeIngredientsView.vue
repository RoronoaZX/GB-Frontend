<template>
  <q-dialog
    ref="dailogRef"
    @hide="onDialogHide"
    persistent
    position="right"
    backdrop-filter="blur(4px) saturate(150%)"
  >
    <q-card style="width: 820px; max-width: 80vw">
      <q-card-section class="row bg-background text-h6">
        <div class="text-h6 text-white">
          {{ capitalizeFirstLetter(props.row.recipe_name || "N/A") }}
        </div>
        <q-space />
        <div>
          <q-btn icon="arrow_forward_ios" flat dense round v-close-popup />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6" align="center">Ingredients Cost List</div>
      </q-card-section>
      <q-card-section>
        <q-list dense separator class="box">
          <q-item>
            <q-item-section>
              <q-item-label class="text-overline">
                Raw Materials Name
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-overline"> Code </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-overline">
                Ingredient Status</q-item-label
              >
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-overline"> Quantity Used </q-item-label>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-overline"> PPG </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label class="text-overline"> TCPI </q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-for="(ingredient, index) in props.row.items" :key="index">
            <q-item-section>
              <q-item-label class="text-caption">
                {{ ingredient.raw_material_name || "N/A" }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-caption">
                {{ ingredient.raw_material_code || "N/A" }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-caption">
                {{ ingredient.status || "N/A" }}</q-item-label
              >
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-caption">
                {{ parseFloat(ingredient.quantity_used || "N/A") }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-caption">
                {{
                  formatPrice(parseFloat(ingredient.price_per_gram || "N/A"))
                }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label class="text-caption">
                {{ formatPrice(calculateTotalCostPerIngredient(ingredient)) }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section class="q-mt-md text-right text-subtitle1">
        <strong>Total Cost:</strong>
        {{ calculateTotalCost(props.row) || "₱0.00" }}
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useDialogPluginComponent } from "quasar";

const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
});

console.log("props", props.row);

const capitalizeFirstLetter = (location) => {
  if (!location) return "";

  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const formatPrice = (value) => {
  if (value == null || isNaN(value)) return "0.00";

  return `₱${Number(value)}`;
};

const calculateTotalCostPerIngredient = (ingredient) => {
  const quantity = parseFloat(ingredient.quantity_used);
  const pricePerGram = parseFloat(ingredient.price_per_gram);

  return quantity * pricePerGram;
};

const calculateTotalCost = (ingredient) => {
  if (!ingredient || !ingredient.items) return "₱0.00";

  const total = ingredient.items.reduce((sum, ing) => {
    const quantity = parseFloat(ing.quantity_used) || 0;
    const pricePerGram = parseFloat(ing.price_per_gram) || 0;
    return sum + quantity * pricePerGram; // ✅ Correct summation
  }, 0);

  return `₱${total.toFixed(2).toLocaleString("en-PH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};
</script>

<style scoped>
.bg-background {
  background: linear-gradient(to right, #4b0082, #800080, #9932cc, #d8bfd8);
}

.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
