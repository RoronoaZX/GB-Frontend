<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      style="border-radius: 16px; min-width: 400px; max-width: 500px"
      class="bg-grey-1 shadow-8"
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

      <q-card-section class="text-center q-pt-none q-pb-lg">
        <div class="text-h6 text-weight-bolder q-mb-xs text-blue-grey-10">
          Action Required
        </div>
        <div class="text-subtitle2 text-grey-7">
          Please select an option to continue.
        </div>
      </q-card-section>

      <q-card-section class="q-px-md q-pb-md">
        <q-btn
          no-caps
          color="blue-grey-10"
          class="full-width q-mb-md q-py-md text-white"
          style="border-radius: 10px; font-size: 1rem"
          @click="onOKClick(props.payslipDataToBeSend)"
        >
          <div class="text-subtitle1 text-weight-bold">Print & Save</div>
          <q-icon name="print" right size="1.2rem" />
        </q-btn>
        <q-btn
          no-caps
          flat
          color="grey-8"
          class="full-width q-py-md text-blue-grey-10"
          style="border-radius: 10px; font-size: 1rem"
          @click="onCancelClick"
        >
          <q-icon name="send" left size="1.2rem" />
          <div class="text-subtitle1 text-weight-bold">Just Save</div>
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="printDialog"
    :maximized="maximizedToggle"
    persistent
    full-height
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <div class="q-ma-sm" style="width: 100%; max-width: 800px">
      <q-card class="bg-dark">
        <q-card-section
          class="row justify-between items-center bg-primary text-white q-py-sm"
        >
          <div class="text-h6">Preview Payslip</div>
          <div>
            <q-btn
              icon="close"
              flat
              dense
              round
              v-close-popup
              @click="closePrintDialog"
            >
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </div>
        </q-card-section>
        <q-card-section class="q-pa-none" style="height: 80vh">
          <iframe :src="pdfUrl" width="100%" height="100%" />
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<!-- <template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      style="border-radius: 16px; min-width: 350px"
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
          @click="onOKClick(props.payslipDataToBeSend)"
        >
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

  <q-dialog
    v-model="printDialog"
    :maximized="maximizedToggle"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <div class="q-ma-sm" style="width: 100%; max-width: 800px">

      <q-card class="bg-dark">

        <q-card-section
          class="row justify-between items-center bg-primary text-white q-py-sm"
        >
          <div class="text-h6">Preview Payslip</div>
          <div>
            <q-btn
              icon="close"
              flat
              dense
              round
              v-close-popup
              @click="closePrintDialog"
            >
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </div>
        </q-card-section>
        <q-card-section class="q-pa-none" style="height: 70vh">
          <iframe :src="pdfUrl" width="100%" height="100%" />
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template> -->
<!--
<script setup>
import { ref } from "vue";
import { useDialogPluginComponent } from "quasar";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fontes";
import { usePayslipStore } from "src/stores/payslip";

pdfMake.vfs = pdfFonts.default;

const payslipStore = usePayslipStore();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps({
  payslipDataToBeSend: Object,
});

const maximizedToggle = ref(true);
const printDialog = ref(false);
const pdfUrl = ref(null);

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`;
};

const formatCurrency = (value) => {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue === 0) {
    return "₱ 0.00";
  }
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(numValue);
};

// Generate PDF and auto open print dialog
const generateDocDefinition = (payslipData) => {
  return {
    pageMargins: [20, 10, 20, 10],
    // [left, top, right, bottom] → shrink to your liking

    content: [
      // Header
      {
        text: "GB-Bakeshop",
        style: "header",
        alignment: "center",
        color: "#F44336",
        margin: [0, 0, 0, 2], // smaller bottom margin
      },
      {
        text: "Payslip",
        style: "header",
        alignment: "center",
        margin: [0, 0, 0, 8], // slightly adjusted if you want a bit of space
      },
      {
        canvas: [
          {
            type: "line",
            x1: 0, // start at far left
            y1: 0,
            x2: 555, // full page width (A4 is ~515 units wide in PDFMake default)
            y2: 0,
            lineWidth: 2, // thickness (bold)
            lineColor: "black",
          },
        ],
        margin: [0, 4, 0, 10], // spacing around line
      },

      // Employee Info
      {
        columns: [
          [
            {
              text: `Employee : ${formatFullname(payslipData.employeeData)}`,
              fontSize: 10,
            },
            {
              text: `Rate/Day : ${formatCurrency(payslipData.rate_per_day)}`,
              fontSize: 10,
            },
            {
              text: `Total Days : ${payslipData.total_days}`,
              fontSize: 10,
            },
            // { text: `ID: ${payslipData.employee_id}`, fontSize: 10 },
            {
              text: `Period : ${payslipData.from} - ${payslipData.to}`,
              fontSize: 10,
            },
          ],
          [
            // {
            //   text: `Period: ${payslipData.from} - ${payslipData.to}`,
            //   alignment: "right",
            //   fontSize: 10,
            // },
            {
              text: `Payroll Date : ${payslipData.payroll_release_date}`,
              alignment: "right",
              fontSize: 10,
            },
            {
              text: `Undertime / Lates`,
              fontSize: 10,
              alignment: "right",
              margin: [0, 0, 0, 0],
            },
            {
              text: [
                {
                  text: "Total Hours : ",
                  fontSize: 10,
                },
                {
                  text: `${payslipData.payslip_earnings.undertime_hours || 0}`,
                  fontSize: 10,
                  color: "#D64545",
                },
              ],

              alignment: "right",
            },
            {
              text: [
                { text: "Cost : ", fontSize: 10 },
                {
                  text: `${formatCurrency(
                    payslipData.payslip_earnings.undertime_pay || 0
                  )}`,
                  fontSize: 10,
                  color: "#D64545",
                },
              ],
              alignment: "right",
            },
          ],
        ],
        margin: [0, 0, 0, 10],
      },

      // Earnings vs Deductions
      {
        columns: [
          {
            width: "50%",
            stack: [
              {
                text: "Earning Summary",
                alignment: "center",
                style: "tableHeader",
              },
              {
                table: {
                  widths: ["*", "auto"],
                  body: [
                    [
                      "Basic Pay",
                      `${formatCurrency(
                        payslipData.payslip_earnings.working_hours_pay || 0
                      )}`,
                    ],
                    [
                      "Overtime Pay",
                      `${formatCurrency(
                        payslipData.payslip_earnings.overtime_pay || 0
                      )}`,
                    ],
                    [
                      "Holiday Pay",
                      `${formatCurrency(
                        payslipData.payslip_earnings.holidays_pay || 0
                      )}`,
                    ],
                    [
                      "Night Differential Pay",
                      `${formatCurrency(
                        payslipData.payslip_earnings.night_diff_pay || 0
                      )}`,
                    ],
                    [
                      "Total Allowance",
                      `${formatCurrency(
                        payslipData.payslip_earnings.allowances_pay || 0
                      )}`,
                    ],
                    [
                      "Quota Incentives",
                      `${formatCurrency(
                        payslipData.payslip_earnings.incentives_pay || 0
                      )}`,
                    ],
                    [
                      { text: "TOTAL INCOME", bold: true, color: "#2A9D8F" },
                      {
                        text: `${formatCurrency(
                          payslipData.total_earnings || 0
                        )}`,
                        bold: true,
                        color: "#2A9D8F",
                      },
                    ],
                  ],
                },
                layout: "lightHorizontalLines",
                margin: [0, 5, 5, 5],
                fontSize: 8,
              },
            ],
          },
          {
            width: "50%",
            stack: [
              {
                text: "Deductions Summary",
                alignment: "center",
                style: "tableHeader",
              },
              {
                table: {
                  widths: ["*", "auto"],
                  body: [
                    [
                      "Credit",
                      `${formatCurrency(
                        payslipData.payslip_deductions.credit_total || 0
                      )}`,
                    ],
                    [
                      "Uniform",
                      `${formatCurrency(
                        payslipData.payslip_deductions.uniform_total || 0
                      )}`,
                    ],
                    [
                      "Penalty",
                      `${formatCurrency(
                        payslipData.payslip_deductions.penalty || 0
                      )}`,
                    ],
                    [
                      "Cash Advance",
                      `${formatCurrency(
                        payslipData.payslip_deductions.cash_advance_total || 0
                      )}`,
                    ],
                    [
                      "Short / Charges",
                      `${formatCurrency(
                        payslipData.payslip_deductions.payslipData || 0
                      )}`,
                    ],
                    [
                      "SSS",
                      `${formatCurrency(
                        payslipData.payslip_deductions
                          .payslip_deduction_benefits.sss || 0
                      )}`,
                    ],
                    [
                      "Pag-IBIG",
                      `${formatCurrency(
                        payslipData.payslip_deductions
                          .payslip_deduction_benefits.hdmf || 0
                      )}`,
                    ],
                    [
                      "PhilHealth Insurance",
                      `${formatCurrency(
                        payslipData.payslip_deductions
                          .payslip_deduction_benefits.phic || 0
                      )}`,
                    ],
                    [
                      {
                        text: "TOTAL DEDUCTIONS",
                        bold: true,
                        color: "#D64545",
                      },
                      {
                        text: `${formatCurrency(
                          payslipData.total_deductions || 0
                        )}`,
                        bold: true,
                        color: "#D64545",
                      },
                    ],
                  ],
                },
                layout: "lightHorizontalLines",
                margin: [5, 5, 0, 5],
                fontSize: 8,
              },
            ],
          },
        ],
      },

      // Balances
      {
        columns: [
          [
            {
              text: [
                { text: `Uniform Balance: `, bold: true, fontSize: 9 },
                {
                  text: `${formatCurrency(payslipData.uniform_balance || 0)}`,
                  bold: true,
                  fontSize: 9,
                  color: "#FB8C00",
                  // color: "#F2C037",
                  // color: "#FF5722",
                },
              ],
            },
            {
              text: [
                { text: `Credit Balance: `, bold: true, fontSize: 9 },
                {
                  text: `${formatCurrency(payslipData.credit_balance || 0)}`,
                  bold: true,
                  fontSize: 9,
                  color: "#FB8C00",
                  // color: "#F2C037",
                  // color: "#FF5722",
                },
              ],
            },
            {
              text: [
                { text: `Cash Advance Balance: `, bold: true, fontSize: 9 },
                {
                  text: `${formatCurrency(
                    payslipData.cash_advance_balance || 0
                  )}`,
                  bold: true,
                  fontSize: 9,
                  color: "#FB8C00",
                  // color: "#F2C037",
                  // color: "#FF5722",
                },
              ],
            },
          ],
        ],
        margin: [0, 5, 0, 10],
      },

      // Net Income Highlight
      {
        columns: [
          {
            text: `NET INCOME: ${formatCurrency(payslipData.net_income)}`,
            style: "netIncome",
            alignment: "left",
            margin: [0, 3, 0, 0],
          },
          {
            text: "Received By: ______________________",
            alignment: "right",
            fontSize: 10,
            margin: [0, 3, 0, 0],
          },
        ],
        columnGap: 10,
      },
      {
        canvas: [
          {
            type: "line",
            x1: 0, // start at far left
            y1: 0,
            x2: 555, // full page width (A4 is ~515 units wide in PDFMake default)
            y2: 0,
            lineWidth: 2, // thickness (bold)
            lineColor: "black",
          },
        ],
        margin: [0, 4, 0, 10], // spacing around line
      },
    ],

    styles: {
      header: { fontSize: 14, bold: true },
      subheader: { fontSize: 8, bold: true },
      tableHeader: { fontSize: 8, bold: true, fillColor: "#f2f2f2" },
      netIncome: {
        fontSize: 12,
        bold: true,
        color: "#00695C",
        fillColor: "#00695C",
      },
    },
  };
};

const openPrintDialog = (payslip) => {
  const docDefinition = generateDocDefinition(payslip);
  pdfMake.createPdf(docDefinition).getDataUrl((dataUrl) => {
    pdfUrl.value = dataUrl;
    printDialog.value = true;
  });
};

const onOKClick = async () => {
  try {
    const response = await payslipStore.createPayslip(
      props.payslipDataToBeSend
    );

    if (response?.message === "Payslip saved successfully") {
      // Generate and auto print
      openPrintDialog(props.payslipDataToBeSend);
      // onDialogOK("save_and_print"); // close dialog
    }
  } catch (err) {
    console.error("Save failed", err);
  }
};

const onCancelClick = () => {
  onDialogCancel();
};
</script> -->
<script setup>
import { ref } from "vue";
import { useDialogPluginComponent } from "quasar";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fontes";
import { usePayslipStore } from "src/stores/payslip";

pdfMake.vfs = pdfFonts.default;

const payslipStore = usePayslipStore();
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps({
  payslipDataToBeSend: Object,
});

const maximizedToggle = ref(true);
const printDialog = ref(false);
const pdfUrl = ref(null);
const currentDocDefinition = ref(null); // To store docDefinition for printing

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";
  return `${firstname} ${middlename} ${lastname}`;
};

const formatCurrency = (value) => {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue === 0) {
    return "₱ 0.00";
  }
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(numValue);
};

const generateDocDefinition = (payslipData) => {
  // ... (your existing docDefinition logic)
  return {
    pageMargins: [20, 10, 20, 10],
    content: [
      {
        text: "GB-Bakeshop",
        style: "header",
        alignment: "center",
        color: "#F44336",
        margin: [0, 0, 0, 2],
      },
      {
        text: "Payslip",
        style: "header",
        alignment: "center",
        margin: [0, 0, 0, 8],
      },
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 0,
            x2: 555,
            y2: 0,
            lineWidth: 2,
            lineColor: "black",
          },
        ],
        margin: [0, 4, 0, 10],
      },
      {
        columns: [
          [
            {
              text: `Employee : ${formatFullname(payslipData.employeeData)}`,
              fontSize: 10,
            },
            {
              text: `Rate/Day : ${formatCurrency(payslipData.rate_per_day)}`,
              fontSize: 10,
            },
            { text: `Total Days : ${payslipData.total_days}`, fontSize: 10 },
            {
              text: `Period : ${payslipData.from} - ${payslipData.to}`,
              fontSize: 10,
            },
          ],
          [
            {
              text: `Payroll Date : ${payslipData.payroll_release_date}`,
              alignment: "right",
              fontSize: 10,
            },
            {
              text: "Undertime / Lates",
              fontSize: 10,
              alignment: "right",
              margin: [0, 0, 0, 0],
            },
            {
              text: [
                { text: "Total Hours : ", fontSize: 10 },
                {
                  text: `${payslipData.payslip_earnings.undertime_hours || 0}`,
                  fontSize: 10,
                  color: "#D64545",
                },
              ],
              alignment: "right",
            },
            {
              text: [
                { text: "Cost : ", fontSize: 10 },
                {
                  text: `${formatCurrency(
                    payslipData.payslip_earnings.undertime_pay || 0
                  )}`,
                  fontSize: 10,
                  color: "#D64545",
                },
              ],
              alignment: "right",
            },
          ],
        ],
        margin: [0, 0, 0, 10],
      },
      {
        columns: [
          {
            width: "50%",
            stack: [
              {
                text: "Earning Summary",
                alignment: "center",
                style: "tableHeader",
              },
              {
                table: {
                  widths: ["*", "auto"],
                  body: [
                    [
                      "Basic Pay",
                      formatCurrency(
                        payslipData.payslip_earnings.working_hours_pay || 0
                      ),
                    ],
                    [
                      "Overtime Pay",
                      formatCurrency(
                        payslipData.payslip_earnings.overtime_pay || 0
                      ),
                    ],
                    [
                      "Holiday Pay",
                      formatCurrency(
                        payslipData.payslip_earnings.holidays_pay || 0
                      ),
                    ],
                    [
                      "Night Differential Pay",
                      formatCurrency(
                        payslipData.payslip_earnings.night_diff_pay || 0
                      ),
                    ],
                    [
                      "Total Allowance",
                      formatCurrency(
                        payslipData.payslip_earnings.allowances_pay || 0
                      ),
                    ],
                    [
                      "Quota Incentives",
                      formatCurrency(
                        payslipData.payslip_earnings.incentives_pay || 0
                      ),
                    ],
                    [
                      { text: "TOTAL INCOME", bold: true, color: "#2A9D8F" },
                      {
                        text: formatCurrency(payslipData.total_earnings || 0),
                        bold: true,
                        color: "#2A9D8F",
                      },
                    ],
                  ],
                },
                layout: "lightHorizontalLines",
                margin: [0, 5, 5, 5],
                fontSize: 8,
              },
            ],
          },
          {
            width: "50%",
            stack: [
              {
                text: "Deductions Summary",
                alignment: "center",
                style: "tableHeader",
              },
              {
                table: {
                  widths: ["*", "auto"],
                  body: [
                    [
                      "Credit",
                      formatCurrency(
                        payslipData.payslip_deductions.credit_total || 0
                      ),
                    ],
                    [
                      "Uniform",
                      formatCurrency(
                        payslipData.payslip_deductions.uniform_total || 0
                      ),
                    ],
                    [
                      "Penalty",
                      formatCurrency(
                        payslipData.payslip_deductions.penalty || 0
                      ),
                    ],
                    [
                      "Cash Advance",
                      formatCurrency(
                        payslipData.payslip_deductions.cash_advance_total || 0
                      ),
                    ],
                    [
                      "Short / Charges",
                      formatCurrency(
                        payslipData.payslip_deductions.payslipData || 0
                      ),
                    ],
                    [
                      "SSS",
                      formatCurrency(
                        payslipData.payslip_deductions
                          .payslip_deduction_benefits.sss || 0
                      ),
                    ],
                    [
                      "Pag-IBIG",
                      formatCurrency(
                        payslipData.payslip_deductions
                          .payslip_deduction_benefits.hdmf || 0
                      ),
                    ],
                    [
                      "PhilHealth Insurance",
                      formatCurrency(
                        payslipData.payslip_deductions
                          .payslip_deduction_benefits.phic || 0
                      ),
                    ],
                    [
                      {
                        text: "TOTAL DEDUCTIONS",
                        bold: true,
                        color: "#D64545",
                      },
                      {
                        text: formatCurrency(payslipData.total_deductions || 0),
                        bold: true,
                        color: "#D64545",
                      },
                    ],
                  ],
                },
                layout: "lightHorizontalLines",
                margin: [5, 5, 0, 5],
                fontSize: 8,
              },
            ],
          },
        ],
      },
      {
        columns: [
          [
            {
              text: [
                { text: "Uniform Balance: ", bold: true, fontSize: 9 },
                {
                  text: formatCurrency(payslipData.uniform_balance || 0),
                  bold: true,
                  fontSize: 9,
                  color: "#FB8C00",
                },
              ],
            },
            {
              text: [
                { text: "Credit Balance: ", bold: true, fontSize: 9 },
                {
                  text: formatCurrency(payslipData.credit_balance || 0),
                  bold: true,
                  fontSize: 9,
                  color: "#FB8C00",
                },
              ],
            },
            {
              text: [
                { text: "Cash Advance Balance: ", bold: true, fontSize: 9 },
                {
                  text: formatCurrency(payslipData.cash_advance_balance || 0),
                  bold: true,
                  fontSize: 9,
                  color: "#FB8C00",
                },
              ],
            },
          ],
        ],
        margin: [0, 5, 0, 10],
      },
      {
        columns: [
          {
            text: `NET INCOME: ${formatCurrency(payslipData.net_income)}`,
            style: "netIncome",
            alignment: "left",
            margin: [0, 3, 0, 0],
          },
          {
            text: "Received By: ______________________",
            alignment: "right",
            fontSize: 10,
            margin: [0, 3, 0, 0],
          },
        ],
        columnGap: 10,
      },
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 0,
            x2: 555,
            y2: 0,
            lineWidth: 2,
            lineColor: "black",
          },
        ],
        margin: [0, 4, 0, 10],
      },
    ],
    styles: {
      header: { fontSize: 14, bold: true },
      subheader: { fontSize: 8, bold: true },
      tableHeader: { fontSize: 8, bold: true, fillColor: "#f2f2f2" },
      netIncome: {
        fontSize: 12,
        bold: true,
        color: "#00695C",
        fillColor: "#00695C",
      },
    },
  };
};

const openPrintDialog = (payslip) => {
  currentDocDefinition.value = generateDocDefinition(payslip); // Store the docDefinition
  pdfMake.createPdf(currentDocDefinition.value).getDataUrl((dataUrl) => {
    pdfUrl.value = dataUrl;
    printDialog.value = true;
  });
};

const triggerPrint = () => {
  if (currentDocDefinition.value) {
    pdfMake.createPdf(currentDocDefinition.value).print(); // Triggers browser print dialog
    closePrintDialog(); // Close your preview dialog after triggering print
  }
};

const closePrintDialog = () => {
  printDialog.value = false;
  // This will close the initial "Action Required" dialog
  // because the PDF preview dialog is now hidden.
  onDialogHide();
};

const onOKClick = async () => {
  try {
    const response = await payslipStore.createPayslip(
      props.payslipDataToBeSend
    );
    if (response?.message === "Payslip saved successfully") {
      openPrintDialog(props.payslipDataToBeSend);
    }
  } catch (err) {
    console.error("Save failed", err);
  }
};

const onCancelClick = () => {
  onDialogCancel();
};
</script>
