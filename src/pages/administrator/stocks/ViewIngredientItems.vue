<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    persistent
    backdrop-filter="blur(4px) saturate(150%)"
  >
    <q-card style="width: 820px; max-width: 80vw">
      <q-card-section class="row bg-background text-h6">
        <div class="text-h6 text-white">
          {{ capitalizeFirstLetter(row.supplier_name || "N/A") }}
        </div>
        <q-space />
        <div>
          <q-btn icon="arrow_forward_ios" flat dense round v-close-popup />
        </div>
      </q-card-section>
      <q-card-section>
        <div>
          Status:
          <q-chip :color="getStatusColor(row.status)" outline square dense>
            {{ capitalizeFirstLetter(row.status) || "N/A" }}
          </q-chip>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6" align="center">Ingredients List</div>
      </q-card-section>
      <q-card-section>
        <q-list dense separator class="box">
          <q-item>
            <q-item-section>
              <q-item-label class="text-overline">
                Raw Materials Name
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-overline"> Code </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-overline"> Quantity </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-overline"> TCPI </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label class="text-overline"> Total Cost </q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-for="(ingredient, index) in props.row.supplier_ingredients"
            :key="index"
          >
            <q-item-section>
              <q-item-label class="text-caption">
                {{ ingredient.raw_materials?.name || "N/A" }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-caption">
                {{ ingredient.raw_materials?.code || "N/A" }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-caption">
                {{ parseFloat(ingredient.quantity || "N/A") }}
                {{ ingredient.category || "" }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-caption">
                {{
                  formatPrice(parseFloat(ingredient.price_per_unit || "N/A"))
                }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label class="text-caption">
                {{ formatPrice(calculateTotalCost(ingredient) || "N/A") }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section class="q-mt-md text-right text-subtitle1">
        <strong>Total Cost:</strong>
        {{
          formatPrice(
            calculateOverallTotalCost(props.row.supplier_ingredients) || "₱0.00"
          )
        }}
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent, date as quasarDate } from "quasar";
import { typographyFormat } from "src/composables/typography/typography-format";
import { badgeColor } from "src/composables/badge-color/badge-color";

const { capitalizeFirstLetter } = typographyFormat();
const { getStatusColor } = badgeColor();

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
});

console.log("props", props.row);

const formatPrice = (value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return "₱0.00";
  return `₱${num.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const calculateTotalCost = (ingredient) => {
  const quantity = parseFloat(ingredient.quantity) || 0;
  const pricePerUnit = parseFloat(ingredient.price_per_unit) || 0;
  return quantity * pricePerUnit;
};

const calculateOverallTotalCost = (ingredient) => {
  const total = ingredient.reduce((sum, ing) => {
    const quantity = parseFloat(ing.quantity) || 0;
    const pricePerUnit = parseFloat(ing.price_per_unit) || 0;
    return sum + quantity * pricePerUnit;
  }, 0);

  return total;
};
</script>

<style scoped>
.bg-background {
  background: linear-gradient(to right, #4b0082, #800080, #9932cc, #d8bfd8);
}

.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
