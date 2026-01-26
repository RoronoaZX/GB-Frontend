<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    v-model="dialog"
    backdrop-filter="blur(4px) saturate(150%) brightness(60%)"
  >
    <q-card style="max-width: 400px; width: 100%">
      <q-card-section
        class="q-pa-md q-rounded q-elevate-2 bg-white text-grey-9"
      >
        <div class="text-h5 q-mb-md">
          Decline
          {{ capitalizeFirstLetter(props.category || "undefined") }} Report
        </div>
        <div class="row justify-between">
          <div>
            Name:
            {{
              capitalizeFirstLetter(
                props.productData?.bread?.name ||
                  props.productData?.selecta?.name ||
                  props.productData?.softdrinks?.name ||
                  props.productData?.other_products?.name ||
                  "-"
              )
            }}
          </div>

          <div>Remaining: {{ props.productData.remaining || "0" }}</div>
        </div>

        <div class="q-pa-md">
          <q-input
            v-model="reason"
            filled
            type="textarea"
            placeholder="Reason"
          />
        </div>
      </q-card-section>
      <q-separator class="q-mb-md" />
      <q-card-section>
        <q-card-actions align="right" class="q-pt-none">
          <q-btn
            flat
            dense
            label="Cancel"
            color="primary"
            v-close-popup
            class="q-mr-sm"
          />
          <q-btn
            dense
            label="Decline"
            color="negative"
            :disable="!reason"
            class="q-btn-rounded q-px-lg"
            @click="decline"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Loading, useDialogPluginComponent } from "quasar";
import { computed, ref } from "vue";
import { useSalesReportsStore } from "src/stores/sales-report";

import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter, formatPrice } = typographyFormat();

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const salesReportStore = useSalesReportsStore();

const userData = computed(() => salesReportStore.user);
console.log("user datasss", userData.value);

const employee_id =
  userData.value?.data?.employee?.id || userData.value?.data?.employee_id || "";

const dialog = ref(false);

const reason = ref("");

const props = defineProps({
  category: String,
  productData: {
    type: Object,
    default: () => ({}), // ✅ IMPORTANT: factory function
  },
  sales_report_id: Number,
});

console.log("propssssssss", props);

const decline = async () => {
  const payload = {
    id: props.productData.id,
    reason: reason.value,
    status: "declined",
    type: props.category,
    employee_id: employee_id,
    sales_report_id: props.sales_report_id,
  };
  try {
    Loading.show({
      spinnerColor: "white",
      message: "Processing...",
      messageColor: "white",
      backgroundColor: "rgba(0,0,0,0.5)",
      delay: 400,
    });
    await salesReportStore.declineProductsReport(payload);
    reason.value = "";

    // ✅ close dialog
    onDialogHide();
  } catch (error) {
    console.log("Error declining products report", error);
  } finally {
    Loading.hide();
  }
};
</script>

<style scoped>
.q-card {
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.q-card-section {
  padding: 24px 32px;
}

.q-btn {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.q-btn-rounded {
  border-radius: 50px;
}

.q-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.q-btn:active {
  transform: translateY(0);
  box-shadow: none;
}

.text-h5 {
  font-weight: 600;
}

.text-body2 {
  color: #666;
}

.q-elevate-2 {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.bg-white {
  background-color: #fff;
}

.text-grey-9 {
  color: #333;
}

.q-separator {
  border-color: #eee;
}
</style>
