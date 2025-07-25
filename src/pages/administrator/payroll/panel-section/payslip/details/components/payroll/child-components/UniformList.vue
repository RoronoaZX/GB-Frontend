<template>
  <q-dialog ref="dialogRef" persistent position="top">
    <q-card class="uniform-list-card compact-card">
      <q-card-section class="header-section compact-header">
        <div class="text-h6 text-weight-bold text-shadow">Uniform List</div>
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
            class="category-title text-subtitle1 text-primary animated-underline"
          >
            T-Shirts
          </div>
          <q-list
            bordered
            class="rounded-borders q-mt-xs list-container compact-list"
          >
            <q-item
              class="list-header bg-grey-2 text-weight-medium compact-list-header"
            >
              <q-item-section>Size</q-item-section>
              <q-item-section class="text-center">Qty</q-item-section>
              <q-item-section side>Price</q-item-section>
            </q-item>

            <q-item
              v-for="(uniform, index) in uniformList.t_shirts"
              :key="index"
              class="list-item compact-list-item"
            >
              <q-item-section class="item-size">{{
                uniform.size
              }}</q-item-section>
              <q-item-section class="item-qty text-center">{{
                uniform.pcs
              }}</q-item-section>
              <q-item-section side class="item-price">{{
                formatCurrency(uniform.price)
              }}</q-item-section>
            </q-item>

            <q-item
              class="list-total bg-accent-light text-weight-bold compact-list-total"
            >
              <q-item-section class="text-subtitle1 text-accent-dark"
                >Total :</q-item-section
              >
              <q-item-section />
              <q-item-section />
              <q-item-section side class="text-subtitle1 text-accent-dark">
                {{ formatCurrency(tShirtTotal) }}
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <div class="q-pt-sm q-pb-sm compact-content-section">
          <div
            class="category-title text-subtitle1 text-primary animated-underline"
          >
            Pants
          </div>
          <q-list
            bordered
            class="rounded-borders q-mt-xs list-container compact-list"
          >
            <q-item
              class="list-header bg-grey-2 text-weight-medium compact-list-header"
            >
              <q-item-section>Size</q-item-section>
              <q-item-section class="text-center">Qty</q-item-section>
              <q-item-section side>Price</q-item-section>
            </q-item>

            <q-item
              v-for="(uniform, index) in uniformList.pants"
              :key="index"
              class="list-item compact-list-item"
            >
              <q-item-section class="item-size">{{
                uniform.size
              }}</q-item-section>
              <q-item-section class="item-qty text-center">{{
                uniform.pcs
              }}</q-item-section>
              <q-item-section side class="item-price">{{
                formatCurrency(uniform.price)
              }}</q-item-section>
            </q-item>

            <q-item
              class="list-total bg-accent-light text-weight-bold compact-list-total"
            >
              <q-item-section class="text-subtitle1 text-accent-dark"
                >Total :</q-item-section
              >
              <q-item-section />
              <q-item-section />
              <q-item-section side class="text-subtitle1 text-accent-dark">
                {{ formatCurrency(pantsTotal) }}
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
      <q-card-section
        class="q-py-md q-px-lg total-summary-section compact-total-summary"
      >
        <div class="flex justify-between items-center total-grand">
          <div class="text-subtitle1 text-weight-bold text-gradient">
            Grand Total :
          </div>
          <div class="text-h6 text-weight-bold text-gradient total-amount">
            {{ formatCurrency(grandTotal) }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { computed } from "vue";

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const props = defineProps(["uniformList"]);

const emit = defineEmits(["update:total"]);

const tShirtTotal = computed(() => {
  return props.uniformList?.t_shirts?.reduce((sum, item) => {
    const price = parseFloat(item.price || 0);
    const pcs = parseInt(item.pcs || 0);
    const product = price * pcs;
    return sum + product;
  }, 0);
});

const pantsTotal = computed(() => {
  return props.uniformList?.pants?.reduce((sum, item) => {
    const price = parseFloat(item.price || 0);
    const pcs = parseInt(item.pcs || 0);
    const product = price * pcs;
    return sum + product;
  }, 0);
});

const grandTotal = computed(() => {
  return tShirtTotal.value + pantsTotal.value;
});

const formatCurrency = (value) => {
  const number = parseFloat(value || 0);
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;600&display=swap");

// Define a richer color palette with SCSS variables
// #512da8
// 565656
$primary-blue: #0267c5;
$secondary-blue: #0c3154;
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

.uniform-list-card.compact-card {
  width: 420px;
  max-width: 95vw;
  border-radius: 12px;
  box-shadow: 0 10px 20px $shadow-color;
  font-family: "Montserrat", sans-serif;
  overflow: hidden; // This is important for card's own rounded corners with content
  background: $white;
  display: flex; // Use flexbox to manage layout
  flex-direction: column; // Stack children vertically
  max-height: 90vh; // Ensure dialog doesn't exceed viewport height
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
  flex-shrink: 0; // Prevent header from shrinking when content scrolls

  &::before {
    content: "";
    position: absolute;
    top: -40px;
    left: -40px;
    width: 150%;
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

// NEW SCROLLABLE CONTENT WRAPPER
.scrollable-content-wrapper {
  flex-grow: 1; // Allow this section to take up available space
  overflow-y: auto; // THIS IS THE KEY! Enable vertical scrolling
  padding: 0 20px; // Apply horizontal padding here to match card
  // Use scrollbar styling for better aesthetics (optional, but recommended)
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: $primary-blue;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: $secondary-blue;
  }
}

.content-section.compact-content-section {
  padding-top: 15px; // Add top padding here instead of wrapper
  padding-bottom: 15px; // Add bottom padding here instead of wrapper
  // Removed horizontal padding as it's now on the wrapper
  &:not(:last-child) {
    border-bottom: 1px solid $gray-medium;
  }
}

.category-title {
  margin-bottom: 10px;
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  color: $secondary-blue;
  position: relative;
  display: inline-block;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
    font-weight: 500;
  }
  .item-qty {
    font-weight: 400;
  }
  .item-price {
    font-weight: 500;
    color: $text-dark;
  }
}

.list-total.compact-list-total {
  background-color: $accent-light;
  padding: 12px 15px;
  font-weight: 700;
  color: $accent-dark;
  border-top: 1.5px solid $secondary-blue;
  font-size: 0.95em;

  .q-item-section {
    padding: 0;
  }
  .text-subtitle1 {
    letter-spacing: 0.3px;
  }
}

.total-summary-section.compact-total-summary {
  background: linear-gradient(90deg, $light-blue 0%, $white 100%);
  padding: 20px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-top: 1px solid $gray-medium;
  flex-shrink: 0; // Prevent footer from shrinking
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

.total-amount {
  min-width: 120px;
  text-align: right;
  font-size: 1.75rem;
}

// Quasar dialog global styles
.q-dialog__inner {
  padding: 15px;
  align-items: center;
  justify-content: center;
}
</style>
