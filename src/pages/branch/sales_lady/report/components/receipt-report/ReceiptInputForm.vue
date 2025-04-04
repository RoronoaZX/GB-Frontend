<template>
  <div class="q-gutter-md">
    <div class="q-gutter-x-xl" align="center">
      <q-radio
        keep-color
        v-model="radioBtnVATIndicator"
        size="lg"
        val="Non-VAT"
        label="Non-VAT"
        color="red"
      />
      <q-radio
        keep-color
        v-model="radioBtnVATIndicator"
        size="lg"
        val="VAT"
        label="VAT"
        color="teal"
      />
    </div>
    <div class="row q-gutter-x-sm">
      <div>
        <q-input
          label="Receipt No."
          v-model="vatData.receipt_no"
          type="number"
          outlined
          dense
          style="width: 230px"
        />
        <!-- :rules="[(val) => !!val || 'Receipt No. is required']"
          :error="!!errors.receiptNo"
          :error-message="errors.receiptNo"
          @update:model-value="clearError('receiptNo')" -->
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
          :error="!!errors.tinNo"
          :error-message="errors.tinNo"
          @update:model-value="clearError('tinNo')" -->
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
    <div class="q-mr-lg" align="right">
      <q-btn
        outline
        dense
        icon="send"
        label="save"
        class="q-pa-sm"
        size="sm"
        :style="{
          color: radioBtnVATIndicator
            ? radioBtnVATIndicator === 'Non-VAT'
              ? 'red'
              : 'teal'
            : 'dark',
        }"
        @click="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch, computed } from "vue";
import { useSalesReportsStore } from "src/stores/sales-report";
import { useDeliveryReceiptStore } from "src/stores/delivery-report";
import { useUsersStore } from "src/stores/user";
import { Notify } from "quasar";

const userDataStore = useUsersStore();
const userDataSearch = computed(() => userDataStore.users);
const salesReportsStore = useSalesReportsStore();
const deliveryReceiptStore = useDeliveryReceiptStore();
const userData = salesReportsStore.user;
console.log("userdatasss", userData);
// const userId = userData?.data?.id || "";
// console.log("userId", userId);
// const branchId = userData?.device?.reference_id || "";
// console.log("branchId", branchId);

const radioBtnVATIndicator = ref(""); // Default selection
const vatData = reactive({
  receipt_no: "",
  tin_no: "",
  description: "",
  amount: "",
  address: "",
});
// const submitted = ref(false);

const clear = () => {
  radioBtnVATIndicator.value = "";
  vatData.receipt_no = "";
  vatData.tin_no = "";
  vatData.description = "";
  vatData.amount = "";
  vatData.address = "";
};

const handleSubmit = () => {
  // submitted.value = true; // Mark as submitted
  // if (!validateFields()) {
  //   return; // Stop submission if validation fails
  // }
  // Handle the form submission logic here
  const amountAsNumber = parseFloat(vatData.amount.replace(",", "."));

  console.log("Form submitted with values:", {
    ...vatData,
    user_id: userData?.data.id,
    branch_id: userData?.device?.reference_id,
    radioBtnVATIndicator: radioBtnVATIndicator.value,
    amount: amountAsNumber,
  });
  try {
    const data = {
      ...vatData,
      user_id: userData?.data.id,
      branch_id: userData?.device?.reference_id,
      category: radioBtnVATIndicator.value,
    };
    // salesReportsStore.updateWithReceiptExpensesReport(data);
    console.log("data", data);
    deliveryReceiptStore.saveDeliveryReceipt(data);
    Notify.create({
      type: "positive",
      message: `${radioBtnVATIndicator.value} expenses receipt added successfully`,
      timeout: 2000,
    });

    clear();
  } catch (error) {
    console.error("Error saving data:", error);
    Notify.create({
      type: "negative",
      message: "Failed to save data. Please try again.",
      timeout: 2000,
    });
  }
};

// // Watch for changes in radio button selection and alert the value
// watch(radioBtnVATIndicator, (newValue) => {
//   if (newValue) {
//     alert(`You are clicking ${newValue} expenses receipt`);
//   }
// });
</script>

<style lang="scss" scoped></style>
