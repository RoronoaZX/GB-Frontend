import { e as createComponent, a9 as useDarkProps, aY as useSizeProps, ab as useDark, aZ as useSize, g as computed, ag as hDir, k as getCurrentInstance, h, L as QIcon, b9 as hMergeSlotSafely, ba as Ripple, V as stopAndPrevent } from "./index.9b9dbcba.js";
const defaultSizes = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};
var QChip = createComponent({
  name: "QChip",
  props: {
    ...useDarkProps,
    ...useSizeProps,
    dense: Boolean,
    icon: String,
    iconRight: String,
    iconRemove: String,
    iconSelected: String,
    label: [String, Number],
    color: String,
    textColor: String,
    modelValue: {
      type: Boolean,
      default: true
    },
    selected: {
      type: Boolean,
      default: null
    },
    square: Boolean,
    outline: Boolean,
    clickable: Boolean,
    removable: Boolean,
    removeAriaLabel: String,
    tabindex: [String, Number],
    disable: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },
  emits: ["update:modelValue", "update:selected", "remove", "click"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const sizeStyle = useSize(props, defaultSizes);
    const hasLeftIcon = computed(() => props.selected === true || props.icon !== void 0);
    const leftIcon = computed(() => props.selected === true ? props.iconSelected || $q.iconSet.chip.selected : props.icon);
    const removeIcon = computed(() => props.iconRemove || $q.iconSet.chip.remove);
    const isClickable = computed(
      () => props.disable === false && (props.clickable === true || props.selected !== null)
    );
    const classes = computed(() => {
      const text = props.outline === true ? props.color || props.textColor : props.textColor;
      return "q-chip row inline no-wrap items-center" + (props.outline === false && props.color !== void 0 ? ` bg-${props.color}` : "") + (text ? ` text-${text} q-chip--colored` : "") + (props.disable === true ? " disabled" : "") + (props.dense === true ? " q-chip--dense" : "") + (props.outline === true ? " q-chip--outline" : "") + (props.selected === true ? " q-chip--selected" : "") + (isClickable.value === true ? " q-chip--clickable cursor-pointer non-selectable q-hoverable" : "") + (props.square === true ? " q-chip--square" : "") + (isDark.value === true ? " q-chip--dark q-dark" : "");
    });
    const attributes = computed(() => {
      const chip = props.disable === true ? { tabindex: -1, "aria-disabled": "true" } : { tabindex: props.tabindex || 0 };
      const remove = {
        ...chip,
        role: "button",
        "aria-hidden": "false",
        "aria-label": props.removeAriaLabel || $q.lang.label.remove
      };
      return { chip, remove };
    });
    function onKeyup(e) {
      e.keyCode === 13 && onClick(e);
    }
    function onClick(e) {
      if (!props.disable) {
        emit("update:selected", !props.selected);
        emit("click", e);
      }
    }
    function onRemove(e) {
      if (e.keyCode === void 0 || e.keyCode === 13) {
        stopAndPrevent(e);
        if (props.disable === false) {
          emit("update:modelValue", false);
          emit("remove");
        }
      }
    }
    function getContent() {
      const child = [];
      isClickable.value === true && child.push(
        h("div", { class: "q-focus-helper" })
      );
      hasLeftIcon.value === true && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--left",
          name: leftIcon.value
        })
      );
      const label = props.label !== void 0 ? [h("div", { class: "ellipsis" }, [props.label])] : void 0;
      child.push(
        h("div", {
          class: "q-chip__content col row no-wrap items-center q-anchor--skip"
        }, hMergeSlotSafely(slots.default, label))
      );
      props.iconRight && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--right",
          name: props.iconRight
        })
      );
      props.removable === true && child.push(
        h(QIcon, {
          class: "q-chip__icon q-chip__icon--remove cursor-pointer",
          name: removeIcon.value,
          ...attributes.value.remove,
          onClick: onRemove,
          onKeyup: onRemove
        })
      );
      return child;
    }
    return () => {
      if (props.modelValue === false)
        return;
      const data = {
        class: classes.value,
        style: sizeStyle.value
      };
      isClickable.value === true && Object.assign(
        data,
        attributes.value.chip,
        { onClick, onKeyup }
      );
      return hDir(
        "div",
        data,
        getContent(),
        "ripple",
        props.ripple !== false && props.disable !== true,
        () => [[Ripple, props.ripple]]
      );
    };
  }
});
export { QChip as Q };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUNoaXAuZDVmYzQwN2MuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvY2hpcC9RQ2hpcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcblxuaW1wb3J0IFJpcHBsZSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3JpcHBsZS9SaXBwbGUuanMnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlU2l6ZSwgeyB1c2VTaXplUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1zaXplL3VzZS1zaXplLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdFNhZmVseSwgaERpciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRTaXplcyA9IHtcbiAgeHM6IDgsXG4gIHNtOiAxMCxcbiAgbWQ6IDE0LFxuICBsZzogMjAsXG4gIHhsOiAyNFxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUNoaXAnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuICAgIC4uLnVzZVNpemVQcm9wcyxcblxuICAgIGRlbnNlOiBCb29sZWFuLFxuXG4gICAgaWNvbjogU3RyaW5nLFxuICAgIGljb25SaWdodDogU3RyaW5nLFxuICAgIGljb25SZW1vdmU6IFN0cmluZyxcbiAgICBpY29uU2VsZWN0ZWQ6IFN0cmluZyxcbiAgICBsYWJlbDogWyBTdHJpbmcsIE51bWJlciBdLFxuXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICB0ZXh0Q29sb3I6IFN0cmluZyxcblxuICAgIG1vZGVsVmFsdWU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBzZWxlY3RlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuICAgIG91dGxpbmU6IEJvb2xlYW4sXG4gICAgY2xpY2thYmxlOiBCb29sZWFuLFxuICAgIHJlbW92YWJsZTogQm9vbGVhbixcblxuICAgIHJlbW92ZUFyaWFMYWJlbDogU3RyaW5nLFxuXG4gICAgdGFiaW5kZXg6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICBkaXNhYmxlOiBCb29sZWFuLFxuXG4gICAgcmlwcGxlOiB7XG4gICAgICB0eXBlOiBbIEJvb2xlYW4sIE9iamVjdCBdLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH1cbiAgfSxcblxuICBlbWl0czogWyAndXBkYXRlOm1vZGVsVmFsdWUnLCAndXBkYXRlOnNlbGVjdGVkJywgJ3JlbW92ZScsICdjbGljaycgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuICAgIGNvbnN0IHNpemVTdHlsZSA9IHVzZVNpemUocHJvcHMsIGRlZmF1bHRTaXplcylcblxuICAgIGNvbnN0IGhhc0xlZnRJY29uID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuc2VsZWN0ZWQgPT09IHRydWUgfHwgcHJvcHMuaWNvbiAhPT0gdm9pZCAwKVxuXG4gICAgY29uc3QgbGVmdEljb24gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5zZWxlY3RlZCA9PT0gdHJ1ZVxuICAgICAgICA/IHByb3BzLmljb25TZWxlY3RlZCB8fCAkcS5pY29uU2V0LmNoaXAuc2VsZWN0ZWRcbiAgICAgICAgOiBwcm9wcy5pY29uXG4gICAgKSlcblxuICAgIGNvbnN0IHJlbW92ZUljb24gPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5pY29uUmVtb3ZlIHx8ICRxLmljb25TZXQuY2hpcC5yZW1vdmUpXG5cbiAgICBjb25zdCBpc0NsaWNrYWJsZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlID09PSBmYWxzZVxuICAgICAgJiYgKHByb3BzLmNsaWNrYWJsZSA9PT0gdHJ1ZSB8fCBwcm9wcy5zZWxlY3RlZCAhPT0gbnVsbClcbiAgICApXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IHByb3BzLm91dGxpbmUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5jb2xvciB8fCBwcm9wcy50ZXh0Q29sb3JcbiAgICAgICAgOiBwcm9wcy50ZXh0Q29sb3JcblxuICAgICAgcmV0dXJuICdxLWNoaXAgcm93IGlubGluZSBuby13cmFwIGl0ZW1zLWNlbnRlcidcbiAgICAgICAgKyAocHJvcHMub3V0bGluZSA9PT0gZmFsc2UgJiYgcHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICAgICAgKyAodGV4dCA/IGAgdGV4dC0keyB0ZXh0IH0gcS1jaGlwLS1jb2xvcmVkYCA6ICcnKVxuICAgICAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBkaXNhYmxlZCcgOiAnJylcbiAgICAgICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtY2hpcC0tZGVuc2UnIDogJycpXG4gICAgICAgICsgKHByb3BzLm91dGxpbmUgPT09IHRydWUgPyAnIHEtY2hpcC0tb3V0bGluZScgOiAnJylcbiAgICAgICAgKyAocHJvcHMuc2VsZWN0ZWQgPT09IHRydWUgPyAnIHEtY2hpcC0tc2VsZWN0ZWQnIDogJycpXG4gICAgICAgICsgKGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlID8gJyBxLWNoaXAtLWNsaWNrYWJsZSBjdXJzb3ItcG9pbnRlciBub24tc2VsZWN0YWJsZSBxLWhvdmVyYWJsZScgOiAnJylcbiAgICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLWNoaXAtLXNxdWFyZScgOiAnJylcbiAgICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWNoaXAtLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgIH0pXG5cbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgY2hpcCA9IHByb3BzLmRpc2FibGUgPT09IHRydWVcbiAgICAgICAgPyB7IHRhYmluZGV4OiAtMSwgJ2FyaWEtZGlzYWJsZWQnOiAndHJ1ZScgfVxuICAgICAgICA6IHsgdGFiaW5kZXg6IHByb3BzLnRhYmluZGV4IHx8IDAgfVxuXG4gICAgICBjb25zdCByZW1vdmUgPSB7XG4gICAgICAgIC4uLmNoaXAsXG4gICAgICAgIHJvbGU6ICdidXR0b24nLFxuICAgICAgICAnYXJpYS1oaWRkZW4nOiAnZmFsc2UnLFxuICAgICAgICAnYXJpYS1sYWJlbCc6IHByb3BzLnJlbW92ZUFyaWFMYWJlbCB8fCAkcS5sYW5nLmxhYmVsLnJlbW92ZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4geyBjaGlwLCByZW1vdmUgfVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBvbktleXVwIChlKSB7XG4gICAgICBlLmtleUNvZGUgPT09IDEzIC8qIEVOVEVSICovICYmIG9uQ2xpY2soZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNsaWNrIChlKSB7XG4gICAgICBpZiAoIXByb3BzLmRpc2FibGUpIHtcbiAgICAgICAgZW1pdCgndXBkYXRlOnNlbGVjdGVkJywgIXByb3BzLnNlbGVjdGVkKVxuICAgICAgICBlbWl0KCdjbGljaycsIGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZW1vdmUgKGUpIHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IHZvaWQgMCB8fCBlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZmFsc2UpXG4gICAgICAgICAgZW1pdCgncmVtb3ZlJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgICAgY29uc3QgY2hpbGQgPSBbXVxuXG4gICAgICBpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1mb2N1cy1oZWxwZXInIH0pXG4gICAgICApXG5cbiAgICAgIGhhc0xlZnRJY29uLnZhbHVlID09PSB0cnVlICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogJ3EtY2hpcF9faWNvbiBxLWNoaXBfX2ljb24tLWxlZnQnLFxuICAgICAgICAgIG5hbWU6IGxlZnRJY29uLnZhbHVlXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIGNvbnN0IGxhYmVsID0gcHJvcHMubGFiZWwgIT09IHZvaWQgMFxuICAgICAgICA/IFsgaCgnZGl2JywgeyBjbGFzczogJ2VsbGlwc2lzJyB9LCBbIHByb3BzLmxhYmVsIF0pIF1cbiAgICAgICAgOiB2b2lkIDBcblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19jb250ZW50IGNvbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXIgcS1hbmNob3ItLXNraXAnXG4gICAgICAgIH0sIGhNZXJnZVNsb3RTYWZlbHkoc2xvdHMuZGVmYXVsdCwgbGFiZWwpKVxuICAgICAgKVxuXG4gICAgICBwcm9wcy5pY29uUmlnaHQgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19pY29uIHEtY2hpcF9faWNvbi0tcmlnaHQnLFxuICAgICAgICAgIG5hbWU6IHByb3BzLmljb25SaWdodFxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBwcm9wcy5yZW1vdmFibGUgPT09IHRydWUgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19pY29uIHEtY2hpcF9faWNvbi0tcmVtb3ZlIGN1cnNvci1wb2ludGVyJyxcbiAgICAgICAgICBuYW1lOiByZW1vdmVJY29uLnZhbHVlLFxuICAgICAgICAgIC4uLmF0dHJpYnV0ZXMudmFsdWUucmVtb3ZlLFxuICAgICAgICAgIG9uQ2xpY2s6IG9uUmVtb3ZlLFxuICAgICAgICAgIG9uS2V5dXA6IG9uUmVtb3ZlXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSA9PT0gZmFsc2UpIHJldHVyblxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHNpemVTdHlsZS52YWx1ZVxuICAgICAgfVxuXG4gICAgICBpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBPYmplY3QuYXNzaWduKFxuICAgICAgICBkYXRhLFxuICAgICAgICBhdHRyaWJ1dGVzLnZhbHVlLmNoaXAsXG4gICAgICAgIHsgb25DbGljaywgb25LZXl1cCB9XG4gICAgICApXG5cbiAgICAgIHJldHVybiBoRGlyKFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZ2V0Q29udGVudCgpLFxuICAgICAgICAncmlwcGxlJyxcbiAgICAgICAgcHJvcHMucmlwcGxlICE9PSBmYWxzZSAmJiBwcm9wcy5kaXNhYmxlICE9PSB0cnVlLFxuICAgICAgICAoKSA9PiBbIFsgUmlwcGxlLCBwcm9wcy5yaXBwbGUgXSBdXG4gICAgICApXG4gICAgfVxuICB9XG59KVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFhTyxNQUFNLGVBQWU7QUFBQSxFQUMxQixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQ047QUFFQSxJQUFBLFFBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBRUgsT0FBTztBQUFBLElBRVAsTUFBTTtBQUFBLElBQ04sV0FBVztBQUFBLElBQ1gsWUFBWTtBQUFBLElBQ1osY0FBYztBQUFBLElBQ2QsT0FBTyxDQUFFLFFBQVEsTUFBUTtBQUFBLElBRXpCLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUVYLFlBQVk7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFDRCxVQUFVO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDVjtBQUFBLElBRUQsUUFBUTtBQUFBLElBQ1IsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsV0FBVztBQUFBLElBRVgsaUJBQWlCO0FBQUEsSUFFakIsVUFBVSxDQUFFLFFBQVEsTUFBUTtBQUFBLElBQzVCLFNBQVM7QUFBQSxJQUVULFFBQVE7QUFBQSxNQUNOLE1BQU0sQ0FBRSxTQUFTLE1BQVE7QUFBQSxNQUN6QixTQUFTO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFBQSxFQUVELE9B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
