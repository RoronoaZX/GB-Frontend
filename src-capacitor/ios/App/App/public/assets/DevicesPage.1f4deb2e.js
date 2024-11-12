import { d as defineStore, n as ref, N as Notify, P as Plugin, _ as _export_sfc, g as computed, t as reactive, o as openBlock, a4 as createElementBlock, a as createVNode, M as QBtn, w as withCtx, Q as QCard, I as QCardSection, af as withDirectives, J as createBaseVNode, K as QInput, c as createBlock, L as QIcon, bd as QSpinner, O as createTextVNode, a5 as Fragment, a6 as renderList, R as toDisplayString, be as createCommentVNode, aK as QCardActions, a3 as QDialog, S as pushScopeId, T as popScopeId, a2 as QSeparator, z as onMounted, u as watch } from "./index.c8e2405b.js";
import { Q as QPage } from "./QPage.e43c6521.js";
import { Q as QSpace } from "./QSpace.08c50700.js";
import { Q as QItem, a as QItemSection } from "./QItem.76557ad9.js";
import { Q as QList } from "./QList.d5d13fac.js";
import { C as ClosePopup } from "./ClosePopup.649d85d8.js";
import { api } from "./axios.aa1bce92.js";
import { u as useBranchesStore } from "./branch.9a956ff2.js";
import { Q as QSpinnerDots } from "./QSpinnerDots.c2e8b2d3.js";
import { Q as QTd } from "./QTd.f597934c.js";
import { Q as QTable } from "./QTable.d3fb87f5.js";
import { Q as QTooltip } from "./QTooltip.4a3eef22.js";
import "./warehouse.f8473ccb.js";
import "./employee.08e2bc37.js";
import "./QVirtualScroll.41a98cb7.js";
import "./use-virtual-scroll.5b4ab88d.js";
import "./rtl.b1b38f21.js";
import "./QSelect.0985e28e.js";
import "./QMenu.4f670399.js";
import "./selection.94057980.js";
const useDeviceStore = defineStore("devices", () => {
  const device = ref(null);
  const devices = ref([]);
  const fetchDevices = async () => {
    try {
      const response = await api.get("/api/device");
      devices.value = response.data;
    } catch (error) {
      console.log("error fetchig  device", error);
      Notify.create({
        type: "negative",
        message: "Failed to fetch devices",
        setTimeout: 1e3
      });
    }
  };
  const createDevices = async (data) => {
    Plugin.show();
    console.log("Data parameters being sent:", data);
    try {
      const response = await api.post("/api/device", data);
      fetchDevices();
      Notify.create({
        type: "positive",
        message: "Device created successfully",
        setTimeout: 1e3
      });
    } catch (error) {
      console.error("error device", error);
      Notify.create({
        type: "negative",
        message: "Failed to create device",
        setTimeout: 1e3
      });
    } finally {
      Plugin.hide();
    }
  };
  const updateDevice = async (id, data) => {
    Plugin.show();
    try {
      const response = await api.put(`/api/device/${id}`, data);
      const index = devices.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        devices.value[index] = response.data;
      }
      Notify.create({
        type: "positive",
        message: "Device updated successfully",
        setTimeout: 1e3
      });
    } catch (error) {
      console.log("update device error", error);
      Notify.create({
        type: "negative",
        message: "Failed to update device",
        setTimeout: 1e3
      });
    } finally {
      Plugin.hide();
    }
  };
  const deleteDevice = async (id) => {
    Plugin.show();
    try {
      const response = await api.delete(`/api/device/${id}`);
      devices.value = devices.value.filter((item) => item.id !== id);
      Notify.create({
        type: "positive",
        message: "Device deleted successfully"
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "Failed to delete device"
      });
    } finally {
      Plugin.hide();
    }
  };
  return {
    device,
    devices,
    fetchDevices,
    createDevices,
    updateDevice,
    deleteDevice
  };
});
var AddDevice_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$3 = (n) => (pushScopeId("data-v-974b0062"), n = n(), popScopeId(), n);
const _hoisted_1$4 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F4F1} Add Device", -1));
const _hoisted_2$3 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_3$2 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "UUID", -1));
const _hoisted_4$2 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_5$2 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "Name", -1));
const _hoisted_6$1 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_7$1 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "Model", -1));
const _hoisted_8$1 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_9$1 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "OS Version", -1));
const _hoisted_10 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_11 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "Designation Branch", -1));
const _hoisted_12 = {
  key: 0,
  class: "custom-list z-top"
};
const _sfc_main$4 = {
  __name: "AddDevice",
  setup(__props) {
    const deviceStore = useDeviceStore();
    const branchStore = useBranchesStore();
    const branches = computed(() => branchStore.branch);
    const addDeviceDialog = ref(false);
    const loading = ref(false);
    const searchKeyword = ref("");
    const showDropdown = ref(false);
    const searchLoading = ref(false);
    const openAddDeviceDialog = () => {
      addDeviceDialog.value = true;
    };
    const search = async () => {
      if (searchKeyword.value.trim()) {
        await branchStore.search(searchKeyword.value);
      }
    };
    const autoFillBranch = (branch) => {
      console.log("selected branch:", branch);
      deviceForm.branch_id = branch.id;
      deviceForm.branch_name = branch.name;
      searchKeyword.value = branch.name;
      showDropdown.value = false;
      console.log("Filled addNewBranchForm Data:", deviceForm);
    };
    const deviceForm = reactive({
      uuid: "",
      name: "",
      model: "",
      os_version: "",
      branch_id: "",
      branch_name: ""
    });
    const createDevice = async () => {
      console.log("device sent:", deviceForm);
      loading.value = true;
      try {
        await deviceStore.createDevices(deviceForm);
        addDeviceDialog.value = false;
        resetDeviceForm();
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    };
    const resetDeviceForm = () => {
      deviceForm.uuid = "";
      deviceForm.name = "";
      deviceForm.model = "";
      deviceForm.os_version = "";
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(QBtn, {
          outline: "",
          icon: "add_circle",
          label: "Add Device",
          onClick: openAddDeviceDialog,
          style: { "background-color": "#ef4444" }
        }),
        createVNode(QDialog, {
          modelValue: addDeviceDialog.value,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => addDeviceDialog.value = $event),
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
                createVNode(QCardSection, { class: "q-px-xl q-pt-none q-pb-lg" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2$3, [
                      _hoisted_3$2,
                      createVNode(QInput, {
                        modelValue: deviceForm.uuid,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => deviceForm.uuid = $event),
                        outlined: "",
                        dense: "",
                        rules: [
                          (val) => val && val.length > 0 || "Device UUID is required"
                        ]
                      }, null, 8, ["modelValue", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_4$2, [
                      _hoisted_5$2,
                      createVNode(QInput, {
                        class: "text-capitalize",
                        modelValue: deviceForm.name,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => deviceForm.name = $event),
                        outlined: "",
                        dense: "",
                        rules: [
                          (val) => val && val.length > 0 || "Device Name is required"
                        ]
                      }, null, 8, ["modelValue", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_6$1, [
                      _hoisted_7$1,
                      createVNode(QInput, {
                        modelValue: deviceForm.model,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => deviceForm.model = $event),
                        outlined: "",
                        dense: "",
                        rules: [
                          (val) => val && val.length > 0 || "Device Model is required"
                        ]
                      }, null, 8, ["modelValue", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_8$1, [
                      _hoisted_9$1,
                      createVNode(QInput, {
                        modelValue: deviceForm.os_version,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => deviceForm.os_version = $event),
                        outlined: "",
                        dense: "",
                        rules: [
                          (val) => val && val.length > 0 || "Device OS Version is required"
                        ]
                      }, null, 8, ["modelValue", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_10, [
                      _hoisted_11,
                      createVNode(QInput, {
                        modelValue: searchKeyword.value,
                        "onUpdate:modelValue": [
                          _cache[4] || (_cache[4] = ($event) => searchKeyword.value = $event),
                          search
                        ],
                        outlined: "",
                        dense: "",
                        debounce: "500",
                        onFocus: _cache[5] || (_cache[5] = ($event) => showDropdown.value = true)
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
                          showDropdown.value && searchKeyword.value ? (openBlock(), createElementBlock("div", _hoisted_12, [
                            createVNode(QCard, null, {
                              default: withCtx(() => [
                                createVNode(QList, { separator: "" }, {
                                  default: withCtx(() => {
                                    var _a;
                                    return [
                                      !((_a = branches.value) == null ? void 0 : _a.length) ? (openBlock(), createBlock(QItem, { key: 0 }, {
                                        default: withCtx(() => [
                                          createTextVNode(" No Employee Record ")
                                        ]),
                                        _: 1
                                      })) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(branches.value, (branch) => {
                                        return openBlock(), createBlock(QItem, {
                                          onClick: ($event) => autoFillBranch(branch),
                                          key: branch.id,
                                          clickable: ""
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(QItemSection, null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(branch.name), 1)
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
                  _: 1
                }),
                createVNode(QCardActions, {
                  class: "row q-px-lg q-py-sm q-pt-none",
                  align: "right"
                }, {
                  default: withCtx(() => [
                    withDirectives(createVNode(QBtn, {
                      class: "btn-cancel glossy",
                      color: "negative",
                      label: "Dismiss"
                    }, null, 512), [
                      [ClosePopup]
                    ]),
                    createVNode(QBtn, {
                      class: "btn-create glossy",
                      color: "positive",
                      label: "Create",
                      onClick: createDevice
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
var AddDevice = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-974b0062"], ["__file", "AddDevice.vue"]]);
var DeviceDelete_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-1abbd28a"), n = n(), popScopeId(), n);
const _hoisted_1$3 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mb-xs" }, "Confirm Deletion", -1));
const _hoisted_2$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("p", { class: "text-body2 q-mb-none" }, " Are you sure you want to delete this item? This action cannot be undone. ", -1));
const _sfc_main$3 = {
  __name: "DeviceDelete",
  props: ["delete"],
  emits: ["device-deleted"],
  setup(__props, { emit: __emit }) {
    const deviceStore = useDeviceStore();
    const props = __props;
    const emit = __emit;
    const dialog = ref(false);
    const deleteDialog = () => {
      dialog.value = true;
    };
    const onDelete = async () => {
      try {
        await deviceStore.deleteDevice(props.delete.row.id);
        dialog.value = false;
        emit("device-deleted");
      } catch (error) {
        console.error("Error deleting item:", error);
      }
      dialog.value = false;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          color: "negative",
          icon: "delete",
          size: "sm",
          flat: "",
          round: "",
          dense: "",
          onClick: deleteDialog
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
          modelValue: dialog.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => dialog.value = $event)
        }, {
          default: withCtx(() => [
            createVNode(QCard, { class: "q-pa-md q-rounded q-elevate-2 bg-white text-grey-9" }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "q-pt-none q-pb-sm" }, {
                  default: withCtx(() => [
                    _hoisted_1$3,
                    _hoisted_2$2
                  ]),
                  _: 1
                }),
                createVNode(QSeparator, { class: "q-mb-md" }),
                createVNode(QCardSection, {
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
var DeviceDelete = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-1abbd28a"], ["__file", "DeviceDelete.vue"]]);
var DeviceEdit_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-1abd83be"), n = n(), popScopeId(), n);
const _hoisted_1$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F4F1} Edit Device", -1));
const _hoisted_2$1 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_3$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "UUID", -1));
const _hoisted_4$1 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_5$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Name", -1));
const _hoisted_6 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_7 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Model", -1));
const _hoisted_8 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_9 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "OS Version", -1));
const _sfc_main$2 = {
  __name: "DeviceEdit",
  props: ["edit"],
  emits: ["device-updated"],
  setup(__props, { emit: __emit }) {
    const deviceStore = useDeviceStore();
    const dialog = ref(false);
    ref(true);
    const props = __props;
    const emit = __emit;
    const editDeviceForm = reactive({
      uuid: "",
      name: "",
      model: "",
      os_version: ""
    });
    const openEditForm = () => {
      Object.assign(editDeviceForm, props.edit.row);
      dialog.value = true;
    };
    const saveEditedDevice = async () => {
      try {
        const updatedDevice = { ...props.edit.row, ...editDeviceForm };
        await deviceStore.updateDevice(props.edit.row.id, updatedDevice);
        dialog.value = false;
        emit("device-updated");
      } catch (error) {
        console.log("error update device", error);
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
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => dialog.value = $event),
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
                    _hoisted_1$2,
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
                createVNode(QCardSection, { class: "q-px-xl q-pt-none q-pb-lg" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2$1, [
                      _hoisted_3$1,
                      createVNode(QInput, {
                        modelValue: editDeviceForm.uuid,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => editDeviceForm.uuid = $event),
                        outlined: "",
                        dense: "",
                        rules: [
                          (val) => val && val.length > 0 || "Device UUID is required"
                        ]
                      }, null, 8, ["modelValue", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_4$1, [
                      _hoisted_5$1,
                      createVNode(QInput, {
                        modelValue: editDeviceForm.name,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => editDeviceForm.name = $event),
                        outlined: "",
                        dense: "",
                        rules: [
                          (val) => val && val.length > 0 || "Device Name is required"
                        ]
                      }, null, 8, ["modelValue", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_6, [
                      _hoisted_7,
                      createVNode(QInput, {
                        modelValue: editDeviceForm.model,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => editDeviceForm.model = $event),
                        outlined: "",
                        dense: "",
                        rules: [
                          (val) => val && val.length > 0 || "Device Model is required"
                        ]
                      }, null, 8, ["modelValue", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_8, [
                      _hoisted_9,
                      createVNode(QInput, {
                        modelValue: editDeviceForm.os_version,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => editDeviceForm.os_version = $event),
                        outlined: "",
                        dense: "",
                        rules: [
                          (val) => val && val.length > 0 || "Device OS Version is required"
                        ]
                      }, null, 8, ["modelValue", "rules"])
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
                      class: "btn-cancel glossy",
                      color: "negative",
                      label: "Dismiss"
                    }, null, 512), [
                      [ClosePopup]
                    ]),
                    createVNode(QBtn, {
                      class: "btn-create glossy",
                      color: "positive",
                      label: "Save",
                      onClick: saveEditedDevice
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
var DeviceEdit = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-1abd83be"], ["__file", "DeviceEdit.vue"]]);
var DeviceTable_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-3b94b6f1"), n = n(), popScopeId(), n);
const _hoisted_1$1 = {
  key: 0,
  class: "spinner-wrapper"
};
const _hoisted_2 = { key: 1 };
const _hoisted_3 = {
  key: 0,
  class: "data-error"
};
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-ml-sm text-h6" }, "No data available", -1));
const _hoisted_5 = { class: "row justify-center q-gutter-x-md" };
const _sfc_main$1 = {
  __name: "DeviceTable",
  setup(__props) {
    const deviceStore = useDeviceStore();
    const filter = ref("");
    const loading = ref(true);
    const deviceRow = computed(() => deviceStore.devices);
    const showNoDataMessage = ref(false);
    const pagination = ref({
      rowPerPage: 0
    });
    const filteredRows = computed(() => {
      if (!filter.value) {
        return deviceRow.value;
      }
      return deviceRow.value.filter((row) => {
        const name = row.name || "";
        return name.toLowerCase().includes(filter.value.toLowerCase());
      });
    });
    onMounted(async () => {
      const response = await reloadTableData();
      console.log("response device", response);
    });
    const reloadTableData = async () => {
      try {
        loading.value = true;
        const response = await deviceStore.fetchDevices();
        if (!deviceRow.value.length) {
          showNoDataMessage.value = true;
        }
        console.log("device fetch:", response);
      } catch (error) {
        console.log("error fetching device", error);
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
    const deviceColumns = [
      {
        name: "name",
        label: "Name",
        align: "center",
        field: "name",
        format: (val) => `${val}`,
        sortable: true
      },
      {
        name: "model",
        label: "Model",
        align: "center",
        field: "model"
      },
      {
        name: "os_version",
        label: "OS Version",
        align: "center",
        field: "os_version"
      },
      {
        name: "uuid",
        label: "UUID",
        align: "center",
        field: "uuid"
      },
      {
        name: "branch_name",
        label: "Branch Name",
        align: "center",
        field: (row) => row.branch ? row.branch.name : "N/A"
      },
      {
        name: "action",
        label: "Action",
        align: "center",
        field: "action"
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", null, [
          createVNode(QInput, {
            modelValue: filter.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filter.value = $event),
            class: "q-pb-lg q-pl-sm dynamic-width",
            outlined: "",
            placeholder: "search",
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
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
          createVNode(QSpinnerDots, {
            size: "50px",
            color: "primary"
          })
        ])) : (openBlock(), createElementBlock("div", _hoisted_2, [
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
            filter: filter.value,
            "virtual-scroll-sticky-size-start": 48,
            flat: "",
            style: { "height": "400px" },
            columns: deviceColumns,
            rows: deviceRow.value,
            "row-key": "name",
            "virtual-scroll": "",
            pagination: pagination.value,
            "onUpdate:pagination": _cache[1] || (_cache[1] = ($event) => pagination.value = $event),
            "rows-per-page-options": [0],
            "hide-bottom": ""
          }, {
            "body-cell-action": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_5, [
                    createVNode(DeviceEdit, {
                      edit: props,
                      onDeviceUpdated: reloadTableData
                    }, null, 8, ["edit"]),
                    createVNode(DeviceDelete, {
                      delete: props,
                      onDeviceDeleted: reloadTableData
                    }, null, 8, ["delete"])
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
var DeviceTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-3b94b6f1"], ["__file", "DeviceTable.vue"]]);
var DevicesPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = { align: "right" };
const _sfc_main = {
  __name: "DevicesPage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, null, {
        default: withCtx(() => [
          createVNode(QCard, {
            class: "elegant-container",
            flat: ""
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_1, [
                    createVNode(AddDevice)
                  ])
                ]),
                _: 1
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createVNode(DeviceTable)
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
var DevicesPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bc8265ea"], ["__file", "DevicesPage.vue"]]);
export { DevicesPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGV2aWNlc1BhZ2UuMWY0ZGViMmUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdG9yZXMvZGV2aWNlLmpzIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2RldmljZXMvc2VjdGlvbi9BZGREZXZpY2UudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2RldmljZXMvc2VjdGlvbi9EZXZpY2VEZWxldGUudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2RldmljZXMvc2VjdGlvbi9EZXZpY2VFZGl0LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9kZXZpY2VzL3NlY3Rpb24vRGV2aWNlVGFibGUudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlZmluZVN0b3JlIH0gZnJvbSBcInBpbmlhXCI7XG5pbXBvcnQgeyBMb2FkaW5nLCBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwic3JjL2Jvb3QvYXhpb3NcIjtcbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcblxuZXhwb3J0IGNvbnN0IHVzZURldmljZVN0b3JlID0gZGVmaW5lU3RvcmUoXCJkZXZpY2VzXCIsICgpID0+IHtcbiAgY29uc3QgZGV2aWNlID0gcmVmKG51bGwpO1xuICBjb25zdCBkZXZpY2VzID0gcmVmKFtdKTtcblxuICBjb25zdCBmZXRjaERldmljZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChcIi9hcGkvZGV2aWNlXCIpO1xuICAgICAgZGV2aWNlcy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgZmV0Y2hpZyAgZGV2aWNlXCIsIGVycm9yKTtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIGZldGNoIGRldmljZXNcIixcbiAgICAgICAgc2V0VGltZW91dDogMTAwMCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjcmVhdGVEZXZpY2VzID0gYXN5bmMgKGRhdGEpID0+IHtcbiAgICBMb2FkaW5nLnNob3coKTtcbiAgICBjb25zb2xlLmxvZyhcIkRhdGEgcGFyYW1ldGVycyBiZWluZyBzZW50OlwiLCBkYXRhKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucG9zdChcIi9hcGkvZGV2aWNlXCIsIGRhdGEpO1xuICAgICAgZmV0Y2hEZXZpY2VzKCk7XG4gICAgICAvLyBkZXZpY2VzLnZhbHVlLnVuc2hpZnQocmVzcG9uc2UuZGF0YSk7XG5cbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiRGV2aWNlIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgIHNldFRpbWVvdXQ6IDEwMDAsXG4gICAgICAgIC8vIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvciBkZXZpY2VcIiwgZXJyb3IpO1xuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIHR5cGU6IFwibmVnYXRpdmVcIixcbiAgICAgICAgbWVzc2FnZTogXCJGYWlsZWQgdG8gY3JlYXRlIGRldmljZVwiLFxuICAgICAgICBzZXRUaW1lb3V0OiAxMDAwLFxuICAgICAgICAvLyBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICAgIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBMb2FkaW5nLmhpZGUoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlRGV2aWNlID0gYXN5bmMgKGlkLCBkYXRhKSA9PiB7XG4gICAgTG9hZGluZy5zaG93KCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnB1dChgL2FwaS9kZXZpY2UvJHtpZH1gLCBkYXRhKTtcbiAgICAgIGNvbnN0IGluZGV4ID0gZGV2aWNlcy52YWx1ZS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IGlkKTtcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgZGV2aWNlcy52YWx1ZVtpbmRleF0gPSByZXNwb25zZS5kYXRhO1xuICAgICAgfVxuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcbiAgICAgICAgbWVzc2FnZTogXCJEZXZpY2UgdXBkYXRlZCBzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgc2V0VGltZW91dDogMTAwMCxcbiAgICAgICAgLy8gcG9zaXRpb246IFwidG9wXCIsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coXCJ1cGRhdGUgZGV2aWNlIGVycm9yXCIsIGVycm9yKTtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHVwZGF0ZSBkZXZpY2VcIixcbiAgICAgICAgc2V0VGltZW91dDogMTAwMCxcbiAgICAgICAgLy8gcG9zaXRpb246IFwidG9wXCIsXG4gICAgICB9KTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgTG9hZGluZy5oaWRlKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRlbGV0ZURldmljZSA9IGFzeW5jIChpZCkgPT4ge1xuICAgIExvYWRpbmcuc2hvdygpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5kZWxldGUoYC9hcGkvZGV2aWNlLyR7aWR9YCk7XG4gICAgICBkZXZpY2VzLnZhbHVlID0gZGV2aWNlcy52YWx1ZS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaWQgIT09IGlkKTtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiRGV2aWNlIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgIC8vIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIGRlbGV0ZSBkZXZpY2VcIixcbiAgICAgICAgLy8gcG9zaXRpb246IFwidG9wXCIsXG4gICAgICB9KTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgTG9hZGluZy5oaWRlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZGV2aWNlLFxuICAgIGRldmljZXMsXG4gICAgZmV0Y2hEZXZpY2VzLFxuICAgIGNyZWF0ZURldmljZXMsXG4gICAgdXBkYXRlRGV2aWNlLFxuICAgIGRlbGV0ZURldmljZSxcbiAgfTtcbn0pO1xuIiwiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxxLWJ0blxuICAgICAgb3V0bGluZVxuICAgICAgaWNvbj1cImFkZF9jaXJjbGVcIlxuICAgICAgbGFiZWw9XCJBZGQgRGV2aWNlXCJcbiAgICAgIEBjbGljaz1cIm9wZW5BZGREZXZpY2VEaWFsb2dcIlxuICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjZWY0NDQ0XCJcbiAgICAvPlxuICAgIDxxLWRpYWxvZ1xuICAgICAgdi1tb2RlbD1cImFkZERldmljZURpYWxvZ1wiXG4gICAgICBwZXJzaXN0ZW50XG4gICAgICB0cmFuc2l0aW9uLXNob3c9XCJqdW1wLXVwXCJcbiAgICAgIHRyYW5zaXRpb24taGlkZT1cImp1bXAtZG93blwiXG4gICAgPlxuICAgICAgPHEtY2FyZFxuICAgICAgICBjbGFzcz1cIm15LWNhcmQgcS1wYS1ub25lXCJcbiAgICAgICAgc3R5bGU9XCJcbiAgICAgICAgICB3aWR0aDogNDIwcHg7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDEycHggMjRweCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gICAgICAgIFwiXG4gICAgICA+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvblxuICAgICAgICAgIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBxLXB4LW1kIHEtcHktc20gYmctZ3JhZGllbnQgdGV4dC13aGl0ZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNSBxLW1yLW1kXCI+8J+TsSBBZGQgRGV2aWNlPC9kaXY+XG4gICAgICAgICAgPHEtc3BhY2UgLz5cbiAgICAgICAgICA8cS1idG4gaWNvbj1cImNsb3NlXCIgZmxhdCBkZW5zZSByb3VuZCB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDwhLS0gPHEtc2VwYXJhdG9yIGNsYXNzPVwic2VwYXJhdG9yLWdyYWRpZW50XCIgLz4gLS0+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcHgteGwgcS1wdC1ub25lIHEtcGItbGdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1sZyBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICAgIDxkaXY+VVVJRDwvZGl2PlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbD1cImRldmljZUZvcm0udXVpZFwiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIDpydWxlcz1cIltcbiAgICAgICAgICAgICAgICAodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnRGV2aWNlIFVVSUQgaXMgcmVxdWlyZWQnLFxuICAgICAgICAgICAgICBdXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbWQgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgICA8ZGl2Pk5hbWU8L2Rpdj5cbiAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgIGNsYXNzPVwidGV4dC1jYXBpdGFsaXplXCJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cImRldmljZUZvcm0ubmFtZVwiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIDpydWxlcz1cIltcbiAgICAgICAgICAgICAgICAodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnRGV2aWNlIE5hbWUgaXMgcmVxdWlyZWQnLFxuICAgICAgICAgICAgICBdXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbWQgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgICA8ZGl2Pk1vZGVsPC9kaXY+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICB2LW1vZGVsPVwiZGV2aWNlRm9ybS5tb2RlbFwiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIDpydWxlcz1cIltcbiAgICAgICAgICAgICAgICAodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnRGV2aWNlIE1vZGVsIGlzIHJlcXVpcmVkJyxcbiAgICAgICAgICAgICAgXVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LW1kIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgICAgPGRpdj5PUyBWZXJzaW9uPC9kaXY+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICB2LW1vZGVsPVwiZGV2aWNlRm9ybS5vc192ZXJzaW9uXCJcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgOnJ1bGVzPVwiW1xuICAgICAgICAgICAgICAgICh2YWwpID0+XG4gICAgICAgICAgICAgICAgICAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnRGV2aWNlIE9TIFZlcnNpb24gaXMgcmVxdWlyZWQnLFxuICAgICAgICAgICAgICBdXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbWQgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgICA8ZGl2PkRlc2lnbmF0aW9uIEJyYW5jaDwvZGl2PlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInNlYXJjaEtleXdvcmRcIlxuICAgICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgZGVib3VuY2U9XCI1MDBcIlxuICAgICAgICAgICAgICBAZm9jdXM9XCJzaG93RHJvcGRvd24gPSB0cnVlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgICAgPHEtaWNvbiB2LWlmPVwiIXNlYXJjaExvYWRpbmdcIiBuYW1lPVwic2VhcmNoXCIgLz5cbiAgICAgICAgICAgICAgICA8cS1zcGlubmVyIHYtZWxzZSBjb2xvcj1cImdyZXlcIiBzaXplPVwic21cIiAvPlxuICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgdi1pZj1cInNob3dEcm9wZG93biAmJiBzZWFyY2hLZXl3b3JkXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImN1c3RvbS1saXN0IHotdG9wXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxxLWNhcmQ+XG4gICAgICAgICAgICAgICAgICA8cS1saXN0IHNlcGFyYXRvcj5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbSB2LWlmPVwiIWJyYW5jaGVzPy5sZW5ndGhcIj5cbiAgICAgICAgICAgICAgICAgICAgICBObyBFbXBsb3llZSBSZWNvcmRcbiAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwiYXV0b0ZpbGxCcmFuY2goYnJhbmNoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cImJyYW5jaCBpbiBicmFuY2hlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA6a2V5PVwiYnJhbmNoLmlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrYWJsZVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3sgYnJhbmNoLm5hbWUgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICA8L3EtbGlzdD5cbiAgICAgICAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxxLWNhcmQtYWN0aW9ucyBjbGFzcz1cInJvdyBxLXB4LWxnIHEtcHktc20gcS1wdC1ub25lXCIgYWxpZ249XCJyaWdodFwiPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgY2xhc3M9XCJidG4tY2FuY2VsIGdsb3NzeVwiXG4gICAgICAgICAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICAgICAgICAgIGxhYmVsPVwiRGlzbWlzc1wiXG4gICAgICAgICAgICB2LWNsb3NlLXBvcHVwXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgIGNsYXNzPVwiYnRuLWNyZWF0ZSBnbG9zc3lcIlxuICAgICAgICAgICAgY29sb3I9XCJwb3NpdGl2ZVwiXG4gICAgICAgICAgICBsYWJlbD1cIkNyZWF0ZVwiXG4gICAgICAgICAgICBAY2xpY2s9XCJjcmVhdGVEZXZpY2VcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgICA8L3EtY2FyZD5cbiAgICA8L3EtZGlhbG9nPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYsIHJlYWN0aXZlLCBjb21wdXRlZCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IHVzZURldmljZVN0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvZGV2aWNlXCI7XG5pbXBvcnQgeyB1c2VCcmFuY2hlc1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvYnJhbmNoXCI7XG5cbmNvbnN0IGRldmljZVN0b3JlID0gdXNlRGV2aWNlU3RvcmUoKTtcbmNvbnN0IGJyYW5jaFN0b3JlID0gdXNlQnJhbmNoZXNTdG9yZSgpO1xuY29uc3QgYnJhbmNoZXMgPSBjb21wdXRlZCgoKSA9PiBicmFuY2hTdG9yZS5icmFuY2gpO1xuY29uc3QgYWRkRGV2aWNlRGlhbG9nID0gcmVmKGZhbHNlKTtcbmNvbnN0IGxvYWRpbmcgPSByZWYoZmFsc2UpO1xuY29uc3Qgc2VhcmNoS2V5d29yZCA9IHJlZihcIlwiKTtcbmNvbnN0IHNob3dEcm9wZG93biA9IHJlZihmYWxzZSk7XG5jb25zdCBzZWFyY2hMb2FkaW5nID0gcmVmKGZhbHNlKTtcblxuY29uc3Qgb3BlbkFkZERldmljZURpYWxvZyA9ICgpID0+IHtcbiAgYWRkRGV2aWNlRGlhbG9nLnZhbHVlID0gdHJ1ZTtcbn07XG5cbmNvbnN0IHNlYXJjaCA9IGFzeW5jICgpID0+IHtcbiAgaWYgKHNlYXJjaEtleXdvcmQudmFsdWUudHJpbSgpKSB7XG4gICAgLy8gc2VhcmNoTG9hZGluZy52YWx1ZSA9IHRydWU7XG4gICAgYXdhaXQgYnJhbmNoU3RvcmUuc2VhcmNoKHNlYXJjaEtleXdvcmQudmFsdWUpO1xuICAgIC8vIHNlYXJjaExvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgICAvLyBzaG93RHJvcGRvd24udmFsdWUgPSB0cnVlO1xuICB9XG59O1xuXG5jb25zdCBhdXRvRmlsbEJyYW5jaCA9IChicmFuY2gpID0+IHtcbiAgY29uc29sZS5sb2coXCJzZWxlY3RlZCBicmFuY2g6XCIsIGJyYW5jaCk7XG5cbiAgZGV2aWNlRm9ybS5icmFuY2hfaWQgPSBicmFuY2guaWQ7XG4gIGRldmljZUZvcm0uYnJhbmNoX25hbWUgPSBicmFuY2gubmFtZTtcbiAgc2VhcmNoS2V5d29yZC52YWx1ZSA9IGJyYW5jaC5uYW1lO1xuXG4gIHNob3dEcm9wZG93bi52YWx1ZSA9IGZhbHNlO1xuXG4gIGNvbnNvbGUubG9nKFwiRmlsbGVkIGFkZE5ld0JyYW5jaEZvcm0gRGF0YTpcIiwgZGV2aWNlRm9ybSk7XG59O1xuXG5jb25zdCBkZXZpY2VGb3JtID0gcmVhY3RpdmUoe1xuICB1dWlkOiBcIlwiLFxuICBuYW1lOiBcIlwiLFxuICBtb2RlbDogXCJcIixcbiAgb3NfdmVyc2lvbjogXCJcIixcbiAgYnJhbmNoX2lkOiBcIlwiLFxuICBicmFuY2hfbmFtZTogXCJcIixcbn0pO1xuXG5jb25zdCBjcmVhdGVEZXZpY2UgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiZGV2aWNlIHNlbnQ6XCIsIGRldmljZUZvcm0pO1xuICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgdHJ5IHtcbiAgICBhd2FpdCBkZXZpY2VTdG9yZS5jcmVhdGVEZXZpY2VzKGRldmljZUZvcm0pO1xuICAgIGFkZERldmljZURpYWxvZy52YWx1ZSA9IGZhbHNlO1xuICAgIHJlc2V0RGV2aWNlRm9ybSgpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIH1cbn07XG5cbmNvbnN0IHJlc2V0RGV2aWNlRm9ybSA9ICgpID0+IHtcbiAgZGV2aWNlRm9ybS51dWlkID0gXCJcIjtcbiAgZGV2aWNlRm9ybS5uYW1lID0gXCJcIjtcbiAgZGV2aWNlRm9ybS5tb2RlbCA9IFwiXCI7XG4gIGRldmljZUZvcm0ub3NfdmVyc2lvbiA9IFwiXCI7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5teS1jYXJkIHtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYW5pbWF0aW9uOiBmYWRlSW4gMC4zcyBlYXNlO1xufVxuXG4uYnRuLWFkZCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzQyYTVmNSwgIzQ3OGVkMSk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmJnLWdyYWRpZW50IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2Y3MGJmZiwgI2FhMDM5Zik7XG59XG5cbi5zZXBhcmF0b3ItZ3JhZGllbnQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNhYTAzOWYsICNmNzBiZmYpO1xufVxuXG4ucS1idG4ge1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcbn1cblxuLnEtYnRuOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpO1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG5cbi5idG4tY2FuY2VsIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZWY1MzUwLCAjZTUzOTM1KTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uYnRuLWNyZWF0ZSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzY2YmI2YSwgIzQzYTA0Nyk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLnEtYW5pbWF0ZS1ib3VuY2Uge1xuICBhbmltYXRpb246IGJvdW5jZUluIDAuNnMgZWFzZTtcbn1cblxuQGtleWZyYW1lcyBmYWRlSW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMHB4KTtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIH1cbn1cblxuQGtleWZyYW1lcyBib3VuY2VJbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtYnRuXG4gICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgaWNvbj1cImRlbGV0ZVwiXG4gICAgc2l6ZT1cInNtXCJcbiAgICBmbGF0XG4gICAgcm91bmRcbiAgICBkZW5zZVxuICAgIEBjbGljaz1cImRlbGV0ZURpYWxvZ1wiXG4gID5cbiAgICA8cS10b29sdGlwIGNsYXNzPVwiYmctbmVnYXRpdmVcIiA6ZGVsYXk9XCIyMDBcIj5EZWxldGU8L3EtdG9vbHRpcD5cbiAgPC9xLWJ0bj5cbiAgPHEtZGlhbG9nIHYtbW9kZWw9XCJkaWFsb2dcIj5cbiAgICA8cS1jYXJkIGNsYXNzPVwicS1wYS1tZCBxLXJvdW5kZWQgcS1lbGV2YXRlLTIgYmctd2hpdGUgdGV4dC1ncmV5LTlcIj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcHQtbm9uZSBxLXBiLXNtXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg1IHEtbWIteHNcIj5Db25maXJtIERlbGV0aW9uPC9kaXY+XG4gICAgICAgIDxwIGNsYXNzPVwidGV4dC1ib2R5MiBxLW1iLW5vbmVcIj5cbiAgICAgICAgICBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgaXRlbT8gVGhpcyBhY3Rpb24gY2Fubm90IGJlXG4gICAgICAgICAgdW5kb25lLlxuICAgICAgICA8L3A+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPHEtc2VwYXJhdG9yIGNsYXNzPVwicS1tYi1tZFwiIC8+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24gYWxpZ249XCJyaWdodFwiIGNsYXNzPVwicS1wdC1ub25lXCI+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGZsYXRcbiAgICAgICAgICBkZW5zZVxuICAgICAgICAgIGxhYmVsPVwiQ2FuY2VsXCJcbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgIHYtY2xvc2UtcG9wdXBcbiAgICAgICAgICBjbGFzcz1cInEtbXItc21cIlxuICAgICAgICAvPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBkZW5zZVxuICAgICAgICAgIGxhYmVsPVwiRGVsZXRlXCJcbiAgICAgICAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICAgICAgICBAY2xpY2s9XCJvbkRlbGV0ZVwiXG4gICAgICAgICAgY2xhc3M9XCJxLWJ0bi1yb3VuZGVkIHEtcHgtbGdcIlxuICAgICAgICAvPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VEZXZpY2VTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2RldmljZVwiO1xuaW1wb3J0IHsgcmVmIH0gZnJvbSBcInZ1ZVwiO1xuXG5jb25zdCBkZXZpY2VTdG9yZSA9IHVzZURldmljZVN0b3JlKCk7XG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzKFtcImRlbGV0ZVwiXSk7XG5jb25zdCBlbWl0ID0gZGVmaW5lRW1pdHMoW1wiZGV2aWNlLWRlbGV0ZWRcIl0pO1xuY29uc3QgZGlhbG9nID0gcmVmKGZhbHNlKTtcbmNvbnN0IGRlbGV0ZURpYWxvZyA9ICgpID0+IHtcbiAgZGlhbG9nLnZhbHVlID0gdHJ1ZTtcbn07XG5cbmNvbnN0IG9uRGVsZXRlID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGF3YWl0IGRldmljZVN0b3JlLmRlbGV0ZURldmljZShwcm9wcy5kZWxldGUucm93LmlkKTtcbiAgICBkaWFsb2cudmFsdWUgPSBmYWxzZTtcbiAgICBlbWl0KFwiZGV2aWNlLWRlbGV0ZWRcIik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGRlbGV0aW5nIGl0ZW06XCIsIGVycm9yKTtcbiAgfVxuICBkaWFsb2cudmFsdWUgPSBmYWxzZTtcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuLnEtY2FyZCB7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIGJveC1zaGFkb3c6IDAgOHB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4ucS1jYXJkLXNlY3Rpb24ge1xuICBwYWRkaW5nOiAyNHB4IDMycHg7XG59XG5cbi5xLWJ0biB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2UsIGJveC1zaGFkb3cgMC4ycyBlYXNlO1xufVxuXG4ucS1idG4tcm91bmRlZCB7XG4gIGJvcmRlci1yYWRpdXM6IDUwcHg7XG59XG5cbi5xLWJ0bjpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xufVxuXG4ucS1idG46YWN0aXZlIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICBib3gtc2hhZG93OiBub25lO1xufVxuXG4udGV4dC1oNSB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi50ZXh0LWJvZHkyIHtcbiAgY29sb3I6ICM2NjY7XG59XG5cbi5xLWVsZXZhdGUtMiB7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi5iZy13aGl0ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG59XG5cbi50ZXh0LWdyZXktOSB7XG4gIGNvbG9yOiAjMzMzO1xufVxuXG4ucS1zZXBhcmF0b3Ige1xuICBib3JkZXItY29sb3I6ICNlZWU7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1idG5cbiAgICBjb2xvcj1cInBvc2l0aXZlXCJcbiAgICBpY29uPVwiZWRpdFwiXG4gICAgc2l6ZT1cInNtXCJcbiAgICBmbGF0XG4gICAgcm91bmRcbiAgICBkZW5zZVxuICAgIEBjbGljaz1cIm9wZW5FZGl0Rm9ybVwiXG4gID5cbiAgICA8cS10b29sdGlwIGNsYXNzPVwiYmctcG9zaXRpdmVcIiA6ZGVsYXk9XCIyMDBcIj5FZGl0PC9xLXRvb2x0aXA+XG4gIDwvcS1idG4+XG4gIDxxLWRpYWxvZ1xuICAgIHYtbW9kZWw9XCJkaWFsb2dcIlxuICAgIHBlcnNpc3RlbnRcbiAgICB0cmFuc2l0aW9uLXNob3c9XCJqdW1wLXVwXCJcbiAgICB0cmFuc2l0aW9uLWhpZGU9XCJqdW1wLWRvd25cIlxuICA+XG4gICAgPHEtY2FyZFxuICAgICAgY2xhc3M9XCJteS1jYXJkIHEtcGEtbm9uZVwiXG4gICAgICBzdHlsZT1cIlxuICAgICAgICB3aWR0aDogNDIwcHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMTJweCAyNHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgICAgIFwiXG4gICAgPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uXG4gICAgICAgIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBxLXB4LW1kIHEtcHktc20gYmctZ3JhZGllbnQgdGV4dC13aGl0ZVwiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg1IHEtbXItbWRcIj7wn5OxIEVkaXQgRGV2aWNlPC9kaXY+XG4gICAgICAgIDxxLXNwYWNlIC8+XG4gICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IGRlbnNlIHJvdW5kIHYtY2xvc2UtcG9wdXAgLz5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8IS0tIDxxLXNlcGFyYXRvciBjbGFzcz1cInNlcGFyYXRvci1ncmFkaWVudFwiIC8+IC0tPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1weC14bCBxLXB0LW5vbmUgcS1wYi1sZ1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1sZyBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICA8ZGl2PlVVSUQ8L2Rpdj5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgdi1tb2RlbD1cImVkaXREZXZpY2VGb3JtLnV1aWRcIlxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICA6cnVsZXM9XCJbXG4gICAgICAgICAgICAgICh2YWwpID0+ICh2YWwgJiYgdmFsLmxlbmd0aCA+IDApIHx8ICdEZXZpY2UgVVVJRCBpcyByZXF1aXJlZCcsXG4gICAgICAgICAgICBdXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbWQgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgPGRpdj5OYW1lPC9kaXY+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJlZGl0RGV2aWNlRm9ybS5uYW1lXCJcbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgOnJ1bGVzPVwiW1xuICAgICAgICAgICAgICAodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnRGV2aWNlIE5hbWUgaXMgcmVxdWlyZWQnLFxuICAgICAgICAgICAgXVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LW1kIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgIDxkaXY+TW9kZWw8L2Rpdj5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgdi1tb2RlbD1cImVkaXREZXZpY2VGb3JtLm1vZGVsXCJcbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgOnJ1bGVzPVwiW1xuICAgICAgICAgICAgICAodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnRGV2aWNlIE1vZGVsIGlzIHJlcXVpcmVkJyxcbiAgICAgICAgICAgIF1cIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1tZCBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICA8ZGl2Pk9TIFZlcnNpb248L2Rpdj5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgdi1tb2RlbD1cImVkaXREZXZpY2VGb3JtLm9zX3ZlcnNpb25cIlxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICA6cnVsZXM9XCJbXG4gICAgICAgICAgICAgICh2YWwpID0+XG4gICAgICAgICAgICAgICAgKHZhbCAmJiB2YWwubGVuZ3RoID4gMCkgfHwgJ0RldmljZSBPUyBWZXJzaW9uIGlzIHJlcXVpcmVkJyxcbiAgICAgICAgICAgIF1cIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtYWN0aW9ucyBjbGFzcz1cInJvdyBxLXB4LWxnIHEtcHktc20gcS1wdC1ub25lXCIgYWxpZ249XCJyaWdodFwiPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBjbGFzcz1cImJ0bi1jYW5jZWwgZ2xvc3N5XCJcbiAgICAgICAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICAgICAgICBsYWJlbD1cIkRpc21pc3NcIlxuICAgICAgICAgIHYtY2xvc2UtcG9wdXBcbiAgICAgICAgLz5cbiAgICAgICAgPHEtYnRuXG4gICAgICAgICAgY2xhc3M9XCJidG4tY3JlYXRlIGdsb3NzeVwiXG4gICAgICAgICAgY29sb3I9XCJwb3NpdGl2ZVwiXG4gICAgICAgICAgbGFiZWw9XCJTYXZlXCJcbiAgICAgICAgICBAY2xpY2s9XCJzYXZlRWRpdGVkRGV2aWNlXCJcbiAgICAgICAgLz5cbiAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVhY3RpdmUsIHJlZiB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IHVzZURldmljZVN0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvZGV2aWNlXCI7XG5cbmNvbnN0IGRldmljZVN0b3JlID0gdXNlRGV2aWNlU3RvcmUoKTtcbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5jb25zdCBsb2FkaW5nID0gcmVmKHRydWUpO1xuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyhbXCJlZGl0XCJdKTtcbmNvbnN0IGVtaXQgPSBkZWZpbmVFbWl0cyhbXCJkZXZpY2UtdXBkYXRlZFwiXSk7XG5jb25zdCBlZGl0RGV2aWNlRm9ybSA9IHJlYWN0aXZlKHtcbiAgdXVpZDogXCJcIixcbiAgbmFtZTogXCJcIixcbiAgbW9kZWw6IFwiXCIsXG4gIG9zX3ZlcnNpb246IFwiXCIsXG59KTtcblxuY29uc3Qgb3BlbkVkaXRGb3JtID0gKCkgPT4ge1xuICBPYmplY3QuYXNzaWduKGVkaXREZXZpY2VGb3JtLCBwcm9wcy5lZGl0LnJvdyk7XG4gIGRpYWxvZy52YWx1ZSA9IHRydWU7XG59O1xuXG5jb25zdCBzYXZlRWRpdGVkRGV2aWNlID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHVwZGF0ZWREZXZpY2UgPSB7IC4uLnByb3BzLmVkaXQucm93LCAuLi5lZGl0RGV2aWNlRm9ybSB9O1xuICAgIGF3YWl0IGRldmljZVN0b3JlLnVwZGF0ZURldmljZShwcm9wcy5lZGl0LnJvdy5pZCwgdXBkYXRlZERldmljZSk7XG4gICAgZGlhbG9nLnZhbHVlID0gZmFsc2U7XG4gICAgZW1pdChcImRldmljZS11cGRhdGVkXCIpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgdXBkYXRlIGRldmljZVwiLCBlcnJvcik7XG4gIH1cbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuLm15LWNhcmQge1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBhbmltYXRpb246IGZhZGVJbiAwLjNzIGVhc2U7XG59XG5cbi5idG4tYWRkIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjNDJhNWY1LCAjNDc4ZWQxKTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uYmctZ3JhZGllbnQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZjcwYmZmLCAjYWEwMzlmKTtcbn1cblxuLnNlcGFyYXRvci1ncmFkaWVudCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgI2FhMDM5ZiwgI2Y3MGJmZik7XG59XG5cbi5xLWJ0biB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xufVxuXG4ucS1idG46aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcbn1cblxuLmJ0bi1jYW5jZWwge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNlZjUzNTAsICNlNTM5MzUpO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5idG4tY3JlYXRlIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjNjZiYjZhLCAjNDNhMDQ3KTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4ucS1hbmltYXRlLWJvdW5jZSB7XG4gIGFuaW1hdGlvbjogYm91bmNlSW4gMC42cyBlYXNlO1xufVxuXG5Aa2V5ZnJhbWVzIGZhZGVJbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwcHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIGJvdW5jZUluIHtcbiAgZnJvbSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7XG4gIH1cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICB9XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxxLWlucHV0XG4gICAgICB2LW1vZGVsPVwiZmlsdGVyXCJcbiAgICAgIGNsYXNzPVwicS1wYi1sZyBxLXBsLXNtIGR5bmFtaWMtd2lkdGhcIlxuICAgICAgb3V0bGluZWRcbiAgICAgIHBsYWNlaG9sZGVyPVwic2VhcmNoXCJcbiAgICAgIGZsYXRcbiAgICAgIHJvdW5kZWRcbiAgICAgIGRlbnNlXG4gICAgICBkZWJvdW5jZT1cIjEwMFwiXG4gICAgPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgIDxxLWljb24gbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS1pbnB1dD5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzcGlubmVyLXdyYXBwZXJcIiB2LWlmPVwibG9hZGluZ1wiPlxuICAgIDxxLXNwaW5uZXItZG90cyBzaXplPVwiNTBweFwiIGNvbG9yPVwicHJpbWFyeVwiIC8+XG4gIDwvZGl2PlxuICA8ZGl2IHYtZWxzZT5cbiAgICA8ZGl2IHYtaWY9XCJmaWx0ZXJlZFJvd3MubGVuZ3RoID09PSAwXCIgY2xhc3M9XCJkYXRhLWVycm9yXCI+XG4gICAgICA8cS1pY29uIG5hbWU9XCJ3YXJuaW5nXCIgY29sb3I9XCJ3YXJuaW5nXCIgc2l6ZT1cIjRlbVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1tbC1zbSB0ZXh0LWg2XCI+Tm8gZGF0YSBhdmFpbGFibGU8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8cS10YWJsZVxuICAgICAgdi1lbHNlXG4gICAgICBjbGFzcz1cInRhYmxlLWNvbnRhaW5lciBlbGVnYW50LWNvbnRhaW5lciBzdGlja3ktaGVhZGVyXCJcbiAgICAgIDpmaWx0ZXI9XCJmaWx0ZXJcIlxuICAgICAgOnZpcnR1YWwtc2Nyb2xsLXN0aWNreS1zaXplLXN0YXJ0PVwiNDhcIlxuICAgICAgZmxhdFxuICAgICAgc3R5bGU9XCJoZWlnaHQ6IDQwMHB4XCJcbiAgICAgIDpjb2x1bW5zPVwiZGV2aWNlQ29sdW1uc1wiXG4gICAgICA6cm93cz1cImRldmljZVJvd1wiXG4gICAgICByb3cta2V5PVwibmFtZVwiXG4gICAgICB2aXJ0dWFsLXNjcm9sbFxuICAgICAgdi1tb2RlbDpwYWdpbmF0aW9uPVwicGFnaW5hdGlvblwiXG4gICAgICA6cm93cy1wZXItcGFnZS1vcHRpb25zPVwiWzBdXCJcbiAgICAgIGhpZGUtYm90dG9tXG4gICAgPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtYWN0aW9uPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktY2VudGVyIHEtZ3V0dGVyLXgtbWRcIj5cbiAgICAgICAgICAgIDxEZXZpY2VFZGl0IDplZGl0PVwicHJvcHNcIiBAZGV2aWNlLXVwZGF0ZWQ9XCJyZWxvYWRUYWJsZURhdGFcIiAvPlxuICAgICAgICAgICAgPERldmljZURlbGV0ZSA6ZGVsZXRlPVwicHJvcHNcIiBAZGV2aWNlLWRlbGV0ZWQ9XCJyZWxvYWRUYWJsZURhdGFcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS10YWJsZT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IERldmljZURlbGV0ZSBmcm9tIFwiLi9EZXZpY2VEZWxldGUudnVlXCI7XG5pbXBvcnQgRGV2aWNlRWRpdCBmcm9tIFwiLi9EZXZpY2VFZGl0LnZ1ZVwiO1xuaW1wb3J0IHsgdXNlRGV2aWNlU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9kZXZpY2VcIjtcbmltcG9ydCB7IGNvbXB1dGVkLCBvbk1vdW50ZWQsIHJlZiwgd2F0Y2ggfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IGRldmljZVN0b3JlID0gdXNlRGV2aWNlU3RvcmUoKTtcbmNvbnN0IGZpbHRlciA9IHJlZihcIlwiKTtcbmNvbnN0IGxvYWRpbmcgPSByZWYodHJ1ZSk7XG5jb25zdCBkZXZpY2VSb3cgPSBjb21wdXRlZCgoKSA9PiBkZXZpY2VTdG9yZS5kZXZpY2VzKTtcbmNvbnN0IHNob3dOb0RhdGFNZXNzYWdlID0gcmVmKGZhbHNlKTtcbmNvbnN0IHBhZ2luYXRpb24gPSByZWYoe1xuICByb3dQZXJQYWdlOiAwLFxufSk7XG5cbmNvbnN0IGZpbHRlcmVkUm93cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgaWYgKCFmaWx0ZXIudmFsdWUpIHtcbiAgICByZXR1cm4gZGV2aWNlUm93LnZhbHVlO1xuICB9XG4gIHJldHVybiBkZXZpY2VSb3cudmFsdWUuZmlsdGVyKChyb3cpID0+IHtcbiAgICBjb25zdCBuYW1lID0gcm93Lm5hbWUgfHwgXCJcIjsgLy8gRGVmYXVsdCB0byBhbiBlbXB0eSBzdHJpbmcgaWYgcm93Lm5hbWUgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGZpbHRlci52YWx1ZS50b0xvd2VyQ2FzZSgpKTtcbiAgfSk7XG59KTtcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZWxvYWRUYWJsZURhdGEoKTtcbiAgY29uc29sZS5sb2coXCJyZXNwb25zZSBkZXZpY2VcIiwgcmVzcG9uc2UpO1xufSk7XG5cbmNvbnN0IHJlbG9hZFRhYmxlRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRldmljZVN0b3JlLmZldGNoRGV2aWNlcygpO1xuICAgIGlmICghZGV2aWNlUm93LnZhbHVlLmxlbmd0aCkge1xuICAgICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSB0cnVlO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcImRldmljZSBmZXRjaDpcIiwgcmVzcG9uc2UpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgZmV0Y2hpbmcgZGV2aWNlXCIsIGVycm9yKTtcbiAgICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IHRydWU7XG4gIH0gZmluYWxseSB7XG4gICAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICB9XG59O1xuXG53YXRjaChmaWx0ZXIsIGFzeW5jIChuZXdGaWx0ZXIpID0+IHtcbiAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApKTtcbiAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IGZpbHRlcmVkUm93cy52YWx1ZS5sZW5ndGggPT09IDA7XG59KTtcblxuY29uc3QgZGV2aWNlQ29sdW1ucyA9IFtcbiAge1xuICAgIG5hbWU6IFwibmFtZVwiLFxuICAgIGxhYmVsOiBcIk5hbWVcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogXCJuYW1lXCIsXG4gICAgZm9ybWF0OiAodmFsKSA9PiBgJHt2YWx9YCxcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICBsYWJlbDogXCJNb2RlbFwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiBcIm1vZGVsXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIm9zX3ZlcnNpb25cIixcbiAgICBsYWJlbDogXCJPUyBWZXJzaW9uXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IFwib3NfdmVyc2lvblwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJ1dWlkXCIsXG4gICAgbGFiZWw6IFwiVVVJRFwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiBcInV1aWRcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYnJhbmNoX25hbWVcIixcbiAgICBsYWJlbDogXCJCcmFuY2ggTmFtZVwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiAocm93KSA9PiAocm93LmJyYW5jaCA/IHJvdy5icmFuY2gubmFtZSA6IFwiTi9BXCIpLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJhY3Rpb25cIixcbiAgICBsYWJlbDogXCJBY3Rpb25cIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogXCJhY3Rpb25cIixcbiAgfSxcbl07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuLmVsZWdhbnQtY29udGFpbmVyIHtcbiAgYmFja2dyb3VuZDogI2Y3ZjhmYztcbiAgcGFkZGluZzogMXJlbTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xufVxuLmFic29sdXRlLWZ1bGwge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbn1cbi5zcGlubmVyLXdyYXBwZXIge1xuICBtaW4taGVpZ2h0OiA0MHZoOyAvKiBNaW5pbXVtIGhlaWdodCBvZiA1MCUgdmlld3BvcnQgaGVpZ2h0ICovXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLmRhdGEtZXJyb3Ige1xuICBtaW4taGVpZ2h0OiA0MHZoOyAvKiBNaW5pbXVtIGhlaWdodCBvZiA1MCUgdmlld3BvcnQgaGVpZ2h0ICovXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLndhcmVob3VzZS1saW5rIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGNvbG9yOiAjZWY0NDQ0O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyAvKiBObyB1bmRlcmxpbmUgYnkgZGVmYXVsdCAqL1xufVxuLndhcmVob3VzZS1saW5rOmhvdmVyIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIFVuZGVybGluZSBvbiBob3ZlciAqL1xufVxuLndhcmVob3VzZS1saW5rIC50b29sdGlwLXRleHQge1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIHdpZHRoOiAxMDBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTtcbiAgY29sb3I6ICNmZmY7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBwYWRkaW5nOiA1cHggMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiAxO1xuICBib3R0b206IDEyNSU7XG4gIGxlZnQ6IDUwJTtcbiAgbWFyZ2luLWxlZnQ6IC01MHB4O1xuICBvcGFjaXR5OiAwO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3M7XG59XG5cbi53YXJlaG91c2UtbGluayAudG9vbHRpcC10ZXh0OjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxMDAlO1xuICBsZWZ0OiA1MCU7XG4gIG1hcmdpbi1sZWZ0OiAtNXB4O1xuICBib3JkZXItd2lkdGg6IDVweDtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiAjNTU1NTU1IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50O1xufVxuXG4ud2FyZWhvdXNlLWxpbms6aG92ZXIgLnRvb2x0aXAtdGV4dCB7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIG9wYWNpdHk6IDE7XG59XG5cbi5keW5hbWljLXdpZHRoIHtcbiAgd2lkdGg6IDEwMCU7IC8qIGRlZmF1bHQgd2lkdGggKi9cbiAgbWF4LXdpZHRoOiA1MDBweDtcbiAgbWluLXdpZHRoOiAzMDBweDsgLyogc2V0IGEgbWluaW11bSB3aWR0aCAqL1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogMTUwMHB4KSB7XG4gIC5keW5hbWljLXdpZHRoIHtcbiAgICBtYXgtd2lkdGg6IDUwMHB4OyAvKiBzbWFsbGVyIHdpZHRoIGZvciBtZWRpdW0tc2l6ZWQgc2NyZWVucyAqL1xuICB9XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAuZHluYW1pYy13aWR0aCB7XG4gICAgbWF4LXdpZHRoOiA1MDBweDsgLyogc21hbGxlciB3aWR0aCBmb3IgdGFibGV0cyAqL1xuICB9XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA0ODBweCkge1xuICAuZHluYW1pYy13aWR0aCB7XG4gICAgbWF4LXdpZHRoOiAyMDBweDsgLyogc21hbGxlciB3aWR0aCBmb3IgbW9iaWxlIHNjcmVlbnMgKi9cbiAgfVxufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJMb2FkaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtPLE1BQU0saUJBQWlCLFlBQVksV0FBVyxNQUFNO0FBQ3pELFFBQU0sU0FBUyxJQUFJLElBQUk7QUFDdkIsUUFBTSxVQUFVLElBQUksQ0FBQSxDQUFFO0FBRXRCLFFBQU0sZUFBZSxZQUFZO0FBQy9CLFFBQUk7QUFDRixZQUFNLFdBQVcsTUFBTSxJQUFJLElBQUksYUFBYTtBQUM1QyxjQUFRLFFBQVEsU0FBUztBQUFBLElBQzFCLFNBQVEsT0FBUDtBQUNBLGNBQVEsSUFBSSx5QkFBeUIsS0FBSztBQUMxQyxhQUFPLE9BQU87QUFBQSxRQUNaLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULFlBQVk7QUFBQSxNQUNwQixDQUFPO0FBQUEsSUFDRjtBQUFBLEVBQ0w7QUFFRSxRQUFNLGdCQUFnQixPQUFPLFNBQVM7QUFDcENBLFdBQVEsS0FBSTtBQUNaLFlBQVEsSUFBSSwrQkFBK0IsSUFBSTtBQUMvQyxRQUFJO0FBQ0YsWUFBTSxXQUFXLE1BQU0sSUFBSSxLQUFLLGVBQWUsSUFBSTtBQUNuRDtBQUdBLGFBQU8sT0FBTztBQUFBLFFBQ1osTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsWUFBWTtBQUFBLE1BRXBCLENBQU87QUFBQSxJQUNGLFNBQVEsT0FBUDtBQUNBLGNBQVEsTUFB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
