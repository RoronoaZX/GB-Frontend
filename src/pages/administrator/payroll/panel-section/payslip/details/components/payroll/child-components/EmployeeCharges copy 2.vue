<template>
  <q-dialog ref="dialogRef" persistent position="top">
    <q-card class="charges-list-card compact-card">
      <q-card-section class="header-section compact-header">
        <div class="text-h6 text-weight-bolder text-shadow">
          Charges Summary
        </div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup color="white" />
      </q-card-section>

      <q-card-section class="scrollable-content-wrapper">
        <div v-if="localList.length > 0" class="q-pt-sm">
          <q-list bordered class="rounded-borders">
            <q-item class="list-header bg-grey-2 text-weight-medium">
              <q-item-section>Report Date</q-item-section>
              <q-item-section>Branch</q-item-section>
              <q-item-section side>Amount</q-item-section>
            </q-item>

            <q-item
              v-for="(item, i) in localList"
              :key="i"
              class="compact-list-item"
            >
              <q-item-section>
                {{ formatDateString(item.created_at) }}
              </q-item-section>
              <q-item-section>
                {{ capitalizeFirstLetter(item.branch.name) }}
              </q-item-section>

              <!-- Editable Amount with q-popup-edit -->
              <q-item-section side>
                <q-popup-edit
                  v-model="item.charges_amount"
                  @update:model-value="onItemUpdate(i, $event)"
                  title="Edit Charge Amount"
                  buttons
                  persistent
                  label="Amount"
                >
                  <q-input
                    v-model.number="item.charges_amount"
                    type="number"
                    dense
                    outlined
                    step="0.01"
                    autofocus
                    :rules="[(val) => val >= 0 || 'Cannot be negative']"
                  />
                </q-popup-edit>

                <div
                  class="cursor-pointer text-primary"
                  @click="$refs.popup?.[i]?.show()"
                >
                  {{ formatCurrency(item.charges_amount) }}
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- Empty state -->
        <div
          v-else
          class="flex flex-center column q-pa-xl"
          style="min-height: 250px"
        >
          <q-icon name="sentiment_very_satisfied" color="grey-5" size="80px" />
          <div class="text-h6 text-grey-7 q-mt-md">No charges recorded</div>
        </div>
      </q-card-section>

      <q-card-section class="q-py-md q-px-lg bg-grey-1">
        <div class="flex justify-between items-center">
          <div class="text-subtitle1 text-weight-bold">Total:</div>
          <div class="text-h6 text-weight-bold text-negative">
            {{ formatCurrency(totalAmount) }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent, date } from "quasar";
import { ref, computed, watch } from "vue";

const { dialogRef } = useDialogPluginComponent();

const props = defineProps({
  chargesAmountList: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:chargesAmountList"]);

// Local editable copy
const localList = ref([]);

const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  if (obj instanceof Date) return new Date(obj.getTime());
  const cloned = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
};

watch(
  () => props.chargesAmountList,
  (newVal) => {
    localList.value = newVal.map(deepClone);
  },
  { immediate: true }
);

// // Keep in sync when dialog reopens with new data
// watch(
//   () => props.chargesAmountList,
//   (newVal) => {
//     localList.value = structuredClone(newVal);
//   },
//   { deep: true }
// );

// Recalculate total
const totalAmount = computed(() => {
  return localList.value.reduce(
    (sum, item) => sum + parseFloat(item.charges_amount || 0),
    0
  );
});

// When user saves in popup-edit
const onItemUpdate = (index, newValue) => {
  localList.value[index].charges_amount = parseFloat(newValue) || 0;

  // Emit updated full list back to parent
  emit("update:chargesAmountList", structuredClone(localList.value));
};

const formatDateString = (d) => date.formatDate(d, "MMM. DD, YYYY");
const capitalizeFirstLetter = (str) =>
  str?.replace(/\b\w/g, (l) => l.toUpperCase());

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(parseFloat(value || 0));
};
</script>

<style scoped>
.item-price {
  font-weight: 600;
  color: #1976d2;
}

.bg-grey-3 {
  background-color: #f5f5f5 !important;
}

.text-gradient {
  background: linear-gradient(90deg, #1976d2, #42a5f5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;600&display=swap");

// Define a richer color palette with SCSS variables

// $primary-blue: #007bff;
$primary-blue: #0267c5;
$secondary-blue: #0c3154;
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

.charges-list-card.compact-card {
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
  &::-webkit-scrollbar-thumb {
    background: $primary-blue;
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

.category-title {
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
  background: linear-gradient(90deg, $light-blue 0%, white 100%);
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
