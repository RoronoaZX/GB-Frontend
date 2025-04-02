<template>
  <div>
    <q-input
      v-model="filter"
      class="q-pb-lg q-pl-sm dynamic-width"
      outlined
      placeholder="search"
      flat
      rounded
      dense
      debounce="100"
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
      :columns="deviceColumns"
      :rows="deviceRow"
      row-key="name"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
    >
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <DeviceEdit :edit="props" @device-updated="reloadTableData" />
            <DeviceDelete :delete="props" @device-deleted="reloadTableData" />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import DeviceDelete from "./DeviceDelete.vue";
import DeviceEdit from "./DeviceEdit.vue";
import { useDeviceStore } from "src/stores/device";
import { computed, onMounted, ref, watch } from "vue";

const deviceStore = useDeviceStore();
const filter = ref("");
const loading = ref(true);
const deviceRow = computed(() => deviceStore.devices);
const showNoDataMessage = ref(false);
const pagination = ref({
  rowPerPage: 0,
});

const filteredRows = computed(() => {
  if (!filter.value) {
    return deviceRow.value;
  }
  return deviceRow.value.filter((row) => {
    const name = row.name || ""; // Default to an empty string if row.name is null or undefined
    return name.toLowerCase().includes(filter.value.toLowerCase());
  });
});

onMounted(async () => {
  const response = await reloadTableData();
  console.log("response device", response);
});

const reloadTableData = async () => {
  try {
    loading.value = true;
    const response = await deviceStore.fetchDevices();
    if (!deviceRow.value.length) {
      showNoDataMessage.value = true;
    }
    console.log("device fetch:", deviceRow.value);
  } catch (error) {
    console.log("error fetching device", error);
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

const deviceColumns = [
  {
    name: "name",
    label: "Name",
    align: "center",
    field: "name",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "model",
    label: "Model",
    align: "center",
    field: "model",
  },
  {
    name: "os_version",
    label: "OS Version",
    align: "center",
    field: "os_version",
  },
  {
    name: "uuid",
    label: "UUID",
    align: "center",
    field: "uuid",
  },
  {
    name: "designation",
    label: "Designation",
    align: "center",
    field: (row) =>
      row.branch ? row.branch.name : row.warehouse ? row.warehouse.name : "N/A",
  },
  {
    name: "action",
    label: "Action",
    align: "center",
    field: "action",
  },
];
</script>

<style lang="scss" scoped>
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
