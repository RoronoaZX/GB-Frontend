<template>
  <div class="q-mt-sm q-gutter-md">
    <div class="table-container">
      <q-table
        :rows="rows"
        :columns="bakersReportListColumns"
        row-key="id"
        flat
        bordered
        dense
        v-model="pagination"
        :pagination="pagination"
        :rows-per-page-options="[10]"
        @request="reloadTableData(userId)"
      >
        <template v-slot:body-cell-status="props">
          <q-td key="name" :props="props">
            <q-badge outlined :color="getStatusColor(props.row.status)">
              {{ capitalizeFirstLetter(props.row.status) }}
            </q-badge>
          </q-td>
        </template>
        <template v-slot:body-cell-view="props">
          <q-td :props="props">
            <div>
              <ReportView :report="props.row" />
            </div>
          </q-td>
        </template>
      </q-table>
      <!-- Pagination -->
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="pagination.page"
          color="purple"
          :max="maxPages"
          :max-pages="5"
          boundary-numbers
          @update:model-value="reloadTableData(userId)"
        />
      </div>

      <!-- Loading Indicator -->
      <div
        v-if="loading"
        class="loading-overlay row justify-center items-center"
      >
        <q-spinner size="50px" />
      </div>

      <!-- No Data Message -->
      <div
        v-if="showNoDataMessage"
        class="q-pa-md q-gutter-md row justify-center"
      >
        <q-banner class="bg-grey-1" dense> No data available </q-banner>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBakerReportsStore } from "src/stores/baker-report";
import ReportView from "./ReportView.vue";
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { typographyFormat } from "src/composables/typography/typography-format";
import { badgeColor } from "src/composables/badge-color/badge-color";

const { capitalizeFirstLetter, formatTimestamp } = typographyFormat();
const { getStatusColor } = badgeColor();
const router = useRouter();

const bakerReportStore = useBakerReportsStore();
const bakerReportRow = computed(() => bakerReportStore.reportToView);
const userData = computed(() => bakerReportStore.user);

// im using user id for fetching reports
// instead of employee id for the reason
// that the user id is the one that is being
// used in the backend and database

const userId = userData.value?.data.id || "";
const filter = ref("");
const loading = ref(true);
const loadingSearchIcon = ref(false);
const showNoDataMessage = ref(false);

const rows = ref([]);

const maxPages = ref(1);
const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 10,
  sortBy: "id",
  descending: false,
});

// Fetch Data Function
const reloadTableData = async () => {
  loading.value = true;
  try {
    const { page, rowsNumber, rowsPerPage, sortBy, descending } =
      pagination.value;
    const bakerReportData = await bakerReportStore.fetchBakerReport(
      userId,
      page,
      rowsNumber,
      rowsPerPage,
      sortBy,
      descending
    );

    rows.value = bakerReportData.data;
    maxPages.value = bakerReportData.last_page;
    pagination.value.rowsPerPage = bakerReportData.per_page || 10;
    showNoDataMessage.value = rows.value.length === 0;
  } catch (error) {
    console.error("Error fetching baker report:", error);
  }
  loading.value = false;
};

// Auto-fetch data when pagination changes
watchEffect(() => {
  if (userId) {
    reloadTableData();
  }
});

const bakersReportListColumns = [
  {
    name: "date",
    align: "left",
    label: "Date",
    field: "created_at",
    format: formatTimestamp,
    sortable: true,
  },
  {
    name: "name",
    label: "Reports Name",
    align: "center",
    field: (row) => {
      if (row.branch_recipe && row.branch_recipe.recipe) {
        const name = row.branch_recipe.recipe.name;
        const category = row.branch_recipe.recipe.category;
        return {
          name: capitalizeFirstLetter(name),
          category: capitalizeFirstLetter(category),
        };
      } else {
        return {
          name: "N/A", // Fallback value for name
          category: "N/A", // Fallback value for category
        };
      }
    },
    format: (val) => `${val.name} (${val.category})`,
    sortable: true,
  },
  {
    name: "status",
    align: "center",
    label: "Status",
    field: "status",
  },
  {
    name: "view",
    align: "right",
    label: "View",
    field: "view",
  },
];
</script>

<style scoped>
.table-container {
  position: relative;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1;
}
</style>
