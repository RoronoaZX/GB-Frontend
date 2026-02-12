<template>
  <q-btn
    outline
    class="text-dark q-pa-sm"
    push
    dense
    elevated
    icon="add_circle"
    label="Add Nestle"
    @click="openDialog"
  />
  <q-dialog
    v-model="dialog"
    persistent
    position="right"
    backdrop-filter="blur(4px) saturate(150%)"
  >
    <q-card style="width: 600px; max-width: 80vw">
      <q-card-section class="row items-center bg-background q-px-md q-py-sm">
        <div class="text-h6 text-white">Add Nestlé</div>
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
                        <q-item-label>
                          {{ capitalizeFirstLetter(products.product.name) }}
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

        <div class="row justify-between q-mt-md q-gutter-md">
          <div>
            <div>Category</div>
            <q-input
              v-model="addNestleReport.category"
              readonly
              dense
              outlined
            />
          </div>
          <div>
            <div>Price</div>
            <q-input v-model="addNestleReport.price" readonly dense outlined />
          </div>
        </div>
        <div class="row justify-between q-mt-md q-gutter-md">
          <div>
            <div>Beginnings</div>
            <q-input
              v-model="addNestleReport.beginnings"
              mask="#####"
              outlined
              dense
              style="width: 150px"
            />
          </div>
          <div>
            <div>Added Stocks</div>
            <q-input
              v-model="addNestleReport.added_stocks"
              mask="######"
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
              mask="######"
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
import { useProductionStore } from "src/stores/production";
import { useUsersStore } from "src/stores/user";
import { computed, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";

const { capitalizeFirstLetter, formatFullname, formatPrice } =
  typographyFormat();

const props = defineProps({
  sales_Reports: { type: Array, default: () => [] },
  sales_report_id: [String, Number],
  user: Object,
  reportLabel: String,
  reportDate: String,
});

console.log("Propsss..", props);

const emit = defineEmits(["nestle-added"]);

console.log("props.sales_Reports", props.sales_Reports);
console.log("props.user", props.user);

const userStore = useUsersStore();

const userData = computed(() => userStore.userData);
console.log("usersssData", userData.value);

const userId = computed(
  () =>
    userStore.userData?.data?.employee_id || userStore.userData?.data?.id || 0
);

const route = useRoute();
const branch_id = route.params.branch_id;
const user_id = props.user.id;

const productionStore = useProductionStore();
const branchProductsStore = useBranchProductsStore();

const dialog = ref(false);
const searchQuery = ref("");
const branchProduct = computed(() => branchProductsStore.branchProducts);
console.log("branchProduct", branchProduct);

const sales_report_id = props.sales_report_id;

const addNestleReport = reactive({
  sales_report_id: sales_report_id,
  branch_id: branch_id,
  user_id: user_id,
  handled_by: userId.value,
  name: "",
  product_id: "",
  product_name: "",
  price: 0,
  beginnings: 0,
  remaining: 0,
  status: "confirmed",
  added_stocks: 0,
  reason: "Added by admin",
  out: 0,
  sold: 0,
  total: 0,
  sales: 0,
});

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

const openDialog = () => {
  dialog.value = true;
};

const category = ref("Nestle");

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
  addNestleReport.product_id = data.product.id;
  addNestleReport.product_name = capitalizeFirstLetter(data.product.name);
  addNestleReport.category = data.category;
  addNestleReport.price = data.price;
  searchQuery.value = "";
};

const handleSubmit = async () => {
  if (!addNestleReport.product_id) {
    Notify.create({
      message: "Please select a product",
      color: "negative",
      position: "top",
    });
    return;
  }

  const payload = { ...addNestleReport };

  try {
    const response = await productionStore.addProduction(
      "nestle",
      payload,
      props.reportDate,
      props.reportLabel.toUpperCase()
    );

    const newRow = response.data || response;

    emit("nestle-added", {
      success: true,
      newRow: newRow,
    });

    dialog.value = false;

    Object.assign(addNestleReport, {
      user_id: 0,
      branch_id: 0,
      sales_report_id: 0,
      product_id: 0,
      product_name: "",
      price: 0,
      category: "",
      beginnings: 0,
      remaining: 0,
      added_stocks: 0,
      handled_by: 0,
      out: 0,
      sold: 0,
      total: 0,
      sales: 0,
    });
  } catch (error) {
    console.log("Add nestle error: ", error);
  }
};
</script>

<style lang="scss" scoped>
.bg-background {
  background: linear-gradient(to right, #054f6a 0%, #15c2ee 100%);
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
