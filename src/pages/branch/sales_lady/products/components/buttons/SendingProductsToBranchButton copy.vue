<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    v-model="dialog"
    transition-show="scale"
    transition-hide="scale"
    persistent
  >
    <q-card class="dialog-card">
      <!-- Header Section -->
      <q-card-section class="dialog-header" :class="headerClass">
        <div class="row items-center justify-between no-wrap">
          <div class="text-h5 text-weight-bold">
            <q-icon name="send" size="sm" class="q-mr-sm" />
            {{ title }} - {{ capitalizeFirstLetter(category) }}
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
          Transfer products to branch locations
        </div>
      </q-card-section>

      <!-- Action Selection -->
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
                Choose products and quantities
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
                Send to existing branch
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>

      <!-- Branch Selection (Send Action) -->
      <transition name="slide-fade">
        <q-card-section v-if="action === 'send'" class="branch-section q-pt-md">
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

            <!-- Branch Dropdown -->
            <transition name="fade">
              <div
                v-if="isDropDownBranchVisible && branches.length"
                class="branch-dropdown z-top"
              >
                <q-card class="shadow-3">
                  <q-list separator>
                    <q-item
                      v-for="branch in branches"
                      :key="branch.id"
                      clickable
                      @click="autoFillBranch(branch)"
                      class="q-py-sm"
                    >
                      <q-item-section avatar>
                        <q-icon name="store" color="primary" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="text-weight-medium">
                          {{ capitalizeFirstLetter(branch.name) }}
                        </q-item-label>
                        <q-item-label caption class="text-grey-7">
                          Branch ID: {{ branch.id }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card>
              </div>
            </transition>
          </div>

          <!-- Selected Branch Info -->
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

      <!-- Add Products Section -->
      <transition name="slide-fade">
        <div v-if="action === 'add'" class="products-section">
          <!-- Product Selection -->
          <q-card-section>
            <div class="text-subtitle2 text-grey-8 q-mb-sm">
              Add Products to Transfer
            </div>
            <div class="row q-col-gutter-md items-end">
              <div class="col-7">
                <q-select
                  v-model="selectedProduct"
                  :options="filteredProductOptions"
                  @filter="filterProducts"
                  outlined
                  dense
                  behavior="menu"
                  use-input
                  hide-dropdown-icon
                  input-debounce="300"
                  clearable
                  placeholder="Search and select product..."
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
                      <q-item-section avatar>
                        <q-icon name="category" color="grey-6" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ opt.label }}</q-item-label>
                        <q-item-label caption>
                          SKU: {{ opt.sku }} • Available:
                          {{ opt.available_quantity }}
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
                  :disable="!selectedProduct || addProductToListLoading"
                >
                  <template v-slot:prepend>
                    <q-icon name="numbers" />
                  </template>
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

            <!-- Additional Info -->
            <div v-if="selectedProduct" class="q-mt-sm">
              <q-chip size="sm" color="blue-1" text-color="blue-8" icon="info">
                Available: {{ selectedProduct.available_quantity }} units
              </q-chip>
              <q-chip
                v-if="selectedProduct.price"
                size="sm"
                color="green-1"
                text-color="green-8"
                icon="attach_money"
                class="q-ml-xs"
              >
                Price: {{ formatPrice(selectedProduct.price) }}
              </q-chip>
            </div>
          </q-card-section>

          <!-- Products List -->
          <q-card-section class="products-list-section">
            <div class="text-subtitle2 text-grey-8 q-mb-sm">
              Products to Transfer
              <q-badge color="primary" class="q-ml-sm">
                {{ sendingProductsList.length }}
              </q-badge>
            </div>

            <q-card flat bordered class="products-list-card">
              <q-list separator>
                <!-- Header -->
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
                  <q-item-section class="col-2 text-right">
                    <div class="text-weight-medium">Actions</div>
                  </q-item-section>
                </q-item>

                <!-- Empty State -->
                <q-item v-if="!sendingProductsList.length" class="text-center">
                  <q-item-section>
                    <q-icon
                      name="inventory_2"
                      size="xl"
                      color="grey-4"
                      class="q-mb-sm"
                    />
                    <div class="text-grey-6">No products added yet</div>
                    <div class="text-caption text-grey-5">
                      Add products using the form above
                    </div>
                  </q-item-section>
                </q-item>

                <!-- Products -->
                <q-item
                  v-for="(item, index) in sendingProductsList"
                  :key="item.product_id"
                  class="product-item"
                >
                  <q-item-section class="col-6">
                    <q-item-label class="text-weight-medium">
                      {{ capitalizeFirstLetter(item.label) }}
                    </q-item-label>
                    <q-item-label caption class="text-grey-7">
                      SKU: {{ item.sku || "N/A" }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section class="col-2">
                    <div class="text-caption text-grey-8">
                      {{ formatPrice(item.price) }}
                    </div>
                  </q-item-section>

                  <q-item-section class="col-2">
                    <q-badge color="primary" class="quantity-badge">
                      {{ item.quantity }} pcs
                    </q-badge>
                  </q-item-section>

                  <q-item-section class="col-2 text-right">
                    <q-btn
                      icon="delete"
                      flat
                      dense
                      round
                      color="negative"
                      @click="removeProductFromList(index)"
                      size="sm"
                    />
                  </q-item-section>
                </q-item>

                <!-- Summary -->
                <q-item v-if="sendingProductsList.length > 0" class="bg-grey-1">
                  <q-item-section class="col-6">
                    <div class="text-weight-medium">Total</div>
                  </q-item-section>
                  <q-item-section class="col-2">
                    <div class="text-weight-medium text-primary">
                      {{ formatPrice(totalValue) }}
                    </div>
                  </q-item-section>
                  <q-item-section class="col-2">
                    <div class="text-weight-medium text-primary">
                      {{ totalQuantity }} pcs
                    </div>
                  </q-item-section>
                  <q-item-section class="col-2">
                    <!-- Empty for alignment -->
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </q-card-section>

          <!-- Branch Selection for Add Action -->
          <q-card-section class="q-pt-none">
            <div class="text-subtitle2 text-grey-8 q-mb-sm">
              Destination Branch
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
                placeholder="Search destination branch..."
                :loading="searchLoading"
                color="primary"
                class="branch-search"
              >
                <template v-slot:prepend>
                  <q-icon name="store" />
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

              <!-- Branch Dropdown -->
              <transition name="fade">
                <div
                  v-if="isDropDownBranchVisible && branches.length"
                  class="branch-dropdown z-top"
                >
                  <q-card class="shadow-3">
                    <q-list separator>
                      <q-item
                        v-for="branch in branches"
                        :key="branch.id"
                        clickable
                        @click="autoFillBranch(branch)"
                        class="q-py-sm"
                      >
                        <q-item-section avatar>
                          <q-icon name="store" color="primary" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label class="text-weight-medium">
                            {{ capitalizeFirstLetter(branch.name) }}
                          </q-item-label>
                          <q-item-label caption class="text-grey-7">
                            Branch ID: {{ branch.id }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card>
                </div>
              </transition>
            </div>

            <!-- Selected Branch Info -->
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

          <!-- Remarks Section -->
          <q-card-section class="q-pt-none">
            <q-input
              v-model="sendingProductsToBranchData.remark"
              outlined
              dense
              placeholder="Add remarks (optional)"
              color="primary"
              type="textarea"
              rows="2"
            >
              <template v-slot:prepend>
                <q-icon name="notes" />
              </template>
            </q-input>
          </q-card-section>

          <!-- Action Buttons -->
          <q-card-section class="actions-section">
            <div class="row justify-between items-center">
              <div class="text-grey-7">
                <q-icon name="info" size="sm" class="q-mr-xs" />
                <span v-if="sendingProductsList.length > 0">
                  {{ sendingProductsList.length }} items •
                  {{ totalQuantity }} units • {{ formatPrice(totalValue) }}
                </span>
                <span v-else>No items selected</span>
              </div>
              <div class="row q-gutter-sm">
                <q-btn
                  label="Clear All"
                  flat
                  color="grey"
                  @click="clearAllProducts"
                  :disabled="!sendingProductsList.length"
                  icon="clear_all"
                />
                <q-btn
                  color="primary"
                  label="Send Products"
                  @click="sendProducts"
                  :loading="loading"
                  icon="send"
                  padding="sm lg"
                  :disabled="!sendingProductsList.length || !selectedBranch"
                >
                  <template v-slot:loading>
                    <q-spinner-hourglass class="on-left" />
                    Sending...
                  </template>
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </div>
      </transition>
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
  title: {
    type: String,
    default: "Send Products",
  },
});

const headerClass = computed(() => {
  const map = {
    selecta: "bg-selecta",
    bread: "bg-bread",
    softdrinks: "bg-softdrinks",
    other: "bg-other",
  };
  return map[props.category?.toLowerCase()] || "bg-primary";
});

const { capitalizeFirstLetter } = typographyFormat();

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();

const salesReportsStore = useSalesReportsStore();
const branchStore = useBranchesStore();
const branchProductsStore = useBranchProductsStore();

const $q = useQuasar();

// Reactive state
const dialog = ref(false);
const loading = ref(false);
const searchLoading = ref(false);
const addProductToListLoading = ref(false);
const showBranchCard = ref(false);
const selectedBranch = ref(null);

const action = ref("add");
const searchQuery = ref("");
const selectedProduct = ref(null);
const filteredProductOptions = ref([]);
const allProductOptions = ref([]);
const sendingProductsList = ref([]);

// Computed properties
const branchProducts = computed(() => salesReportsStore.branchProducts || []);
const branches = computed(() => branchStore.branch || []);
const userData = computed(() => salesReportsStore.user || {});
const branchId = computed(
  () =>
    userData.value?.device?.reference_id ||
    userData.value?.device?.reference?.id ||
    ""
);
const employee_id = computed(() => userData.value?.employee?.employee_id || "");

// Filter products by category
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

// Map products to options with enhanced data
const mapToOptions = (products) => {
  const map = new Map();

  products.forEach((item) => {
    if (!map.has(item.product.id)) {
      map.set(item.product.id, {
        label: capitalizeFirstLetter(item.product.name),
        value: item.product.id,
        price: item.price,
        sku: item.product.sku || item.product.code || `PRD-${item.product.id}`,
        category: item.category,
        available_quantity: item.quantity || 0,
        original_product: item.product,
      });
    }
  });

  // Convert Map to array and sort alphabetically by label
  const sortedOptions = [...map.values()].sort((a, b) => {
    return a.label.localeCompare(b.label, undefined, { sensitivity: "base" });
  });

  return sortedOptions;
};

const productOptions = computed(() => {
  switch (props.category.toLowerCase()) {
    case "bread":
      return mapToOptions(breadProducts.value);
    case "selecta":
      return mapToOptions(selectaProducts.value);
    case "softdrinks":
      return mapToOptions(softdrinkProducts.value);
    case "other":
    case "others":
      return mapToOptions(otherProducts.value);
    default:
      return [];
  }
});

// Enhanced sending data
const sendingProductsToBranchData = reactive({
  branch_id: "",
  quantity: "",
  remark: "",
});

// Watchers
watch(
  productOptions,
  (newOptions) => {
    allProductOptions.value = newOptions;
    filteredProductOptions.value = newOptions;
  },
  { immediate: true }
);

watch(selectedBranch, (branch) => {
  if (branch) {
    sendingProductsToBranchData.branch_id = branch.id;
  }
});

watch(action, (newAction) => {
  if (newAction === "send") {
    selectedBranch.value = null;
    sendingProductsToBranchData.branch_id = "";
    searchQuery.value = "";
  }
});

// Computed
const isDropDownBranchVisible = computed(() => {
  return !!searchQuery.value && showBranchCard.value;
});

const totalQuantity = computed(() => {
  return sendingProductsList.value.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
});

const totalValue = computed(() => {
  return sendingProductsList.value.reduce(
    (sum, item) => sum + item.quantity * (item.price || 0),
    0
  );
});

// Methods
const search = async () => {
  if (searchQuery.value.trim()) {
    searchLoading.value = true;
    try {
      await branchStore.search(searchQuery.value.trim());
      showBranchCard.value = true;
    } catch (error) {
      console.error("Search error:", error);
      $q.notify({
        type: "negative",
        message: "Failed to search branches",
      });
    } finally {
      searchLoading.value = false;
    }
  } else {
    branchStore.branch = [];
    showBranchCard.value = false;
  }
};

const handleFocus = () => {
  if (Array.isArray(branches.value) && branches.value.length > 0) {
    showBranchCard.value = true;
  }
};

const autoFillBranch = (branch) => {
  selectedBranch.value = branch;
  searchQuery.value = capitalizeFirstLetter(branch.name);
  sendingProductsToBranchData.branch_id = branch.id;
  showBranchCard.value = false;

  $q.notify({
    type: "positive",
    message: `Selected: ${capitalizeFirstLetter(branch.name)}`,
    icon: "check_circle",
    timeout: 1000,
  });
};

const filterProducts = (val, update, abort) => {
  update(() => {
    if (val === "") {
      filteredProductOptions.value = allProductOptions.value;
    } else {
      const needle = val.toLowerCase();
      filteredProductOptions.value = allProductOptions.value.filter((v) =>
        v.label.toLowerCase().includes(needle)
      );
    }
  });
};

const addProductToList = () => {
  if (!validateProductSelection()) return;

  addProductToListLoading.value = true;

  try {
    const product = selectedProduct.value;
    const quantity = parseInt(sendingProductsToBranchData.quantity);

    // Check if product is already in list
    const exists = sendingProductsList.value.find(
      (p) => p.product_id === product.value
    );

    if (exists) {
      $q.notify({
        type: "warning",
        message: `${product.label} is already in the list`,
        icon: "warning",
      });
      return;
    }

    // Check available quantity
    const availableQty = product.available_quantity || 0;
    if (quantity > availableQty) {
      $q.notify({
        type: "negative",
        message: `Only ${availableQty} units available`,
        icon: "error",
      });
      return;
    }

    // Add to list
    sendingProductsList.value.push({
      product_id: product.value,
      label: product.label,
      quantity: quantity,
      price: product.price,
      sku: product.sku,
      available_quantity: availableQty,
    });

    // Clear inputs
    selectedProduct.value = null;
    sendingProductsToBranchData.quantity = "";

    $q.notify({
      type: "positive",
      message: `${product.label} added to transfer list`,
      icon: "check",
      timeout: 1000,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    $q.notify({
      type: "negative",
      message: "Failed to add product",
    });
  } finally {
    addProductToListLoading.value = false;
  }
};

const validateProductSelection = () => {
  if (!selectedProduct.value) {
    $q.notify({
      type: "negative",
      message: "Please select a product",
      icon: "error",
    });
    return false;
  }

  if (
    !sendingProductsToBranchData.quantity ||
    sendingProductsToBranchData.quantity <= 0
  ) {
    $q.notify({
      type: "negative",
      message: "Please enter a valid quantity",
      icon: "error",
    });
    return false;
  }

  return true;
};

const removeProductFromList = (index) => {
  const removedProduct = sendingProductsList.value[index];
  sendingProductsList.value.splice(index, 1);

  $q.notify({
    type: "info",
    message: `${removedProduct.label} removed from list`,
    icon: "delete",
    timeout: 1000,
  });
};

const clearAllProducts = () => {
  if (sendingProductsList.value.length === 0) return;

  $q.dialog({
    title: "Clear All Products",
    message: "Are you sure you want to remove all products from the list?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    sendingProductsList.value = [];
    $q.notify({
      type: "positive",
      message: "All products cleared",
      icon: "check_circle",
    });
  });
};

const validateBeforeSend = () => {
  if (sendingProductsList.value.length === 0) {
    $q.notify({
      type: "negative",
      message: "Please add products to transfer",
      icon: "error",
    });
    return false;
  }

  if (!sendingProductsToBranchData.branch_id) {
    $q.notify({
      type: "negative",
      message: "Please select a destination branch",
      icon: "error",
    });
    return false;
  }

  // Check if all products have valid quantities
  const invalidProducts = sendingProductsList.value.filter(
    (p) => !p.quantity || p.quantity <= 0
  );

  if (invalidProducts.length > 0) {
    $q.notify({
      type: "negative",
      message: "Some products have invalid quantities",
      icon: "error",
    });
    return false;
  }

  return true;
};

const sendProducts = async () => {
  if (!validateBeforeSend()) return;

  loading.value = true;

  try {
    const dataToSend = {
      from_branch_id: branchId.value,
      to_branch_id: sendingProductsToBranchData.branch_id,
      employee_id: employee_id.value,
      category: props.category,
      status: "pending",
      remark:
        sendingProductsToBranchData.remark ||
        `Transfer of ${sendingProductsList.value.length} ${props.category} products`,
      products: sendingProductsList.value.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    console.log("Sending products to branch:", dataToSend);

    const response = await branchProductsStore.sendProductsToBranch(dataToSend);

    if (!response.success) {
      throw new Error(
        response.errors || response.message || "Failed to send products"
      );
    }

    // Success
    $q.notify({
      type: "positive",
      message: response.message || "Products sent successfully!",
      icon: "check_circle",
      timeout: 3000,
    });

    // Reset form
    resetForm();

    // Close dialog after success
    onDialogOK();
  } catch (error) {
    console.error("Error sending products:", error);
    $q.notify({
      type: "negative",
      message: error.message || "Failed to send products",
      icon: "error",
      timeout: 5000,
    });
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  sendingProductsList.value = [];
  selectedProduct.value = null;
  sendingProductsToBranchData.branch_id = "";
  sendingProductsToBranchData.quantity = "";
  sendingProductsToBranchData.remark = "";
  selectedBranch.value = null;
  searchQuery.value = "";
  action.value = "add";
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

// Expose methods if needed
defineExpose({
  show: () => (dialog.value = true),
  hide: () => (dialog.value = false),
  resetForm,
});
</script>

<style lang="scss" scoped>
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

// Responsive adjustments
@media (max-width: 600px) {
  .dialog-card {
    min-width: 95vw;
    margin: 0 10px;
  }

  .action-cards {
    flex-direction: column;

    .action-card {
      min-width: 100%;
      margin-bottom: 12px;
    }
  }

  .col-6,
  .col-7,
  .col-3,
  .col-2 {
    flex: 1 1 100% !important;
    max-width: 100% !important;
    margin-bottom: 12px;
  }
}
</style>
