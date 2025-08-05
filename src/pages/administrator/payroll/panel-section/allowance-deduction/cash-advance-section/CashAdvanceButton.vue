<template>
  <div>
    <q-btn
      padding="sm md"
      label="Cash Advance"
      icon="attach_money"
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
      <q-card class="cash-advance-dialog-card">
        <!-- Header -->
        <q-card-section class="dialog-header row items-center no-wrap">
          <div class="text-h5 q-mr-md">💲 Add Cash Advance</div>
          <q-space />
          <q-btn icon="arrow_forward_ios" flat dense round v-close-popup />
        </q-card-section>

        <!-- Search -->
        <q-card-section class="q-px-lg q-pt-md">
          <div style="position: relative">
            <SearchComponent
              v-model="searchKeyword"
              :search-loading="searchLoading"
              @update:model-value="search"
            />

            <!-- Custom Dropdown List -->
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
                {{ cashAdvance.employee_name || "----------" }}
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="text-subtitle2 text-grey-7 q-mb-xs">Position:</div>
              <div class="text-body1 text-weight-medium">
                {{ cashAdvance.employee_position || "----------" }}
              </div>
            </div>
          </div>
        </q-card-section>

        <q-separator inset class="q-mx-lg q-my-md" />

        <!-- Inputs -->
        <q-card-section>
          <div class="q-gutter-y-md">
            <q-input
              dense
              v-model="cashAdvance.amount"
              type="number"
              outlined
              label="Amount"
            />
            <q-input
              dense
              v-model="cashAdvance.number_of_payments"
              type="number"
              outlined
              label="Number of Payments"
            />
            <q-input
              v-model="cashAdvance.payment_per_payroll"
              outlined
              dense
              readonly
              label="Per Payroll"
            />
            <q-input
              dense
              v-model="cashAdvance.reason"
              filled
              type="textarea"
              outlined
              label="Reason"
            />
          </div>
        </q-card-section>

        <!-- Actions -->
        <q-card-actions align="right" class="q-px-lg q-pb-lg">
          <q-btn
            size="md"
            padding="xs md"
            label="Save"
            icon-right="send"
            class="gradient-btn text-white"
            :loading="loading"
            @click="save"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useEmployeeStore } from "stores/employee";
import { computed, reactive, ref, watch } from "vue";
import { useCashAdvanceStore } from "stores/cash-advance";
import SearchComponent from "../components/SearchComponent.vue";

const emit = defineEmits(["created"]);
const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);
const cashAdvanceStore = useCashAdvanceStore();
const searchKeyword = ref("");
const loading = ref(false);
const searchLoading = ref(false);
const dialog = ref(false);

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
  cashAdvance.employee_id = employee.id;
  cashAdvance.employee_name = `${employee.firstname} ${
    employee.middlename ? employee.middlename.charAt(0) + "." : ""
  } ${employee.lastname}`;
  cashAdvance.employee_position = employee.position;
  searchKeyword.value = "";
};

const cashAdvance = reactive({
  employee_id: "",
  employee_name: "",
  employee_position: "",
  amount: 0,
  reason: "",
  number_of_payments: 0,
  payment_per_payroll: 0,
  remaining_payments: 0,
});

watch(
  () => [cashAdvance.amount, cashAdvance.number_of_payments],
  ([amount, numPayments]) => {
    const amt = parseFloat(amount) || 0;
    const num = parseInt(numPayments) || 0;
    cashAdvance.payment_per_payroll = num > 0 ? (amt / num).toFixed(2) : 0;
  }
);

const clearCashAdvanceForm = () => {
  Object.assign(cashAdvance, {
    employee_id: "",
    employee_name: "",
    employee_position: "",
    amount: 0,
    reason: "",
    number_of_payments: 0,
    payment_per_payroll: 0,
    remaining_payments: 0,
  });
};

const save = async () => {
  cashAdvance.remaining_payments = parseFloat(cashAdvance.amount) || 0;
  loading.value = true;
  try {
    await cashAdvanceStore.createCashAdvance(cashAdvance);
    emit("created");
    dialog.value = false;
    clearCashAdvanceForm();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
.cash-advance-dialog-card {
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
  box-shadow: 0 4px 15px rgba(19, 141, 163, 0.711);
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
  max-height: 250px;
  overflow-y: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
</style>
