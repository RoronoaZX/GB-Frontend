<template>
  <q-btn
    @click="openEditForm"
    color="positive"
    icon="edit"
    size="sm"
    flat
    round
    dense
  >
    <q-tooltip class="bg-positive" :delay="200">Edit</q-tooltip>
  </q-btn>
  <q-dialog
    v-model="dialog"
    persistent
    transition-show="jump-up"
    transition-hide="jump-down"
  >
    <q-card
      class="my-card q-pa-none"
      style="
        width: 420px;
        border-radius: 16px;
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
      "
    >
      <q-card-section
        class="row items-center q-px-md q-py-sm bg-gradient text-white"
      >
        <div class="text-h5 q-mr-md">🏪 Edit Branch</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-separator class="separator-gradient" />
      <q-card-section class="q-px-xl q-pt-none q-pb-lg">
        <div class="q-mt-lg q-animated q-animate-bounce">
          <div>Name of Branch</div>
          <q-input v-model="editBranchesForm.name" outlined dense />
        </div>
        <div class="q-mt-lg q-animated q-animate-bounce">
          <div>Location</div>
          <q-input v-model="editBranchesForm.location" outlined dense />
        </div>
        <div class="q-mt-lg q-animated q-animate-bounce">
          <div>Person In-charge</div>
          <div>
            <q-input
              v-model="searchKeyword"
              label="Search Employee"
              outlined
              dense
              @update:model-value="search"
              debounce="500"
              placeholder="Enter name or position"
              @focus="showDropdown = true"
            >
              <template v-slot:append>
                <q-icon v-if="!searchLoading" name="search" />
                <q-spinner v-else color="grey" size="sm" />
              </template>
              <div
                v-if="showDropdown && searchKeyword"
                class="custom-list z-top"
              >
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
        </div>
        <div class="q-mt-lg q-animated q-animate-bounce">
          <div>Under Warehouse</div>
          <q-select
            v-model="editBranchesForm.warehouse_id"
            use-input
            input-debounce="0"
            :options="warehouses"
            stack-label
            outlined
            dense
            emit-value
            map-options
            option-label="name"
            option-value="id"
          />
        </div>
        <div class="row q-gutter-x-sm justify-between q-mt-sm">
          <div class="col-6 q-animated q-animate-bounce">
            <div>Phone Number</div>
            <q-input
              v-model="editBranchesForm.phone"
              outlined
              dense
              mask="(+63) ### - ### - ####"
              placeholder="(+63) ### - ### - ####"
              :rules="[(val) => val && val.length > 0]"
            />
          </div>
          <div class="col-5 q-animated q-animate-bounce">
            <div>Status</div>
            <q-select
              v-model="editBranchesForm.status"
              outlined
              dense
              :options="statusOptions"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="row q-px-lg q-py-sm q-pt-none" align="right">
        <q-btn class="glossy" color="grey-9" label="Dismiss" v-close-popup />
        <q-btn
          class="glossy"
          color="teal"
          label="Save"
          @click="saveEditedBranches"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Notify } from "quasar";
import { reactive, ref, onMounted, computed } from "vue";
import { useWarehousesStore } from "src/stores/warehouse";
import { useBranchesStore } from "src/stores/branch";
import { useEmployeeStore } from "src/stores/employee";
import { typographyFormat } from "src/composables/typography/typography-format";

const { formatFullname } = typographyFormat();

const employeeStore = useEmployeeStore();
const branchesStore = useBranchesStore();
const warehousesStore = useWarehousesStore();
const warehouses = computed(() => warehousesStore.warehouses);
const props = defineProps(["edit"]);
const dialog = ref(false);
const warehouseOptions = ref([]);
// let editRow = props.edit.row;
const statusOptions = ["Open", "Open soon", "Close"];
const searchKeyword = ref(null);
const searchLoading = ref(false);
const showDropdown = ref(false);

const employees = computed(() => employeeStore.employee);
const search = async () => {
  if (searchKeyword.value.trim()) {
    searchLoading.value = true;
    await employeeStore.searchPersonInCharge(searchKeyword.value);
    searchLoading.value = false;
    showDropdown.value = true;
  }
};

const autoFillEmployee = (employee) => {
  // Log the selected employee data
  console.log("Selected Employee:", employee);

  editBranchesForm.employee_id = employee.id;
  editBranchesForm.employee_name = `${employee.firstname} ${
    employee.middlename ? employee.middlename.charAt(0) + "." : ""
  } ${employee.lastname}`;
  searchKeyword.value = `${employee.firstname} ${
    employee.middlename ? employee.middlename.charAt(0) + "." : ""
  } ${employee.lastname}`;

  showDropdown.value = false;
  // Log the filled designation data
  console.log("Filled editBranchesForm Data:", editBranchesForm);
  // setTimeout(() => {
  //   searchKeyword.value = null;
  // }, 0);
};

const openEditForm = () => {
  const editRow = props.edit.row;
  console.log("Edit Row Data:", editRow);
  showDropdown.value = false;
  editBranchesForm.name = editRow.name;
  editBranchesForm.location = editRow.location;
  editBranchesForm.employee_id = editRow.employee_id;
  editBranchesForm.employee_name = editRow.employees
    ? formatFullname(editRow.employees)
    : "No Person in Charge";
  searchKeyword.value = editRow.employees
    ? formatFullname(editRow.employees)
    : "No Person in Charge";
  editBranchesForm.warehouse_id = editRow?.warehouse_id
    ? editRow.warehouse_id
    : editRow?.warehouse?.id
    ? editRow?.warehouse?.id
    : "";
  editBranchesForm.phone = editRow.phone;
  editBranchesForm.status = editRow.status;
  dialog.value = true;
  console.log("Edit Data:", editBranchesForm);
};

const editBranchesForm = reactive({
  name: "",
  location: "",
  person_incharge: "",
  employee_id: "",
  employee_name: "",
  warehouse_id: null,
  phone: "",
  status: null,
});

const saveEditedBranches = async () => {
  // console.log("editRow.id", editRow.id);
  console.log("editBranchesForm", editBranchesForm);
  try {
    await branchesStore.updateBranches(props.edit.row.id, editBranchesForm);

    dialog.value = false;
  } catch (error) {
    console.error("Error updating branch:", error);
  }
};
</script>

<style scoped>
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
  background: linear-gradient(135deg, #00bfa5, #00796b);
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
