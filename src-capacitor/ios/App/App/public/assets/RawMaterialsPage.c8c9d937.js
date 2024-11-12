import { Q as QBadge } from "./QBadge.49245359.js";
import { _ as _export_sfc, n as ref, t as reactive, o as openBlock, a4 as createElementBlock, a as createVNode, M as QBtn, w as withCtx, Q as QCard, I as QCardSection, af as withDirectives, a2 as QSeparator, aJ as withModifiers, J as createBaseVNode, K as QInput, aK as QCardActions, a3 as QDialog, a5 as Fragment, S as pushScopeId, T as popScopeId, O as createTextVNode, N as Notify, g as computed, z as onMounted, u as watch, L as QIcon, c as createBlock, R as toDisplayString, aL as normalizeClass } from "./index.c8e2405b.js";
import { Q as QPage } from "./QPage.e43c6521.js";
import { Q as QSpace } from "./QSpace.08c50700.js";
import { Q as QSelect } from "./QSelect.0985e28e.js";
import { Q as QForm } from "./QForm.6c6124bb.js";
import { C as ClosePopup } from "./ClosePopup.649d85d8.js";
import { u as useRawMaterialsStore } from "./raw-material.d73eb00c.js";
import { Q as QSpinnerDots } from "./QSpinnerDots.c2e8b2d3.js";
import { Q as QTd } from "./QTd.f597934c.js";
import { Q as QTable } from "./QTable.d3fb87f5.js";
import { Q as QTooltip } from "./QTooltip.4a3eef22.js";
import "./rtl.b1b38f21.js";
import "./QItem.76557ad9.js";
import "./QMenu.4f670399.js";
import "./selection.94057980.js";
import "./use-virtual-scroll.5b4ab88d.js";
import "./axios.aa1bce92.js";
import "./QVirtualScroll.41a98cb7.js";
import "./QList.d5d13fac.js";
var RawMaterialsCreate_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$3 = (n) => (pushScopeId("data-v-47fbb753"), n = n(), popScopeId(), n);
const _hoisted_1$4 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F6E0}\uFE0F Add Raw Materials", -1));
const _hoisted_2$4 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_3$3 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_4$2 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_5$2 = { class: "q-mt-md q-animated q-animate-bounce" };
const _sfc_main$4 = {
  __name: "RawMaterialsCreate",
  setup(__props) {
    const rawMaterialStore = useRawMaterialsStore();
    const createRawMaterialsDialog = ref(false);
    const rawMaterialsCategory = ["Ingredients", "Packaging Materials"];
    const ingredientsUnitOptions = ["Grams", "Pcs"];
    const loading = ref(false);
    const open_add_ingredients_dialog = () => {
      createRawMaterialsDialog.value = true;
    };
    const addRawMaterialsForm = reactive({
      name: "",
      code: "",
      category: null,
      unit: null
    });
    const create = async () => {
      loading.value = true;
      try {
        await rawMaterialStore.createRawMaterials(addRawMaterialsForm);
        createRawMaterialsDialog.value = false;
        resetCreateRawMaterials();
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    };
    const resetCreateRawMaterials = () => {
      addRawMaterialsForm.name = "";
      addRawMaterialsForm.code = "";
      addRawMaterialsForm.category = null;
      addRawMaterialsForm.unit = null;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          class: "q-pa-sm btn-add",
          outline: "",
          dense: "",
          elevated: "",
          icon: "add_circle",
          label: "Add Raw Materials",
          onClick: open_add_ingredients_dialog,
          size: "md",
          color: "dark"
        }),
        createVNode(QDialog, {
          modelValue: createRawMaterialsDialog.value,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => createRawMaterialsDialog.value = $event),
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
                      round: "",
                      class: "text-white"
                    }, null, 512), [
                      [ClosePopup]
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QSeparator, { class: "separator-gradient" }),
                createVNode(QCardSection, { class: "q-px-xl q-pt-none q-pb-lg" }, {
                  default: withCtx(() => [
                    createVNode(QForm, {
                      onSubmit: withModifiers(create, ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createBaseVNode("div", _hoisted_2$4, [
                          createVNode(QInput, {
                            class: "text-capitalize",
                            modelValue: addRawMaterialsForm.name,
                            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => addRawMaterialsForm.name = $event),
                            outlined: "",
                            dense: "",
                            label: "Raw Materials Name",
                            rules: [(val) => val && val.length > 0 || "Name is required"]
                          }, null, 8, ["modelValue", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_3$3, [
                          createVNode(QInput, {
                            modelValue: addRawMaterialsForm.code,
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => addRawMaterialsForm.code = $event),
                            outlined: "",
                            dense: "",
                            label: "Raw Materials Code",
                            mask: "##-AAAAAAAAAAAAAAAAAAAAA",
                            placeholder: "00-SAMPLE",
                            rules: [(val) => val && val.length > 0 || "Code is required"]
                          }, null, 8, ["modelValue", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_4$2, [
                          createVNode(QSelect, {
                            modelValue: addRawMaterialsForm.category,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => addRawMaterialsForm.category = $event),
                            options: rawMaterialsCategory,
                            label: "Category",
                            "hide-dropdown-icon": "",
                            outlined: "",
                            dense: "",
                            behavior: "menu",
                            rules: [
                              (val) => val && val.length > 0 || "Category is required"
                            ]
                          }, null, 8, ["modelValue", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_5$2, [
                          createVNode(QSelect, {
                            modelValue: addRawMaterialsForm.unit,
                            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => addRawMaterialsForm.unit = $event),
                            options: ingredientsUnitOptions,
                            label: "Unit",
                            "hide-dropdown-icon": "",
                            outlined: "",
                            dense: "",
                            behavior: "menu",
                            rules: [(val) => val && val.length > 0 || "Unit is required"]
                          }, null, 8, ["modelValue", "rules"])
                        ]),
                        createVNode(QCardActions, {
                          class: "row q-px-lg q-py-sm q-pt-none",
                          align: "right"
                        }, {
                          default: withCtx(() => [
                            withDirectives(createVNode(QBtn, {
                              class: "btn-cancel glossy",
                              color: "negative",
                              label: "Cancel"
                            }, null, 512), [
                              [ClosePopup]
                            ]),
                            createVNode(QBtn, {
                              type: "submit",
                              class: "btn-create glossy",
                              color: "positive",
                              label: "Create",
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
var RawMaterialsCreate = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-47fbb753"], ["__file", "RawMaterialsCreate.vue"]]);
var RawMaterialsTableEdit_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-ec579294"), n = n(), popScopeId(), n);
const _hoisted_1$3 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F6E0}\uFE0F Edit Raw Materials", -1));
const _hoisted_2$3 = { class: "q-animated q-animate-bounce" };
const _hoisted_3$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-my-sm" }, "Raw Materials Name", -1));
const _hoisted_4$1 = { class: "q-animated q-animate-bounce" };
const _hoisted_5$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-my-sm" }, "Raw Materials Code", -1));
const _hoisted_6$1 = { class: "q-animated q-animate-bounce" };
const _hoisted_7 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-my-sm" }, "Category", -1));
const _hoisted_8 = { class: "q-mt-md" };
const _hoisted_9 = { class: "q-animated q-animate-bounce" };
const _hoisted_10 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-my-sm" }, "Unit", -1));
const _hoisted_11 = { class: "q-mt-md" };
const _sfc_main$3 = {
  __name: "RawMaterialsTableEdit",
  props: ["edit"],
  setup(__props) {
    const rawMaterialsStore = useRawMaterialsStore();
    const editRawMaterialsDialog = ref(false);
    const rawMaterialsCategory = ["Ingredients", "Packaging Materials"];
    const ingredientsUnitOptions = ["Grams", "Pcs"];
    const props = __props;
    const editRawMaterialsForm = reactive({
      name: "",
      code: "",
      category: null,
      unit: null
    });
    const openEditForm = () => {
      const editRawMaterials = Object.assign(editRawMaterialsForm, props.edit.row);
      editRawMaterialsDialog.value = true;
      console.log("editRawMaterials", editRawMaterials);
    };
    const saveEditedIngredient = async () => {
      try {
        const updatedRawMaterials = { ...props.edit.row, ...editRawMaterialsForm };
        await rawMaterialsStore.updateRawMaterials(
          props.edit.row.id,
          updatedRawMaterials
        );
        editRawMaterialsDialog.value = false;
      } catch (error) {
        console.error("Failed to update ingredient:", error);
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
          modelValue: editRawMaterialsDialog.value,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => editRawMaterialsDialog.value = $event),
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
                      round: "",
                      class: "text-white"
                    }, null, 512), [
                      [ClosePopup]
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QSeparator),
                createVNode(QCardSection, { class: "q-my-md q-mx-md q-gutter-y-md" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2$3, [
                      _hoisted_3$2,
                      createVNode(QInput, {
                        modelValue: editRawMaterialsForm.name,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => editRawMaterialsForm.name = $event),
                        outlined: "",
                        dense: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    createBaseVNode("div", _hoisted_4$1, [
                      _hoisted_5$1,
                      createVNode(QInput, {
                        modelValue: editRawMaterialsForm.code,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => editRawMaterialsForm.code = $event),
                        outlined: "",
                        dense: "",
                        rules: [(val) => val && val.length > 0],
                        mask: "##-AAAAAAAAAAAAAAAAAAAAA",
                        placeholder: "00-SAMPLE"
                      }, null, 8, ["modelValue", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_6$1, [
                      _hoisted_7,
                      createBaseVNode("div", _hoisted_8, [
                        createVNode(QSelect, {
                          modelValue: editRawMaterialsForm.category,
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => editRawMaterialsForm.category = $event),
                          options: rawMaterialsCategory,
                          "hide-dropdown-icon": "",
                          outlined: "",
                          dense: "",
                          behavior: "menu",
                          rules: [(val) => val && val.length > 0]
                        }, null, 8, ["modelValue", "rules"])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_9, [
                      _hoisted_10,
                      createBaseVNode("div", _hoisted_11, [
                        createVNode(QSelect, {
                          modelValue: editRawMaterialsForm.unit,
                          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => editRawMaterialsForm.unit = $event),
                          options: ingredientsUnitOptions,
                          "hide-dropdown-icon": "",
                          outlined: "",
                          dense: "",
                          behavior: "menu"
                        }, null, 8, ["modelValue"])
                      ])
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
                      class: "btn-cancel glossy",
                      color: "negative",
                      label: "Cancel"
                    }, null, 512), [
                      [ClosePopup]
                    ]),
                    createVNode(QBtn, {
                      class: "btn-create glossy",
                      color: "positive",
                      label: "Save",
                      loading: _ctx.loading,
                      onClick: saveEditedIngredient
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
var RawMaterialsTableEdit = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-ec579294"], ["__file", "RawMaterialsTableEdit.vue"]]);
var RawMaterialsTableDelete_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-674db72c"), n = n(), popScopeId(), n);
const _hoisted_1$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mb-xs" }, "Confirm Deletion", -1));
const _hoisted_2$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("p", { class: "text-body2 q-mb-none" }, " Are you sure you want to delete this item? This action cannot be undone. ", -1));
const _sfc_main$2 = {
  __name: "RawMaterialsTableDelete",
  props: ["delete"],
  setup(__props) {
    const materialsStore = useRawMaterialsStore();
    const dialogVisible = ref(false);
    const deleteDialog = () => {
      dialogVisible.value = true;
    };
    const props = __props;
    const originalData = props.delete.row;
    const onDelete = async () => {
      try {
        await materialsStore.deleteRawMaterials(originalData.id);
      } catch (error) {
        Notify.create({
          message: `Failed to delete item: ${error.message}`,
          type: "negative"
        });
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
          dense: "",
          "aria-label": "Delete"
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
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => dialogVisible.value = $event),
          persistent: ""
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
var RawMaterialsTableDelete = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-674db72c"], ["__file", "RawMaterialsTableDelete.vue"]]);
var RawMaterialsTable_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-65a60ada"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { align: "left" };
const _hoisted_2$1 = {
  key: 0,
  class: "spinner-wrapper"
};
const _hoisted_3$1 = { key: 1 };
const _hoisted_4 = {
  key: 0,
  class: "data-error"
};
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-ml-sm text-h6" }, "No data available", -1));
const _hoisted_6 = { class: "row justify-center q-gutter-x-md" };
const _sfc_main$1 = {
  __name: "RawMaterialsTable",
  setup(__props) {
    const materialStore = useRawMaterialsStore();
    const rawMaterialsRow = computed(() => materialStore.rawMaterials);
    const loading = ref(true);
    const filter = ref("");
    const showNoDataMessage = ref(false);
    const pagination = ref({
      rowsPerPage: 0
    });
    const filteredRows = computed(() => {
      if (!filter.value) {
        return rawMaterialsRow.value;
      }
      return rawMaterialsRow.value.filter(
        (row) => row.name.toLowerCase().includes(filter.value.toLowerCase())
      );
    });
    onMounted(async () => {
      await reloadTableData();
    });
    const capitalizeFirstLetter = (location) => {
      if (!location)
        return "";
      return location.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    };
    const reloadTableData = async () => {
      try {
        loading.value = true;
        await materialStore.fetchRawMaterials();
        if (!rawMaterialsRow.value.length) {
          showNoDataMessage.value = true;
        }
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
    const rawMaterialsColumns = [
      {
        name: "name",
        label: "Raw Materials Name",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true
      },
      {
        name: "code",
        label: "Code",
        align: "left",
        field: "code",
        sortable: true
      },
      {
        name: "category",
        label: "Category",
        align: "left",
        field: "category"
      },
      {
        name: "unit",
        label: "Unit",
        align: "left",
        field: "unit"
      },
      {
        name: "action",
        label: "Action",
        align: "center"
      }
    ];
    const getBadgeCategoryColor = (category) => {
      switch (category) {
        case "Ingredients":
          return "teal";
        case "Packaging Materials":
          return "brown-6";
        default:
          return "grey";
      }
    };
    const getBadgeUnitColor = (unit) => {
      switch (unit) {
        case "Grams":
          return "info";
        case "Pcs":
          return "accent";
        default:
          return "grey";
      }
    };
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
        createBaseVNode("div", _hoisted_1$1, [
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
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          createVNode(QSpinnerDots, {
            size: "50px",
            color: "primary"
          })
        ])) : (openBlock(), createElementBlock("div", _hoisted_3$1, [
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
            filter: filter.value,
            "virtual-scroll-sticky-size-start": 48,
            flat: "",
            style: { "height": "400px" },
            columns: rawMaterialsColumns,
            rows: filteredRows.value,
            "row-key": "name",
            "virtual-scroll": "",
            pagination: pagination.value,
            "onUpdate:pagination": _cache[1] || (_cache[1] = ($event) => pagination.value = $event),
            "rows-per-page-options": [0],
            "hide-bottom": ""
          }, {
            "body-cell-name": withCtx((props) => [
              createVNode(QTd, {
                key: "name",
                props
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(capitalizeFirstLetter(props.row.name)), 1)
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-category": withCtx((props) => [
              createVNode(QTd, {
                key: "name",
                props
              }, {
                default: withCtx(() => [
                  createVNode(QBadge, {
                    color: getBadgeCategoryColor(props.row.category)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(props.row.category), 1)
                    ]),
                    _: 2
                  }, 1032, ["color"])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-unit": withCtx((props) => [
              createVNode(QTd, {
                key: "name",
                props
              }, {
                default: withCtx(() => [
                  createVNode(QBadge, {
                    color: getBadgeUnitColor(props.row.unit)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(props.row.unit), 1)
                    ]),
                    _: 2
                  }, 1032, ["color"])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-availableStocks": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createVNode(QBadge, {
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
            "body-cell-action": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_6, [
                    createVNode(RawMaterialsTableEdit, { edit: props }, null, 8, ["edit"]),
                    createVNode(RawMaterialsTableDelete, { delete: props }, null, 8, ["delete"])
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
var RawMaterialsTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-65a60ada"], ["__file", "RawMaterialsTable.vue"]]);
var RawMaterialsPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = { class: "text-h6" };
const _hoisted_2 = { class: "q-gutter-x-sm" };
const _hoisted_3 = { align: "right" };
const _sfc_main = {
  __name: "RawMaterialsPage",
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
                    label: "Ingredients",
                    color: "teal"
                  }),
                  createVNode(QBadge, {
                    label: "Packaging Materials",
                    color: "brown-6"
                  })
                ])
              ]),
              createBaseVNode("div", _hoisted_3, [
                createVNode(RawMaterialsCreate)
              ])
            ]),
            _: 1
          }),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createVNode(RawMaterialsTable)
            ]),
            _: 1
          }),
          createVNode(QCardSection)
        ]),
        _: 1
      });
    };
  }
};
var RawMaterialsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2596b4ff"], ["__file", "RawMaterialsPage.vue"]]);
export { RawMaterialsPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmF3TWF0ZXJpYWxzUGFnZS5jOGM5ZDkzNy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvcmF3X21hdGVyaWFscy9jb21wb25lbnRzL1Jhd01hdGVyaWFsc0NyZWF0ZS52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9yYXdfbWF0ZXJpYWxzL2NvbXBvbmVudHMvUmF3TWF0ZXJpYWxzVGFibGVFZGl0LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL3Jhd19tYXRlcmlhbHMvY29tcG9uZW50cy9SYXdNYXRlcmlhbHNUYWJsZURlbGV0ZS52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9yYXdfbWF0ZXJpYWxzL2NvbXBvbmVudHMvUmF3TWF0ZXJpYWxzVGFibGUudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPHEtYnRuXG4gICAgY2xhc3M9XCJxLXBhLXNtIGJ0bi1hZGRcIlxuICAgIG91dGxpbmVcbiAgICBkZW5zZVxuICAgIGVsZXZhdGVkXG4gICAgaWNvbj1cImFkZF9jaXJjbGVcIlxuICAgIGxhYmVsPVwiQWRkIFJhdyBNYXRlcmlhbHNcIlxuICAgIEBjbGljaz1cIm9wZW5fYWRkX2luZ3JlZGllbnRzX2RpYWxvZ1wiXG4gICAgc2l6ZT1cIm1kXCJcbiAgICBjb2xvcj1cImRhcmtcIlxuICAvPlxuXG4gIDxxLWRpYWxvZ1xuICAgIHYtbW9kZWw9XCJjcmVhdGVSYXdNYXRlcmlhbHNEaWFsb2dcIlxuICAgIHBlcnNpc3RlbnRcbiAgICB0cmFuc2l0aW9uLXNob3c9XCJqdW1wLXVwXCJcbiAgICB0cmFuc2l0aW9uLWhpZGU9XCJqdW1wLWRvd25cIlxuICA+XG4gICAgPHEtY2FyZFxuICAgICAgY2xhc3M9XCJteS1jYXJkIHEtcGEtbm9uZVwiXG4gICAgICBzdHlsZT1cIlxuICAgICAgICB3aWR0aDogNDIwcHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMTJweCAyNHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgICAgIFwiXG4gICAgPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uXG4gICAgICAgIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBxLXB4LW1kIHEtcHktc20gYmctZ3JhZGllbnQgdGV4dC13aGl0ZVwiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg1IHEtbXItbWRcIj7wn5ug77iPIEFkZCBSYXcgTWF0ZXJpYWxzPC9kaXY+XG4gICAgICAgIDxxLXNwYWNlIC8+XG4gICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IGRlbnNlIHJvdW5kIHYtY2xvc2UtcG9wdXAgY2xhc3M9XCJ0ZXh0LXdoaXRlXCIgLz5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgIDxxLXNlcGFyYXRvciBjbGFzcz1cInNlcGFyYXRvci1ncmFkaWVudFwiIC8+XG5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcHgteGwgcS1wdC1ub25lIHEtcGItbGdcIj5cbiAgICAgICAgPHEtZm9ybSBAc3VibWl0LnByZXZlbnQ9XCJjcmVhdGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1sZyBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgIGNsYXNzPVwidGV4dC1jYXBpdGFsaXplXCJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cImFkZFJhd01hdGVyaWFsc0Zvcm0ubmFtZVwiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIGxhYmVsPVwiUmF3IE1hdGVyaWFscyBOYW1lXCJcbiAgICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+ICh2YWwgJiYgdmFsLmxlbmd0aCA+IDApIHx8ICdOYW1lIGlzIHJlcXVpcmVkJ11cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1tZCBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJhZGRSYXdNYXRlcmlhbHNGb3JtLmNvZGVcIlxuICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBsYWJlbD1cIlJhdyBNYXRlcmlhbHMgQ29kZVwiXG4gICAgICAgICAgICAgIG1hc2s9XCIjIy1BQUFBQUFBQUFBQUFBQUFBQUFBQUFcIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjAwLVNBTVBMRVwiXG4gICAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnQ29kZSBpcyByZXF1aXJlZCddXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbWQgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgICA8cS1zZWxlY3RcbiAgICAgICAgICAgICAgdi1tb2RlbD1cImFkZFJhd01hdGVyaWFsc0Zvcm0uY2F0ZWdvcnlcIlxuICAgICAgICAgICAgICA6b3B0aW9ucz1cInJhd01hdGVyaWFsc0NhdGVnb3J5XCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJDYXRlZ29yeVwiXG4gICAgICAgICAgICAgIGhpZGUtZHJvcGRvd24taWNvblxuICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBiZWhhdmlvcj1cIm1lbnVcIlxuICAgICAgICAgICAgICA6cnVsZXM9XCJbXG4gICAgICAgICAgICAgICAgKHZhbCkgPT4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCkgfHwgJ0NhdGVnb3J5IGlzIHJlcXVpcmVkJyxcbiAgICAgICAgICAgICAgXVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LW1kIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJhZGRSYXdNYXRlcmlhbHNGb3JtLnVuaXRcIlxuICAgICAgICAgICAgICA6b3B0aW9ucz1cImluZ3JlZGllbnRzVW5pdE9wdGlvbnNcIlxuICAgICAgICAgICAgICBsYWJlbD1cIlVuaXRcIlxuICAgICAgICAgICAgICBoaWRlLWRyb3Bkb3duLWljb25cbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgYmVoYXZpb3I9XCJtZW51XCJcbiAgICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+ICh2YWwgJiYgdmFsLmxlbmd0aCA+IDApIHx8ICdVbml0IGlzIHJlcXVpcmVkJ11cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8cS1jYXJkLWFjdGlvbnMgY2xhc3M9XCJyb3cgcS1weC1sZyBxLXB5LXNtIHEtcHQtbm9uZVwiIGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICBjbGFzcz1cImJ0bi1jYW5jZWwgZ2xvc3N5XCJcbiAgICAgICAgICAgICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiQ2FuY2VsXCJcbiAgICAgICAgICAgICAgdi1jbG9zZS1wb3B1cFxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJidG4tY3JlYXRlIGdsb3NzeVwiXG4gICAgICAgICAgICAgIGNvbG9yPVwicG9zaXRpdmVcIlxuICAgICAgICAgICAgICBsYWJlbD1cIkNyZWF0ZVwiXG4gICAgICAgICAgICAgIDpsb2FkaW5nPVwibG9hZGluZ1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgICAgIDwvcS1mb3JtPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYsIHJlYWN0aXZlIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgdXNlUmF3TWF0ZXJpYWxzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9yYXctbWF0ZXJpYWxcIjtcblxuY29uc3QgcmF3TWF0ZXJpYWxTdG9yZSA9IHVzZVJhd01hdGVyaWFsc1N0b3JlKCk7XG5jb25zdCBjcmVhdGVSYXdNYXRlcmlhbHNEaWFsb2cgPSByZWYoZmFsc2UpO1xuY29uc3QgcmF3TWF0ZXJpYWxzQ2F0ZWdvcnkgPSBbXCJJbmdyZWRpZW50c1wiLCBcIlBhY2thZ2luZyBNYXRlcmlhbHNcIl07XG5jb25zdCBpbmdyZWRpZW50c1VuaXRPcHRpb25zID0gW1wiR3JhbXNcIiwgXCJQY3NcIl07XG5jb25zdCBsb2FkaW5nID0gcmVmKGZhbHNlKTtcblxuY29uc3Qgb3Blbl9hZGRfaW5ncmVkaWVudHNfZGlhbG9nID0gKCkgPT4ge1xuICBjcmVhdGVSYXdNYXRlcmlhbHNEaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcblxuY29uc3QgYWRkUmF3TWF0ZXJpYWxzRm9ybSA9IHJlYWN0aXZlKHtcbiAgbmFtZTogXCJcIixcbiAgY29kZTogXCJcIixcbiAgY2F0ZWdvcnk6IG51bGwsXG4gIHVuaXQ6IG51bGwsXG59KTtcblxuY29uc3QgY3JlYXRlID0gYXN5bmMgKCkgPT4ge1xuICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgdHJ5IHtcbiAgICBhd2FpdCByYXdNYXRlcmlhbFN0b3JlLmNyZWF0ZVJhd01hdGVyaWFscyhhZGRSYXdNYXRlcmlhbHNGb3JtKTtcbiAgICBjcmVhdGVSYXdNYXRlcmlhbHNEaWFsb2cudmFsdWUgPSBmYWxzZTtcbiAgICByZXNldENyZWF0ZVJhd01hdGVyaWFscygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICB9IGZpbmFsbHkge1xuICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgcmVzZXRDcmVhdGVSYXdNYXRlcmlhbHMgPSAoKSA9PiB7XG4gIGFkZFJhd01hdGVyaWFsc0Zvcm0ubmFtZSA9IFwiXCI7XG4gIGFkZFJhd01hdGVyaWFsc0Zvcm0uY29kZSA9IFwiXCI7XG4gIGFkZFJhd01hdGVyaWFsc0Zvcm0uY2F0ZWdvcnkgPSBudWxsO1xuICBhZGRSYXdNYXRlcmlhbHNGb3JtLnVuaXQgPSBudWxsO1xufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLm15LWNhcmQge1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBhbmltYXRpb246IGZhZGVJbiAwLjNzIGVhc2U7XG59XG5cbi5idG4tYWRkIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjMDAwMDAwLCAjMDAwMDAwKTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uYmctZ3JhZGllbnQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMDBiZmE1LCAjMDA3OTZiKTtcbn1cblxuLnNlcGFyYXRvci1ncmFkaWVudCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzAwYmZhNSwgIzAwNzk2Yik7XG59XG5cbi5xLWJ0biB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xufVxuXG4ucS1idG46aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcbn1cblxuLmJ0bi1jYW5jZWwge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNlZjUzNTAsICNlNTM5MzUpO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5idG4tY3JlYXRlIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjNjZiYjZhLCAjNDNhMDQ3KTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4ucS1hbmltYXRlLWJvdW5jZSB7XG4gIGFuaW1hdGlvbjogYm91bmNlSW4gMC42cyBlYXNlO1xufVxuXG5Aa2V5ZnJhbWVzIGZhZGVJbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwcHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIGJvdW5jZUluIHtcbiAgZnJvbSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7XG4gIH1cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICB9XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1idG5cbiAgICBjb2xvcj1cInBvc2l0aXZlXCJcbiAgICBpY29uPVwiZWRpdFwiXG4gICAgc2l6ZT1cInNtXCJcbiAgICBmbGF0XG4gICAgcm91bmRcbiAgICBkZW5zZVxuICAgIEBjbGljaz1cIm9wZW5FZGl0Rm9ybVwiXG4gID5cbiAgICA8cS10b29sdGlwIGNsYXNzPVwiYmctcG9zaXRpdmVcIiA6ZGVsYXk9XCIyMDBcIj5FZGl0PC9xLXRvb2x0aXA+XG4gIDwvcS1idG4+XG4gIDxxLWRpYWxvZ1xuICAgIHYtbW9kZWw9XCJlZGl0UmF3TWF0ZXJpYWxzRGlhbG9nXCJcbiAgICBwZXJzaXN0ZW50XG4gICAgdHJhbnNpdGlvbi1zaG93PVwianVtcC11cFwiXG4gICAgdHJhbnNpdGlvbi1oaWRlPVwianVtcC1kb3duXCJcbiAgPlxuICAgIDxxLWNhcmRcbiAgICAgIGNsYXNzPVwibXktY2FyZCBxLXBhLW5vbmVcIlxuICAgICAgc3R5bGU9XCJcbiAgICAgICAgd2lkdGg6IDQyMHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgICAgICBib3gtc2hhZG93OiAwIDEycHggMjRweCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gICAgICBcIlxuICAgID5cbiAgICAgIDxxLWNhcmQtc2VjdGlvblxuICAgICAgICBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1weC1tZCBxLXB5LXNtIGJnLWdyYWRpZW50IHRleHQtd2hpdGVcIlxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNSBxLW1yLW1kXCI+8J+boO+4jyBFZGl0IFJhdyBNYXRlcmlhbHM8L2Rpdj5cbiAgICAgICAgPHEtc3BhY2UgLz5cbiAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgZGVuc2Ugcm91bmQgdi1jbG9zZS1wb3B1cCBjbGFzcz1cInRleHQtd2hpdGVcIiAvPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLXNlcGFyYXRvciAvPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1teS1tZCBxLW14LW1kIHEtZ3V0dGVyLXktbWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW15LXNtXCI+UmF3IE1hdGVyaWFscyBOYW1lPC9kaXY+XG4gICAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cImVkaXRSYXdNYXRlcmlhbHNGb3JtLm5hbWVcIiBvdXRsaW5lZCBkZW5zZSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW15LXNtXCI+UmF3IE1hdGVyaWFscyBDb2RlPC9kaXY+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJlZGl0UmF3TWF0ZXJpYWxzRm9ybS5jb2RlXCJcbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+IHZhbCAmJiB2YWwubGVuZ3RoID4gMF1cIlxuICAgICAgICAgICAgbWFzaz1cIiMjLUFBQUFBQUFBQUFBQUFBQUFBQUFBQVwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjAwLVNBTVBMRVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1teS1zbVwiPkNhdGVnb3J5PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbWRcIj5cbiAgICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgICB2LW1vZGVsPVwiZWRpdFJhd01hdGVyaWFsc0Zvcm0uY2F0ZWdvcnlcIlxuICAgICAgICAgICAgICA6b3B0aW9ucz1cInJhd01hdGVyaWFsc0NhdGVnb3J5XCJcbiAgICAgICAgICAgICAgaGlkZS1kcm9wZG93bi1pY29uXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIGJlaGF2aW9yPVwibWVudVwiXG4gICAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiB2YWwgJiYgdmFsLmxlbmd0aCA+IDBdXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtbXktc21cIj5Vbml0PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbWRcIj5cbiAgICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgICB2LW1vZGVsPVwiZWRpdFJhd01hdGVyaWFsc0Zvcm0udW5pdFwiXG4gICAgICAgICAgICAgIDpvcHRpb25zPVwiaW5ncmVkaWVudHNVbml0T3B0aW9uc1wiXG4gICAgICAgICAgICAgIGhpZGUtZHJvcGRvd24taWNvblxuICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBiZWhhdmlvcj1cIm1lbnVcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPHEtY2FyZC1hY3Rpb25zIGNsYXNzPVwicm93IHEtbWEtbWRcIiBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGNsYXNzPVwiYnRuLWNhbmNlbCBnbG9zc3lcIlxuICAgICAgICAgIGNvbG9yPVwibmVnYXRpdmVcIlxuICAgICAgICAgIGxhYmVsPVwiQ2FuY2VsXCJcbiAgICAgICAgICB2LWNsb3NlLXBvcHVwXG4gICAgICAgIC8+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGNsYXNzPVwiYnRuLWNyZWF0ZSBnbG9zc3lcIlxuICAgICAgICAgIGNvbG9yPVwicG9zaXRpdmVcIlxuICAgICAgICAgIGxhYmVsPVwiU2F2ZVwiXG4gICAgICAgICAgOmxvYWRpbmc9XCJsb2FkaW5nXCJcbiAgICAgICAgICBAY2xpY2s9XCJzYXZlRWRpdGVkSW5ncmVkaWVudFwiXG4gICAgICAgIC8+XG4gICAgICA8L3EtY2FyZC1hY3Rpb25zPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYsIHJlYWN0aXZlIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgdXNlUmF3TWF0ZXJpYWxzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9yYXctbWF0ZXJpYWxcIjtcbmltcG9ydCB7IE5vdGlmeSB9IGZyb20gXCJxdWFzYXJcIjtcblxuY29uc3QgcmF3TWF0ZXJpYWxzU3RvcmUgPSB1c2VSYXdNYXRlcmlhbHNTdG9yZSgpO1xuY29uc3QgZWRpdFJhd01hdGVyaWFsc0RpYWxvZyA9IHJlZihmYWxzZSk7XG5jb25zdCByYXdNYXRlcmlhbHNDYXRlZ29yeSA9IFtcIkluZ3JlZGllbnRzXCIsIFwiUGFja2FnaW5nIE1hdGVyaWFsc1wiXTtcbmNvbnN0IGluZ3JlZGllbnRzVW5pdE9wdGlvbnMgPSBbXCJHcmFtc1wiLCBcIlBjc1wiXTtcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyhbXCJlZGl0XCJdKTtcblxuY29uc3QgZWRpdFJhd01hdGVyaWFsc0Zvcm0gPSByZWFjdGl2ZSh7XG4gIG5hbWU6IFwiXCIsXG4gIGNvZGU6IFwiXCIsXG4gIGNhdGVnb3J5OiBudWxsLFxuICB1bml0OiBudWxsLFxufSk7XG5cbmNvbnN0IG9wZW5FZGl0Rm9ybSA9ICgpID0+IHtcbiAgY29uc3QgZWRpdFJhd01hdGVyaWFscyA9IE9iamVjdC5hc3NpZ24oZWRpdFJhd01hdGVyaWFsc0Zvcm0sIHByb3BzLmVkaXQucm93KTtcbiAgZWRpdFJhd01hdGVyaWFsc0RpYWxvZy52YWx1ZSA9IHRydWU7XG4gIGNvbnNvbGUubG9nKFwiZWRpdFJhd01hdGVyaWFsc1wiLCBlZGl0UmF3TWF0ZXJpYWxzKTtcbn07XG5cbmNvbnN0IHNhdmVFZGl0ZWRJbmdyZWRpZW50ID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHVwZGF0ZWRSYXdNYXRlcmlhbHMgPSB7IC4uLnByb3BzLmVkaXQucm93LCAuLi5lZGl0UmF3TWF0ZXJpYWxzRm9ybSB9O1xuICAgIGF3YWl0IHJhd01hdGVyaWFsc1N0b3JlLnVwZGF0ZVJhd01hdGVyaWFscyhcbiAgICAgIHByb3BzLmVkaXQucm93LmlkLFxuICAgICAgdXBkYXRlZFJhd01hdGVyaWFsc1xuICAgICk7XG4gICAgZWRpdFJhd01hdGVyaWFsc0RpYWxvZy52YWx1ZSA9IGZhbHNlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gdXBkYXRlIGluZ3JlZGllbnQ6XCIsIGVycm9yKTtcbiAgfVxufTtcblxuLy8gY29uc3Qgc2F2ZUVkaXRlZEluZ3JlZGllbnQgPSBhc3luYyAoKSA9PiB7XG4vLyAgIHRyeSB7XG4vLyAgICAgY29uc3Qgb3JpZ2luYWxSYXdNYXRlcmlhbHMgPSBwcm9wcy5lZGl0LnJvdztcbi8vICAgICBjb25zdCB1cGRhdGVkUmF3TWF0ZXJpYWxzID0ge1xuLy8gICAgICAgaWQ6IG9yaWdpbmFsUmF3TWF0ZXJpYWxzLmlkLFxuLy8gICAgICAgbmFtZTogZWRpdFJhd01hdGVyaWFsc0Zvcm0ubmFtZSxcbi8vICAgICAgIGNvZGU6IGVkaXRSYXdNYXRlcmlhbHNGb3JtLmNvZGUsXG4vLyAgICAgICBjYXRlZ29yeTogZWRpdFJhd01hdGVyaWFsc0Zvcm0uY2F0ZWdvcnksXG4vLyAgICAgICB1bml0OiBlZGl0UmF3TWF0ZXJpYWxzRm9ybS51bml0LFxuLy8gICAgIH07XG4vLyAgICAgY29uc3QgY2hhbmdlZEZpZWxkcyA9IFtdO1xuLy8gICAgIGlmIChvcmlnaW5hbFJhd01hdGVyaWFscy5uYW1lICE9PSB1cGRhdGVkUmF3TWF0ZXJpYWxzLm5hbWUpIHtcbi8vICAgICAgIGNoYW5nZWRGaWVsZHMucHVzaChcbi8vICAgICAgICAgYE5hbWU6ICR7b3JpZ2luYWxSYXdNYXRlcmlhbHMubmFtZX0gdG8gJCB1cGRhdGVkUmF3TWF0ZXJpYWxzLm5hbWV9YFxuLy8gICAgICAgKTtcbi8vICAgICB9XG4vLyAgICAgaWYgKG9yaWdpbmFsUmF3TWF0ZXJpYWxzLmNvZGUgIT09IHVwZGF0ZWRSYXdNYXRlcmlhbHMuY29kZSkge1xuLy8gICAgICAgY2hhbmdlZEZpZWxkcy5wdXNoKFxuLy8gICAgICAgICBgQ29kZTogJHtvcmlnaW5hbFJhd01hdGVyaWFscy5jb2RlfSB0byAkIHVwZGF0ZWRSYXdNYXRlcmlhbHMuY29kZX1gXG4vLyAgICAgICApO1xuLy8gICAgIH1cbi8vICAgICBpZiAob3JpZ2luYWxSYXdNYXRlcmlhbHMudW5pdCAhPT0gdXBkYXRlZFJhd01hdGVyaWFscy51bml0KSB7XG4vLyAgICAgICBjaGFuZ2VkRmllbGRzLnB1c2goXG4vLyAgICAgICAgIGBVbml0OiAke29yaWdpbmFsUmF3TWF0ZXJpYWxzLnVuaXR9IHRvICQgdXBkYXRlZFJhd01hdGVyaWFscy51bml0fWBcbi8vICAgICAgICk7XG4vLyAgICAgfVxuXG4vLyAgICAgYXdhaXQgcmF3TWF0ZXJpYWxTdG9yZS51cGRhdGUocHJvcHMuZWRpdC5yb3cuaWQsIHVwZGF0ZWRSYXdNYXRlcmlhbHMpO1xuLy8gICAgIE5vdGlmeS5jcmVhdGUoe1xuLy8gICAgICAgdHlwZTogXCJ3YXJuaW5nXCIsXG4vLyAgICAgICBpY29uOiBcImNoZWNrXCIsXG4vLyAgICAgICBtZXNzYWdlOiBgJHtwcm9wcy5lZGl0LnJvdy5uYW1lfSBpbmdyZWRpZW50IHN1Y2Nlc3NmdWxseSB1cGRhdGVkIWAsXG4vLyAgICAgICBwb3NpdGlvbjogXCJ0b3BcIixcbi8vICAgICB9KTtcblxuLy8gICAgIGVkaXRSYXdNYXRlcmlhbHNEaWFsb2cudmFsdWUgPSBmYWxzZTtcbi8vICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDAwKSB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhcIkluZ3JlZGllbnQgdXBkYXRlZCBzdWNjZXNzZnVsbHk6XCIsIHJlc3BvbnNlLmRhdGEpO1xuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byB1cGRhdGUgaW5ncmVkaWVudDpcIiwgcmVzcG9uc2UpO1xuLy8gICAgIH1cbi8vICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4vLyB9O1xuPC9zY3JpcHQ+XG48c3R5bGUgc2NvcGVkPlxuLm15LWNhcmQge1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBhbmltYXRpb246IGZhZGVJbiAwLjNzIGVhc2U7XG59XG5cbi5idG4tYWRkIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjNDJhNWY1LCAjNDc4ZWQxKTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uYmctZ3JhZGllbnQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMDBiZmE1LCAjMDA3OTZiKTtcbn1cblxuLnNlcGFyYXRvci1ncmFkaWVudCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzAwYmZhNSwgIzAwNzk2Yik7XG59XG5cbi5xLWJ0biB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xufVxuXG4ucS1idG46aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcbn1cblxuLmJ0bi1jYW5jZWwge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNlZjUzNTAsICNlNTM5MzUpO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5idG4tY3JlYXRlIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjNjZiYjZhLCAjNDNhMDQ3KTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4ucS1hbmltYXRlLWJvdW5jZSB7XG4gIGFuaW1hdGlvbjogYm91bmNlSW4gMC42cyBlYXNlO1xufVxuXG5Aa2V5ZnJhbWVzIGZhZGVJbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwcHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIGJvdW5jZUluIHtcbiAgZnJvbSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7XG4gIH1cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICB9XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1idG5cbiAgICBAY2xpY2s9XCJkZWxldGVEaWFsb2dcIlxuICAgIGNvbG9yPVwibmVnYXRpdmVcIlxuICAgIGljb249XCJkZWxldGVcIlxuICAgIHNpemU9XCJzbVwiXG4gICAgZmxhdFxuICAgIHJvdW5kXG4gICAgZGVuc2VcbiAgICBhcmlhLWxhYmVsPVwiRGVsZXRlXCJcbiAgPlxuICAgIDxxLXRvb2x0aXAgY2xhc3M9XCJiZy1uZWdhdGl2ZVwiIDpkZWxheT1cIjIwMFwiPkRlbGV0ZTwvcS10b29sdGlwPlxuICA8L3EtYnRuPlxuXG4gIDxxLWRpYWxvZyB2LW1vZGVsPVwiZGlhbG9nVmlzaWJsZVwiIHBlcnNpc3RlbnQ+XG4gICAgPHEtY2FyZCBjbGFzcz1cInEtcGEtbWQgcS1yb3VuZGVkIHEtZWxldmF0ZS0yIGJnLXdoaXRlIHRleHQtZ3JleS05XCI+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXB0LW5vbmUgcS1wYi1zbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNSBxLW1iLXhzXCI+Q29uZmlybSBEZWxldGlvbjwvZGl2PlxuICAgICAgICA8cCBjbGFzcz1cInRleHQtYm9keTIgcS1tYi1ub25lXCI+XG4gICAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/IFRoaXMgYWN0aW9uIGNhbm5vdCBiZVxuICAgICAgICAgIHVuZG9uZS5cbiAgICAgICAgPC9wPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgICAgPHEtc2VwYXJhdG9yIGNsYXNzPVwicS1tYi1tZFwiIC8+XG5cbiAgICAgIDxxLWNhcmQtYWN0aW9ucyBhbGlnbj1cInJpZ2h0XCIgY2xhc3M9XCJxLXB0LW5vbmVcIj5cbiAgICAgICAgPHEtYnRuXG4gICAgICAgICAgZmxhdFxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgbGFiZWw9XCJDYW5jZWxcIlxuICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgdi1jbG9zZS1wb3B1cFxuICAgICAgICAgIGNsYXNzPVwicS1tci1zbVwiXG4gICAgICAgIC8+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgbGFiZWw9XCJEZWxldGVcIlxuICAgICAgICAgIGNvbG9yPVwibmVnYXRpdmVcIlxuICAgICAgICAgIEBjbGljaz1cIm9uRGVsZXRlXCJcbiAgICAgICAgICBjbGFzcz1cInEtYnRuLXJvdW5kZWQgcS1weC1sZ1wiXG4gICAgICAgIC8+XG4gICAgICA8L3EtY2FyZC1hY3Rpb25zPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IHVzZVJhd01hdGVyaWFsc1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvcmF3LW1hdGVyaWFsXCI7XG5pbXBvcnQgeyBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5cbmNvbnN0IG1hdGVyaWFsc1N0b3JlID0gdXNlUmF3TWF0ZXJpYWxzU3RvcmUoKTtcbmNvbnN0IGRpYWxvZ1Zpc2libGUgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBkZWxldGVEaWFsb2cgPSAoKSA9PiB7XG4gIGRpYWxvZ1Zpc2libGUudmFsdWUgPSB0cnVlO1xufTtcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyhbXCJkZWxldGVcIl0pO1xuY29uc3Qgb3JpZ2luYWxEYXRhID0gcHJvcHMuZGVsZXRlLnJvdztcblxuY29uc3Qgb25EZWxldGUgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgYXdhaXQgbWF0ZXJpYWxzU3RvcmUuZGVsZXRlUmF3TWF0ZXJpYWxzKG9yaWdpbmFsRGF0YS5pZCk7XG4gICAgLy8gTm90aWZ5LmNyZWF0ZSh7XG4gICAgLy8gICBtZXNzYWdlOiBcIkl0ZW0gZGVsZXRlZCBzdWNjZXNzZnVsbHkuXCIsXG4gICAgLy8gICB0eXBlOiBcInBvc2l0aXZlXCIsXG4gICAgLy8gICAvLyBwb3NpdGlvbjogXCJ0b3AtcmlnaHRcIixcbiAgICAvLyB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgIG1lc3NhZ2U6IGBGYWlsZWQgdG8gZGVsZXRlIGl0ZW06ICR7ZXJyb3IubWVzc2FnZX1gLFxuICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgLy8gcG9zaXRpb246IFwidG9wLXJpZ2h0XCIsXG4gICAgfSk7XG4gIH1cbiAgZGlhbG9nVmlzaWJsZS52YWx1ZSA9IGZhbHNlO1xufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLnEtY2FyZCB7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIGJveC1zaGFkb3c6IDAgOHB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4ucS1jYXJkLXNlY3Rpb24ge1xuICBwYWRkaW5nOiAyNHB4IDMycHg7XG59XG5cbi5xLWJ0biB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2UsIGJveC1zaGFkb3cgMC4ycyBlYXNlO1xufVxuXG4ucS1idG4tcm91bmRlZCB7XG4gIGJvcmRlci1yYWRpdXM6IDUwcHg7XG59XG5cbi5xLWJ0bjpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xufVxuXG4ucS1idG46YWN0aXZlIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICBib3gtc2hhZG93OiBub25lO1xufVxuXG4udGV4dC1oNSB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi50ZXh0LWJvZHkyIHtcbiAgY29sb3I6ICM2NjY7XG59XG5cbi5xLWVsZXZhdGUtMiB7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi5iZy13aGl0ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG59XG5cbi50ZXh0LWdyZXktOSB7XG4gIGNvbG9yOiAjMzMzO1xufVxuXG4ucS1zZXBhcmF0b3Ige1xuICBib3JkZXItY29sb3I6ICNlZWU7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGFsaWduPVwibGVmdFwiPlxuICAgIDxxLWlucHV0XG4gICAgICB2LW1vZGVsPVwiZmlsdGVyXCJcbiAgICAgIGNsYXNzPVwicS1wYi1sZyBxLXBsLXNtIGR5bmFtaWMtd2lkdGhcIlxuICAgICAgb3V0bGluZWRcbiAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgIGZsYXRcbiAgICAgIHJvdW5kZWRcbiAgICAgIGRlbnNlXG4gICAgICBkZWJvdW5jZT1cIjEwMFwiXG4gICAgPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgIDxxLWljb24gbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS1pbnB1dD5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzcGlubmVyLXdyYXBwZXJcIiB2LWlmPVwibG9hZGluZ1wiPlxuICAgIDxxLXNwaW5uZXItZG90cyBzaXplPVwiNTBweFwiIGNvbG9yPVwicHJpbWFyeVwiIC8+XG4gIDwvZGl2PlxuICA8ZGl2IHYtZWxzZT5cbiAgICA8ZGl2IHYtaWY9XCJmaWx0ZXJlZFJvd3MubGVuZ3RoID09PSAwXCIgY2xhc3M9XCJkYXRhLWVycm9yXCI+XG4gICAgICA8cS1pY29uIG5hbWU9XCJ3YXJuaW5nXCIgY29sb3I9XCJ3YXJuaW5nXCIgc2l6ZT1cIjRlbVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1tbC1zbSB0ZXh0LWg2XCI+Tm8gZGF0YSBhdmFpbGFibGU8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8cS10YWJsZVxuICAgICAgdi1lbHNlXG4gICAgICBjbGFzcz1cInRhYmxlLWNvbnRhaW5lciBlbGVnYW50LWNvbnRhaW5lciBzdGlja3ktaGVhZGVyXCJcbiAgICAgIDpmaWx0ZXI9XCJmaWx0ZXJcIlxuICAgICAgOnZpcnR1YWwtc2Nyb2xsLXN0aWNreS1zaXplLXN0YXJ0PVwiNDhcIlxuICAgICAgZmxhdFxuICAgICAgc3R5bGU9XCJoZWlnaHQ6IDQwMHB4XCJcbiAgICAgIDpjb2x1bW5zPVwicmF3TWF0ZXJpYWxzQ29sdW1uc1wiXG4gICAgICA6cm93cz1cImZpbHRlcmVkUm93c1wiXG4gICAgICByb3cta2V5PVwibmFtZVwiXG4gICAgICB2aXJ0dWFsLXNjcm9sbFxuICAgICAgdi1tb2RlbDpwYWdpbmF0aW9uPVwicGFnaW5hdGlvblwiXG4gICAgICA6cm93cy1wZXItcGFnZS1vcHRpb25zPVwiWzBdXCJcbiAgICAgIGhpZGUtYm90dG9tXG4gICAgPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtbmFtZT1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIGtleT1cIm5hbWVcIiA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgIHt7IGNhcGl0YWxpemVGaXJzdExldHRlcihwcm9wcy5yb3cubmFtZSkgfX1cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLWNhdGVnb3J5PVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQga2V5PVwibmFtZVwiIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPHEtYmFkZ2UgOmNvbG9yPVwiZ2V0QmFkZ2VDYXRlZ29yeUNvbG9yKHByb3BzLnJvdy5jYXRlZ29yeSlcIj5cbiAgICAgICAgICAgIHt7IHByb3BzLnJvdy5jYXRlZ29yeSB9fVxuICAgICAgICAgIDwvcS1iYWRnZT5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLXVuaXQ9XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCBrZXk9XCJuYW1lXCIgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8cS1iYWRnZSA6Y29sb3I9XCJnZXRCYWRnZVVuaXRDb2xvcihwcm9wcy5yb3cudW5pdClcIj5cbiAgICAgICAgICAgIHt7IHByb3BzLnJvdy51bml0IH19XG4gICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtYXZhaWxhYmxlU3RvY2tzPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8cS1iYWRnZVxuICAgICAgICAgICAgc3F1YXJlXG4gICAgICAgICAgICBjbGFzcz1cInRleHQtd2hpdGVcIlxuICAgICAgICAgICAgOmNsYXNzPVwiZ2V0UmF3TWF0ZXJpYWxCYWRnZUNvbG9yKHByb3BzLnJvdy5hdmFpbGFibGVTdG9ja3MpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eyBwcm9wcy5yb3cuYXZhaWxhYmxlU3RvY2tzIH19XG4gICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtYWN0aW9uPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktY2VudGVyIHEtZ3V0dGVyLXgtbWRcIj5cbiAgICAgICAgICAgIDxSYXdNYXRlcmlhbHNUYWJsZUVkaXQgOmVkaXQ9XCJwcm9wc1wiIC8+XG4gICAgICAgICAgICA8UmF3TWF0ZXJpYWxzVGFibGVEZWxldGUgOmRlbGV0ZT1cInByb3BzXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L3EtdGFibGU+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IG9uTW91bnRlZCwgcmVmLCBjb21wdXRlZCwgd2F0Y2ggfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgUmF3TWF0ZXJpYWxzVGFibGVFZGl0IGZyb20gXCIuL1Jhd01hdGVyaWFsc1RhYmxlRWRpdC52dWVcIjtcbmltcG9ydCBSYXdNYXRlcmlhbHNUYWJsZURlbGV0ZSBmcm9tIFwiLi9SYXdNYXRlcmlhbHNUYWJsZURlbGV0ZS52dWVcIjtcbmltcG9ydCB7IHVzZVJhd01hdGVyaWFsc1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvcmF3LW1hdGVyaWFsXCI7XG5cbmNvbnN0IG1hdGVyaWFsU3RvcmUgPSB1c2VSYXdNYXRlcmlhbHNTdG9yZSgpO1xuY29uc3QgcmF3TWF0ZXJpYWxzUm93ID0gY29tcHV0ZWQoKCkgPT4gbWF0ZXJpYWxTdG9yZS5yYXdNYXRlcmlhbHMpO1xuY29uc3QgbG9hZGluZyA9IHJlZih0cnVlKTtcbmNvbnN0IGZpbHRlciA9IHJlZihcIlwiKTtcbmNvbnN0IHNob3dOb0RhdGFNZXNzYWdlID0gcmVmKGZhbHNlKTtcbmNvbnN0IHBhZ2luYXRpb24gPSByZWYoe1xuICByb3dzUGVyUGFnZTogMCxcbn0pO1xuXG5jb25zdCBmaWx0ZXJlZFJvd3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmICghZmlsdGVyLnZhbHVlKSB7XG4gICAgcmV0dXJuIHJhd01hdGVyaWFsc1Jvdy52YWx1ZTtcbiAgfVxuICByZXR1cm4gcmF3TWF0ZXJpYWxzUm93LnZhbHVlLmZpbHRlcigocm93KSA9PlxuICAgIHJvdy5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyLnZhbHVlLnRvTG93ZXJDYXNlKCkpXG4gICk7XG59KTtcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgYXdhaXQgcmVsb2FkVGFibGVEYXRhKCk7XG59KTtcblxuY29uc3QgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyID0gKGxvY2F0aW9uKSA9PiB7XG4gIGlmICghbG9jYXRpb24pIHJldHVybiBcIlwiO1xuICByZXR1cm4gbG9jYXRpb25cbiAgICAuc3BsaXQoXCIgXCIpXG4gICAgLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSlcbiAgICAuam9pbihcIiBcIik7XG59O1xuXG5jb25zdCByZWxvYWRUYWJsZURhdGEgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gICAgYXdhaXQgbWF0ZXJpYWxTdG9yZS5mZXRjaFJhd01hdGVyaWFscygpO1xuICAgIGlmICghcmF3TWF0ZXJpYWxzUm93LnZhbHVlLmxlbmd0aCkge1xuICAgICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSB0cnVlO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IHRydWU7XG4gIH0gZmluYWxseSB7XG4gICAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICB9XG59O1xuXG53YXRjaChmaWx0ZXIsIGFzeW5jIChuZXdGaWx0ZXIpID0+IHtcbiAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApKTtcbiAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IGZpbHRlcmVkUm93cy52YWx1ZS5sZW5ndGggPT09IDA7XG59KTtcblxuY29uc3QgcmF3TWF0ZXJpYWxzQ29sdW1ucyA9IFtcbiAge1xuICAgIG5hbWU6IFwibmFtZVwiLFxuICAgIGxhYmVsOiBcIlJhdyBNYXRlcmlhbHMgTmFtZVwiLFxuICAgIGFsaWduOiBcImxlZnRcIixcbiAgICBmaWVsZDogKHJvdykgPT4gcm93Lm5hbWUsXG4gICAgZm9ybWF0OiAodmFsKSA9PiBgJHt2YWx9YCxcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiY29kZVwiLFxuICAgIGxhYmVsOiBcIkNvZGVcIixcbiAgICBhbGlnbjogXCJsZWZ0XCIsXG4gICAgZmllbGQ6IFwiY29kZVwiLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJjYXRlZ29yeVwiLFxuICAgIGxhYmVsOiBcIkNhdGVnb3J5XCIsXG4gICAgYWxpZ246IFwibGVmdFwiLFxuICAgIGZpZWxkOiBcImNhdGVnb3J5XCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInVuaXRcIixcbiAgICBsYWJlbDogXCJVbml0XCIsXG4gICAgYWxpZ246IFwibGVmdFwiLFxuICAgIGZpZWxkOiBcInVuaXRcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYWN0aW9uXCIsXG4gICAgbGFiZWw6IFwiQWN0aW9uXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gIH0sXG5dO1xuXG5jb25zdCBnZXRCYWRnZUNhdGVnb3J5Q29sb3IgPSAoY2F0ZWdvcnkpID0+IHtcbiAgc3dpdGNoIChjYXRlZ29yeSkge1xuICAgIGNhc2UgXCJJbmdyZWRpZW50c1wiOlxuICAgICAgcmV0dXJuIFwidGVhbFwiO1xuICAgIGNhc2UgXCJQYWNrYWdpbmcgTWF0ZXJpYWxzXCI6XG4gICAgICByZXR1cm4gXCJicm93bi02XCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcImdyZXlcIjtcbiAgfVxufTtcbmNvbnN0IGdldEJhZGdlVW5pdENvbG9yID0gKHVuaXQpID0+IHtcbiAgc3dpdGNoICh1bml0KSB7XG4gICAgY2FzZSBcIkdyYW1zXCI6XG4gICAgICByZXR1cm4gXCJpbmZvXCI7XG4gICAgY2FzZSBcIlBjc1wiOlxuICAgICAgcmV0dXJuIFwiYWNjZW50XCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcImdyZXlcIjtcbiAgfVxufTtcbmNvbnN0IGdldFJhd01hdGVyaWFsQmFkZ2VDb2xvciA9IChhdmFpbGFibGVTdG9ja3MpID0+IHtcbiAgY29uc3Qgc3RvY2tWYWx1ZSA9IHBhcnNlSW50KGF2YWlsYWJsZVN0b2Nrcyk7XG4gIGlmIChzdG9ja1ZhbHVlIDw9IDIwKSB7XG4gICAgcmV0dXJuIFwiYmctcmVkXCI7XG4gIH0gZWxzZSBpZiAoc3RvY2tWYWx1ZSA8PSA1MCkge1xuICAgIHJldHVybiBcImJnLXdhcm5pbmdcIjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gXCJiZy1wcmltYXJ5XCI7XG4gIH1cbn07XG48L3NjcmlwdD5cbjxzdHlsZSBzY29wZWQ+XG4uZWxlZ2FudC1jb250YWluZXIge1xuICBiYWNrZ3JvdW5kOiAjZjdmOGZjO1xuICAvKiBwYWRkaW5nOiAxcmVtOyAqL1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG59XG4uYWJzb2x1dGUtZnVsbCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xufVxuLnNwaW5uZXItd3JhcHBlciB7XG4gIG1pbi1oZWlnaHQ6IDQwdmg7IC8qIE1pbmltdW0gaGVpZ2h0IG9mIDUwJSB2aWV3cG9ydCBoZWlnaHQgKi9cbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uZGF0YS1lcnJvciB7XG4gIG1pbi1oZWlnaHQ6IDQwdmg7IC8qIE1pbmltdW0gaGVpZ2h0IG9mIDUwJSB2aWV3cG9ydCBoZWlnaHQgKi9cbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4udGFibGUtY29udGFpbmVyIHtcbiAgbWF4LWhlaWdodDogNDAwcHg7IC8qIEFkanVzdCBhcyBuZWVkZWQgKi9cbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLnEtdGFibGUtY29udGFpbmVyIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbiAhaW1wb3J0YW50OyAvKiBUYXJnZXQgdGhlIGNvbnRhaW5lciBnZW5lcmF0ZWQgYnkgcS10YWJsZSAqL1xufVxuXG4uZHluYW1pYy13aWR0aCB7XG4gIHdpZHRoOiAxMDAlOyAvKiBkZWZhdWx0IHdpZHRoICovXG4gIG1heC13aWR0aDogNTAwcHg7XG4gIG1pbi13aWR0aDogMzAwcHg7IC8qIHNldCBhIG1pbmltdW0gd2lkdGggKi9cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDE1MDBweCkge1xuICAuZHluYW1pYy13aWR0aCB7XG4gICAgbWF4LXdpZHRoOiA1MDBweDsgLyogc21hbGxlciB3aWR0aCBmb3IgbWVkaXVtLXNpemVkIHNjcmVlbnMgKi9cbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLmR5bmFtaWMtd2lkdGgge1xuICAgIG1heC13aWR0aDogNTAwcHg7IC8qIHNtYWxsZXIgd2lkdGggZm9yIHRhYmxldHMgKi9cbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNDgwcHgpIHtcbiAgLmR5bmFtaWMtd2lkdGgge1xuICAgIG1heC13aWR0aDogMjAwcHg7IC8qIHNtYWxsZXIgd2lkdGggZm9yIG1vYmlsZSBzY3JlZW5zICovXG4gIH1cbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0dBLFVBQU0sbUJBQW1CLHFCQUFvQjtBQUM3QyxVQUFNLDJCQUEyQixJQUFJLEtBQUs7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
