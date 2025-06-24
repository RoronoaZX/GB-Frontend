<template>
  <q-card class="q-pa-md user-card" @click="openAddEmployeeDialog">
    <div class="q-mb-md text-center">
      <q-icon name="person_add" size="70px" color="yellow-7" />
    </div>

    <div class="text-center">
      <div class="text-h6">Add Employee</div>
    </div>
  </q-card>

  <q-dialog
    v-model="addEmployeeDialog"
    persistent
    position="right"
    backdrop-filter="blur(4px) saturate(150%)"
  >
    <q-card style="width: 500px; max-width: 120vw">
      <q-card-section
        class="row items-center q-px-md q-py-sm bg-gradient text-white"
      >
        <div class="text-h5 q-mr-md">👨‍💼👩‍💼 Add New Employee</div>
        <q-space />
        <q-btn icon="arrow_forward_ios" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-y-sm">
          <div class="q-gutter-y-sm q-mx-auto">
            <q-input
              class="text-capitalize"
              v-model="employeeInfo.firstname"
              outlined
              dense
              label="First Name"
              :rules="[(val) => (val && val.length > 0) || 'Required']"
            />
            <q-input
              class="text-capitalize"
              v-model="employeeInfo.middlename"
              outlined
              dense
              label="Middle Name"
              :rules="[(val) => (val && val.length > 0) || 'Required']"
            />
            <q-input
              class="text-capitalize"
              v-model="employeeInfo.lastname"
              outlined
              dense
              label="Last Name"
              :rules="[(val) => (val && val.length > 0) || 'Required']"
            />
            <q-input
              class="text-capitalize"
              v-model="employeeInfo.address"
              outlined
              dense
              label="Address"
              :rules="[(val) => (val && val.length > 0) || 'Required']"
            />
          </div>
          <div class="row q-gutter-x-sm item-start">
            <div>
              <q-input
                v-model="employeeInfo.birthdate"
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
                v-model="employeeInfo.phone"
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
                v-model="employeeInfo.sex"
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
                v-model="employeeInfo.position"
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
                v-model="employeeInfo.employment_type"
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
          @click="save"
          :loading="loading"
        >
        </q-btn>
        <!-- @click="addNewBranch" -->
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useBranchesStore } from "src/stores/branch";
import { useEmploymentTypeStore } from "src/stores/employment-type";
import { useEmployeeStore } from "src/stores/employee";
import { onMounted, reactive, ref } from "vue";

const employeeStore = useEmployeeStore();

const addEmployeeDialog = ref(false);
const loading = ref(false);
const openAddEmployeeDialog = () => {
  addEmployeeDialog.value = true;
};

const branchesStore = useBranchesStore();
const employmentStore = useEmploymentTypeStore();
const positionOptions = [
  "Super Admin",
  "Admin",
  "Supervisor",
  "Scaler",
  "Lamesador",
  "Hornero",
  "Baker",
  "Cake Maker",
  "Cashier",
  "Sales Clerk",
  "Utility",
  "Not Yet Assigned",
];
const genderOptions = ["Male", "Female"];
// const statusOptions = ["Current", "Former"];
const branchOptions = ref([]);
const employmentTypeOptions = ref([]);
const selectedBranch = ref([]);
const filterBranchOptions = ref(branchOptions.value);

const valididateTime = (val) => {
  const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
  return timeRegex.test(val) || "Invalid time format";
};

// const fetchBranchesData = async () => {
//   const branch = await branchesStore.fetchBranches();
//   branchOptions.value = branchesStore.branches.map((val) => ({
//     label: val.name,
//     value: val.id,
//   }));
//   filterBranchOptions.value = branchOptions.value;
// };

// onMounted(fetchBranchesData);

// const filteredBranches = (val, update) => {
//   update(() => {
//     const needle = val.toLowerCase();
//     filterBranchOptions.value =
//       val === ""
//         ? branchOptions.value
//         : branchOptions.value.filter((v) =>
//             v.label.toLowerCase().includes(needle)
//           );
//   });
// };

const fetchEmploymentTypeData = async () => {
  const employmentType = await employmentStore.fetchEmploymentType();
  employmentTypeOptions.value = employmentStore.employmentType.map((val) => ({
    label: val.category,
    value: val.id,
  }));
};

onMounted(fetchEmploymentTypeData);

const employeeInfo = reactive({
  firstname: "",
  middlename: "",
  lastname: "",
  address: "",
  birthdate: "",
  sex: "",
  phone: "",
  position: "",
  employment_type: "",
});

const save = async () => {
  loading.value = true;
  const employeeForm = {
    ...employeeInfo,
    employment_type_id: employeeInfo.employment_type.value,
    status: "Active",
  };
  console.log("employee", employeeForm);
  const data = await employeeStore.createEmployee(employeeForm);
  loading.value = false;
  clearForm();
  addEmployeeDialog.value = false;
};

const clearForm = () => {
  employeeInfo.firstname = "";
  employeeInfo.middlename = "";
  employeeInfo.lastname = "";
  employeeInfo.address = "";
  employeeInfo.birthdate = "";
  employeeInfo.sex = "";
  employeeInfo.phone = "";
  employeeInfo.position = "";
  employeeInfo.employment_type = "";
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
