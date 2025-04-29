<template>
  <div class="q-pa-md">
    <q-table
      v-model:pagination="pagination"
      color="secondary"
      :loading="loading"
      :rows="productionRows"
      :columns="productsColumn"
      row-key="name"
      :rows-per-page-options="[3, 5, 7, 0]"
      @request="handleRequest"
    >
      <template #loading>
        <q-inner-loading showing color="primary"> </q-inner-loading>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { api } from "src/boot/axios";
import { date, useQuasar } from "quasar";
import { useRoute } from "vue-router";

const productionRows = ref([]);
const route = useRoute();
const tab = ref("bakerReport");
const branchId = route.params.branch_id;
const productions = ref([]);
const loading = ref(false);
const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});

const fetchBranchProductions = async (branchId, page = 0, rowsPerPage = 5) => {
  try {
    loading.value = true;
    const response = await api.get(
      `/api/branches/${branchId}/production-report`,
      {
        params: { page: page, per_page: rowsPerPage },
      }
    );

    const { data, current_page, per_page, total } = response.data;

    productionRows.value = data;

    pagination.value.page = current_page;
    pagination.value.rowsPerPage = per_page;
    pagination.value.rowsNumber = total;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

fetchBranchProductions(branchId);

const handleRequest = (props) => {
  fetchBranchProductions(branchId, props.pagination.page);
};

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
