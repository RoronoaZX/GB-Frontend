<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    persistent
    position="right"
    backdrop-filter="blur(4px) saturate(150%)"
  >
    <q-card style="width: 500px; max-width: 120vw">
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
            <q-item-section side>
              <q-item-label class="text-overline">Quantity</q-item-label>
            </q-item-section>
            <!-- <q-item-section>
                  <q-item-label class="text-overline">Unit</q-item-label>
                </q-item-section> -->
          </q-item>
          <q-item
            v-for="(ingredient, index) in ingredientGroups.ingredient_groups"
            :key="index"
          >
            <q-item-section>
              <q-item-label class="text-caption">
                {{ ingredient.ingredient_name }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-caption">
                {{ ingredient.code }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label class="text-caption">
                {{ formatQuantity(ingredient) }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <!-- <div
          v-for="(ingredient, index) in ingredientGroups.ingredient_groups"
          :key="index"
        >
          <div class="row">{{ ingredient }}</div>
        </div> -->
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps(["ingredientGroups"]);
console.log("ingredientGroups", props.ingredientGroups);

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

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

// const formatQuantity = (ingredient) => {
//   const formattedQuantity = ingredient.quantity || 0; // Access quantity directly
//   const unit = ingredient.unit || ""; // Access unit directly

//   if (formattedQuantity > 1000) {
//     const formattedQuantityInKg = parseFloat(
//       (formattedQuantity / 1000).toFixed(3)
//     ); // Remove trailing zeros
//     return `${formattedQuantityInKg} kg`;
//   } else if (formattedQuantity > 1) {
//     return `${formattedQuantity.toFixed(3)} ${unit}${unit ? "s" : ""}`; // Pluralize unit
//   } else {
//     return `${formattedQuantity.toFixed(3)} ${unit}`; // Keep decimal formatting
//   }
// };

// const formatQuantity = (ingredient) => {
//   const formattedQuantity = ingredient.quantity || 0; // Access `quantity` directly
//   const unit = ingredient.unit || ""; // Access `unit` directly

//   if (formattedQuantity > 1000) {
//     const formattedQuantityInKg = (formattedQuantity / 1000).toFixed(3);
//     if (formattedQuantityInKg.endsWith(".000")) {
//       return `${Math.round(formattedQuantity / 1000)} kg`;
//     } else {
//       return `${formattedQuantityInKg} kg`;
//     }
//   } else if (formattedQuantity > 1) {
//     return `${formattedQuantity} ${unit}`; // ${unit ? "s" : ""} Pluralize unit if applicable
//   } else {
//     return `${formattedQuantity} ${unit}`;
//   }
// };
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
