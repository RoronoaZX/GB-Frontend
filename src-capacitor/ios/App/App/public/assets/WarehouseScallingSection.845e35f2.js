import { _ as _export_sfc, n as ref, t as reactive, o as openBlock, a4 as createElementBlock, a as createVNode, w as withCtx, O as createTextVNode, M as QBtn, Q as QCard, I as QCardSection, J as createBaseVNode, L as QIcon, af as withDirectives, K as QInput, a2 as QSeparator, aK as QCardActions, a3 as QDialog, a5 as Fragment, S as pushScopeId, T as popScopeId, a6 as renderList, R as toDisplayString, u as watch, c as createBlock } from "./index.c8e2405b.js";
import { Q as QTd } from "./QTd.f597934c.js";
import { Q as QTable } from "./QTable.d3fb87f5.js";
import { Q as QTooltip } from "./QTooltip.4a3eef22.js";
import { Q as QSelect } from "./QSelect.0985e28e.js";
import { C as ClosePopup } from "./ClosePopup.649d85d8.js";
import "./QVirtualScroll.41a98cb7.js";
import "./QList.d5d13fac.js";
import "./use-virtual-scroll.5b4ab88d.js";
import "./rtl.b1b38f21.js";
import "./QMenu.4f670399.js";
import "./selection.94057980.js";
import "./QItem.76557ad9.js";
var WarehouseScallingTableAction_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-e6db631e"), n = n(), popScopeId(), n);
const _hoisted_1$3 = { class: "text-h6 text-white" };
const _hoisted_2$2 = { class: "text-white" };
const _hoisted_3$1 = { class: "text-h6" };
const _hoisted_4$1 = { class: "row q-gutter-x-sm" };
const _hoisted_5$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-my-sm" }, "Recipe Name", -1));
const _hoisted_6$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-my-sm" }, "Amount", -1));
const _hoisted_7 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-my-sm" }, "Unit", -1));
const _hoisted_8 = { class: "q-mt-sm" };
const _sfc_main$3 = {
  __name: "WarehouseScallingTableAction",
  setup(__props) {
    const brancheScallingDialog = ref();
    const ingredientsUnitOptions = ["Grams", "kgs", "Pcs"];
    const open_branch_scalling_dialog = () => {
      brancheScallingDialog.value = true;
    };
    const addScaleForm = reactive({
      breadGroupName: "",
      breadGroupAmount: "",
      unit: ""
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          color: "accent",
          icon: "scale",
          size: "md",
          flat: "",
          round: "",
          dense: "",
          onClick: open_branch_scalling_dialog
        }, {
          default: withCtx(() => [
            createVNode(QTooltip, {
              class: "bg-accent",
              delay: 200
            }, {
              default: withCtx(() => [
                createTextVNode("Scale")
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(QDialog, {
          modelValue: brancheScallingDialog.value,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => brancheScallingDialog.value = $event)
        }, {
          default: withCtx(() => [
            createVNode(QCard, { class: "my-card" }, {
              default: withCtx(() => [
                createVNode(QCardSection, {
                  class: "row justify-between",
                  style: { "background-color": "#ef4444" }
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_1$3, [
                      createVNode(QIcon, { name: "fa-solid fa-store" }),
                      createTextVNode(" Branch 1 ")
                    ]),
                    createBaseVNode("div", _hoisted_2$2, [
                      withDirectives(createVNode(QBtn, {
                        flat: "",
                        round: "",
                        dense: "",
                        icon: "close"
                      }, null, 512), [
                        [ClosePopup]
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_3$1, [
                      createTextVNode(" Scalling "),
                      createVNode(QIcon, { name: "scale" })
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_4$1, [
                      createBaseVNode("div", null, [
                        _hoisted_5$1,
                        createVNode(QInput, {
                          modelValue: addScaleForm.breadGroupName,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => addScaleForm.breadGroupName = $event),
                          placeholder: "Search...",
                          outlined: "",
                          dense: "",
                          style: { "width": "320px", "max-width": "350px", "min-width": "20px" }
                        }, {
                          append: withCtx(() => [
                            createBaseVNode("div", null, [
                              createVNode(QIcon, { name: "search" })
                            ])
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ]),
                      createBaseVNode("div", null, [
                        _hoisted_6$1,
                        createVNode(QInput, {
                          modelValue: addScaleForm.ingredientAmount,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => addScaleForm.ingredientAmount = $event),
                          type: "number",
                          outlined: "",
                          dense: "",
                          style: { "width": "80px", "max-width": "150px", "min-width": "none" }
                        }, null, 8, ["modelValue"])
                      ]),
                      createBaseVNode("div", null, [
                        _hoisted_7,
                        createVNode(QSelect, {
                          modelValue: addScaleForm.unit,
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => addScaleForm.unit = $event),
                          options: ingredientsUnitOptions,
                          outlined: "",
                          dense: "",
                          style: { "width": "90px", "max-width": "100px", "min-width": "none" }
                        }, null, 8, ["modelValue"])
                      ]),
                      createBaseVNode("div", _hoisted_8, [
                        createVNode(QBtn, {
                          size: "sm",
                          outline: "",
                          dense: "",
                          icon: "add",
                          color: "purple"
                        })
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QSeparator),
                createVNode(QCardActions, {
                  class: "row q-ma-md",
                  align: "right"
                }, {
                  default: withCtx(() => [
                    withDirectives(createVNode(QBtn, {
                      class: "glossy",
                      color: "grey-9",
                      label: "Cancel"
                    }, null, 512), [
                      [ClosePopup]
                    ]),
                    createVNode(QBtn, {
                      class: "glossy",
                      color: "teal",
                      label: "Create"
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
var WarehouseScallingTableAction = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-e6db631e"], ["__file", "WarehouseScallingTableAction.vue"]]);
var WarehouseScallinGTableRawMaterialsStatus_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-377fcbf2"), n = n(), popScopeId(), n);
const _hoisted_1$2 = { class: "text-h6 text-white" };
const _hoisted_2$1 = { class: "text-white" };
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6 q-ml-lg" }, "Raw Materials Status", -1));
const _hoisted_4 = { class: "q-pa-lg card-grid" };
const _hoisted_5 = { class: "row justify-between" };
const _hoisted_6 = { class: "text-h6" };
const _sfc_main$2 = {
  __name: "WarehouseScallinGTableRawMaterialsStatus",
  setup(__props) {
    const brancheStatusDialog = ref();
    const open_branch_status_dialog = () => {
      brancheStatusDialog.value = true;
    };
    ref("");
    const cards = [
      {
        id: 1,
        title: "Bread Group 1",
        description: "20kg"
      },
      {
        id: 2,
        title: "Bread Group 2",
        description: "40kg"
      },
      {
        id: 3,
        title: "Bread Group 3",
        description: "50kg"
      },
      {
        id: 4,
        title: "Bread Group 4",
        description: "10kg"
      },
      {
        id: 5,
        title: "Bread Group 5",
        description: "30kg"
      },
      {
        id: 6,
        title: "Bread Group 6",
        description: "70kg"
      },
      {
        id: 7,
        title: "Bread Group 7",
        description: "30kg"
      },
      {
        id: 8,
        title: "Bread Group 8 ",
        description: "70kg"
      },
      {
        id: 9,
        title: "Bread Group 9",
        description: "30kg"
      },
      {
        id: 10,
        title: "Bread Group 10 ",
        description: "70kg"
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          color: "info",
          icon: "visibility",
          size: "md",
          flat: "",
          round: "",
          dense: "",
          onClick: open_branch_status_dialog
        }, {
          default: withCtx(() => [
            createVNode(QTooltip, {
              class: "bg-info",
              delay: 200
            }, {
              default: withCtx(() => [
                createTextVNode("View")
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(QDialog, {
          modelValue: brancheStatusDialog.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => brancheStatusDialog.value = $event),
          "full-width": ""
        }, {
          default: withCtx(() => [
            createVNode(QCard, { class: "my-card" }, {
              default: withCtx(() => [
                createVNode(QCardSection, {
                  class: "row justify-between",
                  style: { "background-color": "#ef4444" }
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_1$2, [
                      createVNode(QIcon, { name: "fa-solid fa-store" }),
                      createTextVNode(" Branch 1 ")
                    ]),
                    createBaseVNode("div", _hoisted_2$1, [
                      withDirectives(createVNode(QBtn, {
                        flat: "",
                        round: "",
                        dense: "",
                        icon: "close"
                      }, null, 512), [
                        [ClosePopup]
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    _hoisted_3,
                    createBaseVNode("div", _hoisted_4, [
                      (openBlock(), createElementBlock(Fragment, null, renderList(cards, (card) => {
                        return createVNode(QCard, {
                          bordered: "",
                          dense: "",
                          key: card.id,
                          class: "card"
                        }, {
                          default: withCtx(() => [
                            createVNode(QCardSection, null, {
                              default: withCtx(() => [
                                createBaseVNode("div", null, toDisplayString(card.title), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(QSeparator),
                            createVNode(QCardSection, null, {
                              default: withCtx(() => [
                                createBaseVNode("div", _hoisted_5, [
                                  createBaseVNode("div", _hoisted_6, [
                                    createBaseVNode("strong", null, toDisplayString(card.description), 1)
                                  ])
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024);
                      }), 64))
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
var WarehouseScallingTableBreadStatus = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-377fcbf2"], ["__file", "WarehouseScallinGTableRawMaterialsStatus.vue"]]);
const _hoisted_1$1 = { class: "row justify-center q-gutter-x-md" };
const _hoisted_2 = { class: "row justify-center q-gutter-x-md" };
const _sfc_main$1 = {
  __name: "WarehouseScallingTable",
  setup(__props) {
    const filter = ref("");
    const loadingSearchIcon = ref(false);
    watch(filter, () => {
      loadingSearchIcon.value = true;
      setTimeout(() => {
        loadingSearchIcon.value = false;
      });
    });
    const transactionHistoryColumns = [
      {
        name: "name",
        label: "Branch Name",
        align: "center",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true
      },
      {
        name: "rawMaterialsStatus",
        label: "Raw Materials Status",
        align: "center",
        field: "rawMaterialsStatus",
        sortable: true
      },
      {
        name: "action",
        label: "Action",
        align: "center",
        sortable: true
      }
    ];
    const transactionHistoryRow = [
      {
        name: "Branch 1"
      },
      {
        name: "Branch 2"
      },
      {
        name: "Branch 3"
      },
      {
        name: "Branch 4"
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
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
              })) : (openBlock(), createBlock(QIcon, {
                key: 1,
                thickness: 2,
                color: "teal",
                size: "1em"
              }))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        createBaseVNode("div", null, [
          createVNode(QTable, {
            filter: filter.value,
            flat: "",
            columns: transactionHistoryColumns,
            rows: transactionHistoryRow,
            "row-key": "name"
          }, {
            "body-cell-rawMaterialsStatus": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_1$1, [
                    createVNode(WarehouseScallingTableBreadStatus)
                  ])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-action": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_2, [
                    createVNode(WarehouseScallingTableAction)
                  ])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            _: 1
          }, 8, ["filter"])
        ])
      ], 64);
    };
  }
};
var WarehouseScallingTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "WarehouseScallingTable.vue"]]);
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Scalling Section", -1);
const _sfc_main = {
  __name: "WarehouseScallingSection",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QCard, { flat: "" }, {
        default: withCtx(() => [
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              _hoisted_1
            ]),
            _: 1
          }),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", null, [
                createVNode(WarehouseScallingTable)
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
var WarehouseScallingSection = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "WarehouseScallingSection.vue"]]);
export { WarehouseScallingSection as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FyZWhvdXNlU2NhbGxpbmdTZWN0aW9uLjg0NWUzNWYyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvd2FyZWhvdXNlL3NjYWxsaW5nX3NlY3Rpb24vY29tcG9uZW50cy9XYXJlaG91c2VTY2FsbGluZ1RhYmxlQWN0aW9uLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy93YXJlaG91c2Uvc2NhbGxpbmdfc2VjdGlvbi9jb21wb25lbnRzL1dhcmVob3VzZVNjYWxsaW5HVGFibGVSYXdNYXRlcmlhbHNTdGF0dXMudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL3dhcmVob3VzZS9zY2FsbGluZ19zZWN0aW9uL2NvbXBvbmVudHMvV2FyZWhvdXNlU2NhbGxpbmdUYWJsZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8cS1idG5cbiAgICBjb2xvcj1cImFjY2VudFwiXG4gICAgaWNvbj1cInNjYWxlXCJcbiAgICBzaXplPVwibWRcIlxuICAgIGZsYXRcbiAgICByb3VuZFxuICAgIGRlbnNlXG4gICAgQGNsaWNrPVwib3Blbl9icmFuY2hfc2NhbGxpbmdfZGlhbG9nXCJcbiAgPlxuICAgIDxxLXRvb2x0aXAgY2xhc3M9XCJiZy1hY2NlbnRcIiA6ZGVsYXk9XCIyMDBcIj5TY2FsZTwvcS10b29sdGlwPlxuICA8L3EtYnRuPlxuICA8cS1kaWFsb2cgdi1tb2RlbD1cImJyYW5jaGVTY2FsbGluZ0RpYWxvZ1wiPlxuICAgIDwhLS0gc3R5bGU9XCJ3aWR0aDogMTAwMHB4OyBtYXgtd2lkdGg6IDkwdnc7XCIgLS0+XG4gICAgPHEtY2FyZCBjbGFzcz1cIm15LWNhcmRcIj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvblxuICAgICAgICBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW5cIlxuICAgICAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNlZjQ0NDRcIlxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNiB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgPHEtaWNvbiBuYW1lPVwiZmEtc29saWQgZmEtc3RvcmVcIiAvPlxuICAgICAgICAgIEJyYW5jaCAxXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC13aGl0ZVwiPlxuICAgICAgICAgIDxxLWJ0biBmbGF0IHJvdW5kIGRlbnNlIGljb249XCJjbG9zZVwiIHYtY2xvc2UtcG9wdXAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPlxuICAgICAgICAgIFNjYWxsaW5nXG4gICAgICAgICAgPHEtaWNvbiBuYW1lPVwic2NhbGVcIiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXIteC1zbVwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1teS1zbVwiPlJlY2lwZSBOYW1lPC9kaXY+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICB2LW1vZGVsPVwiYWRkU2NhbGVGb3JtLmJyZWFkR3JvdXBOYW1lXCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2guLi5cIlxuICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAzMjBweDsgbWF4LXdpZHRoOiAzNTBweDsgbWluLXdpZHRoOiAyMHB4XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW15LXNtXCI+QW1vdW50PC9kaXY+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICB2LW1vZGVsPVwiYWRkU2NhbGVGb3JtLmluZ3JlZGllbnRBbW91bnRcIlxuICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogODBweDsgbWF4LXdpZHRoOiAxNTBweDsgbWluLXdpZHRoOiBub25lXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW15LXNtXCI+VW5pdDwvZGl2PlxuICAgICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJhZGRTY2FsZUZvcm0udW5pdFwiXG4gICAgICAgICAgICAgIDpvcHRpb25zPVwiaW5ncmVkaWVudHNVbml0T3B0aW9uc1wiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDkwcHg7IG1heC13aWR0aDogMTAwcHg7IG1pbi13aWR0aDogbm9uZVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LXNtXCI+XG4gICAgICAgICAgICA8cS1idG4gc2l6ZT1cInNtXCIgb3V0bGluZSBkZW5zZSBpY29uPVwiYWRkXCIgY29sb3I9XCJwdXJwbGVcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1zZXBhcmF0b3IgLz5cbiAgICAgIDxxLWNhcmQtYWN0aW9ucyBjbGFzcz1cInJvdyBxLW1hLW1kXCIgYWxpZ249XCJyaWdodFwiPlxuICAgICAgICA8cS1idG4gY2xhc3M9XCJnbG9zc3lcIiBjb2xvcj1cImdyZXktOVwiIGxhYmVsPVwiQ2FuY2VsXCIgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgICA8cS1idG4gY2xhc3M9XCJnbG9zc3lcIiBjb2xvcj1cInRlYWxcIiBsYWJlbD1cIkNyZWF0ZVwiIC8+XG4gICAgICA8L3EtY2FyZC1hY3Rpb25zPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYsIHJlYWN0aXZlIH0gZnJvbSBcInZ1ZVwiO1xuXG5jb25zdCBicmFuY2hlU2NhbGxpbmdEaWFsb2cgPSByZWYoKTtcbmNvbnN0IGluZ3JlZGllbnRzVW5pdE9wdGlvbnMgPSBbXCJHcmFtc1wiLCBcImtnc1wiLCBcIlBjc1wiXTtcbmNvbnN0IG9wZW5fYnJhbmNoX3NjYWxsaW5nX2RpYWxvZyA9ICgpID0+IHtcbiAgYnJhbmNoZVNjYWxsaW5nRGlhbG9nLnZhbHVlID0gdHJ1ZTtcbn07XG5jb25zdCBhZGRTY2FsZUZvcm0gPSByZWFjdGl2ZSh7XG4gIGJyZWFkR3JvdXBOYW1lOiBcIlwiLFxuICBicmVhZEdyb3VwQW1vdW50OiBcIlwiLFxuICB1bml0OiBcIlwiLFxufSk7XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5jYXJkLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpbGwsIG1pbm1heCgzMDBweCwgMWZyKSk7XG4gIGdhcDogMjBweDtcbn1cblxuLmNhcmQge1xuICBtYXgtd2lkdGg6IDEwMCU7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1idG5cbiAgICBjb2xvcj1cImluZm9cIlxuICAgIGljb249XCJ2aXNpYmlsaXR5XCJcbiAgICBzaXplPVwibWRcIlxuICAgIGZsYXRcbiAgICByb3VuZFxuICAgIGRlbnNlXG4gICAgQGNsaWNrPVwib3Blbl9icmFuY2hfc3RhdHVzX2RpYWxvZ1wiXG4gID5cbiAgICA8cS10b29sdGlwIGNsYXNzPVwiYmctaW5mb1wiIDpkZWxheT1cIjIwMFwiPlZpZXc8L3EtdG9vbHRpcD5cbiAgPC9xLWJ0bj5cbiAgPHEtZGlhbG9nIHYtbW9kZWw9XCJicmFuY2hlU3RhdHVzRGlhbG9nXCIgZnVsbC13aWR0aD5cbiAgICA8IS0tIHN0eWxlPVwid2lkdGg6IDEwMDBweDsgbWF4LXdpZHRoOiA5MHZ3O1wiIC0tPlxuICAgIDxxLWNhcmQgY2xhc3M9XCJteS1jYXJkXCI+XG4gICAgICA8cS1jYXJkLXNlY3Rpb25cbiAgICAgICAgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCJcbiAgICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjZWY0NDQ0XCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDYgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgIDxxLWljb24gbmFtZT1cImZhLXNvbGlkIGZhLXN0b3JlXCIgLz5cbiAgICAgICAgICBCcmFuY2ggMVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2hpdGVcIj5cbiAgICAgICAgICA8cS1idG4gZmxhdCByb3VuZCBkZW5zZSBpY29uPVwiY2xvc2VcIiB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDYgcS1tbC1sZ1wiPlJhdyBNYXRlcmlhbHMgU3RhdHVzPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLXBhLWxnIGNhcmQtZ3JpZFwiPlxuICAgICAgICAgIDxxLWNhcmRcbiAgICAgICAgICAgIGJvcmRlcmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgdi1mb3I9XCJjYXJkIGluIGNhcmRzXCJcbiAgICAgICAgICAgIDprZXk9XCJjYXJkLmlkXCJcbiAgICAgICAgICAgIGNsYXNzPVwiY2FyZFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgICA8ZGl2Pnt7IGNhcmQudGl0bGUgfX08L2Rpdj5cbiAgICAgICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgICA8cS1zZXBhcmF0b3IgLz5cbiAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPlxuICAgICAgICAgICAgICAgICAgPHN0cm9uZz57eyBjYXJkLmRlc2NyaXB0aW9uIH19PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IGJyYW5jaGVTdGF0dXNEaWFsb2cgPSByZWYoKTtcblxuY29uc3Qgb3Blbl9icmFuY2hfc3RhdHVzX2RpYWxvZyA9ICgpID0+IHtcbiAgYnJhbmNoZVN0YXR1c0RpYWxvZy52YWx1ZSA9IHRydWU7XG59O1xuXG5jb25zdCBzZWFyY2hUZXJtID0gcmVmKFwiXCIpO1xuXG4vLyBjb25zdCBmaWx0ZXJDYXJkcyA9IGNvbXB1dGVkKCgpID0+IHtcbi8vICAgICByZXR1cm4gY2FyZHMuZmlsdGVyKGNhcmQgPT57XG4vLyAgICAgICAgIHJldHVybiBjYXJkLnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybS52YWx1ZS50b0xvd2VyQ2FzZSgpKSB8fCBjYXJkLmRlc2NyaXB0aW9uLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybS52YWx1ZS50b0xvd2VyQ2FzZSlcbi8vICAgICB9KVxuLy8gfSlcblxuY29uc3QgY2FyZHMgPSBbXG4gIHtcbiAgICBpZDogMSxcbiAgICB0aXRsZTogXCJCcmVhZCBHcm91cCAxXCIsXG4gICAgZGVzY3JpcHRpb246IFwiMjBrZ1wiLFxuICB9LFxuICB7XG4gICAgaWQ6IDIsXG4gICAgdGl0bGU6IFwiQnJlYWQgR3JvdXAgMlwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIjQwa2dcIixcbiAgfSxcbiAge1xuICAgIGlkOiAzLFxuICAgIHRpdGxlOiBcIkJyZWFkIEdyb3VwIDNcIixcbiAgICBkZXNjcmlwdGlvbjogXCI1MGtnXCIsXG4gIH0sXG4gIHtcbiAgICBpZDogNCxcbiAgICB0aXRsZTogXCJCcmVhZCBHcm91cCA0XCIsXG4gICAgZGVzY3JpcHRpb246IFwiMTBrZ1wiLFxuICB9LFxuICB7XG4gICAgaWQ6IDUsXG4gICAgdGl0bGU6IFwiQnJlYWQgR3JvdXAgNVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIjMwa2dcIixcbiAgfSxcbiAge1xuICAgIGlkOiA2LFxuICAgIHRpdGxlOiBcIkJyZWFkIEdyb3VwIDZcIixcbiAgICBkZXNjcmlwdGlvbjogXCI3MGtnXCIsXG4gIH0sXG4gIHtcbiAgICBpZDogNyxcbiAgICB0aXRsZTogXCJCcmVhZCBHcm91cCA3XCIsXG4gICAgZGVzY3JpcHRpb246IFwiMzBrZ1wiLFxuICB9LFxuICB7XG4gICAgaWQ6IDgsXG4gICAgdGl0bGU6IFwiQnJlYWQgR3JvdXAgOCBcIixcbiAgICBkZXNjcmlwdGlvbjogXCI3MGtnXCIsXG4gIH0sXG4gIHtcbiAgICBpZDogOSxcbiAgICB0aXRsZTogXCJCcmVhZCBHcm91cCA5XCIsXG4gICAgZGVzY3JpcHRpb246IFwiMzBrZ1wiLFxuICB9LFxuICB7XG4gICAgaWQ6IDEwLFxuICAgIHRpdGxlOiBcIkJyZWFkIEdyb3VwIDEwIFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIjcwa2dcIixcbiAgfSxcbl07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5jYXJkLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpbGwsIG1pbm1heCgzMDBweCwgMWZyKSk7XG4gIGdhcDogMjBweDtcbn1cblxuLmNhcmQge1xuICBtYXgtd2lkdGg6IDEwMCU7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxxLWlucHV0XG4gICAgICByb3VuZGVkXG4gICAgICBvdXRsaW5lZFxuICAgICAgZGVuc2VcbiAgICAgIGRlYm91bmNlPVwiMzAwXCJcbiAgICAgIHYtbW9kZWw9XCJmaWx0ZXJcIlxuICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgc3R5bGU9XCJ3aWR0aDogNTAwcHg7IG1heC13aWR0aDogMTUwMHB4OyBtaW4td2lkdGg6IDEwMHB4XCJcbiAgICA+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgPHEtaWNvbiB2LWlmPVwiIWxvYWRpbmdTZWFyY2hJY29uXCIgbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICAgIDxxLWljb24gdi1lbHNlIDp0aGlja25lc3M9XCIyXCIgY29sb3I9XCJ0ZWFsXCIgc2l6ZT1cIjFlbVwiIC8+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS1pbnB1dD5cbiAgPC9kaXY+XG4gIDxkaXY+XG4gICAgPHEtdGFibGVcbiAgICAgIDpmaWx0ZXI9XCJmaWx0ZXJcIlxuICAgICAgZmxhdFxuICAgICAgOmNvbHVtbnM9XCJ0cmFuc2FjdGlvbkhpc3RvcnlDb2x1bW5zXCJcbiAgICAgIDpyb3dzPVwidHJhbnNhY3Rpb25IaXN0b3J5Um93XCJcbiAgICAgIHJvdy1rZXk9XCJuYW1lXCJcbiAgICA+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC1yYXdNYXRlcmlhbHNTdGF0dXM9XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1jZW50ZXIgcS1ndXR0ZXIteC1tZFwiPlxuICAgICAgICAgICAgPFdhcmVob3VzZVNjYWxsaW5nVGFibGVCcmVhZFN0YXR1cyAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtYWN0aW9uPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktY2VudGVyIHEtZ3V0dGVyLXgtbWRcIj5cbiAgICAgICAgICAgIDxXYXJlaG91c2VTY2FsbGluZ1RhYmxlQWN0aW9uIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9xLXRhYmxlPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgV2FyZWhvdXNlU2NhbGxpbmdUYWJsZUFjdGlvbiBmcm9tIFwiLi9XYXJlaG91c2VTY2FsbGluZ1RhYmxlQWN0aW9uLnZ1ZVwiO1xuaW1wb3J0IFdhcmVob3VzZVNjYWxsaW5nVGFibGVCcmVhZFN0YXR1cyBmcm9tIFwiLi9XYXJlaG91c2VTY2FsbGluR1RhYmxlUmF3TWF0ZXJpYWxzU3RhdHVzLnZ1ZVwiO1xuaW1wb3J0IHsgcmVmLCB3YXRjaCB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgZmlsdGVyID0gcmVmKFwiXCIpO1xuY29uc3QgbG9hZGluZ1NlYXJjaEljb24gPSByZWYoZmFsc2UpO1xuXG53YXRjaChmaWx0ZXIsICgpID0+IHtcbiAgbG9hZGluZ1NlYXJjaEljb24udmFsdWUgPSB0cnVlO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBsb2FkaW5nU2VhcmNoSWNvbi52YWx1ZSA9IGZhbHNlO1xuICB9KTtcbn0pO1xuY29uc3QgdHJhbnNhY3Rpb25IaXN0b3J5Q29sdW1ucyA9IFtcbiAge1xuICAgIG5hbWU6IFwibmFtZVwiLFxuICAgIGxhYmVsOiBcIkJyYW5jaCBOYW1lXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IChyb3cpID0+IHJvdy5uYW1lLFxuICAgIGZvcm1hdDogKHZhbCkgPT4gYCR7dmFsfWAsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInJhd01hdGVyaWFsc1N0YXR1c1wiLFxuICAgIGxhYmVsOiBcIlJhdyBNYXRlcmlhbHMgU3RhdHVzXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IFwicmF3TWF0ZXJpYWxzU3RhdHVzXCIsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImFjdGlvblwiLFxuICAgIGxhYmVsOiBcIkFjdGlvblwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICB9LFxuXTtcblxuY29uc3QgdHJhbnNhY3Rpb25IaXN0b3J5Um93ID0gW1xuICB7XG4gICAgbmFtZTogXCJCcmFuY2ggMVwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJCcmFuY2ggMlwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJCcmFuY2ggM1wiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJCcmFuY2ggNFwiLFxuICB9LFxuXTtcbjwvc2NyaXB0PlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUZBLFVBQU0sd0JBQXdCLElBQUc7QUFDakMsVUFBTSx5QkFBeUIsQ0FBQyxTQUFTLE9BQU8sS0FBSztBQUNyRCxVQUFNLDhCQUE4QixNQUFNO0FBQ3hDLDRCQUFzQixRQUFRO0FBQUEsSUFDaEM7QUFDQSxVQUFNLGVBQWUsU0FBUztBQUFBLE1BQzVCLGdCQUFnQjtBQUFBLE1BQ2hCLGtCQUFrQjtBQUFBLE1BQ2xCLE1BQU07QUFBQSxJQUNSLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDRCxVQUFNLHNCQUFzQixJQUFHO0FBRS9CLFVBQU0sNEJBQTRCLE1BQU07QUFDdEMsMEJBQW9CLFFBQVE7QUFBQSxJQUM5QjtBQUVtQixRQUFJLEVBQUU7QUFRekIsVUFBTSxRQUFRO0FBQUEsTUFDWjtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osT0FBTztBQUFBLFFBQ1AsYUFBYTtBQUFBLE1BQ2Q7QUFBQSxNQUNEO0FBQUEsUUFDRSxJQUFJO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxhQUFhO0FBQUEsTUFDZDtBQUFBLE1BQ0Q7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLE9BQU87QUFBQSxRQUNQLGFBQWE7QUFBQSxNQUNkO0FBQUEsTUFDRDtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osT0FBTztBQUFBLFFBQ1AsYUFBYTtBQUFBLE1BQ2Q7QUFBQSxNQUNEO0FBQUEsUUFDRSxJQUFJO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxhQUFhO0FBQUEsTUFDZDtBQUFBLE1BQ0Q7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLE9BQU87QUFBQSxRQUNQLGFBQWE7QUFBQSxNQUNkO0FBQUEsTUFDRDtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osT0FBTztBQUFBLFFBQ1AsYUFBYTtBQUFBLE1BQ2Q7QUFBQSxNQUNEO0FBQUEsUUFDRSxJQUFJO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxhQUFhO0FBQUEsTUFDZDtBQUFBLE1BQ0Q7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLE9BQU87QUFBQSxRQUNQLGFBQWE7QUFBQSxNQUNkO0FBQUEsTUFDRDtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osT0FBTztBQUFBLFFBQ1AsYUFBYTtBQUFBLE1BQ2Q7QUFBQSxJQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxRUEsVUFBTSxTQUFTLElBQUksRUFBRTtBQUNyQixVQUFNLG9CQUFvQixJQUFJLEtBQUs7QUFFbkMsVUFBTSxRQUFRLE1BQU07QUFDbEIsd0JBQWtCLFFBQVE7QUFDMUIsaUJBQVcsTUFBTTtBQUNmLDBCQUFrQixRQUFRO0FBQUEsTUFDOUIsQ0FBRztBQUFBLElBQ0gsQ0FBQztBQUNELFVBQU0sNEJBQTRCO0FBQUEsTUFDaEM7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLE9BQU8sQ0FBQyxRQUFRLElBQUk7QUFBQSxRQUNwQixRQUFRLENBQUMsUUFBUSxHQUFHO0FBQUEsUUFDcEIsVUFBVTtBQUFBLE1BQ1g7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxVQUFVO0FBQUEsTUFDWDtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQSxNQUNYO0FBQUEsSUFDSDtBQUVBLFVBQU0sd0JBQXdCO0FBQUEsTUFDNUI7QUFBQSxRQUNFLE1BQU07QUFBQSxNQUNQO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLE1BQ1A7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsTUFDUDtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxNQUNQO0FBQUEsSUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
