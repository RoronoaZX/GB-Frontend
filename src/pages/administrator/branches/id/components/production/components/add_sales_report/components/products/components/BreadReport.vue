<template>
  <q-btn
    no-caps
    label="Bread Report"
    rounded
    color="brown"
    style="width: 130px"
    class="user-button"
    @click="openDialog"
  />

  <q-dialog
    v-model="dialog"
    persistent
    backdrop-filter="blur(4px) saturate(150%)"
  >
    <q-card style="width: 600px; max-width: 80vw">
      <q-card-section class="row items-center bg-backgroud">
        <div class="text-h6 text-white">Bread</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section>
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
      </q-card-section>
      <!-- {{ userData }} -->
      <q-card-section>
        <div>
          <div>Product Name</div>
          <q-input
            v-model="addbreadProduction.product_name"
            readonly
            dense
            outlined
          />
        </div>
        <div class="row justify-between q-mt-md q-gutter-md">
          <div>
            <div>Category</div>
            <q-input
              v-model="addbreadProduction.category"
              readonly
              dense
              outlined
              style="width: 250px"
            />
          </div>
          <div>
            <div>Price</div>
            <q-input
              v-model="addbreadProduction.price"
              readonly
              dense
              outlined
              style="width: 250px"
            />
          </div>
        </div>
        <div class="row justify-between q-mt-md q-gutter-md">
          <div>
            <div>Beginnings</div>
            <q-input
              v-model="addbreadProduction.beginnings"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>New Production</div>
            <q-input
              v-model="addbreadProduction.new_production"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Remaining</div>
            <q-input
              v-model="addbreadProduction.remaining"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Bread Out</div>
            <q-input
              v-model="addbreadProduction.bread_out"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Total Quantity</div>
            <q-input
              v-model="addbreadProduction.total"
              mask="#####"
              outlined
              readonly
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Bread Sold</div>
            <q-input
              v-model="addbreadProduction.bread_sold"
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
            :loading="loading"
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
import { Loading, Notify } from "quasar";

const salesReportsStore = useSalesReportsStore();
const route = useRoute();
const branchProductsStore = useBranchProductsStore();
const branchProduct = computed(() => branchProductsStore.branchProducts);
const dialog = ref(false);
const branch_id = route.params.branch_id;
const searchQuery = ref("");
const loading = ref(false);
const props = defineProps(["userData"]);
const openDialog = () => {
  dialog.value = true;
};

const category = ref("Bread"); // Add a ref for the category
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
  addbreadProduction.product_id = data.product.id;
  addbreadProduction.product_name = data.product.name;
  addbreadProduction.category = data.category;
  addbreadProduction.price = data.price;
  searchQuery.value = "";
};

const addbreadProduction = reactive({
  branch_id: branch_id,
  name: "",
  product_id: "",
  product_name: "",
  category: "",
  price: 0,
  beginnings: 0,
  remaining: 0,
  new_production: 0,
  bread_out: 0,
  bread_sold: 0,
  total: 0,
  sales: 0,
  branches_id: route.params.branch_id,
});

const clearData = () => {
  addbreadProduction.name = "";
  addbreadProduction.product_id = "";
  addbreadProduction.product_name = "";
  addbreadProduction.category = "";
  addbreadProduction.price = "";
  addbreadProduction.beginnings = "";
  addbreadProduction.remaining = "";
  addbreadProduction.new_production = "";
  addbreadProduction.bread_out = "";
  addbreadProduction.bread_sold = "";
  addbreadProduction.total = "";
  addbreadProduction.sales = "";
};

// Computed property to format sales as currency
const formattedSales = computed(() => {
  const salesValue =
    parseInt(addbreadProduction.bread_sold || 0) *
    parseFloat(addbreadProduction.price || 0);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(salesValue);
});
// Watch for changes and update total
watch(
  () => [addbreadProduction.new_production, addbreadProduction.beginnings],
  ([newProduction, beginnings]) => {
    addbreadProduction.total =
      parseInt(newProduction || 0) + parseInt(beginnings || 0);
  }
);

// Watch for changes to total, remaining, and bread_out to calculate bread_sold
watch(
  () => [
    addbreadProduction.total,
    addbreadProduction.remaining,
    addbreadProduction.bread_out,
  ],
  ([totalQuantity, remaining, breadOut]) => {
    addbreadProduction.bread_sold =
      parseInt(totalQuantity || 0) -
      (parseInt(remaining || 0) + parseInt(breadOut || 0));
  }
);

// Watch for changes to bread_sold or price to calculate sales
watch(
  () => [addbreadProduction.bread_sold, addbreadProduction.price],
  ([breadSold, price]) => {
    addbreadProduction.sales =
      parseInt(breadSold || 0) * parseFloat(price || 0);
  }
);

const handleSubmit = async () => {
  try {
    // // Validate required fields
    // if (
    //   !addbreadProduction.product_name ||
    //   !addbreadProduction.price ||
    //   !addbreadProduction.product_id ||
    //   !addbreadProduction.branch_id ||
    //   !addbreadProduction.sales_report_id
    // ) {
    //   $q.notify({
    //     type: "negative",
    //     message:
    //       "Product name, price, product ID, branch ID, and sales report ID are required.",
    //   });
    //   return;
    // }
    // Prepare the request payload
    loading.value = true;
    const payload = {
      user_id: props.userData,
      branch_id: addbreadProduction.branch_id,
      product_id: addbreadProduction.product_id,
      name: addbreadProduction.product_name,
      total: addbreadProduction.total,
      bread_sold: addbreadProduction.bread_sold,
      bread_out: addbreadProduction.bread_out,
      beginnings: addbreadProduction.beginnings,
      remaining: addbreadProduction.remaining,
      price: addbreadProduction.price,
      sales: addbreadProduction.sales,
      new_production: addbreadProduction.new_production,
      branch_new_production: 0,
    };
    console.log("payload", payload);
    // await productionStore.addBreadProduction(payload);

    salesReportsStore.updateBreadReport(payload);

    Notify.create({
      message: "Product added successfully",
      color: "positive",
      position: "top",
    });
    clearData();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.bg-backgroud {
  background: linear-gradient(to right, #795548, #ffd7c9);
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
