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
              v-model="addNewWarehouseForm.name"
              outlined
              dense
              :rules="[(val) => val && val.length > 0]"
            />
          </div>
          <div class="q-mt-md q-animated q-animate-bounce">
            <div>Location</div>
            <q-input
              v-model="addNewWarehouseForm.location"
              outlined
              dense
              :rules="[(val) => val && val.length > 0]"
            />
          </div>
          <div class="q-mt-md q-animated q-animate-bounce">
            <div>Person In-charge</div>
            <q-select
              v-model="addNewWarehouseForm.employee"
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
            />
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
const employees = computed(() => employeeStore.employees);
const warehouseStatus = ["Open", "Close"];
const open_adding_warehouse_dialog = () => {
  addWarehouseDialogVisible.value = true;
};
const searchKeyword = ref("");
const employeeOptions = ref([]); // Holds the fetched employee options
const selectedEmployee = ref(null);
const filterEmployeeOptions = ref(employeeOptions.value);

const fetchEmployee = async () => {
  const employee = await employeeStore.fetchEmployee();
  employeeOptions.value = employeeStore.employees.map((val) => ({
    label: `${val.firstname} ${val.middlename ? val.middlename + " " : ""}${
      val.lastname
    }`,
    value: val.id,
  }));
  filterEmployeeOptions.value = employeeOptions.value;
};

onMounted(fetchEmployee);

const filteredEmployee = (val, update) => {
  update(() => {
    const needle = val.toLowerCase();
    filterEmployeeOptions.value =
      val === ""
        ? employeeOptions.value
        : employeeOptions.value.filter((v) =>
            v.label.toLowerCase().includes(needle)
          );
  });
};

//reactive warehouse form
const addNewWarehouseForm = reactive({
  name: "",
  location: "",
  employee: "",
  phone: "",
  status: null,
});

//create warehouse
const createWarehouse = async () => {
  const warehouse = {
    ...addNewWarehouseForm,
    employee_id: addNewWarehouseForm.employee.value,
  };

  console.log("awarehoouse data send", warehouse);

  const res = await warehousesStore.createWarehouses(warehouse);
  console.log("redssdfs", res);

  resetFormData();
  addWarehouseDialogVisible.value = false;
};

//reset the warehouse form
const resetFormData = () => {
  addNewWarehouseForm.name = "";
  addNewWarehouseForm.location = "";
  addNewWarehouseForm.person_incharge = "";
  addNewWarehouseForm.phone = "";
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
