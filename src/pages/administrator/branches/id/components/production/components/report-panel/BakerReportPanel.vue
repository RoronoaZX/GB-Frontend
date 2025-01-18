<template>
  <div>
    <q-card class="my-card q-pa-md">
      <div class="row justify-between">
        <div class="text-h6">Baker Report</div>
        <!-- <div align="right">
          <q-btn
            padding="xs md"
            label="Print"
            icon="print"
            outline
            @click="openPrintDialog"
            class="user-button"
          />
          <div>
            <q-tooltip class="bg-blue-grey-6" :delay="200">
              Print Report
            </q-tooltip>
          </div>
        </div> -->
      </div>
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
      </div>
      <q-card-section>
        <q-table
          class="table-container sticky-header2"
          :columns="BakerReportsColumns"
          :rows="reportsData"
          row-key="name"
          :header-class="'custom-header'"
        >
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-badge
                align="middle"
                :color="getBadgeStatusColor(props.row.status)"
              >
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
                    @click="handleBakerReportEditDialog(props.row)"
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { date, useQuasar } from "quasar";
import BreadView from "./baker-report/BreadView.vue";
import IngredientsView from "./baker-report/IngredientsView.vue";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fontes";
import EditBakersReport from "./baker-report/EditBakersReport.vue";
pdfMake.vfs = pdfFonts.default;
// import PrintReportDialog from "./PrintReportDialog.vue";

const props = defineProps(["bakersReport"]);
const reportsData = props.bakersReport;
console.log("Bakers Report", props.bakersReport);
const maximizedToggle = ref(true);
const printDialog = ref(false);
const showing = ref(false);

const pdfUrl = ref("");
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

const handleBakerReportEditDialog = (bakerReports) => {
  $q.dialog({
    component: EditBakersReport,
    componentProps: {
      bakerReports: bakerReports,
    },
  });
};

const formatDate = (dateString) => {
  return date.formatDate(dateString, "MMM. DD, YYYY");
};

const formatTarget = (target) => {
  // Ensure the target is a number and default to 0 if undefined or null
  const numericTarget = Number(target) || 0;

  // Use parseFloat to remove trailing zeros if the value is decimal
  return parseFloat(numericTarget.toFixed(3)).toString();
};
const formatKilo = (target) => {
  // Ensure the target is a number and default to 0 if undefined or null
  const numericTarget = Number(target) || 0;

  // Use parseFloat to remove trailing zeros if the value is decimal
  return parseFloat(numericTarget.toFixed(3)).toString();
};

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// const printPdf = (bakerReport) => {
//   const docDefinition = generateDocDefinition(bakerReport);

//   // Open the generated PDF in a new tab or download directly
//   pdfMake.createPdf(docDefinition).print();
// };

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

const formatTimeFromDB = (dateString) => {
  const date = new Date(dateString);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleTimeString(undefined, options);
};

const formatAmount = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

const getBadgeStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "orange";
    case "declined":
      return "negative";
    case "confirmed":
      return "green";
    default:
      return "grey";
  }
};

const capitalizeName = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
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

const BakerReportsColumns = [
  {
    name: "recipe_name",
    align: "center",
    label: "Recipe Name",
    field: (row) => {
      if (row.branch_recipe && row.branch_recipe.recipe) {
        return {
          name: row.branch_recipe.recipe.name,
          category: row.branch_recipe.recipe.category,
        };
      } else {
        return {
          name: "N/A", // Fallback value for name
          category: "N/A", // Fallback value for category
        };
      }
    },
    format: (val) => `${capitalizeName(val.name)} (${val.category})`,
    sortable: true,
  },
  {
    name: "created_at",
    align: "center",
    label: "Time",
    field: "created_at",
    format: (val) => formatTimeFromDB(val),
  },
  {
    name: "kilo",
    align: "center",
    label: "Kilo / s",
    field: "kilo",
    format: (val) => `${formatKilo(val)}`,
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
  console.log("bakerReport", bakerReport);
  const recipeName = `${
    bakerReport?.branch_recipe?.recipe?.name ?? "Unkown Recipe"
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
            text: `${formatTarget(target)} pcs`,
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
            text: `${kilo} kg/s`,
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
              bakerReport.branch.name || "No name available"
            }
                Baker: ${formatFullname(
                  bakerReport?.user?.employee || "Unknown Baker Name"
                )}
                Recipe: ${bakerReport.recipe?.name || "Unknown Recipe"} (${
              bakerReport.recipe_category || "Unknown Category"
            })
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
                Time: ${formatTimeFromDB(bakerReport.created_at)}
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
                        text: breadReport?.bread?.name || "Unknown Bread",
                        style: "body",
                      },
                      {
                        text:
                          bakerReport.recipe_category === "Filling"
                            ? `${breadReport?.filling_production || "0"} pcs`
                            : `${breadReport?.bread_new_production} pcs`,
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
                            ingredient?.quantity || "Unknown Quantity"
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
  const docDefinition = generateDocDefinition(bakerReport);
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
