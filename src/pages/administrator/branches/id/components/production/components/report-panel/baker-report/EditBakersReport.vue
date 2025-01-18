<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section class="row bg-backgroud text-h6">
        <!-- {{ bakerReports }} -->
        <div class="text-h6 text-dark">
          {{
            `${capitalizeFirstLetter(
              bakerReports?.branch_recipe?.recipe?.name
            )} - ${bakerReports?.branch_recipe?.recipe?.category}`
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
        {{ bakerReports }}
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps(["bakerReports"]);
console.log("BakerReports edit data", props.bakerReports);

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
  // Sunset Glow
  // background: linear-gradient(135deg, #ff7e5f, #feb47b);
  // Ocean Breeze
  // background: linear-gradient(135deg, #00c6ff, #0072ff);
  // Lush Greenery
  // background: linear-gradient(135deg, #56ab2f, #a8e063);
  //  Royal Purple
  // background: linear-gradient(135deg, #654ea3, #eaafc8);
  // Peachy Pink
  background: linear-gradient(135deg, #fbc2eb, #a6c1ee);
  // Deep Space
  // background: linear-gradient(135deg, #434343, #000000);
  // Blue Lagoon
  // background: linear-gradient(135deg, #43cea2, #185a9d);
  // Soft Lavender
  // background: linear-gradient(135deg, #c471ed, #f64f59);
  // Golden Hour
  // background: linear-gradient(135deg, #ff9966, #ff5e62);
}
</style>
