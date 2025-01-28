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
      {{ user.name }}
      <q-card-section class="row items-center q-px-md q-py-sm">
        <div class="text-h6 q-pa-md">Add Other Products</div>
        <q-space />
        <q-btn icon="arrow_forward_ios" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section>
        {{ formatFullname(user.employee) }}
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
            v-model="addOtherProductReport.product_name"
            readonly
            dense
            outlined
          />
        </div>
        <div>
          <div>Category</div>
          <q-input
            v-model="addOtherProductReport.category"
            readonly
            dense
            outlined
          />
        </div>
        <div>
          <div>Price</div>
          <q-input
            v-model="addOtherProductReport.price"
            readonly
            dense
            outlined
          />
        </div>
        <div class="row justify-between">
          <div>
            <div>Beginnings</div>
            <q-input
              v-model="addOtherProductReport.beginnings"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Added Stocks</div>
            <q-input
              v-model="addOtherProductReport.added_stocks"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Remaining</div>
            <q-input
              v-model="addOtherProductReport.remaining"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Out</div>
            <q-input
              v-model="addOtherProductReport.out"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Total Quantity</div>
            <q-input
              v-model="addOtherProductReport.total"
              mask="#####"
              outlined
              readonly
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Sold</div>
            <q-input
              v-model="addOtherProductReport.sold"
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

const props = defineProps(["sales_Reports", "sales_report_id", "user"]);
console.log("props.sales_Reports", props.sales_Reports);
console.log("props.user", props.user);
const sales_report_id = props.sales_report_id;
const route = useRoute();

const productionStore = useProductionStore();
const productStore = useProductsStore();
const productData = computed(() => productStore.products);
const branchProductsStore = useBranchProductsStore();
const branchProduct = computed(() => branchProductsStore.branchProducts);
console.log("branchProduct", branchProduct);
const branch_id = route.params.branch_id; // Assuming branch_id is passed as a route parameter
const user_id = props.user.id;

const searchQuery = ref("");

const category = ref("Others"); // Add a ref for the category
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

const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`.trim();
};

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const autoFillProduct = (data) => {
  console.log("data", data);
  addOtherProductReport.product_id = data.product.id;
  addOtherProductReport.product_name = data.product.name;
  addOtherProductReport.category = data.category;
  addOtherProductReport.price = data.price;
  searchQuery.value = "";
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const addOtherProductReport = reactive({
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
  branches_id: route.params.branch_id,
});

// Computed property to format sales as currency
const formattedSales = computed(() => {
  const salesValue =
    parseInt(addOtherProductReport.sold || 0) *
    parseFloat(addOtherProductReport.price || 0);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(salesValue);
});
// Watch for changes and update total
watch(
  () => [addOtherProductReport.added_stocks, addOtherProductReport.beginnings],
  ([newProduction, beginnings]) => {
    addOtherProductReport.total =
      parseInt(newProduction || 0) + parseInt(beginnings || 0);
  }
);

// Watch for changes to total, remaining, and out to calculate sold
watch(
  () => [
    addOtherProductReport.total,
    addOtherProductReport.remaining,
    addOtherProductReport.out,
  ],
  ([totalQuantity, remaining, breadOut]) => {
    addOtherProductReport.sold =
      parseInt(totalQuantity || 0) -
      (parseInt(remaining || 0) + parseInt(breadOut || 0));
  }
);

// Watch for changes to sold or price to calculate sales
watch(
  () => [addOtherProductReport.sold, addOtherProductReport.price],
  ([breadSold, price]) => {
    addOtherProductReport.sales =
      parseInt(breadSold || 0) * parseFloat(price || 0);
  }
);

const handleSubmit = async () => {
  try {
    // Validate required fields
    if (
      !addOtherProductReport.product_name ||
      !addOtherProductReport.price ||
      !addOtherProductReport.product_id ||
      !addOtherProductReport.branch_id ||
      !addOtherProductReport.sales_report_id
    ) {
      $q.notify({
        type: "negative",
        message:
          "Product name, price, product ID, branch ID, and sales report ID are required.",
      });
      return;
    }
    // Prepare the request payload
    const payload = {
      user_id: addOtherProductReport.user_id,
      branch_id: addOtherProductReport.branch_id,
      sales_report_id: addOtherProductReport.sales_report_id,
      product_id: addOtherProductReport.product_id,
      product_name: addOtherProductReport.product_name,
      price: addOtherProductReport.price,
      beginnings: addOtherProductReport.beginnings,
      remaining: addOtherProductReport.remaining,
      added_stocks: addOtherProductReport.added_stocks,
      out: addOtherProductReport.out,
      sold: addOtherProductReport.sold,
      total: addOtherProductReport.total,
      sales: addOtherProductReport.sales,
    };
    console.log("payload", payload);
    await productionStore.addOtherProductProduction(payload);
  } catch (error) {}
};
</script>

<style lang="scss" scoped>
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
