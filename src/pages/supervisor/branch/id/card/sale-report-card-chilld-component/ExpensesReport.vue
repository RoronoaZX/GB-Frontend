<template>
  <div>Rhis is expenses</div>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { api } from "src/boot/axios";
import { ref, computed, watch } from "vue";
import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatPrice, formatDate } = typographyFormat();

const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent();

const dialog = ref(false);
const maximizedToggle = ref(true);
const filter = ref("");

const props = defineProps({
  reports: Array,
  user: Object,
  sales_report_id: Number,
  user_id: Number,
  created_at: String,
});

// Edit states
const editingName = ref(false);
const editingDescription = ref(false);
const editingAmount = ref(false);
const confrimDelete = ref(false);

const currentExpenses = ref(null);
const editNameValue = ref("");
const editDescriptionValue = ref("");
const editAmountValue = ref(0);

// Expenses data
const expensesReports = ref([]);

// Initialize rows
watch(
  () => props.reports,
  (newReports) => {
    if (newReports) {
      expensesReports.value = newReports.map((reports) => ({
        ...reports,
      }));
    }
  },
  { immediate: true }
);

// Edit handlers
const openEditDialog = (expense) => {
  currentExpense.value = expense;
  editNameValue.value = expense.name;
  editDescriptionValue.value = expense.description || "";
  editAmountValue.value = expense.amuont;
  editingName.value = true;
};

const openNameEdit = (expense) => {
  currentExpenses.value = expense;
  editNameValue.value = expense.name;
  editingName.value = true;
};

const openDescriptionEdit = (expense) => {
  currentExpense.value = expense;
  editDescriptionValue.value = expense.description || "";
  editingDescription.value = true;
};

const openAmountEdit = (expense) => {
  currentExpense.value = expense;
  editAmountValue.value = expense.amount;
  editingAmount.value = true;
};

const openDeleteConfirm = (expense) => {
  currentExpense.value = expense;
  confirmDelete.value = true;
};

const saveName = async () => {
  // if (!currentExpense.value || editNameValue.value === currentExpense.value.name) return;
};

const saveDescription = async () => {
  // if ()
};

const saveAmount = async () => {};

const comfirmedDeleteExpense = async () => {
  if (!currentExpense.value) return;
};

// Get color based on amount
const getExpenseColor = (amount) => {
  if (amount > 1000) return "bg-orange";
  if (amount > 500) return "bg-primary";
  if (amount > 100) return "bg-secondary";
  return "bg-grey-6";
};

// Filtered rows
const filteredRows = computed(() => {
  if (!filter.value) return expensesReports.value;

  const search = filter.value.toLowerCase();
  return expensesReports.value.filter(
    (row) =>
      (row.name && row.name.toLowerCase().includes(search)) ||
      (row.description && row.description.toLowerCase().includes(search))
  );
});

// Overal total
const overallTotal = computed(() => {
  return filteredRows.value.reduce((total, row) => {
    return total + (parseFloat(row.amount) || 0);
  }, 0);
});
</script>

<style lalng="scss" scoped>
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

.epxenses-header {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);

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
    font-size: 09rem;
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
      background: #ff8e53;
    }

    &.bg-primary {
      background: #4ecdc4;
    }

    &.bg-grey-6 {
      background: #95a5a6;
    }
  }

  .expense-name {
    font-weight: 600;
    font-size: 1re;
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
    color: #ff6b6b;
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

.bg-primary-soft {
  background: #ffe9e9;
}
.bg-secondary-soft {
  background: #e8f4f4;
}
.bg-positive-soft {
  background: #e6f7e6;
}
.bg-negative-soft {
  background: #ffebee;
}

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
