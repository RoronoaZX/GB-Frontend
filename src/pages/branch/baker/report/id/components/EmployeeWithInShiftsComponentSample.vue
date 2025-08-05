<template>
  <div class="q-pa-md bg-grey-1" style="min-height: 100vh">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6 text-primary text-center">
          Employee with-in Shifts
        </div>
      </q-card-section>

      <q-card-section class="q-ma-sm q-gutter-md row items-center">
        <div class="col-grow" style="position: relative">
          <q-input
            v-model="searchKeyword"
            @update:model-value="search"
            @clear="clearAutoFilledEmployee"
            :loading="searchLoading"
            label="Search Employee"
            filled
            clearable
            debounce="500"
            placeholder="Enter employee name"
          />
          <div v-if="isDropdownVisible && showUserCard" class="dropdown-list">
            <q-list separator>
              <q-item v-if="!employees?.length">
                <q-item-section class="text-grey-7">
                  No employee found.
                </q-item-section>
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

        <q-select
          v-model="employeeWithInShift.designation"
          :options="designationOptions"
          filled
          label="Designation"
          style="width: 170px"
          behavior="menu"
        />
        <q-select
          v-model="employeeWithInShift.shift_status"
          :options="shiftStatusOptions"
          filled
          label="Shift status"
          style="width: 130px"
          behavior="menu"
        />
        <q-btn
          rounded
          label="Add to list"
          icon-right="add_circle_outline"
          color="primary"
          @click="addToShiftList"
          class="q-px-lg"
        />
      </q-card-section>

      <q-separator class="q-mx-md q-mt-md" />

      <q-card-section>
        <q-list separator class="q-mt-sm">
          <q-item class="text-bold text-uppercase text-grey-7">
            <q-item-section>Name</q-item-section>
            <q-item-section>Designation</q-item-section>
            <q-item-section>Shift status</q-item-section>
            <q-item-section side>Action</q-item-section>
          </q-item>

          <q-item
            v-if="employeeWithInShiftList.length === 0"
            class="text-italic text-grey-6 text-center"
          >
            <q-item-section>No employees added to shift.</q-item-section>
          </q-item>

          <q-item
            v-for="(employee, index) in employeeWithInShiftList"
            :key="employee.employee_id"
            class="list-item"
          >
            <q-item-section>
              <q-item-label class="text-bold">{{
                employee.employee_name
              }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ employee.designation }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ employee.shift_status }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                flat
                round
                icon="close"
                color="red"
                size="sm"
                @click="employeeWithInShiftList.splice(index, 1)"
              >
                <q-tooltip>Remove from list</q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useEmployeeStore } from "src/stores/employee";
import { reactive, ref, computed, watch } from "vue";
import SearchEmployee from "./SearchEmployee.vue";

const employeesStore = useEmployeeStore();
const employees = computed(() => employeesStore.employees);

const searchKeyword = ref("");
const searchLoading = ref(false);
const showUserCard = ref(false);
let employeeSelected = false;
const employeeWithInShiftList = ref([]);

const shiftStatusOptions = ["half day", "whole day"];
const designationOptions = ["Baker", "Lamesador", "Hornero"];

const employeeWithInShift = reactive({
  employee_id: "",
  employee_name: "",
  designation: "",
  shift_status: "",
});

const search = async () => {
  if (searchKeyword.value.trim()) {
    searchLoading.value = true;
    await employeesStore.searchEmployee(searchKeyword.value);
    searchLoading.value = false;
    showUserCard.value = true;
    console.log("employeess", employees);
  }
};

const isDropdownVisible = computed(() => {
  return searchKeyword.value && employees.value.length > 0;
});

const autoFillEmployee = (employee) => {
  employeeWithInShift.employee_id = employee.id;
  employeeWithInShift.employee_name = `${employee.firstname} ${
    employee.middlename ? employee.middlename.charAt(0) + "." : ""
  } ${employee.lastname}`;
  searchKeyword.value = `${employee.firstname} ${
    employee.middlename ? employee.middlename.charAt(0) + "." : ""
  } ${employee.lastname}`;
  employeeSelected = true;
  showUserCard.value = false;
};

const clearAutoFilledEmployee = () => {
  searchKeyword.value = "";
  showUserCard.value = false;
  employeeSelected = false;
  employeeWithInShift.employee_id = "";
  employeeWithInShift.employee_name = "";
  employeeWithInShift.designation = "";
  employeeWithInShift.shift_status = "";
};

const addToShiftList = () => {
  console.log("Employee ID:", employeeWithInShift.employee_id);
  console.log("Designation:", employeeWithInShift.designation);
  console.log("Shift Status:", employeeWithInShift.shift_status);

  if (
    !employeeWithInShift.employee_id ||
    !employeeWithInShift.designation ||
    !employeeWithInShift.shift_status
  ) {
    console.warn("❌ Missing data. Cannot add to list.");
    return;
  } // 💡 Check if list already has data

  if (employeeWithInShiftList.value.length > 0) {
    console.log("⚠️ List already has data");
  } else {
    console.log("✅ List is currently empty");
  }

  const exist = employeeWithInShiftList.value.some(
    (emp) => emp.employee_id === employeeWithInShift.employee_id
  );

  if (!exist) {
    employeeWithInShiftList.value.push({ ...employeeWithInShift });
    clearAutoFilledEmployee();
  }

  console.log("📋 Updated List:", employeeWithInShiftList.value);
};
</script>

<style scoped lang="scss">
.my-card {
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
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

.list-item {
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f5f5f5;
  }
}
</style>
