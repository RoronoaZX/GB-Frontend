<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" v-model="dialog" persistent>
    <h1>This is a dialog</h1>
  </q-dialog>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { typographyFormat } from "src/composables/typography/typography-format";
import { useSupervisorStore } from "src/stores/supervisor";
import { useDialogPluginComponent, useQuasar } from "quasar";
import { useBranchProductsStore } from "src/stores/branch-product";

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const { formatDate, formatFullname, formatPrice, capitalizeFirstLetter } =
  typographyFormat();

const props = defineProps({
  productDetails: Object,
  category: String,
  status: String,
});

const supervisorStore = useSupervisorStore();

const userData = supervisorStore.user;

console.log("userDatsssasss", userData);

const userId = computed(
  () =>
    userData.value?.data?.employee_id ||
    userData.value?.data?.employee?.id ||
    ""
);

const branchProductsStore = useBranchProductsStore();

const dialog = ref(false);
const remark = ref("");
const loading = ref(false);
const isMobile = ref(false);

const $q = useQuasar();

// Check if mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

const getHeaderTitle = () => {
  const statusMap = {
    confirmed: "Confirm Transaction",
    decline: "Decline Transaction",
    pending: "Review Traansaction",
  };

  return (
    statusMap[status?.toLowerCase()] ||
    `Add ${capitalizeFirstLetter(status || "N/A")} Remark`
  );
};

const getButtonLabel = () => {
  const statusMap = {
    continue: "Confirm Transaction",
    declined: "Decline Transaction",
    pending: "Submit Review",
  };

  return statusMap[status?.toLowerCase()] || status || "Proceed";
};

const receiveProduct = async (product) => {
  console.log("product", product);
  if (!remark.value.trim()) return;
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
