import { _ as _export_sfc, n as ref, t as reactive, g as computed, o as openBlock, a4 as createElementBlock, J as createBaseVNode, a as createVNode, M as QBtn, w as withCtx, Q as QCard, I as QCardSection, K as QInput, a3 as QDialog, a5 as Fragment, S as pushScopeId, T as popScopeId, u as watch, c as createBlock, L as QIcon, bd as QSpinner, be as createCommentVNode, O as createTextVNode, a6 as renderList, R as toDisplayString, N as Notify, z as onMounted, a2 as QSeparator, af as withDirectives } from "./index.c8e2405b.js";
import { u as useSalesReportsStore } from "./sales-report.c65bf2b1.js";
import { Q as QItem, a as QItemSection } from "./QItem.76557ad9.js";
import { a as QItemLabel, Q as QField } from "./rtl.b1b38f21.js";
import { Q as QList } from "./QList.d5d13fac.js";
import { u as useEmployeeStore } from "./employee.08e2bc37.js";
import { u as useUsersStore } from "./user.9d28a441.js";
import { Q as QTable } from "./QTable.d3fb87f5.js";
import { C as ClosePopup } from "./ClosePopup.649d85d8.js";
import "./axios.aa1bce92.js";
import "./QVirtualScroll.41a98cb7.js";
import "./use-virtual-scroll.5b4ab88d.js";
import "./QSelect.0985e28e.js";
import "./QMenu.4f670399.js";
import "./selection.94057980.js";
var DenominationReport_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$3 = (n) => (pushScopeId("data-v-b6477df8"), n = n(), popScopeId(), n);
const _hoisted_1$a = { class: "row justify-between" };
const _hoisted_2$a = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Demomination Report", -1));
const _hoisted_3$a = { class: "q-pa-md row q-gutter-md justify-between" };
const _hoisted_4$9 = { class: "col-6" };
const _hoisted_5$3 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_6$2 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "1000 Bills:", -1));
const _hoisted_7$2 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_8$2 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "500 Bills:", -1));
const _hoisted_9$2 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_10$1 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "200 Bills:", -1));
const _hoisted_11$1 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_12$1 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "100 Bills:", -1));
const _hoisted_13 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_14 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "50 Bills:", -1));
const _hoisted_15 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_16 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "20 Bills:", -1));
const _hoisted_17 = { class: "col-5" };
const _hoisted_18 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_19 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "20 coins:", -1));
const _hoisted_20 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_21 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "10 coins:", -1));
const _hoisted_22 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_23 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "5 coins:", -1));
const _hoisted_24 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_25 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "1 coins:", -1));
const _hoisted_26 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_27 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "25 cents:", -1));
const _hoisted_28 = {
  class: "text-h6 q-mt-md",
  align: "center"
};
const _hoisted_29 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "Total Denomination", -1));
const _hoisted_30 = { align: "right" };
const _sfc_main$a = {
  __name: "DenominationReport",
  setup(__props) {
    const salesReportsStore = useSalesReportsStore();
    const dialog = ref(false);
    const openDialog = () => {
      dialog.value = true;
    };
    const closeBtn = () => {
      dialog.value = false;
    };
    const denominationData = reactive({
      oneThousandBills: 0,
      fiveHundredBills: 0,
      twoHundredBills: 0,
      oneHundredBills: 0,
      fiftyBills: 0,
      twentyBills: 0,
      twentyCoins: 0,
      tenCoins: 0,
      fiveCoins: 0,
      oneCoins: 0,
      twentyFiveCents: 0
    });
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    };
    const totalDenomination = computed(() => {
      return denominationData.oneThousandBills * 1e3 + denominationData.fiveHundredBills * 500 + denominationData.twoHundredBills * 200 + denominationData.oneHundredBills * 100 + denominationData.fiftyBills * 50 + denominationData.twentyBills * 20 + denominationData.twentyCoins * 20 + denominationData.tenCoins * 10 + denominationData.fiveCoins * 5 + denominationData.oneCoins * 1 + denominationData.twentyFiveCents * 0.25;
    });
    const totalDenominationFormat = computed(() => {
      return formatCurrency(totalDenomination.value);
    });
    const handleSubmit = () => {
      const rawTotalDenomination = totalDenomination.value;
      salesReportsStore.getDenominationData(denominationData);
      salesReportsStore.updateDenominationTotal(rawTotalDenomination);
      salesReportsStore.calculateCharges(rawTotalDenomination);
      console.log("Denomination Data:", denominationData);
      console.log("Raw Total Denomination:", rawTotalDenomination);
      console.log("Formatted Total Denomination:", totalDenominationFormat.value);
      closeBtn();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", null, [
          createVNode(QBtn, {
            class: "bg-gradient text-white",
            outlined: "",
            label: "Denomination Report",
            onClick: openDialog
          })
        ]),
        createVNode(QDialog, {
          modelValue: dialog.value,
          "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => dialog.value = $event),
          persistent: ""
        }, {
          default: withCtx(() => [
            createVNode(QCard, { style: { "width": "700px" } }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "bg-gradient text-white" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_1$a, [
                      _hoisted_2$a,
                      createBaseVNode("div", null, [
                        createVNode(QBtn, {
                          flat: "",
                          round: "",
                          dense: "",
                          icon: "close",
                          onClick: closeBtn
                        })
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createBaseVNode("div", _hoisted_3$a, [
                  createBaseVNode("div", _hoisted_4$9, [
                    createBaseVNode("div", _hoisted_5$3, [
                      _hoisted_6$2,
                      createBaseVNode("div", null, [
                        createVNode(QInput, {
                          style: { "width": "100px" },
                          modelValue: denominationData.oneThousandBills,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => denominationData.oneThousandBills = $event),
                          outlined: "",
                          flat: "",
                          dense: "",
                          suffix: "pcs"
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_7$2, [
                      _hoisted_8$2,
                      createBaseVNode("div", null, [
                        createVNode(QInput, {
                          style: { "width": "100px" },
                          modelValue: denominationData.fiveHundredBills,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => denominationData.fiveHundredBills = $event),
                          outlined: "",
                          flat: "",
                          dense: "",
                          suffix: "pcs"
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_9$2, [
                      _hoisted_10$1,
                      createBaseVNode("div", null, [
                        createVNode(QInput, {
                          style: { "width": "100px" },
                          modelValue: denominationData.twoHundredBills,
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => denominationData.twoHundredBills = $event),
                          outlined: "",
                          flat: "",
                          dense: "",
                          suffix: "pcs"
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_11$1, [
                      _hoisted_12$1,
                      createBaseVNode("div", null, [
                        createVNode(QInput, {
                          style: { "width": "100px" },
                          modelValue: denominationData.oneHundredBills,
                          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => denominationData.oneHundredBills = $event),
                          outlined: "",
                          flat: "",
                          dense: "",
                          suffix: "pcs"
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_13, [
                      _hoisted_14,
                      createBaseVNode("div", null, [
                        createVNode(QInput, {
                          style: { "width": "100px" },
                          modelValue: denominationData.fiftyBills,
                          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => denominationData.fiftyBills = $event),
                          outlined: "",
                          flat: "",
                          dense: "",
                          suffix: "pcs"
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_15, [
                      _hoisted_16,
                      createBaseVNode("div", null, [
                        createVNode(QInput, {
                          style: { "width": "100px" },
                          modelValue: denominationData.twentyBills,
                          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => denominationData.twentyBills = $event),
                          outlined: "",
                          flat: "",
                          dense: "",
                          suffix: "pcs"
                        }, null, 8, ["modelValue"])
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_17, [
                    createBaseVNode("div", _hoisted_18, [
                      _hoisted_19,
                      createBaseVNode("div", null, [
                        createVNode(QInput, {
                          style: { "width": "100px" },
                          modelValue: denominationData.twentyCoins,
                          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => denominationData.twentyCoins = $event),
                          outlined: "",
                          flat: "",
                          dense: "",
                          suffix: "pcs"
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_20, [
                      _hoisted_21,
                      createBaseVNode("div", null, [
                        createVNode(QInput, {
                          style: { "width": "100px" },
                          modelValue: denominationData.tenCoins,
                          "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => denominationData.tenCoins = $event),
                          outlined: "",
                          flat: "",
                          dense: "",
                          suffix: "pcs"
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_22, [
                      _hoisted_23,
                      createBaseVNode("div", null, [
                        createVNode(QInput, {
                          style: { "width": "100px" },
                          modelValue: denominationData.fiveCoins,
                          "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => denominationData.fiveCoins = $event),
                          outlined: "",
                          flat: "",
                          dense: "",
                          suffix: "pcs"
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_24, [
                      _hoisted_25,
                      createBaseVNode("div", null, [
                        createVNode(QInput, {
                          style: { "width": "100px" },
                          modelValue: denominationData.oneCoins,
                          "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => denominationData.oneCoins = $event),
                          outlined: "",
                          flat: "",
                          dense: "",
                          suffix: "pcs"
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_26, [
                      _hoisted_27,
                      createBaseVNode("div", null, [
                        createVNode(QInput, {
                          style: { "width": "100px" },
                          modelValue: denominationData.twentyFiveCents,
                          "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => denominationData.twentyFiveCents = $event),
                          outlined: "",
                          flat: "",
                          dense: "",
                          suffix: "pcs"
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_28, [
                      _hoisted_29,
                      createBaseVNode("div", null, [
                        createVNode(QInput, {
                          modelValue: totalDenominationFormat.value,
                          "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => totalDenominationFormat.value = $event),
                          outlined: "",
                          readonly: ""
                        }, null, 8, ["modelValue"])
                      ])
                    ])
                  ])
                ]),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_30, [
                      createVNode(QBtn, {
                        color: "red-6",
                        label: "Submit",
                        class: "q-pa-sm",
                        size: "md",
                        onClick: handleSubmit
                      })
                    ])
                  ]),
                  _: 1
                })
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
var DenominationReport = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-b6477df8"], ["__file", "DenominationReport.vue"]]);
var EmployeeCreditReport_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-1e516e1c"), n = n(), popScopeId(), n);
const _hoisted_1$9 = { class: "row justify-between" };
const _hoisted_2$9 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Employee Credits", -1));
const _hoisted_3$9 = { class: "q-gutter-y-md" };
const _hoisted_4$8 = {
  key: 0,
  class: "custom-list z-top"
};
const _hoisted_5$2 = { class: "row q-gutter-sm" };
const _hoisted_6$1 = {
  key: 0,
  class: "custom-list z-top"
};
const _hoisted_7$1 = { align: "right" };
const _hoisted_8$1 = { class: "row justify-between" };
const _hoisted_9$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, "Credits Total", -1));
const _sfc_main$9 = {
  __name: "EmployeeCreditReport",
  setup(__props) {
    const userDataStore = useUsersStore();
    computed(() => userDataStore.users);
    const employeeStore = useEmployeeStore();
    const employees = computed(() => employeeStore.branchEmployees);
    const salesReportsStore = useSalesReportsStore();
    const productSearchData = computed(() => salesReportsStore.products);
    console.log("products search", productSearchData.value);
    const userData = salesReportsStore.user;
    console.log("userdata", userData);
    const dialog = ref(false);
    const searchQuery2 = ref("");
    const productSearch = ref("");
    const showUserCard = ref(false);
    const showProductCard = ref(false);
    let userSelected = false;
    let productsSelected = false;
    const loading = ref(false);
    const employeeSearchLoading = ref(false);
    const productSearchLoading = ref(false);
    const searchUsers = async () => {
      var _a, _b, _c;
      if (searchQuery2.value) {
        employeeSearchLoading.value = true;
        const branchId = ((_c = (_b = (_a = userData == null ? void 0 : userData.data) == null ? void 0 : _a.employee) == null ? void 0 : _b.branch_employee) == null ? void 0 : _c.branch_id) || "";
        console.log("searchQuery.value", searchQuery2.value);
        console.log("branchId", branchId);
        await employeeStore.searchEmployeeWithBranchID(searchQuery2.value, branchId);
        employeeSearchLoading.value = false;
        showUserCard.value = true;
      }
    };
    const openDialog = () => {
      dialog.value = true;
    };
    const closeBtn = () => {
      dialog.value = false;
    };
    const creditForm = reactive({
      credit_user_id: "",
      name: "",
      product_id: "",
      productName: "",
      price: 0,
      pieces: "",
      creditTotal: 0
    });
    const clear = () => {
      searchQuery2.value = "";
      productSearch.value = "";
      creditForm.credit_user_id = "";
      creditForm.name = "";
      creditForm.product_id = "";
      creditForm.productName = "";
      creditForm.price = "";
      creditForm.pieces = "";
      creditForm.creditTotal = "";
      creditList.value = [];
    };
    const clearProduct = () => {
      productSearch.value = "";
      creditForm.product_id = "";
      creditForm.productName = "";
      creditForm.price = "";
      creditForm.pieces = "";
    };
    const isDropdownVisible = computed(() => {
      return searchQuery2.value && employees.value.length > 0;
    });
    const autoFillUser = (user) => {
      console.log("credit", user);
      searchQuery2.value = `${user.employee.firstname} ${user.employee.middlename ? user.employee.middlename.charAt(0) + "." : ""} ${user.employee.lastname}`;
      creditForm.credit_user_id = user.employee.id;
      creditForm.name = `${user.employee.firstname} ${user.employee.middlename ? user.employee.middlename.charAt(0) + "." : ""} ${user.employee.lastname}`;
      userSelected = true;
      showUserCard.value = false;
    };
    const searchProducts = async () => {
      var _a, _b, _c;
      if (productSearch.value) {
        productSearchLoading.value = true;
        const branchId = ((_c = (_b = (_a = userData == null ? void 0 : userData.data) == null ? void 0 : _a.employee) == null ? void 0 : _b.branch_employee) == null ? void 0 : _c.branch_id) || "";
        const response = await salesReportsStore.searchBranchProducts(
          productSearch.value,
          branchId
        );
        console.log("response", response);
        productSearchLoading.value = false;
        showProductCard.value = true;
      }
    };
    const isDropDownProductVisible = computed(() => {
      return productSearch.value && productSearchData.value.length > 0;
    });
    console.log("Product search datasss:", productSearchData.value);
    const autoFillProduct = (product) => {
      productSearch.value = product.name;
      creditForm.productName = product.name;
      creditForm.product_id = product.id;
      creditForm.price = product.price;
      productsSelected = true;
      showProductCard.value = false;
    };
    const productCreditTotalAmount = ref("");
    const creditList = ref([]);
    const calculateProductCreditTotalAmount = () => {
      const price = parseFloat(creditForm.price);
      const pieces = parseInt(creditForm.pieces);
      if (!isNaN(price) && !isNaN(pieces)) {
        const totalAmount = price * pieces;
        productCreditTotalAmount.value = totalAmount.toFixed(2);
      } else {
        productCreditTotalAmount.value = "";
      }
      console.log("productCreditTotalAmount", productCreditTotalAmount.value);
    };
    const addCreditToList = () => {
      const totalAmount = productCreditTotalAmount.value;
      creditList.value.push({
        credit_user_id: creditForm.credit_user_id,
        product_id: creditForm.product_id,
        name: creditForm.name,
        productName: creditForm.productName,
        price: creditForm.price,
        pieces: creditForm.pieces,
        totalAmount
      });
      clearProduct();
    };
    const removeCredit = (index) => {
      creditList.value.splice(index, 1);
    };
    watch(searchQuery2, (newQuery) => {
      if (newQuery.length > 2 && !userSelected) {
        searchUsers();
      } else {
        showUserCard.value = false;
      }
      userSelected = false;
    });
    watch(productSearch, (newQuery) => {
      if (newQuery.length > 2 && !productsSelected) {
        searchProducts();
      } else {
        showProductCard.value = false;
      }
      productsSelected = false;
    });
    watch(
      creditList,
      (newList) => {
        const total = newList.reduce((sum, credit) => {
          return sum + parseFloat(credit.totalAmount);
        }, 0);
        creditForm.creditTotal = total.toFixed(2);
      },
      { deep: true }
    );
    watch(
      [() => creditForm.price, () => creditForm.pieces],
      calculateProductCreditTotalAmount
    );
    watch(productCreditTotalAmount, (newVal) => {
      console.log("productCreditTotalAmoun", newVal);
    });
    const handleSubmit = () => {
      var _a, _b, _c;
      const formattedTotalAmount = parseFloat(creditForm.creditTotal);
      const employeeCreditReport = {
        user_id: userData == null ? void 0 : userData.data.id,
        branch_id: ((_c = (_b = (_a = userData == null ? void 0 : userData.data) == null ? void 0 : _a.employee) == null ? void 0 : _b.branch_employee) == null ? void 0 : _c.branch_id) || "",
        credit_user_id: creditForm.credit_user_id,
        credit_user_name: creditForm.name,
        total_amount: formattedTotalAmount,
        credits: creditList.value.map((credit) => {
          var _a2, _b2, _c2;
          return {
            credit_user_id: credit.credit_user_id,
            branch_id: ((_c2 = (_b2 = (_a2 = userData == null ? void 0 : userData.data) == null ? void 0 : _a2.employee) == null ? void 0 : _b2.branch_employee) == null ? void 0 : _c2.branch_id) || "",
            productName: credit.productName,
            product_id: credit.product_id,
            price: credit.price,
            pieces: credit.pieces
          };
        })
      };
      salesReportsStore.updateEmployeeCreditReports(employeeCreditReport);
      console.log("employeeCreditReport:", employeeCreditReport);
      Notify.create({
        type: "positive",
        message: "Expenses Submitted",
        timeout: 1e3
      });
      dialog.value = false;
      clear();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", null, [
          createVNode(QBtn, {
            class: "bg-gradient text-white",
            outlined: "",
            label: "Credits Report",
            onClick: openDialog
          })
        ]),
        createVNode(QDialog, {
          modelValue: dialog.value,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => dialog.value = $event),
          persistent: ""
        }, {
          default: withCtx(() => [
            createVNode(QCard, { style: { "width": "450px" } }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "bg-gradient text-white" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_1$9, [
                      _hoisted_2$9,
                      createBaseVNode("div", null, [
                        createVNode(QBtn, {
                          flat: "",
                          round: "",
                          dense: "",
                          icon: "close",
                          onClick: closeBtn
                        })
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_3$9, [
                      createBaseVNode("div", null, [
                        createBaseVNode("div", null, [
                          createVNode(QInput, {
                            modelValue: searchQuery2.value,
                            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchQuery2.value = $event),
                            outlined: "",
                            dense: "",
                            rounded: "",
                            debounce: "1000",
                            style: { "width": "415px" },
                            placeholder: "Search Name"
                          }, {
                            append: withCtx(() => [
                              !employeeSearchLoading.value ? (openBlock(), createBlock(QIcon, {
                                key: 0,
                                name: "search"
                              })) : (openBlock(), createBlock(QSpinner, {
                                key: 1,
                                color: "grey",
                                size: "sm"
                              }))
                            ]),
                            default: withCtx(() => [
                              isDropdownVisible.value && showUserCard.value ? (openBlock(), createElementBlock("div", _hoisted_4$8, [
                                createVNode(QCard, null, {
                                  default: withCtx(() => [
                                    createVNode(QList, { separator: "" }, {
                                      default: withCtx(() => [
                                        loading.value ? (openBlock(), createBlock(QItem, { key: 0 }, {
                                          default: withCtx(() => [
                                            createVNode(QItemSection, null, {
                                              default: withCtx(() => [
                                                createVNode(QSpinner, { color: "primary" })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })) : createCommentVNode("", true),
                                        !loading.value && !employees.value.length ? (openBlock(), createBlock(QItem, { key: 1 }, {
                                          default: withCtx(() => [
                                            createVNode(QItemSection, null, {
                                              default: withCtx(() => [
                                                createTextVNode(" No data available in this branch. ")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })) : (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(employees.value, (user) => {
                                          return openBlock(), createBlock(QItem, {
                                            onClick: ($event) => autoFillUser(user),
                                            key: user.id,
                                            clickable: ""
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(QItemSection, null, {
                                                default: withCtx(() => [
                                                  createVNode(QItemLabel, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(`${user.employee.firstname} ${user.employee.middlename ? user.employee.middlename.charAt(0) + "." : ""} ${user.employee.lastname}`), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"]);
                                        }), 128))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }, 8, ["modelValue"])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_5$2, [
                        createBaseVNode("div", null, [
                          createVNode(QInput, {
                            modelValue: productSearch.value,
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => productSearch.value = $event),
                            placeholder: "Search",
                            outlined: "",
                            flat: "",
                            debounce: "500",
                            dense: "",
                            style: { "width": "240px" }
                          }, {
                            append: withCtx(() => [
                              !productSearchLoading.value ? (openBlock(), createBlock(QIcon, {
                                key: 0,
                                name: "search"
                              })) : (openBlock(), createBlock(QSpinner, {
                                key: 1,
                                color: "grey",
                                size: "sm"
                              }))
                            ]),
                            default: withCtx(() => [
                              isDropDownProductVisible.value && showProductCard.value ? (openBlock(), createElementBlock("div", _hoisted_6$1, [
                                createVNode(QCard, null, {
                                  default: withCtx(() => [
                                    createVNode(QList, { separator: "" }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createElementBlock(Fragment, null, renderList(productSearchData.value, (product) => {
                                          return openBlock(), createBlock(QItem, {
                                            onClick: ($event) => autoFillProduct(product),
                                            key: product.name,
                                            clickable: ""
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(QItemSection, null, {
                                                default: withCtx(() => [
                                                  createVNode(QItemLabel, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(product.name), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"]);
                                        }), 128))
                                      ]),
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
                        createBaseVNode("div", null, [
                          createVNode(QInput, {
                            modelValue: creditForm.price,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => creditForm.price = $event),
                            "reverse-fill-mask": "",
                            outlined: "",
                            readonly: "",
                            flat: "",
                            dense: "",
                            style: { "width": "80px" },
                            label: "Price"
                          }, null, 8, ["modelValue"])
                        ]),
                        createBaseVNode("div", null, [
                          createVNode(QInput, {
                            modelValue: creditForm.pieces,
                            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => creditForm.pieces = $event),
                            "reverse-fill-mask": "",
                            outlined: "",
                            type: "number",
                            flat: "",
                            dense: "",
                            style: { "width": "80px" },
                            label: "Pcs"
                          }, null, 8, ["modelValue"])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_7$1, [
                        createVNode(QBtn, {
                          padding: "sm md",
                          size: "xm",
                          icon: "add",
                          dense: "",
                          outline: "",
                          onClick: addCreditToList
                        })
                      ]),
                      createBaseVNode("div", null, [
                        createVNode(QField, {
                          outlined: "",
                          dense: "",
                          readonly: ""
                        }, {
                          control: withCtx(() => [
                            createBaseVNode("div", null, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(creditList.value, (credit, index) => {
                                return openBlock(), createBlock(QItem, {
                                  key: index,
                                  class: "q-gutter-xs"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(QItemSection, {
                                      class: "q-ma-sm text-subtitle2",
                                      side: ""
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(credit.productName), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(QItemSection, {
                                      class: "q-ma-sm q-gutter-sm",
                                      side: ""
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(QItemLabel, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Pcs")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(QItemLabel, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(credit.pieces), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(QItemSection, {
                                      class: "q-ma-sm q-gutter-sm",
                                      side: ""
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(QItemLabel, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Price")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(QItemLabel, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(credit.price), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(QItemSection, {
                                      class: "q-ma-sm q-gutter-sm",
                                      side: ""
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(QItemLabel, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Total")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(QItemLabel, { caption: "" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(credit.totalAmount), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(QItemSection, { side: "" }, {
                                      default: withCtx(() => [
                                        createVNode(QBtn, {
                                          onClick: ($event) => removeCredit(index),
                                          color: "negative",
                                          icon: "clear",
                                          dense: "",
                                          flat: "",
                                          round: "",
                                          class: "text-red"
                                        }, null, 8, ["onClick"])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      createBaseVNode("div", _hoisted_8$1, [
                        createBaseVNode("div", null, [
                          _hoisted_9$1,
                          createVNode(QField, {
                            outlined: "",
                            dense: "",
                            readonly: "",
                            style: { "width": "120px" }
                          }, {
                            control: withCtx(() => [
                              createTextVNode(toDisplayString(creditForm.creditTotal), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(QBtn, {
                          outline: "",
                          dense: "",
                          icon: "add",
                          label: "Add To List",
                          class: "q-pa-sm",
                          size: "sm",
                          onClick: handleSubmit
                        })
                      ])
                    ])
                  ]),
                  _: 1
                })
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
var EmployeeCreditReport = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-1e516e1c"], ["__file", "EmployeeCreditReport.vue"]]);
var ExpensesReport_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-3250f17c"), n = n(), popScopeId(), n);
const _hoisted_1$8 = { class: "row justify-between" };
const _hoisted_2$8 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Expenses", -1));
const _hoisted_3$8 = { class: "q-gutter-y-md" };
const _hoisted_4$7 = { class: "row q-gutter-x-md" };
const _hoisted_5$1 = {
  class: "",
  align: "right"
};
const _sfc_main$8 = {
  __name: "ExpensesReport",
  setup(__props) {
    const userDataStore = useUsersStore();
    const userDataSearch = computed(() => userDataStore.users);
    const salesReportsStore = useSalesReportsStore();
    const userData = salesReportsStore.user;
    const dialog = ref(false);
    computed(() => {
      return searchQuery.value && userDataSearch.value.length > 0;
    });
    const expensesForm = reactive({
      user_expense_id: "",
      name: "",
      amount: 0,
      description: ""
    });
    const openDialog = () => {
      dialog.value = true;
    };
    const closeBtn = () => {
      dialog.value = false;
    };
    const clear = () => {
      expensesForm.expense_user_id = "";
      expensesForm.name = "";
      expensesForm.amount = "";
      expensesForm.description = "";
    };
    const handleSubmit = () => {
      var _a, _b, _c;
      const amountAsNumber = parseFloat(expensesForm.amount.replace(",", "."));
      const expenseReport = {
        ...expensesForm,
        user_id: userData == null ? void 0 : userData.data.id,
        branch_id: ((_c = (_b = (_a = userData == null ? void 0 : userData.data) == null ? void 0 : _a.employee) == null ? void 0 : _b.branch_employee) == null ? void 0 : _c.branch_id) || "",
        amount: amountAsNumber
      };
      salesReportsStore.updateExpensesReport(expenseReport);
      Notify.create({
        type: "positive",
        message: "Expenses Submitted",
        timeout: 1e3
      });
      clear();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", null, [
          createVNode(QBtn, {
            class: "bg-gradient text-white",
            outlined: "",
            label: "Expenses Report",
            onClick: openDialog
          })
        ]),
        createVNode(QDialog, {
          modelValue: dialog.value,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => dialog.value = $event)
        }, {
          default: withCtx(() => [
            createVNode(QCard, { style: { "width": "450px" } }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "bg-gradient text-white" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_1$8, [
                      _hoisted_2$8,
                      createBaseVNode("div", null, [
                        createVNode(QBtn, {
                          flat: "",
                          round: "",
                          dense: "",
                          icon: "close",
                          onClick: closeBtn
                        })
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_3$8, [
                      createBaseVNode("div", _hoisted_4$7, [
                        createBaseVNode("div", null, [
                          createVNode(QInput, {
                            modelValue: expensesForm.name,
                            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => expensesForm.name = $event),
                            outlined: "",
                            dense: "",
                            style: { "width": "300px" },
                            placeholder: "Name"
                          }, null, 8, ["modelValue"])
                        ]),
                        createBaseVNode("div", null, [
                          createVNode(QInput, {
                            modelValue: expensesForm.amount,
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => expensesForm.amount = $event),
                            "reverse-fill-mask": "",
                            outlined: "",
                            type: "number",
                            dense: "",
                            style: { "width": "100px" },
                            label: "Amount"
                          }, null, 8, ["modelValue"])
                        ])
                      ]),
                      createBaseVNode("div", null, [
                        createVNode(QInput, {
                          modelValue: expensesForm.description,
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => expensesForm.description = $event),
                          placeholder: "Description",
                          outlined: "",
                          autogrow: "",
                          style: { "width": "415px" }
                        }, null, 8, ["modelValue"])
                      ]),
                      createBaseVNode("div", _hoisted_5$1, [
                        createVNode(QBtn, {
                          outline: "",
                          dense: "",
                          icon: "add",
                          label: "Add To List",
                          class: "q-pa-sm",
                          size: "sm",
                          onClick: handleSubmit
                        })
                      ])
                    ])
                  ]),
                  _: 1
                })
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
var ExpensesReport = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-3250f17c"], ["__file", "ExpensesReport.vue"]]);
var OverAllTotal_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-3ab76794"), n = n(), popScopeId(), n);
const _hoisted_1$7 = { class: "row q-gutter-sm justify-between" };
const _hoisted_2$7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Bread Total Amount", -1));
const _hoisted_3$7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Selecta Total Amount", -1));
const _hoisted_4$6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Softdrinks Total Amount", -1));
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Expenses Total Amount", -1));
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Credits Total Amount", -1));
const _hoisted_7 = { class: "row q-my-lg justify-between" };
const _hoisted_8 = { class: "q-gutter-sm q-my-md" };
const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light text-h6 q-mt-md" }, "Charges Total", -1));
const _hoisted_10 = { class: "q-gutter-sm q-my-md" };
const _hoisted_11 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-bold text-h6 q-mt-md" }, "Total Sales", -1));
const _hoisted_12 = {
  class: "q-my-md",
  align: "right"
};
const _sfc_main$7 = {
  __name: "OverAllTotal",
  setup(__props) {
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    };
    const salesReportsStore = useSalesReportsStore();
    const breadTotal = computed(() => salesReportsStore.breadTotalAmount);
    const selectaTotal = computed(() => salesReportsStore.selectaTotalAmount);
    const softdrinksTotal = computed(() => salesReportsStore.softdrinksTotalAmount);
    const expensesTotal = computed(() => salesReportsStore.expensesSumAmount);
    const creditsTotal = computed(() => salesReportsStore.creditTotalAmount);
    const chargesTotal = computed(() => salesReportsStore.getCharges);
    const denominationTotal = computed(
      () => salesReportsStore.getDenominationTotal
    );
    const totalSalesAmount = computed(() => {
      return breadTotal.value + selectaTotal.value + softdrinksTotal.value + expensesTotal.value;
    });
    const breadTotalFormatted = computed(() => formatCurrency(breadTotal.value));
    const selectaTotalFormatted = computed(
      () => formatCurrency(selectaTotal.value)
    );
    const softdrinksTotalFormatted = computed(
      () => formatCurrency(softdrinksTotal.value)
    );
    const expensesTotalFormatted = computed(
      () => formatCurrency(expensesTotal.value)
    );
    const creditsTotalFormatted = computed(
      () => formatCurrency(creditsTotal.value)
    );
    computed(
      () => formatCurrency(totalSalesAmount.value)
    );
    const denominationTotalFormatted = computed(
      () => formatCurrency(denominationTotal.value)
    );
    const chargesTotalFormatted = computed(
      () => formatCurrency(chargesTotal.value)
    );
    const handleSubmit = async () => {
      try {
        await salesReportsStore.submitSalesReports();
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$7, [
          createBaseVNode("div", null, [
            _hoisted_2$7,
            createBaseVNode("div", null, [
              createVNode(QInput, {
                modelValue: breadTotalFormatted.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => breadTotalFormatted.value = $event),
                readonly: "",
                outlined: "",
                dense: "",
                style: { "width": "150px" }
              }, null, 8, ["modelValue"])
            ])
          ]),
          createBaseVNode("div", null, [
            _hoisted_3$7,
            createBaseVNode("div", null, [
              createVNode(QInput, {
                modelValue: selectaTotalFormatted.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => selectaTotalFormatted.value = $event),
                readonly: "",
                outlined: "",
                dense: "",
                style: { "width": "150px" }
              }, null, 8, ["modelValue"])
            ])
          ]),
          createBaseVNode("div", null, [
            _hoisted_4$6,
            createBaseVNode("div", null, [
              createVNode(QInput, {
                modelValue: softdrinksTotalFormatted.value,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => softdrinksTotalFormatted.value = $event),
                readonly: "",
                outlined: "",
                dense: "",
                style: { "width": "150px" }
              }, null, 8, ["modelValue"])
            ])
          ]),
          createBaseVNode("div", null, [
            _hoisted_5,
            createBaseVNode("div", null, [
              createVNode(QInput, {
                modelValue: expensesTotalFormatted.value,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => expensesTotalFormatted.value = $event),
                readonly: "",
                outlined: "",
                dense: "",
                style: { "width": "150px" }
              }, null, 8, ["modelValue"])
            ])
          ]),
          createBaseVNode("div", null, [
            _hoisted_6,
            createBaseVNode("div", null, [
              createVNode(QInput, {
                modelValue: creditsTotalFormatted.value,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => creditsTotalFormatted.value = $event),
                readonly: "",
                outlined: "",
                dense: "",
                style: { "width": "150px" }
              }, null, 8, ["modelValue"])
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_7, [
          createBaseVNode("div", _hoisted_8, [
            _hoisted_9,
            createBaseVNode("div", null, [
              createVNode(QInput, {
                modelValue: chargesTotalFormatted.value,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => chargesTotalFormatted.value = $event),
                readonly: "",
                outlined: "",
                dense: "",
                style: { "width": "180px" }
              }, null, 8, ["modelValue"])
            ])
          ]),
          createBaseVNode("div", _hoisted_10, [
            _hoisted_11,
            createBaseVNode("div", null, [
              createVNode(QInput, {
                modelValue: denominationTotalFormatted.value,
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => denominationTotalFormatted.value = $event),
                readonly: "",
                outlined: "",
                dense: "",
                style: { "width": "180px" }
              }, null, 8, ["modelValue"])
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_12, [
          createVNode(QBtn, {
            padding: "sm md",
            color: "red-6",
            dense: "",
            rounded: "",
            label: "Submit",
            onClick: handleSubmit
          }, {
            default: withCtx(() => [
              createVNode(QIcon, {
                class: "q-mx-sm",
                left: "",
                name: "send"
              })
            ]),
            _: 1
          })
        ])
      ], 64);
    };
  }
};
var OverAllTotal = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-3ab76794"], ["__file", "OverAllTotal.vue"]]);
const _hoisted_1$6 = { class: "q-pa-xm" };
const _hoisted_2$6 = /* @__PURE__ */ createBaseVNode("div", { class: "text-subtitle2 text-weight-light" }, "Softdrinks Report", -1);
const _hoisted_3$6 = { class: "q-py-sm" };
const _hoisted_4$5 = { class: "q-gutter-md" };
const _sfc_main$6 = {
  __name: "SoftdrinksReportField",
  setup(__props) {
    const salesReportsStore = useSalesReportsStore();
    const softdrinksReports = computed(() => salesReportsStore.softdrinksReports);
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    };
    const removeSoftdrink = (index) => {
      salesReportsStore.removeSoftdrink(index);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        _hoisted_2$6,
        createVNode(QField, {
          outlined: "",
          dense: "",
          readonly: ""
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_3$6, [
              createBaseVNode("div", _hoisted_4$5, [
                createBaseVNode("div", null, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(softdrinksReports.value, (softdrinks, index) => {
                    return openBlock(), createBlock(QItem, { key: index }, {
                      default: withCtx(() => [
                        createVNode(QItemSection, {
                          class: "q-ma-sm text-subtitle2",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(softdrinks.name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "q-ma-sm q-gutter-sm",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Beginnings")
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(softdrinks.total), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "q-ma-sm q-gutter-sm",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Remainnings")
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(softdrinks.remainings), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "q-ma-sm q-gutter-sm",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Sold")
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(softdrinks.sold), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "q-ma-sm q-gutter-sm",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Price")
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(formatCurrency(softdrinks.price)), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "q-ma-sm q-gutter-sm",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Sales")
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(formatCurrency(softdrinks.sales)), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "q-ma-sm q-gutter-sm",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QBtn, {
                              color: "red",
                              icon: "close",
                              round: "",
                              dense: "",
                              onClick: ($event) => removeSoftdrink(index)
                            }, null, 8, ["onClick"])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ])
              ])
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
};
var SoftdrinksReportField = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "SoftdrinksReportField.vue"]]);
const _hoisted_1$5 = { class: "q-pa-xm" };
const _hoisted_2$5 = /* @__PURE__ */ createBaseVNode("div", { class: "text-subtitle2 text-weight-light" }, "Selecta Report", -1);
const _hoisted_3$5 = { class: "q-py-sm" };
const _hoisted_4$4 = { class: "q-gutter-md" };
const _sfc_main$5 = {
  __name: "SelectaReportField",
  setup(__props) {
    const salesReportsStore = useSalesReportsStore();
    const selectaReports = computed(() => salesReportsStore.selectaReports);
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    };
    const removeSelecta = (index) => {
      salesReportsStore.removeSelecta(index);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        _hoisted_2$5,
        createVNode(QField, {
          outlined: "",
          dense: "",
          readonly: ""
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_3$5, [
              createBaseVNode("div", _hoisted_4$4, [
                createBaseVNode("div", null, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(selectaReports.value, (selecta, index) => {
                    return openBlock(), createBlock(QItem, { key: index }, {
                      default: withCtx(() => [
                        createVNode(QItemSection, {
                          class: "q-ma-sm text-subtitle2",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(selecta.name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "q-ma-sm q-gutter-sm",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Beginnigs")
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(selecta.total), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "q-ma-sm q-gutter-sm",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Remainnings")
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(selecta.remainings), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "q-ma-sm q-gutter-sm",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Sold")
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(selecta.sold), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "q-ma-sm q-gutter-sm",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Price")
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(formatCurrency(selecta.price)), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "q-ma-sm q-gutter-sm",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Sales")
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(formatCurrency(selecta.sales)), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "q-ma-sm q-gutter-sm",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QBtn, {
                              color: "red",
                              icon: "close",
                              round: "",
                              dense: "",
                              onClick: ($event) => removeSelecta(index)
                            }, null, 8, ["onClick"])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ])
              ])
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
};
var SelectaReportField = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "SelectaReportField.vue"]]);
const _hoisted_1$4 = { class: "q-pa-xm" };
const _hoisted_2$4 = /* @__PURE__ */ createBaseVNode("div", { class: "text-subtitle2 text-weight-light" }, "Bread Report", -1);
const _hoisted_3$4 = { class: "q-py-sm" };
const _hoisted_4$3 = { class: "q-gutter-md" };
const _sfc_main$4 = {
  __name: "BreadReportField",
  setup(__props) {
    const salesReportsStore = useSalesReportsStore();
    const breadReports = computed(() => salesReportsStore.breadReports);
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    };
    const removeBread = (index) => {
      salesReportsStore.removeBread(index);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        _hoisted_2$4,
        createVNode(QField, {
          outlined: "",
          dense: "",
          readonly: ""
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_3$4, [
              createBaseVNode("div", _hoisted_4$3, [
                createBaseVNode("div", null, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(breadReports.value, (bread, index) => {
                    return openBlock(), createBlock(QItem, { key: index }, {
                      default: withCtx(() => [
                        createVNode(QItemSection, {
                          class: "q-ma-sm text-subtitle2",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(bread.name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "q-ma-sm q-gutter-sm",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Beginnings")
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(bread.total), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "q-ma-sm q-gutter-sm",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Remainnings")
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(bread.remaining), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "q-ma-sm q-gutter-sm",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Sold")
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(bread.bread_sold), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "q-ma-sm q-gutter-sm",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Price")
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(formatCurrency(bread.price)), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "q-ma-sm q-gutter-sm",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Sales")
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(formatCurrency(bread.sales)), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "q-ma-sm q-gutter-sm",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QBtn, {
                              color: "red",
                              icon: "close",
                              round: "",
                              dense: "",
                              onClick: ($event) => removeBread(index)
                            }, null, 8, ["onClick"])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ])
              ])
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
};
var BreadReportField = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "BreadReportField.vue"]]);
const _hoisted_1$3 = { class: "q-pa-xm" };
const _hoisted_2$3 = /* @__PURE__ */ createBaseVNode("div", { class: "text-subtitle2 text-weight-light" }, "Expenses Report", -1);
const _hoisted_3$3 = { class: "q-py-sm" };
const _hoisted_4$2 = { class: "q-gutter-md" };
const _sfc_main$3 = {
  __name: "ExpensesReportField",
  setup(__props) {
    const salesReportsStore = useSalesReportsStore();
    const expensesReports = computed(() => salesReportsStore.expensesReports);
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    };
    const removeExpenses = (index) => {
      salesReportsStore.removeExpenses(index);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        _hoisted_2$3,
        createVNode(QField, {
          outlined: "",
          dense: "",
          readonly: ""
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_3$3, [
              createBaseVNode("div", _hoisted_4$2, [
                createBaseVNode("div", null, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(expensesReports.value, (expenses, index) => {
                    return openBlock(), createBlock(QItem, { key: index }, {
                      default: withCtx(() => [
                        createVNode(QItemSection, {
                          class: "q-ma-sm text-subtitle2",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(expenses.name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "q-ma-sm q-gutter-sm",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Description")
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(expenses.description), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "q-ma-sm q-gutter-sm",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Amount")
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(formatCurrency(expenses.amount)), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, {
                          class: "q-ma-sm q-gutter-sm",
                          side: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QBtn, {
                              color: "red",
                              icon: "close",
                              round: "",
                              dense: "",
                              onClick: ($event) => removeExpenses(index)
                            }, null, 8, ["onClick"])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ])
              ])
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
};
var ExpensesReportField = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "ExpensesReportField.vue"]]);
const _hoisted_1$2 = { class: "q-pa-xm" };
const _hoisted_2$2 = /* @__PURE__ */ createBaseVNode("div", { class: "text-subtitle2 text-weight-light" }, "Employee Credit Report", -1);
const _hoisted_3$2 = { class: "q-py-sm" };
const _hoisted_4$1 = { class: "q-gutter-md" };
const _sfc_main$2 = {
  __name: "EmployeeCreditReportField",
  setup(__props) {
    const salesReportsStore = useSalesReportsStore();
    const employeeCreditReport = computed(
      () => salesReportsStore.employeeCreditReports
    );
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    };
    const removeEmployeeCreditReport = (index) => {
      salesReportsStore.removeEmployeeCreditReport(index);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        _hoisted_2$2,
        createVNode(QField, {
          outlined: "",
          dense: "",
          readonly: ""
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_3$2, [
              createBaseVNode("div", _hoisted_4$1, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(employeeCreditReport.value, (report, index) => {
                  return openBlock(), createElementBlock("div", { key: index }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(report.credits, (credit, creditIndex) => {
                      return openBlock(), createBlock(QItem, { key: creditIndex }, {
                        default: withCtx(() => [
                          createVNode(QItemSection, {
                            class: "q-ma-sm text-subtitle2",
                            side: ""
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(report.credit_user_name) + " " + toDisplayString(), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(QItemSection, {
                            class: "q-ma-sm q-gutter-sm",
                            side: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(QItemLabel, null, {
                                default: withCtx(() => [
                                  createTextVNode("Products Name")
                                ]),
                                _: 1
                              }),
                              createVNode(QItemLabel, { caption: "" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(credit.productName), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(QItemSection, {
                            class: "q-ma-sm q-gutter-sm",
                            side: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(QItemLabel, null, {
                                default: withCtx(() => [
                                  createTextVNode("Price")
                                ]),
                                _: 1
                              }),
                              createVNode(QItemLabel, { caption: "" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(formatCurrency(credit.price)), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(QItemSection, {
                            class: "q-ma-sm q-gutter-sm",
                            side: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(QItemLabel, null, {
                                default: withCtx(() => [
                                  createTextVNode("Pcs")
                                ]),
                                _: 1
                              }),
                              createVNode(QItemLabel, { caption: "" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(credit.pieces), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(QItemSection, {
                            class: "q-ma-sm q-gutter-sm",
                            side: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(QItemLabel, null, {
                                default: withCtx(() => [
                                  createTextVNode("Total")
                                ]),
                                _: 1
                              }),
                              createVNode(QItemLabel, { caption: "" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(formatCurrency(report.total_amount)), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(QItemSection, { side: "" }, {
                            default: withCtx(() => [
                              createVNode(QBtn, {
                                color: "red",
                                icon: "close",
                                round: "",
                                dense: "",
                                onClick: ($event) => removeEmployeeCreditReport(index)
                              }, null, 8, ["onClick"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ]);
                }), 128))
              ])
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
};
var EmployeeCreditReportField = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "EmployeeCreditReportField.vue"]]);
const _hoisted_1$1 = { class: "row justify-between" };
const _hoisted_2$1 = { class: "row" };
const _hoisted_3$1 = /* @__PURE__ */ createBaseVNode("div", { class: "row q-pa-md justify-between" }, [
  /* @__PURE__ */ createBaseVNode("div", null, [
    /* @__PURE__ */ createBaseVNode("div", null, "Date: November 11, 2024"),
    /* @__PURE__ */ createTextVNode(" Cashier: Cashier C. Cashier ")
  ]),
  /* @__PURE__ */ createBaseVNode("div", null, "Time: 08:00 PM")
], -1);
const _sfc_main$1 = {
  __name: "ViewOldReports",
  setup(__props) {
    var _a, _b, _c, _d;
    const salesReportStore = useSalesReportsStore();
    const salesReport = computed(() => salesReportStore.salesReport);
    const userData = computed(() => salesReportStore.user);
    const branchId = ((_d = (_c = (_b = (_a = userData.value) == null ? void 0 : _a.data) == null ? void 0 : _b.employee) == null ? void 0 : _c.branch_employee) == null ? void 0 : _d.branch_id) || "";
    console.log("sales branch id", branchId);
    const loading = ref(true);
    const dialog = ref(false);
    const openDialog = () => {
      dialog.value = true;
    };
    onMounted(async () => {
      console.log("Onmounted data", branchId);
      if (branchId) {
        await reloadTableData(branchId);
      }
    });
    const reloadTableData = async (branchId2) => {
      console.log("branch data", branchId2);
      loading.value = true;
      await salesReportStore.fetchSalesReports(branchId2);
      loading.value = false;
    };
    const columns = [
      {
        name: "name",
        required: true,
        label: "Dessert (100g serving)",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true
      },
      {
        name: "calories",
        align: "center",
        label: "Calories",
        field: "calories",
        sortable: true
      },
      { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
      { name: "carbs", label: "Carbs (g)", field: "carbs" },
      { name: "protein", label: "Protein (g)", field: "protein" },
      { name: "sodium", label: "Sodium (mg)", field: "sodium" },
      {
        name: "calcium",
        label: "Calcium (%)",
        field: "calcium",
        sortable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
      },
      {
        name: "iron",
        label: "Iron (%)",
        field: "iron",
        sortable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
      }
    ];
    const rows = [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6,
        carbs: 24,
        protein: 4,
        sodium: 87,
        calcium: "14%",
        iron: "1%"
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9,
        carbs: 37,
        protein: 4.3,
        sodium: 129,
        calcium: "8%",
        iron: "1%"
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16,
        carbs: 23,
        protein: 6,
        sodium: 337,
        calcium: "6%",
        iron: "7%"
      },
      {
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        sodium: 413,
        calcium: "3%",
        iron: "8%"
      },
      {
        name: "Gingerbread",
        calories: 356,
        fat: 16,
        carbs: 49,
        protein: 3.9,
        sodium: 327,
        calcium: "7%",
        iron: "16%"
      },
      {
        name: "Jelly bean",
        calories: 375,
        fat: 0,
        carbs: 94,
        protein: 0,
        sodium: 50,
        calcium: "0%",
        iron: "0%"
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        sodium: 38,
        calcium: "0%",
        iron: "2%"
      },
      {
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        sodium: 562,
        calcium: "0%",
        iron: "45%"
      },
      {
        name: "Donut",
        calories: 452,
        fat: 25,
        carbs: 51,
        protein: 4.9,
        sodium: 326,
        calcium: "2%",
        iron: "22%"
      },
      {
        name: "KitKat",
        calories: 518,
        fat: 26,
        carbs: 65,
        protein: 7,
        sodium: 54,
        calcium: "12%",
        iron: "6%"
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          outline: "",
          class: "text-white q-pa-sm",
          push: "",
          dense: "",
          elevated: "",
          icon: "visibility",
          label: "View Reports",
          onClick: openDialog
        }),
        createVNode(QDialog, {
          modelValue: dialog.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => dialog.value = $event),
          maximized: ""
        }, {
          default: withCtx(() => [
            createVNode(QCard, null, {
              default: withCtx(() => [
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_1$1, [
                      createBaseVNode("div", null, [
                        createBaseVNode("div", _hoisted_2$1, [
                          createVNode(QBtn, {
                            padding: "sm md",
                            size: "sm",
                            dense: "",
                            flat: "",
                            label: "prev",
                            icon: "arrow_back_ios_new"
                          }),
                          createVNode(QSeparator, { vertical: "" }),
                          createVNode(QBtn, {
                            padding: "sm md",
                            size: "sm",
                            dense: "",
                            flat: ""
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" CURRENT")
                            ]),
                            _: 1
                          }),
                          createVNode(QSeparator, { vertical: "" }),
                          createVNode(QBtn, {
                            padding: "sm md",
                            size: "sm",
                            dense: "",
                            flat: "",
                            label: "next",
                            icon: "arrow_forward_ios"
                          })
                        ])
                      ]),
                      createBaseVNode("div", null, [
                        withDirectives(createVNode(QBtn, {
                          size: "md",
                          outline: "",
                          rounded: "",
                          icon: "close",
                          dense: ""
                        }, null, 512), [
                          [ClosePopup]
                        ])
                      ])
                    ])
                  ]),
                  _: 1
                }),
                _hoisted_3$1,
                createVNode(QTable, {
                  title: "",
                  rows,
                  columns,
                  "row-key": "name"
                }),
                createTextVNode(" " + toDisplayString(salesReport.value), 1)
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
var ViewOldReports = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "ViewOldReports.vue"]]);
var ReportPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = { class: "text-h6 text-white" };
const _hoisted_2 = { class: "row q-gutter-md q-mb-lg" };
const _hoisted_3 = { class: "q-mt-md" };
const _hoisted_4 = { class: "q-mt-md q-gutter-y-md" };
const _sfc_main = {
  __name: "ReportPage",
  setup(__props) {
    ref(false);
    reactive([
      {
        name: "Whole Wheat",
        sold: 10,
        price: 5,
        beginning: 20,
        sales: 30
      },
      {
        name: "Sourdough",
        sold: 15,
        price: 7,
        beginning: 25,
        sales: 40
      },
      {
        name: "Pan de Coco",
        sold: 15,
        price: 4,
        beginning: 25,
        sales: 40
      }
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QCard, { flat: "" }, {
        default: withCtx(() => [
          createVNode(QCardSection, {
            class: "row justify-between",
            style: { "background-color": "#ef4444" }
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                createVNode(QIcon, { name: "fa-solid fa-layer-group" }),
                createTextVNode(" Sales Report ")
              ]),
              createBaseVNode("div", null, [
                createVNode(ViewOldReports)
              ])
            ]),
            _: 1
          }),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_2, [
                createBaseVNode("div", null, [
                  createVNode(ExpensesReport)
                ]),
                createBaseVNode("div", null, [
                  createVNode(EmployeeCreditReport)
                ]),
                createBaseVNode("div", null, [
                  createVNode(DenominationReport)
                ])
              ]),
              createBaseVNode("div", _hoisted_3, [
                createVNode(OverAllTotal)
              ]),
              createBaseVNode("div", _hoisted_4, [
                createVNode(EmployeeCreditReportField),
                createVNode(ExpensesReportField),
                createVNode(BreadReportField),
                createVNode(SelectaReportField),
                createVNode(SoftdrinksReportField)
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
var ReportPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-97ed5892"], ["__file", "ReportPage.vue"]]);
export { ReportPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwb3J0UGFnZS43NTZjNmNkMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9zYWxlc19sYWR5L3JlcG9ydC9jb21wb25lbnRzL0Rlbm9taW5hdGlvblJlcG9ydC52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYnJhbmNoL3NhbGVzX2xhZHkvcmVwb3J0L2NvbXBvbmVudHMvRW1wbG95ZWVDcmVkaXRSZXBvcnQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9zYWxlc19sYWR5L3JlcG9ydC9jb21wb25lbnRzL0V4cGVuc2VzUmVwb3J0LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9icmFuY2gvc2FsZXNfbGFkeS9yZXBvcnQvY29tcG9uZW50cy9PdmVyQWxsVG90YWwudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9zYWxlc19sYWR5L3JlcG9ydC9jb21wb25lbnRzL1NvZnRkcmlua3NSZXBvcnRGaWVsZC52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYnJhbmNoL3NhbGVzX2xhZHkvcmVwb3J0L2NvbXBvbmVudHMvU2VsZWN0YVJlcG9ydEZpZWxkLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9icmFuY2gvc2FsZXNfbGFkeS9yZXBvcnQvY29tcG9uZW50cy9CcmVhZFJlcG9ydEZpZWxkLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9icmFuY2gvc2FsZXNfbGFkeS9yZXBvcnQvY29tcG9uZW50cy9FeHBlbnNlc1JlcG9ydEZpZWxkLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9icmFuY2gvc2FsZXNfbGFkeS9yZXBvcnQvY29tcG9uZW50cy9FbXBsb3llZUNyZWRpdFJlcG9ydEZpZWxkLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9icmFuY2gvc2FsZXNfbGFkeS9yZXBvcnQvY29tcG9uZW50cy9WaWV3T2xkUmVwb3J0cy52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYnJhbmNoL3NhbGVzX2xhZHkvcmVwb3J0L1JlcG9ydFBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8cS1idG5cbiAgICAgIGNsYXNzPVwiYmctZ3JhZGllbnQgdGV4dC13aGl0ZVwiXG4gICAgICBvdXRsaW5lZFxuICAgICAgbGFiZWw9XCJEZW5vbWluYXRpb24gUmVwb3J0XCJcbiAgICAgIEBjbGljaz1cIm9wZW5EaWFsb2dcIlxuICAgIC8+XG4gIDwvZGl2PlxuICA8cS1kaWFsb2cgdi1tb2RlbD1cImRpYWxvZ1wiIHBlcnNpc3RlbnQ+XG4gICAgPHEtY2FyZCBzdHlsZT1cIndpZHRoOiA3MDBweFwiPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwiYmctZ3JhZGllbnQgdGV4dC13aGl0ZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+RGVtb21pbmF0aW9uIFJlcG9ydDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cS1idG4gZmxhdCByb3VuZCBkZW5zZSBpY29uPVwiY2xvc2VcIiBAY2xpY2s9XCJjbG9zZUJ0blwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgICAgPGRpdiBjbGFzcz1cInEtcGEtbWQgcm93IHEtZ3V0dGVyLW1kIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTZcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXdlaWdodC1saWdodCB0ZXh0LWg2IHEtbXQtbWRcIj5cbiAgICAgICAgICAgIDxkaXY+MTAwMCBCaWxsczo8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTAwcHhcIlxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJkZW5vbWluYXRpb25EYXRhLm9uZVRob3VzYW5kQmlsbHNcIlxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgc3VmZml4PVwicGNzXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuIHRleHQtd2VpZ2h0LWxpZ2h0IHRleHQtaDYgcS1tdC1tZFwiPlxuICAgICAgICAgICAgPGRpdj41MDAgQmlsbHM6PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEwMHB4XCJcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiZGVub21pbmF0aW9uRGF0YS5maXZlSHVuZHJlZEJpbGxzXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIHN1ZmZpeD1cInBjc1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXdlaWdodC1saWdodCB0ZXh0LWg2IHEtbXQtbWRcIj5cbiAgICAgICAgICAgIDxkaXY+MjAwIEJpbGxzOjwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMDBweFwiXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cImRlbm9taW5hdGlvbkRhdGEudHdvSHVuZHJlZEJpbGxzXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIHN1ZmZpeD1cInBjc1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXdlaWdodC1saWdodCB0ZXh0LWg2IHEtbXQtbWRcIj5cbiAgICAgICAgICAgIDxkaXY+MTAwIEJpbGxzOjwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMDBweFwiXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cImRlbm9taW5hdGlvbkRhdGEub25lSHVuZHJlZEJpbGxzXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIHN1ZmZpeD1cInBjc1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXdlaWdodC1saWdodCB0ZXh0LWg2IHEtbXQtbWRcIj5cbiAgICAgICAgICAgIDxkaXY+NTAgQmlsbHM6PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEwMHB4XCJcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiZGVub21pbmF0aW9uRGF0YS5maWZ0eUJpbGxzXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIHN1ZmZpeD1cInBjc1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXdlaWdodC1saWdodCB0ZXh0LWg2IHEtbXQtbWRcIj5cbiAgICAgICAgICAgIDxkaXY+MjAgQmlsbHM6PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEwMHB4XCJcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiZGVub21pbmF0aW9uRGF0YS50d2VudHlCaWxsc1wiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBzdWZmaXg9XCJwY3NcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXdlaWdodC1saWdodCB0ZXh0LWg2IHEtbXQtbWRcIj5cbiAgICAgICAgICAgIDxkaXY+MjAgY29pbnM6PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEwMHB4XCJcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiZGVub21pbmF0aW9uRGF0YS50d2VudHlDb2luc1wiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBzdWZmaXg9XCJwY3NcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW4gdGV4dC13ZWlnaHQtbGlnaHQgdGV4dC1oNiBxLW10LW1kXCI+XG4gICAgICAgICAgICA8ZGl2PjEwIGNvaW5zOjwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMDBweFwiXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cImRlbm9taW5hdGlvbkRhdGEudGVuQ29pbnNcIlxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgc3VmZml4PVwicGNzXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuIHRleHQtd2VpZ2h0LWxpZ2h0IHRleHQtaDYgcS1tdC1tZFwiPlxuICAgICAgICAgICAgPGRpdj41IGNvaW5zOjwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMDBweFwiXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cImRlbm9taW5hdGlvbkRhdGEuZml2ZUNvaW5zXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIHN1ZmZpeD1cInBjc1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXdlaWdodC1saWdodCB0ZXh0LWg2IHEtbXQtbWRcIj5cbiAgICAgICAgICAgIDxkaXY+MSBjb2luczo8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTAwcHhcIlxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJkZW5vbWluYXRpb25EYXRhLm9uZUNvaW5zXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIHN1ZmZpeD1cInBjc1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXdlaWdodC1saWdodCB0ZXh0LWg2IHEtbXQtbWRcIj5cbiAgICAgICAgICAgIDxkaXY+MjUgY2VudHM6PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEwMHB4XCJcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiZGVub21pbmF0aW9uRGF0YS50d2VudHlGaXZlQ2VudHNcIlxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgc3VmZml4PVwicGNzXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2IHEtbXQtbWRcIiBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgICAgPGRpdj5Ub3RhbCBEZW5vbWluYXRpb248L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0IHYtbW9kZWw9XCJ0b3RhbERlbm9taW5hdGlvbkZvcm1hdFwiIG91dGxpbmVkIHJlYWRvbmx5IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPGRpdiBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICBjb2xvcj1cInJlZC02XCJcbiAgICAgICAgICAgIGxhYmVsPVwiU3VibWl0XCJcbiAgICAgICAgICAgIGNsYXNzPVwicS1wYS1zbVwiXG4gICAgICAgICAgICBzaXplPVwibWRcIlxuICAgICAgICAgICAgQGNsaWNrPVwiaGFuZGxlU3VibWl0XCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgdXNlU2FsZXNSZXBvcnRzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9zYWxlcy1yZXBvcnRcIjtcbmltcG9ydCB7IHJlYWN0aXZlLCByZWYsIGNvbXB1dGVkIH0gZnJvbSBcInZ1ZVwiO1xuXG5jb25zdCBzYWxlc1JlcG9ydHNTdG9yZSA9IHVzZVNhbGVzUmVwb3J0c1N0b3JlKCk7XG5cbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5jb25zdCBvcGVuRGlhbG9nID0gKCkgPT4ge1xuICBkaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcbmNvbnN0IGNsb3NlQnRuID0gKCkgPT4ge1xuICBkaWFsb2cudmFsdWUgPSBmYWxzZTtcbn07XG5cbmNvbnN0IGRlbm9taW5hdGlvbkRhdGEgPSByZWFjdGl2ZSh7XG4gIG9uZVRob3VzYW5kQmlsbHM6IDAsXG4gIGZpdmVIdW5kcmVkQmlsbHM6IDAsXG4gIHR3b0h1bmRyZWRCaWxsczogMCxcbiAgb25lSHVuZHJlZEJpbGxzOiAwLFxuICBmaWZ0eUJpbGxzOiAwLFxuICB0d2VudHlCaWxsczogMCxcbiAgdHdlbnR5Q29pbnM6IDAsXG4gIHRlbkNvaW5zOiAwLFxuICBmaXZlQ29pbnM6IDAsXG4gIG9uZUNvaW5zOiAwLFxuICB0d2VudHlGaXZlQ2VudHM6IDAsXG59KTtcblxuY29uc3QgZm9ybWF0Q3VycmVuY3kgPSAodmFsdWUpID0+IHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChcImVuLVVTXCIsIHtcbiAgICBzdHlsZTogXCJjdXJyZW5jeVwiLFxuICAgIGN1cnJlbmN5OiBcIlBIUFwiLFxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gIH0pLmZvcm1hdCh2YWx1ZSk7XG59O1xuXG5jb25zdCB0b3RhbERlbm9taW5hdGlvbiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIChcbiAgICBkZW5vbWluYXRpb25EYXRhLm9uZVRob3VzYW5kQmlsbHMgKiAxMDAwICtcbiAgICBkZW5vbWluYXRpb25EYXRhLmZpdmVIdW5kcmVkQmlsbHMgKiA1MDAgK1xuICAgIGRlbm9taW5hdGlvbkRhdGEudHdvSHVuZHJlZEJpbGxzICogMjAwICtcbiAgICBkZW5vbWluYXRpb25EYXRhLm9uZUh1bmRyZWRCaWxscyAqIDEwMCArXG4gICAgZGVub21pbmF0aW9uRGF0YS5maWZ0eUJpbGxzICogNTAgK1xuICAgIGRlbm9taW5hdGlvbkRhdGEudHdlbnR5QmlsbHMgKiAyMCArXG4gICAgZGVub21pbmF0aW9uRGF0YS50d2VudHlDb2lucyAqIDIwICtcbiAgICBkZW5vbWluYXRpb25EYXRhLnRlbkNvaW5zICogMTAgK1xuICAgIGRlbm9taW5hdGlvbkRhdGEuZml2ZUNvaW5zICogNSArXG4gICAgZGVub21pbmF0aW9uRGF0YS5vbmVDb2lucyAqIDEgK1xuICAgIGRlbm9taW5hdGlvbkRhdGEudHdlbnR5Rml2ZUNlbnRzICogMC4yNVxuICApO1xufSk7XG5jb25zdCB0b3RhbERlbm9taW5hdGlvbkZvcm1hdCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIGZvcm1hdEN1cnJlbmN5KHRvdGFsRGVub21pbmF0aW9uLnZhbHVlKTtcbn0pO1xuXG5jb25zdCBoYW5kbGVTdWJtaXQgPSAoKSA9PiB7XG4gIGNvbnN0IHJhd1RvdGFsRGVub21pbmF0aW9uID0gdG90YWxEZW5vbWluYXRpb24udmFsdWU7XG4gIHNhbGVzUmVwb3J0c1N0b3JlLmdldERlbm9taW5hdGlvbkRhdGEoZGVub21pbmF0aW9uRGF0YSk7XG4gIHNhbGVzUmVwb3J0c1N0b3JlLnVwZGF0ZURlbm9taW5hdGlvblRvdGFsKHJhd1RvdGFsRGVub21pbmF0aW9uKTtcbiAgc2FsZXNSZXBvcnRzU3RvcmUuY2FsY3VsYXRlQ2hhcmdlcyhyYXdUb3RhbERlbm9taW5hdGlvbik7IC8vIENhbGN1bGF0ZSBjaGFyZ2VzXG5cbiAgY29uc29sZS5sb2coXCJEZW5vbWluYXRpb24gRGF0YTpcIiwgZGVub21pbmF0aW9uRGF0YSk7XG4gIGNvbnNvbGUubG9nKFwiUmF3IFRvdGFsIERlbm9taW5hdGlvbjpcIiwgcmF3VG90YWxEZW5vbWluYXRpb24pO1xuICBjb25zb2xlLmxvZyhcIkZvcm1hdHRlZCBUb3RhbCBEZW5vbWluYXRpb246XCIsIHRvdGFsRGVub21pbmF0aW9uRm9ybWF0LnZhbHVlKTtcblxuICBjbG9zZUJ0bigpO1xufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XG4uYmctZ3JhZGllbnQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMWQyNDIzLCAjMDk4MWRkKTtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPHEtYnRuXG4gICAgICBjbGFzcz1cImJnLWdyYWRpZW50IHRleHQtd2hpdGVcIlxuICAgICAgb3V0bGluZWRcbiAgICAgIGxhYmVsPVwiQ3JlZGl0cyBSZXBvcnRcIlxuICAgICAgQGNsaWNrPVwib3BlbkRpYWxvZ1wiXG4gICAgLz5cbiAgPC9kaXY+XG4gIDxxLWRpYWxvZyB2LW1vZGVsPVwiZGlhbG9nXCIgcGVyc2lzdGVudD5cbiAgICA8cS1jYXJkIHN0eWxlPVwid2lkdGg6IDQ1MHB4XCI+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJiZy1ncmFkaWVudCB0ZXh0LXdoaXRlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5FbXBsb3llZSBDcmVkaXRzPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxxLWJ0biBmbGF0IHJvdW5kIGRlbnNlIGljb249XCJjbG9zZVwiIEBjbGljaz1cImNsb3NlQnRuXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXIteS1tZFwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJzZWFyY2hRdWVyeVwiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIHJvdW5kZWRcbiAgICAgICAgICAgICAgICBkZWJvdW5jZT1cIjEwMDBcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDQxNXB4XCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBOYW1lXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICAgICAgICAgICAgPHEtaWNvbiB2LWlmPVwiIWVtcGxveWVlU2VhcmNoTG9hZGluZ1wiIG5hbWU9XCJzZWFyY2hcIiAvPlxuICAgICAgICAgICAgICAgICAgPHEtc3Bpbm5lciB2LWVsc2UgY29sb3I9XCJncmV5XCIgc2l6ZT1cInNtXCIgLz5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIHYtaWY9XCJpc0Ryb3Bkb3duVmlzaWJsZSAmJiBzaG93VXNlckNhcmRcIlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjdXN0b20tbGlzdCB6LXRvcFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHEtY2FyZD5cbiAgICAgICAgICAgICAgICAgICAgPHEtbGlzdCBzZXBhcmF0b3I+XG4gICAgICAgICAgICAgICAgICAgICAgPCEtLSBMb2FkaW5nIFNwaW5uZXIgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbSB2LWlmPVwibG9hZGluZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cS1zcGlubmVyIGNvbG9yPVwicHJpbWFyeVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuXG4gICAgICAgICAgICAgICAgICAgICAgPCEtLSBObyBEYXRhIEF2YWlsYWJsZSBNZXNzYWdlIC0tPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0gdi1pZj1cIiFsb2FkaW5nICYmICFlbXBsb3llZXMubGVuZ3RoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIE5vIGRhdGEgYXZhaWxhYmxlIGluIHRoaXMgYnJhbmNoLlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbT5cblxuICAgICAgICAgICAgICAgICAgICAgIDwhLS0gUmVuZGVyIFVzZXIgTGlzdCAtLT5cbiAgICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJhdXRvRmlsbFVzZXIodXNlcilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cInVzZXIgaW4gZW1wbG95ZWVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOmtleT1cInVzZXIuaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlja2FibGVcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHt1c2VyLmVtcGxveWVlLmZpcnN0bmFtZX0gJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmVtcGxveWVlLm1pZGRsZW5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdXNlci5lbXBsb3llZS5taWRkbGVuYW1lLmNoYXJBdCgwKSArIFwiLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAke3VzZXIuZW1wbG95ZWUubGFzdG5hbWV9YFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICAgICAgICAgICAgPC9xLWNhcmQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXItc21cIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cInByb2R1Y3RTZWFyY2hcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICBkZWJvdW5jZT1cIjUwMFwiXG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAyNDBweFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgICAgICAgICAgIDxxLWljb24gdi1pZj1cIiFwcm9kdWN0U2VhcmNoTG9hZGluZ1wiIG5hbWU9XCJzZWFyY2hcIiAvPlxuICAgICAgICAgICAgICAgICAgPHEtc3Bpbm5lciB2LWVsc2UgY29sb3I9XCJncmV5XCIgc2l6ZT1cInNtXCIgLz5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgdi1pZj1cImlzRHJvcERvd25Qcm9kdWN0VmlzaWJsZSAmJiBzaG93UHJvZHVjdENhcmRcIlxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJjdXN0b20tbGlzdCB6LXRvcFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHEtY2FyZD5cbiAgICAgICAgICAgICAgICAgICAgPHEtbGlzdCBzZXBhcmF0b3I+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwiYXV0b0ZpbGxQcm9kdWN0KHByb2R1Y3QpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHYtZm9yPVwicHJvZHVjdCBpbiBwcm9kdWN0U2VhcmNoRGF0YVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6a2V5PVwicHJvZHVjdC5uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrYWJsZVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD57eyBwcm9kdWN0Lm5hbWUgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICAgICAgICAgICAgPC9xLWNhcmQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiY3JlZGl0Rm9ybS5wcmljZVwiXG4gICAgICAgICAgICAgICAgcmV2ZXJzZS1maWxsLW1hc2tcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogODBweFwiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJQcmljZVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cImNyZWRpdEZvcm0ucGllY2VzXCJcbiAgICAgICAgICAgICAgICByZXZlcnNlLWZpbGwtbWFza1xuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogODBweFwiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJQY3NcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgcGFkZGluZz1cInNtIG1kXCJcbiAgICAgICAgICAgICAgc2l6ZT1cInhtXCJcbiAgICAgICAgICAgICAgaWNvbj1cImFkZFwiXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIG91dGxpbmVcbiAgICAgICAgICAgICAgQGNsaWNrPVwiYWRkQ3JlZGl0VG9MaXN0XCJcbiAgICAgICAgICAgID48L3EtYnRuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cS1maWVsZCBvdXRsaW5lZCBkZW5zZSByZWFkb25seT5cbiAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpjb250cm9sPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8cS1pdGVtXG4gICAgICAgICAgICAgICAgICAgIHYtZm9yPVwiKGNyZWRpdCwgaW5kZXgpIGluIGNyZWRpdExpc3RcIlxuICAgICAgICAgICAgICAgICAgICA6a2V5PVwiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInEtZ3V0dGVyLXhzXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBQcm9kdWN0IE5hbWUgLS0+XG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInEtbWEtc20gdGV4dC1zdWJ0aXRsZTJcIiBzaWRlPlxuICAgICAgICAgICAgICAgICAgICAgIHt7IGNyZWRpdC5wcm9kdWN0TmFtZSB9fVxuICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuXG4gICAgICAgICAgICAgICAgICAgIDwhLS0gUGllY2VzIChwY3MpIC0tPlxuICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJxLW1hLXNtIHEtZ3V0dGVyLXNtXCIgc2lkZT5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPlBjczwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj57eyBjcmVkaXQucGllY2VzIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBQcmljZSAtLT5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSBxLWd1dHRlci1zbVwiIHNpZGU+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD5QcmljZTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj57eyBjcmVkaXQucHJpY2UgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgICAgICAgICAgICAgICAgICA8IS0tIFRvdGFsIEFtb3VudCAtLT5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSBxLWd1dHRlci1zbVwiIHNpZGU+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD5Ub3RhbDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj57e1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlZGl0LnRvdGFsQW1vdW50XG4gICAgICAgICAgICAgICAgICAgICAgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgICAgICAgICAgICAgICAgICA8IS0tIFJlbW92ZSBCdXR0b24gLS0+XG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBzaWRlPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwicmVtb3ZlQ3JlZGl0KGluZGV4KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb249XCJjbGVhclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgICAgICAgICAgcm91bmRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGV4dC1yZWRcIlxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvcS1maWVsZD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2PkNyZWRpdHMgVG90YWw8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtZmllbGQgb3V0bGluZWQgZGVuc2UgcmVhZG9ubHkgc3R5bGU9XCJ3aWR0aDogMTIwcHhcIj5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmNvbnRyb2w+XG4gICAgICAgICAgICAgICAgICB7eyBjcmVkaXRGb3JtLmNyZWRpdFRvdGFsIH19XG4gICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgPC9xLWZpZWxkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgb3V0bGluZVxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBpY29uPVwiYWRkXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJBZGQgVG8gTGlzdFwiXG4gICAgICAgICAgICAgIGNsYXNzPVwicS1wYS1zbVwiXG4gICAgICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgICAgIEBjbGljaz1cImhhbmRsZVN1Ym1pdFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgdXNlRW1wbG95ZWVTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2VtcGxveWVlXCI7XG5pbXBvcnQgeyB1c2VTYWxlc1JlcG9ydHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3NhbGVzLXJlcG9ydFwiO1xuaW1wb3J0IHsgdXNlVXNlcnNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3VzZXJcIjtcbmltcG9ydCB7IHJlZiwgcmVhY3RpdmUsIGNvbXB1dGVkLCB3YXRjaCB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgdXNlckRhdGFTdG9yZSA9IHVzZVVzZXJzU3RvcmUoKTtcbmNvbnN0IHVzZXJEYXRhU2VhcmNoID0gY29tcHV0ZWQoKCkgPT4gdXNlckRhdGFTdG9yZS51c2Vycyk7XG5jb25zdCBlbXBsb3llZVN0b3JlID0gdXNlRW1wbG95ZWVTdG9yZSgpO1xuY29uc3QgZW1wbG95ZWVzID0gY29tcHV0ZWQoKCkgPT4gZW1wbG95ZWVTdG9yZS5icmFuY2hFbXBsb3llZXMpO1xuY29uc3Qgc2FsZXNSZXBvcnRzU3RvcmUgPSB1c2VTYWxlc1JlcG9ydHNTdG9yZSgpO1xuY29uc3QgcHJvZHVjdFNlYXJjaERhdGEgPSBjb21wdXRlZCgoKSA9PiBzYWxlc1JlcG9ydHNTdG9yZS5wcm9kdWN0cyk7XG5jb25zb2xlLmxvZyhcInByb2R1Y3RzIHNlYXJjaFwiLCBwcm9kdWN0U2VhcmNoRGF0YS52YWx1ZSk7XG5jb25zdCB1c2VyRGF0YSA9IHNhbGVzUmVwb3J0c1N0b3JlLnVzZXI7XG5jb25zb2xlLmxvZyhcInVzZXJkYXRhXCIsIHVzZXJEYXRhKTtcbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5jb25zdCBzZWFyY2hRdWVyeSA9IHJlZihcIlwiKTtcbmNvbnN0IHByb2R1Y3RTZWFyY2ggPSByZWYoXCJcIik7XG5jb25zdCBzaG93VXNlckNhcmQgPSByZWYoZmFsc2UpO1xuY29uc3Qgc2hvd1Byb2R1Y3RDYXJkID0gcmVmKGZhbHNlKTtcbmxldCB1c2VyU2VsZWN0ZWQgPSBmYWxzZTtcbmxldCBwcm9kdWN0c1NlbGVjdGVkID0gZmFsc2U7XG5jb25zdCBsb2FkaW5nID0gcmVmKGZhbHNlKTsgLy8gTG9hZGluZyBzdGF0ZVxuY29uc3QgZW1wbG95ZWVTZWFyY2hMb2FkaW5nID0gcmVmKGZhbHNlKTtcbmNvbnN0IHByb2R1Y3RTZWFyY2hMb2FkaW5nID0gcmVmKGZhbHNlKTtcblxuY29uc3QgZm9ybWF0VXNlck5hbWUgPSAodXNlcikgPT4ge1xuICBjb25zdCB7IGZpcnN0bmFtZSwgbWlkZGxlbmFtZSwgbGFzdG5hbWUgfSA9IHVzZXIuZW1wbG95ZWU7XG4gIHJldHVybiBgJHtmaXJzdG5hbWV9ICR7XG4gICAgbWlkZGxlbmFtZSA/IG1pZGRsZW5hbWUuY2hhckF0KDApICsgXCIuXCIgOiBcIlwiXG4gIH0gJHtsYXN0bmFtZX1gO1xufTtcblxuY29uc3Qgc2VhcmNoVXNlcnMgPSBhc3luYyAoKSA9PiB7XG4gIGlmIChzZWFyY2hRdWVyeS52YWx1ZSkge1xuICAgIGVtcGxveWVlU2VhcmNoTG9hZGluZy52YWx1ZSA9IHRydWU7IC8vIFNldCBsb2FkaW5nIHRvIHRydWVcbiAgICBjb25zdCBicmFuY2hJZCA9IHVzZXJEYXRhPy5kYXRhPy5lbXBsb3llZT8uYnJhbmNoX2VtcGxveWVlPy5icmFuY2hfaWQgfHwgXCJcIjtcbiAgICBjb25zb2xlLmxvZyhcInNlYXJjaFF1ZXJ5LnZhbHVlXCIsIHNlYXJjaFF1ZXJ5LnZhbHVlKTtcbiAgICBjb25zb2xlLmxvZyhcImJyYW5jaElkXCIsIGJyYW5jaElkKTtcbiAgICBhd2FpdCBlbXBsb3llZVN0b3JlLnNlYXJjaEVtcGxveWVlV2l0aEJyYW5jaElEKHNlYXJjaFF1ZXJ5LnZhbHVlLCBicmFuY2hJZCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJyZXNwb25zZSB1c2VyXCIsKTtcblxuICAgIGVtcGxveWVlU2VhcmNoTG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICAgIHNob3dVc2VyQ2FyZC52YWx1ZSA9IHRydWU7XG4gIH1cbn07XG5cbmNvbnN0IG9wZW5EaWFsb2cgPSAoKSA9PiB7XG4gIGRpYWxvZy52YWx1ZSA9IHRydWU7XG59O1xuXG5jb25zdCBjbG9zZUJ0biA9ICgpID0+IHtcbiAgZGlhbG9nLnZhbHVlID0gZmFsc2U7XG59O1xuXG5jb25zdCBjcmVkaXRGb3JtID0gcmVhY3RpdmUoe1xuICBjcmVkaXRfdXNlcl9pZDogXCJcIixcbiAgbmFtZTogXCJcIixcbiAgcHJvZHVjdF9pZDogXCJcIixcbiAgcHJvZHVjdE5hbWU6IFwiXCIsXG4gIHByaWNlOiAwLFxuICBwaWVjZXM6IFwiXCIsXG4gIGNyZWRpdFRvdGFsOiAwLFxufSk7XG5cbmNvbnN0IGNsZWFyID0gKCkgPT4ge1xuICBzZWFyY2hRdWVyeS52YWx1ZSA9IFwiXCI7XG4gIHByb2R1Y3RTZWFyY2gudmFsdWUgPSBcIlwiO1xuICBjcmVkaXRGb3JtLmNyZWRpdF91c2VyX2lkID0gXCJcIjtcbiAgY3JlZGl0Rm9ybS5uYW1lID0gXCJcIjtcbiAgY3JlZGl0Rm9ybS5wcm9kdWN0X2lkID0gXCJcIjtcbiAgY3JlZGl0Rm9ybS5wcm9kdWN0TmFtZSA9IFwiXCI7XG4gIGNyZWRpdEZvcm0ucHJpY2UgPSBcIlwiO1xuICBjcmVkaXRGb3JtLnBpZWNlcyA9IFwiXCI7XG4gIGNyZWRpdEZvcm0uY3JlZGl0VG90YWwgPSBcIlwiO1xuICBjcmVkaXRMaXN0LnZhbHVlID0gW107XG59O1xuXG5jb25zdCBjbGVhclByb2R1Y3QgPSAoKSA9PiB7XG4gIHByb2R1Y3RTZWFyY2gudmFsdWUgPSBcIlwiO1xuICBjcmVkaXRGb3JtLnByb2R1Y3RfaWQgPSBcIlwiO1xuICBjcmVkaXRGb3JtLnByb2R1Y3ROYW1lID0gXCJcIjtcbiAgY3JlZGl0Rm9ybS5wcmljZSA9IFwiXCI7XG4gIGNyZWRpdEZvcm0ucGllY2VzID0gXCJcIjtcbn07XG5cbmNvbnN0IGlzRHJvcGRvd25WaXNpYmxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gc2VhcmNoUXVlcnkudmFsdWUgJiYgZW1wbG95ZWVzLnZhbHVlLmxlbmd0aCA+IDA7XG59KTtcblxuY29uc3QgYXV0b0ZpbGxVc2VyID0gKHVzZXIpID0+IHtcbiAgY29uc29sZS5sb2coXCJjcmVkaXRcIiwgdXNlcik7XG4gIHNlYXJjaFF1ZXJ5LnZhbHVlID0gYCR7dXNlci5lbXBsb3llZS5maXJzdG5hbWV9ICR7XG4gICAgdXNlci5lbXBsb3llZS5taWRkbGVuYW1lID8gdXNlci5lbXBsb3llZS5taWRkbGVuYW1lLmNoYXJBdCgwKSArIFwiLlwiIDogXCJcIlxuICB9ICR7dXNlci5lbXBsb3llZS5sYXN0bmFtZX1gO1xuICBjcmVkaXRGb3JtLmNyZWRpdF91c2VyX2lkID0gdXNlci5lbXBsb3llZS5pZDtcbiAgY3JlZGl0Rm9ybS5uYW1lID0gYCR7dXNlci5lbXBsb3llZS5maXJzdG5hbWV9ICR7XG4gICAgdXNlci5lbXBsb3llZS5taWRkbGVuYW1lID8gdXNlci5lbXBsb3llZS5taWRkbGVuYW1lLmNoYXJBdCgwKSArIFwiLlwiIDogXCJcIlxuICB9ICR7dXNlci5lbXBsb3llZS5sYXN0bmFtZX1gO1xuICB1c2VyU2VsZWN0ZWQgPSB0cnVlOyAvLyBTZXQgZmxhZyB3aGVuIHVzZXIgaXMgc2VsZWN0ZWRcbiAgc2hvd1VzZXJDYXJkLnZhbHVlID0gZmFsc2U7XG59O1xuXG5jb25zdCBzZWFyY2hQcm9kdWN0cyA9IGFzeW5jICgpID0+IHtcbiAgaWYgKHByb2R1Y3RTZWFyY2gudmFsdWUpIHtcbiAgICBwcm9kdWN0U2VhcmNoTG9hZGluZy52YWx1ZSA9IHRydWU7IC8vIFNldCBsb2FkaW5nIHRvIHRydWVcbiAgICBjb25zdCBicmFuY2hJZCA9IHVzZXJEYXRhPy5kYXRhPy5lbXBsb3llZT8uYnJhbmNoX2VtcGxveWVlPy5icmFuY2hfaWQgfHwgXCJcIjtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNhbGVzUmVwb3J0c1N0b3JlLnNlYXJjaEJyYW5jaFByb2R1Y3RzKFxuICAgICAgcHJvZHVjdFNlYXJjaC52YWx1ZSxcbiAgICAgIGJyYW5jaElkXG4gICAgKTtcbiAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlXCIsIHJlc3BvbnNlKTtcbiAgICBwcm9kdWN0U2VhcmNoTG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICAgIHNob3dQcm9kdWN0Q2FyZC52YWx1ZSA9IHRydWU7XG4gIH1cbn07XG5cbmNvbnN0IGlzRHJvcERvd25Qcm9kdWN0VmlzaWJsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIHByb2R1Y3RTZWFyY2gudmFsdWUgJiYgcHJvZHVjdFNlYXJjaERhdGEudmFsdWUubGVuZ3RoID4gMDtcbn0pO1xuY29uc29sZS5sb2coXCJQcm9kdWN0IHNlYXJjaCBkYXRhc3NzOlwiLCBwcm9kdWN0U2VhcmNoRGF0YS52YWx1ZSk7XG5cbmNvbnN0IGF1dG9GaWxsUHJvZHVjdCA9IChwcm9kdWN0KSA9PiB7XG4gIHByb2R1Y3RTZWFyY2gudmFsdWUgPSBwcm9kdWN0Lm5hbWU7XG4gIGNyZWRpdEZvcm0ucHJvZHVjdE5hbWUgPSBwcm9kdWN0Lm5hbWU7XG4gIGNyZWRpdEZvcm0ucHJvZHVjdF9pZCA9IHByb2R1Y3QuaWQ7XG4gIGNyZWRpdEZvcm0ucHJpY2UgPSBwcm9kdWN0LnByaWNlO1xuICBwcm9kdWN0c1NlbGVjdGVkID0gdHJ1ZTtcbiAgc2hvd1Byb2R1Y3RDYXJkLnZhbHVlID0gZmFsc2U7XG59O1xuXG5jb25zdCBwcm9kdWN0Q3JlZGl0VG90YWxBbW91bnQgPSByZWYoXCJcIik7XG5jb25zdCBjcmVkaXRMaXN0ID0gcmVmKFtdKTtcblxuY29uc3QgY2FsY3VsYXRlUHJvZHVjdENyZWRpdFRvdGFsQW1vdW50ID0gKCkgPT4ge1xuICBjb25zdCBwcmljZSA9IHBhcnNlRmxvYXQoY3JlZGl0Rm9ybS5wcmljZSk7XG4gIGNvbnN0IHBpZWNlcyA9IHBhcnNlSW50KGNyZWRpdEZvcm0ucGllY2VzKTtcblxuICBpZiAoIWlzTmFOKHByaWNlKSAmJiAhaXNOYU4ocGllY2VzKSkge1xuICAgIGNvbnN0IHRvdGFsQW1vdW50ID0gcHJpY2UgKiBwaWVjZXM7XG4gICAgcHJvZHVjdENyZWRpdFRvdGFsQW1vdW50LnZhbHVlID0gdG90YWxBbW91bnQudG9GaXhlZCgyKTtcbiAgfSBlbHNlIHtcbiAgICBwcm9kdWN0Q3JlZGl0VG90YWxBbW91bnQudmFsdWUgPSBcIlwiO1xuICB9XG5cbiAgY29uc29sZS5sb2coXCJwcm9kdWN0Q3JlZGl0VG90YWxBbW91bnRcIiwgcHJvZHVjdENyZWRpdFRvdGFsQW1vdW50LnZhbHVlKTtcbn07XG5jb25zdCBhZGRDcmVkaXRUb0xpc3QgPSAoKSA9PiB7XG4gIGNvbnN0IHRvdGFsQW1vdW50ID0gcHJvZHVjdENyZWRpdFRvdGFsQW1vdW50LnZhbHVlO1xuXG4gIGNyZWRpdExpc3QudmFsdWUucHVzaCh7XG4gICAgY3JlZGl0X3VzZXJfaWQ6IGNyZWRpdEZvcm0uY3JlZGl0X3VzZXJfaWQsXG4gICAgcHJvZHVjdF9pZDogY3JlZGl0Rm9ybS5wcm9kdWN0X2lkLFxuICAgIG5hbWU6IGNyZWRpdEZvcm0ubmFtZSxcbiAgICBwcm9kdWN0TmFtZTogY3JlZGl0Rm9ybS5wcm9kdWN0TmFtZSxcbiAgICBwcmljZTogY3JlZGl0Rm9ybS5wcmljZSxcbiAgICBwaWVjZXM6IGNyZWRpdEZvcm0ucGllY2VzLFxuICAgIHRvdGFsQW1vdW50OiB0b3RhbEFtb3VudCxcbiAgfSk7XG4gIGNsZWFyUHJvZHVjdCgpO1xufTtcblxuY29uc3QgcmVtb3ZlQ3JlZGl0ID0gKGluZGV4KSA9PiB7XG4gIGNyZWRpdExpc3QudmFsdWUuc3BsaWNlKGluZGV4LCAxKTtcbn07XG5cbndhdGNoKHNlYXJjaFF1ZXJ5LCAobmV3UXVlcnkpID0+IHtcbiAgaWYgKG5ld1F1ZXJ5Lmxlbmd0aCA+IDIgJiYgIXVzZXJTZWxlY3RlZCkge1xuICAgIHNlYXJjaFVzZXJzKCk7XG4gIH0gZWxzZSB7XG4gICAgc2hvd1VzZXJDYXJkLnZhbHVlID0gZmFsc2U7XG4gIH1cbiAgdXNlclNlbGVjdGVkID0gZmFsc2U7IC8vIFJlc2V0IGZsYWdcbn0pO1xuXG53YXRjaChwcm9kdWN0U2VhcmNoLCAobmV3UXVlcnkpID0+IHtcbiAgaWYgKG5ld1F1ZXJ5Lmxlbmd0aCA+IDIgJiYgIXByb2R1Y3RzU2VsZWN0ZWQpIHtcbiAgICBzZWFyY2hQcm9kdWN0cygpO1xuICB9IGVsc2Uge1xuICAgIHNob3dQcm9kdWN0Q2FyZC52YWx1ZSA9IGZhbHNlO1xuICB9XG4gIHByb2R1Y3RzU2VsZWN0ZWQgPSBmYWxzZTtcbn0pO1xuXG53YXRjaChcbiAgY3JlZGl0TGlzdCxcbiAgKG5ld0xpc3QpID0+IHtcbiAgICBjb25zdCB0b3RhbCA9IG5ld0xpc3QucmVkdWNlKChzdW0sIGNyZWRpdCkgPT4ge1xuICAgICAgcmV0dXJuIHN1bSArIHBhcnNlRmxvYXQoY3JlZGl0LnRvdGFsQW1vdW50KTtcbiAgICB9LCAwKTtcblxuICAgIGNyZWRpdEZvcm0uY3JlZGl0VG90YWwgPSB0b3RhbC50b0ZpeGVkKDIpOyAvLyBVcGRhdGUgdGhlIHRvdGFsIGluIHRoZSBmb3JtXG4gIH0sXG4gIHsgZGVlcDogdHJ1ZSB9XG4pO1xuXG53YXRjaChcbiAgWygpID0+IGNyZWRpdEZvcm0ucHJpY2UsICgpID0+IGNyZWRpdEZvcm0ucGllY2VzXSxcbiAgY2FsY3VsYXRlUHJvZHVjdENyZWRpdFRvdGFsQW1vdW50XG4pO1xud2F0Y2gocHJvZHVjdENyZWRpdFRvdGFsQW1vdW50LCAobmV3VmFsKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwicHJvZHVjdENyZWRpdFRvdGFsQW1vdW5cIiwgbmV3VmFsKTsgLy8gVGhpcyB3aWxsIGxvZyB3aGVuZXZlciB0aGUgdG90YWwgYW1vdW50IGNoYW5nZXNcbn0pO1xuXG5jb25zdCBoYW5kbGVTdWJtaXQgPSAoKSA9PiB7XG4gIGNvbnN0IGZvcm1hdHRlZFRvdGFsQW1vdW50ID0gcGFyc2VGbG9hdChjcmVkaXRGb3JtLmNyZWRpdFRvdGFsKTtcbiAgY29uc3QgZW1wbG95ZWVDcmVkaXRSZXBvcnQgPSB7XG4gICAgdXNlcl9pZDogdXNlckRhdGE/LmRhdGEuaWQsXG4gICAgYnJhbmNoX2lkOiB1c2VyRGF0YT8uZGF0YT8uZW1wbG95ZWU/LmJyYW5jaF9lbXBsb3llZT8uYnJhbmNoX2lkIHx8IFwiXCIsXG4gICAgY3JlZGl0X3VzZXJfaWQ6IGNyZWRpdEZvcm0uY3JlZGl0X3VzZXJfaWQsXG4gICAgY3JlZGl0X3VzZXJfbmFtZTogY3JlZGl0Rm9ybS5uYW1lLFxuICAgIHRvdGFsX2Ftb3VudDogZm9ybWF0dGVkVG90YWxBbW91bnQsXG4gICAgY3JlZGl0czogY3JlZGl0TGlzdC52YWx1ZS5tYXAoKGNyZWRpdCkgPT4gKHtcbiAgICAgIGNyZWRpdF91c2VyX2lkOiBjcmVkaXQuY3JlZGl0X3VzZXJfaWQsXG4gICAgICBicmFuY2hfaWQ6IHVzZXJEYXRhPy5kYXRhPy5lbXBsb3llZT8uYnJhbmNoX2VtcGxveWVlPy5icmFuY2hfaWQgfHwgXCJcIixcbiAgICAgIHByb2R1Y3ROYW1lOiBjcmVkaXQucHJvZHVjdE5hbWUsXG4gICAgICBwcm9kdWN0X2lkOiBjcmVkaXQucHJvZHVjdF9pZCxcbiAgICAgIHByaWNlOiBjcmVkaXQucHJpY2UsXG4gICAgICBwaWVjZXM6IGNyZWRpdC5waWVjZXMsXG4gICAgfSkpLFxuICB9O1xuXG4gIHNhbGVzUmVwb3J0c1N0b3JlLnVwZGF0ZUVtcGxveWVlQ3JlZGl0UmVwb3J0cyhlbXBsb3llZUNyZWRpdFJlcG9ydCk7XG4gIGNvbnNvbGUubG9nKFwiZW1wbG95ZWVDcmVkaXRSZXBvcnQ6XCIsIGVtcGxveWVlQ3JlZGl0UmVwb3J0KTtcblxuICBOb3RpZnkuY3JlYXRlKHtcbiAgICB0eXBlOiBcInBvc2l0aXZlXCIsXG4gICAgbWVzc2FnZTogXCJFeHBlbnNlcyBTdWJtaXR0ZWRcIixcbiAgICB0aW1lb3V0OiAxMDAwLFxuICB9KTtcbiAgZGlhbG9nLnZhbHVlID0gZmFsc2U7XG4gIGNsZWFyKCk7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5iZy1ncmFkaWVudCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMyNDI0MWQsICNiNzk1MDApO1xufVxuLmN1c3RvbS1saXN0IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgd2lkdGg6IDEwMCU7XG4gIGJveC1zaGFkb3c6IDBweCAzcHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xNik7XG4gIG1heC1oZWlnaHQ6IDIwMHB4O1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBib3R0b206IDA7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMDAlKTsgLyogTW92ZSB0aGUgZHJvcGRvd24gYmVsb3cgdGhlIGlucHV0ICovXG4gIHotaW5kZXg6IDEwOyAvKiBFbnN1cmUgaXQgYXBwZWFycyBhYm92ZSBvdGhlciBjb250ZW50ICovXG59XG5cbi5xLWZpZWxkIC5xLWl0ZW0tc2VjdGlvbiB7XG4gIG1hcmdpbi1yaWdodDogOHB4OyAvKiBBZGp1c3QgYXMgbmVlZGVkIGZvciBzcGFjaW5nICovXG59XG5cbi5xLWZpZWxkIC5yb3cge1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxxLWJ0blxuICAgICAgY2xhc3M9XCJiZy1ncmFkaWVudCB0ZXh0LXdoaXRlXCJcbiAgICAgIG91dGxpbmVkXG4gICAgICBsYWJlbD1cIkV4cGVuc2VzIFJlcG9ydFwiXG4gICAgICBAY2xpY2s9XCJvcGVuRGlhbG9nXCJcbiAgICAvPlxuICA8L2Rpdj5cbiAgPHEtZGlhbG9nIHYtbW9kZWw9XCJkaWFsb2dcIj5cbiAgICA8cS1jYXJkIHN0eWxlPVwid2lkdGg6IDQ1MHB4XCI+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJiZy1ncmFkaWVudCB0ZXh0LXdoaXRlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5FeHBlbnNlczwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cS1idG4gZmxhdCByb3VuZCBkZW5zZSBpY29uPVwiY2xvc2VcIiBAY2xpY2s9XCJjbG9zZUJ0blwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXktbWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLXgtbWRcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cImV4cGVuc2VzRm9ybS5uYW1lXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMzAwcHhcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTmFtZVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8IS0tIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgdi1pZj1cImlzRHJvcGRvd25WaXNpYmxlICYmIHNob3dVc2VyQ2FyZFwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiY3VzdG9tLWxpc3Qgei10b3BcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8cS1jYXJkPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWxpc3Qgc2VwYXJhdG9yPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbSB2LWlmPVwiIXVzZXJEYXRhU2VhcmNoPy5sZW5ndGhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgTm8gcmVjb3JkIGZvdW5kLlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwiYXV0b0ZpbGxVc2VyKHVzZXIpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cInVzZXIgaW4gdXNlckRhdGFTZWFyY2hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDprZXk9XCJ1c2VyLmlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlja2FibGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+e3sgdXNlci5uYW1lIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICAgICAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PiAtLT5cbiAgICAgICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJleHBlbnNlc0Zvcm0uYW1vdW50XCJcbiAgICAgICAgICAgICAgICByZXZlcnNlLWZpbGwtbWFza1xuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMDBweFwiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJBbW91bnRcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJleHBlbnNlc0Zvcm0uZGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkRlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgYXV0b2dyb3dcbiAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogNDE1cHhcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiXCIgYWxpZ249XCJyaWdodFwiPlxuICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgIG91dGxpbmVcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgaWNvbj1cImFkZFwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiQWRkIFRvIExpc3RcIlxuICAgICAgICAgICAgICBjbGFzcz1cInEtcGEtc21cIlxuICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICBAY2xpY2s9XCJoYW5kbGVTdWJtaXRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IE5vdGlmeSB9IGZyb20gXCJxdWFzYXJcIjtcbmltcG9ydCB7IHVzZVNhbGVzUmVwb3J0c1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvc2FsZXMtcmVwb3J0XCI7XG5pbXBvcnQgeyB1c2VVc2Vyc1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvdXNlclwiO1xuaW1wb3J0IHsgcmVmLCByZWFjdGl2ZSwgY29tcHV0ZWQgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IHVzZXJEYXRhU3RvcmUgPSB1c2VVc2Vyc1N0b3JlKCk7XG5jb25zdCB1c2VyRGF0YVNlYXJjaCA9IGNvbXB1dGVkKCgpID0+IHVzZXJEYXRhU3RvcmUudXNlcnMpO1xuY29uc3Qgc2FsZXNSZXBvcnRzU3RvcmUgPSB1c2VTYWxlc1JlcG9ydHNTdG9yZSgpO1xuY29uc3QgdXNlckRhdGEgPSBzYWxlc1JlcG9ydHNTdG9yZS51c2VyO1xuY29uc3QgZGlhbG9nID0gcmVmKGZhbHNlKTtcbi8vIGNvbnN0IHNlYXJjaFF1ZXJ5ID0gcmVmKFwiXCIpO1xuLy8gY29uc3Qgc2hvd1VzZXJDYXJkID0gcmVmKHRydWUpO1xuXG4vLyBjb25zdCBzZWFyY2hVc2VycyA9IGFzeW5jICgpID0+IHtcbi8vICAgaWYgKHNlYXJjaFF1ZXJ5LnZhbHVlKSB7XG4vLyAgICAgY29uc3QgYnJhbmNoSWQgPSB1c2VyRGF0YT8uZGF0YT8uYnJhbmNoX2VtcGxveWVlPy5icmFuY2hfaWQgfHwgXCJcIjtcbi8vICAgICBhd2FpdCB1c2VyRGF0YVN0b3JlLnNlYXJjaFVzZXJXaXRoSUQoc2VhcmNoUXVlcnkudmFsdWUsIGJyYW5jaElkKTtcbi8vICAgICBzaG93VXNlckNhcmQudmFsdWUgPSB0cnVlO1xuLy8gICB9XG4vLyB9O1xuXG5jb25zdCBpc0Ryb3Bkb3duVmlzaWJsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIHNlYXJjaFF1ZXJ5LnZhbHVlICYmIHVzZXJEYXRhU2VhcmNoLnZhbHVlLmxlbmd0aCA+IDA7XG59KTtcblxuY29uc3QgZXhwZW5zZXNGb3JtID0gcmVhY3RpdmUoe1xuICB1c2VyX2V4cGVuc2VfaWQ6IFwiXCIsXG4gIG5hbWU6IFwiXCIsXG4gIGFtb3VudDogMCxcbiAgZGVzY3JpcHRpb246IFwiXCIsXG59KTtcblxuLy8gY29uc3QgYXV0b0ZpbGxVc2VyID0gKHVzZXIpID0+IHtcbi8vICAgc2VhcmNoUXVlcnkudmFsdWUgPSB1c2VyLm5hbWU7XG4vLyAgIGV4cGVuc2VzRm9ybS5uYW1lID0gdXNlci5uYW1lO1xuLy8gICBleHBlbnNlc0Zvcm0udXNlcl9leHBlbnNlX2lkID0gdXNlci5pZDtcbi8vICAgc2hvd1VzZXJDYXJkLnZhbHVlID0gZmFsc2U7XG4vLyB9O1xuXG5jb25zdCBvcGVuRGlhbG9nID0gKCkgPT4ge1xuICBkaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcblxuY29uc3QgY2xvc2VCdG4gPSAoKSA9PiB7XG4gIGRpYWxvZy52YWx1ZSA9IGZhbHNlO1xufTtcblxuY29uc3QgY2xlYXIgPSAoKSA9PiB7XG4gIGV4cGVuc2VzRm9ybS5leHBlbnNlX3VzZXJfaWQgPSBcIlwiO1xuICBleHBlbnNlc0Zvcm0ubmFtZSA9IFwiXCI7XG4gIGV4cGVuc2VzRm9ybS5hbW91bnQgPSBcIlwiO1xuICBleHBlbnNlc0Zvcm0uZGVzY3JpcHRpb24gPSBcIlwiO1xufTtcblxuY29uc3QgaGFuZGxlU3VibWl0ID0gKCkgPT4ge1xuICBjb25zdCBhbW91bnRBc051bWJlciA9IHBhcnNlRmxvYXQoZXhwZW5zZXNGb3JtLmFtb3VudC5yZXBsYWNlKFwiLFwiLCBcIi5cIikpO1xuXG4gIGNvbnN0IGV4cGVuc2VSZXBvcnQgPSB7XG4gICAgLi4uZXhwZW5zZXNGb3JtLFxuICAgIHVzZXJfaWQ6IHVzZXJEYXRhPy5kYXRhLmlkLFxuICAgIGJyYW5jaF9pZDogdXNlckRhdGE/LmRhdGE/LmVtcGxveWVlPy5icmFuY2hfZW1wbG95ZWU/LmJyYW5jaF9pZCB8fCBcIlwiLFxuICAgIGFtb3VudDogYW1vdW50QXNOdW1iZXIsXG4gIH07XG5cbiAgc2FsZXNSZXBvcnRzU3RvcmUudXBkYXRlRXhwZW5zZXNSZXBvcnQoZXhwZW5zZVJlcG9ydCk7XG4gIE5vdGlmeS5jcmVhdGUoe1xuICAgIHR5cGU6IFwicG9zaXRpdmVcIixcbiAgICBtZXNzYWdlOiBcIkV4cGVuc2VzIFN1Ym1pdHRlZFwiLFxuICAgIHRpbWVvdXQ6IDEwMDAsXG4gIH0pO1xuXG4gIGNsZWFyKCk7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5iZy1ncmFkaWVudCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMxZDI0MjMsICMwMDc5NmIpO1xufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPCEtLSA8ZGl2IGNsYXNzPVwidGV4dC1oNSBxLW1iLW1kXCI+T3ZlciBBbGwgVG90YWw8L2Rpdj4gLS0+XG5cbiAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci1zbSBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICA8ZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWxpZ2h0XCI+QnJlYWQgVG90YWwgQW1vdW50PC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgIHYtbW9kZWw9XCJicmVhZFRvdGFsRm9ybWF0dGVkXCJcbiAgICAgICAgICByZWFkb25seVxuICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgZGVuc2VcbiAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxNTBweFwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWxpZ2h0XCI+U2VsZWN0YSBUb3RhbCBBbW91bnQ8L2Rpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgdi1tb2RlbD1cInNlbGVjdGFUb3RhbEZvcm1hdHRlZFwiXG4gICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTUwcHhcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1saWdodFwiPlNvZnRkcmlua3MgVG90YWwgQW1vdW50PC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgIHYtbW9kZWw9XCJzb2Z0ZHJpbmtzVG90YWxGb3JtYXR0ZWRcIlxuICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICBkZW5zZVxuICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDE1MHB4XCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC13ZWlnaHQtbGlnaHRcIj5FeHBlbnNlcyBUb3RhbCBBbW91bnQ8L2Rpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgdi1tb2RlbD1cImV4cGVuc2VzVG90YWxGb3JtYXR0ZWRcIlxuICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICBkZW5zZVxuICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDE1MHB4XCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC13ZWlnaHQtbGlnaHRcIj5DcmVkaXRzIFRvdGFsIEFtb3VudDwvZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICB2LW1vZGVsPVwiY3JlZGl0c1RvdGFsRm9ybWF0dGVkXCJcbiAgICAgICAgICByZWFkb25seVxuICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgZGVuc2VcbiAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxNTBweFwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJyb3cgcS1teS1sZyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItc20gcS1teS1tZFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWxpZ2h0IHRleHQtaDYgcS1tdC1tZFwiPkNoYXJnZXMgVG90YWw8L2Rpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgdi1tb2RlbD1cImNoYXJnZXNUb3RhbEZvcm1hdHRlZFwiXG4gICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTgwcHhcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXNtIHEtbXktbWRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1ib2xkIHRleHQtaDYgcS1tdC1tZFwiPlRvdGFsIFNhbGVzPC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgIHYtbW9kZWw9XCJkZW5vbWluYXRpb25Ub3RhbEZvcm1hdHRlZFwiXG4gICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTgwcHhcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJxLW15LW1kXCIgYWxpZ249XCJyaWdodFwiPlxuICAgIDxxLWJ0blxuICAgICAgcGFkZGluZz1cInNtIG1kXCJcbiAgICAgIGNvbG9yPVwicmVkLTZcIlxuICAgICAgZGVuc2VcbiAgICAgIHJvdW5kZWRcbiAgICAgIGxhYmVsPVwiU3VibWl0XCJcbiAgICAgIEBjbGljaz1cImhhbmRsZVN1Ym1pdFwiXG4gICAgPlxuICAgICAgPHEtaWNvbiBjbGFzcz1cInEtbXgtc21cIiBsZWZ0IG5hbWU9XCJzZW5kXCIgLz5cbiAgICA8L3EtYnRuPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VTYWxlc1JlcG9ydHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3NhbGVzLXJlcG9ydFwiO1xuaW1wb3J0IHsgcmVmLCBjb21wdXRlZCB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgZm9ybWF0Q3VycmVuY3kgPSAodmFsdWUpID0+IHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChcImVuLVVTXCIsIHtcbiAgICBzdHlsZTogXCJjdXJyZW5jeVwiLFxuICAgIGN1cnJlbmN5OiBcIlBIUFwiLFxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gIH0pLmZvcm1hdCh2YWx1ZSk7XG59O1xuXG5jb25zdCBzYWxlc1JlcG9ydHNTdG9yZSA9IHVzZVNhbGVzUmVwb3J0c1N0b3JlKCk7XG5cbmNvbnN0IGJyZWFkVG90YWwgPSBjb21wdXRlZCgoKSA9PiBzYWxlc1JlcG9ydHNTdG9yZS5icmVhZFRvdGFsQW1vdW50KTtcbmNvbnN0IHNlbGVjdGFUb3RhbCA9IGNvbXB1dGVkKCgpID0+IHNhbGVzUmVwb3J0c1N0b3JlLnNlbGVjdGFUb3RhbEFtb3VudCk7XG5jb25zdCBzb2Z0ZHJpbmtzVG90YWwgPSBjb21wdXRlZCgoKSA9PiBzYWxlc1JlcG9ydHNTdG9yZS5zb2Z0ZHJpbmtzVG90YWxBbW91bnQpO1xuY29uc3QgZXhwZW5zZXNUb3RhbCA9IGNvbXB1dGVkKCgpID0+IHNhbGVzUmVwb3J0c1N0b3JlLmV4cGVuc2VzU3VtQW1vdW50KTtcbmNvbnN0IGNyZWRpdHNUb3RhbCA9IGNvbXB1dGVkKCgpID0+IHNhbGVzUmVwb3J0c1N0b3JlLmNyZWRpdFRvdGFsQW1vdW50KTtcbmNvbnN0IGNoYXJnZXNUb3RhbCA9IGNvbXB1dGVkKCgpID0+IHNhbGVzUmVwb3J0c1N0b3JlLmdldENoYXJnZXMpO1xuY29uc3QgZGVub21pbmF0aW9uVG90YWwgPSBjb21wdXRlZChcbiAgKCkgPT4gc2FsZXNSZXBvcnRzU3RvcmUuZ2V0RGVub21pbmF0aW9uVG90YWxcbik7XG5cbmNvbnN0IHRvdGFsU2FsZXNBbW91bnQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgYnJlYWRUb3RhbC52YWx1ZSArXG4gICAgc2VsZWN0YVRvdGFsLnZhbHVlICtcbiAgICBzb2Z0ZHJpbmtzVG90YWwudmFsdWUgK1xuICAgIGV4cGVuc2VzVG90YWwudmFsdWVcbiAgKTtcbn0pO1xuXG5jb25zdCBicmVhZFRvdGFsRm9ybWF0dGVkID0gY29tcHV0ZWQoKCkgPT4gZm9ybWF0Q3VycmVuY3koYnJlYWRUb3RhbC52YWx1ZSkpO1xuY29uc3Qgc2VsZWN0YVRvdGFsRm9ybWF0dGVkID0gY29tcHV0ZWQoKCkgPT5cbiAgZm9ybWF0Q3VycmVuY3koc2VsZWN0YVRvdGFsLnZhbHVlKVxuKTtcbmNvbnN0IHNvZnRkcmlua3NUb3RhbEZvcm1hdHRlZCA9IGNvbXB1dGVkKCgpID0+XG4gIGZvcm1hdEN1cnJlbmN5KHNvZnRkcmlua3NUb3RhbC52YWx1ZSlcbik7XG5jb25zdCBleHBlbnNlc1RvdGFsRm9ybWF0dGVkID0gY29tcHV0ZWQoKCkgPT5cbiAgZm9ybWF0Q3VycmVuY3koZXhwZW5zZXNUb3RhbC52YWx1ZSlcbik7XG5jb25zdCBjcmVkaXRzVG90YWxGb3JtYXR0ZWQgPSBjb21wdXRlZCgoKSA9PlxuICBmb3JtYXRDdXJyZW5jeShjcmVkaXRzVG90YWwudmFsdWUpXG4pO1xuY29uc3QgdG90YWxTYWxlc0Ftb3VudEZvcm1hdHRlZCA9IGNvbXB1dGVkKCgpID0+XG4gIGZvcm1hdEN1cnJlbmN5KHRvdGFsU2FsZXNBbW91bnQudmFsdWUpXG4pO1xuY29uc3QgZGVub21pbmF0aW9uVG90YWxGb3JtYXR0ZWQgPSBjb21wdXRlZCgoKSA9PlxuICBmb3JtYXRDdXJyZW5jeShkZW5vbWluYXRpb25Ub3RhbC52YWx1ZSlcbik7XG5jb25zdCBjaGFyZ2VzVG90YWxGb3JtYXR0ZWQgPSBjb21wdXRlZCgoKSA9PlxuICBmb3JtYXRDdXJyZW5jeShjaGFyZ2VzVG90YWwudmFsdWUpXG4pO1xuXG5jb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgYXdhaXQgc2FsZXNSZXBvcnRzU3RvcmUuc3VibWl0U2FsZXNSZXBvcnRzKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHN1Ym1pdHRpbmcgZGF0YTpcIiwgZXJyb3IpO1xuICB9XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5iZy1ncmFkaWVudCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMyNDI0MWQsICNiNzk1MDApO1xufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInEtcGEteG1cIj5cbiAgICA8ZGl2IGNsYXNzPVwidGV4dC1zdWJ0aXRsZTIgdGV4dC13ZWlnaHQtbGlnaHRcIj5Tb2Z0ZHJpbmtzIFJlcG9ydDwvZGl2PlxuICAgIDxxLWZpZWxkIG91dGxpbmVkIGRlbnNlIHJlYWRvbmx5PlxuICAgICAgPGRpdiBjbGFzcz1cInEtcHktc21cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLW1kXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxxLWl0ZW1cbiAgICAgICAgICAgICAgdi1mb3I9XCIoc29mdGRyaW5rcywgaW5kZXgpIGluIHNvZnRkcmlua3NSZXBvcnRzXCJcbiAgICAgICAgICAgICAgOmtleT1cImluZGV4XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSB0ZXh0LXN1YnRpdGxlMlwiIHNpZGU+XG4gICAgICAgICAgICAgICAge3sgc29mdGRyaW5rcy5uYW1lIH19XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInEtbWEtc20gcS1ndXR0ZXItc21cIiBzaWRlPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+QmVnaW5uaW5nczwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgIHt7IHNvZnRkcmlua3MudG90YWwgfX1cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSBxLWd1dHRlci1zbVwiIHNpZGU+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD5SZW1haW5uaW5nczwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgIHt7IHNvZnRkcmlua3MucmVtYWluaW5ncyB9fVxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJxLW1hLXNtIHEtZ3V0dGVyLXNtXCIgc2lkZT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPlNvbGQ8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+XG4gICAgICAgICAgICAgICAgICB7eyBzb2Z0ZHJpbmtzLnNvbGQgfX1cbiAgICAgICAgICAgICAgICAgIDwhLS0gPHEtcG9wdXAtZWRpdFxuICAgICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgICBidXR0b25zXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLXNldD1cIlNhdmVcIlxuICAgICAgICAgICAgICAgICAgICBsYWJlbC1jYW5jZWw9XCJDbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgIHYtc2xvdD1cInNjb3BlXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgICAgIGF1dG9mb2N1c1xuICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXJcbiAgICAgICAgICAgICAgICAgICAgICBAa2V5dXAuZW50ZXI9XCJzY29wZS5zZXRcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgICAgICAgICAgIDwvcS1wb3B1cC1lZGl0PiAtLT5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSBxLWd1dHRlci1zbVwiIHNpZGU+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD5QcmljZTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgIHt7IGZvcm1hdEN1cnJlbmN5KHNvZnRkcmlua3MucHJpY2UpIH19XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInEtbWEtc20gcS1ndXR0ZXItc21cIiBzaWRlPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+U2FsZXM8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+XG4gICAgICAgICAgICAgICAgICB7eyBmb3JtYXRDdXJyZW5jeShzb2Z0ZHJpbmtzLnNhbGVzKSB9fVxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJxLW1hLXNtIHEtZ3V0dGVyLXNtXCIgc2lkZT5cbiAgICAgICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgICAgIGNvbG9yPVwicmVkXCJcbiAgICAgICAgICAgICAgICAgIGljb249XCJjbG9zZVwiXG4gICAgICAgICAgICAgICAgICByb3VuZFxuICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgIEBjbGljaz1cInJlbW92ZVNvZnRkcmluayhpbmRleClcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtZmllbGQ+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgdXNlU2FsZXNSZXBvcnRzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9zYWxlcy1yZXBvcnRcIjtcblxuY29uc3Qgc2FsZXNSZXBvcnRzU3RvcmUgPSB1c2VTYWxlc1JlcG9ydHNTdG9yZSgpO1xuY29uc3Qgc29mdGRyaW5rc1JlcG9ydHMgPSBjb21wdXRlZCgoKSA9PiBzYWxlc1JlcG9ydHNTdG9yZS5zb2Z0ZHJpbmtzUmVwb3J0cyk7XG5cbmNvbnN0IGZvcm1hdEN1cnJlbmN5ID0gKHZhbHVlKSA9PiB7XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoXCJlbi1VU1wiLCB7XG4gICAgc3R5bGU6IFwiY3VycmVuY3lcIixcbiAgICBjdXJyZW5jeTogXCJQSFBcIixcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICB9KS5mb3JtYXQodmFsdWUpO1xufTtcblxuY29uc3QgcmVtb3ZlU29mdGRyaW5rID0gKGluZGV4KSA9PiB7XG4gIHNhbGVzUmVwb3J0c1N0b3JlLnJlbW92ZVNvZnRkcmluayhpbmRleCk7XG59O1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJxLXBhLXhtXCI+XG4gICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUyIHRleHQtd2VpZ2h0LWxpZ2h0XCI+U2VsZWN0YSBSZXBvcnQ8L2Rpdj5cbiAgICA8cS1maWVsZCBvdXRsaW5lZCBkZW5zZSByZWFkb25seT5cbiAgICAgIDxkaXYgY2xhc3M9XCJxLXB5LXNtXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci1tZFwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cS1pdGVtIHYtZm9yPVwiKHNlbGVjdGEsIGluZGV4KSBpbiBzZWxlY3RhUmVwb3J0c1wiIDprZXk9XCJpbmRleFwiPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJxLW1hLXNtIHRleHQtc3VidGl0bGUyXCIgc2lkZT5cbiAgICAgICAgICAgICAgICB7eyBzZWxlY3RhLm5hbWUgfX1cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSBxLWd1dHRlci1zbVwiIHNpZGU+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD5CZWdpbm5pZ3M8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+XG4gICAgICAgICAgICAgICAgICB7eyBzZWxlY3RhLnRvdGFsIH19XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInEtbWEtc20gcS1ndXR0ZXItc21cIiBzaWRlPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+UmVtYWlubmluZ3M8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+XG4gICAgICAgICAgICAgICAgICB7eyBzZWxlY3RhLnJlbWFpbmluZ3MgfX1cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSBxLWd1dHRlci1zbVwiIHNpZGU+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD5Tb2xkPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPlxuICAgICAgICAgICAgICAgICAge3sgc2VsZWN0YS5zb2xkIH19XG4gICAgICAgICAgICAgICAgICA8IS0tIDxxLXBvcHVwLWVkaXRcbiAgICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uc1xuICAgICAgICAgICAgICAgICAgICBsYWJlbC1zZXQ9XCJTYXZlXCJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwtY2FuY2VsPVwiQ2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICB2LXNsb3Q9XCJzY29wZVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgICAgICBhdXRvZm9jdXNcbiAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyXG4gICAgICAgICAgICAgICAgICAgICAgQGtleXVwLmVudGVyPVwic2NvcGUuc2V0XCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgICAgICAgICAgICA8L3EtcG9wdXAtZWRpdD4gLS0+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInEtbWEtc20gcS1ndXR0ZXItc21cIiBzaWRlPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+UHJpY2U8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+XG4gICAgICAgICAgICAgICAgICB7eyBmb3JtYXRDdXJyZW5jeShzZWxlY3RhLnByaWNlKSB9fVxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuXG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInEtbWEtc20gcS1ndXR0ZXItc21cIiBzaWRlPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+U2FsZXM8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+XG4gICAgICAgICAgICAgICAgICB7eyBmb3JtYXRDdXJyZW5jeShzZWxlY3RhLnNhbGVzKSB9fVxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJxLW1hLXNtIHEtZ3V0dGVyLXNtXCIgc2lkZT5cbiAgICAgICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgICAgIGNvbG9yPVwicmVkXCJcbiAgICAgICAgICAgICAgICAgIGljb249XCJjbG9zZVwiXG4gICAgICAgICAgICAgICAgICByb3VuZFxuICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgIEBjbGljaz1cInJlbW92ZVNlbGVjdGEoaW5kZXgpXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWZpZWxkPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IHVzZVNhbGVzUmVwb3J0c1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvc2FsZXMtcmVwb3J0XCI7XG5cbmNvbnN0IHNhbGVzUmVwb3J0c1N0b3JlID0gdXNlU2FsZXNSZXBvcnRzU3RvcmUoKTtcbmNvbnN0IHNlbGVjdGFSZXBvcnRzID0gY29tcHV0ZWQoKCkgPT4gc2FsZXNSZXBvcnRzU3RvcmUuc2VsZWN0YVJlcG9ydHMpO1xuXG5jb25zdCBmb3JtYXRDdXJyZW5jeSA9ICh2YWx1ZSkgPT4ge1xuICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KFwiZW4tVVNcIiwge1xuICAgIHN0eWxlOiBcImN1cnJlbmN5XCIsXG4gICAgY3VycmVuY3k6IFwiUEhQXCIsXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgfSkuZm9ybWF0KHZhbHVlKTtcbn07XG5cbmNvbnN0IHJlbW92ZVNlbGVjdGEgPSAoaW5kZXgpID0+IHtcbiAgc2FsZXNSZXBvcnRzU3RvcmUucmVtb3ZlU2VsZWN0YShpbmRleCk7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwicS1wYS14bVwiPlxuICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMiB0ZXh0LXdlaWdodC1saWdodFwiPkJyZWFkIFJlcG9ydDwvZGl2PlxuICAgIDxxLWZpZWxkIG91dGxpbmVkIGRlbnNlIHJlYWRvbmx5PlxuICAgICAgPGRpdiBjbGFzcz1cInEtcHktc21cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLW1kXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxxLWl0ZW0gdi1mb3I9XCIoYnJlYWQsIGluZGV4KSBpbiBicmVhZFJlcG9ydHNcIiA6a2V5PVwiaW5kZXhcIj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSB0ZXh0LXN1YnRpdGxlMlwiIHNpZGU+XG4gICAgICAgICAgICAgICAge3sgYnJlYWQubmFtZSB9fVxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJxLW1hLXNtIHEtZ3V0dGVyLXNtXCIgc2lkZT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPkJlZ2lubmluZ3M8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+XG4gICAgICAgICAgICAgICAgICB7eyBicmVhZC50b3RhbCB9fVxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJxLW1hLXNtIHEtZ3V0dGVyLXNtXCIgc2lkZT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPlJlbWFpbm5pbmdzPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPlxuICAgICAgICAgICAgICAgICAge3sgYnJlYWQucmVtYWluaW5nIH19XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInEtbWEtc20gcS1ndXR0ZXItc21cIiBzaWRlPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+U29sZDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgIHt7IGJyZWFkLmJyZWFkX3NvbGQgfX1cbiAgICAgICAgICAgICAgICAgIDwhLS0gPHEtcG9wdXAtZWRpdFxuICAgICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgICBidXR0b25zXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLXNldD1cIlNhdmVcIlxuICAgICAgICAgICAgICAgICAgICBsYWJlbC1jYW5jZWw9XCJDbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgIHYtc2xvdD1cInNjb3BlXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgICAgIGF1dG9mb2N1c1xuICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXJcbiAgICAgICAgICAgICAgICAgICAgICBAa2V5dXAuZW50ZXI9XCJzY29wZS5zZXRcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgICAgICAgICAgIDwvcS1wb3B1cC1lZGl0PiAtLT5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSBxLWd1dHRlci1zbVwiIHNpZGU+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD5QcmljZTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgIHt7IGZvcm1hdEN1cnJlbmN5KGJyZWFkLnByaWNlKSB9fVxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuXG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInEtbWEtc20gcS1ndXR0ZXItc21cIiBzaWRlPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+U2FsZXM8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+XG4gICAgICAgICAgICAgICAgICB7eyBmb3JtYXRDdXJyZW5jeShicmVhZC5zYWxlcykgfX1cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSBxLWd1dHRlci1zbVwiIHNpZGU+XG4gICAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgICBjb2xvcj1cInJlZFwiXG4gICAgICAgICAgICAgICAgICBpY29uPVwiY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgcm91bmRcbiAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICBAY2xpY2s9XCJyZW1vdmVCcmVhZChpbmRleClcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtZmllbGQ+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgdXNlU2FsZXNSZXBvcnRzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9zYWxlcy1yZXBvcnRcIjtcblxuY29uc3Qgc2FsZXNSZXBvcnRzU3RvcmUgPSB1c2VTYWxlc1JlcG9ydHNTdG9yZSgpO1xuY29uc3QgYnJlYWRSZXBvcnRzID0gY29tcHV0ZWQoKCkgPT4gc2FsZXNSZXBvcnRzU3RvcmUuYnJlYWRSZXBvcnRzKTtcblxuY29uc3QgZm9ybWF0Q3VycmVuY3kgPSAodmFsdWUpID0+IHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChcImVuLVVTXCIsIHtcbiAgICBzdHlsZTogXCJjdXJyZW5jeVwiLFxuICAgIGN1cnJlbmN5OiBcIlBIUFwiLFxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gIH0pLmZvcm1hdCh2YWx1ZSk7XG59O1xuXG5jb25zdCByZW1vdmVCcmVhZCA9IChpbmRleCkgPT4ge1xuICBzYWxlc1JlcG9ydHNTdG9yZS5yZW1vdmVCcmVhZChpbmRleCk7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwicS1wYS14bVwiPlxuICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMiB0ZXh0LXdlaWdodC1saWdodFwiPkV4cGVuc2VzIFJlcG9ydDwvZGl2PlxuICAgIDxxLWZpZWxkIG91dGxpbmVkIGRlbnNlIHJlYWRvbmx5PlxuICAgICAgPGRpdiBjbGFzcz1cInEtcHktc21cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLW1kXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxxLWl0ZW0gdi1mb3I9XCIoZXhwZW5zZXMsIGluZGV4KSBpbiBleHBlbnNlc1JlcG9ydHNcIiA6a2V5PVwiaW5kZXhcIj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSB0ZXh0LXN1YnRpdGxlMlwiIHNpZGU+XG4gICAgICAgICAgICAgICAge3sgZXhwZW5zZXMubmFtZSB9fVxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJxLW1hLXNtIHEtZ3V0dGVyLXNtXCIgc2lkZT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPkRlc2NyaXB0aW9uPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPlxuICAgICAgICAgICAgICAgICAge3sgZXhwZW5zZXMuZGVzY3JpcHRpb24gfX1cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSBxLWd1dHRlci1zbVwiIHNpZGU+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD5BbW91bnQ8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+XG4gICAgICAgICAgICAgICAgICB7eyBmb3JtYXRDdXJyZW5jeShleHBlbnNlcy5hbW91bnQpIH19XG4gICAgICAgICAgICAgICAgICA8IS0tIDxxLXBvcHVwLWVkaXRcbiAgICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uc1xuICAgICAgICAgICAgICAgICAgICBsYWJlbC1zZXQ9XCJTYXZlXCJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwtY2FuY2VsPVwiQ2xvc2VcIlxuICAgICAgICAgICAgICAgICAgICB2LXNsb3Q9XCJzY29wZVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgICAgICBhdXRvZm9jdXNcbiAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyXG4gICAgICAgICAgICAgICAgICAgICAgQGtleXVwLmVudGVyPVwic2NvcGUuc2V0XCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgICAgICAgICAgICA8L3EtcG9wdXAtZWRpdD4gLS0+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInEtbWEtc20gcS1ndXR0ZXItc21cIiBzaWRlPlxuICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgY29sb3I9XCJyZWRcIlxuICAgICAgICAgICAgICAgICAgaWNvbj1cImNsb3NlXCJcbiAgICAgICAgICAgICAgICAgIHJvdW5kXG4gICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgQGNsaWNrPVwicmVtb3ZlRXhwZW5zZXMoaW5kZXgpXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWZpZWxkPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IHVzZVNhbGVzUmVwb3J0c1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvc2FsZXMtcmVwb3J0XCI7XG5cbmNvbnN0IHNhbGVzUmVwb3J0c1N0b3JlID0gdXNlU2FsZXNSZXBvcnRzU3RvcmUoKTtcbmNvbnN0IGV4cGVuc2VzUmVwb3J0cyA9IGNvbXB1dGVkKCgpID0+IHNhbGVzUmVwb3J0c1N0b3JlLmV4cGVuc2VzUmVwb3J0cyk7XG5cbmNvbnN0IGZvcm1hdEN1cnJlbmN5ID0gKHZhbHVlKSA9PiB7XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoXCJlbi1VU1wiLCB7XG4gICAgc3R5bGU6IFwiY3VycmVuY3lcIixcbiAgICBjdXJyZW5jeTogXCJQSFBcIixcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICB9KS5mb3JtYXQodmFsdWUpO1xufTtcblxuY29uc3QgcmVtb3ZlRXhwZW5zZXMgPSAoaW5kZXgpID0+IHtcbiAgc2FsZXNSZXBvcnRzU3RvcmUucmVtb3ZlRXhwZW5zZXMoaW5kZXgpO1xufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+PC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInEtcGEteG1cIj5cbiAgICA8ZGl2IGNsYXNzPVwidGV4dC1zdWJ0aXRsZTIgdGV4dC13ZWlnaHQtbGlnaHRcIj5FbXBsb3llZSBDcmVkaXQgUmVwb3J0PC9kaXY+XG4gICAgPHEtZmllbGQgb3V0bGluZWQgZGVuc2UgcmVhZG9ubHk+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1weS1zbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItbWRcIj5cbiAgICAgICAgICA8ZGl2IHYtZm9yPVwiKHJlcG9ydCwgaW5kZXgpIGluIGVtcGxveWVlQ3JlZGl0UmVwb3J0XCIgOmtleT1cImluZGV4XCI+XG4gICAgICAgICAgICA8cS1pdGVtXG4gICAgICAgICAgICAgIHYtZm9yPVwiKGNyZWRpdCwgY3JlZGl0SW5kZXgpIGluIHJlcG9ydC5jcmVkaXRzXCJcbiAgICAgICAgICAgICAgOmtleT1cImNyZWRpdEluZGV4XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSB0ZXh0LXN1YnRpdGxlMlwiIHNpZGU+XG4gICAgICAgICAgICAgICAge3sgcmVwb3J0LmNyZWRpdF91c2VyX25hbWUgfX1cbiAgICAgICAgICAgICAgICB7e319XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInEtbWEtc20gcS1ndXR0ZXItc21cIiBzaWRlPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+UHJvZHVjdHMgTmFtZTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgIHt7IGNyZWRpdC5wcm9kdWN0TmFtZSB9fVxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJxLW1hLXNtIHEtZ3V0dGVyLXNtXCIgc2lkZT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPlByaWNlPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPlxuICAgICAgICAgICAgICAgICAge3sgZm9ybWF0Q3VycmVuY3koY3JlZGl0LnByaWNlKSB9fVxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJxLW1hLXNtIHEtZ3V0dGVyLXNtXCIgc2lkZT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPlBjczwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgIHt7IGNyZWRpdC5waWVjZXMgfX1cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSBxLWd1dHRlci1zbVwiIHNpZGU+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD5Ub3RhbDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgIHt7IGZvcm1hdEN1cnJlbmN5KHJlcG9ydC50b3RhbF9hbW91bnQpIH19XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDwhLS0gLSB7eyBjcmVkaXQucHJvZHVjdE5hbWUgfX0gLSAtLT5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIHNpZGU+XG4gICAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgICBjb2xvcj1cInJlZFwiXG4gICAgICAgICAgICAgICAgICBpY29uPVwiY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgcm91bmRcbiAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICBAY2xpY2s9XCJyZW1vdmVFbXBsb3llZUNyZWRpdFJlcG9ydChpbmRleClcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtZmllbGQ+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgdXNlU2FsZXNSZXBvcnRzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9zYWxlcy1yZXBvcnRcIjtcblxuY29uc3Qgc2FsZXNSZXBvcnRzU3RvcmUgPSB1c2VTYWxlc1JlcG9ydHNTdG9yZSgpO1xuY29uc3QgZW1wbG95ZWVDcmVkaXRSZXBvcnQgPSBjb21wdXRlZChcbiAgKCkgPT4gc2FsZXNSZXBvcnRzU3RvcmUuZW1wbG95ZWVDcmVkaXRSZXBvcnRzXG4pO1xuXG5jb25zdCBmb3JtYXRDdXJyZW5jeSA9ICh2YWx1ZSkgPT4ge1xuICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KFwiZW4tVVNcIiwge1xuICAgIHN0eWxlOiBcImN1cnJlbmN5XCIsXG4gICAgY3VycmVuY3k6IFwiUEhQXCIsXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgfSkuZm9ybWF0KHZhbHVlKTtcbn07XG5cbmNvbnN0IHJlbW92ZUVtcGxveWVlQ3JlZGl0UmVwb3J0ID0gKGluZGV4KSA9PiB7XG4gIHNhbGVzUmVwb3J0c1N0b3JlLnJlbW92ZUVtcGxveWVlQ3JlZGl0UmVwb3J0KGluZGV4KTtcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWJ0blxuICAgIG91dGxpbmVcbiAgICBjbGFzcz1cInRleHQtd2hpdGUgcS1wYS1zbVwiXG4gICAgcHVzaFxuICAgIGRlbnNlXG4gICAgZWxldmF0ZWRcbiAgICBpY29uPVwidmlzaWJpbGl0eVwiXG4gICAgbGFiZWw9XCJWaWV3IFJlcG9ydHNcIlxuICAgIEBjbGljaz1cIm9wZW5EaWFsb2dcIlxuICA+XG4gIDwvcS1idG4+XG4gIDxxLWRpYWxvZyB2LW1vZGVsPVwiZGlhbG9nXCIgbWF4aW1pemVkPlxuICAgIDxxLWNhcmQ+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgcGFkZGluZz1cInNtIG1kXCJcbiAgICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgIGxhYmVsPVwicHJldlwiXG4gICAgICAgICAgICAgICAgaWNvbj1cImFycm93X2JhY2tfaW9zX25ld1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwhLS0gQGNsaWNrPVwib25QcmV2XCIgLS0+XG4gICAgICAgICAgICAgIDxxLXNlcGFyYXRvciB2ZXJ0aWNhbCAvPlxuICAgICAgICAgICAgICA8cS1idG4gcGFkZGluZz1cInNtIG1kXCIgc2l6ZT1cInNtXCIgZGVuc2UgZmxhdD5cbiAgICAgICAgICAgICAgICA8IS0tIEBjbGljaz1cIm9uQ3VycmVudFwiIC0tPlxuICAgICAgICAgICAgICAgIENVUlJFTlQ8L3EtYnRuXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHEtc2VwYXJhdG9yIHZlcnRpY2FsIC8+XG4gICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgIHBhZGRpbmc9XCJzbSBtZFwiXG4gICAgICAgICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICBsYWJlbD1cIm5leHRcIlxuICAgICAgICAgICAgICAgIGljb249XCJhcnJvd19mb3J3YXJkX2lvc1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwhLS0gQGNsaWNrPVwib25OZXh0XCIgLS0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPCEtLSBwYWRkaW5nPVwic20gbWRcIiAtLT5cbiAgICAgICAgICAgIDxxLWJ0biBzaXplPVwibWRcIiBvdXRsaW5lIHJvdW5kZWQgaWNvbj1cImNsb3NlXCIgZGVuc2Ugdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8ZGl2IGNsYXNzPVwicm93IHEtcGEtbWQganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdj5EYXRlOiBOb3ZlbWJlciAxMSwgMjAyNDwvZGl2PlxuICAgICAgICAgIENhc2hpZXI6IENhc2hpZXIgQy4gQ2FzaGllclxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5UaW1lOiAwODowMCBQTTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8cS10YWJsZSB0aXRsZT1cIlwiIDpyb3dzPVwicm93c1wiIDpjb2x1bW5zPVwiY29sdW1uc1wiIHJvdy1rZXk9XCJuYW1lXCIgLz5cblxuICAgICAge3sgc2FsZXNSZXBvcnQgfX1cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VTYWxlc1JlcG9ydHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3NhbGVzLXJlcG9ydFwiO1xuaW1wb3J0IHsgY29tcHV0ZWQsIG9uTW91bnRlZCwgcmVmIH0gZnJvbSBcInZ1ZVwiO1xuXG5jb25zdCBzYWxlc1JlcG9ydFN0b3JlID0gdXNlU2FsZXNSZXBvcnRzU3RvcmUoKTtcbmNvbnN0IHNhbGVzUmVwb3J0ID0gY29tcHV0ZWQoKCkgPT4gc2FsZXNSZXBvcnRTdG9yZS5zYWxlc1JlcG9ydCk7XG5jb25zdCB1c2VyRGF0YSA9IGNvbXB1dGVkKCgpID0+IHNhbGVzUmVwb3J0U3RvcmUudXNlcik7XG5jb25zdCBicmFuY2hJZCA9XG4gIHVzZXJEYXRhLnZhbHVlPy5kYXRhPy5lbXBsb3llZT8uYnJhbmNoX2VtcGxveWVlPy5icmFuY2hfaWQgfHwgXCJcIjtcbmNvbnNvbGUubG9nKFwic2FsZXMgYnJhbmNoIGlkXCIsIGJyYW5jaElkKTtcbmNvbnN0IGxvYWRpbmcgPSByZWYodHJ1ZSk7XG5cbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IG9wZW5EaWFsb2cgPSAoKSA9PiB7XG4gIGRpYWxvZy52YWx1ZSA9IHRydWU7XG59O1xuXG5vbk1vdW50ZWQoYXN5bmMgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhcIk9ubW91bnRlZCBkYXRhXCIsIGJyYW5jaElkKTtcbiAgaWYgKGJyYW5jaElkKSB7XG4gICAgYXdhaXQgcmVsb2FkVGFibGVEYXRhKGJyYW5jaElkKTtcbiAgfVxufSk7XG5cbmNvbnN0IHJlbG9hZFRhYmxlRGF0YSA9IGFzeW5jIChicmFuY2hJZCkgPT4ge1xuICBjb25zb2xlLmxvZyhcImJyYW5jaCBkYXRhXCIsIGJyYW5jaElkKTtcbiAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gIGF3YWl0IHNhbGVzUmVwb3J0U3RvcmUuZmV0Y2hTYWxlc1JlcG9ydHMoYnJhbmNoSWQpO1xuICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG59O1xuXG5jb25zdCBjb2x1bW5zID0gW1xuICB7XG4gICAgbmFtZTogXCJuYW1lXCIsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgbGFiZWw6IFwiRGVzc2VydCAoMTAwZyBzZXJ2aW5nKVwiLFxuICAgIGFsaWduOiBcImxlZnRcIixcbiAgICBmaWVsZDogKHJvdykgPT4gcm93Lm5hbWUsXG4gICAgZm9ybWF0OiAodmFsKSA9PiBgJHt2YWx9YCxcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiY2Fsb3JpZXNcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBsYWJlbDogXCJDYWxvcmllc1wiLFxuICAgIGZpZWxkOiBcImNhbG9yaWVzXCIsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG4gIHsgbmFtZTogXCJmYXRcIiwgbGFiZWw6IFwiRmF0IChnKVwiLCBmaWVsZDogXCJmYXRcIiwgc29ydGFibGU6IHRydWUgfSxcbiAgeyBuYW1lOiBcImNhcmJzXCIsIGxhYmVsOiBcIkNhcmJzIChnKVwiLCBmaWVsZDogXCJjYXJic1wiIH0sXG4gIHsgbmFtZTogXCJwcm90ZWluXCIsIGxhYmVsOiBcIlByb3RlaW4gKGcpXCIsIGZpZWxkOiBcInByb3RlaW5cIiB9LFxuICB7IG5hbWU6IFwic29kaXVtXCIsIGxhYmVsOiBcIlNvZGl1bSAobWcpXCIsIGZpZWxkOiBcInNvZGl1bVwiIH0sXG4gIHtcbiAgICBuYW1lOiBcImNhbGNpdW1cIixcbiAgICBsYWJlbDogXCJDYWxjaXVtICglKVwiLFxuICAgIGZpZWxkOiBcImNhbGNpdW1cIixcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgICBzb3J0OiAoYSwgYikgPT4gcGFyc2VJbnQoYSwgMTApIC0gcGFyc2VJbnQoYiwgMTApLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJpcm9uXCIsXG4gICAgbGFiZWw6IFwiSXJvbiAoJSlcIixcbiAgICBmaWVsZDogXCJpcm9uXCIsXG4gICAgc29ydGFibGU6IHRydWUsXG4gICAgc29ydDogKGEsIGIpID0+IHBhcnNlSW50KGEsIDEwKSAtIHBhcnNlSW50KGIsIDEwKSxcbiAgfSxcbl07XG5cbmNvbnN0IHJvd3MgPSBbXG4gIHtcbiAgICBuYW1lOiBcIkZyb3plbiBZb2d1cnRcIixcbiAgICBjYWxvcmllczogMTU5LFxuICAgIGZhdDogNi4wLFxuICAgIGNhcmJzOiAyNCxcbiAgICBwcm90ZWluOiA0LjAsXG4gICAgc29kaXVtOiA4NyxcbiAgICBjYWxjaXVtOiBcIjE0JVwiLFxuICAgIGlyb246IFwiMSVcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiSWNlIGNyZWFtIHNhbmR3aWNoXCIsXG4gICAgY2Fsb3JpZXM6IDIzNyxcbiAgICBmYXQ6IDkuMCxcbiAgICBjYXJiczogMzcsXG4gICAgcHJvdGVpbjogNC4zLFxuICAgIHNvZGl1bTogMTI5LFxuICAgIGNhbGNpdW06IFwiOCVcIixcbiAgICBpcm9uOiBcIjElXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkVjbGFpclwiLFxuICAgIGNhbG9yaWVzOiAyNjIsXG4gICAgZmF0OiAxNi4wLFxuICAgIGNhcmJzOiAyMyxcbiAgICBwcm90ZWluOiA2LjAsXG4gICAgc29kaXVtOiAzMzcsXG4gICAgY2FsY2l1bTogXCI2JVwiLFxuICAgIGlyb246IFwiNyVcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiQ3VwY2FrZVwiLFxuICAgIGNhbG9yaWVzOiAzMDUsXG4gICAgZmF0OiAzLjcsXG4gICAgY2FyYnM6IDY3LFxuICAgIHByb3RlaW46IDQuMyxcbiAgICBzb2RpdW06IDQxMyxcbiAgICBjYWxjaXVtOiBcIjMlXCIsXG4gICAgaXJvbjogXCI4JVwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJHaW5nZXJicmVhZFwiLFxuICAgIGNhbG9yaWVzOiAzNTYsXG4gICAgZmF0OiAxNi4wLFxuICAgIGNhcmJzOiA0OSxcbiAgICBwcm90ZWluOiAzLjksXG4gICAgc29kaXVtOiAzMjcsXG4gICAgY2FsY2l1bTogXCI3JVwiLFxuICAgIGlyb246IFwiMTYlXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkplbGx5IGJlYW5cIixcbiAgICBjYWxvcmllczogMzc1LFxuICAgIGZhdDogMC4wLFxuICAgIGNhcmJzOiA5NCxcbiAgICBwcm90ZWluOiAwLjAsXG4gICAgc29kaXVtOiA1MCxcbiAgICBjYWxjaXVtOiBcIjAlXCIsXG4gICAgaXJvbjogXCIwJVwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJMb2xsaXBvcFwiLFxuICAgIGNhbG9yaWVzOiAzOTIsXG4gICAgZmF0OiAwLjIsXG4gICAgY2FyYnM6IDk4LFxuICAgIHByb3RlaW46IDAsXG4gICAgc29kaXVtOiAzOCxcbiAgICBjYWxjaXVtOiBcIjAlXCIsXG4gICAgaXJvbjogXCIyJVwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJIb25leWNvbWJcIixcbiAgICBjYWxvcmllczogNDA4LFxuICAgIGZhdDogMy4yLFxuICAgIGNhcmJzOiA4NyxcbiAgICBwcm90ZWluOiA2LjUsXG4gICAgc29kaXVtOiA1NjIsXG4gICAgY2FsY2l1bTogXCIwJVwiLFxuICAgIGlyb246IFwiNDUlXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkRvbnV0XCIsXG4gICAgY2Fsb3JpZXM6IDQ1MixcbiAgICBmYXQ6IDI1LjAsXG4gICAgY2FyYnM6IDUxLFxuICAgIHByb3RlaW46IDQuOSxcbiAgICBzb2RpdW06IDMyNixcbiAgICBjYWxjaXVtOiBcIjIlXCIsXG4gICAgaXJvbjogXCIyMiVcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiS2l0S2F0XCIsXG4gICAgY2Fsb3JpZXM6IDUxOCxcbiAgICBmYXQ6IDI2LjAsXG4gICAgY2FyYnM6IDY1LFxuICAgIHByb3RlaW46IDcsXG4gICAgc29kaXVtOiA1NCxcbiAgICBjYWxjaXVtOiBcIjEyJVwiLFxuICAgIGlyb246IFwiNiVcIixcbiAgfSxcbl07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWNhcmQgZmxhdD5cbiAgICA8cS1jYXJkLXNlY3Rpb25cbiAgICAgIGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlblwiXG4gICAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNlZjQ0NDRcIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2IHRleHQtd2hpdGVcIj5cbiAgICAgICAgPHEtaWNvbiBuYW1lPVwiZmEtc29saWQgZmEtbGF5ZXItZ3JvdXBcIiAvPlxuICAgICAgICBTYWxlcyBSZXBvcnRcbiAgICAgIDwvZGl2PlxuICAgICAgPCEtLSB0ZXh0LXdoaXRlICAtLT5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxWaWV3T2xkUmVwb3J0cyAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLW1kIHEtbWItbGdcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8RXhwZW5zZXNSZXBvcnQgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPEVtcGxveWVlQ3JlZGl0UmVwb3J0IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxEZW5vbWluYXRpb25SZXBvcnQgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJxLW10LW1kXCI+XG4gICAgICAgIDxPdmVyQWxsVG90YWwgLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbWQgcS1ndXR0ZXIteS1tZFwiPlxuICAgICAgICA8RW1wbG95ZWVDcmVkaXRSZXBvcnRGaWVsZCAvPlxuICAgICAgICA8RXhwZW5zZXNSZXBvcnRGaWVsZCAvPlxuICAgICAgICA8QnJlYWRSZXBvcnRGaWVsZCAvPlxuICAgICAgICA8U2VsZWN0YVJlcG9ydEZpZWxkIC8+XG4gICAgICAgIDxTb2Z0ZHJpbmtzUmVwb3J0RmllbGQgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gIDwvcS1jYXJkPlxuPC90ZW1wbGF0ZT5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgRGVub21pbmF0aW9uUmVwb3J0IGZyb20gXCIuL2NvbXBvbmVudHMvRGVub21pbmF0aW9uUmVwb3J0LnZ1ZVwiO1xuaW1wb3J0IEVtcGxveWVlQ3JlZGl0UmVwb3J0IGZyb20gXCIuL2NvbXBvbmVudHMvRW1wbG95ZWVDcmVkaXRSZXBvcnQudnVlXCI7XG5pbXBvcnQgRXhwZW5zZXNSZXBvcnQgZnJvbSBcIi4vY29tcG9uZW50cy9FeHBlbnNlc1JlcG9ydC52dWVcIjtcbmltcG9ydCBPdmVyQWxsVG90YWwgZnJvbSBcIi4vY29tcG9uZW50cy9PdmVyQWxsVG90YWwudnVlXCI7XG5pbXBvcnQgU29mdGRyaW5rc1JlcG9ydEZpZWxkIGZyb20gXCIuL2NvbXBvbmVudHMvU29mdGRyaW5rc1JlcG9ydEZpZWxkLnZ1ZVwiO1xuaW1wb3J0IFNlbGVjdGFSZXBvcnRGaWVsZCBmcm9tIFwiLi9jb21wb25lbnRzL1NlbGVjdGFSZXBvcnRGaWVsZC52dWVcIjtcbmltcG9ydCBCcmVhZFJlcG9ydEZpZWxkIGZyb20gXCIuL2NvbXBvbmVudHMvQnJlYWRSZXBvcnRGaWVsZC52dWVcIjtcbmltcG9ydCBFeHBlbnNlc1JlcG9ydEZpZWxkIGZyb20gXCIuL2NvbXBvbmVudHMvRXhwZW5zZXNSZXBvcnRGaWVsZC52dWVcIjtcbmltcG9ydCBFbXBsb3llZUNyZWRpdFJlcG9ydEZpZWxkIGZyb20gXCIuL2NvbXBvbmVudHMvRW1wbG95ZWVDcmVkaXRSZXBvcnRGaWVsZC52dWVcIjtcbmltcG9ydCBWaWV3T2xkUmVwb3J0cyBmcm9tIFwiLi9jb21wb25lbnRzL1ZpZXdPbGRSZXBvcnRzLnZ1ZVwiO1xuaW1wb3J0IHsgcmVmLCByZWFjdGl2ZSB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgZGlhbG9nID0gcmVmKGZhbHNlKTtcbmNvbnN0IG9wZW5EaWFsb2cgPSAoKSA9PiB7XG4gIGRpYWxvZy52YWx1ZSA9IHRydWU7XG59O1xuY29uc3QgYnJlYWRMaXN0ID0gcmVhY3RpdmUoW1xuICB7XG4gICAgbmFtZTogXCJXaG9sZSBXaGVhdFwiLFxuICAgIHNvbGQ6IDEwLFxuICAgIHByaWNlOiA1LFxuICAgIGJlZ2lubmluZzogMjAsXG4gICAgc2FsZXM6IDMwLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJTb3VyZG91Z2hcIixcbiAgICBzb2xkOiAxNSxcbiAgICBwcmljZTogNyxcbiAgICBiZWdpbm5pbmc6IDI1LFxuICAgIHNhbGVzOiA0MCxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiUGFuIGRlIENvY29cIixcbiAgICBzb2xkOiAxNSxcbiAgICBwcmljZTogNCxcbiAgICBiZWdpbm5pbmc6IDI1LFxuICAgIHNhbGVzOiA0MCxcbiAgfSxcbiAgLy8gQWRkIG1vcmUgYnJlYWQgaXRlbXMgYXMgbmVlZGVkXG5dKTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XG4uYmctZ3JhZGllbnQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMjQyNDFkLCAjZWY0NDQ0KTtcbn1cblxuLmdyYWRpZW50LWJ0biB7XG4gIGJvcmRlcjogNXB4IHNvbGlkOyAvKiBEZWZpbmUgYm9yZGVyIHNpemUgKi9cbiAgYm9yZGVyLWltYWdlLXNsaWNlOiAxO1xuICBib3JkZXItd2lkdGg6IDJweDsgLyogQWRqdXN0IHRoZSB3aWR0aCBhcyBuZWVkZWQgKi9cbiAgYm9yZGVyLWltYWdlLXNvdXJjZTogbGluZWFyLWdyYWRpZW50KFxuICAgIDQ1ZGVnLFxuICAgICNmYzAxNjUsXG4gICAgIzI1NzVmY1xuICApOyAvKiBVc2UgeW91ciBncmFkaWVudCAqL1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgLyogU2V0IGJhY2tncm91bmQgdG8gdHJhbnNwYXJlbnQgaWYgbmVlZGVkICovXG59XG5cbi5ncmFkaWVudC1idG4gcS1idG4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgLyogS2VlcCB0aGUgYnV0dG9uJ3MgYmFja2dyb3VuZCB3aGl0ZSAqL1xuICBwYWRkaW5nOiBzbSBtZDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBjb2xvcjogIzAwMDsgLyogQWRqdXN0IHRleHQgY29sb3IgKi9cbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsic2VhcmNoUXVlcnkiLCJfYyIsIl9iIiwiX2EiLCJicmFuY2hJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrTUEsVUFBTSxvQkFBb0IscUJBQW9CO0FBRTlDLFVBQU0sU0FBUyxJQUFJLEtBQUs7QUFDeEIsVUFBTSxhQUFhLE1BQU07QUFDdkIsYUFBTyxRQUFRO0FBQUEsSUFDakI7QUFDQSxVQUFNLFdBQVcsTUFBTTtBQUNyQixhQUFPLFFBQVE7QUFBQSxJQUNqQjtBQUVBLFVBQU0sbUJBQW1CLFNBQVM7QUFBQSxNQUNoQyxrQkFBa0I7QUFBQSxNQUNsQixrQkFBa0I7QUFBQSxNQUNsQixpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsTUFDYixVQUFVO0FBQUEsTUFDVixXQUFXO0FBQUEsTUFDWCxVQUFVO0FBQUEsTUFDVixpQkFBaUI7QUFBQSxJQUNuQixDQUFDO0FBRUQsVUFBTSxpQkFBaUIsQ0FBQyxVQUFVO0FBQ2hDLGFBQU8sSUFBSSxLQUFLLGFBQWEsU0FBUztBQUFBLFFBQ3BDLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQSxRQUNWLHVCQUF1QjtBQUFBLFFBQ3ZCLHVCQUF1QjtBQUFBLE1BQzNCLENBQUcsRUFBRSxPQUFPLEtBQUs7QUFBQSxJQUNqQjtBQUVBLFVBQU0sb0JBQW9CLFNBQVMsTUFBTTtBQUN2QyxhQUNFLGlCQUFpQixtQkFBbUIsTUFDcEMsaUJBQWlCLG1CQUFtQixNQUNwQyxpQkFBaUIsa0JBQWtCLE1BQ25DLGlCQUFpQixrQkFBa0IsTUFDbkMsaUJBQWlCLGFBQWEsS0FDOUIsaUJBQWlCLGNBQWMsS0FDL0IsaUJBQWlCLGNBQWMsS0FDL0IsaUJBQWlCLFdBQVcsS0FDNUIsaUJBQWlCLFlBQVksSUFDN0IsaUJBQWlCLFdBQVcsSUFDNUIsaUJBQWlCLGtCQUFrQjtBQUFBLElBRXZDLENBQUM7QUFDRCxVQUFNLDBCQUEwQixTQUFTLE1BQU07QUFDN0MsYUFBTyxlQUFlLGtCQUFrQixLQUFLO0FBQUEsSUFDL0MsQ0FBQztBQUVELFVBQU0sZUFBZSxNQUFNO0FBQ3pCLFlBQU0sdUJBQXVCLGtCQUFrQjtBQUMvQyx3QkFBa0Isb0JBQW9CLGdCQUFnQjtBQUN0RCx3QkFBa0Isd0JBQXdCLG9CQUFvQjtBQUM5RCx3QkFBa0IsaUJBQWlCLG9CQUFvQjtBQUV2RCxjQUFRLElBQUksc0JBQXNCLGdCQUFnQjtBQUNsRCxjQUFRLElBQUksMkJBQTJCLG9CQUFvQjtBQUMzRCxjQUFRLElBQUksaUNBQWlDLHdCQUF3QixLQUFLO0FBRTFFO0lBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCQSxVQUFNLGdCQUFnQixjQUFhO0FBQ1osYUFBUyxNQUFNLGNBQWMsS0FBSztBQUN6RCxVQUFNLGdCQUFnQixpQkFBZ0I7QUFDdEMsVUFBTSxZQUFZLFNBQVMsTUFBTSxjQUFjLGVBQWU7QUFDOUQsVUFBTSxvQkFBb0IscUJBQW9CO0FBQzlDLFVBQU0sb0JBQW9CLFNBQVMsTUFBTSxrQkFBa0IsUUFBUTtBQUNuRSxZQUFRLElBQUksbUJBQW1CLGtCQUFrQixLQUFLO0FBQ3RELFVBQU0sV0FBVyxrQkFBa0I7QUFDbkMsWUFBUSxJQUFJLFlBQVksUUFBUTtBQUNoQyxVQUFNLFNBQVMsSUFBSSxLQUFLO0FBQ3hCLFVBQU1BLGVBQWMsSUFBSSxFQUFFO0FBQzFCLFVBQU0sZ0JBQWdCLElBQUksRUFBRTtBQUM1QixVQUFNLGVBQWUsSUFBSSxLQUFLO0FBQzlCLFVBQU0sa0JBQWtCLElBQUksS0FBSztBQUNqQyxRQUFJLGVBQWU7QUFDbkIsUUFBSSxtQkFBbUI7QUFDdkIsVUFBTSxVQUFVLElBQUksS0FBSztBQUN6QixVQUFNLHdCQUF3QixJQUFJLEtBQUs7QUFDdkMsVUFBTSx1QkFBdUIsSUFBSSxLQUFLO0FBU3RDLFVBQU0sY0FBYyxZQUFZOztBQUM5QixVQUFJQSxhQUFZLE9BQU87QUFDckIsOEJBQXNCLFFBQVE7QUFDOUIsY0FBTSxhQUFXLHNEQUFVLFNBQVYsbUJBQWdCLGFBQWhCLG1CQUEwQixvQkFBMUIsbUJBQTJDLGNBQWE7QUFDekUsZ0JBQVEsSUFBSSxxQkFBcUJBLGFBQVksS0FBSztBQUNsRCxnQkFBUSxJQUFJLFlBQVksUUFBUTtBQUNoQyxjQUFNLGNBQWMsMkJBQTJCQSxhQUFZLE9BQU8sUUFBUTtBQUcxRSw4QkFBc0IsUUFBUTtBQUM5QixxQkFBYSxRQUFRO0FBQUEsTUFDdEI7QUFBQSxJQUNIO0FBRUEsVUFBTSxhQUFhLE1BQU07QUFDdkIsYUFBTyxRQUFRO0FBQUEsSUFDakI7QUFFQSxVQUFNLFdBQVcsTUFBTTtBQUNyQixhQUFPLFFBQVE7QUFBQSxJQUNqQjtBQUVBLFVBQU0sYUFBYSxTQUFTO0FBQUEsTUFDMUIsZ0JBQWdCO0FBQUEsTUFDaEIsTUFBTTtBQUFBLE1BQ04sWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsYUFBYTtBQUFBLElBQ2YsQ0FBQztBQUVELFVBQU0sUUFBUSxNQUFNO0FBQ2xCLE1BQUFBLGFBQVksUUFBUTtBQUNwQixvQkFBYyxRQUFRO0FBQ3RCLGlCQUFXLGlCQUFpQjtBQUM1QixpQkFBVyxPQUFPO0FBQ2xCLGlCQUFXLGFBQWE7QUFDeEIsaUJBQVcsY0FBYztBQUN6QixpQkFBVyxRQUFRO0FBQ25CLGlCQUFXLFNBQVM7QUFDcEIsaUJBQVcsY0FBYztBQUN6QixpQkFBVyxRQUFRO0lBQ3JCO0FBRUEsVUFBTSxlQUFlLE1BQU07QUFDekIsb0JBQWMsUUFBUTtBQUN0QixpQkFBVyxhQUFhO0FBQ3hCLGlCQUFXLGNBQWM7QUFDekIsaUJBQVcsUUFBUTtBQUNuQixpQkFBVyxTQUFTO0FBQUEsSUFDdEI7QUFFQSxVQUFNLG9CQUFvQixTQUFTLE1BQU07QUFDdkMsYUFBT0EsYUFBWSxTQUFTLFVBQVUsTUFBTSxTQUFTO0FBQUEsSUFDdkQsQ0FBQztBQUVELFVBQU0sZUFBZSxDQUFDLFNBQVM7QUFDN0IsY0FBUSxJQUFJLFVBQVUsSUFBSTtBQUMxQixNQUFBQSxhQUFZLFFBQVEsR0FBRyxLQUFLLFNBQVMsYUFDbkMsS0FBSyxTQUFTLGFBQWEsS0FBSyxTQUFTLFdBQVcsT0FBTyxDQUFDLElBQUksTUFBTSxNQUNwRSxLQUFLLFNBQVM7QUFDbEIsaUJBQVcsaUJBQWlCLEtBQUssU0FBUztBQUMxQyxpQkFBVyxPQUFPLEdBQUcsS0FBSyxTQUFTLGFBQ2pDLEtBQUssU0FBUyxhQUFhLEtBQUssU0FBUyxXQUFXLE9BQU8sQ0FBQyxJQUFJLE1BQU0sTUFDcEUsS0FBSyxTQUFTO0FBQ2xCLHFCQUFlO0FBQ2YsbUJBQWEsUUFBUTtBQUFBLElBQ3ZCO0FBRUEsVUFBTSxpQkFBaUIsWUFBWTs7QUFDakMsVUFBSSxjQUFjLE9BQU87QUFDdkIsNkJBQXFCLFFBQVE7QUFDN0IsY0FBTSxhQUFXLHNEQUFVLFNBQVYsbUJBQWdCLGFBQWhCLG1CQUEwQixvQkFBMUIsbUJBQTJDLGNBQWE7QUFDekUsY0FBTSxXQUFXLE1BQU0sa0JBQWtCO0FBQUEsVUFDdkMsY0FBYztBQUFBLFVBQ2Q7QUFBQSxRQUNOO0FBQ0ksZ0JBQVEsSUFBSSxZQUFZLFFBQVE7QUFDaEMsNkJBQXFCLFFBQVE7QUFDN0Isd0JBQWdCLFFBQVE7QUFBQSxNQUN6QjtBQUFBLElBQ0g7QUFFQSxVQUFNLDJCQUEyQixTQUFTLE1BQU07QUFDOUMsYUFBTyxjQUFjLFNBQVMsa0JBQWtCLE1BQU0sU0FBUztBQUFBLElBQ2pFLENBQUM7QUFDRCxZQUFRLElBQUksMkJBQTJCLGtCQUFrQixLQUFLO0FBRTlELFVBQU0sa0JBQWtCLENBQUMsWUFBWTtBQUNuQyxvQkFBYyxRQUFRLFFBQVE7QUFDOUIsaUJBQVcsY0FBYyxRQUFRO0FBQ2pDLGlCQUFXLGFBQWEsUUFBUTtBQUNoQyxpQkFBVyxRQUFRLFFBQVE7QUFDM0IseUJBQW1CO0FBQ25CLHNCQUFnQixRQUFRO0FBQUEsSUFDMUI7QUFFQSxVQUFNLDJCQUEyQixJQUFJLEVBQUU7QUFDdkMsVUFBTSxhQUFhLElBQUksQ0FBQSxDQUFFO0FBRXpCLFVBQU0sb0NBQW9DLE1BQU07QUFDOUMsWUFBTSxRQUFRLFdBQVcsV0FBVyxLQUFLO0FBQ3pDLFlBQU0sU0FBUyxTQUFTLFdBQVcsTUFBTTtBQUV6QyxVQUFJLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxNQUFNLE1BQU0sR0FBRztBQUNuQyxjQUFNLGNBQWMsUUFBUTtBQUM1QixpQ0FBeUIsUUFBUSxZQUFZLFFBQVEsQ0FBQztBQUFBLE1BQzFELE9BQVM7QUFDTCxpQ0FBeUIsUUFBUTtBQUFBLE1BQ2xDO0FBRUQsY0FBUSxJQUFJLDRCQUE0Qix5QkFBeUIsS0FBSztBQUFBLElBQ3hFO0FBQ0EsVUFBTSxrQkFBa0IsTUFBTTtBQUM1QixZQUFNLGNBQWMseUJBQXlCO0FBRTdDLGlCQUFXLE1BQU0sS0FBSztBQUFBLFFBQ3BCLGdCQUFnQixXQUFXO0FBQUEsUUFDM0IsWUFBWSxXQUFXO0FBQUEsUUFDdkIsTUFBTSxXQUFXO0FBQUEsUUFDakIsYUFBYSxXQUFXO0FBQUEsUUFDeEIsT0FBTyxXQUFXO0FBQUEsUUFDbEIsUUFBUSxXQUFXO0FBQUEsUUFDbkI7QUFBQSxNQUNKLENBQUc7QUFDRDtJQUNGO0FBRUEsVUFBTSxlQUFlLENBQUMsVUFBVTtBQUM5QixpQkFBVyxNQUFNLE9BQU8sT0FBTyxDQUFDO0FBQUEsSUFDbEM7QUFFQSxVQUFNQSxjQUFhLENBQUMsYUFBYTtBQUMvQixVQUFJLFNBQVMsU0FBUyxLQUFLLENBQUMsY0FBYztBQUN4QztNQUNKLE9BQVM7QUFDTCxxQkFBYSxRQUFRO0FBQUEsTUFDdEI7QUFDRCxxQkFBZTtBQUFBLElBQ2pCLENBQUM7QUFFRCxVQUFNLGVBQWUsQ0FBQyxhQUFhO0FBQ2pDLFVBQUksU0FBUyxTQUFTLEtBQUssQ0FBQyxrQkFBa0I7QUFDNUM7TUFDSixPQUFTO0FBQ0wsd0JBQWdCLFFBQVE7QUFBQSxNQUN6QjtBQUNELHlCQUFtQjtBQUFBLElBQ3JCLENBQUM7QUFFRDtBQUFBLE1BQ0U7QUFBQSxNQUNBLENBQUMsWUFBWTtBQUNYLGNBQU0sUUFBUSxRQUFRLE9BQU8sQ0FBQyxLQUFLLFdBQVc7QUFDNUMsaUJBQU8sTUFBTSxXQUFXLE9BQU8sV0FBVztBQUFBLFFBQzNDLEdBQUUsQ0FBQztBQUVKLG1CQUFXLGNBQWMsTUFBTSxRQUFRLENBQUM7QUFBQSxNQUN6QztBQUFBLE1BQ0QsRUFBRSxNQUFNLEtBQU07QUFBQSxJQUNoQjtBQUVBO0FBQUEsTUFDRSxDQUFDLE1BQU0sV0FBVyxPQUFPLE1BQU0sV0FBVyxNQUFNO0FBQUEsTUFDaEQ7QUFBQSxJQUNGO0FBQ0EsVUFBTSwwQkFBMEIsQ0FBQyxXQUFXO0FBQzFDLGNBQVEsSUFBSSwyQkFBMkIsTUFBTTtBQUFBLElBQy9DLENBQUM7QUFFRCxVQUFNLGVBQWUsTUFBTTs7QUFDekIsWUFBTSx1QkFBdUIsV0FBVyxXQUFXLFdBQVc7QUFDOUQsWUFBTSx1QkFBdUI7QUFBQSxRQUMzQixTQUFTLHFDQUFVLEtBQUs7QUFBQSxRQUN4QixhQUFXLHNEQUFVLFNBQVYsbUJBQWdCLGFBQWhCLG1CQUEwQixvQkFBMUIsbUJBQTJDLGNBQWE7QUFBQSxRQUNuRSxnQkFBZ0IsV0FBVztBQUFBLFFBQzNCLGtCQUFrQixXQUFXO0FBQUEsUUFDN0IsY0FBYztBQUFBLFFBQ2QsU0FBUyxXQUFXLE1BQU0sSUFBSSxDQUFDLFdBQVk7O0FBQUE7QUFBQSxZQUN6QyxnQkFBZ0IsT0FBTztBQUFBLFlBQ3ZCLGFBQVdDLE9BQUFDLE9BQUFDLE1BQUEscUNBQVUsU0FBVixnQkFBQUEsSUFBZ0IsYUFBaEIsZ0JBQUFELElBQTBCLG9CQUExQixnQkFBQUQsSUFBMkMsY0FBYTtBQUFBLFlBQ25FLGFBQWEsT0FBTztBQUFBLFlBQ3BCLFlBQVksT0FBTztBQUFBLFlBQ25CLE9BQU8sT0FBTztBQUFBLFlBQ2QsUUFBUSxPQUFPO0FBQUEsVUFDckI7QUFBQSxTQUFNO0FBQUEsTUFDTjtBQUVFLHdCQUFrQiw0QkFBNEIsb0JBQW9CO0FBQ2xFLGNBQVEsSUFBSSx5QkFBeUIsb0JBQW9CO0FBRXpELGFBQU8sT0FBTztBQUFBLFFBQ1osTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsU0FBUztBQUFBLE1BQ2IsQ0FBRztBQUNELGFBQU8sUUFBUTtBQUNmO0lBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3V0EsVUFBTSxnQkFBZ0IsY0FBYTtBQUNuQyxVQUFNLGlCQUFpQixTQUFTLE1BQU0sY0FBYyxLQUFLO0FBQ3pELFVBQU0sb0JBQW9CLHFCQUFvQjtBQUM5QyxVQUFNLFdBQVcsa0JBQWtCO0FBQ25DLFVBQU0sU0FBUyxJQUFJLEtBQUs7QUFZRSxhQUFTLE1BQU07QUFDdkMsYUFBTyxZQUFZLFNBQVMsZUFBZSxNQUFNLFNBQVM7QUFBQSxJQUM1RCxDQUFDO0FBRUQsVUFBTSxlQUFlLFNBQVM7QUFBQSxNQUM1QixpQkFBaUI7QUFBQSxNQUNqQixNQUFNO0FBQUEsTUFDTixRQUFRO0FBQUEsTUFDUixhQUFhO0FBQUEsSUFDZixDQUFDO0FBU0QsVUFBTSxhQUFhLE1BQU07QUFDdkIsYUFBTyxRQUFRO0FBQUEsSUFDakI7QUFFQSxVQUFNLFdBQVcsTUFBTTtBQUNyQixhQUFPLFFBQVE7QUFBQSxJQUNqQjtBQUVBLFVBQU0sUUFBUSxNQUFNO0FBQ2xCLG1CQUFhLGtCQUFrQjtBQUMvQixtQkFBYSxPQUFPO0FBQ3BCLG1CQUFhLFNBQVM7QUFDdEIsbUJBQWEsY0FBYztBQUFBLElBQzdCO0FBRUEsVUFBTSxlQUFlLE1BQU07O0FBQ3pCLFlBQU0saUJBQWlCLFdBQVcsYUFBYSxPQUFPLFFBQVEsS0FBSyxHQUFHLENBQUM7QUFFdkUsWUFBTSxnQkFBZ0I7QUFBQSxRQUNwQixHQUFHO0FBQUEsUUFDSCxTQUFTLHFDQUFVLEtBQUs7QUFBQSxRQUN4QixhQUFXLHNEQUFVLFNBQVYsbUJBQWdCLGFBQWhCLG1CQUEwQixvQkFBMUIsbUJBQTJDLGNBQWE7QUFBQSxRQUNuRSxRQUFRO0FBQUEsTUFDWjtBQUVFLHdCQUFrQixxQkFBcUIsYUFBYTtBQUNwRCxhQUFPLE9BQU87QUFBQSxRQUNaLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULFNBQVM7QUFBQSxNQUNiLENBQUc7QUFFRDtJQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekRBLFVBQU0saUJBQWlCLENBQUMsVUFBVTtBQUNoQyxhQUFPLElBQUksS0FBSyxhQUFhLFNBQVM7QUFBQSxRQUNwQyxPQUFPO0FBQUEsUUFDUCxVQUFVO0FBQUEsUUFDVix1QkFBdUI7QUFBQSxRQUN2Qix1QkFBdUI7QUFBQSxNQUMzQixDQUFHLEVBQUUsT0FBTyxLQUFLO0FBQUEsSUFDakI7QUFFQSxVQUFNLG9CQUFvQixxQkFBb0I7QUFFOUMsVUFBTSxhQUFhLFNBQVMsTUFBTSxrQkFBa0IsZ0JBQWdCO0FBQ3BFLFVBQU0sZUFBZSxTQUFTLE1BQU0sa0JBQWtCLGtCQUFrQjtBQUN4RSxVQUFNLGtCQUFrQixTQUFTLE1BQU0sa0JBQWtCLHFCQUFxQjtBQUM5RSxVQUFNLGdCQUFnQixTQUFTLE1BQU0sa0JBQWtCLGlCQUFpQjtBQUN4RSxVQUFNLGVBQWUsU0FBUyxNQUFNLGtCQUFrQixpQkFBaUI7QUFDdkUsVUFBTSxlQUFlLFNBQVMsTUFBTSxrQkFBa0IsVUFBVTtBQUNoRSxVQUFNLG9CQUFvQjtBQUFBLE1BQ3hCLE1BQU0sa0JBQWtCO0FBQUEsSUFDMUI7QUFFQSxVQUFNLG1CQUFtQixTQUFTLE1BQU07QUFDdEMsYUFDRSxXQUFXLFFBQ1gsYUFBYSxRQUNiLGdCQUFnQixRQUNoQixjQUFjO0FBQUEsSUFFbEIsQ0FBQztBQUVELFVBQU0sc0JBQXNCLFNBQVMsTUFBTSxlQUFlLFdBQVcsS0FBSyxDQUFDO0FBQzNFLFVBQU0sd0JBQXdCO0FBQUEsTUFBUyxNQUNyQyxlQUFlLGFBQWEsS0FBSztBQUFBLElBQ25DO0FBQ0EsVUFBTSwyQkFBMkI7QUFBQSxNQUFTLE1BQ3hDLGVBQWUsZ0JBQWdCLEtBQUs7QUFBQSxJQUN0QztBQUNBLFVBQU0seUJBQXlCO0FBQUEsTUFBUyxNQUN0QyxlQUFlLGNBQWMsS0FBSztBQUFBLElBQ3BDO0FBQ0EsVUFBTSx3QkFBd0I7QUFBQSxNQUFTLE1BQ3JDLGVBQWUsYUFBYSxLQUFLO0FBQUEsSUFDbkM7QUFDa0M7QUFBQSxNQUFTLE1BQ3pDLGVBQWUsaUJBQWlCLEtBQUs7QUFBQSxJQUN2QztBQUNBLFVBQU0sNkJBQTZCO0FBQUEsTUFBUyxNQUMxQyxlQUFlLGtCQUFrQixLQUFLO0FBQUEsSUFDeEM7QUFDQSxVQUFNLHdCQUF3QjtBQUFBLE1BQVMsTUFDckMsZUFBZSxhQUFhLEtBQUs7QUFBQSxJQUNuQztBQUVBLFVBQU0sZUFBZSxZQUFZO0FBQy9CLFVBQUk7QUFDRixjQUFNLGtCQUFrQjtNQUN6QixTQUFRLE9BQVA7QUFDQSxnQkFBUSxNQUFNLDBCQUEwQixLQUFLO0FBQUEsTUFDOUM7QUFBQSxJQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RkEsVUFBTSxvQkFBb0IscUJBQW9CO0FBQzlDLFVBQU0sb0JBQW9CLFNBQVMsTUFBTSxrQkFBa0IsaUJBQWlCO0FBRTVFLFVBQU0saUJBQWlCLENBQUMsVUFBVTtBQUNoQyxhQUFPLElBQUksS0FBSyxhQUFhLFNBQVM7QUFBQSxRQUNwQyxPQUFPO0FBQUEsUUFDUCxVQUFVO0FBQUEsUUFDVix1QkFBdUI7QUFBQSxRQUN2Qix1QkFBdUI7QUFBQSxNQUMzQixDQUFHLEVBQUUsT0FBTyxLQUFLO0FBQUEsSUFDakI7QUFFQSxVQUFNLGtCQUFrQixDQUFDLFVBQVU7QUFDakMsd0JBQWtCLGdCQUFnQixLQUFLO0FBQUEsSUFDekM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCQSxVQUFNLG9CQUFvQixxQkFBb0I7QUFDOUMsVUFBTSxpQkFBaUIsU0FBUyxNQUFNLGtCQUFrQixjQUFjO0FBRXRFLFVBQU0saUJBQWlCLENBQUMsVUFBVTtBQUNoQyxhQUFPLElBQUksS0FBSyxhQUFhLFNBQVM7QUFBQSxRQUNwQyxPQUFPO0FBQUEsUUFDUCxVQUFVO0FBQUEsUUFDVix1QkFBdUI7QUFBQSxRQUN2Qix1QkFBdUI7QUFBQSxNQUMzQixDQUFHLEVBQUUsT0FBTyxLQUFLO0FBQUEsSUFDakI7QUFFQSxVQUFNLGdCQUFnQixDQUFDLFVBQVU7QUFDL0Isd0JBQWtCLGNBQWMsS0FBSztBQUFBLElBQ3ZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQSxVQUFNLG9CQUFvQixxQkFBb0I7QUFDOUMsVUFBTSxlQUFlLFNBQVMsTUFBTSxrQkFBa0IsWUFBWTtBQUVsRSxVQUFNLGlCQUFpQixDQUFDLFVBQVU7QUFDaEMsYUFBTyxJQUFJLEtBQUssYUFBYSxTQUFTO0FBQUEsUUFDcEMsT0FBTztBQUFBLFFBQ1AsVUFBVTtBQUFBLFFBQ1YsdUJBQXVCO0FBQUEsUUFDdkIsdUJBQXVCO0FBQUEsTUFDM0IsQ0FBRyxFQUFFLE9BQU8sS0FBSztBQUFBLElBQ2pCO0FBRUEsVUFBTSxjQUFjLENBQUMsVUFBVTtBQUM3Qix3QkFBa0IsWUFBWSxLQUFLO0FBQUEsSUFDckM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDQSxVQUFNLG9CQUFvQixxQkFBb0I7QUFDOUMsVUFBTSxrQkFBa0IsU0FBUyxNQUFNLGtCQUFrQixlQUFlO0FBRXhFLFVBQU0saUJBQWlCLENBQUMsVUFBVTtBQUNoQyxhQUFPLElBQUksS0FBSyxhQUFhLFNBQVM7QUFBQSxRQUNwQyxPQUFPO0FBQUEsUUFDUCxVQUFVO0FBQUEsUUFDVix1QkFBdUI7QUFBQSxRQUN2Qix1QkFBdUI7QUFBQSxNQUMzQixDQUFHLEVBQUUsT0FBTyxLQUFLO0FBQUEsSUFDakI7QUFFQSxVQUFNLGlCQUFpQixDQUFDLFVBQVU7QUFDaEMsd0JBQWtCLGVBQWUsS0FBSztBQUFBLElBQ3hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiQSxVQUFNLG9CQUFvQixxQkFBb0I7QUFDOUMsVUFBTSx1QkFBdUI7QUFBQSxNQUMzQixNQUFNLGtCQUFrQjtBQUFBLElBQzFCO0FBRUEsVUFBTSxpQkFBaUIsQ0FBQyxVQUFVO0FBQ2hDLGFBQU8sSUFBSSxLQUFLLGFBQWEsU0FBUztBQUFBLFFBQ3BDLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQSxRQUNWLHVCQUF1QjtBQUFBLFFBQ3ZCLHVCQUF1QjtBQUFBLE1BQzNCLENBQUcsRUFBRSxPQUFPLEtBQUs7QUFBQSxJQUNqQjtBQUVBLFVBQU0sNkJBQTZCLENBQUMsVUFBVTtBQUM1Qyx3QkFBa0IsMkJBQTJCLEtBQUs7QUFBQSxJQUNwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVEEsVUFBTSxtQkFBbUIscUJBQW9CO0FBQzdDLFVBQU0sY0FBYyxTQUFTLE1BQU0saUJBQWlCLFdBQVc7QUFDL0QsVUFBTSxXQUFXLFNBQVMsTUFBTSxpQkFBaUIsSUFBSTtBQUNyRCxVQUFNLGFBQ0osZ0NBQVMsVUFBVCxtQkFBZ0IsU0FBaEIsbUJBQXNCLGFBQXRCLG1CQUFnQyxvQkFBaEMsbUJBQWlELGNBQWE7QUFDaEUsWUFBUSxJQUFJLG1CQUFtQixRQUFRO0FBQ3ZDLFVBQU0sVUFBVSxJQUFJLElBQUk7QUFFeEIsVUFBTSxTQUFTLElBQUksS0FBSztBQUV4QixVQUFNLGFBQWEsTUFBTTtBQUN2QixhQUFPLFFBQVE7QUFBQSxJQUNqQjtBQUVBLGNBQVUsWUFBWTtBQUNwQixjQUFRLElBQUksa0JBQWtCLFFBQVE7QUFDdEMsVUFBSSxVQUFVO0FBQ1osY0FBTSxnQkFBZ0IsUUFBUTtBQUFBLE1BQy9CO0FBQUEsSUFDSCxDQUFDO0FBRUQsVUFBTSxrQkFBa0IsT0FBT0csY0FBYTtBQUMxQyxjQUFRLElBQUksZUFBZUEsU0FBUTtBQUNuQyxjQUFRLFFBQVE7QUFDaEIsWUFBTSxpQkFBaUIsa0JBQWtCQSxTQUFRO0FBQ2pELGNBQVEsUUFBUTtBQUFBLElBQ2xCO0FBRUEsVUFBTSxVQUFVO0FBQUEsTUFDZDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLFFBQ1YsT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsT0FBTyxDQUFDLFFBQVEsSUFBSTtBQUFBLFFBQ3BCLFFBQVEsQ0FBQyxRQUFRLEdBQUc7QUFBQSxRQUNwQixVQUFVO0FBQUEsTUFDWDtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQSxNQUNYO0FBQUEsTUFDRCxFQUFFLE1BQU0sT0FBTyxPQUFPLFdBQVcsT0FBTyxPQUFPLFVBQVUsS0FBTTtBQUFBLE1BQy9ELEVBQUUsTUFBTSxTQUFTLE9BQU8sYUFBYSxPQUFPLFFBQVM7QUFBQSxNQUNyRCxFQUFFLE1BQU0sV0FBVyxPQUFPLGVBQWUsT0FBTyxVQUFXO0FBQUEsTUFDM0QsRUFBRSxNQUFNLFVBQVUsT0FBTyxlQUFlLE9BQU8sU0FBVTtBQUFBLE1BQ3pEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxVQUFVO0FBQUEsUUFDVixNQUFNLENBQUMsR0FBRyxNQUFNLFNBQVMsR0FBRyxFQUFFLElBQUksU0FBUyxHQUFHLEVBQUU7QUFBQSxNQUNqRDtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQSxRQUNWLE1BQU0sQ0FBQyxHQUFHLE1BQU0sU0FBUyxHQUFHLEVBQUUsSUFBSSxTQUFTLEdBQUcsRUFBRTtBQUFBLE1BQ2pEO0FBQUEsSUFDSDtBQUVBLFVBQU0sT0FBTztBQUFBLE1BQ1g7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLFVBQVU7QUFBQSxRQUNWLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLFNBQVM7QUFBQSxRQUNULFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxRQUNULE1BQU07QUFBQSxNQUNQO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLFFBQ1YsS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsU0FBUztBQUFBLFFBQ1QsUUFBUTtBQUFBLFFBQ1IsU0FBUztBQUFBLFFBQ1QsTUFBTTtBQUFBLE1BQ1A7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixVQUFVO0FBQUEsUUFDVixLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxTQUFTO0FBQUEsUUFDVCxRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUEsUUFDVCxNQUFNO0FBQUEsTUFDUDtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLFVBQVU7QUFBQSxRQUNWLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLFNBQVM7QUFBQSxRQUNULFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxRQUNULE1BQU07QUFBQSxNQUNQO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLFFBQ1YsS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsU0FBUztBQUFBLFFBQ1QsUUFBUTtBQUFBLFFBQ1IsU0FBUztBQUFBLFFBQ1QsTUFBTTtBQUFBLE1BQ1A7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixVQUFVO0FBQUEsUUFDVixLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxTQUFTO0FBQUEsUUFDVCxRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUEsUUFDVCxNQUFNO0FBQUEsTUFDUDtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLFVBQVU7QUFBQSxRQUNWLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLFNBQVM7QUFBQSxRQUNULFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxRQUNULE1BQU07QUFBQSxNQUNQO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLFFBQ1YsS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsU0FBUztBQUFBLFFBQ1QsUUFBUTtBQUFBLFFBQ1IsU0FBUztBQUFBLFFBQ1QsTUFBTTtBQUFBLE1BQ1A7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixVQUFVO0FBQUEsUUFDVixLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxTQUFTO0FBQUEsUUFDVCxRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUEsUUFDVCxNQUFNO0FBQUEsTUFDUDtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLFVBQVU7QUFBQSxRQUNWLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLFNBQVM7QUFBQSxRQUNULFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxRQUNULE1BQU07QUFBQSxNQUNQO0FBQUEsSUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckxlLFFBQUksS0FBSztBQUlOLGFBQVM7QUFBQSxNQUN6QjtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsV0FBVztBQUFBLFFBQ1gsT0FBTztBQUFBLE1BQ1I7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsUUFDWCxPQUFPO0FBQUEsTUFDUjtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFdBQVc7QUFBQSxRQUNYLE9BQU87QUFBQSxNQUNSO0FBQUEsSUFFSCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
