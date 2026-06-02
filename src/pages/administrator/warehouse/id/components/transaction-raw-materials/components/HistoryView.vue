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

function formatQuantity(row) {
  const quantity = Number(row?.quantity) || 0;
  const unit = row?.raw_materials?.unit || "Undefined";
  const deliveryUnit = row?.raw_materials?.delivery_unit;
  const unitWeight = Number(row?.raw_materials?.unit_weight) || 0;
  const unitPcs = Number(row?.raw_materials?.unit_pcs) || 0;

  const formatNumber = (value) => {
    const num = Number(value);
    return Number.isInteger(num) ? num : num.toFixed(2);
  };

  // 1. Use custom delivery unit if available
  if (deliveryUnit) {
    if (unitWeight > 0) {
      const units = quantity / unitWeight;
      return `${formatNumber(units)} ${deliveryUnit}${units > 1 ? 's' : ''}`;
    } else if (unitPcs > 0) {
      const units = quantity / unitPcs;
      return `${formatNumber(units)} ${deliveryUnit}${units > 1 ? 's' : ''}`;
    }
  }

  // 2. Fallback to standard conversion logic (Kilos/Grams/Pcs)
  if (quantity >= 1000 && unit === "Grams") {
    const quantityKilo = quantity / 1000;
    return `${formatNumber(quantityKilo)} kilos`;
  }

  return `${formatNumber(quantity)} ${unit}`;
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
    field: (row) => formatQuantity(row),
  },
];
</script>
