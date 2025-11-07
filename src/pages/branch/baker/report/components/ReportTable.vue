<template>
  <div class="q-mt-sm q-gutter-md">
    <div class="table-container">
      <q-table
        :rows="bakersReportList || []"
        :columns="bakersReportListColumns"
        :rows-per-page-options="[5]"
        row-key="id"
        flat
        bordered
        dense
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

      <div v-if="pagination.last_page > 1" class="q-pt-md flex flex-center">
        <q-pagination
          v-model="pagination.current_page"
          :max="pagination.last_page"
          :max-pages="5"
          boundary-numbers
          direction-links
          icon-first="skip_previous"
          icon-last="skip_next"
          icon-prev="fast_rewind"
          icon-next="fast_forward"
          @update:model-value="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBakerReportsStore } from "src/stores/baker-report";
import ReportView from "./ReportView.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { typographyFormat } from "src/composables/typography/typography-format";
import { badgeColor } from "src/composables/badge-color/badge-color";
import { useQuasar } from "quasar";

const { capitalizeFirstLetter, formatTimestamp } = typographyFormat();
const { getStatusColor } = badgeColor();

const props = defineProps({
  searchText: {
    type: String,
    default: "",
  },
});

watch(
  () => props.searchText,
  (newVal) => {
    searchQuery.value = newVal;
    onSearch();
  }
);

const router = useRouter();

const bakerReportStore = useBakerReportsStore();

const userData = computed(() => bakerReportStore.user);

// im using user id for fetching reports
// instead of employee id for the reason
// that the user id is the one that is being
// used in the backend to save the data in the database

const userId = userData.value?.data.id || "";
const filter = ref("");
const loading = ref(true);
const loadingSearchIcon = ref(false);
const showNoDataMessage = ref(false);

const $q = useQuasar();

const bakersReportList = computed(() => {
  return bakerReportStore.bakerReport?.data?.data || [];
});

const pagination = computed(() => {
  return (
    bakerReportStore.bakerReport?.pagination || {
      current_page: 1,
      last_page: 1,
      per_page: 5,
    }
  );
});

const selectedBakerReport = ref(null);
const searchQuery = ref("");

let searchTimeout = null;

const onSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    reloadTableData(1);
  }, 500);
};

// Fetch Data Function
const reloadTableData = async (page = 1) => {
  $q.loading.show();
  try {
    await bakerReportStore.fetchBakerReport(
      userId,
      page,
      pagination.value.rowsPerPage || 5,
      searchQuery.value
    );

    // If bakersReportList becomes empty after search/pagination, clear selected bakersReport
    if (!bakersReportList.value.length && selectedBakerReport.value) {
      selectedBakerReport.value = null;
    }

    // If there a selected bakersReport and its no longer in the current page, deselect it
    if (
      selectedBakerReport.value &&
      !bakersReportList.value.some((d) => d.id === selectedBakerReport.value.id)
    ) {
      selectedBakerReport.value = null;
    }

    // Automatically select the first bakersReport if none is selected and list is not empty
    if ((!selectedBakerReport.value && bakersReportList.value, length > 0)) {
      selectedBakerReport.value = bakersReportList.value[0];
    }
    console.log("bakersReportList", bakersReportList.value);
    console.log("pagination", pagination.value);
  } catch (error) {
    console.error("Error fetching baker report:", error);
  } finally {
    $q.loading.hide();
  }
};

onMounted(async () => {
  reloadTableData(pagination.value.current_page);
});

const onPageChange = (page) => {
  reloadTableData(page);
};

// Auto-fetch data when pagination changes
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
