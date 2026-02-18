<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" v-model="dialog" persistent>
    <q-card class="compact-remark-dialog">
      <q-card-section class="q-pa-lg border-bottom">
        <div class="row items-center justify-between">
          <div class="text-h6 text-weight-medium text-dark">
            <q-icon
              name="sticky_note_2"
              size="20px"
              class="q-mr-sm text-primary"
            />
            Add {{ capitalizeFirstLetter(status || "N/A") }} Remark
          </div>
          <q-btn icon="close" flat round dense v-close-popup />
        </div>
      </q-card-section>

      <q-card-section>
        <div class="product-badge-label">
          <div class="row items-center justify-between">
            <div class="col">
              <div class="row items-center q-mb-xs">
                <div>
                  <q-icon :name="getCategoryIcon(category)" size="16px" />
                </div>
                <div class="product-name-compact">
                  {{
                    capitalizeFirstLetter(
                      productDetails?.product?.name || "N/A"
                    )
                  }}
                </div>
              </div>
            </div>

            <div class="col-auto">
              <div class="row items-center">
                <div class="price-compact">
                  {{ formatPrice(productDetails?.price) || "N/A" }}
                </div>

                <div class="divider"></div>

                <div class="quantity-compact">
                  <q-icon name="layers" size="14px" class="q-mr-xs" />
                  <span class="quantity-number q-ml-md">
                    {{ `${productDetails?.added_product || 0} pcs` }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pa-lg">
        <q-input
          v-model="remark"
          outlined
          type="textarea"
          placeholder="Type your remark here..."
          autogrow
          :maxlength="1000"
          counter
          class="q-mb-md"
          :input-style="{ minHeight: '100px', resze: 'none' }"
          @keydown.ctrl.enter="receiveProduct(productDetails)"
        />
      </q-card-section>

      <q-card-actions class="q-px-lg q-pb-lg">
        <q-btn
          :label="status || 'Proceed'"
          :color="
            status === 'confirmed' && category !== null
              ? getCategoryColor(category)
              : status === 'declined'
              ? 'negative'
              : 'primary'
          "
          class="full-width"
          unelevated
          :disable="!remark.trim()"
          @click="receiveProduct(productDetails)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { typographyFormat } from "src/composables/typography/typography-format";
import { useSalesReportsStore } from "src/stores/sales-report";
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

console.log("propsss", props);

const salesReportsStore = useSalesReportsStore();
const userData = computed(() => salesReportsStore.user);
console.log("user datssa", userData.value);

const userId = computed(
  () =>
    userData.value?.data?.employee?.id ||
    userData.value?.data?.employee_id ||
    ""
);

console.log("useeessrId", userId.value);

const branchProductsStore = useBranchProductsStore();

const dialog = ref(false);
const remark = ref("");
const loading = ref(false);

const $q = useQuasar();

const receiveProduct = async (product) => {
  if (!remark.value.trim()) return;

  console.log("Remark:", remark.value.trim());

  console.log("product", product);

  const data = {
    id: product.id,
    employee_id: userId.value,
    branch_id: product.to_branch_id,
    product_id: product.product_id,
    quantity: product.added_product,
    status: props.status,
    remark: remark.value.trim(),
  };

  console.log("datssa", data);

  try {
    loading.value = true;
    console.log("datssa", data);
    const response = await branchProductsStore.receivedSendBranchProducts(data);

    console.log("Received Branch Products: ", response);

    resetForm();
    dialog.value = false;

    console.log("responsesss", response);

    if (response.status === 200) {
      $q.notify({
        type: "positive",
        message: response.data.message || "Product Confirmed Successfully",
      });
    }
  } catch (error) {
    console.log("error", error);

    $q.notify({
      type: "negative",
      message: error?.response?.data?.message,
    });
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  remark.value = "";
};

const getCategoryIcon = (cat) => {
  const icons = {
    bread: "bakery_dinning",
    selecta: "icecream",
    softdrinks: "local_drink",
    other: "category",
  };
  return icons[cat?.toLowerCase()] || "inventory_2";
};

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
</script>

<style scoped>
.product-badge-label {
  padding: 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  width: 100%;
  max-width: 500px;
  transition: all 0.2s ease;
}

.product-badge-label:hover {
  border-color: #007bff;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
}

.product-name-compact {
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  line-height: 1.2;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-sku {
  font-size: 12px;
  color: #6c757d;
  letter-spacing: 0.3px;
}

.product-category-icon {
  color: #007bff;
  opacity: 0.8;
}

.price-compact {
  font-size: 18px;
  font-weight: 700;
  color: #2d3436;
  white-space: nowrap;
}

.divider {
  width: 1px;
  height: 24px;
  background: #e9ecef;
  margin: 0 12px;
}

.quantity-compact {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #495057;
  white-space: nowrap;
}

.quantity-number {
  font-weight: 600;
  font-size: 16px;
}

.compact-remark-dialog {
  width: 700px;
  max-width: 80vw;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.border-bottom {
  border-bottom: 1px solid #f0f0f0;
}

/* Style the textarea */
:deep(.q-field--outlined .q-field__control) {
  border-radius: 8px;
}

:deep(.q-field--focused .q-field__control) {
  border-color: var(--q-primary);
}
</style>
