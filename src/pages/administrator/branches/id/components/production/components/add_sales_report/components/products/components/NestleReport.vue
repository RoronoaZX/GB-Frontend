<template>
  <q-btn
    no-caps
    label="Nestle Report"
    rounded
    color="blue-8"
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
      <q-card-section class="row items-center bg-background q-px-md q-py-sm">
        <div class="text-h6 text-white">Add Nestlé</div>
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
                        <q-item-label>
                          {{ capitalizeFirstLetter(products?.product.name) }}
                        </q-item-label>
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
            v-model="addNestleReport.product_name"
            readonly
            dense
            outlined
          />
        </div>
        <div>
          <div>Category</div>
          <q-input v-model="addNestleReport.category" readonly dense outlined />
        </div>
        <div>
          <div>Price</div>
          <q-input v-model="addNestleReport.price" readonly dense outlined />
        </div>

        <div class="row justify-between q-mt-md q-gutter-md">
          <div>
            <div>Beginnings</div>
            <q-input
              v-model="addNestleReport.beginnings"
              mask="######"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Added Stocks</div>
            <q-input
              v-model="addNestleReport.added_stocks"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Remaining</div>
            <q-input
              v-model="addNestleReport.remaining"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Nestlé Out</div>
            <q-input
              v-model="addNestleReport.out"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Total Quantity</div>
            <q-input
              v-model="addNestleReport.total"
              mask="#####"
              outlined
              readonly
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Nestlé Sold</div>
            <q-input
              v-model="addNestleReport.sold"
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
import { Notify } from "quasar";
import { typographyFormat } from "src/composables/typography/typography-format";
import { useBranchProductsStore } from "src/stores/branch-product";
import { useSalesReportsStore } from "src/stores/sales-report";
import { computed, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";

const { capitalizeFirstLetter } = typographyFormat();

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

const category = ref("Nestle");

const search = async () => {
  console.log("branch_id.value: ", branch_id);
  console.log("searchQuery.value: ", searchQuery.value);
  console.log("category.value: ", category.value);
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
  addNestleReport.product_id = data.product.id;
  addNestleReport.product_name = capitalizeFirstLetter(data.product.name);
  addNestleReport.category = data.category;
  addNestleReport.price = data.price;
  searchQuery.value = "";
};

const addNestleReport = reactive({
  branch_id: branch_id,
  name: "",
  product_id: "",
  product_name: "",
  category: "",
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

const clearData = () => {
  addNestleReport.name = "";
  addNestleReport.product_id = "";
  addNestleReport.product_name = "";
  addNestleReport.category = "";
  addNestleReport.price = "";
  addNestleReport.beginnings = "";
  addNestleReport.remaining = "";
  addNestleReport.added_stocks = "";
  addNestleReport.out = "";
  addNestleReport.sold = "";
  addNestleReport.total = "";
  addNestleReport.sales = "";
};

const formattedSales = computed(() => {
  const salesValue =
    parseInt(addNestleReport.sold || 0) *
    parseFloat(addNestleReport.price || 0);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(salesValue);
});

watch(
  () => [addNestleReport.added_stocks, addNestleReport.beginnings],
  ([newProduction, beginnings]) => {
    addNestleReport.total =
      parseInt(newProduction || 0) + parseInt(beginnings || 0);
  }
);

watch(
  () => [addNestleReport.total, addNestleReport.remaining, addNestleReport.out],
  ([totalQuantity, remaining, nestleOut]) => {
    addNestleReport.sold =
      parseInt(totalQuantity || 0) -
      (parseInt(remaining || 0) + parseInt(nestleOut || 0));
  }
);

watch(
  () => [addNestleReport.sold, addNestleReport.price],
  ([nestleSold, price]) => {
    addNestleReport.sales = parseInt(nestleSold || 0) * parseFloat(price || 0);
  }
);

const handleSubmit = async () => {
  // Prepare the request payload
  const payload = {
    user_id: props.userData,
    branch_id: addNestleReport.branch_id,
    product_id: addNestleReport.product_id,
    name: addNestleReport.product_name,
    total: addNestleReport.total,
    price: addNestleReport.price,
    beginnings: addNestleReport.beginnings,
    remaining: addNestleReport.remaining,
    added_stocks: addNestleReport.added_stocks,
    out: addNestleReport.out,
    sold: addNestleReport.sold,
    sales: addNestleReport.sales,
    new_production: addNestleReport.added_stocks,
  };

  console.log("Nestle", payload);

  salesReportsStore.updateNestleReport(payload);
  Notify.create({
    message: "Product added successfully",
    color: "positive",
    position: "top",
  });
  clearData();
};
</script>

<style lang="scss" scoped>
.bg-background {
  background: linear-gradient(to right, #054f6a, #15c2ee);
}

.custom-list {
  position: absolute;
  background-color: white;
  width: 100%;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  max-height: 200px;
  overflow-y: auto;
  bottom: 0;
  transform: translateY(100%);
  z-index: 10;
}
</style>
