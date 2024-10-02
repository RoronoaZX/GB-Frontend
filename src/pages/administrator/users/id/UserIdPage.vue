<template>
  <div class="q-pa-xm">
    <div class="row q-ma-sm">
      <q-btn flat dense icon="arrow_back_ios" rounded to="/admin/users" />
      <q-btn dense label="Cash Advance / CA" />
      <q-btn dense label="Uniform" />
      <q-btn dense label="Benefits" />
      <q-btn dense label="" />
    </div>
    <div>
      <div class="user-profile-page q-pa-md">
        <div class="row q-col-gutter-md">
          <!-- Left Column: Profile Card -->
          <div class="col-12 col-md-4">
            <UserProfileCard />
          </div>

          <!-- Right Column: Accounts and Bills Cards -->
          <div class="col-12 col-md-8">
            <div class="row q-col-gutter-md">
              <!-- My Schedule Card -->
              <div class="col-12">
                <UserPaySlipCard />
              </div>

              <!-- Bills Card -->
              <div class="col-12">
                <q-card class="bills-card q-pa-md">
                  <q-card-section>
                    <div class="text-h6">My Bills</div>
                  </q-card-section>
                  <q-list separator>
                    <!-- <q-item v-for="bill in user.bills" :key="bill.id">
                      <q-item-section>{{ bill.name }}</q-item-section>
                      <q-item-section side>
                        <q-icon
                          :name="bill.paid ? 'check_circle' : 'cancel'"
                          :color="bill.paid ? 'green' : 'red'"
                        />
                        <q-btn
                          flat
                          :label="bill.paid ? 'Bill Paid' : 'Not Paid'"
                          color="primary"
                        />
                      </q-item-section>
                    </q-item> -->
                  </q-list>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import UserProfileCard from "./components/UserProfileCard.vue";
import UserPaySlipCard from "./components/UserPaySlipCard.vue";

const router = useRouter();

// const user = reactive({
//   name: "John Mash Doe",
//   position: "Super Admin",
//   email: "john.doe123@gmail.com",
//   phone: "+(63) 111 - 111 - 1111",
//   address: "Street 123",
//   accounts: {
//     active: "9844 5600 8234 4256",
//     blocked: "9844 5600 8234 1234",
//   },
//   bills: [
//     { id: 1, name: "Monthly Bill", paid: true },
//     { id: 2, name: "Monthly Bill", paid: false },
//     { id: 3, name: "Monthly Bill", paid: true },
//     { id: 4, name: "Monthly Bill", paid: false },
//   ],
// });

function saveProfile() {
  console.log("Profile saved:", user);
}

function blockAccount(accountType) {
  console.log(`Block ${accountType} account`);
}

function unlockAccount(accountType) {
  console.log(`Unlock ${accountType} account`);
}
</script>

<style scoped>
.elegant-container {
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  color: #333;
}
.user-profile-page {
  max-width: 1200px;
  margin: auto;
}

.profile-card,
.account-card,
.bills-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.profile-card q-card-section:first-child {
  margin-top: 1rem;
}

.q-list q-item {
  align-items: center;
  /* padding: 1rem 0.5rem; */
}

.q-list q-item:not(:last-child) {
  border-bottom: 1px solid #e0e0e0;
}

.q-list q-item-section {
  color: #667;
  font-size: 0.9rem;
}

.q-list q-item-section:first-child {
  flex: 1 1 auto;
}

.q-list q-item-section[side] {
  flex: 0 0 auto;
}

.q-btn {
  min-width: 90px;
}

.q-btn[flat] {
  padding: 0 8px;
}

.email-container {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.email-display {
  padding: 8px 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease;
  background-color: transparent;
}

.email-display:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.email-text {
  font-size: 1rem;
  font-weight: 400;
  color: #333;
  margin-right: 8px;
}

.edit-icon {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.email-display:hover .edit-icon {
  opacity: 1;
}

.q-popup-edit {
  max-width: 300px;
}

.popup-input {
  font-size: 0.9rem;
  padding: 8px 12px;
  border-radius: 6px;
}
</style>
