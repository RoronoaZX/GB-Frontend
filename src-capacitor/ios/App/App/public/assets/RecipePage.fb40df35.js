import { _ as _export_sfc, g as computed, n as ref, t as reactive, o as openBlock, a4 as createElementBlock, a as createVNode, M as QBtn, w as withCtx, Q as QCard, I as QCardSection, af as withDirectives, J as createBaseVNode, K as QInput, aK as QCardActions, a3 as QDialog, a5 as Fragment, O as createTextVNode, a2 as QSeparator, S as pushScopeId, T as popScopeId, z as onMounted, u as watch, L as QIcon, c as createBlock, R as toDisplayString, bc as withKeys } from "./index.c8e2405b.js";
import { Q as QPage } from "./QPage.e43c6521.js";
import { Q as QSpace } from "./QSpace.08c50700.js";
import { Q as QSelect } from "./QSelect.0985e28e.js";
import { C as ClosePopup } from "./ClosePopup.649d85d8.js";
import { u as useRecipeStore } from "./recipe.2437bced.js";
import { Q as QSpinnerDots } from "./QSpinnerDots.c2e8b2d3.js";
import { Q as QTooltip } from "./QTooltip.4a3eef22.js";
import { Q as QPopupEdit } from "./QPopupEdit.5c11c937.js";
import { Q as QTd } from "./QTd.f597934c.js";
import { Q as QBadge } from "./QBadge.49245359.js";
import { Q as QTable } from "./QTable.d3fb87f5.js";
import "./QItem.76557ad9.js";
import "./rtl.b1b38f21.js";
import "./axios.aa1bce92.js";
import "./QMenu.4f670399.js";
import "./selection.94057980.js";
import "./use-virtual-scroll.5b4ab88d.js";
import "./QVirtualScroll.41a98cb7.js";
import "./QList.d5d13fac.js";
var RecipeCreate_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$3 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F4DC} Add Recipe", -1);
const _hoisted_2$3 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_3$1 = { class: "q-mt-md q-animated q-animate-bounce" };
const _sfc_main$3 = {
  __name: "RecipeCreate",
  setup(__props) {
    const recipeRows = computed(() => recipeStore.recipes);
    const recipeStore = useRecipeStore();
    const dialog = ref(false);
    const openAddRecipe = () => {
      dialog.value = true;
    };
    const category = ["Dough", "Filling"];
    const loading = ref(false);
    const recipe = reactive({
      name: "",
      category: ""
    });
    const saveRecipe = async () => {
      console.log("Recipe", recipe);
      try {
        loading.value = true;
        await recipeStore.createRecipe(recipe);
        loading.value = false;
        dialog.value = false;
        clearRecipeData();
        recipeRows.value = await recipeStore.fetchRecipes();
      } catch (error) {
        loading.value = false;
      }
    };
    const clearRecipeData = () => {
      recipe.name = "";
      recipe.category = "";
      dialog.value = false;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          class: "text-dark q-pa-sm",
          outline: "",
          dense: "",
          elevated: "",
          icon: "add_circle",
          label: "Add Recipe",
          onClick: openAddRecipe,
          style: { "background-color": "#ef4444" }
        }),
        createVNode(QDialog, {
          modelValue: dialog.value,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => dialog.value = $event),
          persistent: "",
          "transition-show": "jump-up",
          "transition-hide": "jump-down"
        }, {
          default: withCtx(() => [
            createVNode(QCard, {
              class: "my-card q-pa-none",
              style: { "width": "420px", "border-radius": "16px", "box-shadow": "0 12px 24px rgba(0, 0, 0, 0.2)" }
            }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "row items-center q-px-md q-py-sm bg-gradient text-white" }, {
                  default: withCtx(() => [
                    _hoisted_1$3,
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
                createVNode(QCardSection, { class: "q-mx-md" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2$3, [
                      createVNode(QInput, {
                        class: "text-capitalize",
                        modelValue: recipe.name,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => recipe.name = $event),
                        outlined: "",
                        dense: "",
                        label: "Recipe Name",
                        rules: [
                          (val) => val && val.length > 0 || "Recipe name is required"
                        ]
                      }, null, 8, ["modelValue", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_3$1, [
                      createVNode(QSelect, {
                        modelValue: recipe.category,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => recipe.category = $event),
                        options: category,
                        "hide-dropdown-icon": "",
                        outlined: "",
                        dense: "",
                        behavior: "menu",
                        label: "Category",
                        rules: [
                          (val) => val && val.length > 0 || "Category is required"
                        ]
                      }, null, 8, ["modelValue", "rules"])
                    ]),
                    createVNode(QCardActions, {
                      class: "row q-mt-md q-px-lg q-py-sm q-pt-none",
                      align: "right"
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
                          label: "Create",
                          onClick: saveRecipe
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
      ], 64);
    };
  }
};
var RecipeCreate = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "RecipeCreate.vue"]]);
var RecipeDelete_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-49908f78"), n = n(), popScopeId(), n);
const _hoisted_1$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mb-xs" }, "Confirm Deletion", -1));
const _hoisted_2$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("p", { class: "text-body2 q-mb-none" }, " Are you sure you want to delete this item? This action cannot be undone. ", -1));
const _sfc_main$2 = {
  __name: "RecipeDelete",
  props: ["delete"],
  setup(__props) {
    const recipeStore = useRecipeStore();
    const props = __props;
    const dialogVisible = ref(false);
    const deleteDialog = () => {
      dialogVisible.value = true;
    };
    const onDelete = async () => {
      await recipeStore.deleteRecipe(props.delete.row.id);
      dialogVisible.value = false;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QBtn, {
          onClick: deleteDialog,
          color: "negative",
          icon: "delete",
          size: "sm",
          flat: "",
          round: "",
          dense: "",
          "aria-label": "Delete"
        }, {
          default: withCtx(() => [
            createVNode(QTooltip, {
              class: "bg-negative",
              delay: 200
            }, {
              default: withCtx(() => [
                createTextVNode("Delete")
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(QDialog, {
          modelValue: dialogVisible.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => dialogVisible.value = $event),
          persistent: ""
        }, {
          default: withCtx(() => [
            createVNode(QCard, { class: "q-pa-md q-rounded q-elevate-2 bg-white text-grey-9" }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "q-pt-none q-pb-sm" }, {
                  default: withCtx(() => [
                    _hoisted_1$2,
                    _hoisted_2$2
                  ]),
                  _: 1
                }),
                createVNode(QSeparator, { class: "q-mb-md" }),
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createVNode(QCardActions, {
                      align: "right",
                      class: "q-pt-none"
                    }, {
                      default: withCtx(() => [
                        withDirectives(createVNode(QBtn, {
                          flat: "",
                          dense: "",
                          label: "Cancel",
                          color: "primary",
                          class: "q-mr-sm"
                        }, null, 512), [
                          [ClosePopup]
                        ]),
                        createVNode(QBtn, {
                          dense: "",
                          label: "Delete",
                          color: "negative",
                          onClick: onDelete,
                          class: "q-btn-rounded q-px-lg"
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
      ], 64);
    };
  }
};
var RecipeDelete = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-49908f78"], ["__file", "RecipeDelete.vue"]]);
var RecipeTable_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-163d3062"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { align: "left" };
const _hoisted_2$1 = {
  key: 0,
  class: "spinner-wrapper"
};
const _hoisted_3 = { key: 1 };
const _hoisted_4 = {
  key: 0,
  class: "data-error"
};
const _hoisted_5 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-ml-sm text-h6" }, "No data available", -1));
const _hoisted_6 = { class: "row justify-center q-gutter-x-md" };
const _sfc_main$1 = {
  __name: "RecipeTable",
  setup(__props) {
    const recipeStore = useRecipeStore();
    const filter = ref("");
    const loading = ref(true);
    ref([]);
    const showNoDataMessage = ref(false);
    const pagination = ref({
      rowsPerPage: 0
    });
    const recipeRows = computed(() => recipeStore.recipes);
    const filteredRows = computed(() => {
      if (!filter.value) {
        return recipeRows.value;
      }
      return recipeRows.value.filter(
        (row) => row.name.toLowerCase().includes(filter.value.toLowerCase())
      );
    });
    const capitalizeFirstLetter = (location) => {
      if (!location)
        return "";
      return location.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    };
    onMounted(async () => {
      await reloadTableData();
    });
    const reloadTableData = async () => {
      try {
        loading.value = true;
        recipeRows.value = await recipeStore.fetchRecipes();
        if (!recipeRows.value.length) {
          showNoDataMessage.value = true;
        }
        console.log("Recipe", recipeRows.value);
      } catch (error) {
        console.log("error fetching recipe: ", error);
        showNoDataMessage.value = true;
      } finally {
        loading.value = false;
      }
    };
    watch(filter, async (newFilter) => {
      loading.value = true;
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      loading.value = false;
      showNoDataMessage.value = filteredRows.value.length === 0;
    });
    const recipeColumns = [
      {
        name: "name",
        label: "Recipe Name",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true
      },
      {
        name: "category",
        align: "left",
        label: "Category",
        field: "category",
        sortable: true
      },
      {
        name: "action",
        label: "Action",
        align: "center",
        sortable: true
      }
    ];
    const getBadgeCategoryColor = (category) => {
      switch (category) {
        case "Filling":
          return "teal";
        case "Dough":
          return "brown-6";
        default:
          return "grey";
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$1, [
          createVNode(QInput, {
            class: "q-pb-lg q-pl-sm dynamic-width",
            modelValue: filter.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filter.value = $event),
            outlined: "",
            placeholder: "Search",
            debounce: "1000",
            flat: "",
            dense: "",
            rounded: ""
          }, {
            append: withCtx(() => [
              createVNode(QIcon, { name: "search" })
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          createVNode(QSpinnerDots, {
            size: "50px",
            color: "primary"
          })
        ])) : (openBlock(), createElementBlock("div", _hoisted_3, [
          filteredRows.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_4, [
            createVNode(QIcon, {
              name: "warning",
              color: "warning",
              size: "4em"
            }),
            _hoisted_5
          ])) : (openBlock(), createBlock(QTable, {
            key: 1,
            class: "table-container elegant-container sticky-header",
            filter: filter.value,
            "virtual-scroll-sticky-size-start": 48,
            flat: "",
            columns: recipeColumns,
            rows: filteredRows.value,
            "row-key": "name",
            "virtual-scroll": "",
            pagination: pagination.value,
            "onUpdate:pagination": _cache[1] || (_cache[1] = ($event) => pagination.value = $event),
            "rows-per-page-options": [0],
            "hide-bottom": "",
            style: { "height": "400px" }
          }, {
            "body-cell-name": withCtx((props) => [
              createVNode(QTd, {
                props,
                class: "cursor-pointer"
              }, {
                default: withCtx(() => [
                  createBaseVNode("span", null, [
                    createTextVNode(toDisplayString(capitalizeFirstLetter(props.row.name)) + " ", 1),
                    createVNode(QTooltip, {
                      class: "bg-blue-grey-8",
                      offset: [10, 10]
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Edit Recipe Name")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(QPopupEdit, {
                    "onUpdate:modelValue": [(val) => _ctx.updateRecipeName(props.row, val), ($event) => props.row.name = $event],
                    modelValue: props.row.name,
                    "auto-save": ""
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
            "body-cell-category": withCtx((props) => [
              createVNode(QTd, {
                key: "name",
                props
              }, {
                default: withCtx(() => [
                  createVNode(QBadge, {
                    color: getBadgeCategoryColor(props.row.category)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(props.row.category), 1)
                    ]),
                    _: 2
                  }, 1032, ["color"])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-action": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_6, [
                    createVNode(RecipeDelete, { delete: props }, null, 8, ["delete"])
                  ])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            _: 1
          }, 8, ["filter", "rows", "pagination"]))
        ]))
      ], 64);
    };
  }
};
var RecipeTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-163d3062"], ["__file", "RecipeTable.vue"]]);
var RecipePage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-2aa25900"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, null, -1));
const _hoisted_2 = { align: "right" };
const _sfc_main = {
  __name: "RecipePage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, {
        class: "elegant-container",
        flat: ""
      }, {
        default: withCtx(() => [
          createVNode(QCardSection, { class: "row justify-between" }, {
            default: withCtx(() => [
              _hoisted_1,
              createBaseVNode("div", _hoisted_2, [
                createVNode(RecipeCreate)
              ])
            ]),
            _: 1
          }),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createVNode(RecipeTable)
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
var RecipePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2aa25900"], ["__file", "RecipePage.vue"]]);
export { RecipePage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjaXBlUGFnZS5mYjQwZGYzNS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvcmVjaXBlL2NvbXBvbmVudHMvUmVjaXBlQ3JlYXRlLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL3JlY2lwZS9jb21wb25lbnRzL1JlY2lwZURlbGV0ZS52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9yZWNpcGUvY29tcG9uZW50cy9SZWNpcGVUYWJsZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8cS1idG5cbiAgICBjbGFzcz1cInRleHQtZGFyayBxLXBhLXNtXCJcbiAgICBvdXRsaW5lXG4gICAgZGVuc2VcbiAgICBlbGV2YXRlZFxuICAgIGljb249XCJhZGRfY2lyY2xlXCJcbiAgICBsYWJlbD1cIkFkZCBSZWNpcGVcIlxuICAgIEBjbGljaz1cIm9wZW5BZGRSZWNpcGVcIlxuICAgIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogI2VmNDQ0NFwiXG4gIC8+XG4gIDxxLWRpYWxvZ1xuICAgIHYtbW9kZWw9XCJkaWFsb2dcIlxuICAgIHBlcnNpc3RlbnRcbiAgICB0cmFuc2l0aW9uLXNob3c9XCJqdW1wLXVwXCJcbiAgICB0cmFuc2l0aW9uLWhpZGU9XCJqdW1wLWRvd25cIlxuICA+XG4gICAgPHEtY2FyZFxuICAgICAgY2xhc3M9XCJteS1jYXJkIHEtcGEtbm9uZVwiXG4gICAgICBzdHlsZT1cIlxuICAgICAgICB3aWR0aDogNDIwcHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMTJweCAyNHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgICAgIFwiXG4gICAgPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uXG4gICAgICAgIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBxLXB4LW1kIHEtcHktc20gYmctZ3JhZGllbnQgdGV4dC13aGl0ZVwiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg1IHEtbXItbWRcIj7wn5OcIEFkZCBSZWNpcGU8L2Rpdj5cbiAgICAgICAgPHEtc3BhY2UgLz5cbiAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgZGVuc2Ugcm91bmQgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtbXgtbWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbWQgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIGNsYXNzPVwidGV4dC1jYXBpdGFsaXplXCJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJyZWNpcGUubmFtZVwiXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIGxhYmVsPVwiUmVjaXBlIE5hbWVcIlxuICAgICAgICAgICAgOnJ1bGVzPVwiW1xuICAgICAgICAgICAgICAodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnUmVjaXBlIG5hbWUgaXMgcmVxdWlyZWQnLFxuICAgICAgICAgICAgXVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cInEtbXQtbWQgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgPGRpdj5UYXJnZXQgUGNzPC9kaXY+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJyZWNpcGUudGFyZ2V0XCJcbiAgICAgICAgICAgIHN1ZmZpeD1cIiAvIDFrZ1wiXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgbGFiZWw9XCJUYXJnZXQgUGllY2Uvc1wiXG4gICAgICAgICAgICA6cnVsZXM9XCJbXG4gICAgICAgICAgICAgICh2YWwpID0+ICh2YWwgJiYgdmFsLmxlbmd0aCA+IDApIHx8ICdUYXJnZXQgcGllY2UvcyBpcyByZXF1aXJlZCcsXG4gICAgICAgICAgICBdXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj4gLS0+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LW1kIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cInEtbXktc21cIj5DYXRlZ29yeTwvZGl2PiAtLT5cbiAgICAgICAgICA8cS1zZWxlY3RcbiAgICAgICAgICAgIHYtbW9kZWw9XCJyZWNpcGUuY2F0ZWdvcnlcIlxuICAgICAgICAgICAgOm9wdGlvbnM9XCJjYXRlZ29yeVwiXG4gICAgICAgICAgICBoaWRlLWRyb3Bkb3duLWljb25cbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgYmVoYXZpb3I9XCJtZW51XCJcbiAgICAgICAgICAgIGxhYmVsPVwiQ2F0ZWdvcnlcIlxuICAgICAgICAgICAgOnJ1bGVzPVwiW1xuICAgICAgICAgICAgICAodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnQ2F0ZWdvcnkgaXMgcmVxdWlyZWQnLFxuICAgICAgICAgICAgXVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cInEtbXQtbWQgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgPGRpdj5CcmVhZHM8L2Rpdj5cbiAgICAgICAgICA8cS1zZWxlY3RcbiAgICAgICAgICAgIHYtbW9kZWw9XCJicmVhZEdyb3VwXCJcbiAgICAgICAgICAgIHVzZS1pbnB1dFxuICAgICAgICAgICAgdXNlLWNoaXBzXG4gICAgICAgICAgICBjaGlwcy1jb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgICAgbXVsdGlwbGVcbiAgICAgICAgICAgIGlucHV0LWRlYm91bmNlPVwiMFwiXG4gICAgICAgICAgICA6b3B0aW9ucz1cImZpbHRlckJyZWFkT3B0aW9uc1wiXG4gICAgICAgICAgICBiZWhhdmlvcj1cIm1lbnVcIlxuICAgICAgICAgICAgaGlkZS1kcm9wZG93bi1pY29uXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIGxhYmVsPVwiQnJlYWQvc1wiXG4gICAgICAgICAgICBAbmV3LXZhbHVlPVwiY3JlYXRlVmFsdWVcIlxuICAgICAgICAgICAgQGZpbHRlcj1cImZpbHRlckZuXCJcbiAgICAgICAgICAgIDpydWxlcz1cIlsodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnQnJlYWQgaXMgcmVxdWlyZWQnXVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgQG5ldy12YWx1ZT1cImNyZWF0ZVZhbHVlXCJcbiAgICAgICAgICAgIEBmaWx0ZXI9XCJmaWx0ZXJCcmVhZFwiXG4gICAgICAgICAgICBAZmlsdGVyLWFib3J0PVwiYWJvcnRGaWx0ZXJGblwiXG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90Om5vLW9wdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJ0ZXh0LWdyZXlcIj4gTm8gcmVzdWx0cyA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgPC9xLXNlbGVjdD5cbiAgICAgICAgPC9kaXY+IC0tPlxuICAgICAgICA8IS0tIDxkaXYgY2xhc3M9XCJxLW10LW1kIHEtZ3V0dGVyLXktc20gcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtd2VpZ2h0LXRoaW5cIj5JbmdyZWRpZW50cyBMaXN0PC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxxLWxpc3QgZGVuc2Ugc2VwYXJhdG9yIGNsYXNzPVwiYm94XCI+XG4gICAgICAgICAgICAgIDxxLWl0ZW1cbiAgICAgICAgICAgICAgICB2LWZvcj1cIihpbmdyZWRpZW50LCBpbmRleCkgaW4gaW5ncmVkaWVudEdyb3VwXCJcbiAgICAgICAgICAgICAgICA6a2V5PVwiaW5kZXhcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD57eyBpbmdyZWRpZW50LmxhYmVsIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb25cbiAgICAgICAgICAgICAgICAgID57eyBpbmdyZWRpZW50LnF1YW50aXR5IH19XG4gICAgICAgICAgICAgICAgICB7eyBpbmdyZWRpZW50LnVuaXQgfX08L3EtaXRlbS1zZWN0aW9uXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBzaWRlPlxuICAgICAgICAgICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICAgICAgICAgIEBjbGljaz1cInJlbW92ZUluZ3JlZGllbnQoaW5kZXgpXCJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJncmV5LTEwXCJcbiAgICAgICAgICAgICAgICAgICAgaWNvbj1cImJhY2tzcGFjZVwiXG4gICAgICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgICAgIGZsYXRcbiAgICAgICAgICAgICAgICAgICAgcm91bmRcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICA8L3EtbGlzdD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LXhsIHEtZ3V0dGVyLXktc20gcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgYWxpZ249XCJjZW50ZXJcIj5JbmdyZWRpZW50czwvZGl2PlxuICAgICAgICAgICAgICA8cS1zZWxlY3RcbiAgICAgICAgICAgICAgICB2LW1vZGVsPVwic2VsZWN0ZWRJbmdyZWRpZW50cy5uYW1lXCJcbiAgICAgICAgICAgICAgICBkZWJvdW5jZT1cIjMwMDBcIlxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgY2hpcHMtY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICA6b3B0aW9ucz1cImZpbHRlckluZ3JlZGllbnRzT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBsYWJlbD1cIkluZ3JlZGllbnRzXCJcbiAgICAgICAgICAgICAgICBiZWhhdmlvcj1cIm1lbnVcIlxuICAgICAgICAgICAgICAgIHVzZS1pbnB1dFxuICAgICAgICAgICAgICAgIGhpZGUtZHJvcGRvd24taWNvblxuICAgICAgICAgICAgICAgIEBmaWx0ZXI9XCJmaWx0ZXJJbmdyZWRpZW50c1wiXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMjE1cHg7IG1heC13aWR0aDogNDUwcHg7IG1pbi13aWR0aDogODBweFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90Om5vLW9wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbiBjbGFzcz1cInRleHQtZ3JleVwiPlxuICAgICAgICAgICAgICAgICAgICAgIE5vIHJlc3VsdHNcbiAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICAgIDwvcS1zZWxlY3Q+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBhbGlnbj1cImNlbnRlclwiPlF1YW50aXR5PC9kaXY+XG4gICAgICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cInNlbGVjdGVkSW5ncmVkaWVudHMucXVhbnRpdHlcIlxuICAgICAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICAgICAgbWFzaz1cIiMjIyMjXCJcbiAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgIGxhYmVsPVwiUXVhbnRpdHlcIlxuICAgICAgICAgICAgICAgIDpzdWZmaXg9XCJzZWxlY3RlZEluZ3JlZGllbnRzLm5hbWUudW5pdCB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDogMTE1cHhcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGZvcm0gQGtleXVwLmVudGVyLnByZXZlbnQ9XCJhZGRJbmdyZWRpZW50c1wiPlxuICAgICAgICAgICAgPGRpdiBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgIHBhZGRpbmc9XCJ4cyBtZFwiXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lXG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBsYWJlbD1cImFkZFwiXG4gICAgICAgICAgICAgICAgaWNvbj1cImFkZFwiXG4gICAgICAgICAgICAgICAgY29sb3I9XCJwdXJwbGVcIlxuICAgICAgICAgICAgICAgIEBjbGljaz1cImFkZEluZ3JlZGllbnRzXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9kaXY+IC0tPlxuICAgICAgICA8IS0tIDxxLXNlcGFyYXRvciBjbGFzcz1cInEtbXktbGdcIj48L3Etc2VwYXJhdG9yPiAtLT5cbiAgICAgICAgPHEtY2FyZC1hY3Rpb25zXG4gICAgICAgICAgY2xhc3M9XCJyb3cgcS1tdC1tZCBxLXB4LWxnIHEtcHktc20gcS1wdC1ub25lXCJcbiAgICAgICAgICBhbGlnbj1cInJpZ2h0XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxxLWJ0biBjbGFzcz1cImdsb3NzeVwiIGNvbG9yPVwiZ3JleS05XCIgbGFiZWw9XCJEaXNtaXNzXCIgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgY2xhc3M9XCJnbG9zc3lcIlxuICAgICAgICAgICAgY29sb3I9XCJ0ZWFsXCJcbiAgICAgICAgICAgIGxhYmVsPVwiQ3JlYXRlXCJcbiAgICAgICAgICAgIEBjbGljaz1cInNhdmVSZWNpcGVcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbi8vIGltcG9ydCB7IHVzZVByb2R1Y3RzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9wcm9kdWN0XCI7XG4vLyBpbXBvcnQgeyB1c2VSYXdNYXRlcmlhbHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3Jhdy1tYXRlcmlhbFwiO1xuaW1wb3J0IHsgcmVmLCByZWFjdGl2ZSwgd2F0Y2gsIGNvbXB1dGVkIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgdXNlUmVjaXBlU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9yZWNpcGVcIjtcbmltcG9ydCB7IE5vdGlmeSB9IGZyb20gXCJxdWFzYXJcIjtcbmNvbnN0IHJlY2lwZVJvd3MgPSBjb21wdXRlZCgoKSA9PiByZWNpcGVTdG9yZS5yZWNpcGVzKTtcblxuLy8gY29uc3QgYnJlYWRQcm9kdWN0U3RvcmUgPSB1c2VQcm9kdWN0c1N0b3JlKCk7XG4vLyBjb25zdCBpbmdyZWRpZW50c1N0b3JlID0gdXNlUmF3TWF0ZXJpYWxzU3RvcmUoKTtcbmNvbnN0IHJlY2lwZVN0b3JlID0gdXNlUmVjaXBlU3RvcmUoKTtcbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5jb25zdCBvcGVuQWRkUmVjaXBlID0gKCkgPT4ge1xuICBkaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcbmNvbnN0IGNhdGVnb3J5ID0gW1wiRG91Z2hcIiwgXCJGaWxsaW5nXCJdO1xuY29uc3QgbG9hZGluZyA9IHJlZihmYWxzZSk7XG5jb25zdCByZWNpcGUgPSByZWFjdGl2ZSh7XG4gIG5hbWU6IFwiXCIsXG4gIGNhdGVnb3J5OiBcIlwiLFxufSk7XG5cbi8vIGNvbnN0IGJyZWFkR3JvdXAgPSByZWYobnVsbCk7XG4vLyBjb25zdCBicmVhZE9wdGlvbnMgPSByZWYoW10pO1xuLy8gY29uc3QgZmlsdGVyQnJlYWRPcHRpb25zID0gcmVmKGJyZWFkT3B0aW9ucy52YWx1ZSk7XG4vLyBjb25zdCBpbmdyZWRpZW50R3JvdXAgPSByZWYoW10pO1xuLy8gY29uc3QgaW5ncmVkaWVudE9wdGlvbnMgPSByZWYoW10pO1xuLy8gY29uc3Qgc2VsZWN0ZWRJbmdyZWRpZW50cyA9IHJlYWN0aXZlKHtcbi8vICAgbmFtZTogXCJcIixcbi8vICAgcXVhbnRpdHk6IFwiXCIsXG4vLyB9KTtcbi8vIGNvbnN0IGZpbHRlckluZ3JlZGllbnRzT3B0aW9ucyA9IHJlZihpbmdyZWRpZW50T3B0aW9ucy52YWx1ZSk7XG5cbi8vIGNvbnN0IGZldGNoQnJlYWRzRGF0YSA9IGFzeW5jICgpID0+IHtcbi8vICAgY29uc3QgYnJlYWRzID0gYXdhaXQgYnJlYWRQcm9kdWN0U3RvcmUuZmV0Y2hQcm9kdWN0c0J5Q2F0ZWdvcnkoXCJCcmVhZFwiKTtcblxuLy8gICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4vLyAgIGJyZWFkT3B0aW9ucy52YWx1ZSA9IGJyZWFkUHJvZHVjdFN0b3JlLmJyZWFkcy5tYXAoKHZhbCkgPT4ge1xuLy8gICAgIHJldHVybiB7XG4vLyAgICAgICBsYWJlbDogdmFsLm5hbWUsXG4vLyAgICAgICB2YWx1ZTogdmFsLmlkLFxuLy8gICAgIH07XG4vLyAgIH0pO1xuLy8gfTtcbi8vIGZldGNoQnJlYWRzRGF0YSgpO1xuXG4vLyBjb25zdCBmZXRjaEluZ3JlZGllbnRzRGF0YSA9IGFzeW5jICgpID0+IHtcbi8vICAgY29uc3QgaW5ncmVkaWVudCA9IGF3YWl0IGluZ3JlZGllbnRzU3RvcmUuZmV0Y2hJbmdyZWRpZW50cyhcIkluZ3JlZGllbnRzXCIpO1xuLy8gICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4vLyAgIGluZ3JlZGllbnRPcHRpb25zLnZhbHVlID0gaW5ncmVkaWVudHNTdG9yZS5pbmdyZWRpZW50cy5tYXAoKHZhbCkgPT4ge1xuLy8gICAgIHJldHVybiB7XG4vLyAgICAgICBsYWJlbDogdmFsLm5hbWUsXG4vLyAgICAgICB2YWx1ZTogdmFsLmlkLFxuLy8gICAgICAgdW5pdDogdmFsLnVuaXQsXG4vLyAgICAgfTtcbi8vICAgfSk7XG4vLyB9O1xuLy8gZmV0Y2hJbmdyZWRpZW50c0RhdGEoKTtcblxuLy8gY29uc3QgY2xlYXJEYXRhID0gKCkgPT4ge1xuLy8gICAoc2VsZWN0ZWRJbmdyZWRpZW50cy5uYW1lID0gXCJcIiksIChzZWxlY3RlZEluZ3JlZGllbnRzLnF1YW50aXR5ID0gXCJcIik7XG4vLyB9O1xuXG4vLyBjb25zdCBjcmVhdGVWYWx1ZSA9ICh2YWwsIGRvbmUpID0+IHtcbi8vICAgaWYgKHZhbC5sZW5ndGggPiAyKSB7XG4vLyAgICAgaWYgKCFicmVhZE9wdGlvbnMudmFsdWUuaW5jbHVkZXModmFsKSkge1xuLy8gICAgICAgZG9uZSh2YWwsIFwiYWRkLXVuaXF1ZVwiKTtcbi8vICAgICB9XG4vLyAgIH1cbi8vIH07XG5cbi8vIGNvbnN0IGZpbHRlckZuID0gKHZhbCwgdXBkYXRlKSA9PiB7XG4vLyAgIHVwZGF0ZSgoKSA9PiB7XG4vLyAgICAgaWYgKHZhbCA9PT0gXCJcIikge1xuLy8gICAgICAgZmlsdGVyQnJlYWRPcHRpb25zLnZhbHVlID0gYnJlYWRPcHRpb25zLnZhbHVlO1xuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICBjb25zdCBuZWVkbGUgPSB2YWwudG9Mb3dlckNhc2UoKTtcbi8vICAgICAgIGZpbHRlckJyZWFkT3B0aW9ucy52YWx1ZSA9IGJyZWFkT3B0aW9ucy52YWx1ZS5maWx0ZXIoXG4vLyAgICAgICAgICh2KSA9PiB2LmxhYmVsLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihuZWVkbGUpID4gLTFcbi8vICAgICAgICk7XG4vLyAgICAgfVxuLy8gICB9KTtcbi8vIH07XG5cbi8vIGNvbnN0IGNyZWF0ZVZhbHVlSW5ncmVkaWVudCA9ICh2YWwsIGRvbmUpID0+IHtcbi8vICAgaWYgKHZhbC5sZW5ndGggPiAyKSB7XG4vLyAgICAgaWYgKCFpbmdyZWRpZW50T3B0aW9ucy52YWx1ZS5pbmNsdWRlcyh2YWwpKSB7XG4vLyAgICAgICBkb25lKHZhbCwgXCJhZGQtdW5pcXVlXCIpO1xuLy8gICAgIH1cbi8vICAgfVxuLy8gfTtcbi8vIGNvbnN0IGZpbHRlckluZ3JlZGllbnRzID0gKHZhbCwgdXBkYXRlKSA9PiB7XG4vLyAgIHVwZGF0ZSgoKSA9PiB7XG4vLyAgICAgaWYgKHZhbCA9PT0gXCJcIikge1xuLy8gICAgICAgZmlsdGVySW5ncmVkaWVudHNPcHRpb25zLnZhbHVlID0gaW5ncmVkaWVudE9wdGlvbnMudmFsdWU7XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgIGNvbnN0IG5lZWRsZSA9IHZhbC50b0xvd2VyQ2FzZSgpO1xuLy8gICAgICAgZmlsdGVySW5ncmVkaWVudHNPcHRpb25zLnZhbHVlID0gaW5ncmVkaWVudE9wdGlvbnMudmFsdWUuZmlsdGVyKFxuLy8gICAgICAgICAodikgPT4gdi5sYWJlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2YobmVlZGxlKSA+IC0xXG4vLyAgICAgICApO1xuLy8gICAgIH1cbi8vICAgfSk7XG4vLyB9O1xuXG5jb25zdCBzYXZlUmVjaXBlID0gYXN5bmMgKCkgPT4ge1xuICAvLyBjb25zdCBuZXdEYXRhID0ge1xuICAvLyAgIG5hbWU6IHJlY2lwZS5uYW1lLFxuICAvLyAgIHRhcmdldDogcmVjaXBlLnRhcmdldCxcbiAgLy8gICBjYXRlZ29yeTogcmVjaXBlLmNhdGVnb3J5LFxuICAvLyAgIHN0YXR1czogXCJBY3RpdmVcIixcbiAgLy8gICBicmVhZHM6IGJyZWFkR3JvdXAudmFsdWUubWFwKChicmVhZCkgPT4gKHtcbiAgLy8gICAgIGJyZWFkX2lkOiBicmVhZC52YWx1ZSxcbiAgLy8gICB9KSksXG4gIC8vICAgaW5ncmVkaWVudHM6IGluZ3JlZGllbnRHcm91cC52YWx1ZS5tYXAoKGluZ3JlZGllbnQpID0+ICh7XG4gIC8vICAgICBpbmdyZWRpZW50X2lkOiBpbmdyZWRpZW50LmluZ3JlZGllbnRzX2lkLFxuICAvLyAgICAgcXVhbnRpdHk6IGluZ3JlZGllbnQucXVhbnRpdHksXG4gIC8vICAgfSkpLFxuICAvLyB9O1xuXG4gIGNvbnNvbGUubG9nKFwiUmVjaXBlXCIsIHJlY2lwZSk7XG4gIHRyeSB7XG4gICAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gICAgYXdhaXQgcmVjaXBlU3RvcmUuY3JlYXRlUmVjaXBlKHJlY2lwZSk7XG4gICAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICAgIGRpYWxvZy52YWx1ZSA9IGZhbHNlO1xuICAgIGNsZWFyUmVjaXBlRGF0YSgpO1xuICAgIC8vIGF3YWl0IHJlbG9hZFRhYmxlRGF0YSgpO1xuICAgIHJlY2lwZVJvd3MudmFsdWUgPSBhd2FpdCByZWNpcGVTdG9yZS5mZXRjaFJlY2lwZXMoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gICAgLy8gTm90aWZ5LmNyZWF0ZSh7XG4gICAgLy8gICB0eXBlOiBcIm5lZ2F0aXZlXCIsXG4gICAgLy8gICBtZXNzYWdlOiBcIkVycm9yIGNyZWF0aW5nIHJlY2lwZVwiLFxuICAgIC8vIH0pO1xuICB9XG59O1xuXG5jb25zdCBjbGVhclJlY2lwZURhdGEgPSAoKSA9PiB7XG4gIHJlY2lwZS5uYW1lID0gXCJcIjtcbiAgcmVjaXBlLmNhdGVnb3J5ID0gXCJcIjtcbiAgLy8gcmVjaXBlLnRhcmdldCA9IFwiXCI7XG4gIC8vIGJyZWFkR3JvdXAudmFsdWUgPSBudWxsO1xuICAvLyBpbmdyZWRpZW50R3JvdXAudmFsdWUgPSBbXTtcbiAgLy8gc2VsZWN0ZWRJbmdyZWRpZW50cy5uYW1lID0gXCJcIjtcbiAgLy8gc2VsZWN0ZWRJbmdyZWRpZW50cy5xdWFudGl0eSA9IFwiXCI7XG5cbiAgZGlhbG9nLnZhbHVlID0gZmFsc2U7XG59O1xuXG4vLyBjb25zdCBhZGRJbmdyZWRpZW50cyA9ICgpID0+IHtcbi8vICAgY29uc3QgZGF0YSA9IGluZ3JlZGllbnRHcm91cC52YWx1ZTtcblxuLy8gICBmdW5jdGlvbiBmaW5kT2JqZWN0QnlJZChhcnIsIGlkKSB7XG4vLyAgICAgcmV0dXJuIGFyci5maW5kKChvYmopID0+IG9iai5pbmdyZWRpZW50c19pZCA9PSBpZCk7XG4vLyAgIH1cbi8vICAgY29uc3QgaWRUb1NlYXJjaCA9IHNlbGVjdGVkSW5ncmVkaWVudHMubmFtZS52YWx1ZTtcblxuLy8gICBjb25zdCBmb3VuZE9iamVjdCA9IGZpbmRPYmplY3RCeUlkKGRhdGEsIGlkVG9TZWFyY2gpO1xuLy8gICBpZiAoIWZvdW5kT2JqZWN0KSB7XG4vLyAgICAgaW5ncmVkaWVudEdyb3VwLnZhbHVlID0gW1xuLy8gICAgICAgLi4uZGF0YSxcbi8vICAgICAgIHtcbi8vICAgICAgICAgaW5ncmVkaWVudHNfaWQ6IHNlbGVjdGVkSW5ncmVkaWVudHMubmFtZS52YWx1ZSxcbi8vICAgICAgICAgbGFiZWw6IHNlbGVjdGVkSW5ncmVkaWVudHMubmFtZS5sYWJlbCxcbi8vICAgICAgICAgcXVhbnRpdHk6IHNlbGVjdGVkSW5ncmVkaWVudHMucXVhbnRpdHksXG4vLyAgICAgICAgIHVuaXQ6IHNlbGVjdGVkSW5ncmVkaWVudHMubmFtZS51bml0LFxuLy8gICAgICAgfSxcbi8vICAgICBdO1xuLy8gICAgIGNsZWFyRGF0YSgpO1xuLy8gICB9IGVsc2Uge1xuLy8gICAgIE5vdGlmeS5jcmVhdGUoe1xuLy8gICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuLy8gICAgICAgaWNvbjogXCJ3YXJuaW5nXCIsXG4vLyAgICAgICBtZXNzYWdlOiBcIkluZ3JlZGllbnQgYWxyZWFkeSBleGlzdFwiLFxuLy8gICAgICAgdGltZW91dDogMjAwMCxcbi8vICAgICB9KTtcbi8vICAgICAvLyBhbGVydChcImluZ3JlZGllbnQgYWxyZWFkeSBleGlzdCFcIik7XG4vLyAgIH1cbi8vIH07XG5cbi8vIGNvbnN0IHJlbW92ZUluZ3JlZGllbnQgPSAoaW5kZXgpID0+IHtcbi8vICAgaW5ncmVkaWVudEdyb3VwLnZhbHVlLnNwbGljZShpbmRleCwgMSk7XG4vLyB9O1xuXG4vLyB3YXRjaChcbi8vICAgKCkgPT4gc2VsZWN0ZWRJbmdyZWRpZW50cy5uYW1lLFxuLy8gICAobmV3VmFsKSA9PiB7XG4vLyAgICAgaWYgKG5ld1ZhbCAmJiBuZXdWYWwudW5pdCkge1xuLy8gICAgICAgc2VsZWN0ZWRJbmdyZWRpZW50cy51bml0ID0gbmV3VmFsLnVuaXQ7XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgIHNlbGVjdGVkSW5ncmVkaWVudHMudW5pdCA9IFwiXCI7XG4vLyAgICAgfVxuLy8gICB9XG4vLyApO1xuPC9zY3JpcHQ+XG48c3R5bGU+XG4ucS1jaGlwIHtcbiAgY29sb3I6ICMwMDAwMDA7XG59XG4uYm94IHtcbiAgYm9yZGVyOiAxcHggZGFzaGVkIGdyZXk7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG59XG4ubXktY2FyZCB7XG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gIGFuaW1hdGlvbjogZmFkZUluIDAuM3MgZWFzZTtcbn1cblxuLmJ0bi1hZGQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICMwMDAwMDAsICMwMDAwMDApO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5iZy1ncmFkaWVudCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMwMGJmYTUsICMwMDc5NmIpO1xufVxuXG4uc2VwYXJhdG9yLWdyYWRpZW50IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjMDBiZmE1LCAjMDA3OTZiKTtcbn1cblxuLnEtYnRuIHtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XG59XG5cbi5xLWJ0bjpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtM3B4KTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xufVxuXG4uYnRuLWNhbmNlbCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgI2VmNTM1MCwgI2U1MzkzNSk7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmJ0bi1jcmVhdGUge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICM2NmJiNmEsICM0M2EwNDcpO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5xLWFuaW1hdGUtYm91bmNlIHtcbiAgYW5pbWF0aW9uOiBib3VuY2VJbiAwLjZzIGVhc2U7XG59XG5cbkBrZXlmcmFtZXMgZmFkZUluIHtcbiAgZnJvbSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTBweCk7XG4gIH1cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgYm91bmNlSW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIH1cbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLWJ0blxuICAgIEBjbGljaz1cImRlbGV0ZURpYWxvZ1wiXG4gICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgaWNvbj1cImRlbGV0ZVwiXG4gICAgc2l6ZT1cInNtXCJcbiAgICBmbGF0XG4gICAgcm91bmRcbiAgICBkZW5zZVxuICAgIGFyaWEtbGFiZWw9XCJEZWxldGVcIlxuICA+XG4gICAgPHEtdG9vbHRpcCBjbGFzcz1cImJnLW5lZ2F0aXZlXCIgOmRlbGF5PVwiMjAwXCI+RGVsZXRlPC9xLXRvb2x0aXA+XG4gIDwvcS1idG4+XG4gIDxxLWRpYWxvZyB2LW1vZGVsPVwiZGlhbG9nVmlzaWJsZVwiIHBlcnNpc3RlbnQ+XG4gICAgPHEtY2FyZCBjbGFzcz1cInEtcGEtbWQgcS1yb3VuZGVkIHEtZWxldmF0ZS0yIGJnLXdoaXRlIHRleHQtZ3JleS05XCI+XG4gICAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXB0LW5vbmUgcS1wYi1zbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNSBxLW1iLXhzXCI+Q29uZmlybSBEZWxldGlvbjwvZGl2PlxuICAgICAgICA8cCBjbGFzcz1cInRleHQtYm9keTIgcS1tYi1ub25lXCI+XG4gICAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/IFRoaXMgYWN0aW9uIGNhbm5vdCBiZVxuICAgICAgICAgIHVuZG9uZS5cbiAgICAgICAgPC9wPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLXNlcGFyYXRvciBjbGFzcz1cInEtbWItbWRcIiAvPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgICA8cS1jYXJkLWFjdGlvbnMgYWxpZ249XCJyaWdodFwiIGNsYXNzPVwicS1wdC1ub25lXCI+XG4gICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgbGFiZWw9XCJDYW5jZWxcIlxuICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIHYtY2xvc2UtcG9wdXBcbiAgICAgICAgICAgIGNsYXNzPVwicS1tci1zbVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBsYWJlbD1cIkRlbGV0ZVwiXG4gICAgICAgICAgICBjb2xvcj1cIm5lZ2F0aXZlXCJcbiAgICAgICAgICAgIEBjbGljaz1cIm9uRGVsZXRlXCJcbiAgICAgICAgICAgIGNsYXNzPVwicS1idG4tcm91bmRlZCBxLXB4LWxnXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L3EtY2FyZC1hY3Rpb25zPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8L3EtY2FyZD5cbiAgPC9xLWRpYWxvZz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyB1c2VSZWNpcGVTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3JlY2lwZVwiO1xuaW1wb3J0IHsgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuXG5jb25zdCByZWNpcGVTdG9yZSA9IHVzZVJlY2lwZVN0b3JlKCk7XG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzKFtcImRlbGV0ZVwiXSk7XG5jb25zdCBkaWFsb2dWaXNpYmxlID0gcmVmKGZhbHNlKTtcblxuY29uc3QgZGVsZXRlRGlhbG9nID0gKCkgPT4ge1xuICBkaWFsb2dWaXNpYmxlLnZhbHVlID0gdHJ1ZTtcbn07XG5cbmNvbnN0IG9uRGVsZXRlID0gYXN5bmMgKCkgPT4ge1xuICBhd2FpdCByZWNpcGVTdG9yZS5kZWxldGVSZWNpcGUocHJvcHMuZGVsZXRlLnJvdy5pZCk7XG5cbiAgZGlhbG9nVmlzaWJsZS52YWx1ZSA9IGZhbHNlO1xufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLnEtY2FyZCB7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIGJveC1zaGFkb3c6IDAgOHB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4ucS1jYXJkLXNlY3Rpb24ge1xuICBwYWRkaW5nOiAyNHB4IDMycHg7XG59XG5cbi5xLWJ0biB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzIGVhc2UsIGJveC1zaGFkb3cgMC4ycyBlYXNlO1xufVxuXG4ucS1idG4tcm91bmRlZCB7XG4gIGJvcmRlci1yYWRpdXM6IDUwcHg7XG59XG5cbi5xLWJ0bjpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xufVxuXG4ucS1idG46YWN0aXZlIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICBib3gtc2hhZG93OiBub25lO1xufVxuXG4udGV4dC1oNSB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi50ZXh0LWJvZHkyIHtcbiAgY29sb3I6ICM2NjY7XG59XG5cbi5xLWVsZXZhdGUtMiB7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi5iZy13aGl0ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG59XG5cbi50ZXh0LWdyZXktOSB7XG4gIGNvbG9yOiAjMzMzO1xufVxuXG4ucS1zZXBhcmF0b3Ige1xuICBib3JkZXItY29sb3I6ICNlZWU7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGFsaWduPVwibGVmdFwiPlxuICAgIDxxLWlucHV0XG4gICAgICBjbGFzcz1cInEtcGItbGcgcS1wbC1zbSBkeW5hbWljLXdpZHRoXCJcbiAgICAgIHYtbW9kZWw9XCJmaWx0ZXJcIlxuICAgICAgb3V0bGluZWRcbiAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgIGRlYm91bmNlPVwiMTAwMFwiXG4gICAgICBmbGF0XG4gICAgICBkZW5zZVxuICAgICAgcm91bmRlZFxuICAgID5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICA8cS1pY29uIG5hbWU9XCJzZWFyY2hcIiAvPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L3EtaW5wdXQ+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJzcGlubmVyLXdyYXBwZXJcIiB2LWlmPVwibG9hZGluZ1wiPlxuICAgIDxxLXNwaW5uZXItZG90cyBzaXplPVwiNTBweFwiIGNvbG9yPVwicHJpbWFyeVwiIC8+XG4gIDwvZGl2PlxuXG4gIDxkaXYgdi1lbHNlPlxuICAgIDxkaXYgdi1pZj1cImZpbHRlcmVkUm93cy5sZW5ndGggPT09IDBcIiBjbGFzcz1cImRhdGEtZXJyb3JcIj5cbiAgICAgIDxxLWljb24gbmFtZT1cIndhcm5pbmdcIiBjb2xvcj1cIndhcm5pbmdcIiBzaXplPVwiNGVtXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJxLW1sLXNtIHRleHQtaDZcIj5ObyBkYXRhIGF2YWlsYWJsZTwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxxLXRhYmxlXG4gICAgICB2LWVsc2VcbiAgICAgIGNsYXNzPVwidGFibGUtY29udGFpbmVyIGVsZWdhbnQtY29udGFpbmVyIHN0aWNreS1oZWFkZXJcIlxuICAgICAgOmZpbHRlcj1cImZpbHRlclwiXG4gICAgICA6dmlydHVhbC1zY3JvbGwtc3RpY2t5LXNpemUtc3RhcnQ9XCI0OFwiXG4gICAgICBmbGF0XG4gICAgICA6Y29sdW1ucz1cInJlY2lwZUNvbHVtbnNcIlxuICAgICAgOnJvd3M9XCJmaWx0ZXJlZFJvd3NcIlxuICAgICAgcm93LWtleT1cIm5hbWVcIlxuICAgICAgdmlydHVhbC1zY3JvbGxcbiAgICAgIHYtbW9kZWw6cGFnaW5hdGlvbj1cInBhZ2luYXRpb25cIlxuICAgICAgOnJvd3MtcGVyLXBhZ2Utb3B0aW9ucz1cIlswXVwiXG4gICAgICBoaWRlLWJvdHRvbVxuICAgICAgc3R5bGU9XCJoZWlnaHQ6IDQwMHB4XCJcbiAgICA+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC1uYW1lPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIiBjbGFzcz1cImN1cnNvci1wb2ludGVyXCI+XG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgID57eyBjYXBpdGFsaXplRmlyc3RMZXR0ZXIocHJvcHMucm93Lm5hbWUpIH19XG4gICAgICAgICAgICA8cS10b29sdGlwIGNsYXNzPVwiYmctYmx1ZS1ncmV5LThcIiA6b2Zmc2V0PVwiWzEwLCAxMF1cIlxuICAgICAgICAgICAgICA+RWRpdCBSZWNpcGUgTmFtZTwvcS10b29sdGlwXG4gICAgICAgICAgICA+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxxLXBvcHVwLWVkaXRcbiAgICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCIodmFsKSA9PiB1cGRhdGVSZWNpcGVOYW1lKHByb3BzLnJvdywgdmFsKVwiXG4gICAgICAgICAgICB2LW1vZGVsPVwicHJvcHMucm93Lm5hbWVcIlxuICAgICAgICAgICAgYXV0by1zYXZlXG4gICAgICAgICAgICB2LXNsb3Q9XCJzY29wZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgY2xhc3M9XCJ0ZXh0LWNhcGl0YWxpemVcIlxuICAgICAgICAgICAgICB2LW1vZGVsPVwic2NvcGUudmFsdWVcIlxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBhdXRvZm9jdXNcbiAgICAgICAgICAgICAgY291bnRlclxuICAgICAgICAgICAgICBAa2V5dXAuZW50ZXI9XCJzY29wZS5zZXRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L3EtcG9wdXAtZWRpdD5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLWNhdGVnb3J5PVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQga2V5PVwibmFtZVwiIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPHEtYmFkZ2UgOmNvbG9yPVwiZ2V0QmFkZ2VDYXRlZ29yeUNvbG9yKHByb3BzLnJvdy5jYXRlZ29yeSlcIj5cbiAgICAgICAgICAgIHt7IHByb3BzLnJvdy5jYXRlZ29yeSB9fVxuICAgICAgICAgIDwvcS1iYWRnZT5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDwhLS0gPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtYnJlYWRfZ3JvdXBzPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8cS10b29sdGlwXG4gICAgICAgICAgICA6b2Zmc2V0PVwiWzAsIDEwXVwiXG4gICAgICAgICAgICA6ZGVsYXk9XCI2MDBcIlxuICAgICAgICAgICAgY2xhc3M9XCJiZy1pbmZvIHRleHQtZGFyayB0ZXh0LXN1YnRpdGxlMVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzcz1cInEtcGItc20gdGV4dC1jZW50ZXIgdGV4dC1oNiB0ZXh0LXdlaWdodC1ib2xkIHRleHQtc3VidGl0bGUyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgQnJlYWRzIExpc3RcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHEtc2VwYXJhdG9yIGNsYXNzPVwicS1tYi1tZFwiIGNvbG9yPVwieWVsbG93XCIgLz5cbiAgICAgICAgICAgIDxkaXYgdi1mb3I9XCJicmVhZCBpbiBwcm9wcy5yb3cuYnJlYWRfZ3JvdXBzXCIgOmtleT1cImJyZWFkXCI+XG4gICAgICAgICAgICAgIHt7IGJyZWFkIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3EtdG9vbHRpcD5cbiAgICAgICAgICA8cS1jaGlwIHNxdWFyZSBvdXRsaW5lIGNvbG9yPVwicmVkLTZcIiBjbGFzcz1cInRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgIHt7IHByb3BzLnJvdy5icmVhZF9ncm91cHMubGVuZ3RoIH19IGJyZWFkc1xuICAgICAgICAgIDwvcS1jaGlwPlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtaW5ncmVkaWVudF9ncm91cHM9XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgIDxxLXRvb2x0aXBcbiAgICAgICAgICAgIDpkZWxheT1cIjYwMFwiXG4gICAgICAgICAgICBjbGFzcz1cImJnLWluZm8gdGV4dC1kYXJrIHRleHQtc3VidGl0bGUxXCJcbiAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDMwMHB4XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzPVwicS1wYi1zbSB0ZXh0LWNlbnRlciB0ZXh0LWg2IHRleHQtd2VpZ2h0LWJvbGQgdGV4dC1zdWJ0aXRsZTJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBJbmdyZWRpZW50cyBMaXN0XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxxLXNlcGFyYXRvciBjbGFzcz1cInEtbWItbWRcIiBjb2xvcj1cInllbGxvd1wiIC8+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzPVwicm93IGp1c3RpZnktYmV0d2VlblwiXG4gICAgICAgICAgICAgIHYtZm9yPVwiaW5ncmVkaWVudCBpbiBwcm9wcy5yb3cuaW5ncmVkaWVudF9ncm91cHNcIlxuICAgICAgICAgICAgICA6a2V5PVwiaW5ncmVkaWVudC5pbmdyZWRpZW50X25hbWVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHt7IGluZ3JlZGllbnQuaW5ncmVkaWVudF9uYW1lIH19XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2Pnt7IGluZ3JlZGllbnQucXVhbnRpdHkgfX0ge3sgaW5ncmVkaWVudC51bml0IH19PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3EtdG9vbHRpcD5cbiAgICAgICAgICA8cS1jaGlwIHNxdWFyZSBvdXRsaW5lIGNvbG9yPVwicHVycGxlLTZcIiBjbGFzcz1cInRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgIHt7IHByb3BzLnJvdy5pbmdyZWRpZW50X2dyb3Vwcy5sZW5ndGggfX0gaW5ncmVkaWVudHNcbiAgICAgICAgICA8L3EtY2hpcD5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLXRhcmdldD1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIGF1dG8td2lkdGggY2xhc3M9XCJjdXJzb3ItcG9pbnRlciB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICA+e3sgcHJvcHMucm93LnRhcmdldCA/IHByb3BzLnJvdy50YXJnZXQgOiBcIlNldCBUYXJnZXRcIiB9fVxuXG4gICAgICAgICAgICA8cS10b29sdGlwIGNsYXNzPVwiYmctYmx1ZS1ncmV5LThcIiA6b2Zmc2V0PVwiWzEwLCAxMF1cIlxuICAgICAgICAgICAgICA+RWRpdCBUYXJnZXQ8L3EtdG9vbHRpcFxuICAgICAgICAgICAgPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8cS1wb3B1cC1lZGl0XG4gICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwiKHZhbCkgPT4gdXBkYXRlUmVjaXBlKHByb3BzLnJvdywgdmFsKVwiXG4gICAgICAgICAgICB2LW1vZGVsPVwicHJvcHMucm93LnRhcmdldFwiXG4gICAgICAgICAgICBhdXRvLXNhdmVcbiAgICAgICAgICAgIHYtc2xvdD1cInNjb3BlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICB2LW1vZGVsPVwic2NvcGUudmFsdWVcIlxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBhdXRvZm9jdXNcbiAgICAgICAgICAgICAgY291bnRlclxuICAgICAgICAgICAgICBtYXNrPVwiIyMjXCJcbiAgICAgICAgICAgICAgQGtleXVwLmVudGVyPVwic2NvcGUuc2V0XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9xLXBvcHVwLWVkaXQ+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC1zdGF0dXM9XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCA6cHJvcHM9XCJwcm9wc1wiPlxuICAgICAgICAgIDxxLWJhZGdlIG91dGxpbmUgOmNvbG9yPVwiZ2V0QmFkZ2VTdGF0dXNDb2xvcihwcm9wcy5yb3cuc3RhdHVzKVwiPlxuICAgICAgICAgICAge3sgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHByb3BzLnJvdy5zdGF0dXMpIH19XG4gICAgICAgICAgICA8cS10b29sdGlwIGNsYXNzPVwiYmctYmx1ZS1ncmV5LThcIiA6b2Zmc2V0PVwiWzEwLCAxMF1cIlxuICAgICAgICAgICAgICA+Q2hhbmdlIFN0YXR1czwvcS10b29sdGlwXG4gICAgICAgICAgICA+XG4gICAgICAgICAgPC9xLWJhZGdlPlxuICAgICAgICAgIDxxLXBvcHVwLWVkaXRcbiAgICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCIodmFsKSA9PiB1cGRhdGVSZWNpcGVTdGF0dXMocHJvcHMucm93LCB2YWwpXCJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJwcm9wcy5yb3cuc3RhdHVzXCJcbiAgICAgICAgICAgIGF1dG8tc2F2ZVxuICAgICAgICAgICAgdi1zbG90PVwic2NvcGVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuPiB7eyBwcm9wcy5yb3cubmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxxLXNlbGVjdFxuICAgICAgICAgICAgICB2LW1vZGVsPVwic2NvcGUudmFsdWVcIlxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBsYWJlbD1cInN0YXR1c1wiXG4gICAgICAgICAgICAgIGF1dG9mb2N1c1xuICAgICAgICAgICAgICA6b3B0aW9ucz1cInN0YXR1c1wiXG4gICAgICAgICAgICAgIGNvdW50ZXJcbiAgICAgICAgICAgICAgbWFzaz1cIiMjI1wiXG4gICAgICAgICAgICAgIEBrZXl1cC5lbnRlcj1cInNjb3BlLnNldFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvcS1wb3B1cC1lZGl0PlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPiAtLT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLWFjdGlvbj1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWNlbnRlciBxLWd1dHRlci14LW1kXCI+XG4gICAgICAgICAgICA8UmVjaXBlRGVsZXRlIDpkZWxldGU9XCJwcm9wc1wiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9xLXRhYmxlPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBvbk1vdW50ZWQsIGNvbXB1dGVkLCByZWYsIHdhdGNoIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IFJlY2lwZUVkaXQgZnJvbSBcIi4vUmVjaXBlRWRpdC52dWVcIjtcbmltcG9ydCBSZWNpcGVEZWxldGUgZnJvbSBcIi4vUmVjaXBlRGVsZXRlLnZ1ZVwiO1xuaW1wb3J0IHsgdXNlUmVjaXBlU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9yZWNpcGVcIjtcbi8vIGltcG9ydCB7IHVwZGF0ZV9yZWNpcGVfdGFyZ2V0IH0gZnJvbSBcInNyYy9zZXJ2aWNlcy9yZWNpcGVcIjtcbmltcG9ydCB7IGFwaSB9IGZyb20gXCJzcmMvYm9vdC9heGlvc1wiO1xuaW1wb3J0IHsgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuXG5jb25zdCByZWNpcGVTdG9yZSA9IHVzZVJlY2lwZVN0b3JlKCk7XG5jb25zdCBmaWx0ZXIgPSByZWYoXCJcIik7XG5jb25zdCBsb2FkaW5nID0gcmVmKHRydWUpO1xuY29uc3QgcmVjaXBlcyA9IHJlZihbXSk7XG5jb25zdCBzaG93Tm9EYXRhTWVzc2FnZSA9IHJlZihmYWxzZSk7XG5jb25zdCBwYWdpbmF0aW9uID0gcmVmKHtcbiAgcm93c1BlclBhZ2U6IDAsXG59KTtcbmNvbnN0IHN0YXR1cyA9IFtcIkluYWN0aXZlXCIsIFwiQWN0aXZlXCJdO1xuXG5jb25zdCByZWNpcGVSb3dzID0gY29tcHV0ZWQoKCkgPT4gcmVjaXBlU3RvcmUucmVjaXBlcyk7XG5cbi8vIENvbXB1dGVkIHByb3BlcnR5IGZvciBmaWx0ZXJlZCByb3dzXG5jb25zdCBmaWx0ZXJlZFJvd3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmICghZmlsdGVyLnZhbHVlKSB7XG4gICAgcmV0dXJuIHJlY2lwZVJvd3MudmFsdWU7XG4gIH1cbiAgcmV0dXJuIHJlY2lwZVJvd3MudmFsdWUuZmlsdGVyKChyb3cpID0+XG4gICAgcm93Lm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmaWx0ZXIudmFsdWUudG9Mb3dlckNhc2UoKSlcbiAgKTtcbn0pO1xuXG5jb25zdCBjYXBpdGFsaXplRmlyc3RMZXR0ZXIgPSAobG9jYXRpb24pID0+IHtcbiAgaWYgKCFsb2NhdGlvbikgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBsb2NhdGlvblxuICAgIC5zcGxpdChcIiBcIilcbiAgICAubWFwKCh3b3JkKSA9PiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpKVxuICAgIC5qb2luKFwiIFwiKTtcbn07XG5cbi8vIGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVJlY2lwZShkYXRhLCB2YWwpIHtcbi8vICAgdHJ5IHtcbi8vICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wdXQoXCIvYXBpL3VwZGF0ZS10YXJnZXQvXCIgKyBkYXRhLmlkLCB7XG4vLyAgICAgICB0YXJnZXQ6IHBhcnNlSW50KHZhbCksXG4vLyAgICAgfSk7XG5cbi8vICAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlXCIsIHJlc3BvbnNlKTtcbi8vICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuLy8gICAgICAgY29uc3QgaSA9IHJlY2lwZXMudmFsdWUuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09IGRhdGEuaWQpO1xuLy8gICAgICAgcmVjaXBlcy52YWx1ZVtpXSA9IHZhbDtcbi8vICAgICB9XG5cbi8vICAgICBOb3RpZnkuY3JlYXRlKHtcbi8vICAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcbi8vICAgICAgIG1lc3NhZ2U6IFwiUmVjaXBlIHRhcmdldCBlZGl0ZWQgc3VjY2Vzc2Z1bGx5XCIsXG4vLyAgICAgICAvLyBwb3NpdGlvbjogXCJ0b3BcIixcbi8vICAgICB9KTtcbi8vICAgfSBjYXRjaCAoZXJyb3IpIHtcbi8vICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgcmVjaXBlIHRhcmdldDpcIiwgZXJyb3IpO1xuLy8gICAgIE5vdGlmeS5jcmVhdGUoe1xuLy8gICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuLy8gICAgICAgbWVzc2FnZTogXCJGYWlsZWQgdG8gZWRpdCByZWNpcGUgdGFyZ2V0XCIsXG4vLyAgICAgICAvLyBwb3NpdGlvbjogXCJ0b3BcIixcbi8vICAgICB9KTtcbi8vICAgfVxuLy8gfVxuXG4vLyBhc3luYyBmdW5jdGlvbiB1cGRhdGVSZWNpcGVOYW1lKGRhdGEsIHZhbCkge1xuLy8gICB0cnkge1xuLy8gICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnB1dChcIi9hcGkvdXBkYXRlLW5hbWUvXCIgKyBkYXRhLmlkLCB7XG4vLyAgICAgICBuYW1lOiB2YWwsXG4vLyAgICAgfSk7XG4vLyAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbi8vICAgICAgIGNvbnN0IGkgPSByZWNpcGVzLnZhbHVlLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PSBkYXRhLmlkKTtcbi8vICAgICAgIHJlY2lwZXMudmFsdWVbaV0gPSB2YWw7XG4vLyAgICAgfVxuXG4vLyAgICAgTm90aWZ5LmNyZWF0ZSh7XG4vLyAgICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXG4vLyAgICAgICBtZXNzYWdlOiBcIlJlY2lwZSBuYW1lIGVkaXRlZCBzdWNjZXNzZnVsbHlcIixcbi8vICAgICAgIC8vIHBvc2l0aW9uOiBcInRvcFwiLFxuLy8gICAgIH0pO1xuLy8gICB9IGNhdGNoIChlcnJvcikge1xuLy8gICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB1cGRhdGluZyByZWNpcGUgbmFtZTpcIiwgZXJyb3IpO1xuLy8gICAgIE5vdGlmeS5jcmVhdGUoe1xuLy8gICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuLy8gICAgICAgbWVzc2FnZTogXCJGYWlsZWQgdG8gZWRpdCByZWNpcGUgbmFtZVwiLFxuLy8gICAgICAgLy8gcG9zaXRpb246IFwidG9wXCIsXG4vLyAgICAgfSk7XG4vLyAgIH1cbi8vIH1cbi8vIGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVJlY2lwZVN0YXR1cyhkYXRhLCB2YWwpIHtcbi8vICAgdHJ5IHtcbi8vICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wdXQoXCIvYXBpL3VwZGF0ZS1zdGF0dXMvXCIgKyBkYXRhLmlkLCB7XG4vLyAgICAgICBzdGF0dXM6IHZhbCxcbi8vICAgICB9KTtcbi8vICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuLy8gICAgICAgY29uc3QgaSA9IHJlY2lwZXMudmFsdWUuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09IGRhdGEuaWQpO1xuLy8gICAgICAgcmVjaXBlcy52YWx1ZVtpXSA9IHZhbDtcbi8vICAgICB9XG5cbi8vICAgICBOb3RpZnkuY3JlYXRlKHtcbi8vICAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcbi8vICAgICAgIG1lc3NhZ2U6IFwiUmVjaXBlIHN0YXR1cyBjaGFuZ2Ugc3VjY2Vzc2Z1bGx5XCIsXG4vLyAgICAgICAvLyBwb3NpdGlvbjogXCJ0b3BcIixcbi8vICAgICB9KTtcbi8vICAgfSBjYXRjaCAoZXJyb3IpIHtcbi8vICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgcmVjaXBlIHN0YXR1czpcIiwgZXJyb3IpO1xuLy8gICAgIE5vdGlmeS5jcmVhdGUoe1xuLy8gICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuLy8gICAgICAgbWVzc2FnZTogXCJGYWlsZWQgdG8gY2hhbmdlIHJlY2lwZSBzdGF0dXNcIixcbi8vICAgICAgIC8vIHBvc2l0aW9uOiBcInRvcFwiLFxuLy8gICAgIH0pO1xuLy8gICB9XG4vLyB9XG5cbm9uTW91bnRlZChhc3luYyAoKSA9PiB7XG4gIGF3YWl0IHJlbG9hZFRhYmxlRGF0YSgpO1xufSk7XG5cbmNvbnN0IHJlbG9hZFRhYmxlRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgICByZWNpcGVSb3dzLnZhbHVlID0gYXdhaXQgcmVjaXBlU3RvcmUuZmV0Y2hSZWNpcGVzKCk7XG4gICAgaWYgKCFyZWNpcGVSb3dzLnZhbHVlLmxlbmd0aCkge1xuICAgICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKFwiUmVjaXBlXCIsIHJlY2lwZVJvd3MudmFsdWUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgZmV0Y2hpbmcgcmVjaXBlOiBcIiwgZXJyb3IpO1xuICAgIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gdHJ1ZTtcbiAgfSBmaW5hbGx5IHtcbiAgICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIH1cbn07XG5cbndhdGNoKGZpbHRlciwgYXN5bmMgKG5ld0ZpbHRlcikgPT4ge1xuICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpO1xuICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gZmlsdGVyZWRSb3dzLnZhbHVlLmxlbmd0aCA9PT0gMDtcbn0pO1xuXG5jb25zdCByZWNpcGVDb2x1bW5zID0gW1xuICB7XG4gICAgbmFtZTogXCJuYW1lXCIsXG4gICAgbGFiZWw6IFwiUmVjaXBlIE5hbWVcIixcbiAgICBhbGlnbjogXCJsZWZ0XCIsXG4gICAgZmllbGQ6IChyb3cpID0+IHJvdy5uYW1lLFxuICAgIGZvcm1hdDogKHZhbCkgPT4gYCR7dmFsfWAsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG4gIC8vIHtcbiAgLy8gICBuYW1lOiBcInRhcmdldFwiLFxuICAvLyAgIGxhYmVsOiBcIlRhcmdldCBQY3NcIixcbiAgLy8gICBhbGlnbjogXCJsZWZ0XCIsXG4gIC8vICAgZmllbGQ6IFwidGFyZ2V0XCIsXG4gIC8vICAgc29ydGFibGU6IHRydWUsXG4gIC8vIH0sXG4gIHtcbiAgICBuYW1lOiBcImNhdGVnb3J5XCIsXG4gICAgYWxpZ246IFwibGVmdFwiLFxuICAgIGxhYmVsOiBcIkNhdGVnb3J5XCIsXG4gICAgZmllbGQ6IFwiY2F0ZWdvcnlcIixcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbiAgLy8ge1xuICAvLyAgIG5hbWU6IFwiYnJlYWRfZ3JvdXBzXCIsXG4gIC8vICAgbGFiZWw6IFwiTGlzdCBvZiBCcmVhZFwiLFxuICAvLyAgIGFsaWduOiBcImNlbnRlclwiLFxuICAvLyAgIGZpZWxkOiBcImJyZWFkX2dyb3Vwc1wiLFxuICAvLyAgIHNvcnRhYmxlOiB0cnVlLFxuICAvLyB9LFxuICAvLyB7XG4gIC8vICAgbmFtZTogXCJpbmdyZWRpZW50X2dyb3Vwc1wiLFxuICAvLyAgIGxhYmVsOiBcIkxpc3Qgb2YgSW5ncmVkaWVudHNcIixcbiAgLy8gICBhbGlnbjogXCJjZW50ZXJcIixcbiAgLy8gICBmaWVsZDogXCJpbmdyZWRpZW50X2dyb3Vwc1wiLFxuICAvLyAgIHNvcnRhYmxlOiB0cnVlLFxuICAvLyB9LFxuICAvLyB7XG4gIC8vICAgbmFtZTogXCJzdGF0dXNcIixcbiAgLy8gICBsYWJlbDogXCJTdGF0dXNcIixcbiAgLy8gICBhbGlnbjogXCJjZW50ZXJcIixcbiAgLy8gICBmaWVsZDogXCJzdGF0dXNcIixcbiAgLy8gICBzb3J0YWJsZTogdHJ1ZSxcbiAgLy8gfSxcbiAge1xuICAgIG5hbWU6IFwiYWN0aW9uXCIsXG4gICAgbGFiZWw6IFwiQWN0aW9uXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG5dO1xuXG5jb25zdCBnZXRCYWRnZUNhdGVnb3J5Q29sb3IgPSAoY2F0ZWdvcnkpID0+IHtcbiAgc3dpdGNoIChjYXRlZ29yeSkge1xuICAgIGNhc2UgXCJGaWxsaW5nXCI6XG4gICAgICByZXR1cm4gXCJ0ZWFsXCI7XG4gICAgY2FzZSBcIkRvdWdoXCI6XG4gICAgICByZXR1cm4gXCJicm93bi02XCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcImdyZXlcIjtcbiAgfVxufTtcblxuY29uc3QgZ2V0QmFkZ2VTdGF0dXNDb2xvciA9IChzdGF0dXMpID0+IHtcbiAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICBjYXNlIFwiSW5hY3RpdmVcIjpcbiAgICAgIHJldHVybiBcImdyZXlcIjtcbiAgICBjYXNlIFwiQWN0aXZlXCI6XG4gICAgICByZXR1cm4gXCJncmVlblwiO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gXCJncmV5XCI7XG4gIH1cbn07XG48L3NjcmlwdD5cbjxzdHlsZSBzY29wZWQ+XG4uZWxlZ2FudC1jb250YWluZXIge1xuICBiYWNrZ3JvdW5kOiAjZjdmOGZjO1xuICBwYWRkaW5nOiAxcmVtO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG59XG4uYWJzb2x1dGUtZnVsbCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xufVxuLnNwaW5uZXItd3JhcHBlciB7XG4gIG1pbi1oZWlnaHQ6IDQwdmg7IC8qIE1pbmltdW0gaGVpZ2h0IG9mIDUwJSB2aWV3cG9ydCBoZWlnaHQgKi9cbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uZGF0YS1lcnJvciB7XG4gIG1pbi1oZWlnaHQ6IDQwdmg7IC8qIE1pbmltdW0gaGVpZ2h0IG9mIDUwJSB2aWV3cG9ydCBoZWlnaHQgKi9cbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4udGFibGUtY29udGFpbmVyIHtcbiAgbWF4LWhlaWdodDogNDAwcHg7IC8qIEFkanVzdCBhcyBuZWVkZWQgKi9cbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLnEtdGFibGUtY29udGFpbmVyIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbiAhaW1wb3J0YW50OyAvKiBUYXJnZXQgdGhlIGNvbnRhaW5lciBnZW5lcmF0ZWQgYnkgcS10YWJsZSAqL1xufVxuXG4uZHluYW1pYy13aWR0aCB7XG4gIHdpZHRoOiAxMDAlOyAvKiBkZWZhdWx0IHdpZHRoICovXG4gIG1heC13aWR0aDogNTAwcHg7XG4gIG1pbi13aWR0aDogMzAwcHg7IC8qIHNldCBhIG1pbmltdW0gd2lkdGggKi9cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDE1MDBweCkge1xuICAuZHluYW1pYy13aWR0aCB7XG4gICAgbWF4LXdpZHRoOiA1MDBweDsgLyogc21hbGxlciB3aWR0aCBmb3IgbWVkaXVtLXNpemVkIHNjcmVlbnMgKi9cbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLmR5bmFtaWMtd2lkdGgge1xuICAgIG1heC13aWR0aDogNTAwcHg7IC8qIHNtYWxsZXIgd2lkdGggZm9yIHRhYmxldHMgKi9cbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNDgwcHgpIHtcbiAgLmR5bmFtaWMtd2lkdGgge1xuICAgIG1heC13aWR0aDogMjAwcHg7IC8qIHNtYWxsZXIgd2lkdGggZm9yIG1vYmlsZSBzY3JlZW5zICovXG4gIH1cbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcU5BLFVBQU0sYUFBYSxTQUFTLE1BQU0sWUFBWSxPQUFPO0FBSXJELFVBQU0sY0FBYyxlQUFjO0FBQ2xDLFVBQU0sU0FBUyxJQUFJLEtBQUs7QUFDeEIsVUFBTSxnQkFBZ0IsTUFBTTtBQUMxQixhQUFPLFFBQVE7QUFBQSxJQUNqQjtBQUNBLFVBQU0sV0FBVyxDQUFDLFNBQVMsU0FBUztBQUNwQyxVQUFNLFVBQVUsSUFBSSxLQUFLO0FBQ3pCLFVBQU0sU0FBUyxTQUFTO0FBQUEsTUFDdEIsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1osQ0FBQztBQW9GRCxVQUFNLGFBQWEs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
