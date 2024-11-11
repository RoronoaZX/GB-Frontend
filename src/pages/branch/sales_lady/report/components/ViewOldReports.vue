<template>
  <q-btn
    outline
    class="text-white q-pa-sm"
    push
    dense
    elevated
    icon="visibility"
    label="View Reports"
    @click="openDialog"
  >
  </q-btn>
  <q-dialog v-model="dialog" maximized>
    <q-card>
      <q-card-section>
        <div class="row justify-between">
          <div>
            <div class="row">
              <q-btn
                padding="sm md"
                size="sm"
                dense
                flat
                label="prev"
                icon="arrow_back_ios_new"
              />
              <!-- @click="onPrev" -->
              <q-separator vertical />
              <q-btn padding="sm md" size="sm" dense flat>
                <!-- @click="onCurrent" -->
                CURRENT</q-btn
              >
              <q-separator vertical />
              <q-btn
                padding="sm md"
                size="sm"
                dense
                flat
                label="next"
                icon="arrow_forward_ios"
              />
              <!-- @click="onNext" -->
            </div>
          </div>
          <div>
            <!-- padding="sm md" -->
            <q-btn size="md" outline rounded icon="close" dense v-close-popup />
          </div>
        </div>
      </q-card-section>
      <div class="row q-pa-md justify-between">
        <div>
          <div>Date: November 11, 2024</div>
          Cashier: Cashier C. Cashier
        </div>
        <div>Time: 08:00 PM</div>
      </div>
      <q-table title="" :rows="rows" :columns="columns" row-key="name" />

      {{ salesReport }}
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useSalesReportsStore } from "src/stores/sales-report";
import { computed, onMounted, ref } from "vue";

const salesReportStore = useSalesReportsStore();
const salesReport = computed(() => salesReportStore.salesReport);
const userData = computed(() => salesReportStore.user);
const branchId =
  userData.value?.data?.employee?.branch_employee?.branch_id || "";
console.log("sales branch id", branchId);
const loading = ref(true);

const dialog = ref(false);

const openDialog = () => {
  dialog.value = true;
};

onMounted(async () => {
  console.log("Onmounted data", branchId);
  if (branchId) {
    await reloadTableData(branchId);
  }
});

const reloadTableData = async (branchId) => {
  console.log("branch data", branchId);
  loading.value = true;
  await salesReportStore.fetchSalesReports(branchId);
  loading.value = false;
};

const columns = [
  {
    name: "name",
    required: true,
    label: "Dessert (100g serving)",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "calories",
    align: "center",
    label: "Calories",
    field: "calories",
    sortable: true,
  },
  { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
  { name: "carbs", label: "Carbs (g)", field: "carbs" },
  { name: "protein", label: "Protein (g)", field: "protein" },
  { name: "sodium", label: "Sodium (mg)", field: "sodium" },
  {
    name: "calcium",
    label: "Calcium (%)",
    field: "calcium",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "iron",
    label: "Iron (%)",
    field: "iron",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const rows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: "0%",
    iron: "0%",
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: "0%",
    iron: "2%",
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: "0%",
    iron: "45%",
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: "2%",
    iron: "22%",
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: "12%",
    iron: "6%",
  },
];
</script>

<style lang="scss" scoped></style>
