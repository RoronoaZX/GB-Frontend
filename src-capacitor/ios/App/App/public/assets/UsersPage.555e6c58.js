import { e as createComponent, n as ref, g as computed, h, L as QIcon, af as withDirectives, ba as Ripple, k as getCurrentInstance, i as inject, f as emptyRenderFn, bm as stepperKey, bj as KeepAlive, j as hSlot, a9 as useDarkProps, ab as useDark, m as provide, x as hMergeSlot, ag as hDir, _ as _export_sfc, t as reactive, z as onMounted, o as openBlock, c as createBlock, w as withCtx, a as createVNode, I as QCardSection, J as createBaseVNode, bn as normalizeStyle, $ as QAvatar, a4 as createElementBlock, be as createCommentVNode, K as QInput, Q as QCard, O as pushScopeId, R as popScopeId, a5 as Fragment, a6 as renderList, a1 as createTextVNode, a0 as toDisplayString, M as QBtn, a3 as QDialog, H as useRouter, u as watch, a2 as QSeparator, aK as QCardActions, P as Plugin } from "./index.9b9dbcba.js";
import { Q as QSlideTransition } from "./QSlideTransition.2005190f.js";
import { u as usePanelChildProps, d as useRenderCache, a as usePanelProps, b as usePanelEmits, c as usePanel } from "./use-panel.0a5ffe4f.js";
import { C as ClosePopup } from "./ClosePopup.83fef54c.js";
import { Q as QSelect } from "./QTable.0bf3c36f.js";
import { u as useBranchesStore } from "./branch.5826bd8b.js";
import { Q as QChip } from "./QChip.d5fc407c.js";
import { u as useUsersStore } from "./user.9d8bff14.js";
import { Q as QPage } from "./QPage.4b0a10d6.js";
import { q as quasarDate } from "./date.b17495f5.js";
import "./touch.9135741d.js";
import "./format.76edee29.js";
import "./QVirtualScroll.3c7f7fea.js";
import "./QList.8d472d75.js";
import "./rtl.276c3f1b.js";
import "./QItemLabel.345b9721.js";
import "./QItem.79579b05.js";
import "./QMenu.d2cee634.js";
import "./warehouse.d9befe34.js";
import "./axios.91431b0b.js";
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
const _withScopeId$2 = (n) => (pushScopeId("data-v-94f93548"), n = n(), popScopeId(), n);
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
const _hoisted_5$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, "Profile", -1));
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
const _hoisted_1$4 = { class: "q-gutter-y-sm" };
const _hoisted_2$2 = { class: "q-gutter-y-sm q-mx-auto" };
const _hoisted_3$2 = { class: "row q-gutter-x-sm item-start" };
const _hoisted_4$2 = { class: "row q-gutter-x-md" };
const _hoisted_5$1 = /* @__PURE__ */ createBaseVNode("div", null, "Designation", -1);
const _hoisted_6$1 = { class: "row q-gutter-x-md" };
const _sfc_main$4 = {
  __name: "UserStep2",
  props: {
    userData: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["updateData"],
  setup(__props) {
    const { userData } = __props;
    const branchesStore = useBranchesStore();
    const positionOptions = [
      "Super Admin",
      "Admin",
      "Scaler",
      "Lamesador",
      "Hornero",
      "Baker",
      "Cashier",
      "Sales Clerk",
      "Utility",
      "Not Yet Assigned"
    ];
    const genderOptions = ["Male", "Female"];
    const statusOptions = ["Current", "Former"];
    const branchOptions = ref([]);
    ref([]);
    const filterBranchOptions = ref(branchOptions.value);
    const valididateTime = (val) => {
      const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
      return timeRegex.test(val) || "Invalid time format";
    };
    const fetchBranchesData = async () => {
      await branchesStore.fetchBranches();
      branchOptions.value = branchesStore.branches.map((val) => ({
        label: val.name,
        value: val.id
      }));
      filterBranchOptions.value = branchOptions.value;
    };
    onMounted(fetchBranchesData);
    const filteredBranches = (val, update) => {
      update(() => {
        const needle = val.toLowerCase();
        filterBranchOptions.value = val === "" ? branchOptions.value : branchOptions.value.filter(
          (v) => v.label.toLowerCase().includes(needle)
        );
      });
    };
    const userPersonalInfoForm = reactive({
      user_first_name: "",
      user_middle_name: "",
      user_last_name: "",
      user_address: "",
      user_birthdate: "",
      user_sex: "",
      user_status: "",
      user_phone_number: "",
      user_position: "",
      user_branch_name: "",
      user_time_shift: ""
    });
    console.log("userPersonalInfoForm:", userPersonalInfoForm.value);
    onMounted(() => {
      Object.assign(userPersonalInfoForm, userData);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QCard, {
        flat: "",
        style: { "width": "500px", "max-width": "80vw" }
      }, {
        default: withCtx(() => [
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1$4, [
                createBaseVNode("div", _hoisted_2$2, [
                  createVNode(QInput, {
                    class: "text-capitalize",
                    modelValue: userPersonalInfoForm.user_first_name,
                    "onUpdate:modelValue": [
                      _cache[0] || (_cache[0] = ($event) => userPersonalInfoForm.user_first_name = $event),
                      _cache[1] || (_cache[1] = ($event) => _ctx.$emit("updateData", userPersonalInfoForm))
                    ],
                    outlined: "",
                    dense: "",
                    label: "First Name",
                    rules: [(val) => val && val.length > 0 || "Required"]
                  }, null, 8, ["modelValue", "rules"]),
                  createVNode(QInput, {
                    class: "text-capitalize",
                    modelValue: userPersonalInfoForm.user_middle_name,
                    "onUpdate:modelValue": [
                      _cache[2] || (_cache[2] = ($event) => userPersonalInfoForm.user_middle_name = $event),
                      _cache[3] || (_cache[3] = ($event) => _ctx.$emit("updateData", userPersonalInfoForm))
                    ],
                    outlined: "",
                    dense: "",
                    label: "Middle Name",
                    rules: [(val) => val && val.length > 0 || "Required"]
                  }, null, 8, ["modelValue", "rules"]),
                  createVNode(QInput, {
                    class: "text-capitalize",
                    modelValue: userPersonalInfoForm.user_last_name,
                    "onUpdate:modelValue": [
                      _cache[4] || (_cache[4] = ($event) => userPersonalInfoForm.user_last_name = $event),
                      _cache[5] || (_cache[5] = ($event) => _ctx.$emit("updateData", userPersonalInfoForm))
                    ],
                    outlined: "",
                    dense: "",
                    label: "Last Name",
                    rules: [(val) => val && val.length > 0 || "Required"]
                  }, null, 8, ["modelValue", "rules"]),
                  createVNode(QInput, {
                    class: "text-capitalize",
                    modelValue: userPersonalInfoForm.user_address,
                    "onUpdate:modelValue": [
                      _cache[6] || (_cache[6] = ($event) => userPersonalInfoForm.user_address = $event),
                      _cache[7] || (_cache[7] = ($event) => _ctx.$emit("updateData", userPersonalInfoForm))
                    ],
                    outlined: "",
                    dense: "",
                    label: "Address",
                    rules: [(val) => val && val.length > 0 || "Required"]
                  }, null, 8, ["modelValue", "rules"])
                ]),
                createBaseVNode("div", _hoisted_3$2, [
                  createBaseVNode("div", null, [
                    createVNode(QInput, {
                      modelValue: userPersonalInfoForm.user_birthdate,
                      "onUpdate:modelValue": [
                        _cache[8] || (_cache[8] = ($event) => userPersonalInfoForm.user_birthdate = $event),
                        _cache[9] || (_cache[9] = ($event) => _ctx.$emit("updateData", userPersonalInfoForm))
                      ],
                      outlined: "",
                      dense: "",
                      label: "Birthdate",
                      type: "date",
                      style: { "width": "230px" },
                      rules: [(val) => val && val.length > 0 || "Required"]
                    }, null, 8, ["modelValue", "rules"])
                  ]),
                  createBaseVNode("div", null, [
                    createVNode(QSelect, {
                      modelValue: userPersonalInfoForm.user_sex,
                      "onUpdate:modelValue": [
                        _cache[10] || (_cache[10] = ($event) => userPersonalInfoForm.user_sex = $event),
                        _cache[11] || (_cache[11] = ($event) => _ctx.$emit("updateData", userPersonalInfoForm))
                      ],
                      dense: "",
                      outlined: "",
                      label: "Sex",
                      options: genderOptions,
                      rules: [(val) => val && val.length > 0 || "Required"],
                      style: { "width": "120px" },
                      behavior: "menu",
                      "hide-dropdown-icon": ""
                    }, null, 8, ["modelValue", "rules"])
                  ]),
                  createBaseVNode("div", null, [
                    createVNode(QSelect, {
                      modelValue: userPersonalInfoForm.user_status,
                      "onUpdate:modelValue": [
                        _cache[12] || (_cache[12] = ($event) => userPersonalInfoForm.user_status = $event),
                        _cache[13] || (_cache[13] = ($event) => _ctx.$emit("updateData", userPersonalInfoForm))
                      ],
                      options: statusOptions,
                      dense: "",
                      outlined: "",
                      "hide-dropdown-icon": "",
                      label: "Status",
                      style: { "width": "100px" },
                      rules: [(val) => val && val.length > 0 || "Required"],
                      behavior: "menu"
                    }, null, 8, ["modelValue", "rules"])
                  ])
                ]),
                createBaseVNode("div", _hoisted_4$2, [
                  createBaseVNode("div", null, [
                    createVNode(QInput, {
                      modelValue: userPersonalInfoForm.user_phone_number,
                      "onUpdate:modelValue": [
                        _cache[14] || (_cache[14] = ($event) => userPersonalInfoForm.user_phone_number = $event),
                        _cache[15] || (_cache[15] = ($event) => _ctx.$emit("updateData", userPersonalInfoForm))
                      ],
                      outlined: "",
                      dense: "",
                      label: "Phone Number",
                      mask: "+(63) ### - ### - ####",
                      placeholder: "(+63) ### - ### - ####",
                      rules: [(val) => val && val.length > 0 || "Required"],
                      style: { "width": "300px", "max-width": "500px", "min-width": "100px" }
                    }, null, 8, ["modelValue", "rules"])
                  ]),
                  createBaseVNode("div", null, [
                    createVNode(QSelect, {
                      modelValue: userPersonalInfoForm.user_position,
                      "onUpdate:modelValue": [
                        _cache[16] || (_cache[16] = ($event) => userPersonalInfoForm.user_position = $event),
                        _cache[17] || (_cache[17] = ($event) => _ctx.$emit("updateData", userPersonalInfoForm))
                      ],
                      outlined: "",
                      dense: "",
                      "hide-dropdown-icon": "",
                      label: "Position",
                      options: positionOptions,
                      rules: [(val) => val && val.length > 0 || "Required"],
                      style: { "width": "150px", "max-width": "500px", "min-width": "100px" }
                    }, null, 8, ["modelValue", "rules"])
                  ])
                ]),
                _hoisted_5$1,
                createBaseVNode("div", _hoisted_6$1, [
                  createBaseVNode("div", null, [
                    createVNode(QSelect, {
                      modelValue: userPersonalInfoForm.user_branch_name,
                      "onUpdate:modelValue": [
                        _cache[18] || (_cache[18] = ($event) => userPersonalInfoForm.user_branch_name = $event),
                        _cache[19] || (_cache[19] = ($event) => _ctx.$emit("updateDat", userPersonalInfoForm))
                      ],
                      outlined: "",
                      flat: "",
                      dense: "",
                      "use-input": "",
                      clearable: "",
                      "input-debounce": "0",
                      options: filterBranchOptions.value,
                      label: "Branch",
                      onFilter: filteredBranches,
                      style: { "width": "250px", "max-width": "500px", "min-width": "100px" },
                      "hide-dropdown-icon": "",
                      behavior: "menu"
                    }, null, 8, ["modelValue", "options"])
                  ]),
                  createBaseVNode("div", null, [
                    createVNode(QInput, {
                      outlined: "",
                      modelValue: userPersonalInfoForm.user_time_shift,
                      "onUpdate:modelValue": [
                        _cache[20] || (_cache[20] = ($event) => userPersonalInfoForm.user_time_shift = $event),
                        _cache[21] || (_cache[21] = ($event) => _ctx.$emit("updateData", userPersonalInfoForm))
                      ],
                      flat: "",
                      dense: "",
                      mask: "##:## AA",
                      label: "Time Schedule",
                      rules: valididateTime,
                      hint: "Format: 01:00 AM/PM",
                      style: { "width": "200px", "max-width": "500px", "min-width": "100px" },
                      "hide-dropdown-icon": ""
                    }, null, 8, ["modelValue"])
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
        value: userData.user_address
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
        label: "Status:",
        value: `${userData.user_status.charAt(0).toUpperCase() + userData.user_status.slice(1)} ${userData.user_position.charAt(0).toUpperCase() + userData.user_position.slice(1)}`
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
        value: userData.user_branch_name.label || ""
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
      user_first_name: "",
      user_middle_name: "",
      user_last_name: "",
      user_address: "",
      user_birthdate: "",
      user_sex: "",
      user_status: "",
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
      Object.assign(userInfo, data);
      isDisabled.value = !(userInfo.user_first_name && userInfo.user_last_name && userInfo.user_address && userInfo.user_birthdate && userInfo.user_sex && userInfo.user_status && userInfo.user_phone_number && userInfo.user_position && userInfo.user_branch_name && userInfo.user_time_shift);
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
      userInfo.user_first_name = "";
      userInfo.user_middle_name = "";
      userInfo.user_last_name = "";
      userInfo.user_address = "";
      userInfo.user_birthdate = "";
      userInfo.user_sex = "";
      userInfo.user_status = "";
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
          email: `${user.email}@gmail.com`,
          password: user.password,
          name: `${userInfo.user_first_name} ${userInfo.user_middle_name} ${userInfo.user_last_name}`,
          address: userInfo.user_address,
          birthdate: userInfo.user_birthdate,
          sex: userInfo.user_sex,
          status: userInfo.user_status,
          phone: userInfo.user_phone_number,
          role: userInfo.user_position,
          branch_id: userInfo.user_branch_name.value,
          time_shift: userInfo.user_time_shift
        };
        console.log("userdata to send:", userData);
        await userStore.registerUser(userData);
        dialog.value = false;
        resetForm();
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
var UsersCreate = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-d06f5db4"], ["__file", "UsersCreate.vue"]]);
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
var UsersCard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-2312cfd5"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { class: "q-pa-md elegant-container" };
const _hoisted_2 = { align: "right" };
const _hoisted_3 = {
  key: 0,
  class: "skeleton-wrapper row q-col-gutter-md"
};
const _hoisted_4 = {
  key: 1,
  class: "data-error"
};
const _hoisted_5 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "No data available", -1));
const _hoisted_6 = {
  key: 2,
  class: "q-pa-md row q-col-gutter-md"
};
const _hoisted_7 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("img", { src: "https://cdn.quasar.dev/img/mountains.jpg" }, null, -1));
const _hoisted_8 = { class: "q-mt-lg" };
const _hoisted_9 = { class: "text-h6 text-weight-medium elegant-name text-capitalize" };
const _hoisted_10 = { class: "q-mb-sm elegant-detail" };
const _hoisted_11 = { class: "q-mb-sm elegant-detail" };
const _hoisted_12 = { class: "q-mb-sm elegant-detail" };
const _hoisted_13 = { class: "q-mb-sm elegant-detail text-capitalize" };
const _hoisted_14 = { class: "row q-mt-md justify-between" };
const _hoisted_15 = { class: "text-subtitle1 text-weight-light" };
const _sfc_main$1 = {
  __name: "UsersCard",
  setup(__props) {
    const userStore = useUsersStore();
    const router = useRouter();
    const users = computed(() => userStore.users);
    const formatDate = (dateString) => {
      return quasarDate.formatDate(dateString, "MMMM D, YYYY");
    };
    const userRows = computed(
      () => users.value.map((user) => ({
        ...user,
        birthdateFormatted: formatDate(user.birthdate)
      }))
    );
    console.log("UsersPage", userRows.value);
    const loading = ref(true);
    const showNoDataMessage = ref(false);
    const searchQuery = ref("");
    const search = async () => {
      loading.value = true;
      showNoDataMessage.value = false;
      try {
        if (searchQuery.value.trim() === "") {
          await useUsersStore.fetchUsers();
        } else {
          await useUsersStore.searchUser(searchQuery.value);
        }
        showNoDataMessage.value = userRows.value.length === 0;
      } catch (error) {
        console.error("Error fetching user:", error);
        showNoDataMessage.value = true;
      } finally {
        loading.value = false;
      }
    };
    watch(searchQuery, async (newValue) => {
      if (newValue.trim() === "") {
        await search();
      }
    });
    onMounted(async () => {
      loading.value = true;
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      try {
        await Promise.all([
          userStore.fetchUsers(),
          delay(1e3)
        ]);
        showNoDataMessage.value = userRows.value.length === 0;
      } catch (error) {
        console.error("Error fetching users:", error);
        showNoDataMessage.value = true;
      } finally {
        loading.value = false;
      }
    });
    const getBadgePositionColor = (role) => {
      switch (role) {
        case "Super Admin":
          return "negative";
        case "Admin":
          return "blue-grey-8";
        case "Scaler":
          return "info";
        case "Lamesador":
          return "indigo";
        case "Hornero":
          return "purple";
        case "Baker":
          return "warning";
        case "Cashier":
          return "secondary";
        case "Sales Clerk":
          return "deep-orange";
        case "Utility":
          return "deep-purple";
        case "Not Yet Assigned":
          return "grey";
        default:
          return "grey";
      }
    };
    const getBadgeStatusColor = (status) => {
      switch (status) {
        case "Current":
          return "positive";
        case "Former":
          return "red-6";
        default:
          return "grey";
      }
    };
    const goToUserProfile = async (user) => {
      console.log("userId", user.id);
      Plugin.show();
      try {
        await router.push({
          name: "UserIdPage",
          params: { user_id: user.id }
        });
      } finally {
        Plugin.hide();
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, null, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$1, [
            createBaseVNode("div", _hoisted_2, [
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
            loading.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
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
            ])) : showNoDataMessage.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
              createVNode(QIcon, {
                name: "error",
                size: "50px",
                color: "negative"
              }),
              _hoisted_5
            ])) : (openBlock(), createElementBlock("div", _hoisted_6, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(userRows.value, (user) => {
                return openBlock(), createElementBlock("div", {
                  key: user.id,
                  class: "col-xs-12 col-sm-6 col-md-4 col-lg-3"
                }, [
                  createVNode(QCard, { class: "user-card" }, {
                    default: withCtx(() => [
                      _hoisted_7,
                      createVNode(QCardSection, { class: "text-center" }, {
                        default: withCtx(() => {
                          var _a;
                          return [
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
                            createBaseVNode("div", _hoisted_8, [
                              createBaseVNode("div", _hoisted_9, toDisplayString((_a = user == null ? void 0 : user.name) != null ? _a : "None"), 1),
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
                          ];
                        }),
                        _: 2
                      }, 1024),
                      createVNode(QSeparator),
                      createVNode(QCardSection, null, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_10, [
                            createVNode(QIcon, {
                              name: "mail",
                              class: "q-mr-sm"
                            }),
                            createBaseVNode("span", null, toDisplayString(user.email), 1)
                          ]),
                          createBaseVNode("div", _hoisted_11, [
                            createVNode(QIcon, {
                              name: "calendar_today",
                              class: "q-mr-sm"
                            }),
                            createBaseVNode("span", null, toDisplayString(user.birthdateFormatted), 1)
                          ]),
                          createBaseVNode("div", _hoisted_12, [
                            createVNode(QIcon, {
                              name: "smartphone",
                              class: "q-mr-sm"
                            }),
                            createBaseVNode("span", null, toDisplayString(user.phone), 1)
                          ]),
                          createBaseVNode("div", _hoisted_13, [
                            createVNode(QIcon, {
                              name: "location_on",
                              class: "q-mr-sm"
                            }),
                            createBaseVNode("span", null, toDisplayString(user.address), 1)
                          ]),
                          createBaseVNode("div", _hoisted_14, [
                            createBaseVNode("div", _hoisted_15, [
                              createVNode(QChip, {
                                outline: "",
                                square: "",
                                class: "elegant-chip-outline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Employment Status ")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode(QChip, {
                              outline: "",
                              color: getBadgeStatusColor(user.status),
                              "text-color": "white",
                              class: "q-mr-xs elegant-chip"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(user.status), 1)
                              ]),
                              _: 2
                            }, 1032, ["color"])
                          ])
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(QSeparator),
                      createVNode(QCardActions, { class: "q-pa-md text-center" }, {
                        default: withCtx(() => [
                          createVNode(QBtn, {
                            class: "text-subtitle2 elegant-btn",
                            outline: "",
                            dense: "",
                            flat: "",
                            label: "View Profile",
                            onClick: ($event) => goToUserProfile(user)
                          }, null, 8, ["onClick"])
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
var UsersCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-2312cfd5"], ["__file", "UsersCard.vue"]]);
var UsersTable_vue_vue_type_style_index_0_scoped_true_lang = "";
var UsersPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-33d1d7b8"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "\u{1F465} Roles and Permission", -1));
const _sfc_main = {
  __name: "UsersPage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QCard, {
        class: "elegant-container",
        flat: ""
      }, {
        default: withCtx(() => [
          createVNode(QCardSection, { class: "row justify-between" }, {
            default: withCtx(() => [
              _hoisted_1,
              createBaseVNode("div", null, [
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
var UsersPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-33d1d7b8"], ["__file", "UsersPage.vue"]]);
export { UsersPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnNQYWdlLjU1NWU2YzU4LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3N0ZXBwZXIvU3RlcEhlYWRlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc3RlcHBlci9RU3RlcC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc3RlcHBlci9RU3RlcHBlck5hdmlnYXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3N0ZXBwZXIvUVN0ZXBwZXIuanMiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci91c2Vycy9jb21wb25lbnRzL3VzZXJzX2NyZWF0ZV9jb21wb25lbnQvVXNlclN0ZXAxLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL3VzZXJzL2NvbXBvbmVudHMvdXNlcnNfY3JlYXRlX2NvbXBvbmVudC9Vc2VyU3RlcDIudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvdXNlcnMvY29tcG9uZW50cy91c2Vyc19jcmVhdGVfY29tcG9uZW50L1VzZXJTdGVwRmluaXNoLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL3VzZXJzL2NvbXBvbmVudHMvVXNlcnNDcmVhdGUudnVlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9za2VsZXRvbi9RU2tlbGV0b24uanMiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci91c2Vycy9jb21wb25lbnRzL1VzZXJzQ2FyZC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2l0aERpcmVjdGl2ZXMsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUmlwcGxlIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmlwcGxlL1JpcHBsZS5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnU3RlcEhlYWRlcicsXG5cbiAgcHJvcHM6IHtcbiAgICBzdGVwcGVyOiB7fSxcbiAgICBzdGVwOiB7fSxcbiAgICBnb1RvUGFuZWw6IEZ1bmN0aW9uXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IGF0dHJzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgYmx1clJlZiA9IHJlZihudWxsKVxuXG4gICAgY29uc3QgaXNBY3RpdmUgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5zdGVwcGVyLm1vZGVsVmFsdWUgPT09IHByb3BzLnN0ZXAubmFtZSlcblxuICAgIGNvbnN0IGlzRGlzYWJsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IG9wdCA9IHByb3BzLnN0ZXAuZGlzYWJsZVxuICAgICAgcmV0dXJuIG9wdCA9PT0gdHJ1ZSB8fCBvcHQgPT09ICcnXG4gICAgfSlcblxuICAgIGNvbnN0IGlzRXJyb3IgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBvcHQgPSBwcm9wcy5zdGVwLmVycm9yXG4gICAgICByZXR1cm4gb3B0ID09PSB0cnVlIHx8IG9wdCA9PT0gJydcbiAgICB9KVxuXG4gICAgY29uc3QgaXNEb25lID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3Qgb3B0ID0gcHJvcHMuc3RlcC5kb25lXG4gICAgICByZXR1cm4gaXNEaXNhYmxlLnZhbHVlID09PSBmYWxzZSAmJiAob3B0ID09PSB0cnVlIHx8IG9wdCA9PT0gJycpXG4gICAgfSlcblxuICAgIGNvbnN0IGhlYWRlck5hdiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0XG4gICAgICAgIG9wdCA9IHByb3BzLnN0ZXAuaGVhZGVyTmF2LFxuICAgICAgICBuYXYgPSBvcHQgPT09IHRydWUgfHwgb3B0ID09PSAnJyB8fCBvcHQgPT09IHZvaWQgMFxuXG4gICAgICByZXR1cm4gaXNEaXNhYmxlLnZhbHVlID09PSBmYWxzZVxuICAgICAgICAmJiBwcm9wcy5zdGVwcGVyLmhlYWRlck5hdlxuICAgICAgICAmJiBuYXZcbiAgICB9KVxuXG4gICAgY29uc3QgaGFzUHJlZml4ID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgcmV0dXJuIHByb3BzLnN0ZXAucHJlZml4XG4gICAgICAgICYmIChpc0FjdGl2ZS52YWx1ZSA9PT0gZmFsc2UgfHwgcHJvcHMuc3RlcHBlci5hY3RpdmVJY29uID09PSAnbm9uZScpXG4gICAgICAgICYmIChpc0Vycm9yLnZhbHVlID09PSBmYWxzZSB8fCBwcm9wcy5zdGVwcGVyLmVycm9ySWNvbiA9PT0gJ25vbmUnKVxuICAgICAgICAmJiAoaXNEb25lLnZhbHVlID09PSBmYWxzZSB8fCBwcm9wcy5zdGVwcGVyLmRvbmVJY29uID09PSAnbm9uZScpXG4gICAgfSlcblxuICAgIGNvbnN0IGljb24gPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBkZWZhdWx0SWNvbiA9IHByb3BzLnN0ZXAuaWNvbiB8fCBwcm9wcy5zdGVwcGVyLmluYWN0aXZlSWNvblxuXG4gICAgICBpZiAoaXNBY3RpdmUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgaWNvbiA9IHByb3BzLnN0ZXAuYWN0aXZlSWNvbiB8fCBwcm9wcy5zdGVwcGVyLmFjdGl2ZUljb25cbiAgICAgICAgcmV0dXJuIGljb24gPT09ICdub25lJ1xuICAgICAgICAgID8gZGVmYXVsdEljb25cbiAgICAgICAgICA6IGljb24gfHwgJHEuaWNvblNldC5zdGVwcGVyLmFjdGl2ZVxuICAgICAgfVxuXG4gICAgICBpZiAoaXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBpY29uID0gcHJvcHMuc3RlcC5lcnJvckljb24gfHwgcHJvcHMuc3RlcHBlci5lcnJvckljb25cbiAgICAgICAgcmV0dXJuIGljb24gPT09ICdub25lJ1xuICAgICAgICAgID8gZGVmYXVsdEljb25cbiAgICAgICAgICA6IGljb24gfHwgJHEuaWNvblNldC5zdGVwcGVyLmVycm9yXG4gICAgICB9XG5cbiAgICAgIGlmIChpc0Rpc2FibGUudmFsdWUgPT09IGZhbHNlICYmIGlzRG9uZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBpY29uID0gcHJvcHMuc3RlcC5kb25lSWNvbiB8fCBwcm9wcy5zdGVwcGVyLmRvbmVJY29uXG4gICAgICAgIHJldHVybiBpY29uID09PSAnbm9uZSdcbiAgICAgICAgICA/IGRlZmF1bHRJY29uXG4gICAgICAgICAgOiBpY29uIHx8ICRxLmljb25TZXQuc3RlcHBlci5kb25lXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZWZhdWx0SWNvblxuICAgIH0pXG5cbiAgICBjb25zdCBjb2xvciA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGVycm9yQ29sb3IgPSBpc0Vycm9yLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gcHJvcHMuc3RlcC5lcnJvckNvbG9yIHx8IHByb3BzLnN0ZXBwZXIuZXJyb3JDb2xvclxuICAgICAgICA6IHZvaWQgMFxuXG4gICAgICBpZiAoaXNBY3RpdmUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgY29sb3IgPSBwcm9wcy5zdGVwLmFjdGl2ZUNvbG9yIHx8IHByb3BzLnN0ZXBwZXIuYWN0aXZlQ29sb3IgfHwgcHJvcHMuc3RlcC5jb2xvclxuICAgICAgICByZXR1cm4gY29sb3IgIT09IHZvaWQgMFxuICAgICAgICAgID8gY29sb3JcbiAgICAgICAgICA6IGVycm9yQ29sb3JcbiAgICAgIH1cbiAgICAgIGlmIChlcnJvckNvbG9yICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIGVycm9yQ29sb3JcbiAgICAgIH1cbiAgICAgIGlmIChpc0Rpc2FibGUudmFsdWUgPT09IGZhbHNlICYmIGlzRG9uZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gcHJvcHMuc3RlcC5kb25lQ29sb3IgfHwgcHJvcHMuc3RlcHBlci5kb25lQ29sb3IgfHwgcHJvcHMuc3RlcC5jb2xvciB8fCBwcm9wcy5zdGVwcGVyLmluYWN0aXZlQ29sb3JcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb3BzLnN0ZXAuY29sb3IgfHwgcHJvcHMuc3RlcHBlci5pbmFjdGl2ZUNvbG9yXG4gICAgfSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4gJ3Etc3RlcHBlcl9fdGFiIGNvbC1ncm93IGZsZXggaXRlbXMtY2VudGVyIG5vLXdyYXAgcmVsYXRpdmUtcG9zaXRpb24nXG4gICAgICAgICsgKGNvbG9yLnZhbHVlICE9PSB2b2lkIDAgPyBgIHRleHQtJHsgY29sb3IudmFsdWUgfWAgOiAnJylcbiAgICAgICAgKyAoaXNFcnJvci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJyBxLXN0ZXBwZXJfX3RhYi0tZXJyb3IgcS1zdGVwcGVyX190YWItLWVycm9yLXdpdGgtJyArIChoYXNQcmVmaXgudmFsdWUgPT09IHRydWUgPyAncHJlZml4JyA6ICdpY29uJylcbiAgICAgICAgICA6ICcnKVxuICAgICAgICArIChpc0FjdGl2ZS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zdGVwcGVyX190YWItLWFjdGl2ZScgOiAnJylcbiAgICAgICAgKyAoaXNEb25lLnZhbHVlID09PSB0cnVlID8gJyBxLXN0ZXBwZXJfX3RhYi0tZG9uZScgOiAnJylcbiAgICAgICAgKyAoaGVhZGVyTmF2LnZhbHVlID09PSB0cnVlID8gJyBxLXN0ZXBwZXJfX3RhYi0tbmF2aWdhdGlvbiBxLWZvY3VzYWJsZSBxLWhvdmVyYWJsZScgOiAnJylcbiAgICAgICAgKyAoaXNEaXNhYmxlLnZhbHVlID09PSB0cnVlID8gJyBxLXN0ZXBwZXJfX3RhYi0tZGlzYWJsZWQnIDogJycpXG4gICAgfSlcblxuICAgIGNvbnN0IHJpcHBsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLnN0ZXBwZXIuaGVhZGVyTmF2ICE9PSB0cnVlXG4gICAgICAgID8gZmFsc2VcbiAgICAgICAgOiBoZWFkZXJOYXYudmFsdWVcbiAgICApKVxuXG4gICAgZnVuY3Rpb24gb25BY3RpdmF0ZSAoKSB7XG4gICAgICBibHVyUmVmLnZhbHVlICE9PSBudWxsICYmIGJsdXJSZWYudmFsdWUuZm9jdXMoKVxuICAgICAgaXNBY3RpdmUudmFsdWUgPT09IGZhbHNlICYmIHByb3BzLmdvVG9QYW5lbChwcm9wcy5zdGVwLm5hbWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXl1cCAoZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMgJiYgaXNBY3RpdmUudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIHByb3BzLmdvVG9QYW5lbChwcm9wcy5zdGVwLm5hbWUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH1cblxuICAgICAgaWYgKGhlYWRlck5hdi52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBkYXRhLm9uQ2xpY2sgPSBvbkFjdGl2YXRlXG4gICAgICAgIGRhdGEub25LZXl1cCA9IG9uS2V5dXBcblxuICAgICAgICBPYmplY3QuYXNzaWduKGRhdGEsXG4gICAgICAgICAgaXNEaXNhYmxlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICA/IHsgdGFiaW5kZXg6IC0xLCAnYXJpYS1kaXNhYmxlZCc6ICd0cnVlJyB9XG4gICAgICAgICAgICA6IHsgdGFiaW5kZXg6IGF0dHJzLnRhYmluZGV4IHx8IDAgfVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNoaWxkID0gW1xuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1mb2N1cy1oZWxwZXInLCB0YWJpbmRleDogLTEsIHJlZjogYmx1clJlZiB9KSxcblxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS1zdGVwcGVyX19kb3Qgcm93IGZsZXgtY2VudGVyIHEtc3RlcHBlcl9fbGluZSByZWxhdGl2ZS1wb3NpdGlvbicgfSwgW1xuICAgICAgICAgIGgoJ3NwYW4nLCB7IGNsYXNzOiAncm93IGZsZXgtY2VudGVyJyB9LCBbXG4gICAgICAgICAgICBoYXNQcmVmaXgudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgICAgPyBwcm9wcy5zdGVwLnByZWZpeFxuICAgICAgICAgICAgICA6IGgoUUljb24sIHsgbmFtZTogaWNvbi52YWx1ZSB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgICBdXG5cbiAgICAgIGlmIChwcm9wcy5zdGVwLnRpdGxlICE9PSB2b2lkIDAgJiYgcHJvcHMuc3RlcC50aXRsZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gW1xuICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXN0ZXBwZXJfX3RpdGxlJyB9LCBwcm9wcy5zdGVwLnRpdGxlKVxuICAgICAgICBdXG5cbiAgICAgICAgaWYgKHByb3BzLnN0ZXAuY2FwdGlvbiAhPT0gdm9pZCAwICYmIHByb3BzLnN0ZXAuY2FwdGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnRlbnQucHVzaChcbiAgICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXN0ZXBwZXJfX2NhcHRpb24nIH0sIHByb3BzLnN0ZXAuY2FwdGlvbilcbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1zdGVwcGVyX19sYWJlbCBxLXN0ZXBwZXJfX2xpbmUgcmVsYXRpdmUtcG9zaXRpb24nXG4gICAgICAgICAgfSwgY29udGVudClcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gd2l0aERpcmVjdGl2ZXMoXG4gICAgICAgIGgoJ2RpdicsIGRhdGEsIGNoaWxkKSxcbiAgICAgICAgWyBbIFJpcHBsZSwgcmlwcGxlLnZhbHVlIF0gXVxuICAgICAgKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIGluamVjdCwgZ2V0Q3VycmVudEluc3RhbmNlLCBLZWVwQWxpdmUgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRU2xpZGVUcmFuc2l0aW9uIGZyb20gJy4uL3NsaWRlLXRyYW5zaXRpb24vUVNsaWRlVHJhbnNpdGlvbi5qcydcbmltcG9ydCBTdGVwSGVhZGVyIGZyb20gJy4vU3RlcEhlYWRlci5qcydcblxuaW1wb3J0IHsgdXNlUGFuZWxDaGlsZFByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtcGFuZWwvdXNlLXBhbmVsLmpzJ1xuaW1wb3J0IHVzZVJlbmRlckNhY2hlIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3VzZS1yZW5kZXItY2FjaGUvdXNlLXJlbmRlci1jYWNoZS5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgc3RlcHBlcktleSwgZW1wdHlSZW5kZXJGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuc3ltYm9scy9zeW1ib2xzLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmZ1bmN0aW9uIGdldFN0ZXBXcmFwcGVyIChzbG90cykge1xuICByZXR1cm4gaCgnZGl2Jywge1xuICAgIGNsYXNzOiAncS1zdGVwcGVyX19zdGVwLWNvbnRlbnQnXG4gIH0sIFtcbiAgICBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogJ3Etc3RlcHBlcl9fc3RlcC1pbm5lcidcbiAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgXSlcbn1cblxuY29uc3QgUGFuZWxXcmFwcGVyID0ge1xuICBzZXR1cCAoXywgeyBzbG90cyB9KSB7XG4gICAgcmV0dXJuICgpID0+IGdldFN0ZXBXcmFwcGVyKHNsb3RzKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU3RlcCcsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VQYW5lbENoaWxkUHJvcHMsXG5cbiAgICBpY29uOiBTdHJpbmcsXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICB0aXRsZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIGNhcHRpb246IFN0cmluZyxcbiAgICBwcmVmaXg6IFsgU3RyaW5nLCBOdW1iZXIgXSxcblxuICAgIGRvbmVJY29uOiBTdHJpbmcsXG4gICAgZG9uZUNvbG9yOiBTdHJpbmcsXG4gICAgYWN0aXZlSWNvbjogU3RyaW5nLFxuICAgIGFjdGl2ZUNvbG9yOiBTdHJpbmcsXG4gICAgZXJyb3JJY29uOiBTdHJpbmcsXG4gICAgZXJyb3JDb2xvcjogU3RyaW5nLFxuXG4gICAgaGVhZGVyTmF2OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgZG9uZTogQm9vbGVhbixcbiAgICBlcnJvcjogQm9vbGVhbixcblxuICAgIG9uU2Nyb2xsOiBbIEZ1bmN0aW9uLCBBcnJheSBdXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCAkc3RlcHBlciA9IGluamVjdChzdGVwcGVyS2V5LCBlbXB0eVJlbmRlckZuKVxuICAgIGlmICgkc3RlcHBlciA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUVN0ZXAgbmVlZHMgdG8gYmUgYSBjaGlsZCBvZiBRU3RlcHBlcicpXG4gICAgICByZXR1cm4gZW1wdHlSZW5kZXJGblxuICAgIH1cblxuICAgIGNvbnN0IHsgZ2V0Q2FjaGUgfSA9IHVzZVJlbmRlckNhY2hlKClcblxuICAgIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcblxuICAgIGNvbnN0IGlzQWN0aXZlID0gY29tcHV0ZWQoKCkgPT4gJHN0ZXBwZXIudmFsdWUubW9kZWxWYWx1ZSA9PT0gcHJvcHMubmFtZSlcblxuICAgIGNvbnN0IHNjcm9sbEV2ZW50ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgKCRxLnBsYXRmb3JtLmlzLmlvcyAhPT0gdHJ1ZSAmJiAkcS5wbGF0Zm9ybS5pcy5jaHJvbWUgPT09IHRydWUpXG4gICAgICAgIHx8IGlzQWN0aXZlLnZhbHVlICE9PSB0cnVlXG4gICAgICAgIHx8ICRzdGVwcGVyLnZhbHVlLnZlcnRpY2FsICE9PSB0cnVlXG4gICAgICAgID8ge31cbiAgICAgICAgOiB7XG4gICAgICAgICAgICBvblNjcm9sbCAoZSkge1xuICAgICAgICAgICAgICBjb25zdCB7IHRhcmdldCB9ID0gZVxuICAgICAgICAgICAgICBpZiAodGFyZ2V0LnNjcm9sbFRvcCA+IDApIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2Nyb2xsVG9wID0gMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHByb3BzLm9uU2Nyb2xsICE9PSB2b2lkIDAgJiYgZW1pdCgnc2Nyb2xsJywgZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgKSlcblxuICAgIGNvbnN0IGNvbnRlbnRLZXkgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICB0eXBlb2YgcHJvcHMubmFtZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHByb3BzLm5hbWUgPT09ICdudW1iZXInXG4gICAgICAgID8gcHJvcHMubmFtZVxuICAgICAgICA6IFN0cmluZyhwcm9wcy5uYW1lKVxuICAgICkpXG5cbiAgICBmdW5jdGlvbiBnZXRTdGVwQ29udGVudCAoKSB7XG4gICAgICBjb25zdCB2ZXJ0aWNhbCA9ICRzdGVwcGVyLnZhbHVlLnZlcnRpY2FsXG5cbiAgICAgIGlmICh2ZXJ0aWNhbCA9PT0gdHJ1ZSAmJiAkc3RlcHBlci52YWx1ZS5rZWVwQWxpdmUgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGgoXG4gICAgICAgICAgS2VlcEFsaXZlLFxuICAgICAgICAgICRzdGVwcGVyLnZhbHVlLmtlZXBBbGl2ZVByb3BzLnZhbHVlLFxuICAgICAgICAgIGlzQWN0aXZlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICBoKFxuICAgICAgICAgICAgICAgICAgJHN0ZXBwZXIudmFsdWUubmVlZHNVbmlxdWVLZWVwQWxpdmVXcmFwcGVyLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICAgICAgICAgID8gZ2V0Q2FjaGUoY29udGVudEtleS52YWx1ZSwgKCkgPT4gKHsgLi4uUGFuZWxXcmFwcGVyLCBuYW1lOiBjb250ZW50S2V5LnZhbHVlIH0pKVxuICAgICAgICAgICAgICAgICAgICA6IFBhbmVsV3JhcHBlcixcbiAgICAgICAgICAgICAgICAgIHsga2V5OiBjb250ZW50S2V5LnZhbHVlIH0sXG4gICAgICAgICAgICAgICAgICBzbG90cy5kZWZhdWx0XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2ZXJ0aWNhbCAhPT0gdHJ1ZSB8fCBpc0FjdGl2ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IGdldFN0ZXBXcmFwcGVyKHNsb3RzKVxuICAgICAgICA6IHZvaWQgMFxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiBoKFxuICAgICAgJ2RpdicsXG4gICAgICB7IHJlZjogcm9vdFJlZiwgY2xhc3M6ICdxLXN0ZXBwZXJfX3N0ZXAnLCByb2xlOiAndGFicGFuZWwnLCAuLi5zY3JvbGxFdmVudC52YWx1ZSB9LFxuICAgICAgJHN0ZXBwZXIudmFsdWUudmVydGljYWwgPT09IHRydWVcbiAgICAgICAgPyBbXG4gICAgICAgICAgICBoKFN0ZXBIZWFkZXIsIHtcbiAgICAgICAgICAgICAgc3RlcHBlcjogJHN0ZXBwZXIudmFsdWUsXG4gICAgICAgICAgICAgIHN0ZXA6IHByb3BzLFxuICAgICAgICAgICAgICBnb1RvUGFuZWw6ICRzdGVwcGVyLnZhbHVlLmdvVG9QYW5lbFxuICAgICAgICAgICAgfSksXG5cbiAgICAgICAgICAgICRzdGVwcGVyLnZhbHVlLmFuaW1hdGVkID09PSB0cnVlXG4gICAgICAgICAgICAgID8gaChRU2xpZGVUcmFuc2l0aW9uLCBnZXRTdGVwQ29udGVudClcbiAgICAgICAgICAgICAgOiBnZXRTdGVwQ29udGVudCgpXG4gICAgICAgICAgXVxuICAgICAgICA6IFsgZ2V0U3RlcENvbnRlbnQoKSBdXG4gICAgKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU3RlcHBlck5hdmlnYXRpb24nLFxuXG4gIHNldHVwIChfLCB7IHNsb3RzIH0pIHtcbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2JywgeyBjbGFzczogJ3Etc3RlcHBlcl9fbmF2JyB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBwcm92aWRlLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBTdGVwSGVhZGVyIGZyb20gJy4vU3RlcEhlYWRlci5qcydcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZGFyay91c2UtZGFyay5qcydcbmltcG9ydCB1c2VQYW5lbCwgeyB1c2VQYW5lbFByb3BzLCB1c2VQYW5lbEVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtcGFuZWwvdXNlLXBhbmVsLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBzdGVwcGVyS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5zeW1ib2xzL3N5bWJvbHMuanMnXG5pbXBvcnQgeyBoU2xvdCwgaE1lcmdlU2xvdCwgaERpciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuY29uc3QgY2FtZWxSRSA9IC8oLVxcdykvZ1xuXG5mdW5jdGlvbiBjYW1lbGl6ZVByb3BzIChwcm9wcykge1xuICBjb25zdCBhY2MgPSB7fVxuICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wcykge1xuICAgIGNvbnN0IG5ld0tleSA9IGtleS5yZXBsYWNlKGNhbWVsUkUsIG0gPT4gbVsgMSBdLnRvVXBwZXJDYXNlKCkpXG4gICAgYWNjWyBuZXdLZXkgXSA9IHByb3BzWyBrZXkgXVxuICB9XG4gIHJldHVybiBhY2Ncbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FTdGVwcGVyJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcbiAgICAuLi51c2VQYW5lbFByb3BzLFxuXG4gICAgZmxhdDogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBhbHRlcm5hdGl2ZUxhYmVsczogQm9vbGVhbixcbiAgICBoZWFkZXJOYXY6IEJvb2xlYW4sXG4gICAgY29udHJhY3RlZDogQm9vbGVhbixcbiAgICBoZWFkZXJDbGFzczogU3RyaW5nLFxuXG4gICAgaW5hY3RpdmVDb2xvcjogU3RyaW5nLFxuICAgIGluYWN0aXZlSWNvbjogU3RyaW5nLFxuICAgIGRvbmVJY29uOiBTdHJpbmcsXG4gICAgZG9uZUNvbG9yOiBTdHJpbmcsXG4gICAgYWN0aXZlSWNvbjogU3RyaW5nLFxuICAgIGFjdGl2ZUNvbG9yOiBTdHJpbmcsXG4gICAgZXJyb3JJY29uOiBTdHJpbmcsXG4gICAgZXJyb3JDb2xvcjogU3RyaW5nXG4gIH0sXG5cbiAgZW1pdHM6IHVzZVBhbmVsRW1pdHMsXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgdm0ucHJveHkuJHEpXG5cbiAgICBjb25zdCB7XG4gICAgICB1cGRhdGVQYW5lbHNMaXN0LCBpc1ZhbGlkUGFuZWxOYW1lLFxuICAgICAgdXBkYXRlUGFuZWxJbmRleCwgZ2V0UGFuZWxDb250ZW50LFxuICAgICAgZ2V0UGFuZWxzLCBwYW5lbERpcmVjdGl2ZXMsIGdvVG9QYW5lbCxcbiAgICAgIGtlZXBBbGl2ZVByb3BzLCBuZWVkc1VuaXF1ZUtlZXBBbGl2ZVdyYXBwZXJcbiAgICB9ID0gdXNlUGFuZWwoKVxuXG4gICAgcHJvdmlkZShzdGVwcGVyS2V5LCBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgZ29Ub1BhbmVsLFxuICAgICAga2VlcEFsaXZlUHJvcHMsXG4gICAgICBuZWVkc1VuaXF1ZUtlZXBBbGl2ZVdyYXBwZXIsXG4gICAgICAuLi5wcm9wc1xuICAgIH0pKSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtc3RlcHBlciBxLXN0ZXBwZXItLSR7IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJyB9YFxuICAgICAgKyAocHJvcHMuZmxhdCA9PT0gdHJ1ZSA/ICcgcS1zdGVwcGVyLS1mbGF0JyA6ICcnKVxuICAgICAgKyAocHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtc3RlcHBlci0tYm9yZGVyZWQnIDogJycpXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtc3RlcHBlci0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgaGVhZGVyQ2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1zdGVwcGVyX19oZWFkZXIgcm93IGl0ZW1zLXN0cmV0Y2gganVzdGlmeS1iZXR3ZWVuJ1xuICAgICAgKyBgIHEtc3RlcHBlcl9faGVhZGVyLS0keyBwcm9wcy5hbHRlcm5hdGl2ZUxhYmVscyA9PT0gdHJ1ZSA/ICdhbHRlcm5hdGl2ZScgOiAnc3RhbmRhcmQnIH0tbGFiZWxzYFxuICAgICAgKyAocHJvcHMuZmxhdCA9PT0gZmFsc2UgfHwgcHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtc3RlcHBlcl9faGVhZGVyLS1ib3JkZXInIDogJycpXG4gICAgICArIChwcm9wcy5jb250cmFjdGVkID09PSB0cnVlID8gJyBxLXN0ZXBwZXJfX2hlYWRlci0tY29udHJhY3RlZCcgOiAnJylcbiAgICAgICsgKHByb3BzLmhlYWRlckNsYXNzICE9PSB2b2lkIDAgPyBgICR7IHByb3BzLmhlYWRlckNsYXNzIH1gIDogJycpXG4gICAgKVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgICBjb25zdCB0b3AgPSBoU2xvdChzbG90cy5tZXNzYWdlLCBbXSlcblxuICAgICAgaWYgKHByb3BzLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICAgIGlzVmFsaWRQYW5lbE5hbWUocHJvcHMubW9kZWxWYWx1ZSkgJiYgdXBkYXRlUGFuZWxJbmRleCgpXG5cbiAgICAgICAgY29uc3QgY29udGVudCA9IGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3Etc3RlcHBlcl9fY29udGVudCdcbiAgICAgICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG5cbiAgICAgICAgcmV0dXJuIHRvcCA9PT0gdm9pZCAwXG4gICAgICAgICAgPyBbIGNvbnRlbnQgXVxuICAgICAgICAgIDogdG9wLmNvbmNhdChjb250ZW50KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gW1xuICAgICAgICBoKFxuICAgICAgICAgICdkaXYnLFxuICAgICAgICAgIHsgY2xhc3M6IGhlYWRlckNsYXNzZXMudmFsdWUgfSxcbiAgICAgICAgICBnZXRQYW5lbHMoKS5tYXAocGFuZWwgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RlcCA9IGNhbWVsaXplUHJvcHMocGFuZWwucHJvcHMpXG5cbiAgICAgICAgICAgIHJldHVybiBoKFN0ZXBIZWFkZXIsIHtcbiAgICAgICAgICAgICAga2V5OiBzdGVwLm5hbWUsXG4gICAgICAgICAgICAgIHN0ZXBwZXI6IHByb3BzLFxuICAgICAgICAgICAgICBzdGVwLFxuICAgICAgICAgICAgICBnb1RvUGFuZWxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgKSxcblxuICAgICAgICB0b3AsXG5cbiAgICAgICAgaERpcihcbiAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICB7IGNsYXNzOiAncS1zdGVwcGVyX19jb250ZW50IHEtcGFuZWwtcGFyZW50JyB9LFxuICAgICAgICAgIGdldFBhbmVsQ29udGVudCgpLFxuICAgICAgICAgICdjb250JyxcbiAgICAgICAgICBwcm9wcy5zd2lwZWFibGUsXG4gICAgICAgICAgKCkgPT4gcGFuZWxEaXJlY3RpdmVzLnZhbHVlXG4gICAgICAgIClcbiAgICAgIF1cbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdXBkYXRlUGFuZWxzTGlzdChzbG90cylcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWVcbiAgICAgIH0sIGhNZXJnZVNsb3Qoc2xvdHMubmF2aWdhdGlvbiwgZ2V0Q29udGVudCgpKSlcbiAgICB9XG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XG4gIDxxLWNhcmQgZmxhdCBjbGFzcz1cInEtcGEtc21cIiBzdHlsZT1cIndpZHRoOiA1MDBweDsgbWF4LXdpZHRoOiA4MHZ3XCI+XG4gICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIiBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJwcm9maWxlLXBpY3R1cmVcIlxuICAgICAgICAgIDpzdHlsZT1cInsgd2lkdGg6IHNpemUgKyAncHgnLCBoZWlnaHQ6IHNpemUgKyAncHgnIH1cIlxuICAgICAgICA+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cImZpbGVJbnB1dFwiPlxuICAgICAgICAgICAgPHEtYXZhdGFyIHNpemU9XCIxNTBweFwiIGNvbG9yPVwiZ3JleS0yXCI+XG4gICAgICAgICAgICAgIDxpbWcgOnNyYz1cImltYWdlVXJsXCIgOmFsdD1cImFsdFRleHRcIiBAZXJyb3I9XCJoYW5kbGVJbWFnZUVycm9yXCIgLz5cbiAgICAgICAgICAgIDwvcS1hdmF0YXI+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICBpZD1cImZpbGVJbnB1dFwiXG4gICAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxuICAgICAgICAgICAgICBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIlxuICAgICAgICAgICAgICBAY2hhbmdlPVwiaGFuZGxlRmlsZUNoYW5nZVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm92ZXJsYXlcIiB2LWlmPVwiaG92ZXJlZFwiPlxuICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwiZWRpdFwiIEBjbGljaz1cImVkaXRJbWFnZVwiIGNsYXNzPVwiZWRpdC1pY29uXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+UHJvZmlsZTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXIteS1zbVwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwiJGVtaXQoJ3VwZGF0ZURhdGEnLCBzaWduVXBGb3JtKVwiXG4gICAgICAgICAgICB2LW1vZGVsPVwic2lnblVwRm9ybS5lbWFpbFwiXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZW1haWxcIlxuICAgICAgICAgICAgbGF6eS1ydWxlc1xuICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+ICh2YWwgJiYgdmFsLmxlbmd0aCA+IDApIHx8ICdFbWFpbCByZXF1aXJlZCddXCJcbiAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgICAgICBzdWZmaXg9XCJAZ21haWwuY29tXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OnByZXBlbmQ+XG4gICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cIm1haWxcIiAvPlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICB2LW1vZGVsPVwic2lnblVwRm9ybS5wYXNzd29yZFwiXG4gICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwiJGVtaXQoJ3VwZGF0ZURhdGEnLCBzaWduVXBGb3JtKVwiXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIlxuICAgICAgICAgICAgOnR5cGU9XCJpc1B3ZCA/ICdwYXNzd29yZCcgOiAndGV4dCdcIlxuICAgICAgICAgICAgbGF6eS1ydWxlc1xuICAgICAgICAgICAgOnJ1bGVzPVwiW1xuICAgICAgICAgICAgICAodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnUGFzc3dvcmQgaXMgcmVxdWlyZWQnLFxuICAgICAgICAgICAgXVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpwcmVwZW5kPlxuICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJsb2NrXCIgLz5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgICAgICAgPHEtaWNvblxuICAgICAgICAgICAgICAgIDpuYW1lPVwiaXNQd2QgPyAndmlzaWJpbGl0eV9vZmYnIDogJ3Zpc2liaWxpdHknXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICBAY2xpY2s9XCJpc1B3ZCA9ICFpc1B3ZFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJzaWduVXBGb3JtLmNvbmZpcm1QYXNzXCJcbiAgICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCIkZW1pdCgndXBkYXRlRGF0YScsIHNpZ25VcEZvcm0pXCJcbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgOnR5cGU9XCJpc1B3ZENvbmZpcm0gPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQ29uZmlybSBwYXNzd29yZFwiXG4gICAgICAgICAgICBsYXp5LXJ1bGVzXG4gICAgICAgICAgICA6cnVsZXM9XCJbXG4gICAgICAgICAgICAgICgpID0+XG4gICAgICAgICAgICAgICAgc2lnblVwRm9ybS5wYXNzd29yZCA9PT0gc2lnblVwRm9ybS5jb25maXJtUGFzcyB8fFxuICAgICAgICAgICAgICAgIGBQYXNzd29yZHMgZG9lc24ndCBtYXRjaGAsIC8vIEN1c3RvbSB2YWxpZGF0aW9uIHJ1bGVcbiAgICAgICAgICAgIF1cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6cHJlcGVuZD5cbiAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwibG9ja1wiIC8+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgIDxxLWljb25cbiAgICAgICAgICAgICAgICA6bmFtZT1cImlzUHdkQ29uZmlybSA/ICd2aXNpYmlsaXR5X29mZicgOiAndmlzaWJpbGl0eSdcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgIEBjbGljaz1cImlzUHdkQ29uZmlybSA9ICFpc1B3ZENvbmZpcm1cIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8IS0tIDxxLWNhcmQtc2VjdFxuICAgICAgPjxxLWJ0biBsYWJlbD1cIk5leHRcIiBjb2xvcj1cInByaW1hcnlcIiBAY2xpY2s9XCJ2YWxpZGF0ZUFuZFByb2NlZWRcIlxuICAgIC8+PC9xLWNhcmQtc2VjdD4gLS0+XG4gIDwvcS1jYXJkPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgcmVhY3RpdmUsIG9uTW91bnRlZCB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgY29uZmlybVBhc3MgPSByZWYoXCJcIik7XG5jb25zdCBpc1B3ZCA9IHJlZih0cnVlKTtcbmNvbnN0IGlzUHdkQ29uZmlybSA9IHJlZih0cnVlKTtcbmNvbnN0IGFsdFRleHQgPSBcIlByb2ZpbGUgUGljdHVyZVwiOyAvLyBEZWZhdWx0IGFsdCB0ZXh0XG5jb25zdCBzaXplID0gcmVmKDE1MCk7IC8vIERlZmF1bHQgc2l6ZVxuY29uc3QgaG92ZXJlZCA9IHJlZihmYWxzZSk7XG5jb25zdCBpbWFnZVVybCA9IHJlZihcImh0dHBzOi8vY2RuLnF1YXNhci5kZXYvaW1nL2JveS1hdmF0YXIucG5nXCIpOyAvLyBEZWZhdWx0IGltYWdlIFVSTFxuXG5kZWZpbmVFbWl0cyhbXCJ1cGRhdGVEYXRhXCJdKTtcbmNvbnN0IHsgdXNlckRhdGEgfSA9IGRlZmluZVByb3BzKFtcInVzZXJEYXRhXCJdKTtcblxuY29uc3Qgc2lnblVwRm9ybSA9IHJlYWN0aXZlKHtcbiAgZW1haWw6IFwiXCIsXG4gIHBhc3N3b3JkOiBcIlwiLFxuICBjb25maXJtUGFzczogXCJcIixcbn0pO1xuXG5vbk1vdW50ZWQoKCkgPT4ge1xuICBPYmplY3QuYXNzaWduKHNpZ25VcEZvcm0sIHVzZXJEYXRhKTtcbn0pO1xuXG5jb25zdCBoYW5kbGVJbWFnZUVycm9yID0gKCkgPT4ge1xuICAvLyBIYW5kbGUgaW1hZ2UgbG9hZGluZyBlcnJvciBieSB1cGRhdGluZyB0aGUgaW1hZ2UgVVJMXG4gIGltYWdlVXJsLnZhbHVlID0gXCJodHRwczovL2Nkbi5xdWFzYXIuZGV2L2ltZy9ib3ktYXZhdGFyLnBuZ1wiOyAvLyBEZWZhdWx0IGltYWdlIFVSTFxufTtcblxuY29uc3QgZWRpdEltYWdlID0gKCkgPT4ge1xuICAvLyBMb2dpYyBmb3IgZWRpdGluZyB0aGUgaW1hZ2UgKGUuZy4sIG9wZW4gYSBtb2RhbCBvciBuYXZpZ2F0ZSB0byBhbiBlZGl0IHBhZ2UpXG4gIGNvbnNvbGUubG9nKFwiRWRpdCBpbWFnZSBjbGlja2VkXCIpO1xufTtcblxuY29uc3QgaGFuZGxlRmlsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICBjb25zdCBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzWzBdO1xuICBpZiAoZmlsZSkge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGltYWdlVXJsLnZhbHVlID0gcmVhZGVyLnJlc3VsdDsgLy8gVXBkYXRlIHRoZSBpbWFnZSBVUkwgd2l0aCB0aGUgZGF0YSBVUkwgb2YgdGhlIHNlbGVjdGVkIGZpbGVcbiAgICB9O1xuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICB9XG59O1xuPC9zY3JpcHQ+XG48c3R5bGUgc2NvcGVkPlxuLnByb2ZpbGUtcGljdHVyZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBib3JkZXItcmFkaXVzOiA1MCU7IC8qIFNldCBib3JkZXItcmFkaXVzIHRvIDUwJSBmb3IgYSBjaXJjdWxhciBhdmF0YXIgKi9cbiAgYm9yZGVyOiAzcHggc29saWQgI2ZmZjsgLyogQWRkIGEgYm9yZGVyIHdpdGggd2hpdGUgY29sb3IgKi9cbn1cblxuLnByb2ZpbGUtcGljdHVyZSBpbWcge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogYXV0bztcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xufVxuXG4ub3ZlcmxheSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBvcGFjaXR5OiAwO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZTtcbn1cblxuLm92ZXJsYXk6aG92ZXIge1xuICBvcGFjaXR5OiAxO1xufVxuXG4uZWRpdC1pY29uIHtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDI0cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWNhcmQgZmxhdCBzdHlsZT1cIndpZHRoOiA1MDBweDsgbWF4LXdpZHRoOiA4MHZ3XCI+XG4gICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXktc21cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXktc20gcS1teC1hdXRvXCI+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIGNsYXNzPVwidGV4dC1jYXBpdGFsaXplXCJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJ1c2VyUGVyc29uYWxJbmZvRm9ybS51c2VyX2ZpcnN0X25hbWVcIlxuICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIiRlbWl0KCd1cGRhdGVEYXRhJywgdXNlclBlcnNvbmFsSW5mb0Zvcm0pXCJcbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgbGFiZWw9XCJGaXJzdCBOYW1lXCJcbiAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnUmVxdWlyZWQnXVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgY2xhc3M9XCJ0ZXh0LWNhcGl0YWxpemVcIlxuICAgICAgICAgICAgdi1tb2RlbD1cInVzZXJQZXJzb25hbEluZm9Gb3JtLnVzZXJfbWlkZGxlX25hbWVcIlxuICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIiRlbWl0KCd1cGRhdGVEYXRhJywgdXNlclBlcnNvbmFsSW5mb0Zvcm0pXCJcbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgbGFiZWw9XCJNaWRkbGUgTmFtZVwiXG4gICAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCkgfHwgJ1JlcXVpcmVkJ11cIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIGNsYXNzPVwidGV4dC1jYXBpdGFsaXplXCJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJ1c2VyUGVyc29uYWxJbmZvRm9ybS51c2VyX2xhc3RfbmFtZVwiXG4gICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwiJGVtaXQoJ3VwZGF0ZURhdGEnLCB1c2VyUGVyc29uYWxJbmZvRm9ybSlcIlxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBsYWJlbD1cIkxhc3QgTmFtZVwiXG4gICAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCkgfHwgJ1JlcXVpcmVkJ11cIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIGNsYXNzPVwidGV4dC1jYXBpdGFsaXplXCJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJ1c2VyUGVyc29uYWxJbmZvRm9ybS51c2VyX2FkZHJlc3NcIlxuICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIiRlbWl0KCd1cGRhdGVEYXRhJywgdXNlclBlcnNvbmFsSW5mb0Zvcm0pXCJcbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgbGFiZWw9XCJBZGRyZXNzXCJcbiAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnUmVxdWlyZWQnXVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXIteC1zbSBpdGVtLXN0YXJ0XCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJ1c2VyUGVyc29uYWxJbmZvRm9ybS51c2VyX2JpcnRoZGF0ZVwiXG4gICAgICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCIkZW1pdCgndXBkYXRlRGF0YScsIHVzZXJQZXJzb25hbEluZm9Gb3JtKVwiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIGxhYmVsPVwiQmlydGhkYXRlXCJcbiAgICAgICAgICAgICAgdHlwZT1cImRhdGVcIlxuICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAyMzBweFwiXG4gICAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnUmVxdWlyZWQnXVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cS1zZWxlY3RcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInVzZXJQZXJzb25hbEluZm9Gb3JtLnVzZXJfc2V4XCJcbiAgICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIiRlbWl0KCd1cGRhdGVEYXRhJywgdXNlclBlcnNvbmFsSW5mb0Zvcm0pXCJcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgbGFiZWw9XCJTZXhcIlxuICAgICAgICAgICAgICA6b3B0aW9ucz1cImdlbmRlck9wdGlvbnNcIlxuICAgICAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCkgfHwgJ1JlcXVpcmVkJ11cIlxuICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMjBweFwiXG4gICAgICAgICAgICAgIGJlaGF2aW9yPVwibWVudVwiXG4gICAgICAgICAgICAgIGhpZGUtZHJvcGRvd24taWNvblxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJ1c2VyUGVyc29uYWxJbmZvRm9ybS51c2VyX3N0YXR1c1wiXG4gICAgICAgICAgICAgIDpvcHRpb25zPVwic3RhdHVzT3B0aW9uc1wiXG4gICAgICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCIkZW1pdCgndXBkYXRlRGF0YScsIHVzZXJQZXJzb25hbEluZm9Gb3JtKVwiXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGhpZGUtZHJvcGRvd24taWNvblxuICAgICAgICAgICAgICBsYWJlbD1cIlN0YXR1c1wiXG4gICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEwMHB4XCJcbiAgICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+ICh2YWwgJiYgdmFsLmxlbmd0aCA+IDApIHx8ICdSZXF1aXJlZCddXCJcbiAgICAgICAgICAgICAgYmVoYXZpb3I9XCJtZW51XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLXgtbWRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInVzZXJQZXJzb25hbEluZm9Gb3JtLnVzZXJfcGhvbmVfbnVtYmVyXCJcbiAgICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIiRlbWl0KCd1cGRhdGVEYXRhJywgdXNlclBlcnNvbmFsSW5mb0Zvcm0pXCJcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgbGFiZWw9XCJQaG9uZSBOdW1iZXJcIlxuICAgICAgICAgICAgICBtYXNrPVwiKyg2MykgIyMjIC0gIyMjIC0gIyMjI1wiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiKCs2MykgIyMjIC0gIyMjIC0gIyMjI1wiXG4gICAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnUmVxdWlyZWQnXVwiXG4gICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDMwMHB4OyBtYXgtd2lkdGg6IDUwMHB4OyBtaW4td2lkdGg6IDEwMHB4XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgICB2LW1vZGVsPVwidXNlclBlcnNvbmFsSW5mb0Zvcm0udXNlcl9wb3NpdGlvblwiXG4gICAgICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCIkZW1pdCgndXBkYXRlRGF0YScsIHVzZXJQZXJzb25hbEluZm9Gb3JtKVwiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIGhpZGUtZHJvcGRvd24taWNvblxuICAgICAgICAgICAgICBsYWJlbD1cIlBvc2l0aW9uXCJcbiAgICAgICAgICAgICAgOm9wdGlvbnM9XCJwb3NpdGlvbk9wdGlvbnNcIlxuICAgICAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCkgfHwgJ1JlcXVpcmVkJ11cIlxuICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxNTBweDsgbWF4LXdpZHRoOiA1MDBweDsgbWluLXdpZHRoOiAxMDBweFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5EZXNpZ25hdGlvbjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLXgtbWRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJ1c2VyUGVyc29uYWxJbmZvRm9ybS51c2VyX2JyYW5jaF9uYW1lXCJcbiAgICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIiRlbWl0KCd1cGRhdGVEYXQnLCB1c2VyUGVyc29uYWxJbmZvRm9ybSlcIlxuICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIHVzZS1pbnB1dFxuICAgICAgICAgICAgICBjbGVhcmFibGVcbiAgICAgICAgICAgICAgaW5wdXQtZGVib3VuY2U9XCIwXCJcbiAgICAgICAgICAgICAgOm9wdGlvbnM9XCJmaWx0ZXJCcmFuY2hPcHRpb25zXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJCcmFuY2hcIlxuICAgICAgICAgICAgICBAZmlsdGVyPVwiZmlsdGVyZWRCcmFuY2hlc1wiXG4gICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDI1MHB4OyBtYXgtd2lkdGg6IDUwMHB4OyBtaW4td2lkdGg6IDEwMHB4XCJcbiAgICAgICAgICAgICAgaGlkZS1kcm9wZG93bi1pY29uXG4gICAgICAgICAgICAgIGJlaGF2aW9yPVwibWVudVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICB2LW1vZGVsPVwidXNlclBlcnNvbmFsSW5mb0Zvcm0udXNlcl90aW1lX3NoaWZ0XCJcbiAgICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIiRlbWl0KCd1cGRhdGVEYXRhJywgdXNlclBlcnNvbmFsSW5mb0Zvcm0pXCJcbiAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBtYXNrPVwiIyM6IyMgQUFcIlxuICAgICAgICAgICAgICBsYWJlbD1cIlRpbWUgU2NoZWR1bGVcIlxuICAgICAgICAgICAgICA6cnVsZXM9XCJ2YWxpZGlkYXRlVGltZVwiXG4gICAgICAgICAgICAgIGhpbnQ9XCJGb3JtYXQ6IDAxOjAwIEFNL1BNXCJcbiAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMjAwcHg7IG1heC13aWR0aDogNTAwcHg7IG1pbi13aWR0aDogMTAwcHhcIlxuICAgICAgICAgICAgICBoaWRlLWRyb3Bkb3duLWljb25cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgPC9xLWNhcmQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgdXNlQnJhbmNoZXNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2JyYW5jaFwiO1xuaW1wb3J0IHsgb25Nb3VudGVkLCByZWFjdGl2ZSwgcmVmIH0gZnJvbSBcInZ1ZVwiO1xuXG5kZWZpbmVFbWl0cyhbXCJ1cGRhdGVEYXRhXCJdKTtcbmNvbnN0IHsgdXNlckRhdGEgfSA9IGRlZmluZVByb3BzKHtcbiAgdXNlckRhdGE6IHtcbiAgICB0eXBlOiBPYmplY3QsXG4gICAgZGVmYXVsdDogKCkgPT4gKHt9KSxcbiAgfSxcbn0pO1xuY29uc3QgYnJhbmNoZXNTdG9yZSA9IHVzZUJyYW5jaGVzU3RvcmUoKTtcbmNvbnN0IHBvc2l0aW9uT3B0aW9ucyA9IFtcbiAgXCJTdXBlciBBZG1pblwiLFxuICBcIkFkbWluXCIsXG4gIFwiU2NhbGVyXCIsXG4gIFwiTGFtZXNhZG9yXCIsXG4gIFwiSG9ybmVyb1wiLFxuICBcIkJha2VyXCIsXG4gIFwiQ2FzaGllclwiLFxuICBcIlNhbGVzIENsZXJrXCIsXG4gIFwiVXRpbGl0eVwiLFxuICBcIk5vdCBZZXQgQXNzaWduZWRcIixcbl07XG5jb25zdCBnZW5kZXJPcHRpb25zID0gW1wiTWFsZVwiLCBcIkZlbWFsZVwiXTtcbmNvbnN0IHN0YXR1c09wdGlvbnMgPSBbXCJDdXJyZW50XCIsIFwiRm9ybWVyXCJdO1xuY29uc3QgYnJhbmNoT3B0aW9ucyA9IHJlZihbXSk7XG5jb25zdCBzZWxlY3RlZEJyYW5jaCA9IHJlZihbXSk7XG5jb25zdCBmaWx0ZXJCcmFuY2hPcHRpb25zID0gcmVmKGJyYW5jaE9wdGlvbnMudmFsdWUpO1xuXG5jb25zdCB2YWxpZGlkYXRlVGltZSA9ICh2YWwpID0+IHtcbiAgY29uc3QgdGltZVJlZ2V4ID0gL14oMFsxLTldfDFbMC0yXSk6WzAtNV1bMC05XSAoQU18UE0pJC9pO1xuICByZXR1cm4gdGltZVJlZ2V4LnRlc3QodmFsKSB8fCBcIkludmFsaWQgdGltZSBmb3JtYXRcIjtcbn07XG5cbmNvbnN0IGZldGNoQnJhbmNoZXNEYXRhID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBicmFuY2ggPSBhd2FpdCBicmFuY2hlc1N0b3JlLmZldGNoQnJhbmNoZXMoKTtcbiAgYnJhbmNoT3B0aW9ucy52YWx1ZSA9IGJyYW5jaGVzU3RvcmUuYnJhbmNoZXMubWFwKCh2YWwpID0+ICh7XG4gICAgbGFiZWw6IHZhbC5uYW1lLFxuICAgIHZhbHVlOiB2YWwuaWQsXG4gIH0pKTtcbiAgZmlsdGVyQnJhbmNoT3B0aW9ucy52YWx1ZSA9IGJyYW5jaE9wdGlvbnMudmFsdWU7XG59O1xuXG5vbk1vdW50ZWQoZmV0Y2hCcmFuY2hlc0RhdGEpO1xuXG5jb25zdCBmaWx0ZXJlZEJyYW5jaGVzID0gKHZhbCwgdXBkYXRlKSA9PiB7XG4gIHVwZGF0ZSgoKSA9PiB7XG4gICAgY29uc3QgbmVlZGxlID0gdmFsLnRvTG93ZXJDYXNlKCk7XG4gICAgZmlsdGVyQnJhbmNoT3B0aW9ucy52YWx1ZSA9XG4gICAgICB2YWwgPT09IFwiXCJcbiAgICAgICAgPyBicmFuY2hPcHRpb25zLnZhbHVlXG4gICAgICAgIDogYnJhbmNoT3B0aW9ucy52YWx1ZS5maWx0ZXIoKHYpID0+XG4gICAgICAgICAgICB2LmxhYmVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobmVlZGxlKVxuICAgICAgICAgICk7XG4gIH0pO1xufTtcblxuY29uc3QgdXNlclBlcnNvbmFsSW5mb0Zvcm0gPSByZWFjdGl2ZSh7XG4gIHVzZXJfZmlyc3RfbmFtZTogXCJcIixcbiAgdXNlcl9taWRkbGVfbmFtZTogXCJcIixcbiAgdXNlcl9sYXN0X25hbWU6IFwiXCIsXG4gIHVzZXJfYWRkcmVzczogXCJcIixcbiAgdXNlcl9iaXJ0aGRhdGU6IFwiXCIsXG4gIHVzZXJfc2V4OiBcIlwiLFxuICB1c2VyX3N0YXR1czogXCJcIixcbiAgdXNlcl9waG9uZV9udW1iZXI6IFwiXCIsXG4gIHVzZXJfcG9zaXRpb246IFwiXCIsXG4gIHVzZXJfYnJhbmNoX25hbWU6IFwiXCIsXG4gIHVzZXJfdGltZV9zaGlmdDogXCJcIixcbn0pO1xuXG5jb25zb2xlLmxvZyhcInVzZXJQZXJzb25hbEluZm9Gb3JtOlwiLCB1c2VyUGVyc29uYWxJbmZvRm9ybS52YWx1ZSk7XG5vbk1vdW50ZWQoKCkgPT4ge1xuICBPYmplY3QuYXNzaWduKHVzZXJQZXJzb25hbEluZm9Gb3JtLCB1c2VyRGF0YSk7XG59KTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+PC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtY2FyZCBmbGF0PlxuICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+VXNlciBQcm9maWxlPC9kaXY+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICA8ZGl2IHYtZm9yPVwiKGluZm8sIGluZGV4KSBpbiBwcm9maWxlSW5mb1wiIDprZXk9XCJpbmRleFwiIGNsYXNzPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNlwiPlxuICAgICAgICAgIDxxLWNoaXAgc3F1YXJlIGNvbG9yPVwiZ3JleS0xXCI+e3sgaW5mby5sYWJlbCB9fTwvcS1jaGlwPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC02XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtcGEtc21cIj57eyBpbmZvLnZhbHVlIH19PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgPC9xLWNhcmQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IHsgdXNlckRhdGEgfSA9IGRlZmluZVByb3BzKFtcInVzZXJEYXRhXCJdKTtcbmNvbnN0IHsgc2F2ZSB9ID0gZGVmaW5lRW1pdHMoW1wic2F2ZVwiXSk7XG5cbmNvbnN0IHByb2ZpbGVJbmZvID0gY29tcHV0ZWQoKCkgPT4gW1xuICB7IGxhYmVsOiBcIlVzZXJuYW1lOlwiLCB2YWx1ZTogYCR7dXNlckRhdGEuZW1haWx9QGdtYWlsLmNvbWAgfSxcbiAge1xuICAgIGxhYmVsOiBcIkZ1bGwgTmFtZTpcIixcbiAgICB2YWx1ZTogYCR7dXNlckRhdGEudXNlcl9maXJzdF9uYW1lXG4gICAgICAuY2hhckF0KDApXG4gICAgICAudG9VcHBlckNhc2UoKX0ke3VzZXJEYXRhLnVzZXJfZmlyc3RfbmFtZS5zbGljZShcbiAgICAgIDFcbiAgICApfSAke3VzZXJEYXRhLnVzZXJfbWlkZGxlX25hbWVcbiAgICAgIC5jaGFyQXQoMClcbiAgICAgIC50b1VwcGVyQ2FzZSgpfSR7dXNlckRhdGEudXNlcl9taWRkbGVfbmFtZS5zbGljZShcbiAgICAgIDFcbiAgICApfSAke3VzZXJEYXRhLnVzZXJfbGFzdF9uYW1lXG4gICAgICAuY2hhckF0KDApXG4gICAgICAudG9VcHBlckNhc2UoKX0ke3VzZXJEYXRhLnVzZXJfbGFzdF9uYW1lLnNsaWNlKDEpfWAsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogXCJBZGRyZXNzOlwiLFxuICAgIHZhbHVlOiB1c2VyRGF0YS51c2VyX2FkZHJlc3MsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogXCJCaXJ0aGRhdGU6XCIsXG4gICAgdmFsdWU6XG4gICAgICB1c2VyRGF0YS51c2VyX2JpcnRoZGF0ZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArXG4gICAgICB1c2VyRGF0YS51c2VyX2JpcnRoZGF0ZS5zbGljZSgxKSxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiBcIlNleDpcIixcbiAgICB2YWx1ZTpcbiAgICAgIHVzZXJEYXRhLnVzZXJfc2V4LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdXNlckRhdGEudXNlcl9zZXguc2xpY2UoMSksXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogXCJTdGF0dXM6XCIsXG4gICAgdmFsdWU6IGAke1xuICAgICAgdXNlckRhdGEudXNlcl9zdGF0dXMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgK1xuICAgICAgdXNlckRhdGEudXNlcl9zdGF0dXMuc2xpY2UoMSlcbiAgICB9ICR7XG4gICAgICB1c2VyRGF0YS51c2VyX3Bvc2l0aW9uLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICtcbiAgICAgIHVzZXJEYXRhLnVzZXJfcG9zaXRpb24uc2xpY2UoMSlcbiAgICB9YCxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiBcIlBob25lIE51bWJlcjpcIixcbiAgICB2YWx1ZTpcbiAgICAgIHVzZXJEYXRhLnVzZXJfcGhvbmVfbnVtYmVyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICtcbiAgICAgIHVzZXJEYXRhLnVzZXJfcGhvbmVfbnVtYmVyLnNsaWNlKDEpLFxuICB9LFxuICB7XG4gICAgbGFiZWw6IFwiUG9zaXRpb246XCIsXG4gICAgdmFsdWU6XG4gICAgICB1c2VyRGF0YS51c2VyX3Bvc2l0aW9uLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICtcbiAgICAgIHVzZXJEYXRhLnVzZXJfcG9zaXRpb24uc2xpY2UoMSksXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogXCJEZXNpZ25hdGlvbjpcIixcbiAgICB2YWx1ZTogdXNlckRhdGEudXNlcl9wb3NpdGlvbiB8fCBcIlwiLFxuICB9LFxuICB7XG4gICAgbGFiZWw6IFwiQnJhbmNoOlwiLFxuICAgIHZhbHVlOiB1c2VyRGF0YS51c2VyX2JyYW5jaF9uYW1lLmxhYmVsIHx8IFwiXCIsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogXCJUaW1lIFNoaWZ0OlwiLFxuICAgIHZhbHVlOiB1c2VyRGF0YS51c2VyX3RpbWVfc2hpZnQgfHwgXCJcIixcbiAgfSxcbl0pO1xuXG5jb25zdCBzYXZlVXNlclByb2ZpbGUgPSAoKSA9PiB7XG4gIGVtaXQoXCJzYXZlXCIpO1xufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+PC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8cS1idG5cbiAgICAgIGNsYXNzPVwidGV4dC1kYXJrIHEtcGEtc21cIlxuICAgICAgb3V0bGluZVxuICAgICAgaWNvbj1cImFkZF9jaXJjbGVcIlxuICAgICAgbGFiZWw9XCJBZGQgVXNlclwiXG4gICAgICBAY2xpY2s9XCJvcGVuRGlhbG9nXCJcbiAgICAvPlxuICA8L2Rpdj5cbiAgPHEtZGlhbG9nIHYtbW9kZWw9XCJkaWFsb2dcIiBwZXJzaXN0ZW50IGZ1bGwtaGVpZ2h0PlxuICAgIDxxLWNhcmQ+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1tYS14bVwiIGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgZGVuc2Ugcm91bmQgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8cS1zdGVwcGVyXG4gICAgICAgICAgY2xhc3M9XCJcIlxuICAgICAgICAgIHYtbW9kZWw9XCJzdGVwXCJcbiAgICAgICAgICByZWY9XCJzdGVwcGVyXCJcbiAgICAgICAgICBhbmltYXRlZFxuICAgICAgICAgIGRvbmUtY29sb3I9XCJncmVlblwiXG4gICAgICAgICAgYWN0aXZlLWNvbG9yPVwiYmx1ZVwiXG4gICAgICAgICAgaW5hY3RpdmUtY29sb3I9XCJncmV5XCJcbiAgICAgICAgICBmbGF0XG4gICAgICAgICAgYWxpZ249XCJjZW50ZXJcIlxuICAgICAgICA+XG4gICAgICAgICAgPHEtc3RlcCA6bmFtZT1cIjFcIiB0aXRsZT1cIlNpZ24gVXBcIiBpY29uPVwic2V0dGluZ3NcIiA6ZG9uZT1cInN0ZXAgPiAxXCI+XG4gICAgICAgICAgICA8VXNlclN0ZXAxIEB1cGRhdGVEYXRhPVwic2V0VXNlclwiIDp1c2VyRGF0YT1cInVzZXJcIiAvPlxuICAgICAgICAgIDwvcS1zdGVwPlxuICAgICAgICAgIDxxLXN0ZXBcbiAgICAgICAgICAgIDpuYW1lPVwiMlwiXG4gICAgICAgICAgICB0aXRsZT1cIlBlcnNvbmFsIEluZm9cIlxuICAgICAgICAgICAgaWNvbj1cInNldHRpbmdzXCJcbiAgICAgICAgICAgIDpkb25lPVwic3RlcCA+IDJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxVc2VyU3RlcDIgQHVwZGF0ZURhdGE9XCJzZXRVc2VySW5mb1wiIDp1c2VyRGF0YT1cInVzZXJJbmZvXCIgLz5cbiAgICAgICAgICA8L3Etc3RlcD5cbiAgICAgICAgICA8cS1zdGVwXG4gICAgICAgICAgICA6bmFtZT1cIjNcIlxuICAgICAgICAgICAgdGl0bGU9XCJDaGVja2VkIFBlcnNvbmFsIEluZm9cIlxuICAgICAgICAgICAgaWNvbj1cInNldHRpbmdzXCJcbiAgICAgICAgICAgIDpkb25lPVwic3RlcCA+IDNcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxVc2VyU3RlcEZpbmlzaCA6dXNlckRhdGE9XCJjb21iaW5lZFVzZXJEYXRhXCIgQHNhdmU9XCJzYXZlVXNlclwiIC8+XG4gICAgICAgICAgPC9xLXN0ZXA+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpuYXZpZ2F0aW9uPlxuICAgICAgICAgICAgPHEtc3RlcHBlci1uYXZpZ2F0aW9uIGNsYXNzPVwicS1tYS1ub25lXCI+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgICB2LWlmPVwic3RlcCA+IDFcIlxuICAgICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgIEBjbGljaz1cIiRyZWZzLnN0ZXBwZXIucHJldmlvdXMoKVwiXG4gICAgICAgICAgICAgICAgICBsYWJlbD1cIkJhY2tcIlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJxLW1sLXNtXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgOmRpc2FibGU9XCJpc0Rpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgIEBjbGljaz1cIm5leHRTdGVwXCJcbiAgICAgICAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICA6bGFiZWw9XCJzdGVwID09PSAzID8gJ1NhdmUnIDogJ0NvbnRpbnVlJ1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3Etc3RlcHBlci1uYXZpZ2F0aW9uPlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDwvcS1zdGVwcGVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFVzZXJTdGVwMSBmcm9tIFwiLi91c2Vyc19jcmVhdGVfY29tcG9uZW50L1VzZXJTdGVwMS52dWVcIjtcbmltcG9ydCBVc2VyU3RlcDIgZnJvbSBcIi4vdXNlcnNfY3JlYXRlX2NvbXBvbmVudC9Vc2VyU3RlcDIudnVlXCI7XG5pbXBvcnQgVXNlclN0ZXBGaW5pc2ggZnJvbSBcIi4vdXNlcnNfY3JlYXRlX2NvbXBvbmVudC9Vc2VyU3RlcEZpbmlzaC52dWVcIjtcbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQsIHJlYWN0aXZlIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgdXNlVXNlcnNTdG9yZSB9IGZyb20gXCJzdG9yZXMvdXNlclwiO1xuaW1wb3J0IHsgTG9hZGluZyB9IGZyb20gXCJxdWFzYXJcIjtcblxuY29uc3QgdXNlclN0b3JlID0gdXNlVXNlcnNTdG9yZSgpO1xuY29uc3Qgc3RlcCA9IHJlZigxKTtcbmNvbnN0IGlzRGlzYWJsZWQgPSByZWYodHJ1ZSk7XG5jb25zdCBsb2FkaW5nID0gcmVmKGZhbHNlKTtcbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IHVzZXIgPSByZWFjdGl2ZSh7XG4gIGVtYWlsOiBcIlwiLFxuICBwYXNzd29yZDogXCJcIixcbiAgY29uZmlybVBhc3M6IFwiXCIsXG59KTtcblxuY29uc3QgdXNlckluZm8gPSByZWFjdGl2ZSh7XG4gIHVzZXJfZmlyc3RfbmFtZTogXCJcIixcbiAgdXNlcl9taWRkbGVfbmFtZTogXCJcIixcbiAgdXNlcl9sYXN0X25hbWU6IFwiXCIsXG4gIHVzZXJfYWRkcmVzczogXCJcIixcbiAgdXNlcl9iaXJ0aGRhdGU6IFwiXCIsXG4gIHVzZXJfc2V4OiBcIlwiLFxuICB1c2VyX3N0YXR1czogXCJcIixcbiAgdXNlcl9waG9uZV9udW1iZXI6IFwiXCIsXG4gIHVzZXJfcG9zaXRpb246IFwiXCIsXG4gIHVzZXJfYnJhbmNoX25hbWU6IFwiXCIsXG4gIHVzZXJfdGltZV9zaGlmdDogXCJcIixcbn0pO1xuXG5jb25zdCBzZXRVc2VyID0gKGRhdGEpID0+IHtcbiAgT2JqZWN0LmFzc2lnbih1c2VyLCBkYXRhKTtcbiAgaXNEaXNhYmxlZC52YWx1ZSA9ICEoXG4gICAgdXNlci5wYXNzd29yZCAmJlxuICAgIHVzZXIuY29uZmlybVBhc3MgJiZcbiAgICB1c2VyLnBhc3N3b3JkID09PSB1c2VyLmNvbmZpcm1QYXNzXG4gICk7XG59O1xuXG5jb25zdCBzZXRVc2VySW5mbyA9IChkYXRhKSA9PiB7XG4gIE9iamVjdC5hc3NpZ24odXNlckluZm8sIGRhdGEpO1xuICBpc0Rpc2FibGVkLnZhbHVlID0gIShcbiAgICB1c2VySW5mby51c2VyX2ZpcnN0X25hbWUgJiZcbiAgICB1c2VySW5mby51c2VyX2xhc3RfbmFtZSAmJlxuICAgIHVzZXJJbmZvLnVzZXJfYWRkcmVzcyAmJlxuICAgIHVzZXJJbmZvLnVzZXJfYmlydGhkYXRlICYmXG4gICAgdXNlckluZm8udXNlcl9zZXggJiZcbiAgICB1c2VySW5mby51c2VyX3N0YXR1cyAmJlxuICAgIHVzZXJJbmZvLnVzZXJfcGhvbmVfbnVtYmVyICYmXG4gICAgdXNlckluZm8udXNlcl9wb3NpdGlvbiAmJlxuICAgIHVzZXJJbmZvLnVzZXJfYnJhbmNoX25hbWUgJiZcbiAgICB1c2VySW5mby51c2VyX3RpbWVfc2hpZnRcbiAgKTtcbn07XG5cbmNvbnN0IGNvbWJpbmVkVXNlckRhdGEgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAuLi51c2VyLFxuICAuLi51c2VySW5mbyxcbn0pKTtcblxuY29uc3Qgb3BlbkRpYWxvZyA9ICgpID0+IHtcbiAgZGlhbG9nLnZhbHVlID0gdHJ1ZTtcbn07XG5cbmNvbnN0IG5leHRTdGVwID0gKCkgPT4ge1xuICBpZiAoc3RlcC52YWx1ZSA9PT0gMykge1xuICAgIHNhdmVVc2VyKCk7XG4gIH0gZWxzZSB7XG4gICAgc3RlcC52YWx1ZSsrO1xuICB9XG59O1xuXG5jb25zdCByZXNldEZvcm0gPSAoKSA9PiB7XG4gIHVzZXIuZW1haWwgPSBcIlwiO1xuICB1c2VyLnBhc3N3b3JkID0gXCJcIjtcbiAgdXNlci5jb25maXJtUGFzcyA9IFwiXCI7XG4gIHVzZXJJbmZvLnVzZXJfZmlyc3RfbmFtZSA9IFwiXCI7XG4gIHVzZXJJbmZvLnVzZXJfbWlkZGxlX25hbWUgPSBcIlwiO1xuICB1c2VySW5mby51c2VyX2xhc3RfbmFtZSA9IFwiXCI7XG4gIHVzZXJJbmZvLnVzZXJfYWRkcmVzcyA9IFwiXCI7XG4gIHVzZXJJbmZvLnVzZXJfYmlydGhkYXRlID0gXCJcIjtcbiAgdXNlckluZm8udXNlcl9zZXggPSBcIlwiO1xuICB1c2VySW5mby51c2VyX3N0YXR1cyA9IFwiXCI7XG4gIHVzZXJJbmZvLnVzZXJfcGhvbmVfbnVtYmVyID0gXCJcIjtcbiAgdXNlckluZm8udXNlcl9wb3NpdGlvbiA9IFwiXCI7XG4gIHVzZXJJbmZvLnVzZXJfYnJhbmNoX25hbWUgPSBcIlwiO1xuICB1c2VySW5mby51c2VyX3RpbWVfc2hpZnQgPSBcIlwiO1xuICBzdGVwLnZhbHVlID0gMTtcbiAgaXNEaXNhYmxlZC52YWx1ZSA9IHRydWU7XG59O1xuXG5jb25zdCBzYXZlVXNlciA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB1c2VyRGF0YSA9IHtcbiAgICAgIGVtYWlsOiBgJHt1c2VyLmVtYWlsfUBnbWFpbC5jb21gLFxuICAgICAgcGFzc3dvcmQ6IHVzZXIucGFzc3dvcmQsXG4gICAgICBuYW1lOiBgJHt1c2VySW5mby51c2VyX2ZpcnN0X25hbWV9ICR7dXNlckluZm8udXNlcl9taWRkbGVfbmFtZX0gJHt1c2VySW5mby51c2VyX2xhc3RfbmFtZX1gLFxuICAgICAgYWRkcmVzczogdXNlckluZm8udXNlcl9hZGRyZXNzLFxuICAgICAgYmlydGhkYXRlOiB1c2VySW5mby51c2VyX2JpcnRoZGF0ZSxcbiAgICAgIHNleDogdXNlckluZm8udXNlcl9zZXgsXG4gICAgICBzdGF0dXM6IHVzZXJJbmZvLnVzZXJfc3RhdHVzLFxuICAgICAgcGhvbmU6IHVzZXJJbmZvLnVzZXJfcGhvbmVfbnVtYmVyLFxuICAgICAgcm9sZTogdXNlckluZm8udXNlcl9wb3NpdGlvbixcbiAgICAgIGJyYW5jaF9pZDogdXNlckluZm8udXNlcl9icmFuY2hfbmFtZS52YWx1ZSxcbiAgICAgIHRpbWVfc2hpZnQ6IHVzZXJJbmZvLnVzZXJfdGltZV9zaGlmdCxcbiAgICB9O1xuICAgIGNvbnNvbGUubG9nKFwidXNlcmRhdGEgdG8gc2VuZDpcIiwgdXNlckRhdGEpO1xuXG4gICAgYXdhaXQgdXNlclN0b3JlLnJlZ2lzdGVyVXNlcih1c2VyRGF0YSk7XG4gICAgZGlhbG9nLnZhbHVlID0gZmFsc2U7XG4gICAgcmVzZXRGb3JtKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7fVxufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLnEtc3RlcHBlci0taG9yaXpvbnRhbCAucS1zdGVwcGVyX19zdGVwLWlubmVyIHtcbiAgLS1xLXN0ZXBwZXItc3RlcC1pbm5lci1wYWRkaW5nOiAycHg7IC8qIERlZmluZSB5b3VyIGRlc2lyZWQgcGFkZGluZyAqL1xufVxuLnByb2ZpbGUtY2FyZCB7XG4gIG1heC13aWR0aDogNDAwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuXG4ucHJvZmlsZS1mb3JtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnByb2ZpbGUtcGljdHVyZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxuLmF2YXRhci1pbWFnZSB7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgd2lkdGg6IDE1MHB4O1xuICBoZWlnaHQ6IDE1MHB4O1xufVxuXG4uZmlsZS1pbnB1dCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiA1cHg7XG4gIHJpZ2h0OiA1cHg7XG4gIG9wYWNpdHk6IDA7XG59XG5cbi5mdWxsLXdpZHRoIHtcbiAgd2lkdGg6IDEwMCU7XG59XG4ucS1zdGVwcGVyLS1ob3Jpem9udGFsIC5xLXN0ZXBwZXJfX3N0ZXAtaW5uZXIge1xuICBwYWRkaW5nOiA1cHg7XG59XG48L3N0eWxlPlxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZGFyay91c2UtZGFyay5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmV4cG9ydCBjb25zdCBza2VsZXRvblR5cGVzID0gW1xuICAndGV4dCcsICdyZWN0JywgJ2NpcmNsZScsXG4gICdRQnRuJywgJ1FCYWRnZScsICdRQ2hpcCcsICdRVG9vbGJhcicsXG4gICdRQ2hlY2tib3gnLCAnUVJhZGlvJywgJ1FUb2dnbGUnLFxuICAnUVNsaWRlcicsICdRUmFuZ2UnLCAnUUlucHV0JyxcbiAgJ1FBdmF0YXInXG5dXG5cbmV4cG9ydCBjb25zdCBza2VsZXRvbkFuaW1hdGlvbnMgPSBbXG4gICd3YXZlJywgJ3B1bHNlJywgJ3B1bHNlLXgnLCAncHVsc2UteScsICdmYWRlJywgJ2JsaW5rJywgJ25vbmUnXG5dXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU2tlbGV0b24nLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuXG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZGl2J1xuICAgIH0sXG5cbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gc2tlbGV0b25UeXBlcy5pbmNsdWRlcyh2KSxcbiAgICAgIGRlZmF1bHQ6ICdyZWN0J1xuICAgIH0sXG5cbiAgICBhbmltYXRpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBza2VsZXRvbkFuaW1hdGlvbnMuaW5jbHVkZXModiksXG4gICAgICBkZWZhdWx0OiAnd2F2ZSdcbiAgICB9LFxuICAgIGFuaW1hdGlvblNwZWVkOiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgICBkZWZhdWx0OiAxNTAwXG4gICAgfSxcblxuICAgIHNxdWFyZTogQm9vbGVhbixcbiAgICBib3JkZXJlZDogQm9vbGVhbixcblxuICAgIHNpemU6IFN0cmluZyxcbiAgICB3aWR0aDogU3RyaW5nLFxuICAgIGhlaWdodDogU3RyaW5nXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgdm0ucHJveHkuJHEpXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHNpemUgPSBwcm9wcy5zaXplICE9PSB2b2lkIDBcbiAgICAgICAgPyBbIHByb3BzLnNpemUsIHByb3BzLnNpemUgXVxuICAgICAgICA6IFsgcHJvcHMud2lkdGgsIHByb3BzLmhlaWdodCBdXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgICctLXEtc2tlbGV0b24tc3BlZWQnOiBgJHsgcHJvcHMuYW5pbWF0aW9uU3BlZWQgfW1zYCxcbiAgICAgICAgd2lkdGg6IHNpemVbIDAgXSxcbiAgICAgICAgaGVpZ2h0OiBzaXplWyAxIF1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1za2VsZXRvbiBxLXNrZWxldG9uLS0keyBpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnZGFyaycgOiAnbGlnaHQnIH0gcS1za2VsZXRvbi0tdHlwZS0keyBwcm9wcy50eXBlIH1gXG4gICAgICArIChwcm9wcy5hbmltYXRpb24gIT09ICdub25lJyA/IGAgcS1za2VsZXRvbi0tYW5pbSBxLXNrZWxldG9uLS1hbmltLSR7IHByb3BzLmFuaW1hdGlvbiB9YCA6ICcnKVxuICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLXNrZWxldG9uLS1zcXVhcmUnIDogJycpXG4gICAgICArIChwcm9wcy5ib3JkZXJlZCA9PT0gdHJ1ZSA/ICcgcS1za2VsZXRvbi0tYm9yZGVyZWQnIDogJycpXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgocHJvcHMudGFnLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZVxuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiPHRlbXBsYXRlPlxuICA8cS1wYWdlPlxuICAgIDxkaXYgY2xhc3M9XCJxLXBhLW1kIGVsZWdhbnQtY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICBjbGFzcz1cInEtcGItbGdcIlxuICAgICAgICAgIHYtbW9kZWw9XCJzZWFyY2hRdWVyeVwiXG4gICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cInNlYXJjaFwiXG4gICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgICAgICAgZGVib3VuY2U9XCIxMDAwXCJcbiAgICAgICAgICBmbGF0XG4gICAgICAgICAgZGVuc2VcbiAgICAgICAgICByb3VuZGVkXG4gICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTAwJTsgbWF4LXdpZHRoOiA2MDBweFwiXG4gICAgICAgID5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgICAgIDxxLWljb24gbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC9xLWlucHV0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgdi1pZj1cImxvYWRpbmdcIiBjbGFzcz1cInNrZWxldG9uLXdyYXBwZXIgcm93IHEtY29sLWd1dHRlci1tZFwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJjb2wteHMtMTIgY29sLXNtLTYgY29sLW1kLTQgY29sLWxnLTNcIlxuICAgICAgICAgIHYtZm9yPVwibiBpbiA4XCJcbiAgICAgICAgICA6a2V5PVwiblwiXG4gICAgICAgID5cbiAgICAgICAgICA8cS1jYXJkIGNsYXNzPVwidXNlci1jYXJkIHNrZWxldG9uLWNhcmRcIj5cbiAgICAgICAgICAgIDxxLXNrZWxldG9uIGhlaWdodD1cIjIwMHB4XCIgY2xhc3M9XCJxLW1iLW1kXCIgLz5cbiAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgIDxxLXNrZWxldG9uIHR5cGU9XCJjaXJjbGVcIiBzaXplPVwiODBweFwiIGNsYXNzPVwicS1tYi1tZFwiIC8+XG4gICAgICAgICAgICAgIDxxLXNrZWxldG9uIHR5cGU9XCJ0ZXh0XCIgd2lkdGg9XCI2MCVcIiBjbGFzcz1cInEtbXQtbGdcIiAvPlxuICAgICAgICAgICAgICA8cS1za2VsZXRvbiB0eXBlPVwidGV4dFwiIHdpZHRoPVwiNDAlXCIgY2xhc3M9XCJxLW10LXNtXCIgLz5cbiAgICAgICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgICA8cS1zZXBhcmF0b3IgLz5cbiAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtc2tlbGV0b24gdHlwZT1cInRleHRcIiB3aWR0aD1cIjgwJVwiIGNsYXNzPVwicS1tYi1zbVwiIC8+XG4gICAgICAgICAgICAgIDxxLXNrZWxldG9uIHR5cGU9XCJ0ZXh0XCIgd2lkdGg9XCI2MCVcIiBjbGFzcz1cInEtbWItc21cIiAvPlxuICAgICAgICAgICAgICA8cS1za2VsZXRvbiB0eXBlPVwidGV4dFwiIHdpZHRoPVwiNzAlXCIgY2xhc3M9XCJxLW1iLXNtXCIgLz5cbiAgICAgICAgICAgICAgPHEtc2tlbGV0b24gdHlwZT1cInRleHRcIiB3aWR0aD1cIjUwJVwiIGNsYXNzPVwicS1tYi1zbVwiIC8+XG4gICAgICAgICAgICAgIDxxLXNrZWxldG9uIHR5cGU9XCJ0ZXh0XCIgd2lkdGg9XCI5MCVcIiBjbGFzcz1cInEtbXQtbWRcIiAvPlxuICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgIDxxLXNlcGFyYXRvciAvPlxuICAgICAgICAgICAgPHEtY2FyZC1hY3Rpb25zIGNsYXNzPVwicS1wYS1tZCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICA8cS1za2VsZXRvbiB0eXBlPVwicmVjdFwiIHdpZHRoPVwiNDAlXCIgaGVpZ2h0PVwiMzZweFwiIC8+XG4gICAgICAgICAgICA8L3EtY2FyZC1hY3Rpb25zPlxuICAgICAgICAgIDwvcS1jYXJkPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiB2LWVsc2UtaWY9XCJzaG93Tm9EYXRhTWVzc2FnZVwiIGNsYXNzPVwiZGF0YS1lcnJvclwiPlxuICAgICAgICA8cS1pY29uIG5hbWU9XCJlcnJvclwiIHNpemU9XCI1MHB4XCIgY29sb3I9XCJuZWdhdGl2ZVwiIC8+XG4gICAgICAgIDxkaXY+Tm8gZGF0YSBhdmFpbGFibGU8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiB2LWVsc2UgY2xhc3M9XCJxLXBhLW1kIHJvdyBxLWNvbC1ndXR0ZXItbWRcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHYtZm9yPVwidXNlciBpbiB1c2VyUm93c1wiXG4gICAgICAgICAgOmtleT1cInVzZXIuaWRcIlxuICAgICAgICAgIGNsYXNzPVwiY29sLXhzLTEyIGNvbC1zbS02IGNvbC1tZC00IGNvbC1sZy0zXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxxLWNhcmQgY2xhc3M9XCJ1c2VyLWNhcmRcIj5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9jZG4ucXVhc2FyLmRldi9pbWcvbW91bnRhaW5zLmpwZ1wiIC8+XG4gICAgICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxxLWF2YXRhclxuICAgICAgICAgICAgICAgICAgaWNvbj1cInBlcnNvblwiXG4gICAgICAgICAgICAgICAgICBzaXplPVwiODBweFwiXG4gICAgICAgICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgdGV4dC1jb2xvcj1cIndoaXRlXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwicS1tYi1tZCBhYnNvbHV0ZVwiXG4gICAgICAgICAgICAgICAgICBzdHlsZT1cInRvcDogMDsgbGVmdDogMTJweDsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbGdcIj5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBjbGFzcz1cInRleHQtaDYgdGV4dC13ZWlnaHQtbWVkaXVtIGVsZWdhbnQtbmFtZSB0ZXh0LWNhcGl0YWxpemVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHt7IHVzZXI/Lm5hbWUgPz8gXCJOb25lXCIgfX1cbiAgICAgICAgICAgICAgICAgIDwhLS0ge3tcbiAgICAgICAgICAgICAgICAgICAgdXNlci51c2VyX21pZGRsZV9uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgPyB1c2VyLnVzZXJfbWlkZGxlX25hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBcIi5cIlxuICAgICAgICAgICAgICAgICAgICAgIDogXCJcIlxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIHt7IHVzZXI/LnVzZXJfbGFzdF9uYW1lID8/IFwiXCIgfX0gLS0+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHEtY2hpcFxuICAgICAgICAgICAgICAgICAgOmNvbG9yPVwiZ2V0QmFkZ2VQb3NpdGlvbkNvbG9yKHVzZXIucm9sZSlcIlxuICAgICAgICAgICAgICAgICAgdGV4dC1jb2xvcj1cIndoaXRlXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwicS1tdC1zbSBlbGVnYW50LWNoaXBcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHt7IHVzZXIucm9sZSB9fVxuICAgICAgICAgICAgICAgIDwvcS1jaGlwPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgICA8cS1zZXBhcmF0b3IgLz5cbiAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtbWItc20gZWxlZ2FudC1kZXRhaWxcIj5cbiAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJtYWlsXCIgY2xhc3M9XCJxLW1yLXNtXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj57eyB1c2VyLmVtYWlsIH19PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtbWItc20gZWxlZ2FudC1kZXRhaWxcIj5cbiAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJjYWxlbmRhcl90b2RheVwiIGNsYXNzPVwicS1tci1zbVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+e3sgdXNlci5iaXJ0aGRhdGVGb3JtYXR0ZWQgfX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tYi1zbSBlbGVnYW50LWRldGFpbFwiPlxuICAgICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cInNtYXJ0cGhvbmVcIiBjbGFzcz1cInEtbXItc21cIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPnt7IHVzZXIucGhvbmUgfX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tYi1zbSBlbGVnYW50LWRldGFpbCB0ZXh0LWNhcGl0YWxpemVcIj5cbiAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJsb2NhdGlvbl9vblwiIGNsYXNzPVwicS1tci1zbVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+e3sgdXNlci5hZGRyZXNzIH19PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLW10LW1kIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMSB0ZXh0LXdlaWdodC1saWdodFwiPlxuICAgICAgICAgICAgICAgICAgPHEtY2hpcCBvdXRsaW5lIHNxdWFyZSBjbGFzcz1cImVsZWdhbnQtY2hpcC1vdXRsaW5lXCI+XG4gICAgICAgICAgICAgICAgICAgIEVtcGxveW1lbnQgU3RhdHVzXG4gICAgICAgICAgICAgICAgICA8L3EtY2hpcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8cS1jaGlwXG4gICAgICAgICAgICAgICAgICBvdXRsaW5lXG4gICAgICAgICAgICAgICAgICA6Y29sb3I9XCJnZXRCYWRnZVN0YXR1c0NvbG9yKHVzZXIuc3RhdHVzKVwiXG4gICAgICAgICAgICAgICAgICB0ZXh0LWNvbG9yPVwid2hpdGVcIlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJxLW1yLXhzIGVsZWdhbnQtY2hpcFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3sgdXNlci5zdGF0dXMgfX1cbiAgICAgICAgICAgICAgICA8L3EtY2hpcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuXG4gICAgICAgICAgICA8cS1zZXBhcmF0b3IgLz5cblxuICAgICAgICAgICAgPHEtY2FyZC1hY3Rpb25zIGNsYXNzPVwicS1wYS1tZCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgICBjbGFzcz1cInRleHQtc3VidGl0bGUyIGVsZWdhbnQtYnRuXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lXG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgbGFiZWw9XCJWaWV3IFByb2ZpbGVcIlxuICAgICAgICAgICAgICAgIEBjbGljaz1cImdvVG9Vc2VyUHJvZmlsZSh1c2VyKVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPC9xLWJ0bj5cbiAgICAgICAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgICAgICAgPC9xLWNhcmQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VVc2Vyc1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvdXNlclwiO1xuaW1wb3J0IHsgY29tcHV0ZWQsIG9uTW91bnRlZCwgcmVmLCB3YXRjaCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IGRhdGUsIExvYWRpbmcgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwidnVlLXJvdXRlclwiO1xuXG5jb25zdCB1c2VyU3RvcmUgPSB1c2VVc2Vyc1N0b3JlKCk7XG5jb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbmNvbnN0IHVzZXJzID0gY29tcHV0ZWQoKCkgPT4gdXNlclN0b3JlLnVzZXJzKTtcbmNvbnN0IGZvcm1hdERhdGUgPSAoZGF0ZVN0cmluZykgPT4ge1xuICByZXR1cm4gZGF0ZS5mb3JtYXREYXRlKGRhdGVTdHJpbmcsIFwiTU1NTSBELCBZWVlZXCIpO1xufTtcbmNvbnN0IHVzZXJSb3dzID0gY29tcHV0ZWQoKCkgPT5cbiAgdXNlcnMudmFsdWUubWFwKCh1c2VyKSA9PiAoe1xuICAgIC4uLnVzZXIsXG4gICAgYmlydGhkYXRlRm9ybWF0dGVkOiBmb3JtYXREYXRlKHVzZXIuYmlydGhkYXRlKSxcbiAgfSkpXG4pO1xuXG5jb25zb2xlLmxvZyhcIlVzZXJzUGFnZVwiLCB1c2VyUm93cy52YWx1ZSk7XG5jb25zdCBsb2FkaW5nID0gcmVmKHRydWUpO1xuY29uc3Qgc2hvd05vRGF0YU1lc3NhZ2UgPSByZWYoZmFsc2UpO1xuY29uc3Qgc2VhcmNoUXVlcnkgPSByZWYoXCJcIik7XG5cbmNvbnN0IHNlYXJjaCA9IGFzeW5jICgpID0+IHtcbiAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gZmFsc2U7XG4gIGNvbnN0IGRlbGF5ID0gKG1zKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xuICB0cnkge1xuICAgIGlmIChzZWFyY2hRdWVyeS52YWx1ZS50cmltKCkgPT09IFwiXCIpIHtcbiAgICAgIGF3YWl0IHVzZVVzZXJzU3RvcmUuZmV0Y2hVc2VycygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCB1c2VVc2Vyc1N0b3JlLnNlYXJjaFVzZXIoc2VhcmNoUXVlcnkudmFsdWUpO1xuICAgIH1cbiAgICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IHVzZXJSb3dzLnZhbHVlLmxlbmd0aCA9PT0gMDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgdXNlcjpcIiwgZXJyb3IpO1xuICAgIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gdHJ1ZTtcbiAgfSBmaW5hbGx5IHtcbiAgICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIH1cbn07XG5cbndhdGNoKHNlYXJjaFF1ZXJ5LCBhc3luYyAobmV3VmFsdWUpID0+IHtcbiAgaWYgKG5ld1ZhbHVlLnRyaW0oKSA9PT0gXCJcIikge1xuICAgIGF3YWl0IHNlYXJjaCgpO1xuICB9XG59KTtcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gIGNvbnN0IGRlbGF5ID0gKG1zKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xuICB0cnkge1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHVzZXJTdG9yZS5mZXRjaFVzZXJzKCksXG4gICAgICBkZWxheSgxMDAwKSwgLy8gRW5zdXJlcyB0aGUgc2tlbGV0b24gbG9hZGVyIGlzIGRpc3BsYXllZCBmb3IgYXQgbGVhc3QgNSBzZWNvbmRzXG4gICAgXSk7XG4gICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSB1c2VyUm93cy52YWx1ZS5sZW5ndGggPT09IDA7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHVzZXJzOlwiLCBlcnJvcik7XG4gICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSB0cnVlO1xuICB9IGZpbmFsbHkge1xuICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgfVxufSk7XG5cbmNvbnN0IGdldEJhZGdlUG9zaXRpb25Db2xvciA9IChyb2xlKSA9PiB7XG4gIHN3aXRjaCAocm9sZSkge1xuICAgIGNhc2UgXCJTdXBlciBBZG1pblwiOlxuICAgICAgcmV0dXJuIFwibmVnYXRpdmVcIjtcbiAgICBjYXNlIFwiQWRtaW5cIjpcbiAgICAgIHJldHVybiBcImJsdWUtZ3JleS04XCI7XG4gICAgY2FzZSBcIlNjYWxlclwiOlxuICAgICAgcmV0dXJuIFwiaW5mb1wiO1xuICAgIGNhc2UgXCJMYW1lc2Fkb3JcIjpcbiAgICAgIHJldHVybiBcImluZGlnb1wiO1xuICAgIGNhc2UgXCJIb3JuZXJvXCI6XG4gICAgICByZXR1cm4gXCJwdXJwbGVcIjtcbiAgICBjYXNlIFwiQmFrZXJcIjpcbiAgICAgIHJldHVybiBcIndhcm5pbmdcIjtcbiAgICBjYXNlIFwiQ2FzaGllclwiOlxuICAgICAgcmV0dXJuIFwic2Vjb25kYXJ5XCI7XG4gICAgY2FzZSBcIlNhbGVzIENsZXJrXCI6XG4gICAgICByZXR1cm4gXCJkZWVwLW9yYW5nZVwiO1xuICAgIGNhc2UgXCJVdGlsaXR5XCI6XG4gICAgICByZXR1cm4gXCJkZWVwLXB1cnBsZVwiO1xuICAgIGNhc2UgXCJOb3QgWWV0IEFzc2lnbmVkXCI6XG4gICAgICByZXR1cm4gXCJncmV5XCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcImdyZXlcIjtcbiAgfVxufTtcblxuY29uc3QgZ2V0QmFkZ2VTdGF0dXNDb2xvciA9IChzdGF0dXMpID0+IHtcbiAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICBjYXNlIFwiQ3VycmVudFwiOlxuICAgICAgcmV0dXJuIFwicG9zaXRpdmVcIjtcbiAgICBjYXNlIFwiRm9ybWVyXCI6XG4gICAgICByZXR1cm4gXCJyZWQtNlwiO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gXCJncmV5XCI7XG4gIH1cbn07XG5cbmNvbnN0IGdvVG9Vc2VyUHJvZmlsZSA9IGFzeW5jICh1c2VyKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwidXNlcklkXCIsIHVzZXIuaWQpOyAvLyBDaGVjayBpZiB0aGlzIGlzIGRlZmluZWQgYW5kIHZhbGlkXG4gIExvYWRpbmcuc2hvdygpO1xuICB0cnkge1xuICAgIGF3YWl0IHJvdXRlci5wdXNoKHtcbiAgICAgIG5hbWU6IFwiVXNlcklkUGFnZVwiLFxuICAgICAgcGFyYW1zOiB7IHVzZXJfaWQ6IHVzZXIuaWQgfSxcbiAgICB9KTtcbiAgfSBmaW5hbGx5IHtcbiAgICBMb2FkaW5nLmhpZGUoKTtcbiAgfVxufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XG4uZGF0YS1lcnJvciB7XG4gIG1pbi1oZWlnaHQ6IDQwdmg7IC8qIE1pbmltdW0gaGVpZ2h0IG9mIDUwJSB2aWV3cG9ydCBoZWlnaHQgKi9cbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uZWxlZ2FudC1jb250YWluZXIge1xuICBiYWNrZ3JvdW5kOiAjZjlmOWY5O1xuICBwYWRkaW5nOiAycmVtO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGNvbG9yOiAjMzMzO1xufVxuXG4uZWxlZ2FudC1zZWFyY2gge1xuICBtYXJnaW4tYm90dG9tOiAycmVtO1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBib3JkZXItcmFkaXVzOiAyNXB4O1xuICBib3gtc2hhZG93OiAwcHggMnB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi5za2VsZXRvbi13cmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnNrZWxldG9uLXdyYXBwZXIgLmNvbC14cy0xMiB7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbi5za2VsZXRvbi1jYXJkIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZjBmMGYwLCAjZTBlMGUwKTtcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgYW5pbWF0aW9uOiBzaGltbWVyIDEuNXMgaW5maW5pdGUgbGluZWFyO1xufVxuXG5Aa2V5ZnJhbWVzIHNoaW1tZXIge1xuICAwJSB7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTEwMDBweCAwO1xuICB9XG4gIDEwMCUge1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDEwMDBweCAwO1xuICB9XG59XG5cbi51c2VyLWNhcmQge1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGNvbG9yOiAjMzMzO1xuICBib3gtc2hhZG93OiAwcHggNHB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcbn1cblxuLnVzZXItY2FyZDpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KTtcbiAgYm94LXNoYWRvdzogMHB4IDZweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG5cbi50ZXh0LWNlbnRlciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnEtbWItc20ge1xuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG59XG5cbi5lbGVnYW50LW5hbWUge1xuICBmb250LWZhbWlseTogXCJSb2JvdG9cIiwgc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgY29sb3I6ICM1NTU7XG59XG5cbi5lbGVnYW50LWNoaXAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA3YmZmO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGNvbG9yOiAjZmZmO1xufVxuXG4uZWxlZ2FudC1jaGlwLW91dGxpbmUge1xuICBib3JkZXItY29sb3I6ICMwMDdiZmY7XG4gIGNvbG9yOiAjMDA3YmZmO1xufVxuXG4uZWxlZ2FudC1kZXRhaWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjb2xvcjogIzc3Nztcbn1cblxuLmVsZWdhbnQtYnRuIHtcbiAgY29sb3I6ICMwMDdiZmY7XG4gIGJvcmRlci1jb2xvcjogIzAwN2JmZjtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiaWNvbiIsImNvbG9yIiwiZGF0ZSIsIkxvYWRpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0EsSUFBQSxhQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLFNBQVMsQ0FBRTtBQUFBLElBQ1gsTUFBTSxDQUFFO0FBQUEsSUFDUixXQUFXO0FBQUEsRUFDWjtBQUFBLEVBRUQsTUFBTyxPQUFPLEVBQUUsU0FBUztBQUN2QixVQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUksRUFBQSxJQUFLLG1CQUFvQjtBQUM5QyxVQUFNLFVBQVUsSUFBSSxJQUFJO0FBRXhCLFVBQU0sV0FBVyxTQUFTLE1BQU0sTUFBTSxRQUFRLGVBQWUsTUFBTSxLQUFLLElBQUk7QUFFNUUsVUFBTSxZQUFZLFNBQVMsTUFBTTtBQUMvQixZQUFNLE1BQU0sTUFBTSxLQUFLO0FBQ3ZCLGFBQU8sUUFBUSxRQUFRLFFBQVE7QUFBQSxJQUNyQyxDQUFLO0FBRUQsVUFBTSxVQUFVLFNBQVMsTUFBTTtBQUM3QixZQUFNLE1BQU0sTUFBTSxLQUFLO0FBQ3ZCLGFBQU8sUUFBUSxRQUFRLFFBQVE7QUFBQSxJQUNyQyxDQUFLO0FBRUQsVUFBTSxTQUFTLFNBQVMsTUFBTTtBQUM1QixZQUFNLE1BQU0sTUFBTSxLQUFLO0FBQ3ZCLGFBQU8sVUFBVSxVQUFVLFVBQVUsUUFBUSxRQUFRLFFBQVE7QUFBQSxJQUNuRSxDQUFLO0FBRUQsVUFBTSxZQUFZLFNBQVMsTUFBTTtBQUMvQixZQUNFLE1BQU0sTUFBTSxLQUFLLFdBQ2pCLE1BQU0sUUFBUSxRQUFRLFFBQVEsTUFBTSxRQUFRO0FBRTlDLGFBQU8sVUFBVSxVQUFVLFNBQ3RCLE1BQU0sUUFBUSxhQUNkO0FBQUEsSUFDWCxDQUFLO0FBRUQsVUFBTSxZQUFZLFNBQVMsTUFBTTtBQUMvQixhQUFPLE1BQU0sS0FBSyxX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
