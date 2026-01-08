<template>
  <div>
    <q-btn
      outline
      class="text-dark q-pa-sm"
      push
      dense
      elevated
      icon="add_circle"
      label="Add Bread"
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
      <q-card-section class="row items-center bg-backgroud">
        <div class="text-h6 text-white">Breadss {{ reportLabel }}</div>
        <q-space />
        <q-btn icon="arrow_forward_ios" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle1 text-weight-medium">
          Cashier: {{ formatFullname(user.employee) }}
        </div>
      </q-card-section>
      <q-card-section class="q-gutter-y-sm">
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
import { useUsersStore } from "src/stores/user";
import BreadReport from "./BreadReport.vue";

import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatFullname } = typographyFormat();

const props = defineProps([
  "sales_Reports",
  "sales_report_id",
  "user",
  "reportLabel",
  "reportDate",
]);
console.log("props.sales_Reports", props.sales_Reports);
console.log("props.user", props.user);
console.log("propssssss", props);

const sales_report_id = props.sales_report_id;
const route = useRoute();

const emit = defineEmits(["bread-added"]);

const userStore = useUsersStore();
const userData = computed(() => userStore.userData);
console.log("producttable user data", userData.value);
const historyLogUserID = userData.value?.data?.id || "0";
console.log("user_id branch product table", historyLogUserID);
const productionStore = useProductionStore();
const productStore = useProductsStore();
const productData = computed(() => productStore.products);
const branchProductsStore = useBranchProductsStore();
const branchProduct = computed(() => branchProductsStore.branchProducts);
console.log("branchProduct", branchProduct);
const branch_id = route.params.branch_id; // Assuming branch_id is passed as a route parameter
const user_id = props.user.id;

const searchUser = ref("");

const searchQuery = ref("");

const isDropdownVisible = computed(() => {
  return searchUser.value && employees.value.length > 0;
});

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

const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const autoFillProduct = (data) => {
  console.log("data", data);
  addbreadProduction.product_id = data.product.id;
  addbreadProduction.product_name = capitalizeFirstLetter(data.product.name);
  addbreadProduction.category = data.category;
  addbreadProduction.price = data.price;
  searchQuery.value = "";
};

const addbreadProduction = reactive({
  sales_report_id: sales_report_id,
  branch_id: branch_id,
  user_id: user_id,
  name: "",
  product_id: "",
  product_name: "",
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
  const originalData = `₱ ${addbreadProduction.price.toString()}`; // Convert to string
  const updatedData = `₱ ${parseInt(addbreadProduction.price).toString()}`; // Convert to string after parsing
  const user_id = historyLogUserID;

  const date = props.reportDate;
  console.log("datesssss", date);
  const label = props.reportLabel;

  try {
    // Validate required fields
    if (
      !addbreadProduction.product_name ||
      !addbreadProduction.price ||
      !addbreadProduction.product_id ||
      !addbreadProduction.branch_id ||
      !addbreadProduction.sales_report_id
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
      user_id: addbreadProduction.user_id,
      branch_id: addbreadProduction.branch_id,
      sales_report_id: addbreadProduction.sales_report_id,
      product_id: addbreadProduction.product_id,
      product_name: addbreadProduction.product_name,
      price: addbreadProduction.price,
      beginnings: addbreadProduction.beginnings,
      remaining: addbreadProduction.remaining,
      new_production: addbreadProduction.new_production,
      bread_out: addbreadProduction.bread_out,
      bread_sold: addbreadProduction.bread_sold,
      total: addbreadProduction.total,
      sales: addbreadProduction.sales,

      //for history log
      report_id: addbreadProduction.sales_report_id,
      name: addbreadProduction.product_name || "undefined",
      original_data: originalData,
      updated_data: updatedData,
      updated_field: "bread",
      designation: addbreadProduction.branch_id,
      designation_type: "branch",
      action: "added",
      type_of_report: `Branch Production bread report`,
      user_id,
    };

    console.log("payload", payload);
    await productionStore.addProduction("bread", payload, date, label);

    // SUCCESS: Notify parent to refresh
    emit("bread-added");

    // Optional: close dialog
    dialog.value = false;

    // Reset form
    Object.assign(addbreadProduction, {
      product_id: "",
      product_name: "",
      price: 0,
      beginnings: 0,
      remaining: 0,
      new_production: 0,
      bread_out: 0,
      bread_sold: 0,
      total: 0,
      sales: 0,
    });

    searchQuery.value = "";
  } catch (error) {
    console.error("Error adding bread production:", error);
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
