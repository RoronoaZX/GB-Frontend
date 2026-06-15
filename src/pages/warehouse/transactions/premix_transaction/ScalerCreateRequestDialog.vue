<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="scaler-dialog-card elegant-card" style="width: 550px; max-width: 90vw;">
      <q-card-section class="dialog-header-gradient text-dark q-pa-lg">
        <div class="row justify-between items-center">
          <div>
            <div class="text-h6 text-weight-bold text-primary-dark">
              Manual Premix Request
            </div>
            <div class="text-caption text-grey-7">
              Create a premix request on behalf of a baker
            </div>
          </div>
          <q-btn
            icon="close"
            flat
            round
            dense
            color="grey-7"
            v-close-popup
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pa-lg q-gutter-y-md scroll" style="max-height: 55vh;">
        <!-- Branch Selector -->
        <div class="column q-gutter-y-xs">
          <label class="text-caption text-weight-bold text-grey-8">Target Branch</label>
          <q-select
            v-model="selectedBranch"
            :options="branchOptions"
            option-value="id"
            option-label="name"
            label="Select Branch"
            outlined
            dense
            color="primary"
            class="elegant-select"
            @update:model-value="onBranchChange"
            use-input
            input-debounce="300"
            @filter="filterBranches"
            :loading="loadingBranches"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No branches found
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>

        <!-- Baker Selector -->
        <div class="column q-gutter-y-xs">
          <label class="text-caption text-weight-bold text-grey-8">Target Baker</label>
          <q-select
            v-model="selectedBaker"
            :options="filteredBakerOptions"
            option-value="id"
            :option-label="getEmployeeFullName"
            label="Select Baker"
            outlined
            dense
            color="primary"
            class="elegant-select"
            :disable="!selectedBranch"
            use-input
            input-debounce="300"
            @filter="filterBakers"
            :loading="loadingBakers"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  {{ selectedBranch ? 'No bakers found for this branch' : 'Please select a branch first' }}
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>

        <!-- Premix Formula Selector -->
        <div class="column q-gutter-y-xs">
          <label class="text-caption text-weight-bold text-grey-8">Premix Formula</label>
          <q-select
            v-model="selectedPremix"
            :options="filteredPremixOptions"
            option-value="id"
            option-label="name"
            label="Select Formula"
            outlined
            dense
            color="primary"
            class="elegant-select"
            :disable="!selectedBranch"
            use-input
            input-debounce="300"
            @filter="filterPremixes"
            :loading="loadingPremixes"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  {{ selectedBranch ? 'No formulas found for this branch' : 'Please select a branch first' }}
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>

        <!-- Quantity Input -->
        <div class="column q-gutter-y-xs">
          <label class="text-caption text-weight-bold text-grey-8">Quantity (kilo)</label>
          <q-input
            v-model.number="quantity"
            type="number"
            outlined
            dense
            color="primary"
            min="1"
            :rules="[val => !!val && val > 0 || 'Quantity must be at least 1']"
            class="elegant-input"
          />
        </div>

        <!-- Justification Notes -->
        <div class="column q-gutter-y-xs">
          <label class="text-caption text-weight-bold text-grey-8">Justification / Remarks</label>
          <q-input
            v-model="notes"
            type="textarea"
            outlined
            dense
            color="primary"
            rows="3"
            placeholder="E.g., Baker forgot to submit request; manually scaled on request."
            class="elegant-input"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="q-pa-md bg-grey-1">
        <q-btn
          flat
          label="Cancel"
          color="grey-8"
          class="text-weight-bold q-px-md"
          @click="onDialogCancel"
          v-close-popup
        />
        <q-btn
          unelevated
          label="Submit Request"
          color="primary"
          class="text-weight-bold q-px-lg action-submit-btn"
          :disable="!isFormValid"
          @click="onSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useDialogPluginComponent } from "quasar";
import { useBranchesStore } from "src/stores/branch";
import { useEmployeeStore } from "src/stores/employee";
import { usePremixStore } from "src/stores/premix";
import { useWarehousesStore } from "src/stores/warehouse";

// Quasar Dialog composite
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

// Stores
const branchesStore = useBranchesStore();
const employeeStore = useEmployeeStore();
const premixStore = usePremixStore();
const warehouseStore = useWarehousesStore();

// State Variables
const selectedBranch = ref(null);
const selectedBaker = ref(null);
const selectedPremix = ref(null);
const quantity = ref(1);
const notes = ref("Baker forgot to request premix, manually scaled on request.");

// Loading states
const loadingBranches = ref(false);
const loadingBakers = ref(false);
const loadingPremixes = ref(false);

// Raw list stores from server
const allBranches = ref([]);
const branchBakers = ref([]);
const branchPremixes = ref([]);

// Filtered options for select components
const branchOptions = ref([]);
const filteredBakerOptions = ref([]);
const filteredPremixOptions = ref([]);

// Get active warehouse and user information
const userData = computed(() => warehouseStore.user);
const warehouseId = computed(() => userData.value?.device?.reference_id);
const scalerEmployeeId = computed(() => userData.value?.data?.employee_id);

// Load branches when component mounts
onMounted(async () => {
  try {
    loadingBranches.value = true;
    await branchesStore.fetchBranches();
    allBranches.value = branchesStore.branches;
    branchOptions.value = allBranches.value;
  } catch (error) {
    console.error("Error fetching branches:", error);
  } finally {
    loadingBranches.value = false;
  }
});

// Helper: Employee display name formatting
const getEmployeeFullName = (item) => {
  if (!item) return "";
  const emp = item.employee || item;
  const first = emp.firstname || "";
  const middle = emp.middlename ? `${emp.middlename.charAt(0)}.` : "";
  const last = emp.lastname || "";
  const position = emp.position ? ` (${emp.position.charAt(0).toUpperCase() + emp.position.slice(1).toLowerCase()})` : "";
  return `${first} ${middle} ${last}${position}`.replace(/\s+/g, " ").trim();
};

// Filter branches by text search
const filterBranches = (val, update) => {
  if (val === "") {
    update(() => {
      branchOptions.value = allBranches.value;
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    branchOptions.value = allBranches.value.filter(
      v => v.name && v.name.toLowerCase().indexOf(needle) > -1
    );
  });
};

// Filter bakers by text search
const filterBakers = (val, update) => {
  if (val === "") {
    update(() => {
      filteredBakerOptions.value = branchBakers.value;
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    filteredBakerOptions.value = branchBakers.value.filter(v => {
      const fullname = getEmployeeFullName(v).toLowerCase();
      return fullname.indexOf(needle) > -1;
    });
  });
};

// Filter premixes by text search
const filterPremixes = (val, update) => {
  if (val === "") {
    update(() => {
      filteredPremixOptions.value = branchPremixes.value;
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    filteredPremixOptions.value = branchPremixes.value.filter(
      v => v.name && v.name.toLowerCase().indexOf(needle) > -1
    );
  });
};

// Handle branch selection changes
const onBranchChange = async (branch) => {
  selectedBaker.value = null;
  selectedPremix.value = null;
  branchBakers.value = [];
  branchPremixes.value = [];
  filteredBakerOptions.value = [];
  filteredPremixOptions.value = [];

  if (!branch) return;

  // Fetch Bakers for the selected branch
  try {
    loadingBakers.value = true;
    await employeeStore.fetchBranchEmployee(branch.id);
    const rawEmployees = employeeStore.branchEmployees || [];
    const allowedPositions = ["baker", "hornero", "lamesador"];
    branchBakers.value = rawEmployees.filter((item) => {
      const emp = item.employee;
      return emp && emp.position && allowedPositions.includes(emp.position.toLowerCase());
    });
    filteredBakerOptions.value = branchBakers.value;
  } catch (error) {
    console.error("Error fetching branch employees:", error);
  } finally {
    loadingBakers.value = false;
  }

  // Fetch Premix formulas for the selected branch
  try {
    loadingPremixes.value = true;
    await premixStore.fetchBranchPremix(branch.id);
    branchPremixes.value = premixStore.premixes || [];
    filteredPremixOptions.value = branchPremixes.value;
  } catch (error) {
    console.error("Error fetching branch premixes:", error);
  } finally {
    loadingPremixes.value = false;
  }
};

// Validation: all fields filled correctly
const isFormValid = computed(() => {
  return (
    selectedBranch.value &&
    selectedBaker.value &&
    selectedPremix.value &&
    quantity.value > 0
  );
});

// Submit Form Action
const onSubmit = async () => {
  if (!isFormValid.value) return;

  const payload = [
    {
      branch_premix_id: selectedPremix.value.id,
      name: selectedPremix.value.name,
      category: selectedPremix.value.category || "premix",
      quantity: quantity.value,
      status: "pending",
      warehouse_id: warehouseId.value,
      employee_id: selectedBaker.value?.employee?.id || selectedBaker.value?.employee_id || selectedBaker.value?.id, // target baker
      created_by: scalerEmployeeId.value, // active scaler
      is_scaler_created: true,
      notes: notes.value,
    }
  ];

  try {
    // Call the pinia action to submit scaler-created request
    await premixStore.saveScalerRequestPremix(payload, warehouseId.value);
    onDialogOK();
  } catch (error) {
    console.error("Error submitting manual request:", error);
  }
};
</script>

<style lang="scss" scoped>
.elegant-card {
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  font-family: "Inter", sans-serif;
  overflow: hidden;
}

.dialog-header-gradient {
  background: linear-gradient(180deg, #ffffff, #e8e6b7);
}

.elegant-select, .elegant-input {
  transition: all 0.2s ease-in-out;
  :deep(.q-field__control) {
    border-radius: 8px;
    background-color: #f9fafb;
    &:hover {
      background-color: #f3f4f6;
    }
  }
}

.action-submit-btn {
  border-radius: 8px;
  background-color: var(--q-primary);
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.9;
  }
}
</style>
