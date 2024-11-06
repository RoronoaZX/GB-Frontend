import { _ as _export_sfc, n as ref, t as reactive, g as computed, o as openBlock, a4 as createElementBlock, J as createBaseVNode, a as createVNode, M as QBtn, w as withCtx, Q as QCard, I as QCardSection, K as QInput, a3 as QDialog, a5 as Fragment, N as Notify, L as QIcon, a6 as renderList, c as createBlock, a1 as createTextVNode, a0 as toDisplayString } from "./index.9b9dbcba.js";
import { u as useSalesReportsStore } from "./sales-report.ac1d2f23.js";
import { u as useUsersStore } from "./user.9d8bff14.js";
import { Q as QItem, a as QItemSection } from "./QItem.79579b05.js";
import { a as QItemLabel, Q as QField } from "./QItemLabel.345b9721.js";
import "./axios.91431b0b.js";
const _hoisted_1$7 = { class: "row justify-between" };
const _hoisted_2$7 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Demomination Report", -1);
const _hoisted_3$7 = { class: "row q-gutter-md justify-between" };
const _hoisted_4$7 = { class: "col-6" };
const _hoisted_5$2 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_6$1 = /* @__PURE__ */ createBaseVNode("div", null, "1000 Bills:", -1);
const _hoisted_7$1 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_8$1 = /* @__PURE__ */ createBaseVNode("div", null, "500 Bills:", -1);
const _hoisted_9$1 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_10$1 = /* @__PURE__ */ createBaseVNode("div", null, "200 Bills:", -1);
const _hoisted_11$1 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_12 = /* @__PURE__ */ createBaseVNode("div", null, "100 Bills:", -1);
const _hoisted_13 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_14 = /* @__PURE__ */ createBaseVNode("div", null, "50 Bills:", -1);
const _hoisted_15 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_16 = /* @__PURE__ */ createBaseVNode("div", null, "20 Bills:", -1);
const _hoisted_17 = { class: "col-5" };
const _hoisted_18 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_19 = /* @__PURE__ */ createBaseVNode("div", null, "20 coins:", -1);
const _hoisted_20 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_21 = /* @__PURE__ */ createBaseVNode("div", null, "10 coins:", -1);
const _hoisted_22 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_23 = /* @__PURE__ */ createBaseVNode("div", null, "5 coins:", -1);
const _hoisted_24 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_25 = /* @__PURE__ */ createBaseVNode("div", null, "1 coins:", -1);
const _hoisted_26 = { class: "row justify-between text-weight-light text-h6 q-mt-md" };
const _hoisted_27 = /* @__PURE__ */ createBaseVNode("div", null, "25 cents:", -1);
const _hoisted_28 = {
  class: "text-h6 q-mt-md",
  align: "center"
};
const _hoisted_29 = /* @__PURE__ */ createBaseVNode("div", null, "Total Denomination", -1);
const _hoisted_30 = { align: "right" };
const _sfc_main$7 = {
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
            color: "indigo-6",
            outlined: "",
            label: "Denomination Report",
            onClick: openDialog
          })
        ]),
        createVNode(QDialog, {
          modelValue: dialog.value,
          "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => dialog.value = $event)
        }, {
          default: withCtx(() => [
            createVNode(QCard, {
              class: "q-pa-md",
              style: { "width": "700px" }
            }, {
              default: withCtx(() => [
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_1$7, [
                      _hoisted_2$7,
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
                createBaseVNode("div", _hoisted_3$7, [
                  createBaseVNode("div", _hoisted_4$7, [
                    createBaseVNode("div", _hoisted_5$2, [
                      _hoisted_6$1,
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
                    createBaseVNode("div", _hoisted_7$1, [
                      _hoisted_8$1,
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
                    createBaseVNode("div", _hoisted_9$1, [
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
                      _hoisted_12,
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
var DenominationReport = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "DenominationReport.vue"]]);
const _hoisted_1$6 = { class: "q-gutter-y-md" };
const _hoisted_2$6 = { class: "row justify-between" };
const _hoisted_3$6 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Expenses", -1);
const _hoisted_4$6 = { class: "row q-gutter-x-md" };
const _hoisted_5$1 = {
  class: "",
  align: "right"
};
const _sfc_main$6 = {
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
      var _a, _b;
      const amountAsNumber = parseFloat(expensesForm.amount.replace(",", "."));
      const expenseReport = {
        ...expensesForm,
        user_id: userData == null ? void 0 : userData.data.id,
        branch_id: ((_b = (_a = userData == null ? void 0 : userData.data) == null ? void 0 : _a.branch_employee) == null ? void 0 : _b.branch_id) || "",
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
            color: "blue-grey-9",
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
            createVNode(QCard, {
              class: "q-pa-md",
              style: { "width": "450px" }
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_1$6, [
                  createBaseVNode("div", _hoisted_2$6, [
                    _hoisted_3$6,
                    createBaseVNode("div", null, [
                      createVNode(QBtn, {
                        flat: "",
                        round: "",
                        dense: "",
                        icon: "close",
                        onClick: closeBtn
                      })
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_4$6, [
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
        }, 8, ["modelValue"])
      ], 64);
    };
  }
};
var ExpensesReport = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "ExpensesReport.vue"]]);
const _hoisted_1$5 = { class: "row q-gutter-sm justify-between" };
const _hoisted_2$5 = /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Bread Total Amount", -1);
const _hoisted_3$5 = /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Selecta Total Amount", -1);
const _hoisted_4$5 = /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Softdrinks Total Amount", -1);
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light" }, "Expences Total Amount", -1);
const _hoisted_6 = { class: "row q-my-lg justify-between" };
const _hoisted_7 = { class: "q-gutter-sm q-my-md" };
const _hoisted_8 = /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-light text-h6 q-mt-md" }, "Charges Total", -1);
const _hoisted_9 = { class: "q-gutter-sm q-my-md" };
const _hoisted_10 = /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-bold text-h6 q-mt-md" }, "Total Sales", -1);
const _hoisted_11 = {
  class: "q-my-md",
  align: "right"
};
const _sfc_main$5 = {
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
    const expensesTotal = computed(() => salesReportsStore.expensesTotalAmount);
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
        createBaseVNode("div", _hoisted_1$5, [
          createBaseVNode("div", null, [
            _hoisted_2$5,
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
            _hoisted_3$5,
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
            _hoisted_4$5,
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
          ])
        ]),
        createBaseVNode("div", _hoisted_6, [
          createBaseVNode("div", _hoisted_7, [
            _hoisted_8,
            createBaseVNode("div", null, [
              createVNode(QInput, {
                modelValue: chargesTotalFormatted.value,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => chargesTotalFormatted.value = $event),
                readonly: "",
                outlined: "",
                dense: "",
                style: { "width": "180px" }
              }, null, 8, ["modelValue"])
            ])
          ]),
          createBaseVNode("div", _hoisted_9, [
            _hoisted_10,
            createBaseVNode("div", null, [
              createVNode(QInput, {
                modelValue: denominationTotalFormatted.value,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => denominationTotalFormatted.value = $event),
                readonly: "",
                outlined: "",
                dense: "",
                style: { "width": "180px" }
              }, null, 8, ["modelValue"])
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_11, [
          createVNode(QBtn, {
            class: "q-pa-sm",
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
var OverAllTotal = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "OverAllTotal.vue"]]);
const _hoisted_1$4 = { class: "q-pa-xm" };
const _hoisted_2$4 = /* @__PURE__ */ createBaseVNode("div", { class: "text-subtitle2 text-weight-light" }, "Softdrinks Report", -1);
const _hoisted_3$4 = { class: "q-py-sm" };
const _hoisted_4$4 = { class: "q-gutter-md" };
const _sfc_main$4 = {
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
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        _hoisted_2$4,
        createVNode(QField, {
          outlined: "",
          dense: "",
          readonly: ""
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_3$4, [
              createBaseVNode("div", _hoisted_4$4, [
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
var SoftdrinksReportField = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "SoftdrinksReportField.vue"]]);
const _hoisted_1$3 = { class: "q-pa-xm" };
const _hoisted_2$3 = /* @__PURE__ */ createBaseVNode("div", { class: "text-subtitle2 text-weight-light" }, "Selecta Report", -1);
const _hoisted_3$3 = { class: "q-py-sm" };
const _hoisted_4$3 = { class: "q-gutter-md" };
const _sfc_main$3 = {
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
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        _hoisted_2$3,
        createVNode(QField, {
          outlined: "",
          dense: "",
          readonly: ""
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_3$3, [
              createBaseVNode("div", _hoisted_4$3, [
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
var SelectaReportField = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "SelectaReportField.vue"]]);
const _hoisted_1$2 = { class: "q-pa-xm" };
const _hoisted_2$2 = /* @__PURE__ */ createBaseVNode("div", { class: "text-subtitle2 text-weight-light" }, "Bread Report", -1);
const _hoisted_3$2 = { class: "q-py-sm" };
const _hoisted_4$2 = { class: "q-gutter-md" };
const _sfc_main$2 = {
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
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        _hoisted_2$2,
        createVNode(QField, {
          outlined: "",
          dense: "",
          readonly: ""
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_3$2, [
              createBaseVNode("div", _hoisted_4$2, [
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
var BreadReportField = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "BreadReportField.vue"]]);
const _hoisted_1$1 = { class: "q-pa-xm" };
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("div", { class: "text-subtitle2 text-weight-light" }, "Expenses Report", -1);
const _hoisted_3$1 = { class: "q-py-sm" };
const _hoisted_4$1 = { class: "q-gutter-md" };
const _sfc_main$1 = {
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
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        _hoisted_2$1,
        createVNode(QField, {
          outlined: "",
          dense: "",
          readonly: ""
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_3$1, [
              createBaseVNode("div", _hoisted_4$1, [
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
var ExpensesReportField = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "ExpensesReportField.vue"]]);
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
          createVNode(QCardSection, { style: { "background-color": "#ef4444" } }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                createVNode(QIcon, { name: "fa-solid fa-layer-group" }),
                createTextVNode(" Sales Report ")
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
                  createVNode(DenominationReport)
                ])
              ]),
              createBaseVNode("div", _hoisted_3, [
                createVNode(OverAllTotal)
              ]),
              createBaseVNode("div", _hoisted_4, [
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
var ReportPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "ReportPage.vue"]]);
export { ReportPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwb3J0UGFnZS43ZDY1ZWEzMy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9zYWxlc19sYWR5L3JlcG9ydC9jb21wb25lbnRzL0Rlbm9taW5hdGlvblJlcG9ydC52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYnJhbmNoL3NhbGVzX2xhZHkvcmVwb3J0L2NvbXBvbmVudHMvRXhwZW5zZXNSZXBvcnQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9zYWxlc19sYWR5L3JlcG9ydC9jb21wb25lbnRzL092ZXJBbGxUb3RhbC52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYnJhbmNoL3NhbGVzX2xhZHkvcmVwb3J0L2NvbXBvbmVudHMvU29mdGRyaW5rc1JlcG9ydEZpZWxkLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9icmFuY2gvc2FsZXNfbGFkeS9yZXBvcnQvY29tcG9uZW50cy9TZWxlY3RhUmVwb3J0RmllbGQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9zYWxlc19sYWR5L3JlcG9ydC9jb21wb25lbnRzL0JyZWFkUmVwb3J0RmllbGQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9zYWxlc19sYWR5L3JlcG9ydC9jb21wb25lbnRzL0V4cGVuc2VzUmVwb3J0RmllbGQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9zYWxlc19sYWR5L3JlcG9ydC9SZXBvcnRQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPHEtYnRuXG4gICAgICBjb2xvcj1cImluZGlnby02XCJcbiAgICAgIG91dGxpbmVkXG4gICAgICBsYWJlbD1cIkRlbm9taW5hdGlvbiBSZXBvcnRcIlxuICAgICAgQGNsaWNrPVwib3BlbkRpYWxvZ1wiXG4gICAgLz5cbiAgPC9kaXY+XG4gIDxxLWRpYWxvZyB2LW1vZGVsPVwiZGlhbG9nXCI+XG4gICAgPHEtY2FyZCBjbGFzcz1cInEtcGEtbWRcIiBzdHlsZT1cIndpZHRoOiA3MDBweFwiPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+RGVtb21pbmF0aW9uIFJlcG9ydDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cS1idG4gZmxhdCByb3VuZCBkZW5zZSBpY29uPVwiY2xvc2VcIiBAY2xpY2s9XCJjbG9zZUJ0blwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci1tZCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC02XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW4gdGV4dC13ZWlnaHQtbGlnaHQgdGV4dC1oNiBxLW10LW1kXCI+XG4gICAgICAgICAgICA8ZGl2PjEwMDAgQmlsbHM6PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEwMHB4XCJcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiZGVub21pbmF0aW9uRGF0YS5vbmVUaG91c2FuZEJpbGxzXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIHN1ZmZpeD1cInBjc1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXdlaWdodC1saWdodCB0ZXh0LWg2IHEtbXQtbWRcIj5cbiAgICAgICAgICAgIDxkaXY+NTAwIEJpbGxzOjwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMDBweFwiXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cImRlbm9taW5hdGlvbkRhdGEuZml2ZUh1bmRyZWRCaWxsc1wiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBzdWZmaXg9XCJwY3NcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW4gdGV4dC13ZWlnaHQtbGlnaHQgdGV4dC1oNiBxLW10LW1kXCI+XG4gICAgICAgICAgICA8ZGl2PjIwMCBCaWxsczo8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTAwcHhcIlxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJkZW5vbWluYXRpb25EYXRhLnR3b0h1bmRyZWRCaWxsc1wiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBzdWZmaXg9XCJwY3NcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW4gdGV4dC13ZWlnaHQtbGlnaHQgdGV4dC1oNiBxLW10LW1kXCI+XG4gICAgICAgICAgICA8ZGl2PjEwMCBCaWxsczo8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTAwcHhcIlxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJkZW5vbWluYXRpb25EYXRhLm9uZUh1bmRyZWRCaWxsc1wiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBzdWZmaXg9XCJwY3NcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW4gdGV4dC13ZWlnaHQtbGlnaHQgdGV4dC1oNiBxLW10LW1kXCI+XG4gICAgICAgICAgICA8ZGl2PjUwIEJpbGxzOjwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMDBweFwiXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cImRlbm9taW5hdGlvbkRhdGEuZmlmdHlCaWxsc1wiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBzdWZmaXg9XCJwY3NcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW4gdGV4dC13ZWlnaHQtbGlnaHQgdGV4dC1oNiBxLW10LW1kXCI+XG4gICAgICAgICAgICA8ZGl2PjIwIEJpbGxzOjwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMDBweFwiXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cImRlbm9taW5hdGlvbkRhdGEudHdlbnR5QmlsbHNcIlxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgc3VmZml4PVwicGNzXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC01XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW4gdGV4dC13ZWlnaHQtbGlnaHQgdGV4dC1oNiBxLW10LW1kXCI+XG4gICAgICAgICAgICA8ZGl2PjIwIGNvaW5zOjwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMDBweFwiXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cImRlbm9taW5hdGlvbkRhdGEudHdlbnR5Q29pbnNcIlxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgc3VmZml4PVwicGNzXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuIHRleHQtd2VpZ2h0LWxpZ2h0IHRleHQtaDYgcS1tdC1tZFwiPlxuICAgICAgICAgICAgPGRpdj4xMCBjb2luczo8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTAwcHhcIlxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJkZW5vbWluYXRpb25EYXRhLnRlbkNvaW5zXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIHN1ZmZpeD1cInBjc1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXdlaWdodC1saWdodCB0ZXh0LWg2IHEtbXQtbWRcIj5cbiAgICAgICAgICAgIDxkaXY+NSBjb2luczo8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTAwcHhcIlxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJkZW5vbWluYXRpb25EYXRhLmZpdmVDb2luc1wiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBzdWZmaXg9XCJwY3NcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW4gdGV4dC13ZWlnaHQtbGlnaHQgdGV4dC1oNiBxLW10LW1kXCI+XG4gICAgICAgICAgICA8ZGl2PjEgY29pbnM6PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEwMHB4XCJcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiZGVub21pbmF0aW9uRGF0YS5vbmVDb2luc1wiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBzdWZmaXg9XCJwY3NcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW4gdGV4dC13ZWlnaHQtbGlnaHQgdGV4dC1oNiBxLW10LW1kXCI+XG4gICAgICAgICAgICA8ZGl2PjI1IGNlbnRzOjwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMDBweFwiXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cImRlbm9taW5hdGlvbkRhdGEudHdlbnR5Rml2ZUNlbnRzXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIHN1ZmZpeD1cInBjc1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNiBxLW10LW1kXCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgIDxkaXY+VG90YWwgRGVub21pbmF0aW9uPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwidG90YWxEZW5vbWluYXRpb25Gb3JtYXRcIiBvdXRsaW5lZCByZWFkb25seSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxkaXYgYWxpZ249XCJyaWdodFwiPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgY29sb3I9XCJyZWQtNlwiXG4gICAgICAgICAgICBsYWJlbD1cIlN1Ym1pdFwiXG4gICAgICAgICAgICBjbGFzcz1cInEtcGEtc21cIlxuICAgICAgICAgICAgc2l6ZT1cIm1kXCJcbiAgICAgICAgICAgIEBjbGljaz1cImhhbmRsZVN1Ym1pdFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZVNhbGVzUmVwb3J0c1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvc2FsZXMtcmVwb3J0XCI7XG5pbXBvcnQgeyByZWFjdGl2ZSwgcmVmLCBjb21wdXRlZCB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3Qgc2FsZXNSZXBvcnRzU3RvcmUgPSB1c2VTYWxlc1JlcG9ydHNTdG9yZSgpO1xuXG5jb25zdCBkaWFsb2cgPSByZWYoZmFsc2UpO1xuY29uc3Qgb3BlbkRpYWxvZyA9ICgpID0+IHtcbiAgZGlhbG9nLnZhbHVlID0gdHJ1ZTtcbn07XG5jb25zdCBjbG9zZUJ0biA9ICgpID0+IHtcbiAgZGlhbG9nLnZhbHVlID0gZmFsc2U7XG59O1xuXG5jb25zdCBkZW5vbWluYXRpb25EYXRhID0gcmVhY3RpdmUoe1xuICBvbmVUaG91c2FuZEJpbGxzOiAwLFxuICBmaXZlSHVuZHJlZEJpbGxzOiAwLFxuICB0d29IdW5kcmVkQmlsbHM6IDAsXG4gIG9uZUh1bmRyZWRCaWxsczogMCxcbiAgZmlmdHlCaWxsczogMCxcbiAgdHdlbnR5QmlsbHM6IDAsXG4gIHR3ZW50eUNvaW5zOiAwLFxuICB0ZW5Db2luczogMCxcbiAgZml2ZUNvaW5zOiAwLFxuICBvbmVDb2luczogMCxcbiAgdHdlbnR5Rml2ZUNlbnRzOiAwLFxufSk7XG5cbmNvbnN0IGZvcm1hdEN1cnJlbmN5ID0gKHZhbHVlKSA9PiB7XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoXCJlbi1VU1wiLCB7XG4gICAgc3R5bGU6IFwiY3VycmVuY3lcIixcbiAgICBjdXJyZW5jeTogXCJQSFBcIixcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICB9KS5mb3JtYXQodmFsdWUpO1xufTtcblxuY29uc3QgdG90YWxEZW5vbWluYXRpb24gPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgZGVub21pbmF0aW9uRGF0YS5vbmVUaG91c2FuZEJpbGxzICogMTAwMCArXG4gICAgZGVub21pbmF0aW9uRGF0YS5maXZlSHVuZHJlZEJpbGxzICogNTAwICtcbiAgICBkZW5vbWluYXRpb25EYXRhLnR3b0h1bmRyZWRCaWxscyAqIDIwMCArXG4gICAgZGVub21pbmF0aW9uRGF0YS5vbmVIdW5kcmVkQmlsbHMgKiAxMDAgK1xuICAgIGRlbm9taW5hdGlvbkRhdGEuZmlmdHlCaWxscyAqIDUwICtcbiAgICBkZW5vbWluYXRpb25EYXRhLnR3ZW50eUJpbGxzICogMjAgK1xuICAgIGRlbm9taW5hdGlvbkRhdGEudHdlbnR5Q29pbnMgKiAyMCArXG4gICAgZGVub21pbmF0aW9uRGF0YS50ZW5Db2lucyAqIDEwICtcbiAgICBkZW5vbWluYXRpb25EYXRhLmZpdmVDb2lucyAqIDUgK1xuICAgIGRlbm9taW5hdGlvbkRhdGEub25lQ29pbnMgKiAxICtcbiAgICBkZW5vbWluYXRpb25EYXRhLnR3ZW50eUZpdmVDZW50cyAqIDAuMjVcbiAgKTtcbn0pO1xuY29uc3QgdG90YWxEZW5vbWluYXRpb25Gb3JtYXQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiBmb3JtYXRDdXJyZW5jeSh0b3RhbERlbm9taW5hdGlvbi52YWx1ZSk7XG59KTtcblxuY29uc3QgaGFuZGxlU3VibWl0ID0gKCkgPT4ge1xuICBjb25zdCByYXdUb3RhbERlbm9taW5hdGlvbiA9IHRvdGFsRGVub21pbmF0aW9uLnZhbHVlO1xuICBzYWxlc1JlcG9ydHNTdG9yZS5nZXREZW5vbWluYXRpb25EYXRhKGRlbm9taW5hdGlvbkRhdGEpO1xuICBzYWxlc1JlcG9ydHNTdG9yZS51cGRhdGVEZW5vbWluYXRpb25Ub3RhbChyYXdUb3RhbERlbm9taW5hdGlvbik7XG4gIHNhbGVzUmVwb3J0c1N0b3JlLmNhbGN1bGF0ZUNoYXJnZXMocmF3VG90YWxEZW5vbWluYXRpb24pOyAvLyBDYWxjdWxhdGUgY2hhcmdlc1xuXG4gIGNvbnNvbGUubG9nKFwiRGVub21pbmF0aW9uIERhdGE6XCIsIGRlbm9taW5hdGlvbkRhdGEpO1xuICBjb25zb2xlLmxvZyhcIlJhdyBUb3RhbCBEZW5vbWluYXRpb246XCIsIHJhd1RvdGFsRGVub21pbmF0aW9uKTtcbiAgY29uc29sZS5sb2coXCJGb3JtYXR0ZWQgVG90YWwgRGVub21pbmF0aW9uOlwiLCB0b3RhbERlbm9taW5hdGlvbkZvcm1hdC52YWx1ZSk7XG5cbiAgY2xvc2VCdG4oKTtcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPHEtYnRuXG4gICAgICBjb2xvcj1cImJsdWUtZ3JleS05XCJcbiAgICAgIG91dGxpbmVkXG4gICAgICBsYWJlbD1cIkV4cGVuc2VzIFJlcG9ydFwiXG4gICAgICBAY2xpY2s9XCJvcGVuRGlhbG9nXCJcbiAgICAvPlxuICA8L2Rpdj5cbiAgPHEtZGlhbG9nIHYtbW9kZWw9XCJkaWFsb2dcIj5cbiAgICA8cS1jYXJkIGNsYXNzPVwicS1wYS1tZFwiIHN0eWxlPVwid2lkdGg6IDQ1MHB4XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXIteS1tZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+RXhwZW5zZXM8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHEtYnRuIGZsYXQgcm91bmQgZGVuc2UgaWNvbj1cImNsb3NlXCIgQGNsaWNrPVwiY2xvc2VCdG5cIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci14LW1kXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJleHBlbnNlc0Zvcm0ubmFtZVwiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDMwMHB4XCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJOYW1lXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPCEtLSA8ZGl2XG4gICAgICAgICAgICAgICAgdi1pZj1cImlzRHJvcGRvd25WaXNpYmxlICYmIHNob3dVc2VyQ2FyZFwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJjdXN0b20tbGlzdCB6LXRvcFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8cS1jYXJkPlxuICAgICAgICAgICAgICAgICAgPHEtbGlzdCBzZXBhcmF0b3I+XG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0gdi1pZj1cIiF1c2VyRGF0YVNlYXJjaD8ubGVuZ3RoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgTm8gcmVjb3JkIGZvdW5kLlxuICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJhdXRvRmlsbFVzZXIodXNlcilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCJ1c2VyIGluIHVzZXJEYXRhU2VhcmNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDprZXk9XCJ1c2VyLmlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrYWJsZVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD57eyB1c2VyLm5hbWUgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICA8L3EtbGlzdD5cbiAgICAgICAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgICAgICAgPC9kaXY+IC0tPlxuICAgICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICB2LW1vZGVsPVwiZXhwZW5zZXNGb3JtLmFtb3VudFwiXG4gICAgICAgICAgICAgIHJldmVyc2UtZmlsbC1tYXNrXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMDBweFwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiQW1vdW50XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICB2LW1vZGVsPVwiZXhwZW5zZXNGb3JtLmRlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRGVzY3JpcHRpb25cIlxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIGF1dG9ncm93XG4gICAgICAgICAgICBzdHlsZT1cIndpZHRoOiA0MTVweFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJcIiBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICBvdXRsaW5lXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgaWNvbj1cImFkZFwiXG4gICAgICAgICAgICBsYWJlbD1cIkFkZCBUbyBMaXN0XCJcbiAgICAgICAgICAgIGNsYXNzPVwicS1wYS1zbVwiXG4gICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgQGNsaWNrPVwiaGFuZGxlU3VibWl0XCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IE5vdGlmeSB9IGZyb20gXCJxdWFzYXJcIjtcbmltcG9ydCB7IHVzZVNhbGVzUmVwb3J0c1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvc2FsZXMtcmVwb3J0XCI7XG5pbXBvcnQgeyB1c2VVc2Vyc1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvdXNlclwiO1xuaW1wb3J0IHsgcmVmLCByZWFjdGl2ZSwgY29tcHV0ZWQgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IHVzZXJEYXRhU3RvcmUgPSB1c2VVc2Vyc1N0b3JlKCk7XG5jb25zdCB1c2VyRGF0YVNlYXJjaCA9IGNvbXB1dGVkKCgpID0+IHVzZXJEYXRhU3RvcmUudXNlcnMpO1xuY29uc3Qgc2FsZXNSZXBvcnRzU3RvcmUgPSB1c2VTYWxlc1JlcG9ydHNTdG9yZSgpO1xuY29uc3QgdXNlckRhdGEgPSBzYWxlc1JlcG9ydHNTdG9yZS51c2VyO1xuY29uc3QgZGlhbG9nID0gcmVmKGZhbHNlKTtcbi8vIGNvbnN0IHNlYXJjaFF1ZXJ5ID0gcmVmKFwiXCIpO1xuLy8gY29uc3Qgc2hvd1VzZXJDYXJkID0gcmVmKHRydWUpO1xuXG4vLyBjb25zdCBzZWFyY2hVc2VycyA9IGFzeW5jICgpID0+IHtcbi8vICAgaWYgKHNlYXJjaFF1ZXJ5LnZhbHVlKSB7XG4vLyAgICAgY29uc3QgYnJhbmNoSWQgPSB1c2VyRGF0YT8uZGF0YT8uYnJhbmNoX2VtcGxveWVlPy5icmFuY2hfaWQgfHwgXCJcIjtcbi8vICAgICBhd2FpdCB1c2VyRGF0YVN0b3JlLnNlYXJjaFVzZXJXaXRoSUQoc2VhcmNoUXVlcnkudmFsdWUsIGJyYW5jaElkKTtcbi8vICAgICBzaG93VXNlckNhcmQudmFsdWUgPSB0cnVlO1xuLy8gICB9XG4vLyB9O1xuXG5jb25zdCBpc0Ryb3Bkb3duVmlzaWJsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIHNlYXJjaFF1ZXJ5LnZhbHVlICYmIHVzZXJEYXRhU2VhcmNoLnZhbHVlLmxlbmd0aCA+IDA7XG59KTtcblxuY29uc3QgZXhwZW5zZXNGb3JtID0gcmVhY3RpdmUoe1xuICB1c2VyX2V4cGVuc2VfaWQ6IFwiXCIsXG4gIG5hbWU6IFwiXCIsXG4gIGFtb3VudDogMCxcbiAgZGVzY3JpcHRpb246IFwiXCIsXG59KTtcblxuLy8gY29uc3QgYXV0b0ZpbGxVc2VyID0gKHVzZXIpID0+IHtcbi8vICAgc2VhcmNoUXVlcnkudmFsdWUgPSB1c2VyLm5hbWU7XG4vLyAgIGV4cGVuc2VzRm9ybS5uYW1lID0gdXNlci5uYW1lO1xuLy8gICBleHBlbnNlc0Zvcm0udXNlcl9leHBlbnNlX2lkID0gdXNlci5pZDtcbi8vICAgc2hvd1VzZXJDYXJkLnZhbHVlID0gZmFsc2U7XG4vLyB9O1xuXG5jb25zdCBvcGVuRGlhbG9nID0gKCkgPT4ge1xuICBkaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcblxuY29uc3QgY2xvc2VCdG4gPSAoKSA9PiB7XG4gIGRpYWxvZy52YWx1ZSA9IGZhbHNlO1xufTtcblxuY29uc3QgY2xlYXIgPSAoKSA9PiB7XG4gIGV4cGVuc2VzRm9ybS5leHBlbnNlX3VzZXJfaWQgPSBcIlwiO1xuICBleHBlbnNlc0Zvcm0ubmFtZSA9IFwiXCI7XG4gIGV4cGVuc2VzRm9ybS5hbW91bnQgPSBcIlwiO1xuICBleHBlbnNlc0Zvcm0uZGVzY3JpcHRpb24gPSBcIlwiO1xufTtcblxuY29uc3QgaGFuZGxlU3VibWl0ID0gKCkgPT4ge1xuICBjb25zdCBhbW91bnRBc051bWJlciA9IHBhcnNlRmxvYXQoZXhwZW5zZXNGb3JtLmFtb3VudC5yZXBsYWNlKFwiLFwiLCBcIi5cIikpO1xuXG4gIGNvbnN0IGV4cGVuc2VSZXBvcnQgPSB7XG4gICAgLi4uZXhwZW5zZXNGb3JtLFxuICAgIHVzZXJfaWQ6IHVzZXJEYXRhPy5kYXRhLmlkLFxuICAgIGJyYW5jaF9pZDogdXNlckRhdGE/LmRhdGE/LmJyYW5jaF9lbXBsb3llZT8uYnJhbmNoX2lkIHx8IFwiXCIsXG4gICAgYW1vdW50OiBhbW91bnRBc051bWJlcixcbiAgfTtcblxuICBzYWxlc1JlcG9ydHNTdG9yZS51cGRhdGVFeHBlbnNlc1JlcG9ydChleHBlbnNlUmVwb3J0KTtcbiAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgIG1lc3NhZ2U6IFwiRXhwZW5zZXMgU3VibWl0dGVkXCIsXG4gICAgdGltZW91dDogMTAwMCxcbiAgfSk7XG5cbiAgY2xlYXIoKTtcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDwhLS0gPGRpdiBjbGFzcz1cInRleHQtaDUgcS1tYi1tZFwiPk92ZXIgQWxsIFRvdGFsPC9kaXY+IC0tPlxuXG4gIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXItc20ganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgPGRpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1saWdodFwiPkJyZWFkIFRvdGFsIEFtb3VudDwvZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICB2LW1vZGVsPVwiYnJlYWRUb3RhbEZvcm1hdHRlZFwiXG4gICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTUwcHhcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1saWdodFwiPlNlbGVjdGEgVG90YWwgQW1vdW50PC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgIHYtbW9kZWw9XCJzZWxlY3RhVG90YWxGb3JtYXR0ZWRcIlxuICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICBkZW5zZVxuICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDE1MHB4XCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC13ZWlnaHQtbGlnaHRcIj5Tb2Z0ZHJpbmtzIFRvdGFsIEFtb3VudDwvZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICB2LW1vZGVsPVwic29mdGRyaW5rc1RvdGFsRm9ybWF0dGVkXCJcbiAgICAgICAgICByZWFkb25seVxuICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgZGVuc2VcbiAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxNTBweFwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWxpZ2h0XCI+RXhwZW5jZXMgVG90YWwgQW1vdW50PC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgIHYtbW9kZWw9XCJleHBlbnNlc1RvdGFsRm9ybWF0dGVkXCJcbiAgICAgICAgICByZWFkb25seVxuICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgZGVuc2VcbiAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxNTBweFwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJyb3cgcS1teS1sZyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItc20gcS1teS1tZFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWxpZ2h0IHRleHQtaDYgcS1tdC1tZFwiPkNoYXJnZXMgVG90YWw8L2Rpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgdi1tb2RlbD1cImNoYXJnZXNUb3RhbEZvcm1hdHRlZFwiXG4gICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTgwcHhcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXNtIHEtbXktbWRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1ib2xkIHRleHQtaDYgcS1tdC1tZFwiPlRvdGFsIFNhbGVzPC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgIHYtbW9kZWw9XCJkZW5vbWluYXRpb25Ub3RhbEZvcm1hdHRlZFwiXG4gICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTgwcHhcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJxLW15LW1kXCIgYWxpZ249XCJyaWdodFwiPlxuICAgIDxxLWJ0blxuICAgICAgY2xhc3M9XCJxLXBhLXNtXCJcbiAgICAgIGNvbG9yPVwicmVkLTZcIlxuICAgICAgZGVuc2VcbiAgICAgIHJvdW5kZWRcbiAgICAgIGxhYmVsPVwiU3VibWl0XCJcbiAgICAgIEBjbGljaz1cImhhbmRsZVN1Ym1pdFwiXG4gICAgPlxuICAgICAgPHEtaWNvbiBjbGFzcz1cInEtbXgtc21cIiBsZWZ0IG5hbWU9XCJzZW5kXCIgLz5cbiAgICA8L3EtYnRuPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VTYWxlc1JlcG9ydHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3NhbGVzLXJlcG9ydFwiO1xuaW1wb3J0IHsgcmVmLCBjb21wdXRlZCB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgZm9ybWF0Q3VycmVuY3kgPSAodmFsdWUpID0+IHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChcImVuLVVTXCIsIHtcbiAgICBzdHlsZTogXCJjdXJyZW5jeVwiLFxuICAgIGN1cnJlbmN5OiBcIlBIUFwiLFxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gIH0pLmZvcm1hdCh2YWx1ZSk7XG59O1xuXG5jb25zdCBzYWxlc1JlcG9ydHNTdG9yZSA9IHVzZVNhbGVzUmVwb3J0c1N0b3JlKCk7XG5cbmNvbnN0IGJyZWFkVG90YWwgPSBjb21wdXRlZCgoKSA9PiBzYWxlc1JlcG9ydHNTdG9yZS5icmVhZFRvdGFsQW1vdW50KTtcbmNvbnN0IHNlbGVjdGFUb3RhbCA9IGNvbXB1dGVkKCgpID0+IHNhbGVzUmVwb3J0c1N0b3JlLnNlbGVjdGFUb3RhbEFtb3VudCk7XG5jb25zdCBzb2Z0ZHJpbmtzVG90YWwgPSBjb21wdXRlZCgoKSA9PiBzYWxlc1JlcG9ydHNTdG9yZS5zb2Z0ZHJpbmtzVG90YWxBbW91bnQpO1xuY29uc3QgZXhwZW5zZXNUb3RhbCA9IGNvbXB1dGVkKCgpID0+IHNhbGVzUmVwb3J0c1N0b3JlLmV4cGVuc2VzVG90YWxBbW91bnQpO1xuY29uc3QgY2hhcmdlc1RvdGFsID0gY29tcHV0ZWQoKCkgPT4gc2FsZXNSZXBvcnRzU3RvcmUuZ2V0Q2hhcmdlcyk7XG5jb25zdCBkZW5vbWluYXRpb25Ub3RhbCA9IGNvbXB1dGVkKFxuICAoKSA9PiBzYWxlc1JlcG9ydHNTdG9yZS5nZXREZW5vbWluYXRpb25Ub3RhbFxuKTtcblxuY29uc3QgdG90YWxTYWxlc0Ftb3VudCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIChcbiAgICBicmVhZFRvdGFsLnZhbHVlICtcbiAgICBzZWxlY3RhVG90YWwudmFsdWUgK1xuICAgIHNvZnRkcmlua3NUb3RhbC52YWx1ZSArXG4gICAgZXhwZW5zZXNUb3RhbC52YWx1ZVxuICApO1xufSk7XG5cbmNvbnN0IGJyZWFkVG90YWxGb3JtYXR0ZWQgPSBjb21wdXRlZCgoKSA9PiBmb3JtYXRDdXJyZW5jeShicmVhZFRvdGFsLnZhbHVlKSk7XG5jb25zdCBzZWxlY3RhVG90YWxGb3JtYXR0ZWQgPSBjb21wdXRlZCgoKSA9PlxuICBmb3JtYXRDdXJyZW5jeShzZWxlY3RhVG90YWwudmFsdWUpXG4pO1xuY29uc3Qgc29mdGRyaW5rc1RvdGFsRm9ybWF0dGVkID0gY29tcHV0ZWQoKCkgPT5cbiAgZm9ybWF0Q3VycmVuY3koc29mdGRyaW5rc1RvdGFsLnZhbHVlKVxuKTtcbmNvbnN0IGV4cGVuc2VzVG90YWxGb3JtYXR0ZWQgPSBjb21wdXRlZCgoKSA9PlxuICBmb3JtYXRDdXJyZW5jeShleHBlbnNlc1RvdGFsLnZhbHVlKVxuKTtcblxuY29uc3QgdG90YWxTYWxlc0Ftb3VudEZvcm1hdHRlZCA9IGNvbXB1dGVkKCgpID0+XG4gIGZvcm1hdEN1cnJlbmN5KHRvdGFsU2FsZXNBbW91bnQudmFsdWUpXG4pO1xuY29uc3QgZGVub21pbmF0aW9uVG90YWxGb3JtYXR0ZWQgPSBjb21wdXRlZCgoKSA9PlxuICBmb3JtYXRDdXJyZW5jeShkZW5vbWluYXRpb25Ub3RhbC52YWx1ZSlcbik7XG5jb25zdCBjaGFyZ2VzVG90YWxGb3JtYXR0ZWQgPSBjb21wdXRlZCgoKSA9PlxuICBmb3JtYXRDdXJyZW5jeShjaGFyZ2VzVG90YWwudmFsdWUpXG4pO1xuXG5jb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgYXdhaXQgc2FsZXNSZXBvcnRzU3RvcmUuc3VibWl0U2FsZXNSZXBvcnRzKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHN1Ym1pdHRpbmcgZGF0YTpcIiwgZXJyb3IpO1xuICB9XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwicS1wYS14bVwiPlxuICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMiB0ZXh0LXdlaWdodC1saWdodFwiPlNvZnRkcmlua3MgUmVwb3J0PC9kaXY+XG4gICAgPHEtZmllbGQgb3V0bGluZWQgZGVuc2UgcmVhZG9ubHk+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1weS1zbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItbWRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHEtaXRlbVxuICAgICAgICAgICAgICB2LWZvcj1cIihzb2Z0ZHJpbmtzLCBpbmRleCkgaW4gc29mdGRyaW5rc1JlcG9ydHNcIlxuICAgICAgICAgICAgICA6a2V5PVwiaW5kZXhcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJxLW1hLXNtIHRleHQtc3VidGl0bGUyXCIgc2lkZT5cbiAgICAgICAgICAgICAgICB7eyBzb2Z0ZHJpbmtzLm5hbWUgfX1cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSBxLWd1dHRlci1zbVwiIHNpZGU+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD5CZWdpbm5pbmdzPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPlxuICAgICAgICAgICAgICAgICAge3sgc29mdGRyaW5rcy50b3RhbCB9fVxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJxLW1hLXNtIHEtZ3V0dGVyLXNtXCIgc2lkZT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPlJlbWFpbm5pbmdzPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPlxuICAgICAgICAgICAgICAgICAge3sgc29mdGRyaW5rcy5yZW1haW5pbmdzIH19XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInEtbWEtc20gcS1ndXR0ZXItc21cIiBzaWRlPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+U29sZDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgIHt7IHNvZnRkcmlua3Muc29sZCB9fVxuICAgICAgICAgICAgICAgICAgPCEtLSA8cS1wb3B1cC1lZGl0XG4gICAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbnNcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwtc2V0PVwiU2F2ZVwiXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLWNhbmNlbD1cIkNsb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgdi1zbG90PVwic2NvcGVcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICAgICAgYXV0b2ZvY3VzXG4gICAgICAgICAgICAgICAgICAgICAgY291bnRlclxuICAgICAgICAgICAgICAgICAgICAgIEBrZXl1cC5lbnRlcj1cInNjb3BlLnNldFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICAgICAgICAgICAgPC9xLXBvcHVwLWVkaXQ+IC0tPlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJxLW1hLXNtIHEtZ3V0dGVyLXNtXCIgc2lkZT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPlByaWNlPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPlxuICAgICAgICAgICAgICAgICAge3sgZm9ybWF0Q3VycmVuY3koc29mdGRyaW5rcy5wcmljZSkgfX1cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSBxLWd1dHRlci1zbVwiIHNpZGU+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD5TYWxlczwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgIHt7IGZvcm1hdEN1cnJlbmN5KHNvZnRkcmlua3Muc2FsZXMpIH19XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInEtbWEtc20gcS1ndXR0ZXItc21cIiBzaWRlPlxuICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgY29sb3I9XCJyZWRcIlxuICAgICAgICAgICAgICAgICAgaWNvbj1cImNsb3NlXCJcbiAgICAgICAgICAgICAgICAgIHJvdW5kXG4gICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgQGNsaWNrPVwicmVtb3ZlU29mdGRyaW5rKGluZGV4KVwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvcS1maWVsZD5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyB1c2VTYWxlc1JlcG9ydHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3NhbGVzLXJlcG9ydFwiO1xuXG5jb25zdCBzYWxlc1JlcG9ydHNTdG9yZSA9IHVzZVNhbGVzUmVwb3J0c1N0b3JlKCk7XG5jb25zdCBzb2Z0ZHJpbmtzUmVwb3J0cyA9IGNvbXB1dGVkKCgpID0+IHNhbGVzUmVwb3J0c1N0b3JlLnNvZnRkcmlua3NSZXBvcnRzKTtcblxuY29uc3QgZm9ybWF0Q3VycmVuY3kgPSAodmFsdWUpID0+IHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChcImVuLVVTXCIsIHtcbiAgICBzdHlsZTogXCJjdXJyZW5jeVwiLFxuICAgIGN1cnJlbmN5OiBcIlBIUFwiLFxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gIH0pLmZvcm1hdCh2YWx1ZSk7XG59O1xuXG5jb25zdCByZW1vdmVTb2Z0ZHJpbmsgPSAoaW5kZXgpID0+IHtcbiAgc2FsZXNSZXBvcnRzU3RvcmUucmVtb3ZlU29mdGRyaW5rKGluZGV4KTtcbn07XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInEtcGEteG1cIj5cbiAgICA8ZGl2IGNsYXNzPVwidGV4dC1zdWJ0aXRsZTIgdGV4dC13ZWlnaHQtbGlnaHRcIj5TZWxlY3RhIFJlcG9ydDwvZGl2PlxuICAgIDxxLWZpZWxkIG91dGxpbmVkIGRlbnNlIHJlYWRvbmx5PlxuICAgICAgPGRpdiBjbGFzcz1cInEtcHktc21cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLW1kXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxxLWl0ZW0gdi1mb3I9XCIoc2VsZWN0YSwgaW5kZXgpIGluIHNlbGVjdGFSZXBvcnRzXCIgOmtleT1cImluZGV4XCI+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInEtbWEtc20gdGV4dC1zdWJ0aXRsZTJcIiBzaWRlPlxuICAgICAgICAgICAgICAgIHt7IHNlbGVjdGEubmFtZSB9fVxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJxLW1hLXNtIHEtZ3V0dGVyLXNtXCIgc2lkZT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPkJlZ2lubmlnczwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgIHt7IHNlbGVjdGEudG90YWwgfX1cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSBxLWd1dHRlci1zbVwiIHNpZGU+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD5SZW1haW5uaW5nczwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgIHt7IHNlbGVjdGEucmVtYWluaW5ncyB9fVxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJxLW1hLXNtIHEtZ3V0dGVyLXNtXCIgc2lkZT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPlNvbGQ8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+XG4gICAgICAgICAgICAgICAgICB7eyBzZWxlY3RhLnNvbGQgfX1cbiAgICAgICAgICAgICAgICAgIDwhLS0gPHEtcG9wdXAtZWRpdFxuICAgICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgICBidXR0b25zXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLXNldD1cIlNhdmVcIlxuICAgICAgICAgICAgICAgICAgICBsYWJlbC1jYW5jZWw9XCJDbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgIHYtc2xvdD1cInNjb3BlXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgICAgIGF1dG9mb2N1c1xuICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXJcbiAgICAgICAgICAgICAgICAgICAgICBAa2V5dXAuZW50ZXI9XCJzY29wZS5zZXRcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgICAgICAgICAgIDwvcS1wb3B1cC1lZGl0PiAtLT5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSBxLWd1dHRlci1zbVwiIHNpZGU+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD5QcmljZTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgIHt7IGZvcm1hdEN1cnJlbmN5KHNlbGVjdGEucHJpY2UpIH19XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSBxLWd1dHRlci1zbVwiIHNpZGU+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD5TYWxlczwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgIHt7IGZvcm1hdEN1cnJlbmN5KHNlbGVjdGEuc2FsZXMpIH19XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInEtbWEtc20gcS1ndXR0ZXItc21cIiBzaWRlPlxuICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgY29sb3I9XCJyZWRcIlxuICAgICAgICAgICAgICAgICAgaWNvbj1cImNsb3NlXCJcbiAgICAgICAgICAgICAgICAgIHJvdW5kXG4gICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgQGNsaWNrPVwicmVtb3ZlU2VsZWN0YShpbmRleClcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtZmllbGQ+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgdXNlU2FsZXNSZXBvcnRzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9zYWxlcy1yZXBvcnRcIjtcblxuY29uc3Qgc2FsZXNSZXBvcnRzU3RvcmUgPSB1c2VTYWxlc1JlcG9ydHNTdG9yZSgpO1xuY29uc3Qgc2VsZWN0YVJlcG9ydHMgPSBjb21wdXRlZCgoKSA9PiBzYWxlc1JlcG9ydHNTdG9yZS5zZWxlY3RhUmVwb3J0cyk7XG5cbmNvbnN0IGZvcm1hdEN1cnJlbmN5ID0gKHZhbHVlKSA9PiB7XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoXCJlbi1VU1wiLCB7XG4gICAgc3R5bGU6IFwiY3VycmVuY3lcIixcbiAgICBjdXJyZW5jeTogXCJQSFBcIixcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICB9KS5mb3JtYXQodmFsdWUpO1xufTtcblxuY29uc3QgcmVtb3ZlU2VsZWN0YSA9IChpbmRleCkgPT4ge1xuICBzYWxlc1JlcG9ydHNTdG9yZS5yZW1vdmVTZWxlY3RhKGluZGV4KTtcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJxLXBhLXhtXCI+XG4gICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUyIHRleHQtd2VpZ2h0LWxpZ2h0XCI+QnJlYWQgUmVwb3J0PC9kaXY+XG4gICAgPHEtZmllbGQgb3V0bGluZWQgZGVuc2UgcmVhZG9ubHk+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1weS1zbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItbWRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHEtaXRlbSB2LWZvcj1cIihicmVhZCwgaW5kZXgpIGluIGJyZWFkUmVwb3J0c1wiIDprZXk9XCJpbmRleFwiPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJxLW1hLXNtIHRleHQtc3VidGl0bGUyXCIgc2lkZT5cbiAgICAgICAgICAgICAgICB7eyBicmVhZC5uYW1lIH19XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInEtbWEtc20gcS1ndXR0ZXItc21cIiBzaWRlPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+QmVnaW5uaW5nczwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgIHt7IGJyZWFkLnRvdGFsIH19XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInEtbWEtc20gcS1ndXR0ZXItc21cIiBzaWRlPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+UmVtYWlubmluZ3M8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+XG4gICAgICAgICAgICAgICAgICB7eyBicmVhZC5yZW1haW5pbmcgfX1cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSBxLWd1dHRlci1zbVwiIHNpZGU+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD5Tb2xkPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPlxuICAgICAgICAgICAgICAgICAge3sgYnJlYWQuYnJlYWRfc29sZCB9fVxuICAgICAgICAgICAgICAgICAgPCEtLSA8cS1wb3B1cC1lZGl0XG4gICAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbnNcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwtc2V0PVwiU2F2ZVwiXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLWNhbmNlbD1cIkNsb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgdi1zbG90PVwic2NvcGVcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICAgICAgYXV0b2ZvY3VzXG4gICAgICAgICAgICAgICAgICAgICAgY291bnRlclxuICAgICAgICAgICAgICAgICAgICAgIEBrZXl1cC5lbnRlcj1cInNjb3BlLnNldFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICAgICAgICAgICAgPC9xLXBvcHVwLWVkaXQ+IC0tPlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJxLW1hLXNtIHEtZ3V0dGVyLXNtXCIgc2lkZT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPlByaWNlPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPlxuICAgICAgICAgICAgICAgICAge3sgZm9ybWF0Q3VycmVuY3koYnJlYWQucHJpY2UpIH19XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSBxLWd1dHRlci1zbVwiIHNpZGU+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD5TYWxlczwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgIHt7IGZvcm1hdEN1cnJlbmN5KGJyZWFkLnNhbGVzKSB9fVxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJxLW1hLXNtIHEtZ3V0dGVyLXNtXCIgc2lkZT5cbiAgICAgICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgICAgIGNvbG9yPVwicmVkXCJcbiAgICAgICAgICAgICAgICAgIGljb249XCJjbG9zZVwiXG4gICAgICAgICAgICAgICAgICByb3VuZFxuICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgIEBjbGljaz1cInJlbW92ZUJyZWFkKGluZGV4KVwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvcS1maWVsZD5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyB1c2VTYWxlc1JlcG9ydHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3NhbGVzLXJlcG9ydFwiO1xuXG5jb25zdCBzYWxlc1JlcG9ydHNTdG9yZSA9IHVzZVNhbGVzUmVwb3J0c1N0b3JlKCk7XG5jb25zdCBicmVhZFJlcG9ydHMgPSBjb21wdXRlZCgoKSA9PiBzYWxlc1JlcG9ydHNTdG9yZS5icmVhZFJlcG9ydHMpO1xuXG5jb25zdCBmb3JtYXRDdXJyZW5jeSA9ICh2YWx1ZSkgPT4ge1xuICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KFwiZW4tVVNcIiwge1xuICAgIHN0eWxlOiBcImN1cnJlbmN5XCIsXG4gICAgY3VycmVuY3k6IFwiUEhQXCIsXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgfSkuZm9ybWF0KHZhbHVlKTtcbn07XG5cbmNvbnN0IHJlbW92ZUJyZWFkID0gKGluZGV4KSA9PiB7XG4gIHNhbGVzUmVwb3J0c1N0b3JlLnJlbW92ZUJyZWFkKGluZGV4KTtcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJxLXBhLXhtXCI+XG4gICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUyIHRleHQtd2VpZ2h0LWxpZ2h0XCI+RXhwZW5zZXMgUmVwb3J0PC9kaXY+XG4gICAgPHEtZmllbGQgb3V0bGluZWQgZGVuc2UgcmVhZG9ubHk+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1weS1zbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItbWRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHEtaXRlbSB2LWZvcj1cIihleHBlbnNlcywgaW5kZXgpIGluIGV4cGVuc2VzUmVwb3J0c1wiIDprZXk9XCJpbmRleFwiPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJxLW1hLXNtIHRleHQtc3VidGl0bGUyXCIgc2lkZT5cbiAgICAgICAgICAgICAgICB7eyBleHBlbnNlcy5uYW1lIH19XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInEtbWEtc20gcS1ndXR0ZXItc21cIiBzaWRlPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+RGVzY3JpcHRpb248L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+XG4gICAgICAgICAgICAgICAgICB7eyBleHBlbnNlcy5kZXNjcmlwdGlvbiB9fVxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJxLW1hLXNtIHEtZ3V0dGVyLXNtXCIgc2lkZT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPkFtb3VudDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgICAgICAgICAgIHt7IGZvcm1hdEN1cnJlbmN5KGV4cGVuc2VzLmFtb3VudCkgfX1cbiAgICAgICAgICAgICAgICAgIDwhLS0gPHEtcG9wdXAtZWRpdFxuICAgICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgICBidXR0b25zXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLXNldD1cIlNhdmVcIlxuICAgICAgICAgICAgICAgICAgICBsYWJlbC1jYW5jZWw9XCJDbG9zZVwiXG4gICAgICAgICAgICAgICAgICAgIHYtc2xvdD1cInNjb3BlXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgICAgIGF1dG9mb2N1c1xuICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXJcbiAgICAgICAgICAgICAgICAgICAgICBAa2V5dXAuZW50ZXI9XCJzY29wZS5zZXRcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgICAgICAgICAgIDwvcS1wb3B1cC1lZGl0PiAtLT5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwicS1tYS1zbSBxLWd1dHRlci1zbVwiIHNpZGU+XG4gICAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgICBjb2xvcj1cInJlZFwiXG4gICAgICAgICAgICAgICAgICBpY29uPVwiY2xvc2VcIlxuICAgICAgICAgICAgICAgICAgcm91bmRcbiAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICBAY2xpY2s9XCJyZW1vdmVFeHBlbnNlcyhpbmRleClcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtZmllbGQ+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgdXNlU2FsZXNSZXBvcnRzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9zYWxlcy1yZXBvcnRcIjtcblxuY29uc3Qgc2FsZXNSZXBvcnRzU3RvcmUgPSB1c2VTYWxlc1JlcG9ydHNTdG9yZSgpO1xuY29uc3QgZXhwZW5zZXNSZXBvcnRzID0gY29tcHV0ZWQoKCkgPT4gc2FsZXNSZXBvcnRzU3RvcmUuZXhwZW5zZXNSZXBvcnRzKTtcblxuY29uc3QgZm9ybWF0Q3VycmVuY3kgPSAodmFsdWUpID0+IHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChcImVuLVVTXCIsIHtcbiAgICBzdHlsZTogXCJjdXJyZW5jeVwiLFxuICAgIGN1cnJlbmN5OiBcIlBIUFwiLFxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gIH0pLmZvcm1hdCh2YWx1ZSk7XG59O1xuXG5jb25zdCByZW1vdmVFeHBlbnNlcyA9IChpbmRleCkgPT4ge1xuICBzYWxlc1JlcG9ydHNTdG9yZS5yZW1vdmVFeHBlbnNlcyhpbmRleCk7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1jYXJkIGZsYXQ+XG4gICAgPHEtY2FyZC1zZWN0aW9uIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogI2VmNDQ0NFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDYgdGV4dC13aGl0ZVwiPlxuICAgICAgICA8cS1pY29uIG5hbWU9XCJmYS1zb2xpZCBmYS1sYXllci1ncm91cFwiIC8+XG4gICAgICAgIFNhbGVzIFJlcG9ydFxuICAgICAgPC9kaXY+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLW1kIHEtbWItbGdcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8RXhwZW5zZXNSZXBvcnQgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPERlbm9taW5hdGlvblJlcG9ydCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbWRcIj5cbiAgICAgICAgPE92ZXJBbGxUb3RhbCAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1tdC1tZCBxLWd1dHRlci15LW1kXCI+XG4gICAgICAgIDxFeHBlbnNlc1JlcG9ydEZpZWxkIC8+XG4gICAgICAgIDxCcmVhZFJlcG9ydEZpZWxkIC8+XG4gICAgICAgIDxTZWxlY3RhUmVwb3J0RmllbGQgLz5cbiAgICAgICAgPFNvZnRkcmlua3NSZXBvcnRGaWVsZCAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgPC9xLWNhcmQ+XG48L3RlbXBsYXRlPlxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBEZW5vbWluYXRpb25SZXBvcnQgZnJvbSBcIi4vY29tcG9uZW50cy9EZW5vbWluYXRpb25SZXBvcnQudnVlXCI7XG5pbXBvcnQgRXhwZW5zZXNSZXBvcnQgZnJvbSBcIi4vY29tcG9uZW50cy9FeHBlbnNlc1JlcG9ydC52dWVcIjtcbmltcG9ydCBPdmVyQWxsVG90YWwgZnJvbSBcIi4vY29tcG9uZW50cy9PdmVyQWxsVG90YWwudnVlXCI7XG5pbXBvcnQgU29mdGRyaW5rc1JlcG9ydEZpZWxkIGZyb20gXCIuL2NvbXBvbmVudHMvU29mdGRyaW5rc1JlcG9ydEZpZWxkLnZ1ZVwiO1xuaW1wb3J0IFNlbGVjdGFSZXBvcnRGaWVsZCBmcm9tIFwiLi9jb21wb25lbnRzL1NlbGVjdGFSZXBvcnRGaWVsZC52dWVcIjtcbmltcG9ydCBCcmVhZFJlcG9ydEZpZWxkIGZyb20gXCIuL2NvbXBvbmVudHMvQnJlYWRSZXBvcnRGaWVsZC52dWVcIjtcbmltcG9ydCBFeHBlbnNlc1JlcG9ydEZpZWxkIGZyb20gXCIuL2NvbXBvbmVudHMvRXhwZW5zZXNSZXBvcnRGaWVsZC52dWVcIjtcbmltcG9ydCB7IHJlZiwgcmVhY3RpdmUgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5jb25zdCBvcGVuRGlhbG9nID0gKCkgPT4ge1xuICBkaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcbmNvbnN0IGJyZWFkTGlzdCA9IHJlYWN0aXZlKFtcbiAge1xuICAgIG5hbWU6IFwiV2hvbGUgV2hlYXRcIixcbiAgICBzb2xkOiAxMCxcbiAgICBwcmljZTogNSxcbiAgICBiZWdpbm5pbmc6IDIwLFxuICAgIHNhbGVzOiAzMCxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiU291cmRvdWdoXCIsXG4gICAgc29sZDogMTUsXG4gICAgcHJpY2U6IDcsXG4gICAgYmVnaW5uaW5nOiAyNSxcbiAgICBzYWxlczogNDAsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIlBhbiBkZSBDb2NvXCIsXG4gICAgc29sZDogMTUsXG4gICAgcHJpY2U6IDQsXG4gICAgYmVnaW5uaW5nOiAyNSxcbiAgICBzYWxlczogNDAsXG4gIH0sXG4gIC8vIEFkZCBtb3JlIGJyZWFkIGl0ZW1zIGFzIG5lZWRlZFxuXSk7XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPjwvc3R5bGU+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa01BLFVBQU0sb0JBQW9CLHFCQUFvQjtBQUU5QyxVQUFNLFNBQVMsSUFBSSxLQUFLO0FBQ3hCLFVBQU0sYUFBYSxNQUFNO0FBQ3ZCLGFBQU8sUUFBUTtBQUFBLElBQ2pCO0FBQ0EsVUFBTSxXQUFXLE1BQU07QUFDckIsYUFBTyxRQUFRO0FBQUEsSUFDakI7QUFFQSxVQUFNLG1CQUFtQixTQUFTO0FBQUEsTUFDaEMsa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsaUJBQWlCO0FBQUEsTUFDakIsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLE1BQ1osYUFB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
