import { _ as _export_sfc, bf as useRoute, H as useRouter, n as ref, z as onMounted, t as reactive, u as watch, o as openBlock, c as createBlock, w as withCtx, a as createVNode, Q as QCard, J as createBaseVNode, I as QCardSection, af as withDirectives, M as QBtn, K as QInput, aK as QCardActions, bg as unref, a3 as QDialog, S as pushScopeId, T as popScopeId, g as computed, a4 as createElementBlock, a1 as QAvatar, R as toDisplayString, L as QIcon, O as createTextVNode, be as createCommentVNode, P as Plugin } from "./index.c8e2405b.js";
import { Q as QList } from "./QList.d5d13fac.js";
import { Q as QPopupEdit } from "./QPopupEdit.5c11c937.js";
import { Q as QSelect, a as QChip } from "./QSelect.0985e28e.js";
import { Q as QItem, a as QItemSection } from "./QItem.76557ad9.js";
import { u as useQuasar } from "./use-quasar.84d8ad03.js";
import { Q as QPopupProxy } from "./QPopupProxy.210a8994.js";
import { u as useUsersStore } from "./user.9d28a441.js";
import { C as ClosePopup } from "./ClosePopup.649d85d8.js";
import { u as useDialogPluginComponent } from "./use-dialog-plugin-component.6a9886de.js";
import { u as useBranchesStore } from "./branch.9a956ff2.js";
import "./QMenu.4f670399.js";
import "./selection.94057980.js";
import "./rtl.b1b38f21.js";
import "./use-virtual-scroll.5b4ab88d.js";
import "./axios.aa1bce92.js";
import "./warehouse.f8473ccb.js";
import "./employee.08e2bc37.js";
var UserEditDialog_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$3 = (n) => (pushScopeId("data-v-1eb9e4ba"), n = n(), popScopeId(), n);
const _hoisted_1$3 = { class: "row justify-between" };
const _hoisted_2$3 = { class: "row justify-between" };
const _hoisted_3$3 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h4 text-weight-light" }, "Edit Employee Profile", -1));
const _hoisted_4$3 = { class: "q-gutter-y-sm" };
const _hoisted_5$3 = { class: "row q-gutter-x-sm item-start" };
const _hoisted_6$3 = { class: "row q-gutter-x-md" };
const _hoisted_7$3 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "Designation", -1));
const _hoisted_8$3 = { class: "row q-gutter-x-md" };
const _sfc_main$3 = {
  __name: "UserEditDialog",
  props: ["userData"],
  emits: ["user", "hide", "ok", "cancel"],
  setup(__props, { emit: __emit }) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
    useRoute();
    useRouter();
    const userStore = useUsersStore();
    const branchesStore = useBranchesStore();
    const branchOptions = ref([]);
    const filterBranchOptions = ref(branchOptions.value);
    ref(true);
    const dialog = ref(false);
    const props = __props;
    console.log("userDialogdata", props.userData);
    const localUserData = ref({ ...props.userData });
    console.log("localUserData", localUserData);
    const genderOptions = ["Male", "Female"];
    const statusOptions = ["Current", "Former"];
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
    const valididateTime = (val) => {
      const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
      return timeRegex.test(val) || "Invalid time format";
    };
    const formatTimeFromDB = (dateString) => {
      const dateObj = new Date(`1970-01-01T${dateString}`);
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      };
      return dateObj.toLocaleTimeString(void 0, options);
    };
    const formatDateFromDB = (dateTimeString) => {
      if (!dateTimeString)
        return "";
      const dateObj = new Date(dateTimeString);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    const editUserForm = reactive({
      fullname: "",
      user_address: "",
      user_birthdate: "",
      user_sex: "",
      user_status: "",
      user_phone_number: "",
      user_position: "",
      user_branch_name: "",
      user_time_shift: ""
    });
    watch(
      () => props.userData,
      (newVal) => {
        if (newVal) {
          localUserData.value = { ...newVal };
          console.log("update data", localUserData.value);
          editUserForm.fullname = localUserData.value.name;
          editUserForm.user_address = localUserData.value.address;
          editUserForm.user_birthdate = formatDateFromDB(
            localUserData.value.birthdate
          );
          editUserForm.user_sex = localUserData.value.sex;
          editUserForm.user_status = localUserData.value.status;
          editUserForm.user_phone_number = localUserData.value.phone;
          editUserForm.user_position = localUserData.value.role;
          editUserForm.user_branch_name = localUserData.value.branch_employee.branch.name;
          editUserForm.user_time_shift = formatTimeFromDB(
            localUserData.value.branch_employee.time_shift
          );
        }
      },
      { immediate: true }
    );
    const handleSaveEdit = async () => {
      try {
        const editedUserData = {
          name: editUserForm.fullname,
          address: editUserForm.user_address,
          birthdate: editUserForm.user_birthdate,
          sex: editUserForm.user_sex,
          status: editUserForm.user_status,
          phone: editUserForm.user_phone_number,
          role: editUserForm.user_position,
          branch_id: editUserForm.user_branch_name.value || localUserData.value.branch_employee.branch.id,
          time_shift: editUserForm.user_time_shift
        };
        console.log("Saving user data:", editedUserData);
        await userStore.updateUser(props.userData.id, editedUserData);
        const userId = props.userData.id;
        const userRes = await userStore.fetchUserById(userId);
        dialog.value = false;
        clearForm();
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    };
    const clearForm = () => {
      editUserForm.fullname = "";
      editUserForm.user_address = "";
      editUserForm.user_birthdate = "";
      editUserForm.user_sex = "";
      editUserForm.user_status = "";
      editUserForm.user_phone_number = "";
      editUserForm.user_position = "";
      editUserForm.user_branch_name = "";
      editUserForm.user_time_shift = "";
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QDialog, {
        ref_key: "dialogRef",
        ref: dialogRef,
        modelValue: dialog.value,
        "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => dialog.value = $event),
        onHide: unref(onDialogHide),
        onOk: _ctx.handleSave,
        onCancel: unref(onDialogCancel)
      }, {
        default: withCtx(() => [
          createVNode(QCard, { class: "q-pa-sm" }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1$3, [
                createBaseVNode("div", null, [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_2$3, [
                        _hoisted_3$3,
                        createBaseVNode("div", null, [
                          withDirectives(createVNode(QBtn, {
                            icon: "close",
                            flat: "",
                            dense: "",
                            round: ""
                          }, null, 512), [
                            [ClosePopup]
                          ])
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_4$3, [
                        createVNode(QInput, {
                          modelValue: editUserForm.fullname,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => editUserForm.fullname = $event),
                          class: "text-capitalize",
                          outlined: "",
                          dense: "",
                          label: "Full Name",
                          rules: [(val) => val && val.length > 0 || "Required"]
                        }, null, 8, ["modelValue", "rules"]),
                        createVNode(QInput, {
                          modelValue: editUserForm.user_address,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => editUserForm.user_address = $event),
                          class: "text-capitalize",
                          outlined: "",
                          dense: "",
                          label: "Address",
                          rules: [(val) => val && val.length > 0 || "Required"]
                        }, null, 8, ["modelValue", "rules"]),
                        createBaseVNode("div", _hoisted_5$3, [
                          createVNode(QInput, {
                            modelValue: editUserForm.user_birthdate,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => editUserForm.user_birthdate = $event),
                            outlined: "",
                            dense: "",
                            label: "Birthdate",
                            type: "date",
                            hint: "mm/dd/yyyy",
                            style: { "width": "230px" },
                            rules: [(val) => val && val.length > 0 || "Required"]
                          }, null, 8, ["modelValue", "rules"]),
                          createVNode(QSelect, {
                            modelValue: editUserForm.user_sex,
                            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => editUserForm.user_sex = $event),
                            dense: "",
                            outlined: "",
                            label: "Sex",
                            options: genderOptions,
                            rules: [(val) => val && val.length > 0 || "Required"],
                            style: { "width": "120px" },
                            behavior: "menu",
                            "hide-dropdown-icon": ""
                          }, null, 8, ["modelValue", "rules"]),
                          createVNode(QSelect, {
                            modelValue: editUserForm.user_status,
                            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => editUserForm.user_status = $event),
                            options: statusOptions,
                            dense: "",
                            outlined: "",
                            "hide-dropdown-icon": "",
                            label: "Status",
                            style: { "width": "100px" },
                            rules: [(val) => val && val.length > 0 || "Required"],
                            behavior: "menu"
                          }, null, 8, ["modelValue", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_6$3, [
                          createVNode(QInput, {
                            modelValue: editUserForm.user_phone_number,
                            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => editUserForm.user_phone_number = $event),
                            outlined: "",
                            dense: "",
                            label: "Phone Number",
                            mask: "+(63) ### - ### - ####",
                            placeholder: "(+63) ### - ### - ####",
                            rules: [(val) => val && val.length > 0 || "Required"],
                            style: { "width": "300px", "max-width": "500px", "min-width": "100px" }
                          }, null, 8, ["modelValue", "rules"]),
                          createVNode(QSelect, {
                            modelValue: editUserForm.user_position,
                            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => editUserForm.user_position = $event),
                            outlined: "",
                            dense: "",
                            "hide-dropdown-icon": "",
                            label: "Position",
                            options: positionOptions,
                            rules: [(val) => val && val.length > 0 || "Required"],
                            style: { "width": "150px", "max-width": "500px", "min-width": "100px" }
                          }, null, 8, ["modelValue", "rules"])
                        ]),
                        _hoisted_7$3,
                        createBaseVNode("div", _hoisted_8$3, [
                          createVNode(QSelect, {
                            modelValue: editUserForm.user_branch_name,
                            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => editUserForm.user_branch_name = $event),
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
                          }, null, 8, ["modelValue", "options"]),
                          createVNode(QInput, {
                            modelValue: editUserForm.user_time_shift,
                            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => editUserForm.user_time_shift = $event),
                            outlined: "",
                            flat: "",
                            dense: "",
                            mask: "##:## AA",
                            label: "Time Schedule",
                            rules: valididateTime,
                            hint: "Format: 01:00 AM/PM",
                            style: { "width": "200px", "max-width": "500px", "min-width": "100px" }
                          }, null, 8, ["modelValue"])
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(QCardActions, {
                    class: "row q-px-lg q-py-sm q-pt-none",
                    align: "right"
                  }, {
                    default: withCtx(() => [
                      withDirectives(createVNode(QBtn, {
                        class: "glossy",
                        color: "grey-9",
                        label: "Cancel"
                      }, null, 512), [
                        [ClosePopup]
                      ]),
                      createVNode(QBtn, {
                        class: "glossy",
                        color: "teal",
                        label: "Save",
                        onClick: handleSaveEdit
                      })
                    ]),
                    _: 1
                  })
                ])
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue", "onHide", "onOk", "onCancel"]);
    };
  }
};
var UserEditDialog = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-1eb9e4ba"], ["__file", "UserEditDialog.vue"]]);
var UserProfileCard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-10c42800"), n = n(), popScopeId(), n);
const _hoisted_1$2 = { key: 0 };
const _hoisted_2$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("img", {
  src: "https://cdn.quasar.dev/img/boy-avatar.png",
  alt: "Profile Picture"
}, null, -1));
const _hoisted_3$2 = { align: "center" };
const _hoisted_4$2 = { class: "text-h5 text-center" };
const _hoisted_5$2 = { class: "text-subtitle2 text-center q-mb-md" };
const _hoisted_6$2 = { class: "email-container" };
const _hoisted_7$2 = { class: "email-text" };
const _hoisted_8$2 = { align: "center" };
const _sfc_main$2 = {
  __name: "UserProfileCard",
  setup(__props) {
    const route = useRoute();
    useRouter();
    const userStore = useUsersStore();
    const user = computed(() => userStore.user);
    console.log("Page user ID", route.params.user_id);
    const getUserData = async () => {
      try {
        Plugin.show();
        const userId = route.params.user_id;
        const userRes = await userStore.fetchUserById(userId);
        console.log("Fetched User Data:", user.value);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        Plugin.hide();
      }
    };
    onMounted(() => {
      getUserData();
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
    const $q = useQuasar();
    const handleDialog = (userData) => {
      $q.dialog({
        component: UserEditDialog,
        componentProps: {
          userData
        }
      });
    };
    const formatTimeFromDB = (timeString) => {
      const [hours, minutes] = timeString.split(":");
      let hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12 || 12;
      return `${String(hour).padStart(2, "0")}:${minutes} ${ampm}`;
    };
    const editEmail = () => {
      QPopupProxy.show({
        ref: "emailPopup"
      });
    };
    return (_ctx, _cache) => {
      return user.value && user.value.branch_employee ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
        createVNode(QCard, { class: "profile-card q-pa-md" }, {
          default: withCtx(() => [
            createVNode(QCardSection, { class: "row items-center justify-center" }, {
              default: withCtx(() => [
                createVNode(QAvatar, { size: "100px" }, {
                  default: withCtx(() => [
                    _hoisted_2$2
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_3$2, [
                  createBaseVNode("div", _hoisted_4$2, toDisplayString(user.value.name), 1),
                  createBaseVNode("div", _hoisted_5$2, [
                    createBaseVNode("div", _hoisted_6$2, [
                      createVNode(QPopupEdit, {
                        modelValue: user.value.email,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => user.value.email = $event),
                        title: "Edit Email",
                        buttons: "",
                        persistent: "",
                        "auto-save": "",
                        fit: "",
                        onSave: _ctx.onSave,
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
                            borderless: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onSave"]),
                      createBaseVNode("div", {
                        class: "email-display",
                        onClick: editEmail
                      }, [
                        createBaseVNode("span", _hoisted_7$2, toDisplayString(user.value.email), 1),
                        createVNode(QIcon, {
                          name: "edit",
                          size: "sm",
                          class: "edit-icon text-primary"
                        })
                      ])
                    ])
                  ]),
                  createVNode(QChip, {
                    "text-color": "white",
                    color: getBadgePositionColor(user.value.role)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(user.value.role), 1)
                    ]),
                    _: 1
                  }, 8, ["color"])
                ]),
                createVNode(QList, { separator: "" }, {
                  default: withCtx(() => [
                    createVNode(QItem, null, {
                      default: withCtx(() => [
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [
                            createTextVNode("Designation:")
                          ]),
                          _: 1
                        }),
                        createVNode(QItemSection, null, {
                          default: withCtx(() => {
                            var _a;
                            return [
                              createTextVNode(toDisplayString((_a = user.value.branch_employee.branch) == null ? void 0 : _a.name), 1)
                            ];
                          }),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(QItem, null, {
                      default: withCtx(() => [
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [
                            createTextVNode("Time Shift:")
                          ]),
                          _: 1
                        }),
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(formatTimeFromDB(user.value.branch_employee.time_shift)), 1)
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
                            createTextVNode("Phone:")
                          ]),
                          _: 1
                        }),
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(user.value.phone), 1)
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
                            createTextVNode(toDisplayString(user.value.address), 1)
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
                            createTextVNode("Employment Status:")
                          ]),
                          _: 1
                        }),
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(`${user.value.status} ${user.value.role}`), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createBaseVNode("div", _hoisted_8$2, [
                  createVNode(QBtn, {
                    label: "Edit Profile",
                    color: "positive",
                    class: "q-mt-md",
                    onClick: _cache[1] || (_cache[1] = ($event) => handleDialog(user.value))
                  })
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ])) : createCommentVNode("", true);
    };
  }
};
var UserProfileCard = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-10c42800"], ["__file", "UserProfileCard.vue"]]);
var UserPaySlipCard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-5009f40a"), n = n(), popScopeId(), n);
const _hoisted_1$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "row justify-between" }, [
  /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Pay Slip"),
  /* @__PURE__ */ createBaseVNode("div", null, [
    /* @__PURE__ */ createBaseVNode("div", { class: "text-caption text-weight-light" }, " Period Start Date: Aug. 11, 2024 "),
    /* @__PURE__ */ createBaseVNode("div", { class: "text-caption text-weight-light" }, " Period Ending Date: Aug. 25, 2024 "),
    /* @__PURE__ */ createBaseVNode("div", { class: "text-caption text-weight-light" }, " Payroll Date: Sept. 05, 2024 ")
  ])
], -1));
const _hoisted_2$1 = { class: "row q-gutter-md justify-between" };
const _hoisted_3$1 = { class: "col-5" };
const _hoisted_4$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h7" }, "Earnings Summary", -1));
const _hoisted_5$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Regular Pay:", -1));
const _hoisted_6$1 = { class: "text-right" };
const _hoisted_7$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Overtime Pay:", -1));
const _hoisted_8$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-right" }, "\u20B1120.00", -1));
const _hoisted_9$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Holiday Pay:", -1));
const _hoisted_10$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-right" }, "\u20B1160.00", -1));
const _hoisted_11 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "COLA:", -1));
const _hoisted_12 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-right" }, "\u20B1160.00", -1));
const _hoisted_13 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Night Differential:", -1));
const _hoisted_14 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-right" }, "\u20B1160.00", -1));
const _hoisted_15 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Daily Allowance:", -1));
const _hoisted_16 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-right" }, "\u20B1160.00", -1));
const _hoisted_17 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Quota Over/ Over Time:", -1));
const _hoisted_18 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-right" }, "\u20B1160.00", -1));
const _hoisted_19 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Other INC./ Adjustment:", -1));
const _hoisted_20 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-right" }, "\u20B1160.00", -1));
const _hoisted_21 = { class: "col-5" };
const _hoisted_22 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h7" }, "Deductions Summary", -1));
const _hoisted_23 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "New Credits:", -1));
const _hoisted_24 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-right" }, "\u20B1200.00", -1));
const _hoisted_25 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Prev Credits:", -1));
const _hoisted_26 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-right" }, "\u20B1200.00", -1));
const _hoisted_27 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Uniform:", -1));
const _hoisted_28 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-right" }, "\u20B1200.00", -1));
const _hoisted_29 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Penalty:", -1));
const _hoisted_30 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-right" }, "\u20B1200.00", -1));
const _hoisted_31 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Cash Advance:", -1));
const _hoisted_32 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-right" }, "\u20B1200.00", -1));
const _hoisted_33 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Other / Motor:", -1));
const _hoisted_34 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-right" }, "\u20B1200.00", -1));
const _hoisted_35 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Late/s:", -1));
const _hoisted_36 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-right" }, "\u20B1200.00", -1));
const _hoisted_37 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Short/s:", -1));
const _hoisted_38 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-right" }, "\u20B1200.00", -1));
const _hoisted_39 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "SSS:", -1));
const _hoisted_40 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-right" }, "\u20B1200.00", -1));
const _hoisted_41 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "HDMF:", -1));
const _hoisted_42 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-right" }, "\u20B1200.00", -1));
const _hoisted_43 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "PHIC:", -1));
const _hoisted_44 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-right" }, "\u20B1200.00", -1));
const _hoisted_45 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "SSS Loan:", -1));
const _hoisted_46 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-right" }, "\u20B1200.00", -1));
const _hoisted_47 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "HDMF Loan:", -1));
const _hoisted_48 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-right" }, "\u20B1200.00", -1));
const _hoisted_49 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h7" }, "Net Pay", -1));
const _hoisted_50 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-right" }, "\u20B1890.00", -1));
const regularPay = 480;
const _sfc_main$1 = {
  __name: "UserPaySlipCard",
  setup(__props) {
    const formattedRegular = new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2
    }).format(regularPay);
    console.log(formattedRegular);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(QCard, { class: "account-card q-pa-md" }, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                _hoisted_1$1
              ]),
              _: 1
            }),
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createVNode(QList, { separator: "" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2$1, [
                      createBaseVNode("div", _hoisted_3$1, [
                        createVNode(QItem, null, {
                          default: withCtx(() => [
                            createVNode(QItemSection, { align: "center" }, {
                              default: withCtx(() => [
                                _hoisted_4$1
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
                                _hoisted_5$1
                              ]),
                              _: 1
                            }),
                            createVNode(QItemSection, { side: "" }, {
                              default: withCtx(() => [
                                createBaseVNode("div", _hoisted_6$1, toDisplayString(unref(formattedRegular)), 1)
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
                                _hoisted_7$1
                              ]),
                              _: 1
                            }),
                            createVNode(QItemSection, { side: "" }, {
                              default: withCtx(() => [
                                _hoisted_8$1
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
                                _hoisted_9$1
                              ]),
                              _: 1
                            }),
                            createVNode(QItemSection, { side: "" }, {
                              default: withCtx(() => [
                                _hoisted_10$1
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
                                _hoisted_11
                              ]),
                              _: 1
                            }),
                            createVNode(QItemSection, { side: "" }, {
                              default: withCtx(() => [
                                _hoisted_12
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
                                _hoisted_13
                              ]),
                              _: 1
                            }),
                            createVNode(QItemSection, { side: "" }, {
                              default: withCtx(() => [
                                _hoisted_14
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
                                _hoisted_15
                              ]),
                              _: 1
                            }),
                            createVNode(QItemSection, { side: "" }, {
                              default: withCtx(() => [
                                _hoisted_16
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
                                _hoisted_17
                              ]),
                              _: 1
                            }),
                            createVNode(QItemSection, { side: "" }, {
                              default: withCtx(() => [
                                _hoisted_18
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
                                _hoisted_19
                              ]),
                              _: 1
                            }),
                            createVNode(QItemSection, { side: "" }, {
                              default: withCtx(() => [
                                _hoisted_20
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      createBaseVNode("div", _hoisted_21, [
                        createVNode(QItem, null, {
                          default: withCtx(() => [
                            createVNode(QItemSection, { align: "center" }, {
                              default: withCtx(() => [
                                _hoisted_22
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
                                _hoisted_23
                              ]),
                              _: 1
                            }),
                            createVNode(QItemSection, { side: "" }, {
                              default: withCtx(() => [
                                _hoisted_24
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
                                _hoisted_25
                              ]),
                              _: 1
                            }),
                            createVNode(QItemSection, { side: "" }, {
                              default: withCtx(() => [
                                _hoisted_26
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
                                _hoisted_27
                              ]),
                              _: 1
                            }),
                            createVNode(QItemSection, { side: "" }, {
                              default: withCtx(() => [
                                _hoisted_28
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
                                _hoisted_29
                              ]),
                              _: 1
                            }),
                            createVNode(QItemSection, { side: "" }, {
                              default: withCtx(() => [
                                _hoisted_30
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
                                _hoisted_31
                              ]),
                              _: 1
                            }),
                            createVNode(QItemSection, { side: "" }, {
                              default: withCtx(() => [
                                _hoisted_32
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
                                _hoisted_33
                              ]),
                              _: 1
                            }),
                            createVNode(QItemSection, { side: "" }, {
                              default: withCtx(() => [
                                _hoisted_34
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
                                _hoisted_35
                              ]),
                              _: 1
                            }),
                            createVNode(QItemSection, { side: "" }, {
                              default: withCtx(() => [
                                _hoisted_36
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
                                _hoisted_37
                              ]),
                              _: 1
                            }),
                            createVNode(QItemSection, { side: "" }, {
                              default: withCtx(() => [
                                _hoisted_38
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
                                _hoisted_39
                              ]),
                              _: 1
                            }),
                            createVNode(QItemSection, { side: "" }, {
                              default: withCtx(() => [
                                _hoisted_40
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
                                _hoisted_41
                              ]),
                              _: 1
                            }),
                            createVNode(QItemSection, { side: "" }, {
                              default: withCtx(() => [
                                _hoisted_42
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
                                _hoisted_43
                              ]),
                              _: 1
                            }),
                            createVNode(QItemSection, { side: "" }, {
                              default: withCtx(() => [
                                _hoisted_44
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
                                _hoisted_45
                              ]),
                              _: 1
                            }),
                            createVNode(QItemSection, { side: "" }, {
                              default: withCtx(() => [
                                _hoisted_46
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
                                _hoisted_47
                              ]),
                              _: 1
                            }),
                            createVNode(QItemSection, { side: "" }, {
                              default: withCtx(() => [
                                _hoisted_48
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    createVNode(QItem, null, {
                      default: withCtx(() => [
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [
                            _hoisted_49
                          ]),
                          _: 1
                        }),
                        createVNode(QItemSection, { side: "" }, {
                          default: withCtx(() => [
                            _hoisted_50
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
      ]);
    };
  }
};
var UserPaySlipCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-5009f40a"], ["__file", "UserPaySlipCard.vue"]]);
var UserIdPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-66faa808"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "q-pa-xm" };
const _hoisted_2 = { class: "row q-ma-sm" };
const _hoisted_3 = { class: "user-profile-page q-pa-md" };
const _hoisted_4 = { class: "row q-col-gutter-md" };
const _hoisted_5 = { class: "col-12 col-md-4" };
const _hoisted_6 = { class: "col-12 col-md-8" };
const _hoisted_7 = { class: "row q-col-gutter-md" };
const _hoisted_8 = { class: "col-12" };
const _hoisted_9 = { class: "col-12" };
const _hoisted_10 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "My Bills", -1));
const _sfc_main = {
  __name: "UserIdPage",
  setup(__props) {
    useRouter();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(QBtn, {
            flat: "",
            dense: "",
            icon: "arrow_back_ios",
            rounded: "",
            to: "/admin/users"
          }),
          createVNode(QBtn, {
            dense: "",
            label: "Cash Advance / CA"
          }),
          createVNode(QBtn, {
            dense: "",
            label: "Uniform"
          }),
          createVNode(QBtn, {
            dense: "",
            label: "Benefits"
          }),
          createVNode(QBtn, {
            dense: "",
            label: ""
          })
        ]),
        createBaseVNode("div", null, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                createVNode(UserProfileCard)
              ]),
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("div", _hoisted_7, [
                  createBaseVNode("div", _hoisted_8, [
                    createVNode(UserPaySlipCard)
                  ]),
                  createBaseVNode("div", _hoisted_9, [
                    createVNode(QCard, { class: "bills-card q-pa-md" }, {
                      default: withCtx(() => [
                        createVNode(QCardSection, null, {
                          default: withCtx(() => [
                            _hoisted_10
                          ]),
                          _: 1
                        }),
                        createVNode(QList, { separator: "" })
                      ]),
                      _: 1
                    })
                  ])
                ])
              ])
            ])
          ])
        ])
      ]);
    };
  }
};
var UserIdPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-66faa808"], ["__file", "UserIdPage.vue"]]);
export { UserIdPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcklkUGFnZS5mNGZiMGFiMy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvdXNlcnMvaWQvY29tcG9uZW50cy9Vc2VyRWRpdERpYWxvZy52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci91c2Vycy9pZC9jb21wb25lbnRzL1VzZXJQcm9maWxlQ2FyZC52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci91c2Vycy9pZC9jb21wb25lbnRzL1VzZXJQYXlTbGlwQ2FyZC52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci91c2Vycy9pZC9Vc2VySWRQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLWRpYWxvZ1xuICAgIHJlZj1cImRpYWxvZ1JlZlwiXG4gICAgdi1tb2RlbD1cImRpYWxvZ1wiXG4gICAgQGhpZGU9XCJvbkRpYWxvZ0hpZGVcIlxuICAgIEBvaz1cImhhbmRsZVNhdmVcIlxuICAgIEBjYW5jZWw9XCJvbkRpYWxvZ0NhbmNlbFwiXG4gID5cbiAgICA8cS1jYXJkIGNsYXNzPVwicS1wYS1zbVwiPlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgPCEtLSBEZXRhaWxzIFNlY3Rpb24gLS0+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDQgdGV4dC13ZWlnaHQtbGlnaHRcIj5FZGl0IEVtcGxveWVlIFByb2ZpbGU8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8cS1idG4gaWNvbj1cImNsb3NlXCIgZmxhdCBkZW5zZSByb3VuZCB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXIteS1zbVwiPlxuICAgICAgICAgICAgICA8IS0tIEZ1bGwgTmFtZSBJbnB1dCAtLT5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiZWRpdFVzZXJGb3JtLmZ1bGxuYW1lXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInRleHQtY2FwaXRhbGl6ZVwiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIGxhYmVsPVwiRnVsbCBOYW1lXCJcbiAgICAgICAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCkgfHwgJ1JlcXVpcmVkJ11cIlxuICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgIDwhLS0gQWRkcmVzcyBJbnB1dCAtLT5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiZWRpdFVzZXJGb3JtLnVzZXJfYWRkcmVzc1wiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJ0ZXh0LWNhcGl0YWxpemVcIlxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBsYWJlbD1cIkFkZHJlc3NcIlxuICAgICAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnUmVxdWlyZWQnXVwiXG4gICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci14LXNtIGl0ZW0tc3RhcnRcIj5cbiAgICAgICAgICAgICAgICA8IS0tIEJpcnRoZGF0ZSBJbnB1dCAtLT5cbiAgICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cImVkaXRVc2VyRm9ybS51c2VyX2JpcnRoZGF0ZVwiXG4gICAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgIGxhYmVsPVwiQmlydGhkYXRlXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJkYXRlXCJcbiAgICAgICAgICAgICAgICAgIGhpbnQ9XCJtbS9kZC95eXl5XCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDIzMHB4XCJcbiAgICAgICAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnUmVxdWlyZWQnXVwiXG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIDwhLS0gR2VuZGVyIFNlbGVjdCAtLT5cbiAgICAgICAgICAgICAgICA8cS1zZWxlY3RcbiAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJlZGl0VXNlckZvcm0udXNlcl9zZXhcIlxuICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgICBsYWJlbD1cIlNleFwiXG4gICAgICAgICAgICAgICAgICA6b3B0aW9ucz1cImdlbmRlck9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+ICh2YWwgJiYgdmFsLmxlbmd0aCA+IDApIHx8ICdSZXF1aXJlZCddXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEyMHB4XCJcbiAgICAgICAgICAgICAgICAgIGJlaGF2aW9yPVwibWVudVwiXG4gICAgICAgICAgICAgICAgICBoaWRlLWRyb3Bkb3duLWljb25cbiAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgPCEtLSBTdGF0dXMgU2VsZWN0IC0tPlxuICAgICAgICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cImVkaXRVc2VyRm9ybS51c2VyX3N0YXR1c1wiXG4gICAgICAgICAgICAgICAgICA6b3B0aW9ucz1cInN0YXR1c09wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgICBoaWRlLWRyb3Bkb3duLWljb25cbiAgICAgICAgICAgICAgICAgIGxhYmVsPVwiU3RhdHVzXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEwMHB4XCJcbiAgICAgICAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnUmVxdWlyZWQnXVwiXG4gICAgICAgICAgICAgICAgICBiZWhhdmlvcj1cIm1lbnVcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXIteC1tZFwiPlxuICAgICAgICAgICAgICAgIDwhLS0gUGhvbmUgTnVtYmVyIElucHV0IC0tPlxuICAgICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgICB2LW1vZGVsPVwiZWRpdFVzZXJGb3JtLnVzZXJfcGhvbmVfbnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgbGFiZWw9XCJQaG9uZSBOdW1iZXJcIlxuICAgICAgICAgICAgICAgICAgbWFzaz1cIisoNjMpICMjIyAtICMjIyAtICMjIyNcIlxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCIoKzYzKSAjIyMgLSAjIyMgLSAjIyMjXCJcbiAgICAgICAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnUmVxdWlyZWQnXVwiXG4gICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAzMDBweDsgbWF4LXdpZHRoOiA1MDBweDsgbWluLXdpZHRoOiAxMDBweFwiXG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIDwhLS0gUG9zaXRpb24gU2VsZWN0IC0tPlxuICAgICAgICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cImVkaXRVc2VyRm9ybS51c2VyX3Bvc2l0aW9uXCJcbiAgICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgaGlkZS1kcm9wZG93bi1pY29uXG4gICAgICAgICAgICAgICAgICBsYWJlbD1cIlBvc2l0aW9uXCJcbiAgICAgICAgICAgICAgICAgIDpvcHRpb25zPVwicG9zaXRpb25PcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnUmVxdWlyZWQnXVwiXG4gICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxNTBweDsgbWF4LXdpZHRoOiA1MDBweDsgbWluLXdpZHRoOiAxMDBweFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPCEtLSBEZXNpZ25hdGlvbiBTZWN0aW9uIC0tPlxuICAgICAgICAgICAgICA8ZGl2PkRlc2lnbmF0aW9uPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXIteC1tZFwiPlxuICAgICAgICAgICAgICAgIDwhLS0gQnJhbmNoIFNlbGVjdCAtLT5cbiAgICAgICAgICAgICAgICA8cS1zZWxlY3RcbiAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJlZGl0VXNlckZvcm0udXNlcl9icmFuY2hfbmFtZVwiXG4gICAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgIHVzZS1pbnB1dFxuICAgICAgICAgICAgICAgICAgY2xlYXJhYmxlXG4gICAgICAgICAgICAgICAgICBpbnB1dC1kZWJvdW5jZT1cIjBcIlxuICAgICAgICAgICAgICAgICAgOm9wdGlvbnM9XCJmaWx0ZXJCcmFuY2hPcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgIGxhYmVsPVwiQnJhbmNoXCJcbiAgICAgICAgICAgICAgICAgIEBmaWx0ZXI9XCJmaWx0ZXJlZEJyYW5jaGVzXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDI1MHB4OyBtYXgtd2lkdGg6IDUwMHB4OyBtaW4td2lkdGg6IDEwMHB4XCJcbiAgICAgICAgICAgICAgICAgIGhpZGUtZHJvcGRvd24taWNvblxuICAgICAgICAgICAgICAgICAgYmVoYXZpb3I9XCJtZW51XCJcbiAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgPCEtLSBUaW1lIFNjaGVkdWxlIElucHV0IC0tPlxuICAgICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgICB2LW1vZGVsPVwiZWRpdFVzZXJGb3JtLnVzZXJfdGltZV9zaGlmdFwiXG4gICAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgIG1hc2s9XCIjIzojIyBBQVwiXG4gICAgICAgICAgICAgICAgICBsYWJlbD1cIlRpbWUgU2NoZWR1bGVcIlxuICAgICAgICAgICAgICAgICAgOnJ1bGVzPVwidmFsaWRpZGF0ZVRpbWVcIlxuICAgICAgICAgICAgICAgICAgaGludD1cIkZvcm1hdDogMDE6MDAgQU0vUE1cIlxuICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMjAwcHg7IG1heC13aWR0aDogNTAwcHg7IG1pbi13aWR0aDogMTAwcHhcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgICAgICAgIDwhLS0gQWN0aW9ucyAtLT5cbiAgICAgICAgICA8cS1jYXJkLWFjdGlvbnMgY2xhc3M9XCJyb3cgcS1weC1sZyBxLXB5LXNtIHEtcHQtbm9uZVwiIGFsaWduPVwicmlnaHRcIj5cbiAgICAgICAgICAgIDxxLWJ0biBjbGFzcz1cImdsb3NzeVwiIGNvbG9yPVwiZ3JleS05XCIgbGFiZWw9XCJDYW5jZWxcIiB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgY2xhc3M9XCJnbG9zc3lcIlxuICAgICAgICAgICAgICBjb2xvcj1cInRlYWxcIlxuICAgICAgICAgICAgICBsYWJlbD1cIlNhdmVcIlxuICAgICAgICAgICAgICBAY2xpY2s9XCJoYW5kbGVTYXZlRWRpdFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIHJlYWN0aXZlLCBvbk1vdW50ZWQgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyB1c2VEaWFsb2dQbHVnaW5Db21wb25lbnQgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyB1c2VSb3V0ZSwgdXNlUm91dGVyIH0gZnJvbSBcInZ1ZS1yb3V0ZXJcIjtcbmltcG9ydCB7IHVzZUJyYW5jaGVzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9icmFuY2hcIjtcbmltcG9ydCB7IHVzZVVzZXJzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy91c2VyXCI7XG5cbmNvbnN0IHsgZGlhbG9nUmVmLCBvbkRpYWxvZ0hpZGUsIG9uRGlhbG9nT0ssIG9uRGlhbG9nQ2FuY2VsIH0gPVxuICB1c2VEaWFsb2dQbHVnaW5Db21wb25lbnQoKTtcblxuY29uc3Qgcm91dGUgPSB1c2VSb3V0ZSgpO1xuY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5jb25zdCB1c2VyU3RvcmUgPSB1c2VVc2Vyc1N0b3JlKCk7XG5cbmNvbnN0IGJyYW5jaGVzU3RvcmUgPSB1c2VCcmFuY2hlc1N0b3JlKCk7XG5jb25zdCBicmFuY2hPcHRpb25zID0gcmVmKFtdKTtcbmNvbnN0IGZpbHRlckJyYW5jaE9wdGlvbnMgPSByZWYoYnJhbmNoT3B0aW9ucy52YWx1ZSk7XG5jb25zdCBtYXhpbWl6ZWRUb2dnbGUgPSByZWYodHJ1ZSk7XG5jb25zdCBkaWFsb2cgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBlbWl0ID0gZGVmaW5lRW1pdHMoW1widXNlclwiLCBcImhpZGVcIiwgXCJva1wiLCBcImNhbmNlbFwiXSk7XG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzKFtcInVzZXJEYXRhXCJdKTtcbmNvbnNvbGUubG9nKFwidXNlckRpYWxvZ2RhdGFcIiwgcHJvcHMudXNlckRhdGEpO1xuY29uc3QgbG9jYWxVc2VyRGF0YSA9IHJlZih7IC4uLnByb3BzLnVzZXJEYXRhIH0pO1xuY29uc29sZS5sb2coXCJsb2NhbFVzZXJEYXRhXCIsIGxvY2FsVXNlckRhdGEpO1xuXG5jb25zdCBnZW5kZXJPcHRpb25zID0gW1wiTWFsZVwiLCBcIkZlbWFsZVwiXTtcbmNvbnN0IHN0YXR1c09wdGlvbnMgPSBbXCJDdXJyZW50XCIsIFwiRm9ybWVyXCJdO1xuY29uc3QgcG9zaXRpb25PcHRpb25zID0gW1xuICBcIlN1cGVyIEFkbWluXCIsXG4gIFwiQWRtaW5cIixcbiAgXCJTY2FsZXJcIixcbiAgXCJMYW1lc2Fkb3JcIixcbiAgXCJIb3JuZXJvXCIsXG4gIFwiQmFrZXJcIixcbiAgXCJDYXNoaWVyXCIsXG4gIFwiU2FsZXMgQ2xlcmtcIixcbiAgXCJVdGlsaXR5XCIsXG4gIFwiTm90IFlldCBBc3NpZ25lZFwiLFxuXTtcblxuY29uc3QgZmV0Y2hCcmFuY2hlc0RhdGEgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGJyYW5jaCA9IGF3YWl0IGJyYW5jaGVzU3RvcmUuZmV0Y2hCcmFuY2hlcygpO1xuICBicmFuY2hPcHRpb25zLnZhbHVlID0gYnJhbmNoZXNTdG9yZS5icmFuY2hlcy5tYXAoKHZhbCkgPT4gKHtcbiAgICBsYWJlbDogdmFsLm5hbWUsXG4gICAgdmFsdWU6IHZhbC5pZCxcbiAgfSkpO1xuICBmaWx0ZXJCcmFuY2hPcHRpb25zLnZhbHVlID0gYnJhbmNoT3B0aW9ucy52YWx1ZTtcbn07XG5cbm9uTW91bnRlZChmZXRjaEJyYW5jaGVzRGF0YSk7XG5cbmNvbnN0IGZpbHRlcmVkQnJhbmNoZXMgPSAodmFsLCB1cGRhdGUpID0+IHtcbiAgdXBkYXRlKCgpID0+IHtcbiAgICBjb25zdCBuZWVkbGUgPSB2YWwudG9Mb3dlckNhc2UoKTtcbiAgICBmaWx0ZXJCcmFuY2hPcHRpb25zLnZhbHVlID1cbiAgICAgIHZhbCA9PT0gXCJcIlxuICAgICAgICA/IGJyYW5jaE9wdGlvbnMudmFsdWVcbiAgICAgICAgOiBicmFuY2hPcHRpb25zLnZhbHVlLmZpbHRlcigodikgPT5cbiAgICAgICAgICAgIHYubGFiZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhuZWVkbGUpXG4gICAgICAgICAgKTtcbiAgfSk7XG59O1xuXG5jb25zdCB2YWxpZGlkYXRlVGltZSA9ICh2YWwpID0+IHtcbiAgY29uc3QgdGltZVJlZ2V4ID0gL14oMFsxLTldfDFbMC0yXSk6WzAtNV1bMC05XSAoQU18UE0pJC9pO1xuICByZXR1cm4gdGltZVJlZ2V4LnRlc3QodmFsKSB8fCBcIkludmFsaWQgdGltZSBmb3JtYXRcIjtcbn07XG5cbmNvbnN0IGZvcm1hdFRpbWVGcm9tREIgPSAoZGF0ZVN0cmluZykgPT4ge1xuICBjb25zdCBkYXRlT2JqID0gbmV3IERhdGUoYDE5NzAtMDEtMDFUJHtkYXRlU3RyaW5nfWApO1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIGhvdXI6IFwiMi1kaWdpdFwiLFxuICAgIG1pbnV0ZTogXCIyLWRpZ2l0XCIsXG4gICAgaG91cjEyOiB0cnVlLFxuICB9O1xuICByZXR1cm4gZGF0ZU9iai50b0xvY2FsZVRpbWVTdHJpbmcodW5kZWZpbmVkLCBvcHRpb25zKTtcbn07XG5cbmNvbnN0IGZvcm1hdERhdGVGcm9tREIgPSAoZGF0ZVRpbWVTdHJpbmcpID0+IHtcbiAgaWYgKCFkYXRlVGltZVN0cmluZykgcmV0dXJuIFwiXCI7IC8vIEhhbmRsZSBlbXB0eSBvciB1bmRlZmluZWQgZGF0ZXNcbiAgY29uc3QgZGF0ZU9iaiA9IG5ldyBEYXRlKGRhdGVUaW1lU3RyaW5nKTtcbiAgY29uc3QgeWVhciA9IGRhdGVPYmouZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSBTdHJpbmcoZGF0ZU9iai5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpOyAvLyBNb250aHMgYXJlIHplcm8tYmFzZWRcbiAgY29uc3QgZGF5ID0gU3RyaW5nKGRhdGVPYmouZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIHJldHVybiBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1gO1xufTtcblxuY29uc3QgZWRpdFVzZXJGb3JtID0gcmVhY3RpdmUoe1xuICBmdWxsbmFtZTogXCJcIixcbiAgdXNlcl9hZGRyZXNzOiBcIlwiLFxuICB1c2VyX2JpcnRoZGF0ZTogXCJcIixcbiAgdXNlcl9zZXg6IFwiXCIsXG4gIHVzZXJfc3RhdHVzOiBcIlwiLFxuICB1c2VyX3Bob25lX251bWJlcjogXCJcIixcbiAgdXNlcl9wb3NpdGlvbjogXCJcIixcbiAgdXNlcl9icmFuY2hfbmFtZTogXCJcIixcbiAgdXNlcl90aW1lX3NoaWZ0OiBcIlwiLFxufSk7XG5cbndhdGNoKFxuICAoKSA9PiBwcm9wcy51c2VyRGF0YSxcbiAgKG5ld1ZhbCkgPT4ge1xuICAgIGlmIChuZXdWYWwpIHtcbiAgICAgIGxvY2FsVXNlckRhdGEudmFsdWUgPSB7IC4uLm5ld1ZhbCB9O1xuICAgICAgY29uc29sZS5sb2coXCJ1cGRhdGUgZGF0YVwiLCBsb2NhbFVzZXJEYXRhLnZhbHVlKTtcbiAgICAgIGVkaXRVc2VyRm9ybS5mdWxsbmFtZSA9IGxvY2FsVXNlckRhdGEudmFsdWUubmFtZTtcbiAgICAgIGVkaXRVc2VyRm9ybS51c2VyX2FkZHJlc3MgPSBsb2NhbFVzZXJEYXRhLnZhbHVlLmFkZHJlc3M7XG4gICAgICBlZGl0VXNlckZvcm0udXNlcl9iaXJ0aGRhdGUgPSBmb3JtYXREYXRlRnJvbURCKFxuICAgICAgICBsb2NhbFVzZXJEYXRhLnZhbHVlLmJpcnRoZGF0ZVxuICAgICAgKTtcbiAgICAgIGVkaXRVc2VyRm9ybS51c2VyX3NleCA9IGxvY2FsVXNlckRhdGEudmFsdWUuc2V4O1xuICAgICAgZWRpdFVzZXJGb3JtLnVzZXJfc3RhdHVzID0gbG9jYWxVc2VyRGF0YS52YWx1ZS5zdGF0dXM7XG4gICAgICBlZGl0VXNlckZvcm0udXNlcl9waG9uZV9udW1iZXIgPSBsb2NhbFVzZXJEYXRhLnZhbHVlLnBob25lO1xuICAgICAgZWRpdFVzZXJGb3JtLnVzZXJfcG9zaXRpb24gPSBsb2NhbFVzZXJEYXRhLnZhbHVlLnJvbGU7XG4gICAgICBlZGl0VXNlckZvcm0udXNlcl9icmFuY2hfbmFtZSA9XG4gICAgICAgIGxvY2FsVXNlckRhdGEudmFsdWUuYnJhbmNoX2VtcGxveWVlLmJyYW5jaC5uYW1lO1xuICAgICAgZWRpdFVzZXJGb3JtLnVzZXJfdGltZV9zaGlmdCA9IGZvcm1hdFRpbWVGcm9tREIoXG4gICAgICAgIGxvY2FsVXNlckRhdGEudmFsdWUuYnJhbmNoX2VtcGxveWVlLnRpbWVfc2hpZnRcbiAgICAgICk7XG4gICAgfVxuICB9LFxuICB7IGltbWVkaWF0ZTogdHJ1ZSB9XG4pO1xuXG5jb25zdCBoYW5kbGVTYXZlRWRpdCA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBlZGl0ZWRVc2VyRGF0YSA9IHtcbiAgICAgIG5hbWU6IGVkaXRVc2VyRm9ybS5mdWxsbmFtZSxcbiAgICAgIGFkZHJlc3M6IGVkaXRVc2VyRm9ybS51c2VyX2FkZHJlc3MsXG4gICAgICBiaXJ0aGRhdGU6IGVkaXRVc2VyRm9ybS51c2VyX2JpcnRoZGF0ZSxcbiAgICAgIHNleDogZWRpdFVzZXJGb3JtLnVzZXJfc2V4LFxuICAgICAgc3RhdHVzOiBlZGl0VXNlckZvcm0udXNlcl9zdGF0dXMsXG4gICAgICBwaG9uZTogZWRpdFVzZXJGb3JtLnVzZXJfcGhvbmVfbnVtYmVyLFxuICAgICAgcm9sZTogZWRpdFVzZXJGb3JtLnVzZXJfcG9zaXRpb24sXG4gICAgICBicmFuY2hfaWQ6XG4gICAgICAgIGVkaXRVc2VyRm9ybS51c2VyX2JyYW5jaF9uYW1lLnZhbHVlIHx8XG4gICAgICAgIGxvY2FsVXNlckRhdGEudmFsdWUuYnJhbmNoX2VtcGxveWVlLmJyYW5jaC5pZCxcbiAgICAgIHRpbWVfc2hpZnQ6IGVkaXRVc2VyRm9ybS51c2VyX3RpbWVfc2hpZnQsXG4gICAgfTtcbiAgICBjb25zb2xlLmxvZyhcIlNhdmluZyB1c2VyIGRhdGE6XCIsIGVkaXRlZFVzZXJEYXRhKTtcblxuICAgIC8vIFNpbXVsYXRlIGFuIEFQSSBjYWxsIHRvIHNhdmUgdGhlIGRhdGFcbiAgICBhd2FpdCB1c2VyU3RvcmUudXBkYXRlVXNlcihwcm9wcy51c2VyRGF0YS5pZCwgZWRpdGVkVXNlckRhdGEpO1xuICAgIGNvbnN0IHVzZXJJZCA9IHByb3BzLnVzZXJEYXRhLmlkO1xuXG4gICAgY29uc3QgdXNlclJlcyA9IGF3YWl0IHVzZXJTdG9yZS5mZXRjaFVzZXJCeUlkKHVzZXJJZCk7XG4gICAgLy8gQ2xvc2UgdGhlIGRpYWxvZyBvbiBzdWNjZXNzZnVsIHNhdmVcblxuICAgIGRpYWxvZy52YWx1ZSA9IGZhbHNlO1xuICAgIGNsZWFyRm9ybSgpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzYXZpbmcgdXNlciBkYXRhOlwiLCBlcnJvcik7XG4gIH1cbn07XG5cbmNvbnN0IGNsZWFyRm9ybSA9ICgpID0+IHtcbiAgZWRpdFVzZXJGb3JtLmZ1bGxuYW1lID0gXCJcIjtcbiAgZWRpdFVzZXJGb3JtLnVzZXJfYWRkcmVzcyA9IFwiXCI7XG4gIGVkaXRVc2VyRm9ybS51c2VyX2JpcnRoZGF0ZSA9IFwiXCI7XG4gIGVkaXRVc2VyRm9ybS51c2VyX3NleCA9IFwiXCI7XG4gIGVkaXRVc2VyRm9ybS51c2VyX3N0YXR1cyA9IFwiXCI7XG4gIGVkaXRVc2VyRm9ybS51c2VyX3Bob25lX251bWJlciA9IFwiXCI7XG4gIGVkaXRVc2VyRm9ybS51c2VyX3Bvc2l0aW9uID0gXCJcIjtcbiAgZWRpdFVzZXJGb3JtLnVzZXJfYnJhbmNoX25hbWUgPSBcIlwiO1xuICBlZGl0VXNlckZvcm0udXNlcl90aW1lX3NoaWZ0ID0gXCJcIjtcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuLmRpYWxvZy1jb250YWluZXIge1xuICBtYXgtd2lkdGg6IDEwMDBweDsgLyogQWRqdXN0IHRoaXMgdmFsdWUgdG8gbWFrZSB0aGUgZGlhbG9nIG5hcnJvd2VyICovXG4gIHdpZHRoOiAxMDAlOyAvKiBFbnN1cmVzIGl0IGRvZXNuJ3QgZXhjZWVkIHRoZSBtYXggd2lkdGggKi9cbiAgbWFyZ2luOiBhdXRvOyAvKiBDZW50ZXIgaXQgb24gdGhlIHNjcmVlbiAqL1xufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiB2LWlmPVwidXNlciAmJiB1c2VyLmJyYW5jaF9lbXBsb3llZVwiPlxuICAgIDxxLWNhcmQgY2xhc3M9XCJwcm9maWxlLWNhcmQgcS1wYS1tZFwiPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICA8cS1hdmF0YXIgc2l6ZT1cIjEwMHB4XCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly9jZG4ucXVhc2FyLmRldi9pbWcvYm95LWF2YXRhci5wbmdcIlxuICAgICAgICAgICAgYWx0PVwiUHJvZmlsZSBQaWN0dXJlXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L3EtYXZhdGFyPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPGRpdiBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg1IHRleHQtY2VudGVyXCI+e3sgdXNlci5uYW1lIH19PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUyIHRleHQtY2VudGVyIHEtbWItbWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlbWFpbC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgPCEtLSBEaXNwbGF5IEVtYWlsIHdpdGggSW5saW5lIEVkaXRpbmcgLS0+XG4gICAgICAgICAgICAgIDxxLXBvcHVwLWVkaXRcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwidXNlci5lbWFpbFwiXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJFZGl0IEVtYWlsXCJcbiAgICAgICAgICAgICAgICBidXR0b25zXG4gICAgICAgICAgICAgICAgcGVyc2lzdGVudFxuICAgICAgICAgICAgICAgIGF1dG8tc2F2ZVxuICAgICAgICAgICAgICAgIGZpdFxuICAgICAgICAgICAgICAgIHYtc2xvdD1cInNjb3BlXCJcbiAgICAgICAgICAgICAgICBAc2F2ZT1cIm9uU2F2ZVwiXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbi1zaG93PVwic2NhbGVcIlxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb24taGlkZT1cInNjYWxlXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgICB2LW1vZGVsPVwic2NvcGUudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgICA6cnVsZXM9XCJbZW1haWxSdWxlXVwiXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVtYWlsXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwicG9wdXAtaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgZmlsbGVkXG4gICAgICAgICAgICAgICAgICBib3JkZXJsZXNzXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9xLXBvcHVwLWVkaXQ+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVtYWlsLWRpc3BsYXlcIiBAY2xpY2s9XCJlZGl0RW1haWxcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImVtYWlsLXRleHRcIj57eyB1c2VyLmVtYWlsIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxxLWljb24gbmFtZT1cImVkaXRcIiBzaXplPVwic21cIiBjbGFzcz1cImVkaXQtaWNvbiB0ZXh0LXByaW1hcnlcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxxLWNoaXAgdGV4dC1jb2xvcj1cIndoaXRlXCIgOmNvbG9yPVwiZ2V0QmFkZ2VQb3NpdGlvbkNvbG9yKHVzZXIucm9sZSlcIj5cbiAgICAgICAgICAgIHt7IHVzZXIucm9sZSB9fVxuICAgICAgICAgIDwvcS1jaGlwPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHEtbGlzdCBzZXBhcmF0b3I+XG4gICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5EZXNpZ25hdGlvbjo8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICB7eyB1c2VyLmJyYW5jaF9lbXBsb3llZS5icmFuY2g/Lm5hbWUgfX1cbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5UaW1lIFNoaWZ0OjwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIHt7IGZvcm1hdFRpbWVGcm9tREIodXNlci5icmFuY2hfZW1wbG95ZWUudGltZV9zaGlmdCkgfX1cbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5QaG9uZTo8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICB7eyB1c2VyLnBob25lIH19XG4gICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgIDxxLWl0ZW0+XG4gICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+QWRkcmVzczo8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICB7eyB1c2VyLmFkZHJlc3MgfX1cbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5FbXBsb3ltZW50IFN0YXR1czo8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICB7eyBgJHt1c2VyLnN0YXR1c30gJHt1c2VyLnJvbGV9YCB9fVxuICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgPC9xLWxpc3Q+XG4gICAgICAgIDxkaXYgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgIGxhYmVsPVwiRWRpdCBQcm9maWxlXCJcbiAgICAgICAgICAgIGNvbG9yPVwicG9zaXRpdmVcIlxuICAgICAgICAgICAgY2xhc3M9XCJxLW10LW1kXCJcbiAgICAgICAgICAgIEBjbGljaz1cImhhbmRsZURpYWxvZyh1c2VyKVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDwvcS1jYXJkPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBjb21wdXRlZCwgb25Nb3VudGVkLCByZWFjdGl2ZSwgcmVmIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgdXNlUm91dGUsIHVzZVJvdXRlciB9IGZyb20gXCJ2dWUtcm91dGVyXCI7XG5pbXBvcnQgeyBMb2FkaW5nLCB1c2VRdWFzYXIsIGRhdGUsIFFQb3B1cFByb3h5IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgdXNlVXNlcnNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3VzZXJcIjtcbmltcG9ydCBVc2VyRWRpdERpYWxvZyBmcm9tIFwiLi9Vc2VyRWRpdERpYWxvZy52dWVcIjtcblxuY29uc3Qgcm91dGUgPSB1c2VSb3V0ZSgpO1xuY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5jb25zdCB1c2VyU3RvcmUgPSB1c2VVc2Vyc1N0b3JlKCk7XG5jb25zdCB1c2VyID0gY29tcHV0ZWQoKCkgPT4gdXNlclN0b3JlLnVzZXIpO1xuXG5jb25zb2xlLmxvZyhcIlBhZ2UgdXNlciBJRFwiLCByb3V0ZS5wYXJhbXMudXNlcl9pZCk7XG5cbmNvbnN0IGdldFVzZXJEYXRhID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIExvYWRpbmcuc2hvdygpOyAvLyBTaG93IGxvYWRpbmcgaW5kaWNhdG9yXG4gICAgY29uc3QgdXNlcklkID0gcm91dGUucGFyYW1zLnVzZXJfaWQ7XG4gICAgY29uc3QgdXNlclJlcyA9IGF3YWl0IHVzZXJTdG9yZS5mZXRjaFVzZXJCeUlkKHVzZXJJZCk7XG4gICAgY29uc29sZS5sb2coXCJGZXRjaGVkIFVzZXIgRGF0YTpcIiwgdXNlci52YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHVzZXIgZGF0YTpcIiwgZXJyb3IpO1xuICB9IGZpbmFsbHkge1xuICAgIExvYWRpbmcuaGlkZSgpOyAvLyBIaWRlIGxvYWRpbmcgaW5kaWNhdG9yXG4gIH1cbn07XG5cbm9uTW91bnRlZCgoKSA9PiB7XG4gIGdldFVzZXJEYXRhKCk7IC8vIEZldGNoIGRhdGEgd2hlbiB0aGUgY29tcG9uZW50IG1vdW50c1xufSk7XG5cbmNvbnN0IGdldEJhZGdlUG9zaXRpb25Db2xvciA9IChyb2xlKSA9PiB7XG4gIHN3aXRjaCAocm9sZSkge1xuICAgIGNhc2UgXCJTdXBlciBBZG1pblwiOlxuICAgICAgcmV0dXJuIFwibmVnYXRpdmVcIjtcbiAgICBjYXNlIFwiQWRtaW5cIjpcbiAgICAgIHJldHVybiBcImJsdWUtZ3JleS04XCI7XG4gICAgY2FzZSBcIlNjYWxlclwiOlxuICAgICAgcmV0dXJuIFwiaW5mb1wiO1xuICAgIGNhc2UgXCJMYW1lc2Fkb3JcIjpcbiAgICAgIHJldHVybiBcImluZGlnb1wiO1xuICAgIGNhc2UgXCJIb3JuZXJvXCI6XG4gICAgICByZXR1cm4gXCJwdXJwbGVcIjtcbiAgICBjYXNlIFwiQmFrZXJcIjpcbiAgICAgIHJldHVybiBcIndhcm5pbmdcIjtcbiAgICBjYXNlIFwiQ2FzaGllclwiOlxuICAgICAgcmV0dXJuIFwic2Vjb25kYXJ5XCI7XG4gICAgY2FzZSBcIlNhbGVzIENsZXJrXCI6XG4gICAgICByZXR1cm4gXCJkZWVwLW9yYW5nZVwiO1xuICAgIGNhc2UgXCJVdGlsaXR5XCI6XG4gICAgICByZXR1cm4gXCJkZWVwLXB1cnBsZVwiO1xuICAgIGNhc2UgXCJOb3QgWWV0IEFzc2lnbmVkXCI6XG4gICAgICByZXR1cm4gXCJncmV5XCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcImdyZXlcIjtcbiAgfVxufTtcblxuY29uc3QgJHEgPSB1c2VRdWFzYXIoKTtcblxuY29uc3QgaGFuZGxlRGlhbG9nID0gKHVzZXJEYXRhKSA9PiB7XG4gICRxLmRpYWxvZyh7XG4gICAgY29tcG9uZW50OiBVc2VyRWRpdERpYWxvZyxcbiAgICBjb21wb25lbnRQcm9wczoge1xuICAgICAgdXNlckRhdGE6IHVzZXJEYXRhLFxuICAgIH0sXG4gIH0pO1xufTtcblxuY29uc3QgZm9ybWF0VGltZUZyb21EQiA9ICh0aW1lU3RyaW5nKSA9PiB7XG4gIGNvbnN0IFtob3VycywgbWludXRlc10gPSB0aW1lU3RyaW5nLnNwbGl0KFwiOlwiKTtcbiAgbGV0IGhvdXIgPSBwYXJzZUludChob3VycywgMTApO1xuICBjb25zdCBhbXBtID0gaG91ciA+PSAxMiA/IFwiUE1cIiA6IFwiQU1cIjtcbiAgaG91ciA9IGhvdXIgJSAxMiB8fCAxMjtcbiAgcmV0dXJuIGAke1N0cmluZyhob3VyKS5wYWRTdGFydCgyLCBcIjBcIil9OiR7bWludXRlc30gJHthbXBtfWA7XG59O1xuXG5jb25zdCBlZGl0RW1haWwgPSAoKSA9PiB7XG4gIC8vIFRyaWdnZXIgdGhlIHBvcHVwIGVkaXQgbWFudWFsbHlcbiAgUVBvcHVwUHJveHkuc2hvdyh7XG4gICAgcmVmOiBcImVtYWlsUG9wdXBcIixcbiAgfSk7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5lbGVnYW50LWNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQ6ICNmOWY5Zjk7XG4gIHBhZGRpbmc6IDJyZW07XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgY29sb3I6ICMzMzM7XG59XG4udXNlci1wcm9maWxlLXBhZ2Uge1xuICBtYXgtd2lkdGg6IDEyMDBweDtcbiAgbWFyZ2luOiBhdXRvO1xufVxuXG4ucHJvZmlsZS1jYXJkLFxuLmFjY291bnQtY2FyZCxcbi5iaWxscy1jYXJkIHtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgYm94LXNoYWRvdzogMCA0cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xufVxuXG4ucHJvZmlsZS1jYXJkIHEtY2FyZC1zZWN0aW9uOmZpcnN0LWNoaWxkIHtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbn1cblxuLnEtbGlzdCBxLWl0ZW0ge1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAvKiBwYWRkaW5nOiAxcmVtIDAuNXJlbTsgKi9cbn1cblxuLnEtbGlzdCBxLWl0ZW06bm90KDpsYXN0LWNoaWxkKSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xufVxuXG4ucS1saXN0IHEtaXRlbS1zZWN0aW9uIHtcbiAgY29sb3I6ICM2Njc7XG4gIGZvbnQtc2l6ZTogMC45cmVtO1xufVxuXG4ucS1saXN0IHEtaXRlbS1zZWN0aW9uOmZpcnN0LWNoaWxkIHtcbiAgZmxleDogMSAxIGF1dG87XG59XG5cbi5xLWxpc3QgcS1pdGVtLXNlY3Rpb25bc2lkZV0ge1xuICBmbGV4OiAwIDAgYXV0bztcbn1cblxuLnEtYnRuIHtcbiAgbWluLXdpZHRoOiA5MHB4O1xufVxuXG4ucS1idG5bZmxhdF0ge1xuICBwYWRkaW5nOiAwIDhweDtcbn1cblxuLmVtYWlsLWNvbnRhaW5lciB7XG4gIG1heC13aWR0aDogNDAwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uZW1haWwtZGlzcGxheSB7XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4ycyBlYXNlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLmVtYWlsLWRpc3BsYXk6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMDQpO1xufVxuXG4uZW1haWwtdGV4dCB7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgY29sb3I6ICMzMzM7XG4gIG1hcmdpbi1yaWdodDogOHB4O1xufVxuXG4uZWRpdC1pY29uIHtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGVhc2U7XG59XG5cbi5lbWFpbC1kaXNwbGF5OmhvdmVyIC5lZGl0LWljb24ge1xuICBvcGFjaXR5OiAxO1xufVxuXG4ucS1wb3B1cC1lZGl0IHtcbiAgbWF4LXdpZHRoOiAzMDBweDtcbn1cblxuLnBvcHVwLWlucHV0IHtcbiAgZm9udC1zaXplOiAwLjlyZW07XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxxLWNhcmQgY2xhc3M9XCJhY2NvdW50LWNhcmQgcS1wYS1tZFwiPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+UGF5IFNsaXA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2FwdGlvbiB0ZXh0LXdlaWdodC1saWdodFwiPlxuICAgICAgICAgICAgICBQZXJpb2QgU3RhcnQgRGF0ZTogQXVnLiAxMSwgMjAyNFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jYXB0aW9uIHRleHQtd2VpZ2h0LWxpZ2h0XCI+XG4gICAgICAgICAgICAgIFBlcmlvZCBFbmRpbmcgRGF0ZTogQXVnLiAyNSwgMjAyNFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jYXB0aW9uIHRleHQtd2VpZ2h0LWxpZ2h0XCI+XG4gICAgICAgICAgICAgIFBheXJvbGwgRGF0ZTogU2VwdC4gMDUsIDIwMjRcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtbGlzdCBzZXBhcmF0b3I+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci1tZCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDwhLS0gRWFybmluZ3MgU3VtbWFyeSAtLT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNVwiPlxuICAgICAgICAgICAgICA8cS1pdGVtPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDdcIj5FYXJuaW5ncyBTdW1tYXJ5PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0+XG5cbiAgICAgICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlJlZ3VsYXIgUGF5OjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIHNpZGU+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBmb3JtYXR0ZWRSZWd1bGFyIH19XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICA8ZGl2Pk92ZXJ0aW1lIFBheTo8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBzaWRlPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtcmlnaHRcIj7igrExMjAuMDA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICA8ZGl2PkhvbGlkYXkgUGF5OjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIHNpZGU+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1yaWdodFwiPuKCsTE2MC4wMDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICA8cS1pdGVtPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+Q09MQTo8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBzaWRlPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtcmlnaHRcIj7igrExNjAuMDA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICA8ZGl2Pk5pZ2h0IERpZmZlcmVudGlhbDo8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBzaWRlPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtcmlnaHRcIj7igrExNjAuMDA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICA8ZGl2PkRhaWx5IEFsbG93YW5jZTo8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBzaWRlPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtcmlnaHRcIj7igrExNjAuMDA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlF1b3RhIE92ZXIvIE92ZXIgVGltZTo8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBzaWRlPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtcmlnaHRcIj7igrExNjAuMDA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICA8ZGl2Pk90aGVyIElOQy4vIEFkanVzdG1lbnQ6PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gc2lkZT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+4oKxMTYwLjAwPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNVwiPlxuICAgICAgICAgICAgICA8IS0tIERlZHVjdGlvbnMgU3VtbWFyeSAtLT5cbiAgICAgICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg3XCI+RGVkdWN0aW9ucyBTdW1tYXJ5PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0+XG5cbiAgICAgICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICA8ZGl2Pk5ldyBDcmVkaXRzOjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIHNpZGU+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1yaWdodFwiPuKCsTIwMC4wMDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICA8cS1pdGVtPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+UHJldiBDcmVkaXRzOjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIHNpZGU+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1yaWdodFwiPuKCsTIwMC4wMDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICA8cS1pdGVtPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+VW5pZm9ybTo8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBzaWRlPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtcmlnaHRcIj7igrEyMDAuMDA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlBlbmFsdHk6PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gc2lkZT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+4oKxMjAwLjAwPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgIDxxLWl0ZW0+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgPGRpdj5DYXNoIEFkdmFuY2U6PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gc2lkZT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+4oKxMjAwLjAwPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgIDxxLWl0ZW0+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgPGRpdj5PdGhlciAvIE1vdG9yOjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIHNpZGU+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1yaWdodFwiPuKCsTIwMC4wMDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICA8cS1pdGVtPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+TGF0ZS9zOjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIHNpZGU+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1yaWdodFwiPuKCsTIwMC4wMDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICA8cS1pdGVtPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+U2hvcnQvczo8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBzaWRlPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtcmlnaHRcIj7igrEyMDAuMDA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlNTUzo8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBzaWRlPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtcmlnaHRcIj7igrEyMDAuMDA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICA8ZGl2PkhETUY6PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gc2lkZT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+4oKxMjAwLjAwPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgIDxxLWl0ZW0+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgPGRpdj5QSElDOjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIHNpZGU+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1yaWdodFwiPuKCsTIwMC4wMDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICA8cS1pdGVtPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+U1NTIExvYW46PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gc2lkZT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+4oKxMjAwLjAwPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgIDxxLWl0ZW0+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgPGRpdj5IRE1GIExvYW46PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gc2lkZT5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+4oKxMjAwLjAwPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDwhLS0gTmV0IFBheSAtLT5cbiAgICAgICAgICA8cS1pdGVtPlxuICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oN1wiPk5ldCBQYXk8L2Rpdj5cbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gc2lkZT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtcmlnaHRcIj7igrE4OTAuMDA8L2Rpdj5cbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgIDwvcS1saXN0PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8L3EtY2FyZD5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmIH0gZnJvbSBcInZ1ZVwiO1xuXG5jb25zdCByZWd1bGFyUGF5ID0gNDgwLjA7XG5cbmNvbnN0IGZvcm1hdHRlZFJlZ3VsYXIgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQoXCJlbi1QSFwiLCB7XG4gIHN0eWxlOiBcImN1cnJlbmN5XCIsXG4gIGN1cnJlbmN5OiBcIlBIUFwiLFxuICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG59KS5mb3JtYXQocmVndWxhclBheSk7XG5cbmNvbnNvbGUubG9nKGZvcm1hdHRlZFJlZ3VsYXIpO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5lbGVnYW50LWNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQ6ICNmOWY5Zjk7XG4gIHBhZGRpbmc6IDJyZW07XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgY29sb3I6ICMzMzM7XG59XG4udXNlci1wcm9maWxlLXBhZ2Uge1xuICBtYXgtd2lkdGg6IDEyMDBweDtcbiAgbWFyZ2luOiBhdXRvO1xufVxuXG4ucHJvZmlsZS1jYXJkLFxuLmFjY291bnQtY2FyZCxcbi5iaWxscy1jYXJkIHtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgYm94LXNoYWRvdzogMCA0cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xufVxuXG4ucHJvZmlsZS1jYXJkIHEtY2FyZC1zZWN0aW9uOmZpcnN0LWNoaWxkIHtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbn1cblxuLnEtbGlzdCBxLWl0ZW0ge1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAvKiBwYWRkaW5nOiAxcmVtIDAuNXJlbTsgKi9cbn1cblxuLnEtbGlzdCBxLWl0ZW06bm90KDpsYXN0LWNoaWxkKSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xufVxuXG4ucS1saXN0IHEtaXRlbS1zZWN0aW9uIHtcbiAgY29sb3I6ICM2Njc7XG4gIGZvbnQtc2l6ZTogMC45cmVtO1xufVxuXG4ucS1saXN0IHEtaXRlbS1zZWN0aW9uOmZpcnN0LWNoaWxkIHtcbiAgZmxleDogMSAxIGF1dG87XG59XG5cbi5xLWxpc3QgcS1pdGVtLXNlY3Rpb25bc2lkZV0ge1xuICBmbGV4OiAwIDAgYXV0bztcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJxLXBhLXhtXCI+XG4gICAgPGRpdiBjbGFzcz1cInJvdyBxLW1hLXNtXCI+XG4gICAgICA8cS1idG4gZmxhdCBkZW5zZSBpY29uPVwiYXJyb3dfYmFja19pb3NcIiByb3VuZGVkIHRvPVwiL2FkbWluL3VzZXJzXCIgLz5cbiAgICAgIDxxLWJ0biBkZW5zZSBsYWJlbD1cIkNhc2ggQWR2YW5jZSAvIENBXCIgLz5cbiAgICAgIDxxLWJ0biBkZW5zZSBsYWJlbD1cIlVuaWZvcm1cIiAvPlxuICAgICAgPHEtYnRuIGRlbnNlIGxhYmVsPVwiQmVuZWZpdHNcIiAvPlxuICAgICAgPHEtYnRuIGRlbnNlIGxhYmVsPVwiXCIgLz5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInVzZXItcHJvZmlsZS1wYWdlIHEtcGEtbWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWNvbC1ndXR0ZXItbWRcIj5cbiAgICAgICAgICA8IS0tIExlZnQgQ29sdW1uOiBQcm9maWxlIENhcmQgLS0+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMiBjb2wtbWQtNFwiPlxuICAgICAgICAgICAgPFVzZXJQcm9maWxlQ2FyZCAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPCEtLSBSaWdodCBDb2x1bW46IEFjY291bnRzIGFuZCBCaWxscyBDYXJkcyAtLT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTEyIGNvbC1tZC04XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtY29sLWd1dHRlci1tZFwiPlxuICAgICAgICAgICAgICA8IS0tIE15IFNjaGVkdWxlIENhcmQgLS0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTJcIj5cbiAgICAgICAgICAgICAgICA8VXNlclBheVNsaXBDYXJkIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDwhLS0gQmlsbHMgQ2FyZCAtLT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMlwiPlxuICAgICAgICAgICAgICAgIDxxLWNhcmQgY2xhc3M9XCJiaWxscy1jYXJkIHEtcGEtbWRcIj5cbiAgICAgICAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5NeSBCaWxsczwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxxLWxpc3Qgc2VwYXJhdG9yPlxuICAgICAgICAgICAgICAgICAgICA8IS0tIDxxLWl0ZW0gdi1mb3I9XCJiaWxsIGluIHVzZXIuYmlsbHNcIiA6a2V5PVwiYmlsbC5pZFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj57eyBiaWxsLm5hbWUgfX08L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBzaWRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHEtaWNvblxuICAgICAgICAgICAgICAgICAgICAgICAgICA6bmFtZT1cImJpbGwucGFpZCA/ICdjaGVja19jaXJjbGUnIDogJ2NhbmNlbCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA6Y29sb3I9XCJiaWxsLnBhaWQgPyAnZ3JlZW4nIDogJ3JlZCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDpsYWJlbD1cImJpbGwucGFpZCA/ICdCaWxsIFBhaWQnIDogJ05vdCBQYWlkJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPiAtLT5cbiAgICAgICAgICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICAgICAgICAgIDwvcS1jYXJkPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwidnVlLXJvdXRlclwiO1xuaW1wb3J0IFVzZXJQcm9maWxlQ2FyZCBmcm9tIFwiLi9jb21wb25lbnRzL1VzZXJQcm9maWxlQ2FyZC52dWVcIjtcbmltcG9ydCBVc2VyUGF5U2xpcENhcmQgZnJvbSBcIi4vY29tcG9uZW50cy9Vc2VyUGF5U2xpcENhcmQudnVlXCI7XG5cbmNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4vLyBjb25zdCB1c2VyID0gcmVhY3RpdmUoe1xuLy8gICBuYW1lOiBcIkpvaG4gTWFzaCBEb2VcIixcbi8vICAgcG9zaXRpb246IFwiU3VwZXIgQWRtaW5cIixcbi8vICAgZW1haWw6IFwiam9obi5kb2UxMjNAZ21haWwuY29tXCIsXG4vLyAgIHBob25lOiBcIisoNjMpIDExMSAtIDExMSAtIDExMTFcIixcbi8vICAgYWRkcmVzczogXCJTdHJlZXQgMTIzXCIsXG4vLyAgIGFjY291bnRzOiB7XG4vLyAgICAgYWN0aXZlOiBcIjk4NDQgNTYwMCA4MjM0IDQyNTZcIixcbi8vICAgICBibG9ja2VkOiBcIjk4NDQgNTYwMCA4MjM0IDEyMzRcIixcbi8vICAgfSxcbi8vICAgYmlsbHM6IFtcbi8vICAgICB7IGlkOiAxLCBuYW1lOiBcIk1vbnRobHkgQmlsbFwiLCBwYWlkOiB0cnVlIH0sXG4vLyAgICAgeyBpZDogMiwgbmFtZTogXCJNb250aGx5IEJpbGxcIiwgcGFpZDogZmFsc2UgfSxcbi8vICAgICB7IGlkOiAzLCBuYW1lOiBcIk1vbnRobHkgQmlsbFwiLCBwYWlkOiB0cnVlIH0sXG4vLyAgICAgeyBpZDogNCwgbmFtZTogXCJNb250aGx5IEJpbGxcIiwgcGFpZDogZmFsc2UgfSxcbi8vICAgXSxcbi8vIH0pO1xuXG5mdW5jdGlvbiBzYXZlUHJvZmlsZSgpIHtcbiAgY29uc29sZS5sb2coXCJQcm9maWxlIHNhdmVkOlwiLCB1c2VyKTtcbn1cblxuZnVuY3Rpb24gYmxvY2tBY2NvdW50KGFjY291bnRUeXBlKSB7XG4gIGNvbnNvbGUubG9nKGBCbG9jayAke2FjY291bnRUeXBlfSBhY2NvdW50YCk7XG59XG5cbmZ1bmN0aW9uIHVubG9ja0FjY291bnQoYWNjb3VudFR5cGUpIHtcbiAgY29uc29sZS5sb2coYFVubG9jayAke2FjY291bnRUeXBlfSBhY2NvdW50YCk7XG59XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5lbGVnYW50LWNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQ6ICNmOWY5Zjk7XG4gIHBhZGRpbmc6IDJyZW07XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgY29sb3I6ICMzMzM7XG59XG4udXNlci1wcm9maWxlLXBhZ2Uge1xuICBtYXgtd2lkdGg6IDEyMDBweDtcbiAgbWFyZ2luOiBhdXRvO1xufVxuXG4ucHJvZmlsZS1jYXJkLFxuLmFjY291bnQtY2FyZCxcbi5iaWxscy1jYXJkIHtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgYm94LXNoYWRvdzogMCA0cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xufVxuXG4ucHJvZmlsZS1jYXJkIHEtY2FyZC1zZWN0aW9uOmZpcnN0LWNoaWxkIHtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbn1cblxuLnEtbGlzdCBxLWl0ZW0ge1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAvKiBwYWRkaW5nOiAxcmVtIDAuNXJlbTsgKi9cbn1cblxuLnEtbGlzdCBxLWl0ZW06bm90KDpsYXN0LWNoaWxkKSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTBlMGUwO1xufVxuXG4ucS1saXN0IHEtaXRlbS1zZWN0aW9uIHtcbiAgY29sb3I6ICM2Njc7XG4gIGZvbnQtc2l6ZTogMC45cmVtO1xufVxuXG4ucS1saXN0IHEtaXRlbS1zZWN0aW9uOmZpcnN0LWNoaWxkIHtcbiAgZmxleDogMSAxIGF1dG87XG59XG5cbi5xLWxpc3QgcS1pdGVtLXNlY3Rpb25bc2lkZV0ge1xuICBmbGV4OiAwIDAgYXV0bztcbn1cblxuLnEtYnRuIHtcbiAgbWluLXdpZHRoOiA5MHB4O1xufVxuXG4ucS1idG5bZmxhdF0ge1xuICBwYWRkaW5nOiAwIDhweDtcbn1cblxuLmVtYWlsLWNvbnRhaW5lciB7XG4gIG1heC13aWR0aDogNDAwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uZW1haWwtZGlzcGxheSB7XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4ycyBlYXNlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLmVtYWlsLWRpc3BsYXk6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMDQpO1xufVxuXG4uZW1haWwtdGV4dCB7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgY29sb3I6ICMzMzM7XG4gIG1hcmdpbi1yaWdodDogOHB4O1xufVxuXG4uZWRpdC1pY29uIHtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGVhc2U7XG59XG5cbi5lbWFpbC1kaXNwbGF5OmhvdmVyIC5lZGl0LWljb24ge1xuICBvcGFjaXR5OiAxO1xufVxuXG4ucS1wb3B1cC1lZGl0IHtcbiAgbWF4LXdpZHRoOiAzMDBweDtcbn1cblxuLnBvcHVwLWlucHV0IHtcbiAgZm9udC1zaXplOiAwLjlyZW07XG4gIHBhZGRpbmc6IDhweCAxMnB4O1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIkxvYWRpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVLQSxV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LFVBQVU7QUFFcEIsWUFBUSxJQUFJLGdCQUFnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqTGIsY0FBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
