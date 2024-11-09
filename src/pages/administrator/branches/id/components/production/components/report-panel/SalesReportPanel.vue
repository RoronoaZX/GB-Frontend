<template>
  <q-card class="my-card q-pa-md">
    <q-card-section>
      <div class="q-mt-lg row items-start q-gutter-md justify-center">
        <div v-for="(report, index) in reportsData" :key="index">
          <q-card flat dense bordered>
            <q-card-section>
              <div class="row justify-between">
                <div class="text-h6">Sales Report</div>
                <div align="right">
                  <q-btn
                    padding="xs md"
                    label="Print"
                    icon="print"
                    outline
                    class="user-button"
                    @click="openPrintDialog(report)"
                  />
                  <div>
                    <q-tooltip class="bg-blue-grey-6" :delay="200">
                      Print Report
                    </q-tooltip>
                  </div>
                </div>
              </div>
              <div class="text-subtitle1 text-weight-regular">
                <div>Name: {{ formatFullname(report.user.employee) }}</div>
                <div>Date: {{ formatDate(report.created_at) }}</div>
                <div>Time: {{ formatTimeFromDB(report.created_at) }}</div>
              </div>
            </q-card-section>
            <div class="row q-gutter-sm q-pa-md">
              <ProductsReport :sales_Reports="[report]" />
              <DenominationReport :sales_Reports="[report]" />
              <ExpensesReport :sales_Reports="[report]" />
              <CreditsReport :sales_Reports="[report]" />
            </div>
          </q-card>
        </div>
      </div>
    </q-card-section>
  </q-card>

  <q-dialog
    v-model="printDialog"
    :backdrop-filter="backdropFilter"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <div class="q-ma-sm">
      <div class="q-ma-sm" align="center">
        <q-btn icon="close" flat dense round v-close-popup class="text-white">
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </div>
      <div>
        <iframe :src="pdfUrl" width="100%" height="700px" />
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import { date, useQuasar } from "quasar";
import { ref, computed } from "vue";
import ProductsReport from "./sales-report/ProductsReport.vue";
import DenominationReport from "./sales-report/DenominationReport.vue";
import ExpensesReport from "./sales-report/ExpensesReport.vue";
import CreditsReport from "./sales-report/CreditsReport.vue";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fontes";
pdfMake.vfs = pdfFonts.default;

// pdfMake.fonts = {
//   Roboto: {
//     normal: "path/to/Roboto-Regular.ttf",
//     bold: "path/to/Roboto-Medium.ttf",
//     italics: "path/to/Roboto-Italic.ttf",
//     bolditalics: "path/to/Roboto-MediumItalic.ttf",
//   },
// };

const printPdf = (report) => {
  const docDefinition = generateDocDefinition(report);

  // Open the generated PDF in a new tab or download directly
  pdfMake.createPdf(docDefinition).print();
};

const props = defineProps(["salesReport"]);
const reportsData = props.salesReport;
console.log("reportsData", props.salesReport);

const maximizedToggle = ref(true);
const printDialog = ref(false);
const pdfUrl = ref("");

const formatDate = (dateString) => {
  return date.formatDate(dateString, "MMMM DD, YYYY");
};

const formatTimeFromDB = (dateString) => {
  const dateObj = new Date(dateString);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return dateObj.toLocaleTimeString(undefined, options);
};
const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`.trim();
};

const formatAmount = (price) => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
  return formattedAmount.replace("₱", "₱\t");
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const capitalizeName = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const generateDocDefinition = (report) => {
  // const fontFamily = "Roboto";
  const allCreditProducts = computed(() => {
    return report.credit_reports.flatMap((report) => report.credit_products);
  });
  console.log("All Credit Products:", allCreditProducts.value);
  const productionTypes = [
    {
      title: "Bread Production",
      data: report.bread_reports || [],
      columns: [
        "bread.name",
        "beginnings",
        "price",
        "new_production",
        "bread_out",
        "bread_sold",
        "total",
        "remaining",
        "sales",
      ],
      totals: ["sales"],
    },
    {
      title: "Selecta Production",
      data: report.selecta_reports || [],
      columns: [
        "selecta.name",
        "beginnings",
        "price",
        "out",
        "sold",
        "remaining",
        "sales",
      ],
      totals: ["sales"],
    },
    {
      title: "Softdrinks Production",
      data: report.softdrinks_reports || [],
      columns: [
        "softdrinks.name",
        "beginnings",
        "price",
        "added_stocks",
        "out",
        "sold",
        "remaining",
        "sales",
      ],
      totals: ["sales"],
    },
  ];

  const expensesReport = report.expenses_reports || [];
  const creditReport = allCreditProducts.value || [];
  const creditTotal = report.credit_total;
  const denomination = report.denomination_reports[0] || [];
  const denominationTotal = report.denomination_total;
  const expensesTotal = report.expenses_total;
  const totalProductSales = report.products_total_sales;
  const chargesAmount = report.charges_amount;
  const overAmount = report.over_total;

  const denominationReport = {
    bills: [
      {
        name: "One Thousand",
        pcs: denomination.oneThousandBills || 0,
      },
      {
        name: "Five Hundred",
        pcs: denomination.fiveHundredBills || 0,
      },
      {
        name: "Two Hundred",
        pcs: denomination.twoHundredBills || 0,
      },
      {
        name: "One Hundred",
        pcs: denomination.oneHundredBills || 0,
      },
      { name: "Fifty", pcs: denomination.fiftyBills || 0 },
      { name: "Twenty", pcs: denomination.twentyBills || 0 },
    ],
    coins: [
      { name: "Twenty", pcs: denomination.twentyCoins || 0 },
      { name: "Ten", pcs: denomination.tenCoins || 0 },
      { name: "Five", pcs: denomination.fiveCoins || 0 },
      { name: "One", pcs: denomination.oneCoins || 0 },
      {
        name: "Twenty Five Cents",
        pcs: denomination.twentyFiveCents || 0,
      },
    ],
  };
  const formatPrice = (price) => `₱${price.toFixed(2)}`;

  const generateTableBody = (data, columns, totals) => {
    const totalRow = totals.reduce((acc, key) => {
      acc[key] = data.reduce((sum, item) => sum + (item[key] || 0), 0);
      return acc;
    }, {});

    return [
      ...data.map((item) =>
        columns.map((col) => ({
          text: col.includes(".")
            ? item[col.split(".")[0]][col.split(".")[1]]
            : item[col],
          style: "body",
          alignment: "center",
        }))
      ),
      [
        {
          text: "Overall Total",
          colSpan: columns.length - totals.length,
          style: "tableHeader",
          alignment: "right",
          color: "#020617",
        },
        ...Array(columns.length - totals.length - 1).fill({}),
        ...totals.map((key) => ({
          text: key === "sales" ? formatAmount(totalRow[key]) : totalRow[key],
          style: "tableHeader",
          alignment: "center",
          color: "#020617",
        })),
      ],
    ];
  };

  const creditReportTableBody =
    creditReport.length > 0
      ? creditReport.map((creditData) => [
          {
            text: formatFullname(creditData.credit_user_id),
            style: "body",
            alignment: "center",
          },
          {
            text: creditData.product.name,
            style: "body",
            alignment: "center",
          },
          {
            text: creditData.pieces,
            style: "body",
            alignment: "center",
          },
          {
            text: creditData.price,
            style: "body",
            alignment: "center",
          },
          {
            text: creditData.total_amount,
            style: "body",
            alignment: "center",
          },
        ])
      : [[{ text: "No data available", colSpan: 5, alignment: "center" }]];
  creditReportTableBody.push([
    {
      text: "Total",
      style: "bodyBold",
      alignment: "right",
      colSpan: 3,
    },
    {},
    {},
    {
      text: `${formatAmount(creditTotal)}`,
      style: "bodyBold",
      alignment: "center",
      colSpan: 2,
    },
    {},
  ]);

  const expensesReportTableBody =
    expensesReport.length > 0
      ? expensesReport.map((expensesData) => [
          {
            text: expensesData.name,
            style: "body",
            alignment: "center",
          },
          {
            text: expensesData.description,
            style: "body",
            alignment: "center",
          },
          {
            text: `${formatAmount(expensesData.amount)}`,
            style: "body",
            alignment: "center",
          },
        ])
      : [[{ text: "No data available", colSpan: 3, alignment: "center" }]];

  expensesReportTableBody.push([
    {
      text: "Total",
      style: "bodyBold",
      alignment: "right",
      colSpan: 2,
      // color: "#3b0764",
    },
    {},
    {
      text: `${formatAmount(expensesTotal)}`,
      style: "bodyBold",
      alignment: "center",
      // color: "#3b0764",
    }, // Align total to the right
  ]);

  const denominationReportTableBody = denominationReport.bills.map(
    (bill, index) => [
      { text: bill.name, style: "body", alignment: "center" },
      { text: bill.pcs, style: "body", alignment: "center" },
      {
        text: denominationReport.coins[index]?.name || "",
        style: "body",
        alignment: "center",
      },
      {
        text: denominationReport.coins[index]?.pcs || "0", // Default to "0" if no value
        style: "body",
        alignment: "center",
      },
    ]
  );

  denominationReportTableBody.push([
    {
      text: "Total",
      style: "bodyBold",
      alignment: "right",
      colSpan: 3,
      color: "#020617",
    },
    {}, // Empty cell due to colSpan
    {},
    {
      text: `${formatAmount(denominationTotal)}`,
      style: "bodyBold",
      alignment: "right",
      color: "#020617",
    }, // Align total to the right
  ]);

  const tables = productionTypes.map(({ title, data, columns, totals }) => ({
    stack: [
      { text: title, style: "subheader", alignment: "center" },
      {
        table: {
          headerRows: 1,
          widths: Array(columns.length).fill("*"), // Set all columns to take equal space
          body: [
            columns.map((col) => ({
              text: col
                .split(".")
                .pop()
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase()),
              style: "tableHeader",
              alignment: "center",
            })),
            ...generateTableBody(data, columns, totals),
          ],
        },
        layout: {
          paddingLeft: () => 2,
          paddingRight: () => 2,
          paddingTop: () => 2,
          paddingBottom: () => 2,
        },
      },
    ],
  }));

  const summaryTable = {
    table: {
      widths: ["50%", "50%"],
      body: [
        [
          {
            text: "Total Denomination",
            style: "tableHeader",
            alignment: "left",
          },
          {
            text: formatAmount(denominationTotal),
            style: "tableData",
            alignment: "center",
          },
        ],
        [
          {
            text: "Total Product Sales Amount",
            style: "tableHeader",
            alignment: "left",
          },
          {
            text: formatAmount(report.products_total_sales),
            style: "tableData",
            alignment: "center",
          },
        ],
        [
          { text: "Total Expenses", style: "tableHeader", alignment: "left" },
          {
            text: formatAmount(expensesTotal),
            style: "tableData",
            alignment: "center",
          },
        ],
        [
          { text: "Over Cash", style: "tableHeader", alignment: "left" },
          {
            text: formatAmount(report.over_total),
            style: "tableData",
            alignment: "center",
          },
        ],
        [
          { text: "Charges", style: "tableHeader", alignment: "left" },
          {
            text: `${formatAmount(report.charges_amount)}`,
            style: "tableData",
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
      { text: "Sales Report", style: "header", alignment: "center" },
      {
        columns: [
          {
            text: `Branch Name: ${report.branch.name}
          Cashier: ${formatFullname(report.user.employee)}
          Date: ${formatDate(report.created_at)}\nTime: ${formatTimeFromDB(
              report.created_at
            )}\n`,
            margin: [0, 0, 0, 10],
          },
          {},
        ],
      },

      ...tables,
      {
        margin: [0, 5, 0, 0],
        columns: [
          {
            width: "50%",
            stack: [
              {
                text: "Expenses Report",
                style: "subheader",
                alignment: "center",
              },
              {
                table: {
                  headerRows: 1,
                  widths: ["*", "auto", "*"], // Set widths for the three columns
                  body: [
                    [
                      {
                        text: "Expenses Name",
                        style: "tableHeader",
                        alignment: "center",
                      },
                      {
                        text: "Description",
                        style: "tableHeader",
                        alignment: "center",
                      },
                      {
                        text: "Amount",
                        style: "tableHeader",
                        alignment: "center",
                      },
                    ],
                    ...expensesReportTableBody,
                  ],
                },
                layout: {
                  paddingLeft: () => 2,
                  paddingRight: () => 2,
                  paddingTop: () => 2,
                  paddingBottom: () => 2,
                },
              },
              {
                text: "Credit Report",
                style: "subheader",
                alignment: "center",
              },
              {
                table: {
                  headerRows: 1,
                  widths: ["*", "*", "auto", "auto", "auto"], // Set widths for the three columns
                  body: [
                    [
                      {
                        text: "Employee Name",
                        style: "tableHeader",
                        alignment: "center",
                      },
                      {
                        text: "Product Name",
                        style: "tableHeader",
                        alignment: "center",
                      },
                      {
                        text: "Pieces",
                        style: "tableHeader",
                        alignment: "center",
                      },
                      {
                        text: "Price",
                        style: "tableHeader",
                        alignment: "center",
                      },
                      {
                        text: "Amount",
                        style: "tableHeader",
                        alignment: "center",
                      },
                    ],
                    ...creditReportTableBody,
                  ],
                },
                layout: {
                  paddingLeft: () => 2,
                  paddingRight: () => 2,
                  paddingTop: () => 2,
                  paddingBottom: () => 2,
                },
              },
            ],
          },
          {
            width: "50%",
            stack: [
              {
                text: "Denomination Report",
                style: "subheader",
                alignment: "center",
              },
              {
                table: {
                  headerRows: 0,
                  widths: ["*", "auto", "*", "auto"], // Set widths for the four columns
                  body: [
                    [
                      {
                        text: "Bills",
                        style: "tableHeader",
                        alignment: "center",
                      },
                      {
                        text: "Pcs",
                        style: "tableHeader",
                        alignment: "center",
                      },
                      {
                        text: "Coins",
                        style: "tableHeader",
                        alignment: "center",
                      },
                      {
                        text: "Pcs",
                        style: "tableHeader",
                        alignment: "center",
                      },
                    ],
                    ...denominationReportTableBody,
                  ],
                },
                layout: {
                  paddingLeft: () => 2,
                  paddingRight: () => 2,
                  paddingTop: () => 2,
                  paddingBottom: () => 2,
                },
              },
            ],
          },
        ],
        columnGap: 10,
      },

      {},

      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 25,
            x2: 580,
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
    ],
    styles: {
      header: { fontSize: 16, bold: true },
      subheader: {
        // font: fontFamily,
        fontSize: 12,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableHeader: {
        // font: fontFamily,
        bold: true,
        fontSize: 10,
        color: "black",
      },
      body: {
        // font: fontFamily,
        fontSize: 8,
      },
    },
    pageMargins: [10, 10, 10, 10], // Reduced page margins for better fit
  };
};

// const generateDocDefinition = (report) => {
//   const productionTypes = [
//     {
//       title: "Bread Production",
//       data: report.bread_reports || [],
//       columns: [
//         "bread.name",
//         "beginnings",
//         "price",
//         "new_production",
//         "bread_out",
//         "bread_sold",
//         "total",
//         "remaining",
//         "sales",
//       ],
//       totals: ["sales"],
//     },
//     {
//       title: "Selecta Production",
//       data: report.selecta_reports || [],
//       columns: [
//         "selecta.name",
//         "beginnings",
//         "price",
//         "out",
//         "sold",
//         "remaining",
//         "sales",
//       ],
//       totals: ["sales"],
//     },
//     {
//       title: "Softdrinks Production",
//       data: report.softdrinks_reports || [],
//       columns: [
//         "softdrinks.name",
//         "beginnings",
//         "price",
//         "added_stocks",
//         "out",
//         "sold",
//         "remaining",
//         "sales",
//       ],
//       totals: ["sales"],
//     },
//   ];
//   const expensesReport = report.expenses_reports || [];

//   const formatPrice = (price) => `₱${price.toFixed(2)}`;

//   const generateTableBody = (data, columns, totals) => {
//     const totalRow = totals.reduce((acc, key) => {
//       acc[key] = data.reduce((sum, item) => sum + (item[key] || 0), 0);
//       return acc;
//     }, {});

//     return [
//       ...data.map((item) =>
//         columns.map((col) => ({
//           text: col.includes(".")
//             ? item[col.split(".")[0]][col.split(".")[1]]
//             : item[col],
//           style: "body",
//           alignment: "center",
//         }))
//       ),
//       [
//         {
//           text: "Overall Total",
//           colSpan: columns.length - totals.length,
//           style: "tableHeader",
//           alignment: "right",
//         },
//         ...Array(columns.length - totals.length - 1).fill({}),
//         ...totals.map((key) => ({
//           text: key === "sales" ? formatPrice(totalRow[key]) : totalRow[key],
//           style: "tableHeader",
//           alignment: "center",
//         })),
//       ],
//     ];
//   };

//   const expensesReportTableBody =
//     expensesReport.length > 0
//       ? expensesReport.map((expensesData) => [
//           {
//             text: expensesData.name,
//             style: "body",
//             alignment: "center",
//           },
//           {
//             text: expensesData.description,
//             style: "body",
//             alignment: "center",
//           },
//           {
//             text: `${formatAmount(expensesData.amount)}`,
//             style: "body",
//             alignment: "center",
//           },
//         ])
//       : [[{ text: "No data available", colSpan: 2, alignment: "center" }]];

//   const tables = productionTypes.map(({ title, data, columns, totals }) => ({
//     stack: [
//       { text: title, style: "subheader", alignment: "center" },
//       {
//         table: {
//           headerRows: 1,
//           widths: Array(columns.length).fill("*"), // Set all columns to take equal space
//           body: [
//             columns.map((col) => ({
//               text: col
//                 .split(".")
//                 .pop()
//                 .replace(/_/g, " ")
//                 .replace(/\b\w/g, (l) => l.toUpperCase()),
//               style: "tableHeader",
//               alignment: "center",
//             })),
//             ...generateTableBody(data, columns, totals),
//           ],
//         },
//         layout: {
//           paddingLeft: () => 2,
//           paddingRight: () => 2,
//           paddingTop: () => 2,
//           paddingBottom: () => 2,
//         },
//       },
//     ],
//   }));

//   return {
//     content: [
//       { text: "Sales Report", style: "header", alignment: "center" },
//       {
//         text: `Date: ${formatDate(report.created_at)}\nTime: ${formatTimeFromDB(
//           report.created_at
//         )}\nCashier: ${report.user.name}`,
//         margin: [0, 0, 0, 10],
//       },
//       ...tables,

//       {
//         columns: [
//           {
//             width: "50%",
//             stack: [
//               {
//                 text: "Expenses Report",
//                 style: "subheader",
//                 alignment: "center",
//               },
//               {
//                 table: {
//                   headerRows: 1,
//                   widths: ["*", "*", "*"],
//                   body: [
//                     [
//                       {
//                         text: "Expenses Name",
//                         style: "tableHeader",
//                         alignment: "center",
//                       },
//                     ],
//                     ...expensesReportTableBody,
//                   ],
//                 },
//               },
//             ],
//             columnGap: 10,
//           },

//           {
//             width: "50%",
//             stack: [
//               {
//                 text: "Denomination Report",
//                 style: "subheader",
//                 alignment: "center",
//               },
//             ],
//             columnGap: 10,
//           },
//         ],
//       },
//     ],
//     styles: {
//       header: { fontSize: 16, bold: true },
//       subheader: { fontSize: 12, bold: true, margin: [0, 10, 0, 5] },
//       tableHeader: { bold: true, fontSize: 10, color: "black" },
//       body: { fontSize: 8 },
//     },
//     pageMargins: [20, 20, 20, 20], // Reduced page margins for better fit
//   };
// };

// const generateDocDefinition = (report) => {
//   const breadProduction = report.bread_reports || [];
//   const expensesReport = report.selecta_reports || [];
//   const softdrinksProduction = report.softdrinks_reports || [];
//   console.log("breadProduction", breadProduction);

//   const breadProductionTableBody =
//     breadProduction.length > 0
//       ? breadProduction.map((breadData) => [
//           {
//             text: breadData.bread.name,
//             style: "body",
//             alignment: "center",
//           },
//           {
//             text: `${formatPrice(breadData.price)}`,
//             style: "body",
//             alignment: "center",
//           },
//           {
//             text: breadData.beginnings,
//             style: "body",
//             alignment: "center",
//           },
//           {
//             text: breadData.remaining,
//             style: "body",
//             alignment: "center",
//           },
//           {
//             text: breadData.new_production,
//             style: "body",
//             alignment: "center",
//           },
//           {
//             text: breadData.bread_out,
//             style: "body",
//             alignment: "center",
//           },
//           {
//             text: breadData.bread_sold,
//             style: "body",
//             alignment: "center",
//           },
//           {
//             text: breadData.total,
//             style: "body",
//             alignment: "center",
//           },
//           {
//             text: `${formatPrice(breadData.sales)}`,
//             style: "body",
//             alignment: "center",
//           },
//         ])
//       : [[{ text: "No data available", colSpan: 2, alignment: "center" }]];

// const expensesReportTableBody =
//   expensesReport.length > 0
//     ? expensesReport.map((expensesData) => [
//         {
//           text: expensesData.selecta.name,
//           style: "body",
//           alignment: "center",
//         },
//         {
//           text: `${formatPrice(expensesData.price)}`,
//           style: "body",
//           alignment: "center",
//         },
//         {
//           text: expensesData.beginnings,
//           style: "body",
//           alignment: "center",
//         },
//         {
//           text: expensesData.remaining,
//           style: "body",
//           alignment: "center",
//         },
//         {
//           text: expensesData.out,
//           style: "body",
//           alignment: "center",
//         },
//         {
//           text: expensesData.sold,
//           style: "body",
//           alignment: "center",
//         },
//         {
//           text: expensesData.sales,
//           style: "body",
//           alignment: "center",
//         },
//       ])
//     : [[{ text: "No data available", colSpan: 2, alignment: "center" }]];

//   const softdrinksProductionTableBody =
//     softdrinksProduction.length > 0
//       ? softdrinksProduction.map((softdrinksData) => [
//           {
//             text: softdrinksData.softdrinks.name,
//             style: "body",
//             alignment: "center",
//           },
//           {
//             text: `${formatPrice(softdrinksData.price)}`,
//             style: "body",
//             alignment: "center",
//           },
//           {
//             text: softdrinksData.beginnings,
//             style: "body",
//             alignment: "center",
//           },
//           {
//             text: softdrinksData.added_stocks,
//             style: "body",
//             alignment: "center",
//           },
//           {
//             text: softdrinksData.remaining,
//             style: "body",
//             alignment: "center",
//           },
//           {
//             text: softdrinksData.out,
//             style: "body",
//             alignment: "center",
//           },
//           {
//             text: softdrinksData.sold,
//             style: "body",
//             alignment: "center",
//           },
//           {
//             text: softdrinksData.sales,
//             style: "body",
//             alignment: "center",
//           },
//         ])
//       : [[{ text: "No data available", colSpan: 2, alignment: "center" }]];

//   return {
//     content: [
//       { text: "Sales Report", style: "header", alignment: "center" },
//       {
//         columns: [
//           {
//             text: `Date: ${formatDate(report.created_at)}
//              Time: ${formatTimeFromDB(report.created_at)}
//              Cashier: ${report.user.name}

//             `,
//           },
//         ],
//       },
//       {
//         stack: [
//           {
//             text: "Bread Production",
//             style: "subheader",
//             alignment: "center",
//           },
//           {
//   table: {
//     headerRows: 1,
//     widths: ["*", "*", "*", "*", "*", "*", "*", "*", "*"],
//     body: [
//       [
//         {
//           text: "Bread Name",
//           style: "tableHeader",
//           alignment: "center",
//         },
//         { text: "Price", style: "tableHeader", alignment: "center" },
//         {
//           text: "Beginnings",
//           style: "tableHeader",
//           alignment: "center",
//         },
//         {
//           text: "Remainings",
//           style: "tableHeader",
//           alignment: "center",
//         },
//         {
//           text: "New Production",
//           style: "tableHeader",
//           alignment: "center",
//         },
//         {
//           text: "Bread Out",
//           style: "tableHeader",
//           alignment: "center",
//         },
//         {
//           text: "Bread Sold",
//           style: "tableHeader",
//           alignment: "center",
//         },
//         {
//           text: "Bread Total",
//           style: "tableHeader",
//           alignment: "center",
//         },
//         {
//           text: "Total Sales",
//           style: "tableHeader",
//           alignment: "center",
//         },
//       ],
//       ...breadProductionTableBody,
//     ],
//   },
// },
//         ],
//       },
//       {
//         stack: [
//           {
//             text: "Softdrinks Production",
//             style: "subheader",
//             alignment: "center",
//           },
//           {
//             table: {
//               headerRows: 1,
//               widths: ["*", "*", "*", "*", "*", "*", "*", "*"],
//               body: [
//                 [
//                   {
//                     text: "Softdrinks Name",
//                     style: "tableHeader",
//                     alignment: "center",
//                   },
//                   { text: "Price", style: "tableHeader", alignment: "center" },
//                   {
//                     text: "Beginnings",
//                     style: "tableHeader",
//                     alignment: "center",
//                   },
//                   {
//                     text: "Added stocks",
//                     style: "tableHeader",
//                     alignment: "center",
//                   },
//                   {
//                     text: "Remainings",
//                     style: "tableHeader",
//                     alignment: "center",
//                   },
//                   {
//                     text: "Softdrinks Out",
//                     style: "tableHeader",
//                     alignment: "center",
//                   },
//                   {
//                     text: "SOftdrinks Sold",
//                     style: "tableHeader",
//                     alignment: "center",
//                   },
//                   {
//                     text: "Total Sales",
//                     style: "tableHeader",
//                     alignment: "center",
//                   },
//                 ],
//                 ...softdrinksProductionTableBody,
//               ],
//             },
//           },
//         ],
//       },
//       {
//         stack: [
//           {
//             text: "Selecta Production",
//             style: "subheader",
//             alignment: "center",
//           },
//           {
//             table: {
//               headerRows: 1,
//               widths: ["*", "*", "*", "*", "*", "*", "*"],
//               body: [
//                 [
//                   {
//                     text: "Selecta Name",
//                     style: "tableHeader",
//                     alignment: "center",
//                   },
//                   { text: "Price", style: "tableHeader", alignment: "center" },
//                   {
//                     text: "Beginnings",
//                     style: "tableHeader",
//                     alignment: "center",
//                   },
//                   {
//                     text: "Remainings",
//                     style: "tableHeader",
//                     alignment: "center",
//                   },
//                   {
//                     text: "Selecta Out",
//                     style: "tableHeader",
//                     alignment: "center",
//                   },
//                   {
//                     text: "Selecta Sold",
//                     style: "tableHeader",
//                     alignment: "center",
//                   },
//                   {
//                     text: "Total Sales",
//                     style: "tableHeader",
//                     alignment: "center",
//                   },
//                 ],
//                 ...expensesReportTableBody,
//               ],
//             },
//           },
//         ],
//       },
//     ],
//     styles: {
//       header: {
//         fontSize: 14,
//         bold: false,
//         margin: [0, 0, 0, 0],
//       },
//       subheader: {
//         fontSize: 10,
//         bold: true,
//         margin: [0, 10, 0, 5],
//         fillColor: "#595a5a",
//       },
//       body: {
//         fontSize: 9,
//       },
//       tableHeader: {
//         bold: true,
//         fontSize: 9,
//       },
//       defaultStyle: {
//         columnGap: 10, // General gap between any other columns not explicitly set
//       },
//     },
//   };
// };

const openPrintDialog = (report) => {
  const docDefinition = generateDocDefinition(report);
  pdfMake.createPdf(docDefinition).getDataUrl((dataUrl) => {
    pdfUrl.value = dataUrl;
    printDialog.value = true;
  });
};
</script>

<style lang="scss" scoped>
.my-card {
  height: 100%;
  border-radius: 15px;
  background: #fff;
  color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.my-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}

.user-button {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-button:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}
</style>
