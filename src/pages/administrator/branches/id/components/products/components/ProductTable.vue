<template>
  <div class="row justify-between">
    <div>
      <q-input
        class="q-pb-lg q-pl-md"
        v-model="filter"
        outlined
        placeholder="Search"
        debounce="1000"
        style="width: 450px; max-width: 1500px; min-width: 100px"
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
      <ProductCreate />
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
      :columns="productListColumns"
      :rows="filteredRows"
      row-key="name"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
      style="height: 350px"
    >
      <template v-slot:body-cell-name="props">
        <q-td key="name" :props="props">
          {{
            props.row.product?.name
              ? capitalizeFirstLetter(props.row.product.name)
              : "No data available"
          }}
        </q-td>
      </template>

      <template v-slot:body-cell-category="props">
        <q-td key="name" :props="props">
          <q-badge
            v-if="props.row.category"
            :color="getBadgeCategoryColor(props.row.category)"
          >
            {{ props.row.category }}
          </q-badge>
          <span v-else>No data available</span>
        </q-td>
      </template>
      <template v-slot:body-cell-price="props">
        <q-td :props="props" class="cursor-pointer">
          <span
            >{{ formatPrice(props.row.price) }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]"
              >Edit Price</q-tooltip
            >
          </span>
          <q-popup-edit
            @update:model-value="(val) => updatedPrice(props.row, val)"
            v-model="props.row.price"
            auto-save
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              dense
              mask="#####"
              autofocus
              counter
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-beginnings="props">
        <q-td auto-width class="cursor-pointer text-center">
          <span>
            {{ props.row.beginnings ? props.row.beginnings : "Set Beginnings" }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]"
              >Edit beginnings</q-tooltip
            >
          </span>
          <q-popup-edit
            @update:model-value="(val) => updatedBeginnings(props.row, val)"
            v-model="props.row.beginnings"
            auto-save
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              dense
              autofocus
              counter
              mask="#####"
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-total_quantity="props">
        <q-td auto-width class="cursor-pointer text-center">
          <span>
            {{
              props.row.total_quantity
                ? props.row.total_quantity
                : "Set Quantity"
            }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]"
              >Edit quantity</q-tooltip
            >
          </span>
          <q-popup-edit
            @update:model-value="(val) => updatedTotalQuantity(props.row, val)"
            v-model="props.row.total_quantity"
            auto-save
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              dense
              autofocus
              counter
              mask="#####"
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td class="q-gutter-x-md" :props="props">
          <!-- <ProductEdit /> -->
          <ProductDelete :delete="props" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import ProductEdit from "./ProductEdit.vue";
import ProductCreate from "./ProductCreate.vue";
import ProductDelete from "./ProductDelete.vue";
import { api } from "src/boot/axios";
import { useBranchProductsStore } from "src/stores/branch-product";
import { Notify } from "quasar";
import { useRoute } from "vue-router";

const route = useRoute();

const branchId = route.params.branch_id;
const branchProductStore = useBranchProductsStore();
const filter = ref("");
const loading = ref(true);
const branchProducts = ref([]);
const showNoDataMessage = ref(false);
const pagination = ref({
  rowsPerPage: 0,
});
const branchProductRows = computed(() => branchProductStore.branchProducts);
console.log("branchssdfrer", branchProductRows.value);

const filteredRows = computed(() => {
  if (!filter.value) {
    return branchProductRows.value;
  }
  return branchProductRows.value.filter((row) =>
    row.name.toLowerCase().includes(filter.value.toLowerCase())
  );
});

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

onMounted(async () => {
  // console.log("props.branchId in onMounted:", branchId);
  if (branchId) {
    await reloadTableData(branchId);
  }
});

const reloadTableData = async (branchId) => {
  // console.log("Fetching products for branch ID:", branchId);
  try {
    loading.value = true;
    const response = await branchProductStore.fetchBranchProducts(branchId);
    branchProductRows.value = response;
    if (!branchProductRows.value.length) {
      showNoDataMessage.value = true;
    }
    console.log("Branch product", branchProductRows.value);
  } catch (error) {
    console.log("Error fetching branch product:", error);
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

async function updatedPrice(data, val) {
  try {
    const response = await api.put("/api/update-branch-products/" + data.id, {
      price: parseInt(val),
    });
    if (response.status === 200) {
      const i = branchProducts.value.findIndex((item) => item.id == data.id);
      branchProducts.value[i] = parseInt(val);

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
async function updatedBeginnings(data, val) {
  try {
    const response = await api.put(
      "/api/update-branch-products-beginnings/" + data.id,
      {
        beginnings: parseInt(val),
      }
    );
    if (response.status === 200) {
      const i = branchProducts.value.findIndex((item) => item.id == data.id);
      branchProducts.value[i] = parseInt(val);

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

async function updatedTotalQuantity(data, val) {
  try {
    const response = await api.put(
      "/api/update-branch-products-total-quantity/" + data.id,
      {
        total_quantity: parseInt(val),
      }
    );
    if (response.status === 200) {
      const i = branchProducts.value.findIndex((item) => item.id == data.id);
      branchProducts.value[i] = parseInt(val);

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

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

const productListColumns = [
  {
    name: "name",
    label: "Product Name",
    align: "center",
    field: (row) => row.product.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "category",
    align: "center",
    label: "Category",
    field: "category",
    sortable: true,
  },
  {
    name: "price",
    align: "center",
    label: "Price",
    field: (val) => formatPrice(val),
    sortable: true,
  },
  {
    name: "beginnings",
    align: "center",
    label: "Beginnings",
    field: "beginnings",
    format: (val) => `${val} pcs`,
    sortable: true,
  },
  {
    name: "total_quantity",
    align: "center",
    label: "Quantity",
    field: "total_quantity",
    format: (val) => `${val} pcs`,
    sortable: true,
  },
  {
    name: "action",
    align: "center",
    label: "Action",
    field: "action",
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
