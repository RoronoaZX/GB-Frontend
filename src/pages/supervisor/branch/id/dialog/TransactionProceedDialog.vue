<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    v-model="dialog"
    persistent
    :position="isMobile ? 'bottom' : 'standard'"
  >
    <q-card
      class="mobile-remark-dialog"
      :class="{ 'mobile-fullscreen': isMobile }"
    >
      <!-- Premium Header -->
      <div class="mobile-dialog-header" :class="`header-${status}`">
        <div class="header-content">
          <div class="row items-center justify-between no-wrap">
            <div class="header-title">
              <q-icon
                :name="status === 'confirmed' ? 'check_circle' : 'warning'"
                size="24px"
                class="q-mr-sm"
              />
              {{ getHeaderTitle() }}
            </div>
            <q-btn flat round dense icon="close" v-close-popup class="close-btn" />
          </div>
          <div class="header-subtitle">
            Please provide a remark to complete this transaction update.
          </div>
        </div>
        <div class="header-wave"></div>
      </div>

      <q-card-section class="q-pa-lg">
        <!-- Compact Product Summary -->
        <div class="product-card-modern q-mb-xl">
          <div class="product-category-badge" :class="`bg-${category?.toLowerCase() || 'primary'}`">
            <q-icon :name="getCategoryIcon()" size="24px" />
          </div>
          <div class="product-info-content">
            <div class="product-name-mobile">
              {{ capitalizeFirstLetter(productDetails?.product?.name || 'Unknown Product') }}
            </div>
            <div class="product-details-grid">
              <div class="detail-item">
                <q-icon name="inventory_2" size="16px" class="detail-icon" />
                <span class="detail-label">Qty:</span>
                <span class="detail-value quantity-highlight">{{ productDetails?.added_product || 0 }} pcs</span>
              </div>
              <div class="detail-divider"></div>
              <div class="detail-item">
                <q-icon name="payments" size="16px" class="detail-icon" />
                <span class="detail-label">Price:</span>
                <span class="detail-value">{{ formatPrice(productDetails?.price) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Repurposing Manual Choice (Only for Pull Out + Confirmed status) -->
        <div v-if="isPullOut && status === 'confirmed'" class="repurposing-action-section q-mb-xl">
          <div class="text-subtitle2 q-mb-sm text-weight-bold color-primary">
            <q-icon name="recycling" class="q-mr-xs" />
            Manual Repurposing Action
          </div>
          <q-btn-toggle
            v-model="repurposeType"
            spread
            no-caps
            rounded
            unelevated
            toggle-color="primary"
            color="grey-2"
            text-color="grey-7"
            class="q-mb-md"
            :options="[
              {label: 'Toasted', value: 'toasted'},
              {label: 'Crumbs', value: 'crumbs'},
              {label: 'Spoilage', value: 'spoiled'}
            ]"
          />

          <!-- Conditional Fields based on choice -->
          <div v-if="repurposeType === 'toasted'" class="q-gutter-sm">
            <q-select
              v-model="outputProduct"
              :options="productOptions"
              label="Output Toasted Product"
              outlined
              dense
            />
            <q-select
              v-model="destinationBranch"
              :options="branchOptions"
              label="Destination Branch"
              outlined
              dense
            />
          </div>

          <div v-if="repurposeType === 'crumbs'" class="q-gutter-sm">
            <q-select
              v-model="outputRawMaterial"
              :options="rawMaterialOptions"
              label="Output Raw Material"
              outlined
              dense
            />
          </div>
          
          <div v-if="repurposeType !== 'spoiled'" class="q-mt-sm">
            <q-input
              v-model.number="repurposeQuantity"
              type="number"
              label="Quantity to Produce"
              outlined
              dense
              suffix="pcs"
            />
          </div>
        </div>

        <!-- Remark Input Section -->
        <div class="remark-section">
          <div class="remark-label">
            <q-icon name="edit_note" size="20px" />
            <span>Transaction Remark</span>
          </div>
          <q-input
            v-model="remark"
            type="textarea"
            outlined
            placeholder="E.g., Received in good condition, Items verified, etc."
            rows="3"
            class="remark-input"
          />
          <div class="tip-text">
            <q-icon name="info" size="12px" />
            A remark is required for audit tracking
          </div>
        </div>
      </q-card-section>

      <q-card-actions class="q-pa-lg">
        <div class="action-buttons full-width">
          <q-btn
            unelevated
            class="action-btn full-width"
            :class="status"
            :loading="loading"
            :disable="!remark.trim()"
            @click="receiveProduct"
          >
            {{ getButtonLabel() }}
          </q-btn>
          <q-btn
            flat
            class="cancel-btn full-width"
            label="Discard Changes"
            v-close-popup
            :disable="loading"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { typographyFormat } from "src/composables/typography/typography-format";
import { useSupervisorStore } from "src/stores/supervisor";
import { useDialogPluginComponent, useQuasar } from "quasar";
import { useBranchProductsStore } from "src/stores/branch-product";
import { api } from "src/boot/axios";
import { useBreadOutStore } from "src/stores/bread-out";

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();

const { formatPrice, capitalizeFirstLetter } = typographyFormat();

const props = defineProps({
  productDetails: Object,
  category: String,
  status: String,
});

const supervisorStore = useSupervisorStore();
const branchProductsStore = useBranchProductsStore();
const breadOutStore = useBreadOutStore();
const $q = useQuasar();

const userData = computed(() => supervisorStore.user);
const userId = computed(() => userData.value?.data?.employee_id || userData.value?.data?.employee?.id || "");
const branchId = computed(() => props.productDetails?.from_branch_id || props.productDetails?.branch_id || "");

const isPullOut = computed(() => props.productDetails?.action?.toLowerCase() === 'pull out');

const dialog = ref(false);
const remark = ref("");
const loading = ref(false);
const isMobile = ref(false);

// Repurposing State
const repurposeType = ref('toasted');
const repurposeQuantity = ref(props.productDetails?.added_product || 0);
const outputProduct = ref(null);
const destinationBranch = ref(null);
const outputRawMaterial = ref(null);

const productOptions = ref([]);
const branchOptions = ref([]);
const rawMaterialOptions = ref([]);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

const fetchOptions = async () => {
  if (!isPullOut.value) return;
  
  try {
    const [productsRes, branchesRes, rmRes] = await Promise.all([
      api.get('/api/products'),
      api.get('/api/branches'),
      api.get('/api/raw-materials')
    ]);
    
    productOptions.value = productsRes.data
      .filter(p => p.category?.toLowerCase() === 'toasted' || p.category?.toLowerCase() === 'bread')
      .map(p => ({ label: p.name, value: p.id }));
      
    branchOptions.value = branchesRes.data.map(b => ({ label: b.name, value: b.id }));
    rawMaterialOptions.value = rmRes.data.map(rm => ({ label: rm.name, value: rm.id }));
    
    // Set default branch
    const currentBranch = branchOptions.value.find(b => b.value === branchId.value);
    if (currentBranch) destinationBranch.value = currentBranch;
  } catch (error) {
    console.error("Error fetching repurpose options", error);
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
  fetchOptions();
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

const getHeaderTitle = () => {
  const statusMap = {
    confirmed: "Confirm Transaction",
    declined: "Decline Transaction",
    pending: "Review Transaction",
  };
  return statusMap[props.status?.toLowerCase()] || `Update Transaction`;
};

const getButtonLabel = () => {
  const statusMap = {
    confirmed: "Confirm & Receive",
    declined: "Decline & Close",
  };
  return statusMap[props.status?.toLowerCase()] || "Proceed";
};

const getCategoryIcon = () => {
  const cat = props.category?.toLowerCase();
  if (cat === 'bread') return 'bakery_dining';
  if (cat === 'selecta') return 'icecream';
  return 'inventory_2';
};

const receiveProduct = async () => {
  if (!remark.value.trim()) return;

  loading.value = true;
  try {
    // Check if it's a Bread Out (Pull Out) transaction
    if (isPullOut.value) {
      if (props.status === 'confirmed') {
        // First, receive the bread
        await api.put(`/api/bread-outs/${props.productDetails.id}/status`, {
          status: 'received',
          remark: remark.value
        });

        // Then, immediately process repurposing based on manual choice
        if (repurposeType.value === 'spoiled') {
          await breadOutStore.processSpoilage({
            bread_out_id: props.productDetails.id,
            quantity: props.productDetails.added_product,
            reason: remark.value
          });
        } else {
          await breadOutStore.processConversion({
            bread_out_id: props.productDetails.id,
            action_type: repurposeType.value,
            output_id: repurposeType.value === 'toasted' ? outputProduct.value?.value : outputRawMaterial.value?.value,
            output_quantity: repurposeQuantity.value,
            destination_branch_id: repurposeType.value === 'toasted' ? destinationBranch.value?.value : null
          });
        }
      } else {
        // Just mark as spoiled if declined
        await api.put(`/api/bread-outs/${props.productDetails.id}/status`, {
          status: 'spoiled',
          remark: remark.value
        });
      }
      
      $q.notify({
        type: "positive",
        message: "Bread Out processed and repurposed successfully!",
        position: "top",
      });
    } else {
      // Regular Branch Product Transaction
      const payload = {
        id: props.productDetails.id,
        employee_id: userId.value,
        branch_id: branchId.value,
        product_id: props.productDetails.product_id,
        quantity: props.productDetails.added_product,
        status: props.status,
        remark: remark.value,
      };

      await branchProductsStore.receivedSendBranchProducts(payload);
      
      $q.notify({
        type: "positive",
        message: "Transaction processed successfully!",
        position: "top",
      });
    }
    
    onDialogOK();
  } catch (error) {
    console.error("Transaction Error:", error);
    $q.notify({
      type: "negative",
      message: error.response?.data?.message || "Failed to process transaction. Please try again.",
      position: "top",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.mobile-remark-dialog {
  width: 500px;
  max-width: 90vh;
  border-radius: 28px;
  overflow: hidden;
  background: linear-gradient(135deg, #f8faff 0%, #ffffff 100%);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);

  &.mobile-fullscreen {
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }
}

/* Mobile Header */
.mobile-dialog-header {
  position: relative;
  padding: 14px 20px 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  overflow: hidden;

  &.header-confirmed {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  }

  &.header-declined {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  }

  &.header-pending {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  }

  .header-content {
    position: relative;
    z-index: 2;
  }

  .header-title {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
  }

  .header-subtitle {
    font-size: 13px;
    opacity: 0.9;
    margin-top: 8px;
  }

  .close-btn {
    color: white;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    border-radius: 30px;
    width: 36px;
    height: 36px;

    &:active {
      transform: scale(0.95);
    }
  }

  .header-wave {
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 24px;
    background: linear-gradient(135deg, #f8faff 0%, #ffffff 100%);
    border-radius: 24px 24px 0 0;
  }
}

/* Product Card */
.product-card-modern {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);

  .product-category-badge {
    width: 48px;
    height: 48px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;

    &.bg-bread {
      background: linear-gradient(135deg, #d97706, #b45309);
    }

    &.bg-selecta {
      background: linear-gradient(135deg, #ec489a, #db2777);
    }

    &.bg-softdrinks {
      background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    }

    &.bg-primary {
      background: linear-gradient(135deg, #667eea, #764ba2);
    }
  }

  .product-info-content {
    flex: 1;
  }

  .product-name-mobile {
    font-size: 18px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 12px;
    line-height: 1.3;
  }

  .product-details-grid {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;

    .detail-item {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #f8fafc;
      padding: 8px 12px;
      border-radius: 40px;
      font-size: 13px;

      .detail-icon {
        color: #94a3b8;
      }

      .detail-label {
        color: #64748b;
      }

      .detail-value {
        font-weight: 600;
        color: #1e293b;

        &.quantity-highlight {
          color: #667eea;
          font-size: 15px;
        }
      }
    }

    .detail-divider {
      width: 1px;
      height: 24px;
      background: #e2e8f0;
    }
  }
}

/* Remark Section */
.remark-section {
  .remark-label {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 12px;
    font-size: 14px;
    color: #475569;
  }

  .remark-input {
    :deep(.q-field__control) {
      border-radius: 16px;
      background: white;
      border: 1px solid #e2e8f0;
      transition: all 0.2s ease;

      &:hover {
        border-color: #cbd5e1;
      }
    }

    :deep(.q-field--focused .q-field__control) {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    :deep(.q-field__native) {
      &::placeholder {
        color: #94a3b8;
      }
    }
  }
  .tip-text {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 8px;
    font-size: 11px;
    color: #94a3b8;
    justify-content: flex-end;
  }
}

/* Action Buttons */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .action-btn {
    height: 52px;
    border-radius: 30px;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 0.3px;
    transition: all 0.2s ease;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    &:active:not(:disabled) {
      transform: scale(0.97);
    }

    &:disabled {
      opacity: 0.5;
      background: #e2e8f0;
      color: #94a3b8;
    }

    &.confirmed {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }

    &.declined {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    }

    &.pending {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    }
  }

  .cancel-btn {
    height: 44px;
    border-radius: 30px;
    color: #64748b;
    font-weight: 500;
    background: #f1f5f9;

    &.active {
      transform: scale(0.97);
    }
  }
}
</style>
