import { e as createComponent, a8 as useModelToggleProps, aw as useTransitionProps, y as scrollTargetProp, aa as useModelToggleEmits, n as ref, g as computed, ax as useTick, ac as useTimeout, ay as useTransition, ad as useModelToggle, az as usePortal, u as watch, A as onBeforeUnmount, au as cleanEvt, ap as addEvt, C as getScrollTarget, h, aE as Transition, k as getCurrentInstance, j as hSlot, Y as stopAndPrevent } from "./index.c8e2405b.js";
import { u as useAnchorStaticProps, v as validatePosition, a as validateOffset, p as parsePosition, b as useScrollTarget, c as useAnchor, r as removeClickOutside, s as setPosition, d as addClickOutside } from "./QMenu.4f670399.js";
import { c as clearSelection } from "./selection.94057980.js";
var QTooltip = createComponent({
  name: "QTooltip",
  inheritAttrs: false,
  props: {
    ...useAnchorStaticProps,
    ...useModelToggleProps,
    ...useTransitionProps,
    maxHeight: {
      type: String,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    },
    transitionShow: {
      ...useTransitionProps.transitionShow,
      default: "jump-down"
    },
    transitionHide: {
      ...useTransitionProps.transitionHide,
      default: "jump-up"
    },
    anchor: {
      type: String,
      default: "bottom middle",
      validator: validatePosition
    },
    self: {
      type: String,
      default: "top middle",
      validator: validatePosition
    },
    offset: {
      type: Array,
      default: () => [14, 14],
      validator: validateOffset
    },
    scrollTarget: scrollTargetProp,
    delay: {
      type: Number,
      default: 0
    },
    hideDelay: {
      type: Number,
      default: 0
    },
    persistent: Boolean
  },
  emits: [
    ...useModelToggleEmits
  ],
  setup(props, { slots, emit, attrs }) {
    let unwatchPosition, observer;
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const innerRef = ref(null);
    const showing = ref(false);
    const anchorOrigin = computed(() => parsePosition(props.anchor, $q.lang.rtl));
    const selfOrigin = computed(() => parsePosition(props.self, $q.lang.rtl));
    const hideOnRouteChange = computed(() => props.persistent !== true);
    const { registerTick, removeTick } = useTick();
    const { registerTimeout } = useTimeout();
    const { transitionProps, transitionStyle } = useTransition(props);
    const { localScrollTarget, changeScrollEvent, unconfigureScrollTarget } = useScrollTarget(props, configureScrollTarget);
    const { anchorEl, canShow, anchorEvents } = useAnchor({ showing, configureAnchorEl });
    const { show, hide } = useModelToggle({
      showing,
      canShow,
      handleShow,
      handleHide,
      hideOnRouteChange,
      processOnMount: true
    });
    Object.assign(anchorEvents, { delayShow, delayHide });
    const { showPortal, hidePortal, renderPortal } = usePortal(vm, innerRef, renderPortalContent, "tooltip");
    if ($q.platform.is.mobile === true) {
      const clickOutsideProps = {
        anchorEl,
        innerRef,
        onClickOutside(e) {
          hide(e);
          if (e.target.classList.contains("q-dialog__backdrop")) {
            stopAndPrevent(e);
          }
          return true;
        }
      };
      const hasClickOutside = computed(
        () => props.modelValue === null && props.persistent !== true && showing.value === true
      );
      watch(hasClickOutside, (val) => {
        const fn = val === true ? addClickOutside : removeClickOutside;
        fn(clickOutsideProps);
      });
      onBeforeUnmount(() => {
        removeClickOutside(clickOutsideProps);
      });
    }
    function handleShow(evt) {
      showPortal();
      registerTick(() => {
        observer = new MutationObserver(() => updatePosition());
        observer.observe(innerRef.value, { attributes: false, childList: true, characterData: true, subtree: true });
        updatePosition();
        configureScrollTarget();
      });
      if (unwatchPosition === void 0) {
        unwatchPosition = watch(
          () => $q.screen.width + "|" + $q.screen.height + "|" + props.self + "|" + props.anchor + "|" + $q.lang.rtl,
          updatePosition
        );
      }
      registerTimeout(() => {
        showPortal(true);
        emit("show", evt);
      }, props.transitionDuration);
    }
    function handleHide(evt) {
      removeTick();
      hidePortal();
      anchorCleanup();
      registerTimeout(() => {
        hidePortal(true);
        emit("hide", evt);
      }, props.transitionDuration);
    }
    function anchorCleanup() {
      if (observer !== void 0) {
        observer.disconnect();
        observer = void 0;
      }
      if (unwatchPosition !== void 0) {
        unwatchPosition();
        unwatchPosition = void 0;
      }
      unconfigureScrollTarget();
      cleanEvt(anchorEvents, "tooltipTemp");
    }
    function updatePosition() {
      setPosition({
        targetEl: innerRef.value,
        offset: props.offset,
        anchorEl: anchorEl.value,
        anchorOrigin: anchorOrigin.value,
        selfOrigin: selfOrigin.value,
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth
      });
    }
    function delayShow(evt) {
      if ($q.platform.is.mobile === true) {
        clearSelection();
        document.body.classList.add("non-selectable");
        const target = anchorEl.value;
        const evts = ["touchmove", "touchcancel", "touchend", "click"].map((e) => [target, e, "delayHide", "passiveCapture"]);
        addEvt(anchorEvents, "tooltipTemp", evts);
      }
      registerTimeout(() => {
        show(evt);
      }, props.delay);
    }
    function delayHide(evt) {
      if ($q.platform.is.mobile === true) {
        cleanEvt(anchorEvents, "tooltipTemp");
        clearSelection();
        setTimeout(() => {
          document.body.classList.remove("non-selectable");
        }, 10);
      }
      registerTimeout(() => {
        hide(evt);
      }, props.hideDelay);
    }
    function configureAnchorEl() {
      if (props.noParentEvent === true || anchorEl.value === null)
        return;
      const evts = $q.platform.is.mobile === true ? [
        [anchorEl.value, "touchstart", "delayShow", "passive"]
      ] : [
        [anchorEl.value, "mouseenter", "delayShow", "passive"],
        [anchorEl.value, "mouseleave", "delayHide", "passive"]
      ];
      addEvt(anchorEvents, "anchor", evts);
    }
    function configureScrollTarget() {
      if (anchorEl.value !== null || props.scrollTarget !== void 0) {
        localScrollTarget.value = getScrollTarget(anchorEl.value, props.scrollTarget);
        const fn = props.noParentEvent === true ? updatePosition : hide;
        changeScrollEvent(localScrollTarget.value, fn);
      }
    }
    function getTooltipContent() {
      return showing.value === true ? h("div", {
        ...attrs,
        ref: innerRef,
        class: [
          "q-tooltip q-tooltip--style q-position-engine no-pointer-events",
          attrs.class
        ],
        style: [
          attrs.style,
          transitionStyle.value
        ],
        role: "tooltip"
      }, hSlot(slots.default)) : null;
    }
    function renderPortalContent() {
      return h(Transition, transitionProps.value, getTooltipContent);
    }
    onBeforeUnmount(anchorCleanup);
    Object.assign(vm.proxy, { updatePosition });
    return renderPortal;
  }
});
export { QTooltip as Q };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVRvb2x0aXAuNGEzZWVmMjIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdG9vbHRpcC9RVG9vbHRpcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25CZWZvcmVVbm1vdW50LCBUcmFuc2l0aW9uLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VBbmNob3IsIHsgdXNlQW5jaG9yU3RhdGljUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1hbmNob3IvdXNlLWFuY2hvci5qcydcbmltcG9ydCB1c2VTY3JvbGxUYXJnZXQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2Utc2Nyb2xsLXRhcmdldC91c2Utc2Nyb2xsLXRhcmdldC5qcydcbmltcG9ydCB1c2VNb2RlbFRvZ2dsZSwgeyB1c2VNb2RlbFRvZ2dsZVByb3BzLCB1c2VNb2RlbFRvZ2dsZUVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtbW9kZWwtdG9nZ2xlL3VzZS1tb2RlbC10b2dnbGUuanMnXG5pbXBvcnQgdXNlUG9ydGFsIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXBvcnRhbC91c2UtcG9ydGFsLmpzJ1xuaW1wb3J0IHVzZVRyYW5zaXRpb24sIHsgdXNlVHJhbnNpdGlvblByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtdHJhbnNpdGlvbi91c2UtdHJhbnNpdGlvbi5qcydcbmltcG9ydCB1c2VUaWNrIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS10aWNrL3VzZS10aWNrLmpzJ1xuaW1wb3J0IHVzZVRpbWVvdXQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLXRpbWVvdXQvdXNlLXRpbWVvdXQuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGdldFNjcm9sbFRhcmdldCwgc2Nyb2xsVGFyZ2V0UHJvcCB9IGZyb20gJy4uLy4uL3V0aWxzL3Njcm9sbC9zY3JvbGwuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCwgYWRkRXZ0LCBjbGVhbkV2dCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgY2xlYXJTZWxlY3Rpb24gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnNlbGVjdGlvbi9zZWxlY3Rpb24uanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IGFkZENsaWNrT3V0c2lkZSwgcmVtb3ZlQ2xpY2tPdXRzaWRlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jbGljay1vdXRzaWRlL2NsaWNrLW91dHNpZGUuanMnXG5pbXBvcnQge1xuICB2YWxpZGF0ZVBvc2l0aW9uLCB2YWxpZGF0ZU9mZnNldCwgc2V0UG9zaXRpb24sIHBhcnNlUG9zaXRpb25cbn0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5wb3NpdGlvbi1lbmdpbmUvcG9zaXRpb24tZW5naW5lLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRvb2x0aXAnLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VBbmNob3JTdGF0aWNQcm9wcyxcbiAgICAuLi51c2VNb2RlbFRvZ2dsZVByb3BzLFxuICAgIC4uLnVzZVRyYW5zaXRpb25Qcm9wcyxcblxuICAgIG1heEhlaWdodDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgbWF4V2lkdGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuXG4gICAgdHJhbnNpdGlvblNob3c6IHtcbiAgICAgIC4uLnVzZVRyYW5zaXRpb25Qcm9wcy50cmFuc2l0aW9uU2hvdyxcbiAgICAgIGRlZmF1bHQ6ICdqdW1wLWRvd24nXG4gICAgfSxcbiAgICB0cmFuc2l0aW9uSGlkZToge1xuICAgICAgLi4udXNlVHJhbnNpdGlvblByb3BzLnRyYW5zaXRpb25IaWRlLFxuICAgICAgZGVmYXVsdDogJ2p1bXAtdXAnXG4gICAgfSxcblxuICAgIGFuY2hvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2JvdHRvbSBtaWRkbGUnLFxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0ZVBvc2l0aW9uXG4gICAgfSxcbiAgICBzZWxmOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAndG9wIG1pZGRsZScsXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRlUG9zaXRpb25cbiAgICB9LFxuICAgIG9mZnNldDoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICBkZWZhdWx0OiAoKSA9PiBbIDE0LCAxNCBdLFxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0ZU9mZnNldFxuICAgIH0sXG5cbiAgICBzY3JvbGxUYXJnZXQ6IHNjcm9sbFRhcmdldFByb3AsXG5cbiAgICBkZWxheToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG5cbiAgICBoaWRlRGVsYXk6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuXG4gICAgcGVyc2lzdGVudDogQm9vbGVhblxuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgLi4udXNlTW9kZWxUb2dnbGVFbWl0c1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCwgYXR0cnMgfSkge1xuICAgIGxldCB1bndhdGNoUG9zaXRpb24sIG9ic2VydmVyXG5cbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSB2bVxuXG4gICAgY29uc3QgaW5uZXJSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBzaG93aW5nID0gcmVmKGZhbHNlKVxuXG4gICAgY29uc3QgYW5jaG9yT3JpZ2luID0gY29tcHV0ZWQoKCkgPT4gcGFyc2VQb3NpdGlvbihwcm9wcy5hbmNob3IsICRxLmxhbmcucnRsKSlcbiAgICBjb25zdCBzZWxmT3JpZ2luID0gY29tcHV0ZWQoKCkgPT4gcGFyc2VQb3NpdGlvbihwcm9wcy5zZWxmLCAkcS5sYW5nLnJ0bCkpXG4gICAgY29uc3QgaGlkZU9uUm91dGVDaGFuZ2UgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5wZXJzaXN0ZW50ICE9PSB0cnVlKVxuXG4gICAgY29uc3QgeyByZWdpc3RlclRpY2ssIHJlbW92ZVRpY2sgfSA9IHVzZVRpY2soKVxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaW1lb3V0IH0gPSB1c2VUaW1lb3V0KClcbiAgICBjb25zdCB7IHRyYW5zaXRpb25Qcm9wcywgdHJhbnNpdGlvblN0eWxlIH0gPSB1c2VUcmFuc2l0aW9uKHByb3BzKVxuICAgIGNvbnN0IHsgbG9jYWxTY3JvbGxUYXJnZXQsIGNoYW5nZVNjcm9sbEV2ZW50LCB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCB9ID0gdXNlU2Nyb2xsVGFyZ2V0KHByb3BzLCBjb25maWd1cmVTY3JvbGxUYXJnZXQpXG5cbiAgICBjb25zdCB7IGFuY2hvckVsLCBjYW5TaG93LCBhbmNob3JFdmVudHMgfSA9IHVzZUFuY2hvcih7IHNob3dpbmcsIGNvbmZpZ3VyZUFuY2hvckVsIH0pXG5cbiAgICBjb25zdCB7IHNob3csIGhpZGUgfSA9IHVzZU1vZGVsVG9nZ2xlKHtcbiAgICAgIHNob3dpbmcsIGNhblNob3csIGhhbmRsZVNob3csIGhhbmRsZUhpZGUsXG4gICAgICBoaWRlT25Sb3V0ZUNoYW5nZSxcbiAgICAgIHByb2Nlc3NPbk1vdW50OiB0cnVlXG4gICAgfSlcblxuICAgIE9iamVjdC5hc3NpZ24oYW5jaG9yRXZlbnRzLCB7IGRlbGF5U2hvdywgZGVsYXlIaWRlIH0pXG5cbiAgICBjb25zdCB7IHNob3dQb3J0YWwsIGhpZGVQb3J0YWwsIHJlbmRlclBvcnRhbCB9ID0gdXNlUG9ydGFsKHZtLCBpbm5lclJlZiwgcmVuZGVyUG9ydGFsQ29udGVudCwgJ3Rvb2x0aXAnKVxuXG4gICAgLy8gaWYgd2UncmUgb24gbW9iaWxlLCBsZXQncyBpbXByb3ZlIHRoZSBleHBlcmllbmNlXG4gICAgLy8gYnkgY2xvc2luZyBpdCB3aGVuIHVzZXIgdGFwcyBvdXRzaWRlIG9mIGl0XG4gICAgaWYgKCRxLnBsYXRmb3JtLmlzLm1vYmlsZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgY2xpY2tPdXRzaWRlUHJvcHMgPSB7XG4gICAgICAgIGFuY2hvckVsLFxuICAgICAgICBpbm5lclJlZixcbiAgICAgICAgb25DbGlja091dHNpZGUgKGUpIHtcbiAgICAgICAgICBoaWRlKGUpXG5cbiAgICAgICAgICAvLyBwcmV2ZW50IGNsaWNrIGlmIGl0J3Mgb24gYSBkaWFsb2cgYmFja2Ryb3BcbiAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdxLWRpYWxvZ19fYmFja2Ryb3AnKSkge1xuICAgICAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGhhc0NsaWNrT3V0c2lkZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIC8vIGl0IGRvZXNuJ3QgaGFzIGV4dGVybmFsIG1vZGVsXG4gICAgICAgIC8vIChudWxsIGlzIHRoZSBkZWZhdWx0IHZhbHVlKVxuICAgICAgICBwcm9wcy5tb2RlbFZhbHVlID09PSBudWxsXG4gICAgICAgIC8vIGFuZCBpdCdzIG5vdCBwZXJzaXN0ZW50XG4gICAgICAgICYmIHByb3BzLnBlcnNpc3RlbnQgIT09IHRydWVcbiAgICAgICAgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgKVxuXG4gICAgICB3YXRjaChoYXNDbGlja091dHNpZGUsIHZhbCA9PiB7XG4gICAgICAgIGNvbnN0IGZuID0gdmFsID09PSB0cnVlID8gYWRkQ2xpY2tPdXRzaWRlIDogcmVtb3ZlQ2xpY2tPdXRzaWRlXG4gICAgICAgIGZuKGNsaWNrT3V0c2lkZVByb3BzKVxuICAgICAgfSlcblxuICAgICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgICAgcmVtb3ZlQ2xpY2tPdXRzaWRlKGNsaWNrT3V0c2lkZVByb3BzKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVTaG93IChldnQpIHtcbiAgICAgIHNob3dQb3J0YWwoKVxuXG4gICAgICAvLyBzaG91bGQgcmVtb3ZlVGljaygpIGlmIHRoaXMgZ2V0cyByZW1vdmVkXG4gICAgICByZWdpc3RlclRpY2soKCkgPT4ge1xuICAgICAgICBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHVwZGF0ZVBvc2l0aW9uKCkpXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoaW5uZXJSZWYudmFsdWUsIHsgYXR0cmlidXRlczogZmFsc2UsIGNoaWxkTGlzdDogdHJ1ZSwgY2hhcmFjdGVyRGF0YTogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KVxuICAgICAgICB1cGRhdGVQb3NpdGlvbigpXG4gICAgICAgIGNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgICB9KVxuXG4gICAgICBpZiAodW53YXRjaFBvc2l0aW9uID09PSB2b2lkIDApIHtcbiAgICAgICAgdW53YXRjaFBvc2l0aW9uID0gd2F0Y2goXG4gICAgICAgICAgKCkgPT4gJHEuc2NyZWVuLndpZHRoICsgJ3wnICsgJHEuc2NyZWVuLmhlaWdodCArICd8JyArIHByb3BzLnNlbGYgKyAnfCcgKyBwcm9wcy5hbmNob3IgKyAnfCcgKyAkcS5sYW5nLnJ0bCxcbiAgICAgICAgICB1cGRhdGVQb3NpdGlvblxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIC8vIHNob3VsZCByZW1vdmVUaW1lb3V0KCkgaWYgdGhpcyBnZXRzIHJlbW92ZWRcbiAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNob3dQb3J0YWwodHJ1ZSkgLy8gZG9uZSBzaG93aW5nIHBvcnRhbFxuICAgICAgICBlbWl0KCdzaG93JywgZXZ0KVxuICAgICAgfSwgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUhpZGUgKGV2dCkge1xuICAgICAgcmVtb3ZlVGljaygpXG4gICAgICBoaWRlUG9ydGFsKClcblxuICAgICAgYW5jaG9yQ2xlYW51cCgpXG5cbiAgICAgIC8vIHNob3VsZCByZW1vdmVUaW1lb3V0KCkgaWYgdGhpcyBnZXRzIHJlbW92ZWRcbiAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7XG4gICAgICAgIGhpZGVQb3J0YWwodHJ1ZSkgLy8gZG9uZSBoaWRpbmcsIG5vdyBkZXN0cm95XG4gICAgICAgIGVtaXQoJ2hpZGUnLCBldnQpXG4gICAgICB9LCBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYW5jaG9yQ2xlYW51cCAoKSB7XG4gICAgICBpZiAob2JzZXJ2ZXIgIT09IHZvaWQgMCkge1xuICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICAgICAgb2JzZXJ2ZXIgPSB2b2lkIDBcbiAgICAgIH1cblxuICAgICAgaWYgKHVud2F0Y2hQb3NpdGlvbiAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHVud2F0Y2hQb3NpdGlvbigpXG4gICAgICAgIHVud2F0Y2hQb3NpdGlvbiA9IHZvaWQgMFxuICAgICAgfVxuXG4gICAgICB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgICBjbGVhbkV2dChhbmNob3JFdmVudHMsICd0b29sdGlwVGVtcCcpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlUG9zaXRpb24gKCkge1xuICAgICAgc2V0UG9zaXRpb24oe1xuICAgICAgICB0YXJnZXRFbDogaW5uZXJSZWYudmFsdWUsXG4gICAgICAgIG9mZnNldDogcHJvcHMub2Zmc2V0LFxuICAgICAgICBhbmNob3JFbDogYW5jaG9yRWwudmFsdWUsXG4gICAgICAgIGFuY2hvck9yaWdpbjogYW5jaG9yT3JpZ2luLnZhbHVlLFxuICAgICAgICBzZWxmT3JpZ2luOiBzZWxmT3JpZ2luLnZhbHVlLFxuICAgICAgICBtYXhIZWlnaHQ6IHByb3BzLm1heEhlaWdodCxcbiAgICAgICAgbWF4V2lkdGg6IHByb3BzLm1heFdpZHRoXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlbGF5U2hvdyAoZXZ0KSB7XG4gICAgICBpZiAoJHEucGxhdGZvcm0uaXMubW9iaWxlID09PSB0cnVlKSB7XG4gICAgICAgIGNsZWFyU2VsZWN0aW9uKClcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdub24tc2VsZWN0YWJsZScpXG5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gYW5jaG9yRWwudmFsdWVcbiAgICAgICAgY29uc3QgZXZ0cyA9IFsgJ3RvdWNobW92ZScsICd0b3VjaGNhbmNlbCcsICd0b3VjaGVuZCcsICdjbGljaycgXVxuICAgICAgICAgIC5tYXAoZSA9PiAoWyB0YXJnZXQsIGUsICdkZWxheUhpZGUnLCAncGFzc2l2ZUNhcHR1cmUnIF0pKVxuXG4gICAgICAgIGFkZEV2dChhbmNob3JFdmVudHMsICd0b29sdGlwVGVtcCcsIGV2dHMpXG4gICAgICB9XG5cbiAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7IHNob3coZXZ0KSB9LCBwcm9wcy5kZWxheSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxheUhpZGUgKGV2dCkge1xuICAgICAgaWYgKCRxLnBsYXRmb3JtLmlzLm1vYmlsZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjbGVhbkV2dChhbmNob3JFdmVudHMsICd0b29sdGlwVGVtcCcpXG4gICAgICAgIGNsZWFyU2VsZWN0aW9uKClcbiAgICAgICAgLy8gZGVsYXkgbmVlZGVkIG90aGVyd2lzZSBzZWxlY3Rpb24gc3RpbGwgb2NjdXJzXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbm9uLXNlbGVjdGFibGUnKVxuICAgICAgICB9LCAxMClcbiAgICAgIH1cblxuICAgICAgLy8gc2hvdWxkIHJlbW92ZVRpbWVvdXQoKSBpZiB0aGlzIGdldHMgcmVtb3ZlZFxuICAgICAgcmVnaXN0ZXJUaW1lb3V0KCgpID0+IHsgaGlkZShldnQpIH0sIHByb3BzLmhpZGVEZWxheSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWd1cmVBbmNob3JFbCAoKSB7XG4gICAgICBpZiAocHJvcHMubm9QYXJlbnRFdmVudCA9PT0gdHJ1ZSB8fCBhbmNob3JFbC52YWx1ZSA9PT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IGV2dHMgPSAkcS5wbGF0Zm9ybS5pcy5tb2JpbGUgPT09IHRydWVcbiAgICAgICAgPyBbXG4gICAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAndG91Y2hzdGFydCcsICdkZWxheVNob3cnLCAncGFzc2l2ZScgXVxuICAgICAgICAgIF1cbiAgICAgICAgOiBbXG4gICAgICAgICAgICBbIGFuY2hvckVsLnZhbHVlLCAnbW91c2VlbnRlcicsICdkZWxheVNob3cnLCAncGFzc2l2ZScgXSxcbiAgICAgICAgICAgIFsgYW5jaG9yRWwudmFsdWUsICdtb3VzZWxlYXZlJywgJ2RlbGF5SGlkZScsICdwYXNzaXZlJyBdXG4gICAgICAgICAgXVxuXG4gICAgICBhZGRFdnQoYW5jaG9yRXZlbnRzLCAnYW5jaG9yJywgZXZ0cylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWd1cmVTY3JvbGxUYXJnZXQgKCkge1xuICAgICAgaWYgKGFuY2hvckVsLnZhbHVlICE9PSBudWxsIHx8IHByb3BzLnNjcm9sbFRhcmdldCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LnZhbHVlID0gZ2V0U2Nyb2xsVGFyZ2V0KGFuY2hvckVsLnZhbHVlLCBwcm9wcy5zY3JvbGxUYXJnZXQpXG4gICAgICAgIGNvbnN0IGZuID0gcHJvcHMubm9QYXJlbnRFdmVudCA9PT0gdHJ1ZVxuICAgICAgICAgID8gdXBkYXRlUG9zaXRpb25cbiAgICAgICAgICA6IGhpZGVcblxuICAgICAgICBjaGFuZ2VTY3JvbGxFdmVudChsb2NhbFNjcm9sbFRhcmdldC52YWx1ZSwgZm4pXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VG9vbHRpcENvbnRlbnQgKCkge1xuICAgICAgcmV0dXJuIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgICAgcmVmOiBpbm5lclJlZixcbiAgICAgICAgICBjbGFzczogW1xuICAgICAgICAgICAgJ3EtdG9vbHRpcCBxLXRvb2x0aXAtLXN0eWxlIHEtcG9zaXRpb24tZW5naW5lIG5vLXBvaW50ZXItZXZlbnRzJyxcbiAgICAgICAgICAgIGF0dHJzLmNsYXNzXG4gICAgICAgICAgXSxcbiAgICAgICAgICBzdHlsZTogW1xuICAgICAgICAgICAgYXR0cnMuc3R5bGUsXG4gICAgICAgICAgICB0cmFuc2l0aW9uU3R5bGUudmFsdWVcbiAgICAgICAgICBdLFxuICAgICAgICAgIHJvbGU6ICd0b29sdGlwJ1xuICAgICAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgICAgICAgOiBudWxsXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyUG9ydGFsQ29udGVudCAoKSB7XG4gICAgICByZXR1cm4gaChUcmFuc2l0aW9uLCB0cmFuc2l0aW9uUHJvcHMudmFsdWUsIGdldFRvb2x0aXBDb250ZW50KVxuICAgIH1cblxuICAgIG9uQmVmb3JlVW5tb3VudChhbmNob3JDbGVhbnVwKVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbih2bS5wcm94eSwgeyB1cGRhdGVQb3NpdGlvbiB9KVxuXG4gICAgcmV0dXJuIHJlbmRlclBvcnRhbFxuICB9XG59KVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQW9CQSxJQUFBLFdBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sY0FBYztBQUFBLEVBRWQsT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBRUgsV0FBVztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ1Y7QUFBQSxJQUNELFVBQVU7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFFRCxnQkFBZ0I7QUFBQSxNQUNkLEdBQUcsbUJBQW1CO0FBQUEsTUFDdEIsU0FBUztBQUFBLElBQ1Y7QUFBQSxJQUNELGdCQUFnQjtBQUFBLE1BQ2QsR0FBRyxtQkFBbUI7QUFBQSxNQUN0QixTQUFTO0FBQUEsSUFDVjtBQUFBLElBRUQsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLElBQ1o7QUFBQSxJQUNELE1BQU07QUFBQSxNQUNKLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxJQUNaO0FBQUEsSUFDRCxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixTQUFTLE1BQU0sQ0FBRSxJQUFJLEVBQUk7QUFBQSxNQUN6QixXQUFXO0FBQUEsSUFDWjtBQUFBLElBRUQsY0FBYztBQUFBLElBRWQsT0FBTztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ1Y7QUFBQSxJQUVELFdBQVc7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFFRCxZQUFZO0FB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
