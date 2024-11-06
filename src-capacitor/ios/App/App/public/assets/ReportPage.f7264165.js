import { _ as _export_sfc, o as openBlock, c as createBlock, M as QBtn, n as ref, a4 as createElementBlock, a as createVNode, w as withCtx, Q as QCard, I as QCardSection, J as createBaseVNode, a0 as toDisplayString, a1 as createTextVNode, a5 as Fragment, a6 as renderList, be as createCommentVNode, a3 as QDialog, O as pushScopeId, R as popScopeId, g as computed, u as watch, z as onMounted, L as QIcon, br as QSpinner, K as QInput } from "./index.9b9dbcba.js";
import { Q as QBadge } from "./QBadge.cf1023ef.js";
import { a as QTd, b as QTable } from "./QTable.0bf3c36f.js";
import { Q as QBanner } from "./QBanner.c0e0fb73.js";
import { u as useBakerReportsStore } from "./baker-report.c43048c5.js";
import { Q as QChip } from "./QChip.d5fc407c.js";
import { q as quasarDate } from "./date.b17495f5.js";
import "./QVirtualScroll.3c7f7fea.js";
import "./QList.8d472d75.js";
import "./rtl.276c3f1b.js";
import "./QItemLabel.345b9721.js";
import "./QItem.79579b05.js";
import "./QMenu.d2cee634.js";
import "./format.76edee29.js";
import "./axios.91431b0b.js";
const _sfc_main$3 = {};
function _sfc_render(_ctx, _cache) {
  return openBlock(), createBlock(QBtn, {
    class: "q-pa-sm",
    color: "red-6",
    dense: "",
    elevated: "",
    icon: "add_circle",
    label: "Create Report",
    to: "/branch/baker/create_report"
  });
}
var ReportCreate = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render], ["__file", "ReportCreate.vue"]]);
var ReportView_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-170d8839"), n = n(), popScopeId(), n);
const _hoisted_1$2 = { class: "text-h6 text-weight-regular" };
const _hoisted_2$2 = { class: "report-section" };
const _hoisted_3$2 = { class: "section-content" };
const _hoisted_4$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("strong", null, "Date:", -1));
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("strong", null, "Branch:", -1));
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("strong", null, "Baker:", -1));
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("strong", null, "Kilo:", -1));
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("strong", null, "Over:", -1));
const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("strong", null, "Actual Target:", -1));
const _hoisted_10 = { class: "status-chip" };
const _hoisted_11 = {
  key: 0,
  class: "report-section"
};
const _hoisted_12 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "section-title" }, "Ingredients", -1));
const _hoisted_13 = {
  key: 1,
  class: "report-section"
};
const _hoisted_14 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "section-title" }, "Breads", -1));
const _hoisted_15 = {
  key: 2,
  class: "report-section"
};
const _hoisted_16 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "section-title" }, "Fillings", -1));
const _sfc_main$2 = {
  __name: "ReportView",
  props: {
    report: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const bakersReportDialog = ref(false);
    const capitalizeFirstLetterStatus = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    const capitalizeFirstLetter = (fullName) => {
      const nameParts = fullName.split(" ");
      const firstName = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1).toLowerCase();
      const lastName = nameParts[nameParts.length - 1].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].slice(1).toLowerCase();
      let middleNames = "";
      if (nameParts.length > 2) {
        middleNames = nameParts.slice(1, -1).map((name) => `${name.charAt(0).toUpperCase()}.`).join(" ");
      }
      return `${firstName} ${middleNames} ${lastName}`.trim();
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
    const openBakersReportsDialog = () => {
      bakersReportDialog.value = true;
    };
    const formatDate = (dateString) => {
      return quasarDate.formatDate(dateString, "MMMM D, YYYY");
    };
    const formatQuantity = (quantity) => {
      if (quantity >= 1e3) {
        const kilos = quantity / 1e3;
        const unit = kilos === 1 ? "kg" : "kgs";
        return `${kilos} ${unit}`;
      }
      return `${quantity} grams`;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          color: "accent",
          icon: "visibility",
          size: "md",
          flat: "",
          round: "",
          dense: "",
          onClick: openBakersReportsDialog
        }),
        createVNode(QDialog, {
          modelValue: bakersReportDialog.value,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => bakersReportDialog.value = $event),
          class: "report-dialog"
        }, {
          default: withCtx(() => [
            createVNode(QCard, { class: "report-card" }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "report-header" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_1$2, toDisplayString(__props.report.recipe.name) + " - " + toDisplayString(__props.report.recipe_category), 1),
                    createVNode(QBtn, {
                      class: "close-btn",
                      color: "grey-8",
                      flat: "",
                      round: "",
                      dense: "",
                      icon: "close",
                      onClick: _cache[0] || (_cache[0] = ($event) => bakersReportDialog.value = false)
                    })
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, { class: "report-info" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2$2, [
                      createBaseVNode("div", _hoisted_3$2, [
                        createBaseVNode("div", null, [
                          _hoisted_4$1,
                          createTextVNode(" " + toDisplayString(formatDate(__props.report.created_at)), 1)
                        ]),
                        createBaseVNode("div", null, [
                          _hoisted_5,
                          createTextVNode(" " + toDisplayString(__props.report.branch.name), 1)
                        ]),
                        createBaseVNode("div", null, [
                          _hoisted_6,
                          createTextVNode(" " + toDisplayString(capitalizeFirstLetter(__props.report.user.name)), 1)
                        ]),
                        createBaseVNode("div", null, [
                          _hoisted_7,
                          createTextVNode(" " + toDisplayString(__props.report.kilo), 1)
                        ]),
                        createBaseVNode("div", null, [
                          _hoisted_8,
                          createTextVNode(" " + toDisplayString(__props.report.over), 1)
                        ]),
                        createBaseVNode("div", null, [
                          _hoisted_9,
                          createTextVNode(" " + toDisplayString(__props.report.actual_target), 1)
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_10, [
                        createVNode(QChip, {
                          square: "",
                          color: getBadgeStatusColor(__props.report.status),
                          "text-color": "white"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(capitalizeFirstLetterStatus(__props.report.status)), 1)
                          ]),
                          _: 1
                        }, 8, ["color"])
                      ])
                    ]),
                    __props.report.ingredient_bakers_reports && __props.report.ingredient_bakers_reports.length ? (openBlock(), createElementBlock("div", _hoisted_11, [
                      _hoisted_12,
                      createBaseVNode("ul", null, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.report.ingredient_bakers_reports, (ingredient) => {
                          return openBlock(), createElementBlock("li", {
                            key: ingredient.id
                          }, [
                            createBaseVNode("strong", null, toDisplayString(ingredient.ingredients.code), 1),
                            createTextVNode(" - " + toDisplayString(formatQuantity(ingredient.quantity)), 1)
                          ]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true),
                    __props.report.bread_bakers_reports && __props.report.bread_bakers_reports.length ? (openBlock(), createElementBlock("div", _hoisted_13, [
                      _hoisted_14,
                      createBaseVNode("ul", null, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.report.bread_bakers_reports, (bread) => {
                          return openBlock(), createElementBlock("li", {
                            key: bread.id
                          }, [
                            createBaseVNode("strong", null, toDisplayString(bread.bread.name), 1),
                            createTextVNode(" - " + toDisplayString(bread.bread_production) + " pcs ", 1)
                          ]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true),
                    __props.report.filling_bakers_reports && __props.report.filling_bakers_reports.length ? (openBlock(), createElementBlock("div", _hoisted_15, [
                      _hoisted_16,
                      createBaseVNode("ul", null, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.report.filling_bakers_reports, (filling) => {
                          return openBlock(), createElementBlock("li", {
                            key: filling.id
                          }, [
                            createBaseVNode("strong", null, toDisplayString(filling.bread.name), 1),
                            createTextVNode(" - " + toDisplayString(filling.filling_production) + " pcs ", 1)
                          ]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ], 64);
    };
  }
};
var ReportView = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-170d8839"], ["__file", "ReportView.vue"]]);
var ReportTable_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$1 = { class: "q-mt-sm q-gutter-md" };
const _hoisted_2$1 = { class: "table-container" };
const _hoisted_3$1 = {
  key: 0,
  class: "loading-overlay row justify-center items-center"
};
const _hoisted_4 = {
  key: 1,
  class: "q-pa-md q-gutter-md row justify-center"
};
const _sfc_main$1 = {
  __name: "ReportTable",
  setup(__props) {
    var _a;
    const pagination = ref({
      rowsPerPage: 0
    });
    const bakerReportStore = useBakerReportsStore();
    const bakerReportRow = computed(() => bakerReportStore.reportToView);
    const userData = computed(() => bakerReportStore.user);
    const userId = ((_a = userData.value) == null ? void 0 : _a.data.id) || "";
    const filter = ref("");
    const loading = ref(true);
    const loadingSearchIcon = ref(false);
    const showNoDataMessage = ref(false);
    watch(filter, async (newFilter) => {
      loadingSearchIcon.value = true;
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      loadingSearchIcon.value = false;
      showNoDataMessage.value = !loading.value && filteredRows.value.length === 0;
      console.log("Filtered Rows:", filteredRows.value);
    });
    onMounted(async () => {
      console.log("props.branchId in onMounted:", userId);
      if (userId) {
        await reloadTableData(userId);
      }
    });
    const reloadTableData = async (userId2) => {
      loading.value = true;
      await bakerReportStore.fetchBakerReport(userId2);
      loading.value = false;
    };
    const filteredRows = computed(() => {
      if (!filter.value) {
        return bakerReportRow.value;
      }
      const filterText = filter.value.toLowerCase();
      return bakerReportRow.value.filter(
        (row) => row.name && row.name.toLowerCase().includes(filterText) || row.created_at && quasarDate.formatDate(row.created_at, "MMMM D, YYYY").toLowerCase().includes(filterText) || row.recipe && row.recipe.name && row.recipe.name.toLowerCase().includes(filterText) || row.recipe && row.recipe.category && row.recipe.category.toLowerCase().includes(filterText)
      );
    });
    const formatDate = (dateString) => {
      return quasarDate.formatDate(dateString, "MMMM D, YYYY");
    };
    const bakersReportListColumns = [
      {
        name: "date",
        align: "left",
        label: "Date",
        field: "created_at",
        format: formatDate,
        sortable: true
      },
      {
        name: "name",
        label: "Reports Name",
        align: "center",
        field: (row) => ({ name: row.recipe.name, category: row.recipe.category }),
        format: (val) => `${val.name} (${val.category})`,
        sortable: true
      },
      {
        name: "status",
        align: "center",
        label: "Status",
        field: "status"
      },
      {
        name: "view",
        align: "right",
        label: "View",
        field: "view"
      }
    ];
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
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", null, [
          createVNode(QInput, {
            rounded: "",
            outlined: "",
            dense: "",
            debounce: "300",
            modelValue: filter.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filter.value = $event),
            placeholder: "Search",
            style: { "width": "500px", "max-width": "1500px", "min-width": "100px" }
          }, {
            append: withCtx(() => [
              !loadingSearchIcon.value ? (openBlock(), createBlock(QIcon, {
                key: 0,
                name: "search"
              })) : (openBlock(), createBlock(QSpinner, { key: 1 }))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        createBaseVNode("div", _hoisted_2$1, [
          createVNode(QTable, {
            class: "sticky-header",
            filter: filter.value,
            flat: "",
            columns: bakersReportListColumns,
            rows: filteredRows.value,
            "row-key": "name",
            "virtual-scroll-sticky-size-start": 48,
            "virtual-scroll": "",
            pagination: pagination.value,
            "onUpdate:pagination": _cache[1] || (_cache[1] = ($event) => pagination.value = $event),
            "rows-per-page-options": [0],
            "hide-bottom": "",
            style: { "height": "900px", "max-height": "1000px", "min-height": "none" }
          }, {
            "body-cell-status": withCtx((props) => [
              createVNode(QTd, {
                key: "name",
                props
              }, {
                default: withCtx(() => [
                  createVNode(QBadge, {
                    outlined: "",
                    color: getBadgeStatusColor(props.row.status)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(capitalizeFirstLetter(props.row.status)), 1)
                    ]),
                    _: 2
                  }, 1032, ["color"])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-view": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("div", null, [
                    createVNode(ReportView, {
                      report: props.row
                    }, null, 8, ["report"])
                  ])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            _: 1
          }, 8, ["filter", "rows", "pagination"]),
          loading.value ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
            createVNode(QSpinner, { size: "50px" })
          ])) : createCommentVNode("", true),
          showNoDataMessage.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
            createVNode(QBanner, {
              class: "bg-grey-1",
              dense: ""
            }, {
              default: withCtx(() => [
                createTextVNode(" No data available ")
              ]),
              _: 1
            })
          ])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
};
var ReportTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1faad11a"], ["__file", "ReportTable.vue"]]);
const _hoisted_1 = { class: "text-h6 text-white" };
const _hoisted_2 = { class: "q-gutter-y-lg" };
const _hoisted_3 = { align: "right" };
const _sfc_main = {
  __name: "ReportPage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QCard, { flat: "" }, {
        default: withCtx(() => [
          createVNode(QCardSection, { style: { "background-color": "#ef4444" } }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                createVNode(QIcon, { name: "fa-solid fa-layer-group" }),
                createTextVNode(" Report ")
              ])
            ]),
            _: 1
          }),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_2, [
                createBaseVNode("div", _hoisted_3, [
                  createVNode(ReportCreate)
                ]),
                createBaseVNode("div", null, [
                  createVNode(ReportTable)
                ])
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
var ReportPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "ReportPage.vue"]]);
export { ReportPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwb3J0UGFnZS5mNzI2NDE2NS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9iYWtlci9yZXBvcnQvY29tcG9uZW50cy9SZXBvcnRWaWV3LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9icmFuY2gvYmFrZXIvcmVwb3J0L2NvbXBvbmVudHMvUmVwb3J0VGFibGUudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPHEtYnRuXG4gICAgY29sb3I9XCJhY2NlbnRcIlxuICAgIGljb249XCJ2aXNpYmlsaXR5XCJcbiAgICBzaXplPVwibWRcIlxuICAgIGZsYXRcbiAgICByb3VuZFxuICAgIGRlbnNlXG4gICAgQGNsaWNrPVwib3BlbkJha2Vyc1JlcG9ydHNEaWFsb2dcIlxuICA+XG4gIDwvcS1idG4+XG5cbiAgPHEtZGlhbG9nIHYtbW9kZWw9XCJiYWtlcnNSZXBvcnREaWFsb2dcIiBjbGFzcz1cInJlcG9ydC1kaWFsb2dcIj5cbiAgICA8cS1jYXJkIGNsYXNzPVwicmVwb3J0LWNhcmRcIj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJlcG9ydC1oZWFkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDYgdGV4dC13ZWlnaHQtcmVndWxhclwiPlxuICAgICAgICAgIHt7IHJlcG9ydC5yZWNpcGUubmFtZSB9fSAtIHt7IHJlcG9ydC5yZWNpcGVfY2F0ZWdvcnkgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGNsYXNzPVwiY2xvc2UtYnRuXCJcbiAgICAgICAgICBjb2xvcj1cImdyZXktOFwiXG4gICAgICAgICAgZmxhdFxuICAgICAgICAgIHJvdW5kXG4gICAgICAgICAgZGVuc2VcbiAgICAgICAgICBpY29uPVwiY2xvc2VcIlxuICAgICAgICAgIEBjbGljaz1cImJha2Vyc1JlcG9ydERpYWxvZyA9IGZhbHNlXCJcbiAgICAgICAgLz5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJlcG9ydC1pbmZvXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyZXBvcnQtc2VjdGlvblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxzdHJvbmc+RGF0ZTo8L3N0cm9uZz4ge3sgZm9ybWF0RGF0ZShyZXBvcnQuY3JlYXRlZF9hdCkgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj48c3Ryb25nPkJyYW5jaDo8L3N0cm9uZz4ge3sgcmVwb3J0LmJyYW5jaC5uYW1lIH19PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8c3Ryb25nPkJha2VyOjwvc3Ryb25nPlxuICAgICAgICAgICAgICB7eyBjYXBpdGFsaXplRmlyc3RMZXR0ZXIocmVwb3J0LnVzZXIubmFtZSkgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj48c3Ryb25nPktpbG86PC9zdHJvbmc+IHt7IHJlcG9ydC5raWxvIH19PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PjxzdHJvbmc+T3Zlcjo8L3N0cm9uZz4ge3sgcmVwb3J0Lm92ZXIgfX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxzdHJvbmc+QWN0dWFsIFRhcmdldDo8L3N0cm9uZz4ge3sgcmVwb3J0LmFjdHVhbF90YXJnZXQgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0dXMtY2hpcFwiPlxuICAgICAgICAgICAgPHEtY2hpcFxuICAgICAgICAgICAgICBzcXVhcmVcbiAgICAgICAgICAgICAgOmNvbG9yPVwiZ2V0QmFkZ2VTdGF0dXNDb2xvcihyZXBvcnQuc3RhdHVzKVwiXG4gICAgICAgICAgICAgIHRleHQtY29sb3I9XCJ3aGl0ZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt7IGNhcGl0YWxpemVGaXJzdExldHRlclN0YXR1cyhyZXBvcnQuc3RhdHVzKSB9fVxuICAgICAgICAgICAgPC9xLWNoaXA+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cInJlcG9ydC1zZWN0aW9uXCJcbiAgICAgICAgICB2LWlmPVwiXG4gICAgICAgICAgICByZXBvcnQuaW5ncmVkaWVudF9iYWtlcnNfcmVwb3J0cyAmJlxuICAgICAgICAgICAgcmVwb3J0LmluZ3JlZGllbnRfYmFrZXJzX3JlcG9ydHMubGVuZ3RoXG4gICAgICAgICAgXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRpdGxlXCI+SW5ncmVkaWVudHM8L2Rpdj5cbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgdi1mb3I9XCJpbmdyZWRpZW50IGluIHJlcG9ydC5pbmdyZWRpZW50X2Jha2Vyc19yZXBvcnRzXCJcbiAgICAgICAgICAgICAgOmtleT1cImluZ3JlZGllbnQuaWRcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3Ryb25nPnt7IGluZ3JlZGllbnQuaW5ncmVkaWVudHMuY29kZSB9fTwvc3Ryb25nPiAtXG4gICAgICAgICAgICAgIHt7IGZvcm1hdFF1YW50aXR5KGluZ3JlZGllbnQucXVhbnRpdHkpIH19XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cInJlcG9ydC1zZWN0aW9uXCJcbiAgICAgICAgICB2LWlmPVwiXG4gICAgICAgICAgICByZXBvcnQuYnJlYWRfYmFrZXJzX3JlcG9ydHMgJiYgcmVwb3J0LmJyZWFkX2Jha2Vyc19yZXBvcnRzLmxlbmd0aFxuICAgICAgICAgIFwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10aXRsZVwiPkJyZWFkczwvZGl2PlxuICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIDxsaSB2LWZvcj1cImJyZWFkIGluIHJlcG9ydC5icmVhZF9iYWtlcnNfcmVwb3J0c1wiIDprZXk9XCJicmVhZC5pZFwiPlxuICAgICAgICAgICAgICA8c3Ryb25nPnt7IGJyZWFkLmJyZWFkLm5hbWUgfX08L3N0cm9uZz4gLVxuICAgICAgICAgICAgICB7eyBicmVhZC5icmVhZF9wcm9kdWN0aW9uIH19IHBjc1xuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJyZXBvcnQtc2VjdGlvblwiXG4gICAgICAgICAgdi1pZj1cIlxuICAgICAgICAgICAgcmVwb3J0LmZpbGxpbmdfYmFrZXJzX3JlcG9ydHMgJiZcbiAgICAgICAgICAgIHJlcG9ydC5maWxsaW5nX2Jha2Vyc19yZXBvcnRzLmxlbmd0aFxuICAgICAgICAgIFwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10aXRsZVwiPkZpbGxpbmdzPC9kaXY+XG4gICAgICAgICAgPHVsPlxuICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgIHYtZm9yPVwiZmlsbGluZyBpbiByZXBvcnQuZmlsbGluZ19iYWtlcnNfcmVwb3J0c1wiXG4gICAgICAgICAgICAgIDprZXk9XCJmaWxsaW5nLmlkXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHN0cm9uZz57eyBmaWxsaW5nLmJyZWFkLm5hbWUgfX08L3N0cm9uZz4gLVxuICAgICAgICAgICAgICB7eyBmaWxsaW5nLmZpbGxpbmdfcHJvZHVjdGlvbiB9fSBwY3NcbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IGRhdGUgfSBmcm9tIFwicXVhc2FyXCI7XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHMoe1xuICByZXBvcnQ6IHtcbiAgICB0eXBlOiBPYmplY3QsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gIH0sXG59KTtcblxuY29uc3QgYmFrZXJzUmVwb3J0RGlhbG9nID0gcmVmKGZhbHNlKTtcblxuY29uc3QgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyU3RhdHVzID0gKHN0cmluZykgPT4ge1xuICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG5jb25zdCBjYXBpdGFsaXplRmlyc3RMZXR0ZXIgPSAoZnVsbE5hbWUpID0+IHtcbiAgY29uc3QgbmFtZVBhcnRzID0gZnVsbE5hbWUuc3BsaXQoXCIgXCIpO1xuICBjb25zdCBmaXJzdE5hbWUgPVxuICAgIG5hbWVQYXJ0c1swXS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG5hbWVQYXJ0c1swXS5zbGljZSgxKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBsYXN0TmFtZSA9XG4gICAgbmFtZVBhcnRzW25hbWVQYXJ0cy5sZW5ndGggLSAxXS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArXG4gICAgbmFtZVBhcnRzW25hbWVQYXJ0cy5sZW5ndGggLSAxXS5zbGljZSgxKS50b0xvd2VyQ2FzZSgpO1xuICBsZXQgbWlkZGxlTmFtZXMgPSBcIlwiO1xuICBpZiAobmFtZVBhcnRzLmxlbmd0aCA+IDIpIHtcbiAgICBtaWRkbGVOYW1lcyA9IG5hbWVQYXJ0c1xuICAgICAgLnNsaWNlKDEsIC0xKVxuICAgICAgLm1hcCgobmFtZSkgPT4gYCR7bmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKX0uYClcbiAgICAgIC5qb2luKFwiIFwiKTtcbiAgfVxuICByZXR1cm4gYCR7Zmlyc3ROYW1lfSAke21pZGRsZU5hbWVzfSAke2xhc3ROYW1lfWAudHJpbSgpO1xufTtcblxuY29uc3QgZ2V0QmFkZ2VTdGF0dXNDb2xvciA9IChzdGF0dXMpID0+IHtcbiAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICBjYXNlIFwicGVuZGluZ1wiOlxuICAgICAgcmV0dXJuIFwib3JhbmdlXCI7XG4gICAgY2FzZSBcImRlY2xpbmVkXCI6XG4gICAgICByZXR1cm4gXCJuZWdhdGl2ZVwiO1xuICAgIGNhc2UgXCJjb25maXJtZWRcIjpcbiAgICAgIHJldHVybiBcImdyZWVuXCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcImdyZXlcIjtcbiAgfVxufTtcblxuY29uc3Qgb3BlbkJha2Vyc1JlcG9ydHNEaWFsb2cgPSAoKSA9PiB7XG4gIGJha2Vyc1JlcG9ydERpYWxvZy52YWx1ZSA9IHRydWU7XG59O1xuXG5jb25zdCBmb3JtYXREYXRlID0gKGRhdGVTdHJpbmcpID0+IHtcbiAgcmV0dXJuIGRhdGUuZm9ybWF0RGF0ZShkYXRlU3RyaW5nLCBcIk1NTU0gRCwgWVlZWVwiKTtcbn07XG5cbmNvbnN0IGZvcm1hdFF1YW50aXR5ID0gKHF1YW50aXR5KSA9PiB7XG4gIGlmIChxdWFudGl0eSA+PSAxMDAwKSB7XG4gICAgY29uc3Qga2lsb3MgPSBxdWFudGl0eSAvIDEwMDA7XG4gICAgY29uc3QgdW5pdCA9IGtpbG9zID09PSAxID8gXCJrZ1wiIDogXCJrZ3NcIjtcbiAgICByZXR1cm4gYCR7a2lsb3N9ICR7dW5pdH1gO1xuICB9XG4gIHJldHVybiBgJHtxdWFudGl0eX0gZ3JhbXNgO1xufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLnJlcG9ydC1kaWFsb2cge1xuICBtYXgtd2lkdGg6IDYwMHB4O1xufVxuXG4ucmVwb3J0LWNhcmQge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgYm94LXNoYWRvdzogMHB4IDBweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuLnJlcG9ydC1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO1xuICBwYWRkaW5nOiAxcmVtO1xufVxuXG4uY2xvc2UtYnRuIHtcbiAgcGFkZGluZzogMDtcbiAgbWluLXdpZHRoOiBhdXRvO1xufVxuXG4ucmVwb3J0LWluZm8ge1xuICBwYWRkaW5nOiAxcmVtO1xufVxuXG4ucmVwb3J0LXNlY3Rpb24ge1xuICBtYXJnaW4tdG9wOiAxLjVyZW07XG59XG5cbi5zZWN0aW9uLXRpdGxlIHtcbiAgZm9udC1zaXplOiAxLjJyZW07XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG59XG5cbi5zZWN0aW9uLWNvbnRlbnQge1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuXG4uc3RhdHVzLWNoaXAge1xuICBtYXJnaW4tdG9wOiAxcmVtO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xuICAucmVwb3J0LWRpYWxvZyB7XG4gICAgbWF4LXdpZHRoOiAxMDAlO1xuICB9XG4gIC5yZXBvcnQtY2FyZCB7XG4gICAgYm9yZGVyLXJhZGl1czogMDtcbiAgfVxufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInEtbXQtc20gcS1ndXR0ZXItbWRcIj5cbiAgICA8ZGl2PlxuICAgICAgPHEtaW5wdXRcbiAgICAgICAgcm91bmRlZFxuICAgICAgICBvdXRsaW5lZFxuICAgICAgICBkZW5zZVxuICAgICAgICBkZWJvdW5jZT1cIjMwMFwiXG4gICAgICAgIHYtbW9kZWw9XCJmaWx0ZXJcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgICAgIHN0eWxlPVwid2lkdGg6IDUwMHB4OyBtYXgtd2lkdGg6IDE1MDBweDsgbWluLXdpZHRoOiAxMDBweFwiXG4gICAgICA+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICAgIDxxLWljb24gdi1pZj1cIiFsb2FkaW5nU2VhcmNoSWNvblwiIG5hbWU9XCJzZWFyY2hcIiAvPlxuICAgICAgICAgIDxxLXNwaW5uZXIgdi1lbHNlIC8+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8L3EtaW5wdXQ+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInRhYmxlLWNvbnRhaW5lclwiPlxuICAgICAgPHEtdGFibGVcbiAgICAgICAgY2xhc3M9XCJzdGlja3ktaGVhZGVyXCJcbiAgICAgICAgOmZpbHRlcj1cImZpbHRlclwiXG4gICAgICAgIGZsYXRcbiAgICAgICAgOmNvbHVtbnM9XCJiYWtlcnNSZXBvcnRMaXN0Q29sdW1uc1wiXG4gICAgICAgIDpyb3dzPVwiZmlsdGVyZWRSb3dzXCJcbiAgICAgICAgcm93LWtleT1cIm5hbWVcIlxuICAgICAgICA6dmlydHVhbC1zY3JvbGwtc3RpY2t5LXNpemUtc3RhcnQ9XCI0OFwiXG4gICAgICAgIHZpcnR1YWwtc2Nyb2xsXG4gICAgICAgIHYtbW9kZWw6cGFnaW5hdGlvbj1cInBhZ2luYXRpb25cIlxuICAgICAgICA6cm93cy1wZXItcGFnZS1vcHRpb25zPVwiWzBdXCJcbiAgICAgICAgaGlkZS1ib3R0b21cbiAgICAgICAgc3R5bGU9XCJoZWlnaHQ6IDkwMHB4OyBtYXgtaGVpZ2h0OiAxMDAwcHg7IG1pbi1oZWlnaHQ6IG5vbmVcIlxuICAgICAgPlxuICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC1zdGF0dXM9XCJwcm9wc1wiPlxuICAgICAgICAgIDxxLXRkIGtleT1cIm5hbWVcIiA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgICAgPHEtYmFkZ2Ugb3V0bGluZWQgOmNvbG9yPVwiZ2V0QmFkZ2VTdGF0dXNDb2xvcihwcm9wcy5yb3cuc3RhdHVzKVwiPlxuICAgICAgICAgICAgICB7eyBjYXBpdGFsaXplRmlyc3RMZXR0ZXIocHJvcHMucm93LnN0YXR1cykgfX1cbiAgICAgICAgICAgIDwvcS1iYWRnZT5cbiAgICAgICAgICA8L3EtdGQ+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLXZpZXc9XCJwcm9wc1wiPlxuICAgICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8UmVwb3J0VmlldyA6cmVwb3J0PVwicHJvcHMucm93XCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvcS10ZD5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDwvcS10YWJsZT5cbiAgICAgIDxkaXZcbiAgICAgICAgdi1pZj1cImxvYWRpbmdcIlxuICAgICAgICBjbGFzcz1cImxvYWRpbmctb3ZlcmxheSByb3cganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyXCJcbiAgICAgID5cbiAgICAgICAgPHEtc3Bpbm5lciBzaXplPVwiNTBweFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXZcbiAgICAgICAgdi1pZj1cInNob3dOb0RhdGFNZXNzYWdlXCJcbiAgICAgICAgY2xhc3M9XCJxLXBhLW1kIHEtZ3V0dGVyLW1kIHJvdyBqdXN0aWZ5LWNlbnRlclwiXG4gICAgICA+XG4gICAgICAgIDxxLWJhbm5lciBjbGFzcz1cImJnLWdyZXktMVwiIGRlbnNlPiBObyBkYXRhIGF2YWlsYWJsZSA8L3EtYmFubmVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZUJha2VyUmVwb3J0c1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvYmFrZXItcmVwb3J0XCI7XG5pbXBvcnQgUmVwb3J0VmlldyBmcm9tIFwiLi9SZXBvcnRWaWV3LnZ1ZVwiO1xuaW1wb3J0IHsgY29tcHV0ZWQsIG9uTW91bnRlZCwgcmVmLCB3YXRjaCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IGRhdGUgYXMgcXVhc2FyRGF0ZSB9IGZyb20gXCJxdWFzYXJcIjtcblxuY29uc3QgcGFnaW5hdGlvbiA9IHJlZih7XG4gIHJvd3NQZXJQYWdlOiAwLFxufSk7XG5cbmNvbnN0IGJha2VyUmVwb3J0U3RvcmUgPSB1c2VCYWtlclJlcG9ydHNTdG9yZSgpO1xuY29uc3QgYmFrZXJSZXBvcnRSb3cgPSBjb21wdXRlZCgoKSA9PiBiYWtlclJlcG9ydFN0b3JlLnJlcG9ydFRvVmlldyk7XG5jb25zdCB1c2VyRGF0YSA9IGNvbXB1dGVkKCgpID0+IGJha2VyUmVwb3J0U3RvcmUudXNlcik7XG5jb25zdCB1c2VySWQgPSB1c2VyRGF0YS52YWx1ZT8uZGF0YS5pZCB8fCBcIlwiO1xuY29uc3QgZmlsdGVyID0gcmVmKFwiXCIpO1xuY29uc3QgbG9hZGluZyA9IHJlZih0cnVlKTtcbmNvbnN0IGxvYWRpbmdTZWFyY2hJY29uID0gcmVmKGZhbHNlKTtcbmNvbnN0IHNob3dOb0RhdGFNZXNzYWdlID0gcmVmKGZhbHNlKTtcblxud2F0Y2goZmlsdGVyLCBhc3luYyAobmV3RmlsdGVyKSA9PiB7XG4gIGxvYWRpbmdTZWFyY2hJY29uLnZhbHVlID0gdHJ1ZTtcbiAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpO1xuICBsb2FkaW5nU2VhcmNoSWNvbi52YWx1ZSA9IGZhbHNlO1xuICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9ICFsb2FkaW5nLnZhbHVlICYmIGZpbHRlcmVkUm93cy52YWx1ZS5sZW5ndGggPT09IDA7XG4gIGNvbnNvbGUubG9nKFwiRmlsdGVyZWQgUm93czpcIiwgZmlsdGVyZWRSb3dzLnZhbHVlKTtcbn0pO1xuXG5vbk1vdW50ZWQoYXN5bmMgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhcInByb3BzLmJyYW5jaElkIGluIG9uTW91bnRlZDpcIiwgdXNlcklkKTtcbiAgaWYgKHVzZXJJZCkge1xuICAgIGF3YWl0IHJlbG9hZFRhYmxlRGF0YSh1c2VySWQpO1xuICB9XG59KTtcblxuY29uc3QgcmVsb2FkVGFibGVEYXRhID0gYXN5bmMgKHVzZXJJZCkgPT4ge1xuICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgYXdhaXQgYmFrZXJSZXBvcnRTdG9yZS5mZXRjaEJha2VyUmVwb3J0KHVzZXJJZCk7XG4gIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbn07XG5cbmNvbnN0IGZpbHRlcmVkUm93cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgaWYgKCFmaWx0ZXIudmFsdWUpIHtcbiAgICByZXR1cm4gYmFrZXJSZXBvcnRSb3cudmFsdWU7XG4gIH1cbiAgY29uc3QgZmlsdGVyVGV4dCA9IGZpbHRlci52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gYmFrZXJSZXBvcnRSb3cudmFsdWUuZmlsdGVyKFxuICAgIChyb3cpID0+XG4gICAgICAocm93Lm5hbWUgJiYgcm93Lm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmaWx0ZXJUZXh0KSkgfHxcbiAgICAgIChyb3cuY3JlYXRlZF9hdCAmJlxuICAgICAgICBxdWFzYXJEYXRlXG4gICAgICAgICAgLmZvcm1hdERhdGUocm93LmNyZWF0ZWRfYXQsIFwiTU1NTSBELCBZWVlZXCIpXG4gICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAuaW5jbHVkZXMoZmlsdGVyVGV4dCkpIHx8XG4gICAgICAocm93LnJlY2lwZSAmJlxuICAgICAgICByb3cucmVjaXBlLm5hbWUgJiZcbiAgICAgICAgcm93LnJlY2lwZS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyVGV4dCkpIHx8XG4gICAgICAocm93LnJlY2lwZSAmJlxuICAgICAgICByb3cucmVjaXBlLmNhdGVnb3J5ICYmXG4gICAgICAgIHJvdy5yZWNpcGUuY2F0ZWdvcnkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmaWx0ZXJUZXh0KSlcbiAgKTtcbn0pO1xuXG5jb25zdCBmb3JtYXREYXRlID0gKGRhdGVTdHJpbmcpID0+IHtcbiAgcmV0dXJuIHF1YXNhckRhdGUuZm9ybWF0RGF0ZShkYXRlU3RyaW5nLCBcIk1NTU0gRCwgWVlZWVwiKTtcbn07XG5cbmNvbnN0IGJha2Vyc1JlcG9ydExpc3RDb2x1bW5zID0gW1xuICB7XG4gICAgbmFtZTogXCJkYXRlXCIsXG4gICAgYWxpZ246IFwibGVmdFwiLFxuICAgIGxhYmVsOiBcIkRhdGVcIixcbiAgICBmaWVsZDogXCJjcmVhdGVkX2F0XCIsXG4gICAgZm9ybWF0OiBmb3JtYXREYXRlLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJuYW1lXCIsXG4gICAgbGFiZWw6IFwiUmVwb3J0cyBOYW1lXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IChyb3cpID0+ICh7IG5hbWU6IHJvdy5yZWNpcGUubmFtZSwgY2F0ZWdvcnk6IHJvdy5yZWNpcGUuY2F0ZWdvcnkgfSksXG4gICAgZm9ybWF0OiAodmFsKSA9PiBgJHt2YWwubmFtZX0gKCR7dmFsLmNhdGVnb3J5fSlgLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJzdGF0dXNcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBsYWJlbDogXCJTdGF0dXNcIixcbiAgICBmaWVsZDogXCJzdGF0dXNcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwidmlld1wiLFxuICAgIGFsaWduOiBcInJpZ2h0XCIsXG4gICAgbGFiZWw6IFwiVmlld1wiLFxuICAgIGZpZWxkOiBcInZpZXdcIixcbiAgfSxcbl07XG5cbmNvbnN0IGdldEJhZGdlU3RhdHVzQ29sb3IgPSAoc3RhdHVzKSA9PiB7XG4gIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgY2FzZSBcInBlbmRpbmdcIjpcbiAgICAgIHJldHVybiBcIm9yYW5nZVwiO1xuICAgIGNhc2UgXCJkZWNsaW5lZFwiOlxuICAgICAgcmV0dXJuIFwibmVnYXRpdmVcIjtcbiAgICBjYXNlIFwiY29uZmlybWVkXCI6XG4gICAgICByZXR1cm4gXCJncmVlblwiO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gXCJncmV5XCI7XG4gIH1cbn07XG5jb25zdCBjYXBpdGFsaXplRmlyc3RMZXR0ZXIgPSAoc3RyaW5nKSA9PiB7XG4gIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSkudG9Mb3dlckNhc2UoKTtcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi50YWJsZS1jb250YWluZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5sb2FkaW5nLW92ZXJsYXkge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO1xuICB6LWluZGV4OiAxO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJkYXRlIiwidXNlcklkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkhBLFVBQU0scUJBQXFCLElBQUksS0FBSztBQUVwQyxVQUFNLDhCQUE4QixDQUFDLFdBQVc7QUFDOUMsYUFBTyxPQUFPLE9BQU8sQ0FBQyxFQUFFLFlBQVcsSUFBSyxPQUFPLE1BQU0sQ0FBQyxFQUFFO0lBQzFEO0FBRUEsVUFBTSx3QkFBd0IsQ0FBQyxhQUFhO0FBQzFDLFlBQU0sWUFBWSxTQUFTLE1BQU0sR0FBRztBQUNwQyxZQUFNLFlBQ0osVUFBVSxHQUFHLE9BQU8sQ0FBQyxFQUFFLFlBQVcsSUFBSyxVQUFVLEdBQUcsTUFBTSxDQUFDLEVBQUUsWUFBVztBQUMxRSxZQUFNLFdBQ0osVUFB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QUN2QixJQUFJLFVBQ0gsSUFBSSxPQUFPLFFBQ1gsSUFBSSxPQUFPLEtBQUssWUFBVyxFQUFHLFNBQVMsVUFBVSxLQUNsRCxJQUFJLFVBQ0gsSUFBSSxPQUFPLFlBQ1gsSUFBSSxPQUFPLFNBQVMsWUFBVyxFQUFHLFNBQVMsVUFBVTtBQUFBLE1BQzdEO0FBQUEsSUFDQSxDQUFDO0FBRUQsVUFBTSxhQUFhLENBQUMsZUFBZTtBQUNqQyxhQUFPLFdBQVcsV0FBVyxZQUFZLGNBQWM7QUFBQSxJQUN6RDtBQUVBLFVBQU0sMEJBQTBCO0FBQUEsTUFDOUI7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLFVBQVU7QUFBQSxNQUNYO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLElBQUksT0FBTyxNQUFNLFVBQVUsSUFBSSxPQUFPLFNBQVE7QUFBQSxRQUN2RSxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksU0FBUyxJQUFJO0FBQUEsUUFDckMsVUFBVTtBQUFBLE1BQ1g7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsTUFDUjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxNQUNSO0FBQUEsSUFDSDtBQUVBLFVBQU0sc0JBQXNCLENBQUMsV0FBVztBQUN0QyxjQUFRO0FBQUEsYUFDRDtBQUNILGlCQUFPO0FBQUEsYUFDSjtBQUNILGlCQUFPO0FBQUEsYUFDSjtBQUNILGlCQUFPO0FBQUE7QUFFUCxpQkFBTztBQUFBO0FBQUEsSUFFYjtBQUNBLFVBQU0sd0JBQXdCLENBQUMsV0FBVztBQUN4QyxhQUFPLE9BQU8sT0FBTyxDQUFDLEVBQUUsWUFBVyxJQUFLLE9BQU8sTUFBTSxDQUFDLEVBQUU7SUFDMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
