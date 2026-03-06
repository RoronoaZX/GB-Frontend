<template>
  <div class="expenses-report-container">
    <!-- Animated Summary Cards -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-4">
        <q-card flat bordered class="summary-card hover-lift">
          <q-card-section class="q-pa-md">
            <div class="row items-center">
              <div class="summary-icon-wrapper bg-gradient-orange">
                <q-icon name="receipt" size="20px" color="white" />
              </div>
              <div class="q-ml-sm">
                <div class="text-caption text-grey-6">Total Expenses</div>
                <div class="summary-value">{{ formatPrice(overallTotal) }}</div>
                <div class="text-caption text-grey-5 q-mt-xs">
                  {{ filteredRows.length }} transactions
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-4">
        <q-card flat bordered class="summary-card hover-lift">
          <q-card-section class="q-pa-md">
            <div class="row items-center">
              <div class="summary-icon-wrapper bg-gradient-blue">
                <q-icon name="trending_up" size="20px" color="white" />
              </div>
              <div class="q-ml-sm">
                <div class="text-caption text-grey-6">Average per Item</div>
                <div class="summary-value">
                  {{ formatPrice(averageExpense) }}
                </div>
                <div class="text-caption text-grey-5 q-mt-xs">
                  {{ getAverageComparison }}
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-4">
        <q-card flat bordered class="summary-card hover-lift">
          <q-card-section class="q-pa-md">
            <div class="row items-center">
              <div class="summary-icon-wrapper bg-gradient-green">
                <q-icon name="bar_chart" size="20px" color="white" />
              </div>
              <div class="q-ml-sm">
                <div class="text-caption text-grey-6">Highest Expense</div>
                <div class="summary-value">
                  {{ formatPrice(highestExpense) }}
                </div>
                <div class="text-caption text-grey-5 q-mt-xs">
                  {{ highestExpenseName }}
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Search and Action Bar -->
    <div class="action-bar q-mb-lg">
      <div class="row items-center justify-between">
        <div class="col-12 col-sm-7 col-md-8">
          <q-input
            v-model="filter"
            outlined
            placeholder="Search by name or description..."
            debounce="300"
            dense
            class="search-input"
            bg-color="white"
          >
            <template v-slot:prepend>
              <q-icon name="search" size="18px" color="grey-5" />
            </template>
            <template v-slot:append>
              <q-icon
                v-if="filter"
                name="close"
                size="18px"
                color="grey-5"
                class="cursor-pointer"
                @click="filter = ''"
              />
              <q-icon
                name="tune"
                size="18px"
                color="grey-5"
                class="cursor-pointer q-ml-xs"
              >
                <q-menu>
                  <q-list style="min-width: 200px">
                    <q-item clickable v-close-popup @click="sortBy = 'name'">
                      <q-item-section avatar>
                        <q-icon
                          name="sort_by_alpha"
                          size="xs"
                          color="primary"
                        />
                      </q-item-section>
                      <q-item-section>Sort by Name</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="sortBy = 'amount'">
                      <q-item-section avatar>
                        <q-icon name="sort" size="xs" color="secondary" />
                      </q-item-section>
                      <q-item-section>Sort by Amount</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="sortBy = 'date'">
                      <q-item-section avatar>
                        <q-icon name="date_range" size="xs" color="teal" />
                      </q-item-section>
                      <q-item-section>Sort by Date</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-auto q-mt-sm q-mt-sm-none">
          <AddingExpenses
            :reports="expensesReports"
            :user="props.user"
            :sales_report_id="props.sales_report_id"
            :user_id="props.user_id"
            :created_at="props.created_at"
            @expense-added="handleExpenseAdded"
          >
            <template v-slot:button="{ open }">
              <q-btn
                unelevated
                class="add-expense-btn"
                icon="add"
                label="Add Expense"
                no-caps
                @click="open"
              />
            </template>
          </AddingExpenses>
        </div>
      </div>
    </div>

    <!-- Expenses List -->
    <div v-if="filteredRows.length > 0" class="expenses-list">
      <transition-group name="list" tag="div" class="expenses-grid">
        <div
          v-for="expense in sortedExpenses"
          :key="expense.id"
          class="expense-card-wrapper"
        >
          <q-card
            flat
            bordered
            class="expense-card"
            @click="openQuickView(expense)"
          >
            <!-- Card Header with Progress -->
            <div class="expense-card-header">
              <div class="row items-center justify-between q-mb-xs">
                <div
                  class="expense-category-badge"
                  :class="getCategoryClass(expense.amount)"
                >
                  {{ getCategoryLabel(expense.amount) }}
                </div>
                <q-btn
                  flat
                  round
                  dense
                  icon="more_vert"
                  size="sm"
                  class="menu-btn"
                  @click.stop
                >
                  <q-menu anchor="bottom right" self="top right">
                    <q-list style="min-width: 180px" class="menu-list">
                      <q-item
                        clickable
                        v-close-popup
                        @click.stop="openEditExpense(expense, 'name')"
                      >
                        <q-item-section avatar>
                          <q-icon name="edit" size="xs" color="primary" />
                        </q-item-section>
                        <q-item-section>Edit Name</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click.stop="openEditExpense(expense, 'description')"
                      >
                        <q-item-section avatar>
                          <q-icon
                            name="description"
                            size="xs"
                            color="secondary"
                          />
                        </q-item-section>
                        <q-item-section>Edit Description</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click.stop="openEditExpense(expense, 'amount')"
                      >
                        <q-item-section avatar>
                          <q-icon name="payments" size="xs" color="positive" />
                        </q-item-section>
                        <q-item-section>Edit Amount</q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item
                        clickable
                        v-close-popup
                        @click.stop="confirmDeleteExpense(expense)"
                      >
                        <q-item-section avatar>
                          <q-icon name="delete" size="xs" color="negative" />
                        </q-item-section>
                        <q-item-section class="text-negative"
                          >Delete</q-item-section
                        >
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>

              <div class="expense-name">
                {{ capitalizeFirstLetter(expense.name) }}
              </div>
              <div class="expense-description">
                {{
                  expense.description
                    ? capitalizeFirstLetter(expense.description)
                    : "No description added"
                }}
              </div>
            </div>

            <!-- Card Body -->
            <div class="expense-card-body">
              <div class="row items-end justify-between">
                <div>
                  <div class="text-caption text-grey-5">Amount</div>
                  <div class="expense-amount">
                    {{ formatPrice(expense.amount) }}
                  </div>
                </div>
                <div
                  class="percentage-indicator"
                  :class="getPercentageClass(expense.amount)"
                >
                  {{ calculatePercentage(expense.amount) }}%
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="progress-bar-container q-mt-sm">
                <div
                  class="progress-bar"
                  :class="getProgressBarClass(expense.amount)"
                  :style="{ width: calculatePercentage(expense.amount) + '%' }"
                ></div>
              </div>
            </div>

            <!-- Card Footer -->
            <div class="expense-card-footer">
              <div class="row items-center justify-between">
                <div class="row items-center">
                  <q-icon name="schedule" size="12px" color="grey-4" />
                  <span class="text-caption text-grey-4 q-ml-xs">
                    {{ formatTime(expense.created_at) }}
                  </span>
                </div>
                <q-badge
                  :color="getBadgeColor(expense.amount)"
                  class="expense-badge"
                  :label="getBadgeLabel(expense.amount)"
                />
              </div>
            </div>
          </q-card>
        </div>
      </transition-group>
    </div>

    <!-- Empty State with Animation -->
    <div v-else class="empty-state-container">
      <div class="empty-state q-pa-xl">
        <div class="empty-icon-wrapper">
          <q-icon name="receipt" size="64px" color="grey-3" />
          <q-icon
            name="add_circle"
            size="24px"
            color="orange-4"
            class="plus-icon"
          />
        </div>
        <div class="text-h6 text-grey-7 q-mt-md">No Expenses Yet</div>
        <div class="text-caption text-grey-5 q-mb-lg">
          Start adding expenses to track your costs
        </div>
        <AddingExpenses
          :reports="expensesReports"
          :user="props.user"
          :sales_report_id="props.sales_report_id"
          :user_id="props.user_id"
          :created_at="props.created_at"
          @expense-added="handleExpenseAdded"
        >
          <template v-slot:button="{ open }">
            <q-btn
              unelevated
              class="add-first-btn"
              icon="add"
              label="Add First Expense"
              no-caps
              @click="open"
            />
          </template>
        </AddingExpenses>
      </div>
    </div>

    <!-- Quick View Dialog -->
    <q-dialog v-model="quickViewDialog" persistent>
      <q-card class="quick-view-dialog" v-if="currentExpense">
        <q-card-section
          class="q-pa-md dialog-header"
          :class="getDialogHeaderClass(currentExpense.amount)"
        >
          <div class="row items-center justify-between">
            <div class="row items-center">
              <div class="header-icon">
                <q-icon
                  :name="getCategoryIcon(currentExpense.amount)"
                  size="24px"
                  color="white"
                />
              </div>
              <div class="q-ml-sm">
                <div class="text-subtitle2 text-white text-opacity-80">
                  Expense Details
                </div>
                <div class="text-h6 text-white">
                  {{ capitalizeFirstLetter(currentExpense.name) }}
                </div>
              </div>
            </div>
            <q-btn flat dense round icon="close" color="white" v-close-popup />
          </div>
        </q-card-section>

        <q-card-section class="q-pa-md">
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Description</span>
              <span class="detail-value">{{
                currentExpense.description || "No description"
              }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Amount</span>
              <span class="detail-value amount">{{
                formatPrice(currentExpense.amount)
              }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Category</span>
              <span class="detail-value">
                <q-badge
                  :color="getBadgeColor(currentExpense.amount)"
                  class="q-px-sm q-py-xs"
                >
                  {{ getCategoryLabel(currentExpense.amount) }}
                </q-badge>
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Date Added</span>
              <span class="detail-value">{{
                formatDate(currentExpense.created_at)
              }}</span>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md q-pt-none">
          <q-btn flat label="Close" color="grey-6" v-close-popup />
          <q-btn
            unelevated
            label="Edit"
            :color="getEditButtonColor(currentExpense.amount)"
            @click="openEditFromQuickView"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Edit Dialogs (keep existing) -->
    <!-- Delete Confirmation Dialog (keep existing) -->
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { typographyFormat } from "src/composables/typography/typography-format";
// import AddingExpenses from "./AddingExpenses.vue";

const { capitalizeFirstLetter, formatPrice, formatDate, formatTime } =
  typographyFormat();
const $q = useQuasar();

const props = defineProps({
  sales_Reports: Array,
  reportLabel: String,
  reportDate: String,
  reportId: Number,
  user: Object,
  user_id: Number,
  created_at: String,
});

const emit = defineEmits(["update-summary"]);

// State
const filter = ref("");
const sortBy = ref("date");
const expensesReports = ref([]);
const editDialog = ref(false);
const deleteDialog = ref(false);
const quickViewDialog = ref(false);
const currentExpense = ref(null);
const editField = ref("");
const editValue = ref("");

// Computed
const filteredRows = computed(() => {
  if (!filter.value) return expensesReports.value;

  const search = filter.value.toLowerCase();
  return expensesReports.value.filter(
    (row) =>
      (row.name && row.name.toLowerCase().includes(search)) ||
      (row.description && row.description.toLowerCase().includes(search))
  );
});

const sortedExpenses = computed(() => {
  const rows = [...filteredRows.value];

  switch (sortBy.value) {
    case "name":
      return rows.sort((a, b) => a.name.localeCompare(b.name));
    case "amount":
      return rows.sort((a, b) => b.amount - a.amount);
    case "date":
    default:
      return rows.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
  }
});

const overallTotal = computed(() => {
  return filteredRows.value.reduce((total, row) => {
    return total + (parseFloat(row.amount) || 0);
  }, 0);
});

const averageExpense = computed(() => {
  if (filteredRows.value.length === 0) return 0;
  return overallTotal.value / filteredRows.value.length;
});

const highestExpense = computed(() => {
  if (filteredRows.value.length === 0) return 0;
  return Math.max(...filteredRows.value.map((e) => e.amount));
});

const highestExpenseName = computed(() => {
  const expense = filteredRows.value.find(
    (e) => e.amount === highestExpense.value
  );
  return expense ? expense.name : "N/A";
});

const getAverageComparison = computed(() => {
  if (filteredRows.value.length === 0) return "No data";
  const avg = averageExpense.value;
  if (avg > 500) return "High average";
  if (avg > 200) return "Medium average";
  return "Low average";
});

// Helper functions
const getCategoryClass = (amount) => {
  if (amount > 1000) return "high";
  if (amount > 500) return "medium-high";
  if (amount > 200) return "medium";
  if (amount > 100) return "medium-low";
  return "low";
};

const getCategoryLabel = (amount) => {
  if (amount > 1000) return "High Value";
  if (amount > 500) return "Above Average";
  if (amount > 200) return "Average";
  if (amount > 100) return "Below Average";
  return "Low Value";
};

const getCategoryIcon = (amount) => {
  if (amount > 1000) return "priority_high";
  if (amount > 500) return "trending_up";
  if (amount > 200) return "remove";
  if (amount > 100) return "trending_down";
  return "low_priority";
};

const getBadgeColor = (amount) => {
  if (amount > 1000) return "negative";
  if (amount > 500) return "orange";
  if (amount > 200) return "warning";
  if (amount > 100) return "positive";
  return "grey-6";
};

const getBadgeLabel = (amount) => {
  if (amount > 1000) return "High";
  if (amount > 500) return "Above Avg";
  if (amount > 200) return "Avg";
  if (amount > 100) return "Below Avg";
  return "Low";
};

const getProgressBarClass = (amount) => {
  if (amount > 1000) return "high";
  if (amount > 500) return "medium-high";
  if (amount > 200) return "medium";
  if (amount > 100) return "medium-low";
  return "low";
};

const getPercentageClass = (amount) => {
  if (amount > 1000) return "text-negative";
  if (amount > 500) return "text-orange";
  if (amount > 200) return "text-warning";
  if (amount > 100) return "text-positive";
  return "text-grey-6";
};

const getDialogHeaderClass = (amount) => {
  if (amount > 1000) return "bg-negative";
  if (amount > 500) return "bg-orange";
  if (amount > 200) return "bg-warning";
  if (amount > 100) return "bg-positive";
  return "bg-grey-7";
};

const getEditButtonColor = (amount) => {
  if (amount > 1000) return "negative";
  if (amount > 500) return "orange";
  if (amount > 200) return "warning";
  if (amount > 100) return "positive";
  return "grey-7";
};

const calculatePercentage = (amount) => {
  if (highestExpense.value === 0) return 0;
  return Math.round((amount / highestExpense.value) * 100);
};

// Methods
const openQuickView = (expense) => {
  currentExpense.value = expense;
  quickViewDialog.value = true;
};

const openEditFromQuickView = () => {
  quickViewDialog.value = false;
  openEditExpense(currentExpense.value, "name");
};

const openEditExpense = (expense, field) => {
  currentExpense.value = expense;
  editField.value = field;

  if (field === "name") editValue.value = expense.name;
  if (field === "description") editValue.value = expense.description || "";
  if (field === "amount") editValue.value = expense.amount;

  editDialog.value = true;
};

const saveEdit = async () => {
  if (!currentExpense.value) return;

  try {
    let endpoint = "";
    let data = {};

    if (editField.value === "name") {
      endpoint = `/api/update-expenses-sales-name-report/${currentExpense.value.id}`;
      data = { name: editValue.value };
      currentExpense.value.name = editValue.value;
    } else if (editField.value === "description") {
      endpoint = `/api/update-expenses-sales-description-report/${currentExpense.value.id}`;
      data = { description: editValue.value };
      currentExpense.value.description = editValue.value;
    } else if (editField.value === "amount") {
      endpoint = `/api/update-expenses-sales-amount-report/${currentExpense.value.id}`;
      data = { amount: parseFloat(editValue.value) };
      currentExpense.value.amount = parseFloat(editValue.value);
    }

    await api.put(endpoint, data);

    $q.notify({
      type: "positive",
      message: "Expense updated successfully",
      position: "top",
      timeout: 2000,
      icon: "check_circle",
    });

    emitUpdateSummary();
  } catch (error) {
    console.error(error);
    $q.notify({
      type: "negative",
      message: "Failed to update expense",
      position: "top",
      icon: "error",
    });
  }
};

const confirmDeleteExpense = (expense) => {
  currentExpense.value = expense;
  deleteDialog.value = true;
};

const deleteExpense = async () => {
  if (!currentExpense.value) return;

  try {
    await api.delete(
      `/api/delete-expenses-sales-report/${currentExpense.value.id}`
    );

    expensesReports.value = expensesReports.value.filter(
      (e) => e.id !== currentExpense.value.id
    );

    $q.notify({
      type: "positive",
      message: "Expense deleted successfully",
      position: "top",
      timeout: 2000,
      icon: "delete",
    });

    emitUpdateSummary();
  } catch (error) {
    console.error(error);
    $q.notify({
      type: "negative",
      message: "Failed to delete expense",
      position: "top",
      icon: "error",
    });
  }
};

const handleExpenseAdded = (newExpense) => {
  expensesReports.value.push(newExpense);
  emitUpdateSummary();

  $q.notify({
    type: "positive",
    message: "Expense added successfully",
    position: "top",
    timeout: 2000,
    icon: "add_circle",
  });
};

const emitUpdateSummary = () => {
  emit("update-summary", {
    reportId: props.reportId,
    charges: overallTotal.value,
    over: 0,
  });
};

// Initialize data
watch(
  () => props.sales_Reports,
  (newReports) => {
    if (newReports && newReports[0]?.expenses_reports) {
      expensesReports.value = newReports[0].expenses_reports.map((report) => ({
        ...report,
      }));
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.expenses-report-container {
  width: 100%;
  padding: 8px 0;
}

// Summary Cards
.summary-card {
  border-radius: 16px;
  border: 1px solid #f0f0f0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &.hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.12);
    border-color: transparent;
  }

  .summary-icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.bg-gradient-orange {
      background: linear-gradient(135deg, #ff8e53 0%, #ff6b6b 100%);
    }

    &.bg-gradient-blue {
      background: linear-gradient(135deg, #42a5f5 0%, #1976d2 100%);
    }

    &.bg-gradient-green {
      background: linear-gradient(135deg, #66bb6a 0%, #388e3c 100%);
    }
  }

  .summary-value {
    font-size: 1.4rem;
    font-weight: 700;
    color: #1e293b;
    line-height: 1.2;
  }
}

// Action Bar
.action-bar {
  background: #ffffff;
  border-radius: 30px;
  padding: 4px;

  .search-input {
    :deep(.q-field__control) {
      border-radius: 30px;
      height: 48px;
      border: 1px solid #f0f0f0;
      transition: all 0.2s;

      &:hover {
        border-color: #e0e0e0;
      }

      &.q-field--focused {
        border-color: #ff6b6b;
        box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
      }
    }
  }

  .add-expense-btn {
    background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
    color: white;
    border-radius: 30px;
    padding: 10px 24px;
    font-weight: 500;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 16px rgba(255, 107, 107, 0.3);
    }

    &:active {
      transform: scale(0.98);
    }
  }
}

// Expenses Grid
.expenses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.expense-card-wrapper {
  animation: fadeInUp 0.4s ease-out;
  animation-fill-mode: both;

  @for $i from 1 through 20 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.05}s;
    }
  }
}

.expense-card {
  border-radius: 20px;
  border: 1px solid #f0f0f0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.15);
    border-color: transparent;

    .menu-btn {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .expense-card-header {
    padding: 16px;
    border-bottom: 1px solid #f8f8f8;
  }

  .expense-category-badge {
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.3px;

    &.high {
      background: #ffebee;
      color: #c62828;
    }
    &.medium-high {
      background: #fff3e0;
      color: #ef6c00;
    }
    &.medium {
      background: #fff8e1;
      color: #ff8f00;
    }
    &.medium-low {
      background: #e8f5e9;
      color: #2e7d32;
    }
    &.low {
      background: #f5f5f5;
      color: #616161;
    }
  }

  .menu-btn {
    opacity: 0;
    transform: translateX(10px);
    transition: all 0.2s;

    &:hover {
      background: #f5f5f5;
    }
  }

  .expense-name {
    font-weight: 600;
    font-size: 1.1rem;
    color: #1e293b;
    margin: 8px 0 4px;
  }

  .expense-description {
    font-size: 0.8rem;
    color: #94a3b8;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .expense-card-body {
    padding: 16px;
    flex: 1;
  }

  .expense-amount {
    font-size: 1.3rem;
    font-weight: 700;
    color: #1e293b;
  }

  .percentage-indicator {
    font-weight: 600;
    font-size: 0.9rem;

    &.text-negative {
      color: #c62828;
    }
    &.text-orange {
      color: #ef6c00;
    }
    &.text-warning {
      color: #ff8f00;
    }
    &.text-positive {
      color: #2e7d32;
    }
    &.text-grey-6 {
      color: #757575;
    }
  }

  .progress-bar-container {
    height: 6px;
    background: #f0f0f0;
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    transition: width 0.3s ease;

    &.high {
      background: #ef5350;
    }
    &.medium-high {
      background: #ff9800;
    }
    &.medium {
      background: #ffc107;
    }
    &.medium-low {
      background: #4caf50;
    }
    &.low {
      background: #9e9e9e;
    }
  }

  .expense-card-footer {
    padding: 12px 16px;
    background: #fafafa;
    border-top: 1px solid #f0f0f0;
  }

  .expense-badge {
    font-weight: 500;
    padding: 4px 10px;
  }
}

// Empty State
.empty-state-container {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state {
  text-align: center;
  background: #f8fafc;
  border-radius: 32px;
  border: 2px dashed #e0e0e0;
  animation: pulse 2s infinite;

  .empty-icon-wrapper {
    position: relative;
    display: inline-block;

    .plus-icon {
      position: absolute;
      bottom: -4px;
      right: -8px;
      background: white;
      border-radius: 50%;
      padding: 4px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }

  .add-first-btn {
    background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
    color: white;
    border-radius: 30px;
    padding: 10px 28px;
    font-weight: 500;
  }
}

// Quick View Dialog
.quick-view-dialog {
  width: 400px;
  max-width: 90vw;
  border-radius: 28px;
  overflow: hidden;

  .dialog-header {
    background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);

    &.bg-negative {
      background: linear-gradient(135deg, #ef5350 0%, #c62828 100%);
    }
    &.bg-orange {
      background: linear-gradient(135deg, #ff9800 0%, #ef6c00 100%);
    }
    &.bg-warning {
      background: linear-gradient(135deg, #ffc107 0%, #ff8f00 100%);
    }
    &.bg-positive {
      background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
    }
    &.bg-grey-7 {
      background: linear-gradient(135deg, #616161 0%, #424242 100%);
    }

    .header-icon {
      width: 48px;
      height: 48px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(5px);
    }
  }

  .detail-grid {
    display: grid;
    gap: 16px;
  }

  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .detail-label {
      font-size: 0.8rem;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .detail-value {
      font-size: 1rem;
      color: #1e293b;

      &.amount {
        font-size: 1.3rem;
        font-weight: 700;
        color: #ff6b6b;
      }
    }
  }
}

// Animations
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

// List animations
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}

// Menu styles
.menu-list {
  border-radius: 16px;

  .q-item {
    min-height: 44px;

    &:hover {
      background: #f5f5f5;
    }

    &:active {
      background: #eeeeee;
    }
  }
}

// Responsive
@media (max-width: 600px) {
  .summary-card {
    .summary-icon-wrapper {
      width: 42px;
      height: 42px;
    }

    .summary-value {
      font-size: 1.2rem;
    }
  }

  .expense-card {
    .expense-name {
      font-size: 1rem;
    }

    .expense-amount {
      font-size: 1.1rem;
    }
  }
}
</style>
