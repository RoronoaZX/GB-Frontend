import { Q as QBadge } from "./QBadge.cf1023ef.js";
import { _ as _export_sfc, n as ref, t as reactive, o as openBlock, a4 as createElementBlock, J as createBaseVNode, a as createVNode, M as QBtn, w as withCtx, Q as QCard, I as QCardSection, af as withDirectives, a2 as QSeparator, K as QInput, aK as QCardActions, a3 as QDialog, a5 as Fragment, O as pushScopeId, R as popScopeId, a1 as createTextVNode, g as computed, z as onMounted, u as watch, L as QIcon, c as createBlock, a0 as toDisplayString } from "./index.9b9dbcba.js";
import { Q as QPage } from "./QPage.4b0a10d6.js";
import { Q as QSpace } from "./QSpace.5918deea.js";
import { Q as QSelect, a as QTd, b as QTable } from "./QTable.0bf3c36f.js";
import { C as ClosePopup } from "./ClosePopup.83fef54c.js";
import { u as useProductsStore } from "./product.c4d2d4c2.js";
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
var ProductCreate_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$3 = (n) => (pushScopeId("data-v-71d87a22"), n = n(), popScopeId(), n);
const _hoisted_1$4 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F956} Add Product", -1));
const _hoisted_2$4 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_3$2 = { class: "q-mt-md q-animated q-animate-bounce" };
const _sfc_main$4 = {
  __name: "ProductCreate",
  setup(__props) {
    const productsStore = useProductsStore();
    const category = ["Bread", "Selecta", "Softdrinks"];
    const dialog = ref(false);
    const openDialog = () => {
      dialog.value = true;
    };
    const addNewProductForm = reactive({
      name: "",
      category: null
    });
    const createProducts = async () => {
      try {
        await productsStore.createProducts({ ...addNewProductForm });
        dialog.value = false;
        console.log("Products Data", addNewProductForm);
        resetFormData();
      } catch (error) {
        console.log("Error saving product:", error);
      }
    };
    const resetFormData = () => {
      addNewProductForm.name = "";
      addNewProductForm.category = "";
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", null, [
          createVNode(QBtn, {
            class: "q-pa-sm btn-add",
            outline: "",
            dense: "",
            elevated: "",
            icon: "add_circle",
            label: "Add Product",
            onClick: openDialog,
            style: { "background-color": "#ef4444" },
            size: "md",
            color: "dark"
          })
        ]),
        createBaseVNode("div", null, [
          createVNode(QDialog, {
            modelValue: dialog.value,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => dialog.value = $event),
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
                          modelValue: addNewProductForm.name,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => addNewProductForm.name = $event),
                          outlined: "",
                          dense: "",
                          label: "Product Name",
                          rules: [
                            (val) => val && val.length > 0 || "Product name is reuired"
                          ]
                        }, null, 8, ["modelValue", "rules"])
                      ]),
                      createBaseVNode("div", _hoisted_3$2, [
                        createVNode(QSelect, {
                          modelValue: addNewProductForm.category,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => addNewProductForm.category = $event),
                          "input-debounce": "0",
                          options: category,
                          "stack-label": "",
                          outlined: "",
                          dense: "",
                          label: "Category",
                          rules: [
                            (val) => val && val.length > 0 || "Category is required"
                          ],
                          "hide-dropdown-icon": "",
                          behavior: "menu"
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
                        onClick: createProducts
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
        ])
      ], 64);
    };
  }
};
var ProductCreate = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-71d87a22"], ["__file", "ProductCreate.vue"]]);
var ProductEdit_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-67fc8a2d"), n = n(), popScopeId(), n);
const _hoisted_1$3 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F956} Edit Product", -1));
const _hoisted_2$3 = { class: "q-mt-lg q-animated q-animate-bounce" };
const _hoisted_3$1 = { class: "q-mt-md q-animated q-animate-bounce" };
const _sfc_main$3 = {
  __name: "ProductEdit",
  props: ["edit"],
  setup(__props) {
    const productStore = useProductsStore();
    const props = __props;
    const category = ["Bread", "Selecta", "Softdrinks"];
    const dialog = ref(false);
    const editProductForm = reactive({
      name: "",
      category: null
    });
    const openEditForm = () => {
      Object.assign(editProductForm, props.edit.row);
      dialog.value = true;
    };
    const saveEditedProduct = async () => {
      try {
        const updatedProducts = { ...props.edit.row, ...editProductForm };
        await productStore.updateProducts(props.edit.row.id, updatedProducts);
        dialog.value = false;
      } catch (error) {
        console.log("Failed to update ingredients:", error);
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
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => dialog.value = $event),
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
                      createVNode(QInput, {
                        modelValue: editProductForm.name,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => editProductForm.name = $event),
                        outlined: "",
                        dense: "",
                        label: "Product name",
                        rules: [(val) => val && val.length > 0]
                      }, null, 8, ["modelValue", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_3$1, [
                      createVNode(QSelect, {
                        modelValue: editProductForm.category,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => editProductForm.category = $event),
                        "input-debounce": "0",
                        options: category,
                        "stack-label": "",
                        outlined: "",
                        dense: "",
                        label: "Category",
                        rules: [(val) => val && val.length > 0],
                        "hide-dropdown-icon": ""
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
                      onClick: saveEditedProduct
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
var ProductEdit = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-67fc8a2d"], ["__file", "ProductEdit.vue"]]);
var ProductDelete_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-97b276fc"), n = n(), popScopeId(), n);
const _hoisted_1$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mb-xs" }, "Confirm Deletion", -1));
const _hoisted_2$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("p", { class: "text-body2 q-mb-none" }, " Are you sure you want to delete this item? This action cannot be undone. ", -1));
const _sfc_main$2 = {
  __name: "ProductDelete",
  props: ["delete"],
  setup(__props) {
    const productsStore = useProductsStore();
    const dialogVisible = ref(false);
    const deleteDialog = () => {
      dialogVisible.value = true;
    };
    const props = __props;
    const originalData = props.delete.row;
    const onDelete = async () => {
      try {
        await productsStore.deleteProducts(originalData.id);
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
var ProductDelete = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-97b276fc"], ["__file", "ProductDelete.vue"]]);
var ProductTable_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-06f344da"), n = n(), popScopeId(), n);
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
const _hoisted_6 = { class: "row justify-center q-gutter-x-md" };
const _sfc_main$1 = {
  __name: "ProductTable",
  setup(__props) {
    const pagination = ref({
      rowsPerPage: 0
    });
    const productsStore = useProductsStore();
    const filter = ref("");
    const productsRows = computed(() => productsStore.products);
    ref(true);
    const loading = ref(true);
    const showNoDataMessage = ref(false);
    const filteredRows = computed(() => {
      if (!filter.value) {
        return productsRows.value;
      }
      return productsRows.value.filter(
        (row) => row.name.toLowerCase().includes(filter.value.toLowerCase())
      );
    });
    onMounted(async () => {
      await reloadTableData();
    });
    const reloadTableData = async () => {
      try {
        loading.value = true;
        await productsStore.fetchProducts();
        if (!productsRows.value.length) {
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
    const productsColumn = [
      {
        name: "name",
        label: "Product Name",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`
      },
      {
        name: "category",
        align: "left",
        label: "Category",
        field: "category"
      },
      {
        name: "action",
        align: "center",
        label: "Action",
        field: "action"
      }
    ];
    const getBadgeCategoryColor = (category) => {
      switch (category) {
        case "Bread":
          return "brown";
        case "Selecta":
          return "red-6";
        case "Softdrinks":
          return "accent";
        default:
          return "grey";
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
            filter: filter.value,
            "virtual-scroll-sticky-size-start": 48,
            flat: "",
            style: { "height": "400px" },
            columns: productsColumn,
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
            "body-cell-action": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_6, [
                    createVNode(ProductEdit, { edit: props }, null, 8, ["edit"]),
                    createVNode(ProductDelete, { delete: props }, null, 8, ["delete"])
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
var ProductTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-06f344da"], ["__file", "ProductTable.vue"]]);
var ProductsPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = { class: "text-h6" };
const _hoisted_2 = { class: "q-gutter-x-sm" };
const _sfc_main = {
  __name: "ProductsPage",
  setup(__props) {
    ref("bread");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, {
        class: "elegant-container",
        flat: ""
      }, {
        default: withCtx(() => [
          createVNode(QCardSection, { class: "row justify-between" }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                createTextVNode(" \u{1F956} Products "),
                createBaseVNode("div", _hoisted_2, [
                  createVNode(QBadge, {
                    label: "Bread",
                    class: "text-white",
                    color: "brown-13"
                  }),
                  createVNode(QBadge, {
                    label: "Selecta",
                    class: "text-white",
                    color: "red-6"
                  }),
                  createVNode(QBadge, {
                    label: "Sofdrinks",
                    class: "text-white",
                    color: "accent"
                  })
                ])
              ]),
              createBaseVNode("div", null, [
                createVNode(ProductCreate)
              ])
            ]),
            _: 1
          }),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", null, [
                createVNode(ProductTable)
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
var ProductsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4141ea4c"], ["__file", "ProductsPage.vue"]]);
export { ProductsPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdHNQYWdlLmY1NmJlMzEzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9wcm9kdWN0cy9jb21wb25lbnRzL1Byb2R1Y3RDcmVhdGUudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvcHJvZHVjdHMvY29tcG9uZW50cy9Qcm9kdWN0RWRpdC52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9wcm9kdWN0cy9jb21wb25lbnRzL1Byb2R1Y3REZWxldGUudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvcHJvZHVjdHMvY29tcG9uZW50cy9Qcm9kdWN0VGFibGUudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvcHJvZHVjdHMvUHJvZHVjdHNQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPHEtYnRuXG4gICAgICBjbGFzcz1cInEtcGEtc20gYnRuLWFkZFwiXG4gICAgICBvdXRsaW5lXG4gICAgICBkZW5zZVxuICAgICAgZWxldmF0ZWRcbiAgICAgIGljb249XCJhZGRfY2lyY2xlXCJcbiAgICAgIGxhYmVsPVwiQWRkIFByb2R1Y3RcIlxuICAgICAgQGNsaWNrPVwib3BlbkRpYWxvZ1wiXG4gICAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNlZjQ0NDRcIlxuICAgICAgc2l6ZT1cIm1kXCJcbiAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgLz5cbiAgPC9kaXY+XG4gIDxkaXY+XG4gICAgPHEtZGlhbG9nXG4gICAgICB2LW1vZGVsPVwiZGlhbG9nXCJcbiAgICAgIHBlcnNpc3RlbnRcbiAgICAgIHRyYW5zaXRpb24tc2hvdz1cImp1bXAtdXBcIlxuICAgICAgdHJhbnNpdGlvbi1oaWRlPVwianVtcC1kb3duXCJcbiAgICA+XG4gICAgICA8cS1jYXJkXG4gICAgICAgIGNsYXNzPVwibXktY2FyZCBxLXBhLW5vbmVcIlxuICAgICAgICBzdHlsZT1cIlxuICAgICAgICAgIHdpZHRoOiA0MjBweDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgICAgICAgIGJveC1zaGFkb3c6IDAgMTJweCAyNHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgICAgICAgXCJcbiAgICAgID5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uXG4gICAgICAgICAgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtcHgtbWQgcS1weS1zbSBiZy1ncmFkaWVudCB0ZXh0LXdoaXRlXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg1IHEtbXItbWRcIj7wn6WWIEFkZCBQcm9kdWN0PC9kaXY+XG4gICAgICAgICAgPHEtc3BhY2UgLz5cbiAgICAgICAgICA8cS1idG4gaWNvbj1cImNsb3NlXCIgZmxhdCBkZW5zZSByb3VuZCB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgICAgPHEtc2VwYXJhdG9yIGNsYXNzPVwic2VwYXJhdG9yLWdyYWRpZW50XCIgLz5cblxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXB4LXhsIHEtcHQtbm9uZSBxLXBiLWxnXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbGcgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICB2LW1vZGVsPVwiYWRkTmV3UHJvZHVjdEZvcm0ubmFtZVwiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIGxhYmVsPVwiUHJvZHVjdCBOYW1lXCJcbiAgICAgICAgICAgICAgOnJ1bGVzPVwiW1xuICAgICAgICAgICAgICAgICh2YWwpID0+ICh2YWwgJiYgdmFsLmxlbmd0aCA+IDApIHx8ICdQcm9kdWN0IG5hbWUgaXMgcmV1aXJlZCcsXG4gICAgICAgICAgICAgIF1cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1tZCBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICAgIDwhLS0gPGRpdj5DYXRlZ29yeTwvZGl2PiAtLT5cbiAgICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgICB2LW1vZGVsPVwiYWRkTmV3UHJvZHVjdEZvcm0uY2F0ZWdvcnlcIlxuICAgICAgICAgICAgICBpbnB1dC1kZWJvdW5jZT1cIjBcIlxuICAgICAgICAgICAgICA6b3B0aW9ucz1cImNhdGVnb3J5XCJcbiAgICAgICAgICAgICAgc3RhY2stbGFiZWxcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgbGFiZWw9XCJDYXRlZ29yeVwiXG4gICAgICAgICAgICAgIDpydWxlcz1cIltcbiAgICAgICAgICAgICAgICAodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnQ2F0ZWdvcnkgaXMgcmVxdWlyZWQnLFxuICAgICAgICAgICAgICBdXCJcbiAgICAgICAgICAgICAgaGlkZS1kcm9wZG93bi1pY29uXG4gICAgICAgICAgICAgIGJlaGF2aW9yPVwibWVudVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8IS0tIDxxLXNlcGFyYXRvciAvPiAtLT5cbiAgICAgICAgPHEtY2FyZC1hY3Rpb25zIGNsYXNzPVwicm93IHEtcHgtbGcgcS1weS1zbSBxLXB0LW5vbmVcIiBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICAgICAgPHEtYnRuIGNsYXNzPVwiZ2xvc3N5XCIgY29sb3I9XCJncmV5LTlcIiBsYWJlbD1cIkRpc21pc3NcIiB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICBjbGFzcz1cImdsb3NzeVwiXG4gICAgICAgICAgICBjb2xvcj1cInRlYWxcIlxuICAgICAgICAgICAgbGFiZWw9XCJDcmVhdGVcIlxuICAgICAgICAgICAgQGNsaWNrPVwiY3JlYXRlUHJvZHVjdHNcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgICA8L3EtY2FyZD5cbiAgICA8L3EtZGlhbG9nPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYsIHJlYWN0aXZlIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgdXNlUHJvZHVjdHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3Byb2R1Y3RcIjtcblxuY29uc3QgcHJvZHVjdHNTdG9yZSA9IHVzZVByb2R1Y3RzU3RvcmUoKTtcbmNvbnN0IGNhdGVnb3J5ID0gW1wiQnJlYWRcIiwgXCJTZWxlY3RhXCIsIFwiU29mdGRyaW5rc1wiXTtcbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5jb25zdCBvcGVuRGlhbG9nID0gKCkgPT4ge1xuICBkaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcblxuY29uc3QgYWRkTmV3UHJvZHVjdEZvcm0gPSByZWFjdGl2ZSh7XG4gIG5hbWU6IFwiXCIsXG4gIGNhdGVnb3J5OiBudWxsLFxufSk7XG5cbmNvbnN0IGNyZWF0ZVByb2R1Y3RzID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGF3YWl0IHByb2R1Y3RzU3RvcmUuY3JlYXRlUHJvZHVjdHMoeyAuLi5hZGROZXdQcm9kdWN0Rm9ybSB9KTtcblxuICAgIGRpYWxvZy52YWx1ZSA9IGZhbHNlO1xuICAgIGNvbnNvbGUubG9nKFwiUHJvZHVjdHMgRGF0YVwiLCBhZGROZXdQcm9kdWN0Rm9ybSk7XG4gICAgcmVzZXRGb3JtRGF0YSgpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igc2F2aW5nIHByb2R1Y3Q6XCIsIGVycm9yKTtcbiAgICAvLyBOb3RpZnkuY3JlYXRlKHtcbiAgICAvLyAgIHR5cGU6IFwibmVnYXRpdmVcIixcbiAgICAvLyAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHNhdmUgcHJvZHVjdDpcIiArIGVycm9yLm1lc3NhZ2UsXG4gICAgLy8gfSk7XG4gIH1cbn07XG5cbmNvbnN0IHJlc2V0Rm9ybURhdGEgPSAoKSA9PiB7XG4gIGFkZE5ld1Byb2R1Y3RGb3JtLm5hbWUgPSBcIlwiO1xuICBhZGROZXdQcm9kdWN0Rm9ybS5jYXRlZ29yeSA9IFwiXCI7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4ubXktY2FyZCB7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGFuaW1hdGlvbjogZmFkZUluIDAuM3MgZWFzZTtcbn1cblxuLmJ0bi1hZGQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICMwMDAwMDAsICMwMDAwMDApO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5iZy1ncmFkaWVudCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMwMGJmYTUsICMwMDc5NmIpO1xufVxuXG4uc2VwYXJhdG9yLWdyYWRpZW50IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjMDBiZmE1LCAjMDA3OTZiKTtcbn1cblxuLnEtYnRuIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XG59XG5cbi5xLWJ0bjpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtM3B4KTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xufVxuXG4uYnRuLWNhbmNlbCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgI2VmNTM1MCwgI2U1MzkzNSk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmJ0bi1jcmVhdGUge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICM2NmJiNmEsICM0M2EwNDcpO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5xLWFuaW1hdGUtYm91bmNlIHtcbiAgYW5pbWF0aW9uOiBib3VuY2VJbiAwLjZzIGVhc2U7XG59XG5cbkBrZXlmcmFtZXMgZmFkZUluIHtcbiAgZnJvbSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTBweCk7XG4gIH1cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgYm91bmNlSW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIH1cbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWJ0blxuICAgIEBjbGljaz1cIm9wZW5FZGl0Rm9ybVwiXG4gICAgY29sb3I9XCJwb3NpdGl2ZVwiXG4gICAgaWNvbj1cImVkaXRcIlxuICAgIHNpemU9XCJzbVwiXG4gICAgZmxhdFxuICAgIHJvdW5kXG4gICAgZGVuc2VcbiAgPlxuICAgIDxxLXRvb2x0aXAgY2xhc3M9XCJiZy1wb3NpdGl2ZVwiIDpkZWxheT1cIjIwMFwiPkVkaXQ8L3EtdG9vbHRpcD5cbiAgPC9xLWJ0bj5cbiAgPHEtZGlhbG9nXG4gICAgdi1tb2RlbD1cImRpYWxvZ1wiXG4gICAgcGVyc2lzdGVudFxuICAgIHRyYW5zaXRpb24tc2hvdz1cImp1bXAtdXBcIlxuICAgIHRyYW5zaXRpb24taGlkZT1cImp1bXAtZG93blwiXG4gID5cbiAgICA8cS1jYXJkXG4gICAgICBjbGFzcz1cIm15LWNhcmQgcS1wYS1ub25lXCJcbiAgICAgIHN0eWxlPVwiXG4gICAgICAgIHdpZHRoOiA0MjBweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICAgICAgYm94LXNoYWRvdzogMCAxMnB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xuICAgICAgXCJcbiAgICA+XG4gICAgICA8cS1jYXJkLXNlY3Rpb25cbiAgICAgICAgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtcHgtbWQgcS1weS1zbSBiZy1ncmFkaWVudCB0ZXh0LXdoaXRlXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDUgcS1tci1tZFwiPvCfpZYgRWRpdCBQcm9kdWN0PC9kaXY+XG4gICAgICAgIDxxLXNwYWNlIC8+XG4gICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IGRlbnNlIHJvdW5kIHYtY2xvc2UtcG9wdXAgLz5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgIDxxLXNlcGFyYXRvciBjbGFzcz1cInNlcGFyYXRvci1ncmFkaWVudFwiIC8+XG5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcHgteGwgcS1wdC1ub25lIHEtcGItbGdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbGcgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgPCEtLSA8ZGl2Pk5hbWUgb2YgQnJlYWQ8L2Rpdj4gLS0+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJlZGl0UHJvZHVjdEZvcm0ubmFtZVwiXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIGxhYmVsPVwiUHJvZHVjdCBuYW1lXCJcbiAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiB2YWwgJiYgdmFsLmxlbmd0aCA+IDBdXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbWQgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgPCEtLSA8ZGl2PkNhdGVnb3J5PC9kaXY+IC0tPlxuICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgdi1tb2RlbD1cImVkaXRQcm9kdWN0Rm9ybS5jYXRlZ29yeVwiXG4gICAgICAgICAgICBpbnB1dC1kZWJvdW5jZT1cIjBcIlxuICAgICAgICAgICAgOm9wdGlvbnM9XCJjYXRlZ29yeVwiXG4gICAgICAgICAgICBzdGFjay1sYWJlbFxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBsYWJlbD1cIkNhdGVnb3J5XCJcbiAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiB2YWwgJiYgdmFsLmxlbmd0aCA+IDBdXCJcbiAgICAgICAgICAgIGhpZGUtZHJvcGRvd24taWNvblxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDwhLS0gPHEtc2VwYXJhdG9yIC8+IC0tPlxuICAgICAgPHEtY2FyZC1hY3Rpb25zIGNsYXNzPVwicm93IHEtcHgtbGcgcS1weS1zbSBxLXB0LW5vbmVcIiBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICAgIDxxLWJ0biBjbGFzcz1cImdsb3NzeVwiIGNvbG9yPVwiZ3JleS05XCIgbGFiZWw9XCJEaXNtaXNzXCIgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBjbGFzcz1cImdsb3NzeVwiXG4gICAgICAgICAgY29sb3I9XCJ0ZWFsXCJcbiAgICAgICAgICBsYWJlbD1cIlNhdmVcIlxuICAgICAgICAgIEBjbGljaz1cInNhdmVFZGl0ZWRQcm9kdWN0XCJcbiAgICAgICAgLz5cbiAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgdXNlUHJvZHVjdHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3Byb2R1Y3RcIjtcbmltcG9ydCB7IHJlZiwgcmVhY3RpdmUgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IHByb2R1Y3RTdG9yZSA9IHVzZVByb2R1Y3RzU3RvcmUoKTtcbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHMoW1wiZWRpdFwiXSk7XG5jb25zdCBjYXRlZ29yeSA9IFtcIkJyZWFkXCIsIFwiU2VsZWN0YVwiLCBcIlNvZnRkcmlua3NcIl07XG5jb25zdCBkaWFsb2cgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBlZGl0UHJvZHVjdEZvcm0gPSByZWFjdGl2ZSh7XG4gIG5hbWU6IFwiXCIsXG4gIGNhdGVnb3J5OiBudWxsLFxufSk7XG5cbmNvbnN0IG9wZW5FZGl0Rm9ybSA9ICgpID0+IHtcbiAgT2JqZWN0LmFzc2lnbihlZGl0UHJvZHVjdEZvcm0sIHByb3BzLmVkaXQucm93KTtcbiAgZGlhbG9nLnZhbHVlID0gdHJ1ZTtcbn07XG5cbmNvbnN0IHNhdmVFZGl0ZWRQcm9kdWN0ID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHVwZGF0ZWRQcm9kdWN0cyA9IHsgLi4ucHJvcHMuZWRpdC5yb3csIC4uLmVkaXRQcm9kdWN0Rm9ybSB9O1xuICAgIGF3YWl0IHByb2R1Y3RTdG9yZS51cGRhdGVQcm9kdWN0cyhwcm9wcy5lZGl0LnJvdy5pZCwgdXBkYXRlZFByb2R1Y3RzKTtcbiAgICBkaWFsb2cudmFsdWUgPSBmYWxzZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byB1cGRhdGUgaW5ncmVkaWVudHM6XCIsIGVycm9yKTtcbiAgfVxufTtcblxuLy8gY29uc3Qgc2F2ZUVkaXRlZFByb2R1Y3QgPSBhc3luYyAoKSA9PiB7XG4vLyAgIHRyeSB7XG4vLyAgICAgY29uc3Qgb3JpZ2luYWxQcm9kdWN0ID0gcHJvcHMuZWRpdC5yb3c7XG4vLyAgICAgY29uc3QgdXBkYXRlZFByb2R1Y3QgPSB7XG4vLyAgICAgICBpZDogb3JpZ2luYWxQcm9kdWN0LmlkLFxuLy8gICAgICAgbmFtZTogZWRpdFByb2R1Y3RGb3JtLm5hbWUsXG4vLyAgICAgICBjYXRlZ29yeTogZWRpdFByb2R1Y3RGb3JtLmNhdGVnb3J5LFxuLy8gICAgIH07XG4vLyAgICAgY29uc3QgY2hhbmdlZEZpZWxkcyA9IFtdO1xuLy8gICAgIGlmIChvcmlnaW5hbFByb2R1Y3QubmFtZSAhPT0gdXBkYXRlZFByb2R1Y3QubmFtZSkge1xuLy8gICAgICAgY2hhbmdlZEZpZWxkcy5wdXNoKFxuLy8gICAgICAgICBgTmFtZTogJHtvcmlnaW5hbFByb2R1Y3QubmFtZX0gdG8gJHt1cGRhdGVkUHJvZHVjdC5uYW1lfWBcbi8vICAgICAgICk7XG4vLyAgICAgfVxuLy8gICAgIGlmIChvcmlnaW5hbFByb2R1Y3QuY2F0ZWdvcnkgIT09IHVwZGF0ZWRQcm9kdWN0LmNhdGVnb3J5KSB7XG4vLyAgICAgICBjaGFuZ2VkRmllbGRzLnB1c2goXG4vLyAgICAgICAgIGBDYXRlZ29yeTogJHtvcmlnaW5hbFByb2R1Y3QuY2F0ZWdvcnl9IHRvICR7dXBkYXRlZFByb2R1Y3QuY2F0ZWdvcnl9YFxuLy8gICAgICAgKTtcbi8vICAgICB9XG4vLyAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBwcm9kdWN0U3RvcmUudXBkYXRlKFxuLy8gICAgICAgb3JpZ2luYWxQcm9kdWN0LmlkLFxuLy8gICAgICAgdXBkYXRlZFByb2R1Y3Rcbi8vICAgICApO1xuLy8gICAgIE5vdGlmeS5jcmVhdGUoe1xuLy8gICAgICAgdHlwZTogXCJ3YXJuaW5nXCIsXG4vLyAgICAgICBpY29uOiBcImNoZWNrXCIsXG4vLyAgICAgICBtZXNzYWdlOiBgJHtvcmlnaW5hbFByb2R1Y3QubmFtZX0gJHtvcmlnaW5hbFByb2R1Y3QuY2F0ZWdvcnl9IHN1Y2Nlc3NmdWxseSB1cGRhdGVkIWAsXG4vLyAgICAgICBwb3NpdGlvbjogXCJ0b3BcIixcbi8vICAgICB9KTtcbi8vICAgICBkaWFsb2cudmFsdWUgPSBmYWxzZTtcbi8vICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDAwKSB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhcIlByb2R1Y3QgdXBkYXRlZCBzdWNjZXNzZnVsbHk6XCIsIHJlc3BvbnNlLmRhdGEpO1xuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byB1cGRhdGUgcHJvZHVjdDpcIiwgcmVzcG9uc2UpO1xuLy8gICAgIH1cbi8vICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4vLyB9O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4ubXktY2FyZCB7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGFuaW1hdGlvbjogZmFkZUluIDAuM3MgZWFzZTtcbn1cblxuLmJ0bi1hZGQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICMwMDAwMDAsICMwMDAwMDApO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5iZy1ncmFkaWVudCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMwMGJmYTUsICMwMDc5NmIpO1xufVxuXG4uc2VwYXJhdG9yLWdyYWRpZW50IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjMDBiZmE1LCAjMDA3OTZiKTtcbn1cblxuLnEtYnRuIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XG59XG5cbi5xLWJ0bjpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtM3B4KTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xufVxuXG4uYnRuLWNhbmNlbCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgI2VmNTM1MCwgI2U1MzkzNSk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmJ0bi1jcmVhdGUge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICM2NmJiNmEsICM0M2EwNDcpO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5xLWFuaW1hdGUtYm91bmNlIHtcbiAgYW5pbWF0aW9uOiBib3VuY2VJbiAwLjZzIGVhc2U7XG59XG5cbkBrZXlmcmFtZXMgZmFkZUluIHtcbiAgZnJvbSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTBweCk7XG4gIH1cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgYm91bmNlSW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIH1cbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWJ0blxuICAgIEBjbGljaz1cImRlbGV0ZURpYWxvZ1wiXG4gICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgaWNvbj1cImRlbGV0ZVwiXG4gICAgc2l6ZT1cInNtXCJcbiAgICBmbGF0XG4gICAgcm91bmRcbiAgICBkZW5zZVxuICA+XG4gICAgPHEtdG9vbHRpcCBjbGFzcz1cImJnLW5lZ2F0aXZlXCIgOmRlbGF5PVwiMjAwXCI+RGVsZXRlPC9xLXRvb2x0aXA+XG4gIDwvcS1idG4+XG4gIDxxLWRpYWxvZyB2LW1vZGVsPVwiZGlhbG9nVmlzaWJsZVwiPlxuICAgIDxxLWNhcmQgY2xhc3M9XCJxLXBhLW1kIHEtcm91bmRlZCBxLWVsZXZhdGUtMiBiZy13aGl0ZSB0ZXh0LWdyZXktOVwiPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1wdC1ub25lIHEtcGItc21cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDUgcS1tYi14c1wiPkNvbmZpcm0gRGVsZXRpb248L2Rpdj5cbiAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LWJvZHkyIHEtbWItbm9uZVwiPlxuICAgICAgICAgIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBpdGVtPyBUaGlzIGFjdGlvbiBjYW5ub3QgYmVcbiAgICAgICAgICB1bmRvbmUuXG4gICAgICAgIDwvcD5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgIDxxLXNlcGFyYXRvciBjbGFzcz1cInEtbWItbWRcIiAvPlxuXG4gICAgICA8cS1jYXJkLWFjdGlvbnMgYWxpZ249XCJyaWdodFwiIGNsYXNzPVwicS1wdC1ub25lXCI+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGZsYXRcbiAgICAgICAgICBkZW5zZVxuICAgICAgICAgIGxhYmVsPVwiQ2FuY2VsXCJcbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgIHYtY2xvc2UtcG9wdXBcbiAgICAgICAgICBjbGFzcz1cInEtbXItc21cIlxuICAgICAgICAvPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBkZW5zZVxuICAgICAgICAgIGxhYmVsPVwiRGVsZXRlXCJcbiAgICAgICAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICAgICAgICBAY2xpY2s9XCJvbkRlbGV0ZVwiXG4gICAgICAgICAgY2xhc3M9XCJxLWJ0bi1yb3VuZGVkIHEtcHgtbGdcIlxuICAgICAgICAvPlxuICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyB1c2VQcm9kdWN0c1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvcHJvZHVjdFwiO1xuXG5jb25zdCBwcm9kdWN0c1N0b3JlID0gdXNlUHJvZHVjdHNTdG9yZSgpO1xuY29uc3QgZGlhbG9nVmlzaWJsZSA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IGRlbGV0ZURpYWxvZyA9ICgpID0+IHtcbiAgZGlhbG9nVmlzaWJsZS52YWx1ZSA9IHRydWU7XG59O1xuXG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzKFtcImRlbGV0ZVwiXSk7XG5jb25zdCBvcmlnaW5hbERhdGEgPSBwcm9wcy5kZWxldGUucm93O1xuY29uc3Qgb25EZWxldGUgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgYXdhaXQgcHJvZHVjdHNTdG9yZS5kZWxldGVQcm9kdWN0cyhvcmlnaW5hbERhdGEuaWQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gIH1cblxuICBkaWFsb2dWaXNpYmxlLnZhbHVlID0gZmFsc2U7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4ucS1jYXJkIHtcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgYm94LXNoYWRvdzogMCA4cHggMjRweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi5xLWNhcmQtc2VjdGlvbiB7XG4gIHBhZGRpbmc6IDI0cHggMzJweDtcbn1cblxuLnEtYnRuIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMgZWFzZSwgYm94LXNoYWRvdyAwLjJzIGVhc2U7XG59XG5cbi5xLWJ0bi1yb3VuZGVkIHtcbiAgYm9yZGVyLXJhZGl1czogNTBweDtcbn1cblxuLnEtYnRuOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG5cbi5xLWJ0bjphY3RpdmUge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG59XG5cbi50ZXh0LWg1IHtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLnRleHQtYm9keTIge1xuICBjb2xvcjogIzY2Njtcbn1cblxuLnEtZWxldmF0ZS0yIHtcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuLmJnLXdoaXRlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbn1cblxuLnRleHQtZ3JleS05IHtcbiAgY29sb3I6ICMzMzM7XG59XG5cbi5xLXNlcGFyYXRvciB7XG4gIGJvcmRlci1jb2xvcjogI2VlZTtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgYWxpZ249XCJyaWdodFwiPlxuICAgIDxxLWlucHV0XG4gICAgICB2LW1vZGVsPVwiZmlsdGVyXCJcbiAgICAgIGNsYXNzPVwicS1wYi1sZyBxLXBsLW1kXCJcbiAgICAgIG91dGxpbmVkXG4gICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgICBmbGF0XG4gICAgICByb3VuZGVkXG4gICAgICBkZW5zZVxuICAgICAgZGVib3VuY2U9XCIxMDBcIlxuICAgICAgc3R5bGU9XCJ3aWR0aDogNTAwcHg7IG1heC13aWR0aDogMTUwMHB4OyBtaW4td2lkdGg6IDEwMHB4XCJcbiAgICA+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgPHEtaWNvbiBuYW1lPVwic2VhcmNoXCIgLz5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9xLWlucHV0PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInNwaW5uZXItd3JhcHBlclwiIHYtaWY9XCJsb2FkaW5nXCI+XG4gICAgPHEtc3Bpbm5lci1kb3RzIHNpemU9XCI1MHB4XCIgY29sb3I9XCJwcmltYXJ5XCIgLz5cbiAgPC9kaXY+XG4gIDxkaXYgdi1lbHNlPlxuICAgIDxkaXYgdi1pZj1cImZpbHRlcmVkUm93cy5sZW5ndGggPT09IDBcIiBjbGFzcz1cImRhdGEtZXJyb3JcIj5cbiAgICAgIDxxLWljb24gbmFtZT1cIndhcm5pbmdcIiBjb2xvcj1cIndhcm5pbmdcIiBzaXplPVwiNGVtXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJxLW1sLXNtIHRleHQtaDZcIj5ObyBkYXRhIGF2YWlsYWJsZTwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxxLXRhYmxlXG4gICAgICB2LWVsc2VcbiAgICAgIGNsYXNzPVwidGFibGUtY29udGFpbmVyIGVsZWdhbnQtY29udGFpbmVyIHN0aWNreS1oZWFkZXJcIlxuICAgICAgOmZpbHRlcj1cImZpbHRlclwiXG4gICAgICA6dmlydHVhbC1zY3JvbGwtc3RpY2t5LXNpemUtc3RhcnQ9XCI0OFwiXG4gICAgICBmbGF0XG4gICAgICBzdHlsZT1cImhlaWdodDogNDAwcHhcIlxuICAgICAgOmNvbHVtbnM9XCJwcm9kdWN0c0NvbHVtblwiXG4gICAgICA6cm93cz1cImZpbHRlcmVkUm93c1wiXG4gICAgICByb3cta2V5PVwibmFtZVwiXG4gICAgICB2aXJ0dWFsLXNjcm9sbFxuICAgICAgdi1tb2RlbDpwYWdpbmF0aW9uPVwicGFnaW5hdGlvblwiXG4gICAgICA6cm93cy1wZXItcGFnZS1vcHRpb25zPVwiWzBdXCJcbiAgICAgIGhpZGUtYm90dG9tXG4gICAgPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtY2F0ZWdvcnk9XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCBrZXk9XCJuYW1lXCIgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8cS1iYWRnZSA6Y29sb3I9XCJnZXRCYWRnZUNhdGVnb3J5Q29sb3IocHJvcHMucm93LmNhdGVnb3J5KVwiPlxuICAgICAgICAgICAge3sgcHJvcHMucm93LmNhdGVnb3J5IH19XG4gICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtYWN0aW9uPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktY2VudGVyIHEtZ3V0dGVyLXgtbWRcIj5cbiAgICAgICAgICAgIDxQcm9kdWN0RWRpdCA6ZWRpdD1cInByb3BzXCIgLz5cbiAgICAgICAgICAgIDxQcm9kdWN0RGVsZXRlIDpkZWxldGU9XCJwcm9wc1wiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9xLXRhYmxlPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgUHJvZHVjdEVkaXQgZnJvbSBcIi4vUHJvZHVjdEVkaXQudnVlXCI7XG5pbXBvcnQgUHJvZHVjdERlbGV0ZSBmcm9tIFwiLi9Qcm9kdWN0RGVsZXRlLnZ1ZVwiO1xuaW1wb3J0IHsgcmVmLCB3YXRjaCwgb25Nb3VudGVkLCBjb21wdXRlZCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IGRhdGUgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyB1c2VQcm9kdWN0c1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvcHJvZHVjdFwiO1xuXG5jb25zdCBwYWdpbmF0aW9uID0gcmVmKHtcbiAgcm93c1BlclBhZ2U6IDAsXG59KTtcbmNvbnN0IHByb2R1Y3RzU3RvcmUgPSB1c2VQcm9kdWN0c1N0b3JlKCk7XG5jb25zdCBmaWx0ZXIgPSByZWYoXCJcIik7XG5jb25zdCBwcm9kdWN0c1Jvd3MgPSBjb21wdXRlZCgoKSA9PiBwcm9kdWN0c1N0b3JlLnByb2R1Y3RzKTtcbmNvbnN0IGlzTG9hZGluZyA9IHJlZih0cnVlKTtcbmNvbnN0IGxvYWRpbmcgPSByZWYodHJ1ZSk7XG5jb25zdCBzaG93Tm9EYXRhTWVzc2FnZSA9IHJlZihmYWxzZSk7XG5cbi8vIGNvbnN0IHNlYXJjaFF1ZXJ5ID0gcmVmKFwiXCIpO1xuXG4vLyBjb25zdCBzZWFyY2ggPSBhc3luYyAoKSA9PiB7XG4vLyAgIGxvYWRpbmcudmFsdWUgPSB0cnVlO1xuLy8gICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IGZhbHNlO1xuXG4vLyAgIHRyeSB7XG4vLyAgICAgYXdhaXQgcHJvZHVjdHNTdG9yZS5zZWFyY2hQcm9kdWN0cyhzZWFyY2hRdWVyeS52YWx1ZSk7XG4vLyAgICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSBwcm9kdWN0c1Jvd3MudmFsdWUubGVuZ3RoID09PSAwO1xuLy8gICB9IGNhdGNoIChlcnJvcikge1xuLy8gICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBwcm9kdWN0czpcIiwgZXJyb3IpO1xuLy8gICB9IGZpbmFsbHkge1xuLy8gICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbi8vICAgfVxuLy8gfTtcblxuLy8gd2F0Y2goc2VhcmNoUXVlcnksIChuZXdWYWx1ZSkgPT4ge1xuLy8gICBpZiAobmV3VmFsdWUudHJpbSgpICE9PSBcIlwiKSB7XG4vLyAgICAgc2VhcmNoKCk7XG4vLyAgIH0gZWxzZSB7XG4vLyAgICAgcHJvZHVjdHNSb3dzLnZhbHVlID0gcHJvZHVjdHNTdG9yZS5mZXRjaFByb2R1Y3RzKCk7XG4vLyAgICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSBwcm9kdWN0c1Jvd3MudmFsdWUubGVuZ3RoID09PSAwO1xuLy8gICB9XG4vLyB9KTtcblxuLy8gb25Nb3VudGVkKGFzeW5jICgpID0+IHtcbi8vICAgdHJ5IHtcbi8vICAgICBwcm9kdWN0c1Jvd3MudmFsdWUgPSBhd2FpdCBwcm9kdWN0c1N0b3JlLmZldGNoUHJvZHVjdHMoKTtcbi8vICAgICBpZiAoIXByb2R1Y3RzUm93cy52YWx1ZS5sZW5ndGgpIHtcbi8vICAgICAgIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gdHJ1ZTtcbi8vICAgICB9XG4vLyAgIH0gY2F0Y2ggKGVycm9yKSB7XG4vLyAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHByb2R1Y3RzOlwiLCBlcnJvcik7XG4vLyAgICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSB0cnVlO1xuLy8gICB9IGZpbmFsbHkge1xuLy8gICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbi8vICAgfVxuLy8gfSk7XG5jb25zdCBmaWx0ZXJlZFJvd3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmICghZmlsdGVyLnZhbHVlKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RzUm93cy52YWx1ZTtcbiAgfVxuICByZXR1cm4gcHJvZHVjdHNSb3dzLnZhbHVlLmZpbHRlcigocm93KSA9PlxuICAgIHJvdy5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyLnZhbHVlLnRvTG93ZXJDYXNlKCkpXG4gICk7XG59KTtcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgYXdhaXQgcmVsb2FkVGFibGVEYXRhKCk7XG59KTtcblxuY29uc3QgcmVsb2FkVGFibGVEYXRhID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGxvYWRpbmcudmFsdWUgPSB0cnVlO1xuICAgIGF3YWl0IHByb2R1Y3RzU3RvcmUuZmV0Y2hQcm9kdWN0cygpO1xuICAgIGlmICghcHJvZHVjdHNSb3dzLnZhbHVlLmxlbmd0aCkge1xuICAgICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSB0cnVlO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IHRydWU7XG4gIH0gZmluYWxseSB7XG4gICAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICB9XG59O1xuXG53YXRjaChmaWx0ZXIsIGFzeW5jIChuZXdGaWx0ZXIpID0+IHtcbiAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApKTtcbiAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IGZpbHRlcmVkUm93cy52YWx1ZS5sZW5ndGggPT09IDA7XG59KTtcblxuY29uc3QgZm9ybWF0RGF0ZSA9IChkYXRlU3RyaW5nKSA9PiB7XG4gIHJldHVybiBkYXRlLmZvcm1hdERhdGUoZGF0ZVN0cmluZywgXCJNTU1NIEQsIFlZWVlcIik7XG59O1xuXG5jb25zdCBwcm9kdWN0c0NvbHVtbiA9IFtcbiAge1xuICAgIG5hbWU6IFwibmFtZVwiLFxuICAgIGxhYmVsOiBcIlByb2R1Y3QgTmFtZVwiLFxuICAgIGFsaWduOiBcImxlZnRcIixcbiAgICBmaWVsZDogKHJvdykgPT4gcm93Lm5hbWUsXG4gICAgZm9ybWF0OiAodmFsKSA9PiBgJHt2YWx9YCxcbiAgfSxcblxuICB7XG4gICAgbmFtZTogXCJjYXRlZ29yeVwiLFxuICAgIGFsaWduOiBcImxlZnRcIixcbiAgICBsYWJlbDogXCJDYXRlZ29yeVwiLFxuICAgIGZpZWxkOiBcImNhdGVnb3J5XCIsXG4gIH0sXG4gIC8vIHtcbiAgLy8gICBuYW1lOiBcImNyZWF0ZWRBdFwiLFxuICAvLyAgIGFsaWduOiBcImNlbnRlclwiLFxuICAvLyAgIGxhYmVsOiBcIkNyZWF0ZWQgQXRcIixcbiAgLy8gICBmaWVsZDogXCJjcmVhdGVkQXRcIixcbiAgLy8gICBmb3JtYXQ6ICh2YWwpID0+IGZvcm1hdERhdGUodmFsKSxcbiAgLy8gfSxcbiAge1xuICAgIG5hbWU6IFwiYWN0aW9uXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgbGFiZWw6IFwiQWN0aW9uXCIsXG4gICAgZmllbGQ6IFwiYWN0aW9uXCIsXG4gIH0sXG5dO1xuXG5jb25zdCBnZXRCYWRnZUNhdGVnb3J5Q29sb3IgPSAoY2F0ZWdvcnkpID0+IHtcbiAgc3dpdGNoIChjYXRlZ29yeSkge1xuICAgIGNhc2UgXCJCcmVhZFwiOlxuICAgICAgcmV0dXJuIFwiYnJvd25cIjtcbiAgICBjYXNlIFwiU2VsZWN0YVwiOlxuICAgICAgcmV0dXJuIFwicmVkLTZcIjtcbiAgICBjYXNlIFwiU29mdGRyaW5rc1wiOlxuICAgICAgcmV0dXJuIFwiYWNjZW50XCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcImdyZXlcIjtcbiAgfVxufTtcbjwvc2NyaXB0PlxuPHN0eWxlIHNjb3BlZD5cbi5lbGVnYW50LWNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQ6ICNmN2Y4ZmM7XG4gIHBhZGRpbmc6IDJyZW07XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbn1cbi5hYnNvbHV0ZS1mdWxsIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG59XG4uc3Bpbm5lci13cmFwcGVyIHtcbiAgbWluLWhlaWdodDogNDB2aDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uZGF0YS1lcnJvciB7XG4gIG1pbi1oZWlnaHQ6IDQwdmg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLm15LXN0aWNreS1keW5hbWljIHtcbiAgaGVpZ2h0OiA0MTBweDtcbn1cblxuLm15LXN0aWNreS1keW5hbWljIC5xLXRhYmxlX190b3AsXG4ubXktc3RpY2t5LWR5bmFtaWMgLnEtdGFibGVfX2JvdHRvbSxcbi5teS1zdGlja3ktZHluYW1pYyB0aGVhZCB0cjpmaXJzdC1jaGlsZCB0aCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG59XG5cbi5teS1zdGlja3ktZHluYW1pYyB0aGVhZCB0ciB0aCB7XG4gIHBvc2l0aW9uOiBzdGlja3k7XG4gIHotaW5kZXg6IDE7XG59XG5cbi5teS1zdGlja3ktZHluYW1pYyB0aGVhZCB0cjpsYXN0LWNoaWxkIHRoIHtcbiAgdG9wOiA0OHB4O1xufVxuXG4ubXktc3RpY2t5LWR5bmFtaWMgdGhlYWQgdHI6Zmlyc3QtY2hpbGQgdGgge1xuICB0b3A6IDA7XG59XG5cbi5teS1zdGlja3ktZHluYW1pYyB0Ym9keSB7XG4gIHNjcm9sbC1tYXJnaW4tdG9wOiA0OHB4O1xufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBjbGFzcz1cImVsZWdhbnQtY29udGFpbmVyXCIgZmxhdD5cbiAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPlxuICAgICAgICA8IS0tIDxxLWljb24gbmFtZT1cImZhLXNvbGlkIGZhLWNha2UtY2FuZGxlc1wiIC8+IC0tPlxuICAgICAgICDwn6WWIFByb2R1Y3RzXG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci14LXNtXCI+XG4gICAgICAgICAgPHEtYmFkZ2UgbGFiZWw9XCJCcmVhZFwiIGNsYXNzPVwidGV4dC13aGl0ZVwiIGNvbG9yPVwiYnJvd24tMTNcIiAvPlxuICAgICAgICAgIDxxLWJhZGdlIGxhYmVsPVwiU2VsZWN0YVwiIGNsYXNzPVwidGV4dC13aGl0ZVwiIGNvbG9yPVwicmVkLTZcIiAvPlxuICAgICAgICAgIDxxLWJhZGdlIGxhYmVsPVwiU29mZHJpbmtzXCIgY2xhc3M9XCJ0ZXh0LXdoaXRlXCIgY29sb3I9XCJhY2NlbnRcIiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgPFByb2R1Y3RDcmVhdGUgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPCEtLSA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLWd1dHRlci1tZFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWVuZCBxLWd1dHRlci1tZFwiPlxuICAgICAgICA8UHJvZHVjdFNlYXJjaCAvPlxuXG4gICAgICA8L2Rpdj5cbiAgICA8L3EtY2FyZC1zZWN0aW9uPiAtLT5cbiAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICA8ZGl2PlxuICAgICAgICA8UHJvZHVjdFRhYmxlIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICA8L3EtcGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG4vLyBpbXBvcnQgQnJlYWRQYW5lbFNlY3Rpb24gZnJvbSBcIi4vcHJvZHVjdHNfYnJlYWQvQnJlYWRQYW5lbFNlY3Rpb24udnVlXCI7XG4vLyBpbXBvcnQgU2VsZWN0YVBhZ2UgZnJvbSBcIi4vc2VsZWN0YS9TZWxlY3RhUGFnZS52dWVcIjtcbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCBQcm9kdWN0Q3JlYXRlIGZyb20gXCIuL2NvbXBvbmVudHMvUHJvZHVjdENyZWF0ZS52dWVcIjtcbmltcG9ydCBQcm9kdWN0VGFibGUgZnJvbSBcIi4vY29tcG9uZW50cy9Qcm9kdWN0VGFibGUudnVlXCI7XG5pbXBvcnQgUHJvZHVjdFNlYXJjaCBmcm9tIFwiLi9jb21wb25lbnRzL1Byb2R1Y3RTZWFyY2gudnVlXCI7XG5cbmNvbnN0IHByb2R1Y3RzVGFiID0gcmVmKFwiYnJlYWRcIik7XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuLmVsZWdhbnQtY29udGFpbmVyIHtcbiAgYmFja2dyb3VuZDogI2Y3ZjhmYztcbiAgcGFkZGluZzogMnJlbTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBGQSxVQUFNLGdCQUFnQixpQkFBZ0I7QUFDdEMsVUFBTSxXQUFXLENBQUMsU0FBUyxXQUFXLFlBQVk7QUFDbEQsVUFBTSxTQUFTLElBQUksS0FBSztBQUN4QixVQUFNLGFBQWEsTUFBTTtBQUN2QixhQUFPLFFBQVE7QUFBQSxJQUNqQjtBQUVBLFVBQU0sb0JBQW9CLFNBQVM7QUFBQSxN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
