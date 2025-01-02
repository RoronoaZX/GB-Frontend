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
          {{ capitalizeFirstLetter(breadGroups.name) }}
        </div>
        <q-space />
        <div>
          <q-btn icon="arrow_forward_ios" flat dense round v-close-popup />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6" align="center">Bread List</div>
      </q-card-section>
      <q-card-section>
        <div v-for="(bread, index) in breadGroups.bread_groups" :key="index">
          <div class="row" align="center">{{ bread }}</div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps(["breadGroups"]);

console.log("breadGroups", props.breadGroups);

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
  background: linear-gradient(to right, #8b4513, #a0522d, #d2691e, #f4a460);
}
</style>
