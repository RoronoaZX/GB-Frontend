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
import { ref, reactive, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { typographyFormat } from "src/composables/typography/typography-format";
import { useUsersStore } from "src/stores/user";

const { capitalizeFirstLetter, formatFullname } = typographyFormat();

const props = defineProps({
  sales_Reports: { type: Array, default: () => [] },
  sales_report_id: [String, Number],
  user: Object,
  reportLabel: String,
  reportDate: String,
});

const emit = defineEmits(["bread-added"]);

const userStore = useUsersStore();

const userData = computed(() => userStore.userData);
console.log("usersssData", userData.value);

const userId = computed(
  () =>
    userStore.userData?.data?.employee_id || userStore.userData?.data?.id || 0
);

const route = useRoute();
const branch_id = route.params.branch_id;
const user_id = props.user?.id;

const productionStore = useProductionStore();
const branchProductsStore = useBranchProductsStore();

const dialog = ref(false);
const searchQuery = ref("");
const branchProduct = computed(() => branchProductsStore.branchProducts);

const addbreadProduction = reactive({
  sales_report_id: props.sales_report_id,
  branch_id: branch_id,
  user_id: user_id,
  handled_by: userId.value,
  product_id: "",
  product_name: "",
  category: "",
  price: 0,
  beginnings: 0,
  remaining: 0,
  status: "confirmed",
  new_production: 0,
  reason: "Added by admin",
  bread_out: 0,
  bread_sold: 0,
  total: 0,
  sales: 0,
});

const formattedSales = computed(() => {
  const sold = Number(addbreadProduction.bread_sold || 0);
  const price = Number(addbreadProduction.price || 0);
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(sold * price);
});

// Auto-calculations (your existing watches remain)
watch(
  () => [addbreadProduction.new_production, addbreadProduction.beginnings],
  ([np, bg]) => {
    addbreadProduction.total = Number(np || 0) + Number(bg || 0);
  }
);

watch(
  () => [
    addbreadProduction.total,
    addbreadProduction.remaining,
    addbreadProduction.bread_out,
  ],
  ([total, rem, out]) => {
    addbreadProduction.bread_sold =
      Number(total || 0) - (Number(rem || 0) + Number(out || 0));
  }
);

watch(
  () => [addbreadProduction.bread_sold, addbreadProduction.price],
  ([sold, price]) => {
    addbreadProduction.sales = Number(sold || 0) * Number(price || 0);
  }
);

const openDialog = () => {
  dialog.value = true;
};

const search = () => {
  if (searchQuery.value.trim()) {
    branchProductsStore.searchBranchProducts({
      query: searchQuery.value,
      branches_id: branch_id,
      category: "Bread",
    });
  }
};

const autoFillProduct = (product) => {
  addbreadProduction.product_id = product.product.id;
  addbreadProduction.product_name = capitalizeFirstLetter(product.product.name);
  addbreadProduction.category = product.category;
  addbreadProduction.price = product.price;
  searchQuery.value = "";
};

const handleSubmit = async () => {
  if (!addbreadProduction.product_id) {
    Notify.create({ message: "Please select a product", color: "negative" });
    return;
  }

  const payload = { ...addbreadProduction };

  try {
    // Call store
    const response = await productionStore.addProduction(
      "bread",
      payload,
      props.reportDate,
      props.reportLabel.toUpperCase()
    );

    // Extract the new data returned from the server
    // (Ensure your backend returns the created object including the 'bread' relationship)
    const newRow = response.data || response;

    // Emit back to BreadReport.vue
    emit("bread-added", {
      success: true,
      newRow: newRow,
    });

    dialog.value = false;

    // Reset the form
    Object.assign(addbreadProduction, {
      user_id: 0,
      branch_id: 0,
      sales_report_id: 0,
      product_id: "",
      product_name: "",
      price: 0,
      category: "",
      beginnings: 0,
      remaining: 0,
      new_production: 0,
      handled_by: 0,
      bread_out: 0,
      bread_sold: 0,
      total: 0,
      sales: 0,
    });
  } catch (err) {
    console.error("Add bread failed:", err);
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
