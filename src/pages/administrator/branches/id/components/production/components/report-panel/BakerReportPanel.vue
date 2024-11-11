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
        <div class="row q-gutter-md">
          <div
            v-for="(bakerReport, index) in reportsData"
            :key="index"
            class="row q-gutter-sm"
          >
            <q-card
              flat
              dense
              bordered
              class="q-pa-md q-my-sm user-card"
              style="width: 675px; max-width: 1500px"
            >
              <div class="text-h6 row justify-between">
                <div>
                  {{
                    `${
                      capitalizeFirstLetter(
                        bakerReport.branch_recipe.recipe?.name
                      ) || "Unknown Recipe"
                    } (${bakerReport.recipe_category || "Unknown Category"})`
                  }}
                </div>
                <q-btn
                  padding="xs md"
                  label="Print"
                  icon="print"
                  outline
                  @click="openPrintDialog(bakerReport)"
                  class="user-button"
                ></q-btn>
              </div>
              <div>Time: {{ formatTimeFromDB(bakerReport.created_at) }}</div>
              <div>
                Status:
                <q-badge
                  align="middle"
                  :color="getBadgeStatusColor(bakerReport.status)"
                >
                  {{ capitalizeFirstLetter(bakerReport.status) }}
                </q-badge>
              </div>
              <q-card-section>
                <div
                  class="row items-start q-gutter-x-md text-overline elegant-text"
                >
                  <div class="row q-gutter-x-sm q-gutter-y-xm">
                    Actual Target:
                    <div>
                      <q-badge outline align="middle" color="teal">
                        {{ `${bakerReport?.actual_target || "No target"} pcs` }}
                      </q-badge>
                    </div>
                  </div>
                  <div class="row q-gutter-x-sm q-gutter-y-xm">
                    Kilo:
                    <div>
                      <q-badge outline align="middle" color="teal">
                        {{ `${bakerReport?.kilo || "No Kilo"} kgs` }}
                      </q-badge>
                    </div>
                  </div>
                  <div class="row q-gutter-x-sm">
                    Over:
                    <div>
                      <q-badge outline align="middle" color="teal">
                        {{ `${bakerReport.over} pcs` }}
                      </q-badge>
                    </div>
                  </div>
                  <div class="row q-gutter-x-sm">
                    Short:
                    <div>
                      <q-badge outline align="middle" color="teal">
                        {{ `${bakerReport.short} pcs` }}
                      </q-badge>
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-card-section>
                <div class="row">
                  <div class="col-6">
                    <div class="text-subtitle1" align="center">Ingredients</div>
                    <div class="row justify-center q-gutter-x-lg q-pa-lg">
                      <div>
                        <div
                          v-for="(
                            ingredient, index
                          ) in bakerReport.ingredient_bakers_reports || []"
                          :key="index"
                          class="row justify-between q-gutter-y-lg q-gutter-x-xl text-weight-light"
                        >
                          <div>
                            {{
                              ingredient?.ingredients?.name ||
                              "Unknown Ingredient"
                            }}
                          </div>
                          <div class="row items-start">
                            {{
                              `${ingredient?.quantity || "Unknown Quantity"} ${
                                ingredient?.ingredients?.unit || ""
                              }`
                            }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="text-subtitle1" align="center">Bread</div>
                    <div class="row justify-center q-gutter-x-lg q-pa-lg">
                      <div>
                        <div
                          v-for="(breadReport, index) in getBreadReports(
                            bakerReport
                          )"
                          :key="index"
                          class="row justify-between q-gutter-y-lg q-gutter-x-xl text-weight-light"
                        >
                          <div>
                            {{ breadReport?.bread?.name || "Unknown Bread" }}
                          </div>
                          <div>
                            <div
                              v-if="bakerReport.recipe_category === 'Filling'"
                            >
                              {{
                                `${breadReport?.filling_production || "0"} pcs`
                              }}
                            </div>
                            <div
                              v-else-if="
                                bakerReport.recipe_category === 'Dough'
                              "
                            >
                              {{ `${breadReport?.bread_new_production} pcs` }}
                            </div>
                            <div v-else>
                              {{ "0 pcs" }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { date, useQuasar } from "quasar";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fontes";
pdfMake.vfs = pdfFonts.default;
// import PrintReportDialog from "./PrintReportDialog.vue";

const props = defineProps(["bakersReport"]);
const reportsData = props.bakersReport;
console.log("Bakers Report", props.bakersReport);
const maximizedToggle = ref(true);
const printDialog = ref(false);

const pdfUrl = ref("");

const formatDate = (dateString) => {
  return date.formatDate(dateString, "MMM. DD, YYYY");
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

const generateDocDefinition = (bakerReport) => {
  console.log("bakerReport", bakerReport);
  const recipeName = `${bakerReport.branch_recipe.recipe.name} (${bakerReport.recipe_category})`;
  const target = bakerReport.branch_recipe.recipe.target;
  const actualTarget = bakerReport.actual_target;
  const kilo = bakerReport.kilo;
  const over = bakerReport.over;
  const short = bakerReport.short;

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
            text: `${target} pcs`,
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
</style>
