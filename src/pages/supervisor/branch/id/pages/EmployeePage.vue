<template>
  <div class="mobile-employees">
    <!-- Premium Header with Animated Gradient -->
    <div class="premium-header">
      <div class="header-content q-pa-md">
        <div class="row items-center justify-between">
          <div>
            <div class="text-h6 text-weight-bold text-white">Employees</div>
            <div class="text-caption text-white text-opacity-80">
              Manage your team members
            </div>
          </div>
          <q-avatar size="44px" class="header-avatar">
            <q-icon name="people" color="primary" size="24px" />
          </q-avatar>
        </div>

        <!-- Glassmorphic Search -->
        <q-input
          v-model="filter"
          outlined
          dense
          debounce="300"
          placeholder="Search employee..."
          class="glass-search q-mt-md"
          bg-color="white"
          rounded
        >
          <template v-slot:prepend>
            <q-icon name="search" color="white" size="20px" />
          </template>
          <template v-slot:append v-if="filter">
            <q-icon
              name="close"
              class="cursor-pointer"
              color="white"
              size="20px"
              @click="filter = ''"
            />
          </template>
        </q-input>
      </div>

      <!-- Curved Bottom edge -->
      <div class="header-curve"></div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-section q-px-md">
      <div class="row q-col-gutter-sm">
        <div class="col-4">
          <div class="stat-card-modern primary-stat">
            <div class="stat-icon">
              <q-icon name="people" size="22px" />
            </div>
            <div class="stat-value">{{ totalEmployees }}</div>
            <div class="stat-label">Total</div>
            <div class="stat-glow"></div>
          </div>
        </div>
        <div class="col-4">
          <div class="stat-card-modern success-stat">
            <div class="stat-icon">
              <q-icon name="check_circle" size="22px" />
            </div>
            <div class="stat-value">{{ activeEmployees }}</div>
            <div class="stat-label">Active</div>
            <div class="stat-glow"></div>
          </div>
        </div>
        <div class="col-4">
          <div class="stat-card-modern warning-stat">
            <div class="stat-icon">
              <q-icon name="schedule" size="22px" />
            </div>
            <div class="stat-value">{{ onLeaveCount }}</div>
            <div class="stat-label">On Leave</div>
            <div class="stat-glow"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- QUick Filters -->
    <div class="quick-filters q-px-md q-mt-lg">
      <div class="filter-scroll">
        <q-btn
          v-for="btn in filters"
          :key="btn.value"
          rounded
          unelevated
          :class="['filter-pill', { 'active-pill': quickFilter === btn.value }]"
          :label="btn.label"
          @click="quickFilter = btn.value"
        />
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state q-pa-xl">
      <div class="loading-animation">
        <q-spinner-ios size="48px" color="primary" />
        <div class="text-caption text-grey-6 q-mt-sm">Loading employees...</div>
      </div>
    </div>

    <!-- Empty Sate -->
    <div v-else-if="!filteredEmployees.length" class="empty-state-modern">
      <div class="empty-illustration">
        <q-icon name="people_outline" size="80px" color="grey-3" />
        <q-icon
          name="search_off"
          size="40px"
          color="grey-3"
          class="search-icon"
        />
      </div>
      <div class="empty-title">No employees found</div>
      <div>
        {{ filter ? "No Matches found" : "No employees in this branch yet" }}
      </div>

      <q-btn
        v-if="filter"
        flat
        color="primary"
        label="Clear filters"
        @click="filter = ''"
        class="clear-btn"
      />
    </div>

    <!-- Employee List -->
    <div v-else class="employee-list q-px-md q-mt-md q-mb-xl">
      <div
        v-for="item in filteredEmployees"
        :key="item.id"
        class="employee-card-modern"
        @click="viewEmployeeDetails(item)"
      >
        <!-- Card Background with Status Glow -->
        <!-- <div class="card-bg" :class="emp.employee.status?.toLowerCase()"></div> -->
        <div class="card-content">
          <!-- Header Section -->
          <div class="employee-header">
            <div class="employee-avatar-section">
              <div
                class="avatar-wrapper"
                :class="item.employee?.sex?.toLowerCase()"
              >
                <q-avatar size="60px" class="avatar">
                  <img :src="getEmployeeAvatar(item.employee)" />
                </q-avatar>
                <div
                  class="status-indicator"
                  :class="item.employee?.status?.toLowerCase() || 'inactive'"
                ></div>
              </div>
              <div class="employee-basic-info">
                <div class="employee-name">
                  {{ formatFullname(item.employee || {}) }}
                </div>
                <div class="employee-position">
                  <q-icon name="work" size="14px" />
                  {{ item.employee?.position || "Staff" }}
                </div>
                <div class="employee-id">
                  <q-icon name="badge" size="12px" />
                  ID: EMP-{{ String(item.employee?.id).padStart(4, "0") }}
                </div>
              </div>
            </div>
            <div
              class="employee-status-chip"
              :class="item.employee?.status?.toLowerCase() || 'inactive'"
            >
              <span class="status-dot"></span>
              {{ item.employee?.status || "Inactive" }}
            </div>
          </div>

          <!-- Contact Information -->
          <div class="contact-section">
            <div class="contact-item">
              <div class="contact-icon">
                <q-icon name="phone" size="16px" />
              </div>
              <div class="contact-info">
                <span class="label">Phone</span>
                <span class="value">{{
                  formatPhoneNumber(item.employee?.phone) || "No phone"
                }}</span>
              </div>
            </div>

            <!-- <div class="contact-item">
              <div class="contact-icon">
                <q-icon name="email" size="16px" />
              </div>
              <div class="contact-info">
                <span nclass="label">Email</span>
                <span>{{ item.employee?.email || "No email provided" }}</span>
              </div>
            </div> -->

            <div class="contact-item">
              <div class="contact-icon">
                <q-icon name="cake" size="16px" />
              </div>
              <div class="contact-info">
                <span class="label">Birthdate</span>
                <span class="value">{{
                  formatDate(item.employee?.birthdate)
                }}</span>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">
                <q-icon name="location_on" size="16px" />
              </div>
              <div class="contact-info">
                <span class="label">Address</span>
                <span class="value">{{
                  capitalizeFirstLetter(item.employee?.address || "No address")
                }}</span>
              </div>
            </div>
          </div>

          <!-- Employment Details -->
          <div class="employment-section">
            <div class="section-title">
              <q-icon name="assignment_ind" size="18px" />
              <span>Employment Details</span>
            </div>

            <div class="details-grid">
              <div class="detail-box">
                <span class="detail-label">Employment Type</span>
                <span>{{
                  getEmploymentType(item.employee?.employment_type_id)
                }}</span>
              </div>

              <div class="detail-box">
                <span class="detail-label">Designation</span>
                <span class="detail-value">{{
                  item.employee?.designation || "N/A"
                }}</span>
              </div>

              <div class="detail-box">
                <span class="detail-label">Work Schedule</span>
                <span class="detail-value"
                  >{{ item.time_in || "08:00" }} -
                  {{ item.time_out || "17:00" }}</span
                >
              </div>

              <div class="detail-box">
                <span class="detail-label">Sex</span>
                <span class="detail-value">{{
                  item.employee?.sex || "Not specified"
                }}</span>
              </div>
            </div>
          </div>

          <!-- Branch Assignment -->
          <div class="branch-assignment" v-if="item.branch">
            <div class="branch-badge">
              <q-icon name="business" size="16px" />
              <span>{{ item.branch.name }}</span>
            </div>
            <div class="branch-location">
              <q-icon name="location_on" size="14px" />
              {{ item.branch.location || "Main Branch" }}
            </div>
          </div>

          <!-- Timestamps -->
          <div class="timestamps">
            <div class="timestamp-item">
              <q-icon name="event" size="12px" />
              <span>Joined: {{ formatDate(item.created_at) }}</span>
            </div>

            <div class="timestamp-item">
              <q-icon name="update" size="12px" />
              <span>Updated: {{ formatDate(item.updated_at) }}</span>
            </div>
          </div>
        </div>

        <!-- Touch Ripple Effect -->
        <div class="touch-ripple"></div>
      </div>
    </div>

    <!-- Floating Action Button -->
    <!-- <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" class="fab-moder">
        <q-tooltip anchor="top left" self="bottom right">
          Add Employee
        </q-tooltip>
      </q-btn>
    </q-page-sticky> -->

    <!-- Employee Details Dialog -->
    <q-dialog v-model="showDetails" position="bottom" full-width>
      <q-card class="employee-details-dialog">
        <q-card-section class="dialog-header">
          <div class="row items-center justify-between">
            <div class="text-h6">Employee Details</div>
            <q-btn v-close-popup flat round dense icon="close" />
          </div>
        </q-card-section>

        <q-card-section v-if="selectedEmployee" class="dialog-content">
          <!-- Full details view -->
          <div class="employee-profile-header">
            <q-avatar size="80px" class="profile-avatar">
              <img :src="getEmployeeAvatar(selectedEmployee.employee)" />
            </q-avatar>

            <div class="profile-info">
              <div class="profile-name">
                {{ formatFullname(selectedEmployee.employee) }}
              </div>
              <div class="profile-position">
                {{ selectedEmployee.employee?.position || "Staff" }}
              </div>
              <div class="profile-id">
                ID: EMP-{{
                  String(selectedEmployee.employee?.id).padStart(4, "0") ||
                  "N/A"
                }}
              </div>
            </div>
          </div>

          <div class="details-section">
            <div class="details-row">
              <div class="details-label">Phone</div>
              <div class="details-value">
                {{ selectedEmployee.employee?.phone || "N/A" }}
              </div>
            </div>

            <!-- <div class="details-row">
              <div class="details-label">Email</div>
              <div class="details-value">
                {{ selectedEmployee.employee?.email || "N/A" }}
              </div>
            </div> -->

            <div class="details-row">
              <div class="details-label">Birthdate</div>
              <div class="details-value">
                {{ formatDate(selectedEmployee.employee?.birthdate) }}
              </div>
            </div>

            <div class="details-row">
              <div class="details-label">Address</div>
              <div class="details-value">
                {{
                  capitalizeFirstLetter(
                    selectedEmployee.employee?.address || "N/A"
                  )
                }}
              </div>
            </div>

            <div class="details-row">
              <div class="details-label">Employment Type</div>
              <div>
                {{
                  getEmploymentType(
                    selectedEmployee.employee?.employment_type_id
                  )
                }}
              </div>
            </div>

            <div class="details-row">
              <div class="details-label">Designation</div>
              <div class="details-value">
                {{ selectedEmployee.employee?.designation || "N/A" }}
              </div>
            </div>

            <div class="details-row">
              <div class="details-label">Work Schedule</div>
              <div>
                {{ selectedEmployee.employee?.time_in || "08:00" }} -
                {{ selectedEmployee.employee?.time_out || "17:00" }}
              </div>
            </div>

            <div class="details-row">
              <div class="details-label">Sex</div>
              <div class="details-value">
                {{ selectedEmployee.employee?.sex || "N/A" }}
              </div>
            </div>

            <div class="details-row">
              <div class="details-label">Branch</div>
              <div class="details-value">
                {{ selectedEmployee.branch?.name || "N/A" }} -
                {{ selectedEmployee.branch?.location || "" }}
              </div>
            </div>

            <div class="details-row">
              <div class="details-label">Status</div>
              <div class="details-value">
                <span
                  class="status-badge"
                  :class="
                    selectedEmployee.employee?.status?.toLocaleLowerCase() ||
                    'inactive'
                  "
                >
                  {{ selectedEmployee.employee?.status || "Inactive" }}
                </span>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="dialog-actions">
          <q-btn flat label="Close" color="primary" v-close-popup />
          <q-btn
            flat
            label="Edit"
            color="primary"
            @click="editEmployee(selectedEmployee)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { typographyFormat } from "src/composables/typography/typography-format";
import { useEmployeeStore } from "src/stores/employee";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const $q = useQuasar();
const { formatDate, formatFullname, capitalizeFirstLetter } =
  typographyFormat();

const employeeStore = useEmployeeStore();

const branchEmployee = computed(() => employeeStore.branchEmployees || []);

// State
const filter = ref("");
const quickFilter = ref("all");
const loading = ref(false);
const showDetails = ref(false);
const selectedEmployee = ref(null);

// Branch ID from route
const branchId = route.params.branch_id;

console.log("branchId", branchId);

// Filters
const filters = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "On Leave", value: "on leave" },
  { label: "Inactive", value: "inactive" },
];

// Computed properties for stats
const totalEmployees = computed(() => branchEmployee.value.length);

const activeEmployees = computed(
  () =>
    branchEmployee.value.filter(
      (item) => item.employee?.status?.toLowerCase() === "active"
    ).length
);

const onLeaveCount = ref("0");

// Filtered employees based on search and quick filter
const filteredEmployees = computed(() => {
  let filtered = branchEmployee.value;

  // Apply quick filter
  if (quickFilter.value !== "all") {
    filtered = filtered.filter(
      (emp) => emp.employee?.status?.toLowerCase() === quickFilter.value
    );
  }

  // Apply search filter
  if (filter.value) {
    const searchTerm = filter.value.toLocaleLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.employee?.firstname?.toLowerCase().includes(searchTerm) ||
        item.employee?.lastname?.toLowerCase().includes(searchTerm) ||
        item.employee?.middlename?.toLowerCase().includes(searchTerm) ||
        item.employee?.position?.toLowerCase().includes(searchTerm) ||
        item.employee?.phone?.includes(searchTerm) ||
        item.employee?.email?.toLowerCase().includes(searchTerm)
    );
  }
  return filtered;
});

// Methods
const fetchBranchEmployees = async () => {
  if (!branchId) return;

  loading.value = true;

  try {
    await employeeStore.fetchBranchEmployee(branchId);
  } catch (error) {
    console.error("Failed to fetch branch employees: ", error);
    $q.notify({
      type: "negative",
      message: "Failed to load employees",
      position: "top",
    });
  } finally {
    loading.value = false;
  }
};

const getEmployeeAvatar = (employee) => {
  if (!employee)
    return `https://ui-avatars.com/api/?name=NA&background=667eea&color=fff&size=128`;

  if (employee?.avatar) return employee.avatar;

  // Generate avatar from initials
  const firstInitial = employee?.firstname?.[0] || "";
  const lastInitial = employee?.lastname?.[0] || "";
  const initials = firstInitial + lastInitial || "NA";

  return `https://ui-avatars.com/api/?name=${initials}&background=667eea&color=fff&size=128`;
};

const formatPhoneNumber = (phone) => {
  if (!phone) return null;
  // Format: (+63) 095 - 661 - 5819 (if it matches your format)
  return phone;
};

const getEmploymentType = (typeId) => {
  const types = {
    1: "Regular",
    2: "Probationary",
    3: "Contractual",
    4: "Part-time",
    5: "Trainee",
  };
  return types[typeId] || "Regular";
};

const viewEmployeeDetails = (item) => {
  selectedEmployee.value = item;

  showDetails.value = true;
};

const addEmployee = () => {
  $q.notify({
    type: "info",
    message: "Add new employee",
    position: "top",
  });

  // Navigate to add employee page or open form
};

const editEmployee = (employee) => {
  $q.notify({
    type: "info",
    message: `Edit employee: ${formatFullname(employee)}`,
    position: "top",
  });

  showDetails.value = false;
  // Navigate to edit page or open edit form
};

// Watch for filter changes
watch(filter, () => {
  // Filtering is done locally, no need to refetch
});

// LIfecycle
onMounted(() => {
  fetchBranchEmployees();
});
</script>

<style lang="scss" scoped>
.mobile-employees {
  min-height: 100vh;
  background: linear-gradient(180deg, #f8faff 0%, #f0f3fa 100%);
}

/* Premium Header */
.premium-header {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  padding-bottom: 40px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 50%
    );
  }

  .header-content {
    position: relative;
    z-index: 2;
    padding-bottom: 40px;
  }

  .header-avatar {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.3);
  }

  .header-curve {
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 40px;
    background: #f8faff;
    border-radius: 40px 40px 0 0;
  }
}

/* Glass Search */
.glass-search {
  :deep(.q-field__control) {
    background: rgba(255, 255, 255, 0.2) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    color: white;

    &::before {
      border: none !important;
    }
  }

  :deep(.q-field__native) {
    color: white;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }
}

/* Stats Cards */
.stats-section {
  position: relative;
  z-index: 10;
  margin-top: -30px;
}

.stat-card-modern {
  position: relative;
  padding: 16px 8px;
  border-radius: 24px;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:active {
    transform: scale(0.95);
  }

  .stat-icon {
    width: 40px;
    height: 40px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 8px;
    position: relative;
    z-index: 2;
  }

  .stat-value {
    font-size: 20px;
    font-weight: 700;
    color: #1e293b;
    position: relative;
    z-index: 2;
  }

  .stat-label {
    font-size: 12px;
    color: #64748b;
    position: relative;
    z-index: 2;
  }

  .stat-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(102, 126, 234, 0.1),
      transparent 70%
    );
    z-index: 1;
  }

  &.primary-stat .stat-icon {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  &.success-stat .stat-icon {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
  }

  &.warning-stat .stat-icon {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
  }
}

/* Quick Filters */
.filter-scroll {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 0;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.filter-pill {
  padding: 8px 20px !important;
  border-radius: 30px !important;
  background: white !important;
  color: #64748b !important;
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;

  &.active-pill {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    color: white !important;
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
  }
}

/* Loading State */
.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;

  .loading-animation {
    text-align: center;
  }
}

/* Modern Employee Card */
.employee-card-modern {
  position: relative;
  margin-bottom: 20px;
  border-radius: 28px;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:active {
    transform: scale(0.98);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
  }

  .card-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(135deg, #f8faff 0%, #ffffff 100%);

    &.active {
      background: linear-gradient(135deg, #e8f5e9 0%, #ffffff 100%);
    }

    &.on-leave {
      background: linear-gradient(135deg, #fff3e0 0%, #ffffff 100%);
    }

    &.inactive {
      background: linear-gradient(135deg, #ffebee 0%, #ffffff 100%);
    }
  }

  .card-content {
    position: relative;
    z-index: 2;
    padding: 16px;
  }

  .employee-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  .employee-avatar-section {
    display: flex;
    gap: 12px;
    flex: 1;
  }

  .avatar-wrapper {
    position: relative;

    .avatar {
      border-radius: 24px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .status-indicator {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2px solid white;

      &.active {
        background: #10b981;
      }

      &.on-leave {
        background: #f59e0b;
      }

      &.inactive {
        background: #ef4444;
      }
    }
  }

  .employee-basic-info {
    flex: 1;

    .employee-name {
      font-size: 18px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 4px;
    }

    .employee-position {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
      color: #667eea;
      margin-bottom: 2px;
    }

    .employee-id {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      color: #94a3b8;
    }
  }

  .employee-status-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 30px;
    font-size: 12px;
    font-weight: 600;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    &.active {
      color: #10b981;
      .status-dot {
        background: #10b981;
      }
    }

    &.on-leave {
      color: #f59e0b;
      .status-dot {
        background: #f59e0b;
        animation: pulse 1.5s infinite;
      }
    }

    &.inactive {
      color: #ef4444;
      .status-dot {
        background: #ef4444;
      }
    }
  }

  /* Contact Section */
  .contact-section {
    background: #f8fafc;
    border-radius: 20px;
    padding: 12px;
    margin-bottom: 16px;

    .contact-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 0;

      &:not(:last-child) {
        border-bottom: 1px solid #edf2f7;
      }

      .contact-icon {
        width: 32px;
        height: 32px;
        border-radius: 12px;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #667eea;
      }

      .contact-info {
        flex: 1;
        display: flex;
        flex-direction: column;

        .label {
          font-size: 11px;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .value {
          font-size: 14px;
          color: #1e293b;
          font-weight: 500;
        }
      }
    }
  }

  /* Employment Section */
  .employment-section {
    margin-bottom: 16px;

    .section-title {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      font-weight: 600;
      color: #475569;
      margin-bottom: 12px;

      .q-icon {
        color: #667eea;
      }
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;

      .detail-box {
        background: #f8fafc;
        border-radius: 16px;
        padding: 10px;

        .detail-label {
          display: block;
          font-size: 10px;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }

        .detail-value {
          font-size: 13px;
          font-weight: 600;
          color: #1e293b;
        }
      }
    }
  }

  /* Branch Assignment */
  .branch-assignment {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(135deg, #667eea10, #764ba210);
    border-radius: 16px;
    padding: 12px;
    margin-bottom: 12px;

    .branch-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 600;
      color: #667eea;
    }

    .branch-location {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      color: #64748b;
    }
  }

  /* Timestamps */
  .timestamps {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
    border-top: 1px dashed #edf2f7;

    .timestamp-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 10px;
      color: #94a3b8;
    }
  }

  .touch-ripple {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at var(--x, 50%) var(--y, 50%),
      rgba(102, 126, 234, 0.1),
      transparent 80%
    );
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;
  }
}

/* Empty State */
.empty-state-modern {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 32px;
  text-align: center;

  .empty-illustration {
    position: relative;
    margin-bottom: 24px;

    .search-icon {
      position: absolute;
      bottom: 0;
      right: -10px;
    }
  }

  .empty-title {
    font-size: 20px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 8px;
  }

  .empty-subtitle {
    font-size: 14px;
    color: #94a3b8;
    margin-bottom: 24px;
  }

  .clear-btn {
    border-radius: 30px;
    padding: 8px 24px;
    background: #f8faff;
  }
}

/* FAB */
.fab-modern {
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.9);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
}

/* Employee Details Dialog */
.employee-details-dialog {
  border-radius: 30px 30px 0 0;

  .dialog-header {
    padding: 20px;
    border-bottom: 1px solid #edf2f7;
  }

  .dialog-content {
    padding: 20px;
    max-height: 70vh;
    overflow-y: auto;
  }

  .employee-profile-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #edf2f7;

    .profile-avatar {
      border-radius: 30px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .profile-info {
      .profile-name {
        font-size: 20px;
        font-weight: 700;
        color: #1e293b;
      }

      .profile-position {
        font-size: 14px;
        color: #667eea;
        margin-bottom: 4px;
      }

      .profile-id {
        font-size: 12px;
        color: #94a3b8;
      }
    }
  }

  .details-section {
    .details-row {
      display: flex;
      padding: 12px 0;
      border-bottom: 1px solid #f1f5f9;

      .details-label {
        width: 120px;
        font-size: 13px;
        color: #64748b;
      }

      .details-value {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        color: #1e293b;

        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 600;

          &.active {
            background: #e8f5e9;
            color: #10b981;
          }

          &.on-leave {
            background: #fff3e0;
            color: #f59e0b;
          }

          &.inactive {
            background: #ffebee;
            color: #ef4444;
          }
        }
      }
    }
  }

  .dialog-actions {
    padding: 16px 20px;
    border-top: 1px solid #edf2f7;
  }
}

/* Animations */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 380px) {
  .stat-card-modern {
    padding: 12px 4px;

    .stat-value {
      font-size: 18px;
    }
    .stat-label {
      font-size: 10px;
    }
  }

  .employee-name {
    font-size: 16px !important;
  }

  .details-grid {
    grid-template-columns: 1fr !important;
  }

  .branch-assignment {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 8px;
  }
}
</style>
