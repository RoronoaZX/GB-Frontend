<template>
  <div>
    <!-- Modern Elegant Table -->
    <q-table
      class="elegant-table q-mt-md"
      flat bordered
      :rows="historyLogsData"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
      :filter="filter"
      :loading="loading"
      @request="onRequest"
      title="System Activity Logs"
    >
      <!-- Top Right Search Slot -->
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search Logs..."
          class="search-input"
        >
          <template v-slot:append>
            <q-icon name="search" color="grey-6" />
          </template>
        </q-input>
      </template>

      <!-- Details Column Layout -->
      <template v-slot:body-cell-details="props">
        <q-td :props="props">
          <div class="details-container q-py-sm">
            <div class="row items-center q-gutter-x-xs text-body2 wrap">
              <!-- User Name -->
              <span class="text-weight-bold text-primary">{{ formatFullname(props.row?.userId?.employee) || "System / Unknown User" }}</span>
              
              <!-- Action Statement -->
              <span class="text-grey-8 text-lowercase">{{ props.row?.action || "performed action on" }}</span>
              
              <!-- Designation Badge -->
              <q-badge 
                v-if="props.row?.designation?.name" 
                color="indigo-1" 
                text-color="indigo-8" 
                class="q-ml-sm q-mr-xs text-weight-bold rounded-borders q-px-sm"
              >
                {{ props.row?.designation?.name }}
              </q-badge>
              
              <!-- Report Type -->
              <span v-if="props.row?.type_of_report" class="text-weight-medium text-dark">
                {{ props.row?.type_of_report }}
              </span>
              
              <!-- Subject Name -->
              <span v-if="props.row?.name" class="text-weight-bold text-teal-7">
                ({{ props.row?.name }})
              </span>
            </div>
            
            <!-- Update Specifics sub-row (if exists) -->
            <div v-if="props.row?.updated_field" class="row items-center q-mt-xs text-caption text-grey-7 bg-grey-1 q-pa-xs rounded-borders" style="display: inline-flex;">
              <q-icon name="history_edu" size="14px" class="q-mr-xs text-grey-5" />
              Modified <span class="text-weight-bold text-dark q-mx-xs">{{ props.row.updated_field }}</span>
              from <span class="text-strike text-negative q-mx-xs">{{ props.row.original_data || 'empty' }}</span>
              <q-icon name="east" size="10px" class="q-mx-xs text-grey-4" />
              <span class="text-weight-bold text-positive q-ml-xs">{{ props.row.updated_data || 'empty' }}</span>
            </div>
          </div>
        </q-td>
      </template>

      <!-- Action Chip Column Layout -->
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-chip
            :color="getActionColorBg(props.row?.action)"
            :text-color="getActionColorText(props.row?.action)"
            size="sm"
            class="text-weight-bolder text-capitalize"
            square
          >
            {{ props.row?.action || 'Undefined' }}
          </q-chip>
        </q-td>
      </template>
      
      <!-- Timestamp Column Layout -->
      <template v-slot:body-cell-timestamp="props">
        <q-td :props="props">
          <div class="text-weight-medium text-grey-8">
            <q-icon name="calendar_today" size="xs" class="q-mr-xs text-grey-5" />
            {{ formatTimestamp(props.row?.created_at) }}
          </div>
        </q-td>
      </template>

      <!-- Loading State Skeleton -->
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      
      <!-- No Data State -->
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm q-pa-xl">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span>
            Well this is sad... {{ message }}
          </span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useHistoryLogsStore } from "src/stores/history-log";
import { date } from "quasar";

const useHistoryLogs = useHistoryLogsStore();
const historyLogsData = computed(() => useHistoryLogs.historyLogs);

// API Pagination Setup
const pagination = ref({
  page: 1,
  rowsPerPage: 15,
  rowsNumber: 0 // Handled by server
});

const filter = ref('');
const loading = ref(false);

const onRequest = async (props) => {
  const { page, rowsPerPage } = props.pagination;
  const searchTerm = props.filter;
  
  loading.value = true;
  try {
    await useHistoryLogs.fetchHistoryLogs(page, rowsPerPage, searchTerm);
    
    // Sync table pagination state with server response mapped in Pinia
    pagination.value.page = useHistoryLogs.pagination.page;
    pagination.value.rowsPerPage = useHistoryLogs.pagination.rowsPerPage;
    pagination.value.rowsNumber = useHistoryLogs.pagination.rowsNumber;
    
  } catch (error) {
    console.error("Error fetching paginated history logs:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  // Trigger initial fetch through the onRequest wrapper to set up pagination correctly
  onRequest({
    pagination: pagination.value,
    filter: filter.value
  });
});

const getActionColorBg = (action) => {
  if (!action) return 'grey-2';
  const act = action.toLowerCase();
  if (act.includes('create') || act.includes('add')) return 'green-1';
  if (act.includes('update') || act.includes('edit')) return 'orange-1';
  if (act.includes('delete') || act.includes('remove')) return 'red-1';
  if (act.includes('login') || act.includes('session')) return 'blue-1';
  return 'grey-2';
};

const getActionColorText = (action) => {
  if (!action) return 'grey-7';
  const act = action.toLowerCase();
  if (act.includes('create') || act.includes('add')) return 'positive';
  if (act.includes('update') || act.includes('edit')) return 'warning';
  if (act.includes('delete') || act.includes('remove')) return 'negative';
  if (act.includes('login') || act.includes('session')) return 'primary';
  return 'grey-8';
};

const formatFullname = (employee) => {
  if (!employee) return "";
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstname = employee.firstname ? capitalize(employee.firstname) : "";
  const middlename = employee.middlename
    ? capitalize(employee.middlename).charAt(0) + "."
    : "";
  const lastname = employee.lastname ? capitalize(employee.lastname) : "";

  return `${firstname} ${middlename} ${lastname}`.trim();
};

const formatTimestamp = (val) => {
  if (!val) return "";
  return date.formatDate(val, "MMM DD, YYYY · hh:mm A");
};

const columns = [
  {
    name: "timestamp",
    label: "Timestamp",
    align: "left",
    field: "created_at",
    sortable: false,
    headerClasses: 'text-grey-7 text-weight-bolder text-uppercase',
    style: 'width: 220px',
  },
  {
    name: "action",
    label: "Action Type",
    align: "left",
    field: "action",
    sortable: false,
    headerClasses: 'text-grey-7 text-weight-bolder text-uppercase',
    style: 'width: 150px',
  },
  {
    name: "details",
    label: "Activity Details",
    align: "left",
    sortable: false,
    headerClasses: 'text-grey-7 text-weight-bolder text-uppercase',
  }
];
</script>

<style scoped lang="scss">
.elegant-table {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05) !important;
  border: 1px solid #f1f5f9;
  
  // Customizing internal table elements
  :deep(.q-table__top) {
    border-bottom: 1px solid #f1f5f9;
    padding: 16px 24px;
    
    .q-table__title {
      font-weight: 700;
      color: #1e293b;
      font-size: 1.25rem;
      letter-spacing: -0.025em;
    }
  }

  :deep(.q-table__bottom) {
    border-top: 1px solid #f1f5f9;
    background-color: #f8fafc;
    border-radius: 0 0 16px 16px;
  }

  :deep(th) {
    font-size: 11px;
    letter-spacing: 0.05em;
  }

  :deep(td) {
    font-size: 14px;
    color: #334155;
  }
  
  :deep(tbody tr:hover) {
    background: #f8fafc;
  }
}

.search-input {
  background: #f8fafc;
  border-radius: 8px;
  padding: 0 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  width: 280px;

  &:focus-within {
    background: #ffffff;
    border-color: #cbd5e1;
    box-shadow: 0 0 0 2px rgba(226, 232, 240, 0.5);
  }
}
</style>
