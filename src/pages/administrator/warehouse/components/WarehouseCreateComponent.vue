<template>
  <div>
    <q-btn
      outline
      icon="add_circle"
      label="Add Warehouse"
      @click="open_adding_warehouse_dialog"
      style="background-color: #ef4444"
    />
    <q-dialog
      v-model="addWarehouseDialogVisible"
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
          <div class="text-h5 q-mr-md">🏭 Add New Warehouse</div>
          <q-space />
          <q-btn icon="close" flat dense round v-close-popup />
        </q-card-section>
        <q-separator class="separator-gradient" />
        <q-card-section class="q-px-xl q-pt-none q-pb-lg">
          <div class="q-mt-lg q-animated q-animate-bounce">
            <div>Name of Warehouse</div>
            <q-input
              class="text-capitalize"
              v-model="addNewWarehouseForm.name"
              outlined
              dense
              :rules="[(val) => val && val.length > 0]"
            />
          </div>
          <div class="q-mt-md q-animated q-animate-bounce">
            <div>Location</div>
            <q-input
              class="text-capitalize"
              v-model="addNewWarehouseForm.location"
              outlined
              dense
              :rules="[(val) => val && val.length > 0]"
            />
          </div>
          <div class="q-mt-md q-animated q-animate-bounce">
            <div>Person In-charge</div>
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
                          {{ formatFullname(employee) }}
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-list>
                </q-card>
              </div>
            </q-input>
          </div>
          <div class="row q-gutter-x-sm q-mt-md">
            <div class="col-6 q-animated q-animate-bounce">
              <div>Phone Number</div>
              <q-input
                v-model="addNewWarehouseForm.phone"
                outlined
                dense
                mask="(+63) ### - ### - ####"
                placeholder="(+63)### - ### - ####"
                :rules="[(val) => val && val.length > 0]"
              />
            </div>
            <div class="col-5 q-animated q-animate-bounce">
              <div>Status</div>
              <q-select
                v-model="addNewWarehouseForm.status"
                outlined
                dense
                :options="warehouseStatus"
                hide-dropdown-icon
                behavior="menu"
              />
            </div>
          </div>
        </q-card-section>
        <!-- <q-separator /> -->
        <q-card-actions class="row q-px-lg q-py-sm q-pt-none" align="right">
          <q-btn class="glossy" color="grey-9" label="Dismiss" v-close-popup />
          <q-btn
            class="glossy"
            color="teal"
            label="Create"
            @click="createWarehouse"
            :loading="loading"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { Notify } from "quasar";
import { useWarehousesStore } from "src/stores/warehouse";
import { useEmployeeStore } from "src/stores/employee";

const employeeStore = useEmployeeStore();
const warehousesStore = useWarehousesStore();
const addWarehouseDialogVisible = ref(false);
const employees = computed(() => employeeStore.employee);
const warehouseStatus = ["Open", "Close"];
const open_adding_warehouse_dialog = () => {
  addWarehouseDialogVisible.value = true;
};
const searchKeyword = ref("");
const showDropdown = ref(false);
const loading = ref(false);
const searchLoading = ref(false);
// const employeeOptions = ref([]);
// const selectedEmployee = ref(null);
// const filterEmployeeOptions = ref(employeeOptions.value);

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

  addNewWarehouseForm.employee_id = employee.id;
  addNewWarehouseForm.employee_name = `${employee.firstname} ${
    employee.middlename ? employee.middlename.charAt(0) + "." : ""
  } ${employee.lastname}`;
  searchKeyword.value = `${employee.firstname} ${
    employee.middlename ? employee.middlename.charAt(0) + "." : ""
  } ${employee.lastname}`;

  showDropdown.value = false;
  // Log the filled designation data
  console.log("Filled addNewBranchForm Data:", addNewWarehouseForm);
  // setTimeout(() => {
  //   searchKeyword.value = null;
  // }, 0);
};

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

// onMounted(fetchEmployee);

// const filteredEmployee = (val, update) => {
//   update(() => {
//     const needle = val.toLowerCase();
//     filterEmployeeOptions.value =
//       val === ""
//         ? employeeOptions.value
//         : employeeOptions.value.filter((v) =>
//             v.label.toLowerCase().includes(needle)
//           );
//   });
// };

//reactive warehouse form
const addNewWarehouseForm = reactive({
  name: "",
  location: "",
  employee_id: "",
  employee_name: "",
  phone: "",
  status: null,
});

//create warehouse
const createWarehouse = async () => {
  console.log("awarehoouse data send", addNewWarehouseForm);
  loading.value = true;
  const res = await warehousesStore.createWarehouses(addNewWarehouseForm);
  // console.log("redssdfs", res);

  loading.value = false;
  resetFormData();
  addWarehouseDialogVisible.value = false;
};

//reset the warehouse form
const resetFormData = () => {
  addNewWarehouseForm.name = "";
  addNewWarehouseForm.location = "";
  addNewWarehouseForm.person_incharge = "";
  addNewWarehouseForm.phone = "";
  searchKeyword.value = null;
  addNewWarehouseForm.employee = "";
  addNewWarehouseForm.status = [""];
};
</script>

<style scoped>
.my-card {
  background: #ffffff;
  animation: fadeIn 0.3s ease;
}

.btn-add {
  background: linear-gradient(45deg, #42a5f5, #478ed1);
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
