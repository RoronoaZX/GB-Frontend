<template>
  <q-page class="q-pa-md bg-slate-50 relative-position">
    <!-- Top-Docked Progress Bar -->
    <q-linear-progress
      v-if="loading || loadingEmployeeId"
      indeterminate
      color="teal"
      class="absolute-top"
      style="z-index: 999; height: 3px;"
    />

    <!-- ========================================================= -->
    <!-- START: FILTERING AND SEARCH CONTROLS                    -->
    <!-- ========================================================= -->
    <div class="row items-center justify-between q-col-gutter-md q-mb-lg">
      <!-- Left Side: Search Box & Filter Toggle Button -->
      <div class="col-12 col-md-8 flex items-center q-gap-md no-wrap">
        <q-input
          outlined
          dense
          v-model="searchQuery"
          placeholder="Search employee..."
          class="bg-white col-grow rounded-borders"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          outline
          color="teal"
          icon="tune"
          :label="showFilters ? 'Hide Filters' : 'Filters'"
          @click="showFilters = !showFilters"
          class="q-px-md font-weight-bold"
          no-caps
        />
      </div>

      <!-- Right Side: Count -->
      <div class="col-auto text-subtitle2 text-grey-7 text-weight-medium">
        Total Employees: {{ filteredEmployees.length }}
      </div>
    </div>

    <!-- Collapsible Advanced Filters Drawer -->
    <q-slide-transition>
      <div v-show="showFilters" class="q-mb-lg">
        <q-card flat bordered class="q-pa-md filter-drawer-card">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-4">
              <q-select
                outlined
                dense
                v-model="selectedType"
                :options="typeOptions"
                label="Employment Type"
                class="bg-white"
                clearable
                behavior="menu"
              >
                <template v-slot:prepend>
                  <q-icon name="workspaces_outline" color="teal" />
                </template>
              </q-select>
            </div>
            <div class="col-12 col-sm-4">
              <q-select
                outlined
                dense
                v-model="selectedStatus"
                :options="statusOptions"
                label="Status"
                class="bg-white"
                clearable
                behavior="menu"
              >
                <template v-slot:prepend>
                  <q-icon name="show_chart" color="teal" />
                </template>
              </q-select>
            </div>
            <div class="col-12 col-sm-4">
              <q-select
                outlined
                dense
                v-model="selectedRole"
                :options="roleOptions"
                label="Role/Position"
                class="bg-white"
                clearable
                behavior="menu"
              >
                <template v-slot:prepend>
                  <q-icon name="badge" color="teal" />
                </template>
              </q-select>
            </div>
          </div>
        </q-card>
      </div>
    </q-slide-transition>

    <div class="row q-col-gutter-lg">
      <!-- ========================================================= -->
      <!-- START: SKELETON LOADER                                  -->
      <!-- ========================================================= -->
      <template v-if="loading">
        <div v-for="n in 8" :key="n" class="col-12 col-sm-6 col-md-4 col-lg-3">
          <q-card flat bordered class="payslip-mock-card">
            <q-card-section class="q-pb-none text-center q-pt-md">
              <div class="row items-center justify-between no-wrap q-mb-sm">
                <q-skeleton type="QChip" width="60px" height="20px" />
                <q-skeleton type="text" width="40px" />
              </div>
              <div class="q-my-md">
                <q-skeleton type="text" width="50%" class="q-mx-auto" />
                <q-skeleton type="text" width="70%" class="q-mx-auto q-mt-xs" height="32px" />
              </div>
            </q-card-section>
            <div class="receipt-divider"></div>
            <q-card-section class="q-pt-none">
              <div class="row items-center q-gutter-x-md q-mb-md">
                <q-skeleton type="QAvatar" size="56px" />
                <div class="col">
                  <q-skeleton type="text" width="80%" />
                  <q-skeleton type="text" width="50%" class="q-mt-xs" />
                </div>
              </div>
              <q-list dense>
                <q-item v-for="i in 3" :key="i" class="q-px-none">
                  <q-item-section avatar style="min-width: 32px">
                    <q-skeleton type="QAvatar" size="20px" />
                  </q-item-section>
                  <q-item-section>
                    <q-skeleton type="text" width="70%" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </template>

      <!-- ========================================================= -->
      <!-- START: EMPLOYEE CARDS (Main Content)                    -->
      <!-- ========================================================= -->
      <template v-else>
        <!-- No Results Message -->
        <div
          v-if="filteredEmployees.length === 0"
          class="col-12 text-center text-grey-7 q-mt-xl"
        >
          <q-icon name="person_search" size="4em" />
          <div class="text-h6 q-mt-md">No employees found</div>
          <p>Try adjusting your search or filter criteria.</p>
        </div>

        <!-- Employee Card Loop -->
        <div
          v-for="employee in filteredEmployees"
          :key="employee.id"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <q-card
            class="payslip-mock-card"
            flat
            bordered
          >
            <!-- Receipt Header Section: Large Daily Rate -->
            <q-card-section class="receipt-header-section q-pb-none q-pt-md">
              <div class="row items-center justify-between no-wrap q-mb-sm">
                <q-chip
                  :icon="getStatusChip(employee.status).icon"
                  :color="getStatusChip(employee.status).chipColor"
                  :text-color="getStatusChip(employee.status).chipTextColor"
                  class="text-weight-bold"
                  size="xs"
                >
                  {{ getStatusChip(employee.status).label }}
                </q-chip>
                <div class="text-caption text-grey-5 text-weight-bold numeric-font">
                  ID: {{ String(employee.id).padStart(4, '0') }}
                </div>
              </div>

              <!-- Top metric: Net Pay / Daily Salary Rate -->
              <div class="q-my-md text-center">
                <div class="text-caption text-grey-6 text-uppercase tracking-wider text-weight-bold">Daily Salary Rate</div>
                <div class="text-h4 text-weight-bolder text-teal-9 numeric-font q-mt-xs">
                  {{ formatCurrency(employee.employment_type?.salary) }}
                </div>
              </div>
            </q-card-section>

            <!-- Dashed Tear Line / Divider -->
            <div class="receipt-divider"></div>

            <!-- Receipt Body: Employee Profile details -->
            <q-card-section class="q-pt-none">
              <!-- Middle section: Avatar, Name, and Role -->
              <div class="row items-center q-gutter-x-md q-mb-md">
                <q-avatar size="56px" class="shadow-1">
                  <q-img
                    :src="employee.avatar || defaultAvatar"
                    :error-src="defaultAvatar"
                    spinner-color="teal"
                  />
                </q-avatar>
                <div class="col">
                  <div class="text-subtitle1 text-weight-bold text-slate-8 leading-tight">
                    {{ formatFullname(employee) }}
                  </div>
                  <div class="text-caption text-grey-7 text-weight-medium">
                    {{ employee.position }}
                  </div>
                </div>
              </div>

              <!-- Metadata List -->
              <q-list dense class="q-gutter-y-xs">
                <!-- Designation and Category -->
                <q-item class="q-px-none">
                  <q-item-section avatar style="min-width: 32px">
                    <q-icon name="storefront" color="grey-6" size="18px" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-grey-8 ellipsis text-weight-medium">
                      {{ employee?.designation?.name || "N/A" }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-chip outline color="teal" size="sm" class="q-ma-none text-weight-bold">
                      {{ employee.employment_type?.category || "N/A" }}
                    </q-chip>
                  </q-item-section>
                </q-item>

                <!-- Email -->
                <q-item class="q-px-none">
                  <q-item-section avatar style="min-width: 32px">
                    <q-icon name="email" color="grey-6" size="18px" />
                  </q-item-section>
                  <q-item-section>
                    <a
                      :href="'mailto:' + (employee?.user_designation?.email || '')"
                      class="contact-pill"
                    >
                      {{ employee?.user_designation?.email || "N/A" }}
                    </a>
                  </q-item-section>
                </q-item>

                <!-- Phone -->
                <q-item class="q-px-none">
                  <q-item-section avatar style="min-width: 32px">
                    <q-icon name="phone" color="grey-6" size="18px" />
                  </q-item-section>
                  <q-item-section>
                    <a
                      :href="'tel:' + (employee.phone || '').replace(/\D/g, '')"
                      class="contact-pill"
                    >
                      {{ employee.phone || "N/A" }}
                    </a>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

            <!-- Footer: View Details -->
            <q-card-section class="q-pt-none">
              <div class="row items-center justify-end">
                <a
                  href="#"
                  class="text-weight-bold text-teal text-decoration-none row items-center q-gutter-x-xs"
                  style="cursor: pointer;"
                  @click.prevent="handleViewDetailsClick(employee)"
                >
                  <span>View Details</span>
                  <q-icon name="arrow_forward_ios" size="0.65em" />
                </a>
              </div>
            </q-card-section>

            <!-- INDIVIDUAL CARD LOADING SPINNER -->
            <q-inner-loading
              :showing="loadingEmployeeId === employee.id"
              label="Compiling DTR..."
              label-class="text-teal"
              label-style="font-size: 1.1em; font-weight: bold"
            >
              <q-spinner-ios size="50px" color="teal" />
            </q-inner-loading>
          </q-card>
        </div>
      </template>
    </div>
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="100"
      :offset="[18, 18]"
      transition-show="jump-up"
      transition-hide="jump-down"
    >
      <q-btn
        icon="keyboard_arrow_up"
        round
        size="md"
        text-color="white"
        @click="scrollToTop"
        class="gradient-btn"
      >
        <q-tooltip class="gradient-tooltip"> Back to top </q-tooltip>
      </q-btn>
    </q-page-scroller>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { useEmployeeStore } from "src/stores/employee";
import { usePayslipStore } from "src/stores/payslip";
import { formatFullname } from "src/composables/employeeFunction/useEmployeeFunctions";
import defaultAvatar from "src/assets/boy-avatar.png";

const employeeStore = useEmployeeStore();
const payslipStore = usePayslipStore();
const router = useRouter();

// Reactive state
const employeesSample = computed(() => employeeStore.employees);
const employeesData = ref([]);
const loading = ref(true);
const loadingEmployeeId = ref(null);

// Filtering state
const searchQuery = ref("");
const selectedType = ref(null);
const selectedStatus = ref(null);
const selectedRole = ref(null);
const showFilters = ref(false);

const formatCurrency = (value) => {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue === 0) {
    return "₱0.00";
  }
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(numValue);
};

const typeOptions = ref([]);
const statusOptions = ref([]);
const roleOptions = ref([]);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const fetchEmployees = async () => {
  loading.value = true;
  try {
    employeesSample.value =
      await employeeStore.fetchEmployeeWithEmploymentTypeAndDesignation();
    const { data } = employeesSample.value;
    employeesData.value = data;

    if (data && data.length > 0) {
      typeOptions.value = [
        ...new Set(data.map((e) => e.employment_type?.category).filter(Boolean)),
      ];
      roleOptions.value = [...new Set(data.map((e) => e.position).filter(Boolean))];
      statusOptions.value = [...new Set(data.map((e) => e.status).filter(Boolean))];
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
  } finally {
    loading.value = false;
  }
};

const filteredEmployees = computed(() => {
  let filtered = employeesData.value || [];

  // Filter by Establishment Location (Branch vs Warehouse vs Global)
  const estVal = payslipStore.selectedEstablishment;
  if (estVal && estVal !== "global") {
    if (estVal.startsWith("branch-")) {
      const branchId = parseInt(estVal.replace("branch-", ""), 10);
      filtered = filtered.filter(
        (employee) =>
          employee.branch_employee?.branch_id === branchId ||
          employee.branch_employee?.branch?.id === branchId
      );
    } else if (estVal.startsWith("warehouse-")) {
      const warehouseId = parseInt(estVal.replace("warehouse-", ""), 10);
      filtered = filtered.filter(
        (employee) =>
          employee.warehouse_employee?.warehouse_id === warehouseId ||
          employee.warehouse_employee?.warehouse?.id === warehouseId
      );
    }
  }

  if (searchQuery.value) {
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    filtered = filtered.filter((employee) =>
      formatFullname(employee).toLowerCase().includes(lowerCaseQuery)
    );
  }

  if (selectedType.value) {
    filtered = filtered.filter(
      (employee) => employee.employment_type?.category === selectedType.value
    );
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(
      (employee) => employee.status === selectedStatus.value
    );
  }

  if (selectedRole.value) {
    filtered = filtered.filter(
      (employee) => employee.position === selectedRole.value
    );
  }

  return filtered;
});

onMounted(() => {
  fetchEmployees();
});

const handleViewDetailsClick = (employee) => {
  loadingEmployeeId.value = employee.id;

  setTimeout(() => {
    if (loadingEmployeeId.value === employee.id) {
      loadingEmployeeId.value = null;
    }
  }, 5000);

  setTimeout(() => {
    router.push({
      name: "employee-profile-page",
      params: { employee_id: employee.id },
    });
  }, 300);
};

onBeforeRouteLeave(() => {
  loadingEmployeeId.value = null;
});

const statusConfig = {
  Active: {
    label: "Active",
    chipColor: "green-6",
    chipTextColor: "white",
    icon: "lens",
    borderColor: "#68B984",
  },
  Invited: {
    label: "Invited",
    chipColor: "grey-10",
    chipTextColor: "white",
    icon: "check",
    borderColor: "#333333",
  },
  Inactive: {
    label: "Inactive",
    chipColor: "grey-4",
    chipTextColor: "grey-8",
    icon: "pause",
    borderColor: "#BDBDBD",
  },
};

function getStatusChip(status) {
  return statusConfig[status] || statusConfig.Inactive;
}
</script>

<style lang="scss" scoped>
.payslip-mock-card {
  background: radial-gradient(circle at top right, rgba(13, 148, 136, 0.03) 0%, rgba(255, 255, 255, 1) 100%);
  border-radius: 16px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  background-color: white;
}

.payslip-mock-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -4px rgba(15, 23, 42, 0.08), 0 8px 16px -4px rgba(15, 23, 42, 0.04);
}

.receipt-divider {
  border-top: 2px dashed #cbd5e1;
  height: 1px;
  width: 100%;
  margin: 16px 0;
  position: relative;

  &::before, &::after {
    content: '';
    position: absolute;
    top: -6px;
    width: 12px;
    height: 12px;
    background-color: #f8fafc;
    border-radius: 50%;
  }

  &::before {
    left: -7px;
    border-right: 1px solid rgba(226, 232, 240, 0.8);
  }

  &::after {
    right: -7px;
    border-left: 1px solid rgba(226, 232, 240, 0.8);
  }
}

.numeric-font {
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
}

.filter-drawer-card {
  border-radius: 12px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
}

.contact-pill {
  display: block;
  width: 100%;
  padding: 4px 12px;
  border-radius: 16px;
  background-color: #eaf2ff;
  color: #0052cc;
  font-size: 0.9em;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.3s;
}

.contact-pill:hover {
  background-color: #dbe8ff;
}

.gradient-btn {
  background: linear-gradient(135deg, #0ca289, #2bbbb2);
  box-shadow: 0 4px 12px rgba(12, 162, 137, 0.4);
  transition: all 0.3s ease;
}

.gradient-btn:hover {
  filter: brightness(1.1);
}

.gradient-tooltip {
  background: linear-gradient(135deg, #0ca289, #2bbbb2);
  color: white;
  box-shadow: 0 4px 8px rgba(12, 162, 137, 0.3);
}
</style>
