import { _ as _export_sfc, n as ref, o as openBlock, a4 as createElementBlock, a as createVNode, w as withCtx, O as createTextVNode, M as QBtn, Q as QCard, a3 as QDialog, a5 as Fragment, J as createBaseVNode, u as watch, c as createBlock, L as QIcon, K as QInput, R as toDisplayString, I as QCardSection, a2 as QSeparator } from "./index.c8e2405b.js";
import { Q as QBadge } from "./QBadge.49245359.js";
import { Q as QTd } from "./QTd.f597934c.js";
import { Q as QTable } from "./QTable.d3fb87f5.js";
import { Q as QTooltip } from "./QTooltip.4a3eef22.js";
import "./QVirtualScroll.41a98cb7.js";
import "./QList.d5d13fac.js";
import "./use-virtual-scroll.5b4ab88d.js";
import "./rtl.b1b38f21.js";
import "./QSelect.0985e28e.js";
import "./QItem.76557ad9.js";
import "./QMenu.4f670399.js";
import "./selection.94057980.js";
const _hoisted_1$1 = /* @__PURE__ */ createBaseVNode("h1", null, "Transaction 1 ", -1);
const _sfc_main$2 = {
  __name: "WarehouseTransactionAction",
  setup(__props) {
    const warehouseTransactionActionDialog = ref();
    const open_warehouse_transaction_action_dialog = () => {
      warehouseTransactionActionDialog.value = true;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          color: "primary",
          icon: "visibility",
          size: "sm",
          flat: "",
          round: "",
          dense: "",
          onClick: open_warehouse_transaction_action_dialog
        }, {
          default: withCtx(() => [
            createVNode(QTooltip, {
              class: "bg-primary",
              delay: 200
            }, {
              default: withCtx(() => [
                createTextVNode("View")
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(QDialog, {
          modelValue: warehouseTransactionActionDialog.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => warehouseTransactionActionDialog.value = $event)
        }, {
          default: withCtx(() => [
            createVNode(QCard, { class: "my-card" }, {
              default: withCtx(() => [
                _hoisted_1$1
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
var WarehouseTransactionAction = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "WarehouseTransactionAction.vue"]]);
const _hoisted_1 = { class: "row justify-center q-gutter-x-md" };
const _sfc_main$1 = {
  __name: "WarehouseTransactionTable",
  setup(__props) {
    const filter = ref("");
    const loadingSearchIcon = ref(false);
    watch(filter, () => {
      loadingSearchIcon.value = true;
      setTimeout(() => {
        loadingSearchIcon.value = false;
      });
    });
    const transactionHistoryColumns = [
      {
        name: "name",
        label: "Transaction Name",
        align: "center",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true
      },
      {
        name: "date",
        label: "Date / Time",
        align: "center",
        field: "date",
        sortable: true
      },
      {
        name: "status",
        label: "Status",
        align: "center",
        field: "status",
        sortable: true
      },
      {
        name: "view",
        label: "View",
        align: "center",
        sortable: true
      }
    ];
    const transactionHistoryRow = [
      {
        name: "Transaction 1",
        date: "4/4/24 8:00 AM",
        status: "Processing"
      },
      {
        name: "Transaction 2",
        date: "4/4/24 9:00 AM",
        status: "To Receive"
      },
      {
        name: "Transaction 3",
        date: "4/4/24 10:00 AM",
        status: "Received"
      },
      {
        name: "Transaction 4",
        date: "4/4/24 11:00 AM",
        status: "Processing"
      },
      {
        name: "Transaction 5",
        date: "4/4/24 11:00 AM",
        status: "Adding Supply"
      }
    ];
    const getBadgeColor = (status) => {
      switch (status) {
        case "Processing":
          return "blue";
        case "To Receive":
          return "red";
        case "Received":
          return "green";
        default:
          return "grey";
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", null, [
          createVNode(QInput, {
            rounded: "",
            outlined: "",
            dense: "",
            debounced: "300",
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
            columns: transactionHistoryColumns,
            rows: transactionHistoryRow,
            "row-key": "name"
          }, {
            "body-cell-status": withCtx((props) => [
              createVNode(QTd, {
                key: "name",
                props
              }, {
                default: withCtx(() => [
                  createVNode(QBadge, {
                    class: "text-white",
                    color: getBadgeColor(props.row.status)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(props.row.status), 1)
                    ]),
                    _: 2
                  }, 1032, ["color"])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-view": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_1, [
                    createVNode(WarehouseTransactionAction)
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
var WarehouseTransactionTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "WarehouseTransactionTable.vue"]]);
const _sfc_main = {
  __name: "warehouseTransactionHistory",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QCard, { flats: "" }, {
        default: withCtx(() => [
          createVNode(QCardSection, { class: "text-h6" }, {
            default: withCtx(() => [
              createTextVNode(" Transaction History ")
            ]),
            _: 1
          }),
          createVNode(QSeparator),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createVNode(WarehouseTransactionTable)
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
var warehouseTransactionHistory = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "warehouseTransactionHistory.vue"]]);
export { warehouseTransactionHistory as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FyZWhvdXNlVHJhbnNhY3Rpb25IaXN0b3J5LjAwYzRlYTNkLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvd2FyZWhvdXNlL3RyYW5zYWN0aW9ucy93YXJlaG91c2VfdHJhbnNhY3Rpb25zX3NlY3Rpb24vV2FyZWhvdXNlVHJhbnNhY3Rpb25BY3Rpb24udnVlIiwiLi4vLi4vLi4vc3JjL3BhZ2VzL3dhcmVob3VzZS90cmFuc2FjdGlvbnMvd2FyZWhvdXNlX3RyYW5zYWN0aW9uc19zZWN0aW9uL1dhcmVob3VzZVRyYW5zYWN0aW9uVGFibGUudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgICA8cS1idG4gY29sb3I9XCJwcmltYXJ5XCIgaWNvbj1cInZpc2liaWxpdHlcIiBzaXplPVwic21cIiBmbGF0IHJvdW5kIGRlbnNlIEBjbGljaz1cIm9wZW5fd2FyZWhvdXNlX3RyYW5zYWN0aW9uX2FjdGlvbl9kaWFsb2dcIj5cbiAgICAgICAgPHEtdG9vbHRpcCBjbGFzcz1cImJnLXByaW1hcnlcIiA6ZGVsYXk9XCIyMDBcIj5WaWV3PC9xLXRvb2x0aXA+XG4gICAgPC9xLWJ0bj5cbiAgICA8cS1kaWFsb2cgdi1tb2RlbD1cIndhcmVob3VzZVRyYW5zYWN0aW9uQWN0aW9uRGlhbG9nXCI+XG4gICAgICAgIDxxLWNhcmQgY2xhc3M9XCJteS1jYXJkXCI+XG4gICAgICAgICAgICA8aDE+VHJhbnNhY3Rpb24gMSA8L2gxPlxuICAgICAgICA8L3EtY2FyZD5cbiAgICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQge3JlZn0gZnJvbSAndnVlJ1xuXG5jb25zdCB3YXJlaG91c2VUcmFuc2FjdGlvbkFjdGlvbkRpYWxvZyA9IHJlZigpXG5jb25zdCBvcGVuX3dhcmVob3VzZV90cmFuc2FjdGlvbl9hY3Rpb25fZGlhbG9nID0gKCkgPT4ge1xuICAgIHdhcmVob3VzZVRyYW5zYWN0aW9uQWN0aW9uRGlhbG9nLnZhbHVlID0gdHJ1ZVxufVxuXG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8cS1pbnB1dFxuICAgICAgcm91bmRlZFxuICAgICAgb3V0bGluZWRcbiAgICAgIGRlbnNlXG4gICAgICBkZWJvdW5jZWQ9XCIzMDBcIlxuICAgICAgdi1tb2RlbD1cImZpbHRlclwiXG4gICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgICBzdHlsZT1cIndpZHRoOiA1MDBweDsgbWF4LXdpZHRoOiAxNTAwcHg7IG1pbi13aWR0aDogMTAwcHhcIlxuICAgID5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICA8cS1pY29uIHYtaWY9XCIhbG9hZGluZ1NlYXJjaEljb25cIiBuYW1lPVwic2VhcmNoXCIgLz5cbiAgICAgICAgPHEtaWNvbiB2LWVsc2UgOnRoaWNrbmVzcz1cIjJcIiBjb2xvcj1cInRlYWxcIiBzaXplPVwiMWVtXCIgLz5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9xLWlucHV0PlxuICA8L2Rpdj5cbiAgPGRpdj5cbiAgICA8cS10YWJsZVxuICAgICAgOmZpbHRlcj1cImZpbHRlclwiXG4gICAgICBmbGF0XG4gICAgICA6Y29sdW1ucz1cInRyYW5zYWN0aW9uSGlzdG9yeUNvbHVtbnNcIlxuICAgICAgOnJvd3M9XCJ0cmFuc2FjdGlvbkhpc3RvcnlSb3dcIlxuICAgICAgcm93LWtleT1cIm5hbWVcIlxuICAgID5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLXN0YXR1cz1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIGtleT1cIm5hbWVcIiA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgIDxxLWJhZGdlIGNsYXNzPVwidGV4dC13aGl0ZVwiIDpjb2xvcj1cImdldEJhZGdlQ29sb3IocHJvcHMucm93LnN0YXR1cylcIj5cbiAgICAgICAgICAgIHt7IHByb3BzLnJvdy5zdGF0dXMgfX1cbiAgICAgICAgICA8L3EtYmFkZ2U+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC12aWV3PVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IGp1c3RpZnktY2VudGVyIHEtZ3V0dGVyLXgtbWRcIj5cbiAgICAgICAgICAgIDxXYXJlaG91c2VUcmFuc2FjdGlvbkFjdGlvbiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS10YWJsZT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFdhcmVob3VzZVRyYW5zYWN0aW9uQWN0aW9uIGZyb20gXCIuL1dhcmVob3VzZVRyYW5zYWN0aW9uQWN0aW9uLnZ1ZVwiO1xuaW1wb3J0IHsgcmVmLCB3YXRjaCB9IGZyb20gXCJ2dWVcIjtcblxuY29uc3QgZmlsdGVyID0gcmVmKFwiXCIpO1xuY29uc3QgbG9hZGluZ1NlYXJjaEljb24gPSByZWYoZmFsc2UpO1xuXG53YXRjaChmaWx0ZXIsICgpID0+IHtcbiAgbG9hZGluZ1NlYXJjaEljb24udmFsdWUgPSB0cnVlO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBsb2FkaW5nU2VhcmNoSWNvbi52YWx1ZSA9IGZhbHNlO1xuICB9KTtcbn0pO1xuY29uc3QgdHJhbnNhY3Rpb25IaXN0b3J5Q29sdW1ucyA9IFtcbiAge1xuICAgIG5hbWU6IFwibmFtZVwiLFxuICAgIGxhYmVsOiBcIlRyYW5zYWN0aW9uIE5hbWVcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogKHJvdykgPT4gcm93Lm5hbWUsXG4gICAgZm9ybWF0OiAodmFsKSA9PiBgJHt2YWx9YCxcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiZGF0ZVwiLFxuICAgIGxhYmVsOiBcIkRhdGUgLyBUaW1lXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IFwiZGF0ZVwiLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJzdGF0dXNcIixcbiAgICBsYWJlbDogXCJTdGF0dXNcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogXCJzdGF0dXNcIixcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwidmlld1wiLFxuICAgIGxhYmVsOiBcIlZpZXdcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbl07XG5cbmNvbnN0IHRyYW5zYWN0aW9uSGlzdG9yeVJvdyA9IFtcbiAge1xuICAgIG5hbWU6IFwiVHJhbnNhY3Rpb24gMVwiLFxuICAgIGRhdGU6IFwiNC80LzI0IDg6MDAgQU1cIixcbiAgICBzdGF0dXM6IFwiUHJvY2Vzc2luZ1wiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJUcmFuc2FjdGlvbiAyXCIsXG4gICAgZGF0ZTogXCI0LzQvMjQgOTowMCBBTVwiLFxuICAgIHN0YXR1czogXCJUbyBSZWNlaXZlXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIlRyYW5zYWN0aW9uIDNcIixcbiAgICBkYXRlOiBcIjQvNC8yNCAxMDowMCBBTVwiLFxuICAgIHN0YXR1czogXCJSZWNlaXZlZFwiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJUcmFuc2FjdGlvbiA0XCIsXG4gICAgZGF0ZTogXCI0LzQvMjQgMTE6MDAgQU1cIixcbiAgICBzdGF0dXM6IFwiUHJvY2Vzc2luZ1wiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJUcmFuc2FjdGlvbiA1XCIsXG4gICAgZGF0ZTogXCI0LzQvMjQgMTE6MDAgQU1cIixcbiAgICBzdGF0dXM6IFwiQWRkaW5nIFN1cHBseVwiLFxuICB9LFxuXTtcblxuY29uc3QgZ2V0QmFkZ2VDb2xvciA9IChzdGF0dXMpID0+IHtcbiAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICBjYXNlIFwiUHJvY2Vzc2luZ1wiOlxuICAgICAgcmV0dXJuIFwiYmx1ZVwiO1xuICAgIGNhc2UgXCJUbyBSZWNlaXZlXCI6XG4gICAgICByZXR1cm4gXCJyZWRcIjtcbiAgICBjYXNlIFwiUmVjZWl2ZWRcIjpcbiAgICAgIHJldHVybiBcImdyZWVuXCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcImdyZXlcIjsgLy8gZGVmYXVsdCBjb2xvciBpZiBzdGF0dXMgZG9lc24ndCBtYXRjaCBhbnkgY2FzZVxuICB9XG59O1xuPC9zY3JpcHQ+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhQSxVQUFNLG1DQUFtQyxJQUFLO0FBQzlDLFVBQU0sMkNBQTJDLE1BQU07QUFDbkQsdUNBQWlDLFFBQVE7QUFBQSxJQUM3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDK0JBLFVBQU0sU0FBUyxJQUFJLEVBQUU7QUFDckIsVUFBTSxvQkFBb0IsSUFBSSxLQUFLO0FBRW5DLFVBQU0sUUFBUSxNQUFNO0FBQ2xCLHdCQUFrQixRQUFRO0FBQzFCLGlCQUFXLE1BQU07QUFDZiwwQkFBa0IsUUFBUTtBQUFBLE1BQzlCLENBQUc7QUFBQSxJQUNILENBQUM7QUFDRCxVQUFNLDRCQUE0QjtBQUFBLE1BQ2hDO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxPQUFPLENBQUMsUUFBUSxJQUFJO0FBQUEsUUFDcEIsUUFBUSxDQUFDLFFBQVEsR0FBRztBQUFBLFFBQ3BCLFVBQVU7QUFBQSxNQUNYO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsVUFBVTtBQUFBLE1BQ1g7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxVQUFVO0FBQUEsTUFDWDtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQSxNQUNYO0FBQUEsSUFDSDtBQUVBLFVBQU0sd0JBQXdCO0FBQUEsTUFDNUI7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLFFBQVE7QUFBQSxNQUNUO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sUUFBUTtBQUFBLE1BQ1Q7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixRQUFRO0FBQUEsTUFDVDtBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLFFBQVE7QUFBQSxNQUNUO0FBQUEsTUFDRDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sUUFBUTtBQUFBLE1BQ1Q7QUFBQSxJQUNIO0FBRUEsVUFBTSxnQkFBZ0IsQ0FBQyxXQUFXO0FBQ2hDLGNBQVE7QUFBQSxhQUNEO0FBQ0gsaUJBQU87QUFBQSxhQUNKO0FBQ0gsaUJBQU87QUFBQSxhQUNKO0FBQ0gsaUJBQU87QUFBQTtBQUVQLGlCQUFPO0FBQUE7QUFBQSxJQUViOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
