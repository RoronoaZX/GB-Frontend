<template>
  <q-dialog
    ref="dialogRef"
    v-model="dialog"
    @hide="onDialogHide"
    @ok="handleSave"
    @cancel="onDialogCancel"
  >
    <q-card class="q-pa-sm">
      <div class="row justify-between">
        <!-- Details Section -->
        <div>
          <q-card-section>
            <div class="row justify-between">
              <div class="text-h4 text-weight-light">Edit Employee Profile</div>
              <div>
                <q-btn icon="close" flat dense round v-close-popup />
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-gutter-y-sm">
              <!-- Full Name Input -->
              <q-input
                v-model="editUserForm.fullname"
                class="text-capitalize"
                outlined
                dense
                label="Full Name"
                :rules="[(val) => (val && val.length > 0) || 'Required']"
              />

              <!-- Address Input -->
              <q-input
                v-model="editUserForm.user_address"
                class="text-capitalize"
                outlined
                dense
                label="Address"
                :rules="[(val) => (val && val.length > 0) || 'Required']"
              />

              <div class="row q-gutter-x-sm item-start">
                <!-- Birthdate Input -->
                <q-input
                  v-model="editUserForm.user_birthdate"
                  outlined
                  dense
                  label="Birthdate"
                  type="date"
                  hint="mm/dd/yyyy"
                  style="width: 230px"
                  :rules="[(val) => (val && val.length > 0) || 'Required']"
                />

                <!-- Gender Select -->
                <q-select
                  v-model="editUserForm.user_sex"
                  dense
                  outlined
                  label="Sex"
                  :options="genderOptions"
                  :rules="[(val) => (val && val.length > 0) || 'Required']"
                  style="width: 120px"
                  behavior="menu"
                  hide-dropdown-icon
                />

                <!-- Status Select -->
                <q-select
                  v-model="editUserForm.user_status"
                  :options="statusOptions"
                  dense
                  outlined
                  hide-dropdown-icon
                  label="Status"
                  style="width: 100px"
                  :rules="[(val) => (val && val.length > 0) || 'Required']"
                  behavior="menu"
                />
              </div>

              <div class="row q-gutter-x-md">
                <!-- Phone Number Input -->
                <q-input
                  v-model="editUserForm.user_phone_number"
                  outlined
                  dense
                  label="Phone Number"
                  mask="+(63) ### - ### - ####"
                  placeholder="(+63) ### - ### - ####"
                  :rules="[(val) => (val && val.length > 0) || 'Required']"
                  style="width: 300px; max-width: 500px; min-width: 100px"
                />

                <!-- Position Select -->
                <q-select
                  v-model="editUserForm.user_position"
                  outlined
                  dense
                  hide-dropdown-icon
                  label="Position"
                  :options="positionOptions"
                  :rules="[(val) => (val && val.length > 0) || 'Required']"
                  style="width: 150px; max-width: 500px; min-width: 100px"
                />
              </div>

              <!-- Designation Section -->
              <div>Designation</div>
              <div class="row q-gutter-x-md">
                <!-- Branch Select -->
                <q-select
                  v-model="editUserForm.user_branch_name"
                  outlined
                  flat
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

                <!-- Time Schedule Input -->
                <q-input
                  v-model="editUserForm.user_time_shift"
                  outlined
                  flat
                  dense
                  mask="##:## AA"
                  label="Time Schedule"
                  :rules="valididateTime"
                  hint="Format: 01:00 AM/PM"
                  style="width: 200px; max-width: 500px; min-width: 100px"
                />
              </div>
            </div>
          </q-card-section>

          <!-- Actions -->
          <q-card-actions class="row q-px-lg q-py-sm q-pt-none" align="right">
            <q-btn class="glossy" color="grey-9" label="Cancel" v-close-popup />
            <q-btn
              class="glossy"
              color="teal"
              label="Save"
              @click="handleSaveEdit"
            />
          </q-card-actions>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, watch, reactive, onMounted } from "vue";
import { useDialogPluginComponent } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { useBranchesStore } from "src/stores/branch";
import { useUsersStore } from "src/stores/user";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const route = useRoute();
const router = useRouter();
const userStore = useUsersStore();

const branchesStore = useBranchesStore();
const branchOptions = ref([]);
const filterBranchOptions = ref(branchOptions.value);
const maximizedToggle = ref(true);
const dialog = ref(false);

const emit = defineEmits(["user", "hide", "ok", "cancel"]);
const props = defineProps(["userData"]);
console.log("userDialogdata", props.userData);
const localUserData = ref({ ...props.userData });
console.log("localUserData", localUserData);

const genderOptions = ["Male", "Female"];
const statusOptions = ["Current", "Former"];
const positionOptions = [
  "Super Admin",
  "Admin",
  "Scaler",
  "Lamesador",
  "Hornero",
  "Baker",
  "Cashier",
  "Sales Clerk",
  "Utility",
  "Not Yet Assigned",
];

const fetchBranchesData = async () => {
  const branch = await branchesStore.fetchBranches();
  branchOptions.value = branchesStore.branches.map((val) => ({
    label: val.name,
    value: val.id,
  }));
  filterBranchOptions.value = branchOptions.value;
};

onMounted(fetchBranchesData);

const filteredBranches = (val, update) => {
  update(() => {
    const needle = val.toLowerCase();
    filterBranchOptions.value =
      val === ""
        ? branchOptions.value
        : branchOptions.value.filter((v) =>
            v.label.toLowerCase().includes(needle)
          );
  });
};

const valididateTime = (val) => {
  const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
  return timeRegex.test(val) || "Invalid time format";
};

const formatTimeFromDB = (dateString) => {
  const dateObj = new Date(`1970-01-01T${dateString}`);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return dateObj.toLocaleTimeString(undefined, options);
};

const formatDateFromDB = (dateTimeString) => {
  if (!dateTimeString) return ""; // Handle empty or undefined dates
  const dateObj = new Date(dateTimeString);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const editUserForm = reactive({
  fullname: "",
  user_address: "",
  user_birthdate: "",
  user_sex: "",
  user_status: "",
  user_phone_number: "",
  user_position: "",
  user_branch_name: "",
  user_time_shift: "",
});

watch(
  () => props.userData,
  (newVal) => {
    if (newVal) {
      localUserData.value = { ...newVal };
      console.log("update data", localUserData.value);
      editUserForm.fullname = localUserData.value.name;
      editUserForm.user_address = localUserData.value.address;
      editUserForm.user_birthdate = formatDateFromDB(
        localUserData.value.birthdate
      );
      editUserForm.user_sex = localUserData.value.sex;
      editUserForm.user_status = localUserData.value.status;
      editUserForm.user_phone_number = localUserData.value.phone;
      editUserForm.user_position = localUserData.value.role;
      editUserForm.user_branch_name =
        localUserData.value.branch_employee.branch.name;
      editUserForm.user_time_shift = formatTimeFromDB(
        localUserData.value.branch_employee.time_shift
      );
    }
  },
  { immediate: true }
);

const handleSaveEdit = async () => {
  try {
    const editedUserData = {
      name: editUserForm.fullname,
      address: editUserForm.user_address,
      birthdate: editUserForm.user_birthdate,
      sex: editUserForm.user_sex,
      status: editUserForm.user_status,
      phone: editUserForm.user_phone_number,
      role: editUserForm.user_position,
      branch_id:
        editUserForm.user_branch_name.value ||
        localUserData.value.branch_employee.branch.id,
      time_shift: editUserForm.user_time_shift,
    };
    console.log("Saving user data:", editedUserData);

    // Simulate an API call to save the data
    await userStore.updateUser(props.userData.id, editedUserData);
    const userId = props.userData.id;

    const userRes = await userStore.fetchUserById(userId);
    // Close the dialog on successful save

    dialog.value = false;
    clearForm();
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

const clearForm = () => {
  editUserForm.fullname = "";
  editUserForm.user_address = "";
  editUserForm.user_birthdate = "";
  editUserForm.user_sex = "";
  editUserForm.user_status = "";
  editUserForm.user_phone_number = "";
  editUserForm.user_position = "";
  editUserForm.user_branch_name = "";
  editUserForm.user_time_shift = "";
};
</script>

<style lang="scss" scoped>
.dialog-container {
  max-width: 1000px; /* Adjust this value to make the dialog narrower */
  width: 100%; /* Ensures it doesn't exceed the max width */
  margin: auto; /* Center it on the screen */
}
</style>
