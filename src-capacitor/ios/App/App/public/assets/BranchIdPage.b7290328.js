import { d as defineStore, n as ref, g as computed, P as Plugin, N as Notify, _ as _export_sfc, bf as useRoute, t as reactive, o as openBlock, a4 as createElementBlock, a as createVNode, M as QBtn, w as withCtx, Q as QCard, I as QCardSection, af as withDirectives, J as createBaseVNode, K as QInput, L as QIcon, c as createBlock, O as createTextVNode, a5 as Fragment, a6 as renderList, R as toDisplayString, be as createCommentVNode, aK as QCardActions, a3 as QDialog, a2 as QSeparator, S as pushScopeId, T as popScopeId, z as onMounted, u as watch, bc as withKeys, aL as normalizeClass, bg as unref, aJ as withModifiers, H as useRouter } from "./index.c8e2405b.js";
import { Q as QSpace } from "./QSpace.08c50700.js";
import { Q as QTabs, a as QTab, b as QTabPanels, c as QTabPanel } from "./QTabPanels.31673619.js";
import { Q as QPage } from "./QPage.e43c6521.js";
import { Q as QItem, a as QItemSection } from "./QItem.76557ad9.js";
import { a as QItemLabel } from "./rtl.b1b38f21.js";
import { Q as QList } from "./QList.d5d13fac.js";
import { C as ClosePopup } from "./ClosePopup.649d85d8.js";
import { api } from "./axios.aa1bce92.js";
import { u as useProductsStore } from "./product.d01d241e.js";
import { Q as QSpinnerDots } from "./QSpinnerDots.c2e8b2d3.js";
import { Q as QTd } from "./QTd.f597934c.js";
import { Q as QBadge } from "./QBadge.49245359.js";
import { Q as QTooltip } from "./QTooltip.4a3eef22.js";
import { Q as QPopupEdit } from "./QPopupEdit.5c11c937.js";
import { Q as QTable } from "./QTable.d3fb87f5.js";
import { u as useRawMaterialsStore } from "./raw-material.d73eb00c.js";
import { u as useDialogPluginComponent } from "./use-dialog-plugin-component.6a9886de.js";
import { q as quasarDate } from "./date.cdd6bcba.js";
import { p as pdfmake, v as vfs_fontes } from "./vfs_fontes.3eb8cb31.js";
import { u as useQuasar } from "./use-quasar.84d8ad03.js";
import { Q as QSelect, a as QChip } from "./QSelect.0985e28e.js";
import { u as useRecipeStore } from "./recipe.2437bced.js";
import { u as useBranchRecipeStore } from "./branch-recipe.ce2a45ec.js";
import "./QResizeObserver.240147be.js";
import "./use-panel.e42dc1d1.js";
import "./touch.9135741d.js";
import "./selection.94057980.js";
import "./QMenu.4f670399.js";
import "./QVirtualScroll.41a98cb7.js";
import "./use-virtual-scroll.5b4ab88d.js";
const useBranchProductsStore = defineStore("branchProducts", () => {
  const branchProduct = ref(null);
  const branchProducts = ref([]);
  const branchId = ref([]);
  const productsStore = useProductsStore();
  const products = computed(() => productsStore.products);
  console.log("Branch PRoductssss:", products.value);
  const fetchBranchProducts = async (branchId2) => {
    const response = await api.get(`/api/branches/${branchId2}/products`);
    branchProducts.value = response.data;
  };
  const createBranchProducts = async (data) => {
    Plugin.show();
    try {
      const { category, price } = data;
      const response = await api.post(`/api/branch-products`, data);
      if (response.data.message === "Branch product saved successfully") {
        const product = products.value.find(
          (item) => item.id === data.product_id
        );
        const newProduct = {
          ...response.data,
          category: category ? category : "No Category",
          price: price ? parseInt(price) : 0,
          product: product ? product : { name: "No Product", category: "Unknown" },
          total_quantity: data.total_quantity
        };
        branchProducts.value.unshift(newProduct);
        Notify.create({
          type: "positive",
          message: "Branch product saved successfully",
          position: "top"
        });
      } else if (response.data.message === "The product already exists in this branch.") {
        Notify.create({
          type: "warning",
          message: "The product already exists in this branch.",
          position: "top"
        });
      }
    } catch (error) {
      Notify.create({
        type: "negative",
        message: "An error occurred while saving the branch product.",
        position: "top"
      });
    } finally {
      Plugin.hide();
    }
  };
  const updateBranchProductPrice = async (id) => {
    await api.put(`/api/update-branch-products/${id}`, { price: newPrice });
    const index = branchProducts.value.findIndex((item) => item.id === id);
    if (index !== -1) {
      branchProducts.value[index].price = newPrice;
    }
  };
  const deleteBranchProducts = async (id) => {
    await api.delete(`/api/branch-products/${id}`);
    branchProducts.value = branchProducts.value.filter(
      (branchProduct2) => branchProduct2.id !== id
    );
  };
  return {
    branchId,
    branchProduct,
    branchProducts,
    fetchBranchProducts,
    createBranchProducts,
    updateBranchProductPrice,
    deleteBranchProducts
  };
});
const _hoisted_1$p = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Create Branch Product", -1);
const _hoisted_2$o = { class: "q-mb-lg" };
const _hoisted_3$j = {
  key: 0,
  class: "custom-list z-top"
};
const _hoisted_4$f = /* @__PURE__ */ createBaseVNode("div", null, "Product Name", -1);
const _hoisted_5$9 = /* @__PURE__ */ createBaseVNode("div", null, "Category", -1);
const _hoisted_6$8 = { class: "row justify-between" };
const _hoisted_7$8 = /* @__PURE__ */ createBaseVNode("div", null, "Beginnings", -1);
const _hoisted_8$5 = /* @__PURE__ */ createBaseVNode("div", null, "Total Quantity", -1);
const _hoisted_9$4 = /* @__PURE__ */ createBaseVNode("div", null, "Price", -1);
const _sfc_main$r = {
  __name: "ProductCreate",
  setup(__props) {
    const route = useRoute();
    const productStore = useProductsStore();
    const productData = computed(() => productStore.products);
    const branchProducts = useBranchProductsStore();
    const searchQuery = ref("");
    const search = async () => {
      productStore.searchProducts(searchQuery.value);
    };
    const isFormValid = computed(() => {
      return addNewBranchProductForm.price !== 0 && addNewBranchProductForm.beginnings !== 0 && addNewBranchProductForm.total_quantity !== 0;
    });
    const dialog = ref(false);
    const open_create_bread_dialog = () => {
      dialog.value = true;
    };
    const dismiss = () => {
      clearForm2();
      dialog.value = false;
    };
    const capitalizeFirstLetter = (location) => {
      if (!location)
        return "";
      return location.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    };
    const autoFillProduct = (data) => {
      addNewBranchProductForm.product_id = data.id;
      addNewBranchProductForm.product_name = data.name;
      addNewBranchProductForm.category = data.category;
      searchQuery.value = "";
    };
    const addNewBranchProductForm = reactive({
      product_id: "",
      product_name: "",
      price: 0,
      beginnings: 0,
      total_quantity: 0,
      branches_id: route.params.branch_id
    });
    const clearForm2 = () => {
      addNewBranchProductForm.product_id = "";
      addNewBranchProductForm.product_name = "";
      addNewBranchProductForm.category = "";
      addNewBranchProductForm.price = 0;
      addNewBranchProductForm.beginnings = 0;
      addNewBranchProductForm.total_quantity = 0;
    };
    const save = async () => {
      try {
        const { product_name, ...data } = addNewBranchProductForm;
        await branchProducts.createBranchProducts(data);
        console.log("data to send", data);
        clearForm2();
        dialog.value = false;
      } catch (error) {
        console.log(error);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          outline: "",
          class: "text-dark q-pa-sm",
          push: "",
          dense: "",
          elevated: "",
          icon: "add_circle",
          label: "Create Branch Product",
          onClick: open_create_bread_dialog
        }),
        createVNode(QDialog, {
          modelValue: dialog.value,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => dialog.value = $event),
          persistent: ""
        }, {
          default: withCtx(() => [
            createVNode(QCard, {
              class: "my-card",
              style: { "width": "400px", "max-width": "500px", "min-width": "100px" }
            }, {
              default: withCtx(() => [
                createVNode(QCardSection, {
                  class: "row items-center text-white",
                  style: { "background-color": "#ef4444" }
                }, {
                  default: withCtx(() => [
                    _hoisted_1$p,
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
                createVNode(QCardSection, { class: "q-ma-md q-gutter-y-sm" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2$o, [
                      createVNode(QInput, {
                        modelValue: searchQuery.value,
                        "onUpdate:modelValue": [
                          _cache[0] || (_cache[0] = ($event) => searchQuery.value = $event),
                          search
                        ],
                        debounce: "1000",
                        outlined: "",
                        rounded: "",
                        placeholder: "Search product",
                        dense: ""
                      }, {
                        append: withCtx(() => [
                          createBaseVNode("div", null, [
                            createVNode(QIcon, { name: "search" })
                          ])
                        ]),
                        default: withCtx(() => [
                          searchQuery.value ? (openBlock(), createElementBlock("div", _hoisted_3$j, [
                            createVNode(QCard, null, {
                              default: withCtx(() => [
                                createVNode(QList, { separator: "" }, {
                                  default: withCtx(() => {
                                    var _a;
                                    return [
                                      !((_a = productData.value) == null ? void 0 : _a.length) ? (openBlock(), createBlock(QItem, { key: 0 }, {
                                        default: withCtx(() => [
                                          createTextVNode(" No record found. ")
                                        ]),
                                        _: 1
                                      })) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(productData.value, (product) => {
                                        return openBlock(), createBlock(QItem, {
                                          onClick: ($event) => autoFillProduct(product),
                                          key: product.id,
                                          clickable: ""
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(QItemSection, null, {
                                              default: withCtx(() => [
                                                createVNode(QItemLabel, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(capitalizeFirstLetter(product.name)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
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
                    createBaseVNode("div", null, [
                      _hoisted_4$f,
                      createVNode(QInput, {
                        modelValue: addNewBranchProductForm.product_name,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => addNewBranchProductForm.product_name = $event),
                        readonly: "",
                        dense: "",
                        outlined: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    createBaseVNode("div", null, [
                      _hoisted_5$9,
                      createVNode(QInput, {
                        modelValue: addNewBranchProductForm.category,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => addNewBranchProductForm.category = $event),
                        readonly: "",
                        dense: "",
                        outlined: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    createBaseVNode("div", _hoisted_6$8, [
                      createBaseVNode("div", null, [
                        _hoisted_7$8,
                        createVNode(QInput, {
                          modelValue: addNewBranchProductForm.beginnings,
                          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => addNewBranchProductForm.beginnings = $event),
                          mask: "#####",
                          outlined: "",
                          dense: "",
                          style: { "width": "150px" }
                        }, null, 8, ["modelValue"])
                      ]),
                      createBaseVNode("div", null, [
                        _hoisted_8$5,
                        createVNode(QInput, {
                          modelValue: addNewBranchProductForm.total_quantity,
                          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => addNewBranchProductForm.total_quantity = $event),
                          mask: "#####",
                          outlined: "",
                          dense: "",
                          style: { "width": "150px" }
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    createBaseVNode("div", null, [
                      _hoisted_9$4,
                      createVNode(QInput, {
                        modelValue: addNewBranchProductForm.price,
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => addNewBranchProductForm.price = $event),
                        mask: "#####",
                        outlined: "",
                        dense: "",
                        style: { "width": "150px" }
                      }, null, 8, ["modelValue"])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardActions, {
                  class: "row q-ma-md",
                  align: "right"
                }, {
                  default: withCtx(() => [
                    createVNode(QBtn, {
                      class: "glossy",
                      color: "grey-9",
                      label: "Dismiss",
                      onClick: dismiss
                    }),
                    createVNode(QBtn, {
                      class: "glossy",
                      color: "teal",
                      label: "Create",
                      onClick: save,
                      disable: !isFormValid.value
                    }, null, 8, ["disable"])
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
var ProductCreate = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__file", "ProductCreate.vue"]]);
var ProductDelete_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$d = (n) => (pushScopeId("data-v-196482e9"), n = n(), popScopeId(), n);
const _hoisted_1$o = /* @__PURE__ */ _withScopeId$d(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mb-xs" }, "Confirm Deletion", -1));
const _hoisted_2$n = /* @__PURE__ */ _withScopeId$d(() => /* @__PURE__ */ createBaseVNode("p", { class: "text-body2 q-mb-none" }, " Are you sure you want to delete this item? This action cannot be undone. ", -1));
const _sfc_main$q = {
  __name: "ProductDelete",
  props: ["delete"],
  setup(__props) {
    const branchProducts = useBranchProductsStore();
    const props = __props;
    console.log("delte", props.delete.row.id);
    const onDelete = async () => {
      try {
        await branchProducts.deleteBranchProducts(props.delete.row.id);
        Notify.create({
          type: "negative",
          icon: "warning",
          message: `Branch product successfully deleted`,
          timeout: 1e3,
          position: "top"
        });
        dialog.value = false;
      } catch (error) {
        console.error(error.message);
      }
    };
    const dialog = ref(false);
    const open_dialog = () => {
      console.log("ID", props.delete.row.id);
      dialog.value = true;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          onClick: open_dialog,
          color: "negative",
          icon: "delete",
          size: "sm",
          flat: "",
          round: "",
          dense: "",
          align: "center"
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
            createVNode(QCard, null, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "q-pa-md q-rounded q-elevate-2 bg-white text-grey-9" }, {
                  default: withCtx(() => [
                    _hoisted_1$o,
                    _hoisted_2$n
                  ]),
                  _: 1
                }),
                createVNode(QSeparator, { class: "q-mb-md" }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
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
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ], 64);
    };
  }
};
var ProductDelete = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-196482e9"], ["__file", "ProductDelete.vue"]]);
var ProductTable_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$c = (n) => (pushScopeId("data-v-592d46f2"), n = n(), popScopeId(), n);
const _hoisted_1$n = { class: "row justify-between" };
const _hoisted_2$m = { class: "q-my-sm" };
const _hoisted_3$i = {
  key: 0,
  class: "spinner-wrapper"
};
const _hoisted_4$e = { key: 1 };
const _hoisted_5$8 = {
  key: 0,
  class: "data-error"
};
const _hoisted_6$7 = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-ml-sm text-h6" }, "No data available", -1));
const _hoisted_7$7 = { key: 1 };
const _sfc_main$p = {
  __name: "ProductTable",
  setup(__props) {
    const route = useRoute();
    const branchId = route.params.branch_id;
    const branchProductStore = useBranchProductsStore();
    const filter = ref("");
    const loading = ref(true);
    const branchProducts = ref([]);
    const showNoDataMessage = ref(false);
    const pagination = ref({
      rowsPerPage: 0
    });
    const branchProductRows = computed(() => branchProductStore.branchProducts);
    console.log("branchssdfrer", branchProductRows.value);
    const filteredRows = computed(() => {
      if (!filter.value) {
        return branchProductRows.value;
      }
      return branchProductRows.value.filter(
        (row) => row.name.toLowerCase().includes(filter.value.toLowerCase())
      );
    });
    const capitalizeFirstLetter = (location) => {
      if (!location)
        return "";
      return location.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    };
    onMounted(async () => {
      if (branchId) {
        await reloadTableData(branchId);
      }
    });
    const reloadTableData = async (branchId2) => {
      try {
        loading.value = true;
        const response = await branchProductStore.fetchBranchProducts(branchId2);
        branchProductRows.value = response;
        if (!branchProductRows.value.length) {
          showNoDataMessage.value = true;
        }
        console.log("Branch product", branchProductRows.value);
      } catch (error) {
        console.log("Error fetching branch product:", error);
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
    async function updatedPrice(data, val) {
      try {
        const response = await api.put("/api/update-branch-products/" + data.id, {
          price: parseInt(val)
        });
        if (response.status === 200) {
          const i = branchProducts.value.findIndex((item) => item.id == data.id);
          branchProducts.value[i] = parseInt(val);
          Notify.create({
            type: "positive",
            message: response.data.message,
            timout: 1e3,
            position: "top"
          });
        }
      } catch (error) {
        console.error("Error updating price:", error);
      }
    }
    async function updatedTotalQuantity(data, val) {
      try {
        const response = await api.put(
          "/api/update-branch-products-total-quantity/" + data.id,
          {
            total_quantity: parseInt(val)
          }
        );
        if (response.status === 200) {
          const i = branchProducts.value.findIndex((item) => item.id == data.id);
          branchProducts.value[i] = parseInt(val);
          Notify.create({
            type: "positive",
            message: response.data.message,
            timout: 1e3,
            position: "top"
          });
        }
      } catch (error) {
        console.error("Error updating price:", error);
      }
    }
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
    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP"
      }).format(price);
    };
    const productListColumns = [
      {
        name: "name",
        label: "Product Name",
        align: "center",
        field: (row) => row.product.name,
        format: (val) => `${val}`,
        sortable: true
      },
      {
        name: "category",
        align: "center",
        label: "Category",
        field: "category",
        sortable: true
      },
      {
        name: "price",
        align: "center",
        label: "Price",
        field: (val) => formatPrice(val),
        sortable: true
      },
      {
        name: "total_quantity",
        align: "center",
        label: "Quantity",
        field: "total_quantity",
        format: (val) => `${val} pcs`,
        sortable: true
      },
      {
        name: "action",
        align: "center",
        label: "Action",
        field: "action",
        sortable: true
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$n, [
          createBaseVNode("div", null, [
            createVNode(QInput, {
              class: "q-pb-lg q-pl-md",
              modelValue: filter.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filter.value = $event),
              outlined: "",
              placeholder: "Search",
              debounce: "1000",
              style: { "width": "450px", "max-width": "1500px", "min-width": "100px" },
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
          createBaseVNode("div", _hoisted_2$m, [
            createVNode(ProductCreate)
          ])
        ]),
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_3$i, [
          createVNode(QSpinnerDots, {
            size: "50px",
            color: "primary"
          })
        ])) : (openBlock(), createElementBlock("div", _hoisted_4$e, [
          filteredRows.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_5$8, [
            createVNode(QIcon, {
              name: "warning",
              color: "warning",
              size: "4em"
            }),
            _hoisted_6$7
          ])) : (openBlock(), createBlock(QTable, {
            key: 1,
            class: "table-container sticky-header",
            filter: filter.value,
            "virtual-scroll-sticky-size-start": 48,
            flat: "",
            columns: productListColumns,
            rows: filteredRows.value,
            "row-key": "name",
            "virtual-scroll": "",
            pagination: pagination.value,
            "onUpdate:pagination": _cache[1] || (_cache[1] = ($event) => pagination.value = $event),
            "rows-per-page-options": [0],
            "hide-bottom": "",
            style: { "height": "350px" }
          }, {
            "body-cell-name": withCtx((props) => [
              createVNode(QTd, {
                key: "name",
                props
              }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createTextVNode(toDisplayString(((_a = props.row.product) == null ? void 0 : _a.name) ? capitalizeFirstLetter(props.row.product.name) : "No data available"), 1)
                  ];
                }),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-category": withCtx((props) => [
              createVNode(QTd, {
                key: "name",
                props
              }, {
                default: withCtx(() => [
                  props.row.category ? (openBlock(), createBlock(QBadge, {
                    key: 0,
                    color: getBadgeCategoryColor(props.row.category)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(props.row.category), 1)
                    ]),
                    _: 2
                  }, 1032, ["color"])) : (openBlock(), createElementBlock("span", _hoisted_7$7, "No data available"))
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-price": withCtx((props) => [
              createVNode(QTd, {
                props,
                class: "cursor-pointer"
              }, {
                default: withCtx(() => [
                  createBaseVNode("span", null, [
                    createTextVNode(toDisplayString(formatPrice(props.row.price)) + " ", 1),
                    createVNode(QTooltip, {
                      class: "bg-blue-grey-8",
                      offset: [10, 10]
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Edit Price")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(QPopupEdit, {
                    "onUpdate:modelValue": [(val) => updatedPrice(props.row, val), ($event) => props.row.price = $event],
                    modelValue: props.row.price,
                    "auto-save": ""
                  }, {
                    default: withCtx((scope) => [
                      createVNode(QInput, {
                        modelValue: scope.value,
                        "onUpdate:modelValue": ($event) => scope.value = $event,
                        dense: "",
                        mask: "#####",
                        autofocus: "",
                        counter: "",
                        onKeyup: withKeys(scope.set, ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"])
                    ]),
                    _: 2
                  }, 1032, ["onUpdate:modelValue", "modelValue"])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-total_quantity": withCtx((props) => [
              createVNode(QTd, {
                "auto-width": "",
                class: "cursor-pointer text-center"
              }, {
                default: withCtx(() => [
                  createBaseVNode("span", null, [
                    createTextVNode(toDisplayString(props.row.total_quantity ? props.row.total_quantity : "Set Quantity") + " ", 1),
                    createVNode(QTooltip, {
                      class: "bg-blue-grey-8",
                      offset: [10, 10]
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Edit quantity")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(QPopupEdit, {
                    "onUpdate:modelValue": [(val) => updatedTotalQuantity(props.row, val), ($event) => props.row.total_quantity = $event],
                    modelValue: props.row.total_quantity,
                    "auto-save": ""
                  }, {
                    default: withCtx((scope) => [
                      createVNode(QInput, {
                        modelValue: scope.value,
                        "onUpdate:modelValue": ($event) => scope.value = $event,
                        dense: "",
                        autofocus: "",
                        counter: "",
                        mask: "###",
                        onKeyup: withKeys(scope.set, ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"])
                    ]),
                    _: 2
                  }, 1032, ["onUpdate:modelValue", "modelValue"])
                ]),
                _: 2
              }, 1024)
            ]),
            "body-cell-action": withCtx((props) => [
              createVNode(QTd, {
                class: "q-gutter-x-md",
                props
              }, {
                default: withCtx(() => [
                  createVNode(ProductDelete, { delete: props }, null, 8, ["delete"])
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
var ProductTable = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-592d46f2"], ["__file", "ProductTable.vue"]]);
const _hoisted_1$m = { class: "q-gutter-sm" };
const _sfc_main$o = {
  __name: "ProductPage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$m, [
        createBaseVNode("div", null, [
          createVNode(ProductTable)
        ])
      ]);
    };
  }
};
var ProductPage = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__file", "ProductPage.vue"]]);
const useBranchRawMaterialsStore = defineStore(
  "branchRawMaterial",
  () => {
    const branchRawMaterial = ref(null);
    const branchRawMaterials = ref([]);
    const branchId = ref([]);
    const rawMaterialsStore = useRawMaterialsStore();
    const rawMaterialsData = computed(() => rawMaterialsStore.rawMaterials);
    const fetchBranchRawMaterials = async (branchId2) => {
      const response = await api.get(`/api/branch/${branchId2}/rawMaterials`);
      branchRawMaterials.value = response.data;
    };
    const createBranchRawMaterials = async (data) => {
      Plugin.show();
      try {
        const response = await api.post(`/api/branch-raw-materials`, data);
        if (response.data.message === "Branch Raw Materials saved successfully") {
          const rawMaterials = rawMaterialsData.value.find(
            (item) => item.id === data.ingredients_id
          );
          const newRawMaterials = {
            ...response.data,
            ingredients: rawMaterials ? rawMaterials : { name: "No Name", code: "Unknown" },
            total_quantity: data.total_quantity
          };
          branchRawMaterials.value.unshift(newRawMaterials);
          Notify.create({
            type: "positive",
            message: "Branch Raw Materials saved successfully",
            position: "top"
          });
        } else if (response.data.message === "The RawMaterials already exists in this branch.") {
          Notify.create({
            type: "warning",
            message: "The Raw Materials already exists in this branch.",
            position: "top"
          });
        }
      } catch (error) {
        console.log(error);
        Notify.create({
          type: "negative",
          message: "An error occurred while saving the branch product.",
          position: "top"
        });
      } finally {
        Plugin.hide();
      }
    };
    const updateBranchRawMaterials = async (id) => {
      await api.put(`/api/update-branch-products/${id}`, { price: newPrice });
      const index = branchRawMaterials.value.findIndex(
        (item) => item.id === id
      );
      if (index !== -1) {
        branchRawMaterials.value[index].price = newPrice;
      }
    };
    const deleteBranchRawMaterials = async (id) => {
      await api.delete(`/api/branch-raw-materials/${id}`);
      branchRawMaterials.value = branchRawMaterials.value.filter(
        (branchRawMaterial2) => branchRawMaterial2.id !== id
      );
    };
    return {
      branchId,
      branchRawMaterial,
      branchRawMaterials,
      fetchBranchRawMaterials,
      createBranchRawMaterials,
      updateBranchRawMaterials,
      deleteBranchRawMaterials
    };
  }
);
const _hoisted_1$l = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Create Branch Raw Materials", -1);
const _hoisted_2$l = { class: "q-mb-lg" };
const _hoisted_3$h = {
  key: 0,
  class: "custom-list z-top"
};
const _hoisted_4$d = /* @__PURE__ */ createBaseVNode("div", null, "Raw Materials Code", -1);
const _hoisted_5$7 = /* @__PURE__ */ createBaseVNode("div", null, "Raw Materials Name", -1);
const _hoisted_6$6 = /* @__PURE__ */ createBaseVNode("div", null, "Category", -1);
const _hoisted_7$6 = /* @__PURE__ */ createBaseVNode("div", null, "Quantity", -1);
const _sfc_main$n = {
  __name: "RawMaterialsCreate",
  setup(__props) {
    const route = useRoute();
    const rawMaterialsStore = useRawMaterialsStore();
    const rawMaterialsData = computed(() => rawMaterialsStore.rawMaterials);
    const branchRawMaterials = useBranchRawMaterialsStore();
    const searchQuery = ref("");
    const search = async () => {
      rawMaterialsStore.searchRawMaterials(searchQuery.value);
    };
    const isFormValid = computed(() => {
      return addNewBranchRawMaterials.total_quantity !== "";
    });
    const dialog = ref(false);
    const open_create_bread_dialog = () => {
      dialog.value = true;
    };
    const dismiss = () => {
      clearForm2();
      dialog.value = false;
    };
    const autoFillRawMaterials = (data) => {
      addNewBranchRawMaterials.ingredients_id = data.id;
      addNewBranchRawMaterials.ingredient_name = data.name;
      addNewBranchRawMaterials.ingredient_code = data.code;
      addNewBranchRawMaterials.category = data.category;
      addNewBranchRawMaterials.unit = data.unit;
      searchQuery.value = "";
    };
    const addNewBranchRawMaterials = reactive({
      ingredients_id: "",
      ingredient_name: "",
      ingredient_code: "",
      total_quantity: "",
      category: "",
      unit: "",
      branch_id: route.params.branch_id
    });
    const clearForm2 = () => {
      addNewBranchRawMaterials.ingredients_id = "", addNewBranchRawMaterials.ingredient_name = "", addNewBranchRawMaterials.ingredient_code = "", addNewBranchRawMaterials.total_quantity = "", addNewBranchRawMaterials.ingredients_id = "";
      addNewBranchRawMaterials.category = "";
      addNewBranchRawMaterials.unit = "";
    };
    const save = async () => {
      try {
        const { product_name, ...data } = addNewBranchRawMaterials;
        await branchRawMaterials.createBranchRawMaterials(data);
        console.log("data to send", data);
        clearForm2();
        dialog.value = false;
      } catch (error) {
        console.log(error);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          outline: "",
          class: "text-dark q-pa-sm",
          dense: "",
          elevated: "",
          icon: "add_circle",
          label: "Create Branch Raw Material",
          onClick: open_create_bread_dialog,
          style: { "background": "#f43f5e" }
        }),
        createVNode(QDialog, {
          modelValue: dialog.value,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => dialog.value = $event),
          persistent: ""
        }, {
          default: withCtx(() => [
            createVNode(QCard, {
              class: "my-card",
              style: { "width": "400px", "max-width": "500px", "min-width": "100px" }
            }, {
              default: withCtx(() => [
                createVNode(QCardSection, {
                  class: "row items-center text-white",
                  style: { "background-color": "#ef4444" }
                }, {
                  default: withCtx(() => [
                    _hoisted_1$l,
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
                createVNode(QCardSection, { class: "q-ma-md q-gutter-y-sm" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2$l, [
                      createVNode(QInput, {
                        modelValue: searchQuery.value,
                        "onUpdate:modelValue": [
                          _cache[0] || (_cache[0] = ($event) => searchQuery.value = $event),
                          search
                        ],
                        debounce: "1000",
                        outlined: "",
                        rounded: "",
                        placeholder: "Search Raw Materials",
                        dense: ""
                      }, {
                        append: withCtx(() => [
                          createBaseVNode("div", null, [
                            createVNode(QIcon, { name: "search" })
                          ])
                        ]),
                        default: withCtx(() => [
                          searchQuery.value ? (openBlock(), createElementBlock("div", _hoisted_3$h, [
                            createVNode(QCard, null, {
                              default: withCtx(() => [
                                createVNode(QList, { separator: "" }, {
                                  default: withCtx(() => {
                                    var _a;
                                    return [
                                      !((_a = rawMaterialsData.value) == null ? void 0 : _a.length) ? (openBlock(), createBlock(QItem, { key: 0 }, {
                                        default: withCtx(() => [
                                          createTextVNode(" No record found. ")
                                        ]),
                                        _: 1
                                      })) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(rawMaterialsData.value, (rawMaterials) => {
                                        return openBlock(), createBlock(QItem, {
                                          onClick: ($event) => autoFillRawMaterials(rawMaterials),
                                          key: rawMaterials.id,
                                          clickable: ""
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(QItemSection, null, {
                                              default: withCtx(() => [
                                                createVNode(QItemLabel, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(rawMaterials.name), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
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
                    createBaseVNode("div", null, [
                      _hoisted_4$d,
                      createVNode(QInput, {
                        modelValue: addNewBranchRawMaterials.ingredient_code,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => addNewBranchRawMaterials.ingredient_code = $event),
                        readonly: "",
                        dense: "",
                        outlined: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    createBaseVNode("div", null, [
                      _hoisted_5$7,
                      createVNode(QInput, {
                        modelValue: addNewBranchRawMaterials.ingredient_name,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => addNewBranchRawMaterials.ingredient_name = $event),
                        readonly: "",
                        dense: "",
                        outlined: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    createBaseVNode("div", null, [
                      _hoisted_6$6,
                      createVNode(QInput, {
                        modelValue: addNewBranchRawMaterials.category,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => addNewBranchRawMaterials.category = $event),
                        readonly: "",
                        dense: "",
                        outlined: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    createBaseVNode("div", null, [
                      _hoisted_7$6,
                      createVNode(QInput, {
                        modelValue: addNewBranchRawMaterials.total_quantity,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => addNewBranchRawMaterials.total_quantity = $event),
                        type: "number",
                        outlined: "",
                        suffix: addNewBranchRawMaterials.unit || "",
                        dense: "",
                        rules: [
                          (val) => val && val.length > 0 || "Total quantity is required"
                        ]
                      }, null, 8, ["modelValue", "suffix", "rules"])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardActions, {
                  class: "row q-ma-md",
                  align: "right"
                }, {
                  default: withCtx(() => [
                    createVNode(QBtn, {
                      class: "glossy",
                      color: "grey-9",
                      label: "Dismiss",
                      onClick: dismiss
                    }),
                    createVNode(QBtn, {
                      class: "glossy",
                      color: "teal",
                      label: "Create",
                      onClick: save,
                      disable: !isFormValid.value
                    }, null, 8, ["disable"])
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
var RawMaterialsCreate = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__file", "RawMaterialsCreate.vue"]]);
var RawMaterialsTableDelete_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$b = (n) => (pushScopeId("data-v-17ad5e9f"), n = n(), popScopeId(), n);
const _hoisted_1$k = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mb-xs" }, "Confirm Deletion", -1));
const _hoisted_2$k = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ createBaseVNode("p", { class: "text-body2 q-mb-none" }, " Are you sure you want to delete this item? This action cannot be undone. ", -1));
const _sfc_main$m = {
  __name: "RawMaterialsTableDelete",
  props: ["delete"],
  setup(__props) {
    const branchRawMaterials = useBranchRawMaterialsStore();
    const props = __props;
    const onDelete = async () => {
      console.log("clickkkd");
      try {
        await branchRawMaterials.deleteBranchRawMaterials(props.delete.row.id);
        Notify.create({
          type: "negative",
          icon: "warning",
          message: `Raw Materials ${props.delete.row.name}  successfully deleted`,
          timeout: 1e3,
          position: "top"
        });
        dialog.value = false;
      } catch (error) {
        console.error(error.message);
      }
    };
    const dialog = ref(false);
    const open_dialog = () => {
      dialog.value = true;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          onClick: open_dialog,
          color: "negative",
          icon: "delete",
          size: "sm",
          flat: "",
          round: "",
          dense: "",
          align: "center"
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
            createVNode(QCard, null, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "q-pa-md q-rounded q-elevate-2 bg-white text-grey-9" }, {
                  default: withCtx(() => [
                    _hoisted_1$k,
                    _hoisted_2$k
                  ]),
                  _: 1
                }),
                createVNode(QSeparator, { class: "q-mb-md" }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
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
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ], 64);
    };
  }
};
var RawMaterialsTableDelete = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-17ad5e9f"], ["__file", "RawMaterialsTableDelete.vue"]]);
var RawMaterialsTable_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$a = (n) => (pushScopeId("data-v-74a3fea6"), n = n(), popScopeId(), n);
const _hoisted_1$j = { class: "row justify-between" };
const _hoisted_2$j = { class: "q-my-sm" };
const _hoisted_3$g = {
  key: 0,
  class: "spinner-wrapper"
};
const _hoisted_4$c = { key: 1 };
const _hoisted_5$6 = {
  key: 0,
  class: "data-error"
};
const _hoisted_6$5 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-ml-sm text-h6" }, "No data available", -1));
const _hoisted_7$5 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-white" }, "Edit Available Stocks", -1));
const _hoisted_8$4 = { class: "row justify-center q-gutter-x-md" };
const _sfc_main$l = {
  __name: "RawMaterialsTable",
  setup(__props) {
    const route = useRoute();
    const branchId = route.params.branch_id;
    const branchRawMaterialsStore = useBranchRawMaterialsStore();
    const filter = ref("");
    const loading = ref(true);
    const branchRawMaterials = ref([]);
    const showNoDataMessage = ref(false);
    const pagination = ref({
      rowsPerPage: 0
    });
    const branchRawMaterialsRows = computed(
      () => branchRawMaterialsStore.branchRawMaterials
    );
    const filteredRows = computed(() => {
      if (!filter.value) {
        return branchRawMaterialsRows.value;
      }
      return branchRawMaterialsRows.value.filter(
        (row) => row.name.toLowerCase().includes(filter.value.toLowerCase())
      );
    });
    onMounted(async () => {
      console.log("props.branchId in onMounted:", branchId);
      if (branchId) {
        await reloadTableData(branchId);
      }
    });
    const reloadTableData = async (branchId2) => {
      try {
        loading.value = true;
        const response = await branchRawMaterialsStore.fetchBranchRawMaterials(
          branchId2
        );
        branchRawMaterialsRows.value = response;
        if (!branchRawMaterialsRows.value.length) {
          showNoDataMessage.value = true;
        }
        console.log("Branch Raw Materials", branchRawMaterialsRows.value);
      } catch (error) {
        console.log("Error fetching branch product:", error);
        showNoDataMessage.value = true;
      } finally {
        loading.value = false;
      }
    };
    async function updatedStocks(data, val) {
      try {
        const response = await api.put(
          "/api/update-branch-rawMaterials/" + data.id,
          {
            total_quantity: parseInt(val)
          }
        );
        if (response.status === 200) {
          const i = branchRawMaterials.value.findIndex(
            (item) => item.id == data.id
          );
          branchRawMaterials.value[i] = parseInt(val);
          Notify.create({
            type: "positive",
            message: response.data.message,
            timout: 1e3,
            position: "top"
          });
        }
      } catch (error) {
        console.error("Error updating price:", error);
      }
    }
    watch(filter, async (newFilter) => {
      loading.value = true;
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      loading.value = false;
      showNoDataMessage.value = filteredRows.value.length === 0;
    });
    const getRawMaterialBadgeColor = (row) => {
      const totalQuantity = row.total_quantity;
      const unit = row.ingredients.unit;
      if (unit === "Grams" && totalQuantity < 1e3) {
        return "bg-red";
      }
      let stockValue;
      if (totalQuantity >= 1e3) {
        stockValue = totalQuantity / 1e3;
      } else {
        stockValue = totalQuantity;
      }
      if (stockValue < 5) {
        if (stockValue <= 2) {
          return "bg-red";
        } else if (stockValue <= 3) {
          return "bg-warning";
        } else {
          return "bg-warning";
        }
      } else {
        return "bg-positive";
      }
    };
    const formatTotalQuantity = (row) => {
      const totalQuantity = row.total_quantity;
      const unit = row.ingredients.unit;
      if (totalQuantity > 1e3) {
        const totalQuantityKilo = (totalQuantity / 1e3).toFixed(2);
        if (totalQuantityKilo.endsWith(".00")) {
          return `${Math.round(totalQuantity / 1e3)} kilos`;
        } else {
          return `${totalQuantityKilo} kilos`;
        }
      } else if (totalQuantity > 1) {
        return `${totalQuantity} ${unit}`;
      } else {
        return `${totalQuantity} ${unit}`;
      }
    };
    const ingredientsColumns = [
      {
        name: "code",
        label: "Raw Materials Code",
        align: "center",
        field: (row) => {
          var _a, _b;
          return (_b = (_a = row == null ? void 0 : row.ingredients) == null ? void 0 : _a.code) != null ? _b : "No Code";
        },
        format: (val) => `${val}`,
        sortable: true
      },
      {
        name: "name",
        label: "Raw Materials Name",
        align: "center",
        field: (row) => {
          var _a, _b;
          return (_b = (_a = row == null ? void 0 : row.ingredients) == null ? void 0 : _a.name) != null ? _b : "No Code";
        },
        format: (val) => `${val}`,
        sortable: true
      },
      {
        name: "total_quantity",
        label: "Available Stocks",
        align: "center",
        field: "total_quantity",
        sortable: true
      },
      {
        name: "action",
        label: "Action",
        align: "center",
        sortable: true
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$j, [
          createBaseVNode("div", null, [
            createVNode(QInput, {
              class: "q-pb-lg q-pl-md",
              modelValue: filter.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filter.value = $event),
              outlined: "",
              placeholder: "Search",
              debounce: "1000",
              style: { "width": "450px", "max-width": "5000px", "min-width": "100px" },
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
          createBaseVNode("div", _hoisted_2$j, [
            createVNode(RawMaterialsCreate)
          ])
        ]),
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_3$g, [
          createVNode(QSpinnerDots, {
            size: "50px",
            color: "primary"
          })
        ])) : (openBlock(), createElementBlock("div", _hoisted_4$c, [
          filteredRows.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_5$6, [
            createVNode(QIcon, {
              name: "warning",
              color: "warning",
              size: "4em"
            }),
            _hoisted_6$5
          ])) : (openBlock(), createBlock(QTable, {
            key: 1,
            class: "table-container sticky-header",
            filter: filter.value,
            "virtual-scroll-sticky-size-start": 48,
            flat: "",
            columns: ingredientsColumns,
            rows: filteredRows.value,
            "row-key": "name",
            "virtual-scroll": "",
            pagination: pagination.value,
            "onUpdate:pagination": _cache[1] || (_cache[1] = ($event) => pagination.value = $event),
            "rows-per-page-options": [0],
            "hide-bottom": "",
            style: { "height": "340px" }
          }, {
            "body-cell-total_quantity": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createVNode(QBadge, {
                    square: "",
                    class: normalizeClass(["text-white cursor-pointer", getRawMaterialBadgeColor(props.row)])
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(formatTotalQuantity(props.row)) + " ", 1),
                      createVNode(QTooltip, {
                        class: "bg-blue-grey-8",
                        offset: [10, 10]
                      }, {
                        default: withCtx(() => [
                          _hoisted_7$5
                        ]),
                        _: 1
                      }),
                      createVNode(QPopupEdit, {
                        "onUpdate:modelValue": [(val) => updatedStocks(props.row, val), ($event) => props.row.total_quantity = $event],
                        modelValue: props.row.total_quantity,
                        "auto-save": ""
                      }, {
                        default: withCtx((scope) => [
                          createVNode(QInput, {
                            modelValue: scope.value,
                            "onUpdate:modelValue": ($event) => scope.value = $event,
                            dense: "",
                            suffix: props.row.ingredients.unit,
                            mask: "########",
                            autofocus: "",
                            counter: "",
                            onKeyup: withKeys(scope.set, ["enter"])
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "suffix", "onKeyup"])
                        ]),
                        _: 2
                      }, 1032, ["onUpdate:modelValue", "modelValue"])
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
                  createBaseVNode("div", _hoisted_8$4, [
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
var RawMaterialsTable = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-74a3fea6"], ["__file", "RawMaterialsTable.vue"]]);
const _hoisted_1$i = { class: "q-gutter-sm" };
const _hoisted_2$i = { class: "q-gutter-x-sm" };
const _sfc_main$k = {
  __name: "RawMaterialsPage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$i, [
        createBaseVNode("div", _hoisted_2$i, [
          createVNode(QBadge, {
            label: "Good",
            class: "text-white",
            color: "positive"
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
        createBaseVNode("div", null, [
          createVNode(RawMaterialsTable)
        ])
      ]);
    };
  }
};
var RawMaterialsPage = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__file", "RawMaterialsPage.vue"]]);
var BakerReportPanel_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$9 = (n) => (pushScopeId("data-v-239e42ee"), n = n(), popScopeId(), n);
const _hoisted_1$h = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createBaseVNode("div", { class: "row justify-between" }, [
  /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Baker Report")
], -1));
const _hoisted_2$h = { class: "text-subtitle1 text-weight-regular" };
const _hoisted_3$f = { class: "row q-gutter-md" };
const _hoisted_4$b = { class: "text-h6 row justify-between" };
const _hoisted_5$5 = { class: "row items-start q-gutter-x-md text-overline elegant-text" };
const _hoisted_6$4 = { class: "row q-gutter-x-sm q-gutter-y-xm" };
const _hoisted_7$4 = { class: "row q-gutter-x-sm q-gutter-y-xm" };
const _hoisted_8$3 = { class: "row q-gutter-x-sm" };
const _hoisted_9$3 = { class: "row q-gutter-x-sm" };
const _hoisted_10$1 = { class: "row" };
const _hoisted_11$1 = { class: "col-6" };
const _hoisted_12$1 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createBaseVNode("div", {
  class: "text-subtitle1",
  align: "center"
}, "Ingredients", -1));
const _hoisted_13$1 = { class: "row justify-center q-gutter-x-lg q-pa-lg" };
const _hoisted_14$1 = { class: "row items-start" };
const _hoisted_15$1 = { class: "col-6" };
const _hoisted_16$1 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createBaseVNode("div", {
  class: "text-subtitle1",
  align: "center"
}, "Bread", -1));
const _hoisted_17 = { class: "row justify-center q-gutter-x-lg q-pa-lg" };
const _hoisted_18 = { key: 0 };
const _hoisted_19 = { key: 1 };
const _hoisted_20 = { key: 2 };
const _hoisted_21 = { class: "q-ma-sm" };
const _hoisted_22 = {
  class: "q-ma-sm",
  align: "center"
};
const _hoisted_23 = ["src"];
const _sfc_main$j = {
  __name: "BakerReportPanel",
  props: ["bakersReport"],
  setup(__props) {
    pdfmake.exports.vfs = vfs_fontes;
    const props = __props;
    const reportsData = props.bakersReport;
    console.log("Bakers Report", props.bakersReport);
    const maximizedToggle = ref(true);
    const printDialog = ref(false);
    const pdfUrl = ref("");
    const formatDate = (dateString) => {
      return quasarDate.formatDate(dateString, "MMM. DD, YYYY");
    };
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
      return `${firstname} ${middlename} ${lastname}`.trim();
    };
    const formatTimeFromDB = (dateString) => {
      const date = new Date(dateString);
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      };
      return date.toLocaleTimeString(void 0, options);
    };
    const getBadgeStatusColor = (status) => {
      switch (status) {
        case "pending":
          return "orange";
        case "declined":
          return "negative";
        case "confirmed":
          return "green";
        default:
          return "grey";
      }
    };
    const getBreadReports = (reportsData2) => {
      if (!reportsData2) {
        console.error("No bakerReport provided");
        return [];
      }
      if (reportsData2.recipe_category === "Filling") {
        return reportsData2.filling_bakers_reports || [];
      } else if (reportsData2.recipe_category === "Dough") {
        return reportsData2.bread_production_reports || [];
      } else {
        return [];
      }
    };
    const generateDocDefinition = (bakerReport) => {
      var _a, _b, _c, _d;
      console.log("bakerReport", bakerReport);
      const recipeName = `${bakerReport.branch_recipe.recipe.name} (${bakerReport.recipe_category})`;
      const target = bakerReport.branch_recipe.recipe.target;
      const actualTarget = bakerReport.actual_target;
      const kilo = bakerReport.kilo;
      const over = bakerReport.over;
      const short = bakerReport.short;
      const summaryTable = {
        table: {
          widths: ["50%", "50%"],
          body: [
            [
              { text: "Recipe Name", style: "tableHeader", alignment: "left" },
              {
                text: recipeName,
                style: "tableHeader",
                alignment: "center"
              }
            ],
            [
              { text: "Target per Kilo", style: "tableHeader", alignment: "left" },
              {
                text: `${target} pcs`,
                style: "tableHeader",
                alignment: "center"
              }
            ],
            [
              { text: "Actual Target", style: "tableHeader", alignment: "left" },
              {
                text: `${actualTarget} pcs`,
                style: "tableHeader",
                alignment: "center"
              }
            ],
            [
              { text: "Kilo", style: "tableHeader", alignment: "left" },
              {
                text: `${kilo} kg/s`,
                style: "tableHeader",
                alignment: "center"
              }
            ],
            [
              { text: "Over", style: "tableHeader", alignment: "left" },
              {
                text: `${over} pcs`,
                style: "tableHeader",
                alignment: "center"
              }
            ],
            [
              { text: "Short", style: "tableHeader", alignment: "left" },
              {
                text: `${short} pcs`,
                style: "tableHeader",
                alignment: "center"
              }
            ]
          ]
        },
        layout: {
          paddingLeft: () => 2,
          paddingRight: () => 2,
          paddingTop: () => 2,
          paddingBottom: () => 2
        }
      };
      return {
        content: [
          { text: "Baker Report", style: "header", alignment: "center" },
          {
            columns: [
              {
                text: `Branch Name: ${bakerReport.branch.name || "No name available"}
                Baker: ${formatFullname(
                  ((_a = bakerReport == null ? void 0 : bakerReport.user) == null ? void 0 : _a.employee) || "Unknown Baker Name"
                )}
                Recipe: ${((_b = bakerReport.recipe) == null ? void 0 : _b.name) || "Unknown Recipe"} (${bakerReport.recipe_category || "Unknown Category"})
             `,
                width: "80%",
                margin: [0, 0, 0, 10]
              },
              {
                text: `Date: ${formatDate(
                  ((_c = props.bakersReport[0]) == null ? void 0 : _c.created_at) || ((_d = props.bakersReport[1]) == null ? void 0 : _d.created_at) || "No name available"
                )}
                Time: ${formatTimeFromDB(bakerReport.created_at)}
                Status: ${capitalizeFirstLetter(bakerReport.status)}`,
                margin: [0, 0, 0, 10]
              }
            ]
          },
          {
            columns: [
              {
                width: "50%",
                stack: [
                  {
                    text: "Bread Production",
                    style: "subheader",
                    alignment: "center"
                  },
                  {
                    table: {
                      headerRows: 1,
                      widths: ["*", "*"],
                      body: [
                        [
                          {
                            text: "Bread Name",
                            style: "tableHeader",
                            alignment: "center"
                          },
                          {
                            text: "Production",
                            style: "tableHeader",
                            alignment: "center"
                          }
                        ],
                        ...getBreadReports(bakerReport).map((breadReport) => {
                          var _a2;
                          return [
                            {
                              text: ((_a2 = breadReport == null ? void 0 : breadReport.bread) == null ? void 0 : _a2.name) || "Unknown Bread",
                              style: "body"
                            },
                            {
                              text: bakerReport.recipe_category === "Filling" ? `${(breadReport == null ? void 0 : breadReport.filling_production) || "0"} pcs` : `${breadReport == null ? void 0 : breadReport.bread_new_production} pcs`,
                              style: "body",
                              alignment: "center"
                            }
                          ];
                        })
                      ]
                    }
                  }
                ],
                columnGap: 10
              },
              {
                width: "50%",
                stack: [
                  {
                    text: "Ingredients",
                    style: "subheader",
                    alignment: "center"
                  },
                  {
                    table: {
                      headerRows: 1,
                      widths: ["*", "*"],
                      body: [
                        [
                          {
                            text: "Ingredient Code",
                            style: "tableHeader",
                            alignment: "center"
                          },
                          {
                            text: "Quantity",
                            style: "tableHeader",
                            alignment: "center"
                          }
                        ],
                        ...(bakerReport.ingredient_bakers_reports || []).map(
                          (ingredient) => {
                            var _a2, _b2;
                            return [
                              {
                                text: ((_a2 = ingredient == null ? void 0 : ingredient.ingredients) == null ? void 0 : _a2.code) || "Unknown Ingredient",
                                style: "body"
                              },
                              {
                                text: `${(ingredient == null ? void 0 : ingredient.quantity) || "Unknown Quantity"} ${((_b2 = ingredient == null ? void 0 : ingredient.ingredients) == null ? void 0 : _b2.unit) || ""}`,
                                style: "body",
                                alignment: "center"
                              }
                            ];
                          }
                        )
                      ]
                    }
                  }
                ],
                columnGap: 10
              }
            ],
            columnGap: 20
          },
          {
            canvas: [
              {
                type: "line",
                x1: 0,
                y1: 25,
                x2: 555,
                y2: 25,
                lineWidth: 1,
                dash: { length: 5, space: 5 },
                lineColor: "#000000",
                margin: [0, 20, 0, 0]
              }
            ]
          },
          {
            margin: [0, 20, 0, 0],
            stack: [
              { text: "Summary", style: "subheader", alignment: "center" },
              summaryTable
            ]
          }
        ],
        styles: {
          header: { fontSize: 16, bold: true },
          subheader: { fontSize: 12, bold: true, margin: [0, 10, 0, 5] },
          tableHeader: { bold: true, fontSize: 10, color: "black" },
          body: { fontSize: 8 }
        },
        pageMargins: [20, 20, 20, 20]
      };
    };
    const openPrintDialog = (bakerReport) => {
      const docDefinition = generateDocDefinition(bakerReport);
      pdfmake.exports.createPdf(docDefinition).getDataUrl((dataUrl) => {
        pdfUrl.value = dataUrl;
        printDialog.value = true;
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(QCard, { class: "my-card q-pa-md" }, {
          default: withCtx(() => {
            var _a, _b, _c, _d, _e, _f;
            return [
              _hoisted_1$h,
              createBaseVNode("div", _hoisted_2$h, [
                createBaseVNode("div", null, " Name: " + toDisplayString(formatFullname(
                  ((_b = (_a = unref(reportsData)[0]) == null ? void 0 : _a.user) == null ? void 0 : _b.employee) || ((_d = (_c = unref(reportsData)[1]) == null ? void 0 : _c.user) == null ? void 0 : _d.employee) || "No name available"
                )), 1),
                createBaseVNode("div", null, " Date: " + toDisplayString(`${formatDate(
                  ((_e = props.bakersReport[0]) == null ? void 0 : _e.created_at) || ((_f = props.bakersReport[1]) == null ? void 0 : _f.created_at) || "No name available"
                )}`), 1)
              ]),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_3$f, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(reportsData), (bakerReport, index) => {
                      return openBlock(), createElementBlock("div", {
                        key: index,
                        class: "row q-gutter-sm"
                      }, [
                        createVNode(QCard, {
                          flat: "",
                          dense: "",
                          bordered: "",
                          class: "q-pa-md q-my-sm user-card",
                          style: { "width": "675px", "max-width": "1500px" }
                        }, {
                          default: withCtx(() => {
                            var _a2;
                            return [
                              createBaseVNode("div", _hoisted_4$b, [
                                createBaseVNode("div", null, toDisplayString(`${capitalizeFirstLetter(
                                  (_a2 = bakerReport.branch_recipe.recipe) == null ? void 0 : _a2.name
                                ) || "Unknown Recipe"} (${bakerReport.recipe_category || "Unknown Category"})`), 1),
                                createVNode(QBtn, {
                                  padding: "xs md",
                                  label: "Print",
                                  icon: "print",
                                  outline: "",
                                  onClick: ($event) => openPrintDialog(bakerReport),
                                  class: "user-button"
                                }, null, 8, ["onClick"])
                              ]),
                              createBaseVNode("div", null, "Time: " + toDisplayString(formatTimeFromDB(bakerReport.created_at)), 1),
                              createBaseVNode("div", null, [
                                createTextVNode(" Status: "),
                                createVNode(QBadge, {
                                  align: "middle",
                                  color: getBadgeStatusColor(bakerReport.status)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(capitalizeFirstLetter(bakerReport.status)), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["color"])
                              ]),
                              createVNode(QCardSection, null, {
                                default: withCtx(() => [
                                  createBaseVNode("div", _hoisted_5$5, [
                                    createBaseVNode("div", _hoisted_6$4, [
                                      createTextVNode(" Actual Target: "),
                                      createBaseVNode("div", null, [
                                        createVNode(QBadge, {
                                          outline: "",
                                          align: "middle",
                                          color: "teal"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(`${(bakerReport == null ? void 0 : bakerReport.actual_target) || "No target"} pcs`), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ])
                                    ]),
                                    createBaseVNode("div", _hoisted_7$4, [
                                      createTextVNode(" Kilo: "),
                                      createBaseVNode("div", null, [
                                        createVNode(QBadge, {
                                          outline: "",
                                          align: "middle",
                                          color: "teal"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(`${(bakerReport == null ? void 0 : bakerReport.kilo) || "No Kilo"} kgs`), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ])
                                    ]),
                                    createBaseVNode("div", _hoisted_8$3, [
                                      createTextVNode(" Over: "),
                                      createBaseVNode("div", null, [
                                        createVNode(QBadge, {
                                          outline: "",
                                          align: "middle",
                                          color: "teal"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(`${bakerReport.over} pcs`), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ])
                                    ]),
                                    createBaseVNode("div", _hoisted_9$3, [
                                      createTextVNode(" Short: "),
                                      createBaseVNode("div", null, [
                                        createVNode(QBadge, {
                                          outline: "",
                                          align: "middle",
                                          color: "teal"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(`${bakerReport.short} pcs`), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(QCardSection, null, {
                                default: withCtx(() => [
                                  createBaseVNode("div", _hoisted_10$1, [
                                    createBaseVNode("div", _hoisted_11$1, [
                                      _hoisted_12$1,
                                      createBaseVNode("div", _hoisted_13$1, [
                                        createBaseVNode("div", null, [
                                          (openBlock(true), createElementBlock(Fragment, null, renderList(bakerReport.ingredient_bakers_reports || [], (ingredient, index2) => {
                                            var _a3, _b2;
                                            return openBlock(), createElementBlock("div", {
                                              key: index2,
                                              class: "row justify-between q-gutter-y-lg q-gutter-x-xl text-weight-light"
                                            }, [
                                              createBaseVNode("div", null, toDisplayString(((_a3 = ingredient == null ? void 0 : ingredient.ingredients) == null ? void 0 : _a3.name) || "Unknown Ingredient"), 1),
                                              createBaseVNode("div", _hoisted_14$1, toDisplayString(`${(ingredient == null ? void 0 : ingredient.quantity) || "Unknown Quantity"} ${((_b2 = ingredient == null ? void 0 : ingredient.ingredients) == null ? void 0 : _b2.unit) || ""}`), 1)
                                            ]);
                                          }), 128))
                                        ])
                                      ])
                                    ]),
                                    createBaseVNode("div", _hoisted_15$1, [
                                      _hoisted_16$1,
                                      createBaseVNode("div", _hoisted_17, [
                                        createBaseVNode("div", null, [
                                          (openBlock(true), createElementBlock(Fragment, null, renderList(getBreadReports(
                                            bakerReport
                                          ), (breadReport, index2) => {
                                            var _a3;
                                            return openBlock(), createElementBlock("div", {
                                              key: index2,
                                              class: "row justify-between q-gutter-y-lg q-gutter-x-xl text-weight-light"
                                            }, [
                                              createBaseVNode("div", null, toDisplayString(((_a3 = breadReport == null ? void 0 : breadReport.bread) == null ? void 0 : _a3.name) || "Unknown Bread"), 1),
                                              createBaseVNode("div", null, [
                                                bakerReport.recipe_category === "Filling" ? (openBlock(), createElementBlock("div", _hoisted_18, toDisplayString(`${(breadReport == null ? void 0 : breadReport.filling_production) || "0"} pcs`), 1)) : bakerReport.recipe_category === "Dough" ? (openBlock(), createElementBlock("div", _hoisted_19, toDisplayString(`${breadReport == null ? void 0 : breadReport.bread_new_production} pcs`), 1)) : (openBlock(), createElementBlock("div", _hoisted_20, toDisplayString("0 pcs")))
                                              ])
                                            ]);
                                          }), 128))
                                        ])
                                      ])
                                    ])
                                  ])
                                ]),
                                _: 2
                              }, 1024)
                            ];
                          }),
                          _: 2
                        }, 1024)
                      ]);
                    }), 128))
                  ])
                ]),
                _: 1
              })
            ];
          }),
          _: 1
        }),
        createVNode(QDialog, {
          modelValue: printDialog.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => printDialog.value = $event),
          "backdrop-filter": _ctx.backdropFilter,
          maximized: maximizedToggle.value,
          "transition-show": "slide-up",
          "transition-hide": "slide-down"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_21, [
              createBaseVNode("div", _hoisted_22, [
                withDirectives((openBlock(), createBlock(QBtn, {
                  icon: "close",
                  flat: "",
                  dense: "",
                  round: "",
                  class: "text-white"
                }, {
                  default: withCtx(() => [
                    createVNode(QTooltip, null, {
                      default: withCtx(() => [
                        createTextVNode("Close")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })), [
                  [ClosePopup]
                ])
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("iframe", {
                  src: pdfUrl.value,
                  width: "100%",
                  height: "700px"
                }, null, 8, _hoisted_23)
              ])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "backdrop-filter", "maximized"])
      ]);
    };
  }
};
var BakerReportPanel = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-239e42ee"], ["__file", "BakerReportPanel.vue"]]);
const _hoisted_1$g = { class: "row justify-between text-white" };
const _hoisted_2$g = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Bread Report", -1);
const _hoisted_3$e = { class: "row justify-end q-mt-md" };
const _hoisted_4$a = { class: "text-h6" };
const _sfc_main$i = {
  __name: "BreadReport",
  props: ["reports"],
  setup(__props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
    const props = __props;
    console.log("Reports data structure:", props.reports);
    const capitalizeFirstLetter = (location) => {
      if (!location)
        return "";
      return location.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    };
    const breadReportColumns = [
      {
        name: "name",
        label: "Bread Name",
        field: (row) => {
          console.log("Row data:", row);
          return row.bread.name || "N/A";
        }
      },
      {
        name: "price",
        label: "Price",
        field: "price"
      },
      {
        name: "beginnings",
        label: "Beginnings (PCS)",
        field: "beginnings",
        format: (val) => `${val}`
      },
      {
        name: "newProduction",
        label: "New Production (PCS)",
        field: "new_production",
        format: (val) => `${val}`
      },
      {
        name: "remaining",
        label: "Remaining (PCS)",
        field: "remaining",
        format: (val) => `${val}`
      },
      {
        name: "breadOut",
        label: "Bread Out (PCS)",
        field: "bread_out",
        format: (val) => `${val}`
      },
      {
        name: "breadSold",
        label: "Bread Sold (PCS)",
        field: "bread_sold",
        format: (val) => `${val}`
      },
      {
        name: "total",
        label: "Bread Total (PCS)",
        field: "total",
        format: (val) => `${val}`
      },
      {
        name: "sales",
        label: "Total Sales",
        field: "sales"
      }
    ];
    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP"
      }).format(price);
    };
    const filteredRows = computed(() => {
      console.log("Filtered rows:", props.reports || []);
      return props.reports || [];
    });
    const overallTotal = computed(() => {
      const total = filteredRows.value.reduce((total2, row) => {
        const salesAmount = parseFloat(row.sales) || 0;
        console.log(`Adding salesAmount: ${salesAmount} to total: ${total2}`);
        return total2 + salesAmount;
      }, 0);
      console.log("Overall Total Sales computed as:", total);
      return total;
    });
    console.log("Overall Total Sales:", overallTotal.value);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QDialog, {
        ref_key: "dialogRef",
        ref: dialogRef,
        onHide: unref(onDialogHide)
      }, {
        default: withCtx(() => [
          createVNode(QCard, { style: { "width": "870px", "max-width": "80vw" } }, {
            default: withCtx(() => [
              createVNode(QCardSection, { style: { "background-color": "#795548" } }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_1$g, [
                    _hoisted_2$g,
                    withDirectives((openBlock(), createBlock(QBtn, {
                      icon: "close",
                      flat: "",
                      dense: "",
                      round: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(QTooltip, {
                          class: "bg-blue-grey-6",
                          delay: 200
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Close")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })), [
                      [ClosePopup]
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createVNode(QTable, {
                    filter: _ctx.filter,
                    "virtual-scroll-sticky-size-start": 48,
                    flat: "",
                    columns: breadReportColumns,
                    rows: filteredRows.value,
                    "row-key": "name",
                    "virtual-scroll": "",
                    pagination: _ctx.pagination,
                    "onUpdate:pagination": _cache[0] || (_cache[0] = ($event) => _ctx.pagination = $event),
                    "rows-per-page-options": [0],
                    "hide-bottom": "",
                    style: { "height": "350px" },
                    class: "table-container sticky-header"
                  }, {
                    "body-cell-name": withCtx((props2) => [
                      createVNode(QTd, { props: props2 }, {
                        default: withCtx(() => [
                          createBaseVNode("span", null, toDisplayString(`${capitalizeFirstLetter(props2.row.bread.name)}`), 1)
                        ]),
                        _: 2
                      }, 1032, ["props"])
                    ]),
                    "body-cell-price": withCtx((props2) => [
                      createVNode(QTd, { props: props2 }, {
                        default: withCtx(() => [
                          createBaseVNode("span", null, toDisplayString(`${formatPrice(props2.row.price)}`), 1)
                        ]),
                        _: 2
                      }, 1032, ["props"])
                    ]),
                    "body-cell-sales": withCtx((props2) => [
                      createVNode(QTd, { props: props2 }, {
                        default: withCtx(() => [
                          createBaseVNode("span", null, toDisplayString(`${formatPrice(props2.row.sales)}`), 1)
                        ]),
                        _: 2
                      }, 1032, ["props"])
                    ]),
                    _: 1
                  }, 8, ["filter", "rows", "pagination"])
                ]),
                _: 1
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_3$e, [
                    createBaseVNode("div", _hoisted_4$a, " Overall Total Sales: " + toDisplayString(formatPrice(overallTotal.value || "0")), 1)
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["onHide"]);
    };
  }
};
var BreadReport = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__file", "BreadReport.vue"]]);
const _hoisted_1$f = { class: "row justify-between text-white" };
const _hoisted_2$f = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Selecta Report", -1);
const _hoisted_3$d = { class: "row justify-end q-mt-md" };
const _hoisted_4$9 = { class: "text-h6" };
const _sfc_main$h = {
  __name: "SelectaReport",
  props: ["reports"],
  setup(__props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
    const props = __props;
    console.log("Reports data structure:", props.reports);
    const capitalizeFirstLetter = (location) => {
      if (!location)
        return "";
      return location.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    };
    const breadReportColumns = [
      {
        name: "name",
        label: "Selecta Name",
        field: (row) => {
          console.log("Row data:", row);
          return row.selecta.name || "N/A";
        }
      },
      {
        name: "price",
        label: "Price",
        field: "price"
      },
      {
        name: "beginnings",
        label: "Beginnings (PCS)",
        field: "beginnings",
        format: (val) => `${val}`
      },
      {
        name: "remaining",
        label: "Remaining (PCS)",
        field: "remaining",
        format: (val) => `${val}`
      },
      {
        name: "out",
        label: "Selecta Out (PCS)",
        field: "out",
        format: (val) => `${val}`
      },
      {
        name: "sold",
        label: "Selecta Sold (PCS)",
        field: "sold",
        format: (val) => `${val}`
      },
      {
        name: "sales",
        label: "Total Sales",
        field: "sales"
      }
    ];
    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP"
      }).format(price);
    };
    const filteredRows = computed(() => {
      console.log("Filtered rows:", props.reports || []);
      return props.reports || [];
    });
    const overallTotal = computed(() => {
      const total = filteredRows.value.reduce((total2, row) => {
        const salesAmount = parseFloat(row.sales) || 0;
        console.log(`Adding salesAmount: ${salesAmount} to total: ${total2}`);
        return total2 + salesAmount;
      }, 0);
      console.log("Overall Total Sales computed as:", total);
      return total;
    });
    console.log("Filtered Rows:", filteredRows.value);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QDialog, {
        ref_key: "dialogRef",
        ref: dialogRef,
        onHide: unref(onDialogHide)
      }, {
        default: withCtx(() => [
          createVNode(QCard, { style: { "width": "870px", "max-width": "80vw" } }, {
            default: withCtx(() => [
              createVNode(QCardSection, { style: { "background-color": "#f44336" } }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_1$f, [
                    _hoisted_2$f,
                    withDirectives((openBlock(), createBlock(QBtn, {
                      icon: "close",
                      flat: "",
                      dense: "",
                      round: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(QTooltip, {
                          class: "bg-blue-grey-6",
                          delay: 200
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Close")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })), [
                      [ClosePopup]
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createVNode(QTable, {
                    filter: _ctx.filter,
                    "virtual-scroll-sticky-size-start": 48,
                    flat: "",
                    columns: breadReportColumns,
                    rows: filteredRows.value,
                    "row-key": "name",
                    "virtual-scroll": "",
                    pagination: _ctx.pagination,
                    "onUpdate:pagination": _cache[0] || (_cache[0] = ($event) => _ctx.pagination = $event),
                    "rows-per-page-options": [0],
                    "hide-bottom": "",
                    style: { "height": "350px" },
                    class: "table-container sticky-header"
                  }, {
                    "body-cell-name": withCtx((props2) => [
                      createVNode(QTd, { props: props2 }, {
                        default: withCtx(() => [
                          createBaseVNode("span", null, toDisplayString(`${capitalizeFirstLetter(props2.row.selecta.name)}`), 1)
                        ]),
                        _: 2
                      }, 1032, ["props"])
                    ]),
                    "body-cell-price": withCtx((props2) => [
                      createVNode(QTd, { props: props2 }, {
                        default: withCtx(() => [
                          createBaseVNode("span", null, toDisplayString(`${formatPrice(props2.row.price)}`), 1)
                        ]),
                        _: 2
                      }, 1032, ["props"])
                    ]),
                    "body-cell-sales": withCtx((props2) => [
                      createVNode(QTd, { props: props2 }, {
                        default: withCtx(() => [
                          createBaseVNode("span", null, toDisplayString(`${formatPrice(props2.row.sales)}`), 1)
                        ]),
                        _: 2
                      }, 1032, ["props"])
                    ]),
                    _: 1
                  }, 8, ["filter", "rows", "pagination"])
                ]),
                _: 1
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_3$d, [
                    createBaseVNode("div", _hoisted_4$9, " Overall Total Sales: " + toDisplayString(formatPrice(overallTotal.value || "0")), 1)
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["onHide"]);
    };
  }
};
var SelectaReport = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__file", "SelectaReport.vue"]]);
const _hoisted_1$e = { class: "row justify-between text-white" };
const _hoisted_2$e = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Softdrinks Report", -1);
const _hoisted_3$c = { class: "row justify-end q-mt-md" };
const _hoisted_4$8 = { class: "text-h6" };
const _sfc_main$g = {
  __name: "SoftdrinksReport",
  props: ["reports"],
  setup(__props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
    const props = __props;
    console.log("Reports data structure:", props.reports);
    const capitalizeFirstLetter = (location) => {
      if (!location)
        return "";
      return location.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    };
    const breadReportColumns = [
      {
        name: "name",
        label: "Softdrinks Name",
        field: (row) => {
          console.log("Row data:", row);
          return row.softdrinks.name || "N/A";
        }
      },
      {
        name: "price",
        label: "Price",
        field: "price"
      },
      {
        name: "beginnings",
        label: "Beginnings (PCS)",
        field: "beginnings",
        format: (val) => `${val}`
      },
      {
        name: "remaining",
        label: "Remaining (PCS)",
        field: "remaining",
        format: (val) => `${val}`
      },
      {
        name: "out",
        label: "Softdrinks Out (PCS)",
        field: "out",
        format: (val) => `${val}`
      },
      {
        name: "sold",
        label: "Softdrinks Sold (PCS)",
        field: "sold",
        format: (val) => `${val}`
      },
      {
        name: "sales",
        label: "Total Sales",
        field: "sales"
      }
    ];
    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP"
      }).format(price);
    };
    const filteredRows = computed(() => {
      console.log("Filtered rows:", props.reports || []);
      return props.reports || [];
    });
    const overallTotal = computed(() => {
      const total = filteredRows.value.reduce((total2, row) => {
        const salesAmount = parseFloat(row.sales) || 0;
        console.log(`Adding salesAmount: ${salesAmount} to total: ${total2}`);
        return total2 + salesAmount;
      }, 0);
      console.log("Overall Total Sales computed as:", total);
      return total;
    });
    console.log("Filtered Rows:", filteredRows.value);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QDialog, {
        ref_key: "dialogRef",
        ref: dialogRef,
        onHide: unref(onDialogHide)
      }, {
        default: withCtx(() => [
          createVNode(QCard, { style: { "width": "870px", "max-width": "80vw" } }, {
            default: withCtx(() => [
              createVNode(QCardSection, { style: { "background-color": "#9c27b0" } }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_1$e, [
                    _hoisted_2$e,
                    withDirectives((openBlock(), createBlock(QBtn, {
                      icon: "close",
                      flat: "",
                      dense: "",
                      round: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(QTooltip, {
                          class: "bg-blue-grey-6",
                          delay: 200
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Close")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })), [
                      [ClosePopup]
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createVNode(QTable, {
                    filter: _ctx.filter,
                    "virtual-scroll-sticky-size-start": 48,
                    flat: "",
                    columns: breadReportColumns,
                    rows: filteredRows.value,
                    "row-key": "name",
                    "virtual-scroll": "",
                    pagination: _ctx.pagination,
                    "onUpdate:pagination": _cache[0] || (_cache[0] = ($event) => _ctx.pagination = $event),
                    "rows-per-page-options": [0],
                    "hide-bottom": "",
                    style: { "height": "350px" },
                    class: "table-container sticky-header"
                  }, {
                    "body-cell-name": withCtx((props2) => [
                      createVNode(QTd, { props: props2 }, {
                        default: withCtx(() => [
                          createBaseVNode("span", null, toDisplayString(`${capitalizeFirstLetter(props2.row.softdrinks.name)}`), 1)
                        ]),
                        _: 2
                      }, 1032, ["props"])
                    ]),
                    "body-cell-price": withCtx((props2) => [
                      createVNode(QTd, { props: props2 }, {
                        default: withCtx(() => [
                          createBaseVNode("span", null, toDisplayString(`${formatPrice(props2.row.price)}`), 1)
                        ]),
                        _: 2
                      }, 1032, ["props"])
                    ]),
                    "body-cell-sales": withCtx((props2) => [
                      createVNode(QTd, { props: props2 }, {
                        default: withCtx(() => [
                          createBaseVNode("span", null, toDisplayString(`${formatPrice(props2.row.sales)}`), 1)
                        ]),
                        _: 2
                      }, 1032, ["props"])
                    ]),
                    _: 1
                  }, 8, ["filter", "rows", "pagination"])
                ]),
                _: 1
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_3$c, [
                    createBaseVNode("div", _hoisted_4$8, " Overall Total Sales: " + toDisplayString(formatPrice(overallTotal.value || "0")), 1)
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["onHide"]);
    };
  }
};
var SoftdrinksReport = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__file", "SoftdrinksReport.vue"]]);
var ProductsReport_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$8 = (n) => (pushScopeId("data-v-cc64d6be"), n = n(), popScopeId(), n);
const _hoisted_1$d = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createBaseVNode("div", {
  class: "text-h6",
  align: "center"
}, "Products Report", -1));
const _hoisted_2$d = {
  class: "q-gutter-md",
  align: "center"
};
const _hoisted_3$b = { class: "text-weight-regular text-subtitle1" };
const _sfc_main$f = {
  __name: "ProductsReport",
  props: ["sales_Reports"],
  setup(__props) {
    const props = __props;
    const productsReport = props.sales_Reports;
    console.log("sales report2", props);
    const $q = useQuasar();
    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP"
      }).format(price);
    };
    const handleBreadDialog = (dataReports) => {
      $q.dialog({
        component: BreadReport,
        componentProps: {
          reports: dataReports
        }
      });
    };
    const handleSelectaDialog = (dataReports) => {
      $q.dialog({
        component: SelectaReport,
        componentProps: {
          reports: dataReports
        }
      });
    };
    const handleSoftdrinksDialog = (dataReports) => {
      $q.dialog({
        component: SoftdrinksReport,
        componentProps: {
          reports: dataReports
        }
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(QCard, { class: "user-card" }, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                _hoisted_1$d
              ]),
              _: 1
            }),
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_2$d, [
                  createVNode(QBtn, {
                    onClick: _cache[0] || (_cache[0] = ($event) => handleBreadDialog(props.sales_Reports[0].bread_reports)),
                    "no-caps": "",
                    label: "Bread Report",
                    rounded: "",
                    color: "brown",
                    style: { "width": "150px" },
                    class: "user-button"
                  }),
                  createVNode(QBtn, {
                    onClick: _cache[1] || (_cache[1] = ($event) => handleSelectaDialog(unref(productsReport)[0].selecta_reports)),
                    "no-caps": "",
                    label: "Selecta Report",
                    rounded: "",
                    color: "red-6",
                    style: { "width": "150px" },
                    class: "user-button"
                  }),
                  createVNode(QBtn, {
                    onClick: _cache[2] || (_cache[2] = ($event) => handleSoftdrinksDialog(unref(productsReport)[0].softdrinks_reports)),
                    "no-caps": "",
                    label: "Softdrinks Report",
                    rounded: "",
                    color: "accent",
                    style: { "width": "150px" },
                    class: "user-button"
                  })
                ])
              ]),
              _: 1
            }),
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_3$b, " Total sales: " + toDisplayString(formatPrice(unref(productsReport)[0].products_total_sales)), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]);
    };
  }
};
var ProductsReport = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-cc64d6be"], ["__file", "ProductsReport.vue"]]);
const _hoisted_1$c = { class: "row justify-between text-white" };
const _hoisted_2$c = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Denomination Report", -1);
const _hoisted_3$a = { class: "row text-weight-regular text-subtitle1" };
const _hoisted_4$7 = { class: "col-6" };
const _hoisted_5$4 = { class: "col-6" };
const _hoisted_6$3 = { class: "row justify-end q-mt-md" };
const _hoisted_7$3 = { class: "text-h6" };
const _sfc_main$e = {
  __name: "DenominationDialogReport",
  props: {
    reports: Array,
    total: Number
  },
  setup(__props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
    const props = __props;
    console.log("Denomination Props", props.reports);
    const denominationReports = props.reports[0];
    console.log("Reports data structure:", props.reports);
    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP"
      }).format(price);
    };
    const filteredRows = computed(() => {
      console.log("Filtered rows:", props.reports || []);
      return props.reports || [];
    });
    console.log("Filtered Rows:", filteredRows.value);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QDialog, {
        ref_key: "dialogRef",
        ref: dialogRef,
        onHide: unref(onDialogHide)
      }, {
        default: withCtx(() => [
          createVNode(QCard, { style: { "width": "870px", "max-width": "80vw" } }, {
            default: withCtx(() => [
              createVNode(QCardSection, { style: { "background-color": "#03a9f4" } }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_1$c, [
                    _hoisted_2$c,
                    withDirectives((openBlock(), createBlock(QBtn, {
                      icon: "close",
                      flat: "",
                      dense: "",
                      round: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(QTooltip, {
                          class: "bg-blue-grey-6",
                          delay: 200
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Close")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })), [
                      [ClosePopup]
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_3$a, [
                    createBaseVNode("div", _hoisted_4$7, [
                      createBaseVNode("div", null, "1000 Bills: " + toDisplayString(unref(denominationReports).oneThousandBills), 1),
                      createBaseVNode("div", null, "500 Bills: " + toDisplayString(unref(denominationReports).fiveHundredBills), 1),
                      createBaseVNode("div", null, "200 Bills: " + toDisplayString(unref(denominationReports).twoHundredBills), 1),
                      createBaseVNode("div", null, "100 Bills: " + toDisplayString(unref(denominationReports).oneHundredBills), 1),
                      createBaseVNode("div", null, "50 Bills: " + toDisplayString(unref(denominationReports).fiftyBills), 1),
                      createBaseVNode("div", null, "20 Bills: " + toDisplayString(unref(denominationReports).twentyBills), 1)
                    ]),
                    createBaseVNode("div", _hoisted_5$4, [
                      createBaseVNode("div", null, "20 coins: " + toDisplayString(unref(denominationReports).twentyCoins), 1),
                      createBaseVNode("div", null, "10 coins: " + toDisplayString(unref(denominationReports).tenCoins), 1),
                      createBaseVNode("div", null, "5 coins: " + toDisplayString(unref(denominationReports).fiveCoins), 1),
                      createBaseVNode("div", null, "1 coins: " + toDisplayString(unref(denominationReports).oneCoins), 1),
                      createBaseVNode("div", null, "25 cents: " + toDisplayString(unref(denominationReports).twentyFiveCents), 1)
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_6$3, [
                    createBaseVNode("div", _hoisted_7$3, " Overall Total Denomination: " + toDisplayString(formatPrice(__props.total || "0")), 1)
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["onHide"]);
    };
  }
};
var DenominationDialogReport = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__file", "DenominationDialogReport.vue"]]);
var DenominationReport_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$7 = (n) => (pushScopeId("data-v-7ab0fe9c"), n = n(), popScopeId(), n);
const _hoisted_1$b = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createBaseVNode("div", {
  class: "text-h6",
  align: "center"
}, "Denomination Report", -1));
const _hoisted_2$b = {
  class: "q-gutter-x-md",
  align: "center"
};
const _hoisted_3$9 = { class: "text-weight-regular text-subtitle1" };
const _sfc_main$d = {
  __name: "DenominationReport",
  props: ["sales_Reports"],
  setup(__props) {
    const props = __props;
    props.sales_Reports;
    console.log("Denomination report", props);
    const $q = useQuasar();
    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP"
      }).format(price);
    };
    const handleDenominationDialog = (dataReports, total) => {
      $q.dialog({
        component: DenominationDialogReport,
        componentProps: {
          reports: dataReports,
          total
        }
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(QCard, { class: "user-card" }, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                _hoisted_1$b
              ]),
              _: 1
            }),
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_2$b, [
                  createVNode(QBtn, {
                    label: "OPEN",
                    rounded: "",
                    style: { "width": "200px" },
                    color: "light-blue-6",
                    onClick: _cache[0] || (_cache[0] = ($event) => handleDenominationDialog(
                      props.sales_Reports[0].denomination_reports,
                      props.sales_Reports[0].denomination_total
                    )),
                    class: "user-button"
                  })
                ])
              ]),
              _: 1
            }),
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_3$9, " Total Denomination : " + toDisplayString(formatPrice(props.sales_Reports[0].denomination_total)), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(QDialog, {
          modelValue: _ctx.dialog,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.dialog = $event)
        }, {
          default: withCtx(() => [
            createVNode(QCard, null, {
              default: withCtx(() => [
                createTextVNode(" This is dialog ")
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
var DenominationReport = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-7ab0fe9c"], ["__file", "DenominationReport.vue"]]);
const _hoisted_1$a = { class: "row justify-between text-white" };
const _hoisted_2$a = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Expenses Report", -1);
const _hoisted_3$8 = { class: "row justify-end q-mt-md" };
const _hoisted_4$6 = { class: "text-h6" };
const _sfc_main$c = {
  __name: "ExpensesDialog",
  props: {
    reports: Array,
    total: Number
  },
  setup(__props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
    const props = __props;
    props.reports;
    console.log("Expenses total", props.total);
    const capitalizeFirstLetter = (location) => {
      if (!location)
        return "";
      return location.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    };
    const expensesReportColumn = [
      {
        name: "name",
        label: "Expenses Name",
        field: (row) => {
          console.log("Row data:", row);
          return row.name || "N/A";
        },
        align: "center"
      },
      {
        name: "description",
        label: "Description",
        field: "description",
        align: "center"
      },
      {
        name: "amount",
        label: "Amount",
        field: "amount",
        align: "center"
      }
    ];
    console.log("Reports data structure:", props.reports);
    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP"
      }).format(price);
    };
    const filteredRows = computed(() => {
      console.log("Filtered rows:", props.reports || []);
      return props.reports || [];
    });
    console.log("Expenses:", filteredRows.value);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QDialog, {
        ref_key: "dialogRef",
        ref: dialogRef,
        onHide: unref(onDialogHide),
        onOk: _ctx.handleButtonClick,
        onCancel: unref(onDialogCancel)
      }, {
        default: withCtx(() => [
          createVNode(QCard, { style: { "width": "870px", "max-width": "80vw" } }, {
            default: withCtx(() => [
              createVNode(QCardSection, { style: { "background-color": "#03a9f4" } }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_1$a, [
                    _hoisted_2$a,
                    withDirectives((openBlock(), createBlock(QBtn, {
                      icon: "close",
                      flat: "",
                      dense: "",
                      round: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(QTooltip, {
                          class: "bg-blue-grey-6",
                          delay: 200
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Close")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })), [
                      [ClosePopup]
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createVNode(QTable, {
                    filter: _ctx.filter,
                    "virtual-scroll-sticky-size-start": 48,
                    flat: "",
                    columns: expensesReportColumn,
                    rows: filteredRows.value,
                    "row-key": "name",
                    "virtual-scroll": "",
                    pagination: _ctx.pagination,
                    "onUpdate:pagination": _cache[0] || (_cache[0] = ($event) => _ctx.pagination = $event),
                    "rows-per-page-options": [0],
                    "hide-bottom": "",
                    style: { "height": "350px" },
                    class: "table-container sticky-header"
                  }, {
                    "body-cell-name": withCtx((props2) => [
                      createVNode(QTd, { props: props2 }, {
                        default: withCtx(() => [
                          createBaseVNode("span", null, toDisplayString(`${capitalizeFirstLetter(props2.row.name)}`), 1)
                        ]),
                        _: 2
                      }, 1032, ["props"])
                    ]),
                    "body-cell-amount": withCtx((props2) => [
                      createVNode(QTd, { props: props2 }, {
                        default: withCtx(() => [
                          createBaseVNode("span", null, toDisplayString(`${formatPrice(props2.row.amount)}`), 1)
                        ]),
                        _: 2
                      }, 1032, ["props"])
                    ]),
                    _: 1
                  }, 8, ["filter", "rows", "pagination"])
                ]),
                _: 1
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_3$8, [
                    createBaseVNode("div", _hoisted_4$6, " Overall Total Expenses: " + toDisplayString(formatPrice(__props.total || "0")), 1)
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["onHide", "onOk", "onCancel"]);
    };
  }
};
var ExpensesDialog = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "ExpensesDialog.vue"]]);
var ExpensesReport_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$6 = (n) => (pushScopeId("data-v-338c99d0"), n = n(), popScopeId(), n);
const _hoisted_1$9 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createBaseVNode("div", {
  class: "text-h6",
  align: "center"
}, "Expenses Report", -1));
const _hoisted_2$9 = {
  class: "q-gutter-x-md",
  align: "center"
};
const _hoisted_3$7 = { class: "text-weight-regular text-subtitle1" };
const _sfc_main$b = {
  __name: "ExpensesReport",
  props: ["sales_Reports"],
  setup(__props) {
    const props = __props;
    console.log("Expenses Data", props.sales_Reports[0].expenses_reports);
    const $q = useQuasar();
    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP"
      }).format(price);
    };
    const handleExpensesDialog = (dataReports, total) => {
      $q.dialog({
        component: ExpensesDialog,
        componentProps: {
          reports: dataReports,
          total
        }
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(QCard, { class: "user-card" }, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                _hoisted_1$9
              ]),
              _: 1
            }),
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_2$9, [
                  createVNode(QBtn, {
                    label: "OPEN",
                    rounded: "",
                    style: { "width": "200px" },
                    color: "light-blue-6",
                    class: "user-button",
                    onClick: _cache[0] || (_cache[0] = ($event) => handleExpensesDialog(
                      props.sales_Reports[0].expenses_reports,
                      props.sales_Reports[0].expenses_total
                    ))
                  })
                ])
              ]),
              _: 1
            }),
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_3$7, " Total Expenses : " + toDisplayString(formatPrice(props.sales_Reports[0].expenses_total)), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]);
    };
  }
};
var ExpensesReport = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-338c99d0"], ["__file", "ExpensesReport.vue"]]);
const _hoisted_1$8 = { class: "row justify-between text-white" };
const _hoisted_2$8 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Credits Report", -1);
const _hoisted_3$6 = { class: "row justify-end q-mt-md" };
const _hoisted_4$5 = { class: "text-h6" };
const _sfc_main$a = {
  __name: "CreditsReportDialog",
  props: {
    reports: Array,
    total: Number
  },
  setup(__props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
    const props = __props;
    const creditReports = props.reports;
    console.log("creditReports data", creditReports);
    creditReports.forEach((report, index) => {
      console.log(`Report ${index}:`, report);
      console.log(
        `Credit Products for Report ${index}:`,
        report.credit_products.total_amount
      );
    });
    const filteredRows = computed(() => {
      return creditReports.flatMap((report) => {
        return report.credit_products.map((product) => {
          const pieces = parseInt(product.pieces, 10) || 0;
          const price = parseFloat(product.price) || 0;
          const totalAmount = pieces * price;
          return {
            ...product,
            total_amount: totalAmount
          };
        });
      });
    });
    console.log("All Credit Products:", filteredRows.value[0]);
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
      return `${firstname} ${middlename} ${lastname}`.trim();
    };
    const creditProductsColumn = [
      {
        name: "name",
        label: "Employee Name",
        field: (row) => formatFullname(row.credit_user_id),
        align: "center"
      },
      {
        name: "productName",
        label: "Product Name",
        field: (row) => {
          return row.product.name || "N/A";
        },
        align: "center"
      },
      {
        name: "pieces",
        label: "Pieces",
        field: "pieces",
        align: "center"
      },
      {
        name: "price",
        label: "Price",
        field: "price",
        align: "center"
      },
      {
        name: "total_amount",
        label: "Total Amount",
        field: "total_amount",
        align: "center"
      }
    ];
    console.log("Reports data structure:", props.reports);
    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP"
      }).format(price);
    };
    const formatAmount = (total_amount) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP"
      }).format(total_amount);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QDialog, {
        ref_key: "dialogRef",
        ref: dialogRef,
        onHide: unref(onDialogHide),
        onOk: _ctx.handleButtonClick,
        onCancel: unref(onDialogCancel)
      }, {
        default: withCtx(() => [
          createVNode(QCard, { style: { "width": "870px", "max-width": "80vw" } }, {
            default: withCtx(() => [
              createVNode(QCardSection, { style: { "background-color": "#03a9f4" } }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_1$8, [
                    _hoisted_2$8,
                    withDirectives((openBlock(), createBlock(QBtn, {
                      icon: "close",
                      flat: "",
                      dense: "",
                      round: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(QTooltip, {
                          class: "bg-blue-grey-6",
                          delay: 200
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Close")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })), [
                      [ClosePopup]
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createVNode(QTable, {
                    filter: _ctx.filter,
                    "virtual-scroll-sticky-size-start": 48,
                    flat: "",
                    columns: creditProductsColumn,
                    rows: filteredRows.value,
                    "row-key": "name",
                    "virtual-scroll": "",
                    pagination: _ctx.pagination,
                    "onUpdate:pagination": _cache[0] || (_cache[0] = ($event) => _ctx.pagination = $event),
                    "rows-per-page-options": [0],
                    "hide-bottom": "",
                    style: { "height": "350px" },
                    class: "table-container sticky-header"
                  }, {
                    "body-cell-productName": withCtx((props2) => [
                      createVNode(QTd, { props: props2 }, {
                        default: withCtx(() => [
                          createBaseVNode("span", null, toDisplayString(`${capitalizeFirstLetter(props2.row.product.name)}`), 1)
                        ]),
                        _: 2
                      }, 1032, ["props"])
                    ]),
                    "body-cell-price": withCtx((props2) => [
                      createVNode(QTd, { props: props2 }, {
                        default: withCtx(() => [
                          createBaseVNode("span", null, toDisplayString(`${formatPrice(props2.row.price)}`), 1)
                        ]),
                        _: 2
                      }, 1032, ["props"])
                    ]),
                    "body-cell-total_amount": withCtx((props2) => [
                      createVNode(QTd, { props: props2 }, {
                        default: withCtx(() => [
                          createBaseVNode("span", null, toDisplayString(`${formatAmount(props2.row.total_amount)}`), 1)
                        ]),
                        _: 2
                      }, 1032, ["props"])
                    ]),
                    _: 1
                  }, 8, ["filter", "rows", "pagination"])
                ]),
                _: 1
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_3$6, [
                    createBaseVNode("div", _hoisted_4$5, " Overall Credits Total: " + toDisplayString(formatPrice(__props.total || "0")), 1)
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["onHide", "onOk", "onCancel"]);
    };
  }
};
var CreditsReportDialog = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__file", "CreditsReportDialog.vue"]]);
var CreditsReport_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$5 = (n) => (pushScopeId("data-v-29d6ba68"), n = n(), popScopeId(), n);
const _hoisted_1$7 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createBaseVNode("div", {
  class: "text-h6",
  align: "center"
}, "Credits Report", -1));
const _hoisted_2$7 = {
  class: "q-gutter-x-md",
  align: "center"
};
const _hoisted_3$5 = { class: "text-weight-regular text-subtitle1" };
const _sfc_main$9 = {
  __name: "CreditsReport",
  props: ["sales_Reports"],
  setup(__props) {
    const props = __props;
    const $q = useQuasar();
    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP"
      }).format(price);
    };
    const handleCreditsDialog = (dataReports, total) => {
      $q.dialog({
        component: CreditsReportDialog,
        componentProps: {
          reports: dataReports,
          total
        }
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(QCard, { class: "user-card" }, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                _hoisted_1$7
              ]),
              _: 1
            }),
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_2$7, [
                  createVNode(QBtn, {
                    label: "OPEN",
                    rounded: "",
                    style: { "width": "200px" },
                    color: "light-blue-6",
                    class: "user-button",
                    onClick: _cache[0] || (_cache[0] = ($event) => handleCreditsDialog(
                      props.sales_Reports[0].credit_reports,
                      props.sales_Reports[0].credit_total
                    ))
                  })
                ])
              ]),
              _: 1
            }),
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_3$5, " Total Credits : " + toDisplayString(formatPrice(props.sales_Reports[0].credit_total)), 1)
              ]),
              _: 1
            }),
            createVNode(QCardSection)
          ]),
          _: 1
        })
      ]);
    };
  }
};
var CreditsReport = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-29d6ba68"], ["__file", "CreditsReport.vue"]]);
var SalesReportPanel_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$4 = (n) => (pushScopeId("data-v-1dc4330d"), n = n(), popScopeId(), n);
const _hoisted_1$6 = { class: "q-mt-lg row items-start q-gutter-md justify-center" };
const _hoisted_2$6 = { class: "row justify-between" };
const _hoisted_3$4 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Sales Report", -1));
const _hoisted_4$4 = { align: "right" };
const _hoisted_5$3 = { class: "text-subtitle1 text-weight-regular" };
const _hoisted_6$2 = { class: "row q-gutter-sm q-pa-md" };
const _hoisted_7$2 = { class: "q-ma-sm" };
const _hoisted_8$2 = {
  class: "q-ma-sm",
  align: "center"
};
const _hoisted_9$2 = ["src"];
const _sfc_main$8 = {
  __name: "SalesReportPanel",
  props: ["salesReport"],
  setup(__props) {
    pdfmake.exports.vfs = vfs_fontes;
    const props = __props;
    const reportsData = props.salesReport;
    console.log("reportsData", props.salesReport);
    const maximizedToggle = ref(true);
    const printDialog = ref(false);
    const pdfUrl = ref("");
    const formatDate = (dateString) => {
      return quasarDate.formatDate(dateString, "MMMM DD, YYYY");
    };
    const formatTimeFromDB = (dateString) => {
      const dateObj = new Date(dateString);
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      };
      return dateObj.toLocaleTimeString(void 0, options);
    };
    const formatFullname = (row) => {
      const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
      const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
      const middlename = row.middlename ? capitalize(row.middlename).charAt(0) + "." : "";
      const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";
      return `${firstname} ${middlename} ${lastname}`.trim();
    };
    const formatAmount = (price) => {
      const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP"
      }).format(price);
      return formattedAmount.replace("\u20B1", "\u20B1	");
    };
    const generateDocDefinition = (report) => {
      const allCreditProducts = computed(() => {
        return report.credit_reports.flatMap((report2) => report2.credit_products);
      });
      console.log("All Credit Products:", allCreditProducts.value);
      const productionTypes = [
        {
          title: "Bread Production",
          data: report.bread_reports || [],
          columns: [
            "bread.name",
            "beginnings",
            "price",
            "new_production",
            "bread_out",
            "bread_sold",
            "total",
            "remaining",
            "sales"
          ],
          totals: ["sales"]
        },
        {
          title: "Selecta Production",
          data: report.selecta_reports || [],
          columns: [
            "selecta.name",
            "beginnings",
            "price",
            "out",
            "sold",
            "remaining",
            "sales"
          ],
          totals: ["sales"]
        },
        {
          title: "Softdrinks Production",
          data: report.softdrinks_reports || [],
          columns: [
            "softdrinks.name",
            "beginnings",
            "price",
            "added_stocks",
            "out",
            "sold",
            "remaining",
            "sales"
          ],
          totals: ["sales"]
        }
      ];
      const expensesReport = report.expenses_reports || [];
      const creditReport = allCreditProducts.value || [];
      const creditTotal = report.credit_total;
      const denomination = report.denomination_reports[0] || [];
      const denominationTotal = report.denomination_total;
      const expensesTotal = report.expenses_total;
      report.products_total_sales;
      report.charges_amount;
      report.over_total;
      const denominationReport = {
        bills: [
          {
            name: "One Thousand",
            pcs: denomination.oneThousandBills || 0
          },
          {
            name: "Five Hundred",
            pcs: denomination.fiveHundredBills || 0
          },
          {
            name: "Two Hundred",
            pcs: denomination.twoHundredBills || 0
          },
          {
            name: "One Hundred",
            pcs: denomination.oneHundredBills || 0
          },
          { name: "Fifty", pcs: denomination.fiftyBills || 0 },
          { name: "Twenty", pcs: denomination.twentyBills || 0 }
        ],
        coins: [
          { name: "Twenty", pcs: denomination.twentyCoins || 0 },
          { name: "Ten", pcs: denomination.tenCoins || 0 },
          { name: "Five", pcs: denomination.fiveCoins || 0 },
          { name: "One", pcs: denomination.oneCoins || 0 },
          {
            name: "Twenty Five Cents",
            pcs: denomination.twentyFiveCents || 0
          }
        ]
      };
      const generateTableBody = (data, columns, totals) => {
        const totalRow = totals.reduce((acc, key) => {
          acc[key] = data.reduce((sum, item) => sum + (item[key] || 0), 0);
          return acc;
        }, {});
        return [
          ...data.map(
            (item) => columns.map((col) => ({
              text: col.includes(".") ? item[col.split(".")[0]][col.split(".")[1]] : item[col],
              style: "body",
              alignment: "center"
            }))
          ),
          [
            {
              text: "Overall Total",
              colSpan: columns.length - totals.length,
              style: "tableHeader",
              alignment: "right",
              color: "#020617"
            },
            ...Array(columns.length - totals.length - 1).fill({}),
            ...totals.map((key) => ({
              text: key === "sales" ? formatAmount(totalRow[key]) : totalRow[key],
              style: "tableHeader",
              alignment: "center",
              color: "#020617"
            }))
          ]
        ];
      };
      const creditReportTableBody = creditReport.length > 0 ? creditReport.map((creditData) => [
        {
          text: formatFullname(creditData.credit_user_id),
          style: "body",
          alignment: "center"
        },
        {
          text: creditData.product.name,
          style: "body",
          alignment: "center"
        },
        {
          text: creditData.pieces,
          style: "body",
          alignment: "center"
        },
        {
          text: creditData.price,
          style: "body",
          alignment: "center"
        },
        {
          text: creditData.total_amount,
          style: "body",
          alignment: "center"
        }
      ]) : [[{ text: "No data available", colSpan: 5, alignment: "center" }]];
      creditReportTableBody.push([
        {
          text: "Total",
          style: "bodyBold",
          alignment: "right",
          colSpan: 3
        },
        {},
        {},
        {
          text: `${formatAmount(creditTotal)}`,
          style: "bodyBold",
          alignment: "center",
          colSpan: 2
        },
        {}
      ]);
      const expensesReportTableBody = expensesReport.length > 0 ? expensesReport.map((expensesData) => [
        {
          text: expensesData.name,
          style: "body",
          alignment: "center"
        },
        {
          text: expensesData.description,
          style: "body",
          alignment: "center"
        },
        {
          text: `${formatAmount(expensesData.amount)}`,
          style: "body",
          alignment: "center"
        }
      ]) : [[{ text: "No data available", colSpan: 3, alignment: "center" }]];
      expensesReportTableBody.push([
        {
          text: "Total",
          style: "bodyBold",
          alignment: "right",
          colSpan: 2
        },
        {},
        {
          text: `${formatAmount(expensesTotal)}`,
          style: "bodyBold",
          alignment: "center"
        }
      ]);
      const denominationReportTableBody = denominationReport.bills.map(
        (bill, index) => {
          var _a, _b;
          return [
            { text: bill.name, style: "body", alignment: "center" },
            { text: bill.pcs, style: "body", alignment: "center" },
            {
              text: ((_a = denominationReport.coins[index]) == null ? void 0 : _a.name) || "",
              style: "body",
              alignment: "center"
            },
            {
              text: ((_b = denominationReport.coins[index]) == null ? void 0 : _b.pcs) || "0",
              style: "body",
              alignment: "center"
            }
          ];
        }
      );
      denominationReportTableBody.push([
        {
          text: "Total",
          style: "bodyBold",
          alignment: "right",
          colSpan: 3,
          color: "#020617"
        },
        {},
        {},
        {
          text: `${formatAmount(denominationTotal)}`,
          style: "bodyBold",
          alignment: "right",
          color: "#020617"
        }
      ]);
      const tables = productionTypes.map(({ title, data, columns, totals }) => ({
        stack: [
          { text: title, style: "subheader", alignment: "center" },
          {
            table: {
              headerRows: 1,
              widths: Array(columns.length).fill("*"),
              body: [
                columns.map((col) => ({
                  text: col.split(".").pop().replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
                  style: "tableHeader",
                  alignment: "center"
                })),
                ...generateTableBody(data, columns, totals)
              ]
            },
            layout: {
              paddingLeft: () => 2,
              paddingRight: () => 2,
              paddingTop: () => 2,
              paddingBottom: () => 2
            }
          }
        ]
      }));
      const summaryTable = {
        table: {
          widths: ["50%", "50%"],
          body: [
            [
              {
                text: "Total Denomination",
                style: "tableHeader",
                alignment: "left"
              },
              {
                text: formatAmount(denominationTotal),
                style: "tableData",
                alignment: "center"
              }
            ],
            [
              {
                text: "Total Product Sales Amount",
                style: "tableHeader",
                alignment: "left"
              },
              {
                text: formatAmount(report.products_total_sales),
                style: "tableData",
                alignment: "center"
              }
            ],
            [
              { text: "Total Expenses", style: "tableHeader", alignment: "left" },
              {
                text: formatAmount(expensesTotal),
                style: "tableData",
                alignment: "center"
              }
            ],
            [
              { text: "Over Cash", style: "tableHeader", alignment: "left" },
              {
                text: formatAmount(report.over_total),
                style: "tableData",
                alignment: "center"
              }
            ],
            [
              { text: "Charges", style: "tableHeader", alignment: "left" },
              {
                text: `${formatAmount(report.charges_amount)}`,
                style: "tableData",
                alignment: "center"
              }
            ]
          ]
        },
        layout: {
          paddingLeft: () => 2,
          paddingRight: () => 2,
          paddingTop: () => 2,
          paddingBottom: () => 2
        }
      };
      return {
        content: [
          { text: "Sales Report", style: "header", alignment: "center" },
          {
            columns: [
              {
                text: `Branch Name: ${report.branch.name}
          Cashier: ${formatFullname(report.user.employee)}
          Date: ${formatDate(report.created_at)}
Time: ${formatTimeFromDB(
                  report.created_at
                )}
`,
                margin: [0, 0, 0, 10]
              },
              {}
            ]
          },
          ...tables,
          {
            margin: [0, 5, 0, 0],
            columns: [
              {
                width: "50%",
                stack: [
                  {
                    text: "Expenses Report",
                    style: "subheader",
                    alignment: "center"
                  },
                  {
                    table: {
                      headerRows: 1,
                      widths: ["*", "auto", "*"],
                      body: [
                        [
                          {
                            text: "Expenses Name",
                            style: "tableHeader",
                            alignment: "center"
                          },
                          {
                            text: "Description",
                            style: "tableHeader",
                            alignment: "center"
                          },
                          {
                            text: "Amount",
                            style: "tableHeader",
                            alignment: "center"
                          }
                        ],
                        ...expensesReportTableBody
                      ]
                    },
                    layout: {
                      paddingLeft: () => 2,
                      paddingRight: () => 2,
                      paddingTop: () => 2,
                      paddingBottom: () => 2
                    }
                  },
                  {
                    text: "Credit Report",
                    style: "subheader",
                    alignment: "center"
                  },
                  {
                    table: {
                      headerRows: 1,
                      widths: ["*", "*", "auto", "auto", "auto"],
                      body: [
                        [
                          {
                            text: "Employee Name",
                            style: "tableHeader",
                            alignment: "center"
                          },
                          {
                            text: "Product Name",
                            style: "tableHeader",
                            alignment: "center"
                          },
                          {
                            text: "Pieces",
                            style: "tableHeader",
                            alignment: "center"
                          },
                          {
                            text: "Price",
                            style: "tableHeader",
                            alignment: "center"
                          },
                          {
                            text: "Amount",
                            style: "tableHeader",
                            alignment: "center"
                          }
                        ],
                        ...creditReportTableBody
                      ]
                    },
                    layout: {
                      paddingLeft: () => 2,
                      paddingRight: () => 2,
                      paddingTop: () => 2,
                      paddingBottom: () => 2
                    }
                  }
                ]
              },
              {
                width: "50%",
                stack: [
                  {
                    text: "Denomination Report",
                    style: "subheader",
                    alignment: "center"
                  },
                  {
                    table: {
                      headerRows: 0,
                      widths: ["*", "auto", "*", "auto"],
                      body: [
                        [
                          {
                            text: "Bills",
                            style: "tableHeader",
                            alignment: "center"
                          },
                          {
                            text: "Pcs",
                            style: "tableHeader",
                            alignment: "center"
                          },
                          {
                            text: "Coins",
                            style: "tableHeader",
                            alignment: "center"
                          },
                          {
                            text: "Pcs",
                            style: "tableHeader",
                            alignment: "center"
                          }
                        ],
                        ...denominationReportTableBody
                      ]
                    },
                    layout: {
                      paddingLeft: () => 2,
                      paddingRight: () => 2,
                      paddingTop: () => 2,
                      paddingBottom: () => 2
                    }
                  }
                ]
              }
            ],
            columnGap: 10
          },
          {},
          {
            canvas: [
              {
                type: "line",
                x1: 0,
                y1: 25,
                x2: 580,
                y2: 25,
                lineWidth: 1,
                dash: { length: 5, space: 5 },
                lineColor: "#000000",
                margin: [0, 20, 0, 0]
              }
            ]
          },
          {
            margin: [0, 20, 0, 0],
            stack: [
              { text: "Summary", style: "subheader", alignment: "center" },
              summaryTable
            ]
          }
        ],
        styles: {
          header: { fontSize: 16, bold: true },
          subheader: {
            fontSize: 12,
            bold: true,
            margin: [0, 10, 0, 5]
          },
          tableHeader: {
            bold: true,
            fontSize: 10,
            color: "black"
          },
          body: {
            fontSize: 8
          }
        },
        pageMargins: [10, 10, 10, 10]
      };
    };
    const openPrintDialog = (report) => {
      const docDefinition = generateDocDefinition(report);
      pdfmake.exports.createPdf(docDefinition).getDataUrl((dataUrl) => {
        pdfUrl.value = dataUrl;
        printDialog.value = true;
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QCard, { class: "my-card q-pa-md" }, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_1$6, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(reportsData), (report, index) => {
                    return openBlock(), createElementBlock("div", { key: index }, [
                      createVNode(QCard, {
                        flat: "",
                        dense: "",
                        bordered: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(QCardSection, null, {
                            default: withCtx(() => [
                              createBaseVNode("div", _hoisted_2$6, [
                                _hoisted_3$4,
                                createBaseVNode("div", _hoisted_4$4, [
                                  createVNode(QBtn, {
                                    padding: "xs md",
                                    label: "Print",
                                    icon: "print",
                                    outline: "",
                                    class: "user-button",
                                    onClick: ($event) => openPrintDialog(report)
                                  }, null, 8, ["onClick"]),
                                  createBaseVNode("div", null, [
                                    createVNode(QTooltip, {
                                      class: "bg-blue-grey-6",
                                      delay: 200
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Print Report ")
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_5$3, [
                                createBaseVNode("div", null, "Name: " + toDisplayString(formatFullname(report.user.employee)), 1),
                                createBaseVNode("div", null, "Date: " + toDisplayString(formatDate(report.created_at)), 1),
                                createBaseVNode("div", null, "Time: " + toDisplayString(formatTimeFromDB(report.created_at)), 1)
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          createBaseVNode("div", _hoisted_6$2, [
                            createVNode(ProductsReport, {
                              sales_Reports: [report]
                            }, null, 8, ["sales_Reports"]),
                            createVNode(DenominationReport, {
                              sales_Reports: [report]
                            }, null, 8, ["sales_Reports"]),
                            createVNode(ExpensesReport, {
                              sales_Reports: [report]
                            }, null, 8, ["sales_Reports"]),
                            createVNode(CreditsReport, {
                              sales_Reports: [report]
                            }, null, 8, ["sales_Reports"])
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ]);
                  }), 128))
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(QDialog, {
          modelValue: printDialog.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => printDialog.value = $event),
          "backdrop-filter": _ctx.backdropFilter,
          maximized: maximizedToggle.value,
          "transition-show": "slide-up",
          "transition-hide": "slide-down"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_7$2, [
              createBaseVNode("div", _hoisted_8$2, [
                withDirectives((openBlock(), createBlock(QBtn, {
                  icon: "close",
                  flat: "",
                  dense: "",
                  round: "",
                  class: "text-white"
                }, {
                  default: withCtx(() => [
                    createVNode(QTooltip, null, {
                      default: withCtx(() => [
                        createTextVNode("Close")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })), [
                  [ClosePopup]
                ])
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("iframe", {
                  src: pdfUrl.value,
                  width: "100%",
                  height: "700px"
                }, null, 8, _hoisted_9$2)
              ])
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "backdrop-filter", "maximized"])
      ], 64);
    };
  }
};
var SalesReportPanel = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-1dc4330d"], ["__file", "SalesReportPanel.vue"]]);
var ProductionReportDialog_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$5 = { class: "text-h6" };
const _hoisted_2$5 = { class: "row q-gutter-x-md" };
const _sfc_main$7 = {
  __name: "ProductionReportDialog",
  props: ["reports", "reportLabel"],
  emits: ["selectReport", "hide", "ok", "cancel"],
  setup(__props, { emit: __emit }) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
    const props = __props;
    console.log("production report", props.reports);
    const bakerReports = props.reports.baker_reports;
    const salesReports = props.reports.sales_reports;
    const emit = __emit;
    const tab = ref("bakerReport");
    const maximizedToggle = ref(true);
    const dialog = ref(false);
    const capitalizeFirstLetter = (location) => {
      if (!location)
        return "";
      return location.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    };
    const handleButtonClick = () => {
      emit("selectReport", props.reports);
      dialog.value = true;
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QDialog, {
        ref_key: "dialogRef",
        ref: dialogRef,
        modelValue: dialog.value,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => dialog.value = $event),
        onHide: unref(onDialogHide),
        onOk: handleButtonClick,
        onCancel: unref(onDialogCancel),
        maximized: maximizedToggle.value,
        "transition-show": "slide-up",
        "transition-hide": "slide-down"
      }, {
        default: withCtx(() => [
          createVNode(QCard, { style: { "background-color": "#f7f8fc" } }, {
            default: withCtx(() => [
              createVNode(QCardSection, {
                class: "row items-center text-white",
                style: { "background-color": "#595a5a" }
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_1$5, toDisplayString(`${capitalizeFirstLetter(
                    __props.reports.branch_name
                  )} ( ${__props.reportLabel} Reports)`), 1),
                  createVNode(QSpace),
                  createBaseVNode("div", _hoisted_2$5, [
                    createBaseVNode("div", null, [
                      withDirectives((openBlock(), createBlock(QBtn, {
                        icon: "close",
                        flat: "",
                        dense: "",
                        round: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(QTooltip, {
                            class: "bg-blue-grey-6",
                            delay: 200
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Close")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })), [
                        [ClosePopup]
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", null, [
                    createVNode(QTabs, {
                      modelValue: tab.value,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => tab.value = $event),
                      align: "justify",
                      "narrow-indicator": "",
                      class: "q-mb-lg"
                    }, {
                      default: withCtx(() => [
                        createVNode(QTab, {
                          class: "text-purple",
                          name: "bakerReport",
                          label: "Baker Reports"
                        }),
                        createVNode(QTab, {
                          class: "text-orange",
                          name: "salesReport",
                          label: "Sales Report"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  createBaseVNode("div", null, [
                    createVNode(QTabPanels, {
                      modelValue: tab.value,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => tab.value = $event),
                      animated: "",
                      "transition-prev": "scale",
                      "transition-next": "scale",
                      style: { "background-color": "#f7f8fc" }
                    }, {
                      default: withCtx(() => [
                        createVNode(QTabPanel, { name: "bakerReport" }, {
                          default: withCtx(() => [
                            createVNode(BakerReportPanel, { bakersReport: unref(bakerReports) }, null, 8, ["bakersReport"])
                          ]),
                          _: 1
                        }),
                        createVNode(QTabPanel, { name: "salesReport" }, {
                          default: withCtx(() => [
                            createVNode(SalesReportPanel, { salesReport: unref(salesReports) }, null, 8, ["salesReport"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue", "onHide", "onCancel", "maximized"]);
    };
  }
};
var ProductionReportDialog = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-643ff984"], ["__file", "ProductionReportDialog.vue"]]);
const useProductionStore = defineStore("productions", () => {
  const productions = ref([]);
  const production = ref([]);
  const fetchAllProduction = async () => {
    const response = await api.get("/api/branch-production-report");
    productions.value = response.data.reports;
  };
  const fetchBranchProductions = async (branchId) => {
    try {
      const response = await api.get(
        `/api/branches/${branchId}/production-report`
      );
      productions.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    productions,
    production,
    fetchAllProduction,
    fetchBranchProductions
  };
});
var ProductionTable_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$3 = (n) => (pushScopeId("data-v-12387bc6"), n = n(), popScopeId(), n);
const _hoisted_1$4 = {
  key: 0,
  class: "spinner-wrapper"
};
const _hoisted_2$4 = { key: 1 };
const _hoisted_3$3 = {
  key: 0,
  class: "data-error"
};
const _hoisted_4$3 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-ml-sm text-h6" }, "No data available", -1));
const _hoisted_5$2 = { class: "row justify-center q-gutter-x-md" };
const _sfc_main$6 = {
  __name: "ProductionTable",
  setup(__props) {
    const route = useRoute();
    ref("bakerReport");
    const branchId = route.params.branch_id;
    ref(false);
    ref(true);
    ref("");
    ref("");
    const pagination = ref({
      rowsPerPage: 0
    });
    const productionStore = useProductionStore();
    const filter = ref("");
    const productionRows = computed(() => productionStore.productions);
    ref(true);
    const loading = ref(true);
    const showNoDataMessage = ref(false);
    const filteredRows = computed(() => {
      if (!filter.value) {
        return productionRows.value;
      }
      return productionRows.value.filter(
        (row) => row.name.toLowerCase().includes(filter.value.toLowerCase())
      );
    });
    onMounted(async () => {
      if (branchId) {
        await reloadTableData(branchId);
      }
    });
    const reloadTableData = async (branchId2) => {
      try {
        loading.value = true;
        const response = await productionStore.fetchBranchProductions(branchId2);
        console.log("Fetched data:", response);
        console.log("Production rows:", productionRows.value);
        if (!productionRows.value.length) {
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
    const formatDate = (dateString) => {
      return quasarDate.formatDate(dateString, "MMMM DD, YYYY");
    };
    const productsColumn = [
      {
        name: "reportDate",
        align: "center",
        label: "Date",
        field: "date",
        format: formatDate
      },
      {
        name: "reports",
        align: "center",
        label: "Reports",
        field: "reports"
      }
    ];
    const $q = useQuasar();
    const handleDialog = (report, label) => {
      $q.dialog({
        component: ProductionReportDialog,
        componentProps: {
          reports: report,
          reportLabel: label
        }
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", null, [
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
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_1$4, [
          createVNode(QSpinnerDots, {
            size: "50px",
            color: "primary"
          })
        ])) : (openBlock(), createElementBlock("div", _hoisted_2$4, [
          filteredRows.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_3$3, [
            createVNode(QIcon, {
              name: "warning",
              color: "warning",
              size: "4em"
            }),
            _hoisted_4$3
          ])) : (openBlock(), createBlock(QTable, {
            key: 1,
            class: "table-container sticky-header",
            filter: filter.value,
            "virtual-scroll-sticky-size-start": 48,
            flat: "",
            style: { "height": "400px" },
            columns: productsColumn,
            rows: filteredRows.value,
            "row-key": "reportDate",
            "virtual-scroll": "",
            pagination: pagination.value,
            "onUpdate:pagination": _cache[1] || (_cache[1] = ($event) => pagination.value = $event),
            "rows-per-page-options": [0],
            "hide-bottom": ""
          }, {
            "body-cell-reports": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_5$2, [
                    createVNode(QBtn, {
                      padding: "xs lg",
                      rounded: "",
                      dense: "",
                      size: "sm",
                      color: "light-blue-5",
                      "text-color": "white",
                      onClick: ($event) => handleDialog(props.row.AM, "AM")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("AM")
                      ]),
                      _: 2
                    }, 1032, ["onClick"]),
                    createVNode(QBtn, {
                      padding: "xs lg",
                      rounded: "",
                      dense: "",
                      size: "sm",
                      color: "deep-orange",
                      "text-color": "white",
                      onClick: ($event) => handleDialog(props.row.PM, "PM")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("PM")
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
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
var ProductionTable = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-12387bc6"], ["__file", "ProductionTable.vue"]]);
const _sfc_main$5 = {
  __name: "ProductionPage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(ProductionTable)
      ]);
    };
  }
};
var ProductionPage = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "ProductionPage.vue"]]);
var RecipeCreate_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-82f00e90"), n = n(), popScopeId(), n);
const _hoisted_1$3 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Create Branch Recipe", -1));
const _hoisted_2$3 = { class: "q-mb-lg" };
const _hoisted_3$2 = {
  key: 0,
  class: "custom-list z-top"
};
const _hoisted_4$2 = { class: "q-mb-sm" };
const _hoisted_5$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, "Recipe Name", -1));
const _hoisted_6$1 = { class: "q-mb-lg" };
const _hoisted_7$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, "Category", -1));
const _hoisted_8$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, "Breads", -1));
const _hoisted_9$1 = { class: "q-mt-md q-gutter-y-sm" };
const _hoisted_10 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-thin" }, "Ingredients List", -1));
const _hoisted_11 = { class: "q-mt-xl q-gutter-y-sm" };
const _hoisted_12 = { class: "row justify-between" };
const _hoisted_13 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { align: "center" }, "Ingredients", -1));
const _hoisted_14 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { align: "center" }, "Quantity", -1));
const _hoisted_15 = ["onKeyup"];
const _hoisted_16 = { align: "right" };
const _sfc_main$4 = {
  __name: "RecipeCreate",
  setup(__props) {
    const route = useRoute();
    const branchId = route.params.branch_id;
    const recipeStore = useRecipeStore();
    const recipesData = computed(() => recipeStore.recipes);
    const branchRecipeStore = useBranchRecipeStore();
    const breadProductStore = useProductsStore();
    const ingredientsStore = useRawMaterialsStore();
    const branchRecipeRows = computed(() => branchRecipeStore.branchRecipes);
    const dialog = ref(false);
    const openDialog = () => {
      dialog.value = true;
    };
    const dismiss = () => {
      clearForm();
      dialog.value = false;
    };
    const capitalizeFirstLetter = (location) => {
      if (!location)
        return "";
      return location.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    };
    const searchQuery = ref("");
    const search = async () => {
      recipeStore.searchRecipe(searchQuery.value);
    };
    const isFormValid = computed(() => {
      return addBranchRecipe.target !== 0;
    });
    const autofillRecipe = (data) => {
      addBranchRecipe.recipe_id = data.id;
      addBranchRecipe.recipe_name = data.name;
      addBranchRecipe.category = data.category;
      searchQuery.value = "";
    };
    const addBranchRecipe = reactive({
      recipe_id: "",
      recipe_name: "",
      category: "",
      target: "",
      branches_id: route.params.branch_id
    });
    const loading = ref(false);
    const breadGroup = ref(null);
    const breadOptions = ref([]);
    const filterBreadOptions = ref(breadOptions.value);
    const ingredientGroup = ref([]);
    const ingredientOptions = ref([]);
    const selectedIngredients = reactive({
      name: "",
      quantity: ""
    });
    const filterIngredientsOptions = ref(ingredientOptions.value);
    const fetchBreadsData = async () => {
      await breadProductStore.fetchProductsByCategory("Bread");
      loading.value = false;
      breadOptions.value = breadProductStore.breads.map((val) => {
        return {
          label: val.name,
          value: val.id
        };
      });
    };
    fetchBreadsData();
    const fetchIngredientsData = async () => {
      await ingredientsStore.fetchIngredients("Ingredients");
      loading.value = false;
      ingredientOptions.value = ingredientsStore.ingredients.map((val) => {
        return {
          label: val.name,
          value: val.id,
          unit: val.unit
        };
      });
    };
    fetchIngredientsData();
    const clearData = () => {
      selectedIngredients.name = "", selectedIngredients.quantity = "";
    };
    const createValue = (val, done) => {
      if (val.length > 2) {
        if (!breadOptions.value.includes(val)) {
          done(val, "add-unique");
        }
      }
    };
    const filterFn = (val, update) => {
      update(() => {
        if (val === "") {
          filterBreadOptions.value = breadOptions.value;
        } else {
          const needle = val.toLowerCase();
          filterBreadOptions.value = breadOptions.value.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    };
    const filterIngredients = (val, update) => {
      update(() => {
        if (val === "") {
          filterIngredientsOptions.value = ingredientOptions.value;
        } else {
          const needle = val.toLowerCase();
          filterIngredientsOptions.value = ingredientOptions.value.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    };
    const addIngredients = () => {
      const data = ingredientGroup.value;
      function findObjectById(arr, id) {
        return arr.find((obj) => obj.ingredients_id == id);
      }
      const idToSearch = selectedIngredients.name.value;
      const foundObject = findObjectById(data, idToSearch);
      if (!foundObject) {
        ingredientGroup.value = [
          ...data,
          {
            ingredients_id: selectedIngredients.name.value,
            label: selectedIngredients.name.label,
            quantity: selectedIngredients.quantity,
            unit: selectedIngredients.name.unit
          }
        ];
        clearData();
      } else {
        Notify.create({
          type: "negative",
          icon: "warning",
          message: "Ingredient already exist",
          timeout: 2e3
        });
      }
    };
    const removeIngredient = (index) => {
      ingredientGroup.value.splice(index, 1);
    };
    watch(
      () => selectedIngredients.name,
      (newVal) => {
        if (newVal && newVal.unit) {
          selectedIngredients.unit = newVal.unit;
        } else {
          selectedIngredients.unit = "";
        }
      }
    );
    const clearRecipeData = () => {
      addBranchRecipe.recipe_id = "";
      addBranchRecipe.target = "";
      breadGroup.value = null;
      ingredientGroup.value = [];
      selectedIngredients.name = "";
      selectedIngredients.quantity = "";
    };
    const save = async () => {
      const newData = {
        recipe_id: addBranchRecipe.recipe_id,
        target: addBranchRecipe.target,
        status: "active",
        branch_id: addBranchRecipe.branches_id,
        breads: breadGroup.value.map((bread) => ({
          bread_id: bread.value
        })),
        ingredients: ingredientGroup.value.map((ingredient) => ({
          ingredient_id: ingredient.ingredients_id,
          quantity: ingredient.quantity
        }))
      };
      console.log("branchRecipe", newData);
      await branchRecipeStore.saveBranchRecipe(newData);
      branchRecipeRows.value = await branchRecipeStore.fetchBranchRecipes(branchId);
      clearRecipeData();
      dialog.value = false;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          outline: "",
          class: "text-dark q-pa-sm",
          push: "",
          dense: "",
          elevated: "",
          icon: "add_circle",
          label: "Create Branch Recipe",
          onClick: openDialog
        }),
        createVNode(QDialog, {
          modelValue: dialog.value,
          "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => dialog.value = $event)
        }, {
          default: withCtx(() => [
            createVNode(QCard, {
              class: "my-card",
              style: { "width": "400px", "max-width": "500px", "min-width": "100px" }
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
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2$3, [
                      createVNode(QInput, {
                        modelValue: searchQuery.value,
                        "onUpdate:modelValue": [
                          _cache[0] || (_cache[0] = ($event) => searchQuery.value = $event),
                          search
                        ],
                        debounce: "1000",
                        outlined: "",
                        rounded: "",
                        placeholder: "Search recipe",
                        dense: ""
                      }, {
                        append: withCtx(() => [
                          createBaseVNode("div", null, [
                            createVNode(QIcon, { name: "search" })
                          ])
                        ]),
                        default: withCtx(() => [
                          searchQuery.value ? (openBlock(), createElementBlock("div", _hoisted_3$2, [
                            createVNode(QCard, null, {
                              default: withCtx(() => [
                                createVNode(QList, { separator: "" }, {
                                  default: withCtx(() => {
                                    var _a;
                                    return [
                                      !((_a = recipesData.value) == null ? void 0 : _a.length) ? (openBlock(), createBlock(QItem, { key: 0 }, {
                                        default: withCtx(() => [
                                          createTextVNode(" No record found. ")
                                        ]),
                                        _: 1
                                      })) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(recipesData.value, (recipe) => {
                                        return openBlock(), createBlock(QItem, {
                                          onClick: ($event) => autofillRecipe(recipe),
                                          key: recipe.id,
                                          clickable: ""
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(QItemSection, null, {
                                              default: withCtx(() => [
                                                createVNode(QItemLabel, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(capitalizeFirstLetter(recipe.name)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
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
                    createBaseVNode("div", _hoisted_4$2, [
                      _hoisted_5$1,
                      createVNode(QInput, {
                        modelValue: addBranchRecipe.recipe_name,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => addBranchRecipe.recipe_name = $event),
                        readonly: "",
                        dense: "",
                        outlined: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    createBaseVNode("div", _hoisted_6$1, [
                      _hoisted_7$1,
                      createVNode(QInput, {
                        modelValue: addBranchRecipe.category,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => addBranchRecipe.category = $event),
                        readonly: "",
                        dense: "",
                        outlined: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    createBaseVNode("div", null, [
                      createVNode(QInput, {
                        modelValue: addBranchRecipe.target,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => addBranchRecipe.target = $event),
                        outlined: "",
                        dense: "",
                        suffix: " / 1kg",
                        type: "number",
                        label: "Target Pcs"
                      }, null, 8, ["modelValue"])
                    ]),
                    createBaseVNode("div", null, [
                      _hoisted_8$1,
                      createVNode(QSelect, {
                        modelValue: breadGroup.value,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => breadGroup.value = $event),
                        "use-input": "",
                        "use-chips": "",
                        "chips-color": "primary",
                        multiple: "",
                        "input-debounce": "0",
                        options: filterBreadOptions.value,
                        behavior: "menu",
                        "hide-dropdown-icon": "",
                        outlined: "",
                        dense: "",
                        label: "Bread/s",
                        onNewValue: createValue,
                        onFilter: filterFn,
                        rules: [(val) => val && val.length > 0 || "Bread is required"]
                      }, {
                        "no-option": withCtx(() => [
                          createVNode(QItem, null, {
                            default: withCtx(() => [
                              createVNode(QItemSection, { class: "text-grey" }, {
                                default: withCtx(() => [
                                  createTextVNode(" No results ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "options", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_9$1, [
                      _hoisted_10,
                      createBaseVNode("div", null, [
                        createVNode(QList, {
                          dense: "",
                          separator: "",
                          class: "box"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(ingredientGroup.value, (ingredient, index) => {
                              return openBlock(), createBlock(QItem, { key: index }, {
                                default: withCtx(() => [
                                  createVNode(QItemSection, null, {
                                    default: withCtx(() => [
                                      createVNode(QItemLabel, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(ingredient.label), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(QItemSection, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(ingredient.quantity) + " " + toDisplayString(ingredient.unit), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(QItemSection, { side: "" }, {
                                    default: withCtx(() => [
                                      createVNode(QBtn, {
                                        onClick: ($event) => removeIngredient(index),
                                        color: "grey-10",
                                        icon: "backspace",
                                        dense: "",
                                        flat: "",
                                        round: ""
                                      }, null, 8, ["onClick"])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_11, [
                      createBaseVNode("div", _hoisted_12, [
                        createBaseVNode("div", null, [
                          _hoisted_13,
                          createVNode(QSelect, {
                            modelValue: selectedIngredients.name,
                            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => selectedIngredients.name = $event),
                            debounce: "3000",
                            outlined: "",
                            "chips-color": "primary",
                            options: filterIngredientsOptions.value,
                            dense: "",
                            label: "Ingredients",
                            behavior: "menu",
                            "use-input": "",
                            "hide-dropdown-icon": "",
                            onFilter: filterIngredients,
                            style: { "width": "215px", "max-width": "450px", "min-width": "80px" }
                          }, {
                            "no-option": withCtx(() => [
                              createVNode(QItem, null, {
                                default: withCtx(() => [
                                  createVNode(QItemSection, { class: "text-grey" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" No results ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "options"])
                        ]),
                        createBaseVNode("div", null, [
                          _hoisted_14,
                          createVNode(QInput, {
                            modelValue: selectedIngredients.quantity,
                            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => selectedIngredients.quantity = $event),
                            outlined: "",
                            mask: "#####",
                            dense: "",
                            label: "Quantity",
                            suffix: selectedIngredients.name.unit || "",
                            style: { "width": "115px" }
                          }, null, 8, ["modelValue", "suffix"])
                        ])
                      ]),
                      createBaseVNode("form", {
                        onKeyup: withKeys(withModifiers(addIngredients, ["prevent"]), ["enter"])
                      }, [
                        createBaseVNode("div", _hoisted_16, [
                          createVNode(QBtn, {
                            padding: "xs md",
                            type: "button",
                            size: "sm",
                            outline: "",
                            dense: "",
                            label: "add",
                            icon: "add",
                            color: "purple",
                            onClick: addIngredients
                          })
                        ])
                      ], 40, _hoisted_15)
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardActions, {
                  class: "row q-ma-md",
                  align: "right"
                }, {
                  default: withCtx(() => [
                    createVNode(QBtn, {
                      class: "glossy",
                      color: "grey-9",
                      label: "Dismiss",
                      onClick: dismiss
                    }),
                    createVNode(QBtn, {
                      class: "glossy",
                      color: "teal",
                      label: "Create",
                      onClick: save,
                      disable: !isFormValid.value
                    }, null, 8, ["disable"])
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
var RecipeCreate = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-82f00e90"], ["__file", "RecipeCreate.vue"]]);
var RecipeDelete_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-33664d62"), n = n(), popScopeId(), n);
const _hoisted_1$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mb-xs" }, "Confirm Deletion", -1));
const _hoisted_2$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("p", { class: "text-body2 q-mb-none" }, " Are you sure you want to delete this item? This action cannot be undone. ", -1));
const _sfc_main$3 = {
  __name: "RecipeDelete",
  props: ["delete"],
  setup(__props) {
    const branchRecipeStore = useBranchRecipeStore();
    const props = __props;
    const dialogVisible = ref(false);
    const deleteDialog = () => {
      dialogVisible.value = true;
    };
    const onDelete = async () => {
      await branchRecipeStore.deleteRecipe(props.delete.row.id);
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
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
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
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ], 64);
    };
  }
};
var RecipeDelete = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-33664d62"], ["__file", "RecipeDelete.vue"]]);
var RecipeTable_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-1968f928"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { class: "row justify-between" };
const _hoisted_2$1 = { class: "q-my-sm" };
const _hoisted_3$1 = {
  key: 0,
  class: "spinner-wrapper"
};
const _hoisted_4$1 = { key: 1 };
const _hoisted_5 = {
  key: 0,
  class: "data-error"
};
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-ml-sm text-h6" }, "No data available", -1));
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-pb-sm text-center text-h6 text-weight-bold text-subtitle2" }, " Breads List ", -1));
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-pb-sm text-center text-h6 text-weight-bold text-subtitle2" }, " Ingredients List ", -1));
const _hoisted_9 = { class: "row justify-center q-gutter-x-md" };
const _sfc_main$2 = {
  __name: "RecipeTable",
  setup(__props) {
    const route = useRoute();
    const branchId = route.params.branch_id;
    const branchRecipeStore = useBranchRecipeStore();
    const filter = ref("");
    const loading = ref(true);
    const branchRecipes = ref([]);
    const showNoDataMessage = ref(false);
    const pagination = ref({
      rowsPerPage: 0
    });
    const status = ["inactive", "active"];
    const branchRecipeRows = computed(() => branchRecipeStore.branchRecipes);
    console.log("branch recipe", branchRecipeRows.value);
    const filteredRows = computed(() => {
      if (!filter.value) {
        return branchRecipeRows.value;
      }
      return branchRecipeRows.value.filter(
        (row) => row.name.toLowerCase().includes(filter.value.toLowerCase())
      );
    });
    onMounted(async () => {
      if (branchId) {
        await reloadTableData(branchId);
      }
    });
    const reloadTableData = async (branchId2) => {
      try {
        loading.value = true;
        const response = await branchRecipeStore.fetchBranchRecipes(branchId2);
        branchRecipeRows.value = response;
        console.log("branchRecipeRows", branchRecipeRows.value);
        if (!branchRecipeRows.value.length) {
          showNoDataMessage.value = true;
        }
        console.log("Branch recipe", branchRecipeRows.value);
      } catch (error) {
        console.log("Error fetching recipe", error);
      } finally {
        loading.value = false;
      }
    };
    async function updateRecipe(data, val) {
      try {
        const response = await api.put("/api/update-target/" + data.id, {
          target: parseInt(val)
        });
        console.log("response", response);
        if (response.status == 200) {
          const i = branchRecipes.value.findIndex((item) => item.id == data.id);
          branchRecipes.value[i] = val;
        }
        Notify.create({
          type: "positive",
          message: "Recipe target edited successfully"
        });
      } catch (error) {
        console.error("Error updating recipe target:", error);
        Notify.create({
          type: "negative",
          message: "Failed to edit recipe target"
        });
      }
    }
    async function updateRecipeStatus(data, val) {
      try {
        const response = await api.put("/api/branch-update-status/" + data.id, {
          status: val
        });
        if (response.status == 200) {
          const i = branchRecipes.value.findIndex((item) => item.id == data.id);
          branchRecipes.value[i] = val;
        }
        Notify.create({
          type: "positive",
          message: "Recipe status change successfully"
        });
      } catch (error) {
        console.error("Error updating recipe status:", error);
        Notify.create({
          type: "negative",
          message: "Failed to change recipe status"
        });
      }
    }
    const capitalizeFirstLetter = (location) => {
      if (!location)
        return "";
      return location.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    };
    const branchRecipeColumns = [
      {
        name: "name",
        label: "Recipe name",
        align: "center",
        field: (row) => row.name
      },
      {
        name: "category",
        label: "Category",
        align: "center",
        field: (row) => row.recipe
      },
      {
        name: "target",
        label: "Target",
        align: "center",
        field: "target"
      },
      {
        name: "status",
        label: "Status",
        align: "center",
        field: "status"
      },
      {
        name: "bread_groups",
        label: "List of Bread",
        align: "center",
        field: "bread_groups"
      },
      {
        name: "ingredient_groups",
        label: "List of Ingredients",
        align: "center",
        field: "ingredient_groups"
      },
      {
        name: "action",
        label: "Action",
        align: "center",
        sortable: true
      }
    ];
    const getBadgeStatusColor = (status2) => {
      switch (status2) {
        case "inactive":
          return "grey";
        case "active":
          return "green";
        default:
          return "grey";
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$1, [
          createBaseVNode("div", null, [
            createVNode(QInput, {
              class: "q-pb-lg q-pl-md",
              modelValue: filter.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filter.value = $event),
              outlined: "",
              placeholder: "Search",
              debounce: "1000",
              style: { "width": "450px", "max-width": "1500px", "min-width": "100px" },
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
          createBaseVNode("div", _hoisted_2$1, [
            createVNode(RecipeCreate)
          ])
        ]),
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
          createVNode(QSpinnerDots, {
            size: "50px",
            color: "primary"
          })
        ])) : (openBlock(), createElementBlock("div", _hoisted_4$1, [
          filteredRows.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_5, [
            createVNode(QIcon, {
              name: "warning",
              color: "warning",
              size: "4em"
            }),
            _hoisted_6
          ])) : (openBlock(), createBlock(QTable, {
            key: 1,
            class: "table-container sticky-header",
            filter: filter.value,
            "virtual-scroll-sticky-size-start": 48,
            flat: "",
            columns: branchRecipeColumns,
            rows: filteredRows.value,
            "row-key": "name",
            "virtual-scroll": "",
            pagination: pagination.value,
            "onUpdate:pagination": _cache[1] || (_cache[1] = ($event) => pagination.value = $event),
            "rows-per-page-options": [0],
            "hide-bottom": "",
            style: { "height": "350px" }
          }, {
            "body-cell-name": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("span", null, toDisplayString(capitalizeFirstLetter(props.row.name)), 1)
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-category": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("span", null, toDisplayString(capitalizeFirstLetter(props.row.category)), 1)
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-target": withCtx((props) => [
              createVNode(QTd, {
                "auto-width": "",
                class: "cursor-pointer text-center"
              }, {
                default: withCtx(() => [
                  createBaseVNode("span", null, [
                    createTextVNode(toDisplayString(props.row.target ? props.row.target : "Set Target") + " ", 1),
                    createVNode(QTooltip, {
                      class: "bg-blue-grey-8",
                      offset: [10, 10]
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Edit Target")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(QPopupEdit, {
                    "onUpdate:modelValue": [(val) => updateRecipe(props.row, val), ($event) => props.row.target = $event],
                    modelValue: props.row.target,
                    "auto-save": ""
                  }, {
                    default: withCtx((scope) => [
                      createVNode(QInput, {
                        modelValue: scope.value,
                        "onUpdate:modelValue": ($event) => scope.value = $event,
                        dense: "",
                        suffix: "pcs",
                        autofocus: "",
                        counter: "",
                        mask: "###",
                        onKeyup: withKeys(scope.set, ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"])
                    ]),
                    _: 2
                  }, 1032, ["onUpdate:modelValue", "modelValue"])
                ]),
                _: 2
              }, 1024)
            ]),
            "body-cell-status": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createVNode(QBadge, {
                    outline: "",
                    color: getBadgeStatusColor(props.row.status)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(capitalizeFirstLetter(props.row.status)) + " ", 1),
                      createVNode(QTooltip, {
                        class: "bg-blue-grey-8",
                        offset: [10, 10]
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Change Status")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, 1032, ["color"]),
                  createVNode(QPopupEdit, {
                    "onUpdate:modelValue": [(val) => updateRecipeStatus(props.row, val), ($event) => props.row.status = $event],
                    modelValue: props.row.status,
                    "auto-save": ""
                  }, {
                    default: withCtx((scope) => [
                      createBaseVNode("span", null, toDisplayString(props.row.name), 1),
                      createVNode(QSelect, {
                        modelValue: scope.value,
                        "onUpdate:modelValue": ($event) => scope.value = $event,
                        dense: "",
                        label: "status",
                        autofocus: "",
                        options: status,
                        counter: "",
                        mask: "###",
                        onKeyup: withKeys(scope.set, ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"])
                    ]),
                    _: 2
                  }, 1032, ["onUpdate:modelValue", "modelValue"])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-bread_groups": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createVNode(QTooltip, {
                    offset: [0, 10],
                    delay: 600,
                    class: "bg-info text-dark text-subtitle1"
                  }, {
                    default: withCtx(() => [
                      _hoisted_7,
                      createVNode(QSeparator, {
                        class: "q-mb-md",
                        color: "yellow"
                      }),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(props.row.bread_groups, (bread) => {
                        return openBlock(), createElementBlock("div", { key: bread }, toDisplayString(bread), 1);
                      }), 128))
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(QChip, {
                    square: "",
                    outline: "",
                    color: "red-6",
                    class: "text-white"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(props.row.bread_groups.length) + " breads ", 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-ingredient_groups": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createVNode(QTooltip, {
                    delay: 600,
                    class: "bg-info text-dark text-subtitle1",
                    style: { "width": "300px" }
                  }, {
                    default: withCtx(() => [
                      _hoisted_8,
                      createVNode(QSeparator, {
                        class: "q-mb-md",
                        color: "yellow"
                      }),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(props.row.ingredient_groups, (ingredient) => {
                        return openBlock(), createElementBlock("div", {
                          class: "row justify-between",
                          key: ingredient.ingredient_name
                        }, [
                          createBaseVNode("div", null, toDisplayString(ingredient.ingredient_name), 1),
                          createBaseVNode("div", null, toDisplayString(ingredient.quantity) + " " + toDisplayString(ingredient.unit), 1)
                        ]);
                      }), 128))
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(QChip, {
                    square: "",
                    outline: "",
                    color: "purple-6",
                    class: "text-white"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(props.row.ingredient_groups.length) + " ingredients ", 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-action": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_9, [
                    createVNode(RecipeDelete, { delete: props }, null, 8, ["delete"])
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
var RecipeTable = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-1968f928"], ["__file", "RecipeTable.vue"]]);
const _sfc_main$1 = {
  __name: "RecipePage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(RecipeTable)
      ]);
    };
  }
};
var RecipePage = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "RecipePage.vue"]]);
var BranchIdPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = { class: "elegant-container q-gutter-md" };
const _hoisted_2 = { class: "text-h6 row justify-between" };
const _hoisted_3 = { class: "q-gutter-sm" };
const _hoisted_4 = { class: "tab-container" };
const _sfc_main = {
  __name: "BranchIdPage",
  setup(__props) {
    const route = useRoute();
    const branchName = ref("");
    const router = useRouter();
    const getBranchById = async (branchId) => {
      const res = await api.get(`/api/branches/${branchId}`);
      return res.data;
    };
    const getBranch = async () => {
      const branchId = route.params.branch_id;
      const branch = await getBranchById(branchId);
      if (branch && branch.name) {
        branchName.value = branch.name;
      } else {
        console.error("Branch data is missing 'name' property or invalid:", branch);
      }
    };
    onMounted(() => {
      getBranch();
    });
    const capitalizeFirstLetter = (location) => {
      if (!location)
        return "";
      return location.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    };
    const tab = ref("products");
    const navigateBack = () => {
      Plugin.show();
      router.push("/admin/branches").finally(() => {
        Plugin.hide();
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, { padding: "" }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("div", null, [
                createVNode(QBtn, {
                  outline: "",
                  flat: "",
                  icon: "arrow_back",
                  onClick: navigateBack
                }),
                createVNode(QSpace)
              ]),
              createBaseVNode("div", null, [
                createVNode(QIcon, {
                  name: "fa-solid fa-store",
                  color: "red-6"
                }),
                createTextVNode(" " + toDisplayString(capitalizeFirstLetter(branchName.value)), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("div", _hoisted_4, [
                createVNode(QTabs, {
                  modelValue: tab.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => tab.value = $event),
                  dense: "",
                  class: "bg-grey-2 text-grey-7 tabs-as-cards",
                  "active-color": "red-6",
                  "indicator-color": "transparent",
                  align: "justify"
                }, {
                  default: withCtx(() => [
                    createVNode(QTab, {
                      name: "products",
                      label: "Products"
                    }),
                    createVNode(QTab, {
                      name: "rawMaterials",
                      label: "Raw Materials"
                    }),
                    createVNode(QTab, {
                      name: "recipe",
                      label: "Recipe"
                    }),
                    createVNode(QTab, {
                      name: "production",
                      label: "Production"
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              createVNode(QCard, { class: "q-mt-sm" }, {
                default: withCtx(() => [
                  createVNode(QTabPanels, {
                    modelValue: tab.value,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => tab.value = $event),
                    animated: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(QTabPanel, { name: "products" }, {
                        default: withCtx(() => [
                          createVNode(ProductPage)
                        ]),
                        _: 1
                      }),
                      createVNode(QTabPanel, { name: "rawMaterials" }, {
                        default: withCtx(() => [
                          createVNode(RawMaterialsPage)
                        ]),
                        _: 1
                      }),
                      createVNode(QTabPanel, { name: "recipe" }, {
                        default: withCtx(() => [
                          createVNode(RecipePage)
                        ]),
                        _: 1
                      }),
                      createVNode(QTabPanel, { name: "production" }, {
                        default: withCtx(() => [
                          createVNode(ProductionPage)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              })
            ])
          ])
        ]),
        _: 1
      });
    };
  }
};
var BranchIdPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1194b1a2"], ["__file", "BranchIdPage.vue"]]);
export { BranchIdPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnJhbmNoSWRQYWdlLmI3MjkwMzI4LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RvcmVzL2JyYW5jaC1wcm9kdWN0LmpzIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvYnJhbmNoZXMvaWQvY29tcG9uZW50cy9wcm9kdWN0cy9jb21wb25lbnRzL1Byb2R1Y3RDcmVhdGUudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvYnJhbmNoZXMvaWQvY29tcG9uZW50cy9wcm9kdWN0cy9jb21wb25lbnRzL1Byb2R1Y3REZWxldGUudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvYnJhbmNoZXMvaWQvY29tcG9uZW50cy9wcm9kdWN0cy9jb21wb25lbnRzL1Byb2R1Y3RUYWJsZS52dWUiLCIuLi8uLi8uLi9zcmMvc3RvcmVzL2JyYW5jaC1yYXdNYXRlcmlhbHMuanMiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9icmFuY2hlcy9pZC9jb21wb25lbnRzL3Jhd19tYXRlcmlhbHMvY29tcG9uZW50cy9SYXdNYXRlcmlhbHNDcmVhdGUudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvYnJhbmNoZXMvaWQvY29tcG9uZW50cy9yYXdfbWF0ZXJpYWxzL2NvbXBvbmVudHMvUmF3TWF0ZXJpYWxzVGFibGVEZWxldGUudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvYnJhbmNoZXMvaWQvY29tcG9uZW50cy9yYXdfbWF0ZXJpYWxzL2NvbXBvbmVudHMvUmF3TWF0ZXJpYWxzVGFibGUudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvYnJhbmNoZXMvaWQvY29tcG9uZW50cy9wcm9kdWN0aW9uL2NvbXBvbmVudHMvcmVwb3J0LXBhbmVsL0Jha2VyUmVwb3J0UGFuZWwudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvYnJhbmNoZXMvaWQvY29tcG9uZW50cy9wcm9kdWN0aW9uL2NvbXBvbmVudHMvcmVwb3J0LXBhbmVsL3NhbGVzLXJlcG9ydC9wcm9kdWN0cy9CcmVhZFJlcG9ydC52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9icmFuY2hlcy9pZC9jb21wb25lbnRzL3Byb2R1Y3Rpb24vY29tcG9uZW50cy9yZXBvcnQtcGFuZWwvc2FsZXMtcmVwb3J0L3Byb2R1Y3RzL1NlbGVjdGFSZXBvcnQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvYnJhbmNoZXMvaWQvY29tcG9uZW50cy9wcm9kdWN0aW9uL2NvbXBvbmVudHMvcmVwb3J0LXBhbmVsL3NhbGVzLXJlcG9ydC9wcm9kdWN0cy9Tb2Z0ZHJpbmtzUmVwb3J0LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL2JyYW5jaGVzL2lkL2NvbXBvbmVudHMvcHJvZHVjdGlvbi9jb21wb25lbnRzL3JlcG9ydC1wYW5lbC9zYWxlcy1yZXBvcnQvUHJvZHVjdHNSZXBvcnQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvYnJhbmNoZXMvaWQvY29tcG9uZW50cy9wcm9kdWN0aW9uL2NvbXBvbmVudHMvcmVwb3J0LXBhbmVsL3NhbGVzLXJlcG9ydC9EZW5vbWluYXRpb25EaWFsb2dSZXBvcnQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvYnJhbmNoZXMvaWQvY29tcG9uZW50cy9wcm9kdWN0aW9uL2NvbXBvbmVudHMvcmVwb3J0LXBhbmVsL3NhbGVzLXJlcG9ydC9EZW5vbWluYXRpb25SZXBvcnQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvYnJhbmNoZXMvaWQvY29tcG9uZW50cy9wcm9kdWN0aW9uL2NvbXBvbmVudHMvcmVwb3J0LXBhbmVsL3NhbGVzLXJlcG9ydC9FeHBlbnNlc0RpYWxvZy52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9icmFuY2hlcy9pZC9jb21wb25lbnRzL3Byb2R1Y3Rpb24vY29tcG9uZW50cy9yZXBvcnQtcGFuZWwvc2FsZXMtcmVwb3J0L0V4cGVuc2VzUmVwb3J0LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL2JyYW5jaGVzL2lkL2NvbXBvbmVudHMvcHJvZHVjdGlvbi9jb21wb25lbnRzL3JlcG9ydC1wYW5lbC9zYWxlcy1yZXBvcnQvQ3JlZGl0c1JlcG9ydERpYWxvZy52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9icmFuY2hlcy9pZC9jb21wb25lbnRzL3Byb2R1Y3Rpb24vY29tcG9uZW50cy9yZXBvcnQtcGFuZWwvc2FsZXMtcmVwb3J0L0NyZWRpdHNSZXBvcnQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvYnJhbmNoZXMvaWQvY29tcG9uZW50cy9wcm9kdWN0aW9uL2NvbXBvbmVudHMvcmVwb3J0LXBhbmVsL1NhbGVzUmVwb3J0UGFuZWwudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvYnJhbmNoZXMvaWQvY29tcG9uZW50cy9wcm9kdWN0aW9uL2NvbXBvbmVudHMvUHJvZHVjdGlvblJlcG9ydERpYWxvZy52dWUiLCIuLi8uLi8uLi9zcmMvc3RvcmVzL3Byb2R1Y3Rpb24uanMiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9icmFuY2hlcy9pZC9jb21wb25lbnRzL3Byb2R1Y3Rpb24vY29tcG9uZW50cy9Qcm9kdWN0aW9uVGFibGUudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvYnJhbmNoZXMvaWQvY29tcG9uZW50cy9yZWNpcGUvY29tcG9uZW50L1JlY2lwZUNyZWF0ZS52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9icmFuY2hlcy9pZC9jb21wb25lbnRzL3JlY2lwZS9jb21wb25lbnQvUmVjaXBlRGVsZXRlLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL2JyYW5jaGVzL2lkL2NvbXBvbmVudHMvcmVjaXBlL2NvbXBvbmVudC9SZWNpcGVUYWJsZS52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9icmFuY2hlcy9pZC9CcmFuY2hJZFBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlZmluZVN0b3JlIH0gZnJvbSBcInBpbmlhXCI7XG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwic3JjL2Jvb3QvYXhpb3NcIjtcbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyB1c2VQcm9kdWN0c1N0b3JlIH0gZnJvbSBcIi4vcHJvZHVjdFwiO1xuaW1wb3J0IHsgTG9hZGluZywgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuXG5leHBvcnQgY29uc3QgdXNlQnJhbmNoUHJvZHVjdHNTdG9yZSA9IGRlZmluZVN0b3JlKFwiYnJhbmNoUHJvZHVjdHNcIiwgKCkgPT4ge1xuICBjb25zdCBicmFuY2hQcm9kdWN0ID0gcmVmKG51bGwpO1xuICBjb25zdCBicmFuY2hQcm9kdWN0cyA9IHJlZihbXSk7XG4gIGNvbnN0IGJyYW5jaElkID0gcmVmKFtdKTtcblxuICBjb25zdCBwcm9kdWN0c1N0b3JlID0gdXNlUHJvZHVjdHNTdG9yZSgpO1xuICBjb25zdCBwcm9kdWN0cyA9IGNvbXB1dGVkKCgpID0+IHByb2R1Y3RzU3RvcmUucHJvZHVjdHMpO1xuICBjb25zb2xlLmxvZyhcIkJyYW5jaCBQUm9kdWN0c3NzczpcIiwgcHJvZHVjdHMudmFsdWUpO1xuXG4gIGNvbnN0IGZldGNoQnJhbmNoUHJvZHVjdHMgPSBhc3luYyAoYnJhbmNoSWQpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoYC9hcGkvYnJhbmNoZXMvJHticmFuY2hJZH0vcHJvZHVjdHNgKTtcbiAgICBicmFuY2hQcm9kdWN0cy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlQnJhbmNoUHJvZHVjdHMgPSBhc3luYyAoZGF0YSkgPT4ge1xuICAgIExvYWRpbmcuc2hvdygpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGNhdGVnb3J5LCBwcmljZSB9ID0gZGF0YTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnBvc3QoYC9hcGkvYnJhbmNoLXByb2R1Y3RzYCwgZGF0YSk7XG5cbiAgICAgIGlmIChyZXNwb25zZS5kYXRhLm1lc3NhZ2UgPT09IFwiQnJhbmNoIHByb2R1Y3Qgc2F2ZWQgc3VjY2Vzc2Z1bGx5XCIpIHtcbiAgICAgICAgY29uc3QgcHJvZHVjdCA9IHByb2R1Y3RzLnZhbHVlLmZpbmQoXG4gICAgICAgICAgKGl0ZW0pID0+IGl0ZW0uaWQgPT09IGRhdGEucHJvZHVjdF9pZFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IG5ld1Byb2R1Y3QgPSB7XG4gICAgICAgICAgLi4ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICBjYXRlZ29yeTogY2F0ZWdvcnkgPyBjYXRlZ29yeSA6IFwiTm8gQ2F0ZWdvcnlcIixcbiAgICAgICAgICBwcmljZTogcHJpY2UgPyBwYXJzZUludChwcmljZSkgOiAwLFxuICAgICAgICAgIHByb2R1Y3Q6IHByb2R1Y3RcbiAgICAgICAgICAgID8gcHJvZHVjdFxuICAgICAgICAgICAgOiB7IG5hbWU6IFwiTm8gUHJvZHVjdFwiLCBjYXRlZ29yeTogXCJVbmtub3duXCIgfSxcbiAgICAgICAgICB0b3RhbF9xdWFudGl0eTogZGF0YS50b3RhbF9xdWFudGl0eSwgLy8gRW5zdXJlIHRoaXMgZmllbGQgaXMgc2V0IGNvcnJlY3RseVxuICAgICAgICB9O1xuXG4gICAgICAgIGJyYW5jaFByb2R1Y3RzLnZhbHVlLnVuc2hpZnQobmV3UHJvZHVjdCk7XG4gICAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcbiAgICAgICAgICBtZXNzYWdlOiBcIkJyYW5jaCBwcm9kdWN0IHNhdmVkIHN1Y2Nlc3NmdWxseVwiLFxuICAgICAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHJlc3BvbnNlLmRhdGEubWVzc2FnZSA9PT0gXCJUaGUgcHJvZHVjdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGlzIGJyYW5jaC5cIlxuICAgICAgKSB7XG4gICAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiVGhlIHByb2R1Y3QgYWxyZWFkeSBleGlzdHMgaW4gdGhpcyBicmFuY2guXCIsXG4gICAgICAgICAgcG9zaXRpb246IFwidG9wXCIsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgICBtZXNzYWdlOiBcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIHNhdmluZyB0aGUgYnJhbmNoIHByb2R1Y3QuXCIsXG4gICAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIExvYWRpbmcuaGlkZSgpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCB1cGRhdGVCcmFuY2hQcm9kdWN0UHJpY2UgPSBhc3luYyAoaWQpID0+IHtcbiAgICBhd2FpdCBhcGkucHV0KGAvYXBpL3VwZGF0ZS1icmFuY2gtcHJvZHVjdHMvJHtpZH1gLCB7IHByaWNlOiBuZXdQcmljZSB9KTtcbiAgICBjb25zdCBpbmRleCA9IGJyYW5jaFByb2R1Y3RzLnZhbHVlLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gaWQpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIGJyYW5jaFByb2R1Y3RzLnZhbHVlW2luZGV4XS5wcmljZSA9IG5ld1ByaWNlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBkZWxldGVCcmFuY2hQcm9kdWN0cyA9IGFzeW5jIChpZCkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmRlbGV0ZShgL2FwaS9icmFuY2gtcHJvZHVjdHMvJHtpZH1gKTtcbiAgICBicmFuY2hQcm9kdWN0cy52YWx1ZSA9IGJyYW5jaFByb2R1Y3RzLnZhbHVlLmZpbHRlcihcbiAgICAgIChicmFuY2hQcm9kdWN0KSA9PiBicmFuY2hQcm9kdWN0LmlkICE9PSBpZFxuICAgICk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBicmFuY2hJZCxcbiAgICBicmFuY2hQcm9kdWN0LFxuICAgIGJyYW5jaFByb2R1Y3RzLFxuICAgIGZldGNoQnJhbmNoUHJvZHVjdHMsXG4gICAgY3JlYXRlQnJhbmNoUHJvZHVjdHMsXG4gICAgdXBkYXRlQnJhbmNoUHJvZHVjdFByaWNlLFxuICAgIGRlbGV0ZUJyYW5jaFByb2R1Y3RzLFxuICB9O1xufSk7XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWJ0blxuICAgIG91dGxpbmVcbiAgICBjbGFzcz1cInRleHQtZGFyayBxLXBhLXNtXCJcbiAgICBwdXNoXG4gICAgZGVuc2VcbiAgICBlbGV2YXRlZFxuICAgIGljb249XCJhZGRfY2lyY2xlXCJcbiAgICBsYWJlbD1cIkNyZWF0ZSBCcmFuY2ggUHJvZHVjdFwiXG4gICAgQGNsaWNrPVwib3Blbl9jcmVhdGVfYnJlYWRfZGlhbG9nXCJcbiAgLz5cbiAgPHEtZGlhbG9nIHYtbW9kZWw9XCJkaWFsb2dcIiBwZXJzaXN0ZW50PlxuICAgIDxxLWNhcmRcbiAgICAgIGNsYXNzPVwibXktY2FyZFwiXG4gICAgICBzdHlsZT1cIndpZHRoOiA0MDBweDsgbWF4LXdpZHRoOiA1MDBweDsgbWluLXdpZHRoOiAxMDBweFwiXG4gICAgPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uXG4gICAgICAgIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciB0ZXh0LXdoaXRlXCJcbiAgICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjZWY0NDQ0XCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5DcmVhdGUgQnJhbmNoIFByb2R1Y3Q8L2Rpdj5cbiAgICAgICAgPHEtc3BhY2UgLz5cbiAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgZGVuc2Ugcm91bmQgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtbWEtbWQgcS1ndXR0ZXIteS1zbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1tYi1sZ1wiPlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICB2LW1vZGVsPVwic2VhcmNoUXVlcnlcIlxuICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cInNlYXJjaFwiXG4gICAgICAgICAgICBkZWJvdW5jZT1cIjEwMDBcIlxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIHJvdW5kZWRcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIHByb2R1Y3RcIlxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJzZWFyY2hcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8ZGl2IHYtaWY9XCJzZWFyY2hRdWVyeVwiIGNsYXNzPVwiY3VzdG9tLWxpc3Qgei10b3BcIj5cbiAgICAgICAgICAgICAgPHEtY2FyZD5cbiAgICAgICAgICAgICAgICA8cS1saXN0IHNlcGFyYXRvcj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0gdi1pZj1cIiFwcm9kdWN0RGF0YT8ubGVuZ3RoXCI+XG4gICAgICAgICAgICAgICAgICAgIE5vIHJlY29yZCBmb3VuZC5cbiAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbVxuICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cImF1dG9GaWxsUHJvZHVjdChwcm9kdWN0KVwiXG4gICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCJwcm9kdWN0IGluIHByb2R1Y3REYXRhXCJcbiAgICAgICAgICAgICAgICAgICAgICA6a2V5PVwicHJvZHVjdC5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhcGl0YWxpemVGaXJzdExldHRlcihwcm9kdWN0Lm5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9fTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L3EtbGlzdD5cbiAgICAgICAgICAgICAgPC9xLWNhcmQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXY+UHJvZHVjdCBOYW1lPC9kaXY+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJhZGROZXdCcmFuY2hQcm9kdWN0Rm9ybS5wcm9kdWN0X25hbWVcIlxuICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXY+Q2F0ZWdvcnk8L2Rpdj5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgdi1tb2RlbD1cImFkZE5ld0JyYW5jaFByb2R1Y3RGb3JtLmNhdGVnb3J5XCJcbiAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdj5CZWdpbm5pbmdzPC9kaXY+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICB2LW1vZGVsPVwiYWRkTmV3QnJhbmNoUHJvZHVjdEZvcm0uYmVnaW5uaW5nc1wiXG4gICAgICAgICAgICAgIG1hc2s9XCIjIyMjI1wiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDE1MHB4XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXY+VG90YWwgUXVhbnRpdHk8L2Rpdj5cbiAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJhZGROZXdCcmFuY2hQcm9kdWN0Rm9ybS50b3RhbF9xdWFudGl0eVwiXG4gICAgICAgICAgICAgIG1hc2s9XCIjIyMjI1wiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDE1MHB4XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXY+UHJpY2U8L2Rpdj5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgdi1tb2RlbD1cImFkZE5ld0JyYW5jaFByb2R1Y3RGb3JtLnByaWNlXCJcbiAgICAgICAgICAgIG1hc2s9XCIjIyMjI1wiXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDE1MHB4XCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLSA8ZGl2PlxuICAgICAgICAgIDxkaXY+UHJpY2U8L2Rpdj5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgdi1tb2RlbD1cImFkZE5ld0JyYW5jaFByb2R1Y3RGb3JtLnByaWNlXCJcbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PiAtLT5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8IS0tIDxxLXNlcGFyYXRvciAvPiAtLT5cbiAgICAgIDxxLWNhcmQtYWN0aW9ucyBjbGFzcz1cInJvdyBxLW1hLW1kXCIgYWxpZ249XCJyaWdodFwiPlxuICAgICAgICA8cS1idG4gY2xhc3M9XCJnbG9zc3lcIiBjb2xvcj1cImdyZXktOVwiIGxhYmVsPVwiRGlzbWlzc1wiIEBjbGljaz1cImRpc21pc3NcIiAvPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBjbGFzcz1cImdsb3NzeVwiXG4gICAgICAgICAgY29sb3I9XCJ0ZWFsXCJcbiAgICAgICAgICBsYWJlbD1cIkNyZWF0ZVwiXG4gICAgICAgICAgQGNsaWNrPVwic2F2ZVwiXG4gICAgICAgICAgOmRpc2FibGU9XCIhaXNGb3JtVmFsaWRcIlxuICAgICAgICAvPlxuICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyB1c2VCcmFuY2hQcm9kdWN0c1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvYnJhbmNoLXByb2R1Y3RcIjtcbmltcG9ydCB7IHVzZVByb2R1Y3RzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9wcm9kdWN0XCI7XG5pbXBvcnQgeyByZWYsIHJlYWN0aXZlLCBjb21wdXRlZCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IHVzZVJvdXRlIH0gZnJvbSBcInZ1ZS1yb3V0ZXJcIjtcblxuY29uc3Qgcm91dGUgPSB1c2VSb3V0ZSgpO1xuY29uc3QgcHJvZHVjdFN0b3JlID0gdXNlUHJvZHVjdHNTdG9yZSgpO1xuY29uc3QgcHJvZHVjdERhdGEgPSBjb21wdXRlZCgoKSA9PiBwcm9kdWN0U3RvcmUucHJvZHVjdHMpO1xuY29uc3QgYnJhbmNoUHJvZHVjdHMgPSB1c2VCcmFuY2hQcm9kdWN0c1N0b3JlKCk7XG5cbmNvbnN0IHNlYXJjaFF1ZXJ5ID0gcmVmKFwiXCIpO1xuY29uc3Qgc2VhcmNoID0gYXN5bmMgKCkgPT4ge1xuICBwcm9kdWN0U3RvcmUuc2VhcmNoUHJvZHVjdHMoc2VhcmNoUXVlcnkudmFsdWUpO1xufTtcblxuY29uc3QgaXNGb3JtVmFsaWQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgYWRkTmV3QnJhbmNoUHJvZHVjdEZvcm0ucHJpY2UgIT09IDAgJiZcbiAgICBhZGROZXdCcmFuY2hQcm9kdWN0Rm9ybS5iZWdpbm5pbmdzICE9PSAwICYmXG4gICAgYWRkTmV3QnJhbmNoUHJvZHVjdEZvcm0udG90YWxfcXVhbnRpdHkgIT09IDBcbiAgKTtcbn0pO1xuXG5jb25zdCBkaWFsb2cgPSByZWYoZmFsc2UpO1xuY29uc3Qgb3Blbl9jcmVhdGVfYnJlYWRfZGlhbG9nID0gKCkgPT4ge1xuICBkaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcbmNvbnN0IGRpc21pc3MgPSAoKSA9PiB7XG4gIGNsZWFyRm9ybSgpO1xuICBkaWFsb2cudmFsdWUgPSBmYWxzZTtcbn07XG5cbmNvbnN0IGNhcGl0YWxpemVGaXJzdExldHRlciA9IChsb2NhdGlvbikgPT4ge1xuICBpZiAoIWxvY2F0aW9uKSByZXR1cm4gXCJcIjtcbiAgcmV0dXJuIGxvY2F0aW9uXG4gICAgLnNwbGl0KFwiIFwiKVxuICAgIC5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkpXG4gICAgLmpvaW4oXCIgXCIpO1xufTtcblxuY29uc3QgYXV0b0ZpbGxQcm9kdWN0ID0gKGRhdGEpID0+IHtcbiAgYWRkTmV3QnJhbmNoUHJvZHVjdEZvcm0ucHJvZHVjdF9pZCA9IGRhdGEuaWQ7XG4gIGFkZE5ld0JyYW5jaFByb2R1Y3RGb3JtLnByb2R1Y3RfbmFtZSA9IGRhdGEubmFtZTtcbiAgYWRkTmV3QnJhbmNoUHJvZHVjdEZvcm0uY2F0ZWdvcnkgPSBkYXRhLmNhdGVnb3J5O1xuICBzZWFyY2hRdWVyeS52YWx1ZSA9IFwiXCI7XG59O1xuY29uc3QgYWRkTmV3QnJhbmNoUHJvZHVjdEZvcm0gPSByZWFjdGl2ZSh7XG4gIHByb2R1Y3RfaWQ6IFwiXCIsXG4gIHByb2R1Y3RfbmFtZTogXCJcIixcbiAgcHJpY2U6IDAsXG4gIGJlZ2lubmluZ3M6IDAsXG4gIHRvdGFsX3F1YW50aXR5OiAwLFxuICBicmFuY2hlc19pZDogcm91dGUucGFyYW1zLmJyYW5jaF9pZCxcbn0pO1xuXG5jb25zdCBjbGVhckZvcm0gPSAoKSA9PiB7XG4gIGFkZE5ld0JyYW5jaFByb2R1Y3RGb3JtLnByb2R1Y3RfaWQgPSBcIlwiO1xuICBhZGROZXdCcmFuY2hQcm9kdWN0Rm9ybS5wcm9kdWN0X25hbWUgPSBcIlwiO1xuICBhZGROZXdCcmFuY2hQcm9kdWN0Rm9ybS5jYXRlZ29yeSA9IFwiXCI7XG4gIGFkZE5ld0JyYW5jaFByb2R1Y3RGb3JtLnByaWNlID0gMDtcbiAgYWRkTmV3QnJhbmNoUHJvZHVjdEZvcm0uYmVnaW5uaW5ncyA9IDA7XG4gIGFkZE5ld0JyYW5jaFByb2R1Y3RGb3JtLnRvdGFsX3F1YW50aXR5ID0gMDtcbn07XG5cbmNvbnN0IHNhdmUgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBwcm9kdWN0X25hbWUsIC4uLmRhdGEgfSA9IGFkZE5ld0JyYW5jaFByb2R1Y3RGb3JtO1xuICAgIGF3YWl0IGJyYW5jaFByb2R1Y3RzLmNyZWF0ZUJyYW5jaFByb2R1Y3RzKGRhdGEpO1xuICAgIGNvbnNvbGUubG9nKFwiZGF0YSB0byBzZW5kXCIsIGRhdGEpO1xuICAgIC8vIGF3YWl0IHJlbG9hZFRhYmxlRGF0YShyb3V0ZS5wYXJhbXMuYnJhbmNoX2lkKTtcbiAgICBjbGVhckZvcm0oKTtcbiAgICBkaWFsb2cudmFsdWUgPSBmYWxzZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cbn07XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtYnRuXG4gICAgQGNsaWNrPVwib3Blbl9kaWFsb2dcIlxuICAgIGNvbG9yPVwibmVnYXRpdmVcIlxuICAgIGljb249XCJkZWxldGVcIlxuICAgIHNpemU9XCJzbVwiXG4gICAgZmxhdFxuICAgIHJvdW5kXG4gICAgZGVuc2VcbiAgICBhbGlnbj1cImNlbnRlclwiXG4gID5cbiAgICA8cS10b29sdGlwIGNsYXNzPVwiYmctbmVnYXRpdmVcIiA6ZGVsYXk9XCIyMDBcIj5EZWxldGU8L3EtdG9vbHRpcD5cbiAgPC9xLWJ0bj5cbiAgPHEtZGlhbG9nIHYtbW9kZWw9XCJkaWFsb2dcIj5cbiAgICA8cS1jYXJkPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uXG4gICAgICAgIGNsYXNzPVwicS1wYS1tZCBxLXJvdW5kZWQgcS1lbGV2YXRlLTIgYmctd2hpdGUgdGV4dC1ncmV5LTlcIlxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNSBxLW1iLXhzXCI+Q29uZmlybSBEZWxldGlvbjwvZGl2PlxuICAgICAgICA8cCBjbGFzcz1cInRleHQtYm9keTIgcS1tYi1ub25lXCI+XG4gICAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/IFRoaXMgYWN0aW9uIGNhbm5vdCBiZVxuICAgICAgICAgIHVuZG9uZS5cbiAgICAgICAgPC9wPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLXNlcGFyYXRvciBjbGFzcz1cInEtbWItbWRcIiAvPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8cS1jYXJkLWFjdGlvbnMgYWxpZ249XCJyaWdodFwiIGNsYXNzPVwicS1wdC1ub25lXCI+XG4gICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgbGFiZWw9XCJDYW5jZWxcIlxuICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIHYtY2xvc2UtcG9wdXBcbiAgICAgICAgICAgIGNsYXNzPVwicS1tci1zbVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBsYWJlbD1cIkRlbGV0ZVwiXG4gICAgICAgICAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICAgICAgICAgIEBjbGljaz1cIm9uRGVsZXRlXCJcbiAgICAgICAgICAgIGNsYXNzPVwicS1idG4tcm91bmRlZCBxLXB4LWxnXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L3EtY2FyZC1hY3Rpb25zPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyB1c2VCcmFuY2hQcm9kdWN0c1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvYnJhbmNoLXByb2R1Y3RcIjtcbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgYnJhbmNoUHJvZHVjdHMgPSB1c2VCcmFuY2hQcm9kdWN0c1N0b3JlKCk7XG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzKFtcImRlbGV0ZVwiXSk7XG5jb25zb2xlLmxvZyhcImRlbHRlXCIsIHByb3BzLmRlbGV0ZS5yb3cuaWQpO1xuXG5jb25zdCBvbkRlbGV0ZSA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBicmFuY2hQcm9kdWN0cy5kZWxldGVCcmFuY2hQcm9kdWN0cyhwcm9wcy5kZWxldGUucm93LmlkKTtcblxuICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgaWNvbjogXCJ3YXJuaW5nXCIsXG4gICAgICBtZXNzYWdlOiBgQnJhbmNoIHByb2R1Y3Qgc3VjY2Vzc2Z1bGx5IGRlbGV0ZWRgLFxuICAgICAgdGltZW91dDogMTAwMCxcbiAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgIH0pO1xuICAgIGRpYWxvZy52YWx1ZSA9IGZhbHNlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gIH1cbn07XG5jb25zdCBkaWFsb2cgPSByZWYoZmFsc2UpO1xuY29uc3Qgb3Blbl9kaWFsb2cgPSAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiSURcIiwgcHJvcHMuZGVsZXRlLnJvdy5pZCk7XG4gIGRpYWxvZy52YWx1ZSA9IHRydWU7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4ucS1jYXJkIHtcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgYm94LXNoYWRvdzogMCA4cHggMjRweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi5xLWNhcmQtc2VjdGlvbiB7XG4gIHBhZGRpbmc6IDI0cHggMzJweDtcbn1cblxuLnEtYnRuIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMgZWFzZSwgYm94LXNoYWRvdyAwLjJzIGVhc2U7XG59XG5cbi5xLWJ0bi1yb3VuZGVkIHtcbiAgYm9yZGVyLXJhZGl1czogNTBweDtcbn1cblxuLnEtYnRuOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG5cbi5xLWJ0bjphY3RpdmUge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG59XG5cbi50ZXh0LWg1IHtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLnRleHQtYm9keTIge1xuICBjb2xvcjogIzY2Njtcbn1cblxuLnEtZWxldmF0ZS0yIHtcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuLmJnLXdoaXRlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbn1cblxuLnRleHQtZ3JleS05IHtcbiAgY29sb3I6ICMzMzM7XG59XG5cbi5xLXNlcGFyYXRvciB7XG4gIGJvcmRlci1jb2xvcjogI2VlZTtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgPGRpdj5cbiAgICAgIDxxLWlucHV0XG4gICAgICAgIGNsYXNzPVwicS1wYi1sZyBxLXBsLW1kXCJcbiAgICAgICAgdi1tb2RlbD1cImZpbHRlclwiXG4gICAgICAgIG91dGxpbmVkXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgICAgZGVib3VuY2U9XCIxMDAwXCJcbiAgICAgICAgc3R5bGU9XCJ3aWR0aDogNDUwcHg7IG1heC13aWR0aDogMTUwMHB4OyBtaW4td2lkdGg6IDEwMHB4XCJcbiAgICAgICAgZmxhdFxuICAgICAgICBkZW5zZVxuICAgICAgICByb3VuZGVkXG4gICAgICA+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICAgIDxxLWljb24gbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8L3EtaW5wdXQ+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInEtbXktc21cIj5cbiAgICAgIDxQcm9kdWN0Q3JlYXRlIC8+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwic3Bpbm5lci13cmFwcGVyXCIgdi1pZj1cImxvYWRpbmdcIj5cbiAgICA8cS1zcGlubmVyLWRvdHMgc2l6ZT1cIjUwcHhcIiBjb2xvcj1cInByaW1hcnlcIiAvPlxuICA8L2Rpdj5cblxuICA8ZGl2IHYtZWxzZT5cbiAgICA8ZGl2IHYtaWY9XCJmaWx0ZXJlZFJvd3MubGVuZ3RoID09PSAwXCIgY2xhc3M9XCJkYXRhLWVycm9yXCI+XG4gICAgICA8cS1pY29uIG5hbWU9XCJ3YXJuaW5nXCIgY29sb3I9XCJ3YXJuaW5nXCIgc2l6ZT1cIjRlbVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1tbC1zbSB0ZXh0LWg2XCI+Tm8gZGF0YSBhdmFpbGFibGU8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxxLXRhYmxlXG4gICAgICB2LWVsc2VcbiAgICAgIGNsYXNzPVwidGFibGUtY29udGFpbmVyIHN0aWNreS1oZWFkZXJcIlxuICAgICAgOmZpbHRlcj1cImZpbHRlclwiXG4gICAgICA6dmlydHVhbC1zY3JvbGwtc3RpY2t5LXNpemUtc3RhcnQ9XCI0OFwiXG4gICAgICBmbGF0XG4gICAgICA6Y29sdW1ucz1cInByb2R1Y3RMaXN0Q29sdW1uc1wiXG4gICAgICA6cm93cz1cImZpbHRlcmVkUm93c1wiXG4gICAgICByb3cta2V5PVwibmFtZVwiXG4gICAgICB2aXJ0dWFsLXNjcm9sbFxuICAgICAgdi1tb2RlbDpwYWdpbmF0aW9uPVwicGFnaW5hdGlvblwiXG4gICAgICA6cm93cy1wZXItcGFnZS1vcHRpb25zPVwiWzBdXCJcbiAgICAgIGhpZGUtYm90dG9tXG4gICAgICBzdHlsZT1cImhlaWdodDogMzUwcHhcIlxuICAgID5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLW5hbWU9XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCBrZXk9XCJuYW1lXCIgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICB7e1xuICAgICAgICAgICAgcHJvcHMucm93LnByb2R1Y3Q/Lm5hbWVcbiAgICAgICAgICAgICAgPyBjYXBpdGFsaXplRmlyc3RMZXR0ZXIocHJvcHMucm93LnByb2R1Y3QubmFtZSlcbiAgICAgICAgICAgICAgOiBcIk5vIGRhdGEgYXZhaWxhYmxlXCJcbiAgICAgICAgICB9fVxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuXG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC1jYXRlZ29yeT1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIGtleT1cIm5hbWVcIiA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgIDxxLWJhZGdlXG4gICAgICAgICAgICB2LWlmPVwicHJvcHMucm93LmNhdGVnb3J5XCJcbiAgICAgICAgICAgIDpjb2xvcj1cImdldEJhZGdlQ2F0ZWdvcnlDb2xvcihwcm9wcy5yb3cuY2F0ZWdvcnkpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eyBwcm9wcy5yb3cuY2F0ZWdvcnkgfX1cbiAgICAgICAgICA8L3EtYmFkZ2U+XG4gICAgICAgICAgPHNwYW4gdi1lbHNlPk5vIGRhdGEgYXZhaWxhYmxlPC9zcGFuPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtcHJpY2U9XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIj5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgPnt7IGZvcm1hdFByaWNlKHByb3BzLnJvdy5wcmljZSkgfX1cbiAgICAgICAgICAgIDxxLXRvb2x0aXAgY2xhc3M9XCJiZy1ibHVlLWdyZXktOFwiIDpvZmZzZXQ9XCJbMTAsIDEwXVwiXG4gICAgICAgICAgICAgID5FZGl0IFByaWNlPC9xLXRvb2x0aXBcbiAgICAgICAgICAgID5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHEtcG9wdXAtZWRpdFxuICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIih2YWwpID0+IHVwZGF0ZWRQcmljZShwcm9wcy5yb3csIHZhbClcIlxuICAgICAgICAgICAgdi1tb2RlbD1cInByb3BzLnJvdy5wcmljZVwiXG4gICAgICAgICAgICBhdXRvLXNhdmVcbiAgICAgICAgICAgIHYtc2xvdD1cInNjb3BlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICB2LW1vZGVsPVwic2NvcGUudmFsdWVcIlxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBtYXNrPVwiIyMjIyNcIlxuICAgICAgICAgICAgICBhdXRvZm9jdXNcbiAgICAgICAgICAgICAgY291bnRlclxuICAgICAgICAgICAgICBAa2V5dXAuZW50ZXI9XCJzY29wZS5zZXRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L3EtcG9wdXAtZWRpdD5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLXRvdGFsX3F1YW50aXR5PVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgYXV0by13aWR0aCBjbGFzcz1cImN1cnNvci1wb2ludGVyIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICB7e1xuICAgICAgICAgICAgICBwcm9wcy5yb3cudG90YWxfcXVhbnRpdHlcbiAgICAgICAgICAgICAgICA/IHByb3BzLnJvdy50b3RhbF9xdWFudGl0eVxuICAgICAgICAgICAgICAgIDogXCJTZXQgUXVhbnRpdHlcIlxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIDxxLXRvb2x0aXAgY2xhc3M9XCJiZy1ibHVlLWdyZXktOFwiIDpvZmZzZXQ9XCJbMTAsIDEwXVwiXG4gICAgICAgICAgICAgID5FZGl0IHF1YW50aXR5PC9xLXRvb2x0aXBcbiAgICAgICAgICAgID5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHEtcG9wdXAtZWRpdFxuICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIih2YWwpID0+IHVwZGF0ZWRUb3RhbFF1YW50aXR5KHByb3BzLnJvdywgdmFsKVwiXG4gICAgICAgICAgICB2LW1vZGVsPVwicHJvcHMucm93LnRvdGFsX3F1YW50aXR5XCJcbiAgICAgICAgICAgIGF1dG8tc2F2ZVxuICAgICAgICAgICAgdi1zbG90PVwic2NvcGVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJzY29wZS52YWx1ZVwiXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIGF1dG9mb2N1c1xuICAgICAgICAgICAgICBjb3VudGVyXG4gICAgICAgICAgICAgIG1hc2s9XCIjIyNcIlxuICAgICAgICAgICAgICBAa2V5dXAuZW50ZXI9XCJzY29wZS5zZXRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L3EtcG9wdXAtZWRpdD5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLWFjdGlvbj1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIGNsYXNzPVwicS1ndXR0ZXIteC1tZFwiIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPCEtLSA8UHJvZHVjdEVkaXQgLz4gLS0+XG4gICAgICAgICAgPFByb2R1Y3REZWxldGUgOmRlbGV0ZT1cInByb3BzXCIgLz5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L3EtdGFibGU+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQsIG9uTW91bnRlZCwgd2F0Y2ggfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgUHJvZHVjdEVkaXQgZnJvbSBcIi4vUHJvZHVjdEVkaXQudnVlXCI7XG5pbXBvcnQgUHJvZHVjdENyZWF0ZSBmcm9tIFwiLi9Qcm9kdWN0Q3JlYXRlLnZ1ZVwiO1xuaW1wb3J0IFByb2R1Y3REZWxldGUgZnJvbSBcIi4vUHJvZHVjdERlbGV0ZS52dWVcIjtcbmltcG9ydCB7IGFwaSB9IGZyb20gXCJzcmMvYm9vdC9heGlvc1wiO1xuaW1wb3J0IHsgdXNlQnJhbmNoUHJvZHVjdHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2JyYW5jaC1wcm9kdWN0XCI7XG5pbXBvcnQgeyBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyB1c2VSb3V0ZSB9IGZyb20gXCJ2dWUtcm91dGVyXCI7XG5cbmNvbnN0IHJvdXRlID0gdXNlUm91dGUoKTtcblxuY29uc3QgYnJhbmNoSWQgPSByb3V0ZS5wYXJhbXMuYnJhbmNoX2lkO1xuY29uc3QgYnJhbmNoUHJvZHVjdFN0b3JlID0gdXNlQnJhbmNoUHJvZHVjdHNTdG9yZSgpO1xuY29uc3QgZmlsdGVyID0gcmVmKFwiXCIpO1xuY29uc3QgbG9hZGluZyA9IHJlZih0cnVlKTtcbmNvbnN0IGJyYW5jaFByb2R1Y3RzID0gcmVmKFtdKTtcbmNvbnN0IHNob3dOb0RhdGFNZXNzYWdlID0gcmVmKGZhbHNlKTtcbmNvbnN0IHBhZ2luYXRpb24gPSByZWYoe1xuICByb3dzUGVyUGFnZTogMCxcbn0pO1xuY29uc3QgYnJhbmNoUHJvZHVjdFJvd3MgPSBjb21wdXRlZCgoKSA9PiBicmFuY2hQcm9kdWN0U3RvcmUuYnJhbmNoUHJvZHVjdHMpO1xuY29uc29sZS5sb2coXCJicmFuY2hzc2RmcmVyXCIsIGJyYW5jaFByb2R1Y3RSb3dzLnZhbHVlKTtcblxuY29uc3QgZmlsdGVyZWRSb3dzID0gY29tcHV0ZWQoKCkgPT4ge1xuICBpZiAoIWZpbHRlci52YWx1ZSkge1xuICAgIHJldHVybiBicmFuY2hQcm9kdWN0Um93cy52YWx1ZTtcbiAgfVxuICByZXR1cm4gYnJhbmNoUHJvZHVjdFJvd3MudmFsdWUuZmlsdGVyKChyb3cpID0+XG4gICAgcm93Lm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmaWx0ZXIudmFsdWUudG9Mb3dlckNhc2UoKSlcbiAgKTtcbn0pO1xuXG5jb25zdCBjYXBpdGFsaXplRmlyc3RMZXR0ZXIgPSAobG9jYXRpb24pID0+IHtcbiAgaWYgKCFsb2NhdGlvbikgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBsb2NhdGlvblxuICAgIC5zcGxpdChcIiBcIilcbiAgICAubWFwKCh3b3JkKSA9PiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpKVxuICAgIC5qb2luKFwiIFwiKTtcbn07XG5cbm9uTW91bnRlZChhc3luYyAoKSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKFwicHJvcHMuYnJhbmNoSWQgaW4gb25Nb3VudGVkOlwiLCBicmFuY2hJZCk7XG4gIGlmIChicmFuY2hJZCkge1xuICAgIGF3YWl0IHJlbG9hZFRhYmxlRGF0YShicmFuY2hJZCk7XG4gIH1cbn0pO1xuXG5jb25zdCByZWxvYWRUYWJsZURhdGEgPSBhc3luYyAoYnJhbmNoSWQpID0+IHtcbiAgLy8gY29uc29sZS5sb2coXCJGZXRjaGluZyBwcm9kdWN0cyBmb3IgYnJhbmNoIElEOlwiLCBicmFuY2hJZCk7XG4gIHRyeSB7XG4gICAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBicmFuY2hQcm9kdWN0U3RvcmUuZmV0Y2hCcmFuY2hQcm9kdWN0cyhicmFuY2hJZCk7XG4gICAgYnJhbmNoUHJvZHVjdFJvd3MudmFsdWUgPSByZXNwb25zZTtcbiAgICBpZiAoIWJyYW5jaFByb2R1Y3RSb3dzLnZhbHVlLmxlbmd0aCkge1xuICAgICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSB0cnVlO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcIkJyYW5jaCBwcm9kdWN0XCIsIGJyYW5jaFByb2R1Y3RSb3dzLnZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVycm9yIGZldGNoaW5nIGJyYW5jaCBwcm9kdWN0OlwiLCBlcnJvcik7XG4gICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSB0cnVlO1xuICB9IGZpbmFsbHkge1xuICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgfVxufTtcblxud2F0Y2goZmlsdGVyLCBhc3luYyAobmV3RmlsdGVyKSA9PiB7XG4gIGxvYWRpbmcudmFsdWUgPSB0cnVlO1xuICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKSk7XG4gIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSBmaWx0ZXJlZFJvd3MudmFsdWUubGVuZ3RoID09PSAwO1xufSk7XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZWRQcmljZShkYXRhLCB2YWwpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wdXQoXCIvYXBpL3VwZGF0ZS1icmFuY2gtcHJvZHVjdHMvXCIgKyBkYXRhLmlkLCB7XG4gICAgICBwcmljZTogcGFyc2VJbnQodmFsKSxcbiAgICB9KTtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIGNvbnN0IGkgPSBicmFuY2hQcm9kdWN0cy52YWx1ZS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT0gZGF0YS5pZCk7XG4gICAgICBicmFuY2hQcm9kdWN0cy52YWx1ZVtpXSA9IHBhcnNlSW50KHZhbCk7XG5cbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmRhdGEubWVzc2FnZSxcbiAgICAgICAgdGltb3V0OiAxMDAwLFxuICAgICAgICBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgcHJpY2U6XCIsIGVycm9yKTtcbiAgfVxufVxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlZFRvdGFsUXVhbnRpdHkoZGF0YSwgdmFsKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucHV0KFxuICAgICAgXCIvYXBpL3VwZGF0ZS1icmFuY2gtcHJvZHVjdHMtdG90YWwtcXVhbnRpdHkvXCIgKyBkYXRhLmlkLFxuICAgICAge1xuICAgICAgICB0b3RhbF9xdWFudGl0eTogcGFyc2VJbnQodmFsKSxcbiAgICAgIH1cbiAgICApO1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgY29uc3QgaSA9IGJyYW5jaFByb2R1Y3RzLnZhbHVlLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PSBkYXRhLmlkKTtcbiAgICAgIGJyYW5jaFByb2R1Y3RzLnZhbHVlW2ldID0gcGFyc2VJbnQodmFsKTtcblxuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcbiAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuZGF0YS5tZXNzYWdlLFxuICAgICAgICB0aW1vdXQ6IDEwMDAsXG4gICAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgfSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB1cGRhdGluZyBwcmljZTpcIiwgZXJyb3IpO1xuICB9XG59XG5cbmNvbnN0IGdldEJhZGdlQ2F0ZWdvcnlDb2xvciA9IChjYXRlZ29yeSkgPT4ge1xuICBzd2l0Y2ggKGNhdGVnb3J5KSB7XG4gICAgY2FzZSBcIkJyZWFkXCI6XG4gICAgICByZXR1cm4gXCJicm93blwiO1xuICAgIGNhc2UgXCJTZWxlY3RhXCI6XG4gICAgICByZXR1cm4gXCJyZWQtNlwiO1xuICAgIGNhc2UgXCJTb2Z0ZHJpbmtzXCI6XG4gICAgICByZXR1cm4gXCJhY2NlbnRcIjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIFwiZ3JleVwiO1xuICB9XG59O1xuXG5jb25zdCBmb3JtYXRQcmljZSA9IChwcmljZSkgPT4ge1xuICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KFwiZW4tVVNcIiwge1xuICAgIHN0eWxlOiBcImN1cnJlbmN5XCIsXG4gICAgY3VycmVuY3k6IFwiUEhQXCIsXG4gIH0pLmZvcm1hdChwcmljZSk7XG59O1xuXG5jb25zdCBwcm9kdWN0TGlzdENvbHVtbnMgPSBbXG4gIHtcbiAgICBuYW1lOiBcIm5hbWVcIixcbiAgICBsYWJlbDogXCJQcm9kdWN0IE5hbWVcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogKHJvdykgPT4gcm93LnByb2R1Y3QubmFtZSxcbiAgICBmb3JtYXQ6ICh2YWwpID0+IGAke3ZhbH1gLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJjYXRlZ29yeVwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGxhYmVsOiBcIkNhdGVnb3J5XCIsXG4gICAgZmllbGQ6IFwiY2F0ZWdvcnlcIixcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwicHJpY2VcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBsYWJlbDogXCJQcmljZVwiLFxuICAgIGZpZWxkOiAodmFsKSA9PiBmb3JtYXRQcmljZSh2YWwpLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJ0b3RhbF9xdWFudGl0eVwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGxhYmVsOiBcIlF1YW50aXR5XCIsXG4gICAgZmllbGQ6IFwidG90YWxfcXVhbnRpdHlcIixcbiAgICBmb3JtYXQ6ICh2YWwpID0+IGAke3ZhbH0gcGNzYCxcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYWN0aW9uXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgbGFiZWw6IFwiQWN0aW9uXCIsXG4gICAgZmllbGQ6IFwiYWN0aW9uXCIsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG5dO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4uZWxlZ2FudC1jb250YWluZXIge1xuICBiYWNrZ3JvdW5kOiAjZjdmOGZjO1xuICBwYWRkaW5nOiAycmVtO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG59XG4uYWJzb2x1dGUtZnVsbCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xufVxuLnNwaW5uZXItd3JhcHBlciB7XG4gIG1pbi1oZWlnaHQ6IDQwdmg7IC8qIE1pbmltdW0gaGVpZ2h0IG9mIDUwJSB2aWV3cG9ydCBoZWlnaHQgKi9cbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uZGF0YS1lcnJvciB7XG4gIG1pbi1oZWlnaHQ6IDQwdmg7IC8qIE1pbmltdW0gaGVpZ2h0IG9mIDUwJSB2aWV3cG9ydCBoZWlnaHQgKi9cbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4udGFibGUtY29udGFpbmVyIHtcbiAgbWF4LWhlaWdodDogNDAwcHg7IC8qIEFkanVzdCBhcyBuZWVkZWQgKi9cbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLnEtdGFibGUtY29udGFpbmVyIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbiAhaW1wb3J0YW50OyAvKiBUYXJnZXQgdGhlIGNvbnRhaW5lciBnZW5lcmF0ZWQgYnkgcS10YWJsZSAqL1xufVxuPC9zdHlsZT5cbiIsImltcG9ydCB7IGRlZmluZVN0b3JlIH0gZnJvbSBcInBpbmlhXCI7XG5pbXBvcnQgeyBMb2FkaW5nLCBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwic3JjL2Jvb3QvYXhpb3NcIjtcbmltcG9ydCB7IGNvbXB1dGVkLCByZWYgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyB1c2VSYXdNYXRlcmlhbHNTdG9yZSB9IGZyb20gXCIuL3Jhdy1tYXRlcmlhbFwiO1xuXG5leHBvcnQgY29uc3QgdXNlQnJhbmNoUmF3TWF0ZXJpYWxzU3RvcmUgPSBkZWZpbmVTdG9yZShcbiAgXCJicmFuY2hSYXdNYXRlcmlhbFwiLFxuICAoKSA9PiB7XG4gICAgY29uc3QgYnJhbmNoUmF3TWF0ZXJpYWwgPSByZWYobnVsbCk7XG4gICAgY29uc3QgYnJhbmNoUmF3TWF0ZXJpYWxzID0gcmVmKFtdKTtcbiAgICBjb25zdCBicmFuY2hJZCA9IHJlZihbXSk7XG5cbiAgICBjb25zdCByYXdNYXRlcmlhbHNTdG9yZSA9IHVzZVJhd01hdGVyaWFsc1N0b3JlKCk7XG4gICAgY29uc3QgcmF3TWF0ZXJpYWxzRGF0YSA9IGNvbXB1dGVkKCgpID0+IHJhd01hdGVyaWFsc1N0b3JlLnJhd01hdGVyaWFscyk7XG5cbiAgICBjb25zdCBmZXRjaEJyYW5jaFJhd01hdGVyaWFscyA9IGFzeW5jIChicmFuY2hJZCkgPT4ge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KGAvYXBpL2JyYW5jaC8ke2JyYW5jaElkfS9yYXdNYXRlcmlhbHNgKTtcbiAgICAgIGJyYW5jaFJhd01hdGVyaWFscy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgfTtcblxuICAgIGNvbnN0IGNyZWF0ZUJyYW5jaFJhd01hdGVyaWFscyA9IGFzeW5jIChkYXRhKSA9PiB7XG4gICAgICBMb2FkaW5nLnNob3coKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnBvc3QoYC9hcGkvYnJhbmNoLXJhdy1tYXRlcmlhbHNgLCBkYXRhKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgcmVzcG9uc2UuZGF0YS5tZXNzYWdlID09PSBcIkJyYW5jaCBSYXcgTWF0ZXJpYWxzIHNhdmVkIHN1Y2Nlc3NmdWxseVwiXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IHJhd01hdGVyaWFscyA9IHJhd01hdGVyaWFsc0RhdGEudmFsdWUuZmluZChcbiAgICAgICAgICAgIChpdGVtKSA9PiBpdGVtLmlkID09PSBkYXRhLmluZ3JlZGllbnRzX2lkXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IG5ld1Jhd01hdGVyaWFscyA9IHtcbiAgICAgICAgICAgIC4uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgICBpbmdyZWRpZW50czogcmF3TWF0ZXJpYWxzXG4gICAgICAgICAgICAgID8gcmF3TWF0ZXJpYWxzXG4gICAgICAgICAgICAgIDogeyBuYW1lOiBcIk5vIE5hbWVcIiwgY29kZTogXCJVbmtub3duXCIgfSxcbiAgICAgICAgICAgIHRvdGFsX3F1YW50aXR5OiBkYXRhLnRvdGFsX3F1YW50aXR5LFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBicmFuY2hSYXdNYXRlcmlhbHMudmFsdWUudW5zaGlmdChuZXdSYXdNYXRlcmlhbHMpO1xuICAgICAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJCcmFuY2ggUmF3IE1hdGVyaWFscyBzYXZlZCBzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIHJlc3BvbnNlLmRhdGEubWVzc2FnZSA9PT1cbiAgICAgICAgICBcIlRoZSBSYXdNYXRlcmlhbHMgYWxyZWFkeSBleGlzdHMgaW4gdGhpcyBicmFuY2guXCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgICAgICB0eXBlOiBcIndhcm5pbmdcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiVGhlIFJhdyBNYXRlcmlhbHMgYWxyZWFkeSBleGlzdHMgaW4gdGhpcyBicmFuY2guXCIsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgICAgbWVzc2FnZTogXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBzYXZpbmcgdGhlIGJyYW5jaCBwcm9kdWN0LlwiLFxuICAgICAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgICB9KTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIExvYWRpbmcuaGlkZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCB1cGRhdGVCcmFuY2hSYXdNYXRlcmlhbHMgPSBhc3luYyAoaWQpID0+IHtcbiAgICAgIGF3YWl0IGFwaS5wdXQoYC9hcGkvdXBkYXRlLWJyYW5jaC1wcm9kdWN0cy8ke2lkfWAsIHsgcHJpY2U6IG5ld1ByaWNlIH0pO1xuICAgICAgY29uc3QgaW5kZXggPSBicmFuY2hSYXdNYXRlcmlhbHMudmFsdWUuZmluZEluZGV4KFxuICAgICAgICAoaXRlbSkgPT4gaXRlbS5pZCA9PT0gaWRcbiAgICAgICk7XG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIGJyYW5jaFJhd01hdGVyaWFscy52YWx1ZVtpbmRleF0ucHJpY2UgPSBuZXdQcmljZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgZGVsZXRlQnJhbmNoUmF3TWF0ZXJpYWxzID0gYXN5bmMgKGlkKSA9PiB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5kZWxldGUoYC9hcGkvYnJhbmNoLXJhdy1tYXRlcmlhbHMvJHtpZH1gKTtcbiAgICAgIGJyYW5jaFJhd01hdGVyaWFscy52YWx1ZSA9IGJyYW5jaFJhd01hdGVyaWFscy52YWx1ZS5maWx0ZXIoXG4gICAgICAgIChicmFuY2hSYXdNYXRlcmlhbCkgPT4gYnJhbmNoUmF3TWF0ZXJpYWwuaWQgIT09IGlkXG4gICAgICApO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgYnJhbmNoSWQsXG4gICAgICBicmFuY2hSYXdNYXRlcmlhbCxcbiAgICAgIGJyYW5jaFJhd01hdGVyaWFscyxcbiAgICAgIGZldGNoQnJhbmNoUmF3TWF0ZXJpYWxzLFxuICAgICAgY3JlYXRlQnJhbmNoUmF3TWF0ZXJpYWxzLFxuICAgICAgdXBkYXRlQnJhbmNoUmF3TWF0ZXJpYWxzLFxuICAgICAgZGVsZXRlQnJhbmNoUmF3TWF0ZXJpYWxzLFxuICAgIH07XG4gIH1cbik7XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWJ0blxuICAgIG91dGxpbmVcbiAgICBjbGFzcz1cInRleHQtZGFyayBxLXBhLXNtXCJcbiAgICBkZW5zZVxuICAgIGVsZXZhdGVkXG4gICAgaWNvbj1cImFkZF9jaXJjbGVcIlxuICAgIGxhYmVsPVwiQ3JlYXRlIEJyYW5jaCBSYXcgTWF0ZXJpYWxcIlxuICAgIEBjbGljaz1cIm9wZW5fY3JlYXRlX2JyZWFkX2RpYWxvZ1wiXG4gICAgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjZjQzZjVlXCJcbiAgLz5cbiAgPHEtZGlhbG9nIHYtbW9kZWw9XCJkaWFsb2dcIiBwZXJzaXN0ZW50PlxuICAgIDxxLWNhcmRcbiAgICAgIGNsYXNzPVwibXktY2FyZFwiXG4gICAgICBzdHlsZT1cIndpZHRoOiA0MDBweDsgbWF4LXdpZHRoOiA1MDBweDsgbWluLXdpZHRoOiAxMDBweFwiXG4gICAgPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uXG4gICAgICAgIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciB0ZXh0LXdoaXRlXCJcbiAgICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjZWY0NDQ0XCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5DcmVhdGUgQnJhbmNoIFJhdyBNYXRlcmlhbHM8L2Rpdj5cbiAgICAgICAgPHEtc3BhY2UgLz5cbiAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgZGVuc2Ugcm91bmQgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtbWEtbWQgcS1ndXR0ZXIteS1zbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1tYi1sZ1wiPlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICB2LW1vZGVsPVwic2VhcmNoUXVlcnlcIlxuICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cInNlYXJjaFwiXG4gICAgICAgICAgICBkZWJvdW5jZT1cIjEwMDBcIlxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIHJvdW5kZWRcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIFJhdyBNYXRlcmlhbHNcIlxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJzZWFyY2hcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8ZGl2IHYtaWY9XCJzZWFyY2hRdWVyeVwiIGNsYXNzPVwiY3VzdG9tLWxpc3Qgei10b3BcIj5cbiAgICAgICAgICAgICAgPHEtY2FyZD5cbiAgICAgICAgICAgICAgICA8cS1saXN0IHNlcGFyYXRvcj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0gdi1pZj1cIiFyYXdNYXRlcmlhbHNEYXRhPy5sZW5ndGhcIj5cbiAgICAgICAgICAgICAgICAgICAgTm8gcmVjb3JkIGZvdW5kLlxuICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICAgICAgICAgICAgICA8cS1pdGVtXG4gICAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwiYXV0b0ZpbGxSYXdNYXRlcmlhbHMocmF3TWF0ZXJpYWxzKVwiXG4gICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCJyYXdNYXRlcmlhbHMgaW4gcmF3TWF0ZXJpYWxzRGF0YVwiXG4gICAgICAgICAgICAgICAgICAgICAgOmtleT1cInJhd01hdGVyaWFscy5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7IHJhd01hdGVyaWFscy5uYW1lIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdj5SYXcgTWF0ZXJpYWxzIENvZGU8L2Rpdj5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgdi1tb2RlbD1cImFkZE5ld0JyYW5jaFJhd01hdGVyaWFscy5pbmdyZWRpZW50X2NvZGVcIlxuICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXY+UmF3IE1hdGVyaWFscyBOYW1lPC9kaXY+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJhZGROZXdCcmFuY2hSYXdNYXRlcmlhbHMuaW5ncmVkaWVudF9uYW1lXCJcbiAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2PkNhdGVnb3J5PC9kaXY+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJhZGROZXdCcmFuY2hSYXdNYXRlcmlhbHMuY2F0ZWdvcnlcIlxuICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXY+UXVhbnRpdHk8L2Rpdj5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgdi1tb2RlbD1cImFkZE5ld0JyYW5jaFJhd01hdGVyaWFscy50b3RhbF9xdWFudGl0eVwiXG4gICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICA6c3VmZml4PVwiYWRkTmV3QnJhbmNoUmF3TWF0ZXJpYWxzLnVuaXQgfHwgJydcIlxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIDpydWxlcz1cIltcbiAgICAgICAgICAgICAgKHZhbCkgPT4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCkgfHwgJ1RvdGFsIHF1YW50aXR5IGlzIHJlcXVpcmVkJyxcbiAgICAgICAgICAgIF1cIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDwhLS0gPHEtc2VwYXJhdG9yIC8+IC0tPlxuICAgICAgPHEtY2FyZC1hY3Rpb25zIGNsYXNzPVwicm93IHEtbWEtbWRcIiBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICAgIDxxLWJ0biBjbGFzcz1cImdsb3NzeVwiIGNvbG9yPVwiZ3JleS05XCIgbGFiZWw9XCJEaXNtaXNzXCIgQGNsaWNrPVwiZGlzbWlzc1wiIC8+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGNsYXNzPVwiZ2xvc3N5XCJcbiAgICAgICAgICBjb2xvcj1cInRlYWxcIlxuICAgICAgICAgIGxhYmVsPVwiQ3JlYXRlXCJcbiAgICAgICAgICBAY2xpY2s9XCJzYXZlXCJcbiAgICAgICAgICA6ZGlzYWJsZT1cIiFpc0Zvcm1WYWxpZFwiXG4gICAgICAgIC8+XG4gICAgICA8L3EtY2FyZC1hY3Rpb25zPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IE5vdGlmeSB9IGZyb20gXCJxdWFzYXJcIjtcbmltcG9ydCB7IHVzZUJyYW5jaFByb2R1Y3RzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9icmFuY2gtcHJvZHVjdFwiO1xuaW1wb3J0IHsgdXNlQnJhbmNoUmF3TWF0ZXJpYWxzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9icmFuY2gtcmF3TWF0ZXJpYWxzXCI7XG5pbXBvcnQgeyB1c2VSYXdNYXRlcmlhbHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3Jhdy1tYXRlcmlhbFwiO1xuaW1wb3J0IHsgcmVmLCByZWFjdGl2ZSwgY29tcHV0ZWQgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyB1c2VSb3V0ZSB9IGZyb20gXCJ2dWUtcm91dGVyXCI7XG5cbmNvbnN0IHJvdXRlID0gdXNlUm91dGUoKTtcbmNvbnN0IHJhd01hdGVyaWFsc1N0b3JlID0gdXNlUmF3TWF0ZXJpYWxzU3RvcmUoKTtcbmNvbnN0IHJhd01hdGVyaWFsc0RhdGEgPSBjb21wdXRlZCgoKSA9PiByYXdNYXRlcmlhbHNTdG9yZS5yYXdNYXRlcmlhbHMpO1xuY29uc3QgYnJhbmNoUmF3TWF0ZXJpYWxzID0gdXNlQnJhbmNoUmF3TWF0ZXJpYWxzU3RvcmUoKTtcblxuY29uc3Qgc2VhcmNoUXVlcnkgPSByZWYoXCJcIik7XG5jb25zdCBzZWFyY2ggPSBhc3luYyAoKSA9PiB7XG4gIHJhd01hdGVyaWFsc1N0b3JlLnNlYXJjaFJhd01hdGVyaWFscyhzZWFyY2hRdWVyeS52YWx1ZSk7XG59O1xuXG5jb25zdCBpc0Zvcm1WYWxpZCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIGFkZE5ld0JyYW5jaFJhd01hdGVyaWFscy50b3RhbF9xdWFudGl0eSAhPT0gXCJcIjtcbn0pO1xuXG5jb25zdCBkaWFsb2cgPSByZWYoZmFsc2UpO1xuY29uc3Qgb3Blbl9jcmVhdGVfYnJlYWRfZGlhbG9nID0gKCkgPT4ge1xuICBkaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcblxuY29uc3QgZGlzbWlzcyA9ICgpID0+IHtcbiAgY2xlYXJGb3JtKCk7XG4gIGRpYWxvZy52YWx1ZSA9IGZhbHNlO1xufTtcblxuY29uc3QgYXV0b0ZpbGxSYXdNYXRlcmlhbHMgPSAoZGF0YSkgPT4ge1xuICBhZGROZXdCcmFuY2hSYXdNYXRlcmlhbHMuaW5ncmVkaWVudHNfaWQgPSBkYXRhLmlkO1xuICBhZGROZXdCcmFuY2hSYXdNYXRlcmlhbHMuaW5ncmVkaWVudF9uYW1lID0gZGF0YS5uYW1lO1xuICBhZGROZXdCcmFuY2hSYXdNYXRlcmlhbHMuaW5ncmVkaWVudF9jb2RlID0gZGF0YS5jb2RlO1xuICBhZGROZXdCcmFuY2hSYXdNYXRlcmlhbHMuY2F0ZWdvcnkgPSBkYXRhLmNhdGVnb3J5O1xuICBhZGROZXdCcmFuY2hSYXdNYXRlcmlhbHMudW5pdCA9IGRhdGEudW5pdDtcbiAgc2VhcmNoUXVlcnkudmFsdWUgPSBcIlwiO1xufTtcbmNvbnN0IGFkZE5ld0JyYW5jaFJhd01hdGVyaWFscyA9IHJlYWN0aXZlKHtcbiAgaW5ncmVkaWVudHNfaWQ6IFwiXCIsXG4gIGluZ3JlZGllbnRfbmFtZTogXCJcIixcbiAgaW5ncmVkaWVudF9jb2RlOiBcIlwiLFxuICB0b3RhbF9xdWFudGl0eTogXCJcIixcbiAgY2F0ZWdvcnk6IFwiXCIsXG4gIHVuaXQ6IFwiXCIsXG4gIGJyYW5jaF9pZDogcm91dGUucGFyYW1zLmJyYW5jaF9pZCxcbn0pO1xuXG5jb25zdCBjbGVhckZvcm0gPSAoKSA9PiB7XG4gIChhZGROZXdCcmFuY2hSYXdNYXRlcmlhbHMuaW5ncmVkaWVudHNfaWQgPSBcIlwiKSxcbiAgICAoYWRkTmV3QnJhbmNoUmF3TWF0ZXJpYWxzLmluZ3JlZGllbnRfbmFtZSA9IFwiXCIpLFxuICAgIChhZGROZXdCcmFuY2hSYXdNYXRlcmlhbHMuaW5ncmVkaWVudF9jb2RlID0gXCJcIiksXG4gICAgKGFkZE5ld0JyYW5jaFJhd01hdGVyaWFscy50b3RhbF9xdWFudGl0eSA9IFwiXCIpLFxuICAgIChhZGROZXdCcmFuY2hSYXdNYXRlcmlhbHMuaW5ncmVkaWVudHNfaWQgPSBcIlwiKTtcbiAgYWRkTmV3QnJhbmNoUmF3TWF0ZXJpYWxzLmNhdGVnb3J5ID0gXCJcIjtcbiAgYWRkTmV3QnJhbmNoUmF3TWF0ZXJpYWxzLnVuaXQgPSBcIlwiO1xufTtcblxuY29uc3Qgc2F2ZSA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHByb2R1Y3RfbmFtZSwgLi4uZGF0YSB9ID0gYWRkTmV3QnJhbmNoUmF3TWF0ZXJpYWxzO1xuICAgIGF3YWl0IGJyYW5jaFJhd01hdGVyaWFscy5jcmVhdGVCcmFuY2hSYXdNYXRlcmlhbHMoZGF0YSk7XG4gICAgY29uc29sZS5sb2coXCJkYXRhIHRvIHNlbmRcIiwgZGF0YSk7XG4gICAgY2xlYXJGb3JtKCk7XG4gICAgZGlhbG9nLnZhbHVlID0gZmFsc2U7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9XG59O1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWJ0blxuICAgIEBjbGljaz1cIm9wZW5fZGlhbG9nXCJcbiAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICBpY29uPVwiZGVsZXRlXCJcbiAgICBzaXplPVwic21cIlxuICAgIGZsYXRcbiAgICByb3VuZFxuICAgIGRlbnNlXG4gICAgYWxpZ249XCJjZW50ZXJcIlxuICA+XG4gICAgPHEtdG9vbHRpcCBjbGFzcz1cImJnLW5lZ2F0aXZlXCIgOmRlbGF5PVwiMjAwXCI+RGVsZXRlPC9xLXRvb2x0aXA+XG4gIDwvcS1idG4+XG4gIDxxLWRpYWxvZyB2LW1vZGVsPVwiZGlhbG9nXCI+XG4gICAgPHEtY2FyZD5cbiAgICAgIDxxLWNhcmQtc2VjdGlvblxuICAgICAgICBjbGFzcz1cInEtcGEtbWQgcS1yb3VuZGVkIHEtZWxldmF0ZS0yIGJnLXdoaXRlIHRleHQtZ3JleS05XCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDUgcS1tYi14c1wiPkNvbmZpcm0gRGVsZXRpb248L2Rpdj5cbiAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LWJvZHkyIHEtbWItbm9uZVwiPlxuICAgICAgICAgIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBpdGVtPyBUaGlzIGFjdGlvbiBjYW5ub3QgYmVcbiAgICAgICAgICB1bmRvbmUuXG4gICAgICAgIDwvcD5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1zZXBhcmF0b3IgY2xhc3M9XCJxLW1iLW1kXCIgLz5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtY2FyZC1hY3Rpb25zIGFsaWduPVwicmlnaHRcIiBjbGFzcz1cInEtcHQtbm9uZVwiPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIGxhYmVsPVwiQ2FuY2VsXCJcbiAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICB2LWNsb3NlLXBvcHVwXG4gICAgICAgICAgICBjbGFzcz1cInEtbXItc21cIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgbGFiZWw9XCJEZWxldGVcIlxuICAgICAgICAgICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgICAgICAgICBAY2xpY2s9XCJvbkRlbGV0ZVwiXG4gICAgICAgICAgICBjbGFzcz1cInEtYnRuLXJvdW5kZWQgcS1weC1sZ1wiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgdXNlQnJhbmNoUmF3TWF0ZXJpYWxzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9icmFuY2gtcmF3TWF0ZXJpYWxzXCI7XG5pbXBvcnQgeyByZWYgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IGJyYW5jaFJhd01hdGVyaWFscyA9IHVzZUJyYW5jaFJhd01hdGVyaWFsc1N0b3JlKCk7XG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzKFtcImRlbGV0ZVwiXSk7XG5cbmNvbnN0IG9uRGVsZXRlID0gYXN5bmMgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhcImNsaWNra2tkXCIpO1xuICB0cnkge1xuICAgIGF3YWl0IGJyYW5jaFJhd01hdGVyaWFscy5kZWxldGVCcmFuY2hSYXdNYXRlcmlhbHMocHJvcHMuZGVsZXRlLnJvdy5pZCk7XG4gICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICBpY29uOiBcIndhcm5pbmdcIixcbiAgICAgIG1lc3NhZ2U6IGBSYXcgTWF0ZXJpYWxzICR7cHJvcHMuZGVsZXRlLnJvdy5uYW1lfSAgc3VjY2Vzc2Z1bGx5IGRlbGV0ZWRgLFxuICAgICAgdGltZW91dDogMTAwMCxcbiAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgIH0pO1xuICAgIGRpYWxvZy52YWx1ZSA9IGZhbHNlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gIH1cbn07XG5jb25zdCBkaWFsb2cgPSByZWYoZmFsc2UpO1xuY29uc3Qgb3Blbl9kaWFsb2cgPSAoKSA9PiB7XG4gIGRpYWxvZy52YWx1ZSA9IHRydWU7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4ucS1jYXJkIHtcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgYm94LXNoYWRvdzogMCA4cHggMjRweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi5xLWNhcmQtc2VjdGlvbiB7XG4gIHBhZGRpbmc6IDI0cHggMzJweDtcbn1cblxuLnEtYnRuIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMgZWFzZSwgYm94LXNoYWRvdyAwLjJzIGVhc2U7XG59XG5cbi5xLWJ0bi1yb3VuZGVkIHtcbiAgYm9yZGVyLXJhZGl1czogNTBweDtcbn1cblxuLnEtYnRuOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG5cbi5xLWJ0bjphY3RpdmUge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG59XG5cbi50ZXh0LWg1IHtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLnRleHQtYm9keTIge1xuICBjb2xvcjogIzY2Njtcbn1cblxuLnEtZWxldmF0ZS0yIHtcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuLmJnLXdoaXRlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbn1cblxuLnRleHQtZ3JleS05IHtcbiAgY29sb3I6ICMzMzM7XG59XG5cbi5xLXNlcGFyYXRvciB7XG4gIGJvcmRlci1jb2xvcjogI2VlZTtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgPGRpdj5cbiAgICAgIDxxLWlucHV0XG4gICAgICAgIGNsYXNzPVwicS1wYi1sZyBxLXBsLW1kXCJcbiAgICAgICAgdi1tb2RlbD1cImZpbHRlclwiXG4gICAgICAgIG91dGxpbmVkXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgICAgZGVib3VuY2U9XCIxMDAwXCJcbiAgICAgICAgc3R5bGU9XCJ3aWR0aDogNDUwcHg7IG1heC13aWR0aDogNTAwMHB4OyBtaW4td2lkdGg6IDEwMHB4XCJcbiAgICAgICAgZmxhdFxuICAgICAgICBkZW5zZVxuICAgICAgICByb3VuZGVkXG4gICAgICA+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICAgIDxxLWljb24gbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8L3EtaW5wdXQ+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInEtbXktc21cIj5cbiAgICAgIDxSYXdNYXRlcmlhbHNDcmVhdGUgLz5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzcGlubmVyLXdyYXBwZXJcIiB2LWlmPVwibG9hZGluZ1wiPlxuICAgIDxxLXNwaW5uZXItZG90cyBzaXplPVwiNTBweFwiIGNvbG9yPVwicHJpbWFyeVwiIC8+XG4gIDwvZGl2PlxuICA8ZGl2IHYtZWxzZT5cbiAgICA8ZGl2IHYtaWY9XCJmaWx0ZXJlZFJvd3MubGVuZ3RoID09PSAwXCIgY2xhc3M9XCJkYXRhLWVycm9yXCI+XG4gICAgICA8cS1pY29uIG5hbWU9XCJ3YXJuaW5nXCIgY29sb3I9XCJ3YXJuaW5nXCIgc2l6ZT1cIjRlbVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1tbC1zbSB0ZXh0LWg2XCI+Tm8gZGF0YSBhdmFpbGFibGU8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8cS10YWJsZVxuICAgICAgdi1lbHNlXG4gICAgICBjbGFzcz1cInRhYmxlLWNvbnRhaW5lciBzdGlja3ktaGVhZGVyXCJcbiAgICAgIDpmaWx0ZXI9XCJmaWx0ZXJcIlxuICAgICAgOnZpcnR1YWwtc2Nyb2xsLXN0aWNreS1zaXplLXN0YXJ0PVwiNDhcIlxuICAgICAgZmxhdFxuICAgICAgOmNvbHVtbnM9XCJpbmdyZWRpZW50c0NvbHVtbnNcIlxuICAgICAgOnJvd3M9XCJmaWx0ZXJlZFJvd3NcIlxuICAgICAgcm93LWtleT1cIm5hbWVcIlxuICAgICAgdmlydHVhbC1zY3JvbGxcbiAgICAgIHYtbW9kZWw6cGFnaW5hdGlvbj1cInBhZ2luYXRpb25cIlxuICAgICAgOnJvd3MtcGVyLXBhZ2Utb3B0aW9ucz1cIlswXVwiXG4gICAgICBoaWRlLWJvdHRvbVxuICAgICAgc3R5bGU9XCJoZWlnaHQ6IDM0MHB4XCJcbiAgICA+XG4gICAgICA8IS0tIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLXVuaXQ9XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCBrZXk9XCJuYW1lXCIgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8cS1iYWRnZSA6Y29sb3I9XCJnZXRCYWRnZVVuaXRDb2xvcihwcm9wcy5yb3cudW5pdClcIj5cbiAgICAgICAgICAgIHt7IHByb3BzLnJvdy51bml0IH19XG4gICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPiAtLT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLXRvdGFsX3F1YW50aXR5PVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8cS1iYWRnZVxuICAgICAgICAgICAgc3F1YXJlXG4gICAgICAgICAgICBjbGFzcz1cInRleHQtd2hpdGUgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgOmNsYXNzPVwiZ2V0UmF3TWF0ZXJpYWxCYWRnZUNvbG9yKHByb3BzLnJvdylcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt7IGZvcm1hdFRvdGFsUXVhbnRpdHkocHJvcHMucm93KSB9fVxuICAgICAgICAgICAgPHEtdG9vbHRpcCBjbGFzcz1cImJnLWJsdWUtZ3JleS04XCIgOm9mZnNldD1cIlsxMCwgMTBdXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdoaXRlXCI+RWRpdCBBdmFpbGFibGUgU3RvY2tzPC9kaXY+XG4gICAgICAgICAgICA8L3EtdG9vbHRpcD5cblxuICAgICAgICAgICAgPHEtcG9wdXAtZWRpdFxuICAgICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwiKHZhbCkgPT4gdXBkYXRlZFN0b2Nrcyhwcm9wcy5yb3csIHZhbClcIlxuICAgICAgICAgICAgICB2LW1vZGVsPVwicHJvcHMucm93LnRvdGFsX3F1YW50aXR5XCJcbiAgICAgICAgICAgICAgYXV0by1zYXZlXG4gICAgICAgICAgICAgIHYtc2xvdD1cInNjb3BlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwic2NvcGUudmFsdWVcIlxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgOnN1ZmZpeD1cInByb3BzLnJvdy5pbmdyZWRpZW50cy51bml0XCJcbiAgICAgICAgICAgICAgICBtYXNrPVwiIyMjIyMjIyNcIlxuICAgICAgICAgICAgICAgIGF1dG9mb2N1c1xuICAgICAgICAgICAgICAgIGNvdW50ZXJcbiAgICAgICAgICAgICAgICBAa2V5dXAuZW50ZXI9XCJzY29wZS5zZXRcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9xLXBvcHVwLWVkaXQ+XG4gICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtYWN0aW9uPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktY2VudGVyIHEtZ3V0dGVyLXgtbWRcIj5cbiAgICAgICAgICAgIDwhLS0gPFJhd01hdGVyaWFsc1RhYmxlRWRpdCAvPiAtLT5cbiAgICAgICAgICAgIDxSYXdNYXRlcmlhbHNUYWJsZURlbGV0ZSA6ZGVsZXRlPVwicHJvcHNcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS10YWJsZT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgY29tcHV0ZWQsIG9uTW91bnRlZCwgcmVmLCB3YXRjaCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCBSYXdNYXRlcmlhbHNDcmVhdGUgZnJvbSBcIi4vUmF3TWF0ZXJpYWxzQ3JlYXRlLnZ1ZVwiO1xuLy8gaW1wb3J0IFJhd01hdGVyaWFsc0FkZCBmcm9tIFwiLi9SYXdNYXRlcmlhbHNBZGQudnVlXCI7XG4vLyBpbXBvcnQgUmF3TWF0ZXJpYWxzVGFibGVFZGl0IGZyb20gXCIuL1Jhd01hdGVyaWFsc1RhYmxlRWRpdC52dWVcIjtcbmltcG9ydCBSYXdNYXRlcmlhbHNUYWJsZURlbGV0ZSBmcm9tIFwiLi9SYXdNYXRlcmlhbHNUYWJsZURlbGV0ZS52dWVcIjtcbmltcG9ydCB7IHVzZVJvdXRlIH0gZnJvbSBcInZ1ZS1yb3V0ZXJcIjtcbmltcG9ydCB7IHVzZUJyYW5jaFJhd01hdGVyaWFsc1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvYnJhbmNoLXJhd01hdGVyaWFsc1wiO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSBcInNyYy9ib290L2F4aW9zXCI7XG5pbXBvcnQgeyBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5cbmNvbnN0IHJvdXRlID0gdXNlUm91dGUoKTtcbmNvbnN0IGJyYW5jaElkID0gcm91dGUucGFyYW1zLmJyYW5jaF9pZDtcbmNvbnN0IGJyYW5jaFJhd01hdGVyaWFsc1N0b3JlID0gdXNlQnJhbmNoUmF3TWF0ZXJpYWxzU3RvcmUoKTtcbmNvbnN0IGZpbHRlciA9IHJlZihcIlwiKTtcbmNvbnN0IGxvYWRpbmcgPSByZWYodHJ1ZSk7XG5jb25zdCBicmFuY2hSYXdNYXRlcmlhbHMgPSByZWYoW10pO1xuY29uc3Qgc2hvd05vRGF0YU1lc3NhZ2UgPSByZWYoZmFsc2UpO1xuY29uc3QgcGFnaW5hdGlvbiA9IHJlZih7XG4gIHJvd3NQZXJQYWdlOiAwLFxufSk7XG5jb25zdCBicmFuY2hSYXdNYXRlcmlhbHNSb3dzID0gY29tcHV0ZWQoXG4gICgpID0+IGJyYW5jaFJhd01hdGVyaWFsc1N0b3JlLmJyYW5jaFJhd01hdGVyaWFsc1xuKTtcblxuY29uc3QgZmlsdGVyZWRSb3dzID0gY29tcHV0ZWQoKCkgPT4ge1xuICBpZiAoIWZpbHRlci52YWx1ZSkge1xuICAgIHJldHVybiBicmFuY2hSYXdNYXRlcmlhbHNSb3dzLnZhbHVlO1xuICB9XG4gIHJldHVybiBicmFuY2hSYXdNYXRlcmlhbHNSb3dzLnZhbHVlLmZpbHRlcigocm93KSA9PlxuICAgIHJvdy5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyLnZhbHVlLnRvTG93ZXJDYXNlKCkpXG4gICk7XG59KTtcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgY29uc29sZS5sb2coXCJwcm9wcy5icmFuY2hJZCBpbiBvbk1vdW50ZWQ6XCIsIGJyYW5jaElkKTtcbiAgaWYgKGJyYW5jaElkKSB7XG4gICAgYXdhaXQgcmVsb2FkVGFibGVEYXRhKGJyYW5jaElkKTtcbiAgfVxufSk7XG5cbmNvbnN0IHJlbG9hZFRhYmxlRGF0YSA9IGFzeW5jIChicmFuY2hJZCkgPT4ge1xuICAvLyBjb25zb2xlLmxvZyhcIkZldGNoaW5nIHByb2R1Y3RzIGZvciBicmFuY2ggSUQ6XCIsIGJyYW5jaElkKTtcbiAgdHJ5IHtcbiAgICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGJyYW5jaFJhd01hdGVyaWFsc1N0b3JlLmZldGNoQnJhbmNoUmF3TWF0ZXJpYWxzKFxuICAgICAgYnJhbmNoSWRcbiAgICApO1xuICAgIGJyYW5jaFJhd01hdGVyaWFsc1Jvd3MudmFsdWUgPSByZXNwb25zZTtcbiAgICBpZiAoIWJyYW5jaFJhd01hdGVyaWFsc1Jvd3MudmFsdWUubGVuZ3RoKSB7XG4gICAgICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IHRydWU7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiQnJhbmNoIFJhdyBNYXRlcmlhbHNcIiwgYnJhbmNoUmF3TWF0ZXJpYWxzUm93cy52YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coXCJFcnJvciBmZXRjaGluZyBicmFuY2ggcHJvZHVjdDpcIiwgZXJyb3IpO1xuICAgIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gdHJ1ZTtcbiAgfSBmaW5hbGx5IHtcbiAgICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIH1cbn07XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZWRTdG9ja3MoZGF0YSwgdmFsKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucHV0KFxuICAgICAgXCIvYXBpL3VwZGF0ZS1icmFuY2gtcmF3TWF0ZXJpYWxzL1wiICsgZGF0YS5pZCxcbiAgICAgIHtcbiAgICAgICAgdG90YWxfcXVhbnRpdHk6IHBhcnNlSW50KHZhbCksXG4gICAgICB9XG4gICAgKTtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIGNvbnN0IGkgPSBicmFuY2hSYXdNYXRlcmlhbHMudmFsdWUuZmluZEluZGV4KFxuICAgICAgICAoaXRlbSkgPT4gaXRlbS5pZCA9PSBkYXRhLmlkXG4gICAgICApO1xuICAgICAgYnJhbmNoUmF3TWF0ZXJpYWxzLnZhbHVlW2ldID0gcGFyc2VJbnQodmFsKTtcblxuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcbiAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuZGF0YS5tZXNzYWdlLFxuICAgICAgICB0aW1vdXQ6IDEwMDAsXG4gICAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgfSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB1cGRhdGluZyBwcmljZTpcIiwgZXJyb3IpO1xuICB9XG59XG5cbndhdGNoKGZpbHRlciwgYXN5bmMgKG5ld0ZpbHRlcikgPT4ge1xuICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpO1xuICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gZmlsdGVyZWRSb3dzLnZhbHVlLmxlbmd0aCA9PT0gMDtcbn0pO1xuXG5jb25zdCBnZXRSYXdNYXRlcmlhbEJhZGdlQ29sb3IgPSAocm93KSA9PiB7XG4gIGNvbnN0IHRvdGFsUXVhbnRpdHkgPSByb3cudG90YWxfcXVhbnRpdHk7XG4gIGNvbnN0IHVuaXQgPSByb3cuaW5ncmVkaWVudHMudW5pdDtcbiAgaWYgKHVuaXQgPT09IFwiR3JhbXNcIiAmJiB0b3RhbFF1YW50aXR5IDwgMTAwMCkge1xuICAgIHJldHVybiBcImJnLXJlZFwiO1xuICB9XG5cbiAgbGV0IHN0b2NrVmFsdWU7XG4gIGlmICh0b3RhbFF1YW50aXR5ID49IDEwMDApIHtcbiAgICBzdG9ja1ZhbHVlID0gdG90YWxRdWFudGl0eSAvIDEwMDA7XG4gIH0gZWxzZSB7XG4gICAgc3RvY2tWYWx1ZSA9IHRvdGFsUXVhbnRpdHk7XG4gIH1cblxuICBpZiAoc3RvY2tWYWx1ZSA8IDUpIHtcbiAgICBpZiAoc3RvY2tWYWx1ZSA8PSAyKSB7XG4gICAgICByZXR1cm4gXCJiZy1yZWRcIjtcbiAgICB9IGVsc2UgaWYgKHN0b2NrVmFsdWUgPD0gMykge1xuICAgICAgcmV0dXJuIFwiYmctd2FybmluZ1wiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJiZy13YXJuaW5nXCI7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBcImJnLXBvc2l0aXZlXCI7XG4gIH1cbn07XG5cbmNvbnN0IGZvcm1hdFRvdGFsUXVhbnRpdHkgPSAocm93KSA9PiB7XG4gIGNvbnN0IHRvdGFsUXVhbnRpdHkgPSByb3cudG90YWxfcXVhbnRpdHk7XG4gIGNvbnN0IHVuaXQgPSByb3cuaW5ncmVkaWVudHMudW5pdDtcblxuICBpZiAodG90YWxRdWFudGl0eSA+IDEwMDApIHtcbiAgICBjb25zdCB0b3RhbFF1YW50aXR5S2lsbyA9ICh0b3RhbFF1YW50aXR5IC8gMTAwMCkudG9GaXhlZCgyKTtcbiAgICBpZiAodG90YWxRdWFudGl0eUtpbG8uZW5kc1dpdGgoXCIuMDBcIikpIHtcbiAgICAgIHJldHVybiBgJHtNYXRoLnJvdW5kKHRvdGFsUXVhbnRpdHkgLyAxMDAwKX0ga2lsb3NgO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCR7dG90YWxRdWFudGl0eUtpbG99IGtpbG9zYDtcbiAgICB9XG4gIH0gZWxzZSBpZiAodG90YWxRdWFudGl0eSA+IDEpIHtcbiAgICByZXR1cm4gYCR7dG90YWxRdWFudGl0eX0gJHt1bml0fWA7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGAke3RvdGFsUXVhbnRpdHl9ICR7dW5pdH1gO1xuICB9XG59O1xuY29uc3QgaW5ncmVkaWVudHNDb2x1bW5zID0gW1xuICB7XG4gICAgbmFtZTogXCJjb2RlXCIsXG4gICAgbGFiZWw6IFwiUmF3IE1hdGVyaWFscyBDb2RlXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IChyb3cpID0+IHJvdz8uaW5ncmVkaWVudHM/LmNvZGUgPz8gXCJObyBDb2RlXCIsXG4gICAgZm9ybWF0OiAodmFsKSA9PiBgJHt2YWx9YCxcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwibmFtZVwiLFxuICAgIGxhYmVsOiBcIlJhdyBNYXRlcmlhbHMgTmFtZVwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiAocm93KSA9PiByb3c/LmluZ3JlZGllbnRzPy5uYW1lID8/IFwiTm8gQ29kZVwiLFxuICAgIGZvcm1hdDogKHZhbCkgPT4gYCR7dmFsfWAsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInRvdGFsX3F1YW50aXR5XCIsXG4gICAgbGFiZWw6IFwiQXZhaWxhYmxlIFN0b2Nrc1wiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiBcInRvdGFsX3F1YW50aXR5XCIsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImFjdGlvblwiLFxuICAgIGxhYmVsOiBcIkFjdGlvblwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICB9LFxuXTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLmVsZWdhbnQtY29udGFpbmVyIHtcbiAgYmFja2dyb3VuZDogI2Y3ZjhmYztcbiAgcGFkZGluZzogMnJlbTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xufVxuLmFic29sdXRlLWZ1bGwge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbn1cbi5zcGlubmVyLXdyYXBwZXIge1xuICBtaW4taGVpZ2h0OiA0MHZoOyAvKiBNaW5pbXVtIGhlaWdodCBvZiA1MCUgdmlld3BvcnQgaGVpZ2h0ICovXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLmRhdGEtZXJyb3Ige1xuICBtaW4taGVpZ2h0OiA0MHZoOyAvKiBNaW5pbXVtIGhlaWdodCBvZiA1MCUgdmlld3BvcnQgaGVpZ2h0ICovXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLnRhYmxlLWNvbnRhaW5lciB7XG4gIG1heC1oZWlnaHQ6IDQwMHB4OyAvKiBBZGp1c3QgYXMgbmVlZGVkICovXG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5xLXRhYmxlLWNvbnRhaW5lciB7XG4gIG92ZXJmbG93OiBoaWRkZW4gIWltcG9ydGFudDsgLyogVGFyZ2V0IHRoZSBjb250YWluZXIgZ2VuZXJhdGVkIGJ5IHEtdGFibGUgKi9cbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPHEtY2FyZCBjbGFzcz1cIm15LWNhcmQgcS1wYS1tZFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5CYWtlciBSZXBvcnQ8L2Rpdj5cbiAgICAgICAgPCEtLSA8ZGl2IGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgIHBhZGRpbmc9XCJ4cyBtZFwiXG4gICAgICAgICAgICBsYWJlbD1cIlByaW50XCJcbiAgICAgICAgICAgIGljb249XCJwcmludFwiXG4gICAgICAgICAgICBvdXRsaW5lXG4gICAgICAgICAgICBAY2xpY2s9XCJvcGVuUHJpbnREaWFsb2dcIlxuICAgICAgICAgICAgY2xhc3M9XCJ1c2VyLWJ1dHRvblwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHEtdG9vbHRpcCBjbGFzcz1cImJnLWJsdWUtZ3JleS02XCIgOmRlbGF5PVwiMjAwXCI+XG4gICAgICAgICAgICAgIFByaW50IFJlcG9ydFxuICAgICAgICAgICAgPC9xLXRvb2x0aXA+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PiAtLT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUxIHRleHQtd2VpZ2h0LXJlZ3VsYXJcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICBOYW1lOlxuICAgICAgICAgIHt7XG4gICAgICAgICAgICBmb3JtYXRGdWxsbmFtZShcbiAgICAgICAgICAgICAgcmVwb3J0c0RhdGFbMF0/LnVzZXI/LmVtcGxveWVlIHx8XG4gICAgICAgICAgICAgICAgcmVwb3J0c0RhdGFbMV0/LnVzZXI/LmVtcGxveWVlIHx8XG4gICAgICAgICAgICAgICAgXCJObyBuYW1lIGF2YWlsYWJsZVwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgRGF0ZTpcbiAgICAgICAgICB7e1xuICAgICAgICAgICAgYCR7Zm9ybWF0RGF0ZShcbiAgICAgICAgICAgICAgcHJvcHMuYmFrZXJzUmVwb3J0WzBdPy5jcmVhdGVkX2F0IHx8XG4gICAgICAgICAgICAgICAgcHJvcHMuYmFrZXJzUmVwb3J0WzFdPy5jcmVhdGVkX2F0IHx8XG4gICAgICAgICAgICAgICAgXCJObyBuYW1lIGF2YWlsYWJsZVwiXG4gICAgICAgICAgICApfWBcbiAgICAgICAgICB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLW1kXCI+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgdi1mb3I9XCIoYmFrZXJSZXBvcnQsIGluZGV4KSBpbiByZXBvcnRzRGF0YVwiXG4gICAgICAgICAgICA6a2V5PVwiaW5kZXhcIlxuICAgICAgICAgICAgY2xhc3M9XCJyb3cgcS1ndXR0ZXItc21cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxxLWNhcmRcbiAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBib3JkZXJlZFxuICAgICAgICAgICAgICBjbGFzcz1cInEtcGEtbWQgcS1teS1zbSB1c2VyLWNhcmRcIlxuICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiA2NzVweDsgbWF4LXdpZHRoOiAxNTAwcHhcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNiByb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIHt7XG4gICAgICAgICAgICAgICAgICAgIGAke1xuICAgICAgICAgICAgICAgICAgICAgIGNhcGl0YWxpemVGaXJzdExldHRlcihcbiAgICAgICAgICAgICAgICAgICAgICAgIGJha2VyUmVwb3J0LmJyYW5jaF9yZWNpcGUucmVjaXBlPy5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgKSB8fCBcIlVua25vd24gUmVjaXBlXCJcbiAgICAgICAgICAgICAgICAgICAgfSAoJHtiYWtlclJlcG9ydC5yZWNpcGVfY2F0ZWdvcnkgfHwgXCJVbmtub3duIENhdGVnb3J5XCJ9KWBcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nPVwieHMgbWRcIlxuICAgICAgICAgICAgICAgICAgbGFiZWw9XCJQcmludFwiXG4gICAgICAgICAgICAgICAgICBpY29uPVwicHJpbnRcIlxuICAgICAgICAgICAgICAgICAgb3V0bGluZVxuICAgICAgICAgICAgICAgICAgQGNsaWNrPVwib3BlblByaW50RGlhbG9nKGJha2VyUmVwb3J0KVwiXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cInVzZXItYnV0dG9uXCJcbiAgICAgICAgICAgICAgICA+PC9xLWJ0bj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+VGltZToge3sgZm9ybWF0VGltZUZyb21EQihiYWtlclJlcG9ydC5jcmVhdGVkX2F0KSB9fTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIFN0YXR1czpcbiAgICAgICAgICAgICAgICA8cS1iYWRnZVxuICAgICAgICAgICAgICAgICAgYWxpZ249XCJtaWRkbGVcIlxuICAgICAgICAgICAgICAgICAgOmNvbG9yPVwiZ2V0QmFkZ2VTdGF0dXNDb2xvcihiYWtlclJlcG9ydC5zdGF0dXMpXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7eyBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoYmFrZXJSZXBvcnQuc3RhdHVzKSB9fVxuICAgICAgICAgICAgICAgIDwvcS1iYWRnZT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBjbGFzcz1cInJvdyBpdGVtcy1zdGFydCBxLWd1dHRlci14LW1kIHRleHQtb3ZlcmxpbmUgZWxlZ2FudC10ZXh0XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLXgtc20gcS1ndXR0ZXIteS14bVwiPlxuICAgICAgICAgICAgICAgICAgICBBY3R1YWwgVGFyZ2V0OlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWJhZGdlIG91dGxpbmUgYWxpZ249XCJtaWRkbGVcIiBjb2xvcj1cInRlYWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IGAke2Jha2VyUmVwb3J0Py5hY3R1YWxfdGFyZ2V0IHx8IFwiTm8gdGFyZ2V0XCJ9IHBjc2AgfX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3EtYmFkZ2U+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLXgtc20gcS1ndXR0ZXIteS14bVwiPlxuICAgICAgICAgICAgICAgICAgICBLaWxvOlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWJhZGdlIG91dGxpbmUgYWxpZ249XCJtaWRkbGVcIiBjb2xvcj1cInRlYWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IGAke2Jha2VyUmVwb3J0Py5raWxvIHx8IFwiTm8gS2lsb1wifSBrZ3NgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci14LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgIE92ZXI6XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtYmFkZ2Ugb3V0bGluZSBhbGlnbj1cIm1pZGRsZVwiIGNvbG9yPVwidGVhbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgYCR7YmFrZXJSZXBvcnQub3Zlcn0gcGNzYCB9fVxuICAgICAgICAgICAgICAgICAgICAgIDwvcS1iYWRnZT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXIteC1zbVwiPlxuICAgICAgICAgICAgICAgICAgICBTaG9ydDpcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1iYWRnZSBvdXRsaW5lIGFsaWduPVwibWlkZGxlXCIgY29sb3I9XCJ0ZWFsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBgJHtiYWtlclJlcG9ydC5zaG9ydH0gcGNzYCB9fVxuICAgICAgICAgICAgICAgICAgICAgIDwvcS1iYWRnZT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNlwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1zdWJ0aXRsZTFcIiBhbGlnbj1cImNlbnRlclwiPkluZ3JlZGllbnRzPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1jZW50ZXIgcS1ndXR0ZXIteC1sZyBxLXBhLWxnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5ncmVkaWVudCwgaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSBpbiBiYWtlclJlcG9ydC5pbmdyZWRpZW50X2Jha2Vyc19yZXBvcnRzIHx8IFtdXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOmtleT1cImluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuIHEtZ3V0dGVyLXktbGcgcS1ndXR0ZXIteC14bCB0ZXh0LXdlaWdodC1saWdodFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZ3JlZGllbnQ/LmluZ3JlZGllbnRzPy5uYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVua25vd24gSW5ncmVkaWVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgaXRlbXMtc3RhcnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYCR7aW5ncmVkaWVudD8ucXVhbnRpdHkgfHwgXCJVbmtub3duIFF1YW50aXR5XCJ9ICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZ3JlZGllbnQ/LmluZ3JlZGllbnRzPy51bml0IHx8IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNlwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1zdWJ0aXRsZTFcIiBhbGlnbj1cImNlbnRlclwiPkJyZWFkPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1jZW50ZXIgcS1ndXR0ZXIteC1sZyBxLXBhLWxnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCIoYnJlYWRSZXBvcnQsIGluZGV4KSBpbiBnZXRCcmVhZFJlcG9ydHMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFrZXJSZXBvcnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDprZXk9XCJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlbiBxLWd1dHRlci15LWxnIHEtZ3V0dGVyLXgteGwgdGV4dC13ZWlnaHQtbGlnaHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGJyZWFkUmVwb3J0Py5icmVhZD8ubmFtZSB8fCBcIlVua25vd24gQnJlYWRcIiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWlmPVwiYmFrZXJSZXBvcnQucmVjaXBlX2NhdGVnb3J5ID09PSAnRmlsbGluZydcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAke2JyZWFkUmVwb3J0Py5maWxsaW5nX3Byb2R1Y3Rpb24gfHwgXCIwXCJ9IHBjc2BcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1lbHNlLWlmPVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJha2VyUmVwb3J0LnJlY2lwZV9jYXRlZ29yeSA9PT0gJ0RvdWdoJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBgJHticmVhZFJlcG9ydD8uYnJlYWRfbmV3X3Byb2R1Y3Rpb259IHBjc2AgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtZWxzZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IFwiMCBwY3NcIiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgPC9xLWNhcmQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8L3EtY2FyZD5cblxuICAgIDxxLWRpYWxvZ1xuICAgICAgdi1tb2RlbD1cInByaW50RGlhbG9nXCJcbiAgICAgIDpiYWNrZHJvcC1maWx0ZXI9XCJiYWNrZHJvcEZpbHRlclwiXG4gICAgICA6bWF4aW1pemVkPVwibWF4aW1pemVkVG9nZ2xlXCJcbiAgICAgIHRyYW5zaXRpb24tc2hvdz1cInNsaWRlLXVwXCJcbiAgICAgIHRyYW5zaXRpb24taGlkZT1cInNsaWRlLWRvd25cIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJxLW1hLXNtXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW1hLXNtXCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8cS1idG4gaWNvbj1cImNsb3NlXCIgZmxhdCBkZW5zZSByb3VuZCB2LWNsb3NlLXBvcHVwIGNsYXNzPVwidGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgPHEtdG9vbHRpcD5DbG9zZTwvcS10b29sdGlwPlxuICAgICAgICAgIDwvcS1idG4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxpZnJhbWUgOnNyYz1cInBkZlVybFwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjcwMHB4XCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtZGlhbG9nPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBkYXRlLCB1c2VRdWFzYXIgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgKiBhcyBwZGZNYWtlIGZyb20gXCJwZGZtYWtlL2J1aWxkL3BkZm1ha2VcIjtcbmltcG9ydCAqIGFzIHBkZkZvbnRzIGZyb20gXCJwZGZtYWtlL2J1aWxkL3Zmc19mb250ZXNcIjtcbnBkZk1ha2UudmZzID0gcGRmRm9udHMuZGVmYXVsdDtcbi8vIGltcG9ydCBQcmludFJlcG9ydERpYWxvZyBmcm9tIFwiLi9QcmludFJlcG9ydERpYWxvZy52dWVcIjtcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyhbXCJiYWtlcnNSZXBvcnRcIl0pO1xuY29uc3QgcmVwb3J0c0RhdGEgPSBwcm9wcy5iYWtlcnNSZXBvcnQ7XG5jb25zb2xlLmxvZyhcIkJha2VycyBSZXBvcnRcIiwgcHJvcHMuYmFrZXJzUmVwb3J0KTtcbmNvbnN0IG1heGltaXplZFRvZ2dsZSA9IHJlZih0cnVlKTtcbmNvbnN0IHByaW50RGlhbG9nID0gcmVmKGZhbHNlKTtcblxuY29uc3QgcGRmVXJsID0gcmVmKFwiXCIpO1xuXG5jb25zdCBmb3JtYXREYXRlID0gKGRhdGVTdHJpbmcpID0+IHtcbiAgcmV0dXJuIGRhdGUuZm9ybWF0RGF0ZShkYXRlU3RyaW5nLCBcIk1NTS4gREQsIFlZWVlcIik7XG59O1xuXG5jb25zdCBjYXBpdGFsaXplRmlyc3RMZXR0ZXIgPSAobG9jYXRpb24pID0+IHtcbiAgaWYgKCFsb2NhdGlvbikgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBsb2NhdGlvblxuICAgIC5zcGxpdChcIiBcIilcbiAgICAubWFwKCh3b3JkKSA9PiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpKVxuICAgIC5qb2luKFwiIFwiKTtcbn07XG5cbi8vIGNvbnN0IHByaW50UGRmID0gKGJha2VyUmVwb3J0KSA9PiB7XG4vLyAgIGNvbnN0IGRvY0RlZmluaXRpb24gPSBnZW5lcmF0ZURvY0RlZmluaXRpb24oYmFrZXJSZXBvcnQpO1xuXG4vLyAgIC8vIE9wZW4gdGhlIGdlbmVyYXRlZCBQREYgaW4gYSBuZXcgdGFiIG9yIGRvd25sb2FkIGRpcmVjdGx5XG4vLyAgIHBkZk1ha2UuY3JlYXRlUGRmKGRvY0RlZmluaXRpb24pLnByaW50KCk7XG4vLyB9O1xuXG5jb25zdCBmb3JtYXRGdWxsbmFtZSA9IChyb3cpID0+IHtcbiAgY29uc3QgY2FwaXRhbGl6ZSA9IChzdHIpID0+XG4gICAgc3RyID8gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkgOiBcIlwiO1xuICBjb25zdCBmaXJzdG5hbWUgPSByb3cuZmlyc3RuYW1lID8gY2FwaXRhbGl6ZShyb3cuZmlyc3RuYW1lKSA6IFwiTm8gRmlyc3RuYW1lXCI7XG4gIGNvbnN0IG1pZGRsZW5hbWUgPSByb3cubWlkZGxlbmFtZVxuICAgID8gY2FwaXRhbGl6ZShyb3cubWlkZGxlbmFtZSkuY2hhckF0KDApICsgXCIuXCJcbiAgICA6IFwiXCI7XG4gIGNvbnN0IGxhc3RuYW1lID0gcm93Lmxhc3RuYW1lID8gY2FwaXRhbGl6ZShyb3cubGFzdG5hbWUpIDogXCJObyBMYXN0bmFtZVwiO1xuXG4gIHJldHVybiBgJHtmaXJzdG5hbWV9ICR7bWlkZGxlbmFtZX0gJHtsYXN0bmFtZX1gLnRyaW0oKTtcbn07XG5cbmNvbnN0IGZvcm1hdFRpbWVGcm9tREIgPSAoZGF0ZVN0cmluZykgPT4ge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0ZVN0cmluZyk7XG5cbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICBob3VyOiBcIjItZGlnaXRcIixcbiAgICBtaW51dGU6IFwiMi1kaWdpdFwiLFxuICAgIGhvdXIxMjogdHJ1ZSxcbiAgfTtcbiAgcmV0dXJuIGRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKHVuZGVmaW5lZCwgb3B0aW9ucyk7XG59O1xuXG5jb25zdCBmb3JtYXRBbW91bnQgPSAocHJpY2UpID0+IHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChcImVuLVVTXCIsIHtcbiAgICBzdHlsZTogXCJjdXJyZW5jeVwiLFxuICAgIGN1cnJlbmN5OiBcIlBIUFwiLFxuICB9KS5mb3JtYXQocHJpY2UpO1xufTtcblxuY29uc3QgZ2V0QmFkZ2VTdGF0dXNDb2xvciA9IChzdGF0dXMpID0+IHtcbiAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICBjYXNlIFwicGVuZGluZ1wiOlxuICAgICAgcmV0dXJuIFwib3JhbmdlXCI7XG4gICAgY2FzZSBcImRlY2xpbmVkXCI6XG4gICAgICByZXR1cm4gXCJuZWdhdGl2ZVwiO1xuICAgIGNhc2UgXCJjb25maXJtZWRcIjpcbiAgICAgIHJldHVybiBcImdyZWVuXCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcImdyZXlcIjtcbiAgfVxufTtcblxuY29uc3QgY2FwaXRhbGl6ZU5hbWUgPSAobmFtZSkgPT4ge1xuICBpZiAoIW5hbWUpIHJldHVybiBcIlwiO1xuICByZXR1cm4gbmFtZVxuICAgIC5zcGxpdChcIiBcIilcbiAgICAubWFwKCh3b3JkKSA9PiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpKVxuICAgIC5qb2luKFwiIFwiKTtcbn07XG5cbmNvbnN0IGdldEJyZWFkUmVwb3J0cyA9IChyZXBvcnRzRGF0YSkgPT4ge1xuICBpZiAoIXJlcG9ydHNEYXRhKSB7XG4gICAgY29uc29sZS5lcnJvcihcIk5vIGJha2VyUmVwb3J0IHByb3ZpZGVkXCIpO1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGlmIChyZXBvcnRzRGF0YS5yZWNpcGVfY2F0ZWdvcnkgPT09IFwiRmlsbGluZ1wiKSB7XG4gICAgcmV0dXJuIHJlcG9ydHNEYXRhLmZpbGxpbmdfYmFrZXJzX3JlcG9ydHMgfHwgW107XG4gIH0gZWxzZSBpZiAocmVwb3J0c0RhdGEucmVjaXBlX2NhdGVnb3J5ID09PSBcIkRvdWdoXCIpIHtcbiAgICByZXR1cm4gcmVwb3J0c0RhdGEuYnJlYWRfcHJvZHVjdGlvbl9yZXBvcnRzIHx8IFtdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbXTtcbiAgfVxufTtcblxuY29uc3QgZ2VuZXJhdGVEb2NEZWZpbml0aW9uID0gKGJha2VyUmVwb3J0KSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiYmFrZXJSZXBvcnRcIiwgYmFrZXJSZXBvcnQpO1xuICBjb25zdCByZWNpcGVOYW1lID0gYCR7YmFrZXJSZXBvcnQuYnJhbmNoX3JlY2lwZS5yZWNpcGUubmFtZX0gKCR7YmFrZXJSZXBvcnQucmVjaXBlX2NhdGVnb3J5fSlgO1xuICBjb25zdCB0YXJnZXQgPSBiYWtlclJlcG9ydC5icmFuY2hfcmVjaXBlLnJlY2lwZS50YXJnZXQ7XG4gIGNvbnN0IGFjdHVhbFRhcmdldCA9IGJha2VyUmVwb3J0LmFjdHVhbF90YXJnZXQ7XG4gIGNvbnN0IGtpbG8gPSBiYWtlclJlcG9ydC5raWxvO1xuICBjb25zdCBvdmVyID0gYmFrZXJSZXBvcnQub3ZlcjtcbiAgY29uc3Qgc2hvcnQgPSBiYWtlclJlcG9ydC5zaG9ydDtcblxuICBjb25zdCBzdW1tYXJ5VGFibGUgPSB7XG4gICAgdGFibGU6IHtcbiAgICAgIHdpZHRoczogW1wiNTAlXCIsIFwiNTAlXCJdLFxuICAgICAgYm9keTogW1xuICAgICAgICBbXG4gICAgICAgICAgeyB0ZXh0OiBcIlJlY2lwZSBOYW1lXCIsIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsIGFsaWdubWVudDogXCJsZWZ0XCIgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiByZWNpcGVOYW1lLFxuICAgICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbiAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAgeyB0ZXh0OiBcIlRhcmdldCBwZXIgS2lsb1wiLCBzdHlsZTogXCJ0YWJsZUhlYWRlclwiLCBhbGlnbm1lbnQ6IFwibGVmdFwiIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogYCR7dGFyZ2V0fSBwY3NgLFxuICAgICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbiAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAgeyB0ZXh0OiBcIkFjdHVhbCBUYXJnZXRcIiwgc3R5bGU6IFwidGFibGVIZWFkZXJcIiwgYWxpZ25tZW50OiBcImxlZnRcIiB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IGAke2FjdHVhbFRhcmdldH0gcGNzYCxcbiAgICAgICAgICAgIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsXG4gICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgIHsgdGV4dDogXCJLaWxvXCIsIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsIGFsaWdubWVudDogXCJsZWZ0XCIgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBgJHtraWxvfSBrZy9zYCxcbiAgICAgICAgICAgIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsXG4gICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgIHsgdGV4dDogXCJPdmVyXCIsIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsIGFsaWdubWVudDogXCJsZWZ0XCIgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBgJHtvdmVyfSBwY3NgLFxuICAgICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbiAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAgeyB0ZXh0OiBcIlNob3J0XCIsIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsIGFsaWdubWVudDogXCJsZWZ0XCIgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBgJHtzaG9ydH0gcGNzYCxcbiAgICAgICAgICAgIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsXG4gICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgIHBhZGRpbmdMZWZ0OiAoKSA9PiAyLFxuICAgICAgcGFkZGluZ1JpZ2h0OiAoKSA9PiAyLFxuICAgICAgcGFkZGluZ1RvcDogKCkgPT4gMixcbiAgICAgIHBhZGRpbmdCb3R0b206ICgpID0+IDIsXG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGNvbnRlbnQ6IFtcbiAgICAgIHsgdGV4dDogXCJCYWtlciBSZXBvcnRcIiwgc3R5bGU6IFwiaGVhZGVyXCIsIGFsaWdubWVudDogXCJjZW50ZXJcIiB9LFxuICAgICAge1xuICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogYEJyYW5jaCBOYW1lOiAke1xuICAgICAgICAgICAgICBiYWtlclJlcG9ydC5icmFuY2gubmFtZSB8fCBcIk5vIG5hbWUgYXZhaWxhYmxlXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBCYWtlcjogJHtmb3JtYXRGdWxsbmFtZShcbiAgICAgICAgICAgICAgICAgIGJha2VyUmVwb3J0Py51c2VyPy5lbXBsb3llZSB8fCBcIlVua25vd24gQmFrZXIgTmFtZVwiXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICBSZWNpcGU6ICR7YmFrZXJSZXBvcnQucmVjaXBlPy5uYW1lIHx8IFwiVW5rbm93biBSZWNpcGVcIn0gKCR7XG4gICAgICAgICAgICAgIGJha2VyUmVwb3J0LnJlY2lwZV9jYXRlZ29yeSB8fCBcIlVua25vd24gQ2F0ZWdvcnlcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICBgLFxuICAgICAgICAgICAgd2lkdGg6IFwiODAlXCIsIC8vIEFkanVzdCB3aWR0aCBpZiBuZWNlc3NhcnlcbiAgICAgICAgICAgIG1hcmdpbjogWzAsIDAsIDAsIDEwXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IGBEYXRlOiAke2Zvcm1hdERhdGUoXG4gICAgICAgICAgICAgIHByb3BzLmJha2Vyc1JlcG9ydFswXT8uY3JlYXRlZF9hdCB8fFxuICAgICAgICAgICAgICAgIHByb3BzLmJha2Vyc1JlcG9ydFsxXT8uY3JlYXRlZF9hdCB8fFxuICAgICAgICAgICAgICAgIFwiTm8gbmFtZSBhdmFpbGFibGVcIlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICBUaW1lOiAke2Zvcm1hdFRpbWVGcm9tREIoYmFrZXJSZXBvcnQuY3JlYXRlZF9hdCl9XG4gICAgICAgICAgICAgICAgU3RhdHVzOiAke2NhcGl0YWxpemVGaXJzdExldHRlcihiYWtlclJlcG9ydC5zdGF0dXMpfWAsXG4gICAgICAgICAgICBtYXJnaW46IFswLCAwLCAwLCAxMF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB3aWR0aDogXCI1MCVcIixcbiAgICAgICAgICAgIHN0YWNrOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkJyZWFkIFByb2R1Y3Rpb25cIixcbiAgICAgICAgICAgICAgICBzdHlsZTogXCJzdWJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICAgICAgaGVhZGVyUm93czogMSxcbiAgICAgICAgICAgICAgICAgIHdpZHRoczogW1wiKlwiLCBcIipcIl0sXG4gICAgICAgICAgICAgICAgICBib2R5OiBbXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkJyZWFkIE5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlByb2R1Y3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgLi4uZ2V0QnJlYWRSZXBvcnRzKGJha2VyUmVwb3J0KS5tYXAoKGJyZWFkUmVwb3J0KSA9PiBbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYnJlYWRSZXBvcnQ/LmJyZWFkPy5uYW1lIHx8IFwiVW5rbm93biBCcmVhZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IFwiYm9keVwiLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmFrZXJSZXBvcnQucmVjaXBlX2NhdGVnb3J5ID09PSBcIkZpbGxpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYCR7YnJlYWRSZXBvcnQ/LmZpbGxpbmdfcHJvZHVjdGlvbiB8fCBcIjBcIn0gcGNzYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYCR7YnJlYWRSZXBvcnQ/LmJyZWFkX25ld19wcm9kdWN0aW9ufSBwY3NgLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IFwiYm9keVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGNvbHVtbkdhcDogMTAsIC8vIEdhcCB3aXRoaW4gdGhlIEJyZWFkIFByb2R1Y3Rpb24gY29sdW1uXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB3aWR0aDogXCI1MCVcIixcbiAgICAgICAgICAgIHN0YWNrOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkluZ3JlZGllbnRzXCIsXG4gICAgICAgICAgICAgICAgc3R5bGU6IFwic3ViaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICAgICAgICAgIGhlYWRlclJvd3M6IDEsXG4gICAgICAgICAgICAgICAgICB3aWR0aHM6IFtcIipcIiwgXCIqXCJdLFxuICAgICAgICAgICAgICAgICAgYm9keTogW1xuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJJbmdyZWRpZW50IENvZGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlF1YW50aXR5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogXCJ0YWJsZUhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIC4uLihiYWtlclJlcG9ydC5pbmdyZWRpZW50X2Jha2Vyc19yZXBvcnRzIHx8IFtdKS5tYXAoXG4gICAgICAgICAgICAgICAgICAgICAgKGluZ3JlZGllbnQpID0+IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmdyZWRpZW50Py5pbmdyZWRpZW50cz8uY29kZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVW5rbm93biBJbmdyZWRpZW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBcImJvZHlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZ3JlZGllbnQ/LnF1YW50aXR5IHx8IFwiVW5rbm93biBRdWFudGl0eVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gJHtpbmdyZWRpZW50Py5pbmdyZWRpZW50cz8udW5pdCB8fCBcIlwifWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBcImJvZHlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgY29sdW1uR2FwOiAxMCwgLy8gR2FwIHdpdGhpbiB0aGUgSW5ncmVkaWVudHMgY29sdW1uXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgY29sdW1uR2FwOiAyMCwgLy8gR2FwIGJldHdlZW4gdGhlIEJyZWFkIFByb2R1Y3Rpb24gYW5kIEluZ3JlZGllbnRzIGNvbHVtbnNcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGNhbnZhczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwibGluZVwiLFxuICAgICAgICAgICAgeDE6IDAsXG4gICAgICAgICAgICB5MTogMjUsXG4gICAgICAgICAgICB4MjogNTU1LFxuICAgICAgICAgICAgeTI6IDI1LFxuICAgICAgICAgICAgbGluZVdpZHRoOiAxLFxuICAgICAgICAgICAgZGFzaDogeyBsZW5ndGg6IDUsIHNwYWNlOiA1IH0sIC8vIERhc2hlZCBsaW5lXG4gICAgICAgICAgICBsaW5lQ29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgbWFyZ2luOiBbMCwgMjAsIDAsIDBdLCAvLyBBZGp1c3QgbWFyZ2luIGFzIG5lZWRlZFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBtYXJnaW46IFswLCAyMCwgMCwgMF0sXG4gICAgICAgIHN0YWNrOiBbXG4gICAgICAgICAgeyB0ZXh0OiBcIlN1bW1hcnlcIiwgc3R5bGU6IFwic3ViaGVhZGVyXCIsIGFsaWdubWVudDogXCJjZW50ZXJcIiB9LFxuICAgICAgICAgIHN1bW1hcnlUYWJsZSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBzdHlsZXM6IHtcbiAgICAgIGhlYWRlcjogeyBmb250U2l6ZTogMTYsIGJvbGQ6IHRydWUgfSxcbiAgICAgIHN1YmhlYWRlcjogeyBmb250U2l6ZTogMTIsIGJvbGQ6IHRydWUsIG1hcmdpbjogWzAsIDEwLCAwLCA1XSB9LFxuICAgICAgdGFibGVIZWFkZXI6IHsgYm9sZDogdHJ1ZSwgZm9udFNpemU6IDEwLCBjb2xvcjogXCJibGFja1wiIH0sXG4gICAgICBib2R5OiB7IGZvbnRTaXplOiA4IH0sXG4gICAgfSxcbiAgICBwYWdlTWFyZ2luczogWzIwLCAyMCwgMjAsIDIwXSwgLy8gUmVkdWNlZCBwYWdlIG1hcmdpbnMgZm9yIGJldHRlciBmaXRcbiAgfTtcbn07XG5jb25zdCBvcGVuUHJpbnREaWFsb2cgPSAoYmFrZXJSZXBvcnQpID0+IHtcbiAgY29uc3QgZG9jRGVmaW5pdGlvbiA9IGdlbmVyYXRlRG9jRGVmaW5pdGlvbihiYWtlclJlcG9ydCk7XG4gIHBkZk1ha2UuY3JlYXRlUGRmKGRvY0RlZmluaXRpb24pLmdldERhdGFVcmwoKGRhdGFVcmwpID0+IHtcbiAgICBwZGZVcmwudmFsdWUgPSBkYXRhVXJsO1xuICAgIHByaW50RGlhbG9nLnZhbHVlID0gdHJ1ZTtcbiAgfSk7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi51c2VyLWJ1dHRvbiB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xufVxuXG4udXNlci1idXR0b246aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTVweCk7XG4gIGJveC1zaGFkb3c6IDBweCA2cHggMTVweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtZGlhbG9nIHJlZj1cImRpYWxvZ1JlZlwiIEBoaWRlPVwib25EaWFsb2dIaWRlXCI+XG4gICAgPHEtY2FyZCBzdHlsZT1cIndpZHRoOiA4NzBweDsgbWF4LXdpZHRoOiA4MHZ3XCI+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjNzk1NTQ4XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPkJyZWFkIFJlcG9ydDwvZGl2PlxuICAgICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IGRlbnNlIHJvdW5kIHYtY2xvc2UtcG9wdXA+XG4gICAgICAgICAgICA8cS10b29sdGlwIGNsYXNzPVwiYmctYmx1ZS1ncmV5LTZcIiA6ZGVsYXk9XCIyMDBcIj5DbG9zZTwvcS10b29sdGlwPlxuICAgICAgICAgIDwvcS1idG4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtdGFibGVcbiAgICAgICAgICA6ZmlsdGVyPVwiZmlsdGVyXCJcbiAgICAgICAgICA6dmlydHVhbC1zY3JvbGwtc3RpY2t5LXNpemUtc3RhcnQ9XCI0OFwiXG4gICAgICAgICAgZmxhdFxuICAgICAgICAgIDpjb2x1bW5zPVwiYnJlYWRSZXBvcnRDb2x1bW5zXCJcbiAgICAgICAgICA6cm93cz1cImZpbHRlcmVkUm93c1wiXG4gICAgICAgICAgcm93LWtleT1cIm5hbWVcIlxuICAgICAgICAgIHZpcnR1YWwtc2Nyb2xsXG4gICAgICAgICAgdi1tb2RlbDpwYWdpbmF0aW9uPVwicGFnaW5hdGlvblwiXG4gICAgICAgICAgOnJvd3MtcGVyLXBhZ2Utb3B0aW9ucz1cIlswXVwiXG4gICAgICAgICAgaGlkZS1ib3R0b21cbiAgICAgICAgICBzdHlsZT1cImhlaWdodDogMzUwcHhcIlxuICAgICAgICAgIGNsYXNzPVwidGFibGUtY29udGFpbmVyIHN0aWNreS1oZWFkZXJcIlxuICAgICAgICA+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtbmFtZT1cInByb3BzXCI+XG4gICAgICAgICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgICAgICA8c3Bhbj57e1xuICAgICAgICAgICAgICAgIGAke2NhcGl0YWxpemVGaXJzdExldHRlcihwcm9wcy5yb3cuYnJlYWQubmFtZSl9YFxuICAgICAgICAgICAgICB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvcS10ZD5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLXByaWNlPVwicHJvcHNcIj5cbiAgICAgICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgICAgIDxzcGFuPnt7IGAke2Zvcm1hdFByaWNlKHByb3BzLnJvdy5wcmljZSl9YCB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvcS10ZD5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLXNhbGVzPVwicHJvcHNcIj5cbiAgICAgICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgICAgIDxzcGFuPnt7IGAke2Zvcm1hdFByaWNlKHByb3BzLnJvdy5zYWxlcyl9YCB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvcS10ZD5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3EtdGFibGU+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktZW5kIHEtbXQtbWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPlxuICAgICAgICAgICAgT3ZlcmFsbCBUb3RhbCBTYWxlczoge3sgZm9ybWF0UHJpY2Uob3ZlcmFsbFRvdGFsIHx8IFwiMFwiKSB9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgdXNlRGlhbG9nUGx1Z2luQ29tcG9uZW50IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IHsgZGlhbG9nUmVmLCBvbkRpYWxvZ0hpZGUsIG9uRGlhbG9nT0ssIG9uRGlhbG9nQ2FuY2VsIH0gPVxuICB1c2VEaWFsb2dQbHVnaW5Db21wb25lbnQoKTtcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyhbXCJyZXBvcnRzXCJdKTtcblxuLy8gTG9nIHRvIHZlcmlmeSB0aGUgc3RydWN0dXJlIG9mIHByb3BzLnJlcG9ydHNcbmNvbnNvbGUubG9nKFwiUmVwb3J0cyBkYXRhIHN0cnVjdHVyZTpcIiwgcHJvcHMucmVwb3J0cyk7XG5cbmNvbnN0IGNhcGl0YWxpemVGaXJzdExldHRlciA9IChsb2NhdGlvbikgPT4ge1xuICBpZiAoIWxvY2F0aW9uKSByZXR1cm4gXCJcIjtcbiAgcmV0dXJuIGxvY2F0aW9uXG4gICAgLnNwbGl0KFwiIFwiKVxuICAgIC5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkpXG4gICAgLmpvaW4oXCIgXCIpO1xufTtcblxuY29uc3QgYnJlYWRSZXBvcnRDb2x1bW5zID0gW1xuICB7XG4gICAgbmFtZTogXCJuYW1lXCIsXG4gICAgbGFiZWw6IFwiQnJlYWQgTmFtZVwiLFxuICAgIGZpZWxkOiAocm93KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIlJvdyBkYXRhOlwiLCByb3cpOyAvLyBEZWJ1ZyBlYWNoIHJvdydzIGRhdGFcbiAgICAgIHJldHVybiByb3cuYnJlYWQubmFtZSB8fCBcIk4vQVwiOyAvLyBBZGp1c3QgdGhpcyBhY2NvcmRpbmcgdG8geW91ciBkYXRhXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwicHJpY2VcIixcbiAgICBsYWJlbDogXCJQcmljZVwiLFxuICAgIGZpZWxkOiBcInByaWNlXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImJlZ2lubmluZ3NcIixcbiAgICBsYWJlbDogXCJCZWdpbm5pbmdzIChQQ1MpXCIsXG4gICAgZmllbGQ6IFwiYmVnaW5uaW5nc1wiLFxuICAgIGZvcm1hdDogKHZhbCkgPT4gYCR7dmFsfWAsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIm5ld1Byb2R1Y3Rpb25cIixcbiAgICBsYWJlbDogXCJOZXcgUHJvZHVjdGlvbiAoUENTKVwiLFxuICAgIGZpZWxkOiBcIm5ld19wcm9kdWN0aW9uXCIsXG4gICAgZm9ybWF0OiAodmFsKSA9PiBgJHt2YWx9YCxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwicmVtYWluaW5nXCIsXG4gICAgbGFiZWw6IFwiUmVtYWluaW5nIChQQ1MpXCIsXG4gICAgZmllbGQ6IFwicmVtYWluaW5nXCIsXG4gICAgZm9ybWF0OiAodmFsKSA9PiBgJHt2YWx9YCxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYnJlYWRPdXRcIixcbiAgICBsYWJlbDogXCJCcmVhZCBPdXQgKFBDUylcIixcbiAgICBmaWVsZDogXCJicmVhZF9vdXRcIixcbiAgICBmb3JtYXQ6ICh2YWwpID0+IGAke3ZhbH1gLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJicmVhZFNvbGRcIixcbiAgICBsYWJlbDogXCJCcmVhZCBTb2xkIChQQ1MpXCIsXG4gICAgZmllbGQ6IFwiYnJlYWRfc29sZFwiLFxuICAgIGZvcm1hdDogKHZhbCkgPT4gYCR7dmFsfWAsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInRvdGFsXCIsXG4gICAgbGFiZWw6IFwiQnJlYWQgVG90YWwgKFBDUylcIixcbiAgICBmaWVsZDogXCJ0b3RhbFwiLFxuICAgIGZvcm1hdDogKHZhbCkgPT4gYCR7dmFsfWAsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInNhbGVzXCIsXG4gICAgbGFiZWw6IFwiVG90YWwgU2FsZXNcIixcbiAgICBmaWVsZDogXCJzYWxlc1wiLFxuICB9LFxuXTtcblxuY29uc3QgZm9ybWF0UHJpY2UgPSAocHJpY2UpID0+IHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChcImVuLVVTXCIsIHtcbiAgICBzdHlsZTogXCJjdXJyZW5jeVwiLFxuICAgIGN1cnJlbmN5OiBcIlBIUFwiLFxuICB9KS5mb3JtYXQocHJpY2UpO1xufTtcblxuLy8gUmVwbGFjZSB0aGlzIHdpdGggeW91ciBhY3R1YWwgZmlsdGVyZWQgcm93cyBsb2dpY1xuY29uc3QgZmlsdGVyZWRSb3dzID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zb2xlLmxvZyhcIkZpbHRlcmVkIHJvd3M6XCIsIHByb3BzLnJlcG9ydHMgfHwgW10pO1xuICByZXR1cm4gcHJvcHMucmVwb3J0cyB8fCBbXTtcbn0pO1xuXG4vLyBDYWxjdWxhdGUgdGhlIG92ZXJhbGwgdG90YWwgc2FsZXMgd2l0aCBudW1iZXIgY29udmVyc2lvblxuY29uc3Qgb3ZlcmFsbFRvdGFsID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCB0b3RhbCA9IGZpbHRlcmVkUm93cy52YWx1ZS5yZWR1Y2UoKHRvdGFsLCByb3cpID0+IHtcbiAgICBjb25zdCBzYWxlc0Ftb3VudCA9IHBhcnNlRmxvYXQocm93LnNhbGVzKSB8fCAwO1xuICAgIGNvbnNvbGUubG9nKGBBZGRpbmcgc2FsZXNBbW91bnQ6ICR7c2FsZXNBbW91bnR9IHRvIHRvdGFsOiAke3RvdGFsfWApO1xuICAgIHJldHVybiB0b3RhbCArIHNhbGVzQW1vdW50O1xuICB9LCAwKTtcbiAgY29uc29sZS5sb2coXCJPdmVyYWxsIFRvdGFsIFNhbGVzIGNvbXB1dGVkIGFzOlwiLCB0b3RhbCk7XG4gIHJldHVybiB0b3RhbDtcbn0pO1xuXG5jb25zb2xlLmxvZyhcIk92ZXJhbGwgVG90YWwgU2FsZXM6XCIsIG92ZXJhbGxUb3RhbC52YWx1ZSk7XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1kaWFsb2cgcmVmPVwiZGlhbG9nUmVmXCIgQGhpZGU9XCJvbkRpYWxvZ0hpZGVcIj5cbiAgICA8cS1jYXJkIHN0eWxlPVwid2lkdGg6IDg3MHB4OyBtYXgtd2lkdGg6IDgwdndcIj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNmNDQzMzZcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW4gdGV4dC13aGl0ZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+U2VsZWN0YSBSZXBvcnQ8L2Rpdj5cbiAgICAgICAgICA8cS1idG4gaWNvbj1cImNsb3NlXCIgZmxhdCBkZW5zZSByb3VuZCB2LWNsb3NlLXBvcHVwPlxuICAgICAgICAgICAgPHEtdG9vbHRpcCBjbGFzcz1cImJnLWJsdWUtZ3JleS02XCIgOmRlbGF5PVwiMjAwXCI+Q2xvc2U8L3EtdG9vbHRpcD5cbiAgICAgICAgICA8L3EtYnRuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxxLXRhYmxlXG4gICAgICAgICAgOmZpbHRlcj1cImZpbHRlclwiXG4gICAgICAgICAgOnZpcnR1YWwtc2Nyb2xsLXN0aWNreS1zaXplLXN0YXJ0PVwiNDhcIlxuICAgICAgICAgIGZsYXRcbiAgICAgICAgICA6Y29sdW1ucz1cImJyZWFkUmVwb3J0Q29sdW1uc1wiXG4gICAgICAgICAgOnJvd3M9XCJmaWx0ZXJlZFJvd3NcIlxuICAgICAgICAgIHJvdy1rZXk9XCJuYW1lXCJcbiAgICAgICAgICB2aXJ0dWFsLXNjcm9sbFxuICAgICAgICAgIHYtbW9kZWw6cGFnaW5hdGlvbj1cInBhZ2luYXRpb25cIlxuICAgICAgICAgIDpyb3dzLXBlci1wYWdlLW9wdGlvbnM9XCJbMF1cIlxuICAgICAgICAgIGhpZGUtYm90dG9tXG4gICAgICAgICAgc3R5bGU9XCJoZWlnaHQ6IDM1MHB4XCJcbiAgICAgICAgICBjbGFzcz1cInRhYmxlLWNvbnRhaW5lciBzdGlja3ktaGVhZGVyXCJcbiAgICAgICAgPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLW5hbWU9XCJwcm9wc1wiPlxuICAgICAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICAgICAgPHNwYW4+e3tcbiAgICAgICAgICAgICAgICBgJHtjYXBpdGFsaXplRmlyc3RMZXR0ZXIocHJvcHMucm93LnNlbGVjdGEubmFtZSl9YFxuICAgICAgICAgICAgICB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvcS10ZD5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLXByaWNlPVwicHJvcHNcIj5cbiAgICAgICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgICAgIDxzcGFuPnt7IGAke2Zvcm1hdFByaWNlKHByb3BzLnJvdy5wcmljZSl9YCB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvcS10ZD5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLXNhbGVzPVwicHJvcHNcIj5cbiAgICAgICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgICAgIDxzcGFuPnt7IGAke2Zvcm1hdFByaWNlKHByb3BzLnJvdy5zYWxlcyl9YCB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvcS10ZD5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3EtdGFibGU+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktZW5kIHEtbXQtbWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPlxuICAgICAgICAgICAgT3ZlcmFsbCBUb3RhbCBTYWxlczoge3sgZm9ybWF0UHJpY2Uob3ZlcmFsbFRvdGFsIHx8IFwiMFwiKSB9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgdXNlRGlhbG9nUGx1Z2luQ29tcG9uZW50IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IHsgZGlhbG9nUmVmLCBvbkRpYWxvZ0hpZGUsIG9uRGlhbG9nT0ssIG9uRGlhbG9nQ2FuY2VsIH0gPVxuICB1c2VEaWFsb2dQbHVnaW5Db21wb25lbnQoKTtcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyhbXCJyZXBvcnRzXCJdKTtcblxuLy8gTG9nIHRvIHZlcmlmeSB0aGUgc3RydWN0dXJlIG9mIHByb3BzLnJlcG9ydHNcbmNvbnNvbGUubG9nKFwiUmVwb3J0cyBkYXRhIHN0cnVjdHVyZTpcIiwgcHJvcHMucmVwb3J0cyk7XG5cbmNvbnN0IGNhcGl0YWxpemVGaXJzdExldHRlciA9IChsb2NhdGlvbikgPT4ge1xuICBpZiAoIWxvY2F0aW9uKSByZXR1cm4gXCJcIjtcbiAgcmV0dXJuIGxvY2F0aW9uXG4gICAgLnNwbGl0KFwiIFwiKVxuICAgIC5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkpXG4gICAgLmpvaW4oXCIgXCIpO1xufTtcblxuY29uc3QgYnJlYWRSZXBvcnRDb2x1bW5zID0gW1xuICB7XG4gICAgbmFtZTogXCJuYW1lXCIsXG4gICAgbGFiZWw6IFwiU2VsZWN0YSBOYW1lXCIsXG4gICAgZmllbGQ6IChyb3cpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiUm93IGRhdGE6XCIsIHJvdyk7IC8vIERlYnVnIGVhY2ggcm93J3MgZGF0YVxuICAgICAgcmV0dXJuIHJvdy5zZWxlY3RhLm5hbWUgfHwgXCJOL0FcIjsgLy8gQWRqdXN0IHRoaXMgYWNjb3JkaW5nIHRvIHlvdXIgZGF0YVxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInByaWNlXCIsXG4gICAgbGFiZWw6IFwiUHJpY2VcIixcbiAgICBmaWVsZDogXCJwcmljZVwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJiZWdpbm5pbmdzXCIsXG4gICAgbGFiZWw6IFwiQmVnaW5uaW5ncyAoUENTKVwiLFxuICAgIGZpZWxkOiBcImJlZ2lubmluZ3NcIixcbiAgICBmb3JtYXQ6ICh2YWwpID0+IGAke3ZhbH1gLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJyZW1haW5pbmdcIixcbiAgICBsYWJlbDogXCJSZW1haW5pbmcgKFBDUylcIixcbiAgICBmaWVsZDogXCJyZW1haW5pbmdcIixcbiAgICBmb3JtYXQ6ICh2YWwpID0+IGAke3ZhbH1gLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJvdXRcIixcbiAgICBsYWJlbDogXCJTZWxlY3RhIE91dCAoUENTKVwiLFxuICAgIGZpZWxkOiBcIm91dFwiLFxuICAgIGZvcm1hdDogKHZhbCkgPT4gYCR7dmFsfWAsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInNvbGRcIixcbiAgICBsYWJlbDogXCJTZWxlY3RhIFNvbGQgKFBDUylcIixcbiAgICBmaWVsZDogXCJzb2xkXCIsXG4gICAgZm9ybWF0OiAodmFsKSA9PiBgJHt2YWx9YCxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwic2FsZXNcIixcbiAgICBsYWJlbDogXCJUb3RhbCBTYWxlc1wiLFxuICAgIGZpZWxkOiBcInNhbGVzXCIsXG4gIH0sXG5dO1xuXG5jb25zdCBmb3JtYXRQcmljZSA9IChwcmljZSkgPT4ge1xuICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KFwiZW4tVVNcIiwge1xuICAgIHN0eWxlOiBcImN1cnJlbmN5XCIsXG4gICAgY3VycmVuY3k6IFwiUEhQXCIsXG4gIH0pLmZvcm1hdChwcmljZSk7XG59O1xuLy8gUmVwbGFjZSB0aGlzIHdpdGggeW91ciBhY3R1YWwgZmlsdGVyZWQgcm93cyBsb2dpY1xuY29uc3QgZmlsdGVyZWRSb3dzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAvLyBBc3N1bWluZyBgYnJlYWRzYCBpcyBhbiBhcnJheSBpbiBgcmVwb3J0c2BcbiAgY29uc29sZS5sb2coXCJGaWx0ZXJlZCByb3dzOlwiLCBwcm9wcy5yZXBvcnRzIHx8IFtdKTtcbiAgcmV0dXJuIHByb3BzLnJlcG9ydHMgfHwgW107XG59KTtcblxuY29uc3Qgb3ZlcmFsbFRvdGFsID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCB0b3RhbCA9IGZpbHRlcmVkUm93cy52YWx1ZS5yZWR1Y2UoKHRvdGFsLCByb3cpID0+IHtcbiAgICBjb25zdCBzYWxlc0Ftb3VudCA9IHBhcnNlRmxvYXQocm93LnNhbGVzKSB8fCAwO1xuICAgIGNvbnNvbGUubG9nKGBBZGRpbmcgc2FsZXNBbW91bnQ6ICR7c2FsZXNBbW91bnR9IHRvIHRvdGFsOiAke3RvdGFsfWApO1xuICAgIHJldHVybiB0b3RhbCArIHNhbGVzQW1vdW50O1xuICB9LCAwKTtcbiAgY29uc29sZS5sb2coXCJPdmVyYWxsIFRvdGFsIFNhbGVzIGNvbXB1dGVkIGFzOlwiLCB0b3RhbCk7XG4gIHJldHVybiB0b3RhbDtcbn0pO1xuXG5jb25zb2xlLmxvZyhcIkZpbHRlcmVkIFJvd3M6XCIsIGZpbHRlcmVkUm93cy52YWx1ZSk7XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWRpYWxvZyByZWY9XCJkaWFsb2dSZWZcIiBAaGlkZT1cIm9uRGlhbG9nSGlkZVwiPlxuICAgIDxxLWNhcmQgc3R5bGU9XCJ3aWR0aDogODcwcHg7IG1heC13aWR0aDogODB2d1wiPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzljMjdiMFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5Tb2Z0ZHJpbmtzIFJlcG9ydDwvZGl2PlxuICAgICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IGRlbnNlIHJvdW5kIHYtY2xvc2UtcG9wdXA+XG4gICAgICAgICAgICA8cS10b29sdGlwIGNsYXNzPVwiYmctYmx1ZS1ncmV5LTZcIiA6ZGVsYXk9XCIyMDBcIj5DbG9zZTwvcS10b29sdGlwPlxuICAgICAgICAgIDwvcS1idG4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtdGFibGVcbiAgICAgICAgICA6ZmlsdGVyPVwiZmlsdGVyXCJcbiAgICAgICAgICA6dmlydHVhbC1zY3JvbGwtc3RpY2t5LXNpemUtc3RhcnQ9XCI0OFwiXG4gICAgICAgICAgZmxhdFxuICAgICAgICAgIDpjb2x1bW5zPVwiYnJlYWRSZXBvcnRDb2x1bW5zXCJcbiAgICAgICAgICA6cm93cz1cImZpbHRlcmVkUm93c1wiXG4gICAgICAgICAgcm93LWtleT1cIm5hbWVcIlxuICAgICAgICAgIHZpcnR1YWwtc2Nyb2xsXG4gICAgICAgICAgdi1tb2RlbDpwYWdpbmF0aW9uPVwicGFnaW5hdGlvblwiXG4gICAgICAgICAgOnJvd3MtcGVyLXBhZ2Utb3B0aW9ucz1cIlswXVwiXG4gICAgICAgICAgaGlkZS1ib3R0b21cbiAgICAgICAgICBzdHlsZT1cImhlaWdodDogMzUwcHhcIlxuICAgICAgICAgIGNsYXNzPVwidGFibGUtY29udGFpbmVyIHN0aWNreS1oZWFkZXJcIlxuICAgICAgICA+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtbmFtZT1cInByb3BzXCI+XG4gICAgICAgICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgICAgICA8c3Bhbj57e1xuICAgICAgICAgICAgICAgIGAke2NhcGl0YWxpemVGaXJzdExldHRlcihwcm9wcy5yb3cuc29mdGRyaW5rcy5uYW1lKX1gXG4gICAgICAgICAgICAgIH19PC9zcGFuPlxuICAgICAgICAgICAgPC9xLXRkPlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtcHJpY2U9XCJwcm9wc1wiPlxuICAgICAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICAgICAgPHNwYW4+e3sgYCR7Zm9ybWF0UHJpY2UocHJvcHMucm93LnByaWNlKX1gIH19PC9zcGFuPlxuICAgICAgICAgICAgPC9xLXRkPlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtc2FsZXM9XCJwcm9wc1wiPlxuICAgICAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICAgICAgPHNwYW4+e3sgYCR7Zm9ybWF0UHJpY2UocHJvcHMucm93LnNhbGVzKX1gIH19PC9zcGFuPlxuICAgICAgICAgICAgPC9xLXRkPlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDwvcS10YWJsZT5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1lbmQgcS1tdC1tZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+XG4gICAgICAgICAgICBPdmVyYWxsIFRvdGFsIFNhbGVzOiB7eyBmb3JtYXRQcmljZShvdmVyYWxsVG90YWwgfHwgXCIwXCIpIH19XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VEaWFsb2dQbHVnaW5Db21wb25lbnQgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgeyBkaWFsb2dSZWYsIG9uRGlhbG9nSGlkZSwgb25EaWFsb2dPSywgb25EaWFsb2dDYW5jZWwgfSA9XG4gIHVzZURpYWxvZ1BsdWdpbkNvbXBvbmVudCgpO1xuXG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzKFtcInJlcG9ydHNcIl0pO1xuXG4vLyBMb2cgdG8gdmVyaWZ5IHRoZSBzdHJ1Y3R1cmUgb2YgcHJvcHMucmVwb3J0c1xuY29uc29sZS5sb2coXCJSZXBvcnRzIGRhdGEgc3RydWN0dXJlOlwiLCBwcm9wcy5yZXBvcnRzKTtcblxuY29uc3QgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyID0gKGxvY2F0aW9uKSA9PiB7XG4gIGlmICghbG9jYXRpb24pIHJldHVybiBcIlwiO1xuICByZXR1cm4gbG9jYXRpb25cbiAgICAuc3BsaXQoXCIgXCIpXG4gICAgLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSlcbiAgICAuam9pbihcIiBcIik7XG59O1xuXG5jb25zdCBicmVhZFJlcG9ydENvbHVtbnMgPSBbXG4gIHtcbiAgICBuYW1lOiBcIm5hbWVcIixcbiAgICBsYWJlbDogXCJTb2Z0ZHJpbmtzIE5hbWVcIixcbiAgICBmaWVsZDogKHJvdykgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJSb3cgZGF0YTpcIiwgcm93KTsgLy8gRGVidWcgZWFjaCByb3cncyBkYXRhXG4gICAgICByZXR1cm4gcm93LnNvZnRkcmlua3MubmFtZSB8fCBcIk4vQVwiOyAvLyBBZGp1c3QgdGhpcyBhY2NvcmRpbmcgdG8geW91ciBkYXRhXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwicHJpY2VcIixcbiAgICBsYWJlbDogXCJQcmljZVwiLFxuICAgIGZpZWxkOiBcInByaWNlXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImJlZ2lubmluZ3NcIixcbiAgICBsYWJlbDogXCJCZWdpbm5pbmdzIChQQ1MpXCIsXG4gICAgZmllbGQ6IFwiYmVnaW5uaW5nc1wiLFxuICAgIGZvcm1hdDogKHZhbCkgPT4gYCR7dmFsfWAsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInJlbWFpbmluZ1wiLFxuICAgIGxhYmVsOiBcIlJlbWFpbmluZyAoUENTKVwiLFxuICAgIGZpZWxkOiBcInJlbWFpbmluZ1wiLFxuICAgIGZvcm1hdDogKHZhbCkgPT4gYCR7dmFsfWAsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIm91dFwiLFxuICAgIGxhYmVsOiBcIlNvZnRkcmlua3MgT3V0IChQQ1MpXCIsXG4gICAgZmllbGQ6IFwib3V0XCIsXG4gICAgZm9ybWF0OiAodmFsKSA9PiBgJHt2YWx9YCxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwic29sZFwiLFxuICAgIGxhYmVsOiBcIlNvZnRkcmlua3MgU29sZCAoUENTKVwiLFxuICAgIGZpZWxkOiBcInNvbGRcIixcbiAgICBmb3JtYXQ6ICh2YWwpID0+IGAke3ZhbH1gLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJzYWxlc1wiLFxuICAgIGxhYmVsOiBcIlRvdGFsIFNhbGVzXCIsXG4gICAgZmllbGQ6IFwic2FsZXNcIixcbiAgfSxcbl07XG5cbmNvbnN0IGZvcm1hdFByaWNlID0gKHByaWNlKSA9PiB7XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoXCJlbi1VU1wiLCB7XG4gICAgc3R5bGU6IFwiY3VycmVuY3lcIixcbiAgICBjdXJyZW5jeTogXCJQSFBcIixcbiAgfSkuZm9ybWF0KHByaWNlKTtcbn07XG4vLyBSZXBsYWNlIHRoaXMgd2l0aCB5b3VyIGFjdHVhbCBmaWx0ZXJlZCByb3dzIGxvZ2ljXG5jb25zdCBmaWx0ZXJlZFJvd3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gIC8vIEFzc3VtaW5nIGBicmVhZHNgIGlzIGFuIGFycmF5IGluIGByZXBvcnRzYFxuICBjb25zb2xlLmxvZyhcIkZpbHRlcmVkIHJvd3M6XCIsIHByb3BzLnJlcG9ydHMgfHwgW10pO1xuICByZXR1cm4gcHJvcHMucmVwb3J0cyB8fCBbXTtcbn0pO1xuXG5jb25zdCBvdmVyYWxsVG90YWwgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHRvdGFsID0gZmlsdGVyZWRSb3dzLnZhbHVlLnJlZHVjZSgodG90YWwsIHJvdykgPT4ge1xuICAgIGNvbnN0IHNhbGVzQW1vdW50ID0gcGFyc2VGbG9hdChyb3cuc2FsZXMpIHx8IDA7XG4gICAgY29uc29sZS5sb2coYEFkZGluZyBzYWxlc0Ftb3VudDogJHtzYWxlc0Ftb3VudH0gdG8gdG90YWw6ICR7dG90YWx9YCk7XG4gICAgcmV0dXJuIHRvdGFsICsgc2FsZXNBbW91bnQ7XG4gIH0sIDApO1xuICBjb25zb2xlLmxvZyhcIk92ZXJhbGwgVG90YWwgU2FsZXMgY29tcHV0ZWQgYXM6XCIsIHRvdGFsKTtcbiAgcmV0dXJuIHRvdGFsO1xufSk7XG5cbmNvbnNvbGUubG9nKFwiRmlsdGVyZWQgUm93czpcIiwgZmlsdGVyZWRSb3dzLnZhbHVlKTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+PC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8cS1jYXJkIGNsYXNzPVwidXNlci1jYXJkXCI+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCIgYWxpZ249XCJjZW50ZXJcIj5Qcm9kdWN0cyBSZXBvcnQ8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci1tZFwiIGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICBAY2xpY2s9XCJoYW5kbGVCcmVhZERpYWxvZyhwcm9wcy5zYWxlc19SZXBvcnRzWzBdLmJyZWFkX3JlcG9ydHMpXCJcbiAgICAgICAgICAgIG5vLWNhcHNcbiAgICAgICAgICAgIGxhYmVsPVwiQnJlYWQgUmVwb3J0XCJcbiAgICAgICAgICAgIHJvdW5kZWRcbiAgICAgICAgICAgIGNvbG9yPVwiYnJvd25cIlxuICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTUwcHhcIlxuICAgICAgICAgICAgY2xhc3M9XCJ1c2VyLWJ1dHRvblwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgIEBjbGljaz1cImhhbmRsZVNlbGVjdGFEaWFsb2cocHJvZHVjdHNSZXBvcnRbMF0uc2VsZWN0YV9yZXBvcnRzKVwiXG4gICAgICAgICAgICBuby1jYXBzXG4gICAgICAgICAgICBsYWJlbD1cIlNlbGVjdGEgUmVwb3J0XCJcbiAgICAgICAgICAgIHJvdW5kZWRcbiAgICAgICAgICAgIGNvbG9yPVwicmVkLTZcIlxuICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTUwcHhcIlxuICAgICAgICAgICAgY2xhc3M9XCJ1c2VyLWJ1dHRvblwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgIEBjbGljaz1cIlxuICAgICAgICAgICAgICBoYW5kbGVTb2Z0ZHJpbmtzRGlhbG9nKHByb2R1Y3RzUmVwb3J0WzBdLnNvZnRkcmlua3NfcmVwb3J0cylcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgICBuby1jYXBzXG4gICAgICAgICAgICBsYWJlbD1cIlNvZnRkcmlua3MgUmVwb3J0XCJcbiAgICAgICAgICAgIHJvdW5kZWRcbiAgICAgICAgICAgIGNvbG9yPVwiYWNjZW50XCJcbiAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDE1MHB4XCJcbiAgICAgICAgICAgIGNsYXNzPVwidXNlci1idXR0b25cIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LXJlZ3VsYXIgdGV4dC1zdWJ0aXRsZTFcIj5cbiAgICAgICAgICBUb3RhbCBzYWxlczpcbiAgICAgICAgICB7eyBmb3JtYXRQcmljZShwcm9kdWN0c1JlcG9ydFswXS5wcm9kdWN0c190b3RhbF9zYWxlcykgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDwvcS1jYXJkPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VRdWFzYXIgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgUHJvZHVjdHNSZXBvcnREaWFsb2cgZnJvbSBcIi4vcHJvZHVjdHMvUHJvZHVjdHNSZXBvcnREaWFsb2cudnVlXCI7XG5pbXBvcnQgQnJlYWRSZXBvcnQgZnJvbSBcIi4vcHJvZHVjdHMvQnJlYWRSZXBvcnQudnVlXCI7XG5pbXBvcnQgU2VsZWN0YVJlcG9ydCBmcm9tIFwiLi9wcm9kdWN0cy9TZWxlY3RhUmVwb3J0LnZ1ZVwiO1xuaW1wb3J0IFNvZnRkcmlua3NSZXBvcnQgZnJvbSBcIi4vcHJvZHVjdHMvU29mdGRyaW5rc1JlcG9ydC52dWVcIjtcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyhbXCJzYWxlc19SZXBvcnRzXCJdKTtcbmNvbnN0IHByb2R1Y3RzUmVwb3J0ID0gcHJvcHMuc2FsZXNfUmVwb3J0cztcbmNvbnNvbGUubG9nKFwic2FsZXMgcmVwb3J0MlwiLCBwcm9wcyk7XG5jb25zdCAkcSA9IHVzZVF1YXNhcigpO1xuXG5jb25zdCBmb3JtYXRQcmljZSA9IChwcmljZSkgPT4ge1xuICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KFwiZW4tVVNcIiwge1xuICAgIHN0eWxlOiBcImN1cnJlbmN5XCIsXG4gICAgY3VycmVuY3k6IFwiUEhQXCIsXG4gIH0pLmZvcm1hdChwcmljZSk7XG59O1xuXG5jb25zdCBoYW5kbGVCcmVhZERpYWxvZyA9IChkYXRhUmVwb3J0cykgPT4ge1xuICAkcS5kaWFsb2coe1xuICAgIGNvbXBvbmVudDogQnJlYWRSZXBvcnQsXG4gICAgY29tcG9uZW50UHJvcHM6IHtcbiAgICAgIHJlcG9ydHM6IGRhdGFSZXBvcnRzLFxuICAgIH0sXG4gIH0pO1xufTtcbmNvbnN0IGhhbmRsZVNlbGVjdGFEaWFsb2cgPSAoZGF0YVJlcG9ydHMpID0+IHtcbiAgJHEuZGlhbG9nKHtcbiAgICBjb21wb25lbnQ6IFNlbGVjdGFSZXBvcnQsXG4gICAgY29tcG9uZW50UHJvcHM6IHtcbiAgICAgIHJlcG9ydHM6IGRhdGFSZXBvcnRzLFxuICAgIH0sXG4gIH0pO1xufTtcbmNvbnN0IGhhbmRsZVNvZnRkcmlua3NEaWFsb2cgPSAoZGF0YVJlcG9ydHMpID0+IHtcbiAgJHEuZGlhbG9nKHtcbiAgICBjb21wb25lbnQ6IFNvZnRkcmlua3NSZXBvcnQsXG4gICAgY29tcG9uZW50UHJvcHM6IHtcbiAgICAgIHJlcG9ydHM6IGRhdGFSZXBvcnRzLFxuICAgIH0sXG4gIH0pO1xufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XG4udXNlci1jYXJkIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMzMztcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XG59XG5cbi51c2VyLWJ1dHRvbiB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xufVxuXG4udXNlci1idXR0b246aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTVweCk7XG4gIGJveC1zaGFkb3c6IDBweCA2cHggMTVweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtZGlhbG9nIHJlZj1cImRpYWxvZ1JlZlwiIEBoaWRlPVwib25EaWFsb2dIaWRlXCI+XG4gICAgPHEtY2FyZCBzdHlsZT1cIndpZHRoOiA4NzBweDsgbWF4LXdpZHRoOiA4MHZ3XCI+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjMDNhOWY0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPkRlbm9taW5hdGlvbiBSZXBvcnQ8L2Rpdj5cbiAgICAgICAgICA8cS1idG4gaWNvbj1cImNsb3NlXCIgZmxhdCBkZW5zZSByb3VuZCB2LWNsb3NlLXBvcHVwPlxuICAgICAgICAgICAgPHEtdG9vbHRpcCBjbGFzcz1cImJnLWJsdWUtZ3JleS02XCIgOmRlbGF5PVwiMjAwXCI+Q2xvc2U8L3EtdG9vbHRpcD5cbiAgICAgICAgICA8L3EtYnRuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgdGV4dC13ZWlnaHQtcmVndWxhciB0ZXh0LXN1YnRpdGxlMVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNlwiPlxuICAgICAgICAgICAgPGRpdj4xMDAwIEJpbGxzOiB7eyBkZW5vbWluYXRpb25SZXBvcnRzLm9uZVRob3VzYW5kQmlsbHMgfX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+NTAwIEJpbGxzOiB7eyBkZW5vbWluYXRpb25SZXBvcnRzLmZpdmVIdW5kcmVkQmlsbHMgfX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+MjAwIEJpbGxzOiB7eyBkZW5vbWluYXRpb25SZXBvcnRzLnR3b0h1bmRyZWRCaWxscyB9fTwvZGl2PlxuICAgICAgICAgICAgPGRpdj4xMDAgQmlsbHM6IHt7IGRlbm9taW5hdGlvblJlcG9ydHMub25lSHVuZHJlZEJpbGxzIH19PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PjUwIEJpbGxzOiB7eyBkZW5vbWluYXRpb25SZXBvcnRzLmZpZnR5QmlsbHMgfX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+MjAgQmlsbHM6IHt7IGRlbm9taW5hdGlvblJlcG9ydHMudHdlbnR5QmlsbHMgfX08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTZcIj5cbiAgICAgICAgICAgIDxkaXY+MjAgY29pbnM6IHt7IGRlbm9taW5hdGlvblJlcG9ydHMudHdlbnR5Q29pbnMgfX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+MTAgY29pbnM6IHt7IGRlbm9taW5hdGlvblJlcG9ydHMudGVuQ29pbnMgfX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+NSBjb2luczoge3sgZGVub21pbmF0aW9uUmVwb3J0cy5maXZlQ29pbnMgfX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+MSBjb2luczoge3sgZGVub21pbmF0aW9uUmVwb3J0cy5vbmVDb2lucyB9fTwvZGl2PlxuICAgICAgICAgICAgPGRpdj4yNSBjZW50czoge3sgZGVub21pbmF0aW9uUmVwb3J0cy50d2VudHlGaXZlQ2VudHMgfX08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS0ge3sgcmVwb3J0cyB9fSAtLT5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1lbmQgcS1tdC1tZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+XG4gICAgICAgICAgICBPdmVyYWxsIFRvdGFsIERlbm9taW5hdGlvbjoge3sgZm9ybWF0UHJpY2UodG90YWwgfHwgXCIwXCIpIH19XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VEaWFsb2dQbHVnaW5Db21wb25lbnQgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgeyBkaWFsb2dSZWYsIG9uRGlhbG9nSGlkZSwgb25EaWFsb2dPSywgb25EaWFsb2dDYW5jZWwgfSA9XG4gIHVzZURpYWxvZ1BsdWdpbkNvbXBvbmVudCgpO1xuXG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzKHtcbiAgcmVwb3J0czogQXJyYXksXG4gIHRvdGFsOiBOdW1iZXIsXG59KTtcbmNvbnNvbGUubG9nKFwiRGVub21pbmF0aW9uIFByb3BzXCIsIHByb3BzLnJlcG9ydHMpO1xuY29uc3QgZGVub21pbmF0aW9uUmVwb3J0cyA9IHByb3BzLnJlcG9ydHNbMF07XG5cbi8vIExvZyB0byB2ZXJpZnkgdGhlIHN0cnVjdHVyZSBvZiBwcm9wcy5yZXBvcnRzXG5jb25zb2xlLmxvZyhcIlJlcG9ydHMgZGF0YSBzdHJ1Y3R1cmU6XCIsIHByb3BzLnJlcG9ydHMpO1xuXG5jb25zdCBmb3JtYXRQcmljZSA9IChwcmljZSkgPT4ge1xuICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KFwiZW4tVVNcIiwge1xuICAgIHN0eWxlOiBcImN1cnJlbmN5XCIsXG4gICAgY3VycmVuY3k6IFwiUEhQXCIsXG4gIH0pLmZvcm1hdChwcmljZSk7XG59O1xuXG4vLyBSZXBsYWNlIHRoaXMgd2l0aCB5b3VyIGFjdHVhbCBmaWx0ZXJlZCByb3dzIGxvZ2ljXG5jb25zdCBmaWx0ZXJlZFJvd3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gIC8vIEFzc3VtaW5nIGBicmVhZHNgIGlzIGFuIGFycmF5IGluIGByZXBvcnRzYFxuICBjb25zb2xlLmxvZyhcIkZpbHRlcmVkIHJvd3M6XCIsIHByb3BzLnJlcG9ydHMgfHwgW10pO1xuICByZXR1cm4gcHJvcHMucmVwb3J0cyB8fCBbXTtcbn0pO1xuXG5jb25zb2xlLmxvZyhcIkZpbHRlcmVkIFJvd3M6XCIsIGZpbHRlcmVkUm93cy52YWx1ZSk7XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxxLWNhcmQgY2xhc3M9XCJ1c2VyLWNhcmRcIj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIiBhbGlnbj1cImNlbnRlclwiPkRlbm9taW5hdGlvbiBSZXBvcnQ8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci14LW1kXCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgIGxhYmVsPVwiT1BFTlwiXG4gICAgICAgICAgICByb3VuZGVkXG4gICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAyMDBweFwiXG4gICAgICAgICAgICBjb2xvcj1cImxpZ2h0LWJsdWUtNlwiXG4gICAgICAgICAgICBAY2xpY2s9XCJcbiAgICAgICAgICAgICAgaGFuZGxlRGVub21pbmF0aW9uRGlhbG9nKFxuICAgICAgICAgICAgICAgIHByb3BzLnNhbGVzX1JlcG9ydHNbMF0uZGVub21pbmF0aW9uX3JlcG9ydHMsXG4gICAgICAgICAgICAgICAgcHJvcHMuc2FsZXNfUmVwb3J0c1swXS5kZW5vbWluYXRpb25fdG90YWxcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgIGNsYXNzPVwidXNlci1idXR0b25cIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LXJlZ3VsYXIgdGV4dC1zdWJ0aXRsZTFcIj5cbiAgICAgICAgICBUb3RhbCBEZW5vbWluYXRpb24gOlxuICAgICAgICAgIHt7IGZvcm1hdFByaWNlKHByb3BzLnNhbGVzX1JlcG9ydHNbMF0uZGVub21pbmF0aW9uX3RvdGFsKSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPC9xLWNhcmQ+XG5cbiAgICA8cS1kaWFsb2cgdi1tb2RlbD1cImRpYWxvZ1wiPlxuICAgICAgPHEtY2FyZD4gVGhpcyBpcyBkaWFsb2cgPC9xLWNhcmQ+XG4gICAgPC9xLWRpYWxvZz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgdXNlUXVhc2FyIH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgcmVmIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IERlbm9taW5hdGlvbkRpYWxvZ1JlcG9ydCBmcm9tIFwiLi9EZW5vbWluYXRpb25EaWFsb2dSZXBvcnQudnVlXCI7XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHMoW1wic2FsZXNfUmVwb3J0c1wiXSk7XG5jb25zdCBwcm9kdWN0c1JlcG9ydCA9IHByb3BzLnNhbGVzX1JlcG9ydHM7XG5jb25zb2xlLmxvZyhcIkRlbm9taW5hdGlvbiByZXBvcnRcIiwgcHJvcHMpO1xuY29uc3QgJHEgPSB1c2VRdWFzYXIoKTtcblxuY29uc3QgZm9ybWF0UHJpY2UgPSAocHJpY2UpID0+IHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChcImVuLVVTXCIsIHtcbiAgICBzdHlsZTogXCJjdXJyZW5jeVwiLFxuICAgIGN1cnJlbmN5OiBcIlBIUFwiLFxuICB9KS5mb3JtYXQocHJpY2UpO1xufTtcblxuY29uc3QgaGFuZGxlRGVub21pbmF0aW9uRGlhbG9nID0gKGRhdGFSZXBvcnRzLCB0b3RhbCkgPT4ge1xuICAkcS5kaWFsb2coe1xuICAgIGNvbXBvbmVudDogRGVub21pbmF0aW9uRGlhbG9nUmVwb3J0LFxuICAgIGNvbXBvbmVudFByb3BzOiB7XG4gICAgICByZXBvcnRzOiBkYXRhUmVwb3J0cyxcbiAgICAgIHRvdGFsOiB0b3RhbCxcbiAgICB9LFxuICB9KTtcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuLnVzZXItY2FyZCB7XG4gIGhlaWdodDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICMzMzM7XG4gIGJveC1zaGFkb3c6IDBweCA0cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xufVxuXG4udXNlci1idXR0b24ge1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcbn1cblxuLnVzZXItYnV0dG9uOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01cHgpO1xuICBib3gtc2hhZG93OiAwcHggNnB4IDE1cHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWRpYWxvZ1xuICAgIHJlZj1cImRpYWxvZ1JlZlwiXG4gICAgQGhpZGU9XCJvbkRpYWxvZ0hpZGVcIlxuICAgIEBvaz1cImhhbmRsZUJ1dHRvbkNsaWNrXCJcbiAgICBAY2FuY2VsPVwib25EaWFsb2dDYW5jZWxcIlxuICA+XG4gICAgPHEtY2FyZCBzdHlsZT1cIndpZHRoOiA4NzBweDsgbWF4LXdpZHRoOiA4MHZ3XCI+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjMDNhOWY0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPkV4cGVuc2VzIFJlcG9ydDwvZGl2PlxuICAgICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IGRlbnNlIHJvdW5kIHYtY2xvc2UtcG9wdXA+XG4gICAgICAgICAgICA8cS10b29sdGlwIGNsYXNzPVwiYmctYmx1ZS1ncmV5LTZcIiA6ZGVsYXk9XCIyMDBcIj5DbG9zZTwvcS10b29sdGlwPlxuICAgICAgICAgIDwvcS1idG4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtdGFibGVcbiAgICAgICAgICA6ZmlsdGVyPVwiZmlsdGVyXCJcbiAgICAgICAgICA6dmlydHVhbC1zY3JvbGwtc3RpY2t5LXNpemUtc3RhcnQ9XCI0OFwiXG4gICAgICAgICAgZmxhdFxuICAgICAgICAgIDpjb2x1bW5zPVwiZXhwZW5zZXNSZXBvcnRDb2x1bW5cIlxuICAgICAgICAgIDpyb3dzPVwiZmlsdGVyZWRSb3dzXCJcbiAgICAgICAgICByb3cta2V5PVwibmFtZVwiXG4gICAgICAgICAgdmlydHVhbC1zY3JvbGxcbiAgICAgICAgICB2LW1vZGVsOnBhZ2luYXRpb249XCJwYWdpbmF0aW9uXCJcbiAgICAgICAgICA6cm93cy1wZXItcGFnZS1vcHRpb25zPVwiWzBdXCJcbiAgICAgICAgICBoaWRlLWJvdHRvbVxuICAgICAgICAgIHN0eWxlPVwiaGVpZ2h0OiAzNTBweFwiXG4gICAgICAgICAgY2xhc3M9XCJ0YWJsZS1jb250YWluZXIgc3RpY2t5LWhlYWRlclwiXG4gICAgICAgID5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC1uYW1lPVwicHJvcHNcIj5cbiAgICAgICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgICAgIDxzcGFuPnt7IGAke2NhcGl0YWxpemVGaXJzdExldHRlcihwcm9wcy5yb3cubmFtZSl9YCB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvcS10ZD5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLWFtb3VudD1cInByb3BzXCI+XG4gICAgICAgICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgICAgICA8c3Bhbj57eyBgJHtmb3JtYXRQcmljZShwcm9wcy5yb3cuYW1vdW50KX1gIH19PC9zcGFuPlxuICAgICAgICAgICAgPC9xLXRkPlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDwvcS10YWJsZT5cblxuICAgICAgICA8IS0tIDxkaXYgdi1mb3I9XCIoZXhwZW5zZXMsIGluZGV4KSBpbiBleHBlbnNlc1JlcG9ydHNcIiA6a2V5PVwiaW5kZXhcIj5cbiAgICAgICAgICA8ZGl2Pk5hbWU6IHt7IGV4cGVuc2VzLm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgRGVzY3JpcHRpb246XG4gICAgICAgICAgICB7eyBleHBlbnNlcy5kZXNjcmlwdGlvbiB9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+QW1vdW50OiB7eyBleHBlbnNlcy5hbW91bnQgfX08L2Rpdj5cbiAgICAgICAgPC9kaXY+IC0tPlxuXG4gICAgICAgIDwhLS0ge3sgcmVwb3J0cyB9fSAtLT5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1lbmQgcS1tdC1tZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+XG4gICAgICAgICAgICBPdmVyYWxsIFRvdGFsIEV4cGVuc2VzOiB7eyBmb3JtYXRQcmljZSh0b3RhbCB8fCBcIjBcIikgfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZURpYWxvZ1BsdWdpbkNvbXBvbmVudCB9IGZyb20gXCJxdWFzYXJcIjtcbmltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSBcInZ1ZVwiO1xuXG5jb25zdCB7IGRpYWxvZ1JlZiwgb25EaWFsb2dIaWRlLCBvbkRpYWxvZ09LLCBvbkRpYWxvZ0NhbmNlbCB9ID1cbiAgdXNlRGlhbG9nUGx1Z2luQ29tcG9uZW50KCk7XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHMoe1xuICByZXBvcnRzOiBBcnJheSxcbiAgdG90YWw6IE51bWJlcixcbn0pO1xuLy8gZGVmaW5lRW1pdHMoXCJoaWRlXCIsIFwib2tcIiwgXCJjYW5jZWxcIik7XG5cbmNvbnN0IGV4cGVuc2VzUmVwb3J0cyA9IHByb3BzLnJlcG9ydHM7XG5jb25zb2xlLmxvZyhcIkV4cGVuc2VzIHRvdGFsXCIsIHByb3BzLnRvdGFsKTtcblxuY29uc3QgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyID0gKGxvY2F0aW9uKSA9PiB7XG4gIGlmICghbG9jYXRpb24pIHJldHVybiBcIlwiO1xuICByZXR1cm4gbG9jYXRpb25cbiAgICAuc3BsaXQoXCIgXCIpXG4gICAgLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSlcbiAgICAuam9pbihcIiBcIik7XG59O1xuXG5jb25zdCBleHBlbnNlc1JlcG9ydENvbHVtbiA9IFtcbiAge1xuICAgIG5hbWU6IFwibmFtZVwiLFxuICAgIGxhYmVsOiBcIkV4cGVuc2VzIE5hbWVcIixcbiAgICBmaWVsZDogKHJvdykgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJSb3cgZGF0YTpcIiwgcm93KTsgLy8gRGVidWcgZWFjaCByb3cncyBkYXRhXG4gICAgICByZXR1cm4gcm93Lm5hbWUgfHwgXCJOL0FcIjsgLy8gQWRqdXN0IHRoaXMgYWNjb3JkaW5nIHRvIHlvdXIgZGF0YVxuICAgIH0sXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImRlc2NyaXB0aW9uXCIsXG4gICAgbGFiZWw6IFwiRGVzY3JpcHRpb25cIixcbiAgICBmaWVsZDogXCJkZXNjcmlwdGlvblwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJhbW91bnRcIixcbiAgICBsYWJlbDogXCJBbW91bnRcIixcbiAgICBmaWVsZDogXCJhbW91bnRcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgfSxcbl07XG5cbi8vIExvZyB0byB2ZXJpZnkgdGhlIHN0cnVjdHVyZSBvZiBwcm9wcy5yZXBvcnRzXG5jb25zb2xlLmxvZyhcIlJlcG9ydHMgZGF0YSBzdHJ1Y3R1cmU6XCIsIHByb3BzLnJlcG9ydHMpO1xuXG5jb25zdCBmb3JtYXRQcmljZSA9IChwcmljZSkgPT4ge1xuICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KFwiZW4tVVNcIiwge1xuICAgIHN0eWxlOiBcImN1cnJlbmN5XCIsXG4gICAgY3VycmVuY3k6IFwiUEhQXCIsXG4gIH0pLmZvcm1hdChwcmljZSk7XG59O1xuLy8gUmVwbGFjZSB0aGlzIHdpdGggeW91ciBhY3R1YWwgZmlsdGVyZWQgcm93cyBsb2dpY1xuY29uc3QgZmlsdGVyZWRSb3dzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAvLyBBc3N1bWluZyBgYnJlYWRzYCBpcyBhbiBhcnJheSBpbiBgcmVwb3J0c2BcbiAgY29uc29sZS5sb2coXCJGaWx0ZXJlZCByb3dzOlwiLCBwcm9wcy5yZXBvcnRzIHx8IFtdKTtcbiAgcmV0dXJuIHByb3BzLnJlcG9ydHMgfHwgW107XG59KTtcblxuY29uc29sZS5sb2coXCJFeHBlbnNlczpcIiwgZmlsdGVyZWRSb3dzLnZhbHVlKTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPHEtY2FyZCBjbGFzcz1cInVzZXItY2FyZFwiPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiIGFsaWduPVwiY2VudGVyXCI+RXhwZW5zZXMgUmVwb3J0PC9kaXY+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXIteC1tZFwiIGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICBsYWJlbD1cIk9QRU5cIlxuICAgICAgICAgICAgcm91bmRlZFxuICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMjAwcHhcIlxuICAgICAgICAgICAgY29sb3I9XCJsaWdodC1ibHVlLTZcIlxuICAgICAgICAgICAgY2xhc3M9XCJ1c2VyLWJ1dHRvblwiXG4gICAgICAgICAgICBAY2xpY2s9XCJcbiAgICAgICAgICAgICAgaGFuZGxlRXhwZW5zZXNEaWFsb2coXG4gICAgICAgICAgICAgICAgcHJvcHMuc2FsZXNfUmVwb3J0c1swXS5leHBlbnNlc19yZXBvcnRzLFxuICAgICAgICAgICAgICAgIHByb3BzLnNhbGVzX1JlcG9ydHNbMF0uZXhwZW5zZXNfdG90YWxcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1yZWd1bGFyIHRleHQtc3VidGl0bGUxXCI+XG4gICAgICAgICAgVG90YWwgRXhwZW5zZXMgOlxuICAgICAgICAgIHt7IGZvcm1hdFByaWNlKHByb3BzLnNhbGVzX1JlcG9ydHNbMF0uZXhwZW5zZXNfdG90YWwpIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8L3EtY2FyZD5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgdXNlUXVhc2FyIH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IEV4cGVuc2VzRGlhbG9nIGZyb20gXCIuL0V4cGVuc2VzRGlhbG9nLnZ1ZVwiO1xuXG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzKFtcInNhbGVzX1JlcG9ydHNcIl0pO1xuXG5jb25zb2xlLmxvZyhcIkV4cGVuc2VzIERhdGFcIiwgcHJvcHMuc2FsZXNfUmVwb3J0c1swXS5leHBlbnNlc19yZXBvcnRzKTtcblxuY29uc3QgJHEgPSB1c2VRdWFzYXIoKTtcbmNvbnN0IGZvcm1hdFByaWNlID0gKHByaWNlKSA9PiB7XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoXCJlbi1VU1wiLCB7XG4gICAgc3R5bGU6IFwiY3VycmVuY3lcIixcbiAgICBjdXJyZW5jeTogXCJQSFBcIixcbiAgfSkuZm9ybWF0KHByaWNlKTtcbn07XG5cbmNvbnN0IGhhbmRsZUV4cGVuc2VzRGlhbG9nID0gKGRhdGFSZXBvcnRzLCB0b3RhbCkgPT4ge1xuICAkcS5kaWFsb2coe1xuICAgIGNvbXBvbmVudDogRXhwZW5zZXNEaWFsb2csXG4gICAgY29tcG9uZW50UHJvcHM6IHtcbiAgICAgIHJlcG9ydHM6IGRhdGFSZXBvcnRzLFxuICAgICAgdG90YWw6IHRvdGFsLFxuICAgIH0sXG4gIH0pO1xufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XG4udXNlci1jYXJkIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMzMztcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XG59XG5cbi51c2VyLWJ1dHRvbiB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xufVxuXG4udXNlci1idXR0b246aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTVweCk7XG4gIGJveC1zaGFkb3c6IDBweCA2cHggMTVweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtZGlhbG9nXG4gICAgcmVmPVwiZGlhbG9nUmVmXCJcbiAgICBAaGlkZT1cIm9uRGlhbG9nSGlkZVwiXG4gICAgQG9rPVwiaGFuZGxlQnV0dG9uQ2xpY2tcIlxuICAgIEBjYW5jZWw9XCJvbkRpYWxvZ0NhbmNlbFwiXG4gID5cbiAgICA8cS1jYXJkIHN0eWxlPVwid2lkdGg6IDg3MHB4OyBtYXgtd2lkdGg6IDgwdndcIj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICMwM2E5ZjRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW4gdGV4dC13aGl0ZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+Q3JlZGl0cyBSZXBvcnQ8L2Rpdj5cbiAgICAgICAgICA8cS1idG4gaWNvbj1cImNsb3NlXCIgZmxhdCBkZW5zZSByb3VuZCB2LWNsb3NlLXBvcHVwPlxuICAgICAgICAgICAgPHEtdG9vbHRpcCBjbGFzcz1cImJnLWJsdWUtZ3JleS02XCIgOmRlbGF5PVwiMjAwXCI+Q2xvc2U8L3EtdG9vbHRpcD5cbiAgICAgICAgICA8L3EtYnRuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxxLXRhYmxlXG4gICAgICAgICAgOmZpbHRlcj1cImZpbHRlclwiXG4gICAgICAgICAgOnZpcnR1YWwtc2Nyb2xsLXN0aWNreS1zaXplLXN0YXJ0PVwiNDhcIlxuICAgICAgICAgIGZsYXRcbiAgICAgICAgICA6Y29sdW1ucz1cImNyZWRpdFByb2R1Y3RzQ29sdW1uXCJcbiAgICAgICAgICA6cm93cz1cImZpbHRlcmVkUm93c1wiXG4gICAgICAgICAgcm93LWtleT1cIm5hbWVcIlxuICAgICAgICAgIHZpcnR1YWwtc2Nyb2xsXG4gICAgICAgICAgdi1tb2RlbDpwYWdpbmF0aW9uPVwicGFnaW5hdGlvblwiXG4gICAgICAgICAgOnJvd3MtcGVyLXBhZ2Utb3B0aW9ucz1cIlswXVwiXG4gICAgICAgICAgaGlkZS1ib3R0b21cbiAgICAgICAgICBzdHlsZT1cImhlaWdodDogMzUwcHhcIlxuICAgICAgICAgIGNsYXNzPVwidGFibGUtY29udGFpbmVyIHN0aWNreS1oZWFkZXJcIlxuICAgICAgICA+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtcHJvZHVjdE5hbWU9XCJwcm9wc1wiPlxuICAgICAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICAgICAgPHNwYW4+e3tcbiAgICAgICAgICAgICAgICBgJHtjYXBpdGFsaXplRmlyc3RMZXR0ZXIocHJvcHMucm93LnByb2R1Y3QubmFtZSl9YFxuICAgICAgICAgICAgICB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvcS10ZD5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLXByaWNlPVwicHJvcHNcIj5cbiAgICAgICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgICAgIDxzcGFuPnt7IGAke2Zvcm1hdFByaWNlKHByb3BzLnJvdy5wcmljZSl9YCB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvcS10ZD5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLXRvdGFsX2Ftb3VudD1cInByb3BzXCI+XG4gICAgICAgICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgICAgICA8c3Bhbj57eyBgJHtmb3JtYXRBbW91bnQocHJvcHMucm93LnRvdGFsX2Ftb3VudCl9YCB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvcS10ZD5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3EtdGFibGU+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktZW5kIHEtbXQtbWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPlxuICAgICAgICAgICAgT3ZlcmFsbCBDcmVkaXRzIFRvdGFsOiB7eyBmb3JtYXRQcmljZSh0b3RhbCB8fCBcIjBcIikgfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZURpYWxvZ1BsdWdpbkNvbXBvbmVudCB9IGZyb20gXCJxdWFzYXJcIjtcbmltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSBcInZ1ZVwiO1xuXG5jb25zdCB7IGRpYWxvZ1JlZiwgb25EaWFsb2dIaWRlLCBvbkRpYWxvZ09LLCBvbkRpYWxvZ0NhbmNlbCB9ID1cbiAgdXNlRGlhbG9nUGx1Z2luQ29tcG9uZW50KCk7XG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzKHtcbiAgcmVwb3J0czogQXJyYXksXG4gIHRvdGFsOiBOdW1iZXIsXG59KTtcblxuY29uc3QgY3JlZGl0UmVwb3J0cyA9IHByb3BzLnJlcG9ydHM7XG5jb25zb2xlLmxvZyhcImNyZWRpdFJlcG9ydHMgZGF0YVwiLCBjcmVkaXRSZXBvcnRzKTtcblxuY3JlZGl0UmVwb3J0cy5mb3JFYWNoKChyZXBvcnQsIGluZGV4KSA9PiB7XG4gIGNvbnNvbGUubG9nKGBSZXBvcnQgJHtpbmRleH06YCwgcmVwb3J0KTtcbiAgY29uc29sZS5sb2coXG4gICAgYENyZWRpdCBQcm9kdWN0cyBmb3IgUmVwb3J0ICR7aW5kZXh9OmAsXG4gICAgcmVwb3J0LmNyZWRpdF9wcm9kdWN0cy50b3RhbF9hbW91bnRcbiAgKTtcbn0pO1xuXG5jb25zdCBmaWx0ZXJlZFJvd3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiBjcmVkaXRSZXBvcnRzLmZsYXRNYXAoKHJlcG9ydCkgPT4ge1xuICAgIHJldHVybiByZXBvcnQuY3JlZGl0X3Byb2R1Y3RzLm1hcCgocHJvZHVjdCkgPT4ge1xuICAgICAgLy8gUGFyc2UgcGllY2VzIGFuZCBwcmljZSwgY2FsY3VsYXRlIHRvdGFsX2Ftb3VudFxuICAgICAgY29uc3QgcGllY2VzID0gcGFyc2VJbnQocHJvZHVjdC5waWVjZXMsIDEwKSB8fCAwO1xuICAgICAgY29uc3QgcHJpY2UgPSBwYXJzZUZsb2F0KHByb2R1Y3QucHJpY2UpIHx8IDA7XG4gICAgICBjb25zdCB0b3RhbEFtb3VudCA9IHBpZWNlcyAqIHByaWNlO1xuXG4gICAgICAvLyBSZXR1cm4gcHJvZHVjdCB3aXRoIGNhbGN1bGF0ZWQgdG90YWxfYW1vdW50IGFkZGVkXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5wcm9kdWN0LFxuICAgICAgICB0b3RhbF9hbW91bnQ6IHRvdGFsQW1vdW50LFxuICAgICAgfTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbmNvbnNvbGUubG9nKFwiQWxsIENyZWRpdCBQcm9kdWN0czpcIiwgZmlsdGVyZWRSb3dzLnZhbHVlWzBdKTtcblxuY29uc3QgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyID0gKGxvY2F0aW9uKSA9PiB7XG4gIGlmICghbG9jYXRpb24pIHJldHVybiBcIlwiO1xuICByZXR1cm4gbG9jYXRpb25cbiAgICAuc3BsaXQoXCIgXCIpXG4gICAgLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSlcbiAgICAuam9pbihcIiBcIik7XG59O1xuXG5jb25zdCBmb3JtYXRGdWxsbmFtZSA9IChyb3cpID0+IHtcbiAgY29uc3QgY2FwaXRhbGl6ZSA9IChzdHIpID0+XG4gICAgc3RyID8gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkgOiBcIlwiO1xuICBjb25zdCBmaXJzdG5hbWUgPSByb3cuZmlyc3RuYW1lID8gY2FwaXRhbGl6ZShyb3cuZmlyc3RuYW1lKSA6IFwiTm8gRmlyc3RuYW1lXCI7XG4gIGNvbnN0IG1pZGRsZW5hbWUgPSByb3cubWlkZGxlbmFtZVxuICAgID8gY2FwaXRhbGl6ZShyb3cubWlkZGxlbmFtZSkuY2hhckF0KDApICsgXCIuXCJcbiAgICA6IFwiXCI7XG4gIGNvbnN0IGxhc3RuYW1lID0gcm93Lmxhc3RuYW1lID8gY2FwaXRhbGl6ZShyb3cubGFzdG5hbWUpIDogXCJObyBMYXN0bmFtZVwiO1xuXG4gIHJldHVybiBgJHtmaXJzdG5hbWV9ICR7bWlkZGxlbmFtZX0gJHtsYXN0bmFtZX1gLnRyaW0oKTtcbn07XG5cbmNvbnN0IGNyZWRpdFByb2R1Y3RzQ29sdW1uID0gW1xuICB7XG4gICAgbmFtZTogXCJuYW1lXCIsXG4gICAgbGFiZWw6IFwiRW1wbG95ZWUgTmFtZVwiLFxuICAgIGZpZWxkOiAocm93KSA9PiBmb3JtYXRGdWxsbmFtZShyb3cuY3JlZGl0X3VzZXJfaWQpLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJwcm9kdWN0TmFtZVwiLFxuICAgIGxhYmVsOiBcIlByb2R1Y3QgTmFtZVwiLFxuICAgIGZpZWxkOiAocm93KSA9PiB7XG4gICAgICByZXR1cm4gcm93LnByb2R1Y3QubmFtZSB8fCBcIk4vQVwiO1xuICAgIH0sXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInBpZWNlc1wiLFxuICAgIGxhYmVsOiBcIlBpZWNlc1wiLFxuICAgIGZpZWxkOiBcInBpZWNlc1wiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJwcmljZVwiLFxuICAgIGxhYmVsOiBcIlByaWNlXCIsXG4gICAgZmllbGQ6IFwicHJpY2VcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwidG90YWxfYW1vdW50XCIsXG4gICAgbGFiZWw6IFwiVG90YWwgQW1vdW50XCIsXG4gICAgZmllbGQ6IFwidG90YWxfYW1vdW50XCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gIH0sXG5dO1xuXG4vLyBMb2cgdG8gdmVyaWZ5IHRoZSBzdHJ1Y3R1cmUgb2YgcHJvcHMucmVwb3J0c1xuY29uc29sZS5sb2coXCJSZXBvcnRzIGRhdGEgc3RydWN0dXJlOlwiLCBwcm9wcy5yZXBvcnRzKTtcblxuY29uc3QgZm9ybWF0UHJpY2UgPSAocHJpY2UpID0+IHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChcImVuLVVTXCIsIHtcbiAgICBzdHlsZTogXCJjdXJyZW5jeVwiLFxuICAgIGN1cnJlbmN5OiBcIlBIUFwiLFxuICB9KS5mb3JtYXQocHJpY2UpO1xufTtcbmNvbnN0IGZvcm1hdEFtb3VudCA9ICh0b3RhbF9hbW91bnQpID0+IHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChcImVuLVVTXCIsIHtcbiAgICBzdHlsZTogXCJjdXJyZW5jeVwiLFxuICAgIGN1cnJlbmN5OiBcIlBIUFwiLFxuICB9KS5mb3JtYXQodG90YWxfYW1vdW50KTtcbn07XG5cbi8vIGNvbnNvbGUubG9nKFwiRXhwZW5zZXM6XCIsIGZpbHRlcmVkUm93cy52YWx1ZSk7XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPHEtY2FyZCBjbGFzcz1cInVzZXItY2FyZFwiPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiIGFsaWduPVwiY2VudGVyXCI+Q3JlZGl0cyBSZXBvcnQ8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci14LW1kXCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgIGxhYmVsPVwiT1BFTlwiXG4gICAgICAgICAgICByb3VuZGVkXG4gICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAyMDBweFwiXG4gICAgICAgICAgICBjb2xvcj1cImxpZ2h0LWJsdWUtNlwiXG4gICAgICAgICAgICBjbGFzcz1cInVzZXItYnV0dG9uXCJcbiAgICAgICAgICAgIEBjbGljaz1cIlxuICAgICAgICAgICAgICBoYW5kbGVDcmVkaXRzRGlhbG9nKFxuICAgICAgICAgICAgICAgIHByb3BzLnNhbGVzX1JlcG9ydHNbMF0uY3JlZGl0X3JlcG9ydHMsXG4gICAgICAgICAgICAgICAgcHJvcHMuc2FsZXNfUmVwb3J0c1swXS5jcmVkaXRfdG90YWxcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1yZWd1bGFyIHRleHQtc3VidGl0bGUxXCI+XG4gICAgICAgICAgVG90YWwgQ3JlZGl0cyA6XG4gICAgICAgICAge3sgZm9ybWF0UHJpY2UocHJvcHMuc2FsZXNfUmVwb3J0c1swXS5jcmVkaXRfdG90YWwpIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPCEtLSB7eyBzYWxlc19SZXBvcnRzWzBdLmNyZWRpdF9yZXBvcnRzIH19IC0tPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8L3EtY2FyZD5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgdXNlUXVhc2FyIH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IENyZWRpdHNSZXBvcnREaWFsb2cgZnJvbSBcIi4vQ3JlZGl0c1JlcG9ydERpYWxvZy52dWVcIjtcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyhbXCJzYWxlc19SZXBvcnRzXCJdKTtcbmNvbnN0ICRxID0gdXNlUXVhc2FyKCk7XG5jb25zdCBmb3JtYXRQcmljZSA9IChwcmljZSkgPT4ge1xuICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KFwiZW4tVVNcIiwge1xuICAgIHN0eWxlOiBcImN1cnJlbmN5XCIsXG4gICAgY3VycmVuY3k6IFwiUEhQXCIsXG4gIH0pLmZvcm1hdChwcmljZSk7XG59O1xuXG5jb25zdCBoYW5kbGVDcmVkaXRzRGlhbG9nID0gKGRhdGFSZXBvcnRzLCB0b3RhbCkgPT4ge1xuICAkcS5kaWFsb2coe1xuICAgIGNvbXBvbmVudDogQ3JlZGl0c1JlcG9ydERpYWxvZyxcbiAgICBjb21wb25lbnRQcm9wczoge1xuICAgICAgcmVwb3J0czogZGF0YVJlcG9ydHMsXG4gICAgICB0b3RhbDogdG90YWwsXG4gICAgfSxcbiAgfSk7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi51c2VyLWNhcmQge1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGNvbG9yOiAjMzMzO1xuICBib3gtc2hhZG93OiAwcHggNHB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcbn1cblxuLnVzZXItYnV0dG9uIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XG59XG5cbi51c2VyLWJ1dHRvbjpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KTtcbiAgYm94LXNoYWRvdzogMHB4IDZweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1jYXJkIGNsYXNzPVwibXktY2FyZCBxLXBhLW1kXCI+XG4gICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbGcgcm93IGl0ZW1zLXN0YXJ0IHEtZ3V0dGVyLW1kIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgIDxkaXYgdi1mb3I9XCIocmVwb3J0LCBpbmRleCkgaW4gcmVwb3J0c0RhdGFcIiA6a2V5PVwiaW5kZXhcIj5cbiAgICAgICAgICA8cS1jYXJkIGZsYXQgZGVuc2UgYm9yZGVyZWQ+XG4gICAgICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5TYWxlcyBSZXBvcnQ8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nPVwieHMgbWRcIlxuICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIlByaW50XCJcbiAgICAgICAgICAgICAgICAgICAgaWNvbj1cInByaW50XCJcbiAgICAgICAgICAgICAgICAgICAgb3V0bGluZVxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInVzZXItYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwib3BlblByaW50RGlhbG9nKHJlcG9ydClcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxxLXRvb2x0aXAgY2xhc3M9XCJiZy1ibHVlLWdyZXktNlwiIDpkZWxheT1cIjIwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIFByaW50IFJlcG9ydFxuICAgICAgICAgICAgICAgICAgICA8L3EtdG9vbHRpcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUxIHRleHQtd2VpZ2h0LXJlZ3VsYXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2Pk5hbWU6IHt7IGZvcm1hdEZ1bGxuYW1lKHJlcG9ydC51c2VyLmVtcGxveWVlKSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+RGF0ZToge3sgZm9ybWF0RGF0ZShyZXBvcnQuY3JlYXRlZF9hdCkgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlRpbWU6IHt7IGZvcm1hdFRpbWVGcm9tREIocmVwb3J0LmNyZWF0ZWRfYXQpIH19PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXItc20gcS1wYS1tZFwiPlxuICAgICAgICAgICAgICA8UHJvZHVjdHNSZXBvcnQgOnNhbGVzX1JlcG9ydHM9XCJbcmVwb3J0XVwiIC8+XG4gICAgICAgICAgICAgIDxEZW5vbWluYXRpb25SZXBvcnQgOnNhbGVzX1JlcG9ydHM9XCJbcmVwb3J0XVwiIC8+XG4gICAgICAgICAgICAgIDxFeHBlbnNlc1JlcG9ydCA6c2FsZXNfUmVwb3J0cz1cIltyZXBvcnRdXCIgLz5cbiAgICAgICAgICAgICAgPENyZWRpdHNSZXBvcnQgOnNhbGVzX1JlcG9ydHM9XCJbcmVwb3J0XVwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICA8L3EtY2FyZD5cblxuICA8cS1kaWFsb2dcbiAgICB2LW1vZGVsPVwicHJpbnREaWFsb2dcIlxuICAgIDpiYWNrZHJvcC1maWx0ZXI9XCJiYWNrZHJvcEZpbHRlclwiXG4gICAgOm1heGltaXplZD1cIm1heGltaXplZFRvZ2dsZVwiXG4gICAgdHJhbnNpdGlvbi1zaG93PVwic2xpZGUtdXBcIlxuICAgIHRyYW5zaXRpb24taGlkZT1cInNsaWRlLWRvd25cIlxuICA+XG4gICAgPGRpdiBjbGFzcz1cInEtbWEtc21cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJxLW1hLXNtXCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgZGVuc2Ugcm91bmQgdi1jbG9zZS1wb3B1cCBjbGFzcz1cInRleHQtd2hpdGVcIj5cbiAgICAgICAgICA8cS10b29sdGlwPkNsb3NlPC9xLXRvb2x0aXA+XG4gICAgICAgIDwvcS1idG4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxpZnJhbWUgOnNyYz1cInBkZlVybFwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjcwMHB4XCIgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGRhdGUsIHVzZVF1YXNhciB9IGZyb20gXCJxdWFzYXJcIjtcbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgUHJvZHVjdHNSZXBvcnQgZnJvbSBcIi4vc2FsZXMtcmVwb3J0L1Byb2R1Y3RzUmVwb3J0LnZ1ZVwiO1xuaW1wb3J0IERlbm9taW5hdGlvblJlcG9ydCBmcm9tIFwiLi9zYWxlcy1yZXBvcnQvRGVub21pbmF0aW9uUmVwb3J0LnZ1ZVwiO1xuaW1wb3J0IEV4cGVuc2VzUmVwb3J0IGZyb20gXCIuL3NhbGVzLXJlcG9ydC9FeHBlbnNlc1JlcG9ydC52dWVcIjtcbmltcG9ydCBDcmVkaXRzUmVwb3J0IGZyb20gXCIuL3NhbGVzLXJlcG9ydC9DcmVkaXRzUmVwb3J0LnZ1ZVwiO1xuaW1wb3J0ICogYXMgcGRmTWFrZSBmcm9tIFwicGRmbWFrZS9idWlsZC9wZGZtYWtlXCI7XG5pbXBvcnQgKiBhcyBwZGZGb250cyBmcm9tIFwicGRmbWFrZS9idWlsZC92ZnNfZm9udGVzXCI7XG5wZGZNYWtlLnZmcyA9IHBkZkZvbnRzLmRlZmF1bHQ7XG5cbi8vIHBkZk1ha2UuZm9udHMgPSB7XG4vLyAgIFJvYm90bzoge1xuLy8gICAgIG5vcm1hbDogXCJwYXRoL3RvL1JvYm90by1SZWd1bGFyLnR0ZlwiLFxuLy8gICAgIGJvbGQ6IFwicGF0aC90by9Sb2JvdG8tTWVkaXVtLnR0ZlwiLFxuLy8gICAgIGl0YWxpY3M6IFwicGF0aC90by9Sb2JvdG8tSXRhbGljLnR0ZlwiLFxuLy8gICAgIGJvbGRpdGFsaWNzOiBcInBhdGgvdG8vUm9ib3RvLU1lZGl1bUl0YWxpYy50dGZcIixcbi8vICAgfSxcbi8vIH07XG5cbmNvbnN0IHByaW50UGRmID0gKHJlcG9ydCkgPT4ge1xuICBjb25zdCBkb2NEZWZpbml0aW9uID0gZ2VuZXJhdGVEb2NEZWZpbml0aW9uKHJlcG9ydCk7XG5cbiAgLy8gT3BlbiB0aGUgZ2VuZXJhdGVkIFBERiBpbiBhIG5ldyB0YWIgb3IgZG93bmxvYWQgZGlyZWN0bHlcbiAgcGRmTWFrZS5jcmVhdGVQZGYoZG9jRGVmaW5pdGlvbikucHJpbnQoKTtcbn07XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHMoW1wic2FsZXNSZXBvcnRcIl0pO1xuY29uc3QgcmVwb3J0c0RhdGEgPSBwcm9wcy5zYWxlc1JlcG9ydDtcbmNvbnNvbGUubG9nKFwicmVwb3J0c0RhdGFcIiwgcHJvcHMuc2FsZXNSZXBvcnQpO1xuXG5jb25zdCBtYXhpbWl6ZWRUb2dnbGUgPSByZWYodHJ1ZSk7XG5jb25zdCBwcmludERpYWxvZyA9IHJlZihmYWxzZSk7XG5jb25zdCBwZGZVcmwgPSByZWYoXCJcIik7XG5cbmNvbnN0IGZvcm1hdERhdGUgPSAoZGF0ZVN0cmluZykgPT4ge1xuICByZXR1cm4gZGF0ZS5mb3JtYXREYXRlKGRhdGVTdHJpbmcsIFwiTU1NTSBERCwgWVlZWVwiKTtcbn07XG5cbmNvbnN0IGZvcm1hdFRpbWVGcm9tREIgPSAoZGF0ZVN0cmluZykgPT4ge1xuICBjb25zdCBkYXRlT2JqID0gbmV3IERhdGUoZGF0ZVN0cmluZyk7XG5cbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICBob3VyOiBcIjItZGlnaXRcIixcbiAgICBtaW51dGU6IFwiMi1kaWdpdFwiLFxuICAgIGhvdXIxMjogdHJ1ZSxcbiAgfTtcbiAgcmV0dXJuIGRhdGVPYmoudG9Mb2NhbGVUaW1lU3RyaW5nKHVuZGVmaW5lZCwgb3B0aW9ucyk7XG59O1xuY29uc3QgZm9ybWF0RnVsbG5hbWUgPSAocm93KSA9PiB7XG4gIGNvbnN0IGNhcGl0YWxpemUgPSAoc3RyKSA9PlxuICAgIHN0ciA/IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKS50b0xvd2VyQ2FzZSgpIDogXCJcIjtcbiAgY29uc3QgZmlyc3RuYW1lID0gcm93LmZpcnN0bmFtZSA/IGNhcGl0YWxpemUocm93LmZpcnN0bmFtZSkgOiBcIk5vIEZpcnN0bmFtZVwiO1xuICBjb25zdCBtaWRkbGVuYW1lID0gcm93Lm1pZGRsZW5hbWVcbiAgICA/IGNhcGl0YWxpemUocm93Lm1pZGRsZW5hbWUpLmNoYXJBdCgwKSArIFwiLlwiXG4gICAgOiBcIlwiO1xuICBjb25zdCBsYXN0bmFtZSA9IHJvdy5sYXN0bmFtZSA/IGNhcGl0YWxpemUocm93Lmxhc3RuYW1lKSA6IFwiTm8gTGFzdG5hbWVcIjtcblxuICByZXR1cm4gYCR7Zmlyc3RuYW1lfSAke21pZGRsZW5hbWV9ICR7bGFzdG5hbWV9YC50cmltKCk7XG59O1xuXG5jb25zdCBmb3JtYXRBbW91bnQgPSAocHJpY2UpID0+IHtcbiAgY29uc3QgZm9ybWF0dGVkQW1vdW50ID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KFwiZW4tVVNcIiwge1xuICAgIHN0eWxlOiBcImN1cnJlbmN5XCIsXG4gICAgY3VycmVuY3k6IFwiUEhQXCIsXG4gIH0pLmZvcm1hdChwcmljZSk7XG4gIHJldHVybiBmb3JtYXR0ZWRBbW91bnQucmVwbGFjZShcIuKCsVwiLCBcIuKCsVxcdFwiKTtcbn07XG5cbmNvbnN0IGNhcGl0YWxpemVGaXJzdExldHRlciA9IChzdHJpbmcpID0+IHtcbiAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKS50b0xvd2VyQ2FzZSgpO1xufTtcblxuY29uc3QgY2FwaXRhbGl6ZU5hbWUgPSAobmFtZSkgPT4ge1xuICBpZiAoIW5hbWUpIHJldHVybiBcIlwiO1xuICByZXR1cm4gbmFtZVxuICAgIC5zcGxpdChcIiBcIilcbiAgICAubWFwKCh3b3JkKSA9PiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpKVxuICAgIC5qb2luKFwiIFwiKTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlRG9jRGVmaW5pdGlvbiA9IChyZXBvcnQpID0+IHtcbiAgLy8gY29uc3QgZm9udEZhbWlseSA9IFwiUm9ib3RvXCI7XG4gIGNvbnN0IGFsbENyZWRpdFByb2R1Y3RzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIHJldHVybiByZXBvcnQuY3JlZGl0X3JlcG9ydHMuZmxhdE1hcCgocmVwb3J0KSA9PiByZXBvcnQuY3JlZGl0X3Byb2R1Y3RzKTtcbiAgfSk7XG4gIGNvbnNvbGUubG9nKFwiQWxsIENyZWRpdCBQcm9kdWN0czpcIiwgYWxsQ3JlZGl0UHJvZHVjdHMudmFsdWUpO1xuICBjb25zdCBwcm9kdWN0aW9uVHlwZXMgPSBbXG4gICAge1xuICAgICAgdGl0bGU6IFwiQnJlYWQgUHJvZHVjdGlvblwiLFxuICAgICAgZGF0YTogcmVwb3J0LmJyZWFkX3JlcG9ydHMgfHwgW10sXG4gICAgICBjb2x1bW5zOiBbXG4gICAgICAgIFwiYnJlYWQubmFtZVwiLFxuICAgICAgICBcImJlZ2lubmluZ3NcIixcbiAgICAgICAgXCJwcmljZVwiLFxuICAgICAgICBcIm5ld19wcm9kdWN0aW9uXCIsXG4gICAgICAgIFwiYnJlYWRfb3V0XCIsXG4gICAgICAgIFwiYnJlYWRfc29sZFwiLFxuICAgICAgICBcInRvdGFsXCIsXG4gICAgICAgIFwicmVtYWluaW5nXCIsXG4gICAgICAgIFwic2FsZXNcIixcbiAgICAgIF0sXG4gICAgICB0b3RhbHM6IFtcInNhbGVzXCJdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6IFwiU2VsZWN0YSBQcm9kdWN0aW9uXCIsXG4gICAgICBkYXRhOiByZXBvcnQuc2VsZWN0YV9yZXBvcnRzIHx8IFtdLFxuICAgICAgY29sdW1uczogW1xuICAgICAgICBcInNlbGVjdGEubmFtZVwiLFxuICAgICAgICBcImJlZ2lubmluZ3NcIixcbiAgICAgICAgXCJwcmljZVwiLFxuICAgICAgICBcIm91dFwiLFxuICAgICAgICBcInNvbGRcIixcbiAgICAgICAgXCJyZW1haW5pbmdcIixcbiAgICAgICAgXCJzYWxlc1wiLFxuICAgICAgXSxcbiAgICAgIHRvdGFsczogW1wic2FsZXNcIl0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogXCJTb2Z0ZHJpbmtzIFByb2R1Y3Rpb25cIixcbiAgICAgIGRhdGE6IHJlcG9ydC5zb2Z0ZHJpbmtzX3JlcG9ydHMgfHwgW10sXG4gICAgICBjb2x1bW5zOiBbXG4gICAgICAgIFwic29mdGRyaW5rcy5uYW1lXCIsXG4gICAgICAgIFwiYmVnaW5uaW5nc1wiLFxuICAgICAgICBcInByaWNlXCIsXG4gICAgICAgIFwiYWRkZWRfc3RvY2tzXCIsXG4gICAgICAgIFwib3V0XCIsXG4gICAgICAgIFwic29sZFwiLFxuICAgICAgICBcInJlbWFpbmluZ1wiLFxuICAgICAgICBcInNhbGVzXCIsXG4gICAgICBdLFxuICAgICAgdG90YWxzOiBbXCJzYWxlc1wiXSxcbiAgICB9LFxuICBdO1xuXG4gIGNvbnN0IGV4cGVuc2VzUmVwb3J0ID0gcmVwb3J0LmV4cGVuc2VzX3JlcG9ydHMgfHwgW107XG4gIGNvbnN0IGNyZWRpdFJlcG9ydCA9IGFsbENyZWRpdFByb2R1Y3RzLnZhbHVlIHx8IFtdO1xuICBjb25zdCBjcmVkaXRUb3RhbCA9IHJlcG9ydC5jcmVkaXRfdG90YWw7XG4gIGNvbnN0IGRlbm9taW5hdGlvbiA9IHJlcG9ydC5kZW5vbWluYXRpb25fcmVwb3J0c1swXSB8fCBbXTtcbiAgY29uc3QgZGVub21pbmF0aW9uVG90YWwgPSByZXBvcnQuZGVub21pbmF0aW9uX3RvdGFsO1xuICBjb25zdCBleHBlbnNlc1RvdGFsID0gcmVwb3J0LmV4cGVuc2VzX3RvdGFsO1xuICBjb25zdCB0b3RhbFByb2R1Y3RTYWxlcyA9IHJlcG9ydC5wcm9kdWN0c190b3RhbF9zYWxlcztcbiAgY29uc3QgY2hhcmdlc0Ftb3VudCA9IHJlcG9ydC5jaGFyZ2VzX2Ftb3VudDtcbiAgY29uc3Qgb3ZlckFtb3VudCA9IHJlcG9ydC5vdmVyX3RvdGFsO1xuXG4gIGNvbnN0IGRlbm9taW5hdGlvblJlcG9ydCA9IHtcbiAgICBiaWxsczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiBcIk9uZSBUaG91c2FuZFwiLFxuICAgICAgICBwY3M6IGRlbm9taW5hdGlvbi5vbmVUaG91c2FuZEJpbGxzIHx8IDAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiBcIkZpdmUgSHVuZHJlZFwiLFxuICAgICAgICBwY3M6IGRlbm9taW5hdGlvbi5maXZlSHVuZHJlZEJpbGxzIHx8IDAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiBcIlR3byBIdW5kcmVkXCIsXG4gICAgICAgIHBjczogZGVub21pbmF0aW9uLnR3b0h1bmRyZWRCaWxscyB8fCAwLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJPbmUgSHVuZHJlZFwiLFxuICAgICAgICBwY3M6IGRlbm9taW5hdGlvbi5vbmVIdW5kcmVkQmlsbHMgfHwgMCxcbiAgICAgIH0sXG4gICAgICB7IG5hbWU6IFwiRmlmdHlcIiwgcGNzOiBkZW5vbWluYXRpb24uZmlmdHlCaWxscyB8fCAwIH0sXG4gICAgICB7IG5hbWU6IFwiVHdlbnR5XCIsIHBjczogZGVub21pbmF0aW9uLnR3ZW50eUJpbGxzIHx8IDAgfSxcbiAgICBdLFxuICAgIGNvaW5zOiBbXG4gICAgICB7IG5hbWU6IFwiVHdlbnR5XCIsIHBjczogZGVub21pbmF0aW9uLnR3ZW50eUNvaW5zIHx8IDAgfSxcbiAgICAgIHsgbmFtZTogXCJUZW5cIiwgcGNzOiBkZW5vbWluYXRpb24udGVuQ29pbnMgfHwgMCB9LFxuICAgICAgeyBuYW1lOiBcIkZpdmVcIiwgcGNzOiBkZW5vbWluYXRpb24uZml2ZUNvaW5zIHx8IDAgfSxcbiAgICAgIHsgbmFtZTogXCJPbmVcIiwgcGNzOiBkZW5vbWluYXRpb24ub25lQ29pbnMgfHwgMCB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiBcIlR3ZW50eSBGaXZlIENlbnRzXCIsXG4gICAgICAgIHBjczogZGVub21pbmF0aW9uLnR3ZW50eUZpdmVDZW50cyB8fCAwLFxuICAgICAgfSxcbiAgICBdLFxuICB9O1xuICBjb25zdCBmb3JtYXRQcmljZSA9IChwcmljZSkgPT4gYOKCsSR7cHJpY2UudG9GaXhlZCgyKX1gO1xuXG4gIGNvbnN0IGdlbmVyYXRlVGFibGVCb2R5ID0gKGRhdGEsIGNvbHVtbnMsIHRvdGFscykgPT4ge1xuICAgIGNvbnN0IHRvdGFsUm93ID0gdG90YWxzLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICAgIGFjY1trZXldID0gZGF0YS5yZWR1Y2UoKHN1bSwgaXRlbSkgPT4gc3VtICsgKGl0ZW1ba2V5XSB8fCAwKSwgMCk7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcblxuICAgIHJldHVybiBbXG4gICAgICAuLi5kYXRhLm1hcCgoaXRlbSkgPT5cbiAgICAgICAgY29sdW1ucy5tYXAoKGNvbCkgPT4gKHtcbiAgICAgICAgICB0ZXh0OiBjb2wuaW5jbHVkZXMoXCIuXCIpXG4gICAgICAgICAgICA/IGl0ZW1bY29sLnNwbGl0KFwiLlwiKVswXV1bY29sLnNwbGl0KFwiLlwiKVsxXV1cbiAgICAgICAgICAgIDogaXRlbVtjb2xdLFxuICAgICAgICAgIHN0eWxlOiBcImJvZHlcIixcbiAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgIH0pKVxuICAgICAgKSxcbiAgICAgIFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiT3ZlcmFsbCBUb3RhbFwiLFxuICAgICAgICAgIGNvbFNwYW46IGNvbHVtbnMubGVuZ3RoIC0gdG90YWxzLmxlbmd0aCxcbiAgICAgICAgICBzdHlsZTogXCJ0YWJsZUhlYWRlclwiLFxuICAgICAgICAgIGFsaWdubWVudDogXCJyaWdodFwiLFxuICAgICAgICAgIGNvbG9yOiBcIiMwMjA2MTdcIixcbiAgICAgICAgfSxcbiAgICAgICAgLi4uQXJyYXkoY29sdW1ucy5sZW5ndGggLSB0b3RhbHMubGVuZ3RoIC0gMSkuZmlsbCh7fSksXG4gICAgICAgIC4uLnRvdGFscy5tYXAoKGtleSkgPT4gKHtcbiAgICAgICAgICB0ZXh0OiBrZXkgPT09IFwic2FsZXNcIiA/IGZvcm1hdEFtb3VudCh0b3RhbFJvd1trZXldKSA6IHRvdGFsUm93W2tleV0sXG4gICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbiAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgY29sb3I6IFwiIzAyMDYxN1wiLFxuICAgICAgICB9KSksXG4gICAgICBdLFxuICAgIF07XG4gIH07XG5cbiAgY29uc3QgY3JlZGl0UmVwb3J0VGFibGVCb2R5ID1cbiAgICBjcmVkaXRSZXBvcnQubGVuZ3RoID4gMFxuICAgICAgPyBjcmVkaXRSZXBvcnQubWFwKChjcmVkaXREYXRhKSA9PiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogZm9ybWF0RnVsbG5hbWUoY3JlZGl0RGF0YS5jcmVkaXRfdXNlcl9pZCksXG4gICAgICAgICAgICBzdHlsZTogXCJib2R5XCIsXG4gICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBjcmVkaXREYXRhLnByb2R1Y3QubmFtZSxcbiAgICAgICAgICAgIHN0eWxlOiBcImJvZHlcIixcbiAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IGNyZWRpdERhdGEucGllY2VzLFxuICAgICAgICAgICAgc3R5bGU6IFwiYm9keVwiLFxuICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogY3JlZGl0RGF0YS5wcmljZSxcbiAgICAgICAgICAgIHN0eWxlOiBcImJvZHlcIixcbiAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IGNyZWRpdERhdGEudG90YWxfYW1vdW50LFxuICAgICAgICAgICAgc3R5bGU6IFwiYm9keVwiLFxuICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0pXG4gICAgICA6IFtbeyB0ZXh0OiBcIk5vIGRhdGEgYXZhaWxhYmxlXCIsIGNvbFNwYW46IDUsIGFsaWdubWVudDogXCJjZW50ZXJcIiB9XV07XG4gIGNyZWRpdFJlcG9ydFRhYmxlQm9keS5wdXNoKFtcbiAgICB7XG4gICAgICB0ZXh0OiBcIlRvdGFsXCIsXG4gICAgICBzdHlsZTogXCJib2R5Qm9sZFwiLFxuICAgICAgYWxpZ25tZW50OiBcInJpZ2h0XCIsXG4gICAgICBjb2xTcGFuOiAzLFxuICAgIH0sXG4gICAge30sXG4gICAge30sXG4gICAge1xuICAgICAgdGV4dDogYCR7Zm9ybWF0QW1vdW50KGNyZWRpdFRvdGFsKX1gLFxuICAgICAgc3R5bGU6IFwiYm9keUJvbGRcIixcbiAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgIGNvbFNwYW46IDIsXG4gICAgfSxcbiAgICB7fSxcbiAgXSk7XG5cbiAgY29uc3QgZXhwZW5zZXNSZXBvcnRUYWJsZUJvZHkgPVxuICAgIGV4cGVuc2VzUmVwb3J0Lmxlbmd0aCA+IDBcbiAgICAgID8gZXhwZW5zZXNSZXBvcnQubWFwKChleHBlbnNlc0RhdGEpID0+IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBleHBlbnNlc0RhdGEubmFtZSxcbiAgICAgICAgICAgIHN0eWxlOiBcImJvZHlcIixcbiAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IGV4cGVuc2VzRGF0YS5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIHN0eWxlOiBcImJvZHlcIixcbiAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IGAke2Zvcm1hdEFtb3VudChleHBlbnNlc0RhdGEuYW1vdW50KX1gLFxuICAgICAgICAgICAgc3R5bGU6IFwiYm9keVwiLFxuICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0pXG4gICAgICA6IFtbeyB0ZXh0OiBcIk5vIGRhdGEgYXZhaWxhYmxlXCIsIGNvbFNwYW46IDMsIGFsaWdubWVudDogXCJjZW50ZXJcIiB9XV07XG5cbiAgZXhwZW5zZXNSZXBvcnRUYWJsZUJvZHkucHVzaChbXG4gICAge1xuICAgICAgdGV4dDogXCJUb3RhbFwiLFxuICAgICAgc3R5bGU6IFwiYm9keUJvbGRcIixcbiAgICAgIGFsaWdubWVudDogXCJyaWdodFwiLFxuICAgICAgY29sU3BhbjogMixcbiAgICAgIC8vIGNvbG9yOiBcIiMzYjA3NjRcIixcbiAgICB9LFxuICAgIHt9LFxuICAgIHtcbiAgICAgIHRleHQ6IGAke2Zvcm1hdEFtb3VudChleHBlbnNlc1RvdGFsKX1gLFxuICAgICAgc3R5bGU6IFwiYm9keUJvbGRcIixcbiAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgIC8vIGNvbG9yOiBcIiMzYjA3NjRcIixcbiAgICB9LCAvLyBBbGlnbiB0b3RhbCB0byB0aGUgcmlnaHRcbiAgXSk7XG5cbiAgY29uc3QgZGVub21pbmF0aW9uUmVwb3J0VGFibGVCb2R5ID0gZGVub21pbmF0aW9uUmVwb3J0LmJpbGxzLm1hcChcbiAgICAoYmlsbCwgaW5kZXgpID0+IFtcbiAgICAgIHsgdGV4dDogYmlsbC5uYW1lLCBzdHlsZTogXCJib2R5XCIsIGFsaWdubWVudDogXCJjZW50ZXJcIiB9LFxuICAgICAgeyB0ZXh0OiBiaWxsLnBjcywgc3R5bGU6IFwiYm9keVwiLCBhbGlnbm1lbnQ6IFwiY2VudGVyXCIgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogZGVub21pbmF0aW9uUmVwb3J0LmNvaW5zW2luZGV4XT8ubmFtZSB8fCBcIlwiLFxuICAgICAgICBzdHlsZTogXCJib2R5XCIsXG4gICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IGRlbm9taW5hdGlvblJlcG9ydC5jb2luc1tpbmRleF0/LnBjcyB8fCBcIjBcIiwgLy8gRGVmYXVsdCB0byBcIjBcIiBpZiBubyB2YWx1ZVxuICAgICAgICBzdHlsZTogXCJib2R5XCIsXG4gICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgIH0sXG4gICAgXVxuICApO1xuXG4gIGRlbm9taW5hdGlvblJlcG9ydFRhYmxlQm9keS5wdXNoKFtcbiAgICB7XG4gICAgICB0ZXh0OiBcIlRvdGFsXCIsXG4gICAgICBzdHlsZTogXCJib2R5Qm9sZFwiLFxuICAgICAgYWxpZ25tZW50OiBcInJpZ2h0XCIsXG4gICAgICBjb2xTcGFuOiAzLFxuICAgICAgY29sb3I6IFwiIzAyMDYxN1wiLFxuICAgIH0sXG4gICAge30sIC8vIEVtcHR5IGNlbGwgZHVlIHRvIGNvbFNwYW5cbiAgICB7fSxcbiAgICB7XG4gICAgICB0ZXh0OiBgJHtmb3JtYXRBbW91bnQoZGVub21pbmF0aW9uVG90YWwpfWAsXG4gICAgICBzdHlsZTogXCJib2R5Qm9sZFwiLFxuICAgICAgYWxpZ25tZW50OiBcInJpZ2h0XCIsXG4gICAgICBjb2xvcjogXCIjMDIwNjE3XCIsXG4gICAgfSwgLy8gQWxpZ24gdG90YWwgdG8gdGhlIHJpZ2h0XG4gIF0pO1xuXG4gIGNvbnN0IHRhYmxlcyA9IHByb2R1Y3Rpb25UeXBlcy5tYXAoKHsgdGl0bGUsIGRhdGEsIGNvbHVtbnMsIHRvdGFscyB9KSA9PiAoe1xuICAgIHN0YWNrOiBbXG4gICAgICB7IHRleHQ6IHRpdGxlLCBzdHlsZTogXCJzdWJoZWFkZXJcIiwgYWxpZ25tZW50OiBcImNlbnRlclwiIH0sXG4gICAgICB7XG4gICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgaGVhZGVyUm93czogMSxcbiAgICAgICAgICB3aWR0aHM6IEFycmF5KGNvbHVtbnMubGVuZ3RoKS5maWxsKFwiKlwiKSwgLy8gU2V0IGFsbCBjb2x1bW5zIHRvIHRha2UgZXF1YWwgc3BhY2VcbiAgICAgICAgICBib2R5OiBbXG4gICAgICAgICAgICBjb2x1bW5zLm1hcCgoY29sKSA9PiAoe1xuICAgICAgICAgICAgICB0ZXh0OiBjb2xcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCIuXCIpXG4gICAgICAgICAgICAgICAgLnBvcCgpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL18vZywgXCIgXCIpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcYlxcdy9nLCAobCkgPT4gbC50b1VwcGVyQ2FzZSgpKSxcbiAgICAgICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbiAgICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgLi4uZ2VuZXJhdGVUYWJsZUJvZHkoZGF0YSwgY29sdW1ucywgdG90YWxzKSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICBsYXlvdXQ6IHtcbiAgICAgICAgICBwYWRkaW5nTGVmdDogKCkgPT4gMixcbiAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICgpID0+IDIsXG4gICAgICAgICAgcGFkZGluZ1RvcDogKCkgPT4gMixcbiAgICAgICAgICBwYWRkaW5nQm90dG9tOiAoKSA9PiAyLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdLFxuICB9KSk7XG5cbiAgY29uc3Qgc3VtbWFyeVRhYmxlID0ge1xuICAgIHRhYmxlOiB7XG4gICAgICB3aWR0aHM6IFtcIjUwJVwiLCBcIjUwJVwiXSxcbiAgICAgIGJvZHk6IFtcbiAgICAgICAgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiVG90YWwgRGVub21pbmF0aW9uXCIsXG4gICAgICAgICAgICBzdHlsZTogXCJ0YWJsZUhlYWRlclwiLFxuICAgICAgICAgICAgYWxpZ25tZW50OiBcImxlZnRcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IGZvcm1hdEFtb3VudChkZW5vbWluYXRpb25Ub3RhbCksXG4gICAgICAgICAgICBzdHlsZTogXCJ0YWJsZURhdGFcIixcbiAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJUb3RhbCBQcm9kdWN0IFNhbGVzIEFtb3VudFwiLFxuICAgICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbiAgICAgICAgICAgIGFsaWdubWVudDogXCJsZWZ0XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBmb3JtYXRBbW91bnQocmVwb3J0LnByb2R1Y3RzX3RvdGFsX3NhbGVzKSxcbiAgICAgICAgICAgIHN0eWxlOiBcInRhYmxlRGF0YVwiLFxuICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICB7IHRleHQ6IFwiVG90YWwgRXhwZW5zZXNcIiwgc3R5bGU6IFwidGFibGVIZWFkZXJcIiwgYWxpZ25tZW50OiBcImxlZnRcIiB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IGZvcm1hdEFtb3VudChleHBlbnNlc1RvdGFsKSxcbiAgICAgICAgICAgIHN0eWxlOiBcInRhYmxlRGF0YVwiLFxuICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICB7IHRleHQ6IFwiT3ZlciBDYXNoXCIsIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsIGFsaWdubWVudDogXCJsZWZ0XCIgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBmb3JtYXRBbW91bnQocmVwb3J0Lm92ZXJfdG90YWwpLFxuICAgICAgICAgICAgc3R5bGU6IFwidGFibGVEYXRhXCIsXG4gICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgIHsgdGV4dDogXCJDaGFyZ2VzXCIsIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsIGFsaWdubWVudDogXCJsZWZ0XCIgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBgJHtmb3JtYXRBbW91bnQocmVwb3J0LmNoYXJnZXNfYW1vdW50KX1gLFxuICAgICAgICAgICAgc3R5bGU6IFwidGFibGVEYXRhXCIsXG4gICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgIHBhZGRpbmdMZWZ0OiAoKSA9PiAyLFxuICAgICAgcGFkZGluZ1JpZ2h0OiAoKSA9PiAyLFxuICAgICAgcGFkZGluZ1RvcDogKCkgPT4gMixcbiAgICAgIHBhZGRpbmdCb3R0b206ICgpID0+IDIsXG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGNvbnRlbnQ6IFtcbiAgICAgIHsgdGV4dDogXCJTYWxlcyBSZXBvcnRcIiwgc3R5bGU6IFwiaGVhZGVyXCIsIGFsaWdubWVudDogXCJjZW50ZXJcIiB9LFxuICAgICAge1xuICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogYEJyYW5jaCBOYW1lOiAke3JlcG9ydC5icmFuY2gubmFtZX1cbiAgICAgICAgICBDYXNoaWVyOiAke2Zvcm1hdEZ1bGxuYW1lKHJlcG9ydC51c2VyLmVtcGxveWVlKX1cbiAgICAgICAgICBEYXRlOiAke2Zvcm1hdERhdGUocmVwb3J0LmNyZWF0ZWRfYXQpfVxcblRpbWU6ICR7Zm9ybWF0VGltZUZyb21EQihcbiAgICAgICAgICAgICAgcmVwb3J0LmNyZWF0ZWRfYXRcbiAgICAgICAgICAgICl9XFxuYCxcbiAgICAgICAgICAgIG1hcmdpbjogWzAsIDAsIDAsIDEwXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHt9LFxuICAgICAgICBdLFxuICAgICAgfSxcblxuICAgICAgLi4udGFibGVzLFxuICAgICAge1xuICAgICAgICBtYXJnaW46IFswLCA1LCAwLCAwXSxcbiAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHdpZHRoOiBcIjUwJVwiLFxuICAgICAgICAgICAgc3RhY2s6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6IFwiRXhwZW5zZXMgUmVwb3J0XCIsXG4gICAgICAgICAgICAgICAgc3R5bGU6IFwic3ViaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICAgICAgICAgIGhlYWRlclJvd3M6IDEsXG4gICAgICAgICAgICAgICAgICB3aWR0aHM6IFtcIipcIiwgXCJhdXRvXCIsIFwiKlwiXSwgLy8gU2V0IHdpZHRocyBmb3IgdGhlIHRocmVlIGNvbHVtbnNcbiAgICAgICAgICAgICAgICAgIGJvZHk6IFtcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRXhwZW5zZXMgTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVzY3JpcHRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkFtb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAuLi5leHBlbnNlc1JlcG9ydFRhYmxlQm9keSxcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsYXlvdXQ6IHtcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiAoKSA9PiAyLFxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiAoKSA9PiAyLFxuICAgICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogKCkgPT4gMixcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdCb3R0b206ICgpID0+IDIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6IFwiQ3JlZGl0IFJlcG9ydFwiLFxuICAgICAgICAgICAgICAgIHN0eWxlOiBcInN1YmhlYWRlclwiLFxuICAgICAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgICAgICAgICBoZWFkZXJSb3dzOiAxLFxuICAgICAgICAgICAgICAgICAgd2lkdGhzOiBbXCIqXCIsIFwiKlwiLCBcImF1dG9cIiwgXCJhdXRvXCIsIFwiYXV0b1wiXSwgLy8gU2V0IHdpZHRocyBmb3IgdGhlIHRocmVlIGNvbHVtbnNcbiAgICAgICAgICAgICAgICAgIGJvZHk6IFtcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRW1wbG95ZWUgTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiUHJvZHVjdCBOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogXCJ0YWJsZUhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJQaWVjZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlByaWNlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogXCJ0YWJsZUhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJBbW91bnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgLi4uY3JlZGl0UmVwb3J0VGFibGVCb2R5LFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGxheW91dDoge1xuICAgICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6ICgpID0+IDIsXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICgpID0+IDIsXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wOiAoKSA9PiAyLFxuICAgICAgICAgICAgICAgICAgcGFkZGluZ0JvdHRvbTogKCkgPT4gMixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHdpZHRoOiBcIjUwJVwiLFxuICAgICAgICAgICAgc3RhY2s6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6IFwiRGVub21pbmF0aW9uIFJlcG9ydFwiLFxuICAgICAgICAgICAgICAgIHN0eWxlOiBcInN1YmhlYWRlclwiLFxuICAgICAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgICAgICAgICBoZWFkZXJSb3dzOiAwLFxuICAgICAgICAgICAgICAgICAgd2lkdGhzOiBbXCIqXCIsIFwiYXV0b1wiLCBcIipcIiwgXCJhdXRvXCJdLCAvLyBTZXQgd2lkdGhzIGZvciB0aGUgZm91ciBjb2x1bW5zXG4gICAgICAgICAgICAgICAgICBib2R5OiBbXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkJpbGxzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogXCJ0YWJsZUhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJQY3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkNvaW5zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogXCJ0YWJsZUhlYWRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJQY3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgLi4uZGVub21pbmF0aW9uUmVwb3J0VGFibGVCb2R5LFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGxheW91dDoge1xuICAgICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6ICgpID0+IDIsXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICgpID0+IDIsXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nVG9wOiAoKSA9PiAyLFxuICAgICAgICAgICAgICAgICAgcGFkZGluZ0JvdHRvbTogKCkgPT4gMixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBjb2x1bW5HYXA6IDEwLFxuICAgICAgfSxcblxuICAgICAge30sXG5cbiAgICAgIHtcbiAgICAgICAgY2FudmFzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogXCJsaW5lXCIsXG4gICAgICAgICAgICB4MTogMCxcbiAgICAgICAgICAgIHkxOiAyNSxcbiAgICAgICAgICAgIHgyOiA1ODAsXG4gICAgICAgICAgICB5MjogMjUsXG4gICAgICAgICAgICBsaW5lV2lkdGg6IDEsXG4gICAgICAgICAgICBkYXNoOiB7IGxlbmd0aDogNSwgc3BhY2U6IDUgfSwgLy8gRGFzaGVkIGxpbmVcbiAgICAgICAgICAgIGxpbmVDb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICBtYXJnaW46IFswLCAyMCwgMCwgMF0sIC8vIEFkanVzdCBtYXJnaW4gYXMgbmVlZGVkXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG1hcmdpbjogWzAsIDIwLCAwLCAwXSxcbiAgICAgICAgc3RhY2s6IFtcbiAgICAgICAgICB7IHRleHQ6IFwiU3VtbWFyeVwiLCBzdHlsZTogXCJzdWJoZWFkZXJcIiwgYWxpZ25tZW50OiBcImNlbnRlclwiIH0sXG4gICAgICAgICAgc3VtbWFyeVRhYmxlLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICBdLFxuICAgIHN0eWxlczoge1xuICAgICAgaGVhZGVyOiB7IGZvbnRTaXplOiAxNiwgYm9sZDogdHJ1ZSB9LFxuICAgICAgc3ViaGVhZGVyOiB7XG4gICAgICAgIC8vIGZvbnQ6IGZvbnRGYW1pbHksXG4gICAgICAgIGZvbnRTaXplOiAxMixcbiAgICAgICAgYm9sZDogdHJ1ZSxcbiAgICAgICAgbWFyZ2luOiBbMCwgMTAsIDAsIDVdLFxuICAgICAgfSxcbiAgICAgIHRhYmxlSGVhZGVyOiB7XG4gICAgICAgIC8vIGZvbnQ6IGZvbnRGYW1pbHksXG4gICAgICAgIGJvbGQ6IHRydWUsXG4gICAgICAgIGZvbnRTaXplOiAxMCxcbiAgICAgICAgY29sb3I6IFwiYmxhY2tcIixcbiAgICAgIH0sXG4gICAgICBib2R5OiB7XG4gICAgICAgIC8vIGZvbnQ6IGZvbnRGYW1pbHksXG4gICAgICAgIGZvbnRTaXplOiA4LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBhZ2VNYXJnaW5zOiBbMTAsIDEwLCAxMCwgMTBdLCAvLyBSZWR1Y2VkIHBhZ2UgbWFyZ2lucyBmb3IgYmV0dGVyIGZpdFxuICB9O1xufTtcblxuLy8gY29uc3QgZ2VuZXJhdGVEb2NEZWZpbml0aW9uID0gKHJlcG9ydCkgPT4ge1xuLy8gICBjb25zdCBwcm9kdWN0aW9uVHlwZXMgPSBbXG4vLyAgICAge1xuLy8gICAgICAgdGl0bGU6IFwiQnJlYWQgUHJvZHVjdGlvblwiLFxuLy8gICAgICAgZGF0YTogcmVwb3J0LmJyZWFkX3JlcG9ydHMgfHwgW10sXG4vLyAgICAgICBjb2x1bW5zOiBbXG4vLyAgICAgICAgIFwiYnJlYWQubmFtZVwiLFxuLy8gICAgICAgICBcImJlZ2lubmluZ3NcIixcbi8vICAgICAgICAgXCJwcmljZVwiLFxuLy8gICAgICAgICBcIm5ld19wcm9kdWN0aW9uXCIsXG4vLyAgICAgICAgIFwiYnJlYWRfb3V0XCIsXG4vLyAgICAgICAgIFwiYnJlYWRfc29sZFwiLFxuLy8gICAgICAgICBcInRvdGFsXCIsXG4vLyAgICAgICAgIFwicmVtYWluaW5nXCIsXG4vLyAgICAgICAgIFwic2FsZXNcIixcbi8vICAgICAgIF0sXG4vLyAgICAgICB0b3RhbHM6IFtcInNhbGVzXCJdLFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgdGl0bGU6IFwiU2VsZWN0YSBQcm9kdWN0aW9uXCIsXG4vLyAgICAgICBkYXRhOiByZXBvcnQuc2VsZWN0YV9yZXBvcnRzIHx8IFtdLFxuLy8gICAgICAgY29sdW1uczogW1xuLy8gICAgICAgICBcInNlbGVjdGEubmFtZVwiLFxuLy8gICAgICAgICBcImJlZ2lubmluZ3NcIixcbi8vICAgICAgICAgXCJwcmljZVwiLFxuLy8gICAgICAgICBcIm91dFwiLFxuLy8gICAgICAgICBcInNvbGRcIixcbi8vICAgICAgICAgXCJyZW1haW5pbmdcIixcbi8vICAgICAgICAgXCJzYWxlc1wiLFxuLy8gICAgICAgXSxcbi8vICAgICAgIHRvdGFsczogW1wic2FsZXNcIl0sXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICB0aXRsZTogXCJTb2Z0ZHJpbmtzIFByb2R1Y3Rpb25cIixcbi8vICAgICAgIGRhdGE6IHJlcG9ydC5zb2Z0ZHJpbmtzX3JlcG9ydHMgfHwgW10sXG4vLyAgICAgICBjb2x1bW5zOiBbXG4vLyAgICAgICAgIFwic29mdGRyaW5rcy5uYW1lXCIsXG4vLyAgICAgICAgIFwiYmVnaW5uaW5nc1wiLFxuLy8gICAgICAgICBcInByaWNlXCIsXG4vLyAgICAgICAgIFwiYWRkZWRfc3RvY2tzXCIsXG4vLyAgICAgICAgIFwib3V0XCIsXG4vLyAgICAgICAgIFwic29sZFwiLFxuLy8gICAgICAgICBcInJlbWFpbmluZ1wiLFxuLy8gICAgICAgICBcInNhbGVzXCIsXG4vLyAgICAgICBdLFxuLy8gICAgICAgdG90YWxzOiBbXCJzYWxlc1wiXSxcbi8vICAgICB9LFxuLy8gICBdO1xuLy8gICBjb25zdCBleHBlbnNlc1JlcG9ydCA9IHJlcG9ydC5leHBlbnNlc19yZXBvcnRzIHx8IFtdO1xuXG4vLyAgIGNvbnN0IGZvcm1hdFByaWNlID0gKHByaWNlKSA9PiBg4oKxJHtwcmljZS50b0ZpeGVkKDIpfWA7XG5cbi8vICAgY29uc3QgZ2VuZXJhdGVUYWJsZUJvZHkgPSAoZGF0YSwgY29sdW1ucywgdG90YWxzKSA9PiB7XG4vLyAgICAgY29uc3QgdG90YWxSb3cgPSB0b3RhbHMucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuLy8gICAgICAgYWNjW2tleV0gPSBkYXRhLnJlZHVjZSgoc3VtLCBpdGVtKSA9PiBzdW0gKyAoaXRlbVtrZXldIHx8IDApLCAwKTtcbi8vICAgICAgIHJldHVybiBhY2M7XG4vLyAgICAgfSwge30pO1xuXG4vLyAgICAgcmV0dXJuIFtcbi8vICAgICAgIC4uLmRhdGEubWFwKChpdGVtKSA9PlxuLy8gICAgICAgICBjb2x1bW5zLm1hcCgoY29sKSA9PiAoe1xuLy8gICAgICAgICAgIHRleHQ6IGNvbC5pbmNsdWRlcyhcIi5cIilcbi8vICAgICAgICAgICAgID8gaXRlbVtjb2wuc3BsaXQoXCIuXCIpWzBdXVtjb2wuc3BsaXQoXCIuXCIpWzFdXVxuLy8gICAgICAgICAgICAgOiBpdGVtW2NvbF0sXG4vLyAgICAgICAgICAgc3R5bGU6IFwiYm9keVwiLFxuLy8gICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbi8vICAgICAgICAgfSkpXG4vLyAgICAgICApLFxuLy8gICAgICAgW1xuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgdGV4dDogXCJPdmVyYWxsIFRvdGFsXCIsXG4vLyAgICAgICAgICAgY29sU3BhbjogY29sdW1ucy5sZW5ndGggLSB0b3RhbHMubGVuZ3RoLFxuLy8gICAgICAgICAgIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsXG4vLyAgICAgICAgICAgYWxpZ25tZW50OiBcInJpZ2h0XCIsXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIC4uLkFycmF5KGNvbHVtbnMubGVuZ3RoIC0gdG90YWxzLmxlbmd0aCAtIDEpLmZpbGwoe30pLFxuLy8gICAgICAgICAuLi50b3RhbHMubWFwKChrZXkpID0+ICh7XG4vLyAgICAgICAgICAgdGV4dDoga2V5ID09PSBcInNhbGVzXCIgPyBmb3JtYXRQcmljZSh0b3RhbFJvd1trZXldKSA6IHRvdGFsUm93W2tleV0sXG4vLyAgICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbi8vICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgIH0pKSxcbi8vICAgICAgIF0sXG4vLyAgICAgXTtcbi8vICAgfTtcblxuLy8gICBjb25zdCBleHBlbnNlc1JlcG9ydFRhYmxlQm9keSA9XG4vLyAgICAgZXhwZW5zZXNSZXBvcnQubGVuZ3RoID4gMFxuLy8gICAgICAgPyBleHBlbnNlc1JlcG9ydC5tYXAoKGV4cGVuc2VzRGF0YSkgPT4gW1xuLy8gICAgICAgICAgIHtcbi8vICAgICAgICAgICAgIHRleHQ6IGV4cGVuc2VzRGF0YS5uYW1lLFxuLy8gICAgICAgICAgICAgc3R5bGU6IFwiYm9keVwiLFxuLy8gICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuLy8gICAgICAgICAgIH0sXG4vLyAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgdGV4dDogZXhwZW5zZXNEYXRhLmRlc2NyaXB0aW9uLFxuLy8gICAgICAgICAgICAgc3R5bGU6IFwiYm9keVwiLFxuLy8gICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuLy8gICAgICAgICAgIH0sXG4vLyAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgdGV4dDogYCR7Zm9ybWF0QW1vdW50KGV4cGVuc2VzRGF0YS5hbW91bnQpfWAsXG4vLyAgICAgICAgICAgICBzdHlsZTogXCJib2R5XCIsXG4vLyAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgICAgfSxcbi8vICAgICAgICAgXSlcbi8vICAgICAgIDogW1t7IHRleHQ6IFwiTm8gZGF0YSBhdmFpbGFibGVcIiwgY29sU3BhbjogMiwgYWxpZ25tZW50OiBcImNlbnRlclwiIH1dXTtcblxuLy8gICBjb25zdCB0YWJsZXMgPSBwcm9kdWN0aW9uVHlwZXMubWFwKCh7IHRpdGxlLCBkYXRhLCBjb2x1bW5zLCB0b3RhbHMgfSkgPT4gKHtcbi8vICAgICBzdGFjazogW1xuLy8gICAgICAgeyB0ZXh0OiB0aXRsZSwgc3R5bGU6IFwic3ViaGVhZGVyXCIsIGFsaWdubWVudDogXCJjZW50ZXJcIiB9LFxuLy8gICAgICAge1xuLy8gICAgICAgICB0YWJsZToge1xuLy8gICAgICAgICAgIGhlYWRlclJvd3M6IDEsXG4vLyAgICAgICAgICAgd2lkdGhzOiBBcnJheShjb2x1bW5zLmxlbmd0aCkuZmlsbChcIipcIiksIC8vIFNldCBhbGwgY29sdW1ucyB0byB0YWtlIGVxdWFsIHNwYWNlXG4vLyAgICAgICAgICAgYm9keTogW1xuLy8gICAgICAgICAgICAgY29sdW1ucy5tYXAoKGNvbCkgPT4gKHtcbi8vICAgICAgICAgICAgICAgdGV4dDogY29sXG4vLyAgICAgICAgICAgICAgICAgLnNwbGl0KFwiLlwiKVxuLy8gICAgICAgICAgICAgICAgIC5wb3AoKVxuLy8gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9fL2csIFwiIFwiKVxuLy8gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXGJcXHcvZywgKGwpID0+IGwudG9VcHBlckNhc2UoKSksXG4vLyAgICAgICAgICAgICAgIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsXG4vLyAgICAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbi8vICAgICAgICAgICAgIH0pKSxcbi8vICAgICAgICAgICAgIC4uLmdlbmVyYXRlVGFibGVCb2R5KGRhdGEsIGNvbHVtbnMsIHRvdGFscyksXG4vLyAgICAgICAgICAgXSxcbi8vICAgICAgICAgfSxcbi8vICAgICAgICAgbGF5b3V0OiB7XG4vLyAgICAgICAgICAgcGFkZGluZ0xlZnQ6ICgpID0+IDIsXG4vLyAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiAoKSA9PiAyLFxuLy8gICAgICAgICAgIHBhZGRpbmdUb3A6ICgpID0+IDIsXG4vLyAgICAgICAgICAgcGFkZGluZ0JvdHRvbTogKCkgPT4gMixcbi8vICAgICAgICAgfSxcbi8vICAgICAgIH0sXG4vLyAgICAgXSxcbi8vICAgfSkpO1xuXG4vLyAgIHJldHVybiB7XG4vLyAgICAgY29udGVudDogW1xuLy8gICAgICAgeyB0ZXh0OiBcIlNhbGVzIFJlcG9ydFwiLCBzdHlsZTogXCJoZWFkZXJcIiwgYWxpZ25tZW50OiBcImNlbnRlclwiIH0sXG4vLyAgICAgICB7XG4vLyAgICAgICAgIHRleHQ6IGBEYXRlOiAke2Zvcm1hdERhdGUocmVwb3J0LmNyZWF0ZWRfYXQpfVxcblRpbWU6ICR7Zm9ybWF0VGltZUZyb21EQihcbi8vICAgICAgICAgICByZXBvcnQuY3JlYXRlZF9hdFxuLy8gICAgICAgICApfVxcbkNhc2hpZXI6ICR7cmVwb3J0LnVzZXIubmFtZX1gLFxuLy8gICAgICAgICBtYXJnaW46IFswLCAwLCAwLCAxMF0sXG4vLyAgICAgICB9LFxuLy8gICAgICAgLi4udGFibGVzLFxuXG4vLyAgICAgICB7XG4vLyAgICAgICAgIGNvbHVtbnM6IFtcbi8vICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICB3aWR0aDogXCI1MCVcIixcbi8vICAgICAgICAgICAgIHN0YWNrOiBbXG4vLyAgICAgICAgICAgICAgIHtcbi8vICAgICAgICAgICAgICAgICB0ZXh0OiBcIkV4cGVuc2VzIFJlcG9ydFwiLFxuLy8gICAgICAgICAgICAgICAgIHN0eWxlOiBcInN1YmhlYWRlclwiLFxuLy8gICAgICAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbi8vICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgICAgIHRhYmxlOiB7XG4vLyAgICAgICAgICAgICAgICAgICBoZWFkZXJSb3dzOiAxLFxuLy8gICAgICAgICAgICAgICAgICAgd2lkdGhzOiBbXCIqXCIsIFwiKlwiLCBcIipcIl0sXG4vLyAgICAgICAgICAgICAgICAgICBib2R5OiBbXG4vLyAgICAgICAgICAgICAgICAgICAgIFtcbi8vICAgICAgICAgICAgICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkV4cGVuc2VzIE5hbWVcIixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAgICAgICAgXSxcbi8vICAgICAgICAgICAgICAgICAgICAgLi4uZXhwZW5zZXNSZXBvcnRUYWJsZUJvZHksXG4vLyAgICAgICAgICAgICAgICAgICBdLFxuLy8gICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICBdLFxuLy8gICAgICAgICAgICAgY29sdW1uR2FwOiAxMCxcbi8vICAgICAgICAgICB9LFxuXG4vLyAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgd2lkdGg6IFwiNTAlXCIsXG4vLyAgICAgICAgICAgICBzdGFjazogW1xuLy8gICAgICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICAgICAgdGV4dDogXCJEZW5vbWluYXRpb24gUmVwb3J0XCIsXG4vLyAgICAgICAgICAgICAgICAgc3R5bGU6IFwic3ViaGVhZGVyXCIsXG4vLyAgICAgICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuLy8gICAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgXSxcbi8vICAgICAgICAgICAgIGNvbHVtbkdhcDogMTAsXG4vLyAgICAgICAgICAgfSxcbi8vICAgICAgICAgXSxcbi8vICAgICAgIH0sXG4vLyAgICAgXSxcbi8vICAgICBzdHlsZXM6IHtcbi8vICAgICAgIGhlYWRlcjogeyBmb250U2l6ZTogMTYsIGJvbGQ6IHRydWUgfSxcbi8vICAgICAgIHN1YmhlYWRlcjogeyBmb250U2l6ZTogMTIsIGJvbGQ6IHRydWUsIG1hcmdpbjogWzAsIDEwLCAwLCA1XSB9LFxuLy8gICAgICAgdGFibGVIZWFkZXI6IHsgYm9sZDogdHJ1ZSwgZm9udFNpemU6IDEwLCBjb2xvcjogXCJibGFja1wiIH0sXG4vLyAgICAgICBib2R5OiB7IGZvbnRTaXplOiA4IH0sXG4vLyAgICAgfSxcbi8vICAgICBwYWdlTWFyZ2luczogWzIwLCAyMCwgMjAsIDIwXSwgLy8gUmVkdWNlZCBwYWdlIG1hcmdpbnMgZm9yIGJldHRlciBmaXRcbi8vICAgfTtcbi8vIH07XG5cbi8vIGNvbnN0IGdlbmVyYXRlRG9jRGVmaW5pdGlvbiA9IChyZXBvcnQpID0+IHtcbi8vICAgY29uc3QgYnJlYWRQcm9kdWN0aW9uID0gcmVwb3J0LmJyZWFkX3JlcG9ydHMgfHwgW107XG4vLyAgIGNvbnN0IGV4cGVuc2VzUmVwb3J0ID0gcmVwb3J0LnNlbGVjdGFfcmVwb3J0cyB8fCBbXTtcbi8vICAgY29uc3Qgc29mdGRyaW5rc1Byb2R1Y3Rpb24gPSByZXBvcnQuc29mdGRyaW5rc19yZXBvcnRzIHx8IFtdO1xuLy8gICBjb25zb2xlLmxvZyhcImJyZWFkUHJvZHVjdGlvblwiLCBicmVhZFByb2R1Y3Rpb24pO1xuXG4vLyAgIGNvbnN0IGJyZWFkUHJvZHVjdGlvblRhYmxlQm9keSA9XG4vLyAgICAgYnJlYWRQcm9kdWN0aW9uLmxlbmd0aCA+IDBcbi8vICAgICAgID8gYnJlYWRQcm9kdWN0aW9uLm1hcCgoYnJlYWREYXRhKSA9PiBbXG4vLyAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgdGV4dDogYnJlYWREYXRhLmJyZWFkLm5hbWUsXG4vLyAgICAgICAgICAgICBzdHlsZTogXCJib2R5XCIsXG4vLyAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgICAgfSxcbi8vICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICB0ZXh0OiBgJHtmb3JtYXRQcmljZShicmVhZERhdGEucHJpY2UpfWAsXG4vLyAgICAgICAgICAgICBzdHlsZTogXCJib2R5XCIsXG4vLyAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgICAgfSxcbi8vICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICB0ZXh0OiBicmVhZERhdGEuYmVnaW5uaW5ncyxcbi8vICAgICAgICAgICAgIHN0eWxlOiBcImJvZHlcIixcbi8vICAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbi8vICAgICAgICAgICB9LFxuLy8gICAgICAgICAgIHtcbi8vICAgICAgICAgICAgIHRleHQ6IGJyZWFkRGF0YS5yZW1haW5pbmcsXG4vLyAgICAgICAgICAgICBzdHlsZTogXCJib2R5XCIsXG4vLyAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgICAgfSxcbi8vICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICB0ZXh0OiBicmVhZERhdGEubmV3X3Byb2R1Y3Rpb24sXG4vLyAgICAgICAgICAgICBzdHlsZTogXCJib2R5XCIsXG4vLyAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgICAgfSxcbi8vICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICB0ZXh0OiBicmVhZERhdGEuYnJlYWRfb3V0LFxuLy8gICAgICAgICAgICAgc3R5bGU6IFwiYm9keVwiLFxuLy8gICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuLy8gICAgICAgICAgIH0sXG4vLyAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgdGV4dDogYnJlYWREYXRhLmJyZWFkX3NvbGQsXG4vLyAgICAgICAgICAgICBzdHlsZTogXCJib2R5XCIsXG4vLyAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgICAgfSxcbi8vICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICB0ZXh0OiBicmVhZERhdGEudG90YWwsXG4vLyAgICAgICAgICAgICBzdHlsZTogXCJib2R5XCIsXG4vLyAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgICAgfSxcbi8vICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICB0ZXh0OiBgJHtmb3JtYXRQcmljZShicmVhZERhdGEuc2FsZXMpfWAsXG4vLyAgICAgICAgICAgICBzdHlsZTogXCJib2R5XCIsXG4vLyAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgICAgfSxcbi8vICAgICAgICAgXSlcbi8vICAgICAgIDogW1t7IHRleHQ6IFwiTm8gZGF0YSBhdmFpbGFibGVcIiwgY29sU3BhbjogMiwgYWxpZ25tZW50OiBcImNlbnRlclwiIH1dXTtcblxuLy8gY29uc3QgZXhwZW5zZXNSZXBvcnRUYWJsZUJvZHkgPVxuLy8gICBleHBlbnNlc1JlcG9ydC5sZW5ndGggPiAwXG4vLyAgICAgPyBleHBlbnNlc1JlcG9ydC5tYXAoKGV4cGVuc2VzRGF0YSkgPT4gW1xuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgdGV4dDogZXhwZW5zZXNEYXRhLnNlbGVjdGEubmFtZSxcbi8vICAgICAgICAgICBzdHlsZTogXCJib2R5XCIsXG4vLyAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgdGV4dDogYCR7Zm9ybWF0UHJpY2UoZXhwZW5zZXNEYXRhLnByaWNlKX1gLFxuLy8gICAgICAgICAgIHN0eWxlOiBcImJvZHlcIixcbi8vICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIHtcbi8vICAgICAgICAgICB0ZXh0OiBleHBlbnNlc0RhdGEuYmVnaW5uaW5ncyxcbi8vICAgICAgICAgICBzdHlsZTogXCJib2R5XCIsXG4vLyAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgdGV4dDogZXhwZW5zZXNEYXRhLnJlbWFpbmluZyxcbi8vICAgICAgICAgICBzdHlsZTogXCJib2R5XCIsXG4vLyAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgdGV4dDogZXhwZW5zZXNEYXRhLm91dCxcbi8vICAgICAgICAgICBzdHlsZTogXCJib2R5XCIsXG4vLyAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgdGV4dDogZXhwZW5zZXNEYXRhLnNvbGQsXG4vLyAgICAgICAgICAgc3R5bGU6IFwiYm9keVwiLFxuLy8gICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbi8vICAgICAgICAgfSxcbi8vICAgICAgICAge1xuLy8gICAgICAgICAgIHRleHQ6IGV4cGVuc2VzRGF0YS5zYWxlcyxcbi8vICAgICAgICAgICBzdHlsZTogXCJib2R5XCIsXG4vLyAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuLy8gICAgICAgICB9LFxuLy8gICAgICAgXSlcbi8vICAgICA6IFtbeyB0ZXh0OiBcIk5vIGRhdGEgYXZhaWxhYmxlXCIsIGNvbFNwYW46IDIsIGFsaWdubWVudDogXCJjZW50ZXJcIiB9XV07XG5cbi8vICAgY29uc3Qgc29mdGRyaW5rc1Byb2R1Y3Rpb25UYWJsZUJvZHkgPVxuLy8gICAgIHNvZnRkcmlua3NQcm9kdWN0aW9uLmxlbmd0aCA+IDBcbi8vICAgICAgID8gc29mdGRyaW5rc1Byb2R1Y3Rpb24ubWFwKChzb2Z0ZHJpbmtzRGF0YSkgPT4gW1xuLy8gICAgICAgICAgIHtcbi8vICAgICAgICAgICAgIHRleHQ6IHNvZnRkcmlua3NEYXRhLnNvZnRkcmlua3MubmFtZSxcbi8vICAgICAgICAgICAgIHN0eWxlOiBcImJvZHlcIixcbi8vICAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbi8vICAgICAgICAgICB9LFxuLy8gICAgICAgICAgIHtcbi8vICAgICAgICAgICAgIHRleHQ6IGAke2Zvcm1hdFByaWNlKHNvZnRkcmlua3NEYXRhLnByaWNlKX1gLFxuLy8gICAgICAgICAgICAgc3R5bGU6IFwiYm9keVwiLFxuLy8gICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuLy8gICAgICAgICAgIH0sXG4vLyAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgdGV4dDogc29mdGRyaW5rc0RhdGEuYmVnaW5uaW5ncyxcbi8vICAgICAgICAgICAgIHN0eWxlOiBcImJvZHlcIixcbi8vICAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbi8vICAgICAgICAgICB9LFxuLy8gICAgICAgICAgIHtcbi8vICAgICAgICAgICAgIHRleHQ6IHNvZnRkcmlua3NEYXRhLmFkZGVkX3N0b2Nrcyxcbi8vICAgICAgICAgICAgIHN0eWxlOiBcImJvZHlcIixcbi8vICAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbi8vICAgICAgICAgICB9LFxuLy8gICAgICAgICAgIHtcbi8vICAgICAgICAgICAgIHRleHQ6IHNvZnRkcmlua3NEYXRhLnJlbWFpbmluZyxcbi8vICAgICAgICAgICAgIHN0eWxlOiBcImJvZHlcIixcbi8vICAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbi8vICAgICAgICAgICB9LFxuLy8gICAgICAgICAgIHtcbi8vICAgICAgICAgICAgIHRleHQ6IHNvZnRkcmlua3NEYXRhLm91dCxcbi8vICAgICAgICAgICAgIHN0eWxlOiBcImJvZHlcIixcbi8vICAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbi8vICAgICAgICAgICB9LFxuLy8gICAgICAgICAgIHtcbi8vICAgICAgICAgICAgIHRleHQ6IHNvZnRkcmlua3NEYXRhLnNvbGQsXG4vLyAgICAgICAgICAgICBzdHlsZTogXCJib2R5XCIsXG4vLyAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgICAgfSxcbi8vICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICB0ZXh0OiBzb2Z0ZHJpbmtzRGF0YS5zYWxlcyxcbi8vICAgICAgICAgICAgIHN0eWxlOiBcImJvZHlcIixcbi8vICAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbi8vICAgICAgICAgICB9LFxuLy8gICAgICAgICBdKVxuLy8gICAgICAgOiBbW3sgdGV4dDogXCJObyBkYXRhIGF2YWlsYWJsZVwiLCBjb2xTcGFuOiAyLCBhbGlnbm1lbnQ6IFwiY2VudGVyXCIgfV1dO1xuXG4vLyAgIHJldHVybiB7XG4vLyAgICAgY29udGVudDogW1xuLy8gICAgICAgeyB0ZXh0OiBcIlNhbGVzIFJlcG9ydFwiLCBzdHlsZTogXCJoZWFkZXJcIiwgYWxpZ25tZW50OiBcImNlbnRlclwiIH0sXG4vLyAgICAgICB7XG4vLyAgICAgICAgIGNvbHVtbnM6IFtcbi8vICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICB0ZXh0OiBgRGF0ZTogJHtmb3JtYXREYXRlKHJlcG9ydC5jcmVhdGVkX2F0KX1cbi8vICAgICAgICAgICAgICBUaW1lOiAke2Zvcm1hdFRpbWVGcm9tREIocmVwb3J0LmNyZWF0ZWRfYXQpfVxuLy8gICAgICAgICAgICAgIENhc2hpZXI6ICR7cmVwb3J0LnVzZXIubmFtZX1cblxuLy8gICAgICAgICAgICAgYCxcbi8vICAgICAgICAgICB9LFxuLy8gICAgICAgICBdLFxuLy8gICAgICAgfSxcbi8vICAgICAgIHtcbi8vICAgICAgICAgc3RhY2s6IFtcbi8vICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICB0ZXh0OiBcIkJyZWFkIFByb2R1Y3Rpb25cIixcbi8vICAgICAgICAgICAgIHN0eWxlOiBcInN1YmhlYWRlclwiLFxuLy8gICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuLy8gICAgICAgICAgIH0sXG4vLyAgICAgICAgICAge1xuLy8gICB0YWJsZToge1xuLy8gICAgIGhlYWRlclJvd3M6IDEsXG4vLyAgICAgd2lkdGhzOiBbXCIqXCIsIFwiKlwiLCBcIipcIiwgXCIqXCIsIFwiKlwiLCBcIipcIiwgXCIqXCIsIFwiKlwiLCBcIipcIl0sXG4vLyAgICAgYm9keTogW1xuLy8gICAgICAgW1xuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgdGV4dDogXCJCcmVhZCBOYW1lXCIsXG4vLyAgICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbi8vICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIHsgdGV4dDogXCJQcmljZVwiLCBzdHlsZTogXCJ0YWJsZUhlYWRlclwiLCBhbGlnbm1lbnQ6IFwiY2VudGVyXCIgfSxcbi8vICAgICAgICAge1xuLy8gICAgICAgICAgIHRleHQ6IFwiQmVnaW5uaW5nc1wiLFxuLy8gICAgICAgICAgIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsXG4vLyAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgdGV4dDogXCJSZW1haW5pbmdzXCIsXG4vLyAgICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbi8vICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIHtcbi8vICAgICAgICAgICB0ZXh0OiBcIk5ldyBQcm9kdWN0aW9uXCIsXG4vLyAgICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbi8vICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIHtcbi8vICAgICAgICAgICB0ZXh0OiBcIkJyZWFkIE91dFwiLFxuLy8gICAgICAgICAgIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsXG4vLyAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgdGV4dDogXCJCcmVhZCBTb2xkXCIsXG4vLyAgICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbi8vICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIHtcbi8vICAgICAgICAgICB0ZXh0OiBcIkJyZWFkIFRvdGFsXCIsXG4vLyAgICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbi8vICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIHtcbi8vICAgICAgICAgICB0ZXh0OiBcIlRvdGFsIFNhbGVzXCIsXG4vLyAgICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbi8vICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICBdLFxuLy8gICAgICAgLi4uYnJlYWRQcm9kdWN0aW9uVGFibGVCb2R5LFxuLy8gICAgIF0sXG4vLyAgIH0sXG4vLyB9LFxuLy8gICAgICAgICBdLFxuLy8gICAgICAgfSxcbi8vICAgICAgIHtcbi8vICAgICAgICAgc3RhY2s6IFtcbi8vICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICB0ZXh0OiBcIlNvZnRkcmlua3MgUHJvZHVjdGlvblwiLFxuLy8gICAgICAgICAgICAgc3R5bGU6IFwic3ViaGVhZGVyXCIsXG4vLyAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgICAgfSxcbi8vICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICB0YWJsZToge1xuLy8gICAgICAgICAgICAgICBoZWFkZXJSb3dzOiAxLFxuLy8gICAgICAgICAgICAgICB3aWR0aHM6IFtcIipcIiwgXCIqXCIsIFwiKlwiLCBcIipcIiwgXCIqXCIsIFwiKlwiLCBcIipcIiwgXCIqXCJdLFxuLy8gICAgICAgICAgICAgICBib2R5OiBbXG4vLyAgICAgICAgICAgICAgICAgW1xuLy8gICAgICAgICAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlNvZnRkcmlua3MgTmFtZVwiLFxuLy8gICAgICAgICAgICAgICAgICAgICBzdHlsZTogXCJ0YWJsZUhlYWRlclwiLFxuLy8gICAgICAgICAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcIlByaWNlXCIsIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsIGFsaWdubWVudDogXCJjZW50ZXJcIiB9LFxuLy8gICAgICAgICAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkJlZ2lubmluZ3NcIixcbi8vICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbi8vICAgICAgICAgICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuLy8gICAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAgICAgIHtcbi8vICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJBZGRlZCBzdG9ja3NcIixcbi8vICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbi8vICAgICAgICAgICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuLy8gICAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAgICAgIHtcbi8vICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJSZW1haW5pbmdzXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbi8vICAgICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiU29mdGRyaW5rcyBPdXRcIixcbi8vICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbi8vICAgICAgICAgICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuLy8gICAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAgICAgIHtcbi8vICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJTT2Z0ZHJpbmtzIFNvbGRcIixcbi8vICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbi8vICAgICAgICAgICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuLy8gICAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAgICAgIHtcbi8vICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJUb3RhbCBTYWxlc1wiLFxuLy8gICAgICAgICAgICAgICAgICAgICBzdHlsZTogXCJ0YWJsZUhlYWRlclwiLFxuLy8gICAgICAgICAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgICAgIF0sXG4vLyAgICAgICAgICAgICAgICAgLi4uc29mdGRyaW5rc1Byb2R1Y3Rpb25UYWJsZUJvZHksXG4vLyAgICAgICAgICAgICAgIF0sXG4vLyAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgIH0sXG4vLyAgICAgICAgIF0sXG4vLyAgICAgICB9LFxuLy8gICAgICAge1xuLy8gICAgICAgICBzdGFjazogW1xuLy8gICAgICAgICAgIHtcbi8vICAgICAgICAgICAgIHRleHQ6IFwiU2VsZWN0YSBQcm9kdWN0aW9uXCIsXG4vLyAgICAgICAgICAgICBzdHlsZTogXCJzdWJoZWFkZXJcIixcbi8vICAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbi8vICAgICAgICAgICB9LFxuLy8gICAgICAgICAgIHtcbi8vICAgICAgICAgICAgIHRhYmxlOiB7XG4vLyAgICAgICAgICAgICAgIGhlYWRlclJvd3M6IDEsXG4vLyAgICAgICAgICAgICAgIHdpZHRoczogW1wiKlwiLCBcIipcIiwgXCIqXCIsIFwiKlwiLCBcIipcIiwgXCIqXCIsIFwiKlwiXSxcbi8vICAgICAgICAgICAgICAgYm9keTogW1xuLy8gICAgICAgICAgICAgICAgIFtcbi8vICAgICAgICAgICAgICAgICAgIHtcbi8vICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJTZWxlY3RhIE5hbWVcIixcbi8vICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbi8vICAgICAgICAgICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuLy8gICAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJQcmljZVwiLCBzdHlsZTogXCJ0YWJsZUhlYWRlclwiLCBhbGlnbm1lbnQ6IFwiY2VudGVyXCIgfSxcbi8vICAgICAgICAgICAgICAgICAgIHtcbi8vICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJCZWdpbm5pbmdzXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbi8vICAgICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiUmVtYWluaW5nc1wiLFxuLy8gICAgICAgICAgICAgICAgICAgICBzdHlsZTogXCJ0YWJsZUhlYWRlclwiLFxuLy8gICAgICAgICAgICAgICAgICAgICBhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4vLyAgICAgICAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlNlbGVjdGEgT3V0XCIsXG4vLyAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbi8vICAgICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiU2VsZWN0YSBTb2xkXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBcInRhYmxlSGVhZGVyXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbi8vICAgICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiVG90YWwgU2FsZXNcIixcbi8vICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IFwidGFibGVIZWFkZXJcIixcbi8vICAgICAgICAgICAgICAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuLy8gICAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAgICBdLFxuLy8gICAgICAgICAgICAgICAgIC4uLmV4cGVuc2VzUmVwb3J0VGFibGVCb2R5LFxuLy8gICAgICAgICAgICAgICBdLFxuLy8gICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICB9LFxuLy8gICAgICAgICBdLFxuLy8gICAgICAgfSxcbi8vICAgICBdLFxuLy8gICAgIHN0eWxlczoge1xuLy8gICAgICAgaGVhZGVyOiB7XG4vLyAgICAgICAgIGZvbnRTaXplOiAxNCxcbi8vICAgICAgICAgYm9sZDogZmFsc2UsXG4vLyAgICAgICAgIG1hcmdpbjogWzAsIDAsIDAsIDBdLFxuLy8gICAgICAgfSxcbi8vICAgICAgIHN1YmhlYWRlcjoge1xuLy8gICAgICAgICBmb250U2l6ZTogMTAsXG4vLyAgICAgICAgIGJvbGQ6IHRydWUsXG4vLyAgICAgICAgIG1hcmdpbjogWzAsIDEwLCAwLCA1XSxcbi8vICAgICAgICAgZmlsbENvbG9yOiBcIiM1OTVhNWFcIixcbi8vICAgICAgIH0sXG4vLyAgICAgICBib2R5OiB7XG4vLyAgICAgICAgIGZvbnRTaXplOiA5LFxuLy8gICAgICAgfSxcbi8vICAgICAgIHRhYmxlSGVhZGVyOiB7XG4vLyAgICAgICAgIGJvbGQ6IHRydWUsXG4vLyAgICAgICAgIGZvbnRTaXplOiA5LFxuLy8gICAgICAgfSxcbi8vICAgICAgIGRlZmF1bHRTdHlsZToge1xuLy8gICAgICAgICBjb2x1bW5HYXA6IDEwLCAvLyBHZW5lcmFsIGdhcCBiZXR3ZWVuIGFueSBvdGhlciBjb2x1bW5zIG5vdCBleHBsaWNpdGx5IHNldFxuLy8gICAgICAgfSxcbi8vICAgICB9LFxuLy8gICB9O1xuLy8gfTtcblxuY29uc3Qgb3BlblByaW50RGlhbG9nID0gKHJlcG9ydCkgPT4ge1xuICBjb25zdCBkb2NEZWZpbml0aW9uID0gZ2VuZXJhdGVEb2NEZWZpbml0aW9uKHJlcG9ydCk7XG4gIHBkZk1ha2UuY3JlYXRlUGRmKGRvY0RlZmluaXRpb24pLmdldERhdGFVcmwoKGRhdGFVcmwpID0+IHtcbiAgICBwZGZVcmwudmFsdWUgPSBkYXRhVXJsO1xuICAgIHByaW50RGlhbG9nLnZhbHVlID0gdHJ1ZTtcbiAgfSk7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5teS1jYXJkIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMzMztcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XG59XG5cbi5teS1jYXJkOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01cHgpO1xuICBib3gtc2hhZG93OiAwcHggNnB4IDE1cHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcbn1cblxuLnVzZXItYnV0dG9uIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XG59XG5cbi51c2VyLWJ1dHRvbjpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KTtcbiAgYm94LXNoYWRvdzogMHB4IDZweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1kaWFsb2dcbiAgICByZWY9XCJkaWFsb2dSZWZcIlxuICAgIHYtbW9kZWw9XCJkaWFsb2dcIlxuICAgIEBoaWRlPVwib25EaWFsb2dIaWRlXCJcbiAgICBAb2s9XCJoYW5kbGVCdXR0b25DbGlja1wiXG4gICAgQGNhbmNlbD1cIm9uRGlhbG9nQ2FuY2VsXCJcbiAgICA6bWF4aW1pemVkPVwibWF4aW1pemVkVG9nZ2xlXCJcbiAgICB0cmFuc2l0aW9uLXNob3c9XCJzbGlkZS11cFwiXG4gICAgdHJhbnNpdGlvbi1oaWRlPVwic2xpZGUtZG93blwiXG4gID5cbiAgICA8cS1jYXJkIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogI2Y3ZjhmY1wiPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uXG4gICAgICAgIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciB0ZXh0LXdoaXRlXCJcbiAgICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjNTk1YTVhXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5cbiAgICAgICAgICB7e1xuICAgICAgICAgICAgYCR7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKFxuICAgICAgICAgICAgICByZXBvcnRzLmJyYW5jaF9uYW1lXG4gICAgICAgICAgICApfSAoICR7cmVwb3J0TGFiZWx9IFJlcG9ydHMpYFxuICAgICAgICAgIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8cS1zcGFjZSAvPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLXgtbWRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgZGVuc2Ugcm91bmQgdi1jbG9zZS1wb3B1cD5cbiAgICAgICAgICAgICAgPHEtdG9vbHRpcCBjbGFzcz1cImJnLWJsdWUtZ3JleS02XCIgOmRlbGF5PVwiMjAwXCI+Q2xvc2U8L3EtdG9vbHRpcD5cbiAgICAgICAgICAgIDwvcS1idG4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cS10YWJzXG4gICAgICAgICAgICB2LW1vZGVsPVwidGFiXCJcbiAgICAgICAgICAgIGFsaWduPVwianVzdGlmeVwiXG4gICAgICAgICAgICBuYXJyb3ctaW5kaWNhdG9yXG4gICAgICAgICAgICBjbGFzcz1cInEtbWItbGdcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxxLXRhYlxuICAgICAgICAgICAgICBjbGFzcz1cInRleHQtcHVycGxlXCJcbiAgICAgICAgICAgICAgbmFtZT1cImJha2VyUmVwb3J0XCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJCYWtlciBSZXBvcnRzXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8cS10YWJcbiAgICAgICAgICAgICAgY2xhc3M9XCJ0ZXh0LW9yYW5nZVwiXG4gICAgICAgICAgICAgIG5hbWU9XCJzYWxlc1JlcG9ydFwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiU2FsZXMgUmVwb3J0XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9xLXRhYnM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxxLXRhYi1wYW5lbHNcbiAgICAgICAgICAgIHYtbW9kZWw9XCJ0YWJcIlxuICAgICAgICAgICAgYW5pbWF0ZWRcbiAgICAgICAgICAgIHRyYW5zaXRpb24tcHJldj1cInNjYWxlXCJcbiAgICAgICAgICAgIHRyYW5zaXRpb24tbmV4dD1cInNjYWxlXCJcbiAgICAgICAgICAgIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogI2Y3ZjhmY1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJiYWtlclJlcG9ydFwiPlxuICAgICAgICAgICAgICA8QmFrZXJSZXBvcnRQYW5lbCA6YmFrZXJzUmVwb3J0PVwiYmFrZXJSZXBvcnRzXCIgLz5cbiAgICAgICAgICAgIDwvcS10YWItcGFuZWw+XG4gICAgICAgICAgICA8cS10YWItcGFuZWwgbmFtZT1cInNhbGVzUmVwb3J0XCI+XG4gICAgICAgICAgICAgIDxTYWxlc1JlcG9ydFBhbmVsIDpzYWxlc1JlcG9ydD1cInNhbGVzUmVwb3J0c1wiIC8+XG4gICAgICAgICAgICA8L3EtdGFiLXBhbmVsPlxuICAgICAgICAgIDwvcS10YWItcGFuZWxzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgdXNlRGlhbG9nUGx1Z2luQ29tcG9uZW50IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IEJha2VyUmVwb3J0UGFuZWwgZnJvbSBcIi4vcmVwb3J0LXBhbmVsL0Jha2VyUmVwb3J0UGFuZWwudnVlXCI7XG5pbXBvcnQgU2FsZXNSZXBvcnRQYW5lbCBmcm9tIFwiLi9yZXBvcnQtcGFuZWwvU2FsZXNSZXBvcnRQYW5lbC52dWVcIjtcblxuY29uc3QgeyBkaWFsb2dSZWYsIG9uRGlhbG9nSGlkZSwgb25EaWFsb2dPSywgb25EaWFsb2dDYW5jZWwgfSA9XG4gIHVzZURpYWxvZ1BsdWdpbkNvbXBvbmVudCgpO1xuXG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzKFtcInJlcG9ydHNcIiwgXCJyZXBvcnRMYWJlbFwiXSk7XG5jb25zb2xlLmxvZyhcInByb2R1Y3Rpb24gcmVwb3J0XCIsIHByb3BzLnJlcG9ydHMpO1xuY29uc3QgYmFrZXJSZXBvcnRzID0gcHJvcHMucmVwb3J0cy5iYWtlcl9yZXBvcnRzO1xuY29uc3Qgc2FsZXNSZXBvcnRzID0gcHJvcHMucmVwb3J0cy5zYWxlc19yZXBvcnRzO1xuXG5jb25zdCBlbWl0ID0gZGVmaW5lRW1pdHMoW1wic2VsZWN0UmVwb3J0XCIsIFwiaGlkZVwiLCBcIm9rXCIsIFwiY2FuY2VsXCJdKTsgLy8gRGVjbGFyZSBlbWl0c1xuXG5jb25zdCB0YWIgPSByZWYoXCJiYWtlclJlcG9ydFwiKTtcbmNvbnN0IG1heGltaXplZFRvZ2dsZSA9IHJlZih0cnVlKTtcbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IGNhcGl0YWxpemVGaXJzdExldHRlciA9IChsb2NhdGlvbikgPT4ge1xuICBpZiAoIWxvY2F0aW9uKSByZXR1cm4gXCJcIjtcbiAgcmV0dXJuIGxvY2F0aW9uXG4gICAgLnNwbGl0KFwiIFwiKVxuICAgIC5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkpXG4gICAgLmpvaW4oXCIgXCIpO1xufTtcbmNvbnN0IGhhbmRsZUJ1dHRvbkNsaWNrID0gKCkgPT4ge1xuICBlbWl0KFwic2VsZWN0UmVwb3J0XCIsIHByb3BzLnJlcG9ydHMpO1xuICBkaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XG4udXNlci1jYXJkIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMzMztcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XG59XG5cbi51c2VyLWNhcmQ6aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTVweCk7XG4gIGJveC1zaGFkb3c6IDBweCA2cHggMTVweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xufVxuPC9zdHlsZT5cbiIsImltcG9ydCB7IGRlZmluZVN0b3JlIH0gZnJvbSBcInBpbmlhXCI7XG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwic3JjL2Jvb3QvYXhpb3NcIjtcbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcblxuZXhwb3J0IGNvbnN0IHVzZVByb2R1Y3Rpb25TdG9yZSA9IGRlZmluZVN0b3JlKFwicHJvZHVjdGlvbnNcIiwgKCkgPT4ge1xuICBjb25zdCBwcm9kdWN0aW9ucyA9IHJlZihbXSk7XG4gIGNvbnN0IHByb2R1Y3Rpb24gPSByZWYoW10pO1xuXG4gIGNvbnN0IGZldGNoQWxsUHJvZHVjdGlvbiA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoXCIvYXBpL2JyYW5jaC1wcm9kdWN0aW9uLXJlcG9ydFwiKTtcbiAgICBwcm9kdWN0aW9ucy52YWx1ZSA9IHJlc3BvbnNlLmRhdGEucmVwb3J0cztcbiAgfTtcblxuICBjb25zdCBmZXRjaEJyYW5jaFByb2R1Y3Rpb25zID0gYXN5bmMgKGJyYW5jaElkKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChcbiAgICAgICAgYC9hcGkvYnJhbmNoZXMvJHticmFuY2hJZH0vcHJvZHVjdGlvbi1yZXBvcnRgXG4gICAgICApO1xuICAgICAgcHJvZHVjdGlvbnMudmFsdWUgPSByZXNwb25zZS5kYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcHJvZHVjdGlvbnMsXG4gICAgcHJvZHVjdGlvbixcbiAgICBmZXRjaEFsbFByb2R1Y3Rpb24sXG4gICAgZmV0Y2hCcmFuY2hQcm9kdWN0aW9ucyxcbiAgfTtcbn0pO1xuIiwiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxxLWlucHV0XG4gICAgICB2LW1vZGVsPVwiZmlsdGVyXCJcbiAgICAgIGNsYXNzPVwicS1wYi1sZyBxLXBsLW1kXCJcbiAgICAgIG91dGxpbmVkXG4gICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgICBmbGF0XG4gICAgICByb3VuZGVkXG4gICAgICBkZW5zZVxuICAgICAgZGVib3VuY2U9XCIxMDBcIlxuICAgICAgc3R5bGU9XCJ3aWR0aDogNTAwcHg7IG1heC13aWR0aDogMTUwMHB4OyBtaW4td2lkdGg6IDEwMHB4XCJcbiAgICA+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgPHEtaWNvbiBuYW1lPVwic2VhcmNoXCIgLz5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9xLWlucHV0PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInNwaW5uZXItd3JhcHBlclwiIHYtaWY9XCJsb2FkaW5nXCI+XG4gICAgPHEtc3Bpbm5lci1kb3RzIHNpemU9XCI1MHB4XCIgY29sb3I9XCJwcmltYXJ5XCIgLz5cbiAgPC9kaXY+XG4gIDxkaXYgdi1lbHNlPlxuICAgIDxkaXYgdi1pZj1cImZpbHRlcmVkUm93cy5sZW5ndGggPT09IDBcIiBjbGFzcz1cImRhdGEtZXJyb3JcIj5cbiAgICAgIDxxLWljb24gbmFtZT1cIndhcm5pbmdcIiBjb2xvcj1cIndhcm5pbmdcIiBzaXplPVwiNGVtXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJxLW1sLXNtIHRleHQtaDZcIj5ObyBkYXRhIGF2YWlsYWJsZTwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxxLXRhYmxlXG4gICAgICB2LWVsc2VcbiAgICAgIGNsYXNzPVwidGFibGUtY29udGFpbmVyIHN0aWNreS1oZWFkZXJcIlxuICAgICAgOmZpbHRlcj1cImZpbHRlclwiXG4gICAgICA6dmlydHVhbC1zY3JvbGwtc3RpY2t5LXNpemUtc3RhcnQ9XCI0OFwiXG4gICAgICBmbGF0XG4gICAgICBzdHlsZT1cImhlaWdodDogNDAwcHhcIlxuICAgICAgOmNvbHVtbnM9XCJwcm9kdWN0c0NvbHVtblwiXG4gICAgICA6cm93cz1cImZpbHRlcmVkUm93c1wiXG4gICAgICByb3cta2V5PVwicmVwb3J0RGF0ZVwiXG4gICAgICB2aXJ0dWFsLXNjcm9sbFxuICAgICAgdi1tb2RlbDpwYWdpbmF0aW9uPVwicGFnaW5hdGlvblwiXG4gICAgICA6cm93cy1wZXItcGFnZS1vcHRpb25zPVwiWzBdXCJcbiAgICAgIGhpZGUtYm90dG9tXG4gICAgPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtcmVwb3J0cz1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWNlbnRlciBxLWd1dHRlci14LW1kXCI+XG4gICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgcGFkZGluZz1cInhzIGxnXCJcbiAgICAgICAgICAgICAgcm91bmRlZFxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICBjb2xvcj1cImxpZ2h0LWJsdWUtNVwiXG4gICAgICAgICAgICAgIHRleHQtY29sb3I9XCJ3aGl0ZVwiXG4gICAgICAgICAgICAgIEBjbGljaz1cImhhbmRsZURpYWxvZyhwcm9wcy5yb3cuQU0sICdBTScpXCJcbiAgICAgICAgICAgICAgPkFNPC9xLWJ0blxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgIHBhZGRpbmc9XCJ4cyBsZ1wiXG4gICAgICAgICAgICAgIHJvdW5kZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICAgICAgY29sb3I9XCJkZWVwLW9yYW5nZVwiXG4gICAgICAgICAgICAgIHRleHQtY29sb3I9XCJ3aGl0ZVwiXG4gICAgICAgICAgICAgIEBjbGljaz1cImhhbmRsZURpYWxvZyhwcm9wcy5yb3cuUE0sICdQTScpXCJcbiAgICAgICAgICAgICAgPlBNPC9xLWJ0blxuICAgICAgICAgICAgPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS10YWJsZT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFByb2R1Y3Rpb25SZXBvcnREaWFsb2cgZnJvbSBcIi4vUHJvZHVjdGlvblJlcG9ydERpYWxvZy52dWVcIjtcbmltcG9ydCB7IHJlZiwgd2F0Y2gsIG9uTW91bnRlZCwgY29tcHV0ZWQsIHJlYWN0aXZlIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgZGF0ZSwgdXNlUXVhc2FyIH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgdXNlUHJvZHVjdGlvblN0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvcHJvZHVjdGlvblwiO1xuaW1wb3J0IHsgdXNlUm91dGUgfSBmcm9tIFwidnVlLXJvdXRlclwiO1xuXG5jb25zdCByb3V0ZSA9IHVzZVJvdXRlKCk7XG5jb25zdCB0YWIgPSByZWYoXCJiYWtlclJlcG9ydFwiKTtcbmNvbnN0IGJyYW5jaElkID0gcm91dGUucGFyYW1zLmJyYW5jaF9pZDtcbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5jb25zdCBtYXhpbWl6ZWRUb2dnbGUgPSByZWYodHJ1ZSk7XG5jb25zdCBzZWxlY3RlZFBlcmlvZCA9IHJlZihcIlwiKTtcbmNvbnN0IGJyYW5jaE5hbWUgPSByZWYoXCJcIik7XG5cbmNvbnN0IHBhZ2luYXRpb24gPSByZWYoe1xuICByb3dzUGVyUGFnZTogMCxcbn0pO1xuY29uc3QgcHJvZHVjdGlvblN0b3JlID0gdXNlUHJvZHVjdGlvblN0b3JlKCk7XG5jb25zdCBmaWx0ZXIgPSByZWYoXCJcIik7XG5jb25zdCBwcm9kdWN0aW9uUm93cyA9IGNvbXB1dGVkKCgpID0+IHByb2R1Y3Rpb25TdG9yZS5wcm9kdWN0aW9ucyk7XG5jb25zdCBpc0xvYWRpbmcgPSByZWYodHJ1ZSk7XG5jb25zdCBsb2FkaW5nID0gcmVmKHRydWUpO1xuY29uc3Qgc2hvd05vRGF0YU1lc3NhZ2UgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBmaWx0ZXJlZFJvd3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmICghZmlsdGVyLnZhbHVlKSB7XG4gICAgcmV0dXJuIHByb2R1Y3Rpb25Sb3dzLnZhbHVlO1xuICB9XG4gIHJldHVybiBwcm9kdWN0aW9uUm93cy52YWx1ZS5maWx0ZXIoKHJvdykgPT5cbiAgICByb3cubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGZpbHRlci52YWx1ZS50b0xvd2VyQ2FzZSgpKVxuICApO1xufSk7XG5cbm9uTW91bnRlZChhc3luYyAoKSA9PiB7XG4gIGlmIChicmFuY2hJZCkge1xuICAgIGF3YWl0IHJlbG9hZFRhYmxlRGF0YShicmFuY2hJZCk7XG4gIH1cbn0pO1xuXG5jb25zdCByZWxvYWRUYWJsZURhdGEgPSBhc3luYyAoYnJhbmNoSWQpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHByb2R1Y3Rpb25TdG9yZS5mZXRjaEJyYW5jaFByb2R1Y3Rpb25zKGJyYW5jaElkKTtcblxuICAgIGNvbnNvbGUubG9nKFwiRmV0Y2hlZCBkYXRhOlwiLCByZXNwb25zZSk7IC8vIExvZyB0aGUgcmF3IHJlc3BvbnNlIGRhdGFcbiAgICBjb25zb2xlLmxvZyhcIlByb2R1Y3Rpb24gcm93czpcIiwgcHJvZHVjdGlvblJvd3MudmFsdWUpOyAvLyBMb2cgdGhlIGNvbXB1dGVkIHByb2R1Y3Rpb24gcm93c1xuXG4gICAgaWYgKCFwcm9kdWN0aW9uUm93cy52YWx1ZS5sZW5ndGgpIHtcbiAgICAgIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gdHJ1ZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSB0cnVlO1xuICB9IGZpbmFsbHkge1xuICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgfVxufTtcblxud2F0Y2goZmlsdGVyLCBhc3luYyAobmV3RmlsdGVyKSA9PiB7XG4gIGxvYWRpbmcudmFsdWUgPSB0cnVlO1xuICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKSk7XG4gIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSBmaWx0ZXJlZFJvd3MudmFsdWUubGVuZ3RoID09PSAwO1xufSk7XG5cbmNvbnN0IGZvcm1hdERhdGUgPSAoZGF0ZVN0cmluZykgPT4ge1xuICByZXR1cm4gZGF0ZS5mb3JtYXREYXRlKGRhdGVTdHJpbmcsIFwiTU1NTSBERCwgWVlZWVwiKTtcbn07XG5cbmNvbnN0IHByb2R1Y3RzQ29sdW1uID0gW1xuICB7XG4gICAgbmFtZTogXCJyZXBvcnREYXRlXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgbGFiZWw6IFwiRGF0ZVwiLFxuICAgIGZpZWxkOiBcImRhdGVcIixcbiAgICBmb3JtYXQ6IGZvcm1hdERhdGUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInJlcG9ydHNcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBsYWJlbDogXCJSZXBvcnRzXCIsXG4gICAgZmllbGQ6IFwicmVwb3J0c1wiLFxuICB9LFxuXTtcblxuY29uc3QgJHEgPSB1c2VRdWFzYXIoKTtcbi8vIGNvbnN0IGNoaXBPbkNsaWNrID0gKHJlcG9ydCkgPT4ge1xuLy8gICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIFJlcG9ydDpcIiwgcmVwb3J0KTtcbi8vICAgaGFuZGxlRGlhbG9nKHJlcG9ydCk7XG4vLyB9O1xuXG5jb25zdCBoYW5kbGVEaWFsb2cgPSAocmVwb3J0LCBsYWJlbCkgPT4ge1xuICAkcS5kaWFsb2coe1xuICAgIGNvbXBvbmVudDogUHJvZHVjdGlvblJlcG9ydERpYWxvZyxcbiAgICBjb21wb25lbnRQcm9wczoge1xuICAgICAgcmVwb3J0czogcmVwb3J0LCAvLyBQYXNzIHRoZSByZXBvcnQgZGF0YSB0byB0aGUgZGlhbG9nIGNvbXBvbmVudFxuICAgICAgcmVwb3J0TGFiZWw6IGxhYmVsLFxuICAgIH0sXG4gIH0pO1xufTtcbjwvc2NyaXB0PlxuPHN0eWxlIHNjb3BlZD5cbi5lbGVnYW50LWNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQ6ICNmN2Y4ZmM7XG4gIHBhZGRpbmc6IDJyZW07XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbn1cbi5hYnNvbHV0ZS1mdWxsIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG59XG4uc3Bpbm5lci13cmFwcGVyIHtcbiAgbWluLWhlaWdodDogNDB2aDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uZGF0YS1lcnJvciB7XG4gIG1pbi1oZWlnaHQ6IDQwdmg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLm15LXN0aWNreS1keW5hbWljIHtcbiAgaGVpZ2h0OiA0MTBweDtcbn1cblxuLm15LXN0aWNreS1keW5hbWljIC5xLXRhYmxlX190b3AsXG4ubXktc3RpY2t5LWR5bmFtaWMgLnEtdGFibGVfX2JvdHRvbSxcbi5teS1zdGlja3ktZHluYW1pYyB0aGVhZCB0cjpmaXJzdC1jaGlsZCB0aCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG59XG5cbi5teS1zdGlja3ktZHluYW1pYyB0aGVhZCB0ciB0aCB7XG4gIHBvc2l0aW9uOiBzdGlja3k7XG4gIHotaW5kZXg6IDE7XG59XG5cbi5teS1zdGlja3ktZHluYW1pYyB0aGVhZCB0cjpsYXN0LWNoaWxkIHRoIHtcbiAgdG9wOiA0OHB4O1xufVxuXG4ubXktc3RpY2t5LWR5bmFtaWMgdGhlYWQgdHI6Zmlyc3QtY2hpbGQgdGgge1xuICB0b3A6IDA7XG59XG5cbi5teS1zdGlja3ktZHluYW1pYyB0Ym9keSB7XG4gIHNjcm9sbC1tYXJnaW4tdG9wOiA0OHB4O1xufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtYnRuXG4gICAgb3V0bGluZVxuICAgIGNsYXNzPVwidGV4dC1kYXJrIHEtcGEtc21cIlxuICAgIHB1c2hcbiAgICBkZW5zZVxuICAgIGVsZXZhdGVkXG4gICAgaWNvbj1cImFkZF9jaXJjbGVcIlxuICAgIGxhYmVsPVwiQ3JlYXRlIEJyYW5jaCBSZWNpcGVcIlxuICAgIEBjbGljaz1cIm9wZW5EaWFsb2dcIlxuICAvPlxuXG4gIDxxLWRpYWxvZyB2LW1vZGVsPVwiZGlhbG9nXCI+XG4gICAgPHEtY2FyZFxuICAgICAgY2xhc3M9XCJteS1jYXJkXCJcbiAgICAgIHN0eWxlPVwid2lkdGg6IDQwMHB4OyBtYXgtd2lkdGg6IDUwMHB4OyBtaW4td2lkdGg6IDEwMHB4XCJcbiAgICA+XG4gICAgICA8cS1jYXJkLXNlY3Rpb25cbiAgICAgICAgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHRleHQtd2hpdGVcIlxuICAgICAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNlZjQ0NDRcIlxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPkNyZWF0ZSBCcmFuY2ggUmVjaXBlPC9kaXY+XG4gICAgICAgIDxxLXNwYWNlIC8+XG4gICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IGRlbnNlIHJvdW5kIHYtY2xvc2UtcG9wdXAgLz5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW1iLWxnXCI+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJzZWFyY2hRdWVyeVwiXG4gICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwic2VhcmNoXCJcbiAgICAgICAgICAgIGRlYm91bmNlPVwiMTAwMFwiXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgcm91bmRlZFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggcmVjaXBlXCJcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwic2VhcmNoXCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPGRpdiB2LWlmPVwic2VhcmNoUXVlcnlcIiBjbGFzcz1cImN1c3RvbS1saXN0IHotdG9wXCI+XG4gICAgICAgICAgICAgIDxxLWNhcmQ+XG4gICAgICAgICAgICAgICAgPHEtbGlzdCBzZXBhcmF0b3I+XG4gICAgICAgICAgICAgICAgICA8cS1pdGVtIHYtaWY9XCIhcmVjaXBlc0RhdGE/Lmxlbmd0aFwiPlxuICAgICAgICAgICAgICAgICAgICBObyByZWNvcmQgZm91bmQuXG4gICAgICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJhdXRvZmlsbFJlY2lwZShyZWNpcGUpXCJcbiAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cInJlY2lwZSBpbiByZWNpcGVzRGF0YVwiXG4gICAgICAgICAgICAgICAgICAgICAgOmtleT1cInJlY2lwZS5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhcGl0YWxpemVGaXJzdExldHRlcihyZWNpcGUubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW1iLXNtXCI+XG4gICAgICAgICAgPGRpdj5SZWNpcGUgTmFtZTwvZGl2PlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICB2LW1vZGVsPVwiYWRkQnJhbmNoUmVjaXBlLnJlY2lwZV9uYW1lXCJcbiAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtbWItbGdcIj5cbiAgICAgICAgICA8ZGl2PkNhdGVnb3J5PC9kaXY+XG4gICAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cImFkZEJyYW5jaFJlY2lwZS5jYXRlZ29yeVwiIHJlYWRvbmx5IGRlbnNlIG91dGxpbmVkIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJhZGRCcmFuY2hSZWNpcGUudGFyZ2V0XCJcbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgc3VmZml4PVwiIC8gMWtnXCJcbiAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgbGFiZWw9XCJUYXJnZXQgUGNzXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDwhLS0gOnJ1bGVzPVwiW1xuICAgICAgICAgICAgICAodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnVGFyZ2V0IHBpZWNlL3MgaXMgcmVxdWlyZWQnLFxuICAgICAgICAgICAgXVwiIC0tPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2PkJyZWFkczwvZGl2PlxuICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgdi1tb2RlbD1cImJyZWFkR3JvdXBcIlxuICAgICAgICAgICAgdXNlLWlucHV0XG4gICAgICAgICAgICB1c2UtY2hpcHNcbiAgICAgICAgICAgIGNoaXBzLWNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICBtdWx0aXBsZVxuICAgICAgICAgICAgaW5wdXQtZGVib3VuY2U9XCIwXCJcbiAgICAgICAgICAgIDpvcHRpb25zPVwiZmlsdGVyQnJlYWRPcHRpb25zXCJcbiAgICAgICAgICAgIGJlaGF2aW9yPVwibWVudVwiXG4gICAgICAgICAgICBoaWRlLWRyb3Bkb3duLWljb25cbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgbGFiZWw9XCJCcmVhZC9zXCJcbiAgICAgICAgICAgIEBuZXctdmFsdWU9XCJjcmVhdGVWYWx1ZVwiXG4gICAgICAgICAgICBAZmlsdGVyPVwiZmlsdGVyRm5cIlxuICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+ICh2YWwgJiYgdmFsLmxlbmd0aCA+IDApIHx8ICdCcmVhZCBpcyByZXF1aXJlZCddXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8IS0tIEBuZXctdmFsdWU9XCJjcmVhdGVWYWx1ZVwiIEBmaWx0ZXI9XCJmaWx0ZXJCcmVhZFwiXG4gICAgICAgICAgICBAZmlsdGVyLWFib3J0PVwiYWJvcnRGaWx0ZXJGblwiIC0tPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpuby1vcHRpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwidGV4dC1ncmV5XCI+IE5vIHJlc3VsdHMgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDwvcS1zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1tZCBxLWd1dHRlci15LXNtXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LXRoaW5cIj5JbmdyZWRpZW50cyBMaXN0PC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxxLWxpc3QgZGVuc2Ugc2VwYXJhdG9yIGNsYXNzPVwiYm94XCI+XG4gICAgICAgICAgICAgIDxxLWl0ZW1cbiAgICAgICAgICAgICAgICB2LWZvcj1cIihpbmdyZWRpZW50LCBpbmRleCkgaW4gaW5ncmVkaWVudEdyb3VwXCJcbiAgICAgICAgICAgICAgICA6a2V5PVwiaW5kZXhcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD57eyBpbmdyZWRpZW50LmxhYmVsIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb25cbiAgICAgICAgICAgICAgICAgID57eyBpbmdyZWRpZW50LnF1YW50aXR5IH19XG4gICAgICAgICAgICAgICAgICB7eyBpbmdyZWRpZW50LnVuaXQgfX08L3EtaXRlbS1zZWN0aW9uXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBzaWRlPlxuICAgICAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgICAgIEBjbGljaz1cInJlbW92ZUluZ3JlZGllbnQoaW5kZXgpXCJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJncmV5LTEwXCJcbiAgICAgICAgICAgICAgICAgICAgaWNvbj1cImJhY2tzcGFjZVwiXG4gICAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICAgICAgcm91bmRcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICA8L3EtbGlzdD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LXhsIHEtZ3V0dGVyLXktc21cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBhbGlnbj1cImNlbnRlclwiPkluZ3JlZGllbnRzPC9kaXY+XG4gICAgICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJzZWxlY3RlZEluZ3JlZGllbnRzLm5hbWVcIlxuICAgICAgICAgICAgICAgIGRlYm91bmNlPVwiMzAwMFwiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBjaGlwcy1jb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgIDpvcHRpb25zPVwiZmlsdGVySW5ncmVkaWVudHNPcHRpb25zXCJcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIGxhYmVsPVwiSW5ncmVkaWVudHNcIlxuICAgICAgICAgICAgICAgIGJlaGF2aW9yPVwibWVudVwiXG4gICAgICAgICAgICAgICAgdXNlLWlucHV0XG4gICAgICAgICAgICAgICAgaGlkZS1kcm9wZG93bi1pY29uXG4gICAgICAgICAgICAgICAgQGZpbHRlcj1cImZpbHRlckluZ3JlZGllbnRzXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAyMTVweDsgbWF4LXdpZHRoOiA0NTBweDsgbWluLXdpZHRoOiA4MHB4XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6bm8tb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwidGV4dC1ncmV5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgTm8gcmVzdWx0c1xuICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgPC9xLXNlbGVjdD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGFsaWduPVwiY2VudGVyXCI+UXVhbnRpdHk8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwic2VsZWN0ZWRJbmdyZWRpZW50cy5xdWFudGl0eVwiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBtYXNrPVwiIyMjIyNcIlxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJRdWFudGl0eVwiXG4gICAgICAgICAgICAgICAgOnN1ZmZpeD1cInNlbGVjdGVkSW5ncmVkaWVudHMubmFtZS51bml0IHx8ICcnXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMTVweFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8Zm9ybSBAa2V5dXAuZW50ZXIucHJldmVudD1cImFkZEluZ3JlZGllbnRzXCI+XG4gICAgICAgICAgICA8ZGl2IGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgcGFkZGluZz1cInhzIG1kXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICAgIG91dGxpbmVcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIGxhYmVsPVwiYWRkXCJcbiAgICAgICAgICAgICAgICBpY29uPVwiYWRkXCJcbiAgICAgICAgICAgICAgICBjb2xvcj1cInB1cnBsZVwiXG4gICAgICAgICAgICAgICAgQGNsaWNrPVwiYWRkSW5ncmVkaWVudHNcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLWFjdGlvbnMgY2xhc3M9XCJyb3cgcS1tYS1tZFwiIGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgPHEtYnRuIGNsYXNzPVwiZ2xvc3N5XCIgY29sb3I9XCJncmV5LTlcIiBsYWJlbD1cIkRpc21pc3NcIiBAY2xpY2s9XCJkaXNtaXNzXCIgLz5cbiAgICAgICAgPHEtYnRuXG4gICAgICAgICAgY2xhc3M9XCJnbG9zc3lcIlxuICAgICAgICAgIGNvbG9yPVwidGVhbFwiXG4gICAgICAgICAgbGFiZWw9XCJDcmVhdGVcIlxuICAgICAgICAgIEBjbGljaz1cInNhdmVcIlxuICAgICAgICAgIDpkaXNhYmxlPVwiIWlzRm9ybVZhbGlkXCJcbiAgICAgICAgLz5cbiAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgY29tcHV0ZWQsIHJlYWN0aXZlLCByZWYsIHdhdGNoIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgdXNlUmVjaXBlU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9yZWNpcGVcIjtcbmltcG9ydCB7IHVzZVByb2R1Y3RzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9wcm9kdWN0XCI7XG5pbXBvcnQgeyB1c2VSYXdNYXRlcmlhbHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3Jhdy1tYXRlcmlhbFwiO1xuaW1wb3J0IHsgdXNlUm91dGUgfSBmcm9tIFwidnVlLXJvdXRlclwiO1xuaW1wb3J0IHsgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgdXNlQnJhbmNoUmVjaXBlU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9icmFuY2gtcmVjaXBlXCI7XG5cbmNvbnN0IHJvdXRlID0gdXNlUm91dGUoKTtcbmNvbnN0IGJyYW5jaElkID0gcm91dGUucGFyYW1zLmJyYW5jaF9pZDtcbmNvbnN0IHJlY2lwZVN0b3JlID0gdXNlUmVjaXBlU3RvcmUoKTtcbmNvbnN0IHJlY2lwZXNEYXRhID0gY29tcHV0ZWQoKCkgPT4gcmVjaXBlU3RvcmUucmVjaXBlcyk7XG5jb25zdCBicmFuY2hSZWNpcGVTdG9yZSA9IHVzZUJyYW5jaFJlY2lwZVN0b3JlKCk7XG5jb25zdCBicmVhZFByb2R1Y3RTdG9yZSA9IHVzZVByb2R1Y3RzU3RvcmUoKTtcbmNvbnN0IGluZ3JlZGllbnRzU3RvcmUgPSB1c2VSYXdNYXRlcmlhbHNTdG9yZSgpO1xuY29uc3QgYnJhbmNoUmVjaXBlUm93cyA9IGNvbXB1dGVkKCgpID0+IGJyYW5jaFJlY2lwZVN0b3JlLmJyYW5jaFJlY2lwZXMpO1xuXG5jb25zdCBkaWFsb2cgPSByZWYoZmFsc2UpO1xuY29uc3Qgb3BlbkRpYWxvZyA9ICgpID0+IHtcbiAgZGlhbG9nLnZhbHVlID0gdHJ1ZTtcbn07XG5jb25zdCBkaXNtaXNzID0gKCkgPT4ge1xuICBjbGVhckZvcm0oKTtcbiAgZGlhbG9nLnZhbHVlID0gZmFsc2U7XG59O1xuXG5jb25zdCBjYXBpdGFsaXplRmlyc3RMZXR0ZXIgPSAobG9jYXRpb24pID0+IHtcbiAgaWYgKCFsb2NhdGlvbikgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBsb2NhdGlvblxuICAgIC5zcGxpdChcIiBcIilcbiAgICAubWFwKCh3b3JkKSA9PiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpKVxuICAgIC5qb2luKFwiIFwiKTtcbn07XG5cbmNvbnN0IHNlYXJjaFF1ZXJ5ID0gcmVmKFwiXCIpO1xuY29uc3Qgc2VhcmNoID0gYXN5bmMgKCkgPT4ge1xuICByZWNpcGVTdG9yZS5zZWFyY2hSZWNpcGUoc2VhcmNoUXVlcnkudmFsdWUpO1xufTtcblxuY29uc3QgaXNGb3JtVmFsaWQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiBhZGRCcmFuY2hSZWNpcGUudGFyZ2V0ICE9PSAwO1xufSk7XG5cbmNvbnN0IGF1dG9maWxsUmVjaXBlID0gKGRhdGEpID0+IHtcbiAgYWRkQnJhbmNoUmVjaXBlLnJlY2lwZV9pZCA9IGRhdGEuaWQ7XG4gIGFkZEJyYW5jaFJlY2lwZS5yZWNpcGVfbmFtZSA9IGRhdGEubmFtZTtcbiAgYWRkQnJhbmNoUmVjaXBlLmNhdGVnb3J5ID0gZGF0YS5jYXRlZ29yeTtcbiAgc2VhcmNoUXVlcnkudmFsdWUgPSBcIlwiO1xufTtcblxuY29uc3QgYWRkQnJhbmNoUmVjaXBlID0gcmVhY3RpdmUoe1xuICByZWNpcGVfaWQ6IFwiXCIsXG4gIHJlY2lwZV9uYW1lOiBcIlwiLFxuICBjYXRlZ29yeTogXCJcIixcbiAgdGFyZ2V0OiBcIlwiLFxuICBicmFuY2hlc19pZDogcm91dGUucGFyYW1zLmJyYW5jaF9pZCxcbn0pO1xuXG5jb25zdCBsb2FkaW5nID0gcmVmKGZhbHNlKTtcbmNvbnN0IGJyZWFkR3JvdXAgPSByZWYobnVsbCk7XG5jb25zdCBicmVhZE9wdGlvbnMgPSByZWYoW10pO1xuY29uc3QgZmlsdGVyQnJlYWRPcHRpb25zID0gcmVmKGJyZWFkT3B0aW9ucy52YWx1ZSk7XG5jb25zdCBpbmdyZWRpZW50R3JvdXAgPSByZWYoW10pO1xuY29uc3QgaW5ncmVkaWVudE9wdGlvbnMgPSByZWYoW10pO1xuXG5jb25zdCBzZWxlY3RlZEluZ3JlZGllbnRzID0gcmVhY3RpdmUoe1xuICBuYW1lOiBcIlwiLFxuICBxdWFudGl0eTogXCJcIixcbn0pO1xuXG5jb25zdCBmaWx0ZXJJbmdyZWRpZW50c09wdGlvbnMgPSByZWYoaW5ncmVkaWVudE9wdGlvbnMudmFsdWUpO1xuXG5jb25zdCBmZXRjaEJyZWFkc0RhdGEgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGJyZWFkcyA9IGF3YWl0IGJyZWFkUHJvZHVjdFN0b3JlLmZldGNoUHJvZHVjdHNCeUNhdGVnb3J5KFwiQnJlYWRcIik7XG5cbiAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICBicmVhZE9wdGlvbnMudmFsdWUgPSBicmVhZFByb2R1Y3RTdG9yZS5icmVhZHMubWFwKCh2YWwpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbGFiZWw6IHZhbC5uYW1lLFxuICAgICAgdmFsdWU6IHZhbC5pZCxcbiAgICB9O1xuICB9KTtcbn07XG5mZXRjaEJyZWFkc0RhdGEoKTtcblxuY29uc3QgZmV0Y2hJbmdyZWRpZW50c0RhdGEgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGluZ3JlZGllbnQgPSBhd2FpdCBpbmdyZWRpZW50c1N0b3JlLmZldGNoSW5ncmVkaWVudHMoXCJJbmdyZWRpZW50c1wiKTtcbiAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICBpbmdyZWRpZW50T3B0aW9ucy52YWx1ZSA9IGluZ3JlZGllbnRzU3RvcmUuaW5ncmVkaWVudHMubWFwKCh2YWwpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbGFiZWw6IHZhbC5uYW1lLFxuICAgICAgdmFsdWU6IHZhbC5pZCxcbiAgICAgIHVuaXQ6IHZhbC51bml0LFxuICAgIH07XG4gIH0pO1xufTtcbmZldGNoSW5ncmVkaWVudHNEYXRhKCk7XG5cbmNvbnN0IGNsZWFyRGF0YSA9ICgpID0+IHtcbiAgKHNlbGVjdGVkSW5ncmVkaWVudHMubmFtZSA9IFwiXCIpLCAoc2VsZWN0ZWRJbmdyZWRpZW50cy5xdWFudGl0eSA9IFwiXCIpO1xufTtcblxuY29uc3QgY3JlYXRlVmFsdWUgPSAodmFsLCBkb25lKSA9PiB7XG4gIGlmICh2YWwubGVuZ3RoID4gMikge1xuICAgIGlmICghYnJlYWRPcHRpb25zLnZhbHVlLmluY2x1ZGVzKHZhbCkpIHtcbiAgICAgIGRvbmUodmFsLCBcImFkZC11bmlxdWVcIik7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBmaWx0ZXJGbiA9ICh2YWwsIHVwZGF0ZSkgPT4ge1xuICB1cGRhdGUoKCkgPT4ge1xuICAgIGlmICh2YWwgPT09IFwiXCIpIHtcbiAgICAgIGZpbHRlckJyZWFkT3B0aW9ucy52YWx1ZSA9IGJyZWFkT3B0aW9ucy52YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmVlZGxlID0gdmFsLnRvTG93ZXJDYXNlKCk7XG4gICAgICBmaWx0ZXJCcmVhZE9wdGlvbnMudmFsdWUgPSBicmVhZE9wdGlvbnMudmFsdWUuZmlsdGVyKFxuICAgICAgICAodikgPT4gdi5sYWJlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2YobmVlZGxlKSA+IC0xXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVWYWx1ZUluZ3JlZGllbnQgPSAodmFsLCBkb25lKSA9PiB7XG4gIGlmICh2YWwubGVuZ3RoID4gMikge1xuICAgIGlmICghaW5ncmVkaWVudE9wdGlvbnMudmFsdWUuaW5jbHVkZXModmFsKSkge1xuICAgICAgZG9uZSh2YWwsIFwiYWRkLXVuaXF1ZVwiKTtcbiAgICB9XG4gIH1cbn07XG5jb25zdCBmaWx0ZXJJbmdyZWRpZW50cyA9ICh2YWwsIHVwZGF0ZSkgPT4ge1xuICB1cGRhdGUoKCkgPT4ge1xuICAgIGlmICh2YWwgPT09IFwiXCIpIHtcbiAgICAgIGZpbHRlckluZ3JlZGllbnRzT3B0aW9ucy52YWx1ZSA9IGluZ3JlZGllbnRPcHRpb25zLnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZWVkbGUgPSB2YWwudG9Mb3dlckNhc2UoKTtcbiAgICAgIGZpbHRlckluZ3JlZGllbnRzT3B0aW9ucy52YWx1ZSA9IGluZ3JlZGllbnRPcHRpb25zLnZhbHVlLmZpbHRlcihcbiAgICAgICAgKHYpID0+IHYubGFiZWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5lZWRsZSkgPiAtMVxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgYWRkSW5ncmVkaWVudHMgPSAoKSA9PiB7XG4gIGNvbnN0IGRhdGEgPSBpbmdyZWRpZW50R3JvdXAudmFsdWU7XG5cbiAgZnVuY3Rpb24gZmluZE9iamVjdEJ5SWQoYXJyLCBpZCkge1xuICAgIHJldHVybiBhcnIuZmluZCgob2JqKSA9PiBvYmouaW5ncmVkaWVudHNfaWQgPT0gaWQpO1xuICB9XG4gIGNvbnN0IGlkVG9TZWFyY2ggPSBzZWxlY3RlZEluZ3JlZGllbnRzLm5hbWUudmFsdWU7XG5cbiAgY29uc3QgZm91bmRPYmplY3QgPSBmaW5kT2JqZWN0QnlJZChkYXRhLCBpZFRvU2VhcmNoKTtcbiAgaWYgKCFmb3VuZE9iamVjdCkge1xuICAgIGluZ3JlZGllbnRHcm91cC52YWx1ZSA9IFtcbiAgICAgIC4uLmRhdGEsXG4gICAgICB7XG4gICAgICAgIGluZ3JlZGllbnRzX2lkOiBzZWxlY3RlZEluZ3JlZGllbnRzLm5hbWUudmFsdWUsXG4gICAgICAgIGxhYmVsOiBzZWxlY3RlZEluZ3JlZGllbnRzLm5hbWUubGFiZWwsXG4gICAgICAgIHF1YW50aXR5OiBzZWxlY3RlZEluZ3JlZGllbnRzLnF1YW50aXR5LFxuICAgICAgICB1bml0OiBzZWxlY3RlZEluZ3JlZGllbnRzLm5hbWUudW5pdCxcbiAgICAgIH0sXG4gICAgXTtcbiAgICBjbGVhckRhdGEoKTtcbiAgfSBlbHNlIHtcbiAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgIHR5cGU6IFwibmVnYXRpdmVcIixcbiAgICAgIGljb246IFwid2FybmluZ1wiLFxuICAgICAgbWVzc2FnZTogXCJJbmdyZWRpZW50IGFscmVhZHkgZXhpc3RcIixcbiAgICAgIHRpbWVvdXQ6IDIwMDAsXG4gICAgfSk7XG4gICAgLy8gYWxlcnQoXCJpbmdyZWRpZW50IGFscmVhZHkgZXhpc3QhXCIpO1xuICB9XG59O1xuXG5jb25zdCByZW1vdmVJbmdyZWRpZW50ID0gKGluZGV4KSA9PiB7XG4gIGluZ3JlZGllbnRHcm91cC52YWx1ZS5zcGxpY2UoaW5kZXgsIDEpO1xufTtcblxud2F0Y2goXG4gICgpID0+IHNlbGVjdGVkSW5ncmVkaWVudHMubmFtZSxcbiAgKG5ld1ZhbCkgPT4ge1xuICAgIGlmIChuZXdWYWwgJiYgbmV3VmFsLnVuaXQpIHtcbiAgICAgIHNlbGVjdGVkSW5ncmVkaWVudHMudW5pdCA9IG5ld1ZhbC51bml0O1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWxlY3RlZEluZ3JlZGllbnRzLnVuaXQgPSBcIlwiO1xuICAgIH1cbiAgfVxuKTtcblxuY29uc3QgY2xlYXJSZWNpcGVEYXRhID0gKCkgPT4ge1xuICBhZGRCcmFuY2hSZWNpcGUucmVjaXBlX2lkID0gXCJcIjtcbiAgYWRkQnJhbmNoUmVjaXBlLnRhcmdldCA9IFwiXCI7XG4gIGJyZWFkR3JvdXAudmFsdWUgPSBudWxsO1xuICBpbmdyZWRpZW50R3JvdXAudmFsdWUgPSBbXTtcbiAgc2VsZWN0ZWRJbmdyZWRpZW50cy5uYW1lID0gXCJcIjtcbiAgc2VsZWN0ZWRJbmdyZWRpZW50cy5xdWFudGl0eSA9IFwiXCI7XG59O1xuXG5jb25zdCBzYXZlID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBuZXdEYXRhID0ge1xuICAgIHJlY2lwZV9pZDogYWRkQnJhbmNoUmVjaXBlLnJlY2lwZV9pZCxcbiAgICB0YXJnZXQ6IGFkZEJyYW5jaFJlY2lwZS50YXJnZXQsXG4gICAgc3RhdHVzOiBcImFjdGl2ZVwiLFxuICAgIGJyYW5jaF9pZDogYWRkQnJhbmNoUmVjaXBlLmJyYW5jaGVzX2lkLFxuICAgIGJyZWFkczogYnJlYWRHcm91cC52YWx1ZS5tYXAoKGJyZWFkKSA9PiAoe1xuICAgICAgYnJlYWRfaWQ6IGJyZWFkLnZhbHVlLFxuICAgIH0pKSxcbiAgICBpbmdyZWRpZW50czogaW5ncmVkaWVudEdyb3VwLnZhbHVlLm1hcCgoaW5ncmVkaWVudCkgPT4gKHtcbiAgICAgIGluZ3JlZGllbnRfaWQ6IGluZ3JlZGllbnQuaW5ncmVkaWVudHNfaWQsXG4gICAgICBxdWFudGl0eTogaW5ncmVkaWVudC5xdWFudGl0eSxcbiAgICB9KSksXG4gIH07XG4gIGNvbnNvbGUubG9nKFwiYnJhbmNoUmVjaXBlXCIsIG5ld0RhdGEpO1xuICBhd2FpdCBicmFuY2hSZWNpcGVTdG9yZS5zYXZlQnJhbmNoUmVjaXBlKG5ld0RhdGEpO1xuICBicmFuY2hSZWNpcGVSb3dzLnZhbHVlID0gYXdhaXQgYnJhbmNoUmVjaXBlU3RvcmUuZmV0Y2hCcmFuY2hSZWNpcGVzKGJyYW5jaElkKTtcbiAgY2xlYXJSZWNpcGVEYXRhKCk7XG4gIGRpYWxvZy52YWx1ZSA9IGZhbHNlO1xufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XG4uYm94IHtcbiAgYm9yZGVyOiAxcHggZGFzaGVkIGdyZXk7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1idG5cbiAgICBAY2xpY2s9XCJkZWxldGVEaWFsb2dcIlxuICAgIGNvbG9yPVwibmVnYXRpdmVcIlxuICAgIGljb249XCJkZWxldGVcIlxuICAgIHNpemU9XCJzbVwiXG4gICAgZmxhdFxuICAgIHJvdW5kXG4gICAgZGVuc2VcbiAgICBhcmlhLWxhYmVsPVwiRGVsZXRlXCJcbiAgPlxuICAgIDxxLXRvb2x0aXAgY2xhc3M9XCJiZy1uZWdhdGl2ZVwiIDpkZWxheT1cIjIwMFwiPkRlbGV0ZTwvcS10b29sdGlwPlxuICA8L3EtYnRuPlxuICA8cS1kaWFsb2cgdi1tb2RlbD1cImRpYWxvZ1Zpc2libGVcIiBwZXJzaXN0ZW50PlxuICAgIDxxLWNhcmQgY2xhc3M9XCJxLXBhLW1kIHEtcm91bmRlZCBxLWVsZXZhdGUtMiBiZy13aGl0ZSB0ZXh0LWdyZXktOVwiPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1wdC1ub25lIHEtcGItc21cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDUgcS1tYi14c1wiPkNvbmZpcm0gRGVsZXRpb248L2Rpdj5cbiAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LWJvZHkyIHEtbWItbm9uZVwiPlxuICAgICAgICAgIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBpdGVtPyBUaGlzIGFjdGlvbiBjYW5ub3QgYmVcbiAgICAgICAgICB1bmRvbmUuXG4gICAgICAgIDwvcD5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1zZXBhcmF0b3IgY2xhc3M9XCJxLW1iLW1kXCIgLz5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtY2FyZC1hY3Rpb25zIGFsaWduPVwicmlnaHRcIiBjbGFzcz1cInEtcHQtbm9uZVwiPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIGxhYmVsPVwiQ2FuY2VsXCJcbiAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICB2LWNsb3NlLXBvcHVwXG4gICAgICAgICAgICBjbGFzcz1cInEtbXItc21cIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgbGFiZWw9XCJEZWxldGVcIlxuICAgICAgICAgICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgICAgICAgICBAY2xpY2s9XCJvbkRlbGV0ZVwiXG4gICAgICAgICAgICBjbGFzcz1cInEtYnRuLXJvdW5kZWQgcS1weC1sZ1wiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgdXNlQnJhbmNoUmVjaXBlU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9icmFuY2gtcmVjaXBlXCI7XG5pbXBvcnQgeyBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5cbmNvbnN0IGJyYW5jaFJlY2lwZVN0b3JlID0gdXNlQnJhbmNoUmVjaXBlU3RvcmUoKTtcbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHMoW1wiZGVsZXRlXCJdKTtcbmNvbnN0IGRpYWxvZ1Zpc2libGUgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBkZWxldGVEaWFsb2cgPSAoKSA9PiB7XG4gIGRpYWxvZ1Zpc2libGUudmFsdWUgPSB0cnVlO1xufTtcblxuY29uc3Qgb25EZWxldGUgPSBhc3luYyAoKSA9PiB7XG4gIGF3YWl0IGJyYW5jaFJlY2lwZVN0b3JlLmRlbGV0ZVJlY2lwZShwcm9wcy5kZWxldGUucm93LmlkKTtcblxuICBkaWFsb2dWaXNpYmxlLnZhbHVlID0gZmFsc2U7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4ucS1jYXJkIHtcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgYm94LXNoYWRvdzogMCA4cHggMjRweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi5xLWNhcmQtc2VjdGlvbiB7XG4gIHBhZGRpbmc6IDI0cHggMzJweDtcbn1cblxuLnEtYnRuIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMgZWFzZSwgYm94LXNoYWRvdyAwLjJzIGVhc2U7XG59XG5cbi5xLWJ0bi1yb3VuZGVkIHtcbiAgYm9yZGVyLXJhZGl1czogNTBweDtcbn1cblxuLnEtYnRuOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG5cbi5xLWJ0bjphY3RpdmUge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG59XG5cbi50ZXh0LWg1IHtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLnRleHQtYm9keTIge1xuICBjb2xvcjogIzY2Njtcbn1cblxuLnEtZWxldmF0ZS0yIHtcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuLmJnLXdoaXRlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbn1cblxuLnRleHQtZ3JleS05IHtcbiAgY29sb3I6ICMzMzM7XG59XG5cbi5xLXNlcGFyYXRvciB7XG4gIGJvcmRlci1jb2xvcjogI2VlZTtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgPGRpdj5cbiAgICAgIDxxLWlucHV0XG4gICAgICAgIGNsYXNzPVwicS1wYi1sZyBxLXBsLW1kXCJcbiAgICAgICAgdi1tb2RlbD1cImZpbHRlclwiXG4gICAgICAgIG91dGxpbmVkXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgICAgZGVib3VuY2U9XCIxMDAwXCJcbiAgICAgICAgc3R5bGU9XCJ3aWR0aDogNDUwcHg7IG1heC13aWR0aDogMTUwMHB4OyBtaW4td2lkdGg6IDEwMHB4XCJcbiAgICAgICAgZmxhdFxuICAgICAgICBkZW5zZVxuICAgICAgICByb3VuZGVkXG4gICAgICA+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICAgIDxxLWljb24gbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8L3EtaW5wdXQ+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInEtbXktc21cIj5cbiAgICAgIDxSZWNpcGVDcmVhdGUgLz5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzcGlubmVyLXdyYXBwZXJcIiB2LWlmPVwibG9hZGluZ1wiPlxuICAgIDxxLXNwaW5uZXItZG90cyBzaXplPVwiNTBweFwiIGNvbG9yPVwicHJpbWFyeVwiIC8+XG4gIDwvZGl2PlxuICA8ZGl2IHYtZWxzZT5cbiAgICA8ZGl2IHYtaWY9XCJmaWx0ZXJlZFJvd3MubGVuZ3RoID09PSAwXCIgY2xhc3M9XCJkYXRhLWVycm9yXCI+XG4gICAgICA8cS1pY29uIG5hbWU9XCJ3YXJuaW5nXCIgY29sb3I9XCJ3YXJuaW5nXCIgc2l6ZT1cIjRlbVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1tbC1zbSB0ZXh0LWg2XCI+Tm8gZGF0YSBhdmFpbGFibGU8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8cS10YWJsZVxuICAgICAgdi1lbHNlXG4gICAgICBjbGFzcz1cInRhYmxlLWNvbnRhaW5lciBzdGlja3ktaGVhZGVyXCJcbiAgICAgIDpmaWx0ZXI9XCJmaWx0ZXJcIlxuICAgICAgOnZpcnR1YWwtc2Nyb2xsLXN0aWNreS1zaXplLXN0YXJ0PVwiNDhcIlxuICAgICAgZmxhdFxuICAgICAgOmNvbHVtbnM9XCJicmFuY2hSZWNpcGVDb2x1bW5zXCJcbiAgICAgIDpyb3dzPVwiZmlsdGVyZWRSb3dzXCJcbiAgICAgIHJvdy1rZXk9XCJuYW1lXCJcbiAgICAgIHZpcnR1YWwtc2Nyb2xsXG4gICAgICB2LW1vZGVsOnBhZ2luYXRpb249XCJwYWdpbmF0aW9uXCJcbiAgICAgIDpyb3dzLXBlci1wYWdlLW9wdGlvbnM9XCJbMF1cIlxuICAgICAgaGlkZS1ib3R0b21cbiAgICAgIHN0eWxlPVwiaGVpZ2h0OiAzNTBweFwiXG4gICAgPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtbmFtZT1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICB7eyBjYXBpdGFsaXplRmlyc3RMZXR0ZXIocHJvcHMucm93Lm5hbWUpIH19XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtY2F0ZWdvcnk9XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAge3sgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHByb3BzLnJvdy5jYXRlZ29yeSkgfX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC10YXJnZXQ9XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCBhdXRvLXdpZHRoIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXIgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgPnt7IHByb3BzLnJvdy50YXJnZXQgPyBwcm9wcy5yb3cudGFyZ2V0IDogXCJTZXQgVGFyZ2V0XCIgfX1cblxuICAgICAgICAgICAgPHEtdG9vbHRpcCBjbGFzcz1cImJnLWJsdWUtZ3JleS04XCIgOm9mZnNldD1cIlsxMCwgMTBdXCJcbiAgICAgICAgICAgICAgPkVkaXQgVGFyZ2V0PC9xLXRvb2x0aXBcbiAgICAgICAgICAgID5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHEtcG9wdXAtZWRpdFxuICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIih2YWwpID0+IHVwZGF0ZVJlY2lwZShwcm9wcy5yb3csIHZhbClcIlxuICAgICAgICAgICAgdi1tb2RlbD1cInByb3BzLnJvdy50YXJnZXRcIlxuICAgICAgICAgICAgYXV0by1zYXZlXG4gICAgICAgICAgICB2LXNsb3Q9XCJzY29wZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInNjb3BlLnZhbHVlXCJcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgc3VmZml4PVwicGNzXCJcbiAgICAgICAgICAgICAgYXV0b2ZvY3VzXG4gICAgICAgICAgICAgIGNvdW50ZXJcbiAgICAgICAgICAgICAgbWFzaz1cIiMjI1wiXG4gICAgICAgICAgICAgIEBrZXl1cC5lbnRlcj1cInNjb3BlLnNldFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvcS1wb3B1cC1lZGl0PlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtc3RhdHVzPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8cS1iYWRnZSBvdXRsaW5lIDpjb2xvcj1cImdldEJhZGdlU3RhdHVzQ29sb3IocHJvcHMucm93LnN0YXR1cylcIj5cbiAgICAgICAgICAgIHt7IGNhcGl0YWxpemVGaXJzdExldHRlcihwcm9wcy5yb3cuc3RhdHVzKSB9fVxuICAgICAgICAgICAgPHEtdG9vbHRpcCBjbGFzcz1cImJnLWJsdWUtZ3JleS04XCIgOm9mZnNldD1cIlsxMCwgMTBdXCJcbiAgICAgICAgICAgICAgPkNoYW5nZSBTdGF0dXM8L3EtdG9vbHRpcFxuICAgICAgICAgICAgPlxuICAgICAgICAgIDwvcS1iYWRnZT5cbiAgICAgICAgICA8cS1wb3B1cC1lZGl0XG4gICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwiKHZhbCkgPT4gdXBkYXRlUmVjaXBlU3RhdHVzKHByb3BzLnJvdywgdmFsKVwiXG4gICAgICAgICAgICB2LW1vZGVsPVwicHJvcHMucm93LnN0YXR1c1wiXG4gICAgICAgICAgICBhdXRvLXNhdmVcbiAgICAgICAgICAgIHYtc2xvdD1cInNjb3BlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3Bhbj4ge3sgcHJvcHMucm93Lm5hbWUgfX08L3NwYW4+XG4gICAgICAgICAgICA8cS1zZWxlY3RcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInNjb3BlLnZhbHVlXCJcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgbGFiZWw9XCJzdGF0dXNcIlxuICAgICAgICAgICAgICBhdXRvZm9jdXNcbiAgICAgICAgICAgICAgOm9wdGlvbnM9XCJzdGF0dXNcIlxuICAgICAgICAgICAgICBjb3VudGVyXG4gICAgICAgICAgICAgIG1hc2s9XCIjIyNcIlxuICAgICAgICAgICAgICBAa2V5dXAuZW50ZXI9XCJzY29wZS5zZXRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L3EtcG9wdXAtZWRpdD5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLWJyZWFkX2dyb3Vwcz1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPHEtdG9vbHRpcFxuICAgICAgICAgICAgOm9mZnNldD1cIlswLCAxMF1cIlxuICAgICAgICAgICAgOmRlbGF5PVwiNjAwXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYmctaW5mbyB0ZXh0LWRhcmsgdGV4dC1zdWJ0aXRsZTFcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3M9XCJxLXBiLXNtIHRleHQtY2VudGVyIHRleHQtaDYgdGV4dC13ZWlnaHQtYm9sZCB0ZXh0LXN1YnRpdGxlMlwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIEJyZWFkcyBMaXN0XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxxLXNlcGFyYXRvciBjbGFzcz1cInEtbWItbWRcIiBjb2xvcj1cInllbGxvd1wiIC8+XG4gICAgICAgICAgICA8ZGl2IHYtZm9yPVwiYnJlYWQgaW4gcHJvcHMucm93LmJyZWFkX2dyb3Vwc1wiIDprZXk9XCJicmVhZFwiPlxuICAgICAgICAgICAgICB7eyBicmVhZCB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9xLXRvb2x0aXA+XG4gICAgICAgICAgPHEtY2hpcCBzcXVhcmUgb3V0bGluZSBjb2xvcj1cInJlZC02XCIgY2xhc3M9XCJ0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICB7eyBwcm9wcy5yb3cuYnJlYWRfZ3JvdXBzLmxlbmd0aCB9fSBicmVhZHNcbiAgICAgICAgICA8L3EtY2hpcD5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLWluZ3JlZGllbnRfZ3JvdXBzPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8cS10b29sdGlwXG4gICAgICAgICAgICA6ZGVsYXk9XCI2MDBcIlxuICAgICAgICAgICAgY2xhc3M9XCJiZy1pbmZvIHRleHQtZGFyayB0ZXh0LXN1YnRpdGxlMVwiXG4gICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAzMDBweFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzcz1cInEtcGItc20gdGV4dC1jZW50ZXIgdGV4dC1oNiB0ZXh0LXdlaWdodC1ib2xkIHRleHQtc3VidGl0bGUyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgSW5ncmVkaWVudHMgTGlzdFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cS1zZXBhcmF0b3IgY2xhc3M9XCJxLW1iLW1kXCIgY29sb3I9XCJ5ZWxsb3dcIiAvPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW5cIlxuICAgICAgICAgICAgICB2LWZvcj1cImluZ3JlZGllbnQgaW4gcHJvcHMucm93LmluZ3JlZGllbnRfZ3JvdXBzXCJcbiAgICAgICAgICAgICAgOmtleT1cImluZ3JlZGllbnQuaW5ncmVkaWVudF9uYW1lXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7eyBpbmdyZWRpZW50LmluZ3JlZGllbnRfbmFtZSB9fVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj57eyBpbmdyZWRpZW50LnF1YW50aXR5IH19IHt7IGluZ3JlZGllbnQudW5pdCB9fTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9xLXRvb2x0aXA+XG4gICAgICAgICAgPHEtY2hpcCBzcXVhcmUgb3V0bGluZSBjb2xvcj1cInB1cnBsZS02XCIgY2xhc3M9XCJ0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICB7eyBwcm9wcy5yb3cuaW5ncmVkaWVudF9ncm91cHMubGVuZ3RoIH19IGluZ3JlZGllbnRzXG4gICAgICAgICAgPC9xLWNoaXA+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC1hY3Rpb249XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1jZW50ZXIgcS1ndXR0ZXIteC1tZFwiPlxuICAgICAgICAgICAgPFJlY2lwZURlbGV0ZSA6ZGVsZXRlPVwicHJvcHNcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS10YWJsZT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgY29tcHV0ZWQsIG9uTW91bnRlZCwgcmVmLCB3YXRjaCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCBSZWNpcGVDcmVhdGUgZnJvbSBcIi4vUmVjaXBlQ3JlYXRlLnZ1ZVwiO1xuaW1wb3J0IHsgdXNlUm91dGUgfSBmcm9tIFwidnVlLXJvdXRlclwiO1xuaW1wb3J0IHsgdXNlQnJhbmNoUmVjaXBlU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9icmFuY2gtcmVjaXBlXCI7XG5pbXBvcnQgUmVjaXBlRGVsZXRlIGZyb20gXCIuL1JlY2lwZURlbGV0ZS52dWVcIjtcbmltcG9ydCB7IGFwaSB9IGZyb20gXCJzcmMvYm9vdC9heGlvc1wiO1xuaW1wb3J0IHsgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuY29uc3Qgcm91dGUgPSB1c2VSb3V0ZSgpO1xuXG5jb25zdCBicmFuY2hJZCA9IHJvdXRlLnBhcmFtcy5icmFuY2hfaWQ7XG5jb25zdCBicmFuY2hSZWNpcGVTdG9yZSA9IHVzZUJyYW5jaFJlY2lwZVN0b3JlKCk7XG5jb25zdCBmaWx0ZXIgPSByZWYoXCJcIik7XG5jb25zdCBsb2FkaW5nID0gcmVmKHRydWUpO1xuY29uc3QgYnJhbmNoUmVjaXBlcyA9IHJlZihbXSk7XG5jb25zdCBzaG93Tm9EYXRhTWVzc2FnZSA9IHJlZihmYWxzZSk7XG5jb25zdCBwYWdpbmF0aW9uID0gcmVmKHtcbiAgcm93c1BlclBhZ2U6IDAsXG59KTtcbmNvbnN0IHN0YXR1cyA9IFtcImluYWN0aXZlXCIsIFwiYWN0aXZlXCJdO1xuY29uc3QgYnJhbmNoUmVjaXBlUm93cyA9IGNvbXB1dGVkKCgpID0+IGJyYW5jaFJlY2lwZVN0b3JlLmJyYW5jaFJlY2lwZXMpO1xuY29uc29sZS5sb2coXCJicmFuY2ggcmVjaXBlXCIsIGJyYW5jaFJlY2lwZVJvd3MudmFsdWUpO1xuXG5jb25zdCBmaWx0ZXJlZFJvd3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmICghZmlsdGVyLnZhbHVlKSB7XG4gICAgcmV0dXJuIGJyYW5jaFJlY2lwZVJvd3MudmFsdWU7XG4gIH1cbiAgcmV0dXJuIGJyYW5jaFJlY2lwZVJvd3MudmFsdWUuZmlsdGVyKChyb3cpID0+XG4gICAgcm93Lm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmaWx0ZXIudmFsdWUudG9Mb3dlckNhc2UoKSlcbiAgKTtcbn0pO1xuXG5vbk1vdW50ZWQoYXN5bmMgKCkgPT4ge1xuICBpZiAoYnJhbmNoSWQpIHtcbiAgICBhd2FpdCByZWxvYWRUYWJsZURhdGEoYnJhbmNoSWQpO1xuICB9XG59KTtcblxuY29uc3QgcmVsb2FkVGFibGVEYXRhID0gYXN5bmMgKGJyYW5jaElkKSA9PiB7XG4gIHRyeSB7XG4gICAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBicmFuY2hSZWNpcGVTdG9yZS5mZXRjaEJyYW5jaFJlY2lwZXMoYnJhbmNoSWQpO1xuICAgIGJyYW5jaFJlY2lwZVJvd3MudmFsdWUgPSByZXNwb25zZTtcbiAgICBjb25zb2xlLmxvZyhcImJyYW5jaFJlY2lwZVJvd3NcIiwgYnJhbmNoUmVjaXBlUm93cy52YWx1ZSk7XG4gICAgaWYgKCFicmFuY2hSZWNpcGVSb3dzLnZhbHVlLmxlbmd0aCkge1xuICAgICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSB0cnVlO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcIkJyYW5jaCByZWNpcGVcIiwgYnJhbmNoUmVjaXBlUm93cy52YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coXCJFcnJvciBmZXRjaGluZyByZWNpcGVcIiwgZXJyb3IpO1xuICB9IGZpbmFsbHkge1xuICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgfVxufTtcblxuLy8gd2F0Y2goZmlsdGVyLCBhc3luYyAobmV3RmlsdGVyKSA9PiB7XG4vLyAgIGxvYWRpbmcudmFsdWUgPSB0cnVlXG4vLyAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApKVxuLy8gICBsb2FkaW5nLnZhbHVlID0gZmFsc2Vcbi8vICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSBmaWx0ZXJlZFJvd3MudmFsdWUubGVuZ3RoID09PSAwXG4vLyB9KVxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVSZWNpcGUoZGF0YSwgdmFsKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucHV0KFwiL2FwaS91cGRhdGUtdGFyZ2V0L1wiICsgZGF0YS5pZCwge1xuICAgICAgdGFyZ2V0OiBwYXJzZUludCh2YWwpLFxuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coXCJyZXNwb25zZVwiLCByZXNwb25zZSk7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgIGNvbnN0IGkgPSBicmFuY2hSZWNpcGVzLnZhbHVlLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PSBkYXRhLmlkKTtcbiAgICAgIGJyYW5jaFJlY2lwZXMudmFsdWVbaV0gPSB2YWw7XG4gICAgfVxuXG4gICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXG4gICAgICBtZXNzYWdlOiBcIlJlY2lwZSB0YXJnZXQgZWRpdGVkIHN1Y2Nlc3NmdWxseVwiLFxuICAgICAgLy8gcG9zaXRpb246IFwidG9wXCIsXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHVwZGF0aW5nIHJlY2lwZSB0YXJnZXQ6XCIsIGVycm9yKTtcbiAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgIHR5cGU6IFwibmVnYXRpdmVcIixcbiAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIGVkaXQgcmVjaXBlIHRhcmdldFwiLFxuICAgICAgLy8gcG9zaXRpb246IFwidG9wXCIsXG4gICAgfSk7XG4gIH1cbn1cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVJlY2lwZVN0YXR1cyhkYXRhLCB2YWwpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wdXQoXCIvYXBpL2JyYW5jaC11cGRhdGUtc3RhdHVzL1wiICsgZGF0YS5pZCwge1xuICAgICAgc3RhdHVzOiB2YWwsXG4gICAgfSk7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgIGNvbnN0IGkgPSBicmFuY2hSZWNpcGVzLnZhbHVlLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PSBkYXRhLmlkKTtcbiAgICAgIGJyYW5jaFJlY2lwZXMudmFsdWVbaV0gPSB2YWw7XG4gICAgfVxuXG4gICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXG4gICAgICBtZXNzYWdlOiBcIlJlY2lwZSBzdGF0dXMgY2hhbmdlIHN1Y2Nlc3NmdWxseVwiLFxuICAgICAgLy8gcG9zaXRpb246IFwidG9wXCIsXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHVwZGF0aW5nIHJlY2lwZSBzdGF0dXM6XCIsIGVycm9yKTtcbiAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgIHR5cGU6IFwibmVnYXRpdmVcIixcbiAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIGNoYW5nZSByZWNpcGUgc3RhdHVzXCIsXG4gICAgICAvLyBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICB9KTtcbiAgfVxufVxuXG5jb25zdCBjYXBpdGFsaXplRmlyc3RMZXR0ZXIgPSAobG9jYXRpb24pID0+IHtcbiAgaWYgKCFsb2NhdGlvbikgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBsb2NhdGlvblxuICAgIC5zcGxpdChcIiBcIilcbiAgICAubWFwKCh3b3JkKSA9PiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpKVxuICAgIC5qb2luKFwiIFwiKTtcbn07XG5cbmNvbnN0IGJyYW5jaFJlY2lwZUNvbHVtbnMgPSBbXG4gIHtcbiAgICBuYW1lOiBcIm5hbWVcIixcbiAgICBsYWJlbDogXCJSZWNpcGUgbmFtZVwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiAocm93KSA9PiByb3cubmFtZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiY2F0ZWdvcnlcIixcbiAgICBsYWJlbDogXCJDYXRlZ29yeVwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiAocm93KSA9PiByb3cucmVjaXBlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJ0YXJnZXRcIixcbiAgICBsYWJlbDogXCJUYXJnZXRcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogXCJ0YXJnZXRcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwic3RhdHVzXCIsXG4gICAgbGFiZWw6IFwiU3RhdHVzXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IFwic3RhdHVzXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImJyZWFkX2dyb3Vwc1wiLFxuICAgIGxhYmVsOiBcIkxpc3Qgb2YgQnJlYWRcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogXCJicmVhZF9ncm91cHNcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiaW5ncmVkaWVudF9ncm91cHNcIixcbiAgICBsYWJlbDogXCJMaXN0IG9mIEluZ3JlZGllbnRzXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IFwiaW5ncmVkaWVudF9ncm91cHNcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYWN0aW9uXCIsXG4gICAgbGFiZWw6IFwiQWN0aW9uXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG5dO1xuXG5jb25zdCBnZXRCYWRnZVN0YXR1c0NvbG9yID0gKHN0YXR1cykgPT4ge1xuICBzd2l0Y2ggKHN0YXR1cykge1xuICAgIGNhc2UgXCJpbmFjdGl2ZVwiOlxuICAgICAgcmV0dXJuIFwiZ3JleVwiO1xuICAgIGNhc2UgXCJhY3RpdmVcIjpcbiAgICAgIHJldHVybiBcImdyZWVuXCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcImdyZXlcIjtcbiAgfVxufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XG4uZGF0YS1lcnJvciB7XG4gIG1pbi1oZWlnaHQ6IDQwdmg7IC8qIE1pbmltdW0gaGVpZ2h0IG9mIDUwJSB2aWV3cG9ydCBoZWlnaHQgKi9cbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uc3Bpbm5lci13cmFwcGVyIHtcbiAgbWluLWhlaWdodDogNDB2aDsgLyogTWluaW11bSBoZWlnaHQgb2YgNTAlIHZpZXdwb3J0IGhlaWdodCAqL1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgcGFkZGluZz5cbiAgICA8ZGl2IGNsYXNzPVwiZWxlZ2FudC1jb250YWluZXIgcS1ndXR0ZXItbWRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2IHJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cS1idG4gb3V0bGluZSBmbGF0IGljb249XCJhcnJvd19iYWNrXCIgQGNsaWNrPVwibmF2aWdhdGVCYWNrXCIgLz5cbiAgICAgICAgICA8cS1zcGFjZSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cS1pY29uIG5hbWU9XCJmYS1zb2xpZCBmYS1zdG9yZVwiIGNvbG9yPVwicmVkLTZcIiAvPlxuICAgICAgICAgIHt7IGNhcGl0YWxpemVGaXJzdExldHRlcihicmFuY2hOYW1lKSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItc21cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYi1jb250YWluZXJcIj5cbiAgICAgICAgICA8cS10YWJzXG4gICAgICAgICAgICB2LW1vZGVsPVwidGFiXCJcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBjbGFzcz1cImJnLWdyZXktMiB0ZXh0LWdyZXktNyB0YWJzLWFzLWNhcmRzXCJcbiAgICAgICAgICAgIGFjdGl2ZS1jb2xvcj1cInJlZC02XCJcbiAgICAgICAgICAgIGluZGljYXRvci1jb2xvcj1cInRyYW5zcGFyZW50XCJcbiAgICAgICAgICAgIGFsaWduPVwianVzdGlmeVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHEtdGFiIG5hbWU9XCJwcm9kdWN0c1wiIGxhYmVsPVwiUHJvZHVjdHNcIiAvPlxuICAgICAgICAgICAgPHEtdGFiIG5hbWU9XCJyYXdNYXRlcmlhbHNcIiBsYWJlbD1cIlJhdyBNYXRlcmlhbHNcIiAvPlxuICAgICAgICAgICAgPHEtdGFiIG5hbWU9XCJyZWNpcGVcIiBsYWJlbD1cIlJlY2lwZVwiIC8+XG4gICAgICAgICAgICA8cS10YWIgbmFtZT1cInByb2R1Y3Rpb25cIiBsYWJlbD1cIlByb2R1Y3Rpb25cIiAvPlxuICAgICAgICAgIDwvcS10YWJzPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8cS1jYXJkIGNsYXNzPVwicS1tdC1zbVwiPlxuICAgICAgICAgIDxxLXRhYi1wYW5lbHMgdi1tb2RlbD1cInRhYlwiIGFuaW1hdGVkPlxuICAgICAgICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJwcm9kdWN0c1wiPlxuICAgICAgICAgICAgICA8UHJvZHVjdFBhZ2UgLz5cbiAgICAgICAgICAgIDwvcS10YWItcGFuZWw+XG5cbiAgICAgICAgICAgIDxxLXRhYi1wYW5lbCBuYW1lPVwicmF3TWF0ZXJpYWxzXCI+XG4gICAgICAgICAgICAgIDxSYXdNYXRlcmlhbHNQYWdlIC8+XG4gICAgICAgICAgICA8L3EtdGFiLXBhbmVsPlxuXG4gICAgICAgICAgICA8cS10YWItcGFuZWwgbmFtZT1cInJlY2lwZVwiPlxuICAgICAgICAgICAgICA8UmVjaXBlUGFnZSAvPlxuICAgICAgICAgICAgPC9xLXRhYi1wYW5lbD5cblxuICAgICAgICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJwcm9kdWN0aW9uXCI+XG4gICAgICAgICAgICAgIDxQcm9kdWN0aW9uUGFnZSAvPlxuICAgICAgICAgICAgPC9xLXRhYi1wYW5lbD5cbiAgICAgICAgICA8L3EtdGFiLXBhbmVscz5cbiAgICAgICAgPC9xLWNhcmQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBQcm9kdWN0UGFnZSBmcm9tIFwiLi9jb21wb25lbnRzL3Byb2R1Y3RzL1Byb2R1Y3RQYWdlLnZ1ZVwiO1xuaW1wb3J0IFJhd01hdGVyaWFsc1BhZ2UgZnJvbSBcIi4vY29tcG9uZW50cy9yYXdfbWF0ZXJpYWxzL1Jhd01hdGVyaWFsc1BhZ2UudnVlXCI7XG5pbXBvcnQgUHJvZHVjdGlvblBhZ2UgZnJvbSBcIi4vY29tcG9uZW50cy9wcm9kdWN0aW9uL1Byb2R1Y3Rpb25QYWdlLnZ1ZVwiO1xuaW1wb3J0IFJlY2lwZVBhZ2UgZnJvbSBcIi4vY29tcG9uZW50cy9yZWNpcGUvUmVjaXBlUGFnZS52dWVcIjtcbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgdXNlUm91dGUsIHVzZVJvdXRlciB9IGZyb20gXCJ2dWUtcm91dGVyXCI7XG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwic3JjL2Jvb3QvYXhpb3NcIjtcbmltcG9ydCB7IExvYWRpbmcgfSBmcm9tIFwicXVhc2FyXCI7XG5cbmNvbnN0IHJvdXRlID0gdXNlUm91dGUoKTtcbmNvbnN0IGJyYW5jaE5hbWUgPSByZWYoXCJcIik7XG5jb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuY29uc3QgZ2V0QnJhbmNoQnlJZCA9IGFzeW5jIChicmFuY2hJZCkgPT4ge1xuICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KGAvYXBpL2JyYW5jaGVzLyR7YnJhbmNoSWR9YCk7XG4gIHJldHVybiByZXMuZGF0YTtcbn07XG5cbmNvbnN0IGdldEJyYW5jaCA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgYnJhbmNoSWQgPSByb3V0ZS5wYXJhbXMuYnJhbmNoX2lkO1xuICBjb25zdCBicmFuY2ggPSBhd2FpdCBnZXRCcmFuY2hCeUlkKGJyYW5jaElkKTtcbiAgaWYgKGJyYW5jaCAmJiBicmFuY2gubmFtZSkge1xuICAgIGJyYW5jaE5hbWUudmFsdWUgPSBicmFuY2gubmFtZTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKFwiQnJhbmNoIGRhdGEgaXMgbWlzc2luZyAnbmFtZScgcHJvcGVydHkgb3IgaW52YWxpZDpcIiwgYnJhbmNoKTtcbiAgfVxufTtcblxub25Nb3VudGVkKCgpID0+IHtcbiAgZ2V0QnJhbmNoKCk7XG59KTtcblxuY29uc3QgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyID0gKGxvY2F0aW9uKSA9PiB7XG4gIGlmICghbG9jYXRpb24pIHJldHVybiBcIlwiO1xuICByZXR1cm4gbG9jYXRpb25cbiAgICAuc3BsaXQoXCIgXCIpXG4gICAgLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSlcbiAgICAuam9pbihcIiBcIik7XG59O1xuXG5jb25zdCB0YWIgPSByZWYoXCJwcm9kdWN0c1wiKTtcblxuY29uc3QgbmF2aWdhdGVCYWNrID0gKCkgPT4ge1xuICBMb2FkaW5nLnNob3coKTtcbiAgcm91dGVyLnB1c2goXCIvYWRtaW4vYnJhbmNoZXNcIikuZmluYWxseSgoKSA9PiB7XG4gICAgTG9hZGluZy5oaWRlKCk7XG4gIH0pO1xufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLnEtdGFicy0tbm90LXNjcm9sbGFibGUgLnEtdGFic19fY29udGVudCxcbmJvZHkubW9iaWxlIC5xLXRhYnMtLXNjcm9sbGFibGUucS10YWJzLS1tb2JpbGUtd2l0aG91dC1hcnJvd3MgLnEtdGFic19fY29udGVudCB7XG4gIG92ZXJmbG93OiB2aXNpYmxlO1xufVxuLnRhYnMtYXMtY2FyZHMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHBhZGRpbmc6IDhweCAxNnB4O1xufVxuXG4udGFicy1hcy1jYXJkcyAucS10YWIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgY29sb3I6ICMzMzM7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xuICBtYXJnaW46IDAgOHB4O1xuICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcywgYm94LXNoYWRvdyAwLjNzLCB0cmFuc2Zvcm0gMC4zcztcbn1cblxuLnRhYnMtYXMtY2FyZHMgLnEtdGFiOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjBmMDtcbiAgYm94LXNoYWRvdzogMCA0cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbn1cblxuLnRhYnMtYXMtY2FyZHMgLnEtdGFiLS1hY3RpdmUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTBlMGUwO1xuICBjb2xvcjogIzMzMztcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMyk7XG59XG4udGFiLWNvbnRlbnQge1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIGJveC1zaGFkb3c6IDBweCA0cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbImJyYW5jaElkIiwiTG9hZGluZyIsImJyYW5jaFByb2R1Y3QiLCJjbGVhckZvcm0iLCJicmFuY2hSYXdNYXRlcmlhbCIsInBkZk1ha2UudmZzIiwicGRmRm9udHMuZGVmYXVsdCIsImRhdGUiLCJyZXBvcnRzRGF0YSIsIl9hIiwiX2IiLCJwZGZNYWtlLmNyZWF0ZVBkZiIsInRvdGFsIiwicmVwb3J0Iiwic3RhdHVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTU8sTUFBTSx5QkFBeUIsWUFBWSxrQkFBa0IsTUFBTTtBQUN4RSxRQUFNLGdCQUFnQixJQUFJLElBQUk7QUFDOUIsUUFBTSxpQkFBaUIsSUFBSSxDQUFBLENBQUU7QUFDN0IsUUFBTSxXQUFXLElBQUksQ0FBQSxDQUFFO0FBRXZCLFFBQU0sZ0JBQWdCO0FBQ3RCLFFBQU0sV0FBVyxTQUFTLE1BQU0sY0FBYyxRQUFRO0FBQ3RELFVBQVEsSUFBSSx1QkFBdUIsU0FBUyxLQUFLO0FBRWpELFFBQU0sc0JBQXNCLE9BQU9BLGNBQWE7QUFDOUMsVUFBTSxXQUFXLE1BQU0sSUFBSSxJQUFJLGlCQUFpQkEsb0JBQW1CO0FBQ25FLG1CQUFlLFFBQVEsU0FBUztBQUFBLEVBQ3BDO0FBRUUsUUFBTSx1QkFBdUIsT0FBTyxTQUFTO0FBQzNDQyxXQUFRLEtBQUk7QUFDWixRQUFJO0FBQ0YsWUFBTSxFQUFFLFVBQVUsTUFBTyxJQUFHO0FBQzVCLFlBQU0sV0FBVyxNQUFNLElBQUksS0FBSyx3QkFBd0IsSUFBSTtBQUU1RCxVQUFJLFNBQVMsS0FBSyxZQUFZLHFDQUFxQztBQUNqRSxjQUFNLFVBQVUsU0FBUyxNQUFNO0FBQUEsVUFDN0IsQ0FB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Q0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLFFBQVEsQ0FBQyxRQUFRLEdBQUc7QUFBQSxNQUNyQjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLFFBQVEsQ0FBQyxRQUFRLEdBQUc7QUFBQSxNQUNyQjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLFFBQVEsQ0FBQyxRQUFRLEdBQUc7QUFBQSxNQUNyQjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLFFBQVEsQ0FBQyxRQUFRLEdBQUc7QUFBQSxNQUNyQjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLFFBQVEsQ0FBQyxRQUFRLEdBQUc7QUFBQSxNQUNyQjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLFFBQVEsQ0FBQyxRQUFRLEdBQUc7QUFBQSxNQUNyQjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxNQUNSO0FBQUEsSUFDSDtBQUVBLFVBQU0sY0FBYyxDQUFDLFVBQVU7QUFDN0IsYUFBTyxJQUFJLEtBQUssYUFBYSxTQUFTO0FBQUEsUUFDcEMsT0FBTztBQUFBLFFBQ1AsVUFBVTtBQUFBLE1BQ2QsQ0FBRyxFQUFFLE9BQU8sS0FBSztBQUFBLElBQ2pCO0FBR0EsVUFBTSxlQUFlLFNBQVMsTUFBTTtBQUNsQyxjQUFRLElBQUksa0JBQWtCLE1BQU0sV0FBVyxDQUFFLENBQUE7QUFDakQsYUFBTyxNQUFNLFdBQVc7SUFDMUIsQ0FBQztBQUdELFVBQU0sZUFBZSxTQUFTLE1BQU07QUFD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
