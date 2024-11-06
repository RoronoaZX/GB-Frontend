<template>
  <div>
    <q-btn
      padding="sm md"
      label="Add Allowance"
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
          <div class="text-h5 q-mr-md">💼 Add Employee Allowance</div>
          <q-space />
          <q-btn icon="arrow_forward_ios" flat dense round v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="searchKeyword"
            @update:model-value="search"
            label="Search Employee"
            outlined
            dense
            rounded
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
                    No Employee Record
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
          <div class="q-gutter-md">
            <q-input
              v-model="employeeAllowance.employee_name"
              outlined
              dense
              readonly
              label="Name"
            />
            <q-input
              v-model="employeeAllowance.employee_position"
              outlined
              dense
              readonly
              label="Position"
            />
          </div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="employeeAllowance.amount"
            outlined
            dense
            label="Allowance amount"
          />
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
import { useEmployeeAllowance } from "src/stores/allowance";
import { useEmployeeStore } from "stores/employee";
import { computed, reactive, ref } from "vue";

const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);
const employeeAllowanceStore = useEmployeeAllowance();
const employeeAllowanceRows = computed(() => employeeAllowanceStore.allowances);
const searchKeyword = ref("");
const dialog = ref(false);
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

  employeeAllowance.employee_id = employee.id;
  employeeAllowance.employee_name = `${employee.firstname} ${
    employee.middlename ? employee.middlename.charAt(0) + "." : ""
  } ${employee.lastname}`;
  employeeAllowance.employee_position = employee.position;
  searchKeyword.value = "";
  console.log("Filled Designation Data:", employeeAllowance);
};

const employeeAllowance = reactive({
  employee_id: "",
  employee_name: "",
  employee_position: "",
  amount: "",
});

const clearEmployeeAllowanceForm = () => {
  (employeeAllowance.employee_id = ""),
    (employeeAllowance.employee_name = ""),
    (employeeAllowance.employee_position = ""),
    (employeeAllowance.amount = "");
};

const save = async () => {
  loading.value = true;
  try {
    const dataToBeSave = await employeeAllowanceStore.createEmployeeAllowance(
      employeeAllowance
    );
    console.log("data to be save", dataToBeSave);
    clearEmployeeAllowanceForm();
    employeeAllowanceRows.value =
      await employeeAllowanceStore.fetchEmployeeAllowance();
    dialog.value = false;
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
