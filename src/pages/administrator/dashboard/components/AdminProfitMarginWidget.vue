<template>
  <q-card flat bordered class="profit-margin-widget animate-fade q-mb-md">
    <q-card-section class="row items-center q-pb-none">
      <div>
        <div class="text-h6 text-weight-bold">Profit Margin Analysis</div>
        <div class="text-caption text-grey-6">
          Comparison of production cost vs sales revenue (last 30 days)
        </div>
      </div>
      <q-space />
      <div class="q-gutter-sm row items-center">
        <q-select
          v-model="selectedCategory"
          :options="categoryOptions"
          dense
          outlined
          bg-color="white"
          label="Category"
          style="min-width: 150px"
          class="q-mr-sm"
        />
        <q-btn flat round dense icon="info_outline" color="grey-6">
          <q-tooltip>
            <div>Bread: (Price * Qty Produced) - Recipe Cost</div>
            <div>Others: (Actual Sales) - (Purchase Cost * Qty Sold)</div>
          </q-tooltip>
        </q-btn>
      </div>
    </q-card-section>

    <q-card-section>
      <q-table
        :rows="filteredProfitMargins"
        :columns="columns"
        row-key="id"
        flat
        dense
        :pagination="{ rowsPerPage: 10, sortBy: 'margin' }"
        class="margin-table"
      >
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <div class="text-weight-bold text-dark text-capitalize">
              {{ props.row.name }}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-production="props">
          <q-td :props="props" class="text-center">
            <q-badge color="blue-1" text-color="blue-8" class="text-weight-bold">
              {{ props.row.production }} {{ props.row.category === 'Bread' ? 'PCS' : 'UNITS' }}
            </q-badge>
          </q-td>
        </template>

        <template v-slot:body-cell-category="props">
          <q-td :props="props" align="center">
            <q-chip
              size="xs"
              outline
              :color="getCategoryColor(props.row.category)"
              class="text-weight-bold"
            >
              {{ props.row.category }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-unit_cost="props">
          <q-td :props="props" class="text-weight-bold text-teal-8">
            {{ formatPrice(props.row.unit_cost) }}
          </q-td>
        </template>

        <template v-slot:body-cell-price="props">
          <q-td :props="props" class="text-weight-bold text-deep-orange-8">
            {{ formatPrice(props.row.price) }}
          </q-td>
        </template>

        <template v-slot:body-cell-total_sales_amount="props">
          <q-td :props="props" class="text-weight-medium">
            {{ formatPrice(props.row.total_sales_amount) }}
          </q-td>
        </template>

        <template v-slot:body-cell-cost="props">
          <q-td :props="props" class="text-grey-7">
            {{ formatPrice(props.row.cost) }}
          </q-td>
        </template>

        <template v-slot:body-cell-margin="props">
          <q-td :props="props">
            <div class="row items-center justify-end no-wrap">
              <q-linear-progress
                :value="props.row.margin / 100"
                :color="getMarginColor(props.row.margin)"
                size="6px"
                rounded
                class="q-mr-sm"
                style="width: 60px"
              />
              <span
                class="text-weight-bolder"
                :class="`text-${getMarginColor(props.row.margin)}`"
                style="width: 45px; text-align: right"
              >
                {{ props.row.margin }}%
              </span>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props" align="center">
            <q-chip
              size="xs"
              :color="getMarginColor(props.row.margin)"
              text-color="white"
              dense
              class="text-weight-bold text-uppercase"
            >
              {{ props.row.status }}
            </q-chip>
          </q-td>
        </template>
      </q-table>

      <div
        v-if="profitMargins.length === 0"
        class="flex flex-center column q-pa-xl text-grey-5"
      >
        <q-icon :name="isWarehouse ? 'warehouse' : 'analytics'" size="3em" />
        <div class="q-mt-sm text-center">
          <template v-if="isWarehouse">
            Profit analysis is only available for production branches.
            <div class="text-caption">Warehouses handle inventory and raw material storage.</div>
          </template>
          <template v-else>
            No sales or cost data available for calculation in this period.
          </template>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed } from "vue";
import { useDashboardStore } from "src/stores/dashboard";
import { typographyFormat } from "src/composables/typography/typography-format";

const dashboardStore = useDashboardStore();

const props = defineProps({
  profitMargins: {
    type: Array,
    default: () => [],
  },
});

const isWarehouse = computed(() => 
  String(dashboardStore.selectedBranch).startsWith('warehouse-')
);

const { formatPrice } = typographyFormat();

const columns = [
  {
    name: "name",
    label: "Product Name",
    align: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "category",
    label: "Category",
    align: "center",
    field: "category",
    sortable: true,
  },
  {
    name: "production",
    label: "Qty Produced",
    align: "center",
    field: "production",
    sortable: true,
  },
  {
    name: "unit_cost",
    label: "Unit Cost",
    align: "right",
    field: "unit_cost",
    sortable: true,
  },
  {
    name: "price",
    label: "Selling Price",
    align: "right",
    field: "price",
    sortable: true,
  },
  {
    name: "cost",
    label: "Total Cost",
    align: "right",
    field: "cost",
    sortable: true,
  },
  {
    name: "total_sales_amount",
    label: "Total Sales Amount",
    align: "right",
    field: "total_sales_amount",
    sortable: true,
  },
  {
    name: "margin",
    label: "Profit Margin",
    align: "right",
    field: "margin",
    sortable: true,
  },
  { name: "status", label: "Profit Rating", align: "center", field: "status" },
];

const getMarginColor = (margin) => {
  if (margin >= 50) return "positive";
  if (margin >= 30) return "primary";
  if (margin >= 20) return "warning";
  return "negative";
};

const getCategoryColor = (category) => {
  const map = {
    Bread: "brown",
    Selecta: "blue",
    Nestle: "orange",
    Softdrinks: "red",
    Others: "grey-7",
  };
  return map[category] || "primary";
};

const selectedCategory = ref("All");
const categoryOptions = ["All", "Bread", "Selecta", "Nestle", "Softdrinks", "Others"];

const filteredProfitMargins = computed(() => {
  if (selectedCategory.value === "All") return props.profitMargins;
  return props.profitMargins.filter(
    (item) => item.category === selectedCategory.value
  );
});
</script>

<style scoped>
.profit-margin-widget {
  border-radius: 16px;
  background: white;
  min-height: 400px;
}

.margin-table :deep(thead tr th) {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 11px;
  color: #64748b;
  background-color: #f8fafc;
  padding: 12px 16px;
}

.margin-table :deep(tbody tr td) {
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
}

.margin-table :deep(tbody tr:hover) {
  background-color: #f8fafc;
}

.animate-fade {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
