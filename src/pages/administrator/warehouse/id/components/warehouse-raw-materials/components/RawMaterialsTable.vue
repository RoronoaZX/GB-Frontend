<template>
  <div class="row justify-between">
    <div>
      <q-input
        class="q-pb-lg q-pl-md"
        v-model="filter"
        outlined
        placeholder="Search"
        debounce="1000"
        style="width: 450px; max-width: 5000px; min-width: 100px"
        flat
        dense
        rounded
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div class="q-my-sm">
      <RawMaterialsCreate />
    </div>
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
      class="table-container sticky-header"
      :filter="filter"
      :virtual-scroll-sticky-size-start="48"
      flat
      :columns="rawMaterialsColumns"
      :rows="filteredRows"
      row-key="name"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
      style="height: 340px"
    >
      <template v-slot:body-cell-total_quantity="props">
        <q-td :props="props">
          <q-badge
            square
            class="text-white cursor-pointer"
            :class="getRawMaterialBadgeColor(props.row)"
          >
            {{ formatTotalQuantity(props.row) }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              <div class="text-white">Edit Available Stocks</div>
            </q-tooltip>

            <q-popup-edit
              @update:model-value="(val) => updatedStocks(props.row, val)"
              v-model="props.row.total_quantity"
              auto-save
              v-slot="scope"
            >
              <q-input
                v-model="scope.value"
                dense
                :suffix="props.row.raw_materials.unit"
                mask="########"
                autofocus
                counter
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <RawMaterialsTableDelete :delete="props" />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import RawMaterialsCreate from "./RawMaterialsCreate.vue";
import RawMaterialsTableDelete from "./RawMaterialsTableDelete.vue";
import { useRoute } from "vue-router";
import { useWarehouseRawMaterialsStore } from "src/stores/warehouse-rawMaterials";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

const route = useRoute();
const warehouseId = route.params.warehouse_id;
const warehouseRawMaterialsStore = useWarehouseRawMaterialsStore();
const filter = ref("");
const loading = ref(true);
const warehouseRawMaterials = ref([]);
const showNoDataMessage = ref(false);
const pagination = ref({
  rowsPerPage: 0,
});
const warehouseRawMaterialsRows = computed(
  () => warehouseRawMaterialsStore.warehouseRawMaterials
);

const filteredRows = computed(() => {
  if (!filter.value) {
    return warehouseRawMaterialsRows.value;
  }
  return warehouseRawMaterialsRows.value.filter((row) =>
    row.name.toLowerCase().includes(filter.value.toLowerCase())
  );
});

onMounted(async () => {
  console.log("props.warehouseId in onMounted:", warehouseId);
  if (warehouseId) {
    await reloadTableData(warehouseId);
  }
});

const reloadTableData = async (warehouseId) => {
  // console.log("Fetching products for branch ID:", warehouseId);
  try {
    loading.value = true;
    const response =
      await warehouseRawMaterialsStore.fetchWarehouseRawMaterials(warehouseId);
    warehouseRawMaterialsRows.value = response;
    if (!warehouseRawMaterialsRows.value.length) {
      showNoDataMessage.value = true;
    }
    console.log("Warehouse Raw Materials", warehouseRawMaterialsRows.value);
  } catch (error) {
    console.log("Error fetching branch product:", error);
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
};

async function updatedStocks(data, val) {
  try {
    const response = await api.put(
      "/api/update-warehouse-rawMaterials/" + data.id,
      {
        total_quantity: parseInt(val),
      }
    );
    if (response.status === 200) {
      const i = warehouseRawMaterials.value.findIndex(
        (item) => item.id == data.id
      );
      warehouseRawMaterials.value[i] = parseInt(val);

      Notify.create({
        type: "positive",
        message: response.data.message,
        timout: 1000,
        position: "top",
      });
    }
  } catch (error) {
    console.error("Error updating price:", error);
  }
}

watch(filter, async (newFilter) => {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loading.value = false;
  showNoDataMessage.value = filteredRows.value.length === 0;
});

const getRawMaterialBadgeColor = (row) => {
  const totalQuantity = row.total_quantity;
  const unit = row.raw_materials.unit;
  console.log("unit test", unit);
  if (unit === "Grams" && totalQuantity < 1000) {
    return "bg-red";
  }

  let stockValue;
  if (totalQuantity >= 1000) {
    stockValue = totalQuantity / 1000;
  } else {
    stockValue = totalQuantity;
  }

  if (stockValue < 5) {
    if (stockValue <= 2) {
      return "bg-red";
    } else if (stockValue <= 3) {
      return "bg-warning";
    } else {
      return "bg-warning";
    }
  } else {
    return "bg-positive";
  }
};

const formatTotalQuantity = (row) => {
  const totalQuantity = row.total_quantity;
  const unit = row.raw_materials.unit;

  if (totalQuantity > 1000) {
    const totalQuantityKilo = (totalQuantity / 1000).toFixed(2);
    if (totalQuantityKilo.endsWith(".00")) {
      return `${Math.round(totalQuantity / 1000)} kilos`;
    } else {
      return `${totalQuantityKilo} kilos`;
    }
  } else if (totalQuantity > 1) {
    return `${totalQuantity} ${unit}`;
  } else {
    return `${totalQuantity} ${unit}`;
  }
};
const rawMaterialsColumns = [
  {
    name: "code",
    label: "Raw Materials Code",
    align: "center",
    field: (row) => row?.raw_materials?.code ?? "No Code",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "name",
    label: "Raw Materials Name",
    align: "center",
    field: (row) => row?.raw_materials?.name ?? "No Code",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "total_quantity",
    label: "Available Stocks",
    align: "center",
    field: "total_quantity",
    sortable: true,
  },
  {
    name: "action",
    label: "Action",
    align: "center",
    sortable: true,
  },
];
</script>

<style scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 2rem;
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
.table-container {
  max-height: 400px; /* Adjust as needed */
  overflow: hidden;
}

.q-table-container {
  overflow: hidden !important; /* Target the container generated by q-table */
}
</style>
