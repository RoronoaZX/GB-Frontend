<template>
  <div class="text-h6 text-brown" align="center" color="brown">Bread List</div>
  <div>
    <q-list dense separator class="box">
      <q-item>
        <q-item-section align="justify">
          <q-item-label class="text-overline"> Product Name </q-item-label>
        </q-item-section>

        <q-item-section align="justify">
          <q-item-label class="text-overline text-center"> Price </q-item-label>
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

      <div v-for="(bread, index) in props.bread" :key="index">
        <q-item>
          <q-item-section>
            <q-item-label class="text-caption" align="justify">
              <span>{{ capitalizeFirstLetter(bread.bread.name || "-") }}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section align="center">
            <q-item-label class="text-caption">
              <span>
                {{ formatPrice(bread.price || "0.00") }}
              </span>
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>{{ bread.remaining || "-" }}</span>
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
                  @click="handleConfirm(props.bread[index])"
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
                    handleDecline(props.bread[index], props.sales_report_id)
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
import { Loading, useQuasar, QSpinnerGears } from "quasar";
import { useSalesReportsStore } from "src/stores/sales-report";

import { typographyFormat } from "src/composables/typography/typography-format";
import DeclineDialog from "../actions-dialog/DeclineDialog.vue";
import { computed, ref } from "vue";

const { capitalizeFirstLetter, formatPrice } = typographyFormat();

const salesReportStore = useSalesReportsStore();

const loading = ref(false);

const userData = computed(() => salesReportStore.user);
console.log("user datasss", userData.value);

const employee_id =
  userData.value?.data?.employee?.id || userData.value?.data?.employee_id || "";

const props = defineProps({
  bread: Array,
  sales_report_id: Number,
});

const $q = useQuasar();

console.log("breadssssss", props);

const handleConfirm = async (bread) => {
  const payload = {
    id: bread.id,
    status: "confirmed",
    type: "bread",
    employee_id: employee_id,
    sales_report_id: props.sales_report_id,
  };

  try {
    Loading.show({
      spinnerColor: "white", // color
      message: "Processing...", // optional message
      messageColor: "white", // optional message color
      backgroundColor: "rgba(0,0,0,0.5)", // overlay background
      delay: 400, // ms
    });
    await salesReportStore.confirmProductsReport(payload);
  } catch (error) {
    console.log(error);
  } finally {
    Loading.hide();
  }
};

const handleDecline = (breadData, sales_report_id) => {
  $q.dialog({
    component: DeclineDialog,
    componentProps: {
      category: "bread",
      productData: breadData,
      sales_report_id: sales_report_id,
    },
  });
};
</script>

<style lang="scss" scoped>
.box {
  border: 1px dashed #795548;
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
