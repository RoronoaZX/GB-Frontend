<template>
  <div class="row items-center q-mb-md">
    <q-input
      v-model="filter"
      class="search-input"
      outlined
      dense
      placeholder="Search transactions..."
      rounded
      bg-color="white"
      debounce="300"
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
    <div v-if="branchPremixDatas.length === 0" class="data-error">
      <q-icon name="warning" color="warning" size="4em" />
      <div class="q-ml-sm text-h6">No data available</div>
    </div>

    <q-table
      v-else
      bordered
      class="transaction-table shadow-1"
      flat
      :columns="transactionListColumns"
      :rows="branchPremixDatas"
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 10, 20, 0]"
      row-key="id"
      @request="onPageRequest"
      :loading="loading"
    >
      <template v-slot:header="props">
        <q-tr :props="props" class="gradient-header text-white">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-weight-bold text-subtitle2"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            rounded
            padding="xs md"
            class="text-weight-bold text-uppercase"
            :color="getPremixBadgeStatusColor(props.row.status)"
          >
            {{ props.row.status }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-view="props">
        <q-td :props="props">
          <div class="row justify-center">
            <TransactionView
              :report="props.row"
              @update-history="updateReportHistory"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from "vue";
import { usePremixStore } from "src/stores/premix";
import { useRoute } from "vue-router";
import TransactionView from "./TransactionView.vue";
import { typographyFormat } from "src/composables/typography/typography-format";
import { badgeColor } from "src/composables/badge-color/badge-color";

const { capitalizeFirstLetter, formatTimestamp } = typographyFormat();
const { getPremixBadgeStatusColor } = badgeColor();

const route = useRoute();
const warehouseID = computed(() => route.params.warehouse_id || null);
const premixStore = usePremixStore();
const premixDatas = computed(() => premixStore.branchPremix);
console.log("premixDatas", premixDatas.value);
const branchPremixDatas = ref([]);

const filter = ref("");
const loadingSearchIcon = ref(true);
const props = defineProps({
  branchId: Object,
});

const loading = ref(false);
const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});

const branchId = props.branchId;

const fetchRequestBranchPremix = async (
  branchId,
  page = 0,
  rowsPerPage = 5,
  search = ""
) => {
  try {
    loading.value = true;
    await premixStore.fetchRequestBranchPremix(
      branchId,
      page,
      rowsPerPage,
      search
    );
    console.log("Fetch premix data", premixDatas.value);

    const { data, current_page, per_page, total } = premixDatas.value;
    branchPremixDatas.value = data;
    pagination.value.page = current_page;
    console.log("pagination.value.page", pagination.value.page);
    pagination.value.rowsPerPage = per_page;
    console.log("pagination.value.rowsPerPage", pagination.value.rowsPerPage);
    pagination.value.rowsNumber = total;
    console.log("pagination.value.rowsNumber", pagination.value.rowsNumber);
  } catch (error) {
    console.log("error", error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  if (branchId) {
    await fetchRequestBranchPremix(branchId);
  }
  console.log("premixdatas", premixDatas.value);
});

const onPageRequest = (props) => {
  // pagination.value.page = page;

  fetchRequestBranchPremix(
    branchId,
    props.pagination.page,
    props.pagination.rowsPerPage
  );
};

watch(filter, async (newVal) => {
  loadingSearchIcon.value = true;
  await fetchRequestBranchPremix(
    branchId,
    pagination.value.page,
    pagination.value.rowsPerPage,
    newVal
  );
  loadingSearchIcon.value = false;
});

const transactionListColumns = [
  {
    name: "name",
    label: "Transactions Name",
    align: "left",
    field: (row) => capitalizeFirstLetter(row.name) || "N/A",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "date",
    align: "center",
    label: "Created Date",
    field: "created_at",
    format: (val) => formatTimestamp(val),
    sortable: true,
  },
  {
    name: "updated_at",
    align: "center",
    label: "Updated Date",
    field: "updated_at",
    format: (val) => formatTimestamp(val),
    sortable: true,
  },
  {
    name: "status",
    align: "center",
    label: "Status",
    field: "status",
    sortable: true,
  },
  {
    name: "view",
    align: "right",
    label: "View",
    field: "view",
    sortable: true,
  },
];
</script>

<style lang="scss" scoped>
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

.gradient-header {
  background: linear-gradient(135deg, #155e75, #1e293b);
  color: white;
}

.transaction-table {
  border-radius: 12px;
  overflow: hidden;

  :deep(.q-table tbody tr:hover) {
    background-color: #f8fafc !important;
    transition: background-color 0.3s ease;
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
  justify-content: center;
  align-items: center;
}
</style>
