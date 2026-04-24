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
      <div class="q-gutter-sm">
        <q-btn flat round dense icon="info_outline" color="grey-6">
          <q-tooltip>Margin = ((Revenue - Cost) / Revenue) * 100</q-tooltip>
        </q-btn>
      </div>
    </q-card-section>

    <q-card-section>
      <q-table
        :rows="profitMargins"
        :columns="columns"
        row-key="id"
        flat
        dense
        :pagination="{ rowsPerPage: 5 }"
        class="margin-table"
      >
        <template v-slot:body-cell-name="props">
          <q-td :props="props">
            <div class="text-weight-bold text-dark text-capitalize">
              {{ props.row.name }}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-revenue="props">
          <q-td :props="props" class="text-weight-medium">
            {{ formatPrice(props.row.revenue) }}
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
        <q-icon name="analytics" size="3em" />
        <div class="q-mt-sm">
          No sales or cost data available for calculation
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { typographyFormat } from "src/composables/typography/typography-format";

const props = defineProps({
  profitMargins: {
    type: Array,
    default: () => [],
  },
});

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
    name: "revenue",
    label: "Sales Revenue",
    align: "right",
    field: "revenue",
    sortable: true,
  },
  {
    name: "cost",
    label: "Production Cost",
    align: "right",
    field: "cost",
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
