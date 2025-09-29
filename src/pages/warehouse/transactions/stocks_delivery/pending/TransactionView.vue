<template>
  <q-dialog ref="dialogRef" v-model="dialog" @hide="onDialogHide">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">From: {{ report.from_name }}</div>
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
                <q-item-section side>
                  <q-item-label> Quantity </q-item-label>
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
                <q-item-section side>
                  <q-item-label>
                    {{ formatQuantity(item.quantity || "No Quantity") }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </template>
          <div v-else class="text-caption text-grey-6 q-mt-md">
            No items in this delivery
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="report-actions q-ma-sm q-gutter-sm" align="right">
        <q-btn
          color="negative"
          label="Decline"
          class="action-btn"
          @click="openDeclineDialog"
        />
        <q-btn
          color="positive"
          label="Confirm"
          class="action-btn"
          @click="openConfirmDialog"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent, useQuasar } from "quasar";
import { ref } from "vue";
import ConfirmDialog from "./ConfirmDialog.vue";
import DeclinePage from "./DeclinedDialog.vue";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

console.log("report", props.report);

const dialog = ref(false);
const $q = useQuasar();

const openDialog = () => {
  dialog.value = true;
};

const formatQuantity = (val) => {
  if (val == null) return "No Quantity";
  return parseFloat(val);
};

const confirmReport = async () => {
  console.log("Confirmed Save logic here APIIIIII...");
  try {
  } catch (error) {}
};

const openConfirmDialog = () => {
  $q.dialog({
    component: ConfirmDialog,
  })
    .onOk(() => {
      // ✅ Called when confirm button is clicked
      confirmReport();
      // Call your save function here
    })
    .onCancel(() => {
      console.log("Cancelled");
    });
};

const openDeclineDialog = () => {
  $q.dialog({
    component: DeclinePage,
  })
    .onOk(() => {
      // ✅ Called when confirm button is clicked
      console.log("Confirmed decline logic here...");
    })
    .onCancel(() => {
      console.log("Cancelled");
    });
};
</script>

<style scoped>
.bg-grey-2 {
  background-color: #f5f7fa !important;
}

.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
