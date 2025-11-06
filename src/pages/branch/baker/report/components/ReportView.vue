<template>
  <q-btn
    color="accent"
    icon="visibility"
    size="md"
    flat
    round
    dense
    @click="openBakersReportsDialog"
  >
  </q-btn>

  <q-dialog v-model="bakersReportDialog" class="report-dialog">
    <q-card class="report-card">
      <q-card-section
        :class="getHeaderClass(report.status)"
        class="row justify-between"
      >
        <div class="text-h6 text-weight-regular">
          {{ capitalizeFirstLetter(report.branch_recipe.recipe.name) }} -
          {{ report.recipe_category }}
        </div>
        <q-btn
          class="close-btn"
          color="grey-8"
          flat
          round
          dense
          icon="close"
          @click="bakersReportDialog = false"
        />
      </q-card-section>

      <q-card-section>
        <div class="row justify-between">
          <div>
            <div class="section-content">
              <div class="row q-gutter-x-sm">
                <div class="text-subtitle2">Date:</div>
                <div class="text-body1 text-weight-light">
                  {{ formatTimestamp(report.created_at) }}
                </div>
              </div>
              <div class="row q-gutter-x-sm">
                <div class="text-subtitle2">Branch:</div>
                <div class="text-body1 text-weight-light">
                  {{ capitalizeFirstLetter(report.branch.name) }}
                </div>
              </div>
              <div class="row q-gutter-x-sm">
                <div class="text-subtitle2">Baker:</div>
                <div class="text-body1 text-weight-light">
                  {{ formatFullname(report.user.employee) }}
                </div>
              </div>
              <div class="row q-gutter-x-sm">
                <div class="text-subtitle2">Remarks:</div>
                <div class="text-body1 text-weight-light">
                  {{ report.remark ? report.remark : "N/A" }}
                </div>
              </div>
            </div>
          </div>
          <div>
            <q-chip
              square
              :color="getStatusColor(report.status)"
              text-color="white"
            >
              {{ capitalizeFirstLetter(report.status) }}
            </q-chip>
          </div>
        </div>
        <div class="row q-mt-sm item-start q-gutter-x-xl">
          <div class="row q-gutter-x-sm text-overline">
            <div>Kilo:</div>
            <div class="text-weight-light">
              {{ formatKilo(report.kilo) }}
            </div>
          </div>
          <div class="row q-gutter-x-sm text-overline">
            <div>Over:</div>
            <div class="text-weight-light">
              {{ report.over }}
            </div>
          </div>
          <div class="row q-gutter-x-sm text-overline">
            <div>Short:</div>
            <div class="text-weight-light">
              {{ report.short }}
            </div>
          </div>
          <div class="row q-gutter-x-sm text-overline">
            <div>Actual Target:</div>
            <div class="text-weight-light">
              {{ report.actual_target }}
            </div>
          </div>
        </div>
        <q-separator class="q-my-md"></q-separator>
        <div class="row justify-between">
          <div>
            <div class="section-title" align="center">Ingredients</div>
            <q-list dense separator class="q-pa-md box">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-overline">Code</q-item-label>
                </q-item-section>
                <q-item-section> </q-item-section>
                <q-item-section> </q-item-section>
                <q-item-section>
                  <q-item-label class="text-overline">Quantity</q-item-label>
                </q-item-section>
                <q-item-section side> </q-item-section>
              </q-item>

              <q-item
                v-for="(ingredient, index) in report.ingredient_bakers_reports"
                :key="index"
              >
                <q-item-section>
                  <q-item-label class="text-caption justify" align="center">
                    {{ ingredient.ingredients.code }}
                  </q-item-label>
                </q-item-section>
                <q-item-section> </q-item-section>
                <q-item-section>
                  <q-item-label class="text-caption" align="center">
                    {{ formatQuantity(ingredient.quantity) }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div
            v-if="
              report.bread_bakers_reports && report.bread_bakers_reports.length
            "
          >
            <div class="section-title" align="center">Breads</div>
            <q-list dense separator class="q-pa-md box">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-overline">Bread Name</q-item-label>
                </q-item-section>
                <q-item-section> </q-item-section>
                <q-item-section>
                  <q-item-label class="text-overline">Quantity</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-for="(bread, index) in report.bread_bakers_reports"
                :key="index"
              >
                <q-item-section>
                  <q-item-label class="text-caption" align="center">
                    {{ capitalizeFirstLetter(bread.bread.name) }}
                  </q-item-label>
                </q-item-section>
                <q-item-section> </q-item-section>
                <q-item-section>
                  <q-item-label class="text-caption" align="center">
                    {{ bread.bread_production }} pcs
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div
            v-if="
              report.filling_bakers_reports &&
              report.filling_bakers_reports.length
            "
          >
            <div class="section-title" align="center">Fillings</div>
            <q-list dense separator class="q-pa-md box">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-overline">Bread Name</q-item-label>
                </q-item-section>
                <q-item-section> </q-item-section>
                <q-item-section>
                  <q-item-label class="text-overline">Quantity</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-for="(filling, index) in report.filling_bakers_reports"
                :key="index"
              >
                <q-item-section>
                  <q-item-label class="text-caption" align="center">
                    {{ capitalizeFirstLetter(filling.bread.name) }}
                  </q-item-label>
                </q-item-section>
                <q-item-section> </q-item-section>
                <q-item-section>
                  <q-item-label class="text-caption" align="center">
                    {{ filling.filling_production }} pcs
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { typographyFormat } from "src/composables/typography/typography-format";
import { badgeColor } from "src/composables/badge-color/badge-color";

const { capitalizeFirstLetter, formatFullname, formatTimestamp } =
  typographyFormat();
const { getStatusColor, getHeaderClass } = badgeColor();

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

console.log("bakerView", props.report);

const bakersReportDialog = ref(false);

const openBakersReportsDialog = () => {
  bakersReportDialog.value = true;
};

const formatQuantity = (quantity) => {
  if (quantity >= 1000) {
    const kilos = quantity / 1000;
    const unit = kilos === 1 ? "kg" : "kgs";
    return `${kilos} ${unit}`;
  }
  return `${quantity} g`;
};
const formatKilo = (target) => {
  // Ensure the target is a number and default to 0 if undefined or null
  const numericTarget = Number(target) || 0;

  // Use parseFloat to remove trailing zeros if the value is decimal
  return parseFloat(numericTarget.toFixed(3)).toString();
};
</script>

<style scoped>
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
.pending-header {
  background: linear-gradient(180deg, #ffffff, #e8e6b7);
}
.confirm-header {
  background: linear-gradient(180deg, #ffffff, #c1ffc7);
}
.decline-header {
  background: linear-gradient(180deg, #ffffff, #ffc7c7);
}

.report-dialog {
  max-width: 600px;
}

.report-card {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 1rem;
}

.close-btn {
  padding: 0;
  min-width: auto;
}

.report-info {
  padding: 1rem;
}

/* .report-section {
  margin-top: 1.5rem;
} */

.section-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.section-content {
  margin-bottom: 1rem;
}

/* .status-chip {
  margin-top: 1rem;
} */

@media screen and (max-width: 600px) {
  .report-dialog {
    max-width: 100%;
  }
  .report-card {
    border-radius: 0;
  }
}
</style>
