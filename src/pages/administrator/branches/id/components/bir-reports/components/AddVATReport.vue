<template>
  <q-btn
    outline
    class="text-dark q-pa-sm"
    push
    dense
    elevated
    icon="add_circle"
    label="Add VAT Report"
    @click="openDialog"
    color="teal-9"
  />
  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section class="row items-center text-white background-color">
        <div class="text-h6">Add VAT Report</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-input v-model="vatData.reportDate" type="date" outlined dense />
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-md">
          <div class="row q-gutter-x-sm">
            <div>
              <q-input
                v-model="vatData.receipt_no"
                label="Receipt No."
                type="number"
                outlined
                dense
                style="width: 230px"
              />
              <!-- :rules="[(val) => !!val || 'Receipt No. is required']"
          :error="!!errors.receipt_no"
          :error-message="errors.receipt_no"
          @update:model-value="clearError('receipt_no')" -->
            </div>
            <div>
              <q-input
                v-model="vatData.tin_no"
                type="number"
                label="TIN No."
                outlined
                dense
                style="width: 250px"
              />
              <!-- :rules="[(val) => !!val || 'TIN No. is required']"
          :error="!!errors.tin_no"
          :error-message="errors.tin_no"
          @update:model-value="clearError('tin_no')" -->
            </div>
          </div>
          <div class="row q-gutter-x-sm">
            <q-input
              v-model="vatData.description"
              label="Desc. / Company Name"
              outlined
              dense
              style="width: 350px"
              class="text-uppercase"
            />
            <!-- :rules="[(val) => !!val || 'Description is required']"
        :error="!!errors.description"
        :error-message="errors.description"
        @update:model-value="clearError('description')" -->
            <div>
              <q-input
                v-model="vatData.amount"
                type="number"
                label="Gross / Amount"
                outlined
                dense
                style="width: 130px"
              />
              <!-- :rules="[(val) => !!val || 'Amount is required']"
          :error="!!errors.amount"
          :error-message="errors.amount"
          @update:model-value="clearError('amount')" -->
            </div>
          </div>
          <div class="q-gutter-x-sm">
            <q-input
              v-model="vatData.address"
              label="Address"
              outlined
              dense
              style="width: 490px"
              class="text-uppercase"
            />
          </div>
          <div align="right">
            <q-btn
              outline
              dense
              icon="send"
              label="Send"
              class="q-pa-sm"
              size="sm"
              color="teal"
              @click="handleSubmit"
            />
            <!-- @click="handleSubmit" -->
            <!-- :style="{
          color: radioBtnVATIndicator
            ? radioBtnVATIndicator === 'Non-VAT'
              ? 'red'
              : 'teal'
            : 'dark',
        }" -->
            <!-- @click="handleSubmit" -->
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useUsersStore } from "src/stores/user";
import { useRoute } from "vue-router";
import { Notify } from "quasar";
import { useDeliveryReceiptStore } from "src/stores/delivery-report";

const deliveryReceiptStore = useDeliveryReceiptStore();
const userDataStore = useUsersStore();
const userData = userDataStore.userData;
console.log("use in add non vat reportsss", userData);
const userId = userData?.data?.id || "0";
console.log("userId in add non vat reportsss", userId);
const route = useRoute();
const branchId = route.params.branch_id;
console.log("branchId in add non vat reportsss", branchId);
const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const vatData = ref({
  reportDate: "",
  branch_id: branchId,
  user_id: userId,
  receipt_no: "",
  tin_no: "",
  description: "",
  amount: "",
  address: "",
  category: "VAT",
});

const getCreatedAt = () => {
  if (!vatData.value.reportDate) return null;

  // Get current time from device
  const now = new Date();

  // Extract hours, minutes, and seconds from the current time
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  // Combine with selected date
  const rawDateTime = `${vatData.value.reportDate} ${hours}:${minutes}:${seconds}`;

  // Create full datetime string in format: YYYY-MM-DD HH:MM:SS
  return rawDateTime;
};

const clear = () => {
  vatData.value = {
    reportDate: "",
    branch_id: branchId,
    user_id: userId,
    receipt_no: "",
    tin_no: "",
    description: "",
    amount: "",
    address: "",
  };
};

const handleSubmit = async () => {
  console.log("vatData", vatData.value);
  const createdAt = getCreatedAt();
  if (
    !vatData.value.reportDate ||
    !vatData.value.receipt_no ||
    !vatData.value.tin_no ||
    !vatData.value.description ||
    !vatData.value.amount ||
    !vatData.value.address
  ) {
    Notify.create({
      message: "Please fill in all fields",
      color: "red",
      position: "top",
      timeout: 2000,
    });
    return;
  }
  try {
    const dataTObeSave = {
      ...vatData.value,
      created_at: createdAt,
    };
    console.log("dataTObeSave", dataTObeSave);
    await deliveryReceiptStore.saveVATinAdmin(dataTObeSave);
    Notify.create({
      message: "Data saved successfully",
      color: "green",
      position: "top",
      timeout: 2000,
    });
    clear();
  } catch (error) {
    console.error("Error saving data:", error);
    Notify.create({
      message: "Error saving data",
      color: "red",
      position: "top",
      timeout: 2000,
    });
  }
};
</script>

<style lang="scss" scoped>
.background-color {
  // background: linear-gradient(to right, #008080, #00ffff);
  // background: linear-gradient(to right, #004d4d, #00b3b3);
  // background: linear-gradient(to right, #20c997, #a8e6cf);
  // background: linear-gradient(to right, #008080, #3cb371);
  // background: linear-gradient(to right, #5caca7, #ffffff);
  background: linear-gradient(to right, #004c4c, #66cccc);
}
</style>
