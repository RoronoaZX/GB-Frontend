<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    v-model="dialog"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card
      class="leave-form-card"
      style="min-width: 380px; max-width: 550px; width: 100%"
    >
      <!-- Animated Header -->
      <div class="form-header">
        <div class="header-gradient"></div>
        <div class="header-content">
          <div class="row items-center justify-between">
            <div>
              <q-icon name="event_note" size="28px" class="q-mr-sm" />
              <span>{{
                isEditing ? "Edit Leave Request" : "Request Leave"
              }}</span>
            </div>
            <q-btn
              flat
              round
              dense
              icon="close"
              v-close-popup
              class="close-btn"
            />
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
          <!-- Employee Selection (Supervisor Only) -->
          <div v-if="isSupervisor" class="field-wrapper">
            <div class="field-label">
              <q-icon name="person" size="18px" class="q-mr-xs" />
              <span>Select Employee</span>
              <span class="required-star">*</span>
            </div>
            <q-select
              v-model="formData.employee_id"
              :options="employeeOptions"
              outlined
              dense
              placeholder="Choose employee"
              emit-value
              map-options
              option-label="label"
              option-value="value"
              :rules="[(val) => !!val || 'Please select an employee']"
              class="elegant-select"
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" class="employee-option">
                  <q-item-section avatar>
                    <q-avatar size="36px">
                      <!-- <img :src="getEmployeeAvatar(scope.opt.employee)" /> -->
                      sample Avatar
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-medium">
                      {{ scope.opt.label }}
                    </q-item-label>
                    <q-item-label caption>
                      {{ scope.opt.position }} • ID: EMP-{{
                        String(scope.opt.employee.id).padStart(4, "0")
                      }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-badge
                      :color="
                        getLeaveBalanceColor(scope.opt.employee.leave_balance)
                      "
                      rounded
                    >
                      {{ scope.opt.employee.leave_balance || 0 }} days left
                    </q-badge>
                  </q-item-section>
                </q-item>
              </template>

              <template v-slot:selected>
                <div v-if="selectedEmployee" class="selected-employee">
                  <q-avatar size="24px" class="q-mr-sm">
                    <!-- <img :src="getEmployeeAvatar(selectedEmployee)" /> -->
                    sample Avatar
                  </q-avatar>
                  <span>{{ formatFullname(selectedEmployee) }}</span>
                  <q-badge
                    :color="
                      getLeaveBalanceColor(selectedEmployee.leave_balance)
                    "
                    class="q-ml-sm"
                    rounded
                  >
                    {{ selectedEmployee.leave_balance || 0 }} days
                  </q-badge>
                </div>
              </template>
            </q-select>
          </div>

          <!-- Leave Type Selection -->
          <div class="field-wrapper">
            <div class="field-label">
              <q-icon name="category" size="18px" class="q-mr-xs" />
              <span>Leave Type</span>
              <span class="required-star">*</span>
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
                  <div class="card-title">{{ type.label }}</div>
                  <div class="card-description">{{ type.description }}</div>
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
          <div class="row q-col-gutter-md">
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
                  placeholder="Select date"
                  :rules="[(val) => !!val || 'Start date required']"
                  class="date-input"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="formData.start_date"
                          :options="disablePastDates"
                          @update:model-value="calculatedDays"
                          mask="YYYY-MM-DD"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="field-wrapper">
                <div class="field-label">
                  <q-icon name="event" size="18px" class="q-mr-xs" />
                  <span>End Date</span>
                  <span class="required-star">*</span>
                </div>
                <q-input
                  v-model="formData.end_date"
                  outlined
                  dense
                  aria-placeholder="Select date"
                  :rules="[(val) => !!val || 'End date required']"
                  class="date-input"
                >
                  <template v-slot:append>
                    <q-icon nma="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="formData.end_date"
                          :options="disablePastDates"
                          @update:model-value="calculatedDays"
                          mask="YYYY-MM-DD"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
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
              <div class="calc-item">
                <div class="calc-label">Total Days</div>
                <div class="calc-value">
                  {{ calculatedDays }}
                  <span class="calc-unit">
                    day{{ calculatedDays !== 1 ? "s" : "" }}
                  </span>
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
              <div class="calc-item">
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
              :value="calculatedDays / currentBalance"
              :color="remainingBalance >= 0 ? 'primary' : 'negative'"
              class="balance-progress q-mt-md"
              style="height: 4px; border-radius: 2px"
            />
            <div
              v-if="calculatedDays > currentBalance"
              class="warning-message q-mt-sm"
            >
              <q-icon name="warning" size="14px" />
              <span
                >Insufficient leave balance. You need
                {{ calculatedDays - currentBalance }} more days(s).</span
              >
            </div>
          </div>

          <!-- Reason Field -->
          <div class="field-wrapper">
            <div class="field-label">
              <q-icon name="description" size="18px" class="q-mt-xs" />
              <span>Reason</span>
              <span class="optional-badge">Optional </span>
            </div>
            <q-input
              v-model="formData.reason"
              outlined
              dense
              type="textarea"
              rows="3"
              placeholder="Please provider a brief reason for your leave request..."
              counter
              maxlength="500"
              class="reason-input"
            />
          </div>

          <!-- Attachment Section -->
          <div class="field-wrapper">
            <div class="field-label">
              <q-icon name="attach_file" size="18px" class="q-mr-xs" />
              <span>Attachment</span>
              <span class="optional-badge">Optional</span>
            </div>
            <div class="attachment-area" @click="triggerFileInput">
              <input
                ref="fileInput"
                type="file"
                accept=".pdf,.doc,.jpg,.png,.jpeg"
                style="display: none"
                @change="handleFileChange"
              />
              <div v-if="!formData.attachment" class="attachment-placeholder">
                <q-icon name="cloud_upload" size="32px" color="grey-5" />
                <div class="placeholder-text">
                  Click to upload or drag and drop
                </div>
                <div class="placeholder-hint">PDF, DOC, JPG, PNG (Max 5MB)</div>
              </div>
              <div v-else class="attachment-preview">
                <q-icon
                  :name="getFileIcon(formData.attachment.name)"
                  size="32px"
                  :color="getFileColor(formData.attachment.name)"
                />
                <div class="file-info">
                  <div class="file-name">{{ formData.attachment.name }}</div>
                  <div class="file-size">
                    {{ formatFileSize(formData.attachment.size) }}
                  </div>
                </div>

                <q-btn
                  flat
                  dense
                  icon="close"
                  size="sm"
                  @click.stop="removeAttachment"
                />
              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="q-pa-md bg-white">
        <div class="form-actions">
          <q-btn flat label="Cancel" v-close-popup class="cancel-btn" />
          <q-btn
            type="submit"
            form="leaveForm"
            :label="isEditing ? 'Update Request' : 'Submit Request'"
            color="primary"
            :loading="submitting"
            class="submit-btn"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useQuasar, Notify, useDialogPluginComponent } from "quasar";
import { useEmployeeLeaveStore } from "src/stores/employee-leave";
import { typographyFormat } from "src/composables/typography/typography-format";
import { useSupervisorStore } from "src/stores/supervisor";

const { formatFullname, formatDate } = typographyFormat();

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const dialog = ref(false);
const maximizedToggle = ref(true);

const $q = useQuasar();
const leaveStore = useEmployeeLeaveStore();

const props = defineProps({
  modelValue: Boolean,
  employee: Object,
  isSupervisor: {
    type: Boolean,
    default: false,
  },
  employeeList: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue", "submitted"]);

// Internal state
const internalDialog = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const submitting = ref(false);
const isEditing = ref(false);

// Form data
const formData = ref({
  employee_id: props.employee?.id || null,
  leave_type: null,
  start_date: null,
  end_date: null,
  reason: "",
  attachment: null,
});

// Leave types with gradients
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
    gradient: "linear-gradient(135deg, #ec4489a, #db2777)",
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
  return props.employeeList.map((emp) => ({
    label: formatFullname(emp.employee || emp),
    value: emp.employee?.id || emp.id,
    position: emp.employee?.position || emp.position || "Staff",
    employee: emp.employee || emp,
  }));
});

const selectedEmployee = computed(() => {
  if (!formData.value.employee_id) return props.employee;

  return employeeOptions.value.find(
    (opt) => opt.value === formData.value.employee_id
  )?.employee;
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
  calculateDays.value = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
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
  if (!formData.value.leave_type) {
    Notify.create({
      type: "warning",
      message: "Please select a leave type",
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
    const submitData = new FormData();
    submitData.append("leave_type", formData.value.leave_type);
    submitData.append("start_date", formData.value.start_date);
    submitData.append("end_date", formData.value.end_date);
    submitData.append("total_days", calculatedDays.value);
    submitData.append("reason", formData.value.reason || "");

    if (formData.value.employee_id) {
      submitData.append("employee_id", formData.value.employee_id);
    }

    if (formData.value.attachment) {
      submitData.append("attachment", formData.value.attachment);
    }

    await leaveStore.createLeaveRequest(submitData);

    Notify.create({
      type: "positive",
      message: isEditing.value
        ? "Leave request updated successfully"
        : "leave request submitted successfully",
      position: "top",
      timeout: 3000,
    });

    emit("submitted");
    internalDialog.value = false;
    resetForm();
  } catch (error) {
    Notify.create({
      type: "negative",
      message: error.message || "Failed to submit leave request",
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

  calculateDays.value = 0;
  isEditing.value = false;
};

// Watch for employee changes
watch(
  () => formData.value.employee_id,
  () => {
    // Reset dates when employee changes
    formData.value.start_date = null;
    formData.value.end_date = null;
    calculateDays.value = 0;
  }
);
</script>

<style lang="scss" scoped>
.leave-form-card {
  border-radius: 28px;
  overflow: hidden;
  background: white;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
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
    background: 0;
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

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

.scrollable-form-content {
  flex-grow: 1;
  overflow-y: auto;

  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
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
  background: linear-gradient(135deg, #f8fafc, #ffffff);
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
    :deep(.q.linear-progress__track) {
      background: #e2e8f0;
    }
  }

  .warning-message {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #fef2f2;
    padding: 8px;
    border-radius: 8px;
  }
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

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
    }
  }
}

.elegant-select {
  :deep(.q-field__control) {
    border-radius: 14px;
  }
}

.date-input {
  :deep(.q-field__control) {
    border-radius: 14px;
  }
}

.reason-input {
  :deep(.q-field__control) {
    border-radius: 14px;
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

// Responsive
@media (max-width: 600px) {
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
}
</style>
