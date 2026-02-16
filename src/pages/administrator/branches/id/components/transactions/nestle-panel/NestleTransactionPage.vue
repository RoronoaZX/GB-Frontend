<template>
  <div>
    <!-- v-if="allRows.length > 3" -->
    <q-input
      v-model="filter"
      outlined
      dense
      debounce="300"
      placeholder="Search product, staff, destination..."
      class="q-mb-lg"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>

  <div v-if="!loading">
    <q-table
      :rows="rows"
      :columns="productColumns"
      row-key="id"
      flat
      square
      bordered
      v-model:pagination="pagination"
      :loading="loading"
      :rows-per-page-options="[5, 10, 0]"
      :filter="filter"
      @request="handleRequest"
      class="my-sticky-modern-table shadow-1 rounded-borders"
      wrap-cells
      virtual-scroll
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props" class="text-center">
          <q-badge
            :color="getStatusColor(props.value)"
            text-color="white"
            class="q-pa-sm q-px-md text-weight-medium text-uppercase"
            rounded
            :label="props.value"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-procedure="props">
        <q-td :props="props" class="text-center">
          <q-badge
            :color="getProcedureColor(props.value)"
            text-color="white"
            class="q-pa-sm q-px-md text-weight-medium text-uppercase"
            rounded
            :label="props.value"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-product="props">
        <q-td :props="props">
          <div class="text-subtitle1 text-weight-medium text-primary">
            {{ props.value }}
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props" class="text-right">
          <q-btn
            flat
            round
            dense
            color="primary"
            icon="visibility"
            @click="viewDetails(props.row)"
          >
            <q-tooltip anchor="bottom middle"> View Details </q-tooltip>
          </q-btn>
        </q-td>
      </template>

      <template #loading>
        <q-inner-loading showing>
          <q-spinner-ios size="50px" color="grey-10" />
        </q-inner-loading>
      </template>

      <template v-slot:no-data="{ icon, message }">
        <div class="full-width row flex-center text-accent q-gutter-sm q-py-xl">
          <q-icon :name="icon" size="2rem" />
          <span>
            {{ message || "No products found in this category" }}
          </span>
        </div>
      </template>
    </q-table>
  </div>

  <q-inner-loading v-else showing />
</template>

<script setup>
import { useDialogPluginComponent, useQuasar } from "quasar";
import { typographyFormat } from "src/composables/typography/typography-format";
import ViewDetails from "../components/ViewDetails.vue";
import { useBranchProductsStore } from "src/stores/branch-product";
import { useSalesReportsStore } from "src/stores/sales-report";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
});

console.log("props", props.category);

const filter = ref("");

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const maximizedToggle = ref(true);

const { formatDate, formatTime, formatFullname, capitalizeFirstLetter } =
  typographyFormat();

const salesReportsStore = useSalesReportsStore();
const userData = computed(() => salesReportsStore.user);

console.log("userData", userData.value);

const branchId = computed(
  () =>
    userData.value?.device?.reference_id ||
    userData.value?.device?.reference?.id ||
    ""
);

const $q = useQuasar();

const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});

const closeDialog = () => {
  onDialogHide();
};

const branchProductsStore = useBranchProductsStore();
const branchProducts = computed(() => branchProductsStore.branchSendAddedProd);

const rows = ref([]);

const loading = ref(false);

const fetchASBranchProd = async (page = 0, rowsPerPage = 5, search = "") => {
  if (!branchId.value) return;
  loading.value = true;
  try {
    const response = await branchProductsStore.fetchSendAddedBranchProducts(
      props.category,
      branchId.value,
      page,
      rowsPerPage,
      search
    );

    const { data, current_page, per_page, total } = branchProducts.value;

    console.log("branchProducts.value", branchProducts.value);

    console.log("data", data);

    rows.value = data;

    console.log("rows.value", rows.value);
    pagination.value = {
      page: current_page,
      rowsPerPage: per_page,
      rowsNumber: total,
    };
  } catch (err) {
    console.error("Failed to load branch products:", err);
    // → you can show $q.notify here
  } finally {
    loading.value = false;
  }
};

onMounted(fetchASBranchProd);

const handleRequest = (props) => {
  fetchASBranchProd(
    props.pagination.page,
    props.pagination.rowsPerPage,
    props.filter
  );
};

watch(filter, async (newVal) => {
  pagination.value.page = 1;
  await fetchASBranchProd(
    pagination.value.page,
    pagination.value.rowsPerPage,
    newVal
  );
});

const getStatusColor = (status) => {
  const s = (status || "").toLowerCase();
  if (s.includes("pending")) return "orange";
  if (s.includes("confirmed") || s.includes("approved")) return "positive";
  if (s.includes("cancel") || s.includes("reject")) return "negative";
  return "grey-7";
};

const getProcedureColor = (value) => {
  if (!value) return "grey";

  switch (value.toLowerCase()) {
    case "send":
      return "blue-6"; // Outgoing
    case "add":
      return "green-6"; // Incoming
    default:
      return "grey-6";
  }
};

const productColumns = [
  {
    name: "product",
    label: "Product",
    field: (row) => capitalizeFirstLetter(row.product?.name || "N/A"),
    align: "left",
    sortable: true,
  },
  {
    name: "date",
    label: "Date / Time",
    field: (row) =>
      `${formatDate(row.created_at)} ${formatTime(row.created_at)}`,
    align: "left",
    sortable: true,
  },
  {
    name: "employee",
    label: "Staff",
    field: (row) => formatFullname(row.employee),
    align: "left",
    sortable: true,
  },
  {
    name: "procedure",
    label: "Procedure",
    field: (row) => capitalizeFirstLetter(row.action || "N/A"),
    align: "left",
    sortable: true,
  },
  {
    name: "from_branch",
    label: "Source",
    field: (row) => capitalizeFirstLetter(row.from_branch?.name || "—"),
    allign: "left",
    sortable: true,
  },
  {
    name: "to_branch",
    label: "Destination",
    field: (row) => capitalizeFirstLetter(row.to_branch?.name || "—"),
    align: "left",
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    field: (row) => capitalizeFirstLetter(row.status || ""),
    align: "center",
    sortable: true,
  },
  {
    name: "action",
    label: "Actions",
    align: "right",
  },
];

const viewDetails = (row) => {
  console.log("View:", row);

  $q.dialog({
    component: ViewDetails,
    componentProps: {
      productDetails: row,
      category: props.category,
    },
  });
};
</script>

<style lang="scss" scoped>
.my-sticky-modern-table {
  max-height: 65vh;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  thead th {
    background: #f8f9fa !important;
    color: #546e7a;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.78rem;
    letter-spacing: 0.4px;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .q-td {
    padding: 14px 16px !important;
  }

  tr:hover {
    background: #f5faff !important;
    transition: background 0.18s ease;
  }
}

.opacity-85 {
  opacity: 0.85;
}
</style>
