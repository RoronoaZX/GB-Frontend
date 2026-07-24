<template>
  <q-page>
    <div class="print-hide q-mb-md">
      <div class="row items-center justify-between q-col-gutter-md">
        <!-- Left: Tab navigation -->
        <div class="col-12 col-md-7">
          <q-tabs
            v-model="tab"
            narrow-indicator
            no-caps
            inline-label
            dense
            align="justify"
            class="gradient-btn text-white rounded-borders shadow-1"
          >
            <q-route-tab
              :to="{ name: 'admin-payroll-payslip-cards' }"
              class="text-white"
              name="cards"
              icon="badge"
              label="Employee Payslips"
            />
            <q-route-tab
              :to="{ name: 'admin-payroll-payslip-cutoff-summary' }"
              class="text-white"
              name="cutoff_summary"
              icon="assessment"
              label="Cut-off Summary Register"
            />
          </q-tabs>
        </div>

        <!-- Right: Establishment Selector (Branch / Warehouse / Global) -->
        <div class="col-12 col-md-5">
          <q-select
            outlined
            dense
            v-model="payslipStore.selectedEstablishment"
            :options="establishmentOptions"
            label="Establishment Location"
            class="bg-white rounded-borders shadow-1"
            emit-value
            map-options
            behavior="menu"
          >
            <template v-slot:prepend>
              <q-icon name="storefront" color="teal" />
            </template>
          </q-select>
        </div>
      </div>
    </div>

    <div>
      <router-view />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { usePayslipStore } from "src/stores/payslip";
import { useBranchesStore } from "src/stores/branch";
import { useWarehousesStore } from "src/stores/warehouse";

const payslipStore = usePayslipStore();
const branchesStore = useBranchesStore();
const warehousesStore = useWarehousesStore();

const tab = ref("cards");

const branches = computed(() => branchesStore.branches);
const warehouses = computed(() => warehousesStore.warehouses);

const establishmentOptions = computed(() => {
  const options = [
    { label: "Network Global (All Establishments)", value: "global" },
  ];

  if (branches.value && branches.value.length > 0) {
    options.push({
      label: "--- Branches ---",
      disable: true,
    });
    branches.value.forEach((b) => {
      options.push({
        label: `Branch: ${b.name}`,
        value: `branch-${b.id}`,
      });
    });
  }

  if (warehouses.value && warehouses.value.length > 0) {
    options.push({
      label: "--- Warehouses ---",
      disable: true,
    });
    warehouses.value.forEach((w) => {
      options.push({
        label: `Warehouse: ${w.name}`,
        value: `warehouse-${w.id}`,
      });
    });
  }

  return options;
});

onMounted(async () => {
  try {
    await Promise.all([
      branchesStore.fetchBranches(),
      warehousesStore.fetchWarehouses(),
    ]);
  } catch (err) {
    console.error("Error fetching establishments:", err);
  }
});
</script>

<style lang="scss" scoped>
.gradient-btn {
  background: linear-gradient(45deg, #103432, #2575fc);
  border: none;
  border-radius: 8px;
}

@media print {
  .print-hide {
    display: none !important;
  }
}
</style>
