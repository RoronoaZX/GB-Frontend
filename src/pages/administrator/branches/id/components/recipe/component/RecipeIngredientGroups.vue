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
        <div
          v-for="(ingredient, index) in ingredientGroups.ingredient_groups"
          :key="index"
        >
          <div class="row">{{ ingredient }}</div>
        </div>
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
</script>

<style lang="scss" scoped>
.bg-backgroud {
  background: linear-gradient(to right, #4b0082, #800080, #9932cc, #d8bfd8);
}
</style>
