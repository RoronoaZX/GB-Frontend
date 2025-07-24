<template>
  <q-dialog ref="dialogRef" persistent position="top">
    <q-card class="q-dialog-card-modern">
      <q-card-section
        class="q-dialog-header-modern bg-deep-purple-7 text-white row items-center no-wrap"
      >
        <div class="text-h5 text-weight-bolder q-ml-sm">Credit Summary</div>
        <q-space />
        <q-btn
          icon="close"
          flat
          dense
          round
          v-close-popup
          class="text-white q-mr-sm"
        />
      </q-card-section>

      <q-card-section class="q-pa-lg">
        <q-list class="q-list-elegant">
          <q-item class="q-item-header-elegant text-weight-bold text-grey-8">
            <q-item-section class="q-item-section-product"
              >Product Name</q-item-section
            >
            <q-item-section class="q-item-section-center">Price</q-item-section>
            <q-item-section class="q-item-section-center">Qty</q-item-section>
            <q-item-section side class="q-item-section-right"
              >Amount</q-item-section
            >
          </q-item>

          <q-scroll-area class="q-list-scroll-area">
            <q-item
              v-for="(credit, index) in creditList"
              :key="index"
              class="q-item-data-elegant"
            >
              <q-item-section class="q-item-section-product">
                <div class="text-subtitle1 text-grey-9">
                  {{ credit.product_name }}
                </div>
              </q-item-section>
              <q-item-section
                class="q-item-section-center text-body1 text-grey-7"
              >
                {{ formatCurrency(credit.price) }}
              </q-item-section>
              <q-item-section
                class="q-item-section-center text-body1 text-grey-7"
              >
                {{ credit.pieces }}
              </q-item-section>
              <q-item-section
                side
                class="q-item-section-right text-body1 text-grey-9 text-weight-medium"
              >
                {{ formatCurrency(credit.total_price) }}
              </q-item-section>
            </q-item>
          </q-scroll-area>

          <q-item
            class="q-item-total-elegant bg-deep-purple-1 text-deep-purple-9 text-weight-bold"
          >
            <q-item-section class="text-h6"> Total : </q-item-section>
            <q-item-section />
            <q-item-section />
            <q-item-section side class="text-h6">
              {{ formatCurrency(totalAmount) }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { computed, watch } from "vue";

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const props = defineProps(["creditList"]);

const emit = defineEmits(["update:total"]);

const totalAmount = computed(() => {
  return props.creditList?.reduce((sum, item) => {
    // Ensure total_price is treated as a number
    return sum + parseFloat(item.total_price || 0);
  }, 0); // No toFixed() here, let formatCurrency handle it
});

const formatCurrency = (value) => {
  const number = parseFloat(value || 0);
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2, // Ensure consistent two decimal places
  }).format(number);
};

watch(
  () => props.creditList,
  (newList) => {
    const rawTotal = newList?.reduce((acc, item) => {
      // Ensure total_price is treated as a number
      return acc + parseFloat(item.total_price || 0);
    }, 0);
    emit("update:total", rawTotal); // Emit the raw total
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style lang="scss" scoped>
// Modern, elegant, eye-pleasing design

.q-dialog-card-modern {
  width: 550px; // Slightly wider for better spacing
  max-width: 90vw; // Ensure responsiveness on smaller screens
  border-radius: 16px; // More pronounced rounded corners
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2); // Deeper, more elegant shadow
  overflow: hidden; // Ensures border-radius is respected by children
  background-color: #ffffff; // Clean white background
}

.q-dialog-header-modern {
  padding: 20px 30px; // Increased padding for a luxurious feel
  border-bottom: 1px solid rgba(255, 255, 255, 0.25); // Subtle separator
  background: linear-gradient(
    135deg,
    #673ab7 0%,
    #512da8 100%
  ); // Deep Purple gradient
  .text-h5 {
    font-size: 1.8rem; // Larger, more impactful title
    line-height: 1.2;
    letter-spacing: 0.5px;
  }
}

.q-list-elegant {
  border: none; // Remove default borders
  padding: 0; // Remove default padding
}

.q-list-scroll-area {
  height: 350px; // Increased height for more visible items
  max-height: 50vh; // Adaptive height
  .q-scrollarea__content {
    padding-bottom: 8px; // Prevent items from sticking to bottom of scroll area
  }
}

.q-item-header-elegant {
  background-color: #f8f9fa; // Very light grey for the header background
  padding: 15px 20px; // Generous padding
  border-bottom: 2px solid #e0e0e0; // A more prominent, crisp line
  font-size: 0.95em;
  letter-spacing: 0.8px; // Tighter letter spacing for a clean look
  text-transform: uppercase; // All caps for headers
  color: #555; // Slightly softer text color
}

.q-item-data-elegant {
  padding: 15px 20px; // Consistent padding for all data rows
  border-bottom: 1px solid #f2f2f2; // Very light separator for each row
  &:hover {
    background-color: #fbfbfb; // Subtle hover highlight
  }
  &:last-child {
    border-bottom: none; // No border on the last item for a clean finish
  }
}

// Specific column styling for better alignment and visual hierarchy
.q-item-section-product {
  flex: 2; // Product name takes more space
  .text-subtitle1 {
    font-size: 1.05rem;
    color: #333;
  }
}

.q-item-section-center {
  flex: 1;
  text-align: center;
  .text-body1 {
    font-size: 0.95rem;
  }
}

.q-item-section-right {
  flex: 1;
  text-align: right;
  .text-body1 {
    font-size: 1rem;
    color: #222;
  }
}

.q-item-total-elegant {
  padding: 20px 30px; // More padding for the total row
  border-top: 2px solid rgba(255, 255, 255, 0.3); // Distinct top border
  background-color: #673ab7; // Use the primary header color for a strong total
  color: #ffffff; // White text on the dark background
  font-size: 1.25rem; // Larger font for the total
  letter-spacing: 0.5px;
  .text-h6 {
    font-size: 1.25rem; // Ensure consistency
    font-weight: bold;
  }
}
</style>
