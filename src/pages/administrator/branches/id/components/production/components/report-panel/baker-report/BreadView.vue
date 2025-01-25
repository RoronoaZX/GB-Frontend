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
        <div class="text-h6" align="center">Bread List</div>
      </q-card-section>
      <q-card-section>
        <q-list dense separator class="box">
          <q-item>
            <q-item-section>
              <q-item-label class="text-overline">Bread Name</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label class="text-overline text-center"
                >Pieces</q-item-label
              >
            </q-item-section>
            <!-- <q-item-section>
                  <q-item-label class="text-overline">Unit</q-item-label>
                </q-item-section> -->
          </q-item>
          <q-item v-for="(breads, index) in breadProduction" :key="index">
            <q-item-section>
              <q-item-label class="text-caption">
                {{ capitalizeFirstLetter(breads?.bread?.name) }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label class="text-caption text-center">
                {{ `${breads?.bread_production} ` }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <!-- <q-table :rows="breadProduction" :columns="BreadReportsColumns">
      </q-table> -->
      <!-- {{ reports }} -->
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { computed, ref } from "vue";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps(["breadProduction", "branchRecipe"]);
console.log("breadReportsaaasss", props.breadProduction);

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// const BreadReportsColumns = [
//   {
//     name: "bread_name",
//     label: "Bread Name",
//     align: "left",
//     field: (row) => {
//       console.log("Row data:", row); // Debug each row's data
//       return row.bread.name || "N/A"; // Adjust this according to your data
//     },
//     format: (val) => capitalizeFirstLetter(val),
//   },
//   {
//     name: "production",
//     label: "Production",
//     align: "center",
//     field: (row) => row.bread_production || row.filling_production || "0",
//   },
// ];
</script>

<style lang="scss" scoped>
.gradient-tooltip {
  background: linear-gradient(135deg, #2c3e50, #4398f4); /* Gradient colors */
  color: white; /* Ensure text is visible */
  border-radius: 4px; /* Optional: Rounded corners for a smoother look */
  padding: 8px; /* Optional: Add padding for better spacing */
  font-size: 14px; /* Optional: Adjust font size if needed */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Subtle shadow for a polished look */
}
.bg-backgroud {
  background: linear-gradient(to right, #8b4513, #a0522d, #d2691e, #f4a460);
}
.gradient-icon {
  font-size: 24px; /* Adjust size as needed */
  background: linear-gradient(to right, #8b4513, #a0522d, #d2691e, #f4a460);
  // background: linear-gradient(135deg, #2c3e50, #4398f4); /* Gradient colors */
  -webkit-background-clip: text; /* For compatibility */
  background-clip: text;
  color: transparent; /* Make text fill transparent */
  display: inline-block; /* Ensure proper display */
}
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
