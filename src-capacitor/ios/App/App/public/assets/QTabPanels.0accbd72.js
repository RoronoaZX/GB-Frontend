import { i as inject, f as emptyRenderFn, n as ref, g as computed, A as onBeforeUnmount, z as onMounted, bg as tabsKey, af as withDirectives, ba as Ripple, h, V as stopAndPrevent, ak as isKeyCode, aX as shouldIgnoreKey, L as QIcon, x as hMergeSlot, k as getCurrentInstance, aS as isDeepEqual, bh as uid, e as createComponent, ax as useTick, ac as useTimeout, u as watch, m as provide, S as onDeactivated, T as onActivated, j as hSlot, a9 as useDarkProps, ab as useDark, ag as hDir } from "./index.9b9dbcba.js";
import { Q as QResizeObserver } from "./QResizeObserver.5792a751.js";
import { r as rtlHasScrollBug } from "./rtl.276c3f1b.js";
import { u as usePanelChildProps, a as usePanelProps, b as usePanelEmits, c as usePanel } from "./use-panel.0a5ffe4f.js";
let id = 0;
const useTabEmits = ["click", "keydown"];
const useTabProps = {
  icon: String,
  label: [Number, String],
  alert: [Boolean, String],
  alertIcon: String,
  name: {
    type: [Number, String],
    default: () => `t_${id++}`
  },
  noCaps: Boolean,
  tabindex: [String, Number],
  disable: Boolean,
  contentClass: String,
  ripple: {
    type: [Boolean, Object],
    default: true
  }
};
function useTab(props, slots, emit, routeData) {
  const $tabs = inject(tabsKey, emptyRenderFn);
  if ($tabs === emptyRenderFn) {
    console.error("QTab/QRouteTab component needs to be child of QTabs");
    return emptyRenderFn;
  }
  const { proxy } = getCurrentInstance();
  const blurTargetRef = ref(null);
  const rootRef = ref(null);
  const tabIndicatorRef = ref(null);
  const ripple = computed(() => props.disable === true || props.ripple === false ? false : Object.assign(
    { keyCodes: [13, 32], early: true },
    props.ripple === true ? {} : props.ripple
  ));
  const isActive = computed(() => $tabs.currentModel.value === props.name);
  const classes = computed(
    () => "q-tab relative-position self-stretch flex flex-center text-center" + (isActive.value === true ? " q-tab--active" + ($tabs.tabProps.value.activeClass ? " " + $tabs.tabProps.value.activeClass : "") + ($tabs.tabProps.value.activeColor ? ` text-${$tabs.tabProps.value.activeColor}` : "") + ($tabs.tabProps.value.activeBgColor ? ` bg-${$tabs.tabProps.value.activeBgColor}` : "") : " q-tab--inactive") + (props.icon && props.label && $tabs.tabProps.value.inlineLabel === false ? " q-tab--full" : "") + (props.noCaps === true || $tabs.tabProps.value.noCaps === true ? " q-tab--no-caps" : "") + (props.disable === true ? " disabled" : " q-focusable q-hoverable cursor-pointer") + (routeData !== void 0 ? routeData.linkClass.value : "")
  );
  const innerClass = computed(
    () => "q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable " + ($tabs.tabProps.value.inlineLabel === true ? "row no-wrap q-tab__content--inline" : "column") + (props.contentClass !== void 0 ? ` ${props.contentClass}` : "")
  );
  const tabIndex = computed(() => props.disable === true || $tabs.hasFocus.value === true || isActive.value === false && $tabs.hasActiveTab.value === true ? -1 : props.tabindex || 0);
  function onClick(e, keyboard) {
    if (keyboard !== true && blurTargetRef.value !== null) {
      blurTargetRef.value.focus();
    }
    if (props.disable === true) {
      if (routeData !== void 0 && routeData.hasRouterLink.value === true) {
        stopAndPrevent(e);
      }
      return;
    }
    if (routeData === void 0) {
      $tabs.updateModel({ name: props.name });
      emit("click", e);
      return;
    }
    if (routeData.hasRouterLink.value === true) {
      const go = (opts = {}) => {
        let hardError;
        const reqId = opts.to === void 0 || isDeepEqual(opts.to, props.to) === true ? $tabs.avoidRouteWatcher = uid() : null;
        return routeData.navigateToRouterLink(e, { ...opts, returnRouterError: true }).catch((err) => {
          hardError = err;
        }).then((softError) => {
          if (reqId === $tabs.avoidRouteWatcher) {
            $tabs.avoidRouteWatcher = false;
            if (hardError === void 0 && (softError === void 0 || softError.message !== void 0 && softError.message.startsWith("Avoided redundant navigation") === true)) {
              $tabs.updateModel({ name: props.name });
            }
          }
          if (opts.returnRouterError === true) {
            return hardError !== void 0 ? Promise.reject(hardError) : softError;
          }
        });
      };
      emit("click", e, go);
      e.defaultPrevented !== true && go();
      return;
    }
    emit("click", e);
  }
  function onKeydown(e) {
    if (isKeyCode(e, [13, 32])) {
      onClick(e, true);
    } else if (shouldIgnoreKey(e) !== true && e.keyCode >= 35 && e.keyCode <= 40 && e.altKey !== true && e.metaKey !== true) {
      $tabs.onKbdNavigate(e.keyCode, proxy.$el) === true && stopAndPrevent(e);
    }
    emit("keydown", e);
  }
  function getContent() {
    const narrow = $tabs.tabProps.value.narrowIndicator, content = [], indicator = h("div", {
      ref: tabIndicatorRef,
      class: [
        "q-tab__indicator",
        $tabs.tabProps.value.indicatorClass
      ]
    });
    props.icon !== void 0 && content.push(
      h(QIcon, {
        class: "q-tab__icon",
        name: props.icon
      })
    );
    props.label !== void 0 && content.push(
      h("div", { class: "q-tab__label" }, props.label)
    );
    props.alert !== false && content.push(
      props.alertIcon !== void 0 ? h(QIcon, {
        class: "q-tab__alert-icon",
        color: props.alert !== true ? props.alert : void 0,
        name: props.alertIcon
      }) : h("div", {
        class: "q-tab__alert" + (props.alert !== true ? ` text-${props.alert}` : "")
      })
    );
    narrow === true && content.push(indicator);
    const node = [
      h("div", { class: "q-focus-helper", tabindex: -1, ref: blurTargetRef }),
      h("div", { class: innerClass.value }, hMergeSlot(slots.default, content))
    ];
    narrow === false && node.push(indicator);
    return node;
  }
  const tabData = {
    name: computed(() => props.name),
    rootRef,
    tabIndicatorRef,
    routeData
  };
  onBeforeUnmount(() => {
    $tabs.unregisterTab(tabData);
  });
  onMounted(() => {
    $tabs.registerTab(tabData);
  });
  function renderTab(tag, customData) {
    const data = {
      ref: rootRef,
      class: classes.value,
      tabindex: tabIndex.value,
      role: "tab",
      "aria-selected": isActive.value === true ? "true" : "false",
      "aria-disabled": props.disable === true ? "true" : void 0,
      onClick,
      onKeydown,
      ...customData
    };
    return withDirectives(
      h(tag, data, getContent()),
      [[Ripple, ripple.value]]
    );
  }
  return { renderTab, $tabs };
}
var QTab = createComponent({
  name: "QTab",
  props: useTabProps,
  emits: useTabEmits,
  setup(props, { slots, emit }) {
    const { renderTab } = useTab(props, slots, emit);
    return () => renderTab("div");
  }
});
function getIndicatorClass(color, top, vertical) {
  const pos = vertical === true ? ["left", "right"] : ["top", "bottom"];
  return `absolute-${top === true ? pos[0] : pos[1]}${color ? ` text-${color}` : ""}`;
}
const alignValues = ["left", "center", "right", "justify"];
var QTabs = createComponent({
  name: "QTabs",
  props: {
    modelValue: [Number, String],
    align: {
      type: String,
      default: "center",
      validator: (v) => alignValues.includes(v)
    },
    breakpoint: {
      type: [String, Number],
      default: 600
    },
    vertical: Boolean,
    shrink: Boolean,
    stretch: Boolean,
    activeClass: String,
    activeColor: String,
    activeBgColor: String,
    indicatorColor: String,
    leftIcon: String,
    rightIcon: String,
    outsideArrows: Boolean,
    mobileArrows: Boolean,
    switchIndicator: Boolean,
    narrowIndicator: Boolean,
    inlineLabel: Boolean,
    noCaps: Boolean,
    dense: Boolean,
    contentClass: String,
    "onUpdate:modelValue": [Function, Array]
  },
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const { registerTick: registerScrollTick } = useTick();
    const { registerTick: registerUpdateArrowsTick } = useTick();
    const { registerTick: registerAnimateTick } = useTick();
    const { registerTimeout: registerFocusTimeout, removeTimeout: removeFocusTimeout } = useTimeout();
    const { registerTimeout: registerScrollToTabTimeout, removeTimeout: removeScrollToTabTimeout } = useTimeout();
    const rootRef = ref(null);
    const contentRef = ref(null);
    const currentModel = ref(props.modelValue);
    const scrollable = ref(false);
    const leftArrow = ref(true);
    const rightArrow = ref(false);
    const justify = ref(false);
    const tabDataList = [];
    const tabDataListLen = ref(0);
    const hasFocus = ref(false);
    let animateTimer = null, scrollTimer = null, unwatchRoute;
    const tabProps = computed(() => ({
      activeClass: props.activeClass,
      activeColor: props.activeColor,
      activeBgColor: props.activeBgColor,
      indicatorClass: getIndicatorClass(
        props.indicatorColor,
        props.switchIndicator,
        props.vertical
      ),
      narrowIndicator: props.narrowIndicator,
      inlineLabel: props.inlineLabel,
      noCaps: props.noCaps
    }));
    const hasActiveTab = computed(() => {
      const len = tabDataListLen.value;
      const val = currentModel.value;
      for (let i = 0; i < len; i++) {
        if (tabDataList[i].name.value === val) {
          return true;
        }
      }
      return false;
    });
    const alignClass = computed(() => {
      const align = scrollable.value === true ? "left" : justify.value === true ? "justify" : props.align;
      return `q-tabs__content--align-${align}`;
    });
    const classes = computed(
      () => `q-tabs row no-wrap items-center q-tabs--${scrollable.value === true ? "" : "not-"}scrollable q-tabs--${props.vertical === true ? "vertical" : "horizontal"} q-tabs__arrows--${props.outsideArrows === true ? "outside" : "inside"} q-tabs--mobile-with${props.mobileArrows === true ? "" : "out"}-arrows` + (props.dense === true ? " q-tabs--dense" : "") + (props.shrink === true ? " col-shrink" : "") + (props.stretch === true ? " self-stretch" : "")
    );
    const innerClass = computed(
      () => "q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position " + alignClass.value + (props.contentClass !== void 0 ? ` ${props.contentClass}` : "")
    );
    const domProps = computed(() => props.vertical === true ? { container: "height", content: "offsetHeight", scroll: "scrollHeight" } : { container: "width", content: "offsetWidth", scroll: "scrollWidth" });
    const isRTL = computed(() => props.vertical !== true && $q.lang.rtl === true);
    const rtlPosCorrection = computed(() => rtlHasScrollBug === false && isRTL.value === true);
    watch(isRTL, updateArrows);
    watch(() => props.modelValue, (name) => {
      updateModel({ name, setCurrent: true, skipEmit: true });
    });
    watch(() => props.outsideArrows, recalculateScroll);
    function updateModel({ name, setCurrent, skipEmit }) {
      if (currentModel.value !== name) {
        if (skipEmit !== true && props["onUpdate:modelValue"] !== void 0) {
          emit("update:modelValue", name);
        }
        if (setCurrent === true || props["onUpdate:modelValue"] === void 0) {
          animate(currentModel.value, name);
          currentModel.value = name;
        }
      }
    }
    function recalculateScroll() {
      registerScrollTick(() => {
        updateContainer({
          width: rootRef.value.offsetWidth,
          height: rootRef.value.offsetHeight
        });
      });
    }
    function updateContainer(domSize) {
      if (domProps.value === void 0 || contentRef.value === null)
        return;
      const size = domSize[domProps.value.container], scrollSize = Math.min(
        contentRef.value[domProps.value.scroll],
        Array.prototype.reduce.call(
          contentRef.value.children,
          (acc, el) => acc + (el[domProps.value.content] || 0),
          0
        )
      ), scroll = size > 0 && scrollSize > size;
      scrollable.value = scroll;
      scroll === true && registerUpdateArrowsTick(updateArrows);
      justify.value = size < parseInt(props.breakpoint, 10);
    }
    function animate(oldName, newName) {
      const oldTab = oldName !== void 0 && oldName !== null && oldName !== "" ? tabDataList.find((tab) => tab.name.value === oldName) : null, newTab = newName !== void 0 && newName !== null && newName !== "" ? tabDataList.find((tab) => tab.name.value === newName) : null;
      if (oldTab && newTab) {
        const oldEl = oldTab.tabIndicatorRef.value, newEl = newTab.tabIndicatorRef.value;
        if (animateTimer !== null) {
          clearTimeout(animateTimer);
          animateTimer = null;
        }
        oldEl.style.transition = "none";
        oldEl.style.transform = "none";
        newEl.style.transition = "none";
        newEl.style.transform = "none";
        const oldPos = oldEl.getBoundingClientRect(), newPos = newEl.getBoundingClientRect();
        newEl.style.transform = props.vertical === true ? `translate3d(0,${oldPos.top - newPos.top}px,0) scale3d(1,${newPos.height ? oldPos.height / newPos.height : 1},1)` : `translate3d(${oldPos.left - newPos.left}px,0,0) scale3d(${newPos.width ? oldPos.width / newPos.width : 1},1,1)`;
        registerAnimateTick(() => {
          animateTimer = setTimeout(() => {
            animateTimer = null;
            newEl.style.transition = "transform .25s cubic-bezier(.4, 0, .2, 1)";
            newEl.style.transform = "none";
          }, 70);
        });
      }
      if (newTab && scrollable.value === true) {
        scrollToTabEl(newTab.rootRef.value);
      }
    }
    function scrollToTabEl(el) {
      const { left, width, top, height } = contentRef.value.getBoundingClientRect(), newPos = el.getBoundingClientRect();
      let offset = props.vertical === true ? newPos.top - top : newPos.left - left;
      if (offset < 0) {
        contentRef.value[props.vertical === true ? "scrollTop" : "scrollLeft"] += Math.floor(offset);
        updateArrows();
        return;
      }
      offset += props.vertical === true ? newPos.height - height : newPos.width - width;
      if (offset > 0) {
        contentRef.value[props.vertical === true ? "scrollTop" : "scrollLeft"] += Math.ceil(offset);
        updateArrows();
      }
    }
    function updateArrows() {
      const content = contentRef.value;
      if (content === null)
        return;
      const rect = content.getBoundingClientRect(), pos = props.vertical === true ? content.scrollTop : Math.abs(content.scrollLeft);
      if (isRTL.value === true) {
        leftArrow.value = Math.ceil(pos + rect.width) < content.scrollWidth - 1;
        rightArrow.value = pos > 0;
      } else {
        leftArrow.value = pos > 0;
        rightArrow.value = props.vertical === true ? Math.ceil(pos + rect.height) < content.scrollHeight : Math.ceil(pos + rect.width) < content.scrollWidth;
      }
    }
    function animScrollTo(value) {
      scrollTimer !== null && clearInterval(scrollTimer);
      scrollTimer = setInterval(() => {
        if (scrollTowards(value) === true) {
          stopAnimScroll();
        }
      }, 5);
    }
    function scrollToStart() {
      animScrollTo(rtlPosCorrection.value === true ? Number.MAX_SAFE_INTEGER : 0);
    }
    function scrollToEnd() {
      animScrollTo(rtlPosCorrection.value === true ? 0 : Number.MAX_SAFE_INTEGER);
    }
    function stopAnimScroll() {
      if (scrollTimer !== null) {
        clearInterval(scrollTimer);
        scrollTimer = null;
      }
    }
    function onKbdNavigate(keyCode, fromEl) {
      const tabs = Array.prototype.filter.call(
        contentRef.value.children,
        (el) => el === fromEl || el.matches && el.matches(".q-tab.q-focusable") === true
      );
      const len = tabs.length;
      if (len === 0)
        return;
      if (keyCode === 36) {
        scrollToTabEl(tabs[0]);
        tabs[0].focus();
        return true;
      }
      if (keyCode === 35) {
        scrollToTabEl(tabs[len - 1]);
        tabs[len - 1].focus();
        return true;
      }
      const dirPrev = keyCode === (props.vertical === true ? 38 : 37);
      const dirNext = keyCode === (props.vertical === true ? 40 : 39);
      const dir = dirPrev === true ? -1 : dirNext === true ? 1 : void 0;
      if (dir !== void 0) {
        const rtlDir = isRTL.value === true ? -1 : 1;
        const index = tabs.indexOf(fromEl) + dir * rtlDir;
        if (index >= 0 && index < len) {
          scrollToTabEl(tabs[index]);
          tabs[index].focus({ preventScroll: true });
        }
        return true;
      }
    }
    const posFn = computed(() => rtlPosCorrection.value === true ? { get: (content) => Math.abs(content.scrollLeft), set: (content, pos) => {
      content.scrollLeft = -pos;
    } } : props.vertical === true ? { get: (content) => content.scrollTop, set: (content, pos) => {
      content.scrollTop = pos;
    } } : { get: (content) => content.scrollLeft, set: (content, pos) => {
      content.scrollLeft = pos;
    } });
    function scrollTowards(value) {
      const content = contentRef.value, { get, set } = posFn.value;
      let done = false, pos = get(content);
      const direction = value < pos ? -1 : 1;
      pos += direction * 5;
      if (pos < 0) {
        done = true;
        pos = 0;
      } else if (direction === -1 && pos <= value || direction === 1 && pos >= value) {
        done = true;
        pos = value;
      }
      set(content, pos);
      updateArrows();
      return done;
    }
    function hasQueryIncluded(targetQuery, matchingQuery) {
      for (const key in targetQuery) {
        if (targetQuery[key] !== matchingQuery[key]) {
          return false;
        }
      }
      return true;
    }
    function updateActiveRoute() {
      let name = null, bestScore = { matchedLen: 0, queryDiff: 9999, hrefLen: 0 };
      const list = tabDataList.filter((tab) => tab.routeData !== void 0 && tab.routeData.hasRouterLink.value === true);
      const { hash: currentHash, query: currentQuery } = proxy.$route;
      const currentQueryLen = Object.keys(currentQuery).length;
      for (const tab of list) {
        const exact = tab.routeData.exact.value === true;
        if (tab.routeData[exact === true ? "linkIsExactActive" : "linkIsActive"].value !== true) {
          continue;
        }
        const { hash, query, matched, href } = tab.routeData.resolvedLink.value;
        const queryLen = Object.keys(query).length;
        if (exact === true) {
          if (hash !== currentHash) {
            continue;
          }
          if (queryLen !== currentQueryLen || hasQueryIncluded(currentQuery, query) === false) {
            continue;
          }
          name = tab.name.value;
          break;
        }
        if (hash !== "" && hash !== currentHash) {
          continue;
        }
        if (queryLen !== 0 && hasQueryIncluded(query, currentQuery) === false) {
          continue;
        }
        const newScore = {
          matchedLen: matched.length,
          queryDiff: currentQueryLen - queryLen,
          hrefLen: href.length - hash.length
        };
        if (newScore.matchedLen > bestScore.matchedLen) {
          name = tab.name.value;
          bestScore = newScore;
          continue;
        } else if (newScore.matchedLen !== bestScore.matchedLen) {
          continue;
        }
        if (newScore.queryDiff < bestScore.queryDiff) {
          name = tab.name.value;
          bestScore = newScore;
        } else if (newScore.queryDiff !== bestScore.queryDiff) {
          continue;
        }
        if (newScore.hrefLen > bestScore.hrefLen) {
          name = tab.name.value;
          bestScore = newScore;
        }
      }
      if (name === null && tabDataList.some((tab) => tab.routeData === void 0 && tab.name.value === currentModel.value) === true) {
        return;
      }
      updateModel({ name, setCurrent: true });
    }
    function onFocusin(e) {
      removeFocusTimeout();
      if (hasFocus.value !== true && rootRef.value !== null && e.target && typeof e.target.closest === "function") {
        const tab = e.target.closest(".q-tab");
        if (tab && rootRef.value.contains(tab) === true) {
          hasFocus.value = true;
          scrollable.value === true && scrollToTabEl(tab);
        }
      }
    }
    function onFocusout() {
      registerFocusTimeout(() => {
        hasFocus.value = false;
      }, 30);
    }
    function verifyRouteModel() {
      if ($tabs.avoidRouteWatcher === false) {
        registerScrollToTabTimeout(updateActiveRoute);
      } else {
        removeScrollToTabTimeout();
      }
    }
    function watchRoute() {
      if (unwatchRoute === void 0) {
        const unwatch = watch(() => proxy.$route.fullPath, verifyRouteModel);
        unwatchRoute = () => {
          unwatch();
          unwatchRoute = void 0;
        };
      }
    }
    function registerTab(tabData) {
      tabDataList.push(tabData);
      tabDataListLen.value++;
      recalculateScroll();
      if (tabData.routeData === void 0 || proxy.$route === void 0) {
        registerScrollToTabTimeout(() => {
          if (scrollable.value === true) {
            const value = currentModel.value;
            const newTab = value !== void 0 && value !== null && value !== "" ? tabDataList.find((tab) => tab.name.value === value) : null;
            newTab && scrollToTabEl(newTab.rootRef.value);
          }
        });
      } else {
        watchRoute();
        if (tabData.routeData.hasRouterLink.value === true) {
          verifyRouteModel();
        }
      }
    }
    function unregisterTab(tabData) {
      tabDataList.splice(tabDataList.indexOf(tabData), 1);
      tabDataListLen.value--;
      recalculateScroll();
      if (unwatchRoute !== void 0 && tabData.routeData !== void 0) {
        if (tabDataList.every((tab) => tab.routeData === void 0) === true) {
          unwatchRoute();
        }
        verifyRouteModel();
      }
    }
    const $tabs = {
      currentModel,
      tabProps,
      hasFocus,
      hasActiveTab,
      registerTab,
      unregisterTab,
      verifyRouteModel,
      updateModel,
      onKbdNavigate,
      avoidRouteWatcher: false
    };
    provide(tabsKey, $tabs);
    function cleanup() {
      animateTimer !== null && clearTimeout(animateTimer);
      stopAnimScroll();
      unwatchRoute !== void 0 && unwatchRoute();
    }
    let hadRouteWatcher;
    onBeforeUnmount(cleanup);
    onDeactivated(() => {
      hadRouteWatcher = unwatchRoute !== void 0;
      cleanup();
    });
    onActivated(() => {
      hadRouteWatcher === true && watchRoute();
      recalculateScroll();
    });
    return () => {
      return h("div", {
        ref: rootRef,
        class: classes.value,
        role: "tablist",
        onFocusin,
        onFocusout
      }, [
        h(QResizeObserver, { onResize: updateContainer }),
        h("div", {
          ref: contentRef,
          class: innerClass.value,
          onScroll: updateArrows
        }, hSlot(slots.default)),
        h(QIcon, {
          class: "q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon" + (leftArrow.value === true ? "" : " q-tabs__arrow--faded"),
          name: props.leftIcon || $q.iconSet.tabs[props.vertical === true ? "up" : "left"],
          onMousedownPassive: scrollToStart,
          onTouchstartPassive: scrollToStart,
          onMouseupPassive: stopAnimScroll,
          onMouseleavePassive: stopAnimScroll,
          onTouchendPassive: stopAnimScroll
        }),
        h(QIcon, {
          class: "q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon" + (rightArrow.value === true ? "" : " q-tabs__arrow--faded"),
          name: props.rightIcon || $q.iconSet.tabs[props.vertical === true ? "down" : "right"],
          onMousedownPassive: scrollToEnd,
          onTouchstartPassive: scrollToEnd,
          onMouseupPassive: stopAnimScroll,
          onMouseleavePassive: stopAnimScroll,
          onTouchendPassive: stopAnimScroll
        })
      ]);
    };
  }
});
var QTabPanel = createComponent({
  name: "QTabPanel",
  props: usePanelChildProps,
  setup(_, { slots }) {
    return () => h("div", { class: "q-tab-panel", role: "tabpanel" }, hSlot(slots.default));
  }
});
var QTabPanels = createComponent({
  name: "QTabPanels",
  props: {
    ...usePanelProps,
    ...useDarkProps
  },
  emits: usePanelEmits,
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const { updatePanelsList, getPanelContent, panelDirectives } = usePanel();
    const classes = computed(
      () => "q-tab-panels q-panel-parent" + (isDark.value === true ? " q-tab-panels--dark q-dark" : "")
    );
    return () => {
      updatePanelsList(slots);
      return hDir(
        "div",
        { class: classes.value },
        getPanelContent(),
        "pan",
        props.swipeable,
        () => panelDirectives.value
      );
    };
  }
});
export { QTabs as Q, QTab as a, QTabPanels as b, QTabPanel as c };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVRhYlBhbmVscy4wYWNjYmQ3Mi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90YWJzL3VzZS10YWIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYnMvUVRhYi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFicy9RVGFicy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFiLXBhbmVscy9RVGFiUGFuZWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYi1wYW5lbHMvUVRhYlBhbmVscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCBpbmplY3QsIG9uQmVmb3JlVW5tb3VudCwgb25Nb3VudGVkLCB3aXRoRGlyZWN0aXZlcywgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcblxuaW1wb3J0IFJpcHBsZSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3JpcHBsZS9SaXBwbGUuanMnXG5cbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyBpc0tleUNvZGUsIHNob3VsZElnbm9yZUtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUua2V5Ym9hcmQva2V5LWNvbXBvc2l0aW9uLmpzJ1xuaW1wb3J0IHsgdGFic0tleSwgZW1wdHlSZW5kZXJGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuc3ltYm9scy9zeW1ib2xzLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB1aWQgZnJvbSAnLi4vLi4vdXRpbHMvdWlkL3VpZC5qcydcbmltcG9ydCB7IGlzRGVlcEVxdWFsIH0gZnJvbSAnLi4vLi4vdXRpbHMvaXMvaXMuanMnXG5cbmxldCBpZCA9IDBcblxuZXhwb3J0IGNvbnN0IHVzZVRhYkVtaXRzID0gWyAnY2xpY2snLCAna2V5ZG93bicgXVxuXG5leHBvcnQgY29uc3QgdXNlVGFiUHJvcHMgPSB7XG4gIGljb246IFN0cmluZyxcbiAgbGFiZWw6IFsgTnVtYmVyLCBTdHJpbmcgXSxcblxuICBhbGVydDogWyBCb29sZWFuLCBTdHJpbmcgXSxcbiAgYWxlcnRJY29uOiBTdHJpbmcsXG5cbiAgbmFtZToge1xuICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiAoKSA9PiBgdF8keyBpZCsrIH1gXG4gIH0sXG5cbiAgbm9DYXBzOiBCb29sZWFuLFxuXG4gIHRhYmluZGV4OiBbIFN0cmluZywgTnVtYmVyIF0sXG4gIGRpc2FibGU6IEJvb2xlYW4sXG5cbiAgY29udGVudENsYXNzOiBTdHJpbmcsXG5cbiAgcmlwcGxlOiB7XG4gICAgdHlwZTogWyBCb29sZWFuLCBPYmplY3QgXSxcbiAgICBkZWZhdWx0OiB0cnVlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCBzbG90cywgZW1pdCwgcm91dGVEYXRhKSB7XG4gIGNvbnN0ICR0YWJzID0gaW5qZWN0KHRhYnNLZXksIGVtcHR5UmVuZGVyRm4pXG4gIGlmICgkdGFicyA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1FUYWIvUVJvdXRlVGFiIGNvbXBvbmVudCBuZWVkcyB0byBiZSBjaGlsZCBvZiBRVGFicycpXG4gICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgfVxuXG4gIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgYmx1clRhcmdldFJlZiA9IHJlZihudWxsKVxuICBjb25zdCByb290UmVmID0gcmVmKG51bGwpXG4gIGNvbnN0IHRhYkluZGljYXRvclJlZiA9IHJlZihudWxsKVxuXG4gIGNvbnN0IHJpcHBsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBwcm9wcy5kaXNhYmxlID09PSB0cnVlIHx8IHByb3BzLnJpcHBsZSA9PT0gZmFsc2VcbiAgICAgID8gZmFsc2VcbiAgICAgIDogT2JqZWN0LmFzc2lnbihcbiAgICAgICAgeyBrZXlDb2RlczogWyAxMywgMzIgXSwgZWFybHk6IHRydWUgfSxcbiAgICAgICAgcHJvcHMucmlwcGxlID09PSB0cnVlID8ge30gOiBwcm9wcy5yaXBwbGVcbiAgICAgIClcbiAgKSlcblxuICBjb25zdCBpc0FjdGl2ZSA9IGNvbXB1dGVkKCgpID0+ICR0YWJzLmN1cnJlbnRNb2RlbC52YWx1ZSA9PT0gcHJvcHMubmFtZSlcblxuICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAncS10YWIgcmVsYXRpdmUtcG9zaXRpb24gc2VsZi1zdHJldGNoIGZsZXggZmxleC1jZW50ZXIgdGV4dC1jZW50ZXInXG4gICAgKyAoXG4gICAgICBpc0FjdGl2ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IChcbiAgICAgICAgICAgICcgcS10YWItLWFjdGl2ZSdcbiAgICAgICAgICAgICsgKCR0YWJzLnRhYlByb3BzLnZhbHVlLmFjdGl2ZUNsYXNzID8gJyAnICsgJHRhYnMudGFiUHJvcHMudmFsdWUuYWN0aXZlQ2xhc3MgOiAnJylcbiAgICAgICAgICAgICsgKCR0YWJzLnRhYlByb3BzLnZhbHVlLmFjdGl2ZUNvbG9yID8gYCB0ZXh0LSR7ICR0YWJzLnRhYlByb3BzLnZhbHVlLmFjdGl2ZUNvbG9yIH1gIDogJycpXG4gICAgICAgICAgICArICgkdGFicy50YWJQcm9wcy52YWx1ZS5hY3RpdmVCZ0NvbG9yID8gYCBiZy0keyAkdGFicy50YWJQcm9wcy52YWx1ZS5hY3RpdmVCZ0NvbG9yIH1gIDogJycpXG4gICAgICAgICAgKVxuICAgICAgICA6ICcgcS10YWItLWluYWN0aXZlJ1xuICAgIClcbiAgICArIChwcm9wcy5pY29uICYmIHByb3BzLmxhYmVsICYmICR0YWJzLnRhYlByb3BzLnZhbHVlLmlubGluZUxhYmVsID09PSBmYWxzZSA/ICcgcS10YWItLWZ1bGwnIDogJycpXG4gICAgKyAocHJvcHMubm9DYXBzID09PSB0cnVlIHx8ICR0YWJzLnRhYlByb3BzLnZhbHVlLm5vQ2FwcyA9PT0gdHJ1ZSA/ICcgcS10YWItLW5vLWNhcHMnIDogJycpXG4gICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgZGlzYWJsZWQnIDogJyBxLWZvY3VzYWJsZSBxLWhvdmVyYWJsZSBjdXJzb3ItcG9pbnRlcicpXG4gICAgKyAocm91dGVEYXRhICE9PSB2b2lkIDAgPyByb3V0ZURhdGEubGlua0NsYXNzLnZhbHVlIDogJycpXG4gIClcblxuICBjb25zdCBpbm5lckNsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAncS10YWJfX2NvbnRlbnQgc2VsZi1zdHJldGNoIGZsZXgtY2VudGVyIHJlbGF0aXZlLXBvc2l0aW9uIHEtYW5jaG9yLS1za2lwIG5vbi1zZWxlY3RhYmxlICdcbiAgICArICgkdGFicy50YWJQcm9wcy52YWx1ZS5pbmxpbmVMYWJlbCA9PT0gdHJ1ZSA/ICdyb3cgbm8td3JhcCBxLXRhYl9fY29udGVudC0taW5saW5lJyA6ICdjb2x1bW4nKVxuICAgICsgKHByb3BzLmNvbnRlbnRDbGFzcyAhPT0gdm9pZCAwID8gYCAkeyBwcm9wcy5jb250ZW50Q2xhc3MgfWAgOiAnJylcbiAgKVxuXG4gIGNvbnN0IHRhYkluZGV4ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIChcbiAgICAgIHByb3BzLmRpc2FibGUgPT09IHRydWVcbiAgICAgIHx8ICR0YWJzLmhhc0ZvY3VzLnZhbHVlID09PSB0cnVlXG4gICAgICB8fCAoaXNBY3RpdmUudmFsdWUgPT09IGZhbHNlICYmICR0YWJzLmhhc0FjdGl2ZVRhYi52YWx1ZSA9PT0gdHJ1ZSlcbiAgICApXG4gICAgICA/IC0xXG4gICAgICA6IHByb3BzLnRhYmluZGV4IHx8IDBcbiAgKSlcblxuICBmdW5jdGlvbiBvbkNsaWNrIChlLCBrZXlib2FyZCkge1xuICAgIGlmIChrZXlib2FyZCAhPT0gdHJ1ZSAmJiBibHVyVGFyZ2V0UmVmLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICBibHVyVGFyZ2V0UmVmLnZhbHVlLmZvY3VzKClcbiAgICB9XG5cbiAgICBpZiAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgLy8gd2Ugc2hvdWxkIGhpbmRlciBuYXRpdmUgbmF2aWdhdGlvbiB0aG91Z2hcbiAgICAgIGlmIChyb3V0ZURhdGEgIT09IHZvaWQgMCAmJiByb3V0ZURhdGEuaGFzUm91dGVyTGluay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgICAgfVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gZG8gd2UgaGF2ZSBhIFFUYWI/XG4gICAgaWYgKHJvdXRlRGF0YSA9PT0gdm9pZCAwKSB7XG4gICAgICAkdGFicy51cGRhdGVNb2RlbCh7IG5hbWU6IHByb3BzLm5hbWUgfSlcbiAgICAgIGVtaXQoJ2NsaWNrJywgZSlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChyb3V0ZURhdGEuaGFzUm91dGVyTGluay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgZ28gPSAob3B0cyA9IHt9KSA9PiB7XG4gICAgICAgIC8vIGlmIHJlcXVpcmluZyB0byBnbyB0byBhbm90aGVyIHJvdXRlLCB0aGVuIHdlXG4gICAgICAgIC8vIGxldCB0aGUgUVRhYnMgcm91dGUgd2F0Y2hlciBkbyBpdHMgam9iLFxuICAgICAgICAvLyBvdGhlcndpc2UgZGlyZWN0bHkgc2VsZWN0IHRoaXNcbiAgICAgICAgbGV0IGhhcmRFcnJvclxuICAgICAgICBjb25zdCByZXFJZCA9IG9wdHMudG8gPT09IHZvaWQgMCB8fCBpc0RlZXBFcXVhbChvcHRzLnRvLCBwcm9wcy50bykgPT09IHRydWVcbiAgICAgICAgICA/ICgkdGFicy5hdm9pZFJvdXRlV2F0Y2hlciA9IHVpZCgpKVxuICAgICAgICAgIDogbnVsbFxuXG4gICAgICAgIHJldHVybiByb3V0ZURhdGEubmF2aWdhdGVUb1JvdXRlckxpbmsoZSwgeyAuLi5vcHRzLCByZXR1cm5Sb3V0ZXJFcnJvcjogdHJ1ZSB9KVxuICAgICAgICAgIC5jYXRjaChlcnIgPT4geyBoYXJkRXJyb3IgPSBlcnIgfSlcbiAgICAgICAgICAudGhlbihzb2Z0RXJyb3IgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcUlkID09PSAkdGFicy5hdm9pZFJvdXRlV2F0Y2hlcikge1xuICAgICAgICAgICAgICAkdGFicy5hdm9pZFJvdXRlV2F0Y2hlciA9IGZhbHNlXG5cbiAgICAgICAgICAgICAgLy8gaWYgd2UgZG9uJ3QgaGF2ZSBhbnkgaGFyZCBlcnJvcnMgb3IgYW55IHNvZnQgZXJyb3JzLCBleGNlcHQgZm9yXG4gICAgICAgICAgICAgIC8vIHdoZW4gbmF2aWdhdGluZyB0byB0aGUgc2FtZSByb3V0ZSAob24gYWxsIG90aGVyIHNvZnQgZXJyb3JzLFxuICAgICAgICAgICAgICAvLyBsaWtlIHdoZW4gbmF2aWdhdGlvbiB3YXMgYWJvcnRlZCBpbiBhIG5hdiBndWFyZCwgd2UgZG9uJ3QgYWN0aXZhdGUgdGhpcyB0YWIpXG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBoYXJkRXJyb3IgPT09IHZvaWQgMCAmJiAoXG4gICAgICAgICAgICAgICAgICBzb2Z0RXJyb3IgPT09IHZvaWQgMFxuICAgICAgICAgICAgICAgICAgfHwgKHNvZnRFcnJvci5tZXNzYWdlICE9PSB2b2lkIDAgJiYgc29mdEVycm9yLm1lc3NhZ2Uuc3RhcnRzV2l0aCgnQXZvaWRlZCByZWR1bmRhbnQgbmF2aWdhdGlvbicpID09PSB0cnVlKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgJHRhYnMudXBkYXRlTW9kZWwoeyBuYW1lOiBwcm9wcy5uYW1lIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMucmV0dXJuUm91dGVyRXJyb3IgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhcmRFcnJvciAhPT0gdm9pZCAwID8gUHJvbWlzZS5yZWplY3QoaGFyZEVycm9yKSA6IHNvZnRFcnJvclxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIGVtaXQoJ2NsaWNrJywgZSwgZ28pXG4gICAgICBlLmRlZmF1bHRQcmV2ZW50ZWQgIT09IHRydWUgJiYgZ28oKVxuXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBlbWl0KCdjbGljaycsIGUpXG4gIH1cblxuICBmdW5jdGlvbiBvbktleWRvd24gKGUpIHtcbiAgICBpZiAoaXNLZXlDb2RlKGUsIFsgMTMsIDMyIF0pKSB7XG4gICAgICBvbkNsaWNrKGUsIHRydWUpXG4gICAgfVxuICAgIGVsc2UgaWYgKFxuICAgICAgc2hvdWxkSWdub3JlS2V5KGUpICE9PSB0cnVlXG4gICAgICAmJiBlLmtleUNvZGUgPj0gMzVcbiAgICAgICYmIGUua2V5Q29kZSA8PSA0MFxuICAgICAgJiYgZS5hbHRLZXkgIT09IHRydWVcbiAgICAgICYmIGUubWV0YUtleSAhPT0gdHJ1ZVxuICAgICkge1xuICAgICAgJHRhYnMub25LYmROYXZpZ2F0ZShlLmtleUNvZGUsIHByb3h5LiRlbCkgPT09IHRydWUgJiYgc3RvcEFuZFByZXZlbnQoZSlcbiAgICB9XG5cbiAgICBlbWl0KCdrZXlkb3duJywgZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgIGNvbnN0XG4gICAgICBuYXJyb3cgPSAkdGFicy50YWJQcm9wcy52YWx1ZS5uYXJyb3dJbmRpY2F0b3IsXG4gICAgICBjb250ZW50ID0gW10sXG4gICAgICBpbmRpY2F0b3IgPSBoKCdkaXYnLCB7XG4gICAgICAgIHJlZjogdGFiSW5kaWNhdG9yUmVmLFxuICAgICAgICBjbGFzczogW1xuICAgICAgICAgICdxLXRhYl9faW5kaWNhdG9yJyxcbiAgICAgICAgICAkdGFicy50YWJQcm9wcy52YWx1ZS5pbmRpY2F0b3JDbGFzc1xuICAgICAgICBdXG4gICAgICB9KVxuXG4gICAgcHJvcHMuaWNvbiAhPT0gdm9pZCAwICYmIGNvbnRlbnQucHVzaChcbiAgICAgIGgoUUljb24sIHtcbiAgICAgICAgY2xhc3M6ICdxLXRhYl9faWNvbicsXG4gICAgICAgIG5hbWU6IHByb3BzLmljb25cbiAgICAgIH0pXG4gICAgKVxuXG4gICAgcHJvcHMubGFiZWwgIT09IHZvaWQgMCAmJiBjb250ZW50LnB1c2goXG4gICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWJfX2xhYmVsJyB9LCBwcm9wcy5sYWJlbClcbiAgICApXG5cbiAgICBwcm9wcy5hbGVydCAhPT0gZmFsc2UgJiYgY29udGVudC5wdXNoKFxuICAgICAgcHJvcHMuYWxlcnRJY29uICE9PSB2b2lkIDBcbiAgICAgICAgPyBoKFFJY29uLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXRhYl9fYWxlcnQtaWNvbicsXG4gICAgICAgICAgY29sb3I6IHByb3BzLmFsZXJ0ICE9PSB0cnVlXG4gICAgICAgICAgICA/IHByb3BzLmFsZXJ0XG4gICAgICAgICAgICA6IHZvaWQgMCxcbiAgICAgICAgICBuYW1lOiBwcm9wcy5hbGVydEljb25cbiAgICAgICAgfSlcbiAgICAgICAgOiBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXRhYl9fYWxlcnQnXG4gICAgICAgICAgICArIChwcm9wcy5hbGVydCAhPT0gdHJ1ZSA/IGAgdGV4dC0keyBwcm9wcy5hbGVydCB9YCA6ICcnKVxuICAgICAgICB9KVxuICAgIClcblxuICAgIG5hcnJvdyA9PT0gdHJ1ZSAmJiBjb250ZW50LnB1c2goaW5kaWNhdG9yKVxuXG4gICAgY29uc3Qgbm9kZSA9IFtcbiAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLWZvY3VzLWhlbHBlcicsIHRhYmluZGV4OiAtMSwgcmVmOiBibHVyVGFyZ2V0UmVmIH0pLFxuICAgICAgaCgnZGl2JywgeyBjbGFzczogaW5uZXJDbGFzcy52YWx1ZSB9LCBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIGNvbnRlbnQpKVxuICAgIF1cblxuICAgIG5hcnJvdyA9PT0gZmFsc2UgJiYgbm9kZS5wdXNoKGluZGljYXRvcilcblxuICAgIHJldHVybiBub2RlXG4gIH1cblxuICBjb25zdCB0YWJEYXRhID0ge1xuICAgIG5hbWU6IGNvbXB1dGVkKCgpID0+IHByb3BzLm5hbWUpLFxuICAgIHJvb3RSZWYsXG4gICAgdGFiSW5kaWNhdG9yUmVmLFxuICAgIHJvdXRlRGF0YVxuICB9XG5cbiAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAkdGFicy51bnJlZ2lzdGVyVGFiKHRhYkRhdGEpXG4gIH0pXG5cbiAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAkdGFicy5yZWdpc3RlclRhYih0YWJEYXRhKVxuICB9KVxuXG4gIGZ1bmN0aW9uIHJlbmRlclRhYiAodGFnLCBjdXN0b21EYXRhKSB7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIHJlZjogcm9vdFJlZixcbiAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgdGFiaW5kZXg6IHRhYkluZGV4LnZhbHVlLFxuICAgICAgcm9sZTogJ3RhYicsXG4gICAgICAnYXJpYS1zZWxlY3RlZCc6IGlzQWN0aXZlLnZhbHVlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJyxcbiAgICAgICdhcmlhLWRpc2FibGVkJzogcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICd0cnVlJyA6IHZvaWQgMCxcbiAgICAgIG9uQ2xpY2ssXG4gICAgICBvbktleWRvd24sXG4gICAgICAuLi5jdXN0b21EYXRhXG4gICAgfVxuXG4gICAgcmV0dXJuIHdpdGhEaXJlY3RpdmVzKFxuICAgICAgaCh0YWcsIGRhdGEsIGdldENvbnRlbnQoKSksXG4gICAgICBbIFsgUmlwcGxlLCByaXBwbGUudmFsdWUgXSBdXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHsgcmVuZGVyVGFiLCAkdGFicyB9XG59XG4iLCJpbXBvcnQgdXNlVGFiLCB7IHVzZVRhYlByb3BzLCB1c2VUYWJFbWl0cyB9IGZyb20gJy4vdXNlLXRhYi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRhYicsXG5cbiAgcHJvcHM6IHVzZVRhYlByb3BzLFxuXG4gIGVtaXRzOiB1c2VUYWJFbWl0cyxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcmVuZGVyVGFiIH0gPSB1c2VUYWIocHJvcHMsIHNsb3RzLCBlbWl0KVxuICAgIHJldHVybiAoKSA9PiByZW5kZXJUYWIoJ2RpdicpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25CZWZvcmVVbm1vdW50LCBvbkFjdGl2YXRlZCwgb25EZWFjdGl2YXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlLCBwcm92aWRlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcbmltcG9ydCBRUmVzaXplT2JzZXJ2ZXIgZnJvbSAnLi4vcmVzaXplLW9ic2VydmVyL1FSZXNpemVPYnNlcnZlci5qcydcblxuaW1wb3J0IHVzZVRpY2sgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLXRpY2svdXNlLXRpY2suanMnXG5pbXBvcnQgdXNlVGltZW91dCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtdGltZW91dC91c2UtdGltZW91dC5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyB0YWJzS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zeW1ib2xzL3N5bWJvbHMuanMnXG5pbXBvcnQgeyBydGxIYXNTY3JvbGxCdWcgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJ0bC9ydGwuanMnXG5cbmZ1bmN0aW9uIGdldEluZGljYXRvckNsYXNzIChjb2xvciwgdG9wLCB2ZXJ0aWNhbCkge1xuICBjb25zdCBwb3MgPSB2ZXJ0aWNhbCA9PT0gdHJ1ZVxuICAgID8gWyAnbGVmdCcsICdyaWdodCcgXVxuICAgIDogWyAndG9wJywgJ2JvdHRvbScgXVxuXG4gIHJldHVybiBgYWJzb2x1dGUtJHsgdG9wID09PSB0cnVlID8gcG9zWyAwIF0gOiBwb3NbIDEgXSB9JHsgY29sb3IgPyBgIHRleHQtJHsgY29sb3IgfWAgOiAnJyB9YFxufVxuXG5jb25zdCBhbGlnblZhbHVlcyA9IFsgJ2xlZnQnLCAnY2VudGVyJywgJ3JpZ2h0JywgJ2p1c3RpZnknIF1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUYWJzJyxcblxuICBwcm9wczoge1xuICAgIG1vZGVsVmFsdWU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcblxuICAgIGFsaWduOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnY2VudGVyJyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBhbGlnblZhbHVlcy5pbmNsdWRlcyh2KVxuICAgIH0sXG4gICAgYnJlYWtwb2ludDoge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgICAgZGVmYXVsdDogNjAwXG4gICAgfSxcblxuICAgIHZlcnRpY2FsOiBCb29sZWFuLFxuICAgIHNocmluazogQm9vbGVhbixcbiAgICBzdHJldGNoOiBCb29sZWFuLFxuXG4gICAgYWN0aXZlQ2xhc3M6IFN0cmluZyxcbiAgICBhY3RpdmVDb2xvcjogU3RyaW5nLFxuICAgIGFjdGl2ZUJnQ29sb3I6IFN0cmluZyxcbiAgICBpbmRpY2F0b3JDb2xvcjogU3RyaW5nLFxuICAgIGxlZnRJY29uOiBTdHJpbmcsXG4gICAgcmlnaHRJY29uOiBTdHJpbmcsXG5cbiAgICBvdXRzaWRlQXJyb3dzOiBCb29sZWFuLFxuICAgIG1vYmlsZUFycm93czogQm9vbGVhbixcblxuICAgIHN3aXRjaEluZGljYXRvcjogQm9vbGVhbixcblxuICAgIG5hcnJvd0luZGljYXRvcjogQm9vbGVhbixcbiAgICBpbmxpbmVMYWJlbDogQm9vbGVhbixcbiAgICBub0NhcHM6IEJvb2xlYW4sXG5cbiAgICBkZW5zZTogQm9vbGVhbixcblxuICAgIGNvbnRlbnRDbGFzczogU3RyaW5nLFxuXG4gICAgJ29uVXBkYXRlOm1vZGVsVmFsdWUnOiBbIEZ1bmN0aW9uLCBBcnJheSBdXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHsgJHEgfSA9IHByb3h5XG5cbiAgICBjb25zdCB7IHJlZ2lzdGVyVGljazogcmVnaXN0ZXJTY3JvbGxUaWNrIH0gPSB1c2VUaWNrKClcbiAgICBjb25zdCB7IHJlZ2lzdGVyVGljazogcmVnaXN0ZXJVcGRhdGVBcnJvd3NUaWNrIH0gPSB1c2VUaWNrKClcbiAgICBjb25zdCB7IHJlZ2lzdGVyVGljazogcmVnaXN0ZXJBbmltYXRlVGljayB9ID0gdXNlVGljaygpXG5cbiAgICBjb25zdCB7IHJlZ2lzdGVyVGltZW91dDogcmVnaXN0ZXJGb2N1c1RpbWVvdXQsIHJlbW92ZVRpbWVvdXQ6IHJlbW92ZUZvY3VzVGltZW91dCB9ID0gdXNlVGltZW91dCgpXG4gICAgY29uc3QgeyByZWdpc3RlclRpbWVvdXQ6IHJlZ2lzdGVyU2Nyb2xsVG9UYWJUaW1lb3V0LCByZW1vdmVUaW1lb3V0OiByZW1vdmVTY3JvbGxUb1RhYlRpbWVvdXQgfSA9IHVzZVRpbWVvdXQoKVxuXG4gICAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IGNvbnRlbnRSZWYgPSByZWYobnVsbClcblxuICAgIGNvbnN0IGN1cnJlbnRNb2RlbCA9IHJlZihwcm9wcy5tb2RlbFZhbHVlKVxuICAgIGNvbnN0IHNjcm9sbGFibGUgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgbGVmdEFycm93ID0gcmVmKHRydWUpXG4gICAgY29uc3QgcmlnaHRBcnJvdyA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBqdXN0aWZ5ID0gcmVmKGZhbHNlKVxuXG4gICAgY29uc3QgdGFiRGF0YUxpc3QgPSBbXVxuICAgIGNvbnN0IHRhYkRhdGFMaXN0TGVuID0gcmVmKDApXG4gICAgY29uc3QgaGFzRm9jdXMgPSByZWYoZmFsc2UpXG5cbiAgICBsZXQgYW5pbWF0ZVRpbWVyID0gbnVsbCwgc2Nyb2xsVGltZXIgPSBudWxsLCB1bndhdGNoUm91dGVcblxuICAgIGNvbnN0IHRhYlByb3BzID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIGFjdGl2ZUNsYXNzOiBwcm9wcy5hY3RpdmVDbGFzcyxcbiAgICAgIGFjdGl2ZUNvbG9yOiBwcm9wcy5hY3RpdmVDb2xvcixcbiAgICAgIGFjdGl2ZUJnQ29sb3I6IHByb3BzLmFjdGl2ZUJnQ29sb3IsXG4gICAgICBpbmRpY2F0b3JDbGFzczogZ2V0SW5kaWNhdG9yQ2xhc3MoXG4gICAgICAgIHByb3BzLmluZGljYXRvckNvbG9yLFxuICAgICAgICBwcm9wcy5zd2l0Y2hJbmRpY2F0b3IsXG4gICAgICAgIHByb3BzLnZlcnRpY2FsXG4gICAgICApLFxuICAgICAgbmFycm93SW5kaWNhdG9yOiBwcm9wcy5uYXJyb3dJbmRpY2F0b3IsXG4gICAgICBpbmxpbmVMYWJlbDogcHJvcHMuaW5saW5lTGFiZWwsXG4gICAgICBub0NhcHM6IHByb3BzLm5vQ2Fwc1xuICAgIH0pKVxuXG4gICAgY29uc3QgaGFzQWN0aXZlVGFiID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgbGVuID0gdGFiRGF0YUxpc3RMZW4udmFsdWVcbiAgICAgIGNvbnN0IHZhbCA9IGN1cnJlbnRNb2RlbC52YWx1ZVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmICh0YWJEYXRhTGlzdFsgaSBdLm5hbWUudmFsdWUgPT09IHZhbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSlcblxuICAgIGNvbnN0IGFsaWduQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhbGlnbiA9IHNjcm9sbGFibGUudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyAnbGVmdCdcbiAgICAgICAgOiAoanVzdGlmeS52YWx1ZSA9PT0gdHJ1ZSA/ICdqdXN0aWZ5JyA6IHByb3BzLmFsaWduKVxuXG4gICAgICByZXR1cm4gYHEtdGFic19fY29udGVudC0tYWxpZ24tJHsgYWxpZ24gfWBcbiAgICB9KVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS10YWJzIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlcidcbiAgICAgICsgYCBxLXRhYnMtLSR7IHNjcm9sbGFibGUudmFsdWUgPT09IHRydWUgPyAnJyA6ICdub3QtJyB9c2Nyb2xsYWJsZWBcbiAgICAgICsgYCBxLXRhYnMtLSR7IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJyB9YFxuICAgICAgKyBgIHEtdGFic19fYXJyb3dzLS0keyBwcm9wcy5vdXRzaWRlQXJyb3dzID09PSB0cnVlID8gJ291dHNpZGUnIDogJ2luc2lkZScgfWBcbiAgICAgICsgYCBxLXRhYnMtLW1vYmlsZS13aXRoJHsgcHJvcHMubW9iaWxlQXJyb3dzID09PSB0cnVlID8gJycgOiAnb3V0JyB9LWFycm93c2BcbiAgICAgICsgKHByb3BzLmRlbnNlID09PSB0cnVlID8gJyBxLXRhYnMtLWRlbnNlJyA6ICcnKVxuICAgICAgKyAocHJvcHMuc2hyaW5rID09PSB0cnVlID8gJyBjb2wtc2hyaW5rJyA6ICcnKVxuICAgICAgKyAocHJvcHMuc3RyZXRjaCA9PT0gdHJ1ZSA/ICcgc2VsZi1zdHJldGNoJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IGlubmVyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtdGFic19fY29udGVudCBzY3JvbGwtLW1vYmlsZSByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXIgc2VsZi1zdHJldGNoIGhpZGUtc2Nyb2xsYmFyIHJlbGF0aXZlLXBvc2l0aW9uICdcbiAgICAgICsgYWxpZ25DbGFzcy52YWx1ZVxuICAgICAgKyAocHJvcHMuY29udGVudENsYXNzICE9PSB2b2lkIDAgPyBgICR7IHByb3BzLmNvbnRlbnRDbGFzcyB9YCA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IGRvbVByb3BzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMudmVydGljYWwgPT09IHRydWVcbiAgICAgICAgPyB7IGNvbnRhaW5lcjogJ2hlaWdodCcsIGNvbnRlbnQ6ICdvZmZzZXRIZWlnaHQnLCBzY3JvbGw6ICdzY3JvbGxIZWlnaHQnIH1cbiAgICAgICAgOiB7IGNvbnRhaW5lcjogJ3dpZHRoJywgY29udGVudDogJ29mZnNldFdpZHRoJywgc2Nyb2xsOiAnc2Nyb2xsV2lkdGgnIH1cbiAgICApKVxuXG4gICAgY29uc3QgaXNSVEwgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy52ZXJ0aWNhbCAhPT0gdHJ1ZSAmJiAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSlcbiAgICBjb25zdCBydGxQb3NDb3JyZWN0aW9uID0gY29tcHV0ZWQoKCkgPT4gcnRsSGFzU2Nyb2xsQnVnID09PSBmYWxzZSAmJiBpc1JUTC52YWx1ZSA9PT0gdHJ1ZSlcblxuICAgIHdhdGNoKGlzUlRMLCB1cGRhdGVBcnJvd3MpXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5tb2RlbFZhbHVlLCBuYW1lID0+IHtcbiAgICAgIHVwZGF0ZU1vZGVsKHsgbmFtZSwgc2V0Q3VycmVudDogdHJ1ZSwgc2tpcEVtaXQ6IHRydWUgfSlcbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMub3V0c2lkZUFycm93cywgcmVjYWxjdWxhdGVTY3JvbGwpXG5cbiAgICBmdW5jdGlvbiB1cGRhdGVNb2RlbCAoeyBuYW1lLCBzZXRDdXJyZW50LCBza2lwRW1pdCB9KSB7XG4gICAgICBpZiAoY3VycmVudE1vZGVsLnZhbHVlICE9PSBuYW1lKSB7XG4gICAgICAgIGlmIChza2lwRW1pdCAhPT0gdHJ1ZSAmJiBwcm9wc1sgJ29uVXBkYXRlOm1vZGVsVmFsdWUnIF0gIT09IHZvaWQgMCkge1xuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbmFtZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBzZXRDdXJyZW50ID09PSB0cnVlXG4gICAgICAgICAgfHwgcHJvcHNbICdvblVwZGF0ZTptb2RlbFZhbHVlJyBdID09PSB2b2lkIDBcbiAgICAgICAgKSB7XG4gICAgICAgICAgYW5pbWF0ZShjdXJyZW50TW9kZWwudmFsdWUsIG5hbWUpXG4gICAgICAgICAgY3VycmVudE1vZGVsLnZhbHVlID0gbmFtZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVjYWxjdWxhdGVTY3JvbGwgKCkge1xuICAgICAgcmVnaXN0ZXJTY3JvbGxUaWNrKCgpID0+IHtcbiAgICAgICAgdXBkYXRlQ29udGFpbmVyKHtcbiAgICAgICAgICB3aWR0aDogcm9vdFJlZi52YWx1ZS5vZmZzZXRXaWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IHJvb3RSZWYudmFsdWUub2Zmc2V0SGVpZ2h0XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbnRhaW5lciAoZG9tU2l6ZSkge1xuICAgICAgLy8gaXQgY2FuIGJlIGNhbGxlZCBmYXN0ZXIgdGhhbiBjb21wb25lbnQgYmVpbmcgaW5pdGlhbGl6ZWRcbiAgICAgIC8vIHNvIHdlIG5lZWQgdG8gcHJvdGVjdCBhZ2FpbnN0IHRoYXQgY2FzZVxuICAgICAgLy8gKG9uZSBleGFtcGxlIG9mIHN1Y2ggY2FzZSBpcyB0aGUgZG9jcyByZWxlYXNlIG5vdGVzIHBhZ2UpXG4gICAgICBpZiAoZG9tUHJvcHMudmFsdWUgPT09IHZvaWQgMCB8fCBjb250ZW50UmVmLnZhbHVlID09PSBudWxsKSByZXR1cm5cblxuICAgICAgY29uc3RcbiAgICAgICAgc2l6ZSA9IGRvbVNpemVbIGRvbVByb3BzLnZhbHVlLmNvbnRhaW5lciBdLFxuICAgICAgICBzY3JvbGxTaXplID0gTWF0aC5taW4oXG4gICAgICAgICAgY29udGVudFJlZi52YWx1ZVsgZG9tUHJvcHMudmFsdWUuc2Nyb2xsIF0sXG4gICAgICAgICAgQXJyYXkucHJvdG90eXBlLnJlZHVjZS5jYWxsKFxuICAgICAgICAgICAgY29udGVudFJlZi52YWx1ZS5jaGlsZHJlbixcbiAgICAgICAgICAgIChhY2MsIGVsKSA9PiBhY2MgKyAoZWxbIGRvbVByb3BzLnZhbHVlLmNvbnRlbnQgXSB8fCAwKSxcbiAgICAgICAgICAgIDBcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIHNjcm9sbCA9IHNpemUgPiAwICYmIHNjcm9sbFNpemUgPiBzaXplIC8vIHdoZW4gdGhlcmUgaXMgbm8gdGFiLCBpbiBDaHJvbWUsIHNpemUgPT09IDAgYW5kIHNjcm9sbFNpemUgPT09IDFcblxuICAgICAgc2Nyb2xsYWJsZS52YWx1ZSA9IHNjcm9sbFxuXG4gICAgICAvLyBBcnJvd3MgbmVlZCB0byBiZSB1cGRhdGVkIGV2ZW4gaWYgdGhlIHNjcm9sbCBzdGF0dXMgd2FzIGFscmVhZHkgdHJ1ZVxuICAgICAgc2Nyb2xsID09PSB0cnVlICYmIHJlZ2lzdGVyVXBkYXRlQXJyb3dzVGljayh1cGRhdGVBcnJvd3MpXG5cbiAgICAgIGp1c3RpZnkudmFsdWUgPSBzaXplIDwgcGFyc2VJbnQocHJvcHMuYnJlYWtwb2ludCwgMTApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYW5pbWF0ZSAob2xkTmFtZSwgbmV3TmFtZSkge1xuICAgICAgY29uc3RcbiAgICAgICAgb2xkVGFiID0gb2xkTmFtZSAhPT0gdm9pZCAwICYmIG9sZE5hbWUgIT09IG51bGwgJiYgb2xkTmFtZSAhPT0gJydcbiAgICAgICAgICA/IHRhYkRhdGFMaXN0LmZpbmQodGFiID0+IHRhYi5uYW1lLnZhbHVlID09PSBvbGROYW1lKVxuICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgbmV3VGFiID0gbmV3TmFtZSAhPT0gdm9pZCAwICYmIG5ld05hbWUgIT09IG51bGwgJiYgbmV3TmFtZSAhPT0gJydcbiAgICAgICAgICA/IHRhYkRhdGFMaXN0LmZpbmQodGFiID0+IHRhYi5uYW1lLnZhbHVlID09PSBuZXdOYW1lKVxuICAgICAgICAgIDogbnVsbFxuXG4gICAgICBpZiAob2xkVGFiICYmIG5ld1RhYikge1xuICAgICAgICBjb25zdFxuICAgICAgICAgIG9sZEVsID0gb2xkVGFiLnRhYkluZGljYXRvclJlZi52YWx1ZSxcbiAgICAgICAgICBuZXdFbCA9IG5ld1RhYi50YWJJbmRpY2F0b3JSZWYudmFsdWVcblxuICAgICAgICBpZiAoYW5pbWF0ZVRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KGFuaW1hdGVUaW1lcilcbiAgICAgICAgICBhbmltYXRlVGltZXIgPSBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBvbGRFbC5zdHlsZS50cmFuc2l0aW9uID0gJ25vbmUnXG4gICAgICAgIG9sZEVsLnN0eWxlLnRyYW5zZm9ybSA9ICdub25lJ1xuICAgICAgICBuZXdFbC5zdHlsZS50cmFuc2l0aW9uID0gJ25vbmUnXG4gICAgICAgIG5ld0VsLnN0eWxlLnRyYW5zZm9ybSA9ICdub25lJ1xuXG4gICAgICAgIGNvbnN0XG4gICAgICAgICAgb2xkUG9zID0gb2xkRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgbmV3UG9zID0gbmV3RWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgICAgICBuZXdFbC5zdHlsZS50cmFuc2Zvcm0gPSBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZVxuICAgICAgICAgID8gYHRyYW5zbGF0ZTNkKDAsJHsgb2xkUG9zLnRvcCAtIG5ld1Bvcy50b3AgfXB4LDApIHNjYWxlM2QoMSwkeyBuZXdQb3MuaGVpZ2h0ID8gb2xkUG9zLmhlaWdodCAvIG5ld1Bvcy5oZWlnaHQgOiAxIH0sMSlgXG4gICAgICAgICAgOiBgdHJhbnNsYXRlM2QoJHsgb2xkUG9zLmxlZnQgLSBuZXdQb3MubGVmdCB9cHgsMCwwKSBzY2FsZTNkKCR7IG5ld1Bvcy53aWR0aCA/IG9sZFBvcy53aWR0aCAvIG5ld1Bvcy53aWR0aCA6IDEgfSwxLDEpYFxuXG4gICAgICAgIC8vIGFsbG93IHNjb3BlIHVwZGF0ZXMgdG8ga2ljayBpbiAoUVJvdXRlVGFiIG5lZWRzIG1vcmUgdGltZSlcbiAgICAgICAgcmVnaXN0ZXJBbmltYXRlVGljaygoKSA9PiB7XG4gICAgICAgICAgYW5pbWF0ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBhbmltYXRlVGltZXIgPSBudWxsXG4gICAgICAgICAgICBuZXdFbC5zdHlsZS50cmFuc2l0aW9uID0gJ3RyYW5zZm9ybSAuMjVzIGN1YmljLWJlemllciguNCwgMCwgLjIsIDEpJ1xuICAgICAgICAgICAgbmV3RWwuc3R5bGUudHJhbnNmb3JtID0gJ25vbmUnXG4gICAgICAgICAgfSwgNzApXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdUYWIgJiYgc2Nyb2xsYWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBzY3JvbGxUb1RhYkVsKG5ld1RhYi5yb290UmVmLnZhbHVlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjcm9sbFRvVGFiRWwgKGVsKSB7XG4gICAgICBjb25zdFxuICAgICAgICB7IGxlZnQsIHdpZHRoLCB0b3AsIGhlaWdodCB9ID0gY29udGVudFJlZi52YWx1ZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgbmV3UG9zID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgICAgbGV0IG9mZnNldCA9IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gbmV3UG9zLnRvcCAtIHRvcCA6IG5ld1Bvcy5sZWZ0IC0gbGVmdFxuXG4gICAgICBpZiAob2Zmc2V0IDwgMCkge1xuICAgICAgICBjb250ZW50UmVmLnZhbHVlWyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICdzY3JvbGxUb3AnIDogJ3Njcm9sbExlZnQnIF0gKz0gTWF0aC5mbG9vcihvZmZzZXQpXG4gICAgICAgIHVwZGF0ZUFycm93cygpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBvZmZzZXQgKz0gcHJvcHMudmVydGljYWwgPT09IHRydWUgPyBuZXdQb3MuaGVpZ2h0IC0gaGVpZ2h0IDogbmV3UG9zLndpZHRoIC0gd2lkdGhcbiAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgIGNvbnRlbnRSZWYudmFsdWVbIHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3Njcm9sbFRvcCcgOiAnc2Nyb2xsTGVmdCcgXSArPSBNYXRoLmNlaWwob2Zmc2V0KVxuICAgICAgICB1cGRhdGVBcnJvd3MoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUFycm93cyAoKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gY29udGVudFJlZi52YWx1ZVxuICAgICAgaWYgKGNvbnRlbnQgPT09IG51bGwpIHJldHVyblxuXG4gICAgICBjb25zdFxuICAgICAgICByZWN0ID0gY29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgcG9zID0gcHJvcHMudmVydGljYWwgPT09IHRydWUgPyBjb250ZW50LnNjcm9sbFRvcCA6IE1hdGguYWJzKGNvbnRlbnQuc2Nyb2xsTGVmdClcblxuICAgICAgaWYgKGlzUlRMLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGxlZnRBcnJvdy52YWx1ZSA9IE1hdGguY2VpbChwb3MgKyByZWN0LndpZHRoKSA8IGNvbnRlbnQuc2Nyb2xsV2lkdGggLSAxXG4gICAgICAgIHJpZ2h0QXJyb3cudmFsdWUgPSBwb3MgPiAwXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbGVmdEFycm93LnZhbHVlID0gcG9zID4gMFxuICAgICAgICByaWdodEFycm93LnZhbHVlID0gcHJvcHMudmVydGljYWwgPT09IHRydWVcbiAgICAgICAgICA/IE1hdGguY2VpbChwb3MgKyByZWN0LmhlaWdodCkgPCBjb250ZW50LnNjcm9sbEhlaWdodFxuICAgICAgICAgIDogTWF0aC5jZWlsKHBvcyArIHJlY3Qud2lkdGgpIDwgY29udGVudC5zY3JvbGxXaWR0aFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFuaW1TY3JvbGxUbyAodmFsdWUpIHtcbiAgICAgIHNjcm9sbFRpbWVyICE9PSBudWxsICYmIGNsZWFySW50ZXJ2YWwoc2Nyb2xsVGltZXIpXG4gICAgICBzY3JvbGxUaW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKHNjcm9sbFRvd2FyZHModmFsdWUpID09PSB0cnVlKSB7XG4gICAgICAgICAgc3RvcEFuaW1TY3JvbGwoKVxuICAgICAgICB9XG4gICAgICB9LCA1KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjcm9sbFRvU3RhcnQgKCkge1xuICAgICAgYW5pbVNjcm9sbFRvKHJ0bFBvc0NvcnJlY3Rpb24udmFsdWUgPT09IHRydWUgPyBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiA6IDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2Nyb2xsVG9FbmQgKCkge1xuICAgICAgYW5pbVNjcm9sbFRvKHJ0bFBvc0NvcnJlY3Rpb24udmFsdWUgPT09IHRydWUgPyAwIDogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RvcEFuaW1TY3JvbGwgKCkge1xuICAgICAgaWYgKHNjcm9sbFRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoc2Nyb2xsVGltZXIpXG4gICAgICAgIHNjcm9sbFRpbWVyID0gbnVsbFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uS2JkTmF2aWdhdGUgKGtleUNvZGUsIGZyb21FbCkge1xuICAgICAgY29uc3QgdGFicyA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChcbiAgICAgICAgY29udGVudFJlZi52YWx1ZS5jaGlsZHJlbixcbiAgICAgICAgZWwgPT4gZWwgPT09IGZyb21FbCB8fCAoZWwubWF0Y2hlcyAmJiBlbC5tYXRjaGVzKCcucS10YWIucS1mb2N1c2FibGUnKSA9PT0gdHJ1ZSlcbiAgICAgIClcblxuICAgICAgY29uc3QgbGVuID0gdGFicy5sZW5ndGhcbiAgICAgIGlmIChsZW4gPT09IDApIHJldHVyblxuXG4gICAgICBpZiAoa2V5Q29kZSA9PT0gMzYpIHsgLy8gSG9tZVxuICAgICAgICBzY3JvbGxUb1RhYkVsKHRhYnNbIDAgXSlcbiAgICAgICAgdGFic1sgMCBdLmZvY3VzKClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIGlmIChrZXlDb2RlID09PSAzNSkgeyAvLyBFbmRcbiAgICAgICAgc2Nyb2xsVG9UYWJFbCh0YWJzWyBsZW4gLSAxIF0pXG4gICAgICAgIHRhYnNbIGxlbiAtIDEgXS5mb2N1cygpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRpclByZXYgPSBrZXlDb2RlID09PSAocHJvcHMudmVydGljYWwgPT09IHRydWUgPyAzOCAvKiBBcnJvd1VwICovIDogMzcgLyogQXJyb3dMZWZ0ICovKVxuICAgICAgY29uc3QgZGlyTmV4dCA9IGtleUNvZGUgPT09IChwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/IDQwIC8qIEFycm93RG93biAqLyA6IDM5IC8qIEFycm93UmlnaHQgKi8pXG5cbiAgICAgIGNvbnN0IGRpciA9IGRpclByZXYgPT09IHRydWUgPyAtMSA6IChkaXJOZXh0ID09PSB0cnVlID8gMSA6IHZvaWQgMClcblxuICAgICAgaWYgKGRpciAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNvbnN0IHJ0bERpciA9IGlzUlRMLnZhbHVlID09PSB0cnVlID8gLTEgOiAxXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGFicy5pbmRleE9mKGZyb21FbCkgKyBkaXIgKiBydGxEaXJcblxuICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IGxlbikge1xuICAgICAgICAgIHNjcm9sbFRvVGFiRWwodGFic1sgaW5kZXggXSlcbiAgICAgICAgICB0YWJzWyBpbmRleCBdLmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBsZXQncyBzcGVlZCB1cCBleGVjdXRpb24gb2YgdGltZS1zZW5zaXRpdmUgc2Nyb2xsVG93YXJkcygpXG4gICAgLy8gd2l0aCBhIGNvbXB1dGVkIHZhcmlhYmxlIGJ5IGRpcmVjdGx5IGFwcGx5aW5nIHRoZSBtaW5pbWFsXG4gICAgLy8gbnVtYmVyIG9mIGluc3RydWN0aW9ucyBvbiBnZXQvc2V0IGZ1bmN0aW9uc1xuICAgIGNvbnN0IHBvc0ZuID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcnRsUG9zQ29ycmVjdGlvbi52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IHsgZ2V0OiBjb250ZW50ID0+IE1hdGguYWJzKGNvbnRlbnQuc2Nyb2xsTGVmdCksIHNldDogKGNvbnRlbnQsIHBvcykgPT4geyBjb250ZW50LnNjcm9sbExlZnQgPSAtcG9zIH0gfVxuICAgICAgICA6IChcbiAgICAgICAgICAgIHByb3BzLnZlcnRpY2FsID09PSB0cnVlXG4gICAgICAgICAgICAgID8geyBnZXQ6IGNvbnRlbnQgPT4gY29udGVudC5zY3JvbGxUb3AsIHNldDogKGNvbnRlbnQsIHBvcykgPT4geyBjb250ZW50LnNjcm9sbFRvcCA9IHBvcyB9IH1cbiAgICAgICAgICAgICAgOiB7IGdldDogY29udGVudCA9PiBjb250ZW50LnNjcm9sbExlZnQsIHNldDogKGNvbnRlbnQsIHBvcykgPT4geyBjb250ZW50LnNjcm9sbExlZnQgPSBwb3MgfSB9XG4gICAgICAgICAgKVxuICAgICkpXG5cbiAgICBmdW5jdGlvbiBzY3JvbGxUb3dhcmRzICh2YWx1ZSkge1xuICAgICAgY29uc3RcbiAgICAgICAgY29udGVudCA9IGNvbnRlbnRSZWYudmFsdWUsXG4gICAgICAgIHsgZ2V0LCBzZXQgfSA9IHBvc0ZuLnZhbHVlXG5cbiAgICAgIGxldFxuICAgICAgICBkb25lID0gZmFsc2UsXG4gICAgICAgIHBvcyA9IGdldChjb250ZW50KVxuXG4gICAgICBjb25zdCBkaXJlY3Rpb24gPSB2YWx1ZSA8IHBvcyA/IC0xIDogMVxuXG4gICAgICBwb3MgKz0gZGlyZWN0aW9uICogNVxuXG4gICAgICBpZiAocG9zIDwgMCkge1xuICAgICAgICBkb25lID0gdHJ1ZVxuICAgICAgICBwb3MgPSAwXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChcbiAgICAgICAgKGRpcmVjdGlvbiA9PT0gLTEgJiYgcG9zIDw9IHZhbHVlKVxuICAgICAgICB8fCAoZGlyZWN0aW9uID09PSAxICYmIHBvcyA+PSB2YWx1ZSlcbiAgICAgICkge1xuICAgICAgICBkb25lID0gdHJ1ZVxuICAgICAgICBwb3MgPSB2YWx1ZVxuICAgICAgfVxuXG4gICAgICBzZXQoY29udGVudCwgcG9zKVxuICAgICAgdXBkYXRlQXJyb3dzKClcblxuICAgICAgcmV0dXJuIGRvbmVcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYXNRdWVyeUluY2x1ZGVkICh0YXJnZXRRdWVyeSwgbWF0Y2hpbmdRdWVyeSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGFyZ2V0UXVlcnkpIHtcbiAgICAgICAgaWYgKHRhcmdldFF1ZXJ5WyBrZXkgXSAhPT0gbWF0Y2hpbmdRdWVyeVsga2V5IF0pIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIC8vIGRvIG5vdCB1c2UgZGlyZWN0bHk7IHVzZSB2ZXJpZnlSb3V0ZU1vZGVsKCkgaW5zdGVhZFxuICAgIGZ1bmN0aW9uIHVwZGF0ZUFjdGl2ZVJvdXRlICgpIHtcbiAgICAgIGxldCBuYW1lID0gbnVsbCwgYmVzdFNjb3JlID0geyBtYXRjaGVkTGVuOiAwLCBxdWVyeURpZmY6IDk5OTksIGhyZWZMZW46IDAgfVxuXG4gICAgICBjb25zdCBsaXN0ID0gdGFiRGF0YUxpc3QuZmlsdGVyKHRhYiA9PiB0YWIucm91dGVEYXRhICE9PSB2b2lkIDAgJiYgdGFiLnJvdXRlRGF0YS5oYXNSb3V0ZXJMaW5rLnZhbHVlID09PSB0cnVlKVxuICAgICAgY29uc3QgeyBoYXNoOiBjdXJyZW50SGFzaCwgcXVlcnk6IGN1cnJlbnRRdWVyeSB9ID0gcHJveHkuJHJvdXRlXG4gICAgICBjb25zdCBjdXJyZW50UXVlcnlMZW4gPSBPYmplY3Qua2V5cyhjdXJyZW50UXVlcnkpLmxlbmd0aFxuXG4gICAgICAvLyBWdWUgUm91dGVyIGRvZXMgbm90IGtlZXAgYWNjb3VudCBvZiBoYXNoICYgcXVlcnkgd2hlbiBtYXRjaGluZ1xuICAgICAgLy8gc28gd2UncmUgZG9pbmcgdGhpcyBhcyB3ZWxsXG5cbiAgICAgIGZvciAoY29uc3QgdGFiIG9mIGxpc3QpIHtcbiAgICAgICAgY29uc3QgZXhhY3QgPSB0YWIucm91dGVEYXRhLmV4YWN0LnZhbHVlID09PSB0cnVlXG5cbiAgICAgICAgaWYgKHRhYi5yb3V0ZURhdGFbIGV4YWN0ID09PSB0cnVlID8gJ2xpbmtJc0V4YWN0QWN0aXZlJyA6ICdsaW5rSXNBY3RpdmUnIF0udmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgICAvLyBpdCBjYW5ub3QgbWF0Y2ggYW55dGhpbmcgYXMgaXQncyBub3QgYWN0aXZlIG5vciBleGFjdC1hY3RpdmVcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyBoYXNoLCBxdWVyeSwgbWF0Y2hlZCwgaHJlZiB9ID0gdGFiLnJvdXRlRGF0YS5yZXNvbHZlZExpbmsudmFsdWVcbiAgICAgICAgY29uc3QgcXVlcnlMZW4gPSBPYmplY3Qua2V5cyhxdWVyeSkubGVuZ3RoXG5cbiAgICAgICAgaWYgKGV4YWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKGhhc2ggIT09IGN1cnJlbnRIYXNoKSB7XG4gICAgICAgICAgICAvLyBpdCdzIHNldCB0byBleGFjdCBidXQgaXQgZG9lc24ndCBtYXRjaGVzIHRoZSBoYXNoXG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHF1ZXJ5TGVuICE9PSBjdXJyZW50UXVlcnlMZW5cbiAgICAgICAgICAgIHx8IGhhc1F1ZXJ5SW5jbHVkZWQoY3VycmVudFF1ZXJ5LCBxdWVyeSkgPT09IGZhbHNlXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICAvLyBpdCdzIHNldCB0byBleGFjdCBidXQgaXQgZG9lc24ndCBtYXRjaGVzIHRoZSBxdWVyeVxuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyB5ZXksIHdlIGZvdW5kIHRoZSBwZXJmZWN0IG1hdGNoIChyb3V0ZSArIGhhc2ggKyBxdWVyeSlcbiAgICAgICAgICBuYW1lID0gdGFiLm5hbWUudmFsdWVcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhc2ggIT09ICcnICYmIGhhc2ggIT09IGN1cnJlbnRIYXNoKSB7XG4gICAgICAgICAgLy8gaXQgaGFzIGhhc2ggYW5kIGl0IGRvZXNuJ3QgbWF0Y2hlc1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgcXVlcnlMZW4gIT09IDBcbiAgICAgICAgICAmJiBoYXNRdWVyeUluY2x1ZGVkKHF1ZXJ5LCBjdXJyZW50UXVlcnkpID09PSBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICAvLyBpdCBoYXMgcXVlcnkgYW5kIGl0IGRvZXNuJ3QgaW5jbHVkZXMgdGhlIGN1cnJlbnQgb25lXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5ld1Njb3JlID0ge1xuICAgICAgICAgIG1hdGNoZWRMZW46IG1hdGNoZWQubGVuZ3RoLFxuICAgICAgICAgIHF1ZXJ5RGlmZjogY3VycmVudFF1ZXJ5TGVuIC0gcXVlcnlMZW4sXG4gICAgICAgICAgaHJlZkxlbjogaHJlZi5sZW5ndGggLSBoYXNoLmxlbmd0aFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld1Njb3JlLm1hdGNoZWRMZW4gPiBiZXN0U2NvcmUubWF0Y2hlZExlbikge1xuICAgICAgICAgIC8vIGl0IG1hdGNoZXMgbW9yZSByb3V0ZXMgc28gaXQncyBtb3JlIHNwZWNpZmljIHNvIHdlIHNldCBpdCBhcyBjdXJyZW50IGNoYW1waW9uXG4gICAgICAgICAgbmFtZSA9IHRhYi5uYW1lLnZhbHVlXG4gICAgICAgICAgYmVzdFNjb3JlID0gbmV3U2NvcmVcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5ld1Njb3JlLm1hdGNoZWRMZW4gIT09IGJlc3RTY29yZS5tYXRjaGVkTGVuKSB7XG4gICAgICAgICAgLy8gaXQgbWF0Y2hlcyBsZXNzIHJvdXRlcyB0aGFuIHRoZSBjdXJyZW50IGNoYW1waW9uIHNvIHdlIGRpc2NhcmQgaXRcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld1Njb3JlLnF1ZXJ5RGlmZiA8IGJlc3RTY29yZS5xdWVyeURpZmYpIHtcbiAgICAgICAgICAvLyBxdWVyeSBpcyBjbG9zZXIgdG8gdGhlIGN1cnJlbnQgb25lIHNvIHdlIHNldCBpdCBhcyBjdXJyZW50IGNoYW1waW9uXG4gICAgICAgICAgbmFtZSA9IHRhYi5uYW1lLnZhbHVlXG4gICAgICAgICAgYmVzdFNjb3JlID0gbmV3U2NvcmVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuZXdTY29yZS5xdWVyeURpZmYgIT09IGJlc3RTY29yZS5xdWVyeURpZmYpIHtcbiAgICAgICAgICAvLyBpdCBtYXRjaGVzIGxlc3Mgcm91dGVzIHRoYW4gdGhlIGN1cnJlbnQgY2hhbXBpb24gc28gd2UgZGlzY2FyZCBpdFxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3U2NvcmUuaHJlZkxlbiA+IGJlc3RTY29yZS5ocmVmTGVuKSB7XG4gICAgICAgICAgLy8gaHJlZiBpcyBsZW5ndGhpZXIgc28gaXQncyBtb3JlIHNwZWNpZmljIHNvIHdlIHNldCBpdCBhcyBjdXJyZW50IGNoYW1waW9uXG4gICAgICAgICAgbmFtZSA9IHRhYi5uYW1lLnZhbHVlXG4gICAgICAgICAgYmVzdFNjb3JlID0gbmV3U2NvcmVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIG5hbWUgPT09IG51bGxcbiAgICAgICAgJiYgdGFiRGF0YUxpc3Quc29tZSh0YWIgPT4gdGFiLnJvdXRlRGF0YSA9PT0gdm9pZCAwICYmIHRhYi5uYW1lLnZhbHVlID09PSBjdXJyZW50TW9kZWwudmFsdWUpID09PSB0cnVlXG4gICAgICApIHtcbiAgICAgICAgLy8gd2Ugc2hvdWxkbid0IGludGVyZmVyZSBpZiBub24tcm91dGUgdGFiIGlzIGFjdGl2ZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgdXBkYXRlTW9kZWwoeyBuYW1lLCBzZXRDdXJyZW50OiB0cnVlIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c2luIChlKSB7XG4gICAgICByZW1vdmVGb2N1c1RpbWVvdXQoKVxuXG4gICAgICBpZiAoXG4gICAgICAgIGhhc0ZvY3VzLnZhbHVlICE9PSB0cnVlXG4gICAgICAgICYmIHJvb3RSZWYudmFsdWUgIT09IG51bGxcbiAgICAgICAgJiYgZS50YXJnZXRcbiAgICAgICAgJiYgdHlwZW9mIGUudGFyZ2V0LmNsb3Nlc3QgPT09ICdmdW5jdGlvbidcbiAgICAgICkge1xuICAgICAgICBjb25zdCB0YWIgPSBlLnRhcmdldC5jbG9zZXN0KCcucS10YWInKVxuXG4gICAgICAgIC8vIGlmIHRoZSB0YXJnZXQgaXMgY29udGFpbmVkIGJ5IGEgUVRhYi9RUm91dGVUYWJcbiAgICAgICAgLy8gKGl0IG1pZ2h0IGJlIG90aGVyIGVsZW1lbnRzIGZvY3VzZWQsIGxpa2UgYWRkaXRpb25hbCBRQnRuKVxuICAgICAgICBpZiAodGFiICYmIHJvb3RSZWYudmFsdWUuY29udGFpbnModGFiKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGhhc0ZvY3VzLnZhbHVlID0gdHJ1ZVxuICAgICAgICAgIHNjcm9sbGFibGUudmFsdWUgPT09IHRydWUgJiYgc2Nyb2xsVG9UYWJFbCh0YWIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZvY3Vzb3V0ICgpIHtcbiAgICAgIHJlZ2lzdGVyRm9jdXNUaW1lb3V0KCgpID0+IHsgaGFzRm9jdXMudmFsdWUgPSBmYWxzZSB9LCAzMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2ZXJpZnlSb3V0ZU1vZGVsICgpIHtcbiAgICAgIGlmICgkdGFicy5hdm9pZFJvdXRlV2F0Y2hlciA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmVnaXN0ZXJTY3JvbGxUb1RhYlRpbWVvdXQodXBkYXRlQWN0aXZlUm91dGUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVtb3ZlU2Nyb2xsVG9UYWJUaW1lb3V0KClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3YXRjaFJvdXRlICgpIHtcbiAgICAgIGlmICh1bndhdGNoUm91dGUgPT09IHZvaWQgMCkge1xuICAgICAgICBjb25zdCB1bndhdGNoID0gd2F0Y2goKCkgPT4gcHJveHkuJHJvdXRlLmZ1bGxQYXRoLCB2ZXJpZnlSb3V0ZU1vZGVsKVxuICAgICAgICB1bndhdGNoUm91dGUgPSAoKSA9PiB7XG4gICAgICAgICAgdW53YXRjaCgpXG4gICAgICAgICAgdW53YXRjaFJvdXRlID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWdpc3RlclRhYiAodGFiRGF0YSkge1xuICAgICAgdGFiRGF0YUxpc3QucHVzaCh0YWJEYXRhKVxuICAgICAgdGFiRGF0YUxpc3RMZW4udmFsdWUrK1xuXG4gICAgICByZWNhbGN1bGF0ZVNjcm9sbCgpXG5cbiAgICAgIC8vIGlmIGl0J3MgYSBRVGFiIG9yIHdlIGRvbid0IGhhdmUgVnVlIFJvdXRlclxuICAgICAgaWYgKHRhYkRhdGEucm91dGVEYXRhID09PSB2b2lkIDAgfHwgcHJveHkuJHJvdXRlID09PSB2b2lkIDApIHtcbiAgICAgICAgLy8gd2Ugc2hvdWxkIHBvc2l0aW9uIHRvIHRoZSBjdXJyZW50bHkgYWN0aXZlIHRhYiAoaWYgYW55KVxuICAgICAgICByZWdpc3RlclNjcm9sbFRvVGFiVGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHNjcm9sbGFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3VycmVudE1vZGVsLnZhbHVlXG4gICAgICAgICAgICBjb25zdCBuZXdUYWIgPSB2YWx1ZSAhPT0gdm9pZCAwICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSAnJ1xuICAgICAgICAgICAgICA/IHRhYkRhdGFMaXN0LmZpbmQodGFiID0+IHRhYi5uYW1lLnZhbHVlID09PSB2YWx1ZSlcbiAgICAgICAgICAgICAgOiBudWxsXG5cbiAgICAgICAgICAgIG5ld1RhYiAmJiBzY3JvbGxUb1RhYkVsKG5ld1RhYi5yb290UmVmLnZhbHVlKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIC8vIGVsc2UgaWYgaXQncyBhIFFSb3V0ZVRhYiB3aXRoIGEgdmFsaWQgbGlua1xuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIHN0YXJ0IHdhdGNoaW5nIHJvdXRlXG4gICAgICAgIHdhdGNoUm91dGUoKVxuXG4gICAgICAgIGlmICh0YWJEYXRhLnJvdXRlRGF0YS5oYXNSb3V0ZXJMaW5rLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgdmVyaWZ5Um91dGVNb2RlbCgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bnJlZ2lzdGVyVGFiICh0YWJEYXRhKSB7XG4gICAgICB0YWJEYXRhTGlzdC5zcGxpY2UodGFiRGF0YUxpc3QuaW5kZXhPZih0YWJEYXRhKSwgMSlcbiAgICAgIHRhYkRhdGFMaXN0TGVuLnZhbHVlLS1cblxuICAgICAgcmVjYWxjdWxhdGVTY3JvbGwoKVxuXG4gICAgICBpZiAodW53YXRjaFJvdXRlICE9PSB2b2lkIDAgJiYgdGFiRGF0YS5yb3V0ZURhdGEgIT09IHZvaWQgMCkge1xuICAgICAgICAvLyB1bndhdGNoIHJvdXRlIGlmIHdlIGRvbid0IGhhdmUgYW55IFFSb3V0ZVRhYnMgbGVmdFxuICAgICAgICBpZiAodGFiRGF0YUxpc3QuZXZlcnkodGFiID0+IHRhYi5yb3V0ZURhdGEgPT09IHZvaWQgMCkgPT09IHRydWUpIHtcbiAgICAgICAgICB1bndhdGNoUm91dGUoKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhlbiB1cGRhdGUgbW9kZWxcbiAgICAgICAgdmVyaWZ5Um91dGVNb2RlbCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgJHRhYnMgPSB7XG4gICAgICBjdXJyZW50TW9kZWwsXG4gICAgICB0YWJQcm9wcyxcbiAgICAgIGhhc0ZvY3VzLFxuICAgICAgaGFzQWN0aXZlVGFiLFxuXG4gICAgICByZWdpc3RlclRhYixcbiAgICAgIHVucmVnaXN0ZXJUYWIsXG5cbiAgICAgIHZlcmlmeVJvdXRlTW9kZWwsXG4gICAgICB1cGRhdGVNb2RlbCxcbiAgICAgIG9uS2JkTmF2aWdhdGUsXG5cbiAgICAgIGF2b2lkUm91dGVXYXRjaGVyOiBmYWxzZSAvLyBmYWxzZSB8IHN0cmluZyAodWlkKVxuICAgIH1cblxuICAgIHByb3ZpZGUodGFic0tleSwgJHRhYnMpXG5cbiAgICBmdW5jdGlvbiBjbGVhbnVwICgpIHtcbiAgICAgIGFuaW1hdGVUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQoYW5pbWF0ZVRpbWVyKVxuICAgICAgc3RvcEFuaW1TY3JvbGwoKVxuICAgICAgdW53YXRjaFJvdXRlICE9PSB2b2lkIDAgJiYgdW53YXRjaFJvdXRlKClcbiAgICB9XG5cbiAgICBsZXQgaGFkUm91dGVXYXRjaGVyXG5cbiAgICBvbkJlZm9yZVVubW91bnQoY2xlYW51cClcblxuICAgIG9uRGVhY3RpdmF0ZWQoKCkgPT4ge1xuICAgICAgaGFkUm91dGVXYXRjaGVyID0gdW53YXRjaFJvdXRlICE9PSB2b2lkIDBcbiAgICAgIGNsZWFudXAoKVxuICAgIH0pXG5cbiAgICBvbkFjdGl2YXRlZCgoKSA9PiB7XG4gICAgICBoYWRSb3V0ZVdhdGNoZXIgPT09IHRydWUgJiYgd2F0Y2hSb3V0ZSgpXG4gICAgICByZWNhbGN1bGF0ZVNjcm9sbCgpXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICByZWY6IHJvb3RSZWYsXG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICByb2xlOiAndGFibGlzdCcsXG4gICAgICAgIG9uRm9jdXNpbixcbiAgICAgICAgb25Gb2N1c291dFxuICAgICAgfSwgW1xuICAgICAgICBoKFFSZXNpemVPYnNlcnZlciwgeyBvblJlc2l6ZTogdXBkYXRlQ29udGFpbmVyIH0pLFxuXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICByZWY6IGNvbnRlbnRSZWYsXG4gICAgICAgICAgY2xhc3M6IGlubmVyQ2xhc3MudmFsdWUsXG4gICAgICAgICAgb25TY3JvbGw6IHVwZGF0ZUFycm93c1xuICAgICAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSksXG5cbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS10YWJzX19hcnJvdyBxLXRhYnNfX2Fycm93LS1sZWZ0IGFic29sdXRlIHEtdGFiX19pY29uJ1xuICAgICAgICAgICAgKyAobGVmdEFycm93LnZhbHVlID09PSB0cnVlID8gJycgOiAnIHEtdGFic19fYXJyb3ctLWZhZGVkJyksXG4gICAgICAgICAgbmFtZTogcHJvcHMubGVmdEljb24gfHwgJHEuaWNvblNldC50YWJzWyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICd1cCcgOiAnbGVmdCcgXSxcbiAgICAgICAgICBvbk1vdXNlZG93blBhc3NpdmU6IHNjcm9sbFRvU3RhcnQsXG4gICAgICAgICAgb25Ub3VjaHN0YXJ0UGFzc2l2ZTogc2Nyb2xsVG9TdGFydCxcbiAgICAgICAgICBvbk1vdXNldXBQYXNzaXZlOiBzdG9wQW5pbVNjcm9sbCxcbiAgICAgICAgICBvbk1vdXNlbGVhdmVQYXNzaXZlOiBzdG9wQW5pbVNjcm9sbCxcbiAgICAgICAgICBvblRvdWNoZW5kUGFzc2l2ZTogc3RvcEFuaW1TY3JvbGxcbiAgICAgICAgfSksXG5cbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS10YWJzX19hcnJvdyBxLXRhYnNfX2Fycm93LS1yaWdodCBhYnNvbHV0ZSBxLXRhYl9faWNvbidcbiAgICAgICAgICAgICsgKHJpZ2h0QXJyb3cudmFsdWUgPT09IHRydWUgPyAnJyA6ICcgcS10YWJzX19hcnJvdy0tZmFkZWQnKSxcbiAgICAgICAgICBuYW1lOiBwcm9wcy5yaWdodEljb24gfHwgJHEuaWNvblNldC50YWJzWyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICdkb3duJyA6ICdyaWdodCcgXSxcbiAgICAgICAgICBvbk1vdXNlZG93blBhc3NpdmU6IHNjcm9sbFRvRW5kLFxuICAgICAgICAgIG9uVG91Y2hzdGFydFBhc3NpdmU6IHNjcm9sbFRvRW5kLFxuICAgICAgICAgIG9uTW91c2V1cFBhc3NpdmU6IHN0b3BBbmltU2Nyb2xsLFxuICAgICAgICAgIG9uTW91c2VsZWF2ZVBhc3NpdmU6IHN0b3BBbmltU2Nyb2xsLFxuICAgICAgICAgIG9uVG91Y2hlbmRQYXNzaXZlOiBzdG9wQW5pbVNjcm9sbFxuICAgICAgICB9KVxuICAgICAgXSlcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyB1c2VQYW5lbENoaWxkUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1wYW5lbC91c2UtcGFuZWwuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRhYlBhbmVsJyxcblxuICBwcm9wczogdXNlUGFuZWxDaGlsZFByb3BzLFxuXG4gIHNldHVwIChfLCB7IHNsb3RzIH0pIHtcbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2JywgeyBjbGFzczogJ3EtdGFiLXBhbmVsJywgcm9sZTogJ3RhYnBhbmVsJyB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlUGFuZWwsIHsgdXNlUGFuZWxQcm9wcywgdXNlUGFuZWxFbWl0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXBhbmVsL3VzZS1wYW5lbC5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaERpciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUYWJQYW5lbHMnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlUGFuZWxQcm9wcyxcbiAgICAuLi51c2VEYXJrUHJvcHNcbiAgfSxcblxuICBlbWl0czogdXNlUGFuZWxFbWl0cyxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCB2bS5wcm94eS4kcSlcblxuICAgIGNvbnN0IHsgdXBkYXRlUGFuZWxzTGlzdCwgZ2V0UGFuZWxDb250ZW50LCBwYW5lbERpcmVjdGl2ZXMgfSA9IHVzZVBhbmVsKClcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtdGFiLXBhbmVscyBxLXBhbmVsLXBhcmVudCdcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS10YWItcGFuZWxzLS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdXBkYXRlUGFuZWxzTGlzdChzbG90cylcblxuICAgICAgcmV0dXJuIGhEaXIoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sXG4gICAgICAgIGdldFBhbmVsQ29udGVudCgpLFxuICAgICAgICAncGFuJyxcbiAgICAgICAgcHJvcHMuc3dpcGVhYmxlLFxuICAgICAgICAoKSA9PiBwYW5lbERpcmVjdGl2ZXMudmFsdWVcbiAgICAgIClcbiAgICB9XG4gIH1cbn0pXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQWFBLElBQUksS0FBSztBQUVGLE1BQU0sY0FBYyxDQUFFLFNBQVMsU0FBVztBQUUxQyxNQUFNLGNBQWM7QUFBQSxFQUN6QixNQUFNO0FBQUEsRUFDTixPQUFPLENBQUUsUUFBUSxNQUFRO0FBQUEsRUFFekIsT0FBTyxDQUFFLFNBQVMsTUFBUTtBQUFBLEVBQzFCLFdBQVc7QUFBQSxFQUVYLE1BQU07QUFBQSxJQUNKLE1BQU0sQ0FBRSxRQUFRLE1BQVE7QUFBQSxJQUN4QixTQUFTLE1BQU0sS0FBTTtBQUFBLEVBQ3RCO0FBQUEsRUFFRCxRQUFRO0FBQUEsRUFFUixVQUFVLENBQUUsUUFBUSxNQUFRO0FBQUEsRUFDNUIsU0FBUztBQUFBLEVBRVQsY0FBYztBQUFBLEVBRWQsUUFBUTtBQUFBLElBQ04sTUFBTSxDQUFFLFNBQVMsTUFBUTtBQUFBLElBQ3pCLFNBQVM7QUFBQSxFQUNWO0FBQ0g7QUFFZSxTQUFRLE9BQUUsT0FBTyxPQUFPLE1BQU0sV0FBVztBQUN0RCxRQUFNLFFBQVEsT0FBTyxTQUFTLGFBQWE7QUFDM0MsTUFBSSxVQUFVLGVBQWU7QUFDM0IsWUFBUSxNQUFNLHFEQUFxRDtBQUNuRSxXQUFPO0FBQUEsRUFDUjtBQUVELFFBQU0sRUFBRSxNQUFPLElBQUcsbUJBQW9CO0FBRXRDLFFBQU0sZ0JBQWdCLElBQUksSUFBSTtBQUM5QixRQUFNLFVBQVUsSUFBSSxJQUFJO0FBQ3hCLFFBQU0sa0JBQWtCLElBQUksSUFBSTtBQUVoQyxRQUFNLFNBQVMsU0FBUyxNQUN0QixNQUFNLFlBQVksUUFBUSxNQUFNLFdBQVcsUUFDdkMsUUFDQSxPQUFPO0FBQUEsSUFDUCxFQUFFLFVBQVUsQ0FBRSxJQUFJLEVBQUUsR0FBSSxPQUFPLEtBQU07QUFBQSxJQUNyQyxNQUFNLFdBQVcsT0FBTyxDQUFFLElBQUcs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
