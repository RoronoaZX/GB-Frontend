<template>
  <div class="row justify-between q-mb-md" align="right">
    <div class="row q-gutter-md">
      <CashAdvanceButton />
    </div>
    <SearchCashAdvance />
  </div>
  <q-table
    :rows="cashAdvanceRows"
    :columns="cashAdvanceColumns"
    class="sticky-header"
    row-key="name"
    v-model:pagination="pagination"
    hide-bottom
  >
  </q-table>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import CashAdvanceButton from "./CashAdvanceButton.vue";
import { useCashAdvanceStore } from "stores/cash-advance";
import SearchCashAdvance from "./SearchCashAdvance.vue";

const cashAdvanceStore = useCashAdvanceStore();
const cashAdvanceRows = computed(() => cashAdvanceStore.cashAdvances);
const pagination = ref({
  rowsPerPage: 0,
});

onMounted(async () => {
  await reloadTableData();
});

const reloadTableData = async () => {
  try {
    cashAdvanceRows.value = await cashAdvanceStore.fetchCashAdvance();
    console.log("CA", cashAdvanceRows.value);
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
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
    label: "Date",
    align: "left",
    field: (row) => formatDate(row.created_at),
  },
  {
    name: "name",
    label: "Employee Name",
    align: "left",
    field: (row) => formatFullname(row.employee),
  },
  {
    name: "amount",
    label: "Amount",
    align: "center",
    field: (row) => formatCurrency(row.amount),
  },
  {
    name: "amount",
    label: "Amount",
    align: "center",
    field: "reason",
  },
];
</script>

<style lang="scss" scoped></style>
