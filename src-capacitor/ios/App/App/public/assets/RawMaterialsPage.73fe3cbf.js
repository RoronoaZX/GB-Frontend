import { Q as QBadge } from "./QBadge.cf1023ef.js";
import { _ as _export_sfc, n as ref, t as reactive, o as openBlock, a4 as createElementBlock, a as createVNode, M as QBtn, w as withCtx, Q as QCard, I as QCardSection, af as withDirectives, a2 as QSeparator, aJ as withModifiers, J as createBaseVNode, K as QInput, aK as QCardActions, a3 as QDialog, a5 as Fragment, O as pushScopeId, R as popScopeId, a1 as createTextVNode, N as Notify, g as computed, z as onMounted, u as watch, L as QIcon, c as createBlock, a0 as toDisplayString, aL as normalizeClass } from "./index.9b9dbcba.js";
import { Q as QPage } from "./QPage.4b0a10d6.js";
import { Q as QSpace } from "./QSpace.5918deea.js";
import { Q as QSelect, a as QTd, b as QTable } from "./QTable.0bf3c36f.js";
import { Q as QForm } from "./QForm.326c5fc0.js";
import { C as ClosePopup } from "./ClosePopup.83fef54c.js";
import { u as useRawMaterialsStore } from "./raw-material.7ef38176.js";
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
var RawMaterialsCreate_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$3 = (n) => (pushScopeId("data-v-22ac2cbc"), n = n(), popScopeId(), n);
const _hoisted_1$4 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F6E0}\uFE0F Add Raw Materials", -1));
const _hoisted_2$4 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_3$3 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_4$3 = { class: "q-mt-md q-animated q-animate-bounce" };
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
                        createBaseVNode("div", _hoisted_4$3, [
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
var RawMaterialsCreate = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-22ac2cbc"], ["__file", "RawMaterialsCreate.vue"]]);
var RawMaterialsTableEdit_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-ec579294"), n = n(), popScopeId(), n);
const _hoisted_1$3 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F6E0}\uFE0F Edit Raw Materials", -1));
const _hoisted_2$3 = { class: "q-animated q-animate-bounce" };
const _hoisted_3$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-my-sm" }, "Raw Materials Name", -1));
const _hoisted_4$2 = { class: "q-animated q-animate-bounce" };
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
                    createBaseVNode("div", _hoisted_4$2, [
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
const _withScopeId$1 = (n) => (pushScopeId("data-v-29bbd1ba"), n = n(), popScopeId(), n);
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
        Notify.create({
          message: "Item deleted successfully.",
          type: "positive",
          position: "top-right"
        });
      } catch (error) {
        Notify.create({
          message: `Failed to delete item: ${error.message}`,
          type: "negative",
          position: "top-right"
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
var RawMaterialsTableDelete = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-29bbd1ba"], ["__file", "RawMaterialsTableDelete.vue"]]);
var RawMaterialsTable_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-55331fde"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { align: "right" };
const _hoisted_2$1 = {
  key: 0,
  class: "spinner-wrapper"
};
const _hoisted_3$1 = { key: 1 };
const _hoisted_4$1 = {
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
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          createVNode(QSpinnerDots, {
            size: "50px",
            color: "primary"
          })
        ])) : (openBlock(), createElementBlock("div", _hoisted_3$1, [
          filteredRows.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
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
var RawMaterialsTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-55331fde"], ["__file", "RawMaterialsTable.vue"]]);
var RawMaterialsPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = { class: "text-h6" };
const _hoisted_2 = { class: "q-gutter-x-sm" };
const _hoisted_3 = { class: "q-gutter-x-sm" };
const _hoisted_4 = { align: "right" };
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
                createTextVNode(" \u{1F6E0}\uFE0F Raw Materials "),
                createBaseVNode("div", _hoisted_2, [
                  createVNode(QBadge, {
                    label: "Good",
                    class: "text-white",
                    color: "primary"
                  }),
                  createVNode(QBadge, {
                    label: "Warning",
                    class: "text-white",
                    color: "warning"
                  }),
                  createVNode(QBadge, {
                    label: "Danger",
                    class: "text-white",
                    color: "red"
                  })
                ]),
                createBaseVNode("div", _hoisted_3, [
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
              createBaseVNode("div", _hoisted_4, [
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
var RawMaterialsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-86abbe9a"], ["__file", "RawMaterialsPage.vue"]]);
export { RawMaterialsPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmF3TWF0ZXJpYWxzUGFnZS43M2ZlM2NiZi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvcmF3X21hdGVyaWFscy9jb21wb25lbnRzL1Jhd01hdGVyaWFsc0NyZWF0ZS52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9yYXdfbWF0ZXJpYWxzL2NvbXBvbmVudHMvUmF3TWF0ZXJpYWxzVGFibGVFZGl0LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL3Jhd19tYXRlcmlhbHMvY29tcG9uZW50cy9SYXdNYXRlcmlhbHNUYWJsZURlbGV0ZS52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9yYXdfbWF0ZXJpYWxzL2NvbXBvbmVudHMvUmF3TWF0ZXJpYWxzVGFibGUudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPHEtYnRuXG4gICAgY2xhc3M9XCJxLXBhLXNtIGJ0bi1hZGRcIlxuICAgIG91dGxpbmVcbiAgICBkZW5zZVxuICAgIGVsZXZhdGVkXG4gICAgaWNvbj1cImFkZF9jaXJjbGVcIlxuICAgIGxhYmVsPVwiQWRkIFJhdyBNYXRlcmlhbHNcIlxuICAgIEBjbGljaz1cIm9wZW5fYWRkX2luZ3JlZGllbnRzX2RpYWxvZ1wiXG4gICAgc2l6ZT1cIm1kXCJcbiAgICBjb2xvcj1cImRhcmtcIlxuICAvPlxuXG4gIDxxLWRpYWxvZ1xuICAgIHYtbW9kZWw9XCJjcmVhdGVSYXdNYXRlcmlhbHNEaWFsb2dcIlxuICAgIHBlcnNpc3RlbnRcbiAgICB0cmFuc2l0aW9uLXNob3c9XCJqdW1wLXVwXCJcbiAgICB0cmFuc2l0aW9uLWhpZGU9XCJqdW1wLWRvd25cIlxuICA+XG4gICAgPHEtY2FyZFxuICAgICAgY2xhc3M9XCJteS1jYXJkIHEtcGEtbm9uZVwiXG4gICAgICBzdHlsZT1cIlxuICAgICAgICB3aWR0aDogNDIwcHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMTJweCAyNHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgICAgIFwiXG4gICAgPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uXG4gICAgICAgIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBxLXB4LW1kIHEtcHktc20gYmctZ3JhZGllbnQgdGV4dC13aGl0ZVwiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg1IHEtbXItbWRcIj7wn5ug77iPIEFkZCBSYXcgTWF0ZXJpYWxzPC9kaXY+XG4gICAgICAgIDxxLXNwYWNlIC8+XG4gICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IGRlbnNlIHJvdW5kIHYtY2xvc2UtcG9wdXAgY2xhc3M9XCJ0ZXh0LXdoaXRlXCIgLz5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgIDxxLXNlcGFyYXRvciBjbGFzcz1cInNlcGFyYXRvci1ncmFkaWVudFwiIC8+XG5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcHgteGwgcS1wdC1ub25lIHEtcGItbGdcIj5cbiAgICAgICAgPHEtZm9ybSBAc3VibWl0LnByZXZlbnQ9XCJjcmVhdGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1sZyBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJhZGRSYXdNYXRlcmlhbHNGb3JtLm5hbWVcIlxuICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBsYWJlbD1cIlJhdyBNYXRlcmlhbHMgTmFtZVwiXG4gICAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnTmFtZSBpcyByZXF1aXJlZCddXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbWQgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICB2LW1vZGVsPVwiYWRkUmF3TWF0ZXJpYWxzRm9ybS5jb2RlXCJcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgbGFiZWw9XCJSYXcgTWF0ZXJpYWxzIENvZGVcIlxuICAgICAgICAgICAgICBtYXNrPVwiIyMtQUFBQUFBQUFBQUFBQUFBQUFBQUFBXCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIwMC1TQU1QTEVcIlxuICAgICAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCkgfHwgJ0NvZGUgaXMgcmVxdWlyZWQnXVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LW1kIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJhZGRSYXdNYXRlcmlhbHNGb3JtLmNhdGVnb3J5XCJcbiAgICAgICAgICAgICAgOm9wdGlvbnM9XCJyYXdNYXRlcmlhbHNDYXRlZ29yeVwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiQ2F0ZWdvcnlcIlxuICAgICAgICAgICAgICBoaWRlLWRyb3Bkb3duLWljb25cbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgYmVoYXZpb3I9XCJtZW51XCJcbiAgICAgICAgICAgICAgOnJ1bGVzPVwiW1xuICAgICAgICAgICAgICAgICh2YWwpID0+ICh2YWwgJiYgdmFsLmxlbmd0aCA+IDApIHx8ICdDYXRlZ29yeSBpcyByZXF1aXJlZCcsXG4gICAgICAgICAgICAgIF1cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1tZCBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgICB2LW1vZGVsPVwiYWRkUmF3TWF0ZXJpYWxzRm9ybS51bml0XCJcbiAgICAgICAgICAgICAgOm9wdGlvbnM9XCJpbmdyZWRpZW50c1VuaXRPcHRpb25zXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJVbml0XCJcbiAgICAgICAgICAgICAgaGlkZS1kcm9wZG93bi1pY29uXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIGJlaGF2aW9yPVwibWVudVwiXG4gICAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnVW5pdCBpcyByZXF1aXJlZCddXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHEtY2FyZC1hY3Rpb25zIGNsYXNzPVwicm93IHEtcHgtbGcgcS1weS1zbSBxLXB0LW5vbmVcIiBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgY2xhc3M9XCJidG4tY2FuY2VsIGdsb3NzeVwiXG4gICAgICAgICAgICAgIGNvbG9yPVwibmVnYXRpdmVcIlxuICAgICAgICAgICAgICBsYWJlbD1cIkNhbmNlbFwiXG4gICAgICAgICAgICAgIHYtY2xvc2UtcG9wdXBcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgIGNsYXNzPVwiYnRuLWNyZWF0ZSBnbG9zc3lcIlxuICAgICAgICAgICAgICBjb2xvcj1cInBvc2l0aXZlXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJDcmVhdGVcIlxuICAgICAgICAgICAgICA6bG9hZGluZz1cImxvYWRpbmdcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L3EtY2FyZC1hY3Rpb25zPlxuICAgICAgICA8L3EtZm9ybT5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmLCByZWFjdGl2ZSB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IHVzZVJhd01hdGVyaWFsc1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvcmF3LW1hdGVyaWFsXCI7XG5cbmNvbnN0IHJhd01hdGVyaWFsU3RvcmUgPSB1c2VSYXdNYXRlcmlhbHNTdG9yZSgpO1xuY29uc3QgY3JlYXRlUmF3TWF0ZXJpYWxzRGlhbG9nID0gcmVmKGZhbHNlKTtcbmNvbnN0IHJhd01hdGVyaWFsc0NhdGVnb3J5ID0gW1wiSW5ncmVkaWVudHNcIiwgXCJQYWNrYWdpbmcgTWF0ZXJpYWxzXCJdO1xuY29uc3QgaW5ncmVkaWVudHNVbml0T3B0aW9ucyA9IFtcIkdyYW1zXCIsIFwiUGNzXCJdO1xuY29uc3QgbG9hZGluZyA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IG9wZW5fYWRkX2luZ3JlZGllbnRzX2RpYWxvZyA9ICgpID0+IHtcbiAgY3JlYXRlUmF3TWF0ZXJpYWxzRGlhbG9nLnZhbHVlID0gdHJ1ZTtcbn07XG5cbmNvbnN0IGFkZFJhd01hdGVyaWFsc0Zvcm0gPSByZWFjdGl2ZSh7XG4gIG5hbWU6IFwiXCIsXG4gIGNvZGU6IFwiXCIsXG4gIGNhdGVnb3J5OiBudWxsLFxuICB1bml0OiBudWxsLFxufSk7XG5cbmNvbnN0IGNyZWF0ZSA9IGFzeW5jICgpID0+IHtcbiAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gIHRyeSB7XG4gICAgYXdhaXQgcmF3TWF0ZXJpYWxTdG9yZS5jcmVhdGVSYXdNYXRlcmlhbHMoYWRkUmF3TWF0ZXJpYWxzRm9ybSk7XG4gICAgY3JlYXRlUmF3TWF0ZXJpYWxzRGlhbG9nLnZhbHVlID0gZmFsc2U7XG4gICAgcmVzZXRDcmVhdGVSYXdNYXRlcmlhbHMoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIH1cbn07XG5cbmNvbnN0IHJlc2V0Q3JlYXRlUmF3TWF0ZXJpYWxzID0gKCkgPT4ge1xuICBhZGRSYXdNYXRlcmlhbHNGb3JtLm5hbWUgPSBcIlwiO1xuICBhZGRSYXdNYXRlcmlhbHNGb3JtLmNvZGUgPSBcIlwiO1xuICBhZGRSYXdNYXRlcmlhbHNGb3JtLmNhdGVnb3J5ID0gbnVsbDtcbiAgYWRkUmF3TWF0ZXJpYWxzRm9ybS51bml0ID0gbnVsbDtcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5teS1jYXJkIHtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYW5pbWF0aW9uOiBmYWRlSW4gMC4zcyBlYXNlO1xufVxuXG4uYnRuLWFkZCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzAwMDAwMCwgIzAwMDAwMCk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmJnLWdyYWRpZW50IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzAwYmZhNSwgIzAwNzk2Yik7XG59XG5cbi5zZXBhcmF0b3ItZ3JhZGllbnQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMwMGJmYTUsICMwMDc5NmIpO1xufVxuXG4ucS1idG4ge1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcbn1cblxuLnEtYnRuOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpO1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG5cbi5idG4tY2FuY2VsIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZWY1MzUwLCAjZTUzOTM1KTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uYnRuLWNyZWF0ZSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzY2YmI2YSwgIzQzYTA0Nyk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLnEtYW5pbWF0ZS1ib3VuY2Uge1xuICBhbmltYXRpb246IGJvdW5jZUluIDAuNnMgZWFzZTtcbn1cblxuQGtleWZyYW1lcyBmYWRlSW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMHB4KTtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIH1cbn1cblxuQGtleWZyYW1lcyBib3VuY2VJbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtYnRuXG4gICAgY29sb3I9XCJwb3NpdGl2ZVwiXG4gICAgaWNvbj1cImVkaXRcIlxuICAgIHNpemU9XCJzbVwiXG4gICAgZmxhdFxuICAgIHJvdW5kXG4gICAgZGVuc2VcbiAgICBAY2xpY2s9XCJvcGVuRWRpdEZvcm1cIlxuICA+XG4gICAgPHEtdG9vbHRpcCBjbGFzcz1cImJnLXBvc2l0aXZlXCIgOmRlbGF5PVwiMjAwXCI+RWRpdDwvcS10b29sdGlwPlxuICA8L3EtYnRuPlxuICA8cS1kaWFsb2dcbiAgICB2LW1vZGVsPVwiZWRpdFJhd01hdGVyaWFsc0RpYWxvZ1wiXG4gICAgcGVyc2lzdGVudFxuICAgIHRyYW5zaXRpb24tc2hvdz1cImp1bXAtdXBcIlxuICAgIHRyYW5zaXRpb24taGlkZT1cImp1bXAtZG93blwiXG4gID5cbiAgICA8cS1jYXJkXG4gICAgICBjbGFzcz1cIm15LWNhcmQgcS1wYS1ub25lXCJcbiAgICAgIHN0eWxlPVwiXG4gICAgICAgIHdpZHRoOiA0MjBweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICAgICAgYm94LXNoYWRvdzogMCAxMnB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xuICAgICAgXCJcbiAgICA+XG4gICAgICA8cS1jYXJkLXNlY3Rpb25cbiAgICAgICAgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtcHgtbWQgcS1weS1zbSBiZy1ncmFkaWVudCB0ZXh0LXdoaXRlXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDUgcS1tci1tZFwiPvCfm6DvuI8gRWRpdCBSYXcgTWF0ZXJpYWxzPC9kaXY+XG4gICAgICAgIDxxLXNwYWNlIC8+XG4gICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IGRlbnNlIHJvdW5kIHYtY2xvc2UtcG9wdXAgY2xhc3M9XCJ0ZXh0LXdoaXRlXCIgLz5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1zZXBhcmF0b3IgLz5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtbXktbWQgcS1teC1tZCBxLWd1dHRlci15LW1kXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1teS1zbVwiPlJhdyBNYXRlcmlhbHMgTmFtZTwvZGl2PlxuICAgICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJlZGl0UmF3TWF0ZXJpYWxzRm9ybS5uYW1lXCIgb3V0bGluZWQgZGVuc2UgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1teS1zbVwiPlJhdyBNYXRlcmlhbHMgQ29kZTwvZGl2PlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICB2LW1vZGVsPVwiZWRpdFJhd01hdGVyaWFsc0Zvcm0uY29kZVwiXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiB2YWwgJiYgdmFsLmxlbmd0aCA+IDBdXCJcbiAgICAgICAgICAgIG1hc2s9XCIjIy1BQUFBQUFBQUFBQUFBQUFBQUFBQUFcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIwMC1TQU1QTEVcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtbXktc21cIj5DYXRlZ29yeTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LW1kXCI+XG4gICAgICAgICAgICA8cS1zZWxlY3RcbiAgICAgICAgICAgICAgdi1tb2RlbD1cImVkaXRSYXdNYXRlcmlhbHNGb3JtLmNhdGVnb3J5XCJcbiAgICAgICAgICAgICAgOm9wdGlvbnM9XCJyYXdNYXRlcmlhbHNDYXRlZ29yeVwiXG4gICAgICAgICAgICAgIGhpZGUtZHJvcGRvd24taWNvblxuICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBiZWhhdmlvcj1cIm1lbnVcIlxuICAgICAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gdmFsICYmIHZhbC5sZW5ndGggPiAwXVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW15LXNtXCI+VW5pdDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LW1kXCI+XG4gICAgICAgICAgICA8cS1zZWxlY3RcbiAgICAgICAgICAgICAgdi1tb2RlbD1cImVkaXRSYXdNYXRlcmlhbHNGb3JtLnVuaXRcIlxuICAgICAgICAgICAgICA6b3B0aW9ucz1cImluZ3JlZGllbnRzVW5pdE9wdGlvbnNcIlxuICAgICAgICAgICAgICBoaWRlLWRyb3Bkb3duLWljb25cbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgYmVoYXZpb3I9XCJtZW51XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtYWN0aW9ucyBjbGFzcz1cInJvdyBxLW1hLW1kXCIgYWxpZ249XCJyaWdodFwiPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBjbGFzcz1cImJ0bi1jYW5jZWwgZ2xvc3N5XCJcbiAgICAgICAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICAgICAgICBsYWJlbD1cIkNhbmNlbFwiXG4gICAgICAgICAgdi1jbG9zZS1wb3B1cFxuICAgICAgICAvPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBjbGFzcz1cImJ0bi1jcmVhdGUgZ2xvc3N5XCJcbiAgICAgICAgICBjb2xvcj1cInBvc2l0aXZlXCJcbiAgICAgICAgICBsYWJlbD1cIlNhdmVcIlxuICAgICAgICAgIDpsb2FkaW5nPVwibG9hZGluZ1wiXG4gICAgICAgICAgQGNsaWNrPVwic2F2ZUVkaXRlZEluZ3JlZGllbnRcIlxuICAgICAgICAvPlxuICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmLCByZWFjdGl2ZSB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IHVzZVJhd01hdGVyaWFsc1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvcmF3LW1hdGVyaWFsXCI7XG5pbXBvcnQgeyBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5cbmNvbnN0IHJhd01hdGVyaWFsc1N0b3JlID0gdXNlUmF3TWF0ZXJpYWxzU3RvcmUoKTtcbmNvbnN0IGVkaXRSYXdNYXRlcmlhbHNEaWFsb2cgPSByZWYoZmFsc2UpO1xuY29uc3QgcmF3TWF0ZXJpYWxzQ2F0ZWdvcnkgPSBbXCJJbmdyZWRpZW50c1wiLCBcIlBhY2thZ2luZyBNYXRlcmlhbHNcIl07XG5jb25zdCBpbmdyZWRpZW50c1VuaXRPcHRpb25zID0gW1wiR3JhbXNcIiwgXCJQY3NcIl07XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHMoW1wiZWRpdFwiXSk7XG5cbmNvbnN0IGVkaXRSYXdNYXRlcmlhbHNGb3JtID0gcmVhY3RpdmUoe1xuICBuYW1lOiBcIlwiLFxuICBjb2RlOiBcIlwiLFxuICBjYXRlZ29yeTogbnVsbCxcbiAgdW5pdDogbnVsbCxcbn0pO1xuXG5jb25zdCBvcGVuRWRpdEZvcm0gPSAoKSA9PiB7XG4gIGNvbnN0IGVkaXRSYXdNYXRlcmlhbHMgPSBPYmplY3QuYXNzaWduKGVkaXRSYXdNYXRlcmlhbHNGb3JtLCBwcm9wcy5lZGl0LnJvdyk7XG4gIGVkaXRSYXdNYXRlcmlhbHNEaWFsb2cudmFsdWUgPSB0cnVlO1xuICBjb25zb2xlLmxvZyhcImVkaXRSYXdNYXRlcmlhbHNcIiwgZWRpdFJhd01hdGVyaWFscyk7XG59O1xuXG5jb25zdCBzYXZlRWRpdGVkSW5ncmVkaWVudCA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB1cGRhdGVkUmF3TWF0ZXJpYWxzID0geyAuLi5wcm9wcy5lZGl0LnJvdywgLi4uZWRpdFJhd01hdGVyaWFsc0Zvcm0gfTtcbiAgICBhd2FpdCByYXdNYXRlcmlhbHNTdG9yZS51cGRhdGVSYXdNYXRlcmlhbHMoXG4gICAgICBwcm9wcy5lZGl0LnJvdy5pZCxcbiAgICAgIHVwZGF0ZWRSYXdNYXRlcmlhbHNcbiAgICApO1xuICAgIGVkaXRSYXdNYXRlcmlhbHNEaWFsb2cudmFsdWUgPSBmYWxzZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHVwZGF0ZSBpbmdyZWRpZW50OlwiLCBlcnJvcik7XG4gIH1cbn07XG5cbi8vIGNvbnN0IHNhdmVFZGl0ZWRJbmdyZWRpZW50ID0gYXN5bmMgKCkgPT4ge1xuLy8gICB0cnkge1xuLy8gICAgIGNvbnN0IG9yaWdpbmFsUmF3TWF0ZXJpYWxzID0gcHJvcHMuZWRpdC5yb3c7XG4vLyAgICAgY29uc3QgdXBkYXRlZFJhd01hdGVyaWFscyA9IHtcbi8vICAgICAgIGlkOiBvcmlnaW5hbFJhd01hdGVyaWFscy5pZCxcbi8vICAgICAgIG5hbWU6IGVkaXRSYXdNYXRlcmlhbHNGb3JtLm5hbWUsXG4vLyAgICAgICBjb2RlOiBlZGl0UmF3TWF0ZXJpYWxzRm9ybS5jb2RlLFxuLy8gICAgICAgY2F0ZWdvcnk6IGVkaXRSYXdNYXRlcmlhbHNGb3JtLmNhdGVnb3J5LFxuLy8gICAgICAgdW5pdDogZWRpdFJhd01hdGVyaWFsc0Zvcm0udW5pdCxcbi8vICAgICB9O1xuLy8gICAgIGNvbnN0IGNoYW5nZWRGaWVsZHMgPSBbXTtcbi8vICAgICBpZiAob3JpZ2luYWxSYXdNYXRlcmlhbHMubmFtZSAhPT0gdXBkYXRlZFJhd01hdGVyaWFscy5uYW1lKSB7XG4vLyAgICAgICBjaGFuZ2VkRmllbGRzLnB1c2goXG4vLyAgICAgICAgIGBOYW1lOiAke29yaWdpbmFsUmF3TWF0ZXJpYWxzLm5hbWV9IHRvICQgdXBkYXRlZFJhd01hdGVyaWFscy5uYW1lfWBcbi8vICAgICAgICk7XG4vLyAgICAgfVxuLy8gICAgIGlmIChvcmlnaW5hbFJhd01hdGVyaWFscy5jb2RlICE9PSB1cGRhdGVkUmF3TWF0ZXJpYWxzLmNvZGUpIHtcbi8vICAgICAgIGNoYW5nZWRGaWVsZHMucHVzaChcbi8vICAgICAgICAgYENvZGU6ICR7b3JpZ2luYWxSYXdNYXRlcmlhbHMuY29kZX0gdG8gJCB1cGRhdGVkUmF3TWF0ZXJpYWxzLmNvZGV9YFxuLy8gICAgICAgKTtcbi8vICAgICB9XG4vLyAgICAgaWYgKG9yaWdpbmFsUmF3TWF0ZXJpYWxzLnVuaXQgIT09IHVwZGF0ZWRSYXdNYXRlcmlhbHMudW5pdCkge1xuLy8gICAgICAgY2hhbmdlZEZpZWxkcy5wdXNoKFxuLy8gICAgICAgICBgVW5pdDogJHtvcmlnaW5hbFJhd01hdGVyaWFscy51bml0fSB0byAkIHVwZGF0ZWRSYXdNYXRlcmlhbHMudW5pdH1gXG4vLyAgICAgICApO1xuLy8gICAgIH1cblxuLy8gICAgIGF3YWl0IHJhd01hdGVyaWFsU3RvcmUudXBkYXRlKHByb3BzLmVkaXQucm93LmlkLCB1cGRhdGVkUmF3TWF0ZXJpYWxzKTtcbi8vICAgICBOb3RpZnkuY3JlYXRlKHtcbi8vICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxuLy8gICAgICAgaWNvbjogXCJjaGVja1wiLFxuLy8gICAgICAgbWVzc2FnZTogYCR7cHJvcHMuZWRpdC5yb3cubmFtZX0gaW5ncmVkaWVudCBzdWNjZXNzZnVsbHkgdXBkYXRlZCFgLFxuLy8gICAgICAgcG9zaXRpb246IFwidG9wXCIsXG4vLyAgICAgfSk7XG5cbi8vICAgICBlZGl0UmF3TWF0ZXJpYWxzRGlhbG9nLnZhbHVlID0gZmFsc2U7XG4vLyAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwMCkge1xuLy8gICAgICAgY29uc29sZS5sb2coXCJJbmdyZWRpZW50IHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5OlwiLCByZXNwb25zZS5kYXRhKTtcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gdXBkYXRlIGluZ3JlZGllbnQ6XCIsIHJlc3BvbnNlKTtcbi8vICAgICB9XG4vLyAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuLy8gfTtcbjwvc2NyaXB0PlxuPHN0eWxlIHNjb3BlZD5cbi5teS1jYXJkIHtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYW5pbWF0aW9uOiBmYWRlSW4gMC4zcyBlYXNlO1xufVxuXG4uYnRuLWFkZCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzQyYTVmNSwgIzQ3OGVkMSk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmJnLWdyYWRpZW50IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzAwYmZhNSwgIzAwNzk2Yik7XG59XG5cbi5zZXBhcmF0b3ItZ3JhZGllbnQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMwMGJmYTUsICMwMDc5NmIpO1xufVxuXG4ucS1idG4ge1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcbn1cblxuLnEtYnRuOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpO1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG5cbi5idG4tY2FuY2VsIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZWY1MzUwLCAjZTUzOTM1KTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uYnRuLWNyZWF0ZSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzY2YmI2YSwgIzQzYTA0Nyk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLnEtYW5pbWF0ZS1ib3VuY2Uge1xuICBhbmltYXRpb246IGJvdW5jZUluIDAuNnMgZWFzZTtcbn1cblxuQGtleWZyYW1lcyBmYWRlSW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMHB4KTtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIH1cbn1cblxuQGtleWZyYW1lcyBib3VuY2VJbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtYnRuXG4gICAgQGNsaWNrPVwiZGVsZXRlRGlhbG9nXCJcbiAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICBpY29uPVwiZGVsZXRlXCJcbiAgICBzaXplPVwic21cIlxuICAgIGZsYXRcbiAgICByb3VuZFxuICAgIGRlbnNlXG4gICAgYXJpYS1sYWJlbD1cIkRlbGV0ZVwiXG4gID5cbiAgICA8cS10b29sdGlwIGNsYXNzPVwiYmctbmVnYXRpdmVcIiA6ZGVsYXk9XCIyMDBcIj5EZWxldGU8L3EtdG9vbHRpcD5cbiAgPC9xLWJ0bj5cblxuICA8cS1kaWFsb2cgdi1tb2RlbD1cImRpYWxvZ1Zpc2libGVcIiBwZXJzaXN0ZW50PlxuICAgIDxxLWNhcmQgY2xhc3M9XCJxLXBhLW1kIHEtcm91bmRlZCBxLWVsZXZhdGUtMiBiZy13aGl0ZSB0ZXh0LWdyZXktOVwiPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1wdC1ub25lIHEtcGItc21cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDUgcS1tYi14c1wiPkNvbmZpcm0gRGVsZXRpb248L2Rpdj5cbiAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LWJvZHkyIHEtbWItbm9uZVwiPlxuICAgICAgICAgIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBpdGVtPyBUaGlzIGFjdGlvbiBjYW5ub3QgYmVcbiAgICAgICAgICB1bmRvbmUuXG4gICAgICAgIDwvcD5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgIDxxLXNlcGFyYXRvciBjbGFzcz1cInEtbWItbWRcIiAvPlxuXG4gICAgICA8cS1jYXJkLWFjdGlvbnMgYWxpZ249XCJyaWdodFwiIGNsYXNzPVwicS1wdC1ub25lXCI+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGZsYXRcbiAgICAgICAgICBkZW5zZVxuICAgICAgICAgIGxhYmVsPVwiQ2FuY2VsXCJcbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgIHYtY2xvc2UtcG9wdXBcbiAgICAgICAgICBjbGFzcz1cInEtbXItc21cIlxuICAgICAgICAvPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBkZW5zZVxuICAgICAgICAgIGxhYmVsPVwiRGVsZXRlXCJcbiAgICAgICAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICAgICAgICBAY2xpY2s9XCJvbkRlbGV0ZVwiXG4gICAgICAgICAgY2xhc3M9XCJxLWJ0bi1yb3VuZGVkIHEtcHgtbGdcIlxuICAgICAgICAvPlxuICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyB1c2VSYXdNYXRlcmlhbHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3Jhdy1tYXRlcmlhbFwiO1xuaW1wb3J0IHsgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuXG5jb25zdCBtYXRlcmlhbHNTdG9yZSA9IHVzZVJhd01hdGVyaWFsc1N0b3JlKCk7XG5jb25zdCBkaWFsb2dWaXNpYmxlID0gcmVmKGZhbHNlKTtcblxuY29uc3QgZGVsZXRlRGlhbG9nID0gKCkgPT4ge1xuICBkaWFsb2dWaXNpYmxlLnZhbHVlID0gdHJ1ZTtcbn07XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHMoW1wiZGVsZXRlXCJdKTtcbmNvbnN0IG9yaWdpbmFsRGF0YSA9IHByb3BzLmRlbGV0ZS5yb3c7XG5cbmNvbnN0IG9uRGVsZXRlID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGF3YWl0IG1hdGVyaWFsc1N0b3JlLmRlbGV0ZVJhd01hdGVyaWFscyhvcmlnaW5hbERhdGEuaWQpO1xuICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgbWVzc2FnZTogXCJJdGVtIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5LlwiLFxuICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgICAgcG9zaXRpb246IFwidG9wLXJpZ2h0XCIsXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICBtZXNzYWdlOiBgRmFpbGVkIHRvIGRlbGV0ZSBpdGVtOiAke2Vycm9yLm1lc3NhZ2V9YCxcbiAgICAgIHR5cGU6IFwibmVnYXRpdmVcIixcbiAgICAgIHBvc2l0aW9uOiBcInRvcC1yaWdodFwiLFxuICAgIH0pO1xuICB9XG4gIGRpYWxvZ1Zpc2libGUudmFsdWUgPSBmYWxzZTtcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5xLWNhcmQge1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBib3gtc2hhZG93OiAwIDhweCAyNHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuLnEtY2FyZC1zZWN0aW9uIHtcbiAgcGFkZGluZzogMjRweCAzMnB4O1xufVxuXG4ucS1idG4ge1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycyBlYXNlLCBib3gtc2hhZG93IDAuMnMgZWFzZTtcbn1cblxuLnEtYnRuLXJvdW5kZWQge1xuICBib3JkZXItcmFkaXVzOiA1MHB4O1xufVxuXG4ucS1idG46aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcbn1cblxuLnEtYnRuOmFjdGl2ZSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgYm94LXNoYWRvdzogbm9uZTtcbn1cblxuLnRleHQtaDUge1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4udGV4dC1ib2R5MiB7XG4gIGNvbG9yOiAjNjY2O1xufVxuXG4ucS1lbGV2YXRlLTIge1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4uYmctd2hpdGUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xufVxuXG4udGV4dC1ncmV5LTkge1xuICBjb2xvcjogIzMzMztcbn1cblxuLnEtc2VwYXJhdG9yIHtcbiAgYm9yZGVyLWNvbG9yOiAjZWVlO1xufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBhbGlnbj1cInJpZ2h0XCI+XG4gICAgPHEtaW5wdXRcbiAgICAgIHYtbW9kZWw9XCJmaWx0ZXJcIlxuICAgICAgY2xhc3M9XCJxLXBiLWxnIHEtcGwtbWRcIlxuICAgICAgb3V0bGluZWRcbiAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgIGZsYXRcbiAgICAgIHJvdW5kZWRcbiAgICAgIGRlbnNlXG4gICAgICBkZWJvdW5jZT1cIjEwMFwiXG4gICAgICBzdHlsZT1cIndpZHRoOiA1MDBweDsgbWF4LXdpZHRoOiAxNTAwcHg7IG1pbi13aWR0aDogMTAwcHhcIlxuICAgID5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICA8cS1pY29uIG5hbWU9XCJzZWFyY2hcIiAvPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L3EtaW5wdXQ+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwic3Bpbm5lci13cmFwcGVyXCIgdi1pZj1cImxvYWRpbmdcIj5cbiAgICA8cS1zcGlubmVyLWRvdHMgc2l6ZT1cIjUwcHhcIiBjb2xvcj1cInByaW1hcnlcIiAvPlxuICA8L2Rpdj5cbiAgPGRpdiB2LWVsc2U+XG4gICAgPGRpdiB2LWlmPVwiZmlsdGVyZWRSb3dzLmxlbmd0aCA9PT0gMFwiIGNsYXNzPVwiZGF0YS1lcnJvclwiPlxuICAgICAgPHEtaWNvbiBuYW1lPVwid2FybmluZ1wiIGNvbG9yPVwid2FybmluZ1wiIHNpemU9XCI0ZW1cIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInEtbWwtc20gdGV4dC1oNlwiPk5vIGRhdGEgYXZhaWxhYmxlPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPHEtdGFibGVcbiAgICAgIHYtZWxzZVxuICAgICAgY2xhc3M9XCJ0YWJsZS1jb250YWluZXIgZWxlZ2FudC1jb250YWluZXIgc3RpY2t5LWhlYWRlclwiXG4gICAgICA6ZmlsdGVyPVwiZmlsdGVyXCJcbiAgICAgIDp2aXJ0dWFsLXNjcm9sbC1zdGlja3ktc2l6ZS1zdGFydD1cIjQ4XCJcbiAgICAgIGZsYXRcbiAgICAgIHN0eWxlPVwiaGVpZ2h0OiA0MDBweFwiXG4gICAgICA6Y29sdW1ucz1cInJhd01hdGVyaWFsc0NvbHVtbnNcIlxuICAgICAgOnJvd3M9XCJmaWx0ZXJlZFJvd3NcIlxuICAgICAgcm93LWtleT1cIm5hbWVcIlxuICAgICAgdmlydHVhbC1zY3JvbGxcbiAgICAgIHYtbW9kZWw6cGFnaW5hdGlvbj1cInBhZ2luYXRpb25cIlxuICAgICAgOnJvd3MtcGVyLXBhZ2Utb3B0aW9ucz1cIlswXVwiXG4gICAgICBoaWRlLWJvdHRvbVxuICAgID5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLWNhdGVnb3J5PVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQga2V5PVwibmFtZVwiIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPHEtYmFkZ2UgOmNvbG9yPVwiZ2V0QmFkZ2VDYXRlZ29yeUNvbG9yKHByb3BzLnJvdy5jYXRlZ29yeSlcIj5cbiAgICAgICAgICAgIHt7IHByb3BzLnJvdy5jYXRlZ29yeSB9fVxuICAgICAgICAgIDwvcS1iYWRnZT5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLXVuaXQ9XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCBrZXk9XCJuYW1lXCIgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8cS1iYWRnZSA6Y29sb3I9XCJnZXRCYWRnZVVuaXRDb2xvcihwcm9wcy5yb3cudW5pdClcIj5cbiAgICAgICAgICAgIHt7IHByb3BzLnJvdy51bml0IH19XG4gICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtYXZhaWxhYmxlU3RvY2tzPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8cS1iYWRnZVxuICAgICAgICAgICAgc3F1YXJlXG4gICAgICAgICAgICBjbGFzcz1cInRleHQtd2hpdGVcIlxuICAgICAgICAgICAgOmNsYXNzPVwiZ2V0UmF3TWF0ZXJpYWxCYWRnZUNvbG9yKHByb3BzLnJvdy5hdmFpbGFibGVTdG9ja3MpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eyBwcm9wcy5yb3cuYXZhaWxhYmxlU3RvY2tzIH19XG4gICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtYWN0aW9uPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktY2VudGVyIHEtZ3V0dGVyLXgtbWRcIj5cbiAgICAgICAgICAgIDxSYXdNYXRlcmlhbHNUYWJsZUVkaXQgOmVkaXQ9XCJwcm9wc1wiIC8+XG4gICAgICAgICAgICA8UmF3TWF0ZXJpYWxzVGFibGVEZWxldGUgOmRlbGV0ZT1cInByb3BzXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L3EtdGFibGU+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IG9uTW91bnRlZCwgcmVmLCBjb21wdXRlZCwgd2F0Y2ggfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgUmF3TWF0ZXJpYWxzVGFibGVFZGl0IGZyb20gXCIuL1Jhd01hdGVyaWFsc1RhYmxlRWRpdC52dWVcIjtcbmltcG9ydCBSYXdNYXRlcmlhbHNUYWJsZURlbGV0ZSBmcm9tIFwiLi9SYXdNYXRlcmlhbHNUYWJsZURlbGV0ZS52dWVcIjtcbmltcG9ydCB7IHVzZVJhd01hdGVyaWFsc1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvcmF3LW1hdGVyaWFsXCI7XG5cbmNvbnN0IG1hdGVyaWFsU3RvcmUgPSB1c2VSYXdNYXRlcmlhbHNTdG9yZSgpO1xuY29uc3QgcmF3TWF0ZXJpYWxzUm93ID0gY29tcHV0ZWQoKCkgPT4gbWF0ZXJpYWxTdG9yZS5yYXdNYXRlcmlhbHMpO1xuY29uc3QgbG9hZGluZyA9IHJlZih0cnVlKTtcbmNvbnN0IGZpbHRlciA9IHJlZihcIlwiKTtcbmNvbnN0IHNob3dOb0RhdGFNZXNzYWdlID0gcmVmKGZhbHNlKTtcbmNvbnN0IHBhZ2luYXRpb24gPSByZWYoe1xuICByb3dzUGVyUGFnZTogMCxcbn0pO1xuXG5jb25zdCBmaWx0ZXJlZFJvd3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmICghZmlsdGVyLnZhbHVlKSB7XG4gICAgcmV0dXJuIHJhd01hdGVyaWFsc1Jvdy52YWx1ZTtcbiAgfVxuICByZXR1cm4gcmF3TWF0ZXJpYWxzUm93LnZhbHVlLmZpbHRlcigocm93KSA9PlxuICAgIHJvdy5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyLnZhbHVlLnRvTG93ZXJDYXNlKCkpXG4gICk7XG59KTtcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgYXdhaXQgcmVsb2FkVGFibGVEYXRhKCk7XG59KTtcblxuY29uc3QgcmVsb2FkVGFibGVEYXRhID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvYWRpbmcudmFsdWUgPSB0cnVlO1xuICAgIGF3YWl0IG1hdGVyaWFsU3RvcmUuZmV0Y2hSYXdNYXRlcmlhbHMoKTtcbiAgICBpZiAoIXJhd01hdGVyaWFsc1Jvdy52YWx1ZS5sZW5ndGgpIHtcbiAgICAgIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gdHJ1ZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSB0cnVlO1xuICB9IGZpbmFsbHkge1xuICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgfVxufTtcblxud2F0Y2goZmlsdGVyLCBhc3luYyAobmV3RmlsdGVyKSA9PiB7XG4gIGxvYWRpbmcudmFsdWUgPSB0cnVlO1xuICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKSk7XG4gIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSBmaWx0ZXJlZFJvd3MudmFsdWUubGVuZ3RoID09PSAwO1xufSk7XG5cbmNvbnN0IHJhd01hdGVyaWFsc0NvbHVtbnMgPSBbXG4gIHtcbiAgICBuYW1lOiBcIm5hbWVcIixcbiAgICBsYWJlbDogXCJSYXcgTWF0ZXJpYWxzIE5hbWVcIixcbiAgICBhbGlnbjogXCJsZWZ0XCIsXG4gICAgZmllbGQ6IChyb3cpID0+IHJvdy5uYW1lLFxuICAgIGZvcm1hdDogKHZhbCkgPT4gYCR7dmFsfWAsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImNvZGVcIixcbiAgICBsYWJlbDogXCJDb2RlXCIsXG4gICAgYWxpZ246IFwibGVmdFwiLFxuICAgIGZpZWxkOiBcImNvZGVcIixcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiY2F0ZWdvcnlcIixcbiAgICBsYWJlbDogXCJDYXRlZ29yeVwiLFxuICAgIGFsaWduOiBcImxlZnRcIixcbiAgICBmaWVsZDogXCJjYXRlZ29yeVwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJ1bml0XCIsXG4gICAgbGFiZWw6IFwiVW5pdFwiLFxuICAgIGFsaWduOiBcImxlZnRcIixcbiAgICBmaWVsZDogXCJ1bml0XCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImFjdGlvblwiLFxuICAgIGxhYmVsOiBcIkFjdGlvblwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICB9LFxuXTtcblxuY29uc3QgZ2V0QmFkZ2VDYXRlZ29yeUNvbG9yID0gKGNhdGVnb3J5KSA9PiB7XG4gIHN3aXRjaCAoY2F0ZWdvcnkpIHtcbiAgICBjYXNlIFwiSW5ncmVkaWVudHNcIjpcbiAgICAgIHJldHVybiBcInRlYWxcIjtcbiAgICBjYXNlIFwiUGFja2FnaW5nIE1hdGVyaWFsc1wiOlxuICAgICAgcmV0dXJuIFwiYnJvd24tNlwiO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gXCJncmV5XCI7XG4gIH1cbn07XG5jb25zdCBnZXRCYWRnZVVuaXRDb2xvciA9ICh1bml0KSA9PiB7XG4gIHN3aXRjaCAodW5pdCkge1xuICAgIGNhc2UgXCJHcmFtc1wiOlxuICAgICAgcmV0dXJuIFwiaW5mb1wiO1xuICAgIGNhc2UgXCJQY3NcIjpcbiAgICAgIHJldHVybiBcImFjY2VudFwiO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gXCJncmV5XCI7XG4gIH1cbn07XG5jb25zdCBnZXRSYXdNYXRlcmlhbEJhZGdlQ29sb3IgPSAoYXZhaWxhYmxlU3RvY2tzKSA9PiB7XG4gIGNvbnN0IHN0b2NrVmFsdWUgPSBwYXJzZUludChhdmFpbGFibGVTdG9ja3MpO1xuICBpZiAoc3RvY2tWYWx1ZSA8PSAyMCkge1xuICAgIHJldHVybiBcImJnLXJlZFwiO1xuICB9IGVsc2UgaWYgKHN0b2NrVmFsdWUgPD0gNTApIHtcbiAgICByZXR1cm4gXCJiZy13YXJuaW5nXCI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFwiYmctcHJpbWFyeVwiO1xuICB9XG59O1xuPC9zY3JpcHQ+XG48c3R5bGUgc2NvcGVkPlxuLmVsZWdhbnQtY29udGFpbmVyIHtcbiAgYmFja2dyb3VuZDogI2Y3ZjhmYztcbiAgLyogcGFkZGluZzogMXJlbTsgKi9cbiAgYm9yZGVyLXJhZGl1czogOHB4O1xufVxuLmFic29sdXRlLWZ1bGwge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbn1cbi5zcGlubmVyLXdyYXBwZXIge1xuICBtaW4taGVpZ2h0OiA0MHZoOyAvKiBNaW5pbXVtIGhlaWdodCBvZiA1MCUgdmlld3BvcnQgaGVpZ2h0ICovXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLmRhdGEtZXJyb3Ige1xuICBtaW4taGVpZ2h0OiA0MHZoOyAvKiBNaW5pbXVtIGhlaWdodCBvZiA1MCUgdmlld3BvcnQgaGVpZ2h0ICovXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLnRhYmxlLWNvbnRhaW5lciB7XG4gIG1heC1oZWlnaHQ6IDQwMHB4OyAvKiBBZGp1c3QgYXMgbmVlZGVkICovXG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5xLXRhYmxlLWNvbnRhaW5lciB7XG4gIG92ZXJmbG93OiBoaWRkZW4gIWltcG9ydGFudDsgLyogVGFyZ2V0IHRoZSBjb250YWluZXIgZ2VuZXJhdGVkIGJ5IHEtdGFibGUgKi9cbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4R0EsVUFBTSxtQkFBbUIscUJBQW9CO0FBQzdDLFVBQU0sMkJBQTJCLElBQUksS0FBSztBQUMxQyxV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LGNBQVEsUUFBUTtBQUNoQix3QkFBa0IsUUFBUSxhQUFhLE1BQU0sV0FBVztBQUFBLElBQzFELENBQUM7QUFFRCxVQUFNLHNCQUFzQjtBQUFBLE1BQzFCO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxPQUFPLENBQUMsUUFBUSxJQUFJO0FBQUEsUUFDcEIsUUFBUSxDQUFDLFFBQVEsR0FBRztBQUFBLFFBQ3BCLFVBQVU7QUFBQSxNQUNYO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsVUFBVTtBQUFBLE1BQ1g7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsTUFDUjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxNQUNSO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLE1BQ1I7QUFBQSxJQUNIO0FBRUEsVUFBTSx3QkFBd0IsQ0FBQyxhQUFhO0FBQzFDLGNBQVE7QUFBQSxhQUNEO0FBQ0gsaUJBQU87QUFBQSxhQUNKO0FBQ0gsaUJBQU87QUFBQTtBQUVQLGlCQUFPO0FBQUE7QUFBQSxJQUViO0FBQ0EsVUFBTSxvQkFBb0IsQ0FBQyxTQUFTO0FBQ2xDLGNBQVE7QUFBQSxhQUNEO0FBQ0gsaUJBQU87QUFBQSxhQUNKO0FBQ0gsaUJBQU87QUFBQTtBQUVQLGlCQUFPO0FBQUE7QUFBQSxJQUViO0FBQ0EsVUFBTSwyQkFBMkIsQ0FBQyxvQkFBb0I7QUFDcEQsWUFBTSxhQUFhLFNBQVMsZUFBZTtBQUMzQyxVQUFJLGNBQWMsSUFBSTtBQUNwQixlQUFPO0FBQUEsTUFDWCxXQUFhLGNBQWMsSUFBSTtBQUMzQixlQUFPO0FBQUEsTUFDWCxPQUFTO0FBQ0wsZUFBTztBQUFBLE1BQ1I7QUFBQSxJQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
