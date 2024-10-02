<template>
  <div class="q-mt-md">
    <q-scroll-area style="height: 700px; max-width: 1500px">
      <div class="row q-pa-lg q-gutter-y-lg">
        <q-intersection
          v-for="(item, index) in breadProducts"
          :key="index"
          once
          transition="scale"
          class="example-item q-gutter-sm"
        >
          <q-card @click="clickme(item)" class="q-ma-sm my-card">
            <!-- Using a static image URL for now -->
            <img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />
            <q-card-section>
              <div class="text-h6">{{ item.product.name }}</div>
            </q-card-section>
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
        </q-intersection>
      </div>
    </q-scroll-area>
  </div>
  <div>
    <q-dialog v-model="dialog">
      <q-card class="my-card q-pa-md" style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="row justify-between">
            <div class="text-h6">
              {{ selectedItem ? selectedItem.product.name : "" }}
            </div>
            <div>
              <q-btn round dense flat icon="close" @click="closeDialog" />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-mb-lg row justify-between">
            <div>
              <div class="text-weight-light">Remainnings</div>
              <q-input
                v-model="breadProductsReport.remainnings"
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
              <div class="text-weight-light">Bread Out</div>
              <q-input
                v-model="breadProductsReport.breadOut"
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
              <div class="text-weight-light">Total Bread</div>
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
                v-model="breadProductsReport.breadSold"
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
                v-model="breadSalesAmountFormatted"
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
console.log("userdat", userData);
const selectedItem = ref(null);
const dialog = ref(false);

const clickme = (item) => {
  selectedItem.value = item;
  dialog.value = true;
};

const breadProductsReport = reactive({
  breadSold: 0,
  remainnings: 0,
  beginnings: 0,
  breadOut: 0,
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const calculateBreadSold = () => {
  if (selectedItem.value) {
    const totalQuantity = parseInt(selectedItem.value.total_quantity) || 0;
    const remainings = parseInt(breadProductsReport.remainnings) || 0;
    const breadOut = parseInt(breadProductsReport.breadOut) || 0;
    const difference = remainings + breadOut;
    breadProductsReport.breadSold = totalQuantity - difference;
  }
};

watch(
  () => breadProductsReport.remainnings,
  (newRemaining) => {
    calculateBreadSold();
  }
);

watch(
  () => breadProductsReport.breadOut,
  (newBreadOut) => {
    calculateBreadSold();
  }
);

const breadSalesAmount = computed(() => {
  if (selectedItem.value) {
    return breadProductsReport.breadSold * selectedItem.value.price;
  }
  return 0;
});

const breadSalesAmountFormatted = computed(() => {
  return formatCurrency(breadSalesAmount.value);
});

onMounted(async () => {
  const userData = salesReportsStore.user;
  const branchId = userData?.data?.employee?.branch_employee.branch_id || "";
  if (branchId) {
    await fetchProducts(branchId);
  }
});

const fetchProducts = async (branchId) => {
  const res = await salesReportsStore.fetchBranchProducts(branchId);
};

const breadProducts = computed(() => salesReportsStore.breadProducts);
watch(breadProducts, (newVal) => {
  // console.log("breadProducts updated:", newVal);
});

const closeDialog = () => {
  selectedItem.value = null;
  breadProductsReport.breadSold = 0;
  breadProductsReport.remainnings = 0;
  breadProductsReport.beginnings = 0;
  breadProductsReport.breadOut = 0;
  dialog.value = false;
};

const saveReport = () => {
  // console.log("clickckckk");
  if (selectedItem.value) {
    const report = {
      user_id: userData?.data.id,
      branch_id: userData?.data?.branch_employee?.branch_id || "",
      product_id: selectedItem.value.product.id,
      name: selectedItem.value.product.name,
      total: selectedItem.value.total_quantity,
      new_production: selectedItem.value.new_production,
      bread_sold: breadProductsReport.breadSold,
      bread_out: breadProductsReport.breadOut,
      beginnings: selectedItem.value.beginnings,
      remaining: breadProductsReport.remainnings,
      price: selectedItem.value.price,
      sales: breadSalesAmount.value,
    };
    salesReportsStore.updateBreadReport(report);
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
