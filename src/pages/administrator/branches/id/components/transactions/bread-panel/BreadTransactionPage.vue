<template>
  <q-input
    rounded
    outlined
    dense
    debounce="300"
    v-model="filter"
    placeholder="Search"
    style="width: 500px; max-width: 1500px; min-width: 100px"
  >
    <!-- <template v-slot:append>
      <q-icon v-if="!loadingSearchIcon" name="search" />
      <q-icon v-else :thickness="2" color="teal" size="1em" />
    </template> -->
  </q-input>
  <div class="spinner-wrapper" v-if="loading">
    <q-spinner-dots size="50px" color="primary" />
  </div>
  <div v-else>
    <div v-if="breadData.length === 0" class="data-error">
      <q-icon name="warning" color="warning" size="4em" />
      <div class="q-ml-sm text-h6">No data available</div>
    </div>
    <q-table
      v-else
      flat
      class="q-mt-md"
      bordered
      :rows="breadData"
      :columns="sentBreadColumns"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[3, 5, 10, 0]"
      @request="handleRequest"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge :color="getBadgeCategoryColor(props.row.status)">
            {{ capitalizeFirstLetter(props.row.status) }}
          </q-badge>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useBreadProductStore } from "src/stores/bread-product";
import { useRoute } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import { date } from "quasar";

const route = useRoute();

const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});

const breadProductStore = useBreadProductStore();
const pendingReports = computed(() => breadProductStore.pendingBreads);
console.log("pendingReportsadmin", pendingReports.value);
const breadData = ref([]);
const branchId = route.params.branch_id;
const showNoDataMessage = ref(false);
const loading = ref(false);
const filter = ref("");
const loadingSearchIcon = ref(true);

const fetchSendBreadPendingReports = async (
  branchId,
  page = 0,
  rowsPerPage = 5,
  search = ""
) => {
  try {
    loading.value = true;
    const response = await breadProductStore.fetchPendingBreadsReport(
      branchId,
      page,
      rowsPerPage,
      search
    );

    console.log("Pending bread reports:", response);
    console.log("Pending bread reports:", pendingReports.value);

    const { data, current_page, per_page, total } = pendingReports.value;

    breadData.value = data;
    console.log("breadData", breadData.value);
    pagination.value.page = current_page;
    console.log("pagination.value.page", pagination.value.page);
    pagination.value.rowsPerPage = per_page;
    console.log("pagination.value.per_page", pagination.value.rowsPerPage);
    pagination.value.rowsNumber = total;
    console.log("pagination.value.total", pagination.value.rowsNumber);

    if (!breadData.value.length) {
      showNoDataMessage.value = true;
    }
  } catch (error) {
    console.error("Error fetching pending bread reports:", error);
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  if (branchId) {
    await fetchSendBreadPendingReports(branchId);
  }
});

const handleRequest = (props) => {
  console.log("props", props);
  fetchSendBreadPendingReports(
    branchId,
    props.pagination.page,
    props.pagination.rowsPerPage,
    filter.value
  );
};

watch(filter, async (newVal) => {
  loadingSearchIcon.value = true;
  await fetchSendBreadPendingReports(
    branchId,
    pagination.value.page,
    pagination.value.rowsPerPage,
    newVal
  );
  loadingSearchIcon.value = false;
});

const formatDate = (dateString) => {
  return date.formatDate(dateString, "MMMM DD, YYYY");
};

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`.trim();
};

const sentBreadColumns = [
  {
    name: "created_at",
    label: "Date",
    align: "left",
    field: (row) => formatDate(row.created_at) || "Not Available",
    sortable: true,
  },
  {
    name: "employee",
    label: "Employee",
    align: "left",
    field: (row) => formatFullname(row.employee) || "Not Available",
    sortable: true,
  },
  {
    name: "from_branch_name",
    label: "From Branch",
    align: "left",
    field: (row) => row.from_branch.name || "Not Available",
    sortable: true,
  },
  {
    name: "to_branch_name",
    label: "To Branch",
    align: "left",
    field: (row) => row.to_branch.name || "Not Available",
  },
  {
    name: "product_name",
    label: "Product",
    align: "left",
    field: (row) => row.product.name || "Not Available",
  },
  {
    name: "bread-added",
    label: "Bread Added",
    align: "center",
    field: (row) => row.bread_added || "Not Available",
  },
  {
    name: "status",
    label: "Status",
    align: "center",
    field: (row) => row.status || "Not Available",
  },
];
const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const getBadgeCategoryColor = (category) => {
  switch (category) {
    case "declined":
      return "red";
    case "received":
      return "green";
    case "pending":
      return "orange";
    default:
      return "grey";
  }
};
</script>

<style lang="scss" scoped>
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
