<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    @cancel="onDialogCancel"
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="slide-left"
    transition-hide="slide-right"
    class="mobile-bread-dialog"
  >
    <q-card class="bg-grey-1 mobile-card">
      <div class="fixed-header">
        <q-card-section class="header-gradient text-white q-py-sm">
          <div class="row items-center justify-between">
            <div class="row items-center">
              <div class="header-icon-wrapper">
                <q-icon name="bakery_dining" size="24px" color="brown-7" />
              </div>
              <div class="q-ml-sm">
                <div class="text-subtitle1 text-weight-bold">
                  Bread Production
                </div>
                <div class="row items-center text-caption opacity-80">
                  <q-icon name="event" size="12px" class="q-mr-xs" />
                  {{ formatDate(reportDate) }} • {{ reportLabel }}
                </div>
              </div>
            </div>
            <div class="row items-center">
              <q-btn
                icon="close"
                flat
                dense
                round
                v-close-popup
                class="text-white"
              />
            </div>
          </div>
          <div class="row q-mt-md q-gutter-xs">
            <q-chip size="sm" class="bg-white text-brown-8">
              <q-avatar
                icon="inventory"
                color="brown-2"
                text-color="brown-8"
                size="18px"
              />
              {{ filteredRows.length }} items
            </q-chip>
            <q-chip
              v-if="negativeSalesRows.length"
              size="sm"
              class="bg-red-1 text-red-9"
            >
              <q-avatar
                icon="warning"
                color="red-2"
                text-color="red-9"
                size="18px"
              />
              {{ negativeSalesRows.length }} descrepancies
            </q-chip>
          </div>
        </q-card-section>

        <!-- Search Bar -->
        <q-card-section class="q-py-sm bg-white">
          <q-input
            v-model="filter"
            outlined
            placeholder="Search bread..."
            dense
            rounded
            class="search-input"
            bg-color="white"
          >
            <template v-slot:prepend>
              <q-icon name="search" color="brown-6" size="16px" />
            </template>

            <template v-slot:append v-if="filter">
              <q-icon
                name="close"
                size="16px"
                class="cursor-pointer"
                @click="filter = ''"
              />
            </template>
          </q-input>
        </q-card-section>

        <!-- Negative Sales Warning -->
        <q-card-section
          v-if="negativeSalesRows.length"
          class="q-pt-sm q-pb-none"
        >
          <q-banner
            dense
            class="bg-red-1 text-red-10 rounded-borders cursor-pointer"
            @click="showErrors = !showErrors"
          >
            <template v-slot:avatar>
              <q-icon name="warning" color="red" size="sm" />
            </template>

            <div class="row items-center justify-between">
              <span class="text-caption">
                <span class="text-weight-bold">
                  {{ negativeSalesRows.length }} descrepancies
                </span>
                item(s) with negative sales
              </span>

              <q-icon
                :name="showErrors ? 'expand_less' : 'expand_more'"
                size="16px"
              />
            </div>
          </q-banner>
        </q-card-section>

        <!-- Negative sales details -->
        <q-slide-transition>
          <q-card-section v-if="showErrors" class="q-pt-sm">
            <q-card flat bordered class="erroe-card">
              <q-card-section class="q-pa-sm bg-red-1">
                <div class="text-caption text-weight-bold text-red-9">
                  Negative Sales Details
                </div>
              </q-card-section>

              <q-list separator class="error-list">
                <q-item
                  v-for="item in negativeSalesRows"
                  :key="item - id"
                  class="q-py-sm"
                >
                  <q-item-section>
                    <q-item-label class="text-weight-medium">
                      {{ capitalizeFirstLetter(item.bread.name || "Unknown") }}
                    </q-item-label>
                    <q-item-label caption>
                      Deficit:
                      <span class="text-red text-weight-bold">
                        {{ formatPrice(item.salesAmount) }}
                      </span>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-badge color="red-2" text-color="red-10">
                      -{{ Math.abs(item.salesAmount / item.price) }} pcs
                    </q-badge>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </q-card-section>
        </q-slide-transition>
      </div>

      <div class="scrollable-content">
        <q-card-section class="q-pt-md q-px-md">
          <div v-if="filteredRows.length === 0" class="empty-state">
            <q-icon name="inventory" size="48px" color="grey-4" />
            <div class="text-h6 text-grey-6 q-mt-md">No Bread Reports</div>
            <div class="text-caption text-grey-5">
              No reports available for this date
            </div>
          </div>

          <q-list v-else separator class="bread-list">
            <q-item
              v-for="item in filteredRows"
              :key="item.id"
              class="bread-item q-mb-sm"
              clickable
              v-ripple
            >
              <!-- Main Content -->
              <div class="bread-item-content">
                <div class="row items-start no-wrap">
                  <!-- Avatar -->
                  <q-avatar size="48px" class="bg-brown-2 text-brown-8 q-mr-sm">
                    <q-icon name="bakery_dining" size="24px" />
                  </q-avatar>

                  <!-- Main Info -->
                  <div class="col">
                    <div class="row items-center justify-between">
                      <div class="text-weight-bold text-brown-9">
                        {{ capitalizeFirstLetter(item.bread.name) }}
                      </div>
                      <q-btn flat round icon="edit" color="brown-7" size="sm">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-card class="edit-popup">
                            <q-card-section
                              class="bg-brown-7 text-white q-py-sm"
                            >
                              <div class="text-caption text-weight-bold">
                                Edit
                                {{
                                  capitalizeFirstLetter(
                                    item.bread.name || "Unknown"
                                  )
                                }}
                              </div>
                              <div></div>
                            </q-card-section>

                            <q-card-section class="q-gutter-md q-pa-md">
                              <q-input
                                v-model.number="item.beginnings"
                                label="Beginnings"
                                dense
                                type="number"
                                outlined
                                @update:model-value="
                                  (val) =>
                                    handleGlobalUpdate(item, 'beginnings', val)
                                "
                              />

                              <q-input
                                v-model.number="item.new_production"
                                label="New Production"
                                dense
                                type="number"
                                outlined
                                @update:model-value="
                                  (val) =>
                                    handleGlobalUpdate(
                                      item,
                                      'new_production',
                                      val
                                    )
                                "
                              />
                              <q-input
                                v-model.number="item.remaining"
                                label="Remaining"
                                dense
                                type="number"
                                outlined
                                @update:model-value="
                                  (val) =>
                                    handleGlobalUpdate(item, 'remaining', val)
                                "
                              />
                              <q-input
                                v-model.number="item.bread_out"
                                label="Out"
                                dense
                                type="number"
                                outlined
                                @update:model-value="
                                  (val) =>
                                    handleGlobalUpdate(item, 'bread_out', val)
                                "
                              />
                            </q-card-section>

                            <q-card-actions align="right" class="q-pa-sm">
                              <q-btn flat label="Done" color="brown-7" />
                            </q-card-actions>
                          </q-card>
                        </q-popup-proxy>
                      </q-btn>
                    </div>

                    <!-- Price and Status -->
                    <div class="row items-center q-gutter-sm q-mt-xs">
                      <q-badge color="brown-2" text-color="brown-9">
                        {{ formatPrice(item.price) }}
                      </q-badge>
                      <q-badge
                        :color="getStatusColor(item.status) + '-1'"
                        :text-color="getStatusColor(item.status) + '-10'"
                        rounded
                      >
                        {{ item.status || "N/A" }}
                      </q-badge>
                    </div>

                    <!-- Quick Stats Row -->
                    <div class="quick-stats row q-col-gutter-xs q-mt-sm">
                      <div class="col-3">
                        <div class="stat-box">
                          <div class="stat-label">Beg</div>
                          <div class="stat-value">
                            {{ item.beginnings || 0 }}
                          </div>
                        </div>
                      </div>

                      <div class="col-3">
                        <div class="stat-box">
                          <div class="stat-label">New</div>
                          <div class="stat-value">
                            {{ item.new_production || 0 }}
                          </div>
                        </div>
                      </div>

                      <div class="col-3">
                        <div class="stat-box">
                          <div class="stat-label">Rem</div>
                          <div class="stat-value">
                            {{ item.remaining || 0 }}
                          </div>
                        </div>
                      </div>

                      <div class="col-3">
                        <div class="stat-box">
                          <div class="stat-label">Out</div>
                          <div class="stat-value">
                            {{ item.bread_out || 0 }}
                          </div>
                        </div>
                      </div>

                      <!-- Sales Calcualtion -->
                      <div
                        class="sales-row row items-center justify-between q-mt-sm"
                      >
                        <span class="text-caption text-grey-7"
                          >Calculated Sales</span
                        >
                        <q-badge
                          :color="getSalesColor(item)"
                          :text-color="getSalesTextColor(item)"
                          class="q-px-md q-py-sm text-weight-bold"
                          style="font-size: 14px"
                        >
                          {{ formatPrice(calculateSales(item)) }}
                        </q-badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-item>
          </q-list>
        </q-card-section>
      </div>

      <!-- Fixed Footer -->
      <div class="fixed-footer">
        <q-card-section class="footer-summary bg-white q-pa-md">
          <div class="row items-center jusity-between">
            <div>
              <div class="text-caption text-grey-6">TOTAL NET SALES</div>
              <div class="text-h5 text-weight-bolder text-brown-8">
                {{ formatPrice(overallTotal) }}
              </div>
            </div>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
// import AddingBreadReport from "./AddingBreadReport.vue";
import { Notify, useDialogPluginComponent } from "quasar";
import { computed, ref } from "vue";
import { useUsersStore } from "src/stores/user";
import { useRoute } from "vue-router";
import { useProductionStore } from "src/stores/production";
import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatPrice, formatDate, formatFullname } =
  typographyFormat();
const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent();
const productionStore = useProductionStore();
const userStore = useUsersStore();
const route = useRoute();

const props = defineProps([
  "reports",
  "sales_report_id",
  "user",
  "reportLabel",
  "reportDate",
]);

console.log("propssss", props.reports);

const emit = defineEmits(["summary-updated", "ok"]);

const maximizedToggle = ref(true);
const dialog = ref(true);
const filter = ref("");
const showErrors = ref(false);
const branchId = route.params.branch_id;

const userId = computed(() => userStore.userData?.data?.id ?? null);
const reportLength = computed(() => filteredRows.value.length);

const getStatusColor = (status) => {
  if (!status) return "grey";
  const s = status.toLowerCase();
  if (s.includes("sold") || s.includes("confirmed")) return "green";
  if (s.includes("pending") || s.includes("new")) return "orange";
  if (s.includes("declined") || s.includes("return")) return "red";
  return "blue";
};

const getSalesColor = (item) => {
  const sales = calculateSales(item);
  return sales < 0 ? "red-1" : "green-1";
};

const getSalesTextColor = (item) => {
  const sales = calculateSales(item);
  return sales < 0 ? "red-10" : "green-10";
};

const calculateSales = (item) => {
  const stock =
    (Number(item.beginnings) || 0) + (Number(item.new_production) || 0);
  const sold =
    stock - ((Number(item.remaining) || 0) + (Number(item.bread_out) || 0));
  return sold * (Number(item.price) || 0);
};

const filteredRows = computed(() => {
  const data = props.reports || [];
  if (!filter.value) return data;
  const search = filter.value.toLowerCase();
  return data.filter((r) => r.bread.name.toLowerCase().includes(search));
});

const negativeSalesRows = computed(() => {
  return filteredRows.value
    .map((row) => {
      const sales = calculateSales(row);
      return { ...row, salesAmount: sales };
    })
    .filter((row) => row.salesAmount < 0);
});

const overallTotal = computed(() => {
  return filteredRows.value.reduce((acc, row) => {
    const sales = calculateSales(row);
    return sales > 0 ? acc + sales : acc;
  }, 0);
});

const handleGlobalUpdate = async (row, field, newVal) => {
  if (!userId.value) return;

  if (newVal < 0) {
    Notify.create({
      message: "Value cannot be negative",
      color: "warning",
      icon: "warning",
      position: "top",
      timeout: 1000,
    });
    return;
  }

  const meta = {
    report_id: row.id,
    name: row?.bread?.name || "Unknown",
    original_data: row[field],
    updated_data: newVal,
    updated_field: field,
    designation: branchId,
    designation_type: "branch",
    action: "updated",
    type_of_report: `Bread Report Update (${props.reportLabel})`,
    user_id: userId.value,
    sales_report_id: props.sales_report_id,
  };

  try {
    await productionStore.updateSalesField(
      row.id,
      newVal,
      meta,
      "bread",
      field
    );

    Notify.create({
      message: `Updated successfully`,
      color: "positive",
      icon: "check_circle",
      position: "top",
      timeout: 1000,
    });
  } catch (e) {
    Notify.create({
      message: "Failed to update",
      color: "negative",
      icon: "error",
      position: "top",
    });
  }
};
</script>

<style lang="scss" scoped>
.mobile-bread-dialog {
  :deep(.q-dialog__inner) {
    padding: 0;
  }
}

.mobile-card {
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-radius: 0;
  overflow: hidden; // Prevent double scrollbars
}

.fixed-header {
  flex-shrink: 0; // Don't shrink
  background: white;
  z-index: 1;
}

.scrollable-content {
  flex: 1 1 auto; // Take remaining space
  overflow-y: auto; // Enable scrolling
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #8b6b4d;
    border-radius: 4px;
  }
}

.fixed-footer {
  flex-shrink: 0; // Don't shrink
  z-index: 1;
}

.header-gradient {
  background: linear-gradient(135deg, #8b6b4d 0%, #a0522d 100%);

  .header-icon-wrapper {
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
    height: 40px;
  }
}

.bread-item {
  background: white;
  border-radius: 16px;
  margin-bottom: 8px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition: all 0.2s;

  &:active {
    transform: scale(0.98);
    background: #fafafa;
  }
}

.bread-item-content {
  width: 100%;
}

.quick-stats {
  .stat-box {
    background: #f8f5f2;
    border-radius: 8px;
    padding: 6px 0;
    text-align: center;

    .stat-label {
      font-size: 10px;
      color: #8d6e63;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-value {
      font-size: 14px;
      font-weight: 600;
      color: #5d4037;
    }
  }
}

.sales-row {
  background: #fafafa;
  border-radius: 8px;
  padding: 8px 12px;
}

.edit-popup {
  width: 300px;
  max-width: 90vw;
  border-radius: 16px;
}

.error-card {
  border-radius: 12px;
  overflow: hidden;

  .error-list {
    max-height: 200px;
    overflow-y: auto;
  }
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
}

.footer-summary {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.02);
}

// Bottom sheet animation
:deep(.q-dialog__inner--bottom) {
  align-items: flex-end;
}
</style>
