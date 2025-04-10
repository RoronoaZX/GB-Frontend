<template>
  <div class="q-mt-lg">
    <div class="q-gutter-x-md" align="center">
      <q-btn
        label="Expenses"
        rounded
        style="width: 150px"
        color="light-blue-6"
        class="user-button"
        @click="openDialog"
      />
      <q-dialog v-model="dialog">
        <q-card style="width: 450px">
          <q-card-section class="bg-gradient text-white">
            <div class="row justify-between">
              <div class="text-h6">Expenses</div>
              <div>
                <q-btn flat round dense icon="close" v-close-popup />
              </div>
            </div>
          </q-card-section>
          <q-card-section class="q-gutter-y-sm">
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
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { useSalesReportsStore } from "src/stores/sales-report";
import { Notify } from "quasar";

const salesReportsStore = useSalesReportsStore();
const route = useRoute();
const branch_id = route.params.branch_id;

const props = defineProps(["user"]);
console.log("user propd", props.user);
const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const radioBtnVATIndicator = ref("");

const expensesForm = reactive({
  user_expense_id: "",
  name: "",
  amount: 0,
  description: "",
});

const clearForm = () => {
  expensesForm.user_expense_id = "";
  (expensesForm.name = ""), (expensesForm.amount = "");
  expensesForm.description = "";
  radioBtnVATIndicator.value = "";
};

const handleSubmit = () => {
  const amountAsNumber = parseFloat(expensesForm.amount.replace(",", "."));

  const expensesReport = {
    ...expensesForm,
    user_id: props.user,
    branch_id: branch_id,
    amount: amountAsNumber,
    category: radioBtnVATIndicator.value,
  };
  console.log("expenses from admin", expensesReport);
  salesReportsStore.updateWithOutReceiptExpensesReport(expensesReport);
  Notify.create({
    type: "positive",
    message: "Expenses Submitted",
    timeout: 1000,
  });

  clearForm();
};
</script>

<style lang="scss" scoped>
.user-card {
  height: 100%;
  border-radius: 15px;
  background: #fff;
  color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-button {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-button:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}

.bg-gradient {
  background: linear-gradient(135deg, #1d2423, #00796b);
}
</style>
