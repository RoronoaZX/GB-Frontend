<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
    persistent
  >
    <q-card class="bg-white">
      <!-- Header -->
      <div :class="['header-wrapper', headerClass]">
        <div class="header-content q-px-lg q-py-lg">
          <div class="row items-center justify-between">
            <div class="row items-center q-gutter-md">
              <div class="icon-wrapper">
                <q-icon
                  :name="getCategoryIcon(category)"
                  size="40px"
                  class="icon"
                />
              </div>
              <div>
                <div class="text-h4 text-weight-bold text-white">
                  {{ capitalizeFirstLetter(category) }}
                </div>
                <div class="text-subtitle1 text-white opacity-80 q-mt-xs">
                  Transaction Details
                </div>
              </div>
            </div>

            <q-btn
              icon="close"
              class="text-white"
              flat
              round
              dense
              v-close-popup
            />
          </div>
        </div>

        <!-- Header wave decoration -->
        <div class="wave-decoration">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              fill="currentColor"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              fill="currentColor"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>

      <!-- Content -->
      <!-- <q-scroll-area class="dialog-scroll-area"> -->
      <div class="scrollable-content">
        <q-card-section class="q-pt-xl q-pb-sm">
          <!-- Transaction Info Cards -->
          <div class="row q-col-gutter-lg q-mb-xl">
            <!-- Date Card -->
            <div class="col-12 col-sm-4">
              <div class="info-card">
                <div class="row items-center q-gutter-sm q-mb-sm">
                  <q-icon name="event" color="grey-6" size="20px" />
                  <div class="text-subtitle2 text-grey-7">Date & Time</div>
                </div>
                <div class="text-h6 text-weight-medium">
                  {{ formatDate(productDetails?.created_at || "No Date") }}
                </div>
              </div>
            </div>

            <!-- Cashier Card -->
            <div class="col-12 col-sm-4">
              <div class="info-card">
                <div class="row items-center q-gutter-sm q-mb-sm">
                  <q-icon name="person" color="grey-6" size="20px" />
                  <div class="text-subtitle2 text-grey-7">Cashier</div>
                </div>
                <div class="text-h6 text-weight-medium">
                  {{ formatFullname(productDetails?.employee || "No Cashier") }}
                </div>
              </div>
            </div>

            <!-- Branch Card -->
            <div class="col-12 col-sm-4">
              <div class="info-card">
                <div class="row items-center q-gutter-sm q-mb-sm">
                  <q-icon name="store" color="grey-6" size="20px" />
                  <div class="text-subtitle2 text-grey-7">
                    {{
                      productDetails?.to_branch_id === branchId
                        ? "Source"
                        : "Destination"
                    }}
                  </div>
                </div>
                <div class="text-h6 text-weight-medium">
                  {{
                    productDetails?.to_branch_id === branchId
                      ? productDetails?.from_branch?.name || "No Branch"
                      : productDetails?.to_branch?.name || "No Branch"
                  }}
                </div>
              </div>
            </div>
          </div>

          <!-- Product Details Card -->
          <div class="product-card q-mb-xl">
            <div class="text-h6 text-weight-bold q-mb-md">
              Product Information
            </div>

            <div class="row items-center q-gutter-lg">
              <div class="col-auto">
                <div class="product-icon" :class="headerClass">
                  <q-icon
                    :name="getCategoryIcon(category)"
                    size="32px"
                    class="text-white"
                  />
                </div>
              </div>

              <div class="col">
                <div class="text-h5 text-weight-bold q-mb-xs">
                  {{
                    capitalizeFirstLetter(
                      productDetails?.product?.name || "N/A"
                    )
                  }}
                </div>
                <div class="row items-center q-gutter-xl">
                  <div class="column">
                    <div class="text-subtitle2 text-grey-7">Price</div>
                    <div
                      class="text-h5 text-weight-bold"
                      :class="getCategoryColor(category)"
                    >
                      {{ formatPrice(productDetails?.price || "N/A") }}
                    </div>
                  </div>
                  <div class="column">
                    <div class="text-subtitle2 text-grey-7">Quantity</div>
                    <div class="text-h5 text-weight-bold">
                      {{ productDetails?.added_product || "N/A" }}
                      <span class="text-subtitle1 text-grey-7">pcs</span>
                    </div>
                  </div>
                  <div class="column">
                    <div class="text-subtitle2 text-grey-7">Total</div>
                    <div class="text-h5 text-weight-bold">
                      {{
                        calculateTotal(
                          productDetails?.price,
                          productDetails?.added_product
                        )
                      }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </div>

      <q-card-section class="q-pa-sm" align="right">
        <!-- v-if="
            branchId === productDetails?.to_branch_id &&
            productDetails?.status === 'pending' &&
            productDetails?.action === 'send'
          " -->
        <div
          v-if="productDetails?.status === 'pending'"
          class="row justify-end q-gutter-md"
        >
          <q-btn
            label="Receive Product"
            :color="getCategoryColor(category, 'positive')"
            padding="12px 32px"
            class="rounded-btn text-dark"
            :icon="getCategoryIcon(category)"
            @click="clickedReceiveProduct(productDetails)"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent, useQuasar } from "quasar";
import { computed, ref } from "vue";
import { typographyFormat } from "src/composables/typography/typography-format";
import { useSalesReportsStore } from "src/stores/sales-report";
import ProceedDialog from "./ProceedDialog.vue";
const props = defineProps({
  index: { type: Number, required: true },
  productDetails: { type: Object, required: true },
  category: { type: String, required: true },
});

console.log("props", props);

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const maximizedToggle = ref(true);

const dialog = ref(false);

const $q = useQuasar();

const { formatDate, formatFullname, formatPrice, capitalizeFirstLetter } =
  typographyFormat();

const headerClass = computed(() => {
  const map = {
    selecta: "bg-selecta",
    bread: "bg-bread",
    nestle: "bg-nestle",
    softdrinks: "bg-softdrinks",
    other: "bg-other",
  };
  return map[props.category?.toLowerCase()] || "bg-primary";
});

const getCategoryColor = (cat, fallback = null) => {
  const colors = {
    bread: "brown",
    selecta: "pink",
    nestle: "info",
    softdrinks: "purple",
    other: "blue-grey-7",
  };
  return (
    colors[cat?.toLowerCase()] ||
    (fallback ? `text-${fallback}` : "text-primary")
  );
};

const salesReportsStore = useSalesReportsStore();
const userData = computed(() => salesReportsStore.user);
const branchId = computed(
  () =>
    userData.value?.device?.reference_id ||
    userData.value?.device?.reference?.id ||
    ""
);

const getCategoryIcon = (cat) => {
  const icons = {
    bread: "bakery_dining",
    selecta: "icecream",
    nestle: "ac_unit",
    softdrinks: "local_drink",
    other: "category",
  };
  return icons[cat?.toLowerCase()] || "inventory_2";
};

const calculateTotal = (price, quantity) => {
  if (!price || !quantity) return formatPrice("N/A");
  const total = parseFloat(price) * parseInt(quantity);
  return formatPrice(total);
};

const clickedReceiveProduct = () => {
  $q.dialog({
    component: ProceedDialog,
    componentProps: {
      // index: props.index,
      productDetails: props.productDetails,
      category: props.category,
    },
  });
};
</script>

<style lang="scss" scoped>
.dialog-card {
  width: 700px;
  max-width: 95vw;
  max-height: 90vh; /* Keep it within the screen height */
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden; /* Prevent double scrollbars */
  background-color: #fcfcfc;
}

.dialog-scroll-area {
  flex: 1; // takes remaining space
  min-height: 0; // required for flex scroll
}

.header-wrapper {
  position: relative;
  overflow: hidden;

  .header-content {
    position: relative;
    z-index: 2;
  }

  .wave-decoration {
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 120px;
    color: white;
    opacity: 0.15;
    z-index: 1;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &.bg-selecta {
    background: linear-gradient(135deg, #f48fb1 0%, #f06292 100%);
  }
  &.bg-bread {
    background: linear-gradient(135deg, #8d6e63 0%, #5d4037 100%);
  }
  &.bg-nestle {
    background: linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%);
  }
  &.bg-softdrinks {
    background: linear-gradient(135deg, #e67df9 0%, #9c27b0 100%);
  }
  &.bg-other {
    background: linear-gradient(135deg, #78909c 0%, #455a64 100%);
  }
}
.footer-wrapper {
  padding: 12px;
  position: relative;
  overflow: hidden;

  .header-content {
    position: relative;
    z-index: 2;
  }

  .wave-decoration {
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 120px;
    color: white;
    opacity: 0.15;
    z-index: 1;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &.bg-selecta {
    background: linear-gradient(135deg, #f48fb1 0%, #f06292 100%);
  }
  &.bg-bread {
    background: linear-gradient(135deg, #8d6e63 0%, #5d4037 100%);
  }
  &.bg-nestle {
    background: linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%);
  }
  &.bg-softdrinks {
    background: linear-gradient(135deg, #e67df9 0%, #9c27b0 100%);
  }
  &.bg-other {
    background: linear-gradient(135deg, #78909c 0%, #455a64 100%);
  }
}

.dialog-footer {
  // Dynamic gradients based on category
  &.bg-selecta {
    background: linear-gradient(135deg, #f8a5c2 0%, #f78fb3 100%);
  }
  &.bg-bread {
    background: linear-gradient(135deg, #a77b66, #bda4a1);
  }
  &.bg-nestle {
    background: linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%);
  }
  &.bg-softdrinks {
    background: linear-gradient(135deg, #e67df9 0%, #9c27b0 100%);
  }
  &.bg-other {
    background: linear-gradient(135deg, #a4b0be 0%, #747d8c 100%);
  }
  &.bg-primary {
    background: linear-gradient(135deg, var(--q-primary) 0%, #2c3e50 100%);
  }
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }
}

.icon-wrapper {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  .icon {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }
}

.info-card {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 14px;
  border-left: 4px solid var(--q-primary);
  transition: all 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
}

.product-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
}

.product-icon {
  width: 70px;
  height: 70px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

  &.bg-selecta {
    background: linear-gradient(135deg, #f48fb1, #f06292);
  }
  &.bg-bread {
    background: linear-gradient(135deg, #8d6e63, #5d4037);
  }
  &.bg-nestle {
    background: linear-gradient(135deg, #4fc3f7, #0288d1);
  }
  &.bg-softdrinks {
    background: linear-gradient(135deg, #e67df9 0%, #9c27b0 100%);
  }
  &.bg-other {
    background: linear-gradient(135deg, #78909c, #455a64);
  }
}

.rounded-btn {
  border-radius: 12px;
  font-weight: 600;
  text-transform: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
}

.opacity-80 {
  opacity: 0.8;
}

.text-brown {
  color: #8d6e63;
}

.text-pink {
  color: #f06292;
}

.text-blue {
  color: #0288d1;
}

.scrollable-content {
  flex: 1; /* takes remaining height */
  overflow-y: auto; /* enables scrolling */
  padding-bottom: 16px; /* optional */
}

// Responsive adjustments
@media (max-width: 600px) {
  .header-wrapper .header-content {
    padding: 20px;
  }

  .q-card-section {
    padding: 20px;
  }

  .product-card {
    padding: 20px;
  }

  .row.q-col-gutter-lg {
    margin-left: -8px !important;
    margin-right: -8px !important;

    > .col {
      padding-left: 8px !important;
      padding-right: 8px !important;
    }
  }
}
</style>
