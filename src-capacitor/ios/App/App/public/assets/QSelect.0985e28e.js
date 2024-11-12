import { Q as QField, a as QItemLabel } from "./rtl.b1b38f21.js";
import { e as createComponent, a9 as useDarkProps, aM as useSizeProps, ab as useDark, aN as useSize, g as computed, ag as hDir, k as getCurrentInstance, h, L as QIcon, aO as hMergeSlotSafely, aP as Ripple, Y as stopAndPrevent, aQ as useFormProps, aR as useFieldProps, aS as useFieldEmits, n as ref, aT as useFormInputNameAttr, aU as useFieldState, aV as fieldValueIsFilled, u as watch, aW as isDeepEqual, G as nextTick, aX as onBeforeUpdate, aY as onUpdated, A as onBeforeUnmount, ar as prevent, aZ as useField, a_ as useKeyComposition, as as stop, ak as isKeyCode, a$ as shouldIgnoreKey, a3 as QDialog, x as hMergeSlot } from "./index.c8e2405b.js";
import { a as QItemSection, Q as QItem } from "./QItem.76557ad9.js";
import { Q as QMenu } from "./QMenu.4f670399.js";
import { u as useVirtualScrollProps, a as useVirtualScroll } from "./use-virtual-scroll.5b4ab88d.js";
import { n as normalizeToInterval } from "./selection.94057980.js";
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
const validateNewValueMode = (v) => ["add", "add-unique", "toggle"].includes(v);
const reEscapeList = ".*+?^${}()|[]\\";
const fieldPropsList = Object.keys(useFieldProps);
var QSelect = createComponent({
  name: "QSelect",
  inheritAttrs: false,
  props: {
    ...useVirtualScrollProps,
    ...useFormProps,
    ...useFieldProps,
    modelValue: {
      required: true
    },
    multiple: Boolean,
    displayValue: [String, Number],
    displayValueHtml: Boolean,
    dropdownIcon: String,
    options: {
      type: Array,
      default: () => []
    },
    optionValue: [Function, String],
    optionLabel: [Function, String],
    optionDisable: [Function, String],
    hideSelected: Boolean,
    hideDropdownIcon: Boolean,
    fillInput: Boolean,
    maxValues: [Number, String],
    optionsDense: Boolean,
    optionsDark: {
      type: Boolean,
      default: null
    },
    optionsSelectedClass: String,
    optionsHtml: Boolean,
    optionsCover: Boolean,
    menuShrink: Boolean,
    menuAnchor: String,
    menuSelf: String,
    menuOffset: Array,
    popupContentClass: String,
    popupContentStyle: [String, Array, Object],
    popupNoRouteDismiss: Boolean,
    useInput: Boolean,
    useChips: Boolean,
    newValueMode: {
      type: String,
      validator: validateNewValueMode
    },
    mapOptions: Boolean,
    emitValue: Boolean,
    inputDebounce: {
      type: [Number, String],
      default: 500
    },
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object],
    tabindex: {
      type: [String, Number],
      default: 0
    },
    autocomplete: String,
    transitionShow: {},
    transitionHide: {},
    transitionDuration: {},
    behavior: {
      type: String,
      validator: (v) => ["default", "menu", "dialog"].includes(v),
      default: "default"
    },
    virtualScrollItemSize: useVirtualScrollProps.virtualScrollItemSize.type,
    onNewValue: Function,
    onFilter: Function
  },
  emits: [
    ...useFieldEmits,
    "add",
    "remove",
    "inputValue",
    "keyup",
    "keypress",
    "keydown",
    "popupShow",
    "popupHide",
    "filterAbort"
  ],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const menu = ref(false);
    const dialog = ref(false);
    const optionIndex = ref(-1);
    const inputValue = ref("");
    const dialogFieldFocused = ref(false);
    const innerLoadingIndicator = ref(false);
    let filterTimer = null, inputValueTimer = null, innerValueCache, hasDialog, userInputValue, filterId = null, defaultInputValue, transitionShowComputed, searchBuffer, searchBufferExp;
    const inputRef = ref(null);
    const targetRef = ref(null);
    const menuRef = ref(null);
    const dialogRef = ref(null);
    const menuContentRef = ref(null);
    const nameProp = useFormInputNameAttr(props);
    const onComposition = useKeyComposition(onInput);
    const virtualScrollLength = computed(() => Array.isArray(props.options) ? props.options.length : 0);
    const virtualScrollItemSizeComputed = computed(() => props.virtualScrollItemSize === void 0 ? props.optionsDense === true ? 24 : 48 : props.virtualScrollItemSize);
    const {
      virtualScrollSliceRange,
      virtualScrollSliceSizeComputed,
      localResetVirtualScroll,
      padVirtualScroll,
      onVirtualScrollEvt,
      scrollTo,
      setVirtualScrollSize
    } = useVirtualScroll({
      virtualScrollLength,
      getVirtualScrollTarget,
      getVirtualScrollEl,
      virtualScrollItemSizeComputed
    });
    const state = useFieldState();
    const innerValue = computed(() => {
      const mapNull = props.mapOptions === true && props.multiple !== true, val = props.modelValue !== void 0 && (props.modelValue !== null || mapNull === true) ? props.multiple === true && Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue] : [];
      if (props.mapOptions === true && Array.isArray(props.options) === true) {
        const cache = props.mapOptions === true && innerValueCache !== void 0 ? innerValueCache : [];
        const values = val.map((v) => getOption(v, cache));
        return props.modelValue === null && mapNull === true ? values.filter((v) => v !== null) : values;
      }
      return val;
    });
    const innerFieldProps = computed(() => {
      const acc = {};
      fieldPropsList.forEach((key) => {
        const val = props[key];
        if (val !== void 0) {
          acc[key] = val;
        }
      });
      return acc;
    });
    const isOptionsDark = computed(() => props.optionsDark === null ? state.isDark.value : props.optionsDark);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const computedInputClass = computed(() => {
      let cls = "q-field__input q-placeholder col";
      if (props.hideSelected === true || innerValue.value.length === 0) {
        return [cls, props.inputClass];
      }
      cls += " q-field__input--padding";
      return props.inputClass === void 0 ? cls : [cls, props.inputClass];
    });
    const menuContentClass = computed(
      () => (props.virtualScrollHorizontal === true ? "q-virtual-scroll--horizontal" : "") + (props.popupContentClass ? " " + props.popupContentClass : "")
    );
    const noOptions = computed(() => virtualScrollLength.value === 0);
    const selectedString = computed(
      () => innerValue.value.map((opt) => getOptionLabel.value(opt)).join(", ")
    );
    const ariaCurrentValue = computed(() => props.displayValue !== void 0 ? props.displayValue : selectedString.value);
    const needsHtmlFn = computed(() => props.optionsHtml === true ? () => true : (opt) => opt !== void 0 && opt !== null && opt.html === true);
    const valueAsHtml = computed(() => props.displayValueHtml === true || props.displayValue === void 0 && (props.optionsHtml === true || innerValue.value.some(needsHtmlFn.value)));
    const tabindex = computed(() => state.focused.value === true ? props.tabindex : -1);
    const comboboxAttrs = computed(() => {
      const attrs = {
        tabindex: props.tabindex,
        role: "combobox",
        "aria-label": props.label,
        "aria-readonly": props.readonly === true ? "true" : "false",
        "aria-autocomplete": props.useInput === true ? "list" : "none",
        "aria-expanded": menu.value === true ? "true" : "false",
        "aria-controls": `${state.targetUid.value}_lb`
      };
      if (optionIndex.value >= 0) {
        attrs["aria-activedescendant"] = `${state.targetUid.value}_${optionIndex.value}`;
      }
      return attrs;
    });
    const listboxAttrs = computed(() => ({
      id: `${state.targetUid.value}_lb`,
      role: "listbox",
      "aria-multiselectable": props.multiple === true ? "true" : "false"
    }));
    const selectedScope = computed(() => {
      return innerValue.value.map((opt, i) => ({
        index: i,
        opt,
        html: needsHtmlFn.value(opt),
        selected: true,
        removeAtIndex: removeAtIndexAndFocus,
        toggleOption,
        tabindex: tabindex.value
      }));
    });
    const optionScope = computed(() => {
      if (virtualScrollLength.value === 0) {
        return [];
      }
      const { from, to } = virtualScrollSliceRange.value;
      return props.options.slice(from, to).map((opt, i) => {
        const disable = isOptionDisabled.value(opt) === true;
        const active = isOptionSelected(opt) === true;
        const index = from + i;
        const itemProps = {
          clickable: true,
          active,
          activeClass: computedOptionsSelectedClass.value,
          manualFocus: true,
          focused: false,
          disable,
          tabindex: -1,
          dense: props.optionsDense,
          dark: isOptionsDark.value,
          role: "option",
          "aria-selected": active === true ? "true" : "false",
          id: `${state.targetUid.value}_${index}`,
          onClick: () => {
            toggleOption(opt);
          }
        };
        if (disable !== true) {
          optionIndex.value === index && (itemProps.focused = true);
          if ($q.platform.is.desktop === true) {
            itemProps.onMousemove = () => {
              menu.value === true && setOptionIndex(index);
            };
          }
        }
        return {
          index,
          opt,
          html: needsHtmlFn.value(opt),
          label: getOptionLabel.value(opt),
          selected: itemProps.active,
          focused: itemProps.focused,
          toggleOption,
          setOptionIndex,
          itemProps
        };
      });
    });
    const dropdownArrowIcon = computed(() => props.dropdownIcon !== void 0 ? props.dropdownIcon : $q.iconSet.arrow.dropdown);
    const squaredMenu = computed(
      () => props.optionsCover === false && props.outlined !== true && props.standout !== true && props.borderless !== true && props.rounded !== true
    );
    const computedOptionsSelectedClass = computed(() => props.optionsSelectedClass !== void 0 ? props.optionsSelectedClass : props.color !== void 0 ? `text-${props.color}` : "");
    const getOptionValue = computed(() => getPropValueFn(props.optionValue, "value"));
    const getOptionLabel = computed(() => getPropValueFn(props.optionLabel, "label"));
    const isOptionDisabled = computed(() => getPropValueFn(props.optionDisable, "disable"));
    const innerOptionsValue = computed(() => innerValue.value.map((opt) => getOptionValue.value(opt)));
    const inputControlEvents = computed(() => {
      const evt = {
        onInput,
        onChange: onComposition,
        onKeydown: onTargetKeydown,
        onKeyup: onTargetAutocomplete,
        onKeypress: onTargetKeypress,
        onFocus: selectInputText,
        onClick(e) {
          hasDialog === true && stop(e);
        }
      };
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      return evt;
    });
    watch(innerValue, (val) => {
      innerValueCache = val;
      if (props.useInput === true && props.fillInput === true && props.multiple !== true && state.innerLoading.value !== true && (dialog.value !== true && menu.value !== true || hasValue.value !== true)) {
        userInputValue !== true && resetInputValue();
        if (dialog.value === true || menu.value === true) {
          filter("");
        }
      }
    }, { immediate: true });
    watch(() => props.fillInput, resetInputValue);
    watch(menu, updateMenu);
    watch(virtualScrollLength, rerenderMenu);
    function getEmittingOptionValue(opt) {
      return props.emitValue === true ? getOptionValue.value(opt) : opt;
    }
    function removeAtIndex(index) {
      if (index !== -1 && index < innerValue.value.length) {
        if (props.multiple === true) {
          const model = props.modelValue.slice();
          emit("remove", { index, value: model.splice(index, 1)[0] });
          emit("update:modelValue", model);
        } else {
          emit("update:modelValue", null);
        }
      }
    }
    function removeAtIndexAndFocus(index) {
      removeAtIndex(index);
      state.focus();
    }
    function add(opt, unique) {
      const val = getEmittingOptionValue(opt);
      if (props.multiple !== true) {
        props.fillInput === true && updateInputValue(
          getOptionLabel.value(opt),
          true,
          true
        );
        emit("update:modelValue", val);
        return;
      }
      if (innerValue.value.length === 0) {
        emit("add", { index: 0, value: val });
        emit("update:modelValue", props.multiple === true ? [val] : val);
        return;
      }
      if (unique === true && isOptionSelected(opt) === true) {
        return;
      }
      if (props.maxValues !== void 0 && props.modelValue.length >= props.maxValues) {
        return;
      }
      const model = props.modelValue.slice();
      emit("add", { index: model.length, value: val });
      model.push(val);
      emit("update:modelValue", model);
    }
    function toggleOption(opt, keepOpen) {
      if (state.editable.value !== true || opt === void 0 || isOptionDisabled.value(opt) === true) {
        return;
      }
      const optValue = getOptionValue.value(opt);
      if (props.multiple !== true) {
        if (keepOpen !== true) {
          updateInputValue(
            props.fillInput === true ? getOptionLabel.value(opt) : "",
            true,
            true
          );
          hidePopup();
        }
        targetRef.value !== null && targetRef.value.focus();
        if (innerValue.value.length === 0 || isDeepEqual(getOptionValue.value(innerValue.value[0]), optValue) !== true) {
          emit("update:modelValue", props.emitValue === true ? optValue : opt);
        }
        return;
      }
      (hasDialog !== true || dialogFieldFocused.value === true) && state.focus();
      selectInputText();
      if (innerValue.value.length === 0) {
        const val = props.emitValue === true ? optValue : opt;
        emit("add", { index: 0, value: val });
        emit("update:modelValue", props.multiple === true ? [val] : val);
        return;
      }
      const model = props.modelValue.slice(), index = innerOptionsValue.value.findIndex((v) => isDeepEqual(v, optValue));
      if (index !== -1) {
        emit("remove", { index, value: model.splice(index, 1)[0] });
      } else {
        if (props.maxValues !== void 0 && model.length >= props.maxValues) {
          return;
        }
        const val = props.emitValue === true ? optValue : opt;
        emit("add", { index: model.length, value: val });
        model.push(val);
      }
      emit("update:modelValue", model);
    }
    function setOptionIndex(index) {
      if ($q.platform.is.desktop !== true)
        return;
      const val = index !== -1 && index < virtualScrollLength.value ? index : -1;
      if (optionIndex.value !== val) {
        optionIndex.value = val;
      }
    }
    function moveOptionSelection(offset = 1, skipInputValue) {
      if (menu.value === true) {
        let index = optionIndex.value;
        do {
          index = normalizeToInterval(
            index + offset,
            -1,
            virtualScrollLength.value - 1
          );
        } while (index !== -1 && index !== optionIndex.value && isOptionDisabled.value(props.options[index]) === true);
        if (optionIndex.value !== index) {
          setOptionIndex(index);
          scrollTo(index);
          if (skipInputValue !== true && props.useInput === true && props.fillInput === true) {
            setInputValue(
              index >= 0 ? getOptionLabel.value(props.options[index]) : defaultInputValue,
              true
            );
          }
        }
      }
    }
    function getOption(value, valueCache) {
      const fn = (opt) => isDeepEqual(getOptionValue.value(opt), value);
      return props.options.find(fn) || valueCache.find(fn) || value;
    }
    function getPropValueFn(propValue, defaultVal) {
      const val = propValue !== void 0 ? propValue : defaultVal;
      return typeof val === "function" ? val : (opt) => opt !== null && typeof opt === "object" && val in opt ? opt[val] : opt;
    }
    function isOptionSelected(opt) {
      const val = getOptionValue.value(opt);
      return innerOptionsValue.value.find((v) => isDeepEqual(v, val)) !== void 0;
    }
    function selectInputText(e) {
      if (props.useInput === true && targetRef.value !== null && (e === void 0 || targetRef.value === e.target && e.target.value === selectedString.value)) {
        targetRef.value.select();
      }
    }
    function onTargetKeyup(e) {
      if (isKeyCode(e, 27) === true && menu.value === true) {
        stop(e);
        hidePopup();
        resetInputValue();
      }
      emit("keyup", e);
    }
    function onTargetAutocomplete(e) {
      const { value } = e.target;
      if (e.keyCode !== void 0) {
        onTargetKeyup(e);
        return;
      }
      e.target.value = "";
      if (filterTimer !== null) {
        clearTimeout(filterTimer);
        filterTimer = null;
      }
      if (inputValueTimer !== null) {
        clearTimeout(inputValueTimer);
        inputValueTimer = null;
      }
      resetInputValue();
      if (typeof value === "string" && value.length !== 0) {
        const needle = value.toLocaleLowerCase();
        const findFn = (extractFn) => {
          const option = props.options.find((opt) => extractFn.value(opt).toLocaleLowerCase() === needle);
          if (option === void 0) {
            return false;
          }
          if (innerValue.value.indexOf(option) === -1) {
            toggleOption(option);
          } else {
            hidePopup();
          }
          return true;
        };
        const fillFn = (afterFilter) => {
          if (findFn(getOptionValue) === true) {
            return;
          }
          if (findFn(getOptionLabel) === true || afterFilter === true) {
            return;
          }
          filter(value, true, () => fillFn(true));
        };
        fillFn();
      } else {
        state.clearValue(e);
      }
    }
    function onTargetKeypress(e) {
      emit("keypress", e);
    }
    function onTargetKeydown(e) {
      emit("keydown", e);
      if (shouldIgnoreKey(e) === true) {
        return;
      }
      const newValueModeValid = inputValue.value.length !== 0 && (props.newValueMode !== void 0 || props.onNewValue !== void 0);
      const tabShouldSelect = e.shiftKey !== true && props.multiple !== true && (optionIndex.value !== -1 || newValueModeValid === true);
      if (e.keyCode === 27) {
        prevent(e);
        return;
      }
      if (e.keyCode === 9 && tabShouldSelect === false) {
        closeMenu();
        return;
      }
      if (e.target === void 0 || e.target.id !== state.targetUid.value || state.editable.value !== true)
        return;
      if (e.keyCode === 40 && state.innerLoading.value !== true && menu.value === false) {
        stopAndPrevent(e);
        showPopup();
        return;
      }
      if (e.keyCode === 8 && (props.useChips === true || props.clearable === true) && props.hideSelected !== true && inputValue.value.length === 0) {
        if (props.multiple === true && Array.isArray(props.modelValue) === true) {
          removeAtIndex(props.modelValue.length - 1);
        } else if (props.multiple !== true && props.modelValue !== null) {
          emit("update:modelValue", null);
        }
        return;
      }
      if ((e.keyCode === 35 || e.keyCode === 36) && (typeof inputValue.value !== "string" || inputValue.value.length === 0)) {
        stopAndPrevent(e);
        optionIndex.value = -1;
        moveOptionSelection(e.keyCode === 36 ? 1 : -1, props.multiple);
      }
      if ((e.keyCode === 33 || e.keyCode === 34) && virtualScrollSliceSizeComputed.value !== void 0) {
        stopAndPrevent(e);
        optionIndex.value = Math.max(
          -1,
          Math.min(
            virtualScrollLength.value,
            optionIndex.value + (e.keyCode === 33 ? -1 : 1) * virtualScrollSliceSizeComputed.value.view
          )
        );
        moveOptionSelection(e.keyCode === 33 ? 1 : -1, props.multiple);
      }
      if (e.keyCode === 38 || e.keyCode === 40) {
        stopAndPrevent(e);
        moveOptionSelection(e.keyCode === 38 ? -1 : 1, props.multiple);
      }
      const optionsLength = virtualScrollLength.value;
      if (searchBuffer === void 0 || searchBufferExp < Date.now()) {
        searchBuffer = "";
      }
      if (optionsLength > 0 && props.useInput !== true && e.key !== void 0 && e.key.length === 1 && e.altKey === false && e.ctrlKey === false && e.metaKey === false && (e.keyCode !== 32 || searchBuffer.length !== 0)) {
        menu.value !== true && showPopup(e);
        const char = e.key.toLocaleLowerCase(), keyRepeat = searchBuffer.length === 1 && searchBuffer[0] === char;
        searchBufferExp = Date.now() + 1500;
        if (keyRepeat === false) {
          stopAndPrevent(e);
          searchBuffer += char;
        }
        const searchRe = new RegExp("^" + searchBuffer.split("").map((l) => reEscapeList.indexOf(l) !== -1 ? "\\" + l : l).join(".*"), "i");
        let index = optionIndex.value;
        if (keyRepeat === true || index < 0 || searchRe.test(getOptionLabel.value(props.options[index])) !== true) {
          do {
            index = normalizeToInterval(index + 1, -1, optionsLength - 1);
          } while (index !== optionIndex.value && (isOptionDisabled.value(props.options[index]) === true || searchRe.test(getOptionLabel.value(props.options[index])) !== true));
        }
        if (optionIndex.value !== index) {
          nextTick(() => {
            setOptionIndex(index);
            scrollTo(index);
            if (index >= 0 && props.useInput === true && props.fillInput === true) {
              setInputValue(getOptionLabel.value(props.options[index]), true);
            }
          });
        }
        return;
      }
      if (e.keyCode !== 13 && (e.keyCode !== 32 || props.useInput === true || searchBuffer !== "") && (e.keyCode !== 9 || tabShouldSelect === false))
        return;
      e.keyCode !== 9 && stopAndPrevent(e);
      if (optionIndex.value !== -1 && optionIndex.value < optionsLength) {
        toggleOption(props.options[optionIndex.value]);
        return;
      }
      if (newValueModeValid === true) {
        const done = (val, mode) => {
          if (mode) {
            if (validateNewValueMode(mode) !== true) {
              return;
            }
          } else {
            mode = props.newValueMode;
          }
          updateInputValue("", props.multiple !== true, true);
          if (val === void 0 || val === null) {
            return;
          }
          const fn = mode === "toggle" ? toggleOption : add;
          fn(val, mode === "add-unique");
          if (props.multiple !== true) {
            targetRef.value !== null && targetRef.value.focus();
            hidePopup();
          }
        };
        if (props.onNewValue !== void 0) {
          emit("newValue", inputValue.value, done);
        } else {
          done(inputValue.value);
        }
        if (props.multiple !== true) {
          return;
        }
      }
      if (menu.value === true) {
        closeMenu();
      } else if (state.innerLoading.value !== true) {
        showPopup();
      }
    }
    function getVirtualScrollEl() {
      return hasDialog === true ? menuContentRef.value : menuRef.value !== null && menuRef.value.contentEl !== null ? menuRef.value.contentEl : void 0;
    }
    function getVirtualScrollTarget() {
      return getVirtualScrollEl();
    }
    function getSelection() {
      if (props.hideSelected === true) {
        return [];
      }
      if (slots["selected-item"] !== void 0) {
        return selectedScope.value.map((scope) => slots["selected-item"](scope)).slice();
      }
      if (slots.selected !== void 0) {
        return [].concat(slots.selected());
      }
      if (props.useChips === true) {
        return selectedScope.value.map((scope, i) => h(QChip, {
          key: "option-" + i,
          removable: state.editable.value === true && isOptionDisabled.value(scope.opt) !== true,
          dense: true,
          textColor: props.color,
          tabindex: tabindex.value,
          onRemove() {
            scope.removeAtIndex(i);
          }
        }, () => h("span", {
          class: "ellipsis",
          [scope.html === true ? "innerHTML" : "textContent"]: getOptionLabel.value(scope.opt)
        })));
      }
      return [
        h("span", {
          [valueAsHtml.value === true ? "innerHTML" : "textContent"]: ariaCurrentValue.value
        })
      ];
    }
    function getAllOptions() {
      if (noOptions.value === true) {
        return slots["no-option"] !== void 0 ? slots["no-option"]({ inputValue: inputValue.value }) : void 0;
      }
      const fn = slots.option !== void 0 ? slots.option : (scope) => {
        return h(QItem, {
          key: scope.index,
          ...scope.itemProps
        }, () => {
          return h(
            QItemSection,
            () => h(
              QItemLabel,
              () => h("span", {
                [scope.html === true ? "innerHTML" : "textContent"]: scope.label
              })
            )
          );
        });
      };
      let options = padVirtualScroll("div", optionScope.value.map(fn));
      if (slots["before-options"] !== void 0) {
        options = slots["before-options"]().concat(options);
      }
      return hMergeSlot(slots["after-options"], options);
    }
    function getInput(fromDialog, isTarget) {
      const attrs = isTarget === true ? { ...comboboxAttrs.value, ...state.splitAttrs.attributes.value } : void 0;
      const data = {
        ref: isTarget === true ? targetRef : void 0,
        key: "i_t",
        class: computedInputClass.value,
        style: props.inputStyle,
        value: inputValue.value !== void 0 ? inputValue.value : "",
        type: "search",
        ...attrs,
        id: isTarget === true ? state.targetUid.value : void 0,
        maxlength: props.maxlength,
        autocomplete: props.autocomplete,
        "data-autofocus": fromDialog === true || props.autofocus === true || void 0,
        disabled: props.disable === true,
        readonly: props.readonly === true,
        ...inputControlEvents.value
      };
      if (fromDialog !== true && hasDialog === true) {
        if (Array.isArray(data.class) === true) {
          data.class = [...data.class, "no-pointer-events"];
        } else {
          data.class += " no-pointer-events";
        }
      }
      return h("input", data);
    }
    function onInput(e) {
      if (filterTimer !== null) {
        clearTimeout(filterTimer);
        filterTimer = null;
      }
      if (inputValueTimer !== null) {
        clearTimeout(inputValueTimer);
        inputValueTimer = null;
      }
      if (e && e.target && e.target.qComposing === true) {
        return;
      }
      setInputValue(e.target.value || "");
      userInputValue = true;
      defaultInputValue = inputValue.value;
      if (state.focused.value !== true && (hasDialog !== true || dialogFieldFocused.value === true)) {
        state.focus();
      }
      if (props.onFilter !== void 0) {
        filterTimer = setTimeout(() => {
          filterTimer = null;
          filter(inputValue.value);
        }, props.inputDebounce);
      }
    }
    function setInputValue(val, emitImmediately) {
      if (inputValue.value !== val) {
        inputValue.value = val;
        if (emitImmediately === true || props.inputDebounce === 0 || props.inputDebounce === "0") {
          emit("inputValue", val);
        } else {
          inputValueTimer = setTimeout(() => {
            inputValueTimer = null;
            emit("inputValue", val);
          }, props.inputDebounce);
        }
      }
    }
    function updateInputValue(val, noFiltering, internal) {
      userInputValue = internal !== true;
      if (props.useInput === true) {
        setInputValue(val, true);
        if (noFiltering === true || internal !== true) {
          defaultInputValue = val;
        }
        noFiltering !== true && filter(val);
      }
    }
    function filter(val, keepClosed, afterUpdateFn) {
      if (props.onFilter === void 0 || keepClosed !== true && state.focused.value !== true) {
        return;
      }
      if (state.innerLoading.value === true) {
        emit("filterAbort");
      } else {
        state.innerLoading.value = true;
        innerLoadingIndicator.value = true;
      }
      if (val !== "" && props.multiple !== true && innerValue.value.length !== 0 && userInputValue !== true && val === getOptionLabel.value(innerValue.value[0])) {
        val = "";
      }
      const localFilterId = setTimeout(() => {
        menu.value === true && (menu.value = false);
      }, 10);
      filterId !== null && clearTimeout(filterId);
      filterId = localFilterId;
      emit(
        "filter",
        val,
        (fn, afterFn) => {
          if ((keepClosed === true || state.focused.value === true) && filterId === localFilterId) {
            clearTimeout(filterId);
            typeof fn === "function" && fn();
            innerLoadingIndicator.value = false;
            nextTick(() => {
              state.innerLoading.value = false;
              if (state.editable.value === true) {
                if (keepClosed === true) {
                  menu.value === true && hidePopup();
                } else if (menu.value === true) {
                  updateMenu(true);
                } else {
                  menu.value = true;
                }
              }
              typeof afterFn === "function" && nextTick(() => {
                afterFn(proxy);
              });
              typeof afterUpdateFn === "function" && nextTick(() => {
                afterUpdateFn(proxy);
              });
            });
          }
        },
        () => {
          if (state.focused.value === true && filterId === localFilterId) {
            clearTimeout(filterId);
            state.innerLoading.value = false;
            innerLoadingIndicator.value = false;
          }
          menu.value === true && (menu.value = false);
        }
      );
    }
    function getMenu() {
      return h(QMenu, {
        ref: menuRef,
        class: menuContentClass.value,
        style: props.popupContentStyle,
        modelValue: menu.value,
        fit: props.menuShrink !== true,
        cover: props.optionsCover === true && noOptions.value !== true && props.useInput !== true,
        anchor: props.menuAnchor,
        self: props.menuSelf,
        offset: props.menuOffset,
        dark: isOptionsDark.value,
        noParentEvent: true,
        noRefocus: true,
        noFocus: true,
        noRouteDismiss: props.popupNoRouteDismiss,
        square: squaredMenu.value,
        transitionShow: props.transitionShow,
        transitionHide: props.transitionHide,
        transitionDuration: props.transitionDuration,
        separateClosePopup: true,
        ...listboxAttrs.value,
        onScrollPassive: onVirtualScrollEvt,
        onBeforeShow: onControlPopupShow,
        onBeforeHide: onMenuBeforeHide,
        onShow: onMenuShow
      }, getAllOptions);
    }
    function onMenuBeforeHide(e) {
      onControlPopupHide(e);
      closeMenu();
    }
    function onMenuShow() {
      setVirtualScrollSize();
    }
    function onDialogFieldFocus(e) {
      stop(e);
      targetRef.value !== null && targetRef.value.focus();
      dialogFieldFocused.value = true;
      window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, 0);
    }
    function onDialogFieldBlur(e) {
      stop(e);
      nextTick(() => {
        dialogFieldFocused.value = false;
      });
    }
    function getDialog() {
      const content = [
        h(QField, {
          class: `col-auto ${state.fieldClass.value}`,
          ...innerFieldProps.value,
          for: state.targetUid.value,
          dark: isOptionsDark.value,
          square: true,
          loading: innerLoadingIndicator.value,
          itemAligned: false,
          filled: true,
          stackLabel: inputValue.value.length !== 0,
          ...state.splitAttrs.listeners.value,
          onFocus: onDialogFieldFocus,
          onBlur: onDialogFieldBlur
        }, {
          ...slots,
          rawControl: () => state.getControl(true),
          before: void 0,
          after: void 0
        })
      ];
      menu.value === true && content.push(
        h("div", {
          ref: menuContentRef,
          class: menuContentClass.value + " scroll",
          style: props.popupContentStyle,
          ...listboxAttrs.value,
          onClick: prevent,
          onScrollPassive: onVirtualScrollEvt
        }, getAllOptions())
      );
      return h(QDialog, {
        ref: dialogRef,
        modelValue: dialog.value,
        position: props.useInput === true ? "top" : void 0,
        transitionShow: transitionShowComputed,
        transitionHide: props.transitionHide,
        transitionDuration: props.transitionDuration,
        noRouteDismiss: props.popupNoRouteDismiss,
        onBeforeShow: onControlPopupShow,
        onBeforeHide: onDialogBeforeHide,
        onHide: onDialogHide,
        onShow: onDialogShow
      }, () => h("div", {
        class: "q-select__dialog" + (isOptionsDark.value === true ? " q-select__dialog--dark q-dark" : "") + (dialogFieldFocused.value === true ? " q-select__dialog--focused" : "")
      }, content));
    }
    function onDialogBeforeHide(e) {
      onControlPopupHide(e);
      if (dialogRef.value !== null) {
        dialogRef.value.__updateRefocusTarget(
          state.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")
        );
      }
      state.focused.value = false;
    }
    function onDialogHide(e) {
      hidePopup();
      state.focused.value === false && emit("blur", e);
      resetInputValue();
    }
    function onDialogShow() {
      const el = document.activeElement;
      if ((el === null || el.id !== state.targetUid.value) && targetRef.value !== null && targetRef.value !== el) {
        targetRef.value.focus();
      }
      setVirtualScrollSize();
    }
    function closeMenu() {
      if (dialog.value === true) {
        return;
      }
      optionIndex.value = -1;
      if (menu.value === true) {
        menu.value = false;
      }
      if (state.focused.value === false) {
        if (filterId !== null) {
          clearTimeout(filterId);
          filterId = null;
        }
        if (state.innerLoading.value === true) {
          emit("filterAbort");
          state.innerLoading.value = false;
          innerLoadingIndicator.value = false;
        }
      }
    }
    function showPopup(e) {
      if (state.editable.value !== true) {
        return;
      }
      if (hasDialog === true) {
        state.onControlFocusin(e);
        dialog.value = true;
        nextTick(() => {
          state.focus();
        });
      } else {
        state.focus();
      }
      if (props.onFilter !== void 0) {
        filter(inputValue.value);
      } else if (noOptions.value !== true || slots["no-option"] !== void 0) {
        menu.value = true;
      }
    }
    function hidePopup() {
      dialog.value = false;
      closeMenu();
    }
    function resetInputValue() {
      props.useInput === true && updateInputValue(
        props.multiple !== true && props.fillInput === true && innerValue.value.length !== 0 ? getOptionLabel.value(innerValue.value[0]) || "" : "",
        true,
        true
      );
    }
    function updateMenu(show) {
      let optionIndex2 = -1;
      if (show === true) {
        if (innerValue.value.length !== 0) {
          const val = getOptionValue.value(innerValue.value[0]);
          optionIndex2 = props.options.findIndex((v) => isDeepEqual(getOptionValue.value(v), val));
        }
        localResetVirtualScroll(optionIndex2);
      }
      setOptionIndex(optionIndex2);
    }
    function rerenderMenu(newLength, oldLength) {
      if (menu.value === true && state.innerLoading.value === false) {
        localResetVirtualScroll(-1, true);
        nextTick(() => {
          if (menu.value === true && state.innerLoading.value === false) {
            if (newLength > oldLength) {
              localResetVirtualScroll();
            } else {
              updateMenu(true);
            }
          }
        });
      }
    }
    function updateMenuPosition() {
      if (dialog.value === false && menuRef.value !== null) {
        menuRef.value.updatePosition();
      }
    }
    function onControlPopupShow(e) {
      e !== void 0 && stop(e);
      emit("popupShow", e);
      state.hasPopupOpen = true;
      state.onControlFocusin(e);
    }
    function onControlPopupHide(e) {
      e !== void 0 && stop(e);
      emit("popupHide", e);
      state.hasPopupOpen = false;
      state.onControlFocusout(e);
    }
    function updatePreState() {
      hasDialog = $q.platform.is.mobile !== true && props.behavior !== "dialog" ? false : props.behavior !== "menu" && (props.useInput === true ? slots["no-option"] !== void 0 || props.onFilter !== void 0 || noOptions.value === false : true);
      transitionShowComputed = $q.platform.is.ios === true && hasDialog === true && props.useInput === true ? "fade" : props.transitionShow;
    }
    onBeforeUpdate(updatePreState);
    onUpdated(updateMenuPosition);
    updatePreState();
    onBeforeUnmount(() => {
      filterTimer !== null && clearTimeout(filterTimer);
      inputValueTimer !== null && clearTimeout(inputValueTimer);
    });
    Object.assign(proxy, {
      showPopup,
      hidePopup,
      removeAtIndex,
      add,
      toggleOption,
      getOptionIndex: () => optionIndex.value,
      setOptionIndex,
      moveOptionSelection,
      filter,
      updateMenuPosition,
      updateInputValue,
      isOptionSelected,
      getEmittingOptionValue,
      isOptionDisabled: (...args) => isOptionDisabled.value.apply(null, args) === true,
      getOptionValue: (...args) => getOptionValue.value.apply(null, args),
      getOptionLabel: (...args) => getOptionLabel.value.apply(null, args)
    });
    Object.assign(state, {
      innerValue,
      fieldClass: computed(
        () => `q-select q-field--auto-height q-select--with${props.useInput !== true ? "out" : ""}-input q-select--with${props.useChips !== true ? "out" : ""}-chips q-select--${props.multiple === true ? "multiple" : "single"}`
      ),
      inputRef,
      targetRef,
      hasValue,
      showPopup,
      floatingLabel: computed(
        () => props.hideSelected !== true && hasValue.value === true || typeof inputValue.value === "number" || inputValue.value.length !== 0 || fieldValueIsFilled(props.displayValue)
      ),
      getControlChild: () => {
        if (state.editable.value !== false && (dialog.value === true || noOptions.value !== true || slots["no-option"] !== void 0)) {
          return hasDialog === true ? getDialog() : getMenu();
        } else if (state.hasPopupOpen === true) {
          state.hasPopupOpen = false;
        }
      },
      controlEvents: {
        onFocusin(e) {
          state.onControlFocusin(e);
        },
        onFocusout(e) {
          state.onControlFocusout(e, () => {
            resetInputValue();
            closeMenu();
          });
        },
        onClick(e) {
          prevent(e);
          if (hasDialog !== true && menu.value === true) {
            closeMenu();
            targetRef.value !== null && targetRef.value.focus();
            return;
          }
          showPopup(e);
        }
      },
      getControl: (fromDialog) => {
        const child = getSelection();
        const isTarget = fromDialog === true || dialog.value !== true || hasDialog !== true;
        if (props.useInput === true) {
          child.push(getInput(fromDialog, isTarget));
        } else if (state.editable.value === true) {
          const attrs2 = isTarget === true ? comboboxAttrs.value : void 0;
          child.push(
            h("input", {
              ref: isTarget === true ? targetRef : void 0,
              key: "d_t",
              class: "q-select__focus-target",
              id: isTarget === true ? state.targetUid.value : void 0,
              value: ariaCurrentValue.value,
              readonly: true,
              "data-autofocus": fromDialog === true || props.autofocus === true || void 0,
              ...attrs2,
              onKeydown: onTargetKeydown,
              onKeyup: onTargetKeyup,
              onKeypress: onTargetKeypress
            })
          );
          if (isTarget === true && typeof props.autocomplete === "string" && props.autocomplete.length !== 0) {
            child.push(
              h("input", {
                class: "q-select__autocomplete-input",
                autocomplete: props.autocomplete,
                tabindex: -1,
                onKeyup: onTargetAutocomplete
              })
            );
          }
        }
        if (nameProp.value !== void 0 && props.disable !== true && innerOptionsValue.value.length !== 0) {
          const opts = innerOptionsValue.value.map((value) => h("option", { value, selected: true }));
          child.push(
            h("select", {
              class: "hidden",
              name: nameProp.value,
              multiple: props.multiple
            }, opts)
          );
        }
        const attrs = props.useInput === true || isTarget !== true ? void 0 : state.splitAttrs.attributes.value;
        return h("div", {
          class: "q-field__native row items-center",
          ...attrs,
          ...state.splitAttrs.listeners.value
        }, child);
      },
      getInnerAppend: () => props.loading !== true && innerLoadingIndicator.value !== true && props.hideDropdownIcon !== true ? [
        h(QIcon, {
          class: "q-select__dropdown-icon" + (menu.value === true ? " rotate-180" : ""),
          name: dropdownArrowIcon.value
        })
      ] : null
    });
    return useField(state);
  }
});
export { QSelect as Q, QChip as a };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVNlbGVjdC4wOTg1ZTI4ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9jaGlwL1FDaGlwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9zZWxlY3QvUVNlbGVjdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcblxuaW1wb3J0IFJpcHBsZSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3JpcHBsZS9SaXBwbGUuanMnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlU2l6ZSwgeyB1c2VTaXplUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1zaXplL3VzZS1zaXplLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdFNhZmVseSwgaERpciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRTaXplcyA9IHtcbiAgeHM6IDgsXG4gIHNtOiAxMCxcbiAgbWQ6IDE0LFxuICBsZzogMjAsXG4gIHhsOiAyNFxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUNoaXAnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuICAgIC4uLnVzZVNpemVQcm9wcyxcblxuICAgIGRlbnNlOiBCb29sZWFuLFxuXG4gICAgaWNvbjogU3RyaW5nLFxuICAgIGljb25SaWdodDogU3RyaW5nLFxuICAgIGljb25SZW1vdmU6IFN0cmluZyxcbiAgICBpY29uU2VsZWN0ZWQ6IFN0cmluZyxcbiAgICBsYWJlbDogWyBTdHJpbmcsIE51bWJlciBdLFxuXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICB0ZXh0Q29sb3I6IFN0cmluZyxcblxuICAgIG1vZGVsVmFsdWU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICBzZWxlY3RlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuICAgIG91dGxpbmU6IEJvb2xlYW4sXG4gICAgY2xpY2thYmxlOiBCb29sZWFuLFxuICAgIHJlbW92YWJsZTogQm9vbGVhbixcblxuICAgIHJlbW92ZUFyaWFMYWJlbDogU3RyaW5nLFxuXG4gICAgdGFiaW5kZXg6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICBkaXNhYmxlOiBCb29sZWFuLFxuXG4gICAgcmlwcGxlOiB7XG4gICAgICB0eXBlOiBbIEJvb2xlYW4sIE9iamVjdCBdLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH1cbiAgfSxcblxuICBlbWl0czogWyAndXBkYXRlOm1vZGVsVmFsdWUnLCAndXBkYXRlOnNlbGVjdGVkJywgJ3JlbW92ZScsICdjbGljaycgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuICAgIGNvbnN0IHNpemVTdHlsZSA9IHVzZVNpemUocHJvcHMsIGRlZmF1bHRTaXplcylcblxuICAgIGNvbnN0IGhhc0xlZnRJY29uID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuc2VsZWN0ZWQgPT09IHRydWUgfHwgcHJvcHMuaWNvbiAhPT0gdm9pZCAwKVxuXG4gICAgY29uc3QgbGVmdEljb24gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5zZWxlY3RlZCA9PT0gdHJ1ZVxuICAgICAgICA/IHByb3BzLmljb25TZWxlY3RlZCB8fCAkcS5pY29uU2V0LmNoaXAuc2VsZWN0ZWRcbiAgICAgICAgOiBwcm9wcy5pY29uXG4gICAgKSlcblxuICAgIGNvbnN0IHJlbW92ZUljb24gPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5pY29uUmVtb3ZlIHx8ICRxLmljb25TZXQuY2hpcC5yZW1vdmUpXG5cbiAgICBjb25zdCBpc0NsaWNrYWJsZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5kaXNhYmxlID09PSBmYWxzZVxuICAgICAgJiYgKHByb3BzLmNsaWNrYWJsZSA9PT0gdHJ1ZSB8fCBwcm9wcy5zZWxlY3RlZCAhPT0gbnVsbClcbiAgICApXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IHByb3BzLm91dGxpbmUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5jb2xvciB8fCBwcm9wcy50ZXh0Q29sb3JcbiAgICAgICAgOiBwcm9wcy50ZXh0Q29sb3JcblxuICAgICAgcmV0dXJuICdxLWNoaXAgcm93IGlubGluZSBuby13cmFwIGl0ZW1zLWNlbnRlcidcbiAgICAgICAgKyAocHJvcHMub3V0bGluZSA9PT0gZmFsc2UgJiYgcHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICAgICAgKyAodGV4dCA/IGAgdGV4dC0keyB0ZXh0IH0gcS1jaGlwLS1jb2xvcmVkYCA6ICcnKVxuICAgICAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBkaXNhYmxlZCcgOiAnJylcbiAgICAgICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtY2hpcC0tZGVuc2UnIDogJycpXG4gICAgICAgICsgKHByb3BzLm91dGxpbmUgPT09IHRydWUgPyAnIHEtY2hpcC0tb3V0bGluZScgOiAnJylcbiAgICAgICAgKyAocHJvcHMuc2VsZWN0ZWQgPT09IHRydWUgPyAnIHEtY2hpcC0tc2VsZWN0ZWQnIDogJycpXG4gICAgICAgICsgKGlzQ2xpY2thYmxlLnZhbHVlID09PSB0cnVlID8gJyBxLWNoaXAtLWNsaWNrYWJsZSBjdXJzb3ItcG9pbnRlciBub24tc2VsZWN0YWJsZSBxLWhvdmVyYWJsZScgOiAnJylcbiAgICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLWNoaXAtLXNxdWFyZScgOiAnJylcbiAgICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWNoaXAtLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgIH0pXG5cbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgY2hpcCA9IHByb3BzLmRpc2FibGUgPT09IHRydWVcbiAgICAgICAgPyB7IHRhYmluZGV4OiAtMSwgJ2FyaWEtZGlzYWJsZWQnOiAndHJ1ZScgfVxuICAgICAgICA6IHsgdGFiaW5kZXg6IHByb3BzLnRhYmluZGV4IHx8IDAgfVxuXG4gICAgICBjb25zdCByZW1vdmUgPSB7XG4gICAgICAgIC4uLmNoaXAsXG4gICAgICAgIHJvbGU6ICdidXR0b24nLFxuICAgICAgICAnYXJpYS1oaWRkZW4nOiAnZmFsc2UnLFxuICAgICAgICAnYXJpYS1sYWJlbCc6IHByb3BzLnJlbW92ZUFyaWFMYWJlbCB8fCAkcS5sYW5nLmxhYmVsLnJlbW92ZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4geyBjaGlwLCByZW1vdmUgfVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBvbktleXVwIChlKSB7XG4gICAgICBlLmtleUNvZGUgPT09IDEzIC8qIEVOVEVSICovICYmIG9uQ2xpY2soZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNsaWNrIChlKSB7XG4gICAgICBpZiAoIXByb3BzLmRpc2FibGUpIHtcbiAgICAgICAgZW1pdCgndXBkYXRlOnNlbGVjdGVkJywgIXByb3BzLnNlbGVjdGVkKVxuICAgICAgICBlbWl0KCdjbGljaycsIGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25SZW1vdmUgKGUpIHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IHZvaWQgMCB8fCBlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZmFsc2UpXG4gICAgICAgICAgZW1pdCgncmVtb3ZlJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgICAgY29uc3QgY2hpbGQgPSBbXVxuXG4gICAgICBpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1mb2N1cy1oZWxwZXInIH0pXG4gICAgICApXG5cbiAgICAgIGhhc0xlZnRJY29uLnZhbHVlID09PSB0cnVlICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogJ3EtY2hpcF9faWNvbiBxLWNoaXBfX2ljb24tLWxlZnQnLFxuICAgICAgICAgIG5hbWU6IGxlZnRJY29uLnZhbHVlXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIGNvbnN0IGxhYmVsID0gcHJvcHMubGFiZWwgIT09IHZvaWQgMFxuICAgICAgICA/IFsgaCgnZGl2JywgeyBjbGFzczogJ2VsbGlwc2lzJyB9LCBbIHByb3BzLmxhYmVsIF0pIF1cbiAgICAgICAgOiB2b2lkIDBcblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19jb250ZW50IGNvbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXIgcS1hbmNob3ItLXNraXAnXG4gICAgICAgIH0sIGhNZXJnZVNsb3RTYWZlbHkoc2xvdHMuZGVmYXVsdCwgbGFiZWwpKVxuICAgICAgKVxuXG4gICAgICBwcm9wcy5pY29uUmlnaHQgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19pY29uIHEtY2hpcF9faWNvbi0tcmlnaHQnLFxuICAgICAgICAgIG5hbWU6IHByb3BzLmljb25SaWdodFxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBwcm9wcy5yZW1vdmFibGUgPT09IHRydWUgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS1jaGlwX19pY29uIHEtY2hpcF9faWNvbi0tcmVtb3ZlIGN1cnNvci1wb2ludGVyJyxcbiAgICAgICAgICBuYW1lOiByZW1vdmVJY29uLnZhbHVlLFxuICAgICAgICAgIC4uLmF0dHJpYnV0ZXMudmFsdWUucmVtb3ZlLFxuICAgICAgICAgIG9uQ2xpY2s6IG9uUmVtb3ZlLFxuICAgICAgICAgIG9uS2V5dXA6IG9uUmVtb3ZlXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSA9PT0gZmFsc2UpIHJldHVyblxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHNpemVTdHlsZS52YWx1ZVxuICAgICAgfVxuXG4gICAgICBpc0NsaWNrYWJsZS52YWx1ZSA9PT0gdHJ1ZSAmJiBPYmplY3QuYXNzaWduKFxuICAgICAgICBkYXRhLFxuICAgICAgICBhdHRyaWJ1dGVzLnZhbHVlLmNoaXAsXG4gICAgICAgIHsgb25DbGljaywgb25LZXl1cCB9XG4gICAgICApXG5cbiAgICAgIHJldHVybiBoRGlyKFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgZ2V0Q29udGVudCgpLFxuICAgICAgICAncmlwcGxlJyxcbiAgICAgICAgcHJvcHMucmlwcGxlICE9PSBmYWxzZSAmJiBwcm9wcy5kaXNhYmxlICE9PSB0cnVlLFxuICAgICAgICAoKSA9PiBbIFsgUmlwcGxlLCBwcm9wcy5yaXBwbGUgXSBdXG4gICAgICApXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVXBkYXRlLCBvblVwZGF0ZWQsIG9uQmVmb3JlVW5tb3VudCwgbmV4dFRpY2ssIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFGaWVsZCBmcm9tICcuLi9maWVsZC9RRmllbGQuanMnXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcbmltcG9ydCBRQ2hpcCBmcm9tICcuLi9jaGlwL1FDaGlwLmpzJ1xuXG5pbXBvcnQgUUl0ZW0gZnJvbSAnLi4vaXRlbS9RSXRlbS5qcydcbmltcG9ydCBRSXRlbVNlY3Rpb24gZnJvbSAnLi4vaXRlbS9RSXRlbVNlY3Rpb24uanMnXG5pbXBvcnQgUUl0ZW1MYWJlbCBmcm9tICcuLi9pdGVtL1FJdGVtTGFiZWwuanMnXG5cbmltcG9ydCBRTWVudSBmcm9tICcuLi9tZW51L1FNZW51LmpzJ1xuaW1wb3J0IFFEaWFsb2cgZnJvbSAnLi4vZGlhbG9nL1FEaWFsb2cuanMnXG5cbmltcG9ydCB1c2VGaWVsZCwgeyB1c2VGaWVsZFN0YXRlLCB1c2VGaWVsZFByb3BzLCB1c2VGaWVsZEVtaXRzLCBmaWVsZFZhbHVlSXNGaWxsZWQgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1maWVsZC91c2UtZmllbGQuanMnXG5pbXBvcnQgeyB1c2VWaXJ0dWFsU2Nyb2xsLCB1c2VWaXJ0dWFsU2Nyb2xsUHJvcHMgfSBmcm9tICcuLi92aXJ0dWFsLXNjcm9sbC91c2UtdmlydHVhbC1zY3JvbGwuanMnXG5pbXBvcnQgeyB1c2VGb3JtUHJvcHMsIHVzZUZvcm1JbnB1dE5hbWVBdHRyIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLWZvcm0vcHJpdmF0ZS51c2UtZm9ybS5qcydcbmltcG9ydCB1c2VLZXlDb21wb3NpdGlvbiBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1rZXktY29tcG9zaXRpb24vdXNlLWtleS1jb21wb3NpdGlvbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaXNEZWVwRXF1YWwgfSBmcm9tICcuLi8uLi91dGlscy9pcy9pcy5qcydcbmltcG9ydCB7IHN0b3AsIHByZXZlbnQsIHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5pbXBvcnQgeyBub3JtYWxpemVUb0ludGVydmFsIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybWF0L2Zvcm1hdC5qcydcbmltcG9ydCB7IHNob3VsZElnbm9yZUtleSwgaXNLZXlDb2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5rZXlib2FyZC9rZXktY29tcG9zaXRpb24uanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuXG5jb25zdCB2YWxpZGF0ZU5ld1ZhbHVlTW9kZSA9IHYgPT4gWyAnYWRkJywgJ2FkZC11bmlxdWUnLCAndG9nZ2xlJyBdLmluY2x1ZGVzKHYpXG5jb25zdCByZUVzY2FwZUxpc3QgPSAnLiorP14ke30oKXxbXVxcXFwnXG5jb25zdCBmaWVsZFByb3BzTGlzdCA9IE9iamVjdC5rZXlzKHVzZUZpZWxkUHJvcHMpXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU2VsZWN0JyxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlVmlydHVhbFNjcm9sbFByb3BzLFxuICAgIC4uLnVzZUZvcm1Qcm9wcyxcbiAgICAuLi51c2VGaWVsZFByb3BzLFxuXG4gICAgLy8gb3ZlcnJpZGUgb2YgdXNlRmllbGRQcm9wcyA+IG1vZGVsVmFsdWVcbiAgICBtb2RlbFZhbHVlOiB7XG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG5cbiAgICBtdWx0aXBsZTogQm9vbGVhbixcblxuICAgIGRpc3BsYXlWYWx1ZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgIGRpc3BsYXlWYWx1ZUh0bWw6IEJvb2xlYW4sXG4gICAgZHJvcGRvd25JY29uOiBTdHJpbmcsXG5cbiAgICBvcHRpb25zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IFtdXG4gICAgfSxcblxuICAgIG9wdGlvblZhbHVlOiBbIEZ1bmN0aW9uLCBTdHJpbmcgXSxcbiAgICBvcHRpb25MYWJlbDogWyBGdW5jdGlvbiwgU3RyaW5nIF0sXG4gICAgb3B0aW9uRGlzYWJsZTogWyBGdW5jdGlvbiwgU3RyaW5nIF0sXG5cbiAgICBoaWRlU2VsZWN0ZWQ6IEJvb2xlYW4sXG4gICAgaGlkZURyb3Bkb3duSWNvbjogQm9vbGVhbixcbiAgICBmaWxsSW5wdXQ6IEJvb2xlYW4sXG5cbiAgICBtYXhWYWx1ZXM6IFsgTnVtYmVyLCBTdHJpbmcgXSxcblxuICAgIG9wdGlvbnNEZW5zZTogQm9vbGVhbixcbiAgICBvcHRpb25zRGFyazoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIG9wdGlvbnNTZWxlY3RlZENsYXNzOiBTdHJpbmcsXG4gICAgb3B0aW9uc0h0bWw6IEJvb2xlYW4sXG5cbiAgICBvcHRpb25zQ292ZXI6IEJvb2xlYW4sXG5cbiAgICBtZW51U2hyaW5rOiBCb29sZWFuLFxuICAgIG1lbnVBbmNob3I6IFN0cmluZyxcbiAgICBtZW51U2VsZjogU3RyaW5nLFxuICAgIG1lbnVPZmZzZXQ6IEFycmF5LFxuXG4gICAgcG9wdXBDb250ZW50Q2xhc3M6IFN0cmluZyxcbiAgICBwb3B1cENvbnRlbnRTdHlsZTogWyBTdHJpbmcsIEFycmF5LCBPYmplY3QgXSxcbiAgICBwb3B1cE5vUm91dGVEaXNtaXNzOiBCb29sZWFuLFxuXG4gICAgdXNlSW5wdXQ6IEJvb2xlYW4sXG4gICAgdXNlQ2hpcHM6IEJvb2xlYW4sXG5cbiAgICBuZXdWYWx1ZU1vZGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdGVOZXdWYWx1ZU1vZGVcbiAgICB9LFxuXG4gICAgbWFwT3B0aW9uczogQm9vbGVhbixcbiAgICBlbWl0VmFsdWU6IEJvb2xlYW4sXG5cbiAgICBpbnB1dERlYm91bmNlOiB7XG4gICAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgICBkZWZhdWx0OiA1MDBcbiAgICB9LFxuXG4gICAgaW5wdXRDbGFzczogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXSxcbiAgICBpbnB1dFN0eWxlOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuXG4gICAgdGFiaW5kZXg6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuXG4gICAgYXV0b2NvbXBsZXRlOiBTdHJpbmcsXG5cbiAgICB0cmFuc2l0aW9uU2hvdzoge30sXG4gICAgdHJhbnNpdGlvbkhpZGU6IHt9LFxuICAgIHRyYW5zaXRpb25EdXJhdGlvbjoge30sXG5cbiAgICBiZWhhdmlvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IFsgJ2RlZmF1bHQnLCAnbWVudScsICdkaWFsb2cnIF0uaW5jbHVkZXModiksXG4gICAgICBkZWZhdWx0OiAnZGVmYXVsdCdcbiAgICB9LFxuXG4gICAgLy8gb3ZlcnJpZGUgb2YgdXNlVmlydHVhbFNjcm9sbFByb3BzID4gdmlydHVhbFNjcm9sbEl0ZW1TaXplIChubyBkZWZhdWx0KVxuICAgIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZTogdXNlVmlydHVhbFNjcm9sbFByb3BzLnZpcnR1YWxTY3JvbGxJdGVtU2l6ZS50eXBlLFxuXG4gICAgb25OZXdWYWx1ZTogRnVuY3Rpb24sXG4gICAgb25GaWx0ZXI6IEZ1bmN0aW9uXG4gIH0sXG5cbiAgZW1pdHM6IFtcbiAgICAuLi51c2VGaWVsZEVtaXRzLFxuICAgICdhZGQnLCAncmVtb3ZlJywgJ2lucHV0VmFsdWUnLFxuICAgICdrZXl1cCcsICdrZXlwcmVzcycsICdrZXlkb3duJyxcbiAgICAncG9wdXBTaG93JywgJ3BvcHVwSGlkZScsXG4gICAgJ2ZpbHRlckFib3J0J1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gICAgY29uc3QgbWVudSA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBkaWFsb2cgPSByZWYoZmFsc2UpXG4gICAgY29uc3Qgb3B0aW9uSW5kZXggPSByZWYoLTEpXG4gICAgY29uc3QgaW5wdXRWYWx1ZSA9IHJlZignJylcbiAgICBjb25zdCBkaWFsb2dGaWVsZEZvY3VzZWQgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgaW5uZXJMb2FkaW5nSW5kaWNhdG9yID0gcmVmKGZhbHNlKVxuXG4gICAgbGV0IGZpbHRlclRpbWVyID0gbnVsbCwgaW5wdXRWYWx1ZVRpbWVyID0gbnVsbCxcbiAgICAgIGlubmVyVmFsdWVDYWNoZSxcbiAgICAgIGhhc0RpYWxvZywgdXNlcklucHV0VmFsdWUsIGZpbHRlcklkID0gbnVsbCwgZGVmYXVsdElucHV0VmFsdWUsXG4gICAgICB0cmFuc2l0aW9uU2hvd0NvbXB1dGVkLCBzZWFyY2hCdWZmZXIsIHNlYXJjaEJ1ZmZlckV4cFxuXG4gICAgY29uc3QgaW5wdXRSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCB0YXJnZXRSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBtZW51UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgZGlhbG9nUmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgbWVudUNvbnRlbnRSZWYgPSByZWYobnVsbClcblxuICAgIGNvbnN0IG5hbWVQcm9wID0gdXNlRm9ybUlucHV0TmFtZUF0dHIocHJvcHMpXG5cbiAgICBjb25zdCBvbkNvbXBvc2l0aW9uID0gdXNlS2V5Q29tcG9zaXRpb24ob25JbnB1dClcblxuICAgIGNvbnN0IHZpcnR1YWxTY3JvbGxMZW5ndGggPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBBcnJheS5pc0FycmF5KHByb3BzLm9wdGlvbnMpXG4gICAgICAgID8gcHJvcHMub3B0aW9ucy5sZW5ndGhcbiAgICAgICAgOiAwXG4gICAgKSlcblxuICAgIGNvbnN0IHZpcnR1YWxTY3JvbGxJdGVtU2l6ZUNvbXB1dGVkID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMudmlydHVhbFNjcm9sbEl0ZW1TaXplID09PSB2b2lkIDBcbiAgICAgICAgPyAocHJvcHMub3B0aW9uc0RlbnNlID09PSB0cnVlID8gMjQgOiA0OClcbiAgICAgICAgOiBwcm9wcy52aXJ0dWFsU2Nyb2xsSXRlbVNpemVcbiAgICApKVxuXG4gICAgY29uc3Qge1xuICAgICAgdmlydHVhbFNjcm9sbFNsaWNlUmFuZ2UsXG4gICAgICB2aXJ0dWFsU2Nyb2xsU2xpY2VTaXplQ29tcHV0ZWQsXG4gICAgICBsb2NhbFJlc2V0VmlydHVhbFNjcm9sbCxcbiAgICAgIHBhZFZpcnR1YWxTY3JvbGwsXG4gICAgICBvblZpcnR1YWxTY3JvbGxFdnQsXG4gICAgICBzY3JvbGxUbyxcbiAgICAgIHNldFZpcnR1YWxTY3JvbGxTaXplXG4gICAgfSA9IHVzZVZpcnR1YWxTY3JvbGwoe1xuICAgICAgdmlydHVhbFNjcm9sbExlbmd0aCwgZ2V0VmlydHVhbFNjcm9sbFRhcmdldCwgZ2V0VmlydHVhbFNjcm9sbEVsLFxuICAgICAgdmlydHVhbFNjcm9sbEl0ZW1TaXplQ29tcHV0ZWRcbiAgICB9KVxuXG4gICAgY29uc3Qgc3RhdGUgPSB1c2VGaWVsZFN0YXRlKClcblxuICAgIGNvbnN0IGlubmVyVmFsdWUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdFxuICAgICAgICBtYXBOdWxsID0gcHJvcHMubWFwT3B0aW9ucyA9PT0gdHJ1ZSAmJiBwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSxcbiAgICAgICAgdmFsID0gcHJvcHMubW9kZWxWYWx1ZSAhPT0gdm9pZCAwICYmIChwcm9wcy5tb2RlbFZhbHVlICE9PSBudWxsIHx8IG1hcE51bGwgPT09IHRydWUpXG4gICAgICAgICAgPyAocHJvcHMubXVsdGlwbGUgPT09IHRydWUgJiYgQXJyYXkuaXNBcnJheShwcm9wcy5tb2RlbFZhbHVlKSA/IHByb3BzLm1vZGVsVmFsdWUgOiBbIHByb3BzLm1vZGVsVmFsdWUgXSlcbiAgICAgICAgICA6IFtdXG5cbiAgICAgIGlmIChwcm9wcy5tYXBPcHRpb25zID09PSB0cnVlICYmIEFycmF5LmlzQXJyYXkocHJvcHMub3B0aW9ucykgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgY2FjaGUgPSBwcm9wcy5tYXBPcHRpb25zID09PSB0cnVlICYmIGlubmVyVmFsdWVDYWNoZSAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBpbm5lclZhbHVlQ2FjaGVcbiAgICAgICAgICA6IFtdXG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IHZhbC5tYXAodiA9PiBnZXRPcHRpb24odiwgY2FjaGUpKVxuXG4gICAgICAgIHJldHVybiBwcm9wcy5tb2RlbFZhbHVlID09PSBudWxsICYmIG1hcE51bGwgPT09IHRydWVcbiAgICAgICAgICA/IHZhbHVlcy5maWx0ZXIodiA9PiB2ICE9PSBudWxsKVxuICAgICAgICAgIDogdmFsdWVzXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWxcbiAgICB9KVxuXG4gICAgY29uc3QgaW5uZXJGaWVsZFByb3BzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYWNjID0ge31cbiAgICAgIGZpZWxkUHJvcHNMaXN0LmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgY29uc3QgdmFsID0gcHJvcHNbIGtleSBdXG4gICAgICAgIGlmICh2YWwgIT09IHZvaWQgMCkge1xuICAgICAgICAgIGFjY1sga2V5IF0gPSB2YWxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHJldHVybiBhY2NcbiAgICB9KVxuXG4gICAgY29uc3QgaXNPcHRpb25zRGFyayA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLm9wdGlvbnNEYXJrID09PSBudWxsXG4gICAgICAgID8gc3RhdGUuaXNEYXJrLnZhbHVlXG4gICAgICAgIDogcHJvcHMub3B0aW9uc0RhcmtcbiAgICApKVxuXG4gICAgY29uc3QgaGFzVmFsdWUgPSBjb21wdXRlZCgoKSA9PiBmaWVsZFZhbHVlSXNGaWxsZWQoaW5uZXJWYWx1ZS52YWx1ZSkpXG5cbiAgICBjb25zdCBjb21wdXRlZElucHV0Q2xhc3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBsZXQgY2xzID0gJ3EtZmllbGRfX2lucHV0IHEtcGxhY2Vob2xkZXIgY29sJ1xuXG4gICAgICBpZiAocHJvcHMuaGlkZVNlbGVjdGVkID09PSB0cnVlIHx8IGlubmVyVmFsdWUudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBbIGNscywgcHJvcHMuaW5wdXRDbGFzcyBdXG4gICAgICB9XG5cbiAgICAgIGNscyArPSAnIHEtZmllbGRfX2lucHV0LS1wYWRkaW5nJ1xuXG4gICAgICByZXR1cm4gcHJvcHMuaW5wdXRDbGFzcyA9PT0gdm9pZCAwXG4gICAgICAgID8gY2xzXG4gICAgICAgIDogWyBjbHMsIHByb3BzLmlucHV0Q2xhc3MgXVxuICAgIH0pXG5cbiAgICBjb25zdCBtZW51Q29udGVudENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIChwcm9wcy52aXJ0dWFsU2Nyb2xsSG9yaXpvbnRhbCA9PT0gdHJ1ZSA/ICdxLXZpcnR1YWwtc2Nyb2xsLS1ob3Jpem9udGFsJyA6ICcnKVxuICAgICAgKyAocHJvcHMucG9wdXBDb250ZW50Q2xhc3MgPyAnICcgKyBwcm9wcy5wb3B1cENvbnRlbnRDbGFzcyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IG5vT3B0aW9ucyA9IGNvbXB1dGVkKCgpID0+IHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgPT09IDApXG5cbiAgICBjb25zdCBzZWxlY3RlZFN0cmluZyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBpbm5lclZhbHVlLnZhbHVlXG4gICAgICAgIC5tYXAob3B0ID0+IGdldE9wdGlvbkxhYmVsLnZhbHVlKG9wdCkpXG4gICAgICAgIC5qb2luKCcsICcpXG4gICAgKVxuXG4gICAgY29uc3QgYXJpYUN1cnJlbnRWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IChwcm9wcy5kaXNwbGF5VmFsdWUgIT09IHZvaWQgMFxuICAgICAgPyBwcm9wcy5kaXNwbGF5VmFsdWVcbiAgICAgIDogc2VsZWN0ZWRTdHJpbmcudmFsdWVcbiAgICApKVxuXG4gICAgY29uc3QgbmVlZHNIdG1sRm4gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5vcHRpb25zSHRtbCA9PT0gdHJ1ZVxuICAgICAgICA/ICgpID0+IHRydWVcbiAgICAgICAgOiBvcHQgPT4gb3B0ICE9PSB2b2lkIDAgJiYgb3B0ICE9PSBudWxsICYmIG9wdC5odG1sID09PSB0cnVlXG4gICAgKSlcblxuICAgIGNvbnN0IHZhbHVlQXNIdG1sID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuZGlzcGxheVZhbHVlSHRtbCA9PT0gdHJ1ZSB8fCAoXG4gICAgICAgIHByb3BzLmRpc3BsYXlWYWx1ZSA9PT0gdm9pZCAwICYmIChcbiAgICAgICAgICBwcm9wcy5vcHRpb25zSHRtbCA9PT0gdHJ1ZVxuICAgICAgICAgIHx8IGlubmVyVmFsdWUudmFsdWUuc29tZShuZWVkc0h0bWxGbi52YWx1ZSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgICkpXG5cbiAgICBjb25zdCB0YWJpbmRleCA9IGNvbXB1dGVkKCgpID0+IChzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlID8gcHJvcHMudGFiaW5kZXggOiAtMSkpXG5cbiAgICBjb25zdCBjb21ib2JveEF0dHJzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYXR0cnMgPSB7XG4gICAgICAgIHRhYmluZGV4OiBwcm9wcy50YWJpbmRleCxcbiAgICAgICAgcm9sZTogJ2NvbWJvYm94JyxcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiBwcm9wcy5sYWJlbCxcbiAgICAgICAgJ2FyaWEtcmVhZG9ubHknOiBwcm9wcy5yZWFkb25seSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZScsXG4gICAgICAgICdhcmlhLWF1dG9jb21wbGV0ZSc6IHByb3BzLnVzZUlucHV0ID09PSB0cnVlID8gJ2xpc3QnIDogJ25vbmUnLFxuICAgICAgICAnYXJpYS1leHBhbmRlZCc6IG1lbnUudmFsdWUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnLFxuICAgICAgICAnYXJpYS1jb250cm9scyc6IGAkeyBzdGF0ZS50YXJnZXRVaWQudmFsdWUgfV9sYmBcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbkluZGV4LnZhbHVlID49IDApIHtcbiAgICAgICAgYXR0cnNbICdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnIF0gPSBgJHsgc3RhdGUudGFyZ2V0VWlkLnZhbHVlIH1fJHsgb3B0aW9uSW5kZXgudmFsdWUgfWBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF0dHJzXG4gICAgfSlcblxuICAgIGNvbnN0IGxpc3Rib3hBdHRycyA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICBpZDogYCR7IHN0YXRlLnRhcmdldFVpZC52YWx1ZSB9X2xiYCxcbiAgICAgIHJvbGU6ICdsaXN0Ym94JyxcbiAgICAgICdhcmlhLW11bHRpc2VsZWN0YWJsZSc6IHByb3BzLm11bHRpcGxlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJ1xuICAgIH0pKVxuXG4gICAgY29uc3Qgc2VsZWN0ZWRTY29wZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIHJldHVybiBpbm5lclZhbHVlLnZhbHVlLm1hcCgob3B0LCBpKSA9PiAoe1xuICAgICAgICBpbmRleDogaSxcbiAgICAgICAgb3B0LFxuICAgICAgICBodG1sOiBuZWVkc0h0bWxGbi52YWx1ZShvcHQpLFxuICAgICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICAgICAgcmVtb3ZlQXRJbmRleDogcmVtb3ZlQXRJbmRleEFuZEZvY3VzLFxuICAgICAgICB0b2dnbGVPcHRpb24sXG4gICAgICAgIHRhYmluZGV4OiB0YWJpbmRleC52YWx1ZVxuICAgICAgfSkpXG4gICAgfSlcblxuICAgIGNvbnN0IG9wdGlvblNjb3BlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFtdXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgZnJvbSwgdG8gfSA9IHZpcnR1YWxTY3JvbGxTbGljZVJhbmdlLnZhbHVlXG5cbiAgICAgIHJldHVybiBwcm9wcy5vcHRpb25zLnNsaWNlKGZyb20sIHRvKS5tYXAoKG9wdCwgaSkgPT4ge1xuICAgICAgICBjb25zdCBkaXNhYmxlID0gaXNPcHRpb25EaXNhYmxlZC52YWx1ZShvcHQpID09PSB0cnVlXG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IGlzT3B0aW9uU2VsZWN0ZWQob3B0KSA9PT0gdHJ1ZVxuICAgICAgICBjb25zdCBpbmRleCA9IGZyb20gKyBpXG5cbiAgICAgICAgY29uc3QgaXRlbVByb3BzID0ge1xuICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICBhY3RpdmUsXG4gICAgICAgICAgYWN0aXZlQ2xhc3M6IGNvbXB1dGVkT3B0aW9uc1NlbGVjdGVkQ2xhc3MudmFsdWUsXG4gICAgICAgICAgbWFudWFsRm9jdXM6IHRydWUsXG4gICAgICAgICAgZm9jdXNlZDogZmFsc2UsXG4gICAgICAgICAgZGlzYWJsZSxcbiAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgZGVuc2U6IHByb3BzLm9wdGlvbnNEZW5zZSxcbiAgICAgICAgICBkYXJrOiBpc09wdGlvbnNEYXJrLnZhbHVlLFxuICAgICAgICAgIHJvbGU6ICdvcHRpb24nLFxuICAgICAgICAgICdhcmlhLXNlbGVjdGVkJzogYWN0aXZlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJyxcbiAgICAgICAgICBpZDogYCR7IHN0YXRlLnRhcmdldFVpZC52YWx1ZSB9XyR7IGluZGV4IH1gLFxuICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHsgdG9nZ2xlT3B0aW9uKG9wdCkgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpc2FibGUgIT09IHRydWUpIHtcbiAgICAgICAgICBvcHRpb25JbmRleC52YWx1ZSA9PT0gaW5kZXggJiYgKGl0ZW1Qcm9wcy5mb2N1c2VkID0gdHJ1ZSlcblxuICAgICAgICAgIGlmICgkcS5wbGF0Zm9ybS5pcy5kZXNrdG9wID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpdGVtUHJvcHMub25Nb3VzZW1vdmUgPSAoKSA9PiB7IG1lbnUudmFsdWUgPT09IHRydWUgJiYgc2V0T3B0aW9uSW5kZXgoaW5kZXgpIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGluZGV4LFxuICAgICAgICAgIG9wdCxcbiAgICAgICAgICBodG1sOiBuZWVkc0h0bWxGbi52YWx1ZShvcHQpLFxuICAgICAgICAgIGxhYmVsOiBnZXRPcHRpb25MYWJlbC52YWx1ZShvcHQpLFxuICAgICAgICAgIHNlbGVjdGVkOiBpdGVtUHJvcHMuYWN0aXZlLFxuICAgICAgICAgIGZvY3VzZWQ6IGl0ZW1Qcm9wcy5mb2N1c2VkLFxuICAgICAgICAgIHRvZ2dsZU9wdGlvbixcbiAgICAgICAgICBzZXRPcHRpb25JbmRleCxcbiAgICAgICAgICBpdGVtUHJvcHNcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgY29uc3QgZHJvcGRvd25BcnJvd0ljb24gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5kcm9wZG93bkljb24gIT09IHZvaWQgMFxuICAgICAgICA/IHByb3BzLmRyb3Bkb3duSWNvblxuICAgICAgICA6ICRxLmljb25TZXQuYXJyb3cuZHJvcGRvd25cbiAgICApKVxuXG4gICAgY29uc3Qgc3F1YXJlZE1lbnUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMub3B0aW9uc0NvdmVyID09PSBmYWxzZVxuICAgICAgJiYgcHJvcHMub3V0bGluZWQgIT09IHRydWVcbiAgICAgICYmIHByb3BzLnN0YW5kb3V0ICE9PSB0cnVlXG4gICAgICAmJiBwcm9wcy5ib3JkZXJsZXNzICE9PSB0cnVlXG4gICAgICAmJiBwcm9wcy5yb3VuZGVkICE9PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgY29tcHV0ZWRPcHRpb25zU2VsZWN0ZWRDbGFzcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLm9wdGlvbnNTZWxlY3RlZENsYXNzICE9PSB2b2lkIDBcbiAgICAgICAgPyBwcm9wcy5vcHRpb25zU2VsZWN0ZWRDbGFzc1xuICAgICAgICA6IChwcm9wcy5jb2xvciAhPT0gdm9pZCAwID8gYHRleHQtJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICApKVxuXG4gICAgLy8gcmV0dXJucyBtZXRob2QgdG8gZ2V0IHZhbHVlIG9mIGFuIG9wdGlvbjtcbiAgICAvLyB0YWtlcyBpbnRvIGFjY291bnQgJ29wdGlvbi12YWx1ZScgcHJvcFxuICAgIGNvbnN0IGdldE9wdGlvblZhbHVlID0gY29tcHV0ZWQoKCkgPT4gZ2V0UHJvcFZhbHVlRm4ocHJvcHMub3B0aW9uVmFsdWUsICd2YWx1ZScpKVxuXG4gICAgLy8gcmV0dXJucyBtZXRob2QgdG8gZ2V0IGxhYmVsIG9mIGFuIG9wdGlvbjtcbiAgICAvLyB0YWtlcyBpbnRvIGFjY291bnQgJ29wdGlvbi1sYWJlbCcgcHJvcFxuICAgIGNvbnN0IGdldE9wdGlvbkxhYmVsID0gY29tcHV0ZWQoKCkgPT4gZ2V0UHJvcFZhbHVlRm4ocHJvcHMub3B0aW9uTGFiZWwsICdsYWJlbCcpKVxuXG4gICAgLy8gcmV0dXJucyBtZXRob2QgdG8gdGVsbCBpZiBhbiBvcHRpb24gaXMgZGlzYWJsZWQ7XG4gICAgLy8gdGFrZXMgaW50byBhY2NvdW50ICdvcHRpb24tZGlzYWJsZScgcHJvcFxuICAgIGNvbnN0IGlzT3B0aW9uRGlzYWJsZWQgPSBjb21wdXRlZCgoKSA9PiBnZXRQcm9wVmFsdWVGbihwcm9wcy5vcHRpb25EaXNhYmxlLCAnZGlzYWJsZScpKVxuXG4gICAgY29uc3QgaW5uZXJPcHRpb25zVmFsdWUgPSBjb21wdXRlZCgoKSA9PiBpbm5lclZhbHVlLnZhbHVlLm1hcChvcHQgPT4gZ2V0T3B0aW9uVmFsdWUudmFsdWUob3B0KSkpXG5cbiAgICBjb25zdCBpbnB1dENvbnRyb2xFdmVudHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBldnQgPSB7XG4gICAgICAgIG9uSW5wdXQsXG4gICAgICAgIC8vIFNhZmFyaSA8IDEwLjIgJiBVSVdlYlZpZXcgZG9lc24ndCBmaXJlIGNvbXBvc2l0aW9uZW5kIHdoZW5cbiAgICAgICAgLy8gc3dpdGNoaW5nIGZvY3VzIGJlZm9yZSBjb25maXJtaW5nIGNvbXBvc2l0aW9uIGNob2ljZVxuICAgICAgICAvLyB0aGlzIGFsc28gZml4ZXMgdGhlIGlzc3VlIHdoZXJlIHNvbWUgYnJvd3NlcnMgZS5nLiBpT1MgQ2hyb21lXG4gICAgICAgIC8vIGZpcmVzIFwiY2hhbmdlXCIgaW5zdGVhZCBvZiBcImlucHV0XCIgb24gYXV0b2NvbXBsZXRlLlxuICAgICAgICBvbkNoYW5nZTogb25Db21wb3NpdGlvbixcbiAgICAgICAgb25LZXlkb3duOiBvblRhcmdldEtleWRvd24sXG4gICAgICAgIG9uS2V5dXA6IG9uVGFyZ2V0QXV0b2NvbXBsZXRlLFxuICAgICAgICBvbktleXByZXNzOiBvblRhcmdldEtleXByZXNzLFxuICAgICAgICBvbkZvY3VzOiBzZWxlY3RJbnB1dFRleHQsXG4gICAgICAgIG9uQ2xpY2sgKGUpIHsgaGFzRGlhbG9nID09PSB0cnVlICYmIHN0b3AoZSkgfVxuICAgICAgfVxuXG4gICAgICBldnQub25Db21wb3NpdGlvbnN0YXJ0ID0gZXZ0Lm9uQ29tcG9zaXRpb251cGRhdGUgPSBldnQub25Db21wb3NpdGlvbmVuZCA9IG9uQ29tcG9zaXRpb25cblxuICAgICAgcmV0dXJuIGV2dFxuICAgIH0pXG5cbiAgICB3YXRjaChpbm5lclZhbHVlLCB2YWwgPT4ge1xuICAgICAgaW5uZXJWYWx1ZUNhY2hlID0gdmFsXG5cbiAgICAgIGlmIChcbiAgICAgICAgcHJvcHMudXNlSW5wdXQgPT09IHRydWVcbiAgICAgICAgJiYgcHJvcHMuZmlsbElucHV0ID09PSB0cnVlXG4gICAgICAgICYmIHByb3BzLm11bHRpcGxlICE9PSB0cnVlXG4gICAgICAgIC8vIFByZXZlbnQgcmUtZW50ZXJpbmcgaW4gZmlsdGVyIHdoaWxlIGZpbHRlcmluZ1xuICAgICAgICAvLyBBbHNvIHByZXZlbnQgY2xlYXJpbmcgaW5wdXRWYWx1ZSB3aGlsZSBmaWx0ZXJpbmdcbiAgICAgICAgJiYgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlICE9PSB0cnVlXG4gICAgICAgICYmICgoZGlhbG9nLnZhbHVlICE9PSB0cnVlICYmIG1lbnUudmFsdWUgIT09IHRydWUpIHx8IGhhc1ZhbHVlLnZhbHVlICE9PSB0cnVlKVxuICAgICAgKSB7XG4gICAgICAgIHVzZXJJbnB1dFZhbHVlICE9PSB0cnVlICYmIHJlc2V0SW5wdXRWYWx1ZSgpXG4gICAgICAgIGlmIChkaWFsb2cudmFsdWUgPT09IHRydWUgfHwgbWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGZpbHRlcignJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHsgaW1tZWRpYXRlOiB0cnVlIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5maWxsSW5wdXQsIHJlc2V0SW5wdXRWYWx1ZSlcblxuICAgIHdhdGNoKG1lbnUsIHVwZGF0ZU1lbnUpXG5cbiAgICB3YXRjaCh2aXJ0dWFsU2Nyb2xsTGVuZ3RoLCByZXJlbmRlck1lbnUpXG5cbiAgICBmdW5jdGlvbiBnZXRFbWl0dGluZ09wdGlvblZhbHVlIChvcHQpIHtcbiAgICAgIHJldHVybiBwcm9wcy5lbWl0VmFsdWUgPT09IHRydWVcbiAgICAgICAgPyBnZXRPcHRpb25WYWx1ZS52YWx1ZShvcHQpXG4gICAgICAgIDogb3B0XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlQXRJbmRleCAoaW5kZXgpIHtcbiAgICAgIGlmIChpbmRleCAhPT0gLTEgJiYgaW5kZXggPCBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCkge1xuICAgICAgICBpZiAocHJvcHMubXVsdGlwbGUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBtb2RlbCA9IHByb3BzLm1vZGVsVmFsdWUuc2xpY2UoKVxuICAgICAgICAgIGVtaXQoJ3JlbW92ZScsIHsgaW5kZXgsIHZhbHVlOiBtb2RlbC5zcGxpY2UoaW5kZXgsIDEpWyAwIF0gfSlcbiAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG1vZGVsKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbnVsbClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUF0SW5kZXhBbmRGb2N1cyAoaW5kZXgpIHtcbiAgICAgIHJlbW92ZUF0SW5kZXgoaW5kZXgpXG4gICAgICBzdGF0ZS5mb2N1cygpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkIChvcHQsIHVuaXF1ZSkge1xuICAgICAgY29uc3QgdmFsID0gZ2V0RW1pdHRpbmdPcHRpb25WYWx1ZShvcHQpXG5cbiAgICAgIGlmIChwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSkge1xuICAgICAgICBwcm9wcy5maWxsSW5wdXQgPT09IHRydWUgJiYgdXBkYXRlSW5wdXRWYWx1ZShcbiAgICAgICAgICBnZXRPcHRpb25MYWJlbC52YWx1ZShvcHQpLFxuICAgICAgICAgIHRydWUsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApXG5cbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB2YWwpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZW1pdCgnYWRkJywgeyBpbmRleDogMCwgdmFsdWU6IHZhbCB9KVxuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHByb3BzLm11bHRpcGxlID09PSB0cnVlID8gWyB2YWwgXSA6IHZhbClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmICh1bmlxdWUgPT09IHRydWUgJiYgaXNPcHRpb25TZWxlY3RlZChvcHQpID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMubWF4VmFsdWVzICE9PSB2b2lkIDAgJiYgcHJvcHMubW9kZWxWYWx1ZS5sZW5ndGggPj0gcHJvcHMubWF4VmFsdWVzKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCBtb2RlbCA9IHByb3BzLm1vZGVsVmFsdWUuc2xpY2UoKVxuXG4gICAgICBlbWl0KCdhZGQnLCB7IGluZGV4OiBtb2RlbC5sZW5ndGgsIHZhbHVlOiB2YWwgfSlcbiAgICAgIG1vZGVsLnB1c2godmFsKVxuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBtb2RlbClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVPcHRpb24gKG9wdCwga2VlcE9wZW4pIHtcbiAgICAgIGlmIChzdGF0ZS5lZGl0YWJsZS52YWx1ZSAhPT0gdHJ1ZSB8fCBvcHQgPT09IHZvaWQgMCB8fCBpc09wdGlvbkRpc2FibGVkLnZhbHVlKG9wdCkgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9wdFZhbHVlID0gZ2V0T3B0aW9uVmFsdWUudmFsdWUob3B0KVxuXG4gICAgICBpZiAocHJvcHMubXVsdGlwbGUgIT09IHRydWUpIHtcbiAgICAgICAgaWYgKGtlZXBPcGVuICE9PSB0cnVlKSB7XG4gICAgICAgICAgdXBkYXRlSW5wdXRWYWx1ZShcbiAgICAgICAgICAgIHByb3BzLmZpbGxJbnB1dCA9PT0gdHJ1ZSA/IGdldE9wdGlvbkxhYmVsLnZhbHVlKG9wdCkgOiAnJyxcbiAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgICAgKVxuXG4gICAgICAgICAgaGlkZVBvcHVwKClcbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldFJlZi52YWx1ZSAhPT0gbnVsbCAmJiB0YXJnZXRSZWYudmFsdWUuZm9jdXMoKVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCA9PT0gMFxuICAgICAgICAgIHx8IGlzRGVlcEVxdWFsKGdldE9wdGlvblZhbHVlLnZhbHVlKGlubmVyVmFsdWUudmFsdWVbIDAgXSksIG9wdFZhbHVlKSAhPT0gdHJ1ZVxuICAgICAgICApIHtcbiAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHByb3BzLmVtaXRWYWx1ZSA9PT0gdHJ1ZSA/IG9wdFZhbHVlIDogb3B0KVxuICAgICAgICB9XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAoaGFzRGlhbG9nICE9PSB0cnVlIHx8IGRpYWxvZ0ZpZWxkRm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSkgJiYgc3RhdGUuZm9jdXMoKVxuXG4gICAgICBzZWxlY3RJbnB1dFRleHQoKVxuXG4gICAgICBpZiAoaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc3QgdmFsID0gcHJvcHMuZW1pdFZhbHVlID09PSB0cnVlID8gb3B0VmFsdWUgOiBvcHRcbiAgICAgICAgZW1pdCgnYWRkJywgeyBpbmRleDogMCwgdmFsdWU6IHZhbCB9KVxuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHByb3BzLm11bHRpcGxlID09PSB0cnVlID8gWyB2YWwgXSA6IHZhbClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0XG4gICAgICAgIG1vZGVsID0gcHJvcHMubW9kZWxWYWx1ZS5zbGljZSgpLFxuICAgICAgICBpbmRleCA9IGlubmVyT3B0aW9uc1ZhbHVlLnZhbHVlLmZpbmRJbmRleCh2ID0+IGlzRGVlcEVxdWFsKHYsIG9wdFZhbHVlKSlcblxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICBlbWl0KCdyZW1vdmUnLCB7IGluZGV4LCB2YWx1ZTogbW9kZWwuc3BsaWNlKGluZGV4LCAxKVsgMCBdIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKHByb3BzLm1heFZhbHVlcyAhPT0gdm9pZCAwICYmIG1vZGVsLmxlbmd0aCA+PSBwcm9wcy5tYXhWYWx1ZXMpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhbCA9IHByb3BzLmVtaXRWYWx1ZSA9PT0gdHJ1ZSA/IG9wdFZhbHVlIDogb3B0XG5cbiAgICAgICAgZW1pdCgnYWRkJywgeyBpbmRleDogbW9kZWwubGVuZ3RoLCB2YWx1ZTogdmFsIH0pXG4gICAgICAgIG1vZGVsLnB1c2godmFsKVxuICAgICAgfVxuXG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG1vZGVsKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldE9wdGlvbkluZGV4IChpbmRleCkge1xuICAgICAgaWYgKCRxLnBsYXRmb3JtLmlzLmRlc2t0b3AgIT09IHRydWUpIHJldHVyblxuXG4gICAgICBjb25zdCB2YWwgPSBpbmRleCAhPT0gLTEgJiYgaW5kZXggPCB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlXG4gICAgICAgID8gaW5kZXhcbiAgICAgICAgOiAtMVxuXG4gICAgICBpZiAob3B0aW9uSW5kZXgudmFsdWUgIT09IHZhbCkge1xuICAgICAgICBvcHRpb25JbmRleC52YWx1ZSA9IHZhbFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdmVPcHRpb25TZWxlY3Rpb24gKG9mZnNldCA9IDEsIHNraXBJbnB1dFZhbHVlKSB7XG4gICAgICBpZiAobWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBsZXQgaW5kZXggPSBvcHRpb25JbmRleC52YWx1ZVxuICAgICAgICBkbyB7XG4gICAgICAgICAgaW5kZXggPSBub3JtYWxpemVUb0ludGVydmFsKFxuICAgICAgICAgICAgaW5kZXggKyBvZmZzZXQsXG4gICAgICAgICAgICAtMSxcbiAgICAgICAgICAgIHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUgLSAxXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChpbmRleCAhPT0gLTEgJiYgaW5kZXggIT09IG9wdGlvbkluZGV4LnZhbHVlICYmIGlzT3B0aW9uRGlzYWJsZWQudmFsdWUocHJvcHMub3B0aW9uc1sgaW5kZXggXSkgPT09IHRydWUpXG5cbiAgICAgICAgaWYgKG9wdGlvbkluZGV4LnZhbHVlICE9PSBpbmRleCkge1xuICAgICAgICAgIHNldE9wdGlvbkluZGV4KGluZGV4KVxuICAgICAgICAgIHNjcm9sbFRvKGluZGV4KVxuXG4gICAgICAgICAgaWYgKHNraXBJbnB1dFZhbHVlICE9PSB0cnVlICYmIHByb3BzLnVzZUlucHV0ID09PSB0cnVlICYmIHByb3BzLmZpbGxJbnB1dCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2V0SW5wdXRWYWx1ZShcbiAgICAgICAgICAgICAgaW5kZXggPj0gMFxuICAgICAgICAgICAgICAgID8gZ2V0T3B0aW9uTGFiZWwudmFsdWUocHJvcHMub3B0aW9uc1sgaW5kZXggXSlcbiAgICAgICAgICAgICAgICA6IGRlZmF1bHRJbnB1dFZhbHVlLFxuICAgICAgICAgICAgICB0cnVlXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0T3B0aW9uICh2YWx1ZSwgdmFsdWVDYWNoZSkge1xuICAgICAgY29uc3QgZm4gPSBvcHQgPT4gaXNEZWVwRXF1YWwoZ2V0T3B0aW9uVmFsdWUudmFsdWUob3B0KSwgdmFsdWUpXG4gICAgICByZXR1cm4gcHJvcHMub3B0aW9ucy5maW5kKGZuKSB8fCB2YWx1ZUNhY2hlLmZpbmQoZm4pIHx8IHZhbHVlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJvcFZhbHVlRm4gKHByb3BWYWx1ZSwgZGVmYXVsdFZhbCkge1xuICAgICAgY29uc3QgdmFsID0gcHJvcFZhbHVlICE9PSB2b2lkIDBcbiAgICAgICAgPyBwcm9wVmFsdWVcbiAgICAgICAgOiBkZWZhdWx0VmFsXG5cbiAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gdmFsXG4gICAgICAgIDogb3B0ID0+IChvcHQgIT09IG51bGwgJiYgdHlwZW9mIG9wdCA9PT0gJ29iamVjdCcgJiYgdmFsIGluIG9wdCA/IG9wdFsgdmFsIF0gOiBvcHQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNPcHRpb25TZWxlY3RlZCAob3B0KSB7XG4gICAgICBjb25zdCB2YWwgPSBnZXRPcHRpb25WYWx1ZS52YWx1ZShvcHQpXG4gICAgICByZXR1cm4gaW5uZXJPcHRpb25zVmFsdWUudmFsdWUuZmluZCh2ID0+IGlzRGVlcEVxdWFsKHYsIHZhbCkpICE9PSB2b2lkIDBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZWxlY3RJbnB1dFRleHQgKGUpIHtcbiAgICAgIGlmIChcbiAgICAgICAgcHJvcHMudXNlSW5wdXQgPT09IHRydWVcbiAgICAgICAgJiYgdGFyZ2V0UmVmLnZhbHVlICE9PSBudWxsXG4gICAgICAgICYmIChlID09PSB2b2lkIDAgfHwgKHRhcmdldFJlZi52YWx1ZSA9PT0gZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUgPT09IHNlbGVjdGVkU3RyaW5nLnZhbHVlKSlcbiAgICAgICkge1xuICAgICAgICB0YXJnZXRSZWYudmFsdWUuc2VsZWN0KClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblRhcmdldEtleXVwIChlKSB7XG4gICAgICAvLyBpZiBFU0MgYW5kIHdlIGhhdmUgYW4gb3BlbmVkIG1lbnVcbiAgICAgIC8vIHRoZW4gc3RvcCBwcm9wYWdhdGlvbiAobWlnaHQgYmUgY2F1Z2h0IGJ5IGEgUURpYWxvZ1xuICAgICAgLy8gYW5kIHNvIGl0IHdpbGwgYWxzbyBjbG9zZSB0aGUgUURpYWxvZywgd2hpY2ggaXMgd3JvbmcpXG4gICAgICBpZiAoaXNLZXlDb2RlKGUsIDI3KSA9PT0gdHJ1ZSAmJiBtZW51LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHN0b3AoZSlcbiAgICAgICAgLy8gb24gRVNDIHdlIG5lZWQgdG8gY2xvc2UgdGhlIGRpYWxvZyBhbHNvXG4gICAgICAgIGhpZGVQb3B1cCgpXG4gICAgICAgIHJlc2V0SW5wdXRWYWx1ZSgpXG4gICAgICB9XG5cbiAgICAgIGVtaXQoJ2tleXVwJywgZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblRhcmdldEF1dG9jb21wbGV0ZSAoZSkge1xuICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gZS50YXJnZXRcblxuICAgICAgaWYgKGUua2V5Q29kZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIG9uVGFyZ2V0S2V5dXAoZSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGUudGFyZ2V0LnZhbHVlID0gJydcblxuICAgICAgaWYgKGZpbHRlclRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChmaWx0ZXJUaW1lcilcbiAgICAgICAgZmlsdGVyVGltZXIgPSBudWxsXG4gICAgICB9XG4gICAgICBpZiAoaW5wdXRWYWx1ZVRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChpbnB1dFZhbHVlVGltZXIpXG4gICAgICAgIGlucHV0VmFsdWVUaW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgcmVzZXRJbnB1dFZhbHVlKClcblxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIGNvbnN0IG5lZWRsZSA9IHZhbHVlLnRvTG9jYWxlTG93ZXJDYXNlKClcbiAgICAgICAgY29uc3QgZmluZEZuID0gZXh0cmFjdEZuID0+IHtcbiAgICAgICAgICBjb25zdCBvcHRpb24gPSBwcm9wcy5vcHRpb25zLmZpbmQob3B0ID0+IGV4dHJhY3RGbi52YWx1ZShvcHQpLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09IG5lZWRsZSlcblxuICAgICAgICAgIGlmIChvcHRpb24gPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGlubmVyVmFsdWUudmFsdWUuaW5kZXhPZihvcHRpb24pID09PSAtMSkge1xuICAgICAgICAgICAgdG9nZ2xlT3B0aW9uKG9wdGlvbilcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBoaWRlUG9wdXAoKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmlsbEZuID0gYWZ0ZXJGaWx0ZXIgPT4ge1xuICAgICAgICAgIGlmIChmaW5kRm4oZ2V0T3B0aW9uVmFsdWUpID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGZpbmRGbihnZXRPcHRpb25MYWJlbCkgPT09IHRydWUgfHwgYWZ0ZXJGaWx0ZXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZpbHRlcih2YWx1ZSwgdHJ1ZSwgKCkgPT4gZmlsbEZuKHRydWUpKVxuICAgICAgICB9XG5cbiAgICAgICAgZmlsbEZuKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzdGF0ZS5jbGVhclZhbHVlKGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25UYXJnZXRLZXlwcmVzcyAoZSkge1xuICAgICAgZW1pdCgna2V5cHJlc3MnLCBlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uVGFyZ2V0S2V5ZG93biAoZSkge1xuICAgICAgZW1pdCgna2V5ZG93bicsIGUpXG5cbiAgICAgIGlmIChzaG91bGRJZ25vcmVLZXkoZSkgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5ld1ZhbHVlTW9kZVZhbGlkID0gaW5wdXRWYWx1ZS52YWx1ZS5sZW5ndGggIT09IDBcbiAgICAgICAgJiYgKHByb3BzLm5ld1ZhbHVlTW9kZSAhPT0gdm9pZCAwIHx8IHByb3BzLm9uTmV3VmFsdWUgIT09IHZvaWQgMClcblxuICAgICAgY29uc3QgdGFiU2hvdWxkU2VsZWN0ID0gZS5zaGlmdEtleSAhPT0gdHJ1ZVxuICAgICAgICAmJiBwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZVxuICAgICAgICAmJiAob3B0aW9uSW5kZXgudmFsdWUgIT09IC0xIHx8IG5ld1ZhbHVlTW9kZVZhbGlkID09PSB0cnVlKVxuXG4gICAgICAvLyBlc2NhcGVcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgIHByZXZlbnQoZSkgLy8gcHJldmVudCBjbGVhcmluZyB0aGUgaW5wdXRWYWx1ZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gdGFiXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSA5ICYmIHRhYlNob3VsZFNlbGVjdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgY2xvc2VNZW51KClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgZS50YXJnZXQgPT09IHZvaWQgMFxuICAgICAgICB8fCBlLnRhcmdldC5pZCAhPT0gc3RhdGUudGFyZ2V0VWlkLnZhbHVlXG4gICAgICAgIHx8IHN0YXRlLmVkaXRhYmxlLnZhbHVlICE9PSB0cnVlXG4gICAgICApIHJldHVyblxuXG4gICAgICAvLyBkb3duXG4gICAgICBpZiAoXG4gICAgICAgIGUua2V5Q29kZSA9PT0gNDBcbiAgICAgICAgJiYgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlICE9PSB0cnVlXG4gICAgICAgICYmIG1lbnUudmFsdWUgPT09IGZhbHNlXG4gICAgICApIHtcbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgc2hvd1BvcHVwKClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIGJhY2tzcGFjZVxuICAgICAgaWYgKFxuICAgICAgICBlLmtleUNvZGUgPT09IDhcbiAgICAgICAgJiYgKFxuICAgICAgICAgIHByb3BzLnVzZUNoaXBzID09PSB0cnVlXG4gICAgICAgICAgfHwgcHJvcHMuY2xlYXJhYmxlID09PSB0cnVlXG4gICAgICAgIClcbiAgICAgICAgJiYgcHJvcHMuaGlkZVNlbGVjdGVkICE9PSB0cnVlXG4gICAgICAgICYmIGlucHV0VmFsdWUudmFsdWUubGVuZ3RoID09PSAwXG4gICAgICApIHtcbiAgICAgICAgaWYgKHByb3BzLm11bHRpcGxlID09PSB0cnVlICYmIEFycmF5LmlzQXJyYXkocHJvcHMubW9kZWxWYWx1ZSkgPT09IHRydWUpIHtcbiAgICAgICAgICByZW1vdmVBdEluZGV4KHByb3BzLm1vZGVsVmFsdWUubGVuZ3RoIC0gMSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSAmJiBwcm9wcy5tb2RlbFZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBudWxsKVxuICAgICAgICB9XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBob21lLCBlbmQgLSAzNiwgMzVcbiAgICAgIGlmIChcbiAgICAgICAgKGUua2V5Q29kZSA9PT0gMzUgfHwgZS5rZXlDb2RlID09PSAzNilcbiAgICAgICAgJiYgKHR5cGVvZiBpbnB1dFZhbHVlLnZhbHVlICE9PSAnc3RyaW5nJyB8fCBpbnB1dFZhbHVlLnZhbHVlLmxlbmd0aCA9PT0gMClcbiAgICAgICkge1xuICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgICAgICBvcHRpb25JbmRleC52YWx1ZSA9IC0xXG4gICAgICAgIG1vdmVPcHRpb25TZWxlY3Rpb24oZS5rZXlDb2RlID09PSAzNiA/IDEgOiAtMSwgcHJvcHMubXVsdGlwbGUpXG4gICAgICB9XG5cbiAgICAgIC8vIHBnIHVwLCBwZyBkb3duIC0gMzMsIDM0XG4gICAgICBpZiAoXG4gICAgICAgIChlLmtleUNvZGUgPT09IDMzIHx8IGUua2V5Q29kZSA9PT0gMzQpXG4gICAgICAgICYmIHZpcnR1YWxTY3JvbGxTbGljZVNpemVDb21wdXRlZC52YWx1ZSAhPT0gdm9pZCAwXG4gICAgICApIHtcbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgb3B0aW9uSW5kZXgudmFsdWUgPSBNYXRoLm1heChcbiAgICAgICAgICAtMSxcbiAgICAgICAgICBNYXRoLm1pbihcbiAgICAgICAgICAgIHZpcnR1YWxTY3JvbGxMZW5ndGgudmFsdWUsXG4gICAgICAgICAgICBvcHRpb25JbmRleC52YWx1ZSArIChlLmtleUNvZGUgPT09IDMzID8gLTEgOiAxKSAqIHZpcnR1YWxTY3JvbGxTbGljZVNpemVDb21wdXRlZC52YWx1ZS52aWV3XG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgIG1vdmVPcHRpb25TZWxlY3Rpb24oZS5rZXlDb2RlID09PSAzMyA/IDEgOiAtMSwgcHJvcHMubXVsdGlwbGUpXG4gICAgICB9XG5cbiAgICAgIC8vIHVwLCBkb3duXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAzOCB8fCBlLmtleUNvZGUgPT09IDQwKSB7XG4gICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgICAgIG1vdmVPcHRpb25TZWxlY3Rpb24oZS5rZXlDb2RlID09PSAzOCA/IC0xIDogMSwgcHJvcHMubXVsdGlwbGUpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9wdGlvbnNMZW5ndGggPSB2aXJ0dWFsU2Nyb2xsTGVuZ3RoLnZhbHVlXG5cbiAgICAgIC8vIGNsZWFyIHNlYXJjaCBidWZmZXIgaWYgZXhwaXJlZFxuICAgICAgaWYgKHNlYXJjaEJ1ZmZlciA9PT0gdm9pZCAwIHx8IHNlYXJjaEJ1ZmZlckV4cCA8IERhdGUubm93KCkpIHtcbiAgICAgICAgc2VhcmNoQnVmZmVyID0gJydcbiAgICAgIH1cblxuICAgICAgLy8ga2V5Ym9hcmQgc2VhcmNoIHdoZW4gbm90IGhhdmluZyB1c2UtaW5wdXRcbiAgICAgIGlmIChcbiAgICAgICAgb3B0aW9uc0xlbmd0aCA+IDBcbiAgICAgICAgJiYgcHJvcHMudXNlSW5wdXQgIT09IHRydWVcbiAgICAgICAgJiYgZS5rZXkgIT09IHZvaWQgMFxuICAgICAgICAmJiBlLmtleS5sZW5ndGggPT09IDEgLy8gcHJpbnRhYmxlIGNoYXJcbiAgICAgICAgJiYgZS5hbHRLZXkgPT09IGZhbHNlIC8vIG5vdCBrYmQgc2hvcnRjdXRcbiAgICAgICAgJiYgZS5jdHJsS2V5ID09PSBmYWxzZSAvLyBub3Qga2JkIHNob3J0Y3V0XG4gICAgICAgICYmIGUubWV0YUtleSA9PT0gZmFsc2UgLy8gbm90IGtiZCBzaG9ydGN1dCwgZXNwZWNpYWxseSBvbiBtYWNPUyB3aXRoIENvbW1hbmQga2V5XG4gICAgICAgICYmIChlLmtleUNvZGUgIT09IDMyIHx8IHNlYXJjaEJ1ZmZlci5sZW5ndGggIT09IDApIC8vIHNwYWNlIGluIG1pZGRsZSBvZiBzZWFyY2hcbiAgICAgICkge1xuICAgICAgICBtZW51LnZhbHVlICE9PSB0cnVlICYmIHNob3dQb3B1cChlKVxuXG4gICAgICAgIGNvbnN0XG4gICAgICAgICAgY2hhciA9IGUua2V5LnRvTG9jYWxlTG93ZXJDYXNlKCksXG4gICAgICAgICAga2V5UmVwZWF0ID0gc2VhcmNoQnVmZmVyLmxlbmd0aCA9PT0gMSAmJiBzZWFyY2hCdWZmZXJbIDAgXSA9PT0gY2hhclxuXG4gICAgICAgIHNlYXJjaEJ1ZmZlckV4cCA9IERhdGUubm93KCkgKyAxNTAwXG4gICAgICAgIGlmIChrZXlSZXBlYXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgICAgICBzZWFyY2hCdWZmZXIgKz0gY2hhclxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VhcmNoUmUgPSBuZXcgUmVnRXhwKCdeJyArIHNlYXJjaEJ1ZmZlci5zcGxpdCgnJykubWFwKGwgPT4gKHJlRXNjYXBlTGlzdC5pbmRleE9mKGwpICE9PSAtMSA/ICdcXFxcJyArIGwgOiBsKSkuam9pbignLionKSwgJ2knKVxuXG4gICAgICAgIGxldCBpbmRleCA9IG9wdGlvbkluZGV4LnZhbHVlXG5cbiAgICAgICAgaWYgKGtleVJlcGVhdCA9PT0gdHJ1ZSB8fCBpbmRleCA8IDAgfHwgc2VhcmNoUmUudGVzdChnZXRPcHRpb25MYWJlbC52YWx1ZShwcm9wcy5vcHRpb25zWyBpbmRleCBdKSkgIT09IHRydWUpIHtcbiAgICAgICAgICBkbyB7XG4gICAgICAgICAgICBpbmRleCA9IG5vcm1hbGl6ZVRvSW50ZXJ2YWwoaW5kZXggKyAxLCAtMSwgb3B0aW9uc0xlbmd0aCAtIDEpXG4gICAgICAgICAgfVxuICAgICAgICAgIHdoaWxlIChpbmRleCAhPT0gb3B0aW9uSW5kZXgudmFsdWUgJiYgKFxuICAgICAgICAgICAgaXNPcHRpb25EaXNhYmxlZC52YWx1ZShwcm9wcy5vcHRpb25zWyBpbmRleCBdKSA9PT0gdHJ1ZVxuICAgICAgICAgICAgfHwgc2VhcmNoUmUudGVzdChnZXRPcHRpb25MYWJlbC52YWx1ZShwcm9wcy5vcHRpb25zWyBpbmRleCBdKSkgIT09IHRydWVcbiAgICAgICAgICApKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbkluZGV4LnZhbHVlICE9PSBpbmRleCkge1xuICAgICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgIHNldE9wdGlvbkluZGV4KGluZGV4KVxuICAgICAgICAgICAgc2Nyb2xsVG8oaW5kZXgpXG5cbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwICYmIHByb3BzLnVzZUlucHV0ID09PSB0cnVlICYmIHByb3BzLmZpbGxJbnB1dCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBzZXRJbnB1dFZhbHVlKGdldE9wdGlvbkxhYmVsLnZhbHVlKHByb3BzLm9wdGlvbnNbIGluZGV4IF0pLCB0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gZW50ZXIsIHNwYWNlICh3aGVuIG5vdCB1c2luZyB1c2UtaW5wdXQgYW5kIG5vdCBpbiBzZWFyY2gpLCBvciB0YWIgKHdoZW4gbm90IHVzaW5nIG11bHRpcGxlIGFuZCBvcHRpb24gc2VsZWN0ZWQpXG4gICAgICAvLyBzYW1lIHRhcmdldCBpcyBjaGVja2VkIGFib3ZlXG4gICAgICBpZiAoXG4gICAgICAgIGUua2V5Q29kZSAhPT0gMTNcbiAgICAgICAgJiYgKGUua2V5Q29kZSAhPT0gMzIgfHwgcHJvcHMudXNlSW5wdXQgPT09IHRydWUgfHwgc2VhcmNoQnVmZmVyICE9PSAnJylcbiAgICAgICAgJiYgKGUua2V5Q29kZSAhPT0gOSB8fCB0YWJTaG91bGRTZWxlY3QgPT09IGZhbHNlKVxuICAgICAgKSByZXR1cm5cblxuICAgICAgZS5rZXlDb2RlICE9PSA5ICYmIHN0b3BBbmRQcmV2ZW50KGUpXG5cbiAgICAgIGlmIChvcHRpb25JbmRleC52YWx1ZSAhPT0gLTEgJiYgb3B0aW9uSW5kZXgudmFsdWUgPCBvcHRpb25zTGVuZ3RoKSB7XG4gICAgICAgIHRvZ2dsZU9wdGlvbihwcm9wcy5vcHRpb25zWyBvcHRpb25JbmRleC52YWx1ZSBdKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKG5ld1ZhbHVlTW9kZVZhbGlkID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGRvbmUgPSAodmFsLCBtb2RlKSA9PiB7XG4gICAgICAgICAgaWYgKG1vZGUpIHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0ZU5ld1ZhbHVlTW9kZShtb2RlKSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtb2RlID0gcHJvcHMubmV3VmFsdWVNb2RlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdXBkYXRlSW5wdXRWYWx1ZSgnJywgcHJvcHMubXVsdGlwbGUgIT09IHRydWUsIHRydWUpXG5cbiAgICAgICAgICBpZiAodmFsID09PSB2b2lkIDAgfHwgdmFsID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBmbiA9IG1vZGUgPT09ICd0b2dnbGUnID8gdG9nZ2xlT3B0aW9uIDogYWRkXG4gICAgICAgICAgZm4odmFsLCBtb2RlID09PSAnYWRkLXVuaXF1ZScpXG5cbiAgICAgICAgICBpZiAocHJvcHMubXVsdGlwbGUgIT09IHRydWUpIHtcbiAgICAgICAgICAgIHRhcmdldFJlZi52YWx1ZSAhPT0gbnVsbCAmJiB0YXJnZXRSZWYudmFsdWUuZm9jdXMoKVxuICAgICAgICAgICAgaGlkZVBvcHVwKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMub25OZXdWYWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgZW1pdCgnbmV3VmFsdWUnLCBpbnB1dFZhbHVlLnZhbHVlLCBkb25lKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRvbmUoaW5wdXRWYWx1ZS52YWx1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZW51LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGNsb3NlTWVudSgpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgc2hvd1BvcHVwKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRWaXJ0dWFsU2Nyb2xsRWwgKCkge1xuICAgICAgcmV0dXJuIGhhc0RpYWxvZyA9PT0gdHJ1ZVxuICAgICAgICA/IG1lbnVDb250ZW50UmVmLnZhbHVlXG4gICAgICAgIDogKFxuICAgICAgICAgICAgbWVudVJlZi52YWx1ZSAhPT0gbnVsbCAmJiBtZW51UmVmLnZhbHVlLmNvbnRlbnRFbCAhPT0gbnVsbFxuICAgICAgICAgICAgICA/IG1lbnVSZWYudmFsdWUuY29udGVudEVsXG4gICAgICAgICAgICAgIDogdm9pZCAwXG4gICAgICAgICAgKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFZpcnR1YWxTY3JvbGxUYXJnZXQgKCkge1xuICAgICAgcmV0dXJuIGdldFZpcnR1YWxTY3JvbGxFbCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2VsZWN0aW9uICgpIHtcbiAgICAgIGlmIChwcm9wcy5oaWRlU2VsZWN0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIFtdXG4gICAgICB9XG5cbiAgICAgIGlmIChzbG90c1sgJ3NlbGVjdGVkLWl0ZW0nIF0gIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gc2VsZWN0ZWRTY29wZS52YWx1ZS5tYXAoc2NvcGUgPT4gc2xvdHNbICdzZWxlY3RlZC1pdGVtJyBdKHNjb3BlKSkuc2xpY2UoKVxuICAgICAgfVxuXG4gICAgICBpZiAoc2xvdHMuc2VsZWN0ZWQgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gW10uY29uY2F0KHNsb3RzLnNlbGVjdGVkKCkpXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy51c2VDaGlwcyA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gc2VsZWN0ZWRTY29wZS52YWx1ZS5tYXAoKHNjb3BlLCBpKSA9PiBoKFFDaGlwLCB7XG4gICAgICAgICAga2V5OiAnb3B0aW9uLScgKyBpLFxuICAgICAgICAgIHJlbW92YWJsZTogc3RhdGUuZWRpdGFibGUudmFsdWUgPT09IHRydWUgJiYgaXNPcHRpb25EaXNhYmxlZC52YWx1ZShzY29wZS5vcHQpICE9PSB0cnVlLFxuICAgICAgICAgIGRlbnNlOiB0cnVlLFxuICAgICAgICAgIHRleHRDb2xvcjogcHJvcHMuY29sb3IsXG4gICAgICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgICAgIG9uUmVtb3ZlICgpIHsgc2NvcGUucmVtb3ZlQXRJbmRleChpKSB9XG4gICAgICAgIH0sICgpID0+IGgoJ3NwYW4nLCB7XG4gICAgICAgICAgY2xhc3M6ICdlbGxpcHNpcycsXG4gICAgICAgICAgWyBzY29wZS5odG1sID09PSB0cnVlID8gJ2lubmVySFRNTCcgOiAndGV4dENvbnRlbnQnIF06IGdldE9wdGlvbkxhYmVsLnZhbHVlKHNjb3BlLm9wdClcbiAgICAgICAgfSkpKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gW1xuICAgICAgICBoKCdzcGFuJywge1xuICAgICAgICAgIFsgdmFsdWVBc0h0bWwudmFsdWUgPT09IHRydWUgPyAnaW5uZXJIVE1MJyA6ICd0ZXh0Q29udGVudCcgXTogYXJpYUN1cnJlbnRWYWx1ZS52YWx1ZVxuICAgICAgICB9KVxuICAgICAgXVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEFsbE9wdGlvbnMgKCkge1xuICAgICAgaWYgKG5vT3B0aW9ucy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gc2xvdHNbICduby1vcHRpb24nIF0gIT09IHZvaWQgMFxuICAgICAgICAgID8gc2xvdHNbICduby1vcHRpb24nIF0oeyBpbnB1dFZhbHVlOiBpbnB1dFZhbHVlLnZhbHVlIH0pXG4gICAgICAgICAgOiB2b2lkIDBcbiAgICAgIH1cblxuICAgICAgY29uc3QgZm4gPSBzbG90cy5vcHRpb24gIT09IHZvaWQgMFxuICAgICAgICA/IHNsb3RzLm9wdGlvblxuICAgICAgICA6IHNjb3BlID0+IHtcbiAgICAgICAgICByZXR1cm4gaChRSXRlbSwge1xuICAgICAgICAgICAga2V5OiBzY29wZS5pbmRleCxcbiAgICAgICAgICAgIC4uLnNjb3BlLml0ZW1Qcm9wc1xuICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBoKFxuICAgICAgICAgICAgICBRSXRlbVNlY3Rpb24sXG4gICAgICAgICAgICAgICgpID0+IGgoXG4gICAgICAgICAgICAgICAgUUl0ZW1MYWJlbCxcbiAgICAgICAgICAgICAgICAoKSA9PiBoKCdzcGFuJywge1xuICAgICAgICAgICAgICAgICAgWyBzY29wZS5odG1sID09PSB0cnVlID8gJ2lubmVySFRNTCcgOiAndGV4dENvbnRlbnQnIF06IHNjb3BlLmxhYmVsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgbGV0IG9wdGlvbnMgPSBwYWRWaXJ0dWFsU2Nyb2xsKCdkaXYnLCBvcHRpb25TY29wZS52YWx1ZS5tYXAoZm4pKVxuXG4gICAgICBpZiAoc2xvdHNbICdiZWZvcmUtb3B0aW9ucycgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIG9wdGlvbnMgPSBzbG90c1sgJ2JlZm9yZS1vcHRpb25zJyBdKCkuY29uY2F0KG9wdGlvbnMpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoTWVyZ2VTbG90KHNsb3RzWyAnYWZ0ZXItb3B0aW9ucycgXSwgb3B0aW9ucylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRJbnB1dCAoZnJvbURpYWxvZywgaXNUYXJnZXQpIHtcbiAgICAgIGNvbnN0IGF0dHJzID0gaXNUYXJnZXQgPT09IHRydWUgPyB7IC4uLmNvbWJvYm94QXR0cnMudmFsdWUsIC4uLnN0YXRlLnNwbGl0QXR0cnMuYXR0cmlidXRlcy52YWx1ZSB9IDogdm9pZCAwXG5cbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHJlZjogaXNUYXJnZXQgPT09IHRydWUgPyB0YXJnZXRSZWYgOiB2b2lkIDAsXG4gICAgICAgIGtleTogJ2lfdCcsXG4gICAgICAgIGNsYXNzOiBjb21wdXRlZElucHV0Q2xhc3MudmFsdWUsXG4gICAgICAgIHN0eWxlOiBwcm9wcy5pbnB1dFN0eWxlLFxuICAgICAgICB2YWx1ZTogaW5wdXRWYWx1ZS52YWx1ZSAhPT0gdm9pZCAwID8gaW5wdXRWYWx1ZS52YWx1ZSA6ICcnLFxuICAgICAgICAvLyByZXF1aXJlZCBmb3IgQW5kcm9pZCBpbiBvcmRlciB0byBzaG93IEVOVEVSIGtleSB3aGVuIGluIGZvcm1cbiAgICAgICAgdHlwZTogJ3NlYXJjaCcsXG4gICAgICAgIC4uLmF0dHJzLFxuICAgICAgICBpZDogaXNUYXJnZXQgPT09IHRydWUgPyBzdGF0ZS50YXJnZXRVaWQudmFsdWUgOiB2b2lkIDAsXG4gICAgICAgIG1heGxlbmd0aDogcHJvcHMubWF4bGVuZ3RoLFxuICAgICAgICBhdXRvY29tcGxldGU6IHByb3BzLmF1dG9jb21wbGV0ZSxcbiAgICAgICAgJ2RhdGEtYXV0b2ZvY3VzJzogZnJvbURpYWxvZyA9PT0gdHJ1ZSB8fCBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgfHwgdm9pZCAwLFxuICAgICAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSxcbiAgICAgICAgcmVhZG9ubHk6IHByb3BzLnJlYWRvbmx5ID09PSB0cnVlLFxuICAgICAgICAuLi5pbnB1dENvbnRyb2xFdmVudHMudmFsdWVcbiAgICAgIH1cblxuICAgICAgaWYgKGZyb21EaWFsb2cgIT09IHRydWUgJiYgaGFzRGlhbG9nID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEuY2xhc3MpID09PSB0cnVlKSB7XG4gICAgICAgICAgZGF0YS5jbGFzcyA9IFsgLi4uZGF0YS5jbGFzcywgJ25vLXBvaW50ZXItZXZlbnRzJyBdXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGF0YS5jbGFzcyArPSAnIG5vLXBvaW50ZXItZXZlbnRzJ1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKCdpbnB1dCcsIGRhdGEpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25JbnB1dCAoZSkge1xuICAgICAgaWYgKGZpbHRlclRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChmaWx0ZXJUaW1lcilcbiAgICAgICAgZmlsdGVyVGltZXIgPSBudWxsXG4gICAgICB9XG4gICAgICBpZiAoaW5wdXRWYWx1ZVRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChpbnB1dFZhbHVlVGltZXIpXG4gICAgICAgIGlucHV0VmFsdWVUaW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaWYgKGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQucUNvbXBvc2luZyA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgc2V0SW5wdXRWYWx1ZShlLnRhcmdldC52YWx1ZSB8fCAnJylcbiAgICAgIC8vIG1hcmsgaXQgaGVyZSBhcyB1c2VyIGlucHV0IHNvIHRoYXQgaWYgdXBkYXRlSW5wdXRWYWx1ZSBpcyBjYWxsZWRcbiAgICAgIC8vIGJlZm9yZSBmaWx0ZXIgaXMgY2FsbGVkIHRoZSBpbmRpY2F0b3IgaXMgcmVzZXRcbiAgICAgIHVzZXJJbnB1dFZhbHVlID0gdHJ1ZVxuICAgICAgZGVmYXVsdElucHV0VmFsdWUgPSBpbnB1dFZhbHVlLnZhbHVlXG5cbiAgICAgIGlmIChcbiAgICAgICAgc3RhdGUuZm9jdXNlZC52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgICAmJiAoaGFzRGlhbG9nICE9PSB0cnVlIHx8IGRpYWxvZ0ZpZWxkRm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSlcbiAgICAgICkge1xuICAgICAgICBzdGF0ZS5mb2N1cygpXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5vbkZpbHRlciAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGZpbHRlclRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgZmlsdGVyVGltZXIgPSBudWxsXG4gICAgICAgICAgZmlsdGVyKGlucHV0VmFsdWUudmFsdWUpXG4gICAgICAgIH0sIHByb3BzLmlucHV0RGVib3VuY2UpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0SW5wdXRWYWx1ZSAodmFsLCBlbWl0SW1tZWRpYXRlbHkpIHtcbiAgICAgIGlmIChpbnB1dFZhbHVlLnZhbHVlICE9PSB2YWwpIHtcbiAgICAgICAgaW5wdXRWYWx1ZS52YWx1ZSA9IHZhbFxuXG4gICAgICAgIGlmIChlbWl0SW1tZWRpYXRlbHkgPT09IHRydWUgfHwgcHJvcHMuaW5wdXREZWJvdW5jZSA9PT0gMCB8fCBwcm9wcy5pbnB1dERlYm91bmNlID09PSAnMCcpIHtcbiAgICAgICAgICBlbWl0KCdpbnB1dFZhbHVlJywgdmFsKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlucHV0VmFsdWVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaW5wdXRWYWx1ZVRpbWVyID0gbnVsbFxuICAgICAgICAgICAgZW1pdCgnaW5wdXRWYWx1ZScsIHZhbClcbiAgICAgICAgICB9LCBwcm9wcy5pbnB1dERlYm91bmNlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlSW5wdXRWYWx1ZSAodmFsLCBub0ZpbHRlcmluZywgaW50ZXJuYWwpIHtcbiAgICAgIHVzZXJJbnB1dFZhbHVlID0gaW50ZXJuYWwgIT09IHRydWVcblxuICAgICAgaWYgKHByb3BzLnVzZUlucHV0ID09PSB0cnVlKSB7XG4gICAgICAgIHNldElucHV0VmFsdWUodmFsLCB0cnVlKVxuXG4gICAgICAgIGlmIChub0ZpbHRlcmluZyA9PT0gdHJ1ZSB8fCBpbnRlcm5hbCAhPT0gdHJ1ZSkge1xuICAgICAgICAgIGRlZmF1bHRJbnB1dFZhbHVlID0gdmFsXG4gICAgICAgIH1cblxuICAgICAgICBub0ZpbHRlcmluZyAhPT0gdHJ1ZSAmJiBmaWx0ZXIodmFsKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbHRlciAodmFsLCBrZWVwQ2xvc2VkLCBhZnRlclVwZGF0ZUZuKSB7XG4gICAgICBpZiAocHJvcHMub25GaWx0ZXIgPT09IHZvaWQgMCB8fCAoa2VlcENsb3NlZCAhPT0gdHJ1ZSAmJiBzdGF0ZS5mb2N1c2VkLnZhbHVlICE9PSB0cnVlKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBlbWl0KCdmaWx0ZXJBYm9ydCcpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID0gdHJ1ZVxuICAgICAgICBpbm5lckxvYWRpbmdJbmRpY2F0b3IudmFsdWUgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgdmFsICE9PSAnJ1xuICAgICAgICAmJiBwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZVxuICAgICAgICAmJiBpbm5lclZhbHVlLnZhbHVlLmxlbmd0aCAhPT0gMFxuICAgICAgICAmJiB1c2VySW5wdXRWYWx1ZSAhPT0gdHJ1ZVxuICAgICAgICAmJiB2YWwgPT09IGdldE9wdGlvbkxhYmVsLnZhbHVlKGlubmVyVmFsdWUudmFsdWVbIDAgXSlcbiAgICAgICkge1xuICAgICAgICB2YWwgPSAnJ1xuICAgICAgfVxuXG4gICAgICBjb25zdCBsb2NhbEZpbHRlcklkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG1lbnUudmFsdWUgPT09IHRydWUgJiYgKG1lbnUudmFsdWUgPSBmYWxzZSlcbiAgICAgIH0sIDEwKVxuXG4gICAgICBmaWx0ZXJJZCAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQoZmlsdGVySWQpXG4gICAgICBmaWx0ZXJJZCA9IGxvY2FsRmlsdGVySWRcblxuICAgICAgZW1pdChcbiAgICAgICAgJ2ZpbHRlcicsXG4gICAgICAgIHZhbCxcbiAgICAgICAgKGZuLCBhZnRlckZuKSA9PiB7XG4gICAgICAgICAgaWYgKChrZWVwQ2xvc2VkID09PSB0cnVlIHx8IHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUpICYmIGZpbHRlcklkID09PSBsb2NhbEZpbHRlcklkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoZmlsdGVySWQpXG5cbiAgICAgICAgICAgIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyAmJiBmbigpXG5cbiAgICAgICAgICAgIC8vIGhpZGUgaW5kaWNhdG9yIHRvIGFsbG93IGFycm93IHRvIGFuaW1hdGVcbiAgICAgICAgICAgIGlubmVyTG9hZGluZ0luZGljYXRvci52YWx1ZSA9IGZhbHNlXG5cbiAgICAgICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID0gZmFsc2VcblxuICAgICAgICAgICAgICBpZiAoc3RhdGUuZWRpdGFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2VlcENsb3NlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgbWVudS52YWx1ZSA9PT0gdHJ1ZSAmJiBoaWRlUG9wdXAoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChtZW51LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICB1cGRhdGVNZW51KHRydWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgbWVudS52YWx1ZSA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0eXBlb2YgYWZ0ZXJGbiA9PT0gJ2Z1bmN0aW9uJyAmJiBuZXh0VGljaygoKSA9PiB7IGFmdGVyRm4ocHJveHkpIH0pXG4gICAgICAgICAgICAgIHR5cGVvZiBhZnRlclVwZGF0ZUZuID09PSAnZnVuY3Rpb24nICYmIG5leHRUaWNrKCgpID0+IHsgYWZ0ZXJVcGRhdGVGbihwcm94eSkgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgaWYgKHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUgJiYgZmlsdGVySWQgPT09IGxvY2FsRmlsdGVySWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChmaWx0ZXJJZClcbiAgICAgICAgICAgIHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9IGZhbHNlXG4gICAgICAgICAgICBpbm5lckxvYWRpbmdJbmRpY2F0b3IudmFsdWUgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBtZW51LnZhbHVlID09PSB0cnVlICYmIChtZW51LnZhbHVlID0gZmFsc2UpXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRNZW51ICgpIHtcbiAgICAgIHJldHVybiBoKFFNZW51LCB7XG4gICAgICAgIHJlZjogbWVudVJlZixcbiAgICAgICAgY2xhc3M6IG1lbnVDb250ZW50Q2xhc3MudmFsdWUsXG4gICAgICAgIHN0eWxlOiBwcm9wcy5wb3B1cENvbnRlbnRTdHlsZSxcbiAgICAgICAgbW9kZWxWYWx1ZTogbWVudS52YWx1ZSxcbiAgICAgICAgZml0OiBwcm9wcy5tZW51U2hyaW5rICE9PSB0cnVlLFxuICAgICAgICBjb3ZlcjogcHJvcHMub3B0aW9uc0NvdmVyID09PSB0cnVlICYmIG5vT3B0aW9ucy52YWx1ZSAhPT0gdHJ1ZSAmJiBwcm9wcy51c2VJbnB1dCAhPT0gdHJ1ZSxcbiAgICAgICAgYW5jaG9yOiBwcm9wcy5tZW51QW5jaG9yLFxuICAgICAgICBzZWxmOiBwcm9wcy5tZW51U2VsZixcbiAgICAgICAgb2Zmc2V0OiBwcm9wcy5tZW51T2Zmc2V0LFxuICAgICAgICBkYXJrOiBpc09wdGlvbnNEYXJrLnZhbHVlLFxuICAgICAgICBub1BhcmVudEV2ZW50OiB0cnVlLFxuICAgICAgICBub1JlZm9jdXM6IHRydWUsXG4gICAgICAgIG5vRm9jdXM6IHRydWUsXG4gICAgICAgIG5vUm91dGVEaXNtaXNzOiBwcm9wcy5wb3B1cE5vUm91dGVEaXNtaXNzLFxuICAgICAgICBzcXVhcmU6IHNxdWFyZWRNZW51LnZhbHVlLFxuICAgICAgICB0cmFuc2l0aW9uU2hvdzogcHJvcHMudHJhbnNpdGlvblNob3csXG4gICAgICAgIHRyYW5zaXRpb25IaWRlOiBwcm9wcy50cmFuc2l0aW9uSGlkZSxcbiAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiBwcm9wcy50cmFuc2l0aW9uRHVyYXRpb24sXG4gICAgICAgIHNlcGFyYXRlQ2xvc2VQb3B1cDogdHJ1ZSxcbiAgICAgICAgLi4ubGlzdGJveEF0dHJzLnZhbHVlLFxuICAgICAgICBvblNjcm9sbFBhc3NpdmU6IG9uVmlydHVhbFNjcm9sbEV2dCxcbiAgICAgICAgb25CZWZvcmVTaG93OiBvbkNvbnRyb2xQb3B1cFNob3csXG4gICAgICAgIG9uQmVmb3JlSGlkZTogb25NZW51QmVmb3JlSGlkZSxcbiAgICAgICAgb25TaG93OiBvbk1lbnVTaG93XG4gICAgICB9LCBnZXRBbGxPcHRpb25zKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTWVudUJlZm9yZUhpZGUgKGUpIHtcbiAgICAgIG9uQ29udHJvbFBvcHVwSGlkZShlKVxuICAgICAgY2xvc2VNZW51KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1lbnVTaG93ICgpIHtcbiAgICAgIHNldFZpcnR1YWxTY3JvbGxTaXplKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkRpYWxvZ0ZpZWxkRm9jdXMgKGUpIHtcbiAgICAgIHN0b3AoZSlcbiAgICAgIHRhcmdldFJlZi52YWx1ZSAhPT0gbnVsbCAmJiB0YXJnZXRSZWYudmFsdWUuZm9jdXMoKVxuICAgICAgZGlhbG9nRmllbGRGb2N1c2VkLnZhbHVlID0gdHJ1ZVxuICAgICAgd2luZG93LnNjcm9sbFRvKHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHwgMCwgMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkRpYWxvZ0ZpZWxkQmx1ciAoZSkge1xuICAgICAgc3RvcChlKVxuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBkaWFsb2dGaWVsZEZvY3VzZWQudmFsdWUgPSBmYWxzZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREaWFsb2cgKCkge1xuICAgICAgY29uc3QgY29udGVudCA9IFtcbiAgICAgICAgaChRRmllbGQsIHtcbiAgICAgICAgICBjbGFzczogYGNvbC1hdXRvICR7IHN0YXRlLmZpZWxkQ2xhc3MudmFsdWUgfWAsXG4gICAgICAgICAgLi4uaW5uZXJGaWVsZFByb3BzLnZhbHVlLFxuICAgICAgICAgIGZvcjogc3RhdGUudGFyZ2V0VWlkLnZhbHVlLFxuICAgICAgICAgIGRhcms6IGlzT3B0aW9uc0RhcmsudmFsdWUsXG4gICAgICAgICAgc3F1YXJlOiB0cnVlLFxuICAgICAgICAgIGxvYWRpbmc6IGlubmVyTG9hZGluZ0luZGljYXRvci52YWx1ZSxcbiAgICAgICAgICBpdGVtQWxpZ25lZDogZmFsc2UsXG4gICAgICAgICAgZmlsbGVkOiB0cnVlLFxuICAgICAgICAgIHN0YWNrTGFiZWw6IGlucHV0VmFsdWUudmFsdWUubGVuZ3RoICE9PSAwLFxuICAgICAgICAgIC4uLnN0YXRlLnNwbGl0QXR0cnMubGlzdGVuZXJzLnZhbHVlLFxuICAgICAgICAgIG9uRm9jdXM6IG9uRGlhbG9nRmllbGRGb2N1cyxcbiAgICAgICAgICBvbkJsdXI6IG9uRGlhbG9nRmllbGRCbHVyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAuLi5zbG90cyxcbiAgICAgICAgICByYXdDb250cm9sOiAoKSA9PiBzdGF0ZS5nZXRDb250cm9sKHRydWUpLFxuICAgICAgICAgIGJlZm9yZTogdm9pZCAwLFxuICAgICAgICAgIGFmdGVyOiB2b2lkIDBcbiAgICAgICAgfSlcbiAgICAgIF1cblxuICAgICAgbWVudS52YWx1ZSA9PT0gdHJ1ZSAmJiBjb250ZW50LnB1c2goXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICByZWY6IG1lbnVDb250ZW50UmVmLFxuICAgICAgICAgIGNsYXNzOiBtZW51Q29udGVudENsYXNzLnZhbHVlICsgJyBzY3JvbGwnLFxuICAgICAgICAgIHN0eWxlOiBwcm9wcy5wb3B1cENvbnRlbnRTdHlsZSxcbiAgICAgICAgICAuLi5saXN0Ym94QXR0cnMudmFsdWUsXG4gICAgICAgICAgb25DbGljazogcHJldmVudCxcbiAgICAgICAgICBvblNjcm9sbFBhc3NpdmU6IG9uVmlydHVhbFNjcm9sbEV2dFxuICAgICAgICB9LCBnZXRBbGxPcHRpb25zKCkpXG4gICAgICApXG5cbiAgICAgIHJldHVybiBoKFFEaWFsb2csIHtcbiAgICAgICAgcmVmOiBkaWFsb2dSZWYsXG4gICAgICAgIG1vZGVsVmFsdWU6IGRpYWxvZy52YWx1ZSxcbiAgICAgICAgcG9zaXRpb246IHByb3BzLnVzZUlucHV0ID09PSB0cnVlID8gJ3RvcCcgOiB2b2lkIDAsXG4gICAgICAgIHRyYW5zaXRpb25TaG93OiB0cmFuc2l0aW9uU2hvd0NvbXB1dGVkLFxuICAgICAgICB0cmFuc2l0aW9uSGlkZTogcHJvcHMudHJhbnNpdGlvbkhpZGUsXG4gICAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uLFxuICAgICAgICBub1JvdXRlRGlzbWlzczogcHJvcHMucG9wdXBOb1JvdXRlRGlzbWlzcyxcbiAgICAgICAgb25CZWZvcmVTaG93OiBvbkNvbnRyb2xQb3B1cFNob3csXG4gICAgICAgIG9uQmVmb3JlSGlkZTogb25EaWFsb2dCZWZvcmVIaWRlLFxuICAgICAgICBvbkhpZGU6IG9uRGlhbG9nSGlkZSxcbiAgICAgICAgb25TaG93OiBvbkRpYWxvZ1Nob3dcbiAgICAgIH0sICgpID0+IGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLXNlbGVjdF9fZGlhbG9nJ1xuICAgICAgICAgICsgKGlzT3B0aW9uc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtc2VsZWN0X19kaWFsb2ctLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgICAgICAgICsgKGRpYWxvZ0ZpZWxkRm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zZWxlY3RfX2RpYWxvZy0tZm9jdXNlZCcgOiAnJylcbiAgICAgIH0sIGNvbnRlbnQpKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGlhbG9nQmVmb3JlSGlkZSAoZSkge1xuICAgICAgb25Db250cm9sUG9wdXBIaWRlKGUpXG5cbiAgICAgIGlmIChkaWFsb2dSZWYudmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgZGlhbG9nUmVmLnZhbHVlLl9fdXBkYXRlUmVmb2N1c1RhcmdldChcbiAgICAgICAgICBzdGF0ZS5yb290UmVmLnZhbHVlLnF1ZXJ5U2VsZWN0b3IoJy5xLWZpZWxkX19uYXRpdmUgPiBbdGFiaW5kZXhdOmxhc3QtY2hpbGQnKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHN0YXRlLmZvY3VzZWQudmFsdWUgPSBmYWxzZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRGlhbG9nSGlkZSAoZSkge1xuICAgICAgaGlkZVBvcHVwKClcbiAgICAgIHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IGZhbHNlICYmIGVtaXQoJ2JsdXInLCBlKVxuICAgICAgcmVzZXRJbnB1dFZhbHVlKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkRpYWxvZ1Nob3cgKCkge1xuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICBpZiAoXG4gICAgICAgIChlbCA9PT0gbnVsbCB8fCBlbC5pZCAhPT0gc3RhdGUudGFyZ2V0VWlkLnZhbHVlKVxuICAgICAgICAmJiB0YXJnZXRSZWYudmFsdWUgIT09IG51bGxcbiAgICAgICAgJiYgdGFyZ2V0UmVmLnZhbHVlICE9PSBlbFxuICAgICAgKSB7XG4gICAgICAgIHRhcmdldFJlZi52YWx1ZS5mb2N1cygpXG4gICAgICB9XG5cbiAgICAgIHNldFZpcnR1YWxTY3JvbGxTaXplKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZU1lbnUgKCkge1xuICAgICAgaWYgKGRpYWxvZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgb3B0aW9uSW5kZXgudmFsdWUgPSAtMVxuXG4gICAgICBpZiAobWVudS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBtZW51LnZhbHVlID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChmaWx0ZXJJZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChmaWx0ZXJJZClcbiAgICAgICAgICBmaWx0ZXJJZCA9IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBlbWl0KCdmaWx0ZXJBYm9ydCcpXG4gICAgICAgICAgc3RhdGUuaW5uZXJMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgICBpbm5lckxvYWRpbmdJbmRpY2F0b3IudmFsdWUgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvd1BvcHVwIChlKSB7XG4gICAgICBpZiAoc3RhdGUuZWRpdGFibGUudmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNEaWFsb2cgPT09IHRydWUpIHtcbiAgICAgICAgc3RhdGUub25Db250cm9sRm9jdXNpbihlKVxuICAgICAgICBkaWFsb2cudmFsdWUgPSB0cnVlXG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICBzdGF0ZS5mb2N1cygpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3RhdGUuZm9jdXMoKVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMub25GaWx0ZXIgIT09IHZvaWQgMCkge1xuICAgICAgICBmaWx0ZXIoaW5wdXRWYWx1ZS52YWx1ZSlcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKG5vT3B0aW9ucy52YWx1ZSAhPT0gdHJ1ZSB8fCBzbG90c1sgJ25vLW9wdGlvbicgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIG1lbnUudmFsdWUgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGlkZVBvcHVwICgpIHtcbiAgICAgIGRpYWxvZy52YWx1ZSA9IGZhbHNlXG4gICAgICBjbG9zZU1lbnUoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2V0SW5wdXRWYWx1ZSAoKSB7XG4gICAgICBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSAmJiB1cGRhdGVJbnB1dFZhbHVlKFxuICAgICAgICBwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSAmJiBwcm9wcy5maWxsSW5wdXQgPT09IHRydWUgJiYgaW5uZXJWYWx1ZS52YWx1ZS5sZW5ndGggIT09IDBcbiAgICAgICAgICA/IGdldE9wdGlvbkxhYmVsLnZhbHVlKGlubmVyVmFsdWUudmFsdWVbIDAgXSkgfHwgJydcbiAgICAgICAgICA6ICcnLFxuICAgICAgICB0cnVlLFxuICAgICAgICB0cnVlXG4gICAgICApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTWVudSAoc2hvdykge1xuICAgICAgbGV0IG9wdGlvbkluZGV4ID0gLTFcblxuICAgICAgaWYgKHNob3cgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKGlubmVyVmFsdWUudmFsdWUubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgY29uc3QgdmFsID0gZ2V0T3B0aW9uVmFsdWUudmFsdWUoaW5uZXJWYWx1ZS52YWx1ZVsgMCBdKVxuICAgICAgICAgIG9wdGlvbkluZGV4ID0gcHJvcHMub3B0aW9ucy5maW5kSW5kZXgodiA9PiBpc0RlZXBFcXVhbChnZXRPcHRpb25WYWx1ZS52YWx1ZSh2KSwgdmFsKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsKG9wdGlvbkluZGV4KVxuICAgICAgfVxuXG4gICAgICBzZXRPcHRpb25JbmRleChvcHRpb25JbmRleClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXJlbmRlck1lbnUgKG5ld0xlbmd0aCwgb2xkTGVuZ3RoKSB7XG4gICAgICBpZiAobWVudS52YWx1ZSA9PT0gdHJ1ZSAmJiBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsKC0xLCB0cnVlKVxuXG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICBpZiAobWVudS52YWx1ZSA9PT0gdHJ1ZSAmJiBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAobmV3TGVuZ3RoID4gb2xkTGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGxvY2FsUmVzZXRWaXJ0dWFsU2Nyb2xsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICB1cGRhdGVNZW51KHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZU1lbnVQb3NpdGlvbiAoKSB7XG4gICAgICBpZiAoZGlhbG9nLnZhbHVlID09PSBmYWxzZSAmJiBtZW51UmVmLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIG1lbnVSZWYudmFsdWUudXBkYXRlUG9zaXRpb24oKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ29udHJvbFBvcHVwU2hvdyAoZSkge1xuICAgICAgZSAhPT0gdm9pZCAwICYmIHN0b3AoZSlcbiAgICAgIGVtaXQoJ3BvcHVwU2hvdycsIGUpXG4gICAgICBzdGF0ZS5oYXNQb3B1cE9wZW4gPSB0cnVlXG4gICAgICBzdGF0ZS5vbkNvbnRyb2xGb2N1c2luKGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Db250cm9sUG9wdXBIaWRlIChlKSB7XG4gICAgICBlICE9PSB2b2lkIDAgJiYgc3RvcChlKVxuICAgICAgZW1pdCgncG9wdXBIaWRlJywgZSlcbiAgICAgIHN0YXRlLmhhc1BvcHVwT3BlbiA9IGZhbHNlXG4gICAgICBzdGF0ZS5vbkNvbnRyb2xGb2N1c291dChlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVByZVN0YXRlICgpIHtcbiAgICAgIGhhc0RpYWxvZyA9ICRxLnBsYXRmb3JtLmlzLm1vYmlsZSAhPT0gdHJ1ZSAmJiBwcm9wcy5iZWhhdmlvciAhPT0gJ2RpYWxvZydcbiAgICAgICAgPyBmYWxzZVxuICAgICAgICA6IHByb3BzLmJlaGF2aW9yICE9PSAnbWVudScgJiYgKFxuICAgICAgICAgIHByb3BzLnVzZUlucHV0ID09PSB0cnVlXG4gICAgICAgICAgICA/IHNsb3RzWyAnbm8tb3B0aW9uJyBdICE9PSB2b2lkIDAgfHwgcHJvcHMub25GaWx0ZXIgIT09IHZvaWQgMCB8fCBub09wdGlvbnMudmFsdWUgPT09IGZhbHNlXG4gICAgICAgICAgICA6IHRydWVcbiAgICAgICAgKVxuXG4gICAgICB0cmFuc2l0aW9uU2hvd0NvbXB1dGVkID0gJHEucGxhdGZvcm0uaXMuaW9zID09PSB0cnVlICYmIGhhc0RpYWxvZyA9PT0gdHJ1ZSAmJiBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZVxuICAgICAgICA/ICdmYWRlJ1xuICAgICAgICA6IHByb3BzLnRyYW5zaXRpb25TaG93XG4gICAgfVxuXG4gICAgb25CZWZvcmVVcGRhdGUodXBkYXRlUHJlU3RhdGUpXG4gICAgb25VcGRhdGVkKHVwZGF0ZU1lbnVQb3NpdGlvbilcblxuICAgIHVwZGF0ZVByZVN0YXRlKClcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBmaWx0ZXJUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQoZmlsdGVyVGltZXIpXG4gICAgICBpbnB1dFZhbHVlVGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KGlucHV0VmFsdWVUaW1lcilcbiAgICB9KVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwge1xuICAgICAgc2hvd1BvcHVwLCBoaWRlUG9wdXAsXG4gICAgICByZW1vdmVBdEluZGV4LCBhZGQsIHRvZ2dsZU9wdGlvbixcbiAgICAgIGdldE9wdGlvbkluZGV4OiAoKSA9PiBvcHRpb25JbmRleC52YWx1ZSxcbiAgICAgIHNldE9wdGlvbkluZGV4LCBtb3ZlT3B0aW9uU2VsZWN0aW9uLFxuICAgICAgZmlsdGVyLCB1cGRhdGVNZW51UG9zaXRpb24sIHVwZGF0ZUlucHV0VmFsdWUsXG4gICAgICBpc09wdGlvblNlbGVjdGVkLFxuICAgICAgZ2V0RW1pdHRpbmdPcHRpb25WYWx1ZSxcbiAgICAgIGlzT3B0aW9uRGlzYWJsZWQ6ICguLi5hcmdzKSA9PiBpc09wdGlvbkRpc2FibGVkLnZhbHVlLmFwcGx5KG51bGwsIGFyZ3MpID09PSB0cnVlLFxuICAgICAgZ2V0T3B0aW9uVmFsdWU6ICguLi5hcmdzKSA9PiBnZXRPcHRpb25WYWx1ZS52YWx1ZS5hcHBseShudWxsLCBhcmdzKSxcbiAgICAgIGdldE9wdGlvbkxhYmVsOiAoLi4uYXJncykgPT4gZ2V0T3B0aW9uTGFiZWwudmFsdWUuYXBwbHkobnVsbCwgYXJncylcbiAgICB9KVxuXG4gICAgT2JqZWN0LmFzc2lnbihzdGF0ZSwge1xuICAgICAgaW5uZXJWYWx1ZSxcblxuICAgICAgZmllbGRDbGFzczogY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgYHEtc2VsZWN0IHEtZmllbGQtLWF1dG8taGVpZ2h0IHEtc2VsZWN0LS13aXRoJHsgcHJvcHMudXNlSW5wdXQgIT09IHRydWUgPyAnb3V0JyA6ICcnIH0taW5wdXRgXG4gICAgICAgICsgYCBxLXNlbGVjdC0td2l0aCR7IHByb3BzLnVzZUNoaXBzICE9PSB0cnVlID8gJ291dCcgOiAnJyB9LWNoaXBzYFxuICAgICAgICArIGAgcS1zZWxlY3QtLSR7IHByb3BzLm11bHRpcGxlID09PSB0cnVlID8gJ211bHRpcGxlJyA6ICdzaW5nbGUnIH1gXG4gICAgICApLFxuXG4gICAgICBpbnB1dFJlZixcbiAgICAgIHRhcmdldFJlZixcbiAgICAgIGhhc1ZhbHVlLFxuICAgICAgc2hvd1BvcHVwLFxuXG4gICAgICBmbG9hdGluZ0xhYmVsOiBjb21wdXRlZCgoKSA9PlxuICAgICAgICAocHJvcHMuaGlkZVNlbGVjdGVkICE9PSB0cnVlICYmIGhhc1ZhbHVlLnZhbHVlID09PSB0cnVlKVxuICAgICAgICB8fCB0eXBlb2YgaW5wdXRWYWx1ZS52YWx1ZSA9PT0gJ251bWJlcidcbiAgICAgICAgfHwgaW5wdXRWYWx1ZS52YWx1ZS5sZW5ndGggIT09IDBcbiAgICAgICAgfHwgZmllbGRWYWx1ZUlzRmlsbGVkKHByb3BzLmRpc3BsYXlWYWx1ZSlcbiAgICAgICksXG5cbiAgICAgIGdldENvbnRyb2xDaGlsZDogKCkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgc3RhdGUuZWRpdGFibGUudmFsdWUgIT09IGZhbHNlICYmIChcbiAgICAgICAgICAgIGRpYWxvZy52YWx1ZSA9PT0gdHJ1ZSAvLyBkaWFsb2cgYWx3YXlzIGhhcyBtZW51IGRpc3BsYXllZCwgc28gbmVlZCB0byByZW5kZXIgaXRcbiAgICAgICAgICAgIHx8IG5vT3B0aW9ucy52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgICAgICAgfHwgc2xvdHNbICduby1vcHRpb24nIF0gIT09IHZvaWQgMFxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIGhhc0RpYWxvZyA9PT0gdHJ1ZSA/IGdldERpYWxvZygpIDogZ2V0TWVudSgpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3RhdGUuaGFzUG9wdXBPcGVuID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gZXhwbGljaXRseSBzZXQgaXQgb3RoZXJ3aXNlIFRBQiB3aWxsIG5vdCBibHVyIGNvbXBvbmVudFxuICAgICAgICAgIHN0YXRlLmhhc1BvcHVwT3BlbiA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGNvbnRyb2xFdmVudHM6IHtcbiAgICAgICAgb25Gb2N1c2luIChlKSB7IHN0YXRlLm9uQ29udHJvbEZvY3VzaW4oZSkgfSxcbiAgICAgICAgb25Gb2N1c291dCAoZSkge1xuICAgICAgICAgIHN0YXRlLm9uQ29udHJvbEZvY3Vzb3V0KGUsICgpID0+IHtcbiAgICAgICAgICAgIHJlc2V0SW5wdXRWYWx1ZSgpXG4gICAgICAgICAgICBjbG9zZU1lbnUoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIG9uQ2xpY2sgKGUpIHtcbiAgICAgICAgICAvLyBsYWJlbCBmcm9tIFFGaWVsZCB3aWxsIHByb3BhZ2F0ZSBjbGljayBvbiB0aGUgaW5wdXRcbiAgICAgICAgICBwcmV2ZW50KGUpXG5cbiAgICAgICAgICBpZiAoaGFzRGlhbG9nICE9PSB0cnVlICYmIG1lbnUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNsb3NlTWVudSgpXG4gICAgICAgICAgICB0YXJnZXRSZWYudmFsdWUgIT09IG51bGwgJiYgdGFyZ2V0UmVmLnZhbHVlLmZvY3VzKClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHNob3dQb3B1cChlKVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBnZXRDb250cm9sOiBmcm9tRGlhbG9nID0+IHtcbiAgICAgICAgY29uc3QgY2hpbGQgPSBnZXRTZWxlY3Rpb24oKVxuICAgICAgICBjb25zdCBpc1RhcmdldCA9IGZyb21EaWFsb2cgPT09IHRydWUgfHwgZGlhbG9nLnZhbHVlICE9PSB0cnVlIHx8IGhhc0RpYWxvZyAhPT0gdHJ1ZVxuXG4gICAgICAgIGlmIChwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNoaWxkLnB1c2goZ2V0SW5wdXQoZnJvbURpYWxvZywgaXNUYXJnZXQpKVxuICAgICAgICB9XG4gICAgICAgIC8vIHRoZXJlIGNhbiBiZSBvbmx5IG9uZSAod2hlbiBkaWFsb2cgaXMgb3BlbmVkIHRoZSBjb250cm9sIGluIGRpYWxvZyBzaG91bGQgYmUgdGFyZ2V0KVxuICAgICAgICBlbHNlIGlmIChzdGF0ZS5lZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IGF0dHJzID0gaXNUYXJnZXQgPT09IHRydWUgPyBjb21ib2JveEF0dHJzLnZhbHVlIDogdm9pZCAwXG5cbiAgICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgICAgaCgnaW5wdXQnLCB7XG4gICAgICAgICAgICAgIHJlZjogaXNUYXJnZXQgPT09IHRydWUgPyB0YXJnZXRSZWYgOiB2b2lkIDAsXG4gICAgICAgICAgICAgIGtleTogJ2RfdCcsXG4gICAgICAgICAgICAgIGNsYXNzOiAncS1zZWxlY3RfX2ZvY3VzLXRhcmdldCcsXG4gICAgICAgICAgICAgIGlkOiBpc1RhcmdldCA9PT0gdHJ1ZSA/IHN0YXRlLnRhcmdldFVpZC52YWx1ZSA6IHZvaWQgMCxcbiAgICAgICAgICAgICAgdmFsdWU6IGFyaWFDdXJyZW50VmFsdWUudmFsdWUsXG4gICAgICAgICAgICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgICAgICAgICAgICAnZGF0YS1hdXRvZm9jdXMnOiBmcm9tRGlhbG9nID09PSB0cnVlIHx8IHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSB8fCB2b2lkIDAsXG4gICAgICAgICAgICAgIC4uLmF0dHJzLFxuICAgICAgICAgICAgICBvbktleWRvd246IG9uVGFyZ2V0S2V5ZG93bixcbiAgICAgICAgICAgICAgb25LZXl1cDogb25UYXJnZXRLZXl1cCxcbiAgICAgICAgICAgICAgb25LZXlwcmVzczogb25UYXJnZXRLZXlwcmVzc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG5cbiAgICAgICAgICBpZiAoaXNUYXJnZXQgPT09IHRydWUgJiYgdHlwZW9mIHByb3BzLmF1dG9jb21wbGV0ZSA9PT0gJ3N0cmluZycgJiYgcHJvcHMuYXV0b2NvbXBsZXRlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICAgICAgaCgnaW5wdXQnLCB7XG4gICAgICAgICAgICAgICAgY2xhc3M6ICdxLXNlbGVjdF9fYXV0b2NvbXBsZXRlLWlucHV0JyxcbiAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU6IHByb3BzLmF1dG9jb21wbGV0ZSxcbiAgICAgICAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgICAgICAgb25LZXl1cDogb25UYXJnZXRBdXRvY29tcGxldGVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmFtZVByb3AudmFsdWUgIT09IHZvaWQgMCAmJiBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIGlubmVyT3B0aW9uc1ZhbHVlLnZhbHVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIGNvbnN0IG9wdHMgPSBpbm5lck9wdGlvbnNWYWx1ZS52YWx1ZS5tYXAodmFsdWUgPT4gaCgnb3B0aW9uJywgeyB2YWx1ZSwgc2VsZWN0ZWQ6IHRydWUgfSkpXG5cbiAgICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgICAgaCgnc2VsZWN0Jywge1xuICAgICAgICAgICAgICBjbGFzczogJ2hpZGRlbicsXG4gICAgICAgICAgICAgIG5hbWU6IG5hbWVQcm9wLnZhbHVlLFxuICAgICAgICAgICAgICBtdWx0aXBsZTogcHJvcHMubXVsdGlwbGVcbiAgICAgICAgICAgIH0sIG9wdHMpXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXR0cnMgPSBwcm9wcy51c2VJbnB1dCA9PT0gdHJ1ZSB8fCBpc1RhcmdldCAhPT0gdHJ1ZSA/IHZvaWQgMCA6IHN0YXRlLnNwbGl0QXR0cnMuYXR0cmlidXRlcy52YWx1ZVxuXG4gICAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19uYXRpdmUgcm93IGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgICAgLi4uc3RhdGUuc3BsaXRBdHRycy5saXN0ZW5lcnMudmFsdWVcbiAgICAgICAgfSwgY2hpbGQpXG4gICAgICB9LFxuXG4gICAgICBnZXRJbm5lckFwcGVuZDogKCkgPT4gKFxuICAgICAgICBwcm9wcy5sb2FkaW5nICE9PSB0cnVlICYmIGlubmVyTG9hZGluZ0luZGljYXRvci52YWx1ZSAhPT0gdHJ1ZSAmJiBwcm9wcy5oaWRlRHJvcGRvd25JY29uICE9PSB0cnVlXG4gICAgICAgICAgPyBbXG4gICAgICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3Etc2VsZWN0X19kcm9wZG93bi1pY29uJyArIChtZW51LnZhbHVlID09PSB0cnVlID8gJyByb3RhdGUtMTgwJyA6ICcnKSxcbiAgICAgICAgICAgICAgICBuYW1lOiBkcm9wZG93bkFycm93SWNvbi52YWx1ZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXVxuICAgICAgICAgIDogbnVsbFxuICAgICAgKVxuICAgIH0pXG5cbiAgICByZXR1cm4gdXNlRmllbGQoc3RhdGUpXG4gIH1cbn0pXG4iXSwibmFtZXMiOlsib3B0aW9uSW5kZXgiLCJhdHRycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBYU8sTUFBTSxlQUFlO0FBQUEsRUFDMUIsSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUNOO0FBRUEsSUFBQSxRQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUNILEdBQUc7QUFBQSxJQUVILE9BQU87QUFBQSxJQUVQLE1BQU07QUFBQSxJQUNOLFdBQVc7QUFBQSxJQUNYLFlBQVk7QUFBQSxJQUNaLGNBQWM7QUFBQSxJQUNkLE9BQU8sQ0FBRSxRQUFRLE1BQVE7QUFBQSxJQUV6QixPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsSUFFWCxZQUFZO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDVjtBQUFBLElBQ0QsVUFBVTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ1Y7QUFBQSxJQUVELFFBQVE7QUFBQSxJQUNSLFNBQVM7QUFBQSxJQUNULFdBQVc7QUFBQSxJQUNYLFdBQVc7QUFBQSxJQUVYLGlCQUFpQjtBQUFBLElBRWpCLFVBQVUsQ0FBRSxRQUFRLE1BQVE7QUFBQSxJQUM1QixTQUFTO0FBQUEsSUFFVCxRQUFRO0FBQUEsTUFDTixNQUFNLENBQUUsU0FBUyxNQUFRO0FBQUEsTUFDekIsU0FBUztBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQUEsRUFFRCxPQUFPLENBQUUscUJBQXFCLG1CQUFtQixVQUFVLE9BQVM7QUFBQSxFQUVwRSxNQUFPLE9BQU8sRUFBRSxPQUFPLEtBQUksR0FBSTtBQUM3QixVQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUksRUFBQSxJQUFLLG1CQUFvQjtBQUU5QyxVQUFNLFNBQVMsUUFBUSxPQUFPLEVBQUU7QUFDaEMsVUFBTSxZQUFZLFFBQVEsT0FBTyxZQUFZO0FBRTdDLFVBQU0sY0FBYyxTQUFTLE1BQU0sTUFBTSxhQUFhLFFBQVEsTUFBTSxTQUFTLE1BQU07QUFFbkYsVUFBTSxXQUFXLFNBQVMsTUFDeEIsTUFBTSxhQUFhLE9BQ2YsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLEtBQUssV0FDdEMsTUFBTSxJQUNYO0FBRUQsVUFBTSxhQUFhLFNBQVMsTUFBTSxNQUFNLGNBQWMsR0FBRyxRQUFRLEtBQUssTUFBTTtBQUU1RSxVQUFNLGNBQWM7QUFBQSxNQUFTLE1BQzNCLE1BQU0sWUFBWSxVQUNkLE1BQU0sY0FBYyxRQUFRLE1BQU0sYUFBYTtBQUFBLElBQ3BEO0FBRUQsVUFBTSxVQUFVLFNBQVMsTUFBTTtBQUM3QixZQUFNLE9BQU8sTUFBTSxZQUFZLE9BQzNCLE1BQU0sU0FBUyxNQUFNLFlBQ3JCLE1BQU07QUFFVixhQUFPLDRDQUNGLE1BQU0sWUFBWSxTQUFTLE1BQU0sVUFBVSxTQUFTLE9BQVEsTUFBTSxVQUFXLE9BQzdFLE9BQU8sU0FBVSx5QkFBMEIsT0FDM0MsTUFBTSxZQUFZLE9BQU8sY0FBYyxPQUN2QyxNQUFNLFVBQVUsT0FBTyxtQkFBbUIsT0FDMUMsTUFBTSxZQUFZLE9BQU8scUJBQXFCLE9BQzlDLE1BQU0sYUFBYSxPQUFPLHNCQUFzQixPQUNoRCxZQUFZLFVBQVUsT0FBTyxpRUFBaUUsT0FDOUYsTUFBTSxXQUFXLE9BQU8sb0JBQW9CLE9BQzVDLE9BQU8sVUFBVSxPQUFPLHlCQUF5QjtBQUFBLElBQzVELENBQUs7QUFFRCxVQUFNLGFBQWEsU0FBUyxNQUFNO0FBQ2hDLFlBQU0sT0FBTyxNQUFNLFlBQVksT0FDM0IsRUFBRSxVQUFVLElBQUksaUJBQWlCLE9BQVEsSUFDekMsRUFBRSxVQUFVLE1BQU0sWUFBWSxFQUFHO0FBRXJDLFlBQU0sU0FBUztBQUFBLFFBQ2IsR0FBRztBQUFBLFFBQ0gsTUFBTTtBQUFBLFFBQ04sZUFBZTtBQUFBLFFBQ2YsY0FBYyxNQUFNLG1CQUFtQixHQUFHLEtBQUssTUFBTTtBQUFBLE1BQ3REO0FBRUQsYUFBTyxFQUFFLE1BQU0sT0FBUTtBQUFBLElBQzdCLENBQUs7QUFFRCxhQUFTLFFBQVMsR0FBRztBQUNuQixRQUFFLFlBQVksTUFBa0IsUUFBUSxDQUFDO0FBQUEsSUFDMUM7QUFFRCxhQUFTLFFBQVMsR0FBRztBQUNuQixVQUFJLENBQUMsTUFBTSxTQUFTO0FBQ2xCLGFBQUssbUJBQW1CLENBQUMsTUFBTSxRQUFRO0FBQ3ZDLGFBQUssU0FBUyxDQUFDO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBRUQsYUFBUyxTQUFVLEdBQUc7QUFDcEIsVUFBSSxFQUFFLFlBQVksVUFBVSxFQUFFLFlBQVksSUFBSTtBQUM1Qyx1QkFBZSxDQUFDO0FBQ2hCLFlBQUksTUFBTSxZQUFZLE9BQU87QUFDM0IsZUFBSyxxQkFBcUIsS0FBSztBQUMvQixlQUFLLFFBQVE7QUFBQSxRQUNkO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFRCxhQUFTLGFBQWM7QUFDckIsWUFBTSxRQUFRLENBQUU7QUFFaEIsa0JBQVksVUFBVSxRQUFRLE1BQU07QUFBQSxRQUNsQyxFQUFFLE9BQU8sRUFBRSxPQUFPLGlCQUFnQixDQUFFO0FBQUEsTUFDckM7QUFFRCxrQkFBWSxVQUFVLFFBQVEsTUFBTTtBQUFBLFFBQ2xDLEVBQUUsT0FBTztBQUFBLFVBQ1AsT0FBTztBQUFBLFVBQ1AsTUFBTSxTQUFTO0FBQUEsUUFDekIsQ0FBUztBQUFBLE1BQ0Y7QUFFRCxZQUFNLFFBQVEsTUFBTSxVQUFVLFNBQzFCLENBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxXQUFVLEdBQUksQ0FBRSxNQUFNLEtBQUssQ0FBRSxDQUFHLElBQ3BEO0FBRUosWUFBTTtBQUFBLFFBQ0osRUFBRSxPQUFPO0FBQUEsVUFDUCxPQUFPO0FBQUEsUUFDUixHQUFFLGlCQUFpQixNQUFNLFNBQVMsS0FBSyxDQUFDO0FBQUEsTUFDMUM7QUFFRCxZQUFNLGFBQWEsTUFBTTtBQUFBLFFBQ3ZCLEVBQUUsT0FBTztBQUFBLFVBQ1AsT0FBTztBQUFBLFVBQ1AsTUFBTSxNQUFNO0FBQUEsUUFDdEIsQ0FBUztBQUFBLE1BQ0Y7QUFFRCxZQUFNLGNBQWMsUUFBUSxNQUFNO0FBQUEsUUFDaEMsRUFBRSxPQUFPO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUCxNQUFNLFdBQVc7QUFBQSxVQUNqQixHQUFHLFdBQVcsTUFBTTtBQUFBLFVBQ3BCLFNBQVM7QUFBQSxVQUNULFNBQVM7QUFBQSxRQUNuQixDQUFTO0FBQUEsTUFDRjtBQUVELGFBQU87QUFBQSxJQUNSO0FBRUQsV0FBTyxNQUFNO0FBQ1gsVUFBSSxNQUFNLGVBQWU7QUFBTztBQUVoQyxZQUFNLE9BQU87QUFBQSxRQUNYLE9BQU8sUUFBUTtBQUFBLFFBQ2YsT0FBTyxVQUFVO0FBQUEsTUFDbEI7QUFFRCxrQkFBWSxVQUFVLFFBQVEsT0FBTztBQUFBLFFBQ25DO0FBQUEsUUFDQSxXQUFXLE1BQU07QUFBQSxRQUNqQixFQUFFLFNBQVMsUUFBUztBQUFBLE1BQ3JCO0FBRUQsYUFBTztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsUUFDQSxXQUFZO0FBQUEsUUFDWjtBQUFBLFFBQ0EsTUFBTSxXQUFXLFNBQVMsTUFBTSxZQUFZO0FBQUEsUUFDNUMsTUFBTSxDQUFFLENBQUUsUUFBUSxNQUFNLE1BQU0sQ0FBSTtBQUFBLE1BQ25DO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDSCxDQUFDO0FDdkxELE1BQU0sdUJBQXVCLE9BQUssQ0FBRSxPQUFPLGNBQWMsUUFBVSxFQUFDLFNBQVMsQ0FBQztBQUM5RSxNQUFNLGVBQWU7QUFDckIsTUFBTSxpQkFBaUIsT0FBTyxLQUFLLGFBQWE7QUFFaEQsSUFBQSxVQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLGNBQWM7QUFBQSxFQUVkLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUNILEdBQUc7QUFBQSxJQUNILEdBQUc7QUFBQSxJQUdILFlBQVk7QUFBQSxNQUNWLFVBQVU7QUFBQSxJQUNYO0FBQUEsSUFFRCxVQUFVO0FBQUEsSUFFVixjQUFjLENBQUUsUUFBUSxNQUFRO0FBQUEsSUFDaEMsa0JBQWtCO0FBQUEsSUFDbEIsY0FBYztBQUFBLElBRWQsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sU0FBUyxNQUFNLENBQUU7QUFBQSxJQUNsQjtBQUFBLElBRUQsYUFBYSxDQUFFLFVBQVUsTUFBUTtBQUFBLElBQ2pDLGFBQWEsQ0FBRSxVQUFVLE1BQVE7QUFBQSxJQUNqQyxlQUFlLENBQUUsVUFBVSxNQUFRO0FBQUEsSUFFbkMsY0FBYztBQUFBLElBQ2Qsa0JBQWtCO0FBQUEsSUFDbEIsV0FBVztBQUFBLElBRVgsV0FBVyxDQUFFLFFBQVEsTUFBUTtBQUFBLElBRTdCLGNBQWM7QUFBQSxJQUNkLGFBQWE7QUFBQSxNQUNYLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFDRCxzQkFBc0I7QUFBQSxJQUN0QixhQUFhO0FBQUEsSUFFYixjQUFjO0FBQUEsSUFFZCxZQUFZO0FBQUEsSUFDWixZQUFZO0FBQUEsSUFDWixVQUFVO0FBQUEsSUFDVixZQUFZO0FBQUEsSUFFWixtQkFBbUI7QUFBQSxJQUNuQixtQkFBbUIsQ0FBRSxRQUFRLE9BQU8sTUFBUTtBQUFBLElBQzVDLHFCQUFxQjtBQUFBLElBRXJCLFVBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUVWLGNBQWM7QUFBQSxNQUNaLE1BQU07QUFBQSxNQUNOLFdBQVc7QUFBQSxJQUNaO0FBQUEsSUFFRCxZQUFZO0FBQUEsSUFDWixXQUFXO0FBQUEsSUFFWCxlQUFlO0FBQUEsTUFDYixNQUFNLENBQUUsUUFBUSxNQUFRO0FBQUEsTUFDeEIsU0FBUztBQUFBLElBQ1Y7QUFBQSxJQUVELFlBQVksQ0FBRSxPQUFPLFFBQVEsTUFBUTtBQUFBLElBQ3JDLFlBQVksQ0FBRSxPQUFPLFFBQVEsTUFBUTtBQUFBLElBRXJDLFVBQVU7QUFBQSxNQUNSLE1BQU0sQ0FBRSxRQUFRLE1BQVE7QUFBQSxNQUN4QixTQUFTO0FBQUEsSUFDVjtBQUFBLElBRUQsY0FBYztBQUFBLElBRWQsZ0JBQWdCLENBQUU7QUFBQSxJQUNsQixnQkFBZ0IsQ0FBRTtBQUFBLElBQ2xCLG9CQUFvQixDQUFFO0FBQUEsSUFFdEIsVUFBVTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sV0FBVyxPQUFLLENBQUUsV0FBVyxRQUFRLFFBQVUsRUFBQyxTQUFTLENBQUM7QUFBQSxNQUMxRCxTQUFTO0FBQUEsSUFDVjtBQUFBLElBR0QsdUJBQXVCLHNCQUFzQixzQkFBc0I7QUFBQSxJQUVuRSxZQUFZO0FBQUEsSUFDWixVQUFVO0FBQUEsRUFDWDtBQUFBLEVBRUQsT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0g7QUFBQSxJQUFPO0FBQUEsSUFBVTtBQUFBLElBQ2pCO0FBQUEsSUFBUztBQUFBLElBQVk7QUFBQSxJQUNyQjtBQUFBLElBQWE7QUFBQSxJQUNiO0FBQUEsRUFDRDtBQUFBLEVBRUQsTUFBTyxPQUFPLEVBQUUsT0FBTyxLQUFJLEdBQUk7QUFDN0IsVUFBTSxFQUFFLE1BQU8sSUFBRyxtQkFBb0I7QUFDdEMsVUFBTSxFQUFFLEdBQUUsSUFBSztBQUVmLFVBQU0sT0FBTyxJQUFJLEtBQUs7QUFDdEIsVUFBTSxTQUFTLElBQUksS0FBSztBQUN4QixVQUFNLGNBQWMsSUFBSSxFQUFFO0FBQzFCLFVBQU0sYUFBYSxJQUFJLEVBQUU7QUFDekIsVUFBTSxxQkFBcUIsSUFBSSxLQUFLO0FBQ3BDLFVBQU0sd0JBQXdCLElBQUksS0FBSztBQUV2QyxRQUFJLGNBQWMsTUFBTSxrQkFBa0IsTUFDeEMsaUJBQ0EsV0FBVyxnQkFBZ0IsV0FBVyxNQUFNLG1CQUM1Qyx3QkFBd0IsY0FBYztBQUV4QyxVQUFNLFdBQVcsSUFBSSxJQUFJO0FBQ3pCLFVBQU0sWUFBWSxJQUFJLElBQUk7QUFDMUIsVUFBTSxVQUFVLElBQUksSUFBSTtBQUN4QixVQUFNLFlBQVksSUFBSSxJQUFJO0FBQzFCLFVBQU0saUJBQWlCLElBQUksSUFBSTtBQUUvQixVQUFNLFdBQVcscUJBQXFCLEtBQUs7QUFFM0MsVUFBTSxnQkFBZ0Isa0JBQWtCLE9BQU87QUFFL0MsVUFBTSxzQkFBc0IsU0FBUyxNQUNuQyxNQUFNLFFBQVEsTUFBTSxPQUFPLElBQ3ZCLE1BQU0sUUFBUSxTQUNkLENBQ0w7QUFFRCxVQUFNLGdDQUFnQyxTQUFTLE1BQzdDLE1BQU0sMEJBQTBCLFNBQzNCLE1BQU0saUJBQWlCLE9BQU8sS0FBSyxLQUNwQyxNQUFNLHFCQUNYO0FBRUQsVUFBTTtBQUFBLE1BQ0o7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNELElBQUcsaUJBQWlCO0FBQUEsTUFDbkI7QUFBQSxNQUFxQjtBQUFBLE1BQXdCO0FBQUEsTUFDN0M7QUFBQSxJQUNOLENBQUs7QUFFRCxVQUFNLFFBQVEsY0FBZTtBQUU3QixVQUFNLGFBQWEsU0FBUyxNQUFNO0FBQ2hDLFlBQ0UsVUFBVSxNQUFNLGVBQWUsUUFBUSxNQUFNLGFBQWEsTUFDMUQsTUFBTSxNQUFNLGVBQWUsV0FBVyxNQUFNLGVBQWUsUUFBUSxZQUFZLFFBQzFFLE1BQU0sYUFBYSxRQUFRLE1BQU0sUUFBUSxNQUFNLFVBQVUsSUFBSSxNQUFNLGFBQWEsQ0FBRSxNQUFNLFVBQVksSUFDckcsQ0FBRTtBQUVSLFVBQUksTUFBTSxlQUFlLFFBQVEsTUFBTSxRQUFRLE1BQU0sT0FBTyxNQUFNLE1BQU07QUFDdEUsY0FBTSxRQUFRLE1BQU0sZUFBZSxRQUFRLG9CQUFvQixTQUMzRCxrQkFDQSxDQUFFO0FBQ04sY0FBTSxTQUFTLElBQUksSUFBSSxPQUFLLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFFL0MsZUFBTyxNQUFNLGVBQWUsUUFBUSxZQUFZLE9BQzVDLE9BQU8sT0FBTyxPQUFLLE1BQU0sSUFBSSxJQUM3QjtBQUFBLE1BQ0w7QUFFRCxhQUFPO0FBQUEsSUFDYixDQUFLO0FBRUQsVUFBTSxrQkFBa0IsU0FBUyxNQUFNO0FBQ3JDLFlBQU0sTUFBTSxDQUFFO0FBQ2QscUJBQWUsUUFBUSxTQUFPO0FBQzVCLGNBQU0sTUFBTSxNQUFPO0FBQ25CLFlBQUksUUFBUSxRQUFRO0FBQ2xCLGNBQUssT0FBUTtBQUFBLFFBQ2Q7QUFBQSxNQUNULENBQU87QUFDRCxhQUFPO0FBQUEsSUFDYixDQUFLO0FBRUQsVUFBTSxnQkFBZ0IsU0FBUyxNQUM3QixNQUFNLGdCQUFnQixPQUNsQixNQUFNLE9BQU8sUUFDYixNQUFNLFdBQ1g7QUFFRCxVQUFNLFdBQVcsU0FBUyxNQUFNLG1CQUFtQixXQUFXLEtBQUssQ0FBQztBQUVwRSxVQUFNLHFCQUFxQixTQUFTLE1BQU07QUFDeEMsVUFBSSxNQUFNO0FBRVYsVUFBSSxNQUFNLGlCQUFpQixRQUFRLFdBQVcsTUFBTSxXQUFXLEdBQUc7QUFDaEUsZUFBTyxDQUFFLEtBQUssTUFBTSxVQUFZO0FBQUEsTUFDakM7QUFFRCxhQUFPO0FBRVAsYUFBTyxNQUFNLGVBQWUsU0FDeEIsTUFDQSxDQUFFLEtBQUssTUFBTSxVQUFZO0FBQUEsSUFDbkMsQ0FBSztBQUVELFVBQU0sbUJBQW1CO0FBQUEsTUFBUyxPQUMvQixNQUFNLDRCQUE0QixPQUFPLGlDQUFpQyxPQUN4RSxNQUFNLG9CQUFvQixNQUFNLE1BQU0sb0JBQW9CO0FBQUEsSUFDOUQ7QUFFRCxVQUFNLFlBQVksU0FBUyxNQUFNLG9CQUFvQixVQUFVLENBQUM7QUFFaEUsVUFBTSxpQkFBaUI7QUFBQSxNQUFTLE1BQzlCLFdBQVcsTUFDUixJQUFJLFNBQU8sZUFBZSxNQUFNLEdBQUcsQ0FBQyxFQUNwQyxLQUFLLElBQUk7QUFBQSxJQUNiO0FBRUQsVUFBTSxtQkFBbUIsU0FBUyxNQUFPLE1BQU0saUJBQWlCLFNBQzVELE1BQU0sZUFDTixlQUFlLEtBQ2xCO0FBRUQsVUFBTSxjQUFjLFNBQVMsTUFDM0IsTUFBTSxnQkFBZ0IsT0FDbEIsTUFBTSxPQUNOLFNBQU8sUUFBUSxVQUFVLFFBQVEsUUFBUSxJQUFJLFNBQVMsSUFDM0Q7QUFFRCxVQUFNLGNBQWMsU0FBUyxNQUMzQixNQUFNLHFCQUFxQixRQUN6QixNQUFNLGlCQUFpQixXQUNyQixNQUFNLGdCQUFnQixRQUNuQixXQUFXLE1BQU0sS0FBSyxZQUFZLEtBQUssRUFHL0M7QUFFRCxVQUFNLFdBQVcsU0FBUyxNQUFPLE1BQU0sUUFBUSxVQUFVLE9BQU8sTUFBTSxXQUFXLEVBQUc7QUFFcEYsVUFBTSxnQkFBZ0IsU0FBUyxNQUFNO0FBQ25DLFlBQU0sUUFBUTtBQUFBLFFBQ1osVUFBVSxNQUFNO0FBQUEsUUFDaEIsTUFBTTtBQUFBLFFBQ04sY0FBYyxNQUFNO0FBQUEsUUFDcEIsaUJBQWlCLE1BQU0sYUFBYSxPQUFPLFNBQVM7QUFBQSxRQUNwRCxxQkFBcUIsTUFBTSxhQUFhLE9BQU8sU0FBUztBQUFBLFFBQ3hELGlCQUFpQixLQUFLLFVBQVUsT0FBTyxTQUFTO0FBQUEsUUFDaEQsaUJBQWlCLEdBQUksTUFBTSxVQUFVO0FBQUEsTUFDdEM7QUFFRCxVQUFJLFlBQVksU0FBUyxHQUFHO0FBQzFCLGNBQU8sMkJBQTRCLEdBQUksTUFBTSxVQUFVLFNBQVcsWUFBWTtBQUFBLE1BQy9FO0FBRUQsYUFBTztBQUFBLElBQ2IsQ0FBSztBQUVELFVBQU0sZUFBZSxTQUFTLE9BQU87QUFBQSxNQUNuQyxJQUFJLEdBQUksTUFBTSxVQUFVO0FBQUEsTUFDeEIsTUFBTTtBQUFBLE1BQ04sd0JBQXdCLE1BQU0sYUFBYSxPQUFPLFNBQVM7QUFBQSxJQUNqRSxFQUFNO0FBRUYsVUFBTSxnQkFBZ0IsU0FBUyxNQUFNO0FBQ25DLGFBQU8sV0FBVyxNQUFNLElBQUksQ0FBQyxLQUFLLE9BQU87QUFBQSxRQUN2QyxPQUFPO0FBQUEsUUFDUDtBQUFBLFFBQ0EsTUFBTSxZQUFZLE1BQU0sR0FBRztBQUFBLFFBQzNCLFVBQVU7QUFBQSxRQUNWLGVBQWU7QUFBQSxRQUNmO0FBQUEsUUFDQSxVQUFVLFNBQVM7QUFBQSxNQUMzQixFQUFRO0FBQUEsSUFDUixDQUFLO0FBRUQsVUFBTSxjQUFjLFNBQVMsTUFBTTtBQUNqQyxVQUFJLG9CQUFvQixVQUFVLEdBQUc7QUFDbkMsZUFBTyxDQUFFO0FBQUEsTUFDVjtBQUVELFlBQU0sRUFBRSxNQUFNLEdBQUksSUFBRyx3QkFBd0I7QUFFN0MsYUFBTyxNQUFNLFFBQVEsTUFBTSxNQUFNLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxNQUFNO0FBQ25ELGNBQU0sVUFBVSxpQkFBaUIsTUFBTSxHQUFHLE1BQU07QUFDaEQsY0FBTSxTQUFTLGlCQUFpQixHQUFHLE1BQU07QUFDekMsY0FBTSxRQUFRLE9BQU87QUFFckIsY0FBTSxZQUFZO0FBQUEsVUFDaEIsV0FBVztBQUFBLFVBQ1g7QUFBQSxVQUNBLGFBQWEsNkJBQTZCO0FBQUEsVUFDMUMsYUFBYTtBQUFBLFVBQ2IsU0FBUztBQUFBLFVBQ1Q7QUFBQSxVQUNBLFVBQVU7QUFBQSxVQUNWLE9BQU8sTUFBTTtBQUFBLFVBQ2IsTUFBTSxjQUFjO0FBQUEsVUFDcEIsTUFBTTtBQUFBLFVBQ04saUJBQWlCLFdBQVcsT0FBTyxTQUFTO0FBQUEsVUFDNUMsSUFBSSxHQUFJLE1BQU0sVUFBVSxTQUFXO0FBQUEsVUFDbkMsU0FBUyxNQUFNO0FBQUUseUJBQWEsR0FBRztBQUFBLFVBQUc7QUFBQSxRQUNyQztBQUVELFlBQUksWUFBWSxNQUFNO0FBQ3BCLHNCQUFZLFVBQVUsVUFBVSxVQUFVLFVBQVU7QUFFcEQsY0FBSSxHQUFHLFNBQVMsR0FBRyxZQUFZLE1BQU07QUFDbkMsc0JBQVUsY0FBYyxNQUFNO0FBQUUsbUJBQUssVUFBVSxRQUFRLGVBQWUsS0FBSztBQUFBLFlBQUc7QUFBQSxVQUMvRTtBQUFBLFFBQ0Y7QUFFRCxlQUFPO0FBQUEsVUFDTDtBQUFBLFVBQ0E7QUFBQSxVQUNBLE1BQU0sWUFBWSxNQUFNLEdBQUc7QUFBQSxVQUMzQixPQUFPLGVBQWUsTUFBTSxHQUFHO0FBQUEsVUFDL0IsVUFBVSxVQUFVO0FBQUEsVUFDcEIsU0FBUyxVQUFVO0FBQUEsVUFDbkI7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Q7QUFBQSxNQUNULENBQU87QUFBQSxJQUNQLENBQUs7QUFFRCxVQUFNLG9CQUFvQixTQUFTLE1BQ2pDLE1BQU0saUJBQWlCLFNBQ25CLE1BQU0sZUFDTixHQUFHLFFBQVEsTUFBTSxRQUN0QjtBQUVELFVBQU0sY0FBYztBQUFBLE1BQVMsTUFDM0IsTUFBTSxpQkFBaUIsU0FDcEIsTUFBTSxhQUFhLFFBQ25CLE1BQU0sYUFBYSxRQUNuQixNQUFNLGVBQWUsUUFDckIsTUFBTSxZQUFZO0FBQUEsSUFDdEI7QUFFRCxVQUFNLCtCQUErQixTQUFTLE1BQzVDLE1BQU0seUJBQXlCLFNBQzNCLE1BQU0sdUJBQ0wsTUFBTSxVQUFVLFNBQVMsUUFBUyxNQUFNLFVBQVcsRUFDekQ7QUFJRCxVQUFNLGlCQUFpQixTQUFTLE1BQU0sZUFBZSxNQUFNLGFBQWEsT0FBTyxDQUFDO0FBSWhGLFVBQU0saUJBQWlCLFNBQVMsTUFBTSxlQUFlLE1BQU0sYUFBYSxPQUFPLENBQUM7QUFJaEYsVUFBTSxtQkFBbUIsU0FBUyxNQUFNLGVBQWUsTUFBTSxlQUFlLFNBQVMsQ0FBQztBQUV0RixVQUFNLG9CQUFvQixTQUFTLE1BQU0sV0FBVyxNQUFNLElBQUksU0FBTyxlQUFlLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFFL0YsVUFBTSxxQkFBcUIsU0FBUyxNQUFNO0FBQ3hDLFlBQU0sTUFBTTtBQUFBLFFBQ1Y7QUFBQSxRQUtBLFVBQVU7QUFBQSxRQUNWLFdBQVc7QUFBQSxRQUNYLFNBQVM7QUFBQSxRQUNULFlBQVk7QUFBQSxRQUNaLFNBQVM7QUFBQSxRQUNULFFBQVMsR0FBRztBQUFFLHdCQUFjLFFBQVEsS0FBSyxDQUFDO0FBQUEsUUFBRztBQUFBLE1BQzlDO0FBRUQsVUFBSSxxQkFBcUIsSUFBSSxzQkFBc0IsSUFBSSxtQkFBbUI7QUFFMUUsYUFBTztBQUFBLElBQ2IsQ0FBSztBQUVELFVBQU0sWUFBWSxTQUFPO0FBQ3ZCLHdCQUFrQjtBQUVsQixVQUNFLE1BQU0sYUFBYSxRQUNoQixNQUFNLGNBQWMsUUFDcEIsTUFBTSxhQUFhLFFBR25CLE1BQU0sYUFBYSxVQUFVLFNBQzNCLE9BQU8sVUFBVSxRQUFRLEtBQUssVUFBVSxRQUFTLFNBQVMsVUFBVSxPQUN6RTtBQUNBLDJCQUFtQixRQUFRLGdCQUFpQjtBQUM1QyxZQUFJLE9BQU8sVUFBVSxRQUFRLEtBQUssVUFBVSxNQUFNO0FBQ2hELGlCQUFPLEVBQUU7QUFBQSxRQUNWO0FBQUEsTUFDRjtBQUFBLElBQ1AsR0FBTyxFQUFFLFdBQVcsTUFBTTtBQUV0QixVQUFNLE1BQU0sTUFBTSxXQUFXLGVBQWU7QUFFNUMsVUFBTSxNQUFNLFVBQVU7QUFFdEIsVUFBTSxxQkFBcUIsWUFBWTtBQUV2QyxhQUFTLHVCQUF3QixLQUFLO0FBQ3BDLGFBQU8sTUFBTSxjQUFjLE9BQ3ZCLGVBQWUsTUFBTSxHQUFHLElBQ3hCO0FBQUEsSUFDTDtBQUVELGFBQVMsY0FBZSxPQUFPO0FBQzdCLFVBQUksVUFBVSxNQUFNLFFBQVEsV0FBVyxNQUFNLFFBQVE7QUFDbkQsWUFBSSxNQUFNLGFBQWEsTUFBTTtBQUMzQixnQkFBTSxRQUFRLE1BQU0sV0FBVyxNQUFPO0FBQ3RDLGVBQUssVUFBVSxFQUFFLE9BQU8sT0FBTyxNQUFNLE9BQU8sT0FBTyxDQUFDLEVBQUcsR0FBRyxDQUFFO0FBQzVELGVBQUsscUJBQXFCLEtBQUs7QUFBQSxRQUNoQyxPQUNJO0FBQ0gsZUFBSyxxQkFBcUIsSUFBSTtBQUFBLFFBQy9CO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFRCxhQUFTLHNCQUF1QixPQUFPO0FBQ3JDLG9CQUFjLEtBQUs7QUFDbkIsWUFBTSxNQUFPO0FBQUEsSUFDZDtBQUVELGFBQVMsSUFBSyxLQUFLLFFBQVE7QUFDekIsWUFBTSxNQUFNLHVCQUF1QixHQUFHO0FBRXRDLFVBQUksTUFBTSxhQUFhLE1BQU07QUFDM0IsY0FBTSxjQUFjLFFBQVE7QUFBQSxVQUMxQixlQUFlLE1BQU0sR0FBRztBQUFBLFVBQ3hCO0FBQUEsVUFDQTtBQUFBLFFBQ0Q7QUFFRCxhQUFLLHFCQUFxQixHQUFHO0FBQzdCO0FBQUEsTUFDRDtBQUVELFVBQUksV0FBVyxNQUFNLFdBQVcsR0FBRztBQUNqQyxhQUFLLE9BQU8sRUFBRSxPQUFPLEdBQUcsT0FBTyxLQUFLO0FBQ3BDLGFBQUsscUJBQXFCLE1BQU0sYUFBYSxPQUFPLENBQUUsR0FBSyxJQUFHLEdBQUc7QUFDakU7QUFBQSxNQUNEO0FBRUQsVUFBSSxXQUFXLFFBQVEsaUJBQWlCLEdBQUcsTUFBTSxNQUFNO0FBQ3JEO0FBQUEsTUFDRDtBQUVELFVBQUksTUFBTSxjQUFjLFVBQVUsTUFBTSxXQUFXLFVBQVUsTUFBTSxXQUFXO0FBQzVFO0FBQUEsTUFDRDtBQUVELFlBQU0sUUFBUSxNQUFNLFdBQVcsTUFBTztBQUV0QyxXQUFLLE9BQU8sRUFBRSxPQUFPLE1BQU0sUUFBUSxPQUFPLEtBQUs7QUFDL0MsWUFBTSxLQUFLLEdBQUc7QUFDZCxXQUFLLHFCQUFxQixLQUFLO0FBQUEsSUFDaEM7QUFFRCxhQUFTLGFBQWMsS0FBSyxVQUFVO0FBQ3BDLFVBQUksTUFBTSxTQUFTLFVBQVUsUUFBUSxRQUFRLFVBQVUsaUJBQWlCLE1BQU0sR0FBRyxNQUFNLE1BQU07QUFDM0Y7QUFBQSxNQUNEO0FBRUQsWUFBTSxXQUFXLGVBQWUsTUFBTSxHQUFHO0FBRXpDLFVBQUksTUFBTSxhQUFhLE1BQU07QUFDM0IsWUFBSSxhQUFhLE1BQU07QUFDckI7QUFBQSxZQUNFLE1BQU0sY0FBYyxPQUFPLGVBQWUsTUFBTSxHQUFHLElBQUk7QUFBQSxZQUN2RDtBQUFBLFlBQ0E7QUFBQSxVQUNEO0FBRUQsb0JBQVc7QUFBQSxRQUNaO0FBRUQsa0JBQVUsVUFBVSxRQUFRLFVBQVUsTUFBTSxNQUFPO0FBRW5ELFlBQ0UsV0FBVyxNQUFNLFdBQVcsS0FDekIsWUFBWSxlQUFlLE1BQU0sV0FBVyxNQUFPLEVBQUcsR0FBRyxRQUFRLE1BQU0sTUFDMUU7QUFDQSxlQUFLLHFCQUFxQixNQUFNLGNBQWMsT0FBTyxXQUFXLEdBQUc7QUFBQSxRQUNwRTtBQUNEO0FBQUEsTUFDRDtBQUVELE9BQUMsY0FBYyxRQUFRLG1CQUFtQixVQUFVLFNBQVMsTUFBTSxNQUFPO0FBRTFFLHNCQUFpQjtBQUVqQixVQUFJLFdBQVcsTUFBTSxXQUFXLEdBQUc7QUFDakMsY0FBTSxNQUFNLE1BQU0sY0FBYyxPQUFPLFdBQVc7QUFDbEQsYUFBSyxPQUFPLEVBQUUsT0FBTyxHQUFHLE9BQU8sS0FBSztBQUNwQyxhQUFLLHFCQUFxQixNQUFNLGFBQWEsT0FBTyxDQUFFLEdBQUssSUFBRyxHQUFHO0FBQ2pFO0FBQUEsTUFDRDtBQUVELFlBQ0UsUUFBUSxNQUFNLFdBQVcsTUFBTyxHQUNoQyxRQUFRLGtCQUFrQixNQUFNLFVBQVUsT0FBSyxZQUFZLEdBQUcsUUFBUSxDQUFDO0FBRXpFLFVBQUksVUFBVSxJQUFJO0FBQ2hCLGFBQUssVUFBVSxFQUFFLE9BQU8sT0FBTyxNQUFNLE9BQU8sT0FBTyxDQUFDLEVBQUcsR0FBRyxDQUFFO0FBQUEsTUFDN0QsT0FDSTtBQUNILFlBQUksTUFBTSxjQUFjLFVBQVUsTUFBTSxVQUFVLE1BQU0sV0FBVztBQUNqRTtBQUFBLFFBQ0Q7QUFFRCxjQUFNLE1BQU0sTUFBTSxjQUFjLE9BQU8sV0FBVztBQUVsRCxhQUFLLE9BQU8sRUFBRSxPQUFPLE1BQU0sUUFBUSxPQUFPLEtBQUs7QUFDL0MsY0FBTSxLQUFLLEdBQUc7QUFBQSxNQUNmO0FBRUQsV0FBSyxxQkFBcUIsS0FBSztBQUFBLElBQ2hDO0FBRUQsYUFBUyxlQUFnQixPQUFPO0FBQzlCLFVBQUksR0FBRyxTQUFTLEdBQUcsWUFBWTtBQUFNO0FBRXJDLFlBQU0sTUFBTSxVQUFVLE1BQU0sUUFBUSxvQkFBb0IsUUFDcEQsUUFDQTtBQUVKLFVBQUksWUFBWSxVQUFVLEtBQUs7QUFDN0Isb0JBQVksUUFBUTtBQUFBLE1BQ3JCO0FBQUEsSUFDRjtBQUVELGFBQVMsb0JBQXFCLFNBQVMsR0FBRyxnQkFBZ0I7QUFDeEQsVUFBSSxLQUFLLFVBQVUsTUFBTTtBQUN2QixZQUFJLFFBQVEsWUFBWTtBQUN4QixXQUFHO0FBQ0Qsa0JBQVE7QUFBQSxZQUNOLFFBQVE7QUFBQSxZQUNSO0FBQUEsWUFDQSxvQkFBb0IsUUFBUTtBQUFBLFVBQzdCO0FBQUEsUUFDRixTQUNNLFVBQVUsTUFBTSxVQUFVLFlBQVksU0FBUyxpQkFBaUIsTUFBTSxNQUFNLFFBQVMsTUFBTyxNQUFNO0FBRXpHLFlBQUksWUFBWSxVQUFVLE9BQU87QUFDL0IseUJBQWUsS0FBSztBQUNwQixtQkFBUyxLQUFLO0FBRWQsY0FBSSxtQkFBbUIsUUFBUSxNQUFNLGFBQWEsUUFBUSxNQUFNLGNBQWMsTUFBTTtBQUNsRjtBQUFBLGNBQ0UsU0FBUyxJQUNMLGVBQWUsTUFBTSxNQUFNLFFBQVMsTUFBTyxJQUMzQztBQUFBLGNBQ0o7QUFBQSxZQUNEO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVELGFBQVMsVUFBVyxPQUFPLFlBQVk7QUFDckMsWUFBTSxLQUFLLFNBQU8sWUFBWSxlQUFlLE1BQU0sR0FBRyxHQUFHLEtBQUs7QUFDOUQsYUFBTyxNQUFNLFFBQVEsS0FBSyxFQUFFLEtBQUssV0FBVyxLQUFLLEVBQUUsS0FBSztBQUFBLElBQ3pEO0FBRUQsYUFBUyxlQUFnQixXQUFXLFlBQVk7QUFDOUMsWUFBTSxNQUFNLGNBQWMsU0FDdEIsWUFDQTtBQUVKLGFBQU8sT0FBTyxRQUFRLGFBQ2xCLE1BQ0EsU0FBUSxRQUFRLFFBQVEsT0FBTyxRQUFRLFlBQVksT0FBTyxNQUFNLElBQUssT0FBUTtBQUFBLElBQ2xGO0FBRUQsYUFBUyxpQkFBa0IsS0FBSztBQUM5QixZQUFNLE1BQU0sZUFBZSxNQUFNLEdBQUc7QUFDcEMsYUFBTyxrQkFBa0IsTUFBTSxLQUFLLE9BQUssWUFBWSxHQUFHLEdBQUcsQ0FBQyxNQUFNO0FBQUEsSUFDbkU7QUFFRCxhQUFTLGdCQUFpQixHQUFHO0FBQzNCLFVBQ0UsTUFBTSxhQUFhLFFBQ2hCLFVBQVUsVUFBVSxTQUNuQixNQUFNLFVBQVcsVUFBVSxVQUFVLEVBQUUsVUFBVSxFQUFFLE9BQU8sVUFBVSxlQUFlLFFBQ3ZGO0FBQ0Esa0JBQVUsTUFBTSxPQUFRO0FBQUEsTUFDekI7QUFBQSxJQUNGO0FBRUQsYUFBUyxjQUFlLEdBQUc7QUFJekIsVUFBSSxVQUFVLEdBQUcsRUFBRSxNQUFNLFFBQVEsS0FBSyxVQUFVLE1BQU07QUFDcEQsYUFBSyxDQUFDO0FBRU4sa0JBQVc7QUFDWCx3QkFBaUI7QUFBQSxNQUNsQjtBQUVELFdBQUssU0FBUyxDQUFDO0FBQUEsSUFDaEI7QUFFRCxhQUFTLHFCQUFzQixHQUFHO0FBQ2hDLFlBQU0sRUFBRSxVQUFVLEVBQUU7QUFFcEIsVUFBSSxFQUFFLFlBQVksUUFBUTtBQUN4QixzQkFBYyxDQUFDO0FBQ2Y7QUFBQSxNQUNEO0FBRUQsUUFBRSxPQUFPLFFBQVE7QUFFakIsVUFBSSxnQkFBZ0IsTUFBTTtBQUN4QixxQkFBYSxXQUFXO0FBQ3hCLHNCQUFjO0FBQUEsTUFDZjtBQUNELFVBQUksb0JBQW9CLE1BQU07QUFDNUIscUJBQWEsZUFBZTtBQUM1QiwwQkFBa0I7QUFBQSxNQUNuQjtBQUVELHNCQUFpQjtBQUVqQixVQUFJLE9BQU8sVUFBVSxZQUFZLE1BQU0sV0FBVyxHQUFHO0FBQ25ELGNBQU0sU0FBUyxNQUFNLGtCQUFtQjtBQUN4QyxjQUFNLFNBQVMsZUFBYTtBQUMxQixnQkFBTSxTQUFTLE1BQU0sUUFBUSxLQUFLLFNBQU8sVUFBVSxNQUFNLEdBQUcsRUFBRSxrQkFBaUIsTUFBTyxNQUFNO0FBRTVGLGNBQUksV0FBVyxRQUFRO0FBQ3JCLG1CQUFPO0FBQUEsVUFDUjtBQUVELGNBQUksV0FBVyxNQUFNLFFBQVEsTUFBTSxNQUFNLElBQUk7QUFDM0MseUJBQWEsTUFBTTtBQUFBLFVBQ3BCLE9BQ0k7QUFDSCxzQkFBVztBQUFBLFVBQ1o7QUFFRCxpQkFBTztBQUFBLFFBQ1I7QUFDRCxjQUFNLFNBQVMsaUJBQWU7QUFDNUIsY0FBSSxPQUFPLGNBQWMsTUFBTSxNQUFNO0FBQ25DO0FBQUEsVUFDRDtBQUNELGNBQUksT0FBTyxjQUFjLE1BQU0sUUFBUSxnQkFBZ0IsTUFBTTtBQUMzRDtBQUFBLFVBQ0Q7QUFFRCxpQkFBTyxPQUFPLE1BQU0sTUFBTSxPQUFPLElBQUksQ0FBQztBQUFBLFFBQ3ZDO0FBRUQsZUFBUTtBQUFBLE1BQ1QsT0FDSTtBQUNILGNBQU0sV0FBVyxDQUFDO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBRUQsYUFBUyxpQkFBa0IsR0FBRztBQUM1QixXQUFLLFlBQVksQ0FBQztBQUFBLElBQ25CO0FBRUQsYUFBUyxnQkFBaUIsR0FBRztBQUMzQixXQUFLLFdBQVcsQ0FBQztBQUVqQixVQUFJLGdCQUFnQixDQUFDLE1BQU0sTUFBTTtBQUMvQjtBQUFBLE1BQ0Q7QUFFRCxZQUFNLG9CQUFvQixXQUFXLE1BQU0sV0FBVyxNQUNoRCxNQUFNLGlCQUFpQixVQUFVLE1BQU0sZUFBZTtBQUU1RCxZQUFNLGtCQUFrQixFQUFFLGFBQWEsUUFDbEMsTUFBTSxhQUFhLFNBQ2xCLFlBQVksVUFBVSxNQUFNLHNCQUFzQjtBQUd4RCxVQUFJLEVBQUUsWUFBWSxJQUFJO0FBQ3BCLGdCQUFRLENBQUM7QUFDVDtBQUFBLE1BQ0Q7QUFHRCxVQUFJLEVBQUUsWUFBWSxLQUFLLG9CQUFvQixPQUFPO0FBQ2hELGtCQUFXO0FBQ1g7QUFBQSxNQUNEO0FBRUQsVUFDRSxFQUFFLFdBQVcsVUFDVixFQUFFLE9BQU8sT0FBTyxNQUFNLFVBQVUsU0FDaEMsTUFBTSxTQUFTLFVBQVU7QUFDNUI7QUFHRixVQUNFLEVBQUUsWUFBWSxNQUNYLE1BQU0sYUFBYSxVQUFVLFFBQzdCLEtBQUssVUFBVSxPQUNsQjtBQUNBLHVCQUFlLENBQUM7QUFDaEIsa0JBQVc7QUFDWDtBQUFBLE1BQ0Q7QUFHRCxVQUNFLEVBQUUsWUFBWSxNQUVaLE1BQU0sYUFBYSxRQUNoQixNQUFNLGNBQWMsU0FFdEIsTUFBTSxpQkFBaUIsUUFDdkIsV0FBVyxNQUFNLFdBQVcsR0FDL0I7QUFDQSxZQUFJLE1BQU0sYUFBYSxRQUFRLE1BQU0sUUFBUSxNQUFNLFVBQVUsTUFBTSxNQUFNO0FBQ3ZFLHdCQUFjLE1BQU0sV0FBVyxTQUFTLENBQUM7QUFBQSxRQUMxQyxXQUNRLE1BQU0sYUFBYSxRQUFRLE1BQU0sZUFBZSxNQUFNO0FBQzdELGVBQUsscUJBQXFCLElBQUk7QUFBQSxRQUMvQjtBQUNEO0FBQUEsTUFDRDtBQUdELFdBQ0csRUFBRSxZQUFZLE1BQU0sRUFBRSxZQUFZLFFBQy9CLE9BQU8sV0FBVyxVQUFVLFlBQVksV0FBVyxNQUFNLFdBQVcsSUFDeEU7QUFDQSx1QkFBZSxDQUFDO0FBQ2hCLG9CQUFZLFFBQVE7QUFDcEIsNEJBQW9CLEVBQUUsWUFBWSxLQUFLLElBQUksSUFBSSxNQUFNLFFBQVE7QUFBQSxNQUM5RDtBQUdELFdBQ0csRUFBRSxZQUFZLE1BQU0sRUFBRSxZQUFZLE9BQ2hDLCtCQUErQixVQUFVLFFBQzVDO0FBQ0EsdUJBQWUsQ0FBQztBQUNoQixvQkFBWSxRQUFRLEtBQUs7QUFBQSxVQUN2QjtBQUFBLFVBQ0EsS0FBSztBQUFBLFlBQ0gsb0JBQW9CO0FBQUEsWUFDcEIsWUFBWSxTQUFTLEVBQUUsWUFBWSxLQUFLLEtBQUssS0FBSywrQkFBK0IsTUFBTTtBQUFBLFVBQ3hGO0FBQUEsUUFDRjtBQUNELDRCQUFvQixFQUFFLFlBQVksS0FBSyxJQUFJLElBQUksTUFBTSxRQUFRO0FBQUEsTUFDOUQ7QUFHRCxVQUFJLEVBQUUsWUFBWSxNQUFNLEVBQUUsWUFBWSxJQUFJO0FBQ3hDLHVCQUFlLENBQUM7QUFDaEIsNEJBQW9CLEVBQUUsWUFBWSxLQUFLLEtBQUssR0FBRyxNQUFNLFFBQVE7QUFBQSxNQUM5RDtBQUVELFlBQU0sZ0JBQWdCLG9CQUFvQjtBQUcxQyxVQUFJLGlCQUFpQixVQUFVLGtCQUFrQixLQUFLLElBQUcsR0FBSTtBQUMzRCx1QkFBZTtBQUFBLE1BQ2hCO0FBR0QsVUFDRSxnQkFBZ0IsS0FDYixNQUFNLGFBQWEsUUFDbkIsRUFBRSxRQUFRLFVBQ1YsRUFBRSxJQUFJLFdBQVcsS0FDakIsRUFBRSxXQUFXLFNBQ2IsRUFBRSxZQUFZLFNBQ2QsRUFBRSxZQUFZLFVBQ2IsRUFBRSxZQUFZLE1BQU0sYUFBYSxXQUFXLElBQ2hEO0FBQ0EsYUFBSyxVQUFVLFFBQVEsVUFBVSxDQUFDO0FBRWxDLGNBQ0UsT0FBTyxFQUFFLElBQUksa0JBQW1CLEdBQ2hDLFlBQVksYUFBYSxXQUFXLEtBQUssYUFBYyxPQUFRO0FBRWpFLDBCQUFrQixLQUFLLElBQUcsSUFBSztBQUMvQixZQUFJLGNBQWMsT0FBTztBQUN2Qix5QkFBZSxDQUFDO0FBQ2hCLDBCQUFnQjtBQUFBLFFBQ2pCO0FBRUQsY0FBTSxXQUFXLElBQUksT0FBTyxNQUFNLGFBQWEsTUFBTSxFQUFFLEVBQUUsSUFBSSxPQUFNLGFBQWEsUUFBUSxDQUFDLE1BQU0sS0FBSyxPQUFPLElBQUksQ0FBRSxFQUFFLEtBQUssSUFBSSxHQUFHLEdBQUc7QUFFbEksWUFBSSxRQUFRLFlBQVk7QUFFeEIsWUFBSSxjQUFjLFFBQVEsUUFBUSxLQUFLLFNBQVMsS0FBSyxlQUFlLE1BQU0sTUFBTSxRQUFTLE1BQU8sQ0FBQyxNQUFNLE1BQU07QUFDM0csYUFBRztBQUNELG9CQUFRLG9CQUFvQixRQUFRLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQztBQUFBLFVBQzdELFNBQ00sVUFBVSxZQUFZLFVBQzNCLGlCQUFpQixNQUFNLE1BQU0sUUFBUyxNQUFPLE1BQU0sUUFDaEQsU0FBUyxLQUFLLGVBQWUsTUFBTSxNQUFNLFFBQVMsTUFBTyxDQUFDLE1BQU07QUFBQSxRQUV0RTtBQUVELFlBQUksWUFBWSxVQUFVLE9BQU87QUFDL0IsbUJBQVMsTUFBTTtBQUNiLDJCQUFlLEtBQUs7QUFDcEIscUJBQVMsS0FBSztBQUVkLGdCQUFJLFNBQVMsS0FBSyxNQUFNLGFBQWEsUUFBUSxNQUFNLGNBQWMsTUFBTTtBQUNyRSw0QkFBYyxlQUFlLE1BQU0sTUFBTSxRQUFTLE1BQU8sR0FBRyxJQUFJO0FBQUEsWUFDakU7QUFBQSxVQUNiLENBQVc7QUFBQSxRQUNGO0FBRUQ7QUFBQSxNQUNEO0FBSUQsVUFDRSxFQUFFLFlBQVksT0FDVixFQUFFLFlBQVksTUFBTSxNQUFNLGFBQWEsUUFBUSxpQkFBaUIsUUFDaEUsRUFBRSxZQUFZLEtBQUssb0JBQW9CO0FBQzNDO0FBRUYsUUFBRSxZQUFZLEtBQUssZUFBZSxDQUFDO0FBRW5DLFVBQUksWUFBWSxVQUFVLE1BQU0sWUFBWSxRQUFRLGVBQWU7QUFDakUscUJBQWEsTUFBTSxRQUFTLFlBQVksTUFBTztBQUMvQztBQUFBLE1BQ0Q7QUFFRCxVQUFJLHNCQUFzQixNQUFNO0FBQzlCLGNBQU0sT0FBTyxDQUFDLEtBQUssU0FBUztBQUMxQixjQUFJLE1BQU07QUFDUixnQkFBSSxxQkFBcUIsSUFBSSxNQUFNLE1BQU07QUFDdkM7QUFBQSxZQUNEO0FBQUEsVUFDRixPQUNJO0FBQ0gsbUJBQU8sTUFBTTtBQUFBLFVBQ2Q7QUFFRCwyQkFBaUIsSUFBSSxNQUFNLGFBQWEsTUFBTSxJQUFJO0FBRWxELGNBQUksUUFBUSxVQUFVLFFBQVEsTUFBTTtBQUNsQztBQUFBLFVBQ0Q7QUFFRCxnQkFBTSxLQUFLLFNBQVMsV0FBVyxlQUFlO0FBQzlDLGFBQUcsS0FBSyxTQUFTLFlBQVk7QUFFN0IsY0FBSSxNQUFNLGFBQWEsTUFBTTtBQUMzQixzQkFBVSxVQUFVLFFBQVEsVUFBVSxNQUFNLE1BQU87QUFDbkQsc0JBQVc7QUFBQSxVQUNaO0FBQUEsUUFDRjtBQUVELFlBQUksTUFBTSxlQUFlLFFBQVE7QUFDL0IsZUFBSyxZQUFZLFdBQVcsT0FBTyxJQUFJO0FBQUEsUUFDeEMsT0FDSTtBQUNILGVBQUssV0FBVyxLQUFLO0FBQUEsUUFDdEI7QUFFRCxZQUFJLE1BQU0sYUFBYSxNQUFNO0FBQzNCO0FBQUEsUUFDRDtBQUFBLE1BQ0Y7QUFFRCxVQUFJLEtBQUssVUFBVSxNQUFNO0FBQ3ZCLGtCQUFXO0FBQUEsTUFDWixXQUNRLE1BQU0sYUFBYSxVQUFVLE1BQU07QUFDMUMsa0JBQVc7QUFBQSxNQUNaO0FBQUEsSUFDRjtBQUVELGFBQVMscUJBQXNCO0FBQzdCLGFBQU8sY0FBYyxPQUNqQixlQUFlLFFBRWIsUUFBUSxVQUFVLFFBQVEsUUFBUSxNQUFNLGNBQWMsT0FDbEQsUUFBUSxNQUFNLFlBQ2Q7QUFBQSxJQUVYO0FBRUQsYUFBUyx5QkFBMEI7QUFDakMsYUFBTyxtQkFBb0I7QUFBQSxJQUM1QjtBQUVELGFBQVMsZUFBZ0I7QUFDdkIsVUFBSSxNQUFNLGlCQUFpQixNQUFNO0FBQy9CLGVBQU8sQ0FBRTtBQUFBLE1BQ1Y7QUFFRCxVQUFJLE1BQU8scUJBQXNCLFFBQVE7QUFDdkMsZUFBTyxjQUFjLE1BQU0sSUFBSSxXQUFTLE1BQU8saUJBQWtCLEtBQUssQ0FBQyxFQUFFLE1BQU87QUFBQSxNQUNqRjtBQUVELFVBQUksTUFBTSxhQUFhLFFBQVE7QUFDN0IsZUFBTyxHQUFHLE9BQU8sTUFBTSxTQUFRLENBQUU7QUFBQSxNQUNsQztBQUVELFVBQUksTUFBTSxhQUFhLE1BQU07QUFDM0IsZUFBTyxjQUFjLE1BQU0sSUFBSSxDQUFDLE9BQU8sTUFBTSxFQUFFLE9BQU87QUFBQSxVQUNwRCxLQUFLLFlBQVk7QUFBQSxVQUNqQixXQUFXLE1BQU0sU0FBUyxVQUFVLFFBQVEsaUJBQWlCLE1BQU0sTUFBTSxHQUFHLE1BQU07QUFBQSxVQUNsRixPQUFPO0FBQUEsVUFDUCxXQUFXLE1BQU07QUFBQSxVQUNqQixVQUFVLFNBQVM7QUFBQSxVQUNuQixXQUFZO0FBQUUsa0JBQU0sY0FBYyxDQUFDO0FBQUEsVUFBRztBQUFBLFFBQ2hELEdBQVcsTUFBTSxFQUFFLFFBQVE7QUFBQSxVQUNqQixPQUFPO0FBQUEsVUFDUCxDQUFFLE1BQU0sU0FBUyxPQUFPLGNBQWMsZ0JBQWlCLGVBQWUsTUFBTSxNQUFNLEdBQUc7QUFBQSxRQUN0RixDQUFBLENBQUMsQ0FBQztBQUFBLE1BQ0o7QUFFRCxhQUFPO0FBQUEsUUFDTCxFQUFFLFFBQVE7QUFBQSxVQUNSLENBQUUsWUFBWSxVQUFVLE9BQU8sY0FBYyxnQkFBaUIsaUJBQWlCO0FBQUEsUUFDekYsQ0FBUztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUQsYUFBUyxnQkFBaUI7QUFDeEIsVUFBSSxVQUFVLFVBQVUsTUFBTTtBQUM1QixlQUFPLE1BQU8saUJBQWtCLFNBQzVCLE1BQU8sYUFBYyxFQUFFLFlBQVksV0FBVyxNQUFLLENBQUUsSUFDckQ7QUFBQSxNQUNMO0FBRUQsWUFBTSxLQUFLLE1BQU0sV0FBVyxTQUN4QixNQUFNLFNBQ04sV0FBUztBQUNULGVBQU8sRUFBRSxPQUFPO0FBQUEsVUFDZCxLQUFLLE1BQU07QUFBQSxVQUNYLEdBQUcsTUFBTTtBQUFBLFFBQ3JCLEdBQWEsTUFBTTtBQUNQLGlCQUFPO0FBQUEsWUFDTDtBQUFBLFlBQ0EsTUFBTTtBQUFBLGNBQ0o7QUFBQSxjQUNBLE1BQU0sRUFBRSxRQUFRO0FBQUEsZ0JBQ2QsQ0FBRSxNQUFNLFNBQVMsT0FBTyxjQUFjLGdCQUFpQixNQUFNO0FBQUEsY0FDL0UsQ0FBaUI7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ2IsQ0FBVztBQUFBLE1BQ0Y7QUFFSCxVQUFJLFVBQVUsaUJBQWlCLE9BQU8sWUFBWSxNQUFNLElBQUksRUFBRSxDQUFDO0FBRS9ELFVBQUksTUFBTyxzQkFBdUIsUUFBUTtBQUN4QyxrQkFBVSxNQUFPLGtCQUFrQixFQUFHLE9BQU8sT0FBTztBQUFBLE1BQ3JEO0FBRUQsYUFBTyxXQUFXLE1BQU8sa0JBQW1CLE9BQU87QUFBQSxJQUNwRDtBQUVELGFBQVMsU0FBVSxZQUFZLFVBQVU7QUFDdkMsWUFBTSxRQUFRLGFBQWEsT0FBTyxFQUFFLEdBQUcsY0FBYyxPQUFPLEdBQUcsTUFBTSxXQUFXLFdBQVcsTUFBSyxJQUFLO0FBRXJHLFlBQU0sT0FBTztBQUFBLFFBQ1gsS0FBSyxhQUFhLE9BQU8sWUFBWTtBQUFBLFFBQ3JDLEtBQUs7QUFBQSxRQUNMLE9BQU8sbUJBQW1CO0FBQUEsUUFDMUIsT0FBTyxNQUFNO0FBQUEsUUFDYixPQUFPLFdBQVcsVUFBVSxTQUFTLFdBQVcsUUFBUTtBQUFBLFFBRXhELE1BQU07QUFBQSxRQUNOLEdBQUc7QUFBQSxRQUNILElBQUksYUFBYSxPQUFPLE1BQU0sVUFBVSxRQUFRO0FBQUEsUUFDaEQsV0FBVyxNQUFNO0FBQUEsUUFDakIsY0FBYyxNQUFNO0FBQUEsUUFDcEIsa0JBQWtCLGVBQWUsUUFBUSxNQUFNLGNBQWMsUUFBUTtBQUFBLFFBQ3JFLFVBQVUsTUFBTSxZQUFZO0FBQUEsUUFDNUIsVUFBVSxNQUFNLGFBQWE7QUFBQSxRQUM3QixHQUFHLG1CQUFtQjtBQUFBLE1BQ3ZCO0FBRUQsVUFBSSxlQUFlLFFBQVEsY0FBYyxNQUFNO0FBQzdDLFlBQUksTUFBTSxRQUFRLEtBQUssS0FBSyxNQUFNLE1BQU07QUFDdEMsZUFBSyxRQUFRLENBQUUsR0FBRyxLQUFLLE9BQU8sbUJBQXFCO0FBQUEsUUFDcEQsT0FDSTtBQUNILGVBQUssU0FBUztBQUFBLFFBQ2Y7QUFBQSxNQUNGO0FBRUQsYUFBTyxFQUFFLFNBQVMsSUFBSTtBQUFBLElBQ3ZCO0FBRUQsYUFBUyxRQUFTLEdBQUc7QUFDbkIsVUFBSSxnQkFBZ0IsTUFBTTtBQUN4QixxQkFBYSxXQUFXO0FBQ3hCLHNCQUFjO0FBQUEsTUFDZjtBQUNELFVBQUksb0JBQW9CLE1BQU07QUFDNUIscUJBQWEsZUFBZTtBQUM1QiwwQkFBa0I7QUFBQSxNQUNuQjtBQUVELFVBQUksS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLGVBQWUsTUFBTTtBQUNqRDtBQUFBLE1BQ0Q7QUFFRCxvQkFBYyxFQUFFLE9BQU8sU0FBUyxFQUFFO0FBR2xDLHVCQUFpQjtBQUNqQiwwQkFBb0IsV0FBVztBQUUvQixVQUNFLE1BQU0sUUFBUSxVQUFVLFNBQ3BCLGNBQWMsUUFBUSxtQkFBbUIsVUFBVSxPQUN2RDtBQUNBLGNBQU0sTUFBTztBQUFBLE1BQ2Q7QUFFRCxVQUFJLE1BQU0sYUFBYSxRQUFRO0FBQzdCLHNCQUFjLFdBQVcsTUFBTTtBQUM3Qix3QkFBYztBQUNkLGlCQUFPLFdBQVcsS0FBSztBQUFBLFFBQ2pDLEdBQVcsTUFBTSxhQUFhO0FBQUEsTUFDdkI7QUFBQSxJQUNGO0FBRUQsYUFBUyxjQUFlLEtBQUssaUJBQWlCO0FBQzVDLFVBQUksV0FBVyxVQUFVLEtBQUs7QUFDNUIsbUJBQVcsUUFBUTtBQUVuQixZQUFJLG9CQUFvQixRQUFRLE1BQU0sa0JBQWtCLEtBQUssTUFBTSxrQkFBa0IsS0FBSztBQUN4RixlQUFLLGNBQWMsR0FBRztBQUFBLFFBQ3ZCLE9BQ0k7QUFDSCw0QkFBa0IsV0FBVyxNQUFNO0FBQ2pDLDhCQUFrQjtBQUNsQixpQkFBSyxjQUFjLEdBQUc7QUFBQSxVQUNsQyxHQUFhLE1BQU0sYUFBYTtBQUFBLFFBQ3ZCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFRCxhQUFTLGlCQUFrQixLQUFLLGFBQWEsVUFBVTtBQUNyRCx1QkFBaUIsYUFBYTtBQUU5QixVQUFJLE1BQU0sYUFBYSxNQUFNO0FBQzNCLHNCQUFjLEtBQUssSUFBSTtBQUV2QixZQUFJLGdCQUFnQixRQUFRLGFBQWEsTUFBTTtBQUM3Qyw4QkFBb0I7QUFBQSxRQUNyQjtBQUVELHdCQUFnQixRQUFRLE9BQU8sR0FBRztBQUFBLE1BQ25DO0FBQUEsSUFDRjtBQUVELGFBQVMsT0FBUSxLQUFLLFlBQVksZUFBZTtBQUMvQyxVQUFJLE1BQU0sYUFBYSxVQUFXLGVBQWUsUUFBUSxNQUFNLFFBQVEsVUFBVSxNQUFPO0FBQ3RGO0FBQUEsTUFDRDtBQUVELFVBQUksTUFBTSxhQUFhLFVBQVUsTUFBTTtBQUNyQyxhQUFLLGFBQWE7QUFBQSxNQUNuQixPQUNJO0FBQ0gsY0FBTSxhQUFhLFFBQVE7QUFDM0IsOEJBQXNCLFFBQVE7QUFBQSxNQUMvQjtBQUVELFVBQ0UsUUFBUSxNQUNMLE1BQU0sYUFBYSxRQUNuQixXQUFXLE1BQU0sV0FBVyxLQUM1QixtQkFBbUIsUUFDbkIsUUFBUSxlQUFlLE1BQU0sV0FBVyxNQUFPLEVBQUcsR0FDckQ7QUFDQSxjQUFNO0FBQUEsTUFDUDtBQUVELFlBQU0sZ0JBQWdCLFdBQVcsTUFBTTtBQUNyQyxhQUFLLFVBQVUsU0FBUyxLQUFLLFFBQVE7QUFBQSxNQUN0QyxHQUFFLEVBQUU7QUFFTCxtQkFBYSxRQUFRLGFBQWEsUUFBUTtBQUMxQyxpQkFBVztBQUVYO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxRQUNBLENBQUMsSUFBSSxZQUFZO0FBQ2YsZUFBSyxlQUFlLFFBQVEsTUFBTSxRQUFRLFVBQVUsU0FBUyxhQUFhLGVBQWU7QUFDdkYseUJBQWEsUUFBUTtBQUVyQixtQkFBTyxPQUFPLGNBQWMsR0FBSTtBQUdoQyxrQ0FBc0IsUUFBUTtBQUU5QixxQkFBUyxNQUFNO0FBQ2Isb0JBQU0sYUFBYSxRQUFRO0FBRTNCLGtCQUFJLE1BQU0sU0FBUyxVQUFVLE1BQU07QUFDakMsb0JBQUksZUFBZSxNQUFNO0FBQ3ZCLHVCQUFLLFVBQVUsUUFBUSxVQUFXO0FBQUEsZ0JBQ25DLFdBQ1EsS0FBSyxVQUFVLE1BQU07QUFDNUIsNkJBQVcsSUFBSTtBQUFBLGdCQUNoQixPQUNJO0FBQ0gsdUJBQUssUUFBUTtBQUFBLGdCQUNkO0FBQUEsY0FDRjtBQUVELHFCQUFPLFlBQVksY0FBYyxTQUFTLE1BQU07QUFBRSx3QkFBUSxLQUFLO0FBQUEsZUFBRztBQUNsRSxxQkFBTyxrQkFBa0IsY0FBYyxTQUFTLE1BQU07QUFBRSw4QkFBYyxLQUFLO0FBQUEsZUFBRztBQUFBLFlBQzVGLENBQWE7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0QsTUFBTTtBQUNKLGNBQUksTUFBTSxRQUFRLFVBQVUsUUFBUSxhQUFhLGVBQWU7QUFDOUQseUJBQWEsUUFBUTtBQUNyQixrQkFBTSxhQUFhLFFBQVE7QUFDM0Isa0NBQXNCLFFBQVE7QUFBQSxVQUMvQjtBQUNELGVBQUssVUFBVSxTQUFTLEtBQUssUUFBUTtBQUFBLFFBQ3RDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFRCxhQUFTLFVBQVc7QUFDbEIsYUFBTyxFQUFFLE9BQU87QUFBQSxRQUNkLEtBQUs7QUFBQSxRQUNMLE9BQU8saUJBQWlCO0FBQUEsUUFDeEIsT0FBTyxNQUFNO0FBQUEsUUFDYixZQUFZLEtBQUs7QUFBQSxRQUNqQixLQUFLLE1BQU0sZUFBZTtBQUFBLFFBQzFCLE9BQU8sTUFBTSxpQkFBaUIsUUFBUSxVQUFVLFVBQVUsUUFBUSxNQUFNLGFBQWE7QUFBQSxRQUNyRixRQUFRLE1BQU07QUFBQSxRQUNkLE1BQU0sTUFBTTtBQUFBLFFBQ1osUUFBUSxNQUFNO0FBQUEsUUFDZCxNQUFNLGNBQWM7QUFBQSxRQUNwQixlQUFlO0FBQUEsUUFDZixXQUFXO0FBQUEsUUFDWCxTQUFTO0FBQUEsUUFDVCxnQkFBZ0IsTUFBTTtBQUFBLFFBQ3RCLFFBQVEsWUFBWTtBQUFBLFFBQ3BCLGdCQUFnQixNQUFNO0FBQUEsUUFDdEIsZ0JBQWdCLE1BQU07QUFBQSxRQUN0QixvQkFBb0IsTUFBTTtBQUFBLFFBQzFCLG9CQUFvQjtBQUFBLFFBQ3BCLEdBQUcsYUFBYTtBQUFBLFFBQ2hCLGlCQUFpQjtBQUFBLFFBQ2pCLGNBQWM7QUFBQSxRQUNkLGNBQWM7QUFBQSxRQUNkLFFBQVE7QUFBQSxNQUNULEdBQUUsYUFBYTtBQUFBLElBQ2pCO0FBRUQsYUFBUyxpQkFBa0IsR0FBRztBQUM1Qix5QkFBbUIsQ0FBQztBQUNwQixnQkFBVztBQUFBLElBQ1o7QUFFRCxhQUFTLGFBQWM7QUFDckIsMkJBQXNCO0FBQUEsSUFDdkI7QUFFRCxhQUFTLG1CQUFvQixHQUFHO0FBQzlCLFdBQUssQ0FBQztBQUNOLGdCQUFVLFVBQVUsUUFBUSxVQUFVLE1BQU0sTUFBTztBQUNuRCx5QkFBbUIsUUFBUTtBQUMzQixhQUFPLFNBQVMsT0FBTyxlQUFlLE9BQU8sV0FBVyxTQUFTLEtBQUssY0FBYyxHQUFHLENBQUM7QUFBQSxJQUN6RjtBQUVELGFBQVMsa0JBQW1CLEdBQUc7QUFDN0IsV0FBSyxDQUFDO0FBQ04sZUFBUyxNQUFNO0FBQ2IsMkJBQW1CLFFBQVE7QUFBQSxNQUNuQyxDQUFPO0FBQUEsSUFDRjtBQUVELGFBQVMsWUFBYTtBQUNwQixZQUFNLFVBQVU7QUFBQSxRQUNkLEVBQUUsUUFBUTtBQUFBLFVBQ1IsT0FBTyxZQUFhLE1BQU0sV0FBVztBQUFBLFVBQ3JDLEdBQUcsZ0JBQWdCO0FBQUEsVUFDbkIsS0FBSyxNQUFNLFVBQVU7QUFBQSxVQUNyQixNQUFNLGNBQWM7QUFBQSxVQUNwQixRQUFRO0FBQUEsVUFDUixTQUFTLHNCQUFzQjtBQUFBLFVBQy9CLGFBQWE7QUFBQSxVQUNiLFFBQVE7QUFBQSxVQUNSLFlBQVksV0FBVyxNQUFNLFdBQVc7QUFBQSxVQUN4QyxHQUFHLE1BQU0sV0FBVyxVQUFVO0FBQUEsVUFDOUIsU0FBUztBQUFBLFVBQ1QsUUFBUTtBQUFBLFFBQ2xCLEdBQVc7QUFBQSxVQUNELEdBQUc7QUFBQSxVQUNILFlBQVksTUFBTSxNQUFNLFdBQVcsSUFBSTtBQUFBLFVBQ3ZDLFFBQVE7QUFBQSxVQUNSLE9BQU87QUFBQSxRQUNqQixDQUFTO0FBQUEsTUFDRjtBQUVELFdBQUssVUFBVSxRQUFRLFFBQVE7QUFBQSxRQUM3QixFQUFFLE9BQU87QUFBQSxVQUNQLEtBQUs7QUFBQSxVQUNMLE9BQU8saUJBQWlCLFFBQVE7QUFBQSxVQUNoQyxPQUFPLE1BQU07QUFBQSxVQUNiLEdBQUcsYUFBYTtBQUFBLFVBQ2hCLFNBQVM7QUFBQSxVQUNULGlCQUFpQjtBQUFBLFFBQ2xCLEdBQUUsY0FBYSxDQUFFO0FBQUEsTUFDbkI7QUFFRCxhQUFPLEVBQUUsU0FBUztBQUFBLFFBQ2hCLEtBQUs7QUFBQSxRQUNMLFlBQVksT0FBTztBQUFBLFFBQ25CLFVBQVUsTUFBTSxhQUFhLE9BQU8sUUFBUTtBQUFBLFFBQzVDLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQixNQUFNO0FBQUEsUUFDdEIsb0JBQW9CLE1BQU07QUFBQSxRQUMxQixnQkFBZ0IsTUFBTTtBQUFBLFFBQ3RCLGNBQWM7QUFBQSxRQUNkLGNBQWM7QUFBQSxRQUNkLFFBQVE7QUFBQSxRQUNSLFFBQVE7QUFBQSxNQUNoQixHQUFTLE1BQU0sRUFBRSxPQUFPO0FBQUEsUUFDaEIsT0FBTyxzQkFDRixjQUFjLFVBQVUsT0FBTyxtQ0FBbUMsT0FDbEUsbUJBQW1CLFVBQVUsT0FBTywrQkFBK0I7QUFBQSxNQUN6RSxHQUFFLE9BQU8sQ0FBQztBQUFBLElBQ1o7QUFFRCxhQUFTLG1CQUFvQixHQUFHO0FBQzlCLHlCQUFtQixDQUFDO0FBRXBCLFVBQUksVUFBVSxVQUFVLE1BQU07QUFDNUIsa0JBQVUsTUFBTTtBQUFBLFVBQ2QsTUFBTSxRQUFRLE1BQU0sY0FBYywwQ0FBMEM7QUFBQSxRQUM3RTtBQUFBLE1BQ0Y7QUFFRCxZQUFNLFFBQVEsUUFBUTtBQUFBLElBQ3ZCO0FBRUQsYUFBUyxhQUFjLEdBQUc7QUFDeEIsZ0JBQVc7QUFDWCxZQUFNLFFBQVEsVUFBVSxTQUFTLEtBQUssUUFBUSxDQUFDO0FBQy9DLHNCQUFpQjtBQUFBLElBQ2xCO0FBRUQsYUFBUyxlQUFnQjtBQUN2QixZQUFNLEtBQUssU0FBUztBQUNwQixXQUNHLE9BQU8sUUFBUSxHQUFHLE9BQU8sTUFBTSxVQUFVLFVBQ3ZDLFVBQVUsVUFBVSxRQUNwQixVQUFVLFVBQVUsSUFDdkI7QUFDQSxrQkFBVSxNQUFNLE1BQU87QUFBQSxNQUN4QjtBQUVELDJCQUFzQjtBQUFBLElBQ3ZCO0FBRUQsYUFBUyxZQUFhO0FBQ3BCLFVBQUksT0FBTyxVQUFVLE1BQU07QUFDekI7QUFBQSxNQUNEO0FBRUQsa0JBQVksUUFBUTtBQUVwQixVQUFJLEtBQUssVUFBVSxNQUFNO0FBQ3ZCLGFBQUssUUFBUTtBQUFBLE1BQ2Q7QUFFRCxVQUFJLE1BQU0sUUFBUSxVQUFVLE9BQU87QUFDakMsWUFBSSxhQUFhLE1BQU07QUFDckIsdUJBQWEsUUFBUTtBQUNyQixxQkFBVztBQUFBLFFBQ1o7QUFFRCxZQUFJLE1BQU0sYUFBYSxVQUFVLE1BQU07QUFDckMsZUFBSyxhQUFhO0FBQ2xCLGdCQUFNLGFBQWEsUUFBUTtBQUMzQixnQ0FBc0IsUUFBUTtBQUFBLFFBQy9CO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFRCxhQUFTLFVBQVcsR0FBRztBQUNyQixVQUFJLE1BQU0sU0FBUyxVQUFVLE1BQU07QUFDakM7QUFBQSxNQUNEO0FBRUQsVUFBSSxjQUFjLE1BQU07QUFDdEIsY0FBTSxpQkFBaUIsQ0FBQztBQUN4QixlQUFPLFFBQVE7QUFDZixpQkFBUyxNQUFNO0FBQ2IsZ0JBQU0sTUFBTztBQUFBLFFBQ3ZCLENBQVM7QUFBQSxNQUNGLE9BQ0k7QUFDSCxjQUFNLE1BQU87QUFBQSxNQUNkO0FBRUQsVUFBSSxNQUFNLGFBQWEsUUFBUTtBQUM3QixlQUFPLFdBQVcsS0FBSztBQUFBLE1BQ3hCLFdBQ1EsVUFBVSxVQUFVLFFBQVEsTUFBTyxpQkFBa0IsUUFBUTtBQUNwRSxhQUFLLFFBQVE7QUFBQSxNQUNkO0FBQUEsSUFDRjtBQUVELGFBQVMsWUFBYTtBQUNwQixhQUFPLFFBQVE7QUFDZixnQkFBVztBQUFBLElBQ1o7QUFFRCxhQUFTLGtCQUFtQjtBQUMxQixZQUFNLGFBQWEsUUFBUTtBQUFBLFFBQ3pCLE1BQU0sYUFBYSxRQUFRLE1BQU0sY0FBYyxRQUFRLFdBQVcsTUFBTSxXQUFXLElBQy9FLGVBQWUsTUFBTSxXQUFXLE1BQU8sRUFBRyxLQUFLLEtBQy9DO0FBQUEsUUFDSjtBQUFBLFFBQ0E7QUFBQSxNQUNEO0FBQUEsSUFDRjtBQUVELGFBQVMsV0FBWSxNQUFNO0FBQ3pCLFVBQUlBLGVBQWM7QUFFbEIsVUFBSSxTQUFTLE1BQU07QUFDakIsWUFBSSxXQUFXLE1BQU0sV0FBVyxHQUFHO0FBQ2pDLGdCQUFNLE1BQU0sZUFBZSxNQUFNLFdBQVcsTUFBTyxFQUFHO0FBQ3RELFVBQUFBLGVBQWMsTUFBTSxRQUFRLFVBQVUsT0FBSyxZQUFZLGVBQWUsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQUEsUUFDckY7QUFFRCxnQ0FBd0JBLFlBQVc7QUFBQSxNQUNwQztBQUVELHFCQUFlQSxZQUFXO0FBQUEsSUFDM0I7QUFFRCxhQUFTLGFBQWMsV0FBVyxXQUFXO0FBQzNDLFVBQUksS0FBSyxVQUFVLFFBQVEsTUFBTSxhQUFhLFVBQVUsT0FBTztBQUM3RCxnQ0FBd0IsSUFBSSxJQUFJO0FBRWhDLGlCQUFTLE1BQU07QUFDYixjQUFJLEtBQUssVUFBVSxRQUFRLE1BQU0sYUFBYSxVQUFVLE9BQU87QUFDN0QsZ0JBQUksWUFBWSxXQUFXO0FBQ3pCLHNDQUF5QjtBQUFBLFlBQzFCLE9BQ0k7QUFDSCx5QkFBVyxJQUFJO0FBQUEsWUFDaEI7QUFBQSxVQUNGO0FBQUEsUUFDWCxDQUFTO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFRCxhQUFTLHFCQUFzQjtBQUM3QixVQUFJLE9BQU8sVUFBVSxTQUFTLFFBQVEsVUFBVSxNQUFNO0FBQ3BELGdCQUFRLE1BQU0sZUFBZ0I7QUFBQSxNQUMvQjtBQUFBLElBQ0Y7QUFFRCxhQUFTLG1CQUFvQixHQUFHO0FBQzlCLFlBQU0sVUFBVSxLQUFLLENBQUM7QUFDdEIsV0FBSyxhQUFhLENBQUM7QUFDbkIsWUFBTSxlQUFlO0FBQ3JCLFlBQU0saUJBQWlCLENBQUM7QUFBQSxJQUN6QjtBQUVELGFBQVMsbUJBQW9CLEdBQUc7QUFDOUIsWUFBTSxVQUFVLEtBQUssQ0FBQztBQUN0QixXQUFLLGFBQWEsQ0FBQztBQUNuQixZQUFNLGVBQWU7QUFDckIsWUFBTSxrQkFBa0IsQ0FBQztBQUFBLElBQzFCO0FBRUQsYUFBUyxpQkFBa0I7QUFDekIsa0JBQVksR0FBRyxTQUFTLEdBQUcsV0FBVyxRQUFRLE1BQU0sYUFBYSxXQUM3RCxRQUNBLE1BQU0sYUFBYSxXQUNuQixNQUFNLGFBQWEsT0FDZixNQUFPLGlCQUFrQixVQUFVLE1BQU0sYUFBYSxVQUFVLFVBQVUsVUFBVSxRQUNwRjtBQUdSLCtCQUF5QixHQUFHLFNBQVMsR0FBRyxRQUFRLFFBQVEsY0FBYyxRQUFRLE1BQU0sYUFBYSxPQUM3RixTQUNBLE1BQU07QUFBQSxJQUNYO0FBRUQsbUJBQWUsY0FBYztBQUM3QixjQUFVLGtCQUFrQjtBQUU1QixtQkFBZ0I7QUFFaEIsb0JBQWdCLE1BQU07QUFDcEIsc0JBQWdCLFFBQVEsYUFBYSxXQUFXO0FBQ2hELDBCQUFvQixRQUFRLGFBQWEsZUFBZTtBQUFBLElBQzlELENBQUs7QUFHRCxXQUFPLE9BQU8sT0FBTztBQUFBLE1BQ25CO0FBQUEsTUFBVztBQUFBLE1BQ1g7QUFBQSxNQUFlO0FBQUEsTUFBSztBQUFBLE1BQ3BCLGdCQUFnQixNQUFNLFlBQVk7QUFBQSxNQUNsQztBQUFBLE1BQWdCO0FBQUEsTUFDaEI7QUFBQSxNQUFRO0FBQUEsTUFBb0I7QUFBQSxNQUM1QjtBQUFBLE1BQ0E7QUFBQSxNQUNBLGtCQUFrQixJQUFJLFNBQVMsaUJBQWlCLE1BQU0sTUFBTSxNQUFNLElBQUksTUFBTTtBQUFBLE1BQzVFLGdCQUFnQixJQUFJLFNBQVMsZUFBZSxNQUFNLE1BQU0sTUFBTSxJQUFJO0FBQUEsTUFDbEUsZ0JBQWdCLElBQUksU0FBUyxlQUFlLE1BQU0sTUFBTSxNQUFNLElBQUk7QUFBQSxJQUN4RSxDQUFLO0FBRUQsV0FBTyxPQUFPLE9BQU87QUFBQSxNQUNuQjtBQUFBLE1BRUEsWUFBWTtBQUFBLFFBQVMsTUFDbkIsK0NBQWdELE1BQU0sYUFBYSxPQUFPLFFBQVEsMEJBQzdELE1BQU0sYUFBYSxPQUFPLFFBQVEsc0JBQ3RDLE1BQU0sYUFBYSxPQUFPLGFBQWE7QUFBQSxNQUN6RDtBQUFBLE1BRUQ7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUVBLGVBQWU7QUFBQSxRQUFTLE1BQ3JCLE1BQU0saUJBQWlCLFFBQVEsU0FBUyxVQUFVLFFBQ2hELE9BQU8sV0FBVyxVQUFVLFlBQzVCLFdBQVcsTUFBTSxXQUFXLEtBQzVCLG1CQUFtQixNQUFNLFlBQVk7QUFBQSxNQUN6QztBQUFBLE1BRUQsaUJBQWlCLE1BQU07QUFDckIsWUFDRSxNQUFNLFNBQVMsVUFBVSxVQUN2QixPQUFPLFVBQVUsUUFDZCxVQUFVLFVBQVUsUUFDcEIsTUFBTyxpQkFBa0IsU0FFOUI7QUFDQSxpQkFBTyxjQUFjLE9BQU8sVUFBUyxJQUFLLFFBQVM7QUFBQSxRQUNwRCxXQUNRLE1BQU0saUJBQWlCLE1BQU07QUFFcEMsZ0JBQU0sZUFBZTtBQUFBLFFBQ3RCO0FBQUEsTUFDRjtBQUFBLE1BRUQsZUFBZTtBQUFBLFFBQ2IsVUFBVyxHQUFHO0FBQUUsZ0JBQU0saUJBQWlCLENBQUM7QUFBQSxRQUFHO0FBQUEsUUFDM0MsV0FBWSxHQUFHO0FBQ2IsZ0JBQU0sa0JBQWtCLEdBQUcsTUFBTTtBQUMvQiw0QkFBaUI7QUFDakIsc0JBQVc7QUFBQSxVQUN2QixDQUFXO0FBQUEsUUFDRjtBQUFBLFFBQ0QsUUFBUyxHQUFHO0FBRVYsa0JBQVEsQ0FBQztBQUVULGNBQUksY0FBYyxRQUFRLEtBQUssVUFBVSxNQUFNO0FBQzdDLHNCQUFXO0FBQ1gsc0JBQVUsVUFBVSxRQUFRLFVBQVUsTUFBTSxNQUFPO0FBQ25EO0FBQUEsVUFDRDtBQUVELG9CQUFVLENBQUM7QUFBQSxRQUNaO0FBQUEsTUFDRjtBQUFBLE1BRUQsWUFBWSxnQkFBYztBQUN4QixjQUFNLFFBQVEsYUFBYztBQUM1QixjQUFNLFdBQVcsZUFBZSxRQUFRLE9BQU8sVUFBVSxRQUFRLGNBQWM7QUFFL0UsWUFBSSxNQUFNLGFBQWEsTUFBTTtBQUMzQixnQkFBTSxLQUFLLFNBQVMsWUFBWSxRQUFRLENBQUM7QUFBQSxRQUMxQyxXQUVRLE1BQU0sU0FBUyxVQUFVLE1BQU07QUFDdEMsZ0JBQU1DLFNBQVEsYUFBYSxPQUFPLGNBQWMsUUFBUTtBQUV4RCxnQkFBTTtBQUFBLFlBQ0osRUFBRSxTQUFTO0FBQUEsY0FDVCxLQUFLLGFBQWEsT0FBTyxZQUFZO0FBQUEsY0FDckMsS0FBSztBQUFBLGNBQ0wsT0FBTztBQUFBLGNBQ1AsSUFBSSxhQUFhLE9BQU8sTUFBTSxVQUFVLFFBQVE7QUFBQSxjQUNoRCxPQUFPLGlCQUFpQjtBQUFBLGNBQ3hCLFVBQVU7QUFBQSxjQUNWLGtCQUFrQixlQUFlLFFBQVEsTUFBTSxjQUFjLFFBQVE7QUFBQSxjQUNyRSxHQUFHQTtBQUFBLGNBQ0gsV0FBVztBQUFBLGNBQ1gsU0FBUztBQUFBLGNBQ1QsWUFBWTtBQUFBLFlBQzFCLENBQWE7QUFBQSxVQUNGO0FBRUQsY0FBSSxhQUFhLFFBQVEsT0FBTyxNQUFNLGlCQUFpQixZQUFZLE1BQU0sYUFBYSxXQUFXLEdBQUc7QUFDbEcsa0JBQU07QUFBQSxjQUNKLEVBQUUsU0FBUztBQUFBLGdCQUNULE9BQU87QUFBQSxnQkFDUCxjQUFjLE1BQU07QUFBQSxnQkFDcEIsVUFBVTtBQUFBLGdCQUNWLFNBQVM7QUFBQSxjQUN6QixDQUFlO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBRUQsWUFBSSxTQUFTLFVBQVUsVUFBVSxNQUFNLFlBQVksUUFBUSxrQkFBa0IsTUFBTSxXQUFXLEdBQUc7QUFDL0YsZ0JBQU0sT0FBTyxrQkFBa0IsTUFBTSxJQUFJLFdBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxVQUFVLEtBQU0sQ0FBQSxDQUFDO0FBRXhGLGdCQUFNO0FBQUEsWUFDSixFQUFFLFVBQVU7QUFBQSxjQUNWLE9BQU87QUFBQSxjQUNQLE1BQU0sU0FBUztBQUFBLGNBQ2YsVUFBVSxNQUFNO0FBQUEsWUFDakIsR0FBRSxJQUFJO0FBQUEsVUFDUjtBQUFBLFFBQ0Y7QUFFRCxjQUFNLFFBQVEsTUFBTSxhQUFhLFFBQVEsYUFBYSxPQUFPLFNBQVMsTUFBTSxXQUFXLFdBQVc7QUFFbEcsZUFBTyxFQUFFLE9BQU87QUFBQSxVQUNkLE9BQU87QUFBQSxVQUNQLEdBQUc7QUFBQSxVQUNILEdBQUcsTUFBTSxXQUFXLFVBQVU7QUFBQSxRQUMvQixHQUFFLEtBQUs7QUFBQSxNQUNUO0FBQUEsTUFFRCxnQkFBZ0IsTUFDZCxNQUFNLFlBQVksUUFBUSxzQkFBc0IsVUFBVSxRQUFRLE1BQU0scUJBQXFCLE9BQ3pGO0FBQUEsUUFDRSxFQUFFLE9BQU87QUFBQSxVQUNQLE9BQU8sNkJBQTZCLEtBQUssVUFBVSxPQUFPLGdCQUFnQjtBQUFBLFVBQzFFLE1BQU0sa0JBQWtCO0FBQUEsUUFDeEMsQ0FBZTtBQUFBLE1BQ0YsSUFDRDtBQUFBLElBRVosQ0FBSztBQUVELFdBQU8sU0FBUyxLQUFLO0FBQUEsRUFDdEI7QUFDSCxDQUFDOzsifQ==
