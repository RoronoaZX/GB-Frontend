<template>
  <div>
    <q-input
      class="q-pb-lg q-pl-mb"
      outlined
      placeholder="Search"
      debounce="1000"
      flat
      dense
      rounded
      style="width: 450px; max-width: 1500px; min-width: 100px"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>

  <q-table
    class="table-container sticky-header"
    flat
    row-key="id"
    :columns="supplierHistoryColumns"
    :rows="supplierHistoriesData || []"
    :loading="loading"
    v-model:pagination="pagination"
    :rows-per-page-options="[3, 5, 7, 10, 0]"
    :filter="filter"
    @request="onPageRequest"
  >
    <template v-slot:body-cell-number_of_items="props">
      <q-td :props="props">
        <q-btn
          flat
          dense
          color="primary"
          :label="`${props.row.supplier_ingredients.length} ${
            props.row.supplier_ingredients.length === 1 ? 'item' : 'items'
          }`"
          @click="openSupplierIngredients(props.row)"
        />
      </q-td>
    </template>

    <template #loading>
      <q-inner-loading showing>
        <q-spinner-ios size="50px" color="grey-10" />
      </q-inner-loading>
    </template>
  </q-table>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useSupplierHistoryStore } from "src/stores/supplier-history";
import { Notify, useQuasar, date as quasarDate } from "quasar";
import ViewIngredientItems from "./ViewIngredientItems.vue";

const supplierHistoryStore = useSupplierHistoryStore();
const supplierHistories = computed(
  () => supplierHistoryStore.supplierHistories
);
const supplierHistoriesData = ref([]);

const $q = useQuasar();

const loading = ref(false);

const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});

const filter = ref("");

const fetchSupplierHistory = async (page = 0, rowsPerPage = 3, search = "") => {
  console.log("Fetching recipe costs in store...");
  try {
    loading.value = true;
    // ✅ If it's the first load (page just opened), show full spinner
    supplierHistories.value = await supplierHistoryStore.fetchSupplierHistory(
      page,
      rowsPerPage,
      search
    );
    console.log("supplierHistories", supplierHistories.value);

    const { data, current_page, per_page, total } = supplierHistories.value;
    supplierHistoriesData.value = data;
    console.log("supplierHistoriesData.value", supplierHistoriesData.value);
    pagination.value.page = current_page;
    console.log("pagination.value.page", pagination.value.page);
    pagination.value.rowsPerPage = per_page;
    console.log("pagination.value.rowsPerPage", pagination.value.rowsPerPage);
    pagination.value.rowsNumber = total;
    console.log("pagination.value.rowsNumber", pagination.value.rowsNumber);
  } catch (error) {
    console.log("Error fetching recipe costs:", error);
    Notify.create({
      message: "Error fetching recipe costs",
      color: "negative",
      position: "top",
    });
  } finally {
    loading.value = false;
  }
};
onMounted(fetchSupplierHistory);

const onPageRequest = (props) => {
  console.log("props", props);
  fetchSupplierHistory(
    props.pagination.page,
    props.pagination.rowsPerPage,
    props.filter
  );
};

const openSupplierIngredients = (row) => {
  console.log("Editing row:", row);

  $q.dialog({
    component: ViewIngredientItems,
    componentProps: {
      row,
    },
  });
};

const formatTimeStamp = (val) => {
  return quasarDate.formatDate(val, "MMM DD, YYYY || hh:mm A");
};

const supplierHistoryColumns = [
  {
    name: "data",
    required: true,
    label: "Date",
    align: "center",
    field: (row) => (row.created_at ? formatTimeStamp(row.created_at) : "N/A"),
  },
  {
    name: "supplier",
    required: true,
    label: "Supplier",
    align: "center",
    field: (row) => row.supplier_name,
  },
  {
    name: "status",
    required: true,
    label: "Status",
    align: "center",
    field: (row) => row.status,
  },
  {
    name: "number_of_items",
    required: true,
    label: "Items",
    align: "center",
    // field: (row) => {
    //   const count = row.supplier_ingredients.length;
    //   return `${count} ${count === 1 ? "item" : "items"} `;
    // },
  },
];
</script>

<style scoped>
.data-error {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner-wrapper {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-container {
  max-height: 450px; /* Adjust as needed */
  overflow: hidden;
}
</style>
