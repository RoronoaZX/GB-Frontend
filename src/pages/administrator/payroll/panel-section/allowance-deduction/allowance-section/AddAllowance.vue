<template>
  <div>
    <q-btn
      padding="sm md"
      label="Add Allowance"
      icon="add_circle"
      size="md"
      class="gradient-btn text-white"
      @click="openDialog"
    />

    <q-dialog
      v-model="dialog"
      persistent
      position="right"
      backdrop-filter="blur(4px) saturate(150%)"
    >
      <q-card class="compact-dialog-card">
        <!-- Header -->
        <q-card-section class="dialog-header row items-center no-wrap">
          <div class="text-h6 text-weight-bold">💼 Add Employee Allowance</div>
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

        <!-- Search Section -->
        <q-card-section class="q-px-lg q-pt-md">
          <div class="form-section-header">1. Select Employee</div>
          <div style="position: relative">
            <SearchAllowance
              v-model="searchKeyword"
              :search-loading="searchLoading"
              @update:model-value="search"
            />

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

          <div class="row q-col-gutter-md q-mt-md">
            <div class="col-12 col-sm-6">
              <div class="text-subtitle2 text-grey-7 q-mb-xs">
                Employee Name:
              </div>
              <div class="text-body1 text-weight-medium">
                {{ employeeAllowance.employee_name || "----------" }}
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <div class="text-subtitle2 text-grey-7 q-mb-xs">Position:</div>
              <div class="text-body1 text-weight-medium">
                {{ employeeAllowance.employee_position || "----------" }}
              </div>
            </div>
          </div>
        </q-card-section>

        <!-- Allowance Amount & Category Config -->
        <q-card-section class="q-px-lg q-pt-none">
          <div class="form-section-header">2. Configure Allowance</div>
          
          <!-- Category selector badges -->
          <div class="q-mb-md">
            <div class="text-subtitle2 text-grey-7 q-mb-sm">Select Category Preset:</div>
            <div class="row q-col-gutter-sm">
              <div v-for="cat in categories" :key="cat.name" class="col-6 col-sm-3">
                <q-card
                  flat
                  bordered
                  class="category-select-card text-center cursor-pointer q-pa-sm"
                  :class="{ 'selected-category': selectedCategory === cat.name }"
                  @click="selectCategory(cat)"
                >
                  <q-icon :name="cat.icon" size="sm" :color="selectedCategory === cat.name ? 'teal-8' : 'grey-7'" />
                  <div class="text-caption text-weight-bold q-mt-xs" :class="selectedCategory === cat.name ? 'text-teal-9' : 'text-grey-8'">{{ cat.name }}</div>
                  <div class="text-caption text-grey-6">₱{{ cat.defaultAmount }}</div>
                </q-card>
              </div>
            </div>
          </div>

          <q-input
            v-model="employeeAllowance.amount"
            outlined
            dense
            label="Allowance Amount"
            prefix="₱"
            type="number"
            clearable
          />
        </q-card-section>

        <!-- Footer -->
        <q-card-actions align="right" class="q-px-lg q-pb-md">
          <q-btn
            size="md"
            padding="sm lg"
            label="Save"
            icon-right="send"
            class="gradient-btn text-white"
            @click="save"
            :loading="loading"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script setup>
import { useEmployeeAllowance } from "src/stores/allowance";
import { useEmployeeStore } from "stores/employee";
import { computed, reactive, ref } from "vue";
import SearchAllowance from "../components/SearchComponent.vue";

const emit = defineEmits(["created"]);
const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);
const employeeAllowanceStore = useEmployeeAllowance();
const searchKeyword = ref("");
const dialog = ref(false);
const loading = ref(false);
const searchLoading = ref(false);

const selectedCategory = ref("");
const categories = [
  { name: "Meal", icon: "restaurant_menu", defaultAmount: 100 },
  { name: "Travel", icon: "commute", defaultAmount: 200 },
  { name: "Uniform", icon: "checkroom", defaultAmount: 150 },
  { name: "Internet", icon: "wifi", defaultAmount: 250 },
];

const selectCategory = (cat) => {
  selectedCategory.value = cat.name;
  employeeAllowance.amount = cat.defaultAmount;
};

const openDialog = () => {
  dialog.value = true;
};

const search = async () => {
  if (searchKeyword.value.trim()) {
    searchLoading.value = true;
    await employeeStore.searchEmployee(searchKeyword.value);
    searchLoading.value = false;
  }
};

const autoFillEmployee = (employee) => {
  employeeAllowance.employee_id = employee.id;
  employeeAllowance.employee_name = `${employee.firstname} ${
    employee.middlename ? employee.middlename.charAt(0) + "." : ""
  } ${employee.lastname}`;
  employeeAllowance.employee_position = employee.position;
  searchKeyword.value = "";
};

const employeeAllowance = reactive({
  employee_id: "",
  employee_name: "",
  employee_position: "",
  amount: "",
});

const clearEmployeeAllowanceForm = () => {
  employeeAllowance.employee_id = "";
  employeeAllowance.employee_name = "";
  employeeAllowance.employee_position = "";
  employeeAllowance.amount = "";
  selectedCategory.value = "";
};

const save = async () => {
  loading.value = true;
  try {
    await employeeAllowanceStore.createEmployeeAllowance(employeeAllowance);
    emit("created");
    dialog.value = false;
    clearEmployeeAllowanceForm();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
.compact-dialog-card {
  width: 500px;
  max-width: 90vw;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.dialog-header {
  background: linear-gradient(90deg, #0194ae, #0e7490);
  color: white;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(45, 224, 203, 0.2);
}

.gradient-btn {
  background: linear-gradient(135deg, #0194ae, #0e7490);
  transition: all 0.3s ease;
}

.gradient-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(12, 157, 201, 0.6);
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

/* Form Section Header */
.form-section-header {
  border-bottom: 2px dashed #cbd5e1;
  padding-bottom: 8px;
  font-size: 1.05rem;
  font-weight: 700;
  color: #334155;
  margin-bottom: 16px;
}

/* Category card selectors */
.category-select-card {
  border-radius: 8px;
  transition: all 0.25s ease;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  min-height: 76px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
  }
}

.selected-category {
  background-color: #f0fdf4 !important;
  border-color: #10b981 !important;
  box-shadow: 0 0 0 1px #10b981;
}
</style>
