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
        <q-td key="name" :props="props">
          {{ capitalizeFirstLetter(props.row.name) }}
        </q-td>
      </template>
      <template v-slot:body-cell-category="props">
        <q-td key="name" :props="props">
          <q-badge :color="getBadgeCategoryColor(props.row.category)">
            {{ props.row.category }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <ProductEdit :edit="props" />
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

const pagination = ref({
  rowsPerPage: 0,
});
const productsStore = useProductsStore();
const filter = ref("");
const productsRows = computed(() => productsStore.products);
const isLoading = ref(true);
const loading = ref(true);
const showNoDataMessage = ref(false);

// const searchQuery = ref("");

// const search = async () => {
//   loading.value = true;
//   showNoDataMessage.value = false;

//   try {
//     await productsStore.searchProducts(searchQuery.value);
//     showNoDataMessage.value = productsRows.value.length === 0;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   } finally {
//     loading.value = false;
//   }
// };

// watch(searchQuery, (newValue) => {
//   if (newValue.trim() !== "") {
//     search();
//   } else {
//     productsRows.value = productsStore.fetchProducts();
//     showNoDataMessage.value = productsRows.value.length === 0;
//   }
// });

// onMounted(async () => {
//   try {
//     productsRows.value = await productsStore.fetchProducts();
//     if (!productsRows.value.length) {
//       showNoDataMessage.value = true;
//     }
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     showNoDataMessage.value = true;
//   } finally {
//     loading.value = false;
//   }
// });
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

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
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

const formatDate = (dateString) => {
  return date.formatDate(dateString, "MMMM D, YYYY");
};

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
  // {
  //   name: "createdAt",
  //   align: "center",
  //   label: "Created At",
  //   field: "createdAt",
  //   format: (val) => formatDate(val),
  // },
  {
    name: "action",
    align: "center",
    label: "Action",
    field: "action",
  },
];

const getBadgeCategoryColor = (category) => {
  switch (category) {
    case "Bread":
      return "brown";
    case "Selecta":
      return "red-6";
    case "Softdrinks":
      return "accent";
    default:
      return "grey";
  }
};
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
