<template>
  <q-dialog ref="dialogRef" v-model="dialog" @hide="onDialogHide">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section class="emphasized-header">
        <div class="row justify-between">
          <div class="text-h6">
            {{ capitalizeFirstLetter(report.name) || "-" }}
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
        <div>Baker: {{ formatFullname(report.employee) || "-" }}</div>
        <div>
          Branch:
          {{
            capitalizeFirstLetter(
              report.branch_premix.branch_recipe.branch.name
            ) || "-"
          }}
        </div>
        <div>
          Status:
          <q-badge color="primary" outlined>
            {{ capitalizeFirstLetter(report.status) || "-" }}
          </q-badge>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6" align="center">Premix</div>
      </q-card-section>
      <q-card-section class="q-gutter-y-md">
        <div>
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
                  {{ capitalizeFirstLetter(report.name) || "-" }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label class="text-h6">
                  {{ formatRequestQuantity(report.quantity) || "-" }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div>
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
                v-for="(ingredients, index) in computedIngredients"
                :key="index"
              >
                <q-item-section>
                  <q-item-label class="text-subtitle1">
                    {{ ingredients.ingredient.code }}
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle1" align="left">
                    {{
                      capitalizeFirstLetter(ingredients.ingredient.name) || "-"
                    }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-subtitle1">
                    {{
                      formatQuantity(
                        ingredients.quantity * props.report.quantity,
                        ingredients.ingredient.unit
                      )
                    }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="report-actions q-gutter-sm" align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          color="cyan-7"
          label="Completed"
          class="action-btn"
          @click="completedPremix"
        />
        <!-- @click="confirmReport" -->
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { useWarehousesStore } from "src/stores/warehouse";
import { usePremixStore } from "src/stores/premix";
import { Notify } from "quasar";
import { useDialogPluginComponent } from "quasar";
import { typographyFormat } from "src/composables/typography/typography-format";

const {
  capitalizeFirstLetter,
  formatFullname,
  formatRequestQuantity,
  formatQuantity,
} = typographyFormat();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
const warehouseStore = useWarehousesStore();
const userData = computed(() => warehouseStore.user);
console.log("userdata", userData.value);
const warehouseEmployeeId = userData.value.data.employee_id;
const premixStore = usePremixStore();
const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

console.log("report", props.report);

const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const ingredientsData =
  props.report?.branch_premix?.branch_recipe?.ingredient_groups || "Undefined";
console.log("ingrdientsData", ingredientsData);

const computedIngredients = computed(() =>
  ingredientsData.map((ingredient) => {
    const totalQuantity =
      parseFloat(ingredient.quantity) * parseFloat(props.report.quantity);
    return {
      ...ingredient,
      totalQuantity,
      formattedQuantity: formatQuantity(
        totalQuantity,
        ingredient.ingredient.unit
      ),
    };
  })
);

console.log("computedIngredients", computedIngredients.value);

const completedPremix = async () => {
  try {
    const payload = {
      id: props.report.id,
      request_premixes_id: props.report.id,
      branch_premix_id: props.report.branch_premix_id,
      employee_id: warehouseEmployeeId,
      status: "completed",
      quantity: props.report.quantity,
      warehouse_id: props.report.warehouse_id,
      notes: "Completed Premix",
      ingredients: computedIngredients.value.map((ingredient) => ({
        ingredient_id: ingredient.ingredient.id,
        quantity: ingredient.totalQuantity,
        unit: ingredient.ingredient.unit,
      })),
    };

    const completedReport = await premixStore.completedPremix(payload);
    console.log("Report Process:", completedReport);

    Notify.create({
      type: "positive",
      message: "Premix completed to process successfully",
    });

    dialog.value = false;
  } catch (error) {
    console.error(error);
    Notify.create({
      type: "negative",
      message: "An error occurred while processing the premix.",
    });
  }
};
</script>

<style lang="scss" scoped>
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}

.emphasized-header {
  background: linear-gradient(180deg, #ffffff, #9fc1ff);
}
</style>
