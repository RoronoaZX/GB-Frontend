<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    v-model="dialog"
    position="bottom"
    :maximized="$q.platform.is.mobile"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="modern-dialog">
      <div
        class="drag-handle q-mx-auto q-mt-sm"
        v-if="$q.platform.is.mobile"
      ></div>

      <div class="header-wrapper q-pa-lg" :class="headerClass">
        <div class="row items-center justify-between q-mb-md">
          <q-btn
            flat
            round
            icon="close"
            color="white"
            v-close-popup
            class="close-btn"
          />
          <div class="status-chip" :class="statusClass">
            {{ capitalizeFirstLetter(productDetails?.status || "Unknown") }}
          </div>
        </div>

        <div class="header-main-text">
          <div
            class="text-caption text-white opacity-70 text-uppercase letter-spacing-1"
          >
            {{ category }} • {{ productDetails?.action }}
          </div>
          <div class="text-h4 text-weight-bolder text-white q-mt-xs">
            {{
              capitalizeFirstLetter(
                productDetails?.product?.name || "Transaction"
              )
            }}
          </div>
        </div>
      </div>

      <q-card-section class="content-section q-pa-none">
        <div class="q-pa-lg">
          <!-- <div class="summary-card q-mb-xl">
            <div
              class="row items-center justify-between q-pa-md border-bottom-dashed"
            >
              <div class="text-body2 text-grey-7">
                {{ capitalizeFirstLetter(productDetails?.action || "") }}
                Pieces

                {{ productDetails?.added_product }}
              </div>
              <div class="text-body1 text-weight-bold">
                {{ formatPrice(productDetails?.price) }}
              </div>
            </div>
            <div class="total-row q-pa-lg text-center">
              <div
                class="text-caption text-primary text-weight-bold text-uppercase"
              >
                Total
              </div>
              <div class="total-amount-text">
                {{
                  calculateTotal(
                    productDetails?.price,
                    productDetails?.added_product
                  )
                }}
              </div>
            </div>
          </div> -->

          <div class="summary-card q-mb-xl">
            <div
              class="row items-center justify-between q-pa-lg border-bottom-dashed"
            >
              <div class="column">
                <div
                  class="text-caption text-grey-6 text-uppercase text-weight-bolder"
                >
                  Total Quantity
                </div>
                <div class="row items-baseline">
                  <div class="text-h4 text-weight-bolder text-secondary">
                    {{ productDetails?.added_product || 0 }}
                  </div>
                  <div class="text-subtitle1 text-grey-7 q-ml-xs">pcs</div>
                </div>
              </div>

              <div class="column items-end">
                <div
                  class="text-caption text-grey-6 text-uppercase text-weight-bolder"
                >
                  Unit Price
                </div>
                <div class="text-subtitle1 text-weight-bold text-grey-9">
                  {{ formatPrice(productDetails?.price) }}
                </div>
              </div>
            </div>
            <div class="total-row q-pa-lg text-center bg-grey-1">
              <div
                class="text-caption text-primary text-weight-bold text-uppercase letter-spacing-1"
              >
                Total
              </div>
              <div class="total-amount-text">
                {{
                  calculateTotal(
                    productDetails?.price,
                    productDetails?.added_product
                  )
                }}
              </div>
            </div>
          </div>
          <div class="section-label q-mb-sm">Transaction Details</div>
          <div class="info-grid">
            <div class="info-item">
              <q-icon name="event" size="22px" color="primary" />
              <div>
                <div class="label">Date</div>
                <div class="value">
                  {{ formatDate(productDetails?.created_at) }}
                </div>
              </div>
            </div>
            <div class="info-item">
              <q-icon name="schedule" size="22px" color="primary" />
              <div>
                <div class="label">Time</div>
                <div class="value">
                  {{ formatTime(productDetails?.created_at) }}
                </div>
              </div>
            </div>
            <div class="info-item">
              <q-icon name="person" size="22px" color="primary" />
              <div>
                <div class="label">Processed By</div>
                <div class="value">
                  {{ formatFullname(productDetails?.employee) || "—" }}
                </div>
              </div>
            </div>
            <div class="info-item full-width">
              <q-icon name="sync_alt" size="22px" color="primary" />
              <div class="row full-width justify-between items-center">
                <div class="branch-pill">
                  {{ productDetails?.from_branch?.name }}
                </div>
                <q-icon name="east" color="grey-4" />
                <div class="branch-pill">
                  {{ productDetails?.to_branch?.name }}
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="productDetails?.status?.toLowerCase() === 'pending'"
            class="action-area q-mt-xl"
          >
            <q-btn
              unelevated
              class="btn-confirm full-width q-mb-sm"
              label="Approve Transaction"
              @click="clickedReceiveProduct('confirmed')"
            />
            <q-btn
              flat
              class="btn-decline full-width"
              label="Decline"
              color="negative"
              @click="clickedReceiveProduct('declined')"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import { typographyFormat } from "src/composables/typography/typography-format";

const { dialogRef, onDialogHide } = useDialogPluginComponent();
const dialog = ref(false);
const $q = useQuasar();

const props = defineProps({
  productDetails: { type: Object, required: true },
  category: { type: String, required: true },
});

console.log("productDetails", props.productDetails);

const {
  formatDate,
  formatTime,
  formatFullname,
  formatPrice,
  capitalizeFirstLetter,
} = typographyFormat();

const headerClass = computed(() => {
  const cat = props.category?.toLowerCase() || "";
  return (
    {
      "bg-selecta": cat === "selecta",
      "bg-bread": cat === "bread",
      "bg-nestle": cat === "nestle",
      "bg-softdrinks": cat === "softdrinks",
      "bg-other": cat === "other" || !cat,
    }[cat] || "bg-primary"
  );
});

const getCategoryColor = (cat, fallback = "primary") => {
  const map = {
    selecta: "pink",
    bread: "brown",
    nestle: "light-blue",
    softdrinks: "deep-purple",
    other: "blue-grey-7",
  };
  const color = map[cat?.toLowerCase()] || fallback;
  return `text-${color}`;
};

const getStatusColor = (status) => {
  const s = (status || "").toLowerCase();
  if (s.includes("pending")) return "orange-7";
  if (s.includes("confirmed") || s.includes("approved")) return "positive";
  if (s.includes("declined") || s.includes("rejected")) return "negative";
  return "grey-7";
};

const calculateTotal = (price, qty) => {
  if (!price || !qty) return formatPrice(0);
  return formatPrice(parseFloat(price) * parseInt(qty, 10));
};

const clickedReceiveProduct = (newStatus) => {
  // Implement your API call / store update here
  // Example:
  // salesReportStore.updateTransactionStatus(props.productDetails.id, newStatus)
  $q.notify({
    type: newStatus === "confirmed" ? "positive" : "negative",
    message: `Transaction ${
      newStatus === "confirmed" ? "confirmed" : "declined"
    }`,
  });
  dialog.value = false;
};
</script>

<style lang="scss" scoped>
.modern-dialog {
  border-radius: 32px 32px 0 0 !important;
  background: #f8fafc;
  max-width: 500px;
}

.drag-handle {
  width: 40px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.header-wrapper {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 0 0 40px 40px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -20%;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }

  /* Gradients */
  &.bg-selecta {
    background: linear-gradient(135deg, #f43f5e, #be123c);
  }
  &.bg-bread {
    background: linear-gradient(135deg, #92400e, #451a03);
  }
  &.bg-nestle {
    background: linear-gradient(135deg, #0ea5e9, #0369a1);
  }
  &.bg-softdrinks {
    background: linear-gradient(135deg, #8b5cf6, #5b21b6);
  }
  &.bg-primary {
    background: linear-gradient(135deg, #334155, #0f172a);
  }
}

.status-chip {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.summary-card {
  background: white;
  border-radius: 24px;
  margin-top: -50px; // Pulling it up into the header
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.total-row {
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.02);
}

.total-amount-text {
  font-size: 2.5rem;
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -2px;
  line-height: 1;
  padding: 8px 0;
  background: linear-gradient(180deg, #1e293b 0%, #475569 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.letter-spacing-1 {
  letter-spacing: 1.5px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.border-bottom-dashed {
  border-bottom: 2px dashed #edf2f7;
}

// Branch Pills enhancement
.branch-pill {
  background: #f8fafc;
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: 700;
  color: #334155;
  font-size: 13px;
  border: 1px solid #e2e8f0;
  flex: 1;
  text-align: center;
  max-width: 40%;
}

.info-item {
  background: white;
  padding: 16px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #f1f5f9;

  &.full-width {
    grid-column: span 2;
  }

  .label {
    font-size: 11px;
    color: #94a3b8;
    text-transform: uppercase;
    font-weight: 600;
  }
  .value {
    font-size: 14px;
    font-weight: 600;
    color: #334155;
  }
}

.branch-pill {
  background: #f1f5f9;
  padding: 4px 12px;
  border-radius: 8px;
  font-weight: 700;
  color: #475569;
  font-size: 13px;
}

.btn-confirm {
  background: #1e293b;
  color: white;
  height: 56px;
  border-radius: 16px;
  font-weight: 700;
  box-shadow: 0 10px 20px rgba(30, 41, 59, 0.2);
}

.btn-decline {
  height: 50px;
  font-weight: 600;
}

.border-bottom-dashed {
  border-bottom: 2px dashed #f1f5f9;
}
</style>
