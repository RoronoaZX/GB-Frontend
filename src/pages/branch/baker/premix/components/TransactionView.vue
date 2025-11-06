<template>
  <div>
    <q-btn
      color="accent"
      icon="visibility"
      size="md"
      flat
      round
      dense
      @click="openDialog"
    />
  </div>

  <q-dialog v-model="dialog">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section :class="getHeaderClass(report.status)">
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
        <div>Date: {{ formatTimestamp(report.created_at) || "-" }}</div>
        <div>Baker: {{ formatFullname(report.employee) || "-" }}</div>
        <div>
          Branch:
          {{
            capitalizeFirstLetter(
              report?.branch_premix?.branch_recipe?.branch.name
            ) || "-"
          }}
        </div>
        <div>
          Status:
          <q-badge :color="getPremixBadgeStatusColor(report.status)" outlined>
            {{ capitalizeFirstLetter(report.status) || "-" }}
          </q-badge>
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
                  {{ capitalizeFirstLetter(report.name) || "-" }}
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
              <!-- <q-item-section>
                <q-item-label class="text-overline"> Name</q-item-label>
              </q-item-section> -->
              <q-item-section side>
                <q-item-label class="text-overline">Quantity</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-for="(ingredients, index) in ingredientsData"
              :key="index"
            >
              <q-item-section>
                <q-item-label class="text-subtitle1">
                  {{ ingredients.ingredient.code }}
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
      <!-- vertical -->
      <q-stepper v-model="activeStep" animated class="q-pa-lg">
        <q-step
          v-for="(step, index) in filteredSteps"
          :key="index"
          :name="index + 1"
          :title="step.label"
          :color="getPremixBadgeStatusColor(step.value)"
          :done="isStepDone(step.value)"
          :icon="isStepDone(step.value) ? 'check' : 'radio_button_unchecked'"
          class="custom-step"
        >
          <!-- Caption inside step -->
          <div class="text-grey-7 q-mt-xs">
            {{ getStepCaption(step.value) }}
          </div>
        </q-step>
      </q-stepper>

      <!-- Show button when last status is "to receive" -->
      <q-card-section
        v-if="lastStatus === 'to receive'"
        class="text-center q-gutter-md"
      >
        <div class="text-h6 text-weight-regular">
          Do you want to receive the premix?
        </div>
        <q-btn
          color="amber-10"
          label="Yes"
          icon="check"
          @click="confirmReceived"
          :loading="loading"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { usePremixStore } from "src/stores/premix";
import { useBakerReportsStore } from "src/stores/baker-report";
import { typographyFormat } from "src/composables/typography/typography-format";
import { badgeColor } from "src/composables/badge-color/badge-color";

const {
  capitalizeFirstLetter,
  formatTimestamp,
  formatFullname,
  formatRequestQuantity,
  formatQuantity,
} = typographyFormat();

const { getHeaderClass, getPremixBadgeStatusColor } = badgeColor();

const bakerReportStore = useBakerReportsStore();
const userData = computed(() => bakerReportStore.user);
console.log("userData in RawMaterialsTable:", userData.value);
const employeeId = userData.value?.data?.employee_id || "";
const branchId = userData.value?.device?.reference_id || "";
console.log("employeeId in PremixPage:", employeeId);
console.log("branchId in PremixPage:", branchId);
const premixStore = usePremixStore();

const $q = useQuasar();
const dialog = ref(false);
const loading = ref(false);
const props = defineProps({ report: { type: Object, required: true } });
console.log("props in TransactionViewss:", props.report);
const emit = defineEmits(["update-history"]);

const openDialog = () => {
  dialog.value = true;
};

const statusSteps = [
  { label: "Pending", value: "pending" },
  { label: "Declined", value: "declined" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Process", value: "process" },
  { label: "Completed", value: "completed" },
  { label: "To Deliver", value: "to deliver" },
  { label: "To Receive", value: "to receive" },
  { label: "Received", value: "received" },
];

const filteredSteps = computed(() => {
  if (!props.report.history?.length) return [];
  return statusSteps.filter((step) =>
    props.report.history.some((h) => h.status === step.value)
  );
});

const getStepCaption = (status) => {
  const historyEntry = props.report.history.find((h) => h.status === status);

  if (!historyEntry) return "No handler";

  if (status === "received") {
    return `Received by: ${formatFullname(historyEntry.employee)}`;
  }

  if (status === "pending") {
    return `Requested by: ${formatFullname(historyEntry.employee)}`;
  }
  return `Handled by: ${formatFullname(historyEntry.employee)}`;
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

console.log("report to proceed", props.report);

const lastStatus = computed(
  () => props.report.history?.[props.report.history.length - 1]?.status || null
);
console.log("lastStatus", lastStatus.value);
const activeStep = computed(
  () =>
    filteredSteps.value.findIndex((step) => step.value === lastStatus.value) + 1
);
const isStepDone = (stepValue) =>
  props.report.history?.some((h) => h.status === stepValue);

const confirmReceived = async () => {
  const payload = {
    request_premix_id: props.report.id,
    branch_premix_id: props.report.branch_premix_id,
    branch_id: props.report.branch_premix.branch_id,
    employee_id: employeeId,
    status: "received",
    notes: "Received Premix",
    quantity: props.report.quantity,
    warehouse_id: props.report.warehouse_id,
    ingredients: computedIngredients.value.map((ingredient) => ({
      ingredients_id: ingredient.ingredient.id,
      total_quantity: ingredient.totalQuantity,
      unit: ingredient.ingredient.unit,
    })),
  };
  console.log("payload", payload);
  await premixStore.receivePremix(payload);

  await fetchRequestBranchEmployeePremix(branchId, employeeId);
  dialog.value = false;
};
</script>

<style lang="scss" scoped>
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}

.pending-header {
  background: linear-gradient(180deg, #ffffff, #e8e6b7);
}
.confirm-header {
  background: linear-gradient(180deg, #ffffff, #c1ffc7);
}
.decline-header {
  background: linear-gradient(180deg, #ffffff, #ffc7c7);
}
.process-header {
  background: linear-gradient(180deg, #ffffff, #9fc1ff);
}
.completed-header {
  background: linear-gradient(180deg, #ffffff, #cbcbcb);
}
.to-deliver-header {
  background: linear-gradient(180deg, #ffffff, #bda49b);
}
.to-receive-header {
  background: linear-gradient(180deg, #ffffff, #ffd29c);
}
.receive-header {
  background: linear-gradient(180deg, #ffffff, #8ff7ed);
}
</style>
