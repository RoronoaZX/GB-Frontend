import { Q as QLayout, a as QPageContainer } from "./QLayout.45cbf2d2.js";
import { _ as _export_sfc, n as ref, H as useRouter, z as onMounted, g as computed, o as openBlock, c as createBlock, w as withCtx, a as createVNode, $ as QAvatar, J as createBaseVNode, a0 as toDisplayString, a1 as createTextVNode, a2 as QSeparator, a3 as QDialog, Q as QCard, I as QCardSection, M as QBtn, a4 as createElementBlock, a5 as Fragment, a6 as renderList, L as QIcon, O as pushScopeId, R as popScopeId, r as resolveComponent } from "./index.9b9dbcba.js";
import { Q as QToolbar, a as QToolbarTitle, b as QHeader, c as QDrawer } from "./QDrawer.eb399e3f.js";
import { Q as QItem, a as QItemSection } from "./QItem.79579b05.js";
import { Q as QList } from "./QList.8d472d75.js";
import { _ as _imports_0 } from "./GB_LOGO.b766a815.js";
import { Q as QMenu } from "./QMenu.d2cee634.js";
import { Q as QSpinnerDots } from "./QSpinnerDots.4f44ad7f.js";
import { api } from "./axios.91431b0b.js";
import "./QScrollObserver.247b574c.js";
import "./QResizeObserver.5792a751.js";
import "./TouchPan.4f7a1ce1.js";
import "./touch.9135741d.js";
import "./format.76edee29.js";
const _hoisted_1$2 = /* @__PURE__ */ createBaseVNode("img", { src: "https://cdn.quasar.dev/img/boy-avatar.png" }, null, -1);
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("img", { src: "https://cdn.quasar.dev/img/boy-avatar.png" }, null, -1);
const _hoisted_3 = { class: "q-text-truncate text-primary" };
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("span", { class: "q-ml-md" }, "Signing out", -1);
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
        loading.value = false;
        router.push("/");
      }, 1e3);
    };
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
                          createBaseVNode("div", _hoisted_3, toDisplayString(formattedUserName.value), 1)
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
                      _hoisted_4,
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
const _withScopeId$1 = (n) => (pushScopeId("data-v-b8bf5972"), n = n(), popScopeId(), n);
const _hoisted_1$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_0,
  style: { "width": "50px", "height": "40px" }
}, null, -1));
const _hoisted_2 = { class: "q-gutter-sm row items-center no-wrap" };
const _sfc_main$1 = {
  __name: "HeaderComponent",
  setup(__props) {
    const adminDrawer = ref(false);
    const activeMenuItem = ref("dashboard");
    const menuItems = [
      {
        name: "dashboard",
        icon: "fa-solid fa-house",
        to: "/admin/dashboard",
        label: "Dashboard",
        separator: true
      },
      {
        name: "rawMaterials",
        icon: "fa-solid fa-layer-group",
        to: "/admin/raw_materials",
        label: "Raw Materials",
        separator: true
      },
      {
        name: "recipe",
        icon: "description",
        to: "/admin/recipe",
        label: "Recipe",
        separator: true
      },
      {
        name: "wareHouse",
        icon: "factory",
        to: "/admin/warehouse",
        label: "Warehouse",
        separator: true
      },
      {
        name: "storeBranches",
        icon: "fa-solid fa-store",
        to: "/admin/branches",
        label: "Branches",
        separator: true
      },
      {
        name: "products",
        icon: "fa-solid fa-cake-candles",
        to: "/admin/products",
        label: "Products",
        separator: true
      },
      {
        name: "users",
        icon: "fa-solid fa-users",
        to: "/admin/users",
        label: "Users",
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
      return openBlock(), createElementBlock(Fragment, null, [
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
                  onClick: _cache[0] || (_cache[0] = ($event) => adminDrawer.value = !adminDrawer.value),
                  round: "",
                  dense: "",
                  icon: "menu"
                }),
                createVNode(QToolbarTitle, { class: "py-md" }, {
                  default: withCtx(() => [
                    _hoisted_1$1
                  ]),
                  _: 1
                }),
                createBaseVNode("div", _hoisted_2, [
                  createVNode(ProfileAvatarComponent)
                ])
              ]),
              _: 1
            })
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
var HeaderComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-b8bf5972"], ["__file", "HeaderComponent.vue"]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRtaW5MYXlvdXQuMjA1YTdlZjUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1Byb2ZpbGVBdmF0YXJDb21wb25lbnQudnVlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvSGVhZGVyQ29tcG9uZW50LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLWJ0biByb3VuZCBmbGF0PlxuICAgIDxxLWF2YXRhciBzaXplPVwiMjZweFwiPlxuICAgICAgPGltZyBzcmM9XCJodHRwczovL2Nkbi5xdWFzYXIuZGV2L2ltZy9ib3ktYXZhdGFyLnBuZ1wiIC8+XG4gICAgPC9xLWF2YXRhcj5cbiAgICA8cS1tZW51XG4gICAgICB0cmFuc2l0aW9uLXNob3c9XCJzY2FsZVwiXG4gICAgICB0cmFuc2l0aW9uLWhpZGU9XCJzY2FsZVwiXG4gICAgICBhbmNob3I9XCJib3R0b20gbGVmdFwiXG4gICAgICBzZWxmPVwidG9wIGxlZnRcIlxuICAgID5cbiAgICAgIDxxLWxpc3Qgc3R5bGU9XCJtaW4td2lkdGg6IDEwMHB4XCI+XG4gICAgICAgIDxxLWl0ZW0gY2xpY2thYmxlPlxuICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXI+XG4gICAgICAgICAgICA8cS1hdmF0YXIgc2l6ZT1cIjI2cHhcIj5cbiAgICAgICAgICAgICAgPGltZyBzcmM9XCJodHRwczovL2Nkbi5xdWFzYXIuZGV2L2ltZy9ib3ktYXZhdGFyLnBuZ1wiIC8+XG4gICAgICAgICAgICA8L3EtYXZhdGFyPlxuICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtdGV4dC10cnVuY2F0ZSB0ZXh0LXByaW1hcnlcIj5cbiAgICAgICAgICAgICAge3sgZm9ybWF0dGVkVXNlck5hbWUgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgIDwvcS1pdGVtPlxuICAgICAgICA8cS1pdGVtIGNsaWNrYWJsZT5cbiAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyPlxuICAgICAgICAgICAgPHEtYXZhdGFyIGljb249XCJzZXR0aW5nc1wiIHNpemU9XCJ4bFwiIC8+XG4gICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+U2V0dGluZ3M8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgPHEtc2VwYXJhdG9yIC8+XG4gICAgICAgIDxxLWl0ZW0gY2xpY2thYmxlIEBjbGljaz1cInNpZ25PdXRcIj5cbiAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyPlxuICAgICAgICAgICAgPHEtYXZhdGFyIGljb249XCJsb2dvdXRcIiBzaXplPVwieGxcIiAvPlxuICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlNpZ24gT3V0PC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgPC9xLWl0ZW0+XG4gICAgICA8L3EtbGlzdD5cbiAgICA8L3EtbWVudT5cbiAgICA8cS1kaWFsb2cgdi1tb2RlbD1cImxvYWRpbmdcIj5cbiAgICAgIDxxLWNhcmQ+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1ndXR0ZXItbWRcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInEtbWwtbWRcIj5TaWduaW5nIG91dDwvc3Bhbj5cbiAgICAgICAgICA8cS1zcGlubmVyLWRvdHMgc2l6ZT1cIjUwcHhcIiAvPlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPC9xLWNhcmQ+XG4gICAgPC9xLWRpYWxvZz5cbiAgPC9xLWJ0bj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwic3JjL2Jvb3QvYXhpb3NcIjtcbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkLCBjb21wdXRlZCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJ2dWUtcm91dGVyXCI7XG5cbmNvbnN0IHVzZXIgPSByZWYoe30pO1xuY29uc3QgbG9hZGluZyA9IHJlZihmYWxzZSk7XG5jb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbm9uTW91bnRlZChhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KFwiL2FwaS9wcm9maWxlXCIpO1xuICAgIHVzZXIudmFsdWUgPSByZXNwb25zZS5kYXRhO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyB1c2VyIGRhdGE6XCIsIGVycm9yKTtcbiAgfVxufSk7XG5cbmNvbnN0IHNpZ25PdXQgPSAoKSA9PiB7XG4gIGxvYWRpbmcudmFsdWUgPSB0cnVlO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcInRva2VuXCIpO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwicm9sZVwiKTtcbiAgICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gICAgcm91dGVyLnB1c2goXCIvXCIpO1xuICB9LCAxMDAwKTtcbn07XG5cbmNvbnN0IGZvcm1hdHRlZFVzZXJOYW1lID0gY29tcHV0ZWQoKCkgPT4ge1xuICBpZiAodXNlci52YWx1ZSAmJiB1c2VyLnZhbHVlLmRhdGEgJiYgdXNlci52YWx1ZS5kYXRhLm5hbWUpIHtcbiAgICBjb25zdCBmdWxsTmFtZSA9IHVzZXIudmFsdWUuZGF0YS5uYW1lO1xuICAgIGNvbnN0IHBhcnRzID0gZnVsbE5hbWUuc3BsaXQoXCIgXCIpO1xuICAgIGNvbnN0IGZvcm1hdHRlZHBhcnRzID0gcGFydHMubWFwKChwYXJ0KSA9PiB7XG4gICAgICByZXR1cm4gcGFydC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHBhcnQuc2xpY2UoMSkudG9Mb3dlckNhc2UoKTtcbiAgICB9KTtcbiAgICBpZiAoZm9ybWF0dGVkcGFydHMubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3QgbWlkZGxlSW5kZXggPSBNYXRoLmZsb29yKGZvcm1hdHRlZHBhcnRzLmxlbmd0aCAvIDIpO1xuICAgICAgZm9ybWF0dGVkcGFydHNbbWlkZGxlSW5kZXhdID1cbiAgICAgICAgZm9ybWF0dGVkcGFydHNbbWlkZGxlSW5kZXhdLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgXCIuXCI7XG4gICAgfVxuICAgIHJldHVybiBmb3JtYXR0ZWRwYXJ0cy5qb2luKFwiIFwiKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxufSk7XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWhlYWRlciBlbGV2YXRlZCBjbGFzcz1cImJnLXdoaXRlXCI+XG4gICAgPHEtdG9vbGJhcj5cbiAgICAgIDxxLWJ0blxuICAgICAgICBjb2xvcj1cInJlZC02XCJcbiAgICAgICAgZmxhdFxuICAgICAgICBAY2xpY2s9XCJhZG1pbkRyYXdlciA9ICFhZG1pbkRyYXdlclwiXG4gICAgICAgIHJvdW5kXG4gICAgICAgIGRlbnNlXG4gICAgICAgIGljb249XCJtZW51XCJcbiAgICAgIC8+XG4gICAgICA8cS10b29sYmFyLXRpdGxlIGNsYXNzPVwicHktbWRcIj5cbiAgICAgICAgPGltZyBzcmM9XCIuLi9hc3NldHMvR0JfTE9HTy5wbmdcIiBzdHlsZT1cIndpZHRoOiA1MHB4OyBoZWlnaHQ6IDQwcHhcIiAvPlxuICAgICAgPC9xLXRvb2xiYXItdGl0bGU+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci1zbSByb3cgaXRlbXMtY2VudGVyIG5vLXdyYXBcIj5cbiAgICAgICAgPCEtLSA8cS1idG4gcm91bmQgZGVuc2UgZmxhdCBpY29uPVwibWVzc2FnZVwiPlxuICAgICAgICAgIDxxLXRvb2x0aXA+TWVzc2FnZXM8L3EtdG9vbHRpcD5cbiAgICAgICAgPC9xLWJ0bj5cbiAgICAgICAgPHEtYnRuIHJvdW5kIGRlbnNlIGZsYXQgY29sb3I9XCJncmV5LTEwXCIgaWNvbj1cIm5vdGlmaWNhdGlvbnNcIj5cbiAgICAgICAgICA8cS1iYWRnZSBjb2xvcj1cInJlZFwiIGNsYXNzPVwidGV4dC13aGl0ZVwiIGZsb2F0aW5nPiAyIDwvcS1iYWRnZT5cbiAgICAgICAgICA8cS10b29sdGlwPk5vdGlmaWNhdGlvbnM8L3EtdG9vbHRpcD5cbiAgICAgICAgPC9xLWJ0bj4gLS0+XG4gICAgICAgIDxQcm9maWxlQXZhdGFyQ29tcG9uZW50IC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtdG9vbGJhcj5cbiAgPC9xLWhlYWRlcj5cbiAgPHEtZHJhd2VyXG4gICAgdi1tb2RlbD1cImFkbWluRHJhd2VyXCJcbiAgICBzaG93LWlmLWFib3ZlXG4gICAgOndpZHRoPVwiMjAwXCJcbiAgICA6YnJlYWtwb2ludD1cIjUwMFwiXG4gICAgYm9yZGVyZWRcbiAgPlxuICAgIDxxLWxpc3QgYm9yZGVyZWQgcGFkZGluZz5cbiAgICAgIDxxLWl0ZW1cbiAgICAgICAgOmNsaWNrYWJsZT1cInRydWVcIlxuICAgICAgICB2LWZvcj1cIihpdGVtLCBpbmRleCkgaW4gbWVudUl0ZW1zXCJcbiAgICAgICAgOmtleT1cImluZGV4XCJcbiAgICAgICAgQGNsaWNrPVwic2V0QWN0aXZlTWVudUl0ZW0oaXRlbS5uYW1lKVwiXG4gICAgICAgIDp0bz1cIml0ZW0udG9cIlxuICAgICAgICA6YWN0aXZlPVwiYWN0aXZlTWVudUl0ZW0gPT09IGl0ZW0ubmFtZVwiXG4gICAgICAgIGFjdGl2ZS1jbGFzcz1cIm15LW1lbnUtbGlua1wiXG4gICAgICA+XG4gICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXI+XG4gICAgICAgICAgPHEtaWNvbiA6bmFtZT1cIml0ZW0uaWNvblwiIC8+XG4gICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICB7eyBpdGVtLmxhYmVsIH19XG4gICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICA8L3EtaXRlbT5cbiAgICA8L3EtbGlzdD5cbiAgPC9xLWRyYXdlcj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgUHJvZmlsZUF2YXRhckNvbXBvbmVudCBmcm9tIFwiLi9Qcm9maWxlQXZhdGFyQ29tcG9uZW50LnZ1ZVwiO1xuaW1wb3J0IHsgcmVmLCBvbk1vdW50ZWQgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IGFkbWluRHJhd2VyID0gcmVmKGZhbHNlKTtcbmNvbnN0IGFjdGl2ZU1lbnVJdGVtID0gcmVmKFwiZGFzaGJvYXJkXCIpO1xuXG5jb25zdCBtZW51SXRlbXMgPSBbXG4gIHtcbiAgICBuYW1lOiBcImRhc2hib2FyZFwiLFxuICAgIGljb246IFwiZmEtc29saWQgZmEtaG91c2VcIixcbiAgICB0bzogXCIvYWRtaW4vZGFzaGJvYXJkXCIsXG4gICAgbGFiZWw6IFwiRGFzaGJvYXJkXCIsXG4gICAgc2VwYXJhdG9yOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJyYXdNYXRlcmlhbHNcIixcbiAgICBpY29uOiBcImZhLXNvbGlkIGZhLWxheWVyLWdyb3VwXCIsXG4gICAgdG86IFwiL2FkbWluL3Jhd19tYXRlcmlhbHNcIixcbiAgICBsYWJlbDogXCJSYXcgTWF0ZXJpYWxzXCIsXG4gICAgc2VwYXJhdG9yOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJyZWNpcGVcIixcbiAgICBpY29uOiBcImRlc2NyaXB0aW9uXCIsXG4gICAgdG86IFwiL2FkbWluL3JlY2lwZVwiLFxuICAgIGxhYmVsOiBcIlJlY2lwZVwiLFxuICAgIHNlcGFyYXRvcjogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwid2FyZUhvdXNlXCIsXG4gICAgaWNvbjogXCJmYWN0b3J5XCIsXG4gICAgdG86IFwiL2FkbWluL3dhcmVob3VzZVwiLFxuICAgIGxhYmVsOiBcIldhcmVob3VzZVwiLFxuICAgIHNlcGFyYXRvcjogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwic3RvcmVCcmFuY2hlc1wiLFxuICAgIGljb246IFwiZmEtc29saWQgZmEtc3RvcmVcIixcbiAgICB0bzogXCIvYWRtaW4vYnJhbmNoZXNcIixcbiAgICBsYWJlbDogXCJCcmFuY2hlc1wiLFxuICAgIHNlcGFyYXRvcjogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwicHJvZHVjdHNcIixcbiAgICBpY29uOiBcImZhLXNvbGlkIGZhLWNha2UtY2FuZGxlc1wiLFxuICAgIHRvOiBcIi9hZG1pbi9wcm9kdWN0c1wiLFxuICAgIGxhYmVsOiBcIlByb2R1Y3RzXCIsXG4gICAgc2VwYXJhdG9yOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJ1c2Vyc1wiLFxuICAgIGljb246IFwiZmEtc29saWQgZmEtdXNlcnNcIixcbiAgICB0bzogXCIvYWRtaW4vdXNlcnNcIixcbiAgICBsYWJlbDogXCJVc2Vyc1wiLFxuICAgIHNlcGFyYXRvcjogdHJ1ZSxcbiAgfSxcbl07XG5vbk1vdW50ZWQoKCkgPT4ge1xuICBjb25zdCBzdG9yZWRBY3RpdmVNZW51SXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYWN0aXZlTWVudUl0ZW1cIik7XG4gIGlmIChzdG9yZWRBY3RpdmVNZW51SXRlbSkge1xuICAgIGFjdGl2ZU1lbnVJdGVtLnZhbHVlID0gc3RvcmVkQWN0aXZlTWVudUl0ZW07XG4gIH1cbn0pO1xuXG4vLyBGdW5jdGlvbiB0byB1cGRhdGUgYWN0aXZlTWVudUl0ZW0gYW5kIHN0b3JlIGl0IGluIGxvY2FsU3RvcmFnZVxuY29uc3Qgc2V0QWN0aXZlTWVudUl0ZW0gPSAoaXRlbU5hbWUpID0+IHtcbiAgYWN0aXZlTWVudUl0ZW0udmFsdWUgPSBpdGVtTmFtZTtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJhY3RpdmVNZW51SXRlbVwiLCBpdGVtTmFtZSk7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5teS1tZW51LWxpbmsge1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQ6ICNlZjQ0NDQ7XG59XG4uYWNjb3VudC1jYXJkIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiA5OTk7IC8qIEVuc3VyZSB0aGUgY2FyZCBpcyBhYm92ZSBvdGhlciBlbGVtZW50cyAqL1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1REEsVUFBTSxPQUFPLElBQUksQ0FBQSxDQUFFO0FBQ25CLFVBQU0sVUFBVSxJQUFJLEtBQUs7QUFDekIsVUFBTSxTQUFTLFVBQVM7QUFDeEIsY0FBVSxZQUFZO0FBQ3BCLFVBQUk7QUFDRixjQUFNLFdBQVcsTUFBTSxJQUFJLElBQUksY0FBYztBQUM3QyxhQUFLLFFBQVEsU0FBUztBQUFBLE1BQ3ZCLFNBQVEsT0FBUDtBQUNBLGdCQUFRLE1BQU0sNkJBQTZCLEtBQUs7QUFBQSxNQUNqRDtBQUFBLElBQ0gsQ0FBQztBQUVELFVBQU0sVUFBVSxNQUFNO0FBQ3BCLGNBQVEsUUFBUTtBQUNoQixpQkFBVyxNQUFNO0FBQ2YscUJBQWEsV0FBVyxPQUFPO0FBQy9CLHFCQUFhLFdBQVcsTUFBTTtBQUM5QixnQkFBUSxRQUFRO0FBQ2hCLGVBQU8sS0FBSyxHQUFHO0FBQUEsTUFDaEIsR0FBRSxHQUFJO0FBQUEsSUFDVDtBQUVBLFVBQU0sb0JBQW9CLFNBQVMsTUFBTTtBQUN2QyxVQUFJLEtBQUssU0FBUyxLQUFLLE1BQU0sUUFBUSxLQUFLLE1BQU0sS0FBSyxNQUFNO0FBQ3pELGNBQU0sV0FBVyxLQUFLLE1BQU0sS0FBSztBQUNqQyxjQUFNLFFBQVEsU0FBUyxNQUFNLEdBQUc7QUFDaEMsY0FBTSxpQkFBaUIsTUFBTSxJQUFJLENBQUMsU0FBUztBQUN6QyxpQkFBTyxLQUFLLE9BQU8sQ0FBQyxFQUFFLFlBQVcsSUFBSyxLQUFLLE1BQU0sQ0FBQyxFQUFFO1FBQzFELENBQUs7QUFDRCxZQUFJLGVBQWUsU0FBUyxHQUFHO0FBQzdCLGdCQUFNLGNBQWMsS0FBSyxNQUFNLGVBQWUsU0FBUyxDQUFDO0FBQ3hELHlCQUFlLGVBQ2IsZUFBZSxhQUFhLE9BQU8sQ0FBQyxFQUFFLFlBQWEsSUFBRztBQUFBLFFBQ3pEO0FBQ0QsZUFBTyxlQUFlLEtBQUssR0FBRztBQUFBLE1BQ2xDLE9BQVM7QUFDTCxlQUFPO0FBQUEsTUFDUjtBQUFBLElBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQ0QsVUFBTSxjQUFjLElBQUksS0FBSztBQUM3QixVQUFNLGlCQUFpQixJQUFJLFdBQVc7QUFFdEMsVUFBTSxZQUFZO0FBQUEsTUFDaEI7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLElBQUk7QUFBQSxRQUNKLE9BQU87QUFBQSxRQUNQLFdBQVc7QUFBQSxNQUNaO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sSUFBSTtBQUFBLFFBQ0osT0FBTztBQUFBLFFBQ1AsV0FBVztBQUFBLE1BQ1o7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixJQUFJO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsTUFDWjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLElBQUk7QUFBQSxRQUNKLE9BQU87QUFBQSxRQUNQLFdBQVc7QUFBQSxNQUNaO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sSUFBSTtBQUFBLFFBQ0osT0FBTztBQUFBLFFBQ1AsV0FBVztBQUFBLE1BQ1o7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixJQUFJO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsTUFDWjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLElBQUk7QUFBQSxRQUNKLE9BQU87QUFBQSxRQUNQLFdBQVc7QUFBQSxNQUNaO0FBQUEsSUFDSDtBQUNBLGNBQVUsTUFBTTtBQUNkLFlBQU0sdUJBQXVCLGFBQWEsUUFBUSxnQkFBZ0I7QUFDbEUsVUFBSSxzQkFBc0I7QUFDeEIsdUJBQWUsUUFBUTtBQUFBLE1BQ3hCO0FBQUEsSUFDSCxDQUFDO0FBR0QsVUFBTSxvQkFBb0IsQ0FBQyxhQUFhO0FBQ3RDLHFCQUFlLFFBQVE7QUFDdkIsbUJBQWEsUUFBUSxrQkFBa0IsUUFBUTtBQUFBLElBQ2pEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
