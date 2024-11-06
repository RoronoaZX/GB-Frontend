import { Q as QBadge } from "./QBadge.cf1023ef.js";
import { _ as _export_sfc, g as computed, n as ref, t as reactive, u as watch, o as openBlock, a4 as createElementBlock, a as createVNode, M as QBtn, w as withCtx, Q as QCard, I as QCardSection, af as withDirectives, J as createBaseVNode, K as QInput, a1 as createTextVNode, a5 as Fragment, a6 as renderList, c as createBlock, a0 as toDisplayString, bc as withKeys, aJ as withModifiers, aK as QCardActions, a3 as QDialog, N as Notify, a2 as QSeparator, O as pushScopeId, R as popScopeId, z as onMounted, L as QIcon } from "./index.9b9dbcba.js";
import { Q as QPage } from "./QPage.4b0a10d6.js";
import { Q as QSpace } from "./QSpace.5918deea.js";
import { Q as QSelect, a as QTd, b as QTable } from "./QTable.0bf3c36f.js";
import { Q as QItem, a as QItemSection } from "./QItem.79579b05.js";
import { a as QItemLabel } from "./QItemLabel.345b9721.js";
import { Q as QList } from "./QList.8d472d75.js";
import { C as ClosePopup } from "./ClosePopup.83fef54c.js";
import { u as useProductsStore } from "./product.c4d2d4c2.js";
import { u as useRawMaterialsStore } from "./raw-material.7ef38176.js";
import { u as useRecipeStore } from "./recipe.78164cee.js";
import { Q as QSpinnerDots } from "./QSpinnerDots.4f44ad7f.js";
import { Q as QTooltip } from "./QTooltip.a17992ce.js";
import { Q as QPopupEdit } from "./QPopupEdit.bf8526f6.js";
import { Q as QChip } from "./QChip.d5fc407c.js";
import { api } from "./axios.91431b0b.js";
import "./QVirtualScroll.3c7f7fea.js";
import "./rtl.276c3f1b.js";
import "./QMenu.d2cee634.js";
import "./format.76edee29.js";
var RecipeCreate_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$3 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mr-md" }, "\u{1F4DC} Add Recipe", -1);
const _hoisted_2$3 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_3$2 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_4$1 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_5$1 = { class: "q-mt-md q-animated q-animate-bounce" };
const _hoisted_6$1 = { class: "q-mt-md q-gutter-y-sm q-animated q-animate-bounce" };
const _hoisted_7$1 = /* @__PURE__ */ createBaseVNode("div", { class: "text-weight-thin" }, "Ingredients List", -1);
const _hoisted_8$1 = { class: "q-mt-xl q-gutter-y-sm q-animated q-animate-bounce" };
const _hoisted_9 = { class: "row justify-between" };
const _hoisted_10 = ["onKeyup"];
const _hoisted_11 = { align: "right" };
const _sfc_main$3 = {
  __name: "RecipeCreate",
  setup(__props) {
    const recipeRows = computed(() => recipeStore.recipes);
    const breadProductStore = useProductsStore();
    const ingredientsStore = useRawMaterialsStore();
    const recipeStore = useRecipeStore();
    const dialog = ref(false);
    const openAddRecipe = () => {
      dialog.value = true;
    };
    const category = ["Dough", "Filling"];
    const recipe = reactive({
      name: "",
      target: "",
      category: ""
    });
    const breadGroup = ref(null);
    const breadOptions = ref([]);
    const filterBreadOptions = ref(breadOptions.value);
    const ingredientGroup = ref([]);
    const ingredientOptions = ref([]);
    const selectedIngredients = reactive({
      name: "",
      quantity: ""
    });
    const filterIngredientsOptions = ref(ingredientOptions.value);
    const loading = ref(false);
    const fetchBreadsData = async () => {
      await breadProductStore.fetchProductsByCategory("Bread");
      loading.value = false;
      breadOptions.value = breadProductStore.breads.map((val) => {
        return {
          label: val.name,
          value: val.id
        };
      });
    };
    fetchBreadsData();
    const fetchIngredientsData = async () => {
      await ingredientsStore.fetchIngredients("Ingredients");
      loading.value = false;
      ingredientOptions.value = ingredientsStore.ingredients.map((val) => {
        return {
          label: val.name,
          value: val.id,
          unit: val.unit
        };
      });
    };
    fetchIngredientsData();
    const clearData = () => {
      selectedIngredients.name = "", selectedIngredients.quantity = "";
    };
    const createValue = (val, done) => {
      if (val.length > 2) {
        if (!breadOptions.value.includes(val)) {
          done(val, "add-unique");
        }
      }
    };
    const filterFn = (val, update) => {
      update(() => {
        if (val === "") {
          filterBreadOptions.value = breadOptions.value;
        } else {
          const needle = val.toLowerCase();
          filterBreadOptions.value = breadOptions.value.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    };
    const filterIngredients = (val, update) => {
      update(() => {
        if (val === "") {
          filterIngredientsOptions.value = ingredientOptions.value;
        } else {
          const needle = val.toLowerCase();
          filterIngredientsOptions.value = ingredientOptions.value.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    };
    const saveRecipe = async () => {
      const newData = {
        name: recipe.name,
        target: recipe.target,
        category: recipe.category,
        status: "Active",
        breads: breadGroup.value.map((bread) => ({
          bread_id: bread.value
        })),
        ingredients: ingredientGroup.value.map((ingredient) => ({
          ingredient_id: ingredient.ingredients_id,
          quantity: ingredient.quantity
        }))
      };
      console.log("Recipe", newData);
      try {
        loading.value = true;
        await recipeStore.createRecipe(newData);
        loading.value = false;
        dialog.value = false;
        Notify.create({
          type: "positive",
          message: "Recipe created successfully",
          position: "top"
        });
        clearRecipeData();
        recipeRows.value = await recipeStore.fetchRecipes();
      } catch (error) {
        loading.value = false;
      }
    };
    const clearRecipeData = () => {
      recipe.name = "";
      recipe.target = "";
      recipe.category = "";
      breadGroup.value = null;
      ingredientGroup.value = [];
      selectedIngredients.name = "";
      selectedIngredients.quantity = "";
      dialog.value = false;
    };
    const addIngredients = () => {
      const data = ingredientGroup.value;
      function findObjectById(arr, id) {
        return arr.find((obj) => obj.ingredients_id == id);
      }
      const idToSearch = selectedIngredients.name.value;
      const foundObject = findObjectById(data, idToSearch);
      if (!foundObject) {
        ingredientGroup.value = [
          ...data,
          {
            ingredients_id: selectedIngredients.name.value,
            label: selectedIngredients.name.label,
            quantity: selectedIngredients.quantity,
            unit: selectedIngredients.name.unit
          }
        ];
        clearData();
      } else {
        Notify.create({
          type: "negative",
          icon: "warning",
          message: "Ingredient already exist",
          timeout: 2e3
        });
      }
    };
    const removeIngredient = (index) => {
      ingredientGroup.value.splice(index, 1);
    };
    watch(
      () => selectedIngredients.name,
      (newVal) => {
        if (newVal && newVal.unit) {
          selectedIngredients.unit = newVal.unit;
        } else {
          selectedIngredients.unit = "";
        }
      }
    );
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
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => dialog.value = $event),
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
                    createBaseVNode("div", _hoisted_3$2, [
                      createVNode(QInput, {
                        modelValue: recipe.target,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => recipe.target = $event),
                        suffix: " / 1kg",
                        outlined: "",
                        type: "number",
                        dense: "",
                        label: "Target Piece/s",
                        rules: [
                          (val) => val && val.length > 0 || "Target piece/s is required"
                        ]
                      }, null, 8, ["modelValue", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_4$1, [
                      createVNode(QSelect, {
                        modelValue: recipe.category,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => recipe.category = $event),
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
                    createBaseVNode("div", _hoisted_5$1, [
                      createVNode(QSelect, {
                        modelValue: breadGroup.value,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => breadGroup.value = $event),
                        "use-input": "",
                        "use-chips": "",
                        "chips-color": "primary",
                        multiple: "",
                        "input-debounce": "0",
                        options: filterBreadOptions.value,
                        behavior: "menu",
                        "hide-dropdown-icon": "",
                        outlined: "",
                        dense: "",
                        label: "Bread/s",
                        onNewValue: createValue,
                        onFilter: filterFn,
                        rules: [(val) => val && val.length > 0 || "Bread is required"]
                      }, {
                        "no-option": withCtx(() => [
                          createVNode(QItem, null, {
                            default: withCtx(() => [
                              createVNode(QItemSection, { class: "text-grey" }, {
                                default: withCtx(() => [
                                  createTextVNode(" No results ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "options", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_6$1, [
                      _hoisted_7$1,
                      createBaseVNode("div", null, [
                        createVNode(QList, {
                          dense: "",
                          separator: "",
                          class: "box"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(ingredientGroup.value, (ingredient, index) => {
                              return openBlock(), createBlock(QItem, { key: index }, {
                                default: withCtx(() => [
                                  createVNode(QItemSection, null, {
                                    default: withCtx(() => [
                                      createVNode(QItemLabel, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(ingredient.label), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(QItemSection, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(ingredient.quantity) + " " + toDisplayString(ingredient.unit), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(QItemSection, { side: "" }, {
                                    default: withCtx(() => [
                                      createVNode(QBtn, {
                                        onClick: ($event) => removeIngredient(index),
                                        color: "grey-10",
                                        icon: "backspace",
                                        dense: "",
                                        flat: "",
                                        round: ""
                                      }, null, 8, ["onClick"])
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
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_8$1, [
                      createBaseVNode("div", _hoisted_9, [
                        createBaseVNode("div", null, [
                          createVNode(QSelect, {
                            modelValue: selectedIngredients.name,
                            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => selectedIngredients.name = $event),
                            debounce: "3000",
                            outlined: "",
                            "chips-color": "primary",
                            options: filterIngredientsOptions.value,
                            dense: "",
                            label: "Ingredients",
                            behavior: "menu",
                            "use-input": "",
                            "hide-dropdown-icon": "",
                            onFilter: filterIngredients,
                            style: { "width": "215px", "max-width": "450px", "min-width": "80px" }
                          }, {
                            "no-option": withCtx(() => [
                              createVNode(QItem, null, {
                                default: withCtx(() => [
                                  createVNode(QItemSection, { class: "text-grey" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" No results ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "options"])
                        ]),
                        createBaseVNode("div", null, [
                          createVNode(QInput, {
                            modelValue: selectedIngredients.quantity,
                            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => selectedIngredients.quantity = $event),
                            outlined: "",
                            mask: "#####",
                            dense: "",
                            label: "Quantity",
                            suffix: selectedIngredients.name.unit || "",
                            style: { "width": "115px" }
                          }, null, 8, ["modelValue", "suffix"])
                        ])
                      ]),
                      createBaseVNode("form", {
                        onKeyup: withKeys(withModifiers(addIngredients, ["prevent"]), ["enter"])
                      }, [
                        createBaseVNode("div", _hoisted_11, [
                          createVNode(QBtn, {
                            padding: "xs md",
                            type: "button",
                            size: "sm",
                            outline: "",
                            dense: "",
                            label: "add",
                            icon: "add",
                            color: "purple",
                            onClick: addIngredients
                          })
                        ])
                      ], 40, _hoisted_10)
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
const _withScopeId$1 = (n) => (pushScopeId("data-v-49908f78"), n = n(), popScopeId(), n);
const _hoisted_1$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 q-mb-xs" }, "Confirm Deletion", -1));
const _hoisted_2$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("p", { class: "text-body2 q-mb-none" }, " Are you sure you want to delete this item? This action cannot be undone. ", -1));
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
const _withScopeId = (n) => (pushScopeId("data-v-69eeeb0b"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { align: "right" };
const _hoisted_2$1 = {
  key: 0,
  class: "spinner-wrapper"
};
const _hoisted_3$1 = { key: 1 };
const _hoisted_4 = {
  key: 0,
  class: "data-error"
};
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-ml-sm text-h6" }, "No data available", -1));
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-pb-sm text-center text-h6 text-weight-bold text-subtitle2" }, " Breads List ", -1));
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "q-pb-sm text-center text-h6 text-weight-bold text-subtitle2" }, " Ingredients List ", -1));
const _hoisted_8 = { class: "row justify-center q-gutter-x-md" };
const _sfc_main$1 = {
  __name: "RecipeTable",
  setup(__props) {
    const recipeStore = useRecipeStore();
    const filter = ref("");
    const loading = ref(true);
    const recipes = ref([]);
    const showNoDataMessage = ref(false);
    const pagination = ref({
      rowsPerPage: 0
    });
    const status = ["Inactive", "Active"];
    const recipeRows = computed(() => recipeStore.recipes);
    const filteredRows = computed(() => {
      if (!filter.value) {
        return recipeRows.value;
      }
      return recipeRows.value.filter(
        (row) => row.name.toLowerCase().includes(filter.value.toLowerCase())
      );
    });
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    async function updateRecipe(data, val) {
      try {
        const response = await api.put("/api/update-target/" + data.id, {
          target: parseInt(val)
        });
        console.log("response", response);
        if (response.status == 200) {
          const i = recipes.value.findIndex((item) => item.id == data.id);
          recipes.value[i] = val;
        }
        Notify.create({
          type: "positive",
          message: "Recipe target edited successfully",
          position: "top"
        });
      } catch (error) {
        console.error("Error updating recipe target:", error);
        Notify.create({
          type: "negative",
          message: "Failed to edit recipe target",
          position: "top"
        });
      }
    }
    async function updateRecipeName(data, val) {
      try {
        const response = await api.put("/api/update-name/" + data.id, {
          name: val
        });
        if (response.status == 200) {
          const i = recipes.value.findIndex((item) => item.id == data.id);
          recipes.value[i] = val;
        }
        Notify.create({
          type: "positive",
          message: "Recipe name edited successfully",
          position: "top"
        });
      } catch (error) {
        console.error("Error updating recipe name:", error);
        Notify.create({
          type: "negative",
          message: "Failed to edit recipe name",
          position: "top"
        });
      }
    }
    async function updateRecipeStatus(data, val) {
      try {
        const response = await api.put("/api/update-status/" + data.id, {
          status: val
        });
        if (response.status == 200) {
          const i = recipes.value.findIndex((item) => item.id == data.id);
          recipes.value[i] = val;
        }
        Notify.create({
          type: "positive",
          message: "Recipe status change successfully",
          position: "top"
        });
      } catch (error) {
        console.error("Error updating recipe status:", error);
        Notify.create({
          type: "negative",
          message: "Failed to change recipe status",
          position: "top"
        });
      }
    }
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
        name: "target",
        label: "Target Pcs",
        align: "left",
        field: "target",
        sortable: true
      },
      {
        name: "category",
        label: "Category",
        align: "center",
        field: "category",
        sortable: true
      },
      {
        name: "bread_groups",
        label: "List of Bread",
        align: "center",
        field: "bread_groups",
        sortable: true
      },
      {
        name: "ingredient_groups",
        label: "List of Ingredients",
        align: "center",
        field: "ingredient_groups",
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
    const getBadgeStatusColor = (status2) => {
      switch (status2) {
        case "Inactive":
          return "grey";
        case "Active":
          return "green";
        default:
          return "grey";
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$1, [
          createVNode(QInput, {
            class: "q-pb-lg q-pl-md",
            modelValue: filter.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filter.value = $event),
            outlined: "",
            placeholder: "Search",
            debounce: "1000",
            style: { "width": "500px", "max-width": "1500px", "min-width": "100px" },
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
        ])) : (openBlock(), createElementBlock("div", _hoisted_3$1, [
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
                    createTextVNode(toDisplayString(props.row.name) + " ", 1),
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
                    "onUpdate:modelValue": [(val) => updateRecipeName(props.row, val), ($event) => props.row.name = $event],
                    modelValue: props.row.name,
                    "auto-save": ""
                  }, {
                    default: withCtx((scope) => [
                      createVNode(QInput, {
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
            "body-cell-bread_groups": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createVNode(QTooltip, {
                    offset: [0, 10],
                    delay: 600,
                    class: "bg-info text-dark text-subtitle1"
                  }, {
                    default: withCtx(() => [
                      _hoisted_6,
                      createVNode(QSeparator, {
                        class: "q-mb-md",
                        color: "yellow"
                      }),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(props.row.bread_groups, (bread) => {
                        return openBlock(), createElementBlock("div", { key: bread }, toDisplayString(bread), 1);
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
                      createTextVNode(toDisplayString(props.row.bread_groups.length) + " breads ", 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-ingredient_groups": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createVNode(QTooltip, {
                    delay: 600,
                    class: "bg-info text-dark text-subtitle1",
                    style: { "width": "300px" }
                  }, {
                    default: withCtx(() => [
                      _hoisted_7,
                      createVNode(QSeparator, {
                        class: "q-mb-md",
                        color: "yellow"
                      }),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(props.row.ingredient_groups, (ingredient) => {
                        return openBlock(), createElementBlock("div", {
                          class: "row justify-between",
                          key: ingredient.ingredient_name
                        }, [
                          createBaseVNode("div", null, toDisplayString(ingredient.ingredient_name), 1),
                          createBaseVNode("div", null, toDisplayString(ingredient.quantity) + " " + toDisplayString(ingredient.unit), 1)
                        ]);
                      }), 128))
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(QChip, {
                    square: "",
                    outline: "",
                    color: "purple-6",
                    class: "text-white"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(props.row.ingredient_groups.length) + " ingredients ", 1)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-target": withCtx((props) => [
              createVNode(QTd, {
                "auto-width": "",
                class: "cursor-pointer text-center"
              }, {
                default: withCtx(() => [
                  createBaseVNode("span", null, [
                    createTextVNode(toDisplayString(props.row.target ? props.row.target : "Set Target") + " ", 1),
                    createVNode(QTooltip, {
                      class: "bg-blue-grey-8",
                      offset: [10, 10]
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Edit Target")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(QPopupEdit, {
                    "onUpdate:modelValue": [(val) => updateRecipe(props.row, val), ($event) => props.row.target = $event],
                    modelValue: props.row.target,
                    "auto-save": ""
                  }, {
                    default: withCtx((scope) => [
                      createVNode(QInput, {
                        modelValue: scope.value,
                        "onUpdate:modelValue": ($event) => scope.value = $event,
                        dense: "",
                        autofocus: "",
                        counter: "",
                        mask: "###",
                        onKeyup: withKeys(scope.set, ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"])
                    ]),
                    _: 2
                  }, 1032, ["onUpdate:modelValue", "modelValue"])
                ]),
                _: 2
              }, 1024)
            ]),
            "body-cell-status": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createVNode(QBadge, {
                    outline: "",
                    color: getBadgeStatusColor(props.row.status)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(capitalizeFirstLetter(props.row.status)) + " ", 1),
                      createVNode(QTooltip, {
                        class: "bg-blue-grey-8",
                        offset: [10, 10]
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Change Status")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, 1032, ["color"]),
                  createVNode(QPopupEdit, {
                    "onUpdate:modelValue": [(val) => updateRecipeStatus(props.row, val), ($event) => props.row.status = $event],
                    modelValue: props.row.status,
                    "auto-save": ""
                  }, {
                    default: withCtx((scope) => [
                      createBaseVNode("span", null, toDisplayString(props.row.name), 1),
                      createVNode(QSelect, {
                        modelValue: scope.value,
                        "onUpdate:modelValue": ($event) => scope.value = $event,
                        dense: "",
                        label: "status",
                        autofocus: "",
                        options: status,
                        counter: "",
                        mask: "###",
                        onKeyup: withKeys(scope.set, ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeyup"])
                    ]),
                    _: 2
                  }, 1032, ["onUpdate:modelValue", "modelValue"])
                ]),
                _: 2
              }, 1032, ["props"])
            ]),
            "body-cell-action": withCtx((props) => [
              createVNode(QTd, { props }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_8, [
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
var RecipeTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-69eeeb0b"], ["__file", "RecipeTable.vue"]]);
var RecipePage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = { class: "text-h6" };
const _hoisted_2 = { class: "q-gutter-x-sm" };
const _hoisted_3 = { align: "right" };
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
              createBaseVNode("div", _hoisted_1, [
                createTextVNode(" \u{1F4DC} Recipe "),
                createBaseVNode("div", _hoisted_2, [
                  createVNode(QBadge, {
                    label: "Good",
                    class: "text-white",
                    color: "primary"
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
              createBaseVNode("div", _hoisted_3, [
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
var RecipePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2f25d10a"], ["__file", "RecipePage.vue"]]);
export { RecipePage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjaXBlUGFnZS5iZTEzZjIxOS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL2FkbWluaXN0cmF0b3IvcmVjaXBlL2NvbXBvbmVudHMvUmVjaXBlQ3JlYXRlLnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9hZG1pbmlzdHJhdG9yL3JlY2lwZS9jb21wb25lbnRzL1JlY2lwZURlbGV0ZS52dWUiLCIuLi8uLi8uLi9zcmMvcGFnZXMvYWRtaW5pc3RyYXRvci9yZWNpcGUvY29tcG9uZW50cy9SZWNpcGVUYWJsZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8cS1idG5cbiAgICBjbGFzcz1cInRleHQtZGFyayBxLXBhLXNtXCJcbiAgICBvdXRsaW5lXG4gICAgZGVuc2VcbiAgICBlbGV2YXRlZFxuICAgIGljb249XCJhZGRfY2lyY2xlXCJcbiAgICBsYWJlbD1cIkFkZCBSZWNpcGVcIlxuICAgIEBjbGljaz1cIm9wZW5BZGRSZWNpcGVcIlxuICAgIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogI2VmNDQ0NFwiXG4gIC8+XG4gIDxxLWRpYWxvZ1xuICAgIHYtbW9kZWw9XCJkaWFsb2dcIlxuICAgIHBlcnNpc3RlbnRcbiAgICB0cmFuc2l0aW9uLXNob3c9XCJqdW1wLXVwXCJcbiAgICB0cmFuc2l0aW9uLWhpZGU9XCJqdW1wLWRvd25cIlxuICA+XG4gICAgPHEtY2FyZFxuICAgICAgY2xhc3M9XCJteS1jYXJkIHEtcGEtbm9uZVwiXG4gICAgICBzdHlsZT1cIlxuICAgICAgICB3aWR0aDogNDIwcHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMTJweCAyNHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgICAgIFwiXG4gICAgPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uXG4gICAgICAgIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBxLXB4LW1kIHEtcHktc20gYmctZ3JhZGllbnQgdGV4dC13aGl0ZVwiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg1IHEtbXItbWRcIj7wn5OcIEFkZCBSZWNpcGU8L2Rpdj5cbiAgICAgICAgPHEtc3BhY2UgLz5cbiAgICAgICAgPHEtYnRuIGljb249XCJjbG9zZVwiIGZsYXQgZGVuc2Ugcm91bmQgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtbXgtbWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtbXQtbWQgcS1hbmltYXRlZCBxLWFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJyZWNpcGUubmFtZVwiXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIGxhYmVsPVwiUmVjaXBlIE5hbWVcIlxuICAgICAgICAgICAgOnJ1bGVzPVwiW1xuICAgICAgICAgICAgICAodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnUmVjaXBlIG5hbWUgaXMgcmVxdWlyZWQnLFxuICAgICAgICAgICAgXVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LW1kIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgIDwhLS0gPGRpdj5UYXJnZXQgUGNzPC9kaXY+IC0tPlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICB2LW1vZGVsPVwicmVjaXBlLnRhcmdldFwiXG4gICAgICAgICAgICBzdWZmaXg9XCIgLyAxa2dcIlxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIGxhYmVsPVwiVGFyZ2V0IFBpZWNlL3NcIlxuICAgICAgICAgICAgOnJ1bGVzPVwiW1xuICAgICAgICAgICAgICAodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnVGFyZ2V0IHBpZWNlL3MgaXMgcmVxdWlyZWQnLFxuICAgICAgICAgICAgXVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LW1kIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cInEtbXktc21cIj5DYXRlZ29yeTwvZGl2PiAtLT5cbiAgICAgICAgICA8cS1zZWxlY3RcbiAgICAgICAgICAgIHYtbW9kZWw9XCJyZWNpcGUuY2F0ZWdvcnlcIlxuICAgICAgICAgICAgOm9wdGlvbnM9XCJjYXRlZ29yeVwiXG4gICAgICAgICAgICBoaWRlLWRyb3Bkb3duLWljb25cbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgYmVoYXZpb3I9XCJtZW51XCJcbiAgICAgICAgICAgIGxhYmVsPVwiQ2F0ZWdvcnlcIlxuICAgICAgICAgICAgOnJ1bGVzPVwiW1xuICAgICAgICAgICAgICAodmFsKSA9PiAodmFsICYmIHZhbC5sZW5ndGggPiAwKSB8fCAnQ2F0ZWdvcnkgaXMgcmVxdWlyZWQnLFxuICAgICAgICAgICAgXVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW10LW1kIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgIDwhLS0gPGRpdj5CcmVhZHM8L2Rpdj4gLS0+XG4gICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICB2LW1vZGVsPVwiYnJlYWRHcm91cFwiXG4gICAgICAgICAgICB1c2UtaW5wdXRcbiAgICAgICAgICAgIHVzZS1jaGlwc1xuICAgICAgICAgICAgY2hpcHMtY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIG11bHRpcGxlXG4gICAgICAgICAgICBpbnB1dC1kZWJvdW5jZT1cIjBcIlxuICAgICAgICAgICAgOm9wdGlvbnM9XCJmaWx0ZXJCcmVhZE9wdGlvbnNcIlxuICAgICAgICAgICAgYmVoYXZpb3I9XCJtZW51XCJcbiAgICAgICAgICAgIGhpZGUtZHJvcGRvd24taWNvblxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBsYWJlbD1cIkJyZWFkL3NcIlxuICAgICAgICAgICAgQG5ldy12YWx1ZT1cImNyZWF0ZVZhbHVlXCJcbiAgICAgICAgICAgIEBmaWx0ZXI9XCJmaWx0ZXJGblwiXG4gICAgICAgICAgICA6cnVsZXM9XCJbKHZhbCkgPT4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCkgfHwgJ0JyZWFkIGlzIHJlcXVpcmVkJ11cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDwhLS0gQG5ldy12YWx1ZT1cImNyZWF0ZVZhbHVlXCJcbiAgICAgICAgICAgIEBmaWx0ZXI9XCJmaWx0ZXJCcmVhZFwiXG4gICAgICAgICAgICBAZmlsdGVyLWFib3J0PVwiYWJvcnRGaWx0ZXJGblwiIC0tPlxuICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpuby1vcHRpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIGNsYXNzPVwidGV4dC1ncmV5XCI+IE5vIHJlc3VsdHMgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDwvcS1zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC1tZCBxLWd1dHRlci15LXNtIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXdlaWdodC10aGluXCI+SW5ncmVkaWVudHMgTGlzdDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cS1saXN0IGRlbnNlIHNlcGFyYXRvciBjbGFzcz1cImJveFwiPlxuICAgICAgICAgICAgICA8cS1pdGVtXG4gICAgICAgICAgICAgICAgdi1mb3I9XCIoaW5ncmVkaWVudCwgaW5kZXgpIGluIGluZ3JlZGllbnRHcm91cFwiXG4gICAgICAgICAgICAgICAgOmtleT1cImluZGV4XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+e3sgaW5ncmVkaWVudC5sYWJlbCB9fTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uXG4gICAgICAgICAgICAgICAgICA+e3sgaW5ncmVkaWVudC5xdWFudGl0eSB9fVxuICAgICAgICAgICAgICAgICAge3sgaW5ncmVkaWVudC51bml0IH19PC9xLWl0ZW0tc2VjdGlvblxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gc2lkZT5cbiAgICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJyZW1vdmVJbmdyZWRpZW50KGluZGV4KVwiXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPVwiZ3JleS0xMFwiXG4gICAgICAgICAgICAgICAgICAgIGljb249XCJiYWNrc3BhY2VcIlxuICAgICAgICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICAgICAgICBmbGF0XG4gICAgICAgICAgICAgICAgICAgIHJvdW5kXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgPC9xLWxpc3Q+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1tdC14bCBxLWd1dHRlci15LXNtIHEtYW5pbWF0ZWQgcS1hbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8IS0tIDxkaXYgYWxpZ249XCJjZW50ZXJcIj5JbmdyZWRpZW50czwvZGl2PiAtLT5cbiAgICAgICAgICAgICAgPHEtc2VsZWN0XG4gICAgICAgICAgICAgICAgdi1tb2RlbD1cInNlbGVjdGVkSW5ncmVkaWVudHMubmFtZVwiXG4gICAgICAgICAgICAgICAgZGVib3VuY2U9XCIzMDAwXCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIGNoaXBzLWNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgOm9wdGlvbnM9XCJmaWx0ZXJJbmdyZWRpZW50c09wdGlvbnNcIlxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJJbmdyZWRpZW50c1wiXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I9XCJtZW51XCJcbiAgICAgICAgICAgICAgICB1c2UtaW5wdXRcbiAgICAgICAgICAgICAgICBoaWRlLWRyb3Bkb3duLWljb25cbiAgICAgICAgICAgICAgICBAZmlsdGVyPVwiZmlsdGVySW5ncmVkaWVudHNcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDIxNXB4OyBtYXgtd2lkdGg6IDQ1MHB4OyBtaW4td2lkdGg6IDgwcHhcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDpuby1vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8cS1pdGVtPlxuICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gY2xhc3M9XCJ0ZXh0LWdyZXlcIj5cbiAgICAgICAgICAgICAgICAgICAgICBObyByZXN1bHRzXG4gICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgICA8L3Etc2VsZWN0PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDwhLS0gPGRpdiBhbGlnbj1cImNlbnRlclwiPlF1YW50aXR5PC9kaXY+IC0tPlxuICAgICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJzZWxlY3RlZEluZ3JlZGllbnRzLnF1YW50aXR5XCJcbiAgICAgICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgICAgIG1hc2s9XCIjIyMjI1wiXG4gICAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgICBsYWJlbD1cIlF1YW50aXR5XCJcbiAgICAgICAgICAgICAgICA6c3VmZml4PVwic2VsZWN0ZWRJbmdyZWRpZW50cy5uYW1lLnVuaXQgfHwgJydcIlxuICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDExNXB4XCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxmb3JtIEBrZXl1cC5lbnRlci5wcmV2ZW50PVwiYWRkSW5ncmVkaWVudHNcIj5cbiAgICAgICAgICAgIDxkaXYgYWxpZ249XCJyaWdodFwiPlxuICAgICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgICBwYWRkaW5nPVwieHMgbWRcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgICAgICAgb3V0bGluZVxuICAgICAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJhZGRcIlxuICAgICAgICAgICAgICAgIGljb249XCJhZGRcIlxuICAgICAgICAgICAgICAgIGNvbG9yPVwicHVycGxlXCJcbiAgICAgICAgICAgICAgICBAY2xpY2s9XCJhZGRJbmdyZWRpZW50c1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8IS0tIDxxLXNlcGFyYXRvciBjbGFzcz1cInEtbXktbGdcIj48L3Etc2VwYXJhdG9yPiAtLT5cbiAgICAgICAgPHEtY2FyZC1hY3Rpb25zXG4gICAgICAgICAgY2xhc3M9XCJyb3cgcS1tdC1tZCBxLXB4LWxnIHEtcHktc20gcS1wdC1ub25lXCJcbiAgICAgICAgICBhbGlnbj1cInJpZ2h0XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxxLWJ0biBjbGFzcz1cImdsb3NzeVwiIGNvbG9yPVwiZ3JleS05XCIgbGFiZWw9XCJEaXNtaXNzXCIgdi1jbG9zZS1wb3B1cCAvPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgY2xhc3M9XCJnbG9zc3lcIlxuICAgICAgICAgICAgY29sb3I9XCJ0ZWFsXCJcbiAgICAgICAgICAgIGxhYmVsPVwiQ3JlYXRlXCJcbiAgICAgICAgICAgIEBjbGljaz1cInNhdmVSZWNpcGVcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gICAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtZGlhbG9nPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZVByb2R1Y3RzU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9wcm9kdWN0XCI7XG5pbXBvcnQgeyByZWYsIHJlYWN0aXZlLCB3YXRjaCwgY29tcHV0ZWQgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyB1c2VSYXdNYXRlcmlhbHNTdG9yZSB9IGZyb20gXCJzcmMvc3RvcmVzL3Jhdy1tYXRlcmlhbFwiO1xuaW1wb3J0IHsgdXNlUmVjaXBlU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9yZWNpcGVcIjtcbmltcG9ydCB7IE5vdGlmeSB9IGZyb20gXCJxdWFzYXJcIjtcbmNvbnN0IHJlY2lwZVJvd3MgPSBjb21wdXRlZCgoKSA9PiByZWNpcGVTdG9yZS5yZWNpcGVzKTtcblxuY29uc3QgYnJlYWRQcm9kdWN0U3RvcmUgPSB1c2VQcm9kdWN0c1N0b3JlKCk7XG5jb25zdCBpbmdyZWRpZW50c1N0b3JlID0gdXNlUmF3TWF0ZXJpYWxzU3RvcmUoKTtcbmNvbnN0IHJlY2lwZVN0b3JlID0gdXNlUmVjaXBlU3RvcmUoKTtcbmNvbnN0IGRpYWxvZyA9IHJlZihmYWxzZSk7XG5jb25zdCBvcGVuQWRkUmVjaXBlID0gKCkgPT4ge1xuICBkaWFsb2cudmFsdWUgPSB0cnVlO1xufTtcbmNvbnN0IGNhdGVnb3J5ID0gW1wiRG91Z2hcIiwgXCJGaWxsaW5nXCJdO1xuY29uc3QgcmVjaXBlID0gcmVhY3RpdmUoe1xuICBuYW1lOiBcIlwiLFxuICB0YXJnZXQ6IFwiXCIsXG4gIGNhdGVnb3J5OiBcIlwiLFxufSk7XG5cbmNvbnN0IGJyZWFkR3JvdXAgPSByZWYobnVsbCk7XG5jb25zdCBicmVhZE9wdGlvbnMgPSByZWYoW10pO1xuY29uc3QgZmlsdGVyQnJlYWRPcHRpb25zID0gcmVmKGJyZWFkT3B0aW9ucy52YWx1ZSk7XG5jb25zdCBpbmdyZWRpZW50R3JvdXAgPSByZWYoW10pO1xuY29uc3QgaW5ncmVkaWVudE9wdGlvbnMgPSByZWYoW10pO1xuY29uc3Qgc2VsZWN0ZWRJbmdyZWRpZW50cyA9IHJlYWN0aXZlKHtcbiAgbmFtZTogXCJcIixcbiAgcXVhbnRpdHk6IFwiXCIsXG59KTtcbmNvbnN0IGZpbHRlckluZ3JlZGllbnRzT3B0aW9ucyA9IHJlZihpbmdyZWRpZW50T3B0aW9ucy52YWx1ZSk7XG5cbmNvbnN0IGxvYWRpbmcgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBmZXRjaEJyZWFkc0RhdGEgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGJyZWFkcyA9IGF3YWl0IGJyZWFkUHJvZHVjdFN0b3JlLmZldGNoUHJvZHVjdHNCeUNhdGVnb3J5KFwiQnJlYWRcIik7XG5cbiAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICBicmVhZE9wdGlvbnMudmFsdWUgPSBicmVhZFByb2R1Y3RTdG9yZS5icmVhZHMubWFwKCh2YWwpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbGFiZWw6IHZhbC5uYW1lLFxuICAgICAgdmFsdWU6IHZhbC5pZCxcbiAgICB9O1xuICB9KTtcbn07XG5mZXRjaEJyZWFkc0RhdGEoKTtcblxuY29uc3QgZmV0Y2hJbmdyZWRpZW50c0RhdGEgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGluZ3JlZGllbnQgPSBhd2FpdCBpbmdyZWRpZW50c1N0b3JlLmZldGNoSW5ncmVkaWVudHMoXCJJbmdyZWRpZW50c1wiKTtcbiAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICBpbmdyZWRpZW50T3B0aW9ucy52YWx1ZSA9IGluZ3JlZGllbnRzU3RvcmUuaW5ncmVkaWVudHMubWFwKCh2YWwpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbGFiZWw6IHZhbC5uYW1lLFxuICAgICAgdmFsdWU6IHZhbC5pZCxcbiAgICAgIHVuaXQ6IHZhbC51bml0LFxuICAgIH07XG4gIH0pO1xufTtcbmZldGNoSW5ncmVkaWVudHNEYXRhKCk7XG5cbmNvbnN0IGNsZWFyRGF0YSA9ICgpID0+IHtcbiAgKHNlbGVjdGVkSW5ncmVkaWVudHMubmFtZSA9IFwiXCIpLCAoc2VsZWN0ZWRJbmdyZWRpZW50cy5xdWFudGl0eSA9IFwiXCIpO1xufTtcblxuY29uc3QgY3JlYXRlVmFsdWUgPSAodmFsLCBkb25lKSA9PiB7XG4gIGlmICh2YWwubGVuZ3RoID4gMikge1xuICAgIGlmICghYnJlYWRPcHRpb25zLnZhbHVlLmluY2x1ZGVzKHZhbCkpIHtcbiAgICAgIGRvbmUodmFsLCBcImFkZC11bmlxdWVcIik7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBmaWx0ZXJGbiA9ICh2YWwsIHVwZGF0ZSkgPT4ge1xuICB1cGRhdGUoKCkgPT4ge1xuICAgIGlmICh2YWwgPT09IFwiXCIpIHtcbiAgICAgIGZpbHRlckJyZWFkT3B0aW9ucy52YWx1ZSA9IGJyZWFkT3B0aW9ucy52YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmVlZGxlID0gdmFsLnRvTG93ZXJDYXNlKCk7XG4gICAgICBmaWx0ZXJCcmVhZE9wdGlvbnMudmFsdWUgPSBicmVhZE9wdGlvbnMudmFsdWUuZmlsdGVyKFxuICAgICAgICAodikgPT4gdi5sYWJlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2YobmVlZGxlKSA+IC0xXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCBjcmVhdGVWYWx1ZUluZ3JlZGllbnQgPSAodmFsLCBkb25lKSA9PiB7XG4gIGlmICh2YWwubGVuZ3RoID4gMikge1xuICAgIGlmICghaW5ncmVkaWVudE9wdGlvbnMudmFsdWUuaW5jbHVkZXModmFsKSkge1xuICAgICAgZG9uZSh2YWwsIFwiYWRkLXVuaXF1ZVwiKTtcbiAgICB9XG4gIH1cbn07XG5jb25zdCBmaWx0ZXJJbmdyZWRpZW50cyA9ICh2YWwsIHVwZGF0ZSkgPT4ge1xuICB1cGRhdGUoKCkgPT4ge1xuICAgIGlmICh2YWwgPT09IFwiXCIpIHtcbiAgICAgIGZpbHRlckluZ3JlZGllbnRzT3B0aW9ucy52YWx1ZSA9IGluZ3JlZGllbnRPcHRpb25zLnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZWVkbGUgPSB2YWwudG9Mb3dlckNhc2UoKTtcbiAgICAgIGZpbHRlckluZ3JlZGllbnRzT3B0aW9ucy52YWx1ZSA9IGluZ3JlZGllbnRPcHRpb25zLnZhbHVlLmZpbHRlcihcbiAgICAgICAgKHYpID0+IHYubGFiZWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKG5lZWRsZSkgPiAtMVxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3Qgc2F2ZVJlY2lwZSA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgbmV3RGF0YSA9IHtcbiAgICBuYW1lOiByZWNpcGUubmFtZSxcbiAgICB0YXJnZXQ6IHJlY2lwZS50YXJnZXQsXG4gICAgY2F0ZWdvcnk6IHJlY2lwZS5jYXRlZ29yeSxcbiAgICBzdGF0dXM6IFwiQWN0aXZlXCIsXG4gICAgYnJlYWRzOiBicmVhZEdyb3VwLnZhbHVlLm1hcCgoYnJlYWQpID0+ICh7XG4gICAgICBicmVhZF9pZDogYnJlYWQudmFsdWUsXG4gICAgfSkpLFxuICAgIGluZ3JlZGllbnRzOiBpbmdyZWRpZW50R3JvdXAudmFsdWUubWFwKChpbmdyZWRpZW50KSA9PiAoe1xuICAgICAgaW5ncmVkaWVudF9pZDogaW5ncmVkaWVudC5pbmdyZWRpZW50c19pZCxcbiAgICAgIHF1YW50aXR5OiBpbmdyZWRpZW50LnF1YW50aXR5LFxuICAgIH0pKSxcbiAgfTtcbiAgY29uc29sZS5sb2coXCJSZWNpcGVcIiwgbmV3RGF0YSk7XG4gIHRyeSB7XG4gICAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gICAgYXdhaXQgcmVjaXBlU3RvcmUuY3JlYXRlUmVjaXBlKG5ld0RhdGEpO1xuICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgICBkaWFsb2cudmFsdWUgPSBmYWxzZTtcbiAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcbiAgICAgIG1lc3NhZ2U6IFwiUmVjaXBlIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gICAgICBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICB9KTtcbiAgICBjbGVhclJlY2lwZURhdGEoKTtcbiAgICAvLyBhd2FpdCByZWxvYWRUYWJsZURhdGEoKTtcbiAgICByZWNpcGVSb3dzLnZhbHVlID0gYXdhaXQgcmVjaXBlU3RvcmUuZmV0Y2hSZWNpcGVzKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICAgIC8vIE5vdGlmeS5jcmVhdGUoe1xuICAgIC8vICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgIC8vICAgbWVzc2FnZTogXCJFcnJvciBjcmVhdGluZyByZWNpcGVcIixcbiAgICAvLyB9KTtcbiAgfVxufTtcblxuY29uc3QgY2xlYXJSZWNpcGVEYXRhID0gKCkgPT4ge1xuICByZWNpcGUubmFtZSA9IFwiXCI7XG4gIHJlY2lwZS50YXJnZXQgPSBcIlwiO1xuICByZWNpcGUuY2F0ZWdvcnkgPSBcIlwiO1xuICBicmVhZEdyb3VwLnZhbHVlID0gbnVsbDtcbiAgaW5ncmVkaWVudEdyb3VwLnZhbHVlID0gW107XG4gIHNlbGVjdGVkSW5ncmVkaWVudHMubmFtZSA9IFwiXCI7XG4gIHNlbGVjdGVkSW5ncmVkaWVudHMucXVhbnRpdHkgPSBcIlwiO1xuXG4gIGRpYWxvZy52YWx1ZSA9IGZhbHNlO1xufTtcblxuY29uc3QgYWRkSW5ncmVkaWVudHMgPSAoKSA9PiB7XG4gIGNvbnN0IGRhdGEgPSBpbmdyZWRpZW50R3JvdXAudmFsdWU7XG5cbiAgZnVuY3Rpb24gZmluZE9iamVjdEJ5SWQoYXJyLCBpZCkge1xuICAgIHJldHVybiBhcnIuZmluZCgob2JqKSA9PiBvYmouaW5ncmVkaWVudHNfaWQgPT0gaWQpO1xuICB9XG4gIGNvbnN0IGlkVG9TZWFyY2ggPSBzZWxlY3RlZEluZ3JlZGllbnRzLm5hbWUudmFsdWU7XG5cbiAgY29uc3QgZm91bmRPYmplY3QgPSBmaW5kT2JqZWN0QnlJZChkYXRhLCBpZFRvU2VhcmNoKTtcbiAgaWYgKCFmb3VuZE9iamVjdCkge1xuICAgIGluZ3JlZGllbnRHcm91cC52YWx1ZSA9IFtcbiAgICAgIC4uLmRhdGEsXG4gICAgICB7XG4gICAgICAgIGluZ3JlZGllbnRzX2lkOiBzZWxlY3RlZEluZ3JlZGllbnRzLm5hbWUudmFsdWUsXG4gICAgICAgIGxhYmVsOiBzZWxlY3RlZEluZ3JlZGllbnRzLm5hbWUubGFiZWwsXG4gICAgICAgIHF1YW50aXR5OiBzZWxlY3RlZEluZ3JlZGllbnRzLnF1YW50aXR5LFxuICAgICAgICB1bml0OiBzZWxlY3RlZEluZ3JlZGllbnRzLm5hbWUudW5pdCxcbiAgICAgIH0sXG4gICAgXTtcbiAgICBjbGVhckRhdGEoKTtcbiAgfSBlbHNlIHtcbiAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgIHR5cGU6IFwibmVnYXRpdmVcIixcbiAgICAgIGljb246IFwid2FybmluZ1wiLFxuICAgICAgbWVzc2FnZTogXCJJbmdyZWRpZW50IGFscmVhZHkgZXhpc3RcIixcbiAgICAgIHRpbWVvdXQ6IDIwMDAsXG4gICAgfSk7XG4gICAgLy8gYWxlcnQoXCJpbmdyZWRpZW50IGFscmVhZHkgZXhpc3QhXCIpO1xuICB9XG59O1xuXG5jb25zdCByZW1vdmVJbmdyZWRpZW50ID0gKGluZGV4KSA9PiB7XG4gIGluZ3JlZGllbnRHcm91cC52YWx1ZS5zcGxpY2UoaW5kZXgsIDEpO1xufTtcblxud2F0Y2goXG4gICgpID0+IHNlbGVjdGVkSW5ncmVkaWVudHMubmFtZSxcbiAgKG5ld1ZhbCkgPT4ge1xuICAgIGlmIChuZXdWYWwgJiYgbmV3VmFsLnVuaXQpIHtcbiAgICAgIHNlbGVjdGVkSW5ncmVkaWVudHMudW5pdCA9IG5ld1ZhbC51bml0O1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWxlY3RlZEluZ3JlZGllbnRzLnVuaXQgPSBcIlwiO1xuICAgIH1cbiAgfVxuKTtcbjwvc2NyaXB0PlxuPHN0eWxlPlxuLnEtY2hpcCB7XG4gIGNvbG9yOiAjMDAwMDAwO1xufVxuLmJveCB7XG4gIGJvcmRlcjogMXB4IGRhc2hlZCBncmV5O1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xufVxuLm15LWNhcmQge1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBhbmltYXRpb246IGZhZGVJbiAwLjNzIGVhc2U7XG59XG5cbi5idG4tYWRkIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjMDAwMDAwLCAjMDAwMDAwKTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uYmctZ3JhZGllbnQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMDBiZmE1LCAjMDA3OTZiKTtcbn1cblxuLnNlcGFyYXRvci1ncmFkaWVudCB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzAwYmZhNSwgIzAwNzk2Yik7XG59XG5cbi5xLWJ0biB7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJveC1zaGFkb3cgMC4zcyBlYXNlO1xufVxuXG4ucS1idG46aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcbn1cblxuLmJ0bi1jYW5jZWwge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNlZjUzNTAsICNlNTM5MzUpO1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5idG4tY3JlYXRlIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCAjNjZiYjZhLCAjNDNhMDQ3KTtcbiAgY29sb3I6ICNmZmY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4ucS1hbmltYXRlLWJvdW5jZSB7XG4gIGFuaW1hdGlvbjogYm91bmNlSW4gMC42cyBlYXNlO1xufVxuXG5Aa2V5ZnJhbWVzIGZhZGVJbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwcHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIGJvdW5jZUluIHtcbiAgZnJvbSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjBweCk7XG4gIH1cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICB9XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1idG5cbiAgICBAY2xpY2s9XCJkZWxldGVEaWFsb2dcIlxuICAgIGNvbG9yPVwibmVnYXRpdmVcIlxuICAgIGljb249XCJkZWxldGVcIlxuICAgIHNpemU9XCJzbVwiXG4gICAgZmxhdFxuICAgIHJvdW5kXG4gICAgZGVuc2VcbiAgICBhcmlhLWxhYmVsPVwiRGVsZXRlXCJcbiAgPlxuICAgIDxxLXRvb2x0aXAgY2xhc3M9XCJiZy1uZWdhdGl2ZVwiIDpkZWxheT1cIjIwMFwiPkRlbGV0ZTwvcS10b29sdGlwPlxuICA8L3EtYnRuPlxuICA8cS1kaWFsb2cgdi1tb2RlbD1cImRpYWxvZ1Zpc2libGVcIiBwZXJzaXN0ZW50PlxuICAgIDxxLWNhcmQgY2xhc3M9XCJxLXBhLW1kIHEtcm91bmRlZCBxLWVsZXZhdGUtMiBiZy13aGl0ZSB0ZXh0LWdyZXktOVwiPlxuICAgICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1wdC1ub25lIHEtcGItc21cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDUgcS1tYi14c1wiPkNvbmZpcm0gRGVsZXRpb248L2Rpdj5cbiAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LWJvZHkyIHEtbWItbm9uZVwiPlxuICAgICAgICAgIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBpdGVtPyBUaGlzIGFjdGlvbiBjYW5ub3QgYmVcbiAgICAgICAgICB1bmRvbmUuXG4gICAgICAgIDwvcD5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgICA8cS1zZXBhcmF0b3IgY2xhc3M9XCJxLW1iLW1kXCIgLz5cbiAgICAgIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgICAgPHEtY2FyZC1hY3Rpb25zIGFsaWduPVwicmlnaHRcIiBjbGFzcz1cInEtcHQtbm9uZVwiPlxuICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgZmxhdFxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIGxhYmVsPVwiQ2FuY2VsXCJcbiAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgICB2LWNsb3NlLXBvcHVwXG4gICAgICAgICAgICBjbGFzcz1cInEtbXItc21cIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgbGFiZWw9XCJEZWxldGVcIlxuICAgICAgICAgICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgICAgICAgICBAY2xpY2s9XCJvbkRlbGV0ZVwiXG4gICAgICAgICAgICBjbGFzcz1cInEtYnRuLXJvdW5kZWQgcS1weC1sZ1wiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgICAgIDwvcS1jYXJkLXNlY3Rpb24+XG4gICAgPC9xLWNhcmQ+XG4gIDwvcS1kaWFsb2c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgdXNlUmVjaXBlU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9yZWNpcGVcIjtcbmltcG9ydCB7IE5vdGlmeSB9IGZyb20gXCJxdWFzYXJcIjtcblxuY29uc3QgcmVjaXBlU3RvcmUgPSB1c2VSZWNpcGVTdG9yZSgpO1xuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wcyhbXCJkZWxldGVcIl0pO1xuY29uc3QgZGlhbG9nVmlzaWJsZSA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IGRlbGV0ZURpYWxvZyA9ICgpID0+IHtcbiAgZGlhbG9nVmlzaWJsZS52YWx1ZSA9IHRydWU7XG59O1xuXG5jb25zdCBvbkRlbGV0ZSA9IGFzeW5jICgpID0+IHtcbiAgYXdhaXQgcmVjaXBlU3RvcmUuZGVsZXRlUmVjaXBlKHByb3BzLmRlbGV0ZS5yb3cuaWQpO1xuXG4gIGRpYWxvZ1Zpc2libGUudmFsdWUgPSBmYWxzZTtcbn07XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbi5xLWNhcmQge1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBib3gtc2hhZG93OiAwIDhweCAyNHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuLnEtY2FyZC1zZWN0aW9uIHtcbiAgcGFkZGluZzogMjRweCAzMnB4O1xufVxuXG4ucS1idG4ge1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycyBlYXNlLCBib3gtc2hhZG93IDAuMnMgZWFzZTtcbn1cblxuLnEtYnRuLXJvdW5kZWQge1xuICBib3JkZXItcmFkaXVzOiA1MHB4O1xufVxuXG4ucS1idG46aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcbn1cblxuLnEtYnRuOmFjdGl2ZSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgYm94LXNoYWRvdzogbm9uZTtcbn1cblxuLnRleHQtaDUge1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4udGV4dC1ib2R5MiB7XG4gIGNvbG9yOiAjNjY2O1xufVxuXG4ucS1lbGV2YXRlLTIge1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4uYmctd2hpdGUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xufVxuXG4udGV4dC1ncmV5LTkge1xuICBjb2xvcjogIzMzMztcbn1cblxuLnEtc2VwYXJhdG9yIHtcbiAgYm9yZGVyLWNvbG9yOiAjZWVlO1xufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBhbGlnbj1cInJpZ2h0XCI+XG4gICAgPHEtaW5wdXRcbiAgICAgIGNsYXNzPVwicS1wYi1sZyBxLXBsLW1kXCJcbiAgICAgIHYtbW9kZWw9XCJmaWx0ZXJcIlxuICAgICAgb3V0bGluZWRcbiAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgIGRlYm91bmNlPVwiMTAwMFwiXG4gICAgICBzdHlsZT1cIndpZHRoOiA1MDBweDsgbWF4LXdpZHRoOiAxNTAwcHg7IG1pbi13aWR0aDogMTAwcHhcIlxuICAgICAgZmxhdFxuICAgICAgZGVuc2VcbiAgICAgIHJvdW5kZWRcbiAgICA+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgPHEtaWNvbiBuYW1lPVwic2VhcmNoXCIgLz5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9xLWlucHV0PlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwic3Bpbm5lci13cmFwcGVyXCIgdi1pZj1cImxvYWRpbmdcIj5cbiAgICA8cS1zcGlubmVyLWRvdHMgc2l6ZT1cIjUwcHhcIiBjb2xvcj1cInByaW1hcnlcIiAvPlxuICA8L2Rpdj5cblxuICA8ZGl2IHYtZWxzZT5cbiAgICA8ZGl2IHYtaWY9XCJmaWx0ZXJlZFJvd3MubGVuZ3RoID09PSAwXCIgY2xhc3M9XCJkYXRhLWVycm9yXCI+XG4gICAgICA8cS1pY29uIG5hbWU9XCJ3YXJuaW5nXCIgY29sb3I9XCJ3YXJuaW5nXCIgc2l6ZT1cIjRlbVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwicS1tbC1zbSB0ZXh0LWg2XCI+Tm8gZGF0YSBhdmFpbGFibGU8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8cS10YWJsZVxuICAgICAgdi1lbHNlXG4gICAgICBjbGFzcz1cInRhYmxlLWNvbnRhaW5lciBlbGVnYW50LWNvbnRhaW5lciBzdGlja3ktaGVhZGVyXCJcbiAgICAgIDpmaWx0ZXI9XCJmaWx0ZXJcIlxuICAgICAgOnZpcnR1YWwtc2Nyb2xsLXN0aWNreS1zaXplLXN0YXJ0PVwiNDhcIlxuICAgICAgZmxhdFxuICAgICAgOmNvbHVtbnM9XCJyZWNpcGVDb2x1bW5zXCJcbiAgICAgIDpyb3dzPVwiZmlsdGVyZWRSb3dzXCJcbiAgICAgIHJvdy1rZXk9XCJuYW1lXCJcbiAgICAgIHZpcnR1YWwtc2Nyb2xsXG4gICAgICB2LW1vZGVsOnBhZ2luYXRpb249XCJwYWdpbmF0aW9uXCJcbiAgICAgIDpyb3dzLXBlci1wYWdlLW9wdGlvbnM9XCJbMF1cIlxuICAgICAgaGlkZS1ib3R0b21cbiAgICAgIHN0eWxlPVwiaGVpZ2h0OiA0MDBweFwiXG4gICAgPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtbmFtZT1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCIgY2xhc3M9XCJjdXJzb3ItcG9pbnRlclwiPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICA+e3sgcHJvcHMucm93Lm5hbWUgfX1cbiAgICAgICAgICAgIDxxLXRvb2x0aXAgY2xhc3M9XCJiZy1ibHVlLWdyZXktOFwiIDpvZmZzZXQ9XCJbMTAsIDEwXVwiXG4gICAgICAgICAgICAgID5FZGl0IFJlY2lwZSBOYW1lPC9xLXRvb2x0aXBcbiAgICAgICAgICAgID5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHEtcG9wdXAtZWRpdFxuICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIih2YWwpID0+IHVwZGF0ZVJlY2lwZU5hbWUocHJvcHMucm93LCB2YWwpXCJcbiAgICAgICAgICAgIHYtbW9kZWw9XCJwcm9wcy5yb3cubmFtZVwiXG4gICAgICAgICAgICBhdXRvLXNhdmVcbiAgICAgICAgICAgIHYtc2xvdD1cInNjb3BlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgICB2LW1vZGVsPVwic2NvcGUudmFsdWVcIlxuICAgICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgICBhdXRvZm9jdXNcbiAgICAgICAgICAgICAgY291bnRlclxuICAgICAgICAgICAgICBAa2V5dXAuZW50ZXI9XCJzY29wZS5zZXRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L3EtcG9wdXAtZWRpdD5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLWNhdGVnb3J5PVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQga2V5PVwibmFtZVwiIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPHEtYmFkZ2UgOmNvbG9yPVwiZ2V0QmFkZ2VDYXRlZ29yeUNvbG9yKHByb3BzLnJvdy5jYXRlZ29yeSlcIj5cbiAgICAgICAgICAgIHt7IHByb3BzLnJvdy5jYXRlZ29yeSB9fVxuICAgICAgICAgIDwvcS1iYWRnZT5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLWJyZWFkX2dyb3Vwcz1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPHEtdG9vbHRpcFxuICAgICAgICAgICAgOm9mZnNldD1cIlswLCAxMF1cIlxuICAgICAgICAgICAgOmRlbGF5PVwiNjAwXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYmctaW5mbyB0ZXh0LWRhcmsgdGV4dC1zdWJ0aXRsZTFcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3M9XCJxLXBiLXNtIHRleHQtY2VudGVyIHRleHQtaDYgdGV4dC13ZWlnaHQtYm9sZCB0ZXh0LXN1YnRpdGxlMlwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIEJyZWFkcyBMaXN0XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxxLXNlcGFyYXRvciBjbGFzcz1cInEtbWItbWRcIiBjb2xvcj1cInllbGxvd1wiIC8+XG4gICAgICAgICAgICA8ZGl2IHYtZm9yPVwiYnJlYWQgaW4gcHJvcHMucm93LmJyZWFkX2dyb3Vwc1wiIDprZXk9XCJicmVhZFwiPlxuICAgICAgICAgICAgICB7eyBicmVhZCB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9xLXRvb2x0aXA+XG4gICAgICAgICAgPHEtY2hpcCBzcXVhcmUgb3V0bGluZSBjb2xvcj1cInJlZC02XCIgY2xhc3M9XCJ0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICB7eyBwcm9wcy5yb3cuYnJlYWRfZ3JvdXBzLmxlbmd0aCB9fSBicmVhZHNcbiAgICAgICAgICA8L3EtY2hpcD5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLWluZ3JlZGllbnRfZ3JvdXBzPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8cS10b29sdGlwXG4gICAgICAgICAgICA6ZGVsYXk9XCI2MDBcIlxuICAgICAgICAgICAgY2xhc3M9XCJiZy1pbmZvIHRleHQtZGFyayB0ZXh0LXN1YnRpdGxlMVwiXG4gICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAzMDBweFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzcz1cInEtcGItc20gdGV4dC1jZW50ZXIgdGV4dC1oNiB0ZXh0LXdlaWdodC1ib2xkIHRleHQtc3VidGl0bGUyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgSW5ncmVkaWVudHMgTGlzdFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cS1zZXBhcmF0b3IgY2xhc3M9XCJxLW1iLW1kXCIgY29sb3I9XCJ5ZWxsb3dcIiAvPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW5cIlxuICAgICAgICAgICAgICB2LWZvcj1cImluZ3JlZGllbnQgaW4gcHJvcHMucm93LmluZ3JlZGllbnRfZ3JvdXBzXCJcbiAgICAgICAgICAgICAgOmtleT1cImluZ3JlZGllbnQuaW5ncmVkaWVudF9uYW1lXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7eyBpbmdyZWRpZW50LmluZ3JlZGllbnRfbmFtZSB9fVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj57eyBpbmdyZWRpZW50LnF1YW50aXR5IH19IHt7IGluZ3JlZGllbnQudW5pdCB9fTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9xLXRvb2x0aXA+XG4gICAgICAgICAgPHEtY2hpcCBzcXVhcmUgb3V0bGluZSBjb2xvcj1cInB1cnBsZS02XCIgY2xhc3M9XCJ0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICB7eyBwcm9wcy5yb3cuaW5ncmVkaWVudF9ncm91cHMubGVuZ3RoIH19IGluZ3JlZGllbnRzXG4gICAgICAgICAgPC9xLWNoaXA+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90OmJvZHktY2VsbC10YXJnZXQ9XCJwcm9wc1wiPlxuICAgICAgICA8cS10ZCBhdXRvLXdpZHRoIGNsYXNzPVwiY3Vyc29yLXBvaW50ZXIgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgPnt7IHByb3BzLnJvdy50YXJnZXQgPyBwcm9wcy5yb3cudGFyZ2V0IDogXCJTZXQgVGFyZ2V0XCIgfX1cblxuICAgICAgICAgICAgPHEtdG9vbHRpcCBjbGFzcz1cImJnLWJsdWUtZ3JleS04XCIgOm9mZnNldD1cIlsxMCwgMTBdXCJcbiAgICAgICAgICAgICAgPkVkaXQgVGFyZ2V0PC9xLXRvb2x0aXBcbiAgICAgICAgICAgID5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHEtcG9wdXAtZWRpdFxuICAgICAgICAgICAgQHVwZGF0ZTptb2RlbC12YWx1ZT1cIih2YWwpID0+IHVwZGF0ZVJlY2lwZShwcm9wcy5yb3csIHZhbClcIlxuICAgICAgICAgICAgdi1tb2RlbD1cInByb3BzLnJvdy50YXJnZXRcIlxuICAgICAgICAgICAgYXV0by1zYXZlXG4gICAgICAgICAgICB2LXNsb3Q9XCJzY29wZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInNjb3BlLnZhbHVlXCJcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgYXV0b2ZvY3VzXG4gICAgICAgICAgICAgIGNvdW50ZXJcbiAgICAgICAgICAgICAgbWFzaz1cIiMjI1wiXG4gICAgICAgICAgICAgIEBrZXl1cC5lbnRlcj1cInNjb3BlLnNldFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvcS1wb3B1cC1lZGl0PlxuICAgICAgICA8L3EtdGQ+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpib2R5LWNlbGwtc3RhdHVzPVwicHJvcHNcIj5cbiAgICAgICAgPHEtdGQgOnByb3BzPVwicHJvcHNcIj5cbiAgICAgICAgICA8cS1iYWRnZSBvdXRsaW5lIDpjb2xvcj1cImdldEJhZGdlU3RhdHVzQ29sb3IocHJvcHMucm93LnN0YXR1cylcIj5cbiAgICAgICAgICAgIHt7IGNhcGl0YWxpemVGaXJzdExldHRlcihwcm9wcy5yb3cuc3RhdHVzKSB9fVxuICAgICAgICAgICAgPHEtdG9vbHRpcCBjbGFzcz1cImJnLWJsdWUtZ3JleS04XCIgOm9mZnNldD1cIlsxMCwgMTBdXCJcbiAgICAgICAgICAgICAgPkNoYW5nZSBTdGF0dXM8L3EtdG9vbHRpcFxuICAgICAgICAgICAgPlxuICAgICAgICAgIDwvcS1iYWRnZT5cbiAgICAgICAgICA8cS1wb3B1cC1lZGl0XG4gICAgICAgICAgICBAdXBkYXRlOm1vZGVsLXZhbHVlPVwiKHZhbCkgPT4gdXBkYXRlUmVjaXBlU3RhdHVzKHByb3BzLnJvdywgdmFsKVwiXG4gICAgICAgICAgICB2LW1vZGVsPVwicHJvcHMucm93LnN0YXR1c1wiXG4gICAgICAgICAgICBhdXRvLXNhdmVcbiAgICAgICAgICAgIHYtc2xvdD1cInNjb3BlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3Bhbj4ge3sgcHJvcHMucm93Lm5hbWUgfX08L3NwYW4+XG4gICAgICAgICAgICA8cS1zZWxlY3RcbiAgICAgICAgICAgICAgdi1tb2RlbD1cInNjb3BlLnZhbHVlXCJcbiAgICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgICAgbGFiZWw9XCJzdGF0dXNcIlxuICAgICAgICAgICAgICBhdXRvZm9jdXNcbiAgICAgICAgICAgICAgOm9wdGlvbnM9XCJzdGF0dXNcIlxuICAgICAgICAgICAgICBjb3VudGVyXG4gICAgICAgICAgICAgIG1hc2s9XCIjIyNcIlxuICAgICAgICAgICAgICBAa2V5dXAuZW50ZXI9XCJzY29wZS5zZXRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L3EtcG9wdXAtZWRpdD5cbiAgICAgICAgPC9xLXRkPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6Ym9keS1jZWxsLWFjdGlvbj1cInByb3BzXCI+XG4gICAgICAgIDxxLXRkIDpwcm9wcz1cInByb3BzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWNlbnRlciBxLWd1dHRlci14LW1kXCI+XG4gICAgICAgICAgICA8UmVjaXBlRGVsZXRlIDpkZWxldGU9XCJwcm9wc1wiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS10ZD5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgPC9xLXRhYmxlPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBvbk1vdW50ZWQsIGNvbXB1dGVkLCByZWYsIHdhdGNoIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IFJlY2lwZUVkaXQgZnJvbSBcIi4vUmVjaXBlRWRpdC52dWVcIjtcbmltcG9ydCBSZWNpcGVEZWxldGUgZnJvbSBcIi4vUmVjaXBlRGVsZXRlLnZ1ZVwiO1xuaW1wb3J0IHsgdXNlUmVjaXBlU3RvcmUgfSBmcm9tIFwic3JjL3N0b3Jlcy9yZWNpcGVcIjtcbi8vIGltcG9ydCB7IHVwZGF0ZV9yZWNpcGVfdGFyZ2V0IH0gZnJvbSBcInNyYy9zZXJ2aWNlcy9yZWNpcGVcIjtcbmltcG9ydCB7IGFwaSB9IGZyb20gXCJzcmMvYm9vdC9heGlvc1wiO1xuaW1wb3J0IHsgTm90aWZ5IH0gZnJvbSBcInF1YXNhclwiO1xuXG5jb25zdCByZWNpcGVTdG9yZSA9IHVzZVJlY2lwZVN0b3JlKCk7XG5jb25zdCBmaWx0ZXIgPSByZWYoXCJcIik7XG5jb25zdCBsb2FkaW5nID0gcmVmKHRydWUpO1xuY29uc3QgcmVjaXBlcyA9IHJlZihbXSk7XG5jb25zdCBzaG93Tm9EYXRhTWVzc2FnZSA9IHJlZihmYWxzZSk7XG5jb25zdCBwYWdpbmF0aW9uID0gcmVmKHtcbiAgcm93c1BlclBhZ2U6IDAsXG59KTtcbmNvbnN0IHN0YXR1cyA9IFtcIkluYWN0aXZlXCIsIFwiQWN0aXZlXCJdO1xuXG5jb25zdCByZWNpcGVSb3dzID0gY29tcHV0ZWQoKCkgPT4gcmVjaXBlU3RvcmUucmVjaXBlcyk7XG5cbi8vIENvbXB1dGVkIHByb3BlcnR5IGZvciBmaWx0ZXJlZCByb3dzXG5jb25zdCBmaWx0ZXJlZFJvd3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmICghZmlsdGVyLnZhbHVlKSB7XG4gICAgcmV0dXJuIHJlY2lwZVJvd3MudmFsdWU7XG4gIH1cbiAgcmV0dXJuIHJlY2lwZVJvd3MudmFsdWUuZmlsdGVyKChyb3cpID0+XG4gICAgcm93Lm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmaWx0ZXIudmFsdWUudG9Mb3dlckNhc2UoKSlcbiAgKTtcbn0pO1xuXG5jb25zdCBjYXBpdGFsaXplRmlyc3RMZXR0ZXIgPSAoc3RyaW5nKSA9PiB7XG4gIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSkudG9Mb3dlckNhc2UoKTtcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVJlY2lwZShkYXRhLCB2YWwpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wdXQoXCIvYXBpL3VwZGF0ZS10YXJnZXQvXCIgKyBkYXRhLmlkLCB7XG4gICAgICB0YXJnZXQ6IHBhcnNlSW50KHZhbCksXG4gICAgfSk7XG5cbiAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlXCIsIHJlc3BvbnNlKTtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgICAgY29uc3QgaSA9IHJlY2lwZXMudmFsdWUuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09IGRhdGEuaWQpO1xuICAgICAgcmVjaXBlcy52YWx1ZVtpXSA9IHZhbDtcbiAgICB9XG5cbiAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcbiAgICAgIG1lc3NhZ2U6IFwiUmVjaXBlIHRhcmdldCBlZGl0ZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gICAgICBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgcmVjaXBlIHRhcmdldDpcIiwgZXJyb3IpO1xuICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgbWVzc2FnZTogXCJGYWlsZWQgdG8gZWRpdCByZWNpcGUgdGFyZ2V0XCIsXG4gICAgICBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICB9KTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVSZWNpcGVOYW1lKGRhdGEsIHZhbCkge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnB1dChcIi9hcGkvdXBkYXRlLW5hbWUvXCIgKyBkYXRhLmlkLCB7XG4gICAgICBuYW1lOiB2YWwsXG4gICAgfSk7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgIGNvbnN0IGkgPSByZWNpcGVzLnZhbHVlLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PSBkYXRhLmlkKTtcbiAgICAgIHJlY2lwZXMudmFsdWVbaV0gPSB2YWw7XG4gICAgfVxuXG4gICAgTm90aWZ5LmNyZWF0ZSh7XG4gICAgICB0eXBlOiBcInBvc2l0aXZlXCIsXG4gICAgICBtZXNzYWdlOiBcIlJlY2lwZSBuYW1lIGVkaXRlZCBzdWNjZXNzZnVsbHlcIixcbiAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB1cGRhdGluZyByZWNpcGUgbmFtZTpcIiwgZXJyb3IpO1xuICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgbWVzc2FnZTogXCJGYWlsZWQgdG8gZWRpdCByZWNpcGUgbmFtZVwiLFxuICAgICAgcG9zaXRpb246IFwidG9wXCIsXG4gICAgfSk7XG4gIH1cbn1cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVJlY2lwZVN0YXR1cyhkYXRhLCB2YWwpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wdXQoXCIvYXBpL3VwZGF0ZS1zdGF0dXMvXCIgKyBkYXRhLmlkLCB7XG4gICAgICBzdGF0dXM6IHZhbCxcbiAgICB9KTtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xuICAgICAgY29uc3QgaSA9IHJlY2lwZXMudmFsdWUuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09IGRhdGEuaWQpO1xuICAgICAgcmVjaXBlcy52YWx1ZVtpXSA9IHZhbDtcbiAgICB9XG5cbiAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgIHR5cGU6IFwicG9zaXRpdmVcIixcbiAgICAgIG1lc3NhZ2U6IFwiUmVjaXBlIHN0YXR1cyBjaGFuZ2Ugc3VjY2Vzc2Z1bGx5XCIsXG4gICAgICBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgcmVjaXBlIHN0YXR1czpcIiwgZXJyb3IpO1xuICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgbWVzc2FnZTogXCJGYWlsZWQgdG8gY2hhbmdlIHJlY2lwZSBzdGF0dXNcIixcbiAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgIH0pO1xuICB9XG59XG5cbm9uTW91bnRlZChhc3luYyAoKSA9PiB7XG4gIGF3YWl0IHJlbG9hZFRhYmxlRGF0YSgpO1xufSk7XG5cbmNvbnN0IHJlbG9hZFRhYmxlRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgICByZWNpcGVSb3dzLnZhbHVlID0gYXdhaXQgcmVjaXBlU3RvcmUuZmV0Y2hSZWNpcGVzKCk7XG4gICAgaWYgKCFyZWNpcGVSb3dzLnZhbHVlLmxlbmd0aCkge1xuICAgICAgc2hvd05vRGF0YU1lc3NhZ2UudmFsdWUgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKFwiUmVjaXBlXCIsIHJlY2lwZVJvd3MudmFsdWUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgZmV0Y2hpbmcgcmVjaXBlOiBcIiwgZXJyb3IpO1xuICAgIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gdHJ1ZTtcbiAgfSBmaW5hbGx5IHtcbiAgICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIH1cbn07XG5cbndhdGNoKGZpbHRlciwgYXN5bmMgKG5ld0ZpbHRlcikgPT4ge1xuICBsb2FkaW5nLnZhbHVlID0gdHJ1ZTtcbiAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpO1xuICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gIHNob3dOb0RhdGFNZXNzYWdlLnZhbHVlID0gZmlsdGVyZWRSb3dzLnZhbHVlLmxlbmd0aCA9PT0gMDtcbn0pO1xuXG5jb25zdCByZWNpcGVDb2x1bW5zID0gW1xuICB7XG4gICAgbmFtZTogXCJuYW1lXCIsXG4gICAgbGFiZWw6IFwiUmVjaXBlIE5hbWVcIixcbiAgICBhbGlnbjogXCJsZWZ0XCIsXG4gICAgZmllbGQ6IChyb3cpID0+IHJvdy5uYW1lLFxuICAgIGZvcm1hdDogKHZhbCkgPT4gYCR7dmFsfWAsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInRhcmdldFwiLFxuICAgIGxhYmVsOiBcIlRhcmdldCBQY3NcIixcbiAgICBhbGlnbjogXCJsZWZ0XCIsXG4gICAgZmllbGQ6IFwidGFyZ2V0XCIsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImNhdGVnb3J5XCIsXG4gICAgbGFiZWw6IFwiQ2F0ZWdvcnlcIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBmaWVsZDogXCJjYXRlZ29yeVwiLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJicmVhZF9ncm91cHNcIixcbiAgICBsYWJlbDogXCJMaXN0IG9mIEJyZWFkXCIsXG4gICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgZmllbGQ6IFwiYnJlYWRfZ3JvdXBzXCIsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcImluZ3JlZGllbnRfZ3JvdXBzXCIsXG4gICAgbGFiZWw6IFwiTGlzdCBvZiBJbmdyZWRpZW50c1wiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiBcImluZ3JlZGllbnRfZ3JvdXBzXCIsXG4gICAgc29ydGFibGU6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcInN0YXR1c1wiLFxuICAgIGxhYmVsOiBcIlN0YXR1c1wiLFxuICAgIGFsaWduOiBcImNlbnRlclwiLFxuICAgIGZpZWxkOiBcInN0YXR1c1wiLFxuICAgIHNvcnRhYmxlOiB0cnVlLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJhY3Rpb25cIixcbiAgICBsYWJlbDogXCJBY3Rpb25cIixcbiAgICBhbGlnbjogXCJjZW50ZXJcIixcbiAgICBzb3J0YWJsZTogdHJ1ZSxcbiAgfSxcbl07XG5cbmNvbnN0IGdldEJhZGdlQ2F0ZWdvcnlDb2xvciA9IChjYXRlZ29yeSkgPT4ge1xuICBzd2l0Y2ggKGNhdGVnb3J5KSB7XG4gICAgY2FzZSBcIkZpbGxpbmdcIjpcbiAgICAgIHJldHVybiBcInRlYWxcIjtcbiAgICBjYXNlIFwiRG91Z2hcIjpcbiAgICAgIHJldHVybiBcImJyb3duLTZcIjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIFwiZ3JleVwiO1xuICB9XG59O1xuXG5jb25zdCBnZXRCYWRnZVN0YXR1c0NvbG9yID0gKHN0YXR1cykgPT4ge1xuICBzd2l0Y2ggKHN0YXR1cykge1xuICAgIGNhc2UgXCJJbmFjdGl2ZVwiOlxuICAgICAgcmV0dXJuIFwiZ3JleVwiO1xuICAgIGNhc2UgXCJBY3RpdmVcIjpcbiAgICAgIHJldHVybiBcImdyZWVuXCI7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBcImdyZXlcIjtcbiAgfVxufTtcbjwvc2NyaXB0PlxuPHN0eWxlIHNjb3BlZD5cbi5lbGVnYW50LWNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQ6ICNmN2Y4ZmM7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbn1cbi5hYnNvbHV0ZS1mdWxsIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG59XG4uc3Bpbm5lci13cmFwcGVyIHtcbiAgbWluLWhlaWdodDogNDB2aDsgLyogTWluaW11bSBoZWlnaHQgb2YgNTAlIHZpZXdwb3J0IGhlaWdodCAqL1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5kYXRhLWVycm9yIHtcbiAgbWluLWhlaWdodDogNDB2aDsgLyogTWluaW11bSBoZWlnaHQgb2YgNTAlIHZpZXdwb3J0IGhlaWdodCAqL1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi50YWJsZS1jb250YWluZXIge1xuICBtYXgtaGVpZ2h0OiA0MDBweDsgLyogQWRqdXN0IGFzIG5lZWRlZCAqL1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4ucS10YWJsZS1jb250YWluZXIge1xuICBvdmVyZmxvdzogaGlkZGVuICFpbXBvcnRhbnQ7IC8qIFRhcmdldCB0aGUgY29udGFpbmVyIGdlbmVyYXRlZCBieSBxLXRhYmxlICovXG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbInN0YXR1cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb05BLFVBQU0sYUFBYSxTQUFTLE1BQU0sWUFBWSxPQUFPO0FBRXJELFVBQU0sb0JBQW9CLGlCQUFnQjtBQUMxQyxVQUFNLG1CQUFtQixxQkFBb0I7QUFDN0MsVUFBTSxjQUFjLGVBQWM7QUFDbEMsVUFBTSxTQUFTLElBQUksS0FBSztBQUN4QixVQUFNLGdCQUFnQixNQUFNO0FBQzFCLGFBQU8sUUFBUTtBQUFBLElBQ2pCO0FBQ0EsVUFBTSxXQUFXLENBQUMsU0FBUyxTQUFTO0FBQ3BDLFVBQU0sU0FBUyxTQUFTO0FBQUEsTUFDdEIsTUFBTTtBQUFBLE1BQ04sUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLElBQ1osQ0FBQztBQUVELFVBQU0sYUFBYSxJQUFJLElBQUk7QUFDM0IsVUFBTSxlQUFlLElBQUksQ0FBQSxDQUFFO0FBQzNCLFVBQU0scUJBQXFCLElBQUksYUFBYSxLQUFLO0FBQ2pELFVBQU0sa0JBQWtCLElBQUksQ0FBQSxDQUFFO0FBQzlCLFVBQU0sb0JBQW9CLElBQUksQ0FBQSxDQUFFO0FBQ2hDLFVBQU0sc0JBQXNCLFNBQVM7QUFBQSxNQUNuQyxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsSUFDWixDQUFDO0FBQ0QsVUFBTSwyQkFBMkIsSUFBSSxrQkFBa0IsS0FB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
