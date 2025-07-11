<template>
  <q-card
    class="q-pa-md user-card"
    @click="openDesignationDialog"
    align="center"
  >
    <div class="q-mb-md text-center">
      <q-icon
        name="factory"
        size="20px"
        color="blue-grey-6
"
      />
    </div>

    <div class="text-center">
      <div class="text-subtitle1 text-weight-medium">
        Warehouse Designations
      </div>
    </div>
  </q-card>

  <q-dialog
    v-model="designationDialog"
    backdrop-filter="blur(4px) saturate(150%)"
    position="right"
  >
    <q-card style="width: 550px; max-width: 100vw">
      <q-card-section
        class="row items-center q-px-md q-py-sm bg-gradient text-white"
      >
        <div class="text-h5 q-mr-md">👨‍💼👩‍💼 Warehouse Designation</div>
        <q-space />
        <q-btn icon="arrow_forward_ios" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section>
        <div>
          <q-input
            v-model="searchKeyword"
            label="Search Employee"
            outlined
            dense
            @update:model-value="search"
            debounce="500"
            placeholder="Enter name or position"
          >
            <template v-slot:append>
              <q-icon v-if="!searchLoading" name="search" />
              <q-spinner v-else color="grey" size="sm" />
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
      </q-card-section>
      <q-card-section>
        <div class="row justify-between q-gutter-md">
          <q-input
            outlined
            readonly
            dense
            label="Full Name"
            v-model="addDesignation.employee_name"
            style="width: 350px"
          />
          <q-input
            outlined
            readonly
            dense
            label="Position"
            v-model="addDesignation.position"
            style="width: 150px"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-x-md">
          <div>
            <div class="q-my-md">Designation</div>
            <q-select
              v-model="addDesignation.warehouse_name"
              outlined
              flat
              dense
              use-input
              clearable
              input-debounce="0"
              :options="filterWarehouseOptions"
              label="Warehouse"
              @filter="filteredWarehouse"
              hide-dropdown-icon
              behavior="menu"
              style="width: 200px; max-width: 500px; min-width: 100px"
            />
          </div>
          <div>
            <div class="q-my-md">Time Schedule</div>
            <div class="row justify-between q-gutter-x-md">
              <q-input
                v-model="addDesignation.time_in"
                outlined
                flat
                dense
                mask="##:## AA"
                label="Time IN"
                :rules="[validateTimeFormat]"
                hint="Format: 08:00 AM/PM"
                style="width: 140px; max-width: 500px; min-width: 100px"
                hide-dropdown-icon
              />
              <q-input
                v-model="addDesignation.time_out"
                outlined
                flat
                dense
                mask="##:## AA"
                label="Time OUT"
                :rules="[validateTimeFormat]"
                hint="Format: 01:00 AM/PM"
                style="width: 140px; max-width: 500px; min-width: 100px"
                hide-dropdown-icon
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
          @click="save"
          :loading="loading"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useEmployeeStore } from "src/stores/employee";
import { useWarehousesStore } from "src/stores/warehouse";
import { useWarehouseEmployeeStore } from "src/stores/warehouse-employee";
import { onMounted, computed, reactive, ref } from "vue";

const widthStyle = computed(() => {
  const width = window.innerWidth;
  return width > 1200 ? "500px" : width > 768 ? "80vw" : "95vw";
});

const designationDialog = ref(false);
const warehouseEmployee = useWarehouseEmployeeStore();
const employeeStore = useEmployeeStore();
const warehouseStore = useWarehousesStore();
const warehouseOptions = ref([]);
const selectedBranch = ref([]);
const searchKeyword = ref("");
const filterWarehouseOptions = ref(warehouseOptions.value);
const loading = ref(false);
const searchLoading = ref(false);

const employees = computed(() => employeeStore.employee);
const search = async () => {
  if (searchKeyword.value.trim()) {
    searchLoading.value = true;
    await employeeStore.searchCertainEmployee(searchKeyword.value);
    searchLoading.value = false;
  }
};

const validateTimeFormat = (val) => {
  const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
  return (
    timeRegex.test(val) || "Time format must be HH:MM AM/PM (e.g., 01:00 AM)"
  );
};

const fetchWarehouse = async () => {
  const warehouse = await warehouseStore.fetchWarehouses();
  warehouseOptions.value = warehouseStore.warehouses.map((val) => ({
    label: val.name,
    value: val.id,
  }));
  filterWarehouseOptions.value = warehouseOptions.value;
};

onMounted(fetchWarehouse);

const filteredWarehouse = (val, update) => {
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

// const formattedFullName = computed(() => {
//   const employee = employees.value.find(
//     (emp) => emp.id === addDesignation.employee_id
//   );
//   if (employee) {
//     return `${employee.firstname} ${
//       employee.middlename ? employee.middlename.charAt(0) + "." : ""
//     } ${employee.lastname}`;
//   }
//   return "";
// });
const autoFillEmployee = (employee) => {
  // Log the selected employee data
  console.log("Selected Employee:", employee);

  addDesignation.employee_id = employee.id;
  addDesignation.employee_name = formatFullname(employee);
  // `${employee.firstname} ${
  //   employee.middlename ? employee.middlename.charAt(0) + "." : ""
  // } ${employee.lastname}`;
  addDesignation.position = employee.position;
  searchKeyword.value = "";
  // Log the filled designation data
  console.log("Filled Designation Data:", addDesignation);
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

const openDesignationDialog = () => {
  designationDialog.value = true;
};

const addDesignation = reactive({
  employee_id: "",
  employee_name: "",
  position: "",
  warehouse_name: "",
  time_in: "",
  time_out: "",
});

const clearDesignationForm = () => {
  addDesignation.employee_id = "";
  addDesignation.employee_name = "";
  addDesignation.position = "";
  addDesignation.warehouse_name = "";
  addDesignation.time_in = "";
  addDesignation.time_out = "";
};

const save = async () => {
  loading.value = true;
  const designation = {
    ...addDesignation,
    warehouse_id: addDesignation.warehouse_name.value,
  };

  await warehouseEmployee.createWarehouseEmployee(designation);
  console.log("Designation Data to Save:", designation);
  loading.value = false;
  clearDesignationForm();
  designationDialog.value = false;
};
</script>

<style lang="scss" scoped>
.user-card {
  height: 42%;
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
