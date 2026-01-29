<template>
  <div class="q-mt-md">
    <q-scroll-area style="height: 700px; max-width: 1500px">
      <div
        v-if="!filteredBreadProducts || filteredBreadProducts.length === 0"
        class="text-center q-pa-md"
      >
        No data available
      </div>
      <div v-else class="row q-pa-lg q-gutter-y-lg">
        <q-intersection
          v-for="(item, index) in filteredBreadProducts"
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
                'text-subtitle2': item.product.name.length <= 5,
                'text-caption text-weight-medium':
                  item.product.name.length > 10 &&
                  item.product.name.length <= 20,
                'text-caption': item.product.name.length > 20,
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
                <div>{{ formatPrice(item.price) }}</div>
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
              <div class="text-weight-light">Remainings</div>
              <q-input
                v-model="breadProductsReport.remainnings"
                dense
                outlined
                mask="#####"
                suffix="pcs"
                placeholder="0"
                type="number"
                style="width: 260px; max-width: 300px; min-width: 50px"
                :rules="[(val) => !!val || 'Remainnings is required']"
                :error="!!errors.remainnings"
                :error-message="
                  errors.remainnings ? 'Remainings is required' : ''
                "
                @update:model-value="clearError('remainnings')"
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
                :rules="[(val) => !!val || 'Bread out is required']"
                :error="!!errors.breadOut"
                :error-message="errors.breadOut"
                @update:model-value="clearError('breadOut')"
              />
            </div>
          </div>
          <div class="row q-gutter-xm justify-between">
            <div class="q-gutter-sm">
              <div class="text-weight-light">Beginning/s</div>
              <q-input
                dense
                outlined
                readonly
                :label="selectedItem ? selectedItem.beginnings : ''"
                style="width: 150px; max-width: 300px; min-width: 50px"
              >
                <template v-slot:append>
                  <span class="text-body2 text-weight-regular">pcs</span>
                </template>
              </q-input>
            </div>
            <div class="q-gutter-sm">
              <div class="text-weight-light">New Production</div>
              <q-input
                dense
                outlined
                readonly
                :label="selectedItem ? selectedItem.new_production : ''"
                style="width: 150px; max-width: 300px; min-width: 50px"
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
                :label="selectedItem ? formatPrice(selectedItem.price) : ''"
                style="width: 150px; max-width: 300px; min-width: 50px"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div align="right">
            <q-btn
              color="red-6"
              label="Ok"
              :loading="loading"
              @click="saveReport"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { Notify, QSpinnerIos, Loading } from "quasar";
import { useSalesReportsStore } from "src/stores/sales-report";
import { computed, onMounted, reactive, ref, watch } from "vue";

import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatPrice } = typographyFormat();

const salesReportsStore = useSalesReportsStore();
const userData = salesReportsStore.user;
console.log("userdataa", userData);
const branchId =
  userData.device?.reference_id || userData.device?.reference?.id || "0";
console.log("branchIdsss", branchId);
const selectedItem = ref(null);
const dialog = ref(false);
const loading = ref(false);

const filter = defineProps({
  filter: String,
});

const clickme = (item) => {
  selectedItem.value = item;
  dialog.value = true;
};

const breadProductsReport = reactive({
  breadSold: 0,
  remainnings: "",
  beginnings: 0,
  breadOut: "",
});
const errors = ref({
  remainnings: "",
  breadOut: "",
});

const clearError = (field) => {
  errors.value[field] = ""; // Clear error when user types
};

const validateFields = () => {
  // Reset errors
  errors.value.remainnings = "";
  errors.value.breadOut = "";

  let isValid = true;

  // Check if remaining is empty
  if (!breadProductsReport.remainnings) {
    errors.value.remainnings = "Remaining is required";
    isValid = false;
  }

  // Check if bread out is empty
  if (!breadProductsReport.breadOut) {
    errors.value.breadOut = "Bread Out is required";
    isValid = false;
  }

  return isValid;
};

const calculateBreadSold = () => {
  if (selectedItem.value) {
    console.log("selectedItem", selectedItem.value);
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
  return formatPrice(breadSalesAmount.value);
});

const breadProducts = computed(() => salesReportsStore.breadProducts);
watch(breadProducts, (newVal) => {
  // console.log("breadProducts updated:", newVal);
});

const filteredBreadProducts = computed(
  () =>
    breadProducts.value?.filter((item) =>
      item.product.name.toLowerCase().includes(filter.filter.toLowerCase())
    ) || []
);

const closeDialog = () => {
  selectedItem.value = null;
  breadProductsReport.breadSold = 0;
  breadProductsReport.remainnings = "";
  breadProductsReport.beginnings = 0;
  breadProductsReport.breadOut = "";
  dialog.value = false;
};

const saveReport = () => {
  // console.log("clickckckk");

  if (!validateFields()) {
    return; // Prevent submission if fields are empty
  }
  Loading.show({
    spinner: QSpinnerIos,
    message: `${capitalizeFirstLetter(
      selectedItem.value.product.name
    )} putting to the list...`,
    messageColor: "white",
  });

  const report = {
    user_id: userData?.data.id,
    branch_id: branchId || userData.device?.reference_id,
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
    new_production: selectedItem.value.new_production,
    branch_new_production: 0,
  };
  console.log("report", report);

  salesReportsStore.updateBreadReport(report);
  Notify.create({
    message: "Product added successfully",
    color: "positive",
    position: "top",
  });
  setTimeout(() => {
    Loading.hide();
    closeDialog();
  }, 500);
};
</script>

<style lang="scss" scoped>
.example-item {
  width: 190px;
  height: 300px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  .my-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    img {
      height: 150px;
      width: 100%;
      object-fit: cover;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    .product-name {
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      padding: 6px 8px;
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .q-card-section {
      padding: 6px 12px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
  }
}
</style>
