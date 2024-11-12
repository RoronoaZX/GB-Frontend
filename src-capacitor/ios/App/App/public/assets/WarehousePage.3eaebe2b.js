import { Q as QBadge } from "./QBadge.49245359.js";
import { _ as _export_sfc, n as ref, t as reactive, o as openBlock, a4 as createElementBlock, a as createVNode, w as withCtx, O as createTextVNode, M as QBtn, Q as QCard, I as QCardSection, af as withDirectives, a2 as QSeparator, J as createBaseVNode, K as QInput, aK as QCardActions, a3 as QDialog, a5 as Fragment, S as pushScopeId, T as popScopeId, c as createBlock, H as useRouter, g as computed, z as onMounted, u as watch, L as QIcon, R as toDisplayString, bd as QSpinner, a6 as renderList, be as createCommentVNode } from "./index.c8e2405b.js";
import { Q as QPage } from "./QPage.e43c6521.js";
import { Q as QSpinnerDots } from "./QSpinnerDots.c2e8b2d3.js";
import { Q as QTd } from "./QTd.f597934c.js";
import { Q as QTable } from "./QTable.d3fb87f5.js";
import { Q as QTooltip } from "./QTooltip.4a3eef22.js";
import { Q as QSpace } from "./QSpace.08c50700.js";
import { Q as QSelect } from "./QSelect.0985e28e.js";
import { C as ClosePopup } from "./ClosePopup.649d85d8.js";
import { u as useWarehousesStore } from "./warehouse.f8473ccb.js";
import { Q as QItem, a as QItemSection } from "./QItem.76557ad9.js";
import { Q as QList } from "./QList.d5d13fac.js";
import { u as useEmployeeStore } from "./employee.08e2bc37.js";
import "./QVirtualScroll.41a98cb7.js";
import "./use-virtual-scroll.5b4ab88d.js";
import "./rtl.b1b38f21.js";
import "./QMenu.4f670399.js";
import "./selection.94057980.js";
import "./axios.aa1bce92.js";
var WarehouseEditComponent_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$3 = (n) => (pushScopeId("data-v-174f64e8"), n = n(), popScopeId(), n);
const _hoisted_1$4 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F3ED} Edit Warehouse", -1));
const _hoisted_2$4 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_3$3 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "Name of Warehouse", -1));
const _hoisted_4$2 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_5$2 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "Location", -1));
const _hoisted_6$1 = { class: "q-mt-md q-animated q-animate-bounce" };
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
                    createBaseVNode("div", _hoisted_6$1, [
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
const _withScopeId$1 = (n) => (pushScopeId("data-v-5b63f038"), n = n(), popScopeId(), n);
const _hoisted_1$2 = {
  key: 0,
  class: "spinner-wrapper"
};
const _hoisted_2$2 = { key: 1 };
const _hoisted_3$2 = {
  key: 0,
  class: "data-error"
};
const _hoisted_4$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-ml-sm text-h6" }, "No data available", -1));
const _hoisted_5$1 = { class: "row justify-center q-gutter-x-md" };
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
    const formatFullname = (row) => {
      const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
      const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
      const middlename = row.middlename ? capitalize(row.middlename).charAt(0) + "." : "";
      const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";
      return `${firstname} ${middlename} ${lastname}`;
    };
    const capitalizeFirstLetter = (location) => {
      if (!location)
        return "";
      return location.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    };
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
        name: "personIncharge",
        label: "Person In-charge",
        align: "left",
        field: (row) => formatFullname(row)
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
        createBaseVNode("div", null, [
          createVNode(QInput, {
            modelValue: filter.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filter.value = $event),
            class: "q-pb-lg q-pl-sm dynamic-width",
            outlined: "",
            placeholder: "Search",
            flat: "",
            rounded: "",
            dense: "",
            debounce: "100"
          }, {
            append: withCtx(() => [
              createVNode(QIcon, { name: "search" })
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
          createVNode(QSpinnerDots, {
            size: "50px",
            color: "primary"
          })
        ])) : (openBlock(), createElementBlock("div", _hoisted_2$2, [
          filteredRows.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_3$2, [
            createVNode(QIcon, {
              name: "warning",
              color: "warning",
              size: "4em"
            }),
            _hoisted_4$1
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
            "onUpdate:pagination": _cache[1] || (_cache[1] = ($event) => pagination.value = $event),
            "rows-per-page-options": [0],
            "hide-bottom": ""
          }, {
            "body-cell-name": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(capitalizeFirstLetter(props.row.name)), 1)
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-location": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(capitalizeFirstLetter(props.row.location)), 1)
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-personIncharge": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(formatFullname(props.row.employees)), 1)
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
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
                  createBaseVNode("div", _hoisted_5$1, [
                    createVNode(WarehouseEditComponent, { edit: props }, null, 8, ["edit"]),
                    createVNode(WarehouseDeleteComponent, { delete: props }, null, 8, ["delete"]),
                    createVNode(WarehouseGotoComponent)
                  ])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            _: 1
          }, 8, ["filter", "rows", "pagination"]))
        ]))
      ], 64);
    };
  }
};
var WarehouseTableComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-5b63f038"], ["__file", "WarehouseTableComponent.vue"]]);
var WarehouseCreateComponent_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-b8d017b8"), n = n(), popScopeId(), n);
const _hoisted_1$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F3ED} Add New Warehouse", -1));
const _hoisted_2$1 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_3$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, "Name of Warehouse", -1));
const _hoisted_4 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, "Location", -1));
const _hoisted_6 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, "Person In-charge", -1));
const _hoisted_8 = {
  key: 0,
  class: "custom-list z-top"
};
const _hoisted_9 = { class: "row q-gutter-x-sm q-mt-md" };
const _hoisted_10 = { class: "col-6 q-animated q-animate-bounce" };
const _hoisted_11 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, "Phone Number", -1));
const _hoisted_12 = { class: "col-5 q-animated q-animate-bounce" };
const _hoisted_13 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, "Status", -1));
const _sfc_main$1 = {
  __name: "WarehouseCreateComponent",
  setup(__props) {
    const employeeStore = useEmployeeStore();
    const warehousesStore = useWarehousesStore();
    const addWarehouseDialogVisible = ref(false);
    const employees = computed(() => employeeStore.employee);
    const warehouseStatus = ["Open", "Close"];
    const open_adding_warehouse_dialog = () => {
      addWarehouseDialogVisible.value = true;
    };
    const searchKeyword = ref("");
    const showDropdown = ref(false);
    const loading = ref(false);
    const searchLoading = ref(false);
    const search = async () => {
      if (searchKeyword.value.trim()) {
        searchLoading.value = true;
        await employeeStore.searchCertainEmployee(searchKeyword.value);
        searchLoading.value = false;
        showDropdown.value = true;
      }
    };
    const autoFillEmployee = (employee) => {
      console.log("Selected Employee:", employee);
      addNewWarehouseForm.employee_id = employee.id;
      addNewWarehouseForm.employee_name = `${employee.firstname} ${employee.middlename ? employee.middlename.charAt(0) + "." : ""} ${employee.lastname}`;
      searchKeyword.value = `${employee.firstname} ${employee.middlename ? employee.middlename.charAt(0) + "." : ""} ${employee.lastname}`;
      showDropdown.value = false;
      console.log("Filled addNewBranchForm Data:", addNewWarehouseForm);
    };
    const formatFullname = (row) => {
      const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
      const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
      const middlename = row.middlename ? capitalize(row.middlename).charAt(0) + "." : "";
      const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";
      return `${firstname} ${middlename} ${lastname}`;
    };
    const addNewWarehouseForm = reactive({
      name: "",
      location: "",
      employee_id: "",
      employee_name: "",
      phone: "",
      status: null
    });
    const createWarehouse = async () => {
      console.log("awarehoouse data send", addNewWarehouseForm);
      loading.value = true;
      await warehousesStore.createWarehouses(addNewWarehouseForm);
      loading.value = false;
      resetFormData();
      addWarehouseDialogVisible.value = false;
    };
    const resetFormData = () => {
      addNewWarehouseForm.name = "";
      addNewWarehouseForm.location = "";
      addNewWarehouseForm.person_incharge = "";
      addNewWarehouseForm.phone = "";
      searchKeyword.value = null;
      addNewWarehouseForm.employee = "";
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
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => addWarehouseDialogVisible.value = $event),
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
                        class: "text-capitalize",
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
                        class: "text-capitalize",
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
                        modelValue: searchKeyword.value,
                        "onUpdate:modelValue": [
                          _cache[2] || (_cache[2] = ($event) => searchKeyword.value = $event),
                          search
                        ],
                        label: "Search Employee",
                        outlined: "",
                        dense: "",
                        debounce: "500",
                        placeholder: "Enter name or position",
                        onFocus: _cache[3] || (_cache[3] = ($event) => showDropdown.value = true)
                      }, {
                        append: withCtx(() => [
                          !searchLoading.value ? (openBlock(), createBlock(QIcon, {
                            key: 0,
                            name: "search"
                          })) : (openBlock(), createBlock(QSpinner, {
                            key: 1,
                            color: "grey",
                            size: "sm"
                          }))
                        ]),
                        default: withCtx(() => [
                          showDropdown.value && searchKeyword.value ? (openBlock(), createElementBlock("div", _hoisted_8, [
                            createVNode(QCard, null, {
                              default: withCtx(() => [
                                createVNode(QList, { separator: "" }, {
                                  default: withCtx(() => {
                                    var _a;
                                    return [
                                      !((_a = employees.value) == null ? void 0 : _a.length) ? (openBlock(), createBlock(QItem, { key: 0 }, {
                                        default: withCtx(() => [
                                          createTextVNode(" No Employee Record ")
                                        ]),
                                        _: 1
                                      })) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(employees.value, (employee) => {
                                        return openBlock(), createBlock(QItem, {
                                          onClick: ($event) => autoFillEmployee(employee),
                                          key: employee.id,
                                          clickable: ""
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(QItemSection, null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatFullname(employee)), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"]);
                                      }), 128))
                                    ];
                                  }),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ]),
                    createBaseVNode("div", _hoisted_9, [
                      createBaseVNode("div", _hoisted_10, [
                        _hoisted_11,
                        createVNode(QInput, {
                          modelValue: addNewWarehouseForm.phone,
                          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => addNewWarehouseForm.phone = $event),
                          outlined: "",
                          dense: "",
                          mask: "(+63) ### - ### - ####",
                          placeholder: "(+63)### - ### - ####",
                          rules: [(val) => val && val.length > 0]
                        }, null, 8, ["modelValue", "rules"])
                      ]),
                      createBaseVNode("div", _hoisted_12, [
                        _hoisted_13,
                        createVNode(QSelect, {
                          modelValue: addNewWarehouseForm.status,
                          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => addNewWarehouseForm.status = $event),
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
                      onClick: createWarehouse,
                      loading: loading.value
                    }, null, 8, ["loading"])
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
var WarehouseCreateComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-b8d017b8"], ["__file", "WarehouseCreateComponent.vue"]]);
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
var WarehousePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7966fcdc"], ["__file", "WarehousePage.vue"]]);
export { WarehousePage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FyZWhvdXNlUGFnZS4zZWFlYmUyYi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3Ivd2FyZWhvdXNlL2NvbXBvbmVudHMvV2FyZWhvdXNlRWRpdENvbXBvbmVudC52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci93YXJlaG91c2UvY29tcG9uZW50cy9XYXJlaG91c2VEZWxldGVDb21wb25lbnQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3Ivd2FyZWhvdXNlL2NvbXBvbmVudHMvV2FyZWhvdXNlVGFibGVDb21wb25lbnQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3Ivd2FyZWhvdXNlL2NvbXBvbmVudHMvV2FyZWhvdXNlQ3JlYXRlQ29tcG9uZW50LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLWJ0blxuICAgIGNvbG9yPVwicG9zaXRpdmVcIlxuICAgIGljb249XCJlZGl0XCJcbiAgICBzaXplPVwic21cIlxuICAgIGZsYXRcbiAgICByb3VuZFxuICAgIGRlbnNlXG4gICAgQGNsaWNrPVwib3BlbkVkaXRGb3JtXCJcbiAgPlxuICAgIDxxLXRvb2x0aXAgY2xhc3M9XCJiZy1wb3NpdGl2ZVwiIDpkZWxheT1cIjIwMFwiPkVkaXQ8L3EtdG9vbHRpcD5cbiAgPC9xLWJ0bj5cbiAgPHEtZGlhbG9nXG4gICAgdi1tb2RlbD1cImRpYWxvZ1wiXG4gICAgcGVyc2lzdGVudFxuICAgIHRyYW5zaXRpb24tc2hvdz1cImp1bXAtdXBcIlxuICAgIHRyYW5zaXRpb24taGlkZT1cImp1bXAtZG93blwiXG4gID5cbiAgICA8cS1jYXJkXG4gICAgICBjbGFzcz1cIm15LWNhcmQgcS1wYS1ub25lXCJcbiAgICAgIHN0eWxlPVwiXG4gICAgICAgIHdpZHRoOiA0MjBweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICAgICAgYm94LXNoYWRvdzogMCAxMnB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xuICAgICAgXCJcbiAgICA+XG4gICAgICA8cS1jYXJkLXNlY3Rpb25cbiAgICAgICAgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtcHgtbWQgcS1weS1zbSBiZy1ncmFkaWVudCB0ZXh0LXdoaXRlXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDUgcS1tci1tZFwiPvCfj60gRWRpdCBXYXJlaG91c2U8L2Rpdj5cbiAgICAgICAgPHEtc3BhY2UgLz5cbiAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgZGVuc2Ugcm91bmQgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLXNlcGFyYXRvciBjbGFzcz1cInNlcGFyYXRvci1ncmFkaWVudFwiIC8+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXB4LXhsIHEtcHQtbm9uZSBxLXBiLWxnXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LWxnIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgIDxkaXY+TmFtZSBvZiBXYXJlaG91c2U8L2Rpdj5cbiAgICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwiZWRpdFdhcmVob3VzZUZvcm0ubmFtZVwiIG91dGxpbmVkIGRlbnNlIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1tZCBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICA8ZGl2PkxvY2F0aW9uPC9kaXY+XG4gICAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cImVkaXRXYXJlaG91c2VGb3JtLmxvY2F0aW9uXCIgb3V0bGluZWQgZGVuc2UgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LW1kIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgIDxkaXY+UGVyc29uIEluLWNoYXJnZTwvZGl2PlxuICAgICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJlZGl0V2FyZWhvdXNlRm9ybS5wZXJzb25faW5jaGFyZ2VcIiBvdXRsaW5lZCBkZW5zZSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci14LXNtIHEtbXQtbWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTYgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgICA8ZGl2PlBob25lIE51bWJlcjwvZGl2PlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbD1cImVkaXRXYXJlaG91c2VGb3JtLnBob25lXCJcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgbWFzaz1cIigrNjMpICMjIyAtICMjIyAtICMjIyNcIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIigrNjMpIyMjIC0gIyMjIC0gIyMjI1wiXG4gICAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiB2YWwgJiYgdmFsLmxlbmd0aCA+IDBdXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC01IHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgICAgPGRpdj5TdGF0dXM8L2Rpdj5cbiAgICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgICB2LW1vZGVsPVwiZWRpdFdhcmVob3VzZUZvcm0uc3RhdHVzXCJcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgOm9wdGlvbnM9XCJzdGF0dXNPcHRpb25zXCJcbiAgICAgICAgICAgICAgYmVoYXZpb3I9XCJtZW51XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDwhLS0gPHEtc2VwYXJhdG9yIC8+IC0tPlxuICAgICAgPHEtY2FyZC1hY3Rpb25zIGNsYXNzPVwicm93IHEtcHgtbGcgcS1weS1zbSBxLXB0LW5vbmVcIiBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICAgIDxxLWJ0biBjbGFzcz1cImdsb3NzeVwiIGNvbG9yPVwiZ3JleS05XCIgbGFiZWw9XCJEaXNtaXNzXCIgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBjbGFzcz1cImdsb3NzeVwiXG4gICAgICAgICAgY29sb3I9XCJ0ZWFsXCJcbiAgICAgICAgICBsYWJlbD1cIlNhdmVcIlxuICAgICAgICAgIEBjbGljaz1cInNhdmVFZGl0ZWRXYXJlaG91c2VcIlxuICAgICAgICAvPlxuICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyB1c2VXYXJlaG91c2VzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy93YXJlaG91c2VcIjtcbmltcG9ydCB7IHJlZiwgcmVhY3RpdmUgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IHdhcmVob3VzZVN0b3JlID0gdXNlV2FyZWhvdXNlc1N0b3JlKCk7XG5jb25zdCBkaWFsb2cgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBzdGF0dXNPcHRpb25zID0gW1wiT3BlblwiLCBcIkNsb3NlZFwiXTtcbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHMoW1wiZWRpdFwiXSk7XG5cbmNvbnN0IGVkaXRXYXJlaG91c2VGb3JtID0gcmVhY3RpdmUoe1xuICBuYW1lOiBcIlwiLFxuICBsb2NhdGlvbjogXCJcIixcbiAgcGVyc29uX2luY2hhcmdlOiBcIlwiLFxuICBwaG9uZTogXCJcIixcbiAgc3RhdHVzOiBudWxsLFxufSk7XG5cbmNvbnN0IG9wZW5FZGl0Rm9ybSA9ICgpID0+IHtcbiAgT2JqZWN0LmFzc2lnbihlZGl0V2FyZWhvdXNlRm9ybSwgcHJvcHMuZWRpdC5yb3cpO1xuICBkaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcblxuY29uc3Qgc2F2ZUVkaXRlZFdhcmVob3VzZSA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB1cGRhdGVkV2FyZWhvdXNlID0geyAuLi5wcm9wcy5lZGl0LnJvdywgLi4uZWRpdFdhcmVob3VzZUZvcm0gfTtcbiAgICBhd2FpdCB3YXJlaG91c2VTdG9yZS51cGRhdGVXYXJlaG91c2VzKHByb3BzLmVkaXQucm93LmlkLCB1cGRhdGVkV2FyZWhvdXNlKTtcbiAgICBkaWFsb2cudmFsdWUgPSBmYWxzZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHVwZGF0ZSBpbmdyZWRpZW50czpcIiwgZXJyb3IpO1xuICB9XG59O1xuXG4vLyBjb25zdCBzYXZlRWRpdGVkV2FyZWhvdXNlID0gYXN5bmMgKCkgPT4ge1xuLy8gICB0cnkge1xuLy8gICAgIGNvbnN0IG9yaWdpbmFsV2FyZWhvdXNlID0gcHJvcHMuZWRpdC5yb3c7XG4vLyAgICAgY29uc3QgdXBkYXRlZFdhcmVob3VzZSA9IHtcbi8vICAgICAgIGlkOiBvcmlnaW5hbFdhcmVob3VzZS5pZCxcbi8vICAgICAgIG5hbWU6IGVkaXRXYXJlaG91c2VGb3JtLm5hbWUsXG4vLyAgICAgICBsb2NhdGlvbjogZWRpdFdhcmVob3VzZUZvcm0ubG9jYXRpb24sXG4vLyAgICAgICBwZXJzb25faW5jaGFyZ2U6IGVkaXRXYXJlaG91c2VGb3JtLnBlcnNvbl9pbmNoYXJnZSxcbi8vICAgICAgIHBob25lOiBlZGl0V2FyZWhvdXNlRm9ybS5waG9uZSxcbi8vICAgICAgIHN0YXR1czogZWRpdFdhcmVob3VzZUZvcm0uc3RhdHVzLFxuLy8gICAgIH07XG4vLyAgICAgY29uc3QgY2hhbmdlZEZpZWxkcyA9IFtdO1xuLy8gICAgIGlmIChvcmlnaW5hbFdhcmVob3VzZS5uYW1lICE9PSB1cGRhdGVkV2FyZWhvdXNlLm5hbWUpIHtcbi8vICAgICAgIGNoYW5nZWRGaWVsZHMucHVzaChcbi8vICAgICAgICAgYE5hbWU6ICR7b3JpZ2luYWxXYXJlaG91c2UubmFtZX0gdG8gJHt1cGRhdGVkV2FyZWhvdXNlLm5hbWV9YFxuLy8gICAgICAgKTtcbi8vICAgICB9XG4vLyAgICAgaWYgKG9yaWdpbmFsV2FyZWhvdXNlLmxvY2F0aW9uICE9PSB1cGRhdGVkV2FyZWhvdXNlLmxvY2F0aW9uKSB7XG4vLyAgICAgICBjaGFuZ2VkRmllbGRzLnB1c2goXG4vLyAgICAgICAgIGBMb2NhdGlvbjogJHtvcmlnaW5hbFdhcmVob3VzZS5sb2NhdGlvbn0gdG8gJHt1cGRhdGVkV2FyZWhvdXNlLmxvY2F0aW9ufWBcbi8vICAgICAgICk7XG4vLyAgICAgfVxuLy8gICAgIGlmIChcbi8vICAgICAgIG9yaWdpbmFsV2FyZWhvdXNlLnBlcnNvbl9pbmNoYXJnZSAhPT0gdXBkYXRlZFdhcmVob3VzZS5wZXJzb25faW5jaGFyZ2Vcbi8vICAgICApIHtcbi8vICAgICAgIGNoYW5nZWRGaWVsZHMucHVzaChcbi8vICAgICAgICAgYFBlcnNvbiBJbmNoYXJnZTogJHtvcmlnaW5hbFdhcmVob3VzZS5wZXJzb25faW5jaGFyZ2V9IHRvICR7dXBkYXRlZFdhcmVob3VzZS5wZXJzb25faW5jaGFyZ2V9YFxuLy8gICAgICAgKTtcbi8vICAgICB9XG4vLyAgICAgaWYgKG9yaWdpbmFsV2FyZWhvdXNlLnBob25lICE9PSB1cGRhdGVkV2FyZWhvdXNlLnBob25lKSB7XG4vLyAgICAgICBjaGFuZ2VkRmllbGRzLnB1c2goXG4vLyAgICAgICAgIGBQaG9uZTogJHtvcmlnaW5hbFdhcmVob3VzZS5waG9uZX0gdG8gJHt1cGRhdGVkV2FyZWhvdXNlLnBob25lfWBcbi8vICAgICAgICk7XG4vLyAgICAgfVxuLy8gICAgIGlmIChvcmlnaW5hbFdhcmVob3VzZS5zdGF0dXMgIT09IHVwZGF0ZWRXYXJlaG91c2Uuc3RhdHVzKSB7XG4vLyAgICAgICBjaGFuZ2VkRmllbGRzLnB1c2goXG4vLyAgICAgICAgIGBTdGF0dXM6ICR7b3JpZ2luYWxXYXJlaG91c2Uuc3RhdHVzfSB0byAke3VwZGF0ZWRXYXJlaG91c2Uuc3RhdHVzfWBcbi8vICAgICAgICk7XG4vLyAgICAgfVxuLy8gICAgIGF3YWl0IHdhcmVob3VzZVN0b3JlLnVwZGF0ZShwcm9wcy5lZGl0LnJvdy5pZCwgdXBkYXRlZFdhcmVob3VzZSk7XG4vLyAgICAgTm90aWZ5LmNyZWF0ZSh7XG4vLyAgICAgICB0eXBlOiBcIndhcm5pbmdcIixcbi8vICAgICAgIGljb246IFwiY2hlY2tcIixcbi8vICAgICAgIG1lc3NhZ2U6IGAgV2FyZWhvdXNlICR7cHJvcHMuZWRpdC5yb3cubmFtZX0gdXBkYXRlZCBzdWNjZXNzZnVsbHlgLFxuLy8gICAgICAgcG9zaXRpb246IFwidG9wXCIsXG4vLyAgICAgfSk7XG4vLyAgICAgZGlhbG9nLnZhbHVlID0gZmFsc2U7XG4vLyAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwMCkge1xuLy8gICAgICAgY29uc29sZS5sb2coXCJJbmdyZWRpZW50IHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5OlwiLCByZXNwb25zZS5kYXRhKTtcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byB1cGRhdGUgaW5ncmVkaWVudDpcIiwgcmVzcG9uc2UuZXJyb3IpO1xuLy8gICAgIH1cbi8vICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4vLyB9O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4ubXktY2FyZCB7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGFuaW1hdGlvbjogZmFkZUluIDAuM3MgZWFzZTtcbn1cblxuLmJ0bi1hZGQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICM0MmE1ZjUsICM0NzhlZDEpO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5iZy1ncmFkaWVudCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMwMGJmYTUsICMwMDc5NmIpO1xufVxuXG4uc2VwYXJhdG9yLWdyYWRpZW50IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjMDBiZmE1LCAjMDA3OTZiKTtcbn1cblxuLnEtYnRuIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XG59XG5cbi5xLWJ0bjpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtM3B4KTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xufVxuXG4uYnRuLWNhbmNlbCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgI2VmNTM1MCwgI2U1MzkzNSk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmJ0bi1jcmVhdGUge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICM2NmJiNmEsICM0M2EwNDcpO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5xLWFuaW1hdGUtYm91bmNlIHtcbiAgYW5pbWF0aW9uOiBib3VuY2VJbiAwLjZzIGVhc2U7XG59XG5cbkBrZXlmcmFtZXMgZmFkZUluIHtcbiAgZnJvbSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTBweCk7XG4gIH1cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgYm91bmNlSW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIH1cbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWJ0blxuICAgIEBjbGljaz1cImRlbGV0ZURpYWxvZ1wiXG4gICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgaWNvbj1cImRlbGV0ZVwiXG4gICAgc2l6ZT1cInNtXCJcbiAgICBmbGF0XG4gICAgcm91bmRcbiAgICBkZW5zZVxuICA+XG4gICAgPHEtdG9vbHRpcCBjbGFzcz1cImJnLW5lZ2F0aXZlXCIgOmRlbGF5PVwiMjAwXCI+RGVsZXRlPC9xLXRvb2x0aXA+XG4gIDwvcS1idG4+XG4gIDxxLWRpYWxvZyB2LW1vZGVsPVwiZGlhbG9nVmlzaWJsZVwiPlxuICAgIDxxLWNhcmQgY2xhc3M9XCJxLXBhLW1kIHEtcm91bmRlZCBxLWVsZXZhdGUtMiBiZy13aGl0ZSB0ZXh0LWdyZXktOVwiPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1wdC1ub25lIHEtcGItc21cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDUgcS1tYi14c1wiPkNvbmZpcm0gRGVsZXRpb248L2Rpdj5cbiAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LWJvZHkyIHEtbWItbm9uZVwiPlxuICAgICAgICAgIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBpdGVtPyBUaGlzIGFjdGlvbiBjYW5ub3QgYmVcbiAgICAgICAgICB1bmRvbmUuXG4gICAgICAgIDwvcD5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgIDxxLXNlcGFyYXRvciBjbGFzcz1cInEtbWItbWRcIiAvPlxuXG4gICAgICA8cS1jYXJkLWFjdGlvbnMgYWxpZ249XCJyaWdodFwiIGNsYXNzPVwicS1wdC1ub25lXCI+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGZsYXRcbiAgICAgICAgICBkZW5zZVxuICAgICAgICAgIGxhYmVsPVwiQ2FuY2VsXCJcbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgIHYtY2xvc2UtcG9wdXBcbiAgICAgICAgICBjbGFzcz1cInEtbXItc21cIlxuICAgICAgICAvPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBkZW5zZVxuICAgICAgICAgIGxhYmVsPVwiRGVsZXRlXCJcbiAgICAgICAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICAgICAgICBAY2xpY2s9XCJvbkRlbGV0ZVwiXG4gICAgICAgICAgY2xhc3M9XCJxLWJ0bi1yb3VuZGVkIHEtcHgtbGdcIlxuICAgICAgICAvPlxuICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VXYXJlaG91c2VzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy93YXJlaG91c2VcIjtcbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IE5vdGlmeSB9IGZyb20gXCJxdWFzYXJcIjtcblxuY29uc3Qgd2FyZWhvdXNlU3RvcmUgPSB1c2VXYXJlaG91c2VzU3RvcmUoKTtcbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHMoW1wiZGVsZXRlXCJdKTtcbmNvbnN0IGRpYWxvZ1Zpc2libGUgPSByZWYoZmFsc2UpO1xuY29uc3QgZGVsZXRlRGlhbG9nID0gKCkgPT4ge1xuICBkaWFsb2dWaXNpYmxlLnZhbHVlID0gdHJ1ZTtcbn07XG5cbmNvbnN0IG9uRGVsZXRlID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGF3YWl0IHdhcmVob3VzZVN0b3JlLmRlbGV0ZVdhcmVob3VzZShwcm9wcy5kZWxldGUucm93LmlkKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgaXRlbTpcIiwgZXJyb3IpO1xuICB9XG5cbiAgZGlhbG9nVmlzaWJsZS52YWx1ZSA9IGZhbHNlO1xufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLnEtY2FyZCB7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIGJveC1zaGFkb3c6IDAgOHB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4ucS1jYXJkLXNlY3Rpb24ge1xuICBwYWRkaW5nOiAyNHB4IDMycHg7XG59XG5cbi5xLWJ0biB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2UsIGJveC1zaGFkb3cgMC4ycyBlYXNlO1xufVxuXG4ucS1idG4tcm91bmRlZCB7XG4gIGJvcmRlci1yYWRpdXM6IDUwcHg7XG59XG5cbi5xLWJ0bjpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xufVxuXG4ucS1idG46YWN0aXZlIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICBib3gtc2hhZG93OiBub25lO1xufVxuXG4udGV4dC1oNSB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi50ZXh0LWJvZHkyIHtcbiAgY29sb3I6ICM2NjY7XG59XG5cbi5xLWVsZXZhdGUtMiB7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi5iZy13aGl0ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG59XG5cbi50ZXh0LWdyZXktOSB7XG4gIGNvbG9yOiAjMzMzO1xufVxuXG4ucS1zZXBhcmF0b3Ige1xuICBib3JkZXItY29sb3I6ICNlZWU7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxxLWlucHV0XG4gICAgICB2LW1vZGVsPVwiZmlsdGVyXCJcbiAgICAgIGNsYXNzPVwicS1wYi1sZyBxLXBsLXNtIGR5bmFtaWMtd2lkdGhcIlxuICAgICAgb3V0bGluZWRcbiAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgIGZsYXRcbiAgICAgIHJvdW5kZWRcbiAgICAgIGRlbnNlXG4gICAgICBkZWJvdW5jZT1cIjEwMFwiXG4gICAgPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgIDxxLWljb24gbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS1pbnB1dD5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzcGlubmVyLXdyYXBwZXJcIiB2LWlmPVwibG9hZGluZ1wiPlxuICAgIDxxLXNwaW5uZXItZG90cyBzaXplPVwiNTBweFwiIGNvbG9yPVwicHJpbWFyeVwiIC8+XG4gIDwvZGl2PlxuICA8ZGl2IHYtZWxzZT5cbiAgICA8ZGl2IHYtaWY9XCJmaWx0ZXJlZFJvd3MubGVuZ3RoID09PSAwXCIgY2xhc3M9XCJkYXRhLWVycm9yXCI+XG4gICAgICA8cS1pY29uIG5hbWU9XCJ3YXJuaW5nXCIgY29sb3I9XCJ3YXJuaW5nXCIgc2l6ZT1cIjRlbVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1tbC1zbSB0ZXh0LWg2XCI+Tm8gZGF0YSBhdmFpbGFibGU8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8cS10YWJsZVxuICAgICAgdi1lbHNlXG4gICAgICBjbGFzcz1cInRhYmxlLWNvbnRhaW5lciBlbGVnYW50LWNvbnRhaW5lciBzdGlja3ktaGVhZGVyXCJcbiAgICAgIDpmaWx0ZXI9XCJmaWx0ZXJcIlxuICAgICAgOnZpcnR1YWwtc2Nyb2xsLXN0aWNreS1zaXplLXN0YXJ0PVwiNDhcIlxuICAgICAgZmxhdFxuICAgICAgc3R5bGU9XCJoZWlnaHQ6IDQwMHB4XCJcbiAgICAgIDpjb2x1bW5zPVwid2FyZWhvdXNlQ29sdW1uc1wiXG4gICAgICA6cm93cz1cImZpbHRlcmVkUm93c1wiXG4gICAgICByb3cta2V5PVwibmFtZVwiXG4gICAgICB2aXJ0dWFsLXNjcm9sbFxuICAgICAgdi1tb2RlbDpwYWdpbmF0aW9uPVwicGFnaW5hdGlvblwiXG4gICAgICA6cm93cy1wZXItcGFnZS1vcHRpb25zPVwiWzBdXCJcbiAgICAgIGhpZGUtYm90dG9tXG4gICAgPlxuICAgICAgPCEtLSA8dGVtcGxhdGU+XG4gICAgICAgIDxxLXRkIGtleT1cIm5hbWVcIiA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgIDxhIEBjbGljay5wcmV2ZW50PVwiZ29Ub0JyYW5jaChwcm9wcy5yb3cpXCIgY2xhc3M9XCJ3YXJlaG91c2UtbGlua1wiPlxuICAgICAgICAgICAge3sgcHJvcHMucm93Lm5hbWUgfX1cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgIDwvdGVtcGxhdGU+IC0tPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtbmFtZT1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAge3sgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHByb3BzLnJvdy5uYW1lKSB9fVxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtbG9jYXRpb249XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgIHt7IGNhcGl0YWxpemVGaXJzdExldHRlcihwcm9wcy5yb3cubG9jYXRpb24pIH19XG4gICAgICAgIDwvcS10ZD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC1wZXJzb25JbmNoYXJnZT1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAge3sgZm9ybWF0RnVsbG5hbWUocHJvcHMucm93LmVtcGxveWVlcykgfX1cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLXN0YXR1cz1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIGtleT1cIm5hbWVcIiA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgIDxxLWJhZGdlIG91dGxpbmUgOmNvbG9yPVwiZ2V0QmFkZ2VDb2xvcihwcm9wcy5yb3cuc3RhdHVzKVwiPlxuICAgICAgICAgICAge3sgcHJvcHMucm93LnN0YXR1cyB9fVxuICAgICAgICAgIDwvcS1iYWRnZT5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLWFjdGlvbj1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWNlbnRlciBxLWd1dHRlci14LW1kXCI+XG4gICAgICAgICAgICA8V2FyZWhvdXNlRWRpdENvbXBvbmVudCA6ZWRpdD1cInByb3BzXCIgLz5cbiAgICAgICAgICAgIDxXYXJlaG91c2VEZWxldGVDb21wb25lbnQgOmRlbGV0ZT1cInByb3BzXCIgLz5cbiAgICAgICAgICAgIDxXYXJlaG91c2VHb3RvQ29tcG9uZW50IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9xLXRhYmxlPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgV2FyZWhvdXNlRWRpdENvbXBvbmVudCBmcm9tIFwiLi9XYXJlaG91c2VFZGl0Q29tcG9uZW50LnZ1ZVwiO1xuaW1wb3J0IFdhcmVob3VzZURlbGV0ZUNvbXBvbmVudCBmcm9tIFwiLi9XYXJlaG91c2VEZWxldGVDb21wb25lbnQudnVlXCI7XG5pbXBvcnQgV2FyZWhvdXNlR290b0NvbXBvbmVudCBmcm9tIFwiLi9XYXJlaG91c2VHb3RvQ29tcG9uZW50LnZ1ZVwiO1xuaW1wb3J0IHsgcmVmLCBvbk1vdW50ZWQsIGNvbXB1dGVkLCB3YXRjaCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IHVzZVdhcmVob3VzZXNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3dhcmVob3VzZVwiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcInZ1ZS1yb3V0ZXJcIjtcbmltcG9ydCB7IExvYWRpbmcgfSBmcm9tIFwicXVhc2FyXCI7XG5cbmNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuY29uc3Qgd2FyZWhvdXNlU3RvcmUgPSB1c2VXYXJlaG91c2VzU3RvcmUoKTtcbmNvbnN0IGZpbHRlciA9IHJlZihcIlwiKTtcbmNvbnN0IGxvYWRpbmcgPSByZWYodHJ1ZSk7XG5jb25zdCB3YXJlaG91c2VSb3cgPSBjb21wdXRlZCgoKSA9PiB3YXJlaG91c2VTdG9yZS53YXJlaG91c2VzKTtcbmNvbnN0IHNob3dOb0RhdGFNZXNzYWdlID0gcmVmKGZhbHNlKTtcbmNvbnN0IHBhZ2luYXRpb24gPSByZWYoe1xuICByb3dQZXJQYWdlOiAwLFxufSk7XG5cbmNvbnN0IGZpbHRlcmVkUm93cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgaWYgKCFmaWx0ZXIudmFsdWUpIHtcbiAgICByZXR1cm4gd2FyZWhvdXNlUm93LnZhbHVlO1xuICB9XG4gIHJldHVybiB3YXJlaG91c2VSb3cudmFsdWUuZmlsdGVyKChyb3cpID0+XG4gICAgcm93Lm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmaWx0ZXIudmFsdWUudG9Mb3dlckNhc2UoKSlcbiAgKTtcbn0pO1xuXG5vbk1vdW50ZWQoYXN5bmMgKCkgPT4ge1xuICBjb25zdCByZXNhcG9uc2UgPSBhd2FpdCByZWxvYWRUYWJsZURhdGEoKTtcbiAgY29uc29sZS5sb2coXCJyZXNwaXNuZSB3YXJlaG91c2VcIiwgcmVzYXBvbnNlKTtcbn0pO1xuXG5jb25zdCByZWxvYWRUYWJsZURhdGEgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB3YXJlaG91c2VTdG9yZS5mZXRjaFdhcmVob3VzZXMoKTtcbiAgICBpZiAoIXdhcmVob3VzZVJvdy52YWx1ZS5sZW5ndGgpIHtcbiAgICAgIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gdHJ1ZTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJ3YXdyZWhvdXNlIHJlc3BvXCIsIHJlc3BvbnNlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IHRydWU7XG4gIH0gZmluYWxseSB7XG4gICAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICB9XG59O1xuXG53YXRjaChmaWx0ZXIsIGFzeW5jIChuZXdGaWx0ZXIpID0+IHtcbiAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApKTtcbiAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IGZpbHRlcmVkUm93cy52YWx1ZS5sZW5ndGggPT09IDA7XG59KTtcblxuY29uc3QgZm9ybWF0RnVsbG5hbWUgPSAocm93KSA9PiB7XG4gIGNvbnN0IGNhcGl0YWxpemUgPSAoc3RyKSA9PlxuICAgIHN0ciA/IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKS50b0xvd2VyQ2FzZSgpIDogXCJcIjtcblxuICBjb25zdCBmaXJzdG5hbWUgPSByb3cuZmlyc3RuYW1lID8gY2FwaXRhbGl6ZShyb3cuZmlyc3RuYW1lKSA6IFwiTm8gRmlyc3RuYW1lXCI7XG4gIGNvbnN0IG1pZGRsZW5hbWUgPSByb3cubWlkZGxlbmFtZVxuICAgID8gY2FwaXRhbGl6ZShyb3cubWlkZGxlbmFtZSkuY2hhckF0KDApICsgXCIuXCJcbiAgICA6IFwiXCI7XG4gIGNvbnN0IGxhc3RuYW1lID0gcm93Lmxhc3RuYW1lID8gY2FwaXRhbGl6ZShyb3cubGFzdG5hbWUpIDogXCJObyBMYXN0bmFtZVwiO1xuXG4gIHJldHVybiBgJHtmaXJzdG5hbWV9ICR7bWlkZGxlbmFtZX0gJHtsYXN0bmFtZX1gO1xufTtcblxuY29uc3QgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyID0gKGxvY2F0aW9uKSA9PiB7XG4gIGlmICghbG9jYXRpb24pIHJldHVybiBcIlwiO1xuICByZXR1cm4gbG9jYXRpb25cbiAgICAuc3BsaXQoXCIgXCIpXG4gICAgLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSlcbiAgICAuam9pbihcIiBcIik7XG59O1xuXG4vLyBjb25zdCBmaWx0ZXJlZFdhcmVob3VzZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4vLyAgIGlmICghc2VhcmNoUXVlcnkudmFsdWUudHJpbSgpKSB7XG4vLyAgICAgcmV0dXJuIHdhcmVob3VzZVJvdy52YWx1ZTtcbi8vICAgfVxuLy8gICBjb25zdCBxdWVyeSA9IHNlYXJjaFF1ZXJ5LnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4vLyAgIHJldHVybiB3YXJlaG91c2VSb3cudmFsdWUuZmlsdGVyKCh3YXJlaG91c2UpID0+XG4vLyAgICAgT2JqZWN0LnZhbHVlcyh3YXJlaG91c2UpLnNvbWUoKHZhbHVlKSA9PlxuLy8gICAgICAgU3RyaW5nKHZhbHVlKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KVxuLy8gICAgIClcbi8vICAgKTtcbi8vIH0pO1xuXG4vLyB3YXRjaChzZWFyY2hRdWVyeSwgKCkgPT4ge1xuLy8gICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbi8vICAgc2V0VGltZW91dCgoKSA9PiB7XG4vLyAgICAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuLy8gICB9LCA1MDApOyAvLyBTaW11bGF0ZSBhIGRlbGF5IGZvciB0aGUgbG9hZGluZyBzcGlubmVyXG4vLyB9KTtcbi8vIGNvbnN0IHNlYXJjaCA9IGFzeW5jICgpID0+IHtcbi8vICAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4vLyAgIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gZmFsc2U7XG4vLyAgIHRyeSB7XG4vLyAgICAgYXdhaXQgd2FyZWhvdXNlU3RvcmUuc2VhcmNoV2FyZWhvdXNlKHNlYXJjaFF1ZXJ5LnZhbHVlKTtcbi8vICAgICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IHdhcmVob3VzZVJvdy52YWx1ZS5sZW5ndGggPT09IDA7XG4vLyAgIH0gY2F0Y2ggKGVycm9yKSB7XG4vLyAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHdhcmVob3VzZTpcIiwgZXJyb3IpO1xuLy8gICB9IGZpbmFsbHkge1xuLy8gICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbi8vICAgfVxuLy8gfTtcblxuLy8gd2F0Y2goc2VhcmNoUXVlcnksIChuZXdWYWx1ZSkgPT4ge1xuLy8gICBpZiAobmV3VmFsdWUudHJpbSgpICE9PSBcIlwiKSB7XG4vLyAgICAgc2VhcmNoKCk7XG4vLyAgIH0gZWxzZSB7XG4vLyAgICAgd2FyZWhvdXNlUm93LnZhbHVlID0gd2FyZWhvdXNlU3RvcmUuZmV0Y2hXYXJlaG91c2VzKCk7XG4vLyAgICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSB3YXJlaG91c2VSb3cudmFsdWUubGVuZ3RoID09PSAwO1xuLy8gICB9XG4vLyB9KTtcblxuLy8gb25Nb3VudGVkKGFzeW5jICgpID0+IHtcbi8vICAgdHJ5IHtcbi8vICAgICB3YXJlaG91c2VSb3cudmFsdWUgPSBhd2FpdCB3YXJlaG91c2VTdG9yZS5mZXRjaFdhcmVob3VzZXMoKTtcbi8vICAgICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IHdhcmVob3VzZVJvdy52YWx1ZS5sZW5ndGggPT09IDA7XG4vLyAgIH0gY2F0Y2ggKGVycm9yKSB7XG4vLyAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHdhcmVob3VzZTpcIiwgZXJyb3IpO1xuLy8gICAgIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gdHJ1ZTtcbi8vICAgfSBmaW5hbGx5IHtcbi8vICAgICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4vLyAgIH1cbi8vIH0pO1xuXG4vLyBjb25zdCBmaWx0ZXJlZFdhcmVob3VzZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4vLyAgIGlmICghc2VhcmNoUXVlcnkudmFsdWUudHJpbSgpKSB7XG4vLyAgICAgcmV0dXJuIHdhcmVob3VzZVJvdy52YWx1ZTtcbi8vICAgfVxuLy8gICBjb25zdCBxdWVyeSA9IHNlYXJjaFF1ZXJ5LnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4vLyAgIHJldHVybiB3YXJlaG91c2VSb3cudmFsdWUuZmlsdGVyKCh3YXJlaG91c2UpID0+XG4vLyAgICAgT2JqZWN0LnZhbHVlcyh3YXJlaG91c2UpLnNvbWUoKHZhbHVlKSA9PlxuLy8gICAgICAgU3RyaW5nKHZhbHVlKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KVxuLy8gICAgIClcbi8vICAgKTtcbi8vIH0pO1xuY29uc3Qgd2FyZWhvdXNlQ29sdW1ucyA9IFtcbiAge1xuICAgIG5hbWU6IFwibmFtZVwiLFxuICAgIGxhYmVsOiBcIk5hbWUgb2YgV2FyZWhvdXNlXCIsXG4gICAgYWxpZ246IFwibGVmdFwiLFxuICAgIGZpZWxkOiAocm93KSA9PiByb3cubmFtZSxcbiAgICBmb3JtYXQ6ICh2YWwpID0+IGAke3ZhbH1gLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJsb2NhdGlvblwiLFxuICAgIGxhYmVsOiBcIkxvY2F0aW9uXCIsXG4gICAgYWxpZ246IFwibGVmdFwiLFxuICAgIGZpZWxkOiBcImxvY2F0aW9uXCIsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInBlcnNvbkluY2hhcmdlXCIsXG4gICAgbGFiZWw6IFwiUGVyc29uIEluLWNoYXJnZVwiLFxuICAgIGFsaWduOiBcImxlZnRcIixcbiAgICBmaWVsZDogKHJvdykgPT4gZm9ybWF0RnVsbG5hbWUocm93KSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwicGhvbmVcIixcbiAgICBsYWJlbDogXCJQaG9uZVwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiBcInBob25lXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInN0YXR1c1wiLFxuICAgIGxhYmVsOiBcIlN0YXR1c1wiLFxuICAgIGFsaWduOiBcImxlZnRcIixcbiAgICBmaWVsZDogXCJzdGF0dXNcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYWN0aW9uXCIsXG4gICAgbGFiZWw6IFwiQWN0aW9uXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IFwiYWN0aW9uXCIsXG4gIH0sXG5dO1xuXG5jb25zdCBnZXRCYWRnZUNvbG9yID0gKHN0YXR1cykgPT4ge1xuICByZXR1cm4gc3RhdHVzID09PSBcIk9wZW5cIiA/IFwiaW5mb1wiIDogXCJhY2NlbnRcIjtcbn07XG5cbmNvbnN0IGdvVG9XYXJlaG91c2UgPSBhc3luYyAoYnJhbmNoKSA9PiB7XG4gIExvYWRpbmcuc2hvdygpO1xuICB0cnkge1xuICAgIGF3YWl0IHJvdXRlci5wdXNoKHtcbiAgICAgIG5hbWU6IFwiQnJhbmNoRGV0YWlsXCIsXG4gICAgICBwYXJhbXM6IHsgYnJhbmNoX2lkOiBicmFuY2guaWQgfSxcbiAgICB9KTtcbiAgfSBmaW5hbGx5IHtcbiAgICBMb2FkaW5nLmhpZGUoKTtcbiAgfVxufTtcbjwvc2NyaXB0PlxuPHN0eWxlIHNjb3BlZD5cbi5lbGVnYW50LWNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQ6ICNmN2Y4ZmM7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbn1cbi5hYnNvbHV0ZS1mdWxsIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG59XG4uc3Bpbm5lci13cmFwcGVyIHtcbiAgbWluLWhlaWdodDogNDB2aDsgLyogTWluaW11bSBoZWlnaHQgb2YgNTAlIHZpZXdwb3J0IGhlaWdodCAqL1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5kYXRhLWVycm9yIHtcbiAgbWluLWhlaWdodDogNDB2aDsgLyogTWluaW11bSBoZWlnaHQgb2YgNTAlIHZpZXdwb3J0IGhlaWdodCAqL1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi53YXJlaG91c2UtbGluayB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBjb2xvcjogI2VmNDQ0NDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTsgLyogTm8gdW5kZXJsaW5lIGJ5IGRlZmF1bHQgKi9cbn1cbi53YXJlaG91c2UtbGluazpob3ZlciB7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyAvKiBVbmRlcmxpbmUgb24gaG92ZXIgKi9cbn1cbi53YXJlaG91c2UtbGluayAudG9vbHRpcC10ZXh0IHtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICB3aWR0aDogMTAwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1NTU7XG4gIGNvbG9yOiAjZmZmO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgcGFkZGluZzogNXB4IDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogMTtcbiAgYm90dG9tOiAxMjUlO1xuICBsZWZ0OiA1MCU7XG4gIG1hcmdpbi1sZWZ0OiAtNTBweDtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzO1xufVxuXG4ud2FyZWhvdXNlLWxpbmsgLnRvb2x0aXAtdGV4dDo6YWZ0ZXIge1xuICBjb250ZW50OiBcIlwiO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMTAwJTtcbiAgbGVmdDogNTAlO1xuICBtYXJnaW4tbGVmdDogLTVweDtcbiAgYm9yZGVyLXdpZHRoOiA1cHg7XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG4gIGJvcmRlci1jb2xvcjogIzU1NTU1NSB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudDtcbn1cblxuLndhcmVob3VzZS1saW5rOmhvdmVyIC50b29sdGlwLXRleHQge1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICBvcGFjaXR5OiAxO1xufVxuLmR5bmFtaWMtd2lkdGgge1xuICB3aWR0aDogMTAwJTsgLyogZGVmYXVsdCB3aWR0aCAqL1xuICBtYXgtd2lkdGg6IDUwMHB4O1xuICBtaW4td2lkdGg6IDMwMHB4OyAvKiBzZXQgYSBtaW5pbXVtIHdpZHRoICovXG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiAxNTAwcHgpIHtcbiAgLmR5bmFtaWMtd2lkdGgge1xuICAgIG1heC13aWR0aDogNTAwcHg7IC8qIHNtYWxsZXIgd2lkdGggZm9yIG1lZGl1bS1zaXplZCBzY3JlZW5zICovXG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5keW5hbWljLXdpZHRoIHtcbiAgICBtYXgtd2lkdGg6IDUwMHB4OyAvKiBzbWFsbGVyIHdpZHRoIGZvciB0YWJsZXRzICovXG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDQ4MHB4KSB7XG4gIC5keW5hbWljLXdpZHRoIHtcbiAgICBtYXgtd2lkdGg6IDIwMHB4OyAvKiBzbWFsbGVyIHdpZHRoIGZvciBtb2JpbGUgc2NyZWVucyAqL1xuICB9XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxxLWJ0blxuICAgICAgb3V0bGluZVxuICAgICAgaWNvbj1cImFkZF9jaXJjbGVcIlxuICAgICAgbGFiZWw9XCJBZGQgV2FyZWhvdXNlXCJcbiAgICAgIEBjbGljaz1cIm9wZW5fYWRkaW5nX3dhcmVob3VzZV9kaWFsb2dcIlxuICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjZWY0NDQ0XCJcbiAgICAvPlxuICAgIDxxLWRpYWxvZ1xuICAgICAgdi1tb2RlbD1cImFkZFdhcmVob3VzZURpYWxvZ1Zpc2libGVcIlxuICAgICAgcGVyc2lzdGVudFxuICAgICAgdHJhbnNpdGlvbi1zaG93PVwianVtcC11cFwiXG4gICAgICB0cmFuc2l0aW9uLWhpZGU9XCJqdW1wLWRvd25cIlxuICAgID5cbiAgICAgIDxxLWNhcmRcbiAgICAgICAgY2xhc3M9XCJteS1jYXJkIHEtcGEtbm9uZVwiXG4gICAgICAgIHN0eWxlPVwiXG4gICAgICAgICAgd2lkdGg6IDQyMHB4O1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgICAgICAgYm94LXNoYWRvdzogMCAxMnB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xuICAgICAgICBcIlxuICAgICAgPlxuICAgICAgICA8cS1jYXJkLXNlY3Rpb25cbiAgICAgICAgICBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1weC1tZCBxLXB5LXNtIGJnLWdyYWRpZW50IHRleHQtd2hpdGVcIlxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDUgcS1tci1tZFwiPvCfj60gQWRkIE5ldyBXYXJlaG91c2U8L2Rpdj5cbiAgICAgICAgICA8cS1zcGFjZSAvPlxuICAgICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IGRlbnNlIHJvdW5kIHYtY2xvc2UtcG9wdXAgLz5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtc2VwYXJhdG9yIGNsYXNzPVwic2VwYXJhdG9yLWdyYWRpZW50XCIgLz5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1weC14bCBxLXB0LW5vbmUgcS1wYi1sZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LWxnIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgICAgPGRpdj5OYW1lIG9mIFdhcmVob3VzZTwvZGl2PlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgY2xhc3M9XCJ0ZXh0LWNhcGl0YWxpemVcIlxuICAgICAgICAgICAgICB2LW1vZGVsPVwiYWRkTmV3V2FyZWhvdXNlRm9ybS5uYW1lXCJcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+IHZhbCAmJiB2YWwubGVuZ3RoID4gMF1cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1tZCBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICAgIDxkaXY+TG9jYXRpb248L2Rpdj5cbiAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgIGNsYXNzPVwidGV4dC1jYXBpdGFsaXplXCJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cImFkZE5ld1dhcmVob3VzZUZvcm0ubG9jYXRpb25cIlxuICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gdmFsICYmIHZhbC5sZW5ndGggPiAwXVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LW1kIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgICAgPGRpdj5QZXJzb24gSW4tY2hhcmdlPC9kaXY+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICB2LW1vZGVsPVwic2VhcmNoS2V5d29yZFwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiU2VhcmNoIEVtcGxveWVlXCJcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cInNlYXJjaFwiXG4gICAgICAgICAgICAgIGRlYm91bmNlPVwiNTAwXCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBuYW1lIG9yIHBvc2l0aW9uXCJcbiAgICAgICAgICAgICAgQGZvY3VzPVwic2hvd0Ryb3Bkb3duID0gdHJ1ZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICAgICAgICAgIDxxLWljb24gdi1pZj1cIiFzZWFyY2hMb2FkaW5nXCIgbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICAgICAgICAgICAgPHEtc3Bpbm5lciB2LWVsc2UgY29sb3I9XCJncmV5XCIgc2l6ZT1cInNtXCIgLz5cbiAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHYtaWY9XCJzaG93RHJvcGRvd24gJiYgc2VhcmNoS2V5d29yZFwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJjdXN0b20tbGlzdCB6LXRvcFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8cS1jYXJkPlxuICAgICAgICAgICAgICAgICAgPHEtbGlzdCBzZXBhcmF0b3I+XG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0gdi1pZj1cIiFlbXBsb3llZXM/Lmxlbmd0aFwiPlxuICAgICAgICAgICAgICAgICAgICAgIE5vIEVtcGxveWVlIFJlY29yZFxuICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJhdXRvRmlsbEVtcGxveWVlKGVtcGxveWVlKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cImVtcGxveWVlIGluIGVtcGxveWVlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA6a2V5PVwiZW1wbG95ZWUuaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBmb3JtYXRGdWxsbmFtZShlbXBsb3llZSkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICA8L3EtbGlzdD5cbiAgICAgICAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci14LXNtIHEtbXQtbWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNiBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICAgICAgPGRpdj5QaG9uZSBOdW1iZXI8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiYWRkTmV3V2FyZWhvdXNlRm9ybS5waG9uZVwiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIG1hc2s9XCIoKzYzKSAjIyMgLSAjIyMgLSAjIyMjXCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIigrNjMpIyMjIC0gIyMjIC0gIyMjI1wiXG4gICAgICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+IHZhbCAmJiB2YWwubGVuZ3RoID4gMF1cIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTUgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgICAgIDxkaXY+U3RhdHVzPC9kaXY+XG4gICAgICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJhZGROZXdXYXJlaG91c2VGb3JtLnN0YXR1c1wiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIDpvcHRpb25zPVwid2FyZWhvdXNlU3RhdHVzXCJcbiAgICAgICAgICAgICAgICBoaWRlLWRyb3Bkb3duLWljb25cbiAgICAgICAgICAgICAgICBiZWhhdmlvcj1cIm1lbnVcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDwhLS0gPHEtc2VwYXJhdG9yIC8+IC0tPlxuICAgICAgICA8cS1jYXJkLWFjdGlvbnMgY2xhc3M9XCJyb3cgcS1weC1sZyBxLXB5LXNtIHEtcHQtbm9uZVwiIGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgICA8cS1idG4gY2xhc3M9XCJnbG9zc3lcIiBjb2xvcj1cImdyZXktOVwiIGxhYmVsPVwiRGlzbWlzc1wiIHYtY2xvc2UtcG9wdXAgLz5cbiAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgIGNsYXNzPVwiZ2xvc3N5XCJcbiAgICAgICAgICAgIGNvbG9yPVwidGVhbFwiXG4gICAgICAgICAgICBsYWJlbD1cIkNyZWF0ZVwiXG4gICAgICAgICAgICBAY2xpY2s9XCJjcmVhdGVXYXJlaG91c2VcIlxuICAgICAgICAgICAgOmxvYWRpbmc9XCJsb2FkaW5nXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L3EtY2FyZC1hY3Rpb25zPlxuICAgICAgPC9xLWNhcmQ+XG4gICAgPC9xLWRpYWxvZz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmLCByZWFjdGl2ZSwgY29tcHV0ZWQsIHdhdGNoLCBvbk1vdW50ZWQgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyB1c2VXYXJlaG91c2VzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy93YXJlaG91c2VcIjtcbmltcG9ydCB7IHVzZUVtcGxveWVlU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9lbXBsb3llZVwiO1xuXG5jb25zdCBlbXBsb3llZVN0b3JlID0gdXNlRW1wbG95ZWVTdG9yZSgpO1xuY29uc3Qgd2FyZWhvdXNlc1N0b3JlID0gdXNlV2FyZWhvdXNlc1N0b3JlKCk7XG5jb25zdCBhZGRXYXJlaG91c2VEaWFsb2dWaXNpYmxlID0gcmVmKGZhbHNlKTtcbmNvbnN0IGVtcGxveWVlcyA9IGNvbXB1dGVkKCgpID0+IGVtcGxveWVlU3RvcmUuZW1wbG95ZWUpO1xuY29uc3Qgd2FyZWhvdXNlU3RhdHVzID0gW1wiT3BlblwiLCBcIkNsb3NlXCJdO1xuY29uc3Qgb3Blbl9hZGRpbmdfd2FyZWhvdXNlX2RpYWxvZyA9ICgpID0+IHtcbiAgYWRkV2FyZWhvdXNlRGlhbG9nVmlzaWJsZS52YWx1ZSA9IHRydWU7XG59O1xuY29uc3Qgc2VhcmNoS2V5d29yZCA9IHJlZihcIlwiKTtcbmNvbnN0IHNob3dEcm9wZG93biA9IHJlZihmYWxzZSk7XG5jb25zdCBsb2FkaW5nID0gcmVmKGZhbHNlKTtcbmNvbnN0IHNlYXJjaExvYWRpbmcgPSByZWYoZmFsc2UpO1xuLy8gY29uc3QgZW1wbG95ZWVPcHRpb25zID0gcmVmKFtdKTtcbi8vIGNvbnN0IHNlbGVjdGVkRW1wbG95ZWUgPSByZWYobnVsbCk7XG4vLyBjb25zdCBmaWx0ZXJFbXBsb3llZU9wdGlvbnMgPSByZWYoZW1wbG95ZWVPcHRpb25zLnZhbHVlKTtcblxuY29uc3Qgc2VhcmNoID0gYXN5bmMgKCkgPT4ge1xuICBpZiAoc2VhcmNoS2V5d29yZC52YWx1ZS50cmltKCkpIHtcbiAgICBzZWFyY2hMb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgICBhd2FpdCBlbXBsb3llZVN0b3JlLnNlYXJjaENlcnRhaW5FbXBsb3llZShzZWFyY2hLZXl3b3JkLnZhbHVlKTtcbiAgICBzZWFyY2hMb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gICAgc2hvd0Ryb3Bkb3duLnZhbHVlID0gdHJ1ZTtcbiAgfVxufTtcblxuY29uc3QgYXV0b0ZpbGxFbXBsb3llZSA9IChlbXBsb3llZSkgPT4ge1xuICAvLyBMb2cgdGhlIHNlbGVjdGVkIGVtcGxveWVlIGRhdGFcbiAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBFbXBsb3llZTpcIiwgZW1wbG95ZWUpO1xuXG4gIGFkZE5ld1dhcmVob3VzZUZvcm0uZW1wbG95ZWVfaWQgPSBlbXBsb3llZS5pZDtcbiAgYWRkTmV3V2FyZWhvdXNlRm9ybS5lbXBsb3llZV9uYW1lID0gYCR7ZW1wbG95ZWUuZmlyc3RuYW1lfSAke1xuICAgIGVtcGxveWVlLm1pZGRsZW5hbWUgPyBlbXBsb3llZS5taWRkbGVuYW1lLmNoYXJBdCgwKSArIFwiLlwiIDogXCJcIlxuICB9ICR7ZW1wbG95ZWUubGFzdG5hbWV9YDtcbiAgc2VhcmNoS2V5d29yZC52YWx1ZSA9IGAke2VtcGxveWVlLmZpcnN0bmFtZX0gJHtcbiAgICBlbXBsb3llZS5taWRkbGVuYW1lID8gZW1wbG95ZWUubWlkZGxlbmFtZS5jaGFyQXQoMCkgKyBcIi5cIiA6IFwiXCJcbiAgfSAke2VtcGxveWVlLmxhc3RuYW1lfWA7XG5cbiAgc2hvd0Ryb3Bkb3duLnZhbHVlID0gZmFsc2U7XG4gIC8vIExvZyB0aGUgZmlsbGVkIGRlc2lnbmF0aW9uIGRhdGFcbiAgY29uc29sZS5sb2coXCJGaWxsZWQgYWRkTmV3QnJhbmNoRm9ybSBEYXRhOlwiLCBhZGROZXdXYXJlaG91c2VGb3JtKTtcbiAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG4gIC8vICAgc2VhcmNoS2V5d29yZC52YWx1ZSA9IG51bGw7XG4gIC8vIH0sIDApO1xufTtcblxuY29uc3QgZm9ybWF0RnVsbG5hbWUgPSAocm93KSA9PiB7XG4gIGNvbnN0IGNhcGl0YWxpemUgPSAoc3RyKSA9PlxuICAgIHN0ciA/IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKS50b0xvd2VyQ2FzZSgpIDogXCJcIjtcblxuICBjb25zdCBmaXJzdG5hbWUgPSByb3cuZmlyc3RuYW1lID8gY2FwaXRhbGl6ZShyb3cuZmlyc3RuYW1lKSA6IFwiTm8gRmlyc3RuYW1lXCI7XG4gIGNvbnN0IG1pZGRsZW5hbWUgPSByb3cubWlkZGxlbmFtZVxuICAgID8gY2FwaXRhbGl6ZShyb3cubWlkZGxlbmFtZSkuY2hhckF0KDApICsgXCIuXCJcbiAgICA6IFwiXCI7XG4gIGNvbnN0IGxhc3RuYW1lID0gcm93Lmxhc3RuYW1lID8gY2FwaXRhbGl6ZShyb3cubGFzdG5hbWUpIDogXCJObyBMYXN0bmFtZVwiO1xuXG4gIHJldHVybiBgJHtmaXJzdG5hbWV9ICR7bWlkZGxlbmFtZX0gJHtsYXN0bmFtZX1gO1xufTtcblxuLy8gb25Nb3VudGVkKGZldGNoRW1wbG95ZWUpO1xuXG4vLyBjb25zdCBmaWx0ZXJlZEVtcGxveWVlID0gKHZhbCwgdXBkYXRlKSA9PiB7XG4vLyAgIHVwZGF0ZSgoKSA9PiB7XG4vLyAgICAgY29uc3QgbmVlZGxlID0gdmFsLnRvTG93ZXJDYXNlKCk7XG4vLyAgICAgZmlsdGVyRW1wbG95ZWVPcHRpb25zLnZhbHVlID1cbi8vICAgICAgIHZhbCA9PT0gXCJcIlxuLy8gICAgICAgICA/IGVtcGxveWVlT3B0aW9ucy52YWx1ZVxuLy8gICAgICAgICA6IGVtcGxveWVlT3B0aW9ucy52YWx1ZS5maWx0ZXIoKHYpID0+XG4vLyAgICAgICAgICAgICB2LmxhYmVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobmVlZGxlKVxuLy8gICAgICAgICAgICk7XG4vLyAgIH0pO1xuLy8gfTtcblxuLy9yZWFjdGl2ZSB3YXJlaG91c2UgZm9ybVxuY29uc3QgYWRkTmV3V2FyZWhvdXNlRm9ybSA9IHJlYWN0aXZlKHtcbiAgbmFtZTogXCJcIixcbiAgbG9jYXRpb246IFwiXCIsXG4gIGVtcGxveWVlX2lkOiBcIlwiLFxuICBlbXBsb3llZV9uYW1lOiBcIlwiLFxuICBwaG9uZTogXCJcIixcbiAgc3RhdHVzOiBudWxsLFxufSk7XG5cbi8vY3JlYXRlIHdhcmVob3VzZVxuY29uc3QgY3JlYXRlV2FyZWhvdXNlID0gYXN5bmMgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhcImF3YXJlaG9vdXNlIGRhdGEgc2VuZFwiLCBhZGROZXdXYXJlaG91c2VGb3JtKTtcbiAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IHdhcmVob3VzZXNTdG9yZS5jcmVhdGVXYXJlaG91c2VzKGFkZE5ld1dhcmVob3VzZUZvcm0pO1xuICAvLyBjb25zb2xlLmxvZyhcInJlZHNzZGZzXCIsIHJlcyk7XG5cbiAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICByZXNldEZvcm1EYXRhKCk7XG4gIGFkZFdhcmVob3VzZURpYWxvZ1Zpc2libGUudmFsdWUgPSBmYWxzZTtcbn07XG5cbi8vcmVzZXQgdGhlIHdhcmVob3VzZSBmb3JtXG5jb25zdCByZXNldEZvcm1EYXRhID0gKCkgPT4ge1xuICBhZGROZXdXYXJlaG91c2VGb3JtLm5hbWUgPSBcIlwiO1xuICBhZGROZXdXYXJlaG91c2VGb3JtLmxvY2F0aW9uID0gXCJcIjtcbiAgYWRkTmV3V2FyZWhvdXNlRm9ybS5wZXJzb25faW5jaGFyZ2UgPSBcIlwiO1xuICBhZGROZXdXYXJlaG91c2VGb3JtLnBob25lID0gXCJcIjtcbiAgc2VhcmNoS2V5d29yZC52YWx1ZSA9IG51bGw7XG4gIGFkZE5ld1dhcmVob3VzZUZvcm0uZW1wbG95ZWUgPSBcIlwiO1xuICBhZGROZXdXYXJlaG91c2VGb3JtLnN0YXR1cyA9IFtcIlwiXTtcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5teS1jYXJkIHtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYW5pbWF0aW9uOiBmYWRlSW4gMC4zcyBlYXNlO1xufVxuXG4uYnRuLWFkZCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzQyYTVmNSwgIzQ3OGVkMSk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmJnLWdyYWRpZW50IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzAwYmZhNSwgIzAwNzk2Yik7XG59XG5cbi5zZXBhcmF0b3ItZ3JhZGllbnQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMwMGJmYTUsICMwMDc5NmIpO1xufVxuXG4ucS1idG4ge1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcbn1cblxuLnEtYnRuOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpO1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG5cbi5idG4tY2FuY2VsIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZWY1MzUwLCAjZTUzOTM1KTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uYnRuLWNyZWF0ZSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzY2YmI2YSwgIzQzYTA0Nyk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLnEtYW5pbWF0ZS1ib3VuY2Uge1xuICBhbmltYXRpb246IGJvdW5jZUluIDAuNnMgZWFzZTtcbn1cblxuQGtleWZyYW1lcyBmYWRlSW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMHB4KTtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIH1cbn1cblxuQGtleWZyYW1lcyBib3VuY2VJbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBGQSxVQUFNLGlCQUFpQixtQkFBa0I7QUFDekMsVUFBTSxTQUFTLElBQUksS0FBSztBQUV4QixVQUFNLGdCQUFnQixDQUFDLFFBQVEsUUFBUTtBQUN2QyxVQUFNLFFBQVE7QUFFZCxVQUFNLG9CQUFvQixTQUFTO0FBQUEsTUFDakMsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsaUJBQWlCO0FBQUEsTUFDakIsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLElBQ1YsQ0FBQztBQUVELFVBQU0sZUFBZSxNQUFNO0FBQ3pCLGFBQU8sT0FBTyxtQkFBbUIsTUFBTSxLQUFLLEdBQUc7QUFDL0MsYUFBTyxRQUFRO0FBQUEsSUFDakI7QUFFQSxVQUFNLHNCQUFzQixZQUFZO0FBQ3RDLFVBQUk7QUFDRixjQUFNLG1CQUFtQixFQUFFLEdBQUcsTUFBTSxLQUFLLEtBQUssR0FBRztBQUNqRCxjQUFNLGVBQWUsaUJBQWlCLE1BQU0sS0FBSyxJQUFJLElBQUksZ0JBQWdCO0FBQ3pFLGVBQU8sUUFBUTtBQUFBLE1BQ2hCLFNBQVEsT0FBUDtBQUNBLGdCQUFRLE1BQU0saUNBQWlDLEtBQUs7QUFBQSxNQUNyRDtBQUFBLElBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
