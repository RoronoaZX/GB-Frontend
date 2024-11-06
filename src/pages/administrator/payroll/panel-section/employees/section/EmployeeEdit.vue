<template>
  <q-btn
    color="positive"
    icon="edit"
    size="md"
    flat
    round
    dense
    @click="openEditForm"
  >
    <q-tooltip class="bg-positive" :delay="200"> Edit </q-tooltip>
  </q-btn>
  <!-- persistent -->
  <q-dialog
    v-model="dialog"
    persistent
    position="right"
    backdrop-filter="blur(4px) saturate(150%)"
  >
    <q-card style="width: 500px; max-width: 100vw">
      <q-card-section
        class="row items-center q-px-md q-py-sm bg-gradient text-white"
      >
        <div class="text-h5 q-mr-md">👨‍💼👩‍💼 Edit Employee</div>
        <q-space />
        <q-btn icon="arrow_forward_ios" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-y-sm">
          <div class="q-gutter-y-sm q-mx-auto">
            <q-input
              v-model="editEmployee.firstname"
              class="text-capitalize"
              outlined
              dense
              label="First Name"
              :rules="[(val) => (val && val.length > 0) || 'Required']"
            />
            <q-input
              v-model="editEmployee.middlename"
              class="text-capitalize"
              outlined
              dense
              label="Middle Name"
              :rules="[(val) => (val && val.length > 0) || 'Required']"
            />
            <q-input
              v-model="editEmployee.lastname"
              class="text-capitalize"
              outlined
              dense
              label="Last Name"
              :rules="[(val) => (val && val.length > 0) || 'Required']"
            />
            <q-input
              v-model="editEmployee.address"
              class="text-capitalize"
              outlined
              dense
              label="Address"
              :rules="[(val) => (val && val.length > 0) || 'Required']"
            />
          </div>

          <div class="row q-gutter-x-sm item-start">
            <div>
              <q-input
                v-model="editEmployee.birthdate"
                outlined
                dense
                label="Birthdate"
                type="date"
                style="width: 230px"
                :rules="[(val) => (val && val.length > 0) || 'Required']"
              />
            </div>
            <div>
              <q-input
                v-model="editEmployee.phone"
                outlined
                dense
                label="Phone Number"
                mask="+(63) ### - ### - ####"
                placeholder="(+63) ### - ### - ####"
                :rules="[(val) => (val && val.length > 0) || 'Required']"
                style="width: 230px; max-width: 500px; min-width: 100px"
              />
            </div>
          </div>

          <div class="row q-gutter-x-sm">
            <div>
              <q-select
                v-model="editEmployee.sex"
                dense
                outlined
                label="Sex"
                :options="genderOptions"
                :rules="[(val) => (val && val.length > 0) || 'Required']"
                style="width: 120px"
                behavior="menu"
                hide-dropdown-icon
              />
            </div>
            <div>
              <q-select
                v-model="editEmployee.position"
                outlined
                dense
                hide-dropdown-icon
                label="Position"
                :options="positionOptions"
                :rules="[(val) => (val && val.length > 0) || 'Required']"
                behavior="menu"
                style="width: 175px; max-width: 500px; min-width: 100px"
              />
            </div>
            <div>
              <q-select
                v-model="editEmployee.employment_type"
                outlined
                dense
                hide-dropdown-icon
                label="Employment Type"
                :options="employmentTypeOptions"
                behavior="menu"
                style="width: 155px; max-width: 500px; min-width: 100px"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="row q-px-lg q-py-sm q-pt-none" align="left">
        <q-btn class="glossy" color="grey-9" label="Dismiss" v-close-popup />
        <q-btn
          class="glossy"
          color="teal"
          label="Add"
          icon="add"
          :loading="loading"
        >
          <!-- @click="save" -->
        </q-btn>
        <!-- @click="addNewBranch" -->
      </q-card-actions>
      {{ props.edit.row }}
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";

const props = defineProps(["edit"]);
const dialog = ref(false);

const editEmployee = reactive({
  firstname: "",
  middlename: "",
  lastname: "",
  address: "",
  birthdate: "",
  phone: "",
  sex: "",
  position: "",
  employment_type: "",
});

const openEditForm = () => {
  Object.assign(editEmployee, {
    firstname: props.edit.row.firstname,
    middlename: props.edit.row.middlename,
    lastname: props.edit.row.lastname,
    address: props.edit.row.address,
    birthdate: props.edit.row.birthdate,
    phone: props.edit.row.phone,
    sex: props.edit.row.sex,
    position: props.edit.row.position,
    employment_type: props.edit.row.employment_type.category,
  });
  dialog.value = true;
};
</script>

<style lang="scss" scoped>
.user-card {
  height: 50%;
  border-radius: 15px;
  background: #fff;
  color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.user-button {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-button:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}

.my-card {
  background: #ffffff;
  animation: fadeIn 0.3s ease;
}

.btn-add {
  background: linear-gradient(45deg, #000000, #000000);
  color: #fff;
  font-weight: bold;
}

.bg-gradient {
  background: linear-gradient(135deg, #ff31c5, #471b3b);
}

.separator-gradient {
  background: linear-gradient(90deg, #00bfa5, #00796b);
}

.q-btn {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.q-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-cancel {
  background: linear-gradient(45deg, #ef5350, #e53935);
  color: #fff;
  font-weight: bold;
}

.btn-create {
  background: linear-gradient(45deg, #66bb6a, #43a047);
  color: #fff;
  font-weight: bold;
}

.q-animate-bounce {
  animation: bounceIn 0.6s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
