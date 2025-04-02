<template>
  <div>
    <q-btn
      class="bg-gradient text-white"
      outlined
      label="Expenses Report"
      @click="openDialog"
    />
  </div>
  <q-dialog v-model="dialog">
    <q-card style="width: 700px">
      <q-card-section class="bg-gradient text-white">
        <div class="row justify-between">
          <div class="text-h6">Expenses</div>
          <div>
            <q-btn flat round dense icon="close" @click="closeBtn" />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-tabs
          v-model="tab"
          dense
          class="bg-grey-2 text-grey-7 tabs-as-cards"
          active-color="red-6"
          indicator-color="transparent"
          align="justify"
        >
          <q-tab name="with_out_receipt" label="W/out receipt" />
          <q-tab name="with_receipt" label="W/ Receipt" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="with_out_receipt">
            <WithOutReceiptExpenses />
          </q-tab-panel>
          <q-tab-panel name="with_receipt">
            <WithReceiptExpenses />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
      <!-- <q-card-section>
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
          <div class="" align="right">
            <q-btn
              outline
              dense
              icon="add"
              label="Add To List"
              class="q-pa-sm"
              size="sm"
              @click="handleSubmit"
            />
          </div>
        </div>
      </q-card-section> -->
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Notify } from "quasar";
import { useSalesReportsStore } from "src/stores/sales-report";
import { useUsersStore } from "src/stores/user";
import WithOutReceiptExpenses from "./expenses-report/WithOutReceiptExpenses.vue";
import WithReceiptExpenses from "./expenses-report/WithReceiptExpenses.vue";
import { ref, reactive, computed } from "vue";

const userDataStore = useUsersStore();
const userDataSearch = computed(() => userDataStore.users);
const salesReportsStore = useSalesReportsStore();
const userData = salesReportsStore.user;
console.log("userdatasss", userData);
const dialog = ref(false);
const tab = ref("with_out_receipt");
// const searchQuery = ref("");
// const showUserCard = ref(true);

// const searchUsers = async () => {
//   if (searchQuery.value) {
//     const branchId = userData?.data?.branch_employee?.branch_id || "";
//     await userDataStore.searchUserWithID(searchQuery.value, branchId);
//     showUserCard.value = true;
//   }
// };

const isDropdownVisible = computed(() => {
  return searchQuery.value && userDataSearch.value.length > 0;
});

const expensesForm = reactive({
  user_expense_id: "",
  name: "",
  amount: 0,
  description: "",
});

// const autoFillUser = (user) => {
//   searchQuery.value = user.name;
//   expensesForm.name = user.name;
//   expensesForm.user_expense_id = user.id;
//   showUserCard.value = false;
// };

const openDialog = () => {
  dialog.value = true;
};

const closeBtn = () => {
  dialog.value = false;
};

const clear = () => {
  expensesForm.expense_user_id = "";
  expensesForm.name = "";
  expensesForm.amount = "";
  expensesForm.description = "";
};

const handleSubmit = () => {
  const amountAsNumber = parseFloat(expensesForm.amount.replace(",", "."));

  const expenseReport = {
    ...expensesForm,
    user_id: userData?.data.id,
    branch_id: userData?.device?.reference_id,
    amount: amountAsNumber,
  };

  salesReportsStore.updateExpensesReport(expenseReport);
  Notify.create({
    type: "positive",
    message: "Expenses Submitted",
    timeout: 1000,
  });

  clear();
};
</script>

<style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(135deg, #1d2423, #00796b);
}

.q-tabs--not-scrollable .q-tabs__content,
body.mobile .q-tabs--scrollable.q-tabs--mobile-without-arrows .q-tabs__content {
  overflow: visible;
}
.tabs-as-cards {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
}

.tabs-as-cards .q-tab {
  background-color: white;
  // color: #333;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  margin: 0 8px;
  padding: 10px 20px;
  transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s;
}

.tabs-as-cards .q-tab:hover {
  background-color: #f0f0f0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.tabs-as-cards .q-tab--active {
  background-color: #e0e0e0;
  // color: #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
.tab-content {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
