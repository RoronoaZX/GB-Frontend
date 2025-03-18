<template>
  <div>
    <q-btn
      outline
      class="text-dark q-pa-sm"
      push
      dense
      elevated
      icon="add_circle"
      label="Create Sales Report"
      color="orange"
      @click="openDialog"
    ></q-btn>
  </div>
  <q-dialog
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card style="background-color: #f7f8fc">
      <q-card-section
        class="row items-center text-white"
        style="background-color: #ff9800"
      >
        <div class="text-h6">Sales Report</div>
        <q-space />
        <div class="row q-gutter-x-md">
          <div>
            <q-btn icon="close" flat dense round v-close-popup>
              <q-tooltip class="bg-blue-grey-6" :delay="200">Close</q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="row q-gutter-lg">
        <div>
          <q-input
            v-model="searchQuery"
            outlined
            dense
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
                  <q-item v-if="!loading && !users.length">
                    <q-item-section>
                      No data available in this branch.
                    </q-item-section>
                  </q-item>

                  <!-- Render User List -->
                  <template v-else>
                    <q-item
                      v-for="user in users"
                      @click="autoFillUser(user)"
                      :key="user.id"
                      clickable
                    >
                      <q-item-section>
                        <q-item-label>
                          {{ formattedUserName(user) }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-card>
            </div>
          </q-input>
        </div>
        <q-input v-model="reportDate" type="date" outlined dense />
        <q-radio
          keep-color
          v-model="reportTime"
          val="08:00 PM"
          label="AM"
          color="cyan"
        />
        <q-radio
          keep-color
          v-model="reportTime"
          val="04:00 AM"
          label="PM"
          color="deep-orange"
        />
      </q-card-section>
      <q-card-section class="row q-gutter-sm q-pa-md">
        <ProductPage :user="userId" />
        <ExpensesPage />
        <CreditPage />
        <DenominationPage />
      </q-card-section>
      <q-card-section>
        <OverAllTotal />
      </q-card-section>
      <q-card-section>
        <BreadReportField />
      </q-card-section>
      <q-card-section>
        <SelectaReportField />
      </q-card-section>
      <q-card-section>
        <SoftdrinksReportField />
      </q-card-section>
      <q-card-section>
        <CakeReportField />
      </q-card-section>
      <q-card-section>
        <OtherReportField />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useUsersStore } from "src/stores/user";
import ProductPage from "./components/products/ProductPage.vue";
import DenominationPage from "./components/denomination/DenominationPage.vue";
import ExpensesPage from "./components/expenses/ExpensesPage.vue";
import CreditPage from "./components/credit/CreditPage.vue";
import BreadReportField from "./components/report_field/BreadReportField.vue";
import SelectaReportField from "./components/report_field/SelectaReportField.vue";
import SoftdrinksReportField from "./components/report_field/SoftdrinksReportField.vue";
import CakeReportField from "./components/report_field/CakeReportField.vue";
import OtherReportField from "./components/report_field/OtherReportField.vue";
import OverAllTotal from "./components/total_sales/OverAllTotal.vue";

const userStore = useUsersStore();
const users = computed(() => userStore.users);
console.log("userdatasssss  ", users.value);
const dialog = ref(false);
const maximizedToggle = ref(true);
const reportTime = ref(false);
const reportDate = ref("");
let userSelected = false;
const employeeSearchLoading = ref(false);
const showUserCard = ref(false);
const searchQuery = ref("");
const userId = ref();

const openDialog = () => {
  dialog.value = true;
};

const searchUsers = async () => {
  if (searchQuery.value) {
    employeeSearchLoading.value = true;
    console.log("searchQuery.value", searchQuery.value);

    await userStore.searchUser(searchQuery.value);

    employeeSearchLoading.value = false;
    showUserCard.value = true;
  }
};

const isDropdownVisible = computed(() => {
  return searchQuery.value && users.value.length > 0;
});

const formattedUserName = (user) => {
  if (!user) return "";

  const { firstname, middlename, lastname } = user;

  const formattedFirstName = firstname
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
    .join(" ");
  const middleInitial = middlename
    ? `${middlename.charAt(0).toUpperCase()}.`
    : "";
  const lastInitial = lastname.charAt(0).toUpperCase();
  return `${formattedFirstName} ${middleInitial} ${lastInitial} ${lastname.slice(
    1
  )}`;
};

const autoFillUser = (user) => {
  console.log("Sales Reports", user);
  searchQuery.value = `${user.firstname} ${
    user.middlename ? user.middlename.charAt(0) + "." : ""
  } ${user.lastname}`;
  userId.value = user.id;

  userSelected = true;
  showUserCard.value = false;
};

watch(searchQuery, (newQuery) => {
  if (newQuery.length > 2 && !userSelected) {
    searchUsers();
  } else {
    showUserCard.value = false;
  }
  userSelected = false;
});
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
</style>
