<template>
  <div>
    <q-btn
      class="bg-gradient text-white"
      outlined
      label="Add Credits"
      @click="openDialog"
    />
  </div>
  <q-dialog
    v-model="dialog"
    persistent
    position="right"
    backdrop-filter="blur(4px) saturate(150%)"
  >
    <q-card style="width: 450px">
      <q-card-section class="row bg-gradient text-white">
        <div class="text-h6 text-white">Credits</div>
        <!-- {{ saleReportId }} {{ userId }} -->
        <q-space />
        <q-btn icon="arrow_forward_ios" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-y-md">
          <div>
            <div>
              <q-input
                v-model="searchQuery"
                outlined
                dense
                rounded
                debounce="1000"
                style="width: 415px"
                placeholder="Search Name"
              >
                <template v-slot:append>
                  <q-icon v-if="!employeeSearchLoading" name="search" />
                  <q-spinner v-else color="grey" size="sm" />
                </template>
                <div
                  v-if="isDropdownVisible && showUserCard"
                  class="custom-list z-top"
                >
                  <q-card>
                    <q-list separator>
                      <!-- Loading Spinner -->
                      <q-item v-if="loading">
                        <q-item-section>
                          <q-spinner color="primary" />
                        </q-item-section>
                      </q-item>

                      <!-- No Data Available Message -->
                      <q-item v-if="!loading && !employees.length">
                        <q-item-section>
                          No data available in this branch.
                        </q-item-section>
                      </q-item>

                      <!-- Render User List -->
                      <template v-else>
                        <q-item
                          @click="autoFillUser(user)"
                          v-for="user in employees"
                          :key="user.id"
                          clickable
                        >
                          <q-item-section>
                            <q-item-label>
                              {{
                                `
                                  ${user?.firstname} ${
                                  user?.middlename
                                    ? user?.middlename.charAt(0).toUpperCase() +
                                      "."
                                    : ""
                                } ${user?.lastname}`
                              }}
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-list>
                  </q-card>
                </div>
              </q-input>
            </div>
          </div>
          <div class="row q-gutter-sm">
            <div>
              <q-input
                v-model="productSearch"
                placeholder="Search Product"
                outlined
                flat
                debounce="500"
                dense
                style="width: 240px"
              >
                <template v-slot:append>
                  <q-icon v-if="!productSearchLoading" name="search" />
                  <q-spinner v-else color="grey" size="sm" />
                </template>

                <div
                  v-if="isDropDownProductVisible && showProductCard"
                  class="custom-list z-top"
                >
                  <q-card>
                    <q-list separator>
                      <q-item
                        @click="autoFillProduct(product)"
                        v-for="product in productSearchData"
                        :key="product.name"
                        clickable
                      >
                        <q-item-section>
                          <q-item-label>{{ product.name }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card>
                </div>
              </q-input>
            </div>
            <div>
              <q-input
                v-model="creditForm.price"
                reverse-fill-mask
                outlined
                readonly
                flat
                dense
                style="width: 80px"
                label="Price"
              />
            </div>
            <div>
              <q-input
                v-model="creditForm.pieces"
                reverse-fill-mask
                outlined
                type="number"
                flat
                dense
                style="width: 80px"
                label="Pcs"
              />
            </div>
          </div>
          <div align="right">
            <q-btn
              padding="sm md"
              size="xm"
              icon="add"
              dense
              outline
              @click="addCreditToList"
            ></q-btn>
          </div>
          <div>
            <q-field outlined dense readonly>
              <template v-slot:control>
                <div>
                  <q-item
                    v-for="(credit, index) in creditList"
                    :key="index"
                    class="q-gutter-xs"
                  >
                    <!-- Product Name -->
                    <q-item-section class="q-ma-sm text-subtitle2" side>
                      {{ credit.productName }}
                    </q-item-section>

                    <!-- Pieces (pcs) -->
                    <q-item-section class="q-ma-sm q-gutter-sm" side>
                      <q-item-label>Pcs</q-item-label>
                      <q-item-label caption>{{ credit.pieces }}</q-item-label>
                    </q-item-section>

                    <!-- Price -->
                    <q-item-section class="q-ma-sm q-gutter-sm" side>
                      <q-item-label>Price</q-item-label>
                      <q-item-label caption>{{ credit.price }}</q-item-label>
                    </q-item-section>

                    <!-- Total Amount -->
                    <q-item-section class="q-ma-sm q-gutter-sm" side>
                      <q-item-label>Total</q-item-label>
                      <q-item-label caption>{{
                        credit.totalAmount
                      }}</q-item-label>
                    </q-item-section>

                    <!-- Remove Button -->
                    <q-item-section side>
                      <q-btn
                        @click="removeCredit(index)"
                        color="negative"
                        icon="clear"
                        dense
                        flat
                        round
                        class="text-red"
                      />
                    </q-item-section>
                  </q-item>
                </div>
              </template>
            </q-field>
          </div>

          <div class="row justify-between">
            <div>
              <div>Credits Total</div>
              <q-field outlined dense readonly style="width: 120px">
                <template v-slot:control>
                  {{ creditForm.creditTotal }}
                </template>
              </q-field>
            </div>
            <div class="q-mt-lg">
              <q-btn
                color="red-6"
                label="Submit"
                class="q-pa-sm"
                size="md"
                @click="handleSubmit"
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Notify } from "quasar";
import { useEmployeeStore } from "src/stores/employee";
import { useCreditsStore } from "src/stores/employee-credits";
import { useSalesReportsStore } from "src/stores/sales-report";
import { useUsersStore } from "src/stores/user";
import { ref, reactive, computed, watch } from "vue";

// const props = defineProps(["reports", "user"]);
const props = defineProps({
  reports: {
    type: Array,
    default: () => [],
  },
  user: {
    type: Object,
    default: () => ({}),
  },
  saleReportId: {
    type: [String, Number],
    default: null,
  },
  userId: {
    type: [String, Number],
    default: null,
  },
});
const sales_report_id = props.saleReportId;
const userId = props.userId;

const employee_credits_id = props.reports[0]?.id || "";

const userDataStore = useUsersStore();
const userDataSearch = computed(() => userDataStore.users);
const creditsStore = useCreditsStore();
const employeeStore = useEmployeeStore();
const employees = computed(() => employeeStore.employees);
const salesReportsStore = useSalesReportsStore();
const productSearchData = computed(() => salesReportsStore.products);
console.log("products search", productSearchData.value);
const userData = salesReportsStore.user;
console.log("userdata", userData);
const branchId = userData?.device?.reference_id || "";
const dialog = ref(false);
const searchQuery = ref("");
const productSearch = ref("");
const showUserCard = ref(false);
const showProductCard = ref(false);
let userSelected = false;
let productsSelected = false;
const loading = ref(false); // Loading state
const employeeSearchLoading = ref(false);
const productSearchLoading = ref(false);

const formatUserName = (user) => {
  const { firstname, middlename, lastname } = user.employee;
  return `${firstname} ${
    middlename ? middlename.charAt(0) + "." : ""
  } ${lastname}`;
};

const searchUsers = async () => {
  if (searchQuery.value) {
    employeeSearchLoading.value = true; // Set loading to true
    // const branchId = branchId;
    console.log("searchQuery.value", searchQuery.value);
    // console.log("branchId", branchId);
    await employeeStore.searchEmployee(searchQuery.value);
    // console.log("response user",);

    employeeSearchLoading.value = false;
    showUserCard.value = true;
  }
};

const openDialog = () => {
  dialog.value = true;
};

const closeBtn = () => {
  dialog.value = false;
};

const creditForm = reactive({
  credit_user_id: "",
  name: "",
  product_id: "",
  productName: "",
  price: 0,
  pieces: "",
  creditTotal: 0,
});

const clear = () => {
  searchQuery.value = "";
  productSearch.value = "";
  creditForm.credit_user_id = "";
  creditForm.name = "";
  creditForm.product_id = "";
  creditForm.productName = "";
  creditForm.price = "";
  creditForm.pieces = "";
  creditForm.creditTotal = "";
  creditList.value = [];
};

const clearProduct = () => {
  productSearch.value = "";
  creditForm.product_id = "";
  creditForm.productName = "";
  creditForm.price = "";
  creditForm.pieces = "";
};

const isDropdownVisible = computed(() => {
  return searchQuery.value && employees.value.length > 0;
});

const autoFillUser = (user) => {
  console.log("credit", user);
  searchQuery.value = `${user.firstname} ${
    user.middlename ? user.middlename.charAt(0) + "." : ""
  } ${user.lastname}`;
  creditForm.credit_user_id = user.id;
  creditForm.name = `${user.firstname} ${
    user.middlename ? user.middlename.charAt(0) + "." : ""
  } ${user.lastname}`;
  userSelected = true; // Set flag when user is selected
  showUserCard.value = false;
};

const searchProducts = async () => {
  if (productSearch.value) {
    productSearchLoading.value = true; // Set loading to true
    // const branchId = userData?.employee?.branch_id || "";
    const response = await salesReportsStore.searchBranchProducts(
      productSearch.value,
      branchId
    );
    console.log("response", response);
    productSearchLoading.value = false;
    showProductCard.value = true;
  }
};

const isDropDownProductVisible = computed(() => {
  return productSearch.value && productSearchData.value.length > 0;
});
console.log("Product search datasss:", productSearchData.value);

const autoFillProduct = (product) => {
  productSearch.value = product.name;
  creditForm.productName = product.name;
  creditForm.product_id = product.id;
  creditForm.price = product.price;
  productsSelected = true;
  showProductCard.value = false;
};

const productCreditTotalAmount = ref("");
const creditList = ref([]);

// const calculateProductCreditTotalAmount = () => {
//   const price = parseFloat(creditForm.price) || 0;
//   const pieces = parseInt(creditForm.pieces) || 0;

//   if (price && pieces) {
//     productCreditTotalAmount.value = (price * pieces).toFixed(2);
//   } else {
//     productCreditTotalAmount.value = "0.00";
//   }
// };

const calculateProductCreditTotalAmount = () => {
  const price = parseFloat(creditForm.price);
  const pieces = parseInt(creditForm.pieces);

  if (!isNaN(price) && !isNaN(pieces)) {
    const totalAmount = price * pieces;
    productCreditTotalAmount.value = totalAmount.toFixed(2);
  } else {
    productCreditTotalAmount.value = "";
  }

  console.log("productCreditTotalAmount", productCreditTotalAmount.value);
};
const addCreditToList = () => {
  const totalAmount = productCreditTotalAmount.value;

  creditList.value.push({
    credit_user_id: creditForm.credit_user_id,
    product_id: creditForm.product_id,
    name: creditForm.name,
    productName: creditForm.productName,
    price: creditForm.price,
    pieces: creditForm.pieces,
    totalAmount: totalAmount,
  });
  console.log("creditList", creditList.value);
  clearProduct();
};

const removeCredit = (index) => {
  creditList.value.splice(index, 1);
};

watch(searchQuery, (newQuery) => {
  if (newQuery.length > 2 && !userSelected) {
    searchUsers();
  } else {
    showUserCard.value = false;
  }
  userSelected = false; // Reset flag
});

watch(productSearch, (newQuery) => {
  if (newQuery.length > 2 && !productsSelected) {
    searchProducts();
  } else {
    showProductCard.value = false;
  }
  productsSelected = false;
});

watch(
  creditList,
  (newList) => {
    const total = newList.reduce((sum, credit) => {
      return sum + parseFloat(credit.totalAmount);
    }, 0);

    creditForm.creditTotal = total.toFixed(2); // Update the total in the form
  },
  { deep: true }
);

watch(
  [() => creditForm.price, () => creditForm.pieces],
  calculateProductCreditTotalAmount
);
watch(productCreditTotalAmount, (newVal) => {
  console.log("productCreditTotalAmoun", newVal); // This will log whenever the total amount changes
});

const handleSubmit = async () => {
  // const formattedTotalAmount = parseFloat(creditForm.creditTotal);
  const employeeCreditReport = {
    sales_report_id: sales_report_id,
    user_id: userId,
    branch_id: branchId,
    employee_credits_id: employee_credits_id,
    credits: creditList.value.map((credit) => ({
      credit_user_id: credit.credit_user_id,
      branch_id: userData?.employee?.branch_id || "",
      productName: credit.productName,
      product_id: credit.product_id,
      price: credit.price,
      pieces: credit.pieces,
      totalAmount: credit.totalAmount,
    })),
  };

  if (employee_credits_id) {
    // If `employee_credits_id` exists, update existing record
    await creditsStore.addingCredits(employeeCreditReport);
    console.log(
      "Updating existing employee credit record:",
      employeeCreditReport
    );
  } else {
    // If `employee_credits_id` does not exist, create a new one
    await creditsStore.savingCredits(employeeCreditReport);
    console.log("Creating new employee credit record:", employeeCreditReport);
  }

  // await creditsStore.addingCredits(employeeCreditReport);
  // console.log("employeeCreditReport:", employeeCreditReport);

  dialog.value = false;
  clear();
};
</script>

<style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(135deg, #24241d, #b79500);
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

.q-field .q-item-section {
  margin-right: 8px; /* Adjust as needed for spacing */
}

.q-field .row {
  align-items: center;
  justify-content: space-between;
}
</style>
