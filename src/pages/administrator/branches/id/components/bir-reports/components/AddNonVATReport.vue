<template>
  <q-btn
    outline
    class="text-dark q-pa-sm"
    push
    dense
    elevated
    icon="add_circle"
    label="Add Non-VAT Report"
    @click="openDialog"
    color="red-14"
  />

  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section class="row items-center text-white background-color">
        <div class="text-h6">Add Non-VAT Report</div>
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
              style="color: #ef4444"
              @click="handleSubmit"
            />
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
  <!-- @click="open_create_bread_dialog" -->
</template>

<script setup>
import { computed, ref } from "vue";
import { useUsersStore } from "src/stores/user";
import { useRoute } from "vue-router";
import { useDeliveryReceiptStore } from "src/stores/delivery-report";
import { Notify } from "quasar";

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

// const reportDate = ref("");
const vatData = ref({
  reportDate: "",
  branch_id: branchId,
  user_id: userId,
  receipt_no: "",
  tin_no: "",
  description: "",
  amount: "",
  address: "",
  category: "Non-VAT",
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
    category: "Non-VAT",
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
      type: "negative",
      message: "Please fill in all fields.",
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
    await deliveryReceiptStore.saveNonVATinAdmin(dataTObeSave);
    Notify.create({
      type: "positive",
      message: "Non-VAT Report added successfully.",
      position: "top",
      timeout: 2000,
    });
    clear();
  } catch (error) {
    console.error("Error saving Non-VAT Report:", error);
    Notify.create({
      type: "negative",
      message: "Failed to add Non-VAT Report.",
      position: "top",
      timeout: 2000,
    });
  }
};
</script>

<style lang="scss" scoped>
.background-color {
  // background: linear-gradient(to right, #ff0000, #ff1493, #8a2be2);

  // background: linear-gradient(to right, #ff0000, #000000);
  background: linear-gradient(to right, #8b0000, #dc143c);
}
</style>
