<template>
  <div class="row q-col-gutter-lg q-mb-lg">
    <div v-for="stat in summaryStats" :key="stat.label" class="col-12 col-sm-6 col-md-3">
      <q-card class="summary-card" flat>
        <q-card-section class="row items-center no-wrap">
          <div :class="['icon-box', stat.colorClass]">
            <q-icon :name="stat.icon" size="24px" />
          </div>
          <div class="q-ml-md" style="min-width: 0; flex: 1">
            <div class="text-caption text-grey-6 text-weight-bold uppercase tracking-wider ellipsis">{{ stat.label }}</div>
            <div class="text-h5 text-weight-bolder text-dark">{{ stat.value }}</div>
          </div>
        </q-card-section>
        <div class="card-gradient" :class="stat.bgClass"></div>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useDashboardStore } from "src/stores/dashboard";

const dashboardStore = useDashboardStore();

const summaryStats = computed(() => [
  {
    label: "Total Branches",
    value: dashboardStore.stats.totalBranches || 0,
    icon: "store",
    colorClass: "text-blue",
    bgClass: "bg-blue",
  },
  {
    label: "Gross Sales",
    value: `₱${((dashboardStore.stats.totalGrossSalesData || []).reduce((a, b) => a + b, 0)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`,
    icon: "payments",
    colorClass: "text-emerald",
    bgClass: "bg-emerald",
  },
  {
    label: "Total Employees",
    value: dashboardStore.stats.totalEmployees || 0,
    icon: "group",
    colorClass: "text-purple",
    bgClass: "bg-purple",
  },
  {
    label: "Low Stock Items",
    value: dashboardStore.stats.lowStockItems || 0,
    icon: "warning",
    colorClass: "text-rose",
    bgClass: "bg-rose",
  },
]);

onMounted(() => {
  if (dashboardStore.selectedBranch !== 'global') {
    dashboardStore.setBranch('global');
  } else {
    dashboardStore.fetchDashboardMetrics();
  }
});
</script>

<style lang="scss" scoped>
.summary-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  }
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;

  &.text-blue { color: #3b82f6; background: #eff6ff; }
  &.text-emerald { color: #10b981; background: #ecfdf5; }
  &.text-purple { color: #8b5cf6; background: #f5f3ff; }
  &.text-rose { color: #f43f5e; background: #fff1f2; }
}

.card-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  opacity: 0.6;

  &.bg-blue { background: linear-gradient(90deg, #3b82f6, #60a5fa); }
  &.bg-emerald { background: linear-gradient(90deg, #10b981, #34d399); }
  &.bg-purple { background: linear-gradient(90deg, #8b5cf6, #a78bfa); }
  &.bg-rose { background: linear-gradient(90deg, #f43f5e, #fb7185); }
}

.tracking-wider {
  letter-spacing: 0.05em;
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.uppercase {
  text-transform: uppercase;
}
</style>
