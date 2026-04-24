<template>
  <div class="row q-col-gutter-lg">
    <!-- Gross Revenue -->
    <div class="col-12 col-sm-6 col-lg-4">
      <q-card class="dashboard-stat-card elegant-card" flat>
        <q-card-section class="q-pa-lg">
          <div class="row items-center no-wrap">
            <div class="card-icon-wrapper text-emerald">
              <q-icon name="trending_up" size="32px" />
            </div>
            <div class="card-info q-ml-md" style="min-width: 0">
              <div class="text-caption text-uppercase text-weight-bold text-grey-5 tracking-wide">
                {{ timeRangeText }} Gross Revenue
              </div>
              <div 
                class="text-weight-bolder text-dark q-mt-xs ds-number no-wrap overflow-hidden text-overflow-ellipsis"
                :style="{ fontSize: getFontSize(stats.totalGrossSalesData) }"
              >
                ₱{{ (stats.totalGrossSalesData || []).reduce((a,b)=>a+b, 0).toLocaleString() }}
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Operating Expenses -->
    <div class="col-12 col-sm-6 col-lg-4">
      <q-card class="dashboard-stat-card elegant-card" flat>
        <q-card-section class="q-pa-lg">
          <div class="row items-center no-wrap">
            <div class="card-icon-wrapper text-rose">
              <q-icon name="receipt_long" size="32px" />
            </div>
            <div class="card-info q-ml-md" style="min-width: 0">
              <div class="text-caption text-uppercase text-weight-bold text-grey-5 tracking-wide">
                {{ timeRangeText }} Expenses
              </div>
              <div 
                class="text-weight-bolder text-dark q-mt-xs ds-number no-wrap overflow-hidden text-overflow-ellipsis"
                :style="{ fontSize: getFontSize(stats.totalExpensesData) }"
              >
                ₱{{ (stats.totalExpensesData || []).reduce((a,b)=>a+b, 0).toLocaleString() }}
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Net Profit -->
    <div class="col-12 col-sm-6 col-lg-4">
      <q-card class="dashboard-stat-card elegant-card" flat>
        <q-card-section class="q-pa-lg">
          <div class="row items-center no-wrap">
            <div class="card-icon-wrapper text-blue">
              <q-icon name="account_balance_wallet" size="32px" />
            </div>
            <div class="card-info q-ml-md" style="min-width: 0">
              <div class="text-caption text-uppercase text-weight-bold text-grey-5 tracking-wide">
                {{ timeRangeText }} Net Profit
              </div>
              <div 
                class="text-weight-bolder text-dark q-mt-xs ds-number no-wrap overflow-hidden text-overflow-ellipsis"
                :style="{ fontSize: getFontSize(stats.totalSalesData) }"
              >
                ₱{{ (stats.totalSalesData || []).reduce((a,b)=>a+b, 0).toLocaleString() }}
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Total Branches -->
    <div class="col-12 col-sm-6 col-lg-3">
      <q-card class="dashboard-stat-card elegant-card" flat>
        <q-card-section class="q-pa-lg">
          <div class="row items-center no-wrap">
            <div class="card-icon-wrapper text-blue">
              <q-icon name="storefront" size="32px" />
            </div>
            <div class="card-info q-ml-md">
              <div class="text-caption text-uppercase text-weight-bold text-grey-5 tracking-wide">
                Active Branches
              </div>
              <div class="text-h4 text-weight-bolder text-dark q-mt-xs ds-number">
                {{ stats.totalBranches || 0 }}
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Active Employees -->
    <div class="col-12 col-sm-6 col-lg-3">
      <q-card class="dashboard-stat-card elegant-card" flat>
        <q-card-section class="q-pa-lg">
          <div class="row items-center no-wrap">
            <div class="card-icon-wrapper text-emerald">
              <q-icon name="group" size="32px" />
            </div>
            <div class="card-info q-ml-md">
              <div class="text-caption text-uppercase text-weight-bold text-grey-5 tracking-wide">
                Active Staff
              </div>
              <div class="text-h4 text-weight-bolder text-dark q-mt-xs ds-number">
                {{ stats.totalEmployees || 0 }}
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Total Recipes -->
    <div class="col-12 col-sm-6 col-lg-3">
      <q-card class="dashboard-stat-card elegant-card" flat>
        <q-card-section class="q-pa-lg">
          <div class="row items-center no-wrap">
            <div class="card-icon-wrapper text-emerald">
              <q-icon name="restaurant_menu" size="32px" />
            </div>
            <div class="card-info q-ml-md">
              <div class="text-caption text-uppercase text-weight-bold text-grey-5 tracking-wide">
                Total Recipes
              </div>
              <div class="text-h4 text-weight-bolder text-dark q-mt-xs ds-number">
                {{ stats.totalRecipes || 0 }}
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Low Stock Warning -->
    <div class="col-12 col-sm-6 col-lg-3">
      <q-card class="dashboard-stat-card elegant-card" flat>
        <q-card-section class="q-pa-lg">
          <div class="row items-center no-wrap">
            <div class="card-icon-wrapper text-rose">
              <q-icon name="warning_amber" size="32px" />
            </div>
            <div class="card-info q-ml-md">
              <div class="text-caption text-uppercase text-weight-bold text-grey-5 tracking-wide">
                Low Stock Alerts
              </div>
              <div class="text-h4 text-weight-bolder text-dark q-mt-xs ds-number">
                {{ stats.lowStockItems || 0 }}
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDashboardStore } from "src/stores/dashboard";

const props = defineProps({
  stats: {
    type: Object,
    required: true,
  },
});

const dashboardStore = useDashboardStore();

const timeRangeText = computed(() => {
  const map = {
    '7D': '7-Day',
    '1M': 'Monthly',
    '3M': 'Quarterly',
    '1Y': 'Yearly'
  };
  return map[dashboardStore.timeRange] || 'Weekly';
});
const getFontSize = (data) => {
  const value = (data || []).reduce((a, b) => a + b, 0);
  const len = value.toLocaleString().length;
  if (len > 12) return '1.25rem'; // Smaller for billions
  if (len > 9) return '1.5rem';  // Medium for millions
  return '2.125rem';             // Default text-h4 size
};
</script>

<style lang="scss" scoped>
.elegant-card {
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08);
    border-color: rgba(226, 232, 240, 1);

    .card-icon-wrapper {
      transform: scale(1.1) rotate(5deg);
    }
  }
}

/* Typography styles */
.tracking-wide {
  letter-spacing: 1px;
}
.ds-number {
  line-height: 1;
  letter-spacing: -0.5px;
}

.overflow-hidden {
  overflow: hidden;
}

.text-overflow-ellipsis {
  text-overflow: ellipsis;
}

.no-wrap {
  white-space: nowrap;
}

/* Icon Wrappers */
.card-icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s ease;
  flex-shrink: 0;

  &.text-blue {
    background: #eff6ff;
    color: #3b82f6;
  }
  &.text-emerald {
    background: #ecfdf5;
    color: #10b981;
  }
  &.text-purple {
    background: #f5f3ff;
    color: #8b5cf6;
  }
  &.text-rose {
    background: #fff1f2;
    color: #f43f5e;
  }
  &.text-orange {
    background: #fff7ed;
    color: #f97316;
  }
}
</style>
