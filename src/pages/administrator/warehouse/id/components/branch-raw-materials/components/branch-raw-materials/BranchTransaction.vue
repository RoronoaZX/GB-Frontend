<template>
  <div>
    <q-input
      rounded
      outlined
      dense
      debounce="300"
      v-model="filter"
      placeholder="Search"
      style="width: 500px; max-width: 1500px; min-width: 100px"
    >
      <template v-slot:append>
        <q-icon v-if="!loadingSearchIcon" name="search" />
        <q-icon v-else :thickness="2" color="teal" size="1em" />
      </template>
    </q-input>
  </div>
  <div>
    <!-- :filter="filter" -->
    <q-table
      bordered
      class="q-mt-md"
      flat
      :columns="transactionListColumns"
      :rows="branchPremixDatas"
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 7, 10, 0]"
      row-key="id"
      @request="onPageRequest"
      :loading="loading"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge outlined :color="getBadgeStatusColor(props.row.status)">
            {{ capitalizeFirstLetter(props.row.status) }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-view="props">
        <q-td :props="props">
          <div>
            <TransactionView
              :report="props.row"
              @update-history="updateReportHistory"
            />
          </div>
        </q-td>
      </template>
      <template #loading>
        <q-inner-loading showing>
          <q-spinner-gears size="50px" color="grey-9" />
        </q-inner-loading>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch, onMounted } from "vue";
import { usePremixStore } from "src/stores/premix";
import { date as quasarDate } from "quasar";
import { useRoute } from "vue-router";
import TransactionView from "./TransactionView.vue";

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
  rowsPerPage = 5
) => {
  try {
    loading.value = true;
    await premixStore.fetchRequestBranchPremix(branchId, page, rowsPerPage);
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

watch(filter, () => {
  loadingSearchIcon.value = true;
  setTimeout(() => {
    loadingSearchIcon.value = false;
  });
});
const formatDate = (dateString) => {
  return quasarDate.formatDate(dateString, "MMM D, YYYY - hh:mm A");
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const getBadgeStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "warning";
    case "declined":
      return "red-6";
    case "confirmed":
      return "green";
    case "process":
      return "primary";
    case "completed":
      return "dark";
    case "to deliver":
      return "brown-9";
    case "to receive":
      return "amber-10";
    case "received":
      return "secondary";
    default:
      return "grey";
  }
};

const transactionListColumns = [
  {
    name: "name",
    label: "Transactions Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "date",
    align: "center",
    label: "Created Date",
    field: "created_at",
    format: (val) => formatDate(val),
    sortable: true,
  },
  {
    name: "updated_at",
    align: "center",
    label: "Updated Date",
    field: "updated_at",
    format: (val) => formatDate(val),
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
.sticky-header-top {
  /* height or max-height is important */
  // height: 342px;

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    /* bg color is important for th; just specify one */
    background-color: #ffffff;
    color: rgb(0, 0, 0);
    // #1d1d1d
  }
  thead tr th {
    position: sticky;
    z-index: 1;
  }
  thead tr:first-child th {
    top: 0;
  }
  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th {
    /* height of all previous header rows */
    top: 48px;
  }
  /* prevent scrolling behind sticky top row on focus */
  tbody {
    /* height of all previous header rows */
    scroll-margin-top: 48px;
  }
}
</style>
