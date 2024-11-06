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
      <q-card style="width: 400px; max-width: 80vw">
        <q-card-section
          class="row items-center q-px-md q-py-sm gradient-btn text-white"
        >
          <div class="text-h5 q-mr-md">💲 Add Cash Advance</div>
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
                    No Employee record
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
        <q-card-section>
          <div class="row q-gutter-md text-subtitle1">
            <div>Name:</div>
            <div class="text-weight-meduim">
              {{
                cashAdvance.employee_name
                  ? cashAdvance.employee_name
                  : "-------"
              }}
            </div>
          </div>
          <div class="row q-gutter-md text-subtitle1">
            <div>Position:</div>
            <div class="text-weight-meduim">
              {{
                cashAdvance.employee_position
                  ? cashAdvance.employee_position
                  : "-------"
              }}
            </div>
          </div>
          <!-- <div class="q-gutter-md">
            <q-input outlined dense readonly label="Name" />
            <q-input outlined dense readonly label="Position" />
          </div> -->
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-y-md">
            <div>
              <q-input v-model="cashAdvance.amount" outlined label="Amount" />
            </div>
            <!-- <div class="row justify-between">
              <q-input
                v-model="cashAdvance.number_of_payments"
                outlined
                label="Number of Payments"
                style="width: 180px"
              />
              <q-input
                v-model="cashAdvance.payments_per_payroll"
                outlined
                readonly
                label="Payments per Payroll"
                style="width: 180px"
              />
            </div> -->
            <div>
              <q-input
                v-model="cashAdvance.reason"
                filled
                type="textarea"
                outlined
                label="Reason"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn
            size="md"
            padding="xs md"
            label="save"
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
import { computed, reactive, ref } from "vue";
import { useCashAdvanceStore } from "stores/cash-advance";

const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);
const cashAdvanceStore = useCashAdvanceStore();
const cashAdvanceRows = computed(() => cashAdvanceStore.cashAdvances);
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
  console.log("Selected Employee:", employee);
  cashAdvance.employee_id = employee.id;
  cashAdvance.employee_name = `${employee.firstname} ${
    employee.middlename ? employee.middlename.charAt(0) + "." : ""
  } ${employee.lastname} `;
  (cashAdvance.employee_position = employee.position),
    (searchKeyword.value = "");
  console.log("Filled Designation Data:", cashAdvance);
};

const cashAdvance = reactive({
  employee_id: "",
  employee_name: "",
  employee_position: "",
  amount: "",
  reason: "",
  // number_of_payments: 1,
  // payments_per_payroll: "",
});

const clearCashAdvanceForm = () => {
  (cashAdvance.employee_id = ""),
    (cashAdvance.employee_name = ""),
    (cashAdvance.employee_position = ""),
    (cashAdvance.amount = ""),
    (cashAdvance.reason = "");
};
// Math.round
// watch([() => cashAdvance.amount, () => cashAdvance.number_of_payments], () => {
//   cashAdvance.payments_per_payroll =
//     cashAdvance.amount / (cashAdvance.number_of_payments || 1);
// });

const save = async () => {
  console.log("cashAdvance", cashAdvance);
  loading.value = true;
  try {
    const response = await cashAdvanceStore.createCashAdvance(cashAdvance);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }

  clearCashAdvanceForm();
  cashAdvanceRows.value = await cashAdvanceStore.fetchCashAdvance();
  dialog.value = false;
};
</script>

<style lang="scss" scoped>
.gradient-btn {
  background: linear-gradient(90deg, #a621a6, #502a33);
  border: none;
}
</style>
