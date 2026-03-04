<template>
  <div class="inventory-view-wrapper">
    <q-scroll-observer @scroll="onScroll" />
    <div
      class="sticky-header-container"
      :class="{ 'is-hiddden': !showSearch && lastScroll > 100 }"
    >
      <div
        class="row justify-between items-center q-px-md q-py-sm q-gutter-sm search-row-inner"
      >
        <div class="col-grow">
          <SearchEngine v-model="filter" />
        </div>
      </div>
    </div>

    <div class="spinner-wrapper" v-if="loading">
      <q-spinner-dots size="50px" color="primary" />
    </div>

    <div v-else>
      <div v-if="productionRows.length === 0" class="data-error">
        <q-icon name="warning" color="warning" size="4em" />
        <div class="q-ml-sm text-h6">No data available</div>
      </div>
      <q-table
        v-else
        flat
        :columns="productionColumn"
        :rows="productionRows"
        row-key="name"
        v-model:pagination="pagination"
        :row-per-page-options="[3, 5, 10, 0]"
        @request="handleRequest"
      >
        <template v-slot:body-cell-reports="props">
          <q-td :props="props">
            <div class="row justify-center q-gutter-sm">
              <q-btn
                padding="xs lg"
                rounded
                dense
                size="sm"
                color="light-blue-5"
                text-color="white"
                @click="
                  handleDialog(
                    props.row.AM,
                    'AM',
                    props.rowIndex,
                    props.row.date
                  )
                "
                >AM</q-btn
              >
              <q-btn
                padding="xs lg"
                rounded
                dense
                size="sm"
                color="deep-orange"
                text-color="white"
                @click="
                  handleDialog(
                    props.row.PM,
                    'PM',
                    props.rowIndex,
                    props.row.date
                  )
                "
              >
                PM
              </q-btn>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { typographyFormat } from "src/composables/typography/typography-format";
import { useProductionStore } from "src/stores/production";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import SearchEngine from "../search/SearchEngine.vue";
import ProductionDialog from "../dialog/ProductionDialog.vue";

const { formatDate } = typographyFormat();

const route = useRoute();
const branchId = route.params.branch_id;

const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});

const productionStore = useProductionStore();
const productions = computed(() => productionStore.productions);
const productionRows = ref([]);

const filter = ref();
const loading = ref(false);
const showSearch = ref(true);
const lastScroll = ref(0);
const showNoDateMessage = ref(false);

const onScroll = (info) => {
  const currentScroll = info.position.top;

  if (currentScroll < lastScroll.value || currentScroll < 10) {
    showSearch.value = true;
  } else {
    showSearch.value = false;
  }
  lastScroll.value = currentScroll;
};

onMounted(async () => {
  if (branchId) {
    await reloadTableData(branchId);
  }
});

const reloadTableData = async (
  branchId,
  page = 0,
  rowsPerPage = 5,
  search = ""
) => {
  try {
    loading.value = true;
    const response = await productionStore.fetchBranchProductions(
      branchId,
      page,
      rowsPerPage,
      search
    );

    console.log("Fetch data: ", productions.value);

    const { data, current_page, per_page, total } = productions.value;

    productionRows.value = data;
    console.log("Production rows: ", productionRows.value);

    pagination.value.page = current_page;
    pagination.value.rowsPerPage = per_page;
    pagination.value.rowsNumber = total;

    if (!productionRows.value.length) {
      showNoDateMessage.value = true;
    }
  } catch (error) {
    console.error("Error fetching production data:", error);
    showNoDateMessage.value = true;
  } finally {
    loading.value = false;
  }
};

const handleRequest = (props) => {
  console.log("Request props: ", props);
  reloadTableData(
    branchId,
    props.pagination.page,
    props.pagination.rowsPerPage,
    filter.value
  );
};

watch(filter, (newFilter) => {
  handleRequest({ pagination: pagination.value });
});

watch(filter, async (newFilter) => {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loading.value = false;
  showNoDateMessage.value = productionRows.value.length === 0;
});

const productionColumn = [
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

const handleDialog = (report, label, index, date) => {
  console.log("Report data for dialogss:", report, label, index, date);

  $q.dialog({
    component: ProductionDialog,
    componentProps: {
      reports: report,
      reportsLabel: label,
      rowIndex: index,
      reportDate: date,
    },
  });
};
</script>

<style scoped lang="scss">
.inventory-view-wrapper {
  background: #ffffff;
  min-height: 100vh;
}

.sticky-header-container {
  position: sticky;
  top: 50px;
  z-index: 500;
  background: white;
  transition: transform 0.3s ease-in-out, opacity 0.2s;

  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &.is-hidden {
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
  }
}

.search-row-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.text-slate-500 {
  color: #64748b;
}

.spinner-wrapper {
  display: flex;
  justify-content: center;
  padding: 50px;
}

:deep(.q-field--outlined .q-field__control) {
  border-radius: 12px;
  background: #f8fafc;
}

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
