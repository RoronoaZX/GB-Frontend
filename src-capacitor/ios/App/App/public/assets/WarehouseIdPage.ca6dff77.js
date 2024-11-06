import { _ as _export_sfc, n as ref, o as openBlock, a4 as createElementBlock, a as createVNode, w as withCtx, a1 as createTextVNode, M as QBtn, Q as QCard, a3 as QDialog, a5 as Fragment, J as createBaseVNode, t as reactive, I as QCardSection, af as withDirectives, aK as QCardActions, a2 as QSeparator, a0 as toDisplayString, c as createBlock, L as QIcon } from "./index.9b9dbcba.js";
import { Q as QSpace } from "./QSpace.5918deea.js";
import { Q as QBadge } from "./QBadge.cf1023ef.js";
import { a as QTd, b as QTable } from "./QTable.0bf3c36f.js";
import { Q as QTooltip } from "./QTooltip.a17992ce.js";
import { C as ClosePopup } from "./ClosePopup.83fef54c.js";
import "./QVirtualScroll.3c7f7fea.js";
import "./QList.8d472d75.js";
import "./rtl.276c3f1b.js";
import "./QItemLabel.345b9721.js";
import "./QChip.d5fc407c.js";
import "./QItem.79579b05.js";
import "./QMenu.d2cee634.js";
import "./format.76edee29.js";
const _hoisted_1$4 = /* @__PURE__ */ createBaseVNode("h5", null, "This is View dialog!", -1);
const _sfc_main$4 = {
  __name: "WarehouseIdViewComponent",
  setup(__props) {
    const dialog = ref(false);
    const open_dialog = () => {
      dialog.value = true;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          onClick: open_dialog,
          color: "indigo",
          icon: "visibility",
          size: "sm",
          flat: "",
          round: "",
          dense: ""
        }, {
          default: withCtx(() => [
            createVNode(QTooltip, {
              class: "bg-indigo",
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
          modelValue: dialog.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => dialog.value = $event)
        }, {
          default: withCtx(() => [
            createVNode(QCard, null, {
              default: withCtx(() => [
                _hoisted_1$4
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
var WarehouseIdViewComponent = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "WarehouseIdViewComponent.vue"]]);
const _hoisted_1$3 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Edit Transaction", -1);
const _sfc_main$3 = {
  __name: "WarehouseIdEditComponent",
  setup(__props) {
    const editBreadDialogVisible = ref(false);
    const open_edit_bread_dialog = () => {
      editBreadDialogVisible.value = true;
    };
    reactive({
      breadName: "",
      price: ""
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          onClick: open_edit_bread_dialog,
          color: "positive",
          icon: "edit",
          size: "sm",
          flat: "",
          round: "",
          dense: ""
        }, {
          default: withCtx(() => [
            createVNode(QTooltip, {
              class: "bg-positive",
              delay: 200
            }, {
              default: withCtx(() => [
                createTextVNode("Edit")
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(QDialog, {
          modelValue: editBreadDialogVisible.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => editBreadDialogVisible.value = $event)
        }, {
          default: withCtx(() => [
            createVNode(QCard, {
              class: "my-card",
              style: { "width": "400px" }
            }, {
              default: withCtx(() => [
                createVNode(QCardSection, {
                  class: "row items-center text-white",
                  style: { "background-color": "#ef4444" }
                }, {
                  default: withCtx(() => [
                    _hoisted_1$3,
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
                createVNode(QCardActions, {
                  class: "row q-ma-md",
                  align: "right"
                }, {
                  default: withCtx(() => [
                    withDirectives(createVNode(QBtn, {
                      class: "glossy",
                      color: "grey-9",
                      label: "Dismiss"
                    }, null, 512), [
                      [ClosePopup]
                    ]),
                    createVNode(QBtn, {
                      class: "glossy",
                      color: "teal",
                      label: "Save"
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
var WarehouseIdEditComponent = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "WarehouseIdEditComponent.vue"]]);
const _hoisted_1$2 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Do you want to delete it?", -1);
const _sfc_main$2 = {
  __name: "WarehouseIdDeleteComponent",
  setup(__props) {
    const dialogVisible = ref(false);
    const deleteDialog = () => {
      dialogVisible.value = true;
    };
    const handleDelete = () => {
      console.log("Deleting...");
      dialogVisible.value = false;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          onClick: deleteDialog,
          color: "negative",
          icon: "delete",
          size: "sm",
          flat: "",
          round: "",
          dense: ""
        }, {
          default: withCtx(() => [
            createVNode(QTooltip, {
              class: "bg-negative",
              delay: 200
            }, {
              default: withCtx(() => [
                createTextVNode("Delete")
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(QDialog, {
          modelValue: dialogVisible.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => dialogVisible.value = $event)
        }, {
          default: withCtx(() => [
            createVNode(QCard, null, {
              default: withCtx(() => [
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    _hoisted_1$2
                  ]),
                  _: 1
                }),
                createVNode(QSeparator),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createVNode(QCardActions, { align: "right" }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(QBtn, {
                          flat: "",
                          dense: "",
                          outline: "",
                          label: "No"
                        }, null, 512), [
                          [ClosePopup]
                        ]),
                        createVNode(QBtn, {
                          flat: "",
                          dense: "",
                          label: "Yes",
                          onClick: handleDelete
                        })
                      ]),
                      _: 1
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
var WarehouseIdDeleteComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "WarehouseIdDeleteComponent.vue"]]);
const _hoisted_1$1 = { style: { "height": "300px", "overflow": "auto" } };
const _sfc_main$1 = {
  __name: "WarehouseIdTableComponent",
  setup(__props) {
    const warehouseTransactionListColumns = [
      {
        name: "name",
        label: "Transaction Name",
        align: "center",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true
      },
      {
        name: "date",
        label: "Date / Time",
        align: "center",
        field: "date",
        sortable: true
      },
      {
        name: "status",
        label: "Status",
        align: "center",
        field: "status",
        sortable: true
      },
      {
        name: "action",
        label: "Action",
        align: "center",
        field: "action",
        sortable: true
      }
    ];
    const warehouseTransactionListRow = [
      {
        name: "Transaction 1",
        date: "4/4/24 8:00 AM",
        status: "Processing"
      },
      {
        name: "Transaction 2",
        date: "4/4/24 9:00 AM",
        status: "To Receive"
      },
      {
        name: "Transaction 3",
        date: "4/4/24 10:00 AM",
        status: "Received"
      },
      {
        name: "Transaction 4",
        date: "4/4/24 11:00 AM",
        status: "Transaction Failed"
      },
      {
        name: "Transaction 5",
        date: "4/4/24 11:00 AM",
        status: "Adding Supply"
      }
    ];
    const getBadgeColor = (status) => {
      switch (status) {
        case "Processing":
          return "light-blue-13";
        case "To Receive":
          return "deep-orange";
        case "Transaction Failed":
          return "negative";
        case "Received":
          return "green-13";
        default:
          return "grey";
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(QTable, {
          flat: "",
          columns: warehouseTransactionListColumns,
          rows: warehouseTransactionListRow,
          "row-key": "name"
        }, {
          "body-cell-status": withCtx((props) => [
            createVNode(QTd, {
              key: "name",
              props
            }, {
              default: withCtx(() => [
                createVNode(QBadge, {
                  class: "text-white",
                  color: getBadgeColor(props.row.status)
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(props.row.status), 1)
                  ]),
                  _: 2
                }, 1032, ["color"])
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          "body-cell-action": withCtx((props) => [
            createVNode(QTd, {
              class: "q-gutter-x-md",
              props
            }, {
              default: withCtx(() => [
                createVNode(WarehouseIdViewComponent),
                createVNode(WarehouseIdEditComponent),
                createVNode(WarehouseIdDeleteComponent)
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          _: 1
        })
      ]);
    };
  }
};
var WarehouseIdTableComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "WarehouseIdTableComponent.vue"]]);
const _hoisted_1 = { class: "text-h6 row justify-between" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", {
  class: "text-h6 q-ma-sm",
  align: "center"
}, "Transaction History", -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", { class: "row justify-between q-ma-sm" }, null, -1);
const _sfc_main = {
  __name: "WarehouseIdPage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QCard, { flat: "" }, {
        default: withCtx(() => [
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                createBaseVNode("div", null, [
                  createVNode(QBtn, {
                    outline: "",
                    flat: "",
                    icon: "arrow_back",
                    to: "/admin/warehouse"
                  }),
                  createVNode(QSpace)
                ]),
                createBaseVNode("div", null, [
                  createVNode(QIcon, { name: "factory" }),
                  createTextVNode(" Warehouse 1 ")
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              _hoisted_2,
              _hoisted_3
            ]),
            _: 1
          }),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createVNode(WarehouseIdTableComponent)
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
var WarehouseIdPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "WarehouseIdPage.vue"]]);
export { WarehouseIdPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FyZWhvdXNlSWRQYWdlLmNhNmRmZjc3LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci93YXJlaG91c2UvaWQvY29tcG9uZW50cy9XYXJlaG91c2VJZFZpZXdDb21wb25lbnQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3Ivd2FyZWhvdXNlL2lkL2NvbXBvbmVudHMvV2FyZWhvdXNlSWRFZGl0Q29tcG9uZW50LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL3dhcmVob3VzZS9pZC9jb21wb25lbnRzL1dhcmVob3VzZUlkRGVsZXRlQ29tcG9uZW50LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL3dhcmVob3VzZS9pZC9jb21wb25lbnRzL1dhcmVob3VzZUlkVGFibGVDb21wb25lbnQudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPHEtYnRuXG4gICAgQGNsaWNrPVwib3Blbl9kaWFsb2dcIlxuICAgIGNvbG9yPVwiaW5kaWdvXCJcbiAgICBpY29uPVwidmlzaWJpbGl0eVwiXG4gICAgc2l6ZT1cInNtXCJcbiAgICBmbGF0XG4gICAgcm91bmRcbiAgICBkZW5zZVxuICA+XG4gICAgPHEtdG9vbHRpcCBjbGFzcz1cImJnLWluZGlnb1wiIDpkZWxheT1cIjIwMFwiPlZpZXc8L3EtdG9vbHRpcD5cbiAgPC9xLWJ0bj5cbiAgPHEtZGlhbG9nIHYtbW9kZWw9XCJkaWFsb2dcIj5cbiAgICA8cS1jYXJkPlxuICAgICAgPGg1PlRoaXMgaXMgVmlldyBkaWFsb2chPC9oNT5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5jb25zdCBvcGVuX2RpYWxvZyA9ICgpID0+IHtcbiAgZGlhbG9nLnZhbHVlID0gdHJ1ZTtcbn07XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtYnRuXG4gICAgQGNsaWNrPVwib3Blbl9lZGl0X2JyZWFkX2RpYWxvZ1wiXG4gICAgY29sb3I9XCJwb3NpdGl2ZVwiXG4gICAgaWNvbj1cImVkaXRcIlxuICAgIHNpemU9XCJzbVwiXG4gICAgZmxhdFxuICAgIHJvdW5kXG4gICAgZGVuc2VcbiAgPlxuICAgIDxxLXRvb2x0aXAgY2xhc3M9XCJiZy1wb3NpdGl2ZVwiIDpkZWxheT1cIjIwMFwiPkVkaXQ8L3EtdG9vbHRpcD5cbiAgPC9xLWJ0bj5cbiAgPHEtZGlhbG9nIHYtbW9kZWw9XCJlZGl0QnJlYWREaWFsb2dWaXNpYmxlXCI+XG4gICAgPHEtY2FyZCBjbGFzcz1cIm15LWNhcmRcIiBzdHlsZT1cIndpZHRoOiA0MDBweFwiPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uXG4gICAgICAgIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciB0ZXh0LXdoaXRlXCJcbiAgICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjZWY0NDQ0XCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5FZGl0IFRyYW5zYWN0aW9uPC9kaXY+XG4gICAgICAgIDxxLXNwYWNlIC8+XG4gICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IGRlbnNlIHJvdW5kIHYtY2xvc2UtcG9wdXAgLz5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgIDwhLS0gPHEtc2VwYXJhdG9yIC8+IC0tPlxuICAgICAgPHEtY2FyZC1hY3Rpb25zIGNsYXNzPVwicm93IHEtbWEtbWRcIiBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICAgIDxxLWJ0biBjbGFzcz1cImdsb3NzeVwiIGNvbG9yPVwiZ3JleS05XCIgbGFiZWw9XCJEaXNtaXNzXCIgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgICA8cS1idG4gY2xhc3M9XCJnbG9zc3lcIiBjb2xvcj1cInRlYWxcIiBsYWJlbD1cIlNhdmVcIiAvPlxuICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYsIHJlYWN0aXZlIH0gZnJvbSBcInZ1ZVwiO1xuXG5jb25zdCBlZGl0QnJlYWREaWFsb2dWaXNpYmxlID0gcmVmKGZhbHNlKTtcblxuY29uc3Qgb3Blbl9lZGl0X2JyZWFkX2RpYWxvZyA9ICgpID0+IHtcbiAgZWRpdEJyZWFkRGlhbG9nVmlzaWJsZS52YWx1ZSA9IHRydWU7XG59O1xuY29uc3QgZWRpdEJyZWFkRm9ybSA9IHJlYWN0aXZlKHtcbiAgYnJlYWROYW1lOiBcIlwiLFxuICBwcmljZTogXCJcIixcbn0pO1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWJ0blxuICAgIEBjbGljaz1cImRlbGV0ZURpYWxvZ1wiXG4gICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgaWNvbj1cImRlbGV0ZVwiXG4gICAgc2l6ZT1cInNtXCJcbiAgICBmbGF0XG4gICAgcm91bmRcbiAgICBkZW5zZVxuICA+XG4gICAgPHEtdG9vbHRpcCBjbGFzcz1cImJnLW5lZ2F0aXZlXCIgOmRlbGF5PVwiMjAwXCI+RGVsZXRlPC9xLXRvb2x0aXA+XG4gIDwvcS1idG4+XG4gIDxxLWRpYWxvZyB2LW1vZGVsPVwiZGlhbG9nVmlzaWJsZVwiPlxuICAgIDxxLWNhcmQ+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+RG8geW91IHdhbnQgdG8gZGVsZXRlIGl0PzwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLXNlcGFyYXRvciAvPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8cS1jYXJkLWFjdGlvbnMgYWxpZ249XCJyaWdodFwiPlxuICAgICAgICAgIDxxLWJ0biBmbGF0IGRlbnNlIG91dGxpbmUgbGFiZWw9XCJOb1wiIHYtY2xvc2UtcG9wdXAgLz5cbiAgICAgICAgICA8cS1idG4gZmxhdCBkZW5zZSBsYWJlbD1cIlllc1wiIEBjbGljaz1cImhhbmRsZURlbGV0ZVwiIC8+XG4gICAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgZGlhbG9nVmlzaWJsZSA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IGRlbGV0ZURpYWxvZyA9ICgpID0+IHtcbiAgZGlhbG9nVmlzaWJsZS52YWx1ZSA9IHRydWU7XG59O1xuXG5jb25zdCBoYW5kbGVEZWxldGUgPSAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiRGVsZXRpbmcuLi5cIik7XG5cbiAgZGlhbG9nVmlzaWJsZS52YWx1ZSA9IGZhbHNlO1xufTtcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IHN0eWxlPVwiaGVpZ2h0OiAzMDBweDsgb3ZlcmZsb3c6IGF1dG9cIj5cbiAgICA8cS10YWJsZVxuICAgICAgZmxhdFxuICAgICAgOmNvbHVtbnM9XCJ3YXJlaG91c2VUcmFuc2FjdGlvbkxpc3RDb2x1bW5zXCJcbiAgICAgIDpyb3dzPVwid2FyZWhvdXNlVHJhbnNhY3Rpb25MaXN0Um93XCJcbiAgICAgIHJvdy1rZXk9XCJuYW1lXCJcbiAgICA+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC1zdGF0dXM9XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCBrZXk9XCJuYW1lXCIgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8cS1iYWRnZSBjbGFzcz1cInRleHQtd2hpdGVcIiA6Y29sb3I9XCJnZXRCYWRnZUNvbG9yKHByb3BzLnJvdy5zdGF0dXMpXCI+XG4gICAgICAgICAgICB7eyBwcm9wcy5yb3cuc3RhdHVzIH19XG4gICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtYWN0aW9uPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgY2xhc3M9XCJxLWd1dHRlci14LW1kXCIgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8V2FyZWhvdXNlSWRWaWV3Q29tcG9uZW50IC8+XG4gICAgICAgICAgPFdhcmVob3VzZUlkRWRpdENvbXBvbmVudCAvPlxuICAgICAgICAgIDxXYXJlaG91c2VJZERlbGV0ZUNvbXBvbmVudCAvPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS10YWJsZT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFdhcmVob3VzZUlkVmlld0NvbXBvbmVudCBmcm9tIFwiLi9XYXJlaG91c2VJZFZpZXdDb21wb25lbnQudnVlXCI7XG5pbXBvcnQgV2FyZWhvdXNlSWRFZGl0Q29tcG9uZW50IGZyb20gXCIuL1dhcmVob3VzZUlkRWRpdENvbXBvbmVudC52dWVcIjtcbmltcG9ydCBXYXJlaG91c2VJZERlbGV0ZUNvbXBvbmVudCBmcm9tIFwiLi9XYXJlaG91c2VJZERlbGV0ZUNvbXBvbmVudC52dWVcIjtcblxuY29uc3Qgd2FyZWhvdXNlVHJhbnNhY3Rpb25MaXN0Q29sdW1ucyA9IFtcbiAge1xuICAgIG5hbWU6IFwibmFtZVwiLFxuICAgIGxhYmVsOiBcIlRyYW5zYWN0aW9uIE5hbWVcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogKHJvdykgPT4gcm93Lm5hbWUsXG4gICAgZm9ybWF0OiAodmFsKSA9PiBgJHt2YWx9YCxcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZGF0ZVwiLFxuICAgIGxhYmVsOiBcIkRhdGUgLyBUaW1lXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IFwiZGF0ZVwiLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJzdGF0dXNcIixcbiAgICBsYWJlbDogXCJTdGF0dXNcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogXCJzdGF0dXNcIixcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYWN0aW9uXCIsXG4gICAgbGFiZWw6IFwiQWN0aW9uXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IFwiYWN0aW9uXCIsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG5dO1xuY29uc3Qgd2FyZWhvdXNlVHJhbnNhY3Rpb25MaXN0Um93ID0gW1xuICB7XG4gICAgbmFtZTogXCJUcmFuc2FjdGlvbiAxXCIsXG4gICAgZGF0ZTogXCI0LzQvMjQgODowMCBBTVwiLFxuICAgIHN0YXR1czogXCJQcm9jZXNzaW5nXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIlRyYW5zYWN0aW9uIDJcIixcbiAgICBkYXRlOiBcIjQvNC8yNCA5OjAwIEFNXCIsXG4gICAgc3RhdHVzOiBcIlRvIFJlY2VpdmVcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiVHJhbnNhY3Rpb24gM1wiLFxuICAgIGRhdGU6IFwiNC80LzI0IDEwOjAwIEFNXCIsXG4gICAgc3RhdHVzOiBcIlJlY2VpdmVkXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIlRyYW5zYWN0aW9uIDRcIixcbiAgICBkYXRlOiBcIjQvNC8yNCAxMTowMCBBTVwiLFxuICAgIHN0YXR1czogXCJUcmFuc2FjdGlvbiBGYWlsZWRcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiVHJhbnNhY3Rpb24gNVwiLFxuICAgIGRhdGU6IFwiNC80LzI0IDExOjAwIEFNXCIsXG4gICAgc3RhdHVzOiBcIkFkZGluZyBTdXBwbHlcIixcbiAgfSxcbl07XG5jb25zdCBnZXRCYWRnZUNvbG9yID0gKHN0YXR1cykgPT4ge1xuICBzd2l0Y2ggKHN0YXR1cykge1xuICAgIGNhc2UgXCJQcm9jZXNzaW5nXCI6XG4gICAgICByZXR1cm4gXCJsaWdodC1ibHVlLTEzXCI7XG4gICAgY2FzZSBcIlRvIFJlY2VpdmVcIjpcbiAgICAgIHJldHVybiBcImRlZXAtb3JhbmdlXCI7XG4gICAgY2FzZSBcIlRyYW5zYWN0aW9uIEZhaWxlZFwiOlxuICAgICAgcmV0dXJuIFwibmVnYXRpdmVcIjtcbiAgICBjYXNlIFwiUmVjZWl2ZWRcIjpcbiAgICAgIHJldHVybiBcImdyZWVuLTEzXCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcImdyZXlcIjsgLy8gZGVmYXVsdCBjb2xvciBpZiBzdGF0dXMgZG9lc24ndCBtYXRjaCBhbnkgY2FzZVxuICB9XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+PC9zdHlsZT5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsVUFBTSxTQUFTLElBQUksS0FBSztBQUN4QixVQUFNLGNBQWMsTUFBTTtBQUN4QixhQUFPLFFBQVE7QUFBQSxJQUNqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVUEsVUFBTSx5QkFBeUIsSUFBSSxLQUFLO0FBRXhDLFVBQU0seUJBQXlCLE1BQU07QUFDbkMsNkJBQXVCLFFBQVE7QUFBQSxJQUNqQztBQUNzQixhQUFTO0FBQUEsTUFDN0IsV0FBVztBQUFBLE1BQ1gsT0FBTztBQUFBLElBQ1QsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1pELFVBQU0sZ0JBQWdCLElBQUksS0FBSztBQUUvQixVQUFNLGVBQWUsTUFBTTtBQUN6QixvQkFBYyxRQUFRO0FBQUEsSUFDeEI7QUFFQSxVQUFNLGVBQWUsTUFBTTtBQUN6QixjQUFRLElBQUksYUFBYTtBQUV6QixvQkFBYyxRQUFRO0FBQUEsSUFDeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBLFVBQU0sa0NBQWtDO0FBQUEsTUFDdEM7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLE9BQU8sQ0FBQyxRQUFRLElBQUk7QUFBQSxRQUNwQixRQUFRLENBQUMsUUFBUSxHQUFHO0FBQUEsUUFDcEIsVUFBVTtBQUFBLE1BQ1g7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxVQUFVO0FBQUEsTUFDWDtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQSxNQUNYO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsVUFBVTtBQUFBLE1BQ1g7QUFBQSxJQUNIO0FBQ0EsVUFBTSw4QkFBOEI7QUFBQSxNQUNsQztBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sUUFBUTtBQUFBLE1BQ1Q7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixRQUFRO0FBQUEsTUFDVDtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLFFBQVE7QUFBQSxNQUNUO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sUUFBUTtBQUFBLE1BQ1Q7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixRQUFRO0FBQUEsTUFDVDtBQUFBLElBQ0g7QUFDQSxVQUFNLGdCQUFnQixDQUFDLFdBQVc7QUFDaEMsY0FBUTtBQUFBLGFBQ0Q7QUFDSCxpQkFBTztBQUFBLGFBQ0o7QUFDSCxpQkFBTztBQUFBLGFBQ0o7QUFDSCxpQkFBTztBQUFBLGFBQ0o7QUFDSCxpQkFBTztBQUFBO0FBRVAsaUJBQU87QUFBQTtBQUFBLElBRWI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
