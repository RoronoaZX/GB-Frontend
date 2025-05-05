<template>
  <q-btn
    class="bg-gradient text-white"
    outlined
    label="Added Bread"
    @click="openDialog"
  />

  <q-dialog
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section class="bg-gradient text-white">
        <div class="row justify-between">
          <div class="text-h6">Added Bread Reports</div>
          <div>
            <q-btn icon="close" flat dense round v-close-popup />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          :rows="rows"
          :columns="sentBread"
          row-key="id"
          flat
          bordered
          dense
          :loading="laoding"
          v-model:pagination="pagination"
          :rows-per-page-options="[5, 7, 10, 0]"
          @request="onPageRequest"
        >
          <template v-slot:body-cell-employee="props">
            <q-td :props="props">
              {{ formatFullname(props.row.employee) }}
            </q-td>
          </template>
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-badge :color="getBadgeCategoryColor(props.row.status)">
                {{ capitalizeFirstLetter(props.row.status) }}
              </q-badge>
            </q-td>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <ViewSendBreadToOtherBranch
                :report="props.row"
                :branchId="branchId"
              />
            </q-td>
          </template>
          <template #loading>
            <q-inner-loading showing>
              <q-spinner-gears size="50px" color="indigo-8" />
            </q-inner-loading>
          </template>
          <!-- <template>
            <q-pagination
              v-model="pagination.page"
              :max="maxPages"
              :max-pages="maxPages"
              @update:model-value="fetchSendBreadToBranch"
            >
            </q-pagination>
          </template> -->
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useSalesReportsStore } from "src/stores/sales-report";
import { useBreadProductStore } from "src/stores/bread-product";
import ViewSendBreadToOtherBranch from "./ViewSendBreadToOtherBranch.vue";
import { date } from "quasar";

const breadProductStore = useBreadProductStore();
const breads = computed(() => breadProductStore.breads);
const salesReportsStore = useSalesReportsStore();
const userData = salesReportsStore.user;
const branchId = userData?.device?.reference_id || "";
console.log("branch id", branchId);
const dialog = ref(false);
const rows = ref([]);
const loading = ref(true);
const openDialog = async () => {
  try {
    if (branchId) {
      await fetchSendBreadToBranch(branchId);
    }
    dialog.value = true;
  } catch (error) {}
};

const maximizedToggle = ref(true);
const maxPages = ref(1);
const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});

const fetchSendBreadToBranch = async (branchId, page = 0, rowsPerPage = 5) => {
  console.log("rowsPerPage in function", rowsPerPage);
  try {
    loading.value = true;
    const stocks = await breadProductStore.fetchSendBreadToBranch(
      branchId,
      page,
      rowsPerPage
    );

    console.log("breads.val", breads.value);

    const { data, current_page, per_page, total } = breads.value;

    rows.value = data;
    console.log("rows.value", rows.value);
    pagination.value.page = current_page;
    console.log("pagination.value.page", pagination.value.page);
    pagination.value.rowsPerPage = per_page;
    console.log("pagination.value.rowsPerPage", pagination.value.rowsPerPage);
    pagination.value.rowsNumber = total;
  } catch (error) {
    console.log("error", error);
  } finally {
    loading.value = false;
  }
};

const onPageRequest = (props) => {
  console.log("preopssss", props);
  fetchSendBreadToBranch(
    branchId,
    props.pagination.page,
    props.pagination.rowsPerPage
  );
};

const formatDate = (dateString) => {
  return date.formatDate(dateString, "MMMM DD, YYYY");
};

const formatTimeFromDB = (dateString) => {
  const dateObj = new Date(dateString);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return dateObj.toLocaleTimeString(undefined, options);
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

const sentBread = [
  {
    name: "date",
    align: "center",
    label: "Date",
    field: (row) => formatDate(row.created_at),
  },
  {
    name: "time",
    align: "center",
    label: "Time",
    field: (row) => formatTimeFromDB(row.created_at),
  },
  {
    name: "from",
    align: "center",
    label: "From",
    field: (row) => capitalizeFirstLetter(row.from_branch?.name) || "No Branch",
  },
  {
    name: "to",
    align: "center",
    label: "To",
    field: (row) => capitalizeFirstLetter(row.to_branch?.name) || "No Branch",
  },
  {
    name: "employee",
    align: "center",
    label: "Employee",
    field: "employee",
  },
  {
    name: "status",
    align: "center",
    label: "Status",
    field: "status",
  },
  {
    name: "action",
    align: "center",
    label: "Actions",
    field: "action",
  },
];

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

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

watch(() => pagination.value.page, fetchSendBreadToBranch);
watch(() => pagination.value.rowsPerPage, fetchSendBreadToBranch);
</script>

<style lang="scss" scoped>
.bg-gradient {
  // background: linear-gradient(135deg, #6a11cb, #2575fc);
  background: linear-gradient(135deg, #2c3e50, #4ca1af);
  // background: linear-gradient(135deg, #8e44ad, #3498db);
}
</style>
