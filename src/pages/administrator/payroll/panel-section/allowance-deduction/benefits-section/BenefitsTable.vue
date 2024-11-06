<template>
  <div class="row justify-between q-mb-md" align="right">
    <div class="row q-gutter-md">
      <div>
        <AddDeduction />
      </div>
    </div>
    <SearchBenefit />
  </div>
  <q-table
    class="sticky-header"
    :rows="employeeBenefitRows"
    :columns="employeeBenefitColumns"
    row-key="name"
    hide-bottom
    v-model:pagination="pagination"
  />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import AddDeduction from "./AddDeduction.vue";
import { useEmployeeBenefitStore } from "stores/benefit";
import SearchBenefit from "./SearchBenefit.vue";

const employeeBenefitStore = useEmployeeBenefitStore();
const employeeBenefitRows = computed(() => employeeBenefitStore.benefits);
const pagination = ref({
  rowsPerPage: 0,
});

onMounted(async () => {
  await reloadTableData();
});

const reloadTableData = async () => {
  try {
    employeeBenefitRows.value =
      await employeeBenefitStore.fetchEmployeeBenefit();
    console.log("benefit", employeeBenefitRows.value);
  } catch (error) {
    console.log("error fetching", error);
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

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(value);
};

const employeeBenefitColumns = [
  {
    name: "date",
    required: true,
    label: "Date",
    align: "left",
    field: (row) => formatDate(row.created_at),
  },
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => formatFullname(row.employee),
  },
  {
    name: "sss",
    label: "Social Security System (SSS)",
    align: "center",
    field: (row) => formatCurrency(row.sss),
  },
  {
    name: "hdmf",
    label: "Pag-IBIG Fund (HDMF)",
    align: "center",
    field: (row) => formatCurrency(row.hdmf),
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
</style>
