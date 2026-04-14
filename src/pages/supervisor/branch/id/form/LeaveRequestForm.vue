<template>
  <q-dialog
    ref="dialogRef"
    v-model="dialog"
    @hide="onDialogHide"
    @cancel="onDialogHide"
    :maximized="maximizedToggle"
    transition-show="slide-left"
    transition-hide="slide-right"
  >
    <q-card class="leave-form-card">
      <!-- Animated Header -->
      <div class="form-header">
        <div class="header-gradient"></div>
        <div class="header-content">
          <div class="row items-center justify-between">
            <div>
              <q-icon name="event_note" size="28px" class="q-mr-sm" />
              <span>
                {{ isEditing ? "Edit Leave Request" : "Request Leave" }}
              </span>
            </div>
            <div class="row q-gutter-sm">
              <q-btn
                flat
                round
                dense
                :icon="maximizedToggle ? 'fullscreen_exit' : 'fullscreen'"
                @click="toggleMaximize"
                class="close-btn"
              />
              <q-btn
                flat
                round
                dense
                icon="close"
                v-close-popup
                class="close-btn"
              />
            </div>
          </div>
          <div class="text-caption q-mt-xs">
            {{
              isEditing
                ? "Update your leave request details"
                : "Fill out the form to request time off"
            }}
          </div>
        </div>
      </div>

      <q-card-section class="q-pa-lg scrollable-form-content">
        <q-form @submit="submitForm" id="leaveForm" class="q-gutter-md">
          <!-- Enhanced Employee Selection with Search -->
          <div v-if="isSupervisor" class="field-wrapper">
            <div class="field-label">
              <q-icon name="person" size="18px" class="q-mr-xs" />
              <span>Select Employee</span>
              <span class="required-star">*</span>
            </div>

            <!-- Search Input -->
            <div class="employee-search-container" ref="searchContainerRef">
              <q-input
                v-model="employeeSearch"
                outlined
                dense
                placeholder="Search by name, ID, or position..."
                class="employee-search-input"
                @update:model-value="filterEmployees"
                @focus="showEmployeeDropDown = true"
              >
                <template v-slot:prepend>
                  <q-icon
                    name="close"
                    class="cursor-pointer"
                    size="18px"
                    color="grey-6"
                    @click="clearSearch"
                  />
                </template>
              </q-input>

              <!-- Search Results Dropdown - Fixed to show no-results -->
              <div v-if="showEmployeeDropDown" class="employee-dropdown">
                <div v-if="filteredEmployeeOptions.length > 0">
                  <div class="dropdown-header">
                    <span class="text-caption text-grey-6">
                      <q-icon name="people" size="14px" />
                      {{ filteredEmployeeOptions.length }} employee(s) found
                    </span>
                    <q-btn
                      flat
                      round
                      dense
                      icon="close"
                      size="xs"
                      @click="showEmployeeDropDown = false"
                    />
                  </div>
                  <q-scroll-area style="height: 320px">
                    <div
                      v-for="emp in filteredEmployeeOptions"
                      :key="emp.value"
                      class="employee-search-item"
                      :class="{ selected: formData.employee_id === emp.value }"
                      @click="selectEmployee(emp)"
                    >
                      <div class="employee-avatar-wrapper">
                        <q-avatar size="44px" class="employee-avatar">
                          <img :src="getEmployeeAvatar(emp.employee)" />
                        </q-avatar>
                        <div
                          class="status-indicator-small"
                          :class="emp.employee?.status?.toLowerCase()"
                        ></div>
                      </div>

                      <div class="employee-info">
                        <div class="employee-name">
                          {{ emp.label }}
                          <q-badge
                            :color="
                              getLeaveBalanceColor(emp.employee.leave_balance)
                            "
                            rounded
                            class="q-ml-sm"
                            size="sm"
                          >
                            {{ emp.employee.leave_balance || 0 }} days left
                          </q-badge>
                        </div>

                        <div class="employee-deatils">
                          <span class="employee-position">
                            <q-icon name="work" size="12px" />
                            {{ emp.position }}
                          </span>
                          <span class="employee-id">
                            <q-icon name="badge" size="12px" />
                            ID: EMP-{{
                              String(emp.employee.id).padStart(4, "0")
                            }}
                          </span>
                          <span
                            class="employee-status"
                            :class="emp.employee?.status?.toLowerCase()"
                          >
                            <span class="status-dot"></span>
                            {{ emp.employee?.status || "Active" }}
                          </span>
                        </div>
                      </div>

                      <q-btn
                        flat
                        round
                        dense
                        icon="chevron_right"
                        color="primary"
                        size="sm"
                      />
                    </div>
                  </q-scroll-area>
                </div>

                <!-- No Results Section - Now properly displayed -->
                <div v-else class="no-results-content">
                  <q-icon name="search_off" size="56px" color="grey-4" />
                  <div class="text-subtitle1 q-mt-md text-grey-7">
                    No employees found
                  </div>
                  <div class="text-subtitle1 q-mt-xs text-grey-5">
                    Try searching with different keywords
                  </div>
                  <div class="suggestions q-mt-md">
                    <div class="text-caption text-grey-6">Suggestions:</div>
                    <ul class="suggestions-list">
                      <li>Check the spelling of the name</li>
                      <li>Try using the employee ID</li>
                      <li>Search by position or department</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Selected Employee Display -->
              <div v-if="selectedEmployee" class="selected-employee-card">
                <div class="selected-employee-content">
                  <q-avatar size="48px" class="selected-avatar">
                    <img :src="getEmployeeAvatar(selectedEmployee)" />
                  </q-avatar>

                  <div class="selected-info">
                    <div class="selected-name">
                      {{ formatFullname(selectedEmployee) }}
                      <q-badge
                        :color="
                          getLeaveBalanceColor(selectedEmployee.leave_balance)
                        "
                        rounded
                        class="q-ml-sm"
                      >
                        {{ selectedEmployee.leave_balance || 0 }} days left
                      </q-badge>
                    </div>

                    <div class="selected-details">
                      <span>{{ selectedEmployee.position || "Staff" }}</span>
                      <span class="separator">•</span>
                      <span
                        >ID: EMP-{{
                          String(selectedEmployee.id).padStart(4, "0")
                        }}</span
                      >
                      <span class="separator">•</span>
                      <span
                        class="status-text"
                        :class="selectedEmployee?.status?.toLowerCase()"
                      >
                        <span class="status-dot-small"></span>
                        {{ selectedEmployee?.status || "Active" }}
                      </span>
                    </div>
                  </div>
                  <q-btn
                    flat
                    round
                    dense
                    icon="edit"
                    size="sm"
                    color="primary"
                    @click="changeEmployee"
                  >
                    <q-tooltip>Change Employee</q-tooltip>
                  </q-btn>
                </div>
              </div>
            </div>
          </div>

          <!-- Leave Type Selection -->
          <div class="field-wrapper">
            <div class="field-label">
              <q-icon name="category" size="18px" class="q-mr-xs" />
              <span>Leave Type</span>
              <span class="reqiured-star">*</span>
            </div>
            <div class="leave-type-grid">
              <div
                v-for="type in leaveTypes"
                :key="type.value"
                class="leave-type-card"
                :class="{ active: formData.leave_type === type.value }"
                @click="formData.leave_type = type.value"
              >
                <div class="card-icon" :style="{ background: type.gradient }">
                  <q-icon :name="type.icon" size="24px" />
                </div>

                <div class="card-info">
                  <div class="card-title">
                    {{ type.label }}
                  </div>
                  <div class="card-description">
                    {{ type.description }}
                  </div>
                  <q-icon
                    v-if="formData.leave_type === type.value"
                    name="check_circle"
                    size="20px"
                    class="check-icon"
                    color="primary"
                  />
                </div>
              </div>
            </div>

            <!-- Date Range Selection -->
            <div class="row q-col-gutter-md q-mt-sm">
              <div class="col-12 col-sm-6">
                <div class="field-wrapper">
                  <div class="field-label">
                    <q-icon name="event" size="18px" class="q-mr-xs" />
                    <span>Start Date</span>
                    <span class="required-star">*</span>
                  </div>
                  <q-input
                    v-model="formData.start_date"
                    outlined
                    dense
                    type="date"
                    placeholder="YYYY-MM-DD"
                    :rules="[(val) => !!val || 'Start date required']"
                    class="date-input"
                    @update:model-value="calculateDays"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer" />
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="col-12 col-sm-6">
                <div class="field-wrapper">
                  <div class="field-label">
                    <q-icon name="event" size="18px" class="q-mr-xs" />
                    <span>End Date</span>
                    <span class="required">*</span>
                  </div>

                  <q-input
                    v-model="formData.end_date"
                    outlined
                    type="date"
                    dense
                    placeholder="YYYY-MM-DD"
                    :rules="[(val) => !!val || 'End date required']"
                    class="date-input"
                    @update:model-value="calculateDays"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer" />
                    </template>
                  </q-input>
                </div>
              </div>
            </div>

            <!-- Days Calculation Card -->
            <div
              v-if="formData.start_date && formData.end_date"
              class="calculation-card"
            >
              <div class="row items-center justify-between">
                <div class="calc-label">Total Days</div>
                <div class="calc-value">
                  {{ calculatedDays }}
                  <span class="calc-unit"
                    >day{{ calculatedDays !== 1 ? "s" : "" }}</span
                  >
                </div>
              </div>
              <div class="calc-divider"></div>
              <div class="calc-item">
                <div class="calc-label">Available Balance</div>
                <div
                  class="calc-value"
                  :class="{ 'text-negative': calculatedDays > currentBalance }"
                >
                  {{ currentBalance }}
                  <span class="calc-unit">days</span>
                </div>
              </div>
              <div class="calc-divider"></div>
              <div class="clac-item">
                <div class="calc-label">Remaining</div>
                <div
                  class="calc-value"
                  :class="{ 'text-negative': remainingBalance < 0 }"
                >
                  {{ remainingBalance }}
                  <span class="calc-unit">days</span>
                </div>
              </div>
            </div>

            <q-linear-progress
              :value="Math.min(calculatedDays / currentBalance, 1)"
              :color="remainingBalance >= 0 ? 'primary' : 'negative'"
              class="balance-progress q-mt-md"
              style="height: 4px; border-radius: 2px"
            />
            <div
              v-if="calculatedDays > currentBalance"
              class="warning-message q-mt-sm"
            >
              <q-icon name="warning" size="14px" />
              <span>
                Insufficient leave balance. Yopu need
                {{ calculatedDays - currentBalance }} more day(s).
              </span>
            </div>
          </div>

          <!-- Reason Field -->

          <div class="field-wrapper">
            <div class="field-label">
              <q-icon name="description" size="18px" class="q-mr-sm" />
              <span>Reason</span>
              <span class="optional-badge">Optional</span>
            </div>

            <q-input
              v-model="formData.reason"
              outlined
              dense
              type="textarea"
              rows="3"
              placeholder="Please provide a brief reason for your leave request..."
              counter
              maxlength="500"
              class="reason-input"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="q-pa-md bg-white">
        <div class="form-actions">
          <q-btn flat label="Cancel" vclose-popup class="cancel-btn" />
          <q-btn
            typre="submit"
            form="leaveForm"
            :label="isEditing ? 'Update Request' : 'Submit Request'"
            class="submit-btn"
            :loading="submitting"
            @click="submitForm"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Notify, useDialogPluginComponent, useQuasar } from "quasar";
import { formatMinutesToHoursMinutes } from "src/composables/employee-payroll-dtr/timeUtils";
import { typographyFormat } from "src/composables/typography/typography-format";
import { useEmployeeLeaveStore } from "src/stores/employee-leave";
import { computed, ref, watch } from "vue";

const { formatFullname, formatDate } = typographyFormat();

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const dialog = ref(false);
const maximizedToggle = ref(false);
const searchContainerRef = ref(null);

const $q = useQuasar();
const leaveStore = useEmployeeLeaveStore();

const props = defineProps({
  modelValue: Boolean,
  employee: {
    type: Object,
    default: null,
  },
  isSupervisor: {
    type: Boolean,
    default: false,
  },
  employeeList: {
    type: Array,
    default: () => [],
  },
});

console.log("propdsss... ", props);

const emit = defineEmits(["update:modelValue", "submitted"]);

// Internal state
const internalDialog = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const submitting = ref(false);
const isEditing = ref(false);
const employeeSearch = ref("");
const showEmployeeDropDown = ref(false);
const filteredEmployeeOptions = ref([]);

// Form data
const formData = ref({
  employee_id: props.employee?.id || null,
  leave_type: null,
  start_date: null,
  end_date: null,
  reason: "",
  attachment: null,
});

// Leaves types with gradients
const leaveTypes = [
  {
    value: "sick_leave",
    label: "Sick Leave",
    icon: "sick",
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    description: "Medical leave with doctor's' note",
  },
  {
    value: "vacation_leave",
    label: "Vacation Leave",
    icon: "beach_access",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    description: "Annual vacation leave",
  },
  {
    value: "emergency_leave",
    label: "Emergency Leave",
    icon: "warning",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    description: "Urgent personal matters",
  },
  {
    value: "maternity_leave",
    label: "Maternity Leave",
    icon: "pregnant_woman",
    gradient: "linear-gradient(135deg, #ec4489, #db2777)",
    description: "Maternity benefits",
  },
  {
    value: "paternity_leave",
    label: "Paternity Leave",
    icon: "family_restroom",
    gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
    description: "Paternity benefits",
  },
  {
    value: "bereavement_leave",
    label: "Bereavement Leave",
    icon: "sentiment_dissatisfied",
    gradient: "linear-gradient(135deg, #6b7280, #4b5563)",
    description: "Family bereavement",
  },
];

// Employee options for supervisor
const employeeOptions = computed(() => {
  return props.employeeList.map((item) => {
    const employee = item.employee || item;

    return {
      label: formatFullname(employee),
      value: employee.id,
      position: employee.position || "Staff",
      employee: employee,
      status: employee.status,
      leave_balance: employee.leave_balance || 15,
    };
  });
});

// Filter employees based on search
const filterEmployees = () => {
  if (!employeeSearch.value.trim()) {
    filteredEmployeeOptions.value = employeeOptions.value;
    return;
  }

  const searchTerm = employeeSearch.value.toLowerCase().trim();

  filteredEmployeeOptions.value = employeeOptions.value.filter((emp) => {
    const employee = emp.employee;
    return (
      (employee?.firstname?.toLowerCase() || "").includes(searchTerm) ||
      (employee?.middlename?.toLowerCase() || "").includes(searchTerm) ||
      (employee?.lastname?.toLowerCase() || "").includes(searchTerm) ||
      (emp.position?.toLowerCase() || "").includes(searchTerm) ||
      (String(employee?.id) || "").includes(searchTerm) ||
      (employee?.email?.toLowerCase() || "").includes(searchTerm)
    );
  });
};

// Alternative: Fuzzy search version (more flexible)
const filterEmployeeFuzzy = () => {
  if (!employeeSearch.value.trim()) {
    filteredEmployeeOptions.value = employeeOptions.value;
    return;
  }

  const searchTerm = employeeSearch.value.toLowerCase().trim();
  const searchWords = searchTerm.split(/\s+/);

  filteredEmployeeOptions.value = employeeOptions.value.filter((emp) => {
    const employee = emp.employee;
    // Combine all name parts into one string for searching
    const fullNameString = `${employee?.firstname || ""} ${
      employee?.middlename || ""
    } ${employee?.lastname || ""}`;
    const fullNameLower = fullNameString.toLowerCase();

    // Check if any search word matches any part of the name
    const matchesName = searchWords.some(
      (word) =>
        fullNameLower.includes(word) ||
        (employee?.firstname?.toLowerCase() || "").includes(word) ||
        (employee?.middlename?.toLowerCase() || "").includes(word) ||
        (employee?.lastname?.toLowerCase() || "").includes(word)
    );

    // Check other fields
    const matchesOther =
      (emp.position?.toLowerCase() || "").includes(searchTerm) ||
      (String(employee?.id) || "").includes(searchTerm) ||
      (employee?.email?.toLowerCase() || "").includes(searchTerm);

    return matchesName || matchesOther;
  });
};

// Use the enhanced filter function
const clearSearch = () => {
  employeeSearch.value = "";
  filteredEmployeeOptions.value = employeeOptions.value;
  showEmployeeDropDown.value = true;
};

const selectEmployee = (employee) => {
  formData.value.employee_id = employee.value;
  employeeSearch.value = "";
  showEmployeeDropDown.value = false;
};

const changeEmployee = () => {
  formData.value.employee_id = null;
  employeeSearch.value = "";
  showEmployeeDropDown.value = true;
};

const toggleMaximize = () => {
  maximizedToggle.value = !maximizedToggle.value;
};

const selectedEmployee = computed(() => {
  if (!formData.value.employee_id) return props.employee;
  const found = employeeOptions.value.find(
    (opt) => opt.value === formData.value.employee_id
  );
  return found?.employee || null;
});

const currentBalance = computed(() => {
  return selectedEmployee.value?.leave_balance || 15;
});

const calculatedDays = ref(0);

const remainingBalance = computed(() => {
  return currentBalance.value - calculatedDays.value;
});

// Methods
const calculateDays = () => {
  if (!formData.value.start_date || !formData.value.end_date) {
    calculatedDays.value = 0;

    return;
  }

  const start = new Date(formData.value.start_date);
  const end = new Date(formData.value.end_date);

  if (start > end) {
    Notify.create({
      type: "negative",
      message: "End date must be after start date",
      position: "top",
    });

    calculatedDays.value = 0;

    return;
  }

  const diffTime = Math.abs(end - start);
  calculatedDays.value = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

const disablePastDates = (date) => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  return date >= today;
};

const getEmployeeAvatar = (employee) => {
  if (!employee)
    return `https://ui-avatars.com/api/?name=NA&background=668eea&color-fff&size=128`;

  if (employee?.avatar) return employee.avatar;
  const firstInitial = employee?.firstname?.[0] || "";
  const lastInitial = employee?.lastname?.[0] || "";
  const initials = firstInitial + lastInitial || "NA";

  return `https://ui-avatar.com/api/?name=${initials}&background=667eea&color=fff&size=128`;
};

const getLeaveBalanceColor = (balance) => {
  if (balance >= 10) return "positive";
  if (balance > -5) return "warning";
  return "negative";
};

const triggerFileInput = () => {
  $q.refs.fileInput?.click();
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      Notify.create({
        type: "negative",
        message: "File size must be less than 5MB",
        position: "top",
      });
      return;
    }

    formData.value.attachment = file;
  }
};

const removeAttachment = () => {
  formData.value.attachment = null;
  if ($q.refs.fileInput) {
    $q.refs.fileInput.value = "";
  }
};

const getFileIcon = (filename) => {
  const ext = filename.split(".").pop().toLowerCase();

  const icons = {
    pdf: "picture_as_pdf",
    doc: "description",
    docx: "description",
    jpg: "image",
    jpeg: "image",
    png: "image",
  };

  return icons[ext] || "insert_drive_file";
};

const getFileColor = (filename) => {
  const ext = filename.split(".").pop().toLowerCase();

  const colors = {
    pdf: "negative",
    doc: "primary",
    docx: "primary",
    jpg: "info",
    jpeg: "info",
    png: "info",
  };

  return colors[ext] || grey;
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const submitForm = async () => {
  if (!formData.value.employee_id) {
    Notify.create({
      type: "warning",
      message: "Please select an employee for the leave request",
      position: "top",
    });
    return;
  }

  if (!formData.value.leave_type) {
    Notify.create({
      type: "warning",
      message: "Please select a leave type",
      position: "top",
    });
    return;
  }

  if (!formData.value.start_date) {
    Notify.create({
      type: "warning",
      message: "Please choose a start date",
      position: "top",
    });
    return;
  }

  if (!formData.value.end_date) {
    Notify.create({
      type: "warning",
      message: "Please choose an end date",
      position: "top",
    });
    return;
  }

  if (calculatedDays.value <= 0) {
    Notify.create({
      type: "negative",
      message: "Please provide a valid date range for your leave",
      position: "top",
    });
    return;
  }

  if (calculatedDays.value > currentBalance.value) {
    Notify.create({
      type: "negative",
      message: `Insufficient leave balance. You need ${
        calculatedDays.value - currentBalance.value
      } more day(s).`,
      position: "top",
    });
    return;
  }

  submitting.value = true;

  try {
    const payload = {
      employee_id: formData.value.employee_id,
      leave_type: formData.value.leave_type,
      start_date: formData.value.start_date,
      end_date: formData.value.end_date,
      total_days: calculatedDays.value,
      reason: formData.value.reason || "",
    };

    console.log("payload....", payload);

    await leaveStore.createLeaveRequest(payload);

    Notify.create({
      type: "positive",
      message: isEditing.value
        ? "Leave request updated successfully"
        : "Leave request submitted successfully",
      position: "top",
      timeout: 3000,
    });

    emit("submitted");
    dialogRef.value?.hide();
    resetForm();
  } catch (error) {
    Notify.create({
      type: "negative",
      message: error?.message || "Failed to submit leave request",
      position: "top",
    });
  } finally {
    submitting.value = false;
  }
};

const resetForm = () => {
  formData.value = {
    employee_id: props.employee?.id || null,
    leave_type: null,
    start_date: null,
    end_date: null,
    reason: "",
    attachment: null,
  };

  calculatedDays.value = 0;
  isEditing.value = false;
};

// Watch for employee changes
watch(
  () => formData.value.employee_id,
  () => {
    // Reset dates when employee changes
    formData.value.start_date = null;
    formData.value.end_date = null;
    calculatedDays.value = 0;
  }
);
</script>

<style lang="scss" scoped>
.leave-form-card {
  border-radius: 28px;
  overflow: hidden;
  background: white;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
}

.form-header {
  flex-shrink: 0;
  position: relative;
  padding: 24px 24px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  .header-gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 70%
    );
  }

  .header-content {
    position: relative;
    z-index: 1;
  }

  .close-btn {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.05);
    }
  }
}

.scrollable-form-content {
  flex-grow: 1;
  overflow: auto;
  max-height: calc(90vh - 180px);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;

    &:hover {
      background: #94a3b8;
    }
  }
}

/* Employee Search Style */
.employee-search-container {
  position: relative;
}

.employee-search-input {
  :deep(.q-field__control) {
    border-radius: 14px;
    background: white;
  }
}

.employee-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  z-index: 1000;
  overflow: hidden;
  animation: slideDown 0.2s ease;

  .dropdown-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }
}

/* No Results Section Styling */
.no-results-content {
  padding: 48px 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;

  .q-icon {
    opacity: 0.5s;
    margin-bottom: 8px;
    transition: all 0.3s ease;
  }

  .suggestions {
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid #e2e8f0;
    text-align: left;

    .suggestion-list {
      margin: 8px 0 0 20px;
      padding: 0;

      li {
        font-size: 12px;
        color: #64748b;
        margin: 4px 0;

        &::marker {
          color: #667eea;
        }
      }
    }
  }
}

.employee-search-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f1f5f9;

  &:hover {
    background: #f8fafc;
    transform: translateX(4px);
  }

  &.selected {
    background: #eef2ff;
    border-left: 3px solid #667eea;
  }

  .employee-avatar-wrapper {
    position: relative;
    flex-shrink: 0;

    .employee-avatar {
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .status-indicator-small {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 10px;
      height: 10px;
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

  .employee-info {
    flex: 1;

    .employee-name {
      font-weight: 600;
      font-size: 14px;
      color: #1e293b;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 4px;
    }

    .employee-details {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 12px;
      color: #64748b;
      flex-wrap: wrap;

      .employee-position,
      .employee-id {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .employee-status {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 2px 8px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 500;

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        &.active {
          background: #e8f5e9;
          color: #10b981;
          .status-dot {
            background: #10b981;
          }
        }

        &.inactive {
          background: #ffebee;
          color: #ef4444;
          .status-dot {
            background: #ef4444;
          }
        }

        &.on-leave {
          background: #fff3e0;
          color: #f59e0b;
          .status-dot {
            background: #f59e0b;
          }
        }
      }
    }
  }
}

.selected-employee-card {
  margin-top: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #f8fafc, #ffffff);
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  animation: slideUp 0.3s ease;

  .selected-employee-content {
    display: flex;
    align-items: center;
    gap: 16px;

    .selected-avatar {
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .selected-info {
      flex: 1;

      .selected-name {
        font-weight: 700;
        font-size: 16px;
        color: #1e293b;
        margin-block: 4px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
      }

      .selected-details {
        font-size: 12px;
        color: #64748b;
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;

        .separator {
          color: #cbd5e1;
        }

        .status-text {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          border-radius: 20px;
          font-weight: 500;

          .status-dot-small {
            width: 6px;
            height: 6px;
            border-radius: 50%;
          }

          &.active {
            background: #e8f5e9;
            color: #10b981;
            .status-dot-small {
              background: #10b981;
            }
          }

          &.inactive {
            background: #ffebbe;
            color: #ef4444;
            .status-dot-small {
              background: #ef4444;
            }
          }

          &.on-leave {
            background: #fff3e0;
            color: #f59e0b;
            .status-dot-small {
              background: #f59e0b;
            }
          }
        }
      }
    }
  }
}

.field-wrapper {
  margin-bottom: 20px;

  .field-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 500;
    color: #1e293b;
    margin-bottom: 8px;

    .required-star {
      color: #ef4444;
      margin-left: 2px;
    }

    .optional-badge {
      font-size: 11px;
      font-weight: normal;
      color: #94a3b8;
      background: #f1f5f9;
      padding: 2px 8px;
      border-radius: 20px;
      margin-left: 8px;
    }
  }
}

.leave-type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;

  .leave-type-card {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      border-color: #cbd5e1;
    }

    &.active {
      background: linear-gradient(135deg, #f0f9ff, #e6f3ff);
      border-color: #667eea;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
    }

    .card-icon {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .card-info {
      flex: 1;

      .card-title {
        font-weight: 600;
        font-size: 14px;
        color: #1e293b;
        margin-bottom: 2px;
      }

      .card-description {
        font-size: 11px;
        color: #64748b;
      }
    }

    .check-icon {
      position: absolute;
      top: 8px;
      right: 8px;
    }
  }
}

.calculation-card {
  background: linear-gradient(135deg, 3f8fafc, #ffffff);
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 16px;
  margin: 20px 0;

  .calc-item {
    flex: 1;
    text-align: center;

    .calc-label {
      font-size: 12px;
      color: #64748b;
      margin-bottom: 6px;
    }

    .calc-value {
      font-size: 24px;
      font-weight: 700;
      color: #1e293b;

      .calc.unit {
        font-size: 12px;
        font-weight: normal;
        color: #94a3b8;
      }

      &.text-negative {
        color: #ef4444;
      }
    }
  }

  .calc-divider {
    width: 1px;
    height: 40px;
    background: #e2e8f0;
  }

  .balance-progress {
    :deep(.q-linear-progress__track) {
      background: #e2e8f0;
    }
  }

  .warning-message {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #ef4444;
    background: #fef2f2;
    padding: 8px;
    border-radius: 8px;
  }
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;

  .cancel-btn {
    min-width: 100px;
    border-radius: 30px;
  }

  .submit-btn {
    min-width: 140px;
    border-radius: 30px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
    }
  }
}

.elegant-select,
.date-input,
.reason-input {
  :deep(.q-field__control) {
    border-radius: 14px;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Responsive
@media (max-width: 600px) {
  .leave-form-card {
    max-width: 100%;
    border-radius: 0;
  }

  .leave-type-grid {
    grid-template-columns: 1fr;
  }

  .calculation-card {
    .row {
      flex-direction: column;
      gap: 12px;
    }

    .calc-divider {
      display: none;
    }
  }

  .selected-employee-card {
    .selected-employee-content {
      flex-direction: column;
      text-align: center;
      .selected-info {
        text-align: center;
      }
    }
  }

  .employee-search-item {
    .employee-info {
      .employee-details {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }
    }
  }

  .no-results-content {
    padding: 32px 24px;
  }
}

.q-card-action {
  flex-shrink: 0;
  border-top: 1px solid #f1f5f9;
}

.form-actions {
  margin-top: 0 !important;
  padding: 0 8px;
}

.attachment-area {
  border: 2px dashed #cbd5e1;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    background: #f8fafc;
  }

  .attachment-placeholder {
    padding: 24px;
    text-align: center;

    .placeholder-text {
      margin-top: 8px;
      font-size: 14px;
      color: #64748b;
    }

    .placeholder-hint {
      font-size: 11px;
      color: #94a3b8;
      margin-top: 4px;
    }
  }

  .attachment-preview {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: #f8fafc;
    border-radius: 12px;

    .file-info {
      flex: 1;
      .file-name {
        font-size: 14px;
        font-weight: 500;
        color: #1e293b;
      }

      .file-size {
        font-size: 11px;
        color: #94a3b8;
      }
    }
  }
}

.selected-employee {
  display: flex;
  align-items: center;
}

.employee-option {
  padding: 8px;

  &:hover {
    background: #f8fafc;
  }
}
</style>
