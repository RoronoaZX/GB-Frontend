<template>
  <q-page class="q-my-md">
    <div class="row justify-between q-mb-md" align="right">
      <div class="row q-gutter-md">
        <CashAdvanceButton @created="reloadTableData" />
      </div>
      <SearchCashAdvance v-model="filter" @update:model-value="filter" />
    </div>
    <q-table
      :rows="cashAdvanceRows"
      :columns="cashAdvanceColumns"
      row-key="name"
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 7, 10, 0]"
      :loading="loading"
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
        <q-td :props="props" class="cursor-pointer">
          <span>
            {{
              props.row.amount ? formatCurrency(props.row.amount) : " - - - "
            }}
          </span>
          <q-tooltip class="bg-blue-grey-8">Edit Amount</q-tooltip>
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
      <template v-slot:body-cell-reason="props">
        <q-td :props="props" class="cursor-pointer">
          <span>
            {{ props.row.reason || " - - - " }}
          </span>
          <q-tooltip class="bg-blue-grey-8">Edit Reason</q-tooltip>
          <q-popup-edit
            v-model="props.row.reason"
            @update:model-value="(val) => updateReason(props.row, val)"
            buttons
            label-set="Save"
            label-cancel="Close"
            v-slot="scope"
          >
            <div class="text-h6 text-primary text-center q-mb-xs">
              Edit Reason
            </div>
            <div class="text-subtitle2 q-mb-sm">
              Name: {{ formatFullname(props.row.employee) }}
            </div>
            <q-input
              v-model="scope.value"
              type="text"
              autofocus
              counter
              @keyup.enter="scope.set"
            />
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
    console.log(error);
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
    console.log(error);
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
    console.log("Cash Advance", cashAdvanceRows.value);
    pagination.value.page = current_page;
    pagination.value.rowsPerPage = per_page;
    pagination.value.rowsNumber = total;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
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
</style>
