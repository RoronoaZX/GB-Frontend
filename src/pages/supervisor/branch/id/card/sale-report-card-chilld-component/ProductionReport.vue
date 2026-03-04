<template>
  <div class="products-report-container">
    <q-card class="products-card">
      <q-card-section class="products-header q-pa-md">
        <div class="row items-center">
          <div class="header-icon">
            <q-icon name="inventory" size="md" color="white" />
          </div>
          <div class="q-ml-md">
            <div class="text-h6 text-white text-weight-bold">
              Products Report
            </div>
            <div class="text-caption text-white text-opacity-80">
              <q-icon name="event" size="xs" class="q-mr-xs" />
              {{ formatDate(reportDate) }} • {{ reportLabel }}
            </div>
          </div>

          <q-space />

          <div class="row q-gutter-sm">
            <q-chip
              v-if="localCharges > 0"
              dense
              class="summary-chip negative-chip"
              icon="trending_down"
            >
              Charge: {{ formatPrice(localCharges) }}
            </q-chip>
            <q-chip
              v-if="localOver > 0"
              dense
              class="summary-chip positive-chip"
              icon="trending"
            >
              Over: {{ formatPrice(localOver) }}
            </q-chip>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-lg">
        <div class="text-subtitle2 text-grey-7 q-mb-md">
          <q-icon name="category" size="xs" class="q-mr-sm" />
          Select Product Category to View Details
        </div>

        <div class="row q-col-gutter-md">
          <!-- Bread Reprot Card -->
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <q-card
              flat
              bordered
              class="product-card hover-scale"
              @click="
                handleBreadDialog(
                  props.sales_Reports[0]?.bread_reports,
                  props.sales_Reports[0]?.id,
                  props.sales_Reports[0]?.user,
                  props.reportLabel,
                  props.reportDate
                )
              "
            >
              <q-card-section class="text-center q-pa-md">
                <div class="product-icon bg-brown-2">
                  <q-icon name="bakery_dining" size="28px" color="brown-8" />
                </div>

                <div class="text-weight-bold q-mt-sm">Bread Report</div>
                <div class="text-caption text-grey-6">
                  {{ getItemCount(props.sales_Reports[0]?.bread_reports) }}
                  items
                </div>
              </q-card-section>

              <q-card-actions class="q-pa-none">
                <q-btn
                  flat
                  class="full-width view-btn"
                  color="brown-7"
                  label="View Details"
                  no-caps
                />
              </q-card-actions>
            </q-card>
          </div>

          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <q-card
              flat
              bordered
              class="product-card hover-scale"
              @click="
                handleSelectaDialog(
                  props.sales_Reports[0].selecta_reports,
                  props.sales_Reports[0].id,
                  props.sales_Reports[0].user,
                  props.reportLabel,
                  props.reportDate
                )
              "
            >
              <q-card-section class="text-center q-pa-md">
                <div class="product-icon bg-red-2">
                  <q-icon name="icecream" size="28px" color="red-8" />
                </div>
                <div class="text-weight-bold q-mt-sm">Selecta Report</div>
                <div class="text-caption text-grey-6">
                  {{ getItemCount(props.sales_Reports[0]?.selecta_reports) }}
                  items
                </div>
              </q-card-section>
              <q-card-actions class="q-pa-none">
                <q-btn
                  flat
                  class="full-width view-btn"
                  color="red-6"
                  label="View Details"
                  no-caps
                />
              </q-card-actions>
            </q-card>
          </div>

          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <q-card flat bordered class="product-card hover-scale">
              <q-card-section class="text-center q-pa-md">
                <div class="product-icon bg-accent-2">
                  <q-icon name="local_drink" size="28px" color="accent" />
                </div>
                <div class="text-weight-bold q-mt-sm">Softdrinks Report</div>
                <div class="text-caption text-grey-6">
                  {{ getItemCount(props.sales_Reports[0]?.softdrinks_reports) }}
                  item
                </div>
              </q-card-section>

              <q-card-actions class="q-pa-more">
                <q-btn
                  flat
                  class="full-width view-btn"
                  color="accent"
                  label="View Details"
                  no-caps
                />
              </q-card-actions>
            </q-card>
          </div>

          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <q-card flat bordered class="product-card hover-scale">
              <q-card-section class="text-center q-pa-md">
                <div class="product-icon bg-teal-2">
                  <q-icon name="cake" size="28px" color="teal-8" />
                </div>
                <div class="text-weight-bold q-mt-sm">Cake Report</div>
                <div class="text-caption text-grey-6">
                  {{ getCakeCount(props.sales_Reports[0]?.cake_reports) }} item
                </div>
              </q-card-section>
              <q-card-actions class="q-pa-none">
                <q-btn
                  flat
                  class="full-width view-btn"
                  color="teal-7"
                  label="View Details"
                  no-caps
                />
              </q-card-actions>
            </q-card>
          </div>

          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <q-card flat bordered class="product-card hover-scale">
              <q-card-section class="text-center q-pa-md">
                <div class="product-icon bg-blue-grey-2">
                  <q-icon name="category" size="28px" color="blue-grey-8" />
                </div>
                <div class="text-weight-bold q-mt-sm">Other Products</div>
                <div class="text-caption text-grey-6">
                  {{
                    getItemCount(props.sales_Reports[0]?.other_products_reports)
                  }}
                  items
                </div>
              </q-card-section>
              <q-card-actions class="q-pa-none">
                <q-btn
                  flat
                  class="full-width view-btn"
                  color="blue-grey-7"
                  label="View Details"
                  no-caps
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>

        <div class="row q-col-gutter-md q-mt-lg">
          <div class="col-12 col-sm-4">
            <q-card flat bordered class="stats-card">
              <q-card-section class="q-pa-sm text-center">
                <q-icon name="inventory_2" size="sm" color="teal" />
                <div class="text-caption text-grey-7">Total Items</div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-sm-4">
            <q-card flat bordered class="stats-card">
              <q-card-section class="q-pa-sm text-center">
                <q-icon name="warning" size="sm" color="orange" />
                <div class="text-h6 q-mt-xs">{{ negativeItemsCount }}</div>
                <div class="text-caption text-grey-7">Items with Issues</div>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-sm-4">
            <q-card flat bordered class="stats-card">
              <q-card-section class="q-pa-sm text-center">
                <q-icon name="receipt" size="sm" color="purple" />
                <div class="text-h6 q-mt-xs">{{ categoriesCount }}</div>
                <div class="text-caption text-grey-7">Categories</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { typographyFormat } from "src/composables/typography/typography-format";
import BreadReport from "../sale-report-card-chilld-component/pages/BreadPage.vue";
import SelectaReport from "../sale-report-card-chilld-component/pages/SelectaPage.vue";
import { computed, ref, watch } from "vue";

const { formatDate, formatPrice } = typographyFormat();

const props = defineProps([
  "sales_Reports",
  "reportLabel",
  "reportDate",
  "charges",
  "over",
  "reportId",
]);

console.log("Sales reportDate", props.sales_Reports);

const $q = useQuasar();
const emit = defineEmits(["update-summary"]);

const localCharges = ref(props.charges ?? 0);
const localOver = ref(props.over ?? 0);

watch(
  () => props.charges,
  (newVal) => {
    localCharges.value = newVal ?? 0;
  }
);

watch(
  () => props.over,
  (newVal) => {
    localOver.value = newVal ?? 0;
  }
);

const totalItems = computed(() => {
  const report = props.sales_Reports[0];

  if (!report) return 0;

  return (
    (report.bread_reports?.length || 0) +
    (report.selecta_reports?.length || 0) +
    (report.nestle_reports?.length || 0) +
    (report.softdrinks_reports?.length || 0) +
    (report.other_products_reports?.length || 0)
  );
});

const negativeItemsCount = computed(() => {
  const report = props.sales_Reports[0];
  if (!report) return 0;

  let count = 0;

  const checkNegative = (items) => {
    if (!items) return;
    items.forEach((item) => {
      const beginnings = Number(item.beginnings || 0);
      const added = Number(item.new_production || item.added_stocks || 0);
      const remaining = Number(item.remaining || 0);
      const out = Number(item.bread_out || item.out || 0);
      const total = beginnings + added;
      const sold = total - (remaining + out);
      if (sold < 0) count++;
    });
  };

  checkNegative(report.bread_reports);
  checkNegative(report.selecta_reports);
  checkNegative(report.nestle_reports);
  checkNegative(report.softdrinks_reports);
  checkNegative(report.other_products_reports);

  return count;
});

const categoriesCount = computed(() => {
  const report = props.sales_Reports[0];
  if (!report) return 0;

  let count = 0;
  if (report.bread_reports?.length) count++;
  if (report.selecta_reports?.length) count++;
  if (report.nestle_reports?.length) count++;
  if (report.softdrinks_reports?.length) count++;
  if (report.cake_sales_reports?.length) count++;
  if (report.other_products_reports?.length) count++;

  return count;
});

const getItemCount = (items) => {
  return items?.length || 0;
};

const getCakeCount = (cakes) => {
  return cakes?.length || 0;
};

const handleBreadDialog = (
  dataReports,
  sales_report_id,
  user,
  reportLabel,
  reportDate
) => {
  $q.dialog({
    component: BreadReport,
    componentProps: {
      reports: dataReports,
      sales_report_id: sales_report_id,
      use: user,
      reportLabel: reportLabel,
      reportDate: reportDate,
    },
  }).onOk((summary) => {
    localCharges.value = summary.charges;
    localOver.value = summary.over;
    emit("update-summary", {
      reportId: props.reportId,
      charges: localCharges.value,
      over: localOver.value,
    });
  });
};

const handleSelectaDialog = (
  dataReports,
  sales_report_id,
  user,
  reportLabel,
  reportDate
) => {
  $q.dialog({
    component: SelectaReport,
    componentProps: {
      reports: dataReports,
      sales_report_id: sales_report_id,
      user: user,
      reportLabel: reportLabel,
      reportDate: reportDate,
    },
  }).onOk((summary) => {
    localCharges.value = summary.charges;
    localCharges.value = summary.over;

    emit("update-summary", {
      reportId: props.reportId,
      charges: localCharges.value,
      over: localOver.value,
    });
  });
};
</script>

<style lang="scss" scoped>
.products-report-container {
  width: 100%;
}

.products-card {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.products-header {
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);

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

.summary-chip {
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;

  &.negative-chip {
    background: #ffebee;
    color: #c62828;
  }

  &.positive-chip {
    background: #e8f5e9;
    color: #2e7d32;
  }
}

.product-card {
  border-radius: 16px;
  transition: all 0.3s;
  cursor: pointer;
  overflow: hidden;

  &.hover-scale {
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);

      .view-btn {
        background: rgba(0, 0, 0, 0.02);
      }
    }
  }

  .product-icon {
    width: 64px;
    height: 64px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    transition: all 0.3s;
  }

  .view-btn {
    border-radius: 0;
    padding: 12px;
    transition: all 0.2s;

    &:hover {
      background: rgba(0, 0, 0, 0.04) !important;
    }
  }
}

.stats-card {
  border-radius: 14px;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  }
}

// Responsive adjustments
@media (max-width: 600px) {
  .products-header {
    .header-icon {
      width: 40px;
      height: 40px;
    }

    .text-h6 {
      font-size: 1rem;
    }
  }

  .product-card {
    .product-icon {
      width: 56px;
      height: 56px;

      i {
        font-size: 24px !important;
      }
    }
  }
}
</style>
