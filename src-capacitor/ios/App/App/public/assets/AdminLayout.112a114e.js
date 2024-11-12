import { Q as QLayout, a as QPageContainer } from "./QLayout.a9be2976.js";
import { e as createComponent, n as ref, g as computed, z as onMounted, A as onBeforeUnmount, h, k as getCurrentInstance, _ as _export_sfc, H as useRouter, o as openBlock, c as createBlock, w as withCtx, a as createVNode, a1 as QAvatar, J as createBaseVNode, R as toDisplayString, O as createTextVNode, a2 as QSeparator, a3 as QDialog, Q as QCard, I as QCardSection, M as QBtn, a4 as createElementBlock, a5 as Fragment, a6 as renderList, L as QIcon, S as pushScopeId, T as popScopeId, r as resolveComponent } from "./index.c8e2405b.js";
import { Q as QToolbar, a as QToolbarTitle, b as QHeader, c as QDrawer } from "./QDrawer.cccc27f5.js";
import { b as between } from "./selection.94057980.js";
import { Q as QItem, a as QItemSection } from "./QItem.76557ad9.js";
import { Q as QList } from "./QList.d5d13fac.js";
import { _ as _imports_0 } from "./GB_LOGO.b766a815.js";
import { Q as QMenu } from "./QMenu.4f670399.js";
import { Q as QSpinnerDots } from "./QSpinnerDots.c2e8b2d3.js";
import { api } from "./axios.aa1bce92.js";
import "./QScrollObserver.21839899.js";
import "./QResizeObserver.240147be.js";
import "./TouchPan.203b8c71.js";
import "./touch.9135741d.js";
const xhr = XMLHttpRequest, open = xhr.prototype.open, positionValues = ["top", "right", "bottom", "left"];
let stack = [];
let highjackCount = 0;
function translate({ p, pos, active, horiz, reverse, dir }) {
  let x = 1, y = 1;
  if (horiz === true) {
    if (reverse === true) {
      x = -1;
    }
    if (pos === "bottom") {
      y = -1;
    }
    return { transform: `translate3d(${x * (p - 100)}%,${active ? 0 : y * -200}%,0)` };
  }
  if (reverse === true) {
    y = -1;
  }
  if (pos === "right") {
    x = -1;
  }
  return { transform: `translate3d(${active ? 0 : dir * x * -200}%,${y * (p - 100)}%,0)` };
}
function inc(p, amount) {
  if (typeof amount !== "number") {
    if (p < 25) {
      amount = Math.random() * 3 + 3;
    } else if (p < 65) {
      amount = Math.random() * 3;
    } else if (p < 85) {
      amount = Math.random() * 2;
    } else if (p < 99) {
      amount = 0.6;
    } else {
      amount = 0;
    }
  }
  return between(p + amount, 0, 100);
}
function highjackAjax(stackEntry) {
  highjackCount++;
  stack.push(stackEntry);
  if (highjackCount > 1)
    return;
  xhr.prototype.open = function(_, url) {
    const stopStack = [];
    const loadStart = () => {
      stack.forEach((entry) => {
        if (entry.hijackFilter.value === null || entry.hijackFilter.value(url) === true) {
          entry.start();
          stopStack.push(entry.stop);
        }
      });
    };
    const loadEnd = () => {
      stopStack.forEach((stop) => {
        stop();
      });
    };
    this.addEventListener("loadstart", loadStart, { once: true });
    this.addEventListener("loadend", loadEnd, { once: true });
    open.apply(this, arguments);
  };
}
function restoreAjax(start) {
  stack = stack.filter((entry) => entry.start !== start);
  highjackCount = Math.max(0, highjackCount - 1);
  if (highjackCount === 0) {
    xhr.prototype.open = open;
  }
}
var QAjaxBar = createComponent({
  name: "QAjaxBar",
  props: {
    position: {
      type: String,
      default: "top",
      validator: (val) => positionValues.includes(val)
    },
    size: {
      type: String,
      default: "2px"
    },
    color: String,
    skipHijack: Boolean,
    reverse: Boolean,
    hijackFilter: Function
  },
  emits: ["start", "stop"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const progress = ref(0);
    const onScreen = ref(false);
    const animate = ref(true);
    let sessions = 0, timer = null, speed;
    const classes = computed(
      () => `q-loading-bar q-loading-bar--${props.position}` + (props.color !== void 0 ? ` bg-${props.color}` : "") + (animate.value === true ? "" : " no-transition")
    );
    const horizontal = computed(() => props.position === "top" || props.position === "bottom");
    const sizeProp = computed(() => horizontal.value === true ? "height" : "width");
    const style = computed(() => {
      const active = onScreen.value;
      const obj = translate({
        p: progress.value,
        pos: props.position,
        active,
        horiz: horizontal.value,
        reverse: proxy.$q.lang.rtl === true && ["top", "bottom"].includes(props.position) ? props.reverse === false : props.reverse,
        dir: proxy.$q.lang.rtl === true ? -1 : 1
      });
      obj[sizeProp.value] = props.size;
      obj.opacity = active ? 1 : 0;
      return obj;
    });
    const attributes = computed(() => onScreen.value === true ? {
      role: "progressbar",
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": progress.value
    } : { "aria-hidden": "true" });
    function start(newSpeed = 300) {
      const oldSpeed = speed;
      speed = Math.max(0, newSpeed) || 0;
      sessions++;
      if (sessions > 1) {
        if (oldSpeed === 0 && newSpeed > 0) {
          planNextStep();
        } else if (timer !== null && oldSpeed > 0 && newSpeed <= 0) {
          clearTimeout(timer);
          timer = null;
        }
        return sessions;
      }
      timer !== null && clearTimeout(timer);
      emit("start");
      progress.value = 0;
      timer = setTimeout(() => {
        timer = null;
        animate.value = true;
        newSpeed > 0 && planNextStep();
      }, onScreen._value === true ? 500 : 1);
      if (onScreen._value !== true) {
        onScreen.value = true;
        animate.value = false;
      }
      return sessions;
    }
    function increment(amount) {
      if (sessions > 0) {
        progress.value = inc(progress.value, amount);
      }
      return sessions;
    }
    function stop() {
      sessions = Math.max(0, sessions - 1);
      if (sessions > 0) {
        return sessions;
      }
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      emit("stop");
      const end = () => {
        animate.value = true;
        progress.value = 100;
        timer = setTimeout(() => {
          timer = null;
          onScreen.value = false;
        }, 1e3);
      };
      if (progress.value === 0) {
        timer = setTimeout(end, 1);
      } else {
        end();
      }
      return sessions;
    }
    function planNextStep() {
      if (progress.value < 100) {
        timer = setTimeout(() => {
          timer = null;
          increment();
          planNextStep();
        }, speed);
      }
    }
    let hijacked;
    onMounted(() => {
      if (props.skipHijack !== true) {
        hijacked = true;
        highjackAjax({
          start,
          stop,
          hijackFilter: computed(() => props.hijackFilter || null)
        });
      }
    });
    onBeforeUnmount(() => {
      timer !== null && clearTimeout(timer);
      hijacked === true && restoreAjax(start);
    });
    Object.assign(proxy, { start, stop, increment });
    return () => h("div", {
      class: classes.value,
      style: style.value,
      ...attributes.value
    });
  }
});
const _hoisted_1$2 = /* @__PURE__ */ createBaseVNode("img", { src: "https://cdn.quasar.dev/img/boy-avatar.png" }, null, -1);
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("img", { src: "https://cdn.quasar.dev/img/boy-avatar.png" }, null, -1);
const _hoisted_3$1 = { class: "q-text-truncate text-primary" };
const _hoisted_4$1 = /* @__PURE__ */ createBaseVNode("span", { class: "q-ml-md" }, "Signing out", -1);
const _sfc_main$2 = {
  __name: "ProfileAvatarComponent",
  setup(__props) {
    const user = ref({});
    const loading = ref(false);
    const router = useRouter();
    onMounted(async () => {
      try {
        const response = await api.get("/api/profile");
        user.value = response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    });
    const signOut = () => {
      loading.value = true;
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("activeMenuItem");
        loading.value = false;
        router.push("/");
      }, 1e3);
    };
    const formattedUserName = computed(() => {
      const { firstname, middlename, lastname } = user.value.data.employee;
      const formattedFirstName = firstname.split(" ").map((name) => name.charAt(0).toUpperCase() + name.slice(1)).join(" ");
      const middleInitial = middlename ? `${middlename.charAt(0).toUpperCase()}.` : "";
      const lastInitial = lastname.charAt(0).toUpperCase();
      return `${formattedFirstName} ${middleInitial} ${lastInitial}${lastname.slice(
        1
      )}`;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QBtn, {
        round: "",
        flat: ""
      }, {
        default: withCtx(() => [
          createVNode(QAvatar, { size: "26px" }, {
            default: withCtx(() => [
              _hoisted_1$2
            ]),
            _: 1
          }),
          createVNode(QMenu, {
            "transition-show": "scale",
            "transition-hide": "scale",
            anchor: "bottom left",
            self: "top left"
          }, {
            default: withCtx(() => [
              createVNode(QList, { style: { "min-width": "100px" } }, {
                default: withCtx(() => [
                  createVNode(QItem, { clickable: "" }, {
                    default: withCtx(() => [
                      createVNode(QItemSection, { avatar: "" }, {
                        default: withCtx(() => [
                          createVNode(QAvatar, { size: "26px" }, {
                            default: withCtx(() => [
                              _hoisted_2$1
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(QItemSection, null, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_3$1, toDisplayString(formattedUserName.value), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(QItem, { clickable: "" }, {
                    default: withCtx(() => [
                      createVNode(QItemSection, { avatar: "" }, {
                        default: withCtx(() => [
                          createVNode(QAvatar, {
                            icon: "settings",
                            size: "xl"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(QItemSection, null, {
                        default: withCtx(() => [
                          createTextVNode("Settings")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(QSeparator),
                  createVNode(QItem, {
                    clickable: "",
                    onClick: signOut
                  }, {
                    default: withCtx(() => [
                      createVNode(QItemSection, { avatar: "" }, {
                        default: withCtx(() => [
                          createVNode(QAvatar, {
                            icon: "logout",
                            size: "xl"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(QItemSection, null, {
                        default: withCtx(() => [
                          createTextVNode("Sign Out")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(QDialog, {
            modelValue: loading.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => loading.value = $event)
          }, {
            default: withCtx(() => [
              createVNode(QCard, null, {
                default: withCtx(() => [
                  createVNode(QCardSection, { class: "row items-center q-gutter-md" }, {
                    default: withCtx(() => [
                      _hoisted_4$1,
                      createVNode(QSpinnerDots, { size: "50px" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _: 1
      });
    };
  }
};
var ProfileAvatarComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "ProfileAvatarComponent.vue"]]);
var HeaderComponent_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-145b54af"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { class: "col-4" };
const _hoisted_2 = { class: "row" };
const _hoisted_3 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_0,
  style: { "width": "50px", "height": "40px" }
}, null, -1));
const _hoisted_4 = {
  class: "col-4 d-flex justify-center",
  align: "center"
};
const _hoisted_5 = { class: "text-black mx-2 text-h6" };
const _hoisted_6 = {
  class: "col-4",
  align: "right"
};
const _hoisted_7 = { class: "" };
const _sfc_main$1 = {
  __name: "HeaderComponent",
  setup(__props) {
    const adminDrawer = ref(false);
    const activeMenuItem = ref("dashboard");
    const role = ref(localStorage.getItem("role"));
    const bar = ref(null);
    const menuItems = [
      {
        name: "dashboard",
        icon: "fa-solid fa-house",
        to: "/admin/dashboard",
        label: "Dashboard",
        toolbarDisplay: "\u{1F4CA} Dashboard",
        separator: true
      },
      {
        name: "raw_materials",
        icon: "fa-solid fa-layer-group",
        to: "/admin/raw_materials",
        label: "Raw Materials",
        toolbarDisplay: "\u{1F6E0}\uFE0F Raw Materials",
        separator: true
      },
      {
        name: "recipe",
        icon: "description",
        to: "/admin/recipe",
        label: "Recipe",
        toolbarDisplay: "\u{1F4DC} Recipe",
        separator: true
      },
      {
        name: "warehouse",
        icon: "factory",
        to: "/admin/warehouse",
        label: "Warehouse",
        toolbarDisplay: "\u{1F3ED} Warehouse",
        separator: true
      },
      {
        name: "branches",
        icon: "fa-solid fa-store",
        to: "/admin/branches",
        label: "Branches",
        toolbarDisplay: "\u{1F3EA} Branches",
        separator: true
      },
      {
        name: "products",
        icon: "fa-solid fa-cake-candles",
        to: "/admin/products",
        label: "Products",
        toolbarDisplay: "\u{1F956} Products",
        separator: true
      },
      ...role.value === "Super Admin" ? [
        {
          name: "users",
          icon: "fa-solid fa-users",
          to: "/admin/users",
          label: "Users",
          toolbarDisplay: "\u{1F465} Roles and Permission",
          separator: true
        },
        {
          name: "devices",
          icon: "fa-solid fa-mobile",
          to: "/admin/devices",
          label: "Devices",
          toolbarDisplay: "\u{1F4F1} Device",
          separator: true
        }
      ] : [],
      {
        name: "payroll",
        icon: "fa-solid fa-sack-dollar",
        to: "/admin/payroll",
        label: "Payroll",
        toolbarDisplay: "\u{1F4B0} Payroll Management",
        separator: true
      }
    ];
    onMounted(() => {
      const storedActiveMenuItem = localStorage.getItem("activeMenuItem");
      if (storedActiveMenuItem) {
        activeMenuItem.value = storedActiveMenuItem;
      }
    });
    const setActiveMenuItem = async (itemName) => {
      const barRef = bar.value;
      barRef.start();
      activeMenuItem.value = itemName;
      localStorage.setItem("activeMenuItem", itemName);
      barRef.stop();
    };
    const getActiveMenuItemLabel = computed(() => {
      const activeItem = menuItems.find(
        (item) => item.name === activeMenuItem.value
      );
      return activeItem ? activeItem.toolbarDisplay : "Menu";
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QHeader, {
          elevated: "",
          class: "bg-white"
        }, {
          default: withCtx(() => [
            createVNode(QToolbar, { class: "row" }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_1$1, [
                  createBaseVNode("div", _hoisted_2, [
                    createVNode(QBtn, {
                      color: "red-6",
                      flat: "",
                      onClick: _cache[0] || (_cache[0] = ($event) => adminDrawer.value = !adminDrawer.value),
                      dense: "",
                      icon: "menu"
                    }),
                    createVNode(QToolbarTitle, { class: "py-md" }, {
                      default: withCtx(() => [
                        _hoisted_3
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createBaseVNode("div", _hoisted_4, [
                  createBaseVNode("div", _hoisted_5, [
                    createBaseVNode("div", null, toDisplayString(getActiveMenuItemLabel.value), 1)
                  ])
                ]),
                createBaseVNode("div", _hoisted_6, [
                  createBaseVNode("div", _hoisted_7, [
                    createBaseVNode("div", null, [
                      createVNode(ProfileAvatarComponent)
                    ])
                  ])
                ])
              ]),
              _: 1
            }),
            createVNode(QAjaxBar, {
              ref_key: "bar",
              ref: bar,
              position: "top",
              color: "red-6",
              size: "7px",
              "skip-hijack": ""
            }, null, 512)
          ]),
          _: 1
        }),
        createVNode(QDrawer, {
          modelValue: adminDrawer.value,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => adminDrawer.value = $event),
          "show-if-above": "",
          width: 200,
          breakpoint: 500,
          bordered: ""
        }, {
          default: withCtx(() => [
            createVNode(QList, {
              bordered: "",
              padding: ""
            }, {
              default: withCtx(() => [
                (openBlock(), createElementBlock(Fragment, null, renderList(menuItems, (item, index) => {
                  return createVNode(QItem, {
                    clickable: true,
                    key: index,
                    onClick: ($event) => setActiveMenuItem(item.name),
                    to: item.to,
                    active: activeMenuItem.value === item.name,
                    "active-class": "my-menu-link"
                  }, {
                    default: withCtx(() => [
                      createVNode(QItemSection, { avatar: "" }, {
                        default: withCtx(() => [
                          createVNode(QIcon, {
                            name: item.icon
                          }, null, 8, ["name"])
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(QItemSection, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(item.label), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1032, ["onClick", "to", "active"]);
                }), 64))
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
var HeaderComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-145b54af"], ["__file", "HeaderComponent.vue"]]);
var AdminLayout_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-353b2b88"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, null, -1));
const _sfc_main = {
  __name: "AdminLayout",
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createBlock(QLayout, { view: "hHh Lpr lff" }, {
        default: withCtx(() => [
          createBaseVNode("div", null, [
            createVNode(HeaderComponent)
          ]),
          createVNode(QPageContainer, { style: { "background": "#f7f8fc" } }, {
            default: withCtx(() => [
              createVNode(_component_router_view)
            ]),
            _: 1
          }),
          _hoisted_1
        ]),
        _: 1
      });
    };
  }
};
var AdminLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-353b2b88"], ["__file", "AdminLayout.vue"]]);
export { AdminLayout as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRtaW5MYXlvdXQuMTEyYTExNGUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvYWpheC1iYXIvUUFqYXhCYXIuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Qcm9maWxlQXZhdGFyQ29tcG9uZW50LnZ1ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0hlYWRlckNvbXBvbmVudC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgb25Nb3VudGVkLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgYmV0d2VlbiB9IGZyb20gJy4uLy4uL3V0aWxzL2Zvcm1hdC9mb3JtYXQuanMnXG5cbmNvbnN0XG4gIHhociA9IF9fUVVBU0FSX1NTUl9TRVJWRVJfXyA/IG51bGwgOiBYTUxIdHRwUmVxdWVzdCxcbiAgb3BlbiA9IF9fUVVBU0FSX1NTUl9TRVJWRVJfXyA/IG51bGwgOiB4aHIucHJvdG90eXBlLm9wZW4sXG4gIHBvc2l0aW9uVmFsdWVzID0gWyAndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0JyBdXG5cbmxldCBzdGFjayA9IFtdXG5sZXQgaGlnaGphY2tDb3VudCA9IDBcblxuZnVuY3Rpb24gdHJhbnNsYXRlICh7IHAsIHBvcywgYWN0aXZlLCBob3JpeiwgcmV2ZXJzZSwgZGlyIH0pIHtcbiAgbGV0IHggPSAxLCB5ID0gMVxuXG4gIGlmIChob3JpeiA9PT0gdHJ1ZSkge1xuICAgIGlmIChyZXZlcnNlID09PSB0cnVlKSB7IHggPSAtMSB9XG4gICAgaWYgKHBvcyA9PT0gJ2JvdHRvbScpIHsgeSA9IC0xIH1cbiAgICByZXR1cm4geyB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgkeyB4ICogKHAgLSAxMDApIH0lLCR7IGFjdGl2ZSA/IDAgOiB5ICogLTIwMCB9JSwwKWAgfVxuICB9XG5cbiAgaWYgKHJldmVyc2UgPT09IHRydWUpIHsgeSA9IC0xIH1cbiAgaWYgKHBvcyA9PT0gJ3JpZ2h0JykgeyB4ID0gLTEgfVxuICByZXR1cm4geyB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgkeyBhY3RpdmUgPyAwIDogZGlyICogeCAqIC0yMDAgfSUsJHsgeSAqIChwIC0gMTAwKSB9JSwwKWAgfVxufVxuXG5mdW5jdGlvbiBpbmMgKHAsIGFtb3VudCkge1xuICBpZiAodHlwZW9mIGFtb3VudCAhPT0gJ251bWJlcicpIHtcbiAgICBpZiAocCA8IDI1KSB7XG4gICAgICBhbW91bnQgPSBNYXRoLnJhbmRvbSgpICogMyArIDNcbiAgICB9XG4gICAgZWxzZSBpZiAocCA8IDY1KSB7XG4gICAgICBhbW91bnQgPSBNYXRoLnJhbmRvbSgpICogM1xuICAgIH1cbiAgICBlbHNlIGlmIChwIDwgODUpIHtcbiAgICAgIGFtb3VudCA9IE1hdGgucmFuZG9tKCkgKiAyXG4gICAgfVxuICAgIGVsc2UgaWYgKHAgPCA5OSkge1xuICAgICAgYW1vdW50ID0gMC42XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYW1vdW50ID0gMFxuICAgIH1cbiAgfVxuICByZXR1cm4gYmV0d2VlbihwICsgYW1vdW50LCAwLCAxMDApXG59XG5cbmZ1bmN0aW9uIGhpZ2hqYWNrQWpheCAoc3RhY2tFbnRyeSkge1xuICBoaWdoamFja0NvdW50KytcblxuICBzdGFjay5wdXNoKHN0YWNrRW50cnkpXG5cbiAgaWYgKGhpZ2hqYWNrQ291bnQgPiAxKSByZXR1cm5cblxuICB4aHIucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoXywgdXJsKSB7XG4gICAgY29uc3Qgc3RvcFN0YWNrID0gW11cblxuICAgIGNvbnN0IGxvYWRTdGFydCA9ICgpID0+IHtcbiAgICAgIHN0YWNrLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZW50cnkuaGlqYWNrRmlsdGVyLnZhbHVlID09PSBudWxsXG4gICAgICAgICAgfHwgKGVudHJ5LmhpamFja0ZpbHRlci52YWx1ZSh1cmwpID09PSB0cnVlKVxuICAgICAgICApIHtcbiAgICAgICAgICBlbnRyeS5zdGFydCgpXG4gICAgICAgICAgc3RvcFN0YWNrLnB1c2goZW50cnkuc3RvcClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBsb2FkRW5kID0gKCkgPT4ge1xuICAgICAgc3RvcFN0YWNrLmZvckVhY2goc3RvcCA9PiB7IHN0b3AoKSB9KVxuICAgIH1cblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbG9hZHN0YXJ0JywgbG9hZFN0YXJ0LCB7IG9uY2U6IHRydWUgfSlcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlbmQnLCBsb2FkRW5kLCB7IG9uY2U6IHRydWUgfSlcblxuICAgIG9wZW4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlc3RvcmVBamF4IChzdGFydCkge1xuICBzdGFjayA9IHN0YWNrLmZpbHRlcihlbnRyeSA9PiBlbnRyeS5zdGFydCAhPT0gc3RhcnQpXG5cbiAgaGlnaGphY2tDb3VudCA9IE1hdGgubWF4KDAsIGhpZ2hqYWNrQ291bnQgLSAxKVxuICBpZiAoaGlnaGphY2tDb3VudCA9PT0gMCkge1xuICAgIHhoci5wcm90b3R5cGUub3BlbiA9IG9wZW5cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUFqYXhCYXInLFxuXG4gIHByb3BzOiB7XG4gICAgcG9zaXRpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICd0b3AnLFxuICAgICAgdmFsaWRhdG9yOiB2YWwgPT4gcG9zaXRpb25WYWx1ZXMuaW5jbHVkZXModmFsKVxuICAgIH0sXG5cbiAgICBzaXplOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnMnB4J1xuICAgIH0sXG5cbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHNraXBIaWphY2s6IEJvb2xlYW4sXG4gICAgcmV2ZXJzZTogQm9vbGVhbixcblxuICAgIGhpamFja0ZpbHRlcjogRnVuY3Rpb25cbiAgfSxcblxuICBlbWl0czogWyAnc3RhcnQnLCAnc3RvcCcgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IHByb2dyZXNzID0gcmVmKDApXG4gICAgY29uc3Qgb25TY3JlZW4gPSByZWYoZmFsc2UpXG4gICAgY29uc3QgYW5pbWF0ZSA9IHJlZih0cnVlKVxuXG4gICAgbGV0IHNlc3Npb25zID0gMCwgdGltZXIgPSBudWxsLCBzcGVlZFxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1sb2FkaW5nLWJhciBxLWxvYWRpbmctYmFyLS0keyBwcm9wcy5wb3NpdGlvbiB9YFxuICAgICAgKyAocHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICAgICsgKGFuaW1hdGUudmFsdWUgPT09IHRydWUgPyAnJyA6ICcgbm8tdHJhbnNpdGlvbicpXG4gICAgKVxuXG4gICAgY29uc3QgaG9yaXpvbnRhbCA9IGNvbXB1dGVkKCgpID0+IHByb3BzLnBvc2l0aW9uID09PSAndG9wJyB8fCBwcm9wcy5wb3NpdGlvbiA9PT0gJ2JvdHRvbScpXG4gICAgY29uc3Qgc2l6ZVByb3AgPSBjb21wdXRlZCgoKSA9PiAoaG9yaXpvbnRhbC52YWx1ZSA9PT0gdHJ1ZSA/ICdoZWlnaHQnIDogJ3dpZHRoJykpXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGFjdGl2ZSA9IG9uU2NyZWVuLnZhbHVlXG5cbiAgICAgIGNvbnN0IG9iaiA9IHRyYW5zbGF0ZSh7XG4gICAgICAgIHA6IHByb2dyZXNzLnZhbHVlLFxuICAgICAgICBwb3M6IHByb3BzLnBvc2l0aW9uLFxuICAgICAgICBhY3RpdmUsXG4gICAgICAgIGhvcml6OiBob3Jpem9udGFsLnZhbHVlLFxuICAgICAgICByZXZlcnNlOiBwcm94eS4kcS5sYW5nLnJ0bCA9PT0gdHJ1ZSAmJiBbICd0b3AnLCAnYm90dG9tJyBdLmluY2x1ZGVzKHByb3BzLnBvc2l0aW9uKVxuICAgICAgICAgID8gcHJvcHMucmV2ZXJzZSA9PT0gZmFsc2VcbiAgICAgICAgICA6IHByb3BzLnJldmVyc2UsXG4gICAgICAgIGRpcjogcHJveHkuJHEubGFuZy5ydGwgPT09IHRydWUgPyAtMSA6IDFcbiAgICAgIH0pXG5cbiAgICAgIG9ialsgc2l6ZVByb3AudmFsdWUgXSA9IHByb3BzLnNpemVcbiAgICAgIG9iai5vcGFjaXR5ID0gYWN0aXZlID8gMSA6IDBcblxuICAgICAgcmV0dXJuIG9ialxuICAgIH0pXG5cbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgb25TY3JlZW4udmFsdWUgPT09IHRydWVcbiAgICAgICAgPyB7XG4gICAgICAgICAgICByb2xlOiAncHJvZ3Jlc3NiYXInLFxuICAgICAgICAgICAgJ2FyaWEtdmFsdWVtaW4nOiAwLFxuICAgICAgICAgICAgJ2FyaWEtdmFsdWVtYXgnOiAxMDAsXG4gICAgICAgICAgICAnYXJpYS12YWx1ZW5vdyc6IHByb2dyZXNzLnZhbHVlXG4gICAgICAgICAgfVxuICAgICAgICA6IHsgJ2FyaWEtaGlkZGVuJzogJ3RydWUnIH1cbiAgICApKVxuXG4gICAgZnVuY3Rpb24gc3RhcnQgKG5ld1NwZWVkID0gMzAwKSB7XG4gICAgICBjb25zdCBvbGRTcGVlZCA9IHNwZWVkXG4gICAgICBzcGVlZCA9IE1hdGgubWF4KDAsIG5ld1NwZWVkKSB8fCAwXG5cbiAgICAgIHNlc3Npb25zKytcblxuICAgICAgaWYgKHNlc3Npb25zID4gMSkge1xuICAgICAgICBpZiAob2xkU3BlZWQgPT09IDAgJiYgbmV3U3BlZWQgPiAwKSB7XG4gICAgICAgICAgcGxhbk5leHRTdGVwKClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aW1lciAhPT0gbnVsbCAmJiBvbGRTcGVlZCA+IDAgJiYgbmV3U3BlZWQgPD0gMCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZXNzaW9uc1xuICAgICAgfVxuXG4gICAgICB0aW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICBlbWl0KCdzdGFydCcpXG5cbiAgICAgIHByb2dyZXNzLnZhbHVlID0gMFxuXG4gICAgICAvKipcbiAgICAgICAqIFdlJ3JlIHRyeWluZyB0byBhdm9pZCBzaWRlIGVmZmVjdHMgaWYgc3RhcnQoKSBpcyBjYWxsZWQgaW5zaWRlIGEgd2F0Y2hFZmZlY3QoKVxuICAgICAgICogc28gd2UncmUgYWNjZXNzaW5nIHRoZSBfdmFsdWUgcHJvcGVydHkgZGlyZWN0bHkgKHVuZGVyIHRoZSBjb3ZlcnMgaW1wbGVtZW50YXRpb24gZGV0YWlsIG9mIHJlZigpKVxuICAgICAgICpcbiAgICAgICAqIE90aGVyd2lzZSwgYW55IHJlZnMoKSBhY2Nlc3NlZCBoZXJlIHdvdWxkIGJlIG1hcmtlZCBhcyBkZXBzIGZvciB0aGUgd2F0Y2hFZmZlY3QoKVxuICAgICAgICogLS0gYW5kIHdlIGFyZSBjaGFuZ2luZyB0aGVtIGJlbG93LCB3aGljaCB3b3VsZCBjYXVzZSBhbiBpbmZpbml0ZSBsb29wXG4gICAgICAgKi9cblxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGltZXIgPSBudWxsXG4gICAgICAgIGFuaW1hdGUudmFsdWUgPSB0cnVlXG4gICAgICAgIG5ld1NwZWVkID4gMCAmJiBwbGFuTmV4dFN0ZXAoKVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdnVlL25vLXJlZi1hcy1vcGVyYW5kXG4gICAgICB9LCBvblNjcmVlbi5fdmFsdWUgPT09IHRydWUgPyA1MDAgOiAxKVxuXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdnVlL25vLXJlZi1hcy1vcGVyYW5kXG4gICAgICBpZiAob25TY3JlZW4uX3ZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIG9uU2NyZWVuLnZhbHVlID0gdHJ1ZVxuICAgICAgICBhbmltYXRlLnZhbHVlID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlc3Npb25zXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5jcmVtZW50IChhbW91bnQpIHtcbiAgICAgIGlmIChzZXNzaW9ucyA+IDApIHtcbiAgICAgICAgcHJvZ3Jlc3MudmFsdWUgPSBpbmMocHJvZ3Jlc3MudmFsdWUsIGFtb3VudClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlc3Npb25zXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RvcCAoKSB7XG4gICAgICBzZXNzaW9ucyA9IE1hdGgubWF4KDAsIHNlc3Npb25zIC0gMSlcbiAgICAgIGlmIChzZXNzaW9ucyA+IDApIHtcbiAgICAgICAgcmV0dXJuIHNlc3Npb25zXG4gICAgICB9XG5cbiAgICAgIGlmICh0aW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBlbWl0KCdzdG9wJylcblxuICAgICAgY29uc3QgZW5kID0gKCkgPT4ge1xuICAgICAgICBhbmltYXRlLnZhbHVlID0gdHJ1ZVxuICAgICAgICBwcm9ncmVzcy52YWx1ZSA9IDEwMFxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICAgIG9uU2NyZWVuLnZhbHVlID0gZmFsc2VcbiAgICAgICAgfSwgMTAwMClcbiAgICAgIH1cblxuICAgICAgaWYgKHByb2dyZXNzLnZhbHVlID09PSAwKSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dChlbmQsIDEpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZW5kKClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlc3Npb25zXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhbk5leHRTdGVwICgpIHtcbiAgICAgIGlmIChwcm9ncmVzcy52YWx1ZSA8IDEwMCkge1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICAgIGluY3JlbWVudCgpXG4gICAgICAgICAgcGxhbk5leHRTdGVwKClcbiAgICAgICAgfSwgc3BlZWQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGhpamFja2VkXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLnNraXBIaWphY2sgIT09IHRydWUpIHtcbiAgICAgICAgaGlqYWNrZWQgPSB0cnVlXG4gICAgICAgIGhpZ2hqYWNrQWpheCh7XG4gICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgc3RvcCxcbiAgICAgICAgICBoaWphY2tGaWx0ZXI6IGNvbXB1dGVkKCgpID0+IHByb3BzLmhpamFja0ZpbHRlciB8fCBudWxsKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgdGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgaGlqYWNrZWQgPT09IHRydWUgJiYgcmVzdG9yZUFqYXgoc3RhcnQpXG4gICAgfSlcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHsgc3RhcnQsIHN0b3AsIGluY3JlbWVudCB9KVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHtcbiAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgLi4uYXR0cmlidXRlcy52YWx1ZVxuICAgIH0pXG4gIH1cbn0pXG4iLCI8dGVtcGxhdGU+XG4gIDxxLWJ0biByb3VuZCBmbGF0PlxuICAgIDxxLWF2YXRhciBzaXplPVwiMjZweFwiPlxuICAgICAgPGltZyBzcmM9XCJodHRwczovL2Nkbi5xdWFzYXIuZGV2L2ltZy9ib3ktYXZhdGFyLnBuZ1wiIC8+XG4gICAgPC9xLWF2YXRhcj5cbiAgICA8cS1tZW51XG4gICAgICB0cmFuc2l0aW9uLXNob3c9XCJzY2FsZVwiXG4gICAgICB0cmFuc2l0aW9uLWhpZGU9XCJzY2FsZVwiXG4gICAgICBhbmNob3I9XCJib3R0b20gbGVmdFwiXG4gICAgICBzZWxmPVwidG9wIGxlZnRcIlxuICAgID5cbiAgICAgIDxxLWxpc3Qgc3R5bGU9XCJtaW4td2lkdGg6IDEwMHB4XCI+XG4gICAgICAgIDxxLWl0ZW0gY2xpY2thYmxlPlxuICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXI+XG4gICAgICAgICAgICA8cS1hdmF0YXIgc2l6ZT1cIjI2cHhcIj5cbiAgICAgICAgICAgICAgPGltZyBzcmM9XCJodHRwczovL2Nkbi5xdWFzYXIuZGV2L2ltZy9ib3ktYXZhdGFyLnBuZ1wiIC8+XG4gICAgICAgICAgICA8L3EtYXZhdGFyPlxuICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtdGV4dC10cnVuY2F0ZSB0ZXh0LXByaW1hcnlcIj5cbiAgICAgICAgICAgICAge3sgZm9ybWF0dGVkVXNlck5hbWUgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgIDwvcS1pdGVtPlxuICAgICAgICA8cS1pdGVtIGNsaWNrYWJsZT5cbiAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyPlxuICAgICAgICAgICAgPHEtYXZhdGFyIGljb249XCJzZXR0aW5nc1wiIHNpemU9XCJ4bFwiIC8+XG4gICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+U2V0dGluZ3M8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgPHEtc2VwYXJhdG9yIC8+XG4gICAgICAgIDxxLWl0ZW0gY2xpY2thYmxlIEBjbGljaz1cInNpZ25PdXRcIj5cbiAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyPlxuICAgICAgICAgICAgPHEtYXZhdGFyIGljb249XCJsb2dvdXRcIiBzaXplPVwieGxcIiAvPlxuICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlNpZ24gT3V0PC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgPC9xLWl0ZW0+XG4gICAgICA8L3EtbGlzdD5cbiAgICA8L3EtbWVudT5cbiAgICA8cS1kaWFsb2cgdi1tb2RlbD1cImxvYWRpbmdcIj5cbiAgICAgIDxxLWNhcmQ+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1ndXR0ZXItbWRcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInEtbWwtbWRcIj5TaWduaW5nIG91dDwvc3Bhbj5cbiAgICAgICAgICA8cS1zcGlubmVyLWRvdHMgc2l6ZT1cIjUwcHhcIiAvPlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPC9xLWNhcmQ+XG4gICAgPC9xLWRpYWxvZz5cbiAgPC9xLWJ0bj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwic3JjL2Jvb3QvYXhpb3NcIjtcbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkLCBjb21wdXRlZCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJ2dWUtcm91dGVyXCI7XG5cbmNvbnN0IHVzZXIgPSByZWYoe30pO1xuY29uc3QgbG9hZGluZyA9IHJlZihmYWxzZSk7XG5jb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbm9uTW91bnRlZChhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KFwiL2FwaS9wcm9maWxlXCIpO1xuICAgIHVzZXIudmFsdWUgPSByZXNwb25zZS5kYXRhO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyB1c2VyIGRhdGE6XCIsIGVycm9yKTtcbiAgfVxufSk7XG5cbmNvbnN0IHNpZ25PdXQgPSAoKSA9PiB7XG4gIGxvYWRpbmcudmFsdWUgPSB0cnVlO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInRva2VuXCIpO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwicm9sZVwiKTtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImFjdGl2ZU1lbnVJdGVtXCIpO1xuICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgICByb3V0ZXIucHVzaChcIi9cIik7XG4gIH0sIDEwMDApO1xufTtcblxuY29uc3QgZm9ybWF0dGVkVXNlck5hbWUgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHsgZmlyc3RuYW1lLCBtaWRkbGVuYW1lLCBsYXN0bmFtZSB9ID0gdXNlci52YWx1ZS5kYXRhLmVtcGxveWVlO1xuXG4gIC8vIFNwbGl0IGZpcnN0IG5hbWUgaWYgaXQgaGFzIG11bHRpcGxlIHdvcmRzXG4gIGNvbnN0IGZvcm1hdHRlZEZpcnN0TmFtZSA9IGZpcnN0bmFtZVxuICAgIC5zcGxpdChcIiBcIilcbiAgICAubWFwKChuYW1lKSA9PiBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKSlcbiAgICAuam9pbihcIiBcIik7XG5cbiAgY29uc3QgbWlkZGxlSW5pdGlhbCA9IG1pZGRsZW5hbWVcbiAgICA/IGAke21pZGRsZW5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCl9LmBcbiAgICA6IFwiXCI7XG4gIGNvbnN0IGxhc3RJbml0aWFsID0gbGFzdG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCk7XG5cbiAgcmV0dXJuIGAke2Zvcm1hdHRlZEZpcnN0TmFtZX0gJHttaWRkbGVJbml0aWFsfSAke2xhc3RJbml0aWFsfSR7bGFzdG5hbWUuc2xpY2UoXG4gICAgMVxuICApfWA7XG59KTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+PC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtaGVhZGVyIGVsZXZhdGVkIGNsYXNzPVwiYmctd2hpdGVcIj5cbiAgICA8cS10b29sYmFyIGNsYXNzPVwicm93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLTRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgY29sb3I9XCJyZWQtNlwiXG4gICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICBAY2xpY2s9XCJhZG1pbkRyYXdlciA9ICFhZG1pbkRyYXdlclwiXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgaWNvbj1cIm1lbnVcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHEtdG9vbGJhci10aXRsZSBjbGFzcz1cInB5LW1kXCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cIi4uL2Fzc2V0cy9HQl9MT0dPLnBuZ1wiXG4gICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDUwcHg7IGhlaWdodDogNDBweFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvcS10b29sYmFyLXRpdGxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC00IGQtZmxleCBqdXN0aWZ5LWNlbnRlclwiIGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWJsYWNrIG14LTIgdGV4dC1oNlwiPlxuICAgICAgICAgIDxkaXY+e3sgZ2V0QWN0aXZlTWVudUl0ZW1MYWJlbCB9fTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8IS0tIDxxLWJ0biByb3VuZCBkZW5zZSBmbGF0IGljb249XCJtZXNzYWdlXCI+XG4gICAgICAgIDxxLXRvb2x0aXA+TWVzc2FnZXM8L3EtdG9vbHRpcD5cbiAgICAgIDwvcS1idG4+XG4gICAgICA8cS1idG4gcm91bmQgZGVuc2UgZmxhdCBjb2xvcj1cImdyZXktMTBcIiBpY29uPVwibm90aWZpY2F0aW9uc1wiPlxuICAgICAgICA8cS1iYWRnZSBjb2xvcj1cInJlZFwiIGNsYXNzPVwidGV4dC13aGl0ZVwiIGZsb2F0aW5nPiAyIDwvcS1iYWRnZT5cbiAgICAgICAgPHEtdG9vbHRpcD5Ob3RpZmljYXRpb25zPC9xLXRvb2x0aXA+XG4gICAgICA8L3EtYnRuPiAtLT5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNFwiIGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIlwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8UHJvZmlsZUF2YXRhckNvbXBvbmVudCAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvcS10b29sYmFyPlxuICAgIDxxLWFqYXgtYmFyIHJlZj1cImJhclwiIHBvc2l0aW9uPVwidG9wXCIgY29sb3I9XCJyZWQtNlwiIHNpemU9XCI3cHhcIiBza2lwLWhpamFjayAvPlxuICA8L3EtaGVhZGVyPlxuICA8cS1kcmF3ZXJcbiAgICB2LW1vZGVsPVwiYWRtaW5EcmF3ZXJcIlxuICAgIHNob3ctaWYtYWJvdmVcbiAgICA6d2lkdGg9XCIyMDBcIlxuICAgIDpicmVha3BvaW50PVwiNTAwXCJcbiAgICBib3JkZXJlZFxuICA+XG4gICAgPHEtbGlzdCBib3JkZXJlZCBwYWRkaW5nPlxuICAgICAgPHEtaXRlbVxuICAgICAgICA6Y2xpY2thYmxlPVwidHJ1ZVwiXG4gICAgICAgIHYtZm9yPVwiKGl0ZW0sIGluZGV4KSBpbiBtZW51SXRlbXNcIlxuICAgICAgICA6a2V5PVwiaW5kZXhcIlxuICAgICAgICBAY2xpY2s9XCJzZXRBY3RpdmVNZW51SXRlbShpdGVtLm5hbWUpXCJcbiAgICAgICAgOnRvPVwiaXRlbS50b1wiXG4gICAgICAgIDphY3RpdmU9XCJhY3RpdmVNZW51SXRlbSA9PT0gaXRlbS5uYW1lXCJcbiAgICAgICAgYWN0aXZlLWNsYXNzPVwibXktbWVudS1saW5rXCJcbiAgICAgID5cbiAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj5cbiAgICAgICAgICA8cS1pY29uIDpuYW1lPVwiaXRlbS5pY29uXCIgLz5cbiAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgIHt7IGl0ZW0ubGFiZWwgfX1cbiAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgIDwvcS1pdGVtPlxuICAgIDwvcS1saXN0PlxuICA8L3EtZHJhd2VyPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBQcm9maWxlQXZhdGFyQ29tcG9uZW50IGZyb20gXCIuL1Byb2ZpbGVBdmF0YXJDb21wb25lbnQudnVlXCI7XG5pbXBvcnQgeyByZWYsIG9uTW91bnRlZCwgY29tcHV0ZWQgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IGFkbWluRHJhd2VyID0gcmVmKGZhbHNlKTtcbmNvbnN0IGFjdGl2ZU1lbnVJdGVtID0gcmVmKFwiZGFzaGJvYXJkXCIpO1xuY29uc3Qgcm9sZSA9IHJlZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInJvbGVcIikpO1xuY29uc3QgYmFyID0gcmVmKG51bGwpO1xuXG5jb25zdCBtZW51SXRlbXMgPSBbXG4gIHtcbiAgICBuYW1lOiBcImRhc2hib2FyZFwiLFxuICAgIGljb246IFwiZmEtc29saWQgZmEtaG91c2VcIixcbiAgICB0bzogXCIvYWRtaW4vZGFzaGJvYXJkXCIsXG4gICAgbGFiZWw6IFwiRGFzaGJvYXJkXCIsXG4gICAgdG9vbGJhckRpc3BsYXk6IFwi8J+TiiBEYXNoYm9hcmRcIixcbiAgICBzZXBhcmF0b3I6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInJhd19tYXRlcmlhbHNcIixcbiAgICBpY29uOiBcImZhLXNvbGlkIGZhLWxheWVyLWdyb3VwXCIsXG4gICAgdG86IFwiL2FkbWluL3Jhd19tYXRlcmlhbHNcIixcbiAgICBsYWJlbDogXCJSYXcgTWF0ZXJpYWxzXCIsXG4gICAgdG9vbGJhckRpc3BsYXk6IFwi8J+boO+4jyBSYXcgTWF0ZXJpYWxzXCIsXG4gICAgc2VwYXJhdG9yOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJyZWNpcGVcIixcbiAgICBpY29uOiBcImRlc2NyaXB0aW9uXCIsXG4gICAgdG86IFwiL2FkbWluL3JlY2lwZVwiLFxuICAgIGxhYmVsOiBcIlJlY2lwZVwiLFxuICAgIHRvb2xiYXJEaXNwbGF5OiBcIvCfk5wgUmVjaXBlXCIsXG4gICAgc2VwYXJhdG9yOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJ3YXJlaG91c2VcIixcbiAgICBpY29uOiBcImZhY3RvcnlcIixcbiAgICB0bzogXCIvYWRtaW4vd2FyZWhvdXNlXCIsXG4gICAgbGFiZWw6IFwiV2FyZWhvdXNlXCIsXG4gICAgdG9vbGJhckRpc3BsYXk6IFwi8J+PrSBXYXJlaG91c2VcIixcbiAgICBzZXBhcmF0b3I6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImJyYW5jaGVzXCIsXG4gICAgaWNvbjogXCJmYS1zb2xpZCBmYS1zdG9yZVwiLFxuICAgIHRvOiBcIi9hZG1pbi9icmFuY2hlc1wiLFxuICAgIGxhYmVsOiBcIkJyYW5jaGVzXCIsXG4gICAgdG9vbGJhckRpc3BsYXk6IFwi8J+PqiBCcmFuY2hlc1wiLFxuICAgIHNlcGFyYXRvcjogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwicHJvZHVjdHNcIixcbiAgICBpY29uOiBcImZhLXNvbGlkIGZhLWNha2UtY2FuZGxlc1wiLFxuICAgIHRvOiBcIi9hZG1pbi9wcm9kdWN0c1wiLFxuICAgIGxhYmVsOiBcIlByb2R1Y3RzXCIsXG4gICAgdG9vbGJhckRpc3BsYXk6IFwi8J+lliBQcm9kdWN0c1wiLFxuICAgIHNlcGFyYXRvcjogdHJ1ZSxcbiAgfSxcbiAgLi4uKHJvbGUudmFsdWUgPT09IFwiU3VwZXIgQWRtaW5cIlxuICAgID8gW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJ1c2Vyc1wiLFxuICAgICAgICAgIGljb246IFwiZmEtc29saWQgZmEtdXNlcnNcIixcbiAgICAgICAgICB0bzogXCIvYWRtaW4vdXNlcnNcIixcbiAgICAgICAgICBsYWJlbDogXCJVc2Vyc1wiLFxuICAgICAgICAgIHRvb2xiYXJEaXNwbGF5OiBcIvCfkaUgUm9sZXMgYW5kIFBlcm1pc3Npb25cIixcbiAgICAgICAgICBzZXBhcmF0b3I6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcImRldmljZXNcIixcbiAgICAgICAgICBpY29uOiBcImZhLXNvbGlkIGZhLW1vYmlsZVwiLFxuICAgICAgICAgIHRvOiBcIi9hZG1pbi9kZXZpY2VzXCIsXG4gICAgICAgICAgbGFiZWw6IFwiRGV2aWNlc1wiLFxuICAgICAgICAgIHRvb2xiYXJEaXNwbGF5OiBcIvCfk7EgRGV2aWNlXCIsXG4gICAgICAgICAgc2VwYXJhdG9yOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgXVxuICAgIDogW10pLFxuICB7XG4gICAgbmFtZTogXCJwYXlyb2xsXCIsXG4gICAgaWNvbjogXCJmYS1zb2xpZCBmYS1zYWNrLWRvbGxhclwiLFxuICAgIHRvOiBcIi9hZG1pbi9wYXlyb2xsXCIsXG4gICAgbGFiZWw6IFwiUGF5cm9sbFwiLFxuICAgIHRvb2xiYXJEaXNwbGF5OiBcIvCfkrAgUGF5cm9sbCBNYW5hZ2VtZW50XCIsXG4gICAgc2VwYXJhdG9yOiB0cnVlLFxuICB9LFxuXTtcblxub25Nb3VudGVkKCgpID0+IHtcbiAgY29uc3Qgc3RvcmVkQWN0aXZlTWVudUl0ZW0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImFjdGl2ZU1lbnVJdGVtXCIpO1xuICBpZiAoc3RvcmVkQWN0aXZlTWVudUl0ZW0pIHtcbiAgICBhY3RpdmVNZW51SXRlbS52YWx1ZSA9IHN0b3JlZEFjdGl2ZU1lbnVJdGVtO1xuICB9XG59KTtcblxuY29uc3Qgc2V0QWN0aXZlTWVudUl0ZW0gPSBhc3luYyAoaXRlbU5hbWUpID0+IHtcbiAgY29uc3QgYmFyUmVmID0gYmFyLnZhbHVlOyAvLyBTdGFydCB0aGUgbG9hZGluZyBiYXIgd2hlbiBhIG1lbnUgaXRlbSBpcyBjbGlja2VkXG4gIGJhclJlZi5zdGFydCgpO1xuICBhY3RpdmVNZW51SXRlbS52YWx1ZSA9IGl0ZW1OYW1lO1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImFjdGl2ZU1lbnVJdGVtXCIsIGl0ZW1OYW1lKTtcblxuICAvLyBXYWl0IGZvciB0aGUgcm91dGUgbmF2aWdhdGlvbiB0byBjb21wbGV0ZSwgdGhlbiBzdG9wIHRoZSBsb2FkaW5nIGJhclxuICAvLyBXYWl0IGZvciB0aGUgRE9NIHVwZGF0ZVxuICBiYXJSZWYuc3RvcCgpO1xufTtcblxuY29uc3QgZ2V0QWN0aXZlTWVudUl0ZW1MYWJlbCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgYWN0aXZlSXRlbSA9IG1lbnVJdGVtcy5maW5kKFxuICAgIChpdGVtKSA9PiBpdGVtLm5hbWUgPT09IGFjdGl2ZU1lbnVJdGVtLnZhbHVlXG4gICk7XG4gIHJldHVybiBhY3RpdmVJdGVtID8gYWN0aXZlSXRlbS50b29sYmFyRGlzcGxheSA6IFwiTWVudVwiO1xufSk7XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuLm15LW1lbnUtbGluayB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZDogI2VmNDQ0NDtcbn1cbi5hY2NvdW50LWNhcmQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDk5OTsgLyogRW5zdXJlIHRoZSBjYXJkIGlzIGFib3ZlIG90aGVyIGVsZW1lbnRzICovXG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBS0EsTUFDRSxNQUFxQyxnQkFDckMsT0FBc0MsSUFBSSxVQUFVLE1BQ3BELGlCQUFpQixDQUFFLE9BQU8sU0FBUyxVQUFVLE1BQVE7QUFFdkQsSUFBSSxRQUFRLENBQUU7QUFDZCxJQUFJLGdCQUFnQjtBQUVwQixTQUFTLFVBQVcsRUFBRSxHQUFHLEtBQUssUUFBUSxPQUFPLFNBQVMsT0FBTztBQUMzRCxNQUFJLElBQUksR0FBRyxJQUFJO0FBRWYsTUFBSSxVQUFVLE1BQU07QUFDbEIsUUFBSSxZQUFZLE1BQU07QUFBRSxVQUFJO0FBQUEsSUFBSTtBQUNoQyxRQUFJLFFBQVEsVUFBVTtBQUFFLFVBQUk7QUFBQSxJQUFJO0FBQ2hDLFdBQU8sRUFBRSxXQUFXLGVBQWdCLEtBQUssSUFBSSxTQUFXLFNBQVMsSUFBSSxJQUFJLFdBQWE7QUFBQSxFQUN2RjtBQUVELE1BQUksWUFBWSxNQUFNO0FBQUUsUUFBSTtBQUFBLEVBQUk7QUFDaEMsTUFBSSxRQUFRLFNBQVM7QUFBRSxRQUFJO0FBQUEsRUFBSTtBQUMvQixTQUFPLEVBQUUsV0FBVyxlQUFnQixTQUFTLElBQUksTUFBTSxJQUFJLFNBQVcsS0FBSyxJQUFJLFdBQWE7QUFDOUY7QUFFQSxTQUFTLElBQUssR0FBRyxRQUFRO0FBQ3ZCLE1BQUksT0FBTyxXQUFXLFVBQVU7QUFDOUIsUUFBSSxJQUFJLElBQUk7QUFDVixlQUFTLEtBQUssT0FBUSxJQUFHLElBQUk7QUFBQSxJQUM5QixXQUNRLElBQUksSUFBSTtBQUNmLGVBQVMsS0FBSyxPQUFNLElBQUs7QUFBQSxJQUMxQixXQUNRLElBQUks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
