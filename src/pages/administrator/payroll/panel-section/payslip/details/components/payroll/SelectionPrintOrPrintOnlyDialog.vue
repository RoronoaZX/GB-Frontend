<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      style="border-radius: 16px; min-width: 320px"
      class="bg-white q-py-sm shadow-12"
    >
      <q-card-section class="q-pt-sm q-pb-none q-px-md row justify-end">
        <q-btn
          icon="close"
          flat
          round
          dense
          @click="onDialogHide"
          color="grey-8"
        />
      </q-card-section>

      <q-card-section class="text-center q-pt-none q-pb-xs">
        <div class="text-h6 text-weight-bolder q-mb-xs">Action Required</div>
        <div class="text-subtitle2 text-grey-6">
          Please select an option to continue.
        </div>
      </q-card-section>

      <q-card-section class="q-px-md q-pb-md">
        <q-btn
          no-caps
          color="light-green-10"
          class="full-width q-mb-sm q-py-sm text-white"
          style="border-radius: 10px; font-size: 1rem"
          @click="onOKClick"
        >
          <!-- <q-icon name="print" left size="1.2rem" />
          <q-icon name="send" right size="1.2rem" /> -->
          <div class="text-subtitle1 text-weight-bold q-ml-sm">
            Print & Save
          </div>
        </q-btn>

        <q-btn
          no-caps
          flat
          color="grey-8"
          class="full-width q-py-sm"
          style="border-radius: 10px; font-size: 1rem"
          @click="onCancelClick"
        >
          <q-icon name="send" left size="1.2rem" />
          <div class="text-subtitle1 text-weight-bold q-ml-sm">Just Save</div>
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps({
  payslipDataToBeSend: Object,
});

console.log("print or saave options", props.payslipDataToBeSend);

const onOKClick = () => {
  onDialogOK("save_and_print");
};

const onCancelClick = () => {
  onDialogCancel();
};
</script>
