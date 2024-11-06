import { Q as QBadge } from "./QBadge.cf1023ef.js";
import { _ as _export_sfc, n as ref, t as reactive, o as openBlock, a4 as createElementBlock, a as createVNode, w as withCtx, a1 as createTextVNode, M as QBtn, Q as QCard, I as QCardSection, af as withDirectives, a2 as QSeparator, J as createBaseVNode, K as QInput, aK as QCardActions, a3 as QDialog, a5 as Fragment, O as pushScopeId, R as popScopeId, c as createBlock, H as useRouter, g as computed, z as onMounted, u as watch, L as QIcon, a0 as toDisplayString, aJ as withModifiers } from "./index.9b9dbcba.js";
import { Q as QPage } from "./QPage.4b0a10d6.js";
import { Q as QSpinnerDots } from "./QSpinnerDots.4f44ad7f.js";
import { Q as QSelect, a as QTd, b as QTable } from "./QTable.0bf3c36f.js";
import { Q as QTooltip } from "./QTooltip.a17992ce.js";
import { Q as QSpace } from "./QSpace.5918deea.js";
import { C as ClosePopup } from "./ClosePopup.83fef54c.js";
import { u as useWarehousesStore } from "./warehouse.d9befe34.js";
import "./QVirtualScroll.3c7f7fea.js";
import "./QList.8d472d75.js";
import "./rtl.276c3f1b.js";
import "./QItemLabel.345b9721.js";
import "./QChip.d5fc407c.js";
import "./QItem.79579b05.js";
import "./QMenu.d2cee634.js";
import "./format.76edee29.js";
import "./axios.91431b0b.js";
var WarehouseEditComponent_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$3 = (n) => (pushScopeId("data-v-174f64e8"), n = n(), popScopeId(), n);
const _hoisted_1$4 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F3ED} Edit Warehouse", -1));
const _hoisted_2$4 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_3$3 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "Name of Warehouse", -1));
const _hoisted_4$2 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_5$2 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "Location", -1));
const _hoisted_6$2 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_7$1 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "Person In-charge", -1));
const _hoisted_8$1 = { class: "row q-gutter-x-sm q-mt-md" };
const _hoisted_9$1 = { class: "col-6 q-animated q-animate-bounce" };
const _hoisted_10$1 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "Phone Number", -1));
const _hoisted_11$1 = { class: "col-5 q-animated q-animate-bounce" };
const _hoisted_12$1 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "Status", -1));
const _sfc_main$5 = {
  __name: "WarehouseEditComponent",
  props: ["edit"],
  setup(__props) {
    const warehouseStore = useWarehousesStore();
    const dialog = ref(false);
    const statusOptions = ["Open", "Closed"];
    const props = __props;
    const editWarehouseForm = reactive({
      name: "",
      location: "",
      person_incharge: "",
      phone: "",
      status: null
    });
    const openEditForm = () => {
      Object.assign(editWarehouseForm, props.edit.row);
      dialog.value = true;
    };
    const saveEditedWarehouse = async () => {
      try {
        const updatedWarehouse = { ...props.edit.row, ...editWarehouseForm };
        await warehouseStore.updateWarehouses(props.edit.row.id, updatedWarehouse);
        dialog.value = false;
      } catch (error) {
        console.error("Failed to update ingredients:", error);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          color: "positive",
          icon: "edit",
          size: "sm",
          flat: "",
          round: "",
          dense: "",
          onClick: openEditForm
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
          modelValue: dialog.value,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => dialog.value = $event),
          persistent: "",
          "transition-show": "jump-up",
          "transition-hide": "jump-down"
        }, {
          default: withCtx(() => [
            createVNode(QCard, {
              class: "my-card q-pa-none",
              style: { "width": "420px", "border-radius": "16px", "box-shadow": "0 12px 24px rgba(0, 0, 0, 0.2)" }
            }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "row items-center q-px-md q-py-sm bg-gradient text-white" }, {
                  default: withCtx(() => [
                    _hoisted_1$4,
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
                createVNode(QSeparator, { class: "separator-gradient" }),
                createVNode(QCardSection, { class: "q-px-xl q-pt-none q-pb-lg" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2$4, [
                      _hoisted_3$3,
                      createVNode(QInput, {
                        modelValue: editWarehouseForm.name,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => editWarehouseForm.name = $event),
                        outlined: "",
                        dense: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    createBaseVNode("div", _hoisted_4$2, [
                      _hoisted_5$2,
                      createVNode(QInput, {
                        modelValue: editWarehouseForm.location,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => editWarehouseForm.location = $event),
                        outlined: "",
                        dense: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    createBaseVNode("div", _hoisted_6$2, [
                      _hoisted_7$1,
                      createVNode(QInput, {
                        modelValue: editWarehouseForm.person_incharge,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => editWarehouseForm.person_incharge = $event),
                        outlined: "",
                        dense: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    createBaseVNode("div", _hoisted_8$1, [
                      createBaseVNode("div", _hoisted_9$1, [
                        _hoisted_10$1,
                        createVNode(QInput, {
                          modelValue: editWarehouseForm.phone,
                          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => editWarehouseForm.phone = $event),
                          outlined: "",
                          dense: "",
                          mask: "(+63) ### - ### - ####",
                          placeholder: "(+63)### - ### - ####",
                          rules: [(val) => val && val.length > 0]
                        }, null, 8, ["modelValue", "rules"])
                      ]),
                      createBaseVNode("div", _hoisted_11$1, [
                        _hoisted_12$1,
                        createVNode(QSelect, {
                          modelValue: editWarehouseForm.status,
                          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => editWarehouseForm.status = $event),
                          outlined: "",
                          dense: "",
                          options: statusOptions,
                          behavior: "menu"
                        }, null, 8, ["modelValue"])
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardActions, {
                  class: "row q-px-lg q-py-sm q-pt-none",
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
                      label: "Save",
                      onClick: saveEditedWarehouse
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
var WarehouseEditComponent = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-174f64e8"], ["__file", "WarehouseEditComponent.vue"]]);
var WarehouseDeleteComponent_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-0db17e38"), n = n(), popScopeId(), n);
const _hoisted_1$3 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mb-xs" }, "Confirm Deletion", -1));
const _hoisted_2$3 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("p", { class: "text-body2 q-mb-none" }, " Are you sure you want to delete this item? This action cannot be undone. ", -1));
const _sfc_main$4 = {
  __name: "WarehouseDeleteComponent",
  props: ["delete"],
  setup(__props) {
    const warehouseStore = useWarehousesStore();
    const props = __props;
    const dialogVisible = ref(false);
    const deleteDialog = () => {
      dialogVisible.value = true;
    };
    const onDelete = async () => {
      try {
        await warehouseStore.deleteWarehouse(props.delete.row.id);
      } catch (error) {
        console.error("Error deleting item:", error);
      }
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
            createVNode(QCard, { class: "q-pa-md q-rounded q-elevate-2 bg-white text-grey-9" }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "q-pt-none q-pb-sm" }, {
                  default: withCtx(() => [
                    _hoisted_1$3,
                    _hoisted_2$3
                  ]),
                  _: 1
                }),
                createVNode(QSeparator, { class: "q-mb-md" }),
                createVNode(QCardActions, {
                  align: "right",
                  class: "q-pt-none"
                }, {
                  default: withCtx(() => [
                    withDirectives(createVNode(QBtn, {
                      flat: "",
                      dense: "",
                      label: "Cancel",
                      color: "primary",
                      class: "q-mr-sm"
                    }, null, 512), [
                      [ClosePopup]
                    ]),
                    createVNode(QBtn, {
                      dense: "",
                      label: "Delete",
                      color: "negative",
                      onClick: onDelete,
                      class: "q-btn-rounded q-px-lg"
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
var WarehouseDeleteComponent = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-0db17e38"], ["__file", "WarehouseDeleteComponent.vue"]]);
const _sfc_main$3 = {};
function _sfc_render(_ctx, _cache) {
  return openBlock(), createBlock(QBtn, {
    to: "/admin/warehouse/warehouse_1",
    outline: "",
    size: "sm",
    "text-color": "red-6",
    dense: "",
    label: "Go to warehouse"
  });
}
var WarehouseGotoComponent = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render], ["__file", "WarehouseGotoComponent.vue"]]);
var WarehouseTableComponent_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-92233518"), n = n(), popScopeId(), n);
const _hoisted_1$2 = { align: "right" };
const _hoisted_2$2 = {
  key: 0,
  class: "spinner-wrapper"
};
const _hoisted_3$2 = { key: 1 };
const _hoisted_4$1 = {
  key: 0,
  class: "data-error"
};
const _hoisted_5$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-ml-sm text-h6" }, "No data available", -1));
const _hoisted_6$1 = { class: "row justify-center q-gutter-x-md" };
const _sfc_main$2 = {
  __name: "WarehouseTableComponent",
  setup(__props) {
    useRouter();
    const warehouseStore = useWarehousesStore();
    const filter = ref("");
    const loading = ref(true);
    const warehouseRow = computed(() => warehouseStore.warehouses);
    const showNoDataMessage = ref(false);
    const pagination = ref({
      rowPerPage: 0
    });
    const filteredRows = computed(() => {
      if (!filter.value) {
        return warehouseRow.value;
      }
      return warehouseRow.value.filter(
        (row) => row.name.toLowerCase().includes(filter.value.toLowerCase())
      );
    });
    onMounted(async () => {
      const resaponse = await reloadTableData();
      console.log("respisne warehouse", resaponse);
    });
    const reloadTableData = async () => {
      try {
        loading.value = true;
        const response = await warehouseStore.fetchWarehouses();
        if (!warehouseRow.value.length) {
          showNoDataMessage.value = true;
        }
        console.log("wawrehouse respo", response);
      } catch (error) {
        showNoDataMessage.value = true;
      } finally {
        loading.value = false;
      }
    };
    watch(filter, async (newFilter) => {
      loading.value = true;
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      loading.value = false;
      showNoDataMessage.value = filteredRows.value.length === 0;
    });
    const warehouseColumns = [
      {
        name: "name",
        label: "Name of Warehouse",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true
      },
      {
        name: "location",
        label: "Location",
        align: "left",
        field: "location",
        sortable: true
      },
      {
        name: "person_incharge",
        label: "Person In-charge",
        align: "left",
        field: "person_incharge"
      },
      {
        name: "phone",
        label: "Phone",
        align: "center",
        field: "phone"
      },
      {
        name: "status",
        label: "Status",
        align: "left",
        field: "status"
      },
      {
        name: "action",
        label: "Action",
        align: "center",
        field: "action"
      }
    ];
    const getBadgeColor = (status) => {
      return status === "Open" ? "info" : "accent";
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$2, [
          createVNode(QInput, {
            modelValue: filter.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filter.value = $event),
            class: "q-pb-lg q-pl-md",
            outlined: "",
            placeholder: "Search",
            flat: "",
            rounded: "",
            dense: "",
            debounce: "100",
            style: { "width": "500px", "max-width": "1500px", "min-width": "100px" }
          }, {
            append: withCtx(() => [
              createVNode(QIcon, { name: "search" })
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
          createVNode(QSpinnerDots, {
            size: "50px",
            color: "primary"
          })
        ])) : (openBlock(), createElementBlock("div", _hoisted_3$2, [
          filteredRows.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
            createVNode(QIcon, {
              name: "warning",
              color: "warning",
              size: "4em"
            }),
            _hoisted_5$1
          ])) : (openBlock(), createBlock(QTable, {
            key: 1,
            class: "table-container elegant-container sticky-header",
            filter: filter.value,
            "virtual-scroll-sticky-size-start": 48,
            flat: "",
            style: { "height": "400px" },
            columns: warehouseColumns,
            rows: filteredRows.value,
            "row-key": "name",
            "virtual-scroll": "",
            pagination: pagination.value,
            "onUpdate:pagination": _cache[2] || (_cache[2] = ($event) => pagination.value = $event),
            "rows-per-page-options": [0],
            "hide-bottom": ""
          }, {
            "body-cell-status": withCtx((props) => [
              createVNode(QTd, {
                key: "name",
                props
              }, {
                default: withCtx(() => [
                  createVNode(QBadge, {
                    outline: "",
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
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_6$1, [
                    createVNode(WarehouseEditComponent, { edit: props }, null, 8, ["edit"]),
                    createVNode(WarehouseDeleteComponent, { delete: props }, null, 8, ["delete"]),
                    createVNode(WarehouseGotoComponent)
                  ])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            default: withCtx(() => [
              createBaseVNode("template", null, [
                createVNode(QTd, {
                  key: "name",
                  props: _ctx.props
                }, {
                  default: withCtx(() => [
                    createBaseVNode("a", {
                      onClick: _cache[1] || (_cache[1] = withModifiers(($event) => _ctx.goToBranch(_ctx.props.row), ["prevent"])),
                      class: "warehouse-link"
                    }, toDisplayString(_ctx.props.row.name), 1)
                  ]),
                  _: 1
                }, 8, ["props"])
              ])
            ]),
            _: 1
          }, 8, ["filter", "rows", "pagination"]))
        ]))
      ], 64);
    };
  }
};
var WarehouseTableComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-92233518"], ["__file", "WarehouseTableComponent.vue"]]);
var WarehouseCreateComponent_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-66c89404"), n = n(), popScopeId(), n);
const _hoisted_1$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F3ED} Add New Warehouse", -1));
const _hoisted_2$1 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_3$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, "Name of Warehouse", -1));
const _hoisted_4 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, "Location", -1));
const _hoisted_6 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, "Person In-charge", -1));
const _hoisted_8 = { class: "row q-gutter-x-sm q-mt-md" };
const _hoisted_9 = { class: "col-6 q-animated q-animate-bounce" };
const _hoisted_10 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, "Phone Number", -1));
const _hoisted_11 = { class: "col-5 q-animated q-animate-bounce" };
const _hoisted_12 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, "Status", -1));
const _sfc_main$1 = {
  __name: "WarehouseCreateComponent",
  setup(__props) {
    const warehousesStore = useWarehousesStore();
    const addWarehouseDialogVisible = ref(false);
    const warehouseStatus = ["Open", "Close"];
    const open_adding_warehouse_dialog = () => {
      addWarehouseDialogVisible.value = true;
    };
    const addNewWarehouseForm = reactive({
      name: "",
      location: "",
      person_incharge: "",
      phone: "",
      status: null
    });
    const createWarehouse = async () => {
      try {
        await warehousesStore.createWarehouses(addNewWarehouseForm);
        resetFormData();
      } catch (error) {
        console.error("Error creating warehouse:", error);
      }
      addWarehouseDialogVisible.value = false;
    };
    const resetFormData = () => {
      addNewWarehouseForm.name = "";
      addNewWarehouseForm.location = "";
      addNewWarehouseForm.person_incharge = "";
      addNewWarehouseForm.phone = "";
      addNewWarehouseForm.status = [""];
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(QBtn, {
          outline: "",
          icon: "add_circle",
          label: "Add Warehouse",
          onClick: open_adding_warehouse_dialog,
          style: { "background-color": "#ef4444" }
        }),
        createVNode(QDialog, {
          modelValue: addWarehouseDialogVisible.value,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => addWarehouseDialogVisible.value = $event),
          persistent: "",
          "transition-show": "jump-up",
          "transition-hide": "jump-down"
        }, {
          default: withCtx(() => [
            createVNode(QCard, {
              class: "my-card q-pa-none",
              style: { "width": "420px", "border-radius": "16px", "box-shadow": "0 12px 24px rgba(0, 0, 0, 0.2)" }
            }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "row items-center q-px-md q-py-sm bg-gradient text-white" }, {
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
                createVNode(QSeparator, { class: "separator-gradient" }),
                createVNode(QCardSection, { class: "q-px-xl q-pt-none q-pb-lg" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2$1, [
                      _hoisted_3$1,
                      createVNode(QInput, {
                        modelValue: addNewWarehouseForm.name,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => addNewWarehouseForm.name = $event),
                        outlined: "",
                        dense: "",
                        rules: [(val) => val && val.length > 0]
                      }, null, 8, ["modelValue", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_4, [
                      _hoisted_5,
                      createVNode(QInput, {
                        modelValue: addNewWarehouseForm.location,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => addNewWarehouseForm.location = $event),
                        outlined: "",
                        dense: "",
                        rules: [(val) => val && val.length > 0]
                      }, null, 8, ["modelValue", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_6, [
                      _hoisted_7,
                      createVNode(QInput, {
                        modelValue: addNewWarehouseForm.person_incharge,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => addNewWarehouseForm.person_incharge = $event),
                        outlined: "",
                        dense: "",
                        rules: [(val) => val && val.length > 0]
                      }, null, 8, ["modelValue", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_8, [
                      createBaseVNode("div", _hoisted_9, [
                        _hoisted_10,
                        createVNode(QInput, {
                          modelValue: addNewWarehouseForm.phone,
                          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => addNewWarehouseForm.phone = $event),
                          outlined: "",
                          dense: "",
                          mask: "(+63) ### - ### - ####",
                          placeholder: "(+63)### - ### - ####",
                          rules: [(val) => val && val.length > 0]
                        }, null, 8, ["modelValue", "rules"])
                      ]),
                      createBaseVNode("div", _hoisted_11, [
                        _hoisted_12,
                        createVNode(QSelect, {
                          modelValue: addNewWarehouseForm.status,
                          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => addNewWarehouseForm.status = $event),
                          outlined: "",
                          dense: "",
                          options: warehouseStatus,
                          "hide-dropdown-icon": "",
                          behavior: "menu"
                        }, null, 8, ["modelValue"])
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardActions, {
                  class: "row q-px-lg q-py-sm q-pt-none",
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
                      label: "Create",
                      onClick: createWarehouse
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
      ]);
    };
  }
};
var WarehouseCreateComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-66c89404"], ["__file", "WarehouseCreateComponent.vue"]]);
var WarehousePage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = { class: "text-h6 text-dark" };
const _hoisted_2 = { class: "q-gutter-x-sm" };
const _hoisted_3 = { align: "right" };
const _sfc_main = {
  __name: "WarehousePage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, null, {
        default: withCtx(() => [
          createVNode(QCard, {
            class: "elegant-container",
            flat: ""
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, { class: "row justify-between" }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_1, [
                    createTextVNode(" \u{1F3ED} Warehouse "),
                    createBaseVNode("div", _hoisted_2, [
                      createVNode(QBadge, {
                        label: "Open",
                        outline: "",
                        color: "info"
                      }),
                      createVNode(QBadge, {
                        label: "Closed",
                        outline: "",
                        color: "accent"
                      })
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_3, [
                    createVNode(WarehouseCreateComponent)
                  ])
                ]),
                _: 1
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createVNode(WarehouseTableComponent)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
var WarehousePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b9a91b42"], ["__file", "WarehousePage.vue"]]);
export { WarehousePage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FyZWhvdXNlUGFnZS5mODRlNjM3Mi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3Ivd2FyZWhvdXNlL2NvbXBvbmVudHMvV2FyZWhvdXNlRWRpdENvbXBvbmVudC52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci93YXJlaG91c2UvY29tcG9uZW50cy9XYXJlaG91c2VEZWxldGVDb21wb25lbnQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3Ivd2FyZWhvdXNlL2NvbXBvbmVudHMvV2FyZWhvdXNlVGFibGVDb21wb25lbnQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3Ivd2FyZWhvdXNlL2NvbXBvbmVudHMvV2FyZWhvdXNlQ3JlYXRlQ29tcG9uZW50LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLWJ0blxuICAgIGNvbG9yPVwicG9zaXRpdmVcIlxuICAgIGljb249XCJlZGl0XCJcbiAgICBzaXplPVwic21cIlxuICAgIGZsYXRcbiAgICByb3VuZFxuICAgIGRlbnNlXG4gICAgQGNsaWNrPVwib3BlbkVkaXRGb3JtXCJcbiAgPlxuICAgIDxxLXRvb2x0aXAgY2xhc3M9XCJiZy1wb3NpdGl2ZVwiIDpkZWxheT1cIjIwMFwiPkVkaXQ8L3EtdG9vbHRpcD5cbiAgPC9xLWJ0bj5cbiAgPHEtZGlhbG9nXG4gICAgdi1tb2RlbD1cImRpYWxvZ1wiXG4gICAgcGVyc2lzdGVudFxuICAgIHRyYW5zaXRpb24tc2hvdz1cImp1bXAtdXBcIlxuICAgIHRyYW5zaXRpb24taGlkZT1cImp1bXAtZG93blwiXG4gID5cbiAgICA8cS1jYXJkXG4gICAgICBjbGFzcz1cIm15LWNhcmQgcS1wYS1ub25lXCJcbiAgICAgIHN0eWxlPVwiXG4gICAgICAgIHdpZHRoOiA0MjBweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICAgICAgYm94LXNoYWRvdzogMCAxMnB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xuICAgICAgXCJcbiAgICA+XG4gICAgICA8cS1jYXJkLXNlY3Rpb25cbiAgICAgICAgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtcHgtbWQgcS1weS1zbSBiZy1ncmFkaWVudCB0ZXh0LXdoaXRlXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDUgcS1tci1tZFwiPvCfj60gRWRpdCBXYXJlaG91c2U8L2Rpdj5cbiAgICAgICAgPHEtc3BhY2UgLz5cbiAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgZGVuc2Ugcm91bmQgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLXNlcGFyYXRvciBjbGFzcz1cInNlcGFyYXRvci1ncmFkaWVudFwiIC8+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXB4LXhsIHEtcHQtbm9uZSBxLXBiLWxnXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LWxnIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgIDxkaXY+TmFtZSBvZiBXYXJlaG91c2U8L2Rpdj5cbiAgICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwiZWRpdFdhcmVob3VzZUZvcm0ubmFtZVwiIG91dGxpbmVkIGRlbnNlIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1tZCBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICA8ZGl2PkxvY2F0aW9uPC9kaXY+XG4gICAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cImVkaXRXYXJlaG91c2VGb3JtLmxvY2F0aW9uXCIgb3V0bGluZWQgZGVuc2UgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LW1kIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgIDxkaXY+UGVyc29uIEluLWNoYXJnZTwvZGl2PlxuICAgICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJlZGl0V2FyZWhvdXNlRm9ybS5wZXJzb25faW5jaGFyZ2VcIiBvdXRsaW5lZCBkZW5zZSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci14LXNtIHEtbXQtbWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTYgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgICA8ZGl2PlBob25lIE51bWJlcjwvZGl2PlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbD1cImVkaXRXYXJlaG91c2VGb3JtLnBob25lXCJcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgbWFzaz1cIigrNjMpICMjIyAtICMjIyAtICMjIyNcIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIigrNjMpIyMjIC0gIyMjIC0gIyMjI1wiXG4gICAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiB2YWwgJiYgdmFsLmxlbmd0aCA+IDBdXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC01IHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgICAgPGRpdj5TdGF0dXM8L2Rpdj5cbiAgICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgICB2LW1vZGVsPVwiZWRpdFdhcmVob3VzZUZvcm0uc3RhdHVzXCJcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgOm9wdGlvbnM9XCJzdGF0dXNPcHRpb25zXCJcbiAgICAgICAgICAgICAgYmVoYXZpb3I9XCJtZW51XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDwhLS0gPHEtc2VwYXJhdG9yIC8+IC0tPlxuICAgICAgPHEtY2FyZC1hY3Rpb25zIGNsYXNzPVwicm93IHEtcHgtbGcgcS1weS1zbSBxLXB0LW5vbmVcIiBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICAgIDxxLWJ0biBjbGFzcz1cImdsb3NzeVwiIGNvbG9yPVwiZ3JleS05XCIgbGFiZWw9XCJEaXNtaXNzXCIgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBjbGFzcz1cImdsb3NzeVwiXG4gICAgICAgICAgY29sb3I9XCJ0ZWFsXCJcbiAgICAgICAgICBsYWJlbD1cIlNhdmVcIlxuICAgICAgICAgIEBjbGljaz1cInNhdmVFZGl0ZWRXYXJlaG91c2VcIlxuICAgICAgICAvPlxuICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyB1c2VXYXJlaG91c2VzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy93YXJlaG91c2VcIjtcbmltcG9ydCB7IHJlZiwgcmVhY3RpdmUgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IHdhcmVob3VzZVN0b3JlID0gdXNlV2FyZWhvdXNlc1N0b3JlKCk7XG5jb25zdCBkaWFsb2cgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBzdGF0dXNPcHRpb25zID0gW1wiT3BlblwiLCBcIkNsb3NlZFwiXTtcbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHMoW1wiZWRpdFwiXSk7XG5cbmNvbnN0IGVkaXRXYXJlaG91c2VGb3JtID0gcmVhY3RpdmUoe1xuICBuYW1lOiBcIlwiLFxuICBsb2NhdGlvbjogXCJcIixcbiAgcGVyc29uX2luY2hhcmdlOiBcIlwiLFxuICBwaG9uZTogXCJcIixcbiAgc3RhdHVzOiBudWxsLFxufSk7XG5cbmNvbnN0IG9wZW5FZGl0Rm9ybSA9ICgpID0+IHtcbiAgT2JqZWN0LmFzc2lnbihlZGl0V2FyZWhvdXNlRm9ybSwgcHJvcHMuZWRpdC5yb3cpO1xuICBkaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcblxuY29uc3Qgc2F2ZUVkaXRlZFdhcmVob3VzZSA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB1cGRhdGVkV2FyZWhvdXNlID0geyAuLi5wcm9wcy5lZGl0LnJvdywgLi4uZWRpdFdhcmVob3VzZUZvcm0gfTtcbiAgICBhd2FpdCB3YXJlaG91c2VTdG9yZS51cGRhdGVXYXJlaG91c2VzKHByb3BzLmVkaXQucm93LmlkLCB1cGRhdGVkV2FyZWhvdXNlKTtcbiAgICBkaWFsb2cudmFsdWUgPSBmYWxzZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHVwZGF0ZSBpbmdyZWRpZW50czpcIiwgZXJyb3IpO1xuICB9XG59O1xuXG4vLyBjb25zdCBzYXZlRWRpdGVkV2FyZWhvdXNlID0gYXN5bmMgKCkgPT4ge1xuLy8gICB0cnkge1xuLy8gICAgIGNvbnN0IG9yaWdpbmFsV2FyZWhvdXNlID0gcHJvcHMuZWRpdC5yb3c7XG4vLyAgICAgY29uc3QgdXBkYXRlZFdhcmVob3VzZSA9IHtcbi8vICAgICAgIGlkOiBvcmlnaW5hbFdhcmVob3VzZS5pZCxcbi8vICAgICAgIG5hbWU6IGVkaXRXYXJlaG91c2VGb3JtLm5hbWUsXG4vLyAgICAgICBsb2NhdGlvbjogZWRpdFdhcmVob3VzZUZvcm0ubG9jYXRpb24sXG4vLyAgICAgICBwZXJzb25faW5jaGFyZ2U6IGVkaXRXYXJlaG91c2VGb3JtLnBlcnNvbl9pbmNoYXJnZSxcbi8vICAgICAgIHBob25lOiBlZGl0V2FyZWhvdXNlRm9ybS5waG9uZSxcbi8vICAgICAgIHN0YXR1czogZWRpdFdhcmVob3VzZUZvcm0uc3RhdHVzLFxuLy8gICAgIH07XG4vLyAgICAgY29uc3QgY2hhbmdlZEZpZWxkcyA9IFtdO1xuLy8gICAgIGlmIChvcmlnaW5hbFdhcmVob3VzZS5uYW1lICE9PSB1cGRhdGVkV2FyZWhvdXNlLm5hbWUpIHtcbi8vICAgICAgIGNoYW5nZWRGaWVsZHMucHVzaChcbi8vICAgICAgICAgYE5hbWU6ICR7b3JpZ2luYWxXYXJlaG91c2UubmFtZX0gdG8gJHt1cGRhdGVkV2FyZWhvdXNlLm5hbWV9YFxuLy8gICAgICAgKTtcbi8vICAgICB9XG4vLyAgICAgaWYgKG9yaWdpbmFsV2FyZWhvdXNlLmxvY2F0aW9uICE9PSB1cGRhdGVkV2FyZWhvdXNlLmxvY2F0aW9uKSB7XG4vLyAgICAgICBjaGFuZ2VkRmllbGRzLnB1c2goXG4vLyAgICAgICAgIGBMb2NhdGlvbjogJHtvcmlnaW5hbFdhcmVob3VzZS5sb2NhdGlvbn0gdG8gJHt1cGRhdGVkV2FyZWhvdXNlLmxvY2F0aW9ufWBcbi8vICAgICAgICk7XG4vLyAgICAgfVxuLy8gICAgIGlmIChcbi8vICAgICAgIG9yaWdpbmFsV2FyZWhvdXNlLnBlcnNvbl9pbmNoYXJnZSAhPT0gdXBkYXRlZFdhcmVob3VzZS5wZXJzb25faW5jaGFyZ2Vcbi8vICAgICApIHtcbi8vICAgICAgIGNoYW5nZWRGaWVsZHMucHVzaChcbi8vICAgICAgICAgYFBlcnNvbiBJbmNoYXJnZTogJHtvcmlnaW5hbFdhcmVob3VzZS5wZXJzb25faW5jaGFyZ2V9IHRvICR7dXBkYXRlZFdhcmVob3VzZS5wZXJzb25faW5jaGFyZ2V9YFxuLy8gICAgICAgKTtcbi8vICAgICB9XG4vLyAgICAgaWYgKG9yaWdpbmFsV2FyZWhvdXNlLnBob25lICE9PSB1cGRhdGVkV2FyZWhvdXNlLnBob25lKSB7XG4vLyAgICAgICBjaGFuZ2VkRmllbGRzLnB1c2goXG4vLyAgICAgICAgIGBQaG9uZTogJHtvcmlnaW5hbFdhcmVob3VzZS5waG9uZX0gdG8gJHt1cGRhdGVkV2FyZWhvdXNlLnBob25lfWBcbi8vICAgICAgICk7XG4vLyAgICAgfVxuLy8gICAgIGlmIChvcmlnaW5hbFdhcmVob3VzZS5zdGF0dXMgIT09IHVwZGF0ZWRXYXJlaG91c2Uuc3RhdHVzKSB7XG4vLyAgICAgICBjaGFuZ2VkRmllbGRzLnB1c2goXG4vLyAgICAgICAgIGBTdGF0dXM6ICR7b3JpZ2luYWxXYXJlaG91c2Uuc3RhdHVzfSB0byAke3VwZGF0ZWRXYXJlaG91c2Uuc3RhdHVzfWBcbi8vICAgICAgICk7XG4vLyAgICAgfVxuLy8gICAgIGF3YWl0IHdhcmVob3VzZVN0b3JlLnVwZGF0ZShwcm9wcy5lZGl0LnJvdy5pZCwgdXBkYXRlZFdhcmVob3VzZSk7XG4vLyAgICAgTm90aWZ5LmNyZWF0ZSh7XG4vLyAgICAgICB0eXBlOiBcIndhcm5pbmdcIixcbi8vICAgICAgIGljb246IFwiY2hlY2tcIixcbi8vICAgICAgIG1lc3NhZ2U6IGAgV2FyZWhvdXNlICR7cHJvcHMuZWRpdC5yb3cubmFtZX0gdXBkYXRlZCBzdWNjZXNzZnVsbHlgLFxuLy8gICAgICAgcG9zaXRpb246IFwidG9wXCIsXG4vLyAgICAgfSk7XG4vLyAgICAgZGlhbG9nLnZhbHVlID0gZmFsc2U7XG4vLyAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwMCkge1xuLy8gICAgICAgY29uc29sZS5sb2coXCJJbmdyZWRpZW50IHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5OlwiLCByZXNwb25zZS5kYXRhKTtcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byB1cGRhdGUgaW5ncmVkaWVudDpcIiwgcmVzcG9uc2UuZXJyb3IpO1xuLy8gICAgIH1cbi8vICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4vLyB9O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4ubXktY2FyZCB7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGFuaW1hdGlvbjogZmFkZUluIDAuM3MgZWFzZTtcbn1cblxuLmJ0bi1hZGQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICM0MmE1ZjUsICM0NzhlZDEpO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5iZy1ncmFkaWVudCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMwMGJmYTUsICMwMDc5NmIpO1xufVxuXG4uc2VwYXJhdG9yLWdyYWRpZW50IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjMDBiZmE1LCAjMDA3OTZiKTtcbn1cblxuLnEtYnRuIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XG59XG5cbi5xLWJ0bjpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtM3B4KTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xufVxuXG4uYnRuLWNhbmNlbCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgI2VmNTM1MCwgI2U1MzkzNSk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmJ0bi1jcmVhdGUge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICM2NmJiNmEsICM0M2EwNDcpO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5xLWFuaW1hdGUtYm91bmNlIHtcbiAgYW5pbWF0aW9uOiBib3VuY2VJbiAwLjZzIGVhc2U7XG59XG5cbkBrZXlmcmFtZXMgZmFkZUluIHtcbiAgZnJvbSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTBweCk7XG4gIH1cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgYm91bmNlSW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIH1cbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWJ0blxuICAgIEBjbGljaz1cImRlbGV0ZURpYWxvZ1wiXG4gICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgaWNvbj1cImRlbGV0ZVwiXG4gICAgc2l6ZT1cInNtXCJcbiAgICBmbGF0XG4gICAgcm91bmRcbiAgICBkZW5zZVxuICA+XG4gICAgPHEtdG9vbHRpcCBjbGFzcz1cImJnLW5lZ2F0aXZlXCIgOmRlbGF5PVwiMjAwXCI+RGVsZXRlPC9xLXRvb2x0aXA+XG4gIDwvcS1idG4+XG4gIDxxLWRpYWxvZyB2LW1vZGVsPVwiZGlhbG9nVmlzaWJsZVwiPlxuICAgIDxxLWNhcmQgY2xhc3M9XCJxLXBhLW1kIHEtcm91bmRlZCBxLWVsZXZhdGUtMiBiZy13aGl0ZSB0ZXh0LWdyZXktOVwiPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1wdC1ub25lIHEtcGItc21cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDUgcS1tYi14c1wiPkNvbmZpcm0gRGVsZXRpb248L2Rpdj5cbiAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LWJvZHkyIHEtbWItbm9uZVwiPlxuICAgICAgICAgIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBpdGVtPyBUaGlzIGFjdGlvbiBjYW5ub3QgYmVcbiAgICAgICAgICB1bmRvbmUuXG4gICAgICAgIDwvcD5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgIDxxLXNlcGFyYXRvciBjbGFzcz1cInEtbWItbWRcIiAvPlxuXG4gICAgICA8cS1jYXJkLWFjdGlvbnMgYWxpZ249XCJyaWdodFwiIGNsYXNzPVwicS1wdC1ub25lXCI+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGZsYXRcbiAgICAgICAgICBkZW5zZVxuICAgICAgICAgIGxhYmVsPVwiQ2FuY2VsXCJcbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgIHYtY2xvc2UtcG9wdXBcbiAgICAgICAgICBjbGFzcz1cInEtbXItc21cIlxuICAgICAgICAvPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBkZW5zZVxuICAgICAgICAgIGxhYmVsPVwiRGVsZXRlXCJcbiAgICAgICAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICAgICAgICBAY2xpY2s9XCJvbkRlbGV0ZVwiXG4gICAgICAgICAgY2xhc3M9XCJxLWJ0bi1yb3VuZGVkIHEtcHgtbGdcIlxuICAgICAgICAvPlxuICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VXYXJlaG91c2VzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy93YXJlaG91c2VcIjtcbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IE5vdGlmeSB9IGZyb20gXCJxdWFzYXJcIjtcblxuY29uc3Qgd2FyZWhvdXNlU3RvcmUgPSB1c2VXYXJlaG91c2VzU3RvcmUoKTtcbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHMoW1wiZGVsZXRlXCJdKTtcbmNvbnN0IGRpYWxvZ1Zpc2libGUgPSByZWYoZmFsc2UpO1xuY29uc3QgZGVsZXRlRGlhbG9nID0gKCkgPT4ge1xuICBkaWFsb2dWaXNpYmxlLnZhbHVlID0gdHJ1ZTtcbn07XG5cbmNvbnN0IG9uRGVsZXRlID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGF3YWl0IHdhcmVob3VzZVN0b3JlLmRlbGV0ZVdhcmVob3VzZShwcm9wcy5kZWxldGUucm93LmlkKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgaXRlbTpcIiwgZXJyb3IpO1xuICB9XG5cbiAgZGlhbG9nVmlzaWJsZS52YWx1ZSA9IGZhbHNlO1xufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLnEtY2FyZCB7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIGJveC1zaGFkb3c6IDAgOHB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4ucS1jYXJkLXNlY3Rpb24ge1xuICBwYWRkaW5nOiAyNHB4IDMycHg7XG59XG5cbi5xLWJ0biB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2UsIGJveC1zaGFkb3cgMC4ycyBlYXNlO1xufVxuXG4ucS1idG4tcm91bmRlZCB7XG4gIGJvcmRlci1yYWRpdXM6IDUwcHg7XG59XG5cbi5xLWJ0bjpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xufVxuXG4ucS1idG46YWN0aXZlIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICBib3gtc2hhZG93OiBub25lO1xufVxuXG4udGV4dC1oNSB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi50ZXh0LWJvZHkyIHtcbiAgY29sb3I6ICM2NjY7XG59XG5cbi5xLWVsZXZhdGUtMiB7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi5iZy13aGl0ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG59XG5cbi50ZXh0LWdyZXktOSB7XG4gIGNvbG9yOiAjMzMzO1xufVxuXG4ucS1zZXBhcmF0b3Ige1xuICBib3JkZXItY29sb3I6ICNlZWU7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGFsaWduPVwicmlnaHRcIj5cbiAgICA8cS1pbnB1dFxuICAgICAgdi1tb2RlbD1cImZpbHRlclwiXG4gICAgICBjbGFzcz1cInEtcGItbGcgcS1wbC1tZFwiXG4gICAgICBvdXRsaW5lZFxuICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgZmxhdFxuICAgICAgcm91bmRlZFxuICAgICAgZGVuc2VcbiAgICAgIGRlYm91bmNlPVwiMTAwXCJcbiAgICAgIHN0eWxlPVwid2lkdGg6IDUwMHB4OyBtYXgtd2lkdGg6IDE1MDBweDsgbWluLXdpZHRoOiAxMDBweFwiXG4gICAgPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgIDxxLWljb24gbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS1pbnB1dD5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzcGlubmVyLXdyYXBwZXJcIiB2LWlmPVwibG9hZGluZ1wiPlxuICAgIDxxLXNwaW5uZXItZG90cyBzaXplPVwiNTBweFwiIGNvbG9yPVwicHJpbWFyeVwiIC8+XG4gIDwvZGl2PlxuICA8ZGl2IHYtZWxzZT5cbiAgICA8ZGl2IHYtaWY9XCJmaWx0ZXJlZFJvd3MubGVuZ3RoID09PSAwXCIgY2xhc3M9XCJkYXRhLWVycm9yXCI+XG4gICAgICA8cS1pY29uIG5hbWU9XCJ3YXJuaW5nXCIgY29sb3I9XCJ3YXJuaW5nXCIgc2l6ZT1cIjRlbVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1tbC1zbSB0ZXh0LWg2XCI+Tm8gZGF0YSBhdmFpbGFibGU8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8cS10YWJsZVxuICAgICAgdi1lbHNlXG4gICAgICBjbGFzcz1cInRhYmxlLWNvbnRhaW5lciBlbGVnYW50LWNvbnRhaW5lciBzdGlja3ktaGVhZGVyXCJcbiAgICAgIDpmaWx0ZXI9XCJmaWx0ZXJcIlxuICAgICAgOnZpcnR1YWwtc2Nyb2xsLXN0aWNreS1zaXplLXN0YXJ0PVwiNDhcIlxuICAgICAgZmxhdFxuICAgICAgc3R5bGU9XCJoZWlnaHQ6IDQwMHB4XCJcbiAgICAgIDpjb2x1bW5zPVwid2FyZWhvdXNlQ29sdW1uc1wiXG4gICAgICA6cm93cz1cImZpbHRlcmVkUm93c1wiXG4gICAgICByb3cta2V5PVwibmFtZVwiXG4gICAgICB2aXJ0dWFsLXNjcm9sbFxuICAgICAgdi1tb2RlbDpwYWdpbmF0aW9uPVwicGFnaW5hdGlvblwiXG4gICAgICA6cm93cy1wZXItcGFnZS1vcHRpb25zPVwiWzBdXCJcbiAgICAgIGhpZGUtYm90dG9tXG4gICAgPlxuICAgICAgPHRlbXBsYXRlPlxuICAgICAgICA8cS10ZCBrZXk9XCJuYW1lXCIgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8YSBAY2xpY2sucHJldmVudD1cImdvVG9CcmFuY2gocHJvcHMucm93KVwiIGNsYXNzPVwid2FyZWhvdXNlLWxpbmtcIj5cbiAgICAgICAgICAgIHt7IHByb3BzLnJvdy5uYW1lIH19XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtc3RhdHVzPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQga2V5PVwibmFtZVwiIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPHEtYmFkZ2Ugb3V0bGluZSA6Y29sb3I9XCJnZXRCYWRnZUNvbG9yKHByb3BzLnJvdy5zdGF0dXMpXCI+XG4gICAgICAgICAgICB7eyBwcm9wcy5yb3cuc3RhdHVzIH19XG4gICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtYWN0aW9uPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktY2VudGVyIHEtZ3V0dGVyLXgtbWRcIj5cbiAgICAgICAgICAgIDxXYXJlaG91c2VFZGl0Q29tcG9uZW50IDplZGl0PVwicHJvcHNcIiAvPlxuICAgICAgICAgICAgPFdhcmVob3VzZURlbGV0ZUNvbXBvbmVudCA6ZGVsZXRlPVwicHJvcHNcIiAvPlxuICAgICAgICAgICAgPFdhcmVob3VzZUdvdG9Db21wb25lbnQgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L3EtdGFibGU+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBXYXJlaG91c2VFZGl0Q29tcG9uZW50IGZyb20gXCIuL1dhcmVob3VzZUVkaXRDb21wb25lbnQudnVlXCI7XG5pbXBvcnQgV2FyZWhvdXNlRGVsZXRlQ29tcG9uZW50IGZyb20gXCIuL1dhcmVob3VzZURlbGV0ZUNvbXBvbmVudC52dWVcIjtcbmltcG9ydCBXYXJlaG91c2VHb3RvQ29tcG9uZW50IGZyb20gXCIuL1dhcmVob3VzZUdvdG9Db21wb25lbnQudnVlXCI7XG5pbXBvcnQgeyByZWYsIG9uTW91bnRlZCwgY29tcHV0ZWQsIHdhdGNoIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgdXNlV2FyZWhvdXNlc1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvd2FyZWhvdXNlXCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwidnVlLXJvdXRlclwiO1xuaW1wb3J0IHsgTG9hZGluZyB9IGZyb20gXCJxdWFzYXJcIjtcblxuY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5jb25zdCB3YXJlaG91c2VTdG9yZSA9IHVzZVdhcmVob3VzZXNTdG9yZSgpO1xuY29uc3QgZmlsdGVyID0gcmVmKFwiXCIpO1xuY29uc3QgbG9hZGluZyA9IHJlZih0cnVlKTtcbmNvbnN0IHdhcmVob3VzZVJvdyA9IGNvbXB1dGVkKCgpID0+IHdhcmVob3VzZVN0b3JlLndhcmVob3VzZXMpO1xuY29uc3Qgc2hvd05vRGF0YU1lc3NhZ2UgPSByZWYoZmFsc2UpO1xuY29uc3QgcGFnaW5hdGlvbiA9IHJlZih7XG4gIHJvd1BlclBhZ2U6IDAsXG59KTtcblxuY29uc3QgZmlsdGVyZWRSb3dzID0gY29tcHV0ZWQoKCkgPT4ge1xuICBpZiAoIWZpbHRlci52YWx1ZSkge1xuICAgIHJldHVybiB3YXJlaG91c2VSb3cudmFsdWU7XG4gIH1cbiAgcmV0dXJuIHdhcmVob3VzZVJvdy52YWx1ZS5maWx0ZXIoKHJvdykgPT5cbiAgICByb3cubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGZpbHRlci52YWx1ZS50b0xvd2VyQ2FzZSgpKVxuICApO1xufSk7XG5cbm9uTW91bnRlZChhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHJlc2Fwb25zZSA9IGF3YWl0IHJlbG9hZFRhYmxlRGF0YSgpO1xuICBjb25zb2xlLmxvZyhcInJlc3Bpc25lIHdhcmVob3VzZVwiLCByZXNhcG9uc2UpO1xufSk7XG5cbmNvbnN0IHJlbG9hZFRhYmxlRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHdhcmVob3VzZVN0b3JlLmZldGNoV2FyZWhvdXNlcygpO1xuICAgIGlmICghd2FyZWhvdXNlUm93LnZhbHVlLmxlbmd0aCkge1xuICAgICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSB0cnVlO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcIndhd3JlaG91c2UgcmVzcG9cIiwgcmVzcG9uc2UpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gdHJ1ZTtcbiAgfSBmaW5hbGx5IHtcbiAgICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIH1cbn07XG5cbndhdGNoKGZpbHRlciwgYXN5bmMgKG5ld0ZpbHRlcikgPT4ge1xuICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpO1xuICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gZmlsdGVyZWRSb3dzLnZhbHVlLmxlbmd0aCA9PT0gMDtcbn0pO1xuXG4vLyBjb25zdCBmaWx0ZXJlZFdhcmVob3VzZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4vLyAgIGlmICghc2VhcmNoUXVlcnkudmFsdWUudHJpbSgpKSB7XG4vLyAgICAgcmV0dXJuIHdhcmVob3VzZVJvdy52YWx1ZTtcbi8vICAgfVxuLy8gICBjb25zdCBxdWVyeSA9IHNlYXJjaFF1ZXJ5LnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4vLyAgIHJldHVybiB3YXJlaG91c2VSb3cudmFsdWUuZmlsdGVyKCh3YXJlaG91c2UpID0+XG4vLyAgICAgT2JqZWN0LnZhbHVlcyh3YXJlaG91c2UpLnNvbWUoKHZhbHVlKSA9PlxuLy8gICAgICAgU3RyaW5nKHZhbHVlKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KVxuLy8gICAgIClcbi8vICAgKTtcbi8vIH0pO1xuXG4vLyB3YXRjaChzZWFyY2hRdWVyeSwgKCkgPT4ge1xuLy8gICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbi8vICAgc2V0VGltZW91dCgoKSA9PiB7XG4vLyAgICAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuLy8gICB9LCA1MDApOyAvLyBTaW11bGF0ZSBhIGRlbGF5IGZvciB0aGUgbG9hZGluZyBzcGlubmVyXG4vLyB9KTtcbi8vIGNvbnN0IHNlYXJjaCA9IGFzeW5jICgpID0+IHtcbi8vICAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4vLyAgIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gZmFsc2U7XG4vLyAgIHRyeSB7XG4vLyAgICAgYXdhaXQgd2FyZWhvdXNlU3RvcmUuc2VhcmNoV2FyZWhvdXNlKHNlYXJjaFF1ZXJ5LnZhbHVlKTtcbi8vICAgICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IHdhcmVob3VzZVJvdy52YWx1ZS5sZW5ndGggPT09IDA7XG4vLyAgIH0gY2F0Y2ggKGVycm9yKSB7XG4vLyAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHdhcmVob3VzZTpcIiwgZXJyb3IpO1xuLy8gICB9IGZpbmFsbHkge1xuLy8gICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbi8vICAgfVxuLy8gfTtcblxuLy8gd2F0Y2goc2VhcmNoUXVlcnksIChuZXdWYWx1ZSkgPT4ge1xuLy8gICBpZiAobmV3VmFsdWUudHJpbSgpICE9PSBcIlwiKSB7XG4vLyAgICAgc2VhcmNoKCk7XG4vLyAgIH0gZWxzZSB7XG4vLyAgICAgd2FyZWhvdXNlUm93LnZhbHVlID0gd2FyZWhvdXNlU3RvcmUuZmV0Y2hXYXJlaG91c2VzKCk7XG4vLyAgICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSB3YXJlaG91c2VSb3cudmFsdWUubGVuZ3RoID09PSAwO1xuLy8gICB9XG4vLyB9KTtcblxuLy8gb25Nb3VudGVkKGFzeW5jICgpID0+IHtcbi8vICAgdHJ5IHtcbi8vICAgICB3YXJlaG91c2VSb3cudmFsdWUgPSBhd2FpdCB3YXJlaG91c2VTdG9yZS5mZXRjaFdhcmVob3VzZXMoKTtcbi8vICAgICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IHdhcmVob3VzZVJvdy52YWx1ZS5sZW5ndGggPT09IDA7XG4vLyAgIH0gY2F0Y2ggKGVycm9yKSB7XG4vLyAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHdhcmVob3VzZTpcIiwgZXJyb3IpO1xuLy8gICAgIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gdHJ1ZTtcbi8vICAgfSBmaW5hbGx5IHtcbi8vICAgICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4vLyAgIH1cbi8vIH0pO1xuXG4vLyBjb25zdCBmaWx0ZXJlZFdhcmVob3VzZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4vLyAgIGlmICghc2VhcmNoUXVlcnkudmFsdWUudHJpbSgpKSB7XG4vLyAgICAgcmV0dXJuIHdhcmVob3VzZVJvdy52YWx1ZTtcbi8vICAgfVxuLy8gICBjb25zdCBxdWVyeSA9IHNlYXJjaFF1ZXJ5LnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4vLyAgIHJldHVybiB3YXJlaG91c2VSb3cudmFsdWUuZmlsdGVyKCh3YXJlaG91c2UpID0+XG4vLyAgICAgT2JqZWN0LnZhbHVlcyh3YXJlaG91c2UpLnNvbWUoKHZhbHVlKSA9PlxuLy8gICAgICAgU3RyaW5nKHZhbHVlKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KVxuLy8gICAgIClcbi8vICAgKTtcbi8vIH0pO1xuY29uc3Qgd2FyZWhvdXNlQ29sdW1ucyA9IFtcbiAge1xuICAgIG5hbWU6IFwibmFtZVwiLFxuICAgIGxhYmVsOiBcIk5hbWUgb2YgV2FyZWhvdXNlXCIsXG4gICAgYWxpZ246IFwibGVmdFwiLFxuICAgIGZpZWxkOiAocm93KSA9PiByb3cubmFtZSxcbiAgICBmb3JtYXQ6ICh2YWwpID0+IGAke3ZhbH1gLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJsb2NhdGlvblwiLFxuICAgIGxhYmVsOiBcIkxvY2F0aW9uXCIsXG4gICAgYWxpZ246IFwibGVmdFwiLFxuICAgIGZpZWxkOiBcImxvY2F0aW9uXCIsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInBlcnNvbl9pbmNoYXJnZVwiLFxuICAgIGxhYmVsOiBcIlBlcnNvbiBJbi1jaGFyZ2VcIixcbiAgICBhbGlnbjogXCJsZWZ0XCIsXG4gICAgZmllbGQ6IFwicGVyc29uX2luY2hhcmdlXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInBob25lXCIsXG4gICAgbGFiZWw6IFwiUGhvbmVcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogXCJwaG9uZVwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJzdGF0dXNcIixcbiAgICBsYWJlbDogXCJTdGF0dXNcIixcbiAgICBhbGlnbjogXCJsZWZ0XCIsXG4gICAgZmllbGQ6IFwic3RhdHVzXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImFjdGlvblwiLFxuICAgIGxhYmVsOiBcIkFjdGlvblwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiBcImFjdGlvblwiLFxuICB9LFxuXTtcblxuY29uc3QgZ2V0QmFkZ2VDb2xvciA9IChzdGF0dXMpID0+IHtcbiAgcmV0dXJuIHN0YXR1cyA9PT0gXCJPcGVuXCIgPyBcImluZm9cIiA6IFwiYWNjZW50XCI7XG59O1xuXG5jb25zdCBnb1RvV2FyZWhvdXNlID0gYXN5bmMgKGJyYW5jaCkgPT4ge1xuICBMb2FkaW5nLnNob3coKTtcbiAgdHJ5IHtcbiAgICBhd2FpdCByb3V0ZXIucHVzaCh7XG4gICAgICBuYW1lOiBcIkJyYW5jaERldGFpbFwiLFxuICAgICAgcGFyYW1zOiB7IGJyYW5jaF9pZDogYnJhbmNoLmlkIH0sXG4gICAgfSk7XG4gIH0gZmluYWxseSB7XG4gICAgTG9hZGluZy5oaWRlKCk7XG4gIH1cbn07XG48L3NjcmlwdD5cbjxzdHlsZSBzY29wZWQ+XG4uZWxlZ2FudC1jb250YWluZXIge1xuICBiYWNrZ3JvdW5kOiAjZjdmOGZjO1xuICBwYWRkaW5nOiAxcmVtO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG59XG4uYWJzb2x1dGUtZnVsbCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xufVxuLnNwaW5uZXItd3JhcHBlciB7XG4gIG1pbi1oZWlnaHQ6IDQwdmg7IC8qIE1pbmltdW0gaGVpZ2h0IG9mIDUwJSB2aWV3cG9ydCBoZWlnaHQgKi9cbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uZGF0YS1lcnJvciB7XG4gIG1pbi1oZWlnaHQ6IDQwdmg7IC8qIE1pbmltdW0gaGVpZ2h0IG9mIDUwJSB2aWV3cG9ydCBoZWlnaHQgKi9cbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4ud2FyZWhvdXNlLWxpbmsge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgY29sb3I6ICNlZjQ0NDQ7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IC8qIE5vIHVuZGVybGluZSBieSBkZWZhdWx0ICovXG59XG4ud2FyZWhvdXNlLWxpbms6aG92ZXIge1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogVW5kZXJsaW5lIG9uIGhvdmVyICovXG59XG4ud2FyZWhvdXNlLWxpbmsgLnRvb2x0aXAtdGV4dCB7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgd2lkdGg6IDEwMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTU1O1xuICBjb2xvcjogI2ZmZjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIHBhZGRpbmc6IDVweCAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDE7XG4gIGJvdHRvbTogMTI1JTtcbiAgbGVmdDogNTAlO1xuICBtYXJnaW4tbGVmdDogLTUwcHg7XG4gIG9wYWNpdHk6IDA7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcztcbn1cblxuLndhcmVob3VzZS1saW5rIC50b29sdGlwLXRleHQ6OmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDEwMCU7XG4gIGxlZnQ6IDUwJTtcbiAgbWFyZ2luLWxlZnQ6IC01cHg7XG4gIGJvcmRlci13aWR0aDogNXB4O1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICBib3JkZXItY29sb3I6ICM1NTU1NTUgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQ7XG59XG5cbi53YXJlaG91c2UtbGluazpob3ZlciAudG9vbHRpcC10ZXh0IHtcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgb3BhY2l0eTogMTtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPHEtYnRuXG4gICAgICBvdXRsaW5lXG4gICAgICBpY29uPVwiYWRkX2NpcmNsZVwiXG4gICAgICBsYWJlbD1cIkFkZCBXYXJlaG91c2VcIlxuICAgICAgQGNsaWNrPVwib3Blbl9hZGRpbmdfd2FyZWhvdXNlX2RpYWxvZ1wiXG4gICAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNlZjQ0NDRcIlxuICAgIC8+XG4gICAgPHEtZGlhbG9nXG4gICAgICB2LW1vZGVsPVwiYWRkV2FyZWhvdXNlRGlhbG9nVmlzaWJsZVwiXG4gICAgICBwZXJzaXN0ZW50XG4gICAgICB0cmFuc2l0aW9uLXNob3c9XCJqdW1wLXVwXCJcbiAgICAgIHRyYW5zaXRpb24taGlkZT1cImp1bXAtZG93blwiXG4gICAgPlxuICAgICAgPHEtY2FyZFxuICAgICAgICBjbGFzcz1cIm15LWNhcmQgcS1wYS1ub25lXCJcbiAgICAgICAgc3R5bGU9XCJcbiAgICAgICAgICB3aWR0aDogNDIwcHg7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDEycHggMjRweCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gICAgICAgIFwiXG4gICAgICA+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvblxuICAgICAgICAgIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBxLXB4LW1kIHEtcHktc20gYmctZ3JhZGllbnQgdGV4dC13aGl0ZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNSBxLW1yLW1kXCI+8J+PrSBBZGQgTmV3IFdhcmVob3VzZTwvZGl2PlxuICAgICAgICAgIDxxLXNwYWNlIC8+XG4gICAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgZGVuc2Ugcm91bmQgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8cS1zZXBhcmF0b3IgY2xhc3M9XCJzZXBhcmF0b3ItZ3JhZGllbnRcIiAvPlxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXB4LXhsIHEtcHQtbm9uZSBxLXBiLWxnXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbGcgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgICA8ZGl2Pk5hbWUgb2YgV2FyZWhvdXNlPC9kaXY+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICB2LW1vZGVsPVwiYWRkTmV3V2FyZWhvdXNlRm9ybS5uYW1lXCJcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+IHZhbCAmJiB2YWwubGVuZ3RoID4gMF1cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1tZCBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICAgIDxkaXY+TG9jYXRpb248L2Rpdj5cbiAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJhZGROZXdXYXJlaG91c2VGb3JtLmxvY2F0aW9uXCJcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+IHZhbCAmJiB2YWwubGVuZ3RoID4gMF1cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1tZCBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICAgIDxkaXY+UGVyc29uIEluLWNoYXJnZTwvZGl2PlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbD1cImFkZE5ld1dhcmVob3VzZUZvcm0ucGVyc29uX2luY2hhcmdlXCJcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+IHZhbCAmJiB2YWwubGVuZ3RoID4gMF1cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLXgtc20gcS1tdC1tZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC02IHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgICAgICA8ZGl2PlBob25lIE51bWJlcjwvZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJhZGROZXdXYXJlaG91c2VGb3JtLnBob25lXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgbWFzaz1cIigrNjMpICMjIyAtICMjIyAtICMjIyNcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiKCs2MykjIyMgLSAjIyMgLSAjIyMjXCJcbiAgICAgICAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gdmFsICYmIHZhbC5sZW5ndGggPiAwXVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNSBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICAgICAgPGRpdj5TdGF0dXM8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cImFkZE5ld1dhcmVob3VzZUZvcm0uc3RhdHVzXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgOm9wdGlvbnM9XCJ3YXJlaG91c2VTdGF0dXNcIlxuICAgICAgICAgICAgICAgIGhpZGUtZHJvcGRvd24taWNvblxuICAgICAgICAgICAgICAgIGJlaGF2aW9yPVwibWVudVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPCEtLSA8cS1zZXBhcmF0b3IgLz4gLS0+XG4gICAgICAgIDxxLWNhcmQtYWN0aW9ucyBjbGFzcz1cInJvdyBxLXB4LWxnIHEtcHktc20gcS1wdC1ub25lXCIgYWxpZ249XCJyaWdodFwiPlxuICAgICAgICAgIDxxLWJ0biBjbGFzcz1cImdsb3NzeVwiIGNvbG9yPVwiZ3JleS05XCIgbGFiZWw9XCJEaXNtaXNzXCIgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgY2xhc3M9XCJnbG9zc3lcIlxuICAgICAgICAgICAgY29sb3I9XCJ0ZWFsXCJcbiAgICAgICAgICAgIGxhYmVsPVwiQ3JlYXRlXCJcbiAgICAgICAgICAgIEBjbGljaz1cImNyZWF0ZVdhcmVob3VzZVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICAgIDwvcS1jYXJkPlxuICAgIDwvcS1kaWFsb2c+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgcmVhY3RpdmUgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyB1c2VXYXJlaG91c2VzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy93YXJlaG91c2VcIjtcblxuY29uc3Qgd2FyZWhvdXNlc1N0b3JlID0gdXNlV2FyZWhvdXNlc1N0b3JlKCk7XG5jb25zdCBhZGRXYXJlaG91c2VEaWFsb2dWaXNpYmxlID0gcmVmKGZhbHNlKTtcblxuY29uc3Qgd2FyZWhvdXNlU3RhdHVzID0gW1wiT3BlblwiLCBcIkNsb3NlXCJdO1xuY29uc3Qgb3Blbl9hZGRpbmdfd2FyZWhvdXNlX2RpYWxvZyA9ICgpID0+IHtcbiAgYWRkV2FyZWhvdXNlRGlhbG9nVmlzaWJsZS52YWx1ZSA9IHRydWU7XG59O1xuXG5jb25zdCBhZGROZXdXYXJlaG91c2VGb3JtID0gcmVhY3RpdmUoe1xuICBuYW1lOiBcIlwiLFxuICBsb2NhdGlvbjogXCJcIixcbiAgcGVyc29uX2luY2hhcmdlOiBcIlwiLFxuICBwaG9uZTogXCJcIixcbiAgc3RhdHVzOiBudWxsLFxufSk7XG5cbmNvbnN0IGNyZWF0ZVdhcmVob3VzZSA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBhd2FpdCB3YXJlaG91c2VzU3RvcmUuY3JlYXRlV2FyZWhvdXNlcyhhZGROZXdXYXJlaG91c2VGb3JtKTtcblxuICAgIHJlc2V0Rm9ybURhdGEoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY3JlYXRpbmcgd2FyZWhvdXNlOlwiLCBlcnJvcik7XG4gIH1cbiAgYWRkV2FyZWhvdXNlRGlhbG9nVmlzaWJsZS52YWx1ZSA9IGZhbHNlO1xufTtcblxuY29uc3QgcmVzZXRGb3JtRGF0YSA9ICgpID0+IHtcbiAgYWRkTmV3V2FyZWhvdXNlRm9ybS5uYW1lID0gXCJcIjtcbiAgYWRkTmV3V2FyZWhvdXNlRm9ybS5sb2NhdGlvbiA9IFwiXCI7XG4gIGFkZE5ld1dhcmVob3VzZUZvcm0ucGVyc29uX2luY2hhcmdlID0gXCJcIjtcbiAgYWRkTmV3V2FyZWhvdXNlRm9ybS5waG9uZSA9IFwiXCI7XG4gIGFkZE5ld1dhcmVob3VzZUZvcm0uc3RhdHVzID0gW1wiXCJdO1xufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLm15LWNhcmQge1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBhbmltYXRpb246IGZhZGVJbiAwLjNzIGVhc2U7XG59XG5cbi5idG4tYWRkIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjNDJhNWY1LCAjNDc4ZWQxKTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uYmctZ3JhZGllbnQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMDBiZmE1LCAjMDA3OTZiKTtcbn1cblxuLnNlcGFyYXRvci1ncmFkaWVudCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzAwYmZhNSwgIzAwNzk2Yik7XG59XG5cbi5xLWJ0biB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xufVxuXG4ucS1idG46aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcbn1cblxuLmJ0bi1jYW5jZWwge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNlZjUzNTAsICNlNTM5MzUpO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5idG4tY3JlYXRlIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjNjZiYjZhLCAjNDNhMDQ3KTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4ucS1hbmltYXRlLWJvdW5jZSB7XG4gIGFuaW1hdGlvbjogYm91bmNlSW4gMC42cyBlYXNlO1xufVxuXG5Aa2V5ZnJhbWVzIGZhZGVJbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwcHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIGJvdW5jZUluIHtcbiAgZnJvbSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7XG4gIH1cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICB9XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBGQSxVQUFNLGlCQUFpQixtQkFBa0I7QUFDekMsVUFBTSxTQUFTLElBQUksS0FBSztBQUV4QixVQUFNLGdCQUFnQixDQUFDLFFBQVEsUUFBUTtBQUN2QyxVQUFNLFFBQVE7QUFFZCxVQUFNLG9CQUFvQixTQUFTO0FBQUEsTUFDakMsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsaUJBQWlCO0FBQUEsTUFDakIsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLElBQ1YsQ0FBQztBQUVELFVBQU0sZUFBZSxNQUFNO0FBQ3pCLGFBQU8sT0FBTyxtQkFBbUIsTUFBTSxLQUFLLEdBQUc7QUFDL0MsYUFBTyxRQUFRO0FBQUEsSUFDakI7QUFFQSxVQUFNLHNCQUFzQixZQUFZO0FBQ3RDLFVBQUk7QUFDRixjQUFNLG1CQUFtQixFQUFFLEdBQUcsTUFBTSxLQUFLLEtBQUssR0FBRztBQUNqRCxjQUFNLGVBQWUsaUJBQWlCLE1BQU0sS0FBSyxJQUFJLElBQUksZ0JBQWdCO0FBQ3pFLGVBQU8sUUFBUTtBQUFBLE1BQ2hCLFNBQVEsT0FBUDtBQUNBLGdCQUFRLE1BQU0saUNBQWlDLEtBQUs7QUFBQSxNQUNyRDtBQUFBLElBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRUEsVUFBTSxpQkFBaUIsbUJBQWtCO0FBQ3pDLFVBQU0sUUFBUTtBQUNkLFVBQU0sZ0JBQWdCLElBQUksS0FBSztBQUMvQixVQUFNLGVBQWUsTUFBTTtBQUN6QixvQkFBYyxR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
