<template>
  <q-page class="q-my-md">
    <div class="row justify-between q-mb-md" align="right">
      <div>
        <AddAllowance @created="reloadTableData" />
      </div>

      <SearchAllowance v-model="filter" @update:model-value="filter" />
    </div>
    <!-- Skeletal Loading Table -->
    <div v-if="tableLoading" class="q-pa-sm">
      <q-markup-table flat class="user-card">
        <thead>
          <tr class="gradient-header text-white">
            <th v-for="col in employeeAllowanceColumns" :key="col.name" class="text-center">
              <q-skeleton type="text" width="60%" class="q-mx-auto" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 5" :key="n">
            <td v-for="col in employeeAllowanceColumns" :key="col.name" class="text-center">
              <q-skeleton type="text" width="50%" class="q-mx-auto" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>

    <q-table
      v-else
      flat
      bordered
      :rows="employeeAllowanceRows"
      :columns="employeeAllowanceColumns"
      row-key="name"
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 7, 10, 0]"
      @request="handleRequest"
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
      <template v-slot:body-cell-amount="props">
        <q-td :props="props" class="cursor-pointer text-center">
          <div class="edit-trigger">
            <q-icon name="edit" size="14px" color="grey-6" class="edit-icon q-mr-xs" />
            <span class="numeric-font text-teal-9 text-weight-bold">
              {{ props.row.amount ? formatCurrency(props.row.amount) : " - - " }}
            </span>
          </div>
          <q-tooltip class="bg-blue-grey-8">Edit Amount</q-tooltip>
          <q-popup-edit
            v-model="props.row.amount"
            @update:model-value="(val) => updateAmount(props.row, val)"
            v-slot="scope"
            content-class="popup-card"
          >
            <div class="q-pa-md" style="min-width: 280px">
              <div class="popup-title q-mb-sm">Edit Allowance Amount</div>

              <div class="text-caption text-grey-7 q-mb-md">
                Name: <span class="text-weight-bold text-dark">{{ formatFullname(props.row.employee) }}</span>
              </div>

              <q-input
                v-model="scope.value"
                type="text"
                outlined
                dense
                autofocus
                prefix="₱"
                class="popup-input"
                :model-value="formatForEdit(scope.value)"
                @update:model-value="scope.value = $event"
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
  /* console.log("updateteAmount", data, val); */
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
    /* console.log("allowance", employeeAllowance.value); */

    const { data, current_page, per_page, total } = employeeAllowance.value;

    employeeAllowanceRows.value = data;
    /* console.log("employeeAllowance", employeeAllowanceRows.value); */
    pagination.value.page = current_page;
    pagination.value.rowsPerPage = per_page;
    pagination.value.rowsNumber = total;
  } catch (error) {
    /* console.log("Error fetching allowance", error); */
  } finally {
    tableLoading.value = false;
  }
};

const handleRequest = (props) => {
  /* console.log("handle request", props); */
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
  background: #155e75;
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

// ============================================================
// DARK MODE — Allowance table & popup overrides
// ============================================================
:global(.body--dark) {
  // Popup card (edit amount popover)
  :deep(.popup-card) {
    background: #0f172a !important;
    border: 1px solid #1e293b !important;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5) !important;
  }

  .popup-title {
    color: #f8fafc !important;
  }

  // Table container
  .q-table__container {
    background: #0f172a !important;
  }

  // Table bottom / pagination
  .q-table__bottom {
    background: #0f172a !important;
    border-color: #1e293b !important;
    color: #94a3b8 !important;
  }
}
</style>
