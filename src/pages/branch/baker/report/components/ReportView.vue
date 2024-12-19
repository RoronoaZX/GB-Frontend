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
      <q-card-section class="report-header">
        <div class="text-h6 text-weight-regular">
          {{ capitalizeBranchFirstLetter(report.branch_recipe.recipe.name) }} -
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
                  {{ formatDate(report.created_at) }}
                </div>
              </div>
              <div class="row q-gutter-x-sm">
                <div class="text-subtitle2">Branch:</div>
                <div class="text-body1 text-weight-light">
                  {{ capitalizeBranchFirstLetter(report.branch.name) }}
                </div>
              </div>
              <div class="row q-gutter-x-sm">
                <div class="text-subtitle2">Baker:</div>
                <div class="text-body1 text-weight-light">
                  {{ formatFullname(report.user.employee) }}
                </div>
              </div>
            </div>
          </div>
          <div>
            <q-chip
              square
              :color="getBadgeStatusColor(report.status)"
              text-color="white"
            >
              {{ capitalizeFirstLetterStatus(report.status) }}
            </q-chip>
          </div>
        </div>
        <div class="row q-mt-sm item-start q-gutter-x-xl">
          <div class="row q-gutter-x-sm text-overline">
            <div>Kilo:</div>
            <div class="text-weight-light">
              {{ report.kilo }}
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
                    {{ bread.bread.name }}
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
                    {{ filling.bread.name }}
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

          <!-- </div> -->
          <!--
          <div
            class="report-section"
            v-if="
              report.ingredient_bakers_reports &&
              report.ingredient_bakers_reports.length
            "
          >
            <ul>
              <div
                v-for="ingredient in report.ingredient_bakers_reports"
                :key="ingredient.id"
              >
                <div class="row q-gutter-md">
                  <div class="">
                    {{ ingredient.ingredients.code }}
                  </div>

                  <div>- {{ formatQuantity(ingredient.quantity) }}</div>
                </div>
              </div>
            </ul>
          </div> -->

          <!-- <div
            class="report-section"
            v-if="
              report.bread_bakers_reports && report.bread_bakers_reports.length
            "
          >
            <div class="section-title" align="center">Breads</div>
            <ul>
              <div v-for="bread in report.bread_bakers_reports" :key="bread.id">
                <div class="row q-gutter-md">
                  <div>{{ bread.bread.name }}</div>
                  <div>- {{ bread.bread_production }} pcs</div>
                </div>
              </div>
            </ul>
          </div> -->

          <!-- <div
            class="report-section"
            v-if="
              report.filling_bakers_reports &&
              report.filling_bakers_reports.length
            "
          >
            <div class="section-title">Fillings</div>
            <ul>
              <li
                v-for="filling in report.filling_bakers_reports"
                :key="filling.id"
              >
                <div>{{ filling.bread.name }}</div>
                - {{ filling.filling_production }} pcs
              </li>
            </ul>
          </div> -->
        </div>
      </q-card-section>
      <!-- <q-card-actions>
        <q-btn>Edit</q-btn>
      </q-card-actions> -->
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { date } from "quasar";

const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

console.log("bakerView", props.report);

const bakersReportDialog = ref(false);

const capitalizeFirstLetterStatus = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const capitalizeBranchFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const capitalizeFirstLetter = (fullName) => {
  const nameParts = fullName.split(" ");
  const firstName =
    nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1).toLowerCase();
  const lastName =
    nameParts[nameParts.length - 1].charAt(0).toUpperCase() +
    nameParts[nameParts.length - 1].slice(1).toLowerCase();
  let middleNames = "";
  if (nameParts.length > 2) {
    middleNames = nameParts
      .slice(1, -1)
      .map((name) => `${name.charAt(0).toUpperCase()}.`)
      .join(" ");
  }
  return `${firstName} ${middleNames} ${lastName}`.trim();
};

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`.trim();
};

const getBadgeStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "orange";
    case "declined":
      return "negative";
    case "confirmed":
      return "green";
    default:
      return "grey";
  }
};

const openBakersReportsDialog = () => {
  bakersReportDialog.value = true;
};

const formatDate = (dateString) => {
  return date.formatDate(dateString, "MMMM D, YYYY");
};

const formatQuantity = (quantity) => {
  if (quantity >= 1000) {
    const kilos = quantity / 1000;
    const unit = kilos === 1 ? "kg" : "kgs";
    return `${kilos} ${unit}`;
  }
  return `${quantity} g`;
};
</script>

<style scoped>
.box {
  border: 1px dashed grey;
  border-radius: 10px;
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
