<template>
  <div class="row justify-between q-mb-md" align="right">
    <div class="row q-gutter-md">
      <AddUniform />
    </div>
    <q-input
      v-model="filter"
      @update:model-value="handleInput"
      outlined
      dense
      flat
      label="Search"
      style="width: 300px"
    >
      <template v-slot:append>
        <div>
          <q-icon v-if="!loading" name="search" />
          <q-spinner v-else size="sm" />
        </div>
      </template>
    </q-input>
  </div>
  <q-table
    class="sticky-header"
    :filter="filter"
    :rows="uniformRows"
    :columns="uniformColumns"
    row-key="name"
    v-model:pagination="pagination"
    hide-bottom
  >
    <template v-slot:body-cell-t_shirt="props">
      <q-td :props="props">
        <q-tooltip
          :offset="[0, 10]"
          :delay="600"
          class="bg-info text-dark text-subtitle1"
          style="width: 200px"
        >
          <div
            class="q-pb-sm text-center text-h6 text-weight-bold text-subtitle2"
          >
            T-Shirt
          </div>
          <q-separator class="q-mb-md" color="yellow" />
          <div class="" v-for="tShirt in props.row.t_shirt" :key="tShirt.size">
            <div class="row justify-between">
              <div>Size :</div>
              <div>
                {{ tShirt.size }}
              </div>
            </div>
            <div class="row justify-between">
              <div>PCS :</div>
              <div>
                {{ tShirt.pcs }}
              </div>
            </div>
            <div class="row justify-between">
              <div>PRICE :</div>
              <div>
                {{ formatCurrency(tShirt.price) }}
              </div>
            </div>
          </div>
        </q-tooltip>
        <q-chip square outline color="red-6" class="text-white">
          {{ props.row.t_shirt.length }} T-Shirt
        </q-chip>
      </q-td>
    </template>
    <template v-slot:body-cell-pants="props">
      <q-td :props="props">
        <q-tooltip
          :offset="[0, 10]"
          :delay="600"
          class="bg-info text-dark text-subtitle1"
          style="width: 200px"
        >
          <div
            class="q-pb-sm text-center text-h6 text-weight-bold text-subtitle2"
          >
            Pants
          </div>
          <q-separator class="q-mb-md" color="yellow" />
          <div class="" v-for="pant in props.row.pants" :key="pant.size">
            <div class="row justify-between">
              <div>Size :</div>
              <div>
                {{ pant.size }}
              </div>
            </div>
            <div class="row justify-between">
              <div>PCS :</div>
              <div>
                {{ pant.pcs }}
              </div>
            </div>
            <div class="row justify-between">
              <div>PRICE :</div>
              <div>
                {{ formatCurrency(pant.price) }}
              </div>
            </div>
          </div>
        </q-tooltip>
        <q-chip square outline color="brown-6" class="text-white">
          {{ props.row.pants.length }} Pants
        </q-chip>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import AddUniform from "./AddUniform.vue";
import { useUniformStore } from "stores/uniform";

const uniformStore = useUniformStore();
const filter = ref("");
const uniformRows = computed(() => uniformStore.uniforms);
const loading = ref(false);
const pagination = ref({
  rowsPerPage: 0,
});

onMounted(async () => {
  await reloadTableData();
});

const reloadTableData = async () => {
  try {
    uniformRows.value = await uniformStore.fetchUniform();
    console.log("uniform", uniformRows.value);
  } catch (error) {
    console.log("error fetching madepakeer", error);
  }
};

let debounceTimeout;
const handleInput = () => {
  loading.value = true; // Start loading when typing
  clearTimeout(debounceTimeout); // Clear previous timeout
  debounceTimeout = setTimeout(() => {
    loading.value = false; // Stop loading after debounce delay
  }, 500); // Adjust debounce delay as needed
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

// Format currency values
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

const uniformColumns = [
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
    name: "number_of_payments",
    required: true,
    label: "Number of Payments",
    align: "center",
    field: "number_of_payments",
  },
  {
    name: "total_amount",
    required: true,
    label: "Total Amount",
    align: "center",
    field: (row) => formatCurrency(row.total_amount),
  },
  {
    name: "payments_per_payroll",
    required: true,
    label: "Payments Per Payroll",
    align: "center",
    field: (row) => formatCurrency(row.payments_per_payroll),
  },
  {
    name: "t_shirt",
    label: "T-Shirt",
    align: "center",
    field: "t_shirt",
  },
  {
    name: "pants",
    label: "Pants",
    align: "center",
    field: "pants",
  },
];
</script>

<style lang="scss" scoped></style>
