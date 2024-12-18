<template>
  <q-btn
    class="bg-gradient text-white"
    outlined
    label="Add Softdrinks Stocks"
    @click="openDialog"
  >
  </q-btn>
  <q-dialog v-model="dialog">
    <q-card style="width: 450px">
      <q-card-section class="bg-gradient text-white">
        <div class="row justify-between">
          <div class="text-h6">Add Softdrinks Stocks</div>
          <div>
            <q-btn icon="close" flat dense round v-close-popup />
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-mt-md q-gutter-y-sm">
        <!-- <div class="text-weight-meduim">Softdrinks List</div> -->
        <div>
          <q-list dense separator class="box">
            <q-item>
              <q-item-section>
                <q-item-label class="text-overline">Product Name</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-overline">Added Stocks</q-item-label>
              </q-item-section>
              <q-item-section side>
                <!-- Empty space for alignment with the delete button -->
              </q-item-section>
            </q-item>
            <q-item
              v-for="(softdrinksProduct, index) in softdrinksProductGroup"
              :key="index"
            >
              <q-item-section>
                <q-item-label class="text-caption">
                  {{ capitalizeFirstLetter(softdrinksProduct.label) }}
                </q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-caption q-ml-md">
                  {{ softdrinksProduct.added_stocks }} pcs
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  @click="removeSoftdrinksProduct(index)"
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
        <div class="q-mt-xl q-gutter-y-sm">
          <div class="row justify-between">
            <div>
              <div align="center">Softdrinks Product</div>
              <q-select
                v-model="selectedSoftdrinksProducts.name"
                debounce="3000"
                outlined
                chips-color="primary"
                :options="filterSoftdrinksProductsOptions"
                dense
                label="Softdrinks"
                behavior="menu"
                use-input
                hide-dropdown-icon
                @filter="filterSoftdrinksProducts"
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
                v-model.number="selectedSoftdrinksProducts.added_stocks"
                outlined
                dense
                type="number"
                label="Quantity"
                suffix="pcs"
                style="width: 115px"
              />
            </div>
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
              @click="addSoftdrinksStocks"
            />
          </div>
        </form>
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
import { computed, ref, reactive } from "vue";
import { useSalesReportsStore } from "src/stores/sales-report";
import { useSoftdrinksProductStore } from "src/stores/softdrinks-products";
import { Notify } from "quasar";

const salesReportsStore = useSalesReportsStore();
const userData = salesReportsStore.user;
const branches_id = userData?.employee?.branch_id || "";
const softdrinksProductStore = useSoftdrinksProductStore();
const softdrinksProductsData = computed(
  () => softdrinksProductStore.softdrinksProducts
);
const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};
const category = ref("Softdrinks");
const loading = ref(false);
const softdrinksProductGroup = ref([]);
const softdrinksProductsOptions = ref([]);

const selectedSoftdrinksProducts = reactive({
  name: "",
  added_stocks: "",
});
const filterSoftdrinksProductsOptions = ref(softdrinksProductsOptions.value);
console.log(
  "filterSoftdrinksProductsOptions",
  filterSoftdrinksProductsOptions.value
);
const fetchBranchSoftdrinks = async () => {
  try {
    const branchesId = branches_id?.branches_id || branches_id;
    const categoryValue = category.value;

    if (!branchesId || !categoryValue) {
      console.error("Invalid branchesId or category value.");
      return;
    }

    const softdrinksProduct =
      await softdrinksProductStore.fetchBranchSoftdrinksProduct(
        branchesId,
        categoryValue
      );
    loading.value = false;
    softdrinksProductsOptions.value =
      softdrinksProductStore.softdrinksProducts.map((val) => {
        return {
          label: val.name,
          value: val.id,
          price: val.price,
        };
      });
    console.log(
      "softdrinksProductsOptions.value",
      softdrinksProductsOptions.value
    );
  } catch (error) {
    console.error("Error fetching branch softdrinks:", error);
  }
};

fetchBranchSoftdrinks();

const clearData = () => {
  (selectedSoftdrinksProducts.name = ""),
    (selectedSoftdrinksProducts.added_stocks = "");
};

const filterSoftdrinksProducts = (val, update) => {
  update(() => {
    if (val === "") {
      filterSoftdrinksProductsOptions.value = softdrinksProductsOptions.value;
    } else {
      const needle = val.toLowerCase();
      filterSoftdrinksProductsOptions.value =
        softdrinksProductsOptions.value.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
    }
  });
};

const addSoftdrinksStocks = () => {
  const data = softdrinksProductGroup.value;

  function findObjectById(arr, id) {
    return arr.find((obj) => obj.product_id == id);
  }

  const idToSearch = selectedSoftdrinksProducts.name.value;

  const foundObject = findObjectById(data, idToSearch);
  if (!foundObject) {
    const selectedProduct = softdrinksProductsOptions.value.find(
      (product) => product.value === idToSearch
    );

    softdrinksProductGroup.value = [
      ...data,
      {
        product_id: selectedSoftdrinksProducts.name.value,
        label: selectedSoftdrinksProducts.name.label,
        added_stocks: selectedSoftdrinksProducts.added_stocks,
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

const removeSoftdrinksProduct = (index) => {
  softdrinksProductGroup.value.splice(index, 1);
};

const isFormValid = computed(() => {
  return (
    softdrinksProductGroup.value.length > 0 && // Ensure there's at least one product
    softdrinksProductGroup.value.every((product) => product.added_stocks > 0) // Check all added stocks are valid
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
  addSoftdrinksstock.product_id = "";
  addSoftdrinksstock.product_name = "";
  addSoftdrinksstock.product_category = "";
  addSoftdrinksstock.price = "";
  addSoftdrinksstock.added_stocks = "";
};

const addSoftdrinksstock = reactive({
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
      products: softdrinksProductGroup.value, // Include the array
    };

    // Call the API to save the data
    await softdrinksProductStore.createSoftdrinksStocks(data);

    console.log("Data sent to backend:", data);

    // Clear form and close dialog
    clearForm();
    softdrinksProductGroup.value = [];
    dialog.value = false;

    // Notify the user of success
    Notify.create({
      type: "positive",
      message: "Softdrinks stocks successfully saved!",
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
  background: linear-gradient(135deg, #1b78f1, #1ac7f2);
}

.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
