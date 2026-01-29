<template>
  <div>
    <q-input
      v-model="filter"
      class="q-pb-lg q-pl-sm dynamic-width"
      outlined
      placeholder="Search"
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
      style="height: 500px"
      :columns="productsColumn"
      :rows="filteredRows"
      row-key="name"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
    >
      <!-- virtual-scroll -->
      <template v-slot:body-cell-name="props">
        <q-td :props="props" class="cursor-pointer">
          <span>
            {{ capitalizeFirstLetter(props.row.name) || "No data available" }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Name
            </q-tooltip>
          </span>

          <q-popup-edit
            @update:model-value="
              (val) => updateTableData(props.row, val, 'name')
            "
            v-model="props.row.name"
            auto-save
            buttons
            label-set="Save"
            label-cancel="Close"
            title="Edit Name"
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              dense
              autofocus
              counter
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-category="props">
        <q-td key="name" :props="props" class="cursor-pointer">
          <span>
            <q-badge :color="getProductBadgeCategoryColor(props.row.category)">
              {{ props.row.category }}
            </q-badge>
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Name
            </q-tooltip>
          </span>

          <q-popup-edit
            @update:model-value="
              (val) => updateTableData(props.row, val, 'category')
            "
            v-model="props.row.category"
            auto-save
            buttons
            label-set="Save"
            label-cancel="Close"
            title="Edit Position"
            v-slot="scope"
          >
            <q-select
              class="text-capitalize"
              v-model="scope.value"
              :options="['Bread', 'Selecta', 'Softdrinks', 'Others']"
              outlined
              dense
              autofucus
              counter
              behavior="menu"
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <!-- <ProductEdit :edit="props" /> -->
            <ProductDelete :delete="props" />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import ProductEdit from "./ProductEdit.vue";
import ProductDelete from "./ProductDelete.vue";
import { ref, watch, onMounted, computed } from "vue";
import { date } from "quasar";
import { useProductsStore } from "src/stores/product";

import { typographyFormat } from "src/composables/typography/typography-format";
import { badgeColor } from "src/composables/badge-color/badge-color";

const { capitalizeFirstLetter } = typographyFormat();
const { getProductBadgeCategoryColor } = badgeColor();

const pagination = ref({
  rowsPerPage: 0,
});
const productsStore = useProductsStore();
const filter = ref("");
const productsRows = computed(() => productsStore.products);
const isLoading = ref(true);
const loading = ref(true);
const showNoDataMessage = ref(false);

const filteredRows = computed(() => {
  if (!filter.value) {
    return productsRows.value;
  }
  return productsRows.value.filter((row) =>
    row.name.toLowerCase().includes(filter.value.toLowerCase())
  );
});

onMounted(async () => {
  await reloadTableData();
});

const updateTableData = async (data, val, type) => {
  console.log("Updating table data...", data);
  console.log("Updating table val...", val);
  console.log("Updating table type...", type);

  try {
    const updatedData = {
      id: data.id,
      field: type,
      value: val,
    };

    console.log("Updated Data:", updatedData);

    // Optimistic UI update
    data[type] = val;

    // Send to store / backend
    await productsStore.updatedProducts(updatedData);
  } catch (error) {
    console.log("Failed to update table data:", error);
  }
};

const reloadTableData = async () => {
  try {
    loading.value = true;
    await productsStore.fetchProducts();
    if (!productsRows.value.length) {
      showNoDataMessage.value = true;
    }
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

const productsColumn = [
  {
    name: "name",
    label: "Product Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
  },

  {
    name: "category",
    align: "left",
    label: "Category",
    field: "category",
  },

  {
    name: "action",
    align: "center",
    label: "Action",
    field: "action",
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

.table-container {
  max-height: 500px; /* Adjust as needed */
  overflow: hidden;
}

.my-sticky-dynamic {
  height: 410px;
}

.my-sticky-dynamic .q-table__top,
.my-sticky-dynamic .q-table__bottom,
.my-sticky-dynamic thead tr:first-child th {
  background-color: #000000;
}

.my-sticky-dynamic thead tr th {
  position: sticky;
  z-index: 1;
}

.my-sticky-dynamic thead tr:last-child th {
  top: 48px;
}

.my-sticky-dynamic thead tr:first-child th {
  top: 0;
}

.my-sticky-dynamic tbody {
  scroll-margin-top: 48px;
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
