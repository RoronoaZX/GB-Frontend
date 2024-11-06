import { al as createDirective, aS as isDeepEqual, e as createComponent, n as ref, q as isRuntimeSsrPreHydration, g as computed, h, aE as Transition, ag as hDir, j as hSlot, _ as _export_sfc, t as reactive, u as watch, z as onMounted, o as openBlock, a4 as createElementBlock, J as createBaseVNode, a as createVNode, w as withCtx, a5 as Fragment, a6 as renderList, c as createBlock, Q as QCard, I as QCardSection, a0 as toDisplayString, a2 as QSeparator, M as QBtn, K as QInput, a3 as QDialog, O as pushScopeId, R as popScopeId, L as QIcon, a1 as createTextVNode } from "./index.9b9dbcba.js";
import { Q as QTabs, a as QTab, b as QTabPanels, c as QTabPanel } from "./QTabPanels.0accbd72.js";
import { Q as QScrollArea } from "./QScrollArea.48206f05.js";
import { u as useSalesReportsStore } from "./sales-report.ac1d2f23.js";
import "./QItem.79579b05.js";
import "./QItemLabel.345b9721.js";
import "./QPopupEdit.bf8526f6.js";
import "./ClosePopup.83fef54c.js";
import "./QResizeObserver.5792a751.js";
import "./rtl.276c3f1b.js";
import "./use-panel.0a5ffe4f.js";
import "./touch.9135741d.js";
import "./format.76edee29.js";
import "./QScrollObserver.247b574c.js";
import "./TouchPan.4f7a1ce1.js";
import "./axios.91431b0b.js";
import "./QMenu.d2cee634.js";
const defaultCfg = {
  threshold: 0,
  root: null,
  rootMargin: "0px"
};
function update(el, ctx, value) {
  let handler, cfg, changed;
  if (typeof value === "function") {
    handler = value;
    cfg = defaultCfg;
    changed = ctx.cfg === void 0;
  } else {
    handler = value.handler;
    cfg = Object.assign({}, defaultCfg, value.cfg);
    changed = ctx.cfg === void 0 || isDeepEqual(ctx.cfg, cfg) === false;
  }
  if (ctx.handler !== handler) {
    ctx.handler = handler;
  }
  if (changed === true) {
    ctx.cfg = cfg;
    ctx.observer !== void 0 && ctx.observer.unobserve(el);
    ctx.observer = new IntersectionObserver(([entry]) => {
      if (typeof ctx.handler === "function") {
        if (entry.rootBounds === null && document.body.contains(el) === true) {
          ctx.observer.unobserve(el);
          ctx.observer.observe(el);
          return;
        }
        const res = ctx.handler(entry, ctx.observer);
        if (res === false || ctx.once === true && entry.isIntersecting === true) {
          destroy(el);
        }
      }
    }, cfg);
    ctx.observer.observe(el);
  }
}
function destroy(el) {
  const ctx = el.__qvisible;
  if (ctx !== void 0) {
    ctx.observer !== void 0 && ctx.observer.unobserve(el);
    delete el.__qvisible;
  }
}
var Intersection = createDirective(
  {
    name: "intersection",
    mounted(el, { modifiers, value }) {
      const ctx = {
        once: modifiers.once === true
      };
      update(el, ctx, value);
      el.__qvisible = ctx;
    },
    updated(el, binding) {
      const ctx = el.__qvisible;
      ctx !== void 0 && update(el, ctx, binding.value);
    },
    beforeUnmount: destroy
  }
);
var QIntersection = createComponent({
  name: "QIntersection",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    once: Boolean,
    transition: String,
    transitionDuration: {
      type: [String, Number],
      default: 300
    },
    ssrPrerender: Boolean,
    margin: String,
    threshold: [Number, Array],
    root: {
      default: null
    },
    disable: Boolean,
    onVisibility: Function
  },
  setup(props, { slots, emit }) {
    const showing = ref(isRuntimeSsrPreHydration.value === true ? props.ssrPrerender : false);
    const intersectionProps = computed(() => props.root !== void 0 || props.margin !== void 0 || props.threshold !== void 0 ? {
      handler: trigger,
      cfg: {
        root: props.root,
        rootMargin: props.margin,
        threshold: props.threshold
      }
    } : trigger);
    const hasDirective = computed(
      () => props.disable !== true && (isRuntimeSsrPreHydration.value !== true || props.once !== true || props.ssrPrerender !== true)
    );
    const directives = computed(() => {
      return [[
        Intersection,
        intersectionProps.value,
        void 0,
        { once: props.once }
      ]];
    });
    const transitionStyle = computed(
      () => `--q-transition-duration: ${props.transitionDuration}ms`
    );
    function trigger(entry) {
      if (showing.value !== entry.isIntersecting) {
        showing.value = entry.isIntersecting;
        props.onVisibility !== void 0 && emit("visibility", showing.value);
      }
    }
    function getContent() {
      if (showing.value === true) {
        return [h("div", { key: "content", style: transitionStyle.value }, hSlot(slots.default))];
      }
      if (slots.hidden !== void 0) {
        return [h("div", { key: "hidden", style: transitionStyle.value }, slots.hidden())];
      }
    }
    return () => {
      const child = props.transition ? [
        h(Transition, {
          name: "q-transition--" + props.transition
        }, getContent)
      ] : getContent();
      return hDir(
        props.tag,
        { class: "q-intersection" },
        child,
        "main",
        hasDirective.value,
        () => directives.value
      );
    };
  }
});
var BreadCard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-54a8709a"), n = n(), popScopeId(), n);
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
      const branchId = ((_b = (_a = userData2 == null ? void 0 : userData2.data) == null ? void 0 : _a.branch_employee) == null ? void 0 : _b.branch_id) || "";
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
      var _a, _b;
      if (selectedItem.value) {
        const report = {
          user_id: userData == null ? void 0 : userData.data.id,
          branch_id: ((_b = (_a = userData == null ? void 0 : userData.data) == null ? void 0 : _a.branch_employee) == null ? void 0 : _b.branch_id) || "",
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
var BreadCard = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-54a8709a"], ["__file", "BreadCard.vue"]]);
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
const _withScopeId$1 = (n) => (pushScopeId("data-v-2973605f"), n = n(), popScopeId(), n);
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
      const branchId = ((_b = (_a = userData2 == null ? void 0 : userData2.data) == null ? void 0 : _a.branch_employee) == null ? void 0 : _b.branch_id) || "";
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
      var _a, _b;
      if (selectedItem.value) {
        const report = {
          user_id: userData == null ? void 0 : userData.data.id,
          branch_id: ((_b = (_a = userData == null ? void 0 : userData.data) == null ? void 0 : _a.branch_employee) == null ? void 0 : _b.branch_id) || "",
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
var SelectaCard = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-2973605f"], ["__file", "SelectaCard.vue"]]);
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
const _withScopeId = (n) => (pushScopeId("data-v-0358d248"), n = n(), popScopeId(), n);
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
      const branchId = ((_b = (_a = userData2 == null ? void 0 : userData2.data) == null ? void 0 : _a.branch_employee) == null ? void 0 : _b.branch_id) || "";
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
      var _a, _b;
      if (selectedItem.value) {
        const report = {
          user_id: userData == null ? void 0 : userData.data.id,
          branch_id: ((_b = (_a = userData == null ? void 0 : userData.data) == null ? void 0 : _a.branch_employee) == null ? void 0 : _b.branch_id) || "",
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
var SoftdrinksCard = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-0358d248"], ["__file", "SoftdrinksCard.vue"]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdHNQYWdlLmQ0M2FjZjU4LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9kaXJlY3RpdmVzL2ludGVyc2VjdGlvbi9JbnRlcnNlY3Rpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2ludGVyc2VjdGlvbi9RSW50ZXJzZWN0aW9uLmpzIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9zYWxlc19sYWR5L3Byb2R1Y3RzL2JyZWFkL2NvbXBvbmVudHMvQnJlYWRDYXJkLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9icmFuY2gvc2FsZXNfbGFkeS9wcm9kdWN0cy9icmVhZC9jb21wb25lbnRzL0JyZWFkU2VhcmNoLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9icmFuY2gvc2FsZXNfbGFkeS9wcm9kdWN0cy9zZWxlY3RhL2NvbXBvbmVudHMvU2VsZWN0YVNlYXJjaC52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYnJhbmNoL3NhbGVzX2xhZHkvcHJvZHVjdHMvc2VsZWN0YS9jb21wb25lbnRzL1NlbGVjdGFDYXJkLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9icmFuY2gvc2FsZXNfbGFkeS9wcm9kdWN0cy9zb2Z0ZHJpbmtzL2NvbXBvbmVudHMvU29mdGRyaW5rc0NhcmQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9zYWxlc19sYWR5L3Byb2R1Y3RzL3NvZnRkcmlua3MvY29tcG9uZW50cy9Tb2Z0ZHJpbmtzU2VhcmNoLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9icmFuY2gvc2FsZXNfbGFkeS9wcm9kdWN0cy9Qcm9kdWN0c1BhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZURpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGlzRGVlcEVxdWFsIH0gZnJvbSAnLi4vLi4vdXRpbHMvaXMvaXMuanMnXG5pbXBvcnQgZ2V0U1NSUHJvcHMgZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5ub29wLXNzci1kaXJlY3RpdmUtdHJhbnNmb3JtL25vb3Atc3NyLWRpcmVjdGl2ZS10cmFuc2Zvcm0uanMnXG5cbmNvbnN0IGRlZmF1bHRDZmcgPSB7XG4gIHRocmVzaG9sZDogMCxcbiAgcm9vdDogbnVsbCxcbiAgcm9vdE1hcmdpbjogJzBweCdcbn1cblxuZnVuY3Rpb24gdXBkYXRlIChlbCwgY3R4LCB2YWx1ZSkge1xuICBsZXQgaGFuZGxlciwgY2ZnLCBjaGFuZ2VkXG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGhhbmRsZXIgPSB2YWx1ZVxuICAgIGNmZyA9IGRlZmF1bHRDZmdcbiAgICBjaGFuZ2VkID0gY3R4LmNmZyA9PT0gdm9pZCAwXG4gIH1cbiAgZWxzZSB7XG4gICAgaGFuZGxlciA9IHZhbHVlLmhhbmRsZXJcbiAgICBjZmcgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q2ZnLCB2YWx1ZS5jZmcpXG4gICAgY2hhbmdlZCA9IGN0eC5jZmcgPT09IHZvaWQgMCB8fCBpc0RlZXBFcXVhbChjdHguY2ZnLCBjZmcpID09PSBmYWxzZVxuICB9XG5cbiAgaWYgKGN0eC5oYW5kbGVyICE9PSBoYW5kbGVyKSB7XG4gICAgY3R4LmhhbmRsZXIgPSBoYW5kbGVyXG4gIH1cblxuICBpZiAoY2hhbmdlZCA9PT0gdHJ1ZSkge1xuICAgIGN0eC5jZmcgPSBjZmdcbiAgICBjdHgub2JzZXJ2ZXIgIT09IHZvaWQgMCAmJiBjdHgub2JzZXJ2ZXIudW5vYnNlcnZlKGVsKVxuXG4gICAgY3R4Lm9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChbIGVudHJ5IF0pID0+IHtcbiAgICAgIGlmICh0eXBlb2YgY3R4LmhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gaWYgb2JzZXJ2ZWQgZWxlbWVudCBpcyBwYXJ0IG9mIGEgdnVlIHRyYW5zaXRpb25cbiAgICAgICAgLy8gdGhlbiB3ZSBuZWVkIHRvIGJlIGNhcmVmdWwuLi5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIGVudHJ5LnJvb3RCb3VuZHMgPT09IG51bGxcbiAgICAgICAgICAmJiBkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGVsKSA9PT0gdHJ1ZVxuICAgICAgICApIHtcbiAgICAgICAgICBjdHgub2JzZXJ2ZXIudW5vYnNlcnZlKGVsKVxuICAgICAgICAgIGN0eC5vYnNlcnZlci5vYnNlcnZlKGVsKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzID0gY3R4LmhhbmRsZXIoZW50cnksIGN0eC5vYnNlcnZlcilcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgcmVzID09PSBmYWxzZVxuICAgICAgICAgIHx8IChjdHgub25jZSA9PT0gdHJ1ZSAmJiBlbnRyeS5pc0ludGVyc2VjdGluZyA9PT0gdHJ1ZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgZGVzdHJveShlbClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIGNmZylcblxuICAgIGN0eC5vYnNlcnZlci5vYnNlcnZlKGVsKVxuICB9XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3kgKGVsKSB7XG4gIGNvbnN0IGN0eCA9IGVsLl9fcXZpc2libGVcblxuICBpZiAoY3R4ICE9PSB2b2lkIDApIHtcbiAgICBjdHgub2JzZXJ2ZXIgIT09IHZvaWQgMCAmJiBjdHgub2JzZXJ2ZXIudW5vYnNlcnZlKGVsKVxuICAgIGRlbGV0ZSBlbC5fX3F2aXNpYmxlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRGlyZWN0aXZlKF9fUVVBU0FSX1NTUl9TRVJWRVJfX1xuICA/IHsgbmFtZTogJ2ludGVyc2VjdGlvbicsIGdldFNTUlByb3BzIH1cbiAgOiB7XG4gICAgICBuYW1lOiAnaW50ZXJzZWN0aW9uJyxcblxuICAgICAgbW91bnRlZCAoZWwsIHsgbW9kaWZpZXJzLCB2YWx1ZSB9KSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IHtcbiAgICAgICAgICBvbmNlOiBtb2RpZmllcnMub25jZSA9PT0gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlKGVsLCBjdHgsIHZhbHVlKVxuXG4gICAgICAgIGVsLl9fcXZpc2libGUgPSBjdHhcbiAgICAgIH0sXG5cbiAgICAgIHVwZGF0ZWQgKGVsLCBiaW5kaW5nKSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IGVsLl9fcXZpc2libGVcbiAgICAgICAgY3R4ICE9PSB2b2lkIDAgJiYgdXBkYXRlKGVsLCBjdHgsIGJpbmRpbmcudmFsdWUpXG4gICAgICB9LFxuXG4gICAgICBiZWZvcmVVbm1vdW50OiBkZXN0cm95XG4gICAgfVxuKVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgVHJhbnNpdGlvbiB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uIH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9wbGF0Zm9ybS9QbGF0Zm9ybS5qcydcblxuaW1wb3J0IEludGVyc2VjdGlvbiBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2ludGVyc2VjdGlvbi9JbnRlcnNlY3Rpb24uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90LCBoRGlyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUludGVyc2VjdGlvbicsXG5cbiAgcHJvcHM6IHtcbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdkaXYnXG4gICAgfSxcblxuICAgIG9uY2U6IEJvb2xlYW4sXG4gICAgdHJhbnNpdGlvbjogU3RyaW5nLFxuICAgIHRyYW5zaXRpb25EdXJhdGlvbjoge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgICAgZGVmYXVsdDogMzAwXG4gICAgfSxcblxuICAgIHNzclByZXJlbmRlcjogQm9vbGVhbixcblxuICAgIG1hcmdpbjogU3RyaW5nLFxuICAgIHRocmVzaG9sZDogWyBOdW1iZXIsIEFycmF5IF0sXG4gICAgcm9vdDoge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG5cbiAgICBkaXNhYmxlOiBCb29sZWFuLFxuXG4gICAgb25WaXNpYmlsaXR5OiBGdW5jdGlvblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3Qgc2hvd2luZyA9IHJlZihpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24udmFsdWUgPT09IHRydWUgPyBwcm9wcy5zc3JQcmVyZW5kZXIgOiBmYWxzZSlcblxuICAgIGNvbnN0IGludGVyc2VjdGlvblByb3BzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMucm9vdCAhPT0gdm9pZCAwIHx8IHByb3BzLm1hcmdpbiAhPT0gdm9pZCAwIHx8IHByb3BzLnRocmVzaG9sZCAhPT0gdm9pZCAwXG4gICAgICAgID8ge1xuICAgICAgICAgICAgaGFuZGxlcjogdHJpZ2dlcixcbiAgICAgICAgICAgIGNmZzoge1xuICAgICAgICAgICAgICByb290OiBwcm9wcy5yb290LFxuICAgICAgICAgICAgICByb290TWFyZ2luOiBwcm9wcy5tYXJnaW4sXG4gICAgICAgICAgICAgIHRocmVzaG9sZDogcHJvcHMudGhyZXNob2xkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICA6IHRyaWdnZXJcbiAgICApKVxuXG4gICAgY29uc3QgaGFzRGlyZWN0aXZlID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWVcbiAgICAgICYmIChpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24udmFsdWUgIT09IHRydWUgfHwgcHJvcHMub25jZSAhPT0gdHJ1ZSB8fCBwcm9wcy5zc3JQcmVyZW5kZXIgIT09IHRydWUpXG4gICAgKVxuXG4gICAgY29uc3QgZGlyZWN0aXZlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIC8vIGlmIGhhc0RpcmVjdGl2ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgcmV0dXJuIFsgW1xuICAgICAgICBJbnRlcnNlY3Rpb24sXG4gICAgICAgIGludGVyc2VjdGlvblByb3BzLnZhbHVlLFxuICAgICAgICB2b2lkIDAsXG4gICAgICAgIHsgb25jZTogcHJvcHMub25jZSB9XG4gICAgICBdIF1cbiAgICB9KVxuXG4gICAgY29uc3QgdHJhbnNpdGlvblN0eWxlID0gY29tcHV0ZWQoXG4gICAgICAoKSA9PiBgLS1xLXRyYW5zaXRpb24tZHVyYXRpb246ICR7IHByb3BzLnRyYW5zaXRpb25EdXJhdGlvbiB9bXNgXG4gICAgKVxuXG4gICAgZnVuY3Rpb24gdHJpZ2dlciAoZW50cnkpIHtcbiAgICAgIGlmIChzaG93aW5nLnZhbHVlICE9PSBlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICBzaG93aW5nLnZhbHVlID0gZW50cnkuaXNJbnRlcnNlY3RpbmdcbiAgICAgICAgcHJvcHMub25WaXNpYmlsaXR5ICE9PSB2b2lkIDAgJiYgZW1pdCgndmlzaWJpbGl0eScsIHNob3dpbmcudmFsdWUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gWyBoKCdkaXYnLCB7IGtleTogJ2NvbnRlbnQnLCBzdHlsZTogdHJhbnNpdGlvblN0eWxlLnZhbHVlIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKSBdXG4gICAgICB9XG5cbiAgICAgIGlmIChzbG90cy5oaWRkZW4gIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gWyBoKCdkaXYnLCB7IGtleTogJ2hpZGRlbicsIHN0eWxlOiB0cmFuc2l0aW9uU3R5bGUudmFsdWUgfSwgc2xvdHMuaGlkZGVuKCkpIF1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSBwcm9wcy50cmFuc2l0aW9uXG4gICAgICAgID8gW1xuICAgICAgICAgICAgaChUcmFuc2l0aW9uLCB7XG4gICAgICAgICAgICAgIG5hbWU6ICdxLXRyYW5zaXRpb24tLScgKyBwcm9wcy50cmFuc2l0aW9uXG4gICAgICAgICAgICB9LCBnZXRDb250ZW50KVxuICAgICAgICAgIF1cbiAgICAgICAgOiBnZXRDb250ZW50KClcblxuICAgICAgcmV0dXJuIGhEaXIoXG4gICAgICAgIHByb3BzLnRhZyxcbiAgICAgICAgeyBjbGFzczogJ3EtaW50ZXJzZWN0aW9uJyB9LFxuICAgICAgICBjaGlsZCxcbiAgICAgICAgJ21haW4nLFxuICAgICAgICBoYXNEaXJlY3RpdmUudmFsdWUsXG4gICAgICAgICgpID0+IGRpcmVjdGl2ZXMudmFsdWVcbiAgICAgIClcbiAgICB9XG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJxLW10LW1kXCI+XG4gICAgPHEtc2Nyb2xsLWFyZWEgc3R5bGU9XCJoZWlnaHQ6IDcwMHB4OyBtYXgtd2lkdGg6IDE1MDBweFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLXBhLWxnIHEtZ3V0dGVyLXktbGdcIj5cbiAgICAgICAgPHEtaW50ZXJzZWN0aW9uXG4gICAgICAgICAgdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIGJyZWFkUHJvZHVjdHNcIlxuICAgICAgICAgIDprZXk9XCJpbmRleFwiXG4gICAgICAgICAgb25jZVxuICAgICAgICAgIHRyYW5zaXRpb249XCJzY2FsZVwiXG4gICAgICAgICAgY2xhc3M9XCJleGFtcGxlLWl0ZW0gcS1ndXR0ZXItc21cIlxuICAgICAgICA+XG4gICAgICAgICAgPHEtY2FyZCBAY2xpY2s9XCJjbGlja21lKGl0ZW0pXCIgY2xhc3M9XCJxLW1hLXNtIG15LWNhcmRcIj5cbiAgICAgICAgICAgIDwhLS0gVXNpbmcgYSBzdGF0aWMgaW1hZ2UgVVJMIGZvciBub3cgLS0+XG4gICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vY2RuLnF1YXNhci5kZXYvaW1nL2NoaWNrZW4tc2FsYWQuanBnXCIgLz5cbiAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj57eyBpdGVtLnByb2R1Y3QubmFtZSB9fTwvZGl2PlxuICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgIDxxLXNlcGFyYXRvciAvPlxuICAgICAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwidGV4dC1zdWJ0aXRsZTIgdGV4dC13ZWlnaHQtcmVndWxhclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1wYS14bSByb3cgcS1ndXR0ZXIteC1zbSBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlF1YW50aXR5OjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+e3sgaXRlbS50b3RhbF9xdWFudGl0eSB9fTwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtcGEteG0gcm93IHEtZ3V0dGVyLXgtc20ganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5QcmljZTo8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2Pnt7IGZvcm1hdEN1cnJlbmN5KGl0ZW0ucHJpY2UpIH19PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgPC9xLWludGVyc2VjdGlvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvcS1zY3JvbGwtYXJlYT5cbiAgPC9kaXY+XG4gIDxkaXY+XG4gICAgPHEtZGlhbG9nIHYtbW9kZWw9XCJkaWFsb2dcIj5cbiAgICAgIDxxLWNhcmQgY2xhc3M9XCJteS1jYXJkIHEtcGEtbWRcIiBzdHlsZT1cIndpZHRoOiA3MDBweDsgbWF4LXdpZHRoOiA4MHZ3XCI+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5cbiAgICAgICAgICAgICAge3sgc2VsZWN0ZWRJdGVtID8gc2VsZWN0ZWRJdGVtLnByb2R1Y3QubmFtZSA6IFwiXCIgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHEtYnRuIHJvdW5kIGRlbnNlIGZsYXQgaWNvbj1cImNsb3NlXCIgQGNsaWNrPVwiY2xvc2VEaWFsb2dcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tYi1sZyByb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC13ZWlnaHQtbGlnaHRcIj5SZW1haW5uaW5nczwvZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJicmVhZFByb2R1Y3RzUmVwb3J0LnJlbWFpbm5pbmdzXCJcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgbWFzaz1cIiMjIyMjXCJcbiAgICAgICAgICAgICAgICBzdWZmaXg9XCJwY3NcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiMFwiXG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMjYwcHg7IG1heC13aWR0aDogMzAwcHg7IG1pbi13aWR0aDogNTBweFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1saWdodFwiPkJyZWFkIE91dDwvZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJicmVhZFByb2R1Y3RzUmVwb3J0LmJyZWFkT3V0XCJcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgbWFzaz1cIiMjIyMjXCJcbiAgICAgICAgICAgICAgICBzdWZmaXg9XCJwY3NcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiMFwiXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMjYwcHg7IG1heC13aWR0aDogMzAwcHg7IG1pbi13aWR0aDogNTBweFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLXhtIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXNtXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1saWdodFwiPlRvdGFsIEJyZWFkPC9kaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICAgICAgOmxhYmVsPVwic2VsZWN0ZWRJdGVtID8gc2VsZWN0ZWRJdGVtLnRvdGFsX3F1YW50aXR5IDogJydcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEyMHB4OyBtYXgtd2lkdGg6IDMwMHB4OyBtaW4td2lkdGg6IDUwcHhcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtYm9keTIgdGV4dC13ZWlnaHQtcmVndWxhclwiPnBjczwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci1zbVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC13ZWlnaHQtbGlnaHRcIj5QcmljZTwvZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgICAgIDpsYWJlbD1cInNlbGVjdGVkSXRlbSA/IGZvcm1hdEN1cnJlbmN5KHNlbGVjdGVkSXRlbS5wcmljZSkgOiAnJ1wiXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTIwcHg7IG1heC13aWR0aDogMzAwcHg7IG1pbi13aWR0aDogNTBweFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci1zbVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC13ZWlnaHQtbGlnaHRcIj5Tb2xkIFBjczwvZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cImJyZWFkUHJvZHVjdHNSZXBvcnQuYnJlYWRTb2xkXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIHJldmVyc2UtZmlsbC1tYXNrXG4gICAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMjBweDsgbWF4LXdpZHRoOiAzMDBweDsgbWluLXdpZHRoOiA1MHB4XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWJvZHkyIHRleHQtd2VpZ2h0LXJlZ3VsYXJcIj5wY3M8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItc21cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWxpZ2h0XCI+U2FsZXMgQW1vdW50PC9kaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJicmVhZFNhbGVzQW1vdW50Rm9ybWF0dGVkXCJcbiAgICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDE1MHB4OyBtYXgtd2lkdGg6IDMwMHB4OyBtaW4td2lkdGg6IDUwcHhcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPCEtLSA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1ib2R5MiB0ZXh0LXdlaWdodC1yZWd1bGFyXCI+UEhQPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+IC0tPlxuICAgICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxkaXYgYWxpZ249XCJyaWdodFwiPlxuICAgICAgICAgICAgPHEtYnRuIGNvbG9yPVwicmVkLTZcIiBsYWJlbD1cIk9rXCIgQGNsaWNrPVwic2F2ZVJlcG9ydFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8L3EtY2FyZD5cbiAgICA8L3EtZGlhbG9nPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VTYWxlc1JlcG9ydHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3NhbGVzLXJlcG9ydFwiO1xuaW1wb3J0IHsgY29tcHV0ZWQsIG9uTW91bnRlZCwgcmVhY3RpdmUsIHJlZiwgd2F0Y2ggfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IHNhbGVzUmVwb3J0c1N0b3JlID0gdXNlU2FsZXNSZXBvcnRzU3RvcmUoKTtcbmNvbnN0IHVzZXJEYXRhID0gc2FsZXNSZXBvcnRzU3RvcmUudXNlcjtcbmNvbnN0IHNlbGVjdGVkSXRlbSA9IHJlZihudWxsKTtcbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IGNsaWNrbWUgPSAoaXRlbSkgPT4ge1xuICBzZWxlY3RlZEl0ZW0udmFsdWUgPSBpdGVtO1xuICBkaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcblxuY29uc3QgYnJlYWRQcm9kdWN0c1JlcG9ydCA9IHJlYWN0aXZlKHtcbiAgYnJlYWRTb2xkOiAwLFxuICByZW1haW5uaW5nczogMCxcbiAgYmVnaW5uaW5nczogMCxcbiAgYnJlYWRPdXQ6IDAsXG59KTtcblxuY29uc3QgZm9ybWF0Q3VycmVuY3kgPSAodmFsdWUpID0+IHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChcImVuLVVTXCIsIHtcbiAgICBzdHlsZTogXCJjdXJyZW5jeVwiLFxuICAgIGN1cnJlbmN5OiBcIlBIUFwiLFxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gIH0pLmZvcm1hdCh2YWx1ZSk7XG59O1xuXG5jb25zdCBjYWxjdWxhdGVCcmVhZFNvbGQgPSAoKSA9PiB7XG4gIGlmIChzZWxlY3RlZEl0ZW0udmFsdWUpIHtcbiAgICBjb25zdCB0b3RhbFF1YW50aXR5ID0gcGFyc2VJbnQoc2VsZWN0ZWRJdGVtLnZhbHVlLnRvdGFsX3F1YW50aXR5KSB8fCAwO1xuICAgIGNvbnN0IHJlbWFpbmluZ3MgPSBwYXJzZUludChicmVhZFByb2R1Y3RzUmVwb3J0LnJlbWFpbm5pbmdzKSB8fCAwO1xuICAgIGNvbnN0IGJyZWFkT3V0ID0gcGFyc2VJbnQoYnJlYWRQcm9kdWN0c1JlcG9ydC5icmVhZE91dCkgfHwgMDtcbiAgICBjb25zdCBkaWZmZXJlbmNlID0gcmVtYWluaW5ncyArIGJyZWFkT3V0O1xuICAgIGJyZWFkUHJvZHVjdHNSZXBvcnQuYnJlYWRTb2xkID0gdG90YWxRdWFudGl0eSAtIGRpZmZlcmVuY2U7XG4gIH1cbn07XG5cbndhdGNoKFxuICAoKSA9PiBicmVhZFByb2R1Y3RzUmVwb3J0LnJlbWFpbm5pbmdzLFxuICAobmV3UmVtYWluaW5nKSA9PiB7XG4gICAgY2FsY3VsYXRlQnJlYWRTb2xkKCk7XG4gIH1cbik7XG5cbndhdGNoKFxuICAoKSA9PiBicmVhZFByb2R1Y3RzUmVwb3J0LmJyZWFkT3V0LFxuICAobmV3QnJlYWRPdXQpID0+IHtcbiAgICBjYWxjdWxhdGVCcmVhZFNvbGQoKTtcbiAgfVxuKTtcblxuY29uc3QgYnJlYWRTYWxlc0Ftb3VudCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgaWYgKHNlbGVjdGVkSXRlbS52YWx1ZSkge1xuICAgIHJldHVybiBicmVhZFByb2R1Y3RzUmVwb3J0LmJyZWFkU29sZCAqIHNlbGVjdGVkSXRlbS52YWx1ZS5wcmljZTtcbiAgfVxuICByZXR1cm4gMDtcbn0pO1xuXG5jb25zdCBicmVhZFNhbGVzQW1vdW50Rm9ybWF0dGVkID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gZm9ybWF0Q3VycmVuY3koYnJlYWRTYWxlc0Ftb3VudC52YWx1ZSk7XG59KTtcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgY29uc3QgdXNlckRhdGEgPSBzYWxlc1JlcG9ydHNTdG9yZS51c2VyO1xuICBjb25zdCBicmFuY2hJZCA9IHVzZXJEYXRhPy5kYXRhPy5icmFuY2hfZW1wbG95ZWU/LmJyYW5jaF9pZCB8fCBcIlwiO1xuICBpZiAoYnJhbmNoSWQpIHtcbiAgICBhd2FpdCBmZXRjaFByb2R1Y3RzKGJyYW5jaElkKTtcbiAgfVxufSk7XG5cbmNvbnN0IGZldGNoUHJvZHVjdHMgPSBhc3luYyAoYnJhbmNoSWQpID0+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgc2FsZXNSZXBvcnRzU3RvcmUuZmV0Y2hCcmFuY2hQcm9kdWN0cyhicmFuY2hJZCk7XG59O1xuXG5jb25zdCBicmVhZFByb2R1Y3RzID0gY29tcHV0ZWQoKCkgPT4gc2FsZXNSZXBvcnRzU3RvcmUuYnJlYWRQcm9kdWN0cyk7XG53YXRjaChicmVhZFByb2R1Y3RzLCAobmV3VmFsKSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKFwiYnJlYWRQcm9kdWN0cyB1cGRhdGVkOlwiLCBuZXdWYWwpO1xufSk7XG5cbmNvbnN0IGNsb3NlRGlhbG9nID0gKCkgPT4ge1xuICBzZWxlY3RlZEl0ZW0udmFsdWUgPSBudWxsO1xuICBicmVhZFByb2R1Y3RzUmVwb3J0LmJyZWFkU29sZCA9IDA7XG4gIGJyZWFkUHJvZHVjdHNSZXBvcnQucmVtYWlubmluZ3MgPSAwO1xuICBicmVhZFByb2R1Y3RzUmVwb3J0LmJlZ2lubmluZ3MgPSAwO1xuICBicmVhZFByb2R1Y3RzUmVwb3J0LmJyZWFkT3V0ID0gMDtcbiAgZGlhbG9nLnZhbHVlID0gZmFsc2U7XG59O1xuXG5jb25zdCBzYXZlUmVwb3J0ID0gKCkgPT4ge1xuICAvLyBjb25zb2xlLmxvZyhcImNsaWNrY2tja2tcIik7XG4gIGlmIChzZWxlY3RlZEl0ZW0udmFsdWUpIHtcbiAgICBjb25zdCByZXBvcnQgPSB7XG4gICAgICB1c2VyX2lkOiB1c2VyRGF0YT8uZGF0YS5pZCxcbiAgICAgIGJyYW5jaF9pZDogdXNlckRhdGE/LmRhdGE/LmJyYW5jaF9lbXBsb3llZT8uYnJhbmNoX2lkIHx8IFwiXCIsXG4gICAgICBwcm9kdWN0X2lkOiBzZWxlY3RlZEl0ZW0udmFsdWUucHJvZHVjdC5pZCxcbiAgICAgIG5hbWU6IHNlbGVjdGVkSXRlbS52YWx1ZS5wcm9kdWN0Lm5hbWUsXG4gICAgICB0b3RhbDogc2VsZWN0ZWRJdGVtLnZhbHVlLnRvdGFsX3F1YW50aXR5LFxuICAgICAgbmV3X3Byb2R1Y3Rpb246IHNlbGVjdGVkSXRlbS52YWx1ZS5uZXdfcHJvZHVjdGlvbixcbiAgICAgIGJyZWFkX3NvbGQ6IGJyZWFkUHJvZHVjdHNSZXBvcnQuYnJlYWRTb2xkLFxuICAgICAgYnJlYWRfb3V0OiBicmVhZFByb2R1Y3RzUmVwb3J0LmJyZWFkT3V0LFxuICAgICAgYmVnaW5uaW5nczogc2VsZWN0ZWRJdGVtLnZhbHVlLmJlZ2lubmluZ3MsXG4gICAgICByZW1haW5pbmc6IGJyZWFkUHJvZHVjdHNSZXBvcnQucmVtYWlubmluZ3MsXG4gICAgICBwcmljZTogc2VsZWN0ZWRJdGVtLnZhbHVlLnByaWNlLFxuICAgICAgc2FsZXM6IGJyZWFkU2FsZXNBbW91bnQudmFsdWUsXG4gICAgfTtcbiAgICBzYWxlc1JlcG9ydHNTdG9yZS51cGRhdGVCcmVhZFJlcG9ydChyZXBvcnQpO1xuICAgIGNsb3NlRGlhbG9nKCk7XG4gIH1cbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuLmV4YW1wbGUtaXRlbSB7XG4gIHdpZHRoOiAxOTBweDtcbiAgbWF4LXdpZHRoOiA1MDBweDtcbiAgbWluLXdpZHRoOiA4MHB4O1xuICBoZWlnaHQ6IDI1MHB4O1xuICBtYXgtaGVpZ2h0OiA1MDBweDtcbiAgbWluLWhlaWdodDogMjAwcHg7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1pbnB1dFxuICAgIHYtbW9kZWw9XCJzZWFyY2hFbmdpbmVcIlxuICAgIHJvdW5kZWRcbiAgICBvdXRsaW5lZFxuICAgIGRlbnNlXG4gICAgZmxhdFxuICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoLi4uXCJcbiAgICBzdHlsZT1cIndpZHRoOiA0MDBweDsgbWF4LXdpZHRoOiA0NTBweDsgbWluLXdpZHRoOiAxNTBweFwiXG4gID5cbiAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxxLWljb24gbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L3RlbXBsYXRlPlxuICA8L3EtaW5wdXQ+XG48L3RlbXBsYXRlPlxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcbmNvbnN0IHNlYXJjaEVuZ2luZSA9IHJlZihcIlwiKTtcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8cS1pbnB1dFxuICAgIHYtbW9kZWw9XCJzZWFyY2hFbmdpbmVcIlxuICAgIHJvdW5kZWRcbiAgICBvdXRsaW5lZFxuICAgIGRlbnNlXG4gICAgZmxhdFxuICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoLi4uXCJcbiAgICBzdHlsZT1cIndpZHRoOiA0MDBweDsgbWF4LXdpZHRoOiA0NTBweDsgbWluLXdpZHRoOiAxNTBweFwiXG4gID5cbiAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxxLWljb24gbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L3RlbXBsYXRlPlxuICA8L3EtaW5wdXQ+XG48L3RlbXBsYXRlPlxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3Qgc2VhcmNoRW5naW5lID0gcmVmKFwiXCIpO1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJxLW10LW1kXCI+XG4gICAgPHEtc2Nyb2xsLWFyZWEgc3R5bGU9XCJoZWlnaHQ6IDQ1MHB4OyBtYXgtd2lkdGg6IDE1MDBweFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLXBhLWxnIHEtZ3V0dGVyLXNtIHEtZ3V0dGVyLXktbWRcIj5cbiAgICAgICAgPHEtaW50ZXJzZWN0aW9uXG4gICAgICAgICAgdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIHNlbGVjdGFQcm9kdWN0c1wiXG4gICAgICAgICAgOmtleT1cImluZGV4XCJcbiAgICAgICAgICBvbmNlXG4gICAgICAgICAgdHJhbnNpdGlvbj1cInNjYWxlXCJcbiAgICAgICAgICBjbGFzcz1cImV4YW1wbGUtaXRlbVwiXG4gICAgICAgID5cbiAgICAgICAgICA8cS1jYXJkIEBjbGljaz1cImNsaWNrbWUoaXRlbSlcIiBjbGFzcz1cInEtbWEtc20gbXktY2FyZFwiPlxuICAgICAgICAgICAgPCEtLSBVc2luZyBhIHN0YXRpYyBpbWFnZSBVUkwgZm9yIG5vdyAtLT5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9jZG4ucXVhc2FyLmRldi9pbWcvY2hpY2tlbi1zYWxhZC5qcGdcIiAvPlxuICAgICAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPnt7IGl0ZW0ucHJvZHVjdC5uYW1lIH19PC9kaXY+XG4gICAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgPHEtc2VwYXJhdG9yIC8+XG4gICAgICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMiB0ZXh0LXdlaWdodC1yZWd1bGFyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLXBhLXhtIHJvdyBxLWd1dHRlci14LXNtIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxkaXY+UXVhbnRpdHk6PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj57eyBpdGVtLnRvdGFsX3F1YW50aXR5IH19PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1wYS14bSByb3cgcS1ndXR0ZXIteC1zbSBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlByaWNlOjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+e3sgZm9ybWF0Q3VycmVuY3koaXRlbS5wcmljZSkgfX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDwvcS1jYXJkPlxuICAgICAgICA8L3EtaW50ZXJzZWN0aW9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9xLXNjcm9sbC1hcmVhPlxuICA8L2Rpdj5cbiAgPGRpdj5cbiAgICA8cS1kaWFsb2cgdi1tb2RlbD1cImRpYWxvZ1wiPlxuICAgICAgPHEtY2FyZCBjbGFzcz1cIm15LWNhcmQgcS1wYS1tZFwiIHN0eWxlPVwid2lkdGg6IDcwMHB4OyBtYXgtd2lkdGg6IDgwdndcIj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPlxuICAgICAgICAgICAgICB7eyBzZWxlY3RlZEl0ZW0gPyBzZWxlY3RlZEl0ZW0ucHJvZHVjdC5uYW1lIDogXCJcIiB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cS1idG4gcm91bmQgZGVuc2UgZmxhdCBpY29uPVwiY2xvc2VcIiBAY2xpY2s9XCJjbG9zZURpYWxvZ1wiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW1iLWxnIHJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1saWdodFwiPlJlbWFpbm5pbmdzPC9kaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cInNlbGVjdGFQcm9kdWN0UmVwb3J0LnNlbGVjdGFSZW1haW5pbmdzXCJcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgbWFzaz1cIiMjIyMjXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICBzdWZmaXg9XCJwY3NcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiMFwiXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMjYwcHg7IG1heC13aWR0aDogMzAwcHg7IG1pbi13aWR0aDogNTBweFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1saWdodFwiPlNlbGVjdGEgT3V0PC9kaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cInNlbGVjdGFQcm9kdWN0UmVwb3J0LnNlbGVjdGFPdXRcIlxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBtYXNrPVwiIyMjIyNcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgIHN1ZmZpeD1cInBjc1wiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIwXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAyNjBweDsgbWF4LXdpZHRoOiAzMDBweDsgbWluLXdpZHRoOiA1MHB4XCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXIteG0ganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItc21cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWxpZ2h0XCI+VG90YWwgU2VsZWN0YTwvZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgICAgIDpsYWJlbD1cInNlbGVjdGVkSXRlbSA/IHNlbGVjdGVkSXRlbS50b3RhbF9xdWFudGl0eSA6ICcnXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMjBweDsgbWF4LXdpZHRoOiAzMDBweDsgbWluLXdpZHRoOiA1MHB4XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWJvZHkyIHRleHQtd2VpZ2h0LXJlZ3VsYXJcIj5wY3M8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItc21cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWxpZ2h0XCI+UHJpY2U8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgICA6bGFiZWw9XCJzZWxlY3RlZEl0ZW0gPyBmb3JtYXRDdXJyZW5jeShzZWxlY3RlZEl0ZW0ucHJpY2UpIDogJydcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEyMHB4OyBtYXgtd2lkdGg6IDMwMHB4OyBtaW4td2lkdGg6IDUwcHhcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItc21cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWxpZ2h0XCI+U29sZCBQY3M8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJzZWxlY3RhUHJvZHVjdFJlcG9ydC5zZWxlY3RhU29sZFwiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICByZXZlcnNlLWZpbGwtbWFza1xuICAgICAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTIwcHg7IG1heC13aWR0aDogMzAwcHg7IG1pbi13aWR0aDogNTBweFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1ib2R5MiB0ZXh0LXdlaWdodC1yZWd1bGFyXCI+cGNzPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXNtXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1saWdodFwiPlNhbGVzIEFtb3VudDwvZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwic2VsZWN0YVNhbGVzQW1vdW50Rm9ybWF0dGVkXCJcbiAgICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDE1MHB4OyBtYXgtd2lkdGg6IDMwMHB4OyBtaW4td2lkdGg6IDUwcHhcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPCEtLSA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1ib2R5MiB0ZXh0LXdlaWdodC1yZWd1bGFyXCI+UEhQPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+IC0tPlxuICAgICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxkaXYgYWxpZ249XCJyaWdodFwiPlxuICAgICAgICAgICAgPHEtYnRuIGNvbG9yPVwicmVkLTZcIiBsYWJlbD1cIk9rXCIgQGNsaWNrPVwic2F2ZVJlcG9ydFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8L3EtY2FyZD5cbiAgICA8L3EtZGlhbG9nPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VTYWxlc1JlcG9ydHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3NhbGVzLXJlcG9ydFwiO1xuaW1wb3J0IHsgY29tcHV0ZWQsIG9uTW91bnRlZCwgcmVhY3RpdmUsIHJlZiwgd2F0Y2ggfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IHNhbGVzUmVwb3J0c1N0b3JlID0gdXNlU2FsZXNSZXBvcnRzU3RvcmUoKTtcbmNvbnN0IHVzZXJEYXRhID0gc2FsZXNSZXBvcnRzU3RvcmUudXNlcjtcbmNvbnN0IHNlbGVjdGVkSXRlbSA9IHJlZihudWxsKTtcbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IGNsaWNrbWUgPSAoaXRlbSkgPT4ge1xuICBzZWxlY3RlZEl0ZW0udmFsdWUgPSBpdGVtO1xuICBkaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcblxuY29uc3Qgc2VsZWN0YVByb2R1Y3RSZXBvcnQgPSByZWFjdGl2ZSh7XG4gIHNlbGVjdGFTb2xkOiAwLFxuICBzZWxlY3RhUmVtYWluaW5nczogMCxcbiAgc2VsZWN0YUJlZ2lubmluZ3M6IDAsXG4gIHNlbGVjdGFPdXQ6IDAsXG59KTtcblxuY29uc3QgZm9ybWF0Q3VycmVuY3kgPSAodmFsdWUpID0+IHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChcImVuLVVTXCIsIHtcbiAgICBzdHlsZTogXCJjdXJyZW5jeVwiLFxuICAgIGN1cnJlbmN5OiBcIlBIUFwiLFxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gIH0pLmZvcm1hdCh2YWx1ZSk7XG59O1xuXG5jb25zdCBzZWxlY3RhU2FsZXNBbW91bnQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmIChzZWxlY3RlZEl0ZW0udmFsdWUpIHtcbiAgICByZXR1cm4gc2VsZWN0YVByb2R1Y3RSZXBvcnQuc2VsZWN0YVNvbGQgKiBzZWxlY3RlZEl0ZW0udmFsdWUucHJpY2U7XG4gIH1cbiAgcmV0dXJuIDA7XG59KTtcblxuY29uc3Qgc2VsZWN0YVNhbGVzQW1vdW50Rm9ybWF0dGVkID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gZm9ybWF0Q3VycmVuY3koc2VsZWN0YVNhbGVzQW1vdW50LnZhbHVlKTtcbn0pO1xuXG5jb25zdCBjYWxjdWxhdGVTZWxlY3RhID0gKCkgPT4ge1xuICBpZiAoc2VsZWN0ZWRJdGVtLnZhbHVlKSB7XG4gICAgY29uc3QgdG90YWxRdWFudGl0eSA9IHBhcnNlSW50KHNlbGVjdGVkSXRlbS52YWx1ZS50b3RhbF9xdWFudGl0eSkgfHwgMDtcbiAgICBjb25zdCByZW1haW5pbmdzID0gcGFyc2VJbnQoc2VsZWN0YVByb2R1Y3RSZXBvcnQuc2VsZWN0YVJlbWFpbmluZ3MpIHx8IDA7XG4gICAgY29uc3Qgc2VsZWN0YU91dCA9IHBhcnNlSW50KHNlbGVjdGFQcm9kdWN0UmVwb3J0LnNlbGVjdGFPdXQpIHx8IDA7XG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IHJlbWFpbmluZ3MgKyBzZWxlY3RhT3V0O1xuICAgIHNlbGVjdGFQcm9kdWN0UmVwb3J0LnNlbGVjdGFTb2xkID0gdG90YWxRdWFudGl0eSAtIGRpZmZlcmVuY2U7XG4gIH1cbn07XG5cbndhdGNoKFxuICAoKSA9PiBzZWxlY3RhUHJvZHVjdFJlcG9ydC5zZWxlY3RhUmVtYWluaW5ncyxcbiAgKG5ld1JlbWFpbmluZykgPT4ge1xuICAgIGNhbGN1bGF0ZVNlbGVjdGEoKTtcbiAgfVxuKTtcblxud2F0Y2goXG4gICgpID0+IHNlbGVjdGFQcm9kdWN0UmVwb3J0LnNlbGVjdGFPdXQsXG4gIChuZXdCcmVhZE91dCkgPT4ge1xuICAgIGNhbGN1bGF0ZVNlbGVjdGEoKTtcbiAgfVxuKTtcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgY29uc3QgdXNlckRhdGEgPSBzYWxlc1JlcG9ydHNTdG9yZS51c2VyO1xuICBjb25zdCBicmFuY2hJZCA9IHVzZXJEYXRhPy5kYXRhPy5icmFuY2hfZW1wbG95ZWU/LmJyYW5jaF9pZCB8fCBcIlwiO1xuICBpZiAoYnJhbmNoSWQpIHtcbiAgICBhd2FpdCBmZXRjaFByb2R1Y3RzKGJyYW5jaElkKTtcbiAgfVxufSk7XG5cbmNvbnN0IGZldGNoUHJvZHVjdHMgPSBhc3luYyAoYnJhbmNoSWQpID0+IHtcbiAgYXdhaXQgc2FsZXNSZXBvcnRzU3RvcmUuZmV0Y2hCcmFuY2hQcm9kdWN0cyhicmFuY2hJZCk7XG59O1xuXG5jb25zdCBzZWxlY3RhUHJvZHVjdHMgPSBjb21wdXRlZCgoKSA9PiBzYWxlc1JlcG9ydHNTdG9yZS5zZWxlY3RhUHJvZHVjdHMpO1xud2F0Y2goc2VsZWN0YVByb2R1Y3RzLCAobmV3VmFsKSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKFwic2VsZWN0YVByb2R1Y3RzIHVwZGF0ZWQ6XCIsIG5ld1ZhbCk7XG59KTtcblxuY29uc3QgY2xvc2VEaWFsb2cgPSAoKSA9PiB7XG4gIHNlbGVjdGVkSXRlbS52YWx1ZSA9IG51bGw7XG4gIHNlbGVjdGFQcm9kdWN0UmVwb3J0LnNlbGVjdGFTb2xkID0gMDtcbiAgc2VsZWN0YVByb2R1Y3RSZXBvcnQuc2VsZWN0YVJlbWFpbmluZ3MgPSAwO1xuICBzZWxlY3RhUHJvZHVjdFJlcG9ydC5zZWxlY3RhQmVnaW5uaW5ncyA9IDA7XG4gIHNlbGVjdGFQcm9kdWN0UmVwb3J0LnNlbGVjdGFPdXQgPSAwO1xuICBkaWFsb2cudmFsdWUgPSBmYWxzZTtcbn07XG5cbmNvbnN0IHNhdmVSZXBvcnQgPSAoKSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKFwiY2xpY2tja2Nra1wiKTtcbiAgaWYgKHNlbGVjdGVkSXRlbS52YWx1ZSkge1xuICAgIGNvbnN0IHJlcG9ydCA9IHtcbiAgICAgIHVzZXJfaWQ6IHVzZXJEYXRhPy5kYXRhLmlkLFxuICAgICAgYnJhbmNoX2lkOiB1c2VyRGF0YT8uZGF0YT8uYnJhbmNoX2VtcGxveWVlPy5icmFuY2hfaWQgfHwgXCJcIixcbiAgICAgIHByb2R1Y3RfaWQ6IHNlbGVjdGVkSXRlbS52YWx1ZS5wcm9kdWN0LmlkLFxuICAgICAgbmFtZTogc2VsZWN0ZWRJdGVtLnZhbHVlLnByb2R1Y3QubmFtZSxcbiAgICAgIHRvdGFsOiBzZWxlY3RlZEl0ZW0udmFsdWUudG90YWxfcXVhbnRpdHksXG4gICAgICBhZGRlZF9zdG9ja3M6IHNlbGVjdGVkSXRlbS52YWx1ZS5uZXdfcHJvZHVjdGlvbixcbiAgICAgIHNvbGQ6IHNlbGVjdGFQcm9kdWN0UmVwb3J0LnNlbGVjdGFTb2xkLFxuICAgICAgb3V0OiBzZWxlY3RhUHJvZHVjdFJlcG9ydC5zZWxlY3RhT3V0LFxuICAgICAgYmVnaW5uaW5nczogc2VsZWN0ZWRJdGVtLnZhbHVlLmJlZ2lubmluZ3MsXG4gICAgICByZW1haW5pbmc6IHNlbGVjdGFQcm9kdWN0UmVwb3J0LnNlbGVjdGFSZW1haW5pbmdzLFxuICAgICAgcHJpY2U6IHNlbGVjdGVkSXRlbS52YWx1ZS5wcmljZSxcbiAgICAgIHNhbGVzOiBzZWxlY3RhU2FsZXNBbW91bnQudmFsdWUsXG4gICAgfTtcbiAgICBzYWxlc1JlcG9ydHNTdG9yZS51cGRhdGVTZWxlY3RhUmVwb3J0KHJlcG9ydCk7XG4gICAgY2xvc2VEaWFsb2coKTtcbiAgfVxufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XG4uZXhhbXBsZS1pdGVtIHtcbiAgd2lkdGg6IDE5MHB4O1xuICBtYXgtd2lkdGg6IDUwMHB4O1xuICBtaW4td2lkdGg6IDgwcHg7XG4gIGhlaWdodDogMjUwcHg7XG4gIG1heC1oZWlnaHQ6IDUwMHB4O1xuICBtaW4taGVpZ2h0OiAyMDBweDtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJxLW10LW1kXCI+XG4gICAgPHEtc2Nyb2xsLWFyZWEgc3R5bGU9XCJoZWlnaHQ6IDQ1MHB4OyBtYXgtd2lkdGg6IDE1MDBweFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLXBhLWxnIHEtZ3V0dGVyLXNtIHEtZ3V0dGVyLXktbWRcIj5cbiAgICAgICAgPHEtaW50ZXJzZWN0aW9uXG4gICAgICAgICAgdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIHNvZnRkcmlua3NQcm9kdWN0c1wiXG4gICAgICAgICAgOmtleT1cImluZGV4XCJcbiAgICAgICAgICBvbmNlXG4gICAgICAgICAgdHJhbnNpdGlvbj1cInNjYWxlXCJcbiAgICAgICAgICBjbGFzcz1cImV4YW1wbGUtaXRlbVwiXG4gICAgICAgID5cbiAgICAgICAgICA8cS1jYXJkIEBjbGljaz1cImNsaWNrbWUoaXRlbSlcIiBjbGFzcz1cInEtbWEtc20gbXktY2FyZFwiPlxuICAgICAgICAgICAgPCEtLSBVc2luZyBhIHN0YXRpYyBpbWFnZSBVUkwgZm9yIG5vdyAtLT5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9jZG4ucXVhc2FyLmRldi9pbWcvY2hpY2tlbi1zYWxhZC5qcGdcIiAvPlxuICAgICAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPnt7IGl0ZW0ucHJvZHVjdC5uYW1lIH19PC9kaXY+XG4gICAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgPHEtc2VwYXJhdG9yIC8+XG4gICAgICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMiB0ZXh0LXdlaWdodC1yZWd1bGFyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLXBhLXhtIHJvdyBxLWd1dHRlci14LXNtIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxkaXY+UXVhbnRpdHk6PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj57eyBpdGVtLnRvdGFsX3F1YW50aXR5IH19PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1wYS14bSByb3cgcS1ndXR0ZXIteC1zbSBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlByaWNlOjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+e3sgZm9ybWF0Q3VycmVuY3koaXRlbS5wcmljZSkgfX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDwvcS1jYXJkPlxuICAgICAgICA8L3EtaW50ZXJzZWN0aW9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9xLXNjcm9sbC1hcmVhPlxuICA8L2Rpdj5cbiAgPGRpdj5cbiAgICA8cS1kaWFsb2cgdi1tb2RlbD1cImRpYWxvZ1wiPlxuICAgICAgPHEtY2FyZCBjbGFzcz1cIm15LWNhcmQgcS1wYS1tZFwiIHN0eWxlPVwid2lkdGg6IDcwMHB4OyBtYXgtd2lkdGg6IDgwdndcIj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPlxuICAgICAgICAgICAgICB7eyBzZWxlY3RlZEl0ZW0gPyBzZWxlY3RlZEl0ZW0ucHJvZHVjdC5uYW1lIDogXCJcIiB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cS1idG4gcm91bmQgZGVuc2UgZmxhdCBpY29uPVwiY2xvc2VcIiBAY2xpY2s9XCJjbG9zZURpYWxvZ1wiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW1iLWxnIHJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1saWdodFwiPlJlbWFpbm5pbmdzPC9kaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cInNvZnRkcmlua3NQcm9kdWN0c1JlcG9ydC5yZW1haW5uaW5nc1wiXG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIG1hc2s9XCIjIyMjI1wiXG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgc3VmZml4PVwicGNzXCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjBcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDI2MHB4OyBtYXgtd2lkdGg6IDMwMHB4OyBtaW4td2lkdGg6IDUwcHhcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC13ZWlnaHQtbGlnaHRcIj5Tb2Z0ZHJpbmtzIE91dDwvZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJzb2Z0ZHJpbmtzUHJvZHVjdHNSZXBvcnQuc29mdGRyaW5rc091dFwiXG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIG1hc2s9XCIjIyMjI1wiXG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgc3VmZml4PVwicGNzXCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjBcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDI2MHB4OyBtYXgtd2lkdGg6IDMwMHB4OyBtaW4td2lkdGg6IDUwcHhcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci14bSBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci1zbVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC13ZWlnaHQtbGlnaHRcIj5Ub3RhbCBTb2Z0ZHJpbmtzPC9kaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICAgICAgOmxhYmVsPVwic2VsZWN0ZWRJdGVtID8gc2VsZWN0ZWRJdGVtLnRvdGFsX3F1YW50aXR5IDogJydcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEyMHB4OyBtYXgtd2lkdGg6IDMwMHB4OyBtaW4td2lkdGg6IDUwcHhcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtYm9keTIgdGV4dC13ZWlnaHQtcmVndWxhclwiPnBjczwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci1zbVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC13ZWlnaHQtbGlnaHRcIj5QcmljZTwvZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgICAgIDpsYWJlbD1cInNlbGVjdGVkSXRlbSA/IGZvcm1hdEN1cnJlbmN5KHNlbGVjdGVkSXRlbS5wcmljZSkgOiAnJ1wiXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTIwcHg7IG1heC13aWR0aDogMzAwcHg7IG1pbi13aWR0aDogNTBweFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci1zbVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC13ZWlnaHQtbGlnaHRcIj5Tb2xkIFBjczwvZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cInNvZnRkcmlua3NQcm9kdWN0c1JlcG9ydC5zb2Z0ZHJpbmtzU29sZFwiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICByZXZlcnNlLWZpbGwtbWFza1xuICAgICAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTIwcHg7IG1heC13aWR0aDogMzAwcHg7IG1pbi13aWR0aDogNTBweFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1ib2R5MiB0ZXh0LXdlaWdodC1yZWd1bGFyXCI+cGNzPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXNtXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1saWdodFwiPlNhbGVzIEFtb3VudDwvZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwic29mdGRyaW5rc1NhbGVzQW1vdW50Rm9ybWF0dGVkXCJcbiAgICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDE1MHB4OyBtYXgtd2lkdGg6IDMwMHB4OyBtaW4td2lkdGg6IDUwcHhcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPCEtLSA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1ib2R5MiB0ZXh0LXdlaWdodC1yZWd1bGFyXCI+UEhQPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+IC0tPlxuICAgICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxkaXYgYWxpZ249XCJyaWdodFwiPlxuICAgICAgICAgICAgPHEtYnRuIGNvbG9yPVwicmVkLTZcIiBsYWJlbD1cIk9rXCIgQGNsaWNrPVwic2F2ZVJlcG9ydFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8L3EtY2FyZD5cbiAgICA8L3EtZGlhbG9nPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VTYWxlc1JlcG9ydHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3NhbGVzLXJlcG9ydFwiO1xuaW1wb3J0IHsgY29tcHV0ZWQsIG9uTW91bnRlZCwgcmVhY3RpdmUsIHJlZiwgd2F0Y2ggfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IHNhbGVzUmVwb3J0c1N0b3JlID0gdXNlU2FsZXNSZXBvcnRzU3RvcmUoKTtcbmNvbnN0IHVzZXJEYXRhID0gc2FsZXNSZXBvcnRzU3RvcmUudXNlcjtcbmNvbnN0IHNlbGVjdGVkSXRlbSA9IHJlZihudWxsKTtcbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IGNsaWNrbWUgPSAoaXRlbSkgPT4ge1xuICBzZWxlY3RlZEl0ZW0udmFsdWUgPSBpdGVtO1xuICBkaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcblxuY29uc3Qgc29mdGRyaW5rc1Byb2R1Y3RzUmVwb3J0ID0gcmVhY3RpdmUoe1xuICBzb2Z0ZHJpbmtzU29sZDogMCxcbiAgcmVtYWlubmluZ3M6IDAsXG4gIGJlZ2lubmluZ3M6IDAsXG4gIHNvZnRkcmlua3NPdXQ6IDAsXG59KTtcblxuY29uc3QgZm9ybWF0Q3VycmVuY3kgPSAodmFsdWUpID0+IHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChcImVuLVVTXCIsIHtcbiAgICBzdHlsZTogXCJjdXJyZW5jeVwiLFxuICAgIGN1cnJlbmN5OiBcIlBIUFwiLFxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gIH0pLmZvcm1hdCh2YWx1ZSk7XG59O1xuXG5jb25zdCBzb2Z0ZHJpbmtzU2FsZXNBbW91bnQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmIChzZWxlY3RlZEl0ZW0udmFsdWUpIHtcbiAgICByZXR1cm4gc29mdGRyaW5rc1Byb2R1Y3RzUmVwb3J0LnNvZnRkcmlua3NTb2xkICogc2VsZWN0ZWRJdGVtLnZhbHVlLnByaWNlO1xuICB9XG4gIHJldHVybiAwO1xufSk7XG5cbmNvbnN0IHNvZnRkcmlua3NTYWxlc0Ftb3VudEZvcm1hdHRlZCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIGZvcm1hdEN1cnJlbmN5KHNvZnRkcmlua3NTYWxlc0Ftb3VudC52YWx1ZSk7XG59KTtcblxuY29uc3QgY2FsY3VsYXRlU29mZHJpbmtzU29sZCA9ICgpID0+IHtcbiAgaWYgKHNlbGVjdGVkSXRlbS52YWx1ZSkge1xuICAgIGNvbnN0IHRvdGFsUXVhbnRpdHkgPSBwYXJzZUludChzZWxlY3RlZEl0ZW0udmFsdWUudG90YWxfcXVhbnRpdHkpIHx8IDA7XG4gICAgY29uc3QgcmVtYWluaW5ncyA9IHBhcnNlSW50KHNvZnRkcmlua3NQcm9kdWN0c1JlcG9ydC5yZW1haW5uaW5ncykgfHwgMDtcbiAgICBjb25zdCBzb2Z0ZHJpbmtzT3V0ID0gcGFyc2VJbnQoc29mdGRyaW5rc1Byb2R1Y3RzUmVwb3J0LnNvZnRkcmlua3NPdXQpIHx8IDA7XG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IHJlbWFpbmluZ3MgKyBzb2Z0ZHJpbmtzT3V0O1xuICAgIHNvZnRkcmlua3NQcm9kdWN0c1JlcG9ydC5zb2Z0ZHJpbmtzU29sZCA9IHRvdGFsUXVhbnRpdHkgLSBkaWZmZXJlbmNlO1xuICB9XG59O1xuXG53YXRjaChcbiAgKCkgPT4gc29mdGRyaW5rc1Byb2R1Y3RzUmVwb3J0LnJlbWFpbm5pbmdzLFxuICAobmV3UmVtYWluaW5nKSA9PiB7XG4gICAgY2FsY3VsYXRlU29mZHJpbmtzU29sZCgpO1xuICB9XG4pO1xuXG53YXRjaChcbiAgKCkgPT4gc29mdGRyaW5rc1Byb2R1Y3RzUmVwb3J0LnNvZnRkcmlua3NPdXQsXG4gIChuZXdCcmVhZE91dCkgPT4ge1xuICAgIGNhbGN1bGF0ZVNvZmRyaW5rc1NvbGQoKTtcbiAgfVxuKTtcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgY29uc3QgdXNlckRhdGEgPSBzYWxlc1JlcG9ydHNTdG9yZS51c2VyO1xuICBjb25zdCBicmFuY2hJZCA9IHVzZXJEYXRhPy5kYXRhPy5icmFuY2hfZW1wbG95ZWU/LmJyYW5jaF9pZCB8fCBcIlwiO1xuICBpZiAoYnJhbmNoSWQpIHtcbiAgICBhd2FpdCBmZXRjaFByb2R1Y3RzKGJyYW5jaElkKTtcbiAgfVxufSk7XG5cbmNvbnN0IGZldGNoUHJvZHVjdHMgPSBhc3luYyAoYnJhbmNoSWQpID0+IHtcbiAgYXdhaXQgc2FsZXNSZXBvcnRzU3RvcmUuZmV0Y2hCcmFuY2hQcm9kdWN0cyhicmFuY2hJZCk7XG59O1xuXG5jb25zdCBzb2Z0ZHJpbmtzUHJvZHVjdHMgPSBjb21wdXRlZCgoKSA9PiBzYWxlc1JlcG9ydHNTdG9yZS5zb2Z0ZHJpbmtzUHJvZHVjdHMpO1xud2F0Y2goc29mdGRyaW5rc1Byb2R1Y3RzLCAobmV3VmFsKSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKFwic29mdGRyaW5rc1Byb2R1Y3RzIHVwZGF0ZWQ6XCIsIG5ld1ZhbCk7XG59KTtcblxuY29uc3QgY2xvc2VEaWFsb2cgPSAoKSA9PiB7XG4gIHNlbGVjdGVkSXRlbS52YWx1ZSA9IG51bGw7XG4gIHNvZnRkcmlua3NQcm9kdWN0c1JlcG9ydC5zb2Z0ZHJpbmtzU29sZCA9IDA7XG4gIHNvZnRkcmlua3NQcm9kdWN0c1JlcG9ydC5yZW1haW5uaW5ncyA9IDA7XG4gIHNvZnRkcmlua3NQcm9kdWN0c1JlcG9ydC5iZWdpbm5pbmdzID0gMDtcbiAgc29mdGRyaW5rc1Byb2R1Y3RzUmVwb3J0LnNvZnRkcmlua3NPdXQgPSAwO1xuICBkaWFsb2cudmFsdWUgPSBmYWxzZTtcbn07XG5cbmNvbnN0IHNhdmVSZXBvcnQgPSAoKSA9PiB7XG4gIGlmIChzZWxlY3RlZEl0ZW0udmFsdWUpIHtcbiAgICBjb25zdCByZXBvcnQgPSB7XG4gICAgICB1c2VyX2lkOiB1c2VyRGF0YT8uZGF0YS5pZCxcbiAgICAgIGJyYW5jaF9pZDogdXNlckRhdGE/LmRhdGE/LmJyYW5jaF9lbXBsb3llZT8uYnJhbmNoX2lkIHx8IFwiXCIsXG4gICAgICBwcm9kdWN0X2lkOiBzZWxlY3RlZEl0ZW0udmFsdWUucHJvZHVjdC5pZCxcbiAgICAgIG5hbWU6IHNlbGVjdGVkSXRlbS52YWx1ZS5wcm9kdWN0Lm5hbWUsXG4gICAgICB0b3RhbDogc2VsZWN0ZWRJdGVtLnZhbHVlLnRvdGFsX3F1YW50aXR5LFxuICAgICAgYWRkZWRfc3RvY2tzOiBzZWxlY3RlZEl0ZW0udmFsdWUubmV3X3Byb2R1Y3Rpb24sXG4gICAgICBzb2xkOiBzb2Z0ZHJpbmtzUHJvZHVjdHNSZXBvcnQuc29mdGRyaW5rc1NvbGQsXG4gICAgICBvdXQ6IHNvZnRkcmlua3NQcm9kdWN0c1JlcG9ydC5zb2Z0ZHJpbmtzT3V0LFxuICAgICAgYmVnaW5uaW5nczogc2VsZWN0ZWRJdGVtLnZhbHVlLmJlZ2lubmluZ3MsXG4gICAgICByZW1haW5pbmc6IHNvZnRkcmlua3NQcm9kdWN0c1JlcG9ydC5yZW1haW5uaW5ncyxcbiAgICAgIHByaWNlOiBzZWxlY3RlZEl0ZW0udmFsdWUucHJpY2UsXG4gICAgICBzYWxlczogc29mdGRyaW5rc1NhbGVzQW1vdW50LnZhbHVlLFxuICAgIH07XG4gICAgc2FsZXNSZXBvcnRzU3RvcmUudXBkYXRlU29mdGRyaW5rc1JlcG9ydChyZXBvcnQpO1xuICAgIGNsb3NlRGlhbG9nKCk7XG4gIH1cbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuLmV4YW1wbGUtaXRlbSB7XG4gIHdpZHRoOiAxOTBweDtcbiAgbWF4LXdpZHRoOiA1MDBweDtcbiAgbWluLXdpZHRoOiA4MHB4O1xuICBoZWlnaHQ6IDI1MHB4O1xuICBtYXgtaGVpZ2h0OiA1MDBweDtcbiAgbWluLWhlaWdodDogMjAwcHg7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1pbnB1dFxuICAgIHYtbW9kZWw9XCJzZWFyY2hFbmdpbmVcIlxuICAgIHJvdW5kZWRcbiAgICBvdXRsaW5lZFxuICAgIGRlbnNlXG4gICAgZmxhdFxuICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoLi4uXCJcbiAgICBzdHlsZT1cIndpZHRoOiA0MDBweDsgbWF4LXdpZHRoOiA0NTBweDsgbWluLXdpZHRoOiAxNTBweFwiXG4gID5cbiAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxxLWljb24gbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L3RlbXBsYXRlPlxuICA8L3EtaW5wdXQ+XG48L3RlbXBsYXRlPlxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3Qgc2VhcmNoRW5naW5lID0gcmVmKFwiXCIpO1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWNhcmQgZmxhdD5cbiAgICA8cS1jYXJkLXNlY3Rpb24gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjZWY0NDQ0XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNiB0ZXh0LXdoaXRlXCI+XG4gICAgICAgIDxxLWljb24gbmFtZT1cImZhLXNvbGlkIGZhLXN0b3JlXCIgLz5cbiAgICAgICAgU3RvcmUgQnJhbmNoZXNcbiAgICAgIDwvZGl2PlxuICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgPHEtdGFic1xuICAgICAgICB2LW1vZGVsPVwicHJvZHVjdHNUYWJcIlxuICAgICAgICBkZW5zZVxuICAgICAgICBjbGFzcz1cImJnLXdoaXRlXCJcbiAgICAgICAgYWN0aXZlLWNvbG9yPVwicmVkLTZcIlxuICAgICAgICBpbmRpY2F0b3ItY29sb3I9XCJyZWQtNlwiXG4gICAgICAgIGFsaWduPVwianVzdGlmeVwiXG4gICAgICA+XG4gICAgICAgIDxxLXRhYiBuYW1lPVwiYnJlYWRcIiBsYWJlbD1cIkJyZWFkXCIgLz5cbiAgICAgICAgPHEtdGFiIG5hbWU9XCJzZWxlY3RhXCIgbGFiZWw9XCJTZWxlY3RhXCIgLz5cbiAgICAgICAgPHEtdGFiIG5hbWU9XCJzb2Z0ZHJpbmtzXCIgbGFiZWw9XCJTb2Z0ZHJpbmtzXCIgLz5cbiAgICAgIDwvcS10YWJzPlxuICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgPHEtdGFiLXBhbmVscyB2LW1vZGVsPVwicHJvZHVjdHNUYWJcIiBhbmltYXRlZD5cbiAgICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJicmVhZFwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8QnJlYWRQYWdlIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS10YWItcGFuZWw+XG4gICAgICAgIDxxLXRhYi1wYW5lbCBuYW1lPVwic2VsZWN0YVwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8U2VsZWN0YVBhZ2UgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLXRhYi1wYW5lbD5cbiAgICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJzb2Z0ZHJpbmtzXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxTb2Z0ZHJpbmtzUGFnZSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtdGFiLXBhbmVsPlxuICAgICAgPC9xLXRhYi1wYW5lbHM+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgPC9xLWNhcmQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IEJyZWFkUGFnZSBmcm9tIFwiLi9jb21wb25lbnRzL0JyZWFkUGFnZS52dWVcIjtcbmltcG9ydCBTZWxlY3RhUGFnZSBmcm9tIFwiLi9jb21wb25lbnRzL1NlbGVjdGFQYWdlLnZ1ZVwiO1xuaW1wb3J0IFNvZnRkcmlua3NQYWdlIGZyb20gXCIuL2NvbXBvbmVudHMvU29mdGRyaW5rc1BhZ2UudnVlXCI7XG5pbXBvcnQgeyByZWYgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IHByb2R1Y3RzVGFiID0gcmVmKFwiYnJlYWRcIik7XG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6WyJ1c2VyRGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxNQUFNLGFBQWE7QUFBQSxFQUNqQixXQUFXO0FBQUEsRUFDWCxNQUFNO0FBQUEsRUFDTixZQUFZO0FBQ2Q7QUFFQSxTQUFTLE9BQVEsSUFBSSxLQUFLLE9BQU87QUFDL0IsTUFBSSxTQUFTLEtBQUs7QUFFbEIsTUFBSSxPQUFPLFVBQVUsWUFBWTtBQUMvQixjQUFVO0FBQ1YsVUFBTTtBQUNOLGNBQVUsSUFBSSxRQUFRO0FBQUEsRUFDdkIsT0FDSTtBQUNILGNBQVUsTUFBTTtBQUNoQixVQUFNLE9BQU8sT0FBTyxDQUFFLEdBQUUsWUFBWSxNQUFNLEdBQUc7QUFDN0MsY0FBVSxJQUFJLFFBQVEsVUFBVSxZQUFZLElBQUksS0FBSyxHQUFHLE1BQU07QUFB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QVcsV0FBQUEsYUFBQSxnQkFBQUEsVUFBVSxTQUFWLG1CQUFnQixvQkFBaEIsbUJBQWlDLGNBQWE7QUFDL0QsVUFBSSxVQUFVO0FBQ1osY0FBTSxjQUFjLFFBQVE7QUFBQSxNQUM3QjtBQUFBLElBQ0gsQ0FBQztBQUVELFVBQU0sZ0JBQWdCLE9BQU8sYUFBYTtBQUN4QyxZQUFNLGtCQUFrQixvQkFBb0IsUUFBUTtBQUFBLElBQ3REO0FBRUEsVUFBTSxxQkFBcUIsU0FBUyxNQUFNLGtCQUFrQixrQkFBa0I7QUFDOUUsVUFBTSxvQkFBb0IsQ0FBQyxXQUFXO0FBQUEsSUFFdEMsQ0FBQztBQUVELFVBQU0sY0FBYyxNQUFNO0FBQ3hCLG1CQUFhLFFBQVE7QUFDckIsK0JBQXlCLGlCQUFpQjtBQUMxQywrQkFBeUIsY0FBYztBQUN2QywrQkFBeUIsYUFBYTtBQUN0QywrQkFBeUIsZ0JBQWdCO0FBQ3pDLGFBQU8sUUFBUTtBQUFBLElBQ2pCO0FBRUEsVUFBTSxhQUFhLE1BQU07O0FBQ3ZCLFVBQUksYUFBYSxPQUFPO0FBQ3RCLGNBQU0sU0FBUztBQUFBLFVBQ2IsU0FBUyxxQ0FBVSxLQUFLO0FBQUEsVUFDeEIsYUFBVyxnREFBVSxTQUFWLG1CQUFnQixvQkFBaEIsbUJBQWlDLGNBQWE7QUFBQSxVQUN6RCxZQUFZLGFBQWEsTUFBTSxRQUFRO0FBQUEsVUFDdkMsTUFBTSxhQUFhLE1BQU0sUUFBUTtBQUFBLFVBQ2pDLE9BQU8sYUFBYSxNQUFNO0FBQUEsVUFDMUIsY0FBYyxhQUFhLE1BQU07QUFBQSxVQUNqQyxNQUFNLHlCQUF5QjtBQUFBLFVBQy9CLEtBQUsseUJBQXlCO0FBQUEsVUFDOUIsWUFBWSxhQUFhLE1BQU07QUFBQSxVQUMvQixXQUFXLHlCQUF5QjtBQUFBLFVBQ3BDLE9BQU8sYUFBYSxNQUFNO0FBQUEsVUFDMUIsT0FBTyxzQkFBc0I7QUFBQSxRQUNuQztBQUNJLDBCQUFrQix1QkFBdUIsTUFBTTtBQUMvQztNQUNEO0FBQUEsSUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdk9BLFVBQU0sZUFBZSxJQUFJLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM4QjNCLFVBQU0sY0FBYyxJQUFJLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
