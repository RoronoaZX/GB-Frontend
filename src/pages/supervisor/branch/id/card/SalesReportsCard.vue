<template>
  <q-card class="sales-report-card">
    <q-card-section class="q-pa-lg">
      <div class="row items-center q-mb-md">
        <div class="col-12 col-sm-6">
          <div class="row items-center">
            <q-icon
              name="assessment"
              size="md"
              color="teal-7"
              class="q-mr-sm"
            />
            <div>
              <div class="text-h6 text-weight-bold text-dark">
                Sales Report {{ reportLabel }}
              </div>

              <div class="text-caption text-grey-7">
                {{ formatDate(reportsData[0]?.created_at) }} •
                {{ formatTime(reportsData[0]?.created_at) }}
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6">
          <div class="row justify-end q-gutter-sm q-mt-sm q-mt-sm-none">
            <q-btn
              v-if="negativeProducts.length"
              unelevated
              color="red-1"
              text-color="red-9"
              icon="warning_amber"
              label="Negative Products"
              class="negative-btn"
              @click="handleNegativeProductsDialog(negativeProducts)"
            >
              <q-badge floating color="red-9" rounded>
                {{ negativeProducts.length }}
              </q-badge>
              <q-tooltip>View products with negative sales</q-tooltip>
            </q-btn>

            <q-btn
              padding="md lg"
              label="Print Report"
              icon="print"
              outline
              class="print-btn"
              @click="openPrintDialog(reportsData[0])"
            >
              <q-tooltip>Generate PDF report</q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-12 col-md-6">
          <q-card flat bordered class="employee-card">
            <q-card-section class="q-pa-sm bg-teal-1">
              <div class="row items-center">
                <q-icon
                  name="people"
                  size="sm"
                  color="teal-8"
                  class="q-mr-sm"
                />
                <span class="text-weight-medium text-teal-9"
                  >Employee Charges</span
                >
              </div>
            </q-card-section>

            <q-card-section class="q-pa-md">
              <div
                v-if="reportsData[0]?.employee_salescharges_reports?.length"
                class="employee-list"
              >
                <div
                  v-for="(charge, index) in reportsData[0]
                    .employee_salescharges_reports"
                  :key="index"
                  class="employee-item row items-center justify-between q-mb-sm"
                >
                  <div class="row items-center">
                    <q-avatar size="32px" class="bg-teal-2 text-teal-8 q-mr-sm">
                      {{ getInitials(charge.employee) }}
                    </q-avatar>
                    <div>
                      <div class="text-weight-medium">
                        {{ formatFullname(charge.employee) }}
                      </div>
                      <div class="text-caption text-grey-6">
                        {{ charge?.employee?.position || "Staff" }}
                      </div>
                    </div>
                  </div>
                  <q-chip
                    :color="charge.calculated_charge > 0 ? 'red-1' : 'green-1'"
                    :text-color="
                      charge.calculated_charge > 0 ? 'red-9' : 'green-9'
                    "
                  >
                    {{ formatPrice(charge.calculated_charge || 0) }}
                  </q-chip>
                </div>
              </div>
              <div v-else class="text-center text-grey-6 q-py-md">
                <q-icon name="info" size="sm" class="q-mr-xs" />
                No employee charges
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-6">
          <q-card flat bordered class="financial-card">
            <q-card-section class="q-pa-sm bg-blue-1">
              <div class="row items-center">
                <q-icon
                  name="payments"
                  size="sm"
                  color="blue-8"
                  class="q-mr-sm"
                />
                <span class="text-weight-medium text-blue-9"
                  >Financial Summary</span
                >
              </div>
            </q-card-section>

            <q-card-section clas="q-pa-md">
              <div class="row q-col-gutter-sm">
                <div class="col-6">
                  <div class="summary-item">
                    <span class="text-caption text-grey-7">Short/Charge</span>
                    <div class="text-h6 text-weight-bold text-red-7">
                      {{ formatPrice(chargesAmountToBeSendToAPI) }}
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="summary-item">
                    <span class="text-caption text-grey-7">Over Cash</span>
                    <div class="text-h6 text-weight-bold text-green-7">
                      {{ formatPrice(overAmountToBeSendToAPI) }}
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="tab-navigation-container">
        <div class="tab-header">
          <div>Report Sections</div>
          <q-space />
          <div class="tab-hint">
            <q-icon name="info" size="xs" class="q-mr-xs" />
            Click to view details
          </div>
        </div>

        <q-tabs
          v-model="activeTab"
          dense
          class="text-grey-7"
          active-color="teal"
          indicator-color="teal"
          align="justify"
          narrow-indicator
          no-caps
        >
          <q-tab name="products" class="custom-tab">
            <div class="tab-content">
              <div class="tab-icon-wrapper">
                <q-icon name="inventory_2" size="sm" />
              </div>
              <div class="tab-text">
                <div class="tab-main-label">Products</div>
                <div class="tab-sub-label">Sales & Inventory</div>
              </div>
              <q-badge v-if="has">!</q-badge>
            </div>
          </q-tab>

          <q-tab name="denomination" class="custom-tab">
            <div class="tab-content">
              <div class="tab-icon-wrapper">
                <q-icon name="payments" size="sm" />
              </div>
              <div class="tab-text">
                <div class="tab-main-label">Denomination</div>
                <div class="tab-sub-label">Cash Breakdown</div>
              </div>
            </div>
          </q-tab>

          <q-tab name="expenses" class="custom-tab">
            <div class="tab-content">
              <div class="tab-icon-wrapper">
                <q-icon name="receipt" size="sm" />
              </div>
              <div class="tab-text">
                <div class="tab-main-label">Expenses</div>
                <div class="tab-sub-label">Costs & Deductions</div>
              </div>
              <q-badge v-if="hasExpenses" color="teal">{{
                expenseCount
              }}</q-badge>
            </div>
          </q-tab>

          <q-tab name="credits" class="custom-tab">
            <div class="tab-content">
              <div class="tab-icon-wrapper">
                <q-icon name="assignment" size="sm" />
              </div>
              <div class="tab-text">
                <div class="tab-main-label">Credits</div>
                <div class="tab-sub-label">Employee Credit</div>
              </div>
              <q-badge v-if="hasCredits" color="teal">{{
                creditCount
              }}</q-badge>
            </div>
          </q-tab>
        </q-tabs>
      </div>

      <q-tab-panels
        v-model="activeTab"
        animated
        class="custom-tab-panels"
        transition-prev="jump-right"
        transition-next="jump-left"
      >
        <q-tab-panel name="products" class="tab-panel">
          <div class="panel-header">
            <div class="panel-title">
              <q-icon name="inventory_2" size="sm" class="q-mr-sm text-teal" />
              Products Sales & Inventory
            </div>
          </div>
          <ProductionReport
            :sales_Reports="reportsData"
            :reportLabel="reportLabel"
            :reportDate="props.reportDate"
            :reportId="props.reportId"
            @update-summary="handleSummaryUpdate"
          />
        </q-tab-panel>

        <q-tab-panel name="denomination" class="tab-panel">
          <div class="panel-header">
            <div class="panel-title">
              <q-icon name="payments" size="sm" class="q-mr-sm text-blue" />
              Cash Denomination Breakdown
            </div>
          </div>
          <DenominationReport
            :sales_Reports="reportsData"
            :reportLabel="reportLabel"
            :reportDate="props.reportDate"
            :reportId="props.reportId"
            @update-summary="handleSummaryUpdate"
          />
        </q-tab-panel>

        <q-tab-panel name="expenses" class="tab-panel">
          <div class="panel-header">
            <div class="panel-title">
              <q-icon name="receipt" size="sm" class="q-mr-sm text-orange" />
              Expenses & Deductions
            </div>
          </div>
          <ExpensesReport
            :sales_Reports="reportsData"
            :reportLabel="reportLabel"
            :reportDate="props.reportDate"
            :reportId="props.reportId"
            @update-summary="handleSummaryUpdate"
          />
        </q-tab-panel>

        <q-tab-panel name="credits" class="tab-panel">
          <div class="panel-header">
            <div class="panel-title">
              <q-icon name="assignment" size="sm" class="q-mr-sm text-purple" />
              Customer Credits
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>

    <q-dialog
      v-model="printDialog"
      full-weight
      full-width
      position="right"
      :maximized="maximizedToggle"
    >
      <q-card class="print-dialog">
        <q-bar class="bg-primary text-white">
          <q-icon name="picture_as_pdf" />
          <div>Sales Report PDF</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="q-pa-more">
          <iframe :src="pdfUrl" width="100%" :style="iframeStyle" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script setup>
import { useQuasar } from "quasar";
import { typographyFormat } from "src/composables/typography/typography-format";
import { useProductionStore } from "src/stores/production";
import ProductionReport from "../card/sale-report-card-chilld-component/ProductionReport.vue";
import DenominationReport from "../card/sale-report-card-chilld-component/DenominationReport.vue";
import ExpensesReport from "../card/sale-report-card-chilld-component/ExpensesReport.vue";
import { computed, ref, watchEffect } from "vue";
import NegativeProductsDialog from "../card/sale-report-card-chilld-component/pages/NegativeDialog.vue";

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fontes";

const {
  capitalizeFirstLetter,
  formatFullname,
  formatDate,
  formatTime,
  formatPrice,
} = typographyFormat();

const productionStore = useProductionStore();
pdfMake.vfs = pdfFonts.default;

const activeTab = ref("products");
const printDialog = ref(false);
const pdfUrl = ref("");
const maximizedToggle = ref(true);
const chargesAmountToBeSendToAPI = ref(0);
const overAmountToBeSendToAPI = ref(0);

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

const $q = useQuasar();

const hasProductIssues = computed(() => negativeProducts.value.length > 0);

const hasExpenses = computed(
  () => reportsData[0]?.expenses_reports?.length || 0
);

const expenseCount = computed(
  () => reportsData[0]?.expenses_reports?.length || 0
);

const hasCredits = computed(() => {
  const creditReports = reportsData[0]?.credit_reports || [];
  return creditReports.some((report) => report.credit_products?.length > 0);
});

const creditCount = computed(() => {
  const creditReports = reportsData[0]?.credit_reports || [];
  return creditReports.reduce(
    (total, report) => total + (report.credit_products?.length || 0),
    0
  );
});

const getInitials = (employee) => {
  if (!employee) return "?";
  const firstName = employee.firstname?.[0] || "";
  const lastName = employee.lastname?.[0] || "";
  return (firstName + lastName).toUpperCase() || "?";
};

const iframeStyle = computed(() => ({
  height: "calc(100vh - 50px)",
  border: "none",
}));

const negativeProducts = computed(() => {
  if (!reportsData || !reportsData.length) return [];

  const report = reportsData[0];
  const negatives = [];

  const processCategory = (items, type) => {
    (items || []).forEach((item) => {
      const beginnings = Number(item.beginnings || 0);
      const added = Number(item.new_production || item.added_stocks || 0);
      const remaining = Number(item.remaining || 0);
      const out = Number(item.bread_out || item.out || 0);
      const price = Number(item.price || 0); // ✅ FIX

      const total = beginnings + added;
      const sold = total - (remaining + out);
      const sales = sold * price;

      if (sales < 0) {
        negatives.push({
          type,
          name:
            item.bread?.name ||
            item.selecta?.name ||
            item.nestle?.name ||
            item.softdrinks?.name ||
            item.other_products?.name ||
            "Unknown",
          sold,
          price,
          sales,
          beginnings,
          added,
          remaining,
          out,
        });
      }
    });
  };

  processCategory(report.bread_reports, "Bread");
  processCategory(report.selecta_reports, "Selecta");
  processCategory(report.nestle_reports, "Nestle");
  processCategory(report.softdrinks_reports, "Soft Drinks");
  processCategory(report.other_products_reports, "Other Products");

  console.log("Negative Products:", negatives);

  return negatives;
});

const calculateChargesAndOverFromProcessed = (report) => {
  if (!report) return { chargesAmount: 0, overAmount: 0, employeeCharges: [] };

  let negativeSalesChargesTotal = 0;
  let totalProductSales = 0;

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
        negativeSalesChargesTotal += Math.abs(sales);
      } else {
        totalProductSales += sales;
      }
    });
  };

  processCategory(report.bread_reports);
  processCategory(report.selecta_reports);
  processCategory(report.nestle_reports);
  processCategory(report.softdrinks_reports);
  processCategory(report.other_products_reports);

  (report.cake_sales_reports || []).forEach((item) => {
    totalProductSales += Number(item.price || 0);
  });

  const expensesTotal = (report.expenses_reports || []).reduce(
    (sum, e) => sum + Number(e.amount.replace(/[^0-9.-]+/g, "") || 0),
    0
  );

  const creditTotal = (report.credit_reports || [])
    .flatMap((cr) => cr.credit_products || [])
    .reduce((sum, c) => sum + Number(c.price || 0) * Number(c.pieces || 0), 0);

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

  const expectedCash = totalProductSales - (expensesTotal + creditTotal);
  let overAmount = 0;
  let shortageAmount = 0;

  if (totalDenomination > expectedCash) {
    overAmount = totalDenomination - expectedCash;
  } else if (totalDenomination < expectedCash) {
    shortageAmount = expectedCash - totalDenomination;
  }

  const finalChargesAmount = shortageAmount + negativeSalesChargesTotal;

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

    const employeeReports = reportsData[0].employee_salescharges_reports || [];
    const perEmployeeCharge = chargesAmount / (employeeReports.length || 1);

    employeeReports.forEach((e) => {
      e.calculated_charge = perEmployeeCharge;
    });
  }
});

const handleNegativeProductsDialog = (negativeProducts) => {
  console.log("negativeProducts", negativeProducts);
  $q.dialog({
    component: NegativeProductsDialog,
    componentProps: {
      negativeProducts: negativeProducts,
    },
  });
};

const formatAmount = (price) => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
  return formattedAmount.replace("₱", "₱ ");
};

const openPrintDialog = (report) => {
  const docDefinition = generateDocDefinition(report);
  pdfMake.createPdf(docDefinition).getDataUrl((dataUrl) => {
    pdfUrl.value = dataUrl;
    printDialog.value = true;
  });
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
        "out",
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
      title: "Nestle Production",
      data: (report.nestle_reports || []).map((item) => {
        const beginnings = Number(item.beginnings || 0);
        const newStocks = Number(item.added_stocks || 0);
        const nestleOut = Number(item.out || 0);
        const remaining = Number(item.remaining || 0);
        const price = Number(item.price || 0);

        const total = beginnings + newStocks;
        const totalNestleDifference = remaining + nestleOut;
        const sold = total - totalNestleDifference;
        const sales = sold * price;

        if (sales < 0) {
          negativeSalesChargesTotal += Math.abs(sales);
        }

        const nestleName = item.nestle?.name
          ? capitalizeFirstLetter(item.nestle.name)
          : "N/A";

        return {
          ...item,
          nestle: { ...item.nestle, name: nestleName },
          total,
          sold,
          sales,
        };
      }),

      columns: [
        "nestle.name",
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
      {
        columns: [
          {
            text: `Branch Name: ${report.branch?.name || "No name"}
            Employee(s):
            ${employeeChargesText}

            Date: ${formatDate(report.created_at)}\nTime: ${formatTime(
              report.created_at
            )}\n`,
            margin: [0, 0, 0, 10],
          },
          {},
        ],
      },
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
      header: { fontSize: 14, bold: true },
      subheader: { fontSize: 10, bold: true, margin: [0, 10, 0, 5] },
      tableHeader: { bold: true, fontSize: 8 },
      tableData: { fontSize: 10 },
      body: { fontSize: 8 },
    },
    pageMargins: [20, 20, 20, 20],
  };
};
</script>

<style lang="scss" scoped>
.expenses-report-container {
  width: 100%;
}

.summary-card {
  border-radius: 14px;
  border: 1px solid #f0f0f0;

  .summary-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.bg-orange-1 {
      background: #fff3e0;
    }
    &.bg-blue-1 {
      background: #e3f2fd;
    }
    &.bg-green-1 {
      background: #e8f5e9;
    }
  }
}

.search-input {
  :deep(.q-field__control) {
    border-radius: 30px;
    height: 44px;
  }
}

.expenses-list {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
}

.expense-card {
  border-radius: 14px;
  transition: all 0.2s;
  border: 1px solid #f0f0f0;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    border-color: #e0e0e0;
  }

  .expense-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.bg-orange-7 {
      background: #f57c00;
    }
    &.bg-primary-7 {
      background: #42a5f5;
    }
    &.bg-secondary-7 {
      background: #ab47bc;
    }
    &.bg-grey-6 {
      background: #757575;
    }
  }

  .expense-name {
    font-weight: 500;
    font-size: 0.95rem;
    color: #1e293b;
  }

  .expense-description {
    font-size: 0.75rem;
    color: #94a3b8;
    max-width: 180px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .expense-amount {
    font-weight: 600;
    font-size: 1rem;
  }

  .menu-btn {
    transition: all 0.2s;

    &:hover {
      background: #f5f5f5;
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #f8fafc;
  border-radius: 16px;
  padding: 40px 20px;
}

.menu-list {
  border-radius: 14px;

  .q-item {
    min-height: 40px;

    &:hover {
      background: #f5f5f5;
    }
  }
}

.edit-dialog {
  width: 340px;
  max-width: 90vw;
  border-radius: 20px;
  overflow: hidden;

  .edit-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.bg-primary-1 {
      background: #e3f2fd;
    }
    &.bg-secondary-1 {
      background: #f3e5f5;
    }
    &.bg-positive-1 {
      background: #e8f5e9;
    }
  }

  .edit-input {
    :deep(.q-field__control) {
      border-radius: 12px;
    }
  }
}

.delete-dialog {
  width: 300px;
  max-width: 80vw;
  border-radius: 20px;
  overflow: hidden;

  .delete-icon {
    width: 64px;
    height: 64px;
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.bg-negative-1 {
      background: #ffebee;
    }
  }
}

// List animations
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}

// Responsive
@media (max-width: 600px) {
  .summary-icon {
    width: 36px;
    height: 36px;

    i {
      font-size: 18px;
    }
  }

  .expense-name {
    font-size: 0.9rem;
  }

  .expense-amount {
    font-size: 0.9rem;
  }
}
</style>
