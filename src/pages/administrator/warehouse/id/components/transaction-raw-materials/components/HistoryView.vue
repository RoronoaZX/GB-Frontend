<template>
  <q-btn
    color="accent"
    icon="visibility"
    size="md"
    flat
    round
    dense
    @click="openDialog"
  />

  <q-dialog v-model="dialog">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="row justify-between">
          <div>
            <span class="text-caption">Supplier's Company Name: </span>
            <span class="text-caption text-weight-medium">
              {{
                capitalizeFirstLetter(report?.supplier_company_name) ||
                "Undefined"
              }}
            </span>
            <div class="text-subtitle1">
              <span class="text-caption"> Supplier's Name: </span>
              <span class="text-caption text-weight-medium">
                {{
                  capitalizeFirstLetter(report?.supplier_name) || "Undefined"
                }}
              </span>
            </div>
          </div>
          <q-btn
            class="close-btn"
            color="grey-8"
            flat
            round
            dense
            icon="close"
            @click="dialog = false"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          :rows="warehouseAddedStocks"
          :columns="warehouseAddedStocksColumns"
          flat
          bordered
        ></q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter } = typographyFormat();

const props = defineProps(["report"]);
const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const warehouseAddedStocks =
  props?.report?.warehouse_added_stocks || "Undefined";

function pluralize(unit, quantity) {
  const normalizedUnit = unit.toLowerCase();
  // Leave units like 'grams' as-is (already plural)
  if (["grams", "liters"].includes(normalizedUnit)) return normalizedUnit;
  return quantity === 1 ? normalizedUnit : normalizedUnit + "s";
}

function formatQuantity(quantity, unit) {
  if (!unit || quantity === undefined) return "Undefined";

  unit = unit.toLowerCase(); // normalize casing

  if (unit === "grams" && quantity >= 1000) {
    quantity = quantity / 1000;
    unit = "kilo";
  }

  if (unit === "kilo" && quantity >= 25) {
    quantity = quantity / 25;
    unit = "sack";
  }

  const pluralUnit = pluralize(unit, quantity);
  return `${quantity} ${pluralUnit}`;
}

const warehouseAddedStocksColumns = [
  {
    name: "code",
    label: "Raw Materials Code",
    align: "left",
    field: (row) => row?.raw_materials?.code || "Undefined",
  },
  {
    name: "rawMaterialsName",
    label: "Raw Materials Name",
    align: "left",
    field: (row) => row?.raw_materials?.name || "Undefined",
  },
  {
    name: "quantityWithUnit",
    label: "Quantity",
    align: "left",
    field: (row) => {
      const quantity = row?.quantity ?? 0;
      const unit = row?.raw_materials?.unit ?? "Undefined";
      return formatQuantity(quantity, unit);
    },
  },
];
</script>
