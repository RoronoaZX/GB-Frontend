<template>
  <q-btn
    class="bg-gradient text-white"
    outlined
    label="Add Other Stocks"
    @click="openDialog"
  />
  <q-dialog v-model="dialog">
    <q-card style="width: 450px">
      <q-card-section class="bg-gradient text-white">
        <div class="row justify-between">
          <div class="text-h6">Add Other Product Stocks</div>
          <div>
            <q-btn icon="close" flat dense round v-close-popup />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-mt-md q-gutter-y-sm">
          <div>
            <q-list dense separator class="box">
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
                v-for="(otherProduct, index) in otherProductsGroup"
                :key="index"
              >
                <q-item-section>
                  <q-item-label class="text-caption">{{
                    capitalizeFirstLetter(otherProduct.label)
                  }}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-caption"
                    >{{ otherProduct.added_stocks }} pcs
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    @click="removeOtherProduct(index)"
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
              <div>
                <div align="center">Other Product</div>
              </div>
              <q-select
                v-model="selectedOtherProducts.name"
                :options="filterOtherProductsOptions"
                @filter="filterOtherProducts"
                debounce="3000"
                outlined
                chips-color="primary"
                dense
                label="Product"
                behavior="menu"
                use-input
                hide-dropdown-icon
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
                v-model.number="selectedOtherProducts.added_stocks"
                outlined
                dense
                type="number"
                label="Quantity"
                suffix="pcs"
                style="width: 115px"
              />
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
                @click="addOtherStocks"
              />
            </div>
          </form>
        </div>
      </q-card-section>
      <q-card-actions class="row q-ma-md" align="right">
        <q-btn class="glossy" color="grey-9" label="Dismiss" />
        <q-btn
          class="glossy"
          color="teal"
          label="Create"
          @click="save"
          :disable="!isFormValid"
          :loading="loading"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useSalesReportsStore } from "src/stores/sales-report";
import { useOtherProductStore } from "src/stores/other-product";
import { computed, reactive, ref } from "vue";
import { Notify } from "quasar";
import { calendarFormat } from "moment";

const salesReportsStore = useSalesReportsStore();
const userData = salesReportsStore.user;
const branches_id = userData?.employee?.branch_id || "";
const otherProductStore = useOtherProductStore();
const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};
const category = ref("Others");
const loading = ref(false);
const otherProductsGroup = ref([]);
const otherProductsOptions = ref([]);

const selectedOtherProducts = reactive({
  name: "",
  added_stocks: "",
});

const filterOtherProductsOptions = ref(otherProductsOptions.value);

const fetchBranchOtherProducts = async () => {
  try {
    const branchesId = branches_id?.branch_id || branches_id;
    const categoryValue = category.value;

    if (!branchesId || !categoryValue) {
      console.log("Invalid branchesId or category value.");
      return;
    }

    const otherProduct = await otherProductStore.fetchBranchOtherProduct(
      branchesId,
      categoryValue
    );
    loading.value = false;
    otherProductsOptions.value = otherProductStore.otherProducts.map((val) => {
      return {
        label: val.name,
        value: val.id,
        price: val.price,
      };
    });
  } catch (error) {
    console.error("Error fetching branch selecta:", error);
  }
};
fetchBranchOtherProducts();

const clearData = () => {
  selectedOtherProducts.name = "";
  selectedOtherProducts.added_stocks = "";
};

const filterOtherProducts = (val, update) => {
  update(() => {
    if (val === "") {
      filterOtherProductsOptions.value = otherProductsOptions.value;
    } else {
      const needle = val.toLowerCase();
      filterOtherProductsOptions.value = otherProductsOptions.value.filter(
        (v) => v.label.toLowerCase().indexOf(needle) > -1
      );
    }
  });
};

const addOtherStocks = () => {
  const data = otherProductsGroup.value;

  function findObjectById(arr, id) {
    return arr.find((obj) => obj.product_id == id);
  }
  const idToSearch = selectedOtherProducts.name.value;

  const foundObject = findObjectById(data, idToSearch);
  if (!foundObject) {
    const selectedProduct = otherProductsOptions.value.find(
      (product) => product.value === idToSearch
    );

    otherProductsGroup.value = [
      ...data,
      {
        product_id: selectedOtherProducts.name.value,
        label: selectedOtherProducts.name.label,
        added_stocks: selectedOtherProducts.added_stocks,
        price: selectedProduct.price,
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

const removeOtherProduct = (index) => {
  otherProductsGroup.value.splice(index, 1);
};

const isFormValid = computed(() => {
  return (
    otherProductsGroup.value.length > 0 &&
    otherProductsGroup.value.every((product) => product.added_stocks > 0)
  );
});

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const addStocks = reactive({
  product_id: "",
  product_name: "",
  product_category: "",
  price: 0,
  added_stocks: 0,
});

const clearForm = () => {
  addStocks.product_id = "";
  addStocks.product_name = "";
  addStocks.product_category = "";
  addStocks.price = "";
  addStocks.added_stocks = "";
};

const dismiss = () => {
  clearForm();
  dialog.value = false;
};

const save = async () => {
  try {
    // Prepare the data to be sent
    loading.value = true;
    const data = {
      branches_id: userData?.employee?.branch_id || "",
      employee_id: userData?.employee?.employee_id || "",
      status: "pending",
      products: otherProductsGroup.value, // Include the array
    };

    // Call the API to save the data
    await otherProductStore.createOtherStocks(data);

    console.log("Data sent to backend:", data);

    // Clear form and close dialog
    clearForm();
    otherProductsGroup.value = [];

    // Notify the user of success
    Notify.create({
      type: "positive",
      message: "Selecta stocks successfully saved!",
      timeout: 2000,
    });
    dialog.value = false;
  } catch (error) {
    console.error("Error saving selecta stocks:", error);

    // Notify the user of an error
    Notify.create({
      type: "negative",
      message: "An error occurred while saving selecta stocks.",
      timeout: 2000,
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(135deg, #434141, #747373);
}

.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
