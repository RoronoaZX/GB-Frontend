import { Q as QBadge } from "./QBadge.49245359.js";
import { _ as _export_sfc, n as ref, t as reactive, o as openBlock, a4 as createElementBlock, J as createBaseVNode, a as createVNode, M as QBtn, w as withCtx, Q as QCard, I as QCardSection, af as withDirectives, a2 as QSeparator, K as QInput, aK as QCardActions, a3 as QDialog, a5 as Fragment, S as pushScopeId, T as popScopeId, O as createTextVNode, g as computed, z as onMounted, u as watch, L as QIcon, c as createBlock, R as toDisplayString } from "./index.c8e2405b.js";
import { Q as QPage } from "./QPage.e43c6521.js";
import { Q as QSpace } from "./QSpace.08c50700.js";
import { Q as QSelect } from "./QSelect.0985e28e.js";
import { C as ClosePopup } from "./ClosePopup.649d85d8.js";
import { u as useProductsStore } from "./product.d01d241e.js";
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
var ProductCreate_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$3 = (n) => (pushScopeId("data-v-49a67146"), n = n(), popScopeId(), n);
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
                          class: "text-capitalize",
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
var ProductCreate = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-49a67146"], ["__file", "ProductCreate.vue"]]);
var ProductEdit_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-f2981e94"), n = n(), popScopeId(), n);
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
                        class: "text-capitalize",
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
var ProductEdit = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-f2981e94"], ["__file", "ProductEdit.vue"]]);
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
const _withScopeId = (n) => (pushScopeId("data-v-714d05a6"), n = n(), popScopeId(), n);
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
const _hoisted_5 = { class: "row justify-center q-gutter-x-md" };
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
    const capitalizeFirstLetter = (location) => {
      if (!location)
        return "";
      return location.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    };
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
            "body-cell-action": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_5, [
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
var ProductTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-714d05a6"], ["__file", "ProductTable.vue"]]);
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
var ProductsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3dd0d4ab"], ["__file", "ProductsPage.vue"]]);
export { ProductsPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdHNQYWdlLmMxN2EyMDUwLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9wcm9kdWN0cy9jb21wb25lbnRzL1Byb2R1Y3RDcmVhdGUudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvcHJvZHVjdHMvY29tcG9uZW50cy9Qcm9kdWN0RWRpdC52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9wcm9kdWN0cy9jb21wb25lbnRzL1Byb2R1Y3REZWxldGUudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvcHJvZHVjdHMvY29tcG9uZW50cy9Qcm9kdWN0VGFibGUudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvcHJvZHVjdHMvUHJvZHVjdHNQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPHEtYnRuXG4gICAgICBjbGFzcz1cInEtcGEtc20gYnRuLWFkZFwiXG4gICAgICBvdXRsaW5lXG4gICAgICBkZW5zZVxuICAgICAgZWxldmF0ZWRcbiAgICAgIGljb249XCJhZGRfY2lyY2xlXCJcbiAgICAgIGxhYmVsPVwiQWRkIFByb2R1Y3RcIlxuICAgICAgQGNsaWNrPVwib3BlbkRpYWxvZ1wiXG4gICAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNlZjQ0NDRcIlxuICAgICAgc2l6ZT1cIm1kXCJcbiAgICAgIGNvbG9yPVwiZGFya1wiXG4gICAgLz5cbiAgPC9kaXY+XG4gIDxkaXY+XG4gICAgPHEtZGlhbG9nXG4gICAgICB2LW1vZGVsPVwiZGlhbG9nXCJcbiAgICAgIHBlcnNpc3RlbnRcbiAgICAgIHRyYW5zaXRpb24tc2hvdz1cImp1bXAtdXBcIlxuICAgICAgdHJhbnNpdGlvbi1oaWRlPVwianVtcC1kb3duXCJcbiAgICA+XG4gICAgICA8cS1jYXJkXG4gICAgICAgIGNsYXNzPVwibXktY2FyZCBxLXBhLW5vbmVcIlxuICAgICAgICBzdHlsZT1cIlxuICAgICAgICAgIHdpZHRoOiA0MjBweDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgICAgICAgIGJveC1zaGFkb3c6IDAgMTJweCAyNHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgICAgICAgXCJcbiAgICAgID5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uXG4gICAgICAgICAgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtcHgtbWQgcS1weS1zbSBiZy1ncmFkaWVudCB0ZXh0LXdoaXRlXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg1IHEtbXItbWRcIj7wn6WWIEFkZCBQcm9kdWN0PC9kaXY+XG4gICAgICAgICAgPHEtc3BhY2UgLz5cbiAgICAgICAgICA8cS1idG4gaWNvbj1cImNsb3NlXCIgZmxhdCBkZW5zZSByb3VuZCB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgICAgPHEtc2VwYXJhdG9yIGNsYXNzPVwic2VwYXJhdG9yLWdyYWRpZW50XCIgLz5cblxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXB4LXhsIHEtcHQtbm9uZSBxLXBiLWxnXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbGcgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICBjbGFzcz1cInRleHQtY2FwaXRhbGl6ZVwiXG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJhZGROZXdQcm9kdWN0Rm9ybS5uYW1lXCJcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgbGFiZWw9XCJQcm9kdWN0IE5hbWVcIlxuICAgICAgICAgICAgICA6cnVsZXM9XCJbXG4gICAgICAgICAgICAgICAgKHZhbCkgPT4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCkgfHwgJ1Byb2R1Y3QgbmFtZSBpcyByZXVpcmVkJyxcbiAgICAgICAgICAgICAgXVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LW1kIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgICAgPCEtLSA8ZGl2PkNhdGVnb3J5PC9kaXY+IC0tPlxuICAgICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJhZGROZXdQcm9kdWN0Rm9ybS5jYXRlZ29yeVwiXG4gICAgICAgICAgICAgIGlucHV0LWRlYm91bmNlPVwiMFwiXG4gICAgICAgICAgICAgIDpvcHRpb25zPVwiY2F0ZWdvcnlcIlxuICAgICAgICAgICAgICBzdGFjay1sYWJlbFxuICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBsYWJlbD1cIkNhdGVnb3J5XCJcbiAgICAgICAgICAgICAgOnJ1bGVzPVwiW1xuICAgICAgICAgICAgICAgICh2YWwpID0+ICh2YWwgJiYgdmFsLmxlbmd0aCA+IDApIHx8ICdDYXRlZ29yeSBpcyByZXF1aXJlZCcsXG4gICAgICAgICAgICAgIF1cIlxuICAgICAgICAgICAgICBoaWRlLWRyb3Bkb3duLWljb25cbiAgICAgICAgICAgICAgYmVoYXZpb3I9XCJtZW51XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDwhLS0gPHEtc2VwYXJhdG9yIC8+IC0tPlxuICAgICAgICA8cS1jYXJkLWFjdGlvbnMgY2xhc3M9XCJyb3cgcS1weC1sZyBxLXB5LXNtIHEtcHQtbm9uZVwiIGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgICA8cS1idG4gY2xhc3M9XCJnbG9zc3lcIiBjb2xvcj1cImdyZXktOVwiIGxhYmVsPVwiRGlzbWlzc1wiIHYtY2xvc2UtcG9wdXAgLz5cbiAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgIGNsYXNzPVwiZ2xvc3N5XCJcbiAgICAgICAgICAgIGNvbG9yPVwidGVhbFwiXG4gICAgICAgICAgICBsYWJlbD1cIkNyZWF0ZVwiXG4gICAgICAgICAgICBAY2xpY2s9XCJjcmVhdGVQcm9kdWN0c1wiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICAgIDwvcS1jYXJkPlxuICAgIDwvcS1kaWFsb2c+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgcmVhY3RpdmUgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyB1c2VQcm9kdWN0c1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvcHJvZHVjdFwiO1xuXG5jb25zdCBwcm9kdWN0c1N0b3JlID0gdXNlUHJvZHVjdHNTdG9yZSgpO1xuY29uc3QgY2F0ZWdvcnkgPSBbXCJCcmVhZFwiLCBcIlNlbGVjdGFcIiwgXCJTb2Z0ZHJpbmtzXCJdO1xuY29uc3QgZGlhbG9nID0gcmVmKGZhbHNlKTtcbmNvbnN0IG9wZW5EaWFsb2cgPSAoKSA9PiB7XG4gIGRpYWxvZy52YWx1ZSA9IHRydWU7XG59O1xuXG5jb25zdCBhZGROZXdQcm9kdWN0Rm9ybSA9IHJlYWN0aXZlKHtcbiAgbmFtZTogXCJcIixcbiAgY2F0ZWdvcnk6IG51bGwsXG59KTtcblxuY29uc3QgY3JlYXRlUHJvZHVjdHMgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgYXdhaXQgcHJvZHVjdHNTdG9yZS5jcmVhdGVQcm9kdWN0cyh7IC4uLmFkZE5ld1Byb2R1Y3RGb3JtIH0pO1xuXG4gICAgZGlhbG9nLnZhbHVlID0gZmFsc2U7XG4gICAgY29uc29sZS5sb2coXCJQcm9kdWN0cyBEYXRhXCIsIGFkZE5ld1Byb2R1Y3RGb3JtKTtcbiAgICByZXNldEZvcm1EYXRhKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coXCJFcnJvciBzYXZpbmcgcHJvZHVjdDpcIiwgZXJyb3IpO1xuICAgIC8vIE5vdGlmeS5jcmVhdGUoe1xuICAgIC8vICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgIC8vICAgbWVzc2FnZTogXCJGYWlsZWQgdG8gc2F2ZSBwcm9kdWN0OlwiICsgZXJyb3IubWVzc2FnZSxcbiAgICAvLyB9KTtcbiAgfVxufTtcblxuY29uc3QgcmVzZXRGb3JtRGF0YSA9ICgpID0+IHtcbiAgYWRkTmV3UHJvZHVjdEZvcm0ubmFtZSA9IFwiXCI7XG4gIGFkZE5ld1Byb2R1Y3RGb3JtLmNhdGVnb3J5ID0gXCJcIjtcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5teS1jYXJkIHtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYW5pbWF0aW9uOiBmYWRlSW4gMC4zcyBlYXNlO1xufVxuXG4uYnRuLWFkZCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzAwMDAwMCwgIzAwMDAwMCk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmJnLWdyYWRpZW50IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzAwYmZhNSwgIzAwNzk2Yik7XG59XG5cbi5zZXBhcmF0b3ItZ3JhZGllbnQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMwMGJmYTUsICMwMDc5NmIpO1xufVxuXG4ucS1idG4ge1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcbn1cblxuLnEtYnRuOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpO1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG5cbi5idG4tY2FuY2VsIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZWY1MzUwLCAjZTUzOTM1KTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uYnRuLWNyZWF0ZSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzY2YmI2YSwgIzQzYTA0Nyk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLnEtYW5pbWF0ZS1ib3VuY2Uge1xuICBhbmltYXRpb246IGJvdW5jZUluIDAuNnMgZWFzZTtcbn1cblxuQGtleWZyYW1lcyBmYWRlSW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMHB4KTtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIH1cbn1cblxuQGtleWZyYW1lcyBib3VuY2VJbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtYnRuXG4gICAgQGNsaWNrPVwib3BlbkVkaXRGb3JtXCJcbiAgICBjb2xvcj1cInBvc2l0aXZlXCJcbiAgICBpY29uPVwiZWRpdFwiXG4gICAgc2l6ZT1cInNtXCJcbiAgICBmbGF0XG4gICAgcm91bmRcbiAgICBkZW5zZVxuICA+XG4gICAgPHEtdG9vbHRpcCBjbGFzcz1cImJnLXBvc2l0aXZlXCIgOmRlbGF5PVwiMjAwXCI+RWRpdDwvcS10b29sdGlwPlxuICA8L3EtYnRuPlxuICA8cS1kaWFsb2dcbiAgICB2LW1vZGVsPVwiZGlhbG9nXCJcbiAgICBwZXJzaXN0ZW50XG4gICAgdHJhbnNpdGlvbi1zaG93PVwianVtcC11cFwiXG4gICAgdHJhbnNpdGlvbi1oaWRlPVwianVtcC1kb3duXCJcbiAgPlxuICAgIDxxLWNhcmRcbiAgICAgIGNsYXNzPVwibXktY2FyZCBxLXBhLW5vbmVcIlxuICAgICAgc3R5bGU9XCJcbiAgICAgICAgd2lkdGg6IDQyMHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgICAgICBib3gtc2hhZG93OiAwIDEycHggMjRweCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gICAgICBcIlxuICAgID5cbiAgICAgIDxxLWNhcmQtc2VjdGlvblxuICAgICAgICBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1weC1tZCBxLXB5LXNtIGJnLWdyYWRpZW50IHRleHQtd2hpdGVcIlxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNSBxLW1yLW1kXCI+8J+lliBFZGl0IFByb2R1Y3Q8L2Rpdj5cbiAgICAgICAgPHEtc3BhY2UgLz5cbiAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgZGVuc2Ugcm91bmQgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgICAgPHEtc2VwYXJhdG9yIGNsYXNzPVwic2VwYXJhdG9yLWdyYWRpZW50XCIgLz5cblxuICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1weC14bCBxLXB0LW5vbmUgcS1wYi1sZ1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1sZyBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICA8IS0tIDxkaXY+TmFtZSBvZiBCcmVhZDwvZGl2PiAtLT5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgY2xhc3M9XCJ0ZXh0LWNhcGl0YWxpemVcIlxuICAgICAgICAgICAgdi1tb2RlbD1cImVkaXRQcm9kdWN0Rm9ybS5uYW1lXCJcbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgbGFiZWw9XCJQcm9kdWN0IG5hbWVcIlxuICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+IHZhbCAmJiB2YWwubGVuZ3RoID4gMF1cIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1tZCBxLWFuaW1hdGVkIHEtYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICA8IS0tIDxkaXY+Q2F0ZWdvcnk8L2Rpdj4gLS0+XG4gICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICB2LW1vZGVsPVwiZWRpdFByb2R1Y3RGb3JtLmNhdGVnb3J5XCJcbiAgICAgICAgICAgIGlucHV0LWRlYm91bmNlPVwiMFwiXG4gICAgICAgICAgICA6b3B0aW9ucz1cImNhdGVnb3J5XCJcbiAgICAgICAgICAgIHN0YWNrLWxhYmVsXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIGxhYmVsPVwiQ2F0ZWdvcnlcIlxuICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+IHZhbCAmJiB2YWwubGVuZ3RoID4gMF1cIlxuICAgICAgICAgICAgaGlkZS1kcm9wZG93bi1pY29uXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPCEtLSA8cS1zZXBhcmF0b3IgLz4gLS0+XG4gICAgICA8cS1jYXJkLWFjdGlvbnMgY2xhc3M9XCJyb3cgcS1weC1sZyBxLXB5LXNtIHEtcHQtbm9uZVwiIGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgPHEtYnRuIGNsYXNzPVwiZ2xvc3N5XCIgY29sb3I9XCJncmV5LTlcIiBsYWJlbD1cIkRpc21pc3NcIiB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGNsYXNzPVwiZ2xvc3N5XCJcbiAgICAgICAgICBjb2xvcj1cInRlYWxcIlxuICAgICAgICAgIGxhYmVsPVwiU2F2ZVwiXG4gICAgICAgICAgQGNsaWNrPVwic2F2ZUVkaXRlZFByb2R1Y3RcIlxuICAgICAgICAvPlxuICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyB1c2VQcm9kdWN0c1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvcHJvZHVjdFwiO1xuaW1wb3J0IHsgcmVmLCByZWFjdGl2ZSB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgcHJvZHVjdFN0b3JlID0gdXNlUHJvZHVjdHNTdG9yZSgpO1xuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyhbXCJlZGl0XCJdKTtcbmNvbnN0IGNhdGVnb3J5ID0gW1wiQnJlYWRcIiwgXCJTZWxlY3RhXCIsIFwiU29mdGRyaW5rc1wiXTtcbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IGVkaXRQcm9kdWN0Rm9ybSA9IHJlYWN0aXZlKHtcbiAgbmFtZTogXCJcIixcbiAgY2F0ZWdvcnk6IG51bGwsXG59KTtcblxuY29uc3Qgb3BlbkVkaXRGb3JtID0gKCkgPT4ge1xuICBPYmplY3QuYXNzaWduKGVkaXRQcm9kdWN0Rm9ybSwgcHJvcHMuZWRpdC5yb3cpO1xuICBkaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcblxuY29uc3Qgc2F2ZUVkaXRlZFByb2R1Y3QgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgdXBkYXRlZFByb2R1Y3RzID0geyAuLi5wcm9wcy5lZGl0LnJvdywgLi4uZWRpdFByb2R1Y3RGb3JtIH07XG4gICAgYXdhaXQgcHJvZHVjdFN0b3JlLnVwZGF0ZVByb2R1Y3RzKHByb3BzLmVkaXQucm93LmlkLCB1cGRhdGVkUHJvZHVjdHMpO1xuICAgIGRpYWxvZy52YWx1ZSA9IGZhbHNlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkIHRvIHVwZGF0ZSBpbmdyZWRpZW50czpcIiwgZXJyb3IpO1xuICB9XG59O1xuXG4vLyBjb25zdCBzYXZlRWRpdGVkUHJvZHVjdCA9IGFzeW5jICgpID0+IHtcbi8vICAgdHJ5IHtcbi8vICAgICBjb25zdCBvcmlnaW5hbFByb2R1Y3QgPSBwcm9wcy5lZGl0LnJvdztcbi8vICAgICBjb25zdCB1cGRhdGVkUHJvZHVjdCA9IHtcbi8vICAgICAgIGlkOiBvcmlnaW5hbFByb2R1Y3QuaWQsXG4vLyAgICAgICBuYW1lOiBlZGl0UHJvZHVjdEZvcm0ubmFtZSxcbi8vICAgICAgIGNhdGVnb3J5OiBlZGl0UHJvZHVjdEZvcm0uY2F0ZWdvcnksXG4vLyAgICAgfTtcbi8vICAgICBjb25zdCBjaGFuZ2VkRmllbGRzID0gW107XG4vLyAgICAgaWYgKG9yaWdpbmFsUHJvZHVjdC5uYW1lICE9PSB1cGRhdGVkUHJvZHVjdC5uYW1lKSB7XG4vLyAgICAgICBjaGFuZ2VkRmllbGRzLnB1c2goXG4vLyAgICAgICAgIGBOYW1lOiAke29yaWdpbmFsUHJvZHVjdC5uYW1lfSB0byAke3VwZGF0ZWRQcm9kdWN0Lm5hbWV9YFxuLy8gICAgICAgKTtcbi8vICAgICB9XG4vLyAgICAgaWYgKG9yaWdpbmFsUHJvZHVjdC5jYXRlZ29yeSAhPT0gdXBkYXRlZFByb2R1Y3QuY2F0ZWdvcnkpIHtcbi8vICAgICAgIGNoYW5nZWRGaWVsZHMucHVzaChcbi8vICAgICAgICAgYENhdGVnb3J5OiAke29yaWdpbmFsUHJvZHVjdC5jYXRlZ29yeX0gdG8gJHt1cGRhdGVkUHJvZHVjdC5jYXRlZ29yeX1gXG4vLyAgICAgICApO1xuLy8gICAgIH1cbi8vICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHByb2R1Y3RTdG9yZS51cGRhdGUoXG4vLyAgICAgICBvcmlnaW5hbFByb2R1Y3QuaWQsXG4vLyAgICAgICB1cGRhdGVkUHJvZHVjdFxuLy8gICAgICk7XG4vLyAgICAgTm90aWZ5LmNyZWF0ZSh7XG4vLyAgICAgICB0eXBlOiBcIndhcm5pbmdcIixcbi8vICAgICAgIGljb246IFwiY2hlY2tcIixcbi8vICAgICAgIG1lc3NhZ2U6IGAke29yaWdpbmFsUHJvZHVjdC5uYW1lfSAke29yaWdpbmFsUHJvZHVjdC5jYXRlZ29yeX0gc3VjY2Vzc2Z1bGx5IHVwZGF0ZWQhYCxcbi8vICAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxuLy8gICAgIH0pO1xuLy8gICAgIGRpYWxvZy52YWx1ZSA9IGZhbHNlO1xuLy8gICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMDApIHtcbi8vICAgICAgIGNvbnNvbGUubG9nKFwiUHJvZHVjdCB1cGRhdGVkIHN1Y2Nlc3NmdWxseTpcIiwgcmVzcG9uc2UuZGF0YSk7XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkIHRvIHVwZGF0ZSBwcm9kdWN0OlwiLCByZXNwb25zZSk7XG4vLyAgICAgfVxuLy8gICB9IGNhdGNoIChlcnJvcikge31cbi8vIH07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5teS1jYXJkIHtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYW5pbWF0aW9uOiBmYWRlSW4gMC4zcyBlYXNlO1xufVxuXG4uYnRuLWFkZCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzAwMDAwMCwgIzAwMDAwMCk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmJnLWdyYWRpZW50IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzAwYmZhNSwgIzAwNzk2Yik7XG59XG5cbi5zZXBhcmF0b3ItZ3JhZGllbnQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMwMGJmYTUsICMwMDc5NmIpO1xufVxuXG4ucS1idG4ge1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcbn1cblxuLnEtYnRuOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpO1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG5cbi5idG4tY2FuY2VsIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZWY1MzUwLCAjZTUzOTM1KTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uYnRuLWNyZWF0ZSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzY2YmI2YSwgIzQzYTA0Nyk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLnEtYW5pbWF0ZS1ib3VuY2Uge1xuICBhbmltYXRpb246IGJvdW5jZUluIDAuNnMgZWFzZTtcbn1cblxuQGtleWZyYW1lcyBmYWRlSW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMHB4KTtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIH1cbn1cblxuQGtleWZyYW1lcyBib3VuY2VJbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtYnRuXG4gICAgQGNsaWNrPVwiZGVsZXRlRGlhbG9nXCJcbiAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICBpY29uPVwiZGVsZXRlXCJcbiAgICBzaXplPVwic21cIlxuICAgIGZsYXRcbiAgICByb3VuZFxuICAgIGRlbnNlXG4gID5cbiAgICA8cS10b29sdGlwIGNsYXNzPVwiYmctbmVnYXRpdmVcIiA6ZGVsYXk9XCIyMDBcIj5EZWxldGU8L3EtdG9vbHRpcD5cbiAgPC9xLWJ0bj5cbiAgPHEtZGlhbG9nIHYtbW9kZWw9XCJkaWFsb2dWaXNpYmxlXCI+XG4gICAgPHEtY2FyZCBjbGFzcz1cInEtcGEtbWQgcS1yb3VuZGVkIHEtZWxldmF0ZS0yIGJnLXdoaXRlIHRleHQtZ3JleS05XCI+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXB0LW5vbmUgcS1wYi1zbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNSBxLW1iLXhzXCI+Q29uZmlybSBEZWxldGlvbjwvZGl2PlxuICAgICAgICA8cCBjbGFzcz1cInRleHQtYm9keTIgcS1tYi1ub25lXCI+XG4gICAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/IFRoaXMgYWN0aW9uIGNhbm5vdCBiZVxuICAgICAgICAgIHVuZG9uZS5cbiAgICAgICAgPC9wPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgICAgPHEtc2VwYXJhdG9yIGNsYXNzPVwicS1tYi1tZFwiIC8+XG5cbiAgICAgIDxxLWNhcmQtYWN0aW9ucyBhbGlnbj1cInJpZ2h0XCIgY2xhc3M9XCJxLXB0LW5vbmVcIj5cbiAgICAgICAgPHEtYnRuXG4gICAgICAgICAgZmxhdFxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgbGFiZWw9XCJDYW5jZWxcIlxuICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgdi1jbG9zZS1wb3B1cFxuICAgICAgICAgIGNsYXNzPVwicS1tci1zbVwiXG4gICAgICAgIC8+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgbGFiZWw9XCJEZWxldGVcIlxuICAgICAgICAgIGNvbG9yPVwibmVnYXRpdmVcIlxuICAgICAgICAgIEBjbGljaz1cIm9uRGVsZXRlXCJcbiAgICAgICAgICBjbGFzcz1cInEtYnRuLXJvdW5kZWQgcS1weC1sZ1wiXG4gICAgICAgIC8+XG4gICAgICA8L3EtY2FyZC1hY3Rpb25zPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IE5vdGlmeSB9IGZyb20gXCJxdWFzYXJcIjtcbmltcG9ydCB7IHVzZVByb2R1Y3RzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9wcm9kdWN0XCI7XG5cbmNvbnN0IHByb2R1Y3RzU3RvcmUgPSB1c2VQcm9kdWN0c1N0b3JlKCk7XG5jb25zdCBkaWFsb2dWaXNpYmxlID0gcmVmKGZhbHNlKTtcblxuY29uc3QgZGVsZXRlRGlhbG9nID0gKCkgPT4ge1xuICBkaWFsb2dWaXNpYmxlLnZhbHVlID0gdHJ1ZTtcbn07XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHMoW1wiZGVsZXRlXCJdKTtcbmNvbnN0IG9yaWdpbmFsRGF0YSA9IHByb3BzLmRlbGV0ZS5yb3c7XG5jb25zdCBvbkRlbGV0ZSA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBwcm9kdWN0c1N0b3JlLmRlbGV0ZVByb2R1Y3RzKG9yaWdpbmFsRGF0YS5pZCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgfVxuXG4gIGRpYWxvZ1Zpc2libGUudmFsdWUgPSBmYWxzZTtcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5xLWNhcmQge1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBib3gtc2hhZG93OiAwIDhweCAyNHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuLnEtY2FyZC1zZWN0aW9uIHtcbiAgcGFkZGluZzogMjRweCAzMnB4O1xufVxuXG4ucS1idG4ge1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycyBlYXNlLCBib3gtc2hhZG93IDAuMnMgZWFzZTtcbn1cblxuLnEtYnRuLXJvdW5kZWQge1xuICBib3JkZXItcmFkaXVzOiA1MHB4O1xufVxuXG4ucS1idG46aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcbn1cblxuLnEtYnRuOmFjdGl2ZSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgYm94LXNoYWRvdzogbm9uZTtcbn1cblxuLnRleHQtaDUge1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4udGV4dC1ib2R5MiB7XG4gIGNvbG9yOiAjNjY2O1xufVxuXG4ucS1lbGV2YXRlLTIge1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4uYmctd2hpdGUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xufVxuXG4udGV4dC1ncmV5LTkge1xuICBjb2xvcjogIzMzMztcbn1cblxuLnEtc2VwYXJhdG9yIHtcbiAgYm9yZGVyLWNvbG9yOiAjZWVlO1xufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8cS1pbnB1dFxuICAgICAgdi1tb2RlbD1cImZpbHRlclwiXG4gICAgICBjbGFzcz1cInEtcGItbGcgcS1wbC1zbSBkeW5hbWljLXdpZHRoXCJcbiAgICAgIG91dGxpbmVkXG4gICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgICBmbGF0XG4gICAgICByb3VuZGVkXG4gICAgICBkZW5zZVxuICAgICAgZGVib3VuY2U9XCIxMDBcIlxuICAgID5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICA8cS1pY29uIG5hbWU9XCJzZWFyY2hcIiAvPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L3EtaW5wdXQ+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwic3Bpbm5lci13cmFwcGVyXCIgdi1pZj1cImxvYWRpbmdcIj5cbiAgICA8cS1zcGlubmVyLWRvdHMgc2l6ZT1cIjUwcHhcIiBjb2xvcj1cInByaW1hcnlcIiAvPlxuICA8L2Rpdj5cbiAgPGRpdiB2LWVsc2U+XG4gICAgPGRpdiB2LWlmPVwiZmlsdGVyZWRSb3dzLmxlbmd0aCA9PT0gMFwiIGNsYXNzPVwiZGF0YS1lcnJvclwiPlxuICAgICAgPHEtaWNvbiBuYW1lPVwid2FybmluZ1wiIGNvbG9yPVwid2FybmluZ1wiIHNpemU9XCI0ZW1cIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInEtbWwtc20gdGV4dC1oNlwiPk5vIGRhdGEgYXZhaWxhYmxlPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPHEtdGFibGVcbiAgICAgIHYtZWxzZVxuICAgICAgY2xhc3M9XCJ0YWJsZS1jb250YWluZXIgZWxlZ2FudC1jb250YWluZXIgc3RpY2t5LWhlYWRlclwiXG4gICAgICA6ZmlsdGVyPVwiZmlsdGVyXCJcbiAgICAgIDp2aXJ0dWFsLXNjcm9sbC1zdGlja3ktc2l6ZS1zdGFydD1cIjQ4XCJcbiAgICAgIGZsYXRcbiAgICAgIHN0eWxlPVwiaGVpZ2h0OiA0MDBweFwiXG4gICAgICA6Y29sdW1ucz1cInByb2R1Y3RzQ29sdW1uXCJcbiAgICAgIDpyb3dzPVwiZmlsdGVyZWRSb3dzXCJcbiAgICAgIHJvdy1rZXk9XCJuYW1lXCJcbiAgICAgIHZpcnR1YWwtc2Nyb2xsXG4gICAgICB2LW1vZGVsOnBhZ2luYXRpb249XCJwYWdpbmF0aW9uXCJcbiAgICAgIDpyb3dzLXBlci1wYWdlLW9wdGlvbnM9XCJbMF1cIlxuICAgICAgaGlkZS1ib3R0b21cbiAgICA+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC1uYW1lPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQga2V5PVwibmFtZVwiIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAge3sgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHByb3BzLnJvdy5uYW1lKSB9fVxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtY2F0ZWdvcnk9XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCBrZXk9XCJuYW1lXCIgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8cS1iYWRnZSA6Y29sb3I9XCJnZXRCYWRnZUNhdGVnb3J5Q29sb3IocHJvcHMucm93LmNhdGVnb3J5KVwiPlxuICAgICAgICAgICAge3sgcHJvcHMucm93LmNhdGVnb3J5IH19XG4gICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtYWN0aW9uPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktY2VudGVyIHEtZ3V0dGVyLXgtbWRcIj5cbiAgICAgICAgICAgIDxQcm9kdWN0RWRpdCA6ZWRpdD1cInByb3BzXCIgLz5cbiAgICAgICAgICAgIDxQcm9kdWN0RGVsZXRlIDpkZWxldGU9XCJwcm9wc1wiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9xLXRhYmxlPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgUHJvZHVjdEVkaXQgZnJvbSBcIi4vUHJvZHVjdEVkaXQudnVlXCI7XG5pbXBvcnQgUHJvZHVjdERlbGV0ZSBmcm9tIFwiLi9Qcm9kdWN0RGVsZXRlLnZ1ZVwiO1xuaW1wb3J0IHsgcmVmLCB3YXRjaCwgb25Nb3VudGVkLCBjb21wdXRlZCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IGRhdGUgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyB1c2VQcm9kdWN0c1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvcHJvZHVjdFwiO1xuXG5jb25zdCBwYWdpbmF0aW9uID0gcmVmKHtcbiAgcm93c1BlclBhZ2U6IDAsXG59KTtcbmNvbnN0IHByb2R1Y3RzU3RvcmUgPSB1c2VQcm9kdWN0c1N0b3JlKCk7XG5jb25zdCBmaWx0ZXIgPSByZWYoXCJcIik7XG5jb25zdCBwcm9kdWN0c1Jvd3MgPSBjb21wdXRlZCgoKSA9PiBwcm9kdWN0c1N0b3JlLnByb2R1Y3RzKTtcbmNvbnN0IGlzTG9hZGluZyA9IHJlZih0cnVlKTtcbmNvbnN0IGxvYWRpbmcgPSByZWYodHJ1ZSk7XG5jb25zdCBzaG93Tm9EYXRhTWVzc2FnZSA9IHJlZihmYWxzZSk7XG5cbi8vIGNvbnN0IHNlYXJjaFF1ZXJ5ID0gcmVmKFwiXCIpO1xuXG4vLyBjb25zdCBzZWFyY2ggPSBhc3luYyAoKSA9PiB7XG4vLyAgIGxvYWRpbmcudmFsdWUgPSB0cnVlO1xuLy8gICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IGZhbHNlO1xuXG4vLyAgIHRyeSB7XG4vLyAgICAgYXdhaXQgcHJvZHVjdHNTdG9yZS5zZWFyY2hQcm9kdWN0cyhzZWFyY2hRdWVyeS52YWx1ZSk7XG4vLyAgICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSBwcm9kdWN0c1Jvd3MudmFsdWUubGVuZ3RoID09PSAwO1xuLy8gICB9IGNhdGNoIChlcnJvcikge1xuLy8gICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBwcm9kdWN0czpcIiwgZXJyb3IpO1xuLy8gICB9IGZpbmFsbHkge1xuLy8gICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbi8vICAgfVxuLy8gfTtcblxuLy8gd2F0Y2goc2VhcmNoUXVlcnksIChuZXdWYWx1ZSkgPT4ge1xuLy8gICBpZiAobmV3VmFsdWUudHJpbSgpICE9PSBcIlwiKSB7XG4vLyAgICAgc2VhcmNoKCk7XG4vLyAgIH0gZWxzZSB7XG4vLyAgICAgcHJvZHVjdHNSb3dzLnZhbHVlID0gcHJvZHVjdHNTdG9yZS5mZXRjaFByb2R1Y3RzKCk7XG4vLyAgICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSBwcm9kdWN0c1Jvd3MudmFsdWUubGVuZ3RoID09PSAwO1xuLy8gICB9XG4vLyB9KTtcblxuLy8gb25Nb3VudGVkKGFzeW5jICgpID0+IHtcbi8vICAgdHJ5IHtcbi8vICAgICBwcm9kdWN0c1Jvd3MudmFsdWUgPSBhd2FpdCBwcm9kdWN0c1N0b3JlLmZldGNoUHJvZHVjdHMoKTtcbi8vICAgICBpZiAoIXByb2R1Y3RzUm93cy52YWx1ZS5sZW5ndGgpIHtcbi8vICAgICAgIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gdHJ1ZTtcbi8vICAgICB9XG4vLyAgIH0gY2F0Y2ggKGVycm9yKSB7XG4vLyAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHByb2R1Y3RzOlwiLCBlcnJvcik7XG4vLyAgICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSB0cnVlO1xuLy8gICB9IGZpbmFsbHkge1xuLy8gICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbi8vICAgfVxuLy8gfSk7XG5jb25zdCBmaWx0ZXJlZFJvd3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmICghZmlsdGVyLnZhbHVlKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RzUm93cy52YWx1ZTtcbiAgfVxuICByZXR1cm4gcHJvZHVjdHNSb3dzLnZhbHVlLmZpbHRlcigocm93KSA9PlxuICAgIHJvdy5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyLnZhbHVlLnRvTG93ZXJDYXNlKCkpXG4gICk7XG59KTtcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgYXdhaXQgcmVsb2FkVGFibGVEYXRhKCk7XG59KTtcblxuY29uc3QgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyID0gKGxvY2F0aW9uKSA9PiB7XG4gIGlmICghbG9jYXRpb24pIHJldHVybiBcIlwiO1xuICByZXR1cm4gbG9jYXRpb25cbiAgICAuc3BsaXQoXCIgXCIpXG4gICAgLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSlcbiAgICAuam9pbihcIiBcIik7XG59O1xuXG5jb25zdCByZWxvYWRUYWJsZURhdGEgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gICAgYXdhaXQgcHJvZHVjdHNTdG9yZS5mZXRjaFByb2R1Y3RzKCk7XG4gICAgaWYgKCFwcm9kdWN0c1Jvd3MudmFsdWUubGVuZ3RoKSB7XG4gICAgICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IHRydWU7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gdHJ1ZTtcbiAgfSBmaW5hbGx5IHtcbiAgICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIH1cbn07XG5cbndhdGNoKGZpbHRlciwgYXN5bmMgKG5ld0ZpbHRlcikgPT4ge1xuICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpO1xuICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gZmlsdGVyZWRSb3dzLnZhbHVlLmxlbmd0aCA9PT0gMDtcbn0pO1xuXG5jb25zdCBmb3JtYXREYXRlID0gKGRhdGVTdHJpbmcpID0+IHtcbiAgcmV0dXJuIGRhdGUuZm9ybWF0RGF0ZShkYXRlU3RyaW5nLCBcIk1NTU0gRCwgWVlZWVwiKTtcbn07XG5cbmNvbnN0IHByb2R1Y3RzQ29sdW1uID0gW1xuICB7XG4gICAgbmFtZTogXCJuYW1lXCIsXG4gICAgbGFiZWw6IFwiUHJvZHVjdCBOYW1lXCIsXG4gICAgYWxpZ246IFwibGVmdFwiLFxuICAgIGZpZWxkOiAocm93KSA9PiByb3cubmFtZSxcbiAgICBmb3JtYXQ6ICh2YWwpID0+IGAke3ZhbH1gLFxuICB9LFxuXG4gIHtcbiAgICBuYW1lOiBcImNhdGVnb3J5XCIsXG4gICAgYWxpZ246IFwibGVmdFwiLFxuICAgIGxhYmVsOiBcIkNhdGVnb3J5XCIsXG4gICAgZmllbGQ6IFwiY2F0ZWdvcnlcIixcbiAgfSxcbiAgLy8ge1xuICAvLyAgIG5hbWU6IFwiY3JlYXRlZEF0XCIsXG4gIC8vICAgYWxpZ246IFwiY2VudGVyXCIsXG4gIC8vICAgbGFiZWw6IFwiQ3JlYXRlZCBBdFwiLFxuICAvLyAgIGZpZWxkOiBcImNyZWF0ZWRBdFwiLFxuICAvLyAgIGZvcm1hdDogKHZhbCkgPT4gZm9ybWF0RGF0ZSh2YWwpLFxuICAvLyB9LFxuICB7XG4gICAgbmFtZTogXCJhY3Rpb25cIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBsYWJlbDogXCJBY3Rpb25cIixcbiAgICBmaWVsZDogXCJhY3Rpb25cIixcbiAgfSxcbl07XG5cbmNvbnN0IGdldEJhZGdlQ2F0ZWdvcnlDb2xvciA9IChjYXRlZ29yeSkgPT4ge1xuICBzd2l0Y2ggKGNhdGVnb3J5KSB7XG4gICAgY2FzZSBcIkJyZWFkXCI6XG4gICAgICByZXR1cm4gXCJicm93blwiO1xuICAgIGNhc2UgXCJTZWxlY3RhXCI6XG4gICAgICByZXR1cm4gXCJyZWQtNlwiO1xuICAgIGNhc2UgXCJTb2Z0ZHJpbmtzXCI6XG4gICAgICByZXR1cm4gXCJhY2NlbnRcIjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIFwiZ3JleVwiO1xuICB9XG59O1xuPC9zY3JpcHQ+XG48c3R5bGUgc2NvcGVkPlxuLmVsZWdhbnQtY29udGFpbmVyIHtcbiAgYmFja2dyb3VuZDogI2Y3ZjhmYztcbiAgcGFkZGluZzogMnJlbTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xufVxuLmFic29sdXRlLWZ1bGwge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbn1cbi5zcGlubmVyLXdyYXBwZXIge1xuICBtaW4taGVpZ2h0OiA0MHZoO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5kYXRhLWVycm9yIHtcbiAgbWluLWhlaWdodDogNDB2aDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4ubXktc3RpY2t5LWR5bmFtaWMge1xuICBoZWlnaHQ6IDQxMHB4O1xufVxuXG4ubXktc3RpY2t5LWR5bmFtaWMgLnEtdGFibGVfX3RvcCxcbi5teS1zdGlja3ktZHluYW1pYyAucS10YWJsZV9fYm90dG9tLFxuLm15LXN0aWNreS1keW5hbWljIHRoZWFkIHRyOmZpcnN0LWNoaWxkIHRoIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcbn1cblxuLm15LXN0aWNreS1keW5hbWljIHRoZWFkIHRyIHRoIHtcbiAgcG9zaXRpb246IHN0aWNreTtcbiAgei1pbmRleDogMTtcbn1cblxuLm15LXN0aWNreS1keW5hbWljIHRoZWFkIHRyOmxhc3QtY2hpbGQgdGgge1xuICB0b3A6IDQ4cHg7XG59XG5cbi5teS1zdGlja3ktZHluYW1pYyB0aGVhZCB0cjpmaXJzdC1jaGlsZCB0aCB7XG4gIHRvcDogMDtcbn1cblxuLm15LXN0aWNreS1keW5hbWljIHRib2R5IHtcbiAgc2Nyb2xsLW1hcmdpbi10b3A6IDQ4cHg7XG59XG4uZHluYW1pYy13aWR0aCB7XG4gIHdpZHRoOiAxMDAlOyAvKiBkZWZhdWx0IHdpZHRoICovXG4gIG1heC13aWR0aDogNTAwcHg7XG4gIG1pbi13aWR0aDogMzAwcHg7IC8qIHNldCBhIG1pbmltdW0gd2lkdGggKi9cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDE1MDBweCkge1xuICAuZHluYW1pYy13aWR0aCB7XG4gICAgbWF4LXdpZHRoOiA1MDBweDsgLyogc21hbGxlciB3aWR0aCBmb3IgbWVkaXVtLXNpemVkIHNjcmVlbnMgKi9cbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLmR5bmFtaWMtd2lkdGgge1xuICAgIG1heC13aWR0aDogNTAwcHg7IC8qIHNtYWxsZXIgd2lkdGggZm9yIHRhYmxldHMgKi9cbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNDgwcHgpIHtcbiAgLmR5bmFtaWMtd2lkdGgge1xuICAgIG1heC13aWR0aDogMjAwcHg7IC8qIHNtYWxsZXIgd2lkdGggZm9yIG1vYmlsZSBzY3JlZW5zICovXG4gIH1cbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgY2xhc3M9XCJlbGVnYW50LWNvbnRhaW5lclwiIGZsYXQ+XG4gICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5cbiAgICAgICAgPCEtLSA8cS1pY29uIG5hbWU9XCJmYS1zb2xpZCBmYS1jYWtlLWNhbmRsZXNcIiAvPiAtLT5cbiAgICAgICAgPCEtLSDwn6WWIFByb2R1Y3RzIC0tPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXIteC1zbVwiPlxuICAgICAgICAgIDxxLWJhZGdlIGxhYmVsPVwiQnJlYWRcIiBjbGFzcz1cInRleHQtd2hpdGVcIiBjb2xvcj1cImJyb3duLTEzXCIgLz5cbiAgICAgICAgICA8cS1iYWRnZSBsYWJlbD1cIlNlbGVjdGFcIiBjbGFzcz1cInRleHQtd2hpdGVcIiBjb2xvcj1cInJlZC02XCIgLz5cbiAgICAgICAgICA8cS1iYWRnZSBsYWJlbD1cIlNvZmRyaW5rc1wiIGNsYXNzPVwidGV4dC13aGl0ZVwiIGNvbG9yPVwiYWNjZW50XCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxQcm9kdWN0Q3JlYXRlIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDwhLS0gPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1ndXR0ZXItbWRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1lbmQgcS1ndXR0ZXItbWRcIj5cbiAgICAgICAgPFByb2R1Y3RTZWFyY2ggLz5cblxuICAgICAgPC9kaXY+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj4gLS0+XG4gICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgPGRpdj5cbiAgICAgICAgPFByb2R1Y3RUYWJsZSAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuLy8gaW1wb3J0IEJyZWFkUGFuZWxTZWN0aW9uIGZyb20gXCIuL3Byb2R1Y3RzX2JyZWFkL0JyZWFkUGFuZWxTZWN0aW9uLnZ1ZVwiO1xuLy8gaW1wb3J0IFNlbGVjdGFQYWdlIGZyb20gXCIuL3NlbGVjdGEvU2VsZWN0YVBhZ2UudnVlXCI7XG5pbXBvcnQgeyByZWYgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgUHJvZHVjdENyZWF0ZSBmcm9tIFwiLi9jb21wb25lbnRzL1Byb2R1Y3RDcmVhdGUudnVlXCI7XG5pbXBvcnQgUHJvZHVjdFRhYmxlIGZyb20gXCIuL2NvbXBvbmVudHMvUHJvZHVjdFRhYmxlLnZ1ZVwiO1xuaW1wb3J0IFByb2R1Y3RTZWFyY2ggZnJvbSBcIi4vY29tcG9uZW50cy9Qcm9kdWN0U2VhcmNoLnZ1ZVwiO1xuXG5jb25zdCBwcm9kdWN0c1RhYiA9IHJlZihcImJyZWFkXCIpO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5lbGVnYW50LWNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQ6ICNmN2Y4ZmM7XG4gIHBhZGRpbmc6IDJyZW07XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkZBLFVBQU0sZ0JBQWdCLGlCQUFnQjtBQUN0QyxVQUFNLFdBQVcsQ0FBQyxTQUFTLFdBQVcsWUFBWTtBQUNsRCxVQUFNLFNBQVMsSUFBSSxLQUFLO0FBQ3hCLFVBQU0sYUFBYSxNQUFNO0FBQ3ZCLGFBQU8sUUFBUTtBQUFBLElBQ2pCO0FBRUEsVUFBTSxv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
