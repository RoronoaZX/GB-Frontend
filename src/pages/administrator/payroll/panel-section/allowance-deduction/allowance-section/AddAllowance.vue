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
      <q-card class="compact-dialog-card">
        <!-- Header -->
        <q-card-section class="dialog-header row items-center no-wrap">
          <div class="text-h6 text-weight-bold">💼 Add Employee Allowance</div>
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
        <q-card-section class="q-px-lg q-pt-md">
          <div style="position: relative">
            <q-input
              v-model="searchKeyword"
              @update:model-value="search"
              label="Search Employee"
              outlined
              dense
              rounded
              debounce="500"
              placeholder="Enter employee name"
              clearable
            >
              <template v-slot:append>
                <q-icon v-if="!searchLoading" name="search" />
                <q-spinner v-else color="primary" size="sm" />
              </template>
            </q-input>

            <div v-if="searchKeyword" class="dropdown-list">
              <q-list separator>
                <q-item v-if="!employees?.length">
                  <q-item-section class="text-grey-7"
                    >No employee found.</q-item-section
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
        </q-card-section>

        <!-- Name and Position -->
        <q-card-section class="q-px-lg q-pt-md">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-input
                v-model="employeeAllowance.employee_name"
                outlined
                dense
                readonly
                label="Name"
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                v-model="employeeAllowance.employee_position"
                outlined
                dense
                readonly
                label="Position"
              />
            </div>
          </div>
        </q-card-section>

        <!-- Allowance Amount -->
        <q-card-section class="q-px-lg q-pt-md">
          <q-input
            v-model="employeeAllowance.amount"
            outlined
            dense
            label="Allowance Amount"
            prefix="₱"
            type="number"
            clearable
          />
        </q-card-section>

        <!-- Footer -->
        <q-card-actions align="right" class="q-px-lg q-pb-md">
          <q-btn
            size="md"
            padding="sm lg"
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
import { useEmployeeAllowance } from "src/stores/allowance";
import { useEmployeeStore } from "stores/employee";
import { computed, reactive, ref } from "vue";

const emit = defineEmits(["created"]);
const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);
const employeeAllowanceStore = useEmployeeAllowance();
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
  employeeAllowance.employee_id = employee.id;
  employeeAllowance.employee_name = `${employee.firstname} ${
    employee.middlename ? employee.middlename.charAt(0) + "." : ""
  } ${employee.lastname}`;
  employeeAllowance.employee_position = employee.position;
  searchKeyword.value = "";
};

const employeeAllowance = reactive({
  employee_id: "",
  employee_name: "",
  employee_position: "",
  amount: "",
});

const clearEmployeeAllowanceForm = () => {
  employeeAllowance.employee_id = "";
  employeeAllowance.employee_name = "";
  employeeAllowance.employee_position = "";
  employeeAllowance.amount = "";
};

const save = async () => {
  loading.value = true;
  try {
    await employeeAllowanceStore.createEmployeeAllowance(employeeAllowance);
    emit("created");
    dialog.value = false;
    clearEmployeeAllowanceForm();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
.compact-dialog-card {
  width: 500px;
  max-width: 90vw;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.dialog-header {
  background: linear-gradient(90deg, #6c5ce7, #8e44ad);
  color: white;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.gradient-btn {
  background: linear-gradient(140deg, #27234b 0%, #353269 100%);
  box-shadow: 0 2px 8px rgba(45, 36, 111, 0.711);
  transition: all 0.3s ease;
}

.gradient-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(34, 29, 73, 0.6);
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
