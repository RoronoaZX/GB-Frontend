<template>
  <q-dialog
    ref="dialogRef"
    v-model="printDialog"
    @hide="onDialogHide"
    @ok="openPrintDialog"
    @cancel="onDialogCancel"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <div class="q-ma-sm">
      <div class="q-ma-md" align="center">
        <q-btn icon="close" flat dense round v-close-popup @hide="onDialogHide">
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </div>

      <!-- {{ reports }} -->

      <div>
        <iframe :src="pdfUrl" width="100%" height="700px" />
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { ref } from "vue";
import { date } from "quasar";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const emit = defineEmits(["selectReport", "hide", "ok", "cancel"]);
const props = defineProps(["reports"]);
const salesReport = props.reports;
console.log("Print Sales Report", props.reports);

const maximizedToggle = ref(true);
const pdfUrl = ref("");

const formatDate = (dateString) => {
  return date.formatDate(dateString, "MMMM DD, YYYY");
};

const formatTimeFromDB = (dateString) => {
  const date = new Date(dateString);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleTimeString(undefined, options);
};

const generateDocDefinition = (salesReport) => {
  return {
    content: [{ text: "Sales Report", style: "header", alignment: "center" }],

    styles: {
      header: {
        fontSize: 14,
        bold: false,
        margin: [0, 0, 0, 0],
      },
      subheader: {
        fontSize: 10,
        bold: false,
        margin: [0, 10, 0, 5],
        fillColor: "#595a5a",
      },
      body: {
        fontSize: 9,
      },
      defaultStyle: {
        columnGap: 10, // General gap between any other columns not explicitly set
      },
    },
  };
};

const openPrintDialog = (salesReport) => {
  const docDefinition = generateDocDefinition(salesReport);
  pdfMake.createPdf(docDefinition).getDataUrl((dataUrl) => {
    pdfFonts.value = dataUrl;
    openPrintDialog.value = true;
  });
};
</script>

<style lang="scss" scoped></style>
