<template>
  <q-btn
    class="bg-gradient text-white"
    outlined
    label="Stocks Reports"
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
        <div class="row justify-between items-center">
          <div class="text-h6">Selecta Stocks Reports</div>
          <q-btn icon="close" flat dense round v-close-popup />
        </div>
      </q-card-section>

      <q-card-section>
        <q-table
          :rows="rows"
          :columns="selectaReport"
          row-key="id"
          flat
          bordered
          dense
          :pagination="pagination"
          @request="fetchSelectaProductReports"
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
              <SelectaViewStockReport :report="props.row" />
            </q-td>
          </template>
        </q-table>

        <div class="row justify-center q-mt-md">
          <q-pagination
            v-model="pagination.page"
            :max="maxPages"
            :max-pages="7"
            direction-links
            boundary-links
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useSalesReportsStore } from "src/stores/sales-report";
import { useSelectaProductsStore } from "src/stores/selecta-product";
import SelectaViewStockReport from "./SelectaViewStockReport.vue";

import { typographyFormat } from "src/composables/typography/typography-format";

const { formatDate, formatTime, formatFullname, capitalizeFirstLetter } =
  typographyFormat();

/* ===================== STORES ===================== */
const selectaProductStore = useSelectaProductsStore();
const salesReportsStore = useSalesReportsStore();

/* ===================== STATE ===================== */
const dialog = ref(false);
const rows = ref([]);
const maxPages = ref(1);
const maximizedToggle = ref(true);

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  sortBy: "id",
  descending: false,
});

/* ===================== USER / BRANCH ===================== */
const userData = computed(() => salesReportsStore.user);

const branchId = computed(() => {
  return (
    userData.value?.device?.reference?.id ||
    userData.value?.device?.reference_id ||
    null
  );
});

/* ===================== ACTIONS ===================== */
const openDialog = async () => {
  if (!branchId.value) {
    console.warn("Branch ID not ready");
    return;
  }

  await fetchSelectaProductReports();
  dialog.value = true;
};

const fetchSelectaProductReports = async () => {
  if (!branchId.value) return;

  try {
    const { page, rowsPerPage } = pagination.value;

    const response = await selectaProductStore.fetchSelectaProductReports(
      branchId.value,
      page,
      rowsPerPage
    );

    rows.value = response.data;
    maxPages.value = response.last_page;
  } catch (error) {
    console.error("Error fetching selecta product reports:", error);
  }
};

/* ===================== WATCHERS ===================== */
watch(() => pagination.value.page, fetchSelectaProductReports);
watch(() => pagination.value.rowsPerPage, fetchSelectaProductReports);

/* ===================== HELPERS ===================== */

const getBadgeCategoryColor = (status) => {
  switch (status) {
    case "declined":
      return "red";
    case "confirmed":
      return "green";
    case "pending":
      return "orange";
    default:
      return "grey";
  }
};

/* ===================== TABLE COLUMNS ===================== */
const selectaReport = [
  {
    name: "date",
    label: "Date",
    align: "center",
    field: (row) => formatDate(row.created_at),
  },
  {
    name: "time",
    label: "Time",
    align: "center",
    field: (row) => formatTime(row.created_at),
  },
  {
    name: "employee",
    label: "Employee",
    align: "center",
    field: "employee",
  },
  {
    name: "status",
    label: "Status",
    align: "center",
    field: "status",
  },
  {
    name: "action",
    label: "Actions",
    align: "center",
    field: "action",
  },
];
</script>

<style lang="scss" scoped>
.bg-gradient {
  // background: linear-gradient(135deg, #6a11cb, #2575fc);
  background: linear-gradient(135deg, #2c3e50, #4ca1af);
  // background: linear-gradient(135deg, #8e44ad, #3498db);
}
</style>
