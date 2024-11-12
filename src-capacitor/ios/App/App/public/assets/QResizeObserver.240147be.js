import { n as ref, q as isRuntimeSsrPreHydration, z as onMounted, e as createComponent, A as onBeforeUnmount, B as noop, G as nextTick, h, k as getCurrentInstance, D as listenOpts } from "./index.c8e2405b.js";
function useHydration() {
  const isHydrated = ref(!isRuntimeSsrPreHydration.value);
  if (isHydrated.value === false) {
    onMounted(() => {
      isHydrated.value = true;
    });
  }
  return { isHydrated };
}
const hasObserver = typeof ResizeObserver !== "undefined";
const resizeProps = hasObserver === true ? {} : {
  style: "display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",
  url: "about:blank"
};
var QResizeObserver = createComponent({
  name: "QResizeObserver",
  props: {
    debounce: {
      type: [String, Number],
      default: 100
    }
  },
  emits: ["resize"],
  setup(props, { emit }) {
    let timer = null, targetEl, size = { width: -1, height: -1 };
    function trigger(immediately) {
      if (immediately === true || props.debounce === 0 || props.debounce === "0") {
        emitEvent();
      } else if (timer === null) {
        timer = setTimeout(emitEvent, props.debounce);
      }
    }
    function emitEvent() {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      if (targetEl) {
        const { offsetWidth: width, offsetHeight: height } = targetEl;
        if (width !== size.width || height !== size.height) {
          size = { width, height };
          emit("resize", size);
        }
      }
    }
    const { proxy } = getCurrentInstance();
    proxy.trigger = trigger;
    if (hasObserver === true) {
      let observer;
      const init = (stop) => {
        targetEl = proxy.$el.parentNode;
        if (targetEl) {
          observer = new ResizeObserver(trigger);
          observer.observe(targetEl);
          emitEvent();
        } else if (stop !== true) {
          nextTick(() => {
            init(true);
          });
        }
      };
      onMounted(() => {
        init();
      });
      onBeforeUnmount(() => {
        timer !== null && clearTimeout(timer);
        if (observer !== void 0) {
          if (observer.disconnect !== void 0) {
            observer.disconnect();
          } else if (targetEl) {
            observer.unobserve(targetEl);
          }
        }
      });
      return noop;
    } else {
      let cleanup = function() {
        if (timer !== null) {
          clearTimeout(timer);
          timer = null;
        }
        if (curDocView !== void 0) {
          if (curDocView.removeEventListener !== void 0) {
            curDocView.removeEventListener("resize", trigger, listenOpts.passive);
          }
          curDocView = void 0;
        }
      }, onObjLoad = function() {
        cleanup();
        if (targetEl && targetEl.contentDocument) {
          curDocView = targetEl.contentDocument.defaultView;
          curDocView.addEventListener("resize", trigger, listenOpts.passive);
          emitEvent();
        }
      };
      const { isHydrated } = useHydration();
      let curDocView;
      onMounted(() => {
        nextTick(() => {
          targetEl = proxy.$el;
          targetEl && onObjLoad();
        });
      });
      onBeforeUnmount(cleanup);
      return () => {
        if (isHydrated.value === true) {
          return h("object", {
            class: "q--avoid-card-border",
            style: resizeProps.style,
            tabindex: -1,
            type: "text/html",
            data: resizeProps.url,
            "aria-hidden": "true",
            onLoad: onObjLoad
          });
        }
      };
    }
  }
});
export { QResizeObserver as Q };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVJlc2l6ZU9ic2VydmVyLjI0MDE0N2JlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtaHlkcmF0aW9uL3VzZS1oeWRyYXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3Jlc2l6ZS1vYnNlcnZlci9RUmVzaXplT2JzZXJ2ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVmLCBvbk1vdW50ZWQgfSBmcm9tICd2dWUnXG5cbi8vIHVzaW5nIGl0IHRvIG1hbmFnZSBTU1IgcmVuZGVyaW5nIHdpdGggYmVzdCBwZXJmb3JtYW5jZVxuaW1wb3J0IHsgaXNSdW50aW1lU3NyUHJlSHlkcmF0aW9uIH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9wbGF0Zm9ybS9QbGF0Zm9ybS5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBjb25zdCBpc0h5ZHJhdGVkID0gcmVmKCFpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24udmFsdWUpXG5cbiAgaWYgKGlzSHlkcmF0ZWQudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIGlzSHlkcmF0ZWQudmFsdWUgPSB0cnVlXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiB7IGlzSHlkcmF0ZWQgfVxufVxuIiwiaW1wb3J0IHsgaCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSwgbmV4dFRpY2sgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VIeWRyYXRpb24gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLWh5ZHJhdGlvbi91c2UtaHlkcmF0aW9uLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBsaXN0ZW5PcHRzLCBub29wIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5cbmNvbnN0IGhhc09ic2VydmVyID0gdHlwZW9mIFJlc2l6ZU9ic2VydmVyICE9PSAndW5kZWZpbmVkJ1xuY29uc3QgcmVzaXplUHJvcHMgPSBoYXNPYnNlcnZlciA9PT0gdHJ1ZVxuICA/IHt9XG4gIDoge1xuICAgICAgc3R5bGU6ICdkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtyaWdodDowO2JvdHRvbTowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7b3ZlcmZsb3c6aGlkZGVuO3BvaW50ZXItZXZlbnRzOm5vbmU7ei1pbmRleDotMTsnLFxuICAgICAgdXJsOiAnYWJvdXQ6YmxhbmsnXG4gICAgfVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVJlc2l6ZU9ic2VydmVyJyxcblxuICBwcm9wczoge1xuICAgIGRlYm91bmNlOiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgICBkZWZhdWx0OiAxMDBcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3Jlc2l6ZScgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgZW1pdCB9KSB7XG4gICAgaWYgKF9fUVVBU0FSX1NTUl9TRVJWRVJfXykgeyByZXR1cm4gbm9vcCB9XG5cbiAgICBsZXQgdGltZXIgPSBudWxsLCB0YXJnZXRFbCwgc2l6ZSA9IHsgd2lkdGg6IC0xLCBoZWlnaHQ6IC0xIH1cblxuICAgIGZ1bmN0aW9uIHRyaWdnZXIgKGltbWVkaWF0ZWx5KSB7XG4gICAgICBpZiAoaW1tZWRpYXRlbHkgPT09IHRydWUgfHwgcHJvcHMuZGVib3VuY2UgPT09IDAgfHwgcHJvcHMuZGVib3VuY2UgPT09ICcwJykge1xuICAgICAgICBlbWl0RXZlbnQoKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGltZXIgPT09IG51bGwpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGVtaXRFdmVudCwgcHJvcHMuZGVib3VuY2UpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW1pdEV2ZW50ICgpIHtcbiAgICAgIGlmICh0aW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBpZiAodGFyZ2V0RWwpIHtcbiAgICAgICAgY29uc3QgeyBvZmZzZXRXaWR0aDogd2lkdGgsIG9mZnNldEhlaWdodDogaGVpZ2h0IH0gPSB0YXJnZXRFbFxuXG4gICAgICAgIGlmICh3aWR0aCAhPT0gc2l6ZS53aWR0aCB8fCBoZWlnaHQgIT09IHNpemUuaGVpZ2h0KSB7XG4gICAgICAgICAgc2l6ZSA9IHsgd2lkdGgsIGhlaWdodCB9XG4gICAgICAgICAgZW1pdCgncmVzaXplJywgc2l6ZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZFxuICAgIHByb3h5LnRyaWdnZXIgPSB0cmlnZ2VyXG5cbiAgICBpZiAoaGFzT2JzZXJ2ZXIgPT09IHRydWUpIHtcbiAgICAgIGxldCBvYnNlcnZlclxuXG4gICAgICAvLyBpbml0aWFsaXplIGFzIHNvb24gYXMgcG9zc2libGVcbiAgICAgIGNvbnN0IGluaXQgPSBzdG9wID0+IHtcbiAgICAgICAgdGFyZ2V0RWwgPSBwcm94eS4kZWwucGFyZW50Tm9kZVxuXG4gICAgICAgIGlmICh0YXJnZXRFbCkge1xuICAgICAgICAgIG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKHRyaWdnZXIpXG4gICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXRFbClcbiAgICAgICAgICBlbWl0RXZlbnQoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0b3AgIT09IHRydWUpIHtcbiAgICAgICAgICBuZXh0VGljaygoKSA9PiB7IGluaXQodHJ1ZSkgfSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvbk1vdW50ZWQoKCkgPT4geyBpbml0KCkgfSlcblxuICAgICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgICAgdGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KHRpbWVyKVxuXG4gICAgICAgIGlmIChvYnNlcnZlciAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgaWYgKG9ic2VydmVyLmRpc2Nvbm5lY3QgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKHRhcmdldEVsKSB7IC8vIEZGIGZvciBBbmRyb2lkXG4gICAgICAgICAgICBvYnNlcnZlci51bm9ic2VydmUodGFyZ2V0RWwpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gbm9vcFxuICAgIH1cbiAgICBlbHNlIHsgLy8gbm8gb2JzZXJ2ZXIsIHNvIGZhbGxiYWNrIHRvIG9sZCBpZnJhbWUgbWV0aG9kXG4gICAgICBjb25zdCB7IGlzSHlkcmF0ZWQgfSA9IHVzZUh5ZHJhdGlvbigpXG5cbiAgICAgIGxldCBjdXJEb2NWaWV3XG5cbiAgICAgIGZ1bmN0aW9uIGNsZWFudXAgKCkge1xuICAgICAgICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgICAgdGltZXIgPSBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VyRG9jVmlldyAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgLy8gaU9TIGlzIGZ1enp5LCBuZWVkIHRvIGNoZWNrIGl0IGZpcnN0XG4gICAgICAgICAgaWYgKGN1ckRvY1ZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lciAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBjdXJEb2NWaWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRyaWdnZXIsIGxpc3Rlbk9wdHMucGFzc2l2ZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VyRG9jVmlldyA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uT2JqTG9hZCAoKSB7XG4gICAgICAgIGNsZWFudXAoKVxuXG4gICAgICAgIGlmICh0YXJnZXRFbCAmJiB0YXJnZXRFbC5jb250ZW50RG9jdW1lbnQpIHtcbiAgICAgICAgICBjdXJEb2NWaWV3ID0gdGFyZ2V0RWwuY29udGVudERvY3VtZW50LmRlZmF1bHRWaWV3XG4gICAgICAgICAgY3VyRG9jVmlldy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0cmlnZ2VyLCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG4gICAgICAgICAgZW1pdEV2ZW50KClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgdGFyZ2V0RWwgPSBwcm94eS4kZWxcbiAgICAgICAgICB0YXJnZXRFbCAmJiBvbk9iakxvYWQoKVxuICAgICAgICB9KVxuICAgICAgfSlcblxuICAgICAgb25CZWZvcmVVbm1vdW50KGNsZWFudXApXG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChpc0h5ZHJhdGVkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIGgoJ29iamVjdCcsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS0tYXZvaWQtY2FyZC1ib3JkZXInLFxuICAgICAgICAgICAgc3R5bGU6IHJlc2l6ZVByb3BzLnN0eWxlLFxuICAgICAgICAgICAgdGFiaW5kZXg6IC0xLCAvLyBmaXggZm9yIEZpcmVmb3hcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0L2h0bWwnLFxuICAgICAgICAgICAgZGF0YTogcmVzaXplUHJvcHMudXJsLFxuICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICAgICAgICAgICAgb25Mb2FkOiBvbk9iakxvYWRcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFLZSxTQUFBLGVBQVk7QUFDekIsUUFBTSxhQUFhLElBQUksQ0FBQyx5QkFBeUIsS0FBSztBQUV0RCxNQUFJLFdBQVcsVUFBVSxPQUFPO0FBQzlCLGNBQVUsTUFBTTtBQUNkLGlCQUFXLFFBQVE7QUFBQSxJQUN6QixDQUFLO0FBQUEsRUFDRjtBQUVELFNBQU8sRUFBRSxXQUFZO0FBQ3ZCO0FDUkEsTUFBTSxjQUFjLE9BQU8sbUJBQW1CO0FBQzlDLE1BQU0sY0FBYyxnQkFBZ0IsT0FDaEMsQ0FBRSxJQUNGO0FBQUEsRUFDRSxPQUFPO0FBQUEsRUFDUCxLQUFLO0FBQ047QUFFTCxJQUFBLGtCQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLFVBQVU7QUFBQSxNQUNSLE1BQU0sQ0FBRSxRQUFRLE1BQVE7QUFBQSxNQUN4QixTQUFTO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFBQSxFQUVELE9BQU8sQ0FBRSxRQUFVO0FBQUEsRUFFbkIsTUFBTyxPQUFPLEVBQUUsUUFBUTtBQUd0QixRQUFJLFFBQVEsTUFBTSxVQUFVLE9BQU8sRUFBRSxPQUFPLElBQUksUUFBUSxHQUFJO0FBRTVELGFBQVMsUUFBUyxhQUFhO0FBQzdCLFVBQUksZ0JBQWdCLFFBQVEsTUFBTSxhQUFhLEtBQUssTUFBTSxhQUFhLEtBQUs7QUFDMUUsa0JBQVc7QUFBQSxNQUNaLFdBQ1EsVUFBVSxNQUFNO0FBQ3ZCLGdCQUFRLFdBQVcsV0FBVyxNQUFNLFFBQVE7QUFBQSxNQUM3QztBQUFBLElBQ0Y7QUFFRCxhQUFTLFlBQWE7QUFDcEIsVUFBSSxVQUFVLE1BQU07QUFDbEIscUJBQWEsS0FBSztBQUNsQixnQkFBUTtBQUFBLE1BQ1Q7QUFFRCxVQUFJLFVBQVU7QUFDWixjQUFNLEVBQUUsYUFBYSxPQUFPLGNBQWMsT0FBUSxJQUFHO0FBRXJELFlBQUksVUFBVSxLQUFLLFNBQVMsV0FBVyxLQUFLLFFBQVE7QUFDbEQsaUJBQU8sRUFBRSxPQUFPLE9BQVE7QUFDeEIsZUFBSyxVQUFVLElBQUk7QUFBQSxRQUNwQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUQsVUFBTSxFQUFFLE1BQU8sSUFBRyxtQkFBb0I7QUFHdEMsVUFBTSxVQUFVO0FBRWhCLFFBQUksZ0JBQWdCLE1BQU07QUFDeEIsVUFBSTtBQUdKLFlBQU0sT0FBTyxVQUFRO0FBQ25CLG1CQUFXLE1BQU0sSUFBSTtBQUVyQixZQUFJLFVBQVU7QUFDWixxQkFBVyxJQUFJLGVBQWUsT0FBTztBQUNyQyxtQkFBUyxRQUFRLFFBQVE7QUFDekIsb0JBQVc7QUFBQSxRQUNaLFdBQ1EsU0FBUyxNQUFNO0FBQ3RCLG1CQUFTLE1BQU07QUFBRSxpQkFBSyxJQUFJO0FBQUEsVUFBQyxDQUFFO0FBQUEsUUFDOUI7QUFBQSxNQUNGO0FBRUQsZ0JBQVUsTUFBTTtBQUFFLGFBQUk7QUFBQSxPQUFJO0FBRTFCLHNCQUFnQixNQUFNO0FBQ3BCLGtCQUFVLFFBQVEsYUFBYSxLQUFLO0FBRXBDLFlBQUksYUFBYSxRQUFRO0FBQ3ZCLGNBQUksU0FBUyxlQUFlLFFBQVE7QUFDbEMscUJBQVMsV0FBWTtBQUFBLFVBQ3RCLFdBQ1EsVUFBVTtBQUNqQixxQkFBUyxVQUFVLFFBQVE7QUFBQSxVQUM1QjtBQUFBLFFBQ0Y7QUFBQSxNQUNULENBQU87QUFFRCxhQUFPO0FBQUEsSUFDUixPQUNJO0FBS0gsVUFBUyxVQUFULFdBQW9CO0FBQ2xCLFlBQUksVUFBVSxNQUFNO0FBQ2xCLHVCQUFhLEtBQUs7QUFDbEIsa0JBQVE7QUFBQSxRQUNUO0FBRUQsWUFBSSxlQUFlLFFBQVE7QUFFekIsY0FBSSxXQUFXLHdCQUF3QixRQUFRO0FBQzdDLHVCQUFXLG9CQUFvQixVQUFVLFNBQVMsV0FBVyxPQUFPO0FBQUEsVUFDckU7QUFDRCx1QkFBYTtBQUFBLFFBQ2Q7QUFBQSxNQUNGLEdBRVEsWUFBVCxXQUFzQjtBQUNwQixnQkFBUztBQUVULFlBQUksWUFBWSxTQUFTLGlCQUFpQjtBQUN4Qyx1QkFBYSxTQUFTLGdCQUFnQjtBQUN0QyxxQkFBVyxpQkFBaUIsVUFBVSxTQUFTLFdBQVcsT0FBTztBQUNqRSxvQkFBVztBQUFBLFFBQ1o7QUFBQSxNQUNGO0FBM0JELFlBQU0sRUFBRSxXQUFZLElBQUcsYUFBYztBQUVyQyxVQUFJO0FBMkJKLGdCQUFVLE1BQU07QUFDZCxpQkFBUyxNQUFNO0FBQ2IscUJBQVcsTUFBTTtBQUNqQixzQkFBWSxVQUFXO0FBQUEsUUFDakMsQ0FBUztBQUFBLE1BQ1QsQ0FBTztBQUVELHNCQUFnQixPQUFPO0FBRXZCLGFBQU8sTUFBTTtBQUNYLFlBQUksV0FBVyxVQUFVLE1BQU07QUFDN0IsaUJBQU8sRUFBRSxVQUFVO0FBQUEsWUFDakIsT0FBTztBQUFBLFlBQ1AsT0FBTyxZQUFZO0FBQUEsWUFDbkIsVUFBVTtBQUFBLFlBQ1YsTUFBTTtBQUFBLFlBQ04sTUFBTSxZQUFZO0FBQUEsWUFDbEIsZUFBZTtBQUFBLFlBQ2YsUUFBUTtBQUFBLFVBQ3BCLENBQVc7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0gsQ0FBQzs7In0=
