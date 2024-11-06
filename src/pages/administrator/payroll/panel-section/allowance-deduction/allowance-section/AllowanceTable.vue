<template>
  <div class="row justify-between q-mb-md" align="right">
    <div>
      <AddAllowance />
    </div>
    <SearchAllowance />
  </div>
  <q-table
    class="sticky-header"
    :rows="employeeAllowanceRows"
    :columns="employeeAllowanceColumns"
    row-key="name"
    v-model:pagination="pagination"
    hide-bottom
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn color="positive" icon="edit" size="sm" flat round dense>
          <q-tooltip class="bg-positive" :delay="200">Edit</q-tooltip>
        </q-btn>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useEmployeeAllowance } from "stores/allowance";
import AddAllowance from "./AddAllowance.vue";
import SearchAllowance from "./SearchAllowance.vue";

const employeeAllowanceStore = useEmployeeAllowance();
const employeeAllowanceRows = computed(() => employeeAllowanceStore.allowances);

const pagination = ref({
  rowsPerPage: 0,
});

onMounted(async () => {
  await reloadTableData();
});

const reloadTableData = async () => {
  try {
    employeeAllowanceRows.value =
      await employeeAllowanceStore.fetchEmployeeAllowance();
    console.log("allowance", employeeAllowanceRows.value);
  } catch (error) {
    console.log("Error fetching allowance", error);
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
    name: "date",
    required: true,
    label: "Date",
    align: "center",
    field: (row) => formatDate(row.created_at),
  },
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
  {
    name: "actions",
    required: true,
    label: "Actions",
    align: "center",
    field: "actions",
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
</style>
