import { _ as _export_sfc, n as ref, H as useRouter, z as onMounted, g as computed, r as resolveComponent, o as openBlock, a4 as createElementBlock, a as createVNode, w as withCtx, M as QBtn, J as createBaseVNode, c as createBlock, O as createTextVNode, be as createCommentVNode, a1 as QAvatar, a2 as QSeparator, R as toDisplayString, af as withDirectives, a3 as QDialog, Q as QCard, I as QCardSection, a5 as Fragment, a6 as renderList, L as QIcon, S as pushScopeId, T as popScopeId } from "./index.c8e2405b.js";
import { b as QHeader, Q as QToolbar, a as QToolbarTitle, c as QDrawer } from "./QDrawer.cccc27f5.js";
import { Q as QTooltip } from "./QTooltip.4a3eef22.js";
import { Q as QBadge } from "./QBadge.49245359.js";
import { Q as QItem, a as QItemSection } from "./QItem.76557ad9.js";
import { Q as QList } from "./QList.d5d13fac.js";
import { Q as QMenu } from "./QMenu.4f670399.js";
import { Q as QSpinnerDots } from "./QSpinnerDots.c2e8b2d3.js";
import { Q as QScrollArea } from "./QScrollArea.8dd131ca.js";
import { Q as QPage } from "./QPage.e43c6521.js";
import { Q as QLayout, a as QPageContainer } from "./QLayout.a9be2976.js";
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
var BakersLayout_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-5b9c52fe"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "q-pa-md" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_0,
  style: { "width": "50px", "height": "40px" }
}, null, -1));
const _hoisted_3 = { class: "q-gutter-sm row items-center no-wrap" };
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("img", { src: "https://cdn.quasar.dev/img/avatar4.jpg" }, null, -1));
const _hoisted_5 = { class: "row no-wrap q-pa-md" };
const _hoisted_6 = { class: "column" };
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6 q-mb-md" }, "Settings", -1));
const _hoisted_8 = { class: "column items-center" };
const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("img", { src: "https://cdn.quasar.dev/img/avatar4.jpg" }, null, -1));
const _hoisted_10 = { class: "text-subtitle1 q-mt-md q-mb-xs" };
const _hoisted_11 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("span", { class: "q-ml-md" }, "Signing out", -1));
const _sfc_main = {
  __name: "BakersLayout",
  setup(__props) {
    const drawer = ref(false);
    const activeMenuItem = ref("0");
    const user = ref({});
    useQuasar();
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
    const formattedUserName = computed(() => {
      if (user.value && user.value.data && user.value.data.name) {
        const fullName = user.value.data.name;
        const parts = fullName.split(" ");
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
        name: "rawMaterials",
        icon: "fa-solid fa-layer-group",
        to: "/branch/baker",
        label: "Raw Materials",
        separator: true
      },
      {
        name: "transaction",
        icon: "fa-solid fa-cake-candles",
        to: "/branch/baker/transaction",
        label: "Transaction",
        separator: true
      },
      {
        name: "report",
        icon: "fact_check",
        to: "/branch/baker/report",
        label: "Report",
        separator: true
      },
      {
        name: "accounts",
        icon: "person",
        to: "/branch/baker/account",
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
                          }),
                          createVNode(QDialog, {
                            modelValue: loading.value,
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => loading.value = $event)
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
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(QDrawer, {
              modelValue: drawer.value,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => drawer.value = $event),
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
            })
          ]),
          _: 1
        })
      ]);
    };
  }
};
var BakersLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5b9c52fe"], ["__file", "BakersLayout.vue"]]);
export { BakersLayout as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFrZXJzTGF5b3V0LmNhYjFjZGMzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGF5b3V0cy9CYWtlcnNMYXlvdXQudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInEtcGEtbWRcIj5cbiAgICA8cS1sYXlvdXQgdmlldz1cImhIaCBMcHIgbGZmXCI+XG4gICAgICA8cS1oZWFkZXIgZWxldmF0ZWQgY2xhc3M9XCJiZy13aGl0ZVwiPlxuICAgICAgICA8cS10b29sYmFyPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgY29sb3I9XCJyZWQtNlwiXG4gICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICBAY2xpY2s9XCJkcmF3ZXIgPSAhZHJhd2VyXCJcbiAgICAgICAgICAgIHJvdW5kXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgaWNvbj1cIm1lbnVcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHEtdG9vbGJhci10aXRsZSBjbGFzcz1cInB5LW1kXCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIHNyYz1cIi4uL2Fzc2V0cy9HQl9MT0dPLnBuZ1wiXG4gICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDUwcHg7IGhlaWdodDogNDBweFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvcS10b29sYmFyLXRpdGxlPlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXNtIHJvdyBpdGVtcy1jZW50ZXIgbm8td3JhcFwiPlxuICAgICAgICAgICAgPHEtYnRuIHJvdW5kIGRlbnNlIGZsYXQgaWNvbj1cIm1lc3NhZ2VcIiB2LWlmPVwiJHEuc2NyZWVuLmd0LnNtXCI+XG4gICAgICAgICAgICAgIDxxLXRvb2x0aXA+TWVzc2FnZXM8L3EtdG9vbHRpcD5cbiAgICAgICAgICAgIDwvcS1idG4+XG4gICAgICAgICAgICA8cS1idG4gcm91bmQgZGVuc2UgZmxhdCBjb2xvcj1cImdyZXktMTBcIiBpY29uPVwibm90aWZpY2F0aW9uc1wiPlxuICAgICAgICAgICAgICA8cS1iYWRnZSBjb2xvcj1cInJlZFwiIGNsYXNzPVwidGV4dC13aGl0ZVwiIGZsb2F0aW5nPiAyIDwvcS1iYWRnZT5cbiAgICAgICAgICAgICAgPHEtdG9vbHRpcD5Ob3RpZmljYXRpb25zPC9xLXRvb2x0aXA+XG4gICAgICAgICAgICA8L3EtYnRuPlxuICAgICAgICAgICAgPHEtYnRuIHJvdW5kIGZsYXQ+XG4gICAgICAgICAgICAgIDxxLWF2YXRhciBzaXplPVwiMjZweFwiPlxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9jZG4ucXVhc2FyLmRldi9pbWcvYXZhdGFyNC5qcGdcIiAvPlxuICAgICAgICAgICAgICA8L3EtYXZhdGFyPlxuICAgICAgICAgICAgICA8cS1tZW51PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbm8td3JhcCBxLXBhLW1kXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2IHEtbWItbWRcIj5TZXR0aW5nczwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8cS1saXN0PlxuICAgICAgICAgICAgICAgICAgICAgIDxxLXNlcGFyYXRvciAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0gY2xpY2thYmxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPkFjY291bnQ8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLXNlcGFyYXRvciAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0gY2xpY2thYmxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPkhlbHAgJmFtcDsgRmVlZGJhY2s8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgICAgICA8L3EtbGlzdD5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSA8cS10b2dnbGUgdi1tb2RlbD1cIm1vYmlsZURhdGFcIiBsYWJlbD1cIlVzZSBNb2JpbGUgRGF0YVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxxLXRvZ2dsZSB2LW1vZGVsPVwiYmx1ZXRvb3RoXCIgbGFiZWw9XCJCbHVldG9vdGhcIiAvPiAtLT5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8cS1zZXBhcmF0b3IgdmVydGljYWwgaW5zZXQgY2xhc3M9XCJxLW14LWxnXCIgLz5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbiBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHEtYXZhdGFyIHNpemU9XCI3MnB4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJodHRwczovL2Nkbi5xdWFzYXIuZGV2L2ltZy9hdmF0YXI0LmpwZ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1hdmF0YXI+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUxIHEtbXQtbWQgcS1tYi14c1wiPlxuICAgICAgICAgICAgICAgICAgICAgIHt7IGZvcm1hdHRlZFVzZXJOYW1lIH19XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJMb2dvdXRcIlxuICAgICAgICAgICAgICAgICAgICAgIHB1c2hcbiAgICAgICAgICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cInNpZ25PdXRcIlxuICAgICAgICAgICAgICAgICAgICAgIHYtY2xvc2UtcG9wdXBcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L3EtbWVudT5cbiAgICAgICAgICAgICAgPHEtZGlhbG9nIHYtbW9kZWw9XCJsb2FkaW5nXCI+XG4gICAgICAgICAgICAgICAgPHEtY2FyZD5cbiAgICAgICAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1ndXR0ZXItbWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJxLW1sLW1kXCI+U2lnbmluZyBvdXQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxxLXNwaW5uZXItZG90cyBzaXplPVwiNTBweFwiIC8+XG4gICAgICAgICAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDwvcS1jYXJkPlxuICAgICAgICAgICAgICA8L3EtZGlhbG9nPlxuICAgICAgICAgICAgPC9xLWJ0bj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLXRvb2xiYXI+XG4gICAgICA8L3EtaGVhZGVyPlxuXG4gICAgICA8cS1kcmF3ZXJcbiAgICAgICAgdi1tb2RlbD1cImRyYXdlclwiXG4gICAgICAgIHNob3ctaWYtYWJvdmVcbiAgICAgICAgYmVoYXZpb3I9XCJtb2JpbGVcIlxuICAgICAgICA6d2lkdGg9XCIyMDBcIlxuICAgICAgICA6YnJlYWtwb2ludD1cIjUwMFwiXG4gICAgICAgIGJvcmRlcmVkXG4gICAgICA+XG4gICAgICAgIDxxLXNjcm9sbC1hcmVhIGNsYXNzPVwiZml0XCI+XG4gICAgICAgICAgPHEtbGlzdCBib3JkZXJlZCBwYWRkaW5nPlxuICAgICAgICAgICAgPHEtaXRlbVxuICAgICAgICAgICAgICA6Y2xpY2thYmxlPVwidHJ1ZVwiXG4gICAgICAgICAgICAgIHYtZm9yPVwiKGl0ZW0sIGluZGV4KSBpbiBtZW51SXRlbXNcIlxuICAgICAgICAgICAgICA6a2V5PVwiaW5kZXhcIlxuICAgICAgICAgICAgICBAY2xpY2s9XCJzZXRBY3RpdmVNZW51SXRlbShpdGVtLm5hbWUpXCJcbiAgICAgICAgICAgICAgOnRvPVwiaXRlbS50b1wiXG4gICAgICAgICAgICAgIDphY3RpdmU9XCJhY3RpdmVNZW51SXRlbSA9PT0gaXRlbS5uYW1lXCJcbiAgICAgICAgICAgICAgYWN0aXZlLWNsYXNzPVwibXktbWVudS1saW5rXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj5cbiAgICAgICAgICAgICAgICA8cS1pY29uIDpuYW1lPVwiaXRlbS5pY29uXCIgLz5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIHt7IGl0ZW0ubGFiZWwgfX1cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICA8L3Etc2Nyb2xsLWFyZWE+XG4gICAgICA8L3EtZHJhd2VyPlxuXG4gICAgICA8cS1wYWdlLWNvbnRhaW5lcj5cbiAgICAgICAgPHEtcGFnZT5cbiAgICAgICAgICA8cm91dGVyLXZpZXcgLz5cbiAgICAgICAgPC9xLXBhZ2U+XG4gICAgICA8L3EtcGFnZS1jb250YWluZXI+XG4gICAgPC9xLWxheW91dD5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmLCBvbk1vdW50ZWQsIGNvbXB1dGVkIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlLCB1c2VRdWFzYXIgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwidnVlLXJvdXRlclwiO1xuaW1wb3J0IHsgYXBpIH0gZnJvbSBcInNyYy9ib290L2F4aW9zXCI7XG5cbmNvbnN0IGRyYXdlciA9IHJlZihmYWxzZSk7XG5jb25zdCBhY3RpdmVNZW51SXRlbSA9IHJlZihcIjBcIik7XG5cbmNvbnN0IHVzZXIgPSByZWYoe30pO1xuY29uc3QgcXVhc2FyID0gdXNlUXVhc2FyKCk7XG5jb25zdCBsb2FkaW5nID0gcmVmKGZhbHNlKTtcbmNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoXCIvYXBpL3Byb2ZpbGVcIik7XG4gICAgdXNlci52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHVzZXIgZGF0YTpcIiwgZXJyb3IpO1xuICB9XG59KTtcblxuY29uc3QgZm9ybWF0dGVkVXNlck5hbWUgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmICh1c2VyLnZhbHVlICYmIHVzZXIudmFsdWUuZGF0YSAmJiB1c2VyLnZhbHVlLmRhdGEubmFtZSkge1xuICAgIGNvbnN0IGZ1bGxOYW1lID0gdXNlci52YWx1ZS5kYXRhLm5hbWU7XG4gICAgY29uc3QgcGFydHMgPSBmdWxsTmFtZS5zcGxpdChcIiBcIik7XG4gICAgY29uc3QgZm9ybWF0dGVkcGFydHMgPSBwYXJ0cy5tYXAoKHBhcnQpID0+IHtcbiAgICAgIHJldHVybiBwYXJ0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcGFydC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpO1xuICAgIH0pO1xuICAgIGlmIChmb3JtYXR0ZWRwYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBtaWRkbGVJbmRleCA9IE1hdGguZmxvb3IoZm9ybWF0dGVkcGFydHMubGVuZ3RoIC8gMik7XG4gICAgICBmb3JtYXR0ZWRwYXJ0c1ttaWRkbGVJbmRleF0gPVxuICAgICAgICBmb3JtYXR0ZWRwYXJ0c1ttaWRkbGVJbmRleF0uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBcIi5cIjtcbiAgICB9XG4gICAgcmV0dXJuIGZvcm1hdHRlZHBhcnRzLmpvaW4oXCIgXCIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG59KTtcblxuY29uc3Qgc2lnbk91dCA9ICgpID0+IHtcbiAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIExvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwidG9rZW5cIik7XG4gICAgTG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJyb2xlXCIpO1xuICAgIExvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiYWN0aXZlTWVudUl0ZW1cIik7XG4gICAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICAgIHJvdXRlci5wdXNoKFwiL1wiKTtcbiAgfSwgMTAwMCk7XG59O1xuXG5jb25zdCBtZW51SXRlbXMgPSBbXG4gIHtcbiAgICBuYW1lOiBcInJhd01hdGVyaWFsc1wiLFxuICAgIGljb246IFwiZmEtc29saWQgZmEtbGF5ZXItZ3JvdXBcIixcbiAgICB0bzogXCIvYnJhbmNoL2Jha2VyXCIsXG4gICAgbGFiZWw6IFwiUmF3IE1hdGVyaWFsc1wiLFxuICAgIHNlcGFyYXRvcjogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwidHJhbnNhY3Rpb25cIixcbiAgICBpY29uOiBcImZhLXNvbGlkIGZhLWNha2UtY2FuZGxlc1wiLFxuICAgIHRvOiBcIi9icmFuY2gvYmFrZXIvdHJhbnNhY3Rpb25cIixcbiAgICBsYWJlbDogXCJUcmFuc2FjdGlvblwiLFxuICAgIHNlcGFyYXRvcjogdHJ1ZSxcbiAgfSxcbiAgLy8ge1xuICAvLyAgIG5hbWU6IFwiZXhwZW5jZXNcIixcbiAgLy8gICBpY29uOiBcInd5c2l3eWdcIixcbiAgLy8gICB0bzogXCIvYnJhbmNoL2V4cGVuY2VzXCIsXG4gIC8vICAgbGFiZWw6IFwiRXhwZW5jZXNcIixcbiAgLy8gICBzZXBhcmF0b3I6IHRydWUsXG4gIC8vIH0sXG4gIHtcbiAgICBuYW1lOiBcInJlcG9ydFwiLFxuICAgIGljb246IFwiZmFjdF9jaGVja1wiLFxuICAgIHRvOiBcIi9icmFuY2gvYmFrZXIvcmVwb3J0XCIsXG4gICAgbGFiZWw6IFwiUmVwb3J0XCIsXG4gICAgc2VwYXJhdG9yOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJhY2NvdW50c1wiLFxuICAgIGljb246IFwicGVyc29uXCIsXG4gICAgdG86IFwiL2JyYW5jaC9iYWtlci9hY2NvdW50XCIsXG4gICAgbGFiZWw6IFwiQWNjb3VudHNcIixcbiAgICBzZXBhcmF0b3I6IHRydWUsXG4gIH0sXG5dO1xub25Nb3VudGVkKCgpID0+IHtcbiAgY29uc3Qgc3RvcmVkQWN0aXZlTWVudUl0ZW0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImFjdGl2ZU1lbnVJdGVtXCIpO1xuICBpZiAoc3RvcmVkQWN0aXZlTWVudUl0ZW0pIHtcbiAgICBhY3RpdmVNZW51SXRlbS52YWx1ZSA9IHN0b3JlZEFjdGl2ZU1lbnVJdGVtO1xuICB9XG59KTtcblxuLy8gRnVuY3Rpb24gdG8gdXBkYXRlIGFjdGl2ZU1lbnVJdGVtIGFuZCBzdG9yZSBpdCBpbiBsb2NhbFN0b3JhZ2VcbmNvbnN0IHNldEFjdGl2ZU1lbnVJdGVtID0gKGl0ZW1OYW1lKSA9PiB7XG4gIGFjdGl2ZU1lbnVJdGVtLnZhbHVlID0gaXRlbU5hbWU7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiYWN0aXZlTWVudUl0ZW1cIiwgaXRlbU5hbWUpO1xufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLm15LW1lbnUtbGluayB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZDogI2VmNDQ0NDtcbn1cbi5hY2NvdW50LWNhcmQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDk5OTsgLyogRW5zdXJlIHRoZSBjYXJkIGlzIGFib3ZlIG90aGVyIGVsZW1lbnRzICovXG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIkxvY2FsU3RvcmFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtJQSxVQUFNLFNBQVMsSUFBSSxLQUFLO0FBQ3hCLFVBQU0saUJBQWlCLElBQUksR0FBRztBQUU5QixVQUFNLE9BQU8sSUFBSSxDQUFBLENBQUU7QUFDSixjQUFZO0FBQzNCLFVBQU0sVUFBVSxJQUFJLEtBQUs7QUFDekIsVUFBTSxTQUFTLFVBQVM7QUFDeEIsY0FBVSxZQUFZO0FBQ3BCLFVBQUk7QUFDRixjQUFNLFdBQVcsTUFBTSxJQUFJLElBQUksY0FBYztBQUM3QyxhQUFLLFFBQVEsU0FBUztBQUFBLE1BQ3ZCLFNBQVEsT0FBUDtBQUNBLGdCQUFRLE1BQU0sNkJBQTZCLEtBQUs7QUFBQSxNQUNqRDtBQUFBLElBQ0gsQ0FBQztBQUVELFVBQU0sb0JBQW9CLFNBQVMsTUFBTTtBQUN2QyxVQUFJLEtBQUssU0FBUyxLQUFLLE1BQU0sUUFBUSxLQUFLLE1BQU0sS0FBSyxNQUFNO0FBQ3pELGNBQU0sV0FBVyxLQUFLLE1BQU0sS0FBSztBQUNqQyxjQUFNLFFBQVEsU0FBUyxNQUFNLEdBQUc7QUFDaEMsY0FBTSxpQkFBaUIsTUFBTSxJQUFJLENBQUMsU0FBUztBQUN6QyxpQkFBTyxLQUFLLE9BQU8sQ0FBQyxFQUFFLFlBQVcsSUFBSyxLQUFLLE1BQU0sQ0FBQyxFQUFFO1FBQzFELENBQUs7QUFDRCxZQUFJLGVBQWUsU0FBUyxHQUFHO0FBQzdCLGdCQUFNLGNBQWMsS0FBSyxNQUFNLGVBQWUsU0FBUyxDQUFDO0FBQ3hELHlCQUFlLGVBQ2IsZUFBZSxhQUFhLE9BQU8sQ0FBQyxFQUFFLFlBQWEsSUFBRztBQUFBLFFBQ3pEO0FBQ0QsZUFBTyxlQUFlLEtBQUssR0FBRztBQUFBLE1BQ2xDLE9BQVM7QUFDTCxlQUFPO0FBQUEsTUFDUjtBQUFBLElBQ0gsQ0FBQztBQUVELFVBQU0sVUFBVSxNQUFNO0FBQ3BCLGNBQVEsUUFBUTtBQUNoQixpQkFBVyxNQUFNO0FBQ2ZBLGVBQWEsV0FBVyxPQUFPO0FBQy9CQSxlQUFhLFdBQVcsTUFBTTtBQUM5QkEsZUFBYSxXQUFXLGdCQUFnQjtBQUN4QyxnQkFBUSxRQUFRO0FBQ2hCLGVBQU8sS0FBSyxHQUFHO0FBQUEsTUFDaEIsR0FBRSxHQUFJO0FBQUEsSUFDVDtBQUVBLFVBQU0sWUFBWTtBQUFBLE1BQ2hCO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixJQUFJO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsTUFDWjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLElBQUk7QUFBQSxRQUNKLE9BQU87QUFBQSxRQUNQLFdBQVc7QUFBQSxNQUNaO0FBQUEsTUFRRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sSUFBSTtBQUFBLFFBQ0osT0FBTztBQUFBLFFBQ1AsV0FBVztBQUFBLE1BQ1o7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixJQUFJO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsTUFDWjtBQUFBLElBQ0g7QUFDQSxjQUFVLE1BQU07QUFDZCxZQUFNLHVCQUF1QixhQUFhLFFBQVEsZ0JBQWdCO0FBQ2xFLFVBQUksc0JBQXNCO0FBQ3hCLHVCQUFlLFFBQVE7QUFBQSxNQUN4QjtBQUFBLElBQ0gsQ0FBQztBQUdELFVBQU0sb0JBQW9CLENBQUMsYUFBYTtBQUN0QyxxQkFBZSxRQUFRO0FBQ3ZCLG1CQUFhLFFBQVEsa0JBQWtCLFFBQVE7QUFBQSxJQUNqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
