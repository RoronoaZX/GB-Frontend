import { _ as _export_sfc, n as ref, t as reactive, u as watch, g as computed, z as onMounted, o as openBlock, a4 as createElementBlock, J as createBaseVNode, a as createVNode, w as withCtx, a5 as Fragment, a6 as renderList, c as createBlock, Q as QCard, I as QCardSection, R as toDisplayString, a2 as QSeparator, M as QBtn, K as QInput, a3 as QDialog, S as pushScopeId, T as popScopeId, L as QIcon, O as createTextVNode } from "./index.c8e2405b.js";
import { Q as QTabs, a as QTab, b as QTabPanels, c as QTabPanel } from "./QTabPanels.31673619.js";
import { Q as QIntersection } from "./QIntersection.573d893c.js";
import { Q as QScrollArea } from "./QScrollArea.8dd131ca.js";
import { u as useSalesReportsStore } from "./sales-report.c65bf2b1.js";
import "./QItem.76557ad9.js";
import "./rtl.b1b38f21.js";
import "./QPopupEdit.5c11c937.js";
import "./ClosePopup.649d85d8.js";
import "./QResizeObserver.240147be.js";
import "./use-panel.e42dc1d1.js";
import "./touch.9135741d.js";
import "./selection.94057980.js";
import "./QScrollObserver.21839899.js";
import "./TouchPan.203b8c71.js";
import "./axios.aa1bce92.js";
import "./QMenu.4f670399.js";
var BreadCard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-8708f0c4"), n = n(), popScopeId(), n);
const _hoisted_1$6 = { class: "q-mt-md" };
const _hoisted_2$5 = { class: "row q-pa-lg q-gutter-y-lg" };
const _hoisted_3$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("img", { src: "https://cdn.quasar.dev/img/chicken-salad.jpg" }, null, -1));
const _hoisted_4$2 = { class: "text-h6" };
const _hoisted_5$2 = { class: "q-pa-xm row q-gutter-x-sm justify-between" };
const _hoisted_6$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, "Quantity:", -1));
const _hoisted_7$2 = { class: "q-pa-xm row q-gutter-x-sm justify-between" };
const _hoisted_8$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, "Price:", -1));
const _hoisted_9$2 = { class: "row justify-between" };
const _hoisted_10$2 = { class: "text-h6" };
const _hoisted_11$2 = { class: "q-mb-lg row justify-between" };
const _hoisted_12$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Remainnings", -1));
const _hoisted_13$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Bread Out", -1));
const _hoisted_14$2 = { class: "row q-gutter-xm justify-between" };
const _hoisted_15$2 = { class: "q-gutter-sm" };
const _hoisted_16$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Total Bread", -1));
const _hoisted_17$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("span", { class: "text-body2 text-weight-regular" }, "pcs", -1));
const _hoisted_18$2 = { class: "q-gutter-sm" };
const _hoisted_19$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Price", -1));
const _hoisted_20$2 = { class: "q-gutter-sm" };
const _hoisted_21$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Sold Pcs", -1));
const _hoisted_22$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("span", { class: "text-body2 text-weight-regular" }, "pcs", -1));
const _hoisted_23$2 = { class: "q-gutter-sm" };
const _hoisted_24$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Sales Amount", -1));
const _hoisted_25$2 = { align: "right" };
const _sfc_main$9 = {
  __name: "BreadCard",
  setup(__props) {
    const salesReportsStore = useSalesReportsStore();
    const userData = salesReportsStore.user;
    console.log("userdat", userData);
    const selectedItem = ref(null);
    const dialog = ref(false);
    const clickme = (item) => {
      selectedItem.value = item;
      dialog.value = true;
    };
    const breadProductsReport = reactive({
      breadSold: 0,
      remainnings: 0,
      beginnings: 0,
      breadOut: 0
    });
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    };
    const calculateBreadSold = () => {
      if (selectedItem.value) {
        const totalQuantity = parseInt(selectedItem.value.total_quantity) || 0;
        const remainings = parseInt(breadProductsReport.remainnings) || 0;
        const breadOut = parseInt(breadProductsReport.breadOut) || 0;
        const difference = remainings + breadOut;
        breadProductsReport.breadSold = totalQuantity - difference;
      }
    };
    watch(
      () => breadProductsReport.remainnings,
      (newRemaining) => {
        calculateBreadSold();
      }
    );
    watch(
      () => breadProductsReport.breadOut,
      (newBreadOut) => {
        calculateBreadSold();
      }
    );
    const breadSalesAmount = computed(() => {
      if (selectedItem.value) {
        return breadProductsReport.breadSold * selectedItem.value.price;
      }
      return 0;
    });
    const breadSalesAmountFormatted = computed(() => {
      return formatCurrency(breadSalesAmount.value);
    });
    onMounted(async () => {
      var _a, _b;
      const userData2 = salesReportsStore.user;
      const branchId = ((_b = (_a = userData2 == null ? void 0 : userData2.data) == null ? void 0 : _a.employee) == null ? void 0 : _b.branch_employee.branch_id) || "";
      if (branchId) {
        await fetchProducts(branchId);
      }
    });
    const fetchProducts = async (branchId) => {
      await salesReportsStore.fetchBranchProducts(branchId);
    };
    const breadProducts = computed(() => salesReportsStore.breadProducts);
    watch(breadProducts, (newVal) => {
    });
    const closeDialog = () => {
      selectedItem.value = null;
      breadProductsReport.breadSold = 0;
      breadProductsReport.remainnings = 0;
      breadProductsReport.beginnings = 0;
      breadProductsReport.breadOut = 0;
      dialog.value = false;
    };
    const saveReport = () => {
      var _a, _b, _c;
      if (selectedItem.value) {
        const report = {
          user_id: userData == null ? void 0 : userData.data.id,
          branch_id: ((_c = (_b = (_a = userData == null ? void 0 : userData.data) == null ? void 0 : _a.employee) == null ? void 0 : _b.branch_employee) == null ? void 0 : _c.branch_id) || "",
          product_id: selectedItem.value.product.id,
          name: selectedItem.value.product.name,
          total: selectedItem.value.total_quantity,
          new_production: selectedItem.value.new_production,
          bread_sold: breadProductsReport.breadSold,
          bread_out: breadProductsReport.breadOut,
          beginnings: selectedItem.value.beginnings,
          remaining: breadProductsReport.remainnings,
          price: selectedItem.value.price,
          sales: breadSalesAmount.value
        };
        salesReportsStore.updateBreadReport(report);
        closeDialog();
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$6, [
          createVNode(QScrollArea, { style: { "height": "700px", "max-width": "1500px" } }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_2$5, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(breadProducts.value, (item, index) => {
                  return openBlock(), createBlock(QIntersection, {
                    key: index,
                    once: "",
                    transition: "scale",
                    class: "example-item q-gutter-sm"
                  }, {
                    default: withCtx(() => [
                      createVNode(QCard, {
                        onClick: ($event) => clickme(item),
                        class: "q-ma-sm my-card"
                      }, {
                        default: withCtx(() => [
                          _hoisted_3$2,
                          createVNode(QCardSection, null, {
                            default: withCtx(() => [
                              createBaseVNode("div", _hoisted_4$2, toDisplayString(item.product.name), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(QSeparator),
                          createVNode(QCardSection, { class: "text-subtitle2 text-weight-regular" }, {
                            default: withCtx(() => [
                              createBaseVNode("div", _hoisted_5$2, [
                                _hoisted_6$2,
                                createBaseVNode("div", null, toDisplayString(item.total_quantity), 1)
                              ]),
                              createBaseVNode("div", _hoisted_7$2, [
                                _hoisted_8$2,
                                createBaseVNode("div", null, toDisplayString(formatCurrency(item.price)), 1)
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ])
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", null, [
          createVNode(QDialog, {
            modelValue: dialog.value,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => dialog.value = $event)
          }, {
            default: withCtx(() => [
              createVNode(QCard, {
                class: "my-card q-pa-md",
                style: { "width": "700px", "max-width": "80vw" }
              }, {
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_9$2, [
                        createBaseVNode("div", _hoisted_10$2, toDisplayString(selectedItem.value ? selectedItem.value.product.name : ""), 1),
                        createBaseVNode("div", null, [
                          createVNode(QBtn, {
                            round: "",
                            dense: "",
                            flat: "",
                            icon: "close",
                            onClick: closeDialog
                          })
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_11$2, [
                        createBaseVNode("div", null, [
                          _hoisted_12$2,
                          createVNode(QInput, {
                            modelValue: breadProductsReport.remainnings,
                            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => breadProductsReport.remainnings = $event),
                            dense: "",
                            outlined: "",
                            mask: "#####",
                            suffix: "pcs",
                            placeholder: "0",
                            type: "number",
                            style: { "width": "260px", "max-width": "300px", "min-width": "50px" }
                          }, null, 8, ["modelValue"])
                        ]),
                        createBaseVNode("div", null, [
                          _hoisted_13$2,
                          createVNode(QInput, {
                            modelValue: breadProductsReport.breadOut,
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => breadProductsReport.breadOut = $event),
                            dense: "",
                            outlined: "",
                            type: "number",
                            mask: "#####",
                            suffix: "pcs",
                            placeholder: "0",
                            style: { "width": "260px", "max-width": "300px", "min-width": "50px" }
                          }, null, 8, ["modelValue"])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_14$2, [
                        createBaseVNode("div", _hoisted_15$2, [
                          _hoisted_16$2,
                          createVNode(QInput, {
                            dense: "",
                            outlined: "",
                            readonly: "",
                            label: selectedItem.value ? selectedItem.value.total_quantity : "",
                            style: { "width": "120px", "max-width": "300px", "min-width": "50px" }
                          }, {
                            append: withCtx(() => [
                              _hoisted_17$2
                            ]),
                            _: 1
                          }, 8, ["label"])
                        ]),
                        createBaseVNode("div", _hoisted_18$2, [
                          _hoisted_19$2,
                          createVNode(QInput, {
                            dense: "",
                            outlined: "",
                            readonly: "",
                            label: selectedItem.value ? formatCurrency(selectedItem.value.price) : "",
                            style: { "width": "120px", "max-width": "300px", "min-width": "50px" }
                          }, null, 8, ["label"])
                        ]),
                        createBaseVNode("div", _hoisted_20$2, [
                          _hoisted_21$2,
                          createVNode(QInput, {
                            dense: "",
                            modelValue: breadProductsReport.breadSold,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => breadProductsReport.breadSold = $event),
                            outlined: "",
                            "reverse-fill-mask": "",
                            readonly: "",
                            style: { "width": "120px", "max-width": "300px", "min-width": "50px" }
                          }, {
                            append: withCtx(() => [
                              _hoisted_22$2
                            ]),
                            _: 1
                          }, 8, ["modelValue"])
                        ]),
                        createBaseVNode("div", _hoisted_23$2, [
                          _hoisted_24$2,
                          createVNode(QInput, {
                            dense: "",
                            outlined: "",
                            modelValue: breadSalesAmountFormatted.value,
                            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => breadSalesAmountFormatted.value = $event),
                            readonly: "",
                            style: { "width": "150px", "max-width": "300px", "min-width": "50px" }
                          }, null, 8, ["modelValue"])
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_25$2, [
                        createVNode(QBtn, {
                          color: "red-6",
                          label: "Ok",
                          onClick: saveReport
                        })
                      ])
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
var BreadCard = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-8708f0c4"], ["__file", "BreadCard.vue"]]);
const _sfc_main$8 = {
  __name: "BreadSearch",
  setup(__props) {
    const searchEngine = ref("");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QInput, {
        modelValue: searchEngine.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchEngine.value = $event),
        rounded: "",
        outlined: "",
        dense: "",
        flat: "",
        placeholder: "Search...",
        style: { "width": "400px", "max-width": "450px", "min-width": "150px" }
      }, {
        append: withCtx(() => [
          createBaseVNode("div", null, [
            createVNode(QIcon, { name: "search" })
          ])
        ]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
};
var BreadSearch = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__file", "BreadSearch.vue"]]);
const _hoisted_1$5 = { class: "q-gutter-y-md" };
const _hoisted_2$4 = { class: "row justify-between" };
const _sfc_main$7 = {
  __name: "BreadPage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$5, [
          createBaseVNode("div", _hoisted_2$4, [
            createBaseVNode("div", null, [
              createVNode(BreadSearch)
            ])
          ])
        ]),
        createBaseVNode("div", null, [
          createVNode(BreadCard)
        ])
      ], 64);
    };
  }
};
var BreadPage = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "BreadPage.vue"]]);
const _sfc_main$6 = {
  __name: "SelectaSearch",
  setup(__props) {
    const searchEngine = ref("");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QInput, {
        modelValue: searchEngine.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchEngine.value = $event),
        rounded: "",
        outlined: "",
        dense: "",
        flat: "",
        placeholder: "Search...",
        style: { "width": "400px", "max-width": "450px", "min-width": "150px" }
      }, {
        append: withCtx(() => [
          createBaseVNode("div", null, [
            createVNode(QIcon, { name: "search" })
          ])
        ]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
};
var SelectaSearch = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "SelectaSearch.vue"]]);
var SelectaCard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-a6a2f168"), n = n(), popScopeId(), n);
const _hoisted_1$4 = { class: "q-mt-md" };
const _hoisted_2$3 = { class: "row q-pa-lg q-gutter-sm q-gutter-y-md" };
const _hoisted_3$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("img", { src: "https://cdn.quasar.dev/img/chicken-salad.jpg" }, null, -1));
const _hoisted_4$1 = { class: "text-h6" };
const _hoisted_5$1 = { class: "q-pa-xm row q-gutter-x-sm justify-between" };
const _hoisted_6$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Quantity:", -1));
const _hoisted_7$1 = { class: "q-pa-xm row q-gutter-x-sm justify-between" };
const _hoisted_8$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Price:", -1));
const _hoisted_9$1 = { class: "row justify-between" };
const _hoisted_10$1 = { class: "text-h6" };
const _hoisted_11$1 = { class: "q-mb-lg row justify-between" };
const _hoisted_12$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Remainnings", -1));
const _hoisted_13$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Selecta Out", -1));
const _hoisted_14$1 = { class: "row q-gutter-xm justify-between" };
const _hoisted_15$1 = { class: "q-gutter-sm" };
const _hoisted_16$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Total Selecta", -1));
const _hoisted_17$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("span", { class: "text-body2 text-weight-regular" }, "pcs", -1));
const _hoisted_18$1 = { class: "q-gutter-sm" };
const _hoisted_19$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Price", -1));
const _hoisted_20$1 = { class: "q-gutter-sm" };
const _hoisted_21$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Sold Pcs", -1));
const _hoisted_22$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("span", { class: "text-body2 text-weight-regular" }, "pcs", -1));
const _hoisted_23$1 = { class: "q-gutter-sm" };
const _hoisted_24$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Sales Amount", -1));
const _hoisted_25$1 = { align: "right" };
const _sfc_main$5 = {
  __name: "SelectaCard",
  setup(__props) {
    const salesReportsStore = useSalesReportsStore();
    const userData = salesReportsStore.user;
    const selectedItem = ref(null);
    const dialog = ref(false);
    const clickme = (item) => {
      selectedItem.value = item;
      dialog.value = true;
    };
    const selectaProductReport = reactive({
      selectaSold: 0,
      selectaRemainings: 0,
      selectaBeginnings: 0,
      selectaOut: 0
    });
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    };
    const selectaSalesAmount = computed(() => {
      if (selectedItem.value) {
        return selectaProductReport.selectaSold * selectedItem.value.price;
      }
      return 0;
    });
    const selectaSalesAmountFormatted = computed(() => {
      return formatCurrency(selectaSalesAmount.value);
    });
    const calculateSelecta = () => {
      if (selectedItem.value) {
        const totalQuantity = parseInt(selectedItem.value.total_quantity) || 0;
        const remainings = parseInt(selectaProductReport.selectaRemainings) || 0;
        const selectaOut = parseInt(selectaProductReport.selectaOut) || 0;
        const difference = remainings + selectaOut;
        selectaProductReport.selectaSold = totalQuantity - difference;
      }
    };
    watch(
      () => selectaProductReport.selectaRemainings,
      (newRemaining) => {
        calculateSelecta();
      }
    );
    watch(
      () => selectaProductReport.selectaOut,
      (newBreadOut) => {
        calculateSelecta();
      }
    );
    onMounted(async () => {
      var _a, _b;
      const userData2 = salesReportsStore.user;
      const branchId = ((_b = (_a = userData2 == null ? void 0 : userData2.data) == null ? void 0 : _a.employee) == null ? void 0 : _b.branch_employee.branch_id) || "";
      if (branchId) {
        await fetchProducts(branchId);
      }
    });
    const fetchProducts = async (branchId) => {
      await salesReportsStore.fetchBranchProducts(branchId);
    };
    const selectaProducts = computed(() => salesReportsStore.selectaProducts);
    watch(selectaProducts, (newVal) => {
    });
    const closeDialog = () => {
      selectedItem.value = null;
      selectaProductReport.selectaSold = 0;
      selectaProductReport.selectaRemainings = 0;
      selectaProductReport.selectaBeginnings = 0;
      selectaProductReport.selectaOut = 0;
      dialog.value = false;
    };
    const saveReport = () => {
      var _a, _b, _c;
      if (selectedItem.value) {
        const report = {
          user_id: userData == null ? void 0 : userData.data.id,
          branch_id: ((_c = (_b = (_a = userData == null ? void 0 : userData.data) == null ? void 0 : _a.employee) == null ? void 0 : _b.branch_employee) == null ? void 0 : _c.branch_id) || "",
          product_id: selectedItem.value.product.id,
          name: selectedItem.value.product.name,
          total: selectedItem.value.total_quantity,
          added_stocks: selectedItem.value.new_production,
          sold: selectaProductReport.selectaSold,
          out: selectaProductReport.selectaOut,
          beginnings: selectedItem.value.beginnings,
          remaining: selectaProductReport.selectaRemainings,
          price: selectedItem.value.price,
          sales: selectaSalesAmount.value
        };
        salesReportsStore.updateSelectaReport(report);
        closeDialog();
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$4, [
          createVNode(QScrollArea, { style: { "height": "450px", "max-width": "1500px" } }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_2$3, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(selectaProducts.value, (item, index) => {
                  return openBlock(), createBlock(QIntersection, {
                    key: index,
                    once: "",
                    transition: "scale",
                    class: "example-item"
                  }, {
                    default: withCtx(() => [
                      createVNode(QCard, {
                        onClick: ($event) => clickme(item),
                        class: "q-ma-sm my-card"
                      }, {
                        default: withCtx(() => [
                          _hoisted_3$1,
                          createVNode(QCardSection, null, {
                            default: withCtx(() => [
                              createBaseVNode("div", _hoisted_4$1, toDisplayString(item.product.name), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(QSeparator),
                          createVNode(QCardSection, { class: "text-subtitle2 text-weight-regular" }, {
                            default: withCtx(() => [
                              createBaseVNode("div", _hoisted_5$1, [
                                _hoisted_6$1,
                                createBaseVNode("div", null, toDisplayString(item.total_quantity), 1)
                              ]),
                              createBaseVNode("div", _hoisted_7$1, [
                                _hoisted_8$1,
                                createBaseVNode("div", null, toDisplayString(formatCurrency(item.price)), 1)
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ])
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", null, [
          createVNode(QDialog, {
            modelValue: dialog.value,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => dialog.value = $event)
          }, {
            default: withCtx(() => [
              createVNode(QCard, {
                class: "my-card q-pa-md",
                style: { "width": "700px", "max-width": "80vw" }
              }, {
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_9$1, [
                        createBaseVNode("div", _hoisted_10$1, toDisplayString(selectedItem.value ? selectedItem.value.product.name : ""), 1),
                        createBaseVNode("div", null, [
                          createVNode(QBtn, {
                            round: "",
                            dense: "",
                            flat: "",
                            icon: "close",
                            onClick: closeDialog
                          })
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_11$1, [
                        createBaseVNode("div", null, [
                          _hoisted_12$1,
                          createVNode(QInput, {
                            modelValue: selectaProductReport.selectaRemainings,
                            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectaProductReport.selectaRemainings = $event),
                            dense: "",
                            outlined: "",
                            mask: "#####",
                            type: "number",
                            suffix: "pcs",
                            placeholder: "0",
                            style: { "width": "260px", "max-width": "300px", "min-width": "50px" }
                          }, null, 8, ["modelValue"])
                        ]),
                        createBaseVNode("div", null, [
                          _hoisted_13$1,
                          createVNode(QInput, {
                            modelValue: selectaProductReport.selectaOut,
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => selectaProductReport.selectaOut = $event),
                            dense: "",
                            outlined: "",
                            mask: "#####",
                            type: "number",
                            suffix: "pcs",
                            placeholder: "0",
                            style: { "width": "260px", "max-width": "300px", "min-width": "50px" }
                          }, null, 8, ["modelValue"])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_14$1, [
                        createBaseVNode("div", _hoisted_15$1, [
                          _hoisted_16$1,
                          createVNode(QInput, {
                            dense: "",
                            outlined: "",
                            readonly: "",
                            label: selectedItem.value ? selectedItem.value.total_quantity : "",
                            style: { "width": "120px", "max-width": "300px", "min-width": "50px" }
                          }, {
                            append: withCtx(() => [
                              _hoisted_17$1
                            ]),
                            _: 1
                          }, 8, ["label"])
                        ]),
                        createBaseVNode("div", _hoisted_18$1, [
                          _hoisted_19$1,
                          createVNode(QInput, {
                            dense: "",
                            outlined: "",
                            readonly: "",
                            label: selectedItem.value ? formatCurrency(selectedItem.value.price) : "",
                            style: { "width": "120px", "max-width": "300px", "min-width": "50px" }
                          }, null, 8, ["label"])
                        ]),
                        createBaseVNode("div", _hoisted_20$1, [
                          _hoisted_21$1,
                          createVNode(QInput, {
                            dense: "",
                            modelValue: selectaProductReport.selectaSold,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => selectaProductReport.selectaSold = $event),
                            outlined: "",
                            "reverse-fill-mask": "",
                            readonly: "",
                            style: { "width": "120px", "max-width": "300px", "min-width": "50px" }
                          }, {
                            append: withCtx(() => [
                              _hoisted_22$1
                            ]),
                            _: 1
                          }, 8, ["modelValue"])
                        ]),
                        createBaseVNode("div", _hoisted_23$1, [
                          _hoisted_24$1,
                          createVNode(QInput, {
                            dense: "",
                            outlined: "",
                            modelValue: selectaSalesAmountFormatted.value,
                            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => selectaSalesAmountFormatted.value = $event),
                            readonly: "",
                            style: { "width": "150px", "max-width": "300px", "min-width": "50px" }
                          }, null, 8, ["modelValue"])
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_25$1, [
                        createVNode(QBtn, {
                          color: "red-6",
                          label: "Ok",
                          onClick: saveReport
                        })
                      ])
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
var SelectaCard = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-a6a2f168"], ["__file", "SelectaCard.vue"]]);
const _hoisted_1$3 = { class: "q-gutter-y-md" };
const _hoisted_2$2 = { class: "row justify-between" };
const _sfc_main$4 = {
  __name: "SelectaPage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$3, [
          createBaseVNode("div", _hoisted_2$2, [
            createBaseVNode("div", null, [
              createVNode(SelectaSearch)
            ])
          ])
        ]),
        createBaseVNode("div", null, [
          createVNode(SelectaCard)
        ])
      ], 64);
    };
  }
};
var SelectaPage = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "SelectaPage.vue"]]);
var SoftdrinksCard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-5e8e5a1b"), n = n(), popScopeId(), n);
const _hoisted_1$2 = { class: "q-mt-md" };
const _hoisted_2$1 = { class: "row q-pa-lg q-gutter-sm q-gutter-y-md" };
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("img", { src: "https://cdn.quasar.dev/img/chicken-salad.jpg" }, null, -1));
const _hoisted_4 = { class: "text-h6" };
const _hoisted_5 = { class: "q-pa-xm row q-gutter-x-sm justify-between" };
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, "Quantity:", -1));
const _hoisted_7 = { class: "q-pa-xm row q-gutter-x-sm justify-between" };
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, "Price:", -1));
const _hoisted_9 = { class: "row justify-between" };
const _hoisted_10 = { class: "text-h6" };
const _hoisted_11 = { class: "q-mb-lg row justify-between" };
const _hoisted_12 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Remainnings", -1));
const _hoisted_13 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Softdrinks Out", -1));
const _hoisted_14 = { class: "row q-gutter-xm justify-between" };
const _hoisted_15 = { class: "q-gutter-sm" };
const _hoisted_16 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Total Softdrinks", -1));
const _hoisted_17 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("span", { class: "text-body2 text-weight-regular" }, "pcs", -1));
const _hoisted_18 = { class: "q-gutter-sm" };
const _hoisted_19 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Price", -1));
const _hoisted_20 = { class: "q-gutter-sm" };
const _hoisted_21 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Sold Pcs", -1));
const _hoisted_22 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("span", { class: "text-body2 text-weight-regular" }, "pcs", -1));
const _hoisted_23 = { class: "q-gutter-sm" };
const _hoisted_24 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Sales Amount", -1));
const _hoisted_25 = { align: "right" };
const _sfc_main$3 = {
  __name: "SoftdrinksCard",
  setup(__props) {
    const salesReportsStore = useSalesReportsStore();
    const userData = salesReportsStore.user;
    const selectedItem = ref(null);
    const dialog = ref(false);
    const clickme = (item) => {
      selectedItem.value = item;
      dialog.value = true;
    };
    const softdrinksProductsReport = reactive({
      softdrinksSold: 0,
      remainnings: 0,
      beginnings: 0,
      softdrinksOut: 0
    });
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    };
    const softdrinksSalesAmount = computed(() => {
      if (selectedItem.value) {
        return softdrinksProductsReport.softdrinksSold * selectedItem.value.price;
      }
      return 0;
    });
    const softdrinksSalesAmountFormatted = computed(() => {
      return formatCurrency(softdrinksSalesAmount.value);
    });
    const calculateSofdrinksSold = () => {
      if (selectedItem.value) {
        const totalQuantity = parseInt(selectedItem.value.total_quantity) || 0;
        const remainings = parseInt(softdrinksProductsReport.remainnings) || 0;
        const softdrinksOut = parseInt(softdrinksProductsReport.softdrinksOut) || 0;
        const difference = remainings + softdrinksOut;
        softdrinksProductsReport.softdrinksSold = totalQuantity - difference;
      }
    };
    watch(
      () => softdrinksProductsReport.remainnings,
      (newRemaining) => {
        calculateSofdrinksSold();
      }
    );
    watch(
      () => softdrinksProductsReport.softdrinksOut,
      (newBreadOut) => {
        calculateSofdrinksSold();
      }
    );
    onMounted(async () => {
      var _a, _b;
      const userData2 = salesReportsStore.user;
      const branchId = ((_b = (_a = userData2 == null ? void 0 : userData2.data) == null ? void 0 : _a.employee) == null ? void 0 : _b.branch_employee.branch_id) || "";
      if (branchId) {
        await fetchProducts(branchId);
      }
    });
    const fetchProducts = async (branchId) => {
      await salesReportsStore.fetchBranchProducts(branchId);
    };
    const softdrinksProducts = computed(() => salesReportsStore.softdrinksProducts);
    watch(softdrinksProducts, (newVal) => {
    });
    const closeDialog = () => {
      selectedItem.value = null;
      softdrinksProductsReport.softdrinksSold = 0;
      softdrinksProductsReport.remainnings = 0;
      softdrinksProductsReport.beginnings = 0;
      softdrinksProductsReport.softdrinksOut = 0;
      dialog.value = false;
    };
    const saveReport = () => {
      var _a, _b, _c;
      if (selectedItem.value) {
        const report = {
          user_id: userData == null ? void 0 : userData.data.id,
          branch_id: ((_c = (_b = (_a = userData == null ? void 0 : userData.data) == null ? void 0 : _a.employee) == null ? void 0 : _b.branch_employee) == null ? void 0 : _c.branch_id) || "",
          product_id: selectedItem.value.product.id,
          name: selectedItem.value.product.name,
          total: selectedItem.value.total_quantity,
          added_stocks: selectedItem.value.new_production,
          sold: softdrinksProductsReport.softdrinksSold,
          out: softdrinksProductsReport.softdrinksOut,
          beginnings: selectedItem.value.beginnings,
          remaining: softdrinksProductsReport.remainnings,
          price: selectedItem.value.price,
          sales: softdrinksSalesAmount.value
        };
        salesReportsStore.updateSoftdrinksReport(report);
        closeDialog();
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$2, [
          createVNode(QScrollArea, { style: { "height": "450px", "max-width": "1500px" } }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_2$1, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(softdrinksProducts.value, (item, index) => {
                  return openBlock(), createBlock(QIntersection, {
                    key: index,
                    once: "",
                    transition: "scale",
                    class: "example-item"
                  }, {
                    default: withCtx(() => [
                      createVNode(QCard, {
                        onClick: ($event) => clickme(item),
                        class: "q-ma-sm my-card"
                      }, {
                        default: withCtx(() => [
                          _hoisted_3,
                          createVNode(QCardSection, null, {
                            default: withCtx(() => [
                              createBaseVNode("div", _hoisted_4, toDisplayString(item.product.name), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(QSeparator),
                          createVNode(QCardSection, { class: "text-subtitle2 text-weight-regular" }, {
                            default: withCtx(() => [
                              createBaseVNode("div", _hoisted_5, [
                                _hoisted_6,
                                createBaseVNode("div", null, toDisplayString(item.total_quantity), 1)
                              ]),
                              createBaseVNode("div", _hoisted_7, [
                                _hoisted_8,
                                createBaseVNode("div", null, toDisplayString(formatCurrency(item.price)), 1)
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ])
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", null, [
          createVNode(QDialog, {
            modelValue: dialog.value,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => dialog.value = $event)
          }, {
            default: withCtx(() => [
              createVNode(QCard, {
                class: "my-card q-pa-md",
                style: { "width": "700px", "max-width": "80vw" }
              }, {
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_9, [
                        createBaseVNode("div", _hoisted_10, toDisplayString(selectedItem.value ? selectedItem.value.product.name : ""), 1),
                        createBaseVNode("div", null, [
                          createVNode(QBtn, {
                            round: "",
                            dense: "",
                            flat: "",
                            icon: "close",
                            onClick: closeDialog
                          })
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_11, [
                        createBaseVNode("div", null, [
                          _hoisted_12,
                          createVNode(QInput, {
                            modelValue: softdrinksProductsReport.remainnings,
                            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => softdrinksProductsReport.remainnings = $event),
                            dense: "",
                            outlined: "",
                            mask: "#####",
                            type: "number",
                            suffix: "pcs",
                            placeholder: "0",
                            style: { "width": "260px", "max-width": "300px", "min-width": "50px" }
                          }, null, 8, ["modelValue"])
                        ]),
                        createBaseVNode("div", null, [
                          _hoisted_13,
                          createVNode(QInput, {
                            modelValue: softdrinksProductsReport.softdrinksOut,
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => softdrinksProductsReport.softdrinksOut = $event),
                            dense: "",
                            outlined: "",
                            mask: "#####",
                            type: "number",
                            suffix: "pcs",
                            placeholder: "0",
                            style: { "width": "260px", "max-width": "300px", "min-width": "50px" }
                          }, null, 8, ["modelValue"])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_14, [
                        createBaseVNode("div", _hoisted_15, [
                          _hoisted_16,
                          createVNode(QInput, {
                            dense: "",
                            outlined: "",
                            readonly: "",
                            label: selectedItem.value ? selectedItem.value.total_quantity : "",
                            style: { "width": "120px", "max-width": "300px", "min-width": "50px" }
                          }, {
                            append: withCtx(() => [
                              _hoisted_17
                            ]),
                            _: 1
                          }, 8, ["label"])
                        ]),
                        createBaseVNode("div", _hoisted_18, [
                          _hoisted_19,
                          createVNode(QInput, {
                            dense: "",
                            outlined: "",
                            readonly: "",
                            label: selectedItem.value ? formatCurrency(selectedItem.value.price) : "",
                            style: { "width": "120px", "max-width": "300px", "min-width": "50px" }
                          }, null, 8, ["label"])
                        ]),
                        createBaseVNode("div", _hoisted_20, [
                          _hoisted_21,
                          createVNode(QInput, {
                            dense: "",
                            modelValue: softdrinksProductsReport.softdrinksSold,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => softdrinksProductsReport.softdrinksSold = $event),
                            outlined: "",
                            "reverse-fill-mask": "",
                            readonly: "",
                            style: { "width": "120px", "max-width": "300px", "min-width": "50px" }
                          }, {
                            append: withCtx(() => [
                              _hoisted_22
                            ]),
                            _: 1
                          }, 8, ["modelValue"])
                        ]),
                        createBaseVNode("div", _hoisted_23, [
                          _hoisted_24,
                          createVNode(QInput, {
                            dense: "",
                            outlined: "",
                            modelValue: softdrinksSalesAmountFormatted.value,
                            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => softdrinksSalesAmountFormatted.value = $event),
                            readonly: "",
                            style: { "width": "150px", "max-width": "300px", "min-width": "50px" }
                          }, null, 8, ["modelValue"])
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_25, [
                        createVNode(QBtn, {
                          color: "red-6",
                          label: "Ok",
                          onClick: saveReport
                        })
                      ])
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
var SoftdrinksCard = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-5e8e5a1b"], ["__file", "SoftdrinksCard.vue"]]);
const _sfc_main$2 = {
  __name: "SoftdrinksSearch",
  setup(__props) {
    const searchEngine = ref("");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QInput, {
        modelValue: searchEngine.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchEngine.value = $event),
        rounded: "",
        outlined: "",
        dense: "",
        flat: "",
        placeholder: "Search...",
        style: { "width": "400px", "max-width": "450px", "min-width": "150px" }
      }, {
        append: withCtx(() => [
          createBaseVNode("div", null, [
            createVNode(QIcon, { name: "search" })
          ])
        ]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
};
var SoftdrinksSearch = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "SoftdrinksSearch.vue"]]);
const _hoisted_1$1 = { class: "q-gutter-y-md" };
const _hoisted_2 = { class: "row justify-between" };
const _sfc_main$1 = {
  __name: "SoftdrinksPage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$1, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("div", null, [
              createVNode(SoftdrinksSearch)
            ])
          ])
        ]),
        createBaseVNode("div", null, [
          createVNode(SoftdrinksCard)
        ])
      ], 64);
    };
  }
};
var SoftdrinksPage = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "SoftdrinksPage.vue"]]);
const _hoisted_1 = { class: "text-h6 text-white" };
const _sfc_main = {
  __name: "ProductsPage",
  setup(__props) {
    const productsTab = ref("bread");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QCard, { flat: "" }, {
        default: withCtx(() => [
          createVNode(QCardSection, { style: { "background-color": "#ef4444" } }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                createVNode(QIcon, { name: "fa-solid fa-store" }),
                createTextVNode(" Store Branches ")
              ])
            ]),
            _: 1
          }),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createVNode(QTabs, {
                modelValue: productsTab.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => productsTab.value = $event),
                dense: "",
                class: "bg-white",
                "active-color": "red-6",
                "indicator-color": "red-6",
                align: "justify"
              }, {
                default: withCtx(() => [
                  createVNode(QTab, {
                    name: "bread",
                    label: "Bread"
                  }),
                  createVNode(QTab, {
                    name: "selecta",
                    label: "Selecta"
                  }),
                  createVNode(QTab, {
                    name: "softdrinks",
                    label: "Softdrinks"
                  })
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createVNode(QTabPanels, {
                modelValue: productsTab.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => productsTab.value = $event),
                animated: ""
              }, {
                default: withCtx(() => [
                  createVNode(QTabPanel, { name: "bread" }, {
                    default: withCtx(() => [
                      createBaseVNode("div", null, [
                        createVNode(BreadPage)
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(QTabPanel, { name: "selecta" }, {
                    default: withCtx(() => [
                      createBaseVNode("div", null, [
                        createVNode(SelectaPage)
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(QTabPanel, { name: "softdrinks" }, {
                    default: withCtx(() => [
                      createBaseVNode("div", null, [
                        createVNode(SoftdrinksPage)
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
var ProductsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "ProductsPage.vue"]]);
export { ProductsPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdHNQYWdlLjUwYjYzZmNhLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvYnJhbmNoL3NhbGVzX2xhZHkvcHJvZHVjdHMvYnJlYWQvY29tcG9uZW50cy9CcmVhZENhcmQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9zYWxlc19sYWR5L3Byb2R1Y3RzL2JyZWFkL2NvbXBvbmVudHMvQnJlYWRTZWFyY2gudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9zYWxlc19sYWR5L3Byb2R1Y3RzL3NlbGVjdGEvY29tcG9uZW50cy9TZWxlY3RhU2VhcmNoLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9icmFuY2gvc2FsZXNfbGFkeS9wcm9kdWN0cy9zZWxlY3RhL2NvbXBvbmVudHMvU2VsZWN0YUNhcmQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9zYWxlc19sYWR5L3Byb2R1Y3RzL3NvZnRkcmlua3MvY29tcG9uZW50cy9Tb2Z0ZHJpbmtzQ2FyZC52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYnJhbmNoL3NhbGVzX2xhZHkvcHJvZHVjdHMvc29mdGRyaW5rcy9jb21wb25lbnRzL1NvZnRkcmlua3NTZWFyY2gudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9zYWxlc19sYWR5L3Byb2R1Y3RzL1Byb2R1Y3RzUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwicS1tdC1tZFwiPlxuICAgIDxxLXNjcm9sbC1hcmVhIHN0eWxlPVwiaGVpZ2h0OiA3MDBweDsgbWF4LXdpZHRoOiAxNTAwcHhcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1wYS1sZyBxLWd1dHRlci15LWxnXCI+XG4gICAgICAgIDxxLWludGVyc2VjdGlvblxuICAgICAgICAgIHYtZm9yPVwiKGl0ZW0sIGluZGV4KSBpbiBicmVhZFByb2R1Y3RzXCJcbiAgICAgICAgICA6a2V5PVwiaW5kZXhcIlxuICAgICAgICAgIG9uY2VcbiAgICAgICAgICB0cmFuc2l0aW9uPVwic2NhbGVcIlxuICAgICAgICAgIGNsYXNzPVwiZXhhbXBsZS1pdGVtIHEtZ3V0dGVyLXNtXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxxLWNhcmQgQGNsaWNrPVwiY2xpY2ttZShpdGVtKVwiIGNsYXNzPVwicS1tYS1zbSBteS1jYXJkXCI+XG4gICAgICAgICAgICA8IS0tIFVzaW5nIGEgc3RhdGljIGltYWdlIFVSTCBmb3Igbm93IC0tPlxuICAgICAgICAgICAgPGltZyBzcmM9XCJodHRwczovL2Nkbi5xdWFzYXIuZGV2L2ltZy9jaGlja2VuLXNhbGFkLmpwZ1wiIC8+XG4gICAgICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+e3sgaXRlbS5wcm9kdWN0Lm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgICA8cS1zZXBhcmF0b3IgLz5cbiAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInRleHQtc3VidGl0bGUyIHRleHQtd2VpZ2h0LXJlZ3VsYXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtcGEteG0gcm93IHEtZ3V0dGVyLXgtc20ganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5RdWFudGl0eTo8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2Pnt7IGl0ZW0udG90YWxfcXVhbnRpdHkgfX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLXBhLXhtIHJvdyBxLWd1dHRlci14LXNtIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxkaXY+UHJpY2U6PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj57eyBmb3JtYXRDdXJyZW5jeShpdGVtLnByaWNlKSB9fTwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgPC9xLWNhcmQ+XG4gICAgICAgIDwvcS1pbnRlcnNlY3Rpb24+XG4gICAgICA8L2Rpdj5cbiAgICA8L3Etc2Nyb2xsLWFyZWE+XG4gIDwvZGl2PlxuICA8ZGl2PlxuICAgIDxxLWRpYWxvZyB2LW1vZGVsPVwiZGlhbG9nXCI+XG4gICAgICA8cS1jYXJkIGNsYXNzPVwibXktY2FyZCBxLXBhLW1kXCIgc3R5bGU9XCJ3aWR0aDogNzAwcHg7IG1heC13aWR0aDogODB2d1wiPlxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+XG4gICAgICAgICAgICAgIHt7IHNlbGVjdGVkSXRlbSA/IHNlbGVjdGVkSXRlbS5wcm9kdWN0Lm5hbWUgOiBcIlwiIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxxLWJ0biByb3VuZCBkZW5zZSBmbGF0IGljb249XCJjbG9zZVwiIEBjbGljaz1cImNsb3NlRGlhbG9nXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtbWItbGcgcm93IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWxpZ2h0XCI+UmVtYWlubmluZ3M8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiYnJlYWRQcm9kdWN0c1JlcG9ydC5yZW1haW5uaW5nc1wiXG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIG1hc2s9XCIjIyMjI1wiXG4gICAgICAgICAgICAgICAgc3VmZml4PVwicGNzXCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjBcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDI2MHB4OyBtYXgtd2lkdGg6IDMwMHB4OyBtaW4td2lkdGg6IDUwcHhcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC13ZWlnaHQtbGlnaHRcIj5CcmVhZCBPdXQ8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiYnJlYWRQcm9kdWN0c1JlcG9ydC5icmVhZE91dFwiXG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgIG1hc2s9XCIjIyMjI1wiXG4gICAgICAgICAgICAgICAgc3VmZml4PVwicGNzXCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjBcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDI2MHB4OyBtYXgtd2lkdGg6IDMwMHB4OyBtaW4td2lkdGg6IDUwcHhcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci14bSBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci1zbVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC13ZWlnaHQtbGlnaHRcIj5Ub3RhbCBCcmVhZDwvZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgICAgIDpsYWJlbD1cInNlbGVjdGVkSXRlbSA/IHNlbGVjdGVkSXRlbS50b3RhbF9xdWFudGl0eSA6ICcnXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMjBweDsgbWF4LXdpZHRoOiAzMDBweDsgbWluLXdpZHRoOiA1MHB4XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWJvZHkyIHRleHQtd2VpZ2h0LXJlZ3VsYXJcIj5wY3M8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItc21cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWxpZ2h0XCI+UHJpY2U8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgICA6bGFiZWw9XCJzZWxlY3RlZEl0ZW0gPyBmb3JtYXRDdXJyZW5jeShzZWxlY3RlZEl0ZW0ucHJpY2UpIDogJydcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEyMHB4OyBtYXgtd2lkdGg6IDMwMHB4OyBtaW4td2lkdGg6IDUwcHhcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItc21cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWxpZ2h0XCI+U29sZCBQY3M8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJicmVhZFByb2R1Y3RzUmVwb3J0LmJyZWFkU29sZFwiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICByZXZlcnNlLWZpbGwtbWFza1xuICAgICAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTIwcHg7IG1heC13aWR0aDogMzAwcHg7IG1pbi13aWR0aDogNTBweFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1ib2R5MiB0ZXh0LXdlaWdodC1yZWd1bGFyXCI+cGNzPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXNtXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1saWdodFwiPlNhbGVzIEFtb3VudDwvZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiYnJlYWRTYWxlc0Ftb3VudEZvcm1hdHRlZFwiXG4gICAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxNTBweDsgbWF4LXdpZHRoOiAzMDBweDsgbWluLXdpZHRoOiA1MHB4XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDwhLS0gPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtYm9keTIgdGV4dC13ZWlnaHQtcmVndWxhclwiPlBIUDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPiAtLT5cbiAgICAgICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8ZGl2IGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgICAgIDxxLWJ0biBjb2xvcj1cInJlZC02XCIgbGFiZWw9XCJPa1wiIEBjbGljaz1cInNhdmVSZXBvcnRcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPC9xLWNhcmQ+XG4gICAgPC9xLWRpYWxvZz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgdXNlU2FsZXNSZXBvcnRzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9zYWxlcy1yZXBvcnRcIjtcbmltcG9ydCB7IGNvbXB1dGVkLCBvbk1vdW50ZWQsIHJlYWN0aXZlLCByZWYsIHdhdGNoIH0gZnJvbSBcInZ1ZVwiO1xuXG5jb25zdCBzYWxlc1JlcG9ydHNTdG9yZSA9IHVzZVNhbGVzUmVwb3J0c1N0b3JlKCk7XG5jb25zdCB1c2VyRGF0YSA9IHNhbGVzUmVwb3J0c1N0b3JlLnVzZXI7XG5jb25zb2xlLmxvZyhcInVzZXJkYXRcIiwgdXNlckRhdGEpO1xuY29uc3Qgc2VsZWN0ZWRJdGVtID0gcmVmKG51bGwpO1xuY29uc3QgZGlhbG9nID0gcmVmKGZhbHNlKTtcblxuY29uc3QgY2xpY2ttZSA9IChpdGVtKSA9PiB7XG4gIHNlbGVjdGVkSXRlbS52YWx1ZSA9IGl0ZW07XG4gIGRpYWxvZy52YWx1ZSA9IHRydWU7XG59O1xuXG5jb25zdCBicmVhZFByb2R1Y3RzUmVwb3J0ID0gcmVhY3RpdmUoe1xuICBicmVhZFNvbGQ6IDAsXG4gIHJlbWFpbm5pbmdzOiAwLFxuICBiZWdpbm5pbmdzOiAwLFxuICBicmVhZE91dDogMCxcbn0pO1xuXG5jb25zdCBmb3JtYXRDdXJyZW5jeSA9ICh2YWx1ZSkgPT4ge1xuICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KFwiZW4tVVNcIiwge1xuICAgIHN0eWxlOiBcImN1cnJlbmN5XCIsXG4gICAgY3VycmVuY3k6IFwiUEhQXCIsXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgfSkuZm9ybWF0KHZhbHVlKTtcbn07XG5cbmNvbnN0IGNhbGN1bGF0ZUJyZWFkU29sZCA9ICgpID0+IHtcbiAgaWYgKHNlbGVjdGVkSXRlbS52YWx1ZSkge1xuICAgIGNvbnN0IHRvdGFsUXVhbnRpdHkgPSBwYXJzZUludChzZWxlY3RlZEl0ZW0udmFsdWUudG90YWxfcXVhbnRpdHkpIHx8IDA7XG4gICAgY29uc3QgcmVtYWluaW5ncyA9IHBhcnNlSW50KGJyZWFkUHJvZHVjdHNSZXBvcnQucmVtYWlubmluZ3MpIHx8IDA7XG4gICAgY29uc3QgYnJlYWRPdXQgPSBwYXJzZUludChicmVhZFByb2R1Y3RzUmVwb3J0LmJyZWFkT3V0KSB8fCAwO1xuICAgIGNvbnN0IGRpZmZlcmVuY2UgPSByZW1haW5pbmdzICsgYnJlYWRPdXQ7XG4gICAgYnJlYWRQcm9kdWN0c1JlcG9ydC5icmVhZFNvbGQgPSB0b3RhbFF1YW50aXR5IC0gZGlmZmVyZW5jZTtcbiAgfVxufTtcblxud2F0Y2goXG4gICgpID0+IGJyZWFkUHJvZHVjdHNSZXBvcnQucmVtYWlubmluZ3MsXG4gIChuZXdSZW1haW5pbmcpID0+IHtcbiAgICBjYWxjdWxhdGVCcmVhZFNvbGQoKTtcbiAgfVxuKTtcblxud2F0Y2goXG4gICgpID0+IGJyZWFkUHJvZHVjdHNSZXBvcnQuYnJlYWRPdXQsXG4gIChuZXdCcmVhZE91dCkgPT4ge1xuICAgIGNhbGN1bGF0ZUJyZWFkU29sZCgpO1xuICB9XG4pO1xuXG5jb25zdCBicmVhZFNhbGVzQW1vdW50ID0gY29tcHV0ZWQoKCkgPT4ge1xuICBpZiAoc2VsZWN0ZWRJdGVtLnZhbHVlKSB7XG4gICAgcmV0dXJuIGJyZWFkUHJvZHVjdHNSZXBvcnQuYnJlYWRTb2xkICogc2VsZWN0ZWRJdGVtLnZhbHVlLnByaWNlO1xuICB9XG4gIHJldHVybiAwO1xufSk7XG5cbmNvbnN0IGJyZWFkU2FsZXNBbW91bnRGb3JtYXR0ZWQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiBmb3JtYXRDdXJyZW5jeShicmVhZFNhbGVzQW1vdW50LnZhbHVlKTtcbn0pO1xuXG5vbk1vdW50ZWQoYXN5bmMgKCkgPT4ge1xuICBjb25zdCB1c2VyRGF0YSA9IHNhbGVzUmVwb3J0c1N0b3JlLnVzZXI7XG4gIGNvbnN0IGJyYW5jaElkID0gdXNlckRhdGE/LmRhdGE/LmVtcGxveWVlPy5icmFuY2hfZW1wbG95ZWUuYnJhbmNoX2lkIHx8IFwiXCI7XG4gIGlmIChicmFuY2hJZCkge1xuICAgIGF3YWl0IGZldGNoUHJvZHVjdHMoYnJhbmNoSWQpO1xuICB9XG59KTtcblxuY29uc3QgZmV0Y2hQcm9kdWN0cyA9IGFzeW5jIChicmFuY2hJZCkgPT4ge1xuICBjb25zdCByZXMgPSBhd2FpdCBzYWxlc1JlcG9ydHNTdG9yZS5mZXRjaEJyYW5jaFByb2R1Y3RzKGJyYW5jaElkKTtcbn07XG5cbmNvbnN0IGJyZWFkUHJvZHVjdHMgPSBjb21wdXRlZCgoKSA9PiBzYWxlc1JlcG9ydHNTdG9yZS5icmVhZFByb2R1Y3RzKTtcbndhdGNoKGJyZWFkUHJvZHVjdHMsIChuZXdWYWwpID0+IHtcbiAgLy8gY29uc29sZS5sb2coXCJicmVhZFByb2R1Y3RzIHVwZGF0ZWQ6XCIsIG5ld1ZhbCk7XG59KTtcblxuY29uc3QgY2xvc2VEaWFsb2cgPSAoKSA9PiB7XG4gIHNlbGVjdGVkSXRlbS52YWx1ZSA9IG51bGw7XG4gIGJyZWFkUHJvZHVjdHNSZXBvcnQuYnJlYWRTb2xkID0gMDtcbiAgYnJlYWRQcm9kdWN0c1JlcG9ydC5yZW1haW5uaW5ncyA9IDA7XG4gIGJyZWFkUHJvZHVjdHNSZXBvcnQuYmVnaW5uaW5ncyA9IDA7XG4gIGJyZWFkUHJvZHVjdHNSZXBvcnQuYnJlYWRPdXQgPSAwO1xuICBkaWFsb2cudmFsdWUgPSBmYWxzZTtcbn07XG5cbmNvbnN0IHNhdmVSZXBvcnQgPSAoKSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKFwiY2xpY2tja2Nra1wiKTtcbiAgaWYgKHNlbGVjdGVkSXRlbS52YWx1ZSkge1xuICAgIGNvbnN0IHJlcG9ydCA9IHtcbiAgICAgIHVzZXJfaWQ6IHVzZXJEYXRhPy5kYXRhLmlkLFxuICAgICAgYnJhbmNoX2lkOiB1c2VyRGF0YT8uZGF0YT8uZW1wbG95ZWU/LmJyYW5jaF9lbXBsb3llZT8uYnJhbmNoX2lkIHx8IFwiXCIsXG4gICAgICBwcm9kdWN0X2lkOiBzZWxlY3RlZEl0ZW0udmFsdWUucHJvZHVjdC5pZCxcbiAgICAgIG5hbWU6IHNlbGVjdGVkSXRlbS52YWx1ZS5wcm9kdWN0Lm5hbWUsXG4gICAgICB0b3RhbDogc2VsZWN0ZWRJdGVtLnZhbHVlLnRvdGFsX3F1YW50aXR5LFxuICAgICAgbmV3X3Byb2R1Y3Rpb246IHNlbGVjdGVkSXRlbS52YWx1ZS5uZXdfcHJvZHVjdGlvbixcbiAgICAgIGJyZWFkX3NvbGQ6IGJyZWFkUHJvZHVjdHNSZXBvcnQuYnJlYWRTb2xkLFxuICAgICAgYnJlYWRfb3V0OiBicmVhZFByb2R1Y3RzUmVwb3J0LmJyZWFkT3V0LFxuICAgICAgYmVnaW5uaW5nczogc2VsZWN0ZWRJdGVtLnZhbHVlLmJlZ2lubmluZ3MsXG4gICAgICByZW1haW5pbmc6IGJyZWFkUHJvZHVjdHNSZXBvcnQucmVtYWlubmluZ3MsXG4gICAgICBwcmljZTogc2VsZWN0ZWRJdGVtLnZhbHVlLnByaWNlLFxuICAgICAgc2FsZXM6IGJyZWFkU2FsZXNBbW91bnQudmFsdWUsXG4gICAgfTtcbiAgICBzYWxlc1JlcG9ydHNTdG9yZS51cGRhdGVCcmVhZFJlcG9ydChyZXBvcnQpO1xuICAgIGNsb3NlRGlhbG9nKCk7XG4gIH1cbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuLmV4YW1wbGUtaXRlbSB7XG4gIHdpZHRoOiAxOTBweDtcbiAgbWF4LXdpZHRoOiA1MDBweDtcbiAgbWluLXdpZHRoOiA4MHB4O1xuICBoZWlnaHQ6IDI1MHB4O1xuICBtYXgtaGVpZ2h0OiA1MDBweDtcbiAgbWluLWhlaWdodDogMjAwcHg7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1pbnB1dFxuICAgIHYtbW9kZWw9XCJzZWFyY2hFbmdpbmVcIlxuICAgIHJvdW5kZWRcbiAgICBvdXRsaW5lZFxuICAgIGRlbnNlXG4gICAgZmxhdFxuICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoLi4uXCJcbiAgICBzdHlsZT1cIndpZHRoOiA0MDBweDsgbWF4LXdpZHRoOiA0NTBweDsgbWluLXdpZHRoOiAxNTBweFwiXG4gID5cbiAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxxLWljb24gbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L3RlbXBsYXRlPlxuICA8L3EtaW5wdXQ+XG48L3RlbXBsYXRlPlxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcbmNvbnN0IHNlYXJjaEVuZ2luZSA9IHJlZihcIlwiKTtcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8cS1pbnB1dFxuICAgIHYtbW9kZWw9XCJzZWFyY2hFbmdpbmVcIlxuICAgIHJvdW5kZWRcbiAgICBvdXRsaW5lZFxuICAgIGRlbnNlXG4gICAgZmxhdFxuICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoLi4uXCJcbiAgICBzdHlsZT1cIndpZHRoOiA0MDBweDsgbWF4LXdpZHRoOiA0NTBweDsgbWluLXdpZHRoOiAxNTBweFwiXG4gID5cbiAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxxLWljb24gbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L3RlbXBsYXRlPlxuICA8L3EtaW5wdXQ+XG48L3RlbXBsYXRlPlxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3Qgc2VhcmNoRW5naW5lID0gcmVmKFwiXCIpO1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJxLW10LW1kXCI+XG4gICAgPHEtc2Nyb2xsLWFyZWEgc3R5bGU9XCJoZWlnaHQ6IDQ1MHB4OyBtYXgtd2lkdGg6IDE1MDBweFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLXBhLWxnIHEtZ3V0dGVyLXNtIHEtZ3V0dGVyLXktbWRcIj5cbiAgICAgICAgPHEtaW50ZXJzZWN0aW9uXG4gICAgICAgICAgdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIHNlbGVjdGFQcm9kdWN0c1wiXG4gICAgICAgICAgOmtleT1cImluZGV4XCJcbiAgICAgICAgICBvbmNlXG4gICAgICAgICAgdHJhbnNpdGlvbj1cInNjYWxlXCJcbiAgICAgICAgICBjbGFzcz1cImV4YW1wbGUtaXRlbVwiXG4gICAgICAgID5cbiAgICAgICAgICA8cS1jYXJkIEBjbGljaz1cImNsaWNrbWUoaXRlbSlcIiBjbGFzcz1cInEtbWEtc20gbXktY2FyZFwiPlxuICAgICAgICAgICAgPCEtLSBVc2luZyBhIHN0YXRpYyBpbWFnZSBVUkwgZm9yIG5vdyAtLT5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9jZG4ucXVhc2FyLmRldi9pbWcvY2hpY2tlbi1zYWxhZC5qcGdcIiAvPlxuICAgICAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPnt7IGl0ZW0ucHJvZHVjdC5uYW1lIH19PC9kaXY+XG4gICAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgPHEtc2VwYXJhdG9yIC8+XG4gICAgICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMiB0ZXh0LXdlaWdodC1yZWd1bGFyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLXBhLXhtIHJvdyBxLWd1dHRlci14LXNtIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxkaXY+UXVhbnRpdHk6PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj57eyBpdGVtLnRvdGFsX3F1YW50aXR5IH19PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1wYS14bSByb3cgcS1ndXR0ZXIteC1zbSBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlByaWNlOjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+e3sgZm9ybWF0Q3VycmVuY3koaXRlbS5wcmljZSkgfX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDwvcS1jYXJkPlxuICAgICAgICA8L3EtaW50ZXJzZWN0aW9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9xLXNjcm9sbC1hcmVhPlxuICA8L2Rpdj5cbiAgPGRpdj5cbiAgICA8cS1kaWFsb2cgdi1tb2RlbD1cImRpYWxvZ1wiPlxuICAgICAgPHEtY2FyZCBjbGFzcz1cIm15LWNhcmQgcS1wYS1tZFwiIHN0eWxlPVwid2lkdGg6IDcwMHB4OyBtYXgtd2lkdGg6IDgwdndcIj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPlxuICAgICAgICAgICAgICB7eyBzZWxlY3RlZEl0ZW0gPyBzZWxlY3RlZEl0ZW0ucHJvZHVjdC5uYW1lIDogXCJcIiB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cS1idG4gcm91bmQgZGVuc2UgZmxhdCBpY29uPVwiY2xvc2VcIiBAY2xpY2s9XCJjbG9zZURpYWxvZ1wiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW1iLWxnIHJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1saWdodFwiPlJlbWFpbm5pbmdzPC9kaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cInNlbGVjdGFQcm9kdWN0UmVwb3J0LnNlbGVjdGFSZW1haW5pbmdzXCJcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgbWFzaz1cIiMjIyMjXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICBzdWZmaXg9XCJwY3NcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiMFwiXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMjYwcHg7IG1heC13aWR0aDogMzAwcHg7IG1pbi13aWR0aDogNTBweFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1saWdodFwiPlNlbGVjdGEgT3V0PC9kaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cInNlbGVjdGFQcm9kdWN0UmVwb3J0LnNlbGVjdGFPdXRcIlxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBtYXNrPVwiIyMjIyNcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgIHN1ZmZpeD1cInBjc1wiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIwXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAyNjBweDsgbWF4LXdpZHRoOiAzMDBweDsgbWluLXdpZHRoOiA1MHB4XCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXIteG0ganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItc21cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWxpZ2h0XCI+VG90YWwgU2VsZWN0YTwvZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgICAgIDpsYWJlbD1cInNlbGVjdGVkSXRlbSA/IHNlbGVjdGVkSXRlbS50b3RhbF9xdWFudGl0eSA6ICcnXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMjBweDsgbWF4LXdpZHRoOiAzMDBweDsgbWluLXdpZHRoOiA1MHB4XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWJvZHkyIHRleHQtd2VpZ2h0LXJlZ3VsYXJcIj5wY3M8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItc21cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWxpZ2h0XCI+UHJpY2U8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgICA6bGFiZWw9XCJzZWxlY3RlZEl0ZW0gPyBmb3JtYXRDdXJyZW5jeShzZWxlY3RlZEl0ZW0ucHJpY2UpIDogJydcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEyMHB4OyBtYXgtd2lkdGg6IDMwMHB4OyBtaW4td2lkdGg6IDUwcHhcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItc21cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWxpZ2h0XCI+U29sZCBQY3M8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJzZWxlY3RhUHJvZHVjdFJlcG9ydC5zZWxlY3RhU29sZFwiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICByZXZlcnNlLWZpbGwtbWFza1xuICAgICAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTIwcHg7IG1heC13aWR0aDogMzAwcHg7IG1pbi13aWR0aDogNTBweFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1ib2R5MiB0ZXh0LXdlaWdodC1yZWd1bGFyXCI+cGNzPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXNtXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1saWdodFwiPlNhbGVzIEFtb3VudDwvZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwic2VsZWN0YVNhbGVzQW1vdW50Rm9ybWF0dGVkXCJcbiAgICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDE1MHB4OyBtYXgtd2lkdGg6IDMwMHB4OyBtaW4td2lkdGg6IDUwcHhcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPCEtLSA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1ib2R5MiB0ZXh0LXdlaWdodC1yZWd1bGFyXCI+UEhQPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+IC0tPlxuICAgICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxkaXYgYWxpZ249XCJyaWdodFwiPlxuICAgICAgICAgICAgPHEtYnRuIGNvbG9yPVwicmVkLTZcIiBsYWJlbD1cIk9rXCIgQGNsaWNrPVwic2F2ZVJlcG9ydFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8L3EtY2FyZD5cbiAgICA8L3EtZGlhbG9nPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VTYWxlc1JlcG9ydHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3NhbGVzLXJlcG9ydFwiO1xuaW1wb3J0IHsgY29tcHV0ZWQsIG9uTW91bnRlZCwgcmVhY3RpdmUsIHJlZiwgd2F0Y2ggfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IHNhbGVzUmVwb3J0c1N0b3JlID0gdXNlU2FsZXNSZXBvcnRzU3RvcmUoKTtcbmNvbnN0IHVzZXJEYXRhID0gc2FsZXNSZXBvcnRzU3RvcmUudXNlcjtcbmNvbnN0IHNlbGVjdGVkSXRlbSA9IHJlZihudWxsKTtcbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IGNsaWNrbWUgPSAoaXRlbSkgPT4ge1xuICBzZWxlY3RlZEl0ZW0udmFsdWUgPSBpdGVtO1xuICBkaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcblxuY29uc3Qgc2VsZWN0YVByb2R1Y3RSZXBvcnQgPSByZWFjdGl2ZSh7XG4gIHNlbGVjdGFTb2xkOiAwLFxuICBzZWxlY3RhUmVtYWluaW5nczogMCxcbiAgc2VsZWN0YUJlZ2lubmluZ3M6IDAsXG4gIHNlbGVjdGFPdXQ6IDAsXG59KTtcblxuY29uc3QgZm9ybWF0Q3VycmVuY3kgPSAodmFsdWUpID0+IHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChcImVuLVVTXCIsIHtcbiAgICBzdHlsZTogXCJjdXJyZW5jeVwiLFxuICAgIGN1cnJlbmN5OiBcIlBIUFwiLFxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gIH0pLmZvcm1hdCh2YWx1ZSk7XG59O1xuXG5jb25zdCBzZWxlY3RhU2FsZXNBbW91bnQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmIChzZWxlY3RlZEl0ZW0udmFsdWUpIHtcbiAgICByZXR1cm4gc2VsZWN0YVByb2R1Y3RSZXBvcnQuc2VsZWN0YVNvbGQgKiBzZWxlY3RlZEl0ZW0udmFsdWUucHJpY2U7XG4gIH1cbiAgcmV0dXJuIDA7XG59KTtcblxuY29uc3Qgc2VsZWN0YVNhbGVzQW1vdW50Rm9ybWF0dGVkID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gZm9ybWF0Q3VycmVuY3koc2VsZWN0YVNhbGVzQW1vdW50LnZhbHVlKTtcbn0pO1xuXG5jb25zdCBjYWxjdWxhdGVTZWxlY3RhID0gKCkgPT4ge1xuICBpZiAoc2VsZWN0ZWRJdGVtLnZhbHVlKSB7XG4gICAgY29uc3QgdG90YWxRdWFudGl0eSA9IHBhcnNlSW50KHNlbGVjdGVkSXRlbS52YWx1ZS50b3RhbF9xdWFudGl0eSkgfHwgMDtcbiAgICBjb25zdCByZW1haW5pbmdzID0gcGFyc2VJbnQoc2VsZWN0YVByb2R1Y3RSZXBvcnQuc2VsZWN0YVJlbWFpbmluZ3MpIHx8IDA7XG4gICAgY29uc3Qgc2VsZWN0YU91dCA9IHBhcnNlSW50KHNlbGVjdGFQcm9kdWN0UmVwb3J0LnNlbGVjdGFPdXQpIHx8IDA7XG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IHJlbWFpbmluZ3MgKyBzZWxlY3RhT3V0O1xuICAgIHNlbGVjdGFQcm9kdWN0UmVwb3J0LnNlbGVjdGFTb2xkID0gdG90YWxRdWFudGl0eSAtIGRpZmZlcmVuY2U7XG4gIH1cbn07XG5cbndhdGNoKFxuICAoKSA9PiBzZWxlY3RhUHJvZHVjdFJlcG9ydC5zZWxlY3RhUmVtYWluaW5ncyxcbiAgKG5ld1JlbWFpbmluZykgPT4ge1xuICAgIGNhbGN1bGF0ZVNlbGVjdGEoKTtcbiAgfVxuKTtcblxud2F0Y2goXG4gICgpID0+IHNlbGVjdGFQcm9kdWN0UmVwb3J0LnNlbGVjdGFPdXQsXG4gIChuZXdCcmVhZE91dCkgPT4ge1xuICAgIGNhbGN1bGF0ZVNlbGVjdGEoKTtcbiAgfVxuKTtcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgY29uc3QgdXNlckRhdGEgPSBzYWxlc1JlcG9ydHNTdG9yZS51c2VyO1xuICBjb25zdCBicmFuY2hJZCA9IHVzZXJEYXRhPy5kYXRhPy5lbXBsb3llZT8uYnJhbmNoX2VtcGxveWVlLmJyYW5jaF9pZCB8fCBcIlwiO1xuICBpZiAoYnJhbmNoSWQpIHtcbiAgICBhd2FpdCBmZXRjaFByb2R1Y3RzKGJyYW5jaElkKTtcbiAgfVxufSk7XG5cbmNvbnN0IGZldGNoUHJvZHVjdHMgPSBhc3luYyAoYnJhbmNoSWQpID0+IHtcbiAgYXdhaXQgc2FsZXNSZXBvcnRzU3RvcmUuZmV0Y2hCcmFuY2hQcm9kdWN0cyhicmFuY2hJZCk7XG59O1xuXG5jb25zdCBzZWxlY3RhUHJvZHVjdHMgPSBjb21wdXRlZCgoKSA9PiBzYWxlc1JlcG9ydHNTdG9yZS5zZWxlY3RhUHJvZHVjdHMpO1xud2F0Y2goc2VsZWN0YVByb2R1Y3RzLCAobmV3VmFsKSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKFwic2VsZWN0YVByb2R1Y3RzIHVwZGF0ZWQ6XCIsIG5ld1ZhbCk7XG59KTtcblxuY29uc3QgY2xvc2VEaWFsb2cgPSAoKSA9PiB7XG4gIHNlbGVjdGVkSXRlbS52YWx1ZSA9IG51bGw7XG4gIHNlbGVjdGFQcm9kdWN0UmVwb3J0LnNlbGVjdGFTb2xkID0gMDtcbiAgc2VsZWN0YVByb2R1Y3RSZXBvcnQuc2VsZWN0YVJlbWFpbmluZ3MgPSAwO1xuICBzZWxlY3RhUHJvZHVjdFJlcG9ydC5zZWxlY3RhQmVnaW5uaW5ncyA9IDA7XG4gIHNlbGVjdGFQcm9kdWN0UmVwb3J0LnNlbGVjdGFPdXQgPSAwO1xuICBkaWFsb2cudmFsdWUgPSBmYWxzZTtcbn07XG5cbmNvbnN0IHNhdmVSZXBvcnQgPSAoKSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKFwiY2xpY2tja2Nra1wiKTtcbiAgaWYgKHNlbGVjdGVkSXRlbS52YWx1ZSkge1xuICAgIGNvbnN0IHJlcG9ydCA9IHtcbiAgICAgIHVzZXJfaWQ6IHVzZXJEYXRhPy5kYXRhLmlkLFxuICAgICAgYnJhbmNoX2lkOiB1c2VyRGF0YT8uZGF0YT8uZW1wbG95ZWU/LmJyYW5jaF9lbXBsb3llZT8uYnJhbmNoX2lkIHx8IFwiXCIsXG4gICAgICBwcm9kdWN0X2lkOiBzZWxlY3RlZEl0ZW0udmFsdWUucHJvZHVjdC5pZCxcbiAgICAgIG5hbWU6IHNlbGVjdGVkSXRlbS52YWx1ZS5wcm9kdWN0Lm5hbWUsXG4gICAgICB0b3RhbDogc2VsZWN0ZWRJdGVtLnZhbHVlLnRvdGFsX3F1YW50aXR5LFxuICAgICAgYWRkZWRfc3RvY2tzOiBzZWxlY3RlZEl0ZW0udmFsdWUubmV3X3Byb2R1Y3Rpb24sXG4gICAgICBzb2xkOiBzZWxlY3RhUHJvZHVjdFJlcG9ydC5zZWxlY3RhU29sZCxcbiAgICAgIG91dDogc2VsZWN0YVByb2R1Y3RSZXBvcnQuc2VsZWN0YU91dCxcbiAgICAgIGJlZ2lubmluZ3M6IHNlbGVjdGVkSXRlbS52YWx1ZS5iZWdpbm5pbmdzLFxuICAgICAgcmVtYWluaW5nOiBzZWxlY3RhUHJvZHVjdFJlcG9ydC5zZWxlY3RhUmVtYWluaW5ncyxcbiAgICAgIHByaWNlOiBzZWxlY3RlZEl0ZW0udmFsdWUucHJpY2UsXG4gICAgICBzYWxlczogc2VsZWN0YVNhbGVzQW1vdW50LnZhbHVlLFxuICAgIH07XG4gICAgc2FsZXNSZXBvcnRzU3RvcmUudXBkYXRlU2VsZWN0YVJlcG9ydChyZXBvcnQpO1xuICAgIGNsb3NlRGlhbG9nKCk7XG4gIH1cbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuLmV4YW1wbGUtaXRlbSB7XG4gIHdpZHRoOiAxOTBweDtcbiAgbWF4LXdpZHRoOiA1MDBweDtcbiAgbWluLXdpZHRoOiA4MHB4O1xuICBoZWlnaHQ6IDI1MHB4O1xuICBtYXgtaGVpZ2h0OiA1MDBweDtcbiAgbWluLWhlaWdodDogMjAwcHg7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwicS1tdC1tZFwiPlxuICAgIDxxLXNjcm9sbC1hcmVhIHN0eWxlPVwiaGVpZ2h0OiA0NTBweDsgbWF4LXdpZHRoOiAxNTAwcHhcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1wYS1sZyBxLWd1dHRlci1zbSBxLWd1dHRlci15LW1kXCI+XG4gICAgICAgIDxxLWludGVyc2VjdGlvblxuICAgICAgICAgIHYtZm9yPVwiKGl0ZW0sIGluZGV4KSBpbiBzb2Z0ZHJpbmtzUHJvZHVjdHNcIlxuICAgICAgICAgIDprZXk9XCJpbmRleFwiXG4gICAgICAgICAgb25jZVxuICAgICAgICAgIHRyYW5zaXRpb249XCJzY2FsZVwiXG4gICAgICAgICAgY2xhc3M9XCJleGFtcGxlLWl0ZW1cIlxuICAgICAgICA+XG4gICAgICAgICAgPHEtY2FyZCBAY2xpY2s9XCJjbGlja21lKGl0ZW0pXCIgY2xhc3M9XCJxLW1hLXNtIG15LWNhcmRcIj5cbiAgICAgICAgICAgIDwhLS0gVXNpbmcgYSBzdGF0aWMgaW1hZ2UgVVJMIGZvciBub3cgLS0+XG4gICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vY2RuLnF1YXNhci5kZXYvaW1nL2NoaWNrZW4tc2FsYWQuanBnXCIgLz5cbiAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj57eyBpdGVtLnByb2R1Y3QubmFtZSB9fTwvZGl2PlxuICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgIDxxLXNlcGFyYXRvciAvPlxuICAgICAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwidGV4dC1zdWJ0aXRsZTIgdGV4dC13ZWlnaHQtcmVndWxhclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1wYS14bSByb3cgcS1ndXR0ZXIteC1zbSBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlF1YW50aXR5OjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+e3sgaXRlbS50b3RhbF9xdWFudGl0eSB9fTwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtcGEteG0gcm93IHEtZ3V0dGVyLXgtc20ganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5QcmljZTo8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2Pnt7IGZvcm1hdEN1cnJlbmN5KGl0ZW0ucHJpY2UpIH19PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgPC9xLWludGVyc2VjdGlvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvcS1zY3JvbGwtYXJlYT5cbiAgPC9kaXY+XG4gIDxkaXY+XG4gICAgPHEtZGlhbG9nIHYtbW9kZWw9XCJkaWFsb2dcIj5cbiAgICAgIDxxLWNhcmQgY2xhc3M9XCJteS1jYXJkIHEtcGEtbWRcIiBzdHlsZT1cIndpZHRoOiA3MDBweDsgbWF4LXdpZHRoOiA4MHZ3XCI+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5cbiAgICAgICAgICAgICAge3sgc2VsZWN0ZWRJdGVtID8gc2VsZWN0ZWRJdGVtLnByb2R1Y3QubmFtZSA6IFwiXCIgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHEtYnRuIHJvdW5kIGRlbnNlIGZsYXQgaWNvbj1cImNsb3NlXCIgQGNsaWNrPVwiY2xvc2VEaWFsb2dcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tYi1sZyByb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC13ZWlnaHQtbGlnaHRcIj5SZW1haW5uaW5nczwvZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJzb2Z0ZHJpbmtzUHJvZHVjdHNSZXBvcnQucmVtYWlubmluZ3NcIlxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBtYXNrPVwiIyMjIyNcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgIHN1ZmZpeD1cInBjc1wiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIwXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAyNjBweDsgbWF4LXdpZHRoOiAzMDBweDsgbWluLXdpZHRoOiA1MHB4XCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWxpZ2h0XCI+U29mdGRyaW5rcyBPdXQ8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwic29mdGRyaW5rc1Byb2R1Y3RzUmVwb3J0LnNvZnRkcmlua3NPdXRcIlxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBtYXNrPVwiIyMjIyNcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgIHN1ZmZpeD1cInBjc1wiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIwXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAyNjBweDsgbWF4LXdpZHRoOiAzMDBweDsgbWluLXdpZHRoOiA1MHB4XCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXIteG0ganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItc21cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWxpZ2h0XCI+VG90YWwgU29mdGRyaW5rczwvZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgICAgIDpsYWJlbD1cInNlbGVjdGVkSXRlbSA/IHNlbGVjdGVkSXRlbS50b3RhbF9xdWFudGl0eSA6ICcnXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMjBweDsgbWF4LXdpZHRoOiAzMDBweDsgbWluLXdpZHRoOiA1MHB4XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWJvZHkyIHRleHQtd2VpZ2h0LXJlZ3VsYXJcIj5wY3M8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItc21cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWxpZ2h0XCI+UHJpY2U8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgICA6bGFiZWw9XCJzZWxlY3RlZEl0ZW0gPyBmb3JtYXRDdXJyZW5jeShzZWxlY3RlZEl0ZW0ucHJpY2UpIDogJydcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEyMHB4OyBtYXgtd2lkdGg6IDMwMHB4OyBtaW4td2lkdGg6IDUwcHhcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItc21cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWxpZ2h0XCI+U29sZCBQY3M8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJzb2Z0ZHJpbmtzUHJvZHVjdHNSZXBvcnQuc29mdGRyaW5rc1NvbGRcIlxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgcmV2ZXJzZS1maWxsLW1hc2tcbiAgICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEyMHB4OyBtYXgtd2lkdGg6IDMwMHB4OyBtaW4td2lkdGg6IDUwcHhcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtYm9keTIgdGV4dC13ZWlnaHQtcmVndWxhclwiPnBjczwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci1zbVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC13ZWlnaHQtbGlnaHRcIj5TYWxlcyBBbW91bnQ8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cInNvZnRkcmlua3NTYWxlc0Ftb3VudEZvcm1hdHRlZFwiXG4gICAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxNTBweDsgbWF4LXdpZHRoOiAzMDBweDsgbWluLXdpZHRoOiA1MHB4XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDwhLS0gPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtYm9keTIgdGV4dC13ZWlnaHQtcmVndWxhclwiPlBIUDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPiAtLT5cbiAgICAgICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8ZGl2IGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgICAgIDxxLWJ0biBjb2xvcj1cInJlZC02XCIgbGFiZWw9XCJPa1wiIEBjbGljaz1cInNhdmVSZXBvcnRcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPC9xLWNhcmQ+XG4gICAgPC9xLWRpYWxvZz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgdXNlU2FsZXNSZXBvcnRzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9zYWxlcy1yZXBvcnRcIjtcbmltcG9ydCB7IGNvbXB1dGVkLCBvbk1vdW50ZWQsIHJlYWN0aXZlLCByZWYsIHdhdGNoIH0gZnJvbSBcInZ1ZVwiO1xuXG5jb25zdCBzYWxlc1JlcG9ydHNTdG9yZSA9IHVzZVNhbGVzUmVwb3J0c1N0b3JlKCk7XG5jb25zdCB1c2VyRGF0YSA9IHNhbGVzUmVwb3J0c1N0b3JlLnVzZXI7XG5jb25zdCBzZWxlY3RlZEl0ZW0gPSByZWYobnVsbCk7XG5jb25zdCBkaWFsb2cgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBjbGlja21lID0gKGl0ZW0pID0+IHtcbiAgc2VsZWN0ZWRJdGVtLnZhbHVlID0gaXRlbTtcbiAgZGlhbG9nLnZhbHVlID0gdHJ1ZTtcbn07XG5cbmNvbnN0IHNvZnRkcmlua3NQcm9kdWN0c1JlcG9ydCA9IHJlYWN0aXZlKHtcbiAgc29mdGRyaW5rc1NvbGQ6IDAsXG4gIHJlbWFpbm5pbmdzOiAwLFxuICBiZWdpbm5pbmdzOiAwLFxuICBzb2Z0ZHJpbmtzT3V0OiAwLFxufSk7XG5cbmNvbnN0IGZvcm1hdEN1cnJlbmN5ID0gKHZhbHVlKSA9PiB7XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoXCJlbi1VU1wiLCB7XG4gICAgc3R5bGU6IFwiY3VycmVuY3lcIixcbiAgICBjdXJyZW5jeTogXCJQSFBcIixcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICB9KS5mb3JtYXQodmFsdWUpO1xufTtcblxuY29uc3Qgc29mdGRyaW5rc1NhbGVzQW1vdW50ID0gY29tcHV0ZWQoKCkgPT4ge1xuICBpZiAoc2VsZWN0ZWRJdGVtLnZhbHVlKSB7XG4gICAgcmV0dXJuIHNvZnRkcmlua3NQcm9kdWN0c1JlcG9ydC5zb2Z0ZHJpbmtzU29sZCAqIHNlbGVjdGVkSXRlbS52YWx1ZS5wcmljZTtcbiAgfVxuICByZXR1cm4gMDtcbn0pO1xuXG5jb25zdCBzb2Z0ZHJpbmtzU2FsZXNBbW91bnRGb3JtYXR0ZWQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiBmb3JtYXRDdXJyZW5jeShzb2Z0ZHJpbmtzU2FsZXNBbW91bnQudmFsdWUpO1xufSk7XG5cbmNvbnN0IGNhbGN1bGF0ZVNvZmRyaW5rc1NvbGQgPSAoKSA9PiB7XG4gIGlmIChzZWxlY3RlZEl0ZW0udmFsdWUpIHtcbiAgICBjb25zdCB0b3RhbFF1YW50aXR5ID0gcGFyc2VJbnQoc2VsZWN0ZWRJdGVtLnZhbHVlLnRvdGFsX3F1YW50aXR5KSB8fCAwO1xuICAgIGNvbnN0IHJlbWFpbmluZ3MgPSBwYXJzZUludChzb2Z0ZHJpbmtzUHJvZHVjdHNSZXBvcnQucmVtYWlubmluZ3MpIHx8IDA7XG4gICAgY29uc3Qgc29mdGRyaW5rc091dCA9IHBhcnNlSW50KHNvZnRkcmlua3NQcm9kdWN0c1JlcG9ydC5zb2Z0ZHJpbmtzT3V0KSB8fCAwO1xuICAgIGNvbnN0IGRpZmZlcmVuY2UgPSByZW1haW5pbmdzICsgc29mdGRyaW5rc091dDtcbiAgICBzb2Z0ZHJpbmtzUHJvZHVjdHNSZXBvcnQuc29mdGRyaW5rc1NvbGQgPSB0b3RhbFF1YW50aXR5IC0gZGlmZmVyZW5jZTtcbiAgfVxufTtcblxud2F0Y2goXG4gICgpID0+IHNvZnRkcmlua3NQcm9kdWN0c1JlcG9ydC5yZW1haW5uaW5ncyxcbiAgKG5ld1JlbWFpbmluZykgPT4ge1xuICAgIGNhbGN1bGF0ZVNvZmRyaW5rc1NvbGQoKTtcbiAgfVxuKTtcblxud2F0Y2goXG4gICgpID0+IHNvZnRkcmlua3NQcm9kdWN0c1JlcG9ydC5zb2Z0ZHJpbmtzT3V0LFxuICAobmV3QnJlYWRPdXQpID0+IHtcbiAgICBjYWxjdWxhdGVTb2Zkcmlua3NTb2xkKCk7XG4gIH1cbik7XG5cbm9uTW91bnRlZChhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHVzZXJEYXRhID0gc2FsZXNSZXBvcnRzU3RvcmUudXNlcjtcbiAgY29uc3QgYnJhbmNoSWQgPSB1c2VyRGF0YT8uZGF0YT8uZW1wbG95ZWU/LmJyYW5jaF9lbXBsb3llZS5icmFuY2hfaWQgfHwgXCJcIjtcbiAgaWYgKGJyYW5jaElkKSB7XG4gICAgYXdhaXQgZmV0Y2hQcm9kdWN0cyhicmFuY2hJZCk7XG4gIH1cbn0pO1xuXG5jb25zdCBmZXRjaFByb2R1Y3RzID0gYXN5bmMgKGJyYW5jaElkKSA9PiB7XG4gIGF3YWl0IHNhbGVzUmVwb3J0c1N0b3JlLmZldGNoQnJhbmNoUHJvZHVjdHMoYnJhbmNoSWQpO1xufTtcblxuY29uc3Qgc29mdGRyaW5rc1Byb2R1Y3RzID0gY29tcHV0ZWQoKCkgPT4gc2FsZXNSZXBvcnRzU3RvcmUuc29mdGRyaW5rc1Byb2R1Y3RzKTtcbndhdGNoKHNvZnRkcmlua3NQcm9kdWN0cywgKG5ld1ZhbCkgPT4ge1xuICAvLyBjb25zb2xlLmxvZyhcInNvZnRkcmlua3NQcm9kdWN0cyB1cGRhdGVkOlwiLCBuZXdWYWwpO1xufSk7XG5cbmNvbnN0IGNsb3NlRGlhbG9nID0gKCkgPT4ge1xuICBzZWxlY3RlZEl0ZW0udmFsdWUgPSBudWxsO1xuICBzb2Z0ZHJpbmtzUHJvZHVjdHNSZXBvcnQuc29mdGRyaW5rc1NvbGQgPSAwO1xuICBzb2Z0ZHJpbmtzUHJvZHVjdHNSZXBvcnQucmVtYWlubmluZ3MgPSAwO1xuICBzb2Z0ZHJpbmtzUHJvZHVjdHNSZXBvcnQuYmVnaW5uaW5ncyA9IDA7XG4gIHNvZnRkcmlua3NQcm9kdWN0c1JlcG9ydC5zb2Z0ZHJpbmtzT3V0ID0gMDtcbiAgZGlhbG9nLnZhbHVlID0gZmFsc2U7XG59O1xuXG5jb25zdCBzYXZlUmVwb3J0ID0gKCkgPT4ge1xuICBpZiAoc2VsZWN0ZWRJdGVtLnZhbHVlKSB7XG4gICAgY29uc3QgcmVwb3J0ID0ge1xuICAgICAgdXNlcl9pZDogdXNlckRhdGE/LmRhdGEuaWQsXG4gICAgICBicmFuY2hfaWQ6IHVzZXJEYXRhPy5kYXRhPy5lbXBsb3llZT8uYnJhbmNoX2VtcGxveWVlPy5icmFuY2hfaWQgfHwgXCJcIixcbiAgICAgIHByb2R1Y3RfaWQ6IHNlbGVjdGVkSXRlbS52YWx1ZS5wcm9kdWN0LmlkLFxuICAgICAgbmFtZTogc2VsZWN0ZWRJdGVtLnZhbHVlLnByb2R1Y3QubmFtZSxcbiAgICAgIHRvdGFsOiBzZWxlY3RlZEl0ZW0udmFsdWUudG90YWxfcXVhbnRpdHksXG4gICAgICBhZGRlZF9zdG9ja3M6IHNlbGVjdGVkSXRlbS52YWx1ZS5uZXdfcHJvZHVjdGlvbixcbiAgICAgIHNvbGQ6IHNvZnRkcmlua3NQcm9kdWN0c1JlcG9ydC5zb2Z0ZHJpbmtzU29sZCxcbiAgICAgIG91dDogc29mdGRyaW5rc1Byb2R1Y3RzUmVwb3J0LnNvZnRkcmlua3NPdXQsXG4gICAgICBiZWdpbm5pbmdzOiBzZWxlY3RlZEl0ZW0udmFsdWUuYmVnaW5uaW5ncyxcbiAgICAgIHJlbWFpbmluZzogc29mdGRyaW5rc1Byb2R1Y3RzUmVwb3J0LnJlbWFpbm5pbmdzLFxuICAgICAgcHJpY2U6IHNlbGVjdGVkSXRlbS52YWx1ZS5wcmljZSxcbiAgICAgIHNhbGVzOiBzb2Z0ZHJpbmtzU2FsZXNBbW91bnQudmFsdWUsXG4gICAgfTtcbiAgICBzYWxlc1JlcG9ydHNTdG9yZS51cGRhdGVTb2Z0ZHJpbmtzUmVwb3J0KHJlcG9ydCk7XG4gICAgY2xvc2VEaWFsb2coKTtcbiAgfVxufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XG4uZXhhbXBsZS1pdGVtIHtcbiAgd2lkdGg6IDE5MHB4O1xuICBtYXgtd2lkdGg6IDUwMHB4O1xuICBtaW4td2lkdGg6IDgwcHg7XG4gIGhlaWdodDogMjUwcHg7XG4gIG1heC1oZWlnaHQ6IDUwMHB4O1xuICBtaW4taGVpZ2h0OiAyMDBweDtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWlucHV0XG4gICAgdi1tb2RlbD1cInNlYXJjaEVuZ2luZVwiXG4gICAgcm91bmRlZFxuICAgIG91dGxpbmVkXG4gICAgZGVuc2VcbiAgICBmbGF0XG4gICAgcGxhY2Vob2xkZXI9XCJTZWFyY2guLi5cIlxuICAgIHN0eWxlPVwid2lkdGg6IDQwMHB4OyBtYXgtd2lkdGg6IDQ1MHB4OyBtaW4td2lkdGg6IDE1MHB4XCJcbiAgPlxuICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgPGRpdj5cbiAgICAgICAgPHEtaWNvbiBuYW1lPVwic2VhcmNoXCIgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvdGVtcGxhdGU+XG4gIDwvcS1pbnB1dD5cbjwvdGVtcGxhdGU+XG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmIH0gZnJvbSBcInZ1ZVwiO1xuXG5jb25zdCBzZWFyY2hFbmdpbmUgPSByZWYoXCJcIik7XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtY2FyZCBmbGF0PlxuICAgIDxxLWNhcmQtc2VjdGlvbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNlZjQ0NDRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2IHRleHQtd2hpdGVcIj5cbiAgICAgICAgPHEtaWNvbiBuYW1lPVwiZmEtc29saWQgZmEtc3RvcmVcIiAvPlxuICAgICAgICBTdG9yZSBCcmFuY2hlc1xuICAgICAgPC9kaXY+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS10YWJzXG4gICAgICAgIHYtbW9kZWw9XCJwcm9kdWN0c1RhYlwiXG4gICAgICAgIGRlbnNlXG4gICAgICAgIGNsYXNzPVwiYmctd2hpdGVcIlxuICAgICAgICBhY3RpdmUtY29sb3I9XCJyZWQtNlwiXG4gICAgICAgIGluZGljYXRvci1jb2xvcj1cInJlZC02XCJcbiAgICAgICAgYWxpZ249XCJqdXN0aWZ5XCJcbiAgICAgID5cbiAgICAgICAgPHEtdGFiIG5hbWU9XCJicmVhZFwiIGxhYmVsPVwiQnJlYWRcIiAvPlxuICAgICAgICA8cS10YWIgbmFtZT1cInNlbGVjdGFcIiBsYWJlbD1cIlNlbGVjdGFcIiAvPlxuICAgICAgICA8cS10YWIgbmFtZT1cInNvZnRkcmlua3NcIiBsYWJlbD1cIlNvZnRkcmlua3NcIiAvPlxuICAgICAgPC9xLXRhYnM+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS10YWItcGFuZWxzIHYtbW9kZWw9XCJwcm9kdWN0c1RhYlwiIGFuaW1hdGVkPlxuICAgICAgICA8cS10YWItcGFuZWwgbmFtZT1cImJyZWFkXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxCcmVhZFBhZ2UgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLXRhYi1wYW5lbD5cbiAgICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJzZWxlY3RhXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxTZWxlY3RhUGFnZSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtdGFiLXBhbmVsPlxuICAgICAgICA8cS10YWItcGFuZWwgbmFtZT1cInNvZnRkcmlua3NcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPFNvZnRkcmlua3NQYWdlIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS10YWItcGFuZWw+XG4gICAgICA8L3EtdGFiLXBhbmVscz5cbiAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICA8L3EtY2FyZD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgQnJlYWRQYWdlIGZyb20gXCIuL2NvbXBvbmVudHMvQnJlYWRQYWdlLnZ1ZVwiO1xuaW1wb3J0IFNlbGVjdGFQYWdlIGZyb20gXCIuL2NvbXBvbmVudHMvU2VsZWN0YVBhZ2UudnVlXCI7XG5pbXBvcnQgU29mdGRyaW5rc1BhZ2UgZnJvbSBcIi4vY29tcG9uZW50cy9Tb2Z0ZHJpbmtzUGFnZS52dWVcIjtcbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgcHJvZHVjdHNUYWIgPSByZWYoXCJicmVhZFwiKTtcbjwvc2NyaXB0PlxuIl0sIm5hbWVzIjpbInVzZXJEYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlKQSxVQUFN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
