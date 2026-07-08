<template>
  <q-page class="q-my-md">
    <div class="row justify-between q-mb-md" align="right">
      <div class="row q-gutter-md">
        <CashAdvanceButton @created="reloadTableData" />
      </div>
      <SearchCashAdvance v-model="filter" @update:model-value="filter" />
    </div>
    <!-- Skeletal Loading Table -->
    <div v-if="loading" class="q-pa-sm">
      <q-markup-table flat class="user-card">
        <thead>
          <tr class="gradient-header text-white">
            <th v-for="col in cashAdvanceColumns" :key="col.name" class="text-center">
              <q-skeleton type="text" width="60%" class="q-mx-auto" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 5" :key="n">
            <td v-for="col in cashAdvanceColumns" :key="col.name" class="text-center">
              <q-skeleton type="text" width="50%" class="q-mx-auto" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>

    <q-table
      v-else
      :rows="cashAdvanceRows"
      :columns="cashAdvanceColumns"
      row-key="name"
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 7, 10, 0]"
      :filter="filter"
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
              {{ props.row.amount ? formatCurrency(props.row.amount) : " - - - " }}
            </span>
          </div>
          <q-tooltip class="bg-blue-grey-8">Edit Amount</q-tooltip>
          <q-popup-edit
            @update:model-value="(val) => updateAmount(props.row, val)"
            v-model="props.row.amount"
            v-slot="scope"
            content-class="popup-card"
          >
            <div class="q-pa-md" style="min-width: 280px">
              <div class="popup-title q-mb-sm">
                Edit Cash Advance Amount
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
      <template v-slot:body-cell-reason="props">
        <q-td :props="props" class="cursor-pointer text-center">
          <div class="edit-trigger">
            <q-icon name="edit" size="14px" color="grey-6" class="edit-icon q-mr-xs" />
            <span>
              {{ props.row.reason || " - - - " }}
            </span>
          </div>
          <q-tooltip class="bg-blue-grey-8">Edit Reason</q-tooltip>
          <q-popup-edit
            v-model="props.row.reason"
            @update:model-value="(val) => updateReason(props.row, val)"
            v-slot="scope"
            content-class="popup-card"
          >
            <div class="q-pa-md" style="min-width: 280px">
              <div class="popup-title q-mb-sm">
                Edit Reason
              </div>
              <div class="text-caption text-grey-7 q-mb-md">
                Name: <span class="text-weight-bold text-dark">{{ formatFullname(props.row.employee) }}</span>
              </div>
              <q-input
                v-model="scope.value"
                type="text"
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

      <template v-slot:body-cell-remaining_payments="props">
        <q-td :props="props">
          <div v-if="parseFloat(props.row.remaining_payments) <= 0" class="text-center">
            <span
              class="text-green-8 text-bold q-px-sm q-py-xs rounded-borders"
              style="background-color: #e0ffe0; border: 1px solid #a0f0a0"
            >
              Paid
            </span>
          </div>
          <div v-else class="q-py-xs">
            <div class="row justify-between text-caption text-grey-8 q-mb-2xs">
              <span>Paid: {{ formatCurrency(props.row.amount - props.row.remaining_payments) }}</span>
              <span>Bal: {{ formatCurrency(props.row.remaining_payments) }}</span>
            </div>
            <q-linear-progress
              :value="(props.row.amount - props.row.remaining_payments) / props.row.amount"
              color="teal-8"
              track-color="grey-3"
              class="repayment-progress-bar"
              style="height: 6px; border-radius: 4px;"
            />
            <div class="text-right text-caption text-grey-6 q-mt-2xs">
              {{ Math.round(((props.row.amount - props.row.remaining_payments) / props.row.amount) * 100) }}% complete
            </div>
          </div>
        </q-td>
      </template>


    </q-table>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import CashAdvanceButton from "./CashAdvanceButton.vue";
import { useCashAdvanceStore } from "stores/cash-advance";
import SearchCashAdvance from "./SearchCashAdvance.vue";
import { Notify } from "quasar";

const cashAdvanceStore = useCashAdvanceStore();
const cashAdvance = computed(() => cashAdvanceStore.cashAdvances);
const cashAdvanceRows = ref([]);
const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});

const loading = ref(true);
const filter = ref("");

function formatForEdit(val) {
  if (val === null || val === undefined || val === "") {
    return "";
  }

  const num = parseFloat(val);
  if (isNaN(num)) return "";
  return Number.isInteger(num) ? String(parseInt(num)) : String(num);
}

async function updateAmount(data, val) {
  loading.value = true;
  try {
    await cashAdvanceStore.updateAmount(data, val);
    Notify.create({
      message: "Amount updated successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
  } catch (error) {
    /* console.log(error); */
    Notify.create({
      message: "Failed to update amount",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  } finally {
    loading.value = false;
  }
}

async function updateReason(data, val) {
  loading.value = true;
  try {
    await cashAdvanceStore.updateReason(data, val);
    Notify.create({
      message: "Cash Advance reason updated successfully!",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
  } catch (error) {
    /* console.log(error); */
    Notify.create({
      message: "Cash Advance reasons updated successfully!",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await reloadTableData();
});

const reloadTableData = async (page = 1, rowsPerPage = 7, search = "") => {
  try {
    loading.value = true;
    await cashAdvanceStore.fetchCashAdvance(page, rowsPerPage, search);

    const { data, current_page, per_page, total } = cashAdvance.value;
    cashAdvanceRows.value = data;
    /* console.log("Cash Advance", cashAdvanceRows.value); */
    pagination.value.page = current_page;
    pagination.value.rowsPerPage = per_page;
    pagination.value.rowsNumber = total;
  } catch (error) {
    /* console.log("===================================="); */
    /* console.log(error); */
    /* console.log("===================================="); */
  } finally {
    loading.value = false;
  }
};

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

const handleRequest = (props) => {
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

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(value);
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

const cashAdvanceColumns = [
  {
    name: "date",
    label: "Date Created",
    align: "left",
    field: (row) => formatDate(row.created_at),
  },
  {
    name: "date",
    label: "Date Updated",
    align: "left",
    field: (row) => formatDate(row.updated_at),
  },
  {
    name: "name",
    label: "Employee Name",
    align: "left",
    field: (row) => formatFullname(row.employee),
  },
  {
    name: "amount",
    label: "Total Amount",
    align: "center",
    field: (row) => formatCurrency(row.amount),
  },
  {
    name: "number_of_payments",
    label: "Number of Payments",
    align: "center",
    field: (row) => (row.number_of_payments ? row.number_of_payments : 0),
  },
  {
    name: "payment_per_payroll",
    label: "Payment per Payroll",
    align: "center",
    field: (row) => formatCurrency(row.payment_per_payroll),
  },
  {
    name: "remaining_payments",
    label: "Remaining Payments",
    align: "center",
    field: (row) => formatCurrency(row.remaining_payments),
  },
  {
    name: "reason",
    label: "Reason",
    align: "center",
    field: "reason",
  },
];
</script>

<style lang="scss" scoped>
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
</style>
