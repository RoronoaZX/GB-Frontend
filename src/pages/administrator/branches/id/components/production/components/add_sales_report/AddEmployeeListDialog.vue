<template>
  <q-dialog ref="dialogRef">
    <q-card class="my-card">
      <q-card-section class="row justify-between">
        <div class="text-h6 text-primary text-center">
          Employee with-in Shifts
        </div>

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
            clearable
            filled
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
          @click="addTOShiftList"
        />
      </q-card-section>

      <q-separator class="q-mx-md q-mt-md" />

      <q-card-section>
        <q-list separator class="q-mt-sm">
          <q-item class="text-bold text-uppercase text-grey-7">
            <q-item-section>Name</q-item-section>
            <q-item-section>Position</q-item-section>
            <q-item-section side>Action</q-item-section>
          </q-item>

          <q-item
            v-if="employeeWithInShift.length === 0"
            class="text-italic text-grey-6 text-center"
          >
            <q-item-section>No employees added to shift</q-item-section>
          </q-item>

          <q-slide-item
            v-for="(employee, index) in employeeWithInShiftList"
            :key="employee.employee_id"
            right-color="negative"
            @right="onSwipeRight(index)"
          >
            <template #right>
              <q-icon name="delete" />
            </template>

            <q-item class="list-item">
              <q-item-section>
                <q-item-label class="text-bold">
                  {{ employee.employee_name }}
                </q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{ employee.designation }}
                </q-item-label>
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
          </q-slide-item>
        </q-list>
      </q-card-section>

      <q-card-section>
        <div class="q-my-md" align="right">
          <q-btn
            padding="sm md"
            color="red-6"
            dense
            rounded
            label="Submit"
            @click="handleSubmit"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Loading, useDialogPluginComponent, useQuasar } from "quasar";
import { useEmployeeStore } from "src/stores/employee";
import { useSalesReportsStore } from "src/stores/sales-report";
import { computed, reactive, ref } from "vue";

const { dialogRef, onDialogOK } = useDialogPluginComponent();

const employeesStore = useEmployeeStore();
const employees = computed(() => employeesStore.employees);

const salesReportsStore = useSalesReportsStore();
const userData = computed(() => salesReportsStore.user);
console.log("userdata", userData.value);

const employeeWithInShiftList = computed(
  () => salesReportsStore.employeeInShift
);

const props = defineProps({
  created_at: {
    type: String,
    required: true,
  },
  branch_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

console.log("props", props);

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
      console.error("Search failed: ", error);

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
    employee.middle_name ? employee.middle_name.chartAt(0) + "." : ""
  } ${employee.lastname}`;
  searchKeyword.value = `${employee.firstname} ${
    employee.middlename ? employee.middlename.charAt(0) + "." : ""
  } ${employee.lastname}`;
  employeeWithInShift.designation = employee.position;
  employeeSelected = true;
  showUserCard.value = false;
};

const clearAutoFilledEmployee = () => {
  searchKeyword.value = "";
  showUserCard.value = false;
  employeeSelected = false;
  employeeWithInShift.employee_id = "";
};

const addTOShiftList = () => {
  console.log("Employee ID:", employeeWithInShift.employee_id);

  if (!employeeWithInShift.employee_id) {
    $q.notify({
      message: "Please select an employee before adding.",
      colorL: "red-6",
      icon: "warning",
    });
    return;
  }

  const alreadyAdded = employeeWithInShiftList.value.some(
    (e) => e.employee_id === employeeWithInShift.employee_id
  );

  if (alreadyAdded) {
    $q.notify({
      message: "Employee is already added to the shift list.",
      color: "amber-8",
      icon: "info",
    });

    return;
  }

  salesReportsStore.employeeInShift.push({ ...employeeWithInShift });

  $q.notify({
    message: "Employee added to shift list.",
    color: "green-6",
    icon: "check_circle",
  });

  clearAutoFilledEmployee();
};

const handleSubmit = async () => {
  try {
    Loading.show();
    const salesData = {
      user_id: props.user_id,
      branch_id: props.branch_id,
      created_at: props.created_at,
    };

    await salesReportsStore.adminSubmitReports(salesData);
  } catch (error) {
    console.error("Error submitting data:", error);
  } finally {
    Loading.hide();
  }
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
