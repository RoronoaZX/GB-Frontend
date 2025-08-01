<template>
  <q-page class="q-my-md">
    <div class="row justify-between q-mb-md" align="right">
      <div class="row q-gutter-md">
        <div>
          <AddDeduction @created="reloadTableData" />
        </div>
      </div>
      <q-input
        v-model="filter"
        outlined
        dense
        debounce="300"
        flat
        label="Search"
        style="width: 300px"
      >
        <template v-slot:append>
          <div>
            <q-icon name="search" />
          </div>
        </template>
      </q-input>
    </div>
    <q-table
      :rows="employeeBenefitRows"
      :columns="employeeBenefitColumns"
      row-key="name"
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 7, 10, 0]"
      @request="handleRequest"
      :loading="tableLoading"
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
        <q-td :props="props">
          <span>
            {{ props.row.sss_number ? props.row.sss_number : " - - -" }}
            <q-tooltip class="bg-blue-grey-8">Edit SSS Number</q-tooltip>
          </span>
          <q-popup-edit
            @update:model-value="(val) => updateSSSNumber(props.row, val)"
            v-model="props.row.sss_number"
            buttons
            label-set="Save"
            label-cancel="Close"
            v-slot="scope"
          >
            <div>Edit SSS Number</div>
            <div>Name: {{ formatFullname(props.row.employee) }}</div>
            <q-input
              v-mode="scope.value"
              :model-value="scope.value"
              @update:model-value="scope.value = $event"
              type="text"
              mask="##-#######-###"
              autofocus
              counter
              @keyup.enter="scope.set"
            >
            </q-input>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-sss="props">
        <q-td :props="props">
          <span>
            {{ props.row.sss ? formatCurrency(props.row.sss) : " - - " }}
            <q-tooltip class="bg-blue-grey-8">Edit SSS</q-tooltip>
          </span>
          <q-popup-edit
            @update:model-value="(val) => updateSSS(props.row, val)"
            v-model="props.row.sss"
            buttons
            label-set="Save"
            label-cancel="Close"
            v-slot="scope"
          >
            <div class="text-h6 text-center q-mb-xs">Edit SSS</div>
            <div class="text-subtitle2 q-mb-sm">
              Name: {{ formatFullname(props.row.employee) }}
            </div>
            <q-input
              v-model="scope.value"
              :model-value="formatForEdit(scope.value)"
              @update:model-value="scope.value = $event"
              type="text"
              autofocus
              counter
              @keyup.enter="scope.set"
            >
            </q-input>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-hdmf_number="props">
        <q-td :props="props">
          <span>
            {{ props.row.hdmf_number ? props.row.hdmf_number : " - - -" }}
            <q-tooltip class="bg-blue-grey-8">Edit HDMF Number</q-tooltip>
          </span>
          <q-popup-edit
            @update:model-value="(val) => updateHDMFNumber(props.row, val)"
            v-model="props.row.hdmf_number"
            buttons
            label-set="Save"
            label-cancel="Close"
            v-slot="scope"
          >
            <div>Edit HDMF Number</div>
            <div>Name: {{ formatFullname(props.row.employee) }}</div>
            <q-input
              v-model="scope.value"
              :model-value="scope.value"
              @update:model-value="scope.value = $event"
              type="text"
              mask="####-####-####"
              autofocus
              counter
              @keyup.enter="scope.set"
            >
            </q-input>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-hdmf="props">
        <q-td :props="props">
          <span>
            {{ props.row.hdmf ? formatCurrency(props.row.hdmf) : " - - -" }}
            <q-tooltip class="bg-blue-grey-8">Edit HDMF</q-tooltip>
          </span>
          <q-popup-edit
            @update:model-value="(val) => updateHDMF(props.row, val)"
            v-model="props.row.hdmf"
            buttons
            label-set="Save"
            label-cancel="Close"
            v-slot="scope"
          >
            <div class="text-h6 text-center q-mb-xs">Edit HDMF</div>
            <div class="text-subtitle2 q-mb-sm">
              Name: {{ formatFullname(props.row.employee) }}
            </div>
            <q-input
              v-model="scope.value"
              :model-value="formatForEdit(scope.value)"
              @update:model-value="scope.value = $event"
              type="text"
              autofocus
              counter
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-phic_number="props">
        <q-td :props="props">
          <span>
            {{ props.row.phic_number ? props.row.phic_number : " - - -" }}
            <q-tooltip class="bg-blue-grey-8">Edit PHIC Number</q-tooltip>
          </span>
          <q-popup-edit
            @update:model-value="(val) => updatePHICNumber(props.row, val)"
            v-model="props.row.phic_number"
            buttons
            label-set="Save"
            label-cancel="Close"
            v-slot="scope"
          >
            <div>Edit HDMF Number</div>
            <div>Name: {{ formatFullname(props.row.employee) }}</div>
            <q-input
              v-model="scope.value"
              :model-value="scope.value"
              @value:model-value="scope.value = $event"
              type="text"
              mask="##-#########-##"
              autofocus
              counter
              @keyup.enter="scope.set"
            >
            </q-input>
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-phic="props">
        <q-td :props="props">
          <span>
            {{ props.row.phic ? formatCurrency(props.row.phic) : " - - - " }}
            <q-tooltip class="bg-blue-grey-8">Edit PHIC</q-tooltip>
          </span>
          <q-popup-edit
            @update:model-value="(val) => updatePHIC(props.row, val)"
            v-model="props.row.phic"
            buttons
            label-save="Save"
            label-cancel="Close"
            v-slot="scope"
          >
            <div class="text-h6 text-center q-mb-xs">Edit PHIC</div>
            <div class="text-subtitle2 q-mb-sm">
              Name: {{ formatFullname(props.row.employee) }}
            </div>
            <q-input
              v-model="scope.value"
              :model-value="formatForEdit(scope.value)"
              @update:model-value="scope.value = $event"
              type="text"
              autofocus
              counter
              @keyup.enter="scope.set"
            >
            </q-input>
          </q-popup-edit>
        </q-td>
      </template>
      <template #loading>
        <q-inner-loading showing>
          <q-spinner-ios size="50px" color="grey-10" />
        </q-inner-loading>
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
  console.log("Updating SSS Number for", data, "to", val);
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
    console.log(error);

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
  console.log("Updating SSS for", data, "to", val);
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
  console.log("Updating HDMF Number for", data, "to", val);
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
  console.log("Updating HDMF for", data, "to", val);
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
  console.log("Updating PHIC Number for", data, "to", val);
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
  console.log("Updating PHIC for", data, "to", val);
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
    console.log("employee benefit", employeeBenefitRows.value);
    pagination.value.page = current_page;
    pagination.value.rowsPerPage = per_page;
    pagination.value.rowsNumber = total;

    console.log("benefit", employeeBenefitRows.value);
  } catch (error) {
    console.log("error fetching", error);
  } finally {
    tableLoading.value = false;
  }
};

const handleRequest = (props) => {
  console.log("handle benefits request", props);

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

.gradient-header {
  background: #155e75;
}
.gradient-loader {
  background: linear-gradient(135deg, #42a5f5, #478ed1, #5c6bc0);
  color: white;
  z-index: 10;
  opacity: 0.85;
}
</style>
