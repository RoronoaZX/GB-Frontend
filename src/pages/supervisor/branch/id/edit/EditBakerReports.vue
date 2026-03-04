<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    @cancel="onDialogCancel"
    :maximized="maximizedToggle"
    transition-show="slide-left"
    transition-hide="slide-right"
  >
    <q-card class="baker-report-dialog">
      <!-- Header -->
      <q-card-section class="bg-backgroud q-pa-md">
        <div class="row items-center">
          <q-icon name="bakery_dining" size="sm" class="q-mr-sm text-teal-8" />
          <div class="text-subtitle1 text-dark text-weight-medium">
            {{ formattedRecipeName }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </div>
      </q-card-section>

      <!-- Content -->
      <q-card-section class="q-pa-md scroll">
        <div class="row q-col-gutter-md">
          <!-- Left Column - Production Details -->
          <div class="col-12 col-md-6">
            <!-- Production Metrics Card -->
            <q-card flat bordered class="q-mb-md">
              <q-card-section class="q-pa-sm bg-grey-2">
                <div class="text-caption text-weight-medium text-grey-8">
                  <q-icon name="speed" size="xs" class="q-mr-xs" />
                  Production Overview
                </div>
              </q-card-section>

              <q-card-section class="q-pa-md">
                <div class="row q-col-gutter-sm">
                  <!-- Target Pcs -->
                  <div class="col-6">
                    <div class="text-caption text-grey-7 q-mb-xs">
                      Target Pcs
                    </div>
                    <q-input
                      readonly
                      v-model="editBakerReport.target"
                      outlined
                      dense
                      class="production-input"
                      bg-color="grey-1"
                    >
                      <template v-slot:append>
                        <q-icon name="adjust" size="xs" color="grey-6" />
                      </template>
                    </q-input>
                  </div>

                  <!-- Actual Target -->
                  <div class="col-6">
                    <div class="text-caption text-grey-7 q-mb-xs">
                      Actual Pcs
                    </div>
                    <q-input
                      readonly
                      v-model="editBakerReport.actual_target"
                      outlined
                      dense
                      class="production-input"
                      bg-color="grey-1"
                    >
                      <template v-slot:append>
                        <q-icon
                          name="check_circle"
                          size="xs"
                          color="positive"
                        />
                      </template>
                    </q-input>
                  </div>

                  <!-- Short -->
                  <div class="col-6">
                    <div class="text-caption text-grey-7 q-mb-xs">Short</div>
                    <q-input
                      readonly
                      v-model="editBakerReport.short"
                      outlined
                      dense
                      class="production-input"
                      bg-color="grey-1"
                    >
                      <template v-slot:append>
                        <q-icon
                          name="arrow_downward"
                          size="xs"
                          color="negative"
                        />
                      </template>
                    </q-input>
                  </div>

                  <!-- Over -->
                  <div class="col-6">
                    <div class="text-caption text-grey-7 q-mb-xs">Over</div>
                    <q-input
                      readonly
                      v-model="editBakerReport.over"
                      outlined
                      dense
                      class="production-input"
                      bg-color="grey-1"
                    >
                      <template v-slot:append>
                        <q-icon
                          name="arrow_upward"
                          size="xs"
                          color="positive"
                        />
                      </template>
                    </q-input>
                  </div>

                  <!-- Kilo (Editable) -->
                  <div class="col-12">
                    <div class="text-caption text-grey-7 q-mb-xs">
                      <q-icon name="scale" size="xs" class="q-mr-xs" />
                      Kilo
                    </div>
                    <q-input
                      outlined
                      v-model="editBakerReport.kilo"
                      dense
                      type="number"
                      step="0.1"
                      bg-color="white"
                      @update:model-value="formatKiloInput"
                    >
                      <template v-slot:append>
                        <span class="text-grey-6 text-overline">kg</span>
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-card-section>
            </q-card>

            <!-- Combined Bread Production -->
            <q-card
              v-if="bakerReports.combined_bakers_reports.length"
              flat
              bordered
              class="q-mb-md"
            >
              <q-card-section class="q-pa-sm bg-grey-2">
                <div class="text-caption text-weight-medium text-grey-8">
                  <q-icon name="widgets" size="xs" class="q-mr-xs" />
                  Bread Production Details
                </div>
                <q-space />
                <q-badge color="teal">
                  Total {{ totalBreadProduction }} pcs
                </q-badge>
              </q-card-section>

              <q-card-section class="q-pa-md">
                <div class="row q-col-gutter-sm">
                  <div
                    v-for="(
                      breads, index
                    ) in bakerReports.combined_bakers_reports"
                    :key="index"
                    class="col-12 col-sm-6"
                  >
                    <div class="text-caption text-grey-7 q-mb-xs">
                      {{ capitalizeFirstLetter(breads.bread.name || "Bread") }}
                    </div>
                    <q-input
                      outlined
                      v-model="breads.bread_production"
                      dense
                      type="number"
                      bg-color="white"
                    >
                      <template v-slot:append>
                        <span class="text-grey-6 text-overline">pcs</span>
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Right Column - Ingredients List -->
          <div class="col-12 col-md-6">
            <q-card flat bordered class="ingredients-card">
              <q-card-section class="q-pa-sm bg-grey-2">
                <div class="text-caption text-weight-medium text-grey-8">
                  <q-icon name="menu_book" size="xs" class="q-mr-xs" />
                  Ingredients List
                  <q-badge
                    v-if="recalculatedIngredients.length"
                    color="teal"
                    floating
                    transparent
                  >
                    {{ recalculatedIngredients.length }}
                  </q-badge>
                </div>
              </q-card-section>

              <q-card-section class="q-pa-none">
                <q-list separator>
                  <q-item class="bg-grey-1">
                    <q-item-section class="col-5">
                      <q-item-label class="text-overline"
                        >Ingredient</q-item-label
                      >
                    </q-item-section>
                    <q-item-section class="col-3">
                      <q-item-label class="text-overline">Code</q-item-label>
                    </q-item-section>
                    <q-item-section side class="col-4">
                      <q-item-label class="text-overline text-right"
                        >Qty</q-item-label
                      >
                    </q-item-section>
                  </q-item>

                  <q-item
                    v-for="(ingredient, index) in recalculatedIngredients"
                    :key="index"
                    class="ingredient-item"
                  >
                    <q-item-section class="col-5">
                      <q-item-label class="text-caption text-wrap">
                        {{ ingredient.ingredients.name }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section class="col-3">
                      <q-item-label class="text-caption">
                        {{ ingredient.ingredients.code }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side class="col-4">
                      <q-item-label
                        class="text-caption text-weight-medium text-right"
                      >
                        {{ formatQuantity(ingredient) }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>

      <!-- Actions -->
      <q-card-actions class="q-pa-md bg-grey-1">
        <q-space />
        <q-btn
          flat
          label="Cancel"
          color="grey-7"
          v-close-popup
          class="q-mr-sm"
          size="md"
        />
        <q-btn
          unelevated
          label="Save Changes"
          color="teal"
          @click="saveEditedBakerReport"
          size="md"
          :disable="!hasChanges"
        >
          <template v-slot:loading>
            <q-spinner-dots />
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Notify, useDialogPluginComponent } from "quasar";
import { reactive, watch, computed, ref } from "vue";
import { useProductionStore } from "stores/production";

import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, trimTrailingZeros } = typographyFormat();

const productionStore = useProductionStore();
const { dialogRef, onDialogHide } = useDialogPluginComponent();
const props = defineProps(["bakerReports", "sales_report_id"]);

console.log("porpssdsf..", props);

const maximizedToggle = ref(true);

// Track changes for save button state
const hasChanges = ref(false);

const editBakerReport = reactive({
  target: 0,
  actual_target: 0,
  short: 0,
  over: 0,
  kilo: 0,
});

const formatKiloInput = (value) => {
  if (value === null || value === "") return;

  // Convert to number and remove trailing zeros
  const numValue = Number(value);
  if (!isNaN(numValue)) {
    // Check if it's a whole number (no decimal part)
    if (Number.isInteger(numValue)) {
      editBakerReport.kilo = numValue;
    } else {
      // For decimal numbers, remove trailing zeros
      const formattedValue = parseFloat(numValue.toFixed(3)).toString();
      editBakerReport.kilo = formattedValue;
    }
  }
};

// Computed properties
const formattedRecipeName = computed(() => {
  if (!props.bakerReports?.branch_recipe?.recipe?.name) return "";
  return capitalizeFirstLetter(
    `${props.bakerReports.branch_recipe.recipe.name} - ${props.bakerReports.branch_recipe.recipe.category}`
  );
});

const recalculatedIngredients = computed(() => {
  if (!props.bakerReports?.ingredient_bakers_reports) return [];

  return props.bakerReports.ingredient_bakers_reports.map((ingredient) => {
    const originalKilo = parseFloat(props.bakerReports.kilo) || 1;
    const currentKilo = parseFloat(editBakerReport.kilo) || 1;

    const baseQuantity = ingredient.quantity / originalKilo;
    const calculatedQuantity = baseQuantity * currentKilo;

    return {
      ...ingredient,
      quantity: calculatedQuantity.toFixed(3),
    };
  });
});

const formatQuantity = (ingredient) => {
  const formattedQuantity = Number(ingredient.quantity) || 0;
  let unit = (ingredient.unit || "").toLowerCase();

  // Normalize grams to "g"
  if (unit === "grams" || unit === "gram" || unit === "g") {
    unit = "g";
  }

  // Convert to kg if grams and greater than 1000
  if (unit === "g" && formattedQuantity >= 1000) {
    const formattedQuantityInKg = parseFloat(
      (formattedQuantity / 1000).toFixed(3)
    );
    return `${formattedQuantityInKg} kg`;
  }

  return `${parseFloat(formattedQuantity.toFixed(3))} ${unit}`;
};

const formatTarget = (target) => {
  const numericTarget = Number(target) || 0;
  return numericTarget.toFixed(0);
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
      editBakerReport.kilo = newVal.kilo || 0;
      hasChanges.value = false;
    }
  },
  { immediate: true }
);

watch(
  () => editBakerReport.kilo,
  (newVal, oldVal) => {
    if (newVal !== oldVal) hasChanges.value = true;

    const newKilo = parseFloat(editBakerReport.kilo) || 1;
    const target = parseFloat(editBakerReport.target) || 0;
    const newActualTarget = target * newKilo;

    editBakerReport.actual_target = Math.ceil(newActualTarget).toFixed(0);
    calculateOverAndShort();
  }
);

watch(
  () => totalBreadProduction.value,
  (newVal, oldVal) => {
    if (newVal !== oldVal) hasChanges.value = true;
    calculateOverAndShort();
  }
);

// Methods
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
        bread_id: bread.bread.id,
        bread_production: bread.bread_production,
      })
    ),
    recalculated_ingredients: recalculatedIngredients.value.map(
      (ingredient) => ({
        ingredients_id: ingredient.ingredients.id,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      })
    ),
  };

  try {
    await productionStore.updateBakerReport(reportId, dataToSave);
    Notify.create({
      type: "positive",
      message: "Baker report updated successfully!",
      position: "top",
      timeout: 2000,
    });
    onDialogHide();
  } catch (error) {
    console.error("Error updating baker report:", error);
    Notify.create({
      type: "negative",
      message: "Failed to update baker report. Please try again.",
      position: "top",
      timeout: 3000,
    });
  }
};
</script>

<style lang="scss" scoped>
.baker-report-dialog {
  width: 900px;
  max-width: 95vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  border-radius: 12px;

  @media (max-width: 600px) {
    height: 100vh;
    max-width: 100vw;
    border-radius: 0;
  }
}

.scroll {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.production-input {
  :deep(.q-field__control) {
    height: 40px;
  }
}

.ingredients-card {
  height: 100%;

  :deep(.q-list) {
    max-height: 400px;
    overflow-y: auto;

    @media (max-width: 600px) {
      max-height: 300px;
    }
  }
}

.ingredient-item {
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
}

.text-wrap {
  white-space: normal;
  word-break: break-word;
  line-height: 1.3;
}
</style>
