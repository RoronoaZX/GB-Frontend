<template>
  <div class="q-mt-md">
    <q-scroll-area style="height: calc(100vh - 150px); max-width: 1500px">
      <div
        v-if="!filteredNestleProducts || filteredNestleProducts.length === 0"
        class="text-center q-pa-md"
      >
        No data available
      </div>
      <div class="row q-pa-lg q-gutter-sm q-gutter-y-md">
        <q-intersention
          v-for="(item, index) in filteredNestleProducts"
          :key="index"
          once
          transition="scale"
          class="example-item"
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
        </q-intersention>
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
          <div class="q-mg-lg row justify-between">
            <div>
              <div class="text-weight-light">Remainings</div>
              <q-input
                v-model="nestleProductReport.nestleRemainings"
                dense
                outlined
                mask="#####"
                type="number"
                suffix="pcs"
                placeholder="0"
                style="width: 260px; max-width: 300px; min-width: 50px"
                :rules="[(val) => !!val || 'Remainings is required']"
                :error="!!errors.nestleRemainings"
                :error-message="errors.nestleRemainings"
                @update:model-value="clearError('nestleRemainings')"
              />
            </div>
            <div>
              <div class="text-weight-light">Nestlé Out</div>
              <q-input
                v-model="nestleProductReport.nestleOut"
                dense
                outlined
                mask="#####"
                type="number"
                suffix="pcs"
                placeholder="0"
                style="width: 260px; max-width: 300px; min-width: 50px"
                :rules="[(val) => !!val || 'Nestlé out is required']"
                :error="!!errors.nestleOut"
                :error-message="errors.nestleOut"
                @update:model-value="clearError('nesleOut')"
              />
            </div>
          </div>

          <div class="row q-gutter-xm justify-between">
            <div class="q-gutter-sm">
              <div class="text-weight-light">Beginnings</div>
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
              <div class="text-weight-light">Added Stocks</div>
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

import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatPrice } = typographyFormat();

const salesReportsStore = useSalesReportsStore();

const userData = salesReportsStore.user;
console.log("userData", userData);

const branchId =
  userData?.device?.reference_id || userData?.device?.reference?.id || "0";
console.log("branchIdddddddd", branchId);

const selectedItem = ref(null);

const dialog = ref(false);
const loading = ref(false);

// Props
const filter = defineProps({
  filter: String,
});

const clickme = (item) => {
  selectedItem.value = item;

  console.log("selectedItem", selectedItem.value);
  dialog.value = true;
};

const nestleProductReport = reactive({
  nestleSold: 0,
  nestleRemainings: 0,
  nestleBeginnings: 0,
  nestleOut: 0,
});

const errors = ref({
  nestleRemainings: "",
  nestleOut: "",
});

const clearError = (field) => {
  errors.value[field] = ""; // Clear error when user types
};

const validateFields = () => {
  // Reset errors
  errors.value.nestleRemainings = "";
  errors.value.nestleOut = "";

  let isValid = true;

  // Check if remaining is empty
  if (!nestleProductReport.nestleRemainings) {
    errors.value.nestleRemainings = "Remaining is required";
    isValid = false;
  }

  // Check if nestle out is empty
  if (!nestleProductReport.nestleOut) {
    errors.value.nestleOut = "Neslte Out is required";
    isValid = false;
  }

  return isValid;
};

const nestleSalesAmount = computed(() => {
  if (selectedItem.value) {
    console.log("selectedItem.value", selectedItem.value);

    return nestleProductReport.nestleSold * selectedItem.value.price;
  }

  return 0;
});

const nestleSalesAmountFormatted = computed(() => {
  return formatPrice(nestleSalesAmount.value);
});

const calculateNestle = () => {
  if (selectedItem.value) {
    const totalQuantity = parseInt(selectedItem.value.total_quantity) || 0;
    const remainings = parseInt(nestleProductReport.nestleRemainings) || 0;
    const nestleOut = parseInt(nestleProductReport.nestleOut) || 0;
    const difference = remainings + nestleOut;

    nestleProductReport.nestleSold = totalQuantity - difference;
  }
};

watch(
  () => nestleProductReport.nestleRemainings,
  (newRemaining) => {
    calculateNestle();
  }
);

watch(
  () => nestleProductReport.nestleOut,
  (newNestleOut) => {
    calculateNestle();
  }
);

const nestleProducts = computed(() => salesReportsStore.nestleProducts);
console.log("nestleProducts", nestleProducts.value);

watch(nestleProducts, (newVal) => {
  // console.log("selectaProducts updated:", newVal);
});

const filteredNestleProducts = computed(() => {
  const search = filter.filter?.toLowerCase() || "";

  return (
    nestleProducts.value?.filter((item) => {
      const name = item?.product?.name?.toLowerCase() || "";

      return name.includes(search);
    }) || []
  );
});

const closeDialog = () => {
  selectedItem.value = null;
  nestleProductReport.nestleSold = 0;
  nestleProductReport.nestleRemainings = "";
  nestleProductReport.nestleBeginnings = 0;
  nestleProductReport.nestleOut = "";
  dialog.value = false;
};

const saveReport = () => {
  if (!validateFields()) {
    return;
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
    sold: nestleProductReport.nestleSold,
    out: nestleProductReport.nestleOut,
    beginnings: selectedItem.value.beginnings,
    remaining: nestleProductReport.nestleRemainings,
    price: selectedItem.value.price,
    sales: nestleSalesAmount.value,
    new_production: 0,
  };

  console.log("reportss", report);
  salesReportsStore.updateNestleReport(report);

  Notify.create({
    message: "Product added successfully",
    color: "positive",
    position: "top",
  });

  setTimeout(() => {
    Loading.hide();
    closeDialog();
  });
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
