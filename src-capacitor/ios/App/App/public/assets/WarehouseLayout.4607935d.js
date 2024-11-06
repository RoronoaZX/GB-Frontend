import { _ as _export_sfc, n as ref, r as resolveComponent, o as openBlock, a4 as createElementBlock, a as createVNode, w as withCtx, M as QBtn, a1 as createTextVNode, J as createBaseVNode, c as createBlock, be as createCommentVNode, $ as QAvatar, a2 as QSeparator, a5 as Fragment, a6 as renderList, af as withDirectives, L as QIcon, a0 as toDisplayString, ba as Ripple, O as pushScopeId, R as popScopeId } from "./index.9b9dbcba.js";
import { b as QHeader, Q as QToolbar, a as QToolbarTitle, c as QDrawer } from "./QDrawer.eb399e3f.js";
import { Q as QTooltip } from "./QTooltip.a17992ce.js";
import { Q as QBadge } from "./QBadge.cf1023ef.js";
import { Q as QItem, a as QItemSection } from "./QItem.79579b05.js";
import { Q as QList } from "./QList.8d472d75.js";
import { Q as QMenu } from "./QMenu.d2cee634.js";
import { Q as QScrollArea } from "./QScrollArea.48206f05.js";
import { Q as QPage } from "./QPage.4b0a10d6.js";
import { Q as QLayout, a as QPageContainer } from "./QLayout.45cbf2d2.js";
import "./QResizeObserver.5792a751.js";
import "./TouchPan.4f7a1ce1.js";
import "./touch.9135741d.js";
import "./format.76edee29.js";
import "./QScrollObserver.247b574c.js";
var WarehouseLayout_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-cd995f76"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "q-pa-md" };
const _hoisted_2 = { class: "q-gutter-sm row items-center no-wrap" };
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("img", { src: "https://cdn.quasar.dev/img/boy-avatar.png" }, null, -1));
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("img", { src: "https://cdn.quasar.dev/img/boy-avatar.png" }, null, -1));
const _sfc_main = {
  __name: "WarehouseLayout",
  setup(__props) {
    const drawer = ref(false);
    const activeMenuItem = ref("0");
    const menuItems = [
      {
        name: "transaction",
        icon: "fact_check",
        to: "/warehouse",
        label: "Transaction History",
        separator: true
      },
      {
        name: "ingredients",
        icon: "assignment",
        to: "/warehouse/ingredients",
        label: "Ingredients",
        separator: true
      },
      {
        name: "scallingSection",
        icon: "fa-solid fa-chart-pie",
        to: "/warehouse/scalling_section",
        label: "Scalling Section",
        separator: true
      },
      {
        name: "analytics",
        icon: "query_stats",
        to: "",
        label: "Analytics",
        separator: true
      }
    ];
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
                      color: "dark",
                      flat: "",
                      onClick: _cache[0] || (_cache[0] = ($event) => drawer.value = !drawer.value),
                      round: "",
                      dense: "",
                      icon: "menu"
                    }),
                    createVNode(QToolbarTitle, { class: "text-dark text-weight-bold" }, {
                      default: withCtx(() => [
                        createTextVNode("GB Warehouse")
                      ]),
                      _: 1
                    }),
                    createBaseVNode("div", _hoisted_2, [
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
                              _hoisted_3
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
                                              _hoisted_4
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(QItemSection, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Your Profile")
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
                                  createVNode(QItem, { clickable: "" }, {
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
                      padding: "",
                      class: "rounded-borders"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createElementBlock(Fragment, null, renderList(menuItems, (item, index) => {
                          return withDirectives(createVNode(QItem, {
                            clickable: true,
                            key: index,
                            onClick: ($event) => activeMenuItem.value = item.name,
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
                          }, 1032, ["onClick", "to", "active"]), [
                            [Ripple]
                          ]);
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
var WarehouseLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cd995f76"], ["__file", "WarehouseLayout.vue"]]);
export { WarehouseLayout as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FyZWhvdXNlTGF5b3V0LjQ2MDc5MzVkLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGF5b3V0cy9XYXJlaG91c2VMYXlvdXQudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInEtcGEtbWRcIj5cbiAgICA8cS1sYXlvdXQgdmlldz1cImhIaCBMcHIgbGZmXCI+XG4gICAgICA8cS1oZWFkZXIgZWxldmF0ZWQgY2xhc3M9XCJiZy13aGl0ZVwiPlxuICAgICAgICA8cS10b29sYmFyPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgY29sb3I9XCJkYXJrXCJcbiAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgIEBjbGljaz1cImRyYXdlciA9ICFkcmF3ZXJcIlxuICAgICAgICAgICAgcm91bmRcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBpY29uPVwibWVudVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cS10b29sYmFyLXRpdGxlIGNsYXNzPVwidGV4dC1kYXJrIHRleHQtd2VpZ2h0LWJvbGRcIlxuICAgICAgICAgICAgPkdCIFdhcmVob3VzZTwvcS10b29sYmFyLXRpdGxlXG4gICAgICAgICAgPlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXNtIHJvdyBpdGVtcy1jZW50ZXIgbm8td3JhcFwiPlxuICAgICAgICAgICAgPHEtYnRuIHJvdW5kIGRlbnNlIGZsYXQgaWNvbj1cIm1lc3NhZ2VcIiB2LWlmPVwiJHEuc2NyZWVuLmd0LnNtXCI+XG4gICAgICAgICAgICAgIDxxLXRvb2x0aXA+TWVzc2FnZXM8L3EtdG9vbHRpcD5cbiAgICAgICAgICAgIDwvcS1idG4+XG4gICAgICAgICAgICA8cS1idG4gcm91bmQgZGVuc2UgZmxhdCBjb2xvcj1cImdyZXktMTBcIiBpY29uPVwibm90aWZpY2F0aW9uc1wiPlxuICAgICAgICAgICAgICA8cS1iYWRnZSBjb2xvcj1cInJlZFwiIGNsYXNzPVwidGV4dC13aGl0ZVwiIGZsb2F0aW5nPiAyIDwvcS1iYWRnZT5cbiAgICAgICAgICAgICAgPHEtdG9vbHRpcD5Ob3RpZmljYXRpb25zPC9xLXRvb2x0aXA+XG4gICAgICAgICAgICA8L3EtYnRuPlxuICAgICAgICAgICAgPHEtYnRuIHJvdW5kIGZsYXQ+XG4gICAgICAgICAgICAgIDxxLWF2YXRhciBzaXplPVwiMjZweFwiPlxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9jZG4ucXVhc2FyLmRldi9pbWcvYm95LWF2YXRhci5wbmdcIiAvPlxuICAgICAgICAgICAgICA8L3EtYXZhdGFyPlxuICAgICAgICAgICAgICA8cS1tZW51XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbi1zaG93PVwic2NhbGVcIlxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb24taGlkZT1cInNjYWxlXCJcbiAgICAgICAgICAgICAgICBhbmNob3I9XCJib3R0b20gbGVmdFwiXG4gICAgICAgICAgICAgICAgc2VsZj1cInRvcCBsZWZ0XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxxLWxpc3Qgc3R5bGU9XCJtaW4td2lkdGg6IDEwMHB4XCI+XG4gICAgICAgICAgICAgICAgICA8cS1pdGVtIGNsaWNrYWJsZT5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1hdmF0YXIgc2l6ZT1cIjI2cHhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cHM6Ly9jZG4ucXVhc2FyLmRldi9pbWcvYm95LWF2YXRhci5wbmdcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvcS1hdmF0YXI+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5Zb3VyIFByb2ZpbGU8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgICA8cS1pdGVtIGNsaWNrYWJsZT5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1hdmF0YXIgaWNvbj1cInNldHRpbmdzXCIgc2l6ZT1cInhsXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlNldHRpbmdzPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgICAgPHEtc2VwYXJhdG9yIC8+XG4gICAgICAgICAgICAgICAgICA8cS1pdGVtIGNsaWNrYWJsZT5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhcj5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1hdmF0YXIgaWNvbj1cImxvZ291dFwiIHNpemU9XCJ4bFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5TaWduIE91dDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgICA8L3EtbGlzdD5cbiAgICAgICAgICAgICAgPC9xLW1lbnU+XG4gICAgICAgICAgICA8L3EtYnRuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtdG9vbGJhcj5cbiAgICAgIDwvcS1oZWFkZXI+XG5cbiAgICAgIDxxLWRyYXdlclxuICAgICAgICB2LW1vZGVsPVwiZHJhd2VyXCJcbiAgICAgICAgc2hvdy1pZi1hYm92ZVxuICAgICAgICBiZWhhdmlvcj1cIm1vYmlsZVwiXG4gICAgICAgIDp3aWR0aD1cIjIwMFwiXG4gICAgICAgIDpicmVha3BvaW50PVwiNTAwXCJcbiAgICAgICAgYm9yZGVyZWRcbiAgICAgID5cbiAgICAgICAgPHEtc2Nyb2xsLWFyZWEgY2xhc3M9XCJmaXRcIj5cbiAgICAgICAgICA8cS1saXN0IGJvcmRlcmVkIHBhZGRpbmcgY2xhc3M9XCJyb3VuZGVkLWJvcmRlcnNcIj5cbiAgICAgICAgICAgIDxxLWl0ZW1cbiAgICAgICAgICAgICAgOmNsaWNrYWJsZT1cInRydWVcIlxuICAgICAgICAgICAgICB2LXJpcHBsZVxuICAgICAgICAgICAgICB2LWZvcj1cIihpdGVtLCBpbmRleCkgaW4gbWVudUl0ZW1zXCJcbiAgICAgICAgICAgICAgOmtleT1cImluZGV4XCJcbiAgICAgICAgICAgICAgQGNsaWNrPVwiYWN0aXZlTWVudUl0ZW0gPSBpdGVtLm5hbWVcIlxuICAgICAgICAgICAgICA6dG89XCJpdGVtLnRvXCJcbiAgICAgICAgICAgICAgOmFjdGl2ZT1cImFjdGl2ZU1lbnVJdGVtID09PSBpdGVtLm5hbWVcIlxuICAgICAgICAgICAgICBhY3RpdmUtY2xhc3M9XCJteS1tZW51LWxpbmtcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyPlxuICAgICAgICAgICAgICAgIDxxLWljb24gOm5hbWU9XCJpdGVtLmljb25cIiAvPlxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAge3sgaXRlbS5sYWJlbCB9fVxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgPC9xLWxpc3Q+XG4gICAgICAgIDwvcS1zY3JvbGwtYXJlYT5cbiAgICAgIDwvcS1kcmF3ZXI+XG5cbiAgICAgIDxxLXBhZ2UtY29udGFpbmVyPlxuICAgICAgICA8cS1wYWdlPlxuICAgICAgICAgIDxyb3V0ZXItdmlldyAvPlxuICAgICAgICA8L3EtcGFnZT5cbiAgICAgIDwvcS1wYWdlLWNvbnRhaW5lcj5cbiAgICA8L3EtbGF5b3V0PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IGRyYXdlciA9IHJlZihmYWxzZSk7XG5jb25zdCBhY3RpdmVNZW51SXRlbSA9IHJlZihcIjBcIik7XG5cbmNvbnN0IG1lbnVJdGVtcyA9IFtcbiAge1xuICAgIG5hbWU6IFwidHJhbnNhY3Rpb25cIixcbiAgICBpY29uOiBcImZhY3RfY2hlY2tcIixcbiAgICB0bzogXCIvd2FyZWhvdXNlXCIsXG4gICAgbGFiZWw6IFwiVHJhbnNhY3Rpb24gSGlzdG9yeVwiLFxuICAgIHNlcGFyYXRvcjogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiaW5ncmVkaWVudHNcIixcbiAgICBpY29uOiBcImFzc2lnbm1lbnRcIixcbiAgICB0bzogXCIvd2FyZWhvdXNlL2luZ3JlZGllbnRzXCIsXG4gICAgbGFiZWw6IFwiSW5ncmVkaWVudHNcIixcbiAgICBzZXBhcmF0b3I6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInNjYWxsaW5nU2VjdGlvblwiLFxuICAgIGljb246IFwiZmEtc29saWQgZmEtY2hhcnQtcGllXCIsXG4gICAgdG86IFwiL3dhcmVob3VzZS9zY2FsbGluZ19zZWN0aW9uXCIsXG4gICAgbGFiZWw6IFwiU2NhbGxpbmcgU2VjdGlvblwiLFxuICAgIHNlcGFyYXRvcjogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYW5hbHl0aWNzXCIsXG4gICAgaWNvbjogXCJxdWVyeV9zdGF0c1wiLFxuICAgIHRvOiBcIlwiLFxuICAgIGxhYmVsOiBcIkFuYWx5dGljc1wiLFxuICAgIHNlcGFyYXRvcjogdHJ1ZSxcbiAgfSxcbl07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5teS1tZW51LWxpbmsge1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQ6ICNlZjQ0NDQ7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJHQSxVQUFNLFNBQVMsSUFBSSxLQUFLO0FBQ3hCLFVBQU0saUJBQWlCLElBQUksR0FBRztBQUU5QixVQUFNLFlBQVk7QUFBQSxNQUNoQjtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sSUFBSTtBQUFBLFFBQ0osT0FBTztBQUFBLFFBQ1AsV0FBVztBQUFBLE1BQ1o7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixJQUFJO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsTUFDWjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLElBQUk7QUFBQSxRQUNKLE9BQU87QUFBQSxRQUNQLFdBQVc7QUFBQSxNQUNaO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sSUFBSTtBQUFBLFFBQ0osT0FBTztBQUFBLFFBQ1AsV0FBVztBQUFBLE1BQ1o7QUFBQSxJQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
