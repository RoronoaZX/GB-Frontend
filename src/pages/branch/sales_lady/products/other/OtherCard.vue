<template>
  <div class="q-mt-md">
    <q-scroll-area style="height: 700px; max-width: 1500px">
      <div class="row q-pa-lg q-gutter-y-lg">
        <q-itersection
          v-for="(item, index) in othersProducts"
          :key="index"
          once
          transition="scale"
          class="example-item q-gutter-sm"
        >
          <q-card @click="clickme(item)" class="q-ma-sm my-card">
            <img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

            <div
              class="q-pa-sm"
              :class="{
                'text-h6': item.product.name.length <= 10,
                'text-caption text-weight-medium':
                  item.product.name.length > 10 &&
                  item.product.name.length <= 20,
                'text-caption text-weight-medium':
                  item.product.name.length > 20,
              }"
            >
              {{ item.product.name }}
            </div>

            <q-separator />
            <q-card-section class="text-subtitle2 text-weight-regular">
              <div class="q-pa-xm row q-gutter-x-sm justify-between">
                <div>Quantity:</div>
                <div>{{ item.total_quantity }}</div>
              </div>
              <div class="q-pa-xm row q-gutter-x-sm justify-between">
                <div>Price:</div>
                <div>{{ formatCurrency(item.price) }}</div>
              </div>
            </q-card-section>
          </q-card>
          <!-- {{ item }} -->
        </q-itersection>
      </div>
    </q-scroll-area>
  </div>
  <div>
    <q-dialog v-model="dialog">
      <q-card class="my-card q-pa-md" style="width: 700px; max-width: 80vw">
        <q-card-section class="row justify-between">
          <!-- {{ selectedItem }} -->
          <div class="text-h6">
            {{ selectedItem ? selectedItem.product.name : "" }}
          </div>
          <div>
            <q-btn round dense flat icon="close" @click="closeDialog" />
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-mb-lg row justify-between">
            <div>
              <div class="text-weight-light">Remainnings</div>
              <q-input
                v-model="othersProductsReport.remainnings"
                dense
                outlined
                mask="#####"
                suffix="pcs"
                placeholder="0"
                type="number"
                style="width: 260px; max-width: 300px; min-width: 50px"
              />
            </div>
            <div>
              <div class="text-weight-light">Product Out</div>
              <q-input
                v-model="othersProductsReport.otherProductOut"
                dense
                outlined
                type="number"
                mask="#####"
                suffix="pcs"
                placeholder="0"
                style="width: 260px; max-width: 300px; min-width: 50px"
              />
            </div>
          </div>
          <div class="row q-gutter-xm justify-between">
            <div class="q-gutter-sm">
              <div class="text-weight-light">Total Product</div>
              <q-input
                dense
                outlined
                readonly
                :label="selectedItem ? selectedItem.total_quantity : ''"
                style="width: 120px; max-width: 300px; min-width: 50px"
              >
                <template v-slot:append>
                  <span class="text-body2 text-weight-regular">pcs</span>
                </template>
              </q-input>
            </div>
            <div class="q-gutter-sm">
              <div class="text-weight-light">Price</div>
              <q-input
                dense
                outlined
                readonly
                :label="selectedItem ? formatCurrency(selectedItem.price) : ''"
                style="width: 120px; max-width: 300px; min-width: 50px"
              />
            </div>
            <div class="q-gutter-sm">
              <div class="text-weight-light">Sold Pcs</div>
              <q-input
                dense
                v-model="othersProductsReport.otherProductSold"
                outlined
                reverse-fill-mask
                readonly
                style="width: 120px; max-width: 300px; min-width: 50px"
              >
                <template v-slot:append>
                  <span class="text-body2 text-weight-regular">pcs</span>
                </template>
              </q-input>
            </div>
            <div class="q-gutter-sm">
              <div class="text-weight-light">Sales Amount</div>
              <q-input
                dense
                outlined
                v-model="otherProductSalesAmountFormatted"
                readonly
                style="width: 150px; max-width: 300px; min-width: 50px"
              >
                <!-- <template v-slot:append>
                  <span class="text-body2 text-weight-regular">PHP</span>
                </template> -->
              </q-input>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div align="right">
            <q-btn color="red-6" label="Ok" @click="saveReport" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useSalesReportsStore } from "src/stores/sales-report";
import { computed, onMounted, reactive, ref, watch } from "vue";

const salesReportsStore = useSalesReportsStore();
const userData = salesReportsStore.user;
console.log("userdata for branch", userData);
const selectedItem = ref(null);
const dialog = ref(false);

const clickme = (item) => {
  selectedItem.value = item;
  dialog.value = true;
};

const othersProductsReport = reactive({
  otherProductSold: 0,
  remainnings: 0,
  beginnings: 0,
  otherProductOut: 0,
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace("₱", "₱ ");
};

const calculateOtherProductSold = () => {
  if (selectedItem.value) {
    const totalQuantity = parseInt(selectedItem.value.total_quantity) || 0;
    const remainings = parseInt(othersProductsReport.remainnings) || 0;
    const otherProductOut = parseInt(othersProductsReport.otherProductOut) || 0;
    const difference = remainings + otherProductOut;
    othersProductsReport.otherProductSold = totalQuantity - difference;
  }
};

// console.log("calculateOtherProductSold");

watch(
  () => othersProductsReport.remainnings,
  (newRemaining) => {
    calculateOtherProductSold();
  }
);

watch(
  () => othersProductsReport.otherProductOut,
  (newOtherProductOut) => {
    calculateOtherProductSold();
  }
);

const othersProducts = computed(() => salesReportsStore.othersProducts);
console.log("othersProducts", othersProducts.value);

const otherProductSalesAmount = computed(() => {
  if (selectedItem.value) {
    return othersProductsReport.otherProductSold * selectedItem.value.price;
  }
  return 0;
});

const otherProductSalesAmountFormatted = computed(() => {
  return formatCurrency(otherProductSalesAmount.value);
});

onMounted(async () => {
  const userData = salesReportsStore.user;
  const branchId = userData?.employee?.branch_id || "";
  if (branchId) {
    await fetchProducts(branchId);
  }
});

const fetchProducts = async (branchId) => {
  const res = await salesReportsStore.fetchBranchProducts(branchId);
};

const closeDialog = () => {
  selectedItem.value = null;
  othersProductsReport.otherProductOut = 0;
  othersProductsReport.beginnings = 0;
  othersProductsReport.otherProductSold = 0;
  othersProductsReport.remainnings = 0;
  dialog.value = false;
};

const saveReport = async () => {
  if (selectedItem.value) {
    const report = {
      user_id: userData?.data.id,
      branch_id: userData?.employee?.branch_id || "",
      product_id: selectedItem.value.product.id,
      name: selectedItem.value.product.name,
      total: selectedItem.value.total_quantity,
      sold: othersProductsReport.otherProductSold,
      out: othersProductsReport.otherProductOut,
      added_stocks: selectedItem.value.new_production,
      beginnings: selectedItem.value.beginnings,
      remaining: othersProductsReport.remainnings,
      price: selectedItem.value.price,
      sales: otherProductSalesAmount.value,
    };

    console.log("report", report);
    salesReportsStore.updateOtherProductsReport(report);
    closeDialog();
  }
};
</script>

<style lang="scss" scoped>
.example-item {
  width: 190px;
  max-width: 500px;
  min-width: 80px;
  height: 250px;
  max-height: 500px;
  min-height: 200px;
}
</style>
