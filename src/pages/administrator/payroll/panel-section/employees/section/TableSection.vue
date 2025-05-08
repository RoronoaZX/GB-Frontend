<template>
  <div style="width: 100%">
    <q-table
      class="user-card"
      title="Employees"
      :rows="employeesRowsData"
      :columns="employeeColumns"
      row-key="fullname"
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 7, 10, 0]"
      :loading="loading"
      :filter="filter"
      @request="onPageRequest"
    >
      <template v-slot:top-right>
        <q-input
          v-model="filter"
          outlined
          dense
          flat
          label="Search"
          debounce="300"
          style="width: 300px"
        ></q-input>
      </template>
      <template v-slot:body-cell-fullname="props">
        <q-td key="fullname" :props="props">
          <div class="text-subtitle2">
            {{ formatFullname(props.row) }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Employee Name
            </q-tooltip>
          </div>
          <q-popup-edit
            v-model="props.row"
            @update:model-value="
              (val) => updateEmployeeFullname(props.row, val)
            "
            buttons
            title="Edit Employee Full Name"
            v-slot="{ value, set }"
          >
            <div class="row q-gutter-md">
              <q-input
                class="text-capitalize"
                v-model="value.firstname"
                label="First Name"
                outlined
                flat
                color="positive"
                dense
                autofucos
                @keyup.enter="set(value)"
              />
              <q-input
                class="text-capitalize"
                v-model="value.middlename"
                label="Middle Name"
                outlined
                flat
                color="positive"
                dense
                autofucos
                @keyup.enter="set(value)"
              />
              <q-input
                class="text-capitalize"
                v-model="value.lastname"
                label="Last Name"
                outlined
                flat
                color="positive"
                dense
                autofucos
                @keyup.enter="set(value)"
              />
            </div>
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-employmentType="props">
        <q-td :props="props">
          <q-badge
            :color="
              getEmployementTypeColor(props.row.employment_type?.category)
            "
          >
            {{ props.row.employment_type?.category || "N/A" }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Employment Type
            </q-tooltip>
            <!-- {{ props.row.employment_type }} -->
          </q-badge>
          <q-popup-edit
            v-model="employmentTypeId"
            @before-show="() => setEmploymentTypeId(props.row)"
            @save="(val) => updateEmploymentType(props.row, val)"
            buttons
            title="Edit Employment Type"
            v-slot="scope"
          >
            <!-- @before-show="(scope) => setEmploymentTypeId(props.row, scope)"
          @update:model-value="(val) => updateEmploymentType(props.row, val)"
          buttons
          title="Edit Employment Type"
          v-slot="scope" -->
            <!-- @update:model-value="(val) => updateEmploymentType(props.row, val)"
          @before-show="setEmploymentTypeId(props.row)"
          @save="
            (val) => {
              console.log('Selected ID:', val);
              updateEmploymentType(props.row, val);
            }
          "
          buttons
          title="Edit Employment Type"
          v-slot="scope" -->
            <q-select
              v-model="scope.value"
              @update:model-value="employmentTypeId"
              dense
              autofocus
              :options="employmentTypeOptions"
              option-label="label"
              option-value="value"
              behavior="menu"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-address="props">
        <q-td :props="props" style="text-align: justify">
          <div>
            {{ capitalizeAddress(props.row.address) }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Address
            </q-tooltip>
          </div>
          <q-popup-edit
            @update:model-value="(val) => updateEmployeeAddress(props.row, val)"
            v-model="props.row.address"
            buttons
            title="Edit Address"
            v-slot="scope"
          >
            <q-input
              class="text-capitalize"
              v-model="scope.value"
              dense
              autofocus
              counter
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-phone="props">
        <q-td :props="props">
          <div>
            {{ capitalizeAddress(props.row.phone) }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Phone
            </q-tooltip>
          </div>
          <q-popup-edit
            @update:model-value="(val) => updateEmployeePhone(props.row, val)"
            v-model="props.row.phone"
            buttons
            title="Edit Phone"
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              dense
              autofocus
              mask="+(63) ### - ### - ####"
              counter
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-birthdate="props">
        <q-td :props="props">
          <div>
            {{ formatDate(props.row.birthdate) }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Birthdate
            </q-tooltip>
          </div>
          <q-popup-edit
            @update:model-value="
              (val) => updateEmployeeBirthdate(props.row, val)
            "
            v-model="props.row.birthdate"
            buttons
            title="Edit Birthdate"
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              dense
              autofocus
              type="date"
              hint="mm/dd/yyyy"
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <!-- <EmployeeEdit :edit="props" /> -->
            <!-- padding="xs md" -->
            <q-btn
              round
              dense
              size="md"
              color="black"
              icon="print"
              flat
              @click="handlePrintID(props.row)"
            >
              <q-tooltip class="bg-black" :delay="200"> Print </q-tooltip>
            </q-btn>
          </div>
        </q-td>
      </template>
      <template #loading>
        <q-inner-loading showing>
          <q-spinner-ios size="50px" color="grey-10" />
        </q-inner-loading>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="dialog" persistent>
    <q-card class="bg-gradient" style="width: 700px; max-width: 80vw">
      <div class="text-white q-ma-sm" align="right">
        <q-btn icon="close" flat dense round v-close-popup />
      </div>
      <div>
        <iframe :src="pdfUrl" width="100%" height="700px" />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {
  formatFullname,
  capitalizeAddress,
  formatDate,
  updateEmployeeFullname,
  updateEmploymentType,
  updateEmployeeAddress,
  updateEmployeePhone,
  updateEmployeeBirthdate,
  getEmployementTypeColor,
  employeeColumns,
} from "src/composables/employeeFunction/useEmployeeFunctions";
// import SearchEmployee from "./SearchEmployee.vue";
// import { date, useQuasar } from "quasar";
import { useEmployeeStore } from "src/stores/employee";
import { useEmploymentTypeStore } from "src/stores/employment-type";
import { computed, onMounted, ref, watch } from "vue";
import IDLogo from "../../../../../../assets/IDLogo.png";
import GB_LOGO from "../../../../../../assets/GB_LOGO.png";
import { useEmployeeIDPrinter } from "src/composables/employeeFunction/useEmployeeIDPrinter";

const { dialog, pdfUrl, handlePrintID } = useEmployeeIDPrinter(IDLogo, GB_LOGO);

// import IDLogo from "../../../../../../assets/IDLogo.png";
// import GB_LOGO from "../../../../../../assets/GB_LOGO.png";
// import EmployeeEdit from "./EmployeeEdit.vue";
// import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from "pdfmake/build/vfs_fontes";
// pdfMake.vfs = pdfFonts.default;

const employmentStore = useEmploymentTypeStore();
const employmentTypeOptions = ref([]);
const employeeStore = useEmployeeStore();
const employeeRows = computed(() => employeeStore.employees); // Computed property will automatically update when the store changes
const employeesRowsData = ref([]);

const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});

const filter = ref("");
const loading = ref(false);
console.log("employees fetch madepaker", employeeRows.value);

onMounted(async () => {
  await reloadTableData();
});

const fetchEmploymentTypeData = async () => {
  await employmentStore.fetchEmploymentType();
  employmentTypeOptions.value = employmentStore.employmentType.map((val) => ({
    label: val.category,
    value: val.id,
  }));
  console.log("Employment Type Options:", employmentTypeOptions.value);
};

onMounted(fetchEmploymentTypeData);

// Temporary ref for q-popup-edit
const employmentTypeId = ref(null);
// Function to set the initial employment type ID before editing

// Set the initial employment type ID before editing
const setEmploymentTypeId = (row) => {
  employmentTypeId.value = row.employment_type?.id || null;
  console.log("Initial employmentTypeId:", employmentTypeId.value);
};

console.log("====================================");
console.log("employmentTypeIdsss", employmentTypeId.value);
console.log("====================================");

const reloadTableData = async (page = 0, rowsPerPage = 5, search = "") => {
  try {
    loading.value = true;
    employeeRows.value = await employeeStore.fetchEmployeeWithEmploymentType(
      page,
      rowsPerPage,
      search
    );
    console.log("fetchEmployeeWithEmploymentType", employeeRows.value);

    const { data, current_page, per_page, total } = employeeRows.value;
    employeesRowsData.value = data;
    console.log("employeesRowsData.value", employeesRowsData.value);
    pagination.value.page = current_page;
    console.log("pagination.value.page", pagination.value.page);
    pagination.value.rowsPerPage = per_page;
    console.log("pagination.value.rowsPerPage", pagination.value.rowsPerPage);
    pagination.value.rowsNumber = total;
    console.log("pagination.value.rowsNumber", pagination.value.rowsNumber);
  } catch (error) {
    console.log("employee madepaker", error);
  } finally {
    loading.value = false;
  }
};

const onPageRequest = (props) => {
  console.log("porps", props);
  reloadTableData(
    props.pagination.page,
    props.pagination.rowsPerPage,
    props.filter
  );
};

watch(filter, async (newVal) => {
  await reloadTableData(
    pagination.value.page,
    pagination.value.rowsPerPage,
    newVal
  );
});
</script>

<style lang="scss" scoped>
.custom-table {
  border-radius: 15px;
  background: #fff;
  color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.user-card {
  height: 42%;
  border-radius: 15px;
  background: #fff;
  color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.q-btn {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.bg-gradient {
  background: linear-gradient(135deg, #ff31c5, #471b3b);
}

.q-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.gradient-btn {
  border: 5px solid; /* Define border size */
  border-image-slice: 1;
  border-width: 2px; /* Adjust the width as needed */
  border-image-source: linear-gradient(
    45deg,
    #fc0165,
    #2575fc
  ); /* Use your gradient */
  background-color: transparent; /* Set background to transparent if needed */
}

.gradient-btn q-btn {
  background-color: white; /* Keep the button's background white */
  padding: sm md;
  font-size: 1rem;
  color: #000; /* Adjust text color */
}
</style>
