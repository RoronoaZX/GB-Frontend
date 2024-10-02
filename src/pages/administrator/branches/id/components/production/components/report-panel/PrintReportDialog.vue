<template>
  <q-dialog
    ref="dialogRef"
    v-model="dialog"
    @hide="onDialogHide"
    @ok="openPrintDialog"
    @cancel="onDialogCancel"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <div class="q-ma-sm">
      <div class="q-ma-md" align="center">
        <q-btn icon="close" flat dense round v-close-popup class="text-white">
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </div>

      <!-- {{ reports }} -->
      <div class="q-ma-sm">
        <div>
          <iframe :src="pdfUrl" width="100%" height="700px" />
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useDialogPluginComponent } from "quasar";
import { date } from "quasar";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps(["reports"]);
console.log("Print Report", props.reports);

const emit = defineEmits(["selectReport", "hide", "ok", "cancel"]);
const maximizedToggle = ref(true);
const dialog = ref(false);
const pdfUrl = ref("");

const handleButtonClick = () => {
  emit("selectReport", props.reports);
  dialog.value = true;
};

const getBreadReports = (reportsData) => {
  if (!reportsData) {
    console.error("No bakerReport provided");
    return [];
  }

  if (reportsData.recipe_category === "Filling") {
    return reportsData.filling_bakers_reports || [];
  } else if (reportsData.recipe_category === "Dough") {
    return reportsData.bread_production_reports || [];
  } else {
    return [];
  }
};

const openPrintDialog = (bakerReport) => {
  emit("selectReport", props.reports);
  const docDefinition = generateDocDefinition(bakerReport);
  pdfMake.createPdf(docDefinition).getDataUrl((dataUrl) => {
    pdfUrl.value = dataUrl;
    const dialog = ref(false);
  });
};

const generateDocDefinition = (bakerReport) => {
  return {
    content: [
      { text: "Baker Report", style: "header", alignment: "center" },
      {
        columns: [
          {
            text: `Date: ${formatDate(report.date)}
                Time: ${formatTimeFromDB(bakerReport.created_at)}
                Baker: ${bakerReport?.user?.name || "Unknown Baker Name"}
                Recipe: ${bakerReport.recipe?.name || "Unknown Recipe"} (${
              bakerReport.recipe_category || "Unknown Category"
            })
              Branch Name: ${report.branch_name}`,
            style: "subheader",
            width: "80%", // Adjust width if necessary
          },
          {
            text: `Target: ${bakerReport.recipe?.target} pcs
                   Actual Target: ${bakerReport.actual_target} pcs
                   Kilo: ${bakerReport?.kilo} kg/s
                   Over: ${bakerReport?.over} pcs
                   Short: ${bakerReport?.short} pcs`,
            style: "subheader",
          },
        ],
      },
      {
        columns: [
          {
            width: "50%",
            stack: [
              {
                text: "Bread Production",
                style: "subheader",
                alignment: "center",
              },
              {
                table: {
                  headerRows: 1,
                  widths: ["*", "*"],
                  body: [
                    [
                      {
                        text: "Bread Name",
                        style: "body",
                        alignment: "center",
                      },
                      {
                        text: "Production",
                        style: "body",
                        alignment: "center",
                      },
                    ],
                    ...getBreadReports(bakerReport).map((breadReport) => [
                      {
                        text: breadReport?.bread?.name || "Unknown Bread",
                        style: "body",
                      },
                      {
                        text:
                          bakerReport.recipe_category === "Filling"
                            ? `${breadReport?.filling_production || "0"} pcs`
                            : `${breadReport?.bread_production || "0"} pcs`,
                        style: "body",
                      },
                    ]),
                  ],
                },
              },
            ],
            columnGap: 10, // Gap within the Bread Production column
          },
          {
            width: "50%",
            stack: [
              {
                text: "Ingredients",
                style: "subheader",
                alignment: "center",
              },
              {
                table: {
                  headerRows: 1,
                  widths: ["*", "*"],
                  body: [
                    [
                      {
                        text: "Ingredient Code",
                        style: "body",
                        alignment: "center",
                      },
                      { text: "Quantity", style: "body", alignment: "center" },
                    ],
                    ...(bakerReport.ingredient_bakers_reports || []).map(
                      (ingredient) => [
                        {
                          text:
                            ingredient?.ingredients?.code ||
                            "Unknown Ingredient",
                          style: "body",
                        },
                        {
                          text: `${
                            ingredient?.quantity || "Unknown Quantity"
                          } ${ingredient?.ingredients?.unit || ""}`,
                          style: "body",
                        },
                      ]
                    ),
                  ],
                },
              },
            ],
            columnGap: 10, // Gap within the Ingredients column
          },
        ],
        columnGap: 20, // Gap between the Bread Production and Ingredients columns
      },
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
</script>

<style lang="scss" scoped></style>
