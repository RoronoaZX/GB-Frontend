import { e as createComponent, n as ref, m as provide, U as onDeactivated, V as onActivated, z as onMounted, h, j as hSlot, k as getCurrentInstance, X as vmIsDestroyed, Y as stopAndPrevent, G as nextTick, Z as addFocusFn, $ as formKey } from "./index.c8e2405b.js";
var QForm = createComponent({
  name: "QForm",
  props: {
    autofocus: Boolean,
    noErrorFocus: Boolean,
    noResetFocus: Boolean,
    greedy: Boolean,
    onSubmit: Function
  },
  emits: ["reset", "validationSuccess", "validationError"],
  setup(props, { slots, emit }) {
    const vm = getCurrentInstance();
    const rootRef = ref(null);
    let validateIndex = 0;
    const registeredComponents = [];
    function validate(shouldFocus) {
      const focus2 = typeof shouldFocus === "boolean" ? shouldFocus : props.noErrorFocus !== true;
      const index = ++validateIndex;
      const emitEvent = (res, ref2) => {
        emit(`validation${res === true ? "Success" : "Error"}`, ref2);
      };
      const validateComponent = (comp) => {
        const valid = comp.validate();
        return typeof valid.then === "function" ? valid.then(
          (valid2) => ({ valid: valid2, comp }),
          (err) => ({ valid: false, comp, err })
        ) : Promise.resolve({ valid, comp });
      };
      const errorsPromise = props.greedy === true ? Promise.all(registeredComponents.map(validateComponent)).then((res) => res.filter((r) => r.valid !== true)) : registeredComponents.reduce(
        (acc, comp) => acc.then(() => {
          return validateComponent(comp).then((r) => {
            if (r.valid === false) {
              return Promise.reject(r);
            }
          });
        }),
        Promise.resolve()
      ).catch((error) => [error]);
      return errorsPromise.then((errors) => {
        if (errors === void 0 || errors.length === 0) {
          index === validateIndex && emitEvent(true);
          return true;
        }
        if (index === validateIndex) {
          const { comp, err } = errors[0];
          err !== void 0 && console.error(err);
          emitEvent(false, comp);
          if (focus2 === true) {
            const activeError = errors.find(({ comp: comp2 }) => typeof comp2.focus === "function" && vmIsDestroyed(comp2.$) === false);
            if (activeError !== void 0) {
              activeError.comp.focus();
            }
          }
        }
        return false;
      });
    }
    function resetValidation() {
      validateIndex++;
      registeredComponents.forEach((comp) => {
        typeof comp.resetValidation === "function" && comp.resetValidation();
      });
    }
    function submit(evt) {
      evt !== void 0 && stopAndPrevent(evt);
      const index = validateIndex + 1;
      validate().then((val) => {
        if (index === validateIndex && val === true) {
          if (props.onSubmit !== void 0) {
            emit("submit", evt);
          } else if (evt !== void 0 && evt.target !== void 0 && typeof evt.target.submit === "function") {
            evt.target.submit();
          }
        }
      });
    }
    function reset(evt) {
      evt !== void 0 && stopAndPrevent(evt);
      emit("reset");
      nextTick(() => {
        resetValidation();
        if (props.autofocus === true && props.noResetFocus !== true) {
          focus();
        }
      });
    }
    function focus() {
      addFocusFn(() => {
        if (rootRef.value === null)
          return;
        const target = rootRef.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || rootRef.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || rootRef.value.querySelector("[autofocus], [data-autofocus]") || Array.prototype.find.call(rootRef.value.querySelectorAll("[tabindex]"), (el) => el.tabIndex !== -1);
        target !== null && target !== void 0 && target.focus({ preventScroll: true });
      });
    }
    provide(formKey, {
      bindComponent(vmProxy) {
        registeredComponents.push(vmProxy);
      },
      unbindComponent(vmProxy) {
        const index = registeredComponents.indexOf(vmProxy);
        if (index !== -1) {
          registeredComponents.splice(index, 1);
        }
      }
    });
    let shouldActivate = false;
    onDeactivated(() => {
      shouldActivate = true;
    });
    onActivated(() => {
      shouldActivate === true && props.autofocus === true && focus();
    });
    onMounted(() => {
      props.autofocus === true && focus();
    });
    Object.assign(vm.proxy, {
      validate,
      resetValidation,
      submit,
      reset,
      focus,
      getValidationComponents: () => registeredComponents
    });
    return () => h("form", {
      class: "q-form",
      ref: rootRef,
      onSubmit: submit,
      onReset: reset
    }, hSlot(slots.default));
  }
});
export { QForm as Q };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUZvcm0uNmM2MTI0YmIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvZm9ybS9RRm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCByZWYsIG9uQWN0aXZhdGVkLCBvbkRlYWN0aXZhdGVkLCBvbk1vdW50ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSwgbmV4dFRpY2ssIHByb3ZpZGUgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5pbXBvcnQgeyBhZGRGb2N1c0ZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5mb2N1cy9mb2N1cy1tYW5hZ2VyLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5pbXBvcnQgeyBmb3JtS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zeW1ib2xzL3N5bWJvbHMuanMnXG5pbXBvcnQgeyB2bUlzRGVzdHJveWVkIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS52bS92bS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FGb3JtJyxcblxuICBwcm9wczoge1xuICAgIGF1dG9mb2N1czogQm9vbGVhbixcbiAgICBub0Vycm9yRm9jdXM6IEJvb2xlYW4sXG4gICAgbm9SZXNldEZvY3VzOiBCb29sZWFuLFxuICAgIGdyZWVkeTogQm9vbGVhbixcblxuICAgIG9uU3VibWl0OiBGdW5jdGlvblxuICB9LFxuXG4gIGVtaXRzOiBbICdyZXNldCcsICd2YWxpZGF0aW9uU3VjY2VzcycsICd2YWxpZGF0aW9uRXJyb3InIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuXG4gICAgbGV0IHZhbGlkYXRlSW5kZXggPSAwXG4gICAgY29uc3QgcmVnaXN0ZXJlZENvbXBvbmVudHMgPSBbXVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUgKHNob3VsZEZvY3VzKSB7XG4gICAgICBjb25zdCBmb2N1cyA9IHR5cGVvZiBzaG91bGRGb2N1cyA9PT0gJ2Jvb2xlYW4nXG4gICAgICAgID8gc2hvdWxkRm9jdXNcbiAgICAgICAgOiBwcm9wcy5ub0Vycm9yRm9jdXMgIT09IHRydWVcblxuICAgICAgY29uc3QgaW5kZXggPSArK3ZhbGlkYXRlSW5kZXhcblxuICAgICAgY29uc3QgZW1pdEV2ZW50ID0gKHJlcywgcmVmKSA9PiB7XG4gICAgICAgIGVtaXQoYHZhbGlkYXRpb24keyByZXMgPT09IHRydWUgPyAnU3VjY2VzcycgOiAnRXJyb3InIH1gLCByZWYpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZhbGlkYXRlQ29tcG9uZW50ID0gY29tcCA9PiB7XG4gICAgICAgIGNvbnN0IHZhbGlkID0gY29tcC52YWxpZGF0ZSgpXG5cbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWxpZC50aGVuID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgPyB2YWxpZC50aGVuKFxuICAgICAgICAgICAgdmFsaWQgPT4gKHsgdmFsaWQsIGNvbXAgfSksXG4gICAgICAgICAgICBlcnIgPT4gKHsgdmFsaWQ6IGZhbHNlLCBjb21wLCBlcnIgfSlcbiAgICAgICAgICApXG4gICAgICAgICAgOiBQcm9taXNlLnJlc29sdmUoeyB2YWxpZCwgY29tcCB9KVxuICAgICAgfVxuXG4gICAgICBjb25zdCBlcnJvcnNQcm9taXNlID0gcHJvcHMuZ3JlZWR5ID09PSB0cnVlXG4gICAgICAgID8gUHJvbWlzZVxuICAgICAgICAgIC5hbGwocmVnaXN0ZXJlZENvbXBvbmVudHMubWFwKHZhbGlkYXRlQ29tcG9uZW50KSlcbiAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmZpbHRlcihyID0+IHIudmFsaWQgIT09IHRydWUpKVxuICAgICAgICA6IHJlZ2lzdGVyZWRDb21wb25lbnRzXG4gICAgICAgICAgLnJlZHVjZShcbiAgICAgICAgICAgIChhY2MsIGNvbXApID0+IGFjYy50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRlQ29tcG9uZW50KGNvbXApLnRoZW4ociA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHIudmFsaWQgPT09IGZhbHNlKSB7IHJldHVybiBQcm9taXNlLnJlamVjdChyKSB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBbIGVycm9yIF0pXG5cbiAgICAgIHJldHVybiBlcnJvcnNQcm9taXNlLnRoZW4oZXJyb3JzID0+IHtcbiAgICAgICAgaWYgKGVycm9ycyA9PT0gdm9pZCAwIHx8IGVycm9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBpbmRleCA9PT0gdmFsaWRhdGVJbmRleCAmJiBlbWl0RXZlbnQodHJ1ZSlcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgbm90IG91dGRhdGVkIGFscmVhZHlcbiAgICAgICAgaWYgKGluZGV4ID09PSB2YWxpZGF0ZUluZGV4KSB7XG4gICAgICAgICAgY29uc3QgeyBjb21wLCBlcnIgfSA9IGVycm9yc1sgMCBdXG5cbiAgICAgICAgICBlcnIgIT09IHZvaWQgMCAmJiBjb25zb2xlLmVycm9yKGVycilcbiAgICAgICAgICBlbWl0RXZlbnQoZmFsc2UsIGNvbXApXG5cbiAgICAgICAgICBpZiAoZm9jdXMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vIFRyeSB0byBmb2N1cyBmaXJzdCBtb3VudGVkIGFuZCBhY3RpdmUgY29tcG9uZW50XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVFcnJvciA9IGVycm9ycy5maW5kKCh7IGNvbXAgfSkgPT4gKFxuICAgICAgICAgICAgICB0eXBlb2YgY29tcC5mb2N1cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAmJiB2bUlzRGVzdHJveWVkKGNvbXAuJCkgPT09IGZhbHNlXG4gICAgICAgICAgICApKVxuXG4gICAgICAgICAgICBpZiAoYWN0aXZlRXJyb3IgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICBhY3RpdmVFcnJvci5jb21wLmZvY3VzKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzZXRWYWxpZGF0aW9uICgpIHtcbiAgICAgIHZhbGlkYXRlSW5kZXgrK1xuXG4gICAgICByZWdpc3RlcmVkQ29tcG9uZW50cy5mb3JFYWNoKGNvbXAgPT4ge1xuICAgICAgICB0eXBlb2YgY29tcC5yZXNldFZhbGlkYXRpb24gPT09ICdmdW5jdGlvbicgJiYgY29tcC5yZXNldFZhbGlkYXRpb24oKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdWJtaXQgKGV2dCkge1xuICAgICAgZXZ0ICE9PSB2b2lkIDAgJiYgc3RvcEFuZFByZXZlbnQoZXZ0KVxuXG4gICAgICBjb25zdCBpbmRleCA9IHZhbGlkYXRlSW5kZXggKyAxXG5cbiAgICAgIHZhbGlkYXRlKCkudGhlbih2YWwgPT4ge1xuICAgICAgICAvLyBpZiBub3Qgb3V0ZGF0ZWQgJiYgdmFsaWRhdGlvbiBzdWNjZWVkZWRcbiAgICAgICAgaWYgKGluZGV4ID09PSB2YWxpZGF0ZUluZGV4ICYmIHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGlmIChwcm9wcy5vblN1Ym1pdCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBlbWl0KCdzdWJtaXQnLCBldnQpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGV2dCAhPT0gdm9pZCAwICYmIGV2dC50YXJnZXQgIT09IHZvaWQgMCAmJiB0eXBlb2YgZXZ0LnRhcmdldC5zdWJtaXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2dC50YXJnZXQuc3VibWl0KClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzZXQgKGV2dCkge1xuICAgICAgZXZ0ICE9PSB2b2lkIDAgJiYgc3RvcEFuZFByZXZlbnQoZXZ0KVxuXG4gICAgICBlbWl0KCdyZXNldCcpXG5cbiAgICAgIG5leHRUaWNrKCgpID0+IHsgLy8gYWxsb3cgdXNlcmxhbmQgdG8gcmVzZXQgdmFsdWVzIGJlZm9yZVxuICAgICAgICByZXNldFZhbGlkYXRpb24oKVxuICAgICAgICBpZiAocHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlICYmIHByb3BzLm5vUmVzZXRGb2N1cyAhPT0gdHJ1ZSkge1xuICAgICAgICAgIGZvY3VzKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb2N1cyAoKSB7XG4gICAgICBhZGRGb2N1c0ZuKCgpID0+IHtcbiAgICAgICAgaWYgKHJvb3RSZWYudmFsdWUgPT09IG51bGwpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHJvb3RSZWYudmFsdWUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c11bdGFiaW5kZXhdLCBbZGF0YS1hdXRvZm9jdXNdW3RhYmluZGV4XScpXG4gICAgICAgICAgfHwgcm9vdFJlZi52YWx1ZS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXSBbdGFiaW5kZXhdLCBbZGF0YS1hdXRvZm9jdXNdIFt0YWJpbmRleF0nKVxuICAgICAgICAgIHx8IHJvb3RSZWYudmFsdWUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10sIFtkYXRhLWF1dG9mb2N1c10nKVxuICAgICAgICAgIHx8IEFycmF5LnByb3RvdHlwZS5maW5kLmNhbGwocm9vdFJlZi52YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKCdbdGFiaW5kZXhdJyksIGVsID0+IGVsLnRhYkluZGV4ICE9PSAtMSlcblxuICAgICAgICB0YXJnZXQgIT09IG51bGwgJiYgdGFyZ2V0ICE9PSB2b2lkIDAgJiYgdGFyZ2V0LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBwcm92aWRlKGZvcm1LZXksIHtcbiAgICAgIGJpbmRDb21wb25lbnQgKHZtUHJveHkpIHtcbiAgICAgICAgcmVnaXN0ZXJlZENvbXBvbmVudHMucHVzaCh2bVByb3h5KVxuICAgICAgfSxcblxuICAgICAgdW5iaW5kQ29tcG9uZW50ICh2bVByb3h5KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcmVnaXN0ZXJlZENvbXBvbmVudHMuaW5kZXhPZih2bVByb3h5KVxuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgcmVnaXN0ZXJlZENvbXBvbmVudHMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIGxldCBzaG91bGRBY3RpdmF0ZSA9IGZhbHNlXG5cbiAgICBvbkRlYWN0aXZhdGVkKCgpID0+IHtcbiAgICAgIHNob3VsZEFjdGl2YXRlID0gdHJ1ZVxuICAgIH0pXG5cbiAgICBvbkFjdGl2YXRlZCgoKSA9PiB7XG4gICAgICBzaG91bGRBY3RpdmF0ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgJiYgZm9jdXMoKVxuICAgIH0pXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlICYmIGZvY3VzKClcbiAgICB9KVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbih2bS5wcm94eSwge1xuICAgICAgdmFsaWRhdGUsXG4gICAgICByZXNldFZhbGlkYXRpb24sXG4gICAgICBzdWJtaXQsXG4gICAgICByZXNldCxcbiAgICAgIGZvY3VzLFxuICAgICAgZ2V0VmFsaWRhdGlvbkNvbXBvbmVudHM6ICgpID0+IHJlZ2lzdGVyZWRDb21wb25lbnRzXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKCdmb3JtJywge1xuICAgICAgY2xhc3M6ICdxLWZvcm0nLFxuICAgICAgcmVmOiByb290UmVmLFxuICAgICAgb25TdWJtaXQ6IHN1Ym1pdCxcbiAgICAgIG9uUmVzZXQ6IHJlc2V0XG4gICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iXSwibmFtZXMiOlsiZm9jdXMiLCJyZWYiLCJ2YWxpZCIsImNvbXAiXSwibWFwcGluZ3MiOiI7QUFTQSxJQUFBLFFBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsV0FBVztBQUFBLElBQ1gsY0FBYztBQUFBLElBQ2QsY0FBYztBQUFBLElBQ2QsUUFBUTtBQUFBLElBRVIsVUFBVTtBQUFBLEVBQ1g7QUFBQSxFQUVELE9BQU8sQ0FBRSxTQUFTLHFCQUFxQixpQkFBbUI7QUFBQSxFQUUxRCxNQUFPLE9BQU8sRUFBRSxPQUFPLEtBQUksR0FBSTtBQUM3QixVQUFNLEtBQUssbUJBQW9CO0FBQy9CLFVBQU0sVUFBVSxJQUFJLElBQUk7QUFFeEIsUUFBSSxnQkFBZ0I7QUFDcEIsVUFBTSx1QkFBdUIsQ0FBRTtBQUUvQixhQUFTLFNBQVUsYUFBYTtBQUM5QixZQUFNQSxTQUFRLE9BQU8sZ0JBQWdCLFlBQ2pDLGNBQ0EsTUFBTSxpQkFBaUI7QUFFM0IsWUFBTSxRQUFRLEVBQUU7QUFFaEIsWUFBTSxZQUFZLENBQUMsS0FBS0MsU0FBUTtBQUM5QixhQUFLLGFBQWMsUUFBUSxPQUFPLFlBQVksV0FBWUEsSUFBRztBQUFBLE1BQzlEO0FBRUQsWUFBTSxvQkFBb0IsVUFBUTtBQUNoQyxjQUFNLFFBQVEsS0FBSyxTQUFVO0FBRTdCLGVBQU8s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
