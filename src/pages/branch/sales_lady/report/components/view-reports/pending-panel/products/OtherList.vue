<template>
  <div class="text-h6 text-blue-grey" align="center">Other Products List</div>
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
          <q-item-label class="text-overline text-center">
            Action
          </q-item-label>
        </q-item-section>
      </q-item>

      <div v-for="(other, index) in props.others" :key="index">
        <q-item>
          <q-item-section>
            <q-item-label>
              <span>{{
                capitalizeFirstLetter(other.other_products.name || "-")
              }}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section align="center">
            <q-item-label class="text-caption">
              <span>{{ formatPrice(other.price || "0.00") }}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section align="center">
            <q-item-label class="text-caption">
              <span>{{ other.remaining || "-" }}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label class="text-caption" align="justify">
              <div class="row q-gutter-x-sm">
                <q-btn
                  unelevated
                  dense
                  color="positive"
                  size="sm"
                  no-caps
                  @click="handleConfirm(props.others[index])"
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
                    handleDecline(props.others[index], props.sales_report_id)
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

const employee_id =
  userData.value?.data?.employee?.id || userData.value?.data?.employee_id || "";

const branches_id =
  userData.value?.device?.reference_id ||
  userData.value?.data?.reference?.id ||
  "";

const props = defineProps({
  others: Array,
  sales_report_id: Number,
});

const $q = useQuasar();

console.log("othersssss", props.others);

const handleConfirm = async (other) => {
  const payload = {
    id: other.id,
    status: "confirmed",
    type: "other",
    employee_id: employee_id,
    sales_report_id: props.sales_report_id,
    branches_id: branches_id,
    remaining: other.remaining,
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

const handleDecline = (other, sales_report_id) => {
  $q.dialog({
    component: DeclineDialog,
    componentProps: {
      category: "other",
      productData: other,
      sales_report_id: sales_report_id,
    },
  });
};
</script>

<style lang="scss" scoped>
.box {
  border: 1px dashed #607d8b;
  border-radius: 10px;
}
</style>
