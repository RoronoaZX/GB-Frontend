<template>
  <div>
    <q-btn
      padding="sm md"
      label="Add Benefits"
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
      <q-card style="width: 400px; max-width: 80vw">
        <q-card-section
          class="row items-center q-px-md q-py-sm gradient-btn text-white"
        >
          <div class="text-h5 q-mr-md">💼 Add Employee Deductions</div>
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
        <q-card-section>
          <div class="row q-gutter-md text-subtitle1">
            <div>Name:</div>
            <div class="text-weight-medium">
              {{
                employeeDeduction.employee_name
                  ? employeeDeduction.employee_name
                  : "-------"
              }}
            </div>
          </div>
          <div class="row q-gutter-md text-subtitle1">
            <div>Position:</div>
            <div class="text-weight-medium">
              {{
                employeeDeduction.employee_position
                  ? employeeDeduction.employee_position
                  : "-------"
              }}
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-y-md">
            <div>
              <q-input
                v-model="employeeDeduction.sss"
                outlined
                label="SSS (Social Security System )"
              />
            </div>
            <div>
              <q-input
                v-model="employeeDeduction.hdmf"
                outlined
                label="HDMF (Pag-IBIG Fund)"
              />
            </div>
            <div>
              <q-input
                v-model="employeeDeduction.phic"
                outlined
                label="PHIC (Philippine Health Insurance Corporation)"
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
            @click="save"
            :loading="loading"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useEmployeeBenefitStore } from "stores/benefit";
import { useEmployeeStore } from "stores/employee";
import { ref, computed, reactive } from "vue";

const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);
const employeeBenefitStore = useEmployeeBenefitStore();
const employeeBenefitRows = computed(() => employeeBenefitStore.benefits);
const searchKeyword = ref("");
const loading = ref(false);
const searchLoading = ref(false);
const dialog = ref(false);

const openDialog = () => {
  dialog.value = true;
};

const emit = defineEmits(["created"]);

const search = async () => {
  if (searchKeyword.value.trim()) {
    searchLoading.value = true;
    await employeeStore.searchEmployee(searchKeyword.value);
    searchLoading.value = false;
  }
};

const autoFillEmployee = (employee) => {
  console.log("Selected Employee:", employee);
  employeeDeduction.employee_id = employee.id;
  employeeDeduction.employee_name = `${employee.firstname} ${
    employee.middlename ? employee.middlename.charAt(0) + "." : ""
  } ${employee.lastname} `;
  employeeDeduction.employee_position = employee.position;
  searchKeyword.value = "";
  console.log("Filled Designation Data:", employeeDeduction);
};

const employeeDeduction = reactive({
  employee_id: "",
  employee_name: "",
  employee_position: "",
  sss: "",
  hdmf: "",
  phic: "",
});

const clearEmployeeDeductionForm = () => {
  (employeeDeduction.employee_id = ""),
    (employeeDeduction.employee_name = ""),
    (employeeDeduction.employee_position = ""),
    (employeeDeduction.sss = ""),
    (employeeDeduction.hdmf = ""),
    (employeeDeduction.phic = "");
};

const save = async () => {
  console.log("deductionssss:", employeeDeduction);
  loading.value = true;
  try {
    const deduction = await employeeBenefitStore.createEmployeeBenefit(
      employeeDeduction
    );
    console.log("deduction", deduction);
    dialog.value = false;
    clearEmployeeDeductionForm();
    employeeBenefitRows.value =
      await employeeBenefitStore.fetchEmployeeBenefit();
  } catch (error) {
    console.log("error", error);
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
