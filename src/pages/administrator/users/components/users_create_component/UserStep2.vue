<template>
  <q-card flat style="width: 500px; max-width: 80vw">
    <div class="q-my-md">
      <q-input
        dense
        rounded
        outlined
        placeholder="Search employee"
        v-model="searchKeyword"
        @update:model-value="search"
        debounce="500"
      >
        <template v-slot:append>
          <q-icon name="search"></q-icon>
        </template>
        <div v-if="searchKeyword" class="custom-list z-top">
          <q-card>
            <q-list separator>
              <q-item v-if="!employees?.length"> No Employee Record </q-item>
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
    </div>
    <q-card-section>
      <div class="q-gutter-y-sm">
        <div class="q-gutter-y-sm q-mx-auto">
          <q-input
            class="text-capitalize"
            v-model="userPersonalInfoForm.user_first_name"
            @update:model-value="$emit('updateData', userPersonalInfoForm)"
            outlined
            dense
            readonly
            label="First Name"
            :rules="[(val) => (val && val.length > 0) || 'Required']"
          />
          <q-input
            class="text-capitalize"
            v-model="userPersonalInfoForm.user_middle_name"
            @update:model-value="$emit('updateData', userPersonalInfoForm)"
            outlined
            readonly
            dense
            label="Middle Name"
            :rules="[(val) => (val && val.length > 0) || 'Required']"
          />
          <q-input
            class="text-capitalize"
            v-model="userPersonalInfoForm.user_last_name"
            @update:model-value="$emit('updateData', userPersonalInfoForm)"
            outlined
            dense
            readonly
            label="Last Name"
            :rules="[(val) => (val && val.length > 0) || 'Required']"
          />
          <q-input
            class="text-capitalize"
            v-model="userPersonalInfoForm.user_address"
            @update:model-value="$emit('updateData', userPersonalInfoForm)"
            outlined
            dense
            readonly
            label="Address"
            :rules="[(val) => (val && val.length > 0) || 'Required']"
          />
        </div>
        <div class="row q-gutter-x-sm item-start">
          <div>
            <q-input
              v-model="userPersonalInfoForm.user_birthdate"
              @update:model-value="$emit('updateData', userPersonalInfoForm)"
              outlined
              dense
              readonly
              label="Birthdate"
              type="date"
              style="width: 230px"
              :rules="[(val) => (val && val.length > 0) || 'Required']"
            />
          </div>
          <div>
            <q-input
              v-model="userPersonalInfoForm.user_sex"
              @update:model-value="$emit('updateData', userPersonalInfoForm)"
              dense
              outlined
              readonly
              label="Sex"
              :options="genderOptions"
              :rules="[(val) => (val && val.length > 0) || 'Required']"
              style="width: 120px"
              behavior="menu"
              hide-dropdown-icon
            />
          </div>
          <!-- <div>
            <q-select
              v-model="userPersonalInfoForm.user_status"
              :options="statusOptions"
              @update:model-value="$emit('updateData', userPersonalInfoForm)"
              dense
              outlined
              hide-dropdown-icon
              label="Status"
              style="width: 100px"
              :rules="[(val) => (val && val.length > 0) || 'Required']"
              behavior="menu"
            />
          </div> -->
        </div>
        <div class="row q-gutter-x-md">
          <div>
            <q-input
              v-model="userPersonalInfoForm.user_phone_number"
              @update:model-value="$emit('updateData', userPersonalInfoForm)"
              outlined
              dense
              readonly
              label="Phone Number"
              mask="+(63) ### - ### - ####"
              placeholder="(+63) ### - ### - ####"
              :rules="[(val) => (val && val.length > 0) || 'Required']"
              style="width: 300px; max-width: 500px; min-width: 100px"
            />
          </div>
          <div>
            <q-input
              v-model="userPersonalInfoForm.user_position"
              @update:model-value="$emit('updateData', userPersonalInfoForm)"
              outlined
              dense
              readonly
              hide-dropdown-icon
              label="Position"
              :options="positionOptions"
              :rules="[(val) => (val && val.length > 0) || 'Required']"
              style="width: 150px; max-width: 500px; min-width: 100px"
            />
          </div>
        </div>
        <div>Designation</div>
        <div class="row q-gutter-x-md">
          <div>
            <q-input
              v-model="userPersonalInfoForm.user_branch_name"
              @update:model-value="$emit('updateData', userPersonalInfoForm)"
              outlined
              flat
              readonly
              dense
              use-input
              clearable
              input-debounce="0"
              :options="filterBranchOptions"
              label="Branch"
              @filter="filteredBranches"
              style="width: 250px; max-width: 500px; min-width: 100px"
              hide-dropdown-icon
              behavior="menu"
            />
          </div>
          <div>
            <q-input
              outlined
              v-model="userPersonalInfoForm.user_time_shift"
              @update:model-value="$emit('updateData', userPersonalInfoForm)"
              flat
              dense
              readonly
              mask="##:## AA"
              label="Time Schedule"
              :rules="valididateTime"
              hint="Format: 01:00 AM/PM"
              style="width: 200px; max-width: 500px; min-width: 100px"
              hide-dropdown-icon
            />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useBranchesStore } from "src/stores/branch";
import { useEmployeeStore } from "src/stores/employee";
import { computed, onMounted, reactive, ref } from "vue";

const emit = defineEmits(["updateData"]);
const { userData } = defineProps({
  userData: {
    type: Object,
    default: () => ({}),
  },
});

const employeeStore = useEmployeeStore();
const searchKeyword = ref("");

const employees = computed(() => employeeStore.employees);
const search = async () => {
  if (searchKeyword.value.trim()) {
    await employeeStore.searchEmployeesWithDesignation(searchKeyword.value);
  }
};

const formaTimeShift = (timeShift) => {
  if (!timeShift) return "Not Applicable";

  const [hours, minutes] = timeShift.split(":");
  const date = new Date();
  date.setHours(hours, minutes);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const autoFillEmployee = (employee) => {
  userPersonalInfoForm.employee_id = employee.id || "Not Available";
  userPersonalInfoForm.user_first_name = employee.firstname || "";
  userPersonalInfoForm.user_middle_name = employee.middlename || "";
  userPersonalInfoForm.user_last_name = employee.lastname || "";
  userPersonalInfoForm.user_address = employee.address || "No Address";
  userPersonalInfoForm.user_birthdate = employee.birthdate || "Not Provided";
  userPersonalInfoForm.user_sex = employee.sex || "Unknown";
  userPersonalInfoForm.user_phone_number = employee.phone || "No Phone";
  userPersonalInfoForm.user_position = employee.position || "Not Assigned";
  userPersonalInfoForm.user_branch_name =
    employee.branch_employee?.branch?.name || "Not Applicable";
  userPersonalInfoForm.user_time_shift = employee.branch_employee?.time_shift
    ? formaTimeShift(employee.branch_employee?.time_shift)
    : "Not Applicable";

  searchKeyword.value = "";
  emit("updateData", userPersonalInfoForm); // Use emit instead of $emit
};

const userPersonalInfoForm = reactive({
  employee_id: "",
  user_first_name: "",
  user_middle_name: "",
  user_last_name: "",
  user_address: "",
  user_birthdate: "",
  user_sex: "",
  user_phone_number: "",
  user_position: "",
  user_branch_name: "",
  user_time_shift: "",
});

console.log("userPersonalInfoForm:", userPersonalInfoForm);
onMounted(() => {
  Object.assign(userPersonalInfoForm, userData);
});

// Function to emit updated data
const emitUpdateData = () => {
  emit("updateData", userPersonalInfoForm);
};
</script>

<style lang="scss" scoped></style>
