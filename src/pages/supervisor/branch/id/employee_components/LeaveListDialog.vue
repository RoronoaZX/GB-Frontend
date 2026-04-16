<template>
  <q-dialog v-model="dialogOpen" maximized @hide="onDialogClose">
    <q-card class="leave-dialog-modern leave-dialog-fullscreen">
      <!-- Elegant Header with Gradient -->
      <q-card-section class="leave-dialog-header">
        <div class="header-top row items-center justify-between">
          <div class="header-info">
            <h6 class="header-title">Leave Requests</h6>
            <p class="header-subtitle">Manage and review leave applications</p>
          </div>
          <q-btn
            flat
            round
            dense
            icon="close"
            class="close-btn"
            v-close-popup
          />
        </div>
      </q-card-section>

      <!-- Summary Stats Cards -->
      <q-card-section class="summary-section">
        <div class="summary-grid">
          <div
            class="stat-card total"
            :class="{ active: selectedFilter === 'all' }"
            @click="setFilter('all')"
          >
            <div class="stat-icon">
              <q-icon name="assignment" />
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ totalRequests }}</div>
              <div class="stat-label">Total</div>
            </div>
          </div>

          <div
            class="stat-card pending"
            :class="{ active: selectedFilter === 'pending' }"
            @click="setFilter('pending')"
          >
            <div class="stat-icon">
              <q-icon name="schedule" />
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ pendingCount }}</div>
              <div class="stat-label">Pending</div>
            </div>
          </div>

          <div
            class="stat-card approved"
            :class="{ active: selectedFilter === 'approved' }"
            @click="setFilter('approved')"
          >
            <div class="stat-icon">
              <q-icon name="check_circle" />
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ approvedCount }}</div>
              <div class="stat-label">Approved</div>
            </div>
          </div>

          <div
            class="stat-card rejected"
            :class="{ active: selectedFilter === 'rejected' }"
            @click="setFilter('rejected')"
          >
            <div class="stat-icon">
              <q-icon name="cancel" />
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ rejectedCount }}</div>
              <div class="stat-label">Rejected</div>
            </div>
          </div>
        </div>
        <div class="summary-tip">Tap a card to filter requests.</div>
      </q-card-section>

      <!-- Search & Filter Section -->
      <q-card-section class="controls-section">
        <div class="search-container">
          <q-input
            v-model="searchQuery"
            outlined
            dense
            rounded
            placeholder="Search name, type, reason..."
            class="search-input"
            debounce="300"
          >
            <template v-slot:prepend>
              <q-icon name="search" color="primary" size="18px" />
            </template>
            <template v-slot:append v-if="searchQuery">
              <q-icon
                name="close"
                @click="searchQuery = ''"
                class="cursor-pointer"
                color="grey-7"
              />
            </template>
          </q-input>
        </div>

        <div class="filter-buttons-container">
          <q-scroll-area class="filter-scroll">
            <div class="filter-buttons">
              <q-btn
                v-for="btn in statusButtons"
                :key="btn.value"
                :label="btn.label"
                flat
                dense
                rounded
                size="sm"
                :class="[
                  'filter-btn',
                  { active: selectedFilter === btn.value },
                ]"
                @click="selectedFilter = btn.value"
              />
            </div>
          </q-scroll-area>
        </div>
      </q-card-section>

      <q-separator class="separator-thin" />

      <!-- Main Content Area -->
      <q-card-section class="content-section">
        <!-- Loading State -->
        <div v-if="loading" class="loading-container">
          <q-spinner color="primary" size="48px" />
          <p class="loading-text">Loading leave requests...</p>
        </div>

        <!-- Leave List -->
        <div v-else-if="filteredRequests.length" class="leave-list">
          <div
            v-for="(leave, index) in filteredRequests"
            :key="`${leave.id}-${index}`"
            class="leave-item"
          >
            <LeaveCard :leave="leave" @edit="openEditDialog(leave)" @view="openViewDialog(leave)" />
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
          <div class="empty-animation">
            <q-icon name="event_note" size="100px" color="grey-3" />
          </div>
          <h5 class="empty-title">No leave requests</h5>
          <p class="empty-message">
            {{ emptyStateMessage }}
          </p>
          <q-btn
            v-if="searchQuery || selectedFilter !== 'all'"
            flat
            label="Clear filters"
            color="primary"
            @click="clearFilters"
            class="clear-filter-btn"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- Full Leave Details View Dialog -->
  <q-dialog v-model="viewDialogOpen" position="right" maximized transition-show="slide-left" transition-hide="slide-down">
    <q-card class="view-details-card">
      <q-card-section class="view-header">
        <q-btn icon="arrow_back" flat round dense v-close-popup class="back-btn q-mr-sm" />
        <div class="header-content">
          <h6 class="text-h6 text-weight-bolder q-my-none">Leave Details</h6>
        </div>
        <q-btn icon="close" flat round dense v-close-popup class="close-icon-btn q-ml-auto" />
      </q-card-section>

      <q-card-section class="view-body" v-if="activeLeave">
        <!-- Employee Mini Profile -->
        <div class="employee-summary-card q-mb-xl">
          <q-avatar size="64px" class="employee-avatar shadow-2">
            <img :src="getEmployeeAvatar(activeLeave)" />
          </q-avatar>
          <div class="profile-info">
            <div class="profile-name">{{ getEmployeeName(activeLeave) }}</div>
            <div class="profile-position">{{ activeLeave.employee?.position || 'Staff' }}</div>
          </div>
          <div class="status-wrapper">
            <div class="status-badge" :class="activeLeave.status?.toLowerCase() || 'pending'">
              {{ activeLeave.status || 'Pending' }}
            </div>
          </div>
        </div>

        <!-- Info Grid -->
        <div class="info-grid q-mb-lg">
          <div class="info-box type-box">
            <div class="info-icon">
              <q-icon name="description" size="20px" />
            </div>
            <div class="info-content">
              <div class="info-label">Leave Type</div>
              <div class="info-value">{{ activeLeave.leave_type || activeLeave.type || 'N/A' }}</div>
            </div>
          </div>
          <div class="info-box duration-box">
            <div class="info-icon">
              <q-icon name="schedule" size="20px" />
            </div>
            <div class="info-content">
              <div class="info-label">Duration</div>
              <div class="info-value">{{ activeLeave.duration_value }} {{ activeLeave.duration_type }}</div>
            </div>
          </div>
        </div>

        <!-- Date Range -->
        <div class="date-timeline-card q-mb-lg">
          <div class="timeline-item start">
            <div class="timeline-dot bg-primary"></div>
            <div class="timeline-content">
              <div class="timeline-label">Start Date</div>
              <div class="timeline-date">{{ formatDateDefault(activeLeave.start_date) }}</div>
            </div>
          </div>
          <div class="timeline-line"></div>
          <div class="timeline-item end">
            <div class="timeline-dot bg-secondary"></div>
            <div class="timeline-content">
              <div class="timeline-label">End Date</div>
              <div class="timeline-date">{{ formatDateDefault(activeLeave.end_date) }}</div>
            </div>
          </div>
        </div>

        <!-- Reason -->
        <div class="section-title">Reason for Leave</div>
        <div class="reason-block q-mb-lg">
          <p class="reason-text">{{ activeLeave.reason || 'No reason provided.' }}</p>
        </div>

        <!-- Meta Info -->
        <div class="meta-section">
          <div class="meta-row">
            <span class="meta-label">Date Requested</span>
            <span class="meta-value">{{ formatDateTime(activeLeave.created_at || activeLeave.requested_at) }}</span>
          </div>
          <div class="meta-separator" v-if="activeLeave.handled_by"></div>
          <div class="meta-row" v-if="activeLeave.handled_by">
            <span class="meta-label">Handled By</span>
            <span class="meta-value text-weight-bold text-primary">{{ activeLeave.handled_by }}</span>
          </div>
          <div class="meta-separator" v-if="activeLeave.remarks"></div>
          <div class="meta-row remarks-row" v-if="activeLeave.remarks">
            <span class="meta-label">Supervisor Remarks</span>
            <span class="meta-value remarks-text">"{{ activeLeave.remarks }}"</span>
          </div>
        </div>
      </q-card-section>
      
      <div class="view-footer" v-if="activeLeave">
         <q-btn flat outline no-caps label="Close" color="grey-8" v-close-popup class="btn-close" />
         <q-btn unelevated no-caps label="Edit Status" color="primary" @click="openEditDialog(activeLeave)" class="btn-edit" />
      </div>
    </q-card>
  </q-dialog>

  <!-- Improved Elegant Edit Status Dialog -->
  <q-dialog v-model="editDialogOpen" position="bottom" full-width transition-show="slide-up" transition-hide="slide-down">
    <q-card class="edit-status-card">
      <!-- Drag Handle for Mobile Feel -->
      <div class="drag-handle-wrapper">
        <div class="drag-handle"></div>
      </div>

      <q-card-section class="edit-header">
        <div class="header-content">
          <h6 class="text-h5 text-weight-bolder q-my-none">Update Request</h6>
          <div class="text-caption text-grey-6 q-mt-xs font-medium">Set the status and modify dates if needed</div>
        </div>
        <q-btn icon="close" flat round dense v-close-popup class="close-icon-btn" />
      </q-card-section>

      <q-card-section class="edit-body">
        <div class="section-label">Status</div>
        <div class="status-options">
          <div
            v-for="status in ['Pending', 'Approved', 'Rejected']"
            :key="status"
            class="status-option-modern"
            :class="[
              { 'is-active': editLeaveForm.status === status },
              status.toLowerCase()
            ]"
            @click="editLeaveForm.status = status"
          >
            <div class="status-icon-wrapper">
              <q-icon :name="getStatusIcon(status)" size="22px" />
            </div>
            <div class="status-label">{{ status }}</div>
            <div class="active-dot" v-if="editLeaveForm.status === status"></div>
          </div>
        </div>

        <div class="section-label q-mt-lg">Date Range</div>
        <div class="date-section row q-col-gutter-md">
          <div class="col-6">
            <q-input
              v-model="editLeaveForm.start_date"
              type="date"
              outlined
              dense
              class="elegant-input"
              color="primary"
            >
              <template v-slot:prepend>
                <q-icon name="event" size="18px" color="primary" class="q-ml-sm" />
              </template>
            </q-input>
          </div>
          <div class="col-6">
            <q-input
              v-model="editLeaveForm.end_date"
              type="date"
              outlined
              dense
              class="elegant-input"
              color="primary"
            >
              <template v-slot:prepend>
                <q-icon name="date_range" size="18px" color="primary" class="q-ml-sm" />
              </template>
            </q-input>
          </div>
        </div>

        <div class="section-label q-mt-lg">Additional Remarks</div>
        <q-input
          v-model="editLeaveForm.remarks"
          type="textarea"
          placeholder="Add comments, reasons for rejection, or notes..."
          outlined
          class="elegant-input text-area-input"
          color="primary"
          autogrow
        />
      </q-card-section>

      <div class="edit-actions-modern">
        <q-btn flat label="Cancel" color="grey-7" v-close-popup class="btn-cancel" no-caps />
        <q-btn label="Save Changes" color="primary" @click="saveEdit" class="btn-save" no-caps unelevated />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import LeaveCard from "./LeaveCard.vue";
import { getAllMockLeaves } from "./mockLeaveData.js";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  leaveRequests: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue"]);

const searchQuery = ref("");
const selectedFilter = ref("all");

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const statusButtons = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "Cancelled", value: "cancelled" },
];

const normalizeStatus = (status = "") =>
  String(status).trim().toLowerCase().replace(/\s+/g, "-");

// Use mockLeaveData if no real data is provided
const displayRequests = computed(() => {
  const hasRealData = props.leaveRequests && props.leaveRequests.length > 0;
  return hasRealData ? props.leaveRequests : getAllMockLeaves();
});

const filteredRequests = computed(() => {
  let filtered = Array.isArray(displayRequests.value)
    ? [...displayRequests.value]
    : [];

  // Filter by status
  if (selectedFilter.value !== "all") {
    filtered = filtered.filter(
      (leave) =>
        normalizeStatus(leave.status) === normalizeStatus(selectedFilter.value)
    );
  }

  // Filter by search
  if (searchQuery.value) {
    const term = searchQuery.value.toLowerCase();
    filtered = filtered.filter((leave) => {
      const emp = leave.employee || {};
      return (
        String(emp.firstname || "")
          .toLowerCase()
          .includes(term) ||
        String(emp.lastname || "")
          .toLowerCase()
          .includes(term) ||
        String(leave.reason || "")
          .toLowerCase()
          .includes(term) ||
        String(leave.leave_type || leave.type || "")
          .toLowerCase()
          .includes(term) ||
        String(emp.position || "")
          .toLowerCase()
          .includes(term)
      );
    });
  }

  return filtered;
});

const totalRequests = computed(() => displayRequests.value.length);

const pendingCount = computed(
  () =>
    displayRequests.value.filter(
      (leave) => normalizeStatus(leave.status) === "pending"
    ).length
);

const approvedCount = computed(
  () =>
    displayRequests.value.filter(
      (leave) => normalizeStatus(leave.status) === "approved"
    ).length
);

const rejectedCount = computed(
  () =>
    displayRequests.value.filter(
      (leave) => normalizeStatus(leave.status) === "rejected"
    ).length
);

const emptyStateMessage = computed(() => {
  if (searchQuery.value && selectedFilter.value === "all") {
    return `No leaves match "${searchQuery.value}"`;
  }
  if (selectedFilter.value !== "all" && searchQuery.value) {
    return "No leaves match your search and filter";
  }
  if (selectedFilter.value !== "all") {
    return `No ${selectedFilter.value} leave requests`;
  }
  return "No leave requests for this period";
});

const setFilter = (filter) => {
  selectedFilter.value = filter;
};

const clearFilters = () => {
  searchQuery.value = "";
  selectedFilter.value = "all";
};

const onDialogClose = () => {
  clearFilters();
};

// View Functionality
const viewDialogOpen = ref(false);

const openViewDialog = (leave) => {
  activeLeave.value = leave;
  viewDialogOpen.value = true;
};

const getEmployeeName = (leave) => {
  const emp = leave?.employee || {};
  return (`${emp.firstname || ''} ${emp.lastname || ''}`).trim() || 'Unknown Employee';
};

const getEmployeeAvatar = (leave) => {
  const emp = leave?.employee || {};
  if (emp.avatar) return emp.avatar;
  const initials = ((emp.firstname?.[0] || '') + (emp.lastname?.[0] || '')).trim() || "NA";
  return `https://ui-avatars.com/api/?name=${initials}&background=667eea&color=fff&size=128`;
};

const formatDateDefault = (dateStr) => {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  } catch { return dateStr; }
};

const formatDateTime = (dateStr) => {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: '2-digit', minute: '2-digit' });
  } catch { return dateStr; }
};

// Edit Functionality
const editDialogOpen = ref(false);
const activeLeave = ref(null);
const editLeaveForm = ref({
  status: '',
  remarks: '',
  start_date: '',
  end_date: ''
});

const openEditDialog = (leave) => {
  activeLeave.value = leave;
  // Initialize form with current values
  // We use capitalized status to match the UI options
  const currentStatus = leave.status ? capitalizeFirstFilter(leave.status) : 'Pending';
  
  let start = '';
  let end = '';
  try {
    if (leave.start_date) start = new Date(leave.start_date).toISOString().split('T')[0];
    if (leave.end_date) end = new Date(leave.end_date).toISOString().split('T')[0];
  } catch (e) {
    console.error('Date parsing error', e);
  }

  editLeaveForm.value = {
    status: currentStatus,
    remarks: leave.remarks || '',
    start_date: start,
    end_date: end
  };
  editDialogOpen.value = true;
};

const capitalizeFirstFilter = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const getStatusIcon = (status) => {
  const icons = {
    'Pending': 'schedule',
    'Approved': 'check_circle',
    'Rejected': 'cancel'
  };
  return icons[status] || 'help';
};

const saveEdit = () => {
  // UI ONLY: In the future, call API here
  console.log('Saving leave request...', {
    id: activeLeave.value?.id,
    newStatus: editLeaveForm.value.status,
    remarks: editLeaveForm.value.remarks,
    start_date: editLeaveForm.value.start_date,
    end_date: editLeaveForm.value.end_date
  });
  
  // Optimistic UI update (optional, just for demonstration)
  if (activeLeave.value) {
    activeLeave.value.status = editLeaveForm.value.status.toLowerCase();
    activeLeave.value.start_date = editLeaveForm.value.start_date;
    activeLeave.value.end_date = editLeaveForm.value.end_date;
  }

  editDialogOpen.value = false;
};
</script>

<style scoped lang="scss">
.leave-dialog-modern {
  width: min(100%, 900px);
  max-height: 90vh;
  border-radius: 24px;
  overflow: hidden;
  background: #f8fafc;

  &.leave-dialog-fullscreen {
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    background: #f8fafc;
  }

  .leave-dialog-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 24px;
    color: white;
    flex-shrink: 0;

    .header-top {
      gap: 16px;
    }

    .header-info {
      flex: 1;

      .header-title {
        margin: 0 0 4px;
        font-size: 1.5rem;
        font-weight: 700;
      }

      .header-subtitle {
        margin: 0;
        font-size: 0.9rem;
        opacity: 0.9;
      }
    }

    .close-btn {
      color: white;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }

  .summary-section {
    padding: 20px 24px;
    background: #f8fafc;
    flex-shrink: 0;

    .summary-grid {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
      flex-wrap: nowrap;
      overflow-x: auto;
      padding-bottom: 4px;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .summary-grid::-webkit-scrollbar {
      height: 0;
    }

    .summary-grid > .stat-card {
      flex: 0 0 130px;
    }

    .summary-tip {
      margin-top: 8px;
      font-size: 0.75rem;
      color: #64748b;
      opacity: 0.9;
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 10px 12px;
      display: flex;
      gap: 10px;
      align-items: center;
      border: 1px solid #e2e8f0;
      min-width: 140px;
      flex: 0 0 auto;
      transition: all 0.2s ease;
      cursor: pointer;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      }

      &.active {
        background: #eef4ff;
        border-color: #7c92f8;
      }

      .stat-info {
        flex: 1;
      }

      .stat-value {
        font-size: 1.2rem;
        font-weight: 700;
        color: #1f2937;
      }

      .stat-label {
        font-size: 0.75rem;
        color: #64748b;
        margin-top: 1px;
      }

      &.total {
        .stat-icon {
          background: #eff6ff;
          color: #3b82f6;
        }
      }

      &.pending {
        .stat-icon {
          background: #fef3c7;
          color: #f59e0b;
        }
      }

      &.approved {
        .stat-icon {
          background: #ecfdf5;
          color: #10b981;
        }
      }

      &.rejected {
        .stat-icon {
          background: #fee2e2;
          color: #ef4444;
        }
      }
    }
  }

  .controls-section {
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: #f8fafc;
    flex-shrink: 0;

    .search-container {
      .search-input {
        width: 100%;
      }
    }

    .filter-buttons-container {
      .filter-scroll {
        height: auto;
        max-height: none;

        .filter-buttons {
          display: flex;
          gap: 8px;
          padding: 4px 0;

          .filter-btn {
            white-space: nowrap;
            border: 1px solid #cbd5e1;
            background: white;
            color: #475569;
            font-weight: 500;
            padding: 6px 14px;
            font-size: 0.85rem;
            transition: all 0.2s ease;

            &:hover {
              background: #f1f5f9;
              border-color: #94a3b8;
            }

            &.active {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border-color: transparent;
              box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
            }
          }
        }
      }
    }
  }

  .separator-thin {
    margin: 0;
    background: #e2e8f0;
    flex-shrink: 0;
  }

  .content-section {
    padding: 20px 24px 12px;
    flex: 1;
    overflow-y: auto;
    background: #f8fafc;
    display: flex;
    flex-direction: column;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;

      &:hover {
        background: #94a3b8;
      }
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      gap: 16px;

      .loading-text {
        color: #64748b;
        font-size: 0.95rem;
        margin: 0;
      }
    }

    .leave-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding-bottom: 12px;

      .leave-item {
        animation: slideIn 0.3s ease;

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      }
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 24px;
      text-align: center;
      min-height: 400px;

      .empty-animation {
        margin-bottom: 24px;
        animation: float 3s ease-in-out infinite;

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      }

      .empty-title {
        margin: 0 0 12px;
        color: #1f2937;
        font-size: 1.3rem;
        font-weight: 700;
      }

      .empty-message {
        margin: 0 0 24px;
        color: #64748b;
        font-size: 0.95rem;
        max-width: 300px;
      }

      .clear-filter-btn {
        font-weight: 600;

        &:hover {
          background: rgba(102, 126, 234, 0.1);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .leave-dialog-modern {
    .leave-dialog-header {
      padding: 16px;

      .header-info {
        .header-title {
          font-size: 1.2rem;
        }

        .header-subtitle {
          font-size: 0.85rem;
        }
      }
    }

    .summary-section {
      padding: 16px;

      .summary-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .controls-section {
      padding: 12px 16px;
      gap: 12px;
    }

    .content-section {
      padding: 16px;
    }
  }
}

/* View Details Dialog Styles */
.view-details-card {
  width: min(100vw, 420px) !important;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  
  .view-header {
    display: flex;
    align-items: center;
    padding: 18px 24px;
    background: #ffffff;
    border-bottom: 1px solid #f1f5f9;
    box-shadow: 0 2px 10px rgba(0,0,0,0.02);
    z-index: 10;
    
    .back-btn, .close-icon-btn {
      color: #64748b;
      background: #f1f5f9;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      &:hover { background: #e2e8f0; color: #1e293b; transform: scale(1.05); }
    }
  }

  .view-body {
    flex: 1;
    overflow-y: auto;
    padding: 28px 24px;
    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 150px);

    .employee-summary-card {
      display: flex;
      align-items: center;
      background: #ffffff;
      padding: 20px;
      border-radius: 24px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(241, 245, 249, 0.8);
      gap: 16px;

      .employee-avatar {
        border: 3px solid #ffffff;
      }

      .profile-info {
        flex: 1;
        .profile-name {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.3px;
          line-height: 1.2;
          margin-bottom: 4px;
        }
        .profile-position {
          font-size: 0.85rem;
          font-weight: 600;
          color: #667eea;
        }
      }

      .status-wrapper {
        .status-badge {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          
          &.pending { background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); color: #b45309; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.15); }
          &.approved { background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); color: #047857; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15); }
          &.rejected { background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); color: #b91c1c; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15); }
        }
      }
    }

    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;

      .info-box {
        background: #ffffff;
        padding: 18px;
        border-radius: 20px;
        border: 1px solid #f1f5f9;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
        display: flex;
        flex-direction: column;
        gap: 12px;

        .info-icon {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        &.type-box .info-icon {
          background: #eff6ff;
          color: #3b82f6;
        }

        &.duration-box .info-icon {
          background: #fef3c7;
          color: #d97706;
        }
        
        .info-content {
          .info-label {
            font-size: 0.7rem;
            color: #64748b;
            text-transform: uppercase;
            font-weight: 800;
            letter-spacing: 0.6px;
            margin-bottom: 4px;
          }
          .info-value {
            font-size: 1rem;
            font-weight: 700;
            color: #1e293b;
          }
        }
      }
    }

    .date-timeline-card {
      background: #ffffff;
      padding: 24px;
      border-radius: 24px;
      border: 1px solid #f1f5f9;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
      position: relative;
      
      .timeline-item {
        display: flex;
        align-items: flex-start;
        gap: 20px;
        position: relative;
        z-index: 2;

        .timeline-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 3px solid #ffffff;
          box-shadow: 0 0 0 3px #f1f5f9;
          margin-top: 6px;
          flex-shrink: 0;
        }

        .timeline-content {
          .timeline-label {
            font-size: 0.7rem;
            color: #64748b;
            text-transform: uppercase;
            font-weight: 800;
            letter-spacing: 0.6px;
            margin-bottom: 2px;
          }
          .timeline-date {
            font-size: 1.05rem;
            font-weight: 700;
            color: #1e293b;
          }
        }

        &.start { margin-bottom: 30px; .timeline-dot { background: #3b82f6; } }
        &.end { .timeline-dot { background: #10b981; } }
      }

      .timeline-line {
        position: absolute;
        left: 30px; /* 24px padding + 6px half dot */
        top: 40px;
        bottom: 40px;
        width: 2px;
        background: #e2e8f0;
        z-index: 1;
      }
    }

    .section-title {
      font-size: 0.75rem;
      font-weight: 800;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 12px;
      padding-left: 4px;
    }

    .reason-block {
      background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
      padding: 20px 24px;
      border-radius: 20px;
      border: 1px solid #fde68a;
      border-left: 5px solid #f59e0b;
      
      .reason-text {
        margin: 0;
        font-size: 0.95rem;
        color: #78350f;
        line-height: 1.6;
        font-weight: 500;
      }
    }

    .meta-section {
      background: #ffffff;
      padding: 20px 24px;
      border-radius: 20px;
      border: 1px solid #f1f5f9;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
      display: flex;
      flex-direction: column;
      gap: 14px;

      .meta-separator {
        height: 1px;
        background: #f1f5f9;
        margin: 2px 0;
      }

      .meta-row {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .meta-label { color: #64748b; font-weight: 600; font-size: 0.85rem; }
        .meta-value { color: #1e293b; text-align: right; font-weight: 600; font-size: 0.9rem; }
      }

      .remarks-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        
        .remarks-text {
          width: 100%;
          text-align: left;
          background: #f8fafc;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 0.9rem;
          color: #475569;
          font-style: italic;
        }
      }
    }
  }

  .view-footer { 
    background: #ffffff;
    border-top: 1px solid #f1f5f9;
    padding: 20px 24px 28px;
    display: flex;
    gap: 16px;
    z-index: 10;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.03);

    .btn-close {
      flex: 1;
      border-radius: 16px;
      font-weight: 700;
      font-size: 0.95rem;
      border: 2px solid #e2e8f0;
      
      &:hover { background: #f8fafc; border-color: #cbd5e1; }
    }
    
    .btn-edit {
      flex: 2;
      border-radius: 16px;
      font-weight: 700;
      font-size: 0.95rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
      }
    }
  }
}

/* Elegant Edit Status Dialog Styles */
.edit-status-card {
  border-radius: 32px 32px 0 0 !important;
  background: #ffffff;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.08) !important;
  padding-bottom: env(safe-area-inset-bottom);

  .drag-handle-wrapper {
    display: flex;
    justify-content: center;
    padding-top: 12px;
    padding-bottom: 4px;

    .drag-handle {
      width: 48px;
      height: 5px;
      background: #cbd5e1;
      border-radius: 10px;
      opacity: 0.8;
    }
  }

  .edit-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 16px 28px 20px;
    
    .header-content {
      .text-h5 {
        color: #0f172a;
        letter-spacing: -0.5px;
        line-height: 1.2;
      }
      .font-medium {
        font-weight: 500;
        font-size: 0.85rem;
      }
    }

    .close-icon-btn {
      background: #f8fafc;
      color: #64748b;
      transition: all 0.2s ease;
      border-radius: 12px;
      
      &:hover {
        background: #e2e8f0;
        color: #0f172a;
        transform: rotate(90deg) scale(1.1);
      }
    }
  }

  .edit-body {
    padding: 0 28px 24px;

    .section-label {
      font-size: 0.8rem;
      font-weight: 700;
      color: #64748b;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    .status-options {
      display: flex;
      gap: 12px;

      .status-option-modern {
        flex: 1;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 18px 8px;
        border-radius: 20px;
        background: #f8fafc;
        border: 2px solid transparent;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        color: #64748b;

        .status-icon-wrapper {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          transition: all 0.3s ease;
        }

        .status-label {
          font-size: 0.85rem;
          font-weight: 600;
        }

        .active-dot {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        &:hover {
          transform: translateY(-2px);
          background: #f1f5f9;
        }

        &.is-active {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.12);
          
          &.pending {
            background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
            border-color: rgba(245, 158, 11, 0.4);
            color: #b45309;
            .status-icon-wrapper { color: #d97706; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.2); }
            .active-dot { background: #f59e0b; box-shadow: 0 0 8px #f59e0b; }
          }
          &.approved {
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            border-color: rgba(16, 185, 129, 0.4);
            color: #047857;
            .status-icon-wrapper { color: #059669; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.2); }
            .active-dot { background: #10b981; box-shadow: 0 0 8px #10b981; }
          }
          &.rejected {
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            border-color: rgba(239, 68, 68, 0.4);
            color: #b91c1c;
            .status-icon-wrapper { color: #dc2626; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2); }
            .active-dot { background: #ef4444; box-shadow: 0 0 8px #ef4444; }
          }
        }
      }
    }
    
    .elegant-input {
      :deep(.q-field__control) {
        border-radius: 16px;
        background: #f8fafc;
        transition: all 0.3s ease;
        padding: 0 16px;
        
        &:before {
          border-color: transparent !important;
          border-width: 2px;
          transition: all 0.3s ease;
        }
        
        &:hover {
          background: #f1f5f9;
        }
      }
      
      &.q-field--focused {
        :deep(.q-field__control) {
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1) !important;
          
          &:before {
            border-color: #667eea !important;
          }
        }
      }
      
      :deep(input[type="date"]) {
        font-weight: 500;
        color: #1e293b;
      }
    }
    
    .text-area-input {
      :deep(.q-field__control) {
        border-radius: 20px;
        align-items: flex-start;
        padding: 12px 16px;
      }
    }
  }

  .edit-actions-modern {
    display: flex;
    gap: 16px;
    padding: 20px 28px 28px;
    background: #ffffff;
    border-top: 1px solid #f1f5f9;

    .btn-cancel {
      flex: 1;
      border-radius: 16px;
      font-weight: 600;
      font-size: 0.95rem;
      background: #f1f5f9;
      color: #475569 !important;
      
      :deep(.q-focus-helper) {
        opacity: 0 !important;
      }
      
      &:hover {
        background: #e2e8f0;
        color: #1e293b !important;
      }
    }

    .btn-save {
      flex: 2;
      border-radius: 16px;
      font-weight: 700;
      font-size: 0.95rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
      }
      
      &:active {
        transform: translateY(1px);
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.25);
      }
    }
  }
}
</style>
