import { _ as _export_sfc, n as ref, o as openBlock, a4 as createElementBlock, a as createVNode, M as QBtn, w as withCtx, Q as QCard, O as createTextVNode, a3 as QDialog, a5 as Fragment, u as watch, J as createBaseVNode, c as createBlock, L as QIcon, K as QInput, I as QCardSection } from "./index.c8e2405b.js";
import { Q as QTd } from "./QTd.f597934c.js";
import { Q as QTable } from "./QTable.d3fb87f5.js";
import "./QVirtualScroll.41a98cb7.js";
import "./QList.d5d13fac.js";
import "./use-virtual-scroll.5b4ab88d.js";
import "./rtl.b1b38f21.js";
import "./QSelect.0985e28e.js";
import "./QItem.76557ad9.js";
import "./QMenu.4f670399.js";
import "./selection.94057980.js";
const _sfc_main$2 = {
  __name: "TransactionView",
  setup(__props) {
    const trandsactionsDialog = ref(false);
    const open_transactions_dialog = () => {
      trandsactionsDialog.value = true;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          color: "accent",
          icon: "visibility",
          size: "md",
          flat: "",
          round: "",
          dense: "",
          onClick: open_transactions_dialog
        }),
        createVNode(QDialog, {
          modelValue: trandsactionsDialog.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => trandsactionsDialog.value = $event)
        }, {
          default: withCtx(() => [
            createVNode(QCard, { class: "my-card" }, {
              default: withCtx(() => [
                createTextVNode(" this is a report dialog ")
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
var TransactionView = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "TransactionView.vue"]]);
const _sfc_main$1 = {
  __name: "TransactionTable",
  setup(__props) {
    const filter = ref("");
    const loadingSearchIcon = ref(true);
    watch(filter, () => {
      loadingSearchIcon.value = true;
      setTimeout(() => {
        loadingSearchIcon.value = false;
      });
    });
    const transactionListColumns = [
      {
        name: "name",
        label: "Transactions Name",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true
      },
      {
        name: "date",
        align: "center",
        label: "Date",
        field: "date",
        sortable: true
      },
      {
        name: "view",
        align: "right",
        label: "View",
        field: "view",
        sortable: true
      }
    ];
    const ransactionListRow = [
      {
        name: "Transactions 1",
        date: "4/4/24"
      },
      {
        name: "Transactions 2",
        date: "4/4/24"
      },
      {
        name: "Transactions 3",
        date: "4/4/24"
      },
      {
        name: "Transactions 4",
        date: "4/4/24"
      }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
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
              })) : (openBlock(), createBlock(QIcon, {
                key: 1,
                thickness: 2,
                color: "teal",
                size: "1em"
              }))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        createBaseVNode("div", null, [
          createVNode(QTable, {
            filter: filter.value,
            flat: "",
            columns: transactionListColumns,
            rows: ransactionListRow,
            "row-key": "name"
          }, {
            "body-cell-view": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("div", null, [
                    createVNode(TransactionView)
                  ])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            _: 1
          }, 8, ["filter"])
        ])
      ], 64);
    };
  }
};
var TransactionTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "TransactionTable.vue"]]);
const _hoisted_1 = { class: "text-h6 text-white" };
const _sfc_main = {
  __name: "TransactionPage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QCard, { flat: "" }, {
        default: withCtx(() => [
          createVNode(QCardSection, { style: { "background-color": "#ef4444" } }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                createVNode(QIcon, { name: "manufacturing" }),
                createTextVNode(" Transaction ")
              ])
            ]),
            _: 1
          }),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createVNode(TransactionTable)
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
var TransactionPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "TransactionPage.vue"]]);
export { TransactionPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNhY3Rpb25QYWdlLjBmNmI1NmQzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvYnJhbmNoL2Jha2VyL3RyYW5zYWN0aW9uL2NvbXBvbmVudHMvVHJhbnNhY3Rpb25WaWV3LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9icmFuY2gvYmFrZXIvdHJhbnNhY3Rpb24vY29tcG9uZW50cy9UcmFuc2FjdGlvblRhYmxlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLWJ0blxuICAgIGNvbG9yPVwiYWNjZW50XCJcbiAgICBpY29uPVwidmlzaWJpbGl0eVwiXG4gICAgc2l6ZT1cIm1kXCJcbiAgICBmbGF0XG4gICAgcm91bmRcbiAgICBkZW5zZVxuICAgIEBjbGljaz1cIm9wZW5fdHJhbnNhY3Rpb25zX2RpYWxvZ1wiXG4gID5cbiAgICA8IS0tIDxxLXRvb2x0aXAgY2xhc3M9XCJiZy1hY2NlbnRcIiA6ZGVsYXk9XCIyMDBcIj5WaWV3PC9xLXRvb2x0aXA+IC0tPlxuICA8L3EtYnRuPlxuICA8cS1kaWFsb2cgdi1tb2RlbD1cInRyYW5kc2FjdGlvbnNEaWFsb2dcIj5cbiAgICA8cS1jYXJkIGNsYXNzPVwibXktY2FyZFwiPiB0aGlzIGlzIGEgcmVwb3J0IGRpYWxvZyA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYgfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IHRyYW5kc2FjdGlvbnNEaWFsb2cgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBvcGVuX3RyYW5zYWN0aW9uc19kaWFsb2cgPSAoKSA9PiB7XG4gIHRyYW5kc2FjdGlvbnNEaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxxLWlucHV0XG4gICAgICByb3VuZGVkXG4gICAgICBvdXRsaW5lZFxuICAgICAgZGVuc2VcbiAgICAgIGRlYm91bmNlPVwiMzAwXCJcbiAgICAgIHYtbW9kZWw9XCJmaWx0ZXJcIlxuICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgc3R5bGU9XCJ3aWR0aDogNTAwcHg7IG1heC13aWR0aDogMTUwMHB4OyBtaW4td2lkdGg6IDEwMHB4XCJcbiAgICA+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgPHEtaWNvbiB2LWlmPVwiIWxvYWRpbmdTZWFyY2hJY29uXCIgbmFtZT1cInNlYXJjaFwiIC8+XG4gICAgICAgIDxxLWljb24gdi1lbHNlIDp0aGlja25lc3M9XCIyXCIgY29sb3I9XCJ0ZWFsXCIgc2l6ZT1cIjFlbVwiIC8+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS1pbnB1dD5cbiAgPC9kaXY+XG4gIDxkaXY+XG4gICAgPHEtdGFibGVcbiAgICAgIDpmaWx0ZXI9XCJmaWx0ZXJcIlxuICAgICAgZmxhdFxuICAgICAgOmNvbHVtbnM9XCJ0cmFuc2FjdGlvbkxpc3RDb2x1bW5zXCJcbiAgICAgIDpyb3dzPVwicmFuc2FjdGlvbkxpc3RSb3dcIlxuICAgICAgcm93LWtleT1cIm5hbWVcIlxuICAgID5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLXZpZXc9XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8VHJhbnNhY3Rpb25WaWV3IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9xLXRhYmxlPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVHJhbnNhY3Rpb25WaWV3IGZyb20gXCIuL1RyYW5zYWN0aW9uVmlldy52dWVcIjtcbmltcG9ydCB7IHJlZiwgd2F0Y2ggfSBmcm9tIFwidnVlXCI7XG5cbmNvbnN0IGZpbHRlciA9IHJlZihcIlwiKTtcbmNvbnN0IGxvYWRpbmdTZWFyY2hJY29uID0gcmVmKHRydWUpO1xuXG53YXRjaChmaWx0ZXIsICgpID0+IHtcbiAgbG9hZGluZ1NlYXJjaEljb24udmFsdWUgPSB0cnVlO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBsb2FkaW5nU2VhcmNoSWNvbi52YWx1ZSA9IGZhbHNlO1xuICB9KTtcbn0pO1xuXG5jb25zdCB0cmFuc2FjdGlvbkxpc3RDb2x1bW5zID0gW1xuICB7XG4gICAgbmFtZTogXCJuYW1lXCIsXG4gICAgbGFiZWw6IFwiVHJhbnNhY3Rpb25zIE5hbWVcIixcbiAgICBhbGlnbjogXCJsZWZ0XCIsXG4gICAgZmllbGQ6IChyb3cpID0+IHJvdy5uYW1lLFxuICAgIGZvcm1hdDogKHZhbCkgPT4gYCR7dmFsfWAsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImRhdGVcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBsYWJlbDogXCJEYXRlXCIsXG4gICAgZmllbGQ6IFwiZGF0ZVwiLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJ2aWV3XCIsXG4gICAgYWxpZ246IFwicmlnaHRcIixcbiAgICBsYWJlbDogXCJWaWV3XCIsXG4gICAgZmllbGQ6IFwidmlld1wiLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICB9LFxuXTtcbmNvbnN0IHJhbnNhY3Rpb25MaXN0Um93ID0gW1xuICB7XG4gICAgbmFtZTogXCJUcmFuc2FjdGlvbnMgMVwiLFxuICAgIGRhdGU6IFwiNC80LzI0XCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIlRyYW5zYWN0aW9ucyAyXCIsXG4gICAgZGF0ZTogXCI0LzQvMjRcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiVHJhbnNhY3Rpb25zIDNcIixcbiAgICBkYXRlOiBcIjQvNC8yNFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJUcmFuc2FjdGlvbnMgNFwiLFxuICAgIGRhdGU6IFwiNC80LzI0XCIsXG4gIH0sXG5dO1xuPC9zY3JpcHQ+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsVUFBTSxzQkFBc0IsSUFBSSxLQUFLO0FBRXJDLFVBQU0sMkJBQTJCLE1BQU07QUFDckMsMEJBQW9CLFFBQVE7QUFBQSxJQUM5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2dCQSxVQUFNLFNBQVMsSUFBSSxFQUFFO0FBQ3JCLFVBQU0sb0JBQW9CLElBQUksSUFBSTtBQUVsQyxVQUFNLFFBQVEsTUFBTTtBQUNsQix3QkFBa0IsUUFBUTtBQUMxQixpQkFBVyxNQUFNO0FBQ2YsMEJBQWtCLFFBQVE7QUFBQSxNQUM5QixDQUFHO0FBQUEsSUFDSCxDQUFDO0FBRUQsVUFBTSx5QkFBeUI7QUFBQSxNQUM3QjtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsT0FBTyxDQUFDLFFBQVEsSUFBSTtBQUFBLFFBQ3BCLFFBQVEsQ0FBQyxRQUFRLEdBQUc7QUFBQSxRQUNwQixVQUFVO0FBQUEsTUFDWDtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQSxNQUNYO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsVUFBVTtBQUFBLE1BQ1g7QUFBQSxJQUNIO0FBQ0EsVUFBTSxvQkFBb0I7QUFBQSxNQUN4QjtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1A7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUDtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNQO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1A7QUFBQSxJQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
