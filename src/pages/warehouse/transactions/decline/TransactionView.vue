<template>
  <div>
    <q-dialog ref="dialogRef" v-model="dialog" @hide="onDialogHide">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="row justify-between">
            <div class="text-h6">{{ report.name }}</div>
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
          <div>Baker: {{ formatFullname(report.employee) }}</div>
          <div>
            Branch:
            {{ report.branch_premix.branch_recipe.branch.name }}
          </div>
          <div>
            Status:
            <q-badge color="red-6" outlined> {{ report.status }} </q-badge>
          </div>
        </q-card-section>
        <q-card-section class="q-gutter-y-md">
          <div>
            <div class="text-h6" align="center">Premix</div>
            <q-list dense separator class="box">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-overline">Premix Name</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-overline"
                    >Request Quantity / kgs</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h6">
                    {{ report.name }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-h6">
                    {{ formatRequestQuantity(report.quantity) }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div>
            <div class="text-h6" align="center">Ingredients List</div>
            <q-list dense separator class="box">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-overline"> Code</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-overline"> Name</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-overline">Quantity</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-for="(ingredients, index) in ingrdientsData"
                :key="index"
              >
                <q-item-section>
                  <q-item-label class="text-subtitle1">
                    {{ ingredients.ingredient.code }}
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle1" align="left">
                    {{ ingredients.ingredient.name }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-subtitle1">
                    {{
                      formatQuantity(
                        ingredients.quantity * report.quantity,
                        ingredients.ingredient.unit
                      )
                    }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDialogPluginComponent } from "quasar";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`;
};

const formatRequestQuantity = (quantity) => {
  const num = Number(quantity); // Convert to number
  if (isNaN(num)) return ""; // Handle invalid values

  if (num % 1 === 0) {
    return num.toString(); // Whole numbers (remove decimals)
  }
  return num.toString(); // Keep decimals as is
};

const formatQuantity = (quantity, unit) => {
  if (unit === "Pcs") {
    return `${quantity} pcs`; // Keep as is for pieces
  }

  if (unit === "Grams") {
    if (quantity >= 1000) {
      let kg = quantity / 1000;
      let formattedKg =
        kg % 1 === 0 ? kg.toString() : kg.toString().replace(/^0+/, "");
      return `${formattedKg} kgs`;
    }
    return `${quantity} g`;
  }

  return `${quantity} ${unit}`; // Default case if unit is different
};

const ingrdientsData =
  props.report?.branch_premix?.branch_recipe?.ingredient_groups || "Undefined";
console.log("ingrdientsData", ingrdientsData);
</script>

<style lang="scss" scoped></style>
