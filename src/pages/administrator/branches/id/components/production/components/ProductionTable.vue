<template>
  <div>
    <q-input
      v-model="filter"
      class="q-pb-lg q-pl-md"
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
      class="table-container sticky-header"
      :filter="filter"
      :virtual-scroll-sticky-size-start="48"
      flat
      style="height: 400px"
      :columns="productsColumn"
      :rows="filteredRows"
      row-key="reportDate"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
    >
      <template v-slot:body-cell-reports="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <q-btn
              padding="xs lg"
              rounded
              dense
              size="sm"
              color="light-blue-5"
              text-color="white"
              @click="handleDialog(props.row.AM, 'AM')"
              >AM</q-btn
            >
            <q-btn
              padding="xs lg"
              rounded
              dense
              size="sm"
              color="deep-orange"
              text-color="white"
              @click="handleDialog(props.row.PM, 'PM')"
              >PM</q-btn
            >
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import ProductionReportDialog from "./ProductionReportDialog.vue";
import { ref, watch, onMounted, computed, reactive } from "vue";
import { date, useQuasar } from "quasar";
import { useProductionStore } from "src/stores/production";
import { useRoute } from "vue-router";

const route = useRoute();
const tab = ref("bakerReport");
const branchId = route.params.branch_id;
const dialog = ref(false);
const maximizedToggle = ref(true);
const selectedPeriod = ref("");
const branchName = ref("");

const pagination = ref({
  rowsPerPage: 0,
});
const productionStore = useProductionStore();
const filter = ref("");
const productionRows = computed(() => productionStore.productions);
const isLoading = ref(true);
const loading = ref(true);
const showNoDataMessage = ref(false);

const filteredRows = computed(() => {
  if (!filter.value) {
    return productionRows.value;
  }
  return productionRows.value.filter((row) =>
    row.name.toLowerCase().includes(filter.value.toLowerCase())
  );
});

onMounted(async () => {
  if (branchId) {
    await reloadTableData(branchId);
  }
});

const reloadTableData = async (branchId) => {
  try {
    loading.value = true;
    const response = await productionStore.fetchBranchProductions(branchId);

    console.log("Fetched data:", response); // Log the raw response data
    console.log("Production rows:", productionRows.value); // Log the computed production rows

    if (!productionRows.value.length) {
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
  return date.formatDate(dateString, "MMMM DD, YYYY");
};

const productsColumn = [
  {
    name: "reportDate",
    align: "center",
    label: "Date",
    field: "date",
    format: formatDate,
  },
  {
    name: "reports",
    align: "center",
    label: "Reports",
    field: "reports",
  },
];

const $q = useQuasar();
// const chipOnClick = (report) => {
//   console.log("Selected Report:", report);
//   handleDialog(report);
// };

const handleDialog = (report, label) => {
  $q.dialog({
    component: ProductionReportDialog,
    componentProps: {
      reports: report, // Pass the report data to the dialog component
      reportLabel: label,
    },
  });
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
</style>
