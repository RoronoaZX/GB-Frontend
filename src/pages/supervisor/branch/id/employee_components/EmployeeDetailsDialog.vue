<template>
  <q-dialog v-model="dialogValue" position="bottom" full-width transition-show="slide-up" transition-hide="slide-down">
    <q-card class="employee-details-card" v-if="employee">
      <div class="drag-handle-wrapper">
        <div class="drag-handle"></div>
      </div>

      <q-card-section class="dialog-header-modern">
        <div class="header-text">
          <h6 class="text-h5 text-weight-bolder q-my-none">Employee Profile</h6>
        </div>
        <q-btn v-close-popup flat round dense icon="close" class="close-icon-btn" />
      </q-card-section>

      <q-card-section class="dialog-body-modern">
        <div class="modern-profile-header">
          <div class="avatar-container">
            <EmployeeAvatar :employee="employee.employee" size="84px" />
          </div>
          <div class="profile-info">
            <div class="profile-name">{{ fullName }}</div>
            <div class="profile-position">
              {{ employee.employee?.position || "Staff" }}
            </div>
            <div class="profile-badge">
              <q-icon name="badge" size="14px" class="q-mr-xs" />
              EMP-{{ String(employee.employee?.id || 0).padStart(4, "0") }}
            </div>
          </div>
        </div>

        <div class="modern-details-section">
          <div class="details-row">
            <div class="details-label">Designation</div>
            <div class="details-value">
              {{
                capitalizeFirstLetter(
                  employee.employee?.designation?.designation_type || "N/A"
                )
              }}
            </div>
          </div>

          <div class="details-row">
            <div class="details-label">Branch</div>
            <div class="details-value">
              {{ employee.branch?.name || "N/A" }}
              <q-btn
                flat
                round
                dense
                icon="edit"
                size="sm"
                color="primary"
                class="edit-icon-btn"
              >
                <q-popup-edit
                  v-model="branchValue"
                  @save="(val) => $emit('update-branch', val)"
                  buttons
                  title="Edit Branch"
                  v-slot="scope"
                >
                  <q-select
                    v-model="scope.value"
                    :options="branchOptions"
                    autofocus
                    option-label="label"
                    option-value="value"
                    emit-value
                    map-options
                    dense
                    outlined
                  />
                </q-popup-edit>
              </q-btn>
            </div>
          </div>

          <div class="details-row">
            <div class="details-label">Position</div>
            <div class="details-value">
              {{ employee.employee?.position || "Staff" }}
              <q-btn
                flat
                round
                dense
                icon="edit"
                size="sm"
                color="primary"
                class="edit-icon-btn"
              >
                <q-popup-edit
                  v-model="positionValue"
                  @save="(val) => $emit('update-position', val)"
                  buttons
                  title="Edit Position"
                  v-slot="scope"
                >
                  <q-select
                    v-model="scope.value"
                    :options="positionOptions"
                    autofocus
                    emit-value
                    map-options
                    outlined
                    dense
                  />
                </q-popup-edit>
              </q-btn>
            </div>
          </div>

          <div class="details-row">
            <div class="details-label">Phone</div>
            <div class="details-value">
              {{ formatPhoneNumber(employee.employee?.phone) || "N/A" }}
              <q-btn
                flat
                round
                dense
                icon="edit"
                size="sm"
                color="primary"
                class="edit-icon-btn"
              >
                <q-popup-edit
                  v-model="phoneValue"
                  @save="(val) => $emit('update-phone', val)"
                  buttons
                  title="Edit Phone"
                  v-slot="scope"
                >
                  <q-input
                    v-model="scope.value"
                    dense
                    autofocus
                    mask="+(63) ### - ### - ####"
                    counter
                  />
                </q-popup-edit>
              </q-btn>
            </div>
          </div>

          <div class="details-row">
            <div class="details-label">Birthdate</div>
            <div class="details-value">
              {{ formatDate(employee.employee?.birthdate) }}
            </div>
          </div>

          <div class="details-row">
            <div class="details-label">Address</div>
            <div class="details-value">
              {{ capitalizeFirstLetter(employee.employee?.address || "N/A") }}
            </div>
          </div>

          <div class="details-row">
            <div class="details-label">Time In</div>
            <div class="details-value schedule-value">
              <span>{{
                employee.employee?.branch_employee?.time_in || "08:00"
              }}</span>
              <div class="schedule-edit-icons">
                <q-btn
                  flat
                  round
                  dense
                  icon="edit"
                  size="sm"
                  color="primary"
                  class="edit-icon-btn"
                >
                  <q-popup-edit
                    v-model="timeInValue"
                    @save="(val) => $emit('update-time-in', val)"
                    buttons
                    title="Edit Time In"
                    v-slot="scope"
                  >
                    <q-input
                      v-model="scope.value"
                      dense
                      autofocus
                      mask="##:## AA"
                      :rules="[validateTimeFormat]"
                      hint="Format: 01:00 AM/PM"
                    />
                  </q-popup-edit>
                </q-btn>
              </div>
            </div>
          </div>

          <div class="details-row">
            <div class="details-label">Time Out</div>
            <div class="details-value schedule-value">
              <span>{{
                employee.employee?.branch_employee?.time_out || "17:00"
              }}</span>
              <div class="schedule-edit-icons">
                <q-btn
                  flat
                  round
                  dense
                  icon="edit"
                  size="sm"
                  color="primary"
                  class="edit-icon-btn"
                >
                  <q-popup-edit
                    v-model="timeOutValue"
                    @save="(val) => $emit('update-time-out', val)"
                    buttons
                    title="Edit Time Out"
                    v-slot="scope"
                  >
                    <q-input
                      v-model="scope.value"
                      dense
                      autofocus
                      mask="##:## AA"
                      :rules="[validateTimeFormat]"
                      hint="Format: 05:00 PM"
                    />
                  </q-popup-edit>
                </q-btn>
              </div>
            </div>
          </div>

          <div class="details-row">
            <div class="details-label">Sex</div>
            <div class="details-value">
              {{ employee.employee?.sex || "N/A" }}
              <q-btn
                flat
                round
                dense
                icon="edit"
                size="sm"
                color="primary"
                class="edit-icon-btn"
              >
                <q-popup-edit
                  v-model="sexValue"
                  @save="(val) => $emit('update-sex', val)"
                  buttons
                  title="Edit Gender"
                  v-slot="scope"
                >
                  <q-select
                    v-model="scope.value"
                    :options="genderOptions"
                    autofocus
                    emit-value
                    map-options
                    outlined
                    dense
                  />
                </q-popup-edit>
              </q-btn>
            </div>
          </div>

          <div class="details-row">
            <div class="details-label">Employment Type</div>
            <div class="details-value">
              {{ getEmploymentTypeName(employee.employee?.employment_type_id) }}
              <q-btn
                flat
                round
                dense
                icon="edit"
                size="sm"
                color="primary"
                class="edit-icon-btn"
              >
                <q-popup-edit
                  v-model="employmentTypeValue"
                  @save="(val) => $emit('update-employment-type', val)"
                  buttons
                  title="Edit Employment Type"
                  v-slot="scope"
                >
                  <q-select
                    v-model="scope.value"
                    :options="employmentTypeOptions"
                    autofocus
                    option-label="label"
                    option-value="value"
                    emit-value
                    map-options
                    dense
                    outlined
                  />
                </q-popup-edit>
              </q-btn>
            </div>
          </div>

          <div class="details-row">
            <div class="details-label">Status</div>
            <div class="details-value">
              <span
                class="status-badge"
                :class="employee.employee?.status?.toLowerCase() || 'inactive'"
              >
                {{ employee.employee?.status || "Inactive" }}
              </span>
              <q-btn
                flat
                round
                dense
                icon="edit"
                size="sm"
                color="primary"
                class="edit-icon-btn"
              >
                <q-popup-edit
                  v-model="statusValue"
                  @save="(val) => $emit('update-status', val)"
                  buttons
                  title="Edit Status"
                  v-slot="scope"
                >
                  <q-select
                    v-model="scope.value"
                    :options="['Active', 'Inactive', 'On Leave']"
                    dense
                    outlined
                  />
                </q-popup-edit>
              </q-btn>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import EmployeeAvatar from "./EmployeeAvatar.vue";
import {
  formatFullname,
  formatDate,
  validateTimeFormat,
} from "src/composables/employeeFunction/useEmployeeFunctions";
import { typographyFormat } from "src/composables/typography/typography-format";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  employee: { type: Object, default: null },
  branchOptions: { type: Array, default: () => [] },
  employmentTypeOptions: { type: Array, default: () => [] },
});

const emit = defineEmits([
  "update:modelValue",
  "update-branch",
  "update-position",
  "update-phone",
  "update-time-in",
  "update-time-out",
  "update-sex",
  "update-employment-type",
  "update-status",
]);

const { capitalizeFirstLetter } = typographyFormat();

const dialogValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

// Form values
const branchValue = ref("");
const positionValue = ref("");
const phoneValue = ref("");
const timeInValue = ref("");
const timeOutValue = ref("");
const sexValue = ref("");
const employmentTypeValue = ref("");
const statusValue = ref("");

const fullName = computed(() => formatFullname(props.employee?.employee || {}));
const genderOptions = ["Male", "Female"];
const positionOptions = [
  "Scaler",
  "Lamesador",
  "Hornero",
  "Baker",
  "Cake Maker",
  "Cashier",
  "Sales Clerk",
  "Utility",
  "Not Yet Assigned",
];

watch(
  () => props.employee,
  (newVal) => {
    if (newVal) {
      branchValue.value = newVal.branch;
      positionValue.value = newVal.employee?.position;
      phoneValue.value = newVal.employee?.phone;
      timeInValue.value = newVal.employee?.branch_employee?.time_in;
      timeOutValue.value = newVal.employee?.branch_employee?.time_out;
      sexValue.value = newVal.employee?.sex;
      employmentTypeValue.value = newVal.employee?.employment_type_id;
      statusValue.value = newVal.employee?.status;
    }
  },
  { immediate: true, deep: true }
);

const getEmploymentTypeName = (id) => {
  const found = props.employmentTypeOptions.find((opt) => opt.value === id);
  return found ? found.label : "N/A";
};

const formatPhoneNumber = (phone) => phone;
</script>

<style scoped lang="scss">
.employee-details-card {
  border-radius: 32px 32px 0 0 !important;
  background: #f8fafc;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.08) !important;
  padding-bottom: env(safe-area-inset-bottom);

  .drag-handle-wrapper {
    display: flex;
    justify-content: center;
    padding-top: 12px;
    padding-bottom: 4px;
    background: #ffffff;
    border-radius: 32px 32px 0 0;

    .drag-handle {
      width: 48px;
      height: 5px;
      background: #cbd5e1;
      border-radius: 10px;
      opacity: 0.8;
    }
  }

  .dialog-header-modern {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 28px 20px;
    background: #ffffff;
    border-bottom: 1px solid #f1f5f9;
    
    .header-text {
      .text-h5 {
        color: #0f172a;
        letter-spacing: -0.5px;
        line-height: 1.2;
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

  .dialog-body-modern {
    padding: 0;
    max-height: 75vh;
    overflow-y: auto;
  }

  .modern-profile-header {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 24px 28px;
    background: #ffffff;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 28px;
      right: 28px;
      height: 1px;
      background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
    }

    .avatar-container {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        inset: -4px;
        border-radius: 50%;
        border: 2px solid #e2e8f0;
      }
    }

    .profile-info {
      .profile-name {
        font-size: 1.3rem;
        font-weight: 800;
        color: #1e293b;
        letter-spacing: -0.5px;
        margin-bottom: 4px;
      }
      .profile-position {
        font-size: 0.9rem;
        font-weight: 600;
        color: #667eea;
        margin-bottom: 8px;
      }
      .profile-badge {
        display: inline-flex;
        align-items: center;
        padding: 4px 10px;
        background: #f1f5f9;
        border-radius: 8px;
        font-size: 0.75rem;
        font-weight: 700;
        color: #64748b;
        letter-spacing: 0.5px;
      }
    }
  }

  .modern-details-section {
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .details-row {
      display: flex;
      align-items: center;
      padding: 16px 20px;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.02);
      border: 1px solid #f1f5f9;
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.04);
        border-color: #e2e8f0;
      }
    }

    .details-label {
      width: 40%;
      color: #64748b;
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .details-value {
      width: 60%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      font-size: 0.95rem;
      font-weight: 600;
      color: #1e293b;
      
      &.schedule-value {
        width: 100%;
      }
    }

    .schedule-edit-icons {
      display: flex;
      gap: 8px;
    }

    .edit-icon-btn {
      opacity: 0;
      background: #f8fafc;
      color: #667eea !important;
      border-radius: 10px;
      padding: 4px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      
      /* Make it visible on touch devices or hover */
      @media (hover: none) {
        opacity: 1;
      }
    }

    .details-row:hover .edit-icon-btn {
      opacity: 1;
      background: #eef2ff;
      
      &:hover {
        background: #667eea;
        color: #ffffff !important;
        transform: scale(1.1);
      }
    }

    .status-badge {
      display: inline-block;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      
      &.active {
        background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
        color: #047857;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
      }
      &.on-leave, &[class*="leave"] {
        background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
        color: #b45309;
        box-shadow: 0 4px 12px rgba(245, 158, 11, 0.15);
      }
      &.inactive {
        background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
        color: #b91c1c;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);
      }
    }
  }
}

/* Scrollbar styling for modern look */
.dialog-body-modern::-webkit-scrollbar {
  width: 6px;
}
.dialog-body-modern::-webkit-scrollbar-track {
  background: transparent;
}
.dialog-body-modern::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
.dialog-body-modern::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
