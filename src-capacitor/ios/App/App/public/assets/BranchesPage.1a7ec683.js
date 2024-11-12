import { Q as QBadge } from "./QBadge.49245359.js";
import { _ as _export_sfc, n as ref, g as computed, t as reactive, z as onMounted, o as openBlock, a4 as createElementBlock, a as createVNode, M as QBtn, w as withCtx, Q as QCard, I as QCardSection, af as withDirectives, a2 as QSeparator, J as createBaseVNode, K as QInput, c as createBlock, L as QIcon, bd as QSpinner, O as createTextVNode, a5 as Fragment, a6 as renderList, R as toDisplayString, be as createCommentVNode, aK as QCardActions, a3 as QDialog, N as Notify, S as pushScopeId, T as popScopeId, H as useRouter, u as watch, aJ as withModifiers, P as Plugin } from "./index.c8e2405b.js";
import { Q as QPage } from "./QPage.e43c6521.js";
import { Q as QSpace } from "./QSpace.08c50700.js";
import { Q as QItem, a as QItemSection } from "./QItem.76557ad9.js";
import { Q as QList } from "./QList.d5d13fac.js";
import { Q as QSelect } from "./QSelect.0985e28e.js";
import { C as ClosePopup } from "./ClosePopup.649d85d8.js";
import { u as useBranchesStore } from "./branch.9a956ff2.js";
import { u as useWarehousesStore } from "./warehouse.f8473ccb.js";
import { u as useEmployeeStore } from "./employee.08e2bc37.js";
import { Q as QSpinnerDots } from "./QSpinnerDots.c2e8b2d3.js";
import { Q as QTd } from "./QTd.f597934c.js";
import { Q as QTable } from "./QTable.d3fb87f5.js";
import { Q as QTooltip } from "./QTooltip.4a3eef22.js";
import "./rtl.b1b38f21.js";
import "./QMenu.4f670399.js";
import "./selection.94057980.js";
import "./use-virtual-scroll.5b4ab88d.js";
import "./axios.aa1bce92.js";
import "./QVirtualScroll.41a98cb7.js";
var BranchesCreateComponent_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$3 = (n) => (pushScopeId("data-v-3c0e82fc"), n = n(), popScopeId(), n);
const _hoisted_1$4 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F3EA} Add New Branch", -1));
const _hoisted_2$4 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_3$2 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_4$2 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_5$2 = {
  key: 0,
  class: "custom-list z-top"
};
const _hoisted_6$2 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_7$1 = { class: "row q-mt-lg q-gutter-x-sm justify-between" };
const _hoisted_8$1 = { class: "col-6 q-animated q-animate-bounce" };
const _hoisted_9$1 = { class: "col-5 q-animated q-animate-bounce" };
const _sfc_main$4 = {
  __name: "BranchesCreateComponent",
  setup(__props) {
    const employeeStore = useEmployeeStore();
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
    const searchLoading = ref(false);
    const selectedWarehouse = ref(null);
    const searchKeyword = ref(null);
    const showDropdown = ref(false);
    const employees = computed(() => employeeStore.employee);
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
      addNewBranchForm.employee_id = employee.id;
      addNewBranchForm.employee_name = `${employee.firstname} ${employee.middlename ? employee.middlename.charAt(0) + "." : ""} ${employee.lastname}`;
      searchKeyword.value = `${employee.firstname} ${employee.middlename ? employee.middlename.charAt(0) + "." : ""} ${employee.lastname}`;
      showDropdown.value = false;
      console.log("Filled addNewBranchForm Data:", addNewBranchForm);
    };
    const formatFullname = (row) => {
      const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
      const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
      const middlename = row.middlename ? capitalize(row.middlename).charAt(0) + "." : "";
      const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";
      return `${firstname} ${middlename} ${lastname}`;
    };
    const addNewBranchForm = reactive({
      name: "",
      location: "",
      employee_id: "",
      employee_name: "",
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
        loading.value = true;
        const formData = {
          ...addNewBranchForm,
          warehouse_id: ((_a = selectedWarehouse.value) == null ? void 0 : _a.value) || null
        };
        console.log("brabrbbar", formData);
        const data = await branchStore.createBranches(formData);
        console.log(data);
        addNewBranchDialogVisible.value = false;
        resetFormData();
      } catch (error) {
        console.error("Error creating branch:", error);
        const errorMessage = ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.message) || error.message || "Failed to create branch. Please try again.";
        addNewBranchDialogVisible.value = true;
        Notify.create({
          color: "negative",
          icon: "warning",
          message: errorMessage
        });
      } finally {
        loading.value = false;
      }
    };
    const resetFormData = () => {
      addNewBranchForm.name = "";
      addNewBranchForm.location = "";
      addNewBranchForm.employee_id = "";
      addNewBranchForm.employee_name = "";
      searchKeyword.value = null;
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
          "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => addNewBranchDialogVisible.value = $event),
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
                        class: "text-capitalize",
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
                        class: "text-capitalize",
                        modelValue: addNewBranchForm.location,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => addNewBranchForm.location = $event),
                        outlined: "",
                        dense: "",
                        label: "Location",
                        rules: [(val) => val && val.length > 0 || "Label is required"]
                      }, null, 8, ["modelValue", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_4$2, [
                      createBaseVNode("div", null, [
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
                            showDropdown.value && searchKeyword.value ? (openBlock(), createElementBlock("div", _hoisted_5$2, [
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
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_6$2, [
                      createVNode(QSelect, {
                        modelValue: selectedWarehouse.value,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => selectedWarehouse.value = $event),
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
                    createBaseVNode("div", _hoisted_7$1, [
                      createBaseVNode("div", _hoisted_8$1, [
                        createVNode(QInput, {
                          modelValue: addNewBranchForm.phone,
                          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => addNewBranchForm.phone = $event),
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
                      createBaseVNode("div", _hoisted_9$1, [
                        createVNode(QSelect, {
                          modelValue: addNewBranchForm.status,
                          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => addNewBranchForm.status = $event),
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
                      onClick: addNewBranch,
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
      ], 64);
    };
  }
};
var BranchesCreate = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-3c0e82fc"], ["__file", "BranchesCreateComponent.vue"]]);
var BranchesEditComponent_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-098866d0"), n = n(), popScopeId(), n);
const _hoisted_1$3 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F3EA} Edit Branch", -1));
const _hoisted_2$3 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_3$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, "Name of Branch", -1));
const _hoisted_4$1 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_5$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, "Location", -1));
const _hoisted_6$1 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_7 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, "Person In-charge", -1));
const _hoisted_8 = {
  key: 0,
  class: "custom-list z-top"
};
const _hoisted_9 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_10 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, "Under Warehouse", -1));
const _hoisted_11 = { class: "row q-gutter-x-sm justify-between q-mt-sm" };
const _hoisted_12 = { class: "col-6 q-animated q-animate-bounce" };
const _hoisted_13 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, "Phone Number", -1));
const _hoisted_14 = { class: "col-5 q-animated q-animate-bounce" };
const _hoisted_15 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, "Status", -1));
const _sfc_main$3 = {
  __name: "BranchesEditComponent",
  props: ["edit"],
  setup(__props) {
    const employeeStore = useEmployeeStore();
    const branchesStore = useBranchesStore();
    const warehousesStore = useWarehousesStore();
    const warehouses = computed(() => warehousesStore.warehouses);
    const props = __props;
    const dialog = ref(false);
    ref([]);
    let editRow = props.edit.row;
    const statusOptions = ["Open", "Open soon", "Close"];
    const searchKeyword = ref(null);
    const searchLoading = ref(false);
    const showDropdown = ref(false);
    const employees = computed(() => employeeStore.employee);
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
      editBranchesForm.employee_id = employee.id;
      editBranchesForm.employee_name = `${employee.firstname} ${employee.middlename ? employee.middlename.charAt(0) + "." : ""} ${employee.lastname}`;
      searchKeyword.value = `${employee.firstname} ${employee.middlename ? employee.middlename.charAt(0) + "." : ""} ${employee.lastname}`;
      showDropdown.value = false;
      console.log("Filled editBranchesForm Data:", editBranchesForm);
    };
    const openEditForm = () => {
      var _a, _b;
      console.log("Edit Row Data:", editRow);
      showDropdown.value = false;
      editBranchesForm.name = editRow.name;
      editBranchesForm.location = editRow.location;
      editBranchesForm.employee_id = editRow.employee_id;
      editBranchesForm.employee_name = editRow.employees ? formatFullname(editRow.employees) : "No Person in Charge";
      searchKeyword.value = editRow.employees ? formatFullname(editRow.employees) : "No Person in Charge";
      editBranchesForm.warehouse_id = (editRow == null ? void 0 : editRow.warehouse_id) ? editRow.warehouse_id : ((_a = editRow == null ? void 0 : editRow.warehouse) == null ? void 0 : _a.id) ? (_b = editRow == null ? void 0 : editRow.warehouse) == null ? void 0 : _b.id : "";
      editBranchesForm.phone = editRow.phone;
      editBranchesForm.status = editRow.status;
      dialog.value = true;
      console.log("Edit Data:", editBranchesForm);
    };
    const editBranchesForm = reactive({
      name: "",
      location: "",
      person_incharge: "",
      employee_id: "",
      employee_name: "",
      warehouse_id: null,
      phone: "",
      status: null
    });
    const formatFullname = (row) => {
      const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
      const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
      const middlename = row.middlename ? capitalize(row.middlename).charAt(0) + "." : "";
      const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";
      return `${firstname} ${middlename} ${lastname}`;
    };
    const saveEditedBranches = async () => {
      console.log("editRow.id", editRow.id);
      console.log("editBranchesForm", editBranchesForm);
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
          "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => dialog.value = $event),
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
                      _hoisted_7,
                      createBaseVNode("div", null, [
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
                                                  createTextVNode(toDisplayString(`${employee.firstname} ${employee.middlename ? employee.middlename.charAt(0) + "." : ""} ${employee.lastname}`), 1)
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
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_9, [
                      _hoisted_10,
                      createVNode(QSelect, {
                        modelValue: editBranchesForm.warehouse_id,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => editBranchesForm.warehouse_id = $event),
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
                    createBaseVNode("div", _hoisted_11, [
                      createBaseVNode("div", _hoisted_12, [
                        _hoisted_13,
                        createVNode(QInput, {
                          modelValue: editBranchesForm.phone,
                          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => editBranchesForm.phone = $event),
                          outlined: "",
                          dense: "",
                          mask: "(+63) ### - ### - ####",
                          placeholder: "(+63) ### - ### - ####",
                          rules: [(val) => val && val.length > 0]
                        }, null, 8, ["modelValue", "rules"])
                      ]),
                      createBaseVNode("div", _hoisted_14, [
                        _hoisted_15,
                        createVNode(QSelect, {
                          modelValue: editBranchesForm.status,
                          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => editBranchesForm.status = $event),
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
var BranchesEdit = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-098866d0"], ["__file", "BranchesEditComponent.vue"]]);
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
const _withScopeId = (n) => (pushScopeId("data-v-52ce55bc"), n = n(), popScopeId(), n);
const _hoisted_1$1 = {
  key: 0,
  class: "spinner-wrapper"
};
const _hoisted_2$1 = { key: 1 };
const _hoisted_3 = {
  key: 0,
  class: "data-error"
};
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-ml-sm text-h6" }, "No data available", -1));
const _hoisted_5 = ["onClick"];
const _hoisted_6 = { class: "row justify-center q-gutter-x-md" };
const _sfc_main$1 = {
  __name: "BranchesTableComponent",
  setup(__props) {
    const router = useRouter();
    const branchesStore = useBranchesStore();
    const warehousesStore = useWarehousesStore();
    const filter = ref("");
    const branchesRows = computed(() => branchesStore.branches);
    console.log("branchesRow", branchesRows.value);
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
        const response = await branchesStore.fetchBranches();
        console.log("branches data", response);
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
    const capitalizeFirstLetter = (location) => {
      if (!location)
        return "";
      return location.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    };
    const formatFullname = (row) => {
      const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
      const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
      const middlename = row.middlename ? capitalize(row.middlename).charAt(0) + "." : "";
      const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";
      return `${firstname} ${middlename} ${lastname}`;
    };
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
        field: (row) => (row == null ? void 0 : row.warehouse) ? row.warehouse : "No warehouse ",
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
        createBaseVNode("div", null, [
          createVNode(QInput, {
            class: "q-pb-lg q-pl-sm dynamic-width",
            modelValue: filter.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filter.value = $event),
            outlined: "",
            placeholder: "Search",
            debounced: "1000",
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
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
          createVNode(QSpinnerDots, {
            size: "50px",
            color: "primary"
          })
        ])) : (openBlock(), createElementBlock("div", _hoisted_2$1, [
          filteredRows.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_3, [
            createVNode(QIcon, {
              name: "warning",
              color: "warning",
              size: "4em"
            }),
            _hoisted_4
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
                  }, toDisplayString(capitalizeFirstLetter(props.row.name)), 9, _hoisted_5)
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-warehouse": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createTextVNode(toDisplayString(capitalizeFirstLetter((_a = props.row.warehouse) == null ? void 0 : _a.name)), 1)
                  ];
                }),
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
            "body-cell-personIncharge": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(formatFullname(props.row.employees)), 1)
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-action": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_6, [
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
var BranchesTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-52ce55bc"], ["__file", "BranchesTableComponent.vue"]]);
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
var BranchesPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d75e8df2"], ["__file", "BranchesPage.vue"]]);
export { BranchesPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnJhbmNoZXNQYWdlLjFhN2VjNjgzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9icmFuY2hlcy9jb21wb25lbnRzL0JyYW5jaGVzQ3JlYXRlQ29tcG9uZW50LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL2JyYW5jaGVzL2NvbXBvbmVudHMvQnJhbmNoZXNFZGl0Q29tcG9uZW50LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL2JyYW5jaGVzL2NvbXBvbmVudHMvQnJhbmNoZXNEZWxldGVDb21wb25lbnQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvYnJhbmNoZXMvY29tcG9uZW50cy9CcmFuY2hlc1RhYmxlQ29tcG9uZW50LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLWJ0blxuICAgIGNsYXNzPVwidGV4dC1kYXJrIHEtcGEtc21cIlxuICAgIG91dGxpbmVcbiAgICBkZW5zZVxuICAgIGVsZXZhdGVkXG4gICAgaWNvbj1cImFkZF9jaXJjbGVcIlxuICAgIGxhYmVsPVwiQWRkIFN0b3JlIEJyYW5jaFwiXG4gICAgQGNsaWNrPVwib3BlbkFkZGluZ1N0b3JlQnJhbmNoRGlhbG9nXCJcbiAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNlZjQ0NDRcIlxuICAvPlxuICA8cS1kaWFsb2dcbiAgICB2LW1vZGVsPVwiYWRkTmV3QnJhbmNoRGlhbG9nVmlzaWJsZVwiXG4gICAgcGVyc2lzdGVudFxuICAgIHRyYW5zaXRpb24tc2hvdz1cImp1bXAtdXBcIlxuICAgIHRyYW5zaXRpb24taGlkZT1cImp1bXAtZG93blwiXG4gID5cbiAgICA8cS1jYXJkXG4gICAgICBjbGFzcz1cIm15LWNhcmQgcS1wYS1ub25lXCJcbiAgICAgIHN0eWxlPVwiXG4gICAgICAgIHdpZHRoOiA0MjBweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICAgICAgYm94LXNoYWRvdzogMCAxMnB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xuICAgICAgXCJcbiAgICA+XG4gICAgICA8cS1jYXJkLXNlY3Rpb25cbiAgICAgICAgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtcHgtbWQgcS1weS1zbSBiZy1ncmFkaWVudCB0ZXh0LXdoaXRlXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDUgcS1tci1tZFwiPvCfj6ogQWRkIE5ldyBCcmFuY2g8L2Rpdj5cbiAgICAgICAgPHEtc3BhY2UgLz5cbiAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgZGVuc2Ugcm91bmQgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLXNlcGFyYXRvciBjbGFzcz1cInNlcGFyYXRvci1ncmFkaWVudFwiIC8+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXB4LXhsIHEtcHQtbm9uZSBxLXBiLWxnXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LWxnIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICBjbGFzcz1cInRleHQtY2FwaXRhbGl6ZVwiXG4gICAgICAgICAgICB2LW1vZGVsPVwiYWRkTmV3QnJhbmNoRm9ybS5uYW1lXCJcbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgbGFiZWw9XCJCcmFuY2ggTmFtZVwiXG4gICAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCkgfHwgJ05hbWUgaXMgcmVxdWlyZWQnXVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LWxnIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICBjbGFzcz1cInRleHQtY2FwaXRhbGl6ZVwiXG4gICAgICAgICAgICB2LW1vZGVsPVwiYWRkTmV3QnJhbmNoRm9ybS5sb2NhdGlvblwiXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIGxhYmVsPVwiTG9jYXRpb25cIlxuICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+ICh2YWwgJiYgdmFsLmxlbmd0aCA+IDApIHx8ICdMYWJlbCBpcyByZXF1aXJlZCddXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbGcgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJzZWFyY2hLZXl3b3JkXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJTZWFyY2ggRW1wbG95ZWVcIlxuICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgZGVib3VuY2U9XCI1MDBcIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIG5hbWUgb3IgcG9zaXRpb25cIlxuICAgICAgICAgICAgICBAZm9jdXM9XCJzaG93RHJvcGRvd24gPSB0cnVlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgICAgPHEtaWNvbiB2LWlmPVwiIXNlYXJjaExvYWRpbmdcIiBuYW1lPVwic2VhcmNoXCIgLz5cbiAgICAgICAgICAgICAgICA8cS1zcGlubmVyIHYtZWxzZSBjb2xvcj1cImdyZXlcIiBzaXplPVwic21cIiAvPlxuICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgdi1pZj1cInNob3dEcm9wZG93biAmJiBzZWFyY2hLZXl3b3JkXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImN1c3RvbS1saXN0IHotdG9wXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxxLWNhcmQ+XG4gICAgICAgICAgICAgICAgICA8cS1saXN0IHNlcGFyYXRvcj5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbSB2LWlmPVwiIWVtcGxveWVlcz8ubGVuZ3RoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgTm8gRW1wbG95ZWUgUmVjb3JkXG4gICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cImF1dG9GaWxsRW1wbG95ZWUoZW1wbG95ZWUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVwiZW1wbG95ZWUgaW4gZW1wbG95ZWVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDprZXk9XCJlbXBsb3llZS5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja2FibGVcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGZvcm1hdEZ1bGxuYW1lKGVtcGxveWVlKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICAgICAgICAgIDwvcS1jYXJkPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8IS0tIDxxLXNlbGVjdFxuICAgICAgICAgICAgdi1tb2RlbD1cImFkZE5ld0JyYW5jaEZvcm0uZW1wbG95ZWVcIlxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICB1c2UtaW5wdXRcbiAgICAgICAgICAgIGNsZWFyYWJsZVxuICAgICAgICAgICAgaW5wdXQtZGVib3VuY2U9XCIwXCJcbiAgICAgICAgICAgIDpvcHRpb25zPVwiZmlsdGVyRW1wbG95ZWVPcHRpb25zXCJcbiAgICAgICAgICAgIEBmaWx0ZXI9XCJmaWx0ZXJlZEVtcGxveWVlXCJcbiAgICAgICAgICAgIGhpZGUtZHJvcGRvd24taWNvblxuICAgICAgICAgICAgYmVoYXZpb3I9XCJtZW51XCJcbiAgICAgICAgICAvPiAtLT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LWxnIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgdi1tb2RlbD1cInNlbGVjdGVkV2FyZWhvdXNlXCJcbiAgICAgICAgICAgIGNsZWFyYWJsZVxuICAgICAgICAgICAgdXNlLWlucHV0XG4gICAgICAgICAgICBpbnB1dC1kZWJvdW5jZT1cIjBcIlxuICAgICAgICAgICAgOm9wdGlvbnM9XCJmaWx0ZXJXYXJlaG91c2VPcHRpb25zXCJcbiAgICAgICAgICAgIGhpZGUtZHJvcGRvd24taWNvblxuICAgICAgICAgICAgc3RhY2stbGFiZWxcbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgbGFiZWw9XCJXYXJlaG91c2VcIlxuICAgICAgICAgICAgQGZpbHRlcj1cImZpbHRlcldhcmVob3VzZXNcIlxuICAgICAgICAgICAgYmVoYXZpb3I9XCJtZW51XCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLW10LWxnIHEtZ3V0dGVyLXgtc20ganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC02IHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbD1cImFkZE5ld0JyYW5jaEZvcm0ucGhvbmVcIlxuICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBtYXNrPVwiKCs2MykgIyMjIC0gIyMjIC0gIyMjI1wiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiKCs2MykgIyMjIC0gIyMjIC0gIyMjI1wiXG4gICAgICAgICAgICAgIGxhYmVsPVwiUGhvbmUgTnVtYmVyXCJcbiAgICAgICAgICAgICAgOnJ1bGVzPVwiW1xuICAgICAgICAgICAgICAgICh2YWwpID0+ICh2YWwgJiYgdmFsLmxlbmd0aCA+IDApIHx8ICdQaG9uZSBudW1iZXIgaXMgcmVxdWlyZWQnLFxuICAgICAgICAgICAgICBdXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC01IHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJhZGROZXdCcmFuY2hGb3JtLnN0YXR1c1wiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIGxhYmVsPVwiU3RhdHVzXCJcbiAgICAgICAgICAgICAgOm9wdGlvbnM9XCJzdGF0dXNPcHRpb25zXCJcbiAgICAgICAgICAgICAgaGlkZS1kcm9wZG93bi1pY29uXG4gICAgICAgICAgICAgIGJlaGF2aW9yPVwibWVudVwiXG4gICAgICAgICAgICAgIDpydWxlcz1cIltcbiAgICAgICAgICAgICAgICAodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnU3RhdHVzIGlzIHJlcXVpcmVkJyxcbiAgICAgICAgICAgICAgXVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLWFjdGlvbnMgY2xhc3M9XCJyb3cgcS1weC1sZyBxLXB5LXNtIHEtcHQtbm9uZVwiIGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgPHEtYnRuIGNsYXNzPVwiZ2xvc3N5XCIgY29sb3I9XCJncmV5LTlcIiBsYWJlbD1cIkRpc21pc3NcIiB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGNsYXNzPVwiZ2xvc3N5XCJcbiAgICAgICAgICBjb2xvcj1cInRlYWxcIlxuICAgICAgICAgIGxhYmVsPVwiQ3JlYXRlXCJcbiAgICAgICAgICBAY2xpY2s9XCJhZGROZXdCcmFuY2hcIlxuICAgICAgICAgIDpsb2FkaW5nPVwibG9hZGluZ1wiXG4gICAgICAgIC8+XG4gICAgICA8L3EtY2FyZC1hY3Rpb25zPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgcmVhY3RpdmUsIG9uTW91bnRlZCwgY29tcHV0ZWQgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyB1c2VCcmFuY2hlc1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvYnJhbmNoXCI7XG5pbXBvcnQgeyB1c2VXYXJlaG91c2VzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy93YXJlaG91c2VcIjtcbmltcG9ydCB7IHVzZUVtcGxveWVlU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9lbXBsb3llZVwiO1xuXG5jb25zdCBlbXBsb3llZVN0b3JlID0gdXNlRW1wbG95ZWVTdG9yZSgpO1xuY29uc3QgYWRkTmV3QnJhbmNoRGlhbG9nVmlzaWJsZSA9IHJlZihmYWxzZSk7XG5jb25zdCBicmFuY2hTdG9yZSA9IHVzZUJyYW5jaGVzU3RvcmUoKTtcblxuY29uc3Qgb3BlbkFkZGluZ1N0b3JlQnJhbmNoRGlhbG9nID0gKCkgPT4ge1xuICBhZGROZXdCcmFuY2hEaWFsb2dWaXNpYmxlLnZhbHVlID0gdHJ1ZTtcbn07XG5cbmNvbnN0IHdhcmVob3VzZXNTdG9yZSA9IHVzZVdhcmVob3VzZXNTdG9yZSgpO1xuY29uc3Qgd2FyZWhvdXNlT3B0aW9ucyA9IHJlZihbXSk7XG5jb25zdCBmaWx0ZXJXYXJlaG91c2VPcHRpb25zID0gcmVmKFtdKTtcbmNvbnN0IGxvYWRpbmcgPSByZWYoZmFsc2UpO1xuY29uc3Qgc3RhdHVzT3B0aW9ucyA9IFtcIk9wZW5cIiwgXCJPcGVuIHNvb25cIiwgXCJDbG9zZVwiXTtcbmNvbnN0IHNlYXJjaExvYWRpbmcgPSByZWYoZmFsc2UpO1xuY29uc3Qgc2VsZWN0ZWRXYXJlaG91c2UgPSByZWYobnVsbCk7XG5cbmNvbnN0IHNlYXJjaEtleXdvcmQgPSByZWYobnVsbCk7XG5jb25zdCBzaG93RHJvcGRvd24gPSByZWYoZmFsc2UpO1xuY29uc3QgZW1wbG95ZWVzID0gY29tcHV0ZWQoKCkgPT4gZW1wbG95ZWVTdG9yZS5lbXBsb3llZSk7XG5jb25zdCBzZWFyY2ggPSBhc3luYyAoKSA9PiB7XG4gIGlmIChzZWFyY2hLZXl3b3JkLnZhbHVlLnRyaW0oKSkge1xuICAgIHNlYXJjaExvYWRpbmcudmFsdWUgPSB0cnVlO1xuICAgIGF3YWl0IGVtcGxveWVlU3RvcmUuc2VhcmNoQ2VydGFpbkVtcGxveWVlKHNlYXJjaEtleXdvcmQudmFsdWUpO1xuICAgIHNlYXJjaExvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgICBzaG93RHJvcGRvd24udmFsdWUgPSB0cnVlO1xuICB9XG59O1xuXG5jb25zdCBhdXRvRmlsbEVtcGxveWVlID0gKGVtcGxveWVlKSA9PiB7XG4gIC8vIExvZyB0aGUgc2VsZWN0ZWQgZW1wbG95ZWUgZGF0YVxuICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIEVtcGxveWVlOlwiLCBlbXBsb3llZSk7XG5cbiAgYWRkTmV3QnJhbmNoRm9ybS5lbXBsb3llZV9pZCA9IGVtcGxveWVlLmlkO1xuICBhZGROZXdCcmFuY2hGb3JtLmVtcGxveWVlX25hbWUgPSBgJHtlbXBsb3llZS5maXJzdG5hbWV9ICR7XG4gICAgZW1wbG95ZWUubWlkZGxlbmFtZSA/IGVtcGxveWVlLm1pZGRsZW5hbWUuY2hhckF0KDApICsgXCIuXCIgOiBcIlwiXG4gIH0gJHtlbXBsb3llZS5sYXN0bmFtZX1gO1xuICBzZWFyY2hLZXl3b3JkLnZhbHVlID0gYCR7ZW1wbG95ZWUuZmlyc3RuYW1lfSAke1xuICAgIGVtcGxveWVlLm1pZGRsZW5hbWUgPyBlbXBsb3llZS5taWRkbGVuYW1lLmNoYXJBdCgwKSArIFwiLlwiIDogXCJcIlxuICB9ICR7ZW1wbG95ZWUubGFzdG5hbWV9YDtcblxuICBzaG93RHJvcGRvd24udmFsdWUgPSBmYWxzZTtcbiAgLy8gTG9nIHRoZSBmaWxsZWQgZGVzaWduYXRpb24gZGF0YVxuICBjb25zb2xlLmxvZyhcIkZpbGxlZCBhZGROZXdCcmFuY2hGb3JtIERhdGE6XCIsIGFkZE5ld0JyYW5jaEZvcm0pO1xuICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcbiAgLy8gICBzZWFyY2hLZXl3b3JkLnZhbHVlID0gbnVsbDtcbiAgLy8gfSwgMCk7XG59O1xuXG5jb25zdCBmb3JtYXRGdWxsbmFtZSA9IChyb3cpID0+IHtcbiAgY29uc3QgY2FwaXRhbGl6ZSA9IChzdHIpID0+XG4gICAgc3RyID8gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkgOiBcIlwiO1xuXG4gIGNvbnN0IGZpcnN0bmFtZSA9IHJvdy5maXJzdG5hbWUgPyBjYXBpdGFsaXplKHJvdy5maXJzdG5hbWUpIDogXCJObyBGaXJzdG5hbWVcIjtcbiAgY29uc3QgbWlkZGxlbmFtZSA9IHJvdy5taWRkbGVuYW1lXG4gICAgPyBjYXBpdGFsaXplKHJvdy5taWRkbGVuYW1lKS5jaGFyQXQoMCkgKyBcIi5cIlxuICAgIDogXCJcIjtcbiAgY29uc3QgbGFzdG5hbWUgPSByb3cubGFzdG5hbWUgPyBjYXBpdGFsaXplKHJvdy5sYXN0bmFtZSkgOiBcIk5vIExhc3RuYW1lXCI7XG5cbiAgcmV0dXJuIGAke2ZpcnN0bmFtZX0gJHttaWRkbGVuYW1lfSAke2xhc3RuYW1lfWA7XG59O1xuXG5jb25zdCBhZGROZXdCcmFuY2hGb3JtID0gcmVhY3RpdmUoe1xuICBuYW1lOiBcIlwiLFxuICBsb2NhdGlvbjogXCJcIixcbiAgZW1wbG95ZWVfaWQ6IFwiXCIsXG4gIGVtcGxveWVlX25hbWU6IFwiXCIsXG4gIHBob25lOiBcIlwiLFxuICBzdGF0dXM6IFwiXCIsXG59KTtcblxuY29uc3QgZmV0Y2hXYXJlaG91c2VEYXRhID0gYXN5bmMgKCkgPT4ge1xuICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgdHJ5IHtcbiAgICBjb25zdCB3YXJlaG91c2UgPSBhd2FpdCB3YXJlaG91c2VzU3RvcmUuZmV0Y2hXYXJlaG91c2VzKCk7XG5cbiAgICB3YXJlaG91c2VPcHRpb25zLnZhbHVlID0gd2FyZWhvdXNlc1N0b3JlLndhcmVob3VzZXMubWFwKCh2YWwpID0+ICh7XG4gICAgICBsYWJlbDogdmFsLm5hbWUsXG4gICAgICB2YWx1ZTogdmFsLmlkLFxuICAgIH0pKTtcbiAgICBmaWx0ZXJXYXJlaG91c2VPcHRpb25zLnZhbHVlID0gd2FyZWhvdXNlT3B0aW9ucy52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgd2FyZWhvdXNlIGRhdGE6XCIsIGVycm9yKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIH1cbn07XG5cbm9uTW91bnRlZChmZXRjaFdhcmVob3VzZURhdGEpO1xuXG5jb25zdCBmaWx0ZXJXYXJlaG91c2VzID0gKHZhbCwgdXBkYXRlKSA9PiB7XG4gIHVwZGF0ZSgoKSA9PiB7XG4gICAgY29uc3QgbmVlZGxlID0gdmFsLnRvTG93ZXJDYXNlKCk7XG4gICAgZmlsdGVyV2FyZWhvdXNlT3B0aW9ucy52YWx1ZSA9XG4gICAgICB2YWwgPT09IFwiXCJcbiAgICAgICAgPyB3YXJlaG91c2VPcHRpb25zLnZhbHVlXG4gICAgICAgIDogd2FyZWhvdXNlT3B0aW9ucy52YWx1ZS5maWx0ZXIoKHYpID0+XG4gICAgICAgICAgICB2LmxhYmVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobmVlZGxlKVxuICAgICAgICAgICk7XG4gIH0pO1xufTtcblxuY29uc3QgYWRkTmV3QnJhbmNoID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvYWRpbmcudmFsdWUgPSB0cnVlO1xuICAgIGNvbnN0IGZvcm1EYXRhID0ge1xuICAgICAgLi4uYWRkTmV3QnJhbmNoRm9ybSxcbiAgICAgIHdhcmVob3VzZV9pZDogc2VsZWN0ZWRXYXJlaG91c2UudmFsdWU/LnZhbHVlIHx8IG51bGwsXG4gICAgfTtcbiAgICBjb25zb2xlLmxvZyhcImJyYWJyYmJhclwiLCBmb3JtRGF0YSk7XG5cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgYnJhbmNoU3RvcmUuY3JlYXRlQnJhbmNoZXMoZm9ybURhdGEpO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gICAgYWRkTmV3QnJhbmNoRGlhbG9nVmlzaWJsZS52YWx1ZSA9IGZhbHNlO1xuICAgIHJlc2V0Rm9ybURhdGEoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY3JlYXRpbmcgYnJhbmNoOlwiLCBlcnJvcik7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID1cbiAgICAgIGVycm9yLnJlc3BvbnNlPy5kYXRhPy5tZXNzYWdlIHx8XG4gICAgICBlcnJvci5tZXNzYWdlIHx8XG4gICAgICBcIkZhaWxlZCB0byBjcmVhdGUgYnJhbmNoLiBQbGVhc2UgdHJ5IGFnYWluLlwiO1xuICAgIGFkZE5ld0JyYW5jaERpYWxvZ1Zpc2libGUudmFsdWUgPSB0cnVlO1xuICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgY29sb3I6IFwibmVnYXRpdmVcIixcbiAgICAgIGljb246IFwid2FybmluZ1wiLFxuICAgICAgbWVzc2FnZTogZXJyb3JNZXNzYWdlLFxuICAgIH0pO1xuICB9IGZpbmFsbHkge1xuICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgcmVzZXRGb3JtRGF0YSA9ICgpID0+IHtcbiAgYWRkTmV3QnJhbmNoRm9ybS5uYW1lID0gXCJcIjtcbiAgYWRkTmV3QnJhbmNoRm9ybS5sb2NhdGlvbiA9IFwiXCI7XG4gIGFkZE5ld0JyYW5jaEZvcm0uZW1wbG95ZWVfaWQgPSBcIlwiO1xuICBhZGROZXdCcmFuY2hGb3JtLmVtcGxveWVlX25hbWUgPSBcIlwiO1xuICBzZWFyY2hLZXl3b3JkLnZhbHVlID0gbnVsbDtcbiAgc2VsZWN0ZWRXYXJlaG91c2UudmFsdWUgPSBudWxsO1xuICBhZGROZXdCcmFuY2hGb3JtLnBob25lID0gXCJcIjtcbiAgYWRkTmV3QnJhbmNoRm9ybS5zdGF0dXMgPSBcIlwiO1xufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLm15LWNhcmQge1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBhbmltYXRpb246IGZhZGVJbiAwLjNzIGVhc2U7XG59XG5cbi5idG4tYWRkIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjMDAwMDAwLCAjMDAwMDAwKTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uYmctZ3JhZGllbnQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMDBiZmE1LCAjMDA3OTZiKTtcbn1cblxuLnNlcGFyYXRvci1ncmFkaWVudCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzAwYmZhNSwgIzAwNzk2Yik7XG59XG5cbi5xLWJ0biB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xufVxuXG4ucS1idG46aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcbn1cblxuLmJ0bi1jYW5jZWwge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNlZjUzNTAsICNlNTM5MzUpO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5idG4tY3JlYXRlIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjNjZiYjZhLCAjNDNhMDQ3KTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4ucS1hbmltYXRlLWJvdW5jZSB7XG4gIGFuaW1hdGlvbjogYm91bmNlSW4gMC42cyBlYXNlO1xufVxuXG5Aa2V5ZnJhbWVzIGZhZGVJbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwcHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIGJvdW5jZUluIHtcbiAgZnJvbSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7XG4gIH1cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICB9XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1idG5cbiAgICBAY2xpY2s9XCJvcGVuRWRpdEZvcm1cIlxuICAgIGNvbG9yPVwicG9zaXRpdmVcIlxuICAgIGljb249XCJlZGl0XCJcbiAgICBzaXplPVwic21cIlxuICAgIGZsYXRcbiAgICByb3VuZFxuICAgIGRlbnNlXG4gID5cbiAgICA8cS10b29sdGlwIGNsYXNzPVwiYmctcG9zaXRpdmVcIiA6ZGVsYXk9XCIyMDBcIj5FZGl0PC9xLXRvb2x0aXA+XG4gIDwvcS1idG4+XG4gIDxxLWRpYWxvZ1xuICAgIHYtbW9kZWw9XCJkaWFsb2dcIlxuICAgIHBlcnNpc3RlbnRcbiAgICB0cmFuc2l0aW9uLXNob3c9XCJqdW1wLXVwXCJcbiAgICB0cmFuc2l0aW9uLWhpZGU9XCJqdW1wLWRvd25cIlxuICA+XG4gICAgPHEtY2FyZFxuICAgICAgY2xhc3M9XCJteS1jYXJkIHEtcGEtbm9uZVwiXG4gICAgICBzdHlsZT1cIlxuICAgICAgICB3aWR0aDogNDIwcHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMTJweCAyNHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgICAgIFwiXG4gICAgPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uXG4gICAgICAgIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBxLXB4LW1kIHEtcHktc20gYmctZ3JhZGllbnQgdGV4dC13aGl0ZVwiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg1IHEtbXItbWRcIj7wn4+qIEVkaXQgQnJhbmNoPC9kaXY+XG4gICAgICAgIDxxLXNwYWNlIC8+XG4gICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IGRlbnNlIHJvdW5kIHYtY2xvc2UtcG9wdXAgLz5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1zZXBhcmF0b3IgY2xhc3M9XCJzZXBhcmF0b3ItZ3JhZGllbnRcIiAvPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1weC14bCBxLXB0LW5vbmUgcS1wYi1sZ1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1sZyBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICA8ZGl2Pk5hbWUgb2YgQnJhbmNoPC9kaXY+XG4gICAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cImVkaXRCcmFuY2hlc0Zvcm0ubmFtZVwiIG91dGxpbmVkIGRlbnNlIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1sZyBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICA8ZGl2PkxvY2F0aW9uPC9kaXY+XG4gICAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cImVkaXRCcmFuY2hlc0Zvcm0ubG9jYXRpb25cIiBvdXRsaW5lZCBkZW5zZSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbGcgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgPGRpdj5QZXJzb24gSW4tY2hhcmdlPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJzZWFyY2hLZXl3b3JkXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJTZWFyY2ggRW1wbG95ZWVcIlxuICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgZGVib3VuY2U9XCI1MDBcIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIG5hbWUgb3IgcG9zaXRpb25cIlxuICAgICAgICAgICAgICBAZm9jdXM9XCJzaG93RHJvcGRvd24gPSB0cnVlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgICAgPHEtaWNvbiB2LWlmPVwiIXNlYXJjaExvYWRpbmdcIiBuYW1lPVwic2VhcmNoXCIgLz5cbiAgICAgICAgICAgICAgICA8cS1zcGlubmVyIHYtZWxzZSBjb2xvcj1cImdyZXlcIiBzaXplPVwic21cIiAvPlxuICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgdi1pZj1cInNob3dEcm9wZG93biAmJiBzZWFyY2hLZXl3b3JkXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImN1c3RvbS1saXN0IHotdG9wXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxxLWNhcmQ+XG4gICAgICAgICAgICAgICAgICA8cS1saXN0IHNlcGFyYXRvcj5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbSB2LWlmPVwiIWVtcGxveWVlcz8ubGVuZ3RoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgTm8gRW1wbG95ZWUgUmVjb3JkXG4gICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cImF1dG9GaWxsRW1wbG95ZWUoZW1wbG95ZWUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVwiZW1wbG95ZWUgaW4gZW1wbG95ZWVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDprZXk9XCJlbXBsb3llZS5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlja2FibGVcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYCR7ZW1wbG95ZWUuZmlyc3RuYW1lfSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1wbG95ZWUubWlkZGxlbmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGVtcGxveWVlLm1pZGRsZW5hbWUuY2hhckF0KDApICsgXCIuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAke2VtcGxveWVlLmxhc3RuYW1lfWBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICA8L3EtbGlzdD5cbiAgICAgICAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1sZyBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICA8ZGl2PlVuZGVyIFdhcmVob3VzZTwvZGl2PlxuICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgdi1tb2RlbD1cImVkaXRCcmFuY2hlc0Zvcm0ud2FyZWhvdXNlX2lkXCJcbiAgICAgICAgICAgIHVzZS1pbnB1dFxuICAgICAgICAgICAgaW5wdXQtZGVib3VuY2U9XCIwXCJcbiAgICAgICAgICAgIDpvcHRpb25zPVwid2FyZWhvdXNlc1wiXG4gICAgICAgICAgICBzdGFjay1sYWJlbFxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBlbWl0LXZhbHVlXG4gICAgICAgICAgICBtYXAtb3B0aW9uc1xuICAgICAgICAgICAgb3B0aW9uLWxhYmVsPVwibmFtZVwiXG4gICAgICAgICAgICBvcHRpb24tdmFsdWU9XCJpZFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXIteC1zbSBqdXN0aWZ5LWJldHdlZW4gcS1tdC1zbVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNiBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICAgIDxkaXY+UGhvbmUgTnVtYmVyPC9kaXY+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICB2LW1vZGVsPVwiZWRpdEJyYW5jaGVzRm9ybS5waG9uZVwiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIG1hc2s9XCIoKzYzKSAjIyMgLSAjIyMgLSAjIyMjXCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIoKzYzKSAjIyMgLSAjIyMgLSAjIyMjXCJcbiAgICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+IHZhbCAmJiB2YWwubGVuZ3RoID4gMF1cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTUgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgICA8ZGl2PlN0YXR1czwvZGl2PlxuICAgICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJlZGl0QnJhbmNoZXNGb3JtLnN0YXR1c1wiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIDpvcHRpb25zPVwic3RhdHVzT3B0aW9uc1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLWFjdGlvbnMgY2xhc3M9XCJyb3cgcS1weC1sZyBxLXB5LXNtIHEtcHQtbm9uZVwiIGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgPHEtYnRuIGNsYXNzPVwiZ2xvc3N5XCIgY29sb3I9XCJncmV5LTlcIiBsYWJlbD1cIkRpc21pc3NcIiB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGNsYXNzPVwiZ2xvc3N5XCJcbiAgICAgICAgICBjb2xvcj1cInRlYWxcIlxuICAgICAgICAgIGxhYmVsPVwiU2F2ZVwiXG4gICAgICAgICAgQGNsaWNrPVwic2F2ZUVkaXRlZEJyYW5jaGVzXCJcbiAgICAgICAgLz5cbiAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgcmVhY3RpdmUsIHJlZiwgb25Nb3VudGVkLCBjb21wdXRlZCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IHVzZVdhcmVob3VzZXNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3dhcmVob3VzZVwiO1xuaW1wb3J0IHsgdXNlQnJhbmNoZXNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2JyYW5jaFwiO1xuaW1wb3J0IHsgdXNlRW1wbG95ZWVTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2VtcGxveWVlXCI7XG5cbmNvbnN0IGVtcGxveWVlU3RvcmUgPSB1c2VFbXBsb3llZVN0b3JlKCk7XG5jb25zdCBicmFuY2hlc1N0b3JlID0gdXNlQnJhbmNoZXNTdG9yZSgpO1xuY29uc3Qgd2FyZWhvdXNlc1N0b3JlID0gdXNlV2FyZWhvdXNlc1N0b3JlKCk7XG5jb25zdCB3YXJlaG91c2VzID0gY29tcHV0ZWQoKCkgPT4gd2FyZWhvdXNlc1N0b3JlLndhcmVob3VzZXMpO1xuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyhbXCJlZGl0XCJdKTtcbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5jb25zdCB3YXJlaG91c2VPcHRpb25zID0gcmVmKFtdKTtcbmxldCBlZGl0Um93ID0gcHJvcHMuZWRpdC5yb3c7XG5jb25zdCBzdGF0dXNPcHRpb25zID0gW1wiT3BlblwiLCBcIk9wZW4gc29vblwiLCBcIkNsb3NlXCJdO1xuY29uc3Qgc2VhcmNoS2V5d29yZCA9IHJlZihudWxsKTtcbmNvbnN0IHNlYXJjaExvYWRpbmcgPSByZWYoZmFsc2UpO1xuY29uc3Qgc2hvd0Ryb3Bkb3duID0gcmVmKGZhbHNlKTtcblxuY29uc3QgZW1wbG95ZWVzID0gY29tcHV0ZWQoKCkgPT4gZW1wbG95ZWVTdG9yZS5lbXBsb3llZSk7XG5jb25zdCBzZWFyY2ggPSBhc3luYyAoKSA9PiB7XG4gIGlmIChzZWFyY2hLZXl3b3JkLnZhbHVlLnRyaW0oKSkge1xuICAgIHNlYXJjaExvYWRpbmcudmFsdWUgPSB0cnVlO1xuICAgIGF3YWl0IGVtcGxveWVlU3RvcmUuc2VhcmNoQ2VydGFpbkVtcGxveWVlKHNlYXJjaEtleXdvcmQudmFsdWUpO1xuICAgIHNlYXJjaExvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgICBzaG93RHJvcGRvd24udmFsdWUgPSB0cnVlO1xuICB9XG59O1xuXG5jb25zdCBhdXRvRmlsbEVtcGxveWVlID0gKGVtcGxveWVlKSA9PiB7XG4gIC8vIExvZyB0aGUgc2VsZWN0ZWQgZW1wbG95ZWUgZGF0YVxuICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIEVtcGxveWVlOlwiLCBlbXBsb3llZSk7XG5cbiAgZWRpdEJyYW5jaGVzRm9ybS5lbXBsb3llZV9pZCA9IGVtcGxveWVlLmlkO1xuICBlZGl0QnJhbmNoZXNGb3JtLmVtcGxveWVlX25hbWUgPSBgJHtlbXBsb3llZS5maXJzdG5hbWV9ICR7XG4gICAgZW1wbG95ZWUubWlkZGxlbmFtZSA/IGVtcGxveWVlLm1pZGRsZW5hbWUuY2hhckF0KDApICsgXCIuXCIgOiBcIlwiXG4gIH0gJHtlbXBsb3llZS5sYXN0bmFtZX1gO1xuICBzZWFyY2hLZXl3b3JkLnZhbHVlID0gYCR7ZW1wbG95ZWUuZmlyc3RuYW1lfSAke1xuICAgIGVtcGxveWVlLm1pZGRsZW5hbWUgPyBlbXBsb3llZS5taWRkbGVuYW1lLmNoYXJBdCgwKSArIFwiLlwiIDogXCJcIlxuICB9ICR7ZW1wbG95ZWUubGFzdG5hbWV9YDtcblxuICBzaG93RHJvcGRvd24udmFsdWUgPSBmYWxzZTtcbiAgLy8gTG9nIHRoZSBmaWxsZWQgZGVzaWduYXRpb24gZGF0YVxuICBjb25zb2xlLmxvZyhcIkZpbGxlZCBlZGl0QnJhbmNoZXNGb3JtIERhdGE6XCIsIGVkaXRCcmFuY2hlc0Zvcm0pO1xuICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcbiAgLy8gICBzZWFyY2hLZXl3b3JkLnZhbHVlID0gbnVsbDtcbiAgLy8gfSwgMCk7XG59O1xuXG5jb25zdCBvcGVuRWRpdEZvcm0gPSAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiRWRpdCBSb3cgRGF0YTpcIiwgZWRpdFJvdyk7XG4gIHNob3dEcm9wZG93bi52YWx1ZSA9IGZhbHNlO1xuICBlZGl0QnJhbmNoZXNGb3JtLm5hbWUgPSBlZGl0Um93Lm5hbWU7XG4gIGVkaXRCcmFuY2hlc0Zvcm0ubG9jYXRpb24gPSBlZGl0Um93LmxvY2F0aW9uO1xuICBlZGl0QnJhbmNoZXNGb3JtLmVtcGxveWVlX2lkID0gZWRpdFJvdy5lbXBsb3llZV9pZDtcbiAgZWRpdEJyYW5jaGVzRm9ybS5lbXBsb3llZV9uYW1lID0gZWRpdFJvdy5lbXBsb3llZXNcbiAgICA/IGZvcm1hdEZ1bGxuYW1lKGVkaXRSb3cuZW1wbG95ZWVzKVxuICAgIDogXCJObyBQZXJzb24gaW4gQ2hhcmdlXCI7XG4gIHNlYXJjaEtleXdvcmQudmFsdWUgPSBlZGl0Um93LmVtcGxveWVlc1xuICAgID8gZm9ybWF0RnVsbG5hbWUoZWRpdFJvdy5lbXBsb3llZXMpXG4gICAgOiBcIk5vIFBlcnNvbiBpbiBDaGFyZ2VcIjtcbiAgZWRpdEJyYW5jaGVzRm9ybS53YXJlaG91c2VfaWQgPSBlZGl0Um93Py53YXJlaG91c2VfaWRcbiAgICA/IGVkaXRSb3cud2FyZWhvdXNlX2lkXG4gICAgOiBlZGl0Um93Py53YXJlaG91c2U/LmlkXG4gICAgPyBlZGl0Um93Py53YXJlaG91c2U/LmlkXG4gICAgOiBcIlwiO1xuICBlZGl0QnJhbmNoZXNGb3JtLnBob25lID0gZWRpdFJvdy5waG9uZTtcbiAgZWRpdEJyYW5jaGVzRm9ybS5zdGF0dXMgPSBlZGl0Um93LnN0YXR1cztcbiAgZGlhbG9nLnZhbHVlID0gdHJ1ZTtcbiAgY29uc29sZS5sb2coXCJFZGl0IERhdGE6XCIsIGVkaXRCcmFuY2hlc0Zvcm0pO1xufTtcblxuY29uc3QgZWRpdEJyYW5jaGVzRm9ybSA9IHJlYWN0aXZlKHtcbiAgbmFtZTogXCJcIixcbiAgbG9jYXRpb246IFwiXCIsXG4gIHBlcnNvbl9pbmNoYXJnZTogXCJcIixcbiAgZW1wbG95ZWVfaWQ6IFwiXCIsXG4gIGVtcGxveWVlX25hbWU6IFwiXCIsXG4gIHdhcmVob3VzZV9pZDogbnVsbCxcbiAgcGhvbmU6IFwiXCIsXG4gIHN0YXR1czogbnVsbCxcbn0pO1xuXG5jb25zdCBmb3JtYXRGdWxsbmFtZSA9IChyb3cpID0+IHtcbiAgY29uc3QgY2FwaXRhbGl6ZSA9IChzdHIpID0+XG4gICAgc3RyID8gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkgOiBcIlwiO1xuXG4gIGNvbnN0IGZpcnN0bmFtZSA9IHJvdy5maXJzdG5hbWUgPyBjYXBpdGFsaXplKHJvdy5maXJzdG5hbWUpIDogXCJObyBGaXJzdG5hbWVcIjtcbiAgY29uc3QgbWlkZGxlbmFtZSA9IHJvdy5taWRkbGVuYW1lXG4gICAgPyBjYXBpdGFsaXplKHJvdy5taWRkbGVuYW1lKS5jaGFyQXQoMCkgKyBcIi5cIlxuICAgIDogXCJcIjtcbiAgY29uc3QgbGFzdG5hbWUgPSByb3cubGFzdG5hbWUgPyBjYXBpdGFsaXplKHJvdy5sYXN0bmFtZSkgOiBcIk5vIExhc3RuYW1lXCI7XG5cbiAgcmV0dXJuIGAke2ZpcnN0bmFtZX0gJHttaWRkbGVuYW1lfSAke2xhc3RuYW1lfWA7XG59O1xuXG5jb25zdCBzYXZlRWRpdGVkQnJhbmNoZXMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiZWRpdFJvdy5pZFwiLCBlZGl0Um93LmlkKTtcbiAgY29uc29sZS5sb2coXCJlZGl0QnJhbmNoZXNGb3JtXCIsIGVkaXRCcmFuY2hlc0Zvcm0pO1xuICB0cnkge1xuICAgIGF3YWl0IGJyYW5jaGVzU3RvcmUudXBkYXRlQnJhbmNoZXMoZWRpdFJvdy5pZCwgZWRpdEJyYW5jaGVzRm9ybSk7XG5cbiAgICBkaWFsb2cudmFsdWUgPSBmYWxzZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgYnJhbmNoOlwiLCBlcnJvcik7XG4gIH1cbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5teS1jYXJkIHtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYW5pbWF0aW9uOiBmYWRlSW4gMC4zcyBlYXNlO1xufVxuXG4uYnRuLWFkZCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzAwMDAwMCwgIzAwMDAwMCk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmJnLWdyYWRpZW50IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzAwYmZhNSwgIzAwNzk2Yik7XG59XG5cbi5zZXBhcmF0b3ItZ3JhZGllbnQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMwMGJmYTUsICMwMDc5NmIpO1xufVxuXG4ucS1idG4ge1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcbn1cblxuLnEtYnRuOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpO1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG5cbi5idG4tY2FuY2VsIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZWY1MzUwLCAjZTUzOTM1KTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uYnRuLWNyZWF0ZSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzY2YmI2YSwgIzQzYTA0Nyk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLnEtYW5pbWF0ZS1ib3VuY2Uge1xuICBhbmltYXRpb246IGJvdW5jZUluIDAuNnMgZWFzZTtcbn1cblxuQGtleWZyYW1lcyBmYWRlSW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMHB4KTtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIH1cbn1cblxuQGtleWZyYW1lcyBib3VuY2VJbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtYnRuXG4gICAgQGNsaWNrPVwiZGVsZXRlRGlhbG9nXCJcbiAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICBpY29uPVwiZGVsZXRlXCJcbiAgICBzaXplPVwic21cIlxuICAgIGZsYXRcbiAgICByb3VuZFxuICAgIGRlbnNlXG4gID5cbiAgICA8cS10b29sdGlwIGNsYXNzPVwiYmctbmVnYXRpdmVcIiA6ZGVsYXk9XCIyMDBcIj5EZWxldGU8L3EtdG9vbHRpcD5cbiAgPC9xLWJ0bj5cbiAgPHEtZGlhbG9nIHYtbW9kZWw9XCJkaWFsb2dWaXNpYmxlXCI+XG4gICAgPHEtY2FyZCBjbGFzcz1cInEtcGEtbWQgcS1yb3VuZGVkIHEtZWxldmF0ZS0yIGJnLXdoaXRlIHRleHQtZ3JleS05XCI+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXB0LW5vbmUgcS1wYi1zbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNSBxLW1iLXhzXCI+Q29uZmlybSBEZWxldGlvbjwvZGl2PlxuICAgICAgICA8cCBjbGFzcz1cInRleHQtYm9keTIgcS1tYi1ub25lXCI+XG4gICAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/IFRoaXMgYWN0aW9uIGNhbm5vdCBiZVxuICAgICAgICAgIHVuZG9uZS5cbiAgICAgICAgPC9wPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgICAgPHEtc2VwYXJhdG9yIGNsYXNzPVwicS1tYi1tZFwiIC8+XG5cbiAgICAgIDxxLWNhcmQtYWN0aW9ucyBhbGlnbj1cInJpZ2h0XCIgY2xhc3M9XCJxLXB0LW5vbmVcIj5cbiAgICAgICAgPHEtYnRuXG4gICAgICAgICAgZmxhdFxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgbGFiZWw9XCJDYW5jZWxcIlxuICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgdi1jbG9zZS1wb3B1cFxuICAgICAgICAgIGNsYXNzPVwicS1tci1zbVwiXG4gICAgICAgIC8+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgbGFiZWw9XCJEZWxldGVcIlxuICAgICAgICAgIGNvbG9yPVwibmVnYXRpdmVcIlxuICAgICAgICAgIEBjbGljaz1cIm9uRGVsZXRlXCJcbiAgICAgICAgICBjbGFzcz1cInEtYnRuLXJvdW5kZWQgcS1weC1sZ1wiXG4gICAgICAgIC8+XG4gICAgICA8L3EtY2FyZC1hY3Rpb25zPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IE5vdGlmeSB9IGZyb20gXCJxdWFzYXJcIjtcbmltcG9ydCB7IHVzZUJyYW5jaGVzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9icmFuY2hcIjtcblxuY29uc3QgYnJhbmNoZXNTdG9yZSA9IHVzZUJyYW5jaGVzU3RvcmUoKTtcbmNvbnN0IGRpYWxvZ1Zpc2libGUgPSByZWYoZmFsc2UpO1xuY29uc3QgZGVsZXRlRGlhbG9nID0gKCkgPT4ge1xuICBkaWFsb2dWaXNpYmxlLnZhbHVlID0gdHJ1ZTtcbn07XG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzKFtcImRlbGV0ZVwiXSk7XG5cbmNvbnN0IG9uRGVsZXRlID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGF3YWl0IGJyYW5jaGVzU3RvcmUuZGVsZXRlQnJhbmNoZXMocHJvcHMuZGVsZXRlLnJvdy5pZCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgfVxuXG4gIGRpYWxvZ1Zpc2libGUudmFsdWUgPSBmYWxzZTtcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5xLWNhcmQge1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBib3gtc2hhZG93OiAwIDhweCAyNHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuLnEtY2FyZC1zZWN0aW9uIHtcbiAgcGFkZGluZzogMjRweCAzMnB4O1xufVxuXG4ucS1idG4ge1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycyBlYXNlLCBib3gtc2hhZG93IDAuMnMgZWFzZTtcbn1cblxuLnEtYnRuLXJvdW5kZWQge1xuICBib3JkZXItcmFkaXVzOiA1MHB4O1xufVxuXG4ucS1idG46aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcbn1cblxuLnEtYnRuOmFjdGl2ZSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgYm94LXNoYWRvdzogbm9uZTtcbn1cblxuLnRleHQtaDUge1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4udGV4dC1ib2R5MiB7XG4gIGNvbG9yOiAjNjY2O1xufVxuXG4ucS1lbGV2YXRlLTIge1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4uYmctd2hpdGUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xufVxuXG4udGV4dC1ncmV5LTkge1xuICBjb2xvcjogIzMzMztcbn1cblxuLnEtc2VwYXJhdG9yIHtcbiAgYm9yZGVyLWNvbG9yOiAjZWVlO1xufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8cS1pbnB1dFxuICAgICAgY2xhc3M9XCJxLXBiLWxnIHEtcGwtc20gZHluYW1pYy13aWR0aFwiXG4gICAgICB2LW1vZGVsPVwiZmlsdGVyXCJcbiAgICAgIG91dGxpbmVkXG4gICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgICBkZWJvdW5jZWQ9XCIxMDAwXCJcbiAgICAgIGZsYXRcbiAgICAgIGRlbnNlXG4gICAgICByb3VuZGVkXG4gICAgPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgIDxxLWljb24gbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS1pbnB1dD5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzcGlubmVyLXdyYXBwZXJcIiB2LWlmPVwibG9hZGluZ1wiPlxuICAgIDxxLXNwaW5uZXItZG90cyBzaXplPVwiNTBweFwiIGNvbG9yPVwicHJpbWFyeVwiIC8+XG4gIDwvZGl2PlxuICA8ZGl2IHYtZWxzZT5cbiAgICA8ZGl2IHYtaWY9XCJmaWx0ZXJlZFJvd3MubGVuZ3RoID09PSAwXCIgY2xhc3M9XCJkYXRhLWVycm9yXCI+XG4gICAgICA8cS1pY29uIG5hbWU9XCJ3YXJuaW5nXCIgY29sb3I9XCJ3YXJuaW5nXCIgc2l6ZT1cIjRlbVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1tbC1zbSB0ZXh0LWg2XCI+Tm8gZGF0YSBhdmFpbGFibGU8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8cS10YWJsZVxuICAgICAgdi1lbHNlXG4gICAgICBjbGFzcz1cInRhYmxlLWNvbnRhaW5lciBlbGVnYW50LWNvbnRhaW5lciBzdGlja3ktaGVhZGVyXCJcbiAgICAgIDp2aXJ0dWFsLXNjcm9sbC1zdGlja3ktc2l6ZS1zdGFydD1cIjQ4XCJcbiAgICAgIGZsYXRcbiAgICAgIHN0eWxlPVwiaGVpZ2h0OiA0MDBweFwiXG4gICAgICA6Y29sdW1ucz1cImJyYW5jaGVzQ29sdW1uc1wiXG4gICAgICA6cm93cz1cImZpbHRlcmVkUm93c1wiXG4gICAgICByb3cta2V5PVwibmFtZVwiXG4gICAgICB2aXJ0dWFsLXNjcm9sbFxuICAgICAgdi1tb2RlbDpwYWdpbmF0aW9uPVwicGFnaW5hdGlvblwiXG4gICAgICA6cm93cy1wZXItcGFnZS1vcHRpb25zPVwiWzBdXCJcbiAgICAgIGhpZGUtYm90dG9tXG4gICAgPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtYnJhbmNoX25hbWU9XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCBrZXk9XCJuYW1lXCIgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8YSBAY2xpY2sucHJldmVudD1cImdvVG9CcmFuY2gocHJvcHMucm93KVwiIGNsYXNzPVwiYnJhbmNoLWxpbmtcIj5cbiAgICAgICAgICAgIHt7IGNhcGl0YWxpemVGaXJzdExldHRlcihwcm9wcy5yb3cubmFtZSkgfX1cbiAgICAgICAgICAgIDwhLS0gPHNwYW4gY2xhc3M9XCJ0b29sdGlwLXRleHRcIj5HbyB0byBzdG9yZTwvc3Bhbj4gLS0+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtd2FyZWhvdXNlPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICB7eyBjYXBpdGFsaXplRmlyc3RMZXR0ZXIocHJvcHMucm93LndhcmVob3VzZT8ubmFtZSkgfX1cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLWxvY2F0aW9uPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICB7eyBjYXBpdGFsaXplRmlyc3RMZXR0ZXIocHJvcHMucm93LmxvY2F0aW9uKSB9fVxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtc3RhdHVzPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQga2V5PVwibmFtZVwiIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPHEtYmFkZ2Ugb3V0bGluZSA6Y29sb3I9XCJnZXRCYWRnZVN0YXR1c0NvbG9yKHByb3BzLnJvdy5zdGF0dXMpXCI+XG4gICAgICAgICAgICB7eyBwcm9wcy5yb3cuc3RhdHVzIH19XG4gICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPCEtLSA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC13YXJlaG91c2U9XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgIHt7IGZvcm1hdEZ1bGxuYW1lKHByb3BzLnJvdykgfX1cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT4gLS0+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC1wZXJzb25JbmNoYXJnZT1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAge3sgZm9ybWF0RnVsbG5hbWUocHJvcHMucm93LmVtcGxveWVlcykgfX1cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLWFjdGlvbj1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWNlbnRlciBxLWd1dHRlci14LW1kXCI+XG4gICAgICAgICAgICA8QnJhbmNoZXNFZGl0IDplZGl0PVwicHJvcHNcIiAvPlxuICAgICAgICAgICAgPEJyYW5jaGVzRGVsZXRlIDpkZWxldGU9XCJwcm9wc1wiIC8+XG4gICAgICAgICAgICA8IS0tIDxCcmFuY2hlc0dvVG8gOmRhdGE9XCJwcm9wc1wiIC8+IC0tPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS10YWJsZT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IEJyYW5jaGVzR29UbyBmcm9tIFwiLi9CcmFuY2hlc0dvVG9Db21wb25lbnQudnVlXCI7XG5pbXBvcnQgQnJhbmNoZXNFZGl0IGZyb20gXCIuL0JyYW5jaGVzRWRpdENvbXBvbmVudC52dWVcIjtcbmltcG9ydCBCcmFuY2hlc0RlbGV0ZSBmcm9tIFwiLi9CcmFuY2hlc0RlbGV0ZUNvbXBvbmVudC52dWVcIjtcbmltcG9ydCB7IG9uTW91bnRlZCwgY29tcHV0ZWQsIHJlZiwgd2F0Y2ggfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyB1c2VCcmFuY2hlc1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvYnJhbmNoXCI7XG5pbXBvcnQgeyB1c2VXYXJlaG91c2VzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy93YXJlaG91c2VcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJ2dWUtcm91dGVyXCI7XG5pbXBvcnQgeyBMb2FkaW5nIH0gZnJvbSBcInF1YXNhclwiO1xuXG5jb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbmNvbnN0IGJyYW5jaGVzU3RvcmUgPSB1c2VCcmFuY2hlc1N0b3JlKCk7XG5jb25zdCB3YXJlaG91c2VzU3RvcmUgPSB1c2VXYXJlaG91c2VzU3RvcmUoKTtcbmNvbnN0IGZpbHRlciA9IHJlZihcIlwiKTtcbmNvbnN0IGJyYW5jaGVzUm93cyA9IGNvbXB1dGVkKCgpID0+IGJyYW5jaGVzU3RvcmUuYnJhbmNoZXMpO1xuY29uc29sZS5sb2coXCJicmFuY2hlc1Jvd1wiLCBicmFuY2hlc1Jvd3MudmFsdWUpO1xuY29uc3QgbG9hZGluZyA9IHJlZih0cnVlKTtcbmNvbnN0IHNob3dOb0RhdGFNZXNzYWdlID0gcmVmKGZhbHNlKTtcbmNvbnN0IHBhZ2luYXRpb24gPSByZWYoe1xuICByb3dzUGVyUGFnZTogMCxcbn0pO1xuXG5jb25zdCBmaWx0ZXJlZFJvd3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmICghZmlsdGVyLnZhbHVlKSB7XG4gICAgcmV0dXJuIGJyYW5jaGVzUm93cy52YWx1ZTtcbiAgfVxuICBjb25zdCBmaWx0ZXJUZXh0ID0gZmlsdGVyLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiBicmFuY2hlc1Jvd3MudmFsdWUuZmlsdGVyKChyb3cpID0+IHtcbiAgICBjb25zdCBuYW1lID0gcm93Lm5hbWUgPyByb3cubmFtZS50b0xvd2VyQ2FzZSgpIDogXCJcIjtcbiAgICBjb25zdCB3YXJlaG91c2VOYW1lID0gcm93Py53YXJlaG91c2U/Lm5hbWVcbiAgICAgID8gcm93LndhcmVob3VzZS5uYW1lLnRvTG93ZXJDYXNlKClcbiAgICAgIDogXCJcIjtcbiAgICByZXR1cm4gbmFtZS5pbmNsdWRlcyhmaWx0ZXJUZXh0KSB8fCB3YXJlaG91c2VOYW1lLmluY2x1ZGVzKGZpbHRlclRleHQpO1xuICB9KTtcbn0pO1xuXG5vbk1vdW50ZWQoYXN5bmMgKCkgPT4ge1xuICBhd2FpdCB3YXJlaG91c2VzU3RvcmUuZmV0Y2hXYXJlaG91c2VzKCk7XG4gIGF3YWl0IHJlbG9hZFRhYmxlRGF0YSgpO1xufSk7XG5cbmNvbnN0IHJlbG9hZFRhYmxlRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBicmFuY2hlc1N0b3JlLmZldGNoQnJhbmNoZXMoKTtcbiAgICBjb25zb2xlLmxvZyhcImJyYW5jaGVzIGRhdGFcIiwgcmVzcG9uc2UpO1xuICAgIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gYnJhbmNoZXNSb3dzLnZhbHVlLmxlbmd0aCA9PT0gMDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IHRydWU7XG4gIH0gZmluYWxseSB7XG4gICAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICB9XG59O1xuXG53YXRjaChmaWx0ZXIsIGFzeW5jIChuZXdGaWx0ZXIpID0+IHtcbiAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApKTtcbiAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IGZpbHRlcmVkUm93cy52YWx1ZS5sZW5ndGggPT09IDA7XG59KTtcblxuY29uc3QgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyID0gKGxvY2F0aW9uKSA9PiB7XG4gIGlmICghbG9jYXRpb24pIHJldHVybiBcIlwiO1xuICByZXR1cm4gbG9jYXRpb25cbiAgICAuc3BsaXQoXCIgXCIpXG4gICAgLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSlcbiAgICAuam9pbihcIiBcIik7XG59O1xuXG5jb25zdCBmb3JtYXRGdWxsbmFtZSA9IChyb3cpID0+IHtcbiAgY29uc3QgY2FwaXRhbGl6ZSA9IChzdHIpID0+XG4gICAgc3RyID8gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkgOiBcIlwiO1xuXG4gIGNvbnN0IGZpcnN0bmFtZSA9IHJvdy5maXJzdG5hbWUgPyBjYXBpdGFsaXplKHJvdy5maXJzdG5hbWUpIDogXCJObyBGaXJzdG5hbWVcIjtcbiAgY29uc3QgbWlkZGxlbmFtZSA9IHJvdy5taWRkbGVuYW1lXG4gICAgPyBjYXBpdGFsaXplKHJvdy5taWRkbGVuYW1lKS5jaGFyQXQoMCkgKyBcIi5cIlxuICAgIDogXCJcIjtcbiAgY29uc3QgbGFzdG5hbWUgPSByb3cubGFzdG5hbWUgPyBjYXBpdGFsaXplKHJvdy5sYXN0bmFtZSkgOiBcIk5vIExhc3RuYW1lXCI7XG5cbiAgcmV0dXJuIGAke2ZpcnN0bmFtZX0gJHttaWRkbGVuYW1lfSAke2xhc3RuYW1lfWA7XG59O1xuXG5jb25zdCBicmFuY2hlc0NvbHVtbnMgPSBbXG4gIHtcbiAgICBuYW1lOiBcImJyYW5jaF9uYW1lXCIsXG4gICAgbGFiZWw6IFwiTmFtZSBvZiBCcmFuY2hcIixcbiAgICBhbGlnbjogXCJsZWZ0XCIsXG4gICAgZmllbGQ6IChyb3cpID0+IHJvdy5uYW1lLFxuICAgIGZvcm1hdDogKHZhbCkgPT4gYCR7dmFsfWAsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIndhcmVob3VzZVwiLFxuICAgIGxhYmVsOiBcIldhcmVob3VzZVwiLFxuICAgIGFsaWduOiBcImxlZnRcIixcbiAgICBmaWVsZDogKHJvdykgPT4gKHJvdz8ud2FyZWhvdXNlID8gcm93LndhcmVob3VzZSA6IFwiTm8gd2FyZWhvdXNlIFwiKSxcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwibG9jYXRpb25cIixcbiAgICBsYWJlbDogXCJMb2NhdGlvblwiLFxuICAgIGFsaWduOiBcImxlZnRcIixcbiAgICBmaWVsZDogXCJsb2NhdGlvblwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJwZXJzb25JbmNoYXJnZVwiLFxuICAgIGxhYmVsOiBcIlBlcnNvbiBJbi1jaGFyZ2VcIixcbiAgICBhbGlnbjogXCJsZWZ0XCIsXG4gICAgZmllbGQ6IChyb3cpID0+IGZvcm1hdEZ1bGxuYW1lKHJvdyksXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInBob25lXCIsXG4gICAgbGFiZWw6IFwiUGhvbmVcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogXCJwaG9uZVwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJzdGF0dXNcIixcbiAgICBsYWJlbDogXCJTdGF0dXNcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogXCJzdGF0dXNcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYWN0aW9uXCIsXG4gICAgbGFiZWw6IFwiQWN0aW9uXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IFwiYWN0aW9uXCIsXG4gIH0sXG5dO1xuXG5jb25zdCBnZXRCYWRnZVN0YXR1c0NvbG9yID0gKHN0YXR1cykgPT4ge1xuICBzd2l0Y2ggKHN0YXR1cykge1xuICAgIGNhc2UgXCJPcGVuXCI6XG4gICAgICByZXR1cm4gXCJpbmZvXCI7XG4gICAgY2FzZSBcIk9wZW4gc29vblwiOlxuICAgICAgcmV0dXJuIFwid2FybmluZ1wiO1xuICAgIGNhc2UgXCJDbG9zZVwiOlxuICAgICAgcmV0dXJuIFwiYWNjZW50XCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcImdyZXlcIjtcbiAgfVxufTtcblxuY29uc3QgZ29Ub0JyYW5jaCA9IGFzeW5jIChicmFuY2gpID0+IHtcbiAgTG9hZGluZy5zaG93KCk7XG4gIHRyeSB7XG4gICAgYXdhaXQgcm91dGVyLnB1c2goe1xuICAgICAgbmFtZTogXCJCcmFuY2hEZXRhaWxcIixcbiAgICAgIHBhcmFtczogeyBicmFuY2hfaWQ6IGJyYW5jaC5pZCB9LFxuICAgIH0pO1xuICB9IGZpbmFsbHkge1xuICAgIExvYWRpbmcuaGlkZSgpO1xuICB9XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cbi5lbGVnYW50LWNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQ6ICNmN2Y4ZmM7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbn1cbi5hYnNvbHV0ZS1mdWxsIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG59XG4uc3Bpbm5lci13cmFwcGVyIHtcbiAgbWluLWhlaWdodDogNDB2aDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uZGF0YS1lcnJvciB7XG4gIG1pbi1oZWlnaHQ6IDQwdmg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLmJyYW5jaC1saW5rIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGNvbG9yOiAjZWY0NDQ0O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyAvKiBObyB1bmRlcmxpbmUgYnkgZGVmYXVsdCAqL1xufVxuLmJyYW5jaC1saW5rOmhvdmVyIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIFVuZGVybGluZSBvbiBob3ZlciAqL1xufVxuLmJyYW5jaC1saW5rIC50b29sdGlwLXRleHQge1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIHdpZHRoOiAxMDBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTtcbiAgY29sb3I6ICNmZmY7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBwYWRkaW5nOiA1cHggMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAxO1xuICBib3R0b206IDEyNSU7XG4gIGxlZnQ6IDUwJTtcbiAgbWFyZ2luLWxlZnQ6IC01MHB4O1xuICBvcGFjaXR5OiAwO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3M7XG59XG5cbi5icmFuY2gtbGluayAudG9vbHRpcC10ZXh0OjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxMDAlO1xuICBsZWZ0OiA1MCU7XG4gIG1hcmdpbi1sZWZ0OiAtNXB4O1xuICBib3JkZXItd2lkdGg6IDVweDtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiAjNTU1NTU1IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50O1xufVxuXG4uYnJhbmNoLWxpbms6aG92ZXIgLnRvb2x0aXAtdGV4dCB7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIG9wYWNpdHk6IDE7XG59XG5cbi5keW5hbWljLXdpZHRoIHtcbiAgd2lkdGg6IDEwMCU7IC8qIGRlZmF1bHQgd2lkdGggKi9cbiAgbWF4LXdpZHRoOiA1MDBweDtcbiAgbWluLXdpZHRoOiAzMDBweDsgLyogc2V0IGEgbWluaW11bSB3aWR0aCAqL1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogMTUwMHB4KSB7XG4gIC5keW5hbWljLXdpZHRoIHtcbiAgICBtYXgtd2lkdGg6IDUwMHB4OyAvKiBzbWFsbGVyIHdpZHRoIGZvciBtZWRpdW0tc2l6ZWQgc2NyZWVucyAqL1xuICB9XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAuZHluYW1pYy13aWR0aCB7XG4gICAgbWF4LXdpZHRoOiA1MDBweDsgLyogc21hbGxlciB3aWR0aCBmb3IgdGFibGV0cyAqL1xuICB9XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA0ODBweCkge1xuICAuZHluYW1pYy13aWR0aCB7XG4gICAgbWF4LXdpZHRoOiAyMDBweDsgLyogc21hbGxlciB3aWR0aCBmb3IgbW9iaWxlIHNjcmVlbnMgKi9cbiAgfVxufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJMb2FkaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlMQSxVQUFNLGdCQUFnQixpQkFBZ0I7QUFDdEMsVUFBTSw0QkFBNEIsSUFBSSxLQUFLO0FBQzNDLFVBQU0sY0FBYyxpQkFBZ0I7QUFFcEMsVUFBTSw4QkFBOEIsTUFBTTtBQUN4QyxnQ0FBMEIsUUFBUTtBQUFBLElBQ3BDO0FBRUEsVUFBTSxrQkFBa0IsbUJBQWtCO0FBQzFDLFVBQU0sbUJBQW1CLElBQUksQ0FBQSxDQUFFO0FBQy9CLFVBQU0seUJBQXlCLElBQUksQ0FBQSxDQUFFO0FBQ3JDLFVBQU0sVUFBVSxJQUFJLEtBQUs7QUFDekIsVUFBTSxnQkFBZ0IsQ0FBQyxRQUFRLGFBQWEsT0FBTztBQUNuRCxVQUFNLGdCQUFnQixJQUFJLEtBQUs7QUFDL0IsVUFBTSxvQkFBb0IsSUFBSSxJQUFJO0FBRWxDLFVBQU0sZ0JBQWdCLElBQUksSUFBSTtBQUM5QixVQUFNLGVBQWUsSUFBSSxLQUFLO0FBQzlCLFVBQU0sWUFBWSxTQUFTLE1BQU0sY0FBYyxRQUFRO0FBQ3ZELFVBQU0sU0FBUyxZQUFZO0FBQ3pCLFVBQUksY0FBYyxNQUFNLFFBQVE7QUFDOUIsc0JBQWMsUUFBUTtBQUN0QixjQUFNLGNBQWMsc0JBQXNCLGNBQWMsS0FBSztBQUM3RCxzQkFBYyxRQUFRO0FBQ3RCLHFCQUFhLFFBQVE7QUFBQSxNQUN0QjtBQUFBLElBQ0g7QUFFQSxVQUFNLG1CQUFtQixDQUFDLGFBQWE7QUFFckMsY0FBUSxJQUFJLHNCQUFzQixRQUFRO0FBRTFDLHVCQUFpQixjQUFjLFNBQVM7QUFDeEMsdUJBQWlCLGdCQUFnQixHQUFHLFNBQVMsYUFDM0MsU0FB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LE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLE9BQU8sQ0FBQyxTQUFTLDJCQUFLLGFBQVksSUFBSSxZQUFZO0FBQUEsUUFDbEQsVUFBVTtBQUFBLE1BQ1g7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsTUFDUjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLE9BQU8sQ0FBQyxRQUFRLGVBQWUsR0FBRztBQUFBLE1BQ25DO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLE1BQ1I7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsTUFDUjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxNQUNSO0FBQUEsSUFDSDtBQUVBLFVBQU0sc0JBQXNCLENBQUMsV0FBVztBQUN0QyxjQUFRO0FBQUEsYUFDRDtBQUNILGlCQUFPO0FBQUEsYUFDSjtBQUNILGlCQUFPO0FBQUEsYUFDSjtBQUNILGlCQUFPO0FBQUE7QUFFUCxpQkFBTztBQUFBO0FBQUEsSUFFYjtBQUVBLFVBQU0sYUFBYSxPQUFPLFdBQVc7QUFDbkNBLGFBQVEsS0FBSTtBQUNaLFVBQUk7QUFDRixjQUFNLE9BQU8sS0FBSztBQUFBLFVBQ2hCLE1BQU07QUFBQSxVQUNOLFFBQVEsRUFBRSxXQUFXLE9BQU8sR0FBSTtBQUFBLFFBQ3RDLENBQUs7QUFBQSxNQUNMLFVBQVk7QUFDUkEsZUFBUSxLQUFJO0FBQUEsTUFDYjtBQUFBLElBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
