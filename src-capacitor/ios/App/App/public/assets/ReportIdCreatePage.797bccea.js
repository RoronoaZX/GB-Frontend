import { bt as shallowReactive, e as createComponent, ai as useRouterLinkProps, a8 as useModelToggleProps, a9 as useDarkProps, aa as useModelToggleEmits, ab as useDark, n as ref, bu as useId, ad as useModelToggle, g as computed, u as watch, A as onBeforeUnmount, h, k as getCurrentInstance, bi as uid, a2 as QSeparator, af as withDirectives, bv as vShow, j as hSlot, L as QIcon, Y as stopAndPrevent, _ as _export_sfc, o as openBlock, a4 as createElementBlock, J as createBaseVNode, a as createVNode, w as withCtx, c as createBlock, Q as QCard, I as QCardSection, R as toDisplayString, M as QBtn, a5 as Fragment, a6 as renderList, S as pushScopeId, T as popScopeId, t as reactive, O as createTextVNode, K as QInput, be as createCommentVNode, H as useRouter, r as resolveComponent } from "./index.c8e2405b.js";
import { Q as QSpace } from "./QSpace.08c50700.js";
import { Q as QItem, a as QItemSection } from "./QItem.76557ad9.js";
import { a as QItemLabel, Q as QField } from "./rtl.b1b38f21.js";
import { Q as QSlideTransition } from "./QSlideTransition.b87a2809.js";
import { Q as QVirtualScroll } from "./QVirtualScroll.41a98cb7.js";
import { u as useBakerReportsStore } from "./baker-report.4c6e60f9.js";
import { Q as QList } from "./QList.d5d13fac.js";
import { u as useBranchRecipeStore } from "./branch-recipe.ce2a45ec.js";
import "./use-virtual-scroll.5b4ab88d.js";
import "./axios.aa1bce92.js";
const itemGroups = shallowReactive({});
const LINK_PROPS = Object.keys(useRouterLinkProps);
var QExpansionItem = createComponent({
  name: "QExpansionItem",
  props: {
    ...useRouterLinkProps,
    ...useModelToggleProps,
    ...useDarkProps,
    icon: String,
    label: String,
    labelLines: [Number, String],
    caption: String,
    captionLines: [Number, String],
    dense: Boolean,
    toggleAriaLabel: String,
    expandIcon: String,
    expandedIcon: String,
    expandIconClass: [Array, String, Object],
    duration: {},
    headerInsetLevel: Number,
    contentInsetLevel: Number,
    expandSeparator: Boolean,
    defaultOpened: Boolean,
    hideExpandIcon: Boolean,
    expandIconToggle: Boolean,
    switchToggleSide: Boolean,
    denseToggle: Boolean,
    group: String,
    popup: Boolean,
    headerStyle: [Array, String, Object],
    headerClass: [Array, String, Object]
  },
  emits: [
    ...useModelToggleEmits,
    "click",
    "afterShow",
    "afterHide"
  ],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const showing = ref(
      props.modelValue !== null ? props.modelValue : props.defaultOpened
    );
    const blurTargetRef = ref(null);
    const targetUid = useId();
    const { show, hide, toggle } = useModelToggle({ showing });
    let uniqueId, exitGroup;
    const classes = computed(
      () => `q-expansion-item q-item-type q-expansion-item--${showing.value === true ? "expanded" : "collapsed"} q-expansion-item--${props.popup === true ? "popup" : "standard"}`
    );
    const contentStyle = computed(() => {
      if (props.contentInsetLevel === void 0) {
        return null;
      }
      const dir = $q.lang.rtl === true ? "Right" : "Left";
      return {
        ["padding" + dir]: props.contentInsetLevel * 56 + "px"
      };
    });
    const hasLink = computed(
      () => props.disable !== true && (props.href !== void 0 || props.to !== void 0 && props.to !== null && props.to !== "")
    );
    const linkProps = computed(() => {
      const acc = {};
      LINK_PROPS.forEach((key) => {
        acc[key] = props[key];
      });
      return acc;
    });
    const isClickable = computed(
      () => hasLink.value === true || props.expandIconToggle !== true
    );
    const expansionIcon = computed(() => props.expandedIcon !== void 0 && showing.value === true ? props.expandedIcon : props.expandIcon || $q.iconSet.expansionItem[props.denseToggle === true ? "denseIcon" : "icon"]);
    const activeToggleIcon = computed(
      () => props.disable !== true && (hasLink.value === true || props.expandIconToggle === true)
    );
    const headerSlotScope = computed(() => ({
      expanded: showing.value === true,
      detailsId: targetUid.value,
      toggle,
      show,
      hide
    }));
    const toggleAriaAttrs = computed(() => {
      const toggleAriaLabel = props.toggleAriaLabel !== void 0 ? props.toggleAriaLabel : $q.lang.label[showing.value === true ? "collapse" : "expand"](props.label);
      return {
        role: "button",
        "aria-expanded": showing.value === true ? "true" : "false",
        "aria-controls": targetUid.value,
        "aria-label": toggleAriaLabel
      };
    });
    watch(() => props.group, (name) => {
      exitGroup !== void 0 && exitGroup();
      name !== void 0 && enterGroup();
    });
    function onHeaderClick(e) {
      hasLink.value !== true && toggle(e);
      emit("click", e);
    }
    function toggleIconKeyboard(e) {
      e.keyCode === 13 && toggleIcon(e, true);
    }
    function toggleIcon(e, keyboard) {
      keyboard !== true && blurTargetRef.value !== null && blurTargetRef.value.focus();
      toggle(e);
      stopAndPrevent(e);
    }
    function onShow() {
      emit("afterShow");
    }
    function onHide() {
      emit("afterHide");
    }
    function enterGroup() {
      if (uniqueId === void 0) {
        uniqueId = uid();
      }
      if (showing.value === true) {
        itemGroups[props.group] = uniqueId;
      }
      const show2 = watch(showing, (val) => {
        if (val === true) {
          itemGroups[props.group] = uniqueId;
        } else if (itemGroups[props.group] === uniqueId) {
          delete itemGroups[props.group];
        }
      });
      const group = watch(
        () => itemGroups[props.group],
        (val, oldVal) => {
          if (oldVal === uniqueId && val !== void 0 && val !== uniqueId) {
            hide();
          }
        }
      );
      exitGroup = () => {
        show2();
        group();
        if (itemGroups[props.group] === uniqueId) {
          delete itemGroups[props.group];
        }
        exitGroup = void 0;
      };
    }
    function getToggleIcon() {
      const data = {
        class: [
          `q-focusable relative-position cursor-pointer${props.denseToggle === true && props.switchToggleSide === true ? " items-end" : ""}`,
          props.expandIconClass
        ],
        side: props.switchToggleSide !== true,
        avatar: props.switchToggleSide
      };
      const child = [
        h(QIcon, {
          class: "q-expansion-item__toggle-icon" + (props.expandedIcon === void 0 && showing.value === true ? " q-expansion-item__toggle-icon--rotated" : ""),
          name: expansionIcon.value
        })
      ];
      if (activeToggleIcon.value === true) {
        Object.assign(data, {
          tabindex: 0,
          ...toggleAriaAttrs.value,
          onClick: toggleIcon,
          onKeyup: toggleIconKeyboard
        });
        child.unshift(
          h("div", {
            ref: blurTargetRef,
            class: "q-expansion-item__toggle-focus q-icon q-focus-helper q-focus-helper--rounded",
            tabindex: -1
          })
        );
      }
      return h(QItemSection, data, () => child);
    }
    function getHeaderChild() {
      let child;
      if (slots.header !== void 0) {
        child = [].concat(slots.header(headerSlotScope.value));
      } else {
        child = [
          h(QItemSection, () => [
            h(QItemLabel, { lines: props.labelLines }, () => props.label || ""),
            props.caption ? h(QItemLabel, { lines: props.captionLines, caption: true }, () => props.caption) : null
          ])
        ];
        props.icon && child[props.switchToggleSide === true ? "push" : "unshift"](
          h(QItemSection, {
            side: props.switchToggleSide === true,
            avatar: props.switchToggleSide !== true
          }, () => h(QIcon, { name: props.icon }))
        );
      }
      if (props.disable !== true && props.hideExpandIcon !== true) {
        child[props.switchToggleSide === true ? "unshift" : "push"](
          getToggleIcon()
        );
      }
      return child;
    }
    function getHeader() {
      const data = {
        ref: "item",
        style: props.headerStyle,
        class: props.headerClass,
        dark: isDark.value,
        disable: props.disable,
        dense: props.dense,
        insetLevel: props.headerInsetLevel
      };
      if (isClickable.value === true) {
        data.clickable = true;
        data.onClick = onHeaderClick;
        Object.assign(
          data,
          hasLink.value === true ? linkProps.value : toggleAriaAttrs.value
        );
      }
      return h(QItem, data, getHeaderChild);
    }
    function getTransitionChild() {
      return withDirectives(
        h("div", {
          key: "e-content",
          class: "q-expansion-item__content relative-position",
          style: contentStyle.value,
          id: targetUid.value
        }, hSlot(slots.default)),
        [[
          vShow,
          showing.value
        ]]
      );
    }
    function getContent() {
      const node = [
        getHeader(),
        h(QSlideTransition, {
          duration: props.duration,
          onShow,
          onHide
        }, getTransitionChild)
      ];
      if (props.expandSeparator === true) {
        node.push(
          h(QSeparator, {
            class: "q-expansion-item__border q-expansion-item__border--top absolute-top",
            dark: isDark.value
          }),
          h(QSeparator, {
            class: "q-expansion-item__border q-expansion-item__border--bottom absolute-bottom",
            dark: isDark.value
          })
        );
      }
      return node;
    }
    props.group !== void 0 && enterGroup();
    onBeforeUnmount(() => {
      exitGroup !== void 0 && exitGroup();
    });
    return () => h("div", { class: classes.value }, [
      h("div", { class: "q-expansion-item__container relative-position" }, getContent())
    ]);
  }
});
var ReportListComponent_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-7388e64b"), n = n(), popScopeId(), n);
const _hoisted_1$3 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", {
  class: "text-h6",
  align: "center"
}, "Report List", -1));
const _hoisted_2$2 = { class: "q-pa-md row wrap justify-center" };
const _hoisted_3$2 = { class: "row justify-between q-gutter-x-md" };
const _hoisted_4$2 = { class: "row items-center" };
const _hoisted_5$2 = { class: "text-subtitle1 q-ml-sm" };
const _hoisted_6$1 = { class: "content-section" };
const _hoisted_7$1 = { class: "q-mt-xs row justify-between" };
const _hoisted_8$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Kilo", -1));
const _hoisted_9$1 = { class: "q-mt-xs row justify-between" };
const _hoisted_10$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Short", -1));
const _hoisted_11$1 = { class: "q-mt-xs row justify-between" };
const _hoisted_12$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Over", -1));
const _hoisted_13$1 = { class: "q-mt-xs row justify-between" };
const _hoisted_14 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Actual Target", -1));
const _hoisted_15 = { class: "q-pl-md" };
const _hoisted_16 = { class: "row justify-between" };
const _hoisted_17 = { class: "q-pl-md" };
const _hoisted_18 = { class: "row justify-between" };
const _hoisted_19 = { align: "right" };
const _sfc_main$3 = {
  __name: "ReportListComponent",
  setup(__props) {
    const bakerReportStore = useBakerReportsStore();
    const bakerReport = computed(() => bakerReportStore.reports);
    console.log("bakers report:", bakerReport.value);
    const removeReports = (index) => {
      bakerReportStore.removeReport(index);
    };
    const capitalizeFirstLetter = (location) => {
      if (!location)
        return "";
      return location.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    };
    const saveReports = async () => {
      bakerReportStore.createReports();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _hoisted_1$3,
        createBaseVNode("div", _hoisted_2$2, [
          createVNode(QVirtualScroll, {
            items: bakerReport.value,
            "scroll-target": "body",
            "virtual-scroll-horizontal": "",
            class: "my-virtual-scroll"
          }, {
            default: withCtx(({ item: report, index }) => [
              (openBlock(), createBlock(QCard, {
                flat: "",
                bordered: "",
                class: "q-gutter-sm my-card",
                key: index
              }, {
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_3$2, [
                        createBaseVNode("div", _hoisted_4$2, [
                          createVNode(QIcon, {
                            name: "assignment",
                            color: "primary"
                          }),
                          createBaseVNode("div", _hoisted_5$2, toDisplayString(capitalizeFirstLetter(report.recipe_name)) + " - " + toDisplayString(report.recipe_category), 1)
                        ]),
                        createBaseVNode("div", null, [
                          createVNode(QBtn, {
                            flat: "",
                            round: "",
                            icon: "close",
                            onClick: ($event) => removeReports(index),
                            class: "text-negative close-btn"
                          }, null, 8, ["onClick"])
                        ])
                      ])
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(QSeparator),
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_6$1, [
                        createBaseVNode("div", _hoisted_7$1, [
                          _hoisted_8$1,
                          createBaseVNode("div", null, toDisplayString(report.kilo) + " kgs", 1)
                        ]),
                        createBaseVNode("div", _hoisted_9$1, [
                          _hoisted_10$1,
                          createBaseVNode("div", null, toDisplayString(report.short) + " pcs", 1)
                        ]),
                        createBaseVNode("div", _hoisted_11$1, [
                          _hoisted_12$1,
                          createBaseVNode("div", null, toDisplayString(report.over) + " pcs", 1)
                        ]),
                        createBaseVNode("div", _hoisted_13$1, [
                          _hoisted_14,
                          createBaseVNode("div", null, toDisplayString(report.actual_target) + " pcs", 1)
                        ]),
                        (openBlock(), createBlock(QExpansionItem, {
                          key: "breads-" + index,
                          label: "Breads",
                          dense: "",
                          class: ""
                        }, {
                          default: withCtx(() => [
                            createBaseVNode("ul", _hoisted_15, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(report.breads, (bread, breadIndex) => {
                                return openBlock(), createElementBlock("li", {
                                  key: "bread-" + breadIndex,
                                  class: "q-my-sm"
                                }, [
                                  createBaseVNode("div", _hoisted_16, [
                                    createBaseVNode("div", null, toDisplayString(bread.bread_name), 1),
                                    createBaseVNode("div", null, toDisplayString(bread.bread_production), 1)
                                  ])
                                ]);
                              }), 128))
                            ])
                          ]),
                          _: 2
                        }, 1024)),
                        (openBlock(), createBlock(QExpansionItem, {
                          key: "ingredients-" + index,
                          label: "Ingredients",
                          dense: "",
                          class: ""
                        }, {
                          default: withCtx(() => [
                            createBaseVNode("ul", _hoisted_17, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(report.ingredients, (ingredient, ingredientIndex) => {
                                return openBlock(), createElementBlock("li", {
                                  key: "ingredient-" + ingredientIndex,
                                  class: "q-my-sm"
                                }, [
                                  createBaseVNode("div", _hoisted_18, [
                                    createBaseVNode("div", null, toDisplayString(ingredient.code), 1),
                                    createBaseVNode("div", null, toDisplayString(ingredient.quantity) + " " + toDisplayString(ingredient.unit), 1)
                                  ])
                                ]);
                              }), 128))
                            ])
                          ]),
                          _: 2
                        }, 1024))
                      ])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024))
            ]),
            _: 1
          }, 8, ["items"])
        ]),
        createBaseVNode("div", _hoisted_19, [
          createVNode(QBtn, {
            color: "red-6",
            icon: "edit",
            label: "Create",
            onClick: saveReports
          })
        ])
      ], 64);
    };
  }
};
var ReportContentComponent = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-7388e64b"], ["__file", "ReportListComponent.vue"]]);
var ReportRecipeInputComponent_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-0d690f3f"), n = n(), popScopeId(), n);
const _hoisted_1$2 = { class: "row justify-center" };
const _hoisted_2$1 = { class: "text-h6 q-ma-sm" };
const _hoisted_3$1 = { class: "row q-gutter-sm" };
const _hoisted_4$1 = { class: "row q-mt-sm q-gutter-sm" };
const _hoisted_5$1 = { class: "q-mb-md" };
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-mt-sm" }, "Kilo", -1));
const _hoisted_7 = { class: "q-mt-md q-gutter-md" };
const _hoisted_8 = { key: 0 };
const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-mt-sm" }, null, -1));
const _hoisted_10 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", {
  class: "text-h6 q-mt-sm",
  align: "center"
}, "Ingredients List", -1));
const _hoisted_11 = { class: "q-mt-lg" };
const _hoisted_12 = { class: "ingredient-quantity" };
const _hoisted_13 = { class: "ingredient-quantity" };
const _sfc_main$2 = {
  __name: "ReportRecipeInputComponent",
  setup(__props) {
    const bakerReportStore = useBakerReportsStore();
    const userData = computed(() => bakerReportStore.user);
    const recipe = computed(() => bakerReportStore.recipes);
    console.log("erwe:", recipe.value);
    const recipeName = computed(() => {
      var _a, _b, _c, _d;
      const name = (_b = (_a = recipe.value) == null ? void 0 : _a.name) != null ? _b : "Recipe Name";
      const category = (_d = (_c = recipe.value) == null ? void 0 : _c.category) != null ? _d : "Category";
      return `${name} - ${category}`;
    });
    const capitalizeFirstLetter = (location) => {
      if (!location)
        return "";
      return location.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    };
    const bakersReport = reactive({
      user_id: null,
      branch_id: null,
      branch_recipe_id: null,
      recipe_name: "",
      recipe_category: "",
      kilo: "",
      short: 0,
      over: 0,
      target: 0,
      actual_target: 0,
      breads: []
    });
    const updateActualTarget = () => {
      var _a;
      const kilo = parseFloat(bakersReport.kilo);
      const target = parseFloat((_a = recipe.value) == null ? void 0 : _a.target);
      if (!isNaN(kilo) && !isNaN(target)) {
        bakersReport.actual_target = kilo * target;
      } else {
        bakersReport.actual_target = 0;
      }
    };
    const calculateShortAndOver = () => {
      const totalBreadPcs = bakersReport.breads.reduce(
        (total, bread) => total + (parseFloat(bread.value) || 0),
        0
      );
      const difference = totalBreadPcs - bakersReport.actual_target;
      if (difference > 0) {
        bakersReport.over = difference;
        bakersReport.short = 0;
      } else if (difference < 0) {
        bakersReport.short = Math.abs(difference);
        bakersReport.over = 0;
      } else {
        bakersReport.short = 0;
        bakersReport.over = 0;
      }
    };
    const autoFillReport = () => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      bakersReport.user_id = ((_a = userData.value) == null ? void 0 : _a.data.id) || "";
      bakersReport.branch_id = ((_d = (_c = (_b = userData.value) == null ? void 0 : _b.data) == null ? void 0 : _c.employee) == null ? void 0 : _d.branch_employee.branch_id) || "";
      bakersReport.branch_recipe_id = ((_e = recipe.value) == null ? void 0 : _e.id) || "";
      bakersReport.recipe_name = ((_f = recipe.value) == null ? void 0 : _f.name) || "";
      bakersReport.target = ((_g = recipe.value) == null ? void 0 : _g.target) || "";
      bakersReport.recipe_category = ((_h = recipe.value) == null ? void 0 : _h.category) || "";
      const reportData = {
        user_id: bakersReport.user_id,
        branch_id: bakersReport.branch_id,
        branch_recipe_id: bakersReport.branch_recipe_id,
        recipe_name: bakersReport.recipe_name,
        recipe_category: bakersReport.recipe_category,
        status: "pending",
        kilo: bakersReport.kilo,
        short: bakersReport.short,
        over: bakersReport.over,
        target: bakersReport.target,
        actual_target: bakersReport.actual_target,
        breads: bakersReport.breads.map((bread) => ({
          bread_id: bread.id,
          bread_name: bread.bread_name,
          bread_production: parseInt(bread.value, 10)
        })),
        ingredients: multipliedIngredients.value.map((ingredient) => ({
          ingredients_id: ingredient.raw_materials_id,
          code: ingredient.code,
          quantity: ingredient.multipliedQuantity,
          unit: ingredient.unit
        }))
      };
      console.log("reportssss dATA:", reportData);
      bakerReportStore.setReport(reportData);
      console.log("Report data set to store:", bakerReportStore.reports);
      resetReportForm();
    };
    const resetReportForm = () => {
      var _a, _b;
      recipe.value = "";
      recipeName.value = "";
      bakersReport.recipe_name = "";
      bakersReport.kilo = "";
      bakersReport.short = 0;
      bakersReport.over = 0;
      bakersReport.target = 0;
      bakersReport.actual_target = 0;
      bakersReport.breads = ((_b = (_a = recipe.value) == null ? void 0 : _a.bread_groups) == null ? void 0 : _b.map((group) => ({
        id: group.product_id,
        bread_name: group.bread_name,
        value: ""
      }))) || [];
    };
    const multipliedIngredients = computed(() => {
      var _a;
      const kilo = parseInt(bakersReport.kilo) || 1;
      return (((_a = recipe.value) == null ? void 0 : _a.ingredients) || []).map((ingredient) => {
        const quantity = parseInt(ingredient.quantity);
        const multipliedQuantity = !isNaN(kilo) && !isNaN(quantity) ? kilo * quantity : 0;
        return {
          ...ingredient,
          multipliedQuantity
        };
      });
    });
    watch(
      () => bakersReport.kilo,
      () => {
        updateActualTarget();
        calculateShortAndOver();
      }
    );
    watch(
      () => {
        var _a;
        return (_a = recipe.value) == null ? void 0 : _a.ingredients;
      },
      () => {
        calculateShortAndOver();
      },
      { deep: true }
    );
    watch(
      () => bakersReport.breads.map((bread) => bread.value),
      calculateShortAndOver,
      { deep: true }
    );
    watch(
      () => {
        var _a;
        return (_a = recipe.value) == null ? void 0 : _a.bread_groups;
      },
      () => {
        var _a;
        bakersReport.breads = ((_a = recipe.value) == null ? void 0 : _a.bread_groups.map((group) => ({
          id: group.product_id,
          bread_name: group.bread_name,
          value: ""
        }))) || [];
        calculateShortAndOver();
      }
    );
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("div", null, [
          createBaseVNode("div", null, [
            createBaseVNode("div", _hoisted_2$1, toDisplayString(capitalizeFirstLetter(recipeName.value)), 1)
          ]),
          createBaseVNode("div", _hoisted_3$1, [
            createBaseVNode("div", null, [
              createTextVNode(" Target Pcs "),
              createBaseVNode("div", null, [
                createVNode(QField, {
                  readonly: "",
                  outlined: "",
                  type: "number",
                  dense: "",
                  label: ((_a = recipe.value) == null ? void 0 : _a.target) || 0,
                  style: { "width": "100px", "max-width": "300px", "min-width": "50px" }
                }, null, 8, ["label"])
              ])
            ]),
            createBaseVNode("div", null, [
              createTextVNode(" Actual Target "),
              createBaseVNode("div", null, [
                createVNode(QField, {
                  readonly: "",
                  outlined: "",
                  dense: "",
                  label: bakersReport.actual_target,
                  style: { "width": "100px", "max-width": "300px", "min-width": "50px" }
                }, null, 8, ["label"])
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_4$1, [
            createBaseVNode("div", null, [
              createTextVNode(" Short "),
              createBaseVNode("div", null, [
                createVNode(QField, {
                  readonly: "",
                  outlined: "",
                  type: "number",
                  dense: "",
                  label: bakersReport.short,
                  style: { "width": "100px", "max-width": "300px", "min-width": "50px" }
                }, null, 8, ["label"])
              ])
            ]),
            createBaseVNode("div", null, [
              createTextVNode(" Over "),
              createBaseVNode("div", null, [
                createVNode(QField, {
                  readonly: "",
                  outlined: "",
                  dense: "",
                  label: bakersReport.over,
                  style: { "width": "100px", "max-width": "300px", "min-width": "50px" }
                }, null, 8, ["label"])
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_5$1, [
            _hoisted_6,
            createBaseVNode("div", null, [
              createVNode(QInput, {
                outlined: "",
                dense: "",
                modelValue: bakersReport.kilo,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => bakersReport.kilo = $event),
                type: "number",
                placeholder: "kgs",
                style: { "width": "210px", "max-width": "300px", "min-width": "50px" }
              }, null, 8, ["modelValue"])
            ])
          ]),
          createBaseVNode("div", _hoisted_7, [
            bakersReport.breads.length ? (openBlock(), createElementBlock("div", _hoisted_8, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(bakersReport.breads, (bread, index) => {
                return openBlock(), createElementBlock("div", {
                  key: bread.id
                }, [
                  createBaseVNode("div", null, toDisplayString(bread.bread_name), 1),
                  createBaseVNode("div", null, [
                    createVNode(QInput, {
                      outlined: "",
                      modelValue: bakersReport.breads[index].value,
                      "onUpdate:modelValue": ($event) => bakersReport.breads[index].value = $event,
                      dense: "",
                      type: "number",
                      placeholder: "Pcs",
                      style: { "width": "210px", "max-width": "300px", "min-width": "50px" }
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]);
              }), 128))
            ])) : createCommentVNode("", true)
          ]),
          _hoisted_9,
          createVNode(QBtn, {
            outline: "",
            dense: "",
            size: "md",
            icon: "add",
            label: "Report",
            class: "text-purple",
            onClick: autoFillReport
          })
        ]),
        createBaseVNode("div", null, [
          _hoisted_10,
          createBaseVNode("div", _hoisted_11, [
            createVNode(QField, {
              readonly: "",
              outlined: "",
              style: { "width": "400px", "max-width": "450px", "min-width": "100px" }
            }, {
              control: withCtx(() => [
                createVNode(QList, {
                  dense: "",
                  separator: ""
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(multipliedIngredients.value, (ingredient, index) => {
                      return openBlock(), createBlock(QItem, {
                        key: index,
                        class: "q-pa-xs justify-between"
                      }, {
                        default: withCtx(() => [
                          createVNode(QItemSection, null, {
                            default: withCtx(() => [
                              createVNode(QItemLabel, { class: "ingredient-name" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(ingredient.code), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(QItemSection, {
                            side: "",
                            class: "text-right"
                          }, {
                            default: withCtx(() => [
                              createBaseVNode("div", _hoisted_12, toDisplayString(ingredient.multipliedQuantity.toFixed(2)), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(QItemSection, {
                            side: "",
                            class: "text-right"
                          }, {
                            default: withCtx(() => [
                              createBaseVNode("div", _hoisted_13, toDisplayString(ingredient.unit), 1)
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
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
};
var ReportRecipeInput = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-0d690f3f"], ["__file", "ReportRecipeInputComponent.vue"]]);
const _hoisted_1$1 = {
  key: 0,
  class: "custom-list z-top"
};
const _sfc_main$1 = {
  __name: "ReportSearchComponent",
  setup(__props) {
    var _a, _b, _c;
    const bakerReports = useBakerReportsStore();
    const searchQuery = ref("");
    const bakerReportStore = useBakerReportsStore();
    const branchRecipeStore = useBranchRecipeStore();
    const userData = computed(() => bakerReportStore.user);
    console.log("erw:", userData.value);
    const branhRecipes = computed(() => branchRecipeStore.branchRecipe);
    const branch_id = ((_c = (_b = (_a = userData.value) == null ? void 0 : _a.data) == null ? void 0 : _b.employee) == null ? void 0 : _c.branch_employee.branch_id) || "";
    console.log("branch_id", branch_id);
    const search = async () => {
      branchRecipeStore.searchBranchRecipe(searchQuery.value, branch_id);
      console.log("searchQuery.value", searchQuery.value);
      console.log("branch_id", branch_id);
    };
    const autoFillRecipe = (recipe) => {
      console.log("branch recipe", recipe);
      bakerReports.setRecipe(recipe);
      searchQuery.value = "";
    };
    const capitalizeFirstLetter = (location) => {
      if (!location)
        return "";
      return location.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    };
    console.log("recipessss", branhRecipes.value);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QInput, {
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
          searchQuery.value ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
            createVNode(QCard, null, {
              default: withCtx(() => [
                createVNode(QList, { separator: "" }, {
                  default: withCtx(() => {
                    var _a2;
                    return [
                      !((_a2 = branhRecipes.value) == null ? void 0 : _a2.length) ? (openBlock(), createBlock(QItem, { key: 0 }, {
                        default: withCtx(() => [
                          createTextVNode(" No record found. ")
                        ]),
                        _: 1
                      })) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(branhRecipes.value, (branchRecipe) => {
                        return openBlock(), createBlock(QItem, {
                          onClick: ($event) => autoFillRecipe(branchRecipe),
                          key: branchRecipe.id,
                          clickable: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QItemSection, null, {
                              default: withCtx(() => [
                                createVNode(QItemLabel, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(capitalizeFirstLetter(branchRecipe == null ? void 0 : branchRecipe.name)), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(QItemSection, null, {
                              default: withCtx(() => [
                                createVNode(QItemLabel, { side: "" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(branchRecipe == null ? void 0 : branchRecipe.category), 1)
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
      }, 8, ["modelValue"]);
    };
  }
};
var ReportSearch = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "ReportSearchComponent.vue"]]);
const _hoisted_1 = { class: "text-h6 text-dark row justify-between" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", null, " Bakers Report ", -1);
const _hoisted_3 = { class: "row" };
const _hoisted_4 = { class: "q-gutter-y-md" };
const _hoisted_5 = { class: "q-gutter-y-md" };
const _sfc_main = {
  __name: "ReportIdCreatePage",
  setup(__props) {
    const router = useRouter();
    const bakerReport = useBakerReportsStore();
    const report = computed(() => bakerReport.recipes);
    console.log("report", report);
    const goBack = () => {
      bakerReport.clearData();
      router.push("/branch/baker/report");
    };
    return (_ctx, _cache) => {
      const _component_BakersReportSearch = resolveComponent("BakersReportSearch");
      return openBlock(), createElementBlock("div", null, [
        createVNode(QCard, { flat: "" }, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_1, [
                  createBaseVNode("div", null, [
                    createVNode(QBtn, {
                      outline: "",
                      flat: "",
                      icon: "arrow_back",
                      onClick: goBack
                    })
                  ]),
                  createVNode(QSpace),
                  _hoisted_2
                ])
              ]),
              _: 1
            }),
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_3, [
                  createVNode(_component_BakersReportSearch)
                ])
              ]),
              _: 1
            }),
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", null, [
                  createVNode(ReportSearch)
                ]),
                createBaseVNode("div", _hoisted_4, [
                  createBaseVNode("div", null, [
                    createVNode(ReportRecipeInput)
                  ])
                ])
              ]),
              _: 1
            }),
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_5, [
                  createBaseVNode("div", null, [
                    createVNode(ReportContentComponent)
                  ])
                ])
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
var ReportIdCreatePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "ReportIdCreatePage.vue"]]);
export { ReportIdCreatePage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwb3J0SWRDcmVhdGVQYWdlLjc5N2JjY2VhLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2V4cGFuc2lvbi1pdGVtL1FFeHBhbnNpb25JdGVtLmpzIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9iYWtlci9yZXBvcnQvaWQvY29tcG9uZW50cy9SZXBvcnRMaXN0Q29tcG9uZW50LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9icmFuY2gvYmFrZXIvcmVwb3J0L2lkL2NvbXBvbmVudHMvUmVwb3J0UmVjaXBlSW5wdXRDb21wb25lbnQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9iYWtlci9yZXBvcnQvaWQvY29tcG9uZW50cy9SZXBvcnRTZWFyY2hDb21wb25lbnQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9iYWtlci9yZXBvcnQvaWQvUmVwb3J0SWRDcmVhdGVQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBzaGFsbG93UmVhY3RpdmUsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCB3aXRoRGlyZWN0aXZlcywgZ2V0Q3VycmVudEluc3RhbmNlLCB2U2hvdywgb25CZWZvcmVVbm1vdW50IH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUl0ZW0gZnJvbSAnLi4vaXRlbS9RSXRlbS5qcydcbmltcG9ydCBRSXRlbVNlY3Rpb24gZnJvbSAnLi4vaXRlbS9RSXRlbVNlY3Rpb24uanMnXG5pbXBvcnQgUUl0ZW1MYWJlbCBmcm9tICcuLi9pdGVtL1FJdGVtTGFiZWwuanMnXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcbmltcG9ydCBRU2xpZGVUcmFuc2l0aW9uIGZyb20gJy4uL3NsaWRlLXRyYW5zaXRpb24vUVNsaWRlVHJhbnNpdGlvbi5qcydcbmltcG9ydCBRU2VwYXJhdG9yIGZyb20gJy4uL3NlcGFyYXRvci9RU2VwYXJhdG9yLmpzJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1kYXJrL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZUlkIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS1pZC91c2UtaWQuanMnXG5pbXBvcnQgeyB1c2VSb3V0ZXJMaW5rUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1yb3V0ZXItbGluay91c2Utcm91dGVyLWxpbmsuanMnXG5pbXBvcnQgdXNlTW9kZWxUb2dnbGUsIHsgdXNlTW9kZWxUb2dnbGVQcm9wcywgdXNlTW9kZWxUb2dnbGVFbWl0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLW1vZGVsLXRvZ2dsZS91c2UtbW9kZWwtdG9nZ2xlLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgdWlkIGZyb20gJy4uLy4uL3V0aWxzL3VpZC91aWQuanMnXG5cbmNvbnN0IGl0ZW1Hcm91cHMgPSBzaGFsbG93UmVhY3RpdmUoe30pXG5jb25zdCBMSU5LX1BST1BTID0gT2JqZWN0LmtleXModXNlUm91dGVyTGlua1Byb3BzKVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUV4cGFuc2lvbkl0ZW0nLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlUm91dGVyTGlua1Byb3BzLFxuICAgIC4uLnVzZU1vZGVsVG9nZ2xlUHJvcHMsXG4gICAgLi4udXNlRGFya1Byb3BzLFxuXG4gICAgaWNvbjogU3RyaW5nLFxuXG4gICAgbGFiZWw6IFN0cmluZyxcbiAgICBsYWJlbExpbmVzOiBbIE51bWJlciwgU3RyaW5nIF0sXG5cbiAgICBjYXB0aW9uOiBTdHJpbmcsXG4gICAgY2FwdGlvbkxpbmVzOiBbIE51bWJlciwgU3RyaW5nIF0sXG5cbiAgICBkZW5zZTogQm9vbGVhbixcblxuICAgIHRvZ2dsZUFyaWFMYWJlbDogU3RyaW5nLFxuICAgIGV4cGFuZEljb246IFN0cmluZyxcbiAgICBleHBhbmRlZEljb246IFN0cmluZyxcbiAgICBleHBhbmRJY29uQ2xhc3M6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG4gICAgZHVyYXRpb246IHt9LFxuXG4gICAgaGVhZGVySW5zZXRMZXZlbDogTnVtYmVyLFxuICAgIGNvbnRlbnRJbnNldExldmVsOiBOdW1iZXIsXG5cbiAgICBleHBhbmRTZXBhcmF0b3I6IEJvb2xlYW4sXG4gICAgZGVmYXVsdE9wZW5lZDogQm9vbGVhbixcbiAgICBoaWRlRXhwYW5kSWNvbjogQm9vbGVhbixcbiAgICBleHBhbmRJY29uVG9nZ2xlOiBCb29sZWFuLFxuICAgIHN3aXRjaFRvZ2dsZVNpZGU6IEJvb2xlYW4sXG4gICAgZGVuc2VUb2dnbGU6IEJvb2xlYW4sXG4gICAgZ3JvdXA6IFN0cmluZyxcbiAgICBwb3B1cDogQm9vbGVhbixcblxuICAgIGhlYWRlclN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGhlYWRlckNsYXNzOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdXG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VNb2RlbFRvZ2dsZUVtaXRzLFxuICAgICdjbGljaycsICdhZnRlclNob3cnLCAnYWZ0ZXJIaWRlJ1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuXG4gICAgY29uc3Qgc2hvd2luZyA9IHJlZihcbiAgICAgIHByb3BzLm1vZGVsVmFsdWUgIT09IG51bGxcbiAgICAgICAgPyBwcm9wcy5tb2RlbFZhbHVlXG4gICAgICAgIDogcHJvcHMuZGVmYXVsdE9wZW5lZFxuICAgIClcblxuICAgIGNvbnN0IGJsdXJUYXJnZXRSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCB0YXJnZXRVaWQgPSB1c2VJZCgpXG5cbiAgICBjb25zdCB7IHNob3csIGhpZGUsIHRvZ2dsZSB9ID0gdXNlTW9kZWxUb2dnbGUoeyBzaG93aW5nIH0pXG5cbiAgICBsZXQgdW5pcXVlSWQsIGV4aXRHcm91cFxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1leHBhbnNpb24taXRlbSBxLWl0ZW0tdHlwZSdcbiAgICAgICsgYCBxLWV4cGFuc2lvbi1pdGVtLS0keyBzaG93aW5nLnZhbHVlID09PSB0cnVlID8gJ2V4cGFuZGVkJyA6ICdjb2xsYXBzZWQnIH1gXG4gICAgICArIGAgcS1leHBhbnNpb24taXRlbS0tJHsgcHJvcHMucG9wdXAgPT09IHRydWUgPyAncG9wdXAnIDogJ3N0YW5kYXJkJyB9YFxuICAgIClcblxuICAgIGNvbnN0IGNvbnRlbnRTdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5jb250ZW50SW5zZXRMZXZlbCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRpciA9ICRxLmxhbmcucnRsID09PSB0cnVlID8gJ1JpZ2h0JyA6ICdMZWZ0J1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgWyAncGFkZGluZycgKyBkaXIgXTogKHByb3BzLmNvbnRlbnRJbnNldExldmVsICogNTYpICsgJ3B4J1xuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBoYXNMaW5rID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgKFxuICAgICAgICBwcm9wcy5ocmVmICE9PSB2b2lkIDBcbiAgICAgICAgfHwgKHByb3BzLnRvICE9PSB2b2lkIDAgJiYgcHJvcHMudG8gIT09IG51bGwgJiYgcHJvcHMudG8gIT09ICcnKVxuICAgICAgKVxuICAgIClcblxuICAgIGNvbnN0IGxpbmtQcm9wcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGFjYyA9IHt9XG4gICAgICBMSU5LX1BST1BTLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgYWNjWyBrZXkgXSA9IHByb3BzWyBrZXkgXVxuICAgICAgfSlcbiAgICAgIHJldHVybiBhY2NcbiAgICB9KVxuXG4gICAgY29uc3QgaXNDbGlja2FibGUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgaGFzTGluay52YWx1ZSA9PT0gdHJ1ZSB8fCBwcm9wcy5leHBhbmRJY29uVG9nZ2xlICE9PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgZXhwYW5zaW9uSWNvbiA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmV4cGFuZGVkSWNvbiAhPT0gdm9pZCAwICYmIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5leHBhbmRlZEljb25cbiAgICAgICAgOiBwcm9wcy5leHBhbmRJY29uIHx8ICRxLmljb25TZXQuZXhwYW5zaW9uSXRlbVsgcHJvcHMuZGVuc2VUb2dnbGUgPT09IHRydWUgPyAnZGVuc2VJY29uJyA6ICdpY29uJyBdXG4gICAgKSlcblxuICAgIGNvbnN0IGFjdGl2ZVRvZ2dsZUljb24gPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiAoaGFzTGluay52YWx1ZSA9PT0gdHJ1ZSB8fCBwcm9wcy5leHBhbmRJY29uVG9nZ2xlID09PSB0cnVlKVxuICAgIClcblxuICAgIGNvbnN0IGhlYWRlclNsb3RTY29wZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICBleHBhbmRlZDogc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSxcbiAgICAgIGRldGFpbHNJZDogdGFyZ2V0VWlkLnZhbHVlLFxuICAgICAgdG9nZ2xlLFxuICAgICAgc2hvdyxcbiAgICAgIGhpZGVcbiAgICB9KSlcblxuICAgIGNvbnN0IHRvZ2dsZUFyaWFBdHRycyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHRvZ2dsZUFyaWFMYWJlbCA9IHByb3BzLnRvZ2dsZUFyaWFMYWJlbCAhPT0gdm9pZCAwXG4gICAgICAgID8gcHJvcHMudG9nZ2xlQXJpYUxhYmVsXG4gICAgICAgIDogJHEubGFuZy5sYWJlbFsgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSA/ICdjb2xsYXBzZScgOiAnZXhwYW5kJyBdKHByb3BzLmxhYmVsKVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICByb2xlOiAnYnV0dG9uJyxcbiAgICAgICAgJ2FyaWEtZXhwYW5kZWQnOiBzaG93aW5nLnZhbHVlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJyxcbiAgICAgICAgJ2FyaWEtY29udHJvbHMnOiB0YXJnZXRVaWQudmFsdWUsXG4gICAgICAgICdhcmlhLWxhYmVsJzogdG9nZ2xlQXJpYUxhYmVsXG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLmdyb3VwLCBuYW1lID0+IHtcbiAgICAgIGV4aXRHcm91cCAhPT0gdm9pZCAwICYmIGV4aXRHcm91cCgpXG4gICAgICBuYW1lICE9PSB2b2lkIDAgJiYgZW50ZXJHcm91cCgpXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIG9uSGVhZGVyQ2xpY2sgKGUpIHtcbiAgICAgIGhhc0xpbmsudmFsdWUgIT09IHRydWUgJiYgdG9nZ2xlKGUpXG4gICAgICBlbWl0KCdjbGljaycsIGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlSWNvbktleWJvYXJkIChlKSB7XG4gICAgICBlLmtleUNvZGUgPT09IDEzICYmIHRvZ2dsZUljb24oZSwgdHJ1ZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVJY29uIChlLCBrZXlib2FyZCkge1xuICAgICAga2V5Ym9hcmQgIT09IHRydWUgJiYgYmx1clRhcmdldFJlZi52YWx1ZSAhPT0gbnVsbCAmJiBibHVyVGFyZ2V0UmVmLnZhbHVlLmZvY3VzKClcbiAgICAgIHRvZ2dsZShlKVxuICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblNob3cgKCkge1xuICAgICAgZW1pdCgnYWZ0ZXJTaG93JylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkhpZGUgKCkge1xuICAgICAgZW1pdCgnYWZ0ZXJIaWRlJylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbnRlckdyb3VwICgpIHtcbiAgICAgIGlmICh1bmlxdWVJZCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHVuaXF1ZUlkID0gdWlkKClcbiAgICAgIH1cblxuICAgICAgaWYgKHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXSA9IHVuaXF1ZUlkXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNob3cgPSB3YXRjaChzaG93aW5nLCB2YWwgPT4ge1xuICAgICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgICAgaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXSA9IHVuaXF1ZUlkXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXSA9PT0gdW5pcXVlSWQpIHtcbiAgICAgICAgICBkZWxldGUgaXRlbUdyb3Vwc1sgcHJvcHMuZ3JvdXAgXVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBjb25zdCBncm91cCA9IHdhdGNoKFxuICAgICAgICAoKSA9PiBpdGVtR3JvdXBzWyBwcm9wcy5ncm91cCBdLFxuICAgICAgICAodmFsLCBvbGRWYWwpID0+IHtcbiAgICAgICAgICBpZiAob2xkVmFsID09PSB1bmlxdWVJZCAmJiB2YWwgIT09IHZvaWQgMCAmJiB2YWwgIT09IHVuaXF1ZUlkKSB7XG4gICAgICAgICAgICBoaWRlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcblxuICAgICAgZXhpdEdyb3VwID0gKCkgPT4ge1xuICAgICAgICBzaG93KClcbiAgICAgICAgZ3JvdXAoKVxuXG4gICAgICAgIGlmIChpdGVtR3JvdXBzWyBwcm9wcy5ncm91cCBdID09PSB1bmlxdWVJZCkge1xuICAgICAgICAgIGRlbGV0ZSBpdGVtR3JvdXBzWyBwcm9wcy5ncm91cCBdXG4gICAgICAgIH1cblxuICAgICAgICBleGl0R3JvdXAgPSB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUb2dnbGVJY29uICgpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgJ3EtZm9jdXNhYmxlIHJlbGF0aXZlLXBvc2l0aW9uIGN1cnNvci1wb2ludGVyJ1xuICAgICAgICAgICAgKyBgJHsgcHJvcHMuZGVuc2VUb2dnbGUgPT09IHRydWUgJiYgcHJvcHMuc3dpdGNoVG9nZ2xlU2lkZSA9PT0gdHJ1ZSA/ICcgaXRlbXMtZW5kJyA6ICcnIH1gLFxuICAgICAgICAgIHByb3BzLmV4cGFuZEljb25DbGFzc1xuICAgICAgICBdLFxuICAgICAgICBzaWRlOiBwcm9wcy5zd2l0Y2hUb2dnbGVTaWRlICE9PSB0cnVlLFxuICAgICAgICBhdmF0YXI6IHByb3BzLnN3aXRjaFRvZ2dsZVNpZGVcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2hpbGQgPSBbXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogJ3EtZXhwYW5zaW9uLWl0ZW1fX3RvZ2dsZS1pY29uJ1xuICAgICAgICAgICAgKyAocHJvcHMuZXhwYW5kZWRJY29uID09PSB2b2lkIDAgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/ICcgcS1leHBhbnNpb24taXRlbV9fdG9nZ2xlLWljb24tLXJvdGF0ZWQnXG4gICAgICAgICAgICAgIDogJycpLFxuICAgICAgICAgIG5hbWU6IGV4cGFuc2lvbkljb24udmFsdWVcbiAgICAgICAgfSlcbiAgICAgIF1cblxuICAgICAgaWYgKGFjdGl2ZVRvZ2dsZUljb24udmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihkYXRhLCB7XG4gICAgICAgICAgdGFiaW5kZXg6IDAsXG4gICAgICAgICAgLi4udG9nZ2xlQXJpYUF0dHJzLnZhbHVlLFxuICAgICAgICAgIG9uQ2xpY2s6IHRvZ2dsZUljb24sXG4gICAgICAgICAgb25LZXl1cDogdG9nZ2xlSWNvbktleWJvYXJkXG4gICAgICAgIH0pXG5cbiAgICAgICAgY2hpbGQudW5zaGlmdChcbiAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICByZWY6IGJsdXJUYXJnZXRSZWYsXG4gICAgICAgICAgICBjbGFzczogJ3EtZXhwYW5zaW9uLWl0ZW1fX3RvZ2dsZS1mb2N1cyBxLWljb24gcS1mb2N1cy1oZWxwZXIgcS1mb2N1cy1oZWxwZXItLXJvdW5kZWQnLFxuICAgICAgICAgICAgdGFiaW5kZXg6IC0xXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaChRSXRlbVNlY3Rpb24sIGRhdGEsICgpID0+IGNoaWxkKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEhlYWRlckNoaWxkICgpIHtcbiAgICAgIGxldCBjaGlsZFxuXG4gICAgICBpZiAoc2xvdHMuaGVhZGVyICE9PSB2b2lkIDApIHtcbiAgICAgICAgY2hpbGQgPSBbXS5jb25jYXQoc2xvdHMuaGVhZGVyKGhlYWRlclNsb3RTY29wZS52YWx1ZSkpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY2hpbGQgPSBbXG4gICAgICAgICAgaChRSXRlbVNlY3Rpb24sICgpID0+IFtcbiAgICAgICAgICAgIGgoUUl0ZW1MYWJlbCwgeyBsaW5lczogcHJvcHMubGFiZWxMaW5lcyB9LCAoKSA9PiBwcm9wcy5sYWJlbCB8fCAnJyksXG5cbiAgICAgICAgICAgIHByb3BzLmNhcHRpb25cbiAgICAgICAgICAgICAgPyBoKFFJdGVtTGFiZWwsIHsgbGluZXM6IHByb3BzLmNhcHRpb25MaW5lcywgY2FwdGlvbjogdHJ1ZSB9LCAoKSA9PiBwcm9wcy5jYXB0aW9uKVxuICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICBdKVxuICAgICAgICBdXG5cbiAgICAgICAgcHJvcHMuaWNvbiAmJiBjaGlsZFsgcHJvcHMuc3dpdGNoVG9nZ2xlU2lkZSA9PT0gdHJ1ZSA/ICdwdXNoJyA6ICd1bnNoaWZ0JyBdKFxuICAgICAgICAgIGgoUUl0ZW1TZWN0aW9uLCB7XG4gICAgICAgICAgICBzaWRlOiBwcm9wcy5zd2l0Y2hUb2dnbGVTaWRlID09PSB0cnVlLFxuICAgICAgICAgICAgYXZhdGFyOiBwcm9wcy5zd2l0Y2hUb2dnbGVTaWRlICE9PSB0cnVlXG4gICAgICAgICAgfSwgKCkgPT4gaChRSWNvbiwgeyBuYW1lOiBwcm9wcy5pY29uIH0pKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIHByb3BzLmhpZGVFeHBhbmRJY29uICE9PSB0cnVlKSB7XG4gICAgICAgIGNoaWxkWyBwcm9wcy5zd2l0Y2hUb2dnbGVTaWRlID09PSB0cnVlID8gJ3Vuc2hpZnQnIDogJ3B1c2gnIF0oXG4gICAgICAgICAgZ2V0VG9nZ2xlSWNvbigpXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SGVhZGVyICgpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHJlZjogJ2l0ZW0nLFxuICAgICAgICBzdHlsZTogcHJvcHMuaGVhZGVyU3R5bGUsXG4gICAgICAgIGNsYXNzOiBwcm9wcy5oZWFkZXJDbGFzcyxcbiAgICAgICAgZGFyazogaXNEYXJrLnZhbHVlLFxuICAgICAgICBkaXNhYmxlOiBwcm9wcy5kaXNhYmxlLFxuICAgICAgICBkZW5zZTogcHJvcHMuZGVuc2UsXG4gICAgICAgIGluc2V0TGV2ZWw6IHByb3BzLmhlYWRlckluc2V0TGV2ZWxcbiAgICAgIH1cblxuICAgICAgaWYgKGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGRhdGEuY2xpY2thYmxlID0gdHJ1ZVxuICAgICAgICBkYXRhLm9uQ2xpY2sgPSBvbkhlYWRlckNsaWNrXG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICBkYXRhLFxuICAgICAgICAgIGhhc0xpbmsudmFsdWUgPT09IHRydWUgPyBsaW5rUHJvcHMudmFsdWUgOiB0b2dnbGVBcmlhQXR0cnMudmFsdWVcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaChRSXRlbSwgZGF0YSwgZ2V0SGVhZGVyQ2hpbGQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VHJhbnNpdGlvbkNoaWxkICgpIHtcbiAgICAgIHJldHVybiB3aXRoRGlyZWN0aXZlcyhcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGtleTogJ2UtY29udGVudCcsXG4gICAgICAgICAgY2xhc3M6ICdxLWV4cGFuc2lvbi1pdGVtX19jb250ZW50IHJlbGF0aXZlLXBvc2l0aW9uJyxcbiAgICAgICAgICBzdHlsZTogY29udGVudFN0eWxlLnZhbHVlLFxuICAgICAgICAgIGlkOiB0YXJnZXRVaWQudmFsdWVcbiAgICAgICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpLFxuICAgICAgICBbIFtcbiAgICAgICAgICB2U2hvdyxcbiAgICAgICAgICBzaG93aW5nLnZhbHVlXG4gICAgICAgIF0gXVxuICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgICAgY29uc3Qgbm9kZSA9IFtcbiAgICAgICAgZ2V0SGVhZGVyKCksXG5cbiAgICAgICAgaChRU2xpZGVUcmFuc2l0aW9uLCB7XG4gICAgICAgICAgZHVyYXRpb246IHByb3BzLmR1cmF0aW9uLFxuICAgICAgICAgIG9uU2hvdyxcbiAgICAgICAgICBvbkhpZGVcbiAgICAgICAgfSwgZ2V0VHJhbnNpdGlvbkNoaWxkKVxuICAgICAgXVxuXG4gICAgICBpZiAocHJvcHMuZXhwYW5kU2VwYXJhdG9yID09PSB0cnVlKSB7XG4gICAgICAgIG5vZGUucHVzaChcbiAgICAgICAgICBoKFFTZXBhcmF0b3IsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1leHBhbnNpb24taXRlbV9fYm9yZGVyIHEtZXhwYW5zaW9uLWl0ZW1fX2JvcmRlci0tdG9wIGFic29sdXRlLXRvcCcsXG4gICAgICAgICAgICBkYXJrOiBpc0RhcmsudmFsdWVcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBoKFFTZXBhcmF0b3IsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1leHBhbnNpb24taXRlbV9fYm9yZGVyIHEtZXhwYW5zaW9uLWl0ZW1fX2JvcmRlci0tYm90dG9tIGFic29sdXRlLWJvdHRvbScsXG4gICAgICAgICAgICBkYXJrOiBpc0RhcmsudmFsdWVcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBub2RlXG4gICAgfVxuXG4gICAgcHJvcHMuZ3JvdXAgIT09IHZvaWQgMCAmJiBlbnRlckdyb3VwKClcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBleGl0R3JvdXAgIT09IHZvaWQgMCAmJiBleGl0R3JvdXAoKVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2JywgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSB9LCBbXG4gICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1leHBhbnNpb24taXRlbV9fY29udGFpbmVyIHJlbGF0aXZlLXBvc2l0aW9uJyB9LCBnZXRDb250ZW50KCkpXG4gICAgXSlcbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInRleHQtaDZcIiBhbGlnbj1cImNlbnRlclwiPlJlcG9ydCBMaXN0PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJxLXBhLW1kIHJvdyB3cmFwIGp1c3RpZnktY2VudGVyXCI+XG4gICAgPHEtdmlydHVhbC1zY3JvbGxcbiAgICAgIDppdGVtcz1cImJha2VyUmVwb3J0XCJcbiAgICAgIHNjcm9sbC10YXJnZXQ9XCJib2R5XCJcbiAgICAgIHZpcnR1YWwtc2Nyb2xsLWhvcml6b250YWxcbiAgICAgIGNsYXNzPVwibXktdmlydHVhbC1zY3JvbGxcIlxuICAgID5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q9XCJ7IGl0ZW06IHJlcG9ydCwgaW5kZXggfVwiPlxuICAgICAgICA8cS1jYXJkIGZsYXQgYm9yZGVyZWQgY2xhc3M9XCJxLWd1dHRlci1zbSBteS1jYXJkXCIgOmtleT1cImluZGV4XCI+XG4gICAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW4gcS1ndXR0ZXIteC1tZFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cImFzc2lnbm1lbnRcIiBjb2xvcj1cInByaW1hcnlcIiAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMSBxLW1sLXNtXCI+XG4gICAgICAgICAgICAgICAgICB7eyBjYXBpdGFsaXplRmlyc3RMZXR0ZXIocmVwb3J0LnJlY2lwZV9uYW1lKSB9fSAtXG4gICAgICAgICAgICAgICAgICB7eyByZXBvcnQucmVjaXBlX2NhdGVnb3J5IH19XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgICAgcm91bmRcbiAgICAgICAgICAgICAgICAgIGljb249XCJjbG9zZVwiXG4gICAgICAgICAgICAgICAgICBAY2xpY2s9XCJyZW1vdmVSZXBvcnRzKGluZGV4KVwiXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cInRleHQtbmVnYXRpdmUgY2xvc2UtYnRuXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgPHEtc2VwYXJhdG9yIC8+XG4gICAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtc2VjdGlvblwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC14cyByb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5LaWxvPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj57eyByZXBvcnQua2lsbyB9fSBrZ3M8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LXhzIHJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlNob3J0PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj57eyByZXBvcnQuc2hvcnQgfX0gcGNzPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC14cyByb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5PdmVyPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj57eyByZXBvcnQub3ZlciB9fSBwY3M8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LXhzIHJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2PkFjdHVhbCBUYXJnZXQ8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2Pnt7IHJlcG9ydC5hY3R1YWxfdGFyZ2V0IH19IHBjczwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8cS1leHBhbnNpb24taXRlbVxuICAgICAgICAgICAgICAgIDprZXk9XCInYnJlYWRzLScgKyBpbmRleFwiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJCcmVhZHNcIlxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwicS1wbC1tZFwiPlxuICAgICAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgICAgIHYtZm9yPVwiKGJyZWFkLCBicmVhZEluZGV4KSBpbiByZXBvcnQuYnJlYWRzXCJcbiAgICAgICAgICAgICAgICAgICAgOmtleT1cIidicmVhZC0nICsgYnJlYWRJbmRleFwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicS1teS1zbVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj57eyBicmVhZC5icmVhZF9uYW1lIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj57eyBicmVhZC5icmVhZF9wcm9kdWN0aW9uIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICA8L3EtZXhwYW5zaW9uLWl0ZW0+XG4gICAgICAgICAgICAgIDxxLWV4cGFuc2lvbi1pdGVtXG4gICAgICAgICAgICAgICAgOmtleT1cIidpbmdyZWRpZW50cy0nICsgaW5kZXhcIlxuICAgICAgICAgICAgICAgIGxhYmVsPVwiSW5ncmVkaWVudHNcIlxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwicS1wbC1tZFwiPlxuICAgICAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgICAgIHYtZm9yPVwiKGluZ3JlZGllbnQsIGluZ3JlZGllbnRJbmRleCkgaW4gcmVwb3J0LmluZ3JlZGllbnRzXCJcbiAgICAgICAgICAgICAgICAgICAgOmtleT1cIidpbmdyZWRpZW50LScgKyBpbmdyZWRpZW50SW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInEtbXktc21cIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBpbmdyZWRpZW50LmNvZGUgfX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgaW5ncmVkaWVudC5xdWFudGl0eSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAge3sgaW5ncmVkaWVudC51bml0IH19XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICA8L3EtZXhwYW5zaW9uLWl0ZW0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8L3EtY2FyZD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9xLXZpcnR1YWwtc2Nyb2xsPlxuICA8L2Rpdj5cbiAgPGRpdiBhbGlnbj1cInJpZ2h0XCI+XG4gICAgPHEtYnRuIGNvbG9yPVwicmVkLTZcIiBpY29uPVwiZWRpdFwiIGxhYmVsPVwiQ3JlYXRlXCIgQGNsaWNrPVwic2F2ZVJlcG9ydHNcIiAvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VCYWtlclJlcG9ydHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2Jha2VyLXJlcG9ydFwiO1xuaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IGJha2VyUmVwb3J0U3RvcmUgPSB1c2VCYWtlclJlcG9ydHNTdG9yZSgpO1xuY29uc3QgYmFrZXJSZXBvcnQgPSBjb21wdXRlZCgoKSA9PiBiYWtlclJlcG9ydFN0b3JlLnJlcG9ydHMpO1xuXG5jb25zb2xlLmxvZyhcImJha2VycyByZXBvcnQ6XCIsIGJha2VyUmVwb3J0LnZhbHVlKTtcbmNvbnN0IHJlbW92ZVJlcG9ydHMgPSAoaW5kZXgpID0+IHtcbiAgYmFrZXJSZXBvcnRTdG9yZS5yZW1vdmVSZXBvcnQoaW5kZXgpO1xufTtcblxuY29uc3QgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyID0gKGxvY2F0aW9uKSA9PiB7XG4gIGlmICghbG9jYXRpb24pIHJldHVybiBcIlwiO1xuICByZXR1cm4gbG9jYXRpb25cbiAgICAuc3BsaXQoXCIgXCIpXG4gICAgLm1hcCgod29yZCkgPT4gd29yZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHdvcmQuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSlcbiAgICAuam9pbihcIiBcIik7XG59O1xuXG5jb25zdCBzYXZlUmVwb3J0cyA9IGFzeW5jICgpID0+IHtcbiAgYmFrZXJSZXBvcnRTdG9yZS5jcmVhdGVSZXBvcnRzKCk7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4ubXktY2FyZCB7XG4gIHdpZHRoOiBhdXRvO1xuICBtYXJnaW46IDhweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgYm94LXNoYWRvdzogMCA0cHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnM7XG59XG5cbi5teS1jYXJkOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01cHgpO1xufVxuXG4ubXktZXhwYW5zaW9uLWl0ZW0ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG59XG5cbi5jb250ZW50LXNlY3Rpb24ge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiAjNTU1O1xufVxuXG51bCB7XG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgcGFkZGluZzogMDtcbn1cblxubGkge1xuICBwYWRkaW5nOiA0cHggMDtcbn1cblxuLnJvdyB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4ubXktdmlydHVhbC1zY3JvbGwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBvdmVyZmxvdy14OiBhdXRvO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG4ubXktdmlydHVhbC1zY3JvbGwgLnEtY2FyZCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcbn1cblxuLmNlbnRlcmVkLWNvbnRlbnQge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktY2VudGVyXCI+XG4gICAgPGRpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2IHEtbWEtc21cIj5cbiAgICAgICAgICB7eyBjYXBpdGFsaXplRmlyc3RMZXR0ZXIocmVjaXBlTmFtZSkgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXItc21cIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICBUYXJnZXQgUGNzXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxxLWZpZWxkXG4gICAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICA6bGFiZWw9XCJyZWNpcGU/LnRhcmdldCB8fCAwXCJcbiAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTAwcHg7IG1heC13aWR0aDogMzAwcHg7IG1pbi13aWR0aDogNTBweFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICBBY3R1YWwgVGFyZ2V0XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxxLWZpZWxkXG4gICAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIDpsYWJlbD1cImJha2Vyc1JlcG9ydC5hY3R1YWxfdGFyZ2V0XCJcbiAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTAwcHg7IG1heC13aWR0aDogMzAwcHg7IG1pbi13aWR0aDogNTBweFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLW10LXNtIHEtZ3V0dGVyLXNtXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgU2hvcnRcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHEtZmllbGRcbiAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIDpsYWJlbD1cImJha2Vyc1JlcG9ydC5zaG9ydFwiXG4gICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEwMHB4OyBtYXgtd2lkdGg6IDMwMHB4OyBtaW4td2lkdGg6IDUwcHhcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgT3ZlclxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cS1maWVsZFxuICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICA6bGFiZWw9XCJiYWtlcnNSZXBvcnQub3ZlclwiXG4gICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEwMHB4OyBtYXgtd2lkdGg6IDMwMHB4OyBtaW4td2lkdGg6IDUwcHhcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJxLW1iLW1kXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LXNtXCI+S2lsbzwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIHYtbW9kZWw9XCJiYWtlcnNSZXBvcnQua2lsb1wiXG4gICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwia2dzXCJcbiAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDIxMHB4OyBtYXgtd2lkdGg6IDMwMHB4OyBtaW4td2lkdGg6IDUwcHhcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1tdC1tZCBxLWd1dHRlci1tZFwiPlxuICAgICAgICA8ZGl2IHYtaWY9XCJiYWtlcnNSZXBvcnQuYnJlYWRzLmxlbmd0aFwiPlxuICAgICAgICAgIDxkaXYgdi1mb3I9XCIoYnJlYWQsIGluZGV4KSBpbiBiYWtlcnNSZXBvcnQuYnJlYWRzXCIgOmtleT1cImJyZWFkLmlkXCI+XG4gICAgICAgICAgICA8ZGl2Pnt7IGJyZWFkLmJyZWFkX25hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiYmFrZXJzUmVwb3J0LmJyZWFkc1tpbmRleF0udmFsdWVcIlxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJQY3NcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDIxMHB4OyBtYXgtd2lkdGg6IDMwMHB4OyBtaW4td2lkdGg6IDUwcHhcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1tdC1zbVwiPjwvZGl2PlxuICAgICAgPHEtYnRuXG4gICAgICAgIG91dGxpbmVcbiAgICAgICAgZGVuc2VcbiAgICAgICAgc2l6ZT1cIm1kXCJcbiAgICAgICAgaWNvbj1cImFkZFwiXG4gICAgICAgIGxhYmVsPVwiUmVwb3J0XCJcbiAgICAgICAgY2xhc3M9XCJ0ZXh0LXB1cnBsZVwiXG4gICAgICAgIEBjbGljaz1cImF1dG9GaWxsUmVwb3J0XCJcbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICAgPGRpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2IHEtbXQtc21cIiBhbGlnbj1cImNlbnRlclwiPkluZ3JlZGllbnRzIExpc3Q8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJxLW10LWxnXCI+XG4gICAgICAgIDxxLWZpZWxkXG4gICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDQwMHB4OyBtYXgtd2lkdGg6IDQ1MHB4OyBtaW4td2lkdGg6IDEwMHB4XCJcbiAgICAgICAgPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Y29udHJvbD5cbiAgICAgICAgICAgIDxxLWxpc3QgZGVuc2Ugc2VwYXJhdG9yPlxuICAgICAgICAgICAgICA8cS1pdGVtXG4gICAgICAgICAgICAgICAgdi1mb3I9XCIoaW5ncmVkaWVudCwgaW5kZXgpIGluIG11bHRpcGxpZWRJbmdyZWRpZW50c1wiXG4gICAgICAgICAgICAgICAgOmtleT1cImluZGV4XCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInEtcGEteHMganVzdGlmeS1iZXR3ZWVuXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2xhc3M9XCJpbmdyZWRpZW50LW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgaW5ncmVkaWVudC5jb2RlIH19XG4gICAgICAgICAgICAgICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBzaWRlIGNsYXNzPVwidGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZ3JlZGllbnQtcXVhbnRpdHlcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgaW5ncmVkaWVudC5tdWx0aXBsaWVkUXVhbnRpdHkudG9GaXhlZCgyKSB9fVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gc2lkZSBjbGFzcz1cInRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmdyZWRpZW50LXF1YW50aXR5XCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IGluZ3JlZGllbnQudW5pdCB9fVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICA8L3EtbGlzdD5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3EtZmllbGQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgY29tcHV0ZWQsIHJlZiwgcmVhY3RpdmUsIHdhdGNoIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgdXNlQmFrZXJSZXBvcnRzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9iYWtlci1yZXBvcnRcIjtcblxuY29uc3QgYmFrZXJSZXBvcnRTdG9yZSA9IHVzZUJha2VyUmVwb3J0c1N0b3JlKCk7XG5jb25zdCB1c2VyRGF0YSA9IGNvbXB1dGVkKCgpID0+IGJha2VyUmVwb3J0U3RvcmUudXNlcik7XG4vLyBjb25zb2xlLmxvZyhcImVydzpcIiwgdXNlckRhdGEpO1xuY29uc3QgcmVjaXBlID0gY29tcHV0ZWQoKCkgPT4gYmFrZXJSZXBvcnRTdG9yZS5yZWNpcGVzKTtcbmNvbnNvbGUubG9nKFwiZXJ3ZTpcIiwgcmVjaXBlLnZhbHVlKTtcblxuY29uc3QgcmVjaXBlTmFtZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgbmFtZSA9IHJlY2lwZS52YWx1ZT8ubmFtZSA/PyBcIlJlY2lwZSBOYW1lXCI7XG4gIGNvbnN0IGNhdGVnb3J5ID0gcmVjaXBlLnZhbHVlPy5jYXRlZ29yeSA/PyBcIkNhdGVnb3J5XCI7XG4gIHJldHVybiBgJHtuYW1lfSAtICR7Y2F0ZWdvcnl9YDtcbn0pO1xuXG5jb25zdCBjYXBpdGFsaXplRmlyc3RMZXR0ZXIgPSAobG9jYXRpb24pID0+IHtcbiAgaWYgKCFsb2NhdGlvbikgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBsb2NhdGlvblxuICAgIC5zcGxpdChcIiBcIilcbiAgICAubWFwKCh3b3JkKSA9PiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpKVxuICAgIC5qb2luKFwiIFwiKTtcbn07XG5cbmNvbnN0IGJha2Vyc1JlcG9ydCA9IHJlYWN0aXZlKHtcbiAgdXNlcl9pZDogbnVsbCxcbiAgYnJhbmNoX2lkOiBudWxsLFxuICBicmFuY2hfcmVjaXBlX2lkOiBudWxsLFxuICByZWNpcGVfbmFtZTogXCJcIixcbiAgcmVjaXBlX2NhdGVnb3J5OiBcIlwiLFxuICBraWxvOiBcIlwiLFxuICBzaG9ydDogMCxcbiAgb3ZlcjogMCxcbiAgdGFyZ2V0OiAwLFxuICBhY3R1YWxfdGFyZ2V0OiAwLFxuICBicmVhZHM6IFtdLFxufSk7XG5cbmNvbnN0IHVwZGF0ZUFjdHVhbFRhcmdldCA9ICgpID0+IHtcbiAgY29uc3Qga2lsbyA9IHBhcnNlRmxvYXQoYmFrZXJzUmVwb3J0LmtpbG8pO1xuICBjb25zdCB0YXJnZXQgPSBwYXJzZUZsb2F0KHJlY2lwZS52YWx1ZT8udGFyZ2V0KTtcbiAgaWYgKCFpc05hTihraWxvKSAmJiAhaXNOYU4odGFyZ2V0KSkge1xuICAgIGJha2Vyc1JlcG9ydC5hY3R1YWxfdGFyZ2V0ID0ga2lsbyAqIHRhcmdldDtcbiAgfSBlbHNlIHtcbiAgICBiYWtlcnNSZXBvcnQuYWN0dWFsX3RhcmdldCA9IDA7XG4gIH1cbn07XG5cbmNvbnN0IGNhbGN1bGF0ZVNob3J0QW5kT3ZlciA9ICgpID0+IHtcbiAgY29uc3QgdG90YWxCcmVhZFBjcyA9IGJha2Vyc1JlcG9ydC5icmVhZHMucmVkdWNlKFxuICAgICh0b3RhbCwgYnJlYWQpID0+IHRvdGFsICsgKHBhcnNlRmxvYXQoYnJlYWQudmFsdWUpIHx8IDApLFxuICAgIDBcbiAgKTtcbiAgY29uc3QgZGlmZmVyZW5jZSA9IHRvdGFsQnJlYWRQY3MgLSBiYWtlcnNSZXBvcnQuYWN0dWFsX3RhcmdldDtcblxuICBpZiAoZGlmZmVyZW5jZSA+IDApIHtcbiAgICBiYWtlcnNSZXBvcnQub3ZlciA9IGRpZmZlcmVuY2U7XG4gICAgYmFrZXJzUmVwb3J0LnNob3J0ID0gMDtcbiAgfSBlbHNlIGlmIChkaWZmZXJlbmNlIDwgMCkge1xuICAgIGJha2Vyc1JlcG9ydC5zaG9ydCA9IE1hdGguYWJzKGRpZmZlcmVuY2UpO1xuICAgIGJha2Vyc1JlcG9ydC5vdmVyID0gMDtcbiAgfSBlbHNlIHtcbiAgICBiYWtlcnNSZXBvcnQuc2hvcnQgPSAwO1xuICAgIGJha2Vyc1JlcG9ydC5vdmVyID0gMDtcbiAgfVxufTtcblxuY29uc3QgYXV0b0ZpbGxSZXBvcnQgPSAoKSA9PiB7XG4gIGJha2Vyc1JlcG9ydC51c2VyX2lkID0gdXNlckRhdGEudmFsdWU/LmRhdGEuaWQgfHwgXCJcIjtcbiAgYmFrZXJzUmVwb3J0LmJyYW5jaF9pZCA9XG4gICAgdXNlckRhdGEudmFsdWU/LmRhdGE/LmVtcGxveWVlPy5icmFuY2hfZW1wbG95ZWUuYnJhbmNoX2lkIHx8IFwiXCI7XG4gIGJha2Vyc1JlcG9ydC5icmFuY2hfcmVjaXBlX2lkID0gcmVjaXBlLnZhbHVlPy5pZCB8fCBcIlwiO1xuICBiYWtlcnNSZXBvcnQucmVjaXBlX25hbWUgPSByZWNpcGUudmFsdWU/Lm5hbWUgfHwgXCJcIjtcbiAgYmFrZXJzUmVwb3J0LnRhcmdldCA9IHJlY2lwZS52YWx1ZT8udGFyZ2V0IHx8IFwiXCI7XG4gIGJha2Vyc1JlcG9ydC5yZWNpcGVfY2F0ZWdvcnkgPSByZWNpcGUudmFsdWU/LmNhdGVnb3J5IHx8IFwiXCI7XG4gIGNvbnN0IHJlcG9ydERhdGEgPSB7XG4gICAgdXNlcl9pZDogYmFrZXJzUmVwb3J0LnVzZXJfaWQsXG4gICAgYnJhbmNoX2lkOiBiYWtlcnNSZXBvcnQuYnJhbmNoX2lkLFxuICAgIGJyYW5jaF9yZWNpcGVfaWQ6IGJha2Vyc1JlcG9ydC5icmFuY2hfcmVjaXBlX2lkLFxuICAgIHJlY2lwZV9uYW1lOiBiYWtlcnNSZXBvcnQucmVjaXBlX25hbWUsXG4gICAgcmVjaXBlX2NhdGVnb3J5OiBiYWtlcnNSZXBvcnQucmVjaXBlX2NhdGVnb3J5LFxuICAgIHN0YXR1czogXCJwZW5kaW5nXCIsXG4gICAga2lsbzogYmFrZXJzUmVwb3J0LmtpbG8sXG4gICAgc2hvcnQ6IGJha2Vyc1JlcG9ydC5zaG9ydCxcbiAgICBvdmVyOiBiYWtlcnNSZXBvcnQub3ZlcixcbiAgICB0YXJnZXQ6IGJha2Vyc1JlcG9ydC50YXJnZXQsXG4gICAgYWN0dWFsX3RhcmdldDogYmFrZXJzUmVwb3J0LmFjdHVhbF90YXJnZXQsXG4gICAgYnJlYWRzOiBiYWtlcnNSZXBvcnQuYnJlYWRzLm1hcCgoYnJlYWQpID0+ICh7XG4gICAgICBicmVhZF9pZDogYnJlYWQuaWQsXG4gICAgICBicmVhZF9uYW1lOiBicmVhZC5icmVhZF9uYW1lLFxuICAgICAgYnJlYWRfcHJvZHVjdGlvbjogcGFyc2VJbnQoYnJlYWQudmFsdWUsIDEwKSxcbiAgICB9KSksXG4gICAgaW5ncmVkaWVudHM6IG11bHRpcGxpZWRJbmdyZWRpZW50cy52YWx1ZS5tYXAoKGluZ3JlZGllbnQpID0+ICh7XG4gICAgICBpbmdyZWRpZW50c19pZDogaW5ncmVkaWVudC5yYXdfbWF0ZXJpYWxzX2lkLFxuICAgICAgY29kZTogaW5ncmVkaWVudC5jb2RlLFxuICAgICAgcXVhbnRpdHk6IGluZ3JlZGllbnQubXVsdGlwbGllZFF1YW50aXR5LFxuICAgICAgdW5pdDogaW5ncmVkaWVudC51bml0LFxuICAgIH0pKSxcbiAgfTtcblxuICBjb25zb2xlLmxvZyhcInJlcG9ydHNzc3MgZEFUQTpcIiwgcmVwb3J0RGF0YSk7XG4gIGJha2VyUmVwb3J0U3RvcmUuc2V0UmVwb3J0KHJlcG9ydERhdGEpO1xuICBjb25zb2xlLmxvZyhcIlJlcG9ydCBkYXRhIHNldCB0byBzdG9yZTpcIiwgYmFrZXJSZXBvcnRTdG9yZS5yZXBvcnRzKTtcbiAgcmVzZXRSZXBvcnRGb3JtKCk7XG59O1xuXG5jb25zdCByZXNldFJlcG9ydEZvcm0gPSAoKSA9PiB7XG4gIHJlY2lwZS52YWx1ZSA9IFwiXCI7XG4gIHJlY2lwZU5hbWUudmFsdWUgPSBcIlwiO1xuICBiYWtlcnNSZXBvcnQucmVjaXBlX25hbWUgPSBcIlwiO1xuICBiYWtlcnNSZXBvcnQua2lsbyA9IFwiXCI7XG4gIGJha2Vyc1JlcG9ydC5zaG9ydCA9IDA7XG4gIGJha2Vyc1JlcG9ydC5vdmVyID0gMDtcbiAgYmFrZXJzUmVwb3J0LnRhcmdldCA9IDA7XG4gIGJha2Vyc1JlcG9ydC5hY3R1YWxfdGFyZ2V0ID0gMDtcbiAgYmFrZXJzUmVwb3J0LmJyZWFkcyA9XG4gICAgcmVjaXBlLnZhbHVlPy5icmVhZF9ncm91cHM/Lm1hcCgoZ3JvdXApID0+ICh7XG4gICAgICBpZDogZ3JvdXAucHJvZHVjdF9pZCxcbiAgICAgIGJyZWFkX25hbWU6IGdyb3VwLmJyZWFkX25hbWUsXG4gICAgICB2YWx1ZTogXCJcIiwgLy8gSW5pdGlhbGl6ZSB2YWx1ZSBhcyBhbiBlbXB0eSBzdHJpbmdcbiAgICB9KSkgfHwgW107XG59O1xuXG5jb25zdCBtdWx0aXBsaWVkSW5ncmVkaWVudHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IGtpbG8gPSBwYXJzZUludChiYWtlcnNSZXBvcnQua2lsbykgfHwgMTtcbiAgcmV0dXJuIChyZWNpcGUudmFsdWU/LmluZ3JlZGllbnRzIHx8IFtdKS5tYXAoKGluZ3JlZGllbnQpID0+IHtcbiAgICBjb25zdCBxdWFudGl0eSA9IHBhcnNlSW50KGluZ3JlZGllbnQucXVhbnRpdHkpO1xuICAgIGNvbnN0IG11bHRpcGxpZWRRdWFudGl0eSA9XG4gICAgICAhaXNOYU4oa2lsbykgJiYgIWlzTmFOKHF1YW50aXR5KSA/IGtpbG8gKiBxdWFudGl0eSA6IDA7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmluZ3JlZGllbnQsXG4gICAgICBtdWx0aXBsaWVkUXVhbnRpdHksXG4gICAgfTtcbiAgfSk7XG59KTtcblxud2F0Y2goXG4gICgpID0+IGJha2Vyc1JlcG9ydC5raWxvLFxuICAoKSA9PiB7XG4gICAgdXBkYXRlQWN0dWFsVGFyZ2V0KCk7XG4gICAgY2FsY3VsYXRlU2hvcnRBbmRPdmVyKCk7XG4gIH1cbik7XG5cbndhdGNoKFxuICAoKSA9PiByZWNpcGUudmFsdWU/LmluZ3JlZGllbnRzLFxuICAoKSA9PiB7XG4gICAgY2FsY3VsYXRlU2hvcnRBbmRPdmVyKCk7XG4gIH0sXG4gIHsgZGVlcDogdHJ1ZSB9XG4pO1xuXG53YXRjaChcbiAgKCkgPT4gYmFrZXJzUmVwb3J0LmJyZWFkcy5tYXAoKGJyZWFkKSA9PiBicmVhZC52YWx1ZSksXG4gIGNhbGN1bGF0ZVNob3J0QW5kT3ZlcixcbiAgeyBkZWVwOiB0cnVlIH1cbik7XG5cbndhdGNoKFxuICAoKSA9PiByZWNpcGUudmFsdWU/LmJyZWFkX2dyb3VwcyxcbiAgKCkgPT4ge1xuICAgIGJha2Vyc1JlcG9ydC5icmVhZHMgPVxuICAgICAgcmVjaXBlLnZhbHVlPy5icmVhZF9ncm91cHMubWFwKChncm91cCkgPT4gKHtcbiAgICAgICAgaWQ6IGdyb3VwLnByb2R1Y3RfaWQsXG4gICAgICAgIGJyZWFkX25hbWU6IGdyb3VwLmJyZWFkX25hbWUsXG4gICAgICAgIHZhbHVlOiBcIlwiLFxuICAgICAgfSkpIHx8IFtdO1xuICAgIGNhbGN1bGF0ZVNob3J0QW5kT3ZlcigpO1xuICB9XG4pO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5xLWZpZWxkIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5xLWl0ZW0tc2VjdGlvbiB7XG4gIGZsZXg6IDE7XG59XG5cbi5pbmdyZWRpZW50LW5hbWUge1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmluZ3JlZGllbnQtcXVhbnRpdHkge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWlucHV0XG4gICAgdi1tb2RlbD1cInNlYXJjaFF1ZXJ5XCJcbiAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwic2VhcmNoXCJcbiAgICBkZWJvdW5jZT1cIjEwMDBcIlxuICAgIG91dGxpbmVkXG4gICAgcm91bmRlZFxuICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIHByb2R1Y3RcIlxuICAgIGRlbnNlXG4gID5cbiAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxxLWljb24gbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L3RlbXBsYXRlPlxuICAgIDxkaXYgdi1pZj1cInNlYXJjaFF1ZXJ5XCIgY2xhc3M9XCJjdXN0b20tbGlzdCB6LXRvcFwiPlxuICAgICAgPHEtY2FyZD5cbiAgICAgICAgPHEtbGlzdCBzZXBhcmF0b3I+XG4gICAgICAgICAgPHEtaXRlbSB2LWlmPVwiIWJyYW5oUmVjaXBlcz8ubGVuZ3RoXCI+IE5vIHJlY29yZCBmb3VuZC4gPC9xLWl0ZW0+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICAgIDxxLWl0ZW1cbiAgICAgICAgICAgICAgQGNsaWNrPVwiYXV0b0ZpbGxSZWNpcGUoYnJhbmNoUmVjaXBlKVwiXG4gICAgICAgICAgICAgIHYtZm9yPVwiYnJhbmNoUmVjaXBlIGluIGJyYW5oUmVjaXBlc1wiXG4gICAgICAgICAgICAgIDprZXk9XCJicmFuY2hSZWNpcGUuaWRcIlxuICAgICAgICAgICAgICBjbGlja2FibGVcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+e3tcbiAgICAgICAgICAgICAgICAgIGNhcGl0YWxpemVGaXJzdExldHRlcihicmFuY2hSZWNpcGU/Lm5hbWUpXG4gICAgICAgICAgICAgICAgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgc2lkZT57eyBicmFuY2hSZWNpcGU/LmNhdGVnb3J5IH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3EtbGlzdD5cbiAgICAgIDwvcS1jYXJkPlxuICAgIDwvZGl2PlxuICA8L3EtaW5wdXQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmLCB3YXRjaCwgY29tcHV0ZWQsIHJlYWN0aXZlIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgdXNlQnJhbmNoUmVjaXBlU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9icmFuY2gtcmVjaXBlXCI7XG5pbXBvcnQgeyB1c2VCYWtlclJlcG9ydHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2Jha2VyLXJlcG9ydFwiO1xuXG5jb25zdCBiYWtlclJlcG9ydHMgPSB1c2VCYWtlclJlcG9ydHNTdG9yZSgpO1xuY29uc3Qgc2VhcmNoUXVlcnkgPSByZWYoXCJcIik7XG5jb25zdCBiYWtlclJlcG9ydFN0b3JlID0gdXNlQmFrZXJSZXBvcnRzU3RvcmUoKTtcbmNvbnN0IGJyYW5jaFJlY2lwZVN0b3JlID0gdXNlQnJhbmNoUmVjaXBlU3RvcmUoKTtcbmNvbnN0IHVzZXJEYXRhID0gY29tcHV0ZWQoKCkgPT4gYmFrZXJSZXBvcnRTdG9yZS51c2VyKTtcbmNvbnNvbGUubG9nKFwiZXJ3OlwiLCB1c2VyRGF0YS52YWx1ZSk7XG5jb25zdCBicmFuaFJlY2lwZXMgPSBjb21wdXRlZCgoKSA9PiBicmFuY2hSZWNpcGVTdG9yZS5icmFuY2hSZWNpcGUpO1xuY29uc3QgYnJhbmNoX2lkID1cbiAgdXNlckRhdGEudmFsdWU/LmRhdGE/LmVtcGxveWVlPy5icmFuY2hfZW1wbG95ZWUuYnJhbmNoX2lkIHx8IFwiXCI7XG5jb25zb2xlLmxvZyhcImJyYW5jaF9pZFwiLCBicmFuY2hfaWQpO1xuY29uc3Qgc2VhcmNoID0gYXN5bmMgKCkgPT4ge1xuICBicmFuY2hSZWNpcGVTdG9yZS5zZWFyY2hCcmFuY2hSZWNpcGUoc2VhcmNoUXVlcnkudmFsdWUsIGJyYW5jaF9pZCk7XG4gIGNvbnNvbGUubG9nKFwic2VhcmNoUXVlcnkudmFsdWVcIiwgc2VhcmNoUXVlcnkudmFsdWUpO1xuICBjb25zb2xlLmxvZyhcImJyYW5jaF9pZFwiLCBicmFuY2hfaWQpO1xufTtcbi8vIHdhdGNoKHNlYXJjaFF1ZXJ5LCAobmV3UXVlcnkpID0+IHtcbi8vXG5jb25zdCBhdXRvRmlsbFJlY2lwZSA9IChyZWNpcGUpID0+IHtcbiAgY29uc29sZS5sb2coXCJicmFuY2ggcmVjaXBlXCIsIHJlY2lwZSk7XG4gIGJha2VyUmVwb3J0cy5zZXRSZWNpcGUocmVjaXBlKTtcbiAgc2VhcmNoUXVlcnkudmFsdWUgPSBcIlwiO1xufTtcbmNvbnN0IGNhcGl0YWxpemVGaXJzdExldHRlciA9IChsb2NhdGlvbikgPT4ge1xuICBpZiAoIWxvY2F0aW9uKSByZXR1cm4gXCJcIjtcbiAgcmV0dXJuIGxvY2F0aW9uXG4gICAgLnNwbGl0KFwiIFwiKVxuICAgIC5tYXAoKHdvcmQpID0+IHdvcmQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB3b3JkLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkpXG4gICAgLmpvaW4oXCIgXCIpO1xufTtcblxuY29uc29sZS5sb2coXCJyZWNpcGVzc3NzXCIsIGJyYW5oUmVjaXBlcy52YWx1ZSk7XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPHEtY2FyZCBmbGF0PlxuICAgICAgPCEtLSB7eyByZXBvcnQuXG4gICAgICAgfX0gLS0+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2IHRleHQtZGFyayByb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxxLWJ0biBvdXRsaW5lIGZsYXQgaWNvbj1cImFycm93X2JhY2tcIiBAY2xpY2s9XCJnb0JhY2tcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxxLXNwYWNlIC8+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDwhLS0gPHEtaWNvbiBuYW1lPVwiZmEtc29saWQgZmEtc3RvcmVcIiAvPiAtLT5cbiAgICAgICAgICAgIEJha2VycyBSZXBvcnRcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgPEJha2Vyc1JlcG9ydFNlYXJjaCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPFJlcG9ydFNlYXJjaCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXktbWRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPFJlcG9ydFJlY2lwZUlucHV0IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiY29sXCI+XG4gICAgICAgICAgICA8UmVwb3J0UmF3TWF0ZXJpYWxzTGlzdCAvPlxuICAgICAgICAgIDwvZGl2PiAtLT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXIteS1tZFwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8UmVwb3J0Q29udGVudENvbXBvbmVudCAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8IS0tIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPGRpdiBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICAgICAgPFJlcG9ydENyZWF0ZUNvbXBvbmVudCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+IC0tPlxuICAgIDwvcS1jYXJkPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwidnVlLXJvdXRlclwiO1xuaW1wb3J0IFJlcG9ydENvbnRlbnRDb21wb25lbnQgZnJvbSBcIi4vY29tcG9uZW50cy9SZXBvcnRMaXN0Q29tcG9uZW50LnZ1ZVwiO1xuaW1wb3J0IFJlcG9ydFJlY2lwZUlucHV0IGZyb20gXCIuL2NvbXBvbmVudHMvUmVwb3J0UmVjaXBlSW5wdXRDb21wb25lbnQudnVlXCI7XG5pbXBvcnQgUmVwb3J0U2VhcmNoIGZyb20gXCIuL2NvbXBvbmVudHMvUmVwb3J0U2VhcmNoQ29tcG9uZW50LnZ1ZVwiO1xuLy8gaW1wb3J0IFJlcG9ydFJhd01hdGVyaWFsc0xpc3QgZnJvbSBcIi4vY29tcG9uZW50cy9SZXBvcnRSYXdNYXRlcmlhbHNMaXN0Q29tcG9uZW50LnZ1ZVwiO1xuLy8gaW1wb3J0IFJlcG9ydENyZWF0ZUNvbXBvbmVudCBmcm9tIFwiLi9jb21wb25lbnRzL1JlcG9ydENyZWF0ZUNvbXBvbmVudC52dWVcIjtcbmltcG9ydCB7IHVzZUJha2VyUmVwb3J0c1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvYmFrZXItcmVwb3J0XCI7XG5pbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5jb25zdCBiYWtlclJlcG9ydCA9IHVzZUJha2VyUmVwb3J0c1N0b3JlKCk7XG5jb25zdCByZXBvcnQgPSBjb21wdXRlZCgoKSA9PiBiYWtlclJlcG9ydC5yZWNpcGVzKTtcblxuY29uc29sZS5sb2coXCJyZXBvcnRcIiwgcmVwb3J0KTtcbmNvbnN0IGdvQmFjayA9ICgpID0+IHtcbiAgYmFrZXJSZXBvcnQuY2xlYXJEYXRhKCk7IC8vIENsZWFyIHRoZSBkYXRhIGluIHRoZSBzdG9yZVxuICByb3V0ZXIucHVzaChcIi9icmFuY2gvYmFrZXIvcmVwb3J0XCIpOyAvLyBOYXZpZ2F0ZSBiYWNrXG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD48L3N0eWxlPlxuIl0sIm5hbWVzIjpbInNob3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBbUJBLE1BQU0sYUFBYSxnQkFBZ0IsRUFBRTtBQUNyQyxNQUFNLGFBQWEsT0FBTyxLQUFLLGtCQUFrQjtBQUVqRCxJQUFBLGlCQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUNILEdBQUc7QUFBQSxJQUNILEdBQUc7QUFBQSxJQUVILE1BQU07QUFBQSxJQUVOLE9BQU87QUFBQSxJQUNQLFlBQVksQ0FBRSxRQUFRLE1BQVE7QUFBQSxJQUU5QixTQUFTO0FBQUEsSUFDVCxjQUFjLENBQUUsUUFBUSxNQUFRO0FBQUEsSUFFaEMsT0FBTztBQUFBLElBRVAsaUJBQWlCO0FBQUEsSUFDakIsWUFBWTtBQUFBLElBQ1osY0FBYztBQUFBLElBQ2QsaUJBQWlCLENBQUUsT0FBTyxRQUFRLE1BQVE7QUFBQSxJQUMxQyxVQUFVLENBQUU7QUFBQSxJQUVaLGtCQUFrQjtBQUFBLElBQ2xCLG1CQUFtQjtBQUFBLElBRW5CLGlCQUFpQjtBQUFBLElBQ2pCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLGFBQWE7QUFBQSxJQUNiLE9BQU87QUFBQSxJQUNQLE9BQU87QUFBQSxJQUVQLGFBQWEsQ0FBRSxPQUFP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
