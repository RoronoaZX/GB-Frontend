<template>
  <div class="text-h6 text-blue-7" align="center">Nestlé List</div>
  <div>
    <q-list dense separator class="box">
      <q-item>
        <q-item-section>
          <q-item-label> Product name </q-item-label>
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

      <div v-for="(nestle, index) in props.nestle" :key="index">
        <q-item>
          <q-item-section>
            <q-item-label class="text-caption" align="justify">
              <span>
                {{ capitalizeFirstLetter(nestle.nestle.name || "") }}
              </span>
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ formatPrice(nestle.price || "0.00") }}
              </span>
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-caption" align="center">
              {{ nestle.remaining || "-" }}
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
                  @click="handleConfirm(props.nestle[index])"
                >
                  <div class="row q-px-xm">
                    <q-icon left size="1.5em" name="check" />
                  </div>
                </q-btn>
                <q-btn
                  dense
                  outline
                  color="red"
                  icon="close"
                  size="sm"
                  @click="handleDecline(props.nestle[index])"
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
  nestle: Array,
  sales_report_id: Number,
});

console.log("Porpsosp", props);

const $q = useQuasar();

console.log("nestessse", props.nestle);

const handleConfirm = async (nestle) => {
  const payload = {
    id: nestle.id,
    status: "confirmed",
    type: "nestle",
    employee_id: employee_id,
    sales_report_id: props.sales_report_id,
    branches_id: branches_id,
    remaining: nestle.remaining,
  };

  console.log("payload to confirm", payload);

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

const handleDecline = (nestleData, sales_report_id) => {
  $q.dialog({
    component: DeclineDialog,
    componentProps: {
      category: "nestle",
      productData: nestleData,
      sales_report_id: sales_report_id,
    },
  });
};
</script>

<style>
.box {
  border: 1px dashed #f44336;
  border-radius: 10px;
}
</style>
