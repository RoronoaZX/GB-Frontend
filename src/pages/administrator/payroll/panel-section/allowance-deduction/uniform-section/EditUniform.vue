<template>
  <q-btn
    color="positive"
    icon="edit"
    size="sm"
    flat
    round
    dense
    @click="openDialog"
  >
    <q-tooltip class="bg-positive" :delay="200">Edit</q-tooltip>
  </q-btn>

  <q-dialog
    v-model="dialog"
    persistent
    position="right"
    backdrop-filter="blur(6px) saturate(150%)"
  >
    <q-card style="width: 600px; max-width: 90vw">
      <q-card-section
        class="row items-center dialog-header text-white rounded-borders-top q-pa-md"
      >
        <div class="text-h6">🧥 Edit Uniform</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup class="text-white" />
      </q-card-section>

      <q-card-section class="q-pb-lg q-px-lg">
        <div class="row q-col-gutter-md q-mt-lg">
          <div class="col-12 col-sm-6">
            <div class="text-subtitle2 text-grey-7 q-md-xs">Employee Name:</div>
            <div class="text-body1 text-weight-medium">
              {{ edit.employee ? formatFullname(edit.employee) : "----" }}
            </div>
          </div>
          <div class="col-12 col-sm-6">
            <div class="text-subtitle2 text-grey-7 q-md-xs">Position:</div>
            <div class="text-body1 text-weight-medium">
              {{ edit.employee.position ? edit.employee.position : "-----" }}
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator inset class="q-mx-lg q-my-md" />

      <q-card-section class="q-gutter-md row">
        <div class="col-5">
          <div class="q-mb-lg" align="center">
            <q-checkbox
              keep-color
              v-model="tShirt"
              label="T-Shirt"
              color="deep-orange"
            />
          </div>
          <div v-if="tShirt" class="row q-ml-sm q-mt-sm">
            <div class="col-6">
              <q-option-group
                v-model="uniform.tShirtsize"
                :options="[
                  { label: '18', value: '18' },
                  { label: 'S', value: 'S' },
                  { label: 'M', value: 'M' },
                  { label: 'L', value: 'L' },
                ]"
                color="deep-orange"
                type="radio"
                dense
              />
            </div>
            <div class="q-gutter-md">
              <q-input
                v-model="uniform.tShirtPcs"
                label="pcs"
                outlined
                dense
                style="width: 100px"
              />
              <q-input
                v-model="uniform.tShirtPrice"
                label="price"
                outlined
                dense
                style="width: 100px"
              />
            </div>
          </div>
        </div>

        <div class="col-6">
          <div class="q-mb-lg" align="center">
            <q-checkbox
              keep-color
              v-model="pants"
              label="Pants"
              color="brown-6"
            />
          </div>
          <div v-if="pants" class="row q-ml-sm q-mt-sm">
            <div class="col-6 q-pl-xl">
              <q-option-group
                v-model="uniform.pantsSize"
                :options="[
                  { label: 'M', value: 'M' },
                  { label: 'L', value: 'L' },
                  { label: 'XL', value: 'XL' },
                  { label: 'XXL', value: 'XXL' },
                ]"
                color="brown"
                type="radio"
                dense
              />
            </div>
            <div class="q-gutter-md q-pl-lg">
              <q-input
                v-model="uniform.pantsPcs"
                label="pcs"
                outlined
                dense
                style="width: 100px"
              />
              <q-input
                v-model="uniform.pantsPrice"
                label="price"
                outlined
                dense
                style="width: 100px"
              />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-ma-lg">
        <div class="row q-col-gutter-md">
          <div class="col-4">
            <q-input
              v-model="uniform.numberOfPayments"
              label="Number of Payments"
              type="number"
              outlined
              dense
            />
          </div>
          <div class="col-4">
            <q-input
              v-model="totalAmount"
              label="Total Amount"
              outlined
              dense
              readonly
            />
          </div>
          <div class="col-4">
            <q-input
              v-model="paymentPerPayroll"
              label="Per Payroll"
              outlined
              dense
              readonly
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          size="md"
          padding="xs md"
          no-caps
          label="Save Edit"
          icon-right="send"
          class="gradient-btn text-white"
          @click="saveUniformChanges"
          :loading="loading"
        />
      </q-card-actions>

      <q-inner-loading :showing="loading">
        <q-spinner-ios size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { reactive, ref, watch, computed } from "vue";
import { useUniformStore } from "src/stores/uniform";
import { Notify } from "quasar";

const emit = defineEmits(["edited"]);
const props = defineProps(["edit"]);
console.log("edit", props.edit);
const uniformStore = useUniformStore();

// Dialog and Loading state
const dialog = ref(false);
const loading = ref(false);
const localEdit = reactive({ ...props.edit });

// Uniform data state
const uniform = reactive({
  numberOfPayments: 0,
  remaining_payments: props.edit.remaining_payments || 0,
  tShirtsize: "",
  tShirtPcs: "",
  tShirtPrice: "",
  pantsSize: "",
  pantsPcs: "",
  pantsPrice: "",
});

// Checkbox states for T-Shirt and Pants
const tShirt = ref(false);
const pants = ref(false);

// Computed property for Total Amount
const totalAmount = computed(() => {
  const tshirtTotal =
    tShirt.value && uniform.tShirtPcs && uniform.tShirtPrice
      ? parseFloat(uniform.tShirtPcs) * parseFloat(uniform.tShirtPrice)
      : 0;

  const pantsTotal =
    pants.value && uniform.pantsPcs && uniform.pantsPrice
      ? parseFloat(uniform.pantsPcs) * parseFloat(uniform.pantsPrice)
      : 0;

  return tshirtTotal + pantsTotal;
});

// Computed property for Payment Per Payroll
const paymentPerPayroll = computed(() => {
  const payments = parseFloat(uniform.numberOfPayments);
  const total = totalAmount.value;

  return payments > 0 ? (total / payments).toFixed(2) : 0;
});

/**
 * Opens the dialog and populates uniform data from props.
 */
const openDialog = () => {
  const tData = props.edit?.t_shirt?.[0];
  const pData = props.edit?.pants?.[0];

  tShirt.value = !!tData;
  pants.value = !!pData;

  uniform.tShirtsize = tData?.size || "";
  uniform.tShirtPcs = tData?.pcs || "";
  uniform.tShirtPrice = tData?.price || "";

  uniform.pantsSize = pData?.size || "";
  uniform.pantsPcs = pData?.pcs || "";
  uniform.pantsPrice = pData?.price || "";

  uniform.numberOfPayments = props.edit.number_of_payments || 0;
  // Note: totalAmount and paymentPerPayroll are computed, so no direct assignment needed here.
  // They will react to changes in uniform.numberOfPayments, tShirtPcs, etc.
  dialog.value = true;
};

/**
 * Clears all uniform-related form fields.
 */
const clearForm = () => {
  tShirt.value = false;
  pants.value = false;

  uniform.tShirtsize = "";
  uniform.tShirtPcs = "";
  uniform.tShirtPrice = "";

  uniform.pantsSize = "";
  uniform.pantsPcs = "";
  uniform.pantsPrice = "";

  uniform.numberOfPayments = "";
  uniform.remaining_payments = 0;
};

/**
 * Formats the employee's full name.
 * @param {Object} row - Employee data containing firstname, middlename, and lastname.
 * @returns {string} The formatted full name.
 */
const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`.trim();
};

// Watcher to update paymentPerPayroll when numberOfPayments or totalAmount changes
watch(
  () => [uniform.numberOfPayments, totalAmount.value],
  ([num, total]) => {
    const n = parseFloat(num);
    const t = parseFloat(total);
    uniform.paymentPerPayroll =
      !isNaN(n) && !isNaN(t) && n > 0 ? (t / n).toFixed(2) : 0;
  }
);

/**
 * Saves the uniform changes to the backend.
 */
const saveUniformChanges = async () => {
  const finalRemainingPayments = isNaN(parseFloat(uniform.remaining_payments))
    ? 0
    : parseFloat(uniform.remaining_payments);
  const updated = {
    ...localEdit,
    t_shirt: tShirt.value
      ? [
          {
            size: uniform.tShirtsize,
            pcs: uniform.tShirtPcs,
            price: uniform.tShirtPrice,
          },
        ]
      : [],
    pants: pants.value
      ? [
          {
            size: uniform.pantsSize,
            pcs: uniform.pantsPcs,
            price: uniform.pantsPrice,
          },
        ]
      : [],
    number_of_payments: uniform.numberOfPayments,
    total_amount: parseFloat(totalAmount.value),
    payments_per_payroll: parseFloat(paymentPerPayroll.value),
    remaining_payments: finalRemainingPayments,
  };
  console.log("Updated uniform data:", updated);

  try {
    loading.value = true;
    await uniformStore.updateUnifrom(updated);
    emit("edited"); // Trigger reload in parent component

    Notify.create({
      message: "Uniform changes saved successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
    dialog.value = false;
    clearForm();
  } catch (error) {
    console.error("Error saving uniform changes:", error);
    Notify.create({
      message: "Failed to save uniform changes",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.uniform-dialog-card {
  width: 600px;
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
}

.dialog-header {
  background: linear-gradient(90deg, #0194ae, #0e7490);
  color: white;
  padding: 19px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.gradient-btn {
  background: linear-gradient(135deg, #0194ae, #0e7490);
  box-shadow: 0 2px 8px rgba(19, 141, 163, 0.711);
  transition: all 0.3s ease;
}

.gradient-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(12, 157, 201, 0.6);
}
</style>
