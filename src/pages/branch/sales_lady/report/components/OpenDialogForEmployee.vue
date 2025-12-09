<template>
  <q-dialog ref="dialogRef">
    <q-card class="my-card">
      <q-card-section class="row justify-between">
        <div class="text-h6 text-primary text-center">
          Employee with-in Shifts
        </div>
        <!-- <q-space /> -->
        <div class="row q-gutter-x-md" align="right">
          <q-btn icon="close" flat dense round v-close-popup>
            <q-tooltip class="bg-blue-grey-6">Close</q-tooltip>
          </q-btn>
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

        <q-btn
          rounded
          label="Add to list"
          icon-right="add_circle_outline"
          color="primary"
          class="q-px-lg"
        />
      </q-card-section>

      <q-separator class="q-mx-md q-mt-md" />

      <q-card-section>
        <q-list separator class="q-mt-sm">
          <q-item class="text-bold text-uppercase text-grey-7">
            <q-item-section>Name</q-item-section>
            <q-item-section>Position</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-section>
        <div class="q-my-md" align="right">
          <q-btn padding="sm md" color="red-6" dense rounded label="Submit">
            <q-icon class="q-mx-sm" left name="send" />
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent, useQuasar } from "quasar";
import { computed, reactive, ref } from "vue";
import { useEmployeeStore } from "src/stores/employee";
import { useSalesReportsStore } from "src/stores/sales-report";

const { dialogRef, onDialogOK } = useDialogPluginComponent();

const employeesStore = useEmployeeStore();
const employees = computed(() => employeesStore.employees);

const $q = useQuasar();

const searchKeyword = ref("");
const searchLoading = ref(false);
const showUserCard = ref(false);
let employeeSelected = false;

const employeeWithInShift = reactive({
  employee_id: "",
  employee_name: "",
  designation: "",
  shift_status: "",
});

const search = async () => {
  if (searchKeyword.value.trim()) {
    searchLoading.value = true;
    try {
      await employeesStore.searchEmployee(searchKeyword.value);
      searchLoading.value = false;
      showUserCard.value = true;
      console.log("employeess", employees);
    } catch (error) {
      console.error("Search failed:", error);
      $q.notify({
        color: "negative",
        message: "Failed to fetch employees",
        icon: "report_problem",
      });
    } finally {
      searchLoading.value = false;
      showUserCard.value = true;
    }
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
</script>

<style>
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
</style>
