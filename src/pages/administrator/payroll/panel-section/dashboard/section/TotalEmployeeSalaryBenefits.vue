<template>
  <!-- Skeleton View -->
  <div v-if="loading" class="row q-col-gutter-lg q-mb-md q-mt-sm">
    <div class="col-12 col-md-4" v-for="i in 3" :key="i">
      <q-card class="elegant-card q-pa-lg" flat bordered>
        <div class="row items-center no-wrap">
          <q-skeleton type="QAvatar" size="64px" class="rounded-borders" style="border-radius: 20px;" />
          <div class="q-ml-md" style="flex: 1">
            <q-skeleton type="text" width="60%" height="12px" />
            <q-skeleton type="text" width="40%" height="28px" class="q-mt-sm" />
          </div>
        </div>
      </q-card>
    </div>
  </div>

  <!-- Real Data View -->
  <div v-else class="row q-col-gutter-lg q-mb-md q-mt-sm">
    <!-- Total Employee -->
    <div class="col-12 col-md-4">
      <q-card class="elegant-card" flat bordered>
        <q-card-section class="q-pa-lg">
          <div class="row items-center no-wrap">
            <div class="card-icon-wrapper text-blue">
              <q-icon name="group" size="32px" />
            </div>
            <div class="card-info q-ml-md" style="min-width: 0">
              <div class="text-caption text-uppercase text-weight-bold text-grey-5 tracking-wide">
                Total Employees
              </div>
              <div class="text-weight-bolder text-dark q-mt-xs ds-number">
                {{ employees.length }}
              </div>
              <div class="text-caption text-grey-6 q-mt-xs">Active Staff Count</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Salary Per Month -->
    <div class="col-12 col-md-4">
      <q-card class="elegant-card" flat bordered>
        <q-card-section class="q-pa-lg">
          <div class="row items-center no-wrap">
            <div class="card-icon-wrapper text-emerald">
              <q-icon name="payments" size="32px" />
            </div>
            <div class="card-info q-ml-md" style="min-width: 0">
              <div class="text-caption text-uppercase text-weight-bold text-grey-5 tracking-wide">
                Salary Per Month
              </div>
              <div class="text-weight-bolder text-dark q-mt-xs ds-number">
                ₱52,962
              </div>
              <div class="text-caption text-grey-6 q-mt-xs">Current Monthly Payroll</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Benefits Fund -->
    <div class="col-12 col-md-4">
      <q-card class="elegant-card" flat bordered>
        <q-card-section class="q-pa-lg">
          <div class="row items-center no-wrap">
            <div class="card-icon-wrapper text-warning">
              <q-icon name="volunteer_activism" size="32px" />
            </div>
            <div class="card-info q-ml-md" style="min-width: 0">
              <div class="text-caption text-uppercase text-weight-bold text-grey-5 tracking-wide">
                Benefits Fund
              </div>
              <div class="text-weight-bolder text-dark q-mt-xs ds-number">
                ₱200,123
              </div>
              <div class="text-caption text-grey-6 q-mt-xs">Active Employee Funds</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { useEmployeeStore } from "src/stores/employee";
import { computed, onMounted, ref } from "vue";

const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);
const loading = ref(true);

onMounted(async () => {
  await fetchEmployeeData();
});

const fetchEmployeeData = async () => {
  loading.value = true;
  try {
    employees.value = await employeeStore.fetchAllEmployee();
  } catch (error) {
    /* console.log("error fetching employee: ", error); */
  } finally {
    loading.value = false;
  }
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
  font-size: 2.125rem;
  line-height: 1;
  letter-spacing: -0.5px;
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
  &.text-warning {
    background: #fffbeb;
    color: #f59e0b;
  }
}
</style>
