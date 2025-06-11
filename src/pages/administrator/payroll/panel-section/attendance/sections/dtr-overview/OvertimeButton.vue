<template>
  <div>
    <q-btn
      padding="sm md"
      label="Add Over Time"
      icon="add_circle"
      size="md"
      class="gradient-btn text-white"
      @click="openDialog"
    >
    </q-btn>
  </div>
  <div>
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
          <div class="text-h5 q-mr-md">🕔 Add Over Time</div>
          <q-space />
          <q-btn icon="arrow_forward_ios" flat dense round v-close-popup />
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
                            {{ formatFullname(employee) }}
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-list>
                  </q-card>
                </div>
              </q-input>
            </div>
            <div>
              <div class="q-gutter-md q-my-lg">
                <q-input
                  v-model="overtimeForm.employee_name"
                  outlined
                  dense
                  readonly
                  label="Name"
                ></q-input>
                <q-input
                  v-model="overtimeForm.position"
                  outlined
                  dense
                  readonly
                  label="Position"
                ></q-input>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="overtimeForm.regularDateIN"
            outlined
            dense
            label="Regular Date IN"
            type="date"
          />
        </q-card-section>
        <q-card-section>
          <div class="q-mt-xl q-gutter-y-md">
            <div class="row justify-between">
              <div>
                <q-input
                  v-model="overtimeForm.dateIn"
                  outlined
                  dense
                  label="Date IN"
                  type="date"
                  style="width: 170px"
                />
              </div>
              <div>
                <q-input
                  v-model="overtimeForm.timeIn"
                  label="Time IN"
                  dense
                  mask="##:## AA"
                  outlined
                  :rules="valididateTime"
                  hint="Format: hh:mm AM/PM"
                />
              </div>
            </div>
            <div class="row justify-between">
              <div>
                <q-input
                  v-model="overtimeForm.dateOut"
                  outlined
                  dense
                  label="Date OUT"
                  type="date"
                  style="width: 170px"
                />
              </div>
              <div>
                <q-input
                  v-model="overtimeForm.timeOut"
                  label="Time OUT"
                  dense
                  mask="##:## AA"
                  outlined
                  :rules="valididateTime"
                  hint="Format: hh:mm AM/PM"
                />
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-card-actions class="q-mt-md">
            <q-btn
              size="md"
              padding="xs md"
              label="save"
              icon-right="send"
              class="gradient-btn text-white"
              @click="save"
            />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { useEmployeeStore } from "src/stores/employee";
import { useDTRStore } from "src/stores/dtr";

const dtrStore = useDTRStore();
const employeeStore = useEmployeeStore();
const searchKeyword = ref("");

const employees = computed(() => employeeStore.employees);
const search = async () => {
  if (searchKeyword.value.trim()) {
    await employeeStore.searchEmployee(searchKeyword.value);
  }
};

const dialog = ref(false);

const openDialog = () => {
  dialog.value = true;
};

const valididateTime = (val) => {
  const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
  return timeRegex.test(val) || "Invalid time format";
};

const autoFillEmployee = (employee) => {
  overtimeForm.employee_id = employee.id;
  overtimeForm.employee_name = `${employee.firstname} ${
    employee.middlename ? employee.middlename.charAt(0) + "." : ""
  } ${employee.lastname}`;
  overtimeForm.position = employee.position;
  searchKeyword.value = "";
};

const overtimeForm = reactive({
  employee_id: "",
  employee_name: "",
  position: "",
  regularDateIN: "",
  dateIn: "",
  dateOut: "",
  timeIn: "",
  timeOut: "",
});

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`;
};

const save = async () => {
  const overtime_in = `${overtimeForm.dateIn} ${overtimeForm.timeIn}`;
  const overtime_out = `${overtimeForm.dateOut} ${overtimeForm.timeOut}`;

  const dataToSend = {
    ...overtimeForm,
    overtime_in: overtime_in,
    overtime_out: overtime_out,
  };
  await dtrStore.saveOvertime(dataToSend);
  console.log("overtime dATA", dataToSend);
};
</script>

<style lang="scss" scoped>
.gradient-btn {
  background: linear-gradient(45deg, #103432, #2575fc);
  border: none;
}
.cancel-btn {
  background: linear-gradient(45deg, #0c0e0e, #85888f);
  border: none;
}
</style>
