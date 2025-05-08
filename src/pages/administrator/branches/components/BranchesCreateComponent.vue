<template>
  <q-btn
    class="text-dark q-pa-sm"
    outline
    dense
    elevated
    icon="add_circle"
    label="Add Store Branch"
    @click="openAddingStoreBranchDialog"
    style="background-color: #ef4444"
  />
  <q-dialog
    v-model="addNewBranchDialogVisible"
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
        <div class="text-h5 q-mr-md">🏪 Add New Branch</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-separator class="separator-gradient" />
      <q-card-section class="q-px-xl q-pt-none q-pb-lg">
        <div class="q-mt-lg q-animated q-animate-bounce">
          <q-input
            class="text-capitalize"
            v-model="addNewBranchForm.name"
            outlined
            dense
            label="Branch Name"
            :rules="[(val) => (val && val.length > 0) || 'Name is required']"
          />
        </div>
        <div class="q-mt-lg q-animated q-animate-bounce">
          <q-input
            class="text-capitalize"
            v-model="addNewBranchForm.location"
            outlined
            dense
            label="Location"
            :rules="[(val) => (val && val.length > 0) || 'Label is required']"
          />
        </div>
        <div class="q-mt-lg q-animated q-animate-bounce">
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
                          {{ formatFullname(employee) }}
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-list>
                </q-card>
              </div>
            </q-input>
          </div>
          <!-- <q-select
            v-model="addNewBranchForm.employee"
            outlined
            flat
            dense
            use-input
            clearable
            input-debounce="0"
            :options="filterEmployeeOptions"
            @filter="filteredEmployee"
            hide-dropdown-icon
            behavior="menu"
          /> -->
        </div>
        <div class="q-mt-lg q-animated q-animate-bounce">
          <q-select
            v-model="selectedWarehouse"
            clearable
            use-input
            input-debounce="0"
            :options="filterWarehouseOptions"
            hide-dropdown-icon
            stack-label
            outlined
            dense
            label="Warehouse"
            @filter="filterWarehouses"
            behavior="menu"
          />
        </div>
        <div class="row q-mt-lg q-gutter-x-sm justify-between">
          <div class="col-6 q-animated q-animate-bounce">
            <q-input
              v-model="addNewBranchForm.phone"
              outlined
              dense
              mask="(+63) ### - ### - ####"
              placeholder="(+63) ### - ### - ####"
              label="Phone Number"
              :rules="[
                (val) => (val && val.length > 0) || 'Phone number is required',
              ]"
            />
          </div>
          <div class="col-5 q-animated q-animate-bounce">
            <q-select
              v-model="addNewBranchForm.status"
              outlined
              dense
              label="Status"
              :options="statusOptions"
              hide-dropdown-icon
              behavior="menu"
              :rules="[
                (val) => (val && val.length > 0) || 'Status is required',
              ]"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="row q-px-lg q-py-sm q-pt-none" align="right">
        <q-btn class="glossy" color="grey-9" label="Dismiss" v-close-popup />
        <q-btn
          class="glossy"
          color="teal"
          label="Create"
          @click="addNewBranch"
          :loading="loading"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { Notify } from "quasar";
import { useBranchesStore } from "src/stores/branch";
import { useWarehousesStore } from "src/stores/warehouse";
import { useEmployeeStore } from "src/stores/employee";

const employeeStore = useEmployeeStore();
const addNewBranchDialogVisible = ref(false);
const branchStore = useBranchesStore();

const openAddingStoreBranchDialog = () => {
  addNewBranchDialogVisible.value = true;
};

const warehousesStore = useWarehousesStore();
const warehouseOptions = ref([]);
const filterWarehouseOptions = ref([]);
const loading = ref(false);
const statusOptions = ["Open", "Open soon", "Close"];
const searchLoading = ref(false);
const selectedWarehouse = ref(null);

const searchKeyword = ref(null);
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

  addNewBranchForm.employee_id = employee.id;
  addNewBranchForm.employee_name = `${employee.firstname} ${
    employee.middlename ? employee.middlename.charAt(0) + "." : ""
  } ${employee.lastname}`;
  searchKeyword.value = `${employee.firstname} ${
    employee.middlename ? employee.middlename.charAt(0) + "." : ""
  } ${employee.lastname}`;

  showDropdown.value = false;
  // Log the filled designation data
  console.log("Filled addNewBranchForm Data:", addNewBranchForm);
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

const addNewBranchForm = reactive({
  name: "",
  location: "",
  employee_id: "",
  employee_name: "",
  phone: "",
  status: "",
});

const fetchWarehouseData = async () => {
  loading.value = true;
  try {
    const warehouse = await warehousesStore.fetchWarehouses();

    warehouseOptions.value = warehousesStore.warehouses.map((val) => ({
      label: val.name,
      value: val.id,
    }));
    filterWarehouseOptions.value = warehouseOptions.value;
  } catch (error) {
    console.error("Error fetching warehouse data:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchWarehouseData);

const filterWarehouses = (val, update) => {
  update(() => {
    const needle = val.toLowerCase();
    filterWarehouseOptions.value =
      val === ""
        ? warehouseOptions.value
        : warehouseOptions.value.filter((v) =>
            v.label.toLowerCase().includes(needle)
          );
  });
};

const addNewBranch = async () => {
  try {
    loading.value = true;
    const formData = {
      ...addNewBranchForm,
      warehouse_id: selectedWarehouse.value?.value || null,
    };
    console.log("brabrbbar", formData);

    const data = await branchStore.createBranches(formData);
    console.log(data);

    addNewBranchDialogVisible.value = false;
    resetFormData();
  } catch (error) {
    console.error("Error creating branch:", error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to create branch. Please try again.";
    addNewBranchDialogVisible.value = true;
    Notify.create({
      color: "negative",
      icon: "warning",
      message: errorMessage,
    });
  } finally {
    loading.value = false;
  }
};

const resetFormData = () => {
  addNewBranchForm.name = "";
  addNewBranchForm.location = "";
  addNewBranchForm.employee_id = "";
  addNewBranchForm.employee_name = "";
  searchKeyword.value = null;
  selectedWarehouse.value = null;
  addNewBranchForm.phone = "";
  addNewBranchForm.status = "";
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
