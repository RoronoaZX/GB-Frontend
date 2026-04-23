<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    persistent
    position="right"
    backdrop-filter="blur(4px) saturate(150%)"
  >
    <q-card style="width: 820px; max-width: 80vw">
      <q-card-section class="row bg-background text-h6">
        <div class="text-h6 text-white">
          {{ capitalizeFirstLetter(props.row.recipe_name || "N/A") }}
        </div>
        <q-space />
        <div>
          <q-btn icon="arrow_forward_ios" flat dense round v-close-popup />
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          flat
          dense
          :rows="props.row.items || []"
          :columns="ingredientColumns"
          row-key="raw_material_name"
          hide-pagination
          :rows-per-page-options="[0]"
          class="ingredients-table"
        >
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-badge
                :color="props.value === 'confirmed' ? 'positive' : 'warning'"
                rounded
              >
                {{ props.value }}
              </q-badge>
            </q-td>
          </template>
        </q-table>
      </q-card-section>

      <q-card-section class="row items-center q-pt-md">
        <q-space />
        <div class="text-subtitle1">
          <span class="text-grey-7">Total Recipe Cost: </span>
          <span class="text-weight-bold text-primary text-h6">
            {{ formatPrice(props.row.recipe_total_cost || 0) }}
          </span>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useDialogPluginComponent } from "quasar";

import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatPrice } = typographyFormat();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
});

console.log("props", props.row);

const ingredientColumns = [
  {
    name: "name",
    label: "Raw Material",
    align: "left",
    field: (row) => capitalizeFirstLetter(row.raw_material_name),
  },
  {
    name: "status",
    label: "Status",
    align: "center",
    field: "status",
  },
  {
    name: "quantity",
    label: "Qty Used",
    align: "center",
    field: (row) => row.quantity_used,
  },
  {
    name: "ppg",
    label: "Price/Gram",
    align: "right",
    field: (row) => formatPrice(row.price_per_gram),
  },
  {
    name: "subtotal",
    label: "Subtotal",
    align: "right",
    field: (row) => formatPrice(row.total_cost),
    classes: "text-weight-bold",
  },
];
</script>

<style scoped>
.bg-background {
  background: linear-gradient(to right, #4b0082, #800080, #9932cc, #d8bfd8);
}

.ingredients-table :deep(.q-table__card) {
  box-shadow: none;
}

.ingredients-table :deep(thead tr th) {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #f5f5f5;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 11px;
}
</style>
