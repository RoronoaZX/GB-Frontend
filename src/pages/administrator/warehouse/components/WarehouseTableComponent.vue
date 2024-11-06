<template>
  <div>
    <q-input
      v-model="filter"
      class="q-pb-lg q-pl-sm"
      outlined
      placeholder="Search"
      flat
      rounded
      dense
      debounce="100"
      style="width: 500px; max-width: 1500px; min-width: 100px"
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
      :filter="filter"
      :virtual-scroll-sticky-size-start="48"
      flat
      style="height: 400px"
      :columns="warehouseColumns"
      :rows="filteredRows"
      row-key="name"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
    >
      <!-- <template>
        <q-td key="name" :props="props">
          <a @click.prevent="goToBranch(props.row)" class="warehouse-link">
            {{ props.row.name }}
          </a>
        </q-td>
      </template> -->
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          {{ capitalizeFirstLetter(props.row.name) }}
        </q-td>
      </template>
      <template v-slot:body-cell-location="props">
        <q-td :props="props">
          {{ capitalizeFirstLetter(props.row.location) }}
        </q-td>
      </template>
      <template v-slot:body-cell-personIncharge="props">
        <q-td :props="props">
          {{ formatFullname(props.row.employees) }}
        </q-td>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td key="name" :props="props">
          <q-badge outline :color="getBadgeColor(props.row.status)">
            {{ props.row.status }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <WarehouseEditComponent :edit="props" />
            <WarehouseDeleteComponent :delete="props" />
            <WarehouseGotoComponent />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import WarehouseEditComponent from "./WarehouseEditComponent.vue";
import WarehouseDeleteComponent from "./WarehouseDeleteComponent.vue";
import WarehouseGotoComponent from "./WarehouseGotoComponent.vue";
import { ref, onMounted, computed, watch } from "vue";
import { useWarehousesStore } from "src/stores/warehouse";
import { useRouter } from "vue-router";
import { Loading } from "quasar";

const router = useRouter();
const warehouseStore = useWarehousesStore();
const filter = ref("");
const loading = ref(true);
const warehouseRow = computed(() => warehouseStore.warehouses);
const showNoDataMessage = ref(false);
const pagination = ref({
  rowPerPage: 0,
});

const filteredRows = computed(() => {
  if (!filter.value) {
    return warehouseRow.value;
  }
  return warehouseRow.value.filter((row) =>
    row.name.toLowerCase().includes(filter.value.toLowerCase())
  );
});

onMounted(async () => {
  const resaponse = await reloadTableData();
  console.log("respisne warehouse", resaponse);
});

const reloadTableData = async () => {
  try {
    loading.value = true;
    const response = await warehouseStore.fetchWarehouses();
    if (!warehouseRow.value.length) {
      showNoDataMessage.value = true;
    }
    console.log("wawrehouse respo", response);
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

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// const filteredWarehouses = computed(() => {
//   if (!searchQuery.value.trim()) {
//     return warehouseRow.value;
//   }
//   const query = searchQuery.value.toLowerCase();
//   return warehouseRow.value.filter((warehouse) =>
//     Object.values(warehouse).some((value) =>
//       String(value).toLowerCase().includes(query)
//     )
//   );
// });

// watch(searchQuery, () => {
//   loading.value = true;
//   setTimeout(() => {
//     loading.value = false;
//   }, 500); // Simulate a delay for the loading spinner
// });
// const search = async () => {
//   loading.value = true;
//   showNoDataMessage.value = false;
//   try {
//     await warehouseStore.searchWarehouse(searchQuery.value);
//     showNoDataMessage.value = warehouseRow.value.length === 0;
//   } catch (error) {
//     console.error("Error fetching warehouse:", error);
//   } finally {
//     loading.value = false;
//   }
// };

// watch(searchQuery, (newValue) => {
//   if (newValue.trim() !== "") {
//     search();
//   } else {
//     warehouseRow.value = warehouseStore.fetchWarehouses();
//     showNoDataMessage.value = warehouseRow.value.length === 0;
//   }
// });

// onMounted(async () => {
//   try {
//     warehouseRow.value = await warehouseStore.fetchWarehouses();
//     showNoDataMessage.value = warehouseRow.value.length === 0;
//   } catch (error) {
//     console.error("Error fetching warehouse:", error);
//     showNoDataMessage.value = true;
//   } finally {
//     loading.value = false;
//   }
// });

// const filteredWarehouses = computed(() => {
//   if (!searchQuery.value.trim()) {
//     return warehouseRow.value;
//   }
//   const query = searchQuery.value.toLowerCase();
//   return warehouseRow.value.filter((warehouse) =>
//     Object.values(warehouse).some((value) =>
//       String(value).toLowerCase().includes(query)
//     )
//   );
// });
const warehouseColumns = [
  {
    name: "name",
    label: "Name of Warehouse",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "location",
    label: "Location",
    align: "left",
    field: "location",
    sortable: true,
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
    align: "left",
    field: "status",
  },
  {
    name: "action",
    label: "Action",
    align: "center",
    field: "action",
  },
];

const getBadgeColor = (status) => {
  return status === "Open" ? "info" : "accent";
};

const goToWarehouse = async (branch) => {
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
<style scoped>
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
.spinner-wrapper {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.data-error {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.warehouse-link {
  cursor: pointer;
  position: relative;
  color: #ef4444;
  font-weight: bold;
  text-decoration: none; /* No underline by default */
}
.warehouse-link:hover {
  text-decoration: underline; /* Underline on hover */
}
.warehouse-link .tooltip-text {
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

.warehouse-link .tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555555 transparent transparent transparent;
}

.warehouse-link:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
</style>
