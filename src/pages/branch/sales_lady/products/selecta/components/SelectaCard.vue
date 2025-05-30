<template>
  <div class="q-mt-md">
    <q-scroll-area style="height: calc(100vh - 150px); max-width: 1500px">
      <div
        v-if="!filteredSelectaProducts || filteredSelectaProducts.length === 0"
        class="text-center q-pa-md"
      >
        No data available
      </div>
      <div v-else class="row q-pa-lg q-gutter-sm q-gutter-y-md">
        <q-intersection
          v-for="(item, index) in filteredSelectaProducts"
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
              <div class="text-weight-light">Remainings</div>
              <q-input
                v-model="selectaProductReport.selectaRemainings"
                dense
                outlined
                mask="#####"
                type="number"
                suffix="pcs"
                placeholder="0"
                style="width: 260px; max-width: 300px; min-width: 50px"
                :rules="[(val) => !!val || 'Remainnings is required']"
                :error="!!errors.selectaRemainings"
                :error-message="errors.selectaRemainings"
                @update:model-value="clearError('selectaRemainings')"
              />
            </div>
            <div>
              <div class="text-weight-light">Selecta Out</div>
              <q-input
                v-model="selectaProductReport.selectaOut"
                dense
                outlined
                mask="#####"
                type="number"
                suffix="pcs"
                placeholder="0"
                style="width: 260px; max-width: 300px; min-width: 50px"
                :rules="[(val) => !!val || 'Selecta out is required']"
                :error="!!errors.selectaOut"
                :error-message="errors.selectaOut"
                @update:model-value="clearError('selectaOut')"
              />
            </div>
          </div>
          <div class="row q-gutter-xm justify-between">
            <div class="q-gutter-sm">
              <div class="text-weight-light">Total Selecta</div>
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
                v-model="selectaProductReport.selectaSold"
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
                v-model="selectaSalesAmountFormatted"
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
import { Notify, QSpinnerIos, Loading } from "quasar";
import { useSalesReportsStore } from "src/stores/sales-report";
import { computed, onMounted, reactive, ref, watch } from "vue";

const salesReportsStore = useSalesReportsStore();
const userData = salesReportsStore.user;
console.log("userData", userData);
const branchId = userData?.device?.reference_id || "";
console.log("branchId", branchId);
const selectedItem = ref(null);
const dialog = ref(false);
const loading = ref(false);

// Props
const filter = defineProps({
  filter: String,
});

const clickme = (item) => {
  selectedItem.value = item;
  dialog.value = true;
};

const selectaProductReport = reactive({
  selectaSold: 0,
  selectaRemainings: "",
  selectaBeginnings: 0,
  selectaOut: "",
});

const errors = ref({
  selectaRemainings: "",
  selectaOut: "",
});

const clearError = (field) => {
  errors.value[field] = ""; // Clear error when user types
};

const validateFields = () => {
  // Reset errors
  errors.value.selectaRemainings = "";
  errors.value.selectaOut = "";

  let isValid = true;

  // Check if remaining is empty
  if (!selectaProductReport.selectaRemainings) {
    errors.value.selectaRemainings = "Remaining is required";
    isValid = false;
  }

  // Check if bread out is empty
  if (!selectaProductReport.selectaOut) {
    errors.value.selectaOut = "Selecta Out is required";
    isValid = false;
  }

  return isValid;
};

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

const selectaSalesAmount = computed(() => {
  if (selectedItem.value) {
    console.log("selectedItem", selectedItem.value);
    return selectaProductReport.selectaSold * selectedItem.value.price;
  }
  return 0;
});

const selectaSalesAmountFormatted = computed(() => {
  return formatCurrency(selectaSalesAmount.value);
});

const calculateSelecta = () => {
  if (selectedItem.value) {
    const totalQuantity = parseInt(selectedItem.value.total_quantity) || 0;
    const remainings = parseInt(selectaProductReport.selectaRemainings) || 0;
    const selectaOut = parseInt(selectaProductReport.selectaOut) || 0;
    const difference = remainings + selectaOut;
    selectaProductReport.selectaSold = totalQuantity - difference;
  }
};

watch(
  () => selectaProductReport.selectaRemainings,
  (newRemaining) => {
    calculateSelecta();
  }
);

watch(
  () => selectaProductReport.selectaOut,
  (newBreadOut) => {
    calculateSelecta();
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

const selectaProducts = computed(() => salesReportsStore.selectaProducts);
watch(selectaProducts, (newVal) => {
  // console.log("selectaProducts updated:", newVal);
});

const filteredSelectaProducts = computed(
  () =>
    selectaProducts.value?.filter((item) =>
      item.product.name.toLowerCase().includes(filter.filter.toLowerCase())
    ) || []
);

const closeDialog = () => {
  selectedItem.value = null;
  selectaProductReport.selectaSold = 0;
  selectaProductReport.selectaRemainings = "";
  selectaProductReport.selectaBeginnings = 0;
  selectaProductReport.selectaOut = "";
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
    branch_id: branchId || userData?.device?.branch_id,
    product_id: selectedItem.value.product.id,
    name: selectedItem.value.product.name,
    total: selectedItem.value.total_quantity,
    added_stocks: selectedItem.value.new_production,
    sold: selectaProductReport.selectaSold,
    out: selectaProductReport.selectaOut,
    beginnings: selectedItem.value.beginnings,
    remaining: selectaProductReport.selectaRemainings,
    price: selectedItem.value.price,
    sales: selectaSalesAmount.value,
    new_production: 0,
  };
  console.log("report", report);
  salesReportsStore.updateSelectaReport(report);
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
  max-width: 500px;
  min-width: 80px;
  height: 250px;
  max-height: 500px;
  min-height: 200px;
}
</style>
