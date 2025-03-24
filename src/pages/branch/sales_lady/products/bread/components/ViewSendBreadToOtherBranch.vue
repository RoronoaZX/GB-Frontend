<template>
  <q-btn class="gradient-icon" flat rounded @click="openDialog">
    <q-icon name="visibility" class="gradient-icon" />
  </q-btn>
  <q-dialog v-model="dialog">
    <q-card padding style="width: 700px; max-width: 80vw">
      <q-card-section class="bg-gradient text-white row justify-between">
        <div class="text-h6">Bread Sent</div>
        {{ report.id }}
        <div>
          <q-btn icon="close" flat dense round v-close-popup />
        </div>
      </q-card-section>
      <q-card-section>
        <div>Remarks: {{ report.remark ? report.remark : "N/A" }}</div>
        <div>Status: {{ report.status }}</div>
      </q-card-section>
      <q-card-section>
        <q-list dense separator class="box">
          <q-item>
            <q-item-section>
              <q-item-label class="text-overline">Product Name</q-item-label>
            </q-item-section>
            <!-- <q-item-section>
              <q-item-label class="text-overline">Price</q-item-label>
            </q-item-section> -->
            <q-item-section side>
              <q-item-label class="text-overline">Added Stocks</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-caption">{{
                report.product.name
              }}</q-item-label>
            </q-item-section>
            <!-- <q-item-section>
              <q-item-label class="text-caption">
                {{ report.price }}
              </q-item-label>
            </q-item-section> -->
            <q-item-section class="text-caption" side>
              {{ report.bread_added }} pcs
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section align="center">
        <div
          v-if="report.to_branch_id === branchId && report.status === 'pending'"
        >
          <div class="text-h6 text-weight-regular">
            Do you want to receive the premix?
          </div>
          <q-btn color="amber-10" label="Yes" icon="check" @click="received">
          </q-btn>
        </div>
        <!-- {{ report.to_branch_id }}
        {{ branchId }} -->
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useBreadProductStore } from "src/stores/bread-product";
import { useQuasar, QSpinnerIos } from "quasar";
import { Loading } from "quasar";

const breadProductStore = useBreadProductStore();
const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};
const props = defineProps(["report", "branchId"]);
console.log("branchId", props.branchId);
console.log("report", props.report);
const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const received = async () => {
  const status = "received";
  const { branchId } = props;
  const report = props.report;
  const report_id = report.id;
  const product_id = report.product.id;
  const bread_added = report.bread_added;

  Loading.show({
    // message: "Receiving premix...",
    spinner: QSpinnerIos,
    // spinnerColor: "grey-1",
    // spinnerSize: 140,
    // backgroundColor: "purple",
    // message: "Some important process is in progress. Hang on...",
    // messageColor: "black",
  });

  console.log("report_id", report_id);

  const sentBreadData = {
    status,
    branchId,
    report_id,
    product_id,
    bread_added,
  };
  console.log("sentBreadData", sentBreadData);
  await breadProductStore.recievedBread(sentBreadData);

  // await breadProductStore.fetchSendBreadToBranch(branchId);
  setTimeout(() => {
    Loading.hide();
    closeDialog();
  }, 2000);
};
</script>

<style lang="scss" scoped>
.bg-gradient {
  // background: linear-gradient(135deg, #6a11cb, #2575fc);
  background: linear-gradient(135deg, #2c3e50, #4ca1af);
  // background: linear-gradient(135deg, #8e44ad, #3498db);
}
.gradient-icon {
  font-size: 24px; /* Adjust size as needed */
  background: linear-gradient(135deg, #2c3e50, #4ca1af); /* Gradient colors */
  -webkit-background-clip: text; /* For compatibility */
  background-clip: text;
  color: transparent; /* Make text fill transparent */
  display: inline-block; /* Ensure proper display */
}
</style>
