import { _ as _export_sfc, n as ref, H as useRouter, z as onMounted, g as computed, r as resolveComponent, o as openBlock, a4 as createElementBlock, a as createVNode, w as withCtx, M as QBtn, J as createBaseVNode, a1 as QAvatar, a2 as QSeparator, O as createTextVNode, R as toDisplayString, af as withDirectives, a5 as Fragment, a6 as renderList, L as QIcon, a3 as QDialog, Q as QCard, I as QCardSection, S as pushScopeId, T as popScopeId } from "./index.c8e2405b.js";
import { b as QHeader, Q as QToolbar, a as QToolbarTitle, c as QDrawer } from "./QDrawer.cccc27f5.js";
import { Q as QItem, a as QItemSection } from "./QItem.76557ad9.js";
import { Q as QList } from "./QList.d5d13fac.js";
import { Q as QMenu } from "./QMenu.4f670399.js";
import { Q as QScrollArea } from "./QScrollArea.8dd131ca.js";
import { Q as QPage } from "./QPage.e43c6521.js";
import { Q as QLayout, a as QPageContainer } from "./QLayout.a9be2976.js";
import { Q as QSpinnerDots } from "./QSpinnerDots.c2e8b2d3.js";
import { C as ClosePopup } from "./ClosePopup.649d85d8.js";
import { _ as _imports_0 } from "./GB_LOGO.b766a815.js";
import { P as Plugin } from "./LocalStorage.12a8a966.js";
import { u as useQuasar } from "./use-quasar.84d8ad03.js";
import { api } from "./axios.aa1bce92.js";
import "./QResizeObserver.240147be.js";
import "./TouchPan.203b8c71.js";
import "./touch.9135741d.js";
import "./selection.94057980.js";
import "./QScrollObserver.21839899.js";
var SupervisorLayout_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-0e51f445"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "q-pa-md" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_0,
  style: { "width": "50px", "height": "40px" }
}, null, -1));
const _hoisted_3 = { class: "q-gutter-sm row items-center no-wrap" };
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("img", { src: "https://cdn.quasar.dev/img/avatar2.jpg" }, null, -1));
const _hoisted_5 = { class: "row no-wrap q-pa-md" };
const _hoisted_6 = { class: "column" };
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6 q-mb-md" }, "Settings", -1));
const _hoisted_8 = { class: "column items-center" };
const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("img", { src: "https://cdn.quasar.dev/img/avatar2.jpg" }, null, -1));
const _hoisted_10 = { class: "text-subtitle1 q-mt-md q-mb-xs" };
const _hoisted_11 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("span", { class: "q-ml-md" }, "Signing out", -1));
const _sfc_main = {
  __name: "SupervisorLayout",
  setup(__props) {
    const user = ref({});
    const drawer = ref(false);
    const activeMenuItem = ref("0");
    useQuasar();
    const router = useRouter();
    const loading = ref(false);
    onMounted(async () => {
      try {
        const response = await api.get("/api/profile");
        user.value = response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    });
    const formattedUserName = computed(() => {
      if (user.value && user.value.data && user.value.data.name) {
        const fullname = user.value.data.name;
        const parts = fullname.split(" ");
        const formattedparts = parts.map((part) => {
          return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        });
        if (formattedparts.length > 1) {
          const middleIndex = Math.floor(formattedparts.length / 2);
          formattedparts[middleIndex] = formattedparts[middleIndex].charAt(0).toUpperCase() + ".";
        }
        return formattedparts.join(" ");
      } else {
        return "";
      }
    });
    const signOut = () => {
      loading.value = true;
      setTimeout(() => {
        Plugin.removeItem("token");
        Plugin.removeItem("role");
        Plugin.removeItem("activeMenuItem");
        loading.value = false;
        router.push("/");
      }, 1e3);
    };
    const menuItems = [
      {
        name: "reports",
        icon: "fact_check",
        to: "/supervisor/reports",
        label: "Reports",
        separator: true
      },
      {
        name: "dtr",
        icon: "event",
        to: "/supervisor/dtr",
        label: "Daily Time Record",
        separator: true
      },
      {
        name: "employee",
        icon: "group",
        to: "/supervisor/employee",
        label: "Employee",
        separator: true
      }
    ];
    onMounted(() => {
      const storedActiveMenuItem = localStorage.getItem("activeMenuItem");
      if (storedActiveMenuItem) {
        activeMenuItem.value = storedActiveMenuItem;
      }
    });
    const setActiveMenuItem = (itemName) => {
      activeMenuItem.value = itemName;
      localStorage.setItem("activeMenuItem", itemName);
    };
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(QLayout, { view: "hHh Lpr lff" }, {
          default: withCtx(() => [
            createVNode(QHeader, {
              elevated: "",
              class: "bg-white"
            }, {
              default: withCtx(() => [
                createVNode(QToolbar, null, {
                  default: withCtx(() => [
                    createVNode(QBtn, {
                      color: "red-6",
                      flat: "",
                      onClick: _cache[0] || (_cache[0] = ($event) => drawer.value = !drawer.value),
                      round: "",
                      dense: "",
                      icon: "menu"
                    }),
                    createVNode(QToolbarTitle, { class: "py-md" }, {
                      default: withCtx(() => [
                        _hoisted_2
                      ]),
                      _: 1
                    }),
                    createBaseVNode("div", _hoisted_3, [
                      createVNode(QBtn, {
                        round: "",
                        flat: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(QAvatar, { size: "26px" }, {
                            default: withCtx(() => [
                              _hoisted_4
                            ]),
                            _: 1
                          }),
                          createVNode(QMenu, null, {
                            default: withCtx(() => [
                              createBaseVNode("div", _hoisted_5, [
                                createBaseVNode("div", _hoisted_6, [
                                  _hoisted_7,
                                  createVNode(QList, null, {
                                    default: withCtx(() => [
                                      createVNode(QSeparator),
                                      createVNode(QItem, { clickable: "" }, {
                                        default: withCtx(() => [
                                          createVNode(QItemSection, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Account")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(QSeparator),
                                      createVNode(QItem, { clickable: "" }, {
                                        default: withCtx(() => [
                                          createVNode(QItemSection, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Help & Feedback")
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
                                createVNode(QSeparator, {
                                  vertical: "",
                                  inset: "",
                                  class: "q-mx-lg"
                                }),
                                createBaseVNode("div", _hoisted_8, [
                                  createVNode(QAvatar, { size: "72px" }, {
                                    default: withCtx(() => [
                                      _hoisted_9
                                    ]),
                                    _: 1
                                  }),
                                  createBaseVNode("div", _hoisted_10, toDisplayString(formattedUserName.value), 1),
                                  withDirectives(createVNode(QBtn, {
                                    color: "primary",
                                    label: "Logout",
                                    push: "",
                                    size: "sm",
                                    onClick: signOut
                                  }, null, 512), [
                                    [ClosePopup]
                                  ])
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(QDrawer, {
              modelValue: drawer.value,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => drawer.value = $event),
              "show-if-above": "",
              behavior: "mobile",
              width: 200,
              breakpoint: 500,
              bordered: ""
            }, {
              default: withCtx(() => [
                createVNode(QScrollArea, { class: "fit" }, {
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
                })
              ]),
              _: 1
            }, 8, ["modelValue"]),
            createVNode(QPageContainer, null, {
              default: withCtx(() => [
                createVNode(QPage, null, {
                  default: withCtx(() => [
                    createVNode(_component_router_view)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(QDialog, {
              modelValue: loading.value,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => loading.value = $event)
            }, {
              default: withCtx(() => [
                createVNode(QCard, null, {
                  default: withCtx(() => [
                    createVNode(QCardSection, { class: "row items-center q-gutter-md" }, {
                      default: withCtx(() => [
                        _hoisted_11,
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
        })
      ]);
    };
  }
};
var SupervisorLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0e51f445"], ["__file", "SupervisorLayout.vue"]]);
export { SupervisorLayout as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3VwZXJ2aXNvckxheW91dC5jMDA3NzQzYS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xheW91dHMvU3VwZXJ2aXNvckxheW91dC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwicS1wYS1tZFwiPlxuICAgIDxxLWxheW91dCB2aWV3PVwiaEhoIExwciBsZmZcIj5cbiAgICAgIDxxLWhlYWRlciBlbGV2YXRlZCBjbGFzcz1cImJnLXdoaXRlXCI+XG4gICAgICAgIDxxLXRvb2xiYXI+XG4gICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICBjb2xvcj1cInJlZC02XCJcbiAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgIEBjbGljaz1cImRyYXdlciA9ICFkcmF3ZXJcIlxuICAgICAgICAgICAgcm91bmRcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBpY29uPVwibWVudVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cS10b29sYmFyLXRpdGxlIGNsYXNzPVwicHktbWRcIj5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgc3JjPVwiLi4vYXNzZXRzL0dCX0xPR08ucG5nXCJcbiAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogNTBweDsgaGVpZ2h0OiA0MHB4XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9xLXRvb2xiYXItdGl0bGU+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItc20gcm93IGl0ZW1zLWNlbnRlciBuby13cmFwXCI+XG4gICAgICAgICAgICA8IS0tIDxxLWJ0biByb3VuZCBkZW5zZSBmbGF0IGljb249XCJtZXNzYWdlXCIgdi1pZj1cIiRxLnNjcmVlbi5ndC5zbVwiPlxuICAgICAgICAgICAgICA8cS10b29sdGlwPk1lc3NhZ2VzPC9xLXRvb2x0aXA+XG4gICAgICAgICAgICA8L3EtYnRuPlxuICAgICAgICAgICAgPHEtYnRuIHJvdW5kIGRlbnNlIGZsYXQgY29sb3I9XCJncmV5LTEwXCIgaWNvbj1cIm5vdGlmaWNhdGlvbnNcIj5cbiAgICAgICAgICAgICAgPHEtYmFkZ2UgY29sb3I9XCJyZWRcIiBjbGFzcz1cInRleHQtd2hpdGVcIiBmbG9hdGluZz4gMiA8L3EtYmFkZ2U+XG4gICAgICAgICAgICAgIDxxLXRvb2x0aXA+Tm90aWZpY2F0aW9uczwvcS10b29sdGlwPlxuICAgICAgICAgICAgPC9xLWJ0bj4gLS0+XG4gICAgICAgICAgICA8cS1idG4gcm91bmQgZmxhdD5cbiAgICAgICAgICAgICAgPHEtYXZhdGFyIHNpemU9XCIyNnB4XCI+XG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCJodHRwczovL2Nkbi5xdWFzYXIuZGV2L2ltZy9hdmF0YXIyLmpwZ1wiIC8+XG4gICAgICAgICAgICAgIDwvcS1hdmF0YXI+XG4gICAgICAgICAgICAgIDxxLW1lbnU+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBuby13cmFwIHEtcGEtbWRcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDYgcS1tYi1tZFwiPlNldHRpbmdzPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxxLWxpc3Q+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtc2VwYXJhdG9yIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbSBjbGlja2FibGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+QWNjb3VudDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtc2VwYXJhdG9yIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbSBjbGlja2FibGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+SGVscCAmYW1wOyBGZWVkYmFjazwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICAgICAgICAgICAgICA8IS0tIDxxLXRvZ2dsZSB2LW1vZGVsPVwibW9iaWxlRGF0YVwiIGxhYmVsPVwiVXNlIE1vYmlsZSBEYXRhXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHEtdG9nZ2xlIHYtbW9kZWw9XCJibHVldG9vdGhcIiBsYWJlbD1cIkJsdWV0b290aFwiIC8+IC0tPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxxLXNlcGFyYXRvciB2ZXJ0aWNhbCBpbnNldCBjbGFzcz1cInEtbXgtbGdcIiAvPlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8cS1hdmF0YXIgc2l6ZT1cIjcycHhcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vY2RuLnF1YXNhci5kZXYvaW1nL2F2YXRhcjIuanBnXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9xLWF2YXRhcj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1zdWJ0aXRsZTEgcS1tdC1tZCBxLW1iLXhzXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3sgZm9ybWF0dGVkVXNlck5hbWUgfX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIkxvZ291dFwiXG4gICAgICAgICAgICAgICAgICAgICAgcHVzaFxuICAgICAgICAgICAgICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwic2lnbk91dFwiXG4gICAgICAgICAgICAgICAgICAgICAgdi1jbG9zZS1wb3B1cFxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvcS1tZW51PlxuICAgICAgICAgICAgPC9xLWJ0bj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLXRvb2xiYXI+XG4gICAgICA8L3EtaGVhZGVyPlxuXG4gICAgICA8cS1kcmF3ZXJcbiAgICAgICAgdi1tb2RlbD1cImRyYXdlclwiXG4gICAgICAgIHNob3ctaWYtYWJvdmVcbiAgICAgICAgYmVoYXZpb3I9XCJtb2JpbGVcIlxuICAgICAgICA6d2lkdGg9XCIyMDBcIlxuICAgICAgICA6YnJlYWtwb2ludD1cIjUwMFwiXG4gICAgICAgIGJvcmRlcmVkXG4gICAgICA+XG4gICAgICAgIDxxLXNjcm9sbC1hcmVhIGNsYXNzPVwiZml0XCI+XG4gICAgICAgICAgPHEtbGlzdCBib3JkZXJlZCBwYWRkaW5nPlxuICAgICAgICAgICAgPHEtaXRlbVxuICAgICAgICAgICAgICA6Y2xpY2thYmxlPVwidHJ1ZVwiXG4gICAgICAgICAgICAgIHYtZm9yPVwiKGl0ZW0sIGluZGV4KSBpbiBtZW51SXRlbXNcIlxuICAgICAgICAgICAgICA6a2V5PVwiaW5kZXhcIlxuICAgICAgICAgICAgICBAY2xpY2s9XCJzZXRBY3RpdmVNZW51SXRlbShpdGVtLm5hbWUpXCJcbiAgICAgICAgICAgICAgOnRvPVwiaXRlbS50b1wiXG4gICAgICAgICAgICAgIDphY3RpdmU9XCJhY3RpdmVNZW51SXRlbSA9PT0gaXRlbS5uYW1lXCJcbiAgICAgICAgICAgICAgYWN0aXZlLWNsYXNzPVwibXktbWVudS1saW5rXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj5cbiAgICAgICAgICAgICAgICA8cS1pY29uIDpuYW1lPVwiaXRlbS5pY29uXCIgLz5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIHt7IGl0ZW0ubGFiZWwgfX1cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICA8L3Etc2Nyb2xsLWFyZWE+XG4gICAgICA8L3EtZHJhd2VyPlxuXG4gICAgICA8cS1wYWdlLWNvbnRhaW5lcj5cbiAgICAgICAgPHEtcGFnZT5cbiAgICAgICAgICA8cm91dGVyLXZpZXcgLz5cbiAgICAgICAgPC9xLXBhZ2U+XG4gICAgICA8L3EtcGFnZS1jb250YWluZXI+XG4gICAgICA8cS1kaWFsb2cgdi1tb2RlbD1cImxvYWRpbmdcIj5cbiAgICAgICAgPHEtY2FyZD5cbiAgICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtZ3V0dGVyLW1kXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInEtbWwtbWRcIj5TaWduaW5nIG91dDwvc3Bhbj5cbiAgICAgICAgICAgIDxxLXNwaW5uZXItZG90cyBzaXplPVwiNTBweFwiIC8+XG4gICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPC9xLWNhcmQ+XG4gICAgICA8L3EtZGlhbG9nPlxuICAgIDwvcS1sYXlvdXQ+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkLCBjb21wdXRlZCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IExvY2FsU3RvcmFnZSwgdXNlUXVhc2FyIH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcInZ1ZS1yb3V0ZXJcIjtcbmltcG9ydCB7IGFwaSB9IGZyb20gXCJzcmMvYm9vdC9heGlvc1wiO1xuXG5jb25zdCB1c2VyID0gcmVmKHt9KTtcbmNvbnN0IGRyYXdlciA9IHJlZihmYWxzZSk7XG5jb25zdCBhY3RpdmVNZW51SXRlbSA9IHJlZihcIjBcIik7XG5jb25zdCBxdWFzYXIgPSB1c2VRdWFzYXIoKTtcbmNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuY29uc3QgbG9hZGluZyA9IHJlZihmYWxzZSk7XG5cbm9uTW91bnRlZChhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KFwiL2FwaS9wcm9maWxlXCIpO1xuICAgIHVzZXIudmFsdWUgPSByZXNwb25zZS5kYXRhO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyB1c2VyIGRhdGE6XCIsIGVycm9yKTtcbiAgfVxufSk7XG5cbmNvbnN0IGZvcm1hdHRlZFVzZXJOYW1lID0gY29tcHV0ZWQoKCkgPT4ge1xuICBpZiAodXNlci52YWx1ZSAmJiB1c2VyLnZhbHVlLmRhdGEgJiYgdXNlci52YWx1ZS5kYXRhLm5hbWUpIHtcbiAgICBjb25zdCBmdWxsbmFtZSA9IHVzZXIudmFsdWUuZGF0YS5uYW1lO1xuICAgIGNvbnN0IHBhcnRzID0gZnVsbG5hbWUuc3BsaXQoXCIgXCIpO1xuICAgIGNvbnN0IGZvcm1hdHRlZHBhcnRzID0gcGFydHMubWFwKChwYXJ0KSA9PiB7XG4gICAgICByZXR1cm4gcGFydC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHBhcnQuc2xpY2UoMSkudG9Mb3dlckNhc2UoKTtcbiAgICB9KTtcbiAgICBpZiAoZm9ybWF0dGVkcGFydHMubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3QgbWlkZGxlSW5kZXggPSBNYXRoLmZsb29yKGZvcm1hdHRlZHBhcnRzLmxlbmd0aCAvIDIpO1xuICAgICAgZm9ybWF0dGVkcGFydHNbbWlkZGxlSW5kZXhdID1cbiAgICAgICAgZm9ybWF0dGVkcGFydHNbbWlkZGxlSW5kZXhdLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgXCIuXCI7XG4gICAgfVxuICAgIHJldHVybiBmb3JtYXR0ZWRwYXJ0cy5qb2luKFwiIFwiKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxufSk7XG5cbmNvbnN0IHNpZ25PdXQgPSAoKSA9PiB7XG4gIGxvYWRpbmcudmFsdWUgPSB0cnVlO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBMb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInRva2VuXCIpO1xuICAgIExvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwicm9sZVwiKTtcbiAgICBMb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImFjdGl2ZU1lbnVJdGVtXCIpO1xuICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgICByb3V0ZXIucHVzaChcIi9cIik7XG4gIH0sIDEwMDApO1xufTtcblxuY29uc3QgbWVudUl0ZW1zID0gW1xuICB7XG4gICAgbmFtZTogXCJyZXBvcnRzXCIsXG4gICAgaWNvbjogXCJmYWN0X2NoZWNrXCIsXG4gICAgdG86IFwiL3N1cGVydmlzb3IvcmVwb3J0c1wiLFxuICAgIGxhYmVsOiBcIlJlcG9ydHNcIixcbiAgICBzZXBhcmF0b3I6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImR0clwiLFxuICAgIGljb246IFwiZXZlbnRcIixcbiAgICB0bzogXCIvc3VwZXJ2aXNvci9kdHJcIixcbiAgICBsYWJlbDogXCJEYWlseSBUaW1lIFJlY29yZFwiLFxuICAgIHNlcGFyYXRvcjogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZW1wbG95ZWVcIixcbiAgICBpY29uOiBcImdyb3VwXCIsXG4gICAgdG86IFwiL3N1cGVydmlzb3IvZW1wbG95ZWVcIixcbiAgICBsYWJlbDogXCJFbXBsb3llZVwiLFxuICAgIHNlcGFyYXRvcjogdHJ1ZSxcbiAgfSxcbl07XG5vbk1vdW50ZWQoKCkgPT4ge1xuICBjb25zdCBzdG9yZWRBY3RpdmVNZW51SXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYWN0aXZlTWVudUl0ZW1cIik7XG4gIGlmIChzdG9yZWRBY3RpdmVNZW51SXRlbSkge1xuICAgIGFjdGl2ZU1lbnVJdGVtLnZhbHVlID0gc3RvcmVkQWN0aXZlTWVudUl0ZW07XG4gIH1cbn0pO1xuXG4vLyBGdW5jdGlvbiB0byB1cGRhdGUgYWN0aXZlTWVudUl0ZW0gYW5kIHN0b3JlIGl0IGluIGxvY2FsU3RvcmFnZVxuY29uc3Qgc2V0QWN0aXZlTWVudUl0ZW0gPSAoaXRlbU5hbWUpID0+IHtcbiAgYWN0aXZlTWVudUl0ZW0udmFsdWUgPSBpdGVtTmFtZTtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJhY3RpdmVNZW51SXRlbVwiLCBpdGVtTmFtZSk7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4ubXktbWVudS1saW5rIHtcbiAgY29sb3I6IHdoaXRlO1xuICBiYWNrZ3JvdW5kOiAjZWY0NDQ0O1xufVxuLmFjY291bnQtY2FyZCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogOTk5OyAvKiBFbnN1cmUgdGhlIGNhcmQgaXMgYWJvdmUgb3RoZXIgZWxlbWVudHMgKi9cbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiTG9jYWxTdG9yYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtJQSxVQUFNLE9BQU8sSUFBSSxDQUFBLENBQUU7QUFDbkIsVUFBTSxTQUFTLElBQUksS0FBSztBQUN4QixVQUFNLGlCQUFpQixJQUFJLEdBQUc7QUFDZixjQUFZO0FBQzNCLFVBQU0sU0FBUyxVQUFTO0FBQ3hCLFVBQU0sVUFBVSxJQUFJLEtBQUs7QUFFekIsY0FBVSxZQUFZO0FBQ3BCLFVBQUk7QUFDRixjQUFNLFdBQVcsTUFBTSxJQUFJLElBQUksY0FBYztBQUM3QyxhQUFLLFFBQVEsU0FBUztBQUFBLE1BQ3ZCLFNBQVEsT0FBUDtBQUNBLGdCQUFRLE1BQU0sNkJBQTZCLEtBQUs7QUFBQSxNQUNqRDtBQUFBLElBQ0gsQ0FBQztBQUVELFVBQU0sb0JBQW9CLFNBQVMsTUFBTTtBQUN2QyxVQUFJLEtBQUssU0FBUyxLQUFLLE1BQU0sUUFBUSxLQUFLLE1BQU0sS0FBSyxNQUFNO0FBQ3pELGNBQU0sV0FBVyxLQUFLLE1BQU0sS0FBSztBQUNqQyxjQUFNLFFBQVEsU0FBUyxNQUFNLEdBQUc7QUFDaEMsY0FBTSxpQkFBaUIsTUFBTSxJQUFJLENBQUMsU0FBUztBQUN6QyxpQkFBTyxLQUFLLE9BQU8sQ0FBQyxFQUFFLFlBQVcsSUFBSyxLQUFLLE1BQU0sQ0FBQyxFQUFFO1FBQzFELENBQUs7QUFDRCxZQUFJLGVBQWUsU0FBUyxHQUFHO0FBQzdCLGdCQUFNLGNBQWMsS0FBSyxNQUFNLGVBQWUsU0FBUyxDQUFDO0FBQ3hELHlCQUFlLGVBQ2IsZUFBZSxhQUFhLE9BQU8sQ0FBQyxFQUFFLFlBQWEsSUFBRztBQUFBLFFBQ3pEO0FBQ0QsZUFBTyxlQUFlLEtBQUssR0FBRztBQUFBLE1BQ2xDLE9BQVM7QUFDTCxlQUFPO0FBQUEsTUFDUjtBQUFBLElBQ0gsQ0FBQztBQUVELFVBQU0sVUFBVSxNQUFNO0FBQ3BCLGNBQVEsUUFBUTtBQUNoQixpQkFBVyxNQUFNO0FBQ2ZBLGVBQWEsV0FBVyxPQUFPO0FBQy9CQSxlQUFhLFdBQVcsTUFBTTtBQUM5QkEsZUFBYSxXQUFXLGdCQUFnQjtBQUN4QyxnQkFBUSxRQUFRO0FBQ2hCLGVBQU8sS0FBSyxHQUFHO0FBQUEsTUFDaEIsR0FBRSxHQUFJO0FBQUEsSUFDVDtBQUVBLFVBQU0sWUFBWTtBQUFBLE1BQ2hCO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixJQUFJO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsTUFDWjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLElBQUk7QUFBQSxRQUNKLE9BQU87QUFBQSxRQUNQLFdBQVc7QUFBQSxNQUNaO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sSUFBSTtBQUFBLFFBQ0osT0FBTztBQUFBLFFBQ1AsV0FBVztBQUFBLE1BQ1o7QUFBQSxJQUNIO0FBQ0EsY0FBVSxNQUFNO0FBQ2QsWUFBTSx1QkFBdUIsYUFBYSxRQUFRLGdCQUFnQjtBQUNsRSxVQUFJLHNCQUFzQjtBQUN4Qix1QkFBZSxRQUFRO0FBQUEsTUFDeEI7QUFBQSxJQUNILENBQUM7QUFHRCxVQUFNLG9CQUFvQixDQUFDLGFBQWE7QUFDdEMscUJBQWUsUUFBUTtBQUN2QixtQkFBYSxRQUFRLGtCQUFrQixRQUFRO0FBQUEsSUFDakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
