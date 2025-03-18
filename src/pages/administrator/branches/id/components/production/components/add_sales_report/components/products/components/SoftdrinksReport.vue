<template>
  <q-btn
    no-caps
    label="Softdrinks Report"
    rounded
    color="accent"
    style="width: 150px"
    class="user-button"
    @click="openDialog"
  />
  <q-dialog
    v-model="dialog"
    persistent
    backdrop-filter="blur(4px) saturate(150%)"
  >
    <q-card style="width: 600px; max-width: 80vw">
      <q-card-section class="row items-center bg-backgroud q-px-md q-py-sm">
        <div class="text-h6 text-white">Add Softdrinks</div>

        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
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
            v-model="addSoftdrinksReport.product_name"
            readonly
            dense
            outlined
          />
        </div>
        <div>
          <div>Category</div>
          <q-input
            v-model="addSoftdrinksReport.category"
            readonly
            dense
            outlined
          />
        </div>
        <div>
          <div>Price</div>
          <q-input
            v-model="addSoftdrinksReport.price"
            readonly
            dense
            outlined
          />
        </div>
        <div class="row justify-between q-mt-md q-gutter-md">
          <div>
            <div>Beginnings</div>
            <q-input
              v-model="addSoftdrinksReport.beginnings"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Added Stocks</div>
            <q-input
              v-model="addSoftdrinksReport.added_stocks"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Remaining</div>
            <q-input
              v-model="addSoftdrinksReport.remaining"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Softdrinks Out</div>
            <q-input
              v-model="addSoftdrinksReport.out"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Total Quantity</div>
            <q-input
              v-model="addSoftdrinksReport.total"
              mask="#####"
              outlined
              readonly
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Softdrinks Sold</div>
            <q-input
              v-model="addSoftdrinksReport.sold"
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
import { ref, computed, reactive, watch } from "vue";
import { useBranchProductsStore } from "src/stores/branch-product";
import { useRoute } from "vue-router";
import { useSalesReportsStore } from "src/stores/sales-report";
import { Notify } from "quasar";

const salesReportsStore = useSalesReportsStore();
const route = useRoute();
const branchProductsStore = useBranchProductsStore();
const branchProduct = computed(() => branchProductsStore.branchProducts);
const dialog = ref(false);
const branch_id = route.params.branch_id;
const searchQuery = ref("");

const props = defineProps(["userData"]);
const openDialog = () => {
  dialog.value = true;
};
const category = ref("Softdrinks");

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

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const autoFillProduct = (data) => {
  console.log("data", data);
  addSoftdrinksReport.product_id = data.product.id;
  addSoftdrinksReport.product_name = data.product.name;
  addSoftdrinksReport.category = data.category;
  addSoftdrinksReport.price = data.price;
  searchQuery.value = "";
};

const addSoftdrinksReport = reactive({
  branch_id: branch_id,
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
    parseInt(addSoftdrinksReport.sold || 0) *
    parseFloat(addSoftdrinksReport.price || 0);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(salesValue);
});
// Watch for changes and update total
watch(
  () => [addSoftdrinksReport.added_stocks, addSoftdrinksReport.beginnings],
  ([newProduction, beginnings]) => {
    addSoftdrinksReport.total =
      parseInt(newProduction || 0) + parseInt(beginnings || 0);
  }
);

// Watch for changes to total, remaining, and out to calculate sold
watch(
  () => [
    addSoftdrinksReport.total,
    addSoftdrinksReport.remaining,
    addSoftdrinksReport.out,
  ],
  ([totalQuantity, remaining, breadOut]) => {
    addSoftdrinksReport.sold =
      parseInt(totalQuantity || 0) -
      (parseInt(remaining || 0) + parseInt(breadOut || 0));
  }
);

// Watch for changes to sold or price to calculate sales
watch(
  () => [addSoftdrinksReport.sold, addSoftdrinksReport.price],
  ([breadSold, price]) => {
    addSoftdrinksReport.sales =
      parseInt(breadSold || 0) * parseFloat(price || 0);
  }
);

const handleSubmit = async () => {
  // Prepare the request payload
  const payload = {
    user_id: props.userData,
    branch_id: addSoftdrinksReport.branch_id,
    product_id: addSoftdrinksReport.product_id,
    name: addSoftdrinksReport.product_name,
    total: addSoftdrinksReport.total,
    price: addSoftdrinksReport.price,
    beginnings: addSoftdrinksReport.beginnings,
    remaining: addSoftdrinksReport.remaining,
    added_stocks: addSoftdrinksReport.added_stocks,
    out: addSoftdrinksReport.out,
    sold: addSoftdrinksReport.sold,
    sales: addSoftdrinksReport.sales,
  };
  console.log("Softdrinks", payload);
  salesReportsStore.updateSoftdrinksReport(payload);
  Notify.create({
    message: "Product added successfully",
    color: "positive",
    position: "top",
  });
};
</script>

<style lang="scss" scoped>
.bg-backgroud {
  background: linear-gradient(to right, #9c27b0, #e4c6f3);
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
