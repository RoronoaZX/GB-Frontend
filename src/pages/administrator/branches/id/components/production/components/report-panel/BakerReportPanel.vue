<template>
  <div>
    <q-card class="my-card q-pa-md">
      <!-- Header details and export buttons (shown only when reports exist) -->
      <div v-if="reportsData && reportsData.length > 0" class="row justify-between items-center q-mb-md">
        <div>
          <div class="text-h6 text-weight-bold">Baker Report</div>
          <div class="text-subtitle1 text-weight-regular">
            <div>
              Name:
              {{
                formatFullname(
                  reportsData[0]?.user?.employee ||
                    reportsData[1]?.user?.employee ||
                    "No name available"
                )
              }}
            </div>
            <div>
              Date:
              {{
                `${formatDate(
                  props.bakersReport[0]?.created_at ||
                    props.bakersReport[1]?.created_at ||
                    "No name available"
                )}`
              }}
            </div>
            <div>Overall Total Kilos (kgs) : {{ overallKiloTotal }}</div>
          </div>
        </div>
        <div class="row q-gutter-xs items-center">
          <q-btn
            color="primary"
            icon="print"
            label="Print All"
            unelevated
            class="q-px-sm"
            @click="triggerFullReportPrint"
          >
            <q-tooltip>Print / Preview Entire Baker Report</q-tooltip>
          </q-btn>
          <q-btn
            color="negative"
            icon="picture_as_pdf"
            label="Export PDF"
            outline
            class="q-px-sm"
            @click="triggerFullReportPdfDownload"
          >
            <q-tooltip>Export Entire Baker Report PDF</q-tooltip>
          </q-btn>
          <q-btn
            color="positive"
            icon="file_download"
            label="Export Excel"
            outline
            class="q-px-sm"
            @click="triggerFullReportExcelDownload"
          >
            <q-tooltip>Export Entire Baker Report Excel (.xls)</q-tooltip>
          </q-btn>
        </div>
      </div>
      <q-card-section>
        <!-- Modern Empty State UI -->
        <div v-if="!reportsData || reportsData.length === 0" class="q-pa-xl text-center">
          <q-avatar size="80px" color="purple-1" text-color="purple-9" class="q-mb-md">
            <q-icon name="bakery_dining" size="48px" />
          </q-avatar>
          <div class="text-h6 text-weight-bold text-grey-9">No Baker Production Report Recorded</div>
          <div class="text-subtitle2 text-grey-6 q-mt-xs q-mb-md" style="max-width: 500px; margin-left: auto; margin-right: auto;">
            No baker production reports have been submitted for this shift yet. Bakers have not logged dough or filling recipe runs for this date.
          </div>
        </div>

        <q-table
          v-else
          class="table-container sticky-header2"
          :columns="BakerReportsColumns"
          :rows="reportsData"
          row-key="name"
          :header-class="'custom-header'"
          virtual-scroll
          :virtual-scroll-item-size="48"
          :virtual-scroll-sticky-size-start="48"
          :pagination="pagination"
          :rows-per-page-options="[0]"
        >
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-badge align="middle" :color="getStatusColor(props.row.status)">
                {{ capitalizeFirstLetter(props.row.status) }}
              </q-badge>
            </q-td>
          </template>
          <template v-slot:body-cell-combined_bakers_reports="props">
            <q-td :props="props">
              <q-btn
                class="gradient-icon"
                flat
                rounded
                @click="
                  handleBreadDialog(
                    props.row.combined_bakers_reports,
                    props.row.branch_recipe
                  )
                "
              >
                <q-icon name="visibility" class="gradient-icon" />
                <q-tooltip class="gradient-tooltip">View Breads</q-tooltip>
              </q-btn>
            </q-td>
          </template>
          <template v-slot:body-cell-ingredients_reports="props">
            <q-td :props="props">
              <q-btn
                class="gradient-icon2"
                flat
                rounded
                @click="
                  handleIngredientsDialog(
                    props.row.ingredient_bakers_reports,
                    props.row.branch_recipe
                  )
                "
              >
                <q-icon name="visibility" class="gradient-icon2" />
                <q-tooltip class="gradient-tooltip">View Ingredients</q-tooltip>
              </q-btn>
            </q-td>
          </template>
          <!-- Action Menu -->
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn
                dense
                flat
                round
                icon="more_vert"
                aria-label="Action Menu"
                @click="toggleMenu(props.row)"
              />
              <q-menu
                v-model="props.row.menu"
                anchor="bottom right"
                self="top right"
                transition-show="jump-down"
                transition-hide="jump-up"
              >
                <q-list style="min-width: 100px">
                  <q-item
                    clickable
                    v-close-popup
                    @click="openPrintDialog(props.row)"
                  >
                    <q-item-section avatar>
                      <q-icon name="print" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Print</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="
                      handleBakerReportEditDialog(props.row, sales_report_id)
                    "
                  >
                    <q-item-section avatar>
                      <q-icon name="edit" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Edit</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <q-dialog
      v-model="printDialog"
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <div class="q-pa-md" style="width: 100%">
        <q-card class="bg-dark column full-height">
          <q-card-section
            class="row justify-between items-center bg-primary text-white q-py-sm"
          >
            <div class="row items-center">
              <q-icon name="picture_as_pdf" size="sm" class="q-mr-sm" />
              <div class="text-h6">
                {{ currentReport?.user?.employee ? formatFullname(currentReport.user.employee) : (currentReport?.user?.name || 'Baker') }} Baker Report PDF
              </div>
            </div>
            <div>
              <q-btn
                dense
                flat
                icon="download"
                class="q-mr-sm"
                @click="triggerDownload"
              >
                <q-tooltip>Download PDF</q-tooltip>
              </q-btn>
              <q-btn
                dense
                flat
                icon="print"
                class="q-mr-sm"
                @click="triggerPhysicalPrint"
              >
                <q-tooltip>Print Document</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip>Close</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-card-section class="col q-pa-none">
            <iframe
              :src="pdfUrl"
              width="100%"
              height="100%"
              style="border: none"
            />
          </q-card-section>
        </q-card>
      </div>
    </q-dialog>

    <!-- PDF Download Password Confirmation Dialog -->
    <PasswordAuthDialog
      v-model="passwordConfirmDialog"
      :label="passwordConfirmTarget?.label"
      :description="passwordConfirmTarget?.description"
      v-model:password="passwordConfirmInput"
      v-model:showPassword="passwordConfirmShow"
      :loading="passwordConfirmLoading"
      @confirm="handlePasswordConfirmSubmit"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { date, useQuasar } from "quasar";
import BreadView from "./baker-report/BreadView.vue";
import IngredientsView from "./baker-report/IngredientsView.vue";
import { usePasswordConfirm } from "src/composables/usePasswordConfirm";
import PasswordAuthDialog from "src/components/PasswordAuthDialog.vue";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import EditBakersReport from "./baker-report/EditBakersReport.vue";

import { typographyFormat } from "src/composables/typography/typography-format";
import { badgeColor } from "src/composables/badge-color/badge-color";

const {
  capitalizeFirstLetter,
  formatFullname,
  formatDate,
  formatTime,
  formatRecipeTarget,
  trimTrailingZeros,
} = typographyFormat();
const { getStatusColor } = badgeColor();
// import AddingBakerReportRecipe from "./AddingBakerReportRecipe.vue";
pdfMake.vfs = pdfFonts.default;
// import PrintReportDialog from "./PrintReportDialog.vue";

const props = defineProps(["bakersReport", "sales_report_id"]);
const reportsData = props.bakersReport;
/* console.log("Bakers Report", props.bakersReport); */
const maximizedToggle = ref(true);
const printDialog = ref(false);
const showing = ref(false);
const pagination = ref({
  rowsPerPage: 0,
});

const {
  passwordConfirmDialog,
  passwordConfirmInput,
  passwordConfirmShow,
  passwordConfirmLoading,
  passwordConfirmTarget,
  promptPasswordConfirm,
  handlePasswordConfirmSubmit,
} = usePasswordConfirm();

const pdfUrl = ref("");
const currentReport = ref(null);
const currentDocDefinition = ref(null);

const triggerDownload = () => {
  if (currentDocDefinition.value) {
    const bakerName = currentReport.value?.user?.employee 
      ? formatFullname(currentReport.value.user.employee) 
      : (currentReport.value?.user?.name || "Baker");
    const recipeName = currentReport.value?.recipe?.name || "Recipe";
    const dateStr = currentReport.value?.created_at 
      ? date.formatDate(currentReport.value.created_at, "YYYY-MM-DD")
      : date.formatDate(new Date(), "YYYY-MM-DD");
    const filename = `Baker_Report_${bakerName.replace(/\s+/g, "_")}_${recipeName.replace(/\s+/g, "_")}_${dateStr}.pdf`;

    promptPasswordConfirm({
      label: `Baker Production Report PDF (${bakerName} - ${recipeName})`,
      description: "Please enter your admin password to authorize downloading the confidential",
      onConfirm: () => {
        pdfMake.createPdf(currentDocDefinition.value).download(filename);
      },
    });
  }
};

const triggerPhysicalPrint = () => {
  if (currentDocDefinition.value) {
    const bakerName = currentReport.value?.user?.employee 
      ? formatFullname(currentReport.value.user.employee) 
      : (currentReport.value?.user?.name || "Baker");
    const recipeName = currentReport.value?.recipe?.name || "Recipe";

    promptPasswordConfirm({
      label: `Baker Production Report (Print - ${bakerName} - ${recipeName})`,
      description: "Please enter your admin password to authorize printing the confidential",
      onConfirm: () => {
        pdfMake.createPdf(currentDocDefinition.value).print();
      },
    });
  }
};

const generateFullBakerReportDocDefinition = () => {
  const bakerName = formatFullname(
    reportsData[0]?.user?.employee ||
      reportsData[1]?.user?.employee ||
      reportsData[0]?.user?.name ||
      "Baker"
  );
  const branchName = capitalizeFirstLetter(
    reportsData[0]?.branch?.name || "Branch"
  );
  const dateStr = formatDate(
    props.bakersReport[0]?.created_at || props.bakersReport[1]?.created_at
  );

  const tableBody = [
    [
      { text: "Recipe Name", style: "tableHeader", alignment: "left" },
      { text: "Category", style: "tableHeader", alignment: "center" },
      { text: "Kilo (kgs)", style: "tableHeader", alignment: "center" },
      { text: "Target", style: "tableHeader", alignment: "center" },
      { text: "Actual Target", style: "tableHeader", alignment: "center" },
      { text: "Production", style: "tableHeader", alignment: "center" },
      { text: "Over", style: "tableHeader", alignment: "center" },
      { text: "Short", style: "tableHeader", alignment: "center" },
    ],
  ];

  (reportsData || []).forEach((row) => {
    const recipeName = capitalizeFirstLetter(
      row?.branch_recipe?.recipe?.name || row?.recipe_name || "Unknown Recipe"
    );
    const category = row?.recipe_category || "Dough";
    const kiloVal = trimTrailingZeros(row.kilo || 0);
    const targetVal = row.target || 0;
    const actualTargetVal = Math.ceil((row.target || 0) * (row.kilo || 0));

    const breads = row.combined_bakers_reports || [];
    const totalProdPcs = breads.reduce(
      (sum, b) => sum + (Number(b.bread_production) || 0),
      0
    );

    // Parent Recipe Summary Row
    tableBody.push([
      { text: recipeName, bold: true, fillColor: "#f8fafc" },
      { text: category, alignment: "center", fillColor: "#f8fafc" },
      { text: `${kiloVal} kg`, alignment: "center", fillColor: "#f8fafc" },
      { text: targetVal.toString(), alignment: "center", fillColor: "#f8fafc" },
      { text: `${actualTargetVal} pcs`, alignment: "center", fillColor: "#f8fafc" },
      { text: `${totalProdPcs} pcs`, alignment: "center", bold: true, fillColor: "#f8fafc" },
      { text: (row.over || 0).toString(), alignment: "center", color: (row.over || 0) > 0 ? "#16a34a" : "#334155", fillColor: "#f8fafc" },
      { text: (row.short || 0).toString(), alignment: "center", color: (row.short || 0) > 0 ? "#dc2626" : "#334155", fillColor: "#f8fafc" },
    ]);

    // Grouped Bread Breakdown Rows
    breads.forEach((bread) => {
      const rawBreadName =
        bread?.bread?.name || bread?.bread_name || "Bread Product";
      const breadName = capitalizeFirstLetter(rawBreadName);
      const pcs = bread.bread_production || 0;
      tableBody.push([
        {
          text: `   - ${breadName}`,
          italics: true,
          color: "#475569",
          margin: [10, 0, 0, 0],
        },
        { text: "", colSpan: 4 },
        {},
        {},
        {},
        { text: `${pcs} pcs`, alignment: "center", italics: true, color: "#475569" },
        { text: "-", alignment: "center", color: "#94a3b8" },
        { text: "-", alignment: "center", color: "#94a3b8" },
      ]);
    });
  });

  // Footer Total Kilos Row
  tableBody.push([
    { text: "TOTAL KILOS", bold: true, colSpan: 2, fillColor: "#e2e8f0" },
    {},
    {
      text: overallKiloTotal.value,
      bold: true,
      alignment: "center",
      fillColor: "#e2e8f0",
      color: "#0f172a",
    },
    { text: "", colSpan: 5, fillColor: "#e2e8f0" },
    {},
    {},
    {},
    {},
  ]);

  return {
    content: [
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                fillColor: "#0f172a",
                stack: [
                  {
                    text: "GB BAKESHOP — BAKER PRODUCTION REPORT",
                    color: "#ffffff",
                    fontSize: 14,
                    bold: true,
                    alignment: "center",
                    margin: [0, 6, 0, 2],
                  },
                  {
                    text: `LOCATION: ${branchName.toUpperCase()} | BAKER: ${bakerName.toUpperCase()} | DATE: ${dateStr}`,
                    color: "#38bdf8",
                    fontSize: 8,
                    bold: true,
                    alignment: "center",
                    margin: [0, 0, 0, 6],
                  },
                ],
                border: [false, false, false, false],
              },
            ],
          ],
        },
        margin: [0, -10, 0, 15],
      },
      {
        text: "Recipe Production Summary & Bread Breakdown",
        style: "subheader",
        bold: true,
        margin: [0, 0, 0, 6],
      },
      {
        table: {
          headerRows: 1,
          widths: ["*", "auto", "auto", "auto", "auto", "auto", "auto", "auto"],
          body: tableBody,
        },
        layout: {
          hLineWidth: (i, node) => (i === 0 || i === 1 || i === node.table.body.length ? 1.5 : 0.5),
          vLineWidth: () => 0,
          hLineColor: () => "#cbd5e1",
        },
        margin: [0, 0, 0, 20],
      },
      {
        unbreakable: true,
        table: {
          widths: ["48%", "4%", "48%"],
          body: [
            [
              {
                fillColor: "#f8fafc",
                borderColor: ["#cbd5e1", "#cbd5e1", "#cbd5e1", "#cbd5e1"],
                margin: [10, 8, 10, 8],
                stack: [
                  { text: "PREPARED BY (BAKER):", fontSize: 7.5, bold: true, color: "#475569" },
                  { text: bakerName, fontSize: 9.5, bold: true, color: "#0f172a", margin: [0, 14, 0, 1], alignment: "center" },
                  { text: "________________________________________", color: "#94a3b8", alignment: "center", margin: [0, 0, 0, 2] },
                  { text: "Signature Over Printed Name", fontSize: 6.5, color: "#64748b", italics: true, alignment: "center" },
                ],
              },
              { text: "", border: [false, false, false, false] },
              {
                fillColor: "#f8fafc",
                borderColor: ["#cbd5e1", "#cbd5e1", "#cbd5e1", "#cbd5e1"],
                margin: [10, 8, 10, 8],
                stack: [
                  { text: "REVIEWED BY (SUPERVISOR / ADMIN):", fontSize: 7.5, bold: true, color: "#475569" },
                  { text: " ", fontSize: 9.5, bold: true, color: "#0f172a", margin: [0, 14, 0, 1], alignment: "center" },
                  { text: "________________________________________", color: "#94a3b8", alignment: "center", margin: [0, 0, 0, 2] },
                  { text: "Signature Over Printed Name", fontSize: 6.5, color: "#64748b", italics: true, alignment: "center" },
                ],
              },
            ],
          ],
        },
        layout: {
          hLineWidth: () => 1,
          vLineWidth: () => 1,
          hLineColor: () => "#cbd5e1",
          vLineColor: () => "#cbd5e1",
        },
      },
    ],
    footer: (currentPage, pageCount) => ({
      columns: [
        {
          text: "Report generated via GB Bakeshop Admin Console",
          style: "footerText",
          alignment: "left",
          margin: [20, 0, 0, 0],
        },
        {
          text: `Page ${currentPage.toString()} of ${pageCount.toString()}`,
          style: "footerText",
          alignment: "right",
          margin: [0, 0, 20, 0],
        },
      ],
    }),
    styles: {
      header: { fontSize: 14, bold: true, color: "#0f172a" },
      subheader: { fontSize: 10, bold: true, color: "#0f172a" },
      tableHeader: { bold: true, fontSize: 8, color: "#ffffff", fillColor: "#1e293b", margin: [0, 3, 0, 3] },
      footerText: { fontSize: 7, color: "#64748b", italics: true },
    },
    defaultStyle: { font: "Roboto", fontSize: 8 },
    pageSize: "A4",
    pageOrientation: "portrait",
    pageMargins: [20, 20, 20, 30],
  };
};

const triggerFullReportPrint = () => {
  const bakerName = formatFullname(
    reportsData[0]?.user?.employee || "Baker"
  );
  const docDef = generateFullBakerReportDocDefinition();

  promptPasswordConfirm({
    label: `Print Baker Report (${bakerName})`,
    description: "Please enter your admin password to authorize printing the confidential Baker Production Report",
    onConfirm: () => {
      pdfMake.createPdf(docDef).print();
    },
  });
};

const triggerFullReportPdfDownload = () => {
  const bakerName = formatFullname(
    reportsData[0]?.user?.employee || "Baker"
  );
  const dateStr = formatDate(
    props.bakersReport[0]?.created_at
  );
  const docDef = generateFullBakerReportDocDefinition();
  const filename = `Baker_Report_${bakerName.replace(/\s+/g, "_")}_${dateStr.replace(/\s+/g, "_")}.pdf`;

  promptPasswordConfirm({
    label: `Baker Production Report PDF (${bakerName})`,
    description: "Please enter your admin password to authorize downloading the confidential Baker Production Report",
    onConfirm: () => {
      pdfMake.createPdf(docDef).download(filename);
    },
  });
};

const triggerFullReportExcelDownload = () => {
  const bakerName = formatFullname(
    reportsData[0]?.user?.employee || "Baker"
  );
  const branchName = capitalizeFirstLetter(
    reportsData[0]?.branch?.name || "Branch"
  );
  const dateStr = formatDate(
    props.bakersReport[0]?.created_at
  );

  promptPasswordConfirm({
    label: `Export Baker Report Excel (${bakerName})`,
    description: "Please enter your admin password to authorize downloading the Baker Production Report spreadsheet",
    onConfirm: () => {
      executeFullReportExcelExport(bakerName, branchName, dateStr);
    },
  });
};

const executeFullReportExcelExport = (bakerName, branchName, dateStr) => {
  let rowsHtml = "";

  (reportsData || []).forEach((row) => {
    const recipeName = capitalizeFirstLetter(
      row?.branch_recipe?.recipe?.name || row?.recipe_name || "Unknown Recipe"
    );
    const category = row?.recipe_category || "Dough";
    const kiloVal = trimTrailingZeros(row.kilo || 0);
    const targetVal = row.target || 0;
    const actualTargetVal = Math.ceil((row.target || 0) * (row.kilo || 0));
    const breads = row.combined_bakers_reports || [];
    const totalProdPcs = breads.reduce(
      (sum, b) => sum + (Number(b.bread_production) || 0),
      0
    );

    // Parent Recipe Row
    rowsHtml += `
      <tr style="background-color: #f1f5f9; font-weight: bold;">
        <td style="border: 1px solid #cbd5e1; padding: 6px;">${recipeName}</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px; text-align: center;">${category}</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px; text-align: center;">${kiloVal} kg</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px; text-align: center;">${targetVal}</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px; text-align: center;">${actualTargetVal} pcs</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px; text-align: center;">${totalProdPcs} pcs</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px; text-align: center; color: ${row.over > 0 ? 'green' : 'black'};">${row.over || 0}</td>
        <td style="border: 1px solid #cbd5e1; padding: 6px; text-align: center; color: ${row.short > 0 ? 'red' : 'black'};">${row.short || 0}</td>
      </tr>
    `;

    // Grouped Child Bread Rows
    breads.forEach((bread) => {
      const rawBreadName = bread?.bread?.name || bread?.bread_name || "Bread Product";
      const breadName = capitalizeFirstLetter(rawBreadName);
      const pcs = bread.bread_production || 0;
      rowsHtml += `
        <tr style="color: #475569; font-style: italic;">
          <td style="border: 1px solid #e2e8f0; padding: 4px 6px 4px 24px;">- ${breadName}</td>
          <td style="border: 1px solid #e2e8f0; padding: 4px 6px; text-align: center;">-</td>
          <td style="border: 1px solid #e2e8f0; padding: 4px 6px; text-align: center;">-</td>
          <td style="border: 1px solid #e2e8f0; padding: 4px 6px; text-align: center;">-</td>
          <td style="border: 1px solid #e2e8f0; padding: 4px 6px; text-align: center;">-</td>
          <td style="border: 1px solid #e2e8f0; padding: 4px 6px; text-align: center;">${pcs} pcs</td>
          <td style="border: 1px solid #e2e8f0; padding: 4px 6px; text-align: center;">-</td>
          <td style="border: 1px solid #e2e8f0; padding: 4px 6px; text-align: center;">-</td>
        </tr>
      `;
    });
  });

  const excelTemplate = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>Baker Production Report</x:Name>
              <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <style>
        body { font-family: Arial, sans-serif; font-size: 12px; }
        .title { font-size: 16px; font-weight: bold; text-align: center; background-color: #0f172a; color: #ffffff; padding: 10px; }
        .meta { font-size: 11px; text-align: center; background-color: #0f172a; color: #38bdf8; padding: 4px; font-weight: bold; }
        .header-cell { background-color: #1e293b; color: #ffffff; font-weight: bold; text-align: center; border: 1px solid #0f172a; padding: 6px; }
        .total-cell { background-color: #cbd5e1; font-weight: bold; border: 1px solid #94a3b8; padding: 6px; text-align: center; }
      </style>
    </head>
    <body>
      <table>
        <tr><td colspan="8" class="title">GB BAKESHOP — BAKER PRODUCTION REPORT</td></tr>
        <tr><td colspan="8" class="meta">LOCATION: ${branchName.toUpperCase()} | BAKER: ${bakerName.toUpperCase()} | DATE: ${dateStr}</td></tr>
        <tr><td colspan="8"></td></tr>
        <thead>
          <tr>
            <th class="header-cell">Recipe Name</th>
            <th class="header-cell">Category</th>
            <th class="header-cell">Kilo (kgs)</th>
            <th class="header-cell">Target Pcs</th>
            <th class="header-cell">Actual Target</th>
            <th class="header-cell">Total Production</th>
            <th class="header-cell">Over</th>
            <th class="header-cell">Short</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="total-cell" style="text-align: left;">TOTAL KILOS</td>
            <td class="total-cell">${overallKiloTotal.value}</td>
            <td colspan="5" class="total-cell"></td>
          </tr>
        </tfoot>
      </table>
      <br/><br/>
      <table>
        <tr>
          <td colspan="4" style="text-align: center; vertical-align: top; border: 1px solid #cbd5e1; padding: 10px; background-color: #f8fafc;">
            <div style="font-weight: bold; font-size: 9px; color: #475569; text-align: left;">PREPARED BY (BAKER):</div>
            <div style="font-weight: bold; font-size: 11px; color: #0f172a; margin-top: 10px;">${bakerName}</div>
            <div style="color: #94a3b8;">________________________________________</div>
            <div style="font-size: 8px; color: #64748b; font-style: italic;">Signature Over Printed Name</div>
          </td>
          <td colspan="4" style="text-align: center; vertical-align: top; border: 1px solid #cbd5e1; padding: 10px; background-color: #f8fafc;">
            <div style="font-weight: bold; font-size: 9px; color: #475569; text-align: left;">REVIEWED BY (SUPERVISOR / ADMIN):</div>
            <div style="font-weight: bold; font-size: 11px; color: #0f172a; margin-top: 10px;">&nbsp;</div>
            <div style="color: #94a3b8;">________________________________________</div>
            <div style="font-size: 8px; color: #64748b; font-style: italic;">Signature Over Printed Name</div>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(["\uFEFF" + excelTemplate], {
    type: "application/vnd.ms-excel;charset=utf-8",
  });
  const filename = `Baker_Report_${bakerName.replace(/\s+/g, "_")}_${dateStr.replace(/\s+/g, "_")}.xls`;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  $q.notify({
    message: `Exported Baker Report Excel: ${filename}`,
    type: "positive",
    position: "top-right",
    icon: "file_download",
  });
};
const $q = useQuasar();
const handleBreadDialog = (breadProduction, branchRecipe) => {
  $q.dialog({
    component: BreadView,
    componentProps: {
      breadProduction: breadProduction,
      branchRecipe: branchRecipe,
    },
  });
};

const handleIngredientsDialog = (ingredientProduction, branchRecipe) => {
  $q.dialog({
    component: IngredientsView,
    componentProps: {
      ingredientProduction: ingredientProduction,
      branchRecipe: branchRecipe,
    },
  });
};

const handleBakerReportEditDialog = (bakerReports, salesReportID) => {
  $q.dialog({
    component: EditBakersReport,
    componentProps: {
      bakerReports: bakerReports,
      sales_report_id: salesReportID,
    },
  });
};

const overallKiloTotal = computed(() => {
  if (!reportsData || reportsData.length === 0) return "0 kgs";

  /* console.log("dafsdfasdfsad", reportsData); */

  const total = reportsData
    .filter((row) => row.status === "confirmed") // ✅ only confirmed
    .reduce((sum, row) => {
      const kilo = parseFloat(row.kilo) || 0;
      return sum + kilo;
    }, 0);

  // Show decimal only if needed
  const isWhole = total % 1 === 0;

  return isWhole ? `${total.toFixed(0)} kgs` : `${total.toFixed(2)} kgs`;
});

const getBreadReports = (reportsData) => {
  if (!reportsData) {
    console.error("No bakerReport provided");
    return [];
  }

  if (reportsData.recipe_category === "Filling") {
    return reportsData.filling_bakers_reports || [];
  } else if (reportsData.recipe_category === "Dough") {
    return reportsData.bread_bakers_reports || [];
  } else {
    return [];
  }
};

const BakerReportsColumns = [
  {
    name: "recipe_name",
    align: "center",
    label: "Recipe Name",
    field: (row) => {
      if (row.branch_recipe && row.branch_recipe.recipe) {
        return {
          name: capitalizeFirstLetter(row?.branch_recipe?.recipe?.name || ""),
          category: row.branch_recipe.recipe.category,
        };
      } else {
        return {
          name: "N/A", // Fallback value for name
          category: "N/A", // Fallback value for category
        };
      }
    },
    format: (val) => `${capitalizeFirstLetter(val.name)} (${val.category})`,
    sortable: true,
  },
  {
    name: "created_at",
    align: "center",
    label: "Time",
    field: "created_at",
    format: (val) => formatTime(val),
  },
  {
    name: "kilo",
    align: "center",
    label: "Kilo / s",
    field: "kilo",
    format: (val) => `${trimTrailingZeros(val)}`,
  },
  {
    name: "actual_target",
    align: "center",
    label: "Actual Target",
    field: (row) => row.target * row.kilo,
    format: (val) => `${Math.ceil(val)}`,
  },
  {
    name: "over",
    align: "center",
    label: "Over",
    field: "over",
    format: (val) => `${val}`,
  },
  {
    name: "short",
    align: "center",
    label: "Short",
    field: "short",
    format: (val) => `${val}`,
  },
  {
    name: "status",
    align: "center",
    label: "Status",
    field: "status",
  },
  {
    name: "combined_bakers_reports",
    align: "center",
    label: "Breads",
    field: "combined_bakers_reports",
  },
  {
    name: "ingredients_reports",
    align: "center",
    label: "Ingredients",
    field: "ingredients_reports",
  },
  {
    name: "action",
    align: "center",
    label: "Action",
    field: "action",
  },
];

const generateDocDefinition = (bakerReport) => {
  /* console.log("bakerReport in print", bakerReport); */
  const recipeName = `${
    capitalizeFirstLetter(bakerReport?.branch_recipe?.recipe?.name) ??
    "Unkown Recipe"
  } (${bakerReport?.recipe_category ?? "Unkown Category"})`;
  const target = bakerReport?.branch_recipe?.target ?? 0;
  const actualTarget = bakerReport?.actual_target ?? 0;
  const kilo = bakerReport?.kilo ?? 0;
  const over = bakerReport?.over ?? 0;
  const short = bakerReport?.short ?? 0;

  const summaryTable = {
    table: {
      widths: ["50%", "50%"],
      body: [
        [
          { text: "Recipe Name", style: "tableHeader", alignment: "left" },
          {
            text: recipeName,
            style: "tableHeader",
            alignment: "center",
          },
        ],
        [
          { text: "Target per Kilo", style: "tableHeader", alignment: "left" },
          {
            text: `${formatRecipeTarget(target)} pcs`,
            style: "tableHeader",
            alignment: "center",
          },
        ],
        [
          { text: "Actual Target", style: "tableHeader", alignment: "left" },
          {
            text: `${actualTarget} pcs`,
            style: "tableHeader",
            alignment: "center",
          },
        ],
        [
          { text: "Kilo", style: "tableHeader", alignment: "left" },
          {
            text: `${trimTrailingZeros(kilo)} kg/s`,
            style: "tableHeader",
            alignment: "center",
          },
        ],
        [
          { text: "Over", style: "tableHeader", alignment: "left" },
          {
            text: `${over} pcs`,
            style: "tableHeader",
            alignment: "center",
          },
        ],
        [
          { text: "Short", style: "tableHeader", alignment: "left" },
          {
            text: `${short} pcs`,
            style: "tableHeader",
            alignment: "center",
          },
        ],
      ],
    },
    layout: {
      paddingLeft: () => 2,
      paddingRight: () => 2,
      paddingTop: () => 2,
      paddingBottom: () => 2,
    },
  };

  return {
    content: [
      { text: "Baker Report", style: "header", alignment: "center" },
      {
        columns: [
          {
            text: `Branch Name: ${
              capitalizeFirstLetter(bakerReport?.branch?.name) ||
              "No name available"
            }
                Baker: ${formatFullname(
                  bakerReport?.user?.employee || "Unknown Baker Name"
                )}
                Recipe: ${capitalizeFirstLetter(
                  bakerReport.branch_recipe?.recipe?.name || "Unknown Recipe"
                )} (${bakerReport.recipe_category || "Unknown Category"})
             `,
            width: "80%", // Adjust width if necessary
            margin: [0, 0, 0, 10],
          },
          {
            text: `Date: ${formatDate(
              props.bakersReport[0]?.created_at ||
                props.bakersReport[1]?.created_at ||
                "No name available"
            )}
                Time: ${formatTime(bakerReport.created_at)}
                Status: ${capitalizeFirstLetter(bakerReport.status)}`,
            margin: [0, 0, 0, 10],
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
                        style: "tableHeader",
                        alignment: "center",
                      },
                      {
                        text: "Production",
                        style: "tableHeader",
                        alignment: "center",
                      },
                    ],
                    ...getBreadReports(bakerReport).map((breadReport) => [
                      {
                        text:
                          capitalizeFirstLetter(breadReport?.bread?.name) ||
                          "Unknown Bread",
                        style: "body",
                      },
                      {
                        text:
                          bakerReport.recipe_category === "Filling"
                            ? `${breadReport?.filling_production || "0"} pcs`
                            : `${breadReport?.bread_production} pcs`,
                        style: "body",
                        alignment: "center",
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
                        style: "tableHeader",
                        alignment: "center",
                      },
                      {
                        text: "Quantity",
                        style: "tableHeader",
                        alignment: "center",
                      },
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
                            trimTrailingZeros(ingredient?.quantity) ||
                            "Unknown Quantity"
                          } ${ingredient?.ingredients?.unit || ""}`,
                          style: "body",
                          alignment: "center",
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
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 25,
            x2: 555,
            y2: 25,
            lineWidth: 1,
            dash: { length: 5, space: 5 }, // Dashed line
            lineColor: "#000000",
            margin: [0, 20, 0, 0], // Adjust margin as needed
          },
        ],
      },
      {
        margin: [0, 20, 0, 0],
        stack: [
          { text: "Summary", style: "subheader", alignment: "center" },
          summaryTable,
        ],
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
                  { text: "PREPARED BY (BAKER):", fontSize: 7, bold: true, color: "#475569" },
                  { text: (bakerReport?.user?.employee ? formatFullname(bakerReport.user.employee) : (bakerReport?.user?.name || "Baker")).toUpperCase(), fontSize: 8.5, bold: true, color: "#0f172a", margin: [0, 10, 0, 1], alignment: "center" },
                  { text: "____________________________________", color: "#94a3b8", alignment: "center", margin: [0, 0, 0, 2] },
                  { text: "Signature Over Printed Name", fontSize: 6, color: "#64748b", italics: true, alignment: "center", margin: [0, 0, 0, 4] },
                  { text: `Position: ${bakerReport?.user?.employee?.position || bakerReport?.user?.employee?.designation || 'Master Baker'}`, fontSize: 6.5, color: "#334155" },
                  { text: `Date: ${formatDate(bakerReport.created_at)}`, fontSize: 6.5, color: "#64748b" }
                ]
              },
              {
                fillColor: "#f8fafc",
                borderColor: ["#cbd5e1", "#cbd5e1", "#cbd5e1", "#cbd5e1"],
                margin: [6, 8, 6, 8],
                stack: [
                  { text: "CHECKED & VERIFIED BY:", fontSize: 7, bold: true, color: "#475569" },
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
      header: { fontSize: 16, bold: true },
      subheader: { fontSize: 12, bold: true, margin: [0, 10, 0, 5] },
      tableHeader: { bold: true, fontSize: 10, color: "black" },
      body: { fontSize: 8 },
    },
    pageMargins: [20, 20, 20, 20], // Reduced page margins for better fit
  };
};
const openPrintDialog = (bakerReport) => {
  currentReport.value = bakerReport;
  const docDefinition = generateDocDefinition(bakerReport);
  currentDocDefinition.value = docDefinition;
  pdfMake.createPdf(docDefinition).getDataUrl((dataUrl) => {
    pdfUrl.value = dataUrl;
    printDialog.value = true;
  });
};
</script>

<style lang="scss" scoped>
.user-button {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-button:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}

.table-container {
  max-height: 400px; /* Adjust as needed */
  overflow: hidden;
}

.q-table-container {
  overflow: hidden !important; /* Target the container generated by q-table */
}

.custom-header {
  background: linear-gradient(to right, #800080, #ee82ee); /* Purple gradient */
  color: white; /* Text color for better contrast */
}

.gradient-tooltip {
  background: linear-gradient(135deg, #2c3e50, #4398f4); /* Gradient colors */
  color: white; /* Ensure text is visible */
  border-radius: 4px; /* Optional: Rounded corners for a smoother look */
  padding: 8px; /* Optional: Add padding for better spacing */
  font-size: 14px; /* Optional: Adjust font size if needed */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Subtle shadow for a polished look */
}
.gradient-icon {
  font-size: 24px; /* Adjust size as needed */
  // background: linear-gradient(135deg, #2c3e50, #4398f4); /* Gradient colors */
  background: linear-gradient(to right, #a0522d, #ff8833);
  // background: linear-gradient(to right, #6a320a, #a0522d, #d2691e, #f2be90);
  -webkit-background-clip: text; /* For compatibility */
  background-clip: text;
  color: transparent; /* Make text fill transparent */
  display: inline-block; /* Ensure proper display */
}
.gradient-icon2 {
  font-size: 24px; /* Adjust size as needed */
  background: linear-gradient(135deg, #2c3e50, #f443d7); /* Gradient colors */
  -webkit-background-clip: text; /* For compatibility */
  background-clip: text;
  color: transparent; /* Make text fill transparent */
  display: inline-block; /* Ensure proper display */
}
.gradient-icon3 {
  font-size: 24px; /* Adjust size as needed */
  background: linear-gradient(135deg, #2c3e50, #2c3e50); /* Gradient colors */
  -webkit-background-clip: text; /* For compatibility */
  background-clip: text;
  color: transparent; /* Make text fill transparent */
  display: inline-block; /* Ensure proper display */
}
</style>
