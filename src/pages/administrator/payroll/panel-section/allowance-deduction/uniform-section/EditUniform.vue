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
    backdrop-filter="blur(4px) saturate(150%)"
  >
    <q-card style="width: 600px; max-width: 80vw">
      <q-card-section
        class="row items-center q-px-md q-py-sm gradient-btn text-white"
      >
        <div class="text-h5 q-mr-md">🧥 Edit Uniform</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-md text-subtitle1">
          <div>Name:</div>
          <div class="text-weight-medium">
            {{ edit.employee ? formatFullname(edit.employee) : "----" }}
          </div>
        </div>
        <div class="row q-gutter-md text-subtitle1">
          <div>Position:</div>
          <div class="text-weight-medium">
            {{ edit.employee.position ? edit.employee.position : "-----" }}
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <!-- T-Shirt Section -->
          <div class="col-6">
            <q-checkbox
              keep-color
              v-model="tShirt"
              label="T-Shirt"
              color="red"
            />
            <div class="q-gutter-sm q-pa-md" v-if="tShirt">
              <div>
                <q-radio
                  keep-color
                  v-model="uniform.tShirtsize"
                  val="18"
                  label="18"
                  color="teal"
                />
                <q-radio
                  keep-color
                  v-model="uniform.tShirtsize"
                  val="S"
                  label="S"
                  color="orange"
                />
                <q-radio
                  keep-color
                  v-model="uniform.tShirtsize"
                  val="M"
                  label="M"
                  color="red"
                />
                <q-radio
                  keep-color
                  v-model="uniform.tShirtsize"
                  val="L"
                  label="L"
                  color="cyan"
                />
              </div>
              <div class="row q-gutter-x-sm" v-if="uniform.tShirtsize">
                <q-input
                  v-model="uniform.tShirtPcs"
                  dense
                  outlined
                  label="pcs"
                  style="width: 100px"
                />
                <q-input
                  v-model="uniform.tShirtPrice"
                  dense
                  outlined
                  label="price"
                  style="width: 100px"
                />
              </div>
            </div>
          </div>

          <!-- Pants Section -->
          <div class="col-6">
            <q-checkbox
              keep-color
              v-model="pants"
              label="Pants"
              color="brown-6"
            />
            <div class="q-gutter-sm q-pa-md" v-if="pants">
              <q-radio
                keep-color
                v-model="uniform.pantsSize"
                val="M"
                label="M"
                color="red"
              />
              <q-radio
                keep-color
                v-model="uniform.pantsSize"
                val="L"
                label="L"
                color="cyan"
              />
              <q-radio
                keep-color
                v-model="uniform.pantsSize"
                val="XL"
                label="XL"
                color="purple-6"
              />
              <q-radio
                keep-color
                v-model="uniform.pantsSize"
                val="XXL"
                label="XXL"
                color="deep-orange-13"
              />
              <div class="row q-gutter-x-sm" v-if="uniform.pantsSize">
                <q-input
                  v-model="uniform.pantsPcs"
                  dense
                  outlined
                  label="pcs"
                  style="width: 100px"
                />
                <q-input
                  v-model="uniform.pantsPrice"
                  dense
                  outlined
                  label="price"
                  style="width: 100px"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row justify-between q-gutter-sm">
          <div>
            <div class="q-mt-lg text-subtitle1">Number of Payments</div>
            <q-input
              v-model="uniform.numberOfPayments"
              outlined
              flat
              dense
              type="number"
            />
          </div>
          <div>
            <div class="q-mt-lg text-subtitle1">Total Amount</div>
            <q-input v-model="totalAmount" outlined readonly flat dense />

            <div class="q-mt-lg text-subtitle1">Payments Per Payroll</div>
            <q-input v-model="paymentPerPayroll" outlined readonly flat dense />
          </div>
        </div>
      </q-card-section>
      <q-card-actions>
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
    </q-card>
  </q-dialog>
</template>
<script setup>
import { reactive, ref, watch, computed } from "vue";
import { useUniformStore } from "src/stores/uniform";

const props = defineProps(["edit"]);
const uniformStore = useUniformStore();
console.log("EditUniform props:", props);
const dialog = ref(false);
const loading = ref(false);
const localEdit = reactive({ ...props.edit });

const uniform = reactive({
  numberOfPayments: 0,
  tShirtsize: "",
  tShirtPcs: "",
  tShirtPrice: "",
  pantsSize: "",
  pantsPcs: "",
  pantsPrice: "",
});

const tShirt = ref(false);
const pants = ref(false);
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

const paymentPerPayroll = computed(() => {
  const payments = parseFloat(uniform.numberOfPayments);
  const total = totalAmount.value;

  return payments > 0 ? (total / payments).toFixed(2) : 0;
});

// Open dialog and populate reactive form
// const openDialog = () => {
//   const tData = props.edit?.t_shirt?.[0];
//   const pData = props.edit?.pants?.[0];

//   tShirt.value = !!tData;
//   pants.value = !!pData;

//   uniform.tShirtsize = tData?.size || "";
//   uniform.tShirtPcs = tData?.pcs || "";
//   uniform.tShirtPrice = tData?.price || "";

//   uniform.pantsSize = pData?.size || "";
//   uniform.pantsPcs = pData?.pcs || "";
//   uniform.pantsPrice = pData?.price || "";

//   dialog.value = true;
// };
const openDialog = () => {
  // Pull uniform item info
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

  // New payment-related fields
  uniform.numberOfPayments = props.edit.number_of_payments || 0;
  totalAmount.value = props.edit.total_amount || 0;
  paymentPerPayroll.value = props.edit.payments_per_payroll || 0;

  dialog.value = true;
};

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
};

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

watch(
  () => [uniform.numberOfPayments, totalAmount.value],
  ([num, total]) => {
    const n = parseFloat(num);
    const t = parseFloat(total);
    paymentPerPayroll.value =
      !isNaN(n) && !isNaN(t) && n > 0 ? (t / n).toFixed(2) : 0;
  }
);

const saveUniformChanges = async () => {
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
  };
  try {
    loading.value = true;
    await uniformStore.updateUnifrom(updated);
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
.q-btn {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.q-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.gradient-btn {
  background: linear-gradient(45deg, #502a33, #a621a6);
  border: none;
}
.cancel-btn {
  background: linear-gradient(45deg, #0c0e0e, #85888f);
  border: none;
}
</style>
