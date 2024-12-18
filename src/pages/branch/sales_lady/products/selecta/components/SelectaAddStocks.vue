<template>
  <q-btn
    class="bg-gradient text-white"
    outlined
    label="Add Selecta Stocks"
    @click="openDialog"
  />
  <q-dialog v-model="dialog">
    <q-card style="width: 450px">
      <q-card-section class="bg-gradient text-white">
        <div class="row justify-between">
          <div class="text-h6">Add Selecta Stocks</div>
          <div>
            <q-btn icon="close" flat dense round v-close-popup />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-mt-md q-gutter-y-sm">
          <!-- <div class="text-weight-meduim">Selecta List</div> -->
          <div>
            <q-list dense separator class="box">
              <!-- Header row inside the q-list -->
              <q-item>
                <q-item-section>
                  <q-item-label class="text-overline"
                    >Product Name</q-item-label
                  >
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-overline"
                    >Added Stocks</q-item-label
                  >
                </q-item-section>
                <q-item-section side>
                  <!-- Empty space for alignment with the delete button -->
                </q-item-section>
              </q-item>
              <q-item
                v-for="(selectaProduct, index) in selectaProductsGroups"
                :key="index"
              >
                <q-item-section>
                  <q-item-label class="text-caption">{{
                    capitalizeFirstLetter(selectaProduct.label)
                  }}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-caption q-ml-md">
                    {{ selectaProduct.added_stocks }} pcs
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    @click="removeSelectaProduct(index)"
                    color="grey-10"
                    icon="backspace"
                    dense
                    flat
                    round
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <div class="q-mt-xl q-gutter-y-sm">
          <div class="row justify-between">
            <div>
              <div align="center">Selecta Product</div>
              <q-select
                v-model="selectedSelectaProducts.name"
                debounce="3000"
                outlined
                chips-color="primary"
                :options="filterSelectaProductsOptions"
                dense
                label="Selecta"
                behavior="menu"
                use-input
                hide-dropdown-icon
                @filter="filterSelectaProducts"
                style="width: 215px; max-width: 600px; min-width: 80px"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <div>
              <div align="center">Added Stocks</div>
              <q-input
                v-model.number="selectedSelectaProducts.added_stocks"
                outlined
                dense
                type="number"
                label="Quantity"
                suffix="pcs"
                style="width: 115px"
              />
              <!-- hint="Enter the added_stocks as a decimal"
              mask="##.##"
              -->
            </div>
          </div>
          <form @keyup.enter.prevent="addBranchProduct">
            <div align="right">
              <q-btn
                padding="xs md"
                type="button"
                size="sm"
                outline
                dense
                label="add"
                icon="add"
                color="purple"
                @click="addSelectaStocks"
              />
            </div>
          </form>
        </div>
      </q-card-section>
      <q-card-actions class="row q-ma-md" align="right">
        <q-btn class="glossy" color="grey-9" label="Dismiss" @click="dismiss" />
        <q-btn
          class="glossy"
          color="teal"
          label="Create"
          @click="save"
          :disable="!isFormValid"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useSalesReportsStore } from "src/stores/sales-report";
import { useSelectaProductsStore } from "src/stores/selecta-product";
import { Notify } from "quasar";

const salesReportsStore = useSalesReportsStore();
const userData = salesReportsStore.user;
const branches_id = userData?.employee?.branch_id || "";
const employee_id = userData?.employee?.employee_id || "";
const selectaProductStore = useSelectaProductsStore();
const selectaProductsData = computed(() => selectaProductStore.selectaProducts);
const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};
const searchQuery = ref("");
const category = ref("Selecta");
const loading = ref(false);
const selectaProductsGroups = ref([]);
const selectaProductsOptions = ref([]);

const selectedSelectaProducts = reactive({
  name: "",
  added_stocks: "",
});

const filterSelectaProductsOptions = ref(selectaProductsOptions.value);

const fetchBranchSelecta = async () => {
  try {
    const branchesId = branches_id?.branches_id || branches_id; // Ensure compatibility with the object structure
    const categoryValue = category.value;

    if (!branchesId || !categoryValue) {
      console.error("Invalid branchesId or category value.");
      return;
    }

    const selectaProduct = await selectaProductStore.fetchBranchSelectaProduct(
      branchesId,
      categoryValue
    );
    loading.value = false;
    selectaProductsOptions.value = selectaProductStore.selectaProducts.map(
      (val) => {
        return {
          label: val.name,
          value: val.id,
          price: val.price,
        };
      }
    );
  } catch (error) {
    console.error("Error fetching branch selecta:", error);
  }
};

fetchBranchSelecta();

const clearData = () => {
  (selectedSelectaProducts.name = ""),
    (selectedSelectaProducts.added_stocks = "");
};

const filterSelectaProducts = (val, update) => {
  update(() => {
    if (val === "") {
      filterSelectaProductsOptions.value = selectaProductsOptions.value;
    } else {
      const needle = val.toLowerCase();
      filterSelectaProductsOptions.value = selectaProductsOptions.value.filter(
        (v) => v.label.toLowerCase().indexOf(needle) > -1
      );
    }
  });
};

const addSelectaStocks = () => {
  const data = selectaProductsGroups.value;

  function findObjectById(arr, id) {
    return arr.find((obj) => obj.product_id == id);
  }
  const idToSearch = selectedSelectaProducts.name.value;

  const foundObject = findObjectById(data, idToSearch);
  if (!foundObject) {
    const selectedProduct = selectaProductsOptions.value.find(
      (product) => product.value === idToSearch
    );

    selectaProductsGroups.value = [
      ...data,
      {
        product_id: selectedSelectaProducts.name.value,
        label: selectedSelectaProducts.name.label,
        added_stocks: selectedSelectaProducts.added_stocks,
        price: selectedProduct.price, // Add the product price here
      },
    ];
    clearData();
  } else {
    Notify.create({
      type: "negative",
      icon: "warning",
      message: "Product already exists",
      timeout: 2000,
    });
  }
};

// const addSelectaStocks = () => {
//   const data = selectaProductsGroups.value;

//   function findObjectById(arr, id) {
//     return arr.find((obj) => obj.product_id == id);
//   }
//   const idToSearch = selectedSelectaProducts.name.value;

//   const foundObject = findObjectById(data, idToSearch);
//   if (!foundObject) {
//     selectaProductsGroups.value = [
//       ...data,
//       {
//         product_id: selectedSelectaProducts.name.value,
//         label: selectedSelectaProducts.name.label,
//         added_stocks: selectedSelectaProducts.added_stocks,
//         price: selectedProduct.price,
//       },
//     ];
//     clearData();
//   } else {
//     Notify.create({
//       type: "negative",
//       icon: "warning",
//       message: "Ingredient already exist",
//       timeout: 2000,
//     });
//     // al
//   }
// };

const removeSelectaProduct = (index) => {
  selectaProductsGroups.value.splice(index, 1);
};

const isFormValid = computed(() => {
  return (
    selectaProductsGroups.value.length > 0 && // Ensure there's at least one product
    selectaProductsGroups.value.every((product) => product.added_stocks > 0) // Check all added stocks are valid
  );
});

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const dismiss = () => {
  clearForm();
  dialog.value = false;
};

const clearForm = () => {
  addSelectastocks.product_id = "";
  addSelectastocks.product_name = "";
  addSelectastocks.product_category = "";
  addSelectastocks.price = "";
  addSelectastocks.added_stocks = "";
};

const addSelectastocks = reactive({
  product_id: "",
  product_name: "",
  product_category: "",
  price: 0,
  added_stocks: 0,
});

const save = async () => {
  try {
    // Prepare the data to be sent
    const data = {
      branches_id: userData?.employee?.branch_id || "",
      employee_id: userData?.employee?.employee_id || "",
      status: "pending",
      products: selectaProductsGroups.value, // Include the array
    };

    // Call the API to save the data
    await selectaProductStore.createSelectaStocks(data);

    console.log("Data sent to backend:", data);

    // Clear form and close dialog
    clearForm();
    selectaProductsGroups.value = [];
    dialog.value = false;

    // Notify the user of success
    Notify.create({
      type: "positive",
      message: "Selecta stocks successfully saved!",
      timeout: 2000,
    });
  } catch (error) {
    console.error("Error saving selecta stocks:", error);

    // Notify the user of an error
    Notify.create({
      type: "negative",
      message: "An error occurred while saving selecta stocks.",
      timeout: 2000,
    });
  }
};
</script>

<style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(135deg, #ff0844, #ed7b59);
}

.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
