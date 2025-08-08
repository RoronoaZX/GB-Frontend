<template>
  <q-dialog ref="dialogRef" persistent position="top">
    <q-card class="incentive-list-card compact-card">
      <q-card-section class="header-section compact-header">
        <div class="text-h6 text-weight-bolder text-shadow">
          Checking Employee Incentives
        </div>
        <q-space />
        <q-btn
          icon="close"
          flat
          dense
          round
          v-close-popup
          color="white"
          class="close-btn"
        />
      </q-card-section>
      <q-card-section class="scrollable-content-wrapper">
        <div
          v-if="incentiveDatas.length > 0"
          class="q-pt-sm q-pb-none compact-content-section"
        >
          <div
            class="q-my-md incentive-data-card"
            v-for="(incentiveData, index) in incentiveDatas"
            :key="index"
          >
            <div class="incentive-details-grid">
              <div class="detail-item">
                <span class="detail-label">Date:</span>
                <span class="detail-value">{{
                  formatDateString(incentiveData.created_at)
                }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Designation:</span>
                <span class="detail-value">{{
                  incentiveData.designation
                }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Shift Status:</span>
                <span class="detail-value">{{
                  incentiveData.shift_status
                }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Branch:</span>
                <span class="detail-value">{{
                  incentiveData.branch.name
                }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Number of Employees:</span>
                <span class="detail-value">{{
                  incentiveData.number_of_employees
                }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Total Production Kilo:</span>
                <span class="detail-value"
                  >{{ incentiveData.baker_kilo_total }} kgs</span
                >
              </div>
              <div class="detail-item total-kilo">
                <span class="detail-label">Incentive Kilo:</span>
                <span class="detail-value"
                  >{{ incentiveData.excess_kilo }} kgs</span
                >
              </div>
            </div>
            <div class="q-pt-sm q-pb-none compact-content-section">
              <q-list
                bordered
                class="rounded-borders q-mt-xs list-container compact-list"
              >
                <q-item
                  class="list-header bg-grey-2 text-weight-medium compact-list-header"
                >
                  <q-item-section> Recipe Name </q-item-section>
                  <q-item-section side> Kilo </q-item-section>
                </q-item>
                <q-item
                  v-for="(incentive, index) in incentiveData.baker_reports"
                  :key="index"
                  class="list-item compact-list-item"
                >
                  <q-item-section>
                    {{
                      capitalizeFirstLetter(incentive.branch_recipe.recipe.name)
                    }}
                  </q-item-section>
                  <q-item-section side>
                    {{ incentive.kilo }}
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>

        <div
          v-else
          class="flex flex-center column q-pa-md"
          style="min-height: 250px"
        >
          <q-icon
            name="sentiment_very_dissatisfied"
            color="grey-5"
            size="80px"
            class="q-mb-sm"
          />
          <div class="text-h6 text-grey-7 q-mb-xs">
            Employee have no incentives for this cut-off.
          </div>
          <div class="text-subtitle2 text-grey-6 text-center">
            It looks like there are no incentives recorded for
            <br />
            {{ dtrFrom }} to {{ dtrTo }}
          </div>
        </div>
      </q-card-section>

      <q-card-section
        class="q-py-md q-px-lg total-summary-section compact-total-summary"
      >
        <!-- <div class="flex justify-between items-center total-grand">
          <div class="text-subtitle1 text-weight-bold text-gradient">
            Overall Prod. Kilo :
          </div>
          <div class="text-h6 text-weight-bold text-gradient total-kilo">
            {{ overallProductionKilo }} kgs
          </div>
        </div> -->

        <div class="flex justify-between items-center total-grand">
          <div class="text-subtitle1 text-weight-bold text-gradient">
            Total Incentives Kilo :
          </div>
          <div class="text-h6 text-weight-bold text-gradient total-kilo">
            {{ overAllExcessKilo }} kgs
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { date, useDialogPluginComponent } from "quasar";
import { computed } from "vue";

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const props = defineProps(["incentiveDatas", "dtrFrom", "dtrTo"]);
console.log("incentiveDatasssss", props.incentiveDatas);

const formatDateString = (dateStr) => {
  if (!dateStr) return "";

  return date.formatDate(dateStr, "MMM. DD, YYYY");
};

const capitalizeFirstLetter = (word) => {
  if (!word) return "";
  return word
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const overallProductionKilo = computed(() => {
  return props.incentiveDatas.reduce((total, item) => {
    return total + (parseFloat(item.baker_kilo_total) || 0);
  }, 0);
});

const overAllExcessKilo = computed(() => {
  return props.incentiveDatas.reduce((total, item) => {
    return total + (parseFloat(item.excess_kilo) || 0);
  }, 0);
});
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;600&display=swap");

// Define a richer color palette with SCSS variables
$primary-blue: #0ca289;
$secondary-blue: #105f73;
$light-blue: #e6f3ff;
$gray-light: #f8f9fa;
$gray-medium: #e9ecef;
$text-dark: #343a40;
$text-medium: #6c757d;
$white: #ffffff;
$shadow-color: rgba(0, 0, 0, 0.15);

// Custom accent colors for totals
$accent-light: #e0f2f7;
$accent-dark: #004d40;
$total-kilo-bg: #e0f7fa; // A soft, light teal for the total kilo
$total-kilo-color: #00796b; // A slightly darker teal for the text

.incentive-list-card.compact-card {
  width: 420px;
  max-width: 95vw;
  border-radius: 12px;
  box-shadow: 0 10px 20px $shadow-color;
  font-family: "Montserrat", sans-serif;
  overflow: hidden;
  background: $white;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
}

.header-section.compact-header {
  background: linear-gradient(135deg, #2bdabc 0%, #105f73 100%);
  color: $white;
  padding: 15px 20px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;

  .text-h6 {
    letter-spacing: 0.3px;
    font-weight: 700; // Making the title bolder
  }

  .text-shadow {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }

  .close-btn {
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: rotate(90deg) scale(1.1);
    }
  }
}

.scrollable-content-wrapper {
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 20px;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c0c0c0;
    border-radius: 10px;
    border: 2px solid #f1f1f1;
    &:hover {
      background: $secondary-blue;
    }
  }
}

.incentive-data-card {
  padding: 15px;
  background: #fafafa;
  border-radius: 10px;
  margin-bottom: 20px !important;
  border: 1px solid #e0e0e0; // Added border for emphasis
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }
}

.incentive-details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 15px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  padding: 5px 0;

  .detail-label {
    font-weight: 600;
    color: $text-dark;
    font-size: 0.85em;
    opacity: 0.8;
    margin-bottom: 2px;
  }

  .detail-value {
    font-weight: 500;
    color: $text-dark;
    font-size: 1em;
  }

  &.total-kilo {
    grid-column: 1 / -1; // Span across both columns
    background-color: $total-kilo-bg;
    border-radius: 6px;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-left: 4px solid $total-kilo-color;

    .detail-label {
      color: $total-kilo-color;
      margin-bottom: 0;
    }

    .detail-value {
      font-weight: 700;
      color: $total-kilo-color;
      font-size: 1.2em;
    }
  }
}

.list-container.compact-list {
  border: 1px solid $gray-medium;
  border-radius: 8px;
  overflow: hidden; // Ensures rounded corners are respected
}

.list-header.compact-list-header {
  background-color: $gray-light;
  font-weight: 600;
  color: $text-dark;
  padding: 10px 15px;
  font-size: 0.9em;
  letter-spacing: 0.2px;
}

.list-item.compact-list-item {
  padding: 12px 15px; // Increased padding for a cleaner look
  border-bottom: 1px solid $gray-medium;
  transition: background-color 0.2s ease-in-out;
  font-family: "Open Sans", sans-serif;
  color: $text-medium;
  font-size: 0.9em;

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: $light-blue;
    transform: none; // Removed the translateX transform for a more subtle effect
  }

  .q-item-section {
    padding: 0;
  }
}

.total-summary-section.compact-total-summary {
  background: linear-gradient(90deg, $light-blue 0%, $white 100%);
  padding: 20px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-top: 1px solid $gray-medium;
  flex-shrink: 0;
}

.total-grand {
  gap: 15px;
  flex-wrap: wrap;
}

.text-gradient {
  background: linear-gradient(45deg, $secondary-blue 30%, $primary-blue 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0.5px 1.5px rgba(0, 0, 0, 0.1));
}

.total-kilo {
  min-width: 120px;
  text-align: right;
  font-size: 1.75rem;
}
</style>
