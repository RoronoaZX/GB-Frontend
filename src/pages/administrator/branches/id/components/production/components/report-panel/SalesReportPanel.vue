<template>
  <q-card class="my-card q-pa-md">
    <q-card-section>
      <div class="q-mt-lg row items-start q-gutter-md justify-center">
        <div v-for="(report, index) in reportsData" :key="index">
          <q-card flat dense bordered>
            <q-card-section>
              <div class="row justify-between">
                <div class="text-h6">Sales Report {{ reportLabel }}</div>

                <div align="right">
                  <q-btn
                    padding="xs md"
                    label="Print"
                    icon="print"
                    outline
                    class="user-button"
                    @click="openPrintDialog(report)"
                  />
                  <!-- @click="openPrintDialog(report)" -->
                  <!-- @click="printPdf(report)" -->
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
              <ProductsReport
                :sales_Reports="[report]"
                :reportLabel="reportLabel"
                :reportDate="report.created_at"
              />
              <DenominationReport :sales_Reports="[report]" />
              <ExpensesReport :sales_Reports="[report]" />
              <CreditsReport :sales_Reports="[report]" />
            </div>
          </q-card>
        </div>
      </div>
    </q-card-section>
  </q-card>

  <!-- :backdrop-filter="backdropFilter" -->
  <q-dialog
    v-model="printDialog"
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
import ExpensesReport from "./sales-report/expenses/ExpensesReport.vue";
import CreditsReport from "./sales-report/credit/CreditsReport.vue";
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

const props = defineProps(["salesReport", "reportLabel", "reportDate"]);
const reportsData = props.salesReport;
console.log("reportsDatasssss", props.salesReport);

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
      data: (report.bread_reports || []).map((item) => {
        // Ensure all numeric fields are properly converted to numbers
        const beginnings = Number(item.beginnings) || 0;
        const newProduction = Number(item.new_production) || 0;
        const remaining = Number(item.remaining) || 0;
        const breadOut = Number(item.bread_out) || 0;
        const price = Number(item.price) || 0;

        // Calculate total, bread sold, and sales
        const total = beginnings + newProduction;
        const totalBreadDifference = remaining + breadOut;
        const breadSold = total - totalBreadDifference;
        const sales = breadSold * price;

        return {
          ...item,
          total,
          bread_sold: breadSold,
          sales,
        };
      }),
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
      data: (report.selecta_reports || []).map((item) => {
        // Ensure all numeric fields are properly converted to numbers
        const beginnings = Number(item.beginnings || 0);
        const newStocks = Number(item.added_stocks || 0);
        const selectaOut = Number(item.out || 0);
        const remaining = Number(item.remaining || 0);
        const price = Number(item.price || 0);

        // Calculate total, selecta sold, and sales
        const total = beginnings + newStocks;
        const totalSelectaDifference = remaining + selectaOut;
        const selectaSold = total - totalSelectaDifference;
        const sales = selectaSold * price;
        return {
          ...item,
          total,
          sold: selectaSold,
          sales,
        };
      }),
      // data: (report.selecta_reports || []).map((item) => {
      //   const total = (item.remaining || 0) + (item.out || 0),
      //   sales: (item.price || 0) * item.sold,
      // }),
      columns: [
        "selecta.name",
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
    {
      title: "Softdrinks Production",
      data: (report.softdrinks_reports || []).map((item) => {
        // Ensure all numeric fields are properly converted to numbers
        const beginnings = Number(item.beginnings || 0);
        const addedStocks = Number(item.added_stocks || 0);
        const out = Number(item.out || 0);
        const remaining = Number(item.remaining || 0);
        const price = Number(item.price || 0);

        // Calculate total, softdrinks sold, and sales
        const total = beginnings + addedStocks;
        const totalSoftdrinksDifference = remaining + out;
        const softdrinksSold = total - totalSoftdrinksDifference;
        const sales = softdrinksSold * price;
        return {
          ...item,
          total,
          sold: softdrinksSold,
          sales,
        };
      }),
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
    {
      title: "Other Products Production",
      data: (report.other_products_reports || []).map((item) => {
        // Ensure all numeric fields are properly converted to numbers
        const beginnings = Number(item.beginnings || 0);
        const addedStocks = Number(item.added_stocks || 0);
        const out = Number(item.out || 0);
        const remaining = Number(item.remaining || 0);
        const price = Number(item.price || 0);

        // Calculate total, other products sold, and sales
        const total = beginnings + addedStocks;
        const totalOtherProductsDifference = remaining + out;
        const otherProductsSold = total - totalOtherProductsDifference;
        const sales = otherProductsSold * price;
        return {
          ...item,
          total,
          sold: otherProductsSold,
          sales,
        };
      }),
      columns: [
        "other_products.name",
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
    {
      title: "Cake Production",
      data: report.cake_sales_reports || [],
      columns: [
        "cake_report.name",
        "cake_report.user.employee",
        "cake_report.layers",
        "cake_report.price",
        "cake_report.sales_status",
      ],
      totals: ["cake_report.price"],
    },
  ];

  const expensesReport = report.expenses_reports || [];
  const creditReport = allCreditProducts.value || [];
  const denomination = report.denomination_reports[0] || [];
  const denominationTotal = report.denomination_total;
  // const expensesTotal = report.expenses_total;
  // const totalProductSales = report.products_total_sales;
  // const chargesAmount = report.charges_amount;
  const overAmount = report.over_total;

  const denominationReport = {
    bills: [
      {
        name: "One Thousand",
        pcs: denomination.oneThousandBills || 0,
        value: (denomination.oneThousandBills || 0) * 1000,
      },
      {
        name: "Five Hundred",
        pcs: denomination.fiveHundredBills || 0,
        value: (denomination.fiveHundredBills || 0) * 500,
      },
      {
        name: "Two Hundred",
        pcs: denomination.twoHundredBills || 0,
        value: (denomination.twoHundredBills || 0) * 200,
      },
      {
        name: "One Hundred",
        pcs: denomination.oneHundredBills || 0,
        value: (denomination.oneHundredBills || 0) * 100,
      },
      {
        name: "Fifty",
        pcs: denomination.fiftyBills || 0,
        value: (denomination.fiftyBills || 0) * 50,
      },
      {
        name: "Twenty",
        pcs: denomination.twentyBills || 0,
        value: (denomination.twentyBills || 0) * 20,
      },
    ],
    coins: [
      {
        name: "Twenty",
        pcs: denomination.twentyCoins || 0,
        value: (denomination.twentyCoins || 0) * 20,
      },
      {
        name: "Ten",
        pcs: denomination.tenCoins || 0,
        value: (denomination.tenCoins || 0) * 10,
      },
      {
        name: "Five",
        pcs: denomination.fiveCoins || 0,
        value: (denomination.fiveCoins || 0) * 5,
      },
      {
        name: "One",
        pcs: denomination.oneCoins || 0,
        value: (denomination.oneCoins || 0) * 1,
      },
      {
        name: "Twenty Five Cents",
        pcs: denomination.twentyFiveCents || 0,
        value: (denomination.twentyFiveCents || 0) * 0.25,
      },
    ],
  };

  const formatPrice = (price) => `₱${price.toFixed(2)}`;

  const generateTableBody = (data, columns, totals) => {
    // Helper function to fetch nested values using dot notation
    const getNestedValue = (obj, path) => {
      return path.split(".").reduce((acc, key) => (acc ? acc[key] : 0), obj);
    };
    // Calculate totals for the specified fields
    const totalRow = totals.reduce((acc, key) => {
      acc[key] = data.reduce(
        (sum, item) => sum + parseFloat(getNestedValue(item, key)) || 0,
        0
      );
      return acc;
    }, {});

    return [
      // Generate table body for data rows
      ...data.map((item) =>
        columns.map((col) => {
          if (col === "cake_report.user.employee") {
            // Format employee name if the column is for employee details
            const employee = getNestedValue(item, "cake_report.user.employee");
            return {
              text: employee ? formatFullname(employee) : "No Employee",
              style: "body",
              alignment: "center",
            };
          }

          // Default case for other columns
          return {
            text: col.includes(".")
              ? getNestedValue(item, col) || "-"
              : item[col] || "-",
            style: "body",
            alignment: "center",
          };
        })
      ),
      // Add totals row
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
          text: `₱ ${totalRow[key].toFixed(2)}`,
          style: "tableHeader",
          alignment: "center",
          color: "#020617",
        })),
      ],
    ];
  };

  let creditTotal = 0; // Initialize total sum

  const creditReportTableBody =
    creditReport.length > 0
      ? creditReport.map((creditData) => {
          // Dynamically calculate total amount for each row
          const totalAmount =
            (creditData.price || 0) * (creditData.pieces || 0);

          // Add to the running total
          creditTotal += totalAmount;

          return [
            {
              text: creditData.credit_user_id
                ? formatFullname(creditData.credit_user_id)
                : "No Employee",
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
              text: formatAmount(creditData.price), // Format price consistently
              style: "body",
              alignment: "center",
            },
            {
              text: formatAmount(totalAmount), // Format total amount
              style: "body",
              alignment: "center",
            },
          ];
        })
      : [[{ text: "No data available", colSpan: 5, alignment: "center" }]];

  // Add the totals row
  creditReportTableBody.push([
    {
      text: "Total",
      style: "bodyBold",
      alignment: "right",
      colSpan: 3, // Total label spans the first three columns
    },
    {}, // Empty cell to match colspan
    {},
    {
      text: formatAmount(creditTotal), // Dynamically calculate and format the total amount
      style: "bodyBold",
      alignment: "center",
      colSpan: 2, // Total amount spans the last two columns
    },
    {}, // Empty cell to match colspan
  ]);

  let expensesTotal = 0; // Initialize the total variable

  const expensesReportTableBody =
    expensesReport.length > 0
      ? expensesReport.map((expensesData) => {
          // Remove any non-numeric characters (like commas or currency symbols) and parse as float
          const amount = parseFloat(
            expensesData.amount.replace(/[^0-9.-]+/g, "")
          );

          // Check if the parsed amount is a valid number
          if (!isNaN(amount)) {
            expensesTotal += amount; // Only add valid numbers to the total
          }

          return [
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
              text: `${formatAmount(amount)}`, // Format the amount for display
              style: "body",
              alignment: "center",
            },
          ];
        })
      : [[{ text: "No data available", colSpan: 3, alignment: "center" }]];

  expensesReportTableBody.push([
    {
      text: "Total",
      style: "bodyBold",
      alignment: "right",
      colSpan: 2, // Total label spans the first two columns
    },
    {}, // Empty cell to match colspan
    {
      text: `${formatAmount(expensesTotal)}`, // Format the total amount
      style: "bodyBold",
      alignment: "center",
    },
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

  // console.log(
  //   "datadata",
  //   productionTypes.map((res) => ({
  //     ...res,
  //     data: res.data.map((bread) => ({
  //       ...bread,
  //       total: bread.beginnings + bread.new_production,
  //     })),
  //   }))
  // );
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

  // Calculate Total Product Sales Amount
  const totalProductSales = productionTypes.reduce((total, productionType) => {
    const typeTotal = productionType.data.reduce(
      (sum, item) => sum + (item.sales || 0),
      0
    );
    return total + typeTotal;
  }, 0);

  // Calculate the total denomination value
  const totalDenomination =
    denominationReport.bills.reduce((sum, bill) => sum + bill.value, 0) +
    denominationReport.coins.reduce((sum, coin) => sum + coin.value, 0);

  // Calculate expected cash
  const sum = expensesTotal + creditTotal;
  const expectedCash = totalProductSales - sum;

  // Determine Over Cash or Charges
  let overTotal = 0;
  let chargesAmount = 0;

  if (totalDenomination > expectedCash) {
    overTotal = totalDenomination - expectedCash;
  } else if (totalDenomination < expectedCash) {
    chargesAmount = expectedCash - totalDenomination;
  }
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
            text: formatAmount(totalDenomination),
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
            text: formatAmount(totalProductSales),
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
          { text: "Total Credits", style: "tableHeader", alignment: "left" },
          {
            text: formatAmount(creditTotal),
            style: "tableData",
            alignment: "center",
          },
        ],
        [
          { text: "Over Cash", style: "tableHeader", alignment: "left" },
          {
            text: formatAmount(overTotal),
            style: "tableData",
            alignment: "center",
          },
        ],
        [
          { text: "Charges", style: "tableHeader", alignment: "left" },
          {
            text: `${formatAmount(chargesAmount)}`,
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
            text: `Branch Name: ${report.branch?.name || "No Name"}
          Cashier: ${
            report.user?.employee
              ? formatFullname(report.user.employee)
              : "No Name"
          }
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
