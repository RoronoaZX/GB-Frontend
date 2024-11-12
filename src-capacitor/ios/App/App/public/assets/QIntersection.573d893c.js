import { am as createDirective, aW as isDeepEqual, e as createComponent, n as ref, q as isRuntimeSsrPreHydration, g as computed, h, aE as Transition, ag as hDir, j as hSlot } from "./index.c8e2405b.js";
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
export { QIntersection as Q };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUludGVyc2VjdGlvbi41NzNkODkzYy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvZGlyZWN0aXZlcy9pbnRlcnNlY3Rpb24vSW50ZXJzZWN0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9pbnRlcnNlY3Rpb24vUUludGVyc2VjdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBpc0RlZXBFcXVhbCB9IGZyb20gJy4uLy4uL3V0aWxzL2lzL2lzLmpzJ1xuaW1wb3J0IGdldFNTUlByb3BzIGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUubm9vcC1zc3ItZGlyZWN0aXZlLXRyYW5zZm9ybS9ub29wLXNzci1kaXJlY3RpdmUtdHJhbnNmb3JtLmpzJ1xuXG5jb25zdCBkZWZhdWx0Q2ZnID0ge1xuICB0aHJlc2hvbGQ6IDAsXG4gIHJvb3Q6IG51bGwsXG4gIHJvb3RNYXJnaW46ICcwcHgnXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSAoZWwsIGN0eCwgdmFsdWUpIHtcbiAgbGV0IGhhbmRsZXIsIGNmZywgY2hhbmdlZFxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBoYW5kbGVyID0gdmFsdWVcbiAgICBjZmcgPSBkZWZhdWx0Q2ZnXG4gICAgY2hhbmdlZCA9IGN0eC5jZmcgPT09IHZvaWQgMFxuICB9XG4gIGVsc2Uge1xuICAgIGhhbmRsZXIgPSB2YWx1ZS5oYW5kbGVyXG4gICAgY2ZnID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENmZywgdmFsdWUuY2ZnKVxuICAgIGNoYW5nZWQgPSBjdHguY2ZnID09PSB2b2lkIDAgfHwgaXNEZWVwRXF1YWwoY3R4LmNmZywgY2ZnKSA9PT0gZmFsc2VcbiAgfVxuXG4gIGlmIChjdHguaGFuZGxlciAhPT0gaGFuZGxlcikge1xuICAgIGN0eC5oYW5kbGVyID0gaGFuZGxlclxuICB9XG5cbiAgaWYgKGNoYW5nZWQgPT09IHRydWUpIHtcbiAgICBjdHguY2ZnID0gY2ZnXG4gICAgY3R4Lm9ic2VydmVyICE9PSB2b2lkIDAgJiYgY3R4Lm9ic2VydmVyLnVub2JzZXJ2ZShlbClcblxuICAgIGN0eC5vYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoWyBlbnRyeSBdKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGN0eC5oYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIGlmIG9ic2VydmVkIGVsZW1lbnQgaXMgcGFydCBvZiBhIHZ1ZSB0cmFuc2l0aW9uXG4gICAgICAgIC8vIHRoZW4gd2UgbmVlZCB0byBiZSBjYXJlZnVsLi4uXG4gICAgICAgIGlmIChcbiAgICAgICAgICBlbnRyeS5yb290Qm91bmRzID09PSBudWxsXG4gICAgICAgICAgJiYgZG9jdW1lbnQuYm9keS5jb250YWlucyhlbCkgPT09IHRydWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgY3R4Lm9ic2VydmVyLnVub2JzZXJ2ZShlbClcbiAgICAgICAgICBjdHgub2JzZXJ2ZXIub2JzZXJ2ZShlbClcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlcyA9IGN0eC5oYW5kbGVyKGVudHJ5LCBjdHgub2JzZXJ2ZXIpXG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHJlcyA9PT0gZmFsc2VcbiAgICAgICAgICB8fCAoY3R4Lm9uY2UgPT09IHRydWUgJiYgZW50cnkuaXNJbnRlcnNlY3RpbmcgPT09IHRydWUpXG4gICAgICAgICkge1xuICAgICAgICAgIGRlc3Ryb3koZWwpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBjZmcpXG5cbiAgICBjdHgub2JzZXJ2ZXIub2JzZXJ2ZShlbClcbiAgfVxufVxuXG5mdW5jdGlvbiBkZXN0cm95IChlbCkge1xuICBjb25zdCBjdHggPSBlbC5fX3F2aXNpYmxlXG5cbiAgaWYgKGN0eCAhPT0gdm9pZCAwKSB7XG4gICAgY3R4Lm9ic2VydmVyICE9PSB2b2lkIDAgJiYgY3R4Lm9ic2VydmVyLnVub2JzZXJ2ZShlbClcbiAgICBkZWxldGUgZWwuX19xdmlzaWJsZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZURpcmVjdGl2ZShfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgPyB7IG5hbWU6ICdpbnRlcnNlY3Rpb24nLCBnZXRTU1JQcm9wcyB9XG4gIDoge1xuICAgICAgbmFtZTogJ2ludGVyc2VjdGlvbicsXG5cbiAgICAgIG1vdW50ZWQgKGVsLCB7IG1vZGlmaWVycywgdmFsdWUgfSkge1xuICAgICAgICBjb25zdCBjdHggPSB7XG4gICAgICAgICAgb25jZTogbW9kaWZpZXJzLm9uY2UgPT09IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZShlbCwgY3R4LCB2YWx1ZSlcblxuICAgICAgICBlbC5fX3F2aXNpYmxlID0gY3R4XG4gICAgICB9LFxuXG4gICAgICB1cGRhdGVkIChlbCwgYmluZGluZykge1xuICAgICAgICBjb25zdCBjdHggPSBlbC5fX3F2aXNpYmxlXG4gICAgICAgIGN0eCAhPT0gdm9pZCAwICYmIHVwZGF0ZShlbCwgY3R4LCBiaW5kaW5nLnZhbHVlKVxuICAgICAgfSxcblxuICAgICAgYmVmb3JlVW5tb3VudDogZGVzdHJveVxuICAgIH1cbilcbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIFRyYW5zaXRpb24gfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGlzUnVudGltZVNzclByZUh5ZHJhdGlvbiB9IGZyb20gJy4uLy4uL3BsdWdpbnMvcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5cbmltcG9ydCBJbnRlcnNlY3Rpb24gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9pbnRlcnNlY3Rpb24vSW50ZXJzZWN0aW9uLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCwgaERpciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FJbnRlcnNlY3Rpb24nLFxuXG4gIHByb3BzOiB7XG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZGl2J1xuICAgIH0sXG5cbiAgICBvbmNlOiBCb29sZWFuLFxuICAgIHRyYW5zaXRpb246IFN0cmluZyxcbiAgICB0cmFuc2l0aW9uRHVyYXRpb246IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDMwMFxuICAgIH0sXG5cbiAgICBzc3JQcmVyZW5kZXI6IEJvb2xlYW4sXG5cbiAgICBtYXJnaW46IFN0cmluZyxcbiAgICB0aHJlc2hvbGQ6IFsgTnVtYmVyLCBBcnJheSBdLFxuICAgIHJvb3Q6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuXG4gICAgZGlzYWJsZTogQm9vbGVhbixcblxuICAgIG9uVmlzaWJpbGl0eTogRnVuY3Rpb25cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHNob3dpbmcgPSByZWYoaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uLnZhbHVlID09PSB0cnVlID8gcHJvcHMuc3NyUHJlcmVuZGVyIDogZmFsc2UpXG5cbiAgICBjb25zdCBpbnRlcnNlY3Rpb25Qcm9wcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLnJvb3QgIT09IHZvaWQgMCB8fCBwcm9wcy5tYXJnaW4gIT09IHZvaWQgMCB8fCBwcm9wcy50aHJlc2hvbGQgIT09IHZvaWQgMFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIGhhbmRsZXI6IHRyaWdnZXIsXG4gICAgICAgICAgICBjZmc6IHtcbiAgICAgICAgICAgICAgcm9vdDogcHJvcHMucm9vdCxcbiAgICAgICAgICAgICAgcm9vdE1hcmdpbjogcHJvcHMubWFyZ2luLFxuICAgICAgICAgICAgICB0aHJlc2hvbGQ6IHByb3BzLnRocmVzaG9sZFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgOiB0cmlnZ2VyXG4gICAgKSlcblxuICAgIGNvbnN0IGhhc0RpcmVjdGl2ZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlXG4gICAgICAmJiAoaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uLnZhbHVlICE9PSB0cnVlIHx8IHByb3BzLm9uY2UgIT09IHRydWUgfHwgcHJvcHMuc3NyUHJlcmVuZGVyICE9PSB0cnVlKVxuICAgIClcblxuICAgIGNvbnN0IGRpcmVjdGl2ZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAvLyBpZiBoYXNEaXJlY3RpdmUudmFsdWUgPT09IHRydWVcbiAgICAgIHJldHVybiBbIFtcbiAgICAgICAgSW50ZXJzZWN0aW9uLFxuICAgICAgICBpbnRlcnNlY3Rpb25Qcm9wcy52YWx1ZSxcbiAgICAgICAgdm9pZCAwLFxuICAgICAgICB7IG9uY2U6IHByb3BzLm9uY2UgfVxuICAgICAgXSBdXG4gICAgfSlcblxuICAgIGNvbnN0IHRyYW5zaXRpb25TdHlsZSA9IGNvbXB1dGVkKFxuICAgICAgKCkgPT4gYC0tcS10cmFuc2l0aW9uLWR1cmF0aW9uOiAkeyBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24gfW1zYFxuICAgIClcblxuICAgIGZ1bmN0aW9uIHRyaWdnZXIgKGVudHJ5KSB7XG4gICAgICBpZiAoc2hvd2luZy52YWx1ZSAhPT0gZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgICAgc2hvd2luZy52YWx1ZSA9IGVudHJ5LmlzSW50ZXJzZWN0aW5nXG4gICAgICAgIHByb3BzLm9uVmlzaWJpbGl0eSAhPT0gdm9pZCAwICYmIGVtaXQoJ3Zpc2liaWxpdHknLCBzaG93aW5nLnZhbHVlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgICAgaWYgKHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIFsgaCgnZGl2JywgeyBrZXk6ICdjb250ZW50Jywgc3R5bGU6IHRyYW5zaXRpb25TdHlsZS52YWx1ZSB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSkgXVxuICAgICAgfVxuXG4gICAgICBpZiAoc2xvdHMuaGlkZGVuICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIFsgaCgnZGl2JywgeyBrZXk6ICdoaWRkZW4nLCBzdHlsZTogdHJhbnNpdGlvblN0eWxlLnZhbHVlIH0sIHNsb3RzLmhpZGRlbigpKSBdXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkID0gcHJvcHMudHJhbnNpdGlvblxuICAgICAgICA/IFtcbiAgICAgICAgICAgIGgoVHJhbnNpdGlvbiwge1xuICAgICAgICAgICAgICBuYW1lOiAncS10cmFuc2l0aW9uLS0nICsgcHJvcHMudHJhbnNpdGlvblxuICAgICAgICAgICAgfSwgZ2V0Q29udGVudClcbiAgICAgICAgICBdXG4gICAgICAgIDogZ2V0Q29udGVudCgpXG5cbiAgICAgIHJldHVybiBoRGlyKFxuICAgICAgICBwcm9wcy50YWcsXG4gICAgICAgIHsgY2xhc3M6ICdxLWludGVyc2VjdGlvbicgfSxcbiAgICAgICAgY2hpbGQsXG4gICAgICAgICdtYWluJyxcbiAgICAgICAgaGFzRGlyZWN0aXZlLnZhbHVlLFxuICAgICAgICAoKSA9PiBkaXJlY3RpdmVzLnZhbHVlXG4gICAgICApXG4gICAgfVxuICB9XG59KVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFJQSxNQUFNLGFBQWE7QUFBQSxFQUNqQixXQUFXO0FBQUEsRUFDWCxNQUFNO0FBQUEsRUFDTixZQUFZO0FBQ2Q7QUFFQSxTQUFTLE9B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
