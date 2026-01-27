<template>
  <div class="text-h6 text-purple" align="center">Softdrinks List</div>
  <div>
    <q-list dense separator class="box">
      <div>
        <q-item>
          <q-item-section align="justify">
            <q-item-label class="text-overline"> Product Name </q-item-label>
          </q-item-section>

          <q-item-section align="justify">
            <q-item-label class="text-overline text-center">
              Price
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-overline text-center" align="center">
              Remaining
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label class="text-overline text-center">
              Action
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <div v-for="(softdrinks, index) in props.softdrinks" :key="index">
        <q-item>
          <q-item-section>
            <q-item-label class="text-caption" align="justify">
              <span>{{
                capitalizeFirstLetter(softdrinks.softdrinks.name || "-")
              }}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section align="center">
            <q-item-label class="text-caption">
              <span>{{ formatPrice(softdrinks.price || "0.00") }}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section align="center">
            <q-item-label class="text-caption">
              <span>{{ softdrinks.remaining || "-" }}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label class="text-caption">
              <div class="row q-gutter-x-sm">
                <q-btn
                  unelevated
                  dense
                  color="positive"
                  size="sm"
                  no-caps
                  @click="handleConfirm(props.softdrinks[index])"
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
                    handleDecline(
                      props.softdrinks[index],
                      props.sales_report_id
                    )
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

const branches_id =
  userData.value?.device?.reference_id ||
  userData.value?.data?.reference?.id ||
  "";

const props = defineProps({
  softdrinks: Array,
  sales_report_id: Number,
});

const $q = useQuasar();

console.log("softdrinks", props.softdrinks);

const handleConfirm = async (softdrinks) => {
  const payload = {
    id: softdrinks.id,
    status: "confirmed",
    type: "softdrinks",
    employee_id: employee_id,
    sales_report_id: props.sales_report_id,
    branches_id: branches_id,
    remaining: softdrinks.remaining,
  };

  console.log("paysssload", payload);

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

const handleDecline = (softdrinksData, sales_report_id) => {
  $q.dialog({
    component: DeclineDialog,
    componentProps: {
      category: "softdrinks",
      productData: softdrinksData,
      sales_report_id: sales_report_id,
    },
  });
};
</script>

<style lang="scss" scoped>
.box {
  border: 1px dashed #9c27b0;
  border-radius: 10px;
}

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
