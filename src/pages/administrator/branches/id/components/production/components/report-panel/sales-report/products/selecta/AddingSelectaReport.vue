<template>
  <div>
    <q-btn
      outline
      class="text-dark q-pa-sm"
      push
      dense
      elevated
      icon="add_circle"
      label="Add Selecta"
      @click="openDialog"
    />
  </div>
  <q-dialog
    v-model="dialog"
    persistent
    position="right"
    backdrop-filter="blur(4px) saturate(150%)"
  >
    <q-card style="width: 600px; max-width: 80vw">
      <q-card-section class="row items-center bg-backgroud q-px-md q-py-sm">
        <div class="text-h6 text-white">Add Selecta</div>
        <q-space />
        <q-btn icon="arrow_forward_ios" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle1 text-weight-medium">
          Cashier: {{ formatFullname(user.employee) }}
        </div>
      </q-card-section>
      <q-card-section class="q-ma-md q-gutter-y-sm">
        <div class="q-mb-lg">
          <q-input
            v-model="searchQuery"
            @update:model-value="search"
            debounce="1000"
            outlined
            flat
            placeholder="Search product"
            dense
          >
            <template v-slot:append>
              <div>
                <q-icon name="search" />
              </div>
            </template>
            <div v-if="searchQuery" class="custom-list z-top">
              <q-card>
                <q-list separator>
                  <q-item v-if="!branchProduct?.length">
                    No record found.
                  </q-item>
                  <template v-else>
                    <q-item
                      @click="autoFillProduct(products)"
                      v-for="products in branchProduct"
                      :key="products.id"
                      clickable
                    >
                      <q-item-section>
                        <q-item-label>{{
                          capitalizeFirstLetter(products.product.name)
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-card>
            </div>
          </q-input>
        </div>
        <div>
          <div>Product Name</div>
          <q-input
            v-model="addSelectaReport.product_name"
            readonly
            dense
            outlined
          />
        </div>
        <div class="row justify-between q-mt-md q-gutter-md">
          <div>
            <div>Category</div>
            <q-input
              v-model="addSelectaReport.category"
              readonly
              dense
              outlined
            />
          </div>
          <div>
            <div>Price</div>
            <q-input v-model="addSelectaReport.price" readonly dense outlined />
          </div>
        </div>
        <div class="row justify-between q-mt-md q-gutter-md">
          <div>
            <div>Beginnings</div>
            <q-input
              v-model="addSelectaReport.beginnings"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Added Stocks</div>
            <q-input
              v-model="addSelectaReport.added_stocks"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Remaining</div>
            <q-input
              v-model="addSelectaReport.remaining"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Selecta Out</div>
            <q-input
              v-model="addSelectaReport.out"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Total Quantity</div>
            <q-input
              v-model="addSelectaReport.total"
              mask="#####"
              outlined
              readonly
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Selecta Sold</div>
            <q-input
              v-model="addSelectaReport.sold"
              mask="#####"
              readonly
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Sales</div>
            <q-input
              v-model="formattedSales"
              outlined
              readonly
              dense
              style="width: 150px"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div align="right">
          <q-btn
            color="red-6"
            label="Submit"
            class="q-pa-sm"
            size="md"
            @click="handleSubmit"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useBranchProductsStore } from "src/stores/branch-product";
import { useProductionStore } from "src/stores/production";
import { useProductsStore } from "src/stores/product";
import { ref, reactive, computed, watch } from "vue";
import { useRoute } from "vue-router";

import { typographyFormat } from "src/composables/typography/typography-format";
import { Notify } from "quasar";

const { capitalizeFirstLetter, formatFullname, formatPrice } =
  typographyFormat();

const props = defineProps({
  sales_Reports: { type: Array, default: () => [] },
  sales_report_id: [String, Number],
  user: Object,
  reportLabel: String,
  reportDate: String,
});

console.log("propsss..", props);

const emit = defineEmits(["selecta-added"]);

console.log("props.sales_Reports", props.sales_Reports);
console.log("props.user", props.user);

const route = useRoute();
const branch_id = route.params.branch_id; // Assuming branch_id is passed as a route parameter
const user_id = props.user.id;

const productionStore = useProductionStore();
const branchProductsStore = useBranchProductsStore();

const dialog = ref(false);
const searchQuery = ref("");
const branchProduct = computed(() => branchProductsStore.branchProducts);
console.log("branchProduct", branchProduct);

const sales_report_id = props.sales_report_id;

const addSelectaReport = reactive({
  sales_report_id: sales_report_id,
  branch_id: branch_id,
  user_id: user_id,
  name: "",
  product_id: "",
  product_name: "",
  price: 0,
  beginnings: 0,
  remaining: 0,
  added_stocks: 0,
  out: 0,
  sold: 0,
  total: 0,
  sales: 0,
});

// Computed property to format sales as currency
const formattedSales = computed(() => {
  const salesValue =
    parseInt(addSelectaReport.sold || 0) *
    parseFloat(addSelectaReport.price || 0);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(salesValue);
});

// Watch for changes and update total
watch(
  () => [addSelectaReport.added_stocks, addSelectaReport.beginnings],
  ([newProduction, beginnings]) => {
    addSelectaReport.total =
      parseInt(newProduction || 0) + parseInt(beginnings || 0);
  }
);

// Watch for changes to total, remaining, and out to calculate sold
watch(
  () => [
    addSelectaReport.total,
    addSelectaReport.remaining,
    addSelectaReport.out,
  ],
  ([totalQuantity, remaining, breadOut]) => {
    addSelectaReport.sold =
      parseInt(totalQuantity || 0) -
      (parseInt(remaining || 0) + parseInt(breadOut || 0));
  }
);

// Watch for changes to sold or price to calculate sales
watch(
  () => [addSelectaReport.sold, addSelectaReport.price],
  ([breadSold, price]) => {
    addSelectaReport.sales = parseInt(breadSold || 0) * parseFloat(price || 0);
  }
);

const openDialog = () => {
  dialog.value = true;
};

const category = ref("Selecta"); // Add a ref for the category
const search = async () => {
  console.log("branch_id.value:", branch_id);
  console.log("searchQuery.value:", searchQuery.value);
  console.log("category.value:", category.value);
  if (searchQuery.value || category.value) {
    await branchProductsStore.searchBranchProducts({
      query: searchQuery.value,
      branches_id: branch_id,
      category: category.value,
    });
  }
};

const autoFillProduct = (data) => {
  console.log("data", data);
  addSelectaReport.product_id = data.product.id;
  addSelectaReport.product_name = capitalizeFirstLetter(data.product.name);
  addSelectaReport.category = data.category;
  addSelectaReport.price = data.price;
  searchQuery.value = "";
};

const handleSubmit = async () => {
  if (!addSelectaReport.product_id) {
    Notify.create({
      message: "Please select a product",
      color: "negative",
    });
    return;
  }

  const payload = { ...addSelectaReport };

  try {
    // Call store
    const response = await productionStore.addProduction(
      "selecta",
      payload,
      props.reportDate,
      props.reportLabel.toUpperCase()
    );

    const newRow = response.data || response;

    // Emit back to Selecta Report
    emit("selecta-added", {
      success: true,
      newRow: newRow,
    });

    dialog.value = false;

    // Reset the form
    Object.assign(addSelectaReport, {
      user_id: 0,
      branch_id: 0,
      sales_report_id: 0,
      product_id: 0,
      product_name: "",
      price: 0,
      beginnings: 0,
      remaining: 0,
      added_stocks: 0,
      out: 0,
      sold: 0,
      total: 0,
      sales: 0,
    });
  } catch (error) {
    console.error("Add selecta failed:", error);
  }
};
</script>

<style lang="scss" scoped>
.bg-backgroud {
  background: linear-gradient(to right, #f44336, #ffb5bc);
  // background: linear-gradient(to right, #d32f2f, #ffcdd2);
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
</style>
