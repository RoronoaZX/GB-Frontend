<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section class="row bg-backgroud text-h6">
        <div class="text-h6 text-white">
          {{
            `${capitalizeFirstLetter(branchRecipe?.recipe?.name)} - ${
              branchRecipe?.recipe?.category
            }`
          }}
        </div>
        <q-space />
        <div>
          <q-btn icon="close" flat dense round v-close-popup>
            <q-tooltip class="bg-blue-grey-6" :delay="200">Close</q-tooltip>
          </q-btn>
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
            v-for="(ingredient, index) in ingredientProduction"
            :key="index"
          >
            <q-item-section>
              <q-item-label class="text-caption">
                {{ ingredient.ingredients.name }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-caption">
                {{ ingredient.ingredients.code }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label class="text-caption">
                {{ formatQuantity(ingredient) }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps(["ingredientProduction", "branchRecipe"]);
console.log("ingredientProduction", props.ingredientProduction);

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

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
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
