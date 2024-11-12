import { _ as _export_sfc, o as openBlock, c as createBlock, M as QBtn, n as ref, a4 as createElementBlock, a as createVNode, w as withCtx, Q as QCard, I as QCardSection, J as createBaseVNode, R as toDisplayString, O as createTextVNode, a2 as QSeparator, a5 as Fragment, a6 as renderList, be as createCommentVNode, a3 as QDialog, S as pushScopeId, T as popScopeId, g as computed, u as watch, z as onMounted, L as QIcon, bd as QSpinner, K as QInput } from "./index.c8e2405b.js";
import { Q as QBadge } from "./QBadge.49245359.js";
import { Q as QTd } from "./QTd.f597934c.js";
import { Q as QTable } from "./QTable.d3fb87f5.js";
import { Q as QBanner } from "./QBanner.bd2edaf0.js";
import { u as useBakerReportsStore } from "./baker-report.4c6e60f9.js";
import { a as QChip } from "./QSelect.0985e28e.js";
import { q as quasarDate } from "./date.cdd6bcba.js";
import "./QVirtualScroll.41a98cb7.js";
import "./QList.d5d13fac.js";
import "./use-virtual-scroll.5b4ab88d.js";
import "./rtl.b1b38f21.js";
import "./axios.aa1bce92.js";
import "./QItem.76557ad9.js";
import "./QMenu.4f670399.js";
import "./selection.94057980.js";
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
const _withScopeId = (n) => (pushScopeId("data-v-9b7d5a72"), n = n(), popScopeId(), n);
const _hoisted_1$2 = { class: "text-h6 text-weight-regular" };
const _hoisted_2$2 = { class: "row justify-between" };
const _hoisted_3$2 = { class: "section-content" };
const _hoisted_4$1 = { class: "row q-gutter-x-sm" };
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-subtitle2" }, "Date:", -1));
const _hoisted_6 = { class: "text-body1 text-weight-light" };
const _hoisted_7 = { class: "row q-gutter-x-sm" };
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-subtitle2" }, "Branch:", -1));
const _hoisted_9 = { class: "text-body1 text-weight-light" };
const _hoisted_10 = { class: "row q-gutter-x-sm" };
const _hoisted_11 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-subtitle2" }, "Baker:", -1));
const _hoisted_12 = { class: "text-body1 text-weight-light" };
const _hoisted_13 = { class: "row q-mt-sm item-start q-gutter-x-xl" };
const _hoisted_14 = { class: "row q-gutter-x-sm text-overline" };
const _hoisted_15 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, "Kilo:", -1));
const _hoisted_16 = { class: "row q-gutter-x-sm text-overline" };
const _hoisted_17 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, "Over:", -1));
const _hoisted_18 = { class: "text-weight-light" };
const _hoisted_19 = { class: "row q-gutter-x-sm text-overline" };
const _hoisted_20 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, "Short:", -1));
const _hoisted_21 = { class: "text-weight-light" };
const _hoisted_22 = { class: "row q-gutter-x-sm text-overline" };
const _hoisted_23 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, "Actual Target:", -1));
const _hoisted_24 = { class: "text-weight-light" };
const _hoisted_25 = { class: "row justify-between" };
const _hoisted_26 = {
  key: 0,
  class: "report-section"
};
const _hoisted_27 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", {
  class: "section-title",
  align: "center"
}, "Ingredients", -1));
const _hoisted_28 = { class: "row q-gutter-md" };
const _hoisted_29 = { class: "" };
const _hoisted_30 = {
  key: 1,
  class: "report-section"
};
const _hoisted_31 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", {
  class: "section-title",
  align: "center"
}, "Breads", -1));
const _hoisted_32 = { class: "row q-gutter-md" };
const _hoisted_33 = {
  key: 2,
  class: "report-section"
};
const _hoisted_34 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "section-title" }, "Fillings", -1));
const _sfc_main$2 = {
  __name: "ReportView",
  props: {
    report: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    console.log("bakerView", props.report);
    const bakersReportDialog = ref(false);
    const capitalizeFirstLetterStatus = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    const capitalizeBranchFirstLetter = (location) => {
      if (!location)
        return "";
      return location.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    };
    const formatFullname = (row) => {
      const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
      const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
      const middlename = row.middlename ? capitalize(row.middlename).charAt(0) + "." : "";
      const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";
      return `${firstname} ${middlename} ${lastname}`.trim();
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
                    createBaseVNode("div", _hoisted_1$2, toDisplayString(capitalizeBranchFirstLetter(__props.report.branch_recipe.recipe.name)) + " - " + toDisplayString(__props.report.recipe_category), 1),
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
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2$2, [
                      createBaseVNode("div", null, [
                        createBaseVNode("div", _hoisted_3$2, [
                          createBaseVNode("div", _hoisted_4$1, [
                            _hoisted_5,
                            createBaseVNode("div", _hoisted_6, toDisplayString(formatDate(__props.report.created_at)), 1)
                          ]),
                          createBaseVNode("div", _hoisted_7, [
                            _hoisted_8,
                            createBaseVNode("div", _hoisted_9, toDisplayString(capitalizeBranchFirstLetter(__props.report.branch.name)), 1)
                          ]),
                          createBaseVNode("div", _hoisted_10, [
                            _hoisted_11,
                            createBaseVNode("div", _hoisted_12, toDisplayString(formatFullname(__props.report.user.employee)), 1)
                          ])
                        ])
                      ]),
                      createBaseVNode("div", null, [
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
                    createBaseVNode("div", _hoisted_13, [
                      createBaseVNode("div", _hoisted_14, [
                        _hoisted_15,
                        createBaseVNode("div", null, toDisplayString(__props.report.kilo), 1)
                      ]),
                      createBaseVNode("div", _hoisted_16, [
                        _hoisted_17,
                        createBaseVNode("div", _hoisted_18, toDisplayString(__props.report.over), 1)
                      ]),
                      createBaseVNode("div", _hoisted_19, [
                        _hoisted_20,
                        createBaseVNode("div", _hoisted_21, toDisplayString(__props.report.short), 1)
                      ]),
                      createBaseVNode("div", _hoisted_22, [
                        _hoisted_23,
                        createBaseVNode("div", _hoisted_24, toDisplayString(__props.report.actual_target), 1)
                      ])
                    ]),
                    createVNode(QSeparator, { class: "q-my-md" }),
                    createBaseVNode("div", _hoisted_25, [
                      __props.report.ingredient_bakers_reports && __props.report.ingredient_bakers_reports.length ? (openBlock(), createElementBlock("div", _hoisted_26, [
                        _hoisted_27,
                        createBaseVNode("ul", null, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.report.ingredient_bakers_reports, (ingredient) => {
                            return openBlock(), createElementBlock("div", {
                              key: ingredient.id
                            }, [
                              createBaseVNode("div", _hoisted_28, [
                                createBaseVNode("div", _hoisted_29, toDisplayString(ingredient.ingredients.code), 1),
                                createBaseVNode("div", null, "- " + toDisplayString(formatQuantity(ingredient.quantity)), 1)
                              ])
                            ]);
                          }), 128))
                        ])
                      ])) : createCommentVNode("", true),
                      __props.report.bread_bakers_reports && __props.report.bread_bakers_reports.length ? (openBlock(), createElementBlock("div", _hoisted_30, [
                        _hoisted_31,
                        createBaseVNode("ul", null, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.report.bread_bakers_reports, (bread) => {
                            return openBlock(), createElementBlock("div", {
                              key: bread.id
                            }, [
                              createBaseVNode("div", _hoisted_32, [
                                createBaseVNode("div", null, toDisplayString(bread.bread.name), 1),
                                createBaseVNode("div", null, "- " + toDisplayString(bread.bread_production) + " pcs", 1)
                              ])
                            ]);
                          }), 128))
                        ])
                      ])) : createCommentVNode("", true),
                      __props.report.filling_bakers_reports && __props.report.filling_bakers_reports.length ? (openBlock(), createElementBlock("div", _hoisted_33, [
                        _hoisted_34,
                        createBaseVNode("ul", null, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.report.filling_bakers_reports, (filling) => {
                            return openBlock(), createElementBlock("li", {
                              key: filling.id
                            }, [
                              createBaseVNode("div", null, toDisplayString(filling.bread.name), 1),
                              createTextVNode(" - " + toDisplayString(filling.filling_production) + " pcs ", 1)
                            ]);
                          }), 128))
                        ])
                      ])) : createCommentVNode("", true)
                    ])
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
var ReportView = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-9b7d5a72"], ["__file", "ReportView.vue"]]);
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
        field: (row) => ({
          name: row.branch_recipe.recipe.name,
          category: row.branch_recipe.recipe.category
        }),
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
var ReportTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-820d365e"], ["__file", "ReportTable.vue"]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwb3J0UGFnZS5hNjFiOWYxYi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9iYWtlci9yZXBvcnQvY29tcG9uZW50cy9SZXBvcnRWaWV3LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9icmFuY2gvYmFrZXIvcmVwb3J0L2NvbXBvbmVudHMvUmVwb3J0VGFibGUudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPHEtYnRuXG4gICAgY29sb3I9XCJhY2NlbnRcIlxuICAgIGljb249XCJ2aXNpYmlsaXR5XCJcbiAgICBzaXplPVwibWRcIlxuICAgIGZsYXRcbiAgICByb3VuZFxuICAgIGRlbnNlXG4gICAgQGNsaWNrPVwib3BlbkJha2Vyc1JlcG9ydHNEaWFsb2dcIlxuICA+XG4gIDwvcS1idG4+XG5cbiAgPHEtZGlhbG9nIHYtbW9kZWw9XCJiYWtlcnNSZXBvcnREaWFsb2dcIiBjbGFzcz1cInJlcG9ydC1kaWFsb2dcIj5cbiAgICA8cS1jYXJkIGNsYXNzPVwicmVwb3J0LWNhcmRcIj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJlcG9ydC1oZWFkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDYgdGV4dC13ZWlnaHQtcmVndWxhclwiPlxuICAgICAgICAgIHt7IGNhcGl0YWxpemVCcmFuY2hGaXJzdExldHRlcihyZXBvcnQuYnJhbmNoX3JlY2lwZS5yZWNpcGUubmFtZSkgfX0gLVxuICAgICAgICAgIHt7IHJlcG9ydC5yZWNpcGVfY2F0ZWdvcnkgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGNsYXNzPVwiY2xvc2UtYnRuXCJcbiAgICAgICAgICBjb2xvcj1cImdyZXktOFwiXG4gICAgICAgICAgZmxhdFxuICAgICAgICAgIHJvdW5kXG4gICAgICAgICAgZGVuc2VcbiAgICAgICAgICBpY29uPVwiY2xvc2VcIlxuICAgICAgICAgIEBjbGljaz1cImJha2Vyc1JlcG9ydERpYWxvZyA9IGZhbHNlXCJcbiAgICAgICAgLz5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tY29udGVudFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLXgtc21cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1zdWJ0aXRsZTJcIj5EYXRlOjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWJvZHkxIHRleHQtd2VpZ2h0LWxpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICB7eyBmb3JtYXREYXRlKHJlcG9ydC5jcmVhdGVkX2F0KSB9fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci14LXNtXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUyXCI+QnJhbmNoOjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWJvZHkxIHRleHQtd2VpZ2h0LWxpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICB7eyBjYXBpdGFsaXplQnJhbmNoRmlyc3RMZXR0ZXIocmVwb3J0LmJyYW5jaC5uYW1lKSB9fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci14LXNtXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUyXCI+QmFrZXI6PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtYm9keTEgdGV4dC13ZWlnaHQtbGlnaHRcIj5cbiAgICAgICAgICAgICAgICAgIHt7IGZvcm1hdEZ1bGxuYW1lKHJlcG9ydC51c2VyLmVtcGxveWVlKSB9fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cS1jaGlwXG4gICAgICAgICAgICAgIHNxdWFyZVxuICAgICAgICAgICAgICA6Y29sb3I9XCJnZXRCYWRnZVN0YXR1c0NvbG9yKHJlcG9ydC5zdGF0dXMpXCJcbiAgICAgICAgICAgICAgdGV4dC1jb2xvcj1cIndoaXRlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3sgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyU3RhdHVzKHJlcG9ydC5zdGF0dXMpIH19XG4gICAgICAgICAgICA8L3EtY2hpcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1tdC1zbSBpdGVtLXN0YXJ0IHEtZ3V0dGVyLXgteGxcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLXgtc20gdGV4dC1vdmVybGluZVwiPlxuICAgICAgICAgICAgPGRpdj5LaWxvOjwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAge3sgcmVwb3J0LmtpbG8gfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXIteC1zbSB0ZXh0LW92ZXJsaW5lXCI+XG4gICAgICAgICAgICA8ZGl2Pk92ZXI6PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC13ZWlnaHQtbGlnaHRcIj5cbiAgICAgICAgICAgICAge3sgcmVwb3J0Lm92ZXIgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXIteC1zbSB0ZXh0LW92ZXJsaW5lXCI+XG4gICAgICAgICAgICA8ZGl2PlNob3J0OjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWxpZ2h0XCI+XG4gICAgICAgICAgICAgIHt7IHJlcG9ydC5zaG9ydCB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci14LXNtIHRleHQtb3ZlcmxpbmVcIj5cbiAgICAgICAgICAgIDxkaXY+QWN0dWFsIFRhcmdldDo8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1saWdodFwiPlxuICAgICAgICAgICAgICB7eyByZXBvcnQuYWN0dWFsX3RhcmdldCB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8cS1zZXBhcmF0b3IgY2xhc3M9XCJxLW15LW1kXCI+PC9xLXNlcGFyYXRvcj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cInJlcG9ydC1zZWN0aW9uXCJcbiAgICAgICAgICAgIHYtaWY9XCJcbiAgICAgICAgICAgICAgcmVwb3J0LmluZ3JlZGllbnRfYmFrZXJzX3JlcG9ydHMgJiZcbiAgICAgICAgICAgICAgcmVwb3J0LmluZ3JlZGllbnRfYmFrZXJzX3JlcG9ydHMubGVuZ3RoXG4gICAgICAgICAgICBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRpdGxlXCIgYWxpZ249XCJjZW50ZXJcIj5JbmdyZWRpZW50czwvZGl2PlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgdi1mb3I9XCJpbmdyZWRpZW50IGluIHJlcG9ydC5pbmdyZWRpZW50X2Jha2Vyc19yZXBvcnRzXCJcbiAgICAgICAgICAgICAgICA6a2V5PVwiaW5ncmVkaWVudC5pZFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLW1kXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IGluZ3JlZGllbnQuaW5ncmVkaWVudHMuY29kZSB9fVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXY+LSB7eyBmb3JtYXRRdWFudGl0eShpbmdyZWRpZW50LnF1YW50aXR5KSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cInJlcG9ydC1zZWN0aW9uXCJcbiAgICAgICAgICAgIHYtaWY9XCJcbiAgICAgICAgICAgICAgcmVwb3J0LmJyZWFkX2Jha2Vyc19yZXBvcnRzICYmIHJlcG9ydC5icmVhZF9iYWtlcnNfcmVwb3J0cy5sZW5ndGhcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdGl0bGVcIiBhbGlnbj1cImNlbnRlclwiPkJyZWFkczwvZGl2PlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICA8ZGl2IHYtZm9yPVwiYnJlYWQgaW4gcmVwb3J0LmJyZWFkX2Jha2Vyc19yZXBvcnRzXCIgOmtleT1cImJyZWFkLmlkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci1tZFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdj57eyBicmVhZC5icmVhZC5uYW1lIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2Pi0ge3sgYnJlYWQuYnJlYWRfcHJvZHVjdGlvbiB9fSBwY3M8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJyZXBvcnQtc2VjdGlvblwiXG4gICAgICAgICAgICB2LWlmPVwiXG4gICAgICAgICAgICAgIHJlcG9ydC5maWxsaW5nX2Jha2Vyc19yZXBvcnRzICYmXG4gICAgICAgICAgICAgIHJlcG9ydC5maWxsaW5nX2Jha2Vyc19yZXBvcnRzLmxlbmd0aFxuICAgICAgICAgICAgXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10aXRsZVwiPkZpbGxpbmdzPC9kaXY+XG4gICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgIHYtZm9yPVwiZmlsbGluZyBpbiByZXBvcnQuZmlsbGluZ19iYWtlcnNfcmVwb3J0c1wiXG4gICAgICAgICAgICAgICAgOmtleT1cImZpbGxpbmcuaWRcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdj57eyBmaWxsaW5nLmJyZWFkLm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAtIHt7IGZpbGxpbmcuZmlsbGluZ19wcm9kdWN0aW9uIH19IHBjc1xuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IGRhdGUgfSBmcm9tIFwicXVhc2FyXCI7XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHMoe1xuICByZXBvcnQ6IHtcbiAgICB0eXBlOiBPYmplY3QsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gIH0sXG59KTtcblxuY29uc29sZS5sb2coXCJiYWtlclZpZXdcIiwgcHJvcHMucmVwb3J0KTtcblxuY29uc3QgYmFrZXJzUmVwb3J0RGlhbG9nID0gcmVmKGZhbHNlKTtcblxuY29uc3QgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyU3RhdHVzID0gKHN0cmluZykgPT4ge1xuICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG5jb25zdCBjYXBpdGFsaXplQnJhbmNoRmlyc3RMZXR0ZXIgPSAobG9jYXRpb24pID0+IHtcbiAgaWYgKCFsb2NhdGlvbikgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBsb2NhdGlvblxuICAgIC5zcGxpdChcIiBcIilcbiAgICAubWFwKCh3b3JkKSA9PiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpKVxuICAgIC5qb2luKFwiIFwiKTtcbn07XG5cbmNvbnN0IGNhcGl0YWxpemVGaXJzdExldHRlciA9IChmdWxsTmFtZSkgPT4ge1xuICBjb25zdCBuYW1lUGFydHMgPSBmdWxsTmFtZS5zcGxpdChcIiBcIik7XG4gIGNvbnN0IGZpcnN0TmFtZSA9XG4gICAgbmFtZVBhcnRzWzBdLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZVBhcnRzWzBdLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGxhc3ROYW1lID1cbiAgICBuYW1lUGFydHNbbmFtZVBhcnRzLmxlbmd0aCAtIDFdLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICtcbiAgICBuYW1lUGFydHNbbmFtZVBhcnRzLmxlbmd0aCAtIDFdLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCk7XG4gIGxldCBtaWRkbGVOYW1lcyA9IFwiXCI7XG4gIGlmIChuYW1lUGFydHMubGVuZ3RoID4gMikge1xuICAgIG1pZGRsZU5hbWVzID0gbmFtZVBhcnRzXG4gICAgICAuc2xpY2UoMSwgLTEpXG4gICAgICAubWFwKChuYW1lKSA9PiBgJHtuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpfS5gKVxuICAgICAgLmpvaW4oXCIgXCIpO1xuICB9XG4gIHJldHVybiBgJHtmaXJzdE5hbWV9ICR7bWlkZGxlTmFtZXN9ICR7bGFzdE5hbWV9YC50cmltKCk7XG59O1xuXG5jb25zdCBmb3JtYXRGdWxsbmFtZSA9IChyb3cpID0+IHtcbiAgY29uc3QgY2FwaXRhbGl6ZSA9IChzdHIpID0+XG4gICAgc3RyID8gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkgOiBcIlwiO1xuICBjb25zdCBmaXJzdG5hbWUgPSByb3cuZmlyc3RuYW1lID8gY2FwaXRhbGl6ZShyb3cuZmlyc3RuYW1lKSA6IFwiTm8gRmlyc3RuYW1lXCI7XG4gIGNvbnN0IG1pZGRsZW5hbWUgPSByb3cubWlkZGxlbmFtZVxuICAgID8gY2FwaXRhbGl6ZShyb3cubWlkZGxlbmFtZSkuY2hhckF0KDApICsgXCIuXCJcbiAgICA6IFwiXCI7XG4gIGNvbnN0IGxhc3RuYW1lID0gcm93Lmxhc3RuYW1lID8gY2FwaXRhbGl6ZShyb3cubGFzdG5hbWUpIDogXCJObyBMYXN0bmFtZVwiO1xuXG4gIHJldHVybiBgJHtmaXJzdG5hbWV9ICR7bWlkZGxlbmFtZX0gJHtsYXN0bmFtZX1gLnRyaW0oKTtcbn07XG5cbmNvbnN0IGdldEJhZGdlU3RhdHVzQ29sb3IgPSAoc3RhdHVzKSA9PiB7XG4gIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgY2FzZSBcInBlbmRpbmdcIjpcbiAgICAgIHJldHVybiBcIm9yYW5nZVwiO1xuICAgIGNhc2UgXCJkZWNsaW5lZFwiOlxuICAgICAgcmV0dXJuIFwibmVnYXRpdmVcIjtcbiAgICBjYXNlIFwiY29uZmlybWVkXCI6XG4gICAgICByZXR1cm4gXCJncmVlblwiO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gXCJncmV5XCI7XG4gIH1cbn07XG5cbmNvbnN0IG9wZW5CYWtlcnNSZXBvcnRzRGlhbG9nID0gKCkgPT4ge1xuICBiYWtlcnNSZXBvcnREaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcblxuY29uc3QgZm9ybWF0RGF0ZSA9IChkYXRlU3RyaW5nKSA9PiB7XG4gIHJldHVybiBkYXRlLmZvcm1hdERhdGUoZGF0ZVN0cmluZywgXCJNTU1NIEQsIFlZWVlcIik7XG59O1xuXG5jb25zdCBmb3JtYXRRdWFudGl0eSA9IChxdWFudGl0eSkgPT4ge1xuICBpZiAocXVhbnRpdHkgPj0gMTAwMCkge1xuICAgIGNvbnN0IGtpbG9zID0gcXVhbnRpdHkgLyAxMDAwO1xuICAgIGNvbnN0IHVuaXQgPSBraWxvcyA9PT0gMSA/IFwia2dcIiA6IFwia2dzXCI7XG4gICAgcmV0dXJuIGAke2tpbG9zfSAke3VuaXR9YDtcbiAgfVxuICByZXR1cm4gYCR7cXVhbnRpdHl9IGdyYW1zYDtcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5yZXBvcnQtZGlhbG9nIHtcbiAgbWF4LXdpZHRoOiA2MDBweDtcbn1cblxuLnJlcG9ydC1jYXJkIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGJveC1zaGFkb3c6IDBweCAwcHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi5yZXBvcnQtaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjYztcbiAgcGFkZGluZzogMXJlbTtcbn1cblxuLmNsb3NlLWJ0biB7XG4gIHBhZGRpbmc6IDA7XG4gIG1pbi13aWR0aDogYXV0bztcbn1cblxuLnJlcG9ydC1pbmZvIHtcbiAgcGFkZGluZzogMXJlbTtcbn1cblxuLyogLnJlcG9ydC1zZWN0aW9uIHtcbiAgbWFyZ2luLXRvcDogMS41cmVtO1xufSAqL1xuXG4uc2VjdGlvbi10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xufVxuXG4uc2VjdGlvbi1jb250ZW50IHtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cblxuLyogLnN0YXR1cy1jaGlwIHtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbn0gKi9cblxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpIHtcbiAgLnJlcG9ydC1kaWFsb2cge1xuICAgIG1heC13aWR0aDogMTAwJTtcbiAgfVxuICAucmVwb3J0LWNhcmQge1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gIH1cbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJxLW10LXNtIHEtZ3V0dGVyLW1kXCI+XG4gICAgPGRpdj5cbiAgICAgIDxxLWlucHV0XG4gICAgICAgIHJvdW5kZWRcbiAgICAgICAgb3V0bGluZWRcbiAgICAgICAgZGVuc2VcbiAgICAgICAgZGVib3VuY2U9XCIzMDBcIlxuICAgICAgICB2LW1vZGVsPVwiZmlsdGVyXCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgICBzdHlsZT1cIndpZHRoOiA1MDBweDsgbWF4LXdpZHRoOiAxNTAwcHg7IG1pbi13aWR0aDogMTAwcHhcIlxuICAgICAgPlxuICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgICA8cS1pY29uIHYtaWY9XCIhbG9hZGluZ1NlYXJjaEljb25cIiBuYW1lPVwic2VhcmNoXCIgLz5cbiAgICAgICAgICA8cS1zcGlubmVyIHYtZWxzZSAvPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgPC9xLWlucHV0PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ0YWJsZS1jb250YWluZXJcIj5cbiAgICAgIDxxLXRhYmxlXG4gICAgICAgIGNsYXNzPVwic3RpY2t5LWhlYWRlclwiXG4gICAgICAgIDpmaWx0ZXI9XCJmaWx0ZXJcIlxuICAgICAgICBmbGF0XG4gICAgICAgIDpjb2x1bW5zPVwiYmFrZXJzUmVwb3J0TGlzdENvbHVtbnNcIlxuICAgICAgICA6cm93cz1cImZpbHRlcmVkUm93c1wiXG4gICAgICAgIHJvdy1rZXk9XCJuYW1lXCJcbiAgICAgICAgOnZpcnR1YWwtc2Nyb2xsLXN0aWNreS1zaXplLXN0YXJ0PVwiNDhcIlxuICAgICAgICB2aXJ0dWFsLXNjcm9sbFxuICAgICAgICB2LW1vZGVsOnBhZ2luYXRpb249XCJwYWdpbmF0aW9uXCJcbiAgICAgICAgOnJvd3MtcGVyLXBhZ2Utb3B0aW9ucz1cIlswXVwiXG4gICAgICAgIGhpZGUtYm90dG9tXG4gICAgICAgIHN0eWxlPVwiaGVpZ2h0OiA5MDBweDsgbWF4LWhlaWdodDogMTAwMHB4OyBtaW4taGVpZ2h0OiBub25lXCJcbiAgICAgID5cbiAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtc3RhdHVzPVwicHJvcHNcIj5cbiAgICAgICAgICA8cS10ZCBrZXk9XCJuYW1lXCIgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICAgIDxxLWJhZGdlIG91dGxpbmVkIDpjb2xvcj1cImdldEJhZGdlU3RhdHVzQ29sb3IocHJvcHMucm93LnN0YXR1cylcIj5cbiAgICAgICAgICAgICAge3sgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHByb3BzLnJvdy5zdGF0dXMpIH19XG4gICAgICAgICAgICA8L3EtYmFkZ2U+XG4gICAgICAgICAgPC9xLXRkPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC12aWV3PVwicHJvcHNcIj5cbiAgICAgICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPFJlcG9ydFZpZXcgOnJlcG9ydD1cInByb3BzLnJvd1wiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3EtdGQ+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8L3EtdGFibGU+XG4gICAgICA8ZGl2XG4gICAgICAgIHYtaWY9XCJsb2FkaW5nXCJcbiAgICAgICAgY2xhc3M9XCJsb2FkaW5nLW92ZXJsYXkgcm93IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlclwiXG4gICAgICA+XG4gICAgICAgIDxxLXNwaW5uZXIgc2l6ZT1cIjUwcHhcIiAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIHYtaWY9XCJzaG93Tm9EYXRhTWVzc2FnZVwiXG4gICAgICAgIGNsYXNzPVwicS1wYS1tZCBxLWd1dHRlci1tZCByb3cganVzdGlmeS1jZW50ZXJcIlxuICAgICAgPlxuICAgICAgICA8cS1iYW5uZXIgY2xhc3M9XCJiZy1ncmV5LTFcIiBkZW5zZT4gTm8gZGF0YSBhdmFpbGFibGUgPC9xLWJhbm5lcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VCYWtlclJlcG9ydHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2Jha2VyLXJlcG9ydFwiO1xuaW1wb3J0IFJlcG9ydFZpZXcgZnJvbSBcIi4vUmVwb3J0Vmlldy52dWVcIjtcbmltcG9ydCB7IGNvbXB1dGVkLCBvbk1vdW50ZWQsIHJlZiwgd2F0Y2ggfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBkYXRlIGFzIHF1YXNhckRhdGUgfSBmcm9tIFwicXVhc2FyXCI7XG5cbmNvbnN0IHBhZ2luYXRpb24gPSByZWYoe1xuICByb3dzUGVyUGFnZTogMCxcbn0pO1xuXG5jb25zdCBiYWtlclJlcG9ydFN0b3JlID0gdXNlQmFrZXJSZXBvcnRzU3RvcmUoKTtcbmNvbnN0IGJha2VyUmVwb3J0Um93ID0gY29tcHV0ZWQoKCkgPT4gYmFrZXJSZXBvcnRTdG9yZS5yZXBvcnRUb1ZpZXcpO1xuY29uc3QgdXNlckRhdGEgPSBjb21wdXRlZCgoKSA9PiBiYWtlclJlcG9ydFN0b3JlLnVzZXIpO1xuY29uc3QgdXNlcklkID0gdXNlckRhdGEudmFsdWU/LmRhdGEuaWQgfHwgXCJcIjtcbmNvbnN0IGZpbHRlciA9IHJlZihcIlwiKTtcbmNvbnN0IGxvYWRpbmcgPSByZWYodHJ1ZSk7XG5jb25zdCBsb2FkaW5nU2VhcmNoSWNvbiA9IHJlZihmYWxzZSk7XG5jb25zdCBzaG93Tm9EYXRhTWVzc2FnZSA9IHJlZihmYWxzZSk7XG5cbndhdGNoKGZpbHRlciwgYXN5bmMgKG5ld0ZpbHRlcikgPT4ge1xuICBsb2FkaW5nU2VhcmNoSWNvbi52YWx1ZSA9IHRydWU7XG4gIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApKTtcbiAgbG9hZGluZ1NlYXJjaEljb24udmFsdWUgPSBmYWxzZTtcbiAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSAhbG9hZGluZy52YWx1ZSAmJiBmaWx0ZXJlZFJvd3MudmFsdWUubGVuZ3RoID09PSAwO1xuICBjb25zb2xlLmxvZyhcIkZpbHRlcmVkIFJvd3M6XCIsIGZpbHRlcmVkUm93cy52YWx1ZSk7XG59KTtcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgY29uc29sZS5sb2coXCJwcm9wcy5icmFuY2hJZCBpbiBvbk1vdW50ZWQ6XCIsIHVzZXJJZCk7XG4gIGlmICh1c2VySWQpIHtcbiAgICBhd2FpdCByZWxvYWRUYWJsZURhdGEodXNlcklkKTtcbiAgfVxufSk7XG5cbmNvbnN0IHJlbG9hZFRhYmxlRGF0YSA9IGFzeW5jICh1c2VySWQpID0+IHtcbiAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gIGF3YWl0IGJha2VyUmVwb3J0U3RvcmUuZmV0Y2hCYWtlclJlcG9ydCh1c2VySWQpO1xuICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG59O1xuXG5jb25zdCBmaWx0ZXJlZFJvd3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmICghZmlsdGVyLnZhbHVlKSB7XG4gICAgcmV0dXJuIGJha2VyUmVwb3J0Um93LnZhbHVlO1xuICB9XG4gIGNvbnN0IGZpbHRlclRleHQgPSBmaWx0ZXIudmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIGJha2VyUmVwb3J0Um93LnZhbHVlLmZpbHRlcihcbiAgICAocm93KSA9PlxuICAgICAgKHJvdy5uYW1lICYmIHJvdy5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyVGV4dCkpIHx8XG4gICAgICAocm93LmNyZWF0ZWRfYXQgJiZcbiAgICAgICAgcXVhc2FyRGF0ZVxuICAgICAgICAgIC5mb3JtYXREYXRlKHJvdy5jcmVhdGVkX2F0LCBcIk1NTU0gRCwgWVlZWVwiKVxuICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgLmluY2x1ZGVzKGZpbHRlclRleHQpKSB8fFxuICAgICAgKHJvdy5yZWNpcGUgJiZcbiAgICAgICAgcm93LnJlY2lwZS5uYW1lICYmXG4gICAgICAgIHJvdy5yZWNpcGUubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGZpbHRlclRleHQpKSB8fFxuICAgICAgKHJvdy5yZWNpcGUgJiZcbiAgICAgICAgcm93LnJlY2lwZS5jYXRlZ29yeSAmJlxuICAgICAgICByb3cucmVjaXBlLmNhdGVnb3J5LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyVGV4dCkpXG4gICk7XG59KTtcblxuY29uc3QgZm9ybWF0RGF0ZSA9IChkYXRlU3RyaW5nKSA9PiB7XG4gIHJldHVybiBxdWFzYXJEYXRlLmZvcm1hdERhdGUoZGF0ZVN0cmluZywgXCJNTU1NIEQsIFlZWVlcIik7XG59O1xuXG5jb25zdCBiYWtlcnNSZXBvcnRMaXN0Q29sdW1ucyA9IFtcbiAge1xuICAgIG5hbWU6IFwiZGF0ZVwiLFxuICAgIGFsaWduOiBcImxlZnRcIixcbiAgICBsYWJlbDogXCJEYXRlXCIsXG4gICAgZmllbGQ6IFwiY3JlYXRlZF9hdFwiLFxuICAgIGZvcm1hdDogZm9ybWF0RGF0ZSxcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwibmFtZVwiLFxuICAgIGxhYmVsOiBcIlJlcG9ydHMgTmFtZVwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiAocm93KSA9PiAoe1xuICAgICAgbmFtZTogcm93LmJyYW5jaF9yZWNpcGUucmVjaXBlLm5hbWUsXG4gICAgICBjYXRlZ29yeTogcm93LmJyYW5jaF9yZWNpcGUucmVjaXBlLmNhdGVnb3J5LFxuICAgIH0pLFxuICAgIGZvcm1hdDogKHZhbCkgPT4gYCR7dmFsLm5hbWV9ICgke3ZhbC5jYXRlZ29yeX0pYCxcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwic3RhdHVzXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgbGFiZWw6IFwiU3RhdHVzXCIsXG4gICAgZmllbGQ6IFwic3RhdHVzXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInZpZXdcIixcbiAgICBhbGlnbjogXCJyaWdodFwiLFxuICAgIGxhYmVsOiBcIlZpZXdcIixcbiAgICBmaWVsZDogXCJ2aWV3XCIsXG4gIH0sXG5dO1xuXG5jb25zdCBnZXRCYWRnZVN0YXR1c0NvbG9yID0gKHN0YXR1cykgPT4ge1xuICBzd2l0Y2ggKHN0YXR1cykge1xuICAgIGNhc2UgXCJwZW5kaW5nXCI6XG4gICAgICByZXR1cm4gXCJvcmFuZ2VcIjtcbiAgICBjYXNlIFwiZGVjbGluZWRcIjpcbiAgICAgIHJldHVybiBcIm5lZ2F0aXZlXCI7XG4gICAgY2FzZSBcImNvbmZpcm1lZFwiOlxuICAgICAgcmV0dXJuIFwiZ3JlZW5cIjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIFwiZ3JleVwiO1xuICB9XG59O1xuY29uc3QgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyID0gKHN0cmluZykgPT4ge1xuICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCk7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4udGFibGUtY29udGFpbmVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4ubG9hZGluZy1vdmVybGF5IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KTtcbiAgei1pbmRleDogMTtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiZGF0ZSIsInVzZXJJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpS0EsVUFBTSxRQUFRO0FBT2QsWUFBUSxJQUFJLGFBQWEsTUFBTSxNQUFNO0FBRXJDLFVBQU0scUJBQXFCLElBQUksS0FBSztBQUVwQyxVQUFNLDhCQUE4QixDQUFDLFdBQVc7QUFDOUMsYUFBTyxPQUFPLE9BQU8sQ0FBQyxFQUFFLFlBQVcsSUFBSyxPQUFPLE1BQU0sQ0FBQyxFQUFFO0lBQzFEO0FBRUEsVUFBTSw4QkFBOEIsQ0FBQyxhQUFhO0FBQ2hELFVBQUksQ0FBQztBQUFVLGVBQU87QUFDdEIsYUFBTyxTQUNKLE1BQU0sR0FBRyxFQUNULElBQUksQ0FBQyxTQUFTLEtBQUssT0FBTyxDQUFDLEVBQUUsWUFBYSxJQUFHLEtBQUssTUFBTSxDQUFDLEVBQUUsWUFBVyxDQUFFLEVBQ3hFLEtBQUssR0FBRztBQUFBLElBQ2I7QUFtQkEsVUFBTSxpQkFBaUIsQ0FBQyxRQUFRO0FBQzlCLFlBQU0sYUFBYSxDQUFDLFFBQ2xCLE1BQU0sSUFBSSxPQUFPLENBQUMsRUFBRSxZQUFXLElBQUssSUFBSSxNQUFNLENBQUMsRUFB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SyxZQUFXLEVBQUcsU0FBUyxVQUFVLEtBQ2xELElBQUksVUFDSCxJQUFJLE9BQU8sWUFDWCxJQUFJLE9BQU8sU0FBUyxZQUFXLEVBQUcsU0FBUyxVQUFVO0FBQUEsTUFDN0Q7QUFBQSxJQUNBLENBQUM7QUFFRCxVQUFNLGFBQWEsQ0FBQyxlQUFlO0FBQ2pDLGFBQU8sV0FBVyxXQUFXLFlBQVksY0FBYztBQUFBLElBQ3pEO0FBRUEsVUFBTSwwQkFBMEI7QUFBQSxNQUM5QjtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsVUFBVTtBQUFBLE1BQ1g7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxPQUFPLENBQUMsU0FBUztBQUFBLFVBQ2YsTUFBTSxJQUFJLGNBQWMsT0FBTztBQUFBLFVBQy9CLFVBQVUsSUFBSSxjQUFjLE9BQU87QUFBQSxRQUN6QztBQUFBLFFBQ0ksUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLFNBQVMsSUFBSTtBQUFBLFFBQ3JDLFVBQVU7QUFBQSxNQUNYO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLE1BQ1I7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsTUFDUjtBQUFBLElBQ0g7QUFFQSxVQUFNLHNCQUFzQixDQUFDLFdBQVc7QUFDdEMsY0FBUTtBQUFBLGFBQ0Q7QUFDSCxpQkFBTztBQUFBLGFBQ0o7QUFDSCxpQkFBTztBQUFBLGFBQ0o7QUFDSCxpQkFBTztBQUFBO0FBRVAsaUJBQU87QUFBQTtBQUFBLElBRWI7QUFDQSxVQUFNLHdCQUF3QixDQUFDLFdBQVc7QUFDeEMsYUFBTyxPQUFPLE9BQU8sQ0FBQyxFQUFFLFlBQVcsSUFBSyxPQUFPLE1BQU0sQ0FBQyxFQUFFO0lBQzFEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
