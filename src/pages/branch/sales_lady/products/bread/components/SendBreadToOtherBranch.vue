<template>
  <q-btn
    class="bg-gradient text-white"
    outlined
    label="Send Bread To Branch"
    @click="openDialog"
  />

  <q-dialog v-model="dialog">
    <q-card style="width: 450px">
      <q-card-section class="bg-gradient text-white">
        <div class="row justify-between items-center">
          <div class="text-h6">Send bread to other branch</div>
          <q-btn icon="close" flat dense round v-close-popup />
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="searchQuery"
          @update:model-value="search"
          @focus="handleFocus"
          outlined
          rounded
          dense
          debounce="500"
          placeholder="Enter branch"
          :loading="searchLoading"
        >
          <template v-slot:append>
            <q-icon v-if="!searchLoading" name="search" />
          </template>

          <div
            v-if="showBranchCard && isDropDownBranchVisible"
            class="custom-list z-top"
          >
            <q-card>
              <q-list separator>
                <q-item v-if="!branches.length">
                  <q-item-section>No Branch Found</q-item-section>
                </q-item>
                <q-item
                  v-for="branch in branches"
                  :key="branch.id"
                  clickable
                  @click="autoFillBranch(branch)"
                >
                  <q-item-section>{{
                    capitalizeFirstLetter(branch.name)
                  }}</q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </q-input>
      </q-card-section>
      <q-card-section class="q-mt-xl q-gutter-y-sm">
        <div class="row justify-between">
          <div>
            <div align="center">Bread Product</div>
            <q-select
              v-model="selectedBreadProducts.name"
              :options="filterBreadProductsOptions"
              debounce="3000"
              outlined
              dense
              label="Bread"
              behavior="menu"
              use-input
              hide-dropdown-icon
              @filter="filterBreadProducts"
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
            <div align="center">Quantity</div>
            <q-input
              v-model="selectedBreadProducts.quantity"
              type="number"
              outlined
              dense
              style="width: 180px; max-width: 600px; min-width: 80px"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-gutter-sm">
        <div align="right">
          <q-btn
            padding="sm md"
            icon="add"
            outline
            dense
            @click="addBreadStocks"
            :loading="loading"
          >
          </q-btn>
        </div>
      </q-card-section>
      <q-card-section>
        <div>
          <q-list separator class="box">
            <q-item>
              <q-item-section>
                <q-item-label> Product Name </q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label> Quantity </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label> Action </q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-for="(bread, index) in breadProductGroups" :key="index">
              <q-item-section>
                <q-item-label>
                  {{ capitalizeFirstLetter(bread.label) }}
                </q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  {{ bread.quantity }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label>
                  <q-btn
                    color="grey-10"
                    icon="backspace"
                    dense
                    flat
                    round
                    @click="removeBreadProductToList(bread)"
                  />
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
      <q-card-section align="right">
        <q-btn color="red-6" icon="send" @click="save"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useBranchesStore } from "src/stores/branch";
import { useSalesReportsStore } from "src/stores/sales-report";
import { useBreadProductStore } from "src/stores/bread-product";
import { Notify } from "quasar";

import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter } = typographyFormat();

const branchStore = useBranchesStore();
const branches = computed(() => branchStore.branch);
const salesReportsStore = useSalesReportsStore();
const productSearchData = computed(() => salesReportsStore.products);
const breadProductStore = useBreadProductStore();
const breads = computed(() => breadProductStore.breads);

const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const searchQuery = ref("");
const searchLoading = ref(false);
const showBranchCard = ref(false);
const branchSelected = ref(false);

const userData = salesReportsStore.user;
console.log("userData from send", userData);
const branchId =
  userData?.device?.reference_id || userData?.device?.reference?.id || "";
console.log("branch id", branchId);
const employee_id = userData?.employee?.employee_id || "";

const category = ref("Bread");
const loading = ref(false);
const breadProductGroups = ref([]);
const breadProductOptions = ref([]);

const selectedBreadProducts = reactive({
  name: "",
  quantity: "",
});

const search = async () => {
  if (searchQuery.value.trim()) {
    searchLoading.value = true;
    await branchStore.search(searchQuery.value);
    searchLoading.value = false;
    showBranchCard.value = true;
  } else {
    branchStore.branch = []; // clear branch list if input is empty
    showBranchCard.value = false;
  }
};

const handleFocus = () => {
  if (Array.isArray(branches.value) && branches.value.length > 0) {
    showBranchCard.value = true;
  }
};

const isDropDownBranchVisible = computed(() => {
  return !!searchQuery.value;
});

const autoFillBranch = (branch) => {
  searchQuery.value = capitalizeFirstLetter(branch.name);
  sendingBreadtoBranchData.branch_id = branch.id;
  branchSelected.value = true;
  showBranchCard.value = false;
};

const sendingBreadtoBranchData = reactive({
  branch_id: "",
  product_id: "",
  quantity: "",
});

const filterBreadProductsOptions = ref(breadProductOptions.value);

const fetchBranchBread = async () => {
  try {
    const selectaProduct = await breadProductStore.fetchBranchBread(
      branchId,
      category.value
    );
    loading.value = false;
    console.log("bread", breads.value);
    breadProductOptions.value = breadProductStore.breads.map((val) => {
      return {
        label: capitalizeFirstLetter(val.name),
        value: val.id,
        price: val.price,
      };
    });
    console.log("breadProductOptions.value", breadProductOptions.value);
  } catch (error) {
    console.error("Error fetching branch selecta:", error);
  }
};
fetchBranchBread();

const filterBreadProducts = (val, update) => {
  update(() => {
    if (val === "") {
      filterBreadProductsOptions.value = breadProductOptions.value;
    } else {
      const needle = val.toLowerCase();
      filterBreadProductsOptions.value = breadProductOptions.value.filter(
        (v) => v.label.toLowerCase().indexOf(needle) > -1
      );
    }
  });
};

const addBreadStocks = async () => {
  loading.value = true;
  try {
    const data = breadProductGroups.value;

    const findObjectById = (arr, id) => {
      return arr.find((obj) => obj.product_id == id);
    };

    const idToSearch = selectedBreadProducts.name.value;

    const foundObject = findObjectById(data, idToSearch);
    if (!foundObject) {
      const selectedProduct = breadProductOptions.value.find(
        (product) => product.value === idToSearch
      );
      console.log("selected product", selectedProduct);
      breadProductGroups.value = [
        ...data,
        {
          product_id: selectedBreadProducts.name.value,
          label: selectedBreadProducts.name.label,
          quantity: selectedBreadProducts.quantity,
          price: selectedProduct.price,
        },
      ];
      console.log("breadProductGroups.value", breadProductGroups.value);
    }
    clearBreadAndQuantityInput();
  } catch (error) {
    console.error("Error adding bread stocks:", error);
  } finally {
    loading.value = false;
  }
};

const removeBreadProductToList = (index) => {
  breadProductGroups.value.splice(index, 1);
};

const clearBreadAndQuantityInput = () => {
  (selectedBreadProducts.name = ""), (selectedBreadProducts.quantity = "");
};

const clearSendingBreadtoBranchData = () => {
  searchQuery.value = "";
  sendingBreadtoBranchData.branch_id = "";
  sendingBreadtoBranchData.product_id = "";
  sendingBreadtoBranchData.quantity = "";
  breadProductGroups.value = "";
};

const save = async () => {
  try {
    loading.value = true;
    const data = {
      from_branch_id: branchId,
      to_branch_id: sendingBreadtoBranchData.branch_id,
      employee_id: employee_id,
      status: "pending",
      products: breadProductGroups.value,
    };
    console.log("bread data to  be sent to the data base", data);
    await breadProductStore.sendBreadToBranch(data);
    Notify.create({
      type: "positive",
      message: "Sending Bread successfully!",
    });
  } catch (error) {
    console.log(error);
    Notify.create({
      type: "negative",
      message: "Sending Bread unsuccessfull!",
    });
  } finally {
    loading.value = false;
  }

  clearSendingBreadtoBranchData();
  dialog.value = false;
};
</script>

<style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(135deg, #5c4033, #a9746e);
}
.custom-list {
  position: absolute;
  background-color: white;
  width: 100%;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  max-height: 200px;
  overflow-y: auto;
  bottom: 0;
  transform: translateY(100%); /* Move the dropdown below the input */
  z-index: 10; /* Ensure it appears above other content */
}
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
