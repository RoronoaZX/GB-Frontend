import { _ as _export_sfc, n as ref, g as computed, o as openBlock, a4 as createElementBlock, a as createVNode, M as QBtn, w as withCtx, Q as QCard, I as QCardSection, J as createBaseVNode, a1 as createTextVNode, a0 as toDisplayString, a5 as Fragment, a6 as renderList, be as createCommentVNode, a3 as QDialog, O as pushScopeId, R as popScopeId, z as onMounted, u as watch, c as createBlock, K as QInput, L as QIcon, br as QSpinner } from "./index.9b9dbcba.js";
import { Q as QBadge } from "./QBadge.cf1023ef.js";
import { Q as QScrollArea } from "./QScrollArea.48206f05.js";
import { Q as QPage } from "./QPage.4b0a10d6.js";
import { u as useBakerReportsStore } from "./baker-report.c43048c5.js";
import { q as quasarDate } from "./date.b17495f5.js";
import { u as useQuasar } from "./use-quasar.cd221389.js";
import "./QResizeObserver.5792a751.js";
import "./QScrollObserver.247b574c.js";
import "./TouchPan.4f7a1ce1.js";
import "./touch.9135741d.js";
import "./format.76edee29.js";
import "./axios.91431b0b.js";
var BakersReportView_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-ac72306c"), n = n(), popScopeId(), n);
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
    const $q = useQuasar();
    const bakerReports = useBakerReportsStore();
    const bakersReportDialog = ref(false);
    const openBakersReportsDialog = () => {
      bakersReportDialog.value = true;
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
        await bakerReports.declineReport(props.report.id);
        $q.notify({ type: "positive", message: "Report declined successfully" });
        bakersReportDialog.value = false;
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
                        createTextVNode(" " + toDisplayString(__props.report.branch.name), 1)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_5$1, [
                      createBaseVNode("div", null, [
                        _hoisted_6$1,
                        createTextVNode(" " + toDisplayString(__props.report.user.name), 1)
                      ]),
                      createBaseVNode("div", null, [
                        _hoisted_7,
                        createTextVNode(" " + toDisplayString(__props.report.recipe.name), 1)
                      ]),
                      createBaseVNode("div", null, [
                        _hoisted_8,
                        createTextVNode(" " + toDisplayString(__props.report.status), 1)
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
                      onClick: declineReport,
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
        }, 8, ["modelValue"])
      ], 64);
    };
  }
};
var ReportView = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-ac72306c"], ["__file", "BakersReportView.vue"]]);
const _hoisted_1$1 = { class: "q-gutter-md" };
const _hoisted_2 = { class: "q-gutter-md q-ma-md" };
const _hoisted_3 = { class: "row justify-between" };
const _hoisted_4 = { class: "text-subtitle1" };
const _hoisted_5 = { class: "text-subtitle1" };
const _hoisted_6 = { class: "text-h6" };
const _sfc_main$1 = {
  __name: "BakersReportCard",
  setup(__props) {
    var _a;
    const bakerReportStore = useBakerReportsStore();
    const userData = computed(() => bakerReportStore.user);
    const branchId = ((_a = userData.value) == null ? void 0 : _a.data.branch_employee.branch_id) || "";
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
        (row) => row.recipe.name && row.recipe.name.toLowerCase().includes(filterText) || row.created_at && quasarDate.formatDate(row.created_at, "MMMM D, YYYY").toLowerCase().includes(filterText) || row.recipe.category && row.recipe.category.toLowerCase().includes(filterText)
      );
    });
    const formatDate = (dateString) => {
      return quasarDate.formatDate(dateString, "MMMM D, YYYY");
    };
    const formatTime = (timeString) => {
      return quasarDate.formatDate(timeString, "hh:mm A");
    };
    const formatUserName = (fullName) => {
      if (!fullName)
        return "";
      const parts = fullName.split(" ");
      const formattedParts = parts.map((part, index) => {
        if (index === 0 || index === parts.length - 1) {
          return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        } else {
          return part.charAt(0).toUpperCase() + ".";
        }
      });
      return formattedParts.join(" ");
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
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
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
                              createBaseVNode("div", _hoisted_6, toDisplayString(formatUserName(report.user.name)) + " - " + toDisplayString(report.recipe.name), 1),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFrZXJzUmVwb3J0UGFnZS5lMTNkNzJjOS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9zYWxlc19sYWR5L2Jha2Vyc19yZXBvcnQvY29tcG9uZW50cy9CYWtlcnNSZXBvcnRWaWV3LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9icmFuY2gvc2FsZXNfbGFkeS9iYWtlcnNfcmVwb3J0L2NvbXBvbmVudHMvQmFrZXJzUmVwb3J0Q2FyZC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8cS1idG5cbiAgICBjb2xvcj1cImFjY2VudFwiXG4gICAgaWNvbj1cInZpc2liaWxpdHlcIlxuICAgIHNpemU9XCJtZFwiXG4gICAgZmxhdFxuICAgIHJvdW5kXG4gICAgZGVuc2VcbiAgICBAY2xpY2s9XCJvcGVuQmFrZXJzUmVwb3J0c0RpYWxvZ1wiXG4gIC8+XG5cbiAgPHEtZGlhbG9nIHYtbW9kZWw9XCJiYWtlcnNSZXBvcnREaWFsb2dcIiBjbGFzcz1cInJlcG9ydC1kaWFsb2dcIj5cbiAgICA8cS1jYXJkIGNsYXNzPVwicmVwb3J0LWNhcmRcIj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJlcG9ydC1oZWFkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJlcG9ydC10aXRsZVwiPlJlcG9ydCBEZXRhaWxzPC9kaXY+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGNsYXNzPVwiY2xvc2UtYnRuXCJcbiAgICAgICAgICBjb2xvcj1cImdyZXktOFwiXG4gICAgICAgICAgZmxhdFxuICAgICAgICAgIHJvdW5kXG4gICAgICAgICAgZGVuc2VcbiAgICAgICAgICBpY29uPVwiY2xvc2VcIlxuICAgICAgICAgIEBjbGljaz1cImJha2Vyc1JlcG9ydERpYWxvZyA9IGZhbHNlXCJcbiAgICAgICAgLz5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJlcG9ydC1pbmZvXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnZvaWNlLWhlYWRlclwiPlxuICAgICAgICAgIDxkaXY+PHN0cm9uZz5EYXRlOjwvc3Ryb25nPiB7eyBmb3JtYXREYXRlKHJlcG9ydC5jcmVhdGVkX2F0KSB9fTwvZGl2PlxuICAgICAgICAgIDxkaXY+PHN0cm9uZz5CcmFuY2g6PC9zdHJvbmc+IHt7IHJlcG9ydC5icmFuY2gubmFtZSB9fTwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW52b2ljZS1ib2R5XCI+XG4gICAgICAgICAgPGRpdj48c3Ryb25nPkJha2VyOjwvc3Ryb25nPiB7eyByZXBvcnQudXNlci5uYW1lIH19PC9kaXY+XG4gICAgICAgICAgPGRpdj48c3Ryb25nPlJlY2lwZTo8L3N0cm9uZz4ge3sgcmVwb3J0LnJlY2lwZS5uYW1lIH19PC9kaXY+XG4gICAgICAgICAgPGRpdj48c3Ryb25nPlN0YXR1czo8L3N0cm9uZz4ge3sgcmVwb3J0LnN0YXR1cyB9fTwvZGl2PlxuICAgICAgICAgIDxkaXY+PHN0cm9uZz5LaWxvOjwvc3Ryb25nPiB7eyByZXBvcnQua2lsbyB9fTwvZGl2PlxuICAgICAgICAgIDxkaXY+PHN0cm9uZz5PdmVyOjwvc3Ryb25nPiB7eyByZXBvcnQub3ZlciB9fTwvZGl2PlxuICAgICAgICAgIDxkaXY+PHN0cm9uZz5TaG9ydDo8L3N0cm9uZz4ge3sgcmVwb3J0LnNob3J0IH19PC9kaXY+XG4gICAgICAgICAgPGRpdj48c3Ryb25nPkFjdHVhbCBUYXJnZXQ6PC9zdHJvbmc+IHt7IHJlcG9ydC5hY3R1YWxfdGFyZ2V0IH19PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwhLS0gQ29uZGl0aW9uYWxseSBEaXNwbGF5IEJyZWFkcyAtLT5cbiAgICAgICAgPGRpdiB2LWlmPVwiZmlsdGVyZWRCcmVhZHMubGVuZ3RoXCIgY2xhc3M9XCJpbnZvaWNlLXNlY3Rpb25cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10aXRsZVwiPkJyZWFkczwvZGl2PlxuICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIDxsaSB2LWZvcj1cImJyZWFkIGluIGZpbHRlcmVkQnJlYWRzXCIgOmtleT1cImJyZWFkLmlkXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnJlYWQtbmFtZVwiPiB7eyBicmVhZC5icmVhZC5uYW1lIH19IC08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnJlYWQtcHJvZHVjdGlvblwiXG4gICAgICAgICAgICAgICAgPnt7IGJyZWFkLmJyZWFkX3Byb2R1Y3Rpb24gfX0gcGNzPC9zcGFuXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuXG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJyZXBvcnQtYWN0aW9ucyBxLWd1dHRlci1zbVwiIGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgPHEtYnRuXG4gICAgICAgICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgICAgICAgbGFiZWw9XCJEZWNsaW5lXCJcbiAgICAgICAgICBAY2xpY2s9XCJkZWNsaW5lUmVwb3J0XCJcbiAgICAgICAgICBjbGFzcz1cImFjdGlvbi1idG5cIlxuICAgICAgICAvPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBjb2xvcj1cInBvc2l0aXZlXCJcbiAgICAgICAgICBsYWJlbD1cIkNvbmZpcm1cIlxuICAgICAgICAgIEBjbGljaz1cImNvbmZpcm1SZXBvcnRcIlxuICAgICAgICAgIGNsYXNzPVwiYWN0aW9uLWJ0blwiXG4gICAgICAgIC8+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQsIHdhdGNoIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgZGF0ZSwgdXNlUXVhc2FyIH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgdXNlQmFrZXJSZXBvcnRzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9iYWtlci1yZXBvcnRcIjtcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyh7XG4gIHJlcG9ydDoge1xuICAgIHR5cGU6IE9iamVjdCxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgfSxcbn0pO1xuXG5jb25zdCAkcSA9IHVzZVF1YXNhcigpO1xuY29uc3QgYmFrZXJSZXBvcnRzID0gdXNlQmFrZXJSZXBvcnRzU3RvcmUoKTtcbmNvbnN0IGJha2Vyc1JlcG9ydERpYWxvZyA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IG9wZW5CYWtlcnNSZXBvcnRzRGlhbG9nID0gKCkgPT4ge1xuICBiYWtlcnNSZXBvcnREaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcblxuY29uc3QgZm9ybWF0RGF0ZSA9IChkYXRlVGltZVN0cmluZykgPT4ge1xuICByZXR1cm4gZGF0ZS5mb3JtYXREYXRlKGRhdGVUaW1lU3RyaW5nLCBcIk1NTU0gRCwgWVlZWSBoaDptbSBBXCIpO1xufTtcblxuY29uc3QgZmlsdGVyZWRCcmVhZHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiBwcm9wcy5yZXBvcnQuYnJlYWRfYmFrZXJzX3JlcG9ydHMuZmlsdGVyKFxuICAgIChicmVhZCkgPT4gYnJlYWQuYnJlYWRfcHJvZHVjdGlvbiA+IDBcbiAgKTtcbn0pO1xuXG5jb25zdCBjb25maXJtUmVwb3J0ID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGNvbmZpcm1lZFJlcG9ydCA9IGF3YWl0IGJha2VyUmVwb3J0cy5jb25maXJtUmVwb3J0KHByb3BzLnJlcG9ydC5pZCk7XG4gICAgY29uc29sZS5sb2coXCJSZXBvcnQgY29uZmlybWVkOlwiLCBjb25maXJtZWRSZXBvcnQpO1xuICAgICRxLm5vdGlmeSh7IHR5cGU6IFwicG9zaXRpdmVcIiwgbWVzc2FnZTogXCJSZXBvcnQgY29uZmlybWVkIHN1Y2Nlc3NmdWxseVwiIH0pO1xuICAgIGJha2Vyc1JlcG9ydERpYWxvZy52YWx1ZSA9IGZhbHNlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgICRxLm5vdGlmeSh7IHR5cGU6IFwibmVnYXRpdmVcIiwgbWVzc2FnZTogXCJGYWlsZWQgdG8gY29uZmlybSByZXBvcnRcIiB9KTtcbiAgfVxufTtcbmNvbnN0IGRlY2xpbmVSZXBvcnQgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgYXdhaXQgYmFrZXJSZXBvcnRzLmRlY2xpbmVSZXBvcnQocHJvcHMucmVwb3J0LmlkKTtcbiAgICAkcS5ub3RpZnkoeyB0eXBlOiBcInBvc2l0aXZlXCIsIG1lc3NhZ2U6IFwiUmVwb3J0IGRlY2xpbmVkIHN1Y2Nlc3NmdWxseVwiIH0pO1xuICAgIGJha2Vyc1JlcG9ydERpYWxvZy52YWx1ZSA9IGZhbHNlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgICRxLm5vdGlmeSh7IHR5cGU6IFwibmVnYXRpdmVcIiwgbWVzc2FnZTogXCJGYWlsZWQgdG8gZGVjbGluZSByZXBvcnRcIiB9KTtcbiAgfVxufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLnJlcG9ydC1kaWFsb2cge1xuICBtYXgtd2lkdGg6IDYwMHB4O1xufVxuXG4ucmVwb3J0LWNhcmQge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgYm94LXNoYWRvdzogMHB4IDBweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuLnJlcG9ydC1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO1xuICBwYWRkaW5nOiAxcmVtO1xufVxuXG4ucmVwb3J0LXRpdGxlIHtcbiAgZm9udC1zaXplOiAxLjVyZW07XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uY2xvc2UtYnRuIHtcbiAgcGFkZGluZzogMDtcbiAgbWluLXdpZHRoOiBhdXRvO1xufVxuXG4ucmVwb3J0LWluZm8ge1xuICBwYWRkaW5nOiAxcmVtO1xufVxuXG4uaW52b2ljZS1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbi5pbnZvaWNlLWJvZHkge1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xufVxuXG4uaW52b2ljZS1zZWN0aW9uIHtcbiAgbWFyZ2luLXRvcDogMS41cmVtO1xufVxuXG4uc2VjdGlvbi10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xufVxuXG51bCB7XG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgcGFkZGluZy1sZWZ0OiAwO1xufVxuXG51bCBsaSB7XG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuXG4uYnJlYWQtbmFtZSB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcbn1cblxuLmJyZWFkLXByb2R1Y3Rpb24ge1xuICBjb2xvcjogIzU1NTtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgcGFkZGluZz5cbiAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItbWRcIj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgcm91bmRlZFxuICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgZGVuc2VcbiAgICAgICAgICBkZWJvdW5jZT1cIjMwMFwiXG4gICAgICAgICAgdi1tb2RlbD1cImZpbHRlclwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDUwMHB4OyBtYXgtd2lkdGg6IDE1MDBweDsgbWluLXdpZHRoOiAxMDBweFwiXG4gICAgICAgID5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgICAgIDxxLWljb24gdi1pZj1cIiFsb2FkaW5nU2VhcmNoSWNvblwiIG5hbWU9XCJzZWFyY2hcIiAvPlxuICAgICAgICAgICAgPHEtc3Bpbm5lciB2LWVsc2UgLz5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxxLXNjcm9sbC1hcmVhIHN0eWxlPVwiaGVpZ2h0OiA0NTBweDsgbWF4LXdpZHRoOiAxNTAwcHhcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLW1kIHEtbWEtbWRcIj5cbiAgICAgICAgICA8cS1jYXJkIHYtZm9yPVwicmVwb3J0IGluIGZpbHRlcmVkUm93c1wiIDprZXk9XCJyZXBvcnQuaWRcIj5cbiAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUxXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IGZvcm1hdERhdGUocmVwb3J0LmNyZWF0ZWRfYXQpIH19XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMVwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBmb3JtYXRUaW1lKHJlcG9ydC5jcmVhdGVkX2F0KSB9fVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5cbiAgICAgICAgICAgICAgICAgIHt7IGZvcm1hdFVzZXJOYW1lKHJlcG9ydC51c2VyLm5hbWUpIH19IC1cbiAgICAgICAgICAgICAgICAgIHt7IHJlcG9ydC5yZWNpcGUubmFtZSB9fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8cS1iYWRnZSBvdXRsaW5lZCA6Y29sb3I9XCJnZXRCYWRnZVN0YXR1c0NvbG9yKHJlcG9ydC5zdGF0dXMpXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IGNhcGl0YWxpemVGaXJzdExldHRlcihyZXBvcnQuc3RhdHVzKSB9fVxuICAgICAgICAgICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8UmVwb3J0VmlldyA6cmVwb3J0PVwicmVwb3J0XCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDwvcS1jYXJkPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1zY3JvbGwtYXJlYT5cblxuICAgICAgPHEtY2FyZCB2LWlmPVwic2hvd05vRGF0YU1lc3NhZ2UgJiYgZmlsdGVyZWRSb3dzLmxlbmd0aCA9PT0gMFwiPlxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJ0ZXh0LWg2IHRleHQtY2VudGVyXCJcbiAgICAgICAgICA+Tm8gcmVwb3J0cyBmb3VuZC48L3EtY2FyZC1zZWN0aW9uXG4gICAgICAgID5cbiAgICAgIDwvcS1jYXJkPlxuICAgIDwvZGl2PlxuICA8L3EtcGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VCYWtlclJlcG9ydHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2Jha2VyLXJlcG9ydFwiO1xuaW1wb3J0IHsgY29tcHV0ZWQsIHJlZiwgd2F0Y2gsIG9uTW91bnRlZCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IGRhdGUgYXMgcXVhc2FyRGF0ZSB9IGZyb20gXCJxdWFzYXJcIjtcbmltcG9ydCBSZXBvcnRWaWV3IGZyb20gXCIuL0Jha2Vyc1JlcG9ydFZpZXcudnVlXCI7XG5cbmNvbnN0IGJha2VyUmVwb3J0U3RvcmUgPSB1c2VCYWtlclJlcG9ydHNTdG9yZSgpO1xuY29uc3QgdXNlckRhdGEgPSBjb21wdXRlZCgoKSA9PiBiYWtlclJlcG9ydFN0b3JlLnVzZXIpO1xuY29uc3QgYnJhbmNoSWQgPSB1c2VyRGF0YS52YWx1ZT8uZGF0YS5icmFuY2hfZW1wbG95ZWUuYnJhbmNoX2lkIHx8IFwiXCI7XG5jb25zdCBmaWx0ZXIgPSByZWYoXCJcIik7XG5jb25zdCBsb2FkaW5nU2VhcmNoSWNvbiA9IHJlZihmYWxzZSk7XG5jb25zdCBzaG93Tm9EYXRhTWVzc2FnZSA9IHJlZihmYWxzZSk7XG5cbi8vIEZldGNoIHJlcG9ydHMgb24gY29tcG9uZW50IG1vdW50XG5vbk1vdW50ZWQoYXN5bmMgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhcInByb3BzLnVzZXJJRCBpbiBvbk1vdW50ZWQ6XCIsIGJyYW5jaElkKTtcbiAgaWYgKGJyYW5jaElkKSB7XG4gICAgYXdhaXQgZmV0Y2hSZXBvcnRzKGJyYW5jaElkKTtcbiAgfVxufSk7XG5cbi8vIEZldGNoIHJlcG9ydHMgZnVuY3Rpb25cbmNvbnN0IGZldGNoUmVwb3J0cyA9IGFzeW5jIChicmFuY2hJZCkgPT4ge1xuICBsb2FkaW5nU2VhcmNoSWNvbi52YWx1ZSA9IHRydWU7XG4gIGF3YWl0IGJha2VyUmVwb3J0U3RvcmUuZmV0Y2hEb3VnaFJlcG9ydHMoYnJhbmNoSWQpO1xuICBsb2FkaW5nU2VhcmNoSWNvbi52YWx1ZSA9IGZhbHNlO1xufTtcblxuLy8gV2F0Y2ggZm9yIGNoYW5nZXMgaW4gZmlsdGVyXG53YXRjaChmaWx0ZXIsIGFzeW5jIChuZXdGaWx0ZXIpID0+IHtcbiAgbG9hZGluZ1NlYXJjaEljb24udmFsdWUgPSB0cnVlO1xuICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKSk7XG4gIGxvYWRpbmdTZWFyY2hJY29uLnZhbHVlID0gZmFsc2U7XG59KTtcblxuY29uc3QgZmlsdGVyZWRSb3dzID0gY29tcHV0ZWQoKCkgPT4ge1xuICBpZiAoIWZpbHRlci52YWx1ZSkge1xuICAgIHJldHVybiBiYWtlclJlcG9ydFN0b3JlLnJlcG9ydHM7XG4gIH1cbiAgY29uc3QgZmlsdGVyVGV4dCA9IGZpbHRlci52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gYmFrZXJSZXBvcnRTdG9yZS5yZXBvcnRzLmZpbHRlcihcbiAgICAocm93KSA9PlxuICAgICAgKHJvdy5yZWNpcGUubmFtZSAmJiByb3cucmVjaXBlLm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmaWx0ZXJUZXh0KSkgfHxcbiAgICAgIChyb3cuY3JlYXRlZF9hdCAmJlxuICAgICAgICBxdWFzYXJEYXRlXG4gICAgICAgICAgLmZvcm1hdERhdGUocm93LmNyZWF0ZWRfYXQsIFwiTU1NTSBELCBZWVlZXCIpXG4gICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAuaW5jbHVkZXMoZmlsdGVyVGV4dCkpIHx8XG4gICAgICAocm93LnJlY2lwZS5jYXRlZ29yeSAmJlxuICAgICAgICByb3cucmVjaXBlLmNhdGVnb3J5LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyVGV4dCkpXG4gICk7XG59KTtcblxuY29uc3QgZm9ybWF0RGF0ZSA9IChkYXRlU3RyaW5nKSA9PiB7XG4gIHJldHVybiBxdWFzYXJEYXRlLmZvcm1hdERhdGUoZGF0ZVN0cmluZywgXCJNTU1NIEQsIFlZWVlcIik7XG59O1xuY29uc3QgZm9ybWF0VGltZSA9ICh0aW1lU3RyaW5nKSA9PiB7XG4gIHJldHVybiBxdWFzYXJEYXRlLmZvcm1hdERhdGUodGltZVN0cmluZywgXCJoaDptbSBBXCIpO1xufTtcblxuY29uc3QgZm9ybWF0VXNlck5hbWUgPSAoZnVsbE5hbWUpID0+IHtcbiAgaWYgKCFmdWxsTmFtZSkgcmV0dXJuIFwiXCI7XG5cbiAgLy8gU3BsaXQgdGhlIGZ1bGwgbmFtZSBpbnRvIHBhcnRzXG4gIGNvbnN0IHBhcnRzID0gZnVsbE5hbWUuc3BsaXQoXCIgXCIpO1xuXG4gIC8vIENhcGl0YWxpemUgZWFjaCBwYXJ0IGFuZCBoYW5kbGUgbWlkZGxlIGluaXRpYWxcbiAgY29uc3QgZm9ybWF0dGVkUGFydHMgPSBwYXJ0cy5tYXAoKHBhcnQsIGluZGV4KSA9PiB7XG4gICAgaWYgKGluZGV4ID09PSAwIHx8IGluZGV4ID09PSBwYXJ0cy5sZW5ndGggLSAxKSB7XG4gICAgICByZXR1cm4gcGFydC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHBhcnQuc2xpY2UoMSkudG9Mb3dlckNhc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHBhcnQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBcIi5cIjtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBmb3JtYXR0ZWRQYXJ0cy5qb2luKFwiIFwiKTtcbn07XG5cbmNvbnN0IHZpZXdSZXBvcnQgPSAocmVwb3J0KSA9PiB7XG4gIC8vIE5hdmlnYXRlIHRvIHRoZSBkZXRhaWxlZCB2aWV3IG9mIHRoZSByZXBvcnQgb3IgaGFuZGxlIGFzIG5lZWRlZFxuICBjb25zb2xlLmxvZyhcIlZpZXdpbmcgcmVwb3J0OlwiLCByZXBvcnQpO1xufTtcblxuY29uc3QgZ2V0QmFkZ2VTdGF0dXNDb2xvciA9IChzdGF0dXMpID0+IHtcbiAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICBjYXNlIFwicGVuZGluZ1wiOlxuICAgICAgcmV0dXJuIFwib3JhbmdlXCI7XG4gICAgY2FzZSBcImRlY2xpbmVkXCI6XG4gICAgICByZXR1cm4gXCJuZWdhdGl2ZVwiO1xuICAgIGNhc2UgXCJjb25maXJtZWRcIjpcbiAgICAgIHJldHVybiBcImdyZWVuXCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcImdyZXlcIjtcbiAgfVxufTtcbmNvbnN0IGNhcGl0YWxpemVGaXJzdExldHRlciA9IChzdHJpbmcpID0+IHtcbiAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKS50b0xvd2VyQ2FzZSgpO1xufTtcbjwvc2NyaXB0PlxuIl0sIm5hbWVzIjpbImRhdGUiLCJicmFuY2hJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStFQSxVQUFNLFFBQVE7QUFPZCxVQUFNLEtBQUssVUFBUztBQUNwQixVQUFNLGVBQWUscUJBQW9CO0FBQ3pDLFVBQU0scUJBQXFCLElBQUksS0FBSztBQUVwQyxVQUFNLDBCQUEwQixNQUFNO0FBQ3BDLHlCQUFtQixRQUFRO0FBQUEsSUFDN0I7QUFFQSxVQUFNLGFBQWEsQ0FBQyxtQkFBbUI7QUFDckMsYUFBT0EsV0FBSyxXQUFXLGdCQUFnQixzQkFBc0I7QUFBQSxJQUMvRDtBQUVBLFVBQU0saUJBQWlCLFNBQVMsTUFBTTtBQUNwQyxhQUFPLE1BQU0sT0FBTyxxQkFBcUI7QUFBQSxRQUN2QyxDQUFDLFVBQVUsTUFBTSxtQkFBbUI7QUFBQSxNQUN4QztBQUFBLElBQ0EsQ0FBQztBQUVELFVBQU0sZ0JBQWdCLFlBQVk7QUFDaEMsVUFBSTtBQUNGLGNBQU0sa0JBQWtCLE1BQU0sYUFBYSxjQUFjLE1BQU0sT0FBTyxFQUFFO0FBQ3hFLGdCQUFRLElBQUkscUJBQXFCLGVBQWU7QUFDaEQsV0FBRyxPQUFPLEVBQUUsTUFBTSxZQUFZLFNBQVMsZ0NBQStCLENBQUU7QUFDeEUsMkJBQW1CLFFBQVE7QUFBQSxNQUM1QixTQUFRLE9BQVA7QUFDQSxXQUFHLE9BQU8sRUFBRSxNQUFNLFlBQVksU0FBUywyQkFBMEIsQ0FBRTtBQUFBLE1BQ3BFO0FBQUEsSUFDSDtBQUNBLFVBQU0sZ0JBQWdCLFlBQVk7QUFDaEMsVUFBSTtBQUNGLGNBQU0sYUFBYSxjQUFjLE1BQU0sT0FBTyxFQUFFO0FBQ2hELFdBQUcsT0FBTyxFQUFFLE1BQU0sWUFBWSxTQUFTLCtCQUE4QixDQUFFO0FBQ3ZFLDJCQUFtQixRQUFRO0FBQUEsTUFDNUIsU0FBUSxPQUFQO0FBQ0EsV0FBRyxPQUFPLEVBQUUsTUFBTSxZQUFZLFNBQVMsMkJBQTBCLENBQUU7QUFBQSxNQUNwRTtBQUFBLElBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekRBLFVBQU0sbUJBQW1CLHFCQUFvQjtBQUM3QyxVQUFNLFdBQVcsU0FBUyxNQUFNLGlCQUFpQixJQUFJO0FBQ3JELFVBQU0sYUFBVyxjQUFTLFVBQVQsbUJBQWdCLEtBQUssZ0JBQWdCLGNBQWE7QUFDbkUsVUFBTSxTQUFTLElBQUksRUFBRTtBQUNyQixVQUFNLG9CQUFvQixJQUFJLEtBQUs7QUFDbkMsVUFBTSxvQkFBb0IsSUFBSSxLQUFLO0FBR25DLGNBQVUsWUFBWTtBQUNwQixjQUFRLElBQUksOEJBQThCLFFBQVE7QUFDbEQsVUFBSSxVQUFVO0FBQ1osY0FBTSxhQUFhLFFBQVE7QUFBQSxNQUM1QjtBQUFBLElBQ0gsQ0FBQztBQUdELFVBQU0sZUFBZSxPQUFPQyxjQUFhO0FBQ3ZDLHdCQUFrQixRQUFRO0FBQzFCLFlBQU0saUJBQWlCLGtCQUFrQkEsU0FBUTtBQUNqRCx3QkFBa0IsUUFBUTtBQUFBLElBQzVCO0FBR0EsVUFBTSxRQUFRLE9BQU8sY0FBYztBQUNqQyx3QkFBa0IsUUFBUTtBQUMxQixZQUFNLElBQUksUUFBUSxDQUFDLFlBQVksV0FBVyxTQUFTLEdBQUksQ0FBQztBQUN4RCx3QkFBa0IsUUFBUTtBQUFBLElBQzVCLENBQUM7QUFFRCxVQUFNLGVBQWUsU0FBUyxNQUFNO0FBQ2xDLFVBQUksQ0FBQyxPQUFPLE9BQU87QUFDakIsZUFBTyxpQkFBaUI7QUFBQSxNQUN6QjtBQUNELFlBQU0sYUFBYSxPQUFPLE1BQU0sWUFBVztBQUMzQyxhQUFPLGlCQUFpQixRQUFRO0FBQUEsUUFDOUIsQ0FBQyxRQUNFLElBQUksT0FBTyxRQUFRLElBQUksT0FBTyxLQUFLLFlBQVcsRUFBRyxTQUFTLFVBQVUsS0FDcEUsSUFBSSxjQUNILFdBQ0csV0FBVyxJQUFJLFlBQVksY0FBYyxFQUN6QyxZQUFhLEVBQ2IsU0FBUyxVQUFVLEtBQ3ZCLElBQUksT0FBTyxZQUNWLElBQUksT0FBTyxTQUFTLFlBQVcsRUFBRyxTQUFTLFVBQVU7QUFBQSxNQUM3RDtBQUFBLElBQ0EsQ0FBQztBQUVELFVBQU0sYUFBYSxDQUFDLGVBQWU7QUFDakMsYUFBTyxXQUFXLFdBQVcsWUFBWSxjQUFjO0FBQUEsSUFDekQ7QUFDQSxVQUFNLGFBQWEsQ0FBQyxlQUFlO0FBQ2pDLGFBQU8sV0FBVyxXQUFXLFlBQVksU0FBUztBQUFBLElBQ3BEO0FBRUEsVUFBTSxpQkFBaUIsQ0FBQyxhQUFhO0FBQ25DLFVBQUksQ0FBQztBQUFVLGVBQU87QUFHdEIsWUFBTSxRQUFRLFNBQVMsTUFBTSxHQUFHO0FBR2hDLFlBQU0saUJBQWlCLE1BQU0sSUFBSSxDQUFDLE1BQU0sVUFBVTtBQUNoRCxZQUFJLFVBQVUsS0FBSyxVQUFVLE1BQU0sU0FBUyxHQUFHO0FBQzdDLGlCQUFPLEtBQUssT0FBTyxDQUFDLEVBQUUsWUFBVyxJQUFLLEtBQUssTUFBTSxDQUFDLEVBQUU7UUFDMUQsT0FBVztBQUNMLGlCQUFPLEtBQUssT0FBTyxDQUFDLEVBQUUsWUFBVyxJQUFLO0FBQUEsUUFDdkM7QUFBQSxNQUNMLENBQUc7QUFFRCxhQUFPLGVBQWUsS0FBSyxHQUFHO0FBQUEsSUFDaEM7QUFPQSxVQUFNLHNCQUFzQixDQUFDLFdBQVc7QUFDdEMsY0FBUTtBQUFBLGFBQ0Q7QUFDSCxpQkFBTztBQUFBLGFBQ0o7QUFDSCxpQkFBTztBQUFBLGFBQ0o7QUFDSCxpQkFBTztBQUFBO0FBRVAsaUJBQU87QUFBQTtBQUFBLElBRWI7QUFDQSxVQUFNLHdCQUF3QixDQUFDLFdBQVc7QUFDeEMsYUFBTyxPQUFPLE9BQU8sQ0FBQyxFQUFFLFlBQVcsSUFBSyxPQUFPLE1BQU0sQ0FBQyxFQUFFO0lBQzFEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
