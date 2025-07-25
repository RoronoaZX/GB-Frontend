<template>
  <div>
    <q-btn
      padding="sm md"
      label="Add Uniform"
      icon="add_circle"
      size="md"
      class="gradient-btn text-white"
      @click="openDialog"
    />
    <q-dialog
      v-model="dialog"
      persistent
      position="right"
      backdrop-filter="blur(4px) saturate(150%)"
    >
      <q-card style="width: 600px; max-width: 80vw">
        <q-card-section
          class="row items-center gradient-btn text-white rounded-borders-top q-pa-md"
        >
          <div class="text-h5 q-mr-md">🧥 Add Uniform</div>
          <q-space />
          <q-btn icon="arrow_forward_ios" flat dense round v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="searchKeyword"
            @update:model-value="search"
            label="Search Employee"
            outlined
            rounded
            dense
            debounce="500"
            placeholder="Enter name"
          >
            <template v-slot:append>
              <q-icon v-if="!searchLoading" name="search" />
              <q-spinner v-else color="grey" size="sm" />
            </template>
            <div v-if="searchKeyword" class="custom-list z-top">
              <q-card>
                <q-list separator>
                  <q-item v-if="!employees?.length">
                    No employee record
                  </q-item>
                  <template v-else>
                    <q-item
                      @click="autoFillEmployee(employee)"
                      v-for="employee in employees"
                      :key="employee.id"
                      clickable
                    >
                      <q-item-section>
                        {{
                          `${employee.firstname} ${
                            employee.middlename
                              ? employee.middlename.charAt(0) + "."
                              : ""
                          } ${employee.lastname}`
                        }}
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-card>
            </div>
          </q-input>
        </q-card-section>
        <q-card-section class="q-gutter-y-sm">
          <q-item>
            <q-item-section avatar>
              <q-icon name="person" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-subtitle2 text-grey-8"
                >Name</q-item-label
              >
              <q-item-label class="text-subtitle1 text-weight-medium">
                {{ uniform.employee_name ? uniform.employee_name : "-------" }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon name="badge" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-subtitle2 text-grey-8">
                Position
              </q-item-label>
              <q-item-label class="text-subtitle1 text-weight-medium">
                {{
                  uniform.employee_position
                    ? uniform.employee_position
                    : "-------"
                }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-card-section class="row q-gutter-x-md">
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
              <div v-if="uniform.tShirtsize" class="q-gutter-md">
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
              <div v-if="uniform.pantsSize" class="q-gutter-md q-pl-lg">
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
          <div class="row q-gutter-sm"></div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            size="md"
            padding="xs md"
            no-caps
            label="Save"
            icon-right="send"
            class="gradient-btn text-white"
            @click="save"
            :loading="loading"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { Notify } from "quasar";
import { useEmployeeStore } from "stores/employee";
import { useUniformStore } from "stores/uniform";
import { reactive, ref, watch, computed } from "vue";

const emit = defineEmits(["created"]);
const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);
const uniformStore = useUniformStore();
const uniformRows = computed(() => uniformStore.uniforms);
const searchKeyword = ref("");
const dialog = ref(false);
const tShirt = ref(false);
const pants = ref(false);
const totalAmount = ref(0);
const paymentPerPayroll = ref(0);
const loading = ref(false);
const searchLoading = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const search = async () => {
  if (searchKeyword.value.trim()) {
    searchLoading.value = true;
    await employeeStore.searchEmployee(searchKeyword.value);
    searchLoading.value = false;
  }
};

const autoFillEmployee = (employee) => {
  console.log("Selected Employee:", employee);
  uniform.employee_id = employee.id;
  uniform.employee_name = `${employee.firstname} ${
    employee.middlename ? employee.middlename.charAt(0) + "." : ""
  } ${employee.lastname} `;
  uniform.employee_position = employee.position;
  searchKeyword.value = "";
  console.log("Filled Designation Data:", uniform);
};

const uniform = reactive({
  employee_id: "",
  employee_name: "",
  employee_position: "",
  tShirtsize: "",
  pantsSize: "",
  tShirtPcs: 0,
  tShirtPrice: 0,
  pantsPcs: 0,
  pantsPrice: 0,
  numberOfPayments: 1,
});

const clearUniform = () => {
  (uniform.employee_id = ""),
    (uniform.employee_name = ""),
    (uniform.employee_position = ""),
    (tShirt.value = false),
    (pants.value = false),
    (totalAmount.value = 0),
    (paymentPerPayroll.value = 0),
    clearPants(),
    clearTshirt();
};

const clearTshirt = () => {
  (uniform.tShirtPcs = ""),
    (uniform.tShirtsize = ""),
    (uniform.tShirtPrice = "");
};

const clearPants = () => {
  (uniform.pantsSize = ""), (uniform.pantsPcs = ""), (uniform.pantsPrice = "");
};

watch(pants, (newValue) => {
  if (!newValue) {
    clearPants();
  }
});

watch(tShirt, (newValue) => {
  if (!newValue) {
    clearTshirt();
  }
});
// Watch for changes in uniform data and calculate totalAmount
watch(
  [
    () => uniform.tShirtPrice,
    () => uniform.tShirtPcs,
    () => uniform.pantsPrice,
    () => uniform.pantsPcs,
  ],
  () => {
    totalAmount.value =
      uniform.tShirtPrice * uniform.tShirtPcs +
      uniform.pantsPrice * uniform.pantsPcs;
  },
  { immediate: true } // This will calculate the total on load
);

// Watch for changes in totalAmount or numberOfPayments to calculate paymentPerPayroll
watch(
  [totalAmount, () => uniform.numberOfPayments],
  () => {
    paymentPerPayroll.value =
      totalAmount.value / (uniform.numberOfPayments || 1); // Round to nearest integer
  },
  { immediate: true }
);

const save = async () => {
  const payload = {
    employee_id: uniform.employee_id,
    employee_name: uniform.employee_name,
    employee_position: uniform.employee_position,
    tShirtsize: uniform.tShirtsize,
    pantsSize: uniform.pantsSize,
    tShirtPcs: uniform.tShirtPcs,
    tShirtPrice: uniform.tShirtPrice,
    pantsPcs: uniform.pantsPcs,
    pantsPrice: uniform.pantsPrice,
    totalAmount: totalAmount.value,
    paymentPerPayroll: paymentPerPayroll.value,
    numberOfPayments: uniform.numberOfPayments,
    remaining_payments: totalAmount.value,
  };
  console.log("payload", payload);
  try {
    loading.value = true;
    await uniformStore.createUniforms(payload);

    emit("created"); // 🔥 trigger reload in parent

    dialog.value = false;
    clearUniform();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.gradient-btn {
  background: linear-gradient(45deg, #502a33, #a621a6);
  border: none;
}
</style>
