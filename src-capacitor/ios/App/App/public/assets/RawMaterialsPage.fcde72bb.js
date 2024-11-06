import { _ as _export_sfc, n as ref, g as computed, u as watch, z as onMounted, o as openBlock, a4 as createElementBlock, J as createBaseVNode, a as createVNode, w as withCtx, c as createBlock, L as QIcon, br as QSpinner, K as QInput, aL as normalizeClass, a1 as createTextVNode, a0 as toDisplayString, be as createCommentVNode, Q as QCard, I as QCardSection } from "./index.9b9dbcba.js";
import { Q as QBadge } from "./QBadge.cf1023ef.js";
import { Q as QChip } from "./QChip.d5fc407c.js";
import { a as QTd, b as QTable } from "./QTable.0bf3c36f.js";
import { Q as QBanner } from "./QBanner.c0e0fb73.js";
import { u as useBakerReportsStore } from "./baker-report.c43048c5.js";
import "./QVirtualScroll.3c7f7fea.js";
import "./QList.8d472d75.js";
import "./rtl.276c3f1b.js";
import "./QItemLabel.345b9721.js";
import "./QItem.79579b05.js";
import "./QMenu.d2cee634.js";
import "./format.76edee29.js";
import "./axios.91431b0b.js";
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
    var _a;
    const pagination = ref({
      rowsPerPage: 0
    });
    const filter = ref("");
    const loadingSearchIcon = ref(false);
    const loading = ref(true);
    const bakerReportStore = useBakerReportsStore();
    const userData = computed(() => bakerReportStore.user);
    const branchId = ((_a = userData.value) == null ? void 0 : _a.data.branch_employee.branch_id) || "";
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
          var _a2, _b;
          return (_b = (_a2 = row == null ? void 0 : row.ingredients) == null ? void 0 : _a2.code) != null ? _b : "No Code";
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
var RawMaterialsTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-4f6efffb"], ["__file", "RawMaterialsTable.vue"]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmF3TWF0ZXJpYWxzUGFnZS5mY2RlNzJiYi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL2JyYW5jaC9iYWtlci9yYXdfbWF0ZXJpYWxzL2NvbXBvbmVudHMvUmF3TWF0ZXJpYWxzVGFibGUudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInEtZ3V0dGVyLW1kXCI+XG4gICAgPGRpdj5cbiAgICAgIDxxLWlucHV0XG4gICAgICAgIHJvdW5kZWRcbiAgICAgICAgb3V0bGluZWRcbiAgICAgICAgZGVuc2VcbiAgICAgICAgZGVib3VuY2U9XCIzMDBcIlxuICAgICAgICB2LW1vZGVsPVwiZmlsdGVyXCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgICBzdHlsZT1cIndpZHRoOiA1MDBweDsgbWF4LXdpZHRoOiAxNTAwcHg7IG1pbi13aWR0aDogMTAwcHhcIlxuICAgICAgPlxuICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgICA8cS1pY29uIHYtaWY9XCIhbG9hZGluZ1NlYXJjaEljb25cIiBuYW1lPVwic2VhcmNoXCIgLz5cbiAgICAgICAgICA8cS1zcGlubmVyIHYtZWxzZSAvPlxuICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgPC9xLWlucHV0PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInRhYmxlLWNvbnRhaW5lclwiPlxuICAgICAgPHEtdGFibGVcbiAgICAgICAgY2xhc3M9XCJzdGlja3ktaGVhZGVyXCJcbiAgICAgICAgOmZpbHRlcj1cImZpbHRlclwiXG4gICAgICAgIDp2aXJ0dWFsLXNjcm9sbC1zdGlja3ktc2l6ZS1zdGFydD1cIjQ4XCJcbiAgICAgICAgZmxhdFxuICAgICAgICBzdHlsZT1cImhlaWdodDogMzUwcHhcIlxuICAgICAgICA6Y29sdW1ucz1cInJhd01hdGVyaWFsc1N0YXR1c0NvbHVtbnNcIlxuICAgICAgICA6cm93cz1cImZpbHRlcmVkUm93c1wiXG4gICAgICAgIHJvdy1rZXk9XCJuYW1lXCJcbiAgICAgICAgdmlydHVhbC1zY3JvbGxcbiAgICAgICAgdi1tb2RlbDpwYWdpbmF0aW9uPVwicGFnaW5hdGlvblwiXG4gICAgICAgIDpyb3dzLXBlci1wYWdlLW9wdGlvbnM9XCJbMF1cIlxuICAgICAgICBoaWRlLWJvdHRvbVxuICAgICAgPlxuICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC10b3RhbF9xdWFudGl0eT1cInByb3BzXCI+XG4gICAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICAgIDxxLWNoaXBcbiAgICAgICAgICAgICAgc3F1YXJlXG4gICAgICAgICAgICAgIGNsYXNzPVwidGV4dC13aGl0ZVwiXG4gICAgICAgICAgICAgIDpjbGFzcz1cImdldFJhd01hdGVyaWFsQmFkZ2VDb2xvcihwcm9wcy5yb3cpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3sgZm9ybWF0VG90YWxRdWFudGl0eShwcm9wcy5yb3cpIH19XG4gICAgICAgICAgICA8L3EtY2hpcD5cbiAgICAgICAgICA8L3EtdGQ+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8L3EtdGFibGU+XG4gICAgICA8ZGl2XG4gICAgICAgIHYtaWY9XCJsb2FkaW5nXCJcbiAgICAgICAgY2xhc3M9XCJsb2FkaW5nLW92ZXJsYXkgcm93IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlclwiXG4gICAgICA+XG4gICAgICAgIDxxLXNwaW5uZXIgc2l6ZT1cIjUwcHhcIiAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIHYtaWY9XCJzaG93Tm9EYXRhTWVzc2FnZVwiXG4gICAgICAgIGNsYXNzPVwicS1wYS1tZCBxLWd1dHRlci1tZCByb3cganVzdGlmeS1jZW50ZXJcIlxuICAgICAgPlxuICAgICAgICA8cS1iYW5uZXIgY2xhc3M9XCJiZy1ncmV5LTFcIiBkZW5zZT4gTm8gZGF0YSBhdmFpbGFibGUgPC9xLWJhbm5lcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyB1c2VCYWtlclJlcG9ydHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL2Jha2VyLXJlcG9ydFwiO1xuaW1wb3J0IHsgY29tcHV0ZWQsIG9uTW91bnRlZCwgcmVmLCB3YXRjaCB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgcGFnaW5hdGlvbiA9IHJlZih7XG4gIHJvd3NQZXJQYWdlOiAwLFxufSk7XG5jb25zdCBmaWx0ZXIgPSByZWYoXCJcIik7XG5jb25zdCBsb2FkaW5nU2VhcmNoSWNvbiA9IHJlZihmYWxzZSk7XG5jb25zdCBsb2FkaW5nID0gcmVmKHRydWUpO1xuY29uc3QgYmFrZXJSZXBvcnRTdG9yZSA9IHVzZUJha2VyUmVwb3J0c1N0b3JlKCk7XG5jb25zdCB1c2VyRGF0YSA9IGNvbXB1dGVkKCgpID0+IGJha2VyUmVwb3J0U3RvcmUudXNlcik7XG5jb25zdCBicmFuY2hJZCA9IHVzZXJEYXRhLnZhbHVlPy5kYXRhLmJyYW5jaF9lbXBsb3llZS5icmFuY2hfaWQgfHwgXCJcIjtcbmNvbnN0IHJhd01hdGVyaWFsc1JvdyA9IGNvbXB1dGVkKCgpID0+IGJha2VyUmVwb3J0U3RvcmUucmF3bWF0ZXJpYWxzKTtcbmNvbnN0IHNob3dOb0RhdGFNZXNzYWdlID0gcmVmKGZhbHNlKTtcblxud2F0Y2goZmlsdGVyLCBhc3luYyAobmV3RmlsdGVyKSA9PiB7XG4gIGxvYWRpbmdTZWFyY2hJY29uLnZhbHVlID0gdHJ1ZTtcbiAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpO1xuICBsb2FkaW5nU2VhcmNoSWNvbi52YWx1ZSA9IGZhbHNlO1xuICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9ICFsb2FkaW5nLnZhbHVlICYmIGZpbHRlcmVkUm93cy52YWx1ZS5sZW5ndGggPT09IDA7XG4gIGNvbnNvbGUubG9nKFwiRmlsdGVyZWQgUm93czpcIiwgZmlsdGVyZWRSb3dzLnZhbHVlKTtcbn0pO1xuXG5vbk1vdW50ZWQoYXN5bmMgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhcInByb3BzLmJyYW5jaElkIGluIG9uTW91bnRlZDpcIiwgYnJhbmNoSWQpO1xuICBpZiAoYnJhbmNoSWQpIHtcbiAgICBhd2FpdCByZWxvYWRUYWJsZURhdGEoYnJhbmNoSWQpO1xuICB9XG59KTtcblxuY29uc3QgcmVsb2FkVGFibGVEYXRhID0gYXN5bmMgKGJyYW5jaElkKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiRmV0Y2hpbmcgcHJvZHVjdHMgZm9yIGJyYW5jaCBJRDpcIiwgYnJhbmNoSWQpO1xuICB0cnkge1xuICAgIGxvYWRpbmcudmFsdWUgPSB0cnVlO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYmFrZXJSZXBvcnRTdG9yZS5mZXRjaEJyYW5jaFJhd01hdGVyaWFscyhicmFuY2hJZCk7XG4gICAgcmF3TWF0ZXJpYWxzUm93LnZhbHVlID0gcmVzcG9uc2U7XG4gICAgaWYgKCFyYXdNYXRlcmlhbHNSb3cudmFsdWUubGVuZ3RoKSB7XG4gICAgICBzaG93Tm9EYXRhTWVzc2FnZS52YWx1ZSA9IHRydWU7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiQnJhbmNoIFJhdyBNYXRlcmlhbHNcIiwgcmF3TWF0ZXJpYWxzUm93LnZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVycm9yIGZldGNoaW5nIGJyYW5jaCBwcm9kdWN0OlwiLCBlcnJvcik7XG4gICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSB0cnVlO1xuICB9IGZpbmFsbHkge1xuICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgZmlsdGVyZWRSb3dzID0gY29tcHV0ZWQoKCkgPT4ge1xuICBpZiAoIWZpbHRlci52YWx1ZSkge1xuICAgIHJldHVybiByYXdNYXRlcmlhbHNSb3cudmFsdWU7XG4gIH1cbiAgY29uc3QgZmlsdGVyVGV4dCA9IGZpbHRlci52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gcmF3TWF0ZXJpYWxzUm93LnZhbHVlLmZpbHRlcigocm93KSA9PlxuICAgIHJvdy5pbmdyZWRpZW50cy5jb2RlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyVGV4dClcbiAgKTtcbn0pO1xuXG5jb25zdCByYXdNYXRlcmlhbHNTdGF0dXNDb2x1bW5zID0gW1xuICB7XG4gICAgbmFtZTogXCJjb2RlXCIsXG4gICAgbGFiZWw6IFwiQ29kZVwiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiAocm93KSA9PiByb3c/LmluZ3JlZGllbnRzPy5jb2RlID8/IFwiTm8gQ29kZVwiLFxuICAgIGZvcm1hdDogKHZhbCkgPT4gYCR7dmFsfWAsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInRvdGFsX3F1YW50aXR5XCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgbGFiZWw6IFwiQXZhaWxhYmxlIFN0b2Nrc1wiLFxuICAgIGZpZWxkOiBcInRvdGFsX3F1YW50aXR5XCIsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG5dO1xuXG5jb25zdCBnZXRSYXdNYXRlcmlhbEJhZGdlQ29sb3IgPSAocm93KSA9PiB7XG4gIGNvbnN0IHRvdGFsUXVhbnRpdHkgPSByb3cudG90YWxfcXVhbnRpdHk7XG4gIGNvbnN0IHVuaXQgPSByb3cuaW5ncmVkaWVudHMudW5pdDtcbiAgaWYgKHVuaXQgPT09IFwiR3JhbXNcIiAmJiB0b3RhbFF1YW50aXR5IDwgMTAwMCkge1xuICAgIHJldHVybiBcImJnLXJlZFwiO1xuICB9XG5cbiAgbGV0IHN0b2NrVmFsdWU7XG4gIGlmICh0b3RhbFF1YW50aXR5ID49IDEwMDApIHtcbiAgICBzdG9ja1ZhbHVlID0gdG90YWxRdWFudGl0eSAvIDEwMDA7XG4gIH0gZWxzZSB7XG4gICAgc3RvY2tWYWx1ZSA9IHRvdGFsUXVhbnRpdHk7XG4gIH1cblxuICBpZiAoc3RvY2tWYWx1ZSA8IDUpIHtcbiAgICBpZiAoc3RvY2tWYWx1ZSA8PSAyKSB7XG4gICAgICByZXR1cm4gXCJiZy1yZWRcIjtcbiAgICB9IGVsc2UgaWYgKHN0b2NrVmFsdWUgPD0gMykge1xuICAgICAgcmV0dXJuIFwiYmctd2FybmluZ1wiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJiZy13YXJuaW5nXCI7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBcImJnLXBvc2l0aXZlXCI7XG4gIH1cbn07XG5cbmNvbnN0IGZvcm1hdFRvdGFsUXVhbnRpdHkgPSAocm93KSA9PiB7XG4gIGNvbnN0IHRvdGFsUXVhbnRpdHkgPSByb3cudG90YWxfcXVhbnRpdHk7XG4gIGNvbnN0IHVuaXQgPSByb3cuaW5ncmVkaWVudHMudW5pdDtcblxuICBpZiAodG90YWxRdWFudGl0eSA+IDEwMDApIHtcbiAgICBjb25zdCB0b3RhbFF1YW50aXR5S2lsbyA9ICh0b3RhbFF1YW50aXR5IC8gMTAwMCkudG9GaXhlZCgyKTtcbiAgICBpZiAodG90YWxRdWFudGl0eUtpbG8uZW5kc1dpdGgoXCIuMDBcIikpIHtcbiAgICAgIHJldHVybiBgJHtNYXRoLnJvdW5kKHRvdGFsUXVhbnRpdHkgLyAxMDAwKX0ga2lsb3NgO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCR7dG90YWxRdWFudGl0eUtpbG99IGtpbG9zYDtcbiAgICB9XG4gIH0gZWxzZSBpZiAodG90YWxRdWFudGl0eSA+IDEpIHtcbiAgICByZXR1cm4gYCR7dG90YWxRdWFudGl0eX0gJHt1bml0fWA7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGAke3RvdGFsUXVhbnRpdHl9ICR7dW5pdH1gO1xuICB9XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4udGFibGUtY29udGFpbmVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4ubG9hZGluZy1vdmVybGF5IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KTtcbiAgei1pbmRleDogMTtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiYnJhbmNoSWQiLCJfYSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrRUEsVUFBTSxhQUFhLElBQUk7QUFBQSxNQUNyQixhQUFhO0FBQUEsSUFDZixDQUFDO0FBQ0QsVUFBTSxTQUFTLElBQUksRUFBRTtBQUNyQixVQUFNLG9CQUFvQixJQUFJLEtBQUs7QUFDbkMsVUFBTSxVQUFVLElBQUksSUFBSTtBQUN4QixVQUFNLG1CQUFtQixxQkFBb0I7QUFDN0MsVUFBTSxXQUFXLFNBQVMsTUFBTSxpQkFBaUIsSUFBSTtBQUNyRCxVQUFNLGFBQVcsY0FBUyxVQUFULG1CQUFnQixLQUFLLGdCQUFnQixjQUFhO0FBQ25FLFVBQU0sa0JBQWtCLFNBQVMsTUFBTSxpQkFBaUIsWUFBWTtBQUNwRSxVQUFNLG9CQUFvQixJQUFJLEtBQUs7QUFFbkMsVUFBTSxRQUFRLE9BQU8sY0FBYztBQUNqQyx3QkFBa0IsUUFBUTtBQUMxQixZQUFNLElBQUksUUFBUSxDQUFDLFlBQVksV0FBVyxTQUFTLEdBQUksQ0FBQztBQUN4RCx3QkFBa0IsUUFBUTtBQUMxQix3QkFBa0IsUUFBUSxDQUFDLFFBQVEsU0FBUyxhQUFhLE1BQU0sV0FBVztBQUMxRSxjQUFRLElBQUksa0JBQWtCLGFBQWEsS0FBSztBQUFBLElBQ2xELENBQUM7QUFFRCxjQUFVLFlBQVk7QUFDcEIsY0FBUSxJQUFJLGdDQUFnQyxRQUFRO0FBQ3BELFVBQUksVUFBVTtBQUNaLGNBQU0sZ0JBQWdCLFFBQVE7QUFBQSxNQUMvQjtBQUFBLElBQ0gsQ0FBQztBQUVELFVBQU0sa0JBQWtCLE9BQU9BLGNBQWE7QUFDMUMsY0FBUSxJQUFJLG9D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
