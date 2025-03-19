<template>
  <div>
    <q-input
      class="q-pb-lg q-pl-sm dynamic-width"
      v-model="filter"
      outlined
      placeholder="Search"
      debounced="1000"
      flat
      dense
      rounded
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
  <div class="spinner-wrapper" v-if="loading">
    <q-spinner-dots size="50px" color="primary" />
  </div>
  <div v-else>
    <div v-if="filteredRows.length === 0" class="data-error">
      <q-icon name="warning" color="warning" size="4em" />
      <div class="q-ml-sm text-h6">No data available</div>
    </div>
    <q-table
      v-else
      class="table-container elegant-container sticky-header"
      :virtual-scroll-sticky-size-start="48"
      flat
      style="height: 500px"
      :columns="branchesColumns"
      :rows="filteredRows"
      row-key="name"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
    >
      <!-- virtual-scroll -->
      <template v-slot:body-cell-branch_name="props">
        <q-td key="name" :props="props">
          <a @click.prevent="goToBranch(props.row)" class="branch-link">
            {{ capitalizeFirstLetter(props.row.name) }}
            <!-- <span class="tooltip-text">Go to store</span> -->
          </a>
        </q-td>
      </template>
      <template v-slot:body-cell-warehouse="props">
        <q-td :props="props">
          {{ capitalizeFirstLetter(props.row.warehouse?.name) }}
        </q-td>
      </template>
      <template v-slot:body-cell-location="props">
        <q-td :props="props">
          {{ capitalizeFirstLetter(props.row.location) }}
        </q-td>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td key="name" :props="props">
          <q-badge outline :color="getBadgeStatusColor(props.row.status)">
            {{ props.row.status }}
          </q-badge>
        </q-td>
      </template>
      <!-- <template v-slot:body-cell-warehouse="props">
        <q-td :props="props">
          {{ formatFullname(props.row) }}
        </q-td>
      </template> -->
      <template v-slot:body-cell-personIncharge="props">
        <q-td :props="props">
          {{ formatFullname(props.row.employees) }}
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <BranchesEdit :edit="props" />
            <BranchesDelete :delete="props" />
            <!-- <BranchesGoTo :data="props" /> -->
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import BranchesGoTo from "./BranchesGoToComponent.vue";
import BranchesEdit from "./BranchesEditComponent.vue";
import BranchesDelete from "./BranchesDeleteComponent.vue";
import { onMounted, computed, ref, watch } from "vue";
import { useBranchesStore } from "src/stores/branch";
import { useWarehousesStore } from "src/stores/warehouse";
import { useRouter } from "vue-router";
import { Loading } from "quasar";

const router = useRouter();
const branchesStore = useBranchesStore();
const warehousesStore = useWarehousesStore();
const filter = ref("");
const branchesRows = computed(() => branchesStore.branches);
console.log("branchesRow", branchesRows.value);
const loading = ref(true);
const showNoDataMessage = ref(false);
const pagination = ref({
  rowsPerPage: 0,
});

const filteredRows = computed(() => {
  if (!filter.value) {
    return branchesRows.value;
  }
  const filterText = filter.value.toLowerCase();
  return branchesRows.value.filter((row) => {
    const name = row.name ? row.name.toLowerCase() : "";
    const warehouseName = row?.warehouse?.name
      ? row.warehouse.name.toLowerCase()
      : "";
    return name.includes(filterText) || warehouseName.includes(filterText);
  });
});

onMounted(async () => {
  await warehousesStore.fetchWarehouses();
  await reloadTableData();
});

const reloadTableData = async () => {
  loading.value = true;
  try {
    const response = await branchesStore.fetchBranches();
    console.log("branches data", response);
    showNoDataMessage.value = branchesRows.value.length === 0;
  } catch (error) {
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
};

watch(filter, async (newFilter) => {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loading.value = false;
  showNoDataMessage.value = filteredRows.value.length === 0;
});

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`;
};

const branchesColumns = [
  {
    name: "branch_name",
    label: "Name of Branch",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "warehouse",
    label: "Warehouse",
    align: "left",
    field: (row) => (row?.warehouse ? row.warehouse : "No warehouse "),
    sortable: true,
  },
  {
    name: "location",
    label: "Location",
    align: "left",
    field: "location",
  },
  {
    name: "personIncharge",
    label: "Person In-charge",
    align: "left",
    field: (row) => formatFullname(row),
  },
  {
    name: "phone",
    label: "Phone",
    align: "center",
    field: "phone",
  },
  {
    name: "status",
    label: "Status",
    align: "center",
    field: "status",
  },
  {
    name: "action",
    label: "Action",
    align: "center",
    field: "action",
  },
];

const getBadgeStatusColor = (status) => {
  switch (status) {
    case "Open":
      return "info";
    case "Open soon":
      return "warning";
    case "Close":
      return "accent";
    default:
      return "grey";
  }
};

const goToBranch = async (branch) => {
  console.log("brach", branch);
  Loading.show();
  try {
    await router.push({
      name: "BranchDetail",
      params: { branch_id: branch.id },
    });
  } finally {
    Loading.hide();
  }
};
</script>

<style scoped lang="scss">
.elegant-container {
  background: #f7f8fc;
  padding: 1rem;
  border-radius: 8px;
}
.absolute-full {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.table-container {
  max-height: 500px; /* Adjust as needed */
  overflow: hidden;
}
.spinner-wrapper {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.data-error {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.branch-link {
  cursor: pointer;
  position: relative;
  color: #ef4444;
  font-weight: bold;
  text-decoration: none; /* No underline by default */
}
.branch-link:hover {
  text-decoration: underline; /* Underline on hover */
}
.branch-link .tooltip-text {
  visibility: hidden;
  width: 100px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -50px;
  opacity: 0;
  transition: opacity 0.3s;
}

.branch-link .tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555555 transparent transparent transparent;
}

.branch-link:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

.dynamic-width {
  width: 100%; /* default width */
  max-width: 500px;
  min-width: 300px; /* set a minimum width */
}

@media (max-width: 1500px) {
  .dynamic-width {
    max-width: 500px; /* smaller width for medium-sized screens */
  }
}

@media (max-width: 768px) {
  .dynamic-width {
    max-width: 500px; /* smaller width for tablets */
  }
}

@media (max-width: 480px) {
  .dynamic-width {
    max-width: 200px; /* smaller width for mobile screens */
  }
}
</style>
