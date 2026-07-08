<template>
  <q-page class="q-my-md">
    <div class="row justify-between q-mb-md" align="right">
      <div class="row q-gutter-md">
        <div>
          <AddDeduction @created="reloadTableData" />
        </div>
      </div>
      <SearchBenefit v-model="filter" @update:model-value="filter" />
    </div>
    <!-- Skeletal Loading Table -->
    <div v-if="tableLoading" class="q-pa-sm">
      <q-markup-table flat class="user-card">
        <thead>
          <tr class="gradient-header text-white">
            <th v-for="col in employeeBenefitColumns" :key="col.name" class="text-center">
              <q-skeleton type="text" width="60%" class="q-mx-auto" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 5" :key="n">
            <td v-for="col in employeeBenefitColumns" :key="col.name" class="text-center">
              <q-skeleton type="text" width="50%" class="q-mx-auto" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>

    <q-table
      v-else
      :rows="employeeBenefitRows"
      :columns="employeeBenefitColumns"
      row-key="name"
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 7, 10, 0]"
      @request="handleRequest"
      :filter="filter"
    >
      <template v-slot:header="props">
        <q-tr
          :props="props"
          class="gradient-header text-white text-weight-bold"
        >
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-center text-subtitle2"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body-cell-sss_number="props">
        <q-td :props="props" class="cursor-pointer text-center">
          <div class="edit-trigger">
            <q-icon name="edit" size="14px" color="grey-6" class="edit-icon q-mr-xs" />
            <span class="numeric-font">
              {{ props.row.sss_number ? props.row.sss_number : " - - - " }}
            </span>
          </div>
          <q-tooltip class="bg-blue-grey-8">Edit SSS Number</q-tooltip>
          <q-popup-edit
            @update:model-value="(val) => updateSSSNumber(props.row, val)"
            v-model="props.row.sss_number"
            v-slot="scope"
            content-class="popup-card"
          >
            <div class="q-pa-md" style="min-width: 280px">
              <div class="popup-title q-mb-sm">
                Edit SSS Number
              </div>
              <div class="text-caption text-grey-7 q-mb-md">
                Name: <span class="text-weight-bold text-dark">{{ formatFullname(props.row.employee) }}</span>
              </div>
              <q-input
                v-model="scope.value"
                :model-value="scope.value"
                @update:model-value="scope.value = $event"
                type="text"
                mask="##-#######-###"
                outlined
                dense
                autofocus
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

      <template v-slot:body-cell-sss="props">
        <q-td :props="props" class="cursor-pointer text-center">
          <div class="edit-trigger">
            <q-icon name="edit" size="14px" color="grey-6" class="edit-icon q-mr-xs" />
            <span class="numeric-font text-teal-9 text-weight-bold">
              {{ props.row.sss ? formatCurrency(props.row.sss) : " - - - " }}
            </span>
          </div>
          <q-tooltip class="bg-blue-grey-8">Edit SSS Contribution</q-tooltip>
          <q-popup-edit
            @update:model-value="(val) => updateSSS(props.row, val)"
            v-model="props.row.sss"
            v-slot="scope"
            content-class="popup-card"
          >
            <div class="q-pa-md" style="min-width: 280px">
              <div class="popup-title q-mb-sm">
                Edit SSS Contribution
              </div>
              <div class="text-caption text-grey-7 q-mb-md">
                Name: <span class="text-weight-bold text-dark">{{ formatFullname(props.row.employee) }}</span>
              </div>
              <q-input
                v-model="scope.value"
                :model-value="formatForEdit(scope.value)"
                @update:model-value="scope.value = $event"
                type="text"
                outlined
                dense
                autofocus
                prefix="₱"
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

      <template v-slot:body-cell-hdmf_number="props">
        <q-td :props="props" class="cursor-pointer text-center">
          <div class="edit-trigger">
            <q-icon name="edit" size="14px" color="grey-6" class="edit-icon q-mr-xs" />
            <span class="numeric-font">
              {{ props.row.hdmf_number ? props.row.hdmf_number : " - - - " }}
            </span>
          </div>
          <q-tooltip class="bg-blue-grey-8">Edit Pag-IBIG Number</q-tooltip>
          <q-popup-edit
            @update:model-value="(val) => updateHDMFNumber(props.row, val)"
            v-model="props.row.hdmf_number"
            v-slot="scope"
            content-class="popup-card"
          >
            <div class="q-pa-md" style="min-width: 280px">
              <div class="popup-title q-mb-sm">
                Edit Pag-IBIG Number
              </div>
              <div class="text-caption text-grey-7 q-mb-md">
                Name: <span class="text-weight-bold text-dark">{{ formatFullname(props.row.employee) }}</span>
              </div>
              <q-input
                v-model="scope.value"
                :model-value="scope.value"
                @update:model-value="scope.value = $event"
                type="text"
                mask="####-####-####"
                outlined
                dense
                autofocus
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

      <template v-slot:body-cell-hdmf="props">
        <q-td :props="props" class="cursor-pointer text-center">
          <div class="edit-trigger">
            <q-icon name="edit" size="14px" color="grey-6" class="edit-icon q-mr-xs" />
            <span class="numeric-font text-teal-9 text-weight-bold">
              {{ props.row.hdmf ? formatCurrency(props.row.hdmf) : " - - - " }}
            </span>
          </div>
          <q-tooltip class="bg-blue-grey-8">Edit Pag-IBIG Contribution</q-tooltip>
          <q-popup-edit
            @update:model-value="(val) => updateHDMF(props.row, val)"
            v-model="props.row.hdmf"
            v-slot="scope"
            content-class="popup-card"
          >
            <div class="q-pa-md" style="min-width: 280px">
              <div class="popup-title q-mb-sm">
                Edit Pag-IBIG Fund
              </div>
              <div class="text-caption text-grey-7 q-mb-md">
                Name: <span class="text-weight-bold text-dark">{{ formatFullname(props.row.employee) }}</span>
              </div>
              <q-input
                v-model="scope.value"
                :model-value="formatForEdit(scope.value)"
                @update:model-value="scope.value = $event"
                type="text"
                outlined
                dense
                autofocus
                prefix="₱"
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

      <template v-slot:body-cell-phic_number="props">
        <q-td :props="props" class="cursor-pointer text-center">
          <div class="edit-trigger">
            <q-icon name="edit" size="14px" color="grey-6" class="edit-icon q-mr-xs" />
            <span class="numeric-font">
              {{ props.row.phic_number ? props.row.phic_number : " - - - " }}
            </span>
          </div>
          <q-tooltip class="bg-blue-grey-8">Edit PhilHealth Number</q-tooltip>
          <q-popup-edit
            @update:model-value="(val) => updatePHICNumber(props.row, val)"
            v-model="props.row.phic_number"
            v-slot="scope"
            content-class="popup-card"
          >
            <div class="q-pa-md" style="min-width: 280px">
              <div class="popup-title q-mb-sm">
                Edit PhilHealth Number
              </div>
              <div class="text-caption text-grey-7 q-mb-md">
                Name: <span class="text-weight-bold text-dark">{{ formatFullname(props.row.employee) }}</span>
              </div>
              <q-input
                v-model="scope.value"
                :model-value="scope.value"
                @update:model-value="scope.value = $event"
                type="text"
                mask="##-#########-##"
                outlined
                dense
                autofocus
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

      <template v-slot:body-cell-phic="props">
        <q-td :props="props" class="cursor-pointer text-center">
          <div class="edit-trigger">
            <q-icon name="edit" size="14px" color="grey-6" class="edit-icon q-mr-xs" />
            <span class="numeric-font text-teal-9 text-weight-bold">
              {{ props.row.phic ? formatCurrency(props.row.phic) : " - - - " }}
            </span>
          </div>
          <q-tooltip class="bg-blue-grey-8">Edit PhilHealth Contribution</q-tooltip>
          <q-popup-edit
            @update:model-value="(val) => updatePHIC(props.row, val)"
            v-model="props.row.phic"
            v-slot="scope"
            content-class="popup-card"
          >
            <div class="q-pa-md" style="min-width: 280px">
              <div class="popup-title q-mb-sm">
                Edit PhilHealth Contribution
              </div>
              <div class="text-caption text-grey-7 q-mb-md">
                Name: <span class="text-weight-bold text-dark">{{ formatFullname(props.row.employee) }}</span>
              </div>
              <q-input
                v-model="scope.value"
                :model-value="formatForEdit(scope.value)"
                @update:model-value="scope.value = $event"
                type="text"
                outlined
                dense
                autofocus
                prefix="₱"
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

    </q-table>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import AddDeduction from "./AddDeduction.vue";
import { useEmployeeBenefitStore } from "stores/benefit";
import SearchBenefit from "./SearchBenefit.vue";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

const employeeBenefitStore = useEmployeeBenefitStore();
const employeeBenefit = computed(() => employeeBenefitStore.benefits);
const employeeBenefitRows = ref([]);
const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});

const filter = ref("");
const tableLoading = ref(false);
const searchLoading = ref(false);

function formatForEdit(val) {
  if (val === null || val === undefined || val === "") {
    return "";
  }
  const num = parseFloat(val);
  if (isNaN(num)) return "";
  return Number.isInteger(num) ? String(parseInt(num)) : String(num);
}

async function updateSSSNumber(data, val) {
  /* console.log("Updating SSS Number for", data, "to", val); */
  try {
    tableLoading.value = true;
    await api.put("/api/update-employee-sss-number-benefit/" + data.id, {
      sss_number: val,
    });

    Notify.create({
      message: "SSS Number updated successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
  } catch (error) {
    /* console.log(error); */

    Notify.create({
      message: "Error updating SSS Number",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  } finally {
    tableLoading.value = false;
  }
}

async function updateSSS(data, val) {
  /* console.log("Updating SSS for", data, "to", val); */
  try {
    tableLoading.value = true;
    await api.put("/api/update-employee-sss-benefit/" + data.id, {
      sss: val,
    });

    Notify.create({
      message: "SSS updated successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
  } catch (error) {
    console.error("Error updating SSS:", error);
    Notify.create({
      message: "Error updating SSS",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  } finally {
    tableLoading.value = false;
  }
}

async function updateHDMFNumber(data, val) {
  /* console.log("Updating HDMF Number for", data, "to", val); */
  try {
    tableLoading.value = true;
    await api.put("/api/update-employee-hdmf-number-benefit/" + data.id, {
      hdmf_number: val,
    });

    Notify.create({
      message: "HDMF Number updated successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
  } catch (error) {
    console.error(error);

    Notify.create({
      message: "Error updating HDMF Number",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  } finally {
    tableLoading.value = false;
  }
}

async function updateHDMF(data, val) {
  /* console.log("Updating HDMF for", data, "to", val); */
  try {
    tableLoading.value = true;
    await api.put("/api/update-employee-hdmf-benefit/" + data.id, {
      hdmf: val,
    });
    Notify.create({
      message: "HDMF updated successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
  } catch (error) {
    console.error("ERROR updating HDMF:", error);
  } finally {
    tableLoading.value = false;
  }
}

async function updatePHICNumber(data, val) {
  /* console.log("Updating PHIC Number for", data, "to", val); */
  try {
    tableLoading.value = true;
    await api.put("/api/update-employee-phic-number-benefit/" + data.id, {
      phic_number: val,
    });

    Notify.create({
      message: "PHIC Number updated successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
  } catch (error) {
    console.error(error);

    Notify.create({
      message: "Error updating PHIC Number",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  } finally {
    tableLoading.value = false;
  }
}

async function updatePHIC(data, val) {
  /* console.log("Updating PHIC for", data, "to", val); */
  try {
    tableLoading.value = true;
    await api.put("/api/update-employee-phic-benefit/" + data.id, {
      phic: val,
    });
    Notify.create({
      message: " PHIC updated successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
  } catch (error) {
    console.error("Error updating PHIC:", error);
    Notify.create({
      message: "Error updating PHIC",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  } finally {
    tableLoading.value = false;
  }
}

onMounted(async () => {
  await reloadTableData();
});

const reloadTableData = async (page = 1, rowsPerPage = 7, search = "") => {
  try {
    tableLoading.value = true;
    employeeBenefit.value = await employeeBenefitStore.fetchEmployeeBenefit(
      page,
      rowsPerPage,
      search
    );

    const { data, current_page, per_page, total } = employeeBenefit.value;
    employeeBenefitRows.value = data;
    /* console.log("employee benefit", employeeBenefitRows.value); */
    pagination.value.page = current_page;
    pagination.value.rowsPerPage = per_page;
    pagination.value.rowsNumber = total;

    /* console.log("benefit", employeeBenefitRows.value); */
  } catch (error) {
    /* console.log("error fetching", error); */
  } finally {
    tableLoading.value = false;
  }
};

const handleRequest = (props) => {
  /* console.log("handle benefits request", props); */

  reloadTableData(
    props.pagination.page,
    props.pagination.rowsPerPage,
    props.filter
  );
};

watch(filter, async (newVal) => {
  searchLoading.value = true;
  await reloadTableData(
    pagination.value.page,
    pagination.value.rowsPerPage,
    newVal
  );
  searchLoading.value = false;
});

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`.trim();
};

const formatDate = (dateTime) => {
  if (!dateTime) return " - - "; // Return a placeholder if the value is missing
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) return " - - ";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }); // Format as "Oct. 14, 2024"
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(value);
};

const employeeBenefitColumns = [
  // {
  //   name: "date",
  //   required: true,
  //   label: "Date",
  //   align: "left",
  //   field: (row) => formatDate(row.created_at),
  // },
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => formatFullname(row.employee),
  },
  {
    name: "sss_number",
    label: "SSS Number",
    align: "center",
    field: (row) => row.sss_number,
  },
  {
    name: "sss",
    label: "Social Security System (SSS)",
    align: "center",
    field: (row) => formatCurrency(row.sss),
  },
  {
    name: "hdmf_number",
    label: "Pag-IBIG Number",
    align: "center",
    field: (row) => row.hdmf_number,
  },
  {
    name: "hdmf",
    label: "Pag-IBIG Fund (HDMF)",
    align: "center",
    field: (row) => formatCurrency(row.hdmf),
  },
  {
    name: "phic_number",
    label: "Phil - Health Number",
    align: "center",
    field: (row) => row.phic_number,
  },
  {
    name: "phic",
    label: "Phil - Health (PHIC)",
    align: "center",
    field: (row) => formatCurrency(row.phic),
  },
];
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

.q-btn {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.q-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.gradient-header {
  background: #155e75;
}
.gradient-loader {
  background: linear-gradient(135deg, #42a5f5, #478ed1, #5c6bc0);
  color: white;
  z-index: 10;
  opacity: 0.85;
}

.numeric-font {
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 0.95rem;
}

.edit-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(13, 148, 136, 0.08);
    .edit-icon {
      color: #0d9488;
      transform: scale(1.15);
    }
  }

  .edit-icon {
    transition: all 0.2s ease;
  }
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
  font-size: 1.05rem;
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

.rounded-btn {
  border-radius: 8px;
}
</style>
