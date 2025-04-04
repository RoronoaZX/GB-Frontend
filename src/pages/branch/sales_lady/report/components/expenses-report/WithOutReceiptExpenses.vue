<template>
  <div class="q-gutter-y-md">
    <div class="row q-gutter-x-md">
      <div class="q-gutter-x-xl" align="center">
        <q-radio
          keep-color
          v-model="radioBtnVATIndicator"
          size="lg"
          val="normal"
          label="Normal"
          color="primary"
        />
        <q-radio
          keep-color
          v-model="radioBtnVATIndicator"
          size="lg"
          val="premium"
          label="Premium"
          color="purple-12"
        />
      </div>
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
</template>

<script setup>
import { Notify } from "quasar";
import { useSalesReportsStore } from "src/stores/sales-report";
import { useUsersStore } from "src/stores/user";
import { ref, reactive, computed } from "vue";

const userDataStore = useUsersStore();
const userDataSearch = computed(() => userDataStore.users);
const salesReportsStore = useSalesReportsStore();
const userData = salesReportsStore.user;
console.log("userdatasss", userData);
const dialog = ref(false);
const radioBtnVATIndicator = ref("");
const tab = ref("ordinary");
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
    category: radioBtnVATIndicator.value,
  };

  salesReportsStore.updateWithOutReceiptExpensesReport(expenseReport);
  Notify.create({
    type: "positive",
    message: "Expenses Submitted",
    timeout: 1000,
  });

  clear();
};
</script>

<style lang="scss" scoped></style>
