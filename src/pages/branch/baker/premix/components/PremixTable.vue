<template>
  <q-table
    flat
    :columns="premixListColumns"
    :rows="premixList || []"
    :rows-per-page-options="[5]"
    row-key="id"
    bordered
    dense
  >
    <template v-slot:body-cell-status="props">
      <q-td :props="props">
        <q-badge outlined :color="getPremixBadgeStatusColor(props.row.status)">
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
</template>

<script setup>
import { computed, ref, watch, onMounted, watchEffect } from "vue";
import { useBakerReportsStore } from "src/stores/baker-report";
import { usePremixStore } from "src/stores/premix";
import TransactionView from "./TransactionView.vue";
import { typographyFormat } from "src/composables/typography/typography-format";
import { badgeColor } from "src/composables/badge-color/badge-color";
import { useQuasar } from "quasar";

const { capitalizeFirstLetter, formatTimestamp } = typographyFormat();
const { getPremixBadgeStatusColor } = badgeColor();

const props = defineProps({
  searchText: {
    type: String,
    default: "",
  },
});

watch(
  () => props.searchText,
  (newVal) => {
    searchQuery.value = newVal; // ✅ assigns here
    onSearch(); // ✅ triggers request
  }
);

const bakerReportStore = useBakerReportsStore();
const userData = computed(() => bakerReportStore.user);
console.log("userData in RawMaterialsTable:", userData.value);
const branchId = userData.value?.device?.reference_id || "";
console.log("branchId in PremixPage:", branchId);
const premixStore = usePremixStore();
const premixDatas = computed(() => premixStore.branchEmployeePremix);
const employeeId = userData.value?.data?.employee_id || "";
console.log("employeeId in PremixPagess:", employeeId);

const $q = useQuasar();

// computed properties to access store state
const premixList = computed(() => {
  return premixStore.branchEmployeePremix?.data?.data || [];
});

const pagination = computed(() => {
  return (
    premixStore.branchEmployeePremix?.pagination || {
      current_page: 1,
      last_page: 1,
      per_page: 5,
    }
  );
});

const selectedPremix = ref(null);
const searchQuery = ref("");

let searchTimeout = null;

const onSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    fetchRequestBranchEmployeePremix(1);
  }, 500);
};

const fetchRequestBranchEmployeePremix = async (page = 1) => {
  $q.loading.show();
  try {
    await premixStore.fetchRequestBranchEmployeePremix(
      branchId,
      employeeId,
      page,
      pagination.value.per_page || 5,
      searchQuery.value
    );
    // if premixList becomes emoty after search/pagination, clear selected premix
    if (!premixList.value.length && selectedPremix.value) {
      selectedPremix.value = null;
    }

    // if there a selected premix and its no longer in the current page, deselect it
    if (
      selectedPremix.value.length &&
      !premixList.value.some((d) => d.id === selectedPremix.value.id)
    ) {
      selectedPremix.value = null;
    }

    // Automatically select the first premix if none is selected and list is not emptyb
    if ((!selectedPremix.value && premixList.value, length > 0)) {
      selectedPremix.value = premixList.value[0];
    }
    console.log("premixList", premixList.value);
    console.log("pagination", pagination.value);
  } catch (error) {
    console.error("Error fetching premix report:", error);
  } finally {
    $q.loading.hide();
  }
};

onMounted(async () => {
  fetchRequestBranchEmployeePremix(pagination.value.current_page);
});

const onPageChange = (page) => {
  fetchRequestBranchEmployeePremix(page);
};

const premixListColumns = [
  {
    name: "name",
    label: "Transactions Name",
    align: "left",
    field: (row) => (row.name ? capitalizeFirstLetter(row.name) : "N/A"),
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "date",
    align: "center",
    label: "Date",
    field: "created_at",
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

<style scoped>
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
