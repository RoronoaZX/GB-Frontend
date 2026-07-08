<template>
  <q-card class="widget-card" flat bordered>
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div>
          <div class="text-h6 text-weight-bold text-dark row items-center">
            <q-icon name="beach_access" class="q-mr-sm text-blue-8" size="24px" />
            Recent Leave Requests
          </div>
          <div class="text-caption text-grey-6 q-mt-xs">
            Review recent staff leave applications
          </div>
        </div>
        <!-- Total count badge -->
        <q-badge
          v-if="!loading && leaveRequests.length > 0"
          rounded
          color="blue-1"
          text-color="blue-9"
          class="text-weight-bold q-px-sm q-py-xs"
        >
          {{ leaveRequests.length }} total
        </q-badge>
      </div>
    </q-card-section>

    <!-- Leave List -->
    <q-card-section class="col q-pt-sm q-pb-xs list-section">
      <!-- Loading skeleton -->
      <div v-if="loading" class="q-gutter-sm">
        <q-card v-for="n in 4" :key="n" flat class="q-pa-md bg-grey-1" style="border-radius: 12px;">
          <div class="row items-center no-wrap">
            <q-skeleton type="QAvatar" size="32px" class="q-mr-md" />
            <div style="flex: 1">
              <q-skeleton type="text" width="60%" height="14px" />
              <q-skeleton type="text" width="40%" height="10px" class="q-mt-xs" />
            </div>
          </div>
        </q-card>
      </div>

      <!-- Empty state -->
      <div v-else-if="leaveRequests.length === 0" class="flex flex-center column empty-state">
        <q-icon name="assignment_turned_in" size="64px" color="grey-4" />
        <div class="text-subtitle1 text-weight-bold text-grey-6 q-mt-md">No leave requests found</div>
        <div class="text-caption text-grey-5">All staff are active on duty</div>
      </div>

      <!-- Paginated list -->
      <div v-else>
        <div
          v-for="(leave, index) in paginatedLeaves"
          :key="index"
          class="metric-list-item row items-center justify-between q-pa-sm q-mb-sm"
        >
          <div class="row items-center col-grow">
            <!-- Avatar / Initials -->
            <q-avatar size="36px" class="q-mr-md bg-blue-1 text-blue-8 text-weight-bold">
              <img v-if="leave.employee?.avatar" :src="leave.employee.avatar" />
              <span v-else>{{ getInitials(leave.employee) }}</span>
            </q-avatar>
            <div>
              <div class="text-subtitle2 text-weight-bold text-grey-8 ellipsis" style="max-width: 180px">
                {{ getFullName(leave.employee) }}
              </div>
              <div class="text-caption text-grey-5">
                {{ leave.leave_type || leave.type || 'Leave' }} • {{ formatLeaveDates(leave) }}
              </div>
            </div>
          </div>
          <div class="row items-center q-pr-sm">
            <q-badge
              rounded
              :color="getStatusColor(leave.status)"
              :text-color="getStatusTextColor(leave.status)"
              class="text-weight-bold q-px-md q-py-xs"
            >
              {{ capitalize(leave.status) }}
            </q-badge>
          </div>
        </div>
      </div>
    </q-card-section>

    <!-- Pagination Footer -->
    <q-card-section v-if="!loading && leaveRequests.length > 0" class="q-pt-none q-pb-sm pagination-footer">
      <div class="row items-center justify-between">
        <span class="text-caption text-grey-5">
          {{ pageStart }}–{{ pageEnd }} of {{ leaveRequests.length }}
        </span>
        <div class="row items-center q-gutter-xs">
          <q-btn
            flat
            round
            dense
            icon="chevron_left"
            size="sm"
            :disable="currentPage === 1"
            :color="currentPage === 1 ? 'grey-4' : 'blue-7'"
            @click="currentPage--"
          />
          <div class="row q-gutter-xs">
            <q-btn
              v-for="p in totalPages"
              :key="p"
              flat
              round
              dense
              size="xs"
              :label="String(p)"
              :class="p === currentPage ? 'page-btn-active' : 'page-btn'"
              @click="currentPage = p"
            />
          </div>
          <q-btn
            flat
            round
            dense
            icon="chevron_right"
            size="sm"
            :disable="currentPage === totalPages"
            :color="currentPage === totalPages ? 'grey-4' : 'blue-7'"
            @click="currentPage++"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useEmployeeLeaveStore } from "src/stores/employee-leave";
import { computed, onMounted, ref } from "vue";

const leaveStore = useEmployeeLeaveStore();
const loading = ref(true);
const leaveRequests = ref([]);

const currentPage = ref(1);
const itemsPerPage = 4;

const totalPages = computed(() => Math.max(1, Math.ceil(leaveRequests.value.length / itemsPerPage)));

const paginatedLeaves = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return leaveRequests.value.slice(start, start + itemsPerPage);
});

const pageStart = computed(() => (currentPage.value - 1) * itemsPerPage + 1);
const pageEnd = computed(() => Math.min(currentPage.value * itemsPerPage, leaveRequests.value.length));

onMounted(async () => {
  await fetchLeaves();
});

const fetchLeaves = async () => {
  loading.value = true;
  try {
    const res = await leaveStore.fetchLeaveRequests();
    leaveRequests.value = res || [];
  } catch (error) {
    /* console.log(error); */
  } finally {
    loading.value = false;
  }
};

const getFullName = (emp) => {
  if (!emp) return "Unknown Staff";
  return `${emp.firstname || ""} ${emp.lastname || ""}`.trim();
};

const getInitials = (emp) => {
  if (!emp) return "??";
  const f = emp.firstname?.[0] || "";
  const l = emp.lastname?.[0] || "";
  return (f + l).toUpperCase() || "??";
};

const formatLeaveDates = (leave) => {
  if (!leave.start_date) return "N/A";
  const start = new Date(leave.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  if (!leave.end_date) return start;
  const end = new Date(leave.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${start} - ${end}`;
};

const capitalize = (str) => {
  if (!str) return "Pending";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const getStatusColor = (status) => {
  const s = String(status).toLowerCase();
  if (s === "approved") return "emerald-1";
  if (s === "rejected" || s === "cancelled") return "rose-1";
  return "orange-1";
};

const getStatusTextColor = (status) => {
  const s = String(status).toLowerCase();
  if (s === "approved") return "emerald-9";
  if (s === "rejected" || s === "cancelled") return "rose-9";
  return "orange-9";
};
</script>

<style lang="scss" scoped>
.widget-card {
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.05);
  height: 400px;
  display: flex;
  flex-direction: column;
}

.list-section {
  flex: 1;
  overflow: hidden;
}

.empty-state {
  height: 260px;
}

.pagination-footer {
  border-top: 1px solid rgba(226, 232, 240, 0.8);
}

.page-btn {
  min-width: 24px;
  min-height: 24px;
  color: #64748b;
  font-size: 11px;
}

.page-btn-active {
  min-width: 24px;
  min-height: 24px;
  background: #dbeafe !important;
  color: #1d4ed8 !important;
  font-size: 11px;
  font-weight: 700;
}

.metric-list-item {
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.6);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;

  .list-icon-wrapper {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .emerald-1 {
    background: #ecfdf5;
  }
  .emerald-9 {
    color: #065f46;
  }
  .rose-1 {
    background: #fff1f2;
  }
  .rose-9 {
    color: #9f1239;
  }
  .orange-1 {
    background: #fff7ed;
  }
  .orange-9 {
    color: #9a3412;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    border-color: rgba(226, 232, 240, 1);
    background: #fafafa;
  }
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
