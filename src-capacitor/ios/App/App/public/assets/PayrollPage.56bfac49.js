import { _ as _export_sfc, g as computed, z as onMounted, o as openBlock, c as createBlock, w as withCtx, a as createVNode, I as QCardSection, J as createBaseVNode, R as toDisplayString, a2 as QSeparator, Q as QCard, S as pushScopeId, T as popScopeId, a4 as createElementBlock, a5 as Fragment, n as ref, L as QIcon, bd as QSpinner, K as QInput, d as defineStore, O as createTextVNode, bc as withKeys, M as QBtn, af as withDirectives, a3 as QDialog, t as reactive, aK as QCardActions, N as Notify, a6 as renderList, be as createCommentVNode, bg as unref, a1 as QAvatar, u as watch, b9 as QCheckbox, bp as QRadio, aL as normalizeClass } from "./index.c8e2405b.js";
import { a as QTab, Q as QTabs, c as QTabPanel, b as QTabPanels } from "./QTabPanels.31673619.js";
import { Q as QPage } from "./QPage.e43c6521.js";
import { u as useEmployeeStore } from "./employee.08e2bc37.js";
import { Q as QVirtualScroll } from "./QVirtualScroll.41a98cb7.js";
import { u as useBranchesStore } from "./branch.9a956ff2.js";
import { u as useWarehousesStore } from "./warehouse.f8473ccb.js";
import { Q as QTooltip } from "./QTooltip.4a3eef22.js";
import { Q as QPopupEdit } from "./QPopupEdit.5c11c937.js";
import { Q as QTd } from "./QTd.f597934c.js";
import { Q as QBadge } from "./QBadge.49245359.js";
import { Q as QSelect, a as QChip } from "./QSelect.0985e28e.js";
import { Q as QTable } from "./QTable.d3fb87f5.js";
import { C as ClosePopup } from "./ClosePopup.649d85d8.js";
import { q as quasarDate } from "./date.cdd6bcba.js";
import { u as useQuasar } from "./use-quasar.84d8ad03.js";
import { api } from "./axios.aa1bce92.js";
import { _ as _imports_0 } from "./GB_LOGO.b766a815.js";
import { Q as QSpace } from "./QSpace.08c50700.js";
import { p as pdfmake, v as vfs_fontes } from "./vfs_fontes.3eb8cb31.js";
import { Q as QItem, a as QItemSection } from "./QItem.76557ad9.js";
import { Q as QList } from "./QList.d5d13fac.js";
import { Q as QIntersection } from "./QIntersection.573d893c.js";
import "./QResizeObserver.240147be.js";
import "./rtl.b1b38f21.js";
import "./use-panel.e42dc1d1.js";
import "./touch.9135741d.js";
import "./selection.94057980.js";
import "./use-virtual-scroll.5b4ab88d.js";
import "./QMenu.4f670399.js";
var TotalEmployeeSalaryBenefits_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$c = (n) => (pushScopeId("data-v-187f8741"), n = n(), popScopeId(), n);
const _hoisted_1$n = { class: "col q-pa-md" };
const _hoisted_2$k = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Total Employee", -1));
const _hoisted_3$i = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-caption text-grey-6" }, "Total Number Of Employees", -1));
const _hoisted_4$f = { class: "text-h3 text-primary q-my-sm" };
const _hoisted_5$f = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-caption text-grey-7" }, "Employees", -1));
const _hoisted_6$d = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ createBaseVNode("div", { class: "col q-pa-md" }, [
  /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Salary Per Month"),
  /* @__PURE__ */ createBaseVNode("div", { class: "text-caption text-grey-6" }, " Current Total Salary Per Month "),
  /* @__PURE__ */ createBaseVNode("div", { class: "text-h3 text-positive q-my-sm" }, "\u20B1 52,962"),
  /* @__PURE__ */ createBaseVNode("div", { class: "text-caption text-grey-7" }, "PHP")
], -1));
const _hoisted_7$b = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ createBaseVNode("div", { class: "col q-pa-md" }, [
  /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Benefits Fund"),
  /* @__PURE__ */ createBaseVNode("div", { class: "text-caption text-grey-6" }, "For all Employees Per Month"),
  /* @__PURE__ */ createBaseVNode("div", { class: "text-h3 text-warning q-my-sm" }, "\u20B1 200,123"),
  /* @__PURE__ */ createBaseVNode("div", { class: "text-caption text-grey-7" }, "PHP")
], -1));
const _sfc_main$s = {
  __name: "TotalEmployeeSalaryBenefits",
  setup(__props) {
    const employeeStore = useEmployeeStore();
    const employees = computed(() => employeeStore.employees);
    onMounted(async () => {
      await fetchEmployeeData();
    });
    const fetchEmployeeData = async () => {
      try {
        employees.value = await employeeStore.fetchAllEmployee();
      } catch (error) {
        console.log("error fetching employee: ", error);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QCard, { class: "q-pa-md q-mb-md q-mt-sm text-center user-card" }, {
        default: withCtx(() => [
          createVNode(QCardSection, { horizontal: "" }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1$n, [
                _hoisted_2$k,
                _hoisted_3$i,
                createBaseVNode("div", _hoisted_4$f, toDisplayString(employees.value.length), 1),
                _hoisted_5$f
              ]),
              createVNode(QSeparator, { vertical: "" }),
              _hoisted_6$d,
              createVNode(QSeparator, { vertical: "" }),
              _hoisted_7$b
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
var TotalEmployeeSalaryBenefits = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-187f8741"], ["__file", "TotalEmployeeSalaryBenefits.vue"]]);
var BranchEmployeeCard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$b = (n) => (pushScopeId("data-v-109cadaa"), n = n(), popScopeId(), n);
const _hoisted_1$m = { class: "row justify-between" };
const _hoisted_2$j = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Branch Employee", -1));
const _hoisted_3$h = { class: "text-caption text-grey-6" };
const _hoisted_4$e = { class: "text-subtitle2" };
const _hoisted_5$e = { class: "text-h6 text-grey-6" };
const _sfc_main$r = {
  __name: "BranchEmployeeCard",
  setup(__props) {
    const branchStore = useBranchesStore();
    const branches = computed(() => branchStore.branches);
    console.log("branchWithEmploye", branches.value);
    onMounted(async () => {
      await fetchBranchData();
    });
    const fetchBranchData = async () => {
      try {
        branches.value = await branchStore.fetchBranchWithEmployee();
        console.log("branches", branches.value);
      } catch (error) {
        console.log("error fetching branch: ", error);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QCard, {
        class: "user-card",
        style: { "height": "300px" }
      }, {
        default: withCtx(() => [
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1$m, [
                createBaseVNode("div", null, [
                  _hoisted_2$j,
                  createBaseVNode("div", _hoisted_3$h, " Total Number of Branch : " + toDisplayString(branches.value.length), 1)
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createVNode(QVirtualScroll, {
                items: branches.value,
                "scroll-target": "body",
                "virtual-scroll-horizontal": "",
                class: "my-virtual-scroll",
                align: "center"
              }, {
                default: withCtx(({ item: branch, index }) => [
                  (openBlock(), createBlock(QCard, {
                    flat: "",
                    bordered: "",
                    dense: "",
                    key: index,
                    class: "my-card"
                  }, {
                    default: withCtx(() => [
                      createVNode(QCardSection, { class: "bg-grey-2" }, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_4$e, toDisplayString(branch.name), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(QSeparator),
                      createVNode(QCardSection, null, {
                        default: withCtx(() => {
                          var _a;
                          return [
                            createBaseVNode("div", _hoisted_5$e, toDisplayString((_a = branch == null ? void 0 : branch.branch_employee) == null ? void 0 : _a.length), 1)
                          ];
                        }),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024))
                ]),
                _: 1
              }, 8, ["items"])
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
var BranchEmployeeCard = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-109cadaa"], ["__file", "BranchEmployeeCard.vue"]]);
var WarehouseEmployeCard_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$a = (n) => (pushScopeId("data-v-207a294b"), n = n(), popScopeId(), n);
const _hoisted_1$l = { class: "row justify-between" };
const _hoisted_2$i = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Warehouse Employee", -1));
const _hoisted_3$g = { class: "text-caption text-grey-6" };
const _hoisted_4$d = { class: "text-subtitle2" };
const _hoisted_5$d = { class: "text-h6 text-grey-6" };
const _sfc_main$q = {
  __name: "WarehouseEmployeCard",
  setup(__props) {
    const warehouseStore = useWarehousesStore();
    const warehouses = computed(() => warehouseStore.warehouses);
    onMounted(async () => {
      await fethcwarehouseData();
    });
    const fethcwarehouseData = async () => {
      try {
        warehouses.value = await warehouseStore.fetchWarehouseWithEmployee();
        console.log("warehouses", warehouses.value);
      } catch (error) {
        console.log("error fetching recipe: ", error);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QCard, {
        class: "user-card",
        style: { "height": "300px" }
      }, {
        default: withCtx(() => [
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1$l, [
                createBaseVNode("div", null, [
                  _hoisted_2$i,
                  createBaseVNode("div", _hoisted_3$g, " Total Number of Warehouse : " + toDisplayString(warehouses.value.length), 1)
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createVNode(QVirtualScroll, {
                items: warehouses.value,
                "scroll-target": "body",
                "virtual-scroll-horizontal": "",
                class: "my-virtual-scroll"
              }, {
                default: withCtx(({ item: warehouse, index }) => [
                  (openBlock(), createBlock(QCard, {
                    flat: "",
                    bordered: "",
                    dense: "",
                    key: index,
                    class: "my-card",
                    style: { "display": "inline-block", "width": "auto" },
                    align: "center"
                  }, {
                    default: withCtx(() => [
                      createVNode(QCardSection, { class: "bg-grey-2" }, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_4$d, toDisplayString(warehouse.name), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(QSeparator),
                      createVNode(QCardSection, null, {
                        default: withCtx(() => {
                          var _a;
                          return [
                            createBaseVNode("div", _hoisted_5$d, toDisplayString((_a = warehouse == null ? void 0 : warehouse.warehouse_employee) == null ? void 0 : _a.length), 1)
                          ];
                        }),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024))
                ]),
                _: 1
              }, 8, ["items"])
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
var WarehouseEmployeCard = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-207a294b"], ["__file", "WarehouseEmployeCard.vue"]]);
const _hoisted_1$k = { class: "row justify-between" };
const _hoisted_2$h = { class: "col-6 q-pr-sm" };
const _hoisted_3$f = { class: "col-6 q-pl-sm" };
const _sfc_main$p = {
  __name: "DashboardPage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(TotalEmployeeSalaryBenefits),
        createBaseVNode("div", _hoisted_1$k, [
          createBaseVNode("div", _hoisted_2$h, [
            createVNode(BranchEmployeeCard)
          ]),
          createBaseVNode("div", _hoisted_3$f, [
            createVNode(WarehouseEmployeCard)
          ])
        ])
      ], 64);
    };
  }
};
var DashboardPage = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__file", "DashboardPage.vue"]]);
const _sfc_main$o = {
  __name: "SearchEmployee",
  setup(__props) {
    const employeeStore = useEmployeeStore();
    const searchKeyword = ref("");
    const loading = ref(false);
    const search = async () => {
      loading.value = true;
      await employeeStore.searchEmployee(searchKeyword.value);
      loading.value = false;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(QInput, {
          modelValue: searchKeyword.value,
          "onUpdate:modelValue": [
            _cache[0] || (_cache[0] = ($event) => searchKeyword.value = $event),
            search
          ],
          outlined: "",
          dense: "",
          flat: "",
          label: "Search",
          debounce: "1000",
          style: { "width": "300px" }
        }, {
          append: withCtx(() => [
            createBaseVNode("div", null, [
              !loading.value ? (openBlock(), createBlock(QIcon, {
                key: 0,
                name: "search"
              })) : (openBlock(), createBlock(QSpinner, {
                key: 1,
                color: "grey",
                size: "sm"
              }))
            ])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
};
var SearchEmployee = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__file", "SearchEmployee.vue"]]);
const useEmploymentTypeStore = defineStore("employmentType", () => {
  const employmentType = ref(null);
  const fetchEmploymentType = async () => {
    const response = await api.get("/api/employment-types");
    employmentType.value = response.data;
    console.log("Employementresponse", response.data);
  };
  return {
    employmentType,
    fetchEmploymentType
  };
});
var IDLogo = "assets/IDLogo.76e564fd.png";
var EmployeeEdit_vue_vue_type_style_index_0_scoped_true_lang = "";
var TableSection_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$j = { style: { "width": "100%" } };
const _hoisted_2$g = { class: "text-subtitle2" };
const _hoisted_3$e = { class: "row q-gutter-md" };
const _hoisted_4$c = { class: "row justify-center q-gutter-x-md" };
const _hoisted_5$c = {
  class: "text-white q-ma-sm",
  align: "right"
};
const _hoisted_6$c = ["src"];
const _sfc_main$n = {
  __name: "TableSection",
  setup(__props) {
    pdfmake.exports.vfs = vfs_fontes;
    const employmentStore = useEmploymentTypeStore();
    const employmentTypeOptions = ref([]);
    const employeeStore = useEmployeeStore();
    const employeeRows = computed(() => employeeStore.employees);
    const pagination = ref({
      rowsPerPage: 0
    });
    console.log("employees fetch madepaker", employeeRows.value);
    onMounted(async () => {
      await reloadTableData();
    });
    const fetchEmploymentTypeData = async () => {
      await employmentStore.fetchEmploymentType();
      employmentTypeOptions.value = employmentStore.employmentType.map((val) => ({
        label: val.category,
        value: val.id
      }));
      console.log("Employment Type Options:", employmentTypeOptions.value);
    };
    onMounted(fetchEmploymentTypeData);
    const employmentTypeId = ref(null);
    const setEmploymentTypeId = (row) => {
      var _a;
      employmentTypeId.value = ((_a = row.employment_type) == null ? void 0 : _a.id) || null;
      console.log("Initial employmentTypeId:", employmentTypeId.value);
    };
    console.log("====================================");
    console.log("employmentTypeIdsss", employmentTypeId.value);
    console.log("====================================");
    const reloadTableData = async () => {
      try {
        employeeRows.value = await employeeStore.fetchEmployeeWithEmploymentType();
        console.log("fetchEmployeeWithEmploymentType", employeeRows.value);
      } catch (error) {
        console.log("employee madepaker", error);
      }
    };
    const formatDate = (dateString) => {
      return quasarDate.formatDate(dateString, "MMMM DD, YYYY");
    };
    const formatFullname = (row) => {
      const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
      const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
      const middlename = row.middlename ? capitalize(row.middlename).charAt(0) + "." : "";
      const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";
      return `${firstname} ${middlename} ${lastname}`;
    };
    const capitalizeAddress = (address) => {
      if (!address)
        return "";
      return address.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    };
    const updateEmployeeFullname = async (data, val) => {
      console.log("data", data);
      console.log("val", val);
      const employeeFullname = {
        id: data.id,
        firstname: val.firstname || data.firstname,
        middlename: val.middlename || data.middlename,
        lastname: val.lastname || data.lastname
      };
      await employeeStore.updateEmployeeFullname(employeeFullname);
    };
    const updateEmploymentType = async (row, selectedId) => {
      console.log("updateEmploymentType triggered");
      console.log("row", row);
      console.log("New employment type ID:", selectedId);
      const updateEmployeesEmploymentType = {
        id: row.id,
        employment_type_id: selectedId.value
      };
      await employeeStore.updateEmployeeEmploymentType(
        updateEmployeesEmploymentType
      );
    };
    const updateEmployeeAddress = async (data, val) => {
      console.log("data", data);
      console.log("val", val);
      const employeeAddress = {
        id: data.id,
        address: val
      };
      await employeeStore.updateEmployeeAddress(employeeAddress);
    };
    const updateEmployeePhone = async (data, val) => {
      console.log("data", data);
      console.log("val", val);
      const employeePhone = {
        id: data.id,
        phone: val
      };
      await employeeStore.updateEmployeePhone(employeePhone);
    };
    const updateEmployeeBirthdate = async (data, val) => {
      console.log("data", data);
      console.log("val", val);
      const employeeBirthdate = {
        id: data.id,
        birthdate: val
      };
      await employeeStore.updateEmployeebirthdate(employeeBirthdate);
    };
    const employeeColumns = [
      {
        name: "fullname",
        required: true,
        label: "Full Name",
        align: "center",
        field: (row) => formatFullname(row),
        format: (val) => `${val}`,
        sortable: true
      },
      {
        name: "employmentType",
        label: "Employment Type",
        align: "center",
        field: (row) => row.employment_type ? row.employment_type.category : "N/A",
        format: (val) => `${val}`
      },
      {
        name: "address",
        required: true,
        label: "Address",
        align: "center",
        field: "address",
        sortable: true
      },
      {
        name: "phone",
        required: true,
        label: "Phone",
        align: "center",
        field: "phone",
        format: (val) => `${val}`,
        sortable: true
      },
      {
        name: "birthdate",
        required: true,
        label: "Birthdate",
        align: "center",
        field: "birthdate",
        format: (val) => formatDate(val),
        sortable: true
      },
      {
        name: "actions",
        align: "center",
        label: "Action",
        field: "actions"
      }
    ];
    useQuasar();
    const dialog = ref(false);
    const pdfUrl = ref("");
    const handlePrintID = (row) => {
      convertImageToBase64(IDLogo, (base64Image) => {
        convertImageToBase64(_imports_0, (base64Logo) => {
          const docDefinition = generateDocDefinition(row, base64Image, base64Logo);
          pdfmake.exports.createPdf(docDefinition).getDataUrl((dataUrl) => {
            pdfUrl.value = dataUrl;
            dialog.value = true;
          });
        });
      });
    };
    const convertImageToBase64 = (url, callback) => {
      const reader = new FileReader();
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
      xhr.onload = function() {
        if (xhr.status === 200) {
          reader.readAsDataURL(xhr.response);
          reader.onloadend = function() {
            callback(reader.result);
          };
        } else {
          console.error("Failed to load image.");
        }
      };
      xhr.send();
    };
    const generateDocDefinition = (employee, base64Image, base64Logo) => {
      return {
        pageSize: { width: 323, height: 204 },
        pageMargins: [0, 0, 0, 0],
        background: [
          {
            image: base64Logo,
            width: 140,
            opacity: 0.1,
            absolutePosition: { x: 70, y: 15 }
          }
        ],
        content: [
          {
            canvas: [
              {
                type: "rect",
                x: 0,
                y: 0,
                w: 260,
                h: 150,
                lineWidth: 1,
                lineColor: "black",
                dash: { length: 4 }
              }
            ],
            absolutePosition: { x: 0, y: 0 }
          },
          {
            alignment: "justify",
            columns: [
              {
                image: base64Image,
                width: 100,
                height: 153,
                alignment: "left",
                margin: [-8, -4, 0, 0]
              },
              {
                stack: [
                  {
                    text: "GB Bakeshop",
                    style: "header",
                    color: "red",
                    margin: [0, 0, 50, 0]
                  },
                  {
                    text: `Name  : ${formatFullname(employee)}`,
                    style: "name"
                  },
                  {
                    text: `Position : ${employee.position}`,
                    style: "position"
                  },
                  {
                    text: `Phone  : ${employee.phone}`,
                    style: "info"
                  },
                  {
                    qr: `${employee.id.toString()} - ${formatFullname(
                      employee
                    )} - ${employee.position}`,
                    fit: 87,
                    foreground: "red",
                    background: "yellow",
                    margin: [30, 7, 0, 0]
                  }
                ]
              }
            ]
          }
        ],
        styles: {
          header: {
            fontSize: 15,
            bold: true,
            alignment: "center"
          },
          name: {
            fontSize: 8,
            bold: true,
            margin: [5, 1, 0, 0]
          },
          position: {
            fontSize: 8,
            margin: [5, 2, 0, 0]
          },
          info: {
            fontSize: 7,
            margin: [5, 2, 0, 0]
          },
          address: {
            fontSize: 7,
            margin: [0, 5, 0, 0]
          }
        }
      };
    };
    const getEmployementTypeColor = (employmentType) => {
      switch (employmentType) {
        case "Regular":
          return "blue-8";
        case "Trainee":
          return "orange-5";
        case "Part-time":
          return "teal-5";
        default:
          return "grey";
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$j, [
          createVNode(QTable, {
            title: "Employees",
            rows: employeeRows.value,
            columns: employeeColumns,
            "row-key": "fullname",
            "hide-bottom": "",
            pagination: pagination.value,
            "onUpdate:pagination": _cache[1] || (_cache[1] = ($event) => pagination.value = $event),
            class: "custom-table",
            style: { "max-width": "100%", "height": "460px" }
          }, {
            "top-right": withCtx(() => [
              createVNode(SearchEmployee)
            ]),
            "body-cell-fullname": withCtx((props) => [
              createVNode(QTd, {
                key: "fullname",
                props
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_2$g, [
                    createTextVNode(toDisplayString(formatFullname(props.row)) + " ", 1),
                    createVNode(QTooltip, {
                      class: "bg-blue-grey-8",
                      offset: [10, 10]
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Edit Employee Name ")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(QPopupEdit, {
                    modelValue: props.row,
                    "onUpdate:modelValue": [
                      ($event) => props.row = $event,
                      (val) => updateEmployeeFullname(props.row, val)
                    ],
                    buttons: "",
                    title: "Edit Employee Full Name"
                  }, {
                    default: withCtx(({ value, set }) => [
                      createBaseVNode("div", _hoisted_3$e, [
                        createVNode(QInput, {
                          class: "text-capitalize",
                          modelValue: value.firstname,
                          "onUpdate:modelValue": ($event) => value.firstname = $event,
                          label: "First Name",
                          outlined: "",
                          flat: "",
                          color: "positive",
                          dense: "",
                          autofucos: "",
                          onKeyup: withKeys(($event) => set(value), ["enter"])
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                        createVNode(QInput, {
                          class: "text-capitalize",
                          modelValue: value.middlename,
                          "onUpdate:modelValue": ($event) => value.middlename = $event,
                          label: "Middle Name",
                          outlined: "",
                          flat: "",
                          color: "positive",
                          dense: "",
                          autofucos: "",
                          onKeyup: withKeys(($event) => set(value), ["enter"])
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"]),
                        createVNode(QInput, {
                          class: "text-capitalize",
                          modelValue: value.lastname,
                          "onUpdate:modelValue": ($event) => value.lastname = $event,
                          label: "Last Name",
                          outlined: "",
                          flat: "",
                          color: "positive",
                          dense: "",
                          autofucos: "",
                          onKeyup: withKeys(($event) => set(value), ["enter"])
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"])
                      ])
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-employmentType": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode(QBadge, {
                      color: getEmployementTypeColor((_a = props.row.employment_type) == null ? void 0 : _a.category)
                    }, {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          createTextVNode(toDisplayString(((_a2 = props.row.employment_type) == null ? void 0 : _a2.category) || "N/A") + " ", 1),
                          createVNode(QTooltip, {
                            class: "bg-blue-grey-8",
                            offset: [10, 10]
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Edit Employment Type ")
                            ]),
                            _: 1
                          })
                        ];
                      }),
                      _: 2
                    }, 1032, ["color"]),
                    createVNode(QPopupEdit, {
                      modelValue: employmentTypeId.value,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => employmentTypeId.value = $event),
                      onBeforeShow: () => setEmploymentTypeId(props.row),
                      onSave: (val) => updateEmploymentType(props.row, val),
                      buttons: "",
                      title: "Edit Employment Type"
                    }, {
                      default: withCtx((scope) => [
                        createVNode(QSelect, {
                          modelValue: scope.value,
                          "onUpdate:modelValue": [($event) => scope.value = $event, employmentTypeId.value],
                          dense: "",
                          autofocus: "",
                          options: employmentTypeOptions.value,
                          "option-label": "label",
                          "option-value": "value",
                          behavior: "menu"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                      ]),
                      _: 2
                    }, 1032, ["modelValue", "onBeforeShow", "onSave"])
                  ];
                }),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-address": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("div", null, [
                    createTextVNode(toDisplayString(capitalizeAddress(props.row.address)) + " ", 1),
                    createVNode(QTooltip, {
                      class: "bg-blue-grey-8",
                      offset: [10, 10]
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Edit Address ")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(QPopupEdit, {
                    "onUpdate:modelValue": [(val) => updateEmployeeAddress(props.row, val), ($event) => props.row.address = $event],
                    modelValue: props.row.address,
                    buttons: "",
                    title: "Edit Address"
                  }, {
                    default: withCtx((scope) => [
                      createVNode(QInput, {
                        class: "text-capitalize",
                        modelValue: scope.value,
                        "onUpdate:modelValue": ($event) => scope.value = $event,
                        dense: "",
                        autofocus: "",
                        counter: "",
                        onKeyup: withKeys(scope.set, ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"])
                    ]),
                    _: 2
                  }, 1032, ["onUpdate:modelValue", "modelValue"])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-phone": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("div", null, [
                    createTextVNode(toDisplayString(capitalizeAddress(props.row.phone)) + " ", 1),
                    createVNode(QTooltip, {
                      class: "bg-blue-grey-8",
                      offset: [10, 10]
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Edit Phone ")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(QPopupEdit, {
                    "onUpdate:modelValue": [(val) => updateEmployeePhone(props.row, val), ($event) => props.row.phone = $event],
                    modelValue: props.row.phone,
                    buttons: "",
                    title: "Edit Phone"
                  }, {
                    default: withCtx((scope) => [
                      createVNode(QInput, {
                        modelValue: scope.value,
                        "onUpdate:modelValue": ($event) => scope.value = $event,
                        dense: "",
                        autofocus: "",
                        mask: "+(63) ### - ### - ####",
                        counter: "",
                        onKeyup: withKeys(scope.set, ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"])
                    ]),
                    _: 2
                  }, 1032, ["onUpdate:modelValue", "modelValue"])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-birthdate": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("div", null, [
                    createTextVNode(toDisplayString(formatDate(props.row.birthdate)) + " ", 1),
                    createVNode(QTooltip, {
                      class: "bg-blue-grey-8",
                      offset: [10, 10]
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Edit Birthdate ")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(QPopupEdit, {
                    "onUpdate:modelValue": [
                      (val) => updateEmployeeBirthdate(props.row, val),
                      ($event) => props.row.birthdate = $event
                    ],
                    modelValue: props.row.birthdate,
                    buttons: "",
                    title: "Edit Birthdate"
                  }, {
                    default: withCtx((scope) => [
                      createVNode(QInput, {
                        modelValue: scope.value,
                        "onUpdate:modelValue": ($event) => scope.value = $event,
                        dense: "",
                        autofocus: "",
                        type: "date",
                        hint: "mm/dd/yyyy",
                        onKeyup: withKeys(scope.set, ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"])
                    ]),
                    _: 2
                  }, 1032, ["onUpdate:modelValue", "modelValue"])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-actions": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_4$c, [
                    createVNode(QBtn, {
                      round: "",
                      dense: "",
                      size: "md",
                      color: "black",
                      icon: "print",
                      flat: "",
                      onClick: ($event) => handlePrintID(props.row)
                    }, {
                      default: withCtx(() => [
                        createVNode(QTooltip, {
                          class: "bg-black",
                          delay: 200
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Print ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            _: 1
          }, 8, ["rows", "pagination"])
        ]),
        createVNode(QDialog, {
          modelValue: dialog.value,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => dialog.value = $event),
          persistent: ""
        }, {
          default: withCtx(() => [
            createVNode(QCard, {
              class: "bg-gradient",
              style: { "width": "700px", "max-width": "80vw" }
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_5$c, [
                  withDirectives(createVNode(QBtn, {
                    icon: "close",
                    flat: "",
                    dense: "",
                    round: ""
                  }, null, 512), [
                    [ClosePopup]
                  ])
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("iframe", {
                    src: pdfUrl.value,
                    width: "100%",
                    height: "700px"
                  }, null, 8, _hoisted_6$c)
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
var TableSection = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-70a69339"], ["__file", "TableSection.vue"]]);
var RegisterEmployee_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$9 = (n) => (pushScopeId("data-v-14c4e08f"), n = n(), popScopeId(), n);
const _hoisted_1$i = { class: "q-mb-md text-center" };
const _hoisted_2$f = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-center" }, [
  /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Add Employee")
], -1));
const _hoisted_3$d = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F468}\u200D\u{1F4BC}\u{1F469}\u200D\u{1F4BC} Add New Employee", -1));
const _hoisted_4$b = { class: "q-gutter-y-sm" };
const _hoisted_5$b = { class: "q-gutter-y-sm q-mx-auto" };
const _hoisted_6$b = { class: "row q-gutter-x-sm item-start" };
const _hoisted_7$a = { class: "row q-gutter-x-sm" };
const _sfc_main$m = {
  __name: "RegisterEmployee",
  setup(__props) {
    const employeeStore = useEmployeeStore();
    const addEmployeeDialog = ref(false);
    const loading = ref(false);
    const openAddEmployeeDialog = () => {
      addEmployeeDialog.value = true;
    };
    useBranchesStore();
    const employmentStore = useEmploymentTypeStore();
    const positionOptions = [
      "Super Admin",
      "Admin",
      "Supervisor",
      "Scaler",
      "Lamesador",
      "Hornero",
      "Baker",
      "Cake Maker",
      "Cashier",
      "Sales Clerk",
      "Utility",
      "Not Yet Assigned"
    ];
    const genderOptions = ["Male", "Female"];
    const branchOptions = ref([]);
    const employmentTypeOptions = ref([]);
    ref([]);
    ref(branchOptions.value);
    const fetchEmploymentTypeData = async () => {
      await employmentStore.fetchEmploymentType();
      employmentTypeOptions.value = employmentStore.employmentType.map((val) => ({
        label: val.category,
        value: val.id
      }));
    };
    onMounted(fetchEmploymentTypeData);
    const employeeInfo = reactive({
      firstname: "",
      middlename: "",
      lastname: "",
      address: "",
      birthdate: "",
      sex: "",
      phone: "",
      position: "",
      employment_type: ""
    });
    const save = async () => {
      loading.value = true;
      const employeeForm = {
        ...employeeInfo,
        employment_type_id: employeeInfo.employment_type.value
      };
      console.log("employee", employeeForm);
      await employeeStore.createEmployee(employeeForm);
      loading.value = false;
      clearForm();
      addEmployeeDialog.value = false;
    };
    const clearForm = () => {
      employeeInfo.firstname = "";
      employeeInfo.middlename = "";
      employeeInfo.lastname = "";
      employeeInfo.address = "";
      employeeInfo.birthdate = "";
      employeeInfo.sex = "";
      employeeInfo.phone = "";
      employeeInfo.position = "";
      employeeInfo.employment_type = "";
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QCard, {
          class: "q-pa-md user-card",
          onClick: openAddEmployeeDialog
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_1$i, [
              createVNode(QIcon, {
                name: "person_add",
                size: "70px",
                color: "yellow-7"
              })
            ]),
            _hoisted_2$f
          ]),
          _: 1
        }),
        createVNode(QDialog, {
          modelValue: addEmployeeDialog.value,
          "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => addEmployeeDialog.value = $event),
          persistent: "",
          position: "right",
          "backdrop-filter": "blur(4px) saturate(150%)"
        }, {
          default: withCtx(() => [
            createVNode(QCard, { style: { "width": "500px", "max-width": "120vw" } }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "row items-center q-px-md q-py-sm bg-gradient text-white" }, {
                  default: withCtx(() => [
                    _hoisted_3$d,
                    createVNode(QSpace),
                    withDirectives(createVNode(QBtn, {
                      icon: "arrow_forward_ios",
                      flat: "",
                      dense: "",
                      round: ""
                    }, null, 512), [
                      [ClosePopup]
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_4$b, [
                      createBaseVNode("div", _hoisted_5$b, [
                        createVNode(QInput, {
                          class: "text-capitalize",
                          modelValue: employeeInfo.firstname,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => employeeInfo.firstname = $event),
                          outlined: "",
                          dense: "",
                          label: "First Name",
                          rules: [(val) => val && val.length > 0 || "Required"]
                        }, null, 8, ["modelValue", "rules"]),
                        createVNode(QInput, {
                          class: "text-capitalize",
                          modelValue: employeeInfo.middlename,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => employeeInfo.middlename = $event),
                          outlined: "",
                          dense: "",
                          label: "Middle Name",
                          rules: [(val) => val && val.length > 0 || "Required"]
                        }, null, 8, ["modelValue", "rules"]),
                        createVNode(QInput, {
                          class: "text-capitalize",
                          modelValue: employeeInfo.lastname,
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => employeeInfo.lastname = $event),
                          outlined: "",
                          dense: "",
                          label: "Last Name",
                          rules: [(val) => val && val.length > 0 || "Required"]
                        }, null, 8, ["modelValue", "rules"]),
                        createVNode(QInput, {
                          class: "text-capitalize",
                          modelValue: employeeInfo.address,
                          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => employeeInfo.address = $event),
                          outlined: "",
                          dense: "",
                          label: "Address",
                          rules: [(val) => val && val.length > 0 || "Required"]
                        }, null, 8, ["modelValue", "rules"])
                      ]),
                      createBaseVNode("div", _hoisted_6$b, [
                        createBaseVNode("div", null, [
                          createVNode(QInput, {
                            modelValue: employeeInfo.birthdate,
                            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => employeeInfo.birthdate = $event),
                            outlined: "",
                            dense: "",
                            label: "Birthdate",
                            type: "date",
                            style: { "width": "230px" },
                            rules: [(val) => val && val.length > 0 || "Required"]
                          }, null, 8, ["modelValue", "rules"])
                        ]),
                        createBaseVNode("div", null, [
                          createVNode(QInput, {
                            modelValue: employeeInfo.phone,
                            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => employeeInfo.phone = $event),
                            outlined: "",
                            dense: "",
                            label: "Phone Number",
                            mask: "+(63) ### - ### - ####",
                            placeholder: "(+63) ### - ### - ####",
                            rules: [(val) => val && val.length > 0 || "Required"],
                            style: { "width": "230px", "max-width": "500px", "min-width": "100px" }
                          }, null, 8, ["modelValue", "rules"])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_7$a, [
                        createBaseVNode("div", null, [
                          createVNode(QSelect, {
                            modelValue: employeeInfo.sex,
                            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => employeeInfo.sex = $event),
                            dense: "",
                            outlined: "",
                            label: "Sex",
                            options: genderOptions,
                            rules: [(val) => val && val.length > 0 || "Required"],
                            style: { "width": "120px" },
                            behavior: "menu",
                            "hide-dropdown-icon": ""
                          }, null, 8, ["modelValue", "rules"])
                        ]),
                        createBaseVNode("div", null, [
                          createVNode(QSelect, {
                            modelValue: employeeInfo.position,
                            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => employeeInfo.position = $event),
                            outlined: "",
                            dense: "",
                            "hide-dropdown-icon": "",
                            label: "Position",
                            options: positionOptions,
                            rules: [(val) => val && val.length > 0 || "Required"],
                            behavior: "menu",
                            style: { "width": "175px", "max-width": "500px", "min-width": "100px" }
                          }, null, 8, ["modelValue", "rules"])
                        ]),
                        createBaseVNode("div", null, [
                          createVNode(QSelect, {
                            modelValue: employeeInfo.employment_type,
                            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => employeeInfo.employment_type = $event),
                            outlined: "",
                            dense: "",
                            "hide-dropdown-icon": "",
                            label: "Employment Type",
                            options: employmentTypeOptions.value,
                            behavior: "menu",
                            style: { "width": "155px", "max-width": "500px", "min-width": "100px" }
                          }, null, 8, ["modelValue", "options"])
                        ])
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardActions, {
                  class: "row q-px-lg q-py-sm q-pt-none",
                  align: "left"
                }, {
                  default: withCtx(() => [
                    withDirectives(createVNode(QBtn, {
                      class: "glossy",
                      color: "grey-9",
                      label: "Dismiss"
                    }, null, 512), [
                      [ClosePopup]
                    ]),
                    createVNode(QBtn, {
                      class: "glossy",
                      color: "teal",
                      label: "Add",
                      icon: "add",
                      onClick: save,
                      loading: loading.value
                    }, null, 8, ["loading"])
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
var RegisterEmployee = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-14c4e08f"], ["__file", "RegisterEmployee.vue"]]);
const useDesignationStore = defineStore("designations", () => {
  const designation = ref(null);
  const designations = ref([]);
  const createDesignation = async (data) => {
    try {
      const response = await api.post("/api/branchEmployee", data);
      if (response && response.data) {
        designations.value.unshift(response.data);
        Notify.create({
          type: "positive",
          message: "Employee created successfully",
          setTimeout: 1e3,
          position: "top"
        });
      } else {
        console.error("Unexpected API Response:", response);
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      Notify.create({
        type: "negative",
        message: `Failed to create employeesss`,
        setTimeout: 1e3
      });
    }
  };
  return {
    designation,
    designations,
    createDesignation
  };
});
var DesignationEmployee_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$8 = (n) => (pushScopeId("data-v-846fe76c"), n = n(), popScopeId(), n);
const _hoisted_1$h = { class: "q-mb-md text-center" };
const _hoisted_2$e = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-center" }, [
  /* @__PURE__ */ createBaseVNode("div", { class: "text-subtitle1 text-weight-medium" }, " Add Employee Designations ")
], -1));
const _hoisted_3$c = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F468}\u200D\u{1F4BC}\u{1F469}\u200D\u{1F4BC} Add Employee Designation", -1));
const _hoisted_4$a = {
  key: 0,
  class: "custom-list z-top"
};
const _hoisted_5$a = { class: "row q-gutter-md" };
const _hoisted_6$a = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-my-md" }, "Designation", -1));
const _hoisted_7$9 = { class: "row q-gutter-x-md" };
const _sfc_main$l = {
  __name: "DesignationEmployee",
  setup(__props) {
    computed(() => {
      const width = window.innerWidth;
      return width > 1200 ? "500px" : width > 768 ? "80vw" : "95vw";
    });
    const designationDialog = ref(false);
    const designationStore = useDesignationStore();
    const employeeStore = useEmployeeStore();
    const branchesStore = useBranchesStore();
    const branchOptions = ref([]);
    ref([]);
    const searchKeyword = ref("");
    const filterBranchOptions = ref(branchOptions.value);
    const loading = ref(false);
    const searchLoading = ref(false);
    const employees = computed(() => employeeStore.employee);
    const search = async () => {
      if (searchKeyword.value.trim()) {
        searchLoading.value = true;
        await employeeStore.searchCertainEmployee(searchKeyword.value);
        searchLoading.value = false;
      }
    };
    const valididateTime = (val) => {
      const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
      return timeRegex.test(val) || "Invalid time format";
    };
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
    const autoFillEmployee = (employee) => {
      console.log("Selected Employee:", employee);
      addDesignation.employee_id = employee.id;
      addDesignation.employee_name = formatFullname(employee);
      addDesignation.position = employee.position;
      searchKeyword.value = "";
      console.log("Filled Designation Data:", addDesignation);
    };
    const formatFullname = (row) => {
      const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
      const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
      const middlename = row.middlename ? capitalize(row.middlename).charAt(0) + "." : "";
      const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";
      return `${firstname} ${middlename} ${lastname}`;
    };
    const openDesignationDialog = () => {
      designationDialog.value = true;
    };
    const addDesignation = reactive({
      employee_id: "",
      employee_name: "",
      position: "",
      branch_name: "",
      time_shift: ""
    });
    const clearDesignationForm = () => {
      addDesignation.employee_id = "";
      addDesignation.employee_name = "";
      addDesignation.position = "";
      addDesignation.branch_name = "";
      addDesignation.time_shift = "";
    };
    const save = async () => {
      loading.value = true;
      const designation = {
        ...addDesignation,
        branch_id: addDesignation.branch_name.value
      };
      await designationStore.createDesignation(designation);
      console.log("Designation Data to Save:", designation);
      loading.value = false;
      clearDesignationForm();
      designationDialog.value = false;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QCard, {
          class: "q-pa-md user-card",
          onClick: openDesignationDialog,
          align: "center"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_1$h, [
              createVNode(QIcon, {
                name: "add_business",
                size: "60px",
                color: "yellow-7"
              })
            ]),
            _hoisted_2$e
          ]),
          _: 1
        }),
        createVNode(QDialog, {
          modelValue: designationDialog.value,
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => designationDialog.value = $event),
          "backdrop-filter": "blur(4px) saturate(150%)",
          position: "right"
        }, {
          default: withCtx(() => [
            createVNode(QCard, { style: { "width": "500px", "max-width": "100vw" } }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "row items-center q-px-md q-py-sm bg-gradient text-white" }, {
                  default: withCtx(() => [
                    _hoisted_3$c,
                    createVNode(QSpace),
                    withDirectives(createVNode(QBtn, {
                      icon: "arrow_forward_ios",
                      flat: "",
                      dense: "",
                      round: ""
                    }, null, 512), [
                      [ClosePopup]
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", null, [
                      createVNode(QInput, {
                        modelValue: searchKeyword.value,
                        "onUpdate:modelValue": [
                          _cache[0] || (_cache[0] = ($event) => searchKeyword.value = $event),
                          search
                        ],
                        label: "Search Employee",
                        outlined: "",
                        dense: "",
                        debounce: "500",
                        placeholder: "Enter name or position"
                      }, {
                        append: withCtx(() => [
                          !searchLoading.value ? (openBlock(), createBlock(QIcon, {
                            key: 0,
                            name: "search"
                          })) : (openBlock(), createBlock(QSpinner, {
                            key: 1,
                            color: "grey",
                            size: "sm"
                          }))
                        ]),
                        default: withCtx(() => [
                          searchKeyword.value ? (openBlock(), createElementBlock("div", _hoisted_4$a, [
                            createVNode(QCard, null, {
                              default: withCtx(() => [
                                createVNode(QList, { separator: "" }, {
                                  default: withCtx(() => {
                                    var _a;
                                    return [
                                      !((_a = employees.value) == null ? void 0 : _a.length) ? (openBlock(), createBlock(QItem, { key: 0 }, {
                                        default: withCtx(() => [
                                          createTextVNode(" No Employee Record ")
                                        ]),
                                        _: 1
                                      })) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(employees.value, (employee) => {
                                        return openBlock(), createBlock(QItem, {
                                          onClick: ($event) => autoFillEmployee(employee),
                                          key: employee.id,
                                          clickable: ""
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(QItemSection, null, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(formatFullname(employee)), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"]);
                                      }), 128))
                                    ];
                                  }),
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
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_5$a, [
                      createVNode(QInput, {
                        outlined: "",
                        readonly: "",
                        dense: "",
                        label: "Full Name",
                        modelValue: addDesignation.employee_name,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => addDesignation.employee_name = $event),
                        style: { "width": "300px" }
                      }, null, 8, ["modelValue"]),
                      createVNode(QInput, {
                        outlined: "",
                        readonly: "",
                        dense: "",
                        label: "Position",
                        modelValue: addDesignation.position,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => addDesignation.position = $event),
                        style: { "width": "150px" }
                      }, null, 8, ["modelValue"])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    _hoisted_6$a,
                    createBaseVNode("div", _hoisted_7$9, [
                      createBaseVNode("div", null, [
                        createVNode(QSelect, {
                          modelValue: addDesignation.branch_name,
                          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => addDesignation.branch_name = $event),
                          outlined: "",
                          flat: "",
                          dense: "",
                          "use-input": "",
                          clearable: "",
                          "input-debounce": "0",
                          options: filterBranchOptions.value,
                          label: "Branch",
                          onFilter: filteredBranches,
                          "hide-dropdown-icon": "",
                          behavior: "menu",
                          style: { "width": "250px", "max-width": "500px", "min-width": "100px" }
                        }, null, 8, ["modelValue", "options"])
                      ]),
                      createBaseVNode("div", null, [
                        createVNode(QInput, {
                          modelValue: addDesignation.time_shift,
                          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => addDesignation.time_shift = $event),
                          outlined: "",
                          flat: "",
                          dense: "",
                          mask: "##:## AA",
                          label: "Time Schedule",
                          rules: valididateTime,
                          hint: "Format: 01:00 AM/PM",
                          style: { "width": "200px", "max-width": "500px", "min-width": "100px" },
                          "hide-dropdown-icon": ""
                        }, null, 8, ["modelValue"])
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardActions, {
                  class: "row q-px-lg q-py-sm q-pt-none",
                  align: "left"
                }, {
                  default: withCtx(() => [
                    withDirectives(createVNode(QBtn, {
                      class: "glossy",
                      color: "grey-9",
                      label: "Dismiss"
                    }, null, 512), [
                      [ClosePopup]
                    ]),
                    createVNode(QBtn, {
                      class: "glossy",
                      color: "teal",
                      label: "Add",
                      onClick: save,
                      loading: loading.value
                    }, null, 8, ["loading"])
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
var DesignationEmployee = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-846fe76c"], ["__file", "DesignationEmployee.vue"]]);
const _hoisted_1$g = { class: "row justify-between" };
const _hoisted_2$d = { class: "col-12 col-md-9 col-lg-9 q-pa-sm" };
const _hoisted_3$b = { class: "col-12 col-md-3 col-lg-3 q-gutter-y-md q-pa-sm" };
const _sfc_main$k = {
  __name: "EmployeesPage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$g, [
        createBaseVNode("div", _hoisted_2$d, [
          createVNode(TableSection)
        ]),
        createBaseVNode("div", _hoisted_3$b, [
          createVNode(RegisterEmployee),
          createVNode(DesignationEmployee)
        ])
      ]);
    };
  }
};
var EmployeeesPage = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__file", "EmployeesPage.vue"]]);
const useDTRStore = defineStore("dtrs", () => {
  const dtr = ref(null);
  const dtrs = ref([]);
  const dtrCutOffData = ref([]);
  const fetchDTR = async () => {
    try {
      const response = await api.get("/api/dtr");
      if (response && response.data) {
        dtrs.value = response.data;
        return response.data;
      } else {
        console.warn("No data returned from API.");
        dtrs.value = [];
        return [];
      }
    } catch (error) {
      console.error("Error fetching DTR data:", error);
      dtrs.value = [];
      return [];
    }
  };
  const fetchDTRRange = async (data) => {
    const response = await api.post("/api/dtr-data", data);
    dtrCutOffData.value = response.data;
    console.log("Fetched DTR Data:", response.data);
  };
  const searchDTR = async (keyword) => {
    try {
      console.log("Searching for DTR with keyword:", keyword);
      const response = await api.post(`/api/search-drt?keyword=${keyword}`);
      console.log("DTR response:", response);
      dtrs.value = response.data;
    } catch (error) {
      console.error("Error searching DTR:", error);
    }
  };
  const saveOvertime = async (data) => {
    const response = await api.post("/api/saveOvertime", data);
    dtrs.value = response.data;
    fetchDTR();
    Notify.create({
      type: "positive",
      message: "Over Time Save"
    });
  };
  return {
    dtr,
    dtrs,
    dtrCutOffData,
    fetchDTR,
    fetchDTRRange,
    saveOvertime,
    searchDTR
  };
});
var OvertimeButton_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$7 = (n) => (pushScopeId("data-v-cac6b118"), n = n(), popScopeId(), n);
const _hoisted_1$f = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F554} Add Over Time", -1));
const _hoisted_2$c = { class: "q-gutter-md" };
const _hoisted_3$a = { class: "q-mb-lg" };
const _hoisted_4$9 = {
  key: 0,
  class: "custom-list z-top"
};
const _hoisted_5$9 = { class: "q-gutter-md q-my-lg" };
const _hoisted_6$9 = { class: "q-mt-xl q-gutter-y-md" };
const _hoisted_7$8 = { class: "row justify-between" };
const _hoisted_8$8 = { class: "row justify-between" };
const _sfc_main$j = {
  __name: "OvertimeButton",
  setup(__props) {
    const dtrStore = useDTRStore();
    const employeeStore = useEmployeeStore();
    const searchKeyword = ref("");
    const employees = computed(() => employeeStore.employees);
    const search = async () => {
      if (searchKeyword.value.trim()) {
        await employeeStore.searchEmployee(searchKeyword.value);
      }
    };
    const dialog = ref(false);
    const openDialog = () => {
      dialog.value = true;
    };
    const valididateTime = (val) => {
      const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
      return timeRegex.test(val) || "Invalid time format";
    };
    const autoFillEmployee = (employee) => {
      overtimeForm.employee_id = employee.id;
      overtimeForm.employee_name = `${employee.firstname} ${employee.middlename ? employee.middlename.charAt(0) + "." : ""} ${employee.lastname}`;
      overtimeForm.position = employee.position;
      searchKeyword.value = "";
    };
    const overtimeForm = reactive({
      employee_id: "",
      employee_name: "",
      position: "",
      regularDateIN: "",
      dateIn: "",
      dateOut: "",
      timeIn: "",
      timeOut: ""
    });
    const formatFullname = (row) => {
      const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
      const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
      const middlename = row.middlename ? capitalize(row.middlename).charAt(0) + "." : "";
      const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";
      return `${firstname} ${middlename} ${lastname}`;
    };
    const save = async () => {
      const overtime_in = `${overtimeForm.dateIn} ${overtimeForm.timeIn}`;
      const overtime_out = `${overtimeForm.dateOut} ${overtimeForm.timeOut}`;
      const dataToSend = {
        ...overtimeForm,
        overtime_in,
        overtime_out
      };
      await dtrStore.saveOvertime(dataToSend);
      console.log("overtime dATA", dataToSend);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", null, [
          createVNode(QBtn, {
            padding: "sm md",
            label: "Add Over Time",
            icon: "add_circle",
            size: "md",
            class: "gradient-btn text-white",
            onClick: openDialog
          })
        ]),
        createBaseVNode("div", null, [
          createVNode(QDialog, {
            modelValue: dialog.value,
            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => dialog.value = $event),
            "full-height": "",
            persistent: "",
            position: "right",
            "backdrop-filter": "blur(4px) saturate(150%)"
          }, {
            default: withCtx(() => [
              createVNode(QCard, { style: { "width": "400px", "max-width": "80vw" } }, {
                default: withCtx(() => [
                  createVNode(QCardSection, { class: "row items-center q-px-md q-py-sm gradient-btn text-white" }, {
                    default: withCtx(() => [
                      _hoisted_1$f,
                      createVNode(QSpace),
                      withDirectives(createVNode(QBtn, {
                        icon: "arrow_forward_ios",
                        flat: "",
                        dense: "",
                        round: ""
                      }, null, 512), [
                        [ClosePopup]
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_2$c, [
                        createBaseVNode("div", _hoisted_3$a, [
                          createVNode(QInput, {
                            modelValue: searchKeyword.value,
                            "onUpdate:modelValue": [
                              _cache[0] || (_cache[0] = ($event) => searchKeyword.value = $event),
                              search
                            ],
                            label: "Search Employee",
                            outlined: "",
                            dense: "",
                            debounce: "500",
                            placeholder: "Enter name"
                          }, {
                            append: withCtx(() => [
                              createVNode(QIcon, { name: "search" })
                            ]),
                            default: withCtx(() => [
                              searchKeyword.value ? (openBlock(), createElementBlock("div", _hoisted_4$9, [
                                createVNode(QCard, null, {
                                  default: withCtx(() => [
                                    createVNode(QList, { separator: "" }, {
                                      default: withCtx(() => {
                                        var _a;
                                        return [
                                          !((_a = employees.value) == null ? void 0 : _a.length) ? (openBlock(), createBlock(QItem, { key: 0 }, {
                                            default: withCtx(() => [
                                              createTextVNode(" No Employee Record ")
                                            ]),
                                            _: 1
                                          })) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(employees.value, (employee) => {
                                            return openBlock(), createBlock(QItem, {
                                              onClick: ($event) => autoFillEmployee(employee),
                                              key: employee.id,
                                              clickable: ""
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(QItemSection, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(formatFullname(employee)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1032, ["onClick"]);
                                          }), 128))
                                        ];
                                      }),
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
                          createBaseVNode("div", _hoisted_5$9, [
                            createVNode(QInput, {
                              modelValue: overtimeForm.employee_name,
                              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => overtimeForm.employee_name = $event),
                              outlined: "",
                              dense: "",
                              readonly: "",
                              label: "Name"
                            }, null, 8, ["modelValue"]),
                            createVNode(QInput, {
                              modelValue: overtimeForm.position,
                              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => overtimeForm.position = $event),
                              outlined: "",
                              dense: "",
                              readonly: "",
                              label: "Position"
                            }, null, 8, ["modelValue"])
                          ])
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createVNode(QInput, {
                        modelValue: overtimeForm.regularDateIN,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => overtimeForm.regularDateIN = $event),
                        outlined: "",
                        dense: "",
                        label: "Regular Date IN",
                        type: "date"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_6$9, [
                        createBaseVNode("div", _hoisted_7$8, [
                          createBaseVNode("div", null, [
                            createVNode(QInput, {
                              modelValue: overtimeForm.dateIn,
                              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => overtimeForm.dateIn = $event),
                              outlined: "",
                              dense: "",
                              label: "Date IN",
                              type: "date",
                              style: { "width": "170px" }
                            }, null, 8, ["modelValue"])
                          ]),
                          createBaseVNode("div", null, [
                            createVNode(QInput, {
                              modelValue: overtimeForm.timeIn,
                              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => overtimeForm.timeIn = $event),
                              label: "Time IN",
                              dense: "",
                              mask: "##:## AA",
                              outlined: "",
                              rules: valididateTime,
                              hint: "Format: hh:mm AM/PM"
                            }, null, 8, ["modelValue"])
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_8$8, [
                          createBaseVNode("div", null, [
                            createVNode(QInput, {
                              modelValue: overtimeForm.dateOut,
                              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => overtimeForm.dateOut = $event),
                              outlined: "",
                              dense: "",
                              label: "Date OUT",
                              type: "date",
                              style: { "width": "170px" }
                            }, null, 8, ["modelValue"])
                          ]),
                          createBaseVNode("div", null, [
                            createVNode(QInput, {
                              modelValue: overtimeForm.timeOut,
                              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => overtimeForm.timeOut = $event),
                              label: "Time OUT",
                              dense: "",
                              mask: "##:## AA",
                              outlined: "",
                              rules: valididateTime,
                              hint: "Format: hh:mm AM/PM"
                            }, null, 8, ["modelValue"])
                          ])
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createVNode(QCardActions, { class: "q-mt-md" }, {
                        default: withCtx(() => [
                          createVNode(QBtn, {
                            size: "md",
                            padding: "xs md",
                            label: "save",
                            "icon-right": "send",
                            class: "gradient-btn text-white",
                            onClick: save
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
          }, 8, ["modelValue"])
        ])
      ], 64);
    };
  }
};
var OvertimeButton = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-cac6b118"], ["__file", "OvertimeButton.vue"]]);
const _sfc_main$i = {
  __name: "SearchDTR",
  setup(__props) {
    const dtrStore = useDTRStore();
    const searchKeyword = ref("");
    const loading = ref(false);
    const search = async () => {
      loading.value = true;
      await dtrStore.searchDTR(searchKeyword.value);
      loading.value = false;
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QInput, {
        modelValue: searchKeyword.value,
        "onUpdate:modelValue": [
          _cache[0] || (_cache[0] = ($event) => searchKeyword.value = $event),
          search
        ],
        outlined: "",
        dense: "",
        flat: "",
        label: "Search",
        debounce: "1000",
        style: { "width": "300px" }
      }, {
        append: withCtx(() => [
          createBaseVNode("div", null, [
            !loading.value ? (openBlock(), createBlock(QIcon, {
              key: 0,
              name: "search"
            })) : (openBlock(), createBlock(QSpinner, {
              key: 1,
              color: "grey",
              size: "sm"
            }))
          ])
        ]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
};
var SearchDTR = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__file", "SearchDTR.vue"]]);
var EditDTR_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$6 = (n) => (pushScopeId("data-v-b88dd3ca"), n = n(), popScopeId(), n);
const _hoisted_1$e = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F554} Edit Time", -1));
const _hoisted_2$b = { class: "row justify-between" };
const _hoisted_3$9 = { class: "q-mt-lg q-gutter-md" };
const _hoisted_4$8 = { class: "row justify-between" };
const _hoisted_5$8 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createBaseVNode("div", null, "Time IN", -1));
const _hoisted_6$8 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createBaseVNode("div", null, "Time OUT", -1));
const _hoisted_7$7 = { class: "row justify-between" };
const _hoisted_8$7 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createBaseVNode("div", null, "Lunch Break Start", -1));
const _hoisted_9$7 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createBaseVNode("div", null, "Lunch Break End", -1));
const _hoisted_10$5 = { class: "row justify-between" };
const _hoisted_11$4 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createBaseVNode("div", null, "Break Start", -1));
const _hoisted_12$3 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createBaseVNode("div", null, "Break End", -1));
const _hoisted_13$3 = { class: "row justify-between" };
const _hoisted_14$3 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createBaseVNode("div", null, "Over Time Start", -1));
const _hoisted_15$3 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createBaseVNode("div", null, "Over Time End", -1));
const _sfc_main$h = {
  __name: "EditDTR",
  props: ["edit"],
  setup(__props) {
    const props = __props;
    const dtrData = props.edit.row;
    const dialog = ref();
    const formatFullname = (row) => {
      const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
      const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
      const middlename = row.middlename ? capitalize(row.middlename).charAt(0) + "." : "";
      const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";
      return `${firstname} ${middlename} ${lastname}`.trim();
    };
    const editDTRForm = reactive({
      time_in: "",
      time_out: "",
      lunch_break_start: "",
      lunch_break_end: "",
      break_start: "",
      break_end: "",
      over_start: "",
      over_end: ""
    });
    const openDialog = () => {
      Object.assign(editDTRForm, dtrData);
      dialog.value = true;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          color: "positive",
          icon: "edit",
          size: "sm",
          flat: "",
          round: "",
          dense: "",
          onClick: openDialog
        }, {
          default: withCtx(() => [
            createVNode(QTooltip, {
              class: "bg-positive",
              delay: 200
            }, {
              default: withCtx(() => [
                createTextVNode("Edit")
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(QDialog, {
          modelValue: dialog.value,
          "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => dialog.value = $event)
        }, {
          default: withCtx(() => [
            createVNode(QCard, { style: { "width": "500px", "max-width": "80vw" } }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "row items-center q-px-md q-py-sm gradient-btn text-white" }, {
                  default: withCtx(() => [
                    _hoisted_1$e,
                    createVNode(QSpace),
                    withDirectives(createVNode(QBtn, {
                      icon: "close",
                      flat: "",
                      dense: "",
                      round: ""
                    }, null, 512), [
                      [ClosePopup]
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2$b, [
                      createBaseVNode("div", null, "Name: " + toDisplayString(formatFullname(unref(dtrData).employee)), 1),
                      createBaseVNode("div", null, " Position: " + toDisplayString(unref(dtrData).employee.position), 1)
                    ]),
                    createBaseVNode("div", _hoisted_3$9, [
                      createBaseVNode("div", _hoisted_4$8, [
                        createBaseVNode("div", null, [
                          _hoisted_5$8,
                          createVNode(QInput, {
                            outlined: "",
                            dense: "",
                            modelValue: editDTRForm.time_in,
                            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => editDTRForm.time_in = $event)
                          }, null, 8, ["modelValue"])
                        ]),
                        createBaseVNode("div", null, [
                          _hoisted_6$8,
                          createVNode(QInput, {
                            outlined: "",
                            dense: "",
                            modelValue: editDTRForm.time_out,
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => editDTRForm.time_out = $event)
                          }, null, 8, ["modelValue"])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_7$7, [
                        createBaseVNode("div", null, [
                          _hoisted_8$7,
                          createVNode(QInput, {
                            outlined: "",
                            dense: "",
                            modelValue: editDTRForm.lunch_break_start,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => editDTRForm.lunch_break_start = $event)
                          }, null, 8, ["modelValue"])
                        ]),
                        createBaseVNode("div", null, [
                          _hoisted_9$7,
                          createVNode(QInput, {
                            outlined: "",
                            dense: "",
                            modelValue: editDTRForm.lunch_break_end,
                            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => editDTRForm.lunch_break_end = $event)
                          }, null, 8, ["modelValue"])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_10$5, [
                        createBaseVNode("div", null, [
                          _hoisted_11$4,
                          createVNode(QInput, {
                            outlined: "",
                            dense: "",
                            modelValue: editDTRForm.break_start,
                            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => editDTRForm.break_start = $event)
                          }, null, 8, ["modelValue"])
                        ]),
                        createBaseVNode("div", null, [
                          _hoisted_12$3,
                          createVNode(QInput, {
                            outlined: "",
                            dense: "",
                            modelValue: editDTRForm.break_end,
                            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => editDTRForm.break_end = $event)
                          }, null, 8, ["modelValue"])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_13$3, [
                        createBaseVNode("div", null, [
                          _hoisted_14$3,
                          createVNode(QInput, {
                            outlined: "",
                            dense: "",
                            modelValue: editDTRForm.over_start,
                            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => editDTRForm.over_start = $event)
                          }, null, 8, ["modelValue"])
                        ]),
                        createBaseVNode("div", null, [
                          _hoisted_15$3,
                          createVNode(QInput, {
                            outlined: "",
                            dense: "",
                            modelValue: editDTRForm.over_end,
                            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => editDTRForm.over_end = $event)
                          }, null, 8, ["modelValue"])
                        ])
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardActions, {
                  class: "row q-ma-md",
                  align: "right"
                }, {
                  default: withCtx(() => [
                    withDirectives(createVNode(QBtn, {
                      class: "btn-cancel glossy",
                      color: "negative",
                      label: "Cancel"
                    }, null, 512), [
                      [ClosePopup]
                    ]),
                    createVNode(QBtn, {
                      class: "btn-create glossy",
                      color: "positive",
                      label: "Save"
                    })
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
var EditDTR = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-b88dd3ca"], ["__file", "EditDTR.vue"]]);
var AttendanceTable_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$d = {
  class: "row justify-between q-mb-md",
  align: "right"
};
const _hoisted_2$a = { key: 1 };
const _hoisted_3$8 = { key: 1 };
const _hoisted_4$7 = { key: 1 };
const _hoisted_5$7 = { key: 1 };
const _hoisted_6$7 = { key: 1 };
const _hoisted_7$6 = { key: 1 };
const _hoisted_8$6 = { key: 1 };
const _hoisted_9$6 = { key: 1 };
const _hoisted_10$4 = { key: 1 };
const _hoisted_11$3 = { class: "row justify-center q-gutter-x-md" };
const _sfc_main$g = {
  __name: "AttendanceTable",
  setup(__props) {
    const pagination = ref({
      rowsPerPage: 0
    });
    const dtrStore = useDTRStore();
    const dtrRows = computed(() => dtrStore.dtrs);
    onMounted(async () => {
      await reloadTableData();
    });
    const reloadTableData = async () => {
      try {
        dtrRows.value = await dtrStore.fetchDTR();
        console.log("dtrsss", dtrRows.value);
      } catch (error) {
        console.log("Error fetching DTR data:", error);
      }
    };
    const formatFullname = (row) => {
      const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
      const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
      const middlename = row.middlename ? capitalize(row.middlename).charAt(0) + "." : "";
      const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";
      return `${firstname} ${middlename} ${lastname}`.trim();
    };
    const formatDate = (dateTime) => {
      if (!dateTime)
        return " - - ";
      const date = new Date(dateTime);
      if (isNaN(date.getTime()))
        return " - - ";
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    };
    const formatTime = (dateTime) => {
      if (!dateTime)
        return " - - ";
      const date = new Date(dateTime);
      if (isNaN(date.getTime()))
        return " - - ";
      let hours = date.getHours();
      const minutes2 = date.getMinutes().toString().padStart(2, "0");
      const amPm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${hours}:${minutes2} ${amPm}`;
    };
    const calculateTotalWorkingHours = (timeIn, timeOut) => {
      if (!timeIn || !timeOut)
        return { hours: 0, minutes: 0 };
      const start = new Date(timeIn);
      const end = new Date(timeOut);
      if (isNaN(start.getTime()) || isNaN(end.getTime()))
        return { hours: 0, minutes: 0 };
      const diffInMillis = end - start;
      const totalMinutes = Math.floor(diffInMillis / (1e3 * 60));
      const hours = Math.floor(totalMinutes / 60);
      const minutes2 = totalMinutes % 60;
      return { hours, minutes: minutes2 };
    };
    const calculateTotalOvertimeHours = (timeIn, timeOut) => {
      console.log("Input timeIn:", timeIn);
      console.log("Input timeOut:", timeOut);
      if (!timeIn || !timeOut)
        return " - - - ";
      const start = new Date(timeIn);
      const end = new Date(timeOut);
      console.log("Parsed start date:", start);
      console.log("Parsed end date:", end);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.log("Invalid date format detected");
        return " - - - ";
      }
      const diffInMillis = end - start;
      const totalMinutes = Math.floor(diffInMillis / (1e3 * 60));
      const hours = Math.floor(totalMinutes / 60);
      const minutes2 = totalMinutes % 60;
      console.log("Calculated hours:", hours);
      console.log("Calculated minutes:", minutes2);
      return `${hours}h ${minutes2}m`;
    };
    const getLunchBreakColor = (timeIn, timeOut) => {
      const { hours, minutes: minutes2 } = calculateTotalWorkingHours(timeIn, timeOut);
      if (hours > 1 || minutes2 > 0) {
        return "green-7";
      } else {
        return "blue-grey-9";
      }
    };
    const getLunchBreakIcon = (timeIn, timeOut) => {
      const { hours, minutes: minutes2 } = calculateTotalWorkingHours(timeIn, timeOut);
      if (hours > 1 || minutes2 > 0) {
        return "check_circle";
      } else {
        return "access_time";
      }
    };
    const getBreakColor = (timeIn, timeOut) => {
      const { hours, minutes: minutes2 } = calculateTotalWorkingHours(timeIn, timeOut);
      if (hours > 0 || minutes2 > 15) {
        return "pink-13";
      } else {
        return "green-7";
      }
    };
    const getBreakHoursIcon = (timeIn, timeOut) => {
      const { hours, minutes: minutes2 } = calculateTotalWorkingHours(timeIn, timeOut);
      if (hours > 0 || minutes2 > 15) {
        return "access_time";
      } else {
        return "check_circle";
      }
    };
    const getWorkHoursColor = (timeIn, timeOut) => {
      const { hours } = calculateTotalWorkingHours(timeIn, timeOut);
      if (hours > 9 || hours === 9 && minutes > 0) {
        return "blue-grey-9";
      } else if (hours >= 8) {
        return "green-7";
      } else {
        return "pink-13";
      }
    };
    const getWorkHoursIcon = (timeIn, timeOut) => {
      const hours = calculateTotalWorkingHours(timeIn, timeOut);
      if (hours >= 9 || hours === 9 && minutes > 0) {
        return "alarm_on";
      } else if (hours >= 8) {
        return "check_circle";
      } else {
        return "access_time";
      }
    };
    const dtrColumns = [
      {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: (row) => formatFullname(row.employee)
      },
      {
        name: "date_in",
        required: true,
        label: "Date In",
        align: "center",
        field: "time_in",
        format: (val) => formatDate(val)
      },
      {
        name: "date_out",
        required: true,
        label: "Date Out",
        align: "center",
        field: "time_out",
        format: (val) => formatDate(val)
      },
      {
        name: "time_in",
        required: true,
        label: "Time In",
        align: "center",
        field: "time_in"
      },
      {
        name: "time_out",
        required: true,
        label: "Time Out",
        align: "center",
        field: "time_out",
        format: (val) => formatTime(val)
      },
      {
        name: "lunch_break_start",
        required: true,
        label: "Lunch Break Start",
        align: "center",
        field: "lunch_break_start",
        format: (val) => formatTime(val)
      },
      {
        name: "lunch_break_end",
        required: true,
        label: "Lunch Break End",
        align: "center",
        field: "lunch_break_end",
        format: (val) => formatTime(val)
      },
      {
        name: "break_start",
        required: true,
        label: "Break Start",
        align: "center",
        field: "break_start",
        format: (val) => formatTime(val)
      },
      {
        name: "break_end",
        required: true,
        label: "Break End",
        align: "center",
        field: "break_end",
        format: (val) => formatTime(val)
      },
      {
        name: "break",
        required: true,
        label: "Total Break",
        align: "center",
        field: (row) => {
          const { hours, minutes: minutes2 } = calculateTotalWorkingHours(
            row.break_start,
            row.break_end
          );
          return `${hours}h ${minutes2}m`;
        }
      },
      {
        name: "lunch_break",
        required: true,
        label: "Total Lunch break",
        align: "center",
        field: (row) => {
          const { hours, minutes: minutes2 } = calculateTotalWorkingHours(
            row.lunch_break_start,
            row.lunch_break_end
          );
          return `${hours}h ${minutes2}m`;
        }
      },
      {
        name: "total_working_hours",
        required: true,
        label: "Work Hours",
        align: "center",
        field: (row) => {
          const { hours, minutes: minutes2 } = calculateTotalWorkingHours(
            row.time_in,
            row.time_out
          );
          return `${hours}h ${minutes2}m`;
        }
      },
      {
        name: "overtime_start",
        required: true,
        label: "Overtime Start",
        align: "center",
        field: "overtime_start",
        format: (val) => formatTime(val)
      },
      {
        name: "overtime_end",
        required: true,
        label: "Overtime End",
        align: "center",
        field: "overtime_end",
        format: (val) => formatTime(val)
      },
      {
        name: "total_overtime",
        required: true,
        label: "OT Total Hours",
        align: "center",
        field: (row) => {
          const result = calculateTotalOvertimeHours(
            row.overtime_start,
            row.overtime_end
          );
          if (typeof result === "string") {
            return result;
          }
          const { hours, minutes: minutes2 } = result;
          return `${hours}h ${minutes2}m`;
        }
      },
      {
        name: "action",
        label: "Action",
        align: "center"
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$d, [
          createBaseVNode("div", null, [
            createVNode(OvertimeButton)
          ]),
          createVNode(SearchDTR)
        ]),
        createBaseVNode("div", null, [
          createVNode(QTable, {
            rows: dtrRows.value,
            columns: dtrColumns,
            "row-key": "time_in",
            class: "sticky-header",
            "hide-bottom": "",
            pagination: pagination.value,
            "onUpdate:pagination": _cache[0] || (_cache[0] = ($event) => pagination.value = $event),
            "rows-per-page-options": [0]
          }, {
            "body-cell-time_in": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  props.row.time_in ? (openBlock(), createBlock(QBadge, {
                    key: 0,
                    outline: "",
                    color: "positive"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(formatTime(props.row.time_in)), 1)
                    ]),
                    _: 2
                  }, 1024)) : (openBlock(), createElementBlock("span", _hoisted_2$a, " - - - "))
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-time_out": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  props.row.time_out ? (openBlock(), createBlock(QBadge, {
                    key: 0,
                    outline: "",
                    color: "purple-12"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(formatTime(props.row.time_out)), 1)
                    ]),
                    _: 2
                  }, 1024)) : (openBlock(), createElementBlock("span", _hoisted_3$8, " - - - "))
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-lunch_break_start": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  props.row.lunch_break_start ? (openBlock(), createBlock(QBadge, {
                    key: 0,
                    outline: "",
                    color: "amber-7"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(formatTime(props.row.lunch_break_start)), 1)
                    ]),
                    _: 2
                  }, 1024)) : (openBlock(), createElementBlock("span", _hoisted_4$7, " - - - "))
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-lunch_break_end": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  props.row.lunch_break_end ? (openBlock(), createBlock(QBadge, {
                    key: 0,
                    outline: "",
                    color: "amber-4"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(formatTime(props.row.lunch_break_end)), 1)
                    ]),
                    _: 2
                  }, 1024)) : (openBlock(), createElementBlock("span", _hoisted_5$7, " - - - "))
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-break_start": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  props.row.break_start ? (openBlock(), createBlock(QBadge, {
                    key: 0,
                    outline: "",
                    color: "blue-7"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(formatTime(props.row.break_start)), 1)
                    ]),
                    _: 2
                  }, 1024)) : (openBlock(), createElementBlock("span", _hoisted_6$7, " - - - "))
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-break_end": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  props.row.break_end ? (openBlock(), createBlock(QBadge, {
                    key: 0,
                    outline: "",
                    color: "blue-4"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(formatTime(props.row.break_end)), 1)
                    ]),
                    _: 2
                  }, 1024)) : (openBlock(), createElementBlock("span", _hoisted_7$6, " - - - "))
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-break": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  props.row.break_start && props.row.break_end ? (openBlock(), createBlock(QBadge, {
                    key: 0,
                    outline: "",
                    color: getBreakColor(props.row.break_start, props.row.break_end),
                    class: "q-ma-xs",
                    size: "md"
                  }, {
                    default: withCtx(() => [
                      createVNode(QIcon, {
                        name: getBreakHoursIcon(props.row.break_start, props.row.break_end),
                        size: "xs",
                        class: "q-mr-xs"
                      }, null, 8, ["name"]),
                      createTextVNode(" " + toDisplayString(`${calculateTotalWorkingHours(
                        props.row.break_start,
                        props.row.break_end
                      ).hours} Hrs : ${calculateTotalWorkingHours(
                        props.row.break_start,
                        props.row.break_end
                      ).minutes} Min`), 1)
                    ]),
                    _: 2
                  }, 1032, ["color"])) : (openBlock(), createElementBlock("span", _hoisted_8$6, " - - - "))
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-lunch_break": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  props.row.lunch_break_start && props.row.lunch_break_end ? (openBlock(), createBlock(QBadge, {
                    key: 0,
                    outline: "",
                    color: getLunchBreakColor(
                      props.row.lunch_break_start,
                      props.row.lunch_break_end
                    ),
                    class: "q-ma-xs",
                    size: "md"
                  }, {
                    default: withCtx(() => [
                      createVNode(QIcon, {
                        name: getLunchBreakIcon(
                          props.row.lunch_break_start,
                          props.row.lunch_break_end
                        ),
                        size: "xs",
                        class: "q-mr-xs"
                      }, null, 8, ["name"]),
                      createTextVNode(" " + toDisplayString(`${calculateTotalWorkingHours(
                        props.row.lunch_break_start,
                        props.row.lunch_break_end
                      ).hours} Hrs : ${calculateTotalWorkingHours(
                        props.row.lunch_break_start,
                        props.row.lunch_break_end
                      ).minutes} Min`), 1)
                    ]),
                    _: 2
                  }, 1032, ["color"])) : (openBlock(), createElementBlock("span", _hoisted_9$6, " - - - "))
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-total_working_hours": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  props.row.time_in && props.row.time_out ? (openBlock(), createBlock(QBadge, {
                    key: 0,
                    outline: "",
                    color: getWorkHoursColor(props.row.time_in, props.row.time_out),
                    class: "q-ma-xs",
                    size: "md"
                  }, {
                    default: withCtx(() => [
                      createVNode(QIcon, {
                        name: getWorkHoursIcon(props.row.time_in, props.row.time_out),
                        size: "xs",
                        class: "q-mr-xs"
                      }, null, 8, ["name"]),
                      createTextVNode(" " + toDisplayString(`${calculateTotalWorkingHours(
                        props.row.time_in,
                        props.row.time_out
                      ).hours} Hrs : ${calculateTotalWorkingHours(
                        props.row.time_in,
                        props.row.time_out
                      ).minutes} Min`), 1)
                    ]),
                    _: 2
                  }, 1032, ["color"])) : (openBlock(), createElementBlock("span", _hoisted_10$4, " - - - "))
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-action": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_11$3, [
                    createVNode(EditDTR, { edit: props }, null, 8, ["edit"])
                  ])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            _: 1
          }, 8, ["rows", "pagination"])
        ])
      ], 64);
    };
  }
};
var AttendancceTable = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-1982f392"], ["__file", "AttendanceTable.vue"]]);
var EmployeeAttendanceDialog_vue_vue_type_style_index_0_scoped_true_lang = "";
var AttendanceSummary_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$5 = (n) => (pushScopeId("data-v-2829b8dd"), n = n(), popScopeId(), n);
const _hoisted_1$c = {
  class: "q-mb-md",
  align: "right"
};
const _hoisted_2$9 = {
  key: 0,
  class: "custom-list z-top"
};
const _hoisted_3$7 = { class: "row" };
const _hoisted_4$6 = {
  class: "col-3 q-ma-lg",
  align: "center"
};
const _hoisted_5$6 = { class: "q-pa-lg" };
const _hoisted_6$6 = ["src", "alt"];
const _hoisted_7$5 = {
  class: "row q-mt-lg",
  align: "left"
};
const _hoisted_8$5 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createBaseVNode("div", { class: "col-3" }, [
  /* @__PURE__ */ createBaseVNode("div", null, "Name:"),
  /* @__PURE__ */ createBaseVNode("div", null, "Position:"),
  /* @__PURE__ */ createBaseVNode("div", null, "Age:")
], -1));
const _hoisted_9$5 = { class: "col-9" };
const _hoisted_10$3 = { class: "col-8 q-ml-lg" };
const _hoisted_11$2 = { class: "row justify-between" };
const _hoisted_12$2 = { class: "row justify-between q-mt-md" };
const _hoisted_13$2 = { class: "row" };
const _hoisted_14$2 = { class: "q-my-md" };
const _hoisted_15$2 = { class: "row justify-between text-h6 text-white" };
const _hoisted_16$2 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createBaseVNode("div", null, "\u{1F5D3}\uFE0F Daily Time Record", -1));
const _hoisted_17$1 = ["src"];
const _sfc_main$f = {
  __name: "AttendanceSummary",
  setup(__props) {
    pdfmake.exports.vfs = vfs_fontes;
    const employeeStore = useEmployeeStore();
    const employees = computed(() => employeeStore.employees);
    const dtrStore = useDTRStore();
    const imageUrl = ref("https://cdn.quasar.dev/img/boy-avatar.png");
    const searchKeyword = ref("");
    ref(null);
    const selectedEmployeeId = ref(null);
    const startDate = ref("");
    const endDate = ref("");
    const employeeName = ref("");
    const employeePosition = ref("");
    const employeeAge = ref("");
    const dialog = ref(false);
    const pdfUrl = ref("");
    ref(false);
    const handleImageError = () => {
      imageUrl.value = "https://cdn.quasar.dev/img/boy-avatar.png";
    };
    const pagination = ref({
      rowsPerPage: 0
    });
    const search = async () => {
      if (searchKeyword.value.trim()) {
        await employeeStore.searchEmployee(searchKeyword.value);
      }
    };
    const selectEmployee = async (employee) => {
      searchKeyword.value = "";
      employeeName.value = formatFullname(employee);
      employeePosition.value = employee.position || "Unknown";
      employeeAge.value = calculateAge(employee.birthdate);
      selectedEmployeeId.value = employee.id;
      const formattedDate = quasarDate.formatDate(new Date(), "YYYY-MM-DD");
      if (formattedDate) {
        const { startDate: newStartDate, endDate: newEndDate } = getDTRPeriod(formattedDate);
        startDate.value = newStartDate;
        endDate.value = newEndDate;
        const requestData = {
          employee_id: selectedEmployeeId.value,
          start_date: startDate.value,
          end_date: endDate.value
        };
        await dtrStore.fetchDTRRange(requestData);
        console.log("Request Data:", requestData);
      } else {
        console.error("Failed to format the current date");
      }
    };
    const calculateAge = (birthdate) => {
      if (!birthdate)
        return "N/A";
      const birthDateObj = new Date(birthdate);
      const today = new Date();
      let age = today.getFullYear() - birthDateObj.getFullYear();
      const monthDiff = today.getMonth() - birthDateObj.getMonth();
      if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDateObj.getDate()) {
        age--;
      }
      return age;
    };
    const formatFullname = (row) => {
      const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
      const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
      const middlename = row.middlename ? capitalize(row.middlename).charAt(0) + "." : "";
      const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";
      return `${firstname} ${middlename} ${lastname}`;
    };
    const initializeDateRange = () => {
      const formattedDate = quasarDate.formatDate(new Date(), "YYYY-MM-DD");
      const { startDate: newStartDate, endDate: newEndDate } = getDTRPeriod(formattedDate);
      startDate.value = newStartDate;
      endDate.value = newEndDate;
    };
    const getDTRPeriod = (formattedDate) => {
      if (!formattedDate) {
        console.error("Invalid formatted date:", formattedDate);
        return { startDate: null, endDate: null };
      }
      const day = parseInt(formattedDate.slice(8, 10), 10);
      let startDate2, endDate2;
      if (day >= 11 && day <= 25) {
        startDate2 = `${formattedDate.slice(0, 7)}-11`;
        endDate2 = `${formattedDate.slice(0, 7)}-25`;
      } else {
        const month = day >= 26 ? formattedDate.slice(5, 7) : (parseInt(formattedDate.slice(5, 7), 10) - 1).toString().padStart(2, "0");
        const nextMonth = day >= 26 ? (parseInt(formattedDate.slice(5, 7), 10) + 1).toString().padStart(2, "0") : formattedDate.slice(5, 7);
        startDate2 = `${formattedDate.slice(0, 4)}-${month}-26`;
        endDate2 = `${formattedDate.slice(0, 4)}-${nextMonth}-10`;
      }
      console.log("Calculated Start Date:", startDate2);
      console.log("Calculated End Date:", endDate2);
      return { startDate: startDate2, endDate: endDate2 };
    };
    const formatDateToCustomString = (dateString) => {
      const date = new Date(dateString);
      if (isNaN(date.getTime()))
        return " - - - ";
      const options = { month: "short", day: "2-digit", year: "numeric" };
      const formattedDate = date.toLocaleDateString("en-US", options).replace(",", "");
      const [month, day, year] = formattedDate.split(" ");
      return `${month}. ${day}, ${year}`;
    };
    const formattedStart = formatDateToCustomString(startDate.value);
    console.log("formattedStart", formattedStart);
    formatDateToCustomString(new Date(startDate));
    formatDateToCustomString(new Date(endDate));
    const dtrRow = computed(() => {
      const data = dtrStore.dtrCutOffData;
      const formatTimeDifference = (startTime, endTime) => {
        if (!startTime || !endTime)
          return " - - - ";
        const start = new Date(startTime);
        const end = new Date(endTime);
        if (isNaN(start.getTime()) || isNaN(end.getTime()))
          return " - - - ";
        const diffInMillis = end - start;
        if (diffInMillis <= 0)
          return " - - - ";
        const totalMinutes = Math.floor(diffInMillis / (1e3 * 60));
        const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
        const minutes2 = String(totalMinutes % 60).padStart(2, "0");
        return `${hours} h : ${minutes2} m`;
      };
      return data.map((entry, index) => {
        const timeIn = entry.time_in;
        const timeOut = entry.time_out;
        const overtimeStart = entry.overtime_start;
        const overtimeEnd = entry.overtime_end;
        const totalWorkingHours = formatTimeDifference(timeIn, timeOut);
        const totalOvertime = formatTimeDifference(overtimeStart, overtimeEnd);
        let undertime = " - - - ";
        const STANDARD_WORK_HOURS = 8;
        if (totalWorkingHours !== " - - - ") {
          const [hoursStr, minutesStr] = totalWorkingHours.split(" h : ");
          const totalHours = parseInt(hoursStr, 10) + parseInt(minutesStr, 10) / 60;
          if (totalHours < STANDARD_WORK_HOURS) {
            const diffInMinutes = (STANDARD_WORK_HOURS - totalHours) * 60;
            const undertimeHours = String(Math.floor(diffInMinutes / 60)).padStart(
              2,
              "0"
            );
            const undertimeMinutes = String(
              Math.floor(diffInMinutes % 60)
            ).padStart(2, "0");
            undertime = `${undertimeHours} h : ${undertimeMinutes} m`;
          }
        }
        return {
          entry: index + 1,
          time_in: entry.time_in,
          time_out: entry.time_out,
          total_working_hours: totalWorkingHours,
          undertime,
          overtime: totalOvertime
        };
      });
    });
    const fetchDTRData = async () => {
      if (selectedEmployeeId.value && startDate.value && endDate.value) {
        await dtrStore.fetchDTRRange({
          employee_id: selectedEmployeeId.value,
          start_date: startDate.value,
          end_date: endDate.value
        });
      }
    };
    console.log("DTR ROW", dtrRow.value);
    const onPrev = () => {
      const prevDate = new Date(startDate.value);
      prevDate.setDate(prevDate.getDate() - 15);
      const { startDate: newStartDate, endDate: newEndDate } = getDTRPeriod(
        quasarDate.formatDate(prevDate, "YYYY-MM-DD")
      );
      startDate.value = newStartDate;
      endDate.value = newEndDate;
      fetchDTRData();
    };
    const onNext = () => {
      const nextDate = new Date(endDate.value);
      nextDate.setDate(nextDate.getDate() + 1);
      const { startDate: newStartDate, endDate: newEndDate } = getDTRPeriod(
        quasarDate.formatDate(nextDate, "YYYY-MM-DD")
      );
      startDate.value = newStartDate;
      endDate.value = newEndDate;
      fetchDTRData();
    };
    const onCurrent = () => {
      initializeDateRange();
      fetchDTRData();
    };
    initializeDateRange();
    const openDialog = (dtrRow2) => {
      const docDefinition = generateDocDefinition();
      pdfmake.exports.createPdf(docDefinition).getDataUrl((dataUrl) => {
        pdfUrl.value = dataUrl;
        dialog.value = true;
      });
    };
    const generateDocDefinition = () => {
      return {
        pageMargins: [40, 40, -10, 40],
        content: [
          { text: "Daily Time Record", style: "header" },
          {
            text: [
              { text: "From: ", bold: false, fontSize: 8 },
              {
                text: ` ${formatDateToCustomString(startDate.value)}`,
                bold: true,
                decoration: "underline",
                fontSize: 10
              }
            ],
            margin: [0, 0, 0, 3]
          },
          {
            text: [
              { text: "To: ", bold: false, fontSize: 8 },
              {
                text: `     ${formatDateToCustomString(endDate.value)}`,
                bold: true,
                decoration: "underline",
                fontSize: 10
              }
            ],
            margin: [0, 0, 0, 10]
          },
          {
            columns: [
              {
                text: [
                  { text: "Employee Name:", bold: false, fontSize: 8 },
                  {
                    text: `  ${employeeName.value}`,
                    bold: true,
                    decoration: "underline",
                    fontSize: 10
                  }
                ]
              },
              {
                text: [
                  { text: "Position:", bold: false, fontSize: 8 },
                  {
                    text: `  ${employeePosition.value}`,
                    bold: true,
                    decoration: "underline",
                    fontSize: 10
                  }
                ]
              },
              {
                text: [
                  { text: "Age:", bold: false, fontSize: 8 },
                  {
                    text: `  ${employeeAge.value}`,
                    bold: true,
                    decoration: "underline",
                    fontSize: 10
                  }
                ]
              }
            ],
            margin: [0, 0, 0, 10]
          },
          {
            table: {
              headerRows: 1,
              widths: ["auto", "auto", "auto", "auto", "auto", "auto"],
              body: [
                [
                  { text: "Number of Days", bold: true },
                  { text: "Time In", bold: true, alignment: "center" },
                  { text: "Time Out", bold: true, alignment: "center" },
                  { text: "Total Working Hours", bold: true },
                  { text: "Undertime", bold: true },
                  { text: "Overtime", bold: true }
                ],
                ...dtrRow.value.map((entry) => [
                  { text: entry.entry, alignment: "center" },
                  { text: entry.time_in || " - - - ", alignment: "center" },
                  { text: entry.time_out || " - - - ", alignment: "center" },
                  {
                    text: entry.total_working_hours || " - - - ",
                    alignment: "center"
                  },
                  { text: entry.undertime || " - - - ", alignment: "center" },
                  { text: entry.overtime || " - - - ", alignment: "center" }
                ])
              ]
            },
            layout: {
              hLineWidth: function(i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 0.5;
              },
              vLineWidth: function(i, node) {
                return 0.5;
              },
              hLineColor: function(i, node) {
                return i === 0 || i === node.table.body.length ? "black" : "#ccc";
              },
              vLineColor: function(i, node) {
                return "#ccc";
              }
            }
          }
        ],
        styles: {
          header: {
            fontSize: 14,
            bold: true,
            alignment: "center",
            margin: [0, 5, 0, 10]
          },
          tableHeader: { bold: true, fontSize: 13, color: "black" }
        },
        defaultStyle: { fontSize: 9 }
      };
    };
    const columns = [
      {
        name: "number_of_days",
        required: true,
        label: "NOD",
        align: "center",
        field: (row) => row.entry,
        format: (val) => `${val}`
      },
      {
        name: "in",
        align: "center",
        label: "IN",
        field: "time_in"
      },
      {
        name: "out",
        label: "OUT",
        align: "center",
        field: "time_out"
      },
      {
        name: "total_working_hours",
        label: "Total Working Hours",
        align: "center",
        field: "total_working_hours"
      },
      {
        name: "overtime",
        label: "Overtime",
        field: "overtime",
        align: "center"
      },
      {
        name: "undertime",
        label: "Undertime",
        field: "undertime",
        align: "center"
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$c, [
          createVNode(QInput, {
            modelValue: searchKeyword.value,
            "onUpdate:modelValue": [
              _cache[0] || (_cache[0] = ($event) => searchKeyword.value = $event),
              search
            ],
            debounce: "500",
            outlined: "",
            dense: "",
            flat: "",
            label: "Search",
            style: { "width": "300px" }
          }, {
            append: withCtx(() => [
              createBaseVNode("div", null, [
                createVNode(QIcon, { name: "search" })
              ])
            ]),
            default: withCtx(() => [
              searchKeyword.value ? (openBlock(), createElementBlock("div", _hoisted_2$9, [
                createVNode(QCard, null, {
                  default: withCtx(() => [
                    createVNode(QList, { separator: "" }, {
                      default: withCtx(() => {
                        var _a;
                        return [
                          !((_a = employees.value) == null ? void 0 : _a.length) ? (openBlock(), createBlock(QItem, { key: 0 }, {
                            default: withCtx(() => [
                              createTextVNode(" No record found. ")
                            ]),
                            _: 1
                          })) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(employees.value, (employee) => {
                            return openBlock(), createBlock(QItem, {
                              key: employee.id,
                              clickable: "",
                              onClick: ($event) => selectEmployee(employee)
                            }, {
                              default: withCtx(() => [
                                createVNode(QItemSection, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(formatFullname(employee)), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1032, ["onClick"]);
                          }), 128))
                        ];
                      }),
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
          createVNode(QCard, {
            bordered: "",
            dense: "",
            flat: "",
            class: "q-pa-md"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_3$7, [
                createBaseVNode("div", _hoisted_4$6, [
                  createBaseVNode("div", _hoisted_5$6, [
                    createVNode(QAvatar, {
                      size: "150px",
                      color: "grey-2"
                    }, {
                      default: withCtx(() => [
                        createBaseVNode("img", {
                          src: imageUrl.value,
                          alt: _ctx.altText,
                          onError: handleImageError
                        }, null, 40, _hoisted_6$6)
                      ]),
                      _: 1
                    })
                  ]),
                  createBaseVNode("div", _hoisted_7$5, [
                    _hoisted_8$5,
                    createBaseVNode("div", _hoisted_9$5, [
                      createBaseVNode("div", null, toDisplayString(employeeName.value), 1),
                      createBaseVNode("div", null, toDisplayString(employeePosition.value), 1),
                      createBaseVNode("div", null, toDisplayString(employeeAge.value), 1)
                    ])
                  ])
                ]),
                createVNode(QSeparator, { vertical: "" }),
                createBaseVNode("div", _hoisted_10$3, [
                  createBaseVNode("div", _hoisted_11$2, [
                    createBaseVNode("div", null, "From: " + toDisplayString(formatDateToCustomString(startDate.value)), 1),
                    createBaseVNode("div", null, "To: " + toDisplayString(formatDateToCustomString(endDate.value)), 1)
                  ]),
                  createBaseVNode("div", _hoisted_12$2, [
                    createBaseVNode("div", null, [
                      createBaseVNode("div", _hoisted_13$2, [
                        createVNode(QBtn, {
                          padding: "sm md",
                          size: "sm",
                          dense: "",
                          flat: "",
                          label: "prev",
                          icon: "arrow_back_ios_new",
                          onClick: onPrev
                        }),
                        createVNode(QSeparator, { vertical: "" }),
                        createVNode(QBtn, {
                          padding: "sm md",
                          size: "sm",
                          dense: "",
                          flat: "",
                          onClick: onCurrent
                        }, {
                          default: withCtx(() => [
                            createTextVNode("CURRENT")
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
                          icon: "arrow_forward_ios",
                          onClick: onNext
                        })
                      ])
                    ]),
                    createBaseVNode("div", null, [
                      createVNode(QBtn, {
                        padding: "sm md",
                        size: "sm",
                        icon: "print",
                        dense: "",
                        label: "PRINT",
                        class: "gradient-btn text-white",
                        onClick: openDialog
                      })
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_14$2, [
                    createVNode(QTable, {
                      flat: "",
                      bordered: "",
                      separator: "cell",
                      rows: dtrRow.value,
                      columns,
                      "row-key": "entry",
                      class: "full-height-table",
                      pagination: pagination.value,
                      "onUpdate:pagination": _cache[1] || (_cache[1] = ($event) => pagination.value = $event),
                      "hide-bottom": ""
                    }, null, 8, ["rows", "pagination"])
                  ])
                ])
              ])
            ]),
            _: 1
          })
        ]),
        createVNode(QDialog, {
          modelValue: dialog.value,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => dialog.value = $event),
          "full-height": "",
          position: "right",
          "backdrop-filter": "blur(4px) saturate(150%)"
        }, {
          default: withCtx(() => [
            createVNode(QCard, { style: { "width": "820px", "max-width": "80vw" } }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "gradient-btn" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_15$2, [
                      _hoisted_16$2,
                      createBaseVNode("div", null, [
                        withDirectives(createVNode(QBtn, {
                          rounded: "",
                          flat: "",
                          dense: "",
                          icon: "arrow_forward_ios"
                        }, null, 512), [
                          [ClosePopup]
                        ])
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createBaseVNode("div", null, [
                  createBaseVNode("iframe", {
                    src: pdfUrl.value,
                    width: "100%",
                    height: "700px"
                  }, null, 8, _hoisted_17$1)
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
var AttendanceSummary = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-2829b8dd"], ["__file", "AttendanceSummary.vue"]]);
var AttendancePage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$b = { class: "q-gutter-y-sm" };
const _sfc_main$e = {
  __name: "AttendancePage",
  setup(__props) {
    const tab = ref("dtr_overview");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", _hoisted_1$b, [
          createVNode(QTabs, {
            modelValue: tab.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => tab.value = $event),
            "narrow-indicator": "",
            "no-caps": "",
            "inline-label": "",
            dense: "",
            align: "justify",
            class: "gradient-btn"
          }, {
            default: withCtx(() => [
              createVNode(QTab, {
                class: "text-white",
                name: "dtr_overview",
                icon: "event_available",
                label: "DTR Overview"
              }),
              createVNode(QTab, {
                class: "text-white",
                name: "attendance_summary",
                icon: "calendar_month",
                label: "Attendance Summary"
              })
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        createVNode(QTabPanels, {
          modelValue: tab.value,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => tab.value = $event),
          animated: ""
        }, {
          default: withCtx(() => [
            createVNode(QTabPanel, { name: "dtr_overview" }, {
              default: withCtx(() => [
                createVNode(AttendancceTable)
              ]),
              _: 1
            }),
            createVNode(QTabPanel, { name: "attendance_summary" }, {
              default: withCtx(() => [
                createVNode(AttendanceSummary)
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
};
var AttendancePage = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-db6c6d6e"], ["__file", "AttendancePage.vue"]]);
const useEmployeeAllowance = defineStore("employee-allowance", () => {
  const allowance = ref(null);
  const allowances = ref([]);
  const searchAllowance = async (keyword) => {
    try {
      console.log("Searching for employee with keyword:", keyword);
      const response = await api.post(
        `/api/search-allowance?keyword=${keyword}`
      );
      console.log("Allowance response:", response);
      allowances.value = response.data;
    } catch (error) {
      console.error("Error searching employee:", error);
    }
  };
  const fetchEmployeeAllowance = async () => {
    try {
      const response = await api.get("/api/employee-allowance");
      allowances.value = response.data;
    } catch (error) {
      console.log("error fetching allowance", error);
    }
  };
  const createEmployeeAllowance = async (data) => {
    try {
      const response = await api.post("/api/employee-allowance", data);
      console.log("employee response", response.data);
      allowances.value.unshift(response.data);
      Notify.create({
        type: "positive",
        message: "Allowance successfully created",
        timeout: 1e3
      });
    } catch (error) {
      console.log(error);
      let errorMessage = "An error occurred. Please try again.";
      if (error.response && error.response.status === 409) {
        errorMessage = "Allowance for this employee already exists.";
      } else if (error.response && error.response.status === 422) {
        errorMessage = "Invalid data. Please check the inputs.";
      }
      Notify.create({
        type: "negative",
        message: errorMessage,
        timeout: 1e3
      });
    }
  };
  return {
    allowance,
    allowances,
    createEmployeeAllowance,
    fetchEmployeeAllowance,
    searchAllowance
  };
});
var AddAllowance_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$4 = (n) => (pushScopeId("data-v-00bc7d3c"), n = n(), popScopeId(), n);
const _hoisted_1$a = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F4BC} Add Employee Allowance", -1));
const _hoisted_2$8 = {
  key: 0,
  class: "custom-list z-top"
};
const _hoisted_3$6 = { class: "q-gutter-md" };
const _sfc_main$d = {
  __name: "AddAllowance",
  setup(__props) {
    const employeeStore = useEmployeeStore();
    const employees = computed(() => employeeStore.employees);
    const employeeAllowanceStore = useEmployeeAllowance();
    const employeeAllowanceRows = computed(() => employeeAllowanceStore.allowances);
    const searchKeyword = ref("");
    const dialog = ref(false);
    const loading = ref(false);
    const searchLoading = ref(false);
    const openDialog = () => {
      dialog.value = true;
    };
    const search = async () => {
      if (searchKeyword.value.trim()) {
        searchLoading.value = true;
        await employeeStore.searchEmployee(searchKeyword.value);
        searchLoading.value = false;
      }
    };
    const autoFillEmployee = (employee) => {
      console.log("Selected Employee:", employee);
      employeeAllowance.employee_id = employee.id;
      employeeAllowance.employee_name = `${employee.firstname} ${employee.middlename ? employee.middlename.charAt(0) + "." : ""} ${employee.lastname}`;
      employeeAllowance.employee_position = employee.position;
      searchKeyword.value = "";
      console.log("Filled Designation Data:", employeeAllowance);
    };
    const employeeAllowance = reactive({
      employee_id: "",
      employee_name: "",
      employee_position: "",
      amount: ""
    });
    const clearEmployeeAllowanceForm = () => {
      employeeAllowance.employee_id = "", employeeAllowance.employee_name = "", employeeAllowance.employee_position = "", employeeAllowance.amount = "";
    };
    const save = async () => {
      loading.value = true;
      try {
        const dataToBeSave = await employeeAllowanceStore.createEmployeeAllowance(
          employeeAllowance
        );
        console.log("data to be save", dataToBeSave);
        clearEmployeeAllowanceForm();
        employeeAllowanceRows.value = await employeeAllowanceStore.fetchEmployeeAllowance();
        dialog.value = false;
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(QBtn, {
          padding: "sm md",
          label: "Add Allowance",
          icon: "add_circle",
          size: "md",
          class: "gradient-btn text-white",
          onClick: openDialog
        }),
        createVNode(QDialog, {
          modelValue: dialog.value,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => dialog.value = $event),
          persistent: "",
          position: "right",
          "backdrop-filter": "blur(4px) saturate(150%)"
        }, {
          default: withCtx(() => [
            createVNode(QCard, { style: { "width": "400px", "max-width": "80vw" } }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "row items-center q-px-md q-py-sm gradient-btn text-white" }, {
                  default: withCtx(() => [
                    _hoisted_1$a,
                    createVNode(QSpace),
                    withDirectives(createVNode(QBtn, {
                      icon: "arrow_forward_ios",
                      flat: "",
                      dense: "",
                      round: ""
                    }, null, 512), [
                      [ClosePopup]
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createVNode(QInput, {
                      modelValue: searchKeyword.value,
                      "onUpdate:modelValue": [
                        _cache[0] || (_cache[0] = ($event) => searchKeyword.value = $event),
                        search
                      ],
                      label: "Search Employee",
                      outlined: "",
                      dense: "",
                      rounded: "",
                      debounce: "500",
                      placeholder: "Enter name"
                    }, {
                      append: withCtx(() => [
                        !searchLoading.value ? (openBlock(), createBlock(QIcon, {
                          key: 0,
                          name: "search"
                        })) : (openBlock(), createBlock(QSpinner, {
                          key: 1,
                          color: "grey",
                          size: "sm"
                        }))
                      ]),
                      default: withCtx(() => [
                        searchKeyword.value ? (openBlock(), createElementBlock("div", _hoisted_2$8, [
                          createVNode(QCard, null, {
                            default: withCtx(() => [
                              createVNode(QList, { separator: "" }, {
                                default: withCtx(() => {
                                  var _a;
                                  return [
                                    !((_a = employees.value) == null ? void 0 : _a.length) ? (openBlock(), createBlock(QItem, { key: 0 }, {
                                      default: withCtx(() => [
                                        createTextVNode(" No Employee Record ")
                                      ]),
                                      _: 1
                                    })) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(employees.value, (employee) => {
                                      return openBlock(), createBlock(QItem, {
                                        onClick: ($event) => autoFillEmployee(employee),
                                        key: employee.id,
                                        clickable: ""
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(QItemSection, null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(`${employee.firstname} ${employee.middlename ? employee.middlename.charAt(0) + "." : ""} ${employee.lastname}`), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"]);
                                    }), 128))
                                  ];
                                }),
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
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_3$6, [
                      createVNode(QInput, {
                        modelValue: employeeAllowance.employee_name,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => employeeAllowance.employee_name = $event),
                        outlined: "",
                        dense: "",
                        readonly: "",
                        label: "Name"
                      }, null, 8, ["modelValue"]),
                      createVNode(QInput, {
                        modelValue: employeeAllowance.employee_position,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => employeeAllowance.employee_position = $event),
                        outlined: "",
                        dense: "",
                        readonly: "",
                        label: "Position"
                      }, null, 8, ["modelValue"])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createVNode(QInput, {
                      modelValue: employeeAllowance.amount,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => employeeAllowance.amount = $event),
                      outlined: "",
                      dense: "",
                      label: "Allowance amount"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(QCardActions, null, {
                  default: withCtx(() => [
                    createVNode(QBtn, {
                      size: "md",
                      padding: "xs md",
                      label: "save",
                      "icon-right": "send",
                      class: "gradient-btn text-white",
                      onClick: save,
                      loading: loading.value
                    }, null, 8, ["loading"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
};
var AddAllowance = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-00bc7d3c"], ["__file", "AddAllowance.vue"]]);
const _sfc_main$c = {
  __name: "SearchAllowance",
  setup(__props) {
    const employeeAllowanceStore = useEmployeeAllowance();
    computed(() => employeeAllowanceStore.allowances);
    const searchKeyword = ref("");
    const loading = ref(false);
    const search = async () => {
      loading.value = true;
      await employeeAllowanceStore.searchAllowance(searchKeyword.value);
      loading.value = false;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(QInput, {
          modelValue: searchKeyword.value,
          "onUpdate:modelValue": [
            _cache[0] || (_cache[0] = ($event) => searchKeyword.value = $event),
            search
          ],
          outlined: "",
          dense: "",
          flat: "",
          label: "Search",
          debounce: "1000",
          style: { "width": "300px" }
        }, {
          append: withCtx(() => [
            createBaseVNode("div", null, [
              !loading.value ? (openBlock(), createBlock(QIcon, {
                key: 0,
                name: "search"
              })) : (openBlock(), createBlock(QSpinner, {
                key: 1,
                color: "grey",
                size: "sm"
              }))
            ])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
};
var SearchAllowance = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "SearchAllowance.vue"]]);
var AllowanceTable_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$9 = {
  class: "row justify-between q-mb-md",
  align: "right"
};
const _sfc_main$b = {
  __name: "AllowanceTable",
  setup(__props) {
    const employeeAllowanceStore = useEmployeeAllowance();
    const employeeAllowanceRows = computed(() => employeeAllowanceStore.allowances);
    const pagination = ref({
      rowsPerPage: 0
    });
    onMounted(async () => {
      await reloadTableData();
    });
    const reloadTableData = async () => {
      try {
        employeeAllowanceRows.value = await employeeAllowanceStore.fetchEmployeeAllowance();
        console.log("allowance", employeeAllowanceRows.value);
      } catch (error) {
        console.log("Error fetching allowance", error);
      }
    };
    const formatFullname = (row) => {
      const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
      const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
      const middlename = row.middlename ? capitalize(row.middlename).charAt(0) + "." : "";
      const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";
      return `${firstname} ${middlename} ${lastname}`.trim();
    };
    const formatDate = (dateTime) => {
      if (!dateTime)
        return " - - ";
      const date = new Date(dateTime);
      if (isNaN(date.getTime()))
        return " - - ";
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    };
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP"
      }).format(value);
    };
    const employeeAllowanceColumns = [
      {
        name: "date",
        required: true,
        label: "Date",
        align: "center",
        field: (row) => formatDate(row.created_at)
      },
      {
        name: "name",
        required: true,
        label: "Name",
        align: "center",
        field: (row) => formatFullname(row.employee)
      },
      {
        name: "amount",
        required: true,
        label: "Amount",
        align: "center",
        field: (row) => formatCurrency(row.amount)
      },
      {
        name: "actions",
        required: true,
        label: "Actions",
        align: "center",
        field: "actions"
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$9, [
          createBaseVNode("div", null, [
            createVNode(AddAllowance)
          ]),
          createVNode(SearchAllowance)
        ]),
        createVNode(QTable, {
          class: "sticky-header",
          rows: employeeAllowanceRows.value,
          columns: employeeAllowanceColumns,
          "row-key": "name",
          pagination: pagination.value,
          "onUpdate:pagination": _cache[0] || (_cache[0] = ($event) => pagination.value = $event),
          "hide-bottom": ""
        }, {
          "body-cell-actions": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createVNode(QBtn, {
                  color: "positive",
                  icon: "edit",
                  size: "sm",
                  flat: "",
                  round: "",
                  dense: ""
                }, {
                  default: withCtx(() => [
                    createVNode(QTooltip, {
                      class: "bg-positive",
                      delay: 200
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Edit")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          _: 1
        }, 8, ["rows", "pagination"])
      ], 64);
    };
  }
};
var AllowanceTable = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-718dbada"], ["__file", "AllowanceTable.vue"]]);
const useEmployeeBenefitStore = defineStore("benefits", () => {
  const benefit = ref(null);
  const benefits = ref([]);
  const fetchEmployeeBenefit = async () => {
    try {
      const response = await api.get("/api/employee-benefit");
      benefits.value = response.data;
    } catch (error) {
      console.log("error fetching benefits", error);
    }
  };
  const searchBenefit = async (keyword) => {
    try {
      console.log("Searching for employee with keyword:", keyword);
      const response = await api.post(`/api/search-benefit?keyword=${keyword}`);
      console.log("Allowance response:", response.data);
      benefits.value = response.data;
    } catch (error) {
      console.error("Benefits error", error);
    }
  };
  const createEmployeeBenefit = async (data) => {
    try {
      const response = await api.post("/api/employee-benefit", data);
      benefits.value.unshift(response.data);
      Notify.create({
        type: "positive",
        message: "Employee deductions successfully created",
        setTimeout: 1e3
      });
    } catch (error) {
      console.log(error);
      let errorMessage = "An error occurred. Please try again.";
      if (error.response && error.response.status === 409) {
        errorMessage = "Allowance for this employee already exists.";
      } else if (error.response && error.response.status === 422) {
        errorMessage = "Invalid data. Please check the inputs.";
      }
      Notify.create({
        type: "negative",
        message: errorMessage,
        timeout: 5e3
      });
    }
  };
  return {
    benefit,
    benefits,
    fetchEmployeeBenefit,
    createEmployeeBenefit,
    searchBenefit
  };
});
var AddDeduction_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$3 = (n) => (pushScopeId("data-v-5d754b74"), n = n(), popScopeId(), n);
const _hoisted_1$8 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F4BC} Add Employee Deductions", -1));
const _hoisted_2$7 = {
  key: 0,
  class: "custom-list z-top"
};
const _hoisted_3$5 = { class: "row q-gutter-md text-subtitle1" };
const _hoisted_4$5 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "Name:", -1));
const _hoisted_5$5 = { class: "text-weight-medium" };
const _hoisted_6$5 = { class: "row q-gutter-md text-subtitle1" };
const _hoisted_7$4 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", null, "Position:", -1));
const _hoisted_8$4 = { class: "text-weight-medium" };
const _hoisted_9$4 = { class: "q-gutter-y-md" };
const _sfc_main$a = {
  __name: "AddDeduction",
  setup(__props) {
    const employeeStore = useEmployeeStore();
    const employees = computed(() => employeeStore.employees);
    const employeeBenefitStore = useEmployeeBenefitStore();
    const employeeBenefitRows = computed(() => employeeBenefitStore.benefits);
    const searchKeyword = ref("");
    const loading = ref(false);
    const searchLoading = ref(false);
    const dialog = ref(false);
    const openDialog = () => {
      dialog.value = true;
    };
    const search = async () => {
      if (searchKeyword.value.trim()) {
        searchLoading.value = true;
        await employeeStore.searchEmployee(searchKeyword.value);
        searchLoading.value = false;
      }
    };
    const autoFillEmployee = (employee) => {
      console.log("Selected Employee:", employee);
      employeeDeduction.employee_id = employee.id;
      employeeDeduction.employee_name = `${employee.firstname} ${employee.middlename ? employee.middlename.charAt(0) + "." : ""} ${employee.lastname} `;
      employeeDeduction.employee_position = employee.position;
      searchKeyword.value = "";
      console.log("Filled Designation Data:", employeeDeduction);
    };
    const employeeDeduction = reactive({
      employee_id: "",
      employee_name: "",
      employee_position: "",
      sss: "",
      hdmf: "",
      phic: ""
    });
    const clearEmployeeDeductionForm = () => {
      employeeDeduction.employee_id = "", employeeDeduction.employee_name = "", employeeDeduction.employee_position = "", employeeDeduction.sss = "", employeeDeduction.hdmf = "", employeeDeduction.phic = "";
    };
    const save = async () => {
      console.log("deductionss:", employeeDeduction);
      loading.value = true;
      try {
        const deduction = await employeeBenefitStore.createEmployeeBenefit(
          employeeDeduction
        );
        console.log("deduction", deduction);
        dialog.value = false;
        clearEmployeeDeductionForm();
        employeeBenefitRows.value = await employeeBenefitStore.fetchEmployeeBenefit();
      } catch (error) {
        console.log("error", error);
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(QBtn, {
          padding: "sm md",
          label: "Add Benefits",
          icon: "add_circle",
          size: "md",
          class: "gradient-btn text-white",
          onClick: openDialog
        }),
        createVNode(QDialog, {
          modelValue: dialog.value,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => dialog.value = $event),
          persistent: "",
          position: "right",
          "backdrop-filter": "blur(4px) saturate(150%)"
        }, {
          default: withCtx(() => [
            createVNode(QCard, { style: { "width": "400px", "max-width": "80vw" } }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "row items-center q-px-md q-py-sm gradient-btn text-white" }, {
                  default: withCtx(() => [
                    _hoisted_1$8,
                    createVNode(QSpace),
                    withDirectives(createVNode(QBtn, {
                      icon: "arrow_forward_ios",
                      flat: "",
                      dense: "",
                      round: ""
                    }, null, 512), [
                      [ClosePopup]
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createVNode(QInput, {
                      modelValue: searchKeyword.value,
                      "onUpdate:modelValue": [
                        _cache[0] || (_cache[0] = ($event) => searchKeyword.value = $event),
                        search
                      ],
                      label: "Search Employee",
                      outlined: "",
                      rounded: "",
                      dense: "",
                      debounce: "500",
                      placeholder: "Enter name"
                    }, {
                      append: withCtx(() => [
                        !searchLoading.value ? (openBlock(), createBlock(QIcon, {
                          key: 0,
                          name: "search"
                        })) : (openBlock(), createBlock(QSpinner, {
                          key: 1,
                          color: "grey",
                          size: "sm"
                        }))
                      ]),
                      default: withCtx(() => [
                        searchKeyword.value ? (openBlock(), createElementBlock("div", _hoisted_2$7, [
                          createVNode(QCard, null, {
                            default: withCtx(() => [
                              createVNode(QList, { separator: "" }, {
                                default: withCtx(() => {
                                  var _a;
                                  return [
                                    !((_a = employees.value) == null ? void 0 : _a.length) ? (openBlock(), createBlock(QItem, { key: 0 }, {
                                      default: withCtx(() => [
                                        createTextVNode(" No employee record ")
                                      ]),
                                      _: 1
                                    })) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(employees.value, (employee) => {
                                      return openBlock(), createBlock(QItem, {
                                        onClick: ($event) => autoFillEmployee(employee),
                                        key: employee.id,
                                        clickable: ""
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(QItemSection, null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(`${employee.firstname} ${employee.middlename ? employee.middlename.charAt(0) + "." : ""} ${employee.lastname}`), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"]);
                                    }), 128))
                                  ];
                                }),
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
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_3$5, [
                      _hoisted_4$5,
                      createBaseVNode("div", _hoisted_5$5, toDisplayString(employeeDeduction.employee_name ? employeeDeduction.employee_name : "-------"), 1)
                    ]),
                    createBaseVNode("div", _hoisted_6$5, [
                      _hoisted_7$4,
                      createBaseVNode("div", _hoisted_8$4, toDisplayString(employeeDeduction.employee_position ? employeeDeduction.employee_position : "-------"), 1)
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_9$4, [
                      createBaseVNode("div", null, [
                        createVNode(QInput, {
                          modelValue: employeeDeduction.sss,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => employeeDeduction.sss = $event),
                          outlined: "",
                          label: "SSS (Social Security System )"
                        }, null, 8, ["modelValue"])
                      ]),
                      createBaseVNode("div", null, [
                        createVNode(QInput, {
                          modelValue: employeeDeduction.hdmf,
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => employeeDeduction.hdmf = $event),
                          outlined: "",
                          label: "HDMF (Pag-IBIG Fund)"
                        }, null, 8, ["modelValue"])
                      ]),
                      createBaseVNode("div", null, [
                        createVNode(QInput, {
                          modelValue: employeeDeduction.phic,
                          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => employeeDeduction.phic = $event),
                          outlined: "",
                          label: "PHIC (Philippine Health Insurance Corporation)"
                        }, null, 8, ["modelValue"])
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardActions, null, {
                  default: withCtx(() => [
                    createVNode(QBtn, {
                      size: "md",
                      padding: "xs md",
                      label: "save",
                      "icon-right": "send",
                      class: "gradient-btn text-white",
                      onClick: save,
                      loading: loading.value
                    }, null, 8, ["loading"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
};
var AddDeduction = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-5d754b74"], ["__file", "AddDeduction.vue"]]);
const _sfc_main$9 = {
  __name: "SearchBenefit",
  setup(__props) {
    const employeeBenefitStore = useEmployeeBenefitStore();
    const searchKeyword = ref("");
    const loading = ref(false);
    const search = async () => {
      loading.value = true;
      await employeeBenefitStore.searchBenefit(searchKeyword.value);
      loading.value = false;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(QInput, {
          modelValue: searchKeyword.value,
          "onUpdate:modelValue": [
            _cache[0] || (_cache[0] = ($event) => searchKeyword.value = $event),
            search
          ],
          outlined: "",
          dense: "",
          flat: "",
          label: "Search",
          style: { "width": "300px" }
        }, {
          append: withCtx(() => [
            createBaseVNode("div", null, [
              !loading.value ? (openBlock(), createBlock(QIcon, {
                key: 0,
                name: "search"
              })) : (openBlock(), createBlock(QSpinner, {
                key: 1,
                color: "grey",
                size: "sm"
              }))
            ])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
};
var SearchBenefit = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "SearchBenefit.vue"]]);
var BenefitsTable_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$7 = {
  class: "row justify-between q-mb-md",
  align: "right"
};
const _hoisted_2$6 = { class: "row q-gutter-md" };
const _sfc_main$8 = {
  __name: "BenefitsTable",
  setup(__props) {
    const employeeBenefitStore = useEmployeeBenefitStore();
    const employeeBenefitRows = computed(() => employeeBenefitStore.benefits);
    const pagination = ref({
      rowsPerPage: 0
    });
    onMounted(async () => {
      await reloadTableData();
    });
    const reloadTableData = async () => {
      try {
        employeeBenefitRows.value = await employeeBenefitStore.fetchEmployeeBenefit();
        console.log("benefit", employeeBenefitRows.value);
      } catch (error) {
        console.log("error fetching", error);
      }
    };
    const formatFullname = (row) => {
      const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
      const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
      const middlename = row.middlename ? capitalize(row.middlename).charAt(0) + "." : "";
      const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";
      return `${firstname} ${middlename} ${lastname}`.trim();
    };
    const formatDate = (dateTime) => {
      if (!dateTime)
        return " - - ";
      const date = new Date(dateTime);
      if (isNaN(date.getTime()))
        return " - - ";
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    };
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP"
      }).format(value);
    };
    const employeeBenefitColumns = [
      {
        name: "date",
        required: true,
        label: "Date",
        align: "left",
        field: (row) => formatDate(row.created_at)
      },
      {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: (row) => formatFullname(row.employee)
      },
      {
        name: "sss",
        label: "Social Security System (SSS)",
        align: "center",
        field: (row) => formatCurrency(row.sss)
      },
      {
        name: "hdmf",
        label: "Pag-IBIG Fund (HDMF)",
        align: "center",
        field: (row) => formatCurrency(row.hdmf)
      },
      {
        name: "phic",
        label: "Phil - Health (PHIC)",
        align: "center",
        field: (row) => formatCurrency(row.phic)
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$7, [
          createBaseVNode("div", _hoisted_2$6, [
            createBaseVNode("div", null, [
              createVNode(AddDeduction)
            ])
          ]),
          createVNode(SearchBenefit)
        ]),
        createVNode(QTable, {
          class: "sticky-header",
          rows: employeeBenefitRows.value,
          columns: employeeBenefitColumns,
          "row-key": "name",
          "hide-bottom": "",
          pagination: pagination.value,
          "onUpdate:pagination": _cache[0] || (_cache[0] = ($event) => pagination.value = $event)
        }, null, 8, ["rows", "pagination"])
      ], 64);
    };
  }
};
var DeductionTable = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-1738f060"], ["__file", "BenefitsTable.vue"]]);
const useUniformStore = defineStore("uniform", () => {
  const uniform = ref(null);
  const uniforms = ref([]);
  const fetchUniform = async () => {
    try {
      const response = await api.get("/api/uniform");
      uniforms.value = response.data;
    } catch (error) {
      console.log("error fetching uniform", error);
    }
  };
  const searchUniform = async (keyword) => {
    try {
      console.log("Searching with keyword:", keyword);
      const response = await api.post(`/api/search-uniform?keyword=${keyword}`);
      console.log("UNIFORm response:", response);
      uniforms.value = response.data;
    } catch (error) {
      console.error("Error searching employee:", error);
    }
  };
  const createUniforms = async (data) => {
    try {
      const response = await api.post("/api/uniform", data);
      uniforms.value.unshift(response.data);
      Notify.create({
        type: "positive",
        message: "Allowance successfully created",
        timeout: 1e3
      });
    } catch (error) {
      console.log(error);
      let errorMessage = "An error occurred. Please try again.";
      if (error.response && error.response.status === 409) {
        errorMessage = "Allowance for this employee already exists.";
      } else if (error.response && error.response.status === 422) {
        errorMessage = "Invalid data. Please check the inputs.";
      }
      Notify.create({
        type: "negative",
        message: errorMessage,
        timeout: 1e3
      });
    }
  };
  return {
    uniform,
    uniforms,
    fetchUniform,
    createUniforms,
    searchUniform
  };
});
var AddUniform_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-2b527d9a"), n = n(), popScopeId(), n);
const _hoisted_1$6 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F454} Add Uniform", -1));
const _hoisted_2$5 = {
  key: 0,
  class: "custom-list z-top"
};
const _hoisted_3$4 = { class: "row q-gutter-md text-subtitle1" };
const _hoisted_4$4 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, "Name:", -1));
const _hoisted_5$4 = { class: "text-weight-medium" };
const _hoisted_6$4 = { class: "row q-gutter-md text-subtitle1" };
const _hoisted_7$3 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", null, "Position:", -1));
const _hoisted_8$3 = { class: "text-weight-medium" };
const _hoisted_9$3 = { class: "row" };
const _hoisted_10$2 = { class: "col-6" };
const _hoisted_11$1 = {
  key: 0,
  class: "q-gutter-sm q-pa-md"
};
const _hoisted_12$1 = {
  key: 0,
  class: "row q-gutter-x-sm"
};
const _hoisted_13$1 = { class: "col-6" };
const _hoisted_14$1 = {
  key: 0,
  class: "q-gutter-sm q-pa-md"
};
const _hoisted_15$1 = {
  key: 0,
  class: "row q-gutter-x-sm"
};
const _hoisted_16$1 = { class: "row justify-between q-gutter-sm" };
const _hoisted_17 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-mt-lg text-subtitle1" }, "Number of Payments", -1));
const _hoisted_18 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-mt-lg text-subtitle1" }, "Total Amount", -1));
const _hoisted_19 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-mt-lg text-subtitle1" }, "Payments Per Payroll", -1));
const _hoisted_20 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "row q-gutter-sm" }, null, -1));
const _sfc_main$7 = {
  __name: "AddUniform",
  setup(__props) {
    const employeeStore = useEmployeeStore();
    const employees = computed(() => employeeStore.employees);
    const uniformStore = useUniformStore();
    const uniformRows = computed(() => uniformStore.uniforms);
    const searchKeyword = ref("");
    const dialog = ref(false);
    const tShirt = ref(false);
    const pants = ref(false);
    const totalAmount = ref(0);
    const paymentPerPayroll = ref(0);
    const loading = ref(false);
    const searchLoading = ref(false);
    const openDialog = () => {
      dialog.value = true;
    };
    const search = async () => {
      if (searchKeyword.value.trim()) {
        searchLoading.value = true;
        await employeeStore.searchEmployee(searchKeyword.value);
        searchLoading.value = false;
      }
    };
    const autoFillEmployee = (employee) => {
      console.log("Selected Employee:", employee);
      uniform.employee_id = employee.id;
      uniform.employee_name = `${employee.firstname} ${employee.middlename ? employee.middlename.charAt(0) + "." : ""} ${employee.lastname} `;
      uniform.employee_position = employee.position;
      searchKeyword.value = "";
      console.log("Filled Designation Data:", uniform);
    };
    const uniform = reactive({
      employee_id: "",
      employee_name: "",
      employee_position: "",
      tShirtsize: "",
      pantsSize: "",
      tShirtPcs: 0,
      tShirtPrice: 0,
      pantsPcs: 0,
      pantsPrice: 0,
      numberOfPayments: 1
    });
    const clearUniform = () => {
      uniform.employee_id = "", uniform.employee_name = "", uniform.employee_position = "", tShirt.value = false, pants.value = false, totalAmount.value = 0, paymentPerPayroll.value = 0, clearPants(), clearTshirt();
    };
    const clearTshirt = () => {
      uniform.tShirtPcs = "", uniform.tShirtsize = "", uniform.tShirtPrice = "";
    };
    const clearPants = () => {
      uniform.pantsSize = "", uniform.pantsPcs = "", uniform.pantsPrice = "";
    };
    watch(pants, (newValue) => {
      if (!newValue) {
        clearPants();
      }
    });
    watch(tShirt, (newValue) => {
      if (!newValue) {
        clearTshirt();
      }
    });
    watch(
      [
        () => uniform.tShirtPrice,
        () => uniform.tShirtPcs,
        () => uniform.pantsPrice,
        () => uniform.pantsPcs
      ],
      () => {
        totalAmount.value = uniform.tShirtPrice * uniform.tShirtPcs + uniform.pantsPrice * uniform.pantsPcs;
      },
      { immediate: true }
    );
    watch(
      [totalAmount, () => uniform.numberOfPayments],
      () => {
        paymentPerPayroll.value = Math.round(
          totalAmount.value / (uniform.numberOfPayments || 1)
        );
      },
      { immediate: true }
    );
    const save = async () => {
      const payload = {
        employee_id: uniform.employee_id,
        employee_name: uniform.employee_name,
        employee_position: uniform.employee_position,
        tShirtsize: uniform.tShirtsize,
        pantsSize: uniform.pantsSize,
        tShirtPcs: uniform.tShirtPcs,
        tShirtPrice: uniform.tShirtPrice,
        pantsPcs: uniform.pantsPcs,
        pantsPrice: uniform.pantsPrice,
        totalAmount: totalAmount.value,
        paymentPerPayroll: paymentPerPayroll.value,
        numberOfPayments: uniform.numberOfPayments
      };
      console.log("payload", payload);
      try {
        loading.value = true;
        await uniformStore.createUniforms(payload);
        dialog.value = false;
        clearUniform();
        uniformRows.value = await uniformStore.fetchUniform();
      } catch (error) {
        console.log(error);
        Notify.create({
          type: "negative",
          message: "error"
        });
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(QBtn, {
          padding: "sm md",
          label: "Add Uniform",
          icon: "add_circle",
          size: "md",
          class: "gradient-btn text-white",
          onClick: openDialog
        }),
        createVNode(QDialog, {
          modelValue: dialog.value,
          "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => dialog.value = $event),
          persistent: "",
          position: "right",
          "backdrop-filter": "blur(4px) saturate(150%)"
        }, {
          default: withCtx(() => [
            createVNode(QCard, { style: { "width": "600px", "max-width": "80vw" } }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "row items-center q-px-md q-py-sm gradient-btn text-white" }, {
                  default: withCtx(() => [
                    _hoisted_1$6,
                    createVNode(QSpace),
                    withDirectives(createVNode(QBtn, {
                      icon: "arrow_forward_ios",
                      flat: "",
                      dense: "",
                      round: ""
                    }, null, 512), [
                      [ClosePopup]
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createVNode(QInput, {
                      modelValue: searchKeyword.value,
                      "onUpdate:modelValue": [
                        _cache[0] || (_cache[0] = ($event) => searchKeyword.value = $event),
                        search
                      ],
                      label: "Search Employee",
                      outlined: "",
                      rounded: "",
                      dense: "",
                      debounce: "500",
                      placeholder: "Enter name"
                    }, {
                      append: withCtx(() => [
                        !searchLoading.value ? (openBlock(), createBlock(QIcon, {
                          key: 0,
                          name: "search"
                        })) : (openBlock(), createBlock(QSpinner, {
                          key: 1,
                          color: "grey",
                          size: "sm"
                        }))
                      ]),
                      default: withCtx(() => [
                        searchKeyword.value ? (openBlock(), createElementBlock("div", _hoisted_2$5, [
                          createVNode(QCard, null, {
                            default: withCtx(() => [
                              createVNode(QList, { separator: "" }, {
                                default: withCtx(() => {
                                  var _a;
                                  return [
                                    !((_a = employees.value) == null ? void 0 : _a.length) ? (openBlock(), createBlock(QItem, { key: 0 }, {
                                      default: withCtx(() => [
                                        createTextVNode(" No employee record ")
                                      ]),
                                      _: 1
                                    })) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(employees.value, (employee) => {
                                      return openBlock(), createBlock(QItem, {
                                        onClick: ($event) => autoFillEmployee(employee),
                                        key: employee.id,
                                        clickable: ""
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(QItemSection, null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(`${employee.firstname} ${employee.middlename ? employee.middlename.charAt(0) + "." : ""} ${employee.lastname}`), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"]);
                                    }), 128))
                                  ];
                                }),
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
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_3$4, [
                      _hoisted_4$4,
                      createBaseVNode("div", _hoisted_5$4, toDisplayString(uniform.employee_name ? uniform.employee_name : "-------"), 1)
                    ]),
                    createBaseVNode("div", _hoisted_6$4, [
                      _hoisted_7$3,
                      createBaseVNode("div", _hoisted_8$3, toDisplayString(uniform.employee_position ? uniform.employee_position : "-------"), 1)
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_9$3, [
                      createBaseVNode("div", _hoisted_10$2, [
                        createVNode(QCheckbox, {
                          "keep-color": "",
                          modelValue: tShirt.value,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => tShirt.value = $event),
                          label: "T-Shirt",
                          color: "red"
                        }, null, 8, ["modelValue"]),
                        tShirt.value ? (openBlock(), createElementBlock("div", _hoisted_11$1, [
                          createBaseVNode("div", null, [
                            createVNode(QRadio, {
                              "keep-color": "",
                              modelValue: uniform.tShirtsize,
                              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => uniform.tShirtsize = $event),
                              val: "18",
                              label: "18",
                              color: "teal"
                            }, null, 8, ["modelValue"]),
                            createVNode(QRadio, {
                              "keep-color": "",
                              modelValue: uniform.tShirtsize,
                              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => uniform.tShirtsize = $event),
                              val: "S",
                              label: "S",
                              color: "orange"
                            }, null, 8, ["modelValue"]),
                            createVNode(QRadio, {
                              "keep-color": "",
                              modelValue: uniform.tShirtsize,
                              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => uniform.tShirtsize = $event),
                              val: "M",
                              label: "M",
                              color: "red"
                            }, null, 8, ["modelValue"]),
                            createVNode(QRadio, {
                              "keep-color": "",
                              modelValue: uniform.tShirtsize,
                              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => uniform.tShirtsize = $event),
                              val: "L",
                              label: "L",
                              color: "cyan"
                            }, null, 8, ["modelValue"])
                          ]),
                          uniform.tShirtsize ? (openBlock(), createElementBlock("div", _hoisted_12$1, [
                            createVNode(QInput, {
                              modelValue: uniform.tShirtPcs,
                              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => uniform.tShirtPcs = $event),
                              dense: "",
                              outlined: "",
                              label: "pcs",
                              style: { "width": "100px" }
                            }, null, 8, ["modelValue"]),
                            createVNode(QInput, {
                              modelValue: uniform.tShirtPrice,
                              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => uniform.tShirtPrice = $event),
                              dense: "",
                              outlined: "",
                              label: "price",
                              style: { "width": "100px" }
                            }, null, 8, ["modelValue"])
                          ])) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true)
                      ]),
                      createBaseVNode("div", _hoisted_13$1, [
                        createVNode(QCheckbox, {
                          "keep-color": "",
                          modelValue: pants.value,
                          "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => pants.value = $event),
                          label: "Pants",
                          color: "brown-6"
                        }, null, 8, ["modelValue"]),
                        pants.value ? (openBlock(), createElementBlock("div", _hoisted_14$1, [
                          createVNode(QRadio, {
                            "keep-color": "",
                            modelValue: uniform.pantsSize,
                            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => uniform.pantsSize = $event),
                            val: "M",
                            label: "M",
                            color: "red"
                          }, null, 8, ["modelValue"]),
                          createVNode(QRadio, {
                            "keep-color": "",
                            modelValue: uniform.pantsSize,
                            "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => uniform.pantsSize = $event),
                            val: "L",
                            label: "L",
                            color: "cyan"
                          }, null, 8, ["modelValue"]),
                          createVNode(QRadio, {
                            "keep-color": "",
                            modelValue: uniform.pantsSize,
                            "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => uniform.pantsSize = $event),
                            val: "XL",
                            label: "XL",
                            color: "purple-6"
                          }, null, 8, ["modelValue"]),
                          createVNode(QRadio, {
                            "keep-color": "",
                            modelValue: uniform.pantsSize,
                            "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => uniform.pantsSize = $event),
                            val: "XXL",
                            label: "XXL",
                            color: "deep-orange-13"
                          }, null, 8, ["modelValue"]),
                          uniform.pantsSize ? (openBlock(), createElementBlock("div", _hoisted_15$1, [
                            createVNode(QInput, {
                              modelValue: uniform.pantsPcs,
                              "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => uniform.pantsPcs = $event),
                              dense: "",
                              outlined: "",
                              label: "pcs",
                              style: { "width": "100px" }
                            }, null, 8, ["modelValue"]),
                            createVNode(QInput, {
                              modelValue: uniform.pantsPrice,
                              "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => uniform.pantsPrice = $event),
                              dense: "",
                              outlined: "",
                              label: "price",
                              style: { "width": "100px" }
                            }, null, 8, ["modelValue"])
                          ])) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_16$1, [
                      createBaseVNode("div", null, [
                        _hoisted_17,
                        createVNode(QInput, {
                          modelValue: uniform.numberOfPayments,
                          "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => uniform.numberOfPayments = $event),
                          outlined: "",
                          flat: "",
                          dense: ""
                        }, null, 8, ["modelValue"])
                      ]),
                      createBaseVNode("div", null, [
                        _hoisted_18,
                        createVNode(QInput, {
                          modelValue: totalAmount.value,
                          "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => totalAmount.value = $event),
                          outlined: "",
                          readonly: "",
                          flat: "",
                          dense: ""
                        }, null, 8, ["modelValue"]),
                        _hoisted_19,
                        createVNode(QInput, {
                          modelValue: paymentPerPayroll.value,
                          "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => paymentPerPayroll.value = $event),
                          outlined: "",
                          readonly: "",
                          flat: "",
                          dense: ""
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    _hoisted_20
                  ]),
                  _: 1
                }),
                createVNode(QCardActions, null, {
                  default: withCtx(() => [
                    createVNode(QBtn, {
                      size: "md",
                      padding: "xs md",
                      label: "save",
                      "icon-right": "send",
                      class: "gradient-btn text-white",
                      onClick: save,
                      loading: loading.value
                    }, null, 8, ["loading"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
};
var AddUniform = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-2b527d9a"], ["__file", "AddUniform.vue"]]);
const _hoisted_1$5 = {
  class: "row justify-between q-mb-md",
  align: "right"
};
const _hoisted_2$4 = { class: "row q-gutter-md" };
const _hoisted_3$3 = /* @__PURE__ */ createBaseVNode("div", { class: "q-pb-sm text-center text-h6 text-weight-bold text-subtitle2" }, " T-Shirt ", -1);
const _hoisted_4$3 = { class: "row justify-between" };
const _hoisted_5$3 = /* @__PURE__ */ createBaseVNode("div", null, "Size :", -1);
const _hoisted_6$3 = { class: "row justify-between" };
const _hoisted_7$2 = /* @__PURE__ */ createBaseVNode("div", null, "PCS :", -1);
const _hoisted_8$2 = { class: "row justify-between" };
const _hoisted_9$2 = /* @__PURE__ */ createBaseVNode("div", null, "PRICE :", -1);
const _hoisted_10$1 = /* @__PURE__ */ createBaseVNode("div", { class: "q-pb-sm text-center text-h6 text-weight-bold text-subtitle2" }, " Pants ", -1);
const _hoisted_11 = { class: "row justify-between" };
const _hoisted_12 = /* @__PURE__ */ createBaseVNode("div", null, "Size :", -1);
const _hoisted_13 = { class: "row justify-between" };
const _hoisted_14 = /* @__PURE__ */ createBaseVNode("div", null, "PCS :", -1);
const _hoisted_15 = { class: "row justify-between" };
const _hoisted_16 = /* @__PURE__ */ createBaseVNode("div", null, "PRICE :", -1);
const _sfc_main$6 = {
  __name: "UniformTable",
  setup(__props) {
    const uniformStore = useUniformStore();
    const filter = ref("");
    const uniformRows = computed(() => uniformStore.uniforms);
    const loading = ref(false);
    const pagination = ref({
      rowsPerPage: 0
    });
    onMounted(async () => {
      await reloadTableData();
    });
    const reloadTableData = async () => {
      try {
        uniformRows.value = await uniformStore.fetchUniform();
        console.log("uniform", uniformRows.value);
      } catch (error) {
        console.log("error fetching madepakeer", error);
      }
    };
    let debounceTimeout;
    const handleInput = () => {
      loading.value = true;
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        loading.value = false;
      }, 500);
    };
    const formatFullname = (row) => {
      const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
      const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
      const middlename = row.middlename ? capitalize(row.middlename).charAt(0) + "." : "";
      const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";
      return `${firstname} ${middlename} ${lastname}`.trim();
    };
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP"
      }).format(value);
    };
    const formatDate = (dateTime) => {
      if (!dateTime)
        return " - - ";
      const date = new Date(dateTime);
      if (isNaN(date.getTime()))
        return " - - ";
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    };
    const uniformColumns = [
      {
        name: "date",
        required: true,
        label: "Date",
        align: "left",
        field: (row) => formatDate(row.created_at)
      },
      {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: (row) => formatFullname(row.employee)
      },
      {
        name: "number_of_payments",
        required: true,
        label: "Number of Payments",
        align: "center",
        field: "number_of_payments"
      },
      {
        name: "total_amount",
        required: true,
        label: "Total Amount",
        align: "center",
        field: (row) => formatCurrency(row.total_amount)
      },
      {
        name: "payments_per_payroll",
        required: true,
        label: "Payments Per Payroll",
        align: "center",
        field: (row) => formatCurrency(row.payments_per_payroll)
      },
      {
        name: "t_shirt",
        label: "T-Shirt",
        align: "center",
        field: "t_shirt"
      },
      {
        name: "pants",
        label: "Pants",
        align: "center",
        field: "pants"
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$5, [
          createBaseVNode("div", _hoisted_2$4, [
            createVNode(AddUniform)
          ]),
          createVNode(QInput, {
            modelValue: filter.value,
            "onUpdate:modelValue": [
              _cache[0] || (_cache[0] = ($event) => filter.value = $event),
              handleInput
            ],
            outlined: "",
            dense: "",
            flat: "",
            label: "Search",
            style: { "width": "300px" }
          }, {
            append: withCtx(() => [
              createBaseVNode("div", null, [
                !loading.value ? (openBlock(), createBlock(QIcon, {
                  key: 0,
                  name: "search"
                })) : (openBlock(), createBlock(QSpinner, {
                  key: 1,
                  size: "sm"
                }))
              ])
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        createVNode(QTable, {
          class: "sticky-header",
          filter: filter.value,
          rows: uniformRows.value,
          columns: uniformColumns,
          "row-key": "name",
          pagination: pagination.value,
          "onUpdate:pagination": _cache[1] || (_cache[1] = ($event) => pagination.value = $event),
          "hide-bottom": ""
        }, {
          "body-cell-t_shirt": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createVNode(QTooltip, {
                  offset: [0, 10],
                  delay: 600,
                  class: "bg-info text-dark text-subtitle1",
                  style: { "width": "200px" }
                }, {
                  default: withCtx(() => [
                    _hoisted_3$3,
                    createVNode(QSeparator, {
                      class: "q-mb-md",
                      color: "yellow"
                    }),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(props.row.t_shirt, (tShirt) => {
                      return openBlock(), createElementBlock("div", {
                        class: "",
                        key: tShirt.size
                      }, [
                        createBaseVNode("div", _hoisted_4$3, [
                          _hoisted_5$3,
                          createBaseVNode("div", null, toDisplayString(tShirt.size), 1)
                        ]),
                        createBaseVNode("div", _hoisted_6$3, [
                          _hoisted_7$2,
                          createBaseVNode("div", null, toDisplayString(tShirt.pcs), 1)
                        ]),
                        createBaseVNode("div", _hoisted_8$2, [
                          _hoisted_9$2,
                          createBaseVNode("div", null, toDisplayString(formatCurrency(tShirt.price)), 1)
                        ])
                      ]);
                    }), 128))
                  ]),
                  _: 2
                }, 1024),
                createVNode(QChip, {
                  square: "",
                  outline: "",
                  color: "red-6",
                  class: "text-white"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(props.row.t_shirt.length) + " T-Shirt ", 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          "body-cell-pants": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createVNode(QTooltip, {
                  offset: [0, 10],
                  delay: 600,
                  class: "bg-info text-dark text-subtitle1",
                  style: { "width": "200px" }
                }, {
                  default: withCtx(() => [
                    _hoisted_10$1,
                    createVNode(QSeparator, {
                      class: "q-mb-md",
                      color: "yellow"
                    }),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(props.row.pants, (pant) => {
                      return openBlock(), createElementBlock("div", {
                        class: "",
                        key: pant.size
                      }, [
                        createBaseVNode("div", _hoisted_11, [
                          _hoisted_12,
                          createBaseVNode("div", null, toDisplayString(pant.size), 1)
                        ]),
                        createBaseVNode("div", _hoisted_13, [
                          _hoisted_14,
                          createBaseVNode("div", null, toDisplayString(pant.pcs), 1)
                        ]),
                        createBaseVNode("div", _hoisted_15, [
                          _hoisted_16,
                          createBaseVNode("div", null, toDisplayString(formatCurrency(pant.price)), 1)
                        ])
                      ]);
                    }), 128))
                  ]),
                  _: 2
                }, 1024),
                createVNode(QChip, {
                  square: "",
                  outline: "",
                  color: "brown-6",
                  class: "text-white"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(props.row.pants.length) + " Pants ", 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          _: 1
        }, 8, ["filter", "rows", "pagination"])
      ], 64);
    };
  }
};
var UniformTable = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "UniformTable.vue"]]);
const useCashAdvanceStore = defineStore("cash-advance", () => {
  const cashAdvance = ref(null);
  const cashAdvances = ref([]);
  const fetchCashAdvance = async () => {
    try {
      const response = await api.get("/api/cash-advance");
      cashAdvances.value = response.data;
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };
  const searchCashAdvance = async (keyword) => {
    try {
      console.log("Searching for employee with keyword:", keyword);
      const response = await api.post(
        `/api/search-cash-advance?keyword=${keyword}`
      );
      console.log("CA response:", response);
      cashAdvances.value = response.data;
    } catch (error) {
      console.error("Error searching CA:", error);
    }
  };
  const createCashAdvance = async (data) => {
    try {
      const response = await api.post("/api/cash-advance", data);
      cashAdvances.value.unshift(response.data);
      Notify.create({
        type: "positive",
        message: "Cash Advance save",
        setTimeout: 1e3
      });
    } catch (error) {
      console.log("CA error", error);
      Notify.create({
        type: "negative",
        message: "Error saving Cash Advance"
      });
    }
  };
  return {
    cashAdvance,
    cashAdvances,
    createCashAdvance,
    fetchCashAdvance,
    searchCashAdvance
  };
});
var CashAdvanceButton_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-084981bb"), n = n(), popScopeId(), n);
const _hoisted_1$4 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F4B2} Add Cash Advance", -1));
const _hoisted_2$3 = {
  key: 0,
  class: "custom-list z-top"
};
const _hoisted_3$2 = { class: "row q-gutter-md text-subtitle1" };
const _hoisted_4$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Name:", -1));
const _hoisted_5$2 = { class: "text-weight-meduim" };
const _hoisted_6$2 = { class: "row q-gutter-md text-subtitle1" };
const _hoisted_7$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", null, "Position:", -1));
const _hoisted_8$1 = { class: "text-weight-meduim" };
const _hoisted_9$1 = { class: "q-gutter-y-md" };
const _sfc_main$5 = {
  __name: "CashAdvanceButton",
  setup(__props) {
    const employeeStore = useEmployeeStore();
    const employees = computed(() => employeeStore.employees);
    const cashAdvanceStore = useCashAdvanceStore();
    const cashAdvanceRows = computed(() => cashAdvanceStore.cashAdvances);
    const searchKeyword = ref("");
    const loading = ref(false);
    const searchLoading = ref(false);
    const dialog = ref(false);
    const openDialog = () => {
      dialog.value = true;
    };
    const search = async () => {
      if (searchKeyword.value.trim()) {
        searchLoading.value = true;
        await employeeStore.searchEmployee(searchKeyword.value);
        searchLoading.value = false;
      }
    };
    const autoFillEmployee = (employee) => {
      console.log("Selected Employee:", employee);
      cashAdvance.employee_id = employee.id;
      cashAdvance.employee_name = `${employee.firstname} ${employee.middlename ? employee.middlename.charAt(0) + "." : ""} ${employee.lastname} `;
      cashAdvance.employee_position = employee.position, searchKeyword.value = "";
      console.log("Filled Designation Data:", cashAdvance);
    };
    const cashAdvance = reactive({
      employee_id: "",
      employee_name: "",
      employee_position: "",
      amount: "",
      reason: ""
    });
    const clearCashAdvanceForm = () => {
      cashAdvance.employee_id = "", cashAdvance.employee_name = "", cashAdvance.employee_position = "", cashAdvance.amount = "", cashAdvance.reason = "";
    };
    const save = async () => {
      console.log("cashAdvance", cashAdvance);
      loading.value = true;
      try {
        const response = await cashAdvanceStore.createCashAdvance(cashAdvance);
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
      clearCashAdvanceForm();
      cashAdvanceRows.value = await cashAdvanceStore.fetchCashAdvance();
      dialog.value = false;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(QBtn, {
          padding: "sm md",
          label: "Cash Advance",
          icon: "attach_money",
          size: "md",
          class: "gradient-btn text-white",
          onClick: openDialog
        }),
        createVNode(QDialog, {
          modelValue: dialog.value,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => dialog.value = $event),
          persistent: "",
          position: "right",
          "backdrop-filter": "blur(4px) saturate(150%)"
        }, {
          default: withCtx(() => [
            createVNode(QCard, { style: { "width": "400px", "max-width": "80vw" } }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "row items-center q-px-md q-py-sm gradient-btn text-white" }, {
                  default: withCtx(() => [
                    _hoisted_1$4,
                    createVNode(QSpace),
                    withDirectives(createVNode(QBtn, {
                      icon: "arrow_forward_ios",
                      flat: "",
                      dense: "",
                      round: ""
                    }, null, 512), [
                      [ClosePopup]
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createVNode(QInput, {
                      modelValue: searchKeyword.value,
                      "onUpdate:modelValue": [
                        _cache[0] || (_cache[0] = ($event) => searchKeyword.value = $event),
                        search
                      ],
                      label: "Search Employee",
                      outlined: "",
                      rounded: "",
                      dense: "",
                      debounce: "500",
                      placeholder: "Enter name"
                    }, {
                      append: withCtx(() => [
                        !searchLoading.value ? (openBlock(), createBlock(QIcon, {
                          key: 0,
                          name: "search"
                        })) : (openBlock(), createBlock(QSpinner, {
                          key: 1,
                          color: "grey",
                          size: "sm"
                        }))
                      ]),
                      default: withCtx(() => [
                        searchKeyword.value ? (openBlock(), createElementBlock("div", _hoisted_2$3, [
                          createVNode(QCard, null, {
                            default: withCtx(() => [
                              createVNode(QList, { separator: "" }, {
                                default: withCtx(() => {
                                  var _a;
                                  return [
                                    !((_a = employees.value) == null ? void 0 : _a.length) ? (openBlock(), createBlock(QItem, { key: 0 }, {
                                      default: withCtx(() => [
                                        createTextVNode(" No Employee record ")
                                      ]),
                                      _: 1
                                    })) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(employees.value, (employee) => {
                                      return openBlock(), createBlock(QItem, {
                                        onClick: ($event) => autoFillEmployee(employee),
                                        key: employee.id,
                                        clickable: ""
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(QItemSection, null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(`${employee.firstname} ${employee.middlename ? employee.middlename.charAt(0) + "." : ""} ${employee.lastname}`), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"]);
                                    }), 128))
                                  ];
                                }),
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
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_3$2, [
                      _hoisted_4$2,
                      createBaseVNode("div", _hoisted_5$2, toDisplayString(cashAdvance.employee_name ? cashAdvance.employee_name : "-------"), 1)
                    ]),
                    createBaseVNode("div", _hoisted_6$2, [
                      _hoisted_7$1,
                      createBaseVNode("div", _hoisted_8$1, toDisplayString(cashAdvance.employee_position ? cashAdvance.employee_position : "-------"), 1)
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_9$1, [
                      createBaseVNode("div", null, [
                        createVNode(QInput, {
                          modelValue: cashAdvance.amount,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => cashAdvance.amount = $event),
                          outlined: "",
                          label: "Amount"
                        }, null, 8, ["modelValue"])
                      ]),
                      createBaseVNode("div", null, [
                        createVNode(QInput, {
                          modelValue: cashAdvance.reason,
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => cashAdvance.reason = $event),
                          filled: "",
                          type: "textarea",
                          outlined: "",
                          label: "Reason"
                        }, null, 8, ["modelValue"])
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(QCardActions, null, {
                  default: withCtx(() => [
                    createVNode(QBtn, {
                      size: "md",
                      padding: "xs md",
                      label: "save",
                      "icon-right": "send",
                      class: "gradient-btn text-white",
                      loading: loading.value,
                      onClick: save
                    }, null, 8, ["loading"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
};
var CashAdvanceButton = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-084981bb"], ["__file", "CashAdvanceButton.vue"]]);
const _sfc_main$4 = {
  __name: "SearchCashAdvance",
  setup(__props) {
    const cashAdvanceStore = useCashAdvanceStore();
    const searchKeyword = ref("");
    const loading = ref(false);
    const search = async () => {
      loading.value = true;
      await cashAdvanceStore.searchCashAdvance(searchKeyword.value);
      loading.value = false;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(QInput, {
          modelValue: searchKeyword.value,
          "onUpdate:modelValue": [
            _cache[0] || (_cache[0] = ($event) => searchKeyword.value = $event),
            search
          ],
          outlined: "",
          dense: "",
          flat: "",
          label: "Search",
          style: { "width": "300px" }
        }, {
          append: withCtx(() => [
            createBaseVNode("div", null, [
              !loading.value ? (openBlock(), createBlock(QIcon, {
                key: 0,
                name: "search"
              })) : (openBlock(), createBlock(QSpinner, {
                key: 1,
                color: "grey",
                size: "sm"
              }))
            ])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
};
var SearchCashAdvance = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "SearchCashAdvance.vue"]]);
const _hoisted_1$3 = {
  class: "row justify-between q-mb-md",
  align: "right"
};
const _hoisted_2$2 = { class: "row q-gutter-md" };
const _sfc_main$3 = {
  __name: "CashAdvanceTable",
  setup(__props) {
    const cashAdvanceStore = useCashAdvanceStore();
    const cashAdvanceRows = computed(() => cashAdvanceStore.cashAdvances);
    const pagination = ref({
      rowsPerPage: 0
    });
    onMounted(async () => {
      await reloadTableData();
    });
    const reloadTableData = async () => {
      try {
        cashAdvanceRows.value = await cashAdvanceStore.fetchCashAdvance();
        console.log("CA", cashAdvanceRows.value);
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }
    };
    const formatFullname = (row) => {
      const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
      const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
      const middlename = row.middlename ? capitalize(row.middlename).charAt(0) + "." : "";
      const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";
      return `${firstname} ${middlename} ${lastname}`.trim();
    };
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP"
      }).format(value);
    };
    const formatDate = (dateTime) => {
      if (!dateTime)
        return " - - ";
      const date = new Date(dateTime);
      if (isNaN(date.getTime()))
        return " - - ";
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    };
    const cashAdvanceColumns = [
      {
        name: "date",
        label: "Date",
        align: "left",
        field: (row) => formatDate(row.created_at)
      },
      {
        name: "name",
        label: "Employee Name",
        align: "left",
        field: (row) => formatFullname(row.employee)
      },
      {
        name: "amount",
        label: "Amount",
        align: "center",
        field: (row) => formatCurrency(row.amount)
      },
      {
        name: "amount",
        label: "Amount",
        align: "center",
        field: "reason"
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$3, [
          createBaseVNode("div", _hoisted_2$2, [
            createVNode(CashAdvanceButton)
          ]),
          createVNode(SearchCashAdvance)
        ]),
        createVNode(QTable, {
          rows: cashAdvanceRows.value,
          columns: cashAdvanceColumns,
          class: "sticky-header",
          "row-key": "name",
          pagination: pagination.value,
          "onUpdate:pagination": _cache[0] || (_cache[0] = ($event) => pagination.value = $event),
          "hide-bottom": ""
        }, null, 8, ["rows", "pagination"])
      ], 64);
    };
  }
};
var CashAdvanceTable = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "CashAdvanceTable.vue"]]);
var AllowanceDeductionPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$2 = { class: "q-gutter-y-sm" };
const _sfc_main$2 = {
  __name: "AllowanceDeductionPage",
  setup(__props) {
    const tab = ref("allowance");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", _hoisted_1$2, [
          createVNode(QTabs, {
            modelValue: tab.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => tab.value = $event),
            "narrow-indicator": "",
            "no-caps": "",
            "inline-label": "",
            dense: "",
            align: "justify",
            class: "gradient-btn"
          }, {
            default: withCtx(() => [
              createVNode(QTab, {
                class: "text-white",
                name: "allowance",
                icon: "account_balance_wallet",
                label: "Allowance"
              }),
              createVNode(QTab, {
                class: "text-white",
                name: "benefits",
                icon: "view_timeline",
                label: "Benefits"
              }),
              createVNode(QTab, {
                class: "text-white",
                name: "uniform",
                icon: "settings_accessibility",
                label: "Uniform"
              }),
              createVNode(QTab, {
                class: "text-white",
                name: "cash-advance",
                icon: "wallet",
                label: "Cash Advance"
              })
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        createVNode(QTabPanels, {
          modelValue: tab.value,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => tab.value = $event),
          animated: ""
        }, {
          default: withCtx(() => [
            createVNode(QTabPanel, { name: "allowance" }, {
              default: withCtx(() => [
                createBaseVNode("div", null, [
                  createVNode(AllowanceTable)
                ])
              ]),
              _: 1
            }),
            createVNode(QTabPanel, { name: "benefits" }, {
              default: withCtx(() => [
                createBaseVNode("div", null, [
                  createVNode(DeductionTable)
                ])
              ]),
              _: 1
            }),
            createVNode(QTabPanel, { name: "uniform" }, {
              default: withCtx(() => [
                createBaseVNode("div", null, [
                  createVNode(UniformTable)
                ])
              ]),
              _: 1
            }),
            createVNode(QTabPanel, { name: "cash-advance" }, {
              default: withCtx(() => [
                createBaseVNode("div", null, [
                  createVNode(CashAdvanceTable)
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
};
var AllowanceDeductionPage = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-2dce1b45"], ["__file", "AllowanceDeductionPage.vue"]]);
var PayslipPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$1 = { align: "right" };
const _hoisted_2$1 = { class: "row q-gutter-lg" };
const _hoisted_3$1 = ["src"];
const _hoisted_4$1 = {
  class: "q-mt-lg",
  style: { "margin-top": "60px" }
};
const _hoisted_5$1 = { class: "text-h5 text-weight-bold elegant-name text-capitalize" };
const _hoisted_6$1 = { align: "center" };
const _sfc_main$1 = {
  __name: "PayslipPage",
  setup(__props) {
    const cards = ref([
      {
        id: 1,
        name: "John D. Doe",
        position: "Admin",
        color: "primary",
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png"
      },
      {
        id: 2,
        name: "Jane Doe",
        position: "Admin",
        color: "primary",
        avatar: "https://cdn.quasar.dev/img/avatar2.jpg"
      },
      {
        id: 3,
        name: "Sam Smith",
        position: "Admin",
        color: "primary",
        avatar: "https://cdn.quasar.dev/img/avatar1.jpg"
      },
      {
        id: 4,
        name: "Chris Evans",
        position: "Admin",
        color: "primary",
        avatar: "https://cdn.quasar.dev/img/avatar4.jpg"
      },
      {
        id: 5,
        name: "Alex Doesss",
        position: "Admin",
        color: "primary",
        avatar: "https://cdn.quasar.dev/img/avatar6.jpg"
      },
      {
        id: 6,
        name: "John D. Doe",
        position: "Admin",
        color: "primary",
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png"
      },
      {
        id: 7,
        name: "Jane Doe",
        position: "Admin",
        color: "primary",
        avatar: "https://cdn.quasar.dev/img/avatar2.jpg"
      },
      {
        id: 8,
        name: "Sam Smith",
        position: "Admin",
        color: "primary",
        avatar: "https://cdn.quasar.dev/img/avatar1.jpg"
      },
      {
        id: 9,
        name: "Chris Evans",
        position: "Admin",
        color: "primary",
        avatar: "https://cdn.quasar.dev/img/avatar4.jpg"
      },
      {
        id: 10,
        name: "Alex Doe",
        position: "Admin",
        color: "primary",
        avatar: "https://cdn.quasar.dev/img/avatar6.jpg"
      }
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$1, [
          createVNode(QInput, {
            class: "q-pb-lg",
            outlined: "",
            placeholder: "Search",
            debounce: "1000",
            flat: "",
            dense: "",
            rounded: "",
            style: { "width": "100%", "max-width": "600px" }
          }, {
            append: withCtx(() => [
              createVNode(QIcon, { name: "search" })
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_2$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(cards.value, (card) => {
            return openBlock(), createBlock(QIntersection, {
              key: card.id,
              class: "q-ma-md"
            }, {
              default: withCtx(() => [
                createVNode(QCard, {
                  class: "q-pa-md q-mt-lg user-card",
                  style: { "box-shadow": "0px 6px 14px rgba(0, 0, 0, 0.1)", "border-radius": "12px", "background": "linear-gradient(135deg, #2c3e50, #4ca1af)" }
                }, {
                  default: withCtx(() => [
                    createVNode(QCardSection, {
                      class: "text-center q-pa-md",
                      style: { "position": "relative" }
                    }, {
                      default: withCtx(() => [
                        createBaseVNode("div", null, [
                          createVNode(QAvatar, {
                            size: "80px",
                            color: "primary",
                            "text-color": "white",
                            class: "q-ma-lg",
                            style: { "margin": "0 auto", "position": "absolute", "top": "-40px", "left": "50%", "transform": "translateX(-50%)" }
                          }, {
                            default: withCtx(() => [
                              createBaseVNode("img", {
                                src: card.avatar
                              }, null, 8, _hoisted_3$1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        createBaseVNode("div", _hoisted_4$1, [
                          createBaseVNode("div", _hoisted_5$1, toDisplayString(card.name), 1),
                          createVNode(QChip, {
                            "text-color": "white",
                            class: "q-mt-sm elegant-chip",
                            style: { "background-color": "#3b82f6", "font-size": "14px", "padding": "5px 10px" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(card.position), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(QChip, {
                            outline: "",
                            square: "",
                            color: "cyan-12",
                            class: "q-mt-sm elegant-chip"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Regular ")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(QSeparator, { class: "q-ma-sm" }),
                    createBaseVNode("div", _hoisted_6$1, [
                      createVNode(QBtn, {
                        padding: "sm md",
                        label: "Open Payslip",
                        size: "md",
                        class: "gradient-btn text-darrk"
                      })
                    ])
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1024);
          }), 128))
        ])
      ], 64);
    };
  }
};
var PayslipPage = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-21c1201b"], ["__file", "PayslipPage.vue"]]);
var PayrollPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-0272f827"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "q-pa-md q-gutter-sm flex flex-column items-center" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-bold" }, "Dashboard", -1));
const _hoisted_3 = { class: "q-pa-md q-gutter-sm flex flex-column items-center" };
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-bold text-lg" }, "Employees", -1));
const _hoisted_5 = { class: "q-pa-md q-gutter-sm flex flex-column items-center" };
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-bold text-lg" }, "Attendance", -1));
const _hoisted_7 = { class: "q-pa-md q-gutter-sm flex flex-column items-center" };
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-bold text-lg" }, "Allowances & Deductions", -1));
const _hoisted_9 = { class: "q-pa-sm q-gutter-sm flex flex-column items-center" };
const _hoisted_10 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-bold text-lg" }, "Payslip", -1));
const _sfc_main = {
  __name: "PayrollPage",
  setup(__props) {
    ref();
    ref("");
    const tab = ref("dashboard");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, {
        class: "elegant-container",
        flat: ""
      }, {
        default: withCtx(() => [
          createVNode(QTabs, {
            modelValue: tab.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => tab.value = $event),
            dense: "",
            outline: "",
            flat: "",
            "no-caps": "",
            "inline-label": "",
            class: "user-tab justify-center q-ma-md",
            align: "justify",
            "active-color": "teal",
            "indicator-class": "q-tab-indicator-green"
          }, {
            default: withCtx(() => [
              createVNode(QTab, { name: "dashboard" }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_1, [
                    createVNode(QIcon, {
                      name: "insert_chart",
                      size: "md",
                      class: normalizeClass(tab.value === "dashboard" ? "text-teal" : "text-grey-7")
                    }, null, 8, ["class"]),
                    _hoisted_2
                  ])
                ]),
                _: 1
              }),
              createVNode(QTab, { name: "employees" }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_3, [
                    createVNode(QIcon, {
                      name: "group",
                      size: "md",
                      class: normalizeClass(tab.value === "employees" ? "text-teal" : "text-grey-7")
                    }, null, 8, ["class"]),
                    _hoisted_4
                  ])
                ]),
                _: 1
              }),
              createVNode(QTab, { name: "attendance" }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_5, [
                    createVNode(QIcon, {
                      name: "access_time",
                      size: "md",
                      class: normalizeClass(tab.value === "attendance" ? "text-teal" : "text-grey-7")
                    }, null, 8, ["class"]),
                    _hoisted_6
                  ])
                ]),
                _: 1
              }),
              createVNode(QTab, { name: "allowances" }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_7, [
                    createVNode(QIcon, {
                      name: "add_circle_outline",
                      size: "md",
                      class: normalizeClass(tab.value === "allowances" ? "text-teal" : "text-grey-7")
                    }, null, 8, ["class"]),
                    _hoisted_8
                  ])
                ]),
                _: 1
              }),
              createVNode(QTab, { name: "payslip" }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_9, [
                    createVNode(QIcon, {
                      name: "payment",
                      size: "md",
                      class: normalizeClass(tab.value === "payslip" ? "text-teal" : "text-grey-7")
                    }, null, 8, ["class"]),
                    _hoisted_10
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue"]),
          createVNode(QTabPanels, {
            modelValue: tab.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => tab.value = $event),
            animated: "",
            style: { "background-color": "#f7f8fc" }
          }, {
            default: withCtx(() => [
              createVNode(QTabPanel, { name: "dashboard" }, {
                default: withCtx(() => [
                  createVNode(DashboardPage)
                ]),
                _: 1
              }),
              createVNode(QTabPanel, { name: "employees" }, {
                default: withCtx(() => [
                  createVNode(EmployeeesPage)
                ]),
                _: 1
              }),
              createVNode(QTabPanel, { name: "attendance" }, {
                default: withCtx(() => [
                  createVNode(AttendancePage)
                ]),
                _: 1
              }),
              createVNode(QTabPanel, { name: "allowances" }, {
                default: withCtx(() => [
                  createVNode(AllowanceDeductionPage)
                ]),
                _: 1
              }),
              createVNode(QTabPanel, { name: "payslip" }, {
                default: withCtx(() => [
                  createVNode(PayslipPage)
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
var PayrollPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0272f827"], ["__file", "PayrollPage.vue"]]);
export { PayrollPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF5cm9sbFBhZ2UuNTZiZmFjNDkuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL3BheXJvbGwvcGFuZWwtc2VjdGlvbi9kYXNoYm9hcmQvc2VjdGlvbi9Ub3RhbEVtcGxveWVlU2FsYXJ5QmVuZWZpdHMudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvcGF5cm9sbC9wYW5lbC1zZWN0aW9uL2Rhc2hib2FyZC9zZWN0aW9uL0JyYW5jaEVtcGxveWVlQ2FyZC52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9wYXlyb2xsL3BhbmVsLXNlY3Rpb24vZGFzaGJvYXJkL3NlY3Rpb24vV2FyZWhvdXNlRW1wbG95ZUNhcmQudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvcGF5cm9sbC9wYW5lbC1zZWN0aW9uL2VtcGxveWVlcy9zZWN0aW9uL1NlYXJjaEVtcGxveWVlLnZ1ZSIsIi4uLy4uLy4uL3NyYy9zdG9yZXMvZW1wbG95bWVudC10eXBlLmpzIiwiLi4vLi4vLi4vc3JjL2Fzc2V0cy9JRExvZ28ucG5nIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvcGF5cm9sbC9wYW5lbC1zZWN0aW9uL2VtcGxveWVlcy9zZWN0aW9uL1RhYmxlU2VjdGlvbi52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9wYXlyb2xsL3BhbmVsLXNlY3Rpb24vZW1wbG95ZWVzL3NlY3Rpb24vUmVnaXN0ZXJFbXBsb3llZS52dWUiLCIuLi8uLi8uLi9zcmMvc3RvcmVzL2Rlc2lnbmF0aW9uLmpzIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvcGF5cm9sbC9wYW5lbC1zZWN0aW9uL2VtcGxveWVlcy9zZWN0aW9uL0Rlc2lnbmF0aW9uRW1wbG95ZWUudnVlIiwiLi4vLi4vLi4vc3JjL3N0b3Jlcy9kdHIuanMiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9wYXlyb2xsL3BhbmVsLXNlY3Rpb24vYXR0ZW5kYW5jZS9zZWN0aW9ucy9kdHItb3ZlcnZpZXcvT3ZlcnRpbWVCdXR0b24udnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvcGF5cm9sbC9wYW5lbC1zZWN0aW9uL2F0dGVuZGFuY2Uvc2VjdGlvbnMvZHRyLW92ZXJ2aWV3L1NlYXJjaERUUi52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9wYXlyb2xsL3BhbmVsLXNlY3Rpb24vYXR0ZW5kYW5jZS9zZWN0aW9ucy9kdHItb3ZlcnZpZXcvRWRpdERUUi52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9wYXlyb2xsL3BhbmVsLXNlY3Rpb24vYXR0ZW5kYW5jZS9zZWN0aW9ucy9kdHItb3ZlcnZpZXcvQXR0ZW5kYW5jZVRhYmxlLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL3BheXJvbGwvcGFuZWwtc2VjdGlvbi9hdHRlbmRhbmNlL3NlY3Rpb25zL2F0dGVuZGFuY2Utc3VtbWFyeS9BdHRlbmRhbmNlU3VtbWFyeS52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9wYXlyb2xsL3BhbmVsLXNlY3Rpb24vYXR0ZW5kYW5jZS9BdHRlbmRhbmNlUGFnZS52dWUiLCIuLi8uLi8uLi9zcmMvc3RvcmVzL2FsbG93YW5jZS5qcyIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL3BheXJvbGwvcGFuZWwtc2VjdGlvbi9hbGxvd2FuY2UtZGVkdWN0aW9uL2FsbG93YW5jZS1zZWN0aW9uL0FkZEFsbG93YW5jZS52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9wYXlyb2xsL3BhbmVsLXNlY3Rpb24vYWxsb3dhbmNlLWRlZHVjdGlvbi9hbGxvd2FuY2Utc2VjdGlvbi9TZWFyY2hBbGxvd2FuY2UudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvcGF5cm9sbC9wYW5lbC1zZWN0aW9uL2FsbG93YW5jZS1kZWR1Y3Rpb24vYWxsb3dhbmNlLXNlY3Rpb24vQWxsb3dhbmNlVGFibGUudnVlIiwiLi4vLi4vLi4vc3JjL3N0b3Jlcy9iZW5lZml0LmpzIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvcGF5cm9sbC9wYW5lbC1zZWN0aW9uL2FsbG93YW5jZS1kZWR1Y3Rpb24vYmVuZWZpdHMtc2VjdGlvbi9BZGREZWR1Y3Rpb24udnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvcGF5cm9sbC9wYW5lbC1zZWN0aW9uL2FsbG93YW5jZS1kZWR1Y3Rpb24vYmVuZWZpdHMtc2VjdGlvbi9TZWFyY2hCZW5lZml0LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL3BheXJvbGwvcGFuZWwtc2VjdGlvbi9hbGxvd2FuY2UtZGVkdWN0aW9uL2JlbmVmaXRzLXNlY3Rpb24vQmVuZWZpdHNUYWJsZS52dWUiLCIuLi8uLi8uLi9zcmMvc3RvcmVzL3VuaWZvcm0uanMiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9wYXlyb2xsL3BhbmVsLXNlY3Rpb24vYWxsb3dhbmNlLWRlZHVjdGlvbi91bmlmb3JtLXNlY3Rpb24vQWRkVW5pZm9ybS52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9wYXlyb2xsL3BhbmVsLXNlY3Rpb24vYWxsb3dhbmNlLWRlZHVjdGlvbi91bmlmb3JtLXNlY3Rpb24vVW5pZm9ybVRhYmxlLnZ1ZSIsIi4uLy4uLy4uL3NyYy9zdG9yZXMvY2FzaC1hZHZhbmNlLmpzIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvcGF5cm9sbC9wYW5lbC1zZWN0aW9uL2FsbG93YW5jZS1kZWR1Y3Rpb24vY2FzaC1hZHZhbmNlLXNlY3Rpb24vQ2FzaEFkdmFuY2VCdXR0b24udnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvcGF5cm9sbC9wYW5lbC1zZWN0aW9uL2FsbG93YW5jZS1kZWR1Y3Rpb24vY2FzaC1hZHZhbmNlLXNlY3Rpb24vU2VhcmNoQ2FzaEFkdmFuY2UudnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvcGF5cm9sbC9wYW5lbC1zZWN0aW9uL2FsbG93YW5jZS1kZWR1Y3Rpb24vY2FzaC1hZHZhbmNlLXNlY3Rpb24vQ2FzaEFkdmFuY2VUYWJsZS52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9wYXlyb2xsL3BhbmVsLXNlY3Rpb24vYWxsb3dhbmNlLWRlZHVjdGlvbi9BbGxvd2FuY2VEZWR1Y3Rpb25QYWdlLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL3BheXJvbGwvcGFuZWwtc2VjdGlvbi9wYXlzbGlwL1BheXNsaXBQYWdlLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL3BheXJvbGwvUGF5cm9sbFBhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPHEtY2FyZCBjbGFzcz1cInEtcGEtbWQgcS1tYi1tZCBxLW10LXNtIHRleHQtY2VudGVyIHVzZXItY2FyZFwiPlxuICAgIDxxLWNhcmQtc2VjdGlvbiBob3Jpem9udGFsPlxuICAgICAgPCEtLSBUb3RhbCBFbXBsb3llZSBTZWN0aW9uIC0tPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbCBxLXBhLW1kXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+VG90YWwgRW1wbG95ZWU8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2FwdGlvbiB0ZXh0LWdyZXktNlwiPlRvdGFsIE51bWJlciBPZiBFbXBsb3llZXM8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDMgdGV4dC1wcmltYXJ5IHEtbXktc21cIj57eyBlbXBsb3llZXMubGVuZ3RoIH19PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNhcHRpb24gdGV4dC1ncmV5LTdcIj5FbXBsb3llZXM8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8cS1zZXBhcmF0b3IgdmVydGljYWwgLz5cblxuICAgICAgPCEtLSBTYWxhcnkgUGVyIE1vbnRoIFNlY3Rpb24gLS0+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sIHEtcGEtbWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5TYWxhcnkgUGVyIE1vbnRoPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNhcHRpb24gdGV4dC1ncmV5LTZcIj5cbiAgICAgICAgICBDdXJyZW50IFRvdGFsIFNhbGFyeSBQZXIgTW9udGhcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWgzIHRleHQtcG9zaXRpdmUgcS1teS1zbVwiPuKCsSA1Miw5NjI8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2FwdGlvbiB0ZXh0LWdyZXktN1wiPlBIUDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxxLXNlcGFyYXRvciB2ZXJ0aWNhbCAvPlxuXG4gICAgICA8IS0tIFByb3ZpZGVudCBGdW5kIFNlY3Rpb24gLS0+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sIHEtcGEtbWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5CZW5lZml0cyBGdW5kPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNhcHRpb24gdGV4dC1ncmV5LTZcIj5Gb3IgYWxsIEVtcGxveWVlcyBQZXIgTW9udGg8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDMgdGV4dC13YXJuaW5nIHEtbXktc21cIj7igrEgMjAwLDEyMzwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jYXB0aW9uIHRleHQtZ3JleS03XCI+UEhQPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICA8L3EtY2FyZD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VFbXBsb3llZVN0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvZW1wbG95ZWVcIjtcbmltcG9ydCB7IGNvbXB1dGVkLCBvbk1vdW50ZWQgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IGVtcGxveWVlU3RvcmUgPSB1c2VFbXBsb3llZVN0b3JlKCk7XG5jb25zdCBlbXBsb3llZXMgPSBjb21wdXRlZCgoKSA9PiBlbXBsb3llZVN0b3JlLmVtcGxveWVlcyk7XG5cbm9uTW91bnRlZChhc3luYyAoKSA9PiB7XG4gIGF3YWl0IGZldGNoRW1wbG95ZWVEYXRhKCk7XG59KTtcblxuY29uc3QgZmV0Y2hFbXBsb3llZURhdGEgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgZW1wbG95ZWVzLnZhbHVlID0gYXdhaXQgZW1wbG95ZWVTdG9yZS5mZXRjaEFsbEVtcGxveWVlKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coXCJlcnJvciBmZXRjaGluZyBlbXBsb3llZTogXCIsIGVycm9yKTtcbiAgfVxufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XG4uZWxlZ2FudC1jb250YWluZXIge1xuICBiYWNrZ3JvdW5kOiAjZjdmOGZjO1xuICBwYWRkaW5nOiAycmVtO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG59XG4ubXktdmlydHVhbC1zY3JvbGwge1xuICB3aGl0ZS1zcGFjZTogbm93cmFwOyAvKiBFbnN1cmUgaG9yaXpvbnRhbCBzY3JvbGwgaXMgbWFpbnRhaW5lZCAqL1xufVxuXG4udXNlci1jYXJkIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMzMztcbiAgYm94LXNoYWRvdzogMHB4IDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcbn1cbi51c2VyLXRhYiB7XG4gIGhlaWdodDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogbm9uZTtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICMzMzM7XG4gIGJveC1zaGFkb3c6IDBweCAzcHggN3B4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XG59XG5cbi51c2VyLWJ1dHRvbiB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xufVxuXG4udXNlci1idXR0b246aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTVweCk7XG4gIGJveC1zaGFkb3c6IDBweCA2cHggMTVweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xufVxuXG4vKiBDdXN0b20gc3R5bGluZyBmb3IgZ3JpZCAqL1xuLnEtdGFibGUgLnEtcGEtbWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1zaXplOiAxLjJyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5jYXJkLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpbGwsIG1pbig3MHB4LCAxZnIpLCBtYXgoMTUwcHgsIDFmcikpO1xuICBnYXA6IDIwcHg7XG59XG4ubXktY2FyZCB7XG4gIG1hcmdpbjogOHB4O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBib3gtc2hhZG93OiAwIDRweCA4cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycztcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB2ZXJ0aWNhbC1hbGlnbjogdG9wOyAvKiBBbGlnbiBjYXJkcyBhdCB0aGUgdG9wICovXG4gIHdpZHRoOiBhdXRvO1xuICBtaW4td2lkdGg6IDE1MHB4OyAvKiBPcHRpb25hbDogU2V0IGEgbWluaW11bSB3aWR0aCBpZiBuZWVkZWQgKi9cbiAgbWFyZ2luLXJpZ2h0OiAxMHB4OyAvKiBPcHRpb25hbDogQWRkIHNwYWNlIGJldHdlZW4gY2FyZHMgKi9cbn1cblxuLm15LXZpcnR1YWwtc2Nyb2xsIHtcbiAgZGlzcGxheTogZmxleDtcbiAgb3ZlcmZsb3cteDogYXV0bztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgcGFkZGluZzogMTZweDtcbn1cblxuLm15LXZpcnR1YWwtc2Nyb2xsIC5xLWNhcmQge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7XG59XG5cbi5teS1jZW50ZXItdGV4dCB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWNhcmQgY2xhc3M9XCJ1c2VyLWNhcmRcIiBzdHlsZT1cImhlaWdodDogMzAwcHhcIj5cbiAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+QnJhbmNoIEVtcGxveWVlPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2FwdGlvbiB0ZXh0LWdyZXktNlwiPlxuICAgICAgICAgICAgVG90YWwgTnVtYmVyIG9mIEJyYW5jaCA6IHt7IGJyYW5jaGVzLmxlbmd0aCB9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLSA8ZGl2PlxuICAgICAgICAgIDxxLWlucHV0IG91dGxpbmVkIGRlbnNlPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwic2VhcmNoXCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgPC9kaXY+IC0tPlxuICAgICAgPC9kaXY+XG4gICAgICA8IS0tIDxkaXYgY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMlwiPkRlcGFydG1lbnQgT3IgR3JhZGUgV2lzZTwvZGl2PiAtLT5cbiAgICA8L3EtY2FyZC1zZWN0aW9uPlxuXG4gICAgPCEtLSBHcmlkIExheW91dCBmb3IgR3JhZGUgRGF0YSAtLT5cbiAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS12aXJ0dWFsLXNjcm9sbFxuICAgICAgICA6aXRlbXM9XCJicmFuY2hlc1wiXG4gICAgICAgIHNjcm9sbC10YXJnZXQ9XCJib2R5XCJcbiAgICAgICAgdmlydHVhbC1zY3JvbGwtaG9yaXpvbnRhbFxuICAgICAgICBjbGFzcz1cIm15LXZpcnR1YWwtc2Nyb2xsXCJcbiAgICAgICAgYWxpZ249XCJjZW50ZXJcIlxuICAgICAgPlxuICAgICAgICA8dGVtcGxhdGUgdi1zbG90PVwieyBpdGVtOiBicmFuY2gsIGluZGV4IH1cIj5cbiAgICAgICAgICA8cS1jYXJkIGZsYXQgYm9yZGVyZWQgZGVuc2UgOmtleT1cImluZGV4XCIgY2xhc3M9XCJteS1jYXJkXCI+XG4gICAgICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJiZy1ncmV5LTJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUyXCI+e3sgYnJhbmNoLm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgICA8cS1zZXBhcmF0b3IgLz5cbiAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDYgdGV4dC1ncmV5LTZcIj5cbiAgICAgICAgICAgICAgICB7eyBicmFuY2g/LmJyYW5jaF9lbXBsb3llZT8ubGVuZ3RoIH19XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDwvcS12aXJ0dWFsLXNjcm9sbD5cbiAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICA8L3EtY2FyZD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VCcmFuY2hlc1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvYnJhbmNoXCI7XG5pbXBvcnQgeyBjb21wdXRlZCwgb25Nb3VudGVkLCByZWYsIHdhdGNoIH0gZnJvbSBcInZ1ZVwiO1xuXG5jb25zdCBicmFuY2hTdG9yZSA9IHVzZUJyYW5jaGVzU3RvcmUoKTtcbmNvbnN0IGJyYW5jaGVzID0gY29tcHV0ZWQoKCkgPT4gYnJhbmNoU3RvcmUuYnJhbmNoZXMpO1xuXG5jb25zb2xlLmxvZyhcImJyYW5jaFdpdGhFbXBsb3llXCIsIGJyYW5jaGVzLnZhbHVlKTtcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgYXdhaXQgZmV0Y2hCcmFuY2hEYXRhKCk7XG59KTtcblxuY29uc3QgZmV0Y2hCcmFuY2hEYXRhID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGJyYW5jaGVzLnZhbHVlID0gYXdhaXQgYnJhbmNoU3RvcmUuZmV0Y2hCcmFuY2hXaXRoRW1wbG95ZWUoKTtcbiAgICBjb25zb2xlLmxvZyhcImJyYW5jaGVzXCIsIGJyYW5jaGVzLnZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhcImVycm9yIGZldGNoaW5nIGJyYW5jaDogXCIsIGVycm9yKTtcbiAgfVxufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XG4udXNlci1jYXJkIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMzMztcbiAgYm94LXNoYWRvdzogMHB4IDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcbn1cblxuLm15LWNhcmQge1xuICBtYXJnaW46IDhweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgYm94LXNoYWRvdzogMCA0cHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnM7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgdmVydGljYWwtYWxpZ246IHRvcDsgLyogQWxpZ24gY2FyZHMgYXQgdGhlIHRvcCAqL1xuICB3aWR0aDogYXV0bztcbiAgbWluLXdpZHRoOiAxNTBweDsgLyogT3B0aW9uYWw6IFNldCBhIG1pbmltdW0gd2lkdGggaWYgbmVlZGVkICovXG4gIG1hcmdpbi1yaWdodDogMTBweDsgLyogT3B0aW9uYWw6IEFkZCBzcGFjZSBiZXR3ZWVuIGNhcmRzICovXG59XG5cbi5teS12aXJ0dWFsLXNjcm9sbCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG92ZXJmbG93LXg6IGF1dG87XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHBhZGRpbmc6IDE2cHg7XG59XG5cbi5teS12aXJ0dWFsLXNjcm9sbCAucS1jYXJkIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xufVxuXG4ubXktY2VudGVyLXRleHQge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1jYXJkIGNsYXNzPVwidXNlci1jYXJkXCIgc3R5bGU9XCJoZWlnaHQ6IDMwMHB4XCI+XG4gICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPldhcmVob3VzZSBFbXBsb3llZTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNhcHRpb24gdGV4dC1ncmV5LTZcIj5cbiAgICAgICAgICAgIFRvdGFsIE51bWJlciBvZiBXYXJlaG91c2UgOiB7eyB3YXJlaG91c2VzLmxlbmd0aCB9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLSA8ZGl2PlxuICAgICAgICAgIDxxLWlucHV0IG91dGxpbmVkIGRlbnNlPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwic2VhcmNoXCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgPC9kaXY+IC0tPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDwhLS0gPGRpdiBjbGFzcz1cInRleHQtc3VidGl0bGUyXCI+RGVwYXJ0bWVudCBPciBHcmFkZSBXaXNlPC9kaXY+IC0tPlxuICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICA8IS0tIEdyaWQgTGF5b3V0IGZvciBHcmFkZSBEYXRhIC0tPlxuICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLXZpcnR1YWwtc2Nyb2xsXG4gICAgICAgIDppdGVtcz1cIndhcmVob3VzZXNcIlxuICAgICAgICBzY3JvbGwtdGFyZ2V0PVwiYm9keVwiXG4gICAgICAgIHZpcnR1YWwtc2Nyb2xsLWhvcml6b250YWxcbiAgICAgICAgY2xhc3M9XCJteS12aXJ0dWFsLXNjcm9sbFwiXG4gICAgICA+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q9XCJ7IGl0ZW06IHdhcmVob3VzZSwgaW5kZXggfVwiPlxuICAgICAgICAgIDxxLWNhcmRcbiAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgIGJvcmRlcmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgOmtleT1cImluZGV4XCJcbiAgICAgICAgICAgIGNsYXNzPVwibXktY2FyZFwiXG4gICAgICAgICAgICBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jazsgd2lkdGg6IGF1dG9cIlxuICAgICAgICAgICAgYWxpZ249XCJjZW50ZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cImJnLWdyZXktMlwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1zdWJ0aXRsZTJcIj57eyB3YXJlaG91c2UubmFtZSB9fTwvZGl2PlxuICAgICAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICAgIDxxLXNlcGFyYXRvciAvPlxuICAgICAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNiB0ZXh0LWdyZXktNlwiPlxuICAgICAgICAgICAgICAgIHt7IHdhcmVob3VzZT8ud2FyZWhvdXNlX2VtcGxveWVlPy5sZW5ndGggfX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDwvcS1jYXJkPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgPC9xLXZpcnR1YWwtc2Nyb2xsPlxuICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gIDwvcS1jYXJkPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZVdhcmVob3VzZXNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3dhcmVob3VzZVwiO1xuaW1wb3J0IHsgY29tcHV0ZWQsIG9uTW91bnRlZCB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3Qgd2FyZWhvdXNlU3RvcmUgPSB1c2VXYXJlaG91c2VzU3RvcmUoKTtcbmNvbnN0IHdhcmVob3VzZXMgPSBjb21wdXRlZCgoKSA9PiB3YXJlaG91c2VTdG9yZS53YXJlaG91c2VzKTtcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgYXdhaXQgZmV0aGN3YXJlaG91c2VEYXRhKCk7XG59KTtcblxuY29uc3QgZmV0aGN3YXJlaG91c2VEYXRhID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIHdhcmVob3VzZXMudmFsdWUgPSBhd2FpdCB3YXJlaG91c2VTdG9yZS5mZXRjaFdhcmVob3VzZVdpdGhFbXBsb3llZSgpO1xuICAgIGNvbnNvbGUubG9nKFwid2FyZWhvdXNlc1wiLCB3YXJlaG91c2VzLnZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhcImVycm9yIGZldGNoaW5nIHJlY2lwZTogXCIsIGVycm9yKTtcbiAgfVxufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XG4udXNlci1jYXJkIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMzMztcbiAgYm94LXNoYWRvdzogMHB4IDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcbn1cblxuLm15LWNhcmQge1xuICBtYXJnaW46IDhweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgYm94LXNoYWRvdzogMCA0cHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnM7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgdmVydGljYWwtYWxpZ246IHRvcDsgLyogQWxpZ24gY2FyZHMgYXQgdGhlIHRvcCAqL1xuICB3aWR0aDogYXV0bztcbiAgbWluLXdpZHRoOiAxNTBweDsgLyogT3B0aW9uYWw6IFNldCBhIG1pbmltdW0gd2lkdGggaWYgbmVlZGVkICovXG4gIG1hcmdpbi1yaWdodDogMTBweDsgLyogT3B0aW9uYWw6IEFkZCBzcGFjZSBiZXR3ZWVuIGNhcmRzICovXG59XG5cbi5teS12aXJ0dWFsLXNjcm9sbCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG92ZXJmbG93LXg6IGF1dG87XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHBhZGRpbmc6IDE2cHg7XG59XG5cbi5teS12aXJ0dWFsLXNjcm9sbCAucS1jYXJkIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xufVxuXG4ubXktY2VudGVyLXRleHQge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxxLWlucHV0XG4gICAgICB2LW1vZGVsPVwic2VhcmNoS2V5d29yZFwiXG4gICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwic2VhcmNoXCJcbiAgICAgIG91dGxpbmVkXG4gICAgICBkZW5zZVxuICAgICAgZmxhdFxuICAgICAgbGFiZWw9XCJTZWFyY2hcIlxuICAgICAgZGVib3VuY2U9XCIxMDAwXCJcbiAgICAgIHN0eWxlPVwid2lkdGg6IDMwMHB4XCJcbiAgICA+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cS1pY29uIHYtaWY9XCIhbG9hZGluZ1wiIG5hbWU9XCJzZWFyY2hcIiAvPlxuICAgICAgICAgIDxxLXNwaW5uZXIgdi1lbHNlIGNvbG9yPVwiZ3JleVwiIHNpemU9XCJzbVwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L3EtaW5wdXQ+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZUVtcGxveWVlU3RvcmUgfSBmcm9tIFwic3RvcmVzL2VtcGxveWVlXCI7XG5pbXBvcnQgeyBjb21wdXRlZCwgcmVmIH0gZnJvbSBcInZ1ZVwiO1xuXG5jb25zdCBlbXBsb3llZVN0b3JlID0gdXNlRW1wbG95ZWVTdG9yZSgpO1xuY29uc3Qgc2VhcmNoS2V5d29yZCA9IHJlZihcIlwiKTtcbmNvbnN0IGxvYWRpbmcgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBzZWFyY2ggPSBhc3luYyAoKSA9PiB7XG4gIGxvYWRpbmcudmFsdWUgPSB0cnVlO1xuICBhd2FpdCBlbXBsb3llZVN0b3JlLnNlYXJjaEVtcGxveWVlKHNlYXJjaEtleXdvcmQudmFsdWUpO1xuICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD48L3N0eWxlPlxuIiwiaW1wb3J0IHsgZGVmaW5lU3RvcmUgfSBmcm9tIFwicGluaWFcIjtcbmltcG9ydCB7IGFwaSB9IGZyb20gXCJzcmMvYm9vdC9heGlvc1wiO1xuaW1wb3J0IHsgcmVmIH0gZnJvbSBcInZ1ZVwiO1xuXG5leHBvcnQgY29uc3QgdXNlRW1wbG95bWVudFR5cGVTdG9yZSA9IGRlZmluZVN0b3JlKFwiZW1wbG95bWVudFR5cGVcIiwgKCkgPT4ge1xuICBjb25zdCBlbXBsb3ltZW50VHlwZSA9IHJlZihudWxsKTtcblxuICBjb25zdCBmZXRjaEVtcGxveW1lbnRUeXBlID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChcIi9hcGkvZW1wbG95bWVudC10eXBlc1wiKTtcbiAgICBlbXBsb3ltZW50VHlwZS52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICBjb25zb2xlLmxvZyhcIkVtcGxveWVtZW50cmVzcG9uc2VcIiwgcmVzcG9uc2UuZGF0YSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBlbXBsb3ltZW50VHlwZSxcbiAgICBmZXRjaEVtcGxveW1lbnRUeXBlLFxuICB9O1xufSk7XG4iLCJleHBvcnQgZGVmYXVsdCBcIl9fVklURV9BU1NFVF9fNzZlNTY0ZmRfX1wiIiwiPHRlbXBsYXRlPlxuICA8IS0tIG1heC13aWR0aDogMTAwMHB4IC0tPlxuICA8ZGl2IHN0eWxlPVwid2lkdGg6IDEwMCVcIj5cbiAgICA8cS10YWJsZVxuICAgICAgdGl0bGU9XCJFbXBsb3llZXNcIlxuICAgICAgOnJvd3M9XCJlbXBsb3llZVJvd3NcIlxuICAgICAgOmNvbHVtbnM9XCJlbXBsb3llZUNvbHVtbnNcIlxuICAgICAgcm93LWtleT1cImZ1bGxuYW1lXCJcbiAgICAgIGhpZGUtYm90dG9tXG4gICAgICB2LW1vZGVsOnBhZ2luYXRpb249XCJwYWdpbmF0aW9uXCJcbiAgICAgIGNsYXNzPVwiY3VzdG9tLXRhYmxlXCJcbiAgICAgIHN0eWxlPVwibWF4LXdpZHRoOiAxMDAlOyBoZWlnaHQ6IDQ2MHB4XCJcbiAgICA+XG4gICAgICA8IS0tIHN0eWxlPVwiaGVpZ2h0OiA0NjBweFwiIC0tPlxuICAgICAgPCEtLSB3aWR0aDogMTAwMHB4OyAtLT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6dG9wLXJpZ2h0PlxuICAgICAgICA8U2VhcmNoRW1wbG95ZWUgLz5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC1mdWxsbmFtZT1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIGtleT1cImZ1bGxuYW1lXCIgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1zdWJ0aXRsZTJcIj5cbiAgICAgICAgICAgIHt7IGZvcm1hdEZ1bGxuYW1lKHByb3BzLnJvdykgfX1cbiAgICAgICAgICAgIDxxLXRvb2x0aXAgY2xhc3M9XCJiZy1ibHVlLWdyZXktOFwiIDpvZmZzZXQ9XCJbMTAsIDEwXVwiPlxuICAgICAgICAgICAgICBFZGl0IEVtcGxveWVlIE5hbWVcbiAgICAgICAgICAgIDwvcS10b29sdGlwPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxxLXBvcHVwLWVkaXRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJwcm9wcy5yb3dcIlxuICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIlxuICAgICAgICAgICAgICAodmFsKSA9PiB1cGRhdGVFbXBsb3llZUZ1bGxuYW1lKHByb3BzLnJvdywgdmFsKVxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgIGJ1dHRvbnNcbiAgICAgICAgICAgIHRpdGxlPVwiRWRpdCBFbXBsb3llZSBGdWxsIE5hbWVcIlxuICAgICAgICAgICAgdi1zbG90PVwieyB2YWx1ZSwgc2V0IH1cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXItbWRcIj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzcz1cInRleHQtY2FwaXRhbGl6ZVwiXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cInZhbHVlLmZpcnN0bmFtZVwiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJGaXJzdCBOYW1lXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICBjb2xvcj1cInBvc2l0aXZlXCJcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIGF1dG9mdWNvc1xuICAgICAgICAgICAgICAgIEBrZXl1cC5lbnRlcj1cInNldCh2YWx1ZSlcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIGNsYXNzPVwidGV4dC1jYXBpdGFsaXplXCJcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwidmFsdWUubWlkZGxlbmFtZVwiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJNaWRkbGUgTmFtZVwiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgY29sb3I9XCJwb3NpdGl2ZVwiXG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBhdXRvZnVjb3NcbiAgICAgICAgICAgICAgICBAa2V5dXAuZW50ZXI9XCJzZXQodmFsdWUpXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzcz1cInRleHQtY2FwaXRhbGl6ZVwiXG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cInZhbHVlLmxhc3RuYW1lXCJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIkxhc3QgTmFtZVwiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgY29sb3I9XCJwb3NpdGl2ZVwiXG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBhdXRvZnVjb3NcbiAgICAgICAgICAgICAgICBAa2V5dXAuZW50ZXI9XCJzZXQodmFsdWUpXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvcS1wb3B1cC1lZGl0PlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtZW1wbG95bWVudFR5cGU9XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgIDxxLWJhZGdlXG4gICAgICAgICAgICA6Y29sb3I9XCJcbiAgICAgICAgICAgICAgZ2V0RW1wbG95ZW1lbnRUeXBlQ29sb3IocHJvcHMucm93LmVtcGxveW1lbnRfdHlwZT8uY2F0ZWdvcnkpXG4gICAgICAgICAgICBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt7IHByb3BzLnJvdy5lbXBsb3ltZW50X3R5cGU/LmNhdGVnb3J5IHx8IFwiTi9BXCIgfX1cbiAgICAgICAgICAgIDxxLXRvb2x0aXAgY2xhc3M9XCJiZy1ibHVlLWdyZXktOFwiIDpvZmZzZXQ9XCJbMTAsIDEwXVwiPlxuICAgICAgICAgICAgICBFZGl0IEVtcGxveW1lbnQgVHlwZVxuICAgICAgICAgICAgPC9xLXRvb2x0aXA+XG4gICAgICAgICAgICA8IS0tIHt7IHByb3BzLnJvdy5lbXBsb3ltZW50X3R5cGUgfX0gLS0+XG4gICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICAgIDxxLXBvcHVwLWVkaXRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJlbXBsb3ltZW50VHlwZUlkXCJcbiAgICAgICAgICAgIEBiZWZvcmUtc2hvdz1cIigpID0+IHNldEVtcGxveW1lbnRUeXBlSWQocHJvcHMucm93KVwiXG4gICAgICAgICAgICBAc2F2ZT1cIih2YWwpID0+IHVwZGF0ZUVtcGxveW1lbnRUeXBlKHByb3BzLnJvdywgdmFsKVwiXG4gICAgICAgICAgICBidXR0b25zXG4gICAgICAgICAgICB0aXRsZT1cIkVkaXQgRW1wbG95bWVudCBUeXBlXCJcbiAgICAgICAgICAgIHYtc2xvdD1cInNjb3BlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8IS0tIEBiZWZvcmUtc2hvdz1cIihzY29wZSkgPT4gc2V0RW1wbG95bWVudFR5cGVJZChwcm9wcy5yb3csIHNjb3BlKVwiXG4gICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIih2YWwpID0+IHVwZGF0ZUVtcGxveW1lbnRUeXBlKHByb3BzLnJvdywgdmFsKVwiXG4gICAgICAgICAgYnV0dG9uc1xuICAgICAgICAgIHRpdGxlPVwiRWRpdCBFbXBsb3ltZW50IFR5cGVcIlxuICAgICAgICAgIHYtc2xvdD1cInNjb3BlXCIgLS0+XG4gICAgICAgICAgICA8IS0tIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCIodmFsKSA9PiB1cGRhdGVFbXBsb3ltZW50VHlwZShwcm9wcy5yb3csIHZhbClcIlxuICAgICAgICAgIEBiZWZvcmUtc2hvdz1cInNldEVtcGxveW1lbnRUeXBlSWQocHJvcHMucm93KVwiXG4gICAgICAgICAgQHNhdmU9XCJcbiAgICAgICAgICAgICh2YWwpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1NlbGVjdGVkIElEOicsIHZhbCk7XG4gICAgICAgICAgICAgIHVwZGF0ZUVtcGxveW1lbnRUeXBlKHByb3BzLnJvdywgdmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBcIlxuICAgICAgICAgIGJ1dHRvbnNcbiAgICAgICAgICB0aXRsZT1cIkVkaXQgRW1wbG95bWVudCBUeXBlXCJcbiAgICAgICAgICB2LXNsb3Q9XCJzY29wZVwiIC0tPlxuICAgICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJzY29wZS52YWx1ZVwiXG4gICAgICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJlbXBsb3ltZW50VHlwZUlkXCJcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgYXV0b2ZvY3VzXG4gICAgICAgICAgICAgIDpvcHRpb25zPVwiZW1wbG95bWVudFR5cGVPcHRpb25zXCJcbiAgICAgICAgICAgICAgb3B0aW9uLWxhYmVsPVwibGFiZWxcIlxuICAgICAgICAgICAgICBvcHRpb24tdmFsdWU9XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgIGJlaGF2aW9yPVwibWVudVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvcS1wb3B1cC1lZGl0PlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuXG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC1hZGRyZXNzPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAge3sgY2FwaXRhbGl6ZUFkZHJlc3MocHJvcHMucm93LmFkZHJlc3MpIH19XG4gICAgICAgICAgICA8cS10b29sdGlwIGNsYXNzPVwiYmctYmx1ZS1ncmV5LThcIiA6b2Zmc2V0PVwiWzEwLCAxMF1cIj5cbiAgICAgICAgICAgICAgRWRpdCBBZGRyZXNzXG4gICAgICAgICAgICA8L3EtdG9vbHRpcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8cS1wb3B1cC1lZGl0XG4gICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwiKHZhbCkgPT4gdXBkYXRlRW1wbG95ZWVBZGRyZXNzKHByb3BzLnJvdywgdmFsKVwiXG4gICAgICAgICAgICB2LW1vZGVsPVwicHJvcHMucm93LmFkZHJlc3NcIlxuICAgICAgICAgICAgYnV0dG9uc1xuICAgICAgICAgICAgdGl0bGU9XCJFZGl0IEFkZHJlc3NcIlxuICAgICAgICAgICAgdi1zbG90PVwic2NvcGVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgIGNsYXNzPVwidGV4dC1jYXBpdGFsaXplXCJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInNjb3BlLnZhbHVlXCJcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgYXV0b2ZvY3VzXG4gICAgICAgICAgICAgIGNvdW50ZXJcbiAgICAgICAgICAgICAgQGtleXVwLmVudGVyPVwic2NvcGUuc2V0XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9xLXBvcHVwLWVkaXQ+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC1waG9uZT1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIHt7IGNhcGl0YWxpemVBZGRyZXNzKHByb3BzLnJvdy5waG9uZSkgfX1cbiAgICAgICAgICAgIDxxLXRvb2x0aXAgY2xhc3M9XCJiZy1ibHVlLWdyZXktOFwiIDpvZmZzZXQ9XCJbMTAsIDEwXVwiPlxuICAgICAgICAgICAgICBFZGl0IFBob25lXG4gICAgICAgICAgICA8L3EtdG9vbHRpcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8cS1wb3B1cC1lZGl0XG4gICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwiKHZhbCkgPT4gdXBkYXRlRW1wbG95ZWVQaG9uZShwcm9wcy5yb3csIHZhbClcIlxuICAgICAgICAgICAgdi1tb2RlbD1cInByb3BzLnJvdy5waG9uZVwiXG4gICAgICAgICAgICBidXR0b25zXG4gICAgICAgICAgICB0aXRsZT1cIkVkaXQgUGhvbmVcIlxuICAgICAgICAgICAgdi1zbG90PVwic2NvcGVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJzY29wZS52YWx1ZVwiXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIGF1dG9mb2N1c1xuICAgICAgICAgICAgICBtYXNrPVwiKyg2MykgIyMjIC0gIyMjIC0gIyMjI1wiXG4gICAgICAgICAgICAgIGNvdW50ZXJcbiAgICAgICAgICAgICAgQGtleXVwLmVudGVyPVwic2NvcGUuc2V0XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9xLXBvcHVwLWVkaXQ+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC1iaXJ0aGRhdGU9XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICB7eyBmb3JtYXREYXRlKHByb3BzLnJvdy5iaXJ0aGRhdGUpIH19XG4gICAgICAgICAgICA8cS10b29sdGlwIGNsYXNzPVwiYmctYmx1ZS1ncmV5LThcIiA6b2Zmc2V0PVwiWzEwLCAxMF1cIj5cbiAgICAgICAgICAgICAgRWRpdCBCaXJ0aGRhdGVcbiAgICAgICAgICAgIDwvcS10b29sdGlwPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxxLXBvcHVwLWVkaXRcbiAgICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJcbiAgICAgICAgICAgICAgKHZhbCkgPT4gdXBkYXRlRW1wbG95ZWVCaXJ0aGRhdGUocHJvcHMucm93LCB2YWwpXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgdi1tb2RlbD1cInByb3BzLnJvdy5iaXJ0aGRhdGVcIlxuICAgICAgICAgICAgYnV0dG9uc1xuICAgICAgICAgICAgdGl0bGU9XCJFZGl0IEJpcnRoZGF0ZVwiXG4gICAgICAgICAgICB2LXNsb3Q9XCJzY29wZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInNjb3BlLnZhbHVlXCJcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgYXV0b2ZvY3VzXG4gICAgICAgICAgICAgIHR5cGU9XCJkYXRlXCJcbiAgICAgICAgICAgICAgaGludD1cIm1tL2RkL3l5eXlcIlxuICAgICAgICAgICAgICBAa2V5dXAuZW50ZXI9XCJzY29wZS5zZXRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L3EtcG9wdXAtZWRpdD5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cblxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtYWN0aW9ucz1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWNlbnRlciBxLWd1dHRlci14LW1kXCI+XG4gICAgICAgICAgICA8IS0tIDxFbXBsb3llZUVkaXQgOmVkaXQ9XCJwcm9wc1wiIC8+IC0tPlxuICAgICAgICAgICAgPCEtLSBwYWRkaW5nPVwieHMgbWRcIiAtLT5cbiAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICByb3VuZFxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBzaXplPVwibWRcIlxuICAgICAgICAgICAgICBjb2xvcj1cImJsYWNrXCJcbiAgICAgICAgICAgICAgaWNvbj1cInByaW50XCJcbiAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICBAY2xpY2s9XCJoYW5kbGVQcmludElEKHByb3BzLnJvdylcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8cS10b29sdGlwIGNsYXNzPVwiYmctYmxhY2tcIiA6ZGVsYXk9XCIyMDBcIj4gUHJpbnQgPC9xLXRvb2x0aXA+XG4gICAgICAgICAgICA8L3EtYnRuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS10YWJsZT5cbiAgPC9kaXY+XG4gIDwhLS0gZm9yIHByb2ZpbGUgcGljLS0+XG4gIDwhLS0gPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtcHJvZmlsZT1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICA6c3JjPVwicHJvcHMucm93LnByb2ZpbGVcIlxuICAgICAgICAgICAgYWx0PVwiUHJvZmlsZVwiXG4gICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAzMHB4OyBoZWlnaHQ6IDMwcHg7IGJvcmRlci1yYWRpdXM6IDUwJVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT4gLS0+XG4gIDxxLWRpYWxvZyB2LW1vZGVsPVwiZGlhbG9nXCIgcGVyc2lzdGVudD5cbiAgICA8cS1jYXJkIGNsYXNzPVwiYmctZ3JhZGllbnRcIiBzdHlsZT1cIndpZHRoOiA3MDBweDsgbWF4LXdpZHRoOiA4MHZ3XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC13aGl0ZSBxLW1hLXNtXCIgYWxpZ249XCJyaWdodFwiPlxuICAgICAgICA8cS1idG4gaWNvbj1cImNsb3NlXCIgZmxhdCBkZW5zZSByb3VuZCB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxpZnJhbWUgOnNyYz1cInBkZlVybFwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjcwMHB4XCIgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBTZWFyY2hFbXBsb3llZSBmcm9tIFwiLi9TZWFyY2hFbXBsb3llZS52dWVcIjtcbmltcG9ydCB7IGRhdGUsIHVzZVF1YXNhciB9IGZyb20gXCJxdWFzYXJcIjtcbmltcG9ydCB7IHVzZUVtcGxveWVlU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9lbXBsb3llZVwiO1xuaW1wb3J0IHsgdXNlRW1wbG95bWVudFR5cGVTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2VtcGxveW1lbnQtdHlwZVwiO1xuaW1wb3J0IHsgY29tcHV0ZWQsIG9uTW91bnRlZCwgcmVmIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IElETG9nbyBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vYXNzZXRzL0lETG9nby5wbmdcIjtcbmltcG9ydCBHQl9MT0dPIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi9hc3NldHMvR0JfTE9HTy5wbmdcIjtcbmltcG9ydCBFbXBsb3llZUVkaXQgZnJvbSBcIi4vRW1wbG95ZWVFZGl0LnZ1ZVwiO1xuaW1wb3J0ICogYXMgcGRmTWFrZSBmcm9tIFwicGRmbWFrZS9idWlsZC9wZGZtYWtlXCI7XG5pbXBvcnQgKiBhcyBwZGZGb250cyBmcm9tIFwicGRmbWFrZS9idWlsZC92ZnNfZm9udGVzXCI7XG5wZGZNYWtlLnZmcyA9IHBkZkZvbnRzLmRlZmF1bHQ7XG5cbmNvbnN0IGVtcGxveW1lbnRTdG9yZSA9IHVzZUVtcGxveW1lbnRUeXBlU3RvcmUoKTtcbmNvbnN0IGVtcGxveW1lbnRUeXBlT3B0aW9ucyA9IHJlZihbXSk7XG5jb25zdCBlbXBsb3llZVN0b3JlID0gdXNlRW1wbG95ZWVTdG9yZSgpO1xuY29uc3QgZW1wbG95ZWVSb3dzID0gY29tcHV0ZWQoKCkgPT4gZW1wbG95ZWVTdG9yZS5lbXBsb3llZXMpOyAvLyBDb21wdXRlZCBwcm9wZXJ0eSB3aWxsIGF1dG9tYXRpY2FsbHkgdXBkYXRlIHdoZW4gdGhlIHN0b3JlIGNoYW5nZXNcblxuY29uc3QgcGFnaW5hdGlvbiA9IHJlZih7XG4gIHJvd3NQZXJQYWdlOiAwLFxufSk7XG5cbmNvbnNvbGUubG9nKFwiZW1wbG95ZWVzIGZldGNoIG1hZGVwYWtlclwiLCBlbXBsb3llZVJvd3MudmFsdWUpO1xuXG5vbk1vdW50ZWQoYXN5bmMgKCkgPT4ge1xuICBhd2FpdCByZWxvYWRUYWJsZURhdGEoKTtcbn0pO1xuXG5jb25zdCBmZXRjaEVtcGxveW1lbnRUeXBlRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgYXdhaXQgZW1wbG95bWVudFN0b3JlLmZldGNoRW1wbG95bWVudFR5cGUoKTtcbiAgZW1wbG95bWVudFR5cGVPcHRpb25zLnZhbHVlID0gZW1wbG95bWVudFN0b3JlLmVtcGxveW1lbnRUeXBlLm1hcCgodmFsKSA9PiAoe1xuICAgIGxhYmVsOiB2YWwuY2F0ZWdvcnksXG4gICAgdmFsdWU6IHZhbC5pZCxcbiAgfSkpO1xuICBjb25zb2xlLmxvZyhcIkVtcGxveW1lbnQgVHlwZSBPcHRpb25zOlwiLCBlbXBsb3ltZW50VHlwZU9wdGlvbnMudmFsdWUpO1xufTtcblxub25Nb3VudGVkKGZldGNoRW1wbG95bWVudFR5cGVEYXRhKTtcblxuLy8gVGVtcG9yYXJ5IHJlZiBmb3IgcS1wb3B1cC1lZGl0XG5jb25zdCBlbXBsb3ltZW50VHlwZUlkID0gcmVmKG51bGwpO1xuLy8gRnVuY3Rpb24gdG8gc2V0IHRoZSBpbml0aWFsIGVtcGxveW1lbnQgdHlwZSBJRCBiZWZvcmUgZWRpdGluZ1xuXG4vLyBTZXQgdGhlIGluaXRpYWwgZW1wbG95bWVudCB0eXBlIElEIGJlZm9yZSBlZGl0aW5nXG5jb25zdCBzZXRFbXBsb3ltZW50VHlwZUlkID0gKHJvdykgPT4ge1xuICBlbXBsb3ltZW50VHlwZUlkLnZhbHVlID0gcm93LmVtcGxveW1lbnRfdHlwZT8uaWQgfHwgbnVsbDtcbiAgY29uc29sZS5sb2coXCJJbml0aWFsIGVtcGxveW1lbnRUeXBlSWQ6XCIsIGVtcGxveW1lbnRUeXBlSWQudmFsdWUpO1xufTtcblxuLy8gY29uc3Qgc2V0RW1wbG95bWVudFR5cGVJZCA9IChyb3csIHNjb3BlKSA9PiB7XG4vLyAgIC8vIFNldCB0aGUgaW5pdGlhbCB2YWx1ZSBkaXJlY3RseSBvbiBgc2NvcGUudmFsdWVgXG4vLyAgIGNvbnNvbGUubG9nKFwiUm93IGRhdGE6XCIsIHJvdyk7XG4vLyAgIHNjb3BlLnZhbHVlID0gcm93LmVtcGxveW1lbnRfdHlwZT8uaWQgfHwgbnVsbDtcbi8vICAgY29uc29sZS5sb2coXCJJbml0aWFsIGVtcGxveW1lbnRUeXBlSWQ6XCIsIHNjb3BlLnZhbHVlKTtcbi8vIH07XG5cbi8vIGNvbnN0IHNldEVtcGxveW1lbnRUeXBlSWQgPSAocm93KSA9PiB7XG4vLyAgIC8vIEluaXRpYWxpemUgZW1wbG95bWVudFR5cGVJZCB3aXRoIHRoZSBjdXJyZW50IElEIG9mIHRoZSBlbXBsb3ltZW50IHR5cGUgZm9yIHRoZSBzZWxlY3RlZCByb3dcbi8vICAgY29uc29sZS5sb2coXCJlbXBsb3ltZW50VHlwZUlkcm93c3NzXCIsIHJvdyk7XG4vLyAgIGVtcGxveW1lbnRUeXBlSWQudmFsdWUgPSByb3cuZW1wbG95bWVudF90eXBlPy5jYXRlZ29yeSB8fCBudWxsO1xuLy8gICBjb25zb2xlLmxvZyhcImVtcGxveW1lbnRUeXBlSWQudmFsdWVcIiwgZW1wbG95bWVudFR5cGVJZC52YWx1ZSk7XG4vLyB9O1xuXG5jb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcbmNvbnNvbGUubG9nKFwiZW1wbG95bWVudFR5cGVJZHNzc1wiLCBlbXBsb3ltZW50VHlwZUlkLnZhbHVlKTtcbmNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpO1xuXG5jb25zdCByZWxvYWRUYWJsZURhdGEgPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgZW1wbG95ZWVSb3dzLnZhbHVlID0gYXdhaXQgZW1wbG95ZWVTdG9yZS5mZXRjaEVtcGxveWVlV2l0aEVtcGxveW1lbnRUeXBlKCk7XG4gICAgY29uc29sZS5sb2coXCJmZXRjaEVtcGxveWVlV2l0aEVtcGxveW1lbnRUeXBlXCIsIGVtcGxveWVlUm93cy52YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coXCJlbXBsb3llZSBtYWRlcGFrZXJcIiwgZXJyb3IpO1xuICB9XG59O1xuY29uc3QgZm9ybWF0RGF0ZSA9IChkYXRlU3RyaW5nKSA9PiB7XG4gIHJldHVybiBkYXRlLmZvcm1hdERhdGUoZGF0ZVN0cmluZywgXCJNTU1NIERELCBZWVlZXCIpO1xufTtcblxuY29uc3QgZm9ybWF0RnVsbG5hbWUgPSAocm93KSA9PiB7XG4gIGNvbnN0IGNhcGl0YWxpemUgPSAoc3RyKSA9PlxuICAgIHN0ciA/IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKS50b0xvd2VyQ2FzZSgpIDogXCJcIjtcblxuICBjb25zdCBmaXJzdG5hbWUgPSByb3cuZmlyc3RuYW1lID8gY2FwaXRhbGl6ZShyb3cuZmlyc3RuYW1lKSA6IFwiTm8gRmlyc3RuYW1lXCI7XG4gIGNvbnN0IG1pZGRsZW5hbWUgPSByb3cubWlkZGxlbmFtZVxuICAgID8gY2FwaXRhbGl6ZShyb3cubWlkZGxlbmFtZSkuY2hhckF0KDApICsgXCIuXCJcbiAgICA6IFwiXCI7XG4gIGNvbnN0IGxhc3RuYW1lID0gcm93Lmxhc3RuYW1lID8gY2FwaXRhbGl6ZShyb3cubGFzdG5hbWUpIDogXCJObyBMYXN0bmFtZVwiO1xuXG4gIHJldHVybiBgJHtmaXJzdG5hbWV9ICR7bWlkZGxlbmFtZX0gJHtsYXN0bmFtZX1gO1xufTtcblxuY29uc3QgY2FwaXRhbGl6ZUFkZHJlc3MgPSAoYWRkcmVzcykgPT4ge1xuICBpZiAoIWFkZHJlc3MpIHJldHVybiBcIlwiO1xuICByZXR1cm4gYWRkcmVzc1xuICAgIC5zcGxpdChcIiBcIilcbiAgICAubWFwKCh3b3JkKSA9PiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpKVxuICAgIC5qb2luKFwiIFwiKTtcbn07XG5cbmNvbnN0IHVwZGF0ZUVtcGxveWVlRnVsbG5hbWUgPSBhc3luYyAoZGF0YSwgdmFsKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiZGF0YVwiLCBkYXRhKTtcbiAgY29uc29sZS5sb2coXCJ2YWxcIiwgdmFsKTtcblxuICBjb25zdCBlbXBsb3llZUZ1bGxuYW1lID0ge1xuICAgIGlkOiBkYXRhLmlkLCAvLyBVc2UgdGhlIGVtcGxveWVlJ3MgaWQgZnJvbSBkYXRhXG4gICAgZmlyc3RuYW1lOiB2YWwuZmlyc3RuYW1lIHx8IGRhdGEuZmlyc3RuYW1lLFxuICAgIG1pZGRsZW5hbWU6IHZhbC5taWRkbGVuYW1lIHx8IGRhdGEubWlkZGxlbmFtZSxcbiAgICBsYXN0bmFtZTogdmFsLmxhc3RuYW1lIHx8IGRhdGEubGFzdG5hbWUsXG4gIH07XG4gIGF3YWl0IGVtcGxveWVlU3RvcmUudXBkYXRlRW1wbG95ZWVGdWxsbmFtZShlbXBsb3llZUZ1bGxuYW1lKTtcbn07XG5cbmNvbnN0IHVwZGF0ZUVtcGxveW1lbnRUeXBlID0gYXN5bmMgKHJvdywgc2VsZWN0ZWRJZCkgPT4ge1xuICBjb25zb2xlLmxvZyhcInVwZGF0ZUVtcGxveW1lbnRUeXBlIHRyaWdnZXJlZFwiKTtcbiAgY29uc29sZS5sb2coXCJyb3dcIiwgcm93KTtcbiAgY29uc29sZS5sb2coXCJOZXcgZW1wbG95bWVudCB0eXBlIElEOlwiLCBzZWxlY3RlZElkKTtcblxuICBjb25zdCB1cGRhdGVFbXBsb3llZXNFbXBsb3ltZW50VHlwZSA9IHtcbiAgICBpZDogcm93LmlkLFxuICAgIGVtcGxveW1lbnRfdHlwZV9pZDogc2VsZWN0ZWRJZC52YWx1ZSxcbiAgfTtcbiAgYXdhaXQgZW1wbG95ZWVTdG9yZS51cGRhdGVFbXBsb3llZUVtcGxveW1lbnRUeXBlKFxuICAgIHVwZGF0ZUVtcGxveWVlc0VtcGxveW1lbnRUeXBlXG4gICk7XG59O1xuXG4vLyBjb25zdCB1cGRhdGVFbXBsb3ltZW50VHlwZSA9IGFzeW5jIChkYXRhLCB2YWwpID0+IHtcbi8vICAgY29uc29sZS5sb2coXCJyb3dcIiwgZGF0YSk7IC8vIExvZyB0aGUgcm93IGRhdGFcbi8vICAgY29uc29sZS5sb2coXCJzZWxlY3RlZElkXCIsIHZhbCk7IC8vIExvZyB0aGUgc2VsZWN0ZWQgZW1wbG95bWVudCB0eXBlIElEXG4vLyB9O1xuXG4vLyBjb25zdCB1cGRhdGVFbXBsb3ltZW50VHlwZSA9IGFzeW5jIChyb3csIHNlbGVjdGVkSWQpID0+IHtcbi8vICAgY29uc29sZS5sb2coXCJyb3dcIiwgcm93KTtcbi8vICAgY29uc29sZS5sb2coXCJzZWxlY3RlZElkXCIsIHNlbGVjdGVkSWQpO1xuLy8gfTtcbi8vIHRyeSB7XG4vLyAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnB1dChcbi8vICAgICBgL2FwaS91cGRhdGUtZW1wbG95ZWUtZW1wbG95bWVudC10eXBlLyR7cm93LmlkfWAsXG4vLyAgICAge1xuLy8gICAgICAgZW1wbG95bWVudF90eXBlX2lkOiBzZWxlY3RlZElkLFxuLy8gICAgIH1cbi8vICAgKTtcbi8vICAgY29uc29sZS5sb2coXCJFbXBsb3ltZW50IHR5cGUgdXBkYXRlZDpcIiwgcmVzcG9uc2UuZGF0YSk7XG5cbi8vICAgLy8gVXBkYXRlIHRoZSByb3cgZGF0YSB3aXRoIHRoZSBzZWxlY3RlZCBlbXBsb3ltZW50IHR5cGVcbi8vICAgY29uc3Qgc2VsZWN0ZWRUeXBlID0gZW1wbG95bWVudFR5cGVPcHRpb25zLnZhbHVlLmZpbmQoXG4vLyAgICAgKG9wdGlvbikgPT4gb3B0aW9uLnZhbHVlID09PSBzZWxlY3RlZElkXG4vLyAgICk7XG5cbi8vICAgaWYgKHNlbGVjdGVkVHlwZSkge1xuLy8gICAgIHJvdy5lbXBsb3ltZW50X3R5cGUgPSB7XG4vLyAgICAgICBpZDogc2VsZWN0ZWRJZCxcbi8vICAgICAgIGNhdGVnb3J5OiBzZWxlY3RlZFR5cGUubGFiZWwsXG4vLyAgICAgICBzYWxhcnk6IHNlbGVjdGVkVHlwZS5zYWxhcnksXG4vLyAgICAgfTtcbi8vICAgfVxuLy8gfSBjYXRjaCAoZXJyb3IpIHtcbi8vICAgY29uc29sZS5lcnJvcihcIkVycm9yIHVwZGF0aW5nIGVtcGxveW1lbnQgdHlwZTpcIiwgZXJyb3IpO1xuLy8gfVxuXG5jb25zdCB1cGRhdGVFbXBsb3llZUFkZHJlc3MgPSBhc3luYyAoZGF0YSwgdmFsKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiZGF0YVwiLCBkYXRhKTtcbiAgY29uc29sZS5sb2coXCJ2YWxcIiwgdmFsKTtcblxuICBjb25zdCBlbXBsb3llZUFkZHJlc3MgPSB7XG4gICAgaWQ6IGRhdGEuaWQsXG4gICAgYWRkcmVzczogdmFsLFxuICB9O1xuXG4gIGF3YWl0IGVtcGxveWVlU3RvcmUudXBkYXRlRW1wbG95ZWVBZGRyZXNzKGVtcGxveWVlQWRkcmVzcyk7XG59O1xuXG5jb25zdCB1cGRhdGVFbXBsb3llZVBob25lID0gYXN5bmMgKGRhdGEsIHZhbCkgPT4ge1xuICBjb25zb2xlLmxvZyhcImRhdGFcIiwgZGF0YSk7XG4gIGNvbnNvbGUubG9nKFwidmFsXCIsIHZhbCk7XG5cbiAgY29uc3QgZW1wbG95ZWVQaG9uZSA9IHtcbiAgICBpZDogZGF0YS5pZCxcbiAgICBwaG9uZTogdmFsLFxuICB9O1xuXG4gIGF3YWl0IGVtcGxveWVlU3RvcmUudXBkYXRlRW1wbG95ZWVQaG9uZShlbXBsb3llZVBob25lKTtcbn07XG5cbmNvbnN0IHVwZGF0ZUVtcGxveWVlQmlydGhkYXRlID0gYXN5bmMgKGRhdGEsIHZhbCkgPT4ge1xuICBjb25zb2xlLmxvZyhcImRhdGFcIiwgZGF0YSk7XG4gIGNvbnNvbGUubG9nKFwidmFsXCIsIHZhbCk7XG5cbiAgY29uc3QgZW1wbG95ZWVCaXJ0aGRhdGUgPSB7XG4gICAgaWQ6IGRhdGEuaWQsXG4gICAgYmlydGhkYXRlOiB2YWwsXG4gIH07XG5cbiAgYXdhaXQgZW1wbG95ZWVTdG9yZS51cGRhdGVFbXBsb3llZWJpcnRoZGF0ZShlbXBsb3llZUJpcnRoZGF0ZSk7XG59O1xuXG5jb25zdCBlbXBsb3llZUNvbHVtbnMgPSBbXG4gIHtcbiAgICBuYW1lOiBcImZ1bGxuYW1lXCIsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgbGFiZWw6IFwiRnVsbCBOYW1lXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IChyb3cpID0+IGZvcm1hdEZ1bGxuYW1lKHJvdyksXG4gICAgZm9ybWF0OiAodmFsKSA9PiBgJHt2YWx9YCxcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZW1wbG95bWVudFR5cGVcIixcbiAgICBsYWJlbDogXCJFbXBsb3ltZW50IFR5cGVcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogKHJvdykgPT5cbiAgICAgIHJvdy5lbXBsb3ltZW50X3R5cGUgPyByb3cuZW1wbG95bWVudF90eXBlLmNhdGVnb3J5IDogXCJOL0FcIixcbiAgICBmb3JtYXQ6ICh2YWwpID0+IGAke3ZhbH1gLFxuICB9LFxuXG4gIHtcbiAgICBuYW1lOiBcImFkZHJlc3NcIixcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBsYWJlbDogXCJBZGRyZXNzXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IFwiYWRkcmVzc1wiLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJwaG9uZVwiLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGxhYmVsOiBcIlBob25lXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IFwicGhvbmVcIixcbiAgICBmb3JtYXQ6ICh2YWwpID0+IGAke3ZhbH1gLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJiaXJ0aGRhdGVcIixcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBsYWJlbDogXCJCaXJ0aGRhdGVcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogXCJiaXJ0aGRhdGVcIixcbiAgICBmb3JtYXQ6ICh2YWwpID0+IGZvcm1hdERhdGUodmFsKSxcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYWN0aW9uc1wiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGxhYmVsOiBcIkFjdGlvblwiLFxuICAgIGZpZWxkOiBcImFjdGlvbnNcIixcbiAgfSxcbl07XG5cbmNvbnN0ICRxID0gdXNlUXVhc2FyKCk7XG5jb25zdCBkaWFsb2cgPSByZWYoZmFsc2UpO1xuY29uc3QgcGRmVXJsID0gcmVmKFwiXCIpO1xuXG5jb25zdCBoYW5kbGVQcmludElEID0gKHJvdykgPT4ge1xuICBjb252ZXJ0SW1hZ2VUb0Jhc2U2NChJRExvZ28sIChiYXNlNjRJbWFnZSkgPT4ge1xuICAgIGNvbnZlcnRJbWFnZVRvQmFzZTY0KEdCX0xPR08sIChiYXNlNjRMb2dvKSA9PiB7XG4gICAgICBjb25zdCBkb2NEZWZpbml0aW9uID0gZ2VuZXJhdGVEb2NEZWZpbml0aW9uKHJvdywgYmFzZTY0SW1hZ2UsIGJhc2U2NExvZ28pO1xuICAgICAgcGRmTWFrZS5jcmVhdGVQZGYoZG9jRGVmaW5pdGlvbikuZ2V0RGF0YVVybCgoZGF0YVVybCkgPT4ge1xuICAgICAgICBwZGZVcmwudmFsdWUgPSBkYXRhVXJsO1xuICAgICAgICBkaWFsb2cudmFsdWUgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuY29uc3QgY29udmVydEltYWdlVG9CYXNlNjQgPSAodXJsLCBjYWxsYmFjaykgPT4ge1xuICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgeGhyLm9wZW4oXCJHRVRcIiwgdXJsLCB0cnVlKTtcbiAgeGhyLnJlc3BvbnNlVHlwZSA9IFwiYmxvYlwiO1xuICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKHhoci5yZXNwb25zZSk7XG4gICAgICByZWFkZXIub25sb2FkZW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjYWxsYmFjayhyZWFkZXIucmVzdWx0KTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gbG9hZCBpbWFnZS5cIik7XG4gICAgfVxuICB9O1xuICB4aHIuc2VuZCgpO1xufTtcblxuY29uc3QgZ2VuZXJhdGVEb2NEZWZpbml0aW9uID0gKGVtcGxveWVlLCBiYXNlNjRJbWFnZSwgYmFzZTY0TG9nbykgPT4ge1xuICByZXR1cm4ge1xuICAgIHBhZ2VTaXplOiB7IHdpZHRoOiAzMjMsIGhlaWdodDogMjA0IH0sXG4gICAgcGFnZU1hcmdpbnM6IFswLCAwLCAwLCAwXSxcbiAgICBiYWNrZ3JvdW5kOiBbXG4gICAgICB7XG4gICAgICAgIGltYWdlOiBiYXNlNjRMb2dvLCAvLyBBZGQgbG9nbyBhcyBhIHdhdGVybWFya1xuICAgICAgICB3aWR0aDogMTQwLCAvLyBBZGp1c3QgdGhlIHNpemUgb2YgdGhlIHdhdGVybWFyayBhcyBuZWVkZWRcbiAgICAgICAgb3BhY2l0eTogMC4xLCAvLyBTZXQgdGhlIG9wYWNpdHkgZm9yIGEgd2F0ZXJtYXJrIGVmZmVjdFxuICAgICAgICBhYnNvbHV0ZVBvc2l0aW9uOiB7IHg6IDcwLCB5OiAxNSB9LCAvLyBQb3NpdGlvbiB0aGUgd2F0ZXJtYXJrIG9uIHRoZSBwYWdlXG4gICAgICB9LFxuICAgIF0sXG4gICAgY29udGVudDogW1xuICAgICAge1xuICAgICAgICBjYW52YXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcInJlY3RcIixcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgdzogMjYwLFxuICAgICAgICAgICAgaDogMTUwLFxuICAgICAgICAgICAgbGluZVdpZHRoOiAxLFxuICAgICAgICAgICAgbGluZUNvbG9yOiBcImJsYWNrXCIsXG4gICAgICAgICAgICBkYXNoOiB7IGxlbmd0aDogNCB9LCAvLyBDcmVhdGVzIHRoZSBicm9rZW4gbGluZSBlZmZlY3RcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBhYnNvbHV0ZVBvc2l0aW9uOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGFsaWdubWVudDogXCJqdXN0aWZ5XCIsXG4gICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbWFnZTogYmFzZTY0SW1hZ2UsXG4gICAgICAgICAgICB3aWR0aDogMTAwLFxuICAgICAgICAgICAgaGVpZ2h0OiAxNTMsXG4gICAgICAgICAgICBhbGlnbm1lbnQ6IFwibGVmdFwiLFxuICAgICAgICAgICAgbWFyZ2luOiBbLTgsIC00LCAwLCAwXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN0YWNrOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkdCIEJha2VzaG9wXCIsXG4gICAgICAgICAgICAgICAgc3R5bGU6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgY29sb3I6IFwicmVkXCIsXG4gICAgICAgICAgICAgICAgbWFyZ2luOiBbMCwgMCwgNTAsIDBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogYE5hbWUgIDogJHtmb3JtYXRGdWxsbmFtZShlbXBsb3llZSl9YCxcbiAgICAgICAgICAgICAgICBzdHlsZTogXCJuYW1lXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBgUG9zaXRpb24gOiAke2VtcGxveWVlLnBvc2l0aW9ufWAsXG4gICAgICAgICAgICAgICAgc3R5bGU6IFwicG9zaXRpb25cIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAvLyAgIHRleHQ6IGBFbXBsb3ltZW50IFR5cGU6ICR7ZW1wbG95ZWUuZW1wbG95bWVudF90eXBlPy5jYXRlZ29yeX1gLFxuICAgICAgICAgICAgICAvLyAgIHN0eWxlOiBcImluZm9cIixcbiAgICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6IGBQaG9uZSAgOiAke2VtcGxveWVlLnBob25lfWAsXG4gICAgICAgICAgICAgICAgc3R5bGU6IFwiaW5mb1wiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcXI6IGAke2VtcGxveWVlLmlkLnRvU3RyaW5nKCl9IC0gJHtmb3JtYXRGdWxsbmFtZShcbiAgICAgICAgICAgICAgICAgIGVtcGxveWVlXG4gICAgICAgICAgICAgICAgKX0gLSAke2VtcGxveWVlLnBvc2l0aW9ufWAsXG4gICAgICAgICAgICAgICAgZml0OiA4NyxcbiAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kOiBcInJlZFwiLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwieWVsbG93XCIsXG4gICAgICAgICAgICAgICAgbWFyZ2luOiBbMzAsIDcsIDAsIDBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICBdLFxuICAgIHN0eWxlczoge1xuICAgICAgaGVhZGVyOiB7XG4gICAgICAgIGZvbnRTaXplOiAxNSxcbiAgICAgICAgYm9sZDogdHJ1ZSxcbiAgICAgICAgYWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAvLyBtYXJnaW46IFs1LCAxMCwgMCwgMF0sXG4gICAgICB9LFxuICAgICAgbmFtZToge1xuICAgICAgICBmb250U2l6ZTogOCxcbiAgICAgICAgYm9sZDogdHJ1ZSxcbiAgICAgICAgbWFyZ2luOiBbNSwgMSwgMCwgMF0sXG4gICAgICB9LFxuICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgZm9udFNpemU6IDgsXG4gICAgICAgIC8vIGl0YWxpY3M6IHRydWUsXG4gICAgICAgIG1hcmdpbjogWzUsIDIsIDAsIDBdLFxuICAgICAgfSxcbiAgICAgIGluZm86IHtcbiAgICAgICAgZm9udFNpemU6IDcsXG4gICAgICAgIG1hcmdpbjogWzUsIDIsIDAsIDBdLFxuICAgICAgfSxcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgZm9udFNpemU6IDcsXG4gICAgICAgIG1hcmdpbjogWzAsIDUsIDAsIDBdLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufTtcblxuY29uc3QgZ2V0RW1wbG95ZW1lbnRUeXBlQ29sb3IgPSAoZW1wbG95bWVudFR5cGUpID0+IHtcbiAgc3dpdGNoIChlbXBsb3ltZW50VHlwZSkge1xuICAgIGNhc2UgXCJSZWd1bGFyXCI6XG4gICAgICByZXR1cm4gXCJibHVlLThcIjtcbiAgICBjYXNlIFwiVHJhaW5lZVwiOlxuICAgICAgcmV0dXJuIFwib3JhbmdlLTVcIjtcbiAgICBjYXNlIFwiUGFydC10aW1lXCI6XG4gICAgICByZXR1cm4gXCJ0ZWFsLTVcIjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIFwiZ3JleVwiO1xuICB9XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5jdXN0b20tdGFibGUge1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMzMztcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4ucS1idG4ge1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcbn1cblxuLmJnLWdyYWRpZW50IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZmMzFjNSwgIzQ3MWIzYik7XG59XG5cbi5xLWJ0bjpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtM3B4KTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xufVxuLmdyYWRpZW50LWJ0biB7XG4gIGJvcmRlcjogNXB4IHNvbGlkOyAvKiBEZWZpbmUgYm9yZGVyIHNpemUgKi9cbiAgYm9yZGVyLWltYWdlLXNsaWNlOiAxO1xuICBib3JkZXItd2lkdGg6IDJweDsgLyogQWRqdXN0IHRoZSB3aWR0aCBhcyBuZWVkZWQgKi9cbiAgYm9yZGVyLWltYWdlLXNvdXJjZTogbGluZWFyLWdyYWRpZW50KFxuICAgIDQ1ZGVnLFxuICAgICNmYzAxNjUsXG4gICAgIzI1NzVmY1xuICApOyAvKiBVc2UgeW91ciBncmFkaWVudCAqL1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgLyogU2V0IGJhY2tncm91bmQgdG8gdHJhbnNwYXJlbnQgaWYgbmVlZGVkICovXG59XG5cbi5ncmFkaWVudC1idG4gcS1idG4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgLyogS2VlcCB0aGUgYnV0dG9uJ3MgYmFja2dyb3VuZCB3aGl0ZSAqL1xuICBwYWRkaW5nOiBzbSBtZDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBjb2xvcjogIzAwMDsgLyogQWRqdXN0IHRleHQgY29sb3IgKi9cbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWNhcmQgY2xhc3M9XCJxLXBhLW1kIHVzZXItY2FyZFwiIEBjbGljaz1cIm9wZW5BZGRFbXBsb3llZURpYWxvZ1wiPlxuICAgIDxkaXYgY2xhc3M9XCJxLW1iLW1kIHRleHQtY2VudGVyXCI+XG4gICAgICA8cS1pY29uIG5hbWU9XCJwZXJzb25fYWRkXCIgc2l6ZT1cIjcwcHhcIiBjb2xvcj1cInllbGxvdy03XCIgLz5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5BZGQgRW1wbG95ZWU8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9xLWNhcmQ+XG5cbiAgPHEtZGlhbG9nXG4gICAgdi1tb2RlbD1cImFkZEVtcGxveWVlRGlhbG9nXCJcbiAgICBwZXJzaXN0ZW50XG4gICAgcG9zaXRpb249XCJyaWdodFwiXG4gICAgYmFja2Ryb3AtZmlsdGVyPVwiYmx1cig0cHgpIHNhdHVyYXRlKDE1MCUpXCJcbiAgPlxuICAgIDxxLWNhcmQgc3R5bGU9XCJ3aWR0aDogNTAwcHg7IG1heC13aWR0aDogMTIwdndcIj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvblxuICAgICAgICBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1weC1tZCBxLXB5LXNtIGJnLWdyYWRpZW50IHRleHQtd2hpdGVcIlxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNSBxLW1yLW1kXCI+8J+RqOKAjfCfkrzwn5Gp4oCN8J+SvCBBZGQgTmV3IEVtcGxveWVlPC9kaXY+XG4gICAgICAgIDxxLXNwYWNlIC8+XG4gICAgICAgIDxxLWJ0biBpY29uPVwiYXJyb3dfZm9yd2FyZF9pb3NcIiBmbGF0IGRlbnNlIHJvdW5kIHYtY2xvc2UtcG9wdXAgLz5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci15LXNtXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXktc20gcS1teC1hdXRvXCI+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICBjbGFzcz1cInRleHQtY2FwaXRhbGl6ZVwiXG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJlbXBsb3llZUluZm8uZmlyc3RuYW1lXCJcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgbGFiZWw9XCJGaXJzdCBOYW1lXCJcbiAgICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+ICh2YWwgJiYgdmFsLmxlbmd0aCA+IDApIHx8ICdSZXF1aXJlZCddXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICBjbGFzcz1cInRleHQtY2FwaXRhbGl6ZVwiXG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJlbXBsb3llZUluZm8ubWlkZGxlbmFtZVwiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIGxhYmVsPVwiTWlkZGxlIE5hbWVcIlxuICAgICAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCkgfHwgJ1JlcXVpcmVkJ11cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgIGNsYXNzPVwidGV4dC1jYXBpdGFsaXplXCJcbiAgICAgICAgICAgICAgdi1tb2RlbD1cImVtcGxveWVlSW5mby5sYXN0bmFtZVwiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIGxhYmVsPVwiTGFzdCBOYW1lXCJcbiAgICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+ICh2YWwgJiYgdmFsLmxlbmd0aCA+IDApIHx8ICdSZXF1aXJlZCddXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICBjbGFzcz1cInRleHQtY2FwaXRhbGl6ZVwiXG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJlbXBsb3llZUluZm8uYWRkcmVzc1wiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIGxhYmVsPVwiQWRkcmVzc1wiXG4gICAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnUmVxdWlyZWQnXVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXIteC1zbSBpdGVtLXN0YXJ0XCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJlbXBsb3llZUluZm8uYmlydGhkYXRlXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJCaXJ0aGRhdGVcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJkYXRlXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAyMzBweFwiXG4gICAgICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+ICh2YWwgJiYgdmFsLmxlbmd0aCA+IDApIHx8ICdSZXF1aXJlZCddXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiZW1wbG95ZWVJbmZvLnBob25lXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJQaG9uZSBOdW1iZXJcIlxuICAgICAgICAgICAgICAgIG1hc2s9XCIrKDYzKSAjIyMgLSAjIyMgLSAjIyMjXCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIigrNjMpICMjIyAtICMjIyAtICMjIyNcIlxuICAgICAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnUmVxdWlyZWQnXVwiXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMjMwcHg7IG1heC13aWR0aDogNTAwcHg7IG1pbi13aWR0aDogMTAwcHhcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci14LXNtXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cS1zZWxlY3RcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiZW1wbG95ZWVJbmZvLnNleFwiXG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGxhYmVsPVwiU2V4XCJcbiAgICAgICAgICAgICAgICA6b3B0aW9ucz1cImdlbmRlck9wdGlvbnNcIlxuICAgICAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnUmVxdWlyZWQnXVwiXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTIwcHhcIlxuICAgICAgICAgICAgICAgIGJlaGF2aW9yPVwibWVudVwiXG4gICAgICAgICAgICAgICAgaGlkZS1kcm9wZG93bi1pY29uXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJlbXBsb3llZUluZm8ucG9zaXRpb25cIlxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBoaWRlLWRyb3Bkb3duLWljb25cbiAgICAgICAgICAgICAgICBsYWJlbD1cIlBvc2l0aW9uXCJcbiAgICAgICAgICAgICAgICA6b3B0aW9ucz1cInBvc2l0aW9uT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgOnJ1bGVzPVwiWyh2YWwpID0+ICh2YWwgJiYgdmFsLmxlbmd0aCA+IDApIHx8ICdSZXF1aXJlZCddXCJcbiAgICAgICAgICAgICAgICBiZWhhdmlvcj1cIm1lbnVcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDE3NXB4OyBtYXgtd2lkdGg6IDUwMHB4OyBtaW4td2lkdGg6IDEwMHB4XCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cImVtcGxveWVlSW5mby5lbXBsb3ltZW50X3R5cGVcIlxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBoaWRlLWRyb3Bkb3duLWljb25cbiAgICAgICAgICAgICAgICBsYWJlbD1cIkVtcGxveW1lbnQgVHlwZVwiXG4gICAgICAgICAgICAgICAgOm9wdGlvbnM9XCJlbXBsb3ltZW50VHlwZU9wdGlvbnNcIlxuICAgICAgICAgICAgICAgIGJlaGF2aW9yPVwibWVudVwiXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTU1cHg7IG1heC13aWR0aDogNTAwcHg7IG1pbi13aWR0aDogMTAwcHhcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtYWN0aW9ucyBjbGFzcz1cInJvdyBxLXB4LWxnIHEtcHktc20gcS1wdC1ub25lXCIgYWxpZ249XCJsZWZ0XCI+XG4gICAgICAgIDxxLWJ0biBjbGFzcz1cImdsb3NzeVwiIGNvbG9yPVwiZ3JleS05XCIgbGFiZWw9XCJEaXNtaXNzXCIgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBjbGFzcz1cImdsb3NzeVwiXG4gICAgICAgICAgY29sb3I9XCJ0ZWFsXCJcbiAgICAgICAgICBsYWJlbD1cIkFkZFwiXG4gICAgICAgICAgaWNvbj1cImFkZFwiXG4gICAgICAgICAgQGNsaWNrPVwic2F2ZVwiXG4gICAgICAgICAgOmxvYWRpbmc9XCJsb2FkaW5nXCJcbiAgICAgICAgPlxuICAgICAgICA8L3EtYnRuPlxuICAgICAgICA8IS0tIEBjbGljaz1cImFkZE5ld0JyYW5jaFwiIC0tPlxuICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VCcmFuY2hlc1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvYnJhbmNoXCI7XG5pbXBvcnQgeyB1c2VFbXBsb3ltZW50VHlwZVN0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvZW1wbG95bWVudC10eXBlXCI7XG5pbXBvcnQgeyB1c2VFbXBsb3llZVN0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvZW1wbG95ZWVcIjtcbmltcG9ydCB7IG9uTW91bnRlZCwgcmVhY3RpdmUsIHJlZiB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgZW1wbG95ZWVTdG9yZSA9IHVzZUVtcGxveWVlU3RvcmUoKTtcblxuY29uc3QgYWRkRW1wbG95ZWVEaWFsb2cgPSByZWYoZmFsc2UpO1xuY29uc3QgbG9hZGluZyA9IHJlZihmYWxzZSk7XG5jb25zdCBvcGVuQWRkRW1wbG95ZWVEaWFsb2cgPSAoKSA9PiB7XG4gIGFkZEVtcGxveWVlRGlhbG9nLnZhbHVlID0gdHJ1ZTtcbn07XG5cbmNvbnN0IGJyYW5jaGVzU3RvcmUgPSB1c2VCcmFuY2hlc1N0b3JlKCk7XG5jb25zdCBlbXBsb3ltZW50U3RvcmUgPSB1c2VFbXBsb3ltZW50VHlwZVN0b3JlKCk7XG5jb25zdCBwb3NpdGlvbk9wdGlvbnMgPSBbXG4gIFwiU3VwZXIgQWRtaW5cIixcbiAgXCJBZG1pblwiLFxuICBcIlN1cGVydmlzb3JcIixcbiAgXCJTY2FsZXJcIixcbiAgXCJMYW1lc2Fkb3JcIixcbiAgXCJIb3JuZXJvXCIsXG4gIFwiQmFrZXJcIixcbiAgXCJDYWtlIE1ha2VyXCIsXG4gIFwiQ2FzaGllclwiLFxuICBcIlNhbGVzIENsZXJrXCIsXG4gIFwiVXRpbGl0eVwiLFxuICBcIk5vdCBZZXQgQXNzaWduZWRcIixcbl07XG5jb25zdCBnZW5kZXJPcHRpb25zID0gW1wiTWFsZVwiLCBcIkZlbWFsZVwiXTtcbi8vIGNvbnN0IHN0YXR1c09wdGlvbnMgPSBbXCJDdXJyZW50XCIsIFwiRm9ybWVyXCJdO1xuY29uc3QgYnJhbmNoT3B0aW9ucyA9IHJlZihbXSk7XG5jb25zdCBlbXBsb3ltZW50VHlwZU9wdGlvbnMgPSByZWYoW10pO1xuY29uc3Qgc2VsZWN0ZWRCcmFuY2ggPSByZWYoW10pO1xuY29uc3QgZmlsdGVyQnJhbmNoT3B0aW9ucyA9IHJlZihicmFuY2hPcHRpb25zLnZhbHVlKTtcblxuY29uc3QgdmFsaWRpZGF0ZVRpbWUgPSAodmFsKSA9PiB7XG4gIGNvbnN0IHRpbWVSZWdleCA9IC9eKDBbMS05XXwxWzAtMl0pOlswLTVdWzAtOV0gKEFNfFBNKSQvaTtcbiAgcmV0dXJuIHRpbWVSZWdleC50ZXN0KHZhbCkgfHwgXCJJbnZhbGlkIHRpbWUgZm9ybWF0XCI7XG59O1xuXG4vLyBjb25zdCBmZXRjaEJyYW5jaGVzRGF0YSA9IGFzeW5jICgpID0+IHtcbi8vICAgY29uc3QgYnJhbmNoID0gYXdhaXQgYnJhbmNoZXNTdG9yZS5mZXRjaEJyYW5jaGVzKCk7XG4vLyAgIGJyYW5jaE9wdGlvbnMudmFsdWUgPSBicmFuY2hlc1N0b3JlLmJyYW5jaGVzLm1hcCgodmFsKSA9PiAoe1xuLy8gICAgIGxhYmVsOiB2YWwubmFtZSxcbi8vICAgICB2YWx1ZTogdmFsLmlkLFxuLy8gICB9KSk7XG4vLyAgIGZpbHRlckJyYW5jaE9wdGlvbnMudmFsdWUgPSBicmFuY2hPcHRpb25zLnZhbHVlO1xuLy8gfTtcblxuLy8gb25Nb3VudGVkKGZldGNoQnJhbmNoZXNEYXRhKTtcblxuLy8gY29uc3QgZmlsdGVyZWRCcmFuY2hlcyA9ICh2YWwsIHVwZGF0ZSkgPT4ge1xuLy8gICB1cGRhdGUoKCkgPT4ge1xuLy8gICAgIGNvbnN0IG5lZWRsZSA9IHZhbC50b0xvd2VyQ2FzZSgpO1xuLy8gICAgIGZpbHRlckJyYW5jaE9wdGlvbnMudmFsdWUgPVxuLy8gICAgICAgdmFsID09PSBcIlwiXG4vLyAgICAgICAgID8gYnJhbmNoT3B0aW9ucy52YWx1ZVxuLy8gICAgICAgICA6IGJyYW5jaE9wdGlvbnMudmFsdWUuZmlsdGVyKCh2KSA9PlxuLy8gICAgICAgICAgICAgdi5sYWJlbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKG5lZWRsZSlcbi8vICAgICAgICAgICApO1xuLy8gICB9KTtcbi8vIH07XG5cbmNvbnN0IGZldGNoRW1wbG95bWVudFR5cGVEYXRhID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBlbXBsb3ltZW50VHlwZSA9IGF3YWl0IGVtcGxveW1lbnRTdG9yZS5mZXRjaEVtcGxveW1lbnRUeXBlKCk7XG4gIGVtcGxveW1lbnRUeXBlT3B0aW9ucy52YWx1ZSA9IGVtcGxveW1lbnRTdG9yZS5lbXBsb3ltZW50VHlwZS5tYXAoKHZhbCkgPT4gKHtcbiAgICBsYWJlbDogdmFsLmNhdGVnb3J5LFxuICAgIHZhbHVlOiB2YWwuaWQsXG4gIH0pKTtcbn07XG5cbm9uTW91bnRlZChmZXRjaEVtcGxveW1lbnRUeXBlRGF0YSk7XG5cbmNvbnN0IGVtcGxveWVlSW5mbyA9IHJlYWN0aXZlKHtcbiAgZmlyc3RuYW1lOiBcIlwiLFxuICBtaWRkbGVuYW1lOiBcIlwiLFxuICBsYXN0bmFtZTogXCJcIixcbiAgYWRkcmVzczogXCJcIixcbiAgYmlydGhkYXRlOiBcIlwiLFxuICBzZXg6IFwiXCIsXG4gIHBob25lOiBcIlwiLFxuICBwb3NpdGlvbjogXCJcIixcbiAgZW1wbG95bWVudF90eXBlOiBcIlwiLFxufSk7XG5cbmNvbnN0IHNhdmUgPSBhc3luYyAoKSA9PiB7XG4gIGxvYWRpbmcudmFsdWUgPSB0cnVlO1xuICBjb25zdCBlbXBsb3llZUZvcm0gPSB7XG4gICAgLi4uZW1wbG95ZWVJbmZvLFxuICAgIGVtcGxveW1lbnRfdHlwZV9pZDogZW1wbG95ZWVJbmZvLmVtcGxveW1lbnRfdHlwZS52YWx1ZSxcbiAgfTtcbiAgY29uc29sZS5sb2coXCJlbXBsb3llZVwiLCBlbXBsb3llZUZvcm0pO1xuICBjb25zdCBkYXRhID0gYXdhaXQgZW1wbG95ZWVTdG9yZS5jcmVhdGVFbXBsb3llZShlbXBsb3llZUZvcm0pO1xuICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIGNsZWFyRm9ybSgpO1xuICBhZGRFbXBsb3llZURpYWxvZy52YWx1ZSA9IGZhbHNlO1xufTtcblxuY29uc3QgY2xlYXJGb3JtID0gKCkgPT4ge1xuICBlbXBsb3llZUluZm8uZmlyc3RuYW1lID0gXCJcIjtcbiAgZW1wbG95ZWVJbmZvLm1pZGRsZW5hbWUgPSBcIlwiO1xuICBlbXBsb3llZUluZm8ubGFzdG5hbWUgPSBcIlwiO1xuICBlbXBsb3llZUluZm8uYWRkcmVzcyA9IFwiXCI7XG4gIGVtcGxveWVlSW5mby5iaXJ0aGRhdGUgPSBcIlwiO1xuICBlbXBsb3llZUluZm8uc2V4ID0gXCJcIjtcbiAgZW1wbG95ZWVJbmZvLnBob25lID0gXCJcIjtcbiAgZW1wbG95ZWVJbmZvLnBvc2l0aW9uID0gXCJcIjtcbiAgZW1wbG95ZWVJbmZvLmVtcGxveW1lbnRfdHlwZSA9IFwiXCI7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi51c2VyLWNhcmQge1xuICBoZWlnaHQ6IDUwJTtcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICMzMzM7XG4gIGJveC1zaGFkb3c6IDBweCA0cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xufVxuLnVzZXItYnV0dG9uIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XG59XG5cbi51c2VyLWJ1dHRvbjpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KTtcbiAgYm94LXNoYWRvdzogMHB4IDZweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG5cbi5teS1jYXJkIHtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYW5pbWF0aW9uOiBmYWRlSW4gMC4zcyBlYXNlO1xufVxuXG4uYnRuLWFkZCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzAwMDAwMCwgIzAwMDAwMCk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmJnLWdyYWRpZW50IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZmMzFjNSwgIzQ3MWIzYik7XG59XG5cbi5zZXBhcmF0b3ItZ3JhZGllbnQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMwMGJmYTUsICMwMDc5NmIpO1xufVxuXG4ucS1idG4ge1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcbn1cblxuLnEtYnRuOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpO1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG5cbi5idG4tY2FuY2VsIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZWY1MzUwLCAjZTUzOTM1KTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uYnRuLWNyZWF0ZSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzY2YmI2YSwgIzQzYTA0Nyk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLnEtYW5pbWF0ZS1ib3VuY2Uge1xuICBhbmltYXRpb246IGJvdW5jZUluIDAuNnMgZWFzZTtcbn1cblxuQGtleWZyYW1lcyBmYWRlSW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMHB4KTtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIH1cbn1cblxuQGtleWZyYW1lcyBib3VuY2VJbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuPC9zdHlsZT5cbiIsImltcG9ydCB7IGRlZmluZVN0b3JlIH0gZnJvbSBcInBpbmlhXCI7XG5pbXBvcnQgeyBMb2FkaW5nLCBOb3RpZnkgfSBmcm9tIFwicXVhc2FyXCI7XG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwic3JjL2Jvb3QvYXhpb3NcIjtcbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcblxuZXhwb3J0IGNvbnN0IHVzZURlc2lnbmF0aW9uU3RvcmUgPSBkZWZpbmVTdG9yZShcImRlc2lnbmF0aW9uc1wiLCAoKSA9PiB7XG4gIGNvbnN0IGRlc2lnbmF0aW9uID0gcmVmKG51bGwpO1xuICBjb25zdCBkZXNpZ25hdGlvbnMgPSByZWYoW10pO1xuXG4gIGNvbnN0IGNyZWF0ZURlc2lnbmF0aW9uID0gYXN5bmMgKGRhdGEpID0+IHtcbiAgICAvLyBMb2FkaW5nLnNob3coKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucG9zdChcIi9hcGkvYnJhbmNoRW1wbG95ZWVcIiwgZGF0YSk7XG4gICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZGF0YSkge1xuICAgICAgICBkZXNpZ25hdGlvbnMudmFsdWUudW5zaGlmdChyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiRW1wbG95ZWUgY3JlYXRlZCBzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgICBzZXRUaW1lb3V0OiAxMDAwLFxuICAgICAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmV4cGVjdGVkIEFQSSBSZXNwb25zZTpcIiwgcmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY3JlYXRpbmcgZW1wbG95ZWU6XCIsIGVycm9yKTtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IGBGYWlsZWQgdG8gY3JlYXRlIGVtcGxveWVlc3NzYCxcbiAgICAgICAgc2V0VGltZW91dDogMTAwMCxcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBmaW5hbGx5IHtcbiAgICAvLyAgIExvYWRpbmcuaGlkZSgpO1xuICAgIC8vIH1cbiAgfTtcbiAgcmV0dXJuIHtcbiAgICBkZXNpZ25hdGlvbixcbiAgICBkZXNpZ25hdGlvbnMsXG4gICAgY3JlYXRlRGVzaWduYXRpb24sXG4gIH07XG59KTtcbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtY2FyZFxuICAgIGNsYXNzPVwicS1wYS1tZCB1c2VyLWNhcmRcIlxuICAgIEBjbGljaz1cIm9wZW5EZXNpZ25hdGlvbkRpYWxvZ1wiXG4gICAgYWxpZ249XCJjZW50ZXJcIlxuICA+XG4gICAgPGRpdiBjbGFzcz1cInEtbWItbWQgdGV4dC1jZW50ZXJcIj5cbiAgICAgIDxxLWljb24gbmFtZT1cImFkZF9idXNpbmVzc1wiIHNpemU9XCI2MHB4XCIgY29sb3I9XCJ5ZWxsb3ctN1wiIC8+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMSB0ZXh0LXdlaWdodC1tZWRpdW1cIj5cbiAgICAgICAgQWRkIEVtcGxveWVlIERlc2lnbmF0aW9uc1xuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvcS1jYXJkPlxuXG4gIDxxLWRpYWxvZ1xuICAgIHYtbW9kZWw9XCJkZXNpZ25hdGlvbkRpYWxvZ1wiXG4gICAgYmFja2Ryb3AtZmlsdGVyPVwiYmx1cig0cHgpIHNhdHVyYXRlKDE1MCUpXCJcbiAgICBwb3NpdGlvbj1cInJpZ2h0XCJcbiAgPlxuICAgIDxxLWNhcmQgc3R5bGU9XCJ3aWR0aDogNTAwcHg7IG1heC13aWR0aDogMTAwdndcIj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvblxuICAgICAgICBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1weC1tZCBxLXB5LXNtIGJnLWdyYWRpZW50IHRleHQtd2hpdGVcIlxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNSBxLW1yLW1kXCI+8J+RqOKAjfCfkrzwn5Gp4oCN8J+SvCBBZGQgRW1wbG95ZWUgRGVzaWduYXRpb248L2Rpdj5cbiAgICAgICAgPHEtc3BhY2UgLz5cbiAgICAgICAgPHEtYnRuIGljb249XCJhcnJvd19mb3J3YXJkX2lvc1wiIGZsYXQgZGVuc2Ugcm91bmQgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgdi1tb2RlbD1cInNlYXJjaEtleXdvcmRcIlxuICAgICAgICAgICAgbGFiZWw9XCJTZWFyY2ggRW1wbG95ZWVcIlxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwic2VhcmNoXCJcbiAgICAgICAgICAgIGRlYm91bmNlPVwiNTAwXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgbmFtZSBvciBwb3NpdGlvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgIDxxLWljb24gdi1pZj1cIiFzZWFyY2hMb2FkaW5nXCIgbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICAgICAgICAgIDxxLXNwaW5uZXIgdi1lbHNlIGNvbG9yPVwiZ3JleVwiIHNpemU9XCJzbVwiIC8+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPGRpdiB2LWlmPVwic2VhcmNoS2V5d29yZFwiIGNsYXNzPVwiY3VzdG9tLWxpc3Qgei10b3BcIj5cbiAgICAgICAgICAgICAgPHEtY2FyZD5cbiAgICAgICAgICAgICAgICA8cS1saXN0IHNlcGFyYXRvcj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0gdi1pZj1cIiFlbXBsb3llZXM/Lmxlbmd0aFwiPlxuICAgICAgICAgICAgICAgICAgICBObyBFbXBsb3llZSBSZWNvcmRcbiAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbVxuICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cImF1dG9GaWxsRW1wbG95ZWUoZW1wbG95ZWUpXCJcbiAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cImVtcGxveWVlIGluIGVtcGxveWVlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgOmtleT1cImVtcGxveWVlLmlkXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGlja2FibGVcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IGZvcm1hdEZ1bGxuYW1lKGVtcGxveWVlKSB9fVxuICAgICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L3EtbGlzdD5cbiAgICAgICAgICAgICAgPC9xLWNhcmQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3EtaW5wdXQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci1tZFwiPlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBsYWJlbD1cIkZ1bGwgTmFtZVwiXG4gICAgICAgICAgICB2LW1vZGVsPVwiYWRkRGVzaWduYXRpb24uZW1wbG95ZWVfbmFtZVwiXG4gICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAzMDBweFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgbGFiZWw9XCJQb3NpdGlvblwiXG4gICAgICAgICAgICB2LW1vZGVsPVwiYWRkRGVzaWduYXRpb24ucG9zaXRpb25cIlxuICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTUwcHhcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtbXktbWRcIj5EZXNpZ25hdGlvbjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLXgtbWRcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJhZGREZXNpZ25hdGlvbi5icmFuY2hfbmFtZVwiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgdXNlLWlucHV0XG4gICAgICAgICAgICAgIGNsZWFyYWJsZVxuICAgICAgICAgICAgICBpbnB1dC1kZWJvdW5jZT1cIjBcIlxuICAgICAgICAgICAgICA6b3B0aW9ucz1cImZpbHRlckJyYW5jaE9wdGlvbnNcIlxuICAgICAgICAgICAgICBsYWJlbD1cIkJyYW5jaFwiXG4gICAgICAgICAgICAgIEBmaWx0ZXI9XCJmaWx0ZXJlZEJyYW5jaGVzXCJcbiAgICAgICAgICAgICAgaGlkZS1kcm9wZG93bi1pY29uXG4gICAgICAgICAgICAgIGJlaGF2aW9yPVwibWVudVwiXG4gICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDI1MHB4OyBtYXgtd2lkdGg6IDUwMHB4OyBtaW4td2lkdGg6IDEwMHB4XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJhZGREZXNpZ25hdGlvbi50aW1lX3NoaWZ0XCJcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBtYXNrPVwiIyM6IyMgQUFcIlxuICAgICAgICAgICAgICBsYWJlbD1cIlRpbWUgU2NoZWR1bGVcIlxuICAgICAgICAgICAgICA6cnVsZXM9XCJ2YWxpZGlkYXRlVGltZVwiXG4gICAgICAgICAgICAgIGhpbnQ9XCJGb3JtYXQ6IDAxOjAwIEFNL1BNXCJcbiAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMjAwcHg7IG1heC13aWR0aDogNTAwcHg7IG1pbi13aWR0aDogMTAwcHhcIlxuICAgICAgICAgICAgICBoaWRlLWRyb3Bkb3duLWljb25cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtYWN0aW9ucyBjbGFzcz1cInJvdyBxLXB4LWxnIHEtcHktc20gcS1wdC1ub25lXCIgYWxpZ249XCJsZWZ0XCI+XG4gICAgICAgIDxxLWJ0biBjbGFzcz1cImdsb3NzeVwiIGNvbG9yPVwiZ3JleS05XCIgbGFiZWw9XCJEaXNtaXNzXCIgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBjbGFzcz1cImdsb3NzeVwiXG4gICAgICAgICAgY29sb3I9XCJ0ZWFsXCJcbiAgICAgICAgICBsYWJlbD1cIkFkZFwiXG4gICAgICAgICAgQGNsaWNrPVwic2F2ZVwiXG4gICAgICAgICAgOmxvYWRpbmc9XCJsb2FkaW5nXCJcbiAgICAgICAgLz5cbiAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgdXNlRW1wbG95ZWVTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2VtcGxveWVlXCI7XG5pbXBvcnQgeyB1c2VCcmFuY2hlc1N0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvYnJhbmNoXCI7XG5pbXBvcnQgeyB1c2VEZXNpZ25hdGlvblN0b3JlIH0gZnJvbSBcInNyYy9zdG9yZXMvZGVzaWduYXRpb25cIjtcbmltcG9ydCB7IG9uTW91bnRlZCwgY29tcHV0ZWQsIHJlYWN0aXZlLCByZWYgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IHdpZHRoU3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gIHJldHVybiB3aWR0aCA+IDEyMDAgPyBcIjUwMHB4XCIgOiB3aWR0aCA+IDc2OCA/IFwiODB2d1wiIDogXCI5NXZ3XCI7XG59KTtcblxuY29uc3QgZGVzaWduYXRpb25EaWFsb2cgPSByZWYoZmFsc2UpO1xuY29uc3QgZGVzaWduYXRpb25TdG9yZSA9IHVzZURlc2lnbmF0aW9uU3RvcmUoKTtcbmNvbnN0IGVtcGxveWVlU3RvcmUgPSB1c2VFbXBsb3llZVN0b3JlKCk7XG5jb25zdCBicmFuY2hlc1N0b3JlID0gdXNlQnJhbmNoZXNTdG9yZSgpO1xuY29uc3QgYnJhbmNoT3B0aW9ucyA9IHJlZihbXSk7XG5jb25zdCBzZWxlY3RlZEJyYW5jaCA9IHJlZihbXSk7XG5jb25zdCBzZWFyY2hLZXl3b3JkID0gcmVmKFwiXCIpO1xuY29uc3QgZmlsdGVyQnJhbmNoT3B0aW9ucyA9IHJlZihicmFuY2hPcHRpb25zLnZhbHVlKTtcbmNvbnN0IGxvYWRpbmcgPSByZWYoZmFsc2UpO1xuY29uc3Qgc2VhcmNoTG9hZGluZyA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IGVtcGxveWVlcyA9IGNvbXB1dGVkKCgpID0+IGVtcGxveWVlU3RvcmUuZW1wbG95ZWUpO1xuY29uc3Qgc2VhcmNoID0gYXN5bmMgKCkgPT4ge1xuICBpZiAoc2VhcmNoS2V5d29yZC52YWx1ZS50cmltKCkpIHtcbiAgICBzZWFyY2hMb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgICBhd2FpdCBlbXBsb3llZVN0b3JlLnNlYXJjaENlcnRhaW5FbXBsb3llZShzZWFyY2hLZXl3b3JkLnZhbHVlKTtcbiAgICBzZWFyY2hMb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIH1cbn07XG5cbmNvbnN0IHZhbGlkaWRhdGVUaW1lID0gKHZhbCkgPT4ge1xuICBjb25zdCB0aW1lUmVnZXggPSAvXigwWzEtOV18MVswLTJdKTpbMC01XVswLTldIChBTXxQTSkkL2k7XG4gIHJldHVybiB0aW1lUmVnZXgudGVzdCh2YWwpIHx8IFwiSW52YWxpZCB0aW1lIGZvcm1hdFwiO1xufTtcblxuY29uc3QgZmV0Y2hCcmFuY2hlc0RhdGEgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGJyYW5jaCA9IGF3YWl0IGJyYW5jaGVzU3RvcmUuZmV0Y2hCcmFuY2hlcygpO1xuICBicmFuY2hPcHRpb25zLnZhbHVlID0gYnJhbmNoZXNTdG9yZS5icmFuY2hlcy5tYXAoKHZhbCkgPT4gKHtcbiAgICBsYWJlbDogdmFsLm5hbWUsXG4gICAgdmFsdWU6IHZhbC5pZCxcbiAgfSkpO1xuICBmaWx0ZXJCcmFuY2hPcHRpb25zLnZhbHVlID0gYnJhbmNoT3B0aW9ucy52YWx1ZTtcbn07XG5cbm9uTW91bnRlZChmZXRjaEJyYW5jaGVzRGF0YSk7XG5cbmNvbnN0IGZpbHRlcmVkQnJhbmNoZXMgPSAodmFsLCB1cGRhdGUpID0+IHtcbiAgdXBkYXRlKCgpID0+IHtcbiAgICBjb25zdCBuZWVkbGUgPSB2YWwudG9Mb3dlckNhc2UoKTtcbiAgICBmaWx0ZXJCcmFuY2hPcHRpb25zLnZhbHVlID1cbiAgICAgIHZhbCA9PT0gXCJcIlxuICAgICAgICA/IGJyYW5jaE9wdGlvbnMudmFsdWVcbiAgICAgICAgOiBicmFuY2hPcHRpb25zLnZhbHVlLmZpbHRlcigodikgPT5cbiAgICAgICAgICAgIHYubGFiZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhuZWVkbGUpXG4gICAgICAgICAgKTtcbiAgfSk7XG59O1xuXG4vLyBjb25zdCBmb3JtYXR0ZWRGdWxsTmFtZSA9IGNvbXB1dGVkKCgpID0+IHtcbi8vICAgY29uc3QgZW1wbG95ZWUgPSBlbXBsb3llZXMudmFsdWUuZmluZChcbi8vICAgICAoZW1wKSA9PiBlbXAuaWQgPT09IGFkZERlc2lnbmF0aW9uLmVtcGxveWVlX2lkXG4vLyAgICk7XG4vLyAgIGlmIChlbXBsb3llZSkge1xuLy8gICAgIHJldHVybiBgJHtlbXBsb3llZS5maXJzdG5hbWV9ICR7XG4vLyAgICAgICBlbXBsb3llZS5taWRkbGVuYW1lID8gZW1wbG95ZWUubWlkZGxlbmFtZS5jaGFyQXQoMCkgKyBcIi5cIiA6IFwiXCJcbi8vICAgICB9ICR7ZW1wbG95ZWUubGFzdG5hbWV9YDtcbi8vICAgfVxuLy8gICByZXR1cm4gXCJcIjtcbi8vIH0pO1xuY29uc3QgYXV0b0ZpbGxFbXBsb3llZSA9IChlbXBsb3llZSkgPT4ge1xuICAvLyBMb2cgdGhlIHNlbGVjdGVkIGVtcGxveWVlIGRhdGFcbiAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBFbXBsb3llZTpcIiwgZW1wbG95ZWUpO1xuXG4gIGFkZERlc2lnbmF0aW9uLmVtcGxveWVlX2lkID0gZW1wbG95ZWUuaWQ7XG4gIGFkZERlc2lnbmF0aW9uLmVtcGxveWVlX25hbWUgPSBmb3JtYXRGdWxsbmFtZShlbXBsb3llZSk7XG4gIC8vIGAke2VtcGxveWVlLmZpcnN0bmFtZX0gJHtcbiAgLy8gICBlbXBsb3llZS5taWRkbGVuYW1lID8gZW1wbG95ZWUubWlkZGxlbmFtZS5jaGFyQXQoMCkgKyBcIi5cIiA6IFwiXCJcbiAgLy8gfSAke2VtcGxveWVlLmxhc3RuYW1lfWA7XG4gIGFkZERlc2lnbmF0aW9uLnBvc2l0aW9uID0gZW1wbG95ZWUucG9zaXRpb247XG4gIHNlYXJjaEtleXdvcmQudmFsdWUgPSBcIlwiO1xuICAvLyBMb2cgdGhlIGZpbGxlZCBkZXNpZ25hdGlvbiBkYXRhXG4gIGNvbnNvbGUubG9nKFwiRmlsbGVkIERlc2lnbmF0aW9uIERhdGE6XCIsIGFkZERlc2lnbmF0aW9uKTtcbn07XG5cbmNvbnN0IGZvcm1hdEZ1bGxuYW1lID0gKHJvdykgPT4ge1xuICBjb25zdCBjYXBpdGFsaXplID0gKHN0cikgPT5cbiAgICBzdHIgPyBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSA6IFwiXCI7XG5cbiAgY29uc3QgZmlyc3RuYW1lID0gcm93LmZpcnN0bmFtZSA/IGNhcGl0YWxpemUocm93LmZpcnN0bmFtZSkgOiBcIk5vIEZpcnN0bmFtZVwiO1xuICBjb25zdCBtaWRkbGVuYW1lID0gcm93Lm1pZGRsZW5hbWVcbiAgICA/IGNhcGl0YWxpemUocm93Lm1pZGRsZW5hbWUpLmNoYXJBdCgwKSArIFwiLlwiXG4gICAgOiBcIlwiO1xuICBjb25zdCBsYXN0bmFtZSA9IHJvdy5sYXN0bmFtZSA/IGNhcGl0YWxpemUocm93Lmxhc3RuYW1lKSA6IFwiTm8gTGFzdG5hbWVcIjtcblxuICByZXR1cm4gYCR7Zmlyc3RuYW1lfSAke21pZGRsZW5hbWV9ICR7bGFzdG5hbWV9YDtcbn07XG5cbmNvbnN0IG9wZW5EZXNpZ25hdGlvbkRpYWxvZyA9ICgpID0+IHtcbiAgZGVzaWduYXRpb25EaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcblxuY29uc3QgYWRkRGVzaWduYXRpb24gPSByZWFjdGl2ZSh7XG4gIGVtcGxveWVlX2lkOiBcIlwiLFxuICBlbXBsb3llZV9uYW1lOiBcIlwiLFxuICBwb3NpdGlvbjogXCJcIixcbiAgYnJhbmNoX25hbWU6IFwiXCIsXG4gIHRpbWVfc2hpZnQ6IFwiXCIsXG59KTtcblxuY29uc3QgY2xlYXJEZXNpZ25hdGlvbkZvcm0gPSAoKSA9PiB7XG4gIGFkZERlc2lnbmF0aW9uLmVtcGxveWVlX2lkID0gXCJcIjtcbiAgYWRkRGVzaWduYXRpb24uZW1wbG95ZWVfbmFtZSA9IFwiXCI7XG4gIGFkZERlc2lnbmF0aW9uLnBvc2l0aW9uID0gXCJcIjtcbiAgYWRkRGVzaWduYXRpb24uYnJhbmNoX25hbWUgPSBcIlwiO1xuICBhZGREZXNpZ25hdGlvbi50aW1lX3NoaWZ0ID0gXCJcIjtcbn07XG5cbmNvbnN0IHNhdmUgPSBhc3luYyAoKSA9PiB7XG4gIGxvYWRpbmcudmFsdWUgPSB0cnVlO1xuICBjb25zdCBkZXNpZ25hdGlvbiA9IHtcbiAgICAuLi5hZGREZXNpZ25hdGlvbixcbiAgICBicmFuY2hfaWQ6IGFkZERlc2lnbmF0aW9uLmJyYW5jaF9uYW1lLnZhbHVlLFxuICB9O1xuXG4gIGF3YWl0IGRlc2lnbmF0aW9uU3RvcmUuY3JlYXRlRGVzaWduYXRpb24oZGVzaWduYXRpb24pO1xuICBjb25zb2xlLmxvZyhcIkRlc2lnbmF0aW9uIERhdGEgdG8gU2F2ZTpcIiwgZGVzaWduYXRpb24pO1xuICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIGNsZWFyRGVzaWduYXRpb25Gb3JtKCk7XG4gIGRlc2lnbmF0aW9uRGlhbG9nLnZhbHVlID0gZmFsc2U7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi51c2VyLWNhcmQge1xuICBoZWlnaHQ6IDQyJTtcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICMzMzM7XG4gIGJveC1zaGFkb3c6IDBweCA0cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xufVxuLnVzZXItYnV0dG9uIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XG59XG5cbi51c2VyLWJ1dHRvbjpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KTtcbiAgYm94LXNoYWRvdzogMHB4IDZweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG5cbi5teS1jYXJkIHtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgYW5pbWF0aW9uOiBmYWRlSW4gMC4zcyBlYXNlO1xufVxuXG4uYnRuLWFkZCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzAwMDAwMCwgIzAwMDAwMCk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmJnLWdyYWRpZW50IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZmMzFjNSwgIzQ3MWIzYik7XG59XG5cbi5zZXBhcmF0b3ItZ3JhZGllbnQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMwMGJmYTUsICMwMDc5NmIpO1xufVxuXG4ucS1idG4ge1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcbn1cblxuLnEtYnRuOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpO1xuICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG5cbi5idG4tY2FuY2VsIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjZWY1MzUwLCAjZTUzOTM1KTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uYnRuLWNyZWF0ZSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzY2YmI2YSwgIzQzYTA0Nyk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLnEtYW5pbWF0ZS1ib3VuY2Uge1xuICBhbmltYXRpb246IGJvdW5jZUluIDAuNnMgZWFzZTtcbn1cblxuQGtleWZyYW1lcyBmYWRlSW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMHB4KTtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIH1cbn1cblxuQGtleWZyYW1lcyBib3VuY2VJbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwcHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuPC9zdHlsZT5cbiIsIi8vIHN0b3Jlcy9kdHIuanNcbmltcG9ydCB7IGRlZmluZVN0b3JlIH0gZnJvbSBcInBpbmlhXCI7XG5pbXBvcnQgeyByZWYgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwic3JjL2Jvb3QvYXhpb3NcIjtcbmltcG9ydCB7IE5vdGlmeSB9IGZyb20gXCJxdWFzYXJcIjtcblxuZXhwb3J0IGNvbnN0IHVzZURUUlN0b3JlID0gZGVmaW5lU3RvcmUoXCJkdHJzXCIsICgpID0+IHtcbiAgY29uc3QgZHRyID0gcmVmKG51bGwpO1xuICBjb25zdCBkdHJzID0gcmVmKFtdKTtcbiAgY29uc3QgZHRyQ3V0T2ZmRGF0YSA9IHJlZihbXSk7XG5cbiAgY29uc3QgZmV0Y2hEVFIgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChcIi9hcGkvZHRyXCIpO1xuICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmRhdGEpIHtcbiAgICAgICAgZHRycy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7IC8vIEFzc2lnbiB0aGUgZmV0Y2hlZCBkYXRhIHRvIHRoZSBzdG9yZVxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTsgLy8gUmV0dXJuIHRoZSBmZXRjaGVkIGRhdGFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk5vIGRhdGEgcmV0dXJuZWQgZnJvbSBBUEkuXCIpO1xuICAgICAgICBkdHJzLnZhbHVlID0gW107XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIERUUiBkYXRhOlwiLCBlcnJvcik7XG4gICAgICBkdHJzLnZhbHVlID0gW107XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGZldGNoRFRSUmFuZ2UgPSBhc3luYyAoZGF0YSkgPT4ge1xuICAgIC8vIFNlbmQgYSBQT1NUIHJlcXVlc3QgdG8gZmV0Y2ggRFRSIGRhdGFcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KFwiL2FwaS9kdHItZGF0YVwiLCBkYXRhKTtcblxuICAgIC8vIEFzc3VtaW5nIHlvdXIgRFRSIHN0b3JlIGhhcyBhIG1ldGhvZCB0byBzZXQgdGhlIGZldGNoZWQgZGF0YVxuICAgIGR0ckN1dE9mZkRhdGEudmFsdWUgPSByZXNwb25zZS5kYXRhO1xuICAgIGNvbnNvbGUubG9nKFwiRmV0Y2hlZCBEVFIgRGF0YTpcIiwgcmVzcG9uc2UuZGF0YSk7XG4gIH07XG5cbiAgY29uc3Qgc2VhcmNoRFRSID0gYXN5bmMgKGtleXdvcmQpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc29sZS5sb2coXCJTZWFyY2hpbmcgZm9yIERUUiB3aXRoIGtleXdvcmQ6XCIsIGtleXdvcmQpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucG9zdChgL2FwaS9zZWFyY2gtZHJ0P2tleXdvcmQ9JHtrZXl3b3JkfWApO1xuICAgICAgY29uc29sZS5sb2coXCJEVFIgcmVzcG9uc2U6XCIsIHJlc3BvbnNlKTtcbiAgICAgIGR0cnMudmFsdWUgPSByZXNwb25zZS5kYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2VhcmNoaW5nIERUUjpcIiwgZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzYXZlT3ZlcnRpbWUgPSBhc3luYyAoZGF0YSkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnBvc3QoXCIvYXBpL3NhdmVPdmVydGltZVwiLCBkYXRhKTtcbiAgICBkdHJzLnZhbHVlID0gcmVzcG9uc2UuZGF0YTtcbiAgICBmZXRjaERUUigpO1xuICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgICAgbWVzc2FnZTogXCJPdmVyIFRpbWUgU2F2ZVwiLFxuICAgIH0pO1xuICB9O1xuXG4gIC8vIGNvbnN0IHVwZGF0ZVRpbWVJbiA9IGFzeW5jICgpID0+IHtcbiAgLy8gICB0cnlcbiAgLy8gfVxuXG4gIHJldHVybiB7XG4gICAgZHRyLFxuICAgIGR0cnMsXG4gICAgZHRyQ3V0T2ZmRGF0YSxcbiAgICBmZXRjaERUUixcbiAgICBmZXRjaERUUlJhbmdlLFxuICAgIHNhdmVPdmVydGltZSxcbiAgICBzZWFyY2hEVFIsXG4gIH07XG59KTtcbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8cS1idG5cbiAgICAgIHBhZGRpbmc9XCJzbSBtZFwiXG4gICAgICBsYWJlbD1cIkFkZCBPdmVyIFRpbWVcIlxuICAgICAgaWNvbj1cImFkZF9jaXJjbGVcIlxuICAgICAgc2l6ZT1cIm1kXCJcbiAgICAgIGNsYXNzPVwiZ3JhZGllbnQtYnRuIHRleHQtd2hpdGVcIlxuICAgICAgQGNsaWNrPVwib3BlbkRpYWxvZ1wiXG4gICAgPlxuICAgIDwvcS1idG4+XG4gIDwvZGl2PlxuICA8ZGl2PlxuICAgIDxxLWRpYWxvZ1xuICAgICAgdi1tb2RlbD1cImRpYWxvZ1wiXG4gICAgICBmdWxsLWhlaWdodFxuICAgICAgcGVyc2lzdGVudFxuICAgICAgcG9zaXRpb249XCJyaWdodFwiXG4gICAgICBiYWNrZHJvcC1maWx0ZXI9XCJibHVyKDRweCkgc2F0dXJhdGUoMTUwJSlcIlxuICAgID5cbiAgICAgIDxxLWNhcmQgc3R5bGU9XCJ3aWR0aDogNDAwcHg7IG1heC13aWR0aDogODB2d1wiPlxuICAgICAgICA8cS1jYXJkLXNlY3Rpb25cbiAgICAgICAgICBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1weC1tZCBxLXB5LXNtIGdyYWRpZW50LWJ0biB0ZXh0LXdoaXRlXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg1IHEtbXItbWRcIj7wn5WUIEFkZCBPdmVyIFRpbWU8L2Rpdj5cbiAgICAgICAgICA8cS1zcGFjZSAvPlxuICAgICAgICAgIDxxLWJ0biBpY29uPVwiYXJyb3dfZm9yd2FyZF9pb3NcIiBmbGF0IGRlbnNlIHJvdW5kIHYtY2xvc2UtcG9wdXAgLz5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci1tZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtbWItbGdcIj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwic2VhcmNoS2V5d29yZFwiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJTZWFyY2ggRW1wbG95ZWVcIlxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwic2VhcmNoXCJcbiAgICAgICAgICAgICAgICBkZWJvdW5jZT1cIjUwMFwiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBuYW1lXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICAgICAgICAgICAgPHEtaWNvbiBuYW1lPVwic2VhcmNoXCIgLz5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDxkaXYgdi1pZj1cInNlYXJjaEtleXdvcmRcIiBjbGFzcz1cImN1c3RvbS1saXN0IHotdG9wXCI+XG4gICAgICAgICAgICAgICAgICA8cS1jYXJkPlxuICAgICAgICAgICAgICAgICAgICA8cS1saXN0IHNlcGFyYXRvcj5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtIHYtaWY9XCIhZW1wbG95ZWVzPy5sZW5ndGhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIE5vIEVtcGxveWVlIFJlY29yZFxuICAgICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cImF1dG9GaWxsRW1wbG95ZWUoZW1wbG95ZWUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCJlbXBsb3llZSBpbiBlbXBsb3llZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA6a2V5PVwiZW1wbG95ZWUuaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlja2FibGVcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGZvcm1hdEZ1bGxuYW1lKGVtcGxveWVlKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9xLWxpc3Q+XG4gICAgICAgICAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItbWQgcS1teS1sZ1wiPlxuICAgICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgICB2LW1vZGVsPVwib3ZlcnRpbWVGb3JtLmVtcGxveWVlX25hbWVcIlxuICAgICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgICAgICAgbGFiZWw9XCJOYW1lXCJcbiAgICAgICAgICAgICAgICA+PC9xLWlucHV0PlxuICAgICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgICB2LW1vZGVsPVwib3ZlcnRpbWVGb3JtLnBvc2l0aW9uXCJcbiAgICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgICAgIGxhYmVsPVwiUG9zaXRpb25cIlxuICAgICAgICAgICAgICAgID48L3EtaW5wdXQ+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgdi1tb2RlbD1cIm92ZXJ0aW1lRm9ybS5yZWd1bGFyRGF0ZUlOXCJcbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgbGFiZWw9XCJSZWd1bGFyIERhdGUgSU5cIlxuICAgICAgICAgICAgdHlwZT1cImRhdGVcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC14bCBxLWd1dHRlci15LW1kXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgICB2LW1vZGVsPVwib3ZlcnRpbWVGb3JtLmRhdGVJblwiXG4gICAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgIGxhYmVsPVwiRGF0ZSBJTlwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiZGF0ZVwiXG4gICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxNzBweFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJvdmVydGltZUZvcm0udGltZUluXCJcbiAgICAgICAgICAgICAgICAgIGxhYmVsPVwiVGltZSBJTlwiXG4gICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgbWFzaz1cIiMjOiMjIEFBXCJcbiAgICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgICA6cnVsZXM9XCJ2YWxpZGlkYXRlVGltZVwiXG4gICAgICAgICAgICAgICAgICBoaW50PVwiRm9ybWF0OiBoaDptbSBBTS9QTVwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJvdmVydGltZUZvcm0uZGF0ZU91dFwiXG4gICAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICAgIGxhYmVsPVwiRGF0ZSBPVVRcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cImRhdGVcIlxuICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTcwcHhcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgICB2LW1vZGVsPVwib3ZlcnRpbWVGb3JtLnRpbWVPdXRcIlxuICAgICAgICAgICAgICAgICAgbGFiZWw9XCJUaW1lIE9VVFwiXG4gICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgbWFzaz1cIiMjOiMjIEFBXCJcbiAgICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgICA6cnVsZXM9XCJ2YWxpZGlkYXRlVGltZVwiXG4gICAgICAgICAgICAgICAgICBoaW50PVwiRm9ybWF0OiBoaDptbSBBTS9QTVwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxxLWNhcmQtYWN0aW9ucyBjbGFzcz1cInEtbXQtbWRcIj5cbiAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICBzaXplPVwibWRcIlxuICAgICAgICAgICAgICBwYWRkaW5nPVwieHMgbWRcIlxuICAgICAgICAgICAgICBsYWJlbD1cInNhdmVcIlxuICAgICAgICAgICAgICBpY29uLXJpZ2h0PVwic2VuZFwiXG4gICAgICAgICAgICAgIGNsYXNzPVwiZ3JhZGllbnQtYnRuIHRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICBAY2xpY2s9XCJzYXZlXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDwvcS1jYXJkPlxuICAgIDwvcS1kaWFsb2c+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlLCByZWYsIGNvbXB1dGVkIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgdXNlRW1wbG95ZWVTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2VtcGxveWVlXCI7XG5pbXBvcnQgeyB1c2VEVFJTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2R0clwiO1xuXG5jb25zdCBkdHJTdG9yZSA9IHVzZURUUlN0b3JlKCk7XG5jb25zdCBlbXBsb3llZVN0b3JlID0gdXNlRW1wbG95ZWVTdG9yZSgpO1xuY29uc3Qgc2VhcmNoS2V5d29yZCA9IHJlZihcIlwiKTtcblxuY29uc3QgZW1wbG95ZWVzID0gY29tcHV0ZWQoKCkgPT4gZW1wbG95ZWVTdG9yZS5lbXBsb3llZXMpO1xuY29uc3Qgc2VhcmNoID0gYXN5bmMgKCkgPT4ge1xuICBpZiAoc2VhcmNoS2V5d29yZC52YWx1ZS50cmltKCkpIHtcbiAgICBhd2FpdCBlbXBsb3llZVN0b3JlLnNlYXJjaEVtcGxveWVlKHNlYXJjaEtleXdvcmQudmFsdWUpO1xuICB9XG59O1xuXG5jb25zdCBkaWFsb2cgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBvcGVuRGlhbG9nID0gKCkgPT4ge1xuICBkaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcblxuY29uc3QgdmFsaWRpZGF0ZVRpbWUgPSAodmFsKSA9PiB7XG4gIGNvbnN0IHRpbWVSZWdleCA9IC9eKDBbMS05XXwxWzAtMl0pOlswLTVdWzAtOV0gKEFNfFBNKSQvaTtcbiAgcmV0dXJuIHRpbWVSZWdleC50ZXN0KHZhbCkgfHwgXCJJbnZhbGlkIHRpbWUgZm9ybWF0XCI7XG59O1xuXG5jb25zdCBhdXRvRmlsbEVtcGxveWVlID0gKGVtcGxveWVlKSA9PiB7XG4gIG92ZXJ0aW1lRm9ybS5lbXBsb3llZV9pZCA9IGVtcGxveWVlLmlkO1xuICBvdmVydGltZUZvcm0uZW1wbG95ZWVfbmFtZSA9IGAke2VtcGxveWVlLmZpcnN0bmFtZX0gJHtcbiAgICBlbXBsb3llZS5taWRkbGVuYW1lID8gZW1wbG95ZWUubWlkZGxlbmFtZS5jaGFyQXQoMCkgKyBcIi5cIiA6IFwiXCJcbiAgfSAke2VtcGxveWVlLmxhc3RuYW1lfWA7XG4gIG92ZXJ0aW1lRm9ybS5wb3NpdGlvbiA9IGVtcGxveWVlLnBvc2l0aW9uO1xuICBzZWFyY2hLZXl3b3JkLnZhbHVlID0gXCJcIjtcbn07XG5cbmNvbnN0IG92ZXJ0aW1lRm9ybSA9IHJlYWN0aXZlKHtcbiAgZW1wbG95ZWVfaWQ6IFwiXCIsXG4gIGVtcGxveWVlX25hbWU6IFwiXCIsXG4gIHBvc2l0aW9uOiBcIlwiLFxuICByZWd1bGFyRGF0ZUlOOiBcIlwiLFxuICBkYXRlSW46IFwiXCIsXG4gIGRhdGVPdXQ6IFwiXCIsXG4gIHRpbWVJbjogXCJcIixcbiAgdGltZU91dDogXCJcIixcbn0pO1xuXG5jb25zdCBmb3JtYXRGdWxsbmFtZSA9IChyb3cpID0+IHtcbiAgY29uc3QgY2FwaXRhbGl6ZSA9IChzdHIpID0+XG4gICAgc3RyID8gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkgOiBcIlwiO1xuXG4gIGNvbnN0IGZpcnN0bmFtZSA9IHJvdy5maXJzdG5hbWUgPyBjYXBpdGFsaXplKHJvdy5maXJzdG5hbWUpIDogXCJObyBGaXJzdG5hbWVcIjtcbiAgY29uc3QgbWlkZGxlbmFtZSA9IHJvdy5taWRkbGVuYW1lXG4gICAgPyBjYXBpdGFsaXplKHJvdy5taWRkbGVuYW1lKS5jaGFyQXQoMCkgKyBcIi5cIlxuICAgIDogXCJcIjtcbiAgY29uc3QgbGFzdG5hbWUgPSByb3cubGFzdG5hbWUgPyBjYXBpdGFsaXplKHJvdy5sYXN0bmFtZSkgOiBcIk5vIExhc3RuYW1lXCI7XG5cbiAgcmV0dXJuIGAke2ZpcnN0bmFtZX0gJHttaWRkbGVuYW1lfSAke2xhc3RuYW1lfWA7XG59O1xuXG5jb25zdCBzYXZlID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBvdmVydGltZV9pbiA9IGAke292ZXJ0aW1lRm9ybS5kYXRlSW59ICR7b3ZlcnRpbWVGb3JtLnRpbWVJbn1gO1xuICBjb25zdCBvdmVydGltZV9vdXQgPSBgJHtvdmVydGltZUZvcm0uZGF0ZU91dH0gJHtvdmVydGltZUZvcm0udGltZU91dH1gO1xuXG4gIGNvbnN0IGRhdGFUb1NlbmQgPSB7XG4gICAgLi4ub3ZlcnRpbWVGb3JtLFxuICAgIG92ZXJ0aW1lX2luOiBvdmVydGltZV9pbixcbiAgICBvdmVydGltZV9vdXQ6IG92ZXJ0aW1lX291dCxcbiAgfTtcbiAgYXdhaXQgZHRyU3RvcmUuc2F2ZU92ZXJ0aW1lKGRhdGFUb1NlbmQpO1xuICBjb25zb2xlLmxvZyhcIm92ZXJ0aW1lIGRBVEFcIiwgZGF0YVRvU2VuZCk7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5ncmFkaWVudC1idG4ge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICMxMDM0MzIsICMyNTc1ZmMpO1xuICBib3JkZXI6IG5vbmU7XG59XG4uY2FuY2VsLWJ0biB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzBjMGUwZSwgIzg1ODg4Zik7XG4gIGJvcmRlcjogbm9uZTtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWlucHV0XG4gICAgdi1tb2RlbD1cInNlYXJjaEtleXdvcmRcIlxuICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJzZWFyY2hcIlxuICAgIG91dGxpbmVkXG4gICAgZGVuc2VcbiAgICBmbGF0XG4gICAgbGFiZWw9XCJTZWFyY2hcIlxuICAgIGRlYm91bmNlPVwiMTAwMFwiXG4gICAgc3R5bGU9XCJ3aWR0aDogMzAwcHhcIlxuICA+XG4gICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICA8ZGl2PlxuICAgICAgICA8cS1pY29uIHYtaWY9XCIhbG9hZGluZ1wiIG5hbWU9XCJzZWFyY2hcIiAvPlxuICAgICAgICA8cS1zcGlubmVyIHYtZWxzZSBjb2xvcj1cImdyZXlcIiBzaXplPVwic21cIiAvPlxuICAgICAgPC9kaXY+XG4gICAgPC90ZW1wbGF0ZT5cbiAgPC9xLWlucHV0PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZURUUlN0b3JlIH0gZnJvbSBcInN0b3Jlcy9kdHJcIjtcbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgZHRyU3RvcmUgPSB1c2VEVFJTdG9yZSgpO1xuY29uc3Qgc2VhcmNoS2V5d29yZCA9IHJlZihcIlwiKTtcbmNvbnN0IGxvYWRpbmcgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBzZWFyY2ggPSBhc3luYyAoKSA9PiB7XG4gIGxvYWRpbmcudmFsdWUgPSB0cnVlO1xuICBhd2FpdCBkdHJTdG9yZS5zZWFyY2hEVFIoc2VhcmNoS2V5d29yZC52YWx1ZSk7XG4gIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWJ0blxuICAgIGNvbG9yPVwicG9zaXRpdmVcIlxuICAgIGljb249XCJlZGl0XCJcbiAgICBzaXplPVwic21cIlxuICAgIGZsYXRcbiAgICByb3VuZFxuICAgIGRlbnNlXG4gICAgQGNsaWNrPVwib3BlbkRpYWxvZ1wiXG4gID5cbiAgICA8IS0tIEBjbGljaz1cIm9wZW5FZGl0Rm9ybVwiIC0tPlxuICAgIDxxLXRvb2x0aXAgY2xhc3M9XCJiZy1wb3NpdGl2ZVwiIDpkZWxheT1cIjIwMFwiPkVkaXQ8L3EtdG9vbHRpcD5cbiAgPC9xLWJ0bj5cbiAgPHEtZGlhbG9nIHYtbW9kZWw9XCJkaWFsb2dcIj5cbiAgICA8cS1jYXJkIHN0eWxlPVwid2lkdGg6IDUwMHB4OyBtYXgtd2lkdGg6IDgwdndcIj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvblxuICAgICAgICBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1weC1tZCBxLXB5LXNtIGdyYWRpZW50LWJ0biB0ZXh0LXdoaXRlXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDUgcS1tci1tZFwiPvCflZQgRWRpdCBUaW1lPC9kaXY+XG4gICAgICAgIDxxLXNwYWNlIC8+XG4gICAgICAgIDxxLWJ0biBpY29uPVwiY2xvc2VcIiBmbGF0IGRlbnNlIHJvdW5kIHYtY2xvc2UtcG9wdXAgLz5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgPGRpdj5OYW1lOiB7eyBmb3JtYXRGdWxsbmFtZShkdHJEYXRhLmVtcGxveWVlKSB9fTwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICBQb3NpdGlvbjpcbiAgICAgICAgICAgIHt7IGR0ckRhdGEuZW1wbG95ZWUucG9zaXRpb24gfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LWxnIHEtZ3V0dGVyLW1kXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXY+VGltZSBJTjwvZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dCBvdXRsaW5lZCBkZW5zZSB2LW1vZGVsPVwiZWRpdERUUkZvcm0udGltZV9pblwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXY+VGltZSBPVVQ8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXQgb3V0bGluZWQgZGVuc2Ugdi1tb2RlbD1cImVkaXREVFJGb3JtLnRpbWVfb3V0XCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2Pkx1bmNoIEJyZWFrIFN0YXJ0PC9kaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0IG91dGxpbmVkIGRlbnNlIHYtbW9kZWw9XCJlZGl0RFRSRm9ybS5sdW5jaF9icmVha19zdGFydFwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXY+THVuY2ggQnJlYWsgRW5kPC9kaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0IG91dGxpbmVkIGRlbnNlIHYtbW9kZWw9XCJlZGl0RFRSRm9ybS5sdW5jaF9icmVha19lbmRcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXY+QnJlYWsgU3RhcnQ8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXQgb3V0bGluZWQgZGVuc2Ugdi1tb2RlbD1cImVkaXREVFJGb3JtLmJyZWFrX3N0YXJ0XCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdj5CcmVhayBFbmQ8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXQgb3V0bGluZWQgZGVuc2Ugdi1tb2RlbD1cImVkaXREVFJGb3JtLmJyZWFrX2VuZFwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdj5PdmVyIFRpbWUgU3RhcnQ8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXQgb3V0bGluZWQgZGVuc2Ugdi1tb2RlbD1cImVkaXREVFJGb3JtLm92ZXJfc3RhcnRcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2Pk92ZXIgVGltZSBFbmQ8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXQgb3V0bGluZWQgZGVuc2Ugdi1tb2RlbD1cImVkaXREVFJGb3JtLm92ZXJfZW5kXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8IS0tIHt7IHByb3BzLmVkaXQucm93IH19IC0tPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtYWN0aW9ucyBjbGFzcz1cInJvdyBxLW1hLW1kXCIgYWxpZ249XCJyaWdodFwiPlxuICAgICAgICA8cS1idG5cbiAgICAgICAgICBjbGFzcz1cImJ0bi1jYW5jZWwgZ2xvc3N5XCJcbiAgICAgICAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICAgICAgICBsYWJlbD1cIkNhbmNlbFwiXG4gICAgICAgICAgdi1jbG9zZS1wb3B1cFxuICAgICAgICAvPlxuICAgICAgICA8cS1idG4gY2xhc3M9XCJidG4tY3JlYXRlIGdsb3NzeVwiIGNvbG9yPVwicG9zaXRpdmVcIiBsYWJlbD1cIlNhdmVcIiAvPlxuICAgICAgICA8IS0tIDpsb2FkaW5nPVwibG9hZGluZ1wiXG4gICAgICAgICAgQGNsaWNrPVwic2F2ZUVkaXRlZEluZ3JlZGllbnRcIiAtLT5cbiAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVhY3RpdmUsIHJlZiB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyhbXCJlZGl0XCJdKTtcbmNvbnN0IGR0ckRhdGEgPSBwcm9wcy5lZGl0LnJvdztcbmNvbnN0IGRpYWxvZyA9IHJlZigpO1xuXG5jb25zdCBmb3JtYXRGdWxsbmFtZSA9IChyb3cpID0+IHtcbiAgY29uc3QgY2FwaXRhbGl6ZSA9IChzdHIpID0+XG4gICAgc3RyID8gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkgOiBcIlwiO1xuXG4gIGNvbnN0IGZpcnN0bmFtZSA9IHJvdy5maXJzdG5hbWUgPyBjYXBpdGFsaXplKHJvdy5maXJzdG5hbWUpIDogXCJObyBGaXJzdG5hbWVcIjtcbiAgY29uc3QgbWlkZGxlbmFtZSA9IHJvdy5taWRkbGVuYW1lXG4gICAgPyBjYXBpdGFsaXplKHJvdy5taWRkbGVuYW1lKS5jaGFyQXQoMCkgKyBcIi5cIlxuICAgIDogXCJcIjtcbiAgY29uc3QgbGFzdG5hbWUgPSByb3cubGFzdG5hbWUgPyBjYXBpdGFsaXplKHJvdy5sYXN0bmFtZSkgOiBcIk5vIExhc3RuYW1lXCI7XG5cbiAgcmV0dXJuIGAke2ZpcnN0bmFtZX0gJHttaWRkbGVuYW1lfSAke2xhc3RuYW1lfWAudHJpbSgpO1xufTtcblxuY29uc3QgZWRpdERUUkZvcm0gPSByZWFjdGl2ZSh7XG4gIHRpbWVfaW46IFwiXCIsXG4gIHRpbWVfb3V0OiBcIlwiLFxuICBsdW5jaF9icmVha19zdGFydDogXCJcIixcbiAgbHVuY2hfYnJlYWtfZW5kOiBcIlwiLFxuICBicmVha19zdGFydDogXCJcIixcbiAgYnJlYWtfZW5kOiBcIlwiLFxuICBvdmVyX3N0YXJ0OiBcIlwiLFxuICBvdmVyX2VuZDogXCJcIixcbn0pO1xuXG5jb25zdCBvcGVuRGlhbG9nID0gKCkgPT4ge1xuICBjb25zdCBlZGl0RFRSID0gT2JqZWN0LmFzc2lnbihlZGl0RFRSRm9ybSwgZHRyRGF0YSk7XG4gIGRpYWxvZy52YWx1ZSA9IHRydWU7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5xLWJ0biB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xufVxuXG4ucS1idG46aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcbn1cbi5ncmFkaWVudC1idG4ge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICMxMDM0MzIsICMyNTc1ZmMpO1xuICBib3JkZXI6IG5vbmU7XG59XG4uY2FuY2VsLWJ0biB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzBjMGUwZSwgIzg1ODg4Zik7XG4gIGJvcmRlcjogbm9uZTtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuIHEtbWItbWRcIiBhbGlnbj1cInJpZ2h0XCI+XG4gICAgPGRpdj5cbiAgICAgIDxPdmVydGltZUJ1dHRvbiAvPlxuICAgIDwvZGl2PlxuICAgIDxTZWFyY2hEVFIgLz5cbiAgPC9kaXY+XG4gIDxkaXY+XG4gICAgPHEtdGFibGVcbiAgICAgIDpyb3dzPVwiZHRyUm93c1wiXG4gICAgICA6Y29sdW1ucz1cImR0ckNvbHVtbnNcIlxuICAgICAgcm93LWtleT1cInRpbWVfaW5cIlxuICAgICAgY2xhc3M9XCJzdGlja3ktaGVhZGVyXCJcbiAgICAgIGhpZGUtYm90dG9tXG4gICAgICB2LW1vZGVsOnBhZ2luYXRpb249XCJwYWdpbmF0aW9uXCJcbiAgICAgIDpyb3dzLXBlci1wYWdlLW9wdGlvbnM9XCJbMF1cIlxuICAgID5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLXRpbWVfaW49XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwicHJvcHMucm93LnRpbWVfaW5cIj5cbiAgICAgICAgICAgIDxxLWJhZGdlIG91dGxpbmUgY29sb3I9XCJwb3NpdGl2ZVwiPlxuICAgICAgICAgICAgICB7eyBmb3JtYXRUaW1lKHByb3BzLnJvdy50aW1lX2luKSB9fVxuICAgICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICAgICAgPCEtLSA8cS10b29sdGlwIGNsYXNzPVwiYmctYmx1ZS1ncmV5LThcIiA6b2Zmc2V0PVwiWzEwLCAxMF1cIj5cbiAgICAgICAgICAgICAgRWRpdCBUaW1lIEluXG4gICAgICAgICAgICA8L3EtdG9vbHRpcD5cbiAgICAgICAgICAgIDxxLXBvcC1lZGl0XG4gICAgICAgICAgICAgIHYtbW9kZWw9XCJwcm9wcy5yb3cudGltZV9pblwiXG4gICAgICAgICAgICAgIGF1dG8tc2F2ZVxuICAgICAgICAgICAgICBAc3VibWl0PVwidXBkYXRlVGltZUluKHByb3BzLnJvdylcIlxuICAgICAgICAgICAgICB2LXNsb3Q9XCJzY29wZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cInByb3BzLnJvdy50aW1lX2luXCJcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIGF1dG9mb2N1c1xuICAgICAgICAgICAgICAgIHR5cGU9XCJkYXRldGltZS1sb2NhbFwiXG4gICAgICAgICAgICAgICAgQGtleXVwLmVudGVyPVwic2NvcGU/LnNldCA/IHNjb3BlLnNldCgpIDogbnVsbFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3EtcG9wLWVkaXQ+IC0tPlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICAgIDxzcGFuPiAtIC0gLSA8L3NwYW4+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cblxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtdGltZV9vdXQ9XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwicHJvcHMucm93LnRpbWVfb3V0XCI+XG4gICAgICAgICAgICA8cS1iYWRnZSBvdXRsaW5lIGNvbG9yPVwicHVycGxlLTEyXCI+XG4gICAgICAgICAgICAgIHt7IGZvcm1hdFRpbWUocHJvcHMucm93LnRpbWVfb3V0KSB9fVxuICAgICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICAgIDxzcGFuPiAtIC0gLSA8L3NwYW4+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLWx1bmNoX2JyZWFrX3N0YXJ0PVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1pZj1cInByb3BzLnJvdy5sdW5jaF9icmVha19zdGFydFwiPlxuICAgICAgICAgICAgPHEtYmFkZ2Ugb3V0bGluZSBjb2xvcj1cImFtYmVyLTdcIj57e1xuICAgICAgICAgICAgICBmb3JtYXRUaW1lKHByb3BzLnJvdy5sdW5jaF9icmVha19zdGFydClcbiAgICAgICAgICAgIH19PC9xLWJhZGdlPlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICAgIDxzcGFuPiAtIC0gLSA8L3NwYW4+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLWx1bmNoX2JyZWFrX2VuZD1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCJwcm9wcy5yb3cubHVuY2hfYnJlYWtfZW5kXCI+XG4gICAgICAgICAgICA8cS1iYWRnZSBvdXRsaW5lIGNvbG9yPVwiYW1iZXItNFwiPnt7XG4gICAgICAgICAgICAgIGZvcm1hdFRpbWUocHJvcHMucm93Lmx1bmNoX2JyZWFrX2VuZClcbiAgICAgICAgICAgIH19PC9xLWJhZGdlPlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICAgIDxzcGFuPiAtIC0gLSA8L3NwYW4+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLWJyZWFrX3N0YXJ0PVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1pZj1cInByb3BzLnJvdy5icmVha19zdGFydFwiPlxuICAgICAgICAgICAgPHEtYmFkZ2Ugb3V0bGluZSBjb2xvcj1cImJsdWUtN1wiPnt7XG4gICAgICAgICAgICAgIGZvcm1hdFRpbWUocHJvcHMucm93LmJyZWFrX3N0YXJ0KVxuICAgICAgICAgICAgfX08L3EtYmFkZ2U+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICAgICAgPHNwYW4+IC0gLSAtIDwvc3Bhbj5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtYnJlYWtfZW5kPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1pZj1cInByb3BzLnJvdy5icmVha19lbmRcIj5cbiAgICAgICAgICAgIDxxLWJhZGdlIG91dGxpbmUgY29sb3I9XCJibHVlLTRcIj57e1xuICAgICAgICAgICAgICBmb3JtYXRUaW1lKHByb3BzLnJvdy5icmVha19lbmQpXG4gICAgICAgICAgICB9fTwvcS1iYWRnZT5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgICAgICA8c3Bhbj4gLSAtIC0gPC9zcGFuPlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC1icmVhaz1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCJwcm9wcy5yb3cuYnJlYWtfc3RhcnQgJiYgcHJvcHMucm93LmJyZWFrX2VuZFwiPlxuICAgICAgICAgICAgPHEtYmFkZ2VcbiAgICAgICAgICAgICAgb3V0bGluZVxuICAgICAgICAgICAgICA6Y29sb3I9XCJnZXRCcmVha0NvbG9yKHByb3BzLnJvdy5icmVha19zdGFydCwgcHJvcHMucm93LmJyZWFrX2VuZClcIlxuICAgICAgICAgICAgICBjbGFzcz1cInEtbWEteHNcIlxuICAgICAgICAgICAgICBzaXplPVwibWRcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8cS1pY29uXG4gICAgICAgICAgICAgICAgOm5hbWU9XCJcbiAgICAgICAgICAgICAgICAgIGdldEJyZWFrSG91cnNJY29uKHByb3BzLnJvdy5icmVha19zdGFydCwgcHJvcHMucm93LmJyZWFrX2VuZClcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgIHNpemU9XCJ4c1wiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJxLW1yLXhzXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAge3tcbiAgICAgICAgICAgICAgICBgJHtcbiAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZVRvdGFsV29ya2luZ0hvdXJzKFxuICAgICAgICAgICAgICAgICAgICBwcm9wcy5yb3cuYnJlYWtfc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIHByb3BzLnJvdy5icmVha19lbmRcbiAgICAgICAgICAgICAgICAgICkuaG91cnNcbiAgICAgICAgICAgICAgICB9IEhycyA6ICR7XG4gICAgICAgICAgICAgICAgICBjYWxjdWxhdGVUb3RhbFdvcmtpbmdIb3VycyhcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMucm93LmJyZWFrX3N0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBwcm9wcy5yb3cuYnJlYWtfZW5kXG4gICAgICAgICAgICAgICAgICApLm1pbnV0ZXNcbiAgICAgICAgICAgICAgICB9IE1pbmBcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIDwvcS1iYWRnZT5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgICAgICA8c3Bhbj4gLSAtIC0gPC9zcGFuPlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC1sdW5jaF9icmVhaz1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPHRlbXBsYXRlXG4gICAgICAgICAgICB2LWlmPVwicHJvcHMucm93Lmx1bmNoX2JyZWFrX3N0YXJ0ICYmIHByb3BzLnJvdy5sdW5jaF9icmVha19lbmRcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxxLWJhZGdlXG4gICAgICAgICAgICAgIG91dGxpbmVcbiAgICAgICAgICAgICAgOmNvbG9yPVwiXG4gICAgICAgICAgICAgICAgZ2V0THVuY2hCcmVha0NvbG9yKFxuICAgICAgICAgICAgICAgICAgcHJvcHMucm93Lmx1bmNoX2JyZWFrX3N0YXJ0LFxuICAgICAgICAgICAgICAgICAgcHJvcHMucm93Lmx1bmNoX2JyZWFrX2VuZFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJxLW1hLXhzXCJcbiAgICAgICAgICAgICAgc2l6ZT1cIm1kXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHEtaWNvblxuICAgICAgICAgICAgICAgIDpuYW1lPVwiXG4gICAgICAgICAgICAgICAgICBnZXRMdW5jaEJyZWFrSWNvbihcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMucm93Lmx1bmNoX2JyZWFrX3N0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBwcm9wcy5yb3cubHVuY2hfYnJlYWtfZW5kXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICBzaXplPVwieHNcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicS1tci14c1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIHt7XG4gICAgICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgICBjYWxjdWxhdGVUb3RhbFdvcmtpbmdIb3VycyhcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMucm93Lmx1bmNoX2JyZWFrX3N0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBwcm9wcy5yb3cubHVuY2hfYnJlYWtfZW5kXG4gICAgICAgICAgICAgICAgICApLmhvdXJzXG4gICAgICAgICAgICAgICAgfSBIcnMgOiAke1xuICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlVG90YWxXb3JraW5nSG91cnMoXG4gICAgICAgICAgICAgICAgICAgIHByb3BzLnJvdy5sdW5jaF9icmVha19zdGFydCxcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMucm93Lmx1bmNoX2JyZWFrX2VuZFxuICAgICAgICAgICAgICAgICAgKS5taW51dGVzXG4gICAgICAgICAgICAgICAgfSBNaW5gXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA8L3EtYmFkZ2U+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICAgICAgPHNwYW4+IC0gLSAtIDwvc3Bhbj5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtdG90YWxfd29ya2luZ19ob3Vycz1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPHRlbXBsYXRlIHYtaWY9XCJwcm9wcy5yb3cudGltZV9pbiAmJiBwcm9wcy5yb3cudGltZV9vdXRcIj5cbiAgICAgICAgICAgIDxxLWJhZGdlXG4gICAgICAgICAgICAgIG91dGxpbmVcbiAgICAgICAgICAgICAgOmNvbG9yPVwiZ2V0V29ya0hvdXJzQ29sb3IocHJvcHMucm93LnRpbWVfaW4sIHByb3BzLnJvdy50aW1lX291dClcIlxuICAgICAgICAgICAgICBjbGFzcz1cInEtbWEteHNcIlxuICAgICAgICAgICAgICBzaXplPVwibWRcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8cS1pY29uXG4gICAgICAgICAgICAgICAgOm5hbWU9XCJnZXRXb3JrSG91cnNJY29uKHByb3BzLnJvdy50aW1lX2luLCBwcm9wcy5yb3cudGltZV9vdXQpXCJcbiAgICAgICAgICAgICAgICBzaXplPVwieHNcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicS1tci14c1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIHt7XG4gICAgICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgICBjYWxjdWxhdGVUb3RhbFdvcmtpbmdIb3VycyhcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMucm93LnRpbWVfaW4sXG4gICAgICAgICAgICAgICAgICAgIHByb3BzLnJvdy50aW1lX291dFxuICAgICAgICAgICAgICAgICAgKS5ob3Vyc1xuICAgICAgICAgICAgICAgIH0gSHJzIDogJHtcbiAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZVRvdGFsV29ya2luZ0hvdXJzKFxuICAgICAgICAgICAgICAgICAgICBwcm9wcy5yb3cudGltZV9pbixcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMucm93LnRpbWVfb3V0XG4gICAgICAgICAgICAgICAgICApLm1pbnV0ZXNcbiAgICAgICAgICAgICAgICB9IE1pbmBcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIDwvcS1iYWRnZT5cbiAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgICAgICA8c3Bhbj4gLSAtIC0gPC9zcGFuPlxuICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC1hY3Rpb249XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1jZW50ZXIgcS1ndXR0ZXIteC1tZFwiPlxuICAgICAgICAgICAgPEVkaXREVFIgOmVkaXQ9XCJwcm9wc1wiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9xLXRhYmxlPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYsIG9uTW91bnRlZCwgY29tcHV0ZWQgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyB1c2VEVFJTdG9yZSB9IGZyb20gXCJzdG9yZXMvZHRyXCI7XG5pbXBvcnQgT3ZlcnRpbWVCdXR0b24gZnJvbSBcIi4vT3ZlcnRpbWVCdXR0b24udnVlXCI7XG5pbXBvcnQgU2VhcmNoRFRSIGZyb20gXCIuL1NlYXJjaERUUi52dWVcIjtcbmltcG9ydCBFZGl0RFRSIGZyb20gXCIuL0VkaXREVFIudnVlXCI7XG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwic3JjL2Jvb3QvYXhpb3NcIjtcblxuY29uc3QgcGFnaW5hdGlvbiA9IHJlZih7XG4gIHJvd3NQZXJQYWdlOiAwLFxufSk7XG5jb25zdCBkdHJTdG9yZSA9IHVzZURUUlN0b3JlKCk7XG4vLyBjb25zdCBkdHJSb3dzID0gcmVmKFtdKTtcbmNvbnN0IGR0clJvd3MgPSBjb21wdXRlZCgoKSA9PiBkdHJTdG9yZS5kdHJzKTtcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgYXdhaXQgcmVsb2FkVGFibGVEYXRhKCk7XG59KTtcblxuY29uc3QgcmVsb2FkVGFibGVEYXRhID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIC8vIGNvbnN0IGRhdGEgPSBhd2FpdCBkdHJTdG9yZS5mZXRjaERUUigpO1xuICAgIC8vIGR0clJvd3MudmFsdWUgPSBBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YSA6IFtdO1xuICAgIGR0clJvd3MudmFsdWUgPSBhd2FpdCBkdHJTdG9yZS5mZXRjaERUUigpO1xuICAgIGNvbnNvbGUubG9nKFwiZHRyc3NzXCIsIGR0clJvd3MudmFsdWUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZmV0Y2hpbmcgRFRSIGRhdGE6XCIsIGVycm9yKTtcbiAgfVxufTtcblxuY29uc3QgdXBkYXRlVGltZUluID0gYXN5bmMgKHJvdykgPT4ge1xuICAvLyB0cnkge1xuICAvLyAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnB1dChcIi9hcGkvdXBkYXRlLXRpbWVJbi9cIiArIGRhdGEuaWQsIHtcbiAgLy8gICAgIHRpbWVfaW46IHZhbCxcbiAgLy8gICB9KTtcbiAgLy8gICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAvLyAgICAgY29uc3QgaSA9IHJlY2lwZXMudmFsdWUuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09IGRhdGEuaWQpO1xuICAvLyAgICAgcmVjaXBlcy52YWx1ZVtpXSA9IHZhbDtcbiAgLy8gICB9XG4gIC8vICAgTm90aWZ5LmNyZWF0ZSh7XG4gIC8vICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXG4gIC8vICAgICBtZXNzYWdlOiBcIlJlY2lwZSBuYW1lIGVkaXRlZCBzdWNjZXNzZnVsbHlcIixcbiAgLy8gICAgIHBvc2l0aW9uOiBcInRvcFwiLFxuICAvLyAgIH0pO1xuICAvLyB9IGNhdGNoIChlcnJvcikge1xuICAvLyAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB1cGRhdGluZyByZWNpcGUgbmFtZTpcIiwgZXJyb3IpO1xuICAvLyAgIE5vdGlmeS5jcmVhdGUoe1xuICAvLyAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAvLyAgICAgbWVzc2FnZTogXCJGYWlsZWQgdG8gZWRpdCByZWNpcGUgbmFtZVwiLFxuICAvLyAgICAgcG9zaXRpb246IFwidG9wXCIsXG4gIC8vICAgfSk7XG4gIC8vIH1cbiAgY29uc29sZS5sb2coXCJVcGRhdGVkIHRpbWVfaW46XCIsIHJvdy50aW1lX2luKTtcbn07XG5cbmNvbnN0IGZvcm1hdEZ1bGxuYW1lID0gKHJvdykgPT4ge1xuICBjb25zdCBjYXBpdGFsaXplID0gKHN0cikgPT5cbiAgICBzdHIgPyBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSA6IFwiXCI7XG5cbiAgY29uc3QgZmlyc3RuYW1lID0gcm93LmZpcnN0bmFtZSA/IGNhcGl0YWxpemUocm93LmZpcnN0bmFtZSkgOiBcIk5vIEZpcnN0bmFtZVwiO1xuICBjb25zdCBtaWRkbGVuYW1lID0gcm93Lm1pZGRsZW5hbWVcbiAgICA/IGNhcGl0YWxpemUocm93Lm1pZGRsZW5hbWUpLmNoYXJBdCgwKSArIFwiLlwiXG4gICAgOiBcIlwiO1xuICBjb25zdCBsYXN0bmFtZSA9IHJvdy5sYXN0bmFtZSA/IGNhcGl0YWxpemUocm93Lmxhc3RuYW1lKSA6IFwiTm8gTGFzdG5hbWVcIjtcblxuICByZXR1cm4gYCR7Zmlyc3RuYW1lfSAke21pZGRsZW5hbWV9ICR7bGFzdG5hbWV9YC50cmltKCk7XG59O1xuXG5jb25zdCBmb3JtYXREYXRlID0gKGRhdGVUaW1lKSA9PiB7XG4gIGlmICghZGF0ZVRpbWUpIHJldHVybiBcIiAtIC0gXCI7IC8vIFJldHVybiBhIHBsYWNlaG9sZGVyIGlmIHRoZSB2YWx1ZSBpcyBtaXNzaW5nXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRlVGltZSk7XG4gIGlmIChpc05hTihkYXRlLmdldFRpbWUoKSkpIHJldHVybiBcIiAtIC0gXCI7XG5cbiAgcmV0dXJuIGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZW4tVVNcIiwge1xuICAgIG1vbnRoOiBcInNob3J0XCIsXG4gICAgZGF5OiBcIm51bWVyaWNcIixcbiAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgfSk7IC8vIEZvcm1hdCBhcyBcIk9jdC4gMTQsIDIwMjRcIlxufTtcblxuLy8gRnVuY3Rpb24gdG8gZm9ybWF0IHRpbWVcbmNvbnN0IGZvcm1hdFRpbWUgPSAoZGF0ZVRpbWUpID0+IHtcbiAgaWYgKCFkYXRlVGltZSkgcmV0dXJuIFwiIC0gLSBcIjtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGVUaW1lKTtcbiAgaWYgKGlzTmFOKGRhdGUuZ2V0VGltZSgpKSkgcmV0dXJuIFwiIC0gLSBcIjtcblxuICAvLyBGb3JtYXQgaG91cnMgYW5kIG1pbnV0ZXMgbWFudWFsbHlcbiAgbGV0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICBjb25zdCBtaW51dGVzID0gZGF0ZS5nZXRNaW51dGVzKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIGNvbnN0IGFtUG0gPSBob3VycyA+PSAxMiA/IFwiUE1cIiA6IFwiQU1cIjtcblxuICAvLyBDb252ZXJ0IHRvIDEyLWhvdXIgZm9ybWF0XG4gIGhvdXJzID0gaG91cnMgJSAxMjtcbiAgaG91cnMgPSBob3VycyA/IGhvdXJzIDogMTI7IC8vIElmIGhvdXJzIGVxdWFscyAwLCBzZXQgdG8gMTJcblxuICByZXR1cm4gYCR7aG91cnN9OiR7bWludXRlc30gJHthbVBtfWA7IC8vIGUuZy4sIFwiNDozNCBQTVwiXG59O1xuXG5jb25zdCBjYWxjdWxhdGVUb3RhbFdvcmtpbmdIb3VycyA9ICh0aW1lSW4sIHRpbWVPdXQpID0+IHtcbiAgaWYgKCF0aW1lSW4gfHwgIXRpbWVPdXQpIHJldHVybiB7IGhvdXJzOiAwLCBtaW51dGVzOiAwIH07XG5cbiAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSh0aW1lSW4pO1xuICBjb25zdCBlbmQgPSBuZXcgRGF0ZSh0aW1lT3V0KTtcblxuICAvLyBDaGVjayBpZiB0aGUgdGltZXMgYXJlIHZhbGlkXG4gIGlmIChpc05hTihzdGFydC5nZXRUaW1lKCkpIHx8IGlzTmFOKGVuZC5nZXRUaW1lKCkpKVxuICAgIHJldHVybiB7IGhvdXJzOiAwLCBtaW51dGVzOiAwIH07XG5cbiAgY29uc3QgZGlmZkluTWlsbGlzID0gZW5kIC0gc3RhcnQ7IC8vIERpZmZlcmVuY2UgaW4gbWlsbGlzZWNvbmRzXG5cbiAgLy8gQ2FsY3VsYXRlIHRvdGFsIGhvdXJzIGFuZCBtaW51dGVzXG4gIGNvbnN0IHRvdGFsTWludXRlcyA9IE1hdGguZmxvb3IoZGlmZkluTWlsbGlzIC8gKDEwMDAgKiA2MCkpOyAvLyBUb3RhbCBtaW51dGVzXG4gIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcih0b3RhbE1pbnV0ZXMgLyA2MCk7IC8vIFRvdGFsIGhvdXJzXG4gIGNvbnN0IG1pbnV0ZXMgPSB0b3RhbE1pbnV0ZXMgJSA2MDsgLy8gUmVtYWluaW5nIG1pbnV0ZXNcblxuICByZXR1cm4geyBob3VycywgbWludXRlcyB9O1xufTtcblxuY29uc3QgY2FsY3VsYXRlVG90YWxPdmVydGltZUhvdXJzID0gKHRpbWVJbiwgdGltZU91dCkgPT4ge1xuICAvLyBEZWJ1Z2dpbmc6IExvZyB0aGUgaW5wdXQgdmFsdWVzXG4gIGNvbnNvbGUubG9nKFwiSW5wdXQgdGltZUluOlwiLCB0aW1lSW4pO1xuICBjb25zb2xlLmxvZyhcIklucHV0IHRpbWVPdXQ6XCIsIHRpbWVPdXQpO1xuXG4gIGlmICghdGltZUluIHx8ICF0aW1lT3V0KSByZXR1cm4gXCIgLSAtIC0gXCI7XG5cbiAgLy8gUGFyc2UgdGhlIGlucHV0IHRpbWVzXG4gIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodGltZUluKTtcbiAgY29uc3QgZW5kID0gbmV3IERhdGUodGltZU91dCk7XG5cbiAgLy8gRGVidWdnaW5nOiBMb2cgdGhlIHBhcnNlZCBzdGFydCBhbmQgZW5kIGRhdGVzXG4gIGNvbnNvbGUubG9nKFwiUGFyc2VkIHN0YXJ0IGRhdGU6XCIsIHN0YXJ0KTtcbiAgY29uc29sZS5sb2coXCJQYXJzZWQgZW5kIGRhdGU6XCIsIGVuZCk7XG5cbiAgLy8gQ2hlY2sgaWYgdGhlIHBhcnNlZCBkYXRlcyBhcmUgdmFsaWRcbiAgaWYgKGlzTmFOKHN0YXJ0LmdldFRpbWUoKSkgfHwgaXNOYU4oZW5kLmdldFRpbWUoKSkpIHtcbiAgICBjb25zb2xlLmxvZyhcIkludmFsaWQgZGF0ZSBmb3JtYXQgZGV0ZWN0ZWRcIik7XG4gICAgcmV0dXJuIFwiIC0gLSAtIFwiO1xuICB9XG5cbiAgY29uc3QgZGlmZkluTWlsbGlzID0gZW5kIC0gc3RhcnQ7IC8vIERpZmZlcmVuY2UgaW4gbWlsbGlzZWNvbmRzXG5cbiAgLy8gQ2FsY3VsYXRlIHRvdGFsIGhvdXJzIGFuZCBtaW51dGVzXG4gIGNvbnN0IHRvdGFsTWludXRlcyA9IE1hdGguZmxvb3IoZGlmZkluTWlsbGlzIC8gKDEwMDAgKiA2MCkpOyAvLyBUb3RhbCBtaW51dGVzXG4gIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcih0b3RhbE1pbnV0ZXMgLyA2MCk7IC8vIFRvdGFsIGhvdXJzXG4gIGNvbnN0IG1pbnV0ZXMgPSB0b3RhbE1pbnV0ZXMgJSA2MDsgLy8gUmVtYWluaW5nIG1pbnV0ZXNcblxuICAvLyBEZWJ1Z2dpbmc6IExvZyB0aGUgY2FsY3VsYXRlZCBob3VycyBhbmQgbWludXRlc1xuICBjb25zb2xlLmxvZyhcIkNhbGN1bGF0ZWQgaG91cnM6XCIsIGhvdXJzKTtcbiAgY29uc29sZS5sb2coXCJDYWxjdWxhdGVkIG1pbnV0ZXM6XCIsIG1pbnV0ZXMpO1xuXG4gIHJldHVybiBgJHtob3Vyc31oICR7bWludXRlc31tYDtcbn07XG5cbi8vIEZ1bmN0aW9uIHRvIGRldGVybWluZSBiYWRnZSBjb2xvciBiYXNlZCBvbiB0b3RhbCB3b3JrIGhvdXJzXG5jb25zdCBnZXRMdW5jaEJyZWFrQ29sb3IgPSAodGltZUluLCB0aW1lT3V0KSA9PiB7XG4gIGNvbnN0IHsgaG91cnMsIG1pbnV0ZXMgfSA9IGNhbGN1bGF0ZVRvdGFsV29ya2luZ0hvdXJzKHRpbWVJbiwgdGltZU91dCk7XG4gIGlmIChob3VycyA+IDEgfHwgbWludXRlcyA+IDApIHtcbiAgICByZXR1cm4gXCJncmVlbi03XCI7IC8vIE92ZXJ0aW1lXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFwiYmx1ZS1ncmV5LTlcIjsgLy8gU2hvcnQgd29yayBob3Vyc1xuICB9XG59O1xuXG5jb25zdCBnZXRMdW5jaEJyZWFrSWNvbiA9ICh0aW1lSW4sIHRpbWVPdXQpID0+IHtcbiAgY29uc3QgeyBob3VycywgbWludXRlcyB9ID0gY2FsY3VsYXRlVG90YWxXb3JraW5nSG91cnModGltZUluLCB0aW1lT3V0KTtcbiAgaWYgKGhvdXJzID4gMSB8fCBtaW51dGVzID4gMCkge1xuICAgIHJldHVybiBcImNoZWNrX2NpcmNsZVwiOyAvLyBPdmVydGltZVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBcImFjY2Vzc190aW1lXCI7IC8vIFNob3J0IHdvcmsgaG91cnNcbiAgfVxufTtcblxuY29uc3QgZ2V0QnJlYWtDb2xvciA9ICh0aW1lSW4sIHRpbWVPdXQpID0+IHtcbiAgY29uc3QgeyBob3VycywgbWludXRlcyB9ID0gY2FsY3VsYXRlVG90YWxXb3JraW5nSG91cnModGltZUluLCB0aW1lT3V0KTtcbiAgaWYgKGhvdXJzID4gMCB8fCBtaW51dGVzID4gMTUpIHtcbiAgICByZXR1cm4gXCJwaW5rLTEzXCI7IC8vIE92ZXJ0aW1lXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFwiZ3JlZW4tN1wiOyAvLyBTaG9ydCB3b3JrIGhvdXJzXG4gIH1cbn07XG5cbi8vIEZ1bmN0aW9uIHRvIGRldGVybWluZSB0aGUgaWNvbiB0byBkaXNwbGF5XG5jb25zdCBnZXRCcmVha0hvdXJzSWNvbiA9ICh0aW1lSW4sIHRpbWVPdXQpID0+IHtcbiAgY29uc3QgeyBob3VycywgbWludXRlcyB9ID0gY2FsY3VsYXRlVG90YWxXb3JraW5nSG91cnModGltZUluLCB0aW1lT3V0KTtcbiAgaWYgKGhvdXJzID4gMCB8fCBtaW51dGVzID4gMTUpIHtcbiAgICByZXR1cm4gXCJhY2Nlc3NfdGltZVwiOyAvLyBNb3JlIHRoYW4gMTUgbWludXRlc1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBcImNoZWNrX2NpcmNsZVwiOyAvLyBMZXNzIHRoYW4gMTUgbWludXRlc1xuICB9XG59O1xuXG5jb25zdCBnZXRXb3JrSG91cnNDb2xvciA9ICh0aW1lSW4sIHRpbWVPdXQpID0+IHtcbiAgY29uc3QgeyBob3VycyB9ID0gY2FsY3VsYXRlVG90YWxXb3JraW5nSG91cnModGltZUluLCB0aW1lT3V0KTtcbiAgaWYgKGhvdXJzID4gOSB8fCAoaG91cnMgPT09IDkgJiYgbWludXRlcyA+IDApKSB7XG4gICAgcmV0dXJuIFwiYmx1ZS1ncmV5LTlcIjsgLy8gT3ZlcnRpbWVcbiAgfSBlbHNlIGlmIChob3VycyA+PSA4KSB7XG4gICAgcmV0dXJuIFwiZ3JlZW4tN1wiOyAvLyBSZWd1bGFyIHdvcmsgaG91cnNcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gXCJwaW5rLTEzXCI7IC8vIFNob3J0IHdvcmsgaG91cnNcbiAgfVxufTtcblxuLy8gRnVuY3Rpb24gdG8gZGV0ZXJtaW5lIHRoZSBpY29uIHRvIGRpc3BsYXlcbmNvbnN0IGdldFdvcmtIb3Vyc0ljb24gPSAodGltZUluLCB0aW1lT3V0KSA9PiB7XG4gIGNvbnN0IGhvdXJzID0gY2FsY3VsYXRlVG90YWxXb3JraW5nSG91cnModGltZUluLCB0aW1lT3V0KTtcbiAgaWYgKGhvdXJzID49IDkgfHwgKGhvdXJzID09PSA5ICYmIG1pbnV0ZXMgPiAwKSkge1xuICAgIHJldHVybiBcImFsYXJtX29uXCI7IC8vIEljb24gZm9yIG92ZXJ0aW1lXG4gIH0gZWxzZSBpZiAoaG91cnMgPj0gOCkge1xuICAgIHJldHVybiBcImNoZWNrX2NpcmNsZVwiOyAvLyBJY29uIGZvciByZWd1bGFyIHdvcmsgaG91cnNcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gXCJhY2Nlc3NfdGltZVwiOyAvLyBJY29uIGZvciBzaG9ydCB3b3JrIGhvdXJzXG4gIH1cbn07XG5cbmNvbnN0IGR0ckNvbHVtbnMgPSBbXG4gIHtcbiAgICBuYW1lOiBcIm5hbWVcIixcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBsYWJlbDogXCJOYW1lXCIsXG4gICAgYWxpZ246IFwibGVmdFwiLFxuICAgIGZpZWxkOiAocm93KSA9PiBmb3JtYXRGdWxsbmFtZShyb3cuZW1wbG95ZWUpLFxuICB9LFxuICAvLyB7XG4gIC8vICAgbmFtZTogXCJicmFuY2hcIixcbiAgLy8gICByZXF1aXJlZDogdHJ1ZSxcbiAgLy8gICBsYWJlbDogXCJCcmFuY2ggRGVzaWduYXRpb25cIixcbiAgLy8gICBhbGlnbjogXCJsZWZ0XCIsXG4gIC8vICAgZmllbGQ6IChyb3cpID0+XG4gIC8vICAgICByb3cuZW1wbG95ZWUgJiYgcm93LmVtcGxveWVlLmJyYW5jaCA/IHJvdy5lbXBsb3llZS5icmFuY2gubmFtZSA6IFwiTi9BXCIsXG4gIC8vIH0sXG4gIC8vIHtcbiAgLy8gICBuYW1lOiBcInBvc2l0aW9uXCIsXG4gIC8vICAgcmVxdWlyZWQ6IHRydWUsXG4gIC8vICAgbGFiZWw6IFwiUG9zaXRpb25cIixcbiAgLy8gICBhbGlnbjogXCJjZW50ZXJcIixcbiAgLy8gICBmaWVsZDogKHJvdykgPT5cbiAgLy8gICAgIHJvdy5lbXBsb3llZSAmJiByb3cuZW1wbG95ZWUgPyByb3cuZW1wbG95ZWUucG9zaXRpb24gOiBcIk4vQVwiLFxuICAvLyB9LFxuICB7XG4gICAgbmFtZTogXCJkYXRlX2luXCIsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgbGFiZWw6IFwiRGF0ZSBJblwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiBcInRpbWVfaW5cIixcbiAgICBmb3JtYXQ6ICh2YWwpID0+IGZvcm1hdERhdGUodmFsKSwgLy8gRm9ybWF0IHRoZSBkYXRlXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImRhdGVfb3V0XCIsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgbGFiZWw6IFwiRGF0ZSBPdXRcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogXCJ0aW1lX291dFwiLFxuICAgIGZvcm1hdDogKHZhbCkgPT4gZm9ybWF0RGF0ZSh2YWwpLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJ0aW1lX2luXCIsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgbGFiZWw6IFwiVGltZSBJblwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiBcInRpbWVfaW5cIixcbiAgICAvLyBmb3JtYXQ6ICh2YWwpID0+IGZvcm1hdFRpbWUodmFsKSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwidGltZV9vdXRcIixcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBsYWJlbDogXCJUaW1lIE91dFwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiBcInRpbWVfb3V0XCIsXG4gICAgZm9ybWF0OiAodmFsKSA9PiBmb3JtYXRUaW1lKHZhbCksXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImx1bmNoX2JyZWFrX3N0YXJ0XCIsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgbGFiZWw6IFwiTHVuY2ggQnJlYWsgU3RhcnRcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogXCJsdW5jaF9icmVha19zdGFydFwiLFxuICAgIGZvcm1hdDogKHZhbCkgPT4gZm9ybWF0VGltZSh2YWwpLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJsdW5jaF9icmVha19lbmRcIixcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBsYWJlbDogXCJMdW5jaCBCcmVhayBFbmRcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogXCJsdW5jaF9icmVha19lbmRcIixcbiAgICBmb3JtYXQ6ICh2YWwpID0+IGZvcm1hdFRpbWUodmFsKSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYnJlYWtfc3RhcnRcIixcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBsYWJlbDogXCJCcmVhayBTdGFydFwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiBcImJyZWFrX3N0YXJ0XCIsXG4gICAgZm9ybWF0OiAodmFsKSA9PiBmb3JtYXRUaW1lKHZhbCksXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImJyZWFrX2VuZFwiLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGxhYmVsOiBcIkJyZWFrIEVuZFwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiBcImJyZWFrX2VuZFwiLFxuICAgIGZvcm1hdDogKHZhbCkgPT4gZm9ybWF0VGltZSh2YWwpLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJicmVha1wiLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGxhYmVsOiBcIlRvdGFsIEJyZWFrXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IChyb3cpID0+IHtcbiAgICAgIGNvbnN0IHsgaG91cnMsIG1pbnV0ZXMgfSA9IGNhbGN1bGF0ZVRvdGFsV29ya2luZ0hvdXJzKFxuICAgICAgICByb3cuYnJlYWtfc3RhcnQsXG4gICAgICAgIHJvdy5icmVha19lbmRcbiAgICAgICk7XG4gICAgICByZXR1cm4gYCR7aG91cnN9aCAke21pbnV0ZXN9bWA7IC8vIEZvcm1hdCB0aGUgb3V0cHV0XG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwibHVuY2hfYnJlYWtcIixcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBsYWJlbDogXCJUb3RhbCBMdW5jaCBicmVha1wiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiAocm93KSA9PiB7XG4gICAgICBjb25zdCB7IGhvdXJzLCBtaW51dGVzIH0gPSBjYWxjdWxhdGVUb3RhbFdvcmtpbmdIb3VycyhcbiAgICAgICAgcm93Lmx1bmNoX2JyZWFrX3N0YXJ0LFxuICAgICAgICByb3cubHVuY2hfYnJlYWtfZW5kXG4gICAgICApO1xuICAgICAgcmV0dXJuIGAke2hvdXJzfWggJHttaW51dGVzfW1gOyAvLyBGb3JtYXQgdGhlIG91dHB1dFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInRvdGFsX3dvcmtpbmdfaG91cnNcIixcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBsYWJlbDogXCJXb3JrIEhvdXJzXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IChyb3cpID0+IHtcbiAgICAgIGNvbnN0IHsgaG91cnMsIG1pbnV0ZXMgfSA9IGNhbGN1bGF0ZVRvdGFsV29ya2luZ0hvdXJzKFxuICAgICAgICByb3cudGltZV9pbixcbiAgICAgICAgcm93LnRpbWVfb3V0XG4gICAgICApO1xuICAgICAgcmV0dXJuIGAke2hvdXJzfWggJHttaW51dGVzfW1gOyAvLyBGb3JtYXQgdGhlIG91dHB1dCBhcyBhIHN0cmluZ1xuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIm92ZXJ0aW1lX3N0YXJ0XCIsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgbGFiZWw6IFwiT3ZlcnRpbWUgU3RhcnRcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogXCJvdmVydGltZV9zdGFydFwiLFxuICAgIGZvcm1hdDogKHZhbCkgPT4gZm9ybWF0VGltZSh2YWwpLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJvdmVydGltZV9lbmRcIixcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBsYWJlbDogXCJPdmVydGltZSBFbmRcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogXCJvdmVydGltZV9lbmRcIixcbiAgICBmb3JtYXQ6ICh2YWwpID0+IGZvcm1hdFRpbWUodmFsKSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwidG90YWxfb3ZlcnRpbWVcIixcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBsYWJlbDogXCJPVCBUb3RhbCBIb3Vyc1wiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiAocm93KSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSBjYWxjdWxhdGVUb3RhbE92ZXJ0aW1lSG91cnMoXG4gICAgICAgIHJvdy5vdmVydGltZV9zdGFydCxcbiAgICAgICAgcm93Lm92ZXJ0aW1lX2VuZFxuICAgICAgKTtcblxuICAgICAgLy8gQ2hlY2sgaWYgdGhlIHJlc3VsdCBpcyBhIHN0cmluZyAoaW5kaWNhdGluZyBhbiBlcnJvciBtZXNzYWdlKVxuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDsgLy8gUmV0dXJuIFwiIC0gLSAtIFwiIG9yIHRoZSBlcnJvciBtZXNzYWdlXG4gICAgICB9XG5cbiAgICAgIC8vIERlc3RydWN0dXJlIGhvdXJzIGFuZCBtaW51dGVzIGlmIHRoZSByZXN1bHQgaXMgYW4gb2JqZWN0XG4gICAgICBjb25zdCB7IGhvdXJzLCBtaW51dGVzIH0gPSByZXN1bHQ7XG4gICAgICByZXR1cm4gYCR7aG91cnN9aCAke21pbnV0ZXN9bWA7IC8vIEZvcm1hdCB0aGUgb3V0cHV0IGFzIGEgc3RyaW5nXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYWN0aW9uXCIsXG4gICAgbGFiZWw6IFwiQWN0aW9uXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gIH0sXG5dO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5lbGVnYW50LWNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQ6ICNmN2Y4ZmM7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbn1cblxuLmFic29sdXRlLWZ1bGwge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbn1cbi5zcGlubmVyLXdyYXBwZXIge1xuICBtaW4taGVpZ2h0OiA0MHZoOyAvKiBNaW5pbXVtIGhlaWdodCBvZiA1MCUgdmlld3BvcnQgaGVpZ2h0ICovXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLmRhdGEtZXJyb3Ige1xuICBtaW4taGVpZ2h0OiA0MHZoOyAvKiBNaW5pbXVtIGhlaWdodCBvZiA1MCUgdmlld3BvcnQgaGVpZ2h0ICovXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLnRhYmxlLWNvbnRhaW5lciB7XG4gIG1heC1oZWlnaHQ6IDQwMHB4OyAvKiBBZGp1c3QgYXMgbmVlZGVkICovXG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5xLXRhYmxlLWNvbnRhaW5lciB7XG4gIG92ZXJmbG93OiBoaWRkZW4gIWltcG9ydGFudDsgLyogVGFyZ2V0IHRoZSBjb250YWluZXIgZ2VuZXJhdGVkIGJ5IHEtdGFibGUgKi9cbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJxLW1iLW1kXCIgYWxpZ249XCJyaWdodFwiPlxuICAgIDxxLWlucHV0XG4gICAgICB2LW1vZGVsPVwic2VhcmNoS2V5d29yZFwiXG4gICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwic2VhcmNoXCJcbiAgICAgIGRlYm91bmNlPVwiNTAwXCJcbiAgICAgIG91dGxpbmVkXG4gICAgICBkZW5zZVxuICAgICAgZmxhdFxuICAgICAgbGFiZWw9XCJTZWFyY2hcIlxuICAgICAgc3R5bGU9XCJ3aWR0aDogMzAwcHhcIlxuICAgID5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxxLWljb24gbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDxkaXYgdi1pZj1cInNlYXJjaEtleXdvcmRcIiBjbGFzcz1cImN1c3RvbS1saXN0IHotdG9wXCI+XG4gICAgICAgIDxxLWNhcmQ+XG4gICAgICAgICAgPHEtbGlzdCBzZXBhcmF0b3I+XG4gICAgICAgICAgICA8cS1pdGVtIHYtaWY9XCIhZW1wbG95ZWVzPy5sZW5ndGhcIj4gTm8gcmVjb3JkIGZvdW5kLiA8L3EtaXRlbT5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgICAgICAgIDxxLWl0ZW1cbiAgICAgICAgICAgICAgICB2LWZvcj1cImVtcGxveWVlIGluIGVtcGxveWVlc1wiXG4gICAgICAgICAgICAgICAgOmtleT1cImVtcGxveWVlLmlkXCJcbiAgICAgICAgICAgICAgICBjbGlja2FibGVcbiAgICAgICAgICAgICAgICBAY2xpY2s9XCJzZWxlY3RFbXBsb3llZShlbXBsb3llZSlcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAge3sgZm9ybWF0RnVsbG5hbWUoZW1wbG95ZWUpIH19XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICA8L3EtY2FyZD5cbiAgICAgIDwvZGl2PlxuICAgIDwvcS1pbnB1dD5cbiAgPC9kaXY+XG4gIDxkaXY+XG4gICAgPHEtY2FyZCBib3JkZXJlZCBkZW5zZSBmbGF0IGNsYXNzPVwicS1wYS1tZFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTMgcS1tYS1sZ1wiIGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtcGEtbGdcIj5cbiAgICAgICAgICAgIDxxLWF2YXRhciBzaXplPVwiMTUwcHhcIiBjb2xvcj1cImdyZXktMlwiPlxuICAgICAgICAgICAgICA8aW1nIDpzcmM9XCJpbWFnZVVybFwiIDphbHQ9XCJhbHRUZXh0XCIgQGVycm9yPVwiaGFuZGxlSW1hZ2VFcnJvclwiIC8+XG4gICAgICAgICAgICA8L3EtYXZhdGFyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1tdC1sZ1wiIGFsaWduPVwibGVmdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XG4gICAgICAgICAgICAgIDxkaXY+TmFtZTo8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5Qb3NpdGlvbjo8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5BZ2U6PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtOVwiPlxuICAgICAgICAgICAgICA8ZGl2Pnt7IGVtcGxveWVlTmFtZSB9fTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2Pnt7IGVtcGxveWVlUG9zaXRpb24gfX08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj57eyBlbXBsb3llZUFnZSB9fTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8cS1zZXBhcmF0b3IgdmVydGljYWwgLz5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC04IHEtbWwtbGdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPGRpdj5Gcm9tOiB7eyBmb3JtYXREYXRlVG9DdXN0b21TdHJpbmcoc3RhcnREYXRlKSB9fTwvZGl2PlxuICAgICAgICAgICAgPGRpdj5Ubzoge3sgZm9ybWF0RGF0ZVRvQ3VzdG9tU3RyaW5nKGVuZERhdGUpIH19PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW4gcS1tdC1tZFwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgcGFkZGluZz1cInNtIG1kXCJcbiAgICAgICAgICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICAgICAgbGFiZWw9XCJwcmV2XCJcbiAgICAgICAgICAgICAgICAgIGljb249XCJhcnJvd19iYWNrX2lvc19uZXdcIlxuICAgICAgICAgICAgICAgICAgQGNsaWNrPVwib25QcmV2XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxxLXNlcGFyYXRvciB2ZXJ0aWNhbCAvPlxuICAgICAgICAgICAgICAgIDxxLWJ0biBwYWRkaW5nPVwic20gbWRcIiBzaXplPVwic21cIiBkZW5zZSBmbGF0IEBjbGljaz1cIm9uQ3VycmVudFwiXG4gICAgICAgICAgICAgICAgICA+Q1VSUkVOVDwvcS1idG5cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHEtc2VwYXJhdG9yIHZlcnRpY2FsIC8+XG4gICAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nPVwic20gbWRcIlxuICAgICAgICAgICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgICBsYWJlbD1cIm5leHRcIlxuICAgICAgICAgICAgICAgICAgaWNvbj1cImFycm93X2ZvcndhcmRfaW9zXCJcbiAgICAgICAgICAgICAgICAgIEBjbGljaz1cIm9uTmV4dFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgIHBhZGRpbmc9XCJzbSBtZFwiXG4gICAgICAgICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICAgICAgICBpY29uPVwicHJpbnRcIlxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJQUklOVFwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJncmFkaWVudC1idG4gdGV4dC13aGl0ZVwiXG4gICAgICAgICAgICAgICAgQGNsaWNrPVwib3BlbkRpYWxvZ1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1teS1tZFwiPlxuICAgICAgICAgICAgPHEtdGFibGVcbiAgICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgICBib3JkZXJlZFxuICAgICAgICAgICAgICBzZXBhcmF0b3I9XCJjZWxsXCJcbiAgICAgICAgICAgICAgOnJvd3M9XCJkdHJSb3dcIlxuICAgICAgICAgICAgICA6Y29sdW1ucz1cImNvbHVtbnNcIlxuICAgICAgICAgICAgICByb3cta2V5PVwiZW50cnlcIlxuICAgICAgICAgICAgICBjbGFzcz1cImZ1bGwtaGVpZ2h0LXRhYmxlXCJcbiAgICAgICAgICAgICAgdi1tb2RlbDpwYWdpbmF0aW9uPVwicGFnaW5hdGlvblwiXG4gICAgICAgICAgICAgIGhpZGUtYm90dG9tXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8L3EtdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWNhcmQ+XG4gIDwvZGl2PlxuXG4gIDxxLWRpYWxvZ1xuICAgIHYtbW9kZWw9XCJkaWFsb2dcIlxuICAgIGZ1bGwtaGVpZ2h0XG4gICAgcG9zaXRpb249XCJyaWdodFwiXG4gICAgYmFja2Ryb3AtZmlsdGVyPVwiYmx1cig0cHgpIHNhdHVyYXRlKDE1MCUpXCJcbiAgPlxuICAgIDxxLWNhcmQgc3R5bGU9XCJ3aWR0aDogODIwcHg7IG1heC13aWR0aDogODB2d1wiPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwiZ3JhZGllbnQtYnRuXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuIHRleHQtaDYgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgIDxkaXY+8J+Xk++4jyBEYWlseSBUaW1lIFJlY29yZDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cS1idG4gcm91bmRlZCBmbGF0IGRlbnNlIGljb249XCJhcnJvd19mb3J3YXJkX2lvc1wiIHYtY2xvc2UtcG9wdXA+XG4gICAgICAgICAgICA8L3EtYnRuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8ZGl2PlxuICAgICAgICA8aWZyYW1lIDpzcmM9XCJwZGZVcmxcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCI3MDBweFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBjb21wdXRlZCwgcmVmLCBvbk1vdW50ZWQgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgRW1wbG95ZWVBdHRlbmRhbmNlRGlhbG9nIGZyb20gXCIuL0VtcGxveWVlQXR0ZW5kYW5jZURpYWxvZy52dWVcIjtcbmltcG9ydCB7IHVzZUVtcGxveWVlU3RvcmUgfSBmcm9tIFwic3RvcmVzL2VtcGxveWVlXCI7XG5pbXBvcnQgeyB1c2VEVFJTdG9yZSB9IGZyb20gXCJzdG9yZXMvZHRyXCI7XG5pbXBvcnQgeyBkYXRlIH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0ICogYXMgcGRmTWFrZSBmcm9tIFwicGRmbWFrZS9idWlsZC9wZGZtYWtlXCI7XG5pbXBvcnQgKiBhcyBwZGZGb250cyBmcm9tIFwicGRmbWFrZS9idWlsZC92ZnNfZm9udGVzXCI7XG5wZGZNYWtlLnZmcyA9IHBkZkZvbnRzLmRlZmF1bHQ7XG5cbmNvbnN0IGVtcGxveWVlU3RvcmUgPSB1c2VFbXBsb3llZVN0b3JlKCk7XG5jb25zdCBlbXBsb3llZXMgPSBjb21wdXRlZCgoKSA9PiBlbXBsb3llZVN0b3JlLmVtcGxveWVlcyk7XG5jb25zdCBkdHJTdG9yZSA9IHVzZURUUlN0b3JlKCk7XG5cbi8vIGNvbnNvbGUubG9nKFwiVGFibGUgZHRyIGRhdGFcIiwgZHRyLnZhbHVlKTtcbmNvbnN0IGltYWdlVXJsID0gcmVmKFwiaHR0cHM6Ly9jZG4ucXVhc2FyLmRldi9pbWcvYm95LWF2YXRhci5wbmdcIik7IC8vIERlZmF1bHQgaW1hZ2UgVVJMXG5jb25zdCBzZWFyY2hLZXl3b3JkID0gcmVmKFwiXCIpO1xuY29uc3QgZW1wbG95ZWVJZCA9IHJlZihudWxsKTtcbmNvbnN0IHNlbGVjdGVkRW1wbG95ZWVJZCA9IHJlZihudWxsKTtcbmNvbnN0IHN0YXJ0RGF0ZSA9IHJlZihcIlwiKTtcbmNvbnN0IGVuZERhdGUgPSByZWYoXCJcIik7XG5jb25zdCBlbXBsb3llZU5hbWUgPSByZWYoXCJcIik7XG5jb25zdCBlbXBsb3llZVBvc2l0aW9uID0gcmVmKFwiXCIpO1xuY29uc3QgZW1wbG95ZWVBZ2UgPSByZWYoXCJcIik7XG5jb25zdCBTVEFOREFSRF9XT1JLX0hPVVJTID0gODtcbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5jb25zdCBwZGZVcmwgPSByZWYoXCJcIik7XG5cbi8vIGNvbnN0IGdlbmVyYXRlRG9jRGVmaW5pdGlvbiA9ICgpXG5cbmNvbnN0IGlzQ2FyZFZpc2libGUgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBoYW5kbGVJbWFnZUVycm9yID0gKCkgPT4ge1xuICAvLyBIYW5kbGUgaW1hZ2UgbG9hZGluZyBlcnJvciBieSB1cGRhdGluZyB0aGUgaW1hZ2UgVVJMXG4gIGltYWdlVXJsLnZhbHVlID0gXCJodHRwczovL2Nkbi5xdWFzYXIuZGV2L2ltZy9ib3ktYXZhdGFyLnBuZ1wiOyAvLyBEZWZhdWx0IGltYWdlIFVSTFxufTtcblxuY29uc3QgcGFnaW5hdGlvbiA9IHJlZih7XG4gIHJvd3NQZXJQYWdlOiAwLFxufSk7XG5cbmNvbnN0IHNlYXJjaCA9IGFzeW5jICgpID0+IHtcbiAgaWYgKHNlYXJjaEtleXdvcmQudmFsdWUudHJpbSgpKSB7XG4gICAgYXdhaXQgZW1wbG95ZWVTdG9yZS5zZWFyY2hFbXBsb3llZShzZWFyY2hLZXl3b3JkLnZhbHVlKTtcbiAgfVxufTtcblxuY29uc3Qgc2VsZWN0RW1wbG95ZWUgPSBhc3luYyAoZW1wbG95ZWUpID0+IHtcbiAgc2VhcmNoS2V5d29yZC52YWx1ZSA9IFwiXCI7XG4gIGVtcGxveWVlTmFtZS52YWx1ZSA9IGZvcm1hdEZ1bGxuYW1lKGVtcGxveWVlKTtcbiAgZW1wbG95ZWVQb3NpdGlvbi52YWx1ZSA9IGVtcGxveWVlLnBvc2l0aW9uIHx8IFwiVW5rbm93blwiOyAvLyBBc3N1bWluZyBwb3NpdGlvbiBmaWVsZCBleGlzdHMgaW4gZW1wbG95ZWUgZGF0YVxuICBlbXBsb3llZUFnZS52YWx1ZSA9IGNhbGN1bGF0ZUFnZShlbXBsb3llZS5iaXJ0aGRhdGUpO1xuXG4gIHNlbGVjdGVkRW1wbG95ZWVJZC52YWx1ZSA9IGVtcGxveWVlLmlkOyAvLyBBc3N1bWluZyBlbXBsb3llZS5pZCBpcyB5b3VyIGVtcGxveWVlIElEXG5cbiAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IGRhdGUuZm9ybWF0RGF0ZShuZXcgRGF0ZSgpLCBcIllZWVktTU0tRERcIik7IC8vIEdldCB0aGUgY3VycmVudCBkYXRlIGZvcm1hdHRlZCBhcyAnWVlZWS1NTS1ERCdcblxuICBpZiAoZm9ybWF0dGVkRGF0ZSkge1xuICAgIGNvbnN0IHsgc3RhcnREYXRlOiBuZXdTdGFydERhdGUsIGVuZERhdGU6IG5ld0VuZERhdGUgfSA9XG4gICAgICBnZXREVFJQZXJpb2QoZm9ybWF0dGVkRGF0ZSk7IC8vIEdldCB0aGUgRFRSIHBlcmlvZFxuICAgIHN0YXJ0RGF0ZS52YWx1ZSA9IG5ld1N0YXJ0RGF0ZTsgLy8gVXBkYXRlIHN0YXJ0RGF0ZSB3aXRoIHRoZSBuZXcgdmFsdWVcbiAgICBlbmREYXRlLnZhbHVlID0gbmV3RW5kRGF0ZTsgLy8gVXBkYXRlIGVuZERhdGUgd2l0aCB0aGUgbmV3IHZhbHVlXG5cbiAgICBjb25zdCByZXF1ZXN0RGF0YSA9IHtcbiAgICAgIGVtcGxveWVlX2lkOiBzZWxlY3RlZEVtcGxveWVlSWQudmFsdWUsXG4gICAgICBzdGFydF9kYXRlOiBzdGFydERhdGUudmFsdWUsXG4gICAgICBlbmRfZGF0ZTogZW5kRGF0ZS52YWx1ZSxcbiAgICB9O1xuXG4gICAgYXdhaXQgZHRyU3RvcmUuZmV0Y2hEVFJSYW5nZShyZXF1ZXN0RGF0YSk7XG4gICAgY29uc29sZS5sb2coXCJSZXF1ZXN0IERhdGE6XCIsIHJlcXVlc3REYXRhKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGZvcm1hdCB0aGUgY3VycmVudCBkYXRlXCIpO1xuICB9XG59O1xuXG5jb25zdCBjYWxjdWxhdGVBZ2UgPSAoYmlydGhkYXRlKSA9PiB7XG4gIGlmICghYmlydGhkYXRlKSByZXR1cm4gXCJOL0FcIjtcbiAgY29uc3QgYmlydGhEYXRlT2JqID0gbmV3IERhdGUoYmlydGhkYXRlKTtcbiAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICBsZXQgYWdlID0gdG9kYXkuZ2V0RnVsbFllYXIoKSAtIGJpcnRoRGF0ZU9iai5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBtb250aERpZmYgPSB0b2RheS5nZXRNb250aCgpIC0gYmlydGhEYXRlT2JqLmdldE1vbnRoKCk7XG5cbiAgaWYgKFxuICAgIG1vbnRoRGlmZiA8IDAgfHxcbiAgICAobW9udGhEaWZmID09PSAwICYmIHRvZGF5LmdldERhdGUoKSA8IGJpcnRoRGF0ZU9iai5nZXREYXRlKCkpXG4gICkge1xuICAgIGFnZS0tO1xuICB9XG4gIHJldHVybiBhZ2U7XG59O1xuXG5jb25zdCBmb3JtYXREYXRlID0gKGRhdGUpID0+IHtcbiAgaWYgKCEoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHx8IGlzTmFOKGRhdGUuZ2V0VGltZSgpKSkge1xuICAgIHJldHVybiBcIkludmFsaWQgZGF0ZVwiOyAvLyBDaGVjayBpZiB0aGUgZGF0ZSBpcyB2YWxpZFxuICB9XG4gIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gIGNvbnN0IG1vbnRoID0gU3RyaW5nKGRhdGUuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTsgLy8gTW9udGhzIGFyZSAwLWJhc2VkXG4gIGNvbnN0IGRheSA9IFN0cmluZyhkYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICByZXR1cm4gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YDtcbn07XG5cbmNvbnN0IGZvcm1hdEZ1bGxuYW1lID0gKHJvdykgPT4ge1xuICBjb25zdCBjYXBpdGFsaXplID0gKHN0cikgPT5cbiAgICBzdHIgPyBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSA6IFwiXCI7XG5cbiAgY29uc3QgZmlyc3RuYW1lID0gcm93LmZpcnN0bmFtZSA/IGNhcGl0YWxpemUocm93LmZpcnN0bmFtZSkgOiBcIk5vIEZpcnN0bmFtZVwiO1xuICBjb25zdCBtaWRkbGVuYW1lID0gcm93Lm1pZGRsZW5hbWVcbiAgICA/IGNhcGl0YWxpemUocm93Lm1pZGRsZW5hbWUpLmNoYXJBdCgwKSArIFwiLlwiXG4gICAgOiBcIlwiO1xuICBjb25zdCBsYXN0bmFtZSA9IHJvdy5sYXN0bmFtZSA/IGNhcGl0YWxpemUocm93Lmxhc3RuYW1lKSA6IFwiTm8gTGFzdG5hbWVcIjtcblxuICByZXR1cm4gYCR7Zmlyc3RuYW1lfSAke21pZGRsZW5hbWV9ICR7bGFzdG5hbWV9YDtcbn07XG5cbi8vIEZ1bmN0aW9uIHRvIGluaXRpYWxpemUgdGhlIGN1cnJlbnQgMTUtZGF5IHJhbmdlXG5jb25zdCBpbml0aWFsaXplRGF0ZVJhbmdlID0gKCkgPT4ge1xuICBjb25zdCBmb3JtYXR0ZWREYXRlID0gZGF0ZS5mb3JtYXREYXRlKG5ldyBEYXRlKCksIFwiWVlZWS1NTS1ERFwiKTtcbiAgY29uc3QgeyBzdGFydERhdGU6IG5ld1N0YXJ0RGF0ZSwgZW5kRGF0ZTogbmV3RW5kRGF0ZSB9ID1cbiAgICBnZXREVFJQZXJpb2QoZm9ybWF0dGVkRGF0ZSk7XG4gIHN0YXJ0RGF0ZS52YWx1ZSA9IG5ld1N0YXJ0RGF0ZTtcbiAgZW5kRGF0ZS52YWx1ZSA9IG5ld0VuZERhdGU7XG59O1xuXG5jb25zdCBnZXREVFJQZXJpb2QgPSAoZm9ybWF0dGVkRGF0ZSkgPT4ge1xuICBpZiAoIWZvcm1hdHRlZERhdGUpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiSW52YWxpZCBmb3JtYXR0ZWQgZGF0ZTpcIiwgZm9ybWF0dGVkRGF0ZSk7XG4gICAgcmV0dXJuIHsgc3RhcnREYXRlOiBudWxsLCBlbmREYXRlOiBudWxsIH07XG4gIH1cblxuICBjb25zdCBkYXkgPSBwYXJzZUludChmb3JtYXR0ZWREYXRlLnNsaWNlKDgsIDEwKSwgMTApOyAvLyBFeHRyYWN0IHRoZSBkYXkgcGFydFxuICBsZXQgc3RhcnREYXRlLCBlbmREYXRlO1xuXG4gIGlmIChkYXkgPj0gMTEgJiYgZGF5IDw9IDI1KSB7XG4gICAgLy8gUGVyaW9kOiAxMXRoIC0gMjV0aCBvZiB0aGUgY3VycmVudCBtb250aFxuICAgIHN0YXJ0RGF0ZSA9IGAke2Zvcm1hdHRlZERhdGUuc2xpY2UoMCwgNyl9LTExYDtcbiAgICBlbmREYXRlID0gYCR7Zm9ybWF0dGVkRGF0ZS5zbGljZSgwLCA3KX0tMjVgO1xuICB9IGVsc2Uge1xuICAgIC8vIFBlcmlvZDogMjZ0aCBvZiB0aGUgY3VycmVudCBtb250aCAtIDEwdGggb2YgdGhlIG5leHQgbW9udGhcbiAgICBjb25zdCBtb250aCA9XG4gICAgICBkYXkgPj0gMjZcbiAgICAgICAgPyBmb3JtYXR0ZWREYXRlLnNsaWNlKDUsIDcpXG4gICAgICAgIDogKHBhcnNlSW50KGZvcm1hdHRlZERhdGUuc2xpY2UoNSwgNyksIDEwKSAtIDEpXG4gICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgICAgLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgICBjb25zdCBuZXh0TW9udGggPVxuICAgICAgZGF5ID49IDI2XG4gICAgICAgID8gKHBhcnNlSW50KGZvcm1hdHRlZERhdGUuc2xpY2UoNSwgNyksIDEwKSArIDEpXG4gICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgICAgLnBhZFN0YXJ0KDIsIFwiMFwiKVxuICAgICAgICA6IGZvcm1hdHRlZERhdGUuc2xpY2UoNSwgNyk7XG5cbiAgICBzdGFydERhdGUgPSBgJHtmb3JtYXR0ZWREYXRlLnNsaWNlKDAsIDQpfS0ke21vbnRofS0yNmA7XG4gICAgZW5kRGF0ZSA9IGAke2Zvcm1hdHRlZERhdGUuc2xpY2UoMCwgNCl9LSR7bmV4dE1vbnRofS0xMGA7XG4gIH1cblxuICBjb25zb2xlLmxvZyhcIkNhbGN1bGF0ZWQgU3RhcnQgRGF0ZTpcIiwgc3RhcnREYXRlKTtcbiAgY29uc29sZS5sb2coXCJDYWxjdWxhdGVkIEVuZCBEYXRlOlwiLCBlbmREYXRlKTtcblxuICByZXR1cm4geyBzdGFydERhdGUsIGVuZERhdGUgfTtcbn07XG5cbmNvbnN0IGZvcm1hdERhdGVUb0N1c3RvbVN0cmluZyA9IChkYXRlU3RyaW5nKSA9PiB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRlU3RyaW5nKTsgLy8gQ29udmVydCB0aGUgZGF0ZSBzdHJpbmcgdG8gYSBEYXRlIG9iamVjdFxuICBpZiAoaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSByZXR1cm4gXCIgLSAtIC0gXCI7IC8vIENoZWNrIGlmIHRoZSBkYXRlIGlzIHZhbGlkXG5cbiAgLy8gR2V0IHRoZSBtb250aCBhcyBhIHNob3J0IG5hbWVcbiAgY29uc3Qgb3B0aW9ucyA9IHsgbW9udGg6IFwic2hvcnRcIiwgZGF5OiBcIjItZGlnaXRcIiwgeWVhcjogXCJudW1lcmljXCIgfTtcbiAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IGRhdGVcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZW4tVVNcIiwgb3B0aW9ucylcbiAgICAucmVwbGFjZShcIixcIiwgXCJcIik7XG5cbiAgLy8gUmVwbGFjZSB0aGUgbW9udGggd2l0aCB0aGUgZGVzaXJlZCBmb3JtYXRcbiAgY29uc3QgW21vbnRoLCBkYXksIHllYXJdID0gZm9ybWF0dGVkRGF0ZS5zcGxpdChcIiBcIik7XG4gIHJldHVybiBgJHttb250aH0uICR7ZGF5fSwgJHt5ZWFyfWA7IC8vIFJlZm9ybWF0IHRvIHRoZSBkZXNpcmVkIG91dHB1dFxufTtcblxuY29uc3QgZm9ybWF0dGVkU3RhcnQgPSBmb3JtYXREYXRlVG9DdXN0b21TdHJpbmcoc3RhcnREYXRlLnZhbHVlKTtcbmNvbnNvbGUubG9nKFwiZm9ybWF0dGVkU3RhcnRcIiwgZm9ybWF0dGVkU3RhcnQpO1xuXG4vLyBGb3JtYXQgdGhlIGRhdGVzIGZvciBkaXNwbGF5XG5jb25zdCBmb3JtYXR0ZWRTdGFydERhdGUgPSBmb3JtYXREYXRlVG9DdXN0b21TdHJpbmcobmV3IERhdGUoc3RhcnREYXRlKSk7XG5jb25zdCBmb3JtYXR0ZWRFbmREYXRlID0gZm9ybWF0RGF0ZVRvQ3VzdG9tU3RyaW5nKG5ldyBEYXRlKGVuZERhdGUpKTtcblxuY29uc3QgZHRyUm93ID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCBkYXRhID0gZHRyU3RvcmUuZHRyQ3V0T2ZmRGF0YTtcblxuICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gZm9ybWF0IHRpbWUgZGlmZmVyZW5jZXMgYXMgXCIwOWg6MzNtXCIgb3IgXCItLS0tLVwiXG4gIGNvbnN0IGZvcm1hdFRpbWVEaWZmZXJlbmNlID0gKHN0YXJ0VGltZSwgZW5kVGltZSkgPT4ge1xuICAgIGlmICghc3RhcnRUaW1lIHx8ICFlbmRUaW1lKSByZXR1cm4gXCIgLSAtIC0gXCI7XG5cbiAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKHN0YXJ0VGltZSk7XG4gICAgY29uc3QgZW5kID0gbmV3IERhdGUoZW5kVGltZSk7XG5cbiAgICAvLyBDaGVjayBpZiB0aGUgdGltZXMgYXJlIHZhbGlkXG4gICAgaWYgKGlzTmFOKHN0YXJ0LmdldFRpbWUoKSkgfHwgaXNOYU4oZW5kLmdldFRpbWUoKSkpIHJldHVybiBcIiAtIC0gLSBcIjtcblxuICAgIGNvbnN0IGRpZmZJbk1pbGxpcyA9IGVuZCAtIHN0YXJ0O1xuICAgIGlmIChkaWZmSW5NaWxsaXMgPD0gMCkgcmV0dXJuIFwiIC0gLSAtIFwiO1xuXG4gICAgY29uc3QgdG90YWxNaW51dGVzID0gTWF0aC5mbG9vcihkaWZmSW5NaWxsaXMgLyAoMTAwMCAqIDYwKSk7XG4gICAgY29uc3QgaG91cnMgPSBTdHJpbmcoTWF0aC5mbG9vcih0b3RhbE1pbnV0ZXMgLyA2MCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgICBjb25zdCBtaW51dGVzID0gU3RyaW5nKHRvdGFsTWludXRlcyAlIDYwKS5wYWRTdGFydCgyLCBcIjBcIik7XG5cbiAgICByZXR1cm4gYCR7aG91cnN9IGggOiAke21pbnV0ZXN9IG1gO1xuICB9O1xuXG4gIHJldHVybiBkYXRhLm1hcCgoZW50cnksIGluZGV4KSA9PiB7XG4gICAgY29uc3QgdGltZUluID0gZW50cnkudGltZV9pbjsgLy8gQXNzdW1pbmcgYHRpbWVfaW5gIGlzIGEgc3RyaW5nXG4gICAgY29uc3QgdGltZU91dCA9IGVudHJ5LnRpbWVfb3V0OyAvLyBBc3N1bWluZyBgdGltZV9vdXRgIGlzIGEgc3RyaW5nXG4gICAgY29uc3Qgb3ZlcnRpbWVTdGFydCA9IGVudHJ5Lm92ZXJ0aW1lX3N0YXJ0OyAvLyBBc3N1bWluZyBgb3ZlcnRpbWVfc3RhcnRgIGlzIGEgc3RyaW5nXG4gICAgY29uc3Qgb3ZlcnRpbWVFbmQgPSBlbnRyeS5vdmVydGltZV9lbmQ7IC8vIEFzc3VtaW5nIGBvdmVydGltZV9lbmRgIGlzIGEgc3RyaW5nXG5cbiAgICAvLyBDYWxjdWxhdGUgdG90YWwgd29ya2luZyBob3Vyc1xuICAgIGNvbnN0IHRvdGFsV29ya2luZ0hvdXJzID0gZm9ybWF0VGltZURpZmZlcmVuY2UodGltZUluLCB0aW1lT3V0KTtcblxuICAgIC8vIENhbGN1bGF0ZSB0b3RhbCBvdmVydGltZSBob3Vyc1xuICAgIGNvbnN0IHRvdGFsT3ZlcnRpbWUgPSBmb3JtYXRUaW1lRGlmZmVyZW5jZShvdmVydGltZVN0YXJ0LCBvdmVydGltZUVuZCk7XG5cbiAgICAvLyBDYWxjdWxhdGUgdW5kZXJ0aW1lIGlmIHRvdGFsIHdvcmtpbmcgaG91cnMgYXJlIGxlc3MgdGhhbiBzdGFuZGFyZCB3b3JrIGhvdXJzXG4gICAgbGV0IHVuZGVydGltZSA9IFwiIC0gLSAtIFwiO1xuICAgIGNvbnN0IFNUQU5EQVJEX1dPUktfSE9VUlMgPSA4OyAvLyBBc3N1bWluZyBhIHN0YW5kYXJkIG9mIDggaG91cnNcbiAgICBpZiAodG90YWxXb3JraW5nSG91cnMgIT09IFwiIC0gLSAtIFwiKSB7XG4gICAgICBjb25zdCBbaG91cnNTdHIsIG1pbnV0ZXNTdHJdID0gdG90YWxXb3JraW5nSG91cnMuc3BsaXQoXCIgaCA6IFwiKTtcbiAgICAgIGNvbnN0IHRvdGFsSG91cnMgPSBwYXJzZUludChob3Vyc1N0ciwgMTApICsgcGFyc2VJbnQobWludXRlc1N0ciwgMTApIC8gNjA7XG4gICAgICBpZiAodG90YWxIb3VycyA8IFNUQU5EQVJEX1dPUktfSE9VUlMpIHtcbiAgICAgICAgY29uc3QgZGlmZkluTWludXRlcyA9IChTVEFOREFSRF9XT1JLX0hPVVJTIC0gdG90YWxIb3VycykgKiA2MDtcbiAgICAgICAgY29uc3QgdW5kZXJ0aW1lSG91cnMgPSBTdHJpbmcoTWF0aC5mbG9vcihkaWZmSW5NaW51dGVzIC8gNjApKS5wYWRTdGFydChcbiAgICAgICAgICAyLFxuICAgICAgICAgIFwiMFwiXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHVuZGVydGltZU1pbnV0ZXMgPSBTdHJpbmcoXG4gICAgICAgICAgTWF0aC5mbG9vcihkaWZmSW5NaW51dGVzICUgNjApXG4gICAgICAgICkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICAgICAgICB1bmRlcnRpbWUgPSBgJHt1bmRlcnRpbWVIb3Vyc30gaCA6ICR7dW5kZXJ0aW1lTWludXRlc30gbWA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGVudHJ5OiBpbmRleCArIDEsIC8vIFRoaXMgcmVwcmVzZW50cyB0aGUgbnVtYmVyIG9mIGRheXNcbiAgICAgIHRpbWVfaW46IGVudHJ5LnRpbWVfaW4sIC8vIFVzZSBhY3R1YWwgdGltZV9pbiB2YWx1ZVxuICAgICAgdGltZV9vdXQ6IGVudHJ5LnRpbWVfb3V0LCAvLyBVc2UgYWN0dWFsIHRpbWVfb3V0IHZhbHVlXG4gICAgICB0b3RhbF93b3JraW5nX2hvdXJzOiB0b3RhbFdvcmtpbmdIb3VycywgLy8gRm9ybWF0IHRvdGFsIGhvdXJzIGFzIFwiMDloOjMzbVwiIG9yIFwiLS0tLS1cIlxuICAgICAgdW5kZXJ0aW1lLCAvLyBGb3JtYXR0ZWQgYXMgXCIwOWg6MzNtXCIgb3IgXCItLS0tLVwiXG4gICAgICBvdmVydGltZTogdG90YWxPdmVydGltZSwgLy8gRm9ybWF0dGVkIGFzIFwiMDloOjMzbVwiIG9yIFwiLS0tLS1cIlxuICAgIH07XG4gIH0pO1xufSk7XG5cbi8vIEZldGNoIERUUiBkYXRhIGZvciB0aGUgc2VsZWN0ZWQgZW1wbG95ZWUgd2l0aGluIHRoZSBjdXJyZW50IGRhdGUgcmFuZ2VcbmNvbnN0IGZldGNoRFRSRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgaWYgKHNlbGVjdGVkRW1wbG95ZWVJZC52YWx1ZSAmJiBzdGFydERhdGUudmFsdWUgJiYgZW5kRGF0ZS52YWx1ZSkge1xuICAgIGF3YWl0IGR0clN0b3JlLmZldGNoRFRSUmFuZ2Uoe1xuICAgICAgZW1wbG95ZWVfaWQ6IHNlbGVjdGVkRW1wbG95ZWVJZC52YWx1ZSxcbiAgICAgIHN0YXJ0X2RhdGU6IHN0YXJ0RGF0ZS52YWx1ZSxcbiAgICAgIGVuZF9kYXRlOiBlbmREYXRlLnZhbHVlLFxuICAgIH0pO1xuICB9XG59O1xuXG5jb25zb2xlLmxvZyhcIkRUUiBST1dcIiwgZHRyUm93LnZhbHVlKTtcblxuLy8gXCJQcmV2XCIgQnV0dG9uIEFjdGlvbjogTW92ZSB0byB0aGUgcHJldmlvdXMgMTUtZGF5IHJhbmdlXG5jb25zdCBvblByZXYgPSAoKSA9PiB7XG4gIGNvbnN0IHByZXZEYXRlID0gbmV3IERhdGUoc3RhcnREYXRlLnZhbHVlKTtcbiAgcHJldkRhdGUuc2V0RGF0ZShwcmV2RGF0ZS5nZXREYXRlKCkgLSAxNSk7IC8vIFNoaWZ0IGJ5IDE1IGRheXMgYmFja1xuICBjb25zdCB7IHN0YXJ0RGF0ZTogbmV3U3RhcnREYXRlLCBlbmREYXRlOiBuZXdFbmREYXRlIH0gPSBnZXREVFJQZXJpb2QoXG4gICAgZGF0ZS5mb3JtYXREYXRlKHByZXZEYXRlLCBcIllZWVktTU0tRERcIilcbiAgKTtcbiAgc3RhcnREYXRlLnZhbHVlID0gbmV3U3RhcnREYXRlO1xuICBlbmREYXRlLnZhbHVlID0gbmV3RW5kRGF0ZTtcbiAgZmV0Y2hEVFJEYXRhKCk7XG59O1xuXG4vLyBcIk5leHRcIiBCdXR0b24gQWN0aW9uOiBNb3ZlIHRvIHRoZSBuZXh0IDE1LWRheSByYW5nZVxuY29uc3Qgb25OZXh0ID0gKCkgPT4ge1xuICBjb25zdCBuZXh0RGF0ZSA9IG5ldyBEYXRlKGVuZERhdGUudmFsdWUpO1xuICBuZXh0RGF0ZS5zZXREYXRlKG5leHREYXRlLmdldERhdGUoKSArIDEpOyAvLyBTaGlmdCB0byB0aGUgc3RhcnQgb2YgdGhlIG5leHQgcGVyaW9kXG4gIGNvbnN0IHsgc3RhcnREYXRlOiBuZXdTdGFydERhdGUsIGVuZERhdGU6IG5ld0VuZERhdGUgfSA9IGdldERUUlBlcmlvZChcbiAgICBkYXRlLmZvcm1hdERhdGUobmV4dERhdGUsIFwiWVlZWS1NTS1ERFwiKVxuICApO1xuICBzdGFydERhdGUudmFsdWUgPSBuZXdTdGFydERhdGU7XG4gIGVuZERhdGUudmFsdWUgPSBuZXdFbmREYXRlO1xuICBmZXRjaERUUkRhdGEoKTtcbn07XG5cbi8vIFwiQ3VycmVudFwiIEJ1dHRvbiBBY3Rpb246IFJlc2V0IHRvIHRoZSBjdXJyZW50IDE1LWRheSBwZXJpb2RcbmNvbnN0IG9uQ3VycmVudCA9ICgpID0+IHtcbiAgaW5pdGlhbGl6ZURhdGVSYW5nZSgpO1xuICBmZXRjaERUUkRhdGEoKTtcbn07XG5cbi8vIEluaXRpYWxpemUgdGhlIGRhdGUgcmFuZ2Ugd2hlbiB0aGUgY29tcG9uZW50IGxvYWRzXG5pbml0aWFsaXplRGF0ZVJhbmdlKCk7XG5cbmNvbnN0IG9wZW5EaWFsb2cgPSAoZHRyUm93KSA9PiB7XG4gIGNvbnN0IGRvY0RlZmluaXRpb24gPSBnZW5lcmF0ZURvY0RlZmluaXRpb24oZHRyUm93KTtcbiAgcGRmTWFrZS5jcmVhdGVQZGYoZG9jRGVmaW5pdGlvbikuZ2V0RGF0YVVybCgoZGF0YVVybCkgPT4ge1xuICAgIHBkZlVybC52YWx1ZSA9IGRhdGFVcmw7XG4gICAgZGlhbG9nLnZhbHVlID0gdHJ1ZTtcbiAgfSk7XG59O1xuXG5jb25zdCBnZW5lcmF0ZURvY0RlZmluaXRpb24gPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgcGFnZU1hcmdpbnM6IFs0MCwgNDAsIC0xMCwgNDBdLFxuICAgIGNvbnRlbnQ6IFtcbiAgICAgIHsgdGV4dDogXCJEYWlseSBUaW1lIFJlY29yZFwiLCBzdHlsZTogXCJoZWFkZXJcIiB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgeyB0ZXh0OiBcIkZyb206IFwiLCBib2xkOiBmYWxzZSwgZm9udFNpemU6IDggfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBgICR7Zm9ybWF0RGF0ZVRvQ3VzdG9tU3RyaW5nKHN0YXJ0RGF0ZS52YWx1ZSl9YCxcbiAgICAgICAgICAgIGJvbGQ6IHRydWUsXG4gICAgICAgICAgICBkZWNvcmF0aW9uOiBcInVuZGVybGluZVwiLFxuICAgICAgICAgICAgZm9udFNpemU6IDEwLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIG1hcmdpbjogWzAsIDAsIDAsIDNdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogW1xuICAgICAgICAgIHsgdGV4dDogXCJUbzogXCIsIGJvbGQ6IGZhbHNlLCBmb250U2l6ZTogOCB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IGAgICAgICR7Zm9ybWF0RGF0ZVRvQ3VzdG9tU3RyaW5nKGVuZERhdGUudmFsdWUpfWAsXG4gICAgICAgICAgICBib2xkOiB0cnVlLFxuICAgICAgICAgICAgZGVjb3JhdGlvbjogXCJ1bmRlcmxpbmVcIixcbiAgICAgICAgICAgIGZvbnRTaXplOiAxMCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBtYXJnaW46IFswLCAwLCAwLCAxMF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogW1xuICAgICAgICAgICAgICB7IHRleHQ6IFwiRW1wbG95ZWUgTmFtZTpcIiwgYm9sZDogZmFsc2UsIGZvbnRTaXplOiA4IH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBgICAke2VtcGxveWVlTmFtZS52YWx1ZX1gLFxuICAgICAgICAgICAgICAgIGJvbGQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZGVjb3JhdGlvbjogXCJ1bmRlcmxpbmVcIixcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogMTAsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogW1xuICAgICAgICAgICAgICB7IHRleHQ6IFwiUG9zaXRpb246XCIsIGJvbGQ6IGZhbHNlLCBmb250U2l6ZTogOCB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogYCAgJHtlbXBsb3llZVBvc2l0aW9uLnZhbHVlfWAsXG4gICAgICAgICAgICAgICAgYm9sZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkZWNvcmF0aW9uOiBcInVuZGVybGluZVwiLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxMCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogXCJBZ2U6XCIsIGJvbGQ6IGZhbHNlLCBmb250U2l6ZTogOCB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogYCAgJHtlbXBsb3llZUFnZS52YWx1ZX1gLFxuICAgICAgICAgICAgICAgIGJvbGQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZGVjb3JhdGlvbjogXCJ1bmRlcmxpbmVcIixcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogMTAsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIG1hcmdpbjogWzAsIDAsIDAsIDEwXSxcbiAgICAgIH0sXG5cbiAgICAgIHtcbiAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICBoZWFkZXJSb3dzOiAxLFxuICAgICAgICAgIHdpZHRoczogW1wiYXV0b1wiLCBcImF1dG9cIiwgXCJhdXRvXCIsIFwiYXV0b1wiLCBcImF1dG9cIiwgXCJhdXRvXCJdLFxuICAgICAgICAgIGJvZHk6IFtcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiBcIk51bWJlciBvZiBEYXlzXCIsIGJvbGQ6IHRydWUgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiBcIlRpbWUgSW5cIiwgYm9sZDogdHJ1ZSwgYWxpZ25tZW50OiBcImNlbnRlclwiIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogXCJUaW1lIE91dFwiLCBib2xkOiB0cnVlLCBhbGlnbm1lbnQ6IFwiY2VudGVyXCIgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiBcIlRvdGFsIFdvcmtpbmcgSG91cnNcIiwgYm9sZDogdHJ1ZSB9LFxuICAgICAgICAgICAgICB7IHRleHQ6IFwiVW5kZXJ0aW1lXCIsIGJvbGQ6IHRydWUgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiBcIk92ZXJ0aW1lXCIsIGJvbGQ6IHRydWUgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAuLi5kdHJSb3cudmFsdWUubWFwKChlbnRyeSkgPT4gW1xuICAgICAgICAgICAgICB7IHRleHQ6IGVudHJ5LmVudHJ5LCBhbGlnbm1lbnQ6IFwiY2VudGVyXCIgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiBlbnRyeS50aW1lX2luIHx8IFwiIC0gLSAtIFwiLCBhbGlnbm1lbnQ6IFwiY2VudGVyXCIgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiBlbnRyeS50aW1lX291dCB8fCBcIiAtIC0gLSBcIiwgYWxpZ25tZW50OiBcImNlbnRlclwiIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBlbnRyeS50b3RhbF93b3JraW5nX2hvdXJzIHx8IFwiIC0gLSAtIFwiLFxuICAgICAgICAgICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiBlbnRyeS51bmRlcnRpbWUgfHwgXCIgLSAtIC0gXCIsIGFsaWdubWVudDogXCJjZW50ZXJcIiB9LFxuICAgICAgICAgICAgICB7IHRleHQ6IGVudHJ5Lm92ZXJ0aW1lIHx8IFwiIC0gLSAtIFwiLCBhbGlnbm1lbnQ6IFwiY2VudGVyXCIgfSxcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIGxheW91dDoge1xuICAgICAgICAgIGhMaW5lV2lkdGg6IGZ1bmN0aW9uIChpLCBub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gaSA9PT0gMCB8fCBpID09PSBub2RlLnRhYmxlLmJvZHkubGVuZ3RoID8gMSA6IDAuNTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZMaW5lV2lkdGg6IGZ1bmN0aW9uIChpLCBub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gMC41O1xuICAgICAgICAgIH0sXG4gICAgICAgICAgaExpbmVDb2xvcjogZnVuY3Rpb24gKGksIG5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBpID09PSAwIHx8IGkgPT09IG5vZGUudGFibGUuYm9keS5sZW5ndGggPyBcImJsYWNrXCIgOiBcIiNjY2NcIjtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZMaW5lQ29sb3I6IGZ1bmN0aW9uIChpLCBub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gXCIjY2NjXCI7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBzdHlsZXM6IHtcbiAgICAgIGhlYWRlcjoge1xuICAgICAgICBmb250U2l6ZTogMTQsXG4gICAgICAgIGJvbGQ6IHRydWUsXG4gICAgICAgIGFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgbWFyZ2luOiBbMCwgNSwgMCwgMTBdLFxuICAgICAgfSxcbiAgICAgIHRhYmxlSGVhZGVyOiB7IGJvbGQ6IHRydWUsIGZvbnRTaXplOiAxMywgY29sb3I6IFwiYmxhY2tcIiB9LFxuICAgIH0sXG4gICAgZGVmYXVsdFN0eWxlOiB7IGZvbnRTaXplOiA5IH0sXG4gIH07XG59O1xuXG4vLyBjb25zdCBwcmludERUUiA9ICgpID0+IHtcbi8vICAgY29uc3QgZG9jRGVmaW5pdGlvbiA9IGdlbmVyYXRlRG9jRGVmaW5pdGlvbigpO1xuLy8gICBwZGZNYWtlLmNyZWF0ZVBkZihkb2NEZWZpbml0aW9uKS5vcGVuKCk7XG4vLyB9O1xuXG5jb25zdCBjb2x1bW5zID0gW1xuICB7XG4gICAgbmFtZTogXCJudW1iZXJfb2ZfZGF5c1wiLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGxhYmVsOiBcIk5PRFwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLCAvLyBDZW50ZXIgdGhlIGhlYWRlclxuICAgIGZpZWxkOiAocm93KSA9PiByb3cuZW50cnksXG4gICAgZm9ybWF0OiAodmFsKSA9PiBgJHt2YWx9YCxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiaW5cIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIiwgLy8gQ2VudGVyIHRoZSBoZWFkZXJcbiAgICBsYWJlbDogXCJJTlwiLFxuICAgIGZpZWxkOiBcInRpbWVfaW5cIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwib3V0XCIsXG4gICAgbGFiZWw6IFwiT1VUXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsIC8vIENlbnRlciB0aGUgaGVhZGVyXG4gICAgZmllbGQ6IFwidGltZV9vdXRcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwidG90YWxfd29ya2luZ19ob3Vyc1wiLFxuICAgIGxhYmVsOiBcIlRvdGFsIFdvcmtpbmcgSG91cnNcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIiwgLy8gQ2VudGVyIHRoZSBoZWFkZXJcbiAgICBmaWVsZDogXCJ0b3RhbF93b3JraW5nX2hvdXJzXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIm92ZXJ0aW1lXCIsXG4gICAgbGFiZWw6IFwiT3ZlcnRpbWVcIixcbiAgICBmaWVsZDogXCJvdmVydGltZVwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLCAvLyBDZW50ZXIgdGhlIGhlYWRlclxuICB9LFxuICB7XG4gICAgbmFtZTogXCJ1bmRlcnRpbWVcIixcbiAgICBsYWJlbDogXCJVbmRlcnRpbWVcIixcbiAgICBmaWVsZDogXCJ1bmRlcnRpbWVcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIiwgLy8gQ2VudGVyIHRoZSBoZWFkZXJcbiAgfSxcbl07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuLmdyYWRpZW50LWJ0biB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzEwMzQzMiwgIzI1NzVmYyk7XG4gIGJvcmRlcjogbm9uZTtcbn1cbi5mdWxsLWhlaWdodC10YWJsZSB7XG4gIG1heC1oZWlnaHQ6IG5vbmU7XG59XG4ucS10YWJsZSB0ZCB7XG4gIHBhZGRpbmc6IDdweDtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXktc21cIj5cbiAgICAgIDxxLXRhYnNcbiAgICAgICAgdi1tb2RlbD1cInRhYlwiXG4gICAgICAgIG5hcnJvdy1pbmRpY2F0b3JcbiAgICAgICAgbm8tY2Fwc1xuICAgICAgICBpbmxpbmUtbGFiZWxcbiAgICAgICAgZGVuc2VcbiAgICAgICAgYWxpZ249XCJqdXN0aWZ5XCJcbiAgICAgICAgY2xhc3M9XCJncmFkaWVudC1idG5cIlxuICAgICAgPlxuICAgICAgICA8cS10YWJcbiAgICAgICAgICBjbGFzcz1cInRleHQtd2hpdGVcIlxuICAgICAgICAgIG5hbWU9XCJkdHJfb3ZlcnZpZXdcIlxuICAgICAgICAgIGljb249XCJldmVudF9hdmFpbGFibGVcIlxuICAgICAgICAgIGxhYmVsPVwiRFRSIE92ZXJ2aWV3XCJcbiAgICAgICAgLz5cbiAgICAgICAgPHEtdGFiXG4gICAgICAgICAgY2xhc3M9XCJ0ZXh0LXdoaXRlXCJcbiAgICAgICAgICBuYW1lPVwiYXR0ZW5kYW5jZV9zdW1tYXJ5XCJcbiAgICAgICAgICBpY29uPVwiY2FsZW5kYXJfbW9udGhcIlxuICAgICAgICAgIGxhYmVsPVwiQXR0ZW5kYW5jZSBTdW1tYXJ5XCJcbiAgICAgICAgLz5cbiAgICAgIDwvcS10YWJzPlxuICAgIDwvZGl2PlxuICAgIDxxLXRhYi1wYW5lbHMgdi1tb2RlbD1cInRhYlwiIGFuaW1hdGVkPlxuICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJkdHJfb3ZlcnZpZXdcIj5cbiAgICAgICAgPEF0dGVuZGFuY2NlVGFibGUgLz5cbiAgICAgIDwvcS10YWItcGFuZWw+XG4gICAgICA8cS10YWItcGFuZWwgbmFtZT1cImF0dGVuZGFuY2Vfc3VtbWFyeVwiPlxuICAgICAgICA8QXR0ZW5kYW5jZVN1bW1hcnkgLz5cbiAgICAgICAgPCEtLSA8RW1wbG95ZWVBdHRlbmRhbmNlQnV0dG9uIGFsaWduPVwicmlnaHRcIiAvPiAtLT5cbiAgICAgIDwvcS10YWItcGFuZWw+XG4gICAgPC9xLXRhYi1wYW5lbHM+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcbi8vIGltcG9ydCBBdHRlbmRhbmNjZVRhYmxlIGZyb20gXCIuL3NlY3Rpb25zL0F0dGVuZGFuY2VUYWJsZS52dWVcIjtcbmltcG9ydCBBdHRlbmRhbmNjZVRhYmxlIGZyb20gXCIuL3NlY3Rpb25zL2R0ci1vdmVydmlldy9BdHRlbmRhbmNlVGFibGUudnVlXCI7XG5pbXBvcnQgQXR0ZW5kYW5jZVN1bW1hcnkgZnJvbSBcIi4vc2VjdGlvbnMvYXR0ZW5kYW5jZS1zdW1tYXJ5L0F0dGVuZGFuY2VTdW1tYXJ5LnZ1ZVwiO1xuY29uc3QgdGFiID0gcmVmKFwiZHRyX292ZXJ2aWV3XCIpO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5ncmFkaWVudC1idG4ge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICMxMDM0MzIsICMyNTc1ZmMpO1xuICBib3JkZXI6IG5vbmU7XG59XG48L3N0eWxlPlxuIiwiaW1wb3J0IHsgZGVmaW5lU3RvcmUgfSBmcm9tIFwicGluaWFcIjtcbmltcG9ydCB7IE5vdGlmeSB9IGZyb20gXCJxdWFzYXJcIjtcbmltcG9ydCB7IGFwaSB9IGZyb20gXCJzcmMvYm9vdC9heGlvc1wiO1xuaW1wb3J0IHsgcmVmIH0gZnJvbSBcInZ1ZVwiO1xuXG5leHBvcnQgY29uc3QgdXNlRW1wbG95ZWVBbGxvd2FuY2UgPSBkZWZpbmVTdG9yZShcImVtcGxveWVlLWFsbG93YW5jZVwiLCAoKSA9PiB7XG4gIGNvbnN0IGFsbG93YW5jZSA9IHJlZihudWxsKTtcbiAgY29uc3QgYWxsb3dhbmNlcyA9IHJlZihbXSk7XG5cbiAgY29uc3Qgc2VhcmNoQWxsb3dhbmNlID0gYXN5bmMgKGtleXdvcmQpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc29sZS5sb2coXCJTZWFyY2hpbmcgZm9yIGVtcGxveWVlIHdpdGgga2V5d29yZDpcIiwga2V5d29yZCk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KFxuICAgICAgICBgL2FwaS9zZWFyY2gtYWxsb3dhbmNlP2tleXdvcmQ9JHtrZXl3b3JkfWBcbiAgICAgICk7XG4gICAgICBjb25zb2xlLmxvZyhcIkFsbG93YW5jZSByZXNwb25zZTpcIiwgcmVzcG9uc2UpO1xuICAgICAgYWxsb3dhbmNlcy52YWx1ZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzZWFyY2hpbmcgZW1wbG95ZWU6XCIsIGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZmV0Y2hFbXBsb3llZUFsbG93YW5jZSA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KFwiL2FwaS9lbXBsb3llZS1hbGxvd2FuY2VcIik7XG4gICAgICBhbGxvd2FuY2VzLnZhbHVlID0gcmVzcG9uc2UuZGF0YTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coXCJlcnJvciBmZXRjaGluZyBhbGxvd2FuY2VcIiwgZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjcmVhdGVFbXBsb3llZUFsbG93YW5jZSA9IGFzeW5jIChkYXRhKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnBvc3QoXCIvYXBpL2VtcGxveWVlLWFsbG93YW5jZVwiLCBkYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiZW1wbG95ZWUgcmVzcG9uc2VcIiwgcmVzcG9uc2UuZGF0YSk7XG4gICAgICBhbGxvd2FuY2VzLnZhbHVlLnVuc2hpZnQocmVzcG9uc2UuZGF0YSk7XG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgICAgICBtZXNzYWdlOiBcIkFsbG93YW5jZSBzdWNjZXNzZnVsbHkgY3JlYXRlZFwiLFxuICAgICAgICAvLyBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICAgICAgdGltZW91dDogMTAwMCxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG5cbiAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSBcIkFuIGVycm9yIG9jY3VycmVkLiBQbGVhc2UgdHJ5IGFnYWluLlwiO1xuICAgICAgaWYgKGVycm9yLnJlc3BvbnNlICYmIGVycm9yLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDA5KSB7XG4gICAgICAgIGVycm9yTWVzc2FnZSA9IFwiQWxsb3dhbmNlIGZvciB0aGlzIGVtcGxveWVlIGFscmVhZHkgZXhpc3RzLlwiO1xuICAgICAgfSBlbHNlIGlmIChlcnJvci5yZXNwb25zZSAmJiBlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQyMikge1xuICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIkludmFsaWQgZGF0YS4gUGxlYXNlIGNoZWNrIHRoZSBpbnB1dHMuXCI7XG4gICAgICB9XG5cbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yTWVzc2FnZSxcbiAgICAgICAgLy8gcG9zaXRpb246IFwidG9wXCIsXG4gICAgICAgIHRpbWVvdXQ6IDEwMDAsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBhbGxvd2FuY2UsXG4gICAgYWxsb3dhbmNlcyxcbiAgICBjcmVhdGVFbXBsb3llZUFsbG93YW5jZSxcbiAgICBmZXRjaEVtcGxveWVlQWxsb3dhbmNlLFxuICAgIHNlYXJjaEFsbG93YW5jZSxcbiAgfTtcbn0pO1xuIiwiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxxLWJ0blxuICAgICAgcGFkZGluZz1cInNtIG1kXCJcbiAgICAgIGxhYmVsPVwiQWRkIEFsbG93YW5jZVwiXG4gICAgICBpY29uPVwiYWRkX2NpcmNsZVwiXG4gICAgICBzaXplPVwibWRcIlxuICAgICAgY2xhc3M9XCJncmFkaWVudC1idG4gdGV4dC13aGl0ZVwiXG4gICAgICBAY2xpY2s9XCJvcGVuRGlhbG9nXCJcbiAgICAvPlxuXG4gICAgPHEtZGlhbG9nXG4gICAgICB2LW1vZGVsPVwiZGlhbG9nXCJcbiAgICAgIHBlcnNpc3RlbnRcbiAgICAgIHBvc2l0aW9uPVwicmlnaHRcIlxuICAgICAgYmFja2Ryb3AtZmlsdGVyPVwiYmx1cig0cHgpIHNhdHVyYXRlKDE1MCUpXCJcbiAgICA+XG4gICAgICA8cS1jYXJkIHN0eWxlPVwid2lkdGg6IDQwMHB4OyBtYXgtd2lkdGg6IDgwdndcIj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uXG4gICAgICAgICAgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtcHgtbWQgcS1weS1zbSBncmFkaWVudC1idG4gdGV4dC13aGl0ZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNSBxLW1yLW1kXCI+8J+SvCBBZGQgRW1wbG95ZWUgQWxsb3dhbmNlPC9kaXY+XG4gICAgICAgICAgPHEtc3BhY2UgLz5cbiAgICAgICAgICA8cS1idG4gaWNvbj1cImFycm93X2ZvcndhcmRfaW9zXCIgZmxhdCBkZW5zZSByb3VuZCB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgdi1tb2RlbD1cInNlYXJjaEtleXdvcmRcIlxuICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cInNlYXJjaFwiXG4gICAgICAgICAgICBsYWJlbD1cIlNlYXJjaCBFbXBsb3llZVwiXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIHJvdW5kZWRcbiAgICAgICAgICAgIGRlYm91bmNlPVwiNTAwXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgbmFtZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgIDxxLWljb24gdi1pZj1cIiFzZWFyY2hMb2FkaW5nXCIgbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICAgICAgICAgIDxxLXNwaW5uZXIgdi1lbHNlIGNvbG9yPVwiZ3JleVwiIHNpemU9XCJzbVwiIC8+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPGRpdiB2LWlmPVwic2VhcmNoS2V5d29yZFwiIGNsYXNzPVwiY3VzdG9tLWxpc3Qgei10b3BcIj5cbiAgICAgICAgICAgICAgPHEtY2FyZD5cbiAgICAgICAgICAgICAgICA8cS1saXN0IHNlcGFyYXRvcj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0gdi1pZj1cIiFlbXBsb3llZXM/Lmxlbmd0aFwiPlxuICAgICAgICAgICAgICAgICAgICBObyBFbXBsb3llZSBSZWNvcmRcbiAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbVxuICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cImF1dG9GaWxsRW1wbG95ZWUoZW1wbG95ZWUpXCJcbiAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cImVtcGxveWVlIGluIGVtcGxveWVlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgOmtleT1cImVtcGxveWVlLmlkXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGlja2FibGVcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGAke2VtcGxveWVlLmZpcnN0bmFtZX0gJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbXBsb3llZS5taWRkbGVuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGVtcGxveWVlLm1pZGRsZW5hbWUuY2hhckF0KDApICsgXCIuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9ICR7ZW1wbG95ZWUubGFzdG5hbWV9YFxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9xLWxpc3Q+XG4gICAgICAgICAgICAgIDwvcS1jYXJkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLW1kXCI+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICB2LW1vZGVsPVwiZW1wbG95ZWVBbGxvd2FuY2UuZW1wbG95ZWVfbmFtZVwiXG4gICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICAgIGxhYmVsPVwiTmFtZVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbD1cImVtcGxveWVlQWxsb3dhbmNlLmVtcGxveWVlX3Bvc2l0aW9uXCJcbiAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgbGFiZWw9XCJQb3NpdGlvblwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJlbXBsb3llZUFsbG93YW5jZS5hbW91bnRcIlxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBsYWJlbD1cIkFsbG93YW5jZSBhbW91bnRcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxxLWNhcmQtYWN0aW9ucz5cbiAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgIHNpemU9XCJtZFwiXG4gICAgICAgICAgICBwYWRkaW5nPVwieHMgbWRcIlxuICAgICAgICAgICAgbGFiZWw9XCJzYXZlXCJcbiAgICAgICAgICAgIGljb24tcmlnaHQ9XCJzZW5kXCJcbiAgICAgICAgICAgIGNsYXNzPVwiZ3JhZGllbnQtYnRuIHRleHQtd2hpdGVcIlxuICAgICAgICAgICAgQGNsaWNrPVwic2F2ZVwiXG4gICAgICAgICAgICA6bG9hZGluZz1cImxvYWRpbmdcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgICA8L3EtY2FyZD5cbiAgICA8L3EtZGlhbG9nPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VFbXBsb3llZUFsbG93YW5jZSB9IGZyb20gXCJzcmMvc3RvcmVzL2FsbG93YW5jZVwiO1xuaW1wb3J0IHsgdXNlRW1wbG95ZWVTdG9yZSB9IGZyb20gXCJzdG9yZXMvZW1wbG95ZWVcIjtcbmltcG9ydCB7IGNvbXB1dGVkLCByZWFjdGl2ZSwgcmVmIH0gZnJvbSBcInZ1ZVwiO1xuXG5jb25zdCBlbXBsb3llZVN0b3JlID0gdXNlRW1wbG95ZWVTdG9yZSgpO1xuY29uc3QgZW1wbG95ZWVzID0gY29tcHV0ZWQoKCkgPT4gZW1wbG95ZWVTdG9yZS5lbXBsb3llZXMpO1xuY29uc3QgZW1wbG95ZWVBbGxvd2FuY2VTdG9yZSA9IHVzZUVtcGxveWVlQWxsb3dhbmNlKCk7XG5jb25zdCBlbXBsb3llZUFsbG93YW5jZVJvd3MgPSBjb21wdXRlZCgoKSA9PiBlbXBsb3llZUFsbG93YW5jZVN0b3JlLmFsbG93YW5jZXMpO1xuY29uc3Qgc2VhcmNoS2V5d29yZCA9IHJlZihcIlwiKTtcbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5jb25zdCBsb2FkaW5nID0gcmVmKGZhbHNlKTtcbmNvbnN0IHNlYXJjaExvYWRpbmcgPSByZWYoZmFsc2UpO1xuY29uc3Qgb3BlbkRpYWxvZyA9ICgpID0+IHtcbiAgZGlhbG9nLnZhbHVlID0gdHJ1ZTtcbn07XG5cbmNvbnN0IHNlYXJjaCA9IGFzeW5jICgpID0+IHtcbiAgaWYgKHNlYXJjaEtleXdvcmQudmFsdWUudHJpbSgpKSB7XG4gICAgc2VhcmNoTG9hZGluZy52YWx1ZSA9IHRydWU7XG4gICAgYXdhaXQgZW1wbG95ZWVTdG9yZS5zZWFyY2hFbXBsb3llZShzZWFyY2hLZXl3b3JkLnZhbHVlKTtcbiAgICBzZWFyY2hMb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIH1cbn07XG5cbmNvbnN0IGF1dG9GaWxsRW1wbG95ZWUgPSAoZW1wbG95ZWUpID0+IHtcbiAgY29uc29sZS5sb2coXCJTZWxlY3RlZCBFbXBsb3llZTpcIiwgZW1wbG95ZWUpO1xuXG4gIGVtcGxveWVlQWxsb3dhbmNlLmVtcGxveWVlX2lkID0gZW1wbG95ZWUuaWQ7XG4gIGVtcGxveWVlQWxsb3dhbmNlLmVtcGxveWVlX25hbWUgPSBgJHtlbXBsb3llZS5maXJzdG5hbWV9ICR7XG4gICAgZW1wbG95ZWUubWlkZGxlbmFtZSA/IGVtcGxveWVlLm1pZGRsZW5hbWUuY2hhckF0KDApICsgXCIuXCIgOiBcIlwiXG4gIH0gJHtlbXBsb3llZS5sYXN0bmFtZX1gO1xuICBlbXBsb3llZUFsbG93YW5jZS5lbXBsb3llZV9wb3NpdGlvbiA9IGVtcGxveWVlLnBvc2l0aW9uO1xuICBzZWFyY2hLZXl3b3JkLnZhbHVlID0gXCJcIjtcbiAgY29uc29sZS5sb2coXCJGaWxsZWQgRGVzaWduYXRpb24gRGF0YTpcIiwgZW1wbG95ZWVBbGxvd2FuY2UpO1xufTtcblxuY29uc3QgZW1wbG95ZWVBbGxvd2FuY2UgPSByZWFjdGl2ZSh7XG4gIGVtcGxveWVlX2lkOiBcIlwiLFxuICBlbXBsb3llZV9uYW1lOiBcIlwiLFxuICBlbXBsb3llZV9wb3NpdGlvbjogXCJcIixcbiAgYW1vdW50OiBcIlwiLFxufSk7XG5cbmNvbnN0IGNsZWFyRW1wbG95ZWVBbGxvd2FuY2VGb3JtID0gKCkgPT4ge1xuICAoZW1wbG95ZWVBbGxvd2FuY2UuZW1wbG95ZWVfaWQgPSBcIlwiKSxcbiAgICAoZW1wbG95ZWVBbGxvd2FuY2UuZW1wbG95ZWVfbmFtZSA9IFwiXCIpLFxuICAgIChlbXBsb3llZUFsbG93YW5jZS5lbXBsb3llZV9wb3NpdGlvbiA9IFwiXCIpLFxuICAgIChlbXBsb3llZUFsbG93YW5jZS5hbW91bnQgPSBcIlwiKTtcbn07XG5cbmNvbnN0IHNhdmUgPSBhc3luYyAoKSA9PiB7XG4gIGxvYWRpbmcudmFsdWUgPSB0cnVlO1xuICB0cnkge1xuICAgIGNvbnN0IGRhdGFUb0JlU2F2ZSA9IGF3YWl0IGVtcGxveWVlQWxsb3dhbmNlU3RvcmUuY3JlYXRlRW1wbG95ZWVBbGxvd2FuY2UoXG4gICAgICBlbXBsb3llZUFsbG93YW5jZVxuICAgICk7XG4gICAgY29uc29sZS5sb2coXCJkYXRhIHRvIGJlIHNhdmVcIiwgZGF0YVRvQmVTYXZlKTtcbiAgICBjbGVhckVtcGxveWVlQWxsb3dhbmNlRm9ybSgpO1xuICAgIGVtcGxveWVlQWxsb3dhbmNlUm93cy52YWx1ZSA9XG4gICAgICBhd2FpdCBlbXBsb3llZUFsbG93YW5jZVN0b3JlLmZldGNoRW1wbG95ZWVBbGxvd2FuY2UoKTtcbiAgICBkaWFsb2cudmFsdWUgPSBmYWxzZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH0gZmluYWxseSB7XG4gICAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICB9XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5ncmFkaWVudC1idG4ge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICM1MDJhMzMsICNhNjIxYTYpO1xuICBib3JkZXI6IG5vbmU7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxxLWlucHV0XG4gICAgICB2LW1vZGVsPVwic2VhcmNoS2V5d29yZFwiXG4gICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwic2VhcmNoXCJcbiAgICAgIG91dGxpbmVkXG4gICAgICBkZW5zZVxuICAgICAgZmxhdFxuICAgICAgbGFiZWw9XCJTZWFyY2hcIlxuICAgICAgZGVib3VuY2U9XCIxMDAwXCJcbiAgICAgIHN0eWxlPVwid2lkdGg6IDMwMHB4XCJcbiAgICA+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cS1pY29uIHYtaWY9XCIhbG9hZGluZ1wiIG5hbWU9XCJzZWFyY2hcIiAvPlxuICAgICAgICAgIDxxLXNwaW5uZXIgdi1lbHNlIGNvbG9yPVwiZ3JleVwiIHNpemU9XCJzbVwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L3EtaW5wdXQ+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGNvbXB1dGVkLCByZWYgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyB1c2VFbXBsb3llZUFsbG93YW5jZSB9IGZyb20gXCJzdG9yZXMvYWxsb3dhbmNlXCI7XG5cbmNvbnN0IGVtcGxveWVlQWxsb3dhbmNlU3RvcmUgPSB1c2VFbXBsb3llZUFsbG93YW5jZSgpO1xuY29uc3QgZW1wbG95ZWVBbGxvd2FuY2VEYXRhID0gY29tcHV0ZWQoKCkgPT4gZW1wbG95ZWVBbGxvd2FuY2VTdG9yZS5hbGxvd2FuY2VzKTtcbmNvbnN0IHNlYXJjaEtleXdvcmQgPSByZWYoXCJcIik7XG5jb25zdCBsb2FkaW5nID0gcmVmKGZhbHNlKTtcblxuY29uc3Qgc2VhcmNoID0gYXN5bmMgKCkgPT4ge1xuICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgYXdhaXQgZW1wbG95ZWVBbGxvd2FuY2VTdG9yZS5zZWFyY2hBbGxvd2FuY2Uoc2VhcmNoS2V5d29yZC52YWx1ZSk7XG4gIC8vIGlmIChzZWFyY2hLZXl3b3JkLnZhbHVlKSB7XG4gIC8vICAgYXdhaXQgZW1wbG95ZWVBbGxvd2FuY2VTdG9yZS5zZWFyY2hBbGxvd2FuY2Uoc2VhcmNoS2V5d29yZC52YWx1ZSk7XG4gIC8vIH1cbiAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+PC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW4gcS1tYi1tZFwiIGFsaWduPVwicmlnaHRcIj5cbiAgICA8ZGl2PlxuICAgICAgPEFkZEFsbG93YW5jZSAvPlxuICAgIDwvZGl2PlxuICAgIDxTZWFyY2hBbGxvd2FuY2UgLz5cbiAgPC9kaXY+XG4gIDxxLXRhYmxlXG4gICAgY2xhc3M9XCJzdGlja3ktaGVhZGVyXCJcbiAgICA6cm93cz1cImVtcGxveWVlQWxsb3dhbmNlUm93c1wiXG4gICAgOmNvbHVtbnM9XCJlbXBsb3llZUFsbG93YW5jZUNvbHVtbnNcIlxuICAgIHJvdy1rZXk9XCJuYW1lXCJcbiAgICB2LW1vZGVsOnBhZ2luYXRpb249XCJwYWdpbmF0aW9uXCJcbiAgICBoaWRlLWJvdHRvbVxuICA+XG4gICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtYWN0aW9ucz1cInByb3BzXCI+XG4gICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICA8cS1idG4gY29sb3I9XCJwb3NpdGl2ZVwiIGljb249XCJlZGl0XCIgc2l6ZT1cInNtXCIgZmxhdCByb3VuZCBkZW5zZT5cbiAgICAgICAgICA8cS10b29sdGlwIGNsYXNzPVwiYmctcG9zaXRpdmVcIiA6ZGVsYXk9XCIyMDBcIj5FZGl0PC9xLXRvb2x0aXA+XG4gICAgICAgIDwvcS1idG4+XG4gICAgICA8L3EtdGQ+XG4gICAgPC90ZW1wbGF0ZT5cbiAgPC9xLXRhYmxlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGNvbXB1dGVkLCBvbk1vdW50ZWQsIHJlZiB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IHVzZUVtcGxveWVlQWxsb3dhbmNlIH0gZnJvbSBcInN0b3Jlcy9hbGxvd2FuY2VcIjtcbmltcG9ydCBBZGRBbGxvd2FuY2UgZnJvbSBcIi4vQWRkQWxsb3dhbmNlLnZ1ZVwiO1xuaW1wb3J0IFNlYXJjaEFsbG93YW5jZSBmcm9tIFwiLi9TZWFyY2hBbGxvd2FuY2UudnVlXCI7XG5cbmNvbnN0IGVtcGxveWVlQWxsb3dhbmNlU3RvcmUgPSB1c2VFbXBsb3llZUFsbG93YW5jZSgpO1xuY29uc3QgZW1wbG95ZWVBbGxvd2FuY2VSb3dzID0gY29tcHV0ZWQoKCkgPT4gZW1wbG95ZWVBbGxvd2FuY2VTdG9yZS5hbGxvd2FuY2VzKTtcblxuY29uc3QgcGFnaW5hdGlvbiA9IHJlZih7XG4gIHJvd3NQZXJQYWdlOiAwLFxufSk7XG5cbm9uTW91bnRlZChhc3luYyAoKSA9PiB7XG4gIGF3YWl0IHJlbG9hZFRhYmxlRGF0YSgpO1xufSk7XG5cbmNvbnN0IHJlbG9hZFRhYmxlRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBlbXBsb3llZUFsbG93YW5jZVJvd3MudmFsdWUgPVxuICAgICAgYXdhaXQgZW1wbG95ZWVBbGxvd2FuY2VTdG9yZS5mZXRjaEVtcGxveWVlQWxsb3dhbmNlKCk7XG4gICAgY29uc29sZS5sb2coXCJhbGxvd2FuY2VcIiwgZW1wbG95ZWVBbGxvd2FuY2VSb3dzLnZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVycm9yIGZldGNoaW5nIGFsbG93YW5jZVwiLCBlcnJvcik7XG4gIH1cbn07XG5cbmNvbnN0IGZvcm1hdEZ1bGxuYW1lID0gKHJvdykgPT4ge1xuICBjb25zdCBjYXBpdGFsaXplID0gKHN0cikgPT5cbiAgICBzdHIgPyBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSA6IFwiXCI7XG4gIGNvbnN0IGZpcnN0bmFtZSA9IHJvdy5maXJzdG5hbWUgPyBjYXBpdGFsaXplKHJvdy5maXJzdG5hbWUpIDogXCJObyBGaXJzdG5hbWVcIjtcbiAgY29uc3QgbWlkZGxlbmFtZSA9IHJvdy5taWRkbGVuYW1lXG4gICAgPyBjYXBpdGFsaXplKHJvdy5taWRkbGVuYW1lKS5jaGFyQXQoMCkgKyBcIi5cIlxuICAgIDogXCJcIjtcbiAgY29uc3QgbGFzdG5hbWUgPSByb3cubGFzdG5hbWUgPyBjYXBpdGFsaXplKHJvdy5sYXN0bmFtZSkgOiBcIk5vIExhc3RuYW1lXCI7XG5cbiAgcmV0dXJuIGAke2ZpcnN0bmFtZX0gJHttaWRkbGVuYW1lfSAke2xhc3RuYW1lfWAudHJpbSgpO1xufTtcblxuY29uc3QgZm9ybWF0RGF0ZSA9IChkYXRlVGltZSkgPT4ge1xuICBpZiAoIWRhdGVUaW1lKSByZXR1cm4gXCIgLSAtIFwiOyAvLyBSZXR1cm4gYSBwbGFjZWhvbGRlciBpZiB0aGUgdmFsdWUgaXMgbWlzc2luZ1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0ZVRpbWUpO1xuICBpZiAoaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSByZXR1cm4gXCIgLSAtIFwiO1xuXG4gIHJldHVybiBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLVVTXCIsIHtcbiAgICBtb250aDogXCJzaG9ydFwiLFxuICAgIGRheTogXCJudW1lcmljXCIsXG4gICAgeWVhcjogXCJudW1lcmljXCIsXG4gIH0pOyAvLyBGb3JtYXQgYXMgXCJPY3QuIDE0LCAyMDI0XCJcbn07XG5cbi8vIEZvcm1hdCBjdXJyZW5jeSB2YWx1ZXNcbmNvbnN0IGZvcm1hdEN1cnJlbmN5ID0gKHZhbHVlKSA9PiB7XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoXCJlbi1VU1wiLCB7XG4gICAgc3R5bGU6IFwiY3VycmVuY3lcIixcbiAgICBjdXJyZW5jeTogXCJQSFBcIixcbiAgfSkuZm9ybWF0KHZhbHVlKTtcbn07XG5cbmNvbnN0IGVtcGxveWVlQWxsb3dhbmNlQ29sdW1ucyA9IFtcbiAge1xuICAgIG5hbWU6IFwiZGF0ZVwiLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGxhYmVsOiBcIkRhdGVcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogKHJvdykgPT4gZm9ybWF0RGF0ZShyb3cuY3JlYXRlZF9hdCksXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIm5hbWVcIixcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBsYWJlbDogXCJOYW1lXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IChyb3cpID0+IGZvcm1hdEZ1bGxuYW1lKHJvdy5lbXBsb3llZSksXG4gIH0sXG5cbiAge1xuICAgIG5hbWU6IFwiYW1vdW50XCIsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgbGFiZWw6IFwiQW1vdW50XCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IChyb3cpID0+IGZvcm1hdEN1cnJlbmN5KHJvdy5hbW91bnQpLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJhY3Rpb25zXCIsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgbGFiZWw6IFwiQWN0aW9uc1wiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiBcImFjdGlvbnNcIixcbiAgfSxcbl07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuLnEtYnRuIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XG59XG5cbi5xLWJ0bjpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtM3B4KTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xufVxuPC9zdHlsZT5cbiIsImltcG9ydCB7IGRlZmluZVN0b3JlIH0gZnJvbSBcInBpbmlhXCI7XG5pbXBvcnQgeyBhcGkgfSBmcm9tIFwic3JjL2Jvb3QvYXhpb3NcIjtcbmltcG9ydCB7IE5vdGlmeSB9IGZyb20gXCJxdWFzYXJcIjtcbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcblxuZXhwb3J0IGNvbnN0IHVzZUVtcGxveWVlQmVuZWZpdFN0b3JlID0gZGVmaW5lU3RvcmUoXCJiZW5lZml0c1wiLCAoKSA9PiB7XG4gIGNvbnN0IGJlbmVmaXQgPSByZWYobnVsbCk7XG4gIGNvbnN0IGJlbmVmaXRzID0gcmVmKFtdKTtcblxuICBjb25zdCBmZXRjaEVtcGxveWVlQmVuZWZpdCA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KFwiL2FwaS9lbXBsb3llZS1iZW5lZml0XCIpO1xuICAgICAgYmVuZWZpdHMudmFsdWUgPSByZXNwb25zZS5kYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yIGZldGNoaW5nIGJlbmVmaXRzXCIsIGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2VhcmNoQmVuZWZpdCA9IGFzeW5jIChrZXl3b3JkKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoaW5nIGZvciBlbXBsb3llZSB3aXRoIGtleXdvcmQ6XCIsIGtleXdvcmQpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucG9zdChgL2FwaS9zZWFyY2gtYmVuZWZpdD9rZXl3b3JkPSR7a2V5d29yZH1gKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiQWxsb3dhbmNlIHJlc3BvbnNlOlwiLCByZXNwb25zZS5kYXRhKTtcbiAgICAgIGJlbmVmaXRzLnZhbHVlID0gcmVzcG9uc2UuZGF0YTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkJlbmVmaXRzIGVycm9yXCIsIGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlRW1wbG95ZWVCZW5lZml0ID0gYXN5bmMgKGRhdGEpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucG9zdChcIi9hcGkvZW1wbG95ZWUtYmVuZWZpdFwiLCBkYXRhKTtcbiAgICAgIGJlbmVmaXRzLnZhbHVlLnVuc2hpZnQocmVzcG9uc2UuZGF0YSk7XG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgICAgICAvLyBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICAgICAgbWVzc2FnZTogXCJFbXBsb3llZSBkZWR1Y3Rpb25zIHN1Y2Nlc3NmdWxseSBjcmVhdGVkXCIsXG4gICAgICAgIHNldFRpbWVvdXQ6IDEwMDAsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuXG4gICAgICBsZXQgZXJyb3JNZXNzYWdlID0gXCJBbiBlcnJvciBvY2N1cnJlZC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIjtcbiAgICAgIGlmIChlcnJvci5yZXNwb25zZSAmJiBlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwOSkge1xuICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIkFsbG93YW5jZSBmb3IgdGhpcyBlbXBsb3llZSBhbHJlYWR5IGV4aXN0cy5cIjtcbiAgICAgIH0gZWxzZSBpZiAoZXJyb3IucmVzcG9uc2UgJiYgZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MjIpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJJbnZhbGlkIGRhdGEuIFBsZWFzZSBjaGVjayB0aGUgaW5wdXRzLlwiO1xuICAgICAgfVxuXG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgICBtZXNzYWdlOiBlcnJvck1lc3NhZ2UsXG4gICAgICAgIC8vIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgICB0aW1lb3V0OiA1MDAwLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYmVuZWZpdCxcbiAgICBiZW5lZml0cyxcbiAgICBmZXRjaEVtcGxveWVlQmVuZWZpdCxcbiAgICBjcmVhdGVFbXBsb3llZUJlbmVmaXQsXG4gICAgc2VhcmNoQmVuZWZpdCxcbiAgfTtcbn0pO1xuIiwiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxxLWJ0blxuICAgICAgcGFkZGluZz1cInNtIG1kXCJcbiAgICAgIGxhYmVsPVwiQWRkIEJlbmVmaXRzXCJcbiAgICAgIGljb249XCJhZGRfY2lyY2xlXCJcbiAgICAgIHNpemU9XCJtZFwiXG4gICAgICBjbGFzcz1cImdyYWRpZW50LWJ0biB0ZXh0LXdoaXRlXCJcbiAgICAgIEBjbGljaz1cIm9wZW5EaWFsb2dcIlxuICAgIC8+XG5cbiAgICA8cS1kaWFsb2dcbiAgICAgIHYtbW9kZWw9XCJkaWFsb2dcIlxuICAgICAgcGVyc2lzdGVudFxuICAgICAgcG9zaXRpb249XCJyaWdodFwiXG4gICAgICBiYWNrZHJvcC1maWx0ZXI9XCJibHVyKDRweCkgc2F0dXJhdGUoMTUwJSlcIlxuICAgID5cbiAgICAgIDxxLWNhcmQgc3R5bGU9XCJ3aWR0aDogNDAwcHg7IG1heC13aWR0aDogODB2d1wiPlxuICAgICAgICA8cS1jYXJkLXNlY3Rpb25cbiAgICAgICAgICBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIgcS1weC1tZCBxLXB5LXNtIGdyYWRpZW50LWJ0biB0ZXh0LXdoaXRlXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg1IHEtbXItbWRcIj7wn5K8IEFkZCBFbXBsb3llZSBEZWR1Y3Rpb25zPC9kaXY+XG4gICAgICAgICAgPHEtc3BhY2UgLz5cbiAgICAgICAgICA8cS1idG4gaWNvbj1cImFycm93X2ZvcndhcmRfaW9zXCIgZmxhdCBkZW5zZSByb3VuZCB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgdi1tb2RlbD1cInNlYXJjaEtleXdvcmRcIlxuICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cInNlYXJjaFwiXG4gICAgICAgICAgICBsYWJlbD1cIlNlYXJjaCBFbXBsb3llZVwiXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgcm91bmRlZFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIGRlYm91bmNlPVwiNTAwXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgbmFtZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgIDxxLWljb24gdi1pZj1cIiFzZWFyY2hMb2FkaW5nXCIgbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICAgICAgICAgIDxxLXNwaW5uZXIgdi1lbHNlIGNvbG9yPVwiZ3JleVwiIHNpemU9XCJzbVwiIC8+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPGRpdiB2LWlmPVwic2VhcmNoS2V5d29yZFwiIGNsYXNzPVwiY3VzdG9tLWxpc3Qgei10b3BcIj5cbiAgICAgICAgICAgICAgPHEtY2FyZD5cbiAgICAgICAgICAgICAgICA8cS1saXN0IHNlcGFyYXRvcj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0gdi1pZj1cIiFlbXBsb3llZXM/Lmxlbmd0aFwiPlxuICAgICAgICAgICAgICAgICAgICBObyBlbXBsb3llZSByZWNvcmRcbiAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbVxuICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cImF1dG9GaWxsRW1wbG95ZWUoZW1wbG95ZWUpXCJcbiAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cImVtcGxveWVlIGluIGVtcGxveWVlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgOmtleT1cImVtcGxveWVlLmlkXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGlja2FibGVcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGAke2VtcGxveWVlLmZpcnN0bmFtZX0gJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbXBsb3llZS5taWRkbGVuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGVtcGxveWVlLm1pZGRsZW5hbWUuY2hhckF0KDApICsgXCIuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9ICR7ZW1wbG95ZWUubGFzdG5hbWV9YFxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9xLWxpc3Q+XG4gICAgICAgICAgICAgIDwvcS1jYXJkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci1tZCB0ZXh0LXN1YnRpdGxlMVwiPlxuICAgICAgICAgICAgPGRpdj5OYW1lOjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LW1lZGl1bVwiPlxuICAgICAgICAgICAgICB7e1xuICAgICAgICAgICAgICAgIGVtcGxveWVlRGVkdWN0aW9uLmVtcGxveWVlX25hbWVcbiAgICAgICAgICAgICAgICAgID8gZW1wbG95ZWVEZWR1Y3Rpb24uZW1wbG95ZWVfbmFtZVxuICAgICAgICAgICAgICAgICAgOiBcIi0tLS0tLS1cIlxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci1tZCB0ZXh0LXN1YnRpdGxlMVwiPlxuICAgICAgICAgICAgPGRpdj5Qb3NpdGlvbjo8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1tZWRpdW1cIj5cbiAgICAgICAgICAgICAge3tcbiAgICAgICAgICAgICAgICBlbXBsb3llZURlZHVjdGlvbi5lbXBsb3llZV9wb3NpdGlvblxuICAgICAgICAgICAgICAgICAgPyBlbXBsb3llZURlZHVjdGlvbi5lbXBsb3llZV9wb3NpdGlvblxuICAgICAgICAgICAgICAgICAgOiBcIi0tLS0tLS1cIlxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXIteS1tZFwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiZW1wbG95ZWVEZWR1Y3Rpb24uc3NzXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGxhYmVsPVwiU1NTIChTb2NpYWwgU2VjdXJpdHkgU3lzdGVtIClcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJlbXBsb3llZURlZHVjdGlvbi5oZG1mXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGxhYmVsPVwiSERNRiAoUGFnLUlCSUcgRnVuZClcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJlbXBsb3llZURlZHVjdGlvbi5waGljXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGxhYmVsPVwiUEhJQyAoUGhpbGlwcGluZSBIZWFsdGggSW5zdXJhbmNlIENvcnBvcmF0aW9uKVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtY2FyZC1hY3Rpb25zPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgc2l6ZT1cIm1kXCJcbiAgICAgICAgICAgIHBhZGRpbmc9XCJ4cyBtZFwiXG4gICAgICAgICAgICBsYWJlbD1cInNhdmVcIlxuICAgICAgICAgICAgaWNvbi1yaWdodD1cInNlbmRcIlxuICAgICAgICAgICAgY2xhc3M9XCJncmFkaWVudC1idG4gdGV4dC13aGl0ZVwiXG4gICAgICAgICAgICBAY2xpY2s9XCJzYXZlXCJcbiAgICAgICAgICAgIDpsb2FkaW5nPVwibG9hZGluZ1wiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICAgIDwvcS1jYXJkPlxuICAgIDwvcS1kaWFsb2c+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZUVtcGxveWVlQmVuZWZpdFN0b3JlIH0gZnJvbSBcInN0b3Jlcy9iZW5lZml0XCI7XG5pbXBvcnQgeyB1c2VFbXBsb3llZVN0b3JlIH0gZnJvbSBcInN0b3Jlcy9lbXBsb3llZVwiO1xuaW1wb3J0IHsgcmVmLCBjb21wdXRlZCwgcmVhY3RpdmUgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IGVtcGxveWVlU3RvcmUgPSB1c2VFbXBsb3llZVN0b3JlKCk7XG5jb25zdCBlbXBsb3llZXMgPSBjb21wdXRlZCgoKSA9PiBlbXBsb3llZVN0b3JlLmVtcGxveWVlcyk7XG5jb25zdCBlbXBsb3llZUJlbmVmaXRTdG9yZSA9IHVzZUVtcGxveWVlQmVuZWZpdFN0b3JlKCk7XG5jb25zdCBlbXBsb3llZUJlbmVmaXRSb3dzID0gY29tcHV0ZWQoKCkgPT4gZW1wbG95ZWVCZW5lZml0U3RvcmUuYmVuZWZpdHMpO1xuY29uc3Qgc2VhcmNoS2V5d29yZCA9IHJlZihcIlwiKTtcbmNvbnN0IGxvYWRpbmcgPSByZWYoZmFsc2UpO1xuY29uc3Qgc2VhcmNoTG9hZGluZyA9IHJlZihmYWxzZSk7XG5jb25zdCBkaWFsb2cgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBvcGVuRGlhbG9nID0gKCkgPT4ge1xuICBkaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcblxuY29uc3Qgc2VhcmNoID0gYXN5bmMgKCkgPT4ge1xuICBpZiAoc2VhcmNoS2V5d29yZC52YWx1ZS50cmltKCkpIHtcbiAgICBzZWFyY2hMb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgICBhd2FpdCBlbXBsb3llZVN0b3JlLnNlYXJjaEVtcGxveWVlKHNlYXJjaEtleXdvcmQudmFsdWUpO1xuICAgIHNlYXJjaExvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgYXV0b0ZpbGxFbXBsb3llZSA9IChlbXBsb3llZSkgPT4ge1xuICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIEVtcGxveWVlOlwiLCBlbXBsb3llZSk7XG4gIGVtcGxveWVlRGVkdWN0aW9uLmVtcGxveWVlX2lkID0gZW1wbG95ZWUuaWQ7XG4gIGVtcGxveWVlRGVkdWN0aW9uLmVtcGxveWVlX25hbWUgPSBgJHtlbXBsb3llZS5maXJzdG5hbWV9ICR7XG4gICAgZW1wbG95ZWUubWlkZGxlbmFtZSA/IGVtcGxveWVlLm1pZGRsZW5hbWUuY2hhckF0KDApICsgXCIuXCIgOiBcIlwiXG4gIH0gJHtlbXBsb3llZS5sYXN0bmFtZX0gYDtcbiAgZW1wbG95ZWVEZWR1Y3Rpb24uZW1wbG95ZWVfcG9zaXRpb24gPSBlbXBsb3llZS5wb3NpdGlvbjtcbiAgc2VhcmNoS2V5d29yZC52YWx1ZSA9IFwiXCI7XG4gIGNvbnNvbGUubG9nKFwiRmlsbGVkIERlc2lnbmF0aW9uIERhdGE6XCIsIGVtcGxveWVlRGVkdWN0aW9uKTtcbn07XG5cbmNvbnN0IGVtcGxveWVlRGVkdWN0aW9uID0gcmVhY3RpdmUoe1xuICBlbXBsb3llZV9pZDogXCJcIixcbiAgZW1wbG95ZWVfbmFtZTogXCJcIixcbiAgZW1wbG95ZWVfcG9zaXRpb246IFwiXCIsXG4gIHNzczogXCJcIixcbiAgaGRtZjogXCJcIixcbiAgcGhpYzogXCJcIixcbn0pO1xuXG5jb25zdCBjbGVhckVtcGxveWVlRGVkdWN0aW9uRm9ybSA9ICgpID0+IHtcbiAgKGVtcGxveWVlRGVkdWN0aW9uLmVtcGxveWVlX2lkID0gXCJcIiksXG4gICAgKGVtcGxveWVlRGVkdWN0aW9uLmVtcGxveWVlX25hbWUgPSBcIlwiKSxcbiAgICAoZW1wbG95ZWVEZWR1Y3Rpb24uZW1wbG95ZWVfcG9zaXRpb24gPSBcIlwiKSxcbiAgICAoZW1wbG95ZWVEZWR1Y3Rpb24uc3NzID0gXCJcIiksXG4gICAgKGVtcGxveWVlRGVkdWN0aW9uLmhkbWYgPSBcIlwiKSxcbiAgICAoZW1wbG95ZWVEZWR1Y3Rpb24ucGhpYyA9IFwiXCIpO1xufTtcblxuY29uc3Qgc2F2ZSA9IGFzeW5jICgpID0+IHtcbiAgY29uc29sZS5sb2coXCJkZWR1Y3Rpb25zczpcIiwgZW1wbG95ZWVEZWR1Y3Rpb24pO1xuICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgdHJ5IHtcbiAgICBjb25zdCBkZWR1Y3Rpb24gPSBhd2FpdCBlbXBsb3llZUJlbmVmaXRTdG9yZS5jcmVhdGVFbXBsb3llZUJlbmVmaXQoXG4gICAgICBlbXBsb3llZURlZHVjdGlvblxuICAgICk7XG4gICAgY29uc29sZS5sb2coXCJkZWR1Y3Rpb25cIiwgZGVkdWN0aW9uKTtcbiAgICBkaWFsb2cudmFsdWUgPSBmYWxzZTtcbiAgICBjbGVhckVtcGxveWVlRGVkdWN0aW9uRm9ybSgpO1xuICAgIGVtcGxveWVlQmVuZWZpdFJvd3MudmFsdWUgPVxuICAgICAgYXdhaXQgZW1wbG95ZWVCZW5lZml0U3RvcmUuZmV0Y2hFbXBsb3llZUJlbmVmaXQoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhcImVycm9yXCIsIGVycm9yKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIH1cbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPlxuLmdyYWRpZW50LWJ0biB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgIzUwMmEzMywgI2E2MjFhNik7XG4gIGJvcmRlcjogbm9uZTtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPHEtaW5wdXRcbiAgICAgIHYtbW9kZWw9XCJzZWFyY2hLZXl3b3JkXCJcbiAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJzZWFyY2hcIlxuICAgICAgb3V0bGluZWRcbiAgICAgIGRlbnNlXG4gICAgICBmbGF0XG4gICAgICBsYWJlbD1cIlNlYXJjaFwiXG4gICAgICBzdHlsZT1cIndpZHRoOiAzMDBweFwiXG4gICAgPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHEtaWNvbiB2LWlmPVwiIWxvYWRpbmdcIiBuYW1lPVwic2VhcmNoXCIgLz5cbiAgICAgICAgICA8cS1zcGlubmVyIHYtZWxzZSBjb2xvcj1cImdyZXlcIiBzaXplPVwic21cIiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9xLWlucHV0PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBjb21wdXRlZCwgcmVmIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgdXNlRW1wbG95ZWVCZW5lZml0U3RvcmUgfSBmcm9tIFwic3RvcmVzL2JlbmVmaXRcIjtcblxuY29uc3QgZW1wbG95ZWVCZW5lZml0U3RvcmUgPSB1c2VFbXBsb3llZUJlbmVmaXRTdG9yZSgpO1xuY29uc3Qgc2VhcmNoS2V5d29yZCA9IHJlZihcIlwiKTtcbmNvbnN0IGxvYWRpbmcgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBzZWFyY2ggPSBhc3luYyAoKSA9PiB7XG4gIGxvYWRpbmcudmFsdWUgPSB0cnVlO1xuICBhd2FpdCBlbXBsb3llZUJlbmVmaXRTdG9yZS5zZWFyY2hCZW5lZml0KHNlYXJjaEtleXdvcmQudmFsdWUpO1xuICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlbiBxLW1iLW1kXCIgYWxpZ249XCJyaWdodFwiPlxuICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXItbWRcIj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxBZGREZWR1Y3Rpb24gLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxTZWFyY2hCZW5lZml0IC8+XG4gIDwvZGl2PlxuICA8cS10YWJsZVxuICAgIGNsYXNzPVwic3RpY2t5LWhlYWRlclwiXG4gICAgOnJvd3M9XCJlbXBsb3llZUJlbmVmaXRSb3dzXCJcbiAgICA6Y29sdW1ucz1cImVtcGxveWVlQmVuZWZpdENvbHVtbnNcIlxuICAgIHJvdy1rZXk9XCJuYW1lXCJcbiAgICBoaWRlLWJvdHRvbVxuICAgIHYtbW9kZWw6cGFnaW5hdGlvbj1cInBhZ2luYXRpb25cIlxuICAvPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGNvbXB1dGVkLCBvbk1vdW50ZWQsIHJlZiB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCBBZGREZWR1Y3Rpb24gZnJvbSBcIi4vQWRkRGVkdWN0aW9uLnZ1ZVwiO1xuaW1wb3J0IHsgdXNlRW1wbG95ZWVCZW5lZml0U3RvcmUgfSBmcm9tIFwic3RvcmVzL2JlbmVmaXRcIjtcbmltcG9ydCBTZWFyY2hCZW5lZml0IGZyb20gXCIuL1NlYXJjaEJlbmVmaXQudnVlXCI7XG5cbmNvbnN0IGVtcGxveWVlQmVuZWZpdFN0b3JlID0gdXNlRW1wbG95ZWVCZW5lZml0U3RvcmUoKTtcbmNvbnN0IGVtcGxveWVlQmVuZWZpdFJvd3MgPSBjb21wdXRlZCgoKSA9PiBlbXBsb3llZUJlbmVmaXRTdG9yZS5iZW5lZml0cyk7XG5jb25zdCBwYWdpbmF0aW9uID0gcmVmKHtcbiAgcm93c1BlclBhZ2U6IDAsXG59KTtcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgYXdhaXQgcmVsb2FkVGFibGVEYXRhKCk7XG59KTtcblxuY29uc3QgcmVsb2FkVGFibGVEYXRhID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGVtcGxveWVlQmVuZWZpdFJvd3MudmFsdWUgPVxuICAgICAgYXdhaXQgZW1wbG95ZWVCZW5lZml0U3RvcmUuZmV0Y2hFbXBsb3llZUJlbmVmaXQoKTtcbiAgICBjb25zb2xlLmxvZyhcImJlbmVmaXRcIiwgZW1wbG95ZWVCZW5lZml0Um93cy52YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coXCJlcnJvciBmZXRjaGluZ1wiLCBlcnJvcik7XG4gIH1cbn07XG5cbmNvbnN0IGZvcm1hdEZ1bGxuYW1lID0gKHJvdykgPT4ge1xuICBjb25zdCBjYXBpdGFsaXplID0gKHN0cikgPT5cbiAgICBzdHIgPyBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSA6IFwiXCI7XG4gIGNvbnN0IGZpcnN0bmFtZSA9IHJvdy5maXJzdG5hbWUgPyBjYXBpdGFsaXplKHJvdy5maXJzdG5hbWUpIDogXCJObyBGaXJzdG5hbWVcIjtcbiAgY29uc3QgbWlkZGxlbmFtZSA9IHJvdy5taWRkbGVuYW1lXG4gICAgPyBjYXBpdGFsaXplKHJvdy5taWRkbGVuYW1lKS5jaGFyQXQoMCkgKyBcIi5cIlxuICAgIDogXCJcIjtcbiAgY29uc3QgbGFzdG5hbWUgPSByb3cubGFzdG5hbWUgPyBjYXBpdGFsaXplKHJvdy5sYXN0bmFtZSkgOiBcIk5vIExhc3RuYW1lXCI7XG5cbiAgcmV0dXJuIGAke2ZpcnN0bmFtZX0gJHttaWRkbGVuYW1lfSAke2xhc3RuYW1lfWAudHJpbSgpO1xufTtcblxuY29uc3QgZm9ybWF0RGF0ZSA9IChkYXRlVGltZSkgPT4ge1xuICBpZiAoIWRhdGVUaW1lKSByZXR1cm4gXCIgLSAtIFwiOyAvLyBSZXR1cm4gYSBwbGFjZWhvbGRlciBpZiB0aGUgdmFsdWUgaXMgbWlzc2luZ1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0ZVRpbWUpO1xuICBpZiAoaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSByZXR1cm4gXCIgLSAtIFwiO1xuXG4gIHJldHVybiBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLVVTXCIsIHtcbiAgICBtb250aDogXCJzaG9ydFwiLFxuICAgIGRheTogXCJudW1lcmljXCIsXG4gICAgeWVhcjogXCJudW1lcmljXCIsXG4gIH0pOyAvLyBGb3JtYXQgYXMgXCJPY3QuIDE0LCAyMDI0XCJcbn07XG5cbmNvbnN0IGZvcm1hdEN1cnJlbmN5ID0gKHZhbHVlKSA9PiB7XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoXCJlbi1VU1wiLCB7XG4gICAgc3R5bGU6IFwiY3VycmVuY3lcIixcbiAgICBjdXJyZW5jeTogXCJQSFBcIixcbiAgfSkuZm9ybWF0KHZhbHVlKTtcbn07XG5cbmNvbnN0IGVtcGxveWVlQmVuZWZpdENvbHVtbnMgPSBbXG4gIHtcbiAgICBuYW1lOiBcImRhdGVcIixcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBsYWJlbDogXCJEYXRlXCIsXG4gICAgYWxpZ246IFwibGVmdFwiLFxuICAgIGZpZWxkOiAocm93KSA9PiBmb3JtYXREYXRlKHJvdy5jcmVhdGVkX2F0KSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwibmFtZVwiLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGxhYmVsOiBcIk5hbWVcIixcbiAgICBhbGlnbjogXCJsZWZ0XCIsXG4gICAgZmllbGQ6IChyb3cpID0+IGZvcm1hdEZ1bGxuYW1lKHJvdy5lbXBsb3llZSksXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInNzc1wiLFxuICAgIGxhYmVsOiBcIlNvY2lhbCBTZWN1cml0eSBTeXN0ZW0gKFNTUylcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogKHJvdykgPT4gZm9ybWF0Q3VycmVuY3kocm93LnNzcyksXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImhkbWZcIixcbiAgICBsYWJlbDogXCJQYWctSUJJRyBGdW5kIChIRE1GKVwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiAocm93KSA9PiBmb3JtYXRDdXJyZW5jeShyb3cuaGRtZiksXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInBoaWNcIixcbiAgICBsYWJlbDogXCJQaGlsIC0gSGVhbHRoIChQSElDKVwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiAocm93KSA9PiBmb3JtYXRDdXJyZW5jeShyb3cucGhpYyksXG4gIH0sXG5dO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5jdXN0b20tdGFibGUge1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMzMztcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG48L3N0eWxlPlxuIiwiaW1wb3J0IHsgZGVmaW5lU3RvcmUgfSBmcm9tIFwicGluaWFcIjtcbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IE5vdGlmeSB9IGZyb20gXCJxdWFzYXJcIjtcbmltcG9ydCB7IGFwaSB9IGZyb20gXCJzcmMvYm9vdC9heGlvc1wiO1xuXG5leHBvcnQgY29uc3QgdXNlVW5pZm9ybVN0b3JlID0gZGVmaW5lU3RvcmUoXCJ1bmlmb3JtXCIsICgpID0+IHtcbiAgY29uc3QgdW5pZm9ybSA9IHJlZihudWxsKTtcbiAgY29uc3QgdW5pZm9ybXMgPSByZWYoW10pO1xuXG4gIGNvbnN0IGZldGNoVW5pZm9ybSA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KFwiL2FwaS91bmlmb3JtXCIpO1xuICAgICAgdW5pZm9ybXMudmFsdWUgPSByZXNwb25zZS5kYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yIGZldGNoaW5nIHVuaWZvcm1cIiwgZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzZWFyY2hVbmlmb3JtID0gYXN5bmMgKGtleXdvcmQpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc29sZS5sb2coXCJTZWFyY2hpbmcgd2l0aCBrZXl3b3JkOlwiLCBrZXl3b3JkKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnBvc3QoYC9hcGkvc2VhcmNoLXVuaWZvcm0/a2V5d29yZD0ke2tleXdvcmR9YCk7XG4gICAgICBjb25zb2xlLmxvZyhcIlVOSUZPUm0gcmVzcG9uc2U6XCIsIHJlc3BvbnNlKTtcbiAgICAgIHVuaWZvcm1zLnZhbHVlID0gcmVzcG9uc2UuZGF0YTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNlYXJjaGluZyBlbXBsb3llZTpcIiwgZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjcmVhdGVVbmlmb3JtcyA9IGFzeW5jIChkYXRhKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnBvc3QoXCIvYXBpL3VuaWZvcm1cIiwgZGF0YSk7XG4gICAgICB1bmlmb3Jtcy52YWx1ZS51bnNoaWZ0KHJlc3BvbnNlLmRhdGEpO1xuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcbiAgICAgICAgbWVzc2FnZTogXCJBbGxvd2FuY2Ugc3VjY2Vzc2Z1bGx5IGNyZWF0ZWRcIixcbiAgICAgICAgLy8gcG9zaXRpb246IFwidG9wXCIsXG4gICAgICAgIHRpbWVvdXQ6IDEwMDAsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgbGV0IGVycm9yTWVzc2FnZSA9IFwiQW4gZXJyb3Igb2NjdXJyZWQuIFBsZWFzZSB0cnkgYWdhaW4uXCI7XG4gICAgICBpZiAoZXJyb3IucmVzcG9uc2UgJiYgZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MDkpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJBbGxvd2FuY2UgZm9yIHRoaXMgZW1wbG95ZWUgYWxyZWFkeSBleGlzdHMuXCI7XG4gICAgICB9IGVsc2UgaWYgKGVycm9yLnJlc3BvbnNlICYmIGVycm9yLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDIyKSB7XG4gICAgICAgIGVycm9yTWVzc2FnZSA9IFwiSW52YWxpZCBkYXRhLiBQbGVhc2UgY2hlY2sgdGhlIGlucHV0cy5cIjtcbiAgICAgIH1cblxuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIHR5cGU6IFwibmVnYXRpdmVcIixcbiAgICAgICAgbWVzc2FnZTogZXJyb3JNZXNzYWdlLFxuICAgICAgICAvLyBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICAgICAgdGltZW91dDogMTAwMCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHVuaWZvcm0sXG4gICAgdW5pZm9ybXMsXG4gICAgZmV0Y2hVbmlmb3JtLFxuICAgIGNyZWF0ZVVuaWZvcm1zLFxuICAgIHNlYXJjaFVuaWZvcm0sXG4gIH07XG59KTtcbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8cS1idG5cbiAgICAgIHBhZGRpbmc9XCJzbSBtZFwiXG4gICAgICBsYWJlbD1cIkFkZCBVbmlmb3JtXCJcbiAgICAgIGljb249XCJhZGRfY2lyY2xlXCJcbiAgICAgIHNpemU9XCJtZFwiXG4gICAgICBjbGFzcz1cImdyYWRpZW50LWJ0biB0ZXh0LXdoaXRlXCJcbiAgICAgIEBjbGljaz1cIm9wZW5EaWFsb2dcIlxuICAgIC8+XG4gICAgPHEtZGlhbG9nXG4gICAgICB2LW1vZGVsPVwiZGlhbG9nXCJcbiAgICAgIHBlcnNpc3RlbnRcbiAgICAgIHBvc2l0aW9uPVwicmlnaHRcIlxuICAgICAgYmFja2Ryb3AtZmlsdGVyPVwiYmx1cig0cHgpIHNhdHVyYXRlKDE1MCUpXCJcbiAgICA+XG4gICAgICA8cS1jYXJkIHN0eWxlPVwid2lkdGg6IDYwMHB4OyBtYXgtd2lkdGg6IDgwdndcIj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uXG4gICAgICAgICAgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtcHgtbWQgcS1weS1zbSBncmFkaWVudC1idG4gdGV4dC13aGl0ZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNSBxLW1yLW1kXCI+8J+RlCBBZGQgVW5pZm9ybTwvZGl2PlxuICAgICAgICAgIDxxLXNwYWNlIC8+XG4gICAgICAgICAgPHEtYnRuIGljb249XCJhcnJvd19mb3J3YXJkX2lvc1wiIGZsYXQgZGVuc2Ugcm91bmQgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJzZWFyY2hLZXl3b3JkXCJcbiAgICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJzZWFyY2hcIlxuICAgICAgICAgICAgbGFiZWw9XCJTZWFyY2ggRW1wbG95ZWVcIlxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIHJvdW5kZWRcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBkZWJvdW5jZT1cIjUwMFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIG5hbWVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICAgICAgICA8cS1pY29uIHYtaWY9XCIhc2VhcmNoTG9hZGluZ1wiIG5hbWU9XCJzZWFyY2hcIiAvPlxuICAgICAgICAgICAgICA8cS1zcGlubmVyIHYtZWxzZSBjb2xvcj1cImdyZXlcIiBzaXplPVwic21cIiAvPlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDxkaXYgdi1pZj1cInNlYXJjaEtleXdvcmRcIiBjbGFzcz1cImN1c3RvbS1saXN0IHotdG9wXCI+XG4gICAgICAgICAgICAgIDxxLWNhcmQ+XG4gICAgICAgICAgICAgICAgPHEtbGlzdCBzZXBhcmF0b3I+XG4gICAgICAgICAgICAgICAgICA8cS1pdGVtIHYtaWY9XCIhZW1wbG95ZWVzPy5sZW5ndGhcIj5cbiAgICAgICAgICAgICAgICAgICAgTm8gZW1wbG95ZWUgcmVjb3JkXG4gICAgICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJhdXRvRmlsbEVtcGxveWVlKGVtcGxveWVlKVwiXG4gICAgICAgICAgICAgICAgICAgICAgdi1mb3I9XCJlbXBsb3llZSBpbiBlbXBsb3llZXNcIlxuICAgICAgICAgICAgICAgICAgICAgIDprZXk9XCJlbXBsb3llZS5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xpY2thYmxlXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICB7e1xuICAgICAgICAgICAgICAgICAgICAgICAgICBgJHtlbXBsb3llZS5maXJzdG5hbWV9ICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1wbG95ZWUubWlkZGxlbmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBlbXBsb3llZS5taWRkbGVuYW1lLmNoYXJBdCgwKSArIFwiLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSAke2VtcGxveWVlLmxhc3RuYW1lfWBcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICAgICAgICA8L3EtY2FyZD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXItbWQgdGV4dC1zdWJ0aXRsZTFcIj5cbiAgICAgICAgICAgIDxkaXY+TmFtZTo8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1tZWRpdW1cIj5cbiAgICAgICAgICAgICAge3sgdW5pZm9ybS5lbXBsb3llZV9uYW1lID8gdW5pZm9ybS5lbXBsb3llZV9uYW1lIDogXCItLS0tLS0tXCIgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXItbWQgdGV4dC1zdWJ0aXRsZTFcIj5cbiAgICAgICAgICAgIDxkaXY+UG9zaXRpb246PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC13ZWlnaHQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgIHt7XG4gICAgICAgICAgICAgICAgdW5pZm9ybS5lbXBsb3llZV9wb3NpdGlvblxuICAgICAgICAgICAgICAgICAgPyB1bmlmb3JtLmVtcGxveWVlX3Bvc2l0aW9uXG4gICAgICAgICAgICAgICAgICA6IFwiLS0tLS0tLVwiXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNlwiPlxuICAgICAgICAgICAgICA8cS1jaGVja2JveFxuICAgICAgICAgICAgICAgIGtlZXAtY29sb3JcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwidFNoaXJ0XCJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIlQtU2hpcnRcIlxuICAgICAgICAgICAgICAgIGNvbG9yPVwicmVkXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXNtIHEtcGEtbWRcIiB2LWlmPVwidFNoaXJ0XCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxxLXJhZGlvXG4gICAgICAgICAgICAgICAgICAgIGtlZXAtY29sb3JcbiAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInVuaWZvcm0udFNoaXJ0c2l6ZVwiXG4gICAgICAgICAgICAgICAgICAgIHZhbD1cIjE4XCJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCIxOFwiXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPVwidGVhbFwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPHEtcmFkaW9cbiAgICAgICAgICAgICAgICAgICAga2VlcC1jb2xvclxuICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwidW5pZm9ybS50U2hpcnRzaXplXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsPVwiU1wiXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiU1wiXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPVwib3JhbmdlXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8cS1yYWRpb1xuICAgICAgICAgICAgICAgICAgICBrZWVwLWNvbG9yXG4gICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJ1bmlmb3JtLnRTaGlydHNpemVcIlxuICAgICAgICAgICAgICAgICAgICB2YWw9XCJNXCJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9XCJNXCJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJyZWRcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxxLXJhZGlvXG4gICAgICAgICAgICAgICAgICAgIGtlZXAtY29sb3JcbiAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInVuaWZvcm0udFNoaXJ0c2l6ZVwiXG4gICAgICAgICAgICAgICAgICAgIHZhbD1cIkxcIlxuICAgICAgICAgICAgICAgICAgICBsYWJlbD1cIkxcIlxuICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImN5YW5cIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLXgtc21cIiB2LWlmPVwidW5pZm9ybS50U2hpcnRzaXplXCI+XG4gICAgICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwidW5pZm9ybS50U2hpcnRQY3NcIlxuICAgICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgICAgICBsYWJlbD1cInBjc1wiXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEwMHB4XCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwidW5pZm9ybS50U2hpcnRQcmljZVwiXG4gICAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPVwicHJpY2VcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMDBweFwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC02XCI+XG4gICAgICAgICAgICAgIDxxLWNoZWNrYm94XG4gICAgICAgICAgICAgICAga2VlcC1jb2xvclxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJwYW50c1wiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJQYW50c1wiXG4gICAgICAgICAgICAgICAgY29sb3I9XCJicm93bi02XCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXNtIHEtcGEtbWRcIiB2LWlmPVwicGFudHNcIj5cbiAgICAgICAgICAgICAgICA8cS1yYWRpb1xuICAgICAgICAgICAgICAgICAga2VlcC1jb2xvclxuICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInVuaWZvcm0ucGFudHNTaXplXCJcbiAgICAgICAgICAgICAgICAgIHZhbD1cIk1cIlxuICAgICAgICAgICAgICAgICAgbGFiZWw9XCJNXCJcbiAgICAgICAgICAgICAgICAgIGNvbG9yPVwicmVkXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxxLXJhZGlvXG4gICAgICAgICAgICAgICAgICBrZWVwLWNvbG9yXG4gICAgICAgICAgICAgICAgICB2LW1vZGVsPVwidW5pZm9ybS5wYW50c1NpemVcIlxuICAgICAgICAgICAgICAgICAgdmFsPVwiTFwiXG4gICAgICAgICAgICAgICAgICBsYWJlbD1cIkxcIlxuICAgICAgICAgICAgICAgICAgY29sb3I9XCJjeWFuXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxxLXJhZGlvXG4gICAgICAgICAgICAgICAgICBrZWVwLWNvbG9yXG4gICAgICAgICAgICAgICAgICB2LW1vZGVsPVwidW5pZm9ybS5wYW50c1NpemVcIlxuICAgICAgICAgICAgICAgICAgdmFsPVwiWExcIlxuICAgICAgICAgICAgICAgICAgbGFiZWw9XCJYTFwiXG4gICAgICAgICAgICAgICAgICBjb2xvcj1cInB1cnBsZS02XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxxLXJhZGlvXG4gICAgICAgICAgICAgICAgICBrZWVwLWNvbG9yXG4gICAgICAgICAgICAgICAgICB2LW1vZGVsPVwidW5pZm9ybS5wYW50c1NpemVcIlxuICAgICAgICAgICAgICAgICAgdmFsPVwiWFhMXCJcbiAgICAgICAgICAgICAgICAgIGxhYmVsPVwiWFhMXCJcbiAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZGVlcC1vcmFuZ2UtMTNcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci14LXNtXCIgdi1pZj1cInVuaWZvcm0ucGFudHNTaXplXCI+XG4gICAgICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgICAgICB2LW1vZGVsPVwidW5pZm9ybS5wYW50c1Bjc1wiXG4gICAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPVwicGNzXCJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTAwcHhcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJ1bmlmb3JtLnBhbnRzUHJpY2VcIlxuICAgICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgICAgICBsYWJlbD1cInByaWNlXCJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTAwcHhcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuIHEtZ3V0dGVyLXNtXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1sZyB0ZXh0LXN1YnRpdGxlMVwiPk51bWJlciBvZiBQYXltZW50czwvZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwidW5pZm9ybS5udW1iZXJPZlBheW1lbnRzXCIgb3V0bGluZWQgZmxhdCBkZW5zZSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1sZyB0ZXh0LXN1YnRpdGxlMVwiPlRvdGFsIEFtb3VudDwvZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dCB2LW1vZGVsPVwidG90YWxBbW91bnRcIiBvdXRsaW5lZCByZWFkb25seSBmbGF0IGRlbnNlIC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LWxnIHRleHQtc3VidGl0bGUxXCI+UGF5bWVudHMgUGVyIFBheXJvbGw8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwicGF5bWVudFBlclBheXJvbGxcIlxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXItc21cIj48L2Rpdj5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtY2FyZC1hY3Rpb25zPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgc2l6ZT1cIm1kXCJcbiAgICAgICAgICAgIHBhZGRpbmc9XCJ4cyBtZFwiXG4gICAgICAgICAgICBsYWJlbD1cInNhdmVcIlxuICAgICAgICAgICAgaWNvbi1yaWdodD1cInNlbmRcIlxuICAgICAgICAgICAgY2xhc3M9XCJncmFkaWVudC1idG4gdGV4dC13aGl0ZVwiXG4gICAgICAgICAgICBAY2xpY2s9XCJzYXZlXCJcbiAgICAgICAgICAgIDpsb2FkaW5nPVwibG9hZGluZ1wiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICAgIDwvcS1jYXJkPlxuICAgIDwvcS1kaWFsb2c+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IE5vdGlmeSB9IGZyb20gXCJxdWFzYXJcIjtcbmltcG9ydCB7IHVzZUVtcGxveWVlU3RvcmUgfSBmcm9tIFwic3RvcmVzL2VtcGxveWVlXCI7XG5pbXBvcnQgeyB1c2VVbmlmb3JtU3RvcmUgfSBmcm9tIFwic3RvcmVzL3VuaWZvcm1cIjtcbmltcG9ydCB7IHJlYWN0aXZlLCByZWYsIHdhdGNoLCBjb21wdXRlZCB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgZW1wbG95ZWVTdG9yZSA9IHVzZUVtcGxveWVlU3RvcmUoKTtcbmNvbnN0IGVtcGxveWVlcyA9IGNvbXB1dGVkKCgpID0+IGVtcGxveWVlU3RvcmUuZW1wbG95ZWVzKTtcbmNvbnN0IHVuaWZvcm1TdG9yZSA9IHVzZVVuaWZvcm1TdG9yZSgpO1xuY29uc3QgdW5pZm9ybVJvd3MgPSBjb21wdXRlZCgoKSA9PiB1bmlmb3JtU3RvcmUudW5pZm9ybXMpO1xuY29uc3Qgc2VhcmNoS2V5d29yZCA9IHJlZihcIlwiKTtcbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5jb25zdCB0U2hpcnQgPSByZWYoZmFsc2UpO1xuY29uc3QgcGFudHMgPSByZWYoZmFsc2UpO1xuY29uc3QgdG90YWxBbW91bnQgPSByZWYoMCk7XG5jb25zdCBwYXltZW50UGVyUGF5cm9sbCA9IHJlZigwKTtcbmNvbnN0IGxvYWRpbmcgPSByZWYoZmFsc2UpO1xuY29uc3Qgc2VhcmNoTG9hZGluZyA9IHJlZihmYWxzZSk7XG5jb25zdCBvcGVuRGlhbG9nID0gKCkgPT4ge1xuICBkaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcblxuY29uc3Qgc2VhcmNoID0gYXN5bmMgKCkgPT4ge1xuICBpZiAoc2VhcmNoS2V5d29yZC52YWx1ZS50cmltKCkpIHtcbiAgICBzZWFyY2hMb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgICBhd2FpdCBlbXBsb3llZVN0b3JlLnNlYXJjaEVtcGxveWVlKHNlYXJjaEtleXdvcmQudmFsdWUpO1xuICAgIHNlYXJjaExvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgYXV0b0ZpbGxFbXBsb3llZSA9IChlbXBsb3llZSkgPT4ge1xuICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIEVtcGxveWVlOlwiLCBlbXBsb3llZSk7XG4gIHVuaWZvcm0uZW1wbG95ZWVfaWQgPSBlbXBsb3llZS5pZDtcbiAgdW5pZm9ybS5lbXBsb3llZV9uYW1lID0gYCR7ZW1wbG95ZWUuZmlyc3RuYW1lfSAke1xuICAgIGVtcGxveWVlLm1pZGRsZW5hbWUgPyBlbXBsb3llZS5taWRkbGVuYW1lLmNoYXJBdCgwKSArIFwiLlwiIDogXCJcIlxuICB9ICR7ZW1wbG95ZWUubGFzdG5hbWV9IGA7XG4gIHVuaWZvcm0uZW1wbG95ZWVfcG9zaXRpb24gPSBlbXBsb3llZS5wb3NpdGlvbjtcbiAgc2VhcmNoS2V5d29yZC52YWx1ZSA9IFwiXCI7XG4gIGNvbnNvbGUubG9nKFwiRmlsbGVkIERlc2lnbmF0aW9uIERhdGE6XCIsIHVuaWZvcm0pO1xufTtcblxuY29uc3QgdW5pZm9ybSA9IHJlYWN0aXZlKHtcbiAgZW1wbG95ZWVfaWQ6IFwiXCIsXG4gIGVtcGxveWVlX25hbWU6IFwiXCIsXG4gIGVtcGxveWVlX3Bvc2l0aW9uOiBcIlwiLFxuICB0U2hpcnRzaXplOiBcIlwiLFxuICBwYW50c1NpemU6IFwiXCIsXG4gIHRTaGlydFBjczogMCxcbiAgdFNoaXJ0UHJpY2U6IDAsXG4gIHBhbnRzUGNzOiAwLFxuICBwYW50c1ByaWNlOiAwLFxuICBudW1iZXJPZlBheW1lbnRzOiAxLFxufSk7XG5cbmNvbnN0IGNsZWFyVW5pZm9ybSA9ICgpID0+IHtcbiAgKHVuaWZvcm0uZW1wbG95ZWVfaWQgPSBcIlwiKSxcbiAgICAodW5pZm9ybS5lbXBsb3llZV9uYW1lID0gXCJcIiksXG4gICAgKHVuaWZvcm0uZW1wbG95ZWVfcG9zaXRpb24gPSBcIlwiKSxcbiAgICAodFNoaXJ0LnZhbHVlID0gZmFsc2UpLFxuICAgIChwYW50cy52YWx1ZSA9IGZhbHNlKSxcbiAgICAodG90YWxBbW91bnQudmFsdWUgPSAwKSxcbiAgICAocGF5bWVudFBlclBheXJvbGwudmFsdWUgPSAwKSxcbiAgICBjbGVhclBhbnRzKCksXG4gICAgY2xlYXJUc2hpcnQoKTtcbn07XG5cbmNvbnN0IGNsZWFyVHNoaXJ0ID0gKCkgPT4ge1xuICAodW5pZm9ybS50U2hpcnRQY3MgPSBcIlwiKSxcbiAgICAodW5pZm9ybS50U2hpcnRzaXplID0gXCJcIiksXG4gICAgKHVuaWZvcm0udFNoaXJ0UHJpY2UgPSBcIlwiKTtcbn07XG5cbmNvbnN0IGNsZWFyUGFudHMgPSAoKSA9PiB7XG4gICh1bmlmb3JtLnBhbnRzU2l6ZSA9IFwiXCIpLCAodW5pZm9ybS5wYW50c1BjcyA9IFwiXCIpLCAodW5pZm9ybS5wYW50c1ByaWNlID0gXCJcIik7XG59O1xuXG53YXRjaChwYW50cywgKG5ld1ZhbHVlKSA9PiB7XG4gIGlmICghbmV3VmFsdWUpIHtcbiAgICBjbGVhclBhbnRzKCk7XG4gIH1cbn0pO1xuXG53YXRjaCh0U2hpcnQsIChuZXdWYWx1ZSkgPT4ge1xuICBpZiAoIW5ld1ZhbHVlKSB7XG4gICAgY2xlYXJUc2hpcnQoKTtcbiAgfVxufSk7XG4vLyBXYXRjaCBmb3IgY2hhbmdlcyBpbiB1bmlmb3JtIGRhdGEgYW5kIGNhbGN1bGF0ZSB0b3RhbEFtb3VudFxud2F0Y2goXG4gIFtcbiAgICAoKSA9PiB1bmlmb3JtLnRTaGlydFByaWNlLFxuICAgICgpID0+IHVuaWZvcm0udFNoaXJ0UGNzLFxuICAgICgpID0+IHVuaWZvcm0ucGFudHNQcmljZSxcbiAgICAoKSA9PiB1bmlmb3JtLnBhbnRzUGNzLFxuICBdLFxuICAoKSA9PiB7XG4gICAgdG90YWxBbW91bnQudmFsdWUgPVxuICAgICAgdW5pZm9ybS50U2hpcnRQcmljZSAqIHVuaWZvcm0udFNoaXJ0UGNzICtcbiAgICAgIHVuaWZvcm0ucGFudHNQcmljZSAqIHVuaWZvcm0ucGFudHNQY3M7XG4gIH0sXG4gIHsgaW1tZWRpYXRlOiB0cnVlIH0gLy8gVGhpcyB3aWxsIGNhbGN1bGF0ZSB0aGUgdG90YWwgb24gbG9hZFxuKTtcblxuLy8gV2F0Y2ggZm9yIGNoYW5nZXMgaW4gdG90YWxBbW91bnQgb3IgbnVtYmVyT2ZQYXltZW50cyB0byBjYWxjdWxhdGUgcGF5bWVudFBlclBheXJvbGxcbndhdGNoKFxuICBbdG90YWxBbW91bnQsICgpID0+IHVuaWZvcm0ubnVtYmVyT2ZQYXltZW50c10sXG4gICgpID0+IHtcbiAgICBwYXltZW50UGVyUGF5cm9sbC52YWx1ZSA9IE1hdGgucm91bmQoXG4gICAgICB0b3RhbEFtb3VudC52YWx1ZSAvICh1bmlmb3JtLm51bWJlck9mUGF5bWVudHMgfHwgMSlcbiAgICApOyAvLyBSb3VuZCB0byBuZWFyZXN0IGludGVnZXJcbiAgfSxcbiAgeyBpbW1lZGlhdGU6IHRydWUgfVxuKTtcblxuY29uc3Qgc2F2ZSA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICBlbXBsb3llZV9pZDogdW5pZm9ybS5lbXBsb3llZV9pZCxcbiAgICBlbXBsb3llZV9uYW1lOiB1bmlmb3JtLmVtcGxveWVlX25hbWUsXG4gICAgZW1wbG95ZWVfcG9zaXRpb246IHVuaWZvcm0uZW1wbG95ZWVfcG9zaXRpb24sXG4gICAgdFNoaXJ0c2l6ZTogdW5pZm9ybS50U2hpcnRzaXplLFxuICAgIHBhbnRzU2l6ZTogdW5pZm9ybS5wYW50c1NpemUsXG4gICAgdFNoaXJ0UGNzOiB1bmlmb3JtLnRTaGlydFBjcyxcbiAgICB0U2hpcnRQcmljZTogdW5pZm9ybS50U2hpcnRQcmljZSxcbiAgICBwYW50c1BjczogdW5pZm9ybS5wYW50c1BjcyxcbiAgICBwYW50c1ByaWNlOiB1bmlmb3JtLnBhbnRzUHJpY2UsXG4gICAgdG90YWxBbW91bnQ6IHRvdGFsQW1vdW50LnZhbHVlLFxuICAgIHBheW1lbnRQZXJQYXlyb2xsOiBwYXltZW50UGVyUGF5cm9sbC52YWx1ZSxcbiAgICBudW1iZXJPZlBheW1lbnRzOiB1bmlmb3JtLm51bWJlck9mUGF5bWVudHMsXG4gIH07XG4gIGNvbnNvbGUubG9nKFwicGF5bG9hZFwiLCBwYXlsb2FkKTtcbiAgdHJ5IHtcbiAgICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgICBhd2FpdCB1bmlmb3JtU3RvcmUuY3JlYXRlVW5pZm9ybXMocGF5bG9hZCk7XG4gICAgZGlhbG9nLnZhbHVlID0gZmFsc2U7XG4gICAgY2xlYXJVbmlmb3JtKCk7XG4gICAgdW5pZm9ybVJvd3MudmFsdWUgPSBhd2FpdCB1bmlmb3JtU3RvcmUuZmV0Y2hVbmlmb3JtKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgbWVzc2FnZTogXCJlcnJvclwiLFxuICAgIH0pO1xuICB9IGZpbmFsbHkge1xuICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgfVxufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XG4uZ3JhZGllbnQtYnRuIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjNTAyYTMzLCAjYTYyMWE2KTtcbiAgYm9yZGVyOiBub25lO1xufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW4gcS1tYi1tZFwiIGFsaWduPVwicmlnaHRcIj5cbiAgICA8ZGl2IGNsYXNzPVwicm93IHEtZ3V0dGVyLW1kXCI+XG4gICAgICA8QWRkVW5pZm9ybSAvPlxuICAgIDwvZGl2PlxuICAgIDxxLWlucHV0XG4gICAgICB2LW1vZGVsPVwiZmlsdGVyXCJcbiAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJoYW5kbGVJbnB1dFwiXG4gICAgICBvdXRsaW5lZFxuICAgICAgZGVuc2VcbiAgICAgIGZsYXRcbiAgICAgIGxhYmVsPVwiU2VhcmNoXCJcbiAgICAgIHN0eWxlPVwid2lkdGg6IDMwMHB4XCJcbiAgICA+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cS1pY29uIHYtaWY9XCIhbG9hZGluZ1wiIG5hbWU9XCJzZWFyY2hcIiAvPlxuICAgICAgICAgIDxxLXNwaW5uZXIgdi1lbHNlIHNpemU9XCJzbVwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L3EtaW5wdXQ+XG4gIDwvZGl2PlxuICA8cS10YWJsZVxuICAgIGNsYXNzPVwic3RpY2t5LWhlYWRlclwiXG4gICAgOmZpbHRlcj1cImZpbHRlclwiXG4gICAgOnJvd3M9XCJ1bmlmb3JtUm93c1wiXG4gICAgOmNvbHVtbnM9XCJ1bmlmb3JtQ29sdW1uc1wiXG4gICAgcm93LWtleT1cIm5hbWVcIlxuICAgIHYtbW9kZWw6cGFnaW5hdGlvbj1cInBhZ2luYXRpb25cIlxuICAgIGhpZGUtYm90dG9tXG4gID5cbiAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC10X3NoaXJ0PVwicHJvcHNcIj5cbiAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgIDxxLXRvb2x0aXBcbiAgICAgICAgICA6b2Zmc2V0PVwiWzAsIDEwXVwiXG4gICAgICAgICAgOmRlbGF5PVwiNjAwXCJcbiAgICAgICAgICBjbGFzcz1cImJnLWluZm8gdGV4dC1kYXJrIHRleHQtc3VidGl0bGUxXCJcbiAgICAgICAgICBzdHlsZT1cIndpZHRoOiAyMDBweFwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cInEtcGItc20gdGV4dC1jZW50ZXIgdGV4dC1oNiB0ZXh0LXdlaWdodC1ib2xkIHRleHQtc3VidGl0bGUyXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBULVNoaXJ0XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHEtc2VwYXJhdG9yIGNsYXNzPVwicS1tYi1tZFwiIGNvbG9yPVwieWVsbG93XCIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiXCIgdi1mb3I9XCJ0U2hpcnQgaW4gcHJvcHMucm93LnRfc2hpcnRcIiA6a2V5PVwidFNoaXJ0LnNpemVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxkaXY+U2l6ZSA6PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAge3sgdFNoaXJ0LnNpemUgfX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxkaXY+UENTIDo8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7eyB0U2hpcnQucGNzIH19XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8ZGl2PlBSSUNFIDo8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7eyBmb3JtYXRDdXJyZW5jeSh0U2hpcnQucHJpY2UpIH19XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS10b29sdGlwPlxuICAgICAgICA8cS1jaGlwIHNxdWFyZSBvdXRsaW5lIGNvbG9yPVwicmVkLTZcIiBjbGFzcz1cInRleHQtd2hpdGVcIj5cbiAgICAgICAgICB7eyBwcm9wcy5yb3cudF9zaGlydC5sZW5ndGggfX0gVC1TaGlydFxuICAgICAgICA8L3EtY2hpcD5cbiAgICAgIDwvcS10ZD5cbiAgICA8L3RlbXBsYXRlPlxuICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLXBhbnRzPVwicHJvcHNcIj5cbiAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgIDxxLXRvb2x0aXBcbiAgICAgICAgICA6b2Zmc2V0PVwiWzAsIDEwXVwiXG4gICAgICAgICAgOmRlbGF5PVwiNjAwXCJcbiAgICAgICAgICBjbGFzcz1cImJnLWluZm8gdGV4dC1kYXJrIHRleHQtc3VidGl0bGUxXCJcbiAgICAgICAgICBzdHlsZT1cIndpZHRoOiAyMDBweFwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cInEtcGItc20gdGV4dC1jZW50ZXIgdGV4dC1oNiB0ZXh0LXdlaWdodC1ib2xkIHRleHQtc3VidGl0bGUyXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBQYW50c1xuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxxLXNlcGFyYXRvciBjbGFzcz1cInEtbWItbWRcIiBjb2xvcj1cInllbGxvd1wiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIlwiIHYtZm9yPVwicGFudCBpbiBwcm9wcy5yb3cucGFudHNcIiA6a2V5PVwicGFudC5zaXplXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8ZGl2PlNpemUgOjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHt7IHBhbnQuc2l6ZSB9fVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPGRpdj5QQ1MgOjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHt7IHBhbnQucGNzIH19XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8ZGl2PlBSSUNFIDo8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7eyBmb3JtYXRDdXJyZW5jeShwYW50LnByaWNlKSB9fVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtdG9vbHRpcD5cbiAgICAgICAgPHEtY2hpcCBzcXVhcmUgb3V0bGluZSBjb2xvcj1cImJyb3duLTZcIiBjbGFzcz1cInRleHQtd2hpdGVcIj5cbiAgICAgICAgICB7eyBwcm9wcy5yb3cucGFudHMubGVuZ3RoIH19IFBhbnRzXG4gICAgICAgIDwvcS1jaGlwPlxuICAgICAgPC9xLXRkPlxuICAgIDwvdGVtcGxhdGU+XG4gIDwvcS10YWJsZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYsIGNvbXB1dGVkLCBvbk1vdW50ZWQgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgQWRkVW5pZm9ybSBmcm9tIFwiLi9BZGRVbmlmb3JtLnZ1ZVwiO1xuaW1wb3J0IHsgdXNlVW5pZm9ybVN0b3JlIH0gZnJvbSBcInN0b3Jlcy91bmlmb3JtXCI7XG5cbmNvbnN0IHVuaWZvcm1TdG9yZSA9IHVzZVVuaWZvcm1TdG9yZSgpO1xuY29uc3QgZmlsdGVyID0gcmVmKFwiXCIpO1xuY29uc3QgdW5pZm9ybVJvd3MgPSBjb21wdXRlZCgoKSA9PiB1bmlmb3JtU3RvcmUudW5pZm9ybXMpO1xuY29uc3QgbG9hZGluZyA9IHJlZihmYWxzZSk7XG5jb25zdCBwYWdpbmF0aW9uID0gcmVmKHtcbiAgcm93c1BlclBhZ2U6IDAsXG59KTtcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgYXdhaXQgcmVsb2FkVGFibGVEYXRhKCk7XG59KTtcblxuY29uc3QgcmVsb2FkVGFibGVEYXRhID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIHVuaWZvcm1Sb3dzLnZhbHVlID0gYXdhaXQgdW5pZm9ybVN0b3JlLmZldGNoVW5pZm9ybSgpO1xuICAgIGNvbnNvbGUubG9nKFwidW5pZm9ybVwiLCB1bmlmb3JtUm93cy52YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coXCJlcnJvciBmZXRjaGluZyBtYWRlcGFrZWVyXCIsIGVycm9yKTtcbiAgfVxufTtcblxubGV0IGRlYm91bmNlVGltZW91dDtcbmNvbnN0IGhhbmRsZUlucHV0ID0gKCkgPT4ge1xuICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTsgLy8gU3RhcnQgbG9hZGluZyB3aGVuIHR5cGluZ1xuICBjbGVhclRpbWVvdXQoZGVib3VuY2VUaW1lb3V0KTsgLy8gQ2xlYXIgcHJldmlvdXMgdGltZW91dFxuICBkZWJvdW5jZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7IC8vIFN0b3AgbG9hZGluZyBhZnRlciBkZWJvdW5jZSBkZWxheVxuICB9LCA1MDApOyAvLyBBZGp1c3QgZGVib3VuY2UgZGVsYXkgYXMgbmVlZGVkXG59O1xuXG5jb25zdCBmb3JtYXRGdWxsbmFtZSA9IChyb3cpID0+IHtcbiAgY29uc3QgY2FwaXRhbGl6ZSA9IChzdHIpID0+XG4gICAgc3RyID8gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkgOiBcIlwiO1xuICBjb25zdCBmaXJzdG5hbWUgPSByb3cuZmlyc3RuYW1lID8gY2FwaXRhbGl6ZShyb3cuZmlyc3RuYW1lKSA6IFwiTm8gRmlyc3RuYW1lXCI7XG4gIGNvbnN0IG1pZGRsZW5hbWUgPSByb3cubWlkZGxlbmFtZVxuICAgID8gY2FwaXRhbGl6ZShyb3cubWlkZGxlbmFtZSkuY2hhckF0KDApICsgXCIuXCJcbiAgICA6IFwiXCI7XG4gIGNvbnN0IGxhc3RuYW1lID0gcm93Lmxhc3RuYW1lID8gY2FwaXRhbGl6ZShyb3cubGFzdG5hbWUpIDogXCJObyBMYXN0bmFtZVwiO1xuXG4gIHJldHVybiBgJHtmaXJzdG5hbWV9ICR7bWlkZGxlbmFtZX0gJHtsYXN0bmFtZX1gLnRyaW0oKTtcbn07XG5cbi8vIEZvcm1hdCBjdXJyZW5jeSB2YWx1ZXNcbmNvbnN0IGZvcm1hdEN1cnJlbmN5ID0gKHZhbHVlKSA9PiB7XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoXCJlbi1VU1wiLCB7XG4gICAgc3R5bGU6IFwiY3VycmVuY3lcIixcbiAgICBjdXJyZW5jeTogXCJQSFBcIixcbiAgfSkuZm9ybWF0KHZhbHVlKTtcbn07XG5cbmNvbnN0IGZvcm1hdERhdGUgPSAoZGF0ZVRpbWUpID0+IHtcbiAgaWYgKCFkYXRlVGltZSkgcmV0dXJuIFwiIC0gLSBcIjsgLy8gUmV0dXJuIGEgcGxhY2Vob2xkZXIgaWYgdGhlIHZhbHVlIGlzIG1pc3NpbmdcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGVUaW1lKTtcbiAgaWYgKGlzTmFOKGRhdGUuZ2V0VGltZSgpKSkgcmV0dXJuIFwiIC0gLSBcIjtcblxuICByZXR1cm4gZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1VU1wiLCB7XG4gICAgbW9udGg6IFwic2hvcnRcIixcbiAgICBkYXk6IFwibnVtZXJpY1wiLFxuICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICB9KTsgLy8gRm9ybWF0IGFzIFwiT2N0LiAxNCwgMjAyNFwiXG59O1xuXG5jb25zdCB1bmlmb3JtQ29sdW1ucyA9IFtcbiAge1xuICAgIG5hbWU6IFwiZGF0ZVwiLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGxhYmVsOiBcIkRhdGVcIixcbiAgICBhbGlnbjogXCJsZWZ0XCIsXG4gICAgZmllbGQ6IChyb3cpID0+IGZvcm1hdERhdGUocm93LmNyZWF0ZWRfYXQpLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJuYW1lXCIsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgbGFiZWw6IFwiTmFtZVwiLFxuICAgIGFsaWduOiBcImxlZnRcIixcbiAgICBmaWVsZDogKHJvdykgPT4gZm9ybWF0RnVsbG5hbWUocm93LmVtcGxveWVlKSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwibnVtYmVyX29mX3BheW1lbnRzXCIsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgbGFiZWw6IFwiTnVtYmVyIG9mIFBheW1lbnRzXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IFwibnVtYmVyX29mX3BheW1lbnRzXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInRvdGFsX2Ftb3VudFwiLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGxhYmVsOiBcIlRvdGFsIEFtb3VudFwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiAocm93KSA9PiBmb3JtYXRDdXJyZW5jeShyb3cudG90YWxfYW1vdW50KSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwicGF5bWVudHNfcGVyX3BheXJvbGxcIixcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBsYWJlbDogXCJQYXltZW50cyBQZXIgUGF5cm9sbFwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiAocm93KSA9PiBmb3JtYXRDdXJyZW5jeShyb3cucGF5bWVudHNfcGVyX3BheXJvbGwpLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJ0X3NoaXJ0XCIsXG4gICAgbGFiZWw6IFwiVC1TaGlydFwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiBcInRfc2hpcnRcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwicGFudHNcIixcbiAgICBsYWJlbDogXCJQYW50c1wiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiBcInBhbnRzXCIsXG4gIH0sXG5dO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD48L3N0eWxlPlxuIiwiaW1wb3J0IHsgZGVmaW5lU3RvcmUgfSBmcm9tIFwicGluaWFcIjtcbmltcG9ydCB7IE5vdGlmeSB9IGZyb20gXCJxdWFzYXJcIjtcbmltcG9ydCB7IGFwaSB9IGZyb20gXCJzcmMvYm9vdC9heGlvc1wiO1xuaW1wb3J0IHsgcmVmIH0gZnJvbSBcInZ1ZVwiO1xuXG5leHBvcnQgY29uc3QgdXNlQ2FzaEFkdmFuY2VTdG9yZSA9IGRlZmluZVN0b3JlKFwiY2FzaC1hZHZhbmNlXCIsICgpID0+IHtcbiAgY29uc3QgY2FzaEFkdmFuY2UgPSByZWYobnVsbCk7XG4gIGNvbnN0IGNhc2hBZHZhbmNlcyA9IHJlZihbXSk7XG5cbiAgY29uc3QgZmV0Y2hDYXNoQWR2YW5jZSA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KFwiL2FwaS9jYXNoLWFkdmFuY2VcIik7XG4gICAgICBjYXNoQWR2YW5jZXMudmFsdWUgPSByZXNwb25zZS5kYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzZWFyY2hDYXNoQWR2YW5jZSA9IGFzeW5jIChrZXl3b3JkKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoaW5nIGZvciBlbXBsb3llZSB3aXRoIGtleXdvcmQ6XCIsIGtleXdvcmQpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucG9zdChcbiAgICAgICAgYC9hcGkvc2VhcmNoLWNhc2gtYWR2YW5jZT9rZXl3b3JkPSR7a2V5d29yZH1gXG4gICAgICApO1xuICAgICAgY29uc29sZS5sb2coXCJDQSByZXNwb25zZTpcIiwgcmVzcG9uc2UpO1xuICAgICAgY2FzaEFkdmFuY2VzLnZhbHVlID0gcmVzcG9uc2UuZGF0YTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNlYXJjaGluZyBDQTpcIiwgZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjcmVhdGVDYXNoQWR2YW5jZSA9IGFzeW5jIChkYXRhKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnBvc3QoXCIvYXBpL2Nhc2gtYWR2YW5jZVwiLCBkYXRhKTtcbiAgICAgIGNhc2hBZHZhbmNlcy52YWx1ZS51bnNoaWZ0KHJlc3BvbnNlLmRhdGEpO1xuICAgICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcbiAgICAgICAgLy8gcG9zaXRpb246IFwidG9wXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiQ2FzaCBBZHZhbmNlIHNhdmVcIixcbiAgICAgICAgc2V0VGltZW91dDogMTAwMCxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkNBIGVycm9yXCIsIGVycm9yKTtcbiAgICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIC8vIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgICBtZXNzYWdlOiBcIkVycm9yIHNhdmluZyBDYXNoIEFkdmFuY2VcIixcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGNhc2hBZHZhbmNlLFxuICAgIGNhc2hBZHZhbmNlcyxcbiAgICBjcmVhdGVDYXNoQWR2YW5jZSxcbiAgICBmZXRjaENhc2hBZHZhbmNlLFxuICAgIHNlYXJjaENhc2hBZHZhbmNlLFxuICB9O1xufSk7XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPHEtYnRuXG4gICAgICBwYWRkaW5nPVwic20gbWRcIlxuICAgICAgbGFiZWw9XCJDYXNoIEFkdmFuY2VcIlxuICAgICAgaWNvbj1cImF0dGFjaF9tb25leVwiXG4gICAgICBzaXplPVwibWRcIlxuICAgICAgY2xhc3M9XCJncmFkaWVudC1idG4gdGV4dC13aGl0ZVwiXG4gICAgICBAY2xpY2s9XCJvcGVuRGlhbG9nXCJcbiAgICAvPlxuXG4gICAgPHEtZGlhbG9nXG4gICAgICB2LW1vZGVsPVwiZGlhbG9nXCJcbiAgICAgIHBlcnNpc3RlbnRcbiAgICAgIHBvc2l0aW9uPVwicmlnaHRcIlxuICAgICAgYmFja2Ryb3AtZmlsdGVyPVwiYmx1cig0cHgpIHNhdHVyYXRlKDE1MCUpXCJcbiAgICA+XG4gICAgICA8cS1jYXJkIHN0eWxlPVwid2lkdGg6IDQwMHB4OyBtYXgtd2lkdGg6IDgwdndcIj5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uXG4gICAgICAgICAgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIHEtcHgtbWQgcS1weS1zbSBncmFkaWVudC1idG4gdGV4dC13aGl0ZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNSBxLW1yLW1kXCI+8J+SsiBBZGQgQ2FzaCBBZHZhbmNlPC9kaXY+XG4gICAgICAgICAgPHEtc3BhY2UgLz5cbiAgICAgICAgICA8cS1idG4gaWNvbj1cImFycm93X2ZvcndhcmRfaW9zXCIgZmxhdCBkZW5zZSByb3VuZCB2LWNsb3NlLXBvcHVwIC8+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgdi1tb2RlbD1cInNlYXJjaEtleXdvcmRcIlxuICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cInNlYXJjaFwiXG4gICAgICAgICAgICBsYWJlbD1cIlNlYXJjaCBFbXBsb3llZVwiXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgcm91bmRlZFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIGRlYm91bmNlPVwiNTAwXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgbmFtZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgICAgICAgIDxxLWljb24gdi1pZj1cIiFzZWFyY2hMb2FkaW5nXCIgbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICAgICAgICAgIDxxLXNwaW5uZXIgdi1lbHNlIGNvbG9yPVwiZ3JleVwiIHNpemU9XCJzbVwiIC8+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgPGRpdiB2LWlmPVwic2VhcmNoS2V5d29yZFwiIGNsYXNzPVwiY3VzdG9tLWxpc3Qgei10b3BcIj5cbiAgICAgICAgICAgICAgPHEtY2FyZD5cbiAgICAgICAgICAgICAgICA8cS1saXN0IHNlcGFyYXRvcj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0gdi1pZj1cIiFlbXBsb3llZXM/Lmxlbmd0aFwiPlxuICAgICAgICAgICAgICAgICAgICBObyBFbXBsb3llZSByZWNvcmRcbiAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbVxuICAgICAgICAgICAgICAgICAgICAgIEBjbGljaz1cImF1dG9GaWxsRW1wbG95ZWUoZW1wbG95ZWUpXCJcbiAgICAgICAgICAgICAgICAgICAgICB2LWZvcj1cImVtcGxveWVlIGluIGVtcGxveWVlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgOmtleT1cImVtcGxveWVlLmlkXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGlja2FibGVcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGAke2VtcGxveWVlLmZpcnN0bmFtZX0gJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbXBsb3llZS5taWRkbGVuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGVtcGxveWVlLm1pZGRsZW5hbWUuY2hhckF0KDApICsgXCIuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9ICR7ZW1wbG95ZWUubGFzdG5hbWV9YFxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9xLWxpc3Q+XG4gICAgICAgICAgICAgIDwvcS1jYXJkPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci1tZCB0ZXh0LXN1YnRpdGxlMVwiPlxuICAgICAgICAgICAgPGRpdj5OYW1lOjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LW1lZHVpbVwiPlxuICAgICAgICAgICAgICB7e1xuICAgICAgICAgICAgICAgIGNhc2hBZHZhbmNlLmVtcGxveWVlX25hbWVcbiAgICAgICAgICAgICAgICAgID8gY2FzaEFkdmFuY2UuZW1wbG95ZWVfbmFtZVxuICAgICAgICAgICAgICAgICAgOiBcIi0tLS0tLS1cIlxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci1tZCB0ZXh0LXN1YnRpdGxlMVwiPlxuICAgICAgICAgICAgPGRpdj5Qb3NpdGlvbjo8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1tZWR1aW1cIj5cbiAgICAgICAgICAgICAge3tcbiAgICAgICAgICAgICAgICBjYXNoQWR2YW5jZS5lbXBsb3llZV9wb3NpdGlvblxuICAgICAgICAgICAgICAgICAgPyBjYXNoQWR2YW5jZS5lbXBsb3llZV9wb3NpdGlvblxuICAgICAgICAgICAgICAgICAgOiBcIi0tLS0tLS1cIlxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwicS1ndXR0ZXItbWRcIj5cbiAgICAgICAgICAgIDxxLWlucHV0IG91dGxpbmVkIGRlbnNlIHJlYWRvbmx5IGxhYmVsPVwiTmFtZVwiIC8+XG4gICAgICAgICAgICA8cS1pbnB1dCBvdXRsaW5lZCBkZW5zZSByZWFkb25seSBsYWJlbD1cIlBvc2l0aW9uXCIgLz5cbiAgICAgICAgICA8L2Rpdj4gLS0+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXIteS1tZFwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cImNhc2hBZHZhbmNlLmFtb3VudFwiIG91dGxpbmVkIGxhYmVsPVwiQW1vdW50XCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJjYXNoQWR2YW5jZS5udW1iZXJfb2ZfcGF5bWVudHNcIlxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJOdW1iZXIgb2YgUGF5bWVudHNcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDE4MHB4XCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwiY2FzaEFkdmFuY2UucGF5bWVudHNfcGVyX3BheXJvbGxcIlxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgICBsYWJlbD1cIlBheW1lbnRzIHBlciBQYXlyb2xsXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxODBweFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj4gLS0+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJjYXNoQWR2YW5jZS5yZWFzb25cIlxuICAgICAgICAgICAgICAgIGZpbGxlZFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0YXJlYVwiXG4gICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICBsYWJlbD1cIlJlYXNvblwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtY2FyZC1hY3Rpb25zPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgc2l6ZT1cIm1kXCJcbiAgICAgICAgICAgIHBhZGRpbmc9XCJ4cyBtZFwiXG4gICAgICAgICAgICBsYWJlbD1cInNhdmVcIlxuICAgICAgICAgICAgaWNvbi1yaWdodD1cInNlbmRcIlxuICAgICAgICAgICAgY2xhc3M9XCJncmFkaWVudC1idG4gdGV4dC13aGl0ZVwiXG4gICAgICAgICAgICA6bG9hZGluZz1cImxvYWRpbmdcIlxuICAgICAgICAgICAgQGNsaWNrPVwic2F2ZVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICAgIDwvcS1jYXJkPlxuICAgIDwvcS1kaWFsb2c+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZUVtcGxveWVlU3RvcmUgfSBmcm9tIFwic3RvcmVzL2VtcGxveWVlXCI7XG5pbXBvcnQgeyBjb21wdXRlZCwgcmVhY3RpdmUsIHJlZiB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IHVzZUNhc2hBZHZhbmNlU3RvcmUgfSBmcm9tIFwic3RvcmVzL2Nhc2gtYWR2YW5jZVwiO1xuXG5jb25zdCBlbXBsb3llZVN0b3JlID0gdXNlRW1wbG95ZWVTdG9yZSgpO1xuY29uc3QgZW1wbG95ZWVzID0gY29tcHV0ZWQoKCkgPT4gZW1wbG95ZWVTdG9yZS5lbXBsb3llZXMpO1xuY29uc3QgY2FzaEFkdmFuY2VTdG9yZSA9IHVzZUNhc2hBZHZhbmNlU3RvcmUoKTtcbmNvbnN0IGNhc2hBZHZhbmNlUm93cyA9IGNvbXB1dGVkKCgpID0+IGNhc2hBZHZhbmNlU3RvcmUuY2FzaEFkdmFuY2VzKTtcbmNvbnN0IHNlYXJjaEtleXdvcmQgPSByZWYoXCJcIik7XG5jb25zdCBsb2FkaW5nID0gcmVmKGZhbHNlKTtcbmNvbnN0IHNlYXJjaExvYWRpbmcgPSByZWYoZmFsc2UpO1xuY29uc3QgZGlhbG9nID0gcmVmKGZhbHNlKTtcbmNvbnN0IG9wZW5EaWFsb2cgPSAoKSA9PiB7XG4gIGRpYWxvZy52YWx1ZSA9IHRydWU7XG59O1xuXG5jb25zdCBzZWFyY2ggPSBhc3luYyAoKSA9PiB7XG4gIGlmIChzZWFyY2hLZXl3b3JkLnZhbHVlLnRyaW0oKSkge1xuICAgIHNlYXJjaExvYWRpbmcudmFsdWUgPSB0cnVlO1xuICAgIGF3YWl0IGVtcGxveWVlU3RvcmUuc2VhcmNoRW1wbG95ZWUoc2VhcmNoS2V5d29yZC52YWx1ZSk7XG4gICAgc2VhcmNoTG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICB9XG59O1xuXG5jb25zdCBhdXRvRmlsbEVtcGxveWVlID0gKGVtcGxveWVlKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQgRW1wbG95ZWU6XCIsIGVtcGxveWVlKTtcbiAgY2FzaEFkdmFuY2UuZW1wbG95ZWVfaWQgPSBlbXBsb3llZS5pZDtcbiAgY2FzaEFkdmFuY2UuZW1wbG95ZWVfbmFtZSA9IGAke2VtcGxveWVlLmZpcnN0bmFtZX0gJHtcbiAgICBlbXBsb3llZS5taWRkbGVuYW1lID8gZW1wbG95ZWUubWlkZGxlbmFtZS5jaGFyQXQoMCkgKyBcIi5cIiA6IFwiXCJcbiAgfSAke2VtcGxveWVlLmxhc3RuYW1lfSBgO1xuICAoY2FzaEFkdmFuY2UuZW1wbG95ZWVfcG9zaXRpb24gPSBlbXBsb3llZS5wb3NpdGlvbiksXG4gICAgKHNlYXJjaEtleXdvcmQudmFsdWUgPSBcIlwiKTtcbiAgY29uc29sZS5sb2coXCJGaWxsZWQgRGVzaWduYXRpb24gRGF0YTpcIiwgY2FzaEFkdmFuY2UpO1xufTtcblxuY29uc3QgY2FzaEFkdmFuY2UgPSByZWFjdGl2ZSh7XG4gIGVtcGxveWVlX2lkOiBcIlwiLFxuICBlbXBsb3llZV9uYW1lOiBcIlwiLFxuICBlbXBsb3llZV9wb3NpdGlvbjogXCJcIixcbiAgYW1vdW50OiBcIlwiLFxuICByZWFzb246IFwiXCIsXG4gIC8vIG51bWJlcl9vZl9wYXltZW50czogMSxcbiAgLy8gcGF5bWVudHNfcGVyX3BheXJvbGw6IFwiXCIsXG59KTtcblxuY29uc3QgY2xlYXJDYXNoQWR2YW5jZUZvcm0gPSAoKSA9PiB7XG4gIChjYXNoQWR2YW5jZS5lbXBsb3llZV9pZCA9IFwiXCIpLFxuICAgIChjYXNoQWR2YW5jZS5lbXBsb3llZV9uYW1lID0gXCJcIiksXG4gICAgKGNhc2hBZHZhbmNlLmVtcGxveWVlX3Bvc2l0aW9uID0gXCJcIiksXG4gICAgKGNhc2hBZHZhbmNlLmFtb3VudCA9IFwiXCIpLFxuICAgIChjYXNoQWR2YW5jZS5yZWFzb24gPSBcIlwiKTtcbn07XG4vLyBNYXRoLnJvdW5kXG4vLyB3YXRjaChbKCkgPT4gY2FzaEFkdmFuY2UuYW1vdW50LCAoKSA9PiBjYXNoQWR2YW5jZS5udW1iZXJfb2ZfcGF5bWVudHNdLCAoKSA9PiB7XG4vLyAgIGNhc2hBZHZhbmNlLnBheW1lbnRzX3Blcl9wYXlyb2xsID1cbi8vICAgICBjYXNoQWR2YW5jZS5hbW91bnQgLyAoY2FzaEFkdmFuY2UubnVtYmVyX29mX3BheW1lbnRzIHx8IDEpO1xuLy8gfSk7XG5cbmNvbnN0IHNhdmUgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiY2FzaEFkdmFuY2VcIiwgY2FzaEFkdmFuY2UpO1xuICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhc2hBZHZhbmNlU3RvcmUuY3JlYXRlQ2FzaEFkdmFuY2UoY2FzaEFkdmFuY2UpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIH1cblxuICBjbGVhckNhc2hBZHZhbmNlRm9ybSgpO1xuICBjYXNoQWR2YW5jZVJvd3MudmFsdWUgPSBhd2FpdCBjYXNoQWR2YW5jZVN0b3JlLmZldGNoQ2FzaEFkdmFuY2UoKTtcbiAgZGlhbG9nLnZhbHVlID0gZmFsc2U7XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5ncmFkaWVudC1idG4ge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNhNjIxYTYsICM1MDJhMzMpO1xuICBib3JkZXI6IG5vbmU7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxxLWlucHV0XG4gICAgICB2LW1vZGVsPVwic2VhcmNoS2V5d29yZFwiXG4gICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwic2VhcmNoXCJcbiAgICAgIG91dGxpbmVkXG4gICAgICBkZW5zZVxuICAgICAgZmxhdFxuICAgICAgbGFiZWw9XCJTZWFyY2hcIlxuICAgICAgc3R5bGU9XCJ3aWR0aDogMzAwcHhcIlxuICAgID5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxxLWljb24gdi1pZj1cIiFsb2FkaW5nXCIgbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICAgICAgPHEtc3Bpbm5lciB2LWVsc2UgY29sb3I9XCJncmV5XCIgc2l6ZT1cInNtXCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS1pbnB1dD5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgdXNlQ2FzaEFkdmFuY2VTdG9yZSB9IGZyb20gXCJzdG9yZXMvY2FzaC1hZHZhbmNlXCI7XG5pbXBvcnQgeyByZWYgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IGNhc2hBZHZhbmNlU3RvcmUgPSB1c2VDYXNoQWR2YW5jZVN0b3JlKCk7XG5jb25zdCBzZWFyY2hLZXl3b3JkID0gcmVmKFwiXCIpO1xuY29uc3QgbG9hZGluZyA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IHNlYXJjaCA9IGFzeW5jICgpID0+IHtcbiAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gIGF3YWl0IGNhc2hBZHZhbmNlU3RvcmUuc2VhcmNoQ2FzaEFkdmFuY2Uoc2VhcmNoS2V5d29yZC52YWx1ZSk7XG4gIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuIHEtbWItbWRcIiBhbGlnbj1cInJpZ2h0XCI+XG4gICAgPGRpdiBjbGFzcz1cInJvdyBxLWd1dHRlci1tZFwiPlxuICAgICAgPENhc2hBZHZhbmNlQnV0dG9uIC8+XG4gICAgPC9kaXY+XG4gICAgPFNlYXJjaENhc2hBZHZhbmNlIC8+XG4gIDwvZGl2PlxuICA8cS10YWJsZVxuICAgIDpyb3dzPVwiY2FzaEFkdmFuY2VSb3dzXCJcbiAgICA6Y29sdW1ucz1cImNhc2hBZHZhbmNlQ29sdW1uc1wiXG4gICAgY2xhc3M9XCJzdGlja3ktaGVhZGVyXCJcbiAgICByb3cta2V5PVwibmFtZVwiXG4gICAgdi1tb2RlbDpwYWdpbmF0aW9uPVwicGFnaW5hdGlvblwiXG4gICAgaGlkZS1ib3R0b21cbiAgPlxuICA8L3EtdGFibGU+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmLCBjb21wdXRlZCwgb25Nb3VudGVkIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IENhc2hBZHZhbmNlQnV0dG9uIGZyb20gXCIuL0Nhc2hBZHZhbmNlQnV0dG9uLnZ1ZVwiO1xuaW1wb3J0IHsgdXNlQ2FzaEFkdmFuY2VTdG9yZSB9IGZyb20gXCJzdG9yZXMvY2FzaC1hZHZhbmNlXCI7XG5pbXBvcnQgU2VhcmNoQ2FzaEFkdmFuY2UgZnJvbSBcIi4vU2VhcmNoQ2FzaEFkdmFuY2UudnVlXCI7XG5cbmNvbnN0IGNhc2hBZHZhbmNlU3RvcmUgPSB1c2VDYXNoQWR2YW5jZVN0b3JlKCk7XG5jb25zdCBjYXNoQWR2YW5jZVJvd3MgPSBjb21wdXRlZCgoKSA9PiBjYXNoQWR2YW5jZVN0b3JlLmNhc2hBZHZhbmNlcyk7XG5jb25zdCBwYWdpbmF0aW9uID0gcmVmKHtcbiAgcm93c1BlclBhZ2U6IDAsXG59KTtcblxub25Nb3VudGVkKGFzeW5jICgpID0+IHtcbiAgYXdhaXQgcmVsb2FkVGFibGVEYXRhKCk7XG59KTtcblxuY29uc3QgcmVsb2FkVGFibGVEYXRhID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGNhc2hBZHZhbmNlUm93cy52YWx1ZSA9IGF3YWl0IGNhc2hBZHZhbmNlU3RvcmUuZmV0Y2hDYXNoQWR2YW5jZSgpO1xuICAgIGNvbnNvbGUubG9nKFwiQ0FcIiwgY2FzaEFkdmFuY2VSb3dzLnZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIik7XG4gIH1cbn07XG5cbmNvbnN0IGZvcm1hdEZ1bGxuYW1lID0gKHJvdykgPT4ge1xuICBjb25zdCBjYXBpdGFsaXplID0gKHN0cikgPT5cbiAgICBzdHIgPyBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSkudG9Mb3dlckNhc2UoKSA6IFwiXCI7XG4gIGNvbnN0IGZpcnN0bmFtZSA9IHJvdy5maXJzdG5hbWUgPyBjYXBpdGFsaXplKHJvdy5maXJzdG5hbWUpIDogXCJObyBGaXJzdG5hbWVcIjtcbiAgY29uc3QgbWlkZGxlbmFtZSA9IHJvdy5taWRkbGVuYW1lXG4gICAgPyBjYXBpdGFsaXplKHJvdy5taWRkbGVuYW1lKS5jaGFyQXQoMCkgKyBcIi5cIlxuICAgIDogXCJcIjtcbiAgY29uc3QgbGFzdG5hbWUgPSByb3cubGFzdG5hbWUgPyBjYXBpdGFsaXplKHJvdy5sYXN0bmFtZSkgOiBcIk5vIExhc3RuYW1lXCI7XG5cbiAgcmV0dXJuIGAke2ZpcnN0bmFtZX0gJHttaWRkbGVuYW1lfSAke2xhc3RuYW1lfWAudHJpbSgpO1xufTtcblxuY29uc3QgZm9ybWF0Q3VycmVuY3kgPSAodmFsdWUpID0+IHtcbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChcImVuLVVTXCIsIHtcbiAgICBzdHlsZTogXCJjdXJyZW5jeVwiLFxuICAgIGN1cnJlbmN5OiBcIlBIUFwiLFxuICB9KS5mb3JtYXQodmFsdWUpO1xufTtcblxuY29uc3QgZm9ybWF0RGF0ZSA9IChkYXRlVGltZSkgPT4ge1xuICBpZiAoIWRhdGVUaW1lKSByZXR1cm4gXCIgLSAtIFwiOyAvLyBSZXR1cm4gYSBwbGFjZWhvbGRlciBpZiB0aGUgdmFsdWUgaXMgbWlzc2luZ1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0ZVRpbWUpO1xuICBpZiAoaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSByZXR1cm4gXCIgLSAtIFwiO1xuXG4gIHJldHVybiBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLVVTXCIsIHtcbiAgICBtb250aDogXCJzaG9ydFwiLFxuICAgIGRheTogXCJudW1lcmljXCIsXG4gICAgeWVhcjogXCJudW1lcmljXCIsXG4gIH0pOyAvLyBGb3JtYXQgYXMgXCJPY3QuIDE0LCAyMDI0XCJcbn07XG5cbmNvbnN0IGNhc2hBZHZhbmNlQ29sdW1ucyA9IFtcbiAge1xuICAgIG5hbWU6IFwiZGF0ZVwiLFxuICAgIGxhYmVsOiBcIkRhdGVcIixcbiAgICBhbGlnbjogXCJsZWZ0XCIsXG4gICAgZmllbGQ6IChyb3cpID0+IGZvcm1hdERhdGUocm93LmNyZWF0ZWRfYXQpLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJuYW1lXCIsXG4gICAgbGFiZWw6IFwiRW1wbG95ZWUgTmFtZVwiLFxuICAgIGFsaWduOiBcImxlZnRcIixcbiAgICBmaWVsZDogKHJvdykgPT4gZm9ybWF0RnVsbG5hbWUocm93LmVtcGxveWVlKSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiYW1vdW50XCIsXG4gICAgbGFiZWw6IFwiQW1vdW50XCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IChyb3cpID0+IGZvcm1hdEN1cnJlbmN5KHJvdy5hbW91bnQpLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJhbW91bnRcIixcbiAgICBsYWJlbDogXCJBbW91bnRcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogXCJyZWFzb25cIixcbiAgfSxcbl07XG48L3NjcmlwdD5cblxuPHN0eWxlIGxhbmc9XCJzY3NzXCIgc2NvcGVkPjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLXktc21cIj5cbiAgICAgIDxxLXRhYnNcbiAgICAgICAgdi1tb2RlbD1cInRhYlwiXG4gICAgICAgIG5hcnJvdy1pbmRpY2F0b3JcbiAgICAgICAgbm8tY2Fwc1xuICAgICAgICBpbmxpbmUtbGFiZWxcbiAgICAgICAgZGVuc2VcbiAgICAgICAgYWxpZ249XCJqdXN0aWZ5XCJcbiAgICAgICAgY2xhc3M9XCJncmFkaWVudC1idG5cIlxuICAgICAgPlxuICAgICAgICA8cS10YWJcbiAgICAgICAgICBjbGFzcz1cInRleHQtd2hpdGVcIlxuICAgICAgICAgIG5hbWU9XCJhbGxvd2FuY2VcIlxuICAgICAgICAgIGljb249XCJhY2NvdW50X2JhbGFuY2Vfd2FsbGV0XCJcbiAgICAgICAgICBsYWJlbD1cIkFsbG93YW5jZVwiXG4gICAgICAgIC8+XG4gICAgICAgIDwhLS0gdmlld190aW1lbGluZSAtLT5cblxuICAgICAgICA8cS10YWJcbiAgICAgICAgICBjbGFzcz1cInRleHQtd2hpdGVcIlxuICAgICAgICAgIG5hbWU9XCJiZW5lZml0c1wiXG4gICAgICAgICAgaWNvbj1cInZpZXdfdGltZWxpbmVcIlxuICAgICAgICAgIGxhYmVsPVwiQmVuZWZpdHNcIlxuICAgICAgICAvPlxuICAgICAgICA8cS10YWJcbiAgICAgICAgICBjbGFzcz1cInRleHQtd2hpdGVcIlxuICAgICAgICAgIG5hbWU9XCJ1bmlmb3JtXCJcbiAgICAgICAgICBpY29uPVwic2V0dGluZ3NfYWNjZXNzaWJpbGl0eVwiXG4gICAgICAgICAgbGFiZWw9XCJVbmlmb3JtXCJcbiAgICAgICAgLz5cbiAgICAgICAgPCEtLSBwYXltZW50cyAtLT5cbiAgICAgICAgPHEtdGFiXG4gICAgICAgICAgY2xhc3M9XCJ0ZXh0LXdoaXRlXCJcbiAgICAgICAgICBuYW1lPVwiY2FzaC1hZHZhbmNlXCJcbiAgICAgICAgICBpY29uPVwid2FsbGV0XCJcbiAgICAgICAgICBsYWJlbD1cIkNhc2ggQWR2YW5jZVwiXG4gICAgICAgIC8+XG4gICAgICAgIDwhLS0gPHEtdGFiXG4gICAgICAgICAgY2xhc3M9XCJ0ZXh0LXdoaXRlXCJcbiAgICAgICAgICBuYW1lPVwib3RoZXJzXCJcbiAgICAgICAgICBpY29uPVwiZGV2aWNlc19vdGhlclwiXG4gICAgICAgICAgbGFiZWw9XCJPdGhlcnNcIlxuICAgICAgICAvPiAtLT5cbiAgICAgIDwvcS10YWJzPlxuICAgIDwvZGl2PlxuICAgIDxxLXRhYi1wYW5lbHMgdi1tb2RlbD1cInRhYlwiIGFuaW1hdGVkPlxuICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJhbGxvd2FuY2VcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8QWxsb3dhbmNlVGFibGUgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtdGFiLXBhbmVsPlxuICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJiZW5lZml0c1wiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxEZWR1Y3Rpb25UYWJsZSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS10YWItcGFuZWw+XG4gICAgICA8cS10YWItcGFuZWwgbmFtZT1cInVuaWZvcm1cIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8VW5pZm9ybVRhYmxlIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLXRhYi1wYW5lbD5cbiAgICAgIDxxLXRhYi1wYW5lbCBuYW1lPVwiY2FzaC1hZHZhbmNlXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPENhc2hBZHZhbmNlVGFibGUgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtdGFiLXBhbmVsPlxuICAgIDwvcS10YWItcGFuZWxzPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgQWxsb3dhbmNlVGFibGUgZnJvbSBcIi4vYWxsb3dhbmNlLXNlY3Rpb24vQWxsb3dhbmNlVGFibGUudnVlXCI7XG5pbXBvcnQgRGVkdWN0aW9uVGFibGUgZnJvbSBcIi4vYmVuZWZpdHMtc2VjdGlvbi9CZW5lZml0c1RhYmxlLnZ1ZVwiO1xuaW1wb3J0IFVuaWZvcm1UYWJsZSBmcm9tIFwiLi91bmlmb3JtLXNlY3Rpb24vVW5pZm9ybVRhYmxlLnZ1ZVwiO1xuaW1wb3J0IENhc2hBZHZhbmNlVGFibGUgZnJvbSBcIi4vY2FzaC1hZHZhbmNlLXNlY3Rpb24vQ2FzaEFkdmFuY2VUYWJsZS52dWVcIjtcbmltcG9ydCB7IHJlZiB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgdGFiID0gcmVmKFwiYWxsb3dhbmNlXCIpO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5ncmFkaWVudC1idG4ge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICM1MDJhMzMsICNhNjIxYTYpO1xuICBib3JkZXI6IG5vbmU7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGFsaWduPVwicmlnaHRcIj5cbiAgICA8IS0tIHYtbW9kZWw9XCJzZWFyY2hRdWVyeVwiXG4gICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cInNlYXJjaFwiIC0tPlxuICAgIDxxLWlucHV0XG4gICAgICBjbGFzcz1cInEtcGItbGdcIlxuICAgICAgb3V0bGluZWRcbiAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgIGRlYm91bmNlPVwiMTAwMFwiXG4gICAgICBmbGF0XG4gICAgICBkZW5zZVxuICAgICAgcm91bmRlZFxuICAgICAgc3R5bGU9XCJ3aWR0aDogMTAwJTsgbWF4LXdpZHRoOiA2MDBweFwiXG4gICAgPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XG4gICAgICAgIDxxLWljb24gbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS1pbnB1dD5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJyb3cgcS1ndXR0ZXItbGdcIj5cbiAgICA8IS0tIGNsYXNzPVwiY29sLXhzLTEyIGNvbC1zbS02IGNvbC1tZC00IGNvbC1sZy0zXCIgLS0+XG4gICAgPCEtLSA8ZGl2IHYtZm9yPVwiY2FyZCBpbiBjYXJkc1wiIDprZXk9XCJjYXJkLmlkXCI+XG4gICAgICA8cS1jYXJkXG4gICAgICAgIGNsYXNzPVwicS1wYS1tZCBxLW10LWxnIHVzZXItY2FyZFwiXG4gICAgICAgIHN0eWxlPVwiXG4gICAgICAgICAgYm94LXNoYWRvdzogMHB4IDZweCAxNHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmM2Y0ZjYsICNlMGUwZTApO1xuICAgICAgICBcIlxuICAgICAgPlxuICAgICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJ0ZXh0LWNlbnRlciBxLXBhLW1kXCIgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmVcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHEtYXZhdGFyXG4gICAgICAgICAgICAgIHNpemU9XCI4MHB4XCJcbiAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgdGV4dC1jb2xvcj1cIndoaXRlXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJxLW1hLWxnXCJcbiAgICAgICAgICAgICAgc3R5bGU9XCJcbiAgICAgICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICAgICAgdG9wOiAtNDBweDtcbiAgICAgICAgICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xuICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8aW1nIDpzcmM9XCJjYXJkLmF2YXRhclwiIC8+XG4gICAgICAgICAgICA8L3EtYXZhdGFyPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbGdcIiBzdHlsZT1cIm1hcmdpbi10b3A6IDYwcHhcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg1IHRleHQtd2VpZ2h0LWJvbGQgZWxlZ2FudC1uYW1lIHRleHQtY2FwaXRhbGl6ZVwiPlxuICAgICAgICAgICAgICB7eyBjYXJkLm5hbWUgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8cS1jaGlwXG4gICAgICAgICAgICAgIHRleHQtY29sb3I9XCJ3aGl0ZVwiXG4gICAgICAgICAgICAgIGNsYXNzPVwicS1tdC1zbSBlbGVnYW50LWNoaXBcIlxuICAgICAgICAgICAgICBzdHlsZT1cIlxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzYjgyZjY7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDVweCAxMHB4O1xuICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7eyBjYXJkLnBvc2l0aW9uIH19XG4gICAgICAgICAgICA8L3EtY2hpcD5cbiAgICAgICAgICAgIDxxLWNoaXBcbiAgICAgICAgICAgICAgb3V0bGluZVxuICAgICAgICAgICAgICBzcXVhcmVcbiAgICAgICAgICAgICAgY29sb3I9XCJkZWVwLW9yYW5nZVwiXG4gICAgICAgICAgICAgIGNsYXNzPVwicS1tdC1zbSBlbGVnYW50LWNoaXBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBSZWd1bGFyXG4gICAgICAgICAgICA8L3EtY2hpcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgICAgICA8cS1zZXBhcmF0b3IgY2xhc3M9XCJxLW1hLXNtXCIgLz5cbiAgICAgICAgPGRpdiBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgcGFkZGluZz1cInNtIG1kXCJcbiAgICAgICAgICAgIGxhYmVsPVwiT3BlbiBQYXlzbGlwXCJcbiAgICAgICAgICAgIHNpemU9XCJtZFwiXG4gICAgICAgICAgICBjbGFzcz1cImdyYWRpZW50LWJ0biB0ZXh0LWRhcnJrXCJcbiAgICAgICAgICA+PC9xLWJ0bj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtY2FyZD5cbiAgICA8L2Rpdj4gLS0+XG5cbiAgICA8cS1pbnRlcnNlY3Rpb24gdi1mb3I9XCJjYXJkIGluIGNhcmRzXCIgOmtleT1cImNhcmQuaWRcIiBjbGFzcz1cInEtbWEtbWRcIj5cbiAgICAgIDwhLS0gcS1pbnRlcnNlY3Rpb24gdG8gZGV0ZWN0IHdoZW4gdGhlIGNhcmQgaXMgdmlzaWJsZSBpbiB0aGUgdmlld3BvcnQgLS0+XG5cbiAgICAgIDxxLWNhcmRcbiAgICAgICAgY2xhc3M9XCJxLXBhLW1kIHEtbXQtbGcgdXNlci1jYXJkXCJcbiAgICAgICAgc3R5bGU9XCJcbiAgICAgICAgICBib3gtc2hhZG93OiAwcHggNnB4IDE0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzJjM2U1MCwgIzRjYTFhZik7XG4gICAgICAgIFwiXG4gICAgICA+XG4gICAgICAgIDwhLS0gLS1cbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM0MzQzNDMsICM0Yjc5YTEpO1xuIC0tLVxuIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMxYTFhMmUsICMxNjIxM2UsICMwZjM0NjApOyAtXG5iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjM2ExYzcxLCAjZDc2ZDc3LCAjZmZhZjdiKTsgZnJvIGJ0blxuYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzMzMzMzMywgI2RkMTgxOCk7IGZvciBidG5cbmJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMwZjIwMjcsICMyMDNhNDMsICMyYzUzNjQpOyAtLS1cbmJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMyMzI1MjYsICM0MTQzNDUsICM2YjZiNmIpOyBidG5cbmJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMyMzI1MjYsICM0MTQzNDUsICM3MzczNzMpO1xuXG5cbiAgICAgICAtLT5cblxuICAgICAgICA8IS0tIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMwMDUyZDQsICM2NWM3ZjcsICM5Y2VjZmIpO1xuYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2I4YzZkYiwgI2Y1ZjdmYSk7XG5iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZmRkYjkyLCAjZDFmZGZmKTtcbmJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNlMGVhZmMsICNjZmRlZjMpO1xuLS0+XG5cbiAgICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwidGV4dC1jZW50ZXIgcS1wYS1tZFwiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxxLWF2YXRhclxuICAgICAgICAgICAgICBzaXplPVwiODBweFwiXG4gICAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgIHRleHQtY29sb3I9XCJ3aGl0ZVwiXG4gICAgICAgICAgICAgIGNsYXNzPVwicS1tYS1sZ1wiXG4gICAgICAgICAgICAgIHN0eWxlPVwiXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICAgIHRvcDogLTQwcHg7XG4gICAgICAgICAgICAgICAgbGVmdDogNTAlO1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGltZyA6c3JjPVwiY2FyZC5hdmF0YXJcIiAvPlxuICAgICAgICAgICAgPC9xLWF2YXRhcj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LWxnXCIgc3R5bGU9XCJtYXJnaW4tdG9wOiA2MHB4XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNSB0ZXh0LXdlaWdodC1ib2xkIGVsZWdhbnQtbmFtZSB0ZXh0LWNhcGl0YWxpemVcIj5cbiAgICAgICAgICAgICAge3sgY2FyZC5uYW1lIH19XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPHEtY2hpcFxuICAgICAgICAgICAgICB0ZXh0LWNvbG9yPVwid2hpdGVcIlxuICAgICAgICAgICAgICBjbGFzcz1cInEtbXQtc20gZWxlZ2FudC1jaGlwXCJcbiAgICAgICAgICAgICAgc3R5bGU9XCJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2I4MmY2O1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiA1cHggMTBweDtcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3sgY2FyZC5wb3NpdGlvbiB9fVxuICAgICAgICAgICAgPC9xLWNoaXA+XG4gICAgICAgICAgICA8cS1jaGlwIG91dGxpbmUgc3F1YXJlIGNvbG9yPVwiY3lhbi0xMlwiIGNsYXNzPVwicS1tdC1zbSBlbGVnYW50LWNoaXBcIj5cbiAgICAgICAgICAgICAgUmVndWxhclxuICAgICAgICAgICAgPC9xLWNoaXA+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICAgICAgPHEtc2VwYXJhdG9yIGNsYXNzPVwicS1tYS1zbVwiIC8+XG4gICAgICAgIDxkaXYgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgIHBhZGRpbmc9XCJzbSBtZFwiXG4gICAgICAgICAgICBsYWJlbD1cIk9wZW4gUGF5c2xpcFwiXG4gICAgICAgICAgICBzaXplPVwibWRcIlxuICAgICAgICAgICAgY2xhc3M9XCJncmFkaWVudC1idG4gdGV4dC1kYXJya1wiXG4gICAgICAgICAgPjwvcS1idG4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWNhcmQ+XG4gICAgPC9xLWludGVyc2VjdGlvbj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmIH0gZnJvbSBcInZ1ZVwiO1xuXG5jb25zdCBjYXJkcyA9IHJlZihbXG4gIHtcbiAgICBpZDogMSxcbiAgICBuYW1lOiBcIkpvaG4gRC4gRG9lXCIsXG4gICAgcG9zaXRpb246IFwiQWRtaW5cIixcbiAgICBjb2xvcjogXCJwcmltYXJ5XCIsXG4gICAgYXZhdGFyOiBcImh0dHBzOi8vY2RuLnF1YXNhci5kZXYvaW1nL2JveS1hdmF0YXIucG5nXCIsXG4gIH0sXG4gIHtcbiAgICBpZDogMixcbiAgICBuYW1lOiBcIkphbmUgRG9lXCIsXG4gICAgcG9zaXRpb246IFwiQWRtaW5cIixcbiAgICBjb2xvcjogXCJwcmltYXJ5XCIsXG4gICAgYXZhdGFyOiBcImh0dHBzOi8vY2RuLnF1YXNhci5kZXYvaW1nL2F2YXRhcjIuanBnXCIsXG4gIH0sXG4gIHtcbiAgICBpZDogMyxcbiAgICBuYW1lOiBcIlNhbSBTbWl0aFwiLFxuICAgIHBvc2l0aW9uOiBcIkFkbWluXCIsXG4gICAgY29sb3I6IFwicHJpbWFyeVwiLFxuICAgIGF2YXRhcjogXCJodHRwczovL2Nkbi5xdWFzYXIuZGV2L2ltZy9hdmF0YXIxLmpwZ1wiLFxuICB9LFxuICB7XG4gICAgaWQ6IDQsXG4gICAgbmFtZTogXCJDaHJpcyBFdmFuc1wiLFxuICAgIHBvc2l0aW9uOiBcIkFkbWluXCIsXG4gICAgY29sb3I6IFwicHJpbWFyeVwiLFxuICAgIGF2YXRhcjogXCJodHRwczovL2Nkbi5xdWFzYXIuZGV2L2ltZy9hdmF0YXI0LmpwZ1wiLFxuICB9LFxuICB7XG4gICAgaWQ6IDUsXG4gICAgbmFtZTogXCJBbGV4IERvZXNzc1wiLFxuICAgIHBvc2l0aW9uOiBcIkFkbWluXCIsXG4gICAgY29sb3I6IFwicHJpbWFyeVwiLFxuICAgIGF2YXRhcjogXCJodHRwczovL2Nkbi5xdWFzYXIuZGV2L2ltZy9hdmF0YXI2LmpwZ1wiLFxuICB9LFxuICB7XG4gICAgaWQ6IDYsXG4gICAgbmFtZTogXCJKb2huIEQuIERvZVwiLFxuICAgIHBvc2l0aW9uOiBcIkFkbWluXCIsXG4gICAgY29sb3I6IFwicHJpbWFyeVwiLFxuICAgIGF2YXRhcjogXCJodHRwczovL2Nkbi5xdWFzYXIuZGV2L2ltZy9ib3ktYXZhdGFyLnBuZ1wiLFxuICB9LFxuICB7XG4gICAgaWQ6IDcsXG4gICAgbmFtZTogXCJKYW5lIERvZVwiLFxuICAgIHBvc2l0aW9uOiBcIkFkbWluXCIsXG4gICAgY29sb3I6IFwicHJpbWFyeVwiLFxuICAgIGF2YXRhcjogXCJodHRwczovL2Nkbi5xdWFzYXIuZGV2L2ltZy9hdmF0YXIyLmpwZ1wiLFxuICB9LFxuICB7XG4gICAgaWQ6IDgsXG4gICAgbmFtZTogXCJTYW0gU21pdGhcIixcbiAgICBwb3NpdGlvbjogXCJBZG1pblwiLFxuICAgIGNvbG9yOiBcInByaW1hcnlcIixcbiAgICBhdmF0YXI6IFwiaHR0cHM6Ly9jZG4ucXVhc2FyLmRldi9pbWcvYXZhdGFyMS5qcGdcIixcbiAgfSxcbiAge1xuICAgIGlkOiA5LFxuICAgIG5hbWU6IFwiQ2hyaXMgRXZhbnNcIixcbiAgICBwb3NpdGlvbjogXCJBZG1pblwiLFxuICAgIGNvbG9yOiBcInByaW1hcnlcIixcbiAgICBhdmF0YXI6IFwiaHR0cHM6Ly9jZG4ucXVhc2FyLmRldi9pbWcvYXZhdGFyNC5qcGdcIixcbiAgfSxcbiAge1xuICAgIGlkOiAxMCxcbiAgICBuYW1lOiBcIkFsZXggRG9lXCIsXG4gICAgcG9zaXRpb246IFwiQWRtaW5cIixcbiAgICBjb2xvcjogXCJwcmltYXJ5XCIsXG4gICAgYXZhdGFyOiBcImh0dHBzOi8vY2RuLnF1YXNhci5kZXYvaW1nL2F2YXRhcjYuanBnXCIsXG4gIH0sXG5dKTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIiBzY29wZWQ+XG4udXNlci1jYXJkIHtcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICMzMzM7XG4gIGJveC1zaGFkb3c6IDBweCA0cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xufVxuLmVsZWdhbnQtbmFtZSB7XG4gIGZvbnQtZmFtaWx5OiBcIlJvYm90b1wiLCBzYW5zLXNlcmlmO1xuICBmb250LXdlaWdodDogNTAwO1xuICBjb2xvcjogI2ZmZmZmZjtcbn1cblxuLmVsZWdhbnQtY2hpcCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDdiZmY7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgY29sb3I6ICNmZmY7XG59XG5cbi5lbGVnYW50LWNoaXAtb3V0bGluZSB7XG4gIGJvcmRlci1jb2xvcjogIzAwN2JmZjtcbiAgY29sb3I6ICMwMDdiZmY7XG59XG4uZ3JhZGllbnQtYnRuIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEyMGRlZywgIzE2Y2M4YywgIzkzZjliOSk7XG4gIGJvcmRlcjogbm9uZTtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgY2xhc3M9XCJlbGVnYW50LWNvbnRhaW5lclwiIGZsYXQ+XG4gICAgPCEtLSA8ZGl2IGNsYXNzPVwiY29sLTQgdGV4dC1oNiBxLXB0LW1kIHEtcGItbWRcIiBhbGlnbj1cImNlbnRlclwiPlxuICAgICAg8J+SsCBQYXlyb2xsIE1hbmFnZW1lbnRcbiAgICA8L2Rpdj4gLS0+XG4gICAgPHEtdGFic1xuICAgICAgdi1tb2RlbD1cInRhYlwiXG4gICAgICBkZW5zZVxuICAgICAgb3V0bGluZVxuICAgICAgZmxhdFxuICAgICAgbm8tY2Fwc1xuICAgICAgaW5saW5lLWxhYmVsXG4gICAgICBjbGFzcz1cInVzZXItdGFiIGp1c3RpZnktY2VudGVyIHEtbWEtbWRcIlxuICAgICAgYWxpZ249XCJqdXN0aWZ5XCJcbiAgICAgIGFjdGl2ZS1jb2xvcj1cInRlYWxcIlxuICAgICAgaW5kaWNhdG9yLWNsYXNzPVwicS10YWItaW5kaWNhdG9yLWdyZWVuXCJcbiAgICA+XG4gICAgICA8IS0tIERhc2hib2FyZCBUYWIgLS0+XG4gICAgICA8cS10YWIgbmFtZT1cImRhc2hib2FyZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1wYS1tZCBxLWd1dHRlci1zbSBmbGV4IGZsZXgtY29sdW1uIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgIDxxLWljb25cbiAgICAgICAgICAgIG5hbWU9XCJpbnNlcnRfY2hhcnRcIlxuICAgICAgICAgICAgc2l6ZT1cIm1kXCJcbiAgICAgICAgICAgIDpjbGFzcz1cInRhYiA9PT0gJ2Rhc2hib2FyZCcgPyAndGV4dC10ZWFsJyA6ICd0ZXh0LWdyZXktNydcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWJvbGRcIj5EYXNoYm9hcmQ8L2Rpdj5cbiAgICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJ0ZXh0LWNhcHRpb24gdGV4dC1ncmV5LTZcIj5SZWNlbnQgVXBkYXRlcyAmIFJlcG9ydHM8L2Rpdj4gLS0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLXRhYj5cblxuICAgICAgPCEtLSBFbXBsb3llZXMgVGFiIC0tPlxuICAgICAgPHEtdGFiIG5hbWU9XCJlbXBsb3llZXNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtcGEtbWQgcS1ndXR0ZXItc20gZmxleCBmbGV4LWNvbHVtbiBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICA8cS1pY29uXG4gICAgICAgICAgICBuYW1lPVwiZ3JvdXBcIlxuICAgICAgICAgICAgc2l6ZT1cIm1kXCJcbiAgICAgICAgICAgIDpjbGFzcz1cInRhYiA9PT0gJ2VtcGxveWVlcycgPyAndGV4dC10ZWFsJyA6ICd0ZXh0LWdyZXktNydcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LWJvbGQgdGV4dC1sZ1wiPkVtcGxveWVlczwvZGl2PlxuICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cInRleHQtY2FwdGlvbiB0ZXh0LWdyZXktNlwiPkxpc3QgJiBOZXcgRW50cmllczwvZGl2PiAtLT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtdGFiPlxuXG4gICAgICA8IS0tIFNhbGFyeSBUYWIgLS0+XG4gICAgICA8cS10YWIgbmFtZT1cImF0dGVuZGFuY2VcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtcGEtbWQgcS1ndXR0ZXItc20gZmxleCBmbGV4LWNvbHVtbiBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICA8cS1pY29uXG4gICAgICAgICAgICBuYW1lPVwiYWNjZXNzX3RpbWVcIlxuICAgICAgICAgICAgc2l6ZT1cIm1kXCJcbiAgICAgICAgICAgIDpjbGFzcz1cInRhYiA9PT0gJ2F0dGVuZGFuY2UnID8gJ3RleHQtdGVhbCcgOiAndGV4dC1ncmV5LTcnXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1ib2xkIHRleHQtbGdcIj5BdHRlbmRhbmNlPC9kaXY+XG4gICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwidGV4dC1jYXB0aW9uIHRleHQtZ3JleS02XCI+U2FsYXJ5IFJlcG9ydDwvZGl2PiAtLT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtdGFiPlxuXG4gICAgICA8IS0tIEFsbG93YW5jZXMgJiBEZWR1Y3Rpb25zIFRhYiAtLT5cbiAgICAgIDxxLXRhYiBuYW1lPVwiYWxsb3dhbmNlc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1wYS1tZCBxLWd1dHRlci1zbSBmbGV4IGZsZXgtY29sdW1uIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgIDxxLWljb25cbiAgICAgICAgICAgIG5hbWU9XCJhZGRfY2lyY2xlX291dGxpbmVcIlxuICAgICAgICAgICAgc2l6ZT1cIm1kXCJcbiAgICAgICAgICAgIDpjbGFzcz1cInRhYiA9PT0gJ2FsbG93YW5jZXMnID8gJ3RleHQtdGVhbCcgOiAndGV4dC1ncmV5LTcnXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1ib2xkIHRleHQtbGdcIj5BbGxvd2FuY2VzICYgRGVkdWN0aW9uczwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS10YWI+XG5cbiAgICAgIDwhLS0gQWRtaW5pc3RyYXRpb24gVGFiIC0tPlxuICAgICAgPHEtdGFiIG5hbWU9XCJwYXlzbGlwXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLXBhLXNtIHEtZ3V0dGVyLXNtIGZsZXggZmxleC1jb2x1bW4gaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgPHEtaWNvblxuICAgICAgICAgICAgbmFtZT1cInBheW1lbnRcIlxuICAgICAgICAgICAgc2l6ZT1cIm1kXCJcbiAgICAgICAgICAgIDpjbGFzcz1cInRhYiA9PT0gJ3BheXNsaXAnID8gJ3RleHQtdGVhbCcgOiAndGV4dC1ncmV5LTcnXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC1ib2xkIHRleHQtbGdcIj5QYXlzbGlwPC9kaXY+XG4gICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwidGV4dC1jYXB0aW9uIHRleHQtZ3JleS02XCI+RGVwYXJ0bWVudCwgR3JhZGUgJiBTZXR0aW5nczwvZGl2PiAtLT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtdGFiPlxuICAgIDwvcS10YWJzPlxuICAgIDxxLXRhYi1wYW5lbHMgdi1tb2RlbD1cInRhYlwiIGFuaW1hdGVkIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogI2Y3ZjhmY1wiPlxuICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJkYXNoYm9hcmRcIj5cbiAgICAgICAgPERhc2hib2FyZFBhZ2UgLz5cbiAgICAgIDwvcS10YWItcGFuZWw+XG4gICAgICA8cS10YWItcGFuZWwgbmFtZT1cImVtcGxveWVlc1wiPlxuICAgICAgICA8RW1wbG95ZWVlc1BhZ2UgLz5cbiAgICAgIDwvcS10YWItcGFuZWw+XG4gICAgICA8cS10YWItcGFuZWwgbmFtZT1cImF0dGVuZGFuY2VcIj5cbiAgICAgICAgPEF0dGVuZGFuY2VQYWdlIC8+XG4gICAgICA8L3EtdGFiLXBhbmVsPlxuICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJhbGxvd2FuY2VzXCI+XG4gICAgICAgIDxBbGxvd2FuY2VEZWR1Y3Rpb25QYWdlIC8+XG4gICAgICA8L3EtdGFiLXBhbmVsPlxuICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJwYXlzbGlwXCI+XG4gICAgICAgIDxQYXlzbGlwUGFnZSAvPlxuICAgICAgPC9xLXRhYi1wYW5lbD5cbiAgICA8L3EtdGFiLXBhbmVscz5cbiAgPC9xLXBhZ2U+XG5cbiAgPCEtLVxuICA8cS1jYXJkIGNsYXNzPVwiZWxlZ2FudC1jb250YWluZXIgcS1tdC1sZ1wiIGZsYXQ+XG4gICAgPHEtY2FyZC1zZWN0aW9uPiA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNiByb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPEVtcGxveW1lbnRUeXBlIGNsYXNzPVwidXNlci1jYXJkXCIgc3R5bGU9XCJ3aWR0aDogMzAwcHhcIiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8RW1wbG95ZWVCZW5lZml0cyBjbGFzcz1cInVzZXItY2FyZFwiIHN0eWxlPVwid2lkdGg6IDMwMHB4XCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDxxLWNhcmQtc2VjdGlvbj4gPC9xLWNhcmQtc2VjdGlvbj5cbiAgPC9xLWNhcmQ+IC0tPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBEYXNoYm9hcmRQYWdlIGZyb20gXCIuL3BhbmVsLXNlY3Rpb24vZGFzaGJvYXJkL0Rhc2hib2FyZFBhZ2UudnVlXCI7XG5pbXBvcnQgRW1wbG95ZWVlc1BhZ2UgZnJvbSBcIi4vcGFuZWwtc2VjdGlvbi9lbXBsb3llZXMvRW1wbG95ZWVzUGFnZS52dWVcIjtcbmltcG9ydCBBdHRlbmRhbmNlUGFnZSBmcm9tIFwiLi9wYW5lbC1zZWN0aW9uL2F0dGVuZGFuY2UvQXR0ZW5kYW5jZVBhZ2UudnVlXCI7XG5pbXBvcnQgQWxsb3dhbmNlRGVkdWN0aW9uUGFnZSBmcm9tIFwiLi9wYW5lbC1zZWN0aW9uL2FsbG93YW5jZS1kZWR1Y3Rpb24vQWxsb3dhbmNlRGVkdWN0aW9uUGFnZS52dWVcIjtcbmltcG9ydCBQYXlzbGlwUGFnZSBmcm9tIFwiLi9wYW5lbC1zZWN0aW9uL3BheXNsaXAvUGF5c2xpcFBhZ2UudnVlXCI7XG5pbXBvcnQgeyByZWYgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IGJyYW5jaGVTdGF0dXNEaWFsb2cgPSByZWYoKTtcblxuY29uc3Qgb3Blbl9icmFuY2hfc3RhdHVzX2RpYWxvZyA9ICgpID0+IHtcbiAgYnJhbmNoZVN0YXR1c0RpYWxvZy52YWx1ZSA9IHRydWU7XG59O1xuXG5jb25zdCBzZWFyY2hUZXJtID0gcmVmKFwiXCIpO1xuXG4vLyBjb25zdCBmaWx0ZXJDYXJkcyA9IGNvbXB1dGVkKCgpID0+IHtcbi8vICAgICByZXR1cm4gY2FyZHMuZmlsdGVyKGNhcmQgPT57XG4vLyAgICAgICAgIHJldHVybiBjYXJkLnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybS52YWx1ZS50b0xvd2VyQ2FzZSgpKSB8fCBjYXJkLmRlc2NyaXB0aW9uLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybS52YWx1ZS50b0xvd2VyQ2FzZSlcbi8vICAgICB9KVxuLy8gfSlcblxuY29uc3QgdGFiID0gcmVmKFwiZGFzaGJvYXJkXCIpO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiIHNjb3BlZD5cbi5lbGVnYW50LWNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQ6ICNmN2Y4ZmM7XG4gIHBhZGRpbmc6IDJyZW07XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbn1cbi5teS12aXJ0dWFsLXNjcm9sbCB7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7IC8qIEVuc3VyZSBob3Jpem9udGFsIHNjcm9sbCBpcyBtYWludGFpbmVkICovXG59XG5cbi51c2VyLWNhcmQge1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGNvbG9yOiAjMzMzO1xuICBib3gtc2hhZG93OiAwcHggMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xufVxuLnVzZXItdGFiIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXItcmFkaXVzOiBub25lO1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzMzMztcbiAgYm94LXNoYWRvdzogMHB4IDNweCA3cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLCBib3gtc2hhZG93IDAuM3MgZWFzZTtcbn1cblxuLnVzZXItYnV0dG9uIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XG59XG5cbi51c2VyLWJ1dHRvbjpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KTtcbiAgYm94LXNoYWRvdzogMHB4IDZweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG5cbi8qIEN1c3RvbSBzdHlsaW5nIGZvciBncmlkICovXG4ucS10YWJsZSAucS1wYS1tZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLmNhcmQtZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZmlsbCwgbWluKDcwcHgsIDFmciksIG1heCgxNTBweCwgMWZyKSk7XG4gIGdhcDogMjBweDtcbn1cbi5teS1jYXJkIHtcbiAgbWFyZ2luOiA4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHZlcnRpY2FsLWFsaWduOiB0b3A7IC8qIEFsaWduIGNhcmRzIGF0IHRoZSB0b3AgKi9cbiAgd2lkdGg6IGF1dG87XG4gIG1pbi13aWR0aDogMTUwcHg7IC8qIE9wdGlvbmFsOiBTZXQgYSBtaW5pbXVtIHdpZHRoIGlmIG5lZWRlZCAqL1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7IC8qIE9wdGlvbmFsOiBBZGQgc3BhY2UgYmV0d2VlbiBjYXJkcyAqL1xufVxuXG4ubXktdmlydHVhbC1zY3JvbGwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBvdmVyZmxvdy14OiBhdXRvO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG4ubXktdmlydHVhbC1zY3JvbGwgLnEtY2FyZCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcbn1cblxuLm15LWNlbnRlci10ZXh0IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJwZGZNYWtlLnZmcyIsInBkZkZvbnRzLmRlZmF1bHQiLCJkYXRlIiwiR0JfTE9HTyIsInBkZk1ha2UuY3JlYXRlUGRmIiwibWludXRlcyIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJkdHJSb3ciXSwibWFwcGluZ3MiOiI7Ozs7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Q04sVUFBVTtBQUFBLFFBQ1YsT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsUUFBUSxDQUFDLFFBQVEsV0FBVyxHQUFHO0FBQUEsTUFDaEM7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixVQUFVO0FBQUEsUUFDVixPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxRQUFRLENBQUMsUUFBUSxXQUFXLEdBQUc7QUFBQSxNQUNoQztBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLFVBQVU7QUFBQSxRQUNWLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxNQUVSO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLFFBQ1YsT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsUUFBUSxDQUFDLFFBQVEsV0FBVyxHQUFHO0FBQUEsTUFDaEM7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixVQUFVO0FBQUEsUUFDVixPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxRQUFRLENBQUMsUUFBUSxXQUFXLEdBQUc7QUFBQSxNQUNoQztBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLFVBQVU7QUFBQSxRQUNWLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLFFBQVEsQ0FBQyxRQUFRLFdBQVcsR0FBRztBQUFBLE1BQ2hDO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLFFBQ1YsT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsUUFBUSxDQUFDLFFBQVEsV0FBVyxHQUFHO0FBQUEsTUFDaEM7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixVQUFVO0FBQUEsUUFDVixP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QUFBLFFBQ1YsT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLE1BQ1Q7QUFBQSxNQUNEO0FBQUEsUUFDRSxJQUFJO0FBQUEsUUFDSixNQUFNO0FBQUEsUUFDTixVQUFVO0FBQUEsUUFDVixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsTUFDVDtBQUFBLE1BQ0Q7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLE1BQU07QUFBQSxRQUNOLFVBQVU7QUFBQSxRQUNWLE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxNQUNUO0FBQUEsTUFDRDtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLFFBQ1YsT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLE1BQ1Q7QUFBQSxNQUNEO0FBQUEsUUFDRSxJQUFJO0FBQUEsUUFDSixNQUFNO0FBQUEsUUFDTixVQUFVO0FBQUEsUUFDVixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsTUFDVDtBQUFBLE1BQ0Q7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLE1BQU07QUFBQSxRQUNOLFVBQVU7QUFBQSxRQUNWLE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxNQUNUO0FBQUEsTUFDRDtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLFFBQ1YsT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLE1BQ1Q7QUFBQSxNQUNEO0FBQUEsUUFDRSxJQUFJO0FBQUEsUUFDSixNQUFNO0FBQUEsUUFDTixVQUFVO0FBQUEsUUFDVixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsTUFDVDtBQUFBLE1BQ0Q7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLE1BQU07QUFBQSxRQUNOLFVBQVU7QUFBQSxRQUNWLE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxNQUNUO0FBQUEsTUFDRDtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLFFBQ1YsT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLE1BQ1Q7QUFBQSxJQUNILENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFIMkIsUUFBTTtBQU1mLFFBQUksRUFBRTtBQVF6QixVQUFNLE1BQU0sSUFBSSxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
