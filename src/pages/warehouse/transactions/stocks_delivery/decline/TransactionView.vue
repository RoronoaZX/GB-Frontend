<template>
  <q-dialog ref="dialogRef" v-model="dialog" @hide="onDialogHide">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section class="emphasized-header">
        <div class="row justify-between">
          <div class="text-h6">
            From: {{ capitalizeFirstLetter(report.from_name) }}
          </div>
          <q-btn
            class="close-btn"
            color="grey-8"
            flat
            round
            dense
            icon="close"
            @click="dialog = false"
          />
        </div>
      </q-card-section>
      <q-card-section class="text-caption text-grey-7 q-mt-sm">
        <div>
          <span class="text-bold">Date:</span>
          {{ formatTimestamp(report.created_at) }}
        </div>
        <div>
          <span class="text-bold">Created By:</span>
          {{ formatFullname(report.employee) || "-" }}
        </div>
        <span class="text-bold">Status:</span>

        <q-badge color="negative">
          {{ capitalizeFirstLetter(report.status || "No Status") }}
        </q-badge>
        <div>
          <span class="text-bold">Remark:</span>
          {{ capitalizeFirstLetter(report.remarks || "No Remark") }}
        </div>
      </q-card-section>

      <q-card-section>
        <div>
          <span class="text-grey-7 text-caption">Items:</span>
          <template v-if="report.items && report.items.length">
            <q-list dense separator class="box">
              <q-item class="bg-grey-1 text-weight-bold">
                <q-item-section>
                  <q-item-label> Raw Materials Code </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Stocks Category</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label> Quantity </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label> Total Amount </q-item-label>
                </q-item-section>
                <q-item-section side class="text-right" style="min-width: 100px;">
                  <q-item-label> Total Cost </q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-for="(item, index) in report.items" :key="index">
                <q-item-section>
                  <q-item-label>
                    {{ item.raw_material?.code || "No Code" }}
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{ item.category || "No Category" }}
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{ formatQuantity(item.quantity || "No Quantity") }}
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <q-badge color="teal" label-color="white">
                      {{ formatTotalAmount(item) }}
                    </q-badge>
                  </q-item-label>
                </q-item-section>
                <q-item-section side class="text-right text-weight-bold text-primary" style="min-width: 100px;">
                  <q-item-label>
                    {{ formatPrice(calculateItemTotalCost(item)) }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <div class="row justify-end items-center q-mt-md q-gutter-sm q-pr-md">
              <div class="text-subtitle2 text-grey-7">Overall Delivery Total Cost:</div>
              <div class="text-subtitle1 text-weight-bolder text-primary">
                {{ formatPrice(overallTotalCost) }}
              </div>
            </div>
          </template>
          <div v-else class="text-caption text-grey-6 q-mt-md">
            No items in this delivery
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { ref, computed } from "vue";
import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatTimestamp, formatFullname, formatPrice } =
  typographyFormat();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});
/* console.log("report", props.report); */

const dialog = ref(false);

const formatQuantity = (val) => {
  if (val == null) return "No Quantity";
  return parseFloat(val);
};

const formatTotalAmount = (row) => {
  const qty = Number(row.quantity) || 0;
  const category = (row.category || "").toLowerCase();

  if (category === "pcs") {
    return `${qty} pcs`;
  }

  const gramsPerUnit = Number(row.gram) || 0;
  const pcsPerUnit = Number(row.pcs) || 0;
  
  if (gramsPerUnit > 0) {
    let totalGrams = qty * gramsPerUnit;
    if (category === "gram") {
      totalGrams = qty; 
    }
    
    if (totalGrams >= 1000) {
      const kgs = totalGrams / 1000;
      return `${Number.isInteger(kgs) ? kgs : kgs.toFixed(2)} kgs`;
    } else {
      return `${totalGrams} grams`;
    }
  } else {
    if (pcsPerUnit > 0) {
      const totalPcs = qty * pcsPerUnit;
      return `${totalPcs} pcs`;
    }
    return `0`;
  }
};

const calculateItemTotalCost = (item) => {
  const qty = parseFloat(item.quantity) || 0;
  const category = (item.category || "").toLowerCase();

  if (category === "gram") {
    const pricePerGram = parseFloat(item.price_per_gram) || 0;
    return qty * pricePerGram;
  }

  const pricePerUnit = parseFloat(item.price_per_unit) || 0;
  return qty * pricePerUnit;
};

const overallTotalCost = computed(() => {
  if (!props.report || !props.report.items) return 0;
  return props.report.items.reduce((sum, item) => sum + calculateItemTotalCost(item), 0);
});
</script>

<style lang="scss" scoped>
.bg-grey-2 {
  background-color: #f5f7fa !important;
}

.box {
  border: 1px dashed grey;
  border-radius: 10px;
}

.emphasized-header {
  background: linear-gradient(180deg, #ffffff, #ffc7c7);
}
</style>
