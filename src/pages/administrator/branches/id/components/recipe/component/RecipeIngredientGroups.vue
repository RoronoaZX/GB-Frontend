<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    persistent
    position="right"
    backdrop-filter="blur(4px) saturate(150%)"
  >
    <q-card style="width: 700px; max-width: 120vw">
      <!-- {{ breadGroups }} -->
      <q-card-section class="row bg-backgroud text-h6">
        <div class="text-h6 text-white">
          {{ capitalizeFirstLetter(ingredientGroups.name) }}
        </div>
        <q-space />
        <div>
          <q-btn icon="arrow_forward_ios" flat dense round v-close-popup />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6" align="center">Ingredients List</div>
      </q-card-section>
      <q-card-section>
        <q-list dense separator class="box">
          <q-item>
            <q-item-section>
              <q-item-label class="text-overline"
                >Raw Materials Name</q-item-label
              >
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-overline">Code</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-overline">Quantity</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-overline">PPG</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label class="text-overline"> TCPI </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-for="(ingredient, index) in ingredientGroups.ingredient_groups"
            :key="index"
          >
            <q-item-section>
              <q-item-label class="text-caption">
                {{ ingredient.ingredient_name || "0.00000" }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-caption">
                {{ ingredient.code || "0.00000" }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-caption">
                {{ formatQuantity(ingredient) || "0.00000" }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-caption">
                {{ formatPrice(ingredient.price_per_gram) || "0.00000" }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label class="text-caption">
                {{ calculateTotalCostPerIngredient(ingredient) }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <!-- ✅ Overall total section -->
        <div class="q-mt-md text-right text-subtitle1">
          <strong>Total Cost:</strong>
          {{ calculateTotalCost(ingredientGroups) }}
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";

import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter } = typographyFormat();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps(["ingredientGroups"]);
console.log("ingredientGroupsss", props.ingredientGroups);

const formatQuantity = (ingredient) => {
  const formattedQuantity = Number(ingredient.quantity) || 0; // Convert to a number, fallback to 0
  const unit = ingredient.unit || ""; // Ensure unit is a string

  if (formattedQuantity > 1000) {
    const formattedQuantityInKg = parseFloat(
      (formattedQuantity / 1000).toFixed(3)
    ); // Remove trailing zeros
    return `${formattedQuantityInKg} kg`;
  } else if (formattedQuantity > 1) {
    return `${parseFloat(formattedQuantity.toFixed(3))} ${unit}`; // ${unit ? "s" : ""} Pluralize unit
  } else {
    return `${parseFloat(formattedQuantity.toFixed(3))} ${unit}`; // Keep decimal formatting
    //
  }
};

const formatPrice = (value) => {
  if (value == null || isNaN(value)) return "0.00";

  // Convert to number first
  const num = Number(value);

  // Format with comma separators

  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  });
};

// ✅ Calculate total cost of all price_per_gram
const calculateTotalCostPerIngredient = (ingredient) => {
  const quantity = parseFloat(ingredient.quantity) || 0;
  const pricePerGram = parseFloat(ingredient.price_per_gram) || 0;
  const total = quantity * pricePerGram;

  return `₱${parseFloat(total.toFixed(4)).toLocaleString("en-PH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  })}`;
};
// ✅ Calculate total cost of all price_per_gram
const calculateTotalCost = (group) => {
  if (!group || !group.ingredient_groups) return "₱0.00";

  const total = group.ingredient_groups.reduce((sum, ing) => {
    const quantity = parseFloat(ing.quantity) || 0;
    const pricePerGram = parseFloat(ing.price_per_gram) || 0;
    return sum + quantity * pricePerGram; // ✅ Correct summation
  }, 0);

  return `₱${total.toFixed(2).toLocaleString("en-PH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
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
