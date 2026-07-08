<template>
  <div style="width: 100%">
    <!-- Skeletal Loading Table -->
    <div v-if="tableLoading" class="q-pa-sm">
      <q-markup-table flat class="user-card">
        <thead>
          <tr>
            <th class="text-left" style="width: 25%"><q-skeleton type="text" width="60%" /></th>
            <th class="text-left" style="width: 15%"><q-skeleton type="text" width="50%" /></th>
            <th class="text-left" style="width: 15%"><q-skeleton type="text" width="50%" /></th>
            <th class="text-left" style="width: 15%"><q-skeleton type="text" width="50%" /></th>
            <th class="text-center" style="width: 10%"><q-skeleton type="text" width="40%" class="q-mx-auto" /></th>
            <th class="text-center" style="width: 10%"><q-skeleton type="text" width="40%" class="q-mx-auto" /></th>
            <th class="text-center" style="width: 10%"><q-skeleton type="text" width="50%" class="q-mx-auto" /></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 5" :key="n">
            <td>
              <div class="row items-center no-wrap">
                <q-skeleton type="circle" size="36px" class="q-mr-md" />
                <div style="flex: 1">
                  <q-skeleton type="text" width="80%" />
                </div>
              </div>
            </td>
            <td><q-skeleton type="text" width="70%" /></td>
            <td><q-skeleton type="text" width="60%" /></td>
            <td><q-skeleton type="text" width="60%" /></td>
            <td class="text-center"><q-skeleton type="text" width="45%" class="q-mx-auto" /></td>
            <td class="text-center"><q-skeleton type="rect" width="50px" height="20px" class="q-mx-auto" style="border-radius: 4px;" /></td>
            <td>
              <div class="row justify-center q-gutter-x-md">
                <q-skeleton type="rect" width="32px" height="32px" style="border-radius: 4px;" />
                <q-skeleton type="rect" width="32px" height="32px" style="border-radius: 4px;" />
              </div>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>

    <q-table
      v-else
      class="premium-table"
      title="Employees"
      :rows="employeesRowsData"
      :columns="employeeColumns"
      row-key="fullname"
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 7, 10, 0]"
      :filter="filter"
      @request="onPageRequest"
    >
      <template v-slot:top-right>
        <q-input
          v-model="filter"
          outlined
          dense
          placeholder="Search employees..."
          debounce="300"
          class="search-input"
        >
          <template v-slot:append>
            <q-icon name="search" size="xs" color="grey-6" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-fullname="props">
        <q-td :props="props" class="cursor-pointer text-left">
          <div class="row items-center no-wrap edit-trigger justify-start">
            <div class="avatar-circle-badge q-mr-sm">
              {{ getInitials(props.row) }}
            </div>
            <div>
              <div class="text-subtitle2 text-weight-bold text-slate-8">
                {{ formatFullname(props.row) }}
              </div>
              <q-icon name="edit" size="12px" color="grey-6" class="edit-icon" />
            </div>
          </div>
          <q-popup-edit
            v-model="props.row"
            @update:model-value="
              (val) => updateEmployeeFullname(props.row, val)
            "
            v-slot="{ value, set }"
            content-class="popup-card"
          >
            <div class="q-pa-md" style="min-width: 320px">
              <div class="popup-title q-mb-md">Edit Employee Name</div>
              <div class="column q-gutter-y-sm">
                <q-input
                  class="text-capitalize popup-input"
                  v-model="value.firstname"
                  label="First Name"
                  outlined
                  dense
                  autofocus
                  @keyup.enter="set(value)"
                />
                <q-input
                  class="text-capitalize popup-input"
                  v-model="value.middlename"
                  label="Middle Name"
                  outlined
                  dense
                  @keyup.enter="set(value)"
                />
                <q-input
                  class="text-capitalize popup-input"
                  v-model="value.lastname"
                  label="Last Name"
                  outlined
                  dense
                  @keyup.enter="set(value)"
                />
              </div>
              <div class="row justify-end q-mt-md q-gutter-x-sm">
                <q-btn flat label="Cancel" color="grey-7" no-caps v-close-popup />
                <q-btn unelevated label="Save" color="teal" no-caps class="q-px-md rounded-btn" @click="set(value)" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-position="props">
        <q-td :props="props" class="text-center cursor-pointer">
          <div class="edit-trigger">
            <q-chip
              outline
              square
              :text-color="getUserBadgePositionColor(props.row.position)"
              :color="getUserBadgePositionColor(props.row.position)"
              class="q-ma-none text-weight-bold"
              size="sm"
            >
              {{ capitalizeAddress(props.row?.position || "N/A") }}
            </q-chip>
            <q-icon name="edit" size="12px" color="grey-6" class="edit-icon q-ml-xs" />
          </div>
          <q-popup-edit
            @update:model-value="
              (val) => updateEmployeePosition(props.row, val)
            "
            v-model="props.row.position"
            v-slot="scope"
            content-class="popup-card"
          >
            <div class="q-pa-md" style="min-width: 280px">
              <div class="popup-title q-mb-md">Edit Position</div>
              <q-select
                class="text-capitalize popup-input"
                v-model="scope.value"
                :options="positionOptions"
                outlined
                dense
                autofocus
                @keyup.enter="scope.set(scope.value)"
              />
              <div class="row justify-end q-mt-md q-gutter-x-sm">
                <q-btn flat label="Cancel" color="grey-7" no-caps @click="scope.cancel" />
                <q-btn unelevated label="Save" color="teal" no-caps class="q-px-md rounded-btn" @click="scope.set(scope.value)" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-employmentType="props">
        <q-td :props="props" class="text-center cursor-pointer">
          <div class="edit-trigger">
            <q-badge
              :color="getEmployementTypeColor(props.row.employment_type?.category)"
              class="text-weight-bold q-px-sm q-py-xs"
              style="border-radius: 4px;"
            >
              {{ props.row.employment_type?.category || "N/A" }}
            </q-badge>
            <q-icon name="edit" size="12px" color="grey-6" class="edit-icon q-ml-xs" />
          </div>
          <q-popup-edit
            v-model="props.row.employment_type.id"
            v-slot="scope"
            content-class="popup-card"
            @save="
              (val) => updateEmploymentType(props.row, val, reloadTableData)
            "
          >
            <div class="q-pa-md" style="min-width: 280px">
              <div class="popup-title q-mb-md">Edit Employment Type</div>
              <q-select
                v-model="scope.value"
                :options="employmentTypeOptions"
                autofocus
                option-label="label"
                option-value="value"
                emit-value
                map-options
                dense
                outlined
                class="popup-input"
                behavior="menu"
                @keyup.enter="scope.set(scope.value)"
              />
              <div class="row justify-end q-mt-md q-gutter-x-sm">
                <q-btn flat label="Cancel" color="grey-7" no-caps @click="scope.cancel" />
                <q-btn unelevated label="Save" color="teal" no-caps class="q-px-md rounded-btn" @click="scope.set(scope.value)" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-address="props">
        <q-td :props="props" class="cursor-pointer">
          <div class="edit-trigger text-left">
            <span class="ellipsis" style="max-width: 150px; display: inline-block;">
              {{ capitalizeAddress(props.row.address) }}
            </span>
            <q-icon name="edit" size="12px" color="grey-6" class="edit-icon q-ml-xs" />
          </div>
          <q-popup-edit
            @update:model-value="(val) => updateEmployeeAddress(props.row, val)"
            v-model="props.row.address"
            v-slot="scope"
            content-class="popup-card"
          >
            <div class="q-pa-md" style="min-width: 320px">
              <div class="popup-title q-mb-md">Edit Address</div>
              <q-input
                class="text-capitalize popup-input"
                v-model="scope.value"
                dense
                outlined
                autofocus
                @keyup.enter="scope.set(scope.value)"
              />
              <div class="row justify-end q-mt-md q-gutter-x-sm">
                <q-btn flat label="Cancel" color="grey-7" no-caps @click="scope.cancel" />
                <q-btn unelevated label="Save" color="teal" no-caps class="q-px-md rounded-btn" @click="scope.set(scope.value)" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-phone="props">
        <q-td :props="props" class="text-center cursor-pointer">
          <div class="edit-trigger">
            <span class="numeric-font text-weight-medium">
              {{ props.row.phone || "N/A" }}
            </span>
            <q-icon name="edit" size="12px" color="grey-6" class="edit-icon q-ml-xs" />
          </div>
          <q-popup-edit
            @update:model-value="(val) => updateEmployeePhone(props.row, val)"
            v-model="props.row.phone"
            v-slot="scope"
            content-class="popup-card"
          >
            <div class="q-pa-md" style="min-width: 280px">
              <div class="popup-title q-mb-md">Edit Phone Number</div>
              <q-input
                v-model="scope.value"
                dense
                outlined
                autofocus
                mask="+(63) ### - ### - ####"
                class="popup-input"
                @keyup.enter="scope.set(scope.value)"
              />
              <div class="row justify-end q-mt-md q-gutter-x-sm">
                <q-btn flat label="Cancel" color="grey-7" no-caps @click="scope.cancel" />
                <q-btn unelevated label="Save" color="teal" no-caps class="q-px-md rounded-btn" @click="scope.set(scope.value)" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-birthdate="props">
        <q-td :props="props" class="text-center cursor-pointer">
          <div class="edit-trigger">
            <span class="numeric-font text-weight-medium">
              {{ formatDate(props.row.birthdate) }}
            </span>
            <q-icon name="edit" size="12px" color="grey-6" class="edit-icon q-ml-xs" />
          </div>
          <q-popup-edit
            @update:model-value="
              (val) => updateEmployeeBirthdate(props.row, val)
            "
            v-model="props.row.birthdate"
            v-slot="scope"
            content-class="popup-card"
          >
            <div class="q-pa-md" style="min-width: 280px">
              <div class="popup-title q-mb-md">Edit Birthdate</div>
              <q-input
                v-model="scope.value"
                dense
                outlined
                autofocus
                type="date"
                class="popup-input"
                @keyup.enter="scope.set(scope.value)"
              />
              <div class="row justify-end q-mt-md q-gutter-x-sm">
                <q-btn flat label="Cancel" color="grey-7" no-caps @click="scope.cancel" />
                <q-btn unelevated label="Save" color="teal" no-caps class="q-px-md rounded-btn" @click="scope.set(scope.value)" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-designation="props">
        <q-td :props="props" class="text-center cursor-pointer">
          <div class="edit-trigger">
            <span class="text-weight-medium">
              {{ capitalizeAddress(props.row.designation?.name) || "N/A" }}
            </span>
            <q-icon v-if="props.row.designation" name="edit" size="12px" color="grey-6" class="edit-icon q-ml-xs" />
          </div>
          <q-popup-edit
            v-if="props.row.designation"
            v-model="props.row.designation.id"
            v-slot="scope"
            content-class="popup-card"
            @save="
              (val) =>
                updateEmployeeDesignation(
                  props.row.designation,
                  val,
                  reloadTableData
                )
            "
          >
            <div class="q-pa-md" style="min-width: 280px">
              <div class="popup-title q-mb-md">Edit Designation</div>
              <q-select
                v-model="scope.value"
                :options="logOptions(props.row)"
                option-value="id"
                option-label="name"
                emit-value
                map-options
                dense
                outlined
                class="popup-input"
                @keyup.enter="scope.set(scope.value)"
              />
              <div class="row justify-end q-mt-md q-gutter-x-sm">
                <q-btn flat label="Cancel" color="grey-7" no-caps @click="scope.cancel" />
                <q-btn unelevated label="Save" color="teal" no-caps class="q-px-md rounded-btn" @click="scope.set(scope.value)" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-time_in="props">
        <q-td :props="props" class="text-center cursor-pointer">
          <div class="edit-trigger">
            <span class="numeric-font text-weight-medium">
              {{ props.row.designation?.time_in || "N/A" }}
            </span>
            <q-icon v-if="props.row.designation" name="edit" size="12px" color="grey-6" class="edit-icon q-ml-xs" />
          </div>
          <q-popup-edit
            v-if="props.row.designation"
            @update:model-value="
              (val) => updateEmployeeTimeIn(props.row.designation, val)
            "
            v-model="props.row.designation.time_in"
            v-slot="scope"
            content-class="popup-card"
          >
            <div class="q-pa-md" style="min-width: 280px">
              <div class="popup-title q-mb-sm">Edit Time In</div>
              <div class="text-caption text-grey-5 q-mb-md">Format: 01:00 AM/PM</div>
              <q-input
                v-model="scope.value"
                :model-value="scope.value"
                @update:model-value="scope.value = $event"
                dense
                outlined
                autofocus
                mask="##:## AA"
                :rules="[validateTimeFormat]"
                class="popup-input"
                @keyup.enter="scope.set"
              />
              <div class="row justify-end q-mt-md q-gutter-x-sm">
                <q-btn flat label="Cancel" color="grey-7" no-caps @click="scope.cancel" />
                <q-btn unelevated label="Save" color="teal" no-caps class="q-px-md rounded-btn" @click="scope.set" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-time_out="props">
        <q-td :props="props" class="text-center cursor-pointer">
          <div class="edit-trigger">
            <span class="numeric-font text-weight-medium">
              {{ props.row.designation?.time_out || "N/A" }}
            </span>
            <q-icon v-if="props.row.designation" name="edit" size="12px" color="grey-6" class="edit-icon q-ml-xs" />
          </div>
          <q-popup-edit
            v-if="props.row.designation"
            @update:model-value="
              (val) => updateEmployeeTimeOut(props.row.designation, val)
            "
            v-model="props.row.designation.time_out"
            v-slot="scope"
            content-class="popup-card"
          >
            <div class="q-pa-md" style="min-width: 280px">
              <div class="popup-title q-mb-sm">Edit Time Out</div>
              <div class="text-caption text-grey-5 q-mb-md">Format: 01:00 AM/PM</div>
              <q-input
                v-model="scope.value"
                :model-value="scope.value"
                @update:model-value="scope.value = $event"
                dense
                outlined
                autofocus
                mask="##:## AA"
                :rules="[validateTimeFormat]"
                class="popup-input"
                @keyup.enter="scope.set"
              />
              <div class="row justify-end q-mt-md q-gutter-x-sm">
                <q-btn flat label="Cancel" color="grey-7" no-caps @click="scope.cancel" />
                <q-btn unelevated label="Save" color="teal" no-caps class="q-px-md rounded-btn" @click="scope.set" />
              </div>
            </div>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <q-btn
              round
              dense
              size="sm"
              color="teal"
              icon="fingerprint"
              flat
              class="print-btn"
              @click="handlePrintID(props.row)"
            >
              <q-tooltip class="bg-teal-9" :delay="200"> Print Employee ID </q-tooltip>
            </q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="dialog" persistent backdrop-filter="blur(4px)">
    <q-card class="pdf-preview-card" style="width: 750px; max-width: 90vw; overflow: hidden;">
      <q-card-section class="row items-center q-px-lg q-py-md dialog-header text-white">
        <div class="text-subtitle1 text-weight-bold row items-center">
          <q-icon name="picture_as_pdf" class="q-mr-sm" size="sm" />
          Employee ID Card Preview
        </div>
        <q-space />
        <q-btn icon="download" flat dense round @click="downloadPDF" color="white" class="q-mr-sm dialog-download-btn">
          <q-tooltip class="bg-teal-9">Download PDF</q-tooltip>
        </q-btn>
        <q-btn icon="close" flat dense round v-close-popup class="dialog-close-btn" />
      </q-card-section>
      <q-card-section class="q-pa-none">
        <iframe :src="pdfUrl" width="100%" height="700px" style="border: none; display: block;" />
      </q-card-section>
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
  updateEmployeePosition,
  updateEmployeeAddress,
  updateEmployeePhone,
  updateEmployeeBirthdate,
  updateEmployeeDesignation,
  updateEmployeeTimeIn,
  updateEmployeeTimeOut,
  getOptions,
  employmentTypeOptions,
  tableLoading,
  validateTimeFormat,
  getEmployementTypeColor,
  employeeColumns,
} from "src/composables/employeeFunction/useEmployeeFunctions";
import { badgeColor } from "src/composables/badge-color/badge-color";
// import SearchEmployee from "./SearchEmployee.vue";
// import { date, useQuasar } from "quasar";
import { useEmployeeStore } from "src/stores/employee";
import { useEmploymentTypeStore } from "src/stores/employment-type";
import { computed, onMounted, ref, watch } from "vue";
import IDLogo from "src/assets/IDLogo.png";
import GB_LOGO from "src/assets/GB_LOGO.png";
import { useEmployeeIDPrinter } from "src/composables/employeeFunction/useEmployeeIDPrinter";

const { dialog, pdfUrl, handlePrintID } = useEmployeeIDPrinter(IDLogo, GB_LOGO);
const { getUserBadgePositionColor } = badgeColor();

const employmentStore = useEmploymentTypeStore();
const employeeStore = useEmployeeStore();
const employeeRows = computed(() => employeeStore.employees); // Computed property will automatically update when the store changes
const employeesRowsData = ref([]);

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

const logOptions = (row) => {
  /* console.log("designation_type:", row.designation?.designation_type); */
  const opts = getOptions(row);
  return opts;
};

const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});

const filter = ref("");
const loading = ref(false);
/* console.log("employees fetch madepaker", employeeRows.value); */

onMounted(async () => {
  await reloadTableData();
});

const fetchEmploymentTypeData = async () => {
  await employmentStore.fetchEmploymentType();
  employmentTypeOptions.value = employmentStore.employmentType.map((val) => ({
    label: val.category,
    value: val.id,
  }));
  /* console.log("Employment Type Options:", employmentTypeOptions.value); */
};

onMounted(fetchEmploymentTypeData);

// Temporary ref for q-popup-edit
const employmentTypeId = ref(null);
// Function to set the initial employment type ID before editing

// Set the initial employment type ID before editing
const setEmploymentTypeId = (row) => {
  employmentTypeId.value = row.employment_type?.id || null;
  /* console.log("Initial employmentTypeId:", employmentTypeId.value); */
};

/* console.log("===================================="); */
/* console.log("employmentTypeIdsss", employmentTypeId.value); */
/* console.log("===================================="); */

const reloadTableData = async (page = 0, rowsPerPage = 5, search = "") => {
  try {
    tableLoading.value = true;
    employeeRows.value = await employeeStore.fetchEmployeeWithEmploymentType(
      page,
      rowsPerPage,
      search
    );
    /* console.log("fetchEmployeeWithEmploymentType", employeeRows.value); */

    const { data, current_page, per_page, total } = employeeRows.value;
    employeesRowsData.value = data;
    /* console.log("employeesRowsData.value", employeesRowsData.value); */
    pagination.value.page = current_page;
    /* console.log("pagination.value.page", pagination.value.page); */
    pagination.value.rowsPerPage = per_page;
    /* console.log("pagination.value.rowsPerPage", pagination.value.rowsPerPage); */
    pagination.value.rowsNumber = total;
    /* console.log("pagination.value.rowsNumber", pagination.value.rowsNumber); */
  } catch (error) {
    /* console.log("employee madepaker", error); */
  } finally {
    tableLoading.value = false;
  }
};

const onPageRequest = (props) => {
  /* console.log("porps", props); */
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

const getInitials = (row) => {
  const first = row.firstname ? row.firstname.charAt(0) : "";
  const last = row.lastname ? row.lastname.charAt(0) : "";
  return (first + last).toUpperCase() || "?";
};

const downloadPDF = () => {
  if (!pdfUrl.value) return;
  const link = document.createElement("a");
  link.href = pdfUrl.value;
  link.download = `Employee_ID_Card_${Date.now()}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style lang="scss" scoped>
.gradient-header {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%) !important;
  color: #ffffff !important;
}

.premium-table {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(226, 232, 240, 0.8);
  background: #ffffff;
  
  :deep(.q-table__card) {
    box-shadow: none;
    background: transparent;
  }

  :deep(thead tr) {
    height: 48px;
  }

  :deep(tbody tr) {
    transition: background-color 0.2s ease;
    &:hover {
      background-color: rgba(241, 245, 249, 0.5) !important;
    }
  }

  /* Make the first column (fullname) sticky with appropriate background */
  :deep(td:first-child) {
    background: #ffffff !important;
    position: sticky;
    left: 0;
    z-index: 1;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.02);
  }
  
  :deep(tr:hover td:first-child) {
    background: #f8fafc !important;
  }

  :deep(th:first-child) {
    background: #1e293b !important;
    color: white !important;
    position: sticky;
    left: 0;
    z-index: 2;
  }
}

.numeric-font {
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 0.9rem;
}

.edit-trigger {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(13, 148, 136, 0.08);
    .edit-icon {
      color: #0d9488;
      transform: scale(1.15);
      opacity: 1;
    }
  }

  .edit-icon {
    transition: all 0.2s ease;
    opacity: 0.6;
  }
}

/* Avatar Circle Initials Badge */
.avatar-circle-badge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0d9488 0%, #0891b2 100%);
  color: white;
  font-weight: 700;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(13, 148, 136, 0.2);
}

:deep(.popup-card) {
  border-radius: 12px !important;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.1) !important;
  border: 1px solid rgba(226, 232, 240, 0.8) !important;
  background: #ffffff !important;
}

.popup-title {
  color: #0f172a;
  font-weight: 700;
  font-size: 1rem;
}

.popup-input {
  :deep(.q-field__control) {
    border-radius: 8px;
    transition: all 0.2s ease-in-out;
  }
  :deep(.q-field__control:focus-within) {
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);
  }
}

.search-input {
  width: 260px;
  :deep(.q-field__control) {
    border-radius: 9999px;
    background-color: #f1f5f9;
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;
  }
  :deep(.q-field__control:hover) {
    border-color: #cbd5e1;
  }
  :deep(.q-field__control:focus-within) {
    background-color: #ffffff;
    border-color: #0d9488;
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);
  }
}

.rounded-btn {
  border-radius: 8px;
}

.print-btn {
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    background-color: rgba(13, 148, 136, 0.08);
  }
}

/* PDF Preview Dialog Custom Styles */
.pdf-preview-card {
  border-radius: 16px !important;
  box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25) !important;
}

.dialog-header {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%) !important;
  border-bottom: 1px solid rgba(226, 232, 240, 0.1);
}

.dialog-close-btn {
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.25s ease-in-out;
  
  &:hover {
    background-color: rgba(239, 68, 68, 0.25) !important;
    color: #ef4444 !important;
    transform: rotate(90deg);
  }
}

.dialog-download-btn {
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: rgba(13, 148, 136, 0.25) !important;
    color: #14b8a6 !important;
    transform: translateY(-1px);
  }
}

// ============================================================
// DARK MODE — comprehensive overrides for all table elements
// Using :global so it beats scoped !important rules above
// ============================================================
:global(.body--dark) {
  // ---- Table wrapper & card ----
  .premium-table {
    background: #0f172a !important;
    border-color: #1e293b !important;
    color: #cbd5e1 !important;

    :deep(.q-table__card) {
      background: #0f172a !important;
      box-shadow: none !important;
    }

    // Top bar (search area)
    :deep(.q-table__top) {
      background: #0f172a !important;
      border-bottom: 1px solid #1e293b !important;
    }

    // Bottom pagination bar
    :deep(.q-table__bottom) {
      background: #0f172a !important;
      border-top: 1px solid #1e293b !important;
      color: #94a3b8 !important;
    }

    // Table rows
    :deep(tbody tr) {
      &:hover {
        background-color: rgba(255, 255, 255, 0.03) !important;
      }
    }

    // All table cells
    :deep(td) {
      color: #cbd5e1 !important;
      border-color: #1e293b !important;
    }

    // Sticky first column — the white-block culprit
    :deep(td:first-child) {
      background: #0f172a !important;
    }

    :deep(tr:hover td:first-child) {
      background: #131c2e !important;
    }

    // Table header
    :deep(th) {
      background: #1e293b !important;
      color: #94a3b8 !important;
      border-color: #334155 !important;
    }

    :deep(th:first-child) {
      background: #1e293b !important;
      color: #f8fafc !important;
    }

    // "Employees" title text in table
    :deep(.q-table__title) {
      color: #f8fafc !important;
    }
  }

  // ---- Search input ----
  .search-input {
    :deep(.q-field__control) {
      background-color: #1e293b !important;
      border-color: #334155 !important;
    }
    :deep(.q-field__native),
    :deep(.q-field__input) {
      color: #f1f5f9 !important;
    }
    :deep(.q-placeholder) {
      color: #64748b !important;
    }
    :deep(.q-field__control:hover) {
      border-color: #475569 !important;
    }
    :deep(.q-field__control:focus-within) {
      background-color: #0f172a !important;
      border-color: #0d9488 !important;
      box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.2) !important;
    }
  }

  // ---- Popup card (edit popovers) ----
  :deep(.popup-card) {
    background: #0f172a !important;
    border: 1px solid #1e293b !important;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5) !important;
  }

  .popup-title {
    color: #f8fafc !important;
  }

  // ---- Skeleton / loading table ----
  .user-card {
    background: #0f172a !important;
    border-color: #1e293b !important;
  }
}

</style>
