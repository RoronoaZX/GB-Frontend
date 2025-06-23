<template>
  <div class="row justify-between q-mb-md" align="right">
    <div>
      <AddAllowance @created="reloadTableData" />
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
    flat
    bordered
    :rows="employeeAllowanceRows"
    :columns="employeeAllowanceColumns"
    row-key="name"
    v-model:pagination="pagination"
    :rows-per-page-options="[5, 7, 10, 0]"
    @request="handleRequest"
    :loading="tableLoading"
  >
    <template v-slot:header="props">
      <q-tr :props="props" class="gradient-header text-white text-weight-bold">
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
    <template v-slot:body-cell-amount="props">
      <q-td :props="props" class="cursor-pointer">
        <span>
          {{ props.row.amount ? formatCurrency(props.row.amount) : " - - " }}
          <q-tooltip class="bg-blue-grey-8">Edit Amount</q-tooltip>
        </span>
        <q-popup-edit
          @update:model-value="(val) => updateAmount(props.row, val)"
          v-model="props.row.amount"
          buttons
          label-set="Save"
          label-cancel="Close"
          v-slot="scope"
        >
          <div class="text-h6 text-primary text-center q-mb-xs">
            Edit Amount
          </div>

          <!-- Show name inside the popup -->
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
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn color="positive" icon="edit" size="sm" flat round dense>
          <q-tooltip class="bg-positive" :delay="200">Edit</q-tooltip>
        </q-btn>
      </q-td>
    </template>
    <template #loading>
      <q-inner-loading showing>
        <q-spinner-ios size="50px" color="grey-10" />
      </q-inner-loading>
    </template>
  </q-table>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useEmployeeAllowance } from "stores/allowance";
import AddAllowance from "./AddAllowance.vue";
import SearchAllowance from "./SearchAllowance.vue";
import { Notify } from "quasar";

const employeeAllowanceStore = useEmployeeAllowance();
const employeeAllowance = computed(() => employeeAllowanceStore.allowances);

const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});

const employeeAllowanceRows = ref([]);
const tableLoading = ref(false);
const searchLoading = ref(false);
const filter = ref("");
const loading = ref(false);

function formatForEdit(val) {
  if (val === null || val === undefined || val === "") {
    return "";
  }
  const num = parseFloat(val);
  if (isNaN(num)) return "";
  return Number.isInteger(num) ? String(parseInt(num)) : String(num);
}

async function updateAmount(data, val) {
  console.log("updateteAmount", data, val);
  tableLoading.value = true;
  try {
    await employeeAllowanceStore.updateAmount(data, val);

    Notify.create({
      message: "Amount updated successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
  } catch (error) {
    console.error("Error updating amount:", error);
    Notify.create({
      message: "Failed to update amount",
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
    await employeeAllowanceStore.fetchEmployeeAllowance(
      page,
      rowsPerPage,
      search
    );
    console.log("allowance", employeeAllowance.value);

    const { data, current_page, per_page, total } = employeeAllowance.value;

    employeeAllowanceRows.value = data;
    console.log("employeeAllowance", employeeAllowanceRows.value);
    pagination.value.page = current_page;
    pagination.value.rowsPerPage = per_page;
    pagination.value.rowsNumber = total;
  } catch (error) {
    console.log("Error fetching allowance", error);
  } finally {
    tableLoading.value = false;
  }
};

const handleRequest = (props) => {
  console.log("handle request", props);
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

// Format currency values
const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(value);
};

const employeeAllowanceColumns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "center",
    field: (row) => formatFullname(row.employee),
  },
  {
    name: "amount",
    required: true,
    label: "Amount",
    align: "center",
    field: (row) => formatCurrency(row.amount),
  },
];
</script>

<style lang="scss" scoped>
.q-btn {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.q-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.gradient-header {
  // background: linear-gradient(135deg, #8e2de2, #f27121);
  // background: linear-gradient(135deg, #11998e, #38ef7d);
  // background: linear-gradient(135deg, #ff7e5f, #feb47b);
  // background: linear-gradient(
  //   135deg,
  //   #2a2a72,
  //   #009efd
  // ); /* You can change colors */
  background: linear-gradient(135deg, #444444, #111111);
  // background: linear-gradient(135deg, #555555, #2f2f2f);
  // background: linear-gradient(135deg, #3c3c3c, #1e1e1e);
  // background: linear-gradient(135deg, #4e4e4e, #2b2b2b);
  // background: linear-gradient(135deg, #3d3d3d, #232323);
  // background: linear-gradient(135deg, #5a5a5a, #363636);
  // background: linear-gradient(135deg, #606060, #404040);
  // background: linear-gradient(135deg, #585858, #1f1f1f);
  // background: linear-gradient(135deg, #494949, #2a2a2a);
  // background: linear-gradient(135deg, #666666, #333333);
}
</style>
