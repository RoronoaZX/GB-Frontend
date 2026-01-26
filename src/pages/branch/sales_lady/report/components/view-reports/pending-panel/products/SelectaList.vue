<template>
  <div class="text-h6 text-red-6" align="center">Selecta List</div>
  <div>
    <q-list dense separator class="box">
      <q-item>
        <q-item-section>
          <q-item-label class="text-overline"> Product Name </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-overline text-center"> Price </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-overline text-center">
            Remaining
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label class="text-overline"> Action </q-item-label>
        </q-item-section>
      </q-item>

      <div v-for="(selecta, index) in props.selecta" :key="index">
        <q-item>
          <q-item-section>
            <q-item-label class="text-caption" align="justify">
              <span>{{
                capitalizeFirstLetter(selecta.selecta.name || "-")
              }}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>{{ formatPrice(selecta.price || "0.00") }}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label align="center">
              {{ selecta.ramaining || "-" }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label>
              <div class="row q-gutter-x-sm">
                <q-btn
                  unelevated
                  dense
                  color="positive"
                  size="sm"
                  no-caps
                  @click="handleConfirm(props.selecta[index])"
                >
                  <div class="row q-px-xm">
                    <q-icon left size="1.5em" name="check" />
                    <!-- <div>Confirm</div> -->
                  </div>
                </q-btn>
                <q-btn
                  dense
                  outline
                  color="red"
                  icon="close"
                  size="sm"
                  @click="
                    handleDecline(props.selecta[index], props.sales_report_id)
                  "
                />
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </div>
</template>

<script setup>
import { Loading, useQuasar } from "quasar";
import { typographyFormat } from "src/composables/typography/typography-format";
import DeclineDialog from "../actions-dialog/DeclineDialog.vue";
import { useSalesReportsStore } from "src/stores/sales-report";
import { computed } from "vue";

const { capitalizeFirstLetter, formatPrice } = typographyFormat();

const salesReportStore = useSalesReportsStore();

const userData = computed(() => salesReportStore.user);
console.log("user datasss", userData.value);

const employee_id =
  userData.value?.data?.employee?.id || userData.value?.data?.employee_id || "";

const props = defineProps({
  selecta: Array,
  sales_report_id: Number,
});

const $q = useQuasar();

console.log("selecta", props.selecta);

const handleConfirm = async (selecta) => {
  const payload = {
    id: selecta.id,
    status: "confirmed",
    type: "selecta",
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
    await salesReportStore.confirmProductsReport(payload);
  } catch (error) {
    console.log(error);
  } finally {
    Loading.hide();
  }
};

const handleDecline = (selectaData, sales_report_id) => {
  $q.dialog({
    component: DeclineDialog,
    componentProps: {
      category: "selecta",
      productData: selectaData,
      sales_report_id: sales_report_id,
    },
  });
};
</script>

<style lang="scss" scoped>
.box {
  border: 1px dashed #f44336;
  border-radius: 10px;
}
</style>
