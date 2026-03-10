<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    @ok="handleButtonClick"
    @cancel="onDialogCancel"
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section style="background-color: #03a9f4">
        <div class="row justify-between text-white">
          <div class="text-h6">Expenses Report</div>
          <q-btn icon="close" flat dense round v-close-popup>
            <q-tooltip class="bg-blue-grey-6" :delay="200">Close</q-tooltip>
          </q-btn>
        </div>
      </q-card-section>

      <q-card-section class="row justify-between">
        <div>
          <q-input
            class="q-pb-lg q-pl-sm dynamic-width"
            v-model="filter"
            outlined
            placeholder="Search"
            debounce="1000"
            flat
            dense
            rounded
            style="width: 500px"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div>
          <AddingExpenses
            :reports="expensesReports"
            :user="props.user"
            :sales_report_id="props.sales_report_id"
            :user_id="props.user_id"
            :created_at="props.created_at"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          :filter="filter"
          :virtual-scroll-sticky-size-start="48"
          flat
          :columns="expensesReportColumn"
          :rows="filteredRows"
          row-key="name"
          virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
          hide-bottom
          style="height: 350px"
          class="table-container sticky-header"
        >
          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              <span>{{ `${capitalizeFirstLetter(props.row.name)}` }}</span>

              <q-popup-edit
                @update:model-value="(val) => updateName(props.row, val)"
                v-model="props.row.name"
                auto-save
                v-slot="scope"
              >
                <q-input
                  class="text-capitalize"
                  v-model="scope.value"
                  dense
                  autofocus
                  counter
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
          </template>
          <template v-slot:body-cell-description="props">
            <q-td :props="props">
              <span>{{
                `${capitalizeFirstLetter(props.row.description)}`
              }}</span>

              <q-popup-edit
                @update:model-value="(val) => updateDescription(props.row, val)"
                v-model="props.row.description"
                auto-save
                v-slot="scope"
              >
                <q-input
                  class="text-capitalize"
                  v-model="scope.value"
                  dense
                  autofocus
                  counter
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
          </template>
          <template v-slot:body-cell-amount="props">
            <q-td :props="props">
              <span>{{ formatPrice(props.row.amount) }}</span>

              <q-popup-edit
                @update:model-value="
                  (val) => updateAmount(props.row, parseFloat(val))
                "
                v-model="props.row.amount"
                auto-save
                v-slot="scope"
              >
                <q-input
                  v-model.number="scope.value"
                  dense
                  type="number"
                  mask="##0.00"
                  autofocus
                  counter
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
      <q-card-section>
        <div class="row justify-end q-mt-md">
          <div class="text-h6">
            Overall Total Expenses: {{ formatPrice(overallTotal || "0") }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import AddingExpenses from "./AddingExpenses.vue";
import { useDialogPluginComponent } from "quasar";
import { api } from "src/boot/axios";
import { ref, computed } from "vue";

import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatPrice } = typographyFormat();

const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent();

const dialog = ref(false);
const maximizedToggle = ref(true);
const filter = ref("");
const pagination = ref({
  rowsPerPage: 0,
});

const props = defineProps({
  reports: Array,
  user: Object,
  sales_report_id: Number,
  user_id: Number,
  created_at: String,
});

console.log("Expenses Dialog created_at", props.created_at);

const expensesReports = props.reports;
console.log("Expenses total", props.total);

const updateName = async (data, val) => {
  console.log("update data of the updateName", data);
  console.log("update val of the updateName", val);

  try {
    const response = await api.put(
      "/api/update-expenses-sales-name-report/" + data.id,
      {
        name: val,
      }
    );
    console.log("Updated expenses amount response:", response.data);
  } catch (error) {
    console.error(error);
  }
};
const updateDescription = async (data, val) => {
  console.log("update data of the description", data);
  console.log("update val of the description", val);

  try {
    const response = await api.put(
      "/api/update-expenses-sales-description-report/" + data.id,
      {
        description: val,
      }
    );
    console.log("Updated expenses amount response:", response.data);
  } catch (error) {
    console.error(error);
  }
};

const updateAmount = async (data, val) => {
  console.log("update data of the amount", data);
  console.log("update val of the amount", val);

  try {
    const response = await api.put(
      "/api/update-expenses-sales-amount-report/" + data.id,
      {
        amount: parseFloat(val),
      }
    );
    console.log("Updated expenses amount response:", response.data);
  } catch (error) {
    console.error(error);
  }
};

const expensesReportColumn = [
  {
    name: "name",
    label: "Expenses Name",
    field: (row) => {
      console.log("Row data:", row); // Debug each row's data
      return row.name || "N/A"; // Adjust this according to your data
    },
    align: "center",
  },
  {
    name: "description",
    label: "Description",
    field: "description",
    align: "center",
  },
  {
    name: "amount",
    label: "Amount",
    field: "amount",
    align: "center",
  },
];

// Log to verify the structure of props.reports
console.log("Reports data structure:", props.reports);

// Replace this with your actual filtered rows logic
const filteredRows = computed(() => {
  // Assuming `breads` is an array in `reports`
  console.log("Filtered rows:", props.reports || []);
  return props.reports || [];
});

const overallTotal = computed(() => {
  const total = filteredRows.value.reduce((total, row) => {
    const amount = parseFloat(row.amount) || 0; // Ensure proper parsing and handle non-numeric values
    return total + amount;
  }, 0); // Provide an initial value for reduce
  return total;
});

console.log("Expenses:", filteredRows.value);
</script>

<style lang="scss" scoped>
.expenses-card {
  width: 500px;
  max-width: 95vw;
  border-radius: 28px 28px 0 0;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  background: #ffffff;
  height: 90vh;
  display: flex;
  flex-direction: column;
}

.expenses-header {
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
  
  .header-icon {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
  }
}

.search-input {
  :deep(.q-field__control) {
    border-radius: 30px;
    padding-left: 16px;
    height: 44px;
  }
  
  :deep(.q-field__native) {
    font-size: 0.95rem;
  }
}

.total-expenses-chip {
  background: #f8fafc;
  border-radius: 30px;
  padding: 8px 16px;
  font-size: 1rem;
  
  :deep(.q-avatar) {
    width: 28px;
    height: 28px;
    font-size: 0.9rem;
    margin-left: -8px;
  }
}

.expenses-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px 16px 16px;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
}

.expense-card {
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #f0f0f0;
  overflow: hidden;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  
  &:active {
    transform: scale(0.98);
  }
  
  .expense-card-header {
    padding: 16px;
    background: #ffffff;
  }
  
  .expense-icon {
    width: 36px;
    height: 36px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &.bg-orange {
      background: #FF8E53;
    }
    
    &.bg-primary {
      background: #FF6B6B;
    }
    
    &.bg-secondary {
      background: #4ecdc4;
    }
    
    &.bg-grey-6 {
      background: #95a5a6;
    }
  }
  
  .expense-name {
    font-weight: 600;
    font-size: 1rem;
    color: #1e293b;
    line-height: 1.3;
  }
  
  .expense-category {
    font-size: 0.75rem;
    color: #94a3b8;
  }
  
  .expense-amount {
    font-weight: 700;
    font-size: 1.2rem;
    color: #FF6B6B;
  }
  
  .expense-card-actions {
    padding: 8px 16px 12px;
    border-top: 1px solid #f1f5f9;
    background: #fafafa;
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 48px 16px;
  background: #f8fafc;
  border-radius: 28px;
}

.edit-dialog {
  width: 340px;
  max-width: 90vw;
  border-radius: 28px;
  overflow: hidden;
  
  .edit-icon {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &.bg-primary-soft {
      background: #ffe9e9;
    }
    
    &.bg-secondary-soft {
      background: #e8f4f4;
    }
    
    &.bg-positive-soft {
      background: #e6f7e6;
    }
  }
  
  .edit-input {
    :deep(.q-field__control) {
      border-radius: 16px;
    }
  }
}

.delete-dialog {
  width: 300px;
  max-width: 80vw;
  border-radius: 28px;
  overflow: hidden;
  
  .delete-icon {
    width: 64px;
    height: 64px;
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &.bg-negative-soft {
      background: #ffebee;
    }
  }
}

// Color utilities
.bg-primary-soft { background: #ffe9e9; }
.bg-secondary-soft { background: #e8f4f4; }
.bg-positive-soft { background: #e6f7e6; }
.bg-negative-soft { background: #ffebee; }

// Responsive
@media (max-width: 400px) {
  .expense-name {
    font-size: 0.9rem;
  }
  
  .expense-amount {
    font-size: 1rem;
  }
  
  .expense-icon {
    width: 32px;
    height: 32px;
  }
}
</style>
