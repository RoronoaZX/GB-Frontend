<template>
  <div>
    <q-btn
      class="bg-gradient text-white"
      outlined
      label="Expenses Report"
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
      <q-card-section class="bg-gradient text-white">
        <div class="row justify-between">
          <div class="text-h6">Expenses</div>
          <!-- {{ sales_report_id }} -->
          <div>
            <q-btn icon="arrow_forward_ios" flat dense round v-close-popup />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-y-md">
          <div class="row q-gutter-x-md">
            <div>
              <q-input
                v-model="expensesForm.name"
                outlined
                dense
                style="width: 300px"
                placeholder="Name"
              >
                <!-- <div
                    v-if="isDropdownVisible && showUserCard"
                    class="custom-list z-top"
                  >
                    <q-card>
                      <q-list separator>
                        <q-item v-if="!userDataSearch?.length">
                          No record found.
                        </q-item>
                        <template v-else>
                          <q-item
                            @click="autoFillUser(user)"
                            v-for="user in userDataSearch"
                            :key="user.id"
                            clickable
                          >
                            <q-item-section>
                              <q-item-label>{{ user.name }}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-list>
                    </q-card>
                  </div> -->
              </q-input>
            </div>
            <div>
              <q-input
                v-model="expensesForm.amount"
                reverse-fill-mask
                outlined
                type="number"
                dense
                style="width: 100px"
                label="Amount"
              />
            </div>
          </div>
          <div>
            <q-input
              v-model="expensesForm.description"
              placeholder="Description"
              outlined
              autogrow
              style="width: 415px"
            />
          </div>
          <div align="right">
            <q-btn
              padding="sm md"
              size="xm"
              icon="add"
              dense
              outline
              @click="addExpensesToList"
            ></q-btn>
            <!-- @click="addexpensesToList" -->
          </div>
          <div>
            <q-list dense separator class="box">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-overline">Name</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-overline">Description</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-overline">Amount</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-overline"></q-item-label>
                </q-item-section>
                <!-- <q-item-section>
                  <q-item-label class="text-overline">Unit</q-item-label>
                </q-item-section> -->
              </q-item>
              <div>
                <q-item
                  v-for="(expenses, index) in expensesList"
                  :key="index"
                  class="q-gutter-xs"
                >
                  <!-- Product Name -->
                  <q-item-section class="q-ma-sm text-subtitle2">
                    <q-item-label caption>
                      {{ expenses.name }}
                    </q-item-label>
                  </q-item-section>

                  <!-- Pieces (pcs) -->
                  <q-item-section class="q-ma-sm q-gutter-sm">
                    <q-item-label caption>{{
                      expenses.description
                    }}</q-item-label>
                  </q-item-section>

                  <!-- Price -->
                  <q-item-section class="q-ma-sm q-gutter-sm">
                    <q-item-label caption>{{ expenses.amount }}</q-item-label>
                  </q-item-section>

                  <!-- Remove Button -->
                  <q-item-section side>
                    <q-btn
                      @click="removeExpenses(index)"
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
            </q-list>
          </div>
          <div class="" align="right">
            <q-btn
              color="red-6"
              label="Submit"
              class="q-pa-sm"
              size="md"
              @click="handleSubmit"
            />
          </div>
        </div>
      </q-card-section>
      <!-- {{ user }} {{ reports }} -->
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Notify } from "quasar";
import { useSalesReportsStore } from "src/stores/sales-report";
import { useUsersStore } from "src/stores/user";
import { useExpensesStore } from "src/stores/expenses";
import { ref, reactive, computed } from "vue";

const expensesStore = useExpensesStore();
const props = defineProps({
  reports: {
    type: Array,
    default: () => [],
  },
  user: {
    type: Object,
    default: () => ({}),
  },
  sales_report_id: {
    type: [String, Number],
    default: null,
  },
  user_id: {
    type: [String, Number],
    default: null,
  },
});

const sales_report_id = props.sales_report_id || "N/A"; // Fallback if undefined
const branch_id = (props.reports[0] && props.reports[0].branch_id) || "Unknown"; // Fallback if reports is empty
const user_id = props.user_id || "Unknown"; // Fallback if undefined
const dialog = ref(false);
const expensesList = ref([]);

const expensesForm = reactive({
  user_expense_id: "",
  name: "",
  amount: 0,
  description: "",
});

const addExpensesToList = () => {
  if (expensesForm.name && expensesForm.amount && expensesForm.description) {
    expensesList.value.push({
      user_expense_id: expensesForm.user_expense_id,
      name: expensesForm.name,
      amount: expensesForm.amount,
      description: expensesForm.description,
    });
    clearExpenses();
  } else {
    Notify.create({
      type: "negative",
      message: "Please fill all fields before adding.",
      timeout: 2000,
    });
  }
};

const clearExpenses = () => {
  expensesForm.user_expense_id = "";
  expensesForm.name = "";
  expensesForm.amount = 0;
  expensesForm.description = "";
};

const removeExpenses = (index) => {
  expensesList.value.splice(index, 1);
};

const openDialog = () => {
  dialog.value = true;
};

const handleSubmit = async () => {
  const expenseReport = {
    sales_report_id: sales_report_id,
    branch_id: branch_id,
    user_id: user_id,
    expenses: expensesList.value.map((expense) => ({
      name: expense.name,
      amount: expense.amount,
      description: expense.description,
    })),
  };
  await expensesStore.addingExpense(expenseReport);
  Notify.create({
    type: "positive",
    message: "Expenses Submitted",
    timeout: 1000,
  });
  clearExpenses();
};

// import { Notify } from "quasar";
// import { useSalesReportsStore } from "src/stores/sales-report";
// import { useUsersStore } from "src/stores/user";
// import { useExpensesStore } from "src/stores/expenses";
// import { ref, reactive, computed } from "vue";

// const expensesStore = useExpensesStore();
// const props = defineProps(["reports", "user", "sales_report_id", "user_id"]);
// console.log("Expenses Data", props.reports);
// console.log("Expenses User", props.user);
// console.log("Expenses Sales Report ID", props.sales_report_id);
// const sales_report_id = props.sales_report_id;
// const branch_id = props.reports[0].branch_id;
// const user_id = props.user_id;
// console.log("user_id", user_id);
// console.log("branch_id", branch_id);
// // const user_id = props.user.employee.id;
// const userDataStore = useUsersStore();
// const userDataSearch = computed(() => userDataStore.users);
// const salesReportsStore = useSalesReportsStore();
// const userData = salesReportsStore.user;
// console.log("userdatasss", userData);
// const dialog = ref(false);
// const expensesList = ref([]);

// const addExpensesToList = () => {
//   expensesList.value.push({
//     user_expense_id: expensesForm.user_expense_id,
//     name: expensesForm.name,
//     amount: expensesForm.amount,
//     description: expensesForm.description,
//   });
//   console.log("expensesList", expensesList.value);
//   clearExpenses();
// };

// const clearExpenses = () => {
//   expensesForm.user_expense_id = "";
//   expensesForm.name = "";
//   expensesForm.amount = "";
//   expensesForm.description = "";
// };
// // const searchQuery = ref("");
// // const showUserCard = ref(true);

// // const searchUsers = async () => {
// //   if (searchQuery.value) {
// //     const branchId = userData?.data?.branch_employee?.branch_id || "";
// //     await userDataStore.searchUserWithID(searchQuery.value, branchId);
// //     showUserCard.value = true;
// //   }
// // };

// const isDropdownVisible = computed(() => {
//   return searchQuery.value && userDataSearch.value.length > 0;
// });

// const expensesForm = reactive({
//   user_expense_id: "",
//   name: "",
//   amount: 0,
//   description: "",
// });

// const removeExpenses = (index) => {
//   expensesList.value.splice(index, 1);
// };

// // const autoFillUser = (user) => {
// //   searchQuery.value = user.name;
// //   expensesForm.name = user.name;
// //   expensesForm.user_expense_id = user.id;
// //   showUserCard.value = false;
// // };

// const openDialog = () => {
//   dialog.value = true;
// };

// const closeBtn = () => {
//   dialog.value = false;
// };

// const clear = () => {
//   expensesForm.expense_user_id = "";
//   expensesForm.name = "";
//   expensesForm.amount = "";
//   expensesForm.description = "";
// };

// const handleSubmit = async () => {
//   // const amountAsNumber = parseFloat(expensesForm.amount.replace(",", "."));

//   const expenseReport = {
//     sales_report_id: sales_report_id,
//     branch_id: branch_id,
//     user_id: user_id,
//     expenses: expensesList.value.map((expense) => ({
//       name: expense.name,
//       amount: expense.amount,
//       description: expense.description,
//     })),
//   };
//   console.log("expenseReport", expenseReport);
//   await expensesStore.addingExpense(expenseReport);
//   Notify.create({
//     type: "positive",
//     message: "Expenses Submitted",
//     timeout: 1000,
//   });

//   clear();
// };
</script>

<style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(135deg, #1d2423, #00796b);
}

.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
