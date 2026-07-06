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
      </div>
    </q-card-section>

    <!-- Scrollable Leave List -->
    <q-card-section class="col q-pt-sm q-pb-md">
      <div v-if="loading" class="q-gutter-sm">
        <q-card v-for="n in 3" :key="n" flat class="q-pa-md bg-grey-1" style="border-radius: 12px;">
          <div class="row items-center no-wrap">
            <q-skeleton type="QAvatar" size="32px" class="q-mr-md" />
            <div style="flex: 1">
              <q-skeleton type="text" width="60%" height="14px" />
              <q-skeleton type="text" width="40%" height="10px" class="q-mt-xs" />
            </div>
          </div>
        </q-card>
      </div>
      <div v-else-if="leaveRequests.length === 0" class="flex flex-center column" style="height: 250px;">
        <q-icon name="assignment_turned_in" size="64px" color="grey-4" />
        <div class="text-subtitle1 text-weight-bold text-grey-6 q-mt-md">No leave requests found</div>
        <div class="text-caption text-grey-5">All staff are active on duty</div>
      </div>
      <div v-else class="vertical-scroll-container">
        <div 
          v-for="(leave, index) in leaveRequests.slice(0, 8)" 
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
  </q-card>
</template>

<script setup>
import { useEmployeeLeaveStore } from "src/stores/employee-leave";
import { onMounted, ref } from "vue";

const leaveStore = useEmployeeLeaveStore();
const loading = ref(true);
const leaveRequests = ref([]);

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

.vertical-scroll-container {
  flex-grow: 1;
  overflow-y: auto;
  padding: 4px;
  height: 290px;
  
  /* Styling custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
    &:hover {
      background: #94a3b8;
    }
  }
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
