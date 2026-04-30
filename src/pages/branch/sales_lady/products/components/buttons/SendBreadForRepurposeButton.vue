<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    v-model="dialog"
    transition-show="slide-up"
    transition-hide="slide-down"
    persistent
  >
    <q-card class="dialog-card">
      <q-card-section class="dialog-header bg-gradient text-white">
        <div class="row items-center justify-between no-wrap">
          <div class="text-h5 text-weight-bold">
            Send Bread For Repurposing
          </div>
          <q-btn icon="close" flat dense round v-close-popup class="close-btn" />
        </div>
        <div class="text-subtitle1 q-mt-xs opacity-80">
          Send pulled-out bread to the Supervisor (Toasted/Powder/Spoilage)
        </div>
      </q-card-section>

      <div class="scrollable-content">
        <div class="products-section">
          <q-card-section>
            <div class="text-subtitle2 text-grey-8 q-mb-sm">
              Add Bread to Send
            </div>

            <div class="row q-col-gutter-md items-end">
              <div class="col-7">
                <div class="q-ml-xl">Bread Product</div>
                <q-select
                  v-model="selectedProduct"
                  :options="filteredProductOptions"
                  @filter="filterProducts"
                  outlined
                  dense
                  behavior="menu"
                  use-input
                  hide-dropdown-icon
                  clearable
                  color="primary"
                >
                  <template v-slot:prepend>
                    <q-icon name="bakery_dining" />
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        <q-item-label>No products found</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:option="{ itemProps, opt }">
                    <q-item v-bind="itemProps">
                      <q-item-section avatar>
                        <q-icon name="bakery_dining" color="brown" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ opt.label }}</q-item-label>
                        <q-item-label caption>
                          • Available: {{ opt.total_quantity }} pcs
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>

              <div class="col-3">
                <q-input
                  v-model.number="quantity"
                  type="number"
                  outlined
                  dense
                  placeholder="Quantity"
                  min="1"
                  color="primary"
                />
              </div>

              <div class="col-2">
                <q-btn
                  color="primary"
                  icon="add"
                  class="full-height"
                  @click="addProductToList"
                  :disabled="!selectedProduct || !quantity || quantity <= 0"
                />
              </div>
            </div>

            <div v-if="selectedProduct" class="q-mt-sm">
              <q-chip size="sm" color="blue-1" text-color="blue-8" icon="info">
                Available : {{ selectedProduct.total_quantity }} pcs
              </q-chip>
            </div>
          </q-card-section>

          <q-card-section class="products-list-card">
            <div class="text-subtitle2 text-grey-8 q-mb-sm">
              Products to Send
              <q-badge color="primary" class="q-ml-sm">
                {{ sendingProductsList.length }}
              </q-badge>
            </div>

            <q-card flat bordered class="products-list-card">
              <q-list separator>
                <q-item class="bg-grey-2 text-grey-8">
                  <q-item-section class="col-8">
                    <div class="text-weight-medium">Product</div>
                  </q-item-section>
                  <q-item-section class="col-2">
                    <div class="text-weight-medium">Quantity</div>
                  </q-item-section>
                  <q-item-section side>
                    <div class="text-weight-medium">Actions</div>
                  </q-item-section>
                </q-item>

                <q-item
                  v-for="(item, index) in sendingProductsList"
                  :key="item.product_id.value"
                >
                  <q-item-section class="col-8">
                    <q-item-label class="text-caption">
                      {{ item.label }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section class="col-2">
                    <q-item-label class="text-caption q-ml-md">
                      {{ item.quantity }} pcs
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-btn
                      dense
                      flat
                      round
                      icon="backspace"
                      color="grey-10"
                      @click="removeProductFromList(index)"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </q-card-section>
        </div>
      </div>

      <div class="dialog-footer q-pa-sm bg-gradient" align="right">
        <div class="q-pa-xm">
          <q-btn
            color="red-6"
            icon="send"
            label="Send to Supervisor"
            @click="sendProducts"
            :loading="loading"
            :disabled="sendingProductsList.length <= 0"
          />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent, useQuasar } from "quasar";
import { computed, ref, watch } from "vue";
import { useSalesReportsStore } from "src/stores/sales-report";
import { useBreadOutStore } from "src/stores/bread-out";

const { dialogRef, onDialogHide } = useDialogPluginComponent();
const $q = useQuasar();

const salesReportsStore = useSalesReportsStore();
const breadOutStore = useBreadOutStore();

const branchProducts = computed(() => salesReportsStore.branchProducts);
const userData = computed(() => salesReportsStore.user);
const branchId = userData.value?.device?.reference_id || userData.value.device?.reference?.id || "";

const dialog = ref(false);
const loading = ref(false);

const selectedProduct = ref(null);
const quantity = ref("");

const sendingProductsList = ref([]);
const filteredProductOptions = ref([]);
const allProductOptions = ref([]);

const breadProducts = computed(() =>
  branchProducts.value.filter((p) => p.category === "Bread")
);

const mapToOptions = (products) => {
  const map = new Map();
  products.forEach((item) => {
    if (!map.has(item.product.id)) {
      map.set(item.product.id, {
        label: item.product.name,
        value: item.product.id,
        price: item.price,
        total_quantity: item.total_quantity,
      });
    }
  });
  return [...map.values()].sort((a, b) =>
    a.label.localeCompare(b.label, undefined, { sensitivity: "base" })
  );
};

const productOptions = computed(() => mapToOptions(breadProducts.value));

watch(
  productOptions,
  (newOptions) => {
    allProductOptions.value = newOptions;
    filteredProductOptions.value = newOptions;
  },
  { immediate: true }
);

const filterProducts = (val, update) => {
  update(() => {
    if (val === "") {
      filteredProductOptions.value = allProductOptions.value;
    } else {
      const needle = val.toLowerCase();
      filteredProductOptions.value = allProductOptions.value.filter(
        (v) => v.label.toLowerCase().indexOf(needle) > -1
      );
    }
  });
};

const addProductToList = () => {
  const exists = sendingProductsList.value.find(
    (p) => p.product_id.value === selectedProduct.value.value
  );

  if (exists) {
    $q.notify({
      type: "warning",
      message: `${exists.label} is already in the list`,
      icon: "warning",
    });
    return;
  }

  const product = selectedProduct.value;
  const availableQty = product.total_quantity || 0;
  const qtyToAdd = parseInt(quantity.value);

  if (qtyToAdd > availableQty) {
    $q.notify({
      type: "negative",
      message: `Only ${availableQty} pcs available`,
      icon: "error",
    });
    return;
  }

  sendingProductsList.value.push({
    product_id: product,
    label: product.label,
    quantity: qtyToAdd,
  });

  selectedProduct.value = null;
  quantity.value = "";
};

const removeProductFromList = (index) => {
  sendingProductsList.value.splice(index, 1);
};

const sendProducts = async () => {
  if (sendingProductsList.value.length === 0) return;

  loading.value = true;
  let hasError = false;

  try {
    for (const item of sendingProductsList.value) {
      const payload = {
        branch_id: branchId,
        product_id: item.product_id.value,
        quantity: item.quantity,
      };

      const res = await breadOutStore.sendForRepurposing(payload);
      if (!res.success) {
        hasError = true;
        break; // Stop if one fails to avoid partial commits if needed
      }
    }

    if (!hasError) {
      // Cleanup on success
      sendingProductsList.value = [];
      $q.dialog({
        title: "Success",
        message: "Bread successfully sent to Supervisor for repurposing.",
        color: "positive"
      });
      // Refresh branch products to reflect deducted stock
      salesReportsStore.fetchBranchProducts(branchId);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.dialog-card {
  width: 700px;
  max-width: 95vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  background-color: #fcfcfc;
}

.scrollable-content {
  overflow-y: auto;
  flex-grow: 1;
}

.bg-gradient {
  background: linear-gradient(135deg, #d35400, #e67e22); // Orange gradient to distinguish it
}
</style>
