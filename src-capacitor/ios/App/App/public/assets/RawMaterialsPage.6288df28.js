import { _ as _export_sfc, n as ref, g as computed, u as watch, z as onMounted, o as openBlock, a4 as createElementBlock, J as createBaseVNode, a as createVNode, w as withCtx, c as createBlock, L as QIcon, bd as QSpinner, K as QInput, aL as normalizeClass, O as createTextVNode, R as toDisplayString, be as createCommentVNode, Q as QCard, I as QCardSection } from "./index.c8e2405b.js";
import { Q as QBadge } from "./QBadge.49245359.js";
import { a as QChip } from "./QSelect.0985e28e.js";
import { Q as QTd } from "./QTd.f597934c.js";
import { Q as QTable } from "./QTable.d3fb87f5.js";
import { Q as QBanner } from "./QBanner.bd2edaf0.js";
import { u as useBakerReportsStore } from "./baker-report.4c6e60f9.js";
import "./rtl.b1b38f21.js";
import "./QItem.76557ad9.js";
import "./QMenu.4f670399.js";
import "./selection.94057980.js";
import "./use-virtual-scroll.5b4ab88d.js";
import "./QVirtualScroll.41a98cb7.js";
import "./QList.d5d13fac.js";
import "./axios.aa1bce92.js";
var RawMaterialsTable_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$1 = { class: "q-gutter-md" };
const _hoisted_2$1 = { class: "table-container" };
const _hoisted_3 = {
  key: 0,
  class: "loading-overlay row justify-center items-center"
};
const _hoisted_4 = {
  key: 1,
  class: "q-pa-md q-gutter-md row justify-center"
};
const _sfc_main$1 = {
  __name: "RawMaterialsTable",
  setup(__props) {
    var _a, _b, _c;
    const pagination = ref({
      rowsPerPage: 0
    });
    const filter = ref("");
    const loadingSearchIcon = ref(false);
    const loading = ref(true);
    const bakerReportStore = useBakerReportsStore();
    const userData = computed(() => bakerReportStore.user);
    const branchId = ((_c = (_b = (_a = userData.value) == null ? void 0 : _a.data) == null ? void 0 : _b.employee) == null ? void 0 : _c.branch_employee.branch_id) || "";
    const rawMaterialsRow = computed(() => bakerReportStore.rawmaterials);
    const showNoDataMessage = ref(false);
    watch(filter, async (newFilter) => {
      loadingSearchIcon.value = true;
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      loadingSearchIcon.value = false;
      showNoDataMessage.value = !loading.value && filteredRows.value.length === 0;
      console.log("Filtered Rows:", filteredRows.value);
    });
    onMounted(async () => {
      console.log("props.branchId in onMounted:", branchId);
      if (branchId) {
        await reloadTableData(branchId);
      }
    });
    const reloadTableData = async (branchId2) => {
      console.log("Fetching products for branch ID:", branchId2);
      try {
        loading.value = true;
        const response = await bakerReportStore.fetchBranchRawMaterials(branchId2);
        rawMaterialsRow.value = response;
        if (!rawMaterialsRow.value.length) {
          showNoDataMessage.value = true;
        }
        console.log("Branch Raw Materials", rawMaterialsRow.value);
      } catch (error) {
        console.log("Error fetching branch product:", error);
        showNoDataMessage.value = true;
      } finally {
        loading.value = false;
      }
    };
    const filteredRows = computed(() => {
      if (!filter.value) {
        return rawMaterialsRow.value;
      }
      const filterText = filter.value.toLowerCase();
      return rawMaterialsRow.value.filter(
        (row) => row.ingredients.code.toLowerCase().includes(filterText)
      );
    });
    const rawMaterialsStatusColumns = [
      {
        name: "code",
        label: "Code",
        align: "center",
        field: (row) => {
          var _a2, _b2;
          return (_b2 = (_a2 = row == null ? void 0 : row.ingredients) == null ? void 0 : _a2.code) != null ? _b2 : "No Code";
        },
        format: (val) => `${val}`,
        sortable: true
      },
      {
        name: "total_quantity",
        align: "center",
        label: "Available Stocks",
        field: "total_quantity",
        sortable: true
      }
    ];
    const getRawMaterialBadgeColor = (row) => {
      const totalQuantity = row.total_quantity;
      const unit = row.ingredients.unit;
      if (unit === "Grams" && totalQuantity < 1e3) {
        return "bg-red";
      }
      let stockValue;
      if (totalQuantity >= 1e3) {
        stockValue = totalQuantity / 1e3;
      } else {
        stockValue = totalQuantity;
      }
      if (stockValue < 5) {
        if (stockValue <= 2) {
          return "bg-red";
        } else if (stockValue <= 3) {
          return "bg-warning";
        } else {
          return "bg-warning";
        }
      } else {
        return "bg-positive";
      }
    };
    const formatTotalQuantity = (row) => {
      const totalQuantity = row.total_quantity;
      const unit = row.ingredients.unit;
      if (totalQuantity > 1e3) {
        const totalQuantityKilo = (totalQuantity / 1e3).toFixed(2);
        if (totalQuantityKilo.endsWith(".00")) {
          return `${Math.round(totalQuantity / 1e3)} kilos`;
        } else {
          return `${totalQuantityKilo} kilos`;
        }
      } else if (totalQuantity > 1) {
        return `${totalQuantity} ${unit}`;
      } else {
        return `${totalQuantity} ${unit}`;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", null, [
          createVNode(QInput, {
            rounded: "",
            outlined: "",
            dense: "",
            debounce: "300",
            modelValue: filter.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filter.value = $event),
            placeholder: "Search",
            style: { "width": "500px", "max-width": "1500px", "min-width": "100px" }
          }, {
            append: withCtx(() => [
              !loadingSearchIcon.value ? (openBlock(), createBlock(QIcon, {
                key: 0,
                name: "search"
              })) : (openBlock(), createBlock(QSpinner, { key: 1 }))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        createBaseVNode("div", _hoisted_2$1, [
          createVNode(QTable, {
            class: "sticky-header",
            filter: filter.value,
            "virtual-scroll-sticky-size-start": 48,
            flat: "",
            style: { "height": "350px" },
            columns: rawMaterialsStatusColumns,
            rows: filteredRows.value,
            "row-key": "name",
            "virtual-scroll": "",
            pagination: pagination.value,
            "onUpdate:pagination": _cache[1] || (_cache[1] = ($event) => pagination.value = $event),
            "rows-per-page-options": [0],
            "hide-bottom": ""
          }, {
            "body-cell-total_quantity": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createVNode(QChip, {
                    square: "",
                    class: normalizeClass(["text-white", getRawMaterialBadgeColor(props.row)])
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(formatTotalQuantity(props.row)), 1)
                    ]),
                    _: 2
                  }, 1032, ["class"])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            _: 1
          }, 8, ["filter", "rows", "pagination"]),
          loading.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
            createVNode(QSpinner, { size: "50px" })
          ])) : createCommentVNode("", true),
          showNoDataMessage.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
            createVNode(QBanner, {
              class: "bg-grey-1",
              dense: ""
            }, {
              default: withCtx(() => [
                createTextVNode(" No data available ")
              ]),
              _: 1
            })
          ])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
};
var RawMaterialsTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e2c2d882"], ["__file", "RawMaterialsTable.vue"]]);
const _hoisted_1 = { class: "text-h6 text-white" };
const _hoisted_2 = { class: "q-gutter-x-sm" };
const _sfc_main = {
  __name: "RawMaterialsPage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QCard, { flat: "" }, {
        default: withCtx(() => [
          createVNode(QCardSection, { style: { "background-color": "#ef4444" } }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                createVNode(QIcon, { name: "fa-solid fa-layer-group" }),
                createTextVNode(" Raw Materials ")
              ])
            ]),
            _: 1
          }),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_2, [
                createVNode(QBadge, {
                  label: "Good",
                  class: "text-white",
                  color: "positive"
                }),
                createVNode(QBadge, {
                  label: "Warning",
                  class: "text-white",
                  color: "warning"
                }),
                createVNode(QBadge, {
                  label: "Danger",
                  class: "text-white",
                  color: "red"
                })
              ])
            ]),
            _: 1
          }),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", null, [
                createVNode(RawMaterialsTable)
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
var RawMaterialsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "RawMaterialsPage.vue"]]);
export { RawMaterialsPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmF3TWF0ZXJpYWxzUGFnZS42Mjg4ZGYyOC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9iYWtlci9yYXdfbWF0ZXJpYWxzL2NvbXBvbmVudHMvUmF3TWF0ZXJpYWxzVGFibGUudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLW1kXCI+XG4gICAgPGRpdj5cbiAgICAgIDxxLWlucHV0XG4gICAgICAgIHJvdW5kZWRcbiAgICAgICAgb3V0bGluZWRcbiAgICAgICAgZGVuc2VcbiAgICAgICAgZGVib3VuY2U9XCIzMDBcIlxuICAgICAgICB2LW1vZGVsPVwiZmlsdGVyXCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgICBzdHlsZT1cIndpZHRoOiA1MDBweDsgbWF4LXdpZHRoOiAxNTAwcHg7IG1pbi13aWR0aDogMTAwcHhcIlxuICAgICAgPlxuICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgICA8cS1pY29uIHYtaWY9XCIhbG9hZGluZ1NlYXJjaEljb25cIiBuYW1lPVwic2VhcmNoXCIgLz5cbiAgICAgICAgICA8cS1zcGlubmVyIHYtZWxzZSAvPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgPC9xLWlucHV0PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInRhYmxlLWNvbnRhaW5lclwiPlxuICAgICAgPHEtdGFibGVcbiAgICAgICAgY2xhc3M9XCJzdGlja3ktaGVhZGVyXCJcbiAgICAgICAgOmZpbHRlcj1cImZpbHRlclwiXG4gICAgICAgIDp2aXJ0dWFsLXNjcm9sbC1zdGlja3ktc2l6ZS1zdGFydD1cIjQ4XCJcbiAgICAgICAgZmxhdFxuICAgICAgICBzdHlsZT1cImhlaWdodDogMzUwcHhcIlxuICAgICAgICA6Y29sdW1ucz1cInJhd01hdGVyaWFsc1N0YXR1c0NvbHVtbnNcIlxuICAgICAgICA6cm93cz1cImZpbHRlcmVkUm93c1wiXG4gICAgICAgIHJvdy1rZXk9XCJuYW1lXCJcbiAgICAgICAgdmlydHVhbC1zY3JvbGxcbiAgICAgICAgdi1tb2RlbDpwYWdpbmF0aW9uPVwicGFnaW5hdGlvblwiXG4gICAgICAgIDpyb3dzLXBlci1wYWdlLW9wdGlvbnM9XCJbMF1cIlxuICAgICAgICBoaWRlLWJvdHRvbVxuICAgICAgPlxuICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC10b3RhbF9xdWFudGl0eT1cInByb3BzXCI+XG4gICAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICAgIDxxLWNoaXBcbiAgICAgICAgICAgICAgc3F1YXJlXG4gICAgICAgICAgICAgIGNsYXNzPVwidGV4dC13aGl0ZVwiXG4gICAgICAgICAgICAgIDpjbGFzcz1cImdldFJhd01hdGVyaWFsQmFkZ2VDb2xvcihwcm9wcy5yb3cpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3sgZm9ybWF0VG90YWxRdWFudGl0eShwcm9wcy5yb3cpIH19XG4gICAgICAgICAgICA8L3EtY2hpcD5cbiAgICAgICAgICA8L3EtdGQ+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8L3EtdGFibGU+XG4gICAgICA8ZGl2XG4gICAgICAgIHYtaWY9XCJsb2FkaW5nXCJcbiAgICAgICAgY2xhc3M9XCJsb2FkaW5nLW92ZXJsYXkgcm93IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlclwiXG4gICAgICA+XG4gICAgICAgIDxxLXNwaW5uZXIgc2l6ZT1cIjUwcHhcIiAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIHYtaWY9XCJzaG93Tm9EYXRhTWVzc2FnZVwiXG4gICAgICAgIGNsYXNzPVwicS1wYS1tZCBxLWd1dHRlci1tZCByb3cganVzdGlmeS1jZW50ZXJcIlxuICAgICAgPlxuICAgICAgICA8cS1iYW5uZXIgY2xhc3M9XCJiZy1ncmV5LTFcIiBkZW5zZT4gTm8gZGF0YSBhdmFpbGFibGUgPC9xLWJhbm5lcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VCYWtlclJlcG9ydHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2Jha2VyLXJlcG9ydFwiO1xuaW1wb3J0IHsgY29tcHV0ZWQsIG9uTW91bnRlZCwgcmVmLCB3YXRjaCB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgcGFnaW5hdGlvbiA9IHJlZih7XG4gIHJvd3NQZXJQYWdlOiAwLFxufSk7XG5jb25zdCBmaWx0ZXIgPSByZWYoXCJcIik7XG5jb25zdCBsb2FkaW5nU2VhcmNoSWNvbiA9IHJlZihmYWxzZSk7XG5jb25zdCBsb2FkaW5nID0gcmVmKHRydWUpO1xuY29uc3QgYmFrZXJSZXBvcnRTdG9yZSA9IHVzZUJha2VyUmVwb3J0c1N0b3JlKCk7XG5jb25zdCB1c2VyRGF0YSA9IGNvbXB1dGVkKCgpID0+IGJha2VyUmVwb3J0U3RvcmUudXNlcik7XG5jb25zdCBicmFuY2hJZCA9XG4gIHVzZXJEYXRhLnZhbHVlPy5kYXRhPy5lbXBsb3llZT8uYnJhbmNoX2VtcGxveWVlLmJyYW5jaF9pZCB8fCBcIlwiO1xuY29uc3QgcmF3TWF0ZXJpYWxzUm93ID0gY29tcHV0ZWQoKCkgPT4gYmFrZXJSZXBvcnRTdG9yZS5yYXdtYXRlcmlhbHMpO1xuY29uc3Qgc2hvd05vRGF0YU1lc3NhZ2UgPSByZWYoZmFsc2UpO1xuXG53YXRjaChmaWx0ZXIsIGFzeW5jIChuZXdGaWx0ZXIpID0+IHtcbiAgbG9hZGluZ1NlYXJjaEljb24udmFsdWUgPSB0cnVlO1xuICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKSk7XG4gIGxvYWRpbmdTZWFyY2hJY29uLnZhbHVlID0gZmFsc2U7XG4gIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gIWxvYWRpbmcudmFsdWUgJiYgZmlsdGVyZWRSb3dzLnZhbHVlLmxlbmd0aCA9PT0gMDtcbiAgY29uc29sZS5sb2coXCJGaWx0ZXJlZCBSb3dzOlwiLCBmaWx0ZXJlZFJvd3MudmFsdWUpO1xufSk7XG5cbm9uTW91bnRlZChhc3luYyAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwicHJvcHMuYnJhbmNoSWQgaW4gb25Nb3VudGVkOlwiLCBicmFuY2hJZCk7XG4gIGlmIChicmFuY2hJZCkge1xuICAgIGF3YWl0IHJlbG9hZFRhYmxlRGF0YShicmFuY2hJZCk7XG4gIH1cbn0pO1xuXG5jb25zdCByZWxvYWRUYWJsZURhdGEgPSBhc3luYyAoYnJhbmNoSWQpID0+IHtcbiAgY29uc29sZS5sb2coXCJGZXRjaGluZyBwcm9kdWN0cyBmb3IgYnJhbmNoIElEOlwiLCBicmFuY2hJZCk7XG4gIHRyeSB7XG4gICAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBiYWtlclJlcG9ydFN0b3JlLmZldGNoQnJhbmNoUmF3TWF0ZXJpYWxzKGJyYW5jaElkKTtcbiAgICByYXdNYXRlcmlhbHNSb3cudmFsdWUgPSByZXNwb25zZTtcbiAgICBpZiAoIXJhd01hdGVyaWFsc1Jvdy52YWx1ZS5sZW5ndGgpIHtcbiAgICAgIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gdHJ1ZTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJCcmFuY2ggUmF3IE1hdGVyaWFsc1wiLCByYXdNYXRlcmlhbHNSb3cudmFsdWUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZmV0Y2hpbmcgYnJhbmNoIHByb2R1Y3Q6XCIsIGVycm9yKTtcbiAgICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IHRydWU7XG4gIH0gZmluYWxseSB7XG4gICAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICB9XG59O1xuXG5jb25zdCBmaWx0ZXJlZFJvd3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmICghZmlsdGVyLnZhbHVlKSB7XG4gICAgcmV0dXJuIHJhd01hdGVyaWFsc1Jvdy52YWx1ZTtcbiAgfVxuICBjb25zdCBmaWx0ZXJUZXh0ID0gZmlsdGVyLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiByYXdNYXRlcmlhbHNSb3cudmFsdWUuZmlsdGVyKChyb3cpID0+XG4gICAgcm93LmluZ3JlZGllbnRzLmNvZGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmaWx0ZXJUZXh0KVxuICApO1xufSk7XG5cbmNvbnN0IHJhd01hdGVyaWFsc1N0YXR1c0NvbHVtbnMgPSBbXG4gIHtcbiAgICBuYW1lOiBcImNvZGVcIixcbiAgICBsYWJlbDogXCJDb2RlXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IChyb3cpID0+IHJvdz8uaW5ncmVkaWVudHM/LmNvZGUgPz8gXCJObyBDb2RlXCIsXG4gICAgZm9ybWF0OiAodmFsKSA9PiBgJHt2YWx9YCxcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwidG90YWxfcXVhbnRpdHlcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBsYWJlbDogXCJBdmFpbGFibGUgU3RvY2tzXCIsXG4gICAgZmllbGQ6IFwidG90YWxfcXVhbnRpdHlcIixcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbl07XG5cbmNvbnN0IGdldFJhd01hdGVyaWFsQmFkZ2VDb2xvciA9IChyb3cpID0+IHtcbiAgY29uc3QgdG90YWxRdWFudGl0eSA9IHJvdy50b3RhbF9xdWFudGl0eTtcbiAgY29uc3QgdW5pdCA9IHJvdy5pbmdyZWRpZW50cy51bml0O1xuICBpZiAodW5pdCA9PT0gXCJHcmFtc1wiICYmIHRvdGFsUXVhbnRpdHkgPCAxMDAwKSB7XG4gICAgcmV0dXJuIFwiYmctcmVkXCI7XG4gIH1cblxuICBsZXQgc3RvY2tWYWx1ZTtcbiAgaWYgKHRvdGFsUXVhbnRpdHkgPj0gMTAwMCkge1xuICAgIHN0b2NrVmFsdWUgPSB0b3RhbFF1YW50aXR5IC8gMTAwMDtcbiAgfSBlbHNlIHtcbiAgICBzdG9ja1ZhbHVlID0gdG90YWxRdWFudGl0eTtcbiAgfVxuXG4gIGlmIChzdG9ja1ZhbHVlIDwgNSkge1xuICAgIGlmIChzdG9ja1ZhbHVlIDw9IDIpIHtcbiAgICAgIHJldHVybiBcImJnLXJlZFwiO1xuICAgIH0gZWxzZSBpZiAoc3RvY2tWYWx1ZSA8PSAzKSB7XG4gICAgICByZXR1cm4gXCJiZy13YXJuaW5nXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBcImJnLXdhcm5pbmdcIjtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFwiYmctcG9zaXRpdmVcIjtcbiAgfVxufTtcblxuY29uc3QgZm9ybWF0VG90YWxRdWFudGl0eSA9IChyb3cpID0+IHtcbiAgY29uc3QgdG90YWxRdWFudGl0eSA9IHJvdy50b3RhbF9xdWFudGl0eTtcbiAgY29uc3QgdW5pdCA9IHJvdy5pbmdyZWRpZW50cy51bml0O1xuXG4gIGlmICh0b3RhbFF1YW50aXR5ID4gMTAwMCkge1xuICAgIGNvbnN0IHRvdGFsUXVhbnRpdHlLaWxvID0gKHRvdGFsUXVhbnRpdHkgLyAxMDAwKS50b0ZpeGVkKDIpO1xuICAgIGlmICh0b3RhbFF1YW50aXR5S2lsby5lbmRzV2l0aChcIi4wMFwiKSkge1xuICAgICAgcmV0dXJuIGAke01hdGgucm91bmQodG90YWxRdWFudGl0eSAvIDEwMDApfSBraWxvc2A7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgJHt0b3RhbFF1YW50aXR5S2lsb30ga2lsb3NgO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0b3RhbFF1YW50aXR5ID4gMSkge1xuICAgIHJldHVybiBgJHt0b3RhbFF1YW50aXR5fSAke3VuaXR9YDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYCR7dG90YWxRdWFudGl0eX0gJHt1bml0fWA7XG4gIH1cbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi50YWJsZS1jb250YWluZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5sb2FkaW5nLW92ZXJsYXkge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO1xuICB6LWluZGV4OiAxO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJicmFuY2hJZCIsIl9iIiwiX2EiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtFQSxVQUFNLGFBQWEsSUFBSTtBQUFBLE1BQ3JCLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFDRCxVQUFNLFNBQVMsSUFBSSxFQUFFO0FBQ3JCLFVBQU0sb0JBQW9CLElBQUksS0FBSztBQUNuQyxVQUFNLFVBQVUsSUFBSSxJQUFJO0FBQ3hCLFVBQU0sbUJBQW1CLHFCQUFvQjtBQUM3QyxVQUFNLFdBQVcsU0FBUyxNQUFNLGlCQUFpQixJQUFJO0FBQ3JELFVBQU0sYUFDSiwwQkFBUyxVQUFULG1CQUFnQixTQUFoQixtQkFBc0IsYUFBdEIsbUJBQWdDLGdCQUFnQixjQUFhO0FBQy9ELFVBQU0sa0JBQWtCLFNBQVMsTUFBTSxpQkFBaUIsWUFBWTtBQUNwRSxVQUFNLG9CQUFvQixJQUFJLEtBQUs7QUFFbkMsVUFBTSxRQUFRLE9BQU8sY0FBYztBQUNqQyx3QkFBa0IsUUFBUTtBQUMxQixZQUFNLElBQUksUUFBUSxDQUFDLFlBQVksV0FBVyxTQUFTLEdBQUksQ0FBQztBQUN4RCx3QkFBa0IsUUFBUTtBQUMxQix3QkFBa0IsUUFBUSxDQUFDLFFBQVEsU0FBUyxhQUFhLE1BQU0sV0FBVztBQUMxRSxjQUFRLElBQUksa0JBQWtCLGFBQWEsS0FBSztBQUFBLElBQ2xELENBQUM7QUFFRCxjQUFVLFlBQVk7QUFDcEIsY0FBUSxJQUFJLGdDQUFnQyxRQUFRO0FBQ3BELFVBQUksVUFBVTtBQUNaLGNBQU0sZ0JBQWdCLFFBQVE7QUFBQSxNQUMvQjtBQUFBLElBQ0gsQ0FBQztBQUVE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
