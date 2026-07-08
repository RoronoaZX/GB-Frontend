<template>
  <q-card class="q-pa-md premium-add-card flex flex-center column text-center cursor-pointer" @click="openAddEmployeeDialog">
    <div class="q-mb-sm icon-container">
      <q-icon name="person_add" size="44px" class="add-icon" />
    </div>
    <div class="text-subtitle2 text-weight-bold text-slate-8">Add Employee</div>
    <div class="text-caption text-grey-5">Register new staff</div>
  </q-card>

  <q-dialog
    v-model="addEmployeeDialog"
    persistent
    position="right"
    backdrop-filter="blur(4px) saturate(150%)"
  >
    <q-card class="premium-dialog-card column full-height" style="width: 460px; max-width: 95vw">
      <q-card-section
        class="row items-center q-px-lg q-py-md header-section text-white"
      >
        <div class="text-h6 text-weight-bold text-slate-8">👨‍💼 Add New Employee</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup color="grey-6" />
      </q-card-section>
      
      <q-card-section class="col scroll q-py-lg">
        <div class="column q-gutter-y-md">
          <div class="text-caption text-weight-bold text-teal-8 text-uppercase tracking-wider">
            Personal Information
          </div>
          <q-input
            class="text-capitalize premium-input"
            v-model="employeeInfo.firstname"
            outlined
            dense
            label="First Name"
            :rules="[(val) => (val && val.length > 0) || 'Required']"
          />
          <q-input
            class="text-capitalize premium-input"
            v-model="employeeInfo.middlename"
            outlined
            dense
            label="Middle Name"
            :rules="[(val) => (val && val.length > 0) || 'Required']"
          />
          <q-input
            class="text-capitalize premium-input"
            v-model="employeeInfo.lastname"
            outlined
            dense
            label="Last Name"
            :rules="[(val) => (val && val.length > 0) || 'Required']"
          />
          <q-input
            class="text-capitalize premium-input"
            v-model="employeeInfo.address"
            outlined
            dense
            label="Address"
            :rules="[(val) => (val && val.length > 0) || 'Required']"
          />

          <q-separator class="q-my-sm" />
          
          <div class="text-caption text-weight-bold text-teal-8 text-uppercase tracking-wider">
            Employment Details
          </div>

          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <q-input
                v-model="employeeInfo.birthdate"
                outlined
                dense
                label="Birthdate"
                type="date"
                class="premium-input"
                :rules="[(val) => (val && val.length > 0) || 'Required']"
              />
            </div>
            <div class="col-6">
              <q-input
                v-model="employeeInfo.phone"
                outlined
                dense
                label="Phone Number"
                mask="+(63) ### - ### - ####"
                placeholder="(+63) ### - ### - ####"
                class="premium-input"
                :rules="[(val) => (val && val.length > 0) || 'Required']"
              />
            </div>
          </div>

          <div class="row q-col-gutter-sm">
            <div class="col-4">
              <q-select
                v-model="employeeInfo.sex"
                dense
                outlined
                label="Sex"
                :options="genderOptions"
                class="premium-input"
                :rules="[(val) => (val && val.length > 0) || 'Required']"
                behavior="menu"
                hide-dropdown-icon
              />
            </div>
            <div class="col-4">
              <q-select
                v-model="employeeInfo.position"
                outlined
                dense
                hide-dropdown-icon
                label="Position"
                class="premium-input"
                :options="positionOptions"
                :rules="[(val) => (val && val.length > 0) || 'Required']"
                behavior="menu"
              />
            </div>
            <div class="col-4">
              <q-select
                v-model="employeeInfo.employment_type"
                outlined
                dense
                hide-dropdown-icon
                label="Employment"
                class="premium-input"
                :options="employmentTypeOptions"
                behavior="menu"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      
      <q-card-actions class="row q-px-lg q-py-md action-section justify-end q-gutter-x-sm">
        <q-btn flat color="grey-7" label="Cancel" v-close-popup no-caps class="rounded-btn q-px-md" />
        <q-btn
          color="teal"
          label="Add Employee"
          icon="add"
          unelevated
          no-caps
          class="rounded-btn q-px-lg save-btn"
          @click="save"
          :loading="loading"
        />
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
  /* console.log("employee", employeeForm); */
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
.premium-add-card {
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  .icon-container {
    background: rgba(13, 148, 136, 0.08);
    border-radius: 12px;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .add-icon {
    color: #0d9488;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -5px rgba(13, 148, 136, 0.15);
    border-color: rgba(13, 148, 136, 0.25);

    .icon-container {
      background: rgba(13, 148, 136, 0.15);
    }
    .add-icon {
      transform: scale(1.1);
    }
  }
}

.premium-dialog-card {
  border-radius: 16px 0 0 16px !important;
  box-shadow: -10px 0 30px rgba(15, 23, 42, 0.08) !important;
  background-color: #ffffff;
}

.header-section {
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  
  .text-h6 {
    color: #0f172a;
    font-size: 1.15rem;
  }
}

.premium-input {
  :deep(.q-field__control) {
    border-radius: 8px;
    transition: all 0.2s ease-in-out;
  }
  
  :deep(.q-field__control:focus-within) {
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);
  }
}

.action-section {
  border-top: 1px solid rgba(226, 232, 240, 0.8);
}

.rounded-btn {
  border-radius: 8px;
}

.save-btn {
  font-weight: 600;
  background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%) !important;
  box-shadow: 0 4px 10px rgba(13, 148, 136, 0.2);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 6px 15px rgba(13, 148, 136, 0.3);
  }
}
</style>
