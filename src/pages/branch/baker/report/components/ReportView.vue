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
          {{ report.recipe.name }} - {{ report.recipe_category }}
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

      <q-card-section class="report-info">
        <div class="report-section">
          <div class="section-content">
            <div>
              <strong>Date:</strong> {{ formatDate(report.created_at) }}
            </div>
            <div><strong>Branch:</strong> {{ report.branch.name }}</div>
            <div>
              <strong>Baker:</strong>
              {{ capitalizeFirstLetter(report.user.name) }}
            </div>
            <div><strong>Kilo:</strong> {{ report.kilo }}</div>
            <div><strong>Over:</strong> {{ report.over }}</div>
            <div>
              <strong>Actual Target:</strong> {{ report.actual_target }}
            </div>
          </div>
          <div class="status-chip">
            <q-chip
              square
              :color="getBadgeStatusColor(report.status)"
              text-color="white"
            >
              {{ capitalizeFirstLetterStatus(report.status) }}
            </q-chip>
          </div>
        </div>

        <div
          class="report-section"
          v-if="
            report.ingredient_bakers_reports &&
            report.ingredient_bakers_reports.length
          "
        >
          <div class="section-title">Ingredients</div>
          <ul>
            <li
              v-for="ingredient in report.ingredient_bakers_reports"
              :key="ingredient.id"
            >
              <strong>{{ ingredient.ingredients.code }}</strong> -
              {{ formatQuantity(ingredient.quantity) }}
            </li>
          </ul>
        </div>

        <div
          class="report-section"
          v-if="
            report.bread_bakers_reports && report.bread_bakers_reports.length
          "
        >
          <div class="section-title">Breads</div>
          <ul>
            <li v-for="bread in report.bread_bakers_reports" :key="bread.id">
              <strong>{{ bread.bread.name }}</strong> -
              {{ bread.bread_production }} pcs
            </li>
          </ul>
        </div>

        <div
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
              <strong>{{ filling.bread.name }}</strong> -
              {{ filling.filling_production }} pcs
            </li>
          </ul>
        </div>
      </q-card-section>
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

const bakersReportDialog = ref(false);

const capitalizeFirstLetterStatus = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
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
  return `${quantity} grams`;
};
</script>

<style scoped>
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

.report-section {
  margin-top: 1.5rem;
}

.section-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.section-content {
  margin-bottom: 1rem;
}

.status-chip {
  margin-top: 1rem;
}

@media screen and (max-width: 600px) {
  .report-dialog {
    max-width: 100%;
  }
  .report-card {
    border-radius: 0;
  }
}
</style>
