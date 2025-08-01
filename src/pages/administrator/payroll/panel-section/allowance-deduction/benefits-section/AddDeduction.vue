<template>
  <div>
    <q-btn
      padding="sm md"
      label="Add Employee Benefits"
      icon="add_circle"
      size="md"
      class="q-px-lg q-py-md text-white button-gradient"
      @click="openDialog"
    />

    <q-dialog
      v-model="dialog"
      persistent
      position="right"
      backdrop-filter="blur(4px) saturate(150%)"
      class="full-height-dialog"
    >
      <q-card class="dialog-card">
        <q-scroll-area class="fit">
          <!-- Header -->
          <q-card-section class="dialog-header row items-center no-wrap">
            <div class="text-h6 text-weight-bold">💰 Add Employee Benefits</div>
            <q-space />
            <q-btn
              icon="close"
              flat
              dense
              round
              v-close-popup
              class="text-white"
            />
          </q-card-section>

          <!-- Search & Info -->
          <q-card-section class="q-pt-lg q-pb-md q-px-lg">
            <div style="position: relative">
              <q-input
                v-model="searchKeyword"
                @update:model-value="search"
                label="Search Employee"
                outlined
                rounded
                dense
                debounce="500"
                placeholder="Enter employee name"
                clearable
              >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
                <template v-slot:append>
                  <q-spinner v-if="searchLoading" color="primary" size="sm" />
                </template>
              </q-input>

              <div v-if="searchKeyword" class="dropdown-list">
                <q-list separator>
                  <q-item v-if="!employees?.length">
                    <q-item-section class="text-grey-7"
                      >No employee found.</q-item-section
                    >
                  </q-item>
                  <q-item
                    v-for="employee in employees"
                    :key="employee.id"
                    clickable
                    @click="autoFillEmployee(employee)"
                  >
                    <q-item-section>
                      {{
                        `${employee.firstname} ${
                          employee.middlename
                            ? employee.middlename.charAt(0) + "."
                            : ""
                        } ${employee.lastname}`
                      }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>

            <div class="row q-col-gutter-md q-mt-lg">
              <div class="col-12 col-sm-6">
                <div class="text-subtitle2 text-grey-7 q-mb-xs">
                  Employee Name:
                </div>
                <div class="text-body1 text-weight-medium">
                  {{ employeeDeduction.employee_name || "----------" }}
                </div>
              </div>
              <div class="col-12 col-sm-6">
                <div class="text-subtitle2 text-grey-7 q-mb-xs">Position:</div>
                <div class="text-body1 text-weight-medium">
                  {{ employeeDeduction.employee_position || "----------" }}
                </div>
              </div>
            </div>
          </q-card-section>

          <q-separator inset class="q-mx-lg q-my-md" />

          <!-- Deductions -->
          <q-card-section class="q-gutter-y-lg q-px-lg">
            <!-- SSS -->
            <div>
              <div class="text-subtitle1 text-weight-bold text-primary q-mb-md">
                <q-icon name="paid" class="q-mr-xs" /> SSS (Social Security
                System)
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6">
                  <q-input
                    dense
                    outlined
                    v-model="employeeDeduction.sss_number"
                    label="SSS Number"
                    mask="##-#######-##"
                    placeholder="00-0000000-00"
                    clearable
                  />
                </div>
                <div class="col-12 col-sm-6">
                  <q-input
                    dense
                    outlined
                    v-model="employeeDeduction.sss"
                    label="Amount"
                    type="number"
                    prefix="₱"
                    clearable
                  />
                </div>
              </div>
            </div>

            <!-- HDMF -->
            <div>
              <div class="text-subtitle1 text-weight-bold text-primary q-mb-md">
                <q-icon name="home" class="q-mr-xs" /> HDMF (Pag-IBIG Fund)
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6">
                  <q-input
                    outlined
                    dense
                    v-model="employeeDeduction.hdmf_number"
                    label="HDMF Number"
                    mask="####-####-####"
                    placeholder="0000-0000-0000"
                    clearable
                  />
                </div>
                <div class="col-12 col-sm-6">
                  <q-input
                    dense
                    v-model="employeeDeduction.hdmf"
                    outlined
                    label="Amount"
                    type="number"
                    prefix="₱"
                    clearable
                  />
                </div>
              </div>
            </div>

            <!-- PHIC -->
            <div>
              <div class="text-subtitle1 text-weight-bold text-primary q-mb-md">
                <q-icon name="local_hospital" class="q-mr-xs" /> PHIC
                (PhilHealth)
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6">
                  <q-input
                    dense
                    v-model="employeeDeduction.phic_number"
                    outlined
                    mask="##-#########-##"
                    placeholder="00-00000000-00"
                    label="PHIC Number"
                    clearable
                  />
                </div>
                <div class="col-12 col-sm-6">
                  <q-input
                    dense
                    v-model="employeeDeduction.phic"
                    outlined
                    label="Amount"
                    type="number"
                    prefix="₱"
                    clearable
                  />
                </div>
              </div>
            </div>
          </q-card-section>

          <q-separator inset class="q-mx-lg q-my-md" />

          <!-- Footer -->
          <q-card-actions align="right" class="q-px-lg q-pb-lg">
            <q-btn
              size="md"
              padding="sm lg"
              label="Save"
              icon-right="send"
              class="text-white button-gradient"
              @click="save"
              :loading="loading"
            />
          </q-card-actions>
        </q-scroll-area>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useEmployeeBenefitStore } from "stores/benefit";
import { useEmployeeStore } from "stores/employee";
import { ref, computed, reactive } from "vue";

const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);
const employeeBenefitStore = useEmployeeBenefitStore();
const searchKeyword = ref("");
const loading = ref(false);
const searchLoading = ref(false);
const dialog = ref(false);

const openDialog = () => {
  dialog.value = true;
};

const emit = defineEmits(["created"]);

const search = async () => {
  if (searchKeyword.value.trim()) {
    searchLoading.value = true;
    await employeeStore.searchEmployee(searchKeyword.value);
    searchLoading.value = false;
  }
};

const autoFillEmployee = (employee) => {
  employeeDeduction.employee_id = employee.id;
  employeeDeduction.employee_name = `${employee.firstname} ${
    employee.middlename ? employee.middlename.charAt(0) + "." : ""
  } ${employee.lastname}`;
  employeeDeduction.employee_position = employee.position;
  searchKeyword.value = "";
};

const employeeDeduction = reactive({
  employee_id: "",
  employee_name: "",
  employee_position: "",
  sss_number: "",
  hdmf_number: "",
  phic_number: "",
  sss: "",
  hdmf: "",
  phic: "",
});

const clearEmployeeDeductionForm = () => {
  employeeDeduction.employee_id = "";
  employeeDeduction.employee_name = "";
  employeeDeduction.employee_position = "";
  employeeDeduction.sss_number = "";
  employeeDeduction.hdmf_number = "";
  employeeDeduction.phic_number = "";
  employeeDeduction.sss = "";
  employeeDeduction.hdmf = "";
  employeeDeduction.phic = "";
};

const save = async () => {
  loading.value = true;
  try {
    await employeeBenefitStore.createEmployeeBenefit(employeeDeduction);
    emit("created");
    dialog.value = false;
    clearEmployeeDeductionForm();
  } catch (error) {
    console.error("Error saving deductions:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
.full-height-dialog {
  height: 100vh !important;
  max-height: 100vh;
}

.dialog-card {
  width: 600px;
  max-width: 90vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.q-scroll-area.fit {
  height: 100%;
}

.dialog-header {
  background: linear-gradient(90deg, #0194ae, #0e7490);
  color: white;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.button-gradient {
  background: linear-gradient(135deg, #0194ae, #0e7490);
  // box-shadow: 0 2px 8px rgba(19, 141, 163, 0.711);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(12, 157, 201, 0.6);
  }
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border-radius: 8px;
  max-height: 250px;
  overflow-y: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
</style>
