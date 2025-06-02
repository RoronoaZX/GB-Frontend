<template>
  <q-btn
    color="positive"
    icon="edit"
    size="sm"
    flat
    round
    dense
    @click="openDialog"
  >
    <!-- @click="openEditForm" -->
    <q-tooltip class="bg-positive" :delay="200">Edit</q-tooltip>
  </q-btn>
  <q-dialog v-model="dialog">
    <q-card style="width: 550px; max-width: 80vw">
      <q-card-section
        class="row items-center q-px-md q-py-sm gradient-btn text-white"
      >
        <div class="text-h5 q-mr-md">🕔 Edit Time</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="row justify-between">
          <div>Name: {{ formatFullname(dtrData.employee) }}</div>
          <div>
            Position:
            {{ dtrData.employee.position }}
          </div>
        </div>
        <div class="q-mt-lg q-gutter-md">
          <div class="row justify-between">
            <div>
              <div>Time IN</div>
              <q-input outlined dense v-model="editDTRForm.time_in" />
            </div>
            <div>
              <div>Time OUT</div>
              <q-input outlined dense v-model="editDTRForm.time_out" />
            </div>
          </div>
          <div class="row justify-between">
            <div>
              <div>Lunch Break Start</div>
              <q-input outlined dense v-model="editDTRForm.lunch_break_start" />
            </div>
            <div>
              <div>Lunch Break End</div>
              <q-input outlined dense v-model="editDTRForm.lunch_break_end" />
            </div>
          </div>
          <div class="row justify-between">
            <div>
              <div>Break Start</div>
              <q-input outlined dense v-model="editDTRForm.break_start" />
            </div>
            <div>
              <div>Break End</div>
              <q-input outlined dense v-model="editDTRForm.break_end" />
            </div>
          </div>
          <div class="row justify-between">
            <div>
              <div>Over Time Start</div>
              <q-input outlined dense v-model="editDTRForm.over_start" />
            </div>
            <div>
              <div>Over Time End</div>
              <q-input outlined dense v-model="editDTRForm.over_end" />
            </div>
          </div>
        </div>

        <!-- {{ props.edit.row }} -->
      </q-card-section>
      <q-card-actions class="row q-ma-md" align="right">
        <q-btn
          class="btn-cancel glossy"
          color="negative"
          label="Cancel"
          v-close-popup
        />
        <q-btn class="btn-create glossy" color="positive" label="Save" />
        <!-- :loading="loading"
          @click="saveEditedIngredient" -->
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { reactive, ref } from "vue";

const props = defineProps(["edit"]);
const dtrData = props.edit.row;
const dialog = ref();

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`.trim();
};

const editDTRForm = reactive({
  time_in: "",
  time_out: "",
  lunch_break_start: "",
  lunch_break_end: "",
  break_start: "",
  break_end: "",
  over_start: "",
  over_end: "",
});

const openDialog = () => {
  const editDTR = Object.assign(editDTRForm, dtrData);
  dialog.value = true;
};
</script>

<style lang="scss" scoped>
.q-btn {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.q-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.gradient-btn {
  background: linear-gradient(45deg, #103432, #2575fc);
  border: none;
}
.cancel-btn {
  background: linear-gradient(45deg, #0c0e0e, #85888f);
  border: none;
}
</style>
