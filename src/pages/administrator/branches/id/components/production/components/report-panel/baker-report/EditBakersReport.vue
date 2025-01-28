<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section class="row bg-backgroud text-h6">
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
      <!-- sales_report_id:{{ sales_report_id }} -->
      <q-card-section class="row q-gutter-x-xl">
        <!-- Left Section -->
        <div>
          <!-- Targets and Actuals -->
          <div class="row q-gutter-sm">
            <div>
              Target Pcs
              <q-input
                readonly
                v-model="editBakerReport.target"
                outlined
                type="number"
                dense
                style="width: 100px; max-width: 300px; min-width: 50px"
              />
            </div>
            <div>
              Actual Target
              <q-input
                readonly
                v-model="editBakerReport.actual_target"
                outlined
                dense
                style="width: 100px; max-width: 300px; min-width: 50px"
              />
            </div>
          </div>

          <div class="row q-mt-sm q-gutter-sm">
            <div>
              Short
              <q-input
                readonly
                v-model="editBakerReport.short"
                outlined
                type="number"
                dense
                style="width: 100px; max-width: 300px; min-width: 50px"
              />
            </div>
            <div>
              Over
              <q-input
                readonly
                v-model="editBakerReport.over"
                outlined
                dense
                style="width: 100px; max-width: 300px; min-width: 50px"
              />
            </div>
          </div>

          <div>
            <div class="q-mt-sm">Kilo</div>
            <q-input
              outlined
              v-model="editBakerReport.kilo"
              dense
              type="number"
              style="width: 210px; max-width: 300px; min-width: 50px"
            />
          </div>

          <!-- Combined Bakers Reports -->
          <div class="q-mt-xl q-gutter-md">
            <div v-if="bakerReports.combined_bakers_reports.length">
              <div
                v-for="(breads, index) in bakerReports.combined_bakers_reports"
                :key="index"
                class="q-my-md"
              >
                <q-separator class="q-ma-md"></q-separator>
                <div class="q-mx-sm">
                  {{ breads.bread.name }}
                </div>
                <q-input
                  outlined
                  v-model="breads.bread_production"
                  dense
                  type="numbers"
                  suffix="pcs"
                  style="width: 210px; max-width: 300px; min-width: 50px"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Right Section -->
        <div>
          <div class="text-h6" align="center">Ingredients List</div>
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
            </q-item>
            <q-item
              v-for="(ingredient, index) in recalculatedIngredients"
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
        </div>
      </q-card-section>
      <q-card-actions class="row q-px-lg q-py-sm q-pt-none" align="right">
        <q-btn class="glossy" color="grey-9" label="Dismiss" v-close-popup />
        <q-btn
          class="glossy"
          color="teal"
          label="Save"
          @click="saveEditedBakerReport"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Notify, useDialogPluginComponent } from "quasar";
import { reactive, watch, computed } from "vue";
import { useProductionStore } from "stores/production";

const productionStore = useProductionStore();
const { dialogRef, onDialogHide } = useDialogPluginComponent();
const props = defineProps(["bakerReports", "sales_report_id"]);
console.log("bakers report", props.bakerReports);

const editBakerReport = reactive({
  target: 0,
  actual_target: 0,
  short: 0,
  over: 0,
  kilo: 0,
});

const recalculatedIngredients = computed(() =>
  props.bakerReports.ingredient_bakers_reports.map((ingredient) => {
    const originalKilo = parseFloat(props.bakerReports.kilo) || 1;
    const currentKilo = parseFloat(editBakerReport.kilo) || 1;

    const baseQuantity = ingredient.quantity / originalKilo;
    const calculatedQuantity = baseQuantity * currentKilo;

    return {
      ...ingredient,
      quantity: calculatedQuantity.toFixed(3), // Keep 3 decimal places
    };
  })
);

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

const formatTarget = (target) => {
  // Ensure the target is a number and default to 0 if undefined or null
  const numericTarget = Number(target) || 0;

  // Use parseFloat to remove trailing zeros if the value is decimal
  return parseFloat(numericTarget.toFixed(3)).toString();
};
const formatKilo = (target) => {
  // Ensure the target is a number and default to 0 if undefined or null
  const numericTarget = Number(target) || 0;

  // Use parseFloat to remove trailing zeros if the value is decimal
  return parseFloat(numericTarget.toFixed(3)).toString();
};

const totalBreadProduction = computed(() =>
  props.bakerReports.combined_bakers_reports.reduce(
    (sum, bread) => sum + (parseFloat(bread.bread_production) || 0),
    0
  )
);

const calculateOverAndShort = () => {
  const totalProduction = totalBreadProduction.value;
  const actualTarget = parseFloat(editBakerReport.actual_target) || 0;

  if (totalProduction > actualTarget) {
    editBakerReport.over = totalProduction - actualTarget;
    editBakerReport.short = 0;
  } else {
    editBakerReport.short = actualTarget - totalProduction;
    editBakerReport.over = 0;
  }
};

// Watchers
watch(
  () => props.bakerReports,
  (newVal) => {
    if (newVal) {
      editBakerReport.target = formatTarget(newVal.target) || 0;
      editBakerReport.actual_target = newVal.actual_target || 0;
      editBakerReport.short = newVal.short || 0;
      editBakerReport.over = newVal.over || 0;
      editBakerReport.kilo = formatKilo(newVal.kilo) || 0;
    }
  },
  { immediate: true }
);

watch(
  () => editBakerReport.kilo,
  () => {
    const newKilo = parseFloat(editBakerReport.kilo) || 1;
    const target = parseFloat(editBakerReport.target) || 0;
    const newActualTarget = target * newKilo;

    // Round the actual target value up using Math.ceil
    editBakerReport.actual_target = formatTarget(Math.ceil(newActualTarget));
    calculateOverAndShort();
  }
);

watch(
  () => totalBreadProduction.value,
  () => calculateOverAndShort()
);
const saveEditedBakerReport = async () => {
  const reportId = props.bakerReports.id;
  const reportCategory =
    props.bakerReports?.branch_recipe?.recipe?.category || null;
  const status = props.bakerReports.status;
  const sales_report_id = props?.sales_report_id || null;

  const dataToSave = {
    initial_bakerreports_id: reportId,
    sales_report_id: sales_report_id,
    category: reportCategory,
    target: editBakerReport.target,
    actual_target: editBakerReport.actual_target,
    short: editBakerReport.short,
    over: editBakerReport.over,
    status: status,
    kilo: editBakerReport.kilo,
    combined_bakers_reports: props.bakerReports.combined_bakers_reports.map(
      (bread) => ({
        bread_id: bread.bread.id, // Assuming bread has an id
        bread_production: bread.bread_production,
      })
    ),
    recalculated_ingredients: recalculatedIngredients.value.map(
      (ingredient) => ({
        ingredients_id: ingredient.ingredients.id, // Assuming ingredient has an id
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      })
    ),
  };

  console.log("Edited Bakers Report", dataToSave);
  console.log("Edited Bakers Report", reportId);

  try {
    await productionStore.updateBakerReport(reportId, dataToSave);
    // Success notification
    Notify.create({
      type: "positive",
      message: "Baker report updated successfully!",
      position: "top",
    });
    onDialogHide();
  } catch (error) {
    console.error("Error updating baker report:", error);
    // Failure notification
    Notify.create({
      type: "negative",
      message: "Failed to update baker report. Please try again.",
      position: "top",
    });
  }
};
</script>

<style lang="scss" scoped>
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
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
