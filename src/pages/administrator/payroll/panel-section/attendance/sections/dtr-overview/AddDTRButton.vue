<template>
  <div>
    <q-btn
      padding="sm md"
      label="Add DTR"
      icon="add_circle"
      size="md"
      class="gradient-btn text-white"
      @click="openDialog"
    />

    <q-dialog
      v-model="dialog"
      full-height
      persistent
      position="right"
      backdrop-filter="blur(4px) saturate(150%)"
    >
      <q-card style="width: 500px; max-width: 100vw">
        <q-card-section
          class="row items-center q-px-md q-py-sm gradient-btn text-white"
        >
          <div class="text-h5 q-mr-md">🕔 Add Employee DTR</div>
          <q-space />
          <q-btn icon=" arrow_forward_ios" flat dense round v-close-popup />
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-md">
            <div class="q-mb-lg">
              <q-input
                v-model="searchKeyword"
                label="Search Employee"
                outlined
                dense
                @update:model-value="search"
                debounce="500"
                placeholder="Enter name"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
                <div v-if="searchKeyword" class="dropdown-list">
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
                          {{ formatFullname(employee) }}
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-list>
                </div>
              </q-input>
            </div>
            <div class="q-gutter-y-md">
              <div class="row q-gutter-sm q-my-lg">
                <q-input
                  v-model="employeeDTR.employee_name"
                  outlined
                  dense
                  readonly
                  label="Name"
                />
                <q-input
                  v-model="employeeDTR.employee_position"
                  outlined
                  dense
                  readonly
                  label="Position"
                  style="width: 115px"
                />
                <q-input
                  v-model="employeeDTR.employee_allowance"
                  outlined
                  dense
                  label="Allowance"
                  readonly
                  prefix="₱"
                  style="width: 100px"
                />
              </div>
              <div class="row q-gutter-md q-mb-md">
                <q-select
                  v-model="employeeDTR.device_uuid_in"
                  :options="branchWithWarehousesOptions"
                  autofocus
                  label="Where IN"
                  option-label="label"
                  option-value="value"
                  emit-value
                  map-options
                  outlined
                  dense
                  behavior="menu"
                  style="width: 215px"
                />
                <q-select
                  v-model="employeeDTR.device_uuid_out"
                  :options="branchWithWarehousesOptions"
                  autofucos
                  label="Where OUT"
                  option-label="label"
                  option-value="value"
                  emit-value
                  map-options
                  outlined
                  dense
                  behavior="menu"
                  style="width: 215px"
                />
              </div>
              <div class="row q-gutter-md">
                <div>
                  <div>DTR IN</div>
                  <q-input
                    v-model="employeeDTR.time_in"
                    type="datetime-local"
                    dense
                    outlined
                    hint="Select date & time"
                    style="width: 215px"
                  />
                </div>
                <div>
                  <div>DTR OUT</div>
                  <q-input
                    v-model="employeeDTR.time_out"
                    type="datetime-local"
                    dense
                    outlined
                    hint="Select date & time"
                    style="width: 215px"
                  />
                </div>
              </div>
              <div class="row q-gutter-md">
                <div>
                  <div>Lunch break start</div>
                  <q-input
                    v-model="employeeDTR.lunch_break_start"
                    type="datetime-local"
                    dense
                    outlined
                    hint="Select date & time"
                    style="width: 215px"
                  />
                </div>
                <div>
                  <div>Lunch break end</div>
                  <q-input
                    v-model="employeeDTR.lunch_break_end"
                    type="datetime-local"
                    dense
                    outlined
                    hint="Select date & time"
                    style="width: 215px"
                  />
                </div>
              </div>
              <div class="row q-gutter-md">
                <div>
                  <div>Break start</div>
                  <div>
                    <q-input
                      v-model="employeeDTR.break_start"
                      type="datetime-local"
                      dense
                      outlined
                      hint="Select date & time"
                      style="width: 215px"
                    />
                  </div>
                </div>
                <div>
                  <div>Break end</div>
                  <div>
                    <q-input
                      v-model="employeeDTR.break_end"
                      type="datetime-local"
                      dense
                      outlined
                      hint="Select date & time"
                      style="width: 215px"
                    />
                  </div>
                </div>
                <div class="row q-gutter-md">
                  <div>
                    <div>Shift status</div>
                    <q-select
                      v-model="employeeDTR.shift_status"
                      :options="[
                        { label: 'Regular Day', value: 'Regular Day' },
                        { label: 'Half Day', value: 'Half Day' },
                      ]"
                      option-label="label"
                      option-value="value"
                      emit-value
                      behavior="menu"
                      outlined
                      dense
                      style="width: 140px"
                    />
                  </div>
                  <div>
                    <div>Schedule IN</div>
                    <q-input
                      v-model="employeeDTR.schedule_in"
                      dense
                      outlined
                      mask="##:## AA"
                      :rules="[validateTimeFormat]"
                      hint="Format: 01:00 AM/PM"
                      placeholder="--:-- AM/PM"
                      style="width: 130px"
                    />
                  </div>
                  <div>
                    <div>Schedule OUT</div>
                    <q-input
                      v-model="employeeDTR.schedule_out"
                      dense
                      outlined
                      mask="##:## AA"
                      :rules="[validateTimeFormat]"
                      hint="Format: 01:00 AM/PM"
                      placeholder="--:-- AM/PM"
                      style="width: 130px"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <q-btn
                size="md"
                padding="xs md"
                label="save"
                icon-right="send"
                class="gradient-btn text-white"
                @click="save"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useDTRStore } from "src/stores/dtr";
import { useEmployeeStore } from "src/stores/employee";
import { computed, onMounted, reactive, ref } from "vue";
import { date } from "quasar";

const dtrStore = useDTRStore();
const employeeStore = useEmployeeStore();
const branchWithWarehousesList = computed(() => dtrStore.branchWithWarehouses);

const employees = computed(() => employeeStore.employees);
const emit = defineEmits(["created"]);

const searchKeyword = ref("");
const dialog = ref(false);

const validateTimeFormat = (val) => {
  // Regex to match "HH:MM AM/PM" format.
  // HH: 01-12
  // MM: 00-59
  // AM/PM: AM or PM
  const timeRegex = /^(0[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/;
  return (
    timeRegex.test(val) || "Time format must be HH:MM AM/PM (e.g., 01:00 AM)"
  );
};

const openDialog = () => {
  dialog.value = true;
};

const search = async () => {
  if (searchKeyword.value.trim()) {
    await employeeStore.searchEmployee(searchKeyword.value);
  }
};

const employeeDTR = reactive({
  employee_id: null,
  employee_name: null,
  employee_position: null,
  employee_allowance: null,
  device_uuid_in: null,
  device_uuid_out: null,
  time_in: null,
  time_out: null,
  lunch_break_start: null,
  lunch_break_end: null,
  break_start: null,
  break_end: null,
  overtime_start: null,
  overtime_end: null,
  overtime_reason: null,
  ot_status: null,
  approved_by: null,
  declined_reason: null,
  half_day_reason: null,
  shift_status: null,
  schedule_in: null,
  schedule_out: null,
});

const autoFillEmployee = (employee) => {
  console.log("autoFillEmployee", employee);

  employeeDTR.employee_id = employee.id;
  employeeDTR.employee_name = formatFullname(employee);
  employeeDTR.employee_position = employee.position;
  employeeDTR.employee_allowance = employee?.employee_allowance?.amount || 0;
  searchKeyword.value = "";
};

const formatFullname = (employee) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstname = employee.firstname
    ? capitalize(employee.firstname)
    : "No Firstname";
  const middlename = employee.middlename
    ? capitalize(employee.middlename).charAt(0) + "."
    : "";
  const lastname = employee.lastname
    ? capitalize(employee.lastname)
    : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`;
};

const getBranchWithWarehouses = async () => {
  try {
    const response = await dtrStore.getBranchWithWarehouses();
  } catch (error) {
    console.log("error", error);
  }
};
onMounted(getBranchWithWarehouses);

const branchWithWarehousesOptions = computed(() => {
  return branchWithWarehousesList.value.data.map((list) => ({
    label: list.name,
    value: list.devices[0]?.uuid,
  }));
});

const formatDateTime = (datetime) => {
  if (!datetime) return null;
  return date.formatDate(datetime, "MMM. DD, YYYY, hh:mm A");
};

const closeDialog = () => {
  dialog.value = false;

  Object.keys(employeeDTR).forEach((key) => {
    employeeDTR[key] = null;
  });
};

const save = async () => {
  console.log("dtr save", employeeDTR);

  try {
    const payload = {
      ...employeeDTR,
      time_in: formatDateTime(employeeDTR.time_in),
      time_out: formatDateTime(employeeDTR.time_out),
      lunch_break_start: formatDateTime(employeeDTR.lunch_break_start),
      lunch_break_end: formatDateTime(employeeDTR.lunch_break_end),
      break_start: formatDateTime(employeeDTR.break_start),
      break_end: formatDateTime(employeeDTR.break_end),
      overtime_start: formatDateTime(employeeDTR.overtime_start),
      overtime_end: formatDateTime(employeeDTR.overtime_end),
    };
    console.log("payload", payload);

    await dtrStore.saveEmployeeDtr(payload);
    emit("created");
    closeDialog();
  } catch (error) {
    console.log("error", error);
  }
};
</script>

<style lang="scss" scoped>
.gradient-btn {
  // background: linear-gradient(45deg, #103432, #2575fc);
  background: linear-gradient(45deg, #263238, #244c5e);
  border: none;
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
