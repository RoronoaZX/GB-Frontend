<template>
  <div class="reports-container q-pa-md">
    <div class="row items-center justify-between q-mb-xl">
      <div>
        <h1 class="text-h4 text-weight-bold text-primary q-ma-none">
          Sales Reports
        </h1>
        <p class="text-subtitle1 text-grey-7">
          Track and manage your daily inventory.
        </p>
      </div>
      <q-badge
        v-if="data.length > 0"
        rounded
        color="primary"
        class="q-pa-sm px-md shadow-2"
      >
        <span class="text-weight-bold">{{ data.length }} Reports Total</span>
      </q-badge>
    </div>

    <div
      v-if="data.length === 0 && loading"
      class="flex flex-center column q-py-xl"
    >
      <q-inner-loading showing color="primary">
        <q-spinner-dots size="50px" color="primary" />
        <div class="text-overline q-mt-md">Fetching Data...</div>
      </q-inner-loading>
    </div>

    <div
      v-else-if="data.length === 0"
      class="empty-state-card flex flex-center column q-pa-xl text-center"
    >
      <q-img
        src="https://cdn.quasar.dev/img/empty-cart.png"
        style="width: 200px; opacity: 0.7"
        class="q-mb-md"
      />
      <div class="text-h5 text-grey-8 text-weight-medium">No records found</div>
      <div class="text-body1 text-grey-6 q-mb-md">
        It looks like there aren't any sales reports for this period.
      </div>
      <q-btn
        outline
        color="primary"
        label="Refresh Data"
        icon="refresh"
        @click="$emit('refresh')"
      />
    </div>

    <div v-else class="reports-list">
      <q-card
        v-for="(report, index) in data"
        :key="index"
        flat
        bordered
        class="report-card q-mb-md overflow-hidden"
      >
        <q-expansion-item
          expand-separator
          header-class="report-expansion-header q-pa-md"
          default-opened
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar
                color="primary-transparent"
                text-color="primary"
                icon="receipt_long"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-weight-bold text-subtitle1">
                Report #{{ index + 1 }}
              </q-item-label>
              <q-item-label
                caption
                class="text-uppercase text-weight-medium letter-spacing-1"
              >
                ID: {{ report.sales_report_id || "N/A" }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="column items-end">
                <div class="text-weight-bold text-grey-9">
                  {{ formatDate(report.sales_report?.created_at) }}
                </div>
                <div class="text-caption text-grey-6">
                  {{ formatTime(report.sales_report?.created_at) }}
                </div>
              </div>
            </q-item-section>
          </template>

          <q-card-section class="q-pa-md bg-grey-1">
            <div class="row q-col-gutter-md">
              <div v-if="report.bread?.length" class="col-12 col-md-6 col-lg-3">
                <div class="category-box bread-border shadow-transition h-full">
                  <div class="row items-center justify-between q-mb-sm">
                    <div class="row items-center q-gutter-xs">
                      <q-icon name="bakery_dining" color="brown" size="xs" />
                      <span class="text-overline text-brown text-weight-bold"
                        >Bread</span
                      >
                    </div>
                    <q-badge rounded color="brown-2" text-color="brown-10">{{
                      report.bread.length
                    }}</q-badge>
                  </div>
                  <BreadList
                    :bread="report.bread"
                    :sales_report_id="report.sales_report_id"
                  />
                </div>
              </div>

              <div
                v-if="report.selecta?.length"
                class="col-12 col-md-6 col-lg-3"
              >
                <div
                  class="category-box selecta-border shadow-transition h-full"
                >
                  <div class="row items-center justify-between q-mb-sm">
                    <div class="row items-center q-gutter-xs">
                      <q-icon name="icecream" color="red" size="xs" />
                      <span class="text-overline text-red text-weight-bold"
                        >Selecta</span
                      >
                    </div>
                    <q-badge rounded color="red-2" text-color="red-10">{{
                      report.selecta.length
                    }}</q-badge>
                  </div>
                  <Selecta
                    :selecta="report.selecta"
                    :sales_report_id="report.sales_report_id"
                  />
                </div>
              </div>

              <div
                v-if="report.softdrinks?.length"
                class="col-12 col-md-6 col-lg-3"
              >
                <div
                  class="category-box drinks-border shadow-transition h-full"
                >
                  <div class="row items-center justify-between q-mb-sm">
                    <div class="row items-center q-gutter-xs">
                      <q-icon name="local_drink" color="purple" size="xs" />
                      <span class="text-overline text-purple text-weight-bold"
                        >Drinks</span
                      >
                    </div>
                    <q-badge rounded color="purple-2" text-color="purple-10">{{
                      report.softdrinks.length
                    }}</q-badge>
                  </div>
                  <Softdrinks
                    :softdrinks="report.softdrinks"
                    :sales_report_id="report.sales_report_id"
                  />
                </div>
              </div>

              <div
                v-if="report.others?.length"
                class="col-12 col-md-6 col-lg-3"
              >
                <div
                  class="category-box others-border shadow-transition h-full"
                >
                  <div class="row items-center justify-between q-mb-sm">
                    <div class="row items-center q-gutter-xs">
                      <q-icon name="category" color="blue-grey" size="xs" />
                      <span
                        class="text-overline text-blue-grey text-weight-bold"
                        >Others</span
                      >
                    </div>
                    <q-badge
                      rounded
                      color="blue-grey-2"
                      text-color="blue-grey-10"
                      >{{ report.others.length }}</q-badge
                    >
                  </div>
                  <Other
                    :others="report.others"
                    :sales_report_id="report.sales_report_id"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-expansion-item>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import BreadList from "./products/BreadList.vue";
import Selecta from "./products/SelectaList.vue";
import Softdrinks from "./products/SoftdrinksList.vue";
import Other from "./products/OtherList.vue";
import { computed, ref } from "vue";
import { typographyFormat } from "src/composables/typography/typography-format";

const { formatDate, formatTime } = typographyFormat();

const isLoading = ref(false);

const props = defineProps({
  data: Array,
  loading: Boolean,
});
</script>

<style scoped lang="scss">
.reports-container {
  max-width: 1200px;
  margin: 0 auto;
}

.report-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
}

.primary-transparent {
  background-color: rgba(25, 118, 210, 0.1);
}

.category-box {
  background: white;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #edf2f7;
  height: 100%;
}

/* Custom Colored Left Borders for Categories */
.bread-border {
  border-top: 3px solid #795548;
}
.selecta-border {
  border-top: 3px solid #f44336;
}
.drinks-border {
  border-top: 3px solid #9c27b0;
}
.others-border {
  border-top: 3px solid #607d8b;
}

.letter-spacing-1 {
  letter-spacing: 1px;
}

.empty-state-card {
  border: 2px dashed #e0e0e0;
  border-radius: 20px;
  min-height: 400px;
}

.h-full {
  height: 100%;
}
</style>
