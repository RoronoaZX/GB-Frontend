<template>
  <div class="q-mt-md">
    <q-scroll-area style="height: 450px; max-width: 1500px">
      <div class="row q-pa-lg q-gutter-sm q-gutter-y-md">
        <q-intersection
          v-for="(item, index) in onDisplayCake"
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
                'text-h6': item.product.name.length <= 10,
                'text-caption text-weight-medium':
                  item.product.name.length > 10 &&
                  item.product.name.length <= 20,
                'text-caption text-weight-medium':
                  item.product.name.length > 20,
              }"
            >
              {{ capitalizeFirstLetter(item.name) }}
            </div>

            <q-separator />
            <q-card-section>
              <div class="q-pa-xm row q-gutter-x-sm justify-between">
                <div>Layers</div>
                <div>
                  {{ item.layers }}
                </div>
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
  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">
            {{ capitalizeFirstLetter(selectedItem.name) }}
          </div>
          <div>
            <q-btn round dense flat icon="close" v-close-popup />
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="row justify-between">
        <div class="row q-gutter-x-sm">
          <div class="text-subtitle2">Layer /s :</div>
          <div class="text-weight-light">{{ selectedItem.layers }}</div>
        </div>
        <div class="row q-gutter-x-sm">
          <div class="text-subtitle2">Price :</div>
          <div class="text-weight-light">
            {{ formatCurrency(selectedItem.price) }}
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-gutter-x-md">
        <q-btn
          label="Sold"
          color="primary"
          unelevated
          class="rounded-borders"
          icon="check_circle"
          @click="sold"
        />
        <q-btn
          label="Pull Out"
          color="negative"
          outline
          class="rounded-borders"
          icon="close"
          @click="pullOut"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useSalesReportsStore } from "src/stores/sales-report";
import { useCakeMakerReportStore } from "src/stores/cake-maker-report";
import { computed, onMounted, reactive, ref } from "vue";
import { Notify } from "quasar";

const salesReportsStore = useSalesReportsStore();
const useCakeMakerReport = useCakeMakerReportStore();
const onDisplayCake = computed(() => useCakeMakerReport.onDisplayProducts);
const branchId = localStorage.getItem("branch_id");
const selectedItem = ref(null);
const dialog = ref(false);

onMounted(async () => {
  if (branchId) {
    await fetchOnDisplayProducts(branchId);
  }
});

const fetchOnDisplayProducts = async () => {
  const response = await useCakeMakerReport.fetchOnDisplayProducts(branchId);
  onDisplayCake.value = response;
  console.log("sdfasdfas", onDisplayCake.value);
};

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const clickme = (item) => {
  selectedItem.value = item;
  dialog.value = true;
};

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

const sold = async () => {
  if (selectedItem.value) {
    const report = {
      cake_report_id: selectedItem.value.id,
      name: selectedItem.value.name,
      price: selectedItem.value.price,
      sales_status: "sold",
    };
    console.log(report);
    salesReportsStore.updateCakeReport(report);
    Notify.create({
      type: "positive",
      message: `${report.name} is sold`,
    });
  }
  dialog.value = false;
};

const pullOut = async () => {
  if (selectedItem.value) {
    const report = {
      cake_report_id: selectedItem.value.id,
      name: selectedItem.value.name,
      price: selectedItem.value.price,
      sales_status: "pull out",
    };
    salesReportsStore.updateCakeReport(report);
    Notify.create({
      type: "warning",
      message: `${report.name} is pull out`,
    });
  }
  dialog.value = false;
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
