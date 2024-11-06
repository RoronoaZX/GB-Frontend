import { Q as QMenu } from "./QMenu.d2cee634.js";
import { e as createComponent, n as ref, g as computed, b6 as injectProp, G as nextTick, aS as isDeepEqual, h, k as getCurrentInstance, M as QBtn } from "./index.9b9dbcba.js";
function cloneDeep(data, hash = /* @__PURE__ */ new WeakMap()) {
  if (Object(data) !== data)
    return data;
  if (hash.has(data))
    return hash.get(data);
  const result = data instanceof Date ? new Date(data) : data instanceof RegExp ? new RegExp(data.source, data.flags) : data instanceof Set ? /* @__PURE__ */ new Set() : data instanceof Map ? /* @__PURE__ */ new Map() : typeof data.constructor !== "function" ? /* @__PURE__ */ Object.create(null) : data.prototype !== void 0 && typeof data.prototype.constructor === "function" ? data : new data.constructor();
  if (typeof data.constructor === "function" && typeof data.valueOf === "function") {
    const val = data.valueOf();
    if (Object(val) !== val) {
      const result2 = new data.constructor(val);
      hash.set(data, result2);
      return result2;
    }
  }
  hash.set(data, result);
  if (data instanceof Set) {
    data.forEach((val) => {
      result.add(cloneDeep(val, hash));
    });
  } else if (data instanceof Map) {
    data.forEach((val, key) => {
      result.set(key, cloneDeep(val, hash));
    });
  }
  return Object.assign(
    result,
    ...Object.keys(data).map((key) => ({ [key]: cloneDeep(data[key], hash) }))
  );
}
var QPopupEdit = createComponent({
  name: "QPopupEdit",
  props: {
    modelValue: {
      required: true
    },
    title: String,
    buttons: Boolean,
    labelSet: String,
    labelCancel: String,
    color: {
      type: String,
      default: "primary"
    },
    validate: {
      type: Function,
      default: () => true
    },
    autoSave: Boolean,
    cover: {
      type: Boolean,
      default: true
    },
    disable: Boolean
  },
  emits: [
    "update:modelValue",
    "save",
    "cancel",
    "beforeShow",
    "show",
    "beforeHide",
    "hide"
  ],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const menuRef = ref(null);
    const initialValue = ref("");
    const currentModel = ref("");
    let validated = false;
    const scope = computed(() => {
      return injectProp({
        initialValue: initialValue.value,
        validate: props.validate,
        set,
        cancel,
        updatePosition
      }, "value", () => currentModel.value, (val) => {
        currentModel.value = val;
      });
    });
    function set() {
      if (props.validate(currentModel.value) === false) {
        return;
      }
      if (hasModelChanged() === true) {
        emit("save", currentModel.value, initialValue.value);
        emit("update:modelValue", currentModel.value);
      }
      closeMenu();
    }
    function cancel() {
      if (hasModelChanged() === true) {
        emit("cancel", currentModel.value, initialValue.value);
      }
      closeMenu();
    }
    function updatePosition() {
      nextTick(() => {
        menuRef.value.updatePosition();
      });
    }
    function hasModelChanged() {
      return isDeepEqual(currentModel.value, initialValue.value) === false;
    }
    function closeMenu() {
      validated = true;
      menuRef.value.hide();
    }
    function onBeforeShow() {
      validated = false;
      initialValue.value = cloneDeep(props.modelValue);
      currentModel.value = cloneDeep(props.modelValue);
      emit("beforeShow");
    }
    function onShow() {
      emit("show");
    }
    function onBeforeHide() {
      if (validated === false && hasModelChanged() === true) {
        if (props.autoSave === true && props.validate(currentModel.value) === true) {
          emit("save", currentModel.value, initialValue.value);
          emit("update:modelValue", currentModel.value);
        } else {
          emit("cancel", currentModel.value, initialValue.value);
        }
      }
      emit("beforeHide");
    }
    function onHide() {
      emit("hide");
    }
    function getContent() {
      const child = slots.default !== void 0 ? [].concat(slots.default(scope.value)) : [];
      props.title && child.unshift(
        h("div", { class: "q-dialog__title q-mt-sm q-mb-sm" }, props.title)
      );
      props.buttons === true && child.push(
        h("div", { class: "q-popup-edit__buttons row justify-center no-wrap" }, [
          h(QBtn, {
            flat: true,
            color: props.color,
            label: props.labelCancel || $q.lang.label.cancel,
            onClick: cancel
          }),
          h(QBtn, {
            flat: true,
            color: props.color,
            label: props.labelSet || $q.lang.label.set,
            onClick: set
          })
        ])
      );
      return child;
    }
    Object.assign(proxy, {
      set,
      cancel,
      show(e) {
        menuRef.value !== null && menuRef.value.show(e);
      },
      hide(e) {
        menuRef.value !== null && menuRef.value.hide(e);
      },
      updatePosition
    });
    return () => {
      if (props.disable === true)
        return;
      return h(QMenu, {
        ref: menuRef,
        class: "q-popup-edit",
        cover: props.cover,
        onBeforeShow,
        onShow,
        onBeforeHide,
        onHide,
        onEscapeKey: cancel
      }, getContent);
    };
  }
});
export { QPopupEdit as Q };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVBvcHVwRWRpdC5iZjg1MjZmNi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvY2xvbmUvY2xvbmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3BvcHVwLWVkaXQvUVBvcHVwRWRpdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhZGFwdGVkIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQwMjk0MDU4XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsb25lRGVlcCAoZGF0YSwgaGFzaCA9IG5ldyBXZWFrTWFwKCkpIHtcbiAgaWYgKE9iamVjdChkYXRhKSAhPT0gZGF0YSkgcmV0dXJuIGRhdGFcbiAgaWYgKGhhc2guaGFzKGRhdGEpKSByZXR1cm4gaGFzaC5nZXQoZGF0YSlcblxuICBjb25zdCByZXN1bHQgPSBkYXRhIGluc3RhbmNlb2YgRGF0ZVxuICAgID8gbmV3IERhdGUoZGF0YSlcbiAgICA6IChkYXRhIGluc3RhbmNlb2YgUmVnRXhwXG4gICAgICAgID8gbmV3IFJlZ0V4cChkYXRhLnNvdXJjZSwgZGF0YS5mbGFncylcbiAgICAgICAgOiAoZGF0YSBpbnN0YW5jZW9mIFNldFxuICAgICAgICAgICAgPyBuZXcgU2V0KClcbiAgICAgICAgICAgIDogKGRhdGEgaW5zdGFuY2VvZiBNYXBcbiAgICAgICAgICAgICAgICA/IG5ldyBNYXAoKVxuICAgICAgICAgICAgICAgIDogKHR5cGVvZiBkYXRhLmNvbnN0cnVjdG9yICE9PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgICAgID8gT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgICAgICAgICAgICAgICAgICA6IChkYXRhLnByb3RvdHlwZSAhPT0gdm9pZCAwICYmIHR5cGVvZiBkYXRhLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyBkYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG5ldyBkYXRhLmNvbnN0cnVjdG9yKClcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICApXG5cbiAgaWYgKHR5cGVvZiBkYXRhLmNvbnN0cnVjdG9yID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkYXRhLnZhbHVlT2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zdCB2YWwgPSBkYXRhLnZhbHVlT2YoKVxuXG4gICAgaWYgKE9iamVjdCh2YWwpICE9PSB2YWwpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBkYXRhLmNvbnN0cnVjdG9yKHZhbClcblxuICAgICAgaGFzaC5zZXQoZGF0YSwgcmVzdWx0KVxuXG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxuICB9XG5cbiAgaGFzaC5zZXQoZGF0YSwgcmVzdWx0KVxuXG4gIGlmIChkYXRhIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgZGF0YS5mb3JFYWNoKHZhbCA9PiB7XG4gICAgICByZXN1bHQuYWRkKGNsb25lRGVlcCh2YWwsIGhhc2gpKVxuICAgIH0pXG4gIH1cbiAgZWxzZSBpZiAoZGF0YSBpbnN0YW5jZW9mIE1hcCkge1xuICAgIGRhdGEuZm9yRWFjaCgodmFsLCBrZXkpID0+IHtcbiAgICAgIHJlc3VsdC5zZXQoa2V5LCBjbG9uZURlZXAodmFsLCBoYXNoKSlcbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAgcmVzdWx0LFxuICAgIC4uLk9iamVjdC5rZXlzKGRhdGEpLm1hcChrZXkgPT4gKHsgWyBrZXkgXTogY2xvbmVEZWVwKGRhdGFbIGtleSBdLCBoYXNoKSB9KSlcbiAgKVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgbmV4dFRpY2ssIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFNZW51IGZyb20gJy4uL21lbnUvUU1lbnUuanMnXG5pbXBvcnQgUUJ0biBmcm9tICcuLi9idG4vUUJ0bi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IGNsb25lIGZyb20gJy4uLy4uL3V0aWxzL2Nsb25lL2Nsb25lLmpzJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwgfSBmcm9tICcuLi8uLi91dGlscy9pcy9pcy5qcydcbmltcG9ydCB7IGluamVjdFByb3AgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmluamVjdC1vYmotcHJvcC9pbmplY3Qtb2JqLXByb3AuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRUG9wdXBFZGl0JyxcblxuICBwcm9wczoge1xuICAgIG1vZGVsVmFsdWU6IHtcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICB0aXRsZTogU3RyaW5nLFxuICAgIGJ1dHRvbnM6IEJvb2xlYW4sXG4gICAgbGFiZWxTZXQ6IFN0cmluZyxcbiAgICBsYWJlbENhbmNlbDogU3RyaW5nLFxuXG4gICAgY29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdwcmltYXJ5J1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IHtcbiAgICAgIHR5cGU6IEZ1bmN0aW9uLFxuICAgICAgZGVmYXVsdDogKCkgPT4gdHJ1ZVxuICAgIH0sXG5cbiAgICBhdXRvU2F2ZTogQm9vbGVhbixcblxuICAgIC8qIG1lbnUgcHJvcHMgb3ZlcnJpZGVzICovXG4gICAgY292ZXI6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICAvKiBlbmQgb2YgbWVudSBwcm9wcyAqL1xuXG4gICAgZGlzYWJsZTogQm9vbGVhblxuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgJ3VwZGF0ZTptb2RlbFZhbHVlJywgJ3NhdmUnLCAnY2FuY2VsJyxcbiAgICAnYmVmb3JlU2hvdycsICdzaG93JywgJ2JlZm9yZUhpZGUnLCAnaGlkZSdcbiAgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICAgIGNvbnN0IG1lbnVSZWYgPSByZWYobnVsbClcblxuICAgIGNvbnN0IGluaXRpYWxWYWx1ZSA9IHJlZignJylcbiAgICBjb25zdCBjdXJyZW50TW9kZWwgPSByZWYoJycpXG5cbiAgICBsZXQgdmFsaWRhdGVkID0gZmFsc2VcblxuICAgIGNvbnN0IHNjb3BlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgcmV0dXJuIGluamVjdFByb3Aoe1xuICAgICAgICBpbml0aWFsVmFsdWU6IGluaXRpYWxWYWx1ZS52YWx1ZSxcbiAgICAgICAgdmFsaWRhdGU6IHByb3BzLnZhbGlkYXRlLFxuICAgICAgICBzZXQsXG4gICAgICAgIGNhbmNlbCxcbiAgICAgICAgdXBkYXRlUG9zaXRpb25cbiAgICAgIH0sICd2YWx1ZScsICgpID0+IGN1cnJlbnRNb2RlbC52YWx1ZSwgdmFsID0+IHsgY3VycmVudE1vZGVsLnZhbHVlID0gdmFsIH0pXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIHNldCAoKSB7XG4gICAgICBpZiAocHJvcHMudmFsaWRhdGUoY3VycmVudE1vZGVsLnZhbHVlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNNb2RlbENoYW5nZWQoKSA9PT0gdHJ1ZSkge1xuICAgICAgICBlbWl0KCdzYXZlJywgY3VycmVudE1vZGVsLnZhbHVlLCBpbml0aWFsVmFsdWUudmFsdWUpXG4gICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgY3VycmVudE1vZGVsLnZhbHVlKVxuICAgICAgfVxuXG4gICAgICBjbG9zZU1lbnUoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbmNlbCAoKSB7XG4gICAgICBpZiAoaGFzTW9kZWxDaGFuZ2VkKCkgPT09IHRydWUpIHtcbiAgICAgICAgZW1pdCgnY2FuY2VsJywgY3VycmVudE1vZGVsLnZhbHVlLCBpbml0aWFsVmFsdWUudmFsdWUpXG4gICAgICB9XG5cbiAgICAgIGNsb3NlTWVudSgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlUG9zaXRpb24gKCkge1xuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBtZW51UmVmLnZhbHVlLnVwZGF0ZVBvc2l0aW9uKClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzTW9kZWxDaGFuZ2VkICgpIHtcbiAgICAgIHJldHVybiBpc0RlZXBFcXVhbChjdXJyZW50TW9kZWwudmFsdWUsIGluaXRpYWxWYWx1ZS52YWx1ZSkgPT09IGZhbHNlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2VNZW51ICgpIHtcbiAgICAgIHZhbGlkYXRlZCA9IHRydWVcbiAgICAgIG1lbnVSZWYudmFsdWUuaGlkZSgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25CZWZvcmVTaG93ICgpIHtcbiAgICAgIHZhbGlkYXRlZCA9IGZhbHNlXG4gICAgICBpbml0aWFsVmFsdWUudmFsdWUgPSBjbG9uZShwcm9wcy5tb2RlbFZhbHVlKVxuICAgICAgY3VycmVudE1vZGVsLnZhbHVlID0gY2xvbmUocHJvcHMubW9kZWxWYWx1ZSlcbiAgICAgIGVtaXQoJ2JlZm9yZVNob3cnKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uU2hvdyAoKSB7XG4gICAgICBlbWl0KCdzaG93JylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkJlZm9yZUhpZGUgKCkge1xuICAgICAgaWYgKHZhbGlkYXRlZCA9PT0gZmFsc2UgJiYgaGFzTW9kZWxDaGFuZ2VkKCkgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKHByb3BzLmF1dG9TYXZlID09PSB0cnVlICYmIHByb3BzLnZhbGlkYXRlKGN1cnJlbnRNb2RlbC52YWx1ZSkgPT09IHRydWUpIHtcbiAgICAgICAgICBlbWl0KCdzYXZlJywgY3VycmVudE1vZGVsLnZhbHVlLCBpbml0aWFsVmFsdWUudmFsdWUpXG4gICAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBjdXJyZW50TW9kZWwudmFsdWUpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZW1pdCgnY2FuY2VsJywgY3VycmVudE1vZGVsLnZhbHVlLCBpbml0aWFsVmFsdWUudmFsdWUpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZW1pdCgnYmVmb3JlSGlkZScpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25IaWRlICgpIHtcbiAgICAgIGVtaXQoJ2hpZGUnKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgICAgY29uc3QgY2hpbGQgPSBzbG90cy5kZWZhdWx0ICE9PSB2b2lkIDBcbiAgICAgICAgPyBbXS5jb25jYXQoc2xvdHMuZGVmYXVsdChzY29wZS52YWx1ZSkpXG4gICAgICAgIDogW11cblxuICAgICAgcHJvcHMudGl0bGUgJiYgY2hpbGQudW5zaGlmdChcbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtZGlhbG9nX190aXRsZSBxLW10LXNtIHEtbWItc20nIH0sIHByb3BzLnRpdGxlKVxuICAgICAgKVxuXG4gICAgICBwcm9wcy5idXR0b25zID09PSB0cnVlICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXBvcHVwLWVkaXRfX2J1dHRvbnMgcm93IGp1c3RpZnktY2VudGVyIG5vLXdyYXAnIH0sIFtcbiAgICAgICAgICBoKFFCdG4sIHtcbiAgICAgICAgICAgIGZsYXQ6IHRydWUsXG4gICAgICAgICAgICBjb2xvcjogcHJvcHMuY29sb3IsXG4gICAgICAgICAgICBsYWJlbDogcHJvcHMubGFiZWxDYW5jZWwgfHwgJHEubGFuZy5sYWJlbC5jYW5jZWwsXG4gICAgICAgICAgICBvbkNsaWNrOiBjYW5jZWxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBoKFFCdG4sIHtcbiAgICAgICAgICAgIGZsYXQ6IHRydWUsXG4gICAgICAgICAgICBjb2xvcjogcHJvcHMuY29sb3IsXG4gICAgICAgICAgICBsYWJlbDogcHJvcHMubGFiZWxTZXQgfHwgJHEubGFuZy5sYWJlbC5zZXQsXG4gICAgICAgICAgICBvbkNsaWNrOiBzZXRcbiAgICAgICAgICB9KVxuICAgICAgICBdKVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7XG4gICAgICBzZXQsXG4gICAgICBjYW5jZWwsXG4gICAgICBzaG93IChlKSB7IG1lbnVSZWYudmFsdWUgIT09IG51bGwgJiYgbWVudVJlZi52YWx1ZS5zaG93KGUpIH0sXG4gICAgICBoaWRlIChlKSB7IG1lbnVSZWYudmFsdWUgIT09IG51bGwgJiYgbWVudVJlZi52YWx1ZS5oaWRlKGUpIH0sXG4gICAgICB1cGRhdGVQb3NpdGlvblxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHJldHVyblxuXG4gICAgICByZXR1cm4gaChRTWVudSwge1xuICAgICAgICByZWY6IG1lbnVSZWYsXG4gICAgICAgIGNsYXNzOiAncS1wb3B1cC1lZGl0JyxcbiAgICAgICAgY292ZXI6IHByb3BzLmNvdmVyLFxuICAgICAgICBvbkJlZm9yZVNob3csXG4gICAgICAgIG9uU2hvdyxcbiAgICAgICAgb25CZWZvcmVIaWRlLFxuICAgICAgICBvbkhpZGUsXG4gICAgICAgIG9uRXNjYXBlS2V5OiBjYW5jZWxcbiAgICAgIH0sIGdldENvbnRlbnQpXG4gICAgfVxuICB9XG59KVxuIl0sIm5hbWVzIjpbInJlc3VsdCIsImNsb25lIl0sIm1hcHBpbmdzIjoiOztBQUVl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
