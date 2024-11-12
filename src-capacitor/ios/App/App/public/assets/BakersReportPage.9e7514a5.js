import { _ as _export_sfc, n as ref, g as computed, o as openBlock, a4 as createElementBlock, a as createVNode, M as QBtn, w as withCtx, Q as QCard, I as QCardSection, J as createBaseVNode, O as createTextVNode, R as toDisplayString, a5 as Fragment, a6 as renderList, be as createCommentVNode, a3 as QDialog, K as QInput, aK as QCardActions, af as withDirectives, S as pushScopeId, T as popScopeId, z as onMounted, u as watch, c as createBlock, L as QIcon, bd as QSpinner } from "./index.c8e2405b.js";
import { Q as QBadge } from "./QBadge.49245359.js";
import { Q as QScrollArea } from "./QScrollArea.8dd131ca.js";
import { Q as QPage } from "./QPage.e43c6521.js";
import { u as useBakerReportsStore } from "./baker-report.4c6e60f9.js";
import { q as quasarDate } from "./date.cdd6bcba.js";
import { C as ClosePopup } from "./ClosePopup.649d85d8.js";
import { u as useQuasar } from "./use-quasar.84d8ad03.js";
import "./QResizeObserver.240147be.js";
import "./QScrollObserver.21839899.js";
import "./TouchPan.203b8c71.js";
import "./touch.9135741d.js";
import "./selection.94057980.js";
import "./axios.aa1bce92.js";
var BakersReportView_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-a9e5dd86"), n = n(), popScopeId(), n);
const _hoisted_1$2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "report-title" }, "Report Details", -1));
const _hoisted_2$1 = { class: "invoice-header" };
const _hoisted_3$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("strong", null, "Date:", -1));
const _hoisted_4$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("strong", null, "Branch:", -1));
const _hoisted_5$1 = { class: "invoice-body" };
const _hoisted_6$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("strong", null, "Baker:", -1));
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("strong", null, "Recipe:", -1));
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("strong", null, "Status:", -1));
const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("strong", null, "Kilo:", -1));
const _hoisted_10 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("strong", null, "Over:", -1));
const _hoisted_11 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("strong", null, "Short:", -1));
const _hoisted_12 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("strong", null, "Actual Target:", -1));
const _hoisted_13 = {
  key: 0,
  class: "invoice-section"
};
const _hoisted_14 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "section-title" }, "Breads", -1));
const _hoisted_15 = { class: "bread-name" };
const _hoisted_16 = { class: "bread-production" };
const _hoisted_17 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Decline Report", -1));
const _sfc_main$2 = {
  __name: "BakersReportView",
  props: {
    report: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const remarkDialog = ref(false);
    const openRemarkDialog = () => {
      remarkDialog.value = true;
    };
    const $q = useQuasar();
    const bakerReports = useBakerReportsStore();
    const bakersReportDialog = ref(false);
    const openBakersReportsDialog = () => {
      bakersReportDialog.value = true;
    };
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    const formatFullname = (row) => {
      const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
      const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
      const middlename = row.middlename ? capitalize(row.middlename).charAt(0) + "." : "";
      const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";
      return `${firstname} ${middlename} ${lastname}`;
    };
    const formatDate = (dateTimeString) => {
      return quasarDate.formatDate(dateTimeString, "MMMM D, YYYY hh:mm A");
    };
    const filteredBreads = computed(() => {
      return props.report.bread_bakers_reports.filter(
        (bread) => bread.bread_production > 0
      );
    });
    const confirmReport = async () => {
      try {
        const confirmedReport = await bakerReports.confirmReport(props.report.id);
        console.log("Report confirmed:", confirmedReport);
        $q.notify({ type: "positive", message: "Report confirmed successfully" });
        bakersReportDialog.value = false;
      } catch (error) {
        $q.notify({ type: "negative", message: "Failed to confirm report" });
      }
    };
    const declineReport = async () => {
      try {
        if (!remark.value.trim()) {
          $q.notify({ type: "negative", message: "Remark cannot be empty" });
          return;
        }
        await bakerReports.declineReport(props.report.id, remark.value);
        $q.notify({ type: "positive", message: "Report declined successfully" });
        bakersReportDialog.value = false;
        remarkDialog.value = false;
      } catch (error) {
        $q.notify({ type: "negative", message: "Failed to decline report" });
      }
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
                    _hoisted_1$2,
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
                    createBaseVNode("div", _hoisted_2$1, [
                      createBaseVNode("div", null, [
                        _hoisted_3$1,
                        createTextVNode(" " + toDisplayString(formatDate(__props.report.created_at)), 1)
                      ]),
                      createBaseVNode("div", null, [
                        _hoisted_4$1,
                        createTextVNode(" " + toDisplayString(capitalizeFirstLetter(__props.report.branch.name)), 1)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_5$1, [
                      createBaseVNode("div", null, [
                        _hoisted_6$1,
                        createTextVNode(" " + toDisplayString(formatFullname(__props.report.user.employee)), 1)
                      ]),
                      createBaseVNode("div", null, [
                        _hoisted_7,
                        createTextVNode(" " + toDisplayString(capitalizeFirstLetter(__props.report.branch_recipe.recipe.name)), 1)
                      ]),
                      createBaseVNode("div", null, [
                        _hoisted_8,
                        createTextVNode(" " + toDisplayString(capitalizeFirstLetter(__props.report.status)), 1)
                      ]),
                      createBaseVNode("div", null, [
                        _hoisted_9,
                        createTextVNode(" " + toDisplayString(__props.report.kilo), 1)
                      ]),
                      createBaseVNode("div", null, [
                        _hoisted_10,
                        createTextVNode(" " + toDisplayString(__props.report.over), 1)
                      ]),
                      createBaseVNode("div", null, [
                        _hoisted_11,
                        createTextVNode(" " + toDisplayString(__props.report.short), 1)
                      ]),
                      createBaseVNode("div", null, [
                        _hoisted_12,
                        createTextVNode(" " + toDisplayString(__props.report.actual_target), 1)
                      ])
                    ]),
                    filteredBreads.value.length ? (openBlock(), createElementBlock("div", _hoisted_13, [
                      _hoisted_14,
                      createBaseVNode("ul", null, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(filteredBreads.value, (bread) => {
                          return openBlock(), createElementBlock("li", {
                            key: bread.id
                          }, [
                            createBaseVNode("span", _hoisted_15, toDisplayString(bread.bread.name) + " -", 1),
                            createBaseVNode("span", _hoisted_16, toDisplayString(bread.bread_production) + " pcs", 1)
                          ]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, {
                  class: "report-actions q-gutter-sm",
                  align: "right"
                }, {
                  default: withCtx(() => [
                    createVNode(QBtn, {
                      color: "negative",
                      label: "Decline",
                      onClick: openRemarkDialog,
                      class: "action-btn"
                    }),
                    createVNode(QBtn, {
                      color: "positive",
                      label: "Confirm",
                      onClick: confirmReport,
                      class: "action-btn"
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"]),
        createVNode(QDialog, {
          modelValue: remarkDialog.value,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => remarkDialog.value = $event)
        }, {
          default: withCtx(() => [
            createVNode(QCard, null, {
              default: withCtx(() => [
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    _hoisted_17
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createVNode(QInput, {
                      modelValue: _ctx.remark,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.remark = $event),
                      placeholder: "Enter your remark",
                      label: "Remark",
                      type: "textarea",
                      filled: "",
                      "lazy-rules": "",
                      rules: [(val) => !!val || "Remark is required"]
                    }, null, 8, ["modelValue", "rules"])
                  ]),
                  _: 1
                }),
                createVNode(QCardActions, { align: "right" }, {
                  default: withCtx(() => [
                    withDirectives(createVNode(QBtn, {
                      flat: "",
                      label: "Cancel",
                      color: "primary"
                    }, null, 512), [
                      [ClosePopup]
                    ]),
                    createVNode(QBtn, {
                      flat: "",
                      label: "Confirm",
                      color: "negative",
                      onClick: declineReport
                    })
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
var ReportView = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-a9e5dd86"], ["__file", "BakersReportView.vue"]]);
const _hoisted_1$1 = { class: "q-gutter-md" };
const _hoisted_2 = { class: "q-gutter-md q-ma-md" };
const _hoisted_3 = { class: "row justify-between" };
const _hoisted_4 = { class: "text-subtitle1" };
const _hoisted_5 = { class: "text-subtitle1" };
const _hoisted_6 = { class: "text-h6" };
const _sfc_main$1 = {
  __name: "BakersReportCard",
  setup(__props) {
    var _a, _b, _c;
    const bakerReportStore = useBakerReportsStore();
    const userData = computed(() => bakerReportStore.user);
    const branchId = ((_c = (_b = (_a = userData.value) == null ? void 0 : _a.data) == null ? void 0 : _b.employee) == null ? void 0 : _c.branch_employee.branch_id) || "";
    const filter = ref("");
    const loadingSearchIcon = ref(false);
    const showNoDataMessage = ref(false);
    onMounted(async () => {
      console.log("props.userID in onMounted:", branchId);
      if (branchId) {
        await fetchReports(branchId);
      }
    });
    const fetchReports = async (branchId2) => {
      loadingSearchIcon.value = true;
      await bakerReportStore.fetchDoughReports(branchId2);
      loadingSearchIcon.value = false;
    };
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    watch(filter, async (newFilter) => {
      loadingSearchIcon.value = true;
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      loadingSearchIcon.value = false;
    });
    const filteredRows = computed(() => {
      if (!filter.value) {
        return bakerReportStore.reports;
      }
      const filterText = filter.value.toLowerCase();
      return bakerReportStore.reports.filter(
        (row) => row.branch_recipe.recipe.name && row.branch_recipe.recipe.name.toLowerCase().includes(filterText) || row.created_at && quasarDate.formatDate(row.created_at, "MMMM D, YYYY").toLowerCase().includes(filterText) || row.branch_recipe.recipe.category && row.branch_recipe.recipe.category.toLowerCase().includes(filterText)
      );
    });
    const formatDate = (dateString) => {
      return quasarDate.formatDate(dateString, "MMMM D, YYYY");
    };
    const formatTime = (timeString) => {
      return quasarDate.formatDate(timeString, "hh:mm A");
    };
    const formatFullname = (row) => {
      const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
      const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
      const middlename = row.middlename ? capitalize(row.middlename).charAt(0) + "." : "";
      const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";
      return `${firstname} ${middlename} ${lastname}`;
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
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, { padding: "" }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$1, [
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
            createVNode(QScrollArea, { style: { "height": "450px", "max-width": "1500px" } }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_2, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(filteredRows.value, (report) => {
                    return openBlock(), createBlock(QCard, {
                      key: report.id
                    }, {
                      default: withCtx(() => [
                        createVNode(QCardSection, null, {
                          default: withCtx(() => [
                            createBaseVNode("div", _hoisted_3, [
                              createBaseVNode("div", null, [
                                createBaseVNode("div", _hoisted_4, toDisplayString(formatDate(report.created_at)), 1),
                                createBaseVNode("div", _hoisted_5, toDisplayString(formatTime(report.created_at)), 1)
                              ]),
                              createBaseVNode("div", _hoisted_6, toDisplayString(formatFullname(report.user.employee)) + " - " + toDisplayString(capitalizeFirstLetter(report.branch_recipe.recipe.name)), 1),
                              createBaseVNode("div", null, [
                                createVNode(QBadge, {
                                  outlined: "",
                                  color: getBadgeStatusColor(report.status)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(capitalizeFirstLetter(report.status)), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["color"])
                              ]),
                              createBaseVNode("div", null, [
                                createVNode(ReportView, { report }, null, 8, ["report"])
                              ])
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ])
              ]),
              _: 1
            }),
            showNoDataMessage.value && filteredRows.value.length === 0 ? (openBlock(), createBlock(QCard, { key: 0 }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "text-h6 text-center" }, {
                  default: withCtx(() => [
                    createTextVNode("No reports found.")
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ])
        ]),
        _: 1
      });
    };
  }
};
var BakersReportTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "BakersReportCard.vue"]]);
const _hoisted_1 = { class: "text-h6 text-white" };
const _sfc_main = {
  __name: "BakersReportPage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QCard, { flat: "" }, {
        default: withCtx(() => [
          createVNode(QCardSection, { style: { "background-color": "#ef4444" } }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                createVNode(QIcon, { name: "fa-solid fa-layer-group" }),
                createTextVNode(" Bakers Report ")
              ])
            ]),
            _: 1
          }),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", null, [
                createVNode(BakersReportTable)
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
var BakersReportPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "BakersReportPage.vue"]]);
export { BakersReportPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFrZXJzUmVwb3J0UGFnZS45ZTc1MTRhNS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9zYWxlc19sYWR5L2Jha2Vyc19yZXBvcnQvY29tcG9uZW50cy9CYWtlcnNSZXBvcnRWaWV3LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9icmFuY2gvc2FsZXNfbGFkeS9iYWtlcnNfcmVwb3J0L2NvbXBvbmVudHMvQmFrZXJzUmVwb3J0Q2FyZC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8cS1idG5cbiAgICBjb2xvcj1cImFjY2VudFwiXG4gICAgaWNvbj1cInZpc2liaWxpdHlcIlxuICAgIHNpemU9XCJtZFwiXG4gICAgZmxhdFxuICAgIHJvdW5kXG4gICAgZGVuc2VcbiAgICBAY2xpY2s9XCJvcGVuQmFrZXJzUmVwb3J0c0RpYWxvZ1wiXG4gIC8+XG5cbiAgPHEtZGlhbG9nIHYtbW9kZWw9XCJiYWtlcnNSZXBvcnREaWFsb2dcIiBjbGFzcz1cInJlcG9ydC1kaWFsb2dcIj5cbiAgICA8cS1jYXJkIGNsYXNzPVwicmVwb3J0LWNhcmRcIj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJlcG9ydC1oZWFkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJlcG9ydC10aXRsZVwiPlJlcG9ydCBEZXRhaWxzPC9kaXY+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGNsYXNzPVwiY2xvc2UtYnRuXCJcbiAgICAgICAgICBjb2xvcj1cImdyZXktOFwiXG4gICAgICAgICAgZmxhdFxuICAgICAgICAgIHJvdW5kXG4gICAgICAgICAgZGVuc2VcbiAgICAgICAgICBpY29uPVwiY2xvc2VcIlxuICAgICAgICAgIEBjbGljaz1cImJha2Vyc1JlcG9ydERpYWxvZyA9IGZhbHNlXCJcbiAgICAgICAgLz5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJlcG9ydC1pbmZvXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnZvaWNlLWhlYWRlclwiPlxuICAgICAgICAgIDxkaXY+PHN0cm9uZz5EYXRlOjwvc3Ryb25nPiB7eyBmb3JtYXREYXRlKHJlcG9ydC5jcmVhdGVkX2F0KSB9fTwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8c3Ryb25nPkJyYW5jaDo8L3N0cm9uZz5cbiAgICAgICAgICAgIHt7IGNhcGl0YWxpemVGaXJzdExldHRlcihyZXBvcnQuYnJhbmNoLm5hbWUpIH19XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnZvaWNlLWJvZHlcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHN0cm9uZz5CYWtlcjo8L3N0cm9uZz4ge3sgZm9ybWF0RnVsbG5hbWUocmVwb3J0LnVzZXIuZW1wbG95ZWUpIH19XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxzdHJvbmc+UmVjaXBlOjwvc3Ryb25nPlxuICAgICAgICAgICAge3sgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHJlcG9ydC5icmFuY2hfcmVjaXBlLnJlY2lwZS5uYW1lKSB9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8c3Ryb25nPlN0YXR1czo8L3N0cm9uZz4ge3sgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHJlcG9ydC5zdGF0dXMpIH19XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj48c3Ryb25nPktpbG86PC9zdHJvbmc+IHt7IHJlcG9ydC5raWxvIH19PC9kaXY+XG4gICAgICAgICAgPGRpdj48c3Ryb25nPk92ZXI6PC9zdHJvbmc+IHt7IHJlcG9ydC5vdmVyIH19PC9kaXY+XG4gICAgICAgICAgPGRpdj48c3Ryb25nPlNob3J0Ojwvc3Ryb25nPiB7eyByZXBvcnQuc2hvcnQgfX08L2Rpdj5cbiAgICAgICAgICA8ZGl2PjxzdHJvbmc+QWN0dWFsIFRhcmdldDo8L3N0cm9uZz4ge3sgcmVwb3J0LmFjdHVhbF90YXJnZXQgfX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPCEtLSBDb25kaXRpb25hbGx5IERpc3BsYXkgQnJlYWRzIC0tPlxuICAgICAgICA8ZGl2IHYtaWY9XCJmaWx0ZXJlZEJyZWFkcy5sZW5ndGhcIiBjbGFzcz1cImludm9pY2Utc2VjdGlvblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRpdGxlXCI+QnJlYWRzPC9kaXY+XG4gICAgICAgICAgPHVsPlxuICAgICAgICAgICAgPGxpIHYtZm9yPVwiYnJlYWQgaW4gZmlsdGVyZWRCcmVhZHNcIiA6a2V5PVwiYnJlYWQuaWRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJicmVhZC1uYW1lXCI+IHt7IGJyZWFkLmJyZWFkLm5hbWUgfX0gLTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJicmVhZC1wcm9kdWN0aW9uXCJcbiAgICAgICAgICAgICAgICA+e3sgYnJlYWQuYnJlYWRfcHJvZHVjdGlvbiB9fSBwY3M8L3NwYW5cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJlcG9ydC1hY3Rpb25zIHEtZ3V0dGVyLXNtXCIgYWxpZ249XCJyaWdodFwiPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICAgICAgICBsYWJlbD1cIkRlY2xpbmVcIlxuICAgICAgICAgIEBjbGljaz1cIm9wZW5SZW1hcmtEaWFsb2dcIlxuICAgICAgICAgIGNsYXNzPVwiYWN0aW9uLWJ0blwiXG4gICAgICAgIC8+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGNvbG9yPVwicG9zaXRpdmVcIlxuICAgICAgICAgIGxhYmVsPVwiQ29uZmlybVwiXG4gICAgICAgICAgQGNsaWNrPVwiY29uZmlybVJlcG9ydFwiXG4gICAgICAgICAgY2xhc3M9XCJhY3Rpb24tYnRuXCJcbiAgICAgICAgLz5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG5cbiAgPHEtZGlhbG9nIHYtbW9kZWw9XCJyZW1hcmtEaWFsb2dcIj5cbiAgICA8cS1jYXJkPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPkRlY2xpbmUgUmVwb3J0PC9kaXY+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuXG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgdi1tb2RlbD1cInJlbWFya1wiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIHJlbWFya1wiXG4gICAgICAgICAgbGFiZWw9XCJSZW1hcmtcIlxuICAgICAgICAgIHR5cGU9XCJ0ZXh0YXJlYVwiXG4gICAgICAgICAgZmlsbGVkXG4gICAgICAgICAgbGF6eS1ydWxlc1xuICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAhIXZhbCB8fCAnUmVtYXJrIGlzIHJlcXVpcmVkJ11cIlxuICAgICAgICAvPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgICAgPHEtY2FyZC1hY3Rpb25zIGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgPHEtYnRuIGZsYXQgbGFiZWw9XCJDYW5jZWxcIiBjb2xvcj1cInByaW1hcnlcIiB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICAgIDxxLWJ0biBmbGF0IGxhYmVsPVwiQ29uZmlybVwiIGNvbG9yPVwibmVnYXRpdmVcIiBAY2xpY2s9XCJkZWNsaW5lUmVwb3J0XCIgLz5cbiAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmLCBjb21wdXRlZCwgd2F0Y2ggfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBkYXRlLCB1c2VRdWFzYXIgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyB1c2VCYWtlclJlcG9ydHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2Jha2VyLXJlcG9ydFwiO1xuXG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzKHtcbiAgcmVwb3J0OiB7XG4gICAgdHlwZTogT2JqZWN0LFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICB9LFxufSk7XG5cbmNvbnN0IHJlbWFya0RpYWxvZyA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IG9wZW5SZW1hcmtEaWFsb2cgPSAoKSA9PiB7XG4gIHJlbWFya0RpYWxvZy52YWx1ZSA9IHRydWU7XG59O1xuXG5jb25zdCAkcSA9IHVzZVF1YXNhcigpO1xuY29uc3QgYmFrZXJSZXBvcnRzID0gdXNlQmFrZXJSZXBvcnRzU3RvcmUoKTtcbmNvbnN0IGJha2Vyc1JlcG9ydERpYWxvZyA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IG9wZW5CYWtlcnNSZXBvcnRzRGlhbG9nID0gKCkgPT4ge1xuICBiYWtlcnNSZXBvcnREaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcblxuY29uc3QgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyID0gKHN0cmluZykgPT4ge1xuICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG5jb25zdCBmb3JtYXRGdWxsbmFtZSA9IChyb3cpID0+IHtcbiAgY29uc3QgY2FwaXRhbGl6ZSA9IChzdHIpID0+XG4gICAgc3RyID8gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkgOiBcIlwiO1xuXG4gIGNvbnN0IGZpcnN0bmFtZSA9IHJvdy5maXJzdG5hbWUgPyBjYXBpdGFsaXplKHJvdy5maXJzdG5hbWUpIDogXCJObyBGaXJzdG5hbWVcIjtcbiAgY29uc3QgbWlkZGxlbmFtZSA9IHJvdy5taWRkbGVuYW1lXG4gICAgPyBjYXBpdGFsaXplKHJvdy5taWRkbGVuYW1lKS5jaGFyQXQoMCkgKyBcIi5cIlxuICAgIDogXCJcIjtcbiAgY29uc3QgbGFzdG5hbWUgPSByb3cubGFzdG5hbWUgPyBjYXBpdGFsaXplKHJvdy5sYXN0bmFtZSkgOiBcIk5vIExhc3RuYW1lXCI7XG5cbiAgcmV0dXJuIGAke2ZpcnN0bmFtZX0gJHttaWRkbGVuYW1lfSAke2xhc3RuYW1lfWA7XG59O1xuXG5jb25zdCBmb3JtYXREYXRlID0gKGRhdGVUaW1lU3RyaW5nKSA9PiB7XG4gIHJldHVybiBkYXRlLmZvcm1hdERhdGUoZGF0ZVRpbWVTdHJpbmcsIFwiTU1NTSBELCBZWVlZIGhoOm1tIEFcIik7XG59O1xuXG5jb25zdCBmaWx0ZXJlZEJyZWFkcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIHByb3BzLnJlcG9ydC5icmVhZF9iYWtlcnNfcmVwb3J0cy5maWx0ZXIoXG4gICAgKGJyZWFkKSA9PiBicmVhZC5icmVhZF9wcm9kdWN0aW9uID4gMFxuICApO1xufSk7XG5cbmNvbnN0IGNvbmZpcm1SZXBvcnQgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgY29uZmlybWVkUmVwb3J0ID0gYXdhaXQgYmFrZXJSZXBvcnRzLmNvbmZpcm1SZXBvcnQocHJvcHMucmVwb3J0LmlkKTtcbiAgICBjb25zb2xlLmxvZyhcIlJlcG9ydCBjb25maXJtZWQ6XCIsIGNvbmZpcm1lZFJlcG9ydCk7XG4gICAgJHEubm90aWZ5KHsgdHlwZTogXCJwb3NpdGl2ZVwiLCBtZXNzYWdlOiBcIlJlcG9ydCBjb25maXJtZWQgc3VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgYmFrZXJzUmVwb3J0RGlhbG9nLnZhbHVlID0gZmFsc2U7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgJHEubm90aWZ5KHsgdHlwZTogXCJuZWdhdGl2ZVwiLCBtZXNzYWdlOiBcIkZhaWxlZCB0byBjb25maXJtIHJlcG9ydFwiIH0pO1xuICB9XG59O1xuY29uc3QgZGVjbGluZVJlcG9ydCA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBpZiAoIXJlbWFyay52YWx1ZS50cmltKCkpIHtcbiAgICAgICRxLm5vdGlmeSh7IHR5cGU6IFwibmVnYXRpdmVcIiwgbWVzc2FnZTogXCJSZW1hcmsgY2Fubm90IGJlIGVtcHR5XCIgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgYmFrZXJSZXBvcnRzLmRlY2xpbmVSZXBvcnQocHJvcHMucmVwb3J0LmlkLCByZW1hcmsudmFsdWUpO1xuICAgICRxLm5vdGlmeSh7IHR5cGU6IFwicG9zaXRpdmVcIiwgbWVzc2FnZTogXCJSZXBvcnQgZGVjbGluZWQgc3VjY2Vzc2Z1bGx5XCIgfSk7XG4gICAgYmFrZXJzUmVwb3J0RGlhbG9nLnZhbHVlID0gZmFsc2U7XG4gICAgcmVtYXJrRGlhbG9nLnZhbHVlID0gZmFsc2U7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgJHEubm90aWZ5KHsgdHlwZTogXCJuZWdhdGl2ZVwiLCBtZXNzYWdlOiBcIkZhaWxlZCB0byBkZWNsaW5lIHJlcG9ydFwiIH0pO1xuICB9XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4ucmVwb3J0LWRpYWxvZyB7XG4gIG1heC13aWR0aDogNjAwcHg7XG59XG5cbi5yZXBvcnQtY2FyZCB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBib3gtc2hhZG93OiAwcHggMHB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4ucmVwb3J0LWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2M7XG4gIHBhZGRpbmc6IDFyZW07XG59XG5cbi5yZXBvcnQtdGl0bGUge1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5jbG9zZS1idG4ge1xuICBwYWRkaW5nOiAwO1xuICBtaW4td2lkdGg6IGF1dG87XG59XG5cbi5yZXBvcnQtaW5mbyB7XG4gIHBhZGRpbmc6IDFyZW07XG59XG5cbi5pbnZvaWNlLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cblxuLmludm9pY2UtYm9keSB7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbi5pbnZvaWNlLXNlY3Rpb24ge1xuICBtYXJnaW4tdG9wOiAxLjVyZW07XG59XG5cbi5zZWN0aW9uLXRpdGxlIHtcbiAgZm9udC1zaXplOiAxLjJyZW07XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG59XG5cbnVsIHtcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICBwYWRkaW5nLWxlZnQ6IDA7XG59XG5cbnVsIGxpIHtcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICBmb250LXNpemU6IDFyZW07XG59XG5cbi5icmVhZC1uYW1lIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIG1hcmdpbi1yaWdodDogMC41cmVtO1xufVxuXG4uYnJlYWQtcHJvZHVjdGlvbiB7XG4gIGNvbG9yOiAjNTU1O1xufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBwYWRkaW5nPlxuICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci1tZFwiPlxuICAgICAgPGRpdj5cbiAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICByb3VuZGVkXG4gICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICBkZW5zZVxuICAgICAgICAgIGRlYm91bmNlPVwiMzAwXCJcbiAgICAgICAgICB2LW1vZGVsPVwiZmlsdGVyXCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgICAgICAgc3R5bGU9XCJ3aWR0aDogNTAwcHg7IG1heC13aWR0aDogMTUwMHB4OyBtaW4td2lkdGg6IDEwMHB4XCJcbiAgICAgICAgPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICAgICAgPHEtaWNvbiB2LWlmPVwiIWxvYWRpbmdTZWFyY2hJY29uXCIgbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICAgICAgICA8cS1zcGlubmVyIHYtZWxzZSAvPlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDwvcS1pbnB1dD5cbiAgICAgIDwvZGl2PlxuICAgICAgPHEtc2Nyb2xsLWFyZWEgc3R5bGU9XCJoZWlnaHQ6IDQ1MHB4OyBtYXgtd2lkdGg6IDE1MDBweFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItbWQgcS1tYS1tZFwiPlxuICAgICAgICAgIDxxLWNhcmQgdi1mb3I9XCJyZXBvcnQgaW4gZmlsdGVyZWRSb3dzXCIgOmtleT1cInJlcG9ydC5pZFwiPlxuICAgICAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1zdWJ0aXRsZTFcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgZm9ybWF0RGF0ZShyZXBvcnQuY3JlYXRlZF9hdCkgfX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUxXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IGZvcm1hdFRpbWUocmVwb3J0LmNyZWF0ZWRfYXQpIH19XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPlxuICAgICAgICAgICAgICAgICAge3sgZm9ybWF0RnVsbG5hbWUocmVwb3J0LnVzZXIuZW1wbG95ZWUpIH19IC1cbiAgICAgICAgICAgICAgICAgIHt7IGNhcGl0YWxpemVGaXJzdExldHRlcihyZXBvcnQuYnJhbmNoX3JlY2lwZS5yZWNpcGUubmFtZSkgfX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPHEtYmFkZ2Ugb3V0bGluZWQgOmNvbG9yPVwiZ2V0QmFkZ2VTdGF0dXNDb2xvcihyZXBvcnQuc3RhdHVzKVwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBjYXBpdGFsaXplRmlyc3RMZXR0ZXIocmVwb3J0LnN0YXR1cykgfX1cbiAgICAgICAgICAgICAgICAgIDwvcS1iYWRnZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPFJlcG9ydFZpZXcgOnJlcG9ydD1cInJlcG9ydFwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3Etc2Nyb2xsLWFyZWE+XG5cbiAgICAgIDxxLWNhcmQgdi1pZj1cInNob3dOb0RhdGFNZXNzYWdlICYmIGZpbHRlcmVkUm93cy5sZW5ndGggPT09IDBcIj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwidGV4dC1oNiB0ZXh0LWNlbnRlclwiXG4gICAgICAgICAgPk5vIHJlcG9ydHMgZm91bmQuPC9xLWNhcmQtc2VjdGlvblxuICAgICAgICA+XG4gICAgICA8L3EtY2FyZD5cbiAgICA8L2Rpdj5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgdXNlQmFrZXJSZXBvcnRzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9iYWtlci1yZXBvcnRcIjtcbmltcG9ydCB7IGNvbXB1dGVkLCByZWYsIHdhdGNoLCBvbk1vdW50ZWQgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBkYXRlIGFzIHF1YXNhckRhdGUgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgUmVwb3J0VmlldyBmcm9tIFwiLi9CYWtlcnNSZXBvcnRWaWV3LnZ1ZVwiO1xuXG5jb25zdCBiYWtlclJlcG9ydFN0b3JlID0gdXNlQmFrZXJSZXBvcnRzU3RvcmUoKTtcbmNvbnN0IHVzZXJEYXRhID0gY29tcHV0ZWQoKCkgPT4gYmFrZXJSZXBvcnRTdG9yZS51c2VyKTtcbmNvbnN0IGJyYW5jaElkID1cbiAgdXNlckRhdGEudmFsdWU/LmRhdGE/LmVtcGxveWVlPy5icmFuY2hfZW1wbG95ZWUuYnJhbmNoX2lkIHx8IFwiXCI7XG5jb25zdCBmaWx0ZXIgPSByZWYoXCJcIik7XG5jb25zdCBsb2FkaW5nU2VhcmNoSWNvbiA9IHJlZihmYWxzZSk7XG5jb25zdCBzaG93Tm9EYXRhTWVzc2FnZSA9IHJlZihmYWxzZSk7XG5cbi8vIEZldGNoIHJlcG9ydHMgb24gY29tcG9uZW50IG1vdW50XG5vbk1vdW50ZWQoYXN5bmMgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhcInByb3BzLnVzZXJJRCBpbiBvbk1vdW50ZWQ6XCIsIGJyYW5jaElkKTtcbiAgaWYgKGJyYW5jaElkKSB7XG4gICAgYXdhaXQgZmV0Y2hSZXBvcnRzKGJyYW5jaElkKTtcbiAgfVxufSk7XG5cbi8vIEZldGNoIHJlcG9ydHMgZnVuY3Rpb25cbmNvbnN0IGZldGNoUmVwb3J0cyA9IGFzeW5jIChicmFuY2hJZCkgPT4ge1xuICBsb2FkaW5nU2VhcmNoSWNvbi52YWx1ZSA9IHRydWU7XG4gIGF3YWl0IGJha2VyUmVwb3J0U3RvcmUuZmV0Y2hEb3VnaFJlcG9ydHMoYnJhbmNoSWQpO1xuICBsb2FkaW5nU2VhcmNoSWNvbi52YWx1ZSA9IGZhbHNlO1xufTtcbmNvbnN0IGNhcGl0YWxpemVGaXJzdExldHRlciA9IChzdHJpbmcpID0+IHtcbiAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKS50b0xvd2VyQ2FzZSgpO1xufTtcblxuLy8gV2F0Y2ggZm9yIGNoYW5nZXMgaW4gZmlsdGVyXG53YXRjaChmaWx0ZXIsIGFzeW5jIChuZXdGaWx0ZXIpID0+IHtcbiAgbG9hZGluZ1NlYXJjaEljb24udmFsdWUgPSB0cnVlO1xuICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKSk7XG4gIGxvYWRpbmdTZWFyY2hJY29uLnZhbHVlID0gZmFsc2U7XG59KTtcblxuY29uc3QgZmlsdGVyZWRSb3dzID0gY29tcHV0ZWQoKCkgPT4ge1xuICBpZiAoIWZpbHRlci52YWx1ZSkge1xuICAgIHJldHVybiBiYWtlclJlcG9ydFN0b3JlLnJlcG9ydHM7XG4gIH1cbiAgY29uc3QgZmlsdGVyVGV4dCA9IGZpbHRlci52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gYmFrZXJSZXBvcnRTdG9yZS5yZXBvcnRzLmZpbHRlcihcbiAgICAocm93KSA9PlxuICAgICAgKHJvdy5icmFuY2hfcmVjaXBlLnJlY2lwZS5uYW1lICYmXG4gICAgICAgIHJvdy5icmFuY2hfcmVjaXBlLnJlY2lwZS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyVGV4dCkpIHx8XG4gICAgICAocm93LmNyZWF0ZWRfYXQgJiZcbiAgICAgICAgcXVhc2FyRGF0ZVxuICAgICAgICAgIC5mb3JtYXREYXRlKHJvdy5jcmVhdGVkX2F0LCBcIk1NTU0gRCwgWVlZWVwiKVxuICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgLmluY2x1ZGVzKGZpbHRlclRleHQpKSB8fFxuICAgICAgKHJvdy5icmFuY2hfcmVjaXBlLnJlY2lwZS5jYXRlZ29yeSAmJlxuICAgICAgICByb3cuYnJhbmNoX3JlY2lwZS5yZWNpcGUuY2F0ZWdvcnkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmaWx0ZXJUZXh0KSlcbiAgKTtcbn0pO1xuXG5jb25zdCBmb3JtYXREYXRlID0gKGRhdGVTdHJpbmcpID0+IHtcbiAgcmV0dXJuIHF1YXNhckRhdGUuZm9ybWF0RGF0ZShkYXRlU3RyaW5nLCBcIk1NTU0gRCwgWVlZWVwiKTtcbn07XG5jb25zdCBmb3JtYXRUaW1lID0gKHRpbWVTdHJpbmcpID0+IHtcbiAgcmV0dXJuIHF1YXNhckRhdGUuZm9ybWF0RGF0ZSh0aW1lU3RyaW5nLCBcImhoOm1tIEFcIik7XG59O1xuXG5jb25zdCBmb3JtYXRVc2VyTmFtZSA9IChmdWxsTmFtZSkgPT4ge1xuICBpZiAoIWZ1bGxOYW1lKSByZXR1cm4gXCJcIjtcblxuICAvLyBTcGxpdCB0aGUgZnVsbCBuYW1lIGludG8gcGFydHNcbiAgY29uc3QgcGFydHMgPSBmdWxsTmFtZS5zcGxpdChcIiBcIik7XG5cbiAgLy8gQ2FwaXRhbGl6ZSBlYWNoIHBhcnQgYW5kIGhhbmRsZSBtaWRkbGUgaW5pdGlhbFxuICBjb25zdCBmb3JtYXR0ZWRQYXJ0cyA9IHBhcnRzLm1hcCgocGFydCwgaW5kZXgpID0+IHtcbiAgICBpZiAoaW5kZXggPT09IDAgfHwgaW5kZXggPT09IHBhcnRzLmxlbmd0aCAtIDEpIHtcbiAgICAgIHJldHVybiBwYXJ0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcGFydC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcGFydC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIFwiLlwiO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGZvcm1hdHRlZFBhcnRzLmpvaW4oXCIgXCIpO1xufTtcblxuY29uc3QgZm9ybWF0RnVsbG5hbWUgPSAocm93KSA9PiB7XG4gIGNvbnN0IGNhcGl0YWxpemUgPSAoc3RyKSA9PlxuICAgIHN0ciA/IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKS50b0xvd2VyQ2FzZSgpIDogXCJcIjtcblxuICBjb25zdCBmaXJzdG5hbWUgPSByb3cuZmlyc3RuYW1lID8gY2FwaXRhbGl6ZShyb3cuZmlyc3RuYW1lKSA6IFwiTm8gRmlyc3RuYW1lXCI7XG4gIGNvbnN0IG1pZGRsZW5hbWUgPSByb3cubWlkZGxlbmFtZVxuICAgID8gY2FwaXRhbGl6ZShyb3cubWlkZGxlbmFtZSkuY2hhckF0KDApICsgXCIuXCJcbiAgICA6IFwiXCI7XG4gIGNvbnN0IGxhc3RuYW1lID0gcm93Lmxhc3RuYW1lID8gY2FwaXRhbGl6ZShyb3cubGFzdG5hbWUpIDogXCJObyBMYXN0bmFtZVwiO1xuXG4gIHJldHVybiBgJHtmaXJzdG5hbWV9ICR7bWlkZGxlbmFtZX0gJHtsYXN0bmFtZX1gO1xufTtcblxuY29uc3Qgdmlld1JlcG9ydCA9IChyZXBvcnQpID0+IHtcbiAgLy8gTmF2aWdhdGUgdG8gdGhlIGRldGFpbGVkIHZpZXcgb2YgdGhlIHJlcG9ydCBvciBoYW5kbGUgYXMgbmVlZGVkXG4gIGNvbnNvbGUubG9nKFwiVmlld2luZyByZXBvcnQ6XCIsIHJlcG9ydCk7XG59O1xuXG5jb25zdCBnZXRCYWRnZVN0YXR1c0NvbG9yID0gKHN0YXR1cykgPT4ge1xuICBzd2l0Y2ggKHN0YXR1cykge1xuICAgIGNhc2UgXCJwZW5kaW5nXCI6XG4gICAgICByZXR1cm4gXCJvcmFuZ2VcIjtcbiAgICBjYXNlIFwiZGVjbGluZWRcIjpcbiAgICAgIHJldHVybiBcIm5lZ2F0aXZlXCI7XG4gICAgY2FzZSBcImNvbmZpcm1lZFwiOlxuICAgICAgcmV0dXJuIFwiZ3JlZW5cIjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIFwiZ3JleVwiO1xuICB9XG59O1xuPC9zY3JpcHQ+XG4iXSwibmFtZXMiOlsiZGF0ZSIsImJyYW5jaElkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrSEEsVUFBTSxRQUFRO0FBT2QsVUFBTSxlQUFlLElBQUksS0FBSztBQUU5QixVQUFNLG1CQUFtQixNQUFNO0FBQzdCLG1CQUFhLFFBQVE7QUFBQSxJQUN2QjtBQUVBLFVBQU0sS0FBSyxVQUFTO0FBQ3BCLFVBQU0sZUFBZSxxQkFBb0I7QUFDekMsVUFBTSxxQkFBcUIsSUFBSSxLQUFLO0FBRXBDLFVBQU0sMEJBQTBCLE1BQU07QUFDcEMseUJBQW1CLFFBQVE7QUFBQSxJQUM3QjtBQUVBLFVBQU0sd0JBQXdCLENBQUMsV0FBVztBQUN4QyxhQUFPLE9BQU8sT0FBTyxDQUFDLEVBQUUsWUFBVyxJQUFLLE9BQU8sTUFBTSxDQUFDLEVBQUU7SUFDMUQ7QUFFQSxVQUFNLGlCQUFpQixDQUFDLFFBQVE7QUFDOUIsWUFBTSxhQUFhLENBQUMsUUFDbEIsTUFBTSxJQUFJLE9BQU8sQ0FBQyxFQUFFLFlBQVcsSUFBSyxJQUFJLE1BQU0sQ0FBQyxFQUFFLFlBQVcsSUFBSztBQUVuRSxZQUFNLFlBQVksSUFBSSxZQUFZLFdBQVcsSUFBSSxTQUFTLElBQUk7QUFDOUQsWUFBTSxhQUFhLElBQUksYUFDbkIsV0FBVyxJQUFJLFVBQVUsRUFBRSxPQUFPLENBQUMsSUFBSSxNQUN2QztBQUNKLFlBQU0sV0FBVyxJQUFJLFdBQVcsV0FBVyxJQUFJLFFBQVEsSUFBSTtBQUUzRCxhQUFPLEdBQUcsYUFBYSxjQUFjO0FBQUEsSUFDdkM7QUFFQSxVQUFNLGFBQWEsQ0FBQyxtQkFBbUI7QUFDckMsYUFBT0EsV0FBSyxXQUFXLGdCQUFnQixzQkFBc0I7QUFBQSxJQUMvRDtBQUVBLFVBQU0saUJBQWlCLFNBQVMsTUFBTTtBQUNwQyxhQUFPLE1BQU0sT0FBTyxxQkFBcUI7QUFBQSxRQUN2QyxDQUFDLFVBQVUsTUFBTSxtQkFBbUI7QUFBQSxNQUN4QztBQUFBLElBQ0EsQ0FBQztBQUVELFVBQU0sZ0JBQWdCLFlBQVk7QUFDaEMsVUFBSTtBQUNGLGNBQU0sa0JBQWtCLE1BQU0sYUFBYSxjQUFjLE1BQU0sT0FBTyxFQUFFO0FBQ3hFLGdCQUFRLElBQUkscUJBQXFCLGVBQWU7QUFDaEQsV0FBRyxPQUFPLEVBQUUsTUFBTSxZQUFZLFNBQVMsZ0NBQStCLENBQUU7QUFDeEUsMkJBQW1CLFFBQVE7QUFBQSxNQUM1QixTQUFRLE9BQVA7QUFDQSxXQUFHLE9BQU8sRUFBRSxNQUFNLFlBQVksU0FBUywyQkFBMEIsQ0FBRTtBQUFBLE1BQ3BFO0FBQUEsSUFDSDtBQUNBLFVBQU0sZ0JBQWdCLFlBQVk7QUFDaEMsVUFBSTtBQUNGLFlBQUksQ0FBQyxPQUFPLE1BQU0sUUFBUTtBQUN4QixhQUFHLE9BQU8sRUFBRSxNQUFNLFlBQVksU0FBUyx5QkFBd0IsQ0FBRTtBQUNqRTtBQUFBLFFBQ0Q7QUFFRCxjQUFNLGFBQWEsY0FBYyxNQUFNLE9BQU8sSUFBSSxPQUFPLEtBQUs7QUFDOUQsV0FBRyxPQUFPLEVBQUUsTUFBTSxZQUFZLFNBQVMsK0JBQThCLENBQUU7QUFDdkUsMkJBQW1CLFFBQVE7QUFDM0IscUJBQWEsUUFBUTtBQUFBLE1BQ3RCLFNBQVEsT0FBUDtBQUNBLFdBQUcsT0FBTyxFQUFFLE1BQU0sWUFBWSxTQUFTLDJCQUEwQixDQUFFO0FBQUEsTUFDcEU7QUFBQSxJQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6SEEsVUFBTSxtQkFBbUIscUJBQW9CO0FBQzdDLFVBQU0sV0FBVyxTQUFTLE1BQU0saUJBQWlCLElBQUk7QUFDckQsVUFBTSxhQUNKLDBCQUFTLFVBQVQsbUJBQWdCLFNBQWhCLG1CQUFzQixhQUF0QixtQkFBZ0MsZ0JBQWdCLGNBQWE7QUFDL0QsVUFBTSxTQUFTLElBQUksRUFBRTtBQUNyQixVQUFNLG9CQUFvQixJQUFJLEtBQUs7QUFDbkMsVUFBTSxvQkFBb0IsSUFBSSxLQUFLO0FBR25DLGNBQVUsWUFBWTtBQUNwQixjQUFRLElBQUksOEJBQThCLFFBQVE7QUFDbEQsVUFBSSxVQUFVO0FBQ1osY0FBTSxhQUFhLFFBQVE7QUFBQSxNQUM1QjtBQUFBLElBQ0gsQ0FBQztBQUdELFVBQU0sZUFBZSxPQUFPQyxjQUFhO0FBQ3ZDLHdCQUFrQixRQUFRO0FBQzFCLFlBQU0saUJBQWlCLGtCQUFrQkEsU0FBUTtBQUNqRCx3QkFBa0IsUUFBUTtBQUFBLElBQzVCO0FBQ0EsVUFBTSx3QkFBd0IsQ0FBQyxXQUFXO0FBQ3hDLGFBQU8sT0FBTyxPQUFPLENBQUMsRUFBRSxZQUFXLElBQUssT0FBTyxNQUFNLENBQUMsRUFBRTtJQUMxRDtBQUdBLFVBQU0sUUFBUSxPQUFPLGNBQWM7QUFDakMsd0JBQWtCLFFBQVE7QUFDMUIsWUFBTSxJQUFJLFFBQVEsQ0FBQyxZQUFZLFdBQVcsU0FBUyxHQUFJLENBQUM7QUFDeEQsd0JBQWtCLFFBQVE7QUFBQSxJQUM1QixDQUFDO0FBRUQsVUFBTSxlQUFlLFNBQVMsTUFBTTtBQUNsQyxVQUFJLENBQUMsT0FBTyxPQUFPO0FBQ2pCLGVBQU8saUJBQWlCO0FBQUEsTUFDekI7QUFDRCxZQUFNLGFBQWEsT0FBTyxNQUFNLFlBQVc7QUFDM0MsYUFBTyxpQkFBaUIsUUFBUTtBQUFBLFFBQzlCLENBQUMsUUFDRSxJQUFJLGNBQWMsT0FBTyxRQUN4QixJQUFJLGNBQWMsT0FBTyxLQUFLLFlBQWEsRUFBQyxTQUFTLFVBQVUsS0FDaEUsSUFBSSxjQUNILFdBQ0csV0FBVyxJQUFJLFlBQVksY0FBYyxFQUN6QyxZQUFhLEVBQ2IsU0FBUyxVQUFVLEtBQ3ZCLElBQUksY0FBYyxPQUFPLFlBQ3hCLElBQUksY0FBYyxPQUFPLFNBQVMsY0FBYyxTQUFTLFVBQVU7QUFBQSxNQUMzRTtBQUFBLElBQ0EsQ0FBQztBQUVELFVBQU0sYUFBYSxDQUFDLGVBQWU7QUFDakMsYUFBTyxXQUFXLFdBQVcsWUFBWSxjQUFjO0FBQUEsSUFDekQ7QUFDQSxVQUFNLGFBQWEsQ0FBQyxlQUFlO0FBQ2pDLGFBQU8sV0FBVyxXQUFXLFlBQVksU0FBUztBQUFBLElBQ3BEO0FBb0JBLFVBQU0saUJBQWlCLENBQUMsUUFBUTtBQUM5QixZQUFNLGFBQWEsQ0FBQyxRQUNsQixNQUFNLElBQUksT0FBTyxDQUFDLEVBQUUsWUFBVyxJQUFLLElBQUksTUFBTSxDQUFDLEVBQUUsWUFBVyxJQUFLO0FBRW5FLFlBQU0sWUFBWSxJQUFJLFlBQVksV0FBVyxJQUFJLFNBQVMsSUFBSTtBQUM5RCxZQUFNLGFBQWEsSUFBSSxhQUNuQixXQUFXLElBQUksVUFBVSxFQUFFLE9BQU8sQ0FBQyxJQUFJLE1BQ3ZDO0FBQ0osWUFBTSxXQUFXLElBQUksV0FBVyxXQUFXLElBQUksUUFBUSxJQUFJO0FBRTNELGFBQU8sR0FBRyxhQUFhLGNBQWM7QUFBQSxJQUN2QztBQU9BLFVBQU0sc0JBQXNCLENBQUMsV0FBVztBQUN0QyxjQUFRO0FBQUEsYUFDRDtBQUNILGlCQUFPO0FBQUEsYUFDSjtBQUNILGlCQUFPO0FBQUEsYUFDSjtBQUNILGlCQUFPO0FBQUE7QUFFUCxpQkFBTztBQUFBO0FBQUEsSUFFYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
