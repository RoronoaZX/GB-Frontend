<template>
  <q-btn class="gradient-icon" flat rounded @click="openDialog">
    <q-icon name="visibility" class="gradient-icon" />
  </q-btn>
  <q-dialog v-model="dialog">
    <q-card padding style="width: 700px; max-width: 80vw">
      <q-card-section class="bg-gradient text-white row justify-between">
        <div class="text-h6">Selecta Products</div>
        <div>
          <q-btn icon="close" flat dense round v-close-popup />
        </div>
      </q-card-section>
      <q-card-section>
        <div>Remarks: {{ report.remark ? report.remark : "N/A" }}</div>
        <div>Status: {{ report.status }}</div>
      </q-card-section>
      <q-card-section>
        <q-list dense separator class="box">
          <!-- Header row inside the q-list -->
          <q-item>
            <q-item-section>
              <q-item-label class="text-overline">Product Name</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label class="text-overline">Added Stocks</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-for="(selectaProduct, index) in report.selecta_added_stocks"
            :key="index"
          >
            <q-item-section>
              <q-item-label class="text-caption">{{
                capitalizeFirstLetter(selectaProduct.product.name)
              }}</q-item-label>
            </q-item-section>
            <q-item-section class="text-caption" side>
              {{ selectaProduct.added_stocks }} pcs
            </q-item-section>
            <!-- <q-item-section side>
              <q-btn
                @click="removeSelectaProduct(index)"
                color="grey-10"
                icon="backspace"
                dense
                flat
                round
              />
            </q-item-section> -->
          </q-item>
        </q-list>
      </q-card-section>
      <!-- {{ report }} -->
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const props = defineProps(["report"]);

console.log("report", props.report);
const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
</script>

<style lang="scss" scoped>
.bg-gradient {
  // background: linear-gradient(135deg, #6a11cb, #2575fc);
  background: linear-gradient(135deg, #2c3e50, #4ca1af);
  // background: linear-gradient(135deg, #8e44ad, #3498db);
}
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
.gradient-icon {
  font-size: 24px; /* Adjust size as needed */
  background: linear-gradient(135deg, #2c3e50, #4ca1af); /* Gradient colors */
  -webkit-background-clip: text; /* For compatibility */
  background-clip: text;
  color: transparent; /* Make text fill transparent */
  display: inline-block; /* Ensure proper display */
}
// .gradient-icon {
//   background: linear-gradient(45deg, #ff6f00, #ffcc00); /* Gradient colors */
//   -webkit-background-clip: text; /* For Safari and older WebKit-based browsers */
//   background-clip: text; /* Standard property */
//   color: transparent;
// }
</style>
