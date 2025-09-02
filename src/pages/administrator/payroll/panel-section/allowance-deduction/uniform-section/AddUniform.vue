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
      <q-card class="uniform-dialog-card">
        <!-- Header -->
        <q-card-section class="dialog-header row items-center no-wrap">
          <div class="text-h6 text-weight-bold">🧥 Add Uniform</div>
          <q-space />
          <q-btn
            icon="close"
            flat
            dense
            round
            v-close-popup
            class="text-white"
          />
        </q-card-section>

        <!-- Search -->
        <q-card-section class="q-pt-lg q-pb-md q-px-lg">
          <div style="position: relative">
            <SearchComponent
              v-model="searchKeyword"
              :search-loading="searchLoading"
              @update:model-value="search"
            />
            <!-- Custom dropdown -->
            <div v-if="searchKeyword" class="dropdown-list">
              <q-list separator>
                <q-item v-if="!employees?.length">
                  <q-item-section class="text-grey-7"
                    >No employee record</q-item-section
                  >
                </q-item>
                <q-item
                  v-for="employee in employees"
                  :key="employee.id"
                  clickable
                  @click="autoFillEmployee(employee)"
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
              </q-list>
            </div>
          </div>

          <div class="row q-col-gutter-md q-mt-lg">
            <div class="col-12 col-sm-6">
              <div class="text-subtitle2 text-grey-7 q-mb-xs">
                Employee Name:
              </div>
              <div class="text-body1 text-weight-medium">
                {{ uniform.employee_name || "-------" }}
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="text-subtitle2 text-grey-7 q-mb-xs">Position:</div>
              <div class="text-body1 text-weight-medium">
                {{ uniform.employee_position || "-------" }}
              </div>
            </div>
          </div>
        </q-card-section>

        <!-- Employee Info -->

        <q-separator inset class="q-mx-lg q-my-md" />

        <!-- Uniform Selection -->
        <q-card-section class="row q-col-gutter-md q-px-lg">
          <!-- T-Shirt -->
          <div class="col-6">
            <div class="text-center q-mb-sm">
              <q-checkbox
                v-model="tShirt"
                label="T-Shirt"
                color="deep-orange"
                keep-color
              />
            </div>
            <div v-if="tShirt" class="row items-start">
              <div class="col-6">
                <q-option-group
                  v-model="uniform.tShirtsize"
                  :options="[
                    { label: '18', value: '18' },
                    { label: 'S', value: 'S' },
                    { label: 'M', value: 'M' },
                    { label: 'L', value: 'L' },
                  ]"
                  type="radio"
                  dense
                  color="deep-orange"
                />
              </div>
              <div v-if="uniform.tShirtsize" class="col-6 q-gutter-sm">
                <q-input
                  v-model="uniform.tShirtPcs"
                  dense
                  outlined
                  label="pcs"
                />
                <q-input
                  v-model="uniform.tShirtPrice"
                  dense
                  outlined
                  label="price"
                />
              </div>
            </div>
          </div>

          <!-- Pants -->
          <div class="col-6">
            <div class="text-center q-mb-sm">
              <q-checkbox
                v-model="pants"
                label="Pants"
                color="brown-6"
                keep-color
              />
            </div>
            <div v-if="pants" class="row items-start">
              <div class="col-6">
                <q-option-group
                  v-model="uniform.pantsSize"
                  :options="[
                    { label: 'M', value: 'M' },
                    { label: 'L', value: 'L' },
                    { label: 'XL', value: 'XL' },
                    { label: 'XXL', value: 'XXL' },
                  ]"
                  type="radio"
                  dense
                  color="brown"
                />
              </div>
              <div v-if="uniform.pantsSize" class="col-6 q-gutter-sm">
                <q-input
                  v-model="uniform.pantsPcs"
                  dense
                  outlined
                  label="pcs"
                />
                <q-input
                  v-model="uniform.pantsPrice"
                  dense
                  outlined
                  label="price"
                />
              </div>
            </div>
          </div>
        </q-card-section>

        <!-- Computation Fields -->
        <q-card-section class="q-px-lg q-pb-md">
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

        <!-- Save Button -->
        <q-card-actions align="right" class="q-px-lg q-pb-lg">
          <q-btn
            size="md"
            padding="sm lg"
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
import { useEmployeeStore } from "stores/employee";
import { useUniformStore } from "stores/uniform";
import { ref, reactive, computed, watch } from "vue";
import SearchComponent from "../components/SearchComponent.vue";

const emit = defineEmits(["created"]);
const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);
const uniformStore = useUniformStore();
const searchKeyword = ref("");
const dialog = ref(false);
const tShirt = ref(false);
const pants = ref(false);
const totalAmount = ref(0);
const paymentPerPayroll = ref(0);
const loading = ref(false);
const searchLoading = ref(false);

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
  uniform.employee_id = employee.id;
  uniform.employee_name = `${employee.firstname} ${
    employee.middlename ? employee.middlename.charAt(0) + "." : ""
  } ${employee.lastname}`;
  uniform.employee_position = employee.position;
  searchKeyword.value = "";
};

const clearUniform = () => {
  uniform.employee_id = "";
  uniform.employee_name = "";
  uniform.employee_position = "";
  uniform.tShirtsize = "";
  uniform.pantsSize = "";
  uniform.tShirtPcs = 0;
  uniform.tShirtPrice = 0;
  uniform.pantsPcs = 0;
  uniform.pantsPrice = 0;
  uniform.numberOfPayments = 1;
  tShirt.value = false;
  pants.value = false;
  totalAmount.value = 0;
  paymentPerPayroll.value = 0;
};

watch(
  [
    () => uniform.tShirtPcs,
    () => uniform.tShirtPrice,
    () => uniform.pantsPcs,
    () => uniform.pantsPrice,
  ],
  () => {
    totalAmount.value =
      uniform.tShirtPcs * uniform.tShirtPrice +
      uniform.pantsPcs * uniform.pantsPrice;
  }
);

watch([totalAmount, () => uniform.numberOfPayments], () => {
  paymentPerPayroll.value = totalAmount.value / (uniform.numberOfPayments || 1);
});

const save = async () => {
  loading.value = true;
  try {
    await uniformStore.createUniforms({
      ...uniform,
      totalAmount: totalAmount.value,
      paymentPerPayroll: paymentPerPayroll.value,
      remaining_payments: totalAmount.value,
    });
    emit("created");
    dialog.value = false;
    clearUniform();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
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
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.gradient-btn {
  background: linear-gradient(135deg, #0194ae, #0e7490);
  // box-shadow: 0 2px 8px rgba(19, 141, 163, 0.711);
  transition: all 0.3s ease;
}
.gradient-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(12, 157, 201, 0.6);
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-height: 250px;
  overflow-y: auto;
  z-index: 1000;
}
</style>
