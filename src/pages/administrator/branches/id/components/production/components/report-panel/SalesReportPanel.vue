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

                  <div>
                    <q-tooltip class="bg-blue-grey-6" :delay="200">
                      Print Report
                    </q-tooltip>
                  </div>
                </div>
              </div>
              <div class="text-subtitle1 text-weight-regular">
                <div
                  v-if="report.employee_salescharges_reports?.length"
                  class="q-mt-sm"
                >
                  <div class="text-weight-medium">Employee:</div>

                  <div
                    v-for="(
                      charge, index
                    ) in report.employee_salescharges_reports"
                    :key="index"
                    class="q-ml-md"
                  >
                    <div class="text-overline">
                      <div>
                        {{
                          `${formatFullname(charge.employee)} - ${
                            charge?.employee?.position
                          } `
                        }}
                      </div>
                      <div>
                        Charges:
                        {{ formatPrice(charge.calculated_charge || 0) }}
                      </div>
                    </div>
                  </div>
                </div>
                <div>Date: {{ formatDate(report.created_at) }}</div>
                <div>Time: {{ formatTime(report.created_at) }}</div>
                <!-- <div>Date: {{ formatDate(props.reportDate) }}</div>
                <div>Time: {{ formatTime(props.reportDate) }}</div> -->
                <div>Short/Charge: {{ chargesAmountToBeSendToAPI }}</div>
                <div>Over Cash: {{ overAmountToBeSendToAPI }}</div>
              </div>
            </q-card-section>
            <div class="row q-gutter-sm q-pa-md">
              <ProductsReport
                :sales_Reports="[report]"
                :reportLabel="reportLabel"
                :reportDate="props.reportDate"
                :reportId="props.reportId"
                @update-summary="handleSummayUpdate"
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
import { ref, computed, watch, watchEffect } from "vue";
import ProductsReport from "./sales-report/ProductsReport.vue";
import DenominationReport from "./sales-report/DenominationReport.vue";
import ExpensesReport from "./sales-report/expenses/ExpensesReport.vue";
import CreditsReport from "./sales-report/credit/CreditsReport.vue";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fontes";
import { useProductionStore } from "src/stores/production";

import { typographyFormat } from "src/composables/typography/typography-format";

const {
  capitalizeFirstLetter,
  formatFullname,
  formatDate,
  formatTime,
  formatPrice,
} = typographyFormat();

const productionStore = useProductionStore();

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

const props = defineProps([
  "salesReport",
  "reportLabel",
  "reportDate",
  "reportId",
]);
const reportsData = props.salesReport;
console.log("reportsDatasssss", reportsData);
console.log("reportsDatasssss", props.salesReport);
console.log("reportDatessssss", props.reportDate);

const maximizedToggle = ref(true);
const printDialog = ref(false);
const pdfUrl = ref("");

const chargesAmountToBeSendToAPI = ref(0);
const overAmountToBeSendToAPI = ref(0);

// const calculateChargesAndOverFromProcessed = (report) => {
//   if (!report) return { chargesAmount: 0, overAmount: 0 };

//   // 1️⃣ Combine all production types with calculated sales
//   const productionTypes = [
//     ...(report.bread_reports || []).map((item) => {
//       const total =
//         Number(item.beginnings || 0) + Number(item.new_production || 0);
//       const breadSold =
//         total - (Number(item.remaining || 0) + Number(item.bread_out || 0));
//       const sales = breadSold * Number(item.price || 0);
//       return { sales };
//     }),
//     ...(report.selecta_reports || []).map((item) => {
//       const total =
//         Number(item.beginnings || 0) + Number(item.added_stocks || 0);
//       const sold =
//         total - (Number(item.remaining || 0) + Number(item.out || 0));
//       const sales = sold * Number(item.price || 0);
//       return { sales };
//     }),
//     ...(report.softdrinks_reports || []).map((item) => {
//       const total =
//         Number(item.beginnings || 0) + Number(item.added_stocks || 0);
//       const sold =
//         total - (Number(item.remaining || 0) + Number(item.out || 0));
//       const sales = sold * Number(item.price || 0);
//       return { sales };
//     }),
//     ...(report.other_products_reports || []).map((item) => {
//       const total =
//         Number(item.beginnings || 0) + Number(item.added_stocks || 0);
//       const sold =
//         total - (Number(item.remaining || 0) + Number(item.out || 0));
//       const sales = sold * Number(item.price || 0);
//       return { sales };
//     }),
//     ...(report.cake_sales_reports || []).map((item) => ({
//       sales: Number(item.sales || 0), // Already given for cakes
//     })),
//   ];

//   // 2️⃣ Total Product Sales
//   const totalProductSales = productionTypes.reduce(
//     (sum, item) => sum + (item.sales || 0),
//     0
//   );

//   // 3️⃣ Total Expenses
//   const expensesTotal = (report.expenses_reports || []).reduce(
//     (sum, e) => sum + Number(e.amount.replace(/[^0-9.-]+/g, "") || 0),
//     0
//   );

//   // 4️⃣ Total Credits
//   const creditTotal = (report.credit_reports || [])
//     .flatMap((cr) => cr.credit_products || [])
//     .reduce((sum, c) => sum + Number(c.price || 0) * Number(c.pieces || 0), 0);

//   // 5️⃣ Total Denomination
//   const denomination = report.denomination_reports[0] || {};
//   const totalDenomination =
//     (denomination.oneThousandBills || 0) * 1000 +
//     (denomination.fiveHundredBills || 0) * 500 +
//     (denomination.twoHundredBills || 0) * 200 +
//     (denomination.oneHundredBills || 0) * 100 +
//     (denomination.fiftyBills || 0) * 50 +
//     (denomination.twentyBills || 0) * 20 +
//     (denomination.twentyCoins || 0) * 20 +
//     (denomination.tenCoins || 0) * 10 +
//     (denomination.fiveCoins || 0) * 5 +
//     (denomination.oneCoins || 0) * 1 +
//     (denomination.twentyFiveCents || 0) * 0.25;

//   // 6️⃣ Expected Cash
//   const expectedCash = totalProductSales - (expensesTotal + creditTotal);

//   // 7️⃣ Determine Over or Charges
//   let overAmount = 0;
//   let chargesAmount = 0;

//   if (totalDenomination > expectedCash) {
//     overAmount = totalDenomination - expectedCash;
//   } else if (totalDenomination < expectedCash) {
//     chargesAmount = expectedCash - totalDenomination;
//   }

//   // Example: proportional charges per employee
//   const employeeCharges = (report.employee_salescharges_reports || []).map(
//     (charge) => ({
//       ...charge,
//       calculated_charge:
//         ((charge.charge_amount || 0) / totalProductSales) * chargesAmount, // proportional
//     })
//   );

//   console.log("Calculated charges:", employeeCharges);
//   console.log("overAmount", overAmount);
//   console.log("chargesAmount", chargesAmount);

//   return { overAmount, chargesAmount, employeeCharges };
// };

// watchEffect(() => {
//   if (reportsData && reportsData.length > 0) {
//     const { overAmount, chargesAmount, employeeCharges } =
//       calculateChargesAndOverFromProcessed(reportsData[0]);
//     overAmountToBeSendToAPI.value = overAmount;
//     chargesAmountToBeSendToAPI.value = chargesAmount;

//     productionStore.setAmounts(
//       overAmountToBeSendToAPI.value,
//       chargesAmountToBeSendToAPI.value
//     );

//     // Update reactive employee charges
//     reportsData[0].employee_salescharges_reports = employeeCharges;
//   }
// });

const calculateChargesAndOverFromProcessed = (report) => {
  if (!report) return { chargesAmount: 0, overAmount: 0, employeeCharges: [] };

  let negativeSalesChargesTotal = 0;
  let totalProductSales = 0;

  // 1️⃣ Process Production categories and track Negative Sales
  const processCategory = (reports) => {
    (reports || []).forEach((item) => {
      const beginnings = Number(item.beginnings || 0);
      const added = Number(item.new_production || item.added_stocks || 0);
      const remaining = Number(item.remaining || 0);
      const out = Number(item.bread_out || item.out || 0);
      const price = Number(item.price || 0);

      const totalItems = beginnings + added;
      const difference = remaining + out;
      const sold = totalItems - difference;
      const sales = sold * price;

      if (sales < 0) {
        // If sales are negative, accumulate as a charge
        negativeSalesChargesTotal += Math.abs(sales);
      } else {
        // If sales are positive, add to total revenue
        totalProductSales += sales;
      }
    });
  };

  processCategory(report.bread_reports);
  processCategory(report.selecta_reports);
  processCategory(report.softdrinks_reports);
  processCategory(report.other_products_reports);

  // Add Cake Sales to total revenue
  (report.cake_sales_reports || []).forEach((item) => {
    totalProductSales += Number(item.price || 0);
  });

  // 2️⃣ Total Expenses
  const expensesTotal = (report.expenses_reports || []).reduce(
    (sum, e) => sum + Number(e.amount.replace(/[^0-9.-]+/g, "") || 0),
    0
  );

  // 3️⃣ Total Credits
  const creditTotal = (report.credit_reports || [])
    .flatMap((cr) => cr.credit_products || [])
    .reduce((sum, c) => sum + Number(c.price || 0) * Number(c.pieces || 0), 0);

  // 4️⃣ Total Denomination (Actual Cash)
  const denomination = report.denomination_reports[0] || {};
  const totalDenomination =
    (denomination.oneThousandBills || 0) * 1000 +
    (denomination.fiveHundredBills || 0) * 500 +
    (denomination.twoHundredBills || 0) * 200 +
    (denomination.oneHundredBills || 0) * 100 +
    (denomination.fiftyBills || 0) * 50 +
    (denomination.twentyBills || 0) * 20 +
    (denomination.twentyCoins || 0) * 20 +
    (denomination.tenCoins || 0) * 10 +
    (denomination.fiveCoins || 0) * 5 +
    (denomination.oneCoins || 0) * 1 +
    (denomination.twentyFiveCents || 0) * 0.25;

  // 5️⃣ Expected Cash
  const expectedCash = totalProductSales - (expensesTotal + creditTotal);

  // 6️⃣ Determine Over or Shortage
  let overAmount = 0;
  let shortageAmount = 0;

  if (totalDenomination > expectedCash) {
    overAmount = totalDenomination - expectedCash;
  } else if (totalDenomination < expectedCash) {
    shortageAmount = expectedCash - totalDenomination;
  }

  // 7️⃣ Final Charges = Cash Shortage + Inventory Discrepancies
  const finalChargesAmount = shortageAmount + negativeSalesChargesTotal;

  console.log("Total Product Sales (Positive):", totalProductSales);
  console.log("Negative Sales Discrepancies:", negativeSalesChargesTotal);
  console.log("Cash Shortage:", shortageAmount);
  console.log("Final Charges to API:", finalChargesAmount);

  return {
    overAmount,
    chargesAmount: finalChargesAmount,
    employeeCharges: report.employee_salescharges_reports || [],
  };
};

watchEffect(() => {
  if (reportsData && reportsData.length > 0) {
    const { overAmount, chargesAmount } = calculateChargesAndOverFromProcessed(
      reportsData[0]
    );

    overAmountToBeSendToAPI.value = overAmount;
    chargesAmountToBeSendToAPI.value = chargesAmount;

    productionStore.setAmounts(overAmount, chargesAmount);

    // Distribute charges evenly among employees
    const employeeReports = reportsData[0].employee_salescharges_reports || [];
    const perEmployeeCharge = chargesAmount / (employeeReports.length || 1);

    employeeReports.forEach((e) => {
      e.calculated_charge = perEmployeeCharge;
    });
  }
});

// watchEffect(() => {
//   if (reportsData && reportsData.length > 0) {
//     const { overAmount, chargesAmount, employeeCharges } =
//       calculateChargesAndOverFromProcessed(reportsData[0]);

//     overAmountToBeSendToAPI.value = overAmount;
//     chargesAmountToBeSendToAPI.value = chargesAmount;
//     productionStore.setAmounts(overAmount, chargesAmount);

//     // Update reactive employee charges
//     reportsData[0].employee_salescharges_reports = employeeCharges;
//   }
// });

const formatAmount = (price) => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
  return formattedAmount.replace("₱", "₱\t");
};
const generateDocDefinition = (report) => {
  // Initialize a variable to track the cost of negative sales (missing inventory)
  let negativeSalesChargesTotal = 0;

  const employeeChargesText = report.employee_salescharges_reports?.length
    ? report.employee_salescharges_reports
        .map((charge) => {
          const name = formatFullname(charge.employee);
          const position = charge?.employee?.position
            ? ` - ${charge.employee.position}`
            : "";
          const amount = `Charge: ₱${Number(
            charge.calculated_charge || 0
          ).toFixed(2)}`;

          return `${name}${position} (${amount})`;
        })
        .join("\n")
    : "No Employee";

  const allCreditProducts = computed(() => {
    return report.credit_reports.flatMap((report) => report.credit_products);
  });

  const productionTypes = [
    {
      title: "Bread Production",
      data: (report.bread_reports || []).map((item) => {
        const beginnings = Number(item.beginnings) || 0;
        const newProduction = Number(item.new_production) || 0;
        const remaining = Number(item.remaining) || 0;
        const breadOut = Number(item.bread_out) || 0;
        const price = Number(item.price) || 0;

        const total = beginnings + newProduction;
        const totalBreadDifference = remaining + breadOut;
        const breadSold = total - totalBreadDifference;
        const sales = breadSold * price;

        // If sales are negative, add to the charges accumulator
        if (sales < 0) {
          negativeSalesChargesTotal += Math.abs(sales);
        }

        const breadName = item.bread?.name
          ? capitalizeFirstLetter(item.bread.name)
          : "N/A";

        return {
          ...item,
          bread: { ...item.bread, name: breadName },
          total,
          sold: breadSold,
          sales,
        };
      }),
      columns: [
        "bread.name",
        "beginnings",
        "price",
        "new_production",
        "bread_out",
        "sold",
        "remaining",
        "sales",
      ],
      totals: ["sales"],
    },
    {
      title: "Selecta Production",
      data: (report.selecta_reports || []).map((item) => {
        const beginnings = Number(item.beginnings || 0);
        const newStocks = Number(item.added_stocks || 0);
        const selectaOut = Number(item.out || 0);
        const remaining = Number(item.remaining || 0);
        const price = Number(item.price || 0);

        const total = beginnings + newStocks;
        const totalSelectaDifference = remaining + selectaOut;
        const sold = total - totalSelectaDifference;
        const sales = sold * price;

        if (sales < 0) {
          negativeSalesChargesTotal += Math.abs(sales);
        }

        const selectaName = item.selecta?.name
          ? capitalizeFirstLetter(item.selecta.name)
          : "N/A";

        return {
          ...item,
          selecta: { ...item.selecta, name: selectaName },
          total,
          sold,
          sales,
        };
      }),
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
        const beginnings = Number(item.beginnings || 0);
        const addedStocks = Number(item.added_stocks || 0);
        const out = Number(item.out || 0);
        const remaining = Number(item.remaining || 0);
        const price = Number(item.price || 0);

        const total = beginnings + addedStocks;
        const totalSoftdrinksDifference = remaining + out;
        const sold = total - totalSoftdrinksDifference;
        const sales = sold * price;

        if (sales < 0) {
          negativeSalesChargesTotal += Math.abs(sales);
        }

        const softdrinksName = item.softdrinks.name
          ? capitalizeFirstLetter(item.softdrinks.name)
          : "N/A";

        return {
          ...item,
          softdrinks: { ...item.softdrinks, name: softdrinksName },
          total,
          sold,
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
        const beginnings = Number(item.beginnings || 0);
        const addedStocks = Number(item.added_stocks || 0);
        const out = Number(item.out || 0);
        const remaining = Number(item.remaining || 0);
        const price = Number(item.price || 0);

        const total = beginnings + addedStocks;
        const totalOtherProductsDifference = remaining + out;
        const sold = total - totalOtherProductsDifference;
        const sales = sold * price;

        if (sales < 0) {
          negativeSalesChargesTotal += Math.abs(sales);
        }

        const otherProductName = item.other_products.name
          ? capitalizeFirstLetter(item.other_products.name)
          : "N/A";

        return {
          ...item,
          other_products: { ...item.other_products, name: otherProductName },
          total,
          sold,
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
  const denominationTotal = report.denomination_total || 0;

  const generateTableBody = (data, columns, totals) => {
    const getNestedValue = (obj, path) => {
      return path.split(".").reduce((acc, key) => (acc ? acc[key] : 0), obj);
    };

    const totalRow = totals.reduce((acc, key) => {
      // Logic: Only sum positive sales for the table footer "Overall Total"
      acc[key] = data.reduce((sum, item) => {
        const val = parseFloat(getNestedValue(item, key)) || 0;
        return sum + (val > 0 ? val : 0);
      }, 0);
      return acc;
    }, {});

    return [
      ...data.map((item) =>
        columns.map((col) => {
          const val = getNestedValue(item, col);
          return {
            text: col.includes(".") ? val || "-" : item[col] || "-",
            style: "body",
            alignment: "center",
            // Make negative values red in the production tables
            color: typeof val === "number" && val < 0 ? "red" : "black",
          };
        })
      ),
      [
        {
          text: "Overall Total",
          colSpan: columns.length - totals.length,
          style: "tableHeader",
          alignment: "right",
        },
        ...Array(columns.length - totals.length - 1).fill({}),
        ...totals.map((key) => ({
          text: `₱ ${totalRow[key].toFixed(2)}`,
          style: "tableHeader",
          alignment: "center",
        })),
      ],
    ];
  };

  // Process Credits Total
  let creditTotal = 0;
  creditReport.forEach(
    (c) => (creditTotal += (c.price || 0) * (c.pieces || 0))
  );

  // Process Expenses Total
  let expensesTotal = 0;
  expensesReport.forEach((e) => {
    const amt = parseFloat(e.amount.replace(/[^0-9.-]+/g, ""));
    if (!isNaN(amt)) expensesTotal += amt;
  });

  // Calculate Summary Values
  // 1. Total Product Sales (Only sum positive entries)
  const totalProductSales = productionTypes.reduce((total, type) => {
    const typeTotal = type.data.reduce((sum, item) => {
      const s = item.sales || item.cake_report?.price || 0;
      return sum + (s > 0 ? s : 0);
    }, 0);
    return total + typeTotal;
  }, 0);

  // 2. Expected Cash
  const expectedCash = totalProductSales - (expensesTotal + creditTotal);

  // 3. Overage or Shortage
  let overTotal = 0;
  let shortageAmount = 0;

  if (denominationTotal > expectedCash) {
    overTotal = denominationTotal - expectedCash;
  } else if (denominationTotal < expectedCash) {
    shortageAmount = expectedCash - denominationTotal;
  }

  // 4. Final Charges = Cash Shortage + Negative Inventory Discrepancies
  const finalCharges = shortageAmount + negativeSalesChargesTotal;

  // Sync with API refs
  if (typeof overAmountToBeSendToAPI.value !== "undefined")
    overAmountToBeSendToAPI.value = overTotal;
  if (typeof chargesAmountToBeSendToAPI.value !== "undefined")
    chargesAmountToBeSendToAPI.value = finalCharges;

  // SUMMARY TABLE (MATCHING YOUR IMAGE DESIGN)
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
            alignment: "right",
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
            alignment: "right",
          },
        ],
        [
          { text: "Total Expenses", style: "tableHeader", alignment: "left" },
          {
            text: formatAmount(expensesTotal),
            style: "tableData",
            alignment: "right",
          },
        ],
        [
          { text: "Total Credits", style: "tableHeader", alignment: "left" },
          {
            text: formatAmount(creditTotal),
            style: "tableData",
            alignment: "right",
          },
        ],
        [
          { text: "Over Cash", style: "tableHeader", alignment: "left" },
          {
            text: formatAmount(overTotal),
            style: "tableData",
            alignment: "right",
          },
        ],
        [
          { text: "Charges", style: "tableHeader", alignment: "left" },
          {
            text: formatAmount(finalCharges),
            style: "tableData",
            alignment: "right",
          },
        ],
      ],
    },
    layout: {
      paddingLeft: () => 5,
      paddingRight: () => 5,
      paddingTop: () => 3,
      paddingBottom: () => 3,
    },
  };

  const tables = productionTypes.map(({ title, data, columns, totals }) => ({
    stack: [
      { text: title, style: "subheader", alignment: "center" },
      {
        table: {
          headerRows: 1,
          widths: Array(columns.length).fill("*"),
          body: [
            columns.map((col) => ({
              text: col.split(".").pop().replace(/_/g, " ").toUpperCase(),
              style: "tableHeader",
              alignment: "center",
            })),
            ...generateTableBody(data, columns, totals),
          ],
        },
      },
    ],
  }));

  return {
    content: [
      { text: "Sales Report", style: "header", alignment: "center" },
      { text: `Date: ${formatDate(report.created_at)}`, margin: [0, 0, 0, 10] },
      ...tables,
      {
        text: "Summary",
        style: "subheader",
        alignment: "center",
        margin: [0, 20, 0, 5],
      },
      summaryTable,
    ],
    styles: {
      header: { fontSize: 16, bold: true },
      subheader: { fontSize: 12, bold: true, margin: [0, 10, 0, 5] },
      tableHeader: { bold: true, fontSize: 10 },
      tableData: { fontSize: 10 },
      body: { fontSize: 8 },
    },
    pageMargins: [20, 20, 20, 20],
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
