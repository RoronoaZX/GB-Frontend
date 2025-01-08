<template>
  <div class="q-mt-md">
    <q-scroll-area style="height: 450px; max-width: 1500px">
      <div
        v-if="
          !filteredSoftdrinksProducts || filteredSoftdrinksProducts.length === 0
        "
        class="text-center q-pa-md"
      >
        No data available
      </div>
      <div v-else class="row q-pa-lg q-gutter-sm q-gutter-y-md">
        <q-intersection
          v-for="(item, index) in filteredSoftdrinksProducts"
          :key="index"
          once
          transition="scale"
          class="example-item"
        >
          <q-card @click="clickme(item)" class="q-ma-sm my-card">
            <!-- Using a static image URL for now -->
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
              {{ capitalizeFirstLetter(item.product.name) }}
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
        </q-intersection>
      </div>
    </q-scroll-area>
  </div>
  <div>
    <q-dialog v-model="dialog" persistent>
      <q-card class="my-card q-pa-md" style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="row justify-between">
            <div class="text-h6">
              {{
                capitalizeFirstLetter(
                  selectedItem ? selectedItem.product.name : ""
                )
              }}
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
                v-model="softdrinksProductsReport.remainnings"
                dense
                outlined
                mask="#####"
                type="number"
                suffix="pcs"
                placeholder="0"
                style="width: 260px; max-width: 300px; min-width: 50px"
              />
            </div>
            <div>
              <div class="text-weight-light">Softdrinks Out</div>
              <q-input
                v-model="softdrinksProductsReport.softdrinksOut"
                dense
                outlined
                mask="#####"
                type="number"
                suffix="pcs"
                placeholder="0"
                style="width: 260px; max-width: 300px; min-width: 50px"
              />
            </div>
          </div>
          <div class="row q-gutter-xm justify-between">
            <div class="q-gutter-sm">
              <div class="text-weight-light">Total Softdrinks</div>
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
                v-model="softdrinksProductsReport.softdrinksSold"
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
                v-model="softdrinksSalesAmountFormatted"
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
console.log("userData", userData);
const branchId = userData?.device?.branch_id || "";
console.log("branchId", branchId);
const selectedItem = ref(null);
const dialog = ref(false);

// Props
const filter = defineProps({
  filter: String,
});

const clickme = (item) => {
  selectedItem.value = item;
  dialog.value = true;
};

const softdrinksProductsReport = reactive({
  softdrinksSold: 0,
  remainnings: 0,
  beginnings: 0,
  softdrinksOut: 0,
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const softdrinksSalesAmount = computed(() => {
  if (selectedItem.value) {
    return softdrinksProductsReport.softdrinksSold * selectedItem.value.price;
  }
  return 0;
});

const softdrinksSalesAmountFormatted = computed(() => {
  return formatCurrency(softdrinksSalesAmount.value);
});

const calculateSofdrinksSold = () => {
  if (selectedItem.value) {
    const totalQuantity = parseInt(selectedItem.value.total_quantity) || 0;
    const remainings = parseInt(softdrinksProductsReport.remainnings) || 0;
    const softdrinksOut = parseInt(softdrinksProductsReport.softdrinksOut) || 0;
    const difference = remainings + softdrinksOut;
    softdrinksProductsReport.softdrinksSold = totalQuantity - difference;
  }
};

watch(
  () => softdrinksProductsReport.remainnings,
  (newRemaining) => {
    calculateSofdrinksSold();
  }
);

watch(
  () => softdrinksProductsReport.softdrinksOut,
  (newBreadOut) => {
    calculateSofdrinksSold();
  }
);

onMounted(async () => {
  // const userData = salesReportsStore.user;
  // const branchId = userData?.employee?.branch_id || "";
  if (branchId) {
    await fetchProducts(branchId);
  }
});

const fetchProducts = async (branchId) => {
  await salesReportsStore.fetchBranchProducts(branchId);
};

const softdrinksProducts = computed(() => salesReportsStore.softdrinksProducts);
watch(softdrinksProducts, (newVal) => {
  // console.log("softdrinksProducts updated:", newVal);
});

const filteredSoftdrinksProducts = computed(
  () =>
    softdrinksProducts.value?.filter((item) =>
      item.product.name.toLowerCase().includes(filter.filter.toLowerCase())
    ) || []
);

const closeDialog = () => {
  selectedItem.value = null;
  softdrinksProductsReport.softdrinksSold = 0;
  softdrinksProductsReport.remainnings = 0;
  softdrinksProductsReport.beginnings = 0;
  softdrinksProductsReport.softdrinksOut = 0;
  dialog.value = false;
};

const saveReport = () => {
  if (selectedItem.value) {
    const report = {
      user_id: userData?.data.id,
      branch_id: branchId || userData?.device?.branch_id,
      product_id: selectedItem.value.product.id,
      name: selectedItem.value.product.name,
      total: selectedItem.value.total_quantity,
      added_stocks: selectedItem.value.new_production,
      sold: softdrinksProductsReport.softdrinksSold,
      out: softdrinksProductsReport.softdrinksOut,
      beginnings: selectedItem.value.beginnings,
      remaining: softdrinksProductsReport.remainnings,
      price: selectedItem.value.price,
      sales: softdrinksSalesAmount.value,
    };
    console.log("report", report);
    // salesReportsStore.updateSoftdrinksReport(report);
    // closeDialog();
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
