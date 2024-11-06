import { Q as QBadge } from "./QBadge.cf1023ef.js";
import { _ as _export_sfc, n as ref, t as reactive, z as onMounted, o as openBlock, a4 as createElementBlock, a as createVNode, M as QBtn, w as withCtx, Q as QCard, I as QCardSection, af as withDirectives, a2 as QSeparator, J as createBaseVNode, K as QInput, aK as QCardActions, a3 as QDialog, a5 as Fragment, N as Notify, O as pushScopeId, R as popScopeId, g as computed, a1 as createTextVNode, H as useRouter, u as watch, L as QIcon, c as createBlock, aJ as withModifiers, a0 as toDisplayString, P as Plugin } from "./index.9b9dbcba.js";
import { Q as QPage } from "./QPage.4b0a10d6.js";
import { Q as QSpace } from "./QSpace.5918deea.js";
import { Q as QSelect, a as QTd, b as QTable } from "./QTable.0bf3c36f.js";
import { C as ClosePopup } from "./ClosePopup.83fef54c.js";
import { u as useBranchesStore } from "./branch.5826bd8b.js";
import { u as useWarehousesStore } from "./warehouse.d9befe34.js";
import { Q as QSpinnerDots } from "./QSpinnerDots.4f44ad7f.js";
import { Q as QTooltip } from "./QTooltip.a17992ce.js";
import "./QVirtualScroll.3c7f7fea.js";
import "./QList.8d472d75.js";
import "./rtl.276c3f1b.js";
import "./QItemLabel.345b9721.js";
import "./QChip.d5fc407c.js";
import "./QItem.79579b05.js";
import "./QMenu.d2cee634.js";
import "./format.76edee29.js";
import "./axios.91431b0b.js";
var BranchesCreateComponent_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$3 = (n) => (pushScopeId("data-v-578a5ec8"), n = n(), popScopeId(), n);
const _hoisted_1$4 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F3EA} Add New Branch", -1));
const _hoisted_2$4 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_3$2 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_4$2 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_5$2 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_6$2 = { class: "row q-mt-lg q-gutter-x-sm justify-between" };
const _hoisted_7$2 = { class: "col-6 q-animated q-animate-bounce" };
const _hoisted_8$1 = { class: "col-5 q-animated q-animate-bounce" };
const _sfc_main$4 = {
  __name: "BranchesCreateComponent",
  setup(__props) {
    const addNewBranchDialogVisible = ref(false);
    const branchStore = useBranchesStore();
    const openAddingStoreBranchDialog = () => {
      addNewBranchDialogVisible.value = true;
    };
    const warehousesStore = useWarehousesStore();
    const warehouseOptions = ref([]);
    const filterWarehouseOptions = ref([]);
    const loading = ref(false);
    const statusOptions = ["Open", "Open soon", "Close"];
    const selectedWarehouse = ref(null);
    const addNewBranchForm = reactive({
      name: "",
      location: "",
      person_incharge: "",
      phone: "",
      status: ""
    });
    const fetchWarehouseData = async () => {
      loading.value = true;
      try {
        const warehouse = await warehousesStore.fetchWarehouses();
        warehouseOptions.value = warehousesStore.warehouses.map((val) => ({
          label: val.name,
          value: val.id
        }));
        filterWarehouseOptions.value = warehouseOptions.value;
      } catch (error) {
        console.error("Error fetching warehouse data:", error);
      } finally {
        loading.value = false;
      }
    };
    onMounted(fetchWarehouseData);
    const filterWarehouses = (val, update) => {
      update(() => {
        const needle = val.toLowerCase();
        filterWarehouseOptions.value = val === "" ? warehouseOptions.value : warehouseOptions.value.filter(
          (v) => v.label.toLowerCase().includes(needle)
        );
      });
    };
    const addNewBranch = async () => {
      var _a, _b, _c;
      try {
        const formData = {
          ...addNewBranchForm,
          warehouse_id: ((_a = selectedWarehouse.value) == null ? void 0 : _a.value) || null
        };
        const data = await branchStore.createBranches(formData);
        console.log(data);
        addNewBranchDialogVisible.value = false;
        resetFormData();
      } catch (error) {
        console.error("Error creating branch:", error);
        const errorMessage = ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.message) || error.message || "Failed to create branch. Please try again.";
        Notify.create({
          color: "negative",
          icon: "warning",
          message: errorMessage
        });
      }
    };
    const resetFormData = () => {
      addNewBranchForm.name = "";
      addNewBranchForm.location = "";
      addNewBranchForm.person_incharge = "";
      selectedWarehouse.value = null;
      addNewBranchForm.phone = "";
      addNewBranchForm.status = "";
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          class: "text-dark q-pa-sm",
          outline: "",
          dense: "",
          elevated: "",
          icon: "add_circle",
          label: "Add Store Branch",
          onClick: openAddingStoreBranchDialog,
          style: { "background-color": "#ef4444" }
        }),
        createVNode(QDialog, {
          modelValue: addNewBranchDialogVisible.value,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => addNewBranchDialogVisible.value = $event),
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
                      createVNode(QInput, {
                        modelValue: addNewBranchForm.name,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => addNewBranchForm.name = $event),
                        outlined: "",
                        dense: "",
                        label: "Branch Name",
                        rules: [(val) => val && val.length > 0 || "Name is required"]
                      }, null, 8, ["modelValue", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_3$2, [
                      createVNode(QInput, {
                        modelValue: addNewBranchForm.location,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => addNewBranchForm.location = $event),
                        outlined: "",
                        dense: "",
                        label: "Location",
                        rules: [(val) => val && val.length > 0 || "Label is required"]
                      }, null, 8, ["modelValue", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_4$2, [
                      createVNode(QInput, {
                        modelValue: addNewBranchForm.person_incharge,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => addNewBranchForm.person_incharge = $event),
                        outlined: "",
                        dense: "",
                        label: "Person In-charge",
                        rules: [
                          (val) => val && val.length > 0 || "Person In-charge is required"
                        ]
                      }, null, 8, ["modelValue", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_5$2, [
                      createVNode(QSelect, {
                        modelValue: selectedWarehouse.value,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => selectedWarehouse.value = $event),
                        clearable: "",
                        "use-input": "",
                        "input-debounce": "0",
                        options: filterWarehouseOptions.value,
                        "hide-dropdown-icon": "",
                        "stack-label": "",
                        outlined: "",
                        dense: "",
                        label: "Warehouse",
                        onFilter: filterWarehouses,
                        behavior: "menu"
                      }, null, 8, ["modelValue", "options"])
                    ]),
                    createBaseVNode("div", _hoisted_6$2, [
                      createBaseVNode("div", _hoisted_7$2, [
                        createVNode(QInput, {
                          modelValue: addNewBranchForm.phone,
                          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => addNewBranchForm.phone = $event),
                          outlined: "",
                          dense: "",
                          mask: "(+63) ### - ### - ####",
                          placeholder: "(+63) ### - ### - ####",
                          label: "Phone Number",
                          rules: [
                            (val) => val && val.length > 0 || "Phone number is required"
                          ]
                        }, null, 8, ["modelValue", "rules"])
                      ]),
                      createBaseVNode("div", _hoisted_8$1, [
                        createVNode(QSelect, {
                          modelValue: addNewBranchForm.status,
                          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => addNewBranchForm.status = $event),
                          outlined: "",
                          dense: "",
                          label: "Status",
                          options: statusOptions,
                          "hide-dropdown-icon": "",
                          behavior: "menu",
                          rules: [
                            (val) => val && val.length > 0 || "Status is required"
                          ]
                        }, null, 8, ["modelValue", "rules"])
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
                      onClick: addNewBranch
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
var BranchesCreate = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-578a5ec8"], ["__file", "BranchesCreateComponent.vue"]]);
var BranchesEditComponent_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-3cc2cbfe"), n = n(), popScopeId(), n);
const _hoisted_1$3 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F3EA} Edit Branch", -1));
const _hoisted_2$3 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_3$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, "Name of Branch", -1));
const _hoisted_4$1 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_5$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, "Location", -1));
const _hoisted_6$1 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_7$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, "Person In-charge", -1));
const _hoisted_8 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_9 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, "Under Warehouse", -1));
const _hoisted_10 = { class: "row q-gutter-x-sm justify-between q-mt-sm" };
const _hoisted_11 = { class: "col-6 q-animated q-animate-bounce" };
const _hoisted_12 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, "Phone Number", -1));
const _hoisted_13 = { class: "col-5 q-animated q-animate-bounce" };
const _hoisted_14 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, "Status", -1));
const _sfc_main$3 = {
  __name: "BranchesEditComponent",
  props: ["edit"],
  setup(__props) {
    const branchesStore = useBranchesStore();
    const warehousesStore = useWarehousesStore();
    const warehouses = computed(() => warehousesStore.warehouses);
    const props = __props;
    const dialog = ref(false);
    ref([]);
    let editRow = props.edit.row;
    const statusOptions = ["Open", "Open soon", "Close"];
    const editBranchesForm = reactive({
      name: "",
      location: "",
      person_incharge: "",
      warehouse_id: null,
      phone: "",
      status: null
    });
    const openEditForm = () => {
      var _a, _b;
      console.log("Edit Row Data:", editRow);
      editBranchesForm.name = editRow.name;
      editBranchesForm.location = editRow.location;
      editBranchesForm.person_incharge = editRow.person_incharge;
      editBranchesForm.warehouse_id = (editRow == null ? void 0 : editRow.warehouse_id) ? editRow.warehouse_id : ((_a = editRow == null ? void 0 : editRow.warehouse) == null ? void 0 : _a.id) ? (_b = editRow == null ? void 0 : editRow.warehouse) == null ? void 0 : _b.id : "";
      editBranchesForm.phone = editRow.phone;
      editBranchesForm.status = editRow.status;
      dialog.value = true;
      console.log("Edit Data:", editBranchesForm);
    };
    const saveEditedBranches = async () => {
      try {
        await branchesStore.updateBranches(editRow.id, editBranchesForm);
        dialog.value = false;
      } catch (error) {
        console.error("Error updating branch:", error);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          onClick: openEditForm,
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
          modelValue: dialog.value,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => dialog.value = $event),
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
                createVNode(QSeparator, { class: "separator-gradient" }),
                createVNode(QCardSection, { class: "q-px-xl q-pt-none q-pb-lg" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2$3, [
                      _hoisted_3$1,
                      createVNode(QInput, {
                        modelValue: editBranchesForm.name,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => editBranchesForm.name = $event),
                        outlined: "",
                        dense: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    createBaseVNode("div", _hoisted_4$1, [
                      _hoisted_5$1,
                      createVNode(QInput, {
                        modelValue: editBranchesForm.location,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => editBranchesForm.location = $event),
                        outlined: "",
                        dense: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    createBaseVNode("div", _hoisted_6$1, [
                      _hoisted_7$1,
                      createVNode(QInput, {
                        modelValue: editBranchesForm.person_incharge,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => editBranchesForm.person_incharge = $event),
                        outlined: "",
                        dense: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    createBaseVNode("div", _hoisted_8, [
                      _hoisted_9,
                      createVNode(QSelect, {
                        modelValue: editBranchesForm.warehouse_id,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => editBranchesForm.warehouse_id = $event),
                        "use-input": "",
                        "input-debounce": "0",
                        options: warehouses.value,
                        "stack-label": "",
                        outlined: "",
                        dense: "",
                        "emit-value": "",
                        "map-options": "",
                        "option-label": "name",
                        "option-value": "id"
                      }, null, 8, ["modelValue", "options"])
                    ]),
                    createBaseVNode("div", _hoisted_10, [
                      createBaseVNode("div", _hoisted_11, [
                        _hoisted_12,
                        createVNode(QInput, {
                          modelValue: editBranchesForm.phone,
                          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => editBranchesForm.phone = $event),
                          outlined: "",
                          dense: "",
                          mask: "(+63) ### - ### - ####",
                          placeholder: "(+63) ### - ### - ####",
                          rules: [(val) => val && val.length > 0]
                        }, null, 8, ["modelValue", "rules"])
                      ]),
                      createBaseVNode("div", _hoisted_13, [
                        _hoisted_14,
                        createVNode(QSelect, {
                          modelValue: editBranchesForm.status,
                          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => editBranchesForm.status = $event),
                          outlined: "",
                          dense: "",
                          options: statusOptions
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
                      onClick: saveEditedBranches
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
var BranchesEdit = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-3cc2cbfe"], ["__file", "BranchesEditComponent.vue"]]);
var BranchesDeleteComponent_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-c7365158"), n = n(), popScopeId(), n);
const _hoisted_1$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mb-xs" }, "Confirm Deletion", -1));
const _hoisted_2$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("p", { class: "text-body2 q-mb-none" }, " Are you sure you want to delete this item? This action cannot be undone. ", -1));
const _sfc_main$2 = {
  __name: "BranchesDeleteComponent",
  props: ["delete"],
  setup(__props) {
    const branchesStore = useBranchesStore();
    const dialogVisible = ref(false);
    const deleteDialog = () => {
      dialogVisible.value = true;
    };
    const props = __props;
    const onDelete = async () => {
      try {
        await branchesStore.deleteBranches(props.delete.row.id);
      } catch (error) {
        console.error(error.message);
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
                    _hoisted_1$2,
                    _hoisted_2$2
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
var BranchesDelete = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-c7365158"], ["__file", "BranchesDeleteComponent.vue"]]);
var BranchesTableComponent_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-37366d77"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { align: "right" };
const _hoisted_2$1 = {
  key: 0,
  class: "spinner-wrapper"
};
const _hoisted_3 = { key: 1 };
const _hoisted_4 = {
  key: 0,
  class: "data-error"
};
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-ml-sm text-h6" }, "No data available", -1));
const _hoisted_6 = ["onClick"];
const _hoisted_7 = { class: "row justify-center q-gutter-x-md" };
const _sfc_main$1 = {
  __name: "BranchesTableComponent",
  setup(__props) {
    const router = useRouter();
    const branchesStore = useBranchesStore();
    const warehousesStore = useWarehousesStore();
    const filter = ref("");
    const branchesRows = computed(() => branchesStore.branches);
    const loading = ref(true);
    const showNoDataMessage = ref(false);
    const pagination = ref({
      rowsPerPage: 0
    });
    const filteredRows = computed(() => {
      if (!filter.value) {
        return branchesRows.value;
      }
      const filterText = filter.value.toLowerCase();
      return branchesRows.value.filter((row) => {
        var _a;
        const name = row.name ? row.name.toLowerCase() : "";
        const warehouseName = ((_a = row == null ? void 0 : row.warehouse) == null ? void 0 : _a.name) ? row.warehouse.name.toLowerCase() : "";
        return name.includes(filterText) || warehouseName.includes(filterText);
      });
    });
    onMounted(async () => {
      await warehousesStore.fetchWarehouses();
      await reloadTableData();
    });
    const reloadTableData = async () => {
      loading.value = true;
      try {
        await branchesStore.fetchBranches();
        showNoDataMessage.value = branchesRows.value.length === 0;
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
    const branchesColumns = [
      {
        name: "branch_name",
        label: "Name of Branch",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true
      },
      {
        name: "warehouse",
        label: "Warehouse",
        align: "left",
        field: (row) => {
          var _a;
          return (_a = row == null ? void 0 : row.warehouse) != null ? _a : "No warehouse ";
        },
        sortable: true
      },
      {
        name: "location",
        label: "Location",
        align: "left",
        field: "location"
      },
      {
        name: "personIncharge",
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
        align: "center",
        field: "status"
      },
      {
        name: "action",
        label: "Action",
        align: "center",
        field: "action"
      }
    ];
    const getBadgeStatusColor = (status) => {
      switch (status) {
        case "Open":
          return "info";
        case "Open soon":
          return "warning";
        case "Close":
          return "accent";
        default:
          return "grey";
      }
    };
    const goToBranch = async (branch) => {
      Plugin.show();
      try {
        await router.push({
          name: "BranchDetail",
          params: { branch_id: branch.id }
        });
      } finally {
        Plugin.hide();
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$1, [
          createVNode(QInput, {
            class: "q-pb-lg q-pl-md",
            modelValue: filter.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filter.value = $event),
            outlined: "",
            placeholder: "Search",
            debounced: "1000",
            style: { "width": "500px", "max-width": "1500px", "min-width": "100px" },
            flat: "",
            dense: "",
            rounded: ""
          }, {
            append: withCtx(() => [
              createVNode(QIcon, { name: "search" })
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          createVNode(QSpinnerDots, {
            size: "50px",
            color: "primary"
          })
        ])) : (openBlock(), createElementBlock("div", _hoisted_3, [
          filteredRows.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_4, [
            createVNode(QIcon, {
              name: "warning",
              color: "warning",
              size: "4em"
            }),
            _hoisted_5
          ])) : (openBlock(), createBlock(QTable, {
            key: 1,
            class: "table-container elegant-container sticky-header",
            "virtual-scroll-sticky-size-start": 48,
            flat: "",
            style: { "height": "400px" },
            columns: branchesColumns,
            rows: filteredRows.value,
            "row-key": "name",
            "virtual-scroll": "",
            pagination: pagination.value,
            "onUpdate:pagination": _cache[1] || (_cache[1] = ($event) => pagination.value = $event),
            "rows-per-page-options": [0],
            "hide-bottom": ""
          }, {
            "body-cell-branch_name": withCtx((props) => [
              createVNode(QTd, {
                key: "name",
                props
              }, {
                default: withCtx(() => [
                  createBaseVNode("a", {
                    onClick: withModifiers(($event) => goToBranch(props.row), ["prevent"]),
                    class: "branch-link"
                  }, toDisplayString(props.row.name), 9, _hoisted_6)
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
                    color: getBadgeStatusColor(props.row.status)
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
                  createBaseVNode("div", _hoisted_7, [
                    createVNode(BranchesEdit, { edit: props }, null, 8, ["edit"]),
                    createVNode(BranchesDelete, { delete: props }, null, 8, ["delete"])
                  ])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            _: 1
          }, 8, ["rows", "pagination"]))
        ]))
      ], 64);
    };
  }
};
var BranchesTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-37366d77"], ["__file", "BranchesTableComponent.vue"]]);
var BranchesPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = { class: "text-h6 text-dark" };
const _hoisted_2 = { class: "q-gutter-x-sm" };
const _sfc_main = {
  __name: "BranchesPage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, {
        class: "elegant-container",
        flat: ""
      }, {
        default: withCtx(() => [
          createVNode(QCardSection, { class: "row justify-between" }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                createTextVNode(" \u{1F3EA} Branches "),
                createBaseVNode("div", _hoisted_2, [
                  createVNode(QBadge, {
                    outline: "",
                    label: "Open",
                    color: "info"
                  }),
                  createVNode(QBadge, {
                    outline: "",
                    label: "Open Soon",
                    color: "warning"
                  }),
                  createVNode(QBadge, {
                    outline: "",
                    label: "Close",
                    color: "accent"
                  })
                ])
              ]),
              createBaseVNode("div", null, [
                createVNode(BranchesCreate)
              ])
            ]),
            _: 1
          }),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", null, [
                createVNode(BranchesTable)
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
var BranchesPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2cc8fe8c"], ["__file", "BranchesPage.vue"]]);
export { BranchesPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnJhbmNoZXNQYWdlLmJiZjUxNmI2LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9icmFuY2hlcy9jb21wb25lbnRzL0JyYW5jaGVzQ3JlYXRlQ29tcG9uZW50LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL2JyYW5jaGVzL2NvbXBvbmVudHMvQnJhbmNoZXNFZGl0Q29tcG9uZW50LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL2JyYW5jaGVzL2NvbXBvbmVudHMvQnJhbmNoZXNEZWxldGVDb21wb25lbnQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvYnJhbmNoZXMvY29tcG9uZW50cy9CcmFuY2hlc1RhYmxlQ29tcG9uZW50LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLWJ0blxuICAgIGNsYXNzPVwidGV4dC1kYXJrIHEtcGEtc21cIlxuICAgIG91dGxpbmVcbiAgICBkZW5zZVxuICAgIGVsZXZhdGVkXG4gICAgaWNvbj1cImFkZF9jaXJjbGVcIlxuICAgIGxhYmVsPVwiQWRkIFN0b3JlIEJyYW5jaFwiXG4gICAgQGNsaWNrPVwib3BlbkFkZGluZ1N0b3JlQnJhbmNoRGlhbG9nXCJcbiAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNlZjQ0NDRcIlxuICAvPlxuICA8cS1kaWFsb2dcbiAgICB2LW1vZGVsPVwiYWRkTmV3QnJhbmNoRGlhbG9nVmlzaWJsZVwiXG4gICAgcGVyc2lzdGVudFxuICAgIHRyYW5zaXRpb24tc2hvdz1cImp1bXAtdXBcIlxuICAgIHRyYW5zaXRpb24taGlkZT1cImp1bXAtZG93blwiXG4gID5cbiAgICA8cS1jYXJkXG4gICAgICBjbGFzcz1cIm15LWNhcmQgcS1wYS1ub25lXCJcbiAgICAgIHN0eWxlPVwiXG4gICAgICAgIHdpZHRoOiA0MjBweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICAgICAgYm94LXNoYWRvdzogMCAxMnB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xuICAgICAgXCJcbiAgICA+XG4gICAgICA8cS1jYXJkLXNlY3Rpb25cbiAgICAgICAgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtcHgtbWQgcS1weS1zbSBiZy1ncmFkaWVudCB0ZXh0LXdoaXRlXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDUgcS1tci1tZFwiPvCfj6ogQWRkIE5ldyBCcmFuY2g8L2Rpdj5cbiAgICAgICAgPHEtc3BhY2UgLz5cbiAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgZGVuc2Ugcm91bmQgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLXNlcGFyYXRvciBjbGFzcz1cInNlcGFyYXRvci1ncmFkaWVudFwiIC8+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXB4LXhsIHEtcHQtbm9uZSBxLXBiLWxnXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LWxnIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICB2LW1vZGVsPVwiYWRkTmV3QnJhbmNoRm9ybS5uYW1lXCJcbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgbGFiZWw9XCJCcmFuY2ggTmFtZVwiXG4gICAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCkgfHwgJ05hbWUgaXMgcmVxdWlyZWQnXVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LWxnIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICB2LW1vZGVsPVwiYWRkTmV3QnJhbmNoRm9ybS5sb2NhdGlvblwiXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIGxhYmVsPVwiTG9jYXRpb25cIlxuICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+ICh2YWwgJiYgdmFsLmxlbmd0aCA+IDApIHx8ICdMYWJlbCBpcyByZXF1aXJlZCddXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbGcgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJhZGROZXdCcmFuY2hGb3JtLnBlcnNvbl9pbmNoYXJnZVwiXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIGxhYmVsPVwiUGVyc29uIEluLWNoYXJnZVwiXG4gICAgICAgICAgICA6cnVsZXM9XCJbXG4gICAgICAgICAgICAgICh2YWwpID0+XG4gICAgICAgICAgICAgICAgKHZhbCAmJiB2YWwubGVuZ3RoID4gMCkgfHwgJ1BlcnNvbiBJbi1jaGFyZ2UgaXMgcmVxdWlyZWQnLFxuICAgICAgICAgICAgXVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LWxnIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgdi1tb2RlbD1cInNlbGVjdGVkV2FyZWhvdXNlXCJcbiAgICAgICAgICAgIGNsZWFyYWJsZVxuICAgICAgICAgICAgdXNlLWlucHV0XG4gICAgICAgICAgICBpbnB1dC1kZWJvdW5jZT1cIjBcIlxuICAgICAgICAgICAgOm9wdGlvbnM9XCJmaWx0ZXJXYXJlaG91c2VPcHRpb25zXCJcbiAgICAgICAgICAgIGhpZGUtZHJvcGRvd24taWNvblxuICAgICAgICAgICAgc3RhY2stbGFiZWxcbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgbGFiZWw9XCJXYXJlaG91c2VcIlxuICAgICAgICAgICAgQGZpbHRlcj1cImZpbHRlcldhcmVob3VzZXNcIlxuICAgICAgICAgICAgYmVoYXZpb3I9XCJtZW51XCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLW10LWxnIHEtZ3V0dGVyLXgtc20ganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC02IHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbD1cImFkZE5ld0JyYW5jaEZvcm0ucGhvbmVcIlxuICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBtYXNrPVwiKCs2MykgIyMjIC0gIyMjIC0gIyMjI1wiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiKCs2MykgIyMjIC0gIyMjIC0gIyMjI1wiXG4gICAgICAgICAgICAgIGxhYmVsPVwiUGhvbmUgTnVtYmVyXCJcbiAgICAgICAgICAgICAgOnJ1bGVzPVwiW1xuICAgICAgICAgICAgICAgICh2YWwpID0+ICh2YWwgJiYgdmFsLmxlbmd0aCA+IDApIHx8ICdQaG9uZSBudW1iZXIgaXMgcmVxdWlyZWQnLFxuICAgICAgICAgICAgICBdXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC01IHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJhZGROZXdCcmFuY2hGb3JtLnN0YXR1c1wiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIGxhYmVsPVwiU3RhdHVzXCJcbiAgICAgICAgICAgICAgOm9wdGlvbnM9XCJzdGF0dXNPcHRpb25zXCJcbiAgICAgICAgICAgICAgaGlkZS1kcm9wZG93bi1pY29uXG4gICAgICAgICAgICAgIGJlaGF2aW9yPVwibWVudVwiXG4gICAgICAgICAgICAgIDpydWxlcz1cIltcbiAgICAgICAgICAgICAgICAodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnU3RhdHVzIGlzIHJlcXVpcmVkJyxcbiAgICAgICAgICAgICAgXVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLWFjdGlvbnMgY2xhc3M9XCJyb3cgcS1weC1sZyBxLXB5LXNtIHEtcHQtbm9uZVwiIGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgPHEtYnRuIGNsYXNzPVwiZ2xvc3N5XCIgY29sb3I9XCJncmV5LTlcIiBsYWJlbD1cIkRpc21pc3NcIiB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGNsYXNzPVwiZ2xvc3N5XCJcbiAgICAgICAgICBjb2xvcj1cInRlYWxcIlxuICAgICAgICAgIGxhYmVsPVwiQ3JlYXRlXCJcbiAgICAgICAgICBAY2xpY2s9XCJhZGROZXdCcmFuY2hcIlxuICAgICAgICAvPlxuICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYsIHJlYWN0aXZlLCBvbk1vdW50ZWQgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyB1c2VCcmFuY2hlc1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvYnJhbmNoXCI7XG5pbXBvcnQgeyB1c2VXYXJlaG91c2VzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy93YXJlaG91c2VcIjtcblxuY29uc3QgYWRkTmV3QnJhbmNoRGlhbG9nVmlzaWJsZSA9IHJlZihmYWxzZSk7XG5jb25zdCBicmFuY2hTdG9yZSA9IHVzZUJyYW5jaGVzU3RvcmUoKTtcblxuY29uc3Qgb3BlbkFkZGluZ1N0b3JlQnJhbmNoRGlhbG9nID0gKCkgPT4ge1xuICBhZGROZXdCcmFuY2hEaWFsb2dWaXNpYmxlLnZhbHVlID0gdHJ1ZTtcbn07XG5cbmNvbnN0IHdhcmVob3VzZXNTdG9yZSA9IHVzZVdhcmVob3VzZXNTdG9yZSgpO1xuY29uc3Qgd2FyZWhvdXNlT3B0aW9ucyA9IHJlZihbXSk7XG5jb25zdCBmaWx0ZXJXYXJlaG91c2VPcHRpb25zID0gcmVmKFtdKTtcbmNvbnN0IGxvYWRpbmcgPSByZWYoZmFsc2UpO1xuY29uc3Qgc3RhdHVzT3B0aW9ucyA9IFtcIk9wZW5cIiwgXCJPcGVuIHNvb25cIiwgXCJDbG9zZVwiXTtcblxuY29uc3Qgc2VsZWN0ZWRXYXJlaG91c2UgPSByZWYobnVsbCk7XG5cbmNvbnN0IGFkZE5ld0JyYW5jaEZvcm0gPSByZWFjdGl2ZSh7XG4gIG5hbWU6IFwiXCIsXG4gIGxvY2F0aW9uOiBcIlwiLFxuICBwZXJzb25faW5jaGFyZ2U6IFwiXCIsXG4gIHBob25lOiBcIlwiLFxuICBzdGF0dXM6IFwiXCIsXG59KTtcblxuY29uc3QgZmV0Y2hXYXJlaG91c2VEYXRhID0gYXN5bmMgKCkgPT4ge1xuICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgdHJ5IHtcbiAgICBjb25zdCB3YXJlaG91c2UgPSBhd2FpdCB3YXJlaG91c2VzU3RvcmUuZmV0Y2hXYXJlaG91c2VzKCk7XG5cbiAgICB3YXJlaG91c2VPcHRpb25zLnZhbHVlID0gd2FyZWhvdXNlc1N0b3JlLndhcmVob3VzZXMubWFwKCh2YWwpID0+ICh7XG4gICAgICBsYWJlbDogdmFsLm5hbWUsXG4gICAgICB2YWx1ZTogdmFsLmlkLFxuICAgIH0pKTtcbiAgICBmaWx0ZXJXYXJlaG91c2VPcHRpb25zLnZhbHVlID0gd2FyZWhvdXNlT3B0aW9ucy52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgd2FyZWhvdXNlIGRhdGE6XCIsIGVycm9yKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIH1cbn07XG5cbm9uTW91bnRlZChmZXRjaFdhcmVob3VzZURhdGEpO1xuXG5jb25zdCBmaWx0ZXJXYXJlaG91c2VzID0gKHZhbCwgdXBkYXRlKSA9PiB7XG4gIHVwZGF0ZSgoKSA9PiB7XG4gICAgY29uc3QgbmVlZGxlID0gdmFsLnRvTG93ZXJDYXNlKCk7XG4gICAgZmlsdGVyV2FyZWhvdXNlT3B0aW9ucy52YWx1ZSA9XG4gICAgICB2YWwgPT09IFwiXCJcbiAgICAgICAgPyB3YXJlaG91c2VPcHRpb25zLnZhbHVlXG4gICAgICAgIDogd2FyZWhvdXNlT3B0aW9ucy52YWx1ZS5maWx0ZXIoKHYpID0+XG4gICAgICAgICAgICB2LmxhYmVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobmVlZGxlKVxuICAgICAgICAgICk7XG4gIH0pO1xufTtcblxuY29uc3QgYWRkTmV3QnJhbmNoID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGZvcm1EYXRhID0ge1xuICAgICAgLi4uYWRkTmV3QnJhbmNoRm9ybSxcbiAgICAgIHdhcmVob3VzZV9pZDogc2VsZWN0ZWRXYXJlaG91c2UudmFsdWU/LnZhbHVlIHx8IG51bGwsXG4gICAgfTtcblxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBicmFuY2hTdG9yZS5jcmVhdGVCcmFuY2hlcyhmb3JtRGF0YSk7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICBhZGROZXdCcmFuY2hEaWFsb2dWaXNpYmxlLnZhbHVlID0gZmFsc2U7XG4gICAgcmVzZXRGb3JtRGF0YSgpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjcmVhdGluZyBicmFuY2g6XCIsIGVycm9yKTtcbiAgICBjb25zdCBlcnJvck1lc3NhZ2UgPVxuICAgICAgZXJyb3IucmVzcG9uc2U/LmRhdGE/Lm1lc3NhZ2UgfHxcbiAgICAgIGVycm9yLm1lc3NhZ2UgfHxcbiAgICAgIFwiRmFpbGVkIHRvIGNyZWF0ZSBicmFuY2guIFBsZWFzZSB0cnkgYWdhaW4uXCI7XG4gICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICBjb2xvcjogXCJuZWdhdGl2ZVwiLFxuICAgICAgaWNvbjogXCJ3YXJuaW5nXCIsXG4gICAgICBtZXNzYWdlOiBlcnJvck1lc3NhZ2UsXG4gICAgfSk7XG4gIH1cbn07XG5cbmNvbnN0IHJlc2V0Rm9ybURhdGEgPSAoKSA9PiB7XG4gIGFkZE5ld0JyYW5jaEZvcm0ubmFtZSA9IFwiXCI7XG4gIGFkZE5ld0JyYW5jaEZvcm0ubG9jYXRpb24gPSBcIlwiO1xuICBhZGROZXdCcmFuY2hGb3JtLnBlcnNvbl9pbmNoYXJnZSA9IFwiXCI7XG4gIHNlbGVjdGVkV2FyZWhvdXNlLnZhbHVlID0gbnVsbDtcbiAgYWRkTmV3QnJhbmNoRm9ybS5waG9uZSA9IFwiXCI7XG4gIGFkZE5ld0JyYW5jaEZvcm0uc3RhdHVzID0gXCJcIjtcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5teS1jYXJkIHtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYW5pbWF0aW9uOiBmYWRlSW4gMC4zcyBlYXNlO1xufVxuXG4uYnRuLWFkZCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzAwMDAwMCwgIzAwMDAwMCk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmJnLWdyYWRpZW50IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzAwYmZhNSwgIzAwNzk2Yik7XG59XG5cbi5zZXBhcmF0b3ItZ3JhZGllbnQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMwMGJmYTUsICMwMDc5NmIpO1xufVxuXG4ucS1idG4ge1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcbn1cblxuLnEtYnRuOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpO1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG5cbi5idG4tY2FuY2VsIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZWY1MzUwLCAjZTUzOTM1KTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uYnRuLWNyZWF0ZSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzY2YmI2YSwgIzQzYTA0Nyk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLnEtYW5pbWF0ZS1ib3VuY2Uge1xuICBhbmltYXRpb246IGJvdW5jZUluIDAuNnMgZWFzZTtcbn1cblxuQGtleWZyYW1lcyBmYWRlSW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMHB4KTtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIH1cbn1cblxuQGtleWZyYW1lcyBib3VuY2VJbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtYnRuXG4gICAgQGNsaWNrPVwib3BlbkVkaXRGb3JtXCJcbiAgICBjb2xvcj1cInBvc2l0aXZlXCJcbiAgICBpY29uPVwiZWRpdFwiXG4gICAgc2l6ZT1cInNtXCJcbiAgICBmbGF0XG4gICAgcm91bmRcbiAgICBkZW5zZVxuICA+XG4gICAgPHEtdG9vbHRpcCBjbGFzcz1cImJnLXBvc2l0aXZlXCIgOmRlbGF5PVwiMjAwXCI+RWRpdDwvcS10b29sdGlwPlxuICA8L3EtYnRuPlxuICA8cS1kaWFsb2dcbiAgICB2LW1vZGVsPVwiZGlhbG9nXCJcbiAgICBwZXJzaXN0ZW50XG4gICAgdHJhbnNpdGlvbi1zaG93PVwianVtcC11cFwiXG4gICAgdHJhbnNpdGlvbi1oaWRlPVwianVtcC1kb3duXCJcbiAgPlxuICAgIDxxLWNhcmRcbiAgICAgIGNsYXNzPVwibXktY2FyZCBxLXBhLW5vbmVcIlxuICAgICAgc3R5bGU9XCJcbiAgICAgICAgd2lkdGg6IDQyMHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgICAgICBib3gtc2hhZG93OiAwIDEycHggMjRweCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gICAgICBcIlxuICAgID5cbiAgICAgIDxxLWNhcmQtc2VjdGlvblxuICAgICAgICBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1weC1tZCBxLXB5LXNtIGJnLWdyYWRpZW50IHRleHQtd2hpdGVcIlxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNSBxLW1yLW1kXCI+8J+PqiBFZGl0IEJyYW5jaDwvZGl2PlxuICAgICAgICA8cS1zcGFjZSAvPlxuICAgICAgICA8cS1idG4gaWNvbj1cImNsb3NlXCIgZmxhdCBkZW5zZSByb3VuZCB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPHEtc2VwYXJhdG9yIGNsYXNzPVwic2VwYXJhdG9yLWdyYWRpZW50XCIgLz5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcHgteGwgcS1wdC1ub25lIHEtcGItbGdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbGcgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgPGRpdj5OYW1lIG9mIEJyYW5jaDwvZGl2PlxuICAgICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJlZGl0QnJhbmNoZXNGb3JtLm5hbWVcIiBvdXRsaW5lZCBkZW5zZSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbGcgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgPGRpdj5Mb2NhdGlvbjwvZGl2PlxuICAgICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJlZGl0QnJhbmNoZXNGb3JtLmxvY2F0aW9uXCIgb3V0bGluZWQgZGVuc2UgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LWxnIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgIDxkaXY+UGVyc29uIEluLWNoYXJnZTwvZGl2PlxuICAgICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJlZGl0QnJhbmNoZXNGb3JtLnBlcnNvbl9pbmNoYXJnZVwiIG91dGxpbmVkIGRlbnNlIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1sZyBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICA8ZGl2PlVuZGVyIFdhcmVob3VzZTwvZGl2PlxuICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgdi1tb2RlbD1cImVkaXRCcmFuY2hlc0Zvcm0ud2FyZWhvdXNlX2lkXCJcbiAgICAgICAgICAgIHVzZS1pbnB1dFxuICAgICAgICAgICAgaW5wdXQtZGVib3VuY2U9XCIwXCJcbiAgICAgICAgICAgIDpvcHRpb25zPVwid2FyZWhvdXNlc1wiXG4gICAgICAgICAgICBzdGFjay1sYWJlbFxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBlbWl0LXZhbHVlXG4gICAgICAgICAgICBtYXAtb3B0aW9uc1xuICAgICAgICAgICAgb3B0aW9uLWxhYmVsPVwibmFtZVwiXG4gICAgICAgICAgICBvcHRpb24tdmFsdWU9XCJpZFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXIteC1zbSBqdXN0aWZ5LWJldHdlZW4gcS1tdC1zbVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNiBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICAgIDxkaXY+UGhvbmUgTnVtYmVyPC9kaXY+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICB2LW1vZGVsPVwiZWRpdEJyYW5jaGVzRm9ybS5waG9uZVwiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIG1hc2s9XCIoKzYzKSAjIyMgLSAjIyMgLSAjIyMjXCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIoKzYzKSAjIyMgLSAjIyMgLSAjIyMjXCJcbiAgICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+IHZhbCAmJiB2YWwubGVuZ3RoID4gMF1cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTUgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgICA8ZGl2PlN0YXR1czwvZGl2PlxuICAgICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJlZGl0QnJhbmNoZXNGb3JtLnN0YXR1c1wiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIDpvcHRpb25zPVwic3RhdHVzT3B0aW9uc1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLWFjdGlvbnMgY2xhc3M9XCJyb3cgcS1weC1sZyBxLXB5LXNtIHEtcHQtbm9uZVwiIGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgPHEtYnRuIGNsYXNzPVwiZ2xvc3N5XCIgY29sb3I9XCJncmV5LTlcIiBsYWJlbD1cIkRpc21pc3NcIiB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGNsYXNzPVwiZ2xvc3N5XCJcbiAgICAgICAgICBjb2xvcj1cInRlYWxcIlxuICAgICAgICAgIGxhYmVsPVwiU2F2ZVwiXG4gICAgICAgICAgQGNsaWNrPVwic2F2ZUVkaXRlZEJyYW5jaGVzXCJcbiAgICAgICAgLz5cbiAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgcmVhY3RpdmUsIHJlZiwgb25Nb3VudGVkLCBjb21wdXRlZCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IHVzZVdhcmVob3VzZXNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3dhcmVob3VzZVwiO1xuaW1wb3J0IHsgdXNlQnJhbmNoZXNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2JyYW5jaFwiO1xuXG5jb25zdCBicmFuY2hlc1N0b3JlID0gdXNlQnJhbmNoZXNTdG9yZSgpO1xuY29uc3Qgd2FyZWhvdXNlc1N0b3JlID0gdXNlV2FyZWhvdXNlc1N0b3JlKCk7XG5jb25zdCB3YXJlaG91c2VzID0gY29tcHV0ZWQoKCkgPT4gd2FyZWhvdXNlc1N0b3JlLndhcmVob3VzZXMpO1xuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyhbXCJlZGl0XCJdKTtcbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5jb25zdCB3YXJlaG91c2VPcHRpb25zID0gcmVmKFtdKTtcbmxldCBlZGl0Um93ID0gcHJvcHMuZWRpdC5yb3c7XG5jb25zdCBzdGF0dXNPcHRpb25zID0gW1wiT3BlblwiLCBcIk9wZW4gc29vblwiLCBcIkNsb3NlXCJdO1xuXG5jb25zdCBlZGl0QnJhbmNoZXNGb3JtID0gcmVhY3RpdmUoe1xuICBuYW1lOiBcIlwiLFxuICBsb2NhdGlvbjogXCJcIixcbiAgcGVyc29uX2luY2hhcmdlOiBcIlwiLFxuICB3YXJlaG91c2VfaWQ6IG51bGwsXG4gIHBob25lOiBcIlwiLFxuICBzdGF0dXM6IG51bGwsXG59KTtcblxuY29uc3Qgb3BlbkVkaXRGb3JtID0gKCkgPT4ge1xuICBjb25zb2xlLmxvZyhcIkVkaXQgUm93IERhdGE6XCIsIGVkaXRSb3cpO1xuICBlZGl0QnJhbmNoZXNGb3JtLm5hbWUgPSBlZGl0Um93Lm5hbWU7XG4gIGVkaXRCcmFuY2hlc0Zvcm0ubG9jYXRpb24gPSBlZGl0Um93LmxvY2F0aW9uO1xuICBlZGl0QnJhbmNoZXNGb3JtLnBlcnNvbl9pbmNoYXJnZSA9IGVkaXRSb3cucGVyc29uX2luY2hhcmdlO1xuICBlZGl0QnJhbmNoZXNGb3JtLndhcmVob3VzZV9pZCA9IGVkaXRSb3c/LndhcmVob3VzZV9pZFxuICAgID8gZWRpdFJvdy53YXJlaG91c2VfaWRcbiAgICA6IGVkaXRSb3c/LndhcmVob3VzZT8uaWRcbiAgICA/IGVkaXRSb3c/LndhcmVob3VzZT8uaWRcbiAgICA6IFwiXCI7XG4gIGVkaXRCcmFuY2hlc0Zvcm0ucGhvbmUgPSBlZGl0Um93LnBob25lO1xuICBlZGl0QnJhbmNoZXNGb3JtLnN0YXR1cyA9IGVkaXRSb3cuc3RhdHVzO1xuICBkaWFsb2cudmFsdWUgPSB0cnVlO1xuICBjb25zb2xlLmxvZyhcIkVkaXQgRGF0YTpcIiwgZWRpdEJyYW5jaGVzRm9ybSk7XG59O1xuXG5jb25zdCBzYXZlRWRpdGVkQnJhbmNoZXMgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgYXdhaXQgYnJhbmNoZXNTdG9yZS51cGRhdGVCcmFuY2hlcyhlZGl0Um93LmlkLCBlZGl0QnJhbmNoZXNGb3JtKTtcblxuICAgIGRpYWxvZy52YWx1ZSA9IGZhbHNlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB1cGRhdGluZyBicmFuY2g6XCIsIGVycm9yKTtcbiAgfVxufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLm15LWNhcmQge1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBhbmltYXRpb246IGZhZGVJbiAwLjNzIGVhc2U7XG59XG5cbi5idG4tYWRkIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjMDAwMDAwLCAjMDAwMDAwKTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uYmctZ3JhZGllbnQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMDBiZmE1LCAjMDA3OTZiKTtcbn1cblxuLnNlcGFyYXRvci1ncmFkaWVudCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzAwYmZhNSwgIzAwNzk2Yik7XG59XG5cbi5xLWJ0biB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xufVxuXG4ucS1idG46aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcbn1cblxuLmJ0bi1jYW5jZWwge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNlZjUzNTAsICNlNTM5MzUpO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5idG4tY3JlYXRlIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjNjZiYjZhLCAjNDNhMDQ3KTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4ucS1hbmltYXRlLWJvdW5jZSB7XG4gIGFuaW1hdGlvbjogYm91bmNlSW4gMC42cyBlYXNlO1xufVxuXG5Aa2V5ZnJhbWVzIGZhZGVJbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwcHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIGJvdW5jZUluIHtcbiAgZnJvbSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7XG4gIH1cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICB9XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1idG5cbiAgICBAY2xpY2s9XCJkZWxldGVEaWFsb2dcIlxuICAgIGNvbG9yPVwibmVnYXRpdmVcIlxuICAgIGljb249XCJkZWxldGVcIlxuICAgIHNpemU9XCJzbVwiXG4gICAgZmxhdFxuICAgIHJvdW5kXG4gICAgZGVuc2VcbiAgPlxuICAgIDxxLXRvb2x0aXAgY2xhc3M9XCJiZy1uZWdhdGl2ZVwiIDpkZWxheT1cIjIwMFwiPkRlbGV0ZTwvcS10b29sdGlwPlxuICA8L3EtYnRuPlxuICA8cS1kaWFsb2cgdi1tb2RlbD1cImRpYWxvZ1Zpc2libGVcIj5cbiAgICA8cS1jYXJkIGNsYXNzPVwicS1wYS1tZCBxLXJvdW5kZWQgcS1lbGV2YXRlLTIgYmctd2hpdGUgdGV4dC1ncmV5LTlcIj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcHQtbm9uZSBxLXBiLXNtXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg1IHEtbWIteHNcIj5Db25maXJtIERlbGV0aW9uPC9kaXY+XG4gICAgICAgIDxwIGNsYXNzPVwidGV4dC1ib2R5MiBxLW1iLW5vbmVcIj5cbiAgICAgICAgICBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgaXRlbT8gVGhpcyBhY3Rpb24gY2Fubm90IGJlXG4gICAgICAgICAgdW5kb25lLlxuICAgICAgICA8L3A+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuXG4gICAgICA8cS1zZXBhcmF0b3IgY2xhc3M9XCJxLW1iLW1kXCIgLz5cblxuICAgICAgPHEtY2FyZC1hY3Rpb25zIGFsaWduPVwicmlnaHRcIiBjbGFzcz1cInEtcHQtbm9uZVwiPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBmbGF0XG4gICAgICAgICAgZGVuc2VcbiAgICAgICAgICBsYWJlbD1cIkNhbmNlbFwiXG4gICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICB2LWNsb3NlLXBvcHVwXG4gICAgICAgICAgY2xhc3M9XCJxLW1yLXNtXCJcbiAgICAgICAgLz5cbiAgICAgICAgPHEtYnRuXG4gICAgICAgICAgZGVuc2VcbiAgICAgICAgICBsYWJlbD1cIkRlbGV0ZVwiXG4gICAgICAgICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgICAgICAgQGNsaWNrPVwib25EZWxldGVcIlxuICAgICAgICAgIGNsYXNzPVwicS1idG4tcm91bmRlZCBxLXB4LWxnXCJcbiAgICAgICAgLz5cbiAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgdXNlQnJhbmNoZXNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2JyYW5jaFwiO1xuXG5jb25zdCBicmFuY2hlc1N0b3JlID0gdXNlQnJhbmNoZXNTdG9yZSgpO1xuY29uc3QgZGlhbG9nVmlzaWJsZSA9IHJlZihmYWxzZSk7XG5jb25zdCBkZWxldGVEaWFsb2cgPSAoKSA9PiB7XG4gIGRpYWxvZ1Zpc2libGUudmFsdWUgPSB0cnVlO1xufTtcbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHMoW1wiZGVsZXRlXCJdKTtcblxuY29uc3Qgb25EZWxldGUgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgYXdhaXQgYnJhbmNoZXNTdG9yZS5kZWxldGVCcmFuY2hlcyhwcm9wcy5kZWxldGUucm93LmlkKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICB9XG5cbiAgZGlhbG9nVmlzaWJsZS52YWx1ZSA9IGZhbHNlO1xufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLnEtY2FyZCB7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIGJveC1zaGFkb3c6IDAgOHB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4ucS1jYXJkLXNlY3Rpb24ge1xuICBwYWRkaW5nOiAyNHB4IDMycHg7XG59XG5cbi5xLWJ0biB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2UsIGJveC1zaGFkb3cgMC4ycyBlYXNlO1xufVxuXG4ucS1idG4tcm91bmRlZCB7XG4gIGJvcmRlci1yYWRpdXM6IDUwcHg7XG59XG5cbi5xLWJ0bjpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xufVxuXG4ucS1idG46YWN0aXZlIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICBib3gtc2hhZG93OiBub25lO1xufVxuXG4udGV4dC1oNSB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi50ZXh0LWJvZHkyIHtcbiAgY29sb3I6ICM2NjY7XG59XG5cbi5xLWVsZXZhdGUtMiB7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi5iZy13aGl0ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG59XG5cbi50ZXh0LWdyZXktOSB7XG4gIGNvbG9yOiAjMzMzO1xufVxuXG4ucS1zZXBhcmF0b3Ige1xuICBib3JkZXItY29sb3I6ICNlZWU7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGFsaWduPVwicmlnaHRcIj5cbiAgICA8cS1pbnB1dFxuICAgICAgY2xhc3M9XCJxLXBiLWxnIHEtcGwtbWRcIlxuICAgICAgdi1tb2RlbD1cImZpbHRlclwiXG4gICAgICBvdXRsaW5lZFxuICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgZGVib3VuY2VkPVwiMTAwMFwiXG4gICAgICBzdHlsZT1cIndpZHRoOiA1MDBweDsgbWF4LXdpZHRoOiAxNTAwcHg7IG1pbi13aWR0aDogMTAwcHhcIlxuICAgICAgZmxhdFxuICAgICAgZGVuc2VcbiAgICAgIHJvdW5kZWRcbiAgICA+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgPHEtaWNvbiBuYW1lPVwic2VhcmNoXCIgLz5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9xLWlucHV0PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInNwaW5uZXItd3JhcHBlclwiIHYtaWY9XCJsb2FkaW5nXCI+XG4gICAgPHEtc3Bpbm5lci1kb3RzIHNpemU9XCI1MHB4XCIgY29sb3I9XCJwcmltYXJ5XCIgLz5cbiAgPC9kaXY+XG4gIDxkaXYgdi1lbHNlPlxuICAgIDxkaXYgdi1pZj1cImZpbHRlcmVkUm93cy5sZW5ndGggPT09IDBcIiBjbGFzcz1cImRhdGEtZXJyb3JcIj5cbiAgICAgIDxxLWljb24gbmFtZT1cIndhcm5pbmdcIiBjb2xvcj1cIndhcm5pbmdcIiBzaXplPVwiNGVtXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJxLW1sLXNtIHRleHQtaDZcIj5ObyBkYXRhIGF2YWlsYWJsZTwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxxLXRhYmxlXG4gICAgICB2LWVsc2VcbiAgICAgIGNsYXNzPVwidGFibGUtY29udGFpbmVyIGVsZWdhbnQtY29udGFpbmVyIHN0aWNreS1oZWFkZXJcIlxuICAgICAgOnZpcnR1YWwtc2Nyb2xsLXN0aWNreS1zaXplLXN0YXJ0PVwiNDhcIlxuICAgICAgZmxhdFxuICAgICAgc3R5bGU9XCJoZWlnaHQ6IDQwMHB4XCJcbiAgICAgIDpjb2x1bW5zPVwiYnJhbmNoZXNDb2x1bW5zXCJcbiAgICAgIDpyb3dzPVwiZmlsdGVyZWRSb3dzXCJcbiAgICAgIHJvdy1rZXk9XCJuYW1lXCJcbiAgICAgIHZpcnR1YWwtc2Nyb2xsXG4gICAgICB2LW1vZGVsOnBhZ2luYXRpb249XCJwYWdpbmF0aW9uXCJcbiAgICAgIDpyb3dzLXBlci1wYWdlLW9wdGlvbnM9XCJbMF1cIlxuICAgICAgaGlkZS1ib3R0b21cbiAgICA+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC1icmFuY2hfbmFtZT1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIGtleT1cIm5hbWVcIiA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgIDxhIEBjbGljay5wcmV2ZW50PVwiZ29Ub0JyYW5jaChwcm9wcy5yb3cpXCIgY2xhc3M9XCJicmFuY2gtbGlua1wiPlxuICAgICAgICAgICAge3sgcHJvcHMucm93Lm5hbWUgfX1cbiAgICAgICAgICAgIDwhLS0gPHNwYW4gY2xhc3M9XCJ0b29sdGlwLXRleHRcIj5HbyB0byBzdG9yZTwvc3Bhbj4gLS0+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtc3RhdHVzPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQga2V5PVwibmFtZVwiIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPHEtYmFkZ2Ugb3V0bGluZSA6Y29sb3I9XCJnZXRCYWRnZVN0YXR1c0NvbG9yKHByb3BzLnJvdy5zdGF0dXMpXCI+XG4gICAgICAgICAgICB7eyBwcm9wcy5yb3cuc3RhdHVzIH19XG4gICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtYWN0aW9uPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktY2VudGVyIHEtZ3V0dGVyLXgtbWRcIj5cbiAgICAgICAgICAgIDxCcmFuY2hlc0VkaXQgOmVkaXQ9XCJwcm9wc1wiIC8+XG4gICAgICAgICAgICA8QnJhbmNoZXNEZWxldGUgOmRlbGV0ZT1cInByb3BzXCIgLz5cbiAgICAgICAgICAgIDwhLS0gPEJyYW5jaGVzR29UbyA6ZGF0YT1cInByb3BzXCIgLz4gLS0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9xLXRhYmxlPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgQnJhbmNoZXNHb1RvIGZyb20gXCIuL0JyYW5jaGVzR29Ub0NvbXBvbmVudC52dWVcIjtcbmltcG9ydCBCcmFuY2hlc0VkaXQgZnJvbSBcIi4vQnJhbmNoZXNFZGl0Q29tcG9uZW50LnZ1ZVwiO1xuaW1wb3J0IEJyYW5jaGVzRGVsZXRlIGZyb20gXCIuL0JyYW5jaGVzRGVsZXRlQ29tcG9uZW50LnZ1ZVwiO1xuaW1wb3J0IHsgb25Nb3VudGVkLCBjb21wdXRlZCwgcmVmLCB3YXRjaCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IHVzZUJyYW5jaGVzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9icmFuY2hcIjtcbmltcG9ydCB7IHVzZVdhcmVob3VzZXNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3dhcmVob3VzZVwiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcInZ1ZS1yb3V0ZXJcIjtcbmltcG9ydCB7IExvYWRpbmcgfSBmcm9tIFwicXVhc2FyXCI7XG5cbmNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuY29uc3QgYnJhbmNoZXNTdG9yZSA9IHVzZUJyYW5jaGVzU3RvcmUoKTtcbmNvbnN0IHdhcmVob3VzZXNTdG9yZSA9IHVzZVdhcmVob3VzZXNTdG9yZSgpO1xuY29uc3QgZmlsdGVyID0gcmVmKFwiXCIpO1xuY29uc3QgYnJhbmNoZXNSb3dzID0gY29tcHV0ZWQoKCkgPT4gYnJhbmNoZXNTdG9yZS5icmFuY2hlcyk7XG5jb25zdCBsb2FkaW5nID0gcmVmKHRydWUpO1xuY29uc3Qgc2hvd05vRGF0YU1lc3NhZ2UgPSByZWYoZmFsc2UpO1xuY29uc3QgcGFnaW5hdGlvbiA9IHJlZih7XG4gIHJvd3NQZXJQYWdlOiAwLFxufSk7XG5cbmNvbnN0IGZpbHRlcmVkUm93cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgaWYgKCFmaWx0ZXIudmFsdWUpIHtcbiAgICByZXR1cm4gYnJhbmNoZXNSb3dzLnZhbHVlO1xuICB9XG4gIGNvbnN0IGZpbHRlclRleHQgPSBmaWx0ZXIudmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIGJyYW5jaGVzUm93cy52YWx1ZS5maWx0ZXIoKHJvdykgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSByb3cubmFtZSA/IHJvdy5uYW1lLnRvTG93ZXJDYXNlKCkgOiBcIlwiO1xuICAgIGNvbnN0IHdhcmVob3VzZU5hbWUgPSByb3c/LndhcmVob3VzZT8ubmFtZVxuICAgICAgPyByb3cud2FyZWhvdXNlLm5hbWUudG9Mb3dlckNhc2UoKVxuICAgICAgOiBcIlwiO1xuICAgIHJldHVybiBuYW1lLmluY2x1ZGVzKGZpbHRlclRleHQpIHx8IHdhcmVob3VzZU5hbWUuaW5jbHVkZXMoZmlsdGVyVGV4dCk7XG4gIH0pO1xufSk7XG5cbm9uTW91bnRlZChhc3luYyAoKSA9PiB7XG4gIGF3YWl0IHdhcmVob3VzZXNTdG9yZS5mZXRjaFdhcmVob3VzZXMoKTtcbiAgYXdhaXQgcmVsb2FkVGFibGVEYXRhKCk7XG59KTtcblxuY29uc3QgcmVsb2FkVGFibGVEYXRhID0gYXN5bmMgKCkgPT4ge1xuICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgdHJ5IHtcbiAgICBhd2FpdCBicmFuY2hlc1N0b3JlLmZldGNoQnJhbmNoZXMoKTtcbiAgICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IGJyYW5jaGVzUm93cy52YWx1ZS5sZW5ndGggPT09IDA7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSB0cnVlO1xuICB9IGZpbmFsbHkge1xuICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgfVxufTtcblxud2F0Y2goZmlsdGVyLCBhc3luYyAobmV3RmlsdGVyKSA9PiB7XG4gIGxvYWRpbmcudmFsdWUgPSB0cnVlO1xuICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKSk7XG4gIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSBmaWx0ZXJlZFJvd3MudmFsdWUubGVuZ3RoID09PSAwO1xufSk7XG5cbmNvbnN0IGJyYW5jaGVzQ29sdW1ucyA9IFtcbiAge1xuICAgIG5hbWU6IFwiYnJhbmNoX25hbWVcIixcbiAgICBsYWJlbDogXCJOYW1lIG9mIEJyYW5jaFwiLFxuICAgIGFsaWduOiBcImxlZnRcIixcbiAgICBmaWVsZDogKHJvdykgPT4gcm93Lm5hbWUsXG4gICAgZm9ybWF0OiAodmFsKSA9PiBgJHt2YWx9YCxcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwid2FyZWhvdXNlXCIsXG4gICAgbGFiZWw6IFwiV2FyZWhvdXNlXCIsXG4gICAgYWxpZ246IFwibGVmdFwiLFxuICAgIGZpZWxkOiAocm93KSA9PiByb3c/LndhcmVob3VzZSA/PyBcIk5vIHdhcmVob3VzZSBcIixcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwibG9jYXRpb25cIixcbiAgICBsYWJlbDogXCJMb2NhdGlvblwiLFxuICAgIGFsaWduOiBcImxlZnRcIixcbiAgICBmaWVsZDogXCJsb2NhdGlvblwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJwZXJzb25JbmNoYXJnZVwiLFxuICAgIGxhYmVsOiBcIlBlcnNvbiBJbi1jaGFyZ2VcIixcbiAgICBhbGlnbjogXCJsZWZ0XCIsXG4gICAgZmllbGQ6IFwicGVyc29uX2luY2hhcmdlXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInBob25lXCIsXG4gICAgbGFiZWw6IFwiUGhvbmVcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogXCJwaG9uZVwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJzdGF0dXNcIixcbiAgICBsYWJlbDogXCJTdGF0dXNcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogXCJzdGF0dXNcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYWN0aW9uXCIsXG4gICAgbGFiZWw6IFwiQWN0aW9uXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IFwiYWN0aW9uXCIsXG4gIH0sXG5dO1xuXG5jb25zdCBnZXRCYWRnZVN0YXR1c0NvbG9yID0gKHN0YXR1cykgPT4ge1xuICBzd2l0Y2ggKHN0YXR1cykge1xuICAgIGNhc2UgXCJPcGVuXCI6XG4gICAgICByZXR1cm4gXCJpbmZvXCI7XG4gICAgY2FzZSBcIk9wZW4gc29vblwiOlxuICAgICAgcmV0dXJuIFwid2FybmluZ1wiO1xuICAgIGNhc2UgXCJDbG9zZVwiOlxuICAgICAgcmV0dXJuIFwiYWNjZW50XCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcImdyZXlcIjtcbiAgfVxufTtcblxuY29uc3QgZ29Ub0JyYW5jaCA9IGFzeW5jIChicmFuY2gpID0+IHtcbiAgTG9hZGluZy5zaG93KCk7XG4gIHRyeSB7XG4gICAgYXdhaXQgcm91dGVyLnB1c2goe1xuICAgICAgbmFtZTogXCJCcmFuY2hEZXRhaWxcIixcbiAgICAgIHBhcmFtczogeyBicmFuY2hfaWQ6IGJyYW5jaC5pZCB9LFxuICAgIH0pO1xuICB9IGZpbmFsbHkge1xuICAgIExvYWRpbmcuaGlkZSgpO1xuICB9XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cbi5lbGVnYW50LWNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQ6ICNmN2Y4ZmM7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbn1cbi5hYnNvbHV0ZS1mdWxsIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG59XG4uc3Bpbm5lci13cmFwcGVyIHtcbiAgbWluLWhlaWdodDogNDB2aDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uZGF0YS1lcnJvciB7XG4gIG1pbi1oZWlnaHQ6IDQwdmg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLmJyYW5jaC1saW5rIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGNvbG9yOiAjZWY0NDQ0O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyAvKiBObyB1bmRlcmxpbmUgYnkgZGVmYXVsdCAqL1xufVxuLmJyYW5jaC1saW5rOmhvdmVyIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIFVuZGVybGluZSBvbiBob3ZlciAqL1xufVxuLmJyYW5jaC1saW5rIC50b29sdGlwLXRleHQge1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIHdpZHRoOiAxMDBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTtcbiAgY29sb3I6ICNmZmY7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBwYWRkaW5nOiA1cHggMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAxO1xuICBib3R0b206IDEyNSU7XG4gIGxlZnQ6IDUwJTtcbiAgbWFyZ2luLWxlZnQ6IC01MHB4O1xuICBvcGFjaXR5OiAwO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3M7XG59XG5cbi5icmFuY2gtbGluayAudG9vbHRpcC10ZXh0OjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxMDAlO1xuICBsZWZ0OiA1MCU7XG4gIG1hcmdpbi1sZWZ0OiAtNXB4O1xuICBib3JkZXItd2lkdGg6IDVweDtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiAjNTU1NTU1IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50O1xufVxuXG4uYnJhbmNoLWxpbms6aG92ZXIgLnRvb2x0aXAtdGV4dCB7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIG9wYWNpdHk6IDE7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIkxvYWRpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUlBLFVBQU0sNEJBQTRCLElBQUksS0FBSztBQUMzQyxVQUFNLGNBQWMsaUJBQWdCO0FBRXBDLFVBQU0sOEJBQThCLE1BQU07QUFDeEMsZ0NBQTBCLFFBQVE7QUFBQSxJQUNwQztBQUVBLFVBQU0sa0JBQWtCLG1CQUFrQjtBQUMxQyxVQUFNLG1CQUFtQixJQUFJLENBQUEsQ0FBRTtBQUMvQixVQUFNLHlCQUF5QixJQUFJLENBQUEsQ0FBRTtBQUNyQyxVQUFNLFVBQVUsSUFBSSxLQUFLO0FBQ3pCLFVBQU0sZ0JBQWdCLENBQUMsUUFBUSxhQUFhLE9BQU87QUFF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
