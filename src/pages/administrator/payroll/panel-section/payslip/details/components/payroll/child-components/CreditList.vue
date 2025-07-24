<template>
  <q-dialog ref="dialogRef" persistent position="top">
    <q-card class="q-dialog-card-dense-elegant">
      <q-card-section
        class="q-dialog-header-dense bg-deep-purple-7 text-white row items-center no-wrap"
      >
        <div class="text-h6 text-weight-bolder q-ml-sm">Credit Summary</div>
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

      <q-card-section class="q-pa-md">
        <q-list class="q-list-dense-elegant">
          <q-item class="q-item-header-dense text-weight-bold text-grey-7">
            <q-item-section class="q-item-section-product"
              >Product Name</q-item-section
            >
            <q-item-section class="q-item-section-center">Price</q-item-section>
            <q-item-section class="q-item-section-center">Qty</q-item-section>
            <q-item-section side class="q-item-section-right"
              >Amount</q-item-section
            >
          </q-item>

          <q-scroll-area class="q-list-scroll-area-dense">
            <q-item
              v-for="(credit, index) in creditList"
              :key="index"
              class="q-item-data-dense"
            >
              <q-item-section class="q-item-section-product">
                <div class="text-body2 text-grey-8">
                  {{ credit.product_name }}
                </div>
              </q-item-section>
              <q-item-section
                class="q-item-section-center text-caption text-grey-6"
              >
                {{ formatCurrency(credit.price) }}
              </q-item-section>
              <q-item-section
                class="q-item-section-center text-caption text-grey-6"
              >
                {{ credit.pieces }}
              </q-item-section>
              <q-item-section
                side
                class="q-item-section-right text-body2 text-grey-8 text-weight-medium"
              >
                {{ formatCurrency(credit.total_price) }}
              </q-item-section>
            </q-item>
          </q-scroll-area>

          <q-item
            class="q-item-total-dense bg-deep-purple-1 text-deep-purple-9 text-weight-bold"
          >
            <q-item-section class="text-subtitle1"> Total : </q-item-section>
            <q-item-section />
            <q-item-section />
            <q-item-section side class="text-subtitle1">
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
    return sum + parseFloat(item.total_price || 0);
  }, 0);
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

watch(
  () => props.creditList,
  (newList) => {
    const rawTotal = newList?.reduce((acc, item) => {
      return acc + parseFloat(item.total_price || 0);
    }, 0);
    emit("update:total", rawTotal);
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style lang="scss" scoped>
// Denser, more elegant, eye-pleasing design

.q-dialog-card-dense-elegant {
  width: 500px; // Slightly narrower card
  max-width: 90vw;
  border-radius: 12px; // Slightly less rounded for density
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); // A bit less prominent shadow
  overflow: hidden;
  background-color: #ffffff;
}

.q-dialog-header-dense {
  padding: 16px 24px; // Reduced padding
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(135deg, #673ab7 0%, #512da8 100%);
  .text-h6 {
    font-size: 1.25rem; // Slightly smaller header font
    line-height: 1.2;
    letter-spacing: 0.3px; // Tighter letter spacing
  }
}

.q-list-dense-elegant {
  border: none;
  padding: 0;
}

.q-list-scroll-area-dense {
  height: 280px; // Reduced scroll area height to make content denser
  max-height: 45vh;
  .q-scrollarea__content {
    padding-bottom: 0px; // No extra padding at the bottom of scroll area
  }
}

.q-item-header-dense {
  background-color: #f5f5f5; // Lighter grey for header background
  padding: 10px 18px; // Reduced padding
  border-bottom: 1px solid #e0e0e0; // Thinner, subtle line
  font-size: 0.85em; // Smaller header font
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #616161; // Slightly darker grey for better contrast
}

.q-item-data-dense {
  padding: 10px 18px; // Reduced padding for data rows
  border-bottom: 1px solid #f8f8f8; // Even lighter separator
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #fdfdfd; // Very subtle hover
  }
  &:last-child {
    border-bottom: none;
  }
}

// Specific column styling for better alignment and visual hierarchy
.q-item-section-product {
  flex: 2;
  .text-body2 {
    font-size: 0.9rem; // Smaller font for product names
    color: #424242; // Slightly softer black
  }
}

.q-item-section-center {
  flex: 1;
  text-align: center;
  .text-caption {
    font-size: 0.8rem; // Smaller font for price and quantity
    color: #757575; // Softer grey
  }
}

.q-item-section-right {
  flex: 1;
  text-align: right;
  .text-body2 {
    font-size: 0.9rem; // Smaller font for amount
    color: #333; // Slightly darker for emphasis
  }
}

.q-item-total-dense {
  padding: 14px 24px; // Reduced padding for total row
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  background-color: #673ab7; // Still using deep purple for strong total
  color: #ffffff;
  font-size: 1.05rem; // Slightly smaller font for total
  letter-spacing: 0.3px;
  .text-subtitle1 {
    font-size: 1.05rem;
    font-weight: bold;
  }
}
</style>
