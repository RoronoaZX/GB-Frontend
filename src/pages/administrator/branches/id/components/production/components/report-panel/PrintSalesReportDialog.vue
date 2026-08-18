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
/* console.log("Print Sales Report", props.reports); */

const maximizedToggle = ref(true);
const printDialog = ref(false);
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
    content: [
      { text: "Sales Report", style: "header", alignment: "center" },
      {
        text: `Branch: ${salesReport?.branch?.name || "Branch"} | Date: ${formatDate(salesReport?.created_at || new Date())}`,
        alignment: "center",
        margin: [0, 5, 0, 15]
      },
      {
        margin: [0, 25, 0, 0],
        unbreakable: true,
        table: {
          widths: ["32%", "34%", "34%"],
          body: [
            [
              {
                fillColor: "#f8fafc",
                borderColor: ["#cbd5e1", "#cbd5e1", "#cbd5e1", "#cbd5e1"],
                margin: [6, 8, 6, 8],
                stack: [
                  { text: "PREPARED BY (CASHIER):", fontSize: 7, bold: true, color: "#475569" },
                  { text: (salesReport?.user?.employee ? `${salesReport.user.employee.firstname} ${salesReport.user.employee.lastname}` : (salesReport?.user?.name || "Sales Lady / Cashier")).toUpperCase(), fontSize: 8.5, bold: true, color: "#0f172a", margin: [0, 10, 0, 1], alignment: "center" },
                  { text: "____________________________________", color: "#94a3b8", alignment: "center", margin: [0, 0, 0, 2] },
                  { text: "Signature Over Printed Name", fontSize: 6, color: "#64748b", italics: true, alignment: "center", margin: [0, 0, 0, 4] },
                  { text: `Position: ${salesReport?.user?.employee?.position || salesReport?.user?.employee?.designation || 'Sales Lady / Cashier'}`, fontSize: 6.5, color: "#334155" },
                  { text: `Date: ${formatDate(salesReport?.created_at || new Date())}`, fontSize: 6.5, color: "#64748b" }
                ]
              },
              {
                fillColor: "#f8fafc",
                borderColor: ["#cbd5e1", "#cbd5e1", "#cbd5e1", "#cbd5e1"],
                margin: [6, 8, 6, 8],
                stack: [
                  { text: "CHECKED & AUDITED BY:", fontSize: 7, bold: true, color: "#475569" },
                  { text: " ", fontSize: 8.5, bold: true, color: "#0f172a", margin: [0, 10, 0, 1], alignment: "center" },
                  { text: "____________________________________", color: "#94a3b8", alignment: "center", margin: [0, 0, 0, 2] },
                  { text: "Signature Over Printed Name", fontSize: 6, color: "#64748b", italics: true, alignment: "center", margin: [0, 0, 0, 4] },
                  { text: "Position: Branch Supervisor", fontSize: 6.5, color: "#334155" },
                  { text: "Date: ________________________", fontSize: 6.5, color: "#64748b" }
                ]
              },
              {
                fillColor: "#f8fafc",
                borderColor: ["#cbd5e1", "#cbd5e1", "#cbd5e1", "#cbd5e1"],
                margin: [6, 8, 6, 8],
                stack: [
                  { text: "APPROVED BY (ADMIN / OWNER):", fontSize: 7, bold: true, color: "#475569" },
                  { text: " ", fontSize: 8.5, bold: true, color: "#0f172a", margin: [0, 10, 0, 1], alignment: "center" },
                  { text: "____________________________________", color: "#94a3b8", alignment: "center", margin: [0, 0, 0, 2] },
                  { text: "Signature Over Printed Name", fontSize: 6, color: "#64748b", italics: true, alignment: "center", margin: [0, 0, 0, 4] },
                  { text: "Position: General Manager / Admin", fontSize: 6.5, color: "#334155" },
                  { text: "Date: ________________________", fontSize: 6.5, color: "#64748b" }
                ]
              }
            ]
          ]
        },
        layout: {
          hLineWidth: () => 1,
          vLineWidth: () => 1,
          hLineColor: () => "#cbd5e1",
          vLineColor: () => "#cbd5e1"
        }
      }
    ],

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
    pdfUrl.value = dataUrl;
    printDialog.value = true;
  });
};
</script>

<style lang="scss" scoped></style>
