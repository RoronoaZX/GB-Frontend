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
          v-model="vatData.receiptNo"
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
          v-model="vatData.tinNo"
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
      <!-- <div>
        <q-btn
          outline
          dense
          icon="add"
          label="Add To List"
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
      </div> -->
      <!-- :rules="[(val) => !!val || 'Address is required']"
        :error="!!errors.address"
        :error-message="errors.address"
        @update:model-value="clearError('address')" -->
    </div>
    <div class="q-mr-lg" align="right">
      <q-btn
        outline
        dense
        icon="add"
        label="Add To List"
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
import { useUsersStore } from "src/stores/user";
import { Notify } from "quasar";

const userDataStore = useUsersStore();
const userDataSearch = computed(() => userDataStore.users);
const salesReportsStore = useSalesReportsStore();
const userData = salesReportsStore.user;
console.log("userdatasss", userData);

const radioBtnVATIndicator = ref(""); // Default selection
const vatData = reactive({
  receiptNo: "",
  tinNo: "",
  description: "",
  amount: "",
  address: "",
});
// const submitted = ref(false);

const clear = () => {
  radioBtnVATIndicator.value = "";
  vatData.receiptNo = "";
  vatData.tinNo = "";
  vatData.description = "";
  vatData.amount = "";
  vatData.address = "";
};

// const errors = ref({
//   radioBtnVATIndicator: "",
//   receiptNo: "",
//   tinNo: "",
//   description: "",
//   amount: "",
//   address: "",
// });

// const clearError = (field) => {
//   errors.value[field] = "";
// };

// const validateFields = () => {
//   if (!submitted.value) return true;
//   errors.value = {
//     radioBtnVATIndicator: "",
//     receiptNo: "",
//     tinNo: "",
//     description: "",
//     amount: "",
//     address: "",
//   };
//   let isValid = true;
//   if (!radioBtnVATIndicator.value) {
//     errors.value.radioBtnVATIndicator = "Please select VAT or Non-VAT";
//     isValid = false;
//   }
//   if (!vatData.receiptNo) {
//     errors.value.receiptNo = "Receipt No. is required";
//     isValid = false;
//   }
//   if (!vatData.tinNo) {
//     errors.value.tinNo = "TIN No. is required";
//     isValid = false;
//   }
//   if (!vatData.description) {
//     errors.value.description = "Description is required";
//     isValid = false;
//   }
//   if (!vatData.amount) {
//     errors.value.amount = "Amount is required";
//     isValid = false;
//   }
//   if (!vatData.address) {
//     errors.value.address = "Address is required";
//     isValid = false;
//   }
//   return isValid;
// };

const handleSubmit = () => {
  // Check if any required field is missing

  if (
    !vatData.receiptNo ||
    !vatData.tinNo ||
    !vatData.description ||
    !vatData.amount ||
    !vatData.address ||
    !radioBtnVATIndicator.value
  ) {
    Notify.create({
      type: "negative",
      message: "Please fill out all required fields.",
      timeout: 1500,
    });
    return;
  }

  const amountAsNumber = parseFloat(vatData.amount.replace(",", "."));

  console.log("Form submitted with values:", {
    ...vatData,
    user_id: userData?.data.id,
    branch_id: userData?.device?.reference_id,
    radioBtnVATIndicator: radioBtnVATIndicator.value,
    amount: amountAsNumber,
  });

  const data = {
    ...vatData,
    user_id: userData?.data.id,
    branch_id: userData?.device?.reference_id,
    radioBtnVATIndicator: radioBtnVATIndicator.value,
  };
  salesReportsStore.updateWithReceiptExpensesReport(data);
  Notify.create({
    type: "positive",
    message: `${radioBtnVATIndicator.value} expenses receipt added successfully`,
    timeout: 2000,
  });

  clear();
};

// // Watch for changes in radio button selection and alert the value
// watch(radioBtnVATIndicator, (newValue) => {
//   if (newValue) {
//     alert(`You are clicking ${newValue} expenses receipt`);
//   }
// });
</script>

<style lang="scss" scoped></style>
