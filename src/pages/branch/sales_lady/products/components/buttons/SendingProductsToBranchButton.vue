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
      <q-card-section class="dialog-header" :class="headerClass">
        <div class="row items-center justify-between no-wrap">
          <div class="text-h5 text-weight-bold">
            Send / Add {{ category }} Products To Branch
          </div>
          <q-btn
            icon="close"
            flat
            dense
            round
            v-close-popup
            class="close-btn"
          />
        </div>
        <div class="text-subtitle1 q-mt-xs opacity-80">
          Transfer products to branch locations / Add new products
        </div>
      </q-card-section>

      <div class="scrollable-content">
        <q-card-section class="action-section q-pb-none">
          <div class="text-subtitle2 text-grey-8 q-mb-md">
            Select Transfer Method
          </div>
          <div class="action-cards row q-gutter-md">
            <q-card
              flat
              bordered
              :class="[
                'action-card cursor-pointer',
                action === 'add' ? 'action-card-active' : '',
              ]"
              @click="action = 'add'"
            >
              <q-card-section class="text-center">
                <q-icon
                  name="add_circle"
                  size="lg"
                  :color="action === 'add' ? 'primary' : 'grey-6'"
                  class="q-mb-sm"
                />
                <div
                  class="text-subtitle2"
                  :class="
                    action === 'add'
                      ? 'text-primary text-weight-medium'
                      : 'text-weight-medium'
                  "
                >
                  Add Products
                </div>
                <div class="text-caption text-grey-7 q-mt-xs">
                  Add product to this branch
                </div>
              </q-card-section>
            </q-card>

            <q-card
              flat
              bordered
              :class="[
                'action-card cursor-pointer',
                action === 'send' ? 'action-card-active' : '',
              ]"
              @click="action = 'send'"
            >
              <q-card-section class="text-center">
                <q-icon
                  name="location_on"
                  size="lg"
                  :color="action === 'send' ? 'primary' : 'grey-6'"
                  class="q-mb-sm"
                />
                <div
                  class="text-subtitle2"
                  :class="
                    action === 'send'
                      ? 'text-primary text-weight-medium'
                      : 'text-weight-medium'
                  "
                >
                  Select Branch
                </div>
                <div class="text-caption text-grey-7 q-mt-xs">
                  Send products to existing branch
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>

        <transition name="slide-fade">
          <q-card-section
            v-if="action === 'send'"
            class="branch-section q-pt-md"
          >
            <div class="text-subtitle2 text-grey-8 q-mb-sm">
              Select Destination Branch
            </div>
            <div class="relative-position">
              <q-input
                v-model="searchQuery"
                @update:model-value="search"
                @focus="handleFocus"
                outlined
                rounded
                dense
                debounce="500"
                placeholder="Search branch by name..."
                :loading="searchLoading"
                color="primary"
                class="branch-search"
              >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
                <template v-slot:append>
                  <q-icon
                    v-if="searchQuery"
                    name="clear"
                    class="cursor-pointer"
                    @click.stop="searchQuery = ''"
                  />
                </template>
              </q-input>

              <transition name="fade">
                <div
                  v-if="showBranchCard && isDropDownBranchVisible"
                  class="branch-dropdown z-top"
                >
                  <q-card class="shadow-3">
                    <q-list separator>
                      <q-item v-if="!branches.length">
                        <q-item-section> No Branch Found </q-item-section>
                      </q-item>

                      <q-item
                        v-for="branch in branches"
                        :key="branch.id"
                        clickable
                        @click="autoFillBranch(branch)"
                      >
                        <q-item-section>
                          {{ capitalizeFirstLetter(branch.name) }}
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card>
                </div>
              </transition>
            </div>

            <div v-if="selectedBranch" class="selected-branch q-mt-md">
              <q-chip
                color="primary"
                text-color="white"
                icon="check_circle"
                class="q-pa-sm"
              >
                Selected: {{ capitalizeFirstLetter(selectedBranch.name) }}
              </q-chip>
            </div>
          </q-card-section>
        </transition>

        <transition name="slide-fade">
          <div
            v-if="action === 'add' || action === 'send'"
            class="products-section"
          >
            <q-card-section>
              <div class="text-subtitle2 text-grey-8 q-mb-sm">
                Add Products to Transfer
              </div>

              <div class="row q-col-gutter-md items-end">
                <div class="col-7">
                  <div class="q-ml-xl">{{ props.category }} Product</div>
                  <q-select
                    v-model="selectedProduct"
                    :options="filteredProductOptions"
                    @filter="filterProducts"
                    debounce="3000"
                    outlined
                    dense
                    behavior="menu"
                    use-input
                    hide-dropdown-icon
                    input-debounce="300"
                    clearable
                    style="width: 215px; max-width: 600px; min-width: 80px"
                    color="primary"
                    :loading="addProductToListLoading"
                    :disable="addProductToListLoading"
                  >
                    <template v-slot:prepend>
                      <q-icon name="inventory" />
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
                        <!-- {{ opt }} -->
                        <q-item-section avatar>
                          <q-icon
                            :name="getCategoryIcon(props.category)"
                            :color="getCategoryIconColor(props.category)"
                          />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>
                            {{ opt.label }}
                          </q-item-label>
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
                    v-model="sendingProductsToBranchData.quantity"
                    type="number"
                    outlined
                    dense
                    placeholder="Quantity"
                    min="1"
                    color="primary"
                  >
                    <!-- <template v-slot:prepend>
                    <q-icon name="numbers" />
                  </template> -->
                  </q-input>
                </div>

                <div class="col-2">
                  <q-btn
                    color="primary"
                    icon="add"
                    class="full-height"
                    @click="addProductToList"
                    :disabled="
                      !selectedProduct ||
                      !sendingProductsToBranchData.quantity ||
                      sendingProductsToBranchData.quantity <= 0
                    "
                    :loading="addProductToListLoading"
                  />
                </div>
              </div>

              <div v-if="selectedProduct" class="q-mt-sm">
                <q-chip
                  size="sm"
                  color="blue-1"
                  text-color="blue-8"
                  icon="info"
                >
                  Available : {{ selectedProduct.total_quantity }} pcs
                </q-chip>
                <q-chip
                  v-if="selectedProduct.price"
                  size="sm"
                  color="green-1"
                  text-color="green-8"
                  class="q-ml-xs"
                >
                  Price: {{ formatPrice(selectedProduct.price) }}
                </q-chip>
              </div>
            </q-card-section>

            <q-card-section class="products-list-card">
              <div class="text-subtitle2 text-grey-8 q-mb-sm">
                Products to Transfer
                <q-badge color="primary" class="q-ml-sm">
                  {{ sendingProductsList.length }}
                </q-badge>
              </div>

              <q-card flat bordered class="products-list-card">
                <q-list separator>
                  <q-item class="bg-grey-2 text-grey-8">
                    <q-item-section class="col-6">
                      <div class="text-weight-medium">Product</div>
                    </q-item-section>

                    <q-item-section class="col-2">
                      <div class="text-weight-medium">Price</div>
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
                    :key="item.product_id"
                  >
                    <q-item-section class="col-6">
                      <q-item-label class="text-caption">
                        {{ capitalizeFirstLetter(item.label) }}
                      </q-item-label>
                    </q-item-section>

                    <q-item-section class="col-2">
                      <q-item-label class="text-caption q-ml-md">
                        {{ formatPrice(item.price || 0) }}
                      </q-item-label>
                    </q-item-section>

                    <q-item-section class="col-2">
                      <q-item-label class="text-caption q-ml-md">
                        {{ item.quantity }} pcs
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label>
                        <q-btn
                          dense
                          flat
                          round
                          icon="backspace"
                          color="grey-10"
                          @click="removeProductFromList(index)"
                        />
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </q-card-section>
          </div>
        </transition>

        <!-- <div
          v-if="action === null"
          class="empty-state-card flex flex-center column q-pa-xl q-mx-md text-center"
        >
          <div class="text-h5 text-grey-8 text-weight-medium">
            Choose Action
          </div>
        </div> -->
      </div>

      <div class="dialog-footer q-pa-sm" :class="headerClass" align="right">
        <div class="q-pa-xm">
          <q-btn
            color="red-6"
            icon="send"
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
import { useBranchesStore } from "src/stores/branch";
import { computed, reactive, ref, watch } from "vue";

import { typographyFormat } from "src/composables/typography/typography-format";
import { useSalesReportsStore } from "src/stores/sales-report";
import { useBranchProductsStore } from "src/stores/branch-product";

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
});

const headerClass = computed(() => {
  const map = {
    selecta: "bg-selecta",
    bread: "bg-bread",
    softdrinks: "bg-softdrinks",
    other: "bg-other",
  };

  return map[props.category?.toLowerCase()] || "bg-gradient";
});

const getCategoryIcon = (category) => {
  if (!category) return "inventory_2";

  switch (category.toLowerCase()) {
    case "bread":
      return "bakery_dining"; // bread icon
    case "selecta":
      return "icecream"; // ice cream icon
    case "softdrinks":
      return "local_drink"; // soft drinks icon
    case "other":
      return "category"; // other icon
    default:
      return "inventory_2"; // fallback
  }
};

const getCategoryIconColor = (category) => {
  if (!category) return "grey-6";

  switch (category.toLowerCase()) {
    case "bread":
      return "brown"; // bread icon
    case "selecta":
      return "red-7"; // ice cream icon
    case "softdrinks":
      return "purple-10"; // soft drinks icon
    case "other":
      return "blue-grey-9"; // other icon
    default:
      return "grey-6"; // fallback
  }
};

console.log("Category Props", props.category);

const { capitalizeFirstLetter, formatPrice } = typographyFormat();

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const salesReportsStore = useSalesReportsStore();
const branchProducts = computed(() => salesReportsStore.branchProducts);

console.log("branchProducsssts", branchProducts.value);

const branchStore = useBranchesStore();
const branches = computed(() => branchStore.branch);

const branchProductsStore = useBranchProductsStore();

const userData = computed(() => salesReportsStore.user);
console.log("user data", userData.value);

const branchId =
  userData.value?.device?.reference_id ||
  userData.value.device?.reference?.id ||
  "";
console.log("branchId", branchId);

const employee_id = userData.value?.employee?.employee_id || "";

const $q = useQuasar();

const dialog = ref(false);
const addProductToListLoading = ref(false);
const loading = ref(false);

const action = ref(null);

const searchQuery = ref("");
const searchLoading = ref(false);
const showBranchCard = ref(false);
const branchSelected = ref(false);
const selectedProduct = ref(null);

// Add these refs for product filtering
const productFilter = ref("");
const filteredProductOptions = ref([]);
const allProductOptions = ref([]);

const search = async () => {
  if (searchQuery.value.trim()) {
    searchLoading.value = true;
    await branchStore.search(searchQuery.value);
    searchLoading.value = false;
    showBranchCard.value = true;
  } else {
    branchStore.branch = []; // clear branch list if input is empty
    showBranchCard.value = false;
  }
};

const handleFocus = () => {
  if (Array.isArray(branches.value) && branches.value.length > 0) {
    showBranchCard.value = true;
  }
};

const isDropDownBranchVisible = computed(() => {
  return !!searchQuery.value;
});

const autoFillBranch = (branch) => {
  console.log("branchssssss", branch);

  searchQuery.value = capitalizeFirstLetter(branch.name);
  sendingProductsToBranchData.branch_id = branch.id;
  branchSelected.value = true;
  showBranchCard.value = false;
};

const breadProducts = computed(() =>
  branchProducts.value.filter((p) => p.category === "Bread")
);

const selectaProducts = computed(() =>
  branchProducts.value.filter((p) => p.category === "Selecta")
);

const softdrinkProducts = computed(() =>
  branchProducts.value.filter((p) => p.category === "Softdrinks")
);

const otherProducts = computed(() =>
  branchProducts.value.filter((p) => p.category === "Others")
);

const mapToOptions = (products) => {
  console.log("productsssssss", products);
  const map = new Map();

  products.forEach((item) => {
    if (!map.has(item.product.id)) {
      map.set(item.product.id, {
        label: capitalizeFirstLetter(item.product.name),
        value: item.product.id,
        price: item.price,
        total_quantity: item.total_quantity,
      });
    }
  });

  // Convert Map to array and sort alphabetically by label
  const sortedOptions = [...map.values()].sort((a, b) => {
    // Case-insentive alphabetical sort
    return a.label.localeCompare(b.label, undefined, { sensitivity: "base" });
  });

  return sortedOptions;
};

const productOptions = computed(() => {
  switch (props.category) {
    case "Bread":
      return mapToOptions(breadProducts.value);
    case "Selecta":
      return mapToOptions(selectaProducts.value);
    case "Softdrinks":
      return mapToOptions(softdrinkProducts.value);
    case "Other":
      return mapToOptions(otherProducts.value);
    default:
      return [];
  }
});

// Watch for changes in productOtions and update all Product options
watch(
  productOptions,
  (newOptions) => {
    allProductOptions.value = newOptions;
    // Initialize filtered otions with all options
    filteredProductOptions.value = newOptions;
  },
  { immediate: true }
);

// Filter function for q-select
const filterProducts = (val, update, abort) => {
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

const sendingProductsList = ref([]);

const sendingProductsToBranchData = reactive({
  branch_id: branchId,
  quantity: "",
});

const addProductToList = () => {
  console.log("Selected Product:", selectedProduct.value);
  console.log("Branch ID:", sendingProductsToBranchData.branch_id);
  console.log("Quantity:", sendingProductsToBranchData.quantity);

  // addProductToListLoading.value = true;

  if (
    !sendingProductsToBranchData.branch_id ||
    !selectedProduct.value ||
    !sendingProductsToBranchData.quantity ||
    sendingProductsToBranchData.quantity <= 0
  ) {
    $q.notify({
      type: "negative",
      message: "Please select branch, product, and enter a valid quantity",
    });
    return;
  }

  // Check if the product is already in the list
  const exists = sendingProductsList.value.find(
    (p) => p.product_id === selectedProduct.value
  );

  if (exists) {
    $q.notify({
      type: "warning",
      message: `${exists.label} is already in the list`,
      icon: "warning",
    });
    return;
  }

  const productName = selectedProduct.value.label;
  const availableQty = selectedProduct.value.total_quantity || 0;
  const quantity = parseInt(sendingProductsToBranchData.quantity);
  if (quantity > availableQty) {
    $q.notify({
      type: "negative",
      message: `Only ${availableQty} pcs available to ${productName}`,
      icon: "error",
    });
    return;
  }

  const product = selectedProduct.value;

  if (!product) {
    $q.notify({
      type: "negative",
      message: "Product not found",
    });
    return;
  }

  sendingProductsList.value.push({
    product_id: selectedProduct.value,
    label: product.label,
    quantity: parseInt(sendingProductsToBranchData.quantity),
    price: product.price,
  });

  console.log("sendingProductsList.value", sendingProductsList.value);
  // Clear input for next product
  selectedProduct.value = null;
  sendingProductsToBranchData.quantity = "";

  $q.notify({
    type: "positive",
    message: "Product added to list",
  });

  // addProductToListLoading.value = false;
};

const removeProductFromList = (index) => {
  sendingProductsList.value.splice(index, 1);
  $q.notify({
    type: "info",
    message: "Product removed from list",
  });
};

const sendProducts = async () => {
  if (
    !sendingProductsToBranchData.branch_id ||
    sendingProductsList.value.length === 0
  ) {
    $q.notify({
      type: "negative",
      message: "Please select branch and add products to the list",
    });
    return;
  }

  loading.value = true;

  const dataToSend = {
    from_branch_id: branchId,
    to_branch_id: sendingProductsToBranchData.branch_id,
    employee_id: employee_id,
    category: props.category,
    status: "pending",
    remark: "",
    products: sendingProductsList.value.map((item) => ({
      product_id: item.product_id.value,
      quantity: item.quantity,
      price: item.price,
    })),
  };
  console.log("Sending products to branch:", dataToSend);

  try {
    const response = await branchProductsStore.sendProductsToBranch(dataToSend);

    console.log("Responsesss:", response);
    if (!response.success) {
      $q.notify({
        type: "negative",
        message: response.errors || response.message || "Something went wrong",
      });

      // Optional: show validation errors
      if (response.errors) {
        console.error("validation errors", response.errors);
      }

      return;
    }

    // ✅ Success
    $q.notify({
      type: "positive",
      message: response.message || "Products sent successfully",
    });

    // Optional cleanup
    sendingProductsList.value = [];
    sendingProductsToBranchData.branch_id = "";
  } finally {
    loading.value = false;
  }
};
</script>

<!-- <style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(135deg, #5c4033, #a9746e);
}

.bg-bread {
  background: linear-gradient(135deg, #5c4033, #a9746e);
}

.bg-selecta {
  background: linear-gradient(135deg, #ff0844, #ed7b59);
}

.bg-softdrinks {
  background: linear-gradient(135deg, #1b78f1, #1ac7f2);
}

.bg-other {
  background: linear-gradient(135deg, #2c3e50, #4ca1af);
}

.custom-list {
  position: absolute;
  background-color: white;
  width: 100%;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  max-height: 200px;
  overflow-y: auto;
  bottom: 0;
  transform: translateY(100%); /* Move the dropdown below the input */
  z-index: 10; /* Ensure it appears above other content */
}
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}

.dialog-card {
  min-width: 600px;
  max-width: 700px;
  border-radius: 12px;
  overflow: hidden;
}

.dialog-header {
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .close-btn {
    opacity: 0.8;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
      transform: scale(1.1);
    }
  }
}

.action-section {
  padding: 24px;

  .action-cards {
    .action-card {
      flex: 1;
      min-width: 200px;
      border-radius: 8px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      &-active {
        border-color: var(--q-primary);
        background-color: rgba(var(--q-primary-rgb), 0.05);

        .text-subtitle2 {
          color: var(--q-primary);
        }
      }
    }
  }
}

.branch-section {
  position: relative;

  .branch-search {
    .q-field__control {
      border-radius: 8px;
    }
  }

  .branch-dropdown {
    position: absolute;
    width: 100%;
    top: calc(100% + 4px);
    max-height: 300px;
    overflow-y: auto;
    border-radius: 8px;

    .q-item {
      border-radius: 6px;
      margin: 2px 4px;

      &:hover {
        background-color: rgba(var(--q-primary-rgb), 0.1);
      }
    }
  }

  .selected-branch {
    animation: dageIn 0.3s ease;
  }
}

.products-section {
  .products-list-card {
    border-radius: 8px;
    max-height: 300px;
    overflow-y: auto;

    .product-item {
      transition: background-color 0.2s;

      &:hover {
        background-color: rgba(var(--q-primary-rgb), 0.05);
      }
    }

    .quantity-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.8rem;
    }
  }
}

.actions-section {
  border-top: 1px solid #eee;
  background-color: #fafafa;
  border-radius: 0 0 12px 12px;
}

// Animations
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Scrolling styling
.products-list-card::-webkit-scrollbar {
  width: 6px;
}

.products-list-card::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.products-list-card::-webkit-scrollbar-thumb {
  background: #888;
}
</style> -->

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

.scrollable-content {
  overflow-y: auto;
  flex-grow: 1;
}

.dialog-header {
  padding: 24px;
  // Dynamic gradients based on category
  &.bg-selecta {
    background: linear-gradient(135deg, #f8a5c2 0%, #f78fb3 100%);
  }
  &.bg-bread {
    background: linear-gradient(135deg, #a77b66, #bda4a1);
  }
  &.bg-softdrinks {
    background: linear-gradient(135deg, #70a1ff 0%, #1e90ff 100%);
  }
  &.bg-other {
    background: linear-gradient(135deg, #a4b0be 0%, #747d8c 100%);
  }
  &.bg-primary {
    background: linear-gradient(135deg, var(--q-primary) 0%, #2c3e50 100%);
  }
}
.dialog-footer {
  // padding: 24px;
  // Dynamic gradients based on category
  &.bg-selecta {
    background: linear-gradient(135deg, #f8a5c2 0%, #f78fb3 100%);
  }
  &.bg-bread {
    background: linear-gradient(135deg, #a77b66, #bda4a1);
  }
  &.bg-softdrinks {
    background: linear-gradient(135deg, #70a1ff 0%, #1e90ff 100%);
  }
  &.bg-other {
    background: linear-gradient(135deg, #a4b0be 0%, #747d8c 100%);
  }
  &.bg-primary {
    background: linear-gradient(135deg, var(--q-primary) 0%, #2c3e50 100%);
  }
}

.scrollable-content {
  flex: 1; /* takes remaining height */
  overflow-y: auto; /* enables scrolling */
  padding-bottom: 16px; /* optional */
}

// .bg-gradient {
//   background: linear-gradient(135deg, #5c4033, #a9746e);
// }

// .bg-bread {
//   background: linear-gradient(135deg, #5c4033, #a9746e);
// }

// .bg-selecta {
//   background: linear-gradient(135deg, #ff0844, #ed7b59);
// }

// .bg-softdrinks {
//   background: linear-gradient(135deg, #1b78f1, #1ac7f2);
// }

// .bg-other {
//   background: linear-gradient(135deg, #2c3e50, #4ca1af);
// }

.action-section {
  padding: 24px;

  .action-cards {
    .action-card {
      flex: 1;
      min-width: 200px;
      border-radius: 8px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      &-active {
        border-color: var(--q-primary);
        background-color: rgba(var(--q-primary-rgb), 0.05);

        .text-subtitle2 {
          color: var(--q-primary);
        }
      }
    }
  }
}

.branch-section {
  position: relative;

  .branch-search {
    .q-field__control {
      border-radius: 8px;
    }
  }

  .branch-dropdown {
    position: absolute;
    width: 100%;
    top: calc(100% + 4px);
    max-height: 300px;
    overflow-y: auto;
    border-radius: 8px;

    .q-item {
      border-radius: 6px;
      margin: 2px 4px;

      &:hover {
        background-color: rgba(var(--q-primary-rgb), 0.1);
      }
    }
  }

  .selected-branch {
    animation: fadeIn 0.3s ease;
  }
}

.products-section {
  .products-list-card {
    border-radius: 8px;
    max-height: 300px;
    overflow-y: auto;

    .product-item {
      transition: background-color 0.2s;

      &:hover {
        background-color: rgba(var(--q-primary-rgb), 0.05);
      }
    }

    .quantity-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.8rem;
    }
  }
}

.actions-section {
  border-top: 1px solid #eee;
  background-color: #fafafa;
  border-radius: 0 0 12px 12px;
}

// Animations
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Scrollbar styling
.products-list-card::-webkit-scrollbar {
  width: 6px;
}

.products-list-card::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.products-list-card::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.products-list-card::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.empty-state-card {
  border: 2px dashed #e0e0e0;
  border-radius: 20px;
  min-height: 50px;
}

:deep(.q-scrollarea__thumb) {
  width: 6px;
  background: rgba(0, 0, 0, 0.1);
}
</style>
