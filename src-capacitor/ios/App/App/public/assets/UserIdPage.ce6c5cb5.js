import { _ as _export_sfc, bd as useRoute, H as useRouter, z as onMounted, t as reactive, o as openBlock, a4 as createElementBlock, J as createBaseVNode, a as createVNode, M as QBtn, w as withCtx, Q as QCard, I as QCardSection, $ as QAvatar, a0 as toDisplayString, a1 as createTextVNode, a5 as Fragment, a6 as renderList, c as createBlock, L as QIcon, O as pushScopeId, R as popScopeId } from "./index.9b9dbcba.js";
import { Q as QChip } from "./QChip.d5fc407c.js";
import { Q as QItem, a as QItemSection } from "./QItem.79579b05.js";
import { Q as QList } from "./QList.8d472d75.js";
import { u as useUsersStore } from "./user.9d8bff14.js";
import "./axios.91431b0b.js";
var UserIdPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-d6a0075a"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "q-pa-md" };
const _hoisted_2 = { class: "q-ma-md" };
const _hoisted_3 = { class: "user-profile-page q-pa-md" };
const _hoisted_4 = { class: "row q-col-gutter-md" };
const _hoisted_5 = { class: "col-12 col-md-4" };
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("img", {
  src: "https://cdn.quasar.dev/img/boy-avatar.png",
  alt: "Profile Picture"
}, null, -1));
const _hoisted_7 = { align: "center" };
const _hoisted_8 = { class: "text-h5 text-center" };
const _hoisted_9 = { class: "text-subtitle2 text-center q-mb-md" };
const _hoisted_10 = { align: "center" };
const _hoisted_11 = { class: "col-12 col-md-8" };
const _hoisted_12 = { class: "row q-col-gutter-md" };
const _hoisted_13 = { class: "col-12" };
const _hoisted_14 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "My Schedule", -1));
const _hoisted_15 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, "Active account:", -1));
const _hoisted_16 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, "Blocked account:", -1));
const _hoisted_17 = { class: "col-12" };
const _hoisted_18 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "My Bills", -1));
const _sfc_main = {
  __name: "UserIdPage",
  setup(__props) {
    const route = useRoute();
    useRouter();
    const userData = useUsersStore();
    console.log("Page user ID", route.params.user_id);
    const getUserData = async () => {
      const userId = route.params.user_id;
      const response = await userData.fetchUserById(userId);
      console.log("UserData", response);
    };
    onMounted(() => {
      getUserData();
    });
    const user = reactive({
      name: "John Mash Doe",
      position: "Super Admin",
      email: "john.doe123@gmail.com",
      phone: "+(63) 111 - 111 - 1111",
      address: "Street 123",
      accounts: {
        active: "9844 5600 8234 4256",
        blocked: "9844 5600 8234 1234"
      },
      bills: [
        { id: 1, name: "Monthly Bill", paid: true },
        { id: 2, name: "Monthly Bill", paid: false },
        { id: 3, name: "Monthly Bill", paid: true },
        { id: 4, name: "Monthly Bill", paid: false }
      ]
    });
    function saveProfile() {
      console.log("Profile saved:", user);
    }
    function blockAccount(accountType) {
      console.log(`Block ${accountType} account`);
    }
    function unlockAccount(accountType) {
      console.log(`Unlock ${accountType} account`);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(QBtn, {
            flat: "",
            dense: "",
            icon: "arrow_back_ios",
            rounded: "",
            to: "/admin/users"
          })
        ]),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("div", _hoisted_5, [
              createVNode(QCard, { class: "profile-card q-pa-md" }, {
                default: withCtx(() => [
                  createVNode(QCardSection, { class: "row items-center justify-center" }, {
                    default: withCtx(() => [
                      createVNode(QAvatar, { size: "100px" }, {
                        default: withCtx(() => [
                          _hoisted_6
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_7, [
                        createBaseVNode("div", _hoisted_8, toDisplayString(user.name), 1),
                        createBaseVNode("div", _hoisted_9, toDisplayString(user.email), 1),
                        createVNode(QChip, {
                          "text-color": "white",
                          color: "negative"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(user.position), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode(QList, { separator: "" }, {
                        default: withCtx(() => [
                          createVNode(QItem, null, {
                            default: withCtx(() => [
                              createVNode(QItemSection, null, {
                                default: withCtx(() => [
                                  createTextVNode("Phone:")
                                ]),
                                _: 1
                              }),
                              createVNode(QItemSection, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(user.phone), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(QItem, null, {
                            default: withCtx(() => [
                              createVNode(QItemSection, null, {
                                default: withCtx(() => [
                                  createTextVNode("Address:")
                                ]),
                                _: 1
                              }),
                              createVNode(QItemSection, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(user.address), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createBaseVNode("div", _hoisted_10, [
                        createVNode(QBtn, {
                          label: "Edit Profile",
                          color: "primary",
                          class: "q-mt-md",
                          onClick: saveProfile
                        })
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            createBaseVNode("div", _hoisted_11, [
              createBaseVNode("div", _hoisted_12, [
                createBaseVNode("div", _hoisted_13, [
                  createVNode(QCard, { class: "account-card q-pa-md" }, {
                    default: withCtx(() => [
                      createVNode(QCardSection, null, {
                        default: withCtx(() => [
                          _hoisted_14
                        ]),
                        _: 1
                      }),
                      createVNode(QList, { separator: "" }, {
                        default: withCtx(() => [
                          createVNode(QItem, null, {
                            default: withCtx(() => [
                              createVNode(QItemSection, null, {
                                default: withCtx(() => [
                                  _hoisted_15,
                                  createBaseVNode("div", null, toDisplayString(user.accounts.active), 1)
                                ]),
                                _: 1
                              }),
                              createVNode(QItemSection, { side: "" }, {
                                default: withCtx(() => [
                                  createVNode(QBtn, {
                                    flat: "",
                                    label: "Block Account",
                                    color: "negative",
                                    onClick: _cache[0] || (_cache[0] = ($event) => blockAccount("active"))
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(QItem, null, {
                            default: withCtx(() => [
                              createVNode(QItemSection, null, {
                                default: withCtx(() => [
                                  _hoisted_16,
                                  createBaseVNode("div", null, toDisplayString(user.accounts.blocked), 1)
                                ]),
                                _: 1
                              }),
                              createVNode(QItemSection, { side: "" }, {
                                default: withCtx(() => [
                                  createVNode(QBtn, {
                                    flat: "",
                                    label: "Unlock Account",
                                    color: "positive",
                                    onClick: _cache[1] || (_cache[1] = ($event) => unlockAccount("blocked"))
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
                ]),
                createBaseVNode("div", _hoisted_17, [
                  createVNode(QCard, { class: "bills-card q-pa-md" }, {
                    default: withCtx(() => [
                      createVNode(QCardSection, null, {
                        default: withCtx(() => [
                          _hoisted_18
                        ]),
                        _: 1
                      }),
                      createVNode(QList, { separator: "" }, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(user.bills, (bill) => {
                            return openBlock(), createBlock(QItem, {
                              key: bill.id
                            }, {
                              default: withCtx(() => [
                                createVNode(QItemSection, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(bill.name), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(QItemSection, { side: "" }, {
                                  default: withCtx(() => [
                                    createVNode(QIcon, {
                                      name: bill.paid ? "check_circle" : "cancel",
                                      color: bill.paid ? "green" : "red"
                                    }, null, 8, ["name", "color"]),
                                    createVNode(QBtn, {
                                      flat: "",
                                      label: bill.paid ? "Bill Paid" : "Not Paid",
                                      color: "primary"
                                    }, null, 8, ["label"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ])
              ])
            ])
          ])
        ])
      ]);
    };
  }
};
var UserIdPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d6a0075a"], ["__file", "UserIdPage.vue"]]);
export { UserIdPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcklkUGFnZS5jZTZjNWNiNS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvdXNlcnMvaWQvVXNlcklkUGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwicS1wYS1tZFwiPlxuICAgIDxkaXYgY2xhc3M9XCJxLW1hLW1kXCI+XG4gICAgICA8cS1idG4gZmxhdCBkZW5zZSBpY29uPVwiYXJyb3dfYmFja19pb3NcIiByb3VuZGVkIHRvPVwiL2FkbWluL3VzZXJzXCIgLz5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidXNlci1wcm9maWxlLXBhZ2UgcS1wYS1tZFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWNvbC1ndXR0ZXItbWRcIj5cbiAgICAgICAgPCEtLSBMZWZ0IENvbHVtbjogUHJvZmlsZSBDYXJkIC0tPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTEyIGNvbC1tZC00XCI+XG4gICAgICAgICAgPHEtY2FyZCBjbGFzcz1cInByb2ZpbGUtY2FyZCBxLXBhLW1kXCI+XG4gICAgICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgIDxxLWF2YXRhciBzaXplPVwiMTAwcHhcIj5cbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBzcmM9XCJodHRwczovL2Nkbi5xdWFzYXIuZGV2L2ltZy9ib3ktYXZhdGFyLnBuZ1wiXG4gICAgICAgICAgICAgICAgICBhbHQ9XCJQcm9maWxlIFBpY3R1cmVcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvcS1hdmF0YXI+XG4gICAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgICA8ZGl2IGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDUgdGV4dC1jZW50ZXJcIj57eyB1c2VyLm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1zdWJ0aXRsZTIgdGV4dC1jZW50ZXIgcS1tYi1tZFwiPlxuICAgICAgICAgICAgICAgICAge3sgdXNlci5lbWFpbCB9fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxxLWNoaXAgdGV4dC1jb2xvcj1cIndoaXRlXCIgY29sb3I9XCJuZWdhdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAge3sgdXNlci5wb3NpdGlvbiB9fVxuICAgICAgICAgICAgICAgIDwvcS1jaGlwPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtbGlzdCBzZXBhcmF0b3I+XG4gICAgICAgICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5QaG9uZTo8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPnt7IHVzZXIucGhvbmUgfX08L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0+XG4gICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+QWRkcmVzczo8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPnt7IHVzZXIuYWRkcmVzcyB9fTwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICAgICAgICA8ZGl2IGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgICBsYWJlbD1cIkVkaXQgUHJvZmlsZVwiXG4gICAgICAgICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJxLW10LW1kXCJcbiAgICAgICAgICAgICAgICAgIEBjbGljaz1cInNhdmVQcm9maWxlXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgPC9xLWNhcmQ+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwhLS0gUmlnaHQgQ29sdW1uOiBBY2NvdW50cyBhbmQgQmlsbHMgQ2FyZHMgLS0+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTIgY29sLW1kLThcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtY29sLWd1dHRlci1tZFwiPlxuICAgICAgICAgICAgPCEtLSBNeSBTY2hlZHVsZSBDYXJkIC0tPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICA8cS1jYXJkIGNsYXNzPVwiYWNjb3VudC1jYXJkIHEtcGEtbWRcIj5cbiAgICAgICAgICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPk15IFNjaGVkdWxlPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8cS1saXN0IHNlcGFyYXRvcj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2PkFjdGl2ZSBhY2NvdW50OjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXY+e3sgdXNlci5hY2NvdW50cy5hY3RpdmUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIHNpZGU+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIkJsb2NrIEFjY291bnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJibG9ja0FjY291bnQoJ2FjdGl2ZScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgICA8cS1pdGVtPlxuICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj5CbG9ja2VkIGFjY291bnQ6PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj57eyB1c2VyLmFjY291bnRzLmJsb2NrZWQgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIHNpZGU+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIlVubG9jayBBY2NvdW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwicG9zaXRpdmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwidW5sb2NrQWNjb3VudCgnYmxvY2tlZCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgPC9xLWxpc3Q+XG4gICAgICAgICAgICAgIDwvcS1jYXJkPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwhLS0gQmlsbHMgQ2FyZCAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgPHEtY2FyZCBjbGFzcz1cImJpbGxzLWNhcmQgcS1wYS1tZFwiPlxuICAgICAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+TXkgQmlsbHM8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxxLWxpc3Qgc2VwYXJhdG9yPlxuICAgICAgICAgICAgICAgICAgPHEtaXRlbSB2LWZvcj1cImJpbGwgaW4gdXNlci5iaWxsc1wiIDprZXk9XCJiaWxsLmlkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj57eyBiaWxsLm5hbWUgfX08L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gc2lkZT5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1pY29uXG4gICAgICAgICAgICAgICAgICAgICAgICA6bmFtZT1cImJpbGwucGFpZCA/ICdjaGVja19jaXJjbGUnIDogJ2NhbmNlbCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOmNvbG9yPVwiYmlsbC5wYWlkID8gJ2dyZWVuJyA6ICdyZWQnXCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgICAgICAgICAgOmxhYmVsPVwiYmlsbC5wYWlkID8gJ0JpbGwgUGFpZCcgOiAnTm90IFBhaWQnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBvbk1vdW50ZWQsIHJlYWN0aXZlIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgdXNlUm91dGUsIHVzZVJvdXRlciB9IGZyb20gXCJ2dWUtcm91dGVyXCI7XG5pbXBvcnQgeyBMb2FkaW5nIH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgdXNlVXNlcnNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3VzZXJcIjtcblxuY29uc3Qgcm91dGUgPSB1c2VSb3V0ZSgpO1xuY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5jb25zdCB1c2VyRGF0YSA9IHVzZVVzZXJzU3RvcmUoKTtcblxuY29uc29sZS5sb2coXCJQYWdlIHVzZXIgSURcIiwgcm91dGUucGFyYW1zLnVzZXJfaWQpO1xuXG5jb25zdCBnZXRVc2VyRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgdXNlcklkID0gcm91dGUucGFyYW1zLnVzZXJfaWQ7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB1c2VyRGF0YS5mZXRjaFVzZXJCeUlkKHVzZXJJZCk7XG4gIGNvbnNvbGUubG9nKFwiVXNlckRhdGFcIiwgcmVzcG9uc2UpO1xufTtcbm9uTW91bnRlZCgoKSA9PiB7XG4gIGdldFVzZXJEYXRhKCk7XG59KTtcblxuY29uc3QgdXNlciA9IHJlYWN0aXZlKHtcbiAgbmFtZTogXCJKb2huIE1hc2ggRG9lXCIsXG4gIHBvc2l0aW9uOiBcIlN1cGVyIEFkbWluXCIsXG4gIGVtYWlsOiBcImpvaG4uZG9lMTIzQGdtYWlsLmNvbVwiLFxuICBwaG9uZTogXCIrKDYzKSAxMTEgLSAxMTEgLSAxMTExXCIsXG4gIGFkZHJlc3M6IFwiU3RyZWV0IDEyM1wiLFxuICBhY2NvdW50czoge1xuICAgIGFjdGl2ZTogXCI5ODQ0IDU2MDAgODIzNCA0MjU2XCIsXG4gICAgYmxvY2tlZDogXCI5ODQ0IDU2MDAgODIzNCAxMjM0XCIsXG4gIH0sXG4gIGJpbGxzOiBbXG4gICAgeyBpZDogMSwgbmFtZTogXCJNb250aGx5IEJpbGxcIiwgcGFpZDogdHJ1ZSB9LFxuICAgIHsgaWQ6IDIsIG5hbWU6IFwiTW9udGhseSBCaWxsXCIsIHBhaWQ6IGZhbHNlIH0sXG4gICAgeyBpZDogMywgbmFtZTogXCJNb250aGx5IEJpbGxcIiwgcGFpZDogdHJ1ZSB9LFxuICAgIHsgaWQ6IDQsIG5hbWU6IFwiTW9udGhseSBCaWxsXCIsIHBhaWQ6IGZhbHNlIH0sXG4gIF0sXG59KTtcblxuZnVuY3Rpb24gc2F2ZVByb2ZpbGUoKSB7XG4gIGNvbnNvbGUubG9nKFwiUHJvZmlsZSBzYXZlZDpcIiwgdXNlcik7XG59XG5cbmZ1bmN0aW9uIGJsb2NrQWNjb3VudChhY2NvdW50VHlwZSkge1xuICBjb25zb2xlLmxvZyhgQmxvY2sgJHthY2NvdW50VHlwZX0gYWNjb3VudGApO1xufVxuXG5mdW5jdGlvbiB1bmxvY2tBY2NvdW50KGFjY291bnRUeXBlKSB7XG4gIGNvbnNvbGUubG9nKGBVbmxvY2sgJHthY2NvdW50VHlwZX0gYWNjb3VudGApO1xufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4uZWxlZ2FudC1jb250YWluZXIge1xuICBiYWNrZ3JvdW5kOiAjZjlmOWY5O1xuICBwYWRkaW5nOiAycmVtO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGNvbG9yOiAjMzMzO1xufVxuLnVzZXItcHJvZmlsZS1wYWdlIHtcbiAgbWF4LXdpZHRoOiAxMjAwcHg7XG4gIG1hcmdpbjogYXV0bztcbn1cblxuLnByb2ZpbGUtY2FyZCxcbi5hY2NvdW50LWNhcmQsXG4uYmlsbHMtY2FyZCB7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjA1KTtcbn1cblxuLnByb2ZpbGUtY2FyZCBxLWNhcmQtc2VjdGlvbjpmaXJzdC1jaGlsZCB7XG4gIG1hcmdpbi10b3A6IDFyZW07XG59XG5cbi5xLWxpc3QgcS1pdGVtIHtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogMXJlbSAwLjVyZW07XG59XG5cbi5xLWxpc3QgcS1pdGVtOm5vdCg6bGFzdC1jaGlsZCkge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2UwZTBlMDtcbn1cblxuLnEtbGlzdCBxLWl0ZW0tc2VjdGlvbiB7XG4gIGNvbG9yOiAjNjY2O1xuICBmb250LXNpemU6IDAuOXJlbTtcbn1cblxuLnEtbGlzdCBxLWl0ZW0tc2VjdGlvbjpmaXJzdC1jaGlsZCB7XG4gIGZsZXg6IDEgMSBhdXRvO1xufVxuXG4ucS1saXN0IHEtaXRlbS1zZWN0aW9uW3NpZGVdIHtcbiAgZmxleDogMCAwIGF1dG87XG59XG5cbi5xLWJ0biB7XG4gIG1pbi13aWR0aDogOTBweDtcbn1cblxuLnEtYnRuW2ZsYXRdIHtcbiAgcGFkZGluZzogMCA4cHg7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUlBLFVBQU0sUUFBUSxTQUFRO0FBQ1AsY0FBWTtBQUMzQixVQUFNLFdBQVcsY0FBYTtBQUU5QixZQUFRLElBQUksZ0JBQWdCLE1BQU0sT0FBTyxPQUFPO0FBRWhELFVBQU0sY0FBYyxZQUFZO0FBQzlCLFlBQU0sU0FBUyxNQUFNLE9BQU87QUFFNUIsWUFBTSxXQUFXLE1BQU0sU0FBUyxjQUFjLE1BQU07QUFDcEQsY0FBUSxJQUFJLFlBQVksUUFBUTtBQUFBLElBQ2xDO0FBQ0EsY0FBVSxNQUFNO0FBQ2Q7SUFDRixDQUFDO0FBRUQsVUFBTSxPQUFPLFNBQVM7QUFBQSxNQUNwQixNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxVQUFVO0FBQUEsUUFDUixRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUEsTUFDVjtBQUFBLE1BQ0QsT0FBTztBQUFBLFFBQ0wsRUFBRSxJQUFJLEdBQUcsTUFBTSxnQkFBZ0IsTUFBTSxLQUFNO0FBQUEsUUFDM0MsRUFBRSxJQUFJLEdBQUcsTUFBTSxnQkFBZ0IsTUFBTSxNQUFPO0FBQUEsUUFDNUMsRUFBRSxJQUFJLEdBQUcsTUFBTSxnQkFBZ0IsTUFBTSxLQUFNO0FBQUEsUUFDM0MsRUFBRSxJQUFJLEdBQUcsTUFBTSxnQkFBZ0IsTUFBTSxNQUFPO0FBQUEsTUFDN0M7QUFBQSxJQUNILENBQUM7QUFFRCxhQUFTLGNBQWM7QUFDckIsY0FBUSxJQUFJLGtCQUFrQixJQUFJO0FBQUEsSUFDcEM7QUFFQSxhQUFTLGFBQWEsYUFBYTtBQUNqQyxjQUFRLElBQUksU0FBUyxxQkFBcUI7QUFBQSxJQUM1QztBQUVBLGFBQVMsY0FBYyxhQUFhO0FBQ2xDLGNBQVEsSUFBSSxVQUFVLHFCQUFxQjtBQUFBLElBQzdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
