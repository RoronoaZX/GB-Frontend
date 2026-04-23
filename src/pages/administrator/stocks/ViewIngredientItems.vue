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
        <q-table
          :rows="props.row.supplier_ingredients"
          :columns="ingredientColumns"
          row-key="id"
          flat
          bordered
          dense
          hide-bottom
          :pagination="{ rowsPerPage: 0 }"
          class="ingredient-table"
        >
          <template v-slot:header="props">
            <q-tr :props="props" class="bg-grey-2 text-weight-bold">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body-cell-quantity="props">
            <q-td :props="props">
              {{ parseFloat(props.value) }} {{ props.row.category || "" }}
            </q-td>
          </template>

          <template v-slot:body-cell-price_per_unit="props">
            <q-td :props="props">
              {{ formatPrice(props.value) }}
            </q-td>
          </template>

          <template v-slot:body-cell-total_cost="props">
            <q-td :props="props" class="text-weight-bold text-primary">
              {{ formatPrice(calculateTotalCost(props.row)) }}
            </q-td>
          </template>
        </q-table>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="row justify-end items-center q-gutter-sm">
          <div class="text-subtitle1 text-grey-7">Overall Delivery Total:</div>
          <div class="text-h5 text-weight-bolder text-primary">
            {{ formatPrice(calculateOverallTotalCost(props.row.supplier_ingredients)) }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { typographyFormat } from "src/composables/typography/typography-format";
import { badgeColor } from "src/composables/badge-color/badge-color";

const { capitalizeFirstLetter, formatPrice } = typographyFormat();
const { getStatusColor } = badgeColor();

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
});

const ingredientColumns = [
  {
    name: "name",
    label: "Raw Materials Name",
    align: "left",
    field: (row) => row.raw_materials?.name || "N/A",
  },
  {
    name: "code",
    label: "Code",
    align: "left",
    field: (row) => row.raw_materials?.code || "N/A",
  },
  {
    name: "quantity",
    label: "Quantity",
    align: "center",
    field: "quantity",
  },
  {
    name: "price_per_unit",
    label: "Price/Unit",
    align: "right",
    field: "price_per_unit",
  },
  {
    name: "total_cost",
    label: "Total Cost",
    align: "right",
  },
];

const calculateTotalCost = (ingredient) => {
  const quantity = parseFloat(ingredient.quantity) || 0;
  const pricePerUnit = parseFloat(ingredient.price_per_unit) || 0;
  return quantity * pricePerUnit;
};

const calculateOverallTotalCost = (ingredients) => {
  return ingredients.reduce((sum, ing) => {
    return sum + calculateTotalCost(ing);
  }, 0);
};
</script>

<style scoped>
.bg-background {
  background: linear-gradient(135deg, #1e293b, #334155);
}

.ingredient-table {
  background: #fafafa;
}
</style>
