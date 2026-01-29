<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    v-model="dialog"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card style="width: 450px">
      <q-card-section class="bg-gradient text-white">
        <div class="row justify-between items-center">
          <div class="text-h6">
            Send {{ props.category }} Products To Branch
          </div>
          <q-btn icon="close" flat dense round v-close-popup />
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="searchQuery"
          @update:model-value="search"
          @focus="handleFocus"
          outlined
          rounded
          dense
          debounce="500"
          placeholder="Enter branch"
          :loading="searchLoading"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>

          <div
            v-if="showBranchCard && isDropDownBranchVisible"
            class="custom-list z-top"
          >
            <q-card>
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
        </q-input>
      </q-card-section>

      <q-card-section class="q-mt-xl q-gutter-y-sm">
        <div class="row justify-between">
          <div>
            <div align="center">{{ props.category }} Product</div>
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
            >
              <!-- option-label="label"
              option-value="value"
              emit-value
              map-options -->
              <template v-slot:no-options>
                <q-item>
                  <q-item-section class="text-grey">
                    No Results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>

          <div>
            <div align="center">Quantity</div>
            <q-input
              v-model="sendingProductsToBranchData.quantity"
              type="number"
              outlined
              dense
              style="width: 180px; max-width: 600px; min-width: 80px"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-gutter-sm">
        <div align="right">
          <q-btn
            padding="sm md"
            icon="add"
            outline
            dense
            @click="addProductToList"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <div>
          <q-list separator class="box">
            <q-item>
              <q-item-section>
                <q-item-label class="text-overline">Product Name</q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-overline">Quantity</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label class="text-overline"> Action </q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              v-for="(item, index) in sendingProductsList"
              :key="item.product_id"
            >
              <q-item-section>
                <q-item-label class="text-caption">
                  {{ capitalizeFirstLetter(item.label) }}
                </q-item-label>
              </q-item-section>

              <q-item-section>
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
        </div>
      </q-card-section>

      <q-card-section>
        <q-btn
          color="red-6"
          icon="send"
          @click="sendProducts"
          :loading="loading"
        />
      </q-card-section>
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

console.log("Category Props", props.category);

const { capitalizeFirstLetter } = typographyFormat();

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const salesReportsStore = useSalesReportsStore();
const branchProducts = computed(() => salesReportsStore.branchProducts);

console.log("branchProducsssts", branchProducts.value);

const branchStore = useBranchesStore();
const branches = computed(() => branchStore.branch);

const branchProductsStore = useBranchProductsStore();

const userData = salesReportsStore.user;
console.log("user data", userData);

const branchId =
  userData?.device?.reference_id || userData.device?.reference?.id || "";
console.log("branchId", branchId);

const employee_id = userData?.employee?.employee_id || "";

const $q = useQuasar();

const dialog = ref(false);
const addProductToListLoading = ref(false);
const loading = ref(false);

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
  branchProducts.value.filter((p) => p.category === "Other")
);

const mapToOptions = (products) => {
  const map = new Map();

  products.forEach((item) => {
    if (!map.has(item.product.id)) {
      map.set(item.product.id, {
        label: capitalizeFirstLetter(item.product.name),
        value: item.product.id,
        price: item.price,
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
  branch_id: "",
  quantity: "",
});

const addProductToList = () => {
  console.log("Selected Product:", selectedProduct.value);
  console.log("Branch ID:", sendingProductsToBranchData.branch_id);
  console.log("Quantity:", sendingProductsToBranchData.quantity);

  addProductToListLoading.value = true;

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
      message: "Product already added to the list",
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

  addProductToListLoading.value = false;
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

<style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(135deg, #5c4033, #a9746e);
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
</style>
