<template>
  <q-dialog ref="dialogRef" persistent position="top">
    <q-card class="uniform-list-card compact-card">
      <!-- ... (header section is unchanged) ... -->
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

      <q-card-section class="scrollable-content-wrapper q-pa-none">
        <!-- This loop creates a separate card for each order -->
        <div
          v-if="uniformLists.length > 0"
          class="q-pt-sm q-pb-none compact-content-section"
        >
          <q-card
            v-for="(uniformList, index) in uniformLists"
            :key="index"
            class="uniform-order-card q-mb-lg shadow-4"
          >
            <!-- ... (payment summary section is unchanged) ... -->
            <q-card-section class="q-pa-md payment-summary-section">
              <div class="row q-col-gutter-md q-px-sm q-py-sm">
                <div class="col-6 text-subtitle2 text-dark">
                  <div class="label">Total Amount</div>
                  <div class="value">
                    {{ formatCurrency(uniformList.total_amount) }}
                  </div>
                </div>
                <div class="col-6 text-subtitle2 text-dark">
                  <div class="label">Number of Payments</div>
                  <div class="value">{{ uniformList.number_of_payments }}</div>
                </div>
                <div class="col-6 text-subtitle2 text-dark">
                  <div class="label">Payments Per Payroll</div>
                  <div class="value">
                    {{ formatCurrency(uniformList.payments_per_payroll) }}
                  </div>
                </div>
                <div class="col-6 text-subtitle2 text-dark">
                  <div class="label">Remaining Payments</div>
                  <div class="value">
                    {{ formatCurrency(uniformList.remaining_payments) }}
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-separator />

            <!-- T-Shirts Section for this specific order -->
            <q-card-section class="q-pt-sm q-pb-none compact-content-section">
              <div
                class="category-title text-subtitle1 text-primary animated-underline"
              >
                T-Shirts
              </div>
              <q-list
                bordered
                class="rounded-borders q-mt-xs list-container compact-list"
              >
                <!-- ... (list header) ... -->
                <q-item
                  class="list-header bg-grey-2 text-weight-medium compact-list-header"
                >
                  <q-item-section>Size</q-item-section>
                  <q-item-section class="text-center">Qty</q-item-section>
                  <q-item-section side>Price</q-item-section>
                </q-item>
                <q-item
                  v-for="(uniform, idx) in uniformList.t_shirt"
                  :key="idx"
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
                <!-- List Total for T-Shirts -->
                <q-item
                  class="list-total bg-accent-light text-weight-bold compact-list-total"
                >
                  <q-item-section class="text-subtitle1 text-accent-dark"
                    >Total :</q-item-section
                  >
                  <q-item-section side class="text-subtitle1 text-accent-dark">
                    <!-- S O L U T I O N : Call the method with this order's t_shirt data -->
                    {{
                      formatCurrency(
                        calculateCategoryTotal(uniformList.t_shirt)
                      )
                    }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

            <!-- Pants Section for this specific order -->
            <q-card-section class="q-pt-sm q-pb-sm compact-content-section">
              <div
                class="category-title text-subtitle1 text-primary animated-underline"
              >
                Pants
              </div>
              <q-list
                bordered
                class="rounded-borders q-mt-xs list-container compact-list"
              >
                <!-- ... (list header) ... -->
                <q-item
                  class="list-header bg-grey-2 text-weight-medium compact-list-header"
                >
                  <q-item-section>Size</q-item-section>
                  <q-item-section class="text-center">Qty</q-item-section>
                  <q-item-section side>Price</q-item-section>
                </q-item>
                <q-item
                  v-for="(uniform, idx) in uniformList.pants"
                  :key="idx"
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
                <!-- List Total for Pants -->
                <q-item
                  class="list-total bg-accent-light text-weight-bold compact-list-total"
                >
                  <q-item-section class="text-subtitle1 text-accent-dark"
                    >Total :</q-item-section
                  >
                  <q-item-section side class="text-subtitle1 text-accent-dark">
                    <!-- S O L U T I O N : Call the method with this order's pants data -->
                    {{
                      formatCurrency(calculateCategoryTotal(uniformList.pants))
                    }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
        <div
          v-else
          class="flex flex-center column q-pa-md"
          style="min-height: 250px"
        >
          <q-icon
            name="sentiment_very_satisfied"
            color="grey-5"
            size="80px"
            class="q-mb-sm"
          />
          <div class="text-h6 text-grey-7 q-mb-xs">
            Employee has no uniforms recorded for this cut-off.
          </div>
          <div class="text-subtitle2 text-grey-6 text-center">
            It looks like there are no uniforms recorded for
            <br />
            {{ dtrFrom }} to {{ dtrTo }}
          </div>
        </div>
      </q-card-section>

      <!-- Grand Total Section at the very bottom -->
      <q-card-section
        class="q-py-md q-px-lg total-summary-section compact-total-summary"
      >
        <div class="flex justify-between items-center total-grand">
          <div class="text-subtitle1 text-weight-bold text-gradient">
            Grand Total :
          </div>
          <div class="text-h6 text-weight-bold text-gradient total-amount">
            <!-- This remains correct as it sums everything -->
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
const props = defineProps(["uniformLists", "dtrFrom", "dtrTo"]);
const emit = defineEmits(["update:total"]);

// S O L U T I O N : A method to calculate total for a specific category within a single order.
const calculateCategoryTotal = (items) => {
  // Guard against cases where items might not exist
  if (!items || !Array.isArray(items)) {
    return 0;
  }

  return items.reduce((sum, item) => {
    const price = parseFloat(item.price || 0);
    const pcs = parseInt(item.pcs || 0);
    return sum + price * pcs;
  }, 0);
};

// The computed properties below are now used ONLY for the final "Grand Total".
const tShirtGrandTotal = computed(() => {
  return props.uniformLists?.reduce((sum, uniformList) => {
    return sum + calculateCategoryTotal(uniformList.t_shirt);
  }, 0);
});

const pantsGrandTotal = computed(() => {
  return props.uniformLists?.reduce((sum, uniformList) => {
    return sum + calculateCategoryTotal(uniformList.pants);
  }, 0);
});

const grandTotal = computed(() => {
  return tShirtGrandTotal.value + pantsGrandTotal.value;
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

.uniform-order-card {
  border-radius: 10px;
  border: 1px solid #e0e6ed;
  background-color: #fcfdfe;

  &:not(:last-child) {
    margin-bottom: 24px;
  }
}

.payment-summary-section {
  padding-bottom: 0 !important;
  border-bottom: none !important;
}

.scrollable-content-wrapper {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px !important; // Adjust padding to create space around the cards

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #0267c5;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #0c3154;
  }
}

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

.payment-summary {
  background: #f9fbfd;
  border: 1px solid #e0e6ed;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  font-family: "Open Sans", sans-serif;

  .label {
    font-size: 0.85rem;
    color: #6c757d;
    margin-bottom: 4px;
    font-weight: 600;
  }

  .value {
    font-size: 1.05rem;
    font-weight: 700;
    color: #0c3154;
  }
}
</style>
