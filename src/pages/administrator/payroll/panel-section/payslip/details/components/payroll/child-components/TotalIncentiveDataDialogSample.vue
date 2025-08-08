<template>
  <q-dialog ref="dialogRef" persistent position="top">
    <q-card class="incentive-list-card compact-card">
      <q-card-section class="header-section compact-header">
        <div class="text-h6 text-weight-bolder text-shadow">
          Employee Incentives
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
        <div class="q-pt-sm q-pb-none compact-content-section">
          <div
            outlined
            class="q-my-md"
            v-for="(incentiveData, index) in incentiveDatas"
            :key="index"
          >
            <div>
              <div>Date: {{ formatDateString(incentiveData.created_at) }}</div>
              <div>Designation: {{ incentiveData.designation }}</div>
              <div>Shift Status: {{ incentiveData.shift_status }}</div>
              <div>Branch: {{ incentiveData.branch.name }}</div>
              <div>Total Kilo: {{ incentiveData.baker_kilo_total }} kgs</div>
            </div>
            <div class="q-pt-sm q-pb-none compact-content-section">
              <q-list
                bordered
                class="rounded-borders q-mt-xs list-container compact-list"
              >
                <q-item
                  class="list-header bg-grey-2 text-weight-medium compact-list-header"
                >
                  <q-item-section> Kilo </q-item-section>
                </q-item>

                <q-item
                  v-for="(incentive, index) in incentiveData.baker_reports"
                  :key="index"
                >
                  <q-item-section>
                    {{ incentive.kilo }}
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { date, useDialogPluginComponent } from "quasar";

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const props = defineProps(["incentiveDatas"]);
console.log("incentiveDatasssss", props.incentiveDatas);

const formatDateString = (dateStr) => {
  if (!dateStr) return "";

  return date.formatDate(dateStr, "MMM. DD, YYYY");
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;600&display=swap");

// Define a richer color palette with SCSS variables

// $primary-blue: #007bff;
$primary-blue: #2bdabc;
$secondary-blue: #105f73;
$light-blue: #e6f3ff;
$gray-light: #f8f9fa;
$gray-medium: #e9ecef;
$text-dark: #343a40;
$text-medium: #343a40;
$text-medium: #6c757d;
$white: #ffffff;
$shadow-color: rgba(0, 0, 0, 0.15);

// Custom accent colors for totals
$accent-light: #e0f2f7;
$accent-dark: #004d40;

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
  background: linear-gradient(135deg, $primary-blue 0%, $secondary-blue 100%);
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

  &::before {
    content: "";
    position: absolute;
    top: -40px;
    left: -40px;
    width: 150px;
    height: 150%;
    background: radial-gradient(
      circle at top left,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    opacity: 0.7;
    pointer-events: none;
  }

  .text-h6 {
    letter-spacing: 0.3px;
  }

  .text-shadow {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }

  .close-btn {
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: rotate(90deg);
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
  &::-webkit-scrollbar-thumb:hover {
    background: $secondary-blue;
  }
}

.content-section.compact-content-section {
  padding-top: 15px;
  padding-bottom: 15px;
  &:not(:last-child) {
    border-bottom: 1px solid $gray-medium;
  }
}

.category-litle {
  margin-bottom: 10px;
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  color: $secondary-blue;
  position: relative;
  font-size: 1.15rem;

  &.animated-underline {
    &::after {
      content: "";
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 100%;
      height: 1.5px;
      background: linear-gradient(90deg, $primary-blue 0%, $light-blue 100%);
      transform: scaleX(0);
      transform-origin: bottom left;
      transition: transform 0.3s ease-out;
    }
    &:hover::after {
      transform: scaleX(1);
    }
  }
}

.list-container.compact-list {
  border: 1px solid $gray-medium;
  border-radius: 8px;
  box-shadow: -2px 8px rgba(0, 0, 0, 0.05);
}

.list-header.compact-list-header {
  background-color: $gray-light;
  font-weight: 600;
  color: $text-dark;
  padding: 10px 15px;
  font-size: 0.9em;
  letter-spacing: 0.2px;

  .q-item-section {
    padding: 0;
  }
}

.list-item.compact-list-item {
  padding: 8px 15px;
  border-bottom: 1px solid $gray-medium;
  transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
  font-family: "Open Sans", sans-serif;
  color: $text-medium;
  font-size: 0.85em;

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: $light-blue;
    transform: translateX(3px);
  }

  .q-item-section {
    padding: 0;
  }
  .item-size {
    font-weight: 400;
  }
  .item-qty {
    font-weight: 500;
  }
  .item-price {
    font-weight: 500;
    color: $text-dark;
  }
}

.close-btn {
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: rotate(90deg);
  }
}
</style>
