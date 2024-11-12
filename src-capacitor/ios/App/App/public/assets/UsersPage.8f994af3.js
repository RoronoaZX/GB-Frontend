import { e as createComponent, n as ref, g as computed, h, L as QIcon, af as withDirectives, aP as Ripple, k as getCurrentInstance, i as inject, f as emptyRenderFn, bn as stepperKey, bk as KeepAlive, j as hSlot, a9 as useDarkProps, ab as useDark, m as provide, x as hMergeSlot, ag as hDir, _ as _export_sfc, t as reactive, z as onMounted, o as openBlock, c as createBlock, w as withCtx, a as createVNode, I as QCardSection, J as createBaseVNode, bo as normalizeStyle, a1 as QAvatar, a4 as createElementBlock, be as createCommentVNode, K as QInput, Q as QCard, S as pushScopeId, T as popScopeId, O as createTextVNode, a5 as Fragment, a6 as renderList, R as toDisplayString, M as QBtn, a3 as QDialog, H as useRouter, a2 as QSeparator, aK as QCardActions, bc as withKeys, N as Notify } from "./index.c8e2405b.js";
import { Q as QSlideTransition } from "./QSlideTransition.b87a2809.js";
import { u as usePanelChildProps, d as useRenderCache, a as usePanelProps, b as usePanelEmits, c as usePanel } from "./use-panel.e42dc1d1.js";
import { C as ClosePopup } from "./ClosePopup.649d85d8.js";
import { Q as QItem, a as QItemSection } from "./QItem.76557ad9.js";
import { Q as QList } from "./QList.d5d13fac.js";
import "./branch.9a956ff2.js";
import { u as useEmployeeStore } from "./employee.08e2bc37.js";
import { a as QChip } from "./QSelect.0985e28e.js";
import { u as useUsersStore } from "./user.9d28a441.js";
import { Q as QPopupEdit } from "./QPopupEdit.5c11c937.js";
import { Q as QPage } from "./QPage.e43c6521.js";
import { q as quasarDate } from "./date.cdd6bcba.js";
import { u as useQuasar } from "./use-quasar.84d8ad03.js";
import "./QPopupProxy.210a8994.js";
import "./QTd.f597934c.js";
import "./QTable.d3fb87f5.js";
import "./touch.9135741d.js";
import "./selection.94057980.js";
import "./warehouse.f8473ccb.js";
import "./axios.aa1bce92.js";
import "./rtl.b1b38f21.js";
import "./QMenu.4f670399.js";
import "./use-virtual-scroll.5b4ab88d.js";
import "./QVirtualScroll.41a98cb7.js";
var StepHeader = createComponent({
  name: "StepHeader",
  props: {
    stepper: {},
    step: {},
    goToPanel: Function
  },
  setup(props, { attrs }) {
    const { proxy: { $q } } = getCurrentInstance();
    const blurRef = ref(null);
    const isActive = computed(() => props.stepper.modelValue === props.step.name);
    const isDisable = computed(() => {
      const opt = props.step.disable;
      return opt === true || opt === "";
    });
    const isError = computed(() => {
      const opt = props.step.error;
      return opt === true || opt === "";
    });
    const isDone = computed(() => {
      const opt = props.step.done;
      return isDisable.value === false && (opt === true || opt === "");
    });
    const headerNav = computed(() => {
      const opt = props.step.headerNav, nav = opt === true || opt === "" || opt === void 0;
      return isDisable.value === false && props.stepper.headerNav && nav;
    });
    const hasPrefix = computed(() => {
      return props.step.prefix && (isActive.value === false || props.stepper.activeIcon === "none") && (isError.value === false || props.stepper.errorIcon === "none") && (isDone.value === false || props.stepper.doneIcon === "none");
    });
    const icon = computed(() => {
      const defaultIcon = props.step.icon || props.stepper.inactiveIcon;
      if (isActive.value === true) {
        const icon2 = props.step.activeIcon || props.stepper.activeIcon;
        return icon2 === "none" ? defaultIcon : icon2 || $q.iconSet.stepper.active;
      }
      if (isError.value === true) {
        const icon2 = props.step.errorIcon || props.stepper.errorIcon;
        return icon2 === "none" ? defaultIcon : icon2 || $q.iconSet.stepper.error;
      }
      if (isDisable.value === false && isDone.value === true) {
        const icon2 = props.step.doneIcon || props.stepper.doneIcon;
        return icon2 === "none" ? defaultIcon : icon2 || $q.iconSet.stepper.done;
      }
      return defaultIcon;
    });
    const color = computed(() => {
      const errorColor = isError.value === true ? props.step.errorColor || props.stepper.errorColor : void 0;
      if (isActive.value === true) {
        const color2 = props.step.activeColor || props.stepper.activeColor || props.step.color;
        return color2 !== void 0 ? color2 : errorColor;
      }
      if (errorColor !== void 0) {
        return errorColor;
      }
      if (isDisable.value === false && isDone.value === true) {
        return props.step.doneColor || props.stepper.doneColor || props.step.color || props.stepper.inactiveColor;
      }
      return props.step.color || props.stepper.inactiveColor;
    });
    const classes = computed(() => {
      return "q-stepper__tab col-grow flex items-center no-wrap relative-position" + (color.value !== void 0 ? ` text-${color.value}` : "") + (isError.value === true ? " q-stepper__tab--error q-stepper__tab--error-with-" + (hasPrefix.value === true ? "prefix" : "icon") : "") + (isActive.value === true ? " q-stepper__tab--active" : "") + (isDone.value === true ? " q-stepper__tab--done" : "") + (headerNav.value === true ? " q-stepper__tab--navigation q-focusable q-hoverable" : "") + (isDisable.value === true ? " q-stepper__tab--disabled" : "");
    });
    const ripple = computed(() => props.stepper.headerNav !== true ? false : headerNav.value);
    function onActivate() {
      blurRef.value !== null && blurRef.value.focus();
      isActive.value === false && props.goToPanel(props.step.name);
    }
    function onKeyup(e) {
      if (e.keyCode === 13 && isActive.value === false) {
        props.goToPanel(props.step.name);
      }
    }
    return () => {
      const data = { class: classes.value };
      if (headerNav.value === true) {
        data.onClick = onActivate;
        data.onKeyup = onKeyup;
        Object.assign(
          data,
          isDisable.value === true ? { tabindex: -1, "aria-disabled": "true" } : { tabindex: attrs.tabindex || 0 }
        );
      }
      const child = [
        h("div", { class: "q-focus-helper", tabindex: -1, ref: blurRef }),
        h("div", { class: "q-stepper__dot row flex-center q-stepper__line relative-position" }, [
          h("span", { class: "row flex-center" }, [
            hasPrefix.value === true ? props.step.prefix : h(QIcon, { name: icon.value })
          ])
        ])
      ];
      if (props.step.title !== void 0 && props.step.title !== null) {
        const content = [
          h("div", { class: "q-stepper__title" }, props.step.title)
        ];
        if (props.step.caption !== void 0 && props.step.caption !== null) {
          content.push(
            h("div", { class: "q-stepper__caption" }, props.step.caption)
          );
        }
        child.push(
          h("div", {
            class: "q-stepper__label q-stepper__line relative-position"
          }, content)
        );
      }
      return withDirectives(
        h("div", data, child),
        [[Ripple, ripple.value]]
      );
    };
  }
});
function getStepWrapper(slots) {
  return h("div", {
    class: "q-stepper__step-content"
  }, [
    h("div", {
      class: "q-stepper__step-inner"
    }, hSlot(slots.default))
  ]);
}
const PanelWrapper = {
  setup(_, { slots }) {
    return () => getStepWrapper(slots);
  }
};
var QStep = createComponent({
  name: "QStep",
  props: {
    ...usePanelChildProps,
    icon: String,
    color: String,
    title: {
      type: String,
      required: true
    },
    caption: String,
    prefix: [String, Number],
    doneIcon: String,
    doneColor: String,
    activeIcon: String,
    activeColor: String,
    errorIcon: String,
    errorColor: String,
    headerNav: {
      type: Boolean,
      default: true
    },
    done: Boolean,
    error: Boolean,
    onScroll: [Function, Array]
  },
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $stepper = inject(stepperKey, emptyRenderFn);
    if ($stepper === emptyRenderFn) {
      console.error("QStep needs to be a child of QStepper");
      return emptyRenderFn;
    }
    const { getCache } = useRenderCache();
    const rootRef = ref(null);
    const isActive = computed(() => $stepper.value.modelValue === props.name);
    const scrollEvent = computed(() => $q.platform.is.ios !== true && $q.platform.is.chrome === true || isActive.value !== true || $stepper.value.vertical !== true ? {} : {
      onScroll(e) {
        const { target } = e;
        if (target.scrollTop > 0) {
          target.scrollTop = 0;
        }
        props.onScroll !== void 0 && emit("scroll", e);
      }
    });
    const contentKey = computed(() => typeof props.name === "string" || typeof props.name === "number" ? props.name : String(props.name));
    function getStepContent() {
      const vertical = $stepper.value.vertical;
      if (vertical === true && $stepper.value.keepAlive === true) {
        return h(
          KeepAlive,
          $stepper.value.keepAliveProps.value,
          isActive.value === true ? [
            h(
              $stepper.value.needsUniqueKeepAliveWrapper.value === true ? getCache(contentKey.value, () => ({ ...PanelWrapper, name: contentKey.value })) : PanelWrapper,
              { key: contentKey.value },
              slots.default
            )
          ] : void 0
        );
      }
      return vertical !== true || isActive.value === true ? getStepWrapper(slots) : void 0;
    }
    return () => h(
      "div",
      { ref: rootRef, class: "q-stepper__step", role: "tabpanel", ...scrollEvent.value },
      $stepper.value.vertical === true ? [
        h(StepHeader, {
          stepper: $stepper.value,
          step: props,
          goToPanel: $stepper.value.goToPanel
        }),
        $stepper.value.animated === true ? h(QSlideTransition, getStepContent) : getStepContent()
      ] : [getStepContent()]
    );
  }
});
var QStepperNavigation = createComponent({
  name: "QStepperNavigation",
  setup(_, { slots }) {
    return () => h("div", { class: "q-stepper__nav" }, hSlot(slots.default));
  }
});
const camelRE = /(-\w)/g;
function camelizeProps(props) {
  const acc = {};
  for (const key in props) {
    const newKey = key.replace(camelRE, (m) => m[1].toUpperCase());
    acc[newKey] = props[key];
  }
  return acc;
}
var QStepper = createComponent({
  name: "QStepper",
  props: {
    ...useDarkProps,
    ...usePanelProps,
    flat: Boolean,
    bordered: Boolean,
    alternativeLabels: Boolean,
    headerNav: Boolean,
    contracted: Boolean,
    headerClass: String,
    inactiveColor: String,
    inactiveIcon: String,
    doneIcon: String,
    doneColor: String,
    activeIcon: String,
    activeColor: String,
    errorIcon: String,
    errorColor: String
  },
  emits: usePanelEmits,
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const {
      updatePanelsList,
      isValidPanelName,
      updatePanelIndex,
      getPanelContent,
      getPanels,
      panelDirectives,
      goToPanel,
      keepAliveProps,
      needsUniqueKeepAliveWrapper
    } = usePanel();
    provide(stepperKey, computed(() => ({
      goToPanel,
      keepAliveProps,
      needsUniqueKeepAliveWrapper,
      ...props
    })));
    const classes = computed(
      () => `q-stepper q-stepper--${props.vertical === true ? "vertical" : "horizontal"}` + (props.flat === true ? " q-stepper--flat" : "") + (props.bordered === true ? " q-stepper--bordered" : "") + (isDark.value === true ? " q-stepper--dark q-dark" : "")
    );
    const headerClasses = computed(
      () => `q-stepper__header row items-stretch justify-between q-stepper__header--${props.alternativeLabels === true ? "alternative" : "standard"}-labels` + (props.flat === false || props.bordered === true ? " q-stepper__header--border" : "") + (props.contracted === true ? " q-stepper__header--contracted" : "") + (props.headerClass !== void 0 ? ` ${props.headerClass}` : "")
    );
    function getContent() {
      const top = hSlot(slots.message, []);
      if (props.vertical === true) {
        isValidPanelName(props.modelValue) && updatePanelIndex();
        const content = h("div", {
          class: "q-stepper__content"
        }, hSlot(slots.default));
        return top === void 0 ? [content] : top.concat(content);
      }
      return [
        h(
          "div",
          { class: headerClasses.value },
          getPanels().map((panel) => {
            const step = camelizeProps(panel.props);
            return h(StepHeader, {
              key: step.name,
              stepper: props,
              step,
              goToPanel
            });
          })
        ),
        top,
        hDir(
          "div",
          { class: "q-stepper__content q-panel-parent" },
          getPanelContent(),
          "cont",
          props.swipeable,
          () => panelDirectives.value
        )
      ];
    }
    return () => {
      updatePanelsList(slots);
      return h("div", {
        class: classes.value
      }, hMergeSlot(slots.navigation, getContent()));
    };
  }
});
var UserStep1_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-94f93548"), n = n(), popScopeId(), n);
const _hoisted_1$5 = {
  class: "text-h6",
  align: "center"
};
const _hoisted_2$3 = { for: "fileInput" };
const _hoisted_3$3 = ["src"];
const _hoisted_4$3 = {
  key: 0,
  class: "overlay"
};
const _hoisted_5$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Profile", -1));
const _hoisted_6$2 = { class: "q-gutter-y-sm" };
const altText = "Profile Picture";
const _sfc_main$5 = {
  __name: "UserStep1",
  props: ["userData"],
  emits: ["updateData"],
  setup(__props) {
    ref("");
    const isPwd = ref(true);
    const isPwdConfirm = ref(true);
    const size = ref(150);
    const hovered = ref(false);
    const imageUrl = ref("https://cdn.quasar.dev/img/boy-avatar.png");
    const { userData } = __props;
    const signUpForm = reactive({
      email: "",
      password: "",
      confirmPass: ""
    });
    onMounted(() => {
      Object.assign(signUpForm, userData);
    });
    const handleImageError = () => {
      imageUrl.value = "https://cdn.quasar.dev/img/boy-avatar.png";
    };
    const editImage = () => {
      console.log("Edit image clicked");
    };
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          imageUrl.value = reader.result;
        };
        reader.readAsDataURL(file);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QCard, {
        flat: "",
        class: "q-pa-sm",
        style: { "width": "500px", "max-width": "80vw" }
      }, {
        default: withCtx(() => [
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1$5, [
                createBaseVNode("div", {
                  class: "profile-picture",
                  style: normalizeStyle({ width: size.value + "px", height: size.value + "px" })
                }, [
                  createBaseVNode("label", _hoisted_2$3, [
                    createVNode(QAvatar, {
                      size: "150px",
                      color: "grey-2"
                    }, {
                      default: withCtx(() => [
                        createBaseVNode("img", {
                          src: imageUrl.value,
                          alt: altText,
                          onError: handleImageError
                        }, null, 40, _hoisted_3$3)
                      ]),
                      _: 1
                    }),
                    createBaseVNode("input", {
                      type: "file",
                      outlined: "",
                      id: "fileInput",
                      accept: "image/*",
                      style: { "display": "none" },
                      onChange: handleFileChange
                    }, null, 32)
                  ]),
                  hovered.value ? (openBlock(), createElementBlock("div", _hoisted_4$3, [
                    createVNode(QIcon, {
                      name: "edit",
                      onClick: editImage,
                      class: "edit-icon"
                    })
                  ])) : createCommentVNode("", true)
                ], 4),
                _hoisted_5$2
              ])
            ]),
            _: 1
          }),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_6$2, [
                createBaseVNode("div", null, [
                  createVNode(QInput, {
                    "onUpdate:modelValue": [
                      _cache[0] || (_cache[0] = ($event) => _ctx.$emit("updateData", signUpForm)),
                      _cache[1] || (_cache[1] = ($event) => signUpForm.email = $event)
                    ],
                    modelValue: signUpForm.email,
                    outlined: "",
                    dense: "",
                    placeholder: "email",
                    "lazy-rules": "",
                    rules: [(val) => val && val.length > 0 || "Email required"],
                    type: "email",
                    suffix: "@gmail.com"
                  }, {
                    prepend: withCtx(() => [
                      createVNode(QIcon, { name: "mail" })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "rules"])
                ]),
                createBaseVNode("div", null, [
                  createVNode(QInput, {
                    modelValue: signUpForm.password,
                    "onUpdate:modelValue": [
                      _cache[3] || (_cache[3] = ($event) => signUpForm.password = $event),
                      _cache[4] || (_cache[4] = ($event) => _ctx.$emit("updateData", signUpForm))
                    ],
                    outlined: "",
                    dense: "",
                    placeholder: "Password",
                    type: isPwd.value ? "password" : "text",
                    "lazy-rules": "",
                    rules: [
                      (val) => val && val.length > 0 || "Password is required"
                    ]
                  }, {
                    prepend: withCtx(() => [
                      createVNode(QIcon, { name: "lock" })
                    ]),
                    append: withCtx(() => [
                      createVNode(QIcon, {
                        name: isPwd.value ? "visibility_off" : "visibility",
                        class: "cursor-pointer",
                        onClick: _cache[2] || (_cache[2] = ($event) => isPwd.value = !isPwd.value)
                      }, null, 8, ["name"])
                    ]),
                    _: 1
                  }, 8, ["modelValue", "type", "rules"])
                ]),
                createBaseVNode("div", null, [
                  createVNode(QInput, {
                    modelValue: signUpForm.confirmPass,
                    "onUpdate:modelValue": [
                      _cache[6] || (_cache[6] = ($event) => signUpForm.confirmPass = $event),
                      _cache[7] || (_cache[7] = ($event) => _ctx.$emit("updateData", signUpForm))
                    ],
                    outlined: "",
                    dense: "",
                    type: isPwdConfirm.value ? "password" : "text",
                    placeholder: "Confirm password",
                    "lazy-rules": "",
                    rules: [
                      () => signUpForm.password === signUpForm.confirmPass || `Passwords doesn't match`
                    ]
                  }, {
                    prepend: withCtx(() => [
                      createVNode(QIcon, { name: "lock" })
                    ]),
                    append: withCtx(() => [
                      createVNode(QIcon, {
                        name: isPwdConfirm.value ? "visibility_off" : "visibility",
                        class: "cursor-pointer",
                        onClick: _cache[5] || (_cache[5] = ($event) => isPwdConfirm.value = !isPwdConfirm.value)
                      }, null, 8, ["name"])
                    ]),
                    _: 1
                  }, 8, ["modelValue", "type", "rules"])
                ])
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
var UserStep1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-94f93548"], ["__file", "UserStep1.vue"]]);
const _hoisted_1$4 = { class: "q-my-md" };
const _hoisted_2$2 = {
  key: 0,
  class: "custom-list z-top"
};
const _hoisted_3$2 = { class: "q-gutter-y-sm" };
const _hoisted_4$2 = { class: "q-gutter-y-sm q-mx-auto" };
const _hoisted_5$1 = { class: "row q-gutter-x-sm item-start" };
const _hoisted_6$1 = { class: "row q-gutter-x-md" };
const _hoisted_7$1 = /* @__PURE__ */ createBaseVNode("div", null, "Designation", -1);
const _hoisted_8$1 = { class: "row q-gutter-x-md" };
const _sfc_main$4 = {
  __name: "UserStep2",
  props: {
    userData: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["updateData"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { userData } = __props;
    const employeeStore = useEmployeeStore();
    const searchKeyword = ref("");
    const employees = computed(() => employeeStore.employees);
    const search = async () => {
      if (searchKeyword.value.trim()) {
        await employeeStore.searchEmployeesWithDesignation(searchKeyword.value);
      }
    };
    const formatFullname = (row) => {
      const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
      const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
      const middlename = row.middlename ? capitalize(row.middlename).charAt(0) + "." : "";
      const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";
      return `${firstname} ${middlename} ${lastname}`;
    };
    const formaTimeShift = (timeShift) => {
      if (!timeShift)
        return "Not Applicable";
      const [hours, minutes] = timeShift.split(":");
      const date = new Date();
      date.setHours(hours, minutes);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    };
    const autoFillEmployee = (employee) => {
      var _a, _b, _c, _d;
      userPersonalInfoForm.employee_id = employee.id || "Not Available";
      userPersonalInfoForm.user_first_name = employee.firstname || "";
      userPersonalInfoForm.user_middle_name = employee.middlename || "";
      userPersonalInfoForm.user_last_name = employee.lastname || "";
      userPersonalInfoForm.user_address = employee.address || "No Address";
      userPersonalInfoForm.user_birthdate = employee.birthdate || "Not Provided";
      userPersonalInfoForm.user_sex = employee.sex || "Unknown";
      userPersonalInfoForm.user_phone_number = employee.phone || "No Phone";
      userPersonalInfoForm.user_position = employee.position || "Not Assigned";
      userPersonalInfoForm.user_branch_name = ((_b = (_a = employee.branch_employee) == null ? void 0 : _a.branch) == null ? void 0 : _b.name) || "Not Applicable";
      userPersonalInfoForm.user_time_shift = ((_c = employee.branch_employee) == null ? void 0 : _c.time_shift) ? formaTimeShift((_d = employee.branch_employee) == null ? void 0 : _d.time_shift) : "Not Applicable";
      searchKeyword.value = "";
      emit("updateData", userPersonalInfoForm);
    };
    const userPersonalInfoForm = reactive({
      employee_id: "",
      user_first_name: "",
      user_middle_name: "",
      user_last_name: "",
      user_address: "",
      user_birthdate: "",
      user_sex: "",
      user_phone_number: "",
      user_position: "",
      user_branch_name: "",
      user_time_shift: ""
    });
    console.log("userPersonalInfoForm:", userPersonalInfoForm);
    onMounted(() => {
      Object.assign(userPersonalInfoForm, userData);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QCard, {
        flat: "",
        style: { "width": "500px", "max-width": "80vw" }
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$4, [
            createVNode(QInput, {
              dense: "",
              rounded: "",
              outlined: "",
              placeholder: "Search employee",
              modelValue: searchKeyword.value,
              "onUpdate:modelValue": [
                _cache[0] || (_cache[0] = ($event) => searchKeyword.value = $event),
                search
              ],
              debounce: "500"
            }, {
              append: withCtx(() => [
                createVNode(QIcon, { name: "search" })
              ]),
              default: withCtx(() => [
                searchKeyword.value ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
                  createVNode(QCard, null, {
                    default: withCtx(() => [
                      createVNode(QList, { separator: "" }, {
                        default: withCtx(() => {
                          var _a;
                          return [
                            !((_a = employees.value) == null ? void 0 : _a.length) ? (openBlock(), createBlock(QItem, { key: 0 }, {
                              default: withCtx(() => [
                                createTextVNode(" No Employee Record ")
                              ]),
                              _: 1
                            })) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(employees.value, (employee) => {
                              return openBlock(), createBlock(QItem, {
                                onClick: ($event) => autoFillEmployee(employee),
                                key: employee.id,
                                clickable: ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(QItemSection, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(formatFullname(employee)), 1)
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
            }, 8, ["modelValue"])
          ]),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_3$2, [
                createBaseVNode("div", _hoisted_4$2, [
                  createVNode(QInput, {
                    class: "text-capitalize",
                    modelValue: userPersonalInfoForm.user_first_name,
                    "onUpdate:modelValue": [
                      _cache[1] || (_cache[1] = ($event) => userPersonalInfoForm.user_first_name = $event),
                      _cache[2] || (_cache[2] = ($event) => _ctx.$emit("updateData", userPersonalInfoForm))
                    ],
                    outlined: "",
                    dense: "",
                    readonly: "",
                    label: "First Name",
                    rules: [(val) => val && val.length > 0 || "Required"]
                  }, null, 8, ["modelValue", "rules"]),
                  createVNode(QInput, {
                    class: "text-capitalize",
                    modelValue: userPersonalInfoForm.user_middle_name,
                    "onUpdate:modelValue": [
                      _cache[3] || (_cache[3] = ($event) => userPersonalInfoForm.user_middle_name = $event),
                      _cache[4] || (_cache[4] = ($event) => _ctx.$emit("updateData", userPersonalInfoForm))
                    ],
                    outlined: "",
                    readonly: "",
                    dense: "",
                    label: "Middle Name",
                    rules: [(val) => val && val.length > 0 || "Required"]
                  }, null, 8, ["modelValue", "rules"]),
                  createVNode(QInput, {
                    class: "text-capitalize",
                    modelValue: userPersonalInfoForm.user_last_name,
                    "onUpdate:modelValue": [
                      _cache[5] || (_cache[5] = ($event) => userPersonalInfoForm.user_last_name = $event),
                      _cache[6] || (_cache[6] = ($event) => _ctx.$emit("updateData", userPersonalInfoForm))
                    ],
                    outlined: "",
                    dense: "",
                    readonly: "",
                    label: "Last Name",
                    rules: [(val) => val && val.length > 0 || "Required"]
                  }, null, 8, ["modelValue", "rules"]),
                  createVNode(QInput, {
                    class: "text-capitalize",
                    modelValue: userPersonalInfoForm.user_address,
                    "onUpdate:modelValue": [
                      _cache[7] || (_cache[7] = ($event) => userPersonalInfoForm.user_address = $event),
                      _cache[8] || (_cache[8] = ($event) => _ctx.$emit("updateData", userPersonalInfoForm))
                    ],
                    outlined: "",
                    dense: "",
                    readonly: "",
                    label: "Address",
                    rules: [(val) => val && val.length > 0 || "Required"]
                  }, null, 8, ["modelValue", "rules"])
                ]),
                createBaseVNode("div", _hoisted_5$1, [
                  createBaseVNode("div", null, [
                    createVNode(QInput, {
                      modelValue: userPersonalInfoForm.user_birthdate,
                      "onUpdate:modelValue": [
                        _cache[9] || (_cache[9] = ($event) => userPersonalInfoForm.user_birthdate = $event),
                        _cache[10] || (_cache[10] = ($event) => _ctx.$emit("updateData", userPersonalInfoForm))
                      ],
                      outlined: "",
                      dense: "",
                      readonly: "",
                      label: "Birthdate",
                      type: "date",
                      style: { "width": "230px" },
                      rules: [(val) => val && val.length > 0 || "Required"]
                    }, null, 8, ["modelValue", "rules"])
                  ]),
                  createBaseVNode("div", null, [
                    createVNode(QInput, {
                      modelValue: userPersonalInfoForm.user_sex,
                      "onUpdate:modelValue": [
                        _cache[11] || (_cache[11] = ($event) => userPersonalInfoForm.user_sex = $event),
                        _cache[12] || (_cache[12] = ($event) => _ctx.$emit("updateData", userPersonalInfoForm))
                      ],
                      dense: "",
                      outlined: "",
                      readonly: "",
                      label: "Sex",
                      options: _ctx.genderOptions,
                      rules: [(val) => val && val.length > 0 || "Required"],
                      style: { "width": "120px" },
                      behavior: "menu",
                      "hide-dropdown-icon": ""
                    }, null, 8, ["modelValue", "options", "rules"])
                  ])
                ]),
                createBaseVNode("div", _hoisted_6$1, [
                  createBaseVNode("div", null, [
                    createVNode(QInput, {
                      modelValue: userPersonalInfoForm.user_phone_number,
                      "onUpdate:modelValue": [
                        _cache[13] || (_cache[13] = ($event) => userPersonalInfoForm.user_phone_number = $event),
                        _cache[14] || (_cache[14] = ($event) => _ctx.$emit("updateData", userPersonalInfoForm))
                      ],
                      outlined: "",
                      dense: "",
                      readonly: "",
                      label: "Phone Number",
                      mask: "+(63) ### - ### - ####",
                      placeholder: "(+63) ### - ### - ####",
                      rules: [(val) => val && val.length > 0 || "Required"],
                      style: { "width": "300px", "max-width": "500px", "min-width": "100px" }
                    }, null, 8, ["modelValue", "rules"])
                  ]),
                  createBaseVNode("div", null, [
                    createVNode(QInput, {
                      modelValue: userPersonalInfoForm.user_position,
                      "onUpdate:modelValue": [
                        _cache[15] || (_cache[15] = ($event) => userPersonalInfoForm.user_position = $event),
                        _cache[16] || (_cache[16] = ($event) => _ctx.$emit("updateData", userPersonalInfoForm))
                      ],
                      outlined: "",
                      dense: "",
                      readonly: "",
                      "hide-dropdown-icon": "",
                      label: "Position",
                      options: _ctx.positionOptions,
                      rules: [(val) => val && val.length > 0 || "Required"],
                      style: { "width": "150px", "max-width": "500px", "min-width": "100px" }
                    }, null, 8, ["modelValue", "options", "rules"])
                  ])
                ]),
                _hoisted_7$1,
                createBaseVNode("div", _hoisted_8$1, [
                  createBaseVNode("div", null, [
                    createVNode(QInput, {
                      modelValue: userPersonalInfoForm.user_branch_name,
                      "onUpdate:modelValue": [
                        _cache[17] || (_cache[17] = ($event) => userPersonalInfoForm.user_branch_name = $event),
                        _cache[18] || (_cache[18] = ($event) => _ctx.$emit("updateData", userPersonalInfoForm))
                      ],
                      outlined: "",
                      flat: "",
                      readonly: "",
                      dense: "",
                      "use-input": "",
                      clearable: "",
                      "input-debounce": "0",
                      options: _ctx.filterBranchOptions,
                      label: "Branch",
                      onFilter: _ctx.filteredBranches,
                      style: { "width": "250px", "max-width": "500px", "min-width": "100px" },
                      "hide-dropdown-icon": "",
                      behavior: "menu"
                    }, null, 8, ["modelValue", "options", "onFilter"])
                  ]),
                  createBaseVNode("div", null, [
                    createVNode(QInput, {
                      outlined: "",
                      modelValue: userPersonalInfoForm.user_time_shift,
                      "onUpdate:modelValue": [
                        _cache[19] || (_cache[19] = ($event) => userPersonalInfoForm.user_time_shift = $event),
                        _cache[20] || (_cache[20] = ($event) => _ctx.$emit("updateData", userPersonalInfoForm))
                      ],
                      flat: "",
                      dense: "",
                      readonly: "",
                      mask: "##:## AA",
                      label: "Time Schedule",
                      rules: _ctx.valididateTime,
                      hint: "Format: 01:00 AM/PM",
                      style: { "width": "200px", "max-width": "500px", "min-width": "100px" },
                      "hide-dropdown-icon": ""
                    }, null, 8, ["modelValue", "rules"])
                  ])
                ])
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
var UserStep2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "UserStep2.vue"]]);
const _hoisted_1$3 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "User Profile", -1);
const _hoisted_2$1 = { class: "col-6" };
const _hoisted_3$1 = { class: "col-6" };
const _hoisted_4$1 = { class: "q-pa-sm" };
const _sfc_main$3 = {
  __name: "UserStepFinish",
  props: ["userData"],
  emits: ["save"],
  setup(__props, { emit: __emit }) {
    const { userData } = __props;
    console.log("user data", userData);
    function formatAddress(rawAddress) {
      return rawAddress.split(/[\s,]+/).map((part) => {
        const formattedPart = part.split(/([.-]+)/).map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join("");
        return formattedPart;
      }).join(" ");
    }
    const profileInfo = computed(() => [
      { label: "Username:", value: `${userData.email}@gmail.com` },
      {
        label: "Full Name:",
        value: `${userData.user_first_name.charAt(0).toUpperCase()}${userData.user_first_name.slice(
          1
        )} ${userData.user_middle_name.charAt(0).toUpperCase()}${userData.user_middle_name.slice(
          1
        )} ${userData.user_last_name.charAt(0).toUpperCase()}${userData.user_last_name.slice(1)}`
      },
      {
        label: "Address:",
        value: formatAddress(userData.user_address)
      },
      {
        label: "Birthdate:",
        value: userData.user_birthdate.charAt(0).toUpperCase() + userData.user_birthdate.slice(1)
      },
      {
        label: "Sex:",
        value: userData.user_sex.charAt(0).toUpperCase() + userData.user_sex.slice(1)
      },
      {
        label: "Position:",
        value: `${userData.user_position.charAt(0).toUpperCase() + userData.user_position.slice(1)}`
      },
      {
        label: "Phone Number:",
        value: userData.user_phone_number.charAt(0).toUpperCase() + userData.user_phone_number.slice(1)
      },
      {
        label: "Position:",
        value: userData.user_position.charAt(0).toUpperCase() + userData.user_position.slice(1)
      },
      {
        label: "Designation:",
        value: userData.user_position || ""
      },
      {
        label: "Branch:",
        value: userData.user_branch_name || ""
      },
      {
        label: "Time Shift:",
        value: userData.user_time_shift || ""
      }
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QCard, { flat: "" }, {
        default: withCtx(() => [
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              _hoisted_1$3
            ]),
            _: 1
          }),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(profileInfo.value, (info, index) => {
                return openBlock(), createElementBlock("div", {
                  key: index,
                  class: "row"
                }, [
                  createBaseVNode("div", _hoisted_2$1, [
                    createVNode(QChip, {
                      square: "",
                      color: "grey-1"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(info.label), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  createBaseVNode("div", _hoisted_3$1, [
                    createBaseVNode("div", _hoisted_4$1, toDisplayString(info.value), 1)
                  ])
                ]);
              }), 128))
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
var UserStepFinish = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "UserStepFinish.vue"]]);
var UsersCreate_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$2 = {
  class: "q-ma-xm",
  align: "right"
};
const _sfc_main$2 = {
  __name: "UsersCreate",
  setup(__props) {
    const users = computed(() => userStore.users);
    const userStore = useUsersStore();
    const step = ref(1);
    const isDisabled = ref(true);
    ref(false);
    const dialog = ref(false);
    const user = reactive({
      email: "",
      password: "",
      confirmPass: ""
    });
    const userInfo = reactive({
      employee_id: "",
      user_first_name: "",
      user_middle_name: "",
      user_last_name: "",
      user_address: "",
      user_birthdate: "",
      user_sex: "",
      user_phone_number: "",
      user_position: "",
      user_branch_name: "",
      user_time_shift: ""
    });
    const setUser = (data) => {
      Object.assign(user, data);
      isDisabled.value = !(user.password && user.confirmPass && user.password === user.confirmPass);
    };
    const setUserInfo = (data) => {
      console.log("setsuer data", data);
      Object.assign(userInfo, data);
      isDisabled.value = !(userInfo.employee_id && userInfo.user_first_name && userInfo.user_last_name && userInfo.user_address && userInfo.user_birthdate && userInfo.user_sex && userInfo.user_phone_number && userInfo.user_position && userInfo.user_branch_name);
    };
    const combinedUserData = computed(() => ({
      ...user,
      ...userInfo
    }));
    const openDialog = () => {
      dialog.value = true;
    };
    const nextStep = () => {
      if (step.value === 3) {
        saveUser();
      } else {
        step.value++;
      }
    };
    const resetForm = () => {
      user.email = "";
      user.password = "";
      user.confirmPass = "";
      userInfo.employee_id = "";
      userInfo.user_first_name = "";
      userInfo.user_middle_name = "";
      userInfo.user_last_name = "";
      userInfo.user_address = "";
      userInfo.user_birthdate = "";
      userInfo.user_sex = "";
      userInfo.user_phone_number = "";
      userInfo.user_position = "";
      userInfo.user_branch_name = "";
      userInfo.user_time_shift = "";
      step.value = 1;
      isDisabled.value = true;
    };
    const saveUser = async () => {
      try {
        const userData = {
          employee_id: userInfo.employee_id,
          email: `${user.email}@gmail.com`,
          password: user.password,
          role: userInfo.user_position
        };
        console.log("userdata to send:", userData);
        await userStore.registerUser(userData);
        dialog.value = false;
        resetForm();
        users.value = await userStore.fetchUsers();
      } catch (error) {
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", null, [
          createVNode(QBtn, {
            class: "text-dark q-pa-sm",
            outline: "",
            icon: "add_circle",
            label: "Add User",
            onClick: openDialog
          })
        ]),
        createVNode(QDialog, {
          modelValue: dialog.value,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => dialog.value = $event),
          persistent: "",
          "full-height": ""
        }, {
          default: withCtx(() => [
            createVNode(QCard, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_1$2, [
                  withDirectives(createVNode(QBtn, {
                    class: "q-ma-sm",
                    icon: "close",
                    flat: "",
                    dense: "",
                    round: ""
                  }, null, 512), [
                    [ClosePopup]
                  ])
                ]),
                createBaseVNode("div", null, [
                  createVNode(QStepper, {
                    class: "",
                    modelValue: step.value,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => step.value = $event),
                    ref: "stepper",
                    animated: "",
                    "done-color": "green",
                    "active-color": "blue",
                    "inactive-color": "grey",
                    flat: "",
                    align: "center"
                  }, {
                    navigation: withCtx(() => [
                      createVNode(QStepperNavigation, { class: "q-ma-none" }, {
                        default: withCtx(() => [
                          createBaseVNode("div", null, [
                            step.value > 1 ? (openBlock(), createBlock(QBtn, {
                              key: 0,
                              flat: "",
                              color: "primary",
                              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$refs.stepper.previous()),
                              label: "Back",
                              class: "q-ml-sm"
                            })) : createCommentVNode("", true),
                            createVNode(QBtn, {
                              disable: isDisabled.value,
                              onClick: nextStep,
                              color: "primary",
                              label: step.value === 3 ? "Save" : "Continue"
                            }, null, 8, ["disable", "label"])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    default: withCtx(() => [
                      createVNode(QStep, {
                        name: 1,
                        title: "Sign Up",
                        icon: "settings",
                        done: step.value > 1
                      }, {
                        default: withCtx(() => [
                          createVNode(UserStep1, {
                            onUpdateData: setUser,
                            userData: user
                          }, null, 8, ["userData"])
                        ]),
                        _: 1
                      }, 8, ["done"]),
                      createVNode(QStep, {
                        name: 2,
                        title: "Personal Info",
                        icon: "settings",
                        done: step.value > 2
                      }, {
                        default: withCtx(() => [
                          createVNode(UserStep2, {
                            onUpdateData: setUserInfo,
                            userData: userInfo
                          }, null, 8, ["userData"])
                        ]),
                        _: 1
                      }, 8, ["done"]),
                      createVNode(QStep, {
                        name: 3,
                        title: "Checked Personal Info",
                        icon: "settings",
                        done: step.value > 3
                      }, {
                        default: withCtx(() => [
                          createVNode(UserStepFinish, {
                            userData: combinedUserData.value,
                            onSave: saveUser
                          }, null, 8, ["userData"])
                        ]),
                        _: 1
                      }, 8, ["done"])
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ], 64);
    };
  }
};
var UsersCreate = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-6c977e5e"], ["__file", "UsersCreate.vue"]]);
const skeletonTypes = [
  "text",
  "rect",
  "circle",
  "QBtn",
  "QBadge",
  "QChip",
  "QToolbar",
  "QCheckbox",
  "QRadio",
  "QToggle",
  "QSlider",
  "QRange",
  "QInput",
  "QAvatar"
];
const skeletonAnimations = [
  "wave",
  "pulse",
  "pulse-x",
  "pulse-y",
  "fade",
  "blink",
  "none"
];
var QSkeleton = createComponent({
  name: "QSkeleton",
  props: {
    ...useDarkProps,
    tag: {
      type: String,
      default: "div"
    },
    type: {
      type: String,
      validator: (v) => skeletonTypes.includes(v),
      default: "rect"
    },
    animation: {
      type: String,
      validator: (v) => skeletonAnimations.includes(v),
      default: "wave"
    },
    animationSpeed: {
      type: [String, Number],
      default: 1500
    },
    square: Boolean,
    bordered: Boolean,
    size: String,
    width: String,
    height: String
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const style = computed(() => {
      const size = props.size !== void 0 ? [props.size, props.size] : [props.width, props.height];
      return {
        "--q-skeleton-speed": `${props.animationSpeed}ms`,
        width: size[0],
        height: size[1]
      };
    });
    const classes = computed(
      () => `q-skeleton q-skeleton--${isDark.value === true ? "dark" : "light"} q-skeleton--type-${props.type}` + (props.animation !== "none" ? ` q-skeleton--anim q-skeleton--anim-${props.animation}` : "") + (props.square === true ? " q-skeleton--square" : "") + (props.bordered === true ? " q-skeleton--bordered" : "")
    );
    return () => h(props.tag, {
      class: classes.value,
      style: style.value
    }, hSlot(slots.default));
  }
});
var UserEditProfile_vue_vue_type_style_index_0_scoped_true_lang = "";
var UsersCard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-32e889b7"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { class: "q-pa-md elegant-container" };
const _hoisted_2 = {
  key: 0,
  class: "skeleton-wrapper row q-col-gutter-md"
};
const _hoisted_3 = {
  key: 1,
  class: "data-error"
};
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, "No data available", -1));
const _hoisted_5 = {
  key: 2,
  class: "q-pa-md row q-col-gutter-md"
};
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("img", { src: "https://cdn.quasar.dev/img/mountains.jpg" }, null, -1));
const _hoisted_7 = { class: "q-mt-lg" };
const _hoisted_8 = { class: "text-h6 text-weight-medium elegant-name text-capitalize" };
const _hoisted_9 = { class: "q-mb-sm elegant-detail" };
const _hoisted_10 = { class: "email-display" };
const _hoisted_11 = { class: "email-text" };
const _hoisted_12 = { class: "q-mb-sm elegant-detail" };
const _hoisted_13 = { class: "q-mb-sm elegant-detail" };
const _hoisted_14 = { class: "q-mb-sm elegant-detail text-capitalize" };
const _sfc_main$1 = {
  __name: "UsersCard",
  setup(__props) {
    const userStore = useUsersStore();
    useRouter();
    ref(null);
    useQuasar();
    const users = computed(() => userStore.users);
    console.log("userdatasssss  ", users.value);
    onMounted(async () => {
      await reloadUserData();
    });
    const reloadUserData = async () => {
      try {
        loading.value = true;
        users.value = await userStore.fetchUsers();
        if (!users.value.length) {
          showNoDataMessage.value = true;
        }
        console.log("Users", users.value);
      } catch (error) {
        console.log("error fetching recipe: ", error);
        showNoDataMessage.value = true;
      } finally {
        loading.value = false;
      }
    };
    const formatDate = (dateString) => {
      return quasarDate.formatDate(dateString, "MMMM D, YYYY");
    };
    const formattedUserName = (user) => {
      if (!user)
        return "";
      const { firstname, middlename, lastname } = user;
      const formattedFirstName = firstname.split(" ").map((name) => name.charAt(0).toUpperCase() + name.slice(1)).join(" ");
      const middleInitial = middlename ? `${middlename.charAt(0).toUpperCase()}.` : "";
      const lastInitial = lastname.charAt(0).toUpperCase();
      return `${formattedFirstName} ${middleInitial} ${lastInitial}${lastname.slice(
        1
      )}`;
    };
    const loading = ref(true);
    const showNoDataMessage = ref(false);
    const searchQuery = ref("");
    const search = async () => {
      loading.value = true;
      showNoDataMessage.value = false;
      await userStore.searchUser(searchQuery.value);
      loading.value = false;
    };
    const onSave = async (user, newEmail) => {
      try {
        const id = user.id;
        users.value.email = newEmail;
        await userStore.updateEmail(id, newEmail);
        Notify.create({
          type: "positive",
          message: "yeah"
        });
      } catch (error) {
        console.log("====================================");
        console.log("ERRRR", error);
        console.log("====================================");
      }
    };
    const getBadgePositionColor = (role) => {
      switch (role) {
        case "Super Admin":
          return "blue-10";
        case "Admin":
          return "purple-10";
        case "Supervisor":
          return "teal-7";
        case "Scaler":
          return "green-8";
        case "Lamesador":
          return "orange-5";
        case "Hornero":
          return "red-6";
        case "Baker":
          return "brown";
        case "Cake Maker":
          return "brown-4";
        case "Cashier":
          return "green-5";
        case "Sales Clerk":
          return "blue-5";
        case "Utility":
          return "grey-7";
        case "Not Yet Assigned":
          return "grey-4";
        default:
          return "grey-4";
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, null, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$1, [
            createBaseVNode("div", null, [
              createVNode(QInput, {
                class: "q-pb-lg",
                modelValue: searchQuery.value,
                "onUpdate:modelValue": [
                  _cache[0] || (_cache[0] = ($event) => searchQuery.value = $event),
                  search
                ],
                outlined: "",
                placeholder: "Search",
                debounce: "1000",
                flat: "",
                dense: "",
                rounded: "",
                style: { "width": "100%", "max-width": "600px" }
              }, {
                append: withCtx(() => [
                  createVNode(QIcon, { name: "search" })
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            loading.value ? (openBlock(), createElementBlock("div", _hoisted_2, [
              (openBlock(), createElementBlock(Fragment, null, renderList(8, (n) => {
                return createBaseVNode("div", {
                  class: "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                  key: n
                }, [
                  createVNode(QCard, { class: "user-card skeleton-card" }, {
                    default: withCtx(() => [
                      createVNode(QSkeleton, {
                        height: "200px",
                        class: "q-mb-md"
                      }),
                      createVNode(QCardSection, { class: "text-center" }, {
                        default: withCtx(() => [
                          createVNode(QSkeleton, {
                            type: "circle",
                            size: "80px",
                            class: "q-mb-md"
                          }),
                          createVNode(QSkeleton, {
                            type: "text",
                            width: "60%",
                            class: "q-mt-lg"
                          }),
                          createVNode(QSkeleton, {
                            type: "text",
                            width: "40%",
                            class: "q-mt-sm"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(QSeparator),
                      createVNode(QCardSection, null, {
                        default: withCtx(() => [
                          createVNode(QSkeleton, {
                            type: "text",
                            width: "80%",
                            class: "q-mb-sm"
                          }),
                          createVNode(QSkeleton, {
                            type: "text",
                            width: "60%",
                            class: "q-mb-sm"
                          }),
                          createVNode(QSkeleton, {
                            type: "text",
                            width: "70%",
                            class: "q-mb-sm"
                          }),
                          createVNode(QSkeleton, {
                            type: "text",
                            width: "50%",
                            class: "q-mb-sm"
                          }),
                          createVNode(QSkeleton, {
                            type: "text",
                            width: "90%",
                            class: "q-mt-md"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(QSeparator),
                      createVNode(QCardActions, { class: "q-pa-md text-center" }, {
                        default: withCtx(() => [
                          createVNode(QSkeleton, {
                            type: "rect",
                            width: "40%",
                            height: "36px"
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]);
              }), 64))
            ])) : showNoDataMessage.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
              createVNode(QIcon, {
                name: "error",
                size: "50px",
                color: "negative"
              }),
              _hoisted_4
            ])) : (openBlock(), createElementBlock("div", _hoisted_5, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(users.value, (user) => {
                return openBlock(), createElementBlock("div", {
                  key: user.id,
                  class: "col-xs-12 col-sm-6 col-md-4 col-lg-3"
                }, [
                  createVNode(QCard, { class: "user-card" }, {
                    default: withCtx(() => [
                      _hoisted_6,
                      createVNode(QCardSection, { class: "text-center" }, {
                        default: withCtx(() => [
                          createBaseVNode("div", null, [
                            createVNode(QAvatar, {
                              icon: "person",
                              size: "80px",
                              color: "primary",
                              "text-color": "white",
                              class: "q-mb-md absolute",
                              style: { "top": "0", "left": "12px", "transform": "translateY(-50%)" }
                            })
                          ]),
                          createBaseVNode("div", _hoisted_7, [
                            createBaseVNode("div", _hoisted_8, toDisplayString(formattedUserName(user)), 1),
                            createVNode(QChip, {
                              color: getBadgePositionColor(user.role),
                              "text-color": "white",
                              class: "q-mt-sm elegant-chip"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(user.role), 1)
                              ]),
                              _: 2
                            }, 1032, ["color"])
                          ])
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(QSeparator, { class: "separator q-mx-md" }),
                      createVNode(QCardSection, null, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_9, [
                            createVNode(QIcon, {
                              name: "mail",
                              class: "q-mr-sm"
                            }),
                            createVNode(QPopupEdit, {
                              "onUpdate:modelValue": [(val) => onSave(user, val), ($event) => user.email = $event],
                              modelValue: user.email,
                              title: "Edit Email",
                              persistent: "",
                              "auto-save": "",
                              buttons: "",
                              "label-set": "Save",
                              "label-cancel": "Close",
                              fit: "",
                              "transition-show": "scale",
                              "transition-hide": "scale"
                            }, {
                              default: withCtx((scope) => [
                                createVNode(QInput, {
                                  modelValue: scope.value,
                                  "onUpdate:modelValue": ($event) => scope.value = $event,
                                  dense: "",
                                  type: "email",
                                  rules: [_ctx.emailRule],
                                  placeholder: "Email",
                                  class: "popup-input",
                                  filled: "",
                                  borderless: "",
                                  onKeyup: withKeys(scope.set, ["enter"])
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "onKeyup"])
                              ]),
                              _: 2
                            }, 1032, ["onUpdate:modelValue", "modelValue"]),
                            createBaseVNode("div", _hoisted_10, [
                              createBaseVNode("span", _hoisted_11, toDisplayString(user.email), 1),
                              createVNode(QIcon, {
                                name: "edit",
                                size: "sm",
                                class: "edit-icon text-light-green-13"
                              })
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_12, [
                            createVNode(QIcon, {
                              name: "calendar_today",
                              class: "q-mr-sm"
                            }),
                            createBaseVNode("span", null, toDisplayString(formatDate(user.birthdate)), 1)
                          ]),
                          createBaseVNode("div", _hoisted_13, [
                            createVNode(QIcon, {
                              name: "smartphone",
                              class: "q-mr-sm"
                            }),
                            createBaseVNode("span", null, toDisplayString(user.phone), 1)
                          ]),
                          createBaseVNode("div", _hoisted_14, [
                            createVNode(QIcon, {
                              name: "location_on",
                              class: "q-mr-sm"
                            }),
                            createBaseVNode("span", null, toDisplayString(user.address), 1)
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024)
                ]);
              }), 128))
            ]))
          ])
        ]),
        _: 1
      });
    };
  }
};
var UsersCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-32e889b7"], ["__file", "UsersCard.vue"]]);
var UsersTable_vue_vue_type_style_index_0_scoped_true_lang = "";
var UsersPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = { align: "right" };
const _sfc_main = {
  __name: "UsersPage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QCard, {
        class: "elegant-container",
        flat: ""
      }, {
        default: withCtx(() => [
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                createVNode(UsersCreate)
              ])
            ]),
            _: 1
          }),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createVNode(UsersCard)
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
var UsersPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6734ec34"], ["__file", "UsersPage.vue"]]);
export { UsersPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnNQYWdlLjhmOTk0YWYzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3N0ZXBwZXIvU3RlcEhlYWRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc3RlcHBlci9RU3RlcC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc3RlcHBlci9RU3RlcHBlck5hdmlnYXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3N0ZXBwZXIvUVN0ZXBwZXIuanMiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci91c2Vycy9jb21wb25lbnRzL3VzZXJzX2NyZWF0ZV9jb21wb25lbnQvVXNlclN0ZXAxLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL3VzZXJzL2NvbXBvbmVudHMvdXNlcnNfY3JlYXRlX2NvbXBvbmVudC9Vc2VyU3RlcDIudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvdXNlcnMvY29tcG9uZW50cy91c2Vyc19jcmVhdGVfY29tcG9uZW50L1VzZXJTdGVwRmluaXNoLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL3VzZXJzL2NvbXBvbmVudHMvVXNlcnNDcmVhdGUudnVlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9za2VsZXRvbi9RU2tlbGV0b24uanMiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci91c2Vycy9jb21wb25lbnRzL1VzZXJzQ2FyZC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2l0aERpcmVjdGl2ZXMsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUmlwcGxlIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmlwcGxlL1JpcHBsZS5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnU3RlcEhlYWRlcicsXG5cbiAgcHJvcHM6IHtcbiAgICBzdGVwcGVyOiB7fSxcbiAgICBzdGVwOiB7fSxcbiAgICBnb1RvUGFuZWw6IEZ1bmN0aW9uXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IGF0dHJzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgYmx1clJlZiA9IHJlZihudWxsKVxuXG4gICAgY29uc3QgaXNBY3RpdmUgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5zdGVwcGVyLm1vZGVsVmFsdWUgPT09IHByb3BzLnN0ZXAubmFtZSlcblxuICAgIGNvbnN0IGlzRGlzYWJsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IG9wdCA9IHByb3BzLnN0ZXAuZGlzYWJsZVxuICAgICAgcmV0dXJuIG9wdCA9PT0gdHJ1ZSB8fCBvcHQgPT09ICcnXG4gICAgfSlcblxuICAgIGNvbnN0IGlzRXJyb3IgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBvcHQgPSBwcm9wcy5zdGVwLmVycm9yXG4gICAgICByZXR1cm4gb3B0ID09PSB0cnVlIHx8IG9wdCA9PT0gJydcbiAgICB9KVxuXG4gICAgY29uc3QgaXNEb25lID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3Qgb3B0ID0gcHJvcHMuc3RlcC5kb25lXG4gICAgICByZXR1cm4gaXNEaXNhYmxlLnZhbHVlID09PSBmYWxzZSAmJiAob3B0ID09PSB0cnVlIHx8IG9wdCA9PT0gJycpXG4gICAgfSlcblxuICAgIGNvbnN0IGhlYWRlck5hdiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0XG4gICAgICAgIG9wdCA9IHByb3BzLnN0ZXAuaGVhZGVyTmF2LFxuICAgICAgICBuYXYgPSBvcHQgPT09IHRydWUgfHwgb3B0ID09PSAnJyB8fCBvcHQgPT09IHZvaWQgMFxuXG4gICAgICByZXR1cm4gaXNEaXNhYmxlLnZhbHVlID09PSBmYWxzZVxuICAgICAgICAmJiBwcm9wcy5zdGVwcGVyLmhlYWRlck5hdlxuICAgICAgICAmJiBuYXZcbiAgICB9KVxuXG4gICAgY29uc3QgaGFzUHJlZml4ID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgcmV0dXJuIHByb3BzLnN0ZXAucHJlZml4XG4gICAgICAgICYmIChpc0FjdGl2ZS52YWx1ZSA9PT0gZmFsc2UgfHwgcHJvcHMuc3RlcHBlci5hY3RpdmVJY29uID09PSAnbm9uZScpXG4gICAgICAgICYmIChpc0Vycm9yLnZhbHVlID09PSBmYWxzZSB8fCBwcm9wcy5zdGVwcGVyLmVycm9ySWNvbiA9PT0gJ25vbmUnKVxuICAgICAgICAmJiAoaXNEb25lLnZhbHVlID09PSBmYWxzZSB8fCBwcm9wcy5zdGVwcGVyLmRvbmVJY29uID09PSAnbm9uZScpXG4gICAgfSlcblxuICAgIGNvbnN0IGljb24gPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBkZWZhdWx0SWNvbiA9IHByb3BzLnN0ZXAuaWNvbiB8fCBwcm9wcy5zdGVwcGVyLmluYWN0aXZlSWNvblxuXG4gICAgICBpZiAoaXNBY3RpdmUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgaWNvbiA9IHByb3BzLnN0ZXAuYWN0aXZlSWNvbiB8fCBwcm9wcy5zdGVwcGVyLmFjdGl2ZUljb25cbiAgICAgICAgcmV0dXJuIGljb24gPT09ICdub25lJ1xuICAgICAgICAgID8gZGVmYXVsdEljb25cbiAgICAgICAgICA6IGljb24gfHwgJHEuaWNvblNldC5zdGVwcGVyLmFjdGl2ZVxuICAgICAgfVxuXG4gICAgICBpZiAoaXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBpY29uID0gcHJvcHMuc3RlcC5lcnJvckljb24gfHwgcHJvcHMuc3RlcHBlci5lcnJvckljb25cbiAgICAgICAgcmV0dXJuIGljb24gPT09ICdub25lJ1xuICAgICAgICAgID8gZGVmYXVsdEljb25cbiAgICAgICAgICA6IGljb24gfHwgJHEuaWNvblNldC5zdGVwcGVyLmVycm9yXG4gICAgICB9XG5cbiAgICAgIGlmIChpc0Rpc2FibGUudmFsdWUgPT09IGZhbHNlICYmIGlzRG9uZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBpY29uID0gcHJvcHMuc3RlcC5kb25lSWNvbiB8fCBwcm9wcy5zdGVwcGVyLmRvbmVJY29uXG4gICAgICAgIHJldHVybiBpY29uID09PSAnbm9uZSdcbiAgICAgICAgICA/IGRlZmF1bHRJY29uXG4gICAgICAgICAgOiBpY29uIHx8ICRxLmljb25TZXQuc3RlcHBlci5kb25lXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZWZhdWx0SWNvblxuICAgIH0pXG5cbiAgICBjb25zdCBjb2xvciA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGVycm9yQ29sb3IgPSBpc0Vycm9yLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gcHJvcHMuc3RlcC5lcnJvckNvbG9yIHx8IHByb3BzLnN0ZXBwZXIuZXJyb3JDb2xvclxuICAgICAgICA6IHZvaWQgMFxuXG4gICAgICBpZiAoaXNBY3RpdmUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgY29sb3IgPSBwcm9wcy5zdGVwLmFjdGl2ZUNvbG9yIHx8IHByb3BzLnN0ZXBwZXIuYWN0aXZlQ29sb3IgfHwgcHJvcHMuc3RlcC5jb2xvclxuICAgICAgICByZXR1cm4gY29sb3IgIT09IHZvaWQgMFxuICAgICAgICAgID8gY29sb3JcbiAgICAgICAgICA6IGVycm9yQ29sb3JcbiAgICAgIH1cbiAgICAgIGlmIChlcnJvckNvbG9yICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIGVycm9yQ29sb3JcbiAgICAgIH1cbiAgICAgIGlmIChpc0Rpc2FibGUudmFsdWUgPT09IGZhbHNlICYmIGlzRG9uZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gcHJvcHMuc3RlcC5kb25lQ29sb3IgfHwgcHJvcHMuc3RlcHBlci5kb25lQ29sb3IgfHwgcHJvcHMuc3RlcC5jb2xvciB8fCBwcm9wcy5zdGVwcGVyLmluYWN0aXZlQ29sb3JcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb3BzLnN0ZXAuY29sb3IgfHwgcHJvcHMuc3RlcHBlci5pbmFjdGl2ZUNvbG9yXG4gICAgfSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4gJ3Etc3RlcHBlcl9fdGFiIGNvbC1ncm93IGZsZXggaXRlbXMtY2VudGVyIG5vLXdyYXAgcmVsYXRpdmUtcG9zaXRpb24nXG4gICAgICAgICsgKGNvbG9yLnZhbHVlICE9PSB2b2lkIDAgPyBgIHRleHQtJHsgY29sb3IudmFsdWUgfWAgOiAnJylcbiAgICAgICAgKyAoaXNFcnJvci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJyBxLXN0ZXBwZXJfX3RhYi0tZXJyb3IgcS1zdGVwcGVyX190YWItLWVycm9yLXdpdGgtJyArIChoYXNQcmVmaXgudmFsdWUgPT09IHRydWUgPyAncHJlZml4JyA6ICdpY29uJylcbiAgICAgICAgICA6ICcnKVxuICAgICAgICArIChpc0FjdGl2ZS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zdGVwcGVyX190YWItLWFjdGl2ZScgOiAnJylcbiAgICAgICAgKyAoaXNEb25lLnZhbHVlID09PSB0cnVlID8gJyBxLXN0ZXBwZXJfX3RhYi0tZG9uZScgOiAnJylcbiAgICAgICAgKyAoaGVhZGVyTmF2LnZhbHVlID09PSB0cnVlID8gJyBxLXN0ZXBwZXJfX3RhYi0tbmF2aWdhdGlvbiBxLWZvY3VzYWJsZSBxLWhvdmVyYWJsZScgOiAnJylcbiAgICAgICAgKyAoaXNEaXNhYmxlLnZhbHVlID09PSB0cnVlID8gJyBxLXN0ZXBwZXJfX3RhYi0tZGlzYWJsZWQnIDogJycpXG4gICAgfSlcblxuICAgIGNvbnN0IHJpcHBsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLnN0ZXBwZXIuaGVhZGVyTmF2ICE9PSB0cnVlXG4gICAgICAgID8gZmFsc2VcbiAgICAgICAgOiBoZWFkZXJOYXYudmFsdWVcbiAgICApKVxuXG4gICAgZnVuY3Rpb24gb25BY3RpdmF0ZSAoKSB7XG4gICAgICBibHVyUmVmLnZhbHVlICE9PSBudWxsICYmIGJsdXJSZWYudmFsdWUuZm9jdXMoKVxuICAgICAgaXNBY3RpdmUudmFsdWUgPT09IGZhbHNlICYmIHByb3BzLmdvVG9QYW5lbChwcm9wcy5zdGVwLm5hbWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXl1cCAoZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMgJiYgaXNBY3RpdmUudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIHByb3BzLmdvVG9QYW5lbChwcm9wcy5zdGVwLm5hbWUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH1cblxuICAgICAgaWYgKGhlYWRlck5hdi52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBkYXRhLm9uQ2xpY2sgPSBvbkFjdGl2YXRlXG4gICAgICAgIGRhdGEub25LZXl1cCA9IG9uS2V5dXBcblxuICAgICAgICBPYmplY3QuYXNzaWduKGRhdGEsXG4gICAgICAgICAgaXNEaXNhYmxlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICA/IHsgdGFiaW5kZXg6IC0xLCAnYXJpYS1kaXNhYmxlZCc6ICd0cnVlJyB9XG4gICAgICAgICAgICA6IHsgdGFiaW5kZXg6IGF0dHJzLnRhYmluZGV4IHx8IDAgfVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNoaWxkID0gW1xuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1mb2N1cy1oZWxwZXInLCB0YWJpbmRleDogLTEsIHJlZjogYmx1clJlZiB9KSxcblxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1zdGVwcGVyX19kb3Qgcm93IGZsZXgtY2VudGVyIHEtc3RlcHBlcl9fbGluZSByZWxhdGl2ZS1wb3NpdGlvbicgfSwgW1xuICAgICAgICAgIGgoJ3NwYW4nLCB7IGNsYXNzOiAncm93IGZsZXgtY2VudGVyJyB9LCBbXG4gICAgICAgICAgICBoYXNQcmVmaXgudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgICAgPyBwcm9wcy5zdGVwLnByZWZpeFxuICAgICAgICAgICAgICA6IGgoUUljb24sIHsgbmFtZTogaWNvbi52YWx1ZSB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgICBdXG5cbiAgICAgIGlmIChwcm9wcy5zdGVwLnRpdGxlICE9PSB2b2lkIDAgJiYgcHJvcHMuc3RlcC50aXRsZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gW1xuICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXN0ZXBwZXJfX3RpdGxlJyB9LCBwcm9wcy5zdGVwLnRpdGxlKVxuICAgICAgICBdXG5cbiAgICAgICAgaWYgKHByb3BzLnN0ZXAuY2FwdGlvbiAhPT0gdm9pZCAwICYmIHByb3BzLnN0ZXAuY2FwdGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnRlbnQucHVzaChcbiAgICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXN0ZXBwZXJfX2NhcHRpb24nIH0sIHByb3BzLnN0ZXAuY2FwdGlvbilcbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1zdGVwcGVyX19sYWJlbCBxLXN0ZXBwZXJfX2xpbmUgcmVsYXRpdmUtcG9zaXRpb24nXG4gICAgICAgICAgfSwgY29udGVudClcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gd2l0aERpcmVjdGl2ZXMoXG4gICAgICAgIGgoJ2RpdicsIGRhdGEsIGNoaWxkKSxcbiAgICAgICAgWyBbIFJpcHBsZSwgcmlwcGxlLnZhbHVlIF0gXVxuICAgICAgKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIGluamVjdCwgZ2V0Q3VycmVudEluc3RhbmNlLCBLZWVwQWxpdmUgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRU2xpZGVUcmFuc2l0aW9uIGZyb20gJy4uL3NsaWRlLXRyYW5zaXRpb24vUVNsaWRlVHJhbnNpdGlvbi5qcydcbmltcG9ydCBTdGVwSGVhZGVyIGZyb20gJy4vU3RlcEhlYWRlci5qcydcblxuaW1wb3J0IHsgdXNlUGFuZWxDaGlsZFByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtcGFuZWwvdXNlLXBhbmVsLmpzJ1xuaW1wb3J0IHVzZVJlbmRlckNhY2hlIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS1yZW5kZXItY2FjaGUvdXNlLXJlbmRlci1jYWNoZS5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgc3RlcHBlcktleSwgZW1wdHlSZW5kZXJGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuc3ltYm9scy9zeW1ib2xzLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmZ1bmN0aW9uIGdldFN0ZXBXcmFwcGVyIChzbG90cykge1xuICByZXR1cm4gaCgnZGl2Jywge1xuICAgIGNsYXNzOiAncS1zdGVwcGVyX19zdGVwLWNvbnRlbnQnXG4gIH0sIFtcbiAgICBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogJ3Etc3RlcHBlcl9fc3RlcC1pbm5lcidcbiAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgXSlcbn1cblxuY29uc3QgUGFuZWxXcmFwcGVyID0ge1xuICBzZXR1cCAoXywgeyBzbG90cyB9KSB7XG4gICAgcmV0dXJuICgpID0+IGdldFN0ZXBXcmFwcGVyKHNsb3RzKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU3RlcCcsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VQYW5lbENoaWxkUHJvcHMsXG5cbiAgICBpY29uOiBTdHJpbmcsXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICB0aXRsZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIGNhcHRpb246IFN0cmluZyxcbiAgICBwcmVmaXg6IFsgU3RyaW5nLCBOdW1iZXIgXSxcblxuICAgIGRvbmVJY29uOiBTdHJpbmcsXG4gICAgZG9uZUNvbG9yOiBTdHJpbmcsXG4gICAgYWN0aXZlSWNvbjogU3RyaW5nLFxuICAgIGFjdGl2ZUNvbG9yOiBTdHJpbmcsXG4gICAgZXJyb3JJY29uOiBTdHJpbmcsXG4gICAgZXJyb3JDb2xvcjogU3RyaW5nLFxuXG4gICAgaGVhZGVyTmF2OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgZG9uZTogQm9vbGVhbixcbiAgICBlcnJvcjogQm9vbGVhbixcblxuICAgIG9uU2Nyb2xsOiBbIEZ1bmN0aW9uLCBBcnJheSBdXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCAkc3RlcHBlciA9IGluamVjdChzdGVwcGVyS2V5LCBlbXB0eVJlbmRlckZuKVxuICAgIGlmICgkc3RlcHBlciA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUVN0ZXAgbmVlZHMgdG8gYmUgYSBjaGlsZCBvZiBRU3RlcHBlcicpXG4gICAgICByZXR1cm4gZW1wdHlSZW5kZXJGblxuICAgIH1cblxuICAgIGNvbnN0IHsgZ2V0Q2FjaGUgfSA9IHVzZVJlbmRlckNhY2hlKClcblxuICAgIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcblxuICAgIGNvbnN0IGlzQWN0aXZlID0gY29tcHV0ZWQoKCkgPT4gJHN0ZXBwZXIudmFsdWUubW9kZWxWYWx1ZSA9PT0gcHJvcHMubmFtZSlcblxuICAgIGNvbnN0IHNjcm9sbEV2ZW50ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgKCRxLnBsYXRmb3JtLmlzLmlvcyAhPT0gdHJ1ZSAmJiAkcS5wbGF0Zm9ybS5pcy5jaHJvbWUgPT09IHRydWUpXG4gICAgICAgIHx8IGlzQWN0aXZlLnZhbHVlICE9PSB0cnVlXG4gICAgICAgIHx8ICRzdGVwcGVyLnZhbHVlLnZlcnRpY2FsICE9PSB0cnVlXG4gICAgICAgID8ge31cbiAgICAgICAgOiB7XG4gICAgICAgICAgICBvblNjcm9sbCAoZSkge1xuICAgICAgICAgICAgICBjb25zdCB7IHRhcmdldCB9ID0gZVxuICAgICAgICAgICAgICBpZiAodGFyZ2V0LnNjcm9sbFRvcCA+IDApIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2Nyb2xsVG9wID0gMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHByb3BzLm9uU2Nyb2xsICE9PSB2b2lkIDAgJiYgZW1pdCgnc2Nyb2xsJywgZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgKSlcblxuICAgIGNvbnN0IGNvbnRlbnRLZXkgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICB0eXBlb2YgcHJvcHMubmFtZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHByb3BzLm5hbWUgPT09ICdudW1iZXInXG4gICAgICAgID8gcHJvcHMubmFtZVxuICAgICAgICA6IFN0cmluZyhwcm9wcy5uYW1lKVxuICAgICkpXG5cbiAgICBmdW5jdGlvbiBnZXRTdGVwQ29udGVudCAoKSB7XG4gICAgICBjb25zdCB2ZXJ0aWNhbCA9ICRzdGVwcGVyLnZhbHVlLnZlcnRpY2FsXG5cbiAgICAgIGlmICh2ZXJ0aWNhbCA9PT0gdHJ1ZSAmJiAkc3RlcHBlci52YWx1ZS5rZWVwQWxpdmUgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGgoXG4gICAgICAgICAgS2VlcEFsaXZlLFxuICAgICAgICAgICRzdGVwcGVyLnZhbHVlLmtlZXBBbGl2ZVByb3BzLnZhbHVlLFxuICAgICAgICAgIGlzQWN0aXZlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICBoKFxuICAgICAgICAgICAgICAgICAgJHN0ZXBwZXIudmFsdWUubmVlZHNVbmlxdWVLZWVwQWxpdmVXcmFwcGVyLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICAgICAgICAgID8gZ2V0Q2FjaGUoY29udGVudEtleS52YWx1ZSwgKCkgPT4gKHsgLi4uUGFuZWxXcmFwcGVyLCBuYW1lOiBjb250ZW50S2V5LnZhbHVlIH0pKVxuICAgICAgICAgICAgICAgICAgICA6IFBhbmVsV3JhcHBlcixcbiAgICAgICAgICAgICAgICAgIHsga2V5OiBjb250ZW50S2V5LnZhbHVlIH0sXG4gICAgICAgICAgICAgICAgICBzbG90cy5kZWZhdWx0XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2ZXJ0aWNhbCAhPT0gdHJ1ZSB8fCBpc0FjdGl2ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IGdldFN0ZXBXcmFwcGVyKHNsb3RzKVxuICAgICAgICA6IHZvaWQgMFxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiBoKFxuICAgICAgJ2RpdicsXG4gICAgICB7IHJlZjogcm9vdFJlZiwgY2xhc3M6ICdxLXN0ZXBwZXJfX3N0ZXAnLCByb2xlOiAndGFicGFuZWwnLCAuLi5zY3JvbGxFdmVudC52YWx1ZSB9LFxuICAgICAgJHN0ZXBwZXIudmFsdWUudmVydGljYWwgPT09IHRydWVcbiAgICAgICAgPyBbXG4gICAgICAgICAgICBoKFN0ZXBIZWFkZXIsIHtcbiAgICAgICAgICAgICAgc3RlcHBlcjogJHN0ZXBwZXIudmFsdWUsXG4gICAgICAgICAgICAgIHN0ZXA6IHByb3BzLFxuICAgICAgICAgICAgICBnb1RvUGFuZWw6ICRzdGVwcGVyLnZhbHVlLmdvVG9QYW5lbFxuICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICRzdGVwcGVyLnZhbHVlLmFuaW1hdGVkID09PSB0cnVlXG4gICAgICAgICAgICAgID8gaChRU2xpZGVUcmFuc2l0aW9uLCBnZXRTdGVwQ29udGVudClcbiAgICAgICAgICAgICAgOiBnZXRTdGVwQ29udGVudCgpXG4gICAgICAgICAgXVxuICAgICAgICA6IFsgZ2V0U3RlcENvbnRlbnQoKSBdXG4gICAgKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU3RlcHBlck5hdmlnYXRpb24nLFxuXG4gIHNldHVwIChfLCB7IHNsb3RzIH0pIHtcbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2JywgeyBjbGFzczogJ3Etc3RlcHBlcl9fbmF2JyB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBwcm92aWRlLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBTdGVwSGVhZGVyIGZyb20gJy4vU3RlcEhlYWRlci5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZGFyay91c2UtZGFyay5qcydcbmltcG9ydCB1c2VQYW5lbCwgeyB1c2VQYW5lbFByb3BzLCB1c2VQYW5lbEVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtcGFuZWwvdXNlLXBhbmVsLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBzdGVwcGVyS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zeW1ib2xzL3N5bWJvbHMuanMnXG5pbXBvcnQgeyBoU2xvdCwgaE1lcmdlU2xvdCwgaERpciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuY29uc3QgY2FtZWxSRSA9IC8oLVxcdykvZ1xuXG5mdW5jdGlvbiBjYW1lbGl6ZVByb3BzIChwcm9wcykge1xuICBjb25zdCBhY2MgPSB7fVxuICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wcykge1xuICAgIGNvbnN0IG5ld0tleSA9IGtleS5yZXBsYWNlKGNhbWVsUkUsIG0gPT4gbVsgMSBdLnRvVXBwZXJDYXNlKCkpXG4gICAgYWNjWyBuZXdLZXkgXSA9IHByb3BzWyBrZXkgXVxuICB9XG4gIHJldHVybiBhY2Ncbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FTdGVwcGVyJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcbiAgICAuLi51c2VQYW5lbFByb3BzLFxuXG4gICAgZmxhdDogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBhbHRlcm5hdGl2ZUxhYmVsczogQm9vbGVhbixcbiAgICBoZWFkZXJOYXY6IEJvb2xlYW4sXG4gICAgY29udHJhY3RlZDogQm9vbGVhbixcbiAgICBoZWFkZXJDbGFzczogU3RyaW5nLFxuXG4gICAgaW5hY3RpdmVDb2xvcjogU3RyaW5nLFxuICAgIGluYWN0aXZlSWNvbjogU3RyaW5nLFxuICAgIGRvbmVJY29uOiBTdHJpbmcsXG4gICAgZG9uZUNvbG9yOiBTdHJpbmcsXG4gICAgYWN0aXZlSWNvbjogU3RyaW5nLFxuICAgIGFjdGl2ZUNvbG9yOiBTdHJpbmcsXG4gICAgZXJyb3JJY29uOiBTdHJpbmcsXG4gICAgZXJyb3JDb2xvcjogU3RyaW5nXG4gIH0sXG5cbiAgZW1pdHM6IHVzZVBhbmVsRW1pdHMsXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgdm0ucHJveHkuJHEpXG5cbiAgICBjb25zdCB7XG4gICAgICB1cGRhdGVQYW5lbHNMaXN0LCBpc1ZhbGlkUGFuZWxOYW1lLFxuICAgICAgdXBkYXRlUGFuZWxJbmRleCwgZ2V0UGFuZWxDb250ZW50LFxuICAgICAgZ2V0UGFuZWxzLCBwYW5lbERpcmVjdGl2ZXMsIGdvVG9QYW5lbCxcbiAgICAgIGtlZXBBbGl2ZVByb3BzLCBuZWVkc1VuaXF1ZUtlZXBBbGl2ZVdyYXBwZXJcbiAgICB9ID0gdXNlUGFuZWwoKVxuXG4gICAgcHJvdmlkZShzdGVwcGVyS2V5LCBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgZ29Ub1BhbmVsLFxuICAgICAga2VlcEFsaXZlUHJvcHMsXG4gICAgICBuZWVkc1VuaXF1ZUtlZXBBbGl2ZVdyYXBwZXIsXG4gICAgICAuLi5wcm9wc1xuICAgIH0pKSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtc3RlcHBlciBxLXN0ZXBwZXItLSR7IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJyB9YFxuICAgICAgKyAocHJvcHMuZmxhdCA9PT0gdHJ1ZSA/ICcgcS1zdGVwcGVyLS1mbGF0JyA6ICcnKVxuICAgICAgKyAocHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtc3RlcHBlci0tYm9yZGVyZWQnIDogJycpXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtc3RlcHBlci0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgaGVhZGVyQ2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1zdGVwcGVyX19oZWFkZXIgcm93IGl0ZW1zLXN0cmV0Y2gganVzdGlmeS1iZXR3ZWVuJ1xuICAgICAgKyBgIHEtc3RlcHBlcl9faGVhZGVyLS0keyBwcm9wcy5hbHRlcm5hdGl2ZUxhYmVscyA9PT0gdHJ1ZSA/ICdhbHRlcm5hdGl2ZScgOiAnc3RhbmRhcmQnIH0tbGFiZWxzYFxuICAgICAgKyAocHJvcHMuZmxhdCA9PT0gZmFsc2UgfHwgcHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtc3RlcHBlcl9faGVhZGVyLS1ib3JkZXInIDogJycpXG4gICAgICArIChwcm9wcy5jb250cmFjdGVkID09PSB0cnVlID8gJyBxLXN0ZXBwZXJfX2hlYWRlci0tY29udHJhY3RlZCcgOiAnJylcbiAgICAgICsgKHByb3BzLmhlYWRlckNsYXNzICE9PSB2b2lkIDAgPyBgICR7IHByb3BzLmhlYWRlckNsYXNzIH1gIDogJycpXG4gICAgKVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgICBjb25zdCB0b3AgPSBoU2xvdChzbG90cy5tZXNzYWdlLCBbXSlcblxuICAgICAgaWYgKHByb3BzLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICAgIGlzVmFsaWRQYW5lbE5hbWUocHJvcHMubW9kZWxWYWx1ZSkgJiYgdXBkYXRlUGFuZWxJbmRleCgpXG5cbiAgICAgICAgY29uc3QgY29udGVudCA9IGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3Etc3RlcHBlcl9fY29udGVudCdcbiAgICAgICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG5cbiAgICAgICAgcmV0dXJuIHRvcCA9PT0gdm9pZCAwXG4gICAgICAgICAgPyBbIGNvbnRlbnQgXVxuICAgICAgICAgIDogdG9wLmNvbmNhdChjb250ZW50KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gW1xuICAgICAgICBoKFxuICAgICAgICAgICdkaXYnLFxuICAgICAgICAgIHsgY2xhc3M6IGhlYWRlckNsYXNzZXMudmFsdWUgfSxcbiAgICAgICAgICBnZXRQYW5lbHMoKS5tYXAocGFuZWwgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RlcCA9IGNhbWVsaXplUHJvcHMocGFuZWwucHJvcHMpXG5cbiAgICAgICAgICAgIHJldHVybiBoKFN0ZXBIZWFkZXIsIHtcbiAgICAgICAgICAgICAga2V5OiBzdGVwLm5hbWUsXG4gICAgICAgICAgICAgIHN0ZXBwZXI6IHByb3BzLFxuICAgICAgICAgICAgICBzdGVwLFxuICAgICAgICAgICAgICBnb1RvUGFuZWxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgKSxcblxuICAgICAgICB0b3AsXG5cbiAgICAgICAgaERpcihcbiAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICB7IGNsYXNzOiAncS1zdGVwcGVyX19jb250ZW50IHEtcGFuZWwtcGFyZW50JyB9LFxuICAgICAgICAgIGdldFBhbmVsQ29udGVudCgpLFxuICAgICAgICAgICdjb250JyxcbiAgICAgICAgICBwcm9wcy5zd2lwZWFibGUsXG4gICAgICAgICAgKCkgPT4gcGFuZWxEaXJlY3RpdmVzLnZhbHVlXG4gICAgICAgIClcbiAgICAgIF1cbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdXBkYXRlUGFuZWxzTGlzdChzbG90cylcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWVcbiAgICAgIH0sIGhNZXJnZVNsb3Qoc2xvdHMubmF2aWdhdGlvbiwgZ2V0Q29udGVudCgpKSlcbiAgICB9XG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XG4gIDxxLWNhcmQgZmxhdCBjbGFzcz1cInEtcGEtc21cIiBzdHlsZT1cIndpZHRoOiA1MDBweDsgbWF4LXdpZHRoOiA4MHZ3XCI+XG4gICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIiBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJwcm9maWxlLXBpY3R1cmVcIlxuICAgICAgICAgIDpzdHlsZT1cInsgd2lkdGg6IHNpemUgKyAncHgnLCBoZWlnaHQ6IHNpemUgKyAncHgnIH1cIlxuICAgICAgICA+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cImZpbGVJbnB1dFwiPlxuICAgICAgICAgICAgPHEtYXZhdGFyIHNpemU9XCIxNTBweFwiIGNvbG9yPVwiZ3JleS0yXCI+XG4gICAgICAgICAgICAgIDxpbWcgOnNyYz1cImltYWdlVXJsXCIgOmFsdD1cImFsdFRleHRcIiBAZXJyb3I9XCJoYW5kbGVJbWFnZUVycm9yXCIgLz5cbiAgICAgICAgICAgIDwvcS1hdmF0YXI+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICBpZD1cImZpbGVJbnB1dFwiXG4gICAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxuICAgICAgICAgICAgICBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIlxuICAgICAgICAgICAgICBAY2hhbmdlPVwiaGFuZGxlRmlsZUNoYW5nZVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm92ZXJsYXlcIiB2LWlmPVwiaG92ZXJlZFwiPlxuICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwiZWRpdFwiIEBjbGljaz1cImVkaXRJbWFnZVwiIGNsYXNzPVwiZWRpdC1pY29uXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+UHJvZmlsZTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXIteS1zbVwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwiJGVtaXQoJ3VwZGF0ZURhdGEnLCBzaWduVXBGb3JtKVwiXG4gICAgICAgICAgICB2LW1vZGVsPVwic2lnblVwRm9ybS5lbWFpbFwiXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZW1haWxcIlxuICAgICAgICAgICAgbGF6eS1ydWxlc1xuICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+ICh2YWwgJiYgdmFsLmxlbmd0aCA+IDApIHx8ICdFbWFpbCByZXF1aXJlZCddXCJcbiAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgICAgICBzdWZmaXg9XCJAZ21haWwuY29tXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OnByZXBlbmQ+XG4gICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cIm1haWxcIiAvPlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICB2LW1vZGVsPVwic2lnblVwRm9ybS5wYXNzd29yZFwiXG4gICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwiJGVtaXQoJ3VwZGF0ZURhdGEnLCBzaWduVXBGb3JtKVwiXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIlxuICAgICAgICAgICAgOnR5cGU9XCJpc1B3ZCA/ICdwYXNzd29yZCcgOiAndGV4dCdcIlxuICAgICAgICAgICAgbGF6eS1ydWxlc1xuICAgICAgICAgICAgOnJ1bGVzPVwiW1xuICAgICAgICAgICAgICAodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnUGFzc3dvcmQgaXMgcmVxdWlyZWQnLFxuICAgICAgICAgICAgXVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kPlxuICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJsb2NrXCIgLz5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgICAgICAgPHEtaWNvblxuICAgICAgICAgICAgICAgIDpuYW1lPVwiaXNQd2QgPyAndmlzaWJpbGl0eV9vZmYnIDogJ3Zpc2liaWxpdHknXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICBAY2xpY2s9XCJpc1B3ZCA9ICFpc1B3ZFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJzaWduVXBGb3JtLmNvbmZpcm1QYXNzXCJcbiAgICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCIkZW1pdCgndXBkYXRlRGF0YScsIHNpZ25VcEZvcm0pXCJcbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgOnR5cGU9XCJpc1B3ZENvbmZpcm0gPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQ29uZmlybSBwYXNzd29yZFwiXG4gICAgICAgICAgICBsYXp5LXJ1bGVzXG4gICAgICAgICAgICA6cnVsZXM9XCJbXG4gICAgICAgICAgICAgICgpID0+XG4gICAgICAgICAgICAgICAgc2lnblVwRm9ybS5wYXNzd29yZCA9PT0gc2lnblVwRm9ybS5jb25maXJtUGFzcyB8fFxuICAgICAgICAgICAgICAgIGBQYXNzd29yZHMgZG9lc24ndCBtYXRjaGAsIC8vIEN1c3RvbSB2YWxpZGF0aW9uIHJ1bGVcbiAgICAgICAgICAgIF1cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6cHJlcGVuZD5cbiAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwibG9ja1wiIC8+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgIDxxLWljb25cbiAgICAgICAgICAgICAgICA6bmFtZT1cImlzUHdkQ29uZmlybSA/ICd2aXNpYmlsaXR5X29mZicgOiAndmlzaWJpbGl0eSdcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgIEBjbGljaz1cImlzUHdkQ29uZmlybSA9ICFpc1B3ZENvbmZpcm1cIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8IS0tIDxxLWNhcmQtc2VjdFxuICAgICAgPjxxLWJ0biBsYWJlbD1cIk5leHRcIiBjb2xvcj1cInByaW1hcnlcIiBAY2xpY2s9XCJ2YWxpZGF0ZUFuZFByb2NlZWRcIlxuICAgIC8+PC9xLWNhcmQtc2VjdD4gLS0+XG4gIDwvcS1jYXJkPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgcmVhY3RpdmUsIG9uTW91bnRlZCB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgY29uZmlybVBhc3MgPSByZWYoXCJcIik7XG5jb25zdCBpc1B3ZCA9IHJlZih0cnVlKTtcbmNvbnN0IGlzUHdkQ29uZmlybSA9IHJlZih0cnVlKTtcbmNvbnN0IGFsdFRleHQgPSBcIlByb2ZpbGUgUGljdHVyZVwiOyAvLyBEZWZhdWx0IGFsdCB0ZXh0XG5jb25zdCBzaXplID0gcmVmKDE1MCk7IC8vIERlZmF1bHQgc2l6ZVxuY29uc3QgaG92ZXJlZCA9IHJlZihmYWxzZSk7XG5jb25zdCBpbWFnZVVybCA9IHJlZihcImh0dHBzOi8vY2RuLnF1YXNhci5kZXYvaW1nL2JveS1hdmF0YXIucG5nXCIpOyAvLyBEZWZhdWx0IGltYWdlIFVSTFxuXG5kZWZpbmVFbWl0cyhbXCJ1cGRhdGVEYXRhXCJdKTtcbmNvbnN0IHsgdXNlckRhdGEgfSA9IGRlZmluZVByb3BzKFtcInVzZXJEYXRhXCJdKTtcblxuY29uc3Qgc2lnblVwRm9ybSA9IHJlYWN0aXZlKHtcbiAgZW1haWw6IFwiXCIsXG4gIHBhc3N3b3JkOiBcIlwiLFxuICBjb25maXJtUGFzczogXCJcIixcbn0pO1xuXG5vbk1vdW50ZWQoKCkgPT4ge1xuICBPYmplY3QuYXNzaWduKHNpZ25VcEZvcm0sIHVzZXJEYXRhKTtcbn0pO1xuXG5jb25zdCBoYW5kbGVJbWFnZUVycm9yID0gKCkgPT4ge1xuICAvLyBIYW5kbGUgaW1hZ2UgbG9hZGluZyBlcnJvciBieSB1cGRhdGluZyB0aGUgaW1hZ2UgVVJMXG4gIGltYWdlVXJsLnZhbHVlID0gXCJodHRwczovL2Nkbi5xdWFzYXIuZGV2L2ltZy9ib3ktYXZhdGFyLnBuZ1wiOyAvLyBEZWZhdWx0IGltYWdlIFVSTFxufTtcblxuY29uc3QgZWRpdEltYWdlID0gKCkgPT4ge1xuICAvLyBMb2dpYyBmb3IgZWRpdGluZyB0aGUgaW1hZ2UgKGUuZy4sIG9wZW4gYSBtb2RhbCBvciBuYXZpZ2F0ZSB0byBhbiBlZGl0IHBhZ2UpXG4gIGNvbnNvbGUubG9nKFwiRWRpdCBpbWFnZSBjbGlja2VkXCIpO1xufTtcblxuY29uc3QgaGFuZGxlRmlsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICBjb25zdCBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzWzBdO1xuICBpZiAoZmlsZSkge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGltYWdlVXJsLnZhbHVlID0gcmVhZGVyLnJlc3VsdDsgLy8gVXBkYXRlIHRoZSBpbWFnZSBVUkwgd2l0aCB0aGUgZGF0YSBVUkwgb2YgdGhlIHNlbGVjdGVkIGZpbGVcbiAgICB9O1xuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICB9XG59O1xuPC9zY3JpcHQ+XG48c3R5bGUgc2NvcGVkPlxuLnByb2ZpbGUtcGljdHVyZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBib3JkZXItcmFkaXVzOiA1MCU7IC8qIFNldCBib3JkZXItcmFkaXVzIHRvIDUwJSBmb3IgYSBjaXJjdWxhciBhdmF0YXIgKi9cbiAgYm9yZGVyOiAzcHggc29saWQgI2ZmZjsgLyogQWRkIGEgYm9yZGVyIHdpdGggd2hpdGUgY29sb3IgKi9cbn1cblxuLnByb2ZpbGUtcGljdHVyZSBpbWcge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xufVxuXG4ub3ZlcmxheSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBvcGFjaXR5OiAwO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZTtcbn1cblxuLm92ZXJsYXk6aG92ZXIge1xuICBvcGFjaXR5OiAxO1xufVxuXG4uZWRpdC1pY29uIHtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDI0cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWNhcmQgZmxhdCBzdHlsZT1cIndpZHRoOiA1MDBweDsgbWF4LXdpZHRoOiA4MHZ3XCI+XG4gICAgPGRpdiBjbGFzcz1cInEtbXktbWRcIj5cbiAgICAgIDxxLWlucHV0XG4gICAgICAgIGRlbnNlXG4gICAgICAgIHJvdW5kZWRcbiAgICAgICAgb3V0bGluZWRcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggZW1wbG95ZWVcIlxuICAgICAgICB2LW1vZGVsPVwic2VhcmNoS2V5d29yZFwiXG4gICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJzZWFyY2hcIlxuICAgICAgICBkZWJvdW5jZT1cIjUwMFwiXG4gICAgICA+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICAgIDxxLWljb24gbmFtZT1cInNlYXJjaFwiPjwvcS1pY29uPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8ZGl2IHYtaWY9XCJzZWFyY2hLZXl3b3JkXCIgY2xhc3M9XCJjdXN0b20tbGlzdCB6LXRvcFwiPlxuICAgICAgICAgIDxxLWNhcmQ+XG4gICAgICAgICAgICA8cS1saXN0IHNlcGFyYXRvcj5cbiAgICAgICAgICAgICAgPHEtaXRlbSB2LWlmPVwiIWVtcGxveWVlcz8ubGVuZ3RoXCI+IE5vIEVtcGxveWVlIFJlY29yZCA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtXG4gICAgICAgICAgICAgICAgICBAY2xpY2s9XCJhdXRvRmlsbEVtcGxveWVlKGVtcGxveWVlKVwiXG4gICAgICAgICAgICAgICAgICB2LWZvcj1cImVtcGxveWVlIGluIGVtcGxveWVlc1wiXG4gICAgICAgICAgICAgICAgICA6a2V5PVwiZW1wbG95ZWUuaWRcIlxuICAgICAgICAgICAgICAgICAgY2xpY2thYmxlXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICB7eyBmb3JtYXRGdWxsbmFtZShlbXBsb3llZSkgfX1cbiAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3EtbGlzdD5cbiAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtaW5wdXQ+XG4gICAgPC9kaXY+XG4gICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXktc21cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXktc20gcS1teC1hdXRvXCI+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIGNsYXNzPVwidGV4dC1jYXBpdGFsaXplXCJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJ1c2VyUGVyc29uYWxJbmZvRm9ybS51c2VyX2ZpcnN0X25hbWVcIlxuICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIiRlbWl0KCd1cGRhdGVEYXRhJywgdXNlclBlcnNvbmFsSW5mb0Zvcm0pXCJcbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgIGxhYmVsPVwiRmlyc3QgTmFtZVwiXG4gICAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCkgfHwgJ1JlcXVpcmVkJ11cIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIGNsYXNzPVwidGV4dC1jYXBpdGFsaXplXCJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJ1c2VyUGVyc29uYWxJbmZvRm9ybS51c2VyX21pZGRsZV9uYW1lXCJcbiAgICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCIkZW1pdCgndXBkYXRlRGF0YScsIHVzZXJQZXJzb25hbEluZm9Gb3JtKVwiXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBsYWJlbD1cIk1pZGRsZSBOYW1lXCJcbiAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnUmVxdWlyZWQnXVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgY2xhc3M9XCJ0ZXh0LWNhcGl0YWxpemVcIlxuICAgICAgICAgICAgdi1tb2RlbD1cInVzZXJQZXJzb25hbEluZm9Gb3JtLnVzZXJfbGFzdF9uYW1lXCJcbiAgICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCIkZW1pdCgndXBkYXRlRGF0YScsIHVzZXJQZXJzb25hbEluZm9Gb3JtKVwiXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICBsYWJlbD1cIkxhc3QgTmFtZVwiXG4gICAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCkgfHwgJ1JlcXVpcmVkJ11cIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIGNsYXNzPVwidGV4dC1jYXBpdGFsaXplXCJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJ1c2VyUGVyc29uYWxJbmZvRm9ybS51c2VyX2FkZHJlc3NcIlxuICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIiRlbWl0KCd1cGRhdGVEYXRhJywgdXNlclBlcnNvbmFsSW5mb0Zvcm0pXCJcbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgIGxhYmVsPVwiQWRkcmVzc1wiXG4gICAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCkgfHwgJ1JlcXVpcmVkJ11cIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLXgtc20gaXRlbS1zdGFydFwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICB2LW1vZGVsPVwidXNlclBlcnNvbmFsSW5mb0Zvcm0udXNlcl9iaXJ0aGRhdGVcIlxuICAgICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwiJGVtaXQoJ3VwZGF0ZURhdGEnLCB1c2VyUGVyc29uYWxJbmZvRm9ybSlcIlxuICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgICBsYWJlbD1cIkJpcnRoZGF0ZVwiXG4gICAgICAgICAgICAgIHR5cGU9XCJkYXRlXCJcbiAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMjMwcHhcIlxuICAgICAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCkgfHwgJ1JlcXVpcmVkJ11cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInVzZXJQZXJzb25hbEluZm9Gb3JtLnVzZXJfc2V4XCJcbiAgICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIiRlbWl0KCd1cGRhdGVEYXRhJywgdXNlclBlcnNvbmFsSW5mb0Zvcm0pXCJcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgbGFiZWw9XCJTZXhcIlxuICAgICAgICAgICAgICA6b3B0aW9ucz1cImdlbmRlck9wdGlvbnNcIlxuICAgICAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCkgfHwgJ1JlcXVpcmVkJ11cIlxuICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMjBweFwiXG4gICAgICAgICAgICAgIGJlaGF2aW9yPVwibWVudVwiXG4gICAgICAgICAgICAgIGhpZGUtZHJvcGRvd24taWNvblxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8IS0tIDxkaXY+XG4gICAgICAgICAgICA8cS1zZWxlY3RcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInVzZXJQZXJzb25hbEluZm9Gb3JtLnVzZXJfc3RhdHVzXCJcbiAgICAgICAgICAgICAgOm9wdGlvbnM9XCJzdGF0dXNPcHRpb25zXCJcbiAgICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIiRlbWl0KCd1cGRhdGVEYXRhJywgdXNlclBlcnNvbmFsSW5mb0Zvcm0pXCJcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgaGlkZS1kcm9wZG93bi1pY29uXG4gICAgICAgICAgICAgIGxhYmVsPVwiU3RhdHVzXCJcbiAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTAwcHhcIlxuICAgICAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCkgfHwgJ1JlcXVpcmVkJ11cIlxuICAgICAgICAgICAgICBiZWhhdmlvcj1cIm1lbnVcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj4gLS0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLXgtbWRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInVzZXJQZXJzb25hbEluZm9Gb3JtLnVzZXJfcGhvbmVfbnVtYmVyXCJcbiAgICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIiRlbWl0KCd1cGRhdGVEYXRhJywgdXNlclBlcnNvbmFsSW5mb0Zvcm0pXCJcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgbGFiZWw9XCJQaG9uZSBOdW1iZXJcIlxuICAgICAgICAgICAgICBtYXNrPVwiKyg2MykgIyMjIC0gIyMjIC0gIyMjI1wiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiKCs2MykgIyMjIC0gIyMjIC0gIyMjI1wiXG4gICAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnUmVxdWlyZWQnXVwiXG4gICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDMwMHB4OyBtYXgtd2lkdGg6IDUwMHB4OyBtaW4td2lkdGg6IDEwMHB4XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJ1c2VyUGVyc29uYWxJbmZvRm9ybS51c2VyX3Bvc2l0aW9uXCJcbiAgICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIiRlbWl0KCd1cGRhdGVEYXRhJywgdXNlclBlcnNvbmFsSW5mb0Zvcm0pXCJcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgaGlkZS1kcm9wZG93bi1pY29uXG4gICAgICAgICAgICAgIGxhYmVsPVwiUG9zaXRpb25cIlxuICAgICAgICAgICAgICA6b3B0aW9ucz1cInBvc2l0aW9uT3B0aW9uc1wiXG4gICAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnUmVxdWlyZWQnXVwiXG4gICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDE1MHB4OyBtYXgtd2lkdGg6IDUwMHB4OyBtaW4td2lkdGg6IDEwMHB4XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PkRlc2lnbmF0aW9uPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXIteC1tZFwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICB2LW1vZGVsPVwidXNlclBlcnNvbmFsSW5mb0Zvcm0udXNlcl9icmFuY2hfbmFtZVwiXG4gICAgICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCIkZW1pdCgndXBkYXRlRGF0YScsIHVzZXJQZXJzb25hbEluZm9Gb3JtKVwiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgdXNlLWlucHV0XG4gICAgICAgICAgICAgIGNsZWFyYWJsZVxuICAgICAgICAgICAgICBpbnB1dC1kZWJvdW5jZT1cIjBcIlxuICAgICAgICAgICAgICA6b3B0aW9ucz1cImZpbHRlckJyYW5jaE9wdGlvbnNcIlxuICAgICAgICAgICAgICBsYWJlbD1cIkJyYW5jaFwiXG4gICAgICAgICAgICAgIEBmaWx0ZXI9XCJmaWx0ZXJlZEJyYW5jaGVzXCJcbiAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMjUwcHg7IG1heC13aWR0aDogNTAwcHg7IG1pbi13aWR0aDogMTAwcHhcIlxuICAgICAgICAgICAgICBoaWRlLWRyb3Bkb3duLWljb25cbiAgICAgICAgICAgICAgYmVoYXZpb3I9XCJtZW51XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJ1c2VyUGVyc29uYWxJbmZvRm9ybS51c2VyX3RpbWVfc2hpZnRcIlxuICAgICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwiJGVtaXQoJ3VwZGF0ZURhdGEnLCB1c2VyUGVyc29uYWxJbmZvRm9ybSlcIlxuICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICAgIG1hc2s9XCIjIzojIyBBQVwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiVGltZSBTY2hlZHVsZVwiXG4gICAgICAgICAgICAgIDpydWxlcz1cInZhbGlkaWRhdGVUaW1lXCJcbiAgICAgICAgICAgICAgaGludD1cIkZvcm1hdDogMDE6MDAgQU0vUE1cIlxuICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAyMDBweDsgbWF4LXdpZHRoOiA1MDBweDsgbWluLXdpZHRoOiAxMDBweFwiXG4gICAgICAgICAgICAgIGhpZGUtZHJvcGRvd24taWNvblxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICA8L3EtY2FyZD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VCcmFuY2hlc1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvYnJhbmNoXCI7XG5pbXBvcnQgeyB1c2VFbXBsb3llZVN0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvZW1wbG95ZWVcIjtcbmltcG9ydCB7IGNvbXB1dGVkLCBvbk1vdW50ZWQsIHJlYWN0aXZlLCByZWYgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IGVtaXQgPSBkZWZpbmVFbWl0cyhbXCJ1cGRhdGVEYXRhXCJdKTtcbmNvbnN0IHsgdXNlckRhdGEgfSA9IGRlZmluZVByb3BzKHtcbiAgdXNlckRhdGE6IHtcbiAgICB0eXBlOiBPYmplY3QsXG4gICAgZGVmYXVsdDogKCkgPT4gKHt9KSxcbiAgfSxcbn0pO1xuXG5jb25zdCBlbXBsb3llZVN0b3JlID0gdXNlRW1wbG95ZWVTdG9yZSgpO1xuY29uc3Qgc2VhcmNoS2V5d29yZCA9IHJlZihcIlwiKTtcblxuY29uc3QgZW1wbG95ZWVzID0gY29tcHV0ZWQoKCkgPT4gZW1wbG95ZWVTdG9yZS5lbXBsb3llZXMpO1xuY29uc3Qgc2VhcmNoID0gYXN5bmMgKCkgPT4ge1xuICBpZiAoc2VhcmNoS2V5d29yZC52YWx1ZS50cmltKCkpIHtcbiAgICBhd2FpdCBlbXBsb3llZVN0b3JlLnNlYXJjaEVtcGxveWVlc1dpdGhEZXNpZ25hdGlvbihzZWFyY2hLZXl3b3JkLnZhbHVlKTtcbiAgfVxufTtcblxuY29uc3QgZm9ybWF0RnVsbG5hbWUgPSAocm93KSA9PiB7XG4gIGNvbnN0IGNhcGl0YWxpemUgPSAoc3RyKSA9PlxuICAgIHN0ciA/IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKS50b0xvd2VyQ2FzZSgpIDogXCJcIjtcblxuICBjb25zdCBmaXJzdG5hbWUgPSByb3cuZmlyc3RuYW1lID8gY2FwaXRhbGl6ZShyb3cuZmlyc3RuYW1lKSA6IFwiTm8gRmlyc3RuYW1lXCI7XG4gIGNvbnN0IG1pZGRsZW5hbWUgPSByb3cubWlkZGxlbmFtZVxuICAgID8gY2FwaXRhbGl6ZShyb3cubWlkZGxlbmFtZSkuY2hhckF0KDApICsgXCIuXCJcbiAgICA6IFwiXCI7XG4gIGNvbnN0IGxhc3RuYW1lID0gcm93Lmxhc3RuYW1lID8gY2FwaXRhbGl6ZShyb3cubGFzdG5hbWUpIDogXCJObyBMYXN0bmFtZVwiO1xuXG4gIHJldHVybiBgJHtmaXJzdG5hbWV9ICR7bWlkZGxlbmFtZX0gJHtsYXN0bmFtZX1gO1xufTtcblxuY29uc3QgZm9ybWFUaW1lU2hpZnQgPSAodGltZVNoaWZ0KSA9PiB7XG4gIGlmICghdGltZVNoaWZ0KSByZXR1cm4gXCJOb3QgQXBwbGljYWJsZVwiO1xuXG4gIGNvbnN0IFtob3VycywgbWludXRlc10gPSB0aW1lU2hpZnQuc3BsaXQoXCI6XCIpO1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgZGF0ZS5zZXRIb3Vycyhob3VycywgbWludXRlcyk7XG5cbiAgcmV0dXJuIGRhdGUudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7XG4gICAgaG91cjogXCIyLWRpZ2l0XCIsXG4gICAgbWludXRlOiBcIjItZGlnaXRcIixcbiAgICBob3VyMTI6IHRydWUsXG4gIH0pO1xufTtcblxuY29uc3QgYXV0b0ZpbGxFbXBsb3llZSA9IChlbXBsb3llZSkgPT4ge1xuICB1c2VyUGVyc29uYWxJbmZvRm9ybS5lbXBsb3llZV9pZCA9IGVtcGxveWVlLmlkIHx8IFwiTm90IEF2YWlsYWJsZVwiO1xuICB1c2VyUGVyc29uYWxJbmZvRm9ybS51c2VyX2ZpcnN0X25hbWUgPSBlbXBsb3llZS5maXJzdG5hbWUgfHwgXCJcIjtcbiAgdXNlclBlcnNvbmFsSW5mb0Zvcm0udXNlcl9taWRkbGVfbmFtZSA9IGVtcGxveWVlLm1pZGRsZW5hbWUgfHwgXCJcIjtcbiAgdXNlclBlcnNvbmFsSW5mb0Zvcm0udXNlcl9sYXN0X25hbWUgPSBlbXBsb3llZS5sYXN0bmFtZSB8fCBcIlwiO1xuICB1c2VyUGVyc29uYWxJbmZvRm9ybS51c2VyX2FkZHJlc3MgPSBlbXBsb3llZS5hZGRyZXNzIHx8IFwiTm8gQWRkcmVzc1wiO1xuICB1c2VyUGVyc29uYWxJbmZvRm9ybS51c2VyX2JpcnRoZGF0ZSA9IGVtcGxveWVlLmJpcnRoZGF0ZSB8fCBcIk5vdCBQcm92aWRlZFwiO1xuICB1c2VyUGVyc29uYWxJbmZvRm9ybS51c2VyX3NleCA9IGVtcGxveWVlLnNleCB8fCBcIlVua25vd25cIjtcbiAgdXNlclBlcnNvbmFsSW5mb0Zvcm0udXNlcl9waG9uZV9udW1iZXIgPSBlbXBsb3llZS5waG9uZSB8fCBcIk5vIFBob25lXCI7XG4gIHVzZXJQZXJzb25hbEluZm9Gb3JtLnVzZXJfcG9zaXRpb24gPSBlbXBsb3llZS5wb3NpdGlvbiB8fCBcIk5vdCBBc3NpZ25lZFwiO1xuICB1c2VyUGVyc29uYWxJbmZvRm9ybS51c2VyX2JyYW5jaF9uYW1lID1cbiAgICBlbXBsb3llZS5icmFuY2hfZW1wbG95ZWU/LmJyYW5jaD8ubmFtZSB8fCBcIk5vdCBBcHBsaWNhYmxlXCI7XG4gIHVzZXJQZXJzb25hbEluZm9Gb3JtLnVzZXJfdGltZV9zaGlmdCA9IGVtcGxveWVlLmJyYW5jaF9lbXBsb3llZT8udGltZV9zaGlmdFxuICAgID8gZm9ybWFUaW1lU2hpZnQoZW1wbG95ZWUuYnJhbmNoX2VtcGxveWVlPy50aW1lX3NoaWZ0KVxuICAgIDogXCJOb3QgQXBwbGljYWJsZVwiO1xuXG4gIHNlYXJjaEtleXdvcmQudmFsdWUgPSBcIlwiO1xuICBlbWl0KFwidXBkYXRlRGF0YVwiLCB1c2VyUGVyc29uYWxJbmZvRm9ybSk7IC8vIFVzZSBlbWl0IGluc3RlYWQgb2YgJGVtaXRcbn07XG5cbmNvbnN0IHVzZXJQZXJzb25hbEluZm9Gb3JtID0gcmVhY3RpdmUoe1xuICBlbXBsb3llZV9pZDogXCJcIixcbiAgdXNlcl9maXJzdF9uYW1lOiBcIlwiLFxuICB1c2VyX21pZGRsZV9uYW1lOiBcIlwiLFxuICB1c2VyX2xhc3RfbmFtZTogXCJcIixcbiAgdXNlcl9hZGRyZXNzOiBcIlwiLFxuICB1c2VyX2JpcnRoZGF0ZTogXCJcIixcbiAgdXNlcl9zZXg6IFwiXCIsXG4gIHVzZXJfcGhvbmVfbnVtYmVyOiBcIlwiLFxuICB1c2VyX3Bvc2l0aW9uOiBcIlwiLFxuICB1c2VyX2JyYW5jaF9uYW1lOiBcIlwiLFxuICB1c2VyX3RpbWVfc2hpZnQ6IFwiXCIsXG59KTtcblxuY29uc29sZS5sb2coXCJ1c2VyUGVyc29uYWxJbmZvRm9ybTpcIiwgdXNlclBlcnNvbmFsSW5mb0Zvcm0pO1xub25Nb3VudGVkKCgpID0+IHtcbiAgT2JqZWN0LmFzc2lnbih1c2VyUGVyc29uYWxJbmZvRm9ybSwgdXNlckRhdGEpO1xufSk7XG5cbi8vIEZ1bmN0aW9uIHRvIGVtaXQgdXBkYXRlZCBkYXRhXG5jb25zdCBlbWl0VXBkYXRlRGF0YSA9ICgpID0+IHtcbiAgZW1pdChcInVwZGF0ZURhdGFcIiwgdXNlclBlcnNvbmFsSW5mb0Zvcm0pO1xufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+PC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtY2FyZCBmbGF0PlxuICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+VXNlciBQcm9maWxlPC9kaXY+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICA8ZGl2IHYtZm9yPVwiKGluZm8sIGluZGV4KSBpbiBwcm9maWxlSW5mb1wiIDprZXk9XCJpbmRleFwiIGNsYXNzPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNlwiPlxuICAgICAgICAgIDxxLWNoaXAgc3F1YXJlIGNvbG9yPVwiZ3JleS0xXCI+e3sgaW5mby5sYWJlbCB9fTwvcS1jaGlwPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC02XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtcGEtc21cIj57eyBpbmZvLnZhbHVlIH19PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgPC9xLWNhcmQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IHsgdXNlckRhdGEgfSA9IGRlZmluZVByb3BzKFtcInVzZXJEYXRhXCJdKTtcbmNvbnN0IHsgc2F2ZSB9ID0gZGVmaW5lRW1pdHMoW1wic2F2ZVwiXSk7XG5jb25zb2xlLmxvZyhcInVzZXIgZGF0YVwiLCB1c2VyRGF0YSk7XG5cbmZ1bmN0aW9uIGZvcm1hdEFkZHJlc3MocmF3QWRkcmVzcykge1xuICAvLyBVc2UgcmVnZXggdG8gbWF0Y2ggd29yZHMgYW5kIHJldGFpbiBzcGVjaWZpYyBjaGFyYWN0ZXJzXG4gIHJldHVybiByYXdBZGRyZXNzXG4gICAgLnNwbGl0KC9bXFxzLF0rLykgLy8gU3BsaXQgYnkgc3BhY2VzIGFuZCBjb21tYXNcbiAgICAubWFwKChwYXJ0KSA9PiB7XG4gICAgICAvLyBDYXBpdGFsaXplIHRoZSBmaXJzdCBsZXR0ZXIgb2YgdGhlIHBhcnRcbiAgICAgIGNvbnN0IGZvcm1hdHRlZFBhcnQgPSBwYXJ0XG4gICAgICAgIC5zcGxpdCgvKFsuLV0rKS8pIC8vIFNwbGl0IHRoZSBwYXJ0IGJ1dCBrZWVwIHRoZSBjaGFyYWN0ZXJzIGxpa2UgLiBhbmQgLVxuICAgICAgICAubWFwKFxuICAgICAgICAgICh3b3JkKSA9PiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICkgLy8gQ2FwaXRhbGl6ZSBlYWNoIHdvcmRcbiAgICAgICAgLmpvaW4oXCJcIik7IC8vIEpvaW4gYmFjayB0aGUgcGFydHMgdG9nZXRoZXJcbiAgICAgIHJldHVybiBmb3JtYXR0ZWRQYXJ0O1xuICAgIH0pXG4gICAgLmpvaW4oXCIgXCIpOyAvLyBKb2luIHdpdGggYSBzcGFjZSBiZXR3ZWVuIHBhcnRzXG59XG5cbmNvbnN0IHByb2ZpbGVJbmZvID0gY29tcHV0ZWQoKCkgPT4gW1xuICB7IGxhYmVsOiBcIlVzZXJuYW1lOlwiLCB2YWx1ZTogYCR7dXNlckRhdGEuZW1haWx9QGdtYWlsLmNvbWAgfSxcbiAge1xuICAgIGxhYmVsOiBcIkZ1bGwgTmFtZTpcIixcbiAgICB2YWx1ZTogYCR7dXNlckRhdGEudXNlcl9maXJzdF9uYW1lXG4gICAgICAuY2hhckF0KDApXG4gICAgICAudG9VcHBlckNhc2UoKX0ke3VzZXJEYXRhLnVzZXJfZmlyc3RfbmFtZS5zbGljZShcbiAgICAgIDFcbiAgICApfSAke3VzZXJEYXRhLnVzZXJfbWlkZGxlX25hbWVcbiAgICAgIC5jaGFyQXQoMClcbiAgICAgIC50b1VwcGVyQ2FzZSgpfSR7dXNlckRhdGEudXNlcl9taWRkbGVfbmFtZS5zbGljZShcbiAgICAgIDFcbiAgICApfSAke3VzZXJEYXRhLnVzZXJfbGFzdF9uYW1lXG4gICAgICAuY2hhckF0KDApXG4gICAgICAudG9VcHBlckNhc2UoKX0ke3VzZXJEYXRhLnVzZXJfbGFzdF9uYW1lLnNsaWNlKDEpfWAsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogXCJBZGRyZXNzOlwiLFxuICAgIHZhbHVlOiBmb3JtYXRBZGRyZXNzKHVzZXJEYXRhLnVzZXJfYWRkcmVzcyksXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogXCJCaXJ0aGRhdGU6XCIsXG4gICAgdmFsdWU6XG4gICAgICB1c2VyRGF0YS51c2VyX2JpcnRoZGF0ZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArXG4gICAgICB1c2VyRGF0YS51c2VyX2JpcnRoZGF0ZS5zbGljZSgxKSxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiBcIlNleDpcIixcbiAgICB2YWx1ZTpcbiAgICAgIHVzZXJEYXRhLnVzZXJfc2V4LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdXNlckRhdGEudXNlcl9zZXguc2xpY2UoMSksXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogXCJQb3NpdGlvbjpcIixcbiAgICB2YWx1ZTogYCR7XG4gICAgICB1c2VyRGF0YS51c2VyX3Bvc2l0aW9uLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICtcbiAgICAgIHVzZXJEYXRhLnVzZXJfcG9zaXRpb24uc2xpY2UoMSlcbiAgICB9YCxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiBcIlBob25lIE51bWJlcjpcIixcbiAgICB2YWx1ZTpcbiAgICAgIHVzZXJEYXRhLnVzZXJfcGhvbmVfbnVtYmVyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICtcbiAgICAgIHVzZXJEYXRhLnVzZXJfcGhvbmVfbnVtYmVyLnNsaWNlKDEpLFxuICB9LFxuICB7XG4gICAgbGFiZWw6IFwiUG9zaXRpb246XCIsXG4gICAgdmFsdWU6XG4gICAgICB1c2VyRGF0YS51c2VyX3Bvc2l0aW9uLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICtcbiAgICAgIHVzZXJEYXRhLnVzZXJfcG9zaXRpb24uc2xpY2UoMSksXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogXCJEZXNpZ25hdGlvbjpcIixcbiAgICB2YWx1ZTogdXNlckRhdGEudXNlcl9wb3NpdGlvbiB8fCBcIlwiLFxuICB9LFxuICB7XG4gICAgbGFiZWw6IFwiQnJhbmNoOlwiLFxuICAgIHZhbHVlOiB1c2VyRGF0YS51c2VyX2JyYW5jaF9uYW1lIHx8IFwiXCIsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogXCJUaW1lIFNoaWZ0OlwiLFxuICAgIHZhbHVlOiB1c2VyRGF0YS51c2VyX3RpbWVfc2hpZnQgfHwgXCJcIixcbiAgfSxcbl0pO1xuXG5jb25zdCBzYXZlVXNlclByb2ZpbGUgPSAoKSA9PiB7XG4gIGVtaXQoXCJzYXZlXCIpO1xufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+PC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8cS1idG5cbiAgICAgIGNsYXNzPVwidGV4dC1kYXJrIHEtcGEtc21cIlxuICAgICAgb3V0bGluZVxuICAgICAgaWNvbj1cImFkZF9jaXJjbGVcIlxuICAgICAgbGFiZWw9XCJBZGQgVXNlclwiXG4gICAgICBAY2xpY2s9XCJvcGVuRGlhbG9nXCJcbiAgICAvPlxuICA8L2Rpdj5cbiAgPHEtZGlhbG9nIHYtbW9kZWw9XCJkaWFsb2dcIiBwZXJzaXN0ZW50IGZ1bGwtaGVpZ2h0PlxuICAgIDxxLWNhcmQ+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1tYS14bVwiIGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgPHEtYnRuIGNsYXNzPVwicS1tYS1zbVwiIGljb249XCJjbG9zZVwiIGZsYXQgZGVuc2Ugcm91bmQgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8cS1zdGVwcGVyXG4gICAgICAgICAgY2xhc3M9XCJcIlxuICAgICAgICAgIHYtbW9kZWw9XCJzdGVwXCJcbiAgICAgICAgICByZWY9XCJzdGVwcGVyXCJcbiAgICAgICAgICBhbmltYXRlZFxuICAgICAgICAgIGRvbmUtY29sb3I9XCJncmVlblwiXG4gICAgICAgICAgYWN0aXZlLWNvbG9yPVwiYmx1ZVwiXG4gICAgICAgICAgaW5hY3RpdmUtY29sb3I9XCJncmV5XCJcbiAgICAgICAgICBmbGF0XG4gICAgICAgICAgYWxpZ249XCJjZW50ZXJcIlxuICAgICAgICA+XG4gICAgICAgICAgPHEtc3RlcCA6bmFtZT1cIjFcIiB0aXRsZT1cIlNpZ24gVXBcIiBpY29uPVwic2V0dGluZ3NcIiA6ZG9uZT1cInN0ZXAgPiAxXCI+XG4gICAgICAgICAgICA8VXNlclN0ZXAxIEB1cGRhdGVEYXRhPVwic2V0VXNlclwiIDp1c2VyRGF0YT1cInVzZXJcIiAvPlxuICAgICAgICAgIDwvcS1zdGVwPlxuICAgICAgICAgIDxxLXN0ZXBcbiAgICAgICAgICAgIDpuYW1lPVwiMlwiXG4gICAgICAgICAgICB0aXRsZT1cIlBlcnNvbmFsIEluZm9cIlxuICAgICAgICAgICAgaWNvbj1cInNldHRpbmdzXCJcbiAgICAgICAgICAgIDpkb25lPVwic3RlcCA+IDJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxVc2VyU3RlcDIgQHVwZGF0ZURhdGE9XCJzZXRVc2VySW5mb1wiIDp1c2VyRGF0YT1cInVzZXJJbmZvXCIgLz5cbiAgICAgICAgICA8L3Etc3RlcD5cbiAgICAgICAgICA8cS1zdGVwXG4gICAgICAgICAgICA6bmFtZT1cIjNcIlxuICAgICAgICAgICAgdGl0bGU9XCJDaGVja2VkIFBlcnNvbmFsIEluZm9cIlxuICAgICAgICAgICAgaWNvbj1cInNldHRpbmdzXCJcbiAgICAgICAgICAgIDpkb25lPVwic3RlcCA+IDNcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxVc2VyU3RlcEZpbmlzaCA6dXNlckRhdGE9XCJjb21iaW5lZFVzZXJEYXRhXCIgQHNhdmU9XCJzYXZlVXNlclwiIC8+XG4gICAgICAgICAgPC9xLXN0ZXA+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpuYXZpZ2F0aW9uPlxuICAgICAgICAgICAgPHEtc3RlcHBlci1uYXZpZ2F0aW9uIGNsYXNzPVwicS1tYS1ub25lXCI+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgICB2LWlmPVwic3RlcCA+IDFcIlxuICAgICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgIEBjbGljaz1cIiRyZWZzLnN0ZXBwZXIucHJldmlvdXMoKVwiXG4gICAgICAgICAgICAgICAgICBsYWJlbD1cIkJhY2tcIlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJxLW1sLXNtXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgOmRpc2FibGU9XCJpc0Rpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgIEBjbGljaz1cIm5leHRTdGVwXCJcbiAgICAgICAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICA6bGFiZWw9XCJzdGVwID09PSAzID8gJ1NhdmUnIDogJ0NvbnRpbnVlJ1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3Etc3RlcHBlci1uYXZpZ2F0aW9uPlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDwvcS1zdGVwcGVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFVzZXJTdGVwMSBmcm9tIFwiLi91c2Vyc19jcmVhdGVfY29tcG9uZW50L1VzZXJTdGVwMS52dWVcIjtcbmltcG9ydCBVc2VyU3RlcDIgZnJvbSBcIi4vdXNlcnNfY3JlYXRlX2NvbXBvbmVudC9Vc2VyU3RlcDIudnVlXCI7XG5pbXBvcnQgVXNlclN0ZXBGaW5pc2ggZnJvbSBcIi4vdXNlcnNfY3JlYXRlX2NvbXBvbmVudC9Vc2VyU3RlcEZpbmlzaC52dWVcIjtcbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQsIHJlYWN0aXZlIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgdXNlVXNlcnNTdG9yZSB9IGZyb20gXCJzdG9yZXMvdXNlclwiO1xuaW1wb3J0IHsgTG9hZGluZyB9IGZyb20gXCJxdWFzYXJcIjtcblxuY29uc3QgdXNlcnMgPSBjb21wdXRlZCgoKSA9PiB1c2VyU3RvcmUudXNlcnMpO1xuY29uc3QgdXNlclN0b3JlID0gdXNlVXNlcnNTdG9yZSgpO1xuY29uc3Qgc3RlcCA9IHJlZigxKTtcbmNvbnN0IGlzRGlzYWJsZWQgPSByZWYodHJ1ZSk7XG5jb25zdCBsb2FkaW5nID0gcmVmKGZhbHNlKTtcbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IHVzZXIgPSByZWFjdGl2ZSh7XG4gIGVtYWlsOiBcIlwiLFxuICBwYXNzd29yZDogXCJcIixcbiAgY29uZmlybVBhc3M6IFwiXCIsXG59KTtcblxuY29uc3QgdXNlckluZm8gPSByZWFjdGl2ZSh7XG4gIGVtcGxveWVlX2lkOiBcIlwiLFxuICB1c2VyX2ZpcnN0X25hbWU6IFwiXCIsXG4gIHVzZXJfbWlkZGxlX25hbWU6IFwiXCIsXG4gIHVzZXJfbGFzdF9uYW1lOiBcIlwiLFxuICB1c2VyX2FkZHJlc3M6IFwiXCIsXG4gIHVzZXJfYmlydGhkYXRlOiBcIlwiLFxuICB1c2VyX3NleDogXCJcIixcbiAgdXNlcl9waG9uZV9udW1iZXI6IFwiXCIsXG4gIHVzZXJfcG9zaXRpb246IFwiXCIsXG4gIHVzZXJfYnJhbmNoX25hbWU6IFwiXCIsXG4gIHVzZXJfdGltZV9zaGlmdDogXCJcIixcbn0pO1xuXG5jb25zdCBzZXRVc2VyID0gKGRhdGEpID0+IHtcbiAgT2JqZWN0LmFzc2lnbih1c2VyLCBkYXRhKTtcbiAgaXNEaXNhYmxlZC52YWx1ZSA9ICEoXG4gICAgdXNlci5wYXNzd29yZCAmJlxuICAgIHVzZXIuY29uZmlybVBhc3MgJiZcbiAgICB1c2VyLnBhc3N3b3JkID09PSB1c2VyLmNvbmZpcm1QYXNzXG4gICk7XG59O1xuXG5jb25zdCBzZXRVc2VySW5mbyA9IChkYXRhKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwic2V0c3VlciBkYXRhXCIsIGRhdGEpO1xuICBPYmplY3QuYXNzaWduKHVzZXJJbmZvLCBkYXRhKTtcbiAgaXNEaXNhYmxlZC52YWx1ZSA9ICEoXG4gICAgKFxuICAgICAgdXNlckluZm8uZW1wbG95ZWVfaWQgJiZcbiAgICAgIHVzZXJJbmZvLnVzZXJfZmlyc3RfbmFtZSAmJlxuICAgICAgdXNlckluZm8udXNlcl9sYXN0X25hbWUgJiZcbiAgICAgIHVzZXJJbmZvLnVzZXJfYWRkcmVzcyAmJlxuICAgICAgdXNlckluZm8udXNlcl9iaXJ0aGRhdGUgJiZcbiAgICAgIHVzZXJJbmZvLnVzZXJfc2V4ICYmXG4gICAgICB1c2VySW5mby51c2VyX3Bob25lX251bWJlciAmJlxuICAgICAgdXNlckluZm8udXNlcl9wb3NpdGlvbiAmJlxuICAgICAgdXNlckluZm8udXNlcl9icmFuY2hfbmFtZVxuICAgIClcbiAgICAvLyB1c2VySW5mby51c2VyX3RpbWVfc2hpZnRcbiAgKTtcbn07XG5cbmNvbnN0IGNvbWJpbmVkVXNlckRhdGEgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAuLi51c2VyLFxuICAuLi51c2VySW5mbyxcbn0pKTtcblxuY29uc3Qgb3BlbkRpYWxvZyA9ICgpID0+IHtcbiAgZGlhbG9nLnZhbHVlID0gdHJ1ZTtcbn07XG5cbmNvbnN0IG5leHRTdGVwID0gKCkgPT4ge1xuICBpZiAoc3RlcC52YWx1ZSA9PT0gMykge1xuICAgIHNhdmVVc2VyKCk7XG4gIH0gZWxzZSB7XG4gICAgc3RlcC52YWx1ZSsrO1xuICB9XG59O1xuXG5jb25zdCByZXNldEZvcm0gPSAoKSA9PiB7XG4gIHVzZXIuZW1haWwgPSBcIlwiO1xuICB1c2VyLnBhc3N3b3JkID0gXCJcIjtcbiAgdXNlci5jb25maXJtUGFzcyA9IFwiXCI7XG4gIHVzZXJJbmZvLmVtcGxveWVlX2lkID0gXCJcIjtcbiAgdXNlckluZm8udXNlcl9maXJzdF9uYW1lID0gXCJcIjtcbiAgdXNlckluZm8udXNlcl9taWRkbGVfbmFtZSA9IFwiXCI7XG4gIHVzZXJJbmZvLnVzZXJfbGFzdF9uYW1lID0gXCJcIjtcbiAgdXNlckluZm8udXNlcl9hZGRyZXNzID0gXCJcIjtcbiAgdXNlckluZm8udXNlcl9iaXJ0aGRhdGUgPSBcIlwiO1xuICB1c2VySW5mby51c2VyX3NleCA9IFwiXCI7XG4gIHVzZXJJbmZvLnVzZXJfcGhvbmVfbnVtYmVyID0gXCJcIjtcbiAgdXNlckluZm8udXNlcl9wb3NpdGlvbiA9IFwiXCI7XG4gIHVzZXJJbmZvLnVzZXJfYnJhbmNoX25hbWUgPSBcIlwiO1xuICB1c2VySW5mby51c2VyX3RpbWVfc2hpZnQgPSBcIlwiO1xuICBzdGVwLnZhbHVlID0gMTtcbiAgaXNEaXNhYmxlZC52YWx1ZSA9IHRydWU7XG59O1xuXG5jb25zdCBzYXZlVXNlciA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB1c2VyRGF0YSA9IHtcbiAgICAgIGVtcGxveWVlX2lkOiB1c2VySW5mby5lbXBsb3llZV9pZCxcbiAgICAgIGVtYWlsOiBgJHt1c2VyLmVtYWlsfUBnbWFpbC5jb21gLFxuICAgICAgcGFzc3dvcmQ6IHVzZXIucGFzc3dvcmQsXG4gICAgICByb2xlOiB1c2VySW5mby51c2VyX3Bvc2l0aW9uLFxuICAgIH07XG4gICAgY29uc29sZS5sb2coXCJ1c2VyZGF0YSB0byBzZW5kOlwiLCB1c2VyRGF0YSk7XG5cbiAgICBhd2FpdCB1c2VyU3RvcmUucmVnaXN0ZXJVc2VyKHVzZXJEYXRhKTtcbiAgICBkaWFsb2cudmFsdWUgPSBmYWxzZTtcbiAgICByZXNldEZvcm0oKTtcbiAgICB1c2Vycy52YWx1ZSA9IGF3YWl0IHVzZXJTdG9yZS5mZXRjaFVzZXJzKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7fVxufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLnEtc3RlcHBlci0taG9yaXpvbnRhbCAucS1zdGVwcGVyX19zdGVwLWlubmVyIHtcbiAgLS1xLXN0ZXBwZXItc3RlcC1pbm5lci1wYWRkaW5nOiAycHg7IC8qIERlZmluZSB5b3VyIGRlc2lyZWQgcGFkZGluZyAqL1xufVxuLnByb2ZpbGUtY2FyZCB7XG4gIG1heC13aWR0aDogNDAwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuXG4ucHJvZmlsZS1mb3JtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnByb2ZpbGUtcGljdHVyZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxuLmF2YXRhci1pbWFnZSB7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgd2lkdGg6IDE1MHB4O1xuICBoZWlnaHQ6IDE1MHB4O1xufVxuXG4uZmlsZS1pbnB1dCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiA1cHg7XG4gIHJpZ2h0OiA1cHg7XG4gIG9wYWNpdHk6IDA7XG59XG5cbi5mdWxsLXdpZHRoIHtcbiAgd2lkdGg6IDEwMCU7XG59XG4ucS1zdGVwcGVyLS1ob3Jpem9udGFsIC5xLXN0ZXBwZXJfX3N0ZXAtaW5uZXIge1xuICBwYWRkaW5nOiA1cHg7XG59XG48L3N0eWxlPlxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZGFyay91c2UtZGFyay5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmV4cG9ydCBjb25zdCBza2VsZXRvblR5cGVzID0gW1xuICAndGV4dCcsICdyZWN0JywgJ2NpcmNsZScsXG4gICdRQnRuJywgJ1FCYWRnZScsICdRQ2hpcCcsICdRVG9vbGJhcicsXG4gICdRQ2hlY2tib3gnLCAnUVJhZGlvJywgJ1FUb2dnbGUnLFxuICAnUVNsaWRlcicsICdRUmFuZ2UnLCAnUUlucHV0JyxcbiAgJ1FBdmF0YXInXG5dXG5cbmV4cG9ydCBjb25zdCBza2VsZXRvbkFuaW1hdGlvbnMgPSBbXG4gICd3YXZlJywgJ3B1bHNlJywgJ3B1bHNlLXgnLCAncHVsc2UteScsICdmYWRlJywgJ2JsaW5rJywgJ25vbmUnXG5dXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU2tlbGV0b24nLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuXG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZGl2J1xuICAgIH0sXG5cbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gc2tlbGV0b25UeXBlcy5pbmNsdWRlcyh2KSxcbiAgICAgIGRlZmF1bHQ6ICdyZWN0J1xuICAgIH0sXG5cbiAgICBhbmltYXRpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBza2VsZXRvbkFuaW1hdGlvbnMuaW5jbHVkZXModiksXG4gICAgICBkZWZhdWx0OiAnd2F2ZSdcbiAgICB9LFxuICAgIGFuaW1hdGlvblNwZWVkOiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgICBkZWZhdWx0OiAxNTAwXG4gICAgfSxcblxuICAgIHNxdWFyZTogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhbixcblxuICAgIHNpemU6IFN0cmluZyxcbiAgICB3aWR0aDogU3RyaW5nLFxuICAgIGhlaWdodDogU3RyaW5nXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgdm0ucHJveHkuJHEpXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHNpemUgPSBwcm9wcy5zaXplICE9PSB2b2lkIDBcbiAgICAgICAgPyBbIHByb3BzLnNpemUsIHByb3BzLnNpemUgXVxuICAgICAgICA6IFsgcHJvcHMud2lkdGgsIHByb3BzLmhlaWdodCBdXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgICctLXEtc2tlbGV0b24tc3BlZWQnOiBgJHsgcHJvcHMuYW5pbWF0aW9uU3BlZWQgfW1zYCxcbiAgICAgICAgd2lkdGg6IHNpemVbIDAgXSxcbiAgICAgICAgaGVpZ2h0OiBzaXplWyAxIF1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1za2VsZXRvbiBxLXNrZWxldG9uLS0keyBpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnZGFyaycgOiAnbGlnaHQnIH0gcS1za2VsZXRvbi0tdHlwZS0keyBwcm9wcy50eXBlIH1gXG4gICAgICArIChwcm9wcy5hbmltYXRpb24gIT09ICdub25lJyA/IGAgcS1za2VsZXRvbi0tYW5pbSBxLXNrZWxldG9uLS1hbmltLSR7IHByb3BzLmFuaW1hdGlvbiB9YCA6ICcnKVxuICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLXNrZWxldG9uLS1zcXVhcmUnIDogJycpXG4gICAgICArIChwcm9wcy5ib3JkZXJlZCA9PT0gdHJ1ZSA/ICcgcS1za2VsZXRvbi0tYm9yZGVyZWQnIDogJycpXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgocHJvcHMudGFnLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZVxuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiPHRlbXBsYXRlPlxuICA8cS1wYWdlPlxuICAgIDxkaXYgY2xhc3M9XCJxLXBhLW1kIGVsZWdhbnQtY29udGFpbmVyXCI+XG4gICAgICA8ZGl2PlxuICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgIGNsYXNzPVwicS1wYi1sZ1wiXG4gICAgICAgICAgdi1tb2RlbD1cInNlYXJjaFF1ZXJ5XCJcbiAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwic2VhcmNoXCJcbiAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgICAgICBkZWJvdW5jZT1cIjEwMDBcIlxuICAgICAgICAgIGZsYXRcbiAgICAgICAgICBkZW5zZVxuICAgICAgICAgIHJvdW5kZWRcbiAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMDAlOyBtYXgtd2lkdGg6IDYwMHB4XCJcbiAgICAgICAgPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwic2VhcmNoXCIgLz5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiB2LWlmPVwibG9hZGluZ1wiIGNsYXNzPVwic2tlbGV0b24td3JhcHBlciByb3cgcS1jb2wtZ3V0dGVyLW1kXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImNvbC14cy0xMiBjb2wtc20tNiBjb2wtbWQtNCBjb2wtbGctM1wiXG4gICAgICAgICAgdi1mb3I9XCJuIGluIDhcIlxuICAgICAgICAgIDprZXk9XCJuXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxxLWNhcmQgY2xhc3M9XCJ1c2VyLWNhcmQgc2tlbGV0b24tY2FyZFwiPlxuICAgICAgICAgICAgPHEtc2tlbGV0b24gaGVpZ2h0PVwiMjAwcHhcIiBjbGFzcz1cInEtbWItbWRcIiAvPlxuICAgICAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgPHEtc2tlbGV0b24gdHlwZT1cImNpcmNsZVwiIHNpemU9XCI4MHB4XCIgY2xhc3M9XCJxLW1iLW1kXCIgLz5cbiAgICAgICAgICAgICAgPHEtc2tlbGV0b24gdHlwZT1cInRleHRcIiB3aWR0aD1cIjYwJVwiIGNsYXNzPVwicS1tdC1sZ1wiIC8+XG4gICAgICAgICAgICAgIDxxLXNrZWxldG9uIHR5cGU9XCJ0ZXh0XCIgd2lkdGg9XCI0MCVcIiBjbGFzcz1cInEtbXQtc21cIiAvPlxuICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgIDxxLXNlcGFyYXRvciAvPlxuICAgICAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1za2VsZXRvbiB0eXBlPVwidGV4dFwiIHdpZHRoPVwiODAlXCIgY2xhc3M9XCJxLW1iLXNtXCIgLz5cbiAgICAgICAgICAgICAgPHEtc2tlbGV0b24gdHlwZT1cInRleHRcIiB3aWR0aD1cIjYwJVwiIGNsYXNzPVwicS1tYi1zbVwiIC8+XG4gICAgICAgICAgICAgIDxxLXNrZWxldG9uIHR5cGU9XCJ0ZXh0XCIgd2lkdGg9XCI3MCVcIiBjbGFzcz1cInEtbWItc21cIiAvPlxuICAgICAgICAgICAgICA8cS1za2VsZXRvbiB0eXBlPVwidGV4dFwiIHdpZHRoPVwiNTAlXCIgY2xhc3M9XCJxLW1iLXNtXCIgLz5cbiAgICAgICAgICAgICAgPHEtc2tlbGV0b24gdHlwZT1cInRleHRcIiB3aWR0aD1cIjkwJVwiIGNsYXNzPVwicS1tdC1tZFwiIC8+XG4gICAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgPHEtc2VwYXJhdG9yIC8+XG4gICAgICAgICAgICA8cS1jYXJkLWFjdGlvbnMgY2xhc3M9XCJxLXBhLW1kIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgIDxxLXNrZWxldG9uIHR5cGU9XCJyZWN0XCIgd2lkdGg9XCI0MCVcIiBoZWlnaHQ9XCIzNnB4XCIgLz5cbiAgICAgICAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgICAgICAgPC9xLWNhcmQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHYtZWxzZS1pZj1cInNob3dOb0RhdGFNZXNzYWdlXCIgY2xhc3M9XCJkYXRhLWVycm9yXCI+XG4gICAgICAgIDxxLWljb24gbmFtZT1cImVycm9yXCIgc2l6ZT1cIjUwcHhcIiBjb2xvcj1cIm5lZ2F0aXZlXCIgLz5cbiAgICAgICAgPGRpdj5ObyBkYXRhIGF2YWlsYWJsZTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHYtZWxzZSBjbGFzcz1cInEtcGEtbWQgcm93IHEtY29sLWd1dHRlci1tZFwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgdi1mb3I9XCJ1c2VyIGluIHVzZXJzXCJcbiAgICAgICAgICA6a2V5PVwidXNlci5pZFwiXG4gICAgICAgICAgY2xhc3M9XCJjb2wteHMtMTIgY29sLXNtLTYgY29sLW1kLTQgY29sLWxnLTNcIlxuICAgICAgICA+XG4gICAgICAgICAgPHEtY2FyZCBjbGFzcz1cInVzZXItY2FyZFwiPlxuICAgICAgICAgICAgPGltZyBzcmM9XCJodHRwczovL2Nkbi5xdWFzYXIuZGV2L2ltZy9tb3VudGFpbnMuanBnXCIgLz5cbiAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHEtYXZhdGFyXG4gICAgICAgICAgICAgICAgICBpY29uPVwicGVyc29uXCJcbiAgICAgICAgICAgICAgICAgIHNpemU9XCI4MHB4XCJcbiAgICAgICAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICB0ZXh0LWNvbG9yPVwid2hpdGVcIlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJxLW1iLW1kIGFic29sdXRlXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPVwidG9wOiAwOyBsZWZ0OiAxMnB4OyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSlcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1sZ1wiPlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGV4dC1oNiB0ZXh0LXdlaWdodC1tZWRpdW0gZWxlZ2FudC1uYW1lIHRleHQtY2FwaXRhbGl6ZVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3sgZm9ybWF0dGVkVXNlck5hbWUodXNlcikgfX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8cS1jaGlwXG4gICAgICAgICAgICAgICAgICA6Y29sb3I9XCJnZXRCYWRnZVBvc2l0aW9uQ29sb3IodXNlci5yb2xlKVwiXG4gICAgICAgICAgICAgICAgICB0ZXh0LWNvbG9yPVwid2hpdGVcIlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJxLW10LXNtIGVsZWdhbnQtY2hpcFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3sgdXNlci5yb2xlIH19XG4gICAgICAgICAgICAgICAgPC9xLWNoaXA+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgIDxxLXNlcGFyYXRvciBjbGFzcz1cInNlcGFyYXRvciBxLW14LW1kXCIgLz5cbiAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtbWItc20gZWxlZ2FudC1kZXRhaWxcIj5cbiAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJtYWlsXCIgY2xhc3M9XCJxLW1yLXNtXCIgLz5cbiAgICAgICAgICAgICAgICA8cS1wb3B1cC1lZGl0XG4gICAgICAgICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwiKHZhbCkgPT4gb25TYXZlKHVzZXIsIHZhbClcIlxuICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInVzZXIuZW1haWxcIlxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJFZGl0IEVtYWlsXCJcbiAgICAgICAgICAgICAgICAgIHBlcnNpc3RlbnRcbiAgICAgICAgICAgICAgICAgIGF1dG8tc2F2ZVxuICAgICAgICAgICAgICAgICAgYnV0dG9uc1xuICAgICAgICAgICAgICAgICAgbGFiZWwtc2V0PVwiU2F2ZVwiXG4gICAgICAgICAgICAgICAgICBsYWJlbC1jYW5jZWw9XCJDbG9zZVwiXG4gICAgICAgICAgICAgICAgICBmaXRcbiAgICAgICAgICAgICAgICAgIHYtc2xvdD1cInNjb3BlXCJcbiAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24tc2hvdz1cInNjYWxlXCJcbiAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24taGlkZT1cInNjYWxlXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwic2NvcGUudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgICAgICA6cnVsZXM9XCJbZW1haWxSdWxlXVwiXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW1haWxcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInBvcHVwLWlucHV0XCJcbiAgICAgICAgICAgICAgICAgICAgZmlsbGVkXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcmxlc3NcbiAgICAgICAgICAgICAgICAgICAgQGtleXVwLmVudGVyPVwic2NvcGUuc2V0XCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9xLXBvcHVwLWVkaXQ+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZW1haWwtZGlzcGxheVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJlbWFpbC10ZXh0XCI+e3sgdXNlci5lbWFpbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxxLWljb25cbiAgICAgICAgICAgICAgICAgICAgbmFtZT1cImVkaXRcIlxuICAgICAgICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImVkaXQtaWNvbiB0ZXh0LWxpZ2h0LWdyZWVuLTEzXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tYi1zbSBlbGVnYW50LWRldGFpbFwiPlxuICAgICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cImNhbGVuZGFyX3RvZGF5XCIgY2xhc3M9XCJxLW1yLXNtXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj57eyBmb3JtYXREYXRlKHVzZXIuYmlydGhkYXRlKSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW1iLXNtIGVsZWdhbnQtZGV0YWlsXCI+XG4gICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwic21hcnRwaG9uZVwiIGNsYXNzPVwicS1tci1zbVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+e3sgdXNlci5waG9uZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW1iLXNtIGVsZWdhbnQtZGV0YWlsIHRleHQtY2FwaXRhbGl6ZVwiPlxuICAgICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cImxvY2F0aW9uX29uXCIgY2xhc3M9XCJxLW1yLXNtXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj57eyB1c2VyLmFkZHJlc3MgfX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgICAgICAgICAgPCEtLSA8cS1jYXJkLWFjdGlvbnMgY2xhc3M9XCJxLXBhLW1kIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgIGNsYXNzPVwidGV4dC1zdWJ0aXRsZTIgZWxlZ2FudC1idG5cIlxuICAgICAgICAgICAgICAgIG91dGxpbmVcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICBsYWJlbD1cIlZpZXcgUHJvZmlsZVwiXG4gICAgICAgICAgICAgICAgQGNsaWNrPVwiaGFuZGxlVXNlckRpYWxvZyh1c2VyKVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBAY2xpY2s9XCJnb1RvVXNlclByb2ZpbGUodXNlcilcIlxuICAgICAgICAgICAgICA8L3EtYnRuPlxuICAgICAgICAgICAgPC9xLWNhcmQtYWN0aW9ucz4gLS0+XG4gICAgICAgICAgPC9xLWNhcmQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VVc2Vyc1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvdXNlclwiO1xuaW1wb3J0IHsgY29tcHV0ZWQsIG9uTW91bnRlZCwgcmVmLCB3YXRjaCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IGRhdGUsIExvYWRpbmcsIE5vdGlmeSwgdXNlUXVhc2FyLCBRUG9wdXBQcm94eSB9IGZyb20gXCJxdWFzYXJcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJ2dWUtcm91dGVyXCI7XG5pbXBvcnQgVXNlckVkaXRQcm9maWxlIGZyb20gXCIuL1VzZXJFZGl0UHJvZmlsZS52dWVcIjtcblxuY29uc3QgdXNlclN0b3JlID0gdXNlVXNlcnNTdG9yZSgpO1xuY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5jb25zdCBlbWFpbFBvcHVwID0gcmVmKG51bGwpO1xuY29uc3QgJHEgPSB1c2VRdWFzYXIoKTtcbmNvbnN0IHVzZXJzID0gY29tcHV0ZWQoKCkgPT4gdXNlclN0b3JlLnVzZXJzKTtcbmNvbnNvbGUubG9nKFwidXNlcmRhdGFzc3NzcyAgXCIsIHVzZXJzLnZhbHVlKTtcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgYXdhaXQgcmVsb2FkVXNlckRhdGEoKTtcbn0pO1xuXG5jb25zdCByZWxvYWRVc2VyRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgICB1c2Vycy52YWx1ZSA9IGF3YWl0IHVzZXJTdG9yZS5mZXRjaFVzZXJzKCk7XG4gICAgaWYgKCF1c2Vycy52YWx1ZS5sZW5ndGgpIHtcbiAgICAgIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gdHJ1ZTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJVc2Vyc1wiLCB1c2Vycy52YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coXCJlcnJvciBmZXRjaGluZyByZWNpcGU6IFwiLCBlcnJvcik7XG4gICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSB0cnVlO1xuICB9IGZpbmFsbHkge1xuICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgZm9ybWF0RGF0ZSA9IChkYXRlU3RyaW5nKSA9PiB7XG4gIHJldHVybiBkYXRlLmZvcm1hdERhdGUoZGF0ZVN0cmluZywgXCJNTU1NIEQsIFlZWVlcIik7XG59O1xuXG5jb25zdCBmb3JtYXR0ZWRVc2VyTmFtZSA9ICh1c2VyKSA9PiB7XG4gIGlmICghdXNlcikgcmV0dXJuIFwiXCI7IC8vIFJldHVybiBhbiBlbXB0eSBzdHJpbmcgaWYgdXNlciBpcyB1bmRlZmluZWRcblxuICBjb25zdCB7IGZpcnN0bmFtZSwgbWlkZGxlbmFtZSwgbGFzdG5hbWUgfSA9IHVzZXI7XG5cbiAgLy8gU3BsaXQgZmlyc3QgbmFtZSBpZiBpdCBoYXMgbXVsdGlwbGUgd29yZHNcbiAgY29uc3QgZm9ybWF0dGVkRmlyc3ROYW1lID0gZmlyc3RuYW1lXG4gICAgLnNwbGl0KFwiIFwiKVxuICAgIC5tYXAoKG5hbWUpID0+IG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpKVxuICAgIC5qb2luKFwiIFwiKTtcblxuICBjb25zdCBtaWRkbGVJbml0aWFsID0gbWlkZGxlbmFtZVxuICAgID8gYCR7bWlkZGxlbmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKX0uYFxuICAgIDogXCJcIjtcbiAgY29uc3QgbGFzdEluaXRpYWwgPSBsYXN0bmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKTtcblxuICByZXR1cm4gYCR7Zm9ybWF0dGVkRmlyc3ROYW1lfSAke21pZGRsZUluaXRpYWx9ICR7bGFzdEluaXRpYWx9JHtsYXN0bmFtZS5zbGljZShcbiAgICAxXG4gICl9YDtcbn07XG5cbmNvbnN0IGxvYWRpbmcgPSByZWYodHJ1ZSk7XG5jb25zdCBzaG93Tm9EYXRhTWVzc2FnZSA9IHJlZihmYWxzZSk7XG5jb25zdCBzZWFyY2hRdWVyeSA9IHJlZihcIlwiKTtcblxuY29uc3Qgc2VhcmNoID0gYXN5bmMgKCkgPT4ge1xuICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSBmYWxzZTtcbiAgYXdhaXQgdXNlclN0b3JlLnNlYXJjaFVzZXIoc2VhcmNoUXVlcnkudmFsdWUpO1xuICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIC8vIHRyeSB7XG4gIC8vICAgaWYgKHNlYXJjaFF1ZXJ5LnZhbHVlLnRyaW0oKSA9PT0gXCJcIikge1xuICAvLyAgICAgYXdhaXQgdXNlclN0b3JlLmZldGNoVXNlcnMoKTtcbiAgLy8gICB9IGVsc2Uge1xuICAvLyAgICAgYXdhaXQgdXNlclN0b3JlLnNlYXJjaFVzZXIoc2VhcmNoUXVlcnkudmFsdWUpO1xuICAvLyAgIH1cbiAgLy8gICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IHVzZXJzLnZhbHVlLmxlbmd0aCA9PT0gMDtcbiAgLy8gfSBjYXRjaCAoZXJyb3IpIHtcbiAgLy8gICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgdXNlcjpcIiwgZXJyb3IpO1xuICAvLyAgIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gdHJ1ZTtcbiAgLy8gfSBmaW5hbGx5IHtcbiAgLy8gICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIC8vIH1cbn07XG5cbi8vIGNvbnN0IGVkaXRFbWFpbCA9ICh1c2VyKSA9PiB7XG4vLyAgIC8vIFRyaWdnZXIgdGhlIHBvcHVwIGVkaXQgbWFudWFsbHlcbi8vICAgZW1haWxQb3B1cC52YWx1ZS5zaG93KCk7XG4vLyB9O1xuXG5jb25zdCBvblNhdmUgPSBhc3luYyAodXNlciwgbmV3RW1haWwpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBpZCA9IHVzZXIuaWQ7XG5cbiAgICB1c2Vycy52YWx1ZS5lbWFpbCA9IG5ld0VtYWlsO1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJpZFwiLCBpZCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJuZXdFbWFpbFwiLCBuZXdFbWFpbCk7XG4gICAgYXdhaXQgdXNlclN0b3JlLnVwZGF0ZUVtYWlsKGlkLCBuZXdFbWFpbCk7XG4gICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXG4gICAgICBtZXNzYWdlOiBcInllYWhcIixcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcbiAgICBjb25zb2xlLmxvZyhcIkVSUlJSXCIsIGVycm9yKTtcbiAgICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcbiAgfVxufTtcblxuY29uc3QgZ2V0QmFkZ2VQb3NpdGlvbkNvbG9yID0gKHJvbGUpID0+IHtcbiAgc3dpdGNoIChyb2xlKSB7XG4gICAgY2FzZSBcIlN1cGVyIEFkbWluXCI6XG4gICAgICByZXR1cm4gXCJibHVlLTEwXCI7IC8vIFJveWFsIEJsdWVcbiAgICBjYXNlIFwiQWRtaW5cIjpcbiAgICAgIHJldHVybiBcInB1cnBsZS0xMFwiOyAvLyBEYXJrIFB1cnBsZVxuICAgIGNhc2UgXCJTdXBlcnZpc29yXCI6XG4gICAgICByZXR1cm4gXCJ0ZWFsLTdcIjsgLy8gVGVhbFxuICAgIGNhc2UgXCJTY2FsZXJcIjpcbiAgICAgIHJldHVybiBcImdyZWVuLThcIjsgLy8gRGFyayBHcmVlblxuICAgIGNhc2UgXCJMYW1lc2Fkb3JcIjpcbiAgICAgIHJldHVybiBcIm9yYW5nZS01XCI7IC8vIE9yYW5nZVxuICAgIGNhc2UgXCJIb3JuZXJvXCI6XG4gICAgICByZXR1cm4gXCJyZWQtNlwiOyAvLyBSZWRcbiAgICBjYXNlIFwiQmFrZXJcIjpcbiAgICAgIHJldHVybiBcImJyb3duXCI7IC8vIFdhcm0gQnJvd24gKGNsb3Nlc3QgbWF0Y2ggaW4gUXVhc2FyKVxuICAgIGNhc2UgXCJDYWtlIE1ha2VyXCI6XG4gICAgICByZXR1cm4gXCJicm93bi00XCI7IC8vIFdhcm0gQnJvd24gKGNsb3Nlc3QgbWF0Y2ggaW4gUXVhc2FyKVxuICAgIGNhc2UgXCJDYXNoaWVyXCI6XG4gICAgICByZXR1cm4gXCJncmVlbi01XCI7IC8vIExpZ2h0IEdyZWVuXG4gICAgY2FzZSBcIlNhbGVzIENsZXJrXCI6XG4gICAgICByZXR1cm4gXCJibHVlLTVcIjsgLy8gTGlnaHQgQmx1ZVxuICAgIGNhc2UgXCJVdGlsaXR5XCI6XG4gICAgICByZXR1cm4gXCJncmV5LTdcIjsgLy8gR3JheVxuICAgIGNhc2UgXCJOb3QgWWV0IEFzc2lnbmVkXCI6XG4gICAgICByZXR1cm4gXCJncmV5LTRcIjsgLy8gTGlnaHQgR3JheVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gXCJncmV5LTRcIjsgLy8gRGVmYXVsdCBMaWdodCBHcmF5XG4gIH1cbn07XG5cbi8vIGNvbnN0IGdldEJhZGdlU3RhdHVzQ29sb3IgPSAoc3RhdHVzKSA9PiB7XG4vLyAgIHN3aXRjaCAoc3RhdHVzKSB7XG4vLyAgICAgY2FzZSBcIkN1cnJlbnRcIjpcbi8vICAgICAgIHJldHVybiBcInBvc2l0aXZlXCI7XG4vLyAgICAgY2FzZSBcIkZvcm1lclwiOlxuLy8gICAgICAgcmV0dXJuIFwicmVkLTZcIjtcbi8vICAgICBkZWZhdWx0OlxuLy8gICAgICAgcmV0dXJuIFwiZ3JleVwiO1xuLy8gICB9XG4vLyB9O1xuXG5jb25zdCBoYW5kbGVVc2VyRGlhbG9nID0gKHVzZXIpID0+IHtcbiAgJHEuZGlhbG9nKHtcbiAgICBjb21wb25lbnQ6IFVzZXJFZGl0UHJvZmlsZSxcbiAgICBjb21wb25lbnRQcm9wczoge1xuICAgICAgdXNlcjogdXNlcixcbiAgICB9LFxuICB9KTtcbn07XG5cbi8vIGNvbnN0IGdvVG9Vc2VyUHJvZmlsZSA9IGFzeW5jICh1c2VyKSA9PiB7XG4vLyAgIGNvbnNvbGUubG9nKFwidXNlcklkXCIsIHVzZXIuaWQpOyAvLyBDaGVjayBpZiB0aGlzIGlzIGRlZmluZWQgYW5kIHZhbGlkXG4vLyAgIExvYWRpbmcuc2hvdygpO1xuLy8gICB0cnkge1xuLy8gICAgIGF3YWl0IHJvdXRlci5wdXNoKHtcbi8vICAgICAgIG5hbWU6IFwiVXNlcklkUGFnZVwiLFxuLy8gICAgICAgcGFyYW1zOiB7IHVzZXJfaWQ6IHVzZXIuaWQgfSxcbi8vICAgICB9KTtcbi8vICAgfSBmaW5hbGx5IHtcbi8vICAgICBMb2FkaW5nLmhpZGUoKTtcbi8vICAgfVxuLy8gfTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XG4uZGF0YS1lcnJvciB7XG4gIG1pbi1oZWlnaHQ6IDQwdmg7IC8qIE1pbmltdW0gaGVpZ2h0IG9mIDUwJSB2aWV3cG9ydCBoZWlnaHQgKi9cbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uZWxlZ2FudC1jb250YWluZXIge1xuICBiYWNrZ3JvdW5kOiAjZjlmOWY5O1xuICBwYWRkaW5nOiAycmVtO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGNvbG9yOiAjMzMzO1xufVxuXG4uZWxlZ2FudC1zZWFyY2gge1xuICBtYXJnaW4tYm90dG9tOiAycmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiAyNXB4O1xuICBib3gtc2hhZG93OiAwcHggMnB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi5za2VsZXRvbi13cmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnNrZWxldG9uLXdyYXBwZXIgLmNvbC14cy0xMiB7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbi5za2VsZXRvbi1jYXJkIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMjMyNTI2LCAjNDE0MzQ1LCAjNzM3MzczKTtcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgYW5pbWF0aW9uOiBzaGltbWVyIDEuNXMgaW5maW5pdGUgbGluZWFyO1xufVxuXG5Aa2V5ZnJhbWVzIHNoaW1tZXIge1xuICAwJSB7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTEwMDBweCAwO1xuICB9XG4gIDEwMCUge1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDEwMDBweCAwO1xuICB9XG59XG5cbi51c2VyLWNhcmQge1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMwZjIwMjcsICMyMDNhNDMsICMyYzUzNjQpO1xuICBjb2xvcjogIzMzMztcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XG59XG5cbi5zZXBhcmF0b3Ige1xuICAvLyBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjNGZhY2ZlLCAjMDBmMmZlKTsgLy9CZWFjaFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMWQ5NzZjLCAjOTNmOWI5KTtcbn1cblxuLnVzZXItY2FyZDpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KTtcbiAgYm94LXNoYWRvdzogMHB4IDZweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG5cbi50ZXh0LWNlbnRlciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnEtbWItc20ge1xuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG59XG5cbi5lbGVnYW50LW5hbWUge1xuICBmb250LWZhbWlseTogXCJSb2JvdG9cIiwgc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgY29sb3I6ICNmZmZmZmY7XG59XG5cbi5lbGVnYW50LWNoaXAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA3YmZmO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGNvbG9yOiAjZmZmO1xufVxuXG4uZWxlZ2FudC1jaGlwLW91dGxpbmUge1xuICBib3JkZXItY29sb3I6ICMwMDdiZmY7XG4gIGNvbG9yOiAjMDA3YmZmO1xufVxuXG4uZWxlZ2FudC1kZXRhaWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjb2xvcjogI2ZmZmZmZjtcbn1cblxuLmVsZWdhbnQtYnRuIHtcbiAgY29sb3I6ICMwMGZmZDU7XG4gIGJvcmRlci1jb2xvcjogIzAwN2JmZjtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLmVkaXQtaWNvbiB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cbi5lbWFpbC1kaXNwbGF5IHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLmVtYWlsLWNvbnRhaW5lciB7XG4gIG1heC13aWR0aDogNDAwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uZW1haWwtZGlzcGxheSB7XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4ycyBlYXNlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLmVtYWlsLWRpc3BsYXk6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMDQpO1xufVxuXG4uZW1haWwtdGV4dCB7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIG1hcmdpbi1yaWdodDogOHB4O1xufVxuXG4uZWRpdC1pY29uIHtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGVhc2U7XG59XG5cbi5lbWFpbC1kaXNwbGF5OmhvdmVyIC5lZGl0LWljb24ge1xuICBvcGFjaXR5OiAxO1xufVxuXG4ucS1wb3B1cC1lZGl0IHtcbiAgbWF4LXdpZHRoOiAzMDBweDtcbn1cblxuLnBvcHVwLWlucHV0IHtcbiAgZm9udC1zaXplOiAwLjlyZW07XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbImljb24iLCJjb2xvciIsImRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPQSxJQUFBLGFBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsU0FBUyxDQUFFO0FBQUEsSUFDWCxNQUFNLENBQUU7QUFBQSxJQUNSLFdBQVc7QUFBQSxFQUNaO0FBQUEsRUFFRCxNQUFPLE9BQU8sRUFBRSxTQUFTO0FBQ3ZCLFVBQU0sRUFBRSxPQUFPLEVBQUUsR0FBSSxFQUFBLElBQUssbUJBQW9CO0FBQzlDLFVBQU0sVUFBVSxJQUFJLElBQUk7QUFFeEIsVUFBTSxXQUFXLFNBQVMsTUFBTSxNQUFNLFFBQVEsZUFBZSxNQUFNLEtBQUssSUFBSTtBQUU1RSxVQUFNLFlBQVksU0FBUyxNQUFNO0FBQy9CLFlBQU0sTUFBTSxNQUFNLEtBQUs7QUFDdkIsYUFBTyxRQUFRLFFBQVEsUUFBUTtBQUFBLElBQ3JDLENBQUs7QUFFRCxVQUFNLFVBQVUsU0FBUyxNQUFNO0FBQzdCLFlBQU0sTUFBTSxNQUFNLEtBQUs7QUFDdkIsYUFBTyxRQUFRLFFBQVEsUUFBUTtBQUFBLElBQ3JDLENBQUs7QUFFRCxVQUFNLFNBQVMsU0FBUyxNQUFNO0FBQzVCLFlBQU0sTUFBTSxNQUFNLEtBQUs7QUFDdkIsYUFBTyxVQUFVLFVBQVUsVUFBVSxRQUFRLFFBQVEsUUFBUTtBQUFBLElBQ25FLENBQUs7QUFFRCxVQUFNLFlBQVksU0FBUyxNQUFNO0FBQy9CLFlBQ0UsTUFBTSxNQUFNLEtBQUssV0FDakIsTUFBTSxRQUFRLFFBQVEsUUFBUSxNQUFNLFFBQVE7QUFFOUMsYUFBTyxVQUFVLFVBQVUsU0FDdEIsTUFBTSxRQUFRLGFBQ2Q7QUFBQSxJQUNYLENBQUs7QUFFRCxVQUFNLFlBQVksU0FBUyxNQUFNO0FBQy9CLGFBQU8sTUFBTSxLQUFLLFdBQ1osU0FBUyxVQUFVLFNBQVMsTUFBTSxRQUFRLGVBQWUsWUFDekQsUUFBUSxVQUFVLFNBQVMsTUFBTSxRQUFRLGNBQWMsWUFDdkQsT0FBTyxVQUFVLFNBQVMsTUFBTSxRQUFRLGFBQWE7QUFBQSxJQUNqRSxDQUFLO0FBRUQsVUFBTSxPQUFPLFNBQVMsTUFBTTtBQUMxQixZQUFNLGNBQWMsTUFBTSxLQUFLLFFBQVEsTUFBTSxRQUFRO0FBRXJELFVBQUksU0FBUyxVQUFVLE1BQU07QUFDM0IsY0FBTUEsUUFBTyxNQUFNLEtBQUssY0FBYyxNQUFNLFFBQVE7QUFDcEQsZUFBT0EsVUFBUyxTQUNaLGNBQ0FBLFNBQVEsR0FBRyxRQUFRLFFBQVE7QUFBQSxNQUNoQztBQUVELFVBQUksUUFBUSxVQUFVLE1BQU07QUFDMUIsY0FBTUEsUUFBTyxNQUFNLEtBQUssYUFBYSxNQUFNLFFBQVE7QUFDbkQsZUFBT0EsVUFBUyxTQUNaLGNBQ0FBLFNBQVEsR0FBRyxRQUFRLFFBQVE7QUFBQSxNQUNoQztBQUVELFVBQUksVUFBVSxVQUFVLFNBQVMsT0FBTyxVQUFVLE1BQU07QUFDdEQsY0FBTUEsUUFBTyxNQUFNLEtBQUssWUFBWSxNQUFNLFFBQVE7QUFDbEQsZUFBT0EsVUFBUyxTQUNaLGNBQ0FBLFNBQVEsR0FBRyxRQUFRLFFBQVE7QUFBQSxNQUNoQztBQUVELGFBQU87QUFBQSxJQUNiLENBQUs7QUFFRCxVQUFNLFFBQVEsU0FBUyxNQUFNO0FBQzNCLFlBQU0sYUFBYSxRQUFRLFVBQVUsT0FDakMsTUFBTSxLQUFLLGNBQWMsTUFBTSxRQUFRLGFBQ3ZDO0FBRUosVUFBSSxTQUFTLFVBQVUsTUFBTTtBQUMzQixjQUFNQyxTQUFRLE1BQU0sS0FBSyxlQUFlLE1BQU0sUUFBUSxlQUFlLE1BQU0sS0FBSztBQUNoRixlQUFPQSxXQUFVLFNBQ2JBLFNBQ0E7QUFBQSxNQUNMO0FBQ0QsVUFBSSxlQUFlLFFBQVE7QUFDekIsZUFBTztBQUFBLE1BQ1I7QUFDRCxVQUFJLFVBQVUsVUFBVSxTQUFTLE9BQU8sVUFBVSxNQUFNO0FBQ3RELGVBQU8sTUFBTSxLQUFLLGFBQWEsTUFBTSxRQUFRLGFBQWEsTUFBTSxLQUFLLFNBQVMsTUFBTSxRQUFRO0FBQUEsTUFDN0Y7QUFFRCxhQUFPLE1BQU0sS0FBSyxTQUFTLE1BQU0sUUFBUTtBQUFBLElBQy9DLENBQUs7QUFFRCxVQUFNLFVBQVUsU0FBUyxNQUFNO0FBQzdCLGFBQU8seUVBQ0YsTUFBTSxVQUFVLFNBQVMsU0FBVSxNQUFNLFVBQVcsT0FDcEQsUUFBUSxVQUFVLE9BQ2pCLHdEQUF3RCxVQUFVLFVBQVUsT0FBTyxXQUFXLFVBQzlGLE9BQ0QsU0FBUyxVQUFVLE9BQU8sNEJBQTRCLE9BQ3RELE9BQU8sVUFBVSxPQUFPLDBCQUEwQixPQUNsRCxVQUFVLFVBQVUsT0FBTyx3REFBd0QsT0FDbkYsVUFBVSxVQUFVLE9BQU8sOEJBQThCO0FBQUEsSUFDcEUsQ0FBSztBQUVELFVBQU0sU0FBUyxTQUFTLE1BQ3RCLE1BQU0sUUFBUSxjQUFjLE9BQ3hCLFFBQ0EsVUFBVSxLQUNmO0FBRUQsYUFBUyxhQUFjO0FBQ3JCLGNBQVEsVUFBVSxRQUFRLFFBQVEsTUFBTSxNQUFPO0FBQy9DLGVBQVMsVUFBVSxTQUFTLE1BQU0sVUFBVSxNQUFNLEtBQUssSUFBSTtBQUFBLElBQzVEO0FBRUQsYUFBUyxRQUFTLEdBQUc7QUFDbkIsVUFBSSxFQUFFLFlBQVksTUFBTSxTQUFTLFVBQVUsT0FBTztBQUNoRCxjQUFNLFVBQVUsTUFBTSxLQUFLLElBQUk7QUFBQSxNQUNoQztBQUFBLElBQ0Y7QUFFRCxXQUFPLE1BQU07QUFDWCxZQUFNLE9BQU8sRUFBRSxPQUFPLFFBQVEsTUFBTztBQUVyQyxVQUFJLFVBQVUsVUFBVSxNQUFNO0FBQzVCLGFBQUssVUFBVTtBQUNmLGFBQUssVUFBVTtBQUVmLGVBQU87QUFBQSxVQUFPO0FBQUEsVUFDWixVQUFVLFVBQVUsT0FDaEIsRUFBRSxVQUFVLElBQUksaUJBQWlCLE9BQVEsSUFDekMsRUFBRSxVQUFVLE1BQU0sWUFBWSxFQUFHO0FBQUEsUUFDdEM7QUFBQSxNQUNGO0FBRUQsWUFBTSxRQUFRO0FBQUEsUUFDWixFQUFFLE9BQU8sRUFBRSxPQUFPLGtCQUFrQixVQUFVLElBQUksS0FBSyxTQUFTO0FBQUEsUUFFaEUsRUFBRSxPQUFPLEVBQUUsT0FBTyxtRUFBa0UsR0FBSTtBQUFBLFVBQ3RGLEVBQUUsUUFBUSxFQUFFLE9BQU8sa0JBQWlCLEdBQUk7QUFBQSxZQUN0QyxVQUFVLFVBQVUsT0FDaEIsTUFBTSxLQUFLLFNBQ1gsRUFBRSxPQUFPLEVBQUUsTUFBTSxLQUFLLE1BQUssQ0FBRTtBQUFBLFVBQzdDLENBQVc7QUFBQSxRQUNYLENBQVM7QUFBQSxNQUNGO0FBRUQsVUFBSSxNQUFNLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU07QUFDNUQsY0FBTSxVQUFVO0FBQUEsVUFDZCxFQUFFLE9BQU8sRUFBRSxPQUFPLG1CQUFrQixHQUFJLE1BQU0sS0FBSyxLQUFLO0FBQUEsUUFDekQ7QUFFRCxZQUFJLE1BQU0sS0FBSyxZQUFZLFVBQVUsTUFBTSxLQUFLLFlBQVksTUFBTTtBQUNoRSxrQkFBUTtBQUFBLFlBQ04sRUFBRSxPQUFPLEVBQUUsT0FBTyxxQkFBb0IsR0FBSSxNQUFNLEtBQUssT0FBTztBQUFBLFVBQzdEO0FBQUEsUUFDRjtBQUVELGNBQU07QUFBQSxVQUNKLEVBQUUsT0FBTztBQUFBLFlBQ1AsT0FBTztBQUFBLFVBQ1IsR0FBRSxPQUFPO0FBQUEsUUFDWDtBQUFBLE1BQ0Y7QUFFRCxhQUFPO0FBQUEsUUFDTCxFQUFFLE9BQU8sTUFBTSxLQUFLO0FBQUEsUUFDcEIsQ0FBRSxDQUFFLFFBQVEsT0FBTyxNQUFTO0FBQUEsTUFDN0I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNILENBQUM7QUN6S0QsU0FBUyxlQUFnQixPQUFPO0FBQzlCLFNBQU8sRUFBRSxPQUFPO0FBQUEsSUFDZCxPQUFPO0FBQUEsRUFDWCxHQUFLO0FBQUEsSUFDRCxFQUFFLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxJQUNiLEdBQU8sTUFBTSxNQUFNLE9BQU8sQ0FBQztBQUFBLEVBQzNCLENBQUc7QUFDSDtBQUVBLE1BQU0sZUFBZTtBQUFBLEVBQ25CLE1BQU8sR0FBRyxFQUFFLFNBQVM7QUFDbkIsV0FBTyxNQUFNLGVBQWUsS0FBSztBQUFBLEVBQ2xDO0FBQ0g7QUFFQSxJQUFBLFFBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBRUgsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1g7QUFBQSxJQUNELFNBQVM7QUFBQSxJQUNULFFBQVEsQ0FBRSxRQUFRLE1BQVE7QUFBQSxJQUUxQixVQUFVO0FBQUEsSUFDVixXQUFXO0FBQUEsSUFDWCxZQUFZO0FBQUEsSUFDWixhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsSUFDWCxZQUFZO0FBQUEsSUFFWixXQUFXO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDVjtBQUFBLElBQ0QsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLElBRVAsVUFBVSxDQUFFLFVBQVUsS0FBTztBQUFBLEVBQzlCO0FBQUEsRUFFRCxNQUFPLE9BQU8sRUFBRSxPQUFPLEtBQUksR0FBSTtBQUM3QixVQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUksRUFBQSxJQUFLLG1CQUFvQjtBQUU5QyxVQUFNLFdBQVcsT0FBTyxZQUFZLGFBQWE7QUFDakQsUUFBSSxhQUFhLGVBQWU7QUFDOUIsY0FBUSxNQUFNLHVDQUF1QztBQUNyRCxhQUFPO0FBQUEsSUFDUjtBQUVELFVBQU0sRUFBRSxTQUFVLElBQUcsZUFBZ0I7QUFFckMsVUFBTSxVQUFVLElBQUksSUFBSTtBQUV4QixVQUFNLFdBQVcsU0FBUyxNQUFNLFNBQVMsTUFBTSxlQUFlLE1BQU0sSUFBSTtBQUV4RSxVQUFNLGNBQWMsU0FBUyxNQUMxQixHQUFHLFNBQVMsR0FBRyxRQUFRLFFBQVEsR0FBRyxTQUFTLEdBQUcsV0FBVyxRQUNyRCxTQUFTLFVBQVUsUUFDbkIsU0FBUyxNQUFNLGFBQWEsT0FDN0IsQ0FBRSxJQUNGO0FBQUEsTUFDRSxTQUFVLEdBQUc7QUFDWCxjQUFNLEVBQUUsT0FBTSxJQUFLO0FBQ25CLFlBQUksT0FBTyxZQUFZLEdBQUc7QUFDeEIsaUJBQU8sWUFBWTtBQUFBLFFBQ3BCO0FBQ0QsY0FBTSxhQUFhLFVBQVUsS0FBSyxVQUFVLENBQUM7QUFBQSxNQUM5QztBQUFBLElBQ0YsQ0FDTjtBQUVELFVBQU0sYUFBYSxTQUFTLE1BQzFCLE9BQU8sTUFBTSxTQUFTLFlBQVksT0FBTyxNQUFNLFNBQVMsV0FDcEQsTUFBTSxPQUNOLE9BQU8sTUFBTSxJQUFJLENBQ3RCO0FBRUQsYUFBUyxpQkFBa0I7QUFDekIsWUFBTSxXQUFXLFNBQVMsTUFBTTtBQUVoQyxVQUFJLGFBQWEsUUFBUSxTQUFTLE1BQU0sY0FBYyxNQUFNO0FBQzFELGVBQU87QUFBQSxVQUNMO0FBQUEsVUFDQSxTQUFTLE1BQU0sZUFBZTtBQUFBLFVBQzlCLFNBQVMsVUFBVSxPQUNmO0FBQUEsWUFDRTtBQUFBLGNBQ0UsU0FBUyxNQUFNLDRCQUE0QixVQUFVLE9BQ2pELFNBQVMsV0FBVyxPQUFPLE9BQU8sRUFBRSxHQUFHLGNBQWMsTUFBTSxXQUFXLE1BQUssRUFBRyxJQUM5RTtBQUFBLGNBQ0osRUFBRSxLQUFLLFdBQVcsTUFBTztBQUFBLGNBQ3pCLE1BQU07QUFBQSxZQUNQO0FBQUEsVUFDRixJQUNEO0FBQUEsUUFDTDtBQUFBLE1BQ0Y7QUFFRCxhQUFPLGFBQWEsUUFBUSxTQUFTLFVBQVUsT0FDM0MsZUFBZSxLQUFLLElBQ3BCO0FBQUEsSUFDTDtBQUVELFdBQU8sTUFBTTtBQUFBLE1BQ1g7QUFBQSxNQUNBLEVBQUUsS0FBSyxTQUFTLE9BQU8sbUJBQW1CLE1BQU0sWUFBWSxHQUFHLFlBQVksTUFBTztBQUFBLE1BQ2xGLFNBQVMsTUFBTSxhQUFhLE9BQ3hCO0FBQUEsUUFDRSxFQUFFLFlBQVk7QUFBQSxVQUNaLFNBQVMsU0FBUztBQUFBLFVBQ2xCLE1BQU07QUFBQSxVQUNOLFdBQVcsU0FBUyxNQUFNO0FBQUEsUUFDeEMsQ0FBYTtBQUFBLFFBRUQsU0FBUyxNQUFNLGFBQWEsT0FDeEIsRUFBRSxrQkFBa0IsY0FBYyxJQUNsQyxlQUFnQjtBQUFBLE1BQ3JCLElBQ0QsQ0FBRSxlQUFjLENBQUk7QUFBQSxJQUN6QjtBQUFBLEVBQ0Y7QUFDSCxDQUFDO0FDeElELElBQUEscUJBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sTUFBTyxHQUFHLEVBQUUsU0FBUztBQUNuQixXQUFPLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxpQkFBZ0IsR0FBSSxNQUFNLE1BQU0sT0FBTyxDQUFDO0FBQUEsRUFDeEU7QUFDSCxDQUFDO0FDQUQsTUFBTSxVQUFVO0FBRWhCLFNBQVMsY0FBZSxPQUFPO0FBQzdCLFFBQU0sTUFBTSxDQUFFO0FBQ2QsYUFBVyxPQUFPLE9BQU87QUFDdkIsVUFBTSxTQUFTLElBQUksUUFBUSxTQUFTLE9BQUssRUFBRyxHQUFJLGFBQWE7QUFDN0QsUUFBSyxVQUFXLE1BQU87QUFBQSxFQUN4QjtBQUNELFNBQU87QUFDVDtBQUVBLElBQUEsV0FBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFFSCxNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsSUFDVixtQkFBbUI7QUFBQSxJQUNuQixXQUFXO0FBQUEsSUFDWCxZQUFZO0FBQUEsSUFDWixhQUFhO0FBQUEsSUFFYixlQUFlO0FBQUEsSUFDZixjQUFjO0FBQUEsSUFDZCxVQUFVO0FBQUEsSUFDVixXQUFXO0FBQUEsSUFDWCxZQUFZO0FBQUEsSUFDWixhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsSUFDWCxZQUFZO0FBQUEsRUFDYjtBQUFBLEVBRUQsT0FBTztBQUFBLEVBRVAsTUFBTyxPQUFPLEVBQUUsU0FBUztBQUN2QixVQUFNLEtBQUssbUJBQW9CO0FBQy9CLFVBQU0sU0FBUyxRQUFRLE9BQU8sR0FBRyxNQUFNLEVBQUU7QUFFekMsVUFBTTtBQUFBLE1BQ0o7QUFBQSxNQUFrQjtBQUFBLE1BQ2xCO0FBQUEsTUFBa0I7QUFBQSxNQUNsQjtBQUFBLE1BQVc7QUFBQSxNQUFpQjtBQUFBLE1BQzVCO0FBQUEsTUFBZ0I7QUFBQSxJQUNqQixJQUFHLFNBQVU7QUFFZCxZQUFRLFlBQVksU0FBUyxPQUFPO0FBQUEsTUFDbEM7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsR0FBRztBQUFBLElBQ0osRUFBQyxDQUFDO0FBRUgsVUFBTSxVQUFVO0FBQUEsTUFBUyxNQUN2Qix3QkFBeUIsTUFBTSxhQUFhLE9BQU8sYUFBYSxrQkFDN0QsTUFBTSxTQUFTLE9BQU8scUJBQXFCLE9BQzNDLE1BQU0sYUFBYSxPQUFPLHlCQUF5QixPQUNuRCxPQUFPLFVBQVUsT0FBTyw0QkFBNEI7QUFBQSxJQUN4RDtBQUVELFVBQU0sZ0JBQWdCO0FBQUEsTUFBUyxNQUM3QiwwRUFDMEIsTUFBTSxzQkFBc0IsT0FBTyxnQkFBZ0IsdUJBQzFFLE1BQU0sU0FBUyxTQUFTLE1BQU0sYUFBYSxPQUFPLCtCQUErQixPQUNqRixNQUFNLGVBQWUsT0FBTyxtQ0FBbUMsT0FDL0QsTUFBTSxnQkFBZ0IsU0FBUyxJQUFLLE1BQU0sZ0JBQWlCO0FBQUEsSUFDL0Q7QUFFRCxhQUFTLGFBQWM7QUFDckIsWUFBTSxNQUFNLE1BQU0sTUFBTSxTQUFTLENBQUEsQ0FBRTtBQUVuQyxVQUFJLE1BQU0sYUFBYSxNQUFNO0FBQzNCLHlCQUFpQixNQUFNLFVBQVUsS0FBSyxpQkFBa0I7QUFFeEQsY0FBTSxVQUFVLEVBQUUsT0FBTztBQUFBLFVBQ3ZCLE9BQU87QUFBQSxRQUNqQixHQUFXLE1BQU0sTUFBTSxPQUFPLENBQUM7QUFFdkIsZUFBTyxRQUFRLFNBQ1gsQ0FBRSxPQUFTLElBQ1gsSUFBSSxPQUFPLE9BQU87QUFBQSxNQUN2QjtBQUVELGFBQU87QUFBQSxRQUNMO0FBQUEsVUFDRTtBQUFBLFVBQ0EsRUFBRSxPQUFPLGNBQWMsTUFBTztBQUFBLFVBQzlCLFVBQVcsRUFBQyxJQUFJLFdBQVM7QUFDdkIsa0JBQU0sT0FBTyxjQUFjLE1BQU0sS0FBSztBQUV0QyxtQkFBTyxFQUFFLFlBQVk7QUFBQSxjQUNuQixLQUFLLEtBQUs7QUFBQSxjQUNWLFNBQVM7QUFBQSxjQUNUO0FBQUEsY0FDQTtBQUFBLFlBQ2QsQ0FBYTtBQUFBLFVBQ2IsQ0FBVztBQUFBLFFBQ0Y7QUFBQSxRQUVEO0FBQUEsUUFFQTtBQUFBLFVBQ0U7QUFBQSxVQUNBLEVBQUUsT0FBTyxvQ0FBcUM7QUFBQSxVQUM5QyxnQkFBaUI7QUFBQSxVQUNqQjtBQUFBLFVBQ0EsTUFBTTtBQUFBLFVBQ04sTUFBTSxnQkFBZ0I7QUFBQSxRQUN2QjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUQsV0FBTyxNQUFNO0FBQ1gsdUJBQWlCLEtBQUs7QUFFdEIsYUFBTyxFQUFFLE9BQU87QUFBQSxRQUNkLE9BQU8sUUFBUTtBQUFBLE1BQ2hCLEdBQUUsV0FBVyxNQUFNLFlBQVksV0FBWSxDQUFBLENBQUM7QUFBQSxJQUM5QztBQUFBLEVBQ0Y7QUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNwQkQsTUFBTSxVQUFVOzs7Ozs7QUFISSxRQUFJLEVBQUU7QUFDMUIsVUFBTSxRQUFRLElBQUksSUFBSTtBQUN0QixVQUFNLGVBQWUsSUFBSSxJQUFJO0FBRTdCLFVBQU0sT0FBTyxJQUFJLEdBQUc7QUFDcEIsVUFBTSxVQUFVLElBQUksS0FBSztBQUN6QixVQUFNLFdBQVcsSUFBSSwyQ0FBMkM7QUFHaEUsVUFBTSxFQUFFLFNBQVUsSUFBRztBQUVyQixVQUFNLGFBQWEsU0FBUztBQUFBLE1BQzFCLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFFRCxjQUFVLE1BQU07QUFDZCxhQUFPLE9BQU8sWUFBWSxRQUFRO0FBQUEsSUFDcEMsQ0FBQztBQUVELFVBQU0sbUJBQW1CLE1BQU07QUFFN0IsZUFBUyxRQUFRO0FBQUEsSUFDbkI7QUFFQSxVQUFNLFlBQVksTUFBTTtBQUV0QixjQUFRLElBQUksb0JBQW9CO0FBQUEsSUFDbEM7QUFFQSxVQUFNLG1CQUFtQixDQUFDLFVBQVU7QUFDbEMsWUFBTSxPQUFPLE1BQU0sT0FBTyxNQUFNO0FBQ2hDLFVBQUksTUFBTTtBQUNSLGNBQU0sU0FBUyxJQUFJO0FBQ25CLGVBQU8sU0FBUyxNQUFNO0FBQ3BCLG1CQUFTLFFBQVEsT0FBTztBQUFBLFFBQzlCO0FBQ0ksZUFBTyxjQUFjLElBQUk7QUFBQSxNQUMxQjtBQUFBLElBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ29EQSxVQUFNLE9BQU87QUFDYixVQUFNLEVBQUUsU0FBVSxJQUFHO0FBT3JCLFVBQU0sZ0JBQWdCLGlCQUFnQjtBQUN0QyxVQUFNLGdCQUFnQixJQUFJLEVBQUU7QUFFNUIsVUFBTSxZQUFZLFNBQVMsTUFBTSxjQUFjLFNBQVM7QUFDeEQsVUFBTSxTQUFTLFlBQVk7QUFDekIsVUFBSSxjQUFjLE1BQU0sUUFBUTtBQUM5QixjQUFNLGNBQWMsK0JBQStCLGNBQWMsS0FBSztBQUFBLE1BQ3ZFO0FBQUEsSUFDSDtBQUVBLFVBQU0saUJBQWlCLENBQUMsUUFBUTtBQUM5QixZQUFNLGFBQWEsQ0FBQyxRQUNsQixNQUFNLElBQUksT0FBTyxDQUFDLEVBQUUsWUFBVyxJQUFLLElBQUksTUFBTSxDQUFDLEVBQUUsWUFBVyxJQUFLO0FBRW5FLFlBQU0sWUFBWSxJQUFJLFlBQVksV0FBVyxJQUFJLFNBQVMsSUFBSTtBQUM5RCxZQUFNLGFBQWEsSUFBSSxhQUNuQixXQUFXLElBQUksVUFBVSxFQUFFLE9BQU8sQ0FBQyxJQUFJLE1BQ3ZDO0FBQ0osWUFBTSxXQUFXLElBQUksV0FBVyxXQUFXLElBQUksUUFBUSxJQUFJO0FBRTNELGFBQU8sR0FBRyxhQUFhLGNBQWM7QUFBQSxJQUN2QztBQUVBLFVBQU0saUJBQWlCLENBQUMsY0FBYztBQUNwQyxVQUFJLENBQUM7QUFBVyxlQUFPO0FBRXZCLFlBQU0sQ0FBQyxPQUFPLE9BQU8sSUFBSSxVQUFVLE1BQU0sR0FBRztBQUM1QyxZQUFNLE9BQU8sSUFBSTtBQUNqQixXQUFLLFNBQVMsT0FBTyxPQUFPO0FBRTVCLGFBQU8sS0FBSyxtQkFBbUIsSUFBSTtBQUFBLFFBQ2pDLE1BQU07QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLFFBQVE7QUFBQSxNQUNaLENBQUc7QUFBQSxJQUNIO0FBRUEsVUFBTSxtQkFBbUIsQ0FBQyxhQUFhOztBQUNyQywyQkFBcUIsY0FBYyxTQUFTLE1BQU07QUFDbEQsMkJBQXFCLGtCQUFrQixTQUFTLGFBQWE7QUFDN0QsMkJBQXFCLG1CQUFtQixTQUFTLGNBQWM7QUFDL0QsMkJBQXFCLGlCQUFpQixTQUFTLFlBQVk7QUFDM0QsMkJBQXFCLGVBQWUsU0FBUyxXQUFXO0FBQ3hELDJCQUFxQixpQkFBaUIsU0FBUyxhQUFhO0FBQzVELDJCQUFxQixXQUFXLFNBQVMsT0FBTztBQUNoRCwyQkFBcUIsb0JBQW9CLFNBQVMsU0FBUztBQUMzRCwyQkFBcUIsZ0JBQWdCLFNBQVMsWUFBWTtBQUMxRCwyQkFBcUIscUJBQ25CLG9CQUFTLG9CQUFULG1CQUEwQixXQUExQixtQkFBa0MsU0FBUTtBQUM1QywyQkFBcUIsb0JBQWtCLGNBQVMsb0JBQVQsbUJBQTBCLGNBQzdELGdCQUFlLGNBQVMsb0JBQVQsbUJBQTBCLFVBQVUsSUFDbkQ7QUFFSixvQkFBYyxRQUFRO0FBQ3RCLFdBQUssY0FBYyxvQkFBb0I7QUFBQSxJQUN6QztBQUVBLFVBQU0sdUJBQXVCLFNBQVM7QUFBQSxNQUNwQyxhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixnQkFBZ0I7QUFBQSxNQUNoQixjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUNoQixVQUFVO0FBQUEsTUFDVixtQkFBbUI7QUFBQSxNQUNuQixlQUFlO0FBQUEsTUFDZixrQkFBa0I7QUFBQSxNQUNsQixpQkFBaUI7QUFBQSxJQUNuQixDQUFDO0FBRUQsWUFBUSxJQUFJLHlCQUF5QixvQkFBb0I7QUFDekQsY0FBVSxNQUFNO0FBQ2QsYUFBTyxPQUFPLHNCQUFzQixRQUFRO0FBQUEsSUFDOUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdlFELFVBQU0sRUFBRSxTQUFVLElBQUc7QUFFckIsWUFBUSxJQUFJLGFBQWEsUUFBUTtBQUVqQyxhQUFTLGNBQWMsWUFBWTtBQUVqQyxhQUFPLFdBQ0osTUFBTSxRQUFRLEVBQ2QsSUFBSSxDQUFDLFNBQVM7QUFFYixjQUFNLGdCQUFnQixLQUNuQixNQUFNLFNBQVMsRUFDZjtBQUFBLFVBQ0MsQ0FBQyxTQUFTLEtBQUssT0FBTyxDQUFDLEVBQUUsWUFBYSxJQUFHLEtBQUssTUFBTSxDQUFDLEVBQUUsWUFBYTtBQUFBLFFBQ3JFLEVBQ0EsS0FBSyxFQUFFO0FBQ1YsZUFBTztBQUFBLE1BQ2IsQ0FBSyxFQUNBLEtBQUssR0FBRztBQUFBLElBQ2I7QUFFQSxVQUFNLGNBQWMsU0FBUyxNQUFNO0FBQUEsTUFDakMsRUFBRSxPQUFPLGFBQWEsT0FBTyxHQUFHLFNBQVMsa0JBQW1CO0FBQUEsTUFDNUQ7QUFBQSxRQUNFLE9BQU87QUFBQSxRQUNQLE9BQU8sR0FBRyxTQUFTLGdCQUNoQixPQUFPLENBQUMsRUFDUixnQkFBZ0IsU0FBUyxnQkFBZ0I7QUFBQSxVQUMxQztBQUFBLFFBQ04sS0FBUyxTQUFTLGlCQUNYLE9BQU8sQ0FBQyxFQUNSLGdCQUFnQixTQUFTLGlCQUFpQjtBQUFBLFVBQzNDO0FBQUEsUUFDTixLQUFTLFNBQVMsZUFDWCxPQUFPLENBQUMsRUFDUixZQUFXLElBQUssU0FBUyxlQUFlLE1BQU0sQ0FBQztBQUFBLE1BQ25EO0FBQUEsTUFDRDtBQUFBLFFBQ0UsT0FBTztBQUFBLFFBQ1AsT0FBTyxjQUFjLFNBQVMsWUFBWTtBQUFBLE1BQzNDO0FBQUEsTUFDRDtBQUFBLFFBQ0UsT0FBTztBQUFBLFFBQ1AsT0FDRSxTQUFTLGVBQWUsT0FBTyxDQUFDLEVBQUUsWUFBYSxJQUMvQyxTQUFTLGVBQWUsTUFBTSxDQUFDO0FBQUEsTUFDbEM7QUFBQSxNQUNEO0FBQUEsUUFDRSxPQUFPO0FBQUEsUUFDUCxPQUNFLFNBQVMsU0FBUyxPQUFPLENBQUMsRUFBRSxZQUFhLElBQUcsU0FBUyxTQUFTLE1BQU0sQ0FBQztBQUFBLE1BQ3hFO0FBQUEsTUFDRDtBQUFBLFFBQ0UsT0FBTztBQUFBLFFBQ1AsT0FBTyxHQUNMLFNBQVMsY0FBYyxPQUFPLENBQUMsRUFBRSxZQUFhLElBQzlDLFNBQVMsY0FBYyxNQUFNLENBQUM7QUFBQSxNQUVqQztBQUFBLE1BQ0Q7QUFBQSxRQUNFLE9BQU87QUFBQSxRQUNQLE9BQ0UsU0FBUyxrQkFBa0IsT0FBTyxDQUFDLEVBQUUsWUFBYSxJQUNsRCxTQUFTLGtCQUFrQixNQUFNLENBQUM7QUFBQSxNQUNyQztBQUFBLE1BQ0Q7QUFBQSxRQUNFLE9BQU87QUFBQSxRQUNQLE9BQ0UsU0FBUyxjQUFjLE9BQU8sQ0FBQyxFQUFFLFlBQWEsSUFDOUMsU0FBUyxjQUFjLE1BQU0sQ0FBQztBQUFBLE1BQ2pDO0FBQUEsTUFDRDtBQUFBLFFBQ0UsT0FBTztBQUFBLFFBQ1AsT0FBTyxTQUFTLGlCQUFpQjtBQUFBLE1BQ2xDO0FBQUEsTUFDRDtBQUFBLFFBQ0UsT0FBTztBQUFBLFFBQ1AsT0FBTyxTQUFTLG9CQUFvQjtBQUFBLE1BQ3JDO0FBQUEsTUFDRDtBQUFBLFFBQ0UsT0FBTztBQUFBLFFBQ1AsT0FBTyxTQUFTLG1CQUFtQjtBQUFBLE1BQ3BDO0FBQUEsSUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QkQsVUFBTSxRQUFRLFNBQVMsTUFBTSxVQUFVLEtBQUs7QUFDNUMsVUFBTSxZQUFZLGNBQWE7QUFDL0IsVUFBTSxPQUFPLElBQUksQ0FBQztBQUNsQixVQUFNLGFBQWEsSUFBSSxJQUFJO0FBQ1gsUUFBSSxLQUFLO0FBQ3pCLFVBQU0sU0FBUyxJQUFJLEtBQUs7QUFFeEIsVUFBTSxPQUFPLFNBQVM7QUFBQSxNQUNwQixPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsSUFDZixDQUFDO0FBRUQsVUFBTSxXQUFXLFNBQVM7QUFBQSxNQUN4QixhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixnQkFBZ0I7QUFBQSxNQUNoQixjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUNoQixVQUFVO0FBQUEsTUFDVixtQkFBbUI7QUFBQSxNQUNuQixlQUFlO0FBQUEsTUFDZixrQkFBa0I7QUFBQSxNQUNsQixpQkFBaUI7QUFBQSxJQUNuQixDQUFDO0FBRUQsVUFBTSxVQUFVLENBQUMsU0FBUztBQUN4QixhQUFPLE9BQU8sTUFBTSxJQUFJO0FBQ3hCLGlCQUFXLFFBQVEsRUFDakIsS0FBSyxZQUNMLEtBQUssZUFDTCxLQUFLLGFBQWEsS0FBSztBQUFBLElBRTNCO0FBRUEsVUFBTSxjQUFjLENBQUMsU0FBUztBQUM1QixjQUFRLElBQUksZ0JBQWdCLElBQUk7QUFDaEMsYUFBTyxPQUFPLFVBQVUsSUFBSTtBQUM1QixpQkFBVyxRQUFRLEVBRWYsU0FBUyxlQUNULFNBQVMsbUJBQ1QsU0FBUyxrQkFDVCxTQUFTLGdCQUNULFNBQVMsa0JBQ1QsU0FBUyxZQUNULFNBQVMscUJBQ1QsU0FBUyxpQkFDVCxTQUFTO0FBQUEsSUFJZjtBQUVBLFVBQU0sbUJBQW1CLFNBQVMsT0FBTztBQUFBLE1BQ3ZDLEdBQUc7QUFBQSxNQUNILEdBQUc7QUFBQSxJQUNMLEVBQUU7QUFFRixVQUFNLGFBQWEsTUFBTTtBQUN2QixhQUFPLFFBQVE7QUFBQSxJQUNqQjtBQUVBLFVBQU0sV0FBVyxNQUFNO0FBQ3JCLFVBQUksS0FBSyxVQUFVLEdBQUc7QUFDcEI7TUFDSixPQUFTO0FBQ0wsYUFBSztBQUFBLE1BQ047QUFBQSxJQUNIO0FBRUEsVUFBTSxZQUFZLE1BQU07QUFDdEIsV0FBSyxRQUFRO0FBQ2IsV0FBSyxXQUFXO0FBQ2hCLFdBQUssY0FBYztBQUNuQixlQUFTLGNBQWM7QUFDdkIsZUFBUyxrQkFBa0I7QUFDM0IsZUFBUyxtQkFBbUI7QUFDNUIsZUFBUyxpQkFBaUI7QUFDMUIsZUFBUyxlQUFlO0FBQ3hCLGVBQVMsaUJBQWlCO0FBQzFCLGVBQVMsV0FBVztBQUNwQixlQUFTLG9CQUFvQjtBQUM3QixlQUFTLGdCQUFnQjtBQUN6QixlQUFTLG1CQUFtQjtBQUM1QixlQUFTLGtCQUFrQjtBQUMzQixXQUFLLFFBQVE7QUFDYixpQkFBVyxRQUFRO0FBQUEsSUFDckI7QUFFQSxVQUFNLFdBQVcsWUFBWTtBQUMzQixVQUFJO0FBQ0YsY0FBTSxXQUFXO0FBQUEsVUFDZixhQUFhLFNBQVM7QUFBQSxVQUN0QixPQUFPLEdBQUcsS0FBSztBQUFBLFVBQ2YsVUFBVSxLQUFLO0FBQUEsVUFDZixNQUFNLFNBQVM7QUFBQSxRQUNyQjtBQUNJLGdCQUFRLElBQUkscUJBQXFCLFFBQVE7QUFFekMsY0FBTSxVQUFVLGFBQWEsUUFBUTtBQUNyQyxlQUFPLFFBQVE7QUFDZjtBQUNBLGNBQU0sUUFBUSxNQUFNLFVBQVUsV0FBVTtBQUFBLE1BQzVDLFNBQVcsT0FBUDtBQUFBLE1BQWdCO0FBQUEsSUFDcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BMTyxNQUFNLGdCQUFnQjtBQUFBLEVBQzNCO0FBQUEsRUFBUTtBQUFBLEVBQVE7QUFBQSxFQUNoQjtBQUFBLEVBQVE7QUFBQSxFQUFVO0FBQUEsRUFBUztBQUFBLEVBQzNCO0FBQUEsRUFBYTtBQUFBLEVBQVU7QUFBQSxFQUN2QjtBQUFBLEVBQVc7QUFBQSxFQUFVO0FBQUEsRUFDckI7QUFDRjtBQUVPLE1BQU0scUJBQXFCO0FBQUEsRUFDaEM7QUFBQSxFQUFRO0FBQUEsRUFBUztBQUFBLEVBQVc7QUFBQSxFQUFXO0FBQUEsRUFBUTtBQUFBLEVBQVM7QUFDMUQ7QUFFQSxJQUFBLFlBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBRUgsS0FBSztBQUFBLE1BQ0gsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQ1Y7QUFBQSxJQUVELE1BQU07QUFBQSxNQUNKLE1BQU07QUFBQSxNQUNOLFdBQVcsT0FBSyxjQUFjLFNBQVMsQ0FBQztBQUFBLE1BQ3hDLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFFRCxXQUFXO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixXQUFXLE9BQUssbUJBQW1CLFNBQVMsQ0FBQztBQUFBLE1BQzdDLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFDRCxnQkFBZ0I7QUFBQSxNQUNkLE1BQU0sQ0FBRSxRQUFRLE1BQVE7QUFBQSxNQUN4QixTQUFTO0FBQUEsSUFDVjtBQUFBLElBRUQsUUFBUTtBQUFBLElBQ1IsVUFBVTtBQUFBLElBRVYsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLElBQ1AsUUFBUTtBQUFBLEVBQ1Q7QUFBQSxFQUVELE1BQU8sT0FBTyxFQUFFLFNBQVM7QUFDdkIsVUFBTSxLQUFLLG1CQUFvQjtBQUMvQixVQUFNLFNBQVMsUUFBUSxPQUFPLEdBQUcsTUFBTSxFQUFFO0FBRXpDLFVBQU0sUUFBUSxTQUFTLE1BQU07QUFDM0IsWUFBTSxPQUFPLE1BQU0sU0FBUyxTQUN4QixDQUFFLE1BQU0sTUFBTSxNQUFNLElBQU0sSUFDMUIsQ0FBRSxNQUFNLE9BQU8sTUFBTSxNQUFRO0FBRWpDLGFBQU87QUFBQSxRQUNMLHNCQUFzQixHQUFJLE1BQU07QUFBQSxRQUNoQyxPQUFPLEtBQU07QUFBQSxRQUNiLFFBQVEsS0FBTTtBQUFBLE1BQ2Y7QUFBQSxJQUNQLENBQUs7QUFFRCxVQUFNLFVBQVU7QUFBQSxNQUFTLE1BQ3ZCLDBCQUEyQixPQUFPLFVBQVUsT0FBTyxTQUFTLDRCQUE4QixNQUFNLFVBQzdGLE1BQU0sY0FBYyxTQUFTLHNDQUF1QyxNQUFNLGNBQWUsT0FDekYsTUFBTSxXQUFXLE9BQU8sd0JBQXdCLE9BQ2hELE1BQU0sYUFBYSxPQUFPLDBCQUEwQjtBQUFBLElBQ3hEO0FBRUQsV0FBTyxNQUFNLEVBQUUsTUFBTSxLQUFLO0FBQUEsTUFDeEIsT0FBTyxRQUFRO0FBQUEsTUFDZixPQUFPLE1BQU07QUFBQSxJQUNuQixHQUFPLE1BQU0sTUFBTSxPQUFPLENBQUM7QUFBQSxFQUN4QjtBQUNILENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3FGRCxVQUFNLFlBQVksY0FBYTtBQUNoQixjQUFZO0FBQ1IsUUFBSSxJQUFJO0FBQ2hCLGNBQVk7QUFDdkIsVUFBTSxRQUFRLFNBQVMsTUFBTSxVQUFVLEtBQUs7QUFDNUMsWUFBUSxJQUFJLG1CQUFtQixNQUFNLEtBQUs7QUFFMUMsY0FBVSxZQUFZO0FBQ3BCLFlBQU0sZUFBYztBQUFBLElBQ3RCLENBQUM7QUFFRCxVQUFNLGlCQUFpQixZQUFZO0FBQ2pDLFVBQUk7QUFDRixnQkFBUSxRQUFRO0FBQ2hCLGNBQU0sUUFBUSxNQUFNLFVBQVUsV0FBVTtBQUN4QyxZQUFJLENBQUMsTUFBTSxNQUFNLFFBQVE7QUFDdkIsNEJBQWtCLFFBQVE7QUFBQSxRQUMzQjtBQUNELGdCQUFRLElBQUksU0FBUyxNQUFNLEtBQUs7QUFBQSxNQUNqQyxTQUFRLE9BQVA7QUFDQSxnQkFBUSxJQUFJLDJCQUEyQixLQUFLO0FBQzVDLDBCQUFrQixRQUFRO0FBQUEsTUFDOUIsVUFBWTtBQUNSLGdCQUFRLFFBQVE7QUFBQSxNQUNqQjtBQUFBLElBQ0g7QUFFQSxVQUFNLGFBQWEsQ0FBQyxlQUFlO0FBQ2pDLGFBQU9DLFdBQUssV0FBVyxZQUFZLGNBQWM7QUFBQSxJQUNuRDtBQUVBLFVBQU0sb0JBQW9CLENBQUMsU0FBUztBQUNsQyxVQUFJLENBQUM7QUFBTSxlQUFPO0FBRWxCLFlBQU0sRUFBRSxXQUFXLFlBQVksU0FBUSxJQUFLO0FBRzVDLFlBQU0scUJBQXFCLFVBQ3hCLE1BQU0sR0FBRyxFQUNULElBQUksQ0FBQyxTQUFTLEtBQUssT0FBTyxDQUFDLEVBQUUsZ0JBQWdCLEtBQUssTUFBTSxDQUFDLENBQUMsRUFDMUQsS0FBSyxHQUFHO0FBRVgsWUFBTSxnQkFBZ0IsYUFDbEIsR0FBRyxXQUFXLE9BQU8sQ0FBQyxFQUFFLFlBQWEsT0FDckM7QUFDSixZQUFNLGNBQWMsU0FBUyxPQUFPLENBQUMsRUFBRSxZQUFXO0FBRWxELGFBQU8sR0FBRyxzQkFBc0IsaUJBQWlCLGNBQWMsU0FBUztBQUFBLFFBQ3RFO0FBQUEsTUFDRDtBQUFBLElBQ0g7QUFFQSxVQUFNLFVBQVUsSUFBSSxJQUFJO0FBQ3hCLFVBQU0sb0JBQW9CLElBQUksS0FBSztBQUNuQyxVQUFNLGNBQWMsSUFBSSxFQUFFO0FBRTFCLFVBQU0sU0FBUyxZQUFZO0FBQ3pCLGNBQVEsUUFBUTtBQUNoQix3QkFBa0IsUUFBUTtBQUMxQixZQUFNLFVBQVUsV0FBVyxZQUFZLEtBQUs7QUFDNUMsY0FBUSxRQUFRO0FBQUEsSUFjbEI7QUFPQSxVQUFNLFNBQVMsT0FBTyxNQUFNLGFBQWE7QUFDdkMsVUFBSTtBQUNGLGNBQU0sS0FBSyxLQUFLO0FBRWhCLGNBQU0sTUFBTSxRQUFRO0FBSXBCLGNBQU0sVUFBVSxZQUFZLElBQUksUUFBUTtBQUN4QyxlQUFPLE9BQU87QUFBQSxVQUNaLE1BQU07QUFBQSxVQUNOLFNBQVM7QUFBQSxRQUNmLENBQUs7QUFBQSxNQUNGLFNBQVEsT0FBUDtBQUNBLGdCQUFRLElBQUksc0NBQXNDO0FBQ2xELGdCQUFRLElBQUksU0FBUyxLQUFLO0FBQzFCLGdCQUFRLElBQUksc0NBQXNDO0FBQUEsTUFDbkQ7QUFBQSxJQUNIO0FBRUEsVUFBTSx3QkFBd0IsQ0FBQyxTQUFTO0FBQ3RDLGNBQVE7QUFBQSxhQUNEO0FBQ0gsaUJBQU87QUFBQSxhQUNKO0FBQ0gsaUJBQU87QUFBQSxhQUNKO0FBQ0gsaUJBQU87QUFBQSxhQUNKO0FBQ0gsaUJBQU87QUFBQSxhQUNKO0FBQ0gsaUJBQU87QUFBQSxhQUNKO0FBQ0gsaUJBQU87QUFBQSxhQUNKO0FBQ0gsaUJBQU87QUFBQSxhQUNKO0FBQ0gsaUJBQU87QUFBQSxhQUNKO0FBQ0gsaUJBQU87QUFBQSxhQUNKO0FBQ0gsaUJBQU87QUFBQSxhQUNKO0FBQ0gsaUJBQU87QUFBQSxhQUNKO0FBQ0gsaUJBQU87QUFBQTtBQUVQLGlCQUFPO0FBQUE7QUFBQSxJQUViOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
