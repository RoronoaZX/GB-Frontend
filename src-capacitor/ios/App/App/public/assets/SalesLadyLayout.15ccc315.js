import { _ as _export_sfc, n as ref, H as useRouter, z as onMounted, g as computed, r as resolveComponent, o as openBlock, a4 as createElementBlock, a as createVNode, w as withCtx, M as QBtn, J as createBaseVNode, c as createBlock, O as createTextVNode, be as createCommentVNode, a1 as QAvatar, a2 as QSeparator, R as toDisplayString, af as withDirectives, a5 as Fragment, a6 as renderList, L as QIcon, a3 as QDialog, Q as QCard, I as QCardSection, S as pushScopeId, T as popScopeId } from "./index.c8e2405b.js";
import { b as QHeader, Q as QToolbar, a as QToolbarTitle, c as QDrawer } from "./QDrawer.cccc27f5.js";
import { Q as QTooltip } from "./QTooltip.4a3eef22.js";
import { Q as QBadge } from "./QBadge.49245359.js";
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
var SalesLadyLayout_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-62a13fb4"), n = n(), popScopeId(), n);
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
  __name: "SalesLadyLayout",
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
        name: "analytics",
        icon: "query_stats",
        to: "/branch/sales_lady",
        label: "Analytics",
        separator: true
      },
      {
        name: "bread",
        icon: "fa-solid fa-cake-candles",
        to: "/branch/sales_lady/products",
        label: "Products",
        separator: true
      },
      {
        name: "bakersReport",
        icon: "fact_check",
        to: "/branch/sales_lady/bakers_report",
        label: "Bakers Report",
        separator: true
      },
      {
        name: "rawMaterials",
        icon: "fact_check",
        to: "/branch/sales_lady/report",
        label: "Report",
        separator: true
      },
      {
        name: "accounts",
        icon: "person",
        to: "/branch/sales_lady/account",
        label: "Accounts",
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
                      _ctx.$q.screen.gt.sm ? (openBlock(), createBlock(QBtn, {
                        key: 0,
                        round: "",
                        dense: "",
                        flat: "",
                        icon: "message"
                      }, {
                        default: withCtx(() => [
                          createVNode(QTooltip, null, {
                            default: withCtx(() => [
                              createTextVNode("Messages")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(QBtn, {
                        round: "",
                        dense: "",
                        flat: "",
                        color: "grey-10",
                        icon: "notifications"
                      }, {
                        default: withCtx(() => [
                          createVNode(QBadge, {
                            color: "red",
                            class: "text-white",
                            floating: ""
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 2 ")
                            ]),
                            _: 1
                          }),
                          createVNode(QTooltip, null, {
                            default: withCtx(() => [
                              createTextVNode("Notifications")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
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
var SalesLadyLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-62a13fb4"], ["__file", "SalesLadyLayout.vue"]]);
export { SalesLadyLayout as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FsZXNMYWR5TGF5b3V0LjE1Y2NjMzE1LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGF5b3V0cy9TYWxlc0xhZHlMYXlvdXQudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInEtcGEtbWRcIj5cbiAgICA8cS1sYXlvdXQgdmlldz1cImhIaCBMcHIgbGZmXCI+XG4gICAgICA8cS1oZWFkZXIgZWxldmF0ZWQgY2xhc3M9XCJiZy13aGl0ZVwiPlxuICAgICAgICA8cS10b29sYmFyPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgY29sb3I9XCJyZWQtNlwiXG4gICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICBAY2xpY2s9XCJkcmF3ZXIgPSAhZHJhd2VyXCJcbiAgICAgICAgICAgIHJvdW5kXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgaWNvbj1cIm1lbnVcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHEtdG9vbGJhci10aXRsZSBjbGFzcz1cInB5LW1kXCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cIi4uL2Fzc2V0cy9HQl9MT0dPLnBuZ1wiXG4gICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDUwcHg7IGhlaWdodDogNDBweFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvcS10b29sYmFyLXRpdGxlPlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXNtIHJvdyBpdGVtcy1jZW50ZXIgbm8td3JhcFwiPlxuICAgICAgICAgICAgPHEtYnRuIHJvdW5kIGRlbnNlIGZsYXQgaWNvbj1cIm1lc3NhZ2VcIiB2LWlmPVwiJHEuc2NyZWVuLmd0LnNtXCI+XG4gICAgICAgICAgICAgIDxxLXRvb2x0aXA+TWVzc2FnZXM8L3EtdG9vbHRpcD5cbiAgICAgICAgICAgIDwvcS1idG4+XG4gICAgICAgICAgICA8cS1idG4gcm91bmQgZGVuc2UgZmxhdCBjb2xvcj1cImdyZXktMTBcIiBpY29uPVwibm90aWZpY2F0aW9uc1wiPlxuICAgICAgICAgICAgICA8cS1iYWRnZSBjb2xvcj1cInJlZFwiIGNsYXNzPVwidGV4dC13aGl0ZVwiIGZsb2F0aW5nPiAyIDwvcS1iYWRnZT5cbiAgICAgICAgICAgICAgPHEtdG9vbHRpcD5Ob3RpZmljYXRpb25zPC9xLXRvb2x0aXA+XG4gICAgICAgICAgICA8L3EtYnRuPlxuICAgICAgICAgICAgPHEtYnRuIHJvdW5kIGZsYXQ+XG4gICAgICAgICAgICAgIDxxLWF2YXRhciBzaXplPVwiMjZweFwiPlxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9jZG4ucXVhc2FyLmRldi9pbWcvYXZhdGFyMi5qcGdcIiAvPlxuICAgICAgICAgICAgICA8L3EtYXZhdGFyPlxuICAgICAgICAgICAgICA8cS1tZW51PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbm8td3JhcCBxLXBhLW1kXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2IHEtbWItbWRcIj5TZXR0aW5nczwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8cS1saXN0PlxuICAgICAgICAgICAgICAgICAgICAgIDxxLXNlcGFyYXRvciAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0gY2xpY2thYmxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPkFjY291bnQ8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLXNlcGFyYXRvciAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0gY2xpY2thYmxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPkhlbHAgJmFtcDsgRmVlZGJhY2s8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgICAgICA8L3EtbGlzdD5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSA8cS10b2dnbGUgdi1tb2RlbD1cIm1vYmlsZURhdGFcIiBsYWJlbD1cIlVzZSBNb2JpbGUgRGF0YVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxxLXRvZ2dsZSB2LW1vZGVsPVwiYmx1ZXRvb3RoXCIgbGFiZWw9XCJCbHVldG9vdGhcIiAvPiAtLT5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8cS1zZXBhcmF0b3IgdmVydGljYWwgaW5zZXQgY2xhc3M9XCJxLW14LWxnXCIgLz5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbiBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHEtYXZhdGFyIHNpemU9XCI3MnB4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJodHRwczovL2Nkbi5xdWFzYXIuZGV2L2ltZy9hdmF0YXIyLmpwZ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1hdmF0YXI+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUxIHEtbXQtbWQgcS1tYi14c1wiPlxuICAgICAgICAgICAgICAgICAgICAgIHt7IGZvcm1hdHRlZFVzZXJOYW1lIH19XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJMb2dvdXRcIlxuICAgICAgICAgICAgICAgICAgICAgIHB1c2hcbiAgICAgICAgICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cInNpZ25PdXRcIlxuICAgICAgICAgICAgICAgICAgICAgIHYtY2xvc2UtcG9wdXBcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3EtbWVudT5cbiAgICAgICAgICAgIDwvcS1idG4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS10b29sYmFyPlxuICAgICAgPC9xLWhlYWRlcj5cblxuICAgICAgPHEtZHJhd2VyXG4gICAgICAgIHYtbW9kZWw9XCJkcmF3ZXJcIlxuICAgICAgICBzaG93LWlmLWFib3ZlXG4gICAgICAgIGJlaGF2aW9yPVwibW9iaWxlXCJcbiAgICAgICAgOndpZHRoPVwiMjAwXCJcbiAgICAgICAgOmJyZWFrcG9pbnQ9XCI1MDBcIlxuICAgICAgICBib3JkZXJlZFxuICAgICAgPlxuICAgICAgICA8cS1zY3JvbGwtYXJlYSBjbGFzcz1cImZpdFwiPlxuICAgICAgICAgIDxxLWxpc3QgYm9yZGVyZWQgcGFkZGluZz5cbiAgICAgICAgICAgIDxxLWl0ZW1cbiAgICAgICAgICAgICAgOmNsaWNrYWJsZT1cInRydWVcIlxuICAgICAgICAgICAgICB2LWZvcj1cIihpdGVtLCBpbmRleCkgaW4gbWVudUl0ZW1zXCJcbiAgICAgICAgICAgICAgOmtleT1cImluZGV4XCJcbiAgICAgICAgICAgICAgQGNsaWNrPVwic2V0QWN0aXZlTWVudUl0ZW0oaXRlbS5uYW1lKVwiXG4gICAgICAgICAgICAgIDp0bz1cIml0ZW0udG9cIlxuICAgICAgICAgICAgICA6YWN0aXZlPVwiYWN0aXZlTWVudUl0ZW0gPT09IGl0ZW0ubmFtZVwiXG4gICAgICAgICAgICAgIGFjdGl2ZS1jbGFzcz1cIm15LW1lbnUtbGlua1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXI+XG4gICAgICAgICAgICAgICAgPHEtaWNvbiA6bmFtZT1cIml0ZW0uaWNvblwiIC8+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICB7eyBpdGVtLmxhYmVsIH19XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICA8L3EtbGlzdD5cbiAgICAgICAgPC9xLXNjcm9sbC1hcmVhPlxuICAgICAgPC9xLWRyYXdlcj5cblxuICAgICAgPHEtcGFnZS1jb250YWluZXI+XG4gICAgICAgIDxxLXBhZ2U+XG4gICAgICAgICAgPHJvdXRlci12aWV3IC8+XG4gICAgICAgIDwvcS1wYWdlPlxuICAgICAgPC9xLXBhZ2UtY29udGFpbmVyPlxuICAgICAgPHEtZGlhbG9nIHYtbW9kZWw9XCJsb2FkaW5nXCI+XG4gICAgICAgIDxxLWNhcmQ+XG4gICAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBxLWd1dHRlci1tZFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJxLW1sLW1kXCI+U2lnbmluZyBvdXQ8L3NwYW4+XG4gICAgICAgICAgICA8cS1zcGlubmVyLWRvdHMgc2l6ZT1cIjUwcHhcIiAvPlxuICAgICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDwvcS1jYXJkPlxuICAgICAgPC9xLWRpYWxvZz5cbiAgICA8L3EtbGF5b3V0PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYsIG9uTW91bnRlZCwgY29tcHV0ZWQgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2UsIHVzZVF1YXNhciB9IGZyb20gXCJxdWFzYXJcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJ2dWUtcm91dGVyXCI7XG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwic3JjL2Jvb3QvYXhpb3NcIjtcblxuY29uc3QgdXNlciA9IHJlZih7fSk7XG5jb25zdCBkcmF3ZXIgPSByZWYoZmFsc2UpO1xuY29uc3QgYWN0aXZlTWVudUl0ZW0gPSByZWYoXCIwXCIpO1xuY29uc3QgcXVhc2FyID0gdXNlUXVhc2FyKCk7XG5jb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbmNvbnN0IGxvYWRpbmcgPSByZWYoZmFsc2UpO1xuXG5vbk1vdW50ZWQoYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChcIi9hcGkvcHJvZmlsZVwiKTtcbiAgICB1c2VyLnZhbHVlID0gcmVzcG9uc2UuZGF0YTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgdXNlciBkYXRhOlwiLCBlcnJvcik7XG4gIH1cbn0pO1xuXG5jb25zdCBmb3JtYXR0ZWRVc2VyTmFtZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgaWYgKHVzZXIudmFsdWUgJiYgdXNlci52YWx1ZS5kYXRhICYmIHVzZXIudmFsdWUuZGF0YS5uYW1lKSB7XG4gICAgY29uc3QgZnVsbG5hbWUgPSB1c2VyLnZhbHVlLmRhdGEubmFtZTtcbiAgICBjb25zdCBwYXJ0cyA9IGZ1bGxuYW1lLnNwbGl0KFwiIFwiKTtcbiAgICBjb25zdCBmb3JtYXR0ZWRwYXJ0cyA9IHBhcnRzLm1hcCgocGFydCkgPT4ge1xuICAgICAgcmV0dXJuIHBhcnQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwYXJ0LnNsaWNlKDEpLnRvTG93ZXJDYXNlKCk7XG4gICAgfSk7XG4gICAgaWYgKGZvcm1hdHRlZHBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IG1pZGRsZUluZGV4ID0gTWF0aC5mbG9vcihmb3JtYXR0ZWRwYXJ0cy5sZW5ndGggLyAyKTtcbiAgICAgIGZvcm1hdHRlZHBhcnRzW21pZGRsZUluZGV4XSA9XG4gICAgICAgIGZvcm1hdHRlZHBhcnRzW21pZGRsZUluZGV4XS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIFwiLlwiO1xuICAgIH1cbiAgICByZXR1cm4gZm9ybWF0dGVkcGFydHMuam9pbihcIiBcIik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cbn0pO1xuXG5jb25zdCBzaWduT3V0ID0gKCkgPT4ge1xuICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgTG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ0b2tlblwiKTtcbiAgICBMb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInJvbGVcIik7XG4gICAgTG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJhY3RpdmVNZW51SXRlbVwiKTtcbiAgICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gICAgcm91dGVyLnB1c2goXCIvXCIpO1xuICB9LCAxMDAwKTtcbn07XG5cbmNvbnN0IG1lbnVJdGVtcyA9IFtcbiAge1xuICAgIG5hbWU6IFwiYW5hbHl0aWNzXCIsXG4gICAgaWNvbjogXCJxdWVyeV9zdGF0c1wiLFxuICAgIHRvOiBcIi9icmFuY2gvc2FsZXNfbGFkeVwiLFxuICAgIGxhYmVsOiBcIkFuYWx5dGljc1wiLFxuICAgIHNlcGFyYXRvcjogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYnJlYWRcIixcbiAgICBpY29uOiBcImZhLXNvbGlkIGZhLWNha2UtY2FuZGxlc1wiLFxuICAgIHRvOiBcIi9icmFuY2gvc2FsZXNfbGFkeS9wcm9kdWN0c1wiLFxuICAgIGxhYmVsOiBcIlByb2R1Y3RzXCIsXG4gICAgc2VwYXJhdG9yOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJiYWtlcnNSZXBvcnRcIixcbiAgICBpY29uOiBcImZhY3RfY2hlY2tcIixcbiAgICB0bzogXCIvYnJhbmNoL3NhbGVzX2xhZHkvYmFrZXJzX3JlcG9ydFwiLFxuICAgIGxhYmVsOiBcIkJha2VycyBSZXBvcnRcIixcbiAgICBzZXBhcmF0b3I6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInJhd01hdGVyaWFsc1wiLFxuICAgIGljb246IFwiZmFjdF9jaGVja1wiLFxuICAgIHRvOiBcIi9icmFuY2gvc2FsZXNfbGFkeS9yZXBvcnRcIixcbiAgICBsYWJlbDogXCJSZXBvcnRcIixcbiAgICBzZXBhcmF0b3I6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImFjY291bnRzXCIsXG4gICAgaWNvbjogXCJwZXJzb25cIixcbiAgICB0bzogXCIvYnJhbmNoL3NhbGVzX2xhZHkvYWNjb3VudFwiLFxuICAgIGxhYmVsOiBcIkFjY291bnRzXCIsXG4gICAgc2VwYXJhdG9yOiB0cnVlLFxuICB9LFxuXTtcbm9uTW91bnRlZCgoKSA9PiB7XG4gIGNvbnN0IHN0b3JlZEFjdGl2ZU1lbnVJdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJhY3RpdmVNZW51SXRlbVwiKTtcbiAgaWYgKHN0b3JlZEFjdGl2ZU1lbnVJdGVtKSB7XG4gICAgYWN0aXZlTWVudUl0ZW0udmFsdWUgPSBzdG9yZWRBY3RpdmVNZW51SXRlbTtcbiAgfVxufSk7XG5cbi8vIEZ1bmN0aW9uIHRvIHVwZGF0ZSBhY3RpdmVNZW51SXRlbSBhbmQgc3RvcmUgaXQgaW4gbG9jYWxTdG9yYWdlXG5jb25zdCBzZXRBY3RpdmVNZW51SXRlbSA9IChpdGVtTmFtZSkgPT4ge1xuICBhY3RpdmVNZW51SXRlbS52YWx1ZSA9IGl0ZW1OYW1lO1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImFjdGl2ZU1lbnVJdGVtXCIsIGl0ZW1OYW1lKTtcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5teS1tZW51LWxpbmsge1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQ6ICNlZjQ0NDQ7XG59XG4uYWNjb3VudC1jYXJkIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiA5OTk7IC8qIEVuc3VyZSB0aGUgY2FyZCBpcyBhYm92ZSBvdGhlciBlbGVtZW50cyAqL1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJMb2NhbFN0b3JhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrSUEsVUFBTSxPQUFPLElBQUksQ0FBQSxDQUFFO0FBQ25CLFVBQU0sU0FBUyxJQUFJLEtBQUs7QUFDeEIsVUFBTSxpQkFBaUIsSUFBSSxHQUFHO0FBQ2YsY0FBWTtBQUMzQixVQUFNLFNBQVMsVUFBUztBQUN4QixVQUFNLFVBQVUsSUFBSSxLQUFLO0FBRXpCLGNBQVUsWUFBWTtBQUNwQixVQUFJO0FBQ0YsY0FBTSxXQUFXLE1BQU0sSUFBSSxJQUFJLGNBQWM7QUFDN0MsYUFBSyxRQUFRLFNBQVM7QUFBQSxNQUN2QixTQUFRLE9BQVA7QUFDQSxnQkFBUSxNQUFNLDZCQUE2QixLQUFLO0FBQUEsTUFDakQ7QUFBQSxJQUNILENBQUM7QUFFRCxVQUFNLG9CQUFvQixTQUFTLE1BQU07QUFDdkMsVUFBSSxLQUFLLFNBQVMsS0FBSyxNQUFNLFFBQVEsS0FBSyxNQUFNLEtBQUssTUFBTTtBQUN6RCxjQUFNLFdBQVcsS0FBSyxNQUFNLEtBQUs7QUFDakMsY0FBTSxRQUFRLFNBQVMsTUFBTSxHQUFHO0FBQ2hDLGNBQU0saUJBQWlCLE1BQU0sSUFBSSxDQUFDLFNBQVM7QUFDekMsaUJBQU8sS0FBSyxPQUFPLENBQUMsRUFBRSxZQUFXLElBQUssS0FBSyxNQUFNLENBQUMsRUFBRTtRQUMxRCxDQUFLO0FBQ0QsWUFBSSxlQUFlLFNBQVMsR0FBRztBQUM3QixnQkFBTSxjQUFjLEtBQUssTUFBTSxlQUFlLFNBQVMsQ0FBQztBQUN4RCx5QkFBZSxlQUNiLGVBQWUsYUFBYSxPQUFPLENBQUMsRUFBRSxZQUFhLElBQUc7QUFBQSxRQUN6RDtBQUNELGVBQU8sZUFBZSxLQUFLLEdBQUc7QUFBQSxNQUNsQyxPQUFTO0FBQ0wsZUFBTztBQUFBLE1BQ1I7QUFBQSxJQUNILENBQUM7QUFFRCxVQUFNLFVBQVUsTUFBTTtBQUNwQixjQUFRLFFBQVE7QUFDaEIsaUJBQVcsTUFBTTtBQUNmQSxlQUFhLFdBQVcsT0FBTztBQUMvQkEsZUFBYSxXQUFXLE1BQU07QUFDOUJBLGVBQWEsV0FBVyxnQkFBZ0I7QUFDeEMsZ0JBQVEsUUFBUTtBQUNoQixlQUFPLEtBQUssR0FBRztBQUFBLE1BQ2hCLEdBQUUsR0FBSTtBQUFBLElBQ1Q7QUFFQSxVQUFNLFlBQVk7QUFBQSxNQUNoQjtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sSUFBSTtBQUFBLFFBQ0osT0FBTztBQUFBLFFBQ1AsV0FBVztBQUFBLE1BQ1o7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixJQUFJO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsTUFDWjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLElBQUk7QUFBQSxRQUNKLE9BQU87QUFBQSxRQUNQLFdBQVc7QUFBQSxNQUNaO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sSUFBSTtBQUFBLFFBQ0osT0FBTztBQUFBLFFBQ1AsV0FBVztBQUFBLE1BQ1o7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixJQUFJO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsTUFDWjtBQUFBLElBQ0g7QUFDQSxjQUFVLE1BQU07QUFDZCxZQUFNLHVCQUF1QixhQUFhLFFBQVEsZ0JBQWdCO0FBQ2xFLFVBQUksc0JBQXNCO0FBQ3hCLHVCQUFlLFFBQVE7QUFBQSxNQUN4QjtBQUFBLElBQ0gsQ0FBQztBQUdELFVBQU0sb0JBQW9CLENBQUMsYUFBYTtBQUN0QyxxQkFBZSxRQUFRO0FBQ3ZCLG1CQUFhLFFBQVEsa0JBQWtCLFFBQVE7QUFBQSxJQUNqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
