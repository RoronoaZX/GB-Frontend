import { _ as _export_sfc, n as ref, t as reactive, o as openBlock, a4 as createElementBlock, a as createVNode, M as QBtn, w as withCtx, Q as QCard, I as QCardSection, af as withDirectives, a2 as QSeparator, J as createBaseVNode, K as QInput, aK as QCardActions, a3 as QDialog, a5 as Fragment, u as watch, c as createBlock, L as QIcon, aL as normalizeClass, O as createTextVNode, R as toDisplayString } from "./index.c8e2405b.js";
import { Q as QSpace } from "./QSpace.08c50700.js";
import { Q as QSelect, a as QChip } from "./QSelect.0985e28e.js";
import { C as ClosePopup } from "./ClosePopup.649d85d8.js";
import { Q as QTd } from "./QTd.f597934c.js";
import { Q as QTable } from "./QTable.d3fb87f5.js";
import "./rtl.b1b38f21.js";
import "./QItem.76557ad9.js";
import "./QMenu.4f670399.js";
import "./selection.94057980.js";
import "./use-virtual-scroll.5b4ab88d.js";
import "./QVirtualScroll.41a98cb7.js";
import "./QList.d5d13fac.js";
const _hoisted_1$1 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Add Supply ", -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { class: "q-my-sm" }, "Supplier's Company Name", -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", { class: "q-my-sm" }, "Supplier's Name", -1);
const _hoisted_4 = { class: "row q-gutter-x-sm" };
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("div", { class: "q-my-sm" }, "Ingredients Name", -1);
const _hoisted_6 = /* @__PURE__ */ createBaseVNode("div", { class: "q-my-sm" }, "Amount", -1);
const _hoisted_7 = /* @__PURE__ */ createBaseVNode("div", { class: "q-my-sm" }, "Unit", -1);
const _hoisted_8 = { class: "q-mt-sm" };
const _sfc_main$2 = {
  __name: "WarehouseIngredientsCreateSupply",
  setup(__props) {
    const addIngredientsDialog = ref(false);
    const ingredientsUnitOptions = ["Grams", "Kgs", "Pcs"];
    const open_add_ingredients_dialog = () => {
      addIngredientsDialog.value = true;
    };
    const addSupplierForm = reactive({
      companyName: "",
      supplierName: "",
      ingredientName: "",
      ingredientAmount: "",
      unit: null
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          class: "q-pa-sm",
          color: "red",
          dense: "",
          elevated: "",
          icon: "add_circle",
          label: "Add Supply",
          onClick: open_add_ingredients_dialog
        }),
        createVNode(QDialog, {
          modelValue: addIngredientsDialog.value,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => addIngredientsDialog.value = $event)
        }, {
          default: withCtx(() => [
            createVNode(QCard, {
              class: "my-card",
              style: { "width": "900px" }
            }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "row items-center" }, {
                  default: withCtx(() => [
                    _hoisted_1$1,
                    createVNode(QSpace),
                    withDirectives(createVNode(QBtn, {
                      icon: "close",
                      flat: "",
                      dense: "",
                      round: ""
                    }, null, 512), [
                      [ClosePopup]
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QSeparator),
                createVNode(QCardSection, { class: "q-my-md q-mx-sm q-gutter-y-sm" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", null, [
                      _hoisted_2,
                      createVNode(QInput, {
                        modelValue: addSupplierForm.companyName,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => addSupplierForm.companyName = $event),
                        outlined: "",
                        dense: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    createBaseVNode("div", null, [
                      _hoisted_3,
                      createVNode(QInput, {
                        modelValue: addSupplierForm.supplierName,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => addSupplierForm.supplierName = $event),
                        outlined: "",
                        dense: ""
                      }, null, 8, ["modelValue"])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QSeparator),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_4, [
                      createBaseVNode("div", null, [
                        _hoisted_5,
                        createVNode(QInput, {
                          modelValue: addSupplierForm.ingredientName,
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => addSupplierForm.ingredientName = $event),
                          placeholder: "Search Ingredients",
                          outlined: "",
                          dense: "",
                          style: { "width": "320px", "max-width": "350px", "min-width": "20px" }
                        }, null, 8, ["modelValue"])
                      ]),
                      createBaseVNode("div", null, [
                        _hoisted_6,
                        createVNode(QInput, {
                          modelValue: addSupplierForm.ingredientAmount,
                          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => addSupplierForm.ingredientAmount = $event),
                          type: "number",
                          outlined: "",
                          dense: "",
                          style: { "width": "80px", "max-width": "150px", "min-width": "none" }
                        }, null, 8, ["modelValue"])
                      ]),
                      createBaseVNode("div", null, [
                        _hoisted_7,
                        createVNode(QSelect, {
                          modelValue: addSupplierForm.unit,
                          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => addSupplierForm.unit = $event),
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
var WarehouseIngredientsCreateSupply = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "WarehouseIngredientsCreateSupply.vue"]]);
const _sfc_main$1 = {
  __name: "WarehouseIngredientsTable",
  setup(__props) {
    const filter = ref("");
    const loadingSearchIcon = ref(false);
    watch(filter, () => {
      loadingSearchIcon.value = true;
      setTimeout(() => {
        loadingSearchIcon.value = false;
      });
    });
    const rawMaterialsStatusColumns = [
      {
        name: "name",
        label: "Ingredients Name",
        align: "center",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true
      },
      {
        name: "availableStocks",
        align: "center",
        label: "Available Stocks",
        field: "availableStocks",
        sortable: true
      }
    ];
    const rawMaterialsStatusRows = [
      {
        name: "Ingredients 1",
        availableStocks: "50 kgs"
      },
      {
        name: "Ingredients 2",
        availableStocks: "70 kgs"
      },
      {
        name: "Ingredients 3",
        availableStocks: "20 g"
      },
      {
        name: "Ingredients 4",
        availableStocks: "50 kgs"
      },
      {
        name: "Ingredients 5",
        availableStocks: "30 kgs"
      },
      {
        name: "Ingredients 5",
        availableStocks: "10 kgs"
      }
    ];
    const getRawMaterialBadgeColor = (availableStocks) => {
      const stockValue = parseInt(availableStocks);
      if (stockValue <= 20) {
        return "bg-red";
      } else if (stockValue <= 50) {
        return "bg-warning";
      } else {
        return "bg-primary";
      }
    };
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
            columns: rawMaterialsStatusColumns,
            rows: rawMaterialsStatusRows,
            "row-key": "name",
            "virtual-scroll": ""
          }, {
            "body-cell-availableStocks": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createVNode(QChip, {
                    square: "",
                    class: normalizeClass(["text-white", getRawMaterialBadgeColor(props.row.availableStocks)])
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(props.row.availableStocks), 1)
                    ]),
                    _: 2
                  }, 1032, ["class"])
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
var WarehouseIngredientsTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "WarehouseIngredientsTable.vue"]]);
const _hoisted_1 = { align: "right" };
const _sfc_main = {
  __name: "WarehouseIngredients",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QCard, { flat: "" }, {
        default: withCtx(() => [
          createVNode(QCardSection, { class: "text-h6" }, {
            default: withCtx(() => [
              createTextVNode(" Ingredients ")
            ]),
            _: 1
          }),
          createVNode(QSeparator),
          createVNode(QCardSection, { class: "q-gutter-md" }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                createVNode(WarehouseIngredientsCreateSupply)
              ]),
              createBaseVNode("div", null, [
                createVNode(WarehouseIngredientsTable)
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
var WarehouseIngredients = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "WarehouseIngredients.vue"]]);
export { WarehouseIngredients as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FyZWhvdXNlSW5ncmVkaWVudHMuMGQ1ZGE5OWYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWdlcy93YXJlaG91c2UvaW5ncmVkaWVudHMvd2FyZWhvdXNlX2luZ3JlZGllbnRfc2VjdGlvbi9XYXJlaG91c2VJbmdyZWRpZW50c0NyZWF0ZVN1cHBseS52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvd2FyZWhvdXNlL2luZ3JlZGllbnRzL3dhcmVob3VzZV9pbmdyZWRpZW50X3NlY3Rpb24vV2FyZWhvdXNlSW5ncmVkaWVudHNUYWJsZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICAgIDxxLWJ0biBjbGFzcz1cInEtcGEtc21cIiBjb2xvcj1cInJlZFwiIGRlbnNlIGVsZXZhdGVkIGljb249XCJhZGRfY2lyY2xlXCIgbGFiZWw9XCJBZGQgU3VwcGx5XCIgQGNsaWNrPVwib3Blbl9hZGRfaW5ncmVkaWVudHNfZGlhbG9nXCIgLz5cbiAgICA8cS1kaWFsb2cgdi1tb2RlbD1cImFkZEluZ3JlZGllbnRzRGlhbG9nXCIgPlxuICAgICAgICA8cS1jYXJkIGNsYXNzPVwibXktY2FyZFwiIHN0eWxlPVwid2lkdGg6OTAwcHhcIj5cbiAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbiAgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyXCIgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+QWRkIFN1cHBseSA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8cS1zcGFjZSAvPlxuICAgICAgICAgICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IGRlbnNlIHJvdW5kIHYtY2xvc2UtcG9wdXAvPlxuICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgIDxxLXNlcGFyYXRvciAvPlxuICAgICAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1teS1tZCBxLW14LXNtIHEtZ3V0dGVyLXktc21cIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1teS1zbVwiPlN1cHBsaWVyJ3MgQ29tcGFueSBOYW1lPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJhZGRTdXBwbGllckZvcm0uY29tcGFueU5hbWVcIiBvdXRsaW5lZCBkZW5zZSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW15LXNtXCI+U3VwcGxpZXIncyBOYW1lPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJhZGRTdXBwbGllckZvcm0uc3VwcGxpZXJOYW1lXCIgb3V0bGluZWQgZGVuc2UgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgICA8cS1zZXBhcmF0b3IgLz5cbiAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLXgtc21cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW15LXNtXCI+SW5ncmVkaWVudHMgTmFtZTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cImFkZFN1cHBsaWVyRm9ybS5pbmdyZWRpZW50TmFtZVwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIEluZ3JlZGllbnRzXCIgb3V0bGluZWQgZGVuc2Ugc3R5bGU9XCJ3aWR0aDozMjBweDsgbWF4LXdpZHRoOiAzNTBweDsgbWluLXdpZHRoOiAyMHB4O1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtbXktc21cIj5BbW91bnQ8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJhZGRTdXBwbGllckZvcm0uaW5ncmVkaWVudEFtb3VudFwiIHR5cGU9XCJudW1iZXJcIiBvdXRsaW5lZCBkZW5zZSBcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6ODBweDsgbWF4LXdpZHRoOiAxNTBweDsgbWluLXdpZHRoOiBub25lO1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtbXktc21cIj5Vbml0PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cS1zZWxlY3Qgdi1tb2RlbD1cImFkZFN1cHBsaWVyRm9ybS51bml0XCIgOm9wdGlvbnMgPSBcImluZ3JlZGllbnRzVW5pdE9wdGlvbnNcIiBvdXRsaW5lZCBkZW5zZSBzdHlsZT1cIndpZHRoOjkwcHg7IG1heC13aWR0aDoxMDBweDsgbWluLXdpZHRoOiBub25lO1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHEtYnRuIHNpemU9XCJzbVwiIG91dGxpbmUgZGVuc2UgaWNvbj1cImFkZFwiIGNvbG9yPVwicHVycGxlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgPHEtc2VwYXJhdG9yIC8+XG4gICAgICAgICAgICAgICAgPHEtY2FyZC1hY3Rpb25zIGNsYXNzPVwicm93IHEtbWEtbWRcIiBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxxLWJ0biBjbGFzcz1cImdsb3NzeVwiIGNvbG9yPVwiZ3JleS05XCIgbGFiZWw9XCJDYW5jZWxcIiB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICAgICAgICAgICAgICAgIDxxLWJ0biBjbGFzcz1cImdsb3NzeVwiIGNvbG9yPVwidGVhbFwiIGxhYmVsPVwiQ3JlYXRlXCIgLz5cbiAgICAgICAgICAgICAgICA8L3EtY2FyZC1hY3Rpb25zPlxuICAgICAgICA8L3EtY2FyZD5cbiAgICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7cmVmLCByZWFjdGl2ZX0gZnJvbSAndnVlJ1xuXG5jb25zdCBhZGRJbmdyZWRpZW50c0RpYWxvZyA9IHJlZihmYWxzZSlcbmNvbnN0IGluZ3JlZGllbnRzVW5pdE9wdGlvbnMgPSBbJ0dyYW1zJywgJ0tncycsICdQY3MnXVxuY29uc3Qgb3Blbl9hZGRfaW5ncmVkaWVudHNfZGlhbG9nID0gKCkgPT4ge1xuICAgIGFkZEluZ3JlZGllbnRzRGlhbG9nLnZhbHVlID0gdHJ1ZVxufVxuY29uc3QgYWRkU3VwcGxpZXJGb3JtID0gcmVhY3RpdmUoe1xuICAgIGNvbXBhbnlOYW1lOiAnJyxcbiAgICBzdXBwbGllck5hbWU6ICcnLFxuICAgIGluZ3JlZGllbnROYW1lOiAnJyxcbiAgICBpbmdyZWRpZW50QW1vdW50OiAnJyxcbiAgICB1bml0OiBudWxsLFxufSkgXG5cbjwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8cS1pbnB1dFxuICAgICAgcm91bmRlZFxuICAgICAgb3V0bGluZWRcbiAgICAgIGRlbnNlXG4gICAgICBkZWJvdW5jZT1cIjMwMFwiXG4gICAgICB2LW1vZGVsPVwiZmlsdGVyXCJcbiAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgIHN0eWxlPVwid2lkdGg6IDUwMHB4OyBtYXgtd2lkdGg6IDE1MDBweDsgbWluLXdpZHRoOiAxMDBweFwiXG4gICAgPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgIDxxLWljb24gdi1pZj1cIiFsb2FkaW5nU2VhcmNoSWNvblwiIG5hbWU9XCJzZWFyY2hcIiAvPlxuICAgICAgICA8cS1pY29uIHYtZWxzZSA6dGhpY2tuZXNzPVwiMlwiIGNvbG9yPVwidGVhbFwiIHNpemU9XCIxZW1cIiAvPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L3EtaW5wdXQ+XG4gIDwvZGl2PlxuICA8ZGl2PlxuICAgIDxxLXRhYmxlXG4gICAgICA6ZmlsdGVyPVwiZmlsdGVyXCJcbiAgICAgIGZsYXRcbiAgICAgIDpjb2x1bW5zPVwicmF3TWF0ZXJpYWxzU3RhdHVzQ29sdW1uc1wiXG4gICAgICA6cm93cz1cInJhd01hdGVyaWFsc1N0YXR1c1Jvd3NcIlxuICAgICAgcm93LWtleT1cIm5hbWVcIlxuICAgICAgdmlydHVhbC1zY3JvbGxcbiAgICA+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC1hdmFpbGFibGVTdG9ja3M9XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgIDxxLWNoaXBcbiAgICAgICAgICAgIHNxdWFyZVxuICAgICAgICAgICAgY2xhc3M9XCJ0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgIDpjbGFzcz1cImdldFJhd01hdGVyaWFsQmFkZ2VDb2xvcihwcm9wcy5yb3cuYXZhaWxhYmxlU3RvY2tzKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3sgcHJvcHMucm93LmF2YWlsYWJsZVN0b2NrcyB9fVxuICAgICAgICAgIDwvcS1jaGlwPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS10YWJsZT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuLy8gaW1wb3J0IEJha2Vyc1JlcG9ydEFjdGlvbiBmcm9tICcuL0Jha2Vyc1JlcG9ydEFjdGlvbi52dWUnO1xuaW1wb3J0IHsgcmVmLCB3YXRjaCB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgZmlsdGVyID0gcmVmKFwiXCIpO1xuY29uc3QgbG9hZGluZ1NlYXJjaEljb24gPSByZWYoZmFsc2UpO1xuXG53YXRjaChmaWx0ZXIsICgpID0+IHtcbiAgbG9hZGluZ1NlYXJjaEljb24udmFsdWUgPSB0cnVlO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBsb2FkaW5nU2VhcmNoSWNvbi52YWx1ZSA9IGZhbHNlO1xuICB9KTtcbn0pO1xuXG5jb25zdCByYXdNYXRlcmlhbHNTdGF0dXNDb2x1bW5zID0gW1xuICB7XG4gICAgbmFtZTogXCJuYW1lXCIsXG4gICAgbGFiZWw6IFwiSW5ncmVkaWVudHMgTmFtZVwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiAocm93KSA9PiByb3cubmFtZSxcbiAgICBmb3JtYXQ6ICh2YWwpID0+IGAke3ZhbH1gLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJhdmFpbGFibGVTdG9ja3NcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBsYWJlbDogXCJBdmFpbGFibGUgU3RvY2tzXCIsXG4gICAgZmllbGQ6IFwiYXZhaWxhYmxlU3RvY2tzXCIsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG5dO1xuY29uc3QgcmF3TWF0ZXJpYWxzU3RhdHVzUm93cyA9IFtcbiAge1xuICAgIG5hbWU6IFwiSW5ncmVkaWVudHMgMVwiLFxuICAgIGF2YWlsYWJsZVN0b2NrczogXCI1MCBrZ3NcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiSW5ncmVkaWVudHMgMlwiLFxuICAgIGF2YWlsYWJsZVN0b2NrczogXCI3MCBrZ3NcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiSW5ncmVkaWVudHMgM1wiLFxuICAgIGF2YWlsYWJsZVN0b2NrczogXCIyMCBnXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkluZ3JlZGllbnRzIDRcIixcbiAgICBhdmFpbGFibGVTdG9ja3M6IFwiNTAga2dzXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkluZ3JlZGllbnRzIDVcIixcbiAgICBhdmFpbGFibGVTdG9ja3M6IFwiMzAga2dzXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkluZ3JlZGllbnRzIDVcIixcbiAgICBhdmFpbGFibGVTdG9ja3M6IFwiMTAga2dzXCIsXG4gIH0sXG5dO1xuY29uc3QgZ2V0UmF3TWF0ZXJpYWxCYWRnZUNvbG9yID0gKGF2YWlsYWJsZVN0b2NrcykgPT4ge1xuICBjb25zdCBzdG9ja1ZhbHVlID0gcGFyc2VJbnQoYXZhaWxhYmxlU3RvY2tzKTtcbiAgaWYgKHN0b2NrVmFsdWUgPD0gMjApIHtcbiAgICByZXR1cm4gXCJiZy1yZWRcIjtcbiAgfSBlbHNlIGlmIChzdG9ja1ZhbHVlIDw9IDUwKSB7XG4gICAgcmV0dXJuIFwiYmctd2FybmluZ1wiO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBcImJnLXByaW1hcnlcIjtcbiAgfVxufTtcbjwvc2NyaXB0PlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFEQSxVQUFNLHVCQUF1QixJQUFJLEtBQUs7QUFDdEMsVUFBTSx5QkFBeUIsQ0FBQyxTQUFTLE9BQU8sS0FBSztBQUNyRCxVQUFNLDhCQUE4QixNQUFNO0FBQ3RDLDJCQUFxQixRQUFRO0FBQUEsSUFDakM7QUFDQSxVQUFNLGtCQUFrQixTQUFTO0FBQUEsTUFDN0IsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsZ0JBQWdCO0FBQUEsTUFDaEIsa0JBQWtCO0FBQUEsTUFDbEIsTUFBTTtBQUFBLElBQ1YsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQkQsVUFBTSxTQUFTLElBQUksRUFBRTtBQUNyQixVQUFNLG9CQUFvQixJQUFJLEtBQUs7QUFFbkMsVUFBTSxRQUFRLE1BQU07QUFDbEIsd0JBQWtCLFFBQVE7QUFDMUIsaUJBQVcsTUFBTTtBQUNmLDBCQUFrQixRQUFRO0FBQUEsTUFDOUIsQ0FBRztBQUFBLElBQ0gsQ0FBQztBQUVELFVBQU0sNEJBQTRCO0FBQUEsTUFDaEM7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLE9BQU8sQ0FBQyxRQUFRLElBQUk7QUFBQSxRQUNwQixRQUFRLENBQUMsUUFBUSxHQUFHO0FBQUEsUUFDcEIsVUFBVTtBQUFBLE1BQ1g7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxVQUFVO0FBQUEsTUFDWDtBQUFBLElBQ0g7QUFDQSxVQUFNLHlCQUF5QjtBQUFBLE1BQzdCO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixpQkFBaUI7QUFBQSxNQUNsQjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGlCQUFpQjtBQUFBLE1BQ2xCO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04saUJBQWlCO0FBQUEsTUFDbEI7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixpQkFBaUI7QUFBQSxNQUNsQjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGlCQUFpQjtBQUFBLE1BQ2xCO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04saUJBQWlCO0FBQUEsTUFDbEI7QUFBQSxJQUNIO0FBQ0EsVUFBTSwyQkFBMkIsQ0FBQyxvQkFBb0I7QUFDcEQsWUFBTSxhQUFhLFNBQVMsZUFBZTtBQUMzQyxVQUFJLGNBQWMsSUFBSTtBQUNwQixlQUFPO0FBQUEsTUFDWCxXQUFhLGNBQWMsSUFBSTtBQUMzQixlQUFPO0FBQUEsTUFDWCxPQUFTO0FBQ0wsZUFBTztBQUFBLE1BQ1I7QUFBQSxJQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
