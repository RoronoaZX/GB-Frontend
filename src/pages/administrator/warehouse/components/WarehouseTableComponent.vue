<template>
    <div class="q-px-sm">
    <div class="row items-center q-mb-lg">
      <q-input
        v-model="filter"
        class="search-input"
        outlined
        dense
        placeholder="Search"
        rounded
        bg-color="white"
        debounce="100"
      >
        <template v-slot:append>
          <q-icon name="search" size="sm" color="grey-7" />
        </template>
      </q-input>
    </div>

    <div class="spinner-wrapper" v-if="loading">
      <q-spinner-dots size="50px" color="primary" />
    </div>

    <div v-else>
      <div v-if="filteredRows.length === 0" class="data-error column items-center">
        <q-icon name="inventory" color="grey-4" size="6em" />
        <div class="text-h6 text-grey-6 q-mt-sm">No warehouses found</div>
      </div>

      <q-table
        v-else
        class="warehouse-table shadow-1"
        :filter="filter"
        flat
        bordered
        :columns="warehouseColumns"
        :rows="filteredRows"
        row-key="id"
        v-model:pagination="pagination"
        :rows-per-page-options="[10, 20, 50, 0]"
      >
        <!-- Header Customization -->
        <template v-slot:header="props">
          <q-tr :props="props" class="gradient-header text-white">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="text-weight-bold"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <!-- Body Customization -->
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <div class="row items-center no-wrap">
              <q-avatar size="sm" color="primary" text-color="white" class="q-mr-sm">
                {{ props.row.name.charAt(0).toUpperCase() }}
              </q-avatar>
              <a @click.prevent="goToWarehouse(props.row)" class="warehouse-link text-weight-bold">
                {{ capitalizeFirstLetter(props.row.name) }}
              </a>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-location="props">
          <q-td :props="props">
            <div class="row items-center text-grey-8">
              <q-icon name="place" color="red-5" size="xs" class="q-mr-xs" />
              {{ capitalizeFirstLetter(props.row.location) }}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-personIncharge="props">
          <q-td :props="props">
            <div class="row items-center">
              <q-icon name="account_circle" color="blue-grey-4" size="xs" class="q-mr-xs" />
              {{ formatFullname(props.row.employees) }}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-phone="props">
          <q-td :props="props">
            <div class="row items-center justify-center text-grey-7">
              <q-icon name="phone" size="14px" class="q-mr-xs" />
              {{ props.row.phone || 'N/A' }}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge
              rounded
              padding="xs md"
              class="text-weight-bold"
              :color="getWarehouseStatusBadgeColor(props.row.status)"
            >
              {{ props.row.status.toUpperCase() }}
            </q-badge>
          </q-td>
        </template>

        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="row justify-center q-gutter-sm">
              <WarehouseEditComponent :edit="props" />
              <WarehouseDeleteComponent :delete="props" />
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup>
import WarehouseEditComponent from "./WarehouseEditComponent.vue";
import WarehouseDeleteComponent from "./WarehouseDeleteComponent.vue";
import { ref, onMounted, computed, watch } from "vue";
import { useWarehousesStore } from "src/stores/warehouse";
import { useRouter } from "vue-router";
import { Loading } from "quasar";
import { typographyFormat } from "src/composables/typography/typography-format";
import { badgeColor } from "src/composables/badge-color/badge-color";

const { capitalizeFirstLetter, formatFullname } = typographyFormat();
const { getWarehouseStatusBadgeColor } = badgeColor();

const router = useRouter();
const warehouseStore = useWarehousesStore();
const filter = ref("");
const loading = ref(true);
const warehouseRow = computed(() => warehouseStore.warehouses);
const showNoDataMessage = ref(false);
const pagination = ref({
  rowsPerPage: 10,
});

const filteredRows = computed(() => {
  if (!filter.value) {
    return warehouseRow.value;
  }
  const needle = filter.value.toLowerCase();
  return warehouseRow.value.filter((row) =>
    row.name.toLowerCase().includes(needle) ||
    row.location.toLowerCase().includes(needle)
  );
});

onMounted(async () => {
  await reloadTableData();
});

const reloadTableData = async () => {
  try {
    loading.value = true;
    await warehouseStore.fetchWarehouses();
    if (!warehouseRow.value.length) {
      showNoDataMessage.value = true;
    }
  } catch (error) {
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
};

const warehouseColumns = [
  {
    name: "name",
    label: "Name of Warehouse",
    align: "left",
    field: (row) => row.name,
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

const goToWarehouse = async (warehouse) => {
  Loading.show({
    message: `Opening ${warehouse.name}...`,
    spinnerColor: "white",
  });
  try {
    await router.push({
      name: "WarehouseDetail",
      params: {
        warehouse_id: warehouse.id,
        warehouse_name: warehouse.name || "Unknown Warehouse",
      },
    });
  } finally {
    Loading.hide();
  }
};
</script>

<style scoped>
.warehouse-table {
  border-radius: 12px;
  overflow: hidden;
}

.gradient-header {
  background: linear-gradient(135deg, #155e75, #1e293b);
}

.warehouse-link {
  cursor: pointer;
  color: #155e75;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: #0e7490;
    text-decoration: underline;
  }
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.search-input {
  width: 100%;
  max-width: 500px;
}

:deep(.q-field--outlined .q-field__control) {
  border-radius: 28px;
  background: white;
}

:deep(.q-field--outlined .q-field__control:before) {
  border: 1px solid #333 !important;
  opacity: 1 !important;
}

:deep(.q-table__card) {
  border-radius: 12px;
}

:deep(.q-table tbody tr:hover) {
  background-color: #f8fafc !important;
}
</style>
